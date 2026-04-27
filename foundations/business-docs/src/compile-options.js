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

const PRINT_STYLESHEET = `
@page {
  size: letter;
  margin: 1in 0.75in;
  @bottom-right { content: counter(page) " / " counter(pages); font-size: 9pt; color: #666; }
}
body { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10.5pt; line-height: 1.45; color: #111; }
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
  return {
    adapterOptions: {
      mode: 'html',
      meta: buildMeta(website, hostHints),
      stylesheet: PRINT_STYLESHEET,
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
 * Stage 5b of kb/framework/plans/press-professional-docx.md.
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
      paragraphStyles: hostHints.paragraphStyles,
      loadAsset: hostHints.loadAsset,
    },
  }
}

export function buildXlsxOptions(website, hostHints = {}) {
  return {
    adapterOptions: buildMeta(website, hostHints),
  }
}
