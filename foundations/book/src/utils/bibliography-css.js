/**
 * Bibliography-specific CSS, shared between paged.js and EPUB outputs.
 *
 * The paged.js stylesheet (`pagedjs-default/stylesheet.js`) inlines this
 * verbatim alongside its CSS Paged Media rules. EPUB pipes it through
 * Press's `adapterOptions.stylesheet`, which gets stitched into the
 * EPUB's `OEBPS/styles.css` and linked from each chapter's xhtml shell.
 *
 * Kept as a String literal in a .js module — same pattern the rest of
 * the foundation uses for embedded CSS — to avoid Vite's dep-optimizer
 * choking on `.css?raw` imports.
 */
export const bibliographyCss = `
/* Inline citations — citestyle wraps each in span.cite (or
 * span.cite.cite--missing for unresolved keys). Style as normal phrasing,
 * distinguish missing keys with a colour cue. */
.cite { white-space: normal; }
.cite--missing { color: #b00; }

/* Bibliography back-matter section.
 * - Hanging indent on each entry (0.92em font, 1.4 line-height).
 * - Numbered styles keep their own [n] prefixes (no list-number). */
.book-bibliography h1 { margin-top: 0; }
.csl-bibliography {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.92em;
  line-height: 1.4;
}
.csl-entry {
  padding-left: 1.5em;
  text-indent: -1.5em;
  margin-bottom: 0.5em;
}
`

export default bibliographyCss
