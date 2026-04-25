# Releasing unipress

Notes for cutting a release tag (`unipress@<version>`). The release workflow at `.github/workflows/release.yml` watches for tag pushes matching that pattern, builds three binaries (darwin-arm64, linux-x64, windows-x64), and creates a GitHub Release with the binaries and SHA-256 sidecars attached.

This file mostly exists to flag one thing the release workflow currently can't handle on its own.

---

## The CI install tension

unipress's runtime depends on five `@uniweb/*` framework packages (`@uniweb/build`, `@uniweb/content-reader`, `@uniweb/core`, `@uniweb/runtime`, `@uniweb/semantic-parser`). The CLI is developed inside a larger monorepo where these are sibling packages and resolve via `workspace:*`. That works for local dev — pnpm symlinks the local sources directly — but the release workflow checks out only this repo, with no monorepo around it.

Two strategies have been tried, and each has a failure mode:

- **`^X.Y.Z` (npm version specs).** Lets CI install standalone from npm. Failure mode: when framework changes ship in unpublished workspace versions, dev machines pnpm-resolve to the npm-published copy instead of the local sibling — meaning `pnpm install` from inside the monorepo silently picks up an older framework. This bit us once; the developer-side breakage is silent and hard to spot.

- **`workspace:*` (current).** Dev machines always get the local siblings. Failure mode: CI's `pnpm install --ignore-workspace --no-frozen-lockfile` has no way to resolve `workspace:*` outside a workspace — it will error.

Both strategies are correct for one audience and broken for the other. The current state is `workspace:*`, which means **the next release tag will fail at the CI install step until one of the two fixes below lands.**

## Two ways out

### (a) Publish all `@uniweb/*` framework packages to npm at the release version, then flip the specs back to npm ranges at release time

The `pnpm framework:publish:*` shortcuts in the outer monorepo handle the framework publish. Workflow:

1. From the outer monorepo, bump + publish all framework packages: `pnpm framework:publish:patch` (or `:minor`).
2. Wait for the publish to settle on npm.
3. In the unipress repo, change the five `@uniweb/*` deps in `package.json` from `workspace:*` back to `^<published-version>` matching what just shipped.
4. Commit, tag `unipress@<version>`, push.
5. After the release CI succeeds and the binary is out, switch the deps back to `workspace:*` so dev resolution stays correct.

Pros: keeps the CI workflow simple — `pnpm install --ignore-workspace --no-frozen-lockfile` continues to work standalone. The release artifact is reproducible from npm with no monorepo context.

Cons: requires a framework publish before every unipress release. Adds a step. The flip-back-to-`workspace:*` after release is easy to forget; if you skip it, the next dev `pnpm install` quietly downgrades the framework deps to the npm-published versions. Worth automating the flip with a script if this becomes the standard path.

### (b) Build the unipress binary inside the outer monorepo's CI

Add a release workflow at the **outer monorepo** that:

1. Watches for tag pushes matching `unipress@*`.
2. Checks out the outer monorepo (which has the workspace + all `@uniweb/*` siblings cloned via `pnpm clone`).
3. Runs `pnpm install` at the outer root (resolves `workspace:*` correctly).
4. Runs `node scripts/build-binaries.js` from inside `framework/unipress/`.
5. Uploads the resulting binaries to a GitHub Release in the **unipress** repo (cross-repo release via `gh release` with a PAT).

Pros: matches the dev environment exactly — workspace:* always resolves the same way locally and in CI. No extra publish step. No flip-back dance.

Cons: more workflow complexity. Cross-repo release upload requires a PAT (the workflow's default `GITHUB_TOKEN` is scoped to its own repo). The outer monorepo is private, so the workflow runs there and can't be inspected by anyone outside the org — fine for our purposes but worth noting if unipress ever gets external contributors who want to understand how releases are produced.

## Recommendation

**Go with (a) for v0.x releases. Move to (b) once unipress's release cadence outpaces the framework's**, or once the outer monorepo's CI matures enough that adding a cross-repo build step is cheap.

Why (a) first:

- The framework already publishes to npm on its own cadence. Tagging unipress *after* a framework publish settles is a normal sequencing — every framework feature unipress depends on is on npm anyway by the time a release ships.
- The flip-back-to-`workspace:*` step is the only friction, and it's a one-line change. Easy to script.
- (b) is strictly more invasive and ties the unipress release pipeline to the outer monorepo's existence — a coupling worth deferring.

When (b) starts to make sense:

- If unipress needs to release patches against unpublished framework changes (rare, but possible).
- If the framework publish cadence becomes the bottleneck on shipping unipress fixes.
- If cross-repo release infrastructure is already in place for other reasons (e.g., other tools in `framework/` shipping binaries).

## Concrete checklist for the next release

Until (b) lands, every release goes through this:

```bash
# 1. From the outer monorepo: bump + publish framework
pnpm framework:publish:patch    # or :minor

# 2. Note the new versions: check `framework/<pkg>/package.json` for each.

# 3. In framework/unipress/, edit package.json:
#    - "@uniweb/build": "workspace:*"      → "^<new-version>"
#    - (repeat for content-reader, core, runtime, semantic-parser)

# 4. Bump unipress version + update CHANGELOG (this file's git history
#    should make the pattern obvious).

# 5. Commit + tag + push:
git add package.json CHANGELOG.md
git commit -m "release: <version>"
git tag -a unipress@<version> -m "..."
git push origin main
git push origin unipress@<version>

# 6. Wait for the release workflow. Confirm artifacts uploaded.
#    The release is created as a draft — review and publish it via
#    `gh release edit unipress@<version> --draft=false`.

# 7. Flip framework deps back to workspace:* so dev resolution stays
#    correct against unpublished framework changes:
git revert <step-3-commit>     # or hand-edit + commit
git push origin main
```

Step 7 is the easy-to-forget one. If a dev pulls and runs `pnpm install` while the package.json still has the npm specs from step 3, they'll silently get the npm-published framework copies — which means any unpublished framework features won't be available locally. Don't skip step 7.
