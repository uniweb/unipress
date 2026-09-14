/**
 * Bibliography — back-matter section type that formats a collection of
 * bibliographic records through citestyle.
 *
 * Reads the active style from `book.citationStyle` in document.yml
 * (overridable per-section via the `style:` frontmatter param). Sort
 * order falls through `book.bibliography.sortBy` -> `params.sortBy` ->
 * 'author'. The records arrive as `content.data.bibliography`: a
 * `query: bibliography` on the section (or its page) fills it, and a list of
 * another name is bound to it with `fetch: { query: <name>, as: bibliography }`.
 *
 * `onlyCited` (render only entries reached by a Cite inset) is
 * intentionally absent from v1.
 */
export default {
  // The `content.data` key this section reads. `{}`: records with no schema.
  data: { bibliography: {} },

  defaults: {
    title: 'Bibliography',
    sortBy: null,    // falls through to book.bibliography.sortBy or 'author'
    style: null,     // falls through to book.citationStyle
  },
}
