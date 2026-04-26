/**
 * Convert a citestyle FormattedEntry to Typst markup for the back-matter
 * bibliography emission.
 *
 * citestyle's `parts` field turned out to expose raw CSL data
 * (`authors: [{family, given}]`, `year: '1859'`, etc.) rather than
 * pre-formatted HTML keyed by csl-* class names. That makes it the
 * wrong source for a style-faithful re-emit (we'd need to re-implement
 * each style's punctuation, name ordering, italics rules — i.e.,
 * re-do citestyle's compiled output ourselves).
 *
 * Instead, we convert `entry.html` — citestyle's already-formatted HTML
 * with `<i>`, `<a>`, semantic span wrappers — into Typst markup via a
 * narrow HTML-subset walker. citestyle's HTML output is well-shaped
 * (no SVG, no nested tables, no script), so a strict subset walker
 * suffices and we don't need a full HTML parser.
 *
 *   <i>x</i>          -> #emph[x]
 *   <em>x</em>        -> #emph[x]
 *   <b>x</b>          -> #strong[x]
 *   <strong>x</strong> -> #strong[x]
 *   <a href="u">x</a> -> #link("u")[x]
 *   <span class="…">x</span> -> x       (semantic class only, drop wrapper)
 *   <div class="csl-entry">x</div> -> x  (drop the entry wrapper)
 *
 * Falls back to `entry.text` if HTML conversion fails or produces nothing.
 */

function escapeTypst(s) {
  if (!s) return ''
  // Escape Typst markup characters. Typst is permissive in content mode,
  // but `*`, `_`, `#`, `[`, `]`, `\`, `<`, `>`, `@`, and `=` can trigger
  // unintended interpretations.
  return String(s).replace(/([\\\[\]#*_<>@=])/g, '\\$1')
}

function decodeEntities(s) {
  if (!s) return ''
  return String(s)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
}

/**
 * Walk a snippet of HTML (citestyle's emit shape), translate inline
 * tags to Typst markup, escape text content. Strict subset.
 */
function htmlToTypst(html) {
  if (!html || typeof html !== 'string') return ''

  let out = ''
  let i = 0
  const n = html.length

  while (i < n) {
    const ch = html[i]
    if (ch !== '<') {
      const next = html.indexOf('<', i)
      const end = next === -1 ? n : next
      out += escapeTypst(decodeEntities(html.slice(i, end)))
      i = end
      continue
    }

    const tagEnd = html.indexOf('>', i)
    if (tagEnd === -1) {
      out += escapeTypst(decodeEntities(html.slice(i)))
      break
    }
    const tag = html.slice(i + 1, tagEnd)
    if (tag.startsWith('/') || tag.endsWith('/')) {
      // Stray close tag or self-closing — skip the tag itself.
      i = tagEnd + 1
      continue
    }
    const tagName = tag.split(/\s/)[0].toLowerCase()
    const closeName = `</${tagName}>`
    let depth = 1
    let scan = tagEnd + 1
    let closeIdx = -1
    while (scan < n) {
      const nextOpen = html.indexOf(`<${tagName}`, scan)
      const nextClose = html.indexOf(closeName, scan)
      if (nextClose === -1) break
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++
        scan = html.indexOf('>', nextOpen) + 1 || n
        continue
      }
      depth--
      if (depth === 0) { closeIdx = nextClose; break }
      scan = nextClose + closeName.length
    }
    const inner = closeIdx === -1
      ? html.slice(tagEnd + 1)
      : html.slice(tagEnd + 1, closeIdx)
    const innerTypst = htmlToTypst(inner)
    const advance = closeIdx === -1 ? n : closeIdx + closeName.length

    if (tagName === 'i' || tagName === 'em') {
      out += `#emph[${innerTypst}]`
    } else if (tagName === 'b' || tagName === 'strong') {
      out += `#strong[${innerTypst}]`
    } else if (tagName === 'a') {
      const m = /href=("([^"]*)"|'([^']*)')/.exec(tag)
      const href = m ? (m[2] ?? m[3] ?? '') : ''
      out += href
        ? `#link("${href.replace(/"/g, '\\"')}")[${innerTypst}]`
        : innerTypst
    } else {
      // span, div, and any other wrapper we haven't named: pass the
      // inner content through, drop the wrapper.
      out += innerTypst
    }
    i = advance
  }

  return out
}

/**
 * Render a citestyle FormattedEntry as Typst markup, preferring HTML
 * conversion (style-faithful) and falling back to the entry's plain
 * text when conversion produces nothing.
 */
export function entryToTypst(entry) {
  if (!entry) return ''
  if (typeof entry.html === 'string' && entry.html.length > 0) {
    const t = htmlToTypst(entry.html).trim()
    if (t) return t
  }
  return entry.text ? escapeTypst(entry.text) : ''
}

/**
 * Backwards-compatible alias. Older callers used `partsToTypst(entry.parts)`
 * thinking `parts` was HTML-keyed; the function now takes a full entry.
 * Accepts either an entry-shape (object with `html` / `text` keys) or
 * a raw HTML string.
 */
export function partsToTypst(entryOrHtml) {
  if (entryOrHtml == null) return ''
  if (typeof entryOrHtml === 'string') {
    return htmlToTypst(entryOrHtml).trim()
  }
  return entryToTypst(entryOrHtml)
}
