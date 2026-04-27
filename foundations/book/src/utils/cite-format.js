/**
 * Cite formatting helpers shared between the Cite React component and
 * non-React consumers (e.g. the Typst substitution pass that rewrites
 * inline-inset markers in paragraph text before Press's Sequence renders).
 *
 * Encapsulates the registry call and the cite-cluster shaping so the
 * "given a Cite inset block, produce the citation string" logic lives
 * in one place.
 */

import { getRegistryForStyle, findRecord } from './cite-registry.js'
import { recordToCsl } from './to-csl.js'
import { formatCite as pressLatexCite, formatAutoref as pressLatexAutoref } from '@uniweb/press/latex'
import { getXrefRegistry } from '@uniweb/kit/xref'

/**
 * Build a citestyle CiteRef cluster from a Cite inset's params.
 *
 * Accepts the Cite component's params directly (`{ key, page, locator,
 * label, ... }`). `key` is one or more semicolon-separated bibliography
 * keys (e.g. `"darwin1859"` or `"a;b"`). Records that don't resolve in
 * the website's bibliography are dropped. Returns an empty array when
 * no keys resolve.
 */
function buildCluster(params, website) {
  const { key, page, locator, label = 'page' } = params || {}
  const keys = String(key || '')
    .split(';')
    .map((k) => k.trim().replace(/^@/, ''))
    .filter(Boolean)
  if (keys.length === 0) return []

  return keys
    .map((k) => {
      const rec = findRecord(website, k)
      if (!rec) return null
      const ref = { id: k }
      const csl = recordToCsl(rec)
      if (csl) ref.item = csl
      if (page || locator) {
        ref.locator = String(page || locator)
        ref.label = label
      }
      return ref
    })
    .filter(Boolean)
}

/**
 * Format a Cite inset into a `{ html, text }` pair using the active
 * style's per-website registry. Returns `null` when nothing resolved
 * (caller decides how to render a missing-key fallback).
 */
export function formatCite(params, website, style) {
  if (!website || !style) return null
  const cluster = buildCluster(params, website)
  if (cluster.length === 0) return null
  const registry = getRegistryForStyle(website, style)
  if (!registry) return null
  try {
    return registry.cite(cluster)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('cite-format: registry.cite failed', err)
    return null
  }
}

/**
 * Inline-inset text-mode formatter for the Typst substitution pass.
 *
 * Given an inset block (any inline inset whose component is `Cite`),
 * returns the cite's plain-text rendering. Non-Cite insets fall through
 * to an empty string — the Typst path doesn't render React subtrees,
 * and the book foundation only knows how to text-format Cite.
 *
 * `style` is the active citestyle compiled style; the caller (Chapter,
 * BackMatter, etc.) picks it once and passes it in so this helper
 * doesn't have to redo style selection per inset.
 */
export function formatCiteInsetAsText(insetBlock, website, style) {
  if (!insetBlock) return ''
  if (insetBlock.type !== 'Cite') return ''
  const params = insetBlock.properties || insetBlock.params || {}
  const formatted = formatCite(params, website, style)
  if (!formatted) return ''
  return formatted.text || ''
}

/**
 * Inline-inset LaTeX-mode formatter for `[@key]` cite markers.
 *
 * Foundation-side wrapper around press's `formatCite` primitive: book
 * does the bibliography-resolution lookup (using its per-website
 * cite-registry), press does the LaTeX emission shape (\cite,
 * \citeyear, locator brackets, sentinel wrapping for the adapter's
 * raw-passthrough pass).
 *
 * Mappings:
 *   [@key]                    → \\cite{key}
 *   [@key]{page=42}           → \\cite[42]{key}
 *   [@key]{suppress-author}   → \\citeyear{key}
 *   [@a; @b]                  → \\cite{a,b}
 *   [@a; @b]{page=10}         → \\cite[10]{a,b}
 *
 * Missing keys are filtered out before press emits — biblatex refuses
 * to compile \cite{} for unknown records, so we drop them at
 * substitution time so authors with typos still get a clean compile.
 */
export function formatCiteInsetAsLatex(insetBlock, website) {
  if (!insetBlock) return ''
  if (insetBlock.type !== 'Cite') return ''
  const params = insetBlock.properties || insetBlock.params || {}

  const { key, page, locator, 'suppress-author': suppressAuthor } = params
  const keys = String(key || '')
    .split(';')
    .map((k) => k.trim().replace(/^@/, ''))
    .filter(Boolean)
  if (keys.length === 0) return ''

  const resolved = keys.filter((k) => findRecord(website, k) != null)

  return pressLatexCite(resolved, {
    locator: page || locator,
    suppressAuthor: !!suppressAuthor,
  })
}

/**
 * Inline-inset LaTeX-mode formatter for `[#id]` cross-references.
 *
 * Foundation-side wrapper around press's `formatAutoref` primitive:
 * book reads the per-website xref registry (kit) to filter unresolved
 * ids; press emits the \autoref{} commands and sentinel-wraps for the
 * adapter's body-text escape pass.
 *
 * Locator support (`[#fig-1]{page=12}`) is on the roadmap — \autoref
 * doesn't accept a locator argument the way \cite does, so a future
 * enhancement would emit `\autoref{id} (p.~12)` when locator is set.
 */
export function formatRefInsetAsLatex(insetBlock, website) {
  if (!insetBlock) return ''
  if (insetBlock.type !== 'Ref') return ''
  const params = insetBlock.properties || insetBlock.params || {}

  const ids = String(params.key || '')
    .split(';')
    .map((k) => k.trim().replace(/^#/, ''))
    .filter(Boolean)
  if (ids.length === 0) return ''

  const entries = getXrefRegistry(website)?.entries || {}
  const resolved = ids.filter((id) => entries[id] != null)

  return pressLatexAutoref(resolved)
}

/**
 * Combined inline-inset formatter for the LaTeX path. Routes Cite and
 * Ref insets to their respective formatters, returning an empty string
 * for any other inset type. Foundations pass this to
 * resolveInlineInsets so a single substitution pass handles every
 * inline-inset kind the foundation emits.
 */
export function formatInlineInsetAsLatex(insetBlock, website) {
  if (!insetBlock) return ''
  if (insetBlock.type === 'Cite') return formatCiteInsetAsLatex(insetBlock, website)
  if (insetBlock.type === 'Ref') return formatRefInsetAsLatex(insetBlock, website)
  return ''
}
