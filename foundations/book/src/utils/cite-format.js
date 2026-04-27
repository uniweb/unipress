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
import { markRawLatex } from '@uniweb/press/latex'

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
 * Inline-inset LaTeX-mode formatter for the LaTeX substitution pass.
 *
 * Emits biblatex \\cite-family commands so the active biblatex style
 * (configured in the document's preamble — see latex-default's
 * createPreamble) does the formatting at PDF compile time. This is the
 * key payoff of TF11a.3: instead of pre-formatting "(Darwin 1859)" in
 * the LaTeX source, we hand `\\cite{darwin1859}` to biblatex and let it
 * apply the style consistently with the bibliography it also formats.
 *
 * Mappings:
 *   [@key]                          → \\cite{key}
 *   [@key]{page=42}                 → \\cite[42]{key}
 *   [@key]{suppress-author}         → \\citeyear{key}    (author-date-style years)
 *   [@a; @b]                        → \\cite{a,b}        (multi-cite cluster)
 *   [@a; @b]{page=10}               → \\cite[10]{a,b}
 *
 * Missing keys fall through to an empty string — biblatex would refuse
 * to compile a `\\cite{}` for an unknown record, and the book
 * foundation's missing-cite UX (`[?]` in the web preview) doesn't carry
 * over to print. A future enhancement could surface the failing keys
 * in a TeX comment alongside the empty substitution.
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

  // Drop keys that don't resolve in the bibliography. biblatex rejects
  // unknown keys at compile time, so emitting them would block the user.
  const resolved = keys.filter((k) => findRecord(website, k) != null)
  if (resolved.length === 0) return ''

  const keyList = resolved.join(',')
  const cmd = suppressAuthor ? '\\citeyear' : '\\cite'

  // markRawLatex wraps the command in U+E000 / U+E001 sentinels so the
  // LaTeX adapter's escape pass leaves it unescaped. Without this, the
  // adapter would emit `\textbackslash{}cite\{darwin1859\}` instead of
  // `\cite{darwin1859}` (the cite text has been substituted into a
  // paragraph's HTML string, which the IR walker treats as ordinary
  // body prose subject to character-level escaping).
  const raw =
    page || locator
      ? `${cmd}[${String(page || locator)}]{${keyList}}`
      : `${cmd}{${keyList}}`
  return markRawLatex(raw)
}

/**
 * Inline-inset LaTeX-mode formatter for `[#id]` cross-references.
 *
 * Mirrors `formatCiteInsetAsLatex` for Ref insets: emits
 * `\autoref{id}` so hyperref does the kind-aware label rendering at
 * PDF compile time ("Figure 3", "section 3.2", "Equation 1"). hyperref
 * is loaded by the LaTeX template (latex-default/template.js) so this
 * works without per-foundation preamble adjustment.
 *
 * Multi-ref clusters `[#a; #b]` emit one `\autoref{}` per id joined by
 * ", ". biblatex's natbib-style \cites/\refrange equivalents don't
 * exist for autoref; cleveref does cleaner clusters but adds a
 * package dependency the v1 adapter avoids. Single-ref renders the
 * cleanest "Figure 3" output; clusters render readably as "Figure 3,
 * Figure 4" which is fine for the v1 demo.
 *
 * Locators (`[#fig-1]{page=12}`) currently fall through unused — \autoref
 * doesn't accept a locator argument the way \cite does. A future enhancement
 * could wrap with `\autoref{id} (p.~12)` when locator is set.
 *
 * Missing ids fall through to an empty string (parallel to cite handling).
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

  // Look up each id in the per-website xref registry. The framework
  // builds this registry at content-collection time
  // (orchestrator.js → buildXrefRegistry → website.xref.entries).
  const entries = website?.xref?.entries || {}
  const resolved = ids.filter((id) => entries[id] != null)
  if (resolved.length === 0) return ''

  const refs = resolved.map((id) => `\\autoref{${id}}`).join(', ')
  return markRawLatex(refs)
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
