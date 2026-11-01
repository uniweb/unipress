/**
 * Sort bibliography records before formatting.
 *
 * citestyle sorts too: an author-date style (APA / MLA / Chicago author-date /
 * Harvard) has a compiled comparator, which decides its order. So this helper
 * matters for what a style leaves open, under a numbered style like IEEE,
 * Vancouver or Nature, which has none:
 *
 *   1. The document's own list runs in order of first citation, so `[1]` is the
 *      first source a reader meets. This orders the records nothing cites,
 *      which come after those.
 *
 *   2. A list of its own, such as further reading, runs in this order: nothing
 *      cites into it.
 *
 * Sort modes:
 *   - 'author' (default): last name asc, then year asc.
 *   - 'year':             year desc, then last name asc.
 *   - 'collection-order': stable identity — leave records as-is.
 */

function lastName(record) {
  const a = record?.author
  if (Array.isArray(a) && a.length > 0) {
    const first = a[0]
    if (typeof first === 'string') return first.split(/[ ,]/)[0].toLowerCase()
    return String(first?.family || first?.literal || '').toLowerCase()
  }
  if (typeof a === 'string') return a.split(/[ ,]/)[0].toLowerCase()
  return ''
}

function yearOf(record) {
  if (record?.year != null) return Number(record.year) || 0
  const dp = record?.issued?.['date-parts']
  if (Array.isArray(dp) && Array.isArray(dp[0]) && dp[0][0] != null) {
    return Number(dp[0][0]) || 0
  }
  if (record?.issued?.year != null) return Number(record.issued.year) || 0
  return 0
}

export function sortBibliography(records, sortBy = 'author') {
  if (!Array.isArray(records)) return []
  if (sortBy === 'collection-order') return records.slice()

  const copy = records.slice()
  if (sortBy === 'year') {
    copy.sort((a, b) => {
      const dy = yearOf(b) - yearOf(a)
      if (dy !== 0) return dy
      return lastName(a).localeCompare(lastName(b))
    })
    return copy
  }
  // default: 'author'
  copy.sort((a, b) => {
    const dn = lastName(a).localeCompare(lastName(b))
    if (dn !== 0) return dn
    return yearOf(a) - yearOf(b)
  })
  return copy
}
