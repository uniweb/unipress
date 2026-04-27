/**
 * LaTeX defaults for @uniweb/book — shared LaTeX preamble + template
 * passed to @uniweb/press's latex adapter.
 *
 * Mirrors typst-default/index.js. Exports:
 *   - preamble: default preamble string (commands chapteropener,
 *     sectionbreak, …), equivalent to `createPreamble()`.
 *   - template: default template string (\\documentclass{book}, 6x9,
 *     generic typography, hyperref), equivalent to `createTemplate()`.
 *   - createPreamble({ language, labels, citationStyle }): builder for
 *     parameterised preamble (forward-compatible with thesis-uoft).
 *   - createTemplate({ trim, language, covers }): builder for a full
 *     parameterised template string.
 *
 * compile-options.js's buildLatexOptions passes these as
 * adapterOptions.preamble / adapterOptions.template on Press's
 * compileSubtree('latex', …) call.
 */

export { default as preamble, createPreamble } from './preamble.js'
export { default as template, createTemplate } from './template.js'
