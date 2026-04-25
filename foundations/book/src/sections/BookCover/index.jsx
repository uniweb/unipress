import { useWebsite } from '@uniweb/kit'

/**
 * BookCover — renders the front cover image declared at
 * `site.yml book.covers.front`. Web-only: the PDF cover is emitted at
 * the template level by createTemplate({ covers }), independent of
 * whether this section appears.
 *
 * Opt-in. Add a markdown file with `type: BookCover` where you want the
 * cover to appear in the reading order (usually first).
 *
 * Falls back to the markdown content if the front cover is undeclared
 * — useful during authoring before art exists.
 */
export default function BookCover({ content, block }) {
  const { website } = useWebsite()
  const covers = website?.config?.book?.covers || {}
  const src = resolveSrc(covers.front, website?.basePath)
  const alt =
    (content && content.title) ||
    website?.config?.book?.title ||
    'Book cover'

  if (!src) {
    return (
      <section className="book-cover-fallback mx-auto max-w-[var(--max-content-width)] px-6 py-16 text-center text-subtle text-sm">
        No front cover declared. Add <code>book.covers.front</code> to{' '}
        <code>site.yml</code>.
      </section>
    )
  }

  return (
    <section className="book-cover-image flex justify-center px-4 py-12">
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
