import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { detectBareContent, buildDocumentYml } from '../src/materialize.js'

let dir
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'unipress-materialize-'))
})
afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

function write(rel, body = '# x\n') {
  const p = join(dir, rel)
  mkdirSync(join(p, '..'), { recursive: true })
  writeFileSync(p, body)
}

describe('detectBareContent', () => {
  it('finds loose root-level markdown, ordered, with prefixes stripped', () => {
    write('00-intro.md')
    write('10-later.md')
    write('2-second.md')
    write('appendix.md')
    const bare = detectBareContent(dir)
    expect(bare.contentDir).toBe('.')
    // numeric prefixes sort numerically (2 < 10), strip to stable names;
    // unprefixed names sort last.
    expect(bare.chapters).toEqual(['intro', 'second', 'later', 'appendix'])
  })

  it('excludes README.md, drafts (_), and nested child sections (@)', () => {
    write('README.md')
    write('readme.md') // case-insensitive
    write('_draft.md')
    write('@child.md')
    write('chapter.md')
    const bare = detectBareContent(dir)
    expect(bare.chapters).toEqual(['chapter'])
  })

  it('prefers a content/ subfolder over loose root markdown', () => {
    write('content/01-a.md')
    write('content/02-b.md')
    write('stray.md')
    const bare = detectBareContent(dir)
    expect(bare.contentDir).toBe('content')
    expect(bare.chapters).toEqual(['a', 'b'])
  })

  it('falls back to a pages/ subfolder when content/ has no markdown', () => {
    mkdirSync(join(dir, 'content'), { recursive: true })
    writeFileSync(join(dir, 'content', 'theme.yml'), 'x: 1\n') // no .md
    write('pages/01-a.md')
    const bare = detectBareContent(dir)
    expect(bare.contentDir).toBe('pages')
    expect(bare.chapters).toEqual(['a'])
  })

  it('returns null when no markdown is found anywhere', () => {
    write('notes.txt', 'hi')
    expect(detectBareContent(dir)).toBeNull()
  })
})

describe('buildDocumentYml', () => {
  const base = {
    name: 'My Doc',
    foundationRef: '@uniweb/book@0.3.0',
    format: 'pdf',
    chapters: ['intro', 'body']
  }

  it('adds paths: { pages: . } for root-level content and lists chapters with a trailing ...', () => {
    const yml = buildDocumentYml({ ...base, contentDir: '.' })
    expect(yml).toContain('paths:')
    expect(yml).toContain('  pages: .')
    expect(yml).toContain('content:')
    expect(yml).toContain('  - intro')
    expect(yml).toContain('  - body')
    expect(yml.trimEnd().endsWith('  - ...')).toBe(true)
  })

  it('omits the paths block when content lives in a subfolder', () => {
    const yml = buildDocumentYml({ ...base, contentDir: 'content' })
    expect(yml).not.toContain('paths:')
    expect(yml).toContain('content:')
  })

  it('emits a book block for the book foundation, quoting the title', () => {
    const yml = buildDocumentYml({ ...base, contentDir: '.', name: 'A: B' })
    expect(yml).toContain('book:')
    expect(yml).toContain('  title: "A: B"')
    expect(yml).toContain('name: "A: B"')
  })

  it('omits the book block for a non-book foundation', () => {
    const yml = buildDocumentYml({ ...base, contentDir: '.', foundationRef: '@uniweb/data@0.1.0' })
    expect(yml).not.toContain('book:')
    expect(yml).toContain('foundation: "@uniweb/data@0.1.0"')
  })
})
