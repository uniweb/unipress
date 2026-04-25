import { useWebsite } from '@uniweb/kit'

/**
 * BackCover — renders the back cover image declared at
 * `site.yml book.covers.back`. Web-only: the PDF back cover is emitted
 * at the template level by createTemplate({ covers }), independent of
 * whether this section appears.
 *
 * Opt-in. Add a markdown file with `type: BackCover` where you want it
 * in the reading order (typically last).
 */
export default function BackCover({ content }) {
  const { website } = useWebsite()
  const covers = website?.config?.book?.covers || {}
  const src = resolveSrc(covers.back, website?.basePath)
  const alt =
    (content && content.title) ||
    'Back cover of ' + (website?.config?.book?.title || 'the book')

  if (!src) {
    return (
      <section className="book-backcover-fallback mx-auto max-w-[var(--max-content-width)] px-6 py-16 text-center text-subtle text-sm">
        No back cover declared. Add <code>book.covers.back</code> to{' '}
        <code>site.yml</code>.
      </section>
    )
  }

  return (
    <section className="book-backcover-image flex justify-center px-4 py-12">
      <img
        src={src}
        alt={alt}
        className="max-h-[80vh] w-auto shadow-2xl ring-1 ring-black/5 rounded-sm"
      />
    </section>
  )
}

function resolveSrc(src, basePath) {
  if (!src) return null
  if (/^https?:\/\//i.test(src) || src.startsWith('data:')) return src
  if (src.startsWith('/')) return (basePath || '') + src
  return src
}
