# unipress for developers

The developer-track companion to the README. Read this if you're considering writing a foundation that compiles to documents — or to documents *and* websites from the same source.

## What you actually get

A foundation is a [Uniweb](https://uniweb.io) component system. unipress is the **headless runtime** for it: run `unipress compile <dir>` and the same foundation that drives a Uniweb website produces a downloadable file from a content directory.

That means everything the framework does for websites, you can do for documents. The visual editor goes away; the compile pipeline stays.

## Section types are the vocabulary

A foundation declares **section types** — addressable React components that content authors reference by name from markdown frontmatter:

```markdown
---
type: Chapter
title: "Chapter One"
---

Prose body here.
```

The foundation decides what `Chapter` means: its layout, its typography, what data it expects, how it renders across each output format the foundation declares. Authors don't think in components — they think in *kinds of section*. The component is the foundation developer's responsibility; the content is the author's.

## Mix prose with structured data

A document is rarely just prose. Foundations declare data inputs; authors fill them in. The data can come from any of these surfaces:

- **Markdown content** — the prose body of each `.md` file, parsed into a structured tree (title, paragraphs, items, links, images, code blocks).
- **Frontmatter params** — declared in each section's YAML frontmatter, typed by the foundation's `meta.js`.
- **File-based collections** — `collections/publications.json`, `collections/team.yml`, or markdown frontmatter swept into a list at build time. Compile to one `/data/<name>.json` per collection.
- **API-backed collections** — declare a fetcher in `document.yml`; the build pipeline resolves it at compile time. The foundation reads `content.data` and renders.
- **Computed values via [Loom](https://github.com/uniweb/loom)** — Loom is an expression language for instantiating templates against hierarchical data. Pull a publications list from a collection, format each entry with a Loom expression, and the result lands typeset in your output.

All of these flow through the same foundation pipeline. A "Bibliography" section can pull entries from a collection, format them through Loom-templated citations, and embed the result inline in a typeset chapter — same primitives whether the data came from a YAML file, a JSON dump, or an API endpoint.

## Outputs are foundation-declared

```js
// foundation/src/foundation.js
export default {
  outputs: {
    pdf:    { extension: 'pdf', via: 'typst', getOptions: buildTypstOptions },
    epub:   { extension: 'epub', getOptions: buildEpubOptions },
    docx:   { getOptions: buildDocxOptions },
    'tax-form-2024': { getOptions: buildTaxFormOptions },  // your own adapter
  },
}
```

Each entry says: which Press adapter handles the format (`via:`), which file extension to default to (`extension:`), and how to assemble adapter-specific options from the website's resolved content (`getOptions(website, hostHints)`).

Press ships adapters for Word, Excel, Typst (PDF), and HTML-shaped output. For a format Press doesn't ship — a CSV feed, a domain-specific XML, a one-of-a-kind regulatory submission — write a custom adapter using [`@uniweb/press/ir`](https://github.com/uniweb/press) and declare it on the foundation. unipress dispatches by name; nothing in unipress itself needs to know about your format.

## Same foundation, two runtimes

`unipress compile` is one consumer. The Uniweb website pipeline (`uniweb dev`, `uniweb build`) is the other. Same foundation, same content shape, same data declarations — different runtime.

That's the structural payoff: the work of defining section types, theming, and rendering isn't single-purpose. A "regulatory report" foundation can drive both an HTML site that stakeholders browse and a PDF/XLSX/DOCX bundle filed quarterly. A "research output" foundation can drive a public-facing journal site and a print-ready PDF for archival. Authoring once produces every modality.

## A worked example

A research-group annual-report foundation (`@yourorg/annual-report`) might ship:

- **Section types**: `Cover`, `ExecutiveSummary`, `Members`, `PublicationsList`, `FundingTable`, `Charts`, `Appendix`.
- **Data**: a `publications.yml` collection (file-based) listing every paper with co-authors, year, journal; a `funding.json` collection with grant data; an API-backed `metrics:` collection pulling live citation counts.
- **Loom templates**: each `Publication` rendered as `**{title}**. {authors.formatted}. *{journal}*, {year}. [{doi}](https://doi.org/{doi})`.
- **Outputs**: `pdf` (typeset for the dean's office), `xlsx` (one sheet per data block, for finance), `docx` (for collaborators who don't open PDFs), `pagedjs` (HTML for the public site).

A content author writes:

```markdown
---
type: PublicationsList
title: "Publications"
data: publications
filter:
  year: 2024
---

The group published 47 papers in 2024, a 30% increase over 2023.
```

`unipress compile annual-2024 --format pdf` walks the content through the foundation, resolves Loom expressions over the filtered collection, runs the typst adapter, ships a typeset PDF. `unipress compile annual-2024 --format xlsx` produces a workbook with one sheet per data section. The same source directory; two file types, both honest.

## Where to go from here

- **Foundation contract** — the `outputs:` map, `meta.js` section-type discovery, the `getOptions(website, hostHints)` signature: see [foundation configuration](https://github.com/uniweb/docs/blob/main/reference/foundation-config.md).
- **Data fetching** — collections, fetchers, predicates, where-objects, deferred fields: see the [data fetching reference](https://github.com/uniweb/docs/blob/main/reference/data-fetching.md).
- **Loom** — expression language for instantiating templates against hierarchical data: [`@uniweb/loom`](https://github.com/uniweb/loom).
- **Press (the output layer)** — [`@uniweb/press`](https://github.com/uniweb/press) docs cover the registration pattern foundations consume, the IR layer for custom adapters, and per-adapter notes (docx invariants, typst conventions, the EPUB pipeline).
- **Building a foundation from scratch** — [Uniweb framework docs](https://github.com/uniweb/docs) cover the full authoring story; everything written for sites applies to documents.

## A few things worth knowing upfront

**Documents are static at compile time.** unipress produces bytes; once the file is on disk, it doesn't change. "Dynamic data" in a document means *the data backing the document can vary between compiles* (re-run `unipress compile` after the API has new data; get a new PDF). It does not mean the PDF live-updates while someone reads it. That's website territory.

**Foundations stay environment-agnostic.** unipress runs in Node; the Uniweb editor runs in the browser. Foundations should not branch on `typeof window` or do their own asset I/O. The compile pipeline supplies a `loadAsset(src)` helper that hosts implement appropriately for their runtime; foundations just call it. The book foundation in this repo is the reference example.

**Compile failures are debuggable.** `unipress compile <dir> --verbose` streams every step; `unipress inspect <dir>` dumps the parsed content tree as JSON before the foundation runs (useful when output looks wrong and you want to know whether the input was right). Press emits structured warnings when an adapter receives unexpected shapes.

**Pre-1.0.** The contract is settling but not frozen. The foundation `outputs:` map, the `meta.js` discovery model, the `compileDocument` API, the section-type vocabulary — all stable enough to build against, with breaking changes possible (and documented in the CHANGELOG) before 1.0.
