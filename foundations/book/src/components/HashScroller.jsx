import { useEffect } from 'react'
import { useRouting } from '@uniweb/kit'

/**
 * HashScroller — scrolls to `window.location.hash` whenever the route or
 * hash changes. React Router's client-side navigation doesn't resolve
 * hash fragments on its own, and Uniweb's runtime does per-page scroll
 * restoration which competes with the initial anchor scroll. To win
 * both races we:
 *
 *   1. Retry while the target DOM element doesn't exist yet (chapter
 *      content is lazy-loaded and streams in after mount).
 *   2. Keep re-asserting the scroll position for a short window after
 *      the target first appears, so any runtime-side scrollTo(0) from
 *      scroll restoration is overridden.
 *
 * Mounted once in BookLayout; renders nothing.
 */
export default function HashScroller() {
  const { useLocation } = useRouting()
  const location = useLocation()

  useEffect(() => {
    const hash = (location?.hash || '').replace(/^#/, '')
    if (!hash) return

    let cancelled = false
    const deadline = Date.now() + 4000 // stop after 4s total

    const isInView = (el) => {
      const top = el.getBoundingClientRect().top
      return top >= -5 && top < 200
    }

    const scroll = () => {
      if (cancelled) return
      const el = document.getElementById(hash)
      if (el && !isInView(el)) {
        el.scrollIntoView({ block: 'start', behavior: 'auto' })
      }
      if (Date.now() < deadline) {
        // Re-assert periodically to survive scroll restoration that might
        // reset scroll position after our first scroll.
        setTimeout(scroll, 80)
      }
    }

    scroll()

    return () => {
      cancelled = true
    }
  }, [location?.pathname, location?.hash])

  return null
}
