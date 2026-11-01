import { useDocumentOutput } from '@uniweb/press'
import { Sequence, Raw } from '@uniweb/press/typst'
import { Prose, H1 } from '@uniweb/kit'
import { UnnumberedOpener, proseUnderTitle, typstBody, withoutTitleHeading } from '#utils/chapter-opening.jsx'
import { FootnoteList, htmlFootnotes } from '#utils/footnotes.jsx'
import { htmlContent, printSequences } from '#utils/print-sequences.js'

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
  const { typst, latex } = printSequences(content?.sequence, block)
  const { content: withMarks, notes } = htmlFootnotes(content)
  const printed = htmlContent(content, block)

  useDocumentOutput(
    block,
    'typst',
    <>
      <UnnumberedOpener title={title} />
      <Sequence data={typstBody(typst, title, block?.website)} />
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
      <Sequence data={withoutTitleHeading(latex, title)} />
    </>,
  )

  useDocumentOutput(
    block,
    'html',
    <article className="backmatter">
      {title ? <h1>{title}</h1> : null}
      <Prose content={proseUnderTitle(printed.content)} block={block} />
      <FootnoteList notes={printed.notes} />
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
