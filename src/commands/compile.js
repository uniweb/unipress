// `unipress compile <dir>` — CLI adapter for src/compile.js.
//
// Writes verbose progress to stderr so stdout stays clean for the
// single success summary line.
//
// Before compiling, if the directory has no document.yml/site.yml but
// does hold markdown, offer to generate a document.yml (the
// offer-to-materialize flow). The generation itself lives in
// src/materialize.js; the prompt is here because it's a CLI concern —
// the library entry (src/compile.js) stays non-interactive.

import { existsSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import prompts from 'prompts'
import { compile } from '../compile.js'
import { detectConfigFile, CONFIG_FILE_NAMES } from '../document-yml.js'
import { detectBareContent, materializeDocumentYml } from '../materialize.js'
import { findCatalogEntry } from '../catalog.js'
import { detectPaper, normalizePaper, PAPER_LABELS, PAPERS } from '../paper.js'

// `--variant book` → `book.yml`; `--variant print.yaml` → `print.yaml`.
// The name is used verbatim — no `document-` prefixing — with a `.yml`
// extension assumed when none is given. Returns null when unset.
export function variantToConfigFile(variant) {
  if (!variant) return null
  return /\.ya?ml$/i.test(variant) ? variant : `${variant}.yml`
}

// Bare-folder default: the book foundation's `article` genre — a clean
// single-column paper, the natural shape for a loose folder of markdown.
const DEFAULT_FOUNDATION = findCatalogEntry('article').foundation.ref

// "durable-structured-systems" → "Durable Structured Systems"
function titleize(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}

// When there's no config but markdown is present, offer to write a
// document.yml and continue. Returns true if a config now exists (so
// compile should proceed), false if the user declined.
async function offerToMaterialize({ sitePath, format, foundation, paper: flagPaper, yes }) {
  const bare = detectBareContent(sitePath)
  // No markdown anywhere — let compile() throw its normal, helpful
  // "no document.yml" error rather than inventing one.
  if (!bare) return true

  const foundationRef = foundation ?? DEFAULT_FOUNDATION
  const fmt = format ?? 'pdf'
  const defaultTitle = titleize(basename(sitePath)) || 'Untitled document'
  const n = bare.chapters.length
  const filesLabel = `${n} markdown file${n === 1 ? '' : 's'}`
  const where = bare.contentDir === '.' ? 'at the project root' : `in ${bare.contentDir}/`
  // The file states its paper from here on, so this is the one moment the machine's region
  // answers (`paper.js`). A foundation unipress does not ship gets none it did not ask for.
  const isDefault = foundationRef === DEFAULT_FOUNDATION
  const detected = detectPaper()
  let paper = flagPaper ?? (isDefault ? detected.paper : null)
  // The default book foundation materializes the single-column article
  // genre; a custom --foundation is named as-is.
  const genreLabel = isDefault ? 'article' : foundationRef
  let title = defaultTitle

  if (!yes) {
    // Don't hang on a prompt (or silently create files) without a TTY.
    // Nudge toward --yes and let compile() throw the normal error.
    if (!process.stdin.isTTY) {
      process.stderr.write(
        `note: no ${CONFIG_FILE_NAMES.PRIMARY} found, but ${n} markdown file(s) are ${where}.\n` +
        `      re-run with --yes to generate one, or add ${CONFIG_FILE_NAMES.PRIMARY} by hand.\n`
      )
      return true
    }
    const answers = await prompts([
      {
        type: 'confirm',
        name: 'create',
        message:
          `No ${CONFIG_FILE_NAMES.PRIMARY} here. Generate one ` +
          `(${genreLabel}, ${fmt}) from the ${filesLabel} ${where} and compile?`,
        initial: true
      },
      {
        type: (prev) => (prev ? 'text' : null),
        name: 'title',
        message: 'Document title',
        initial: defaultTitle
      },
      {
        type: (prev, values) => (values.create && isDefault && !flagPaper ? 'select' : null),
        name: 'paper',
        message: 'Page size',
        choices: PAPERS.map((p) => ({ title: PAPER_LABELS[p], value: p })),
        initial: PAPERS.indexOf(detected.paper)
      }
    ])
    if (!answers.create) {
      process.stderr.write(`aborted — no ${CONFIG_FILE_NAMES.PRIMARY} created.\n`)
      return false
    }
    title = answers.title || defaultTitle
    paper = answers.paper ?? paper
  }

  const { path } = materializeDocumentYml({
    sitePath,
    name: title,
    foundationRef,
    format: fmt,
    contentDir: bare.contentDir,
    chapters: bare.chapters,
    paper
  })
  process.stderr.write(`created ${path}\n`)
  // Unasked, say what was decided: `--yes` is how an agent runs this, and a page size is the
  // first thing a person checks in the result.
  if (yes && paper && !flagPaper) {
    const other = PAPERS.find((p) => p !== paper)
    const why = detected.region ? `the paper of this system's region (${detected.region})` : 'the default, with no region to go by'
    process.stderr.write(
      `      paper: ${paper}, ${why}. To print on ${PAPER_LABELS[other]}: --paper ${other}, or change it in ${CONFIG_FILE_NAMES.PRIMARY}.\n`
    )
  }
  return true
}

export async function compileCommand({ dir, format = null, foundation = null, out = null, config = null, variant = null, typstBinary = null, keepTemp = false, paper = null, yes = false, verbose = false } = {}) {
  if (!dir) {
    process.stderr.write('error: `compile` requires a directory argument\n')
    process.stderr.write('usage: unipress compile <dir> [--format <fmt>] [--foundation <ref>] [--out <path>] [--paper <a4|letter>] [--config <path>] [--typst-binary <path>] [--keep-temp] [--yes] [--verbose]\n')
    process.exit(1)
  }

  const flagPaper = normalizePaper(paper, '--paper')
  const sitePath = resolve(dir)
  // `--variant <name>` names an explicit config; don't offer to generate
  // one (loadContent throws a clear error if the named file is missing).
  if (!variant && existsSync(sitePath) && !detectConfigFile(sitePath)) {
    const proceed = await offerToMaterialize({ sitePath, format, foundation, paper: flagPaper, yes })
    if (!proceed) process.exit(1)
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
    documentConfig: variantToConfigFile(variant),
    typstBinaryPath: typstBinary,
    keepTemp,
    paper: flagPaper,
    onProgress
  })

  for (const note of result.notes ?? []) process.stderr.write(`note: ${note}\n`)

  const pressFormatNote =
    result.pressFormat && result.pressFormat !== result.format
      ? ` via ${result.pressFormat}`
      : ''
  process.stdout.write(
    `wrote ${result.outPath} (${result.bytes} bytes, ${result.format}${pressFormatNote}, ${result.pageCount} pages)\n`
  )
}
