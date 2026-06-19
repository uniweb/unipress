# Changelog

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
