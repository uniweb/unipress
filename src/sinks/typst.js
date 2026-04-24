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
import { dirname, join } from 'node:path'
import { TypstBinaryError, OutputWriteError } from '../errors.js'
import { resolveTypstBinary } from '../typst/binary-manager.js'

export async function writePdfViaTypst(blob, outPath, { typstBinaryPath = null, typstVersion = null, keepTemp = false, onProgress = () => {} } = {}) {
  const bytes = Buffer.from(await blob.arrayBuffer())

  const workDir = await mkdtemp(join(tmpdir(), 'unipress-typst-'))
  onProgress(`temp dir: ${workDir}`)

  let succeeded = false
  try {
    const archivePath = join(workDir, 'source.zip')
    await writeFile(archivePath, bytes)

    onProgress('extracting source bundle...')
    await runCapture('tar', ['-xf', archivePath, '-C', workDir])
    await rm(archivePath, { force: true })

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
    await runCapture(binary, ['compile', mainTyp, outPath], {
      onFail: (code, stderr) => new TypstBinaryError(
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
    return { outPath, bytes: outStat.size }
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
