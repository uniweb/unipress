# @uniweb/book

A Uniweb foundation for books. Pairs with `@uniweb/press` to render long-form prose as a web reader and to compile it to Typst-bundled PDF, Paged.js HTML, or EPUB. Drives the `book`, `monograph`, and `report` templates in `@uniweb/unipress`.

## Shape

**Default section type:** `Chapter`. A markdown file like `chapter-01-introduction.md` is rendered by this section without any frontmatter — `Chapter`'s filename classifier handles non-chapter pages (`cover.md`, `acknowledgments.md`, appendices) too. Frontmatter `type:` overrides classification when needed.

**Layout:** one — `BookLayout` — which wraps the page body in Press's `<DocumentProvider>`, registers a document-level `metadata` entry with the book's title/author/isbn/etc. from `site.yml` / `document.yml`, and exposes a floating download button.

**Sections shipped:**

- `Chapter` — the default. Renders `content.sequence` (Kit's `<Prose>` for the web view) and registers a Typst fragment with Press (via `<ChapterOpener>` + `<Sequence>` from `@uniweb/press/typst`).
- `Cover` — front-matter page that emits the book's title/subtitle/author with special typography.
- `BackCover` — back-cover image page.
- `BackMatter` — for acknowledgments, colophon, about-the-author, etc. Skips chapter numbering.
- `Contents` — opt-in table of contents.

## Outputs

Declared in `src/foundation.js` under `outputs:`:

| Format    | Adapter            | Notes |
|-----------|--------------------|-------|
| `typst`   | typst              | Source-bundle zip the user (or unipress) compiles locally. |
| `pdf`     | typst (`via:`)     | Hosts that supply `mode: 'server'` + `endpoint` get a server-compiled PDF; hosts that supply `mode: 'sources'` (unipress) get a typst bundle and finish locally. |
| `pagedjs` | pagedjs            | HTML + stylesheet the browser paginates in a new tab. |
| `epub`    | epub               | EPUB3 reflowable. Shares the 'html' input shape with pagedjs. |

Per-format adapter options (meta, preamble, template, cover assets, stylesheet) are assembled by builders in `src/compile-options.js`.

## Inlined defaults

Two sub-trees live inside the foundation:

- `src/typst-default/` — Typst preamble + parameterised template. Trim, typography, structure (title page / copyright page / TOC / front-matter pagination), and localized labels are configurable via `book.trim`, `book.typography`, `book.structure`, `book.labels`, `book.language` in `site.yml` / `document.yml`.
- `src/pagedjs-default/` — CSS Paged Media stylesheet (6×9 trade size, chapter openers on recto, running headers, footer page numbers).

If multiple foundations end up wanting to share these defaults, they can split back out into their own packages.

## Wiring into a site

```yaml
# site.yml or document.yml
foundation: '@uniweb/book@0.1.0'
```

For a Uniweb-site workspace using this foundation, the site's `vite.config.js` enables Press's typst-server compile plugin:

```js
import { defineSiteConfig } from '@uniweb/build/site'
import { pressTypstCompile } from '@uniweb/press/vite-plugin-typst'
export default defineSiteConfig({ plugins: [pressTypstCompile()] })
```

For unipress documents, no Vite plugin is needed — `unipress compile` runs typst directly.

## Configuration knobs

A document's `book:` block in `document.yml` (or `site.yml`):

```yaml
book:
  title: "My Book"
  subtitle: "A subtitle"
  author: "Jane Doe"
  language: en
  isbn: "978-..."
  rights: "© 2026"
  publisher: "..."

  trim: trade-6x9                 # or trade-7x10, crown-octavo, royal-octavo, a5
  typography:
    bodySize: 11pt
    leading: 0.72em
    bodyFont: "Charter"
    headingFont: ["Charter", "Georgia"]
  structure:
    titlePage: true
    copyrightPage: true
    toc: true
    tocDepth: 2
    frontMatterNumbering: none    # or 'roman' / 'arabic'
  labels:
    chapter: "Chapitre"           # localized overrides; defaults from book.language
    by: "par"
  covers:
    front: /covers/front.jpg
    back: /covers/back.jpg
```

## Theme variables

```yaml
# theme.yml
vars:
  max-content-width: 48rem        # reading column width on screen
  header-height: 3.5rem           # web preview top bar
```

Defaults live in `src/foundation.js`'s `vars:` block.

## See also

- `framework/press/docs/guides/book-publishing.md` — book publishing guide.
- `framework/press/docs/concepts.md` — Press's modes for combining preview and registration.
- `framework/unipress/` — the CLI that compiles author-supplied content directories using this foundation.
