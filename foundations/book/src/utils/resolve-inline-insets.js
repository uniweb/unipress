/**
 * Resolve inline-inset markers in a content sequence for downstream
 * consumers that read each element's `text` field as a flat string —
 * notably Press's Typst `Sequence` component, which doesn't know about
 * `<uniweb-inset data-ref-id="…">` markers.
 *
 * The web preview path doesn't need this: kit's Prose component reads
 * the same markers and substitutes React-rendered insets at marker
 * positions (see `framework/kit/src/styled/Prose/index.jsx` —
 * `renderParagraphWithInsets`). Press's compile path can't render
 * React inline; it needs the cite text already substituted into the
 * paragraph string.
 *
 * Walks paragraph elements in the sequence (and recurses into
 * blockquotes, list items). For each `<uniweb-inset data-ref-id="X">`
 * marker, looks up the inset block via `block.getInset(refId)` and asks
 * the caller-provided `format(insetBlock)` for its text-mode output.
 * The result is a NEW sequence with the marker-bearing paragraph text
 * rewritten.
 *
 * `format(insetBlock)` should return a string suitable for the target
 * format: plain-text + Typst-escapes for the Typst path; could equally
 * be docx-flavoured RTF or anything else for other formats.
 */

const INSET_RE = /<uniweb-inset data-ref-id="([^"]+)"><\/uniweb-inset>/g

function rewriteText(html, block, format) {
  if (!html || !html.includes('<uniweb-inset')) return html
  return html.replace(INSET_RE, (_, refId) => {
    const insetBlock = block?.getInset?.(refId)
    if (!insetBlock) return ''
    try {
      return format(insetBlock) || ''
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('resolve-inline-insets: format() failed for', refId, err)
      return ''
    }
  })
}

function rewriteContent(content, block, format) {
  if (!Array.isArray(content)) return content
  return content.map((node) => {
    if (!node || typeof node !== 'object') return node
    if (node.type === 'text' && typeof node.text === 'string') {
      const rewritten = rewriteText(node.text, block, format)
      return rewritten === node.text ? node : { ...node, text: rewritten }
    }
    if (Array.isArray(node.content)) {
      return { ...node, content: rewriteContent(node.content, block, format) }
    }
    return node
  })
}

/**
 * Rewrite a content.sequence in-place-safe: returns a new sequence
 * where every paragraph (and child blockquote / list-item content)
 * has had its inline-inset markers replaced with the format()
 * output. Non-text fields are preserved.
 *
 * Sequence elements have multiple shapes (heading, paragraph,
 * blockquote, list, codeBlock, …). Only the ones that carry inline
 * text need to be rewritten — heading / paragraph / blockquote /
 * list children. Block-level entries (codeBlock, dataBlock, image,
 * inset) pass through unchanged.
 */
export function resolveInlineInsets(sequence, block, format) {
  if (!Array.isArray(sequence)) return sequence
  if (typeof format !== 'function') return sequence

  return sequence.map((element) => {
    if (!element || typeof element !== 'object') return element
    switch (element.type) {
      case 'heading':
      case 'paragraph': {
        const next = { ...element }
        if (typeof element.text === 'string') {
          next.text = rewriteText(element.text, block, format)
        }
        if (Array.isArray(element.content)) {
          next.content = rewriteContent(element.content, block, format)
        }
        return next
      }
      case 'blockquote':
      case 'list': {
        const next = { ...element }
        if (Array.isArray(element.children)) {
          next.children = resolveInlineInsets(element.children, block, format)
        }
        return next
      }
      default:
        return element
    }
  })
}
