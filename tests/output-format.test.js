import { describe, expect, it } from 'vitest'
import { checkOutPathFormat, formatOfOutPath } from '../src/output-format.js'
import { fontWarnings } from '../src/sinks/typst.js'

describe('what --out says about the format', () => {
  it('reads a name that can only be one thing', () => {
    expect(formatOfOutPath('o.pdf')).toBe('pdf')
    expect(formatOfOutPath('dist/My Book.EPUB')).toBe('epub')
    expect(formatOfOutPath('o.docx')).toBe('docx')
    expect(formatOfOutPath('o.xlsx')).toBe('xlsx')
    expect(formatOfOutPath('o.html')).toBe('pagedjs')
  })

  it('says nothing of a name that could be either bundle, or anything', () => {
    expect(formatOfOutPath('bundle.zip')).toBeNull()
    expect(formatOfOutPath('o.bin')).toBeNull()
    expect(formatOfOutPath('o')).toBeNull()
    expect(formatOfOutPath(null)).toBeNull()
    expect(formatOfOutPath(undefined)).toBeNull()
  })

  it('lets a build through when the name agrees, or has no opinion', () => {
    expect(() => checkOutPathFormat('o.pdf', 'pdf')).not.toThrow()
    expect(() => checkOutPathFormat('bundle.zip', 'typst')).not.toThrow()
    expect(() => checkOutPathFormat(null, 'pdf')).not.toThrow()
  })

  it('stops a build whose format is not what the file is called', () => {
    expect(() => checkOutPathFormat('o.pdf', 'xlsx')).toThrow(/writes xlsx.*\.pdf/s)
    expect(() => checkOutPathFormat('o.pdf', 'typst')).toThrow(/--format pdf/)
  })
})

describe("what Typst only warns about, and what's said of it", () => {
  const stderr = [
    'warning: unknown font family: eb garamond',
    '   ┌─ template.typ:4:9',
    '',
    'warning: unknown font family: garamond',
    'warning: unknown font family: eb garamond',
    'warning: `kai` is deprecated, use ϗ or `\\u{3d7}` instead',
  ].join('\n')

  it('names each missing font once', () => {
    const [note, ...rest] = fontWarnings(stderr)
    expect(rest).toEqual([])
    expect(note).toContain('eb garamond, garamond')
  })

  it('leaves out what is not the author\'s to act on', () => {
    expect(fontWarnings('warning: `kai` is deprecated, use ϗ instead')).toEqual([])
    expect(fontWarnings('')).toEqual([])
    expect(fontWarnings(undefined)).toEqual([])
  })
})
