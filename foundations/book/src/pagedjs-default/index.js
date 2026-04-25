/**
 * Paged.js defaults for @uniweb/book — CSS Paged Media stylesheet
 * passed to @uniweb/press's Paged.js adapter.
 *
 * Exports:
 *   - stylesheet: default CSS string (6×9 trade size, chapter openers on
 *     recto, running headers via `string-set` / `string()`, page numbers
 *     in footer margin boxes).
 *
 * compile-options.js passes the exported string as
 * `adapterOptions.stylesheet` on Press's `compileSubtree('pagedjs', …)` call.
 */
export { default as stylesheet } from './stylesheet.js'
