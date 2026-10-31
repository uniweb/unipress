// The paper a document prints on.
//
// One setting for every template and every format that has pages: `paper: letter` in
// document.yml, `paper` in unipress.config.js, `--paper` for one build. The precedence is the
// usual one (CLI > unipress.config.js > document.yml). A foundation honors it and says so per
// output (`outputs.<format>.paper`), so a host can tell a page size it applied from one it did
// not.
//
// ⭐ A machine's region only answers while a document.yml is being WRITTEN: `create`, or the
// first compile of a bare folder. The file then states the paper, and from there on the same
// document prints the same on every machine. It never decides at compile time.

import { listCatalog } from './catalog.js'
import { CompileError, ConfigValidationError } from './errors.js'

export const PAPERS = ['a4', 'letter']

export const PAPER_LABELS = { a4: 'A4', letter: 'US Letter' }

// The territories that use US Letter: CLDR, supplementalData.xml, `paperSize` (read 2026-10-31).
// Every other territory uses A4.
const LETTER_REGIONS = new Set([
  'BZ', 'CA', 'CL', 'CO', 'CR', 'GT', 'MX', 'NI', 'PA', 'PH', 'PR', 'SV', 'US', 'VE',
])

/**
 * A paper's name as the rest of unipress reads it, or null when none is named.
 *
 * @param {unknown} value - as written: `letter`, `A4`
 * @param {string} where - who named it, for the refusal: `--paper`, `document.yml`
 * @returns {'a4'|'letter'|null}
 * @throws {ConfigValidationError} for anything else
 */
export function normalizePaper(value, where) {
  if (value === undefined || value === null || value === '') return null
  const name = typeof value === 'string' ? value.trim().toLowerCase() : value
  if (PAPERS.includes(name)) return name
  throw new ConfigValidationError(
    `${where}: ${value === true ? 'no paper named' : `"${value}" is not a paper`} — it is a4 or letter\n` +
    `hint: a book takes any other size as book.trim (docs/publishing/size-and-layout.md)`
  )
}

/** The region a locale tag names: `en_CA.UTF-8` and `en-CA` are `CA`; `C` and `es-419` name none. */
export function regionOf(tag) {
  const m = /^[A-Za-z]{2,3}(?:[-_][A-Za-z]{4})?[-_]([A-Za-z]{2})(?![A-Za-z0-9])/.exec(String(tag ?? ''))
  return m ? m[1].toUpperCase() : null
}

function systemLocale() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().locale
  } catch {
    return null
  }
}

/**
 * The paper this machine's region uses, for a document.yml being written.
 *
 * The POSIX variables come first, in their own order. Where one is set it is the answer, `C`
 * included: `Intl` reports `en-US` for a `C` locale, which is a default and says nothing about
 * where anyone is. `Intl` answers where none is set, as on Windows.
 *
 * @returns {{ paper: 'a4'|'letter', region: string|null }}
 */
export function detectPaper({ env = process.env, locale = systemLocale() } = {}) {
  const region = regionOf(env.LC_ALL || env.LC_PAPER || env.LANG || locale)
  return { paper: region && LETTER_REGIONS.has(region) ? 'letter' : 'a4', region }
}

// The version of a bundled foundation this unipress pins, for a document pinning an older one:
// `@unipress/book@0.4.3`, or its old name `@uniweb/book@0.4.2`, gives the catalog's
// `@unipress/book@<current>`. Null for any other foundation.
function currentPinFor(ref) {
  const bare = /^@[^/]+\/([^@/]+)@/.exec(String(ref ?? ''))?.[1]
  if (!bare) return null
  const entry = listCatalog().find((e) => e.foundation?.ref?.startsWith(`@unipress/${bare}@`))
  return entry?.foundation?.ref ?? null
}

/**
 * What a paper means for this output. A foundation says, per output: `true` honors it, `false` has
 * no pages to size, and absent says nothing, which is an older foundation or someone else's.
 *
 * Silence must not read as done. Asked for one build, `--paper` stops the build, since the file
 * would otherwise come out at the wrong size with a success message; stated in the document, it is
 * noted, since the document may be saying it for another format.
 *
 * @param {object} p
 * @param {{ paper?: boolean }} p.outputSpec - `outputs[format]`
 * @param {string} p.format
 * @param {string|null} p.paper - the paper named, by whoever named it
 * @param {boolean} p.override - named for this build, over the document
 * @param {string} p.foundationRef
 * @param {string} p.configFile
 * @returns {string[]} notes for the person running the build
 * @throws {CompileError} when a build asked for a paper this output may not take
 */
export function checkPaper({ outputSpec, format, paper, override, foundationRef, configFile }) {
  if (!paper || outputSpec.paper === true) return []
  if (outputSpec.paper === false) {
    return override ? [`${format} has no pages, so --paper does not change it`] : []
  }
  const pin = currentPinFor(foundationRef)
  const fix = pin
    ? `pin the version that takes it in ${configFile}: foundation: '${pin}'`
    : `set the page in the way this foundation documents`
  if (override) {
    throw new CompileError(
      `${foundationRef} does not say its ${format} output takes a paper, so --paper ${paper} might do nothing\n` +
      `hint: ${fix}`
    )
  }
  return [`${foundationRef} does not say its ${format} output takes a paper, so paper: ${paper} might do nothing — ${fix}`]
}
