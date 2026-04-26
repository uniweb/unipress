#!/usr/bin/env node

/**
 * Generate src/templates-data.js from documents/.
 *
 * `scaffold.js` reads this map instead of the filesystem so the logic
 * works identically in Node dev (from documents/ on disk) and in the
 * bun-compiled binary (which has no access to the original path).
 *
 * Run manually after editing documents/:
 *   node scripts/generate-templates-data.js
 *
 * Also run automatically in `scripts/build-binaries.js` before each bun
 * compile so the binary's embedded data matches what's in documents/.
 *
 * documents/<name>/ is the dual-purpose source (foundation-dev test
 * harness AND bundled template starter). For the dev harness, the
 * committed document.yml.hbs uses a path ref (foundation: ../../foundations/<name>);
 * here at bundle time we rewrite that path ref to a registry ref so the
 * bundled file scaffolds correctly for end users who don't have the
 * sibling foundation on disk.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PKG_DIR = resolve(__dirname, '..')
const DOCUMENTS_DIR = resolve(PKG_DIR, 'documents')
const FOUNDATIONS_DIR = resolve(PKG_DIR, 'foundations')
const OUT_FILE = resolve(PKG_DIR, 'src/templates-data.js')

function walk(dir) {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.gitkeep' || entry.name === '.DS_Store') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...walk(full))
    } else if (entry.isFile()) {
      results.push(full)
    }
  }
  return results
}

// File extensions treated as binary. Anything in this set is read as a
// Buffer and embedded as { encoding: 'base64', content: <base64> }.
// Everything else is read as utf8 and embedded as a plain string. Keep
// this list conservative — adding an extension is harmless, but treating
// a text file as binary would block Handlebars substitution + line-ending
// normalization on systems that touch utf8 differently.
const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico',
  '.pdf',
  '.zip', '.tar', '.gz',
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  '.mp3', '.wav', '.ogg',
  '.mp4', '.webm', '.mov',
])

function isBinaryPath(path) {
  const dot = path.lastIndexOf('.')
  if (dot < 0) return false
  return BINARY_EXTENSIONS.has(path.slice(dot).toLowerCase())
}

// Match a top-level YAML `foundation: <value>` line. Captures the value
// (stripped of quotes + trailing comment). Multiline values not supported
// (foundation refs are always single-line).
const FOUNDATION_LINE_RE = /^(foundation:\s*)(.+?)\s*$/m

function isPathRef(value) {
  return /^(\.\.?[/\\]|[/\\]|[A-Za-z]:[/\\])/.test(value)
}

function readFoundationPkg(absDir) {
  const pkgPath = join(absDir, 'package.json')
  if (!existsSync(pkgPath)) return null
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
    if (pkg.name && pkg.version) return { name: pkg.name, version: pkg.version }
  } catch {}
  return null
}

// Rewrite a path-ref `foundation:` value to a registry ref. The committed
// dev file points at a sibling foundation directory; the bundled file
// must point at a registry ref so end users (who don't have that sibling
// on disk) can resolve it via the catalog.
function rewriteFoundationRef(content, fileAbsPath) {
  const m = content.match(FOUNDATION_LINE_RE)
  if (!m) return content
  const raw = m[2].trim()
  const ref = raw.replace(/^['"]|['"]$/g, '').replace(/\s+#.*$/, '').trim()
  if (!isPathRef(ref)) return content
  const resolvedDir = resolve(dirname(fileAbsPath), ref)
  const inFoundations = relative(FOUNDATIONS_DIR, resolvedDir)
  if (inFoundations.startsWith('..')) return content
  const pkg = readFoundationPkg(resolvedDir)
  if (!pkg) {
    process.stderr.write(
      `[generate-templates-data] WARN: ${relative(PKG_DIR, fileAbsPath)} foundation: ${ref} → no package.json at ${relative(PKG_DIR, resolvedDir)}; leaving path ref intact\n`
    )
    return content
  }
  const registryRef = `${pkg.name}@${pkg.version}`
  return content.replace(FOUNDATION_LINE_RE, `$1'${registryRef}'`)
}

function collectTemplates() {
  const templates = {}
  if (!existsSync(DOCUMENTS_DIR)) return templates
  for (const entry of readdirSync(DOCUMENTS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    // Skip leading-underscore dirs — used in this repo for hand-authored
    // verification harnesses (`_test-bib`, etc.) that aren't bundled
    // templates. Same convention as `_e2e/` under framework/.
    if (entry.name.startsWith('_')) continue
    const name = entry.name
    const root = join(DOCUMENTS_DIR, name)
    const files = {}
    for (const abs of walk(root)) {
      const rel = relative(root, abs).split('\\').join('/')
      if (isBinaryPath(rel)) {
        const buf = readFileSync(abs)
        files[rel] = { encoding: 'base64', content: buf.toString('base64') }
        continue
      }
      let content = readFileSync(abs, 'utf8')
      if (rel === 'document.yml.hbs' || rel === 'document.yml') {
        content = rewriteFoundationRef(content, abs)
      }
      files[rel] = content
    }
    if (Object.keys(files).length > 0) {
      templates[name] = files
    }
  }
  return templates
}

function stringify(templates) {
  const lines = ['// AUTO-GENERATED by scripts/generate-templates-data.js']
  lines.push('// Do not edit by hand — edit files under documents/ and regenerate.')
  lines.push('')
  lines.push('export const TEMPLATES = {')
  for (const [name, files] of Object.entries(templates)) {
    lines.push(`  ${JSON.stringify(name)}: {`)
    for (const [rel, content] of Object.entries(files)) {
      lines.push(`    ${JSON.stringify(rel)}: ${JSON.stringify(content)},`)
    }
    lines.push(`  },`)
  }
  lines.push('}')
  return lines.join('\n') + '\n'
}

const templates = collectTemplates()
const source = stringify(templates)
writeFileSync(OUT_FILE, source)

const total = Object.values(templates).reduce((n, files) => n + Object.keys(files).length, 0)
console.log(`[generate-templates-data] wrote ${OUT_FILE}`)
console.log(`[generate-templates-data] ${Object.keys(templates).length} template(s), ${total} file(s)`)
