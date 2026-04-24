// Import a built foundation and wire it to a content object.
//
// `initPrerender` from @uniweb/runtime/ssr does the actual work: it builds
// the Website graph (Pages, Blocks), installs the SSR childBlockRenderer,
// installs SSR-safe routing shims, and propagates base path. We hand it
// the loaded foundation module and the content object; we get back a
// configured `uniweb` instance whose `activeWebsite` is fully populated.
//
// Compile-time dispatch goes through `foundation.compileDocument` (and its
// lower-level sibling `compileSubtree`) — re-exports the foundation's build
// adds when the foundation itself imports @uniweb/press. This keeps Press a
// single instance: the foundation has its own bundled copy, and unipress
// reaches it via the foundation rather than importing its own (which would
// create a dual-React-context trap that drops every registration).
//
// compileDocument is the high-level "compile this website through this
// foundation" entry point — it looks up `foundation.outputs[format]`,
// calls the foundation's getOptions to assemble adapter options, and
// dispatches. unipress hands it the Website + format + host hints;
// compileDocument does the rest.
//
// React-instance note (gotcha #2): @uniweb/runtime/ssr (built bundle) imports
// React as an external; the foundation does the same. Both must resolve to the
// same React instance, otherwise hooks in foundation components throw "Invalid
// hook call". Inside this monorepo react is hoisted; in a real npm install of
// unipress, both also resolve from unipress's node_modules.

import { pathToFileURL } from 'node:url'
import { initPrerender } from '@uniweb/runtime/ssr'
import { FoundationResolutionError, CompileError } from './errors.js'

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

// Compile a populated Website into a Blob, using the foundation's
// bundled Press via the host-shareable compileDocument re-export.
// Throws CompileError if compileDocument isn't present — that means
// the foundation either doesn't depend on @uniweb/press, or was built
// with a pre-M8a @uniweb/build that only re-exported compileSubtree.
export async function compileDocumentWithFoundation(foundation, website, options = {}) {
  if (typeof foundation?.compileDocument !== 'function') {
    throw new CompileError(
      `foundation does not expose compileDocument — cannot compile to '${options.format}'\n` +
      `hint: foundation must import @uniweb/press and be rebuilt with a current @uniweb/build ` +
      `(@uniweb/build@57498ef or later re-exports compileDocument alongside compileSubtree)`
    )
  }
  try {
    return await foundation.compileDocument(website, { ...options, foundation })
  } catch (err) {
    // Wrap Press's errors in CompileError so the CLI's top-level handler
    // surfaces them with consistent formatting.
    if (err instanceof CompileError) throw err
    throw new CompileError(err.message || String(err))
  }
}

// Read the foundation's outputs declaration from either the built or
// source shape. Used by compile.js for pre-compile validation and for
// reading the default extension per format.
export function getFoundationOutputs(foundation) {
  if (!foundation) return null
  return (
    foundation.default?.capabilities?.outputs ??
    foundation.default?.outputs ??
    foundation.outputs ??
    null
  )
}
