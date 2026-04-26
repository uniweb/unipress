/**
 * Default CSS Paged Media stylesheet for Paged.js-backed book PDFs.
 *
 * Exported as a `String.raw` literal from a .js module (rather than a
 * `.css?raw` import) because Vite's dep-optimizer chokes on non-standard
 * file extensions inside dependencies — the same constraint the Typst
 * default library uses for its .typ strings.
 *
 * Foundations can either:
 *   - Use this stylesheet verbatim: pass it as `adapterOptions.stylesheet`.
 *   - Concatenate it with foundation overrides: `stylesheet + extraCss`.
 *   - Replace it entirely by authoring their own.
 */

const stylesheet = String.raw`
/* Hidden metadata block — the DOM carries it for CSS string-set / string() */
[data-pagedjs-metadata] { display: none; }

/* Page geometry — 6×9 US trade size */
@page {
  size: 6in 9in;
  margin: 0.75in 0.5in 0.75in 0.75in;
}
@page :left  { margin: 0.75in 0.75in 0.75in 0.5in; }
@page :right { margin: 0.75in 0.5in 0.75in 0.75in; }

/* Named string: each h1 updates the running-header chapter name */
h1 { string-set: chapter content(); }

@page :left  { @top-left  { content: string(chapter); font-size: 9pt; color: #666; } }
@page :right { @top-right { content: string(chapter); font-size: 9pt; color: #666; } }

/* Page-number footer */
@page :left  { @bottom-left  { content: counter(page); font-size: 9pt; } }
@page :right { @bottom-right { content: counter(page); font-size: 9pt; } }

/* Chapter openers start on a right-hand page, no running header */
h1 {
  break-before: recto;
  page: chapter-opener;
  font-size: 22pt;
  margin-top: 2in;
}
@page chapter-opener {
  @top-left { content: none; }
  @top-right { content: none; }
}

/* Body typography */
body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 11pt;
  line-height: 1.45;
  hyphens: auto;
}
/* No paragraph indent on first paragraph (Paged.js 0.4.3 chokes on the
 * combined first-of-type + sibling selector; use a class when needed). */
p { margin: 0 0 0.75em; text-indent: 1.25em; }
p.lead, p:first-child { text-indent: 0; }

h2 { font-size: 14pt; margin: 1.5em 0 0.5em; page-break-after: avoid; }
h3 { font-size: 12pt; margin: 1.2em 0 0.4em; page-break-after: avoid; }
h4 { font-size: 11pt; margin: 1em 0 0.3em; page-break-after: avoid; font-weight: 700; }

/* Code */
code { font-family: ui-monospace, Menlo, monospace; font-size: 0.92em; }
pre {
  font-size: 9.5pt;
  padding: 0.8em;
  background: #f5f5f5;
  overflow: hidden;
  page-break-inside: avoid;
}

/* Quotes */
blockquote {
  border-left: 3px solid #ccc;
  margin: 1em 0;
  padding: 0 0 0 1em;
  color: #444;
  font-style: italic;
}

/* Lists */
ul, ol { margin: 0.5em 0 0.75em 1.5em; }

/* Figures — keep together */
figure { break-inside: avoid; margin: 1em 0; }
figure img { max-width: 100%; height: auto; }
figure figcaption { font-size: 9.5pt; color: #555; margin-top: 0.4em; }

/* Tables — avoid splitting rows across pages */
table { border-collapse: collapse; width: 100%; margin: 1em 0; }
table, th, td { page-break-inside: avoid; }
th, td { border: 1px solid #ddd; padding: 0.35em 0.5em; font-size: 10pt; }

/* Links — faint underline, same colour as body in print */
a { color: inherit; text-decoration: underline; text-decoration-thickness: 0.5pt; }

/* Inline citations — citestyle wraps each in span.cite (or
 * span.cite.cite--missing for unresolved keys). Style them as normal
 * phrasing, distinguish missing keys with a colour cue. */
.cite { white-space: normal; }
.cite--missing { color: #b00; }

/* Bibliography back-matter section.
 * - Forced page break before so the references start on their own page.
 * - Running header swaps to "Bibliography" via string-set.
 * - The .csl-bibliography list uses hanging indents; numbered styles
 *   keep their own [n] prefixes (no list-number).
 * - Slightly smaller font, looser leading — standard back-matter look. */
.book-bibliography { break-before: page; string-set: chapter "Bibliography"; }
.book-bibliography h1 { break-before: avoid; margin-top: 0; }
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
  break-inside: avoid;
}
`

export default stylesheet
