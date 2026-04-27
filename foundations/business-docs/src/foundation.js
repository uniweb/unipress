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
import { computeInvoiceTotals } from '#utils/compute-totals.js'
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

function buildLoomNamespace(data, block) {
  const cfg = block?.website?.config?.business_docs || {}
  const vendor = cfg.vendor || {}
  const defaults = cfg.defaults || {}
  const taxRegistry = cfg.registries?.tax || {}

  const base = { vendor, defaults }

  // Single-record forms
  const invoice = pickRecord(data, 'invoice')
  if (invoice) {
    const totals = computeInvoiceTotals(invoice, defaults, taxRegistry)
    return { ...base, ...invoice, ...totals }
  }
  const sow = pickRecord(data, 'sow')
  if (sow) return { ...base, ...sow }

  // Aggregate / report forms
  return {
    ...base,
    invoices: Array.isArray(data?.invoices) ? data.invoices : [],
    sows: Array.isArray(data?.sows) ? data.sows : [],
  }
}

let loggedRunsForBlock = new WeakSet()

function maybeLogValidation(data, block) {
  // Only run cross-record validation when the page has both collections
  // available (typically the report page or a unipress doc with both
  // collections in scope). One log line per block is enough; using a
  // WeakSet keyed by block survives the dev-server hot-reload churn but
  // is GC'd when the page unmounts.
  if (!Array.isArray(data?.invoices) || !Array.isArray(data?.sows)) return
  if (loggedRunsForBlock.has(block)) return
  loggedRunsForBlock.add(block)
  const findings = validateCrossRefs({ invoices: data.invoices, sows: data.sows })
  if (findings.length > 0) logFindings(findings)
}

export default {
  defaultLayout: 'BusinessDocLayout',
  props: {},

  handlers: {
    content: (data, block) => {
      maybeLogValidation(data, block)

      const v = buildLoomNamespace(data, block)
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
  },

  outputs: {
    pdf: {
      extension: 'pdf',
      via: 'pagedjs',
      getOptions: buildPagedjsOptions,
    },
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

