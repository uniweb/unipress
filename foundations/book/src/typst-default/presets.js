/**
 * Trim + typography + structure presets for book foundations.
 *
 * Four independent axes that a site declares in site.yml:
 *
 *   book:
 *     trim: trade-7x10            # physical shape (this file)
 *     typography:                 # body copy + heading fonts (this file)
 *       bodySize: 11pt
 *       leading: 0.72em
 *       firstLineIndent: 1.4em
 *       bodyFont: 'Charter'
 *       headingFont: ['Charter', 'Georgia']
 *     structure:                  # which front matter blocks to emit
 *       titlePage: true
 *       copyrightPage: true
 *       toc: true
 *       tocDepth: 2
 *       frontMatterNumbering: roman   # 'none' | 'roman' | 'arabic'
 *     labels:                     # localized built-in strings (labels.js)
 *       chapter: 'Chapitre'
 *       by: 'par'
 *
 * Values here are Typst literals as JS strings — emitted verbatim into
 * template.typ / preamble.typ.
 */

export const TRIM_PRESETS = {
  'trade-6x9': {
    width: '6in',
    height: '9in',
    margins: {
      inside: '0.75in',
      outside: '0.5in',
      top: '0.75in',
      bottom: '0.75in',
    },
  },
  'trade-7x10': {
    width: '7in',
    height: '10in',
    margins: {
      inside: '0.875in',
      outside: '0.625in',
      top: '0.875in',
      bottom: '0.875in',
    },
  },
  'crown-octavo': {
    // 189 × 246 mm — common UK trade hardcover
    width: '7.44in',
    height: '9.69in',
    margins: {
      inside: '0.875in',
      outside: '0.625in',
      top: '0.875in',
      bottom: '0.875in',
    },
  },
  'royal-octavo': {
    // 156 × 234 mm — common academic hardcover
    width: '6.14in',
    height: '9.21in',
    margins: {
      inside: '0.75in',
      outside: '0.55in',
      top: '0.75in',
      bottom: '0.75in',
    },
  },
  a5: {
    width: '148mm',
    height: '210mm',
    margins: {
      inside: '18mm',
      outside: '14mm',
      top: '18mm',
      bottom: '18mm',
    },
  },
}

export const DEFAULT_TRIM = 'trade-6x9'

export const DEFAULT_TYPOGRAPHY = {
  bodySize: '11pt',
  leading: '0.72em',
  firstLineIndent: '1.4em',
  // Code block + inline code sizes. Smaller values fit more characters
  // per line — useful on narrow trims where long code lines wrap. For
  // 6x9 trade paperback, 8pt / 9pt is a common tighter choice; for
  // 7x10 the 9pt / 9.5pt default usually has enough column space.
  codeBlockSize: '9pt',
  codeInlineSize: '9.5pt',
  // codeMarginRelief lets code blocks extend beyond the body text
  // column, gaining horizontal room for long code lines. Typst
  // symmetrically pads negatively on both sides, so a value of
  // "0.25in" gives code blocks 0.5in of extra width total. Default
  // "0pt" → no relief (byte-identical to pre-parameterisation output).
  codeMarginRelief: '0pt',
  // Fonts default to null → template omits `#set text(font: ...)` and
  // Typst uses its own default (currently New Computer Modern for
  // serif, DejaVu Sans Mono for raw).
  bodyFont: null,
  headingFont: null,
  codeFont: null,
}

export const DEFAULT_STRUCTURE = {
  titlePage: true,
  copyrightPage: true,
  toc: true,
  tocDepth: 2,
  // 'none'   — current behavior: front matter unnumbered, body starts 1 arabic.
  // 'roman'  — front matter numbered i, ii, iii…; body resets to 1 arabic.
  // 'arabic' — front matter numbered 1, 2, 3…, continuing into body.
  frontMatterNumbering: 'none',
}

const GENERIC_CSS_FAMILIES = new Set([
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'ui-serif',
  'ui-sans-serif',
  'ui-monospace',
  'ui-rounded',
  'math',
  'emoji',
  'fangsong',
  'inherit',
  'initial',
  'unset',
])

// Markers of a CSS "system font" stack — browser-level aliases that
// resolve to whatever the OS's default UI font is. They are never real
// font files. If ANY of these appears in a list, the whole list is a
// system-default stack (not an author-chosen font choice) and should
// be ignored so Typst can use its own default.
const SYSTEM_STACK_MARKERS = new Set([
  '-apple-system',
  'blinkmacsystemfont',
  '-webkit-system',
])

/**
 * Resolve a site.yml `book.trim` value to a full trim spec.
 * Accepts: undefined / string (preset name) / object ({ preset?, width?, height?, margins? }).
 */
export function resolveTrim(input) {
  if (input == null) return cloneTrim(TRIM_PRESETS[DEFAULT_TRIM])

  if (typeof input === 'string') {
    const p = TRIM_PRESETS[input]
    if (!p) {
      throw new Error(
        `[@uniweb/book] unknown trim preset "${input}". ` +
          `Available: ${Object.keys(TRIM_PRESETS).join(', ')}`,
      )
    }
    return cloneTrim(p)
  }

  if (typeof input === 'object') {
    const baseName = input.preset || DEFAULT_TRIM
    const base = TRIM_PRESETS[baseName]
    if (!base) {
      throw new Error(
        `[@uniweb/book] unknown trim preset "${baseName}". ` +
          `Available: ${Object.keys(TRIM_PRESETS).join(', ')}`,
      )
    }
    return {
      width: input.width ?? base.width,
      height: input.height ?? base.height,
      margins: { ...base.margins, ...(input.margins || {}) },
    }
  }

  throw new Error(
    `[@uniweb/book] invalid trim value: ${JSON.stringify(input)}`,
  )
}

/**
 * Resolve a site.yml `book.typography` value. Font fields accept either a
 * single name (string) or a fallback chain (array of names); the resolver
 * normalises to `string[] | null`.
 */
export function resolveTypography(input) {
  const merged = { ...DEFAULT_TYPOGRAPHY, ...(input || {}) }
  return {
    bodySize: merged.bodySize,
    leading: merged.leading,
    firstLineIndent: merged.firstLineIndent,
    codeBlockSize: merged.codeBlockSize,
    codeInlineSize: merged.codeInlineSize,
    codeMarginRelief: merged.codeMarginRelief,
    bodyFont: normaliseFontList(merged.bodyFont),
    headingFont: normaliseFontList(merged.headingFont),
    codeFont: normaliseFontList(merged.codeFont),
  }
}

/**
 * Resolve a site.yml `book.structure` value. Accepts a subset of fields;
 * missing fields fall back to DEFAULT_STRUCTURE.
 */
export function resolveStructure(input) {
  const merged = { ...DEFAULT_STRUCTURE, ...(input || {}) }
  const validModes = ['none', 'roman', 'arabic']
  if (!validModes.includes(merged.frontMatterNumbering)) {
    throw new Error(
      `[@uniweb/book] invalid structure.frontMatterNumbering ` +
        `"${merged.frontMatterNumbering}". Allowed: ${validModes.join(', ')}`,
    )
  }
  return merged
}

/**
 * Normalise a font-family input into a list of real font names Typst can
 * try in order. Accepts a string (single name OR CSS-style comma list),
 * an array of names, or null/undefined. Generic CSS families
 * (serif/sans-serif/monospace/…) are stripped because they aren't valid
 * Typst font names.
 * @returns {string[] | null}
 */
export function normaliseFontList(input) {
  if (input == null || input === '') return null

  let names = []
  if (Array.isArray(input)) {
    names = input
  } else if (typeof input === 'string') {
    names = input.split(',')
  } else {
    return null
  }

  const cleaned = names
    .map((n) => String(n).trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)

  // If any entry is a system-stack marker, this is a CSS system-default
  // font stack — not an author-chosen font list. Ignore it so Typst
  // can use its own default rather than emitting warnings for every
  // pseudo-alias that isn't a real font file.
  if (cleaned.some((n) => SYSTEM_STACK_MARKERS.has(n.toLowerCase()))) {
    return null
  }

  const filtered = cleaned.filter(
    (n) => !GENERIC_CSS_FAMILIES.has(n.toLowerCase()),
  )
  return filtered.length ? filtered : null
}

function cloneTrim(obj) {
  return { ...obj, margins: { ...obj.margins } }
}
