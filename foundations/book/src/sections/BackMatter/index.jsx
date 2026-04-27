import { useDocumentOutput } from '@uniweb/press'
import { ChapterOpener, Sequence, Raw } from '@uniweb/press/typst'
import { Prose, H1 } from '@uniweb/kit'

/**
 * BackMatter — for acknowledgments, colophon, author note, and other
 * non-chapter pages that should appear in the book but aren't numbered
 * chapters. Like Cover, it skips the chapter-opener's numbering.
 *
 * LaTeX path uses \\chapter* (starred form, unnumbered) plus
 * \\addcontentsline so the entry still shows in the table of contents
 * — the canonical way LaTeX handles "front-matter-shaped chapter that
 * shouldn't consume a chapter number".
 */
export default function BackMatter({ content, block }) {
  const { title, sequence } = content || {}

  // Typst path keeps using ChapterOpener — Typst's heading numbering
  // is template-controlled, and the foundation's typst template
  // already skips numbers for front / back matter sections.
  useDocumentOutput(
    block,
    'typst',
    <>
      <ChapterOpener title={title} />
      <Sequence data={sequence || []} />
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
