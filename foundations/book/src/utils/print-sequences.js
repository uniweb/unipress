/**
 * A section's sequence as each print path prints it.
 *
 * Press's `Sequence` reads each element's text as a flat string, and it knows nothing of a
 * citation or a cross-reference. So those are substituted first: as text for Typst, which has no
 * citation engine downstream, and as `\cite` and `\autoref` for LaTeX, where biblatex formats them
 * alongside the bibliography. Footnotes go to their marks last, so a note can hold a citation.
 *
 * Every section that prints prose reads it from here. Doing this in `Chapter` alone is how a
 * citation in a theorem or an appendix printed nothing.
 */
import * as apa from 'citestyle/styles/apa'
import * as mla from 'citestyle/styles/mla'
import * as chicagoAuthorDate from 'citestyle/styles/chicago-author-date'
import * as ieee from 'citestyle/styles/ieee'
import * as vancouver from 'citestyle/styles/vancouver'
import * as harvard from 'citestyle/styles/harvard'
import * as ama from 'citestyle/styles/ama'
import * as nature from 'citestyle/styles/nature'
import * as science from 'citestyle/styles/science'
import { resolveInlineInsets } from './resolve-inline-insets.js'
import { formatInlineInsetAsLatex, formatInlineInsetAsText } from './cite-format.js'
import { printFootnotes } from './footnotes.jsx'

const STYLES = {
  apa,
  mla,
  'chicago-author-date': chicagoAuthorDate,
  ieee,
  vancouver,
  harvard,
  ama,
  nature,
  science,
}
const DEFAULT_STYLE = 'chicago-author-date'

/**
 * @param {Array} sequence - `content.sequence`
 * @param {object} block
 * @returns {{ typst: Array, latex: Array }}
 */
export function printSequences(sequence, block) {
  const website = block?.website
  const style = STYLES[website?.config?.book?.citationStyle] || STYLES[DEFAULT_STYLE]
  const substitute = (format) => printFootnotes(resolveInlineInsets(sequence || [], block, format))
  return {
    typst: substitute((inset) => formatInlineInsetAsText(inset, website, style)),
    latex: substitute((inset) => formatInlineInsetAsLatex(inset, website)),
  }
}
