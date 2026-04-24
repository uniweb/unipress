// Programmatic entry point for `unipress compile`.
//
// Two-step pipeline after content + foundation setup:
//
//   1. Load content, resolve the foundation, run initPrerender to
//      populate the Website graph. (loadContent + resolveFoundation +
//      loadAndInit — unchanged from M4.)
//   2. Call foundation.compileDocument(website, { format, foundation,
//      ...hostHints }) — the foundation looks up outputs[format],
//      assembles adapter options, gathers blocks, and routes through
//      the right Press adapter. Returns a Blob.
//   3. Sink the Blob. Pdf output runs the typst binary on the source
//      bundle; everything else writes bytes directly.
//
// Block gathering, tree building, and adapter-options assembly used to
// live here (M4–M8a). As of M8a they live inside compileDocument on the
// Press side, keyed off the foundation's `outputs:` declaration. This
// module used to maintain PRESS_FORMAT_BY_OUTPUT and EXT_BY_FORMAT
// tables for the `pdf` → `typst` aliasing and the default filename
// extension — both are gone. Foundations declare their own aliasing via
// `outputs[format].via` and default extensions via
// `outputs[format].extension`.
//
// Progress is fanned out through a single `onProgress` callback so
// verbose output is consistent across the pipeline (load, resolve,
// init, compile, sink).

import { basename, resolve } from 'node:path'
import { loadContent } from './content-loader.js'
import { resolveFoundation } from './foundation-loader.js'
import { loadAndInit, compileDocumentWithFoundation, getFoundationOutputs } from './orchestrator.js'
import { loadUnipressConfig } from './config.js'
import { writeBlobToFile } from './sinks/blob.js'
import { writePdfViaTypst } from './sinks/typst.js'
import { DocumentYmlError, CompileError } from './errors.js'

// Sink selection. `pdf` is special-cased because the Press output (via
// the typst adapter) is a source-bundle zip, not a PDF — unipress
// finishes the job by running the typst binary. Every other format is a
// direct byte write.
function pickSink(format) {
  if (format === 'pdf') return 'typst'
  return 'blob'
}

export async function compile({
  dir,
  format: cliFormat = null,
  foundationRef: cliFoundationRef = null,
  outPath: cliOutPath = null,
  typstBinaryPath: cliTypstBinaryPath = null,
  keepTemp = false,
  configPath: cliConfigPath = null,
  onProgress = () => {}
} = {}) {
  onProgress('loading content...')
  const { content, sitePath, configFile } = await loadContent(dir)
  onProgress(`  ${content.pages.length} page(s) from ${sitePath} (${configFile})`)

  // Load unipress.config.js — from --config, then <dir>/unipress.config.js,
  // else empty. Relative paths inside the config are resolved against the
  // config file's own directory (see src/config.js).
  const { config, configPath } = await loadUnipressConfig({
    contentDir: sitePath,
    explicitPath: cliConfigPath
  })
  if (configPath) onProgress(`  config: ${configPath}`)

  // Precedence chain: CLI > unipress.config.js > document.yml > defaults.
  const format = cliFormat ?? config.format ?? content.config?.format ?? null
  if (!format) {
    const hints = ['pass --format <fmt>']
    if (configPath) hints.push(`set format: in ${configPath}`)
    hints.push(`set format: in ${configFile}`)
    throw new DocumentYmlError(
      `no format specified — ${hints.join(' or ')}`
    )
  }

  const foundationRef = cliFoundationRef ?? config.foundation ?? null
  const typstBinaryPath = cliTypstBinaryPath ?? config.typst?.binary ?? null
  const typstVersion = config.typst?.version ?? null

  onProgress('resolving foundation...')
  const foundationInfo = await resolveFoundation({
    // Already merged CLI + config.foundation above; document.yml foundation
    // is the fallback.
    cliRef: foundationRef,
    configRef: content.config?.foundation,
    anchorDir: sitePath
  })
  onProgress(`  ${foundationInfo.ref} → ${foundationInfo.resolvedPath}`)

  onProgress('initializing foundation...')
  const { foundation, uniweb } = await loadAndInit({
    content,
    resolvedPath: foundationInfo.resolvedPath,
    onProgress: (msg) => onProgress(`  ${msg}`)
  })
  const website = uniweb.activeWebsite

  // Validate the format early so users get a helpful "declared outputs:
  // …" message before anything downstream fails. Press's compileDocument
  // would throw an equivalent error — we front-load it so the error
  // class is the one unipress uses for CLI output.
  const outputs = getFoundationOutputs(foundation)
  if (!outputs) {
    throw new CompileError(
      `foundation declares no outputs — cannot compile.\n` +
      `hint: foundation's default export must include an outputs: { … } map. ` +
      `See framework/docs/reference/foundation-config.md#document-outputs.`
    )
  }
  const outputSpec = outputs[format]
  if (!outputSpec) {
    const declared = Object.keys(outputs).join(', ') || '(none)'
    throw new CompileError(
      `foundation does not declare 'outputs.${format}' — cannot compile.\n` +
      `available formats: ${declared}`
    )
  }

  // Default output filename: `./<dir-basename>.<ext>`. The foundation
  // declares the extension; fall back to the format name if it didn't.
  // Precedence: CLI --out > config.out > default.
  const ext = outputSpec.extension ?? format
  const outPath = cliOutPath ?? config.out ?? null
  const finalOutPath = outPath
    ? resolve(outPath)
    : resolve(`./${basename(sitePath)}.${ext}`)

  // Host hints for the foundation's getOptions. For pdf, pass
  // mode: 'sources' so the foundation returns a typst source bundle the
  // typst sink can then compile locally. Other formats receive no
  // extra hints for now — foundations decide their own defaults.
  const hostHints = format === 'pdf' ? { mode: 'sources' } : {}

  onProgress(`compiling to ${format}${outputSpec.via ? ` (via ${outputSpec.via})` : ''}...`)
  const blob = await compileDocumentWithFoundation(foundation, website, {
    format,
    ...hostHints
  })
  onProgress(`  blob: ${blob.size} bytes, type=${blob.type || '(none)'}`)

  onProgress(`writing ${finalOutPath}...`)
  const sink = pickSink(format)
  const result = sink === 'typst'
    ? await writePdfViaTypst(blob, finalOutPath, {
        typstBinaryPath,
        typstVersion,
        keepTemp,
        onProgress: (msg) => onProgress(`  ${msg}`)
      })
    : await writeBlobToFile(blob, finalOutPath)
  onProgress(`  wrote ${result.bytes} bytes`)

  return {
    outPath: result.outPath,
    bytes: result.bytes,
    format,
    pressFormat: outputSpec.via ?? format,
    pageCount: website.pages.length,
    foundation: foundationInfo
  }
}
