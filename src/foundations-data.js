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
 * Resolution path
 * ─────────────────────────────────────────────────────────────────────────
 *
 * `unipress create my-doc --template book`:
 *   1. catalog lookup (this file) → entry.foundation.ref + entry.scaffold.
 *   2. scaffold copies templates-data.js[entry.scaffold] into my-doc/. The
 *      bundled document.yml has `foundation: <entry.foundation.ref>` (the
 *      registry-ref form, e.g., '@uniweb/book@0.1.0' — rewritten from the
 *      committed dev path-ref by scripts/generate-templates-data.js).
 *
 * `unipress compile my-doc`:
 *   1. document.yml `foundation: '@uniweb/book@0.1.0'` is parsed as a
 *      registry ref by foundation-loader.js.
 *   2. The loader constructs a URL from the registry base
 *      (UNIWEB_REGISTRY_URL or the production default at
 *      site-router.uniweb-edge.workers.dev) → fetches + caches.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * source.url
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Each entry's `foundation.source.url` is the human-meaningful "where this
 * foundation lives" pointer shown in `list-templates` output and post-create
 * messages. It does NOT drive resolution under the registry-ref-in-document.yml
 * model — foundation-loader builds its own URL from the ref + base. The
 * URL is included for transparency.
 *
 * v0.2 entries pin local-registry URLs (http://localhost:4001/...) so
 * foundation devs running `uniweb publish --local` can verify resolution
 * end-to-end. TF8 of the unipress-foundations-and-templates plan switches
 * these to the production registry once the foundations publish there.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Storage format
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Stored as a plain JS module (not YAML) so `bun build --compile` can
 * inline it at bundle time. The compiled binary has no filesystem for
 * runtime reads.
 */

const LOCAL_REGISTRY_BASE = 'http://localhost:4001/registry/packages'

function localUrl(namespace, name, version) {
  return `${LOCAL_REGISTRY_BASE}/${namespace}/${name}/${version}/foundation.js`
}

const BOOK_FOUNDATION = {
  ref: '@uniweb/book@0.1.0',
  source: { url: localUrl('uniweb', 'book', '0.1.0') },
}

const DATA_FOUNDATION = {
  ref: '@uniweb/data@0.1.0',
  source: { url: localUrl('uniweb', 'data', '0.1.0') },
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
]
