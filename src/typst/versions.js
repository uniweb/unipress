// Pinned Typst version + per-platform download metadata.
//
// Typst does NOT publish .sha256 sidecar files on its GitHub Releases
// (checked across 0.11-0.14). The plan originally assumed otherwise.
// Instead, GitHub's own release-assets API surfaces asset.digest for
// each uploaded artifact; we snapshot those SHA-256 digests here so the
// binary manager can verify downloads without a second fetch.
//
// --- Bumping to a new Typst version ---
// 1. Pick the new version number; update TYPST_VERSION below.
// 2. Fetch the release asset digests from GitHub:
//      curl -sSL https://api.github.com/repos/typst/typst/releases/tags/v<VERSION> \
//        | python3 -c "import json,sys; d=json.load(sys.stdin); \
//            [print(a['name'], a['digest']) for a in d['assets']]"
// 3. Copy the per-platform digests into CHECKSUMS below. The asset names
//    in GitHub's feed match the `{triple}.{ext}` suffixes here.
// 4. Smoke-test on at least one platform: delete the local cache
//    ($UNIPRESS_CACHE_DIR/typst/<VERSION>) and run a compile that
//    exercises the binary manager.
//
// Verified 2026-04-24 against
//   https://api.github.com/repos/typst/typst/releases/tags/v0.14.2

export const TYPST_VERSION = '0.14.2'

// Maps (process.platform, process.arch) → { triple, ext }.
// Only the platforms we distribute unipress for. riscv64 / armv7 / etc.
// are technically downloadable from typst/typst but we don't test them,
// so we surface a clear "unsupported platform" error rather than trying
// to fetch something we can't smoke-test.
export const PLATFORM_TRIPLES = {
  'darwin-arm64':  { triple: 'aarch64-apple-darwin',       ext: 'tar.xz' },
  'darwin-x64':    { triple: 'x86_64-apple-darwin',        ext: 'tar.xz' },
  'linux-x64':     { triple: 'x86_64-unknown-linux-musl',  ext: 'tar.xz' },
  'linux-arm64':   { triple: 'aarch64-unknown-linux-musl', ext: 'tar.xz' },
  'win32-x64':     { triple: 'x86_64-pc-windows-msvc',     ext: 'zip'    },
  'win32-arm64':   { triple: 'aarch64-pc-windows-msvc',    ext: 'zip'    }
}

// SHA-256 digests of each release archive. Keyed by triple so the
// binary manager can look up the expected hash after it's picked a
// triple for the host.
export const CHECKSUMS = {
  'aarch64-apple-darwin':       '470aa49a2298d20b65c119a10e4ff8808550453e0cb4d85625b89caf0cedf048',
  'x86_64-apple-darwin':        '4e91d8e1e33ab164f949c5762e01ee3faa585c8615a2a6bd5e3677fa8506b249',
  'x86_64-unknown-linux-musl':  'a6044cbad2a954deb921167e257e120ac0a16b20339ec01121194ff9d394996d',
  'aarch64-unknown-linux-musl': '491b101aa40a3a7ea82a3f8a6232cabb4e6a7e233810082e5ac812d43fdcd47a',
  'x86_64-pc-windows-msvc':     '51353994ac83218c3497052e89b2c432c53b9d4439cdc1b361e2ea4798ebfc13',
  'aarch64-pc-windows-msvc':    '1c4aaa0de000ab1787dda354c34f4fa1fe3c2525d3d038e692a3d7daa333d551'
}

export function detectPlatform() {
  const key = `${process.platform}-${process.arch}`
  const entry = PLATFORM_TRIPLES[key]
  if (!entry) return { key, triple: null, ext: null }
  return { key, ...entry }
}

export function buildReleaseUrl({ version = TYPST_VERSION, triple, ext } = {}) {
  return `https://github.com/typst/typst/releases/download/v${version}/typst-${triple}.${ext}`
}

export function getChecksum(triple) {
  return CHECKSUMS[triple] ?? null
}
