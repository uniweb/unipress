# unipress

Compile a directory of markdown and YAML into a document — PDF, Typst source bundle, EPUB, HTML for Paged.js, DOCX, XLSX — using a [Uniweb](https://uniweb.io) foundation for composition and presentation.

```bash
unipress compile ./my-book --format pdf --out book.pdf
unipress compile ./my-book --format typst --out book.zip
unipress compile ./my-book --format epub --out book.epub
```

One content directory. One CLI. Any format the foundation declares.

## What is it?

A **unipress project** is a content directory — markdown pages, a `document.yml` config, a `theme.yml`, optional `collections/` and `assets/`. No `package.json`, no bundler, no build workflow. Authors ship content; unipress turns it into a single file.

The directory references a Uniweb **foundation** — a component system that decides what section types exist, how data flows, and how the document is laid out. The same foundation can drive both a website (with `uniweb`) and a downloadable document (with `unipress`).

## Install

> **Note**: the npm name `unipress` is currently in dispute (Levenshtein-policy conflict with `unirest`). Until the dispute resolves, install from source:
>
> ```bash
> git clone https://github.com/uniweb/unipress.git
> cd unipress && pnpm install
> # invoke as: node path/to/unipress/src/cli.js
> # or pnpm link it globally during development.
> ```

When the name clears, `npm i -g unipress` will install the CLI globally.

## Quick-start

### 1. Pick a foundation

Any Uniweb foundation that declares **document outputs** (an `outputs: { … }` map in its default export) can be compiled by unipress. [`@proximify/press-book`](https://github.com/Proximify/press-book) is the reference example — books that compile to PDF via Typst, plus EPUB, Paged.js HTML, and a Typst source-bundle zip.

### 2. Create a content directory

Minimum viable shape (mirrors a Uniweb site — `document.yml` is the top-level config; `site.yml` is accepted as a fallback):

```
my-book/
├── document.yml
├── theme.yml                   # optional
├── pages/
│   ├── preface.md
│   ├── chapter-1.md
│   └── chapter-2.md
├── collections/                # optional, for data-driven sections
└── assets/                     # optional, images referenced from markdown
```

```yaml
# document.yml
name: "My Book"
foundation: "@proximify/press-book"  # package name; URL form planned for M9-URL
format: pdf                          # default format (overridable via --format)

book:                                 # foundation-specific fields
  title: "My Book"
  subtitle: "A Short Title"
  author: "Jane Doe"

pages:                                # reading order
  - preface
  - chapter-1
  - chapter-2
```

### 3. Compile

```bash
unipress compile ./my-book
```

unipress reads the foundation's declared `outputs.pdf` spec, assembles adapter options (meta, preamble, template, cover assets — the foundation decides what), walks the content through the foundation's section types, and hands off to the Typst binary for the final PDF.

First run downloads Typst 0.14.2 to `~/Library/Caches/unipress/typst/0.14.2/` (or the XDG cache dir on Linux). Subsequent runs reuse the cached binary.

## CLI reference

```text
unipress compile <dir> [options]
  --format <fmt>      Output format (pdf | typst | docx | xlsx | pagedjs | epub).
                      Overrides the format: field in document.yml.
  --foundation <ref>  Package name or local path (overrides document.yml).
  --out <path>        Output file (default: ./<dir-basename>.<ext>).
  --config <path>     Explicit config file (default: <dir>/unipress.config.js).
  --typst-binary <p>  Path to a typst binary (skips the managed download).
  --keep-temp         On typst-compile failure, keep the temp dir for inspection.
  --verbose           Per-step progress to stderr + stack traces on errors.

unipress inspect <dir> [options]
  Dump the resolved Website graph as JSON (debugging aid).
  --full              Include web-only fields (assets, icons, etc.).
  --summary           Replace pages[] with route strings only.
  --page <route>      Keep only the page matching <route>.
  --depth <n>         Truncate nested values beyond depth n.
  --foundation <ref>  Override document.yml's foundation.
  --no-orchestrate    Skip foundation import + initPrerender.

unipress --help
unipress --version
```

Exit codes:
- `0` — success.
- `1` — user-addressable error (bad args, missing file, misconfigured foundation).
- `2` — internal error (re-run with `--verbose` for a stack trace).

## Configuration

### `document.yml`

The content-directory-level config, with the same shape as Uniweb's `site.yml`. unipress adds a few fields:

| Field | Purpose |
|---|---|
| `name` | Document name (used as a title fallback). |
| `foundation` | Package name or local path to the foundation's built `foundation.js`. |
| `format` | Default output format. Overridable by CLI `--format` or `unipress.config.js`. |
| `pages:` | Reading order (same semantics as `site.yml`). |
| `book:`, `cv:`, `report:` … | Foundation-specific config blocks. Read by the foundation's `outputs[format].getOptions`. |

### `unipress.config.js`

Optional ESM file for overrides awkward in YAML (imports, computed values, format-specific options). Auto-discovered at `<dir>/unipress.config.js` or explicit via `--config <path>`.

```js
import { defineUnipressConfig } from 'unipress'

export default defineUnipressConfig({
  out: './dist/my-book.pdf',            // overrides --out default
  format: 'pdf',                         // overrides document.yml format

  typst: {
    version: '0.14.2',                   // override the pinned Typst version
    binary: '/usr/local/bin/typst',      // skip the managed download
  },
})
```

Plain `export default { … }` works equally well; `defineUnipressConfig` is an identity wrapper for editor autocomplete.

Relative paths in the config (`out`, `foundation`, `typst.binary`) resolve against the **config file's directory** — matching Vite / Astro convention.

### Precedence chain

```
CLI flags > unipress.config.js > document.yml > defaults
```

Applied per-field: `--format` wins over `config.format` wins over `document.yml`'s `format:` wins over "no format → error."

## What foundations need to support unipress

For a foundation to be compilable by unipress (or by any headless host), it must:

1. **Depend on `@uniweb/press`.** The foundation's build re-exports `compileDocument` and `compileSubtree` so unipress can reach the foundation's bundled Press.
2. **Declare `outputs:` on its default export.** Each entry tells Press which adapter to use (`via:` redirect), which file extension to default to, and how to assemble format-specific adapter options (`getOptions(website, hostHints)`).

```js
// foundation/src/foundation.js
import { buildTypstOptions } from './compile-options.js'

export default {
  outputs: {
    typst: { extension: 'zip', getOptions: buildTypstOptions },
    pdf:   { extension: 'pdf', via: 'typst', getOptions: buildTypstOptions },
  },
}
```

Full contract: [Document Outputs in the Uniweb framework docs](https://github.com/uniweb/docs/blob/main/reference/foundation-config.md#document-outputs).

## Typst binary

`--format pdf` requires a Typst binary. unipress pins `0.14.2` and manages the download:

- **Cache location**: `$UNIPRESS_CACHE_DIR` > `$XDG_CACHE_HOME/unipress` > `~/Library/Caches/unipress` (macOS) > `~/.cache/unipress` (fallback). Binary path: `<cache>/typst/<version>/typst`.
- **Override**: pass `--typst-binary <path>` or set `typst.binary` in `unipress.config.js`.
- **Checksum verified**: each download is SHA-256-checked against the digest pinned in `src/typst/versions.js` (sourced from GitHub's release-assets API).

## Troubleshooting

See [`docs/troubleshooting.md`](./docs/troubleshooting.md) for common errors and fixes.

## License

Apache-2.0 © Proximify
