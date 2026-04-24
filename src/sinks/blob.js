// Write a compileSubtree Blob to the local filesystem.
//
// Today all Press format adapters (docx, xlsx, typst source bundle) return
// a single Blob. Writing it to disk is one line of glue — the sink lives
// in its own module because the four-step compile pattern (gather → tree
// → compile → sink) keeps the sink decoupled, and future hosts (HTTP
// response, blob storage) slot in here as siblings.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { OutputWriteError } from '../errors.js'

export async function writeBlobToFile(blob, outPath) {
  const buf = Buffer.from(await blob.arrayBuffer())
  try {
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, buf)
  } catch (err) {
    throw new OutputWriteError(
      `failed to write output to ${outPath}\n` +
      `cause: ${err.message}`
    )
  }
  return { outPath, bytes: buf.length }
}
