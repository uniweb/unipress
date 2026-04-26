// Load a unipress content directory into a Uniweb content object.
//
// Wraps `collectSiteContent`, but tells it which top-level config file to
// read (document.yml or site.yml).
//
// Imports from `@uniweb/build/content` — the sharp/Vite/React-free entry
// designed for Bun-compiled binaries. `@uniweb/build/site` pulls in the
// image asset-processor (which eagerly loads sharp's native binding and
// blows up in a `bun build --compile` binary).

import { existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { collectSiteContent, processCollections } from '@uniweb/build/content'
import { detectConfigFile, CONFIG_FILE_NAMES } from './document-yml.js'
import { ContentDirectoryError, DocumentYmlError } from './errors.js'

// Match a parsed collection-backed fetch path. parseFetchConfig (in
// @uniweb/build) normalises `{ collection: <name> }` into
// `{ path: '/data/<name>.json', schema: <name>, ... }` — so this regex is
// the inverse: pull the collection name back out of the resolved path.
const COLLECTION_PATH_RE = /^\/data\/(.+)\.json$/

function attachData(section, schema, data) {
  if (!section || !schema) return
  if (!section.parsedContent) section.parsedContent = {}
  if (!section.parsedContent.data) section.parsedContent.data = {}
  // Don't clobber a section-level value with a cascaded page-level one.
  // The Block constructor will spread parsedContent.data through, so the
  // first writer wins for a given schema.
  if (section.parsedContent.data[schema] === undefined) {
    section.parsedContent.data[schema] = data
  }
}

function findCollectionRecords(fetchConfig, resolved) {
  if (!fetchConfig?.path || !fetchConfig?.schema) return null
  const m = COLLECTION_PATH_RE.exec(fetchConfig.path)
  if (!m) return null
  const records = resolved[m[1]]
  if (!Array.isArray(records)) return null
  return records
}

function attachSectionFetches(sections, resolved) {
  if (!Array.isArray(sections)) return
  for (const section of sections) {
    const records = findCollectionRecords(section.fetch, resolved)
    if (records) attachData(section, section.fetch.schema, records)
    if (Array.isArray(section.subsections) && section.subsections.length) {
      attachSectionFetches(section.subsections, resolved)
    }
  }
}

/**
 * Materialize file-based collections into each section's
 * `parsedContent.data` so the SSR render pipeline reads populated data
 * synchronously (no `useFetched` round-trip; no `public/` directory).
 *
 * In a regular Uniweb site build, the Vite plugin runs `processCollections`
 * + `writeCollectionFiles` and the runtime resolves `fetch:` declarations
 * over HTTP at render time. Under `unipress compile` neither of those
 * happens — there's no public dir, and SSR skips effects. We close the
 * gap by resolving collections in-memory and attaching the records
 * directly to each block's `parsedContent.data.<schema>`. The Block
 * constructor (framework/core/src/block.js) preserves that field, and
 * `prepareProps` then surfaces it as `content.data.<schema>` to the
 * component — same shape the runtime would produce.
 *
 * Page-level fetch cascades to every section on the page; section-level
 * fetch overrides on a per-section basis. Only collection-backed fetches
 * (parsed `path: '/data/<name>.json'`) are resolved here — remote URL
 * fetches, refine configs, and array-form `fetch: [...]` declarations
 * are left untouched (those have their own gaps; out of scope here).
 */
async function resolveLocalCollections(siteContent, sitePath) {
  const collectionsConfig = siteContent?.config?.collections
  if (!collectionsConfig || typeof collectionsConfig !== 'object') return
  if (Object.keys(collectionsConfig).length === 0) return

  const resolved = await processCollections(
    sitePath,
    collectionsConfig,
    sitePath,
    '/',
  )

  for (const page of siteContent.pages || []) {
    const pageRecords = findCollectionRecords(page.fetch, resolved)
    if (pageRecords) {
      for (const section of page.sections || []) {
        attachData(section, page.fetch.schema, pageRecords)
      }
    }
    attachSectionFetches(page.sections, resolved)
  }

  // Stash the resolved arrays on the website config too, so any section
  // (regardless of its own page's fetch declaration) can self-bootstrap
  // — e.g., a Cite inset rendering inside a Chapter on page A needs the
  // bibliography records that the Bibliography section declared on page
  // B. Foundations read this via `block.website.config.collections.<name>.records`
  // as a synchronous fallback.
  if (!siteContent.config) siteContent.config = {}
  if (!siteContent.config.collections) siteContent.config.collections = {}
  for (const name of Object.keys(resolved)) {
    const existing = siteContent.config.collections[name]
    siteContent.config.collections[name] = {
      ...(existing && typeof existing === 'object' ? existing : {}),
      records: resolved[name],
    }
  }
}

export async function loadContent(dir, options = {}) {
  const sitePath = resolve(dir)

  if (!existsSync(sitePath)) {
    throw new ContentDirectoryError(`content directory does not exist: ${sitePath}`)
  }

  const configFile = detectConfigFile(sitePath)
  if (!configFile) {
    throw new DocumentYmlError(
      `no ${CONFIG_FILE_NAMES.PRIMARY} (or ${CONFIG_FILE_NAMES.FALLBACK}) found in ${sitePath}`
    )
  }

  let content
  try {
    content = await collectSiteContent(sitePath, {
      configFile,
      foundationPath: options.foundationPath
    })
  } catch (err) {
    // js-yaml throws YAMLException with .mark.line/.column. Wrap it in
    // DocumentYmlError so the CLI reports it with a location hint
    // instead of a bare stack trace.
    if (err?.name === 'YAMLException') {
      const configPath = join(sitePath, configFile)
      const line = err?.mark?.line != null ? err.mark.line + 1 : null
      const col = err?.mark?.column != null ? err.mark.column + 1 : null
      const loc = line != null ? `${configPath}:${line}${col != null ? `:${col}` : ''}` : configPath
      throw new DocumentYmlError(
        `malformed YAML in ${configFile}\n` +
        `at ${loc}\n` +
        `cause: ${err.reason || err.message}`
      )
    }
    throw err
  }

  await resolveLocalCollections(content, sitePath)

  // Cross-reference registry is built AFTER the foundation loads, in
  // orchestrator.loadAndInit, so foundation-declared `xref.kinds`
  // contribute to the kind inference at id-collection time.

  return { content, configFile, sitePath }
}
