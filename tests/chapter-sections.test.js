/**
 * A contents entry on the web links to an id the chapter's renderer stamps, so it takes that id from
 * what that renderer reads.
 */
import { chapterSections } from '../foundations/book/src/utils/chapter-sections.js'

const heading = (level, text, attrs = {}) => ({ type: 'heading', level, text, attrs })
const blockOf = (...sequence) => ({ parsedContent: { sequence } })

describe('a chapter\'s sections', () => {
  it('are its level 2 headings', () => {
    const block = blockOf(heading(1, 'Chapter'), heading(2, 'First'), heading(3, 'Deeper'), { type: 'paragraph', text: 'x' }, heading(2, 'Second'))
    expect(chapterSections(block).map((s) => s.slug)).toEqual(['first', 'second'])
  })

  it('keep the word a reader sees in `<path>`, as the parser escapes it', () => {
    expect(chapterSections(blockOf(heading(2, 'A file does not exist: &lt;path&gt;')))).toEqual([
      { text: 'A file does not exist: <path>', slug: 'a-file-does-not-exist-path' },
    ])
  })

  it('read no markup, and take the id the author wrote', () => {
    expect(chapterSections(blockOf(heading(2, 'With <em>marks</em>', { id: 'my-own-id' })))).toEqual([{ text: 'With marks', slug: 'my-own-id' }])
  })

  it('leave out a label line, which has no anchor', () => {
    expect(chapterSections(blockOf(heading(2, 'A label', { role: 'pretitle' })))).toEqual([])
  })

  it('are none for a block with no content', () => {
    expect(chapterSections(undefined)).toEqual([])
  })
})
