/**
 * How a chapter-shaped section opens on the print paths.
 *
 * A section's `content.title` is read from its first heading, and that heading is
 * also the first entry of `content.sequence`. Each path prints the title in its own
 * opening — Typst's `#chapter-opener`, LaTeX's `\chapter`, an `<h1>` in HTML — so the
 * sequence it prints after the opening leaves that heading out, or the reader gets
 * the title twice (and on LaTeX a second, empty chapter).
 *
 * The article genre is the exception on Typst: its opener draws nothing, and the
 * heading in the sequence is the section's heading.
 */
import { Raw } from '@uniweb/press/typst'

/**
 * The sequence without the heading the title was read from: the first H1 among the
 * headings the section opens with, or an opening heading that holds the title.
 *
 * @param {Array} sequence - `content.sequence`
 * @param {string} [title] - `content.title`
 * @returns {Array}
 */
export function withoutTitleHeading(sequence, title) {
  const list = sequence || []
  for (let i = 0; i < list.length && list[i]?.type === 'heading'; i++) {
    if (list[i].level === 1 || list[i].text === title) {
      return [...list.slice(0, i), ...list.slice(i + 1)]
    }
  }
  return list
}

/**
 * The content a section hands `<Prose>` under a title it prints itself: the HTML and EPUB paths
 * and the web preview write their own `<h1>`, so Prose leaves the heading out.
 */
export function proseUnderTitle(content) {
  return { ...content, sequence: withoutTitleHeading(content?.sequence, content?.title) }
}

/**
 * What the Typst path prints after a section's opener. In the article genre that includes the
 * section's heading, which a title in frontmatter has none of in the sequence.
 */
export function typstBody(sequence, title, website) {
  const list = sequence || []
  const without = withoutTitleHeading(list, title)
  if (website?.config?.book?.kind !== 'article') return without
  return title && without === list ? [{ type: 'heading', level: 1, text: title }, ...list] : list
}

function typstString(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

/**
 * The opener of a section that is not a numbered chapter (an abstract, an appendix,
 * back matter): listed in the contents, without a number there.
 *
 * Written through `Raw` because Press's `<ChapterOpener>` has no such argument, and
 * this one is the foundation's own: `numbered` is declared by its preamble.
 */
export function UnnumberedOpener({ title, subtitle }) {
  const args = []
  if (title) args.push(`title: ${typstString(title)}`)
  if (subtitle) args.push(`subtitle: ${typstString(subtitle)}`)
  args.push('numbered: false')
  return <Raw>{`#chapter-opener(${args.join(', ')})`}</Raw>
}
