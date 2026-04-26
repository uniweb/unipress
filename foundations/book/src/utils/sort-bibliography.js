/**
 * Sort bibliography records before formatting.
 *
 * The downstream citestyle path also sorts: `formatAll` and
 * `getBibliography()` apply the style's compiled comparator (alphabetical
 * for APA / MLA / Chicago author-date / Harvard; insertion order for
 * numbered styles like IEEE / Vancouver / Nature). This helper feeds the
 * pre-sort, which matters in two cases:
 *
 *   1. Numbered styles (`citation-number` collapse) preserve insertion
 *      order — so the order they receive items in is the order the
 *      bibliography lists them. `sortBy: 'author'` here flips that to
 *      alphabetical for the rare report that wants a numbered list of
 *      sources sorted by author.
 *
 *   2. The `formatAll` no-registry path passes the comparator the items
 *      in pre-sort order, which becomes a tiebreaker for entries the
 *      style sees as equivalent (same year + same author).
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
