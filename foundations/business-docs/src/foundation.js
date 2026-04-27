/**
 * Business documents foundation. Renders SOWs, invoices, and engagement
 * reports from YAML collections.
 *
 * The content handler is a Loom-pipeline mirror of @uniweb/loom's
 * createLoomHandlers, with one extension: it pulls vendor identity,
 * default currency, default tax jurisdiction, and locale from
 * `website.config.business_docs` so authors set those once at the
 * site / document level instead of repeating them on every record.
 *
 * Loom namespace shape exposed to {placeholders} in markdown:
 *
 *   - For single-record pages (data: invoice OR data: sow), the record's
 *     fields are flattened in (`{number}`, `{title}`, `{client.organization}`,
 *     `{items}`, `{deliverables}`, …).
 *   - For invoices, the namespace also carries computed totals
 *     (`{subtotal}`, `{tax_amount}`, `{tax_rate}`, `{tax_label}`,
 *     `{total}`) so 03-totals.md can render with plain placeholders.
 *   - `{vendor.*}` and `{defaults.*}` always resolve from
 *     website.config.business_docs.
 *   - For aggregate pages (data: invoices, sows), `invoices` and `sows`
 *     are exposed as arrays for `{COUNT OF invoices}`-style aggregation.
 */

import { Loom, instantiateContent, instantiateRepeated } from '@uniweb/loom'
import {
  buildDocxOptions,
  buildPagedjsOptions,
  buildXlsxOptions,
} from './compile-options.js'
import { computeInvoiceTotals, computeLineAmount } from '#utils/compute-totals.js'
import { validateCrossRefs, logFindings } from '#utils/validate-cross-refs.js'

export const vars = {
  'max-content-width': {
    default: '52rem',
    description: 'Maximum width for body content (matches a printed letter page reading column)',
  },
  'section-padding-y': {
    default: 'clamp(1.5rem, 3vw, 3rem)',
    description: 'Vertical padding around each section',
  },
  'header-height': {
    default: '3.5rem',
    description: 'Height of the sticky download bar in the web preview',
  },
}

const engine = new Loom()

function pickRecord(data, key) {
  const v = data?.[key]
  if (!v) return null
  return Array.isArray(v) ? v[0] : v
}

/**
 * Single-record documents (the unipress invoice template, an SOW page in
 * a uniweb site) point Loom at one record. The page can either declare
 * the singular form (`data: invoice`) — which the handler picks via
 * data.invoice — or rely on a single-item collection (`data: invoices`),
 * in which case the first item stands in. Authors don't need to know
 * the difference; only one invoice in scope means the page is
 * unambiguously about it.
 */
function pickActiveInvoice(data) {
  const inv = pickRecord(data, 'invoice')
  if (inv) return inv
  if (Array.isArray(data?.invoices) && data.invoices.length === 1) return data.invoices[0]
  return null
}

function pickActiveSow(data) {
  const s = pickRecord(data, 'sow')
  if (s) return s
  if (Array.isArray(data?.sows) && data.sows.length === 1) return data.sows[0]
  return null
}

/**
 * Pull a collection's records from the foundation's two routes: the
 * page-level fetch graph (`data[name]`) and the unipress / runtime
 * cross-page fallback (`website.config.collections[name].records`).
 *
 * The page-level fetch only carries the *active* collection (multi-fetch
 * isn't yet wired in the unipress orchestrator — see content-loader.js).
 * The fallback covers everything declared in document.yml's
 * `collections:` config so cross-record validation and cross-collection
 * lookups (invoice → sow_ref) work on any page that fetched only one of
 * the two.
 */
function gatherCollection(name, data, block) {
  if (Array.isArray(data?.[name])) return data[name]
  const records = block?.website?.config?.collections?.[name]?.records
  return Array.isArray(records) ? records : []
}

function buildLoomNamespace(data, block) {
  const cfg = block?.website?.config?.business_docs || {}
  const vendor = cfg.vendor || {}
  const defaults = cfg.defaults || {}
  const taxRegistry = cfg.registries?.tax || {}

  const invoices = gatherCollection('invoices', data, block)
  const sows = gatherCollection('sows', data, block)

  const base = { vendor, defaults }

  // Single-record forms
  const invoice = pickActiveInvoice({ invoice: data?.invoice, invoices })
  if (invoice) {
    const totals = computeInvoiceTotals(invoice, defaults, taxRegistry)
    // Enrich each line item with its computed amount so per-item Loom
    // templates can write {amount} instead of {* qty unit_price}, which
    // collides with markdown emphasis (`*` is bold/italic syntax).
    const items = Array.isArray(invoice.items)
      ? invoice.items.map((it) => ({ ...it, amount: computeLineAmount(it) }))
      : []
    return { ...base, ...invoice, items, ...totals }
  }
  const sow = pickActiveSow({ sow: data?.sow, sows })
  if (sow) return { ...base, ...sow }

  // Aggregate / report forms
  return { ...base, invoices, sows }
}

/**
 * Infer which slice of the four-file invoice / SOW composition this
 * block represents.
 *
 * Resolution order:
 *   1. Explicit `kind` param in markdown frontmatter — wins.
 *   2. `source: items` (the line-items slice) → 'line-items'.
 *   3. Title slug match (case-insensitive, trim).
 *   4. Default 'body' — section renders flat paragraphs (legacy behaviour).
 *
 * Recognized kinds: 'cover', 'line-items', 'totals', 'payment',
 * 'deliverables' (SOW), 'body' (fallback).
 */
/**
 * Walk a value tree and coerce every Date to its UTC ISO YYYY-MM-DD
 * string. Used at the Loom-namespace boundary because Loom's auto-
 * formatting of Date values uses local timezone (toLocaleDateString)
 * and shifts date-only ISO inputs by the host's offset.
 *
 * Preserves identity for non-Date values; doesn't mutate inputs.
 */
function coerceDatesToIso(value) {
  if (value == null) return value
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return ''
    const y = value.getUTCFullYear()
    const m = String(value.getUTCMonth() + 1).padStart(2, '0')
    const d = String(value.getUTCDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  if (Array.isArray(value)) return value.map(coerceDatesToIso)
  if (typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = coerceDatesToIso(v)
    return out
  }
  return value
}

function inferSliceKind({ params, content, block }) {
  const explicit = params?.kind || block?.properties?.kind
  if (typeof explicit === 'string' && explicit.length) return explicit

  const source = block?.properties?.source
  if (source === 'items') return 'line-items'
  if (source === 'deliverables') return 'deliverables'

  // The semantic-parsed `content.title` is empty when the markdown's
  // first body element is the dividers / rules used by source-iteration
  // slices. The frontmatter title lives on block.properties.title.
  const rawTitle =
    (block?.properties?.title || content?.title || '').toString().trim().toLowerCase()
  if (rawTitle === 'invoice') return 'cover'
  if (rawTitle === 'totals') return 'totals'
  if (rawTitle === 'payment') return 'payment'
  if (rawTitle === 'line items') return 'line-items'
  if (rawTitle === 'deliverables') return 'deliverables'

  return 'body'
}

let loggedRunsForBlock = new WeakSet()

function maybeLogValidation(data, block) {
  // Run cross-record validation whenever both collections are reachable
  // — either via the page's own fetch (data.invoices / data.sows) or via
  // the website-config fallback that unipress populates from
  // document.yml's collections: declaration. One log line per block is
  // enough; using a WeakSet keyed by block survives dev-server hot
  // reloads and is GC'd when the page unmounts.
  const invoices = gatherCollection('invoices', data, block)
  const sows = gatherCollection('sows', data, block)
  if (invoices.length === 0 || sows.length === 0) return
  if (loggedRunsForBlock.has(block)) return
  loggedRunsForBlock.add(block)
  const findings = validateCrossRefs({ invoices, sows })
  if (findings.length > 0) logFindings(findings)
}

export default {
  defaultLayout: 'BusinessDocLayout',
  props: {},

  handlers: {
    content: (data, block) => {
      maybeLogValidation(data, block)

      // Loom auto-formats Date values via toLocaleDateString (local
      // timezone), which makes `{due}` for `2026-03-31` render as
      // 'Mar 30, 2026' in EST. Coerce all Date values in the
      // namespace to ISO YYYY-MM-DD strings before passing to Loom —
      // foundations that want a different format use `{due AS long
      // date}` in the template, or read raw Dates from content.__bd
      // in the section component for structured layouts.
      const v = coerceDatesToIso(buildLoomNamespace(data, block))
      const doc = block.rawContent?.doc ?? block.rawContent
      const source = block.properties?.source

      if (!source) return instantiateContent(doc, engine, v)

      const whereExpr = block.properties?.where
      if (whereExpr) {
        const items = v[source]
        if (Array.isArray(items)) {
          const filtered = items.filter((item) =>
            engine.evaluateText(whereExpr, { ...v, ...item }),
          )
          return instantiateRepeated(doc, engine, { ...v, [source]: filtered }, source)
        }
      }
      return instantiateRepeated(doc, engine, v, source)
    },

    /**
     * Inject the raw business-docs namespace (vendor, defaults, active
     * invoice/SOW with computed totals + enriched items) into the
     * content object as a `__bd` field. Section components consume
     * this to render structured layouts (real line-items tables,
     * colSpan totals tables) in addition to the prose surface.
     *
     * Visible to the component as `content.__bd.{kind, invoice, sow,
     * items, totals, vendor, defaults}`. The `kind` field is inferred
     * from `block.properties.kind` (explicit) or the slice's title
     * (cover / line items / totals / payment) — matches the four-file
     * invoice composition shipped in the document templates.
     */
    props: (content, params, block) => {
      const data = block.parsedContent?.data
      const v = buildLoomNamespace(data, block)
      const cfg = block?.website?.config?.business_docs || {}
      const vendor = cfg.vendor || {}
      const defaults = cfg.defaults || {}
      const taxRegistry = cfg.registries?.tax || {}

      const invoice = pickActiveInvoice({
        invoice: data?.invoice,
        invoices: gatherCollection('invoices', data, block),
      })
      const sow = pickActiveSow({
        sow: data?.sow,
        sows: gatherCollection('sows', data, block),
      })

      const totals = invoice
        ? computeInvoiceTotals(invoice, defaults, taxRegistry)
        : null
      const items = invoice && Array.isArray(invoice.items)
        ? invoice.items.map((it) => ({ ...it, amount: computeLineAmount(it) }))
        : []

      const kind = inferSliceKind({ params, content, block })

      return {
        content: {
          ...content,
          __bd: { kind, invoice, sow, items, totals, vendor, defaults, namespace: v },
        },
        params,
      }
    },
  },

  // Outputs the foundation supports. NOTE: no `pdf` entry — unipress
  // hardcodes `pdf → typst` in its sink dispatch (src/compile.js
  // pickSink), so declaring `pdf: { via: 'pagedjs' }` here would route
  // the html blob through the typst extractor. v1 ships Paged.js HTML
  // (browser print-to-PDF) and docx for direct files; a typst-based pdf
  // adapter is a v2 follow-up.
  outputs: {
    pagedjs: {
      extension: 'html',
      getOptions: buildPagedjsOptions,
    },
    docx: {
      extension: 'docx',
      getOptions: buildDocxOptions,
    },
    xlsx: {
      extension: 'xlsx',
      getOptions: buildXlsxOptions,
    },
  },
}

