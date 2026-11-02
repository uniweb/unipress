import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Handlebars from 'handlebars'
import yaml from 'js-yaml'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { checkPaper, detectPaper, normalizePaper, regionOf } from '../src/paper.js'
import { buildDocumentYml } from '../src/materialize.js'
import { listCatalog } from '../src/catalog.js'
import { TEMPLATES } from '../src/templates-data.js'
import { loadContent } from '../src/content-loader.js'
import { ContentParseError, CompileError, ConfigValidationError } from '../src/errors.js'

const PKG_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')

describe('normalizePaper', () => {
  it('reads either name, in any case', () => {
    expect(normalizePaper('letter', 'x')).toBe('letter')
    expect(normalizePaper('A4', 'x')).toBe('a4')
    expect(normalizePaper(' Letter ', 'x')).toBe('letter')
  })

  it('reads none as none', () => {
    for (const none of [undefined, null, '']) expect(normalizePaper(none, 'x')).toBeNull()
  })

  it('refuses anything else, saying who named it', () => {
    expect(() => normalizePaper('legal', '--paper')).toThrow(ConfigValidationError)
    expect(() => normalizePaper('legal', 'document.yml')).toThrow(/document\.yml: "legal" is not a paper/)
    // `--paper` with no value reaches here as `true`.
    expect(() => normalizePaper(true, '--paper')).toThrow(/no paper named/)
  })
})

describe('regionOf', () => {
  it.each([
    ['en_CA.UTF-8', 'CA'],
    ['en-US', 'US'],
    ['zh_Hant_TW.UTF-8', 'TW'],
    ['fr_FR', 'FR'],
    ['pt-BR', 'BR'],
  ])('%s is %s', (tag, region) => expect(regionOf(tag)).toBe(region))

  it.each(['C', 'C.UTF-8', 'POSIX', 'en', 'es-419', '', null, undefined])('%s names none', (tag) =>
    expect(regionOf(tag)).toBeNull(),
  )
})

describe('detectPaper', () => {
  it.each(['US', 'CA', 'MX', 'PH'])('%s prints on Letter', (region) => {
    expect(detectPaper({ env: { LANG: `en_${region}.UTF-8` }, locale: null }).paper).toBe('letter')
  })

  it.each(['GB', 'FR', 'DE', 'AU', 'JP'])('%s prints on A4', (region) => {
    expect(detectPaper({ env: { LANG: `en_${region}.UTF-8` }, locale: null }).paper).toBe('a4')
  })

  it('takes the POSIX order: LC_ALL, then LC_PAPER, then LANG', () => {
    expect(detectPaper({ env: { LC_ALL: 'en_US', LC_PAPER: 'en_GB', LANG: 'en_GB' } }).region).toBe('US')
    expect(detectPaper({ env: { LC_PAPER: 'en_US', LANG: 'en_GB' } }).region).toBe('US')
  })

  it('does not read a C locale as the US, whatever Intl reports for it', () => {
    expect(detectPaper({ env: { LANG: 'C' }, locale: 'en-US' })).toEqual({ paper: 'a4', region: null })
  })

  it('asks Intl where no variable is set, as on Windows', () => {
    expect(detectPaper({ env: {}, locale: 'en-CA' })).toEqual({ paper: 'letter', region: 'CA' })
    expect(detectPaper({ env: {}, locale: 'de-DE' })).toEqual({ paper: 'a4', region: 'DE' })
  })

  it('says A4 with nothing to go by', () => {
    expect(detectPaper({ env: {}, locale: null })).toEqual({ paper: 'a4', region: null })
  })
})

describe('checkPaper', () => {
  const base = { format: 'pdf', foundationRef: '@acme/thing@1.0.0', configFile: 'document.yml' }

  it('has nothing to say when no paper is named, or the output takes one', () => {
    expect(checkPaper({ ...base, outputSpec: {}, paper: null, override: false })).toEqual([])
    expect(checkPaper({ ...base, outputSpec: { paper: true }, paper: 'a4', override: true })).toEqual([])
  })

  it('notes a format with no pages only when a build asked', () => {
    expect(checkPaper({ ...base, format: 'epub', outputSpec: { paper: false }, paper: 'a4', override: false })).toEqual([])
    expect(checkPaper({ ...base, format: 'epub', outputSpec: { paper: false }, paper: 'a4', override: true })[0]).toMatch(/no pages/)
  })

  it('stops a build that asked an output which does not say', () => {
    expect(() => checkPaper({ ...base, outputSpec: {}, paper: 'letter', override: true })).toThrow(CompileError)
  })

  it('notes a document stating a paper for an output which does not say', () => {
    const [note] = checkPaper({ ...base, outputSpec: {}, paper: 'letter', override: false })
    expect(note).toMatch(/paper: letter might do nothing/)
  })

  it('names the version to pin, for a bundled foundation under either name', () => {
    const pin = listCatalog().find((e) => e.id === 'book').foundation.ref
    for (const foundationRef of ['@unipress/book@0.4.3', '@uniweb/book@0.4.2']) {
      expect(() => checkPaper({ ...base, foundationRef, outputSpec: {}, paper: 'letter', override: true })).toThrow(pin)
    }
  })
})

describe('a document.yml written for a bare folder', () => {
  const base = { name: 'Notes', foundationRef: '@unipress/book@0.5.5', format: 'pdf', contentDir: 'content' }

  it('states the paper, and no trim beside it', () => {
    const doc = yaml.load(buildDocumentYml({ ...base, paper: 'letter' }))
    expect(doc.paper).toBe('letter')
    expect(doc.book.kind).toBe('article')
    expect(doc.book.trim).toBeUndefined()
  })

  it('states none where none was chosen', () => {
    expect(yaml.load(buildDocumentYml(base)).paper).toBeUndefined()
  })
})

describe('the templates', () => {
  const render = (id, vars) => {
    const entry = listCatalog().find((e) => e.id === id)
    const source = TEMPLATES[entry.scaffold]['document.yml.hbs']
    return yaml.load(Handlebars.compile(source, { noEscape: true })({ title: 'T', author: 'A', year: 2026, date: '2026-01-01', ...vars }))
  }

  it.each(listCatalog().filter((e) => e.takesPaper).map((e) => e.id))('%s states its paper', (id) => {
    expect(render(id, { paper: 'letter' }).paper).toBe('letter')
    expect(render(id, { paper: 'letter' }).book?.trim).toBeUndefined()
  })

  it.each(listCatalog().filter((e) => !e.takesPaper).map((e) => e.id))('%s keeps its trim until a paper is named', (id) => {
    const plain = render(id, { paper: 'letter', paperChosen: false })
    expect(plain.book.trim).not.toBe('letter')
    expect(plain.paper).toBeUndefined()
    expect(render(id, { paper: 'letter', paperChosen: true }).book.trim).toBe('letter')
  })
})

describe('the catalog', () => {
  it.each(listCatalog().map((e) => [e.id, e.foundation.ref]))('%s pins the version in foundations/: %s', (_id, ref) => {
    const [, name, version] = /^@[^/]+\/([^@]+)@(.+)$/.exec(ref)
    const pkg = JSON.parse(readFileSync(join(PKG_DIR, 'foundations', name, 'package.json'), 'utf8'))
    expect(version).toBe(pkg.version)
  })

  it('embeds each template as documents/ has it', () => {
    for (const entry of listCatalog()) {
      const source = readFileSync(join(PKG_DIR, 'documents', entry.scaffold, 'document.yml.hbs'), 'utf8')
      const embedded = TEMPLATES[entry.scaffold]['document.yml.hbs']
      // Only the `foundation:` line differs: a path here, a registry ref there.
      const body = (text) => text.replace(/^foundation:.*$/m, '')
      expect(body(embedded)).toBe(body(source))
    }
  })
})

describe('what the build refuses in a document', () => {
  let dir
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'unipress-refusal-'))
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('is the author\'s to fix, and a name retired since 0.4 says where to read how', async () => {
    writeFileSync(join(dir, 'document.yml'), 'name: Old\nfoundation: ./f\nformat: pdf\n')
    mkdirSync(join(dir, 'content'))
    writeFileSync(join(dir, 'content/01-a.md'), '---\ndata: bibliography\n---\n\n# A\n')
    const refused = await loadContent(dir).catch((e) => e)
    expect(refused).toBeInstanceOf(ContentParseError)
    expect(refused.message).toMatch(/`data:` is retired/)
    expect(refused.message).toMatch(/hint: .*Upgrading a document from 0\.4/)
    expect(refused.message).not.toMatch(/\[uniweb\]/)
  })
})
