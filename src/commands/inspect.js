// `unipress inspect <dir>` — load a content directory and dump the resolved
// object as JSON. Used as a debugging aid and as the visible output of M2.
//
// Filtering knobs:
//   --full              include the web-only fields stripped by default
//                       (assets, icons, hasExplicitPoster/Preview)
//   --summary           replace pages[] with route strings only
//   --page <route>      keep only the page matching <route>; errors if no match
//   --depth <n>         truncate nested values beyond depth n
//   --foundation <ref>  override document.yml's foundation: field
//
// As of M3a, inspect also resolves the foundation reference and reports
// the resolved path in __unipress.foundation. It does NOT import the
// foundation; M3b does that.

import { loadContent } from '../content-loader.js'
import { resolveFoundation } from '../foundation-loader.js'

const SKIP_KEYS = new Set([
  'assets',
  'hasExplicitPoster',
  'hasExplicitPreview',
  'icons'
])

const TRUNCATED = '__truncated__'

export async function inspect({ dir, full = false, summary = false, page = null, depth = null, foundation: foundationCliRef = null } = {}) {
  if (!dir) {
    process.stderr.write('error: `inspect` requires a directory argument\n')
    process.stderr.write('usage: unipress inspect <dir> [--full] [--summary] [--page <route>] [--depth <n>] [--foundation <ref>]\n')
    process.exit(1)
  }

  if (depth !== null && (!Number.isInteger(depth) || depth < 0)) {
    process.stderr.write(`error: --depth must be a non-negative integer (got ${depth})\n`)
    process.exit(1)
  }

  const { content, configFile, sitePath } = await loadContent(dir)

  // Resolve foundation reference. Failure to resolve is reported in
  // __unipress.foundation as { ref, error } so the rest of inspect still
  // works — it's a debugging tool, the user wants to see what loaded even
  // if one piece broke.
  let foundationInfo
  try {
    foundationInfo = await resolveFoundation({
      cliRef: foundationCliRef,
      configRef: content.config?.foundation,
      anchorDir: sitePath
    })
  } catch (err) {
    foundationInfo = { ref: foundationCliRef ?? content.config?.foundation ?? null, error: err.message }
  }

  let view = full ? { ...content } : trimSkipKeys(content)

  if (page) {
    view = filterToPage(view, page)
  } else if (summary) {
    view = summarizePages(view)
  }

  view.__unipress = { sitePath, configFile, foundation: foundationInfo }

  const output = depth !== null ? truncate(view, depth) : view
  process.stdout.write(JSON.stringify(output, replacer, 2) + '\n')
}

function trimSkipKeys(content) {
  const out = {}
  for (const [key, value] of Object.entries(content)) {
    if (SKIP_KEYS.has(key)) continue
    out[key] = value
  }
  return out
}

function filterToPage(view, route) {
  if (!Array.isArray(view.pages)) {
    process.stderr.write(`error: content has no pages[] to filter\n`)
    process.exit(1)
  }
  const match = view.pages.find(p => p.route === route)
  if (!match) {
    const available = view.pages.map(p => p.route).join(', ') || '(none)'
    process.stderr.write(`error: no page with route '${route}'\n`)
    process.stderr.write(`available routes: ${available}\n`)
    process.exit(1)
  }
  return { ...view, pages: [match] }
}

function summarizePages(view) {
  if (!Array.isArray(view.pages)) return view
  return {
    ...view,
    pages: view.pages.map(p => p.route)
  }
}

// Walk the value, replacing anything beyond `maxDepth` with TRUNCATED.
// Depth counts from the root: depth 0 truncates everything inside the root.
// Arrays preserve length so the user can still see "this had 12 items."
function truncate(value, maxDepth, currentDepth = 0) {
  if (value === null || typeof value !== 'object') return value
  if (currentDepth >= maxDepth) {
    if (Array.isArray(value)) return value.length === 0 ? [] : [TRUNCATED, `(${value.length} items)`]
    return TRUNCATED
  }
  if (Array.isArray(value)) {
    return value.map(item => truncate(item, maxDepth, currentDepth + 1))
  }
  const out = {}
  for (const [key, child] of Object.entries(value)) {
    out[key] = truncate(child, maxDepth, currentDepth + 1)
  }
  return out
}

// JSON.stringify can't serialize Sets / Maps. The content object has a few
// of these; convert them to plain values so output is readable.
function replacer(_key, value) {
  if (value instanceof Set) return [...value]
  if (value instanceof Map) return Object.fromEntries(value)
  return value
}
