// Foundation catalog loader.
//
// The catalog (`src/foundations-data.js`) enumerates the Press-based
// foundations unipress knows how to drive — each entry pairs a foundation
// source URL with a content scaffold. The `create` command uses it to
// present choices at scaffold time; the foundation-loader uses it to
// resolve a catalog id to a URL when document.yml's `foundation:` names a
// catalog entry.
//
// Stored as a JS module (not YAML) so `bun build --compile` can inline the
// data at bundle time — see foundations-data.js for the rationale.

import { FOUNDATIONS } from './foundations-data.js'

const byId = new Map(FOUNDATIONS.map((e) => [e.id, e]))

export function findCatalogEntry(id) {
  return byId.get(id) || null
}

export function listCatalog() {
  return FOUNDATIONS
}
