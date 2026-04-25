// Load an optional `unipress.config.js` from the content directory (or
// an explicit --config path). The config is an ordinary ES module that
// default-exports a settings object — typically written with the
// `defineUnipressConfig` identity helper for editor autocomplete:
//
//   // unipress.config.js
//   import { defineUnipressConfig } from '@uniweb/unipress'
//   export default defineUnipressConfig({
//     out: './dist/book.pdf',
//     typst: { version: '0.14.2' },
//   })
//
// The precedence chain (plan §9.2):
//
//   CLI flags > unipress.config.js > document.yml > foundation defaults
//
// This module only loads + validates the config file. Merging into the
// compile pipeline happens in src/compile.js, which owns the precedence
// semantics for each field.
//
// Path resolution convention (matches Vite / Astro): relative paths in
// the config object — `out`, `foundation`, `typst.binary` — are
// resolved against the directory containing the config file, not the
// cwd or the content directory. Absolute paths are used as-is.

import { existsSync, statSync } from 'node:fs'
import { resolve, dirname, isAbsolute } from 'node:path'
import { pathToFileURL } from 'node:url'
import { ConfigValidationError } from './errors.js'

const DEFAULT_CONFIG_NAME = 'unipress.config.js'
const PATHY_FIELDS = ['out', 'foundation']
const PATHY_NESTED_FIELDS = [['typst', 'binary']]

export async function loadUnipressConfig({ contentDir, explicitPath = null } = {}) {
  const configPath = pickConfigPath({ contentDir, explicitPath })
  if (!configPath) {
    return { config: {}, configPath: null, source: 'default' }
  }

  let mod
  try {
    mod = await import(pathToFileURL(configPath).href)
  } catch (err) {
    throw new ConfigValidationError(
      `failed to load config file ${configPath}\n` +
      `cause: ${err.message}\n` +
      `hint: syntax errors, missing dependencies, and thrown errors surface here`
    )
  }

  const raw = mod.default ?? mod.config
  if (raw == null) {
    throw new ConfigValidationError(
      `config file ${configPath} has no default export\n` +
      `hint: export default { ... }  (or wrap with defineUnipressConfig)`
    )
  }
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    throw new ConfigValidationError(
      `config file ${configPath} must default-export an object (got ${describe(raw)})`
    )
  }

  const config = normalizePaths(raw, dirname(configPath))
  return { config, configPath, source: explicitPath ? 'flag' : 'autodetect' }
}

// Pick between an explicit --config path and auto-discovery in the
// content directory. Explicit paths must exist; auto-discovery skips
// silently when no config file is present.
function pickConfigPath({ contentDir, explicitPath }) {
  if (explicitPath) {
    const abs = isAbsolute(explicitPath)
      ? explicitPath
      : resolve(process.cwd(), explicitPath)
    if (!existsSync(abs)) {
      throw new ConfigValidationError(
        `--config path does not exist: ${abs}`
      )
    }
    if (!statSync(abs).isFile()) {
      throw new ConfigValidationError(
        `--config path is not a file: ${abs}`
      )
    }
    return abs
  }
  if (!contentDir) return null
  const candidate = resolve(contentDir, DEFAULT_CONFIG_NAME)
  return existsSync(candidate) ? candidate : null
}

// Resolve relative paths declared in the config against the config
// file's own directory. The fields treated as paths are listed
// explicitly so this doesn't catch arbitrary user strings.
function normalizePaths(config, configDir) {
  const out = { ...config }
  for (const key of PATHY_FIELDS) {
    if (typeof out[key] === 'string' && !isAbsolute(out[key]) && !looksUrlOrPackage(out[key])) {
      out[key] = resolve(configDir, out[key])
    }
  }
  for (const [key, subkey] of PATHY_NESTED_FIELDS) {
    const sub = out[key]
    if (sub && typeof sub === 'object' && typeof sub[subkey] === 'string' && !isAbsolute(sub[subkey])) {
      out[key] = { ...sub, [subkey]: resolve(configDir, sub[subkey]) }
    }
  }
  return out
}

// A value like 'my-foundation' or '@scope/foo' is a package name; a
// value like 'https://...' is a URL. Don't try to filesystem-resolve
// those. Everything else with a leading dot / absolute is treated as a
// path and resolved above.
function looksUrlOrPackage(value) {
  if (/^https?:\/\//.test(value)) return true
  // A path starts with ./, ../, /, or a drive letter.
  const pathy = /^(\.\.?[/\\]|[/\\]|[A-Za-z]:[/\\])/
  return !pathy.test(value)
}

function describe(value) {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}
