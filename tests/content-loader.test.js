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

describe('content-loader — alternate document config (--document)', () => {
  const dir = fixture('alt-document-config')

  it('reads document.yml by default', async () => {
    const { content, configFile } = await loadContent(dir)
    expect(configFile).toBe('document.yml')
    expect(content.config.name).toBe('Default Article')
    // Document profile: the root-level chapter is collected.
    const home = content.pages.find((p) => p.route === '/')
    expect(home?.sections?.some((s) => s.type === 'Chapter')).toBe(true)
  })

  it('reads an explicit alternate config and keeps the document profile', async () => {
    const { content, configFile } = await loadContent(dir, {
      configFile: 'document-book.yml',
    })
    expect(configFile).toBe('document-book.yml')
    expect(content.config.name).toBe('Book Cut')
    // Prefix-matched to the document profile (not the site fallback), so the
    // root chapter still resolves from the alternate config.
    const home = content.pages.find((p) => p.route === '/')
    expect(home?.sections?.some((s) => s.type === 'Chapter')).toBe(true)
  })

  it('scans config-declared cover assets from the alternate config', async () => {
    const { content } = await loadContent(dir, { configFile: 'document-book.yml' })
    // book.covers.front must land in the asset manifest so the foundation's
    // loadAsset can resolve it at compile time. This is the exact path that
    // silently dropped when covers rode a `--config` override instead of the
    // config unipress actually reads.
    const cover = content.assets['assets/cover.png']
    expect(cover, 'cover should be registered in website.assets').toBeTruthy()
    expect(cover.resolved.endsWith('/assets/cover.png')).toBe(true)
  })

  it('throws when the named --document config does not exist', async () => {
    await expect(
      loadContent(dir, { configFile: 'document-missing.yml' }),
    ).rejects.toThrow(/document-missing\.yml/)
  })
})
