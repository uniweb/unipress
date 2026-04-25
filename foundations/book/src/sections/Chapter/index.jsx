import { useDocumentOutput } from '@uniweb/press'
import { ChapterOpener, Sequence } from '@uniweb/press/typst'
import { Prose, H1, H2, useWebsite } from '@uniweb/kit'

/**
 * Chapter — default section type for book pages.
 *
 * Web preview uses Kit's <Prose> to render content.sequence.
 * Compile side registers a Typst fragment (<ChapterOpener> + <Sequence>)
 * keyed to this block; BookLayout's <DocumentProvider> collects it and
 * the Download button compiles the whole book.
 *
 * Chapter number is computed from the block's page position in the
 * site so authors don't have to set it in frontmatter. Pages whose slug
 * doesn't start with `chapter-NN-` get no number (cover, acknowledgments,
 * appendices).
 */
export default function Chapter({ content, block, params }) {
  const { title, subtitle, sequence } = content || {}

  const pageInfo = classifyPage(block?.page)
  const openerTitle = formatTitle(title, pageInfo)

  useDocumentOutput(
    block,
    'typst',
    <>
      <ChapterOpener
        number={pageInfo.number}
        title={openerTitle}
        subtitle={subtitle}
      />
      <Sequence data={sequence || []} />
    </>,
  )

  // HTML fragment: semantic HTML that HTML-string adapters consume.
  // Paged.js picks this up via its stylesheet — h1 sets the running header
  // via `string-set: chapter content()` and forces a page break via
  // `break-before: recto`. A future EPUB adapter will read the same key.
  useDocumentOutput(
    block,
    'html',
    <article className="chapter">
      {openerTitle ? <h1>{openerTitle}</h1> : null}
      {subtitle ? <p className="subtitle">{subtitle}</p> : null}
      <Prose content={content} />
    </article>,
  )

  return (
    <article className="book-chapter mx-auto max-w-[var(--max-content-width)] px-6 py-12">
      {title ? (
        <header className="mb-8">
          {pageInfo.number != null ? (
            <p className="text-sm uppercase tracking-wide text-subtle mb-3">
              Chapter {pageInfo.number}
            </p>
          ) : null}
          <H1 text={openerTitle} className="text-heading text-4xl font-bold mb-2" />
          {subtitle ? (
            <H2 text={subtitle} className="text-subtle text-xl font-normal" />
          ) : null}
        </header>
      ) : null}
      <Prose content={content} className="prose-book" />
    </article>
  )
}

/**
 * Infer the chapter kind from the page slug. Numerical chapters get a
 * number; everything else is front / back / appendix.
 */
function classifyPage(page) {
  const slug = page?.slug || ''
  const chap = slug.match(/^chapter-(\d+)/)
  if (chap) return { kind: 'chapter', number: Number(chap[1]), label: null }
  const app = slug.match(/^appendix-([a-z0-9])/i)
  if (app) return { kind: 'appendix', number: null, label: app[1].toUpperCase() }
  if (slug === 'cover') return { kind: 'cover', number: null, label: null }
  return { kind: 'other', number: null, label: null }
}

function formatTitle(title, info) {
  if (!title) return ''
  if (Array.isArray(title)) return title.filter(Boolean).join(': ')
  if (info.kind === 'appendix' && info.label) {
    // If the markdown already prefixes "Appendix X — …" don't double-prefix.
    if (/^appendix/i.test(title)) return title
    return `Appendix ${info.label} — ${title}`
  }
  return title
}
