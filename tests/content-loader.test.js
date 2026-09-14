import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { loadContent } from '../src/content-loader.js'
import { variantToConfigFile } from '../src/commands/compile.js'

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
  // `query:` declaration must reach sections nested via page.yml `nest:`, not
  // just top-level sections. Before the fix the cascade stopped at the top
  // level, so a nested child's content handler (e.g. Loom `source:`) ran with
  // an empty `parsedContent.data` and produced no rows while its heading still
  // rendered. See fixtures/nested-page-data.
  it('cascades a page-level `query:` declaration into nested child sections', async () => {
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

describe('content-loader — a page or section that declares several queries', () => {
  // `query: [members, views]` is a LIST of fetches. Until 2026-09-14 only a single
  // fetch was attached, so a page declaring two queries — the data-report document's
  // `query: [members, queries]` — compiled with neither, and its report sections
  // rendered their headings over no rows.
  it('attaches every query of a page-level list to each section, under its own key', async () => {
    const { content } = await loadContent(fixture('multi-query-page'))
    const page = pageWithSection(content, 'summary')
    const summary = page.sections.find((s) => s.stableId === 'summary')
    expect(summary.parsedContent?.data?.members?.map((m) => m.name).sort()).toEqual(['Ada', 'Grace'])
    expect(summary.parsedContent?.data?.views?.map((v) => v.title)).toEqual(['All members'])
  })

  it('a section\'s own list is attached too, and the page\'s fills the keys it does not name', async () => {
    const { content } = await loadContent(fixture('multi-query-page'))
    const own = pageWithSection(content, 'own').sections.find((s) => s.stableId === 'own')
    expect(own.parsedContent?.data?.views?.map((v) => v.title)).toEqual(['All members'])
    expect(own.parsedContent?.data?.members?.length).toBe(2)
  })

  // A fetch receives what it selects, as on a website: the query as saved (its `sort` and
  // `limit`, which the build leaves to the runtime), then the fetch's own `where`, `sort`
  // and `limit`. Until 2026-09-14 every fetch received the query's whole compiled file.
  it('a fetch receives what it selects — its query\'s sort and limit, then its own narrowing', async () => {
    const { content } = await loadContent(fixture('narrowed-fetch'))
    const sections = pageWithSection(content, 'one').sections
    const names = (id, key) => sections.find((s) => s.stableId === id).parsedContent?.data?.[key]?.map((m) => m.name)
    expect(names('one', 'members')).toEqual(['Grace'])
    expect(names('newest', 'newest')).toEqual(['Grace'])
    expect(names('two', 'members')).toEqual(['Linus', 'Grace'])
  })

  it('CONTROL — the records by query stay whole', async () => {
    const { content } = await loadContent(fixture('narrowed-fetch'))
    expect(content.config.recordsByQuery.members.map((m) => m.name).sort()).toEqual(['Ada', 'Grace', 'Linus'])
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

  it('throws when the named --variant config does not exist', async () => {
    await expect(
      loadContent(dir, { configFile: 'document-missing.yml' }),
    ).rejects.toThrow(/document-missing\.yml/)
  })
})

describe('variantToConfigFile — --variant name resolution', () => {
  it('assumes a .yml extension when none is given', () => {
    expect(variantToConfigFile('book')).toBe('book.yml')
    expect(variantToConfigFile('document-book')).toBe('document-book.yml')
  })

  it('keeps an explicit .yml / .yaml extension', () => {
    expect(variantToConfigFile('book.yml')).toBe('book.yml')
    expect(variantToConfigFile('print.yaml')).toBe('print.yaml')
  })

  it('uses the name verbatim — no document- prefixing', () => {
    expect(variantToConfigFile('book')).toBe('book.yml')
    expect(variantToConfigFile('book')).not.toBe('document-book.yml')
  })

  it('returns null when unset', () => {
    expect(variantToConfigFile(null)).toBe(null)
    expect(variantToConfigFile('')).toBe(null)
  })
})

describe('content-loader — a variant config gets the document profile', () => {
  it('reads a non-"document"-named config with the document profile', async () => {
    const { content } = await loadContent(fixture('variant-profile'), {
      configFile: 'book.yml',
    })
    // Document profile = folder mode: each chapter markdown is its own page.
    // Under the site profile they would collapse into sections of one page,
    // so counting Chapter-bearing pages proves unipress forces the document
    // profile regardless of the config's filename (book.yml has no prefix).
    const chapterPages = content.pages.filter((p) =>
      p.sections?.some((s) => s.type === 'Chapter'),
    )
    expect(chapterPages.length).toBe(2)
  })
})
