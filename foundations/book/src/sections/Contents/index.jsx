import { useEffect, useState } from 'react'
import { Link, useWebsite } from '@uniweb/kit'

/**
 * Contents — a web-only table of contents that lists every book page in
 * reading order, with nested links to each chapter's level-2 headings.
 *
 * The PDF already emits its own `#outline()` TOC from the Typst template,
 * so this section does not register a Press fragment. It exists purely
 * to give the web book a browseable ToC.
 *
 * Opt-in: add a markdown file with `type: Contents` and include it in
 * the site's `pages:` reading order (typically right after the cover).
 */
export default function Contents({ content }) {
  const { website } = useWebsite()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

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
        const block = (page.bodyBlocks || [])[0]
        const nodes = block?.rawContent?.content || []
        const sections = nodes
          .filter((n) => n.type === 'heading' && n.attrs?.level === 2)
          .map((n) => {
            const text = headingText(n)
            return { text, slug: slugify(text) }
          })
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

function headingText(node) {
  return (node.content || [])
    .filter((c) => c.type === 'text')
    .map((c) => c.text)
    .join('')
}

function slugify(text) {
  // Matches the runtime's kebab-case heading-id scheme.
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
