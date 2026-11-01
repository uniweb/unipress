// Typst → PDF sink.
//
// The foundation's compileSubtree returns a Typst source bundle (a zip
// of main.typ, preamble.typ, template.typ, meta.typ, content.typ, and
// assets/). The `typst` CLI has no mode that reads a zip directly, so we
// extract into a temp dir, spawn `typst compile <tempdir>/main.typ
// <outPath>`, and clean up.
//
// On success: temp dir is removed. On failure: temp dir is kept iff
// keepTemp — so the user can open main.typ and reproduce the typst
// error themselves. Path is surfaced in the thrown error so they know
// where to look.

import { spawn } from 'node:child_process'
import { mkdtemp, mkdir, rm, writeFile, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, relative } from 'node:path'
import { TypstBinaryError, OutputWriteError } from '../errors.js'
import { resolveTypstBinary } from '../typst/binary-manager.js'
import { unzip } from '../unzip.js'

// The failure an author meets most: the markdown names an image that is not there. Typst reports
// the path it searched, in a temp folder of ours, which says nothing about the author's file. The
// name as written in the document is the path's tail under that folder.
function describeMissingFile(stderr, workDir) {
  const searched = /file not found \(searched at ([^)\n]+)\)/.exec(stderr ?? '')?.[1]
  if (!searched) return null
  const named = relative(workDir, searched)
  // A path that leaves the folder, or under a realpath'd temp, keeps only its file name.
  const name = named.startsWith('..') ? searched.split(/[\\/]/).pop() : named
  return (
    `the document names a file that is not there: ${name}\n` +
    `hint: check the path in your markdown, or in document.yml for a cover`
  )
}

// A font this machine doesn't have is the one thing Typst only warns about that changes the book:
// one folder then prints differently on another machine. It names each family it tried and skipped,
// and a document's font list may hold several on purpose, so this says what to expect and not that
// anything failed.
export function fontWarnings(stderr) {
  const families = [...new Set(
    [...(stderr ?? '').matchAll(/^warning: unknown font family: (.+)$/gm)].map((m) => m[1].trim())
  )]
  if (!families.length) return []
  return [
    `this machine doesn't have the font${families.length > 1 ? 's' : ''} ${families.join(', ')}. ` +
    `Typst used the next one it could find, so this PDF can differ on a machine that has ${families.length > 1 ? 'them' : 'it'}. ` +
    `\`typst fonts\` lists what's installed.`
  ]
}

export async function writePdfViaTypst(blob, outPath, { typstBinaryPath = null, typstVersion = null, keepTemp = false, fontPaths = [], onProgress = () => {} } = {}) {
  const bytes = Buffer.from(await blob.arrayBuffer())

  const workDir = await mkdtemp(join(tmpdir(), 'unipress-typst-'))
  onProgress(`temp dir: ${workDir}`)

  let succeeded = false
  try {
    onProgress('extracting source bundle...')
    await unzip(bytes, workDir).catch((err) => {
      throw new TypstBinaryError(`can't unpack the foundation's typst source bundle\ncause: ${err.message}`)
    })

    const mainTyp = join(workDir, 'main.typ')
    const mainStat = await statOrNull(mainTyp)
    if (!mainStat) {
      throw new TypstBinaryError(
        `typst source bundle has no main.typ — extracted to ${workDir}`
      )
    }

    const binary = await resolveTypstBinary({
      overridePath: typstBinaryPath,
      ...(typstVersion ? { version: typstVersion } : {}),
      onProgress
    })

    await mkdir(dirname(outPath), { recursive: true })

    onProgress(`running typst compile...`)
    const { stderr } = await runCapture(binary, ['compile', mainTyp, outPath, ...fontPaths.flatMap((dir) => ['--font-path', dir])], {
      onFail: (code, stderr) => new TypstBinaryError(
        describeMissingFile(stderr, workDir) ??
        `typst exited with code ${code}${keepTemp ? ` (temp dir kept at ${workDir})` : ''}\n` +
        (stderr ? `--- typst stderr ---\n${stderr.trim()}\n` : '') +
        (keepTemp ? '' : 'hint: pass --keep-temp to inspect the source bundle\n')
      )
    })

    const outStat = await statOrNull(outPath)
    if (!outStat) {
      throw new OutputWriteError(
        `typst compile succeeded but no file at ${outPath}`
      )
    }
    succeeded = true
    onProgress(`  wrote ${outStat.size} bytes`)
    return { outPath, bytes: outStat.size, warnings: fontWarnings(stderr) }
  } finally {
    if (succeeded || !keepTemp) {
      await rm(workDir, { recursive: true, force: true })
    }
  }
}

async function statOrNull(path) {
  try {
    return await stat(path)
  } catch {
    return null
  }
}

function runCapture(cmd, args, { onFail } = {}) {
  return new Promise((resolvePromise, reject) => {
    const proc = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    proc.stdout.on('data', c => { stdout += c.toString() })
    proc.stderr.on('data', c => { stderr += c.toString() })
    proc.on('error', err => reject(err))
    proc.on('close', code => {
      if (code === 0) resolvePromise({ stdout, stderr })
      else {
        if (onFail) reject(onFail(code, stderr))
        else reject(new Error(`\`${cmd}\` exited with code ${code}${stderr ? `: ${stderr.trim()}` : ''}`))
      }
    })
  })
}
