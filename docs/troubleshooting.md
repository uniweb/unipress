# Troubleshooting

`unipress` surfaces actionable failures at install and compile time — each names a class and a cause. This file pairs each with what it usually means and how to fix it.

Every `unipress` *compile* error exits with code `1` (user-addressable). Unknown errors exit with code `2` — those are internal bugs; re-run with `--verbose` and open an issue.

---

## Homebrew: `Error: Refusing to load formula ... from untrusted tap uniweb/unipress`

Recent Homebrew (6.x) won't load a formula from a third-party tap until you've trusted it once. This blocks both the first `brew install uniweb/unipress/unipress` and later `brew upgrade unipress`.

Trust the tap once, then re-run the command:

```bash
brew trust uniweb/unipress
brew upgrade unipress          # or: brew install uniweb/unipress/unipress
```

This is a Homebrew policy for third-party taps, not specific to unipress. The npm install (`npm i -g @uniweb/unipress`) and the prebuilt binaries on the [releases page](https://github.com/uniweb/unipress/releases) are unaffected.

## `ContentDirectoryError: content directory does not exist: <path>`

The positional argument to `unipress compile` is wrong. Check your `cd` and the spelling. Paths are relative to the current working directory.

## `DocumentYmlError: no document.yml (or site.yml) found in <path>`

unipress expects a top-level config file inside the content directory.

If the folder already holds markdown, you don't have to write one by hand —
`compile` offers to generate it. Running interactively, it prompts:

```
$ unipress compile .
No document.yml here. Generate one (A4 article, pdf) from the 12 markdown files at the project root and compile? (Y/n)
Document title › My Document
created /path/to/document.yml
```

By default this produces a clean single-column **article** (A4, no chapters).
Pass `--yes` to skip the prompt (handy in scripts or non-interactive shells):

```bash
unipress compile . --yes                     # generate + compile → A4 article PDF
unipress compile . --yes --foundation @uniweb/data@0.1.0 --format docx
```

The generated `document.yml` pins a foundation, sets the format, lists the
sections in reading order, and — when the markdown sits loose at the project
root rather than under `content/` — points the content directory at the root
with `paths: { pages: . }`. It's an ordinary config file; edit it freely.

To write one by hand instead:

```yaml
foundation: "@uniweb/book@0.4.2"
format: pdf
paths:
  pages: .          # only needed when sections live at the root (no content/ folder)
book:
  kind: article     # single-column paper; omit for a chaptered book
  trim: a4          # or: letter
content: [introduction, main]
```

`site.yml` is accepted as a fallback if you're dogfooding an existing Uniweb site.

## `DocumentYmlError: <config> has no pages — nothing to compile`

A config file exists, but the collector found no chapters. The usual cause is
markdown living somewhere the document profile didn't scan — loose at the
project root while the profile looks under `content/`. The error names the fix;
for root-level files, add `paths: { pages: . }` to your `document.yml`.

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

Set `foundation:` in `document.yml`, or pass `--foundation <ref>`. Four ref forms accepted:

```yaml
# Registry ref (recommended) — resolved against UNIWEB_REGISTRY_URL
# or the production default at site-router.uniweb-edge.workers.dev.
foundation: "@uniweb/book@0.1.0"

# Or a full URL.
foundation: "https://example.com/foundations/my-foundation/entry.js"

# Or a local filesystem path (relative to document.yml).
foundation: "./path/to/foundation"

# Or, inside a pnpm workspace, a bare package name (resolves through node_modules).
foundation: "@uniweb/book"
```

## `FoundationResolutionError: cannot find foundation package '<name>' from <dir>`

The package isn't installed anywhere `Node` can see from the content directory. Either:

- Install it into `node_modules/` locally: `pnpm add <name>` in the content directory (if the content dir is part of a workspace), or
- Pass a local path: `--foundation ../path/to/built-foundation`.

Inside a pnpm workspace, foundations linked via `pnpm-workspace.yaml` globs resolve automatically.

## `FoundationResolutionError: expected built foundation at <path>/dist/entry.js`

The foundation package isn't built. From the workspace root:

```bash
pnpm --filter <foundation-name> build
```

unipress consumes the built artifact (`dist/entry.js`), not the source.

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
- **Missing package** — if the config `import { defineUnipressConfig } from '@uniweb/unipress'` and `@uniweb/unipress` isn't installed in that project, the import fails. Either `pnpm add -D @uniweb/unipress` in the content directory, or drop the import and use a plain `export default { … }`.

## `ConfigValidationError: config file <path> must default-export an object`

The config file's default export is a string, number, array, or something else. It must be an object:

```js
export default { format: 'pdf' }
```

## Cover image (or other config asset) doesn't appear in the output

Not an error — a silent drop. The book compiles, but the front/back cover (or a
banner/logo declared in config) is missing from the PDF/EPUB.

Config-declared asset paths — `book.covers.front`, `book.covers.back`, and the like —
are resolved from the top-level config unipress **reads for content collection**: the
default `document.yml`, or the file you pass to `--document`. They are *not* scanned from
a `unipress.config.js` supplied via `--config` (that file layers build settings — `out`,
`format`, `typst` — over the compile, after content is collected).

So if your covers live in `document-book.yml`, build it with `--document document-book.yml`
— not `--config document-book.yml`. Confirm with `--verbose`: the `Found N asset references`
line should count your covers (e.g. 2 more than the body images), and the source-bundle
`blob:` size should grow by roughly the covers' byte size. Also confirm the files exist at
the declared path relative to the content directory (e.g. `assets/front.png`).

## Internal error (exit code 2)

Something unexpected threw — typically a library error or a code path unipress didn't wrap. Re-run with `--verbose` for a stack trace, then open an issue with the trace and a description of the content directory + foundation you're compiling.

```bash
unipress compile <dir> --verbose
```
