#!/usr/bin/env node

/**
 * CI-side rewrite: replace `workspace:*` deps with concrete npm version
 * specs before `pnpm install` runs.
 *
 * Why this exists
 * ────────────────
 * unipress's CLI and bundled foundations declare `@uniweb/*` framework
 * deps as `workspace:*` so dev machines (which clone the outer monorepo)
 * resolve to the local sibling sources directly. CI workflows here check
 * out only this repo — there is no workspace around it — and pnpm cannot
 * resolve the `workspace:` protocol outside a workspace context. A bare
 * `pnpm install --ignore-workspace --no-frozen-lockfile` errors with
 *   ERR_PNPM_WORKSPACE_PKG_NOT_FOUND
 *
 * `pnpm publish` solves this for the published tarball by translating
 * `workspace:*` → the sibling's real version at publish time. CI install
 * needs the same translation, applied to source files in the runner's
 * filesystem (not committed back).
 *
 * What this does
 * ──────────────
 * Walks every `package.json` under:
 *   - the repo root
 *   - foundations/<name>/
 *   - documents/<name>/  (most don't have package.json; harmless if absent)
 *
 * For each `dependencies` / `devDependencies` / `peerDependencies` /
 * `optionalDependencies` entry whose value is `workspace:*`, looks up the
 * package's current version via `npm view <name> version` and rewrites
 * the spec to `^<version>`. Writes the modified package.json back to
 * disk in the same location.
 *
 * Failure modes
 * ─────────────
 * - `npm view` returns 404 (package never published): script fails loud.
 *   That's the right behavior — a foundation referencing an unpublished
 *   sibling can't build standalone.
 * - Network error: same. Re-run the workflow.
 * - Two packages reference different versions of the same dep: each
 *   independently picks up the npm-current version. They will agree
 *   because npm has a single "current" version per name.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')

const PKG_SECTIONS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]

const versionCache = new Map()

function npmVersion(packageName) {
  if (versionCache.has(packageName)) return versionCache.get(packageName)
  let version
  try {
    version = execSync(`npm view ${packageName} version`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim()
  } catch (err) {
    throw new Error(
      `npm view ${packageName} failed (likely unpublished): ${err.message?.split('\n')[0] || err}`,
    )
  }
  if (!version) {
    throw new Error(`npm view ${packageName} returned empty`)
  }
  versionCache.set(packageName, version)
  return version
}

function flipPackageJson(pkgPath) {
  const raw = readFileSync(pkgPath, 'utf8')
  const pkg = JSON.parse(raw)
  let changed = false
  const flipped = []

  for (const section of PKG_SECTIONS) {
    if (!pkg[section]) continue
    for (const [name, spec] of Object.entries(pkg[section])) {
      if (spec === 'workspace:*' || (typeof spec === 'string' && spec.startsWith('workspace:'))) {
        const version = npmVersion(name)
        pkg[section][name] = `^${version}`
        flipped.push(`${name} → ^${version}`)
        changed = true
      }
    }
  }

  if (!changed) return false
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  console.log(`✓ ${pkgPath}`)
  for (const entry of flipped) console.log(`    ${entry}`)
  return true
}

function findPackageJsons() {
  const found = []
  const candidates = [REPO_ROOT]

  for (const subdir of ['foundations', 'documents']) {
    const dir = join(REPO_ROOT, subdir)
    if (!existsSync(dir)) continue
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      candidates.push(join(dir, entry.name))
    }
  }

  for (const dir of candidates) {
    const pkgPath = join(dir, 'package.json')
    if (existsSync(pkgPath)) found.push(pkgPath)
  }
  return found
}

const targets = findPackageJsons()
console.log(`Scanning ${targets.length} package.json file(s) for workspace:* deps...`)

let totalFlipped = 0
for (const pkgPath of targets) {
  if (flipPackageJson(pkgPath)) totalFlipped++
}

console.log('')
console.log(`Flipped ${totalFlipped} of ${targets.length} package.json file(s).`)
