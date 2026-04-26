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
