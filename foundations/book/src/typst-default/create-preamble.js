/**
 * createPreamble({ language, labels }) → Typst preamble string.
 *
 * Produces preamble.typ — the named functions Press's /typst builders
 * call into. Currently two functions: #chapter-opener and #section-break.
 * The only parameterised piece is the "Chapter" overline label, which
 * becomes language-specific through the `labels` resolver.
 */
import { resolveLabels } from './labels.js'

export function createPreamble({ language, labels } = {}) {
  const l = resolveLabels({ language, overrides: labels })

  return String.raw`// preamble.typ — named functions used by Press/typst section fragments.

// ─── Chapter opener ──────────────────────────────────────────────────────
#let chapter-opener(number: none, title: "", subtitle: "") = {
  pagebreak(weak: true)
  v(1.5in)
  if number != none {
    align(
      center,
      text(size: 11pt, weight: "regular", fill: luma(90))[
        ${escapeTypstText(l.chapter)} #number
      ],
    )
    v(0.4em)
  }
  align(
    center,
    par(
      justify: false,
      text(size: 20pt, weight: "bold")[#title],
    ),
  )
  if subtitle != "" {
    v(0.4em)
    align(
      center,
      text(size: 13pt, style: "italic", fill: luma(60))[#subtitle],
    )
  }
  v(1.5em)
}

// ─── Section break ───────────────────────────────────────────────────────
#let section-break() = {
  v(1em)
  align(center, text(size: 12pt, "⁂"))
  v(1em)
}
`
}

/**
 * Escape characters that have special meaning inside Typst content mode.
 * Labels come from site.yml / LABELS_BY_LANGUAGE and are text, not markup,
 * so `#`, `*`, `_`, `[`, `]`, `\` should not be interpreted as syntax.
 */
function escapeTypstText(s) {
  return String(s).replace(/[\\#\*_\[\]]/g, (c) => '\\' + c)
}
