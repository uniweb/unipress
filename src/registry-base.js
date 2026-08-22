/**
 * The unipress foundation registry — its origin and its URL rule.
 *
 * ## Why this is a module and not two constants
 *
 * unipress's bundled foundations are static artifacts on the unipress repo's
 * GitHub Pages site, laid out as:
 *
 *   <base>/foundations/<name>/<version>/entry.js
 *
 * That layout is **ours** — `.github/workflows/deploy-foundations.yml` writes it
 * — so a default origin is the correct answer rather than a guessed one, and the
 * filename rule is ours to name. But the base is overridable (`UNIWEB_REGISTRY_URL`),
 * which makes this a **writer/reader pair**:
 *
 *   reader  foundation-loader.js   buildRegistryUrl() — what `compile` FETCHES
 *   reader  foundations-data.js    each entry's `foundation.source.url` — what
 *                                  `create` and `list-templates` SHOW the user
 *
 * Before 2026-08-22 those held two hardcoded spellings of one base, decomposed
 * differently — `foundations-data.js` baked `/foundations` into its constant while
 * the loader kept it out and appended it when building. So the two edits needed to
 * move the base did not look alike, and nothing caught a half-finished move. Worse,
 * only the loader honoured `UNIWEB_REGISTRY_URL`: point unipress at a local
 * registry and `list-templates` still printed the GitHub Pages URL, which is not
 * the URL `compile` would fetch. A tool that reports an address it is not using is
 * a bad instrument, and diagnostics is exactly when the override is in play.
 *
 * Same treatment as `@uniweb/core/icon-corpus`, for the same reason: one helper,
 * no second spelling.
 *
 * ## ⛔ Keep this a LEAF — zero imports
 *
 * The import graph runs `foundation-loader.js` → `catalog.js` → `foundations-data.js`,
 * so the catalog cannot import the loader — that is a cycle, and it is why the
 * constant was duplicated in the first place rather than through carelessness. A
 * leaf both sides import is the only shape that works. Keeping it import-free also
 * keeps `bun build --compile` able to inline the catalog (see foundations-data.js
 * § Storage format).
 *
 * @module unipress/registry-base
 */

/**
 * Where unipress publishes its own foundations.
 *
 * Not a fallback for a missing address — it is the address of OUR artifact, and it
 * is what makes `unipress create --template book` work with nothing configured.
 */
export const DEFAULT_REGISTRY_BASE = 'https://uniweb.github.io/unipress'

/**
 * The configured registry base: `UNIWEB_REGISTRY_URL` when set, else ours.
 *
 * Read at call time, not frozen at import, so a caller that sets the variable
 * programmatically before invoking a command still gets it.
 *
 * @returns {string} the base, without a trailing slash
 */
export function getRegistryBase() {
  const raw = process.env.UNIWEB_REGISTRY_URL || DEFAULT_REGISTRY_BASE
  return String(raw).replace(/\/+$/, '')
}

/**
 * The registry path for one foundation, relative to any base serving it.
 *
 * ⚠️ The **namespace is implicit** — every foundation under this layout is
 * `@uniweb/`, so a ref's scope does not appear in the path. A custom
 * `UNIWEB_REGISTRY_URL` that needs a per-namespace split carries it in the base
 * (e.g. `https://my.host/by-ns/uniweb`) or answers it with a redirect.
 *
 * @param {string} name - the foundation name, unscoped (e.g. 'book')
 * @param {string} version
 * @returns {string}
 */
export function foundationPath(name, version) {
  return `foundations/${name}/${version}/entry.js`
}

/**
 * The full URL for one foundation against a serving base.
 *
 * @param {string} name - the foundation name, unscoped
 * @param {string} version
 * @param {string} [base] - serving base; defaults to the configured one
 * @returns {string}
 */
export function foundationUrl(name, version, base = getRegistryBase()) {
  return `${String(base).replace(/\/+$/, '')}/${foundationPath(name, version)}`
}
