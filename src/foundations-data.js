/**
 * unipress template catalog.
 *
 * Each entry is one starter pattern users pick at `unipress create` time.
 * A template pins a foundation (the runtime artifact unipress loads at
 * compile) and ships starter content that exercises that foundation.
 *
 * Multiple templates can pin the same foundation — `book`, `monograph`,
 * and `report` all use `@uniweb/book` with different starter content,
 * different `book.structure:` defaults, and different sample chapters.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Distribution
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Foundations are deployed as static artifacts to the unipress repo's
 * GitHub Pages site. URL pattern:
 *
 *   https://uniweb.github.io/unipress/foundations/<name>/<version>/foundation.js
 *
 * On every push to main, `.github/workflows/deploy-foundations.yml`
 * builds each `foundations/<name>/` and layers the resulting `dist/` into
 * the gh-pages branch under `foundations/<name>/<version>/`. Versions
 * accumulate; older versions stay reachable indefinitely.
 *
 * GH Pages serves `Access-Control-Allow-Origin: *` on static files, so
 * cross-origin imports work for browser hosts (Uniweb editor preview).
 * The unipress CLI fetches the URL directly and caches at
 * `~/.cache/unipress/foundations/...`.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Resolution path
 * ─────────────────────────────────────────────────────────────────────────
 *
 * `unipress create my-doc --template book`:
 *   1. catalog lookup (this file) → entry.foundation.ref + entry.scaffold.
 *   2. scaffold copies templates-data.js[entry.scaffold] into my-doc/. The
 *      bundled document.yml has `foundation: <entry.foundation.ref>` (the
 *      registry-ref form, e.g., '@uniweb/book@0.1.1' — rewritten from the
 *      committed dev path-ref by scripts/generate-templates-data.js).
 *
 * `unipress compile my-doc`:
 *   1. document.yml `foundation: '@uniweb/book@0.1.1'` is parsed as a
 *      registry ref by foundation-loader.js.
 *   2. The loader constructs a URL from the registry base
 *      (UNIWEB_REGISTRY_URL env override or the default GH Pages base) →
 *      fetches + caches.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * source.url
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Each entry's `foundation.source.url` is the human-meaningful "where this
 * foundation lives" pointer shown in `list-templates` output and post-create
 * messages. It mirrors the URL the loader builds at compile time, but does
 * not itself drive resolution — the loader builds its own URL from
 * `foundation.ref` + the configured base.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Storage format
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Stored as a plain JS module (not YAML) so `bun build --compile` can
 * inline it at bundle time. The compiled binary has no filesystem for
 * runtime reads.
 */

const PUBLIC_FOUNDATIONS_BASE = 'https://uniweb.github.io/unipress/foundations'

function publicUrl(name, version) {
  return `${PUBLIC_FOUNDATIONS_BASE}/${name}/${version}/foundation.js`
}

const BOOK_FOUNDATION = {
  ref: '@uniweb/book@0.2.0',
  source: { url: publicUrl('book', '0.2.0') },
}

const DATA_FOUNDATION = {
  ref: '@uniweb/data@0.1.0',
  source: { url: publicUrl('data', '0.1.0') },
}

const BUSINESS_DOCS_FOUNDATION = {
  ref: '@uniweb/business-docs@0.1.0',
  source: { url: publicUrl('business-docs', '0.1.0') },
}

export const FOUNDATIONS = [
  {
    id: 'book',
    name: 'Book',
    description:
      'Long-form prose with chapters. Title page, copyright, TOC, ' +
      'and trade-6x9 trim by default. Compiles to PDF (Typst), Typst ' +
      'source bundle, Paged.js HTML, or EPUB.',
    outputs: ['pdf', 'typst', 'pagedjs', 'epub'],
    foundation: BOOK_FOUNDATION,
    scaffold: 'book',
  },
  {
    id: 'monograph',
    name: 'Monograph',
    description:
      'Scholarly long-form work. Same foundation as `book` with ' +
      'footnote-heavy starter content and academic-typography defaults.',
    outputs: ['pdf', 'typst', 'pagedjs', 'epub'],
    foundation: BOOK_FOUNDATION,
    scaffold: 'monograph',
  },
  {
    id: 'report',
    name: 'Report',
    description:
      'Long-form report with mixed prose and tables. Same foundation as ' +
      '`book`, configured for technical writing rather than narrative.',
    outputs: ['pdf', 'typst', 'pagedjs', 'epub'],
    foundation: BOOK_FOUNDATION,
    scaffold: 'report',
  },
  {
    id: 'thesis',
    name: 'Thesis (UofT-shaped)',
    description:
      'Graduate thesis targeting the University of Toronto SGS formatting ' +
      'requirements. Includes title page, abstract, list of figures, ' +
      'theorem/lemma/proof environments, biblatex bibliography, and ' +
      'autoref cross-references. Compiles to PDF/A-1b for ProQuest archival ' +
      'via `latexmk` once `tlmgr install ut-thesis` has run locally.',
    outputs: ['latex', 'pdf', 'typst', 'pagedjs', 'epub'],
    foundation: BOOK_FOUNDATION,
    scaffold: 'thesis',
  },
  {
    id: 'data-report',
    name: 'Data Report',
    description:
      'Aggregate metrics across a set of records — publications, funding, ' +
      'supervisions. Emits both a downloadable Excel workbook and a Word report.',
    outputs: ['xlsx', 'docx'],
    foundation: DATA_FOUNDATION,
    scaffold: 'data-report',
  },
  {
    id: 'directory',
    name: 'Directory',
    description:
      'Listing of records (people, organizations, items) with filterable ' +
      'fields and a queryable surface. Emits Excel + Word output.',
    outputs: ['xlsx', 'docx'],
    foundation: DATA_FOUNDATION,
    scaffold: 'directory',
  },
  {
    id: 'invoice',
    name: 'Invoice',
    description:
      'A multi-line subscription invoice referencing a signed statement of ' +
      'work. Demonstrates the @uniweb/business-docs foundation: SOW + invoice ' +
      'collections, computed totals, and the SHOW-default Loom shorthand.',
    outputs: ['docx', 'pagedjs'],
    foundation: BUSINESS_DOCS_FOUNDATION,
    scaffold: 'invoice',
  },
]
