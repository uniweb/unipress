import { useEffect, useState } from 'react'
import { Link, useWebsite } from '@uniweb/kit'
import { chapterSections } from '../../utils/chapter-sections.js'
import { useDocumentOutput } from '@uniweb/press'
import { Raw } from '@uniweb/press/typst'

/**
 * Contents — the table of contents, where the document places it.
 *
 * On the web it lists every book page in reading order, with nested links
 * to each chapter's level-2 headings. In print it hands over to the
 * typesetter, which knows the page numbers. A book with no such section
 * gets its contents from the Typst template, before the first chapter; one
 * with this section, a thesis above all, gets them here, after its abstract.
 *
 * Opt-in: add a markdown file with `type: Contents` and include it in
 * the site's `pages:` reading order.
 */
export default function Contents({ content, block }) {
  const { website } = useWebsite()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const depth = block?.website?.config?.book?.structure?.tocDepth ?? 2

  useDocumentOutput(
    block,
    'typst',
    <Raw>{`#pagebreak(weak: true)\n#set outline.entry(fill: repeat([.], gap: 0.25em))\n#outline(indent: auto, depth: ${Number(depth) || 2})`}</Raw>,
  )
  useDocumentOutput(block, 'latex', <Raw>{'\\tableofcontents'}</Raw>)

  useEffect(() => {
    let cancelled = false

    async function gather() {
      const hierarchy = website?.getPageHierarchy?.({ for: 'header' }) || []
      const flat = flatten(hierarchy).filter(includeInToc)

      // hierarchy nodes are lightweight; we need the actual Page instances
      // to call loadContent() and read rawContent. Look them up by route.
      const byRoute = new Map(
        (website?.pages || []).map((p) => [p.route, p]),
      )

      const result = []
      for (const h of flat) {
        const page = byRoute.get(h.route)
        if (!page) continue
        try {
          if (typeof page.loadContent === 'function') {
            await page.loadContent()
          }
        } catch (err) {
          // Keep going; the chapter entry still lists as a link.
          console.warn('[Contents] loadContent failed for', h.route, err)
        }
        const sections = chapterSections((page.bodyBlocks || [])[0])
        result.push({
          title: h.label || h.title || page.title,
          route: h.navigableRoute || h.route,
          sections,
        })
      }

      if (!cancelled) {
        setEntries(result)
        setLoading(false)
      }
    }

    gather()
    return () => {
      cancelled = true
    }
  }, [website])

  const pageTitle = content?.title || 'Contents'

  return (
    <article className="book-contents mx-auto max-w-[var(--max-content-width)] px-6 py-16">
      <h1 className="text-heading text-4xl font-bold mb-12">{pageTitle}</h1>

      {loading ? (
        <p className="text-subtle">Loading contents…</p>
      ) : entries.length === 0 ? (
        <p className="text-subtle">No entries.</p>
      ) : (
        <ol className="space-y-6 list-none p-0">
          {entries.map((e) => (
            <li key={e.route}>
              <Link
                href={e.route}
                className="text-heading text-lg font-semibold hover:text-primary transition-colors"
              >
                {e.title}
              </Link>
              {e.sections.length > 0 && (
                <ul className="mt-2 ml-6 space-y-1 list-none p-0">
                  {e.sections.map((s, j) => (
                    <li key={j}>
                      <Link
                        href={`${e.route}#${s.slug}`}
                        className="text-subtle hover:text-heading transition-colors text-sm"
                      >
                        {s.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      )}
    </article>
  )
}

// ─── Helpers ────────────────────────────────────────────────────────────

function includeInToc(page) {
  // Exclude the covers and the contents page itself.
  const slug = (page.route || '').split('/').filter(Boolean).pop() || ''
  if (page.route === '/') return false
  if (slug === 'contents') return false
  if (slug === 'front-cover') return false
  if (slug === 'back-cover') return false
  return true
}

function flatten(pages) {
  const out = []
  const walk = (list) => {
    for (const p of list || []) {
      out.push(p)
      if (p.children?.length) walk(p.children)
    }
  }
  walk(pages)
  return out
}
