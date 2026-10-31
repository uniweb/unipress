# Releasing unipress

unipress reaches people three ways, and a release is all three, in this order. Each step is the maintainer's.

## 1. npm

The framework's release publishes `@uniweb/unipress` with the framework packages it depends on, and pushes a `v<version>` tag here.

## 2. Foundations

The tag runs [`deploy-foundations.yml`](./.github/workflows/deploy-foundations.yml), which builds each `foundations/<name>/` whose version is not deployed yet and adds it to GitHub Pages at `https://uniweb.github.io/unipress/foundations/<name>/<version>/`.

**Wait for it to finish.** The CLI just published pins those versions, and a binary's smoke test (below) fetches them.

**A deployed version never changes.** A document pins a foundation by version, and a binary bundles the `@uniweb/core` it was built with. A foundation is built against the kit on npm, and a kit newer than a binary's core can import what that core does not have, so rebuilding a version in place breaks every older binary on its next fresh download.

So changing a foundation takes three things in the same commit: a new `version` in its `package.json`, its pin in [`src/foundations-data.js`](./src/foundations-data.js), and the regenerated templates (`node scripts/generate-templates-data.js`). `tests/paper.test.js` fails when a pin and a version disagree. The deploy warns when a foundation's source changed under a version already deployed.

## 3. Binaries and Homebrew

Standalone binaries are built, signed and notarized in a private pipeline, which the maintainer dispatches with the version. It checks out the `v<version>` tag, compiles for macOS, Linux and Windows, runs [`scripts/smoke.js`](./scripts/smoke.js) on each binary against the foundations just deployed, uploads to the GitHub Release, and bumps the Homebrew tap.

## Before a release

```bash
pnpm test                  # unit tests
pnpm audit:docs            # every document in documents/, in .outputs/
node scripts/smoke.js      # every template, every format, each paper
```

To test a binary from this checkout (`bun` 1.3.9, `foundations/` built):

```bash
node scripts/build-binaries.js --out dist-bin
node scripts/smoke.js --bin dist-bin/unipress-darwin-arm64 --foundations local
```

## CI and unpublished framework changes

CI checks out this repo alone and installs the framework from npm (`scripts/ci-flip-workspace-deps.js`), so a commit that needs an unpublished framework change fails [`test-e2e.yml`](./.github/workflows/test-e2e.yml) until that change is published. Inside the monorepo the same packages resolve to their working copies through `workspace:` specs.
