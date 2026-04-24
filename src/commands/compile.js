// `unipress compile <dir>` — CLI adapter for src/compile.js.
//
// Writes verbose progress to stderr so stdout stays clean for the
// single success summary line.

import { compile } from '../compile.js'

export async function compileCommand({ dir, format = null, foundation = null, out = null, config = null, typstBinary = null, keepTemp = false, verbose = false } = {}) {
  if (!dir) {
    process.stderr.write('error: `compile` requires a directory argument\n')
    process.stderr.write('usage: unipress compile <dir> [--format <fmt>] [--foundation <ref>] [--out <path>] [--config <path>] [--typst-binary <path>] [--keep-temp] [--verbose]\n')
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
    configPath: config,
    typstBinaryPath: typstBinary,
    keepTemp,
    onProgress
  })

  const pressFormatNote =
    result.pressFormat && result.pressFormat !== result.format
      ? ` via ${result.pressFormat}`
      : ''
  process.stdout.write(
    `wrote ${result.outPath} (${result.bytes} bytes, ${result.format}${pressFormatNote}, ${result.pageCount} pages)\n`
  )
}
