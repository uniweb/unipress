// Foundation catalog loader.
//
// The catalog (`framework/unipress/foundations.yml`) enumerates the
// Press-based foundations unipress knows how to drive — each entry pairs a
// foundation source URL with a content scaffold. The `create` command uses
// it to present choices at scaffold time; the foundation-loader uses it to
// resolve a catalog id to a URL when document.yml's `foundation:` names a
// catalog entry.
//
// The catalog file is shipped with the unipress package. Loading is
// cached per-process.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import yaml from 'js-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const CATALOG_PATH = join(__dirname, '..', 'foundations.yml')

let cached = null

export function loadCatalog() {
  if (cached) return cached
  const raw = readFileSync(CATALOG_PATH, 'utf8')
  const parsed = yaml.load(raw)
  const entries = Array.isArray(parsed?.foundations) ? parsed.foundations : []
  cached = {
    entries,
    byId: new Map(entries.map((e) => [e.id, e])),
  }
  return cached
}

export function findCatalogEntry(id) {
  const { byId } = loadCatalog()
  return byId.get(id) || null
}

export function listCatalog() {
  return loadCatalog().entries
}
