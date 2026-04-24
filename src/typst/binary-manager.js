// Resolve a usable Typst binary path — either a caller-supplied override,
// a previously cached download, or a fresh fetch from typst/typst's
// GitHub releases.
//
// Contract: `resolveTypstBinary()` returns an absolute path to an
// executable `typst` (`typst.exe` on Windows). It does NOT spawn `typst
// compile` — that's the sink's job. It DOES spawn `<path> --version`
// as a sanity check: if the binary won't run, we'd rather fail here with
// a clear error than later with a spawn-from-sink error.
//
// Cache layout (per plan §12.3):
//   $UNIPRESS_CACHE_DIR/typst/<version>/typst
// or the platform-default cache dir when $UNIPRESS_CACHE_DIR is unset.

import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
import { mkdir, rm, rename, readdir, chmod, stat } from 'node:fs/promises'
import { createWriteStream, existsSync } from 'node:fs'
import { join, dirname, resolve, isAbsolute } from 'node:path'
import { homedir, tmpdir } from 'node:os'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import {
  TYPST_VERSION,
  detectPlatform,
  buildReleaseUrl,
  getChecksum
} from './versions.js'
import { TypstBinaryError } from '../errors.js'

const EXE = process.platform === 'win32' ? 'typst.exe' : 'typst'

// Platform-default cache directory.
//   UNIPRESS_CACHE_DIR .......... absolute path, wins over everything.
//   XDG_CACHE_HOME/unipress ..... Linux + anyone who set it.
//   ~/Library/Caches/unipress ... macOS default.
//   %LOCALAPPDATA%/unipress ..... Windows default.
//   ~/.cache/unipress ........... fallback.
export function getCacheDir() {
  const override = process.env.UNIPRESS_CACHE_DIR
  if (override) {
    if (!isAbsolute(override)) {
      throw new TypstBinaryError(
        `UNIPRESS_CACHE_DIR must be an absolute path (got '${override}')`
      )
    }
    return override
  }
  const xdg = process.env.XDG_CACHE_HOME
  if (xdg) return join(xdg, 'unipress')
  if (process.platform === 'darwin') {
    return join(homedir(), 'Library', 'Caches', 'unipress')
  }
  if (process.platform === 'win32') {
    const local = process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local')
    return join(local, 'unipress', 'Cache')
  }
  return join(homedir(), '.cache', 'unipress')
}

export function getBinaryPath(version = TYPST_VERSION) {
  return join(getCacheDir(), 'typst', version, EXE)
}

// Main entry point. Returns an absolute path to a working typst binary.
export async function resolveTypstBinary({ overridePath = null, version = TYPST_VERSION, onProgress = () => {} } = {}) {
  if (overridePath) {
    const absolute = resolve(overridePath)
    if (!existsSync(absolute)) {
      throw new TypstBinaryError(
        `--typst-binary points at a file that does not exist: ${absolute}`
      )
    }
    await sanityCheck(absolute, { label: 'override' })
    onProgress(`using typst binary (override): ${absolute}`)
    return absolute
  }

  const cached = getBinaryPath(version)
  if (existsSync(cached)) {
    await sanityCheck(cached, { label: 'cache' })
    onProgress(`using cached typst ${version}: ${cached}`)
    return cached
  }

  return downloadAndInstall({ version, onProgress })
}

async function downloadAndInstall({ version, onProgress }) {
  const platform = detectPlatform()
  if (!platform.triple) {
    throw new TypstBinaryError(
      `no prebuilt typst binary available for ${platform.key}\n` +
      `hint: install typst yourself and pass --typst-binary <path>, or\n` +
      `      set the UNIPRESS_CACHE_DIR so unipress can find an existing binary`
    )
  }

  const checksum = getChecksum(platform.triple)
  if (!checksum) {
    throw new TypstBinaryError(
      `no pinned SHA-256 for triple '${platform.triple}' at version ${version}\n` +
      `hint: src/typst/versions.js is out of sync — see the bump procedure comment`
    )
  }

  const url = buildReleaseUrl({ version, triple: platform.triple, ext: platform.ext })
  const destDir = join(getCacheDir(), 'typst', version)
  const finalPath = join(destDir, EXE)

  onProgress(`downloading typst ${version} for ${platform.triple}...`)
  await mkdir(destDir, { recursive: true })

  const archivePath = join(destDir, `typst-${platform.triple}.${platform.ext}`)
  await fetchTo(url, archivePath)

  onProgress('verifying checksum...')
  const actual = await sha256OfFile(archivePath)
  if (actual !== checksum) {
    await rm(archivePath, { force: true })
    throw new TypstBinaryError(
      `sha256 mismatch for typst ${version} (${platform.triple})\n` +
      `  expected: ${checksum}\n` +
      `  actual:   ${actual}\n` +
      `hint: the download may be corrupt or the pinned checksum is stale — retry, or report this`
    )
  }

  onProgress('extracting...')
  await extractArchive(archivePath, destDir)
  await rm(archivePath, { force: true })

  // Archive extracts into a typst-<triple>/ subdirectory containing the
  // binary. Move the binary up one level and remove the leftover dir.
  await liftBinary(destDir, platform.triple, finalPath)

  if (process.platform !== 'win32') {
    await chmod(finalPath, 0o755)
  }

  await sanityCheck(finalPath, { label: 'downloaded' })
  onProgress(`installed typst ${version} at ${finalPath}`)
  return finalPath
}

async function fetchTo(url, destPath) {
  let response
  try {
    response = await fetch(url, { redirect: 'follow' })
  } catch (err) {
    throw new TypstBinaryError(
      `failed to fetch ${url}\n` +
      `cause: ${err.message}\n` +
      `hint: check network access, or pre-populate the cache and retry`
    )
  }
  if (!response.ok || !response.body) {
    throw new TypstBinaryError(
      `fetch failed: ${url}\n` +
      `HTTP ${response.status} ${response.statusText}`
    )
  }
  await pipeline(Readable.fromWeb(response.body), createWriteStream(destPath))
}

async function sha256OfFile(path) {
  const { createReadStream } = await import('node:fs')
  const hash = createHash('sha256')
  await pipeline(createReadStream(path), hash)
  return hash.digest('hex')
}

async function extractArchive(archivePath, destDir) {
  // `tar -xf` handles both tar.xz (via libarchive/GNU tar+xz) and .zip
  // on macOS, Linux, and modern Windows (ships bsdtar since 2017).
  await run('tar', ['-xf', archivePath, '-C', destDir], {
    onError: (err) => new TypstBinaryError(
      `failed to extract ${archivePath}\n` +
      `cause: ${err.message}\n` +
      `hint: is \`tar\` on PATH? (macOS/Linux ship it; Windows 10+ does too)`
    )
  })
}

async function liftBinary(destDir, triple, finalPath) {
  const entries = await readdir(destDir, { withFileTypes: true })
  const sub = entries.find(e => e.isDirectory() && e.name.startsWith('typst-'))
  if (!sub) {
    throw new TypstBinaryError(
      `extracted archive has no typst-<triple>/ directory under ${destDir}`
    )
  }
  const extractedBinary = join(destDir, sub.name, EXE)
  if (!existsSync(extractedBinary)) {
    throw new TypstBinaryError(
      `expected ${extractedBinary} after extraction, but it is missing`
    )
  }
  await rename(extractedBinary, finalPath)
  await rm(join(destDir, sub.name), { recursive: true, force: true })
}

async function sanityCheck(binaryPath, { label }) {
  try {
    await run(binaryPath, ['--version'])
  } catch (err) {
    throw new TypstBinaryError(
      `typst ${label} binary at ${binaryPath} failed \`--version\`\n` +
      `cause: ${err.message}`
    )
  }
}

function run(cmd, args, { onError } = {}) {
  return new Promise((resolveProm, reject) => {
    const proc = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = ''
    proc.stderr.on('data', chunk => { stderr += chunk.toString() })
    proc.on('error', err => reject(onError ? onError(err) : err))
    proc.on('close', code => {
      if (code === 0) resolveProm()
      else {
        const err = new Error(`\`${cmd}\` exited with code ${code}${stderr ? `: ${stderr.trim()}` : ''}`)
        reject(onError ? onError(err) : err)
      }
    })
  })
}
