/**
 * Chapter — the default section type for book pages.
 *
 * Expects article-shaped markdown: one H1 title, flat prose with inline
 * marks, fenced code blocks, lists, tables, blockquotes, and images. The
 * foundation's BookLayout wraps chapters in <DocumentProvider>; on
 * Download, each Chapter's Typst fragment is compiled into the book.
 */
export default {
  defaults: {
    chapterNumber: null,
  },
}
