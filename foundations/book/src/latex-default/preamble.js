/**
 * Default LaTeX preamble — biblatex configuration (when a bibliography
 * is present) plus custom commands the book foundation expects to call
 * from emitted body source. Sits at the foundation level so all book-
 * shaped templates (book, monograph, report, future thesis modes)
 * share one preamble surface.
 *
 * Two segments:
 *   1. Bibliography setup: \usepackage[style=…,backend=biber]{biblatex}
 *      + \addbibresource{refs.bib}, gated on whether a refs.bib is
 *      present in the bundle. The active style is mapped from the
 *      foundation's `book.citationStyle` config to a biblatex style
 *      package via STYLE_MAP below.
 *   2. Custom commands: \chapteropener, \sectionbreak — emitted by the
 *      LaTeX adapter for ChapterOpener and Asterism builders.
 *
 * Package loading is in template.tex (geometry, hyperref, etc.); we add
 * biblatex here because it depends on `book.citationStyle` which is a
 * compile-options-time input. Splitting "always-present packages"
 * (template) from "options-driven packages" (preamble) keeps the
 * boundaries readable.
 */

// Map @uniweb/book's `citationStyle` values to biblatex `style=` package
// options. Verified against TeX Live 2026 — every entry below resolves
// to either a core biblatex style or a CTAN-shipped community package.
//
// Notes on substitutions:
//   - chicago-author-date → `authoryear-comp` is the closest core
//     biblatex style; biblatex-chicago exists but adds another package
//     dependency for marginal differences.
//   - harvard → `authoryear` (no `-comp` so multi-author lists fully
//     repeat — the Harvard tradition).
//   - mla, apa, vancouver, ama, nature, science → community packages
//     (`biblatex-mla`, `biblatex-apa`, `biblatex-vancouver`, etc.).
//     Authors who collaborate with someone on a stripped-down TeX
//     install can override book.citationStyleBiblatex in document.yml
//     to fall back to a core style; the override is not yet wired but
//     the site config field is reserved for it.
const STYLE_MAP = {
  apa: 'apa',
  mla: 'mla-new',
  'chicago-author-date': 'authoryear-comp',
  ieee: 'ieee',
  vancouver: 'vancouver',
  harvard: 'authoryear',
  ama: 'ama',
  nature: 'nature',
  science: 'science',
}

const COMMANDS = `% Custom commands used by emitted body source.

% \\chapteropener — emitted by Press's <ChapterOpener> builder. Three
% positional arguments: chapter number (may be empty), title, subtitle
% (may be empty). For a numbered chapter, LaTeX numbers via \\chapter
% itself; the explicit number argument is currently passed through but
% not displayed (the foundation may override this command to render a
% chapter-number page differently).
\\providecommand{\\chapteropener}[3]{%
  \\chapter{#2}%
  \\ifx&#3&\\else{\\par\\medskip\\noindent\\itshape #3\\par\\medskip}\\fi%
}

% \\sectionbreak — emitted by Press's <Asterism> builder. Three
% centred asterisks with vertical breathing room above and below.
\\providecommand{\\sectionbreak}{%
  \\par\\bigskip\\centerline{\\Large *\\quad *\\quad *}\\bigskip\\par%
}

% Theorem-family environments — emitted by the foundation's Theorem,
% Lemma, Definition, Proof section types. amsthm gives consistent
% styling across the four kinds; \\newtheorem[chapter] resets the
% counter at every \\chapter so authors get "Theorem 4.1" without
% manual numbering. Lemma shares the theorem counter so a Theorem
% followed by a Lemma in the same chapter numbers consecutively
% (Theorem 4.1, Lemma 4.2, …).
\\usepackage{amsthm}
\\theoremstyle{plain}
\\newtheorem{theorem}{Theorem}[chapter]
\\newtheorem{lemma}[theorem]{Lemma}
\\theoremstyle{definition}
\\newtheorem{definition}{Definition}[chapter]
% \\proof / \\endproof are part of amsthm's defaults — no \\newtheorem*
% needed. amsthm's proof env auto-emits the QED tombstone; use as:
%   \\begin{proof} ... \\end{proof}
`

const PREAMBLE = COMMANDS

export default PREAMBLE

/**
 * Build a preamble that includes biblatex setup when the document has
 * a bibliography. The caller (compile-options.js's `buildLatexOptions`)
 * decides `hasBibliography` by inspecting
 * website.config.collections.bibliography.records.
 *
 * @param {Object} [options]
 * @param {string} [options.language='en'] - Reserved for future
 *   language-specific commands (currently unused — babel handles
 *   language at template level).
 * @param {Object} [options.labels=null] - Reserved for label overrides.
 * @param {string} [options.citationStyle='chicago-author-date'] - Maps
 *   to a biblatex style via STYLE_MAP.
 * @param {boolean} [options.hasBibliography=false] - When true, emit
 *   the biblatex setup block. When false, emit only the commands —
 *   biblatex is a heavyweight package and skipping it speeds compile
 *   for non-bibliography documents.
 * @param {string} [options.bibResource='refs.bib'] - Filename biblatex
 *   should \\addbibresource. Must match the path the adapter writes
 *   the bibtex to (handed to compileLatex via adapterOptions.assets).
 */
export function createPreamble({
  language = 'en',
  labels = null,
  citationStyle = 'chicago-author-date',
  hasBibliography = false,
  bibResource = 'refs.bib',
} = {}) {
  void language
  void labels

  if (!hasBibliography) return COMMANDS

  const style = STYLE_MAP[citationStyle] || STYLE_MAP['chicago-author-date']

  const bibSetup = `% Bibliography (biblatex + biber). The active style maps from
% @uniweb/book's \`citationStyle\` config; biber is invoked
% automatically by latexmk so authors don't need to remember the
% multi-pass dance.
\\usepackage[style=${style},backend=biber]{biblatex}
\\addbibresource{${bibResource}}
`

  return bibSetup + '\n' + COMMANDS
}
