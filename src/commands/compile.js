// `unipress compile <dir>` — CLI adapter for src/compile.js.
//
// Writes verbose progress to stderr so stdout stays clean for the
// single success summary line.

import { compile } from '../compile.js'

export async function compileCommand({ dir, format = null, foundation = null, out = null, verbose = false } = {}) {
  if (!dir) {
    process.stderr.write('error: `compile` requires a directory argument\n')
    process.stderr.write('usage: unipress compile <dir> [--format <fmt>] [--foundation <ref>] [--out <path>] [--verbose]\n')
    process.exit(1)
  }

  const onProgress = verbose
    ? (msg) => process.stderr.write(`[compile] ${msg}\n`)
    : () => {}

  const result = await compile({
    dir,
    format,
    foundationRef: foundation,
    outPath: out,
    onProgress
  })

  process.stdout.write(
    `wrote ${result.outPath} (${result.bytes} bytes, ${result.format}, ${result.blockCount} blocks across ${result.pageCount} pages)\n`
  )
}
