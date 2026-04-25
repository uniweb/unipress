// Resolve a foundation reference to an absolute filesystem path.
//
// Returns a path string. Does NOT import or evaluate the foundation —
// that's the orchestrator's job (M3b). This separation lets the resolver
// be tested without going through React, and lets the orchestrator be
// tested with a hand-supplied path.
//
// Five accepted ref forms:
//
//   1. URL ............ https://.../foundation.js  — downloaded + cached
//   2. Local path ..... ./foo, ../foo, /abs/foo, ./foo/dist/foundation.js
//   3. Registry ref ... @<namespace>/<name>@<version> — constructed into a
//                       URL via the registry base (UNIWEB_REGISTRY_URL or
//                       the production default), then resolved as URL
//   4. Catalog id ..... academic-metrics, book, … — looked up in
//                       foundations-data.js, then resolved as URL
//   5. Package name ... my-foundation, @org/foo (no @version suffix)
//
// Resolution order for a bare name: registry-ref first (if it matches the
// scoped @ns/name@ver pattern), then catalog, then package. The registry
// ref is the authoritative form scaffolded documents pin — it works for
// any user of the foundation regardless of whether they have the catalog
// id resolved locally.
//
// The chosen entry for a package is its `exports['./dist']` map, NOT the
// default `.` entry — the default points at source (_entry.generated.js)
// and is only valid inside a Vite build. `dist/foundation.js` is the
// built artifact (the federated module) that Node can import.

import { existsSync, statSync, readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve, isAbsolute, join, dirname } from 'node:path'
import { FoundationResolutionError } from './errors.js'
import { findCatalogEntry } from './catalog.js'
import { fetchFoundationToCache } from './foundation-fetch.js'

const URL_PATTERN = /^https?:\/\//
const PATH_PATTERN = /^(\.\.?[\/\\]|[\/\\]|[A-Za-z]:[\/\\])/
// Registry ref: @<namespace>/<name>@<version>. Namespace + name follow npm's
// scoped-package allowed character set (lowercase alphanumerics, _, -, .).
// Version is anything semver-shaped — exact match isn't enforced here; the
// registry decides what's valid.
const REGISTRY_REF_PATTERN = /^@([a-z0-9][a-z0-9._-]*)\/([a-z0-9][a-z0-9._-]*)@([0-9a-z][0-9a-z.\-+]*)$/i

// unipress's bundled foundations are distributed as static artifacts on
// the unipress repo's GitHub Pages site. URL pattern:
//
//   https://uniweb.github.io/unipress/foundations/<name>/<version>/foundation.js
//
// The namespace portion of a registry ref is implicit — every foundation
// served from this base is under @uniweb/. Set UNIWEB_REGISTRY_URL to
// override (e.g., for testing against a local http.server during foundation
// development, or for users with a private alternative).
const DEFAULT_REGISTRY_BASE = 'https://uniweb.github.io/unipress'
const DEFAULT_BUILT_ENTRY = 'dist/foundation.js'

function getRegistryBase() {
  const raw = process.env.UNIWEB_REGISTRY_URL || DEFAULT_REGISTRY_BASE
  return raw.replace(/\/$/, '')
}

// Build the URL for a registry ref. The namespace is preserved in the
// returned URL only when the base wants it; for the GH Pages distribution
// the namespace is implicit and the path is <base>/foundations/<name>/<ver>/.
// If a custom UNIWEB_REGISTRY_URL needs the namespace in the path, it can
// hold a path prefix that resolves accordingly (e.g., set
// `UNIWEB_REGISTRY_URL=https://my.host/by-ns/uniweb` and live without the
// per-namespace split, or maintain a redirect rule on that host).
function buildRegistryUrl(namespace, name, version) {
  return `${getRegistryBase()}/foundations/${name}/${version}/foundation.js`
}

export async function resolveFoundationRef(ref, { anchorDir, onProgress = () => {} } = {}) {
  if (!ref || typeof ref !== 'string') {
    throw new FoundationResolutionError(
      `foundation ref is required (got ${ref === undefined ? 'undefined' : JSON.stringify(ref)})`
    )
  }

  if (URL_PATTERN.test(ref)) {
    return resolveUrlRef(ref, { onProgress })
  }

  if (PATH_PATTERN.test(ref)) {
    return resolvePathRef(ref, anchorDir)
  }

  const registryMatch = ref.match(REGISTRY_REF_PATTERN)
  if (registryMatch) {
    return resolveRegistryRef(ref, registryMatch, { onProgress })
  }

  const catalogEntry = findCatalogEntry(ref)
  if (catalogEntry) {
    return resolveCatalogRef(ref, catalogEntry, { onProgress })
  }

  return resolvePackageRef(ref, anchorDir)
}

async function resolveRegistryRef(ref, match, { onProgress }) {
  const [, namespace, name, version] = match
  const url = buildRegistryUrl(namespace, name, version)
  const resolvedPath = await fetchFoundationToCache(url, { onProgress })
  return { ref, source: 'registry', resolvedPath, registryUrl: url }
}

async function resolveUrlRef(url, { onProgress }) {
  const resolvedPath = await fetchFoundationToCache(url, { onProgress })
  return { ref: url, source: 'url', resolvedPath }
}

async function resolveCatalogRef(id, entry, { onProgress }) {
  // Prefer the registry ref under the new shape (entry.foundation.ref);
  // fall back to legacy shape (entry.source.url) for any entries still
  // on the v0.1 layout.
  const ref = entry?.foundation?.ref
  if (ref) {
    const m = ref.match(REGISTRY_REF_PATTERN)
    if (m) {
      const result = await resolveRegistryRef(ref, m, { onProgress })
      return { ...result, ref: id, source: 'catalog', catalogEntry: entry }
    }
  }
  const url = entry?.foundation?.source?.url ?? entry?.source?.url
  if (!url) {
    throw new FoundationResolutionError(
      `catalog entry '${id}' has no foundation.ref or source.url\n` +
      `hint: pass --foundation <path-or-url> to bypass the catalog`
    )
  }
  const resolvedPath = await fetchFoundationToCache(url, { onProgress })
  return { ref: id, source: 'catalog', resolvedPath, catalogEntry: entry }
}

function resolvePathRef(ref, anchorDir) {
  if (!anchorDir) {
    throw new FoundationResolutionError(
      `cannot resolve relative foundation path '${ref}' without an anchor directory`
    )
  }

  const absolute = isAbsolute(ref) ? ref : resolve(anchorDir, ref)

  if (!existsSync(absolute)) {
    throw new FoundationResolutionError(
      `foundation path does not exist: ${absolute}\n` +
      `hint: did you build the foundation? (pnpm --filter <foundation> build)`
    )
  }

  const stat = statSync(absolute)
  const file = stat.isDirectory() ? join(absolute, DEFAULT_BUILT_ENTRY) : absolute

  if (!existsSync(file)) {
    throw new FoundationResolutionError(
      `expected built foundation at ${file}\n` +
      `hint: did you build the foundation? (pnpm --filter <foundation> build)`
    )
  }

  return { ref, source: 'path', resolvedPath: file }
}

async function resolvePackageRef(name, anchorDir) {
  if (!anchorDir) {
    throw new FoundationResolutionError(
      `cannot resolve foundation package '${name}' without an anchor directory`
    )
  }

  // Walk up from anchorDir looking for node_modules/<name>/. Bypasses
  // Node's exports-map enforcement (which blocks `<pkg>/package.json`
  // access unless the package explicitly whitelists it). pnpm's hoisting
  // and workspace symlinks land where this expects.
  const pkgRoot = findPackageDir(name, anchorDir)
  if (!pkgRoot) {
    throw new FoundationResolutionError(
      `cannot find foundation package '${name}' from ${anchorDir}\n` +
      `hint: is the package installed? (pnpm install / pnpm add ${name})\n` +
      `hint: if it's not on npm, pass a local path: --foundation ../path/to/foundation`
    )
  }

  const pkgJsonPath = join(pkgRoot, 'package.json')
  const pkg = existsSync(pkgJsonPath)
    ? JSON.parse(await readFile(pkgJsonPath, 'utf8'))
    : null

  // Prefer the explicit `./dist` exports subpath if declared; otherwise
  // fall back to the convention `dist/foundation.js`.
  const distExport = pickBuiltEntry(pkg?.exports)
  const file = distExport
    ? resolve(pkgRoot, distExport)
    : join(pkgRoot, DEFAULT_BUILT_ENTRY)

  if (!existsSync(file)) {
    const cause = distExport
      ? `package '${name}' declares exports['./dist'] = '${distExport}' but file is missing`
      : `package '${name}' has no exports['./dist'] entry, and ${DEFAULT_BUILT_ENTRY} is missing`
    throw new FoundationResolutionError(
      `${cause}\n` +
      `hint: build the foundation (pnpm --filter ${name} build)`
    )
  }

  return { ref: name, source: 'package', resolvedPath: file, packageRoot: pkgRoot, packageVersion: pkg?.version }
}

function findPackageDir(name, fromDir) {
  let dir = fromDir
  while (true) {
    const candidate = join(dir, 'node_modules', name)
    if (existsSync(candidate)) return candidate
    const parent = dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

// A foundation's `exports['./dist']` entry points at the built `foundation.js`.
// The value can be a string or a conditional-exports object; we accept both.
function pickBuiltEntry(exports) {
  if (!exports || typeof exports !== 'object') return null
  const dist = exports['./dist']
  if (!dist) return null
  if (typeof dist === 'string') return dist
  if (typeof dist === 'object') {
    return dist.default || dist.import || dist.node || null
  }
  return null
}

// Resolve the foundation ref for a unipress run. CLI flag overrides
// `document.yml`'s `foundation:` field; otherwise we use what the
// content config declares.
export async function resolveFoundation({ cliRef, configRef, anchorDir, onProgress = () => {} }) {
  const ref = cliRef ?? configRef
  if (!ref) {
    throw new FoundationResolutionError(
      `no foundation specified\n` +
      `hint: set 'foundation:' in document.yml, or pass --foundation <ref>`
    )
  }
  return resolveFoundationRef(ref, { anchorDir, onProgress })
}
