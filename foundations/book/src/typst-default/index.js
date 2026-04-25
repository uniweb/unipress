/**
 * Typst defaults for @uniweb/book — shared Typst preamble + template
 * passed to @uniweb/press's typst adapter.
 *
 * Exports:
 *   - preamble: default preamble string (English labels), equivalent to
 *     `createPreamble()`.
 *   - template: default template string (trade-6x9, default typography,
 *     English labels, full front matter), equivalent to `createTemplate()`.
 *   - createPreamble({ language, labels }): builder for localized preamble.
 *   - createTemplate({ trim, typography, structure, labels, language, covers }):
 *     builder for a full, parameterised template string.
 *   - TRIM_PRESETS, DEFAULT_TYPOGRAPHY, DEFAULT_STRUCTURE,
 *     resolveTrim, resolveTypography, resolveStructure, normaliseFontList
 *   - LABELS_BY_LANGUAGE, resolveLabels
 *
 * compile-options.js passes the strings returned by createPreamble /
 * createTemplate as `adapterOptions.preamble` / `adapterOptions.template`
 * on Press's `compileSubtree('typst', …)` call.
 */
export { default as preamble } from './preamble.js'
export { default as template } from './template.js'
export { createPreamble } from './create-preamble.js'
export { createTemplate } from './create-template.js'
export {
  TRIM_PRESETS,
  DEFAULT_TRIM,
  DEFAULT_TYPOGRAPHY,
  DEFAULT_STRUCTURE,
  resolveTrim,
  resolveTypography,
  resolveStructure,
  normaliseFontList,
} from './presets.js'
export {
  LABELS_BY_LANGUAGE,
  DEFAULT_LABEL_LANGUAGE,
  resolveLabels,
} from './labels.js'
