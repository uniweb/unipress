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
import { detectBareContent } from './materialize.js'
import { resolveFoundation } from './foundation-loader.js'
import { loadAndInit, compileDocumentWithFoundation, getFoundationOutputs } from './orchestrator.js'
import { loadUnipressConfig } from './config.js'
import { writeBlobToFile } from './sinks/blob.js'
import { writePdfViaTypst } from './sinks/typst.js'
import { DocumentYmlError, CompileError } from './errors.js'
import { checkPaper, normalizePaper } from './paper.js'
import { checkOutPathFormat, formatOfOutPath } from './output-format.js'

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
  documentConfig = null,
  paper: cliPaper = null,
  onProgress = () => {}
} = {}) {
  onProgress('loading content...')
  const { content, sitePath, configFile } = await loadContent(dir, {
    configFile: documentConfig,
    onProgress: (msg) => onProgress(`  ${msg}`)
  })
  onProgress(`  ${content.pages.length} page(s) from ${sitePath} (${configFile})`)

  // A config exists but nothing was collected — almost always the markdown
  // sits in a directory the profile didn't look in (e.g. loose at the root
  // while the document profile scans content/). Fail loudly with the fix
  // rather than silently emitting an empty document.
  if (content.pages.length === 0) {
    const bare = detectBareContent(sitePath)
    const hint = bare
      ? bare.contentDir === '.'
        ? `found ${bare.chapters.length} markdown file(s) at the project root — add 'paths: { pages: . }' to ${configFile}`
        : `found markdown in ${bare.contentDir}/ — add 'paths: { pages: ${bare.contentDir} }' to ${configFile}`
      : `no markdown files found — check the content directory and ${configFile}`
    throw new DocumentYmlError(
      `${configFile} has no pages — nothing to compile.\nhint: ${hint}`
    )
  }

  // Load unipress.config.js — from --config, then <dir>/unipress.config.js,
  // else empty. Relative paths inside the config are resolved against the
  // config file's own directory (see src/config.js).
  const { config, configPath } = await loadUnipressConfig({
    contentDir: sitePath,
    explicitPath: cliConfigPath
  })
  if (configPath) onProgress(`  config: ${configPath}`)

  // Precedence chain: CLI > unipress.config.js > document.yml > defaults. A flag or setting that
  // names a file names its format too, at that level: `--out o.pdf` is a request for a PDF.
  const format =
    cliFormat ??
    formatOfOutPath(cliOutPath) ??
    config.format ??
    formatOfOutPath(config.out) ??
    content.config?.format ??
    null
  if (!format) {
    const hints = ['pass --format <fmt>']
    if (configPath) hints.push(`set format: in ${configPath}`)
    hints.push(`set format: in ${configFile}`)
    throw new DocumentYmlError(
      `no format specified — ${hints.join(' or ')}`
    )
  }
  checkOutPathFormat(cliOutPath ?? config.out, format)

  const foundationRef = cliFoundationRef ?? config.foundation ?? null
  const typstBinaryPath = cliTypstBinaryPath ?? config.typst?.binary ?? null
  const typstVersion = config.typst?.version ?? null

  // The paper. An override (--paper, unipress.config.js) reaches the foundation as a host hint,
  // for this build and over the document's own settings; the document's `paper:` is the
  // foundation's to read from `website.config`, after a `book.trim` beside it. Normalized here,
  // so a foundation reads one spelling.
  const paperOverride = cliPaper != null
    ? normalizePaper(cliPaper, '--paper')
    : normalizePaper(config.paper, configPath ?? 'unipress.config.js')
  const documentPaper = normalizePaper(content.config?.paper, configFile)
  if (documentPaper) content.config.paper = documentPaper

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
      `See https://github.com/uniweb/docs/blob/main/reference/foundation-config.md#document-outputs`
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

  const notes = checkPaper({
    outputSpec,
    format,
    paper: paperOverride ?? documentPaper,
    override: Boolean(paperOverride),
    foundationRef: foundationInfo.ref,
    configFile
  })

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
  // typst sink can then compile locally. A paper named for this build goes
  // to every format that takes one.
  const hostHints = {
    ...(format === 'pdf' ? { mode: 'sources' } : {}),
    ...(paperOverride && outputSpec.paper ? { paper: paperOverride } : {})
  }

  onProgress(`compiling to ${format}${outputSpec.via ? ` (via ${outputSpec.via})` : ''}...`)
  const blob = await compileDocumentWithFoundation(foundation, website, {
    format,
    sitePath,
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
    foundation: foundationInfo,
    notes: [...notes, ...(result.warnings ?? [])]
  }
}
