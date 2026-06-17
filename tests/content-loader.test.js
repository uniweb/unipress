import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { loadContent } from '../src/content-loader.js'

const here = dirname(fileURLToPath(import.meta.url))
const fixture = (name) => join(here, 'fixtures', name)

// Locate the page that owns a top-level section with the given stableId.
function pageWithSection(content, stableId) {
  return (content.pages || []).find((p) =>
    (p.sections || []).some((s) => s.stableId === stableId),
  )
}

describe('content-loader — local collection resolution', () => {
  // Regression guard for the unipress-compile nested-data bug: a page-level
  // `data:` declaration must reach sections nested via page.yml `nest:`, not
  // just top-level sections. Before the fix the cascade stopped at the top
  // level, so a nested child's content handler (e.g. Loom `source:`) ran with
  // an empty `parsedContent.data` and produced no rows while its heading still
  // rendered. See fixtures/nested-page-data.
  it('cascades a page-level `data:` declaration into nested child sections', async () => {
    const { content } = await loadContent(fixture('nested-page-data'))

    const page = pageWithSection(content, 'parent')
    expect(page, 'fixture should expose a page with a "parent" section').toBeTruthy()

    const parent = page.sections.find((s) => s.stableId === 'parent')
    const child = parent.subsections?.[0]
    expect(child?.stableId, '"parent" should own the nested "child" subsection').toBe('child')

    const parentData = parent.parsedContent?.data?.profile
    const childData = child.parsedContent?.data?.profile

    // Top-level section receives the page-level cascade (always worked).
    expect(Array.isArray(parentData)).toBe(true)
    expect(parentData.length).toBeGreaterThan(0)

    // The nested child must receive the same page-level data. This is the
    // assertion that failed before the cascade was threaded through the
    // recursive section walk.
    expect(Array.isArray(childData)).toBe(true)
    expect(childData.length).toBe(parentData.length)
  })
})
