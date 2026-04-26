/**
 * Bibliography — back-matter section that formats a list of CSL-shaped
 * records through citestyle.
 *
 * Reads its records from `content.data[<dataName>]` (a `data: <name>` /
 * `fetch: { collection: <name> }` declaration on the section or page).
 * Under `unipress compile`, content-loader.js resolves file-based
 * collections in-memory and attaches the array to the section's
 * `parsedContent.data.<schema>` — and also stashes the resolved array
 * on `website.config.collections.<name>.records` so insets that render
 * before this section can bootstrap their own copy.
 *
 * Rendering goes through the same per-website citestyle registry the
 * `Cite` inset uses (`cite-registry.js`). That keeps numbered-style
 * back-matter ordering (IEEE, Vancouver, Nature, Science, AMA)
 * consistent with the inline cites — the same key cited inline as
 * `[1]` lands as `[1]` in the bibliography. For author-date styles the
 * registry's natural sort is alphabetical, also what these styles
 * expect.
 *
 * Synchronous on purpose. The SSR pipeline used by `unipress compile`
 * skips `useEffect` (gotcha #2 in framework CLAUDE.md), so an
 * async-load + useEffect + setState pattern (the way `@uniweb/data`'s
 * PublicationsList does it for the dev/preview case) leaves the
 * captured `useDocumentOutput` registrations holding an empty entries
 * array — the compiled HTML/Typst/EPUB then ship with an empty
 * bibliography. To make compile-time output correct, all nine
 * citestyle styles are statically imported here. `Cite` (TF10a.2)
 * does the same for the same reason; the bundle pays for the styles
 * once and both insets use them.
 */

import { useEffect, useMemo } from 'react'
import { SafeHtml, H1 } from '@uniweb/kit'
import { useDocumentOutput } from '@uniweb/press'
import { ChapterOpener, Sequence } from '@uniweb/press/typst'
import * as apa from 'citestyle/styles/apa'
import * as mla from 'citestyle/styles/mla'
import * as chicagoAuthorDate from 'citestyle/styles/chicago-author-date'
import * as ieee from 'citestyle/styles/ieee'
import * as vancouver from 'citestyle/styles/vancouver'
import * as harvard from 'citestyle/styles/harvard'
import * as ama from 'citestyle/styles/ama'
import * as nature from 'citestyle/styles/nature'
import * as science from 'citestyle/styles/science'
import { recordsToCsl } from '../../utils/to-csl.js'
import { sortBibliography } from '../../utils/sort-bibliography.js'
import { setBibliography, getRegistryForStyle } from '../../utils/cite-registry.js'

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

// citestyle wraps each entry in <div class="csl-entry">…</div>. Press's
// Paragraph parser recurses into <div>'s inner content (parseStyledString
// is generic over tag names), but the wrapper is purely cosmetic for our
// purposes — strip it so the entry text reads cleanly when the parser
// extracts its inline marks.
const ENTRY_WRAPPER_RE = /^\s*<div class="csl-entry">([\s\S]*)<\/div>\s*$/
function stripEntryWrapper(html) {
  if (typeof html !== 'string' || !html) return html
  const m = ENTRY_WRAPPER_RE.exec(html)
  return m ? m[1].trim() : html
}

export default function Bibliography({ content, params, block }) {
  const website = block?.website
  const bookCfg = website?.config?.book || {}

  const dataName = params?.data || 'bibliography'
  const styleName = params?.style || bookCfg.citationStyle || DEFAULT_STYLE
  const style = pickStyle(styleName)
  const sortBy = params?.sortBy || bookCfg.bibliography?.sortBy || 'author'
  const heading = params?.title || content?.title || 'Bibliography'

  // Resolved by content-loader from `data: <name>` on the section.
  const records = useMemo(() => {
    const v = content?.data?.[dataName]
    return Array.isArray(v) ? v : []
  }, [content?.data, dataName])

  // Pre-sort the records (author / year / collection-order). For numbered
  // styles, the registry assigns citation numbers in addItems insertion
  // order — so this pre-sort decides what `[1]` means when the style
  // does NOT impose a comparator of its own. Author-date styles use
  // their compiled comparator, which makes this a tiebreaker only.
  const sorted = useMemo(
    () => sortBibliography(records, sortBy),
    [records, sortBy],
  )
  const cslItems = useMemo(() => recordsToCsl(sorted), [sorted])

  // Seed the per-website registry. Bibliography's setBibliography +
  // findRecord path ALSO bootstraps from website.config.collections (set
  // by content-loader) so insets that render before this section don't
  // see an empty list. This call is the explicit refresh path —
  // re-rendering with new records clears the cached registries so
  // numbered ordering doesn't leak across renders in the editor's
  // preview iframe.
  useEffect(() => {
    if (website) setBibliography(website, cslItems)
  }, [website, cslItems])

  // Use the same registry instance Cite uses so the back-matter list
  // and the inline cites share numbering. createRegistry was called
  // either by an earlier Cite render (which seeded with bootstrap-loaded
  // records) or by us here on first read.
  const entries = useMemo(() => {
    if (!website || cslItems.length === 0) return []
    const registry = getRegistryForStyle(website, style)
    if (!registry) return []
    try {
      return registry.getBibliography()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Bibliography: getBibliography failed', err)
      return []
    }
  }, [website, style, cslItems])

  // Typst back-matter: emit each entry as a paragraph whose `text` is
  // built from the FormattedEntry's `parts` (CSL field map, e.g.
  // `{ author, issued, title, publisher }`). When parts aren't shaped
  // the way we expect, fall back to entry.text (plain string, no
  // italics). Press's Paragraph parser walks the typst-flavoured
  // markup the helper emits.
  useDocumentOutput(
    block,
    'typst',
    <>
      <ChapterOpener title={heading} />
      <Sequence
        data={entries.map((entry) => ({
          type: 'paragraph',
          // Pass citestyle's already-formatted HTML through. Press's
          // Paragraph (typst adapter) parses inline marks (<i>, <em>,
          // <strong>, <a>) and emits the matching Typst markup;
          // <span class="csl-…"> wrappers fall through transparently
          // because parseStyledString doesn't special-case them. The
          // entry's plain text is the fallback for any entry where
          // citestyle declined to emit HTML.
          text: stripEntryWrapper(entry.html) || entry.text || '',
          attrs: { 'data-style': 'bibliography' },
        }))}
      />
    </>,
  )

  // HTML fragment for paged.js / EPUB. CSS Paged Media rules in
  // pagedjs-default/stylesheet.css give the list the expected back-matter
  // typography (hanging indent, smaller font, page break before).
  useDocumentOutput(
    block,
    'html',
    <article className="bibliography book-bibliography">
      {heading ? <h1>{heading}</h1> : null}
      <ol className="csl-bibliography">
        {entries.map((entry, i) => (
          <li
            key={i}
            className="csl-entry"
            dangerouslySetInnerHTML={{ __html: entry.html || entry.text || '' }}
          />
        ))}
      </ol>
    </article>,
  )

  return (
    <article className="book-bibliography mx-auto max-w-[var(--max-content-width)] px-6 py-12">
      {heading ? (
        <H1 text={heading} className="text-heading text-3xl font-bold mb-6" />
      ) : null}

      {entries.length === 0 ? (
        <p className="text-subtle">No bibliography entries.</p>
      ) : (
        <ol className="csl-bibliography">
          {entries.map((entry, i) => (
            <li key={i} className="csl-entry mb-3">
              <SafeHtml as="span" value={entry.html || entry.text || ''} />
            </li>
          ))}
        </ol>
      )}
    </article>
  )
}
