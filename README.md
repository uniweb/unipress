# unipress

**Compile a directory of markdown into a document — typeset PDF, EPUB, Word, Excel, Paged.js HTML, Typst source — using a foundation that knows the conventions of the kind of document you're writing.**

```bash
unipress create my-book
unipress compile my-book
```

Two commands. The first scaffolds a starter project; the second produces the file.

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

## Two ways to use it

**For authors.** unipress is a tool. Pick a template, write markdown, compile. The template knows the conventions for its kind of document — typography, structure, the bits that make a book look like a book and a directory look like a directory. You handle the content; the template handles everything else.

**For developers.** unipress is an engine. A *foundation* you write declares what section types exist (`type: Chapter`, `type: Bibliography`), where their data comes from (markdown content, file-based or API-backed collections, [Loom](https://github.com/uniweb/loom) expressions templating against hierarchical data), and what output formats it can emit (`outputs: { docx, xlsx, pdf, custom-format }`). Authors mix prose with structured records and computed values in the same document; unipress runs your foundation against their content and produces whatever your foundation declares — typeset book, accessible EPUB, regulatory report, structured data feed. The same foundation can also drive a [Uniweb](https://uniweb.io) website, so the work is never single-purpose.

Foundations consume [@uniweb/press](https://github.com/uniweb/press) for the bytes-emitting work. Press is the output layer (Word, Excel, Typst today; more formats shipping); the foundation is your vocabulary.

→ For the deeper pitch — mixed prose-and-data, Loom templating, custom output adapters — see [docs/for-developers.md](./docs/for-developers.md).

## Install

**Homebrew (macOS and Linux — recommended).** No Node, no manual download:

```bash
brew install uniweb/unipress/unipress
```

Updates land via `brew upgrade unipress`. The macOS binary is signed with the Proximify Inc. Developer ID and Apple-notarized — no Gatekeeper warnings.

**Manual download (Windows, or any platform without Homebrew).** Grab the asset for your platform from [the releases page](https://github.com/uniweb/unipress/releases), make it executable (Unix), and put it somewhere on your `PATH`. On macOS and Linux, `/usr/local/bin/unipress` is a common location.

**npm.** If you already have Node ≥ 20.19:

```bash
npm i -g @uniweb/unipress
```

## Pick a template

Five built-in templates ship with the binary. Run `unipress list-templates` for the picker.

| Template | Foundation | Outputs | Use case |
|---|---|---|---|
| `book` | `@uniweb/book` | pdf, typst, pagedjs, epub | Trade book, long-form prose |
| `monograph` | `@uniweb/book` | pdf, typst, pagedjs, epub | Scholarly monograph (royal-octavo, classical typography) |
| `report` | `@uniweb/book` | pdf, typst, pagedjs, epub | Technical report (trade-7x10, block paragraphs) |
| `data-report` | `@uniweb/data` | xlsx, docx | Aggregate metrics across structured records |
| `directory` | `@uniweb/data` | xlsx, docx | Flat records listing with a filterable surface |

Per-template guides: [docs/templates/](./docs/templates/).

More templates land as more foundations ship — `cv`, `resume`, `paper`, `thesis` are on the roadmap for upcoming releases.

## Write your first document

```bash
unipress create my-book --template book --title "My Book" --author "Your Name"
cd my-book
```

The result is a content-only directory — markdown pages, a `document.yml`, optional `theme.yml` and `assets/`. **No `package.json`, no `node_modules`.** Edit the markdown — that's your content. Numbered filenames (`01-intro.md`, `02-chapter-one.md`) keep chapter order predictable.

When you're ready to produce the document:

```bash
unipress compile . --format pdf
```

Or any of the formats the foundation declares (`--format epub`, `--format pagedjs`). Write, compile, look at the result, revise, compile again — that's the loop.

The first PDF run downloads Typst 0.14.2 to `~/Library/Caches/unipress/typst/0.14.2/` (or the XDG cache dir on Linux). Subsequent runs reuse the cached binary.

## Custom foundations

Any foundation that declares an `outputs: { … }` map on its default export can drive unipress. Point `document.yml`'s `foundation:` at:

- a registry ref: `@<namespace>/<name>@<version>` — fetched from the Uniweb registry, cached locally,
- a URL: `https://…/foundation.js`,
- a local filesystem path: `./foundation`, `/abs/path`, etc.

The local-path form is the everyday dev loop — point unipress at a foundation directory you're iterating on, no publish step needed:

```bash
unipress compile my-doc --foundation ../my-foundation
```

For the foundation contract — the `outputs:` map, the `getOptions(website, hostHints)` function, what bytes a foundation can emit — see the [foundation authors' guide](https://github.com/uniweb/docs/blob/main/reference/foundation-config.md#document-outputs). Foundations are distributed via the [Uniweb registry](https://uniweb.io), not npm.

---

Below this point is reference material — useful when you want to do something beyond the basics, or when something doesn't behave as expected.

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

Exit codes: `0` success, `1` user-addressable error, `2` internal error (re-run with `--verbose` for a stack trace).

## Configuration

### `document.yml`

The content-directory-level config. Fields unipress reads:

| Field | Purpose |
|---|---|
| `name` | Document name (used as a title fallback). |
| `foundation` | Registry ref (`@ns/name@ver`), URL, or local path to the foundation. |
| `format` | Default output format. Overridable by CLI `--format` or `unipress.config.js`. |
| `pages:` | Reading order (same semantics as a Uniweb site's `site.yml`). |
| `book:`, `report:`, `collections:` … | Foundation-specific config blocks. The foundation's `getOptions` reads these. |

`site.yml` is also accepted as a fallback for compatibility with existing Uniweb site directories.

### `unipress.config.js`

Optional ESM file for things awkward in YAML — imports, computed values, format-specific overrides. Auto-discovered at `<dir>/unipress.config.js` or explicit via `--config <path>`.

```js
import { defineUnipressConfig } from '@uniweb/unipress'

export default defineUnipressConfig({
  out: './dist/my-book.pdf',           // overrides --out default
  format: 'pdf',                        // overrides document.yml format

  typst: {
    version: '0.14.2',                  // override the pinned Typst version
    binary: '/usr/local/bin/typst',     // skip the managed download
  },
})
```

Plain `export default { … }` works equally well; `defineUnipressConfig` is an identity wrapper for editor autocomplete.

Relative paths in the config (`out`, `foundation`, `typst.binary`) resolve against the **config file's directory** — matching Vite / Astro convention.

### Precedence chain

```
CLI flags > unipress.config.js > document.yml > defaults
```

Applied per-field.

## Typst binary

`--format pdf` requires a Typst binary. unipress pins `0.14.2` and manages the download:

- **Cache location:** `$UNIPRESS_CACHE_DIR` > `$XDG_CACHE_HOME/unipress` > `~/Library/Caches/unipress` (macOS) > `~/.cache/unipress` (fallback). Binary path: `<cache>/typst/<version>/typst`.
- **Override:** pass `--typst-binary <path>` or set `typst.binary` in `unipress.config.js`.
- **Checksum verified:** each download is SHA-256-checked against the digest pinned in `src/typst/versions.js`.

## Where things stand

unipress is **pre-1.0**. The CLI is stable enough to write real documents with — the `book` template, in particular, is well-tested. Future versions may change small things, but `document.yml` files and project folders from today should keep working: scaffolded projects pin a specific foundation version, and registry artifacts are immutable.

**Heads-up for v0.2:** the bundled catalog points at a local registry (`http://localhost:4001/...`) until the foundations publish to the production Uniweb registry. To compile against a bundled template today, either pass `--foundation <path>` pointing at a built foundation directory, or run a local foundation registry (publish a built foundation with `uniweb publish --local` and serve `.unicloud/registry/` on port 4001). A follow-up release switches the catalog to production URLs once `@uniweb/book` and `@uniweb/data` ship there.

## Troubleshooting

See [docs/troubleshooting.md](./docs/troubleshooting.md) for common errors and fixes — every named error class maps to a cause and a concrete next step.

## See also

- [@uniweb/press](https://github.com/uniweb/press) — the output layer foundations consume to produce Word/Excel/Typst/EPUB. Foundation authors interact with it directly.
- [@uniweb/build](https://github.com/uniweb/build) — the framework's content-collection pipeline. unipress consumes the sharp-free `/content` entry.
- [Uniweb](https://uniweb.io) — the larger framework. Foundations originate here; unipress brings them to the command line.

## License

Apache-2.0 — see [LICENSE](./LICENSE).
