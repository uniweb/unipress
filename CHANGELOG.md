# Changelog

## Unreleased

### Changed

- **Release binaries are now signed.** macOS binaries are signed with
  Apple Developer ID Application + Apple-notarized; Windows binaries
  are signed via Azure Trusted Signing. macOS users no longer see a
  Gatekeeper warning on first run. The 0.2.3 release assets were
  re-signed in place — re-download from the release page if you
  grabbed an unsigned copy before this change landed.

### Removed

- `.github/workflows/release.yml`. Binaries are no longer built in
  this public repo — they're built and signed in a private Proximify
  pipeline. Pushing a `unipress@<version>` tag no longer triggers a
  binary build; the maintainer dispatches the signed pipeline manually
  after each tag, and the resulting binaries are uploaded to the same
  GitHub Release on this repo. Source code, docs, npm publishing, and
  the foundation-deploy workflow are unchanged.

## 0.2.3

The first complete-out-of-the-box release. `npm i -g @uniweb/unipress`
+ `unipress create my-book --template book` + `unipress compile my-book`
produces a real PDF on the first try, no setup, no auth, no local
servers, no `--foundation` overrides.

### Added

- **GitHub Pages distribution for bundled foundations.**
  `https://uniweb.github.io/unipress/foundations/<name>/<version>/foundation.js`
  serves every published foundation. A new workflow
  (`.github/workflows/deploy-foundations.yml`) builds each
  `foundations/<name>/` on every push to main and accumulates versions
  on the `gh-pages` branch — older versions stay reachable indefinitely.
  No registry namespace claim, no Cloudflare worker, no platform
  authorization needed for the open-source foundations.
- **`scripts/ci-flip-workspace-deps.js`** — pre-install rewrite that
  translates `workspace:*` deps to npm version ranges in CI. Both
  workflows (foundation deploy, binary release) call it as the first
  step. Closes the standalone-install gap that the workspace:*
  resolution introduced.
- **`prepublishOnly` regenerates `templates-data.js`.** `pnpm publish`
  now refreshes the bundled template data from `documents/<name>/`
  before packing, so a stale generated file can't ship even if a
  developer forgot to regenerate before commit.

### Fixed

- **EPUB cover image no longer skipped.** The foundation's
  `buildEpubOptions` was using a `fetch`-based URL resolver that
  silently 404'd in unipress's Node compile context. Replaced with
  the same `loadAsset` abstraction the typst path uses. Cover image
  now embeds at `OEBPS/images/<hash>.jpg` alongside a synthesized
  `cover.xhtml` page.
- **DOCX inline-image path threaded through `loadAsset`.**
  `framework/press`'s docx adapter walker now plumbs the host-supplied
  byte loader from `buildDocument` → `convertChildren` →
  `irToImageParagraph` → `fetchImageData` → `fetchAsset`. Future
  docx-emitting templates with inline images compile cleanly in
  unipress.
- **Cover round-trip in scaffolded projects** — front + back JPGs
  ship via the binary-asset support added to the template generator.
  EPUB readers + most PDF viewers now show the book's thumbnail
  without the user adding any artwork.

### Changed

- Catalog URLs in `src/foundations-data.js` flipped from local-registry
  (`http://localhost:4001/...`) to GH Pages
  (`https://uniweb.github.io/unipress/foundations/...`). The 0.2.0
  caveat in the changelog is resolved.
- `foundation-loader.js`'s `DEFAULT_REGISTRY_BASE` flipped to
  `https://uniweb.github.io/unipress`. `UNIWEB_REGISTRY_URL` env var
  remains the override for local dev / private alternatives.
- `@uniweb/*` deps in `package.json` are `workspace:*` again (dev
  resolves local siblings); `pnpm publish` translates them to real
  version specs in the published tarball.

### Notes

- Binary downloads (darwin-arm64, linux-x64, windows-x64) ship via
  the existing `unipress@<version>` tag-driven release workflow. The
  npm path is now equivalent for users with Node 20+.
- See `RELEASING.md` for the framework-publish + workspace:* flip-back
  dance the next maintainer release follows.

## 0.2.0

The credibility-shifting release. Two production-shaped foundations
(`@uniweb/book`, `@uniweb/data`), five templates (`book`, `monograph`,
`report`, `data-report`, `directory`), and a vocabulary cleanup that
separates create-time templates from runtime foundations.

### Added

- **`@uniweb/book`** foundation. Long-form prose with chapters; outputs
  Typst/PDF, Paged.js HTML, EPUB. Default section type `Chapter` plus
  `Cover`, `BackCover`, `BackMatter`, `Contents`. Inlines parameterised
  Typst defaults (trim, typography, structure, localized labels) and a
  CSS Paged Media stylesheet.
- **`@uniweb/data`** foundation. Aggregates structured records and
  emits Excel workbooks + Word reports. Eight section types
  (`Cover`, `Members`, `Publications*` ×4, `Funding`, `Supervisions`)
  with Loom-driven aggregate stats and a queryable filter surface.
- **Five templates** under `documents/`:
  - `book` — trade-6x9 prose (3 chapters).
  - `monograph` — royal-octavo, EB Garamond, `tocDepth: 3`.
  - `report` — trade-7x10, block paragraphs, code-margin relief.
  - `data-report` — migrated from the v0.1 `academic-metrics`
    placeholder; aggregate metrics across sample naturalists.
  - `directory` — flat records listing with filterable surface.
- **Per-template docs** at `docs/templates/<name>.md` covering the
  `document.yml` fields that matter, common customizations, and
  links to the foundation README.
- **Registry-ref resolver** in `foundation-loader.js`. The fifth ref
  form `@<namespace>/<name>@<version>` constructs a URL from
  `UNIWEB_REGISTRY_URL` (or the production default at
  `site-router.uniweb-edge.workers.dev`) and fetches via the existing
  cache. Catalog entries pin registry refs; scaffolded `document.yml`
  files inherit them.

### Changed

- **Vocabulary**: `unipress create` now takes `--template <id>`
  instead of `--foundation <id>`, and `list-foundations` is renamed
  to `list-templates`. Catalog ids are templates — starter content
  pinning a foundation. Runtime concepts keep the foundation name
  (`compile --foundation`, `document.yml`'s `foundation:`).
- **Catalog entry shape**: `{ source: { url } }` →
  `{ foundation: { ref, source: { url } } }`. The new `foundation.ref`
  is the registry ref scaffolded `document.yml` files pin; the
  `foundation.source.url` is the human-readable "where this lives"
  pointer shown in `list-templates` output.
- **Repo layout**: `framework/unipress/` is now a nested pnpm
  workspace. Foundations developed for unipress live under
  `foundations/<name>/`; documents (foundation-dev test harnesses
  AND bundled template starter content) live under `documents/<name>/`.
  The `scripts/generate-templates-data.js` generator reads from
  `documents/` and rewrites path-ref `foundation:` values to registry
  refs at bundle time so the on-disk file stays dev-friendly while
  the bundled file is end-user-friendly.

### Removed

- `--foundation` flag on `create`. Errors with a pointer to
  `--template` (no deprecation alias — pre-1.0).
- `list-foundations` command. Errors with a pointer to `list-templates`.
- `templates/` directory; `package.json`'s `files:` array now ships
  `documents/`.

### Caveat (resolved in a follow-up release)

Catalog entries in 0.2.0 pointed at a local registry
(`http://localhost:4001/...`), so scaffolded documents required the
user to run a registry locally or to pass `--foundation <path>`
explicitly. A subsequent release switches the catalog URLs to GitHub
Pages (`https://uniweb.github.io/unipress/foundations/...`); the
foundations are deployed there by `.github/workflows/deploy-foundations.yml`
on every push to main, and `unipress create + compile` works end-to-end
from a fresh npm install.

## 0.1.0 (unreleased)

First working release, published as `@uniweb/unipress` after the
unscoped `unipress` name was abandoned (npm Levenshtein-policy
conflict with `unirest`). The CLI binary is still `unipress`; only the
package specifier is scoped. All functionality below is in the working
tree and exercised end-to-end against the v0.1 reference foundation
(198-page PDF via Typst 0.14.2).

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

(0.1.0 was never tagged; its content shipped under the 0.0.1 working
tree and was superseded by 0.2.0 directly.)

## 0.0.1

- Name-reservation release. CLI prints help and version; no commands
  are implemented yet.
