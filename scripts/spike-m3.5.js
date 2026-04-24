#!/usr/bin/env node
/**
 * M3.5 spike: prove the full pipeline produces bytes.
 *
 * Hardcoded path: framework-book site + @proximify/press-book foundation
 * → typst Blob → file on disk. typst is the only format any workspace
 * foundation registers for via useDocumentOutput, so it's the format
 * that actually exercises the registration walk.
 *
 * What this validates that nothing in M2/M3a/M3b validated:
 *   - foundation components, when mounted via Press, actually register
 *     fragments via useDocumentOutput
 *   - the React-instance situation between unipress, runtime/ssr,
 *     foundation module, and Press doesn't trigger "Invalid hook call"
 *     (gotcha #2)
 *   - compileSubtree returns a non-trivial Blob given a real tree
 *
 * What this DOESN'T validate:
 *   - the typst binary actually compiles the bundle into a PDF
 *     (separate concern; M7-M8)
 *   - format adapters other than typst (no foundation registers for
 *     docx or xlsx in this workspace yet)
 *
 * To delete after M4 lands. Not part of the published package.
 */

import { writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { loadContent } from '../src/content-loader.js'
import { resolveFoundation } from '../src/foundation-loader.js'
import { loadAndInit, compileWithFoundation } from '../src/orchestrator.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE = '/Users/dmac/Proximify/uniweb/projects/sites/framework-book'
const OUT_DIR = resolve(__dirname, '../tmp')
const FORMAT = 'typst'

const log = (step, msg) => console.log(`[${step}]`, msg)

async function main() {
  log('1', 'loading content...')
  const { content, sitePath } = await loadContent(SITE)
  log('1', `  ${content.pages.length} pages from ${sitePath}`)

  log('2', 'resolving foundation...')
  const foundationInfo = await resolveFoundation({
    configRef: content.config?.foundation,
    anchorDir: sitePath
  })
  log('2', `  ${foundationInfo.ref} → ${foundationInfo.resolvedPath}`)

  log('3', 'orchestrating (import + initPrerender)...')
  const { foundation, uniweb } = await loadAndInit({
    content,
    resolvedPath: foundationInfo.resolvedPath
  })
  const website = uniweb.activeWebsite
  log('3', `  pages: ${website.pages.length}, activePage: ${website.activePage?.route}`)

  log('4', 'building React tree from all pages...')
  // Mount every page's blocks into a single React fragment. Real
  // compile must do this anyway (the document includes every page).
  // The renderer initPrerender installed on globalThis.uniweb is
  // equivalent to <ChildBlocks blocks={blocks}/> from @uniweb/kit
  // without needing a JSX loader for kit's raw source.
  const renderer = globalThis.uniweb.childBlockRenderer
  const allBlocks = []
  const blockSummary = []
  for (const p of website.pages) {
    for (const b of (p.bodyBlocks ?? [])) {
      allBlocks.push(b)
      blockSummary.push(`${b.type}@${p.route}`)
    }
  }
  log('4', `  ${allBlocks.length} block(s) across ${website.pages.length} page(s)`)
  log('4', `  types: ${[...new Set(allBlocks.map(b => b.type))].join(', ')}`)
  const tree = renderer({ blocks: allBlocks })

  log('5', `compiling to ${FORMAT} via foundation.compileSubtree...`)
  const blob = await compileWithFoundation(foundation, tree, FORMAT, {})
  log('5', `  blob: ${blob.size} bytes, type=${blob.type || '(none)'}`)

  log('6', 'writing to disk...')
  const ext = FORMAT === 'typst' ? 'zip' : FORMAT
  const out = resolve(OUT_DIR, `spike-out.${ext}`)
  const buf = Buffer.from(await blob.arrayBuffer())
  await writeFile(out, buf)
  log('6', `  wrote ${out}`)

  // For typst (a source bundle), peek at the contents.
  if (FORMAT === 'typst') {
    log('7', 'inspecting source bundle...')
    const sig = buf.subarray(0, 4).toString('hex')
    log('7', `  first 4 bytes: ${sig} (PK header is 504b0304)`)
  }

  console.log('\nSPIKE OK')
  process.exit(0)
}

main().catch(err => {
  console.error('\nSPIKE FAILED:', err.message)
  console.error(err.stack)
  process.exit(1)
})
