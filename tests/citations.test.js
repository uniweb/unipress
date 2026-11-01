/**
 * How a document numbers its sources, and which it lists.
 *
 * A numbered style's own rule is order of first citation, so the first source a reader meets is
 * `[1]`. citestyle's registry numbers what it is given in the order it is given, so what decides this
 * is when a record is handed to it. The biblatex path gets it from biblatex, and the two must agree.
 */

import { bibliographyEntries } from '../foundations/book/src/utils/cite-registry.js'
import { formatCite } from '../foundations/book/src/utils/cite-format.js'
import * as ieee from '../foundations/book/node_modules/citestyle/src/styles/ieee.js'
import * as vancouver from '../foundations/book/node_modules/citestyle/src/styles/vancouver.js'
import * as apa from '../foundations/book/node_modules/citestyle/src/styles/apa.js'

const record = (id, family, year = 1970) => ({ id, type: 'book', author: `${family}, A.`, title: `${family}'s book`, publisher: 'P', year })

// As a loader gives them: in file order, so alphabetical by key.
const documentOf = (records = [record('arora', 'Arora'), record('garey', 'Garey'), record('karp', 'Karp'), record('turing', 'Turing')]) => ({
  config: { recordsByQuery: { bibliography: records } },
})
const cited = (website, style, key) => formatCite({ key }, website, style)?.text

describe('a numbered style', () => {
  it('numbers its sources in the order the text first cites them', () => {
    const website = documentOf()
    expect(cited(website, ieee, 'karp')).toBe('[1]')
    expect(cited(website, ieee, 'garey')).toBe('[2]')
    expect(cited(website, ieee, 'arora')).toBe('[3]')
  })

  it('numbers a cluster in the order it is written', () => {
    expect(cited(documentOf(), ieee, 'karp; garey')).toBe('[1], [2]')
  })

  it('keeps a number for good, at every later citation', () => {
    const website = documentOf()
    cited(website, ieee, 'karp')
    cited(website, ieee, 'garey')
    expect(cited(website, ieee, 'karp')).toBe('[1]')
    expect(cited(website, ieee, 'garey')).toBe('[2]')
    expect(cited(website, ieee, 'garey; karp')).toBe('[2], [1]')
  })

  it('lists them by those numbers, then what nothing cites in the order the section gives', () => {
    const website = documentOf()
    cited(website, ieee, 'karp; garey')
    const items = website.config.recordsByQuery.bibliography.map((r) => ({ ...r, id: r.id, author: [{ family: r.author.split(',')[0], given: 'A.' }] }))
    const list = bibliographyEntries(website, ieee, items).map((entry) => entry.text)

    expect(list).toHaveLength(4)
    expect(list[0]).toMatch(/^\[1\].*Karp/)
    expect(list[1]).toMatch(/^\[2\].*Garey/)
    expect(list[2]).toMatch(/^\[3\].*Arora/)
    expect(list[3]).toMatch(/^\[4\].*Turing/)
  })

  it('holds for the other numbered styles', () => {
    const website = documentOf()
    expect(cited(website, vancouver, 'karp')).toContain('1')
    expect(cited(website, vancouver, 'garey')).toContain('2')
  })

  it('leaves a key nothing resolves out of the count', () => {
    const website = documentOf()
    expect(cited(website, ieee, 'nosuch')).toBeUndefined()
    expect(cited(website, ieee, 'karp')).toBe('[1]')
  })
})

describe('an author-date style', () => {
  it('cites by author and year, and lists alphabetically, whatever is cited first', () => {
    const website = documentOf()
    expect(cited(website, apa, 'karp')).toContain('Karp')
    const items = website.config.recordsByQuery.bibliography.map((r) => ({ ...r, author: [{ family: r.author.split(',')[0], given: 'A.' }] }))
    expect(bibliographyEntries(website, apa, items).map((entry) => entry.text.split(',')[0])).toEqual(['Arora', 'Garey', 'Karp', 'Turing'])
  })

  it('tells two of one author\'s works from one year apart, from the first citation on', () => {
    const website = documentOf([record('smith-b', 'Smith', 2020), record('smith-a', 'Smith', 2020)])
    const first = cited(website, apa, 'smith-a')
    const second = cited(website, apa, 'smith-b')
    expect(first).toMatch(/2020[ab]/)
    expect(second).toMatch(/2020[ab]/)
    expect(first).not.toBe(second)
  })
})

describe('a bibliography section', () => {
  const further = [{ id: 'gould', type: 'book', author: [{ family: 'Gould', given: 'S.' }], title: 'Structure', publisher: 'P', issued: { 'date-parts': [[2002]] } }]

  it('with a list of its own prints that list, and leaves the document\'s alone', () => {
    const website = documentOf()
    cited(website, ieee, 'karp')

    const own = bibliographyEntries(website, ieee, further).map((entry) => entry.text)
    expect(own).toHaveLength(1)
    expect(own[0]).toContain('Gould')

    const items = website.config.recordsByQuery.bibliography.map((r) => ({ ...r, author: [{ family: r.author.split(',')[0], given: 'A.' }] }))
    const main = bibliographyEntries(website, ieee, items).map((entry) => entry.text)
    expect(main).toHaveLength(4)
    expect(main.join()).not.toContain('Gould')
  })

  it('under an author-date style too', () => {
    const own = bibliographyEntries(documentOf(), apa, further).map((entry) => entry.text)
    expect(own).toHaveLength(1)
    expect(own[0]).toContain('Gould')
  })

  it('with no records prints nothing', () => {
    expect(bibliographyEntries(documentOf(), ieee, [])).toEqual([])
  })
})
