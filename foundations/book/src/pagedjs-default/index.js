/**
 * Paged.js defaults for @unipress/book — CSS Paged Media stylesheet
 * passed to @uniweb/press's Paged.js adapter.
 *
 * Exports:
 *   - createStylesheet({ trim, kind }): the CSS for a document, on the same
 *     page the Typst and LaTeX paths print on. The book genre puts chapter
 *     openers on recto, with running headers via `string-set` / `string()`
 *     and page numbers in footer margin boxes.
 *   - stylesheet: the default, `createStylesheet()` (6×9 trade size).
 *
 * compile-options.js passes what it returns as `adapterOptions.stylesheet`
 * on Press's `compileSubtree('pagedjs', …)` call.
 */
export { default as stylesheet, createStylesheet } from './stylesheet.js'
