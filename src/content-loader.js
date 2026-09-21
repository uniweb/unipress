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
import { collectSiteContent, processQueries, resolveRecordsDir } from '@uniweb/build/content'
import { resolveFetchConfigs, evaluateQuery, parentRouteOf, fetchLevels } from '@uniweb/core'
import { detectConfigFile, CONFIG_FILE_NAMES } from './document-yml.js'
import { ContentDirectoryError, DocumentYmlError } from './errors.js'

// Match a parsed query-backed fetch path. parseFetchConfig (in @uniweb/build)
// normalises `{ query: <name> }` into `{ query, path: '/data/<name>.json',
// as: <name>, ... }` — so this regex is the inverse: pull the query name back
// out of the resolved path.
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
  // `as` is the binding key, as the build writes it — it wrote `schema` until
  // 2026-09-02, and no alias is read.
  if (!fetchConfig?.path || !fetchConfig.as) return null
  const m = COLLECTION_PATH_RE.exec(fetchConfig.path)
  if (!m) return null
  const records = resolved[m[1]]
  if (!Array.isArray(records)) return null
  return records
}

// The records of every query a level declares — one fetch, or a list of them
// (`query: [members, queries]`), each under its own binding key, as that fetch
// selects them. ⛔ Until 2026-09-14 a list was left untouched, so a page declaring
// two queries compiled with neither.
//
// ⭐ SELECTED AS THE RUNTIME SELECTS FROM A COMPILED FILE — the query as saved (its
// `scope`, `sort` and `limit`, which a build leaves to the runtime), then the fetch's
// own `where`, `sort` and `limit`, by the one evaluator (`evaluateQuery`). ⛔ Until
// 2026-09-14 every fetch received its query's whole compiled file, so
// `fetch: { query: publications, where: { year: 2024 } }` compiled every year.
function queryBindings(fetch, resolved, { queries = null, locale = null } = {}) {
  const list = Array.isArray(fetch) ? fetch : fetch ? [fetch] : []
  const out = []
  for (const one of list) {
    const records = findQueryRecords(one, resolved)
    if (!records) continue
    const cfg = resolveFetchConfigs([one], { queries, locale, defaultLocale: locale }).get(one.as)
    out.push({ key: one.as, records: cfg ? evaluateQuery(records, cfg, { locale }) : records })
  }
  return out
}

// Walk a section tree attaching query records to each section's
// parsedContent.data.<key>. A section's OWN queries are attached first
// (so they win under attachData's first-writer-wins guard); the page-level
// `cascade` ([{ key, records }]) then fills any remaining gap — for this
// section AND every nested subsection. Threading the cascade through the
// recursion is what lets a page-level `query:` declaration reach nested
// children (declared via page.yml `nest:`), not just top-level sections.
function attachSectionFetches(sections, resolved, cascade = [], options = {}) {
  if (!Array.isArray(sections)) return
  for (const section of sections) {
    for (const { key, records } of queryBindings(section.fetch, resolved, options)) attachData(section, key, records)
    for (const { key, records } of cascade) attachData(section, key, records)
    if (Array.isArray(section.subsections) && section.subsections.length) {
      attachSectionFetches(section.subsections, resolved, cascade, options)
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
 * gap by resolving queries in-memory and attaching each fetch's records
 * directly to the block's `parsedContent.data.<as>`. The Block constructor
 * (framework/core/src/block.js) keeps that field as what the section holds.
 *
 * ⭐ THE RUNTIME PAIRS THEM WITH THE COMPONENT'S KEYS, NOT THIS FILE. At render
 * the entity store fills each key the component declares from the fetches that
 * reach the section — by name, then by the query's schema (`fillDeclaredKeys`,
 * automatic `as`) — and delivers a fetch's answer the section already holds
 * under the fetch's own key without asking. So a key declared as `people:
 * '@/member'` receives a `query: members` attached here as `members`, exactly as
 * on a website. For that, every level the store reads is attached, in its order:
 * the section's own queries, its page's, its parent page's, and the document's
 * for a page with no parent.
 *
 * A level's queries cascade to every section below it; a more specific one
 * overrides them per key. A level may declare one query or a list of them. Only
 * query-backed fetches (parsed `path: '/data/<name>.json'`) are resolved here —
 * an external query's `url:` is not fetched: a document compiles from the
 * site's own records.
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

  // ⛔ Third arg is the RECORDS DIRECTORY, not the site root. Passing `sitePath`
  // made it resolve to `<site>/{schema}/` instead of `<site>/records/{schema}/`,
  // so every query matched nothing. It comes from the one resolver, handed this
  // document's own `paths:` — a document has no `site.yml` for the resolver to read
  // — so `paths.records` moves it, and the retired `paths.entities` and a leftover
  // `entities/` are refused by name rather than silently read as nothing.
  const resolved = await processQueries(
    sitePath,
    queriesConfig,
    resolveRecordsDir(sitePath, siteContent?.config?.paths).rel,
    '/',
  )

  // What each fetch selects is evaluated in the document's language, as a text
  // `sort` collates in the page's locale on a website.
  const options = { queries: queriesConfig, locale: siteContent?.config?.defaultLanguage ?? null }
  const pages = siteContent.pages || []
  const byRoute = new Map(pages.map((page) => [page.route, page]))
  for (const page of pages) {
    // ⭐ The levels a section's queries come from, most specific first — the rule's, so an
    // answer is held for the fetch a renderer pairs a key with: the page's, its parent page's
    // (`parentRouteOf`, the one parent rule), and the document's own `query:` on a page with
    // no parent (`siteReaches`, inside `fetchLevels`). A section's own go first, in
    // `attachSectionFetches`. The page's cascade reaches every section on it, top-level and
    // nested alike. ⛔ Until
    // 2026-09-14 only the page's was attached, so a parent page's or the document's
    // `query:` reached no section — not even a key of the same name.
    const parentRoute = parentRouteOf(page.route, { declared: page.parent, has: (route) => byRoute.has(route) })
    const parentPage = parentRoute ? byRoute.get(parentRoute) : null
    const parent = parentPage && parentPage !== page ? parentPage : null
    // ⭐ The levels, by the rule (`fetchLevels`, `@uniweb/core`) — the one answer to which fetches
    // reach a section, so a document is fed what a page would be. ⛔ This spelled the list out
    // itself until 2026-09-19; there is no route binding here because a document has no parametric
    // pages, and that is the only level the rule adds.
    const cascade = fetchLevels({ page: page.fetch, parent, site: siteContent?.config?.fetch })
      .flatMap((level) => (level ? queryBindings(level, resolved, options) : []))
    attachSectionFetches(page.sections, resolved, cascade, options)
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
  // now says exactly that. ⚠️ Not `config.services.records`, which the framework
  // already uses for the live records lane (`core/src/records-service.js`).
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
