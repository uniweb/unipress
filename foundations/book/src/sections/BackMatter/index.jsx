import { useDocumentOutput } from '@uniweb/press'
import { ChapterOpener, Sequence } from '@uniweb/press/typst'
import { Prose, H1 } from '@uniweb/kit'

/**
 * BackMatter — for acknowledgments, colophon, author note, and other
 * non-chapter pages that should appear in the book but aren't numbered
 * chapters. Like Cover, it skips the chapter-opener's numbering.
 */
export default function BackMatter({ content, block }) {
  const { title, sequence } = content || {}

  useDocumentOutput(
    block,
    'typst',
    <>
      <ChapterOpener title={title} />
      <Sequence data={sequence || []} />
    </>,
  )

  useDocumentOutput(
    block,
    'html',
    <article className="backmatter">
      {title ? <h1>{title}</h1> : null}
      <Prose content={content} block={block} />
    </article>,
  )

  return (
    <article className="book-backmatter mx-auto max-w-[var(--max-content-width)] px-6 py-12">
      {title ? (
        <H1 text={title} className="text-heading text-3xl font-bold mb-6" />
      ) : null}
      <Prose content={content} block={block} className="prose-book" />
    </article>
  )
}
