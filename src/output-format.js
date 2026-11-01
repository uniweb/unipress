// What `--out` says about the format.
//
// A template's default format need not be PDF: `directory` writes a spreadsheet, `thesis` a LaTeX
// bundle. So `compile . --out o.pdf` once wrote a spreadsheet called o.pdf and exited 0. A file name
// that can only be one thing now picks that format when nothing names one, and stops the build when
// something names another. `.zip` isn't here: both source bundles are one.

import { extname } from 'node:path'
import { DocumentYmlError } from './errors.js'

const FORMAT_OF_EXTENSION = {
  '.pdf': 'pdf',
  '.epub': 'epub',
  '.docx': 'docx',
  '.xlsx': 'xlsx',
  '.html': 'pagedjs',
}

/** The one format a file of this name can be, or null when the name doesn't say. */
export function formatOfOutPath(path) {
  if (typeof path !== 'string') return null
  return FORMAT_OF_EXTENSION[extname(path).toLowerCase()] ?? null
}

/** Stops a build whose format isn't what its file name says it is. */
export function checkOutPathFormat(path, format) {
  const named = formatOfOutPath(path)
  if (!named || named === format) return
  throw new DocumentYmlError(
    `this build writes ${format}, and --out names a ${extname(path)} file\n` +
    `hint: change the file name, or build it with --format ${named}`
  )
}
