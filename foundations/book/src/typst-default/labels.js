/**
 * Per-language default labels for the built-in strings emitted by the
 * preamble and template.
 *
 * Right now the template/preamble emit two author-visible built-in
 * strings:
 *   - `chapter` — the "Chapter" overline in the chapter opener
 *     (preamble.typ, `#chapter-opener`).
 *   - `by` — the "by <author>" line on the title page (template.typ).
 *
 * A site's book language (`book.language` or the site's `language`)
 * selects the default table; site.yml's `book.labels:` overrides
 * individual entries without replacing the whole table.
 *
 * Missing languages fall back to English — a safe, common denominator.
 * Adding a language is a one-line entry in LABELS_BY_LANGUAGE.
 */

export const LABELS_BY_LANGUAGE = {
  en: { chapter: 'Chapter', by: 'by' },
  fr: { chapter: 'Chapitre', by: 'par' },
  es: { chapter: 'Capítulo', by: 'por' },
  de: { chapter: 'Kapitel', by: 'von' },
  pt: { chapter: 'Capítulo', by: 'por' },
  it: { chapter: 'Capitolo', by: 'di' },
  nl: { chapter: 'Hoofdstuk', by: 'door' },
}

export const DEFAULT_LABEL_LANGUAGE = 'en'

/**
 * Resolve labels for a given language, with optional per-site overrides.
 *
 * @param {object} [opts]
 * @param {string} [opts.language]  BCP-47 primary tag (e.g. 'en', 'fr-CA').
 * @param {object} [opts.overrides] Per-label overrides from site.yml.
 * @returns {{ chapter: string, by: string }}
 */
export function resolveLabels({ language, overrides } = {}) {
  const primary = (language || DEFAULT_LABEL_LANGUAGE).toLowerCase().split('-')[0]
  const base =
    LABELS_BY_LANGUAGE[primary] || LABELS_BY_LANGUAGE[DEFAULT_LABEL_LANGUAGE]
  return { ...base, ...(overrides || {}) }
}
