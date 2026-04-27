import { useDocumentOutput } from '@uniweb/press'
import { ChapterOpener, Sequence } from '@uniweb/press/typst'
import { Prose } from '@uniweb/kit'

/**
 * Cover — the book's front page.
 *
 * Opt-in via `type: Cover` frontmatter, OR used automatically by the Chapter
 * default when the slug is `cover`. When used explicitly, it skips the
 * auto-numbering logic Chapter performs and renders the content as-is.
 */
export default function Cover({ content, block }) {
  const { title, subtitle, sequence } = content || {}

  const compileTree = (
    <>
      <ChapterOpener title={title} subtitle={subtitle} />
      <Sequence data={sequence || []} />
    </>
  )

  useDocumentOutput(block, 'typst', compileTree)
  useDocumentOutput(block, 'latex', compileTree)

  useDocumentOutput(
    block,
    'html',
    <article className="cover">
      {title ? <h1>{title}</h1> : null}
      {subtitle ? <p className="subtitle">{subtitle}</p> : null}
      <Prose content={content} />
    </article>,
  )

  return (
    <section className="book-cover mx-auto max-w-[var(--max-content-width)] px-6 py-20 text-center">
      {title ? (
        <h1 className="text-heading text-5xl font-bold mb-4">{title}</h1>
      ) : null}
      {subtitle ? (
        <p className="text-subtle text-2xl font-light mb-8">{subtitle}</p>
      ) : null}
      <Prose content={content} className="prose-book" />
    </section>
  )
}
