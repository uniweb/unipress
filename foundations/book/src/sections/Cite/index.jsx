/**
 * Cite — inline citation, formatted by citestyle through a per-document
 * registry so numbered styles (IEEE / Vancouver / Nature / Science /
 * AMA) keep document-wide ordering: the same key cited twice gets the
 * same number both times.
 *
 * Sugar: `[@darwin1859]{page=42}` (content-reader desugars to
 * `[darwin1859](@Cite){key=darwin1859 page=42 embedKind=text}`).
 *
 * Render is synchronous on purpose. SSR (the unipress compile pipeline)
 * skips effects, so an async-load + useEffect path would emit empty
 * output. All nine citestyle styles are statically imported here. The
 * Bibliography section (TF10a.1) does the same thing for the same
 * reason; the bundle pays for the styles once and both insets use them.
 *
 * Missing keys render `[?]` with the failing keys in the title attr —
 * a visible cue that doesn't blow up the compile.
 */

import * as apa from 'citestyle/styles/apa'
import * as mla from 'citestyle/styles/mla'
import * as chicagoAuthorDate from 'citestyle/styles/chicago-author-date'
import * as ieee from 'citestyle/styles/ieee'
import * as vancouver from 'citestyle/styles/vancouver'
import * as harvard from 'citestyle/styles/harvard'
import * as ama from 'citestyle/styles/ama'
import * as nature from 'citestyle/styles/nature'
import * as science from 'citestyle/styles/science'
import { getRegistryForStyle, findRecord } from '../../utils/cite-registry.js'
import { recordToCsl } from '../../utils/to-csl.js'

const STYLES = {
  apa,
  mla,
  'chicago-author-date': chicagoAuthorDate,
  ieee,
  vancouver,
  harvard,
  ama,
  nature,
  science,
}

const DEFAULT_STYLE = 'chicago-author-date'

function pickStyle(name) {
  return STYLES[name] || STYLES[DEFAULT_STYLE]
}

export default function Cite({ params, block }) {
  const website = block?.website
  const styleName = website?.config?.book?.citationStyle || DEFAULT_STYLE
  const style = pickStyle(styleName)

  const {
    key,
    page,
    locator,
    label = 'page',
    'suppress-author': suppressAuthor,
  } = params || {}

  // Multi-cite arrives as `a;b` (semicolon-separated) from the cite-sugar
  // recognizer; bare `[@a]` arrives as the single id.
  const keys = String(key || '')
    .split(';')
    .map((k) => k.trim().replace(/^@/, ''))
    .filter(Boolean)

  if (keys.length === 0) {
    return <span className="cite cite--missing" title="Missing key">[?]</span>
  }

  const records = keys.map((k) => findRecord(website, k))
  const allMissing = records.every((r) => !r)
  if (allMissing) {
    return (
      <span className="cite cite--missing" title={`Missing: ${keys.join(', ')}`}>
        [?]
      </span>
    )
  }

  const registry = getRegistryForStyle(website, style)
  if (!registry) {
    return <span className="cite cite--missing" title="No registry">[?]</span>
  }

  // Build the cite cluster — one CiteRef per resolved record. Keys that
  // didn't resolve are skipped (a cluster with one missing entry still
  // formats the rest correctly). Locator + label apply to every cite in
  // the cluster — that mirrors citestyle's CiteRef shape.
  const cluster = records
    .map((rec, i) => {
      if (!rec) return null
      const ref = { id: keys[i] }
      // Pre-resolve the item so the registry doesn't need to look it up
      // by id again. Idempotent — the registry's addItems was already
      // called with the bibliography records by getRegistryForStyle.
      const csl = recordToCsl(rec)
      if (csl) ref.item = csl
      if (page || locator) {
        ref.locator = String(page || locator)
        ref.label = label
      }
      return ref
    })
    .filter(Boolean)

  let formatted
  try {
    const ctx = suppressAuthor ? { mode: 'suppress-author' } : undefined
    formatted = registry.cite(cluster, ctx)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Cite: registry.cite failed', err)
    return <span className="cite cite--error" title={err.message}>[!]</span>
  }

  return (
    <span
      className="cite"
      dangerouslySetInnerHTML={{ __html: formatted.html || formatted.text || '' }}
    />
  )
}
