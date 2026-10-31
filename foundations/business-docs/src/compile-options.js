/**
 * Per-format adapter-options builders for the business-docs foundation.
 *
 * Hosts (the in-page download button on the uniweb site template, the
 * `unipress compile` headless CLI) consume these via
 * compileDocument(website, { format, foundation, ...hostHints }).
 *
 * Per-section sheet / paragraph registrations still happen inside each
 * section via useDocumentOutput; these builders only assemble document-
 * level adapter options (workbook metadata, paragraph style packs,
 * Paged.js stylesheet) — the things hosts need but shouldn't own
 * per-host.
 */
import { pageSizes } from '@uniweb/press/docx'

// The page a document prints on, the same in every format: a `paper` the host
// names for this build (`unipress compile --paper`), then the document's own
// `paper:`, then Letter.
function paperOf(website, hostHints = {}) {
  return hostHints.paper ?? website?.config?.paper ?? 'letter'
}

const WORD_PAGE = { a4: pageSizes.A4, letter: pageSizes.LETTER }

// What a Word builder tree needs in order to read as a document on paper. The HTML a section
// registers is the tree it hands Word: `data-*` attributes on plain elements, which only the docx
// adapter reads. The roles and colors are the ones DEFAULT_BUSINESS_DOCS_TYPOGRAPHY gives Word.
const hex = (color) => `#${color}`
const fontStack = (name) => `${JSON.stringify(name)}, Carlito, ui-sans-serif, system-ui, sans-serif`

const printStylesheet = (paper, { colors, fonts }) => `
@page {
  size: ${paper === 'a4' ? 'A4' : 'letter'};
  margin: 1in 0.75in;
  @bottom-right { content: counter(page) " / " counter(pages); font-size: 9pt; color: #666; }
}
body { font-family: ${fontStack(fonts.body)}; font-size: 11pt; line-height: 1.3; color: ${hex(colors.body)}; }
[data-type="paragraph"] { margin: 0; }
[data-alignment="right"] { text-align: right; }
[data-paragraph-style="Title"] { font-family: ${fontStack(fonts.heading)}; font-size: 28pt; font-weight: 700; color: ${hex(colors.accent)}; margin-bottom: 12pt; }
[data-style="Label"] { font-size: 9pt; font-weight: 700; color: ${hex(colors.muted)}; text-transform: uppercase; letter-spacing: 0.02em; }
[data-style="Caption"] { font-size: 9pt; color: ${hex(colors.muted)}; }
[data-style="Display"] { font-size: 14pt; font-weight: 700; }
[data-style="BodyStrong"] { font-weight: 700; }
[data-style="TableHeader"] { font-family: ${fontStack(fonts.heading)}; font-size: 10pt; font-weight: 700; color: ${hex(colors.surface)}; }
[data-style="TotalLine"] { font-family: ${fontStack(fonts.heading)}; font-size: 13pt; font-weight: 700; color: ${hex(colors.surface)}; }
[data-type="table"] { margin: 0 0 10pt; }
[data-type="tableRow"] { display: flex; break-inside: avoid; }
[data-table-column-widths] > [data-type="tableRow"] { display: grid; grid-template-columns: 8.4fr 1.5fr 3fr 3fr; }
[data-grid-span="3"] { grid-column: span 3; }
[data-type="tableCell"] { padding: 4pt 6pt; }
[data-type="tableCell"][data-borders-bottom-style="single"] { border-bottom: 0.5pt solid ${hex(colors.softBorder)}; }
[data-valign="center"] { display: flex; flex-direction: column; justify-content: center; }
[data-shading-fill] { background: ${hex(colors.accent)}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1 { font-size: 22pt; margin: 0 0 0.5em; }
h2 { font-size: 14pt; margin: 1.5em 0 0.4em; }
h3 { font-size: 11.5pt; margin: 1em 0 0.3em; }
table { width: 100%; border-collapse: collapse; margin: 0.75em 0 1em; }
th, td { border-bottom: 1px solid #ddd; padding: 0.4em 0.5em; text-align: left; vertical-align: top; }
th { font-weight: 600; }
.totals-row td { border-bottom: none; padding-top: 0.6em; }
.totals-row.grand td { border-top: 2px solid #111; font-weight: 700; }
.signature-block { margin-top: 2.5em; page-break-inside: avoid; }
.unsigned { color: #888; font-style: italic; }
`

function buildMeta(website, hostHints = {}) {
  const cfg = website?.config?.business_docs || {}
  return {
    title: hostHints.title ?? website?.config?.name ?? 'Business document',
    creator: hostHints.creator ?? cfg.vendor?.organization ?? 'Uniweb',
    subject: hostHints.subject ?? 'Business document',
  }
}

export function buildPagedjsOptions(website, hostHints = {}) {
  const theme = resolveBusinessDocsTheme(website)
  return {
    theme,
    adapterOptions: {
      mode: 'html',
      meta: buildMeta(website, hostHints),
      stylesheet: printStylesheet(paperOf(website, hostHints), theme),
    },
  }
}

/**
 * Default Proximify-aligned brand palette. Sites can override any
 * subset via website.config.business_docs.theme. The resolved theme
 * flows to Press's <DocumentProvider> through compileSubtree, which
 * makes theme keys ('accent', 'softBorder', 'muted', …) used inside
 * the section components resolve to literal hex values during the
 * docx compile pass.
 *
 * Stage 5b of the print/docx work.
 */
/**
 * Typography registry — the role -> { font, size, color, ... } map
 * that Press synthesises into OOXML named styles (Title, Heading1-6,
 * Body, Display, Label, Caption, TableHeader, TotalLine, Hyperlink).
 *
 * The Body role lands on docx's `<w:rPrDefault>` / `<w:pPrDefault>`,
 * making Calibri the document-wide default — recipients can edit the
 * Normal style in Word's Styles pane to globally restyle the doc.
 *
 * Sizes are in half-points (28pt = 56). Colors and fonts are theme
 * keys ('accent', 'body', 'muted', 'softBorder', 'surface' /
 * 'heading', 'body') resolved against theme.colors/fonts at compile
 * time. Foundations override roles per-site via
 * `website.config.business_docs.typography`.
 */
const DEFAULT_BUSINESS_DOCS_TYPOGRAPHY = {
  // Block-level — applied via <Paragraph role="…">.
  Title: {
    font: 'heading',
    size: 56, // 28pt
    bold: true,
    color: 'accent',
    paragraph: { spacing: { after: 240 } },
  },
  Heading1: {
    font: 'heading',
    size: 32, // 16pt
    bold: true,
    color: 'body',
    paragraph: { spacing: { before: 240, after: 120 } },
  },
  Heading2: {
    font: 'heading',
    size: 26, // 13pt
    bold: true,
    color: 'body',
    paragraph: { spacing: { before: 200, after: 100 } },
  },
  Body: {
    font: 'body',
    size: 22, // 11pt
    color: 'body',
    paragraph: { spacing: { line: 276 } }, // 1.15
  },
  Display: {
    // Highlighted secondary value: invoice number, total. Larger than
    // body and bold but quieter than Title.
    font: 'body',
    size: 28, // 14pt
    bold: true,
    color: 'body',
  },

  // Inline — applied via <TextRun role="…">.
  BodyStrong: { font: 'body', size: 22, bold: true, color: 'body' },
  Label: {
    // Small uppercase muted labels: 'INVOICE NUMBER', 'BILL TO'.
    // Bold + allCaps + muted gray creates contrast against the
    // values without being visually heavy.
    font: 'body',
    size: 18, // 9pt
    bold: true,
    color: 'muted',
    allCaps: true,
  },
  Caption: { font: 'body', size: 18, color: 'muted' },
  // White-on-blue table header rows.
  TableHeader: {
    font: 'heading',
    size: 20, // 10pt
    bold: true,
    color: 'surface',
  },
  // Big bold "Total" row in the totals table.
  TotalLine: {
    font: 'heading',
    size: 26, // 13pt
    bold: true,
    color: 'surface',
  },
}

const DEFAULT_BUSINESS_DOCS_THEME = {
  colors: {
    accent: '4775B2',
    body: '3B3B3B',
    muted: '757575',
    softBorder: 'BFD3ED',
    surface: 'FFFFFF',
  },
  fonts: {
    heading: 'Calibri',
    body: 'Calibri',
  },
  typography: DEFAULT_BUSINESS_DOCS_TYPOGRAPHY,
}

function resolveBusinessDocsTheme(website) {
  const fromConfig = website?.config?.business_docs?.theme
  if (!fromConfig) return DEFAULT_BUSINESS_DOCS_THEME
  return {
    colors: {
      ...DEFAULT_BUSINESS_DOCS_THEME.colors,
      ...(fromConfig.colors || {}),
    },
    fonts: {
      ...DEFAULT_BUSINESS_DOCS_THEME.fonts,
      ...(fromConfig.fonts || {}),
    },
    typography: {
      ...DEFAULT_BUSINESS_DOCS_TYPOGRAPHY,
      ...(fromConfig.typography || {}),
    },
  }
}

export function buildDocxOptions(website, hostHints = {}) {
  const theme = resolveBusinessDocsTheme(website)
  return {
    theme,
    adapterOptions: {
      ...buildMeta(website, hostHints),
      // Theme is also threaded through adapterOptions so the docx
      // adapter can synthesise its OOXML named-style block from
      // theme.typography. Foundations that want to add custom paragraph
      // styles on top can pass them via hostHints.paragraphStyles —
      // they merge with the synthesised pack (caller wins on id
      // conflict, except for built-in IDs which override the
      // default.<slot> instead).
      theme,
      pageSize: WORD_PAGE[paperOf(website, hostHints)],
      paragraphStyles: hostHints.paragraphStyles,
      loadAsset: hostHints.loadAsset,
    },
  }
}

export function buildXlsxOptions(website, hostHints = {}) {
  return {
    adapterOptions: {
      ...buildMeta(website, hostHints),
      paper: paperOf(website, hostHints),
    },
  }
}
