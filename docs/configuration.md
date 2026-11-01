# Configuration

## `document.yml`

The content-directory-level config. Fields unipress reads:

| Field | Purpose |
|---|---|
| `name` | Document name (used as a title fallback). |
| `foundation` | Registry ref (`@ns/name@ver`), URL, or local path to the foundation. |
| `format` | Default output format. Overridable by CLI `--format` or `unipress.config.js`. |
| `paper` | The paper it prints on: `a4` or `letter`, for every format with pages. Overridable by CLI `--paper` or `unipress.config.js`. A `book.trim` beside it wins: a 6×9 book stays 6×9. |
| `content:` | Reading order — page names, which have no number (`00-intro.md` is `intro`). `pages:` is accepted as an alias. An entry that matches no page is named when you compile. |
| `paths:` | Content-directory overrides. `paths: { pages: . }` reads markdown loose at the project root instead of a `content/` subfolder. |
| `queries:` | The queries a document's sections fetch by name (`query: bibliography`); a query's records live under `records/<name>/`. |
| `book:`, `report:`, `thesis:` … | Foundation-specific config blocks. The foundation's `getOptions` reads these. |

`site.yml` is also accepted as a fallback for compatibility with existing Uniweb site directories.

### Several cuts of one manuscript

Keep more than one top-level config beside your content and pick one per build with
`--variant`. The same chapters can ship as an A4 article and a trade book:

```text
my-book/
  document.yml         # A4 article (the default: unipress compile .)
  document-book.yml    # trade 6×9 with covers
  assets/front.png
  01-intro.md  02-…

unipress compile .                          # → article (document.yml)
unipress compile . --variant document-book  # → book (document-book.yml)
```

`--variant <name>` reads `<name>.yml` from the content directory — the name is used as
given (no prefixing) with `.yml` assumed when omitted. Config-declared assets —
`book.covers.front`, banners, logos — are resolved from the config the build reads, so
**covers must live in the config unipress reads** (the `--variant` file or the default
`document.yml`), not in a `unipress.config.js` `--config` override, whose asset paths
aren't scanned.

## `unipress.config.js`

Optional ESM file for things awkward in YAML — imports, computed values, format-specific overrides. Auto-discovered at `<dir>/unipress.config.js` or explicit via `--config <path>`.

```js
import { defineUnipressConfig } from '@uniweb/unipress'

export default defineUnipressConfig({
  out: './dist/my-book.pdf',           // overrides --out default
  format: 'pdf',                        // overrides document.yml format
  paper: 'letter',                      // overrides document.yml paper and book.trim

  typst: {
    version: '0.14.2',                  // override the pinned Typst version
    binary: '/usr/local/bin/typst',     // skip the managed download
  },
})
```

Plain `export default { … }` works equally well; `defineUnipressConfig` is an identity wrapper for editor autocomplete.

Relative paths in the config (`out`, `foundation`, `typst.binary`) resolve against the **config file's directory** — matching Vite / Astro convention.

## Precedence chain

```
CLI flags > unipress.config.js > document.yml > defaults
```

Applied per-field.

## Typst binary

`--format pdf` requires a Typst binary. unipress pins `0.14.2` and manages the download:

- **Cache location:** `$UNIPRESS_CACHE_DIR` > `$XDG_CACHE_HOME/unipress` > `~/Library/Caches/unipress` (macOS) > `~/.cache/unipress` (fallback). Binary path: `<cache>/typst/<version>/typst`.
- **Override:** pass `--typst-binary <path>` or set `typst.binary` in `unipress.config.js`.
- **Checksum verified:** each download is SHA-256-checked against the digest pinned in `src/typst/versions.js`.
