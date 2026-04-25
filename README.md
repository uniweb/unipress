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

```bash
npm i -g @uniweb/unipress
```

The package is scoped, but the executable is unscoped: after install, invoke as `unipress`.

## Quick-start

### 1. Pick a template

Run `unipress list-templates` to see what's available. Five built-in templates ship with the binary:

| Template      | Foundation        | Outputs                          | Use case                                              |
|---------------|-------------------|----------------------------------|-------------------------------------------------------|
| `book`        | `@uniweb/book`    | pdf, typst, pagedjs, epub        | Trade book, long-form prose                           |
| `monograph`   | `@uniweb/book`    | pdf, typst, pagedjs, epub        | Scholarly monograph (royal-octavo, classical type)    |
| `report`      | `@uniweb/book`    | pdf, typst, pagedjs, epub        | Technical report (trade-7x10, block paragraphs)       |
| `data-report` | `@uniweb/data`    | xlsx, docx                       | Aggregate metrics across structured records          |
| `directory`   | `@uniweb/data`    | xlsx, docx                       | Flat records listing with filterable surface          |

Per-template guides: [`docs/templates/`](./docs/templates/).

### 2. Scaffold

```bash
unipress create my-book --template book --title "My Book" --author "Jane Doe"
cd my-book
```

The result is a content-only directory — no `package.json`, no `node_modules`. The scaffolded `document.yml` pins the foundation to a specific version (e.g., `@uniweb/book@0.1.0`); on first compile, unipress fetches the foundation from the registry and caches it.

### 3. Compile

```bash
unipress compile . --format pdf --out my-book.pdf
```

unipress reads the foundation's declared `outputs.pdf` spec, assembles adapter options (meta, preamble, template, cover assets — the foundation decides what), walks the content through the foundation's section types, and hands off to the Typst binary for the final PDF.

First PDF run downloads Typst 0.14.2 to `~/Library/Caches/unipress/typst/0.14.2/` (or the XDG cache dir on Linux). Subsequent runs reuse the cached binary.

### Custom foundations

Any Uniweb foundation that declares an `outputs: { … }` map on its default export can drive unipress. Point `document.yml`'s `foundation:` at:

- a registry ref (`@<namespace>/<name>@<version>`) — fetched from `UNIWEB_REGISTRY_URL` or the production default,
- a full `https://…` URL,
- a local filesystem path to a built foundation directory.

See `docs/templates/book.md` and `docs/templates/data-report.md` for the field surfaces of the bundled foundations, or [foundation authors' guide](https://github.com/uniweb/docs/blob/main/reference/foundation-config.md) for building your own.

## CLI reference

```text
unipress compile <dir> [options]
  --format <fmt>      Output format (pdf | typst | docx | xlsx | pagedjs | epub).
                      Overrides the format: field in document.yml.
  --foundation <ref>  Override document.yml's foundation. Accepts:
                        - registry ref:  @<namespace>/<name>@<version>
                        - URL:           https://…/foundation.js
                        - path:          ./foundation, /abs/path, …
  --out <path>        Output file (default: ./<dir-basename>.<ext>).
  --config <path>     Explicit config file (default: <dir>/unipress.config.js).
  --typst-binary <p>  Path to a typst binary (skips the managed download).
  --keep-temp         On typst-compile failure, keep the temp dir for inspection.
  --verbose           Per-step progress to stderr + stack traces on errors.

unipress create <dir> [options]
  --template <id>     Template to scaffold (interactive picker if omitted).
                      Run `unipress list-templates` to see available ids.
  --title <str>       Document title (prompts if omitted).
  --author <str>      Document author (prompts if omitted).
  --force             Overwrite non-empty <dir>.
  --yes               Skip prompts (requires --template).

unipress list-templates
  List the templates available, one per line, with description, outputs,
  the foundation each pins, and the source URL where the foundation lives.

unipress inspect <dir> [options]
  Dump the parsed content as JSON (debugging aid).
  --full              Include web-only fields (assets, icons, etc.).
  --summary           Replace pages[] with route strings only.
  --page <route>      Keep only the page matching <route>.
  --depth <n>         Truncate nested values beyond depth n.
  --foundation <ref>  Override document.yml's foundation.
  --no-orchestrate    Skip running the foundation; show only the parsed content.

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
| `foundation` | Registry ref (`@ns/name@ver`), URL, or local path to the foundation's built `foundation.js`. |
| `format` | Default output format. Overridable by CLI `--format` or `unipress.config.js`. |
| `pages:` | Reading order (same semantics as `site.yml`). |
| `book:`, `report:`, `collections:` … | Foundation-specific config blocks. Read by the foundation's `outputs[format].getOptions`. |

### `unipress.config.js`

Optional ESM file for overrides awkward in YAML (imports, computed values, format-specific options). Auto-discovered at `<dir>/unipress.config.js` or explicit via `--config <path>`.

```js
import { defineUnipressConfig } from '@uniweb/unipress'

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
