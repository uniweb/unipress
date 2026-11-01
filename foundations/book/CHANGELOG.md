# Changelog

## 0.5.3

### Fixed

- **A numbered style numbered its sources by file name.** `ieee`, `vancouver`, `ama`, `nature` and
  `science` number a source where the text first cites it, so a thesis that opened at `[8], [6]` opens
  at `[1], [2]`, and the list follows. On Typst, Paged.js and EPUB; LaTeX already did, through biblatex.
  `book.bibliography.sortBy` now orders what no citation decides: the sources nothing cites, and a list
  of a section's own.
- **A second `Bibliography` section printed the document's list**, whatever it asked for. Each prints
  its own, as the monograph guide says.
- **The first citation of an author's two works from one year lost its letter** under an author-date
  style: `(Smith, 2020)` at first, then `(Smith, 2020a)`.
- **A space between two marks disappeared** on Typst and LaTeX: `**bold** *italic*` printed `bolditalic`,
  a numbered reference `[1]R. M. Karp`, and a report in the list `Technical Report388`. From `@uniweb/press`.
- **Inline code printed as plain text** on Typst and LaTeX. It prints as code. From `@uniweb/press`.

## 0.5.2

### Fixed

- **The first citation in a document printed nothing on Typst** under a numbered style, such as
  `ieee`, the thesis default. `[@a; @b]` left a stray comma in the sentence, and `[@a]` printed as
  `[?@a]`, as if its record were missing.

## 0.5.1

### Fixed

- **A document with no cover opened on a blank page.**
- **Citations and cross-references printed nothing** in a theorem, a proof, an abstract, an appendix
  or back matter, on Typst and LaTeX: only a chapter substituted them. Every section now does.
- **`[#id]` printed nothing on Typst.** It prints the number, as `<Ref>` does on the web, and an id
  or a citation key that resolves to nothing prints as `[?key]`.
- **A theorem printed "Theorem."** on Typst, with no number or name. It now prints "Theorem 1 (Name)."
- **A list of figures took a chapter number**, and on Typst an empty one took a page. A list of
  tables printed each entry as a figure.
- **A document with its own `TitlePage` got the template's too**, ahead of it. A document with a
  `Contents` section now gets the contents where it stands, on Typst and LaTeX.
- **A cover that didn't load** was skipped in silence. It's now said, and a host may stop the build.
- **The contents' links on the web** used an anchor of their own. They use kit's `headingId`, so they
  land on a heading in any language.

## 0.5.0

### Added

- **`paper`** — a top-level `paper: a4 | letter` in `document.yml`, on every output with
  pages, and a `paper` a host names for one build (`unipress compile --paper`). A host's
  comes first, then `book.trim`, then `paper:`. Each output declares it: `paper: true`
  on `typst`, `pdf`, `latex` and `pagedjs`, `paper: false` on `epub`.
- **Footnotes.** `[^id]` where the mark goes and a `[^id]: the note` paragraph in the same
  file: at the foot of the page in Typst and LaTeX, at the end of the section in Paged.js
  and EPUB.
- A title in frontmatter, for a file that opens with no heading.
- The article genre on Paged.js: its own page, its title block, and sections that flow on.

### Fixed

- A chapter's title printed twice, in every format and in LaTeX as an extra chapter. The
  opener now is the chapter's heading, so the contents and the running heads still find it.
- Paged.js ignored `book.trim` and printed everything on 6×9.
- LaTeX ignored a `book.trim` preset, and a trim's margins.
- `frontMatterNumbering: roman` numbered the front matter in arabic, and `none` numbered it
  anyway.
- Abstract, appendix, bibliography and back matter took a chapter number in the contents.

## 0.4.3

### Changed

- **Renamed `@unipress/book`** (was `@uniweb/book`), and so are its
  siblings: `@unipress/data` and `@unipress/business-docs`. Nothing else
  changed. A document that pins `@uniweb/book@<version>` keeps compiling
  against that version, since a registry ref's scope is not part of the
  URL it resolves to; pin `@unipress/book@0.4.3` to move to this one.

## 0.4.2

### Fixed

- Images referenced in markdown embed in Typst/PDF, LaTeX and EPUB output
  (from `@uniweb/press`'s inline body-image bundling).

## 0.4.1

### Added

- **`book.structure.numberHeadings`** (article genre) — set to `true` for
  numbered sections (`1`, `1.1`, `1.1.1`). Off by default; section
  headings stay unnumbered unless you opt in.

## 0.4.0

The `article` release. The book foundation now renders a single-column,
chapter-less paper alongside the chaptered book — the natural shape for
turning a folder of notes or docs into one clean, shareable PDF.

### Added

- **`article` genre** (`book.kind: article`) — continuous single-column
  prose on a paper size, with symmetric single-sided margins, a centered
  page number, an inline title block (no separate title page), and clean
  unnumbered section headings. No chapter openers, page breaks, covers, or
  front matter. Each top-level markdown file becomes a section; its `# H1`
  is the section heading. Body copy, fonts, and code blocks render
  identically to the book genre.
- **`a4` and `letter` trim presets** — full-size single-sided paper with
  symmetric, generous margins tuned for a comfortable reading measure
  (~75 characters/line at the 11pt default). Unlike the book trims, these
  use equal inside/outside margins (no binding gutter). `article` defaults
  to `a4` when no trim is set.
- **Table of contents is opt-in for `article`** (`book.structure.toc: true`);
  the book genre still defaults it on.

## 0.2.0

The citations release. The book foundation now ships a working
bibliography + inline-cite system, and the unipress `monograph`
template uses it as a worked example.

### Added

- **`Bibliography` section type** — back-matter list formatted by
  citestyle. Reads CSL-shaped records from a `collections/bibliography/`
  directory (YAML, JSON, or markdown one-file-per-entry). Numbered
  styles (IEEE, Vancouver, Nature, Science, AMA) get document-wide
  numbering consistent with the inline cites: same key cited inline
  as `[1]` lands as `[1]` in the back-matter list.
- **`Cite` inline inset** — renders Pandoc-style cite shortcuts
  recognized by content-reader: `[@key]`, `[@key]{page=42}`,
  `[@a; @b]` for multi-cite clusters, `[@key]{suppress-author}` for
  prose where the author is named in the surrounding text. Missing
  keys render `[?]` rather than failing the compile.
- **Nine citation styles** statically wired: chicago-author-date
  (default), apa, mla, harvard, ieee, vancouver, ama, nature, science.
  Switch the whole document's bibliographic apparatus by changing
  `book.citationStyle:` in `document.yml`.
- **Foundation utilities** under `src/utils/`:
  - `to-csl.js` normalises both flat shorthand (`year: 1859`,
    `author: "Last, First"`) and full CSL-JSON shapes.
  - `cite-registry.js` holds a per-website citestyle Registry per
    active style; bootstraps from `website.config.collections.<name>.records`
    so insets that render before the Bibliography section see the data.
  - `resolve-inline-insets.js` substitutes inline-inset markers in
    paragraph text — used by the Typst output path before Press's
    Sequence reads `element.text`.
  - `parts-to-typst.js` translates the bibliography entry's HTML to
    Typst markup (italics, links) for the source-bundle output.
  - `bibliography-css.js` shared between paged.js and EPUB stylesheets.
- **CSS Paged Media rules** for the bibliography back-matter:
  page-break-before, running header swap, hanging indent on
  `.csl-entry`. Same rules append to the EPUB stylesheet.

### Changed

- `Chapter` and `BackMatter` section types now pass `block` to
  `<Prose>` so kit's inline-inset render path can resolve cites in
  paragraph text.
- `buildEpubOptions` now ships a foundation-supplied stylesheet
  (Press's defaults plus the shared bibliography CSS) instead of
  relying on Press's baseline.

### Dependencies

- Adds `citestyle@^1.1.0` (suppress-author support landed in citestyle
  1.1.0).

## 0.1.1

Earlier releases — see git history.
