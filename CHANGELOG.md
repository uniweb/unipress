# Changelog

## After 1.1.23

### Added

- **One line on Windows.** `install.ps1` gets the latest signed binary, checks it, puts it in your own
  folder and adds that to your PATH, with no administrator and no Node. Run it again to update. CI runs
  the exact command on real Windows.

## After 1.1.21

### Added

- **The monograph template ships EB Garamond**, under the SIL Open Font License, in the `fonts/`
  folder it scaffolds. A book told to use it used whatever the machine had: Georgia, or Typst's
  default. So a PDF now finds fonts in a document's own `fonts/` folder first, for any template.

### Fixed

- **`create` printed a next step that failed.** It now prints `unipress compile .`, and the
  smoke test runs what it prints.
- **`--out o.pdf` could write a file that wasn't a PDF**, since a template's default format
  decided. A name that can only be one format now builds that format when nothing names one,
  and is refused when `--format` names another.
- **A cover that isn't there** left a book with no cover and exit 0. It now stops the build, by
  name, as a missing image does, in every format. `/assets/front.jpg` finds the file in the
  document's folder too, as the guide said it would.
- **`inspect` wrote log lines into its JSON**, and every compile printed the build's progress,
  such as default theme colours for a black-and-white PDF. They go to `--verbose` now.
- **A font this machine doesn't have** was silent, so one folder could print differently on
  another machine. A compile now says which.
- **Every document with no cover opened on a blank page**: report, monograph and thesis.
- **The thesis template printed broken output** on the Typst path: math as raw LaTeX, references
  and citations as gaps in the sentence, a second title page ahead of its own, its contents before
  its title page, and an empty list of figures as chapter 1.
- **A heading's anchor dropped accented letters**, so `Été` was `t`, and a heading in a script
  with no a-z had none. It keeps a letter in any language now.
- **`[^b]: Word.` became a link**, and so did a note that was only a URL.
- **A formula wrapped onto a second line** printed as raw LaTeX.
- **Four starters listed their files in `content:` by names that match no page**, so moving an
  entry did nothing. They now list page names, and a compile names any entry that matches nothing.

### Changed

- The reference in the README moved to `docs/`: [quick start](./docs/quick-start.md),
  [install](./docs/install.md), [CLI](./docs/cli.md), [configuration](./docs/configuration.md). The
  publishing guide's opening is now [`docs/publishing/overview.md`](./docs/publishing/overview.md).
  A site can mount the folder as it stands, with titles and an order.
- `monograph` and `thesis` have the guides they lacked or understated.

## 1.x, since the 0.4.29 binary

The first binary and Homebrew release since 0.4.29. If you have that one and can't compile
a new document: it broke on fresh downloads when a foundation it pins was rebuilt against a
newer framework. This release fixes that, and stops it happening again.

### Added

- **A4 or US Letter, everywhere.** `paper: a4` or `paper: letter` in `document.yml`, for every
  template and every format with pages. `--paper` prints one build on the other paper, on
  `compile` and on `create`. When unipress writes a `document.yml`, it asks, offering what your
  system's region uses, and says what it chose when it can't ask. Foundations declare it per
  output (`outputs.<format>.paper`), and `--paper` refuses an output that doesn't say it takes
  one, rather than make a file at the wrong size.
- **Footnotes** in the book foundation: `[^id]` and `[^id]: the note`.
- **A title in frontmatter**, for a file that opens with no heading.
- **`scripts/smoke.js`**: every template, every format, each paper, the result opened and read.

### Fixed

- **PDF never worked on Linux.** Every PDF compile stopped with a `tar` error, in the npm package
  and the binary alike: unipress unpacked its Typst sources with the system's `tar`, and GNU tar
  reads no zip. It now unpacks them itself. CI makes a PDF on Linux, and so does the release
  pipeline before uploading.
- **A compiled binary could not start**, on any command, since 2026-09-28. CI now compiles one and
  runs it, and so does the release pipeline before uploading.
- **Pinned foundations changed under people.** A deployed version is now never rebuilt, and
  foundations deploy from the release tag rather than every push.
- **Tables were dropped** from PDF, Typst and LaTeX output.
- **Chapter titles printed twice**, in every format. In LaTeX each chapter was two.
- **Every EPUB failed EPUBCheck**, which stores use to accept a book. They now pass.
- **The invoice as Paged.js HTML** was a flat list of lines. It's now the invoice, in your theme.
- **Page sizes disagreed between formats.** Paged.js printed everything on 6×9, LaTeX ignored a
  `book.trim` preset, and an invoice was Letter as HTML and A4 in Word.
- **`frontMatterNumbering: roman`** numbered front matter in arabic.
- **An invoice's tables** ran past Word's margins on A4, and a four-figure total wrapped.
- An error in a document's files now reads as one, with exit code 1, not as an internal error.
- A missing image now names the file, not a temp folder.

### Breaking, since 0.4

- **Node 22.12 or later** for the npm package. The binaries bundle their own runtime.
- **Documents keep their records in `records/`**, and declare them with `queries:` and `query:`.
  See [Upgrading a document from 0.4](./docs/troubleshooting.md#upgrading-a-document-from-04).
- The bundled foundations are named `@unipress/*`. A document pinning `@uniweb/book@<version>`
  still resolves.

## Between 0.2.3 and 0.4.29

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
  `UNIWEB_REGISTRY_URL` (or the default registry of the time) and
  fetches via the existing
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
- **Repo layout**: this package is now a nested pnpm
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
  the book foundation; other formats land when their foundations do.
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
