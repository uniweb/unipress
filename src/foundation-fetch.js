// URL-based foundation resolution: fetch + cache a built foundation's
// full dist tree so Node can import it.
//
// Cache layout:
//   <unipress cache>/foundations/<host>/<pathish>/entry.js
//   <unipress cache>/foundations/<host>/<pathish>/<chunk>.js
//   ... etc
//
// where <pathish> is the URL's path with leading slashes stripped and
// the trailing entry filename stripped — the same URL always maps to
// the same cache path.
//
// A built foundation is a small entry (`entry.js`, the @uniweb/build
// standard output name) plus a set of sibling chunks referenced by
// relative imports (and further chunks dynamically imported from those).
// `fetchFoundationToCache` walks the import graph: it downloads the entry,
// scans for `./*.js` imports (static and dynamic), fetches each, and
// recurses. That's enough to cover @uniweb/build's output — all sibling
// chunks live next to the entry. Imports NOT starting with './' are bare
// specifiers (external like 'react') or absolute URLs and are not part of
// the fetch graph.
//
// Entry name: the framework standard is `entry.js`. Foundations published
// before @uniweb/build's entry rename serve `foundation.js`, so the fetch
// probes `entry.js` first and falls back to `foundation.js` (see
// ENTRY_CANDIDATES) — both when probing the registry and when reusing a
// cached download.
//
// Integrity: the fetch is unverified today. Once the Uniweb registry
// publishes integrity data, the catalog entry can carry an `integrity:`
// field and this module will verify bytes before caching.

import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, posix } from 'node:path'
import { FoundationFetchError } from './errors.js'
import { getCacheDir } from './typst/binary-manager.js'
import { externalShimPackages } from './runtime-externals.js'

// Match `./chunk.js` only in actual ESM import positions — `from './x'`,
// `import './x'`, or `import('./x')`. A broad "match any quoted ./x.js"
// picks up Node-core strings embedded in bundled commonjs shims.
const RELATIVE_JS_IMPORT = /(?:from\s*|\bimport\s*\(?\s*)['"](\.\/[^'"]+\.(?:js|mjs|cjs))['"]/g

// Foundation entry filename. The framework standard is `entry.js`;
// `foundation.js` is the legacy name some already-published foundations
// still serve. Prefer the standard, fall back to the legacy name — both
// when probing the registry and when reusing a cached download.
const ENTRY_CANDIDATES = ['entry.js', 'foundation.js']
const ENTRY_FILENAME_RE = /\/(?:entry|foundation)\.js$/i

export function getFoundationCacheDir(url) {
  let parsed
  try {
    parsed = new URL(url)
  } catch (err) {
    throw new FoundationFetchError(
      `foundation URL is not a valid URL: ${url}\n` +
      `cause: ${err.message}`
    )
  }
  const host = parsed.host.replace(/:/g, '_')
  // Strip a leading slash and any trailing entry filename or slash so the
  // same foundation maps to one cache dir whether the URL carries entry.js,
  // foundation.js, or just the containing directory.
  let p = parsed.pathname.replace(/^\/+/, '').replace(ENTRY_FILENAME_RE, '').replace(/\/$/, '')
  return join(getCacheDir(), 'foundations', host, p)
}

export function getFoundationCachePath(url) {
  const dir = getFoundationCacheDir(url)
  for (const name of ENTRY_CANDIDATES) {
    const candidate = join(dir, name)
    if (existsSync(candidate)) return candidate
  }
  return join(dir, ENTRY_CANDIDATES[0])
}

export async function fetchFoundationToCache(url, { onProgress = () => {} } = {}) {
  const cacheDir = getFoundationCacheDir(url)

  // Reuse a prior download under either the standard or legacy entry name.
  for (const name of ENTRY_CANDIDATES) {
    const cached = join(cacheDir, name)
    if (existsSync(cached)) {
      onProgress(`using cached foundation: ${cached}`)
      // Refresh the external shims even on a cache hit: it's a handful of tiny
      // files, and it self-heals a cache populated by an older unipress (which
      // left an empty node_modules or dead symlinks that no longer resolve).
      await writeExternalShims(cacheDir, onProgress)
      return cached
    }
  }
  onProgress(`downloading foundation graph from ${url}`)
  await mkdir(cacheDir, { recursive: true })

  // Directory URL the individual chunk files live under. Works whether
  // the input URL ends in an entry filename or at the containing directory.
  const urlObj = new URL(url)
  const pathname = urlObj.pathname.replace(ENTRY_FILENAME_RE, '/')
  urlObj.pathname = pathname.endsWith('/') ? pathname : pathname + '/'
  const baseUrl = urlObj.toString()

  // Prefer entry.js (framework standard); fall back to foundation.js
  // (foundations published before the entry rename).
  const entryName = await pickRemoteEntry(baseUrl, onProgress)

  const fetched = new Set()
  const queue = [entryName]
  while (queue.length > 0) {
    const rel = queue.shift()
    if (fetched.has(rel)) continue
    fetched.add(rel)

    const fullUrl = new URL(rel, baseUrl).toString()
    const buf = await fetchOne(fullUrl)
    const localPath = join(cacheDir, rel)
    await mkdir(dirname(localPath), { recursive: true })
    await writeFile(localPath, buf)
    onProgress(`  ${buf.length} bytes: ${rel}`)

    // Scan text for relative imports and enqueue.
    const text = buf.toString('utf8')
    for (const match of text.matchAll(RELATIVE_JS_IMPORT)) {
      const discovered = normaliseRelative(rel, match[1])
      if (!fetched.has(discovered)) queue.push(discovered)
    }
  }
  await writeExternalShims(cacheDir, onProgress)
  const entryPath = join(cacheDir, entryName)
  onProgress(`foundation cached at ${cacheDir} (${fetched.size} file(s))`)
  return entryPath
}

// Probe the registry for the foundation's entry file. Returns the first
// of ENTRY_CANDIDATES the host serves (prefer `entry.js`, tolerate the
// legacy `foundation.js`). A plain GET is used rather than HEAD so the
// check works against any static host; only the status is needed, so the
// body is cancelled — the graph walk re-fetches the entry.
async function pickRemoteEntry(baseUrl, onProgress) {
  for (const name of ENTRY_CANDIDATES) {
    const probeUrl = new URL(name, baseUrl).toString()
    let res
    try {
      res = await fetch(probeUrl)
    } catch {
      continue
    }
    res.body?.cancel?.()
    if (res.ok) return name
    if (name !== ENTRY_CANDIDATES[ENTRY_CANDIDATES.length - 1]) {
      onProgress(`  ${name} not found, trying legacy entry name…`)
    }
  }
  throw new FoundationFetchError(
    `foundation entry not found under ${baseUrl}\n` +
    `tried: ${ENTRY_CANDIDATES.join(', ')}\n` +
    `hint: check the foundation is published at that version`
  )
}

// Lay shim modules for the foundation's externalized peer deps into a
// node_modules beside the cached entry, so the dynamically imported foundation
// resolves react / react-dom / @uniweb/core to unipress's own bundled instances
// (via the globalThis bridge in runtime-externals.js) rather than hunting for a
// node_modules that isn't there.
//
// Replaces the old symlink-to-local-copies approach, which couldn't locate
// on-disk copies inside the `bun --compile` binary: the deps are bundled into
// the binary, and require.resolve resolves relative to the CWD, so it found
// nothing when unipress ran from a project with no react up its tree. The shims
// read the bridge instead of resolving a real package, so they work from any
// directory and in any distribution. See runtime-externals.js for the full
// rationale and the single-instance guarantee.
//
// Idempotent and overwriting: cheap (a handful of tiny files), and self-heals a
// cache left in a bad state by an older unipress.
async function writeExternalShims(cacheDir, onProgress) {
  const nmDir = join(cacheDir, 'node_modules')
  for (const pkg of externalShimPackages()) {
    const pkgDir = join(nmDir, ...pkg.dir.split('/'))
    await mkdir(pkgDir, { recursive: true })
    await writeFile(join(pkgDir, 'package.json'), pkg.packageJson)
    for (const [rel, source] of Object.entries(pkg.files)) {
      await writeFile(join(pkgDir, rel), source)
    }
    onProgress(`  shimmed ${pkg.dir} → unipress's bundled copy`)
  }
}

function normaliseRelative(fromRel, toRel) {
  // Resolve `toRel` against `fromRel`'s directory using POSIX semantics
  // (URLs and ESM paths are POSIX-style regardless of host OS).
  const fromDir = posix.dirname(fromRel)
  return posix.normalize(posix.join(fromDir, toRel)).replace(/^\.\//, '')
}

async function fetchOne(url) {
  let res
  try {
    res = await fetch(url)
  } catch (err) {
    throw new FoundationFetchError(
      `could not fetch ${url}\n` +
      `cause: ${err.message}\n` +
      `hint: is the registry reachable? (for localhost URLs, is unicloud running?)`
    )
  }
  if (!res.ok) {
    throw new FoundationFetchError(
      `fetch failed (${res.status} ${res.statusText}): ${url}\n` +
      `hint: check the foundation is published at that version`
    )
  }
  return Buffer.from(await res.arrayBuffer())
}
