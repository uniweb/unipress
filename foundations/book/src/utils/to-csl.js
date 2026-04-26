/**
 * Normalize bibliography records to CSL-JSON for citestyle.
 *
 * Two authoring shapes are accepted (per the v0.3 plan, §8.5):
 *
 *   Flat / simplified:
 *     id: darwin1859
 *     type: book
 *     author: "Darwin, Charles"
 *     title: "On the Origin of Species"
 *     publisher: "John Murray"
 *     year: 1859
 *
 *   Full CSL-JSON:
 *     id: darwin1859
 *     type: book
 *     author: [{ family: Darwin, given: Charles }]
 *     title: "On the Origin of Species"
 *     publisher: "John Murray"
 *     issued: { date-parts: [[1859]] }
 *
 * The boundary normalises author strings, the `year:` shorthand, and the
 * common journal/publisher fields. Anything already in CSL-JSON shape
 * passes through. Unknown fields ride along unchanged so foundation-side
 * extensions don't have to teach this helper.
 */

function parseFullName(full) {
  // "Darwin, Charles" -> { family: 'Darwin', given: 'Charles' }
  // "Charles Darwin"  -> { family: 'Darwin', given: 'Charles' }
  // "Darwin"          -> { family: 'Darwin', given: '' }
  const s = String(full || '').trim()
  if (!s) return { family: 'Unknown', given: '' }
  const comma = s.indexOf(',')
  if (comma !== -1) {
    return {
      family: s.slice(0, comma).trim(),
      given: s.slice(comma + 1).trim(),
    }
  }
  const parts = s.split(/\s+/)
  if (parts.length === 1) return { family: parts[0], given: '' }
  const family = parts[parts.length - 1]
  const given = parts.slice(0, -1).join(' ')
  return { family, given }
}

function normalizeAuthor(author) {
  if (!author) return undefined
  if (Array.isArray(author)) {
    return author
      .map((a) => {
        if (a == null) return null
        if (typeof a === 'string') return parseFullName(a)
        // Already in CSL name shape — pass through, but strip empty keys.
        if (a.family || a.given || a.literal) return a
        return null
      })
      .filter(Boolean)
  }
  if (typeof author === 'string') return [parseFullName(author)]
  if (typeof author === 'object' && (author.family || author.given || author.literal)) {
    return [author]
  }
  return undefined
}

function normalizeIssued(record) {
  // Already CSL-shaped? trust it.
  if (record.issued && (record.issued['date-parts'] || record.issued.literal || record.issued.raw)) {
    return record.issued
  }
  // Object form `{ year, month?, day? }`.
  if (record.issued && typeof record.issued === 'object') {
    const { year, month, day } = record.issued
    if (year != null) {
      const parts = [Number(year)]
      if (month != null) parts.push(Number(month))
      if (day != null) parts.push(Number(day))
      return { 'date-parts': [parts] }
    }
  }
  // Flat `year:` shorthand.
  if (record.year != null) {
    return { 'date-parts': [[Number(record.year) || record.year]] }
  }
  return undefined
}

/**
 * Convert one record to CSL-JSON. Returns null if the record is too thin
 * to format (missing id and title both).
 */
export function recordToCsl(record) {
  if (!record || typeof record !== 'object') return null

  const id = record.id ?? record.key
  if (!id && !record.title) return null

  // Pass through unknown fields. CSL-JSON has lots of optional keys we
  // don't want to enumerate — anything not handled below rides along.
  const csl = { ...record }

  // Required
  csl.id = String(id ?? `${(record.title || 'entry').slice(0, 24)}`)
  csl.type = record.type || 'book'

  // Author family
  const author = normalizeAuthor(record.author)
  if (author) csl.author = author
  else delete csl.author
  for (const role of ['editor', 'translator', 'container-author']) {
    const v = normalizeAuthor(record[role])
    if (v) csl[role] = v
  }

  // Date
  const issued = normalizeIssued(record)
  if (issued) csl.issued = issued
  delete csl.year

  // Common journal-article shorthands.
  if (record.journal && !record['container-title']) {
    csl['container-title'] = record.journal
    delete csl.journal
  }
  if (record.pages && !record.page) {
    csl.page = record.pages
    delete csl.pages
  }

  return csl
}

/**
 * Convert a list of records to CSL-JSON, dropping any that fail to
 * normalize. Preserves input order — sorting is the caller's job.
 */
export function recordsToCsl(records) {
  if (!Array.isArray(records)) return []
  return records.map(recordToCsl).filter(Boolean)
}
