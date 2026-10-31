/**
 * Per-format adapter-options builders for the academic-metrics foundation's
 * declared outputs. These are referenced by outputs[format].getOptions in
 * main.js and used by:
 *
 *   - DownloadBar (browser, in-page) via compileDocument(website, {...})
 *   - unipress compile (Node, headless) via the same compileDocument path
 *
 * Per-section xlsx / docx registrations (sheets, tables, paragraphs) still
 * live inside the sections themselves via useDocumentOutput. These builders
 * only assemble document-level adapter options (workbook metadata, paragraph
 * style packs) — the things hosts need to pass through but don't want to
 * own per-host.
 */
import { pageSizes } from '@uniweb/press/docx'

// The page a document prints on: a `paper` the host names for this build
// (`unipress compile --paper`), then the document's own `paper:`. Unnamed, the
// docx adapter's default stands (A4) and a workbook leaves it to the printer.
function paperOf(website, hostHints = {}) {
  return hostHints.paper ?? website?.config?.paper ?? undefined
}

const WORD_PAGE = { a4: pageSizes.A4, letter: pageSizes.LETTER }

/**
 * Word paragraph style pack used by the docx adapter so PublicationsList
 * entries render with a hanging-indent bibliography style. Lifted from
 * DownloadBar (which held this inline pre-outputs: retrofit).
 */
const DOCX_PARAGRAPH_STYLES = [
  {
    id: 'bibliography',
    name: 'Bibliography',
    basedOn: 'Normal',
    next: 'Normal',
    quickFormat: true,
    run: { size: 22 }, // 11pt
    paragraph: {
      indent: { left: 720, hanging: 720 }, // 0.5" hanging
      spacing: { before: 0, after: 120 },
    },
  },
]

function buildMeta(website, hostHints = {}) {
  return {
    title: hostHints.title ?? website?.config?.name ?? 'Academic Metrics',
    creator: hostHints.creator ?? 'Uniweb',
    subject: hostHints.subject ?? 'Academic metrics report',
  }
}

export function buildXlsxOptions(website, hostHints = {}) {
  const paper = paperOf(website, hostHints)
  return {
    adapterOptions: {
      ...buildMeta(website, hostHints),
      ...(paper ? { paper } : {}),
    },
  }
}

export function buildDocxOptions(website, hostHints = {}) {
  const paper = paperOf(website, hostHints)
  return {
    adapterOptions: {
      ...buildMeta(website, hostHints),
      ...(paper ? { pageSize: WORD_PAGE[paper] } : {}),
      paragraphStyles: hostHints.paragraphStyles ?? DOCX_PARAGRAPH_STYLES,
      loadAsset: hostHints.loadAsset,
    },
  }
}
