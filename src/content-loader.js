// Load a unipress content directory into a Uniweb content object.
//
// Wraps `collectSiteContent`, but tells it which top-level config file to
// read (document.yml or site.yml).
//
// Imports from `@uniweb/build/content` — the sharp/Vite/React-free entry
// designed for Bun-compiled binaries. `@uniweb/build/site` pulls in the
// image asset-processor (which eagerly loads sharp's native binding and
// blows up in a `bun build --compile` binary).

import { existsSync, readdirSync } from 'node:fs'
import { resolve, join, basename } from 'node:path'
import { collectSiteContent, processQueries } from '@uniweb/build/content'
import { detectConfigFile, CONFIG_FILE_NAMES } from './document-yml.js'
import { ContentDirectoryError, DocumentYmlError } from './errors.js'

// Match a parsed collection-backed fetch path. parseFetchConfig (in
// @uniweb/build) normalises `{ collection: <name> }` into
// `{ path: '/data/<name>.json', schema: <name>, ... }` — so this regex is
// the inverse: pull the collection name back out of the resolved path.
const COLLECTION_PATH_RE = /^\/data\/(.+)\.json$/

function attachData(section, key, data) {
  if (!section || !key) return
  if (!section.parsedContent) section.parsedContent = {}
  if (!section.parsedContent.data) section.parsedContent.data = {}
  // Don't clobber a section-level value with a cascaded page-level one.
  // The Block constructor will spread parsedContent.data through, so the
  // first writer wins for a given schema.
  if (section.parsedContent.data[key] === undefined) {
    section.parsedContent.data[key] = data
  }
}

function findQueryRecords(fetchConfig, resolved) {
  // `as` is the binding key; `schema` is its pre-2026-09-02 name, still on any
  // payload written before then.
  if (!fetchConfig?.path || !fetchConfig.as) return null
  const m = COLLECTION_PATH_RE.exec(fetchConfig.path)
  if (!m) return null
  const records = resolved[m[1]]
  if (!Array.isArray(records)) return null
  return records
}

// Walk a section tree attaching collection records to each section's
// parsedContent.data.<schema>. A section's OWN fetch is attached first
// (so it wins under attachData's first-writer-wins guard); the page-level
// `cascade` ({ schema, records }) then fills any remaining gap — for this
// section AND every nested subsection. Threading the cascade through the
// recursion is what lets a page-level `data:` declaration reach nested
// children (declared via page.yml `nest:`), not just top-level sections.
function attachSectionFetches(sections, resolved, cascade = null) {
  if (!Array.isArray(sections)) return
  for (const section of sections) {
    const records = findQueryRecords(section.fetch, resolved)
    if (records) attachData(section, section.fetch.as, records)
    if (cascade) attachData(section, cascade.key, cascade.records)
    if (Array.isArray(section.subsections) && section.subsections.length) {
      attachSectionFetches(section.subsections, resolved, cascade)
    }
  }
}

/**
 * Materialize file-based collections into each section's
 * `parsedContent.data` so the SSR render pipeline reads populated data
 * synchronously (no `useFetched` round-trip; no `public/` directory).
 *
 * In a regular Uniweb site build, the Vite plugin runs `processQueries`
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
async function resolveLocalQueries(siteContent, sitePath) {
  // ⛔ **`config.queries`, not `config.collections`.** The build renamed both the
  // payload key and the function on 2026-08-29 (`@uniweb/build` e442738, "no
  // identifier in build says `collection` any more") and this file was not
  // carried across — the same shape that left `hosting` reading a key nothing
  // emits, noted in `framework/CLAUDE.md` § *Decoupling is the architecture*.
  //
  // ⚠️ **The crash was the lucky half.** `processCollections` being undefined
  // only threw because our own fixture still declared the retired
  // `site.yml::collections`, which is passed through verbatim as an unrecognised
  // key. A CURRENT site declares `queries:`, so this read returned undefined,
  // the guard below returned early, and unipress compiled documents with **no
  // query data and no error** — silent, which is why four days passed.
  //
  // Local identifiers keep the older word deliberately: `framework/CLAUDE.md`
  // says renaming those is churn. Only the two names that cross a package
  // boundary had to move.
  const queriesConfig = siteContent?.config?.queries
  if (!queriesConfig || typeof queriesConfig !== 'object') return
  if (Object.keys(queriesConfig).length === 0) return

  // ⛔ Third arg is the ENTITIES POOL override, not the site root. Passing
  // `sitePath` made the pool resolve to `<site>/{schema}/` instead of
  // `<site>/entities/{schema}/`, so every query matched nothing. `null` takes
  // the default, which is what a site without `paths.entities` wants — the
  // same value `@uniweb/build`'s own plugin computes (`paths.entities || null`).
  const resolved = await processQueries(
    sitePath,
    queriesConfig,
    siteContent?.config?.paths?.entities || null,
    '/',
  )

  for (const page of siteContent.pages || []) {
    // Page-level fetch cascades to every section on the page — top-level
    // and nested alike. attachSectionFetches threads it through the whole
    // section tree; a section's own fetch still takes priority.
    const pageRecords = findQueryRecords(page.fetch, resolved)
    const cascade = pageRecords
      ? { key: page.fetch.as, records: pageRecords }
      : null
    attachSectionFetches(page.sections, resolved, cascade)
  }

  // Stash the resolved arrays on the website config too, so any section
  // (regardless of its own page's fetch declaration) can self-bootstrap
  // — e.g., a Cite inset rendering inside a Chapter on page A needs the
  // bibliography records that the Bibliography section declared on page
  // B. Foundations read this via `block.website.config.recordsByQuery.<name>`
  // as a synchronous fallback.
  //
  // ⭐ **`recordsByQuery`, because "collections" named nothing.** This key is
  // unipress's own — written here, read only by unipress foundations, never
  // emitted or read by `@uniweb/build`. It was called `collections`, which
  // collided with the build's payload key of the same name and said nothing
  // about what it held. *[Diego, 2026-09-02]* — "collect" as an act is fine;
  // as a set of things it is useless, because it gives no sense of what KIND of
  // things, where `records`, `queries` and `entities` each carry meaning.
  //
  // This holds **records, keyed by the query that resolved them**, and the name
  // now says exactly that. ⚠️ Not `config.records`, which the framework already
  // uses for live record URL patterns (`core/src/query-address.js`).
  //
  // The value is the record ARRAY directly, not `{ records: [...] }`. The
  // wrapper existed to merge with a pre-existing `config.collections` from the
  // build — which cannot happen now that the build emits `queries` — and
  // `recordsByQuery.<name>.records` would have said "records" twice.
  if (!siteContent.config) siteContent.config = {}
  if (!siteContent.config.recordsByQuery) siteContent.config.recordsByQuery = {}
  for (const name of Object.keys(resolved)) {
    siteContent.config.recordsByQuery[name] = resolved[name]
  }
}

// Discoverability aid: when a named `--variant` config is missing, list the
// YAML configs that ARE present so a typo (or a forgotten `.yml`) is easy to
// spot and fix.
function listConfigsHint(sitePath) {
  try {
    const ymls = readdirSync(sitePath).filter(
      (f) => f.endsWith('.yml') || f.endsWith('.yaml'),
    )
    if (!ymls.length) return ''
    return `\navailable configs here: ${ymls.join(', ')}`
  } catch {
    return ''
  }
}

export async function loadContent(dir, options = {}) {
  const sitePath = resolve(dir)

  if (!existsSync(sitePath)) {
    throw new ContentDirectoryError(`content directory does not exist: ${sitePath}`)
  }

  // An explicit config name (from `--variant`) selects an alternate
  // top-level config inside the content dir — e.g. a `document-book.yml`
  // beside the default `document.yml`. It must exist; we don't fall back
  // to auto-detection when the user named one. Otherwise auto-detect
  // `document.yml` / `site.yml`.
  let configFile
  if (options.configFile) {
    configFile = options.configFile
    if (!existsSync(join(sitePath, configFile))) {
      throw new DocumentYmlError(
        `variant config not found: ${join(sitePath, configFile)}${listConfigsHint(sitePath)}`
      )
    }
  } else {
    configFile = detectConfigFile(sitePath)
    if (!configFile) {
      throw new DocumentYmlError(
        `no ${CONFIG_FILE_NAMES.PRIMARY} (or ${CONFIG_FILE_NAMES.FALLBACK}) found in ${sitePath}`
      )
    }
  }

  // unipress is a document tool: read any config that isn't the `site.yml`
  // dogfood fallback with the document profile (content/ + folder mode +
  // `content:` ordering), regardless of the file's name. So a variant can
  // be named freely (book.yml, print.yml) and still build as a document.
  const profile = basename(configFile).startsWith('site') ? 'site' : 'document'

  let content
  try {
    content = await collectSiteContent(sitePath, {
      configFile,
      profile,
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

  await resolveLocalQueries(content, sitePath)

  // Cross-reference registry is built AFTER the foundation loads, in
  // orchestrator.loadAndInit, so foundation-declared `xref.kinds`
  // contribute to the kind inference at id-collection time.

  return { content, configFile, sitePath }
}
