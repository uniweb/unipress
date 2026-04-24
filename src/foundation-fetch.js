// URL-based foundation resolution: fetch + cache a built foundation's
// full dist tree so Node can import it.
//
// Cache layout:
//   <unipress cache>/foundations/<host>/<pathish>/foundation.js
//   <unipress cache>/foundations/<host>/<pathish>/<chunk>.js
//   ... etc
//
// where <pathish> is the URL's path with leading slashes stripped and
// the trailing /foundation.js stripped — the same URL always maps to
// the same cache path.
//
// A built foundation is a small entry (`foundation.js`) plus a set of
// sibling chunks referenced by relative imports (and further chunks
// dynamically imported from those). `fetchFoundationToCache` walks the
// import graph: it downloads foundation.js, scans for `./*.js` imports
// (static and dynamic), fetches each, and recurses. That's enough to
// cover @uniweb/build's output — all sibling chunks live next to
// foundation.js. Imports NOT starting with './' are bare specifiers
// (external like 'react') or absolute URLs and are not part of the
// fetch graph.
//
// Integrity: the fetch is unverified today. Once the Uniweb registry
// publishes integrity data, the catalog entry can carry an `integrity:`
// field and this module will verify bytes before caching.

import { existsSync } from 'node:fs'
import { mkdir, writeFile, symlink } from 'node:fs/promises'
import { dirname, join, posix, resolve as pathResolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { FoundationFetchError } from './errors.js'
import { getCacheDir } from './typst/binary-manager.js'

const require = createRequire(import.meta.url)

// Bare specifiers that the foundation expects to resolve externally
// (matches DEFAULT_EXTERNALS in @uniweb/build). At import time, Node
// walks up from the cache dir looking for a node_modules/<name>. The
// cache dir isn't inside any package tree, so we link unipress's own
// installations into a co-located node_modules.
const EXTERNAL_PACKAGES = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  '@uniweb/core',
]

// Match `./chunk.js` only in actual ESM import positions — `from './x'`,
// `import './x'`, or `import('./x')`. A broad "match any quoted ./x.js"
// picks up Node-core strings embedded in bundled commonjs shims.
const RELATIVE_JS_IMPORT = /(?:from\s*|\bimport\s*\(?\s*)['"](\.\/[^'"]+\.(?:js|mjs|cjs))['"]/g

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
  let p = parsed.pathname.replace(/^\/+/, '').replace(/\/foundation\.js$/i, '')
  return join(getCacheDir(), 'foundations', host, p)
}

export function getFoundationCachePath(url) {
  return join(getFoundationCacheDir(url), 'foundation.js')
}

export async function fetchFoundationToCache(url, { onProgress = () => {} } = {}) {
  const cacheDir = getFoundationCacheDir(url)
  const entryPath = join(cacheDir, 'foundation.js')
  if (existsSync(entryPath)) {
    onProgress(`using cached foundation: ${entryPath}`)
    return entryPath
  }
  onProgress(`downloading foundation graph from ${url}`)
  await mkdir(cacheDir, { recursive: true })

  // Directory URL the individual chunk files live under. Works whether
  // the input URL ends in /foundation.js or at the containing directory.
  const urlObj = new URL(url)
  const pathname = urlObj.pathname.replace(/\/foundation\.js$/i, '/')
  urlObj.pathname = pathname.endsWith('/') ? pathname : pathname + '/'
  const baseUrl = urlObj.toString()

  const fetched = new Set()
  const queue = ['foundation.js']
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
  await linkExternals(cacheDir, onProgress)
  onProgress(`foundation cached at ${cacheDir} (${fetched.size} file(s))`)
  return entryPath
}

// Make unipress's own copies of the externalized packages reachable
// from the cache dir. Node's ESM loader walks up from the importing
// file looking for `node_modules/<name>` — by placing a node_modules
// directory next to the cached foundation.js with symlinks to each
// external's package directory, bare imports inside the foundation
// resolve to unipress's already-installed copies. This keeps a single
// React instance (unipress's) across host and foundation.
async function linkExternals(cacheDir, onProgress) {
  const nmDir = join(cacheDir, 'node_modules')
  await mkdir(nmDir, { recursive: true })
  // Collapse subpath specifiers (react/jsx-runtime → react) to the
  // package-root specifier we actually link. Deduped.
  const rootSpecs = new Set()
  for (const spec of EXTERNAL_PACKAGES) {
    rootSpecs.add(spec.startsWith('@')
      ? spec.split('/').slice(0, 2).join('/')  // '@scope/name'
      : spec.split('/')[0])                     // 'name'
  }
  for (const name of rootSpecs) {
    const dest = name.startsWith('@')
      ? join(nmDir, ...name.split('/'))         // node_modules/@scope/name
      : join(nmDir, name)                       // node_modules/name
    if (existsSync(dest)) continue
    try {
      const pkgDir = findPackageRoot(name)
      if (!pkgDir) {
        onProgress(`  warn: cannot find '${name}' in unipress deps — foundation may fail to import`)
        continue
      }
      await mkdir(dirname(dest), { recursive: true })
      await symlink(pkgDir, dest, 'dir')
      onProgress(`  linked ${name} → ${pkgDir}`)
    } catch (err) {
      onProgress(`  warn: linking ${name} failed: ${err.message}`)
    }
  }
}

function findPackageRoot(name) {
  try {
    // Resolve the package's `package.json` to find its root.
    const pkgJson = require.resolve(`${name}/package.json`)
    return dirname(pkgJson)
  } catch {
    // Fallback: resolve a default export and strip back.
    try {
      const entry = require.resolve(name)
      let dir = dirname(entry)
      while (dir !== dirname(dir)) {
        if (existsSync(join(dir, 'package.json'))) {
          const pkg = JSON.parse(require('fs').readFileSync(join(dir, 'package.json'), 'utf8'))
          if (pkg.name === name || pkg.name === name.split('/')[0]) return dir
        }
        dir = dirname(dir)
      }
    } catch {}
    return null
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
