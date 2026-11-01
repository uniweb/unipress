# unipress

**Compile a directory of markdown into a document — typeset PDF, EPUB, Word, Excel, Paged.js HTML, Typst source — using a foundation that knows the conventions of the kind of document you're writing.**

**[unipress.app](https://unipress.app)** has the docs, the templates and the publishing guide.

You already write in markdown, and you keep it organized — a folder of files, numbered for order, maybe a `README` and some assets. That's good structure. But turning it into one polished, shareable document usually means pandoc incantations, a LaTeX toolchain, or a pile of glue scripts.

unipress does it in one command.

## Quick start: markdown you already have → a PDF

Point it at your folder:

```bash
cd my-docs        # a folder of .md files
unipress compile .
```

There's no project to set up. The first time, unipress sees there's no config, offers to create a small `document.yml` for you, and produces the PDF — a clean, single-column **article**: typeset prose, an inline title block, no chapters, on the paper your region uses. Numbered filenames (`01-intro.md`, `02-overview.md`) set the section order; `README.md` and draft files (`_notes.md`) are left out.

Prefer no prompts? `--yes` takes the defaults — an article, PDF output:

```bash
unipress compile . --yes
unipress compile . --yes --format epub      # or any format the foundation emits
```

The generated `document.yml` is yours to keep and edit — it holds the title, reading order, and output format. Re-run compile whenever the content changes.

### A4 or US Letter?

Both, in every template and every format with pages. unipress offers the paper your region uses, the `document.yml` states it (`paper: letter`), and `--paper a4` prints one build on the other. [The quick start](./docs/quick-start.md#a4-or-us-letter) has the rest.

## Starting from scratch

No content yet? Scaffold a starter from a template:

```bash
unipress create my-book --template book --title "My Book" --author "Your Name"
cd my-book && unipress compile .
```

`create` writes a content-only directory — markdown, a `document.yml`, optional `theme.yml` and `assets/`; no `package.json`, no `node_modules`. Pick the template that matches your document (see [Pick a template](#pick-a-template)) — it carries the typography and structure so a book reads like a book and a directory like a directory.

> **Planning to publish?** There's a full author's guide that takes a book from your folder all the way to Amazon and print — [Publishing your book](./docs/publishing/overview.md).

## What it makes

| Format | What it's for |
|---|---|
| **PDF** | The finished, typeset document. Real typography, real pagination, ready to print or share. Built on [Typst](https://typst.app), the modern typesetting system. |
| **EPUB** | The format Kindles and other ebook readers use. |
| **Word (`.docx`)** | When a journal, committee, or collaborator needs a Word file. |
| **Excel (`.xlsx`)** | When the document is structured data — a directory, a dataset, a registry — rather than prose. |
| **Paged.js HTML** | Browser-paginated HTML you can print to PDF or post on the web. |
| **Typst source** | The `.typ` files unipress feeds the compiler. Useful if you want to take the typesetting further yourself, or hand off to a designer. |

Equations work in the standard LaTeX style — `$E = mc^2$` for inline, `$$...$$` for displayed. Tables, lists, footnotes, code blocks, and images all behave the way you'd expect from markdown.

## Publishing your book

Making the files is half the job; getting your book onto Amazon, Apple Books, and print-on-demand is the other half. The **[Publishing your book](./docs/publishing/overview.md)** guide is an end-to-end walkthrough written for authors — the proof → final workflow, covers and images, trim sizes, EPUB validation, print-on-demand, ISBNs, and metadata — with links to every store and service.

## Two ways to use it

**For authors.** unipress is a tool. Pick a template, write markdown, compile. The template knows the conventions for its kind of document — typography, structure, the bits that make a book look like a book and a directory look like a directory. You handle the content; the template handles everything else.

**For developers.** unipress is an engine. A *foundation* you write declares what section types exist (`type: Chapter`, `type: Bibliography`), where their data comes from (markdown content, the records of file-based or API-backed queries, [Loom](https://github.com/uniweb/loom) expressions templating against hierarchical data), and what output formats it can emit (`outputs: { docx, xlsx, pdf, custom-format }`). Authors mix prose with structured records and computed values in the same document; unipress runs your foundation against their content and produces whatever your foundation declares — typeset book, accessible EPUB, regulatory report, structured data feed. The same foundation can also drive a [Uniweb](https://uniweb.io) website, so the work is never single-purpose.

Foundations consume [@uniweb/press](https://github.com/uniweb/press) for the bytes-emitting work. Press is the output layer (Word, Excel, Typst, LaTeX, Paged.js and EPUB); the foundation is your vocabulary.

→ For the deeper pitch — mixed prose-and-data, Loom templating, custom output adapters — see [docs/for-developers.md](./docs/for-developers.md).

## Install

```bash
brew install uniweb/unipress/unipress   # Apple Silicon Macs and x64 Linux. No Node.
npm i -g @uniweb/unipress               # any system, with Node ≥ 22.12
```

Or download a binary from [the releases page](https://github.com/uniweb/unipress/releases), which also has x64 Windows. [The install guide](./docs/install.md) has the details.

## Pick a template

Built-in templates ship with the binary. Run `unipress list-templates` for the picker.

| Template | Foundation | Outputs | Use case |
|---|---|---|---|
| `article` | `@unipress/book` | pdf, typst, pagedjs, epub | Single-column paper (A4 or Letter, no chapters) — the default for a loose folder of markdown |
| `book` | `@unipress/book` | pdf, typst, pagedjs, epub | Trade book, long-form prose with chapters |
| `monograph` | `@unipress/book` | pdf, typst, pagedjs, epub | Scholarly monograph (royal-octavo, classical typography) |
| `report` | `@unipress/book` | pdf, typst, pagedjs, epub | Technical report (trade-7x10, block paragraphs) |
| `thesis` | `@unipress/book` | latex, pdf, typst, pagedjs, epub | Graduate thesis (UofT-shaped LaTeX, biblatex) |
| `data-report` | `@unipress/data` | xlsx, docx | Aggregate metrics across structured records |
| `directory` | `@unipress/data` | xlsx, docx | Flat records listing with a filterable surface |
| `invoice` | `@unipress/business-docs` | docx, pagedjs | An invoice with computed totals |

`article` and `book`/`monograph`/`report` are one foundation, two genres: `article` is single-column and chapter-less (LaTeX's `article`), the others are chaptered with a title page and TOC. Switch by setting `book.kind`.

Per-template guides: [docs/templates/](./docs/templates/).

More templates land as more foundations ship — `cv` and `resume` are on the roadmap for upcoming releases.

## Custom foundations

Any foundation that declares an `outputs: { … }` map on its default export can drive unipress. Point `document.yml`'s `foundation:` at:

- a registry ref: `@<namespace>/<name>@<version>` — fetched from unipress's foundation registry (`https://uniweb.github.io/unipress`, or the base `UNIWEB_REGISTRY_URL` names), cached locally,
- a URL: `https://…/entry.js`,
- a local filesystem path: `./foundation`, `/abs/path`, etc.

The local-path form is the everyday dev loop — point unipress at a foundation directory you're iterating on, no publish step needed:

```bash
unipress compile my-doc --foundation ../my-foundation
```

For the foundation contract — the `outputs:` map, the `getOptions(website, hostHints)` function, what bytes a foundation can emit — see the [foundation authors' guide](https://github.com/uniweb/docs/blob/main/reference/foundation-config.md#document-outputs). A foundation is not an npm package: unipress loads its built `entry.js` by URL — a registry ref is turned into one — or from a local path.

## Reference

- **[CLI reference](./docs/cli.md)** — every command and flag.
- **[Configuration](./docs/configuration.md)** — `document.yml`, several cuts of one manuscript, `unipress.config.js`, what wins over what, the Typst binary.

## Where things stand

unipress is on **1.x**, like every Uniweb package since 1.0.1. The CLI is stable enough to write real documents with — the `book` template, in particular, is well-tested. Future versions may change small things, and a change you may need to act on arrives as a minor version, but `document.yml` files and project folders from today should keep working: scaffolded projects pin a specific foundation version, and a version, once deployed, is never rebuilt. A document from before 1.0 has [a few names to change](./docs/troubleshooting.md#upgrading-a-document-from-04).

**Foundations are fetched on first use.** The bundled templates pin foundations served from `https://uniweb.github.io/unipress/foundations/…`; the first compile downloads and caches the one your `document.yml` names (alongside the Typst binary). To iterate on a foundation locally, pass `--foundation <path>` pointing at a built foundation directory; to point at a different registry, set `UNIWEB_REGISTRY_URL`.

## Documentation

Also at **[unipress.app](https://unipress.app/docs)**.

- **[Quick start](./docs/quick-start.md)**, **[install](./docs/install.md)**, **[CLI](./docs/cli.md)** and **[configuration](./docs/configuration.md)**.
- **[Publishing your book](./docs/publishing/overview.md)** — the end-to-end guide for authors: the proof → final workflow, covers and images, trim sizes, EPUB, print-on-demand, ISBNs, and metadata.
- **Template guides** — conventions and settings per document kind: [article](./docs/templates/article.md), [book](./docs/templates/book.md), [monograph](./docs/templates/monograph.md), [report](./docs/templates/report.md), [thesis](./docs/templates/thesis.md), [data-report](./docs/templates/data-report.md), [directory](./docs/templates/directory.md).
- **[Troubleshooting](./docs/troubleshooting.md)** — common errors and fixes; every named error class maps to a cause and a concrete next step.
- **[For developers](./docs/for-developers.md)** — building a foundation: section types, data sources, and custom output formats.

## See also

- [@uniweb/press](https://github.com/uniweb/press) — the output layer foundations consume to produce Word/Excel/Typst/EPUB. Foundation authors interact with it directly.
- [@uniweb/build](https://github.com/uniweb/build) — the framework's content-collection pipeline. unipress consumes the sharp-free `/content` entry.
- [Uniweb](https://uniweb.io) — the larger framework. Foundations originate here; unipress brings them to the command line.

## License

Apache-2.0 — see [LICENSE](./LICENSE).
