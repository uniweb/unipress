/**
 * Footnotes, written as markdown writes them: `[^id]` where the mark goes, and a
 * `[^id]: the note` paragraph anywhere in the same file.
 *
 * The markdown reader keeps both as text, so a section reads them from its sequence.
 * On print a note goes to its place, for the typesetter to set at the foot of the
 * page. In HTML and EPUB, which have no page foot, the marks are numbered and the
 * notes listed at the end of the section. A mark with no note stays as written, so
 * an author sees it.
 */
import { footnoteMarker } from '@uniweb/press/typst'
import { SafeHtml } from '@uniweb/kit'

const NOTE = /^\[\^([^\]\s]+)\]:\s*/
const MARK = /\[\^([^\]\s]+)\]/g

function readNotes(sequence) {
  const notes = new Map()
  const body = []
  for (const element of sequence || []) {
    const note = element?.type === 'paragraph' && typeof element.text === 'string' ? NOTE.exec(element.text) : null
    if (note) notes.set(note[1], element.text.slice(note[0].length))
    else body.push(element)
  }
  return { notes, body }
}

// The element with `change` applied to each text it holds, through a list's items and a
// table's cells.
function mapText(element, change) {
  if (!element || typeof element !== 'object') return element
  if (Array.isArray(element)) return element.map((e) => mapText(e, change))
  const next = { ...element }
  if (typeof next.text === 'string') next.text = change(next.text)
  for (const key of ['children', 'rows', 'cells', 'items']) {
    if (Array.isArray(next[key])) next[key] = mapText(next[key], change)
  }
  return next
}

/** A sequence for a print path: each note at its mark, and no paragraph holding one. */
export function printFootnotes(sequence) {
  const { notes, body } = readNotes(sequence)
  if (!notes.size) return sequence
  return mapText(body, (text) =>
    text.replace(MARK, (mark, id) => (notes.has(id) ? footnoteMarker(notes.get(id)) : mark)),
  )
}

/**
 * Content for an HTML path: its marks numbered, in reading order, and the notes they name.
 *
 * @returns {{ content: object, notes: string[] }}
 */
export function htmlFootnotes(content) {
  const { notes, body } = readNotes(content?.sequence)
  if (!notes.size) return { content, notes: [] }
  const numbers = new Map()
  const sequence = mapText(body, (text) =>
    text.replace(MARK, (mark, id) => {
      if (!notes.has(id)) return mark
      if (!numbers.has(id)) numbers.set(id, numbers.size + 1)
      return `<sup class="footnote-ref">${numbers.get(id)}</sup>`
    }),
  )
  return {
    content: { ...content, sequence },
    notes: [...numbers.keys()].map((id) => notes.get(id)),
  }
}

/** The notes of a section, for an HTML path. */
export function FootnoteList({ notes }) {
  if (!notes?.length) return null
  return (
    <ol className="footnotes">
      {notes.map((note, i) => (
        <li key={i}>
          <SafeHtml value={note} as="span" />
        </li>
      ))}
    </ol>
  )
}
