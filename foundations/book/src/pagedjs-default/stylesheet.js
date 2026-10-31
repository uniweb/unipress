/**
 * Default CSS Paged Media stylesheet for Paged.js-backed book PDFs.
 *
 * Written as `String.raw` literals in a .js module (rather than a
 * `.css?raw` import) because Vite's dep-optimizer chokes on non-standard
 * file extensions inside dependencies — the same constraint the Typst
 * default library uses for its .typ strings.
 *
 * `createStylesheet({ trim, kind })` builds it for a document: the page is
 * the same trim the Typst and LaTeX paths print on (`resolveTrim`), so a
 * document does not change size with its format. Foundations can either:
 *   - Use the default: `stylesheet`, or `createStylesheet()`.
 *   - Concatenate it with foundation overrides: `stylesheet + extraCss`.
 *   - Replace it entirely by authoring their own.
 */
import { resolveTrim } from '../typst-default/presets.js'

// A bound book: facing pages, the wider margin at the spine, each chapter on
// a right-hand page under its own running head.
function bookPageRules({ width, height, margins: m }) {
  return String.raw`
/* Page geometry */
@page {
  size: ${width} ${height};
  margin: ${m.top} ${m.outside} ${m.bottom} ${m.inside};
}
@page :left  { margin: ${m.top} ${m.inside} ${m.bottom} ${m.outside}; }
@page :right { margin: ${m.top} ${m.outside} ${m.bottom} ${m.inside}; }

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
`
}

// An article: one side of the paper, sections flowing on, a centered page
// number, a heading where the book has a chapter opener, and the title block
// at the top of the first page, as the Typst article has it. The block is the
// metadata the adapter writes into the page, shown instead of hidden.
function articlePageRules({ width, height, margins: m }) {
  return String.raw`
/* Title block */
[data-pagedjs-metadata] { display: block; text-align: center; margin-bottom: 2em; }
[data-pagedjs-metadata] span { display: none; }
[data-pagedjs-metadata] [data-field="title"] { display: block; font-size: 20pt; font-weight: 700; line-height: 1.2; }
[data-pagedjs-metadata] [data-field="subtitle"] { display: block; font-size: 13pt; font-style: italic; color: #3c3c3c; margin-top: 0.4em; }
[data-pagedjs-metadata] [data-field="author"] { display: block; font-size: 12pt; margin-top: 0.8em; }
[data-pagedjs-metadata] [data-field="date"] { display: block; font-size: 10pt; color: #5a5a5a; margin-top: 0.3em; }

/* Page geometry */
@page {
  size: ${width} ${height};
  margin: ${m.top} ${m.outside} ${m.bottom} ${m.inside};
  @bottom-center { content: counter(page); font-size: 9pt; }
}

/* A section heading: no page break before it */
h1 { font-size: 16pt; margin: 1.5em 0 0.5em; page-break-after: avoid; }
`
}

const SHARED_RULES = String.raw`
/* Hidden metadata block — the DOM carries it for CSS string-set / string() */
[data-pagedjs-metadata] { display: none; }

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

/* Footnotes: the notes close their section */
.footnotes { font-size: 9.5pt; border-top: 0.5pt solid #bbb; margin: 1.5em 0 0; padding: 0.5em 0 0 1.5em; }
.footnotes li { margin-bottom: 0.3em; }

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

/**
 * The stylesheet for a document.
 *
 * @param {object} [options]
 * @param {string|object} [options.trim] - A trim preset or spec, as `resolveTrim`
 *   takes. Unnamed: the article genre prints on A4, the book genre on 6×9.
 * @param {string} [options.kind] - `article` for the single-column genre.
 * @returns {string}
 */
export function createStylesheet({ trim, kind } = {}) {
  // After the shared rules, which a genre's own override.
  return kind === 'article'
    ? SHARED_RULES + articlePageRules(resolveTrim(trim || 'a4'))
    : SHARED_RULES + bookPageRules(resolveTrim(trim))
}

const stylesheet = createStylesheet()

export default stylesheet
