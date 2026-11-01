/**
 * A chapter's sections as its contents entry lists them: from the sequence the chapter is drawn from,
 * each with the anchor `<Render>` stamps. ⛔ Until 0.5.4 they came from the raw nodes, and the id was made
 * again from the text: the characters of `<path>` in a heading read as an element and were dropped, an
 * authored `{#id}` was left out, and those links led nowhere.
 */
import { headingId, stripTags } from '@uniweb/kit'

export function chapterSections(block) {
  return (block?.parsedContent?.sequence || [])
    .filter((element) => element?.type === 'heading' && element.level === 2 && element.attrs?.role !== 'pretitle')
    .map((element) => ({
      text: stripTags(element.text),
      slug: element.attrs?.id || element.id || headingId(element.text),
    }))
}
