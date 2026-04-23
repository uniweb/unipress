// Import a built foundation and wire it to a content object.
//
// `initPrerender` from @uniweb/runtime/ssr does the actual work: it builds
// the Website graph (Pages, Blocks), installs the SSR childBlockRenderer,
// installs SSR-safe routing shims, and propagates base path. We hand it
// the loaded foundation module and the content object; we get back a
// configured `uniweb` instance whose `activeWebsite` is fully populated.
//
// This module deliberately does NOT render anything. It produces the
// graph; M4+ feeds it to Press for compile.
//
// React-instance note (gotcha #2): @uniweb/runtime/ssr (built bundle)
// imports React as an external; the foundation does the same. Both must
// resolve to the same React instance, otherwise hooks in foundation
// components throw "Invalid hook call". Inside this monorepo react is
// hoisted, so a single instance is the natural outcome. In a real npm
// install of unipress, both also resolve from unipress's node_modules.

import { pathToFileURL } from 'node:url'
import { initPrerender } from '@uniweb/runtime/ssr'
import { FoundationResolutionError } from './errors.js'

export async function importFoundation(resolvedPath) {
  try {
    return await import(pathToFileURL(resolvedPath).href)
  } catch (err) {
    throw new FoundationResolutionError(
      `failed to import foundation at ${resolvedPath}\n` +
      `cause: ${err.message}\n` +
      `hint: confirm the foundation was built with @uniweb/build (dist/foundation.js)`
    )
  }
}

export function initOrchestrator({ content, foundation, extensions = [], onProgress } = {}) {
  return initPrerender(content, foundation, extensions, { onProgress })
}

// Convenience: import + init in one step. Returns the uniweb instance,
// or throws (the caller decides whether to surface as fatal or attached
// to the inspect dump).
export async function loadAndInit({ content, resolvedPath, extensions = [], onProgress } = {}) {
  const foundation = await importFoundation(resolvedPath)
  const uniweb = initOrchestrator({ content, foundation, extensions, onProgress })
  return { foundation, uniweb }
}
