#!/usr/bin/env node

/**
 * Build standalone unipress binaries via `bun build --compile`.
 *
 * Usage:
 *   node scripts/build-binaries.js                 # auto-detect host target
 *   node scripts/build-binaries.js --target <t>    # bun target, e.g., bun-darwin-arm64
 *   node scripts/build-binaries.js --out <dir>     # output directory (default: dist-bin)
 *
 * Supported bun targets (matches .github/workflows/release.yml matrix):
 *   bun-darwin-arm64      macOS Apple Silicon
 *   bun-linux-x64         Linux x64
 *   bun-windows-x64       Windows x64  (produces .exe)
 *
 * The produced file is a single self-extracting binary that bundles the
 * unipress CLI + every workspace dep it pulls in. Run directly:
 *   ./dist-bin/unipress-darwin-arm64 compile …
 *
 * Typst is NOT bundled — the binary manager downloads + caches it on
 * first `compile --format pdf`. Keeps the release small and lets us
 * upgrade typst independently of unipress.
 */

import { parseArgs } from 'node:util'
import { mkdirSync, statSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PKG_DIR = resolve(__dirname, '..')
const ENTRY = resolve(PKG_DIR, 'src/cli.js')

const { values } = parseArgs({
  options: {
    target: { type: 'string' },
    out: { type: 'string' },
  },
  strict: false,
})

const target = values.target || detectHostTarget()
const outDir = resolve(PKG_DIR, values.out || 'dist-bin')
const ext = target.includes('windows') ? '.exe' : ''
const outName = `unipress-${target.replace(/^bun-/, '')}${ext}`
const outPath = join(outDir, outName)

mkdirSync(outDir, { recursive: true })

// Regenerate embedded templates from templates/ so the compiled binary
// sees the latest content.
const gen = spawnSync('node', [resolve(__dirname, 'generate-templates-data.js')], {
  stdio: 'inherit',
  cwd: PKG_DIR,
})
if (gen.status !== 0) {
  process.stderr.write(`\n[build-binaries] generate-templates-data failed (status ${gen.status})\n`)
  process.exit(gen.status || 1)
}

console.log(`[build-binaries] target:  ${target}`)
console.log(`[build-binaries] entry:   ${ENTRY}`)
console.log(`[build-binaries] output:  ${outPath}`)

// Packages that are only require()'d inside try/catch probes (cosmiconfig,
// @babel/core, etc. trying to lazy-load optional loaders). Bundling them
// would pull in their own transitive graphs for no runtime benefit. Mark
// them external so bun emits runtime requires that the try/catch swallows.
const OPTIONAL_EXTERNALS = [
  'typescript',
  '@babel/preset-typescript',
  '@babel/preset-typescript/package.json',
]

const args = ['build', ENTRY, '--compile', '--target', target, '--outfile', outPath]
for (const ext of OPTIONAL_EXTERNALS) {
  args.push('--external', ext)
}
const result = spawnSync('bun', args, { stdio: 'inherit', cwd: PKG_DIR })
if (result.status !== 0) {
  process.stderr.write(`\n[build-binaries] bun build failed (status ${result.status})\n`)
  process.exit(result.status || 1)
}

const stat = statSync(outPath)
console.log(`[build-binaries] wrote ${outName} (${(stat.size / 1024 / 1024).toFixed(1)} MB)`)

function detectHostTarget() {
  const { platform, arch } = process
  if (platform === 'darwin' && arch === 'arm64') return 'bun-darwin-arm64'
  if (platform === 'linux' && arch === 'x64') return 'bun-linux-x64'
  if (platform === 'win32' && arch === 'x64') return 'bun-windows-x64'
  throw new Error(`no default bun target for ${platform}/${arch}; pass --target explicitly`)
}
