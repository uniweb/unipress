/**
 * ChapterNav — web-only navigation bar at the bottom of every page.
 *
 * press-book's BookLayout is deliberately minimal (PDF-first foundation),
 * but a flat web book still needs some way to move between chapters
 * without typing URLs. This component computes the current page's
 * position in the reading order (from website.getPageHierarchy) and
 * renders:
 *
 *   - On the front cover (first page):      "Start reading →"
 *   - On the back cover (last page):        "← Previous"
 *   - On every other page:                  "← Previous | Contents | Next →"
 *
 * The web-only nav does not register anything with Press — compiled
 * output is unaffected.
 */
import { Link, cn, useWebsite, useRouting } from '@uniweb/kit'

export default function ChapterNav() {
  const { website } = useWebsite()
  const { useLocation } = useRouting()
  const location = useLocation()
  const currentPath = location?.pathname || '/'

  const hierarchy = website?.getPageHierarchy?.({ for: 'header' }) || []
  const flat = flatten(hierarchy)
  if (flat.length <= 1) return null

  const idx = flat.findIndex(
    (p) => normalize(p.route) === normalize(currentPath),
  )
  if (idx === -1) return null

  const prev = idx > 0 ? flat[idx - 1] : null
  const next = idx < flat.length - 1 ? flat[idx + 1] : null
  const isFirst = idx === 0
  const isLast = idx === flat.length - 1
  const isContentsPage = normalize(currentPath) === 'contents'

  // Does a Contents page exist in this site's reading order? If so, the
  // "Contents" link points there; if not, it falls back to the home page.
  const contentsRoute = flat.find(
    (p) => normalize(p.route) === 'contents',
  )?.route
  const contentsHref = contentsRoute || '/'

  return (
    <nav
      className="chapter-nav mx-auto max-w-[var(--max-content-width)] px-6 py-8 mt-12 border-t border-border"
      aria-label="Chapter navigation"
    >
      <div className="flex items-stretch justify-between gap-4 text-sm">
        {prev ? (
          <Link
            href={prev.navigableRoute || prev.route}
            className="flex-1 min-w-0 text-left text-subtle hover:text-heading transition-colors"
          >
            <span className="block text-xs uppercase tracking-wide opacity-70">
              Previous
            </span>
            <span className="block font-medium truncate">
              ← {prev.label || prev.title}
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}

        {!isFirst && !isLast && !isContentsPage ? (
          <Link
            href={contentsHref}
            className="self-center text-xs uppercase tracking-wide text-subtle hover:text-heading transition-colors whitespace-nowrap"
          >
            Contents
          </Link>
        ) : null}

        {next ? (
          <Link
            href={next.navigableRoute || next.route}
            className={cn(
              'flex-1 min-w-0 text-right transition-colors',
              isFirst
                ? 'text-primary hover:text-primary/80'
                : 'text-subtle hover:text-heading',
            )}
          >
            <span className="block text-xs uppercase tracking-wide opacity-70">
              {isFirst ? 'Start reading' : 'Next'}
            </span>
            <span className="block font-medium truncate">
              {next.label || next.title} →
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </div>
    </nav>
  )
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

function normalize(path) {
  return (path || '').replace(/^\//, '').replace(/\/$/, '')
}
