/**
 * Bibliography — back-matter section type that formats a collection of
 * bibliographic records through citestyle.
 *
 * Reads the active style from `book.citationStyle` in document.yml
 * (overridable per-section via the `style:` frontmatter param). Sort
 * order falls through `book.bibliography.sortBy` -> `params.sortBy` ->
 * 'author'. The collection name in `params.data` defaults to
 * 'bibliography'; the page enclosing the section must declare the
 * matching `fetch: [{ collection: bibliography }]` in page.yml.
 *
 * `onlyCited` (render only entries reached by a Cite inset) is
 * intentionally absent from v1 — see kb/framework/plans/
 * unipress-bibliography-via-citestyle.md §3.1.1 for why.
 */
export default {
  defaults: {
    title: 'Bibliography',
    sortBy: null,    // falls through to book.bibliography.sortBy or 'author'
    style: null,     // falls through to book.citationStyle
    data: 'bibliography',
  },
}
