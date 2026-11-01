/**
 * Per-website cite registry.
 *
 * Two responsibilities:
 *   1. Hold the bibliography records the document reads from. Filled in
 *      by the Bibliography section as a side effect of rendering (TF10a.1)
 *      via setBibliography(). Read by Cite insets and the Typst back-matter
 *      generator (TF10a.3) via getBibliography() / findRecord().
 *   2. Own one citestyle registry instance per active style, so numbered
 *      styles (IEEE / Vancouver / Nature / Science / AMA) number a document's
 *      records in the order it first cites them, and the same key cited twice
 *      gets the same number both times. Author-date styles (APA / MLA / Chicago
 *      author-date / Harvard) don't need that for the inline form, but using
 *      the registry uniformly keeps the foundation code simple.
 *
 * Per-website (not module-global): compileSubtree and serial unipress
 * compiles can run multiple websites in the same Node process. A book
 * series, a batch script, the editor preview iframe — none should bleed
 * citation numbers across documents. WeakMap keys keep unmounted
 * websites GC-eligible.
 *
 * Accessors are plain functions, not React hooks — callers (Bibliography
 * render, Cite render, the Typst back-matter generator) need to read
 * from places where useState/useEffect aren't usable.
 *
 * citestyle API surface (verified in ~/Uniweb/csl/packages/registry/types.d.ts):
 *   createRegistry(style, options?) -> Registry
 *   registry.addItems(items)
 *   registry.cite(cites, ctx?) -> { html, text }
 *   registry.getBibliography(ctx?) -> FormattedEntry[]
 */

import { createRegistry } from 'citestyle'
import { recordToCsl, recordsToCsl } from './to-csl.js'

const STORE = new WeakMap()
const DEFAULT_COLLECTION = 'bibliography'

function slot(website) {
  if (!STORE.has(website)) {
    STORE.set(website, {
      bibliography: null,
      registriesByStyle: new Map(), // styleId -> citestyle Registry
    })
  }
  return STORE.get(website)
}

/**
 * Bootstrap from website.config.recordsByQuery.<name> — the
 * unipress content-loader stashes resolved collections there so any
 * section can find them regardless of render order.
 *
 * Bibliography section's setBibliography() (called during render) takes
 * precedence over this bootstrap; bootstrap only fires when a Cite
 * renders before Bibliography (e.g. chapters in document order).
 */
function bootstrap(website) {
  const s = slot(website)
  if (s.bibliography) return
  const name = website?.config?.book?.bibliography?.collection || DEFAULT_COLLECTION
  const raw = website?.config?.recordsByQuery?.[name]
  if (!Array.isArray(raw) || raw.length === 0) return
  s.bibliography = recordsToCsl(raw)
}

/**
 * Stash the bibliography records on a website. Idempotent — calling with
 * the same array re-seeds the cached registries; calling with a different
 * array invalidates them so the next access reseeds with fresh items.
 */
export function setBibliography(website, records) {
  if (!website) return
  const s = slot(website)
  const next = Array.isArray(records) ? records : []
  if (s.bibliography === next) return
  s.bibliography = next
  // A bibliography refresh invalidates any registry seeded from the
  // previous list. Cite consumers re-create on next use via
  // getRegistryForStyle.
  s.registriesByStyle.clear()
}

export function getBibliography(website) {
  if (!website) return []
  bootstrap(website)
  return slot(website).bibliography || []
}

/**
 * Look up a bibliography record by key. Records may declare either `id`
 * or `key`; both are accepted to match the framework's loose conventions
 * around id naming.
 */
export function findRecord(website, key) {
  if (!key) return null
  const list = getBibliography(website)
  for (const r of list) {
    if (r && (r.id === key || r.key === key)) return r
  }
  return null
}

/**
 * Get (or lazily create) the citestyle registry for the given style.
 *
 * createRegistry is bound to a style at construction time. We keep one
 * registry per (website, style) pair — most documents have a single
 * active style, so this typically caches one entry; the per-style
 * indirection is just for the rare cross-style document.
 *
 * A style that sorts its own list is seeded with the whole bibliography,
 * since telling two of one author's works from one year apart takes all of
 * them. A numbered style has no order of its own, and its registry numbers
 * what it is given in the order it is given, so it starts empty and a record
 * comes in when it is first cited (`citedItem`). ⛔ Until 0.5.3 it was seeded
 * too, so a thesis numbered its references by file name, and opened at
 * `[8], [6]`.
 */
export function getRegistryForStyle(website, style) {
  if (!website || !style) return null
  const s = slot(website)
  const styleId = style?.meta?.id || style?.default?.meta?.id || 'default'
  let reg = s.registriesByStyle.get(styleId)
  if (!reg) {
    const compiled = compiledStyle(style)
    reg = createRegistry(compiled)
    if (compiled.bibliographySort) {
      const items = getBibliography(website)
      if (items.length > 0) reg.addItems(items)
    }
    s.registriesByStyle.set(styleId, reg)
  }
  return reg
}

// citestyle styles can be either ESM module objects (with `.default`
// = the compiled style) or the compiled style directly. Try both.
function compiledStyle(style) {
  return style?.bibliography || style?.citation ? style : style?.default || style
}

/**
 * A record as this registry holds it, which is the copy that carries its number
 * and what tells it apart from another of its author's. Entering it here, the
 * first time it is cited, is what numbers it in the order a reader meets it.
 */
export function citedItem(registry, record) {
  const csl = recordToCsl(record)
  if (!csl) return null
  const held = registry.getItem(csl.id)
  if (held) return held
  registry.addItems([csl])
  return csl
}

/**
 * The entries a Bibliography section prints for its records.
 *
 * The document's own list goes through the registry its citations went through,
 * so `[1]` inline is `[1]` here. What no citation brought in comes after what did,
 * in the order the section gives. A list of anything else ("further reading") is
 * its own: nothing cites into it, so it takes a registry of its own.
 * ⛔ Until 0.5.3 every section printed the document's list, whatever it asked for.
 */
export function bibliographyEntries(website, style, items) {
  if (!website || !style || items.length === 0) return []
  const main = getBibliography(website)
  const isMain = main.length === items.length && items.every((item) => main.some((record) => String(record.id) === item.id))
  if (!isMain) {
    const own = createRegistry(compiledStyle(style))
    own.addItems(items)
    return own.getBibliography()
  }
  const registry = getRegistryForStyle(website, style)
  registry.addItems(items.filter((item) => !registry.getItem(item.id)))
  return registry.getBibliography()
}
