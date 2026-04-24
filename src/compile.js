// Programmatic entry point for `unipress compile`.
//
// Runs the four-step compile pattern (framework/press/docs/guides/compile-pattern.md)
// against a content directory:
//
//   1. gather blocks .... load content, resolve + init the foundation, collect
//                         every page's bodyBlocks into one flat list.
//   2. build React tree . globalThis.uniweb.childBlockRenderer({ blocks })
//                         (SSR-safe equivalent of <ChildBlocks> from @uniweb/kit,
//                         installed by initPrerender — no JSX loader needed).
//   3. compile .......... foundation.compileSubtree(tree, format, options).
//                         Reached via the foundation, NOT imported from
//                         @uniweb/press — see kb/framework/plans/unipress-framing.md
//                         §23 #3 (dual-Press-instance trap).
//   4. sink ............. write the returned Blob to disk.
//
// Progress is fanned out through a single `onProgress` callback so verbose
// output is consistent across the pipeline (load, resolve, init, gather,
// compile, sink).

import { basename, resolve } from 'node:path'
import { loadContent } from './content-loader.js'
import { resolveFoundation } from './foundation-loader.js'
import { loadAndInit, compileWithFoundation } from './orchestrator.js'
import { writeBlobToFile } from './sinks/blob.js'
import { DocumentYmlError } from './errors.js'

// Typst compiles to a source bundle zip on disk today; the Typst→PDF sink
// (M8) will change the default extension for that format.
const EXT_BY_FORMAT = {
  typst: 'zip'
}

export async function compile({ dir, format: cliFormat = null, foundationRef = null, outPath = null, onProgress = () => {} } = {}) {
  onProgress('loading content...')
  const { content, sitePath, configFile } = await loadContent(dir)
  onProgress(`  ${content.pages.length} page(s) from ${sitePath} (${configFile})`)

  const format = cliFormat ?? content.config?.format ?? null
  if (!format) {
    throw new DocumentYmlError(
      `no format specified — pass --format <fmt> or set format: in ${configFile}`
    )
  }

  const finalOutPath = outPath
    ? resolve(outPath)
    : resolve(`./${basename(sitePath)}.${EXT_BY_FORMAT[format] ?? format}`)

  onProgress('resolving foundation...')
  const foundationInfo = await resolveFoundation({
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

  onProgress('gathering blocks...')
  const allBlocks = website.pages.flatMap(p => p.bodyBlocks ?? [])
  onProgress(`  ${allBlocks.length} block(s) across ${website.pages.length} page(s)`)

  onProgress(`compiling to ${format}...`)
  const tree = globalThis.uniweb.childBlockRenderer({ blocks: allBlocks })
  const blob = await compileWithFoundation(foundation, tree, format, {})
  onProgress(`  blob: ${blob.size} bytes, type=${blob.type || '(none)'}`)

  onProgress(`writing ${finalOutPath}...`)
  const result = await writeBlobToFile(blob, finalOutPath)
  onProgress(`  wrote ${result.bytes} bytes`)

  return {
    outPath: result.outPath,
    bytes: result.bytes,
    format,
    blockCount: allBlocks.length,
    pageCount: website.pages.length,
    foundation: foundationInfo
  }
}
