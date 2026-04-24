# Troubleshooting

When `unipress compile` fails, the error message names a class and a cause. This file pairs each with what it usually means and how to fix it.

Every `unipress` error exits with code `1` (user-addressable). Unknown errors exit with code `2` — those are internal bugs; re-run with `--verbose` and open an issue.

---

## `ContentDirectoryError: content directory does not exist: <path>`

The positional argument to `unipress compile` is wrong. Check your `cd` and the spelling. Paths are relative to the current working directory.

## `DocumentYmlError: no document.yml (or site.yml) found in <path>`

unipress expects a top-level config file inside the content directory. Create `document.yml` at the root:

```yaml
foundation: "@proximify/press-book"
format: pdf
pages: [preface, chapter-1, chapter-2]
```

`site.yml` is accepted as a fallback if you're dogfooding an existing Uniweb site.

## `DocumentYmlError: malformed YAML in document.yml at <file>:<line>:<col>`

Fix the YAML. Common causes: unquoted strings containing `:`, unclosed brackets, inconsistent indentation, tabs mixed with spaces.

> **Note**: `@uniweb/build`'s content collector currently catches YAML errors internally, logs `[content-collector] YAML parse error: ...` as a warning, and proceeds with an empty config. You'll typically see a downstream error like "no format specified" or "no foundation specified" — the YAML warning in the log is the real cause. Fix the YAML first, then re-run.

## `DocumentYmlError: no format specified — pass --format <fmt> or set format: in document.yml`

No format is declared in the CLI, `unipress.config.js`, or `document.yml`. Pick one:

```bash
unipress compile ./my-book --format pdf
```

Or add it to `document.yml`:

```yaml
format: pdf
```

The error also lists `unipress.config.js` as an option when a config file is loaded.

## `FoundationResolutionError: no foundation specified`

Set `foundation:` in `document.yml`, or pass `--foundation <ref>`:

```yaml
foundation: "@proximify/press-book"   # package name
# or
foundation: ./path/to/foundation       # local path (relative to document.yml)
```

URL-based foundations (Uniweb registry) are planned for a later milestone.

## `FoundationResolutionError: cannot find foundation package '<name>' from <dir>`

The package isn't installed anywhere `Node` can see from the content directory. Either:

- Install it into `node_modules/` locally: `pnpm add <name>` in the content directory (if the content dir is part of a workspace), or
- Pass a local path: `--foundation ../path/to/built-foundation`.

Inside a pnpm workspace, foundations linked via `pnpm-workspace.yaml` globs resolve automatically.

## `FoundationResolutionError: expected built foundation at <path>/dist/foundation.js`

The foundation package isn't built. From the workspace root:

```bash
pnpm --filter <foundation-name> build
```

unipress consumes the built artifact (`dist/foundation.js`), not the source.

## `CompileError: foundation does not expose compileDocument`

The foundation doesn't depend on `@uniweb/press`, or was built with an older `@uniweb/build` that predates the `compileDocument` re-export.

Fix: add `"@uniweb/press": "workspace:*"` (or the appropriate version) to the foundation's `dependencies`, rebuild with a current `@uniweb/build` (57498ef or later), and re-install.

## `CompileError: foundation does not declare 'outputs.<format>'`

The foundation doesn't support the format you asked for. The error lists the declared formats:

```
error: foundation does not declare 'outputs.docx' — cannot compile.
    available formats: typst, pdf, pagedjs, epub
```

Pick one of the listed formats, or pick a different foundation.

## `CompileError: foundation declares no outputs`

The foundation is web-only — it has no `outputs:` map and can't be compiled as a document. Check the foundation's README to confirm it supports document output. Foundations that only drive websites can't be used with unipress.

## `TypstBinaryError: sha256 mismatch for typst <version>`

The downloaded Typst archive doesn't match the pinned digest. Either the download was corrupted mid-transfer, or the pinned digest in `src/typst/versions.js` is stale.

Quick retry: delete the cache directory (`$UNIPRESS_CACHE_DIR/typst/<version>`) and re-run. If the mismatch persists, the pin is out of date — file an issue, or override with `--typst-binary <path>` pointing at a locally-installed Typst.

## `TypstBinaryError: typst exited with code 1`

Typst rejected the foundation-generated source bundle. The error includes Typst's own stderr and a hint:

```
hint: pass --keep-temp to inspect the source bundle
```

With `--keep-temp`, the temp directory survives on failure. The path appears in the error:

```
typst exited with code 1 (temp dir kept at /var/folders/.../unipress-typst-XXXXXX)
```

Inspect `main.typ`, `template.typ`, `meta.typ`, `content.typ` in that directory. The root cause is usually:

- **The foundation's `outputs[format].getOptions` produced a partial `meta` object** missing a field the foundation's template expects. Check the foundation's `compile-options.js` against its `template.typ`.
- **An image asset the bundle references is missing.** Foundation-side: verify `gatherCovers` (or equivalent) found the image at the URL it computed.
- **A Typst syntax issue in the foundation's preamble or template.** Check against the installed Typst version (`typst --version`).

## `OutputWriteError: failed to write output to <path>`

The `--out` path can't be written. Most common causes: parent directory doesn't exist and unipress couldn't create it (permission denied), or the file exists and is locked by another process.

unipress creates missing parent directories automatically (like `mkdir -p`). If creation fails, check permissions on the destination.

## `ConfigValidationError: failed to load config file <path>`

`unipress.config.js` threw during import. Common causes:

- **Syntax error** — Node prints `Unexpected end of input` or similar as the cause.
- **Missing package** — if the config `import { defineUnipressConfig } from 'unipress'` and `unipress` isn't installed in that project, the import fails. Drop the `defineUnipressConfig` import and use a plain `export default { … }` until unipress is a first-class dependency of the project.

## `ConfigValidationError: config file <path> must default-export an object`

The config file's default export is a string, number, array, or something else. It must be an object:

```js
export default { format: 'pdf' }
```

## Internal error (exit code 2)

Something unexpected threw — typically a library error or a code path unipress didn't wrap. Re-run with `--verbose` for a stack trace, then open an issue with the trace and a description of the content directory + foundation you're compiling.

```bash
unipress compile <dir> --verbose
```
