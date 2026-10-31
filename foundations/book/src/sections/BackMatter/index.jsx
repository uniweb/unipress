import { useDocumentOutput } from '@uniweb/press'
import { Sequence, Raw } from '@uniweb/press/typst'
import { Prose, H1 } from '@uniweb/kit'
import { UnnumberedOpener, proseUnderTitle, typstBody, withoutTitleHeading } from '#utils/chapter-opening.jsx'
import { FootnoteList, htmlFootnotes, printFootnotes } from '#utils/footnotes.jsx'

/**
 * BackMatter — for acknowledgments, colophon, author note, and other
 * non-chapter pages that should appear in the book but aren't numbered
 * chapters. Like Cover, it opens without a number.
 *
 * LaTeX path uses \\chapter* (starred form, unnumbered) plus
 * \\addcontentsline so the entry still shows in the table of contents
 * — the canonical way LaTeX handles "front-matter-shaped chapter that
 * shouldn't consume a chapter number".
 */
export default function BackMatter({ content, block, params }) {
  const title = content?.title || params?.title
  const sequence = printFootnotes(content?.sequence)
  const { content: withMarks, notes } = htmlFootnotes(content)

  useDocumentOutput(
    block,
    'typst',
    <>
      <UnnumberedOpener title={title} />
      <Sequence data={typstBody(sequence, title, block?.website)} />
    </>,
  )

  const safeTitle = String(title || '').replace(/[\\{}]/g, '')
  useDocumentOutput(
    block,
    'latex',
    <>
      <Raw>
        {`\\chapter*{${safeTitle}}\n\\addcontentsline{toc}{chapter}{${safeTitle}}`}
      </Raw>
      <Sequence data={withoutTitleHeading(sequence, title)} />
    </>,
  )

  useDocumentOutput(
    block,
    'html',
    <article className="backmatter">
      {title ? <h1>{title}</h1> : null}
      <Prose content={proseUnderTitle(withMarks)} block={block} />
      <FootnoteList notes={notes} />
    </article>,
  )

  return (
    <article className="book-backmatter mx-auto max-w-[var(--max-content-width)] px-6 py-12">
      {title ? (
        <H1 text={title} className="text-heading text-3xl font-bold mb-6" />
      ) : null}
      <Prose content={proseUnderTitle(withMarks)} block={block} className="prose-book" />
      <FootnoteList notes={notes} />
    </article>
  )
}
