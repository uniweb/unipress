# Changelog

## Unreleased

First working release, published as `@uniweb/unipress` after the
unscoped `unipress` name was abandoned (npm Levenshtein-policy
conflict with `unirest`). The CLI binary is still `unipress`; only the
package specifier is scoped. All functionality below is in the working
tree and exercised end-to-end against `@proximify/press-book` +
framework-book (198-page PDF via Typst 0.14.2).

### Added

- `unipress compile <dir>` — compile a content directory into a
  document. Calls `foundation.compileDocument(website, { format,
  foundation, ...hostHints })` and sinks the resulting Blob.
- Format support: whatever the foundation declares in its `outputs:`
  map. Today that's PDF / Typst source zip / Paged.js HTML / EPUB via
  `@proximify/press-book`; other formats land when their foundations do.
- Typst binary manager: pinned to `0.14.2`, SHA-256-verified, cached
  under `$UNIPRESS_CACHE_DIR` or the platform default (XDG /
  `~/Library/Caches/unipress` / `~/.cache/unipress`). Override with
  `--typst-binary <path>`.
- `unipress.config.js` + `--config <path>`. Precedence: CLI > config >
  `document.yml` > defaults. Fields: `format`, `foundation`, `out`,
  `typst.binary`, `typst.version`. Relative paths resolve against the
  config file's directory.
- `unipress inspect <dir>` — JSON dump of the resolved Website graph,
  with filtering knobs (`--full`, `--summary`, `--page <route>`,
  `--depth <n>`, `--foundation <ref>`, `--no-orchestrate`).
- Foundation resolver: npm package name (walks `node_modules/`, picks
  `exports['./dist']`) or local path. URL-based resolution is planned.
- Named error catalog (`ContentDirectoryError`, `DocumentYmlError`,
  `ConfigValidationError`, `FoundationResolutionError`, `CompileError`,
  `OutputWriteError`, `TypstBinaryError`, plus three reserved for
  later milestones). `UnipressError.format()` produces structured
  multi-line output. Top-level handler splits exit codes: `1` for
  user-addressable errors, `2` for internal bugs.
- `--verbose` flag — step-by-step progress to stderr + stack traces on
  errors.
- `--keep-temp` flag — preserves the typst temp directory on compile
  failure so the generated source bundle can be inspected.

### Framework-side changes that shipped alongside

- [`@uniweb/press`] `compileDocument(websiteOrTree, options)` — the
  high-level compile entry point. Tree mode passes through to
  `compileSubtree`; website mode reads `foundation.outputs[format]`,
  assembles adapter options, gathers blocks, dispatches.
- [`@uniweb/build`] Host-shareable re-export extended — the generated
  entry now re-exports both `compileSubtree` and `compileDocument`
  when the foundation depends on `@uniweb/press`.
- [docs] New "Document Outputs" section in `foundation-config.md`
  covering the `outputs: { <format>: { getOptions, via?, extension? } }`
  contract.

## 0.0.1

- Name-reservation release. CLI prints help and version; no commands
  are implemented yet.
