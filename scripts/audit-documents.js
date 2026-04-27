#!/usr/bin/env node

// Audit script: compile every document under `documents/` (including
// `_`-prefixed test harnesses) into `.outputs/`, in every format the
// audit manifest declares for each. Produces an INDEX.md summarizing
// every build with size, page count, and pass/fail.
//
// Manifest:    scripts/audit/manifest.json
// Outputs:     .outputs/<doc>/[<variant>/]<doc>.<ext>
// Index:       .outputs/INDEX.md
//
// Usage:
//   pnpm audit:docs                    # run all
//   pnpm audit:docs -- book invoice    # subset by name
//   UNIPRESS_TYPST_BINARY=/path/to/typst pnpm audit:docs
//
// Variant schema (in manifest.json):
//   "invoice": {
//     "formats": ["docx"],
//     "variants": {
//       "ca-tax": {
//         "formats": ["docx"],
//         "documentYml": { "business_docs": { "defaults": { "tax_jurisdiction": "CA" } } }
//       }
//     }
//   }

import { readdir, mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import Handlebars from 'handlebars'
import yaml from 'js-yaml'
import { compile } from '../src/compile.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PKG_DIR = resolve(__dirname, '..')
const DOCUMENTS_DIR = join(PKG_DIR, 'documents')
const OUTPUTS_DIR = join(PKG_DIR, '.outputs')
const MANIFEST_PATH = join(__dirname, 'audit/manifest.json')

const SCAFFOLD_VARS = {
  title: 'Audit Build',
  author: 'Audit Bot',
  year: new Date().getFullYear(),
  date: new Date().toISOString().slice(0, 10),
}

const TYPST_BINARY = process.env.UNIPRESS_TYPST_BINARY || null

// Output extension per format. Mirrors the `extension:` declared by each
// foundation's outputs map. Audit-script-local on purpose — keeps the
// script independent from foundation lookup. Add a row here if a new
// format is added to any foundation.
const EXT_BY_FORMAT = {
  pdf: 'pdf',
  docx: 'docx',
  xlsx: 'xlsx',
  epub: 'epub',
  pagedjs: 'html',
  typst: 'zip',
  latex: 'zip',
}

// ---------- filesystem helpers ----------

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '.DS_Store' || entry.name === '.gitkeep') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (entry.isFile()) out.push(full)
  }
  return out
}

const BINARY_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.pdf', '.zip',
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
])

function isBinaryPath(p) {
  const i = p.lastIndexOf('.')
  if (i < 0) return false
  return BINARY_EXT.has(p.slice(i).toLowerCase())
}

// Render a document directory into `targetDir`. .hbs files are
// Handlebars-rendered (and the suffix stripped); everything else is
// copied verbatim. Mirrors src/scaffold.js but reads from disk so it
// works for `_*` directories that aren't in the bundled template map.
async function renderDocument(srcDir, targetDir) {
  const files = await walk(srcDir)
  for (const abs of files) {
    const rel = relative(srcDir, abs)
    const isBinary = isBinaryPath(rel)
    let dstRel = rel
    let bytes
    if (isBinary) {
      bytes = await readFile(abs)
    } else if (rel.endsWith('.hbs')) {
      dstRel = rel.slice(0, -4)
      const src = await readFile(abs, 'utf8')
      bytes = Handlebars.compile(src, { noEscape: true })(SCAFFOLD_VARS)
    } else {
      bytes = await readFile(abs, 'utf8')
    }
    const dst = join(targetDir, dstRel)
    await mkdir(dirname(dst), { recursive: true })
    await writeFile(dst, bytes)
  }
}

// Rewrite a relative `foundation:` reference in the rendered document.yml
// to an absolute path resolved from the source directory. The source
// references look like `foundation: ../../foundations/<name>`, which is
// valid relative to documents/<name>/ but broken once we copy to a tmp
// dir. Registry refs (`@scope/name@version`), absolute paths, and URL
// refs pass through unchanged.
async function rewriteFoundationRefAbs(workDir, sourceDir) {
  const ymlPath = join(workDir, 'document.yml')
  if (!existsSync(ymlPath)) return
  const text = await readFile(ymlPath, 'utf8')
  const lines = text.split('\n')
  const idx = lines.findIndex((ln) => /^\s*foundation:\s*\S/.test(ln))
  if (idx < 0) return
  const m = lines[idx].match(/^(\s*foundation:\s*)(['"]?)([^'"#\n]+?)\2(\s*(?:#.*)?)?$/)
  if (!m) return
  const ref = m[3].trim()
  const isPathRef = ref.startsWith('.') || ref.startsWith('/') || ref.startsWith('~')
  if (!isPathRef) return
  if (ref.startsWith('/')) return
  const abs = resolve(sourceDir, ref)
  lines[idx] = `${m[1]}'${abs}'`
  await writeFile(ymlPath, lines.join('\n'))
}

// ---------- variant overrides ----------

function isPlainObject(x) {
  return x !== null && typeof x === 'object' && !Array.isArray(x)
}

function deepMerge(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (isPlainObject(v) && isPlainObject(target[k])) {
      deepMerge(target[k], v)
    } else {
      target[k] = v
    }
  }
  return target
}

async function applyVariantOverride(workDir, override) {
  const ymlPath = join(workDir, 'document.yml')
  if (!existsSync(ymlPath)) {
    throw new Error(`variant override: no document.yml in ${workDir}`)
  }
  const text = await readFile(ymlPath, 'utf8')
  const doc = yaml.load(text) ?? {}
  deepMerge(doc, override)
  await writeFile(ymlPath, yaml.dump(doc, { lineWidth: 100 }))
}

// ---------- one build ----------

async function runBuild({ name, format, variantName, variantOverride }) {
  const stamp = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
  const workDir = join(tmpdir(), `unipress-audit-${name}-${stamp}`)
  await mkdir(workDir, { recursive: true })

  const variantDir = variantName ? join(name, variantName) : name
  const outDir = join(OUTPUTS_DIR, variantDir)
  await mkdir(outDir, { recursive: true })

  const result = {
    name,
    format,
    variant: variantName ?? null,
    ok: false,
    bytes: null,
    pageCount: null,
    pressFormat: null,
    outPath: null,
    error: null,
  }

  try {
    const sourceDir = join(DOCUMENTS_DIR, name)
    await renderDocument(sourceDir, workDir)
    await rewriteFoundationRefAbs(workDir, sourceDir)

    if (variantOverride) {
      await applyVariantOverride(workDir, variantOverride)
    }

    const ext = EXT_BY_FORMAT[format] ?? format
    const finalPath = join(outDir, `${name}.${ext}`)
    await rm(finalPath, { force: true })

    const compiled = await compile({
      dir: workDir,
      format,
      outPath: finalPath,
      typstBinaryPath: TYPST_BINARY,
    })

    result.ok = true
    result.bytes = compiled.bytes
    result.pageCount = compiled.pageCount
    result.pressFormat = compiled.pressFormat
    result.outPath = compiled.outPath
  } catch (err) {
    result.error = (err && err.message) || String(err)
  } finally {
    await rm(workDir, { recursive: true, force: true })
  }

  return result
}

// ---------- index ----------

function fmtBytes(n) {
  if (n == null) return '—'
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(2)} MB`
}

function rowFor(r) {
  if (!r.ok) return `| ${r.name}${r.variant ? ` / ${r.variant}` : ''} | ${r.format} | ✗ | — | — | ${r.error?.split('\n')[0] || ''} |`
  const via = r.pressFormat && r.pressFormat !== r.format ? ` (via ${r.pressFormat})` : ''
  const file = r.outPath ? relative(OUTPUTS_DIR, r.outPath) : '—'
  return `| ${r.name}${r.variant ? ` / ${r.variant}` : ''} | ${r.format}${via} | ✓ | ${fmtBytes(r.bytes)} | ${r.pageCount ?? '—'} | \`${file}\` |`
}

async function writeIndex(results) {
  const lines = []
  lines.push(`# Unipress audit — ${new Date().toISOString().slice(0, 10)}`)
  lines.push('')
  lines.push(`Builds: ${results.length} • Passed: ${results.filter(r => r.ok).length} • Failed: ${results.filter(r => !r.ok).length}`)
  lines.push('')
  lines.push('| Document | Format | Status | Size | Pages | File |')
  lines.push('|---|---|---|---|---|---|')
  for (const r of results) lines.push(rowFor(r))
  lines.push('')
  const failed = results.filter(r => !r.ok)
  if (failed.length > 0) {
    lines.push('## Failures')
    lines.push('')
    for (const r of failed) {
      lines.push(`### ${r.name}${r.variant ? ` / ${r.variant}` : ''} (${r.format})`)
      lines.push('')
      lines.push('```')
      lines.push(r.error || '(no message)')
      lines.push('```')
      lines.push('')
    }
  }
  await mkdir(OUTPUTS_DIR, { recursive: true })
  await writeFile(join(OUTPUTS_DIR, 'INDEX.md'), lines.join('\n'))
}

// ---------- driver ----------

async function loadManifest() {
  const text = await readFile(MANIFEST_PATH, 'utf8')
  const parsed = JSON.parse(text)
  return parsed.documents || {}
}

async function listDocumentDirs() {
  const out = []
  for (const entry of await readdir(DOCUMENTS_DIR, { withFileTypes: true })) {
    if (entry.isDirectory()) out.push(entry.name)
  }
  return out
}

async function main() {
  const argv = process.argv.slice(2)
  const subset = argv.length > 0 ? new Set(argv) : null

  const manifest = await loadManifest()
  const onDisk = await listDocumentDirs()

  // Warn on doc dirs missing from manifest (use the on-disk format as
  // a fallback so the audit still produces something).
  for (const name of onDisk) {
    if (manifest[name]) continue
    const ymlCandidates = ['document.yml.hbs', 'document.yml']
    let declaredFormat = null
    for (const f of ymlCandidates) {
      const p = join(DOCUMENTS_DIR, name, f)
      if (!existsSync(p)) continue
      try {
        const text = await readFile(p, 'utf8')
        const m = text.match(/^format:\s*(\S+)/m)
        if (m) declaredFormat = m[1]
      } catch {}
      if (declaredFormat) break
    }
    if (declaredFormat) {
      manifest[name] = { formats: [declaredFormat] }
      console.warn(`[audit] '${name}' is not in manifest; using declared format '${declaredFormat}'`)
    } else {
      console.warn(`[audit] '${name}' is not in manifest and has no declared format — skipping`)
    }
  }

  // Wipe and recreate .outputs — we want a clean snapshot every run.
  await rm(OUTPUTS_DIR, { recursive: true, force: true })
  await mkdir(OUTPUTS_DIR, { recursive: true })

  const results = []
  const names = Object.keys(manifest).sort()

  for (const name of names) {
    if (subset && !subset.has(name)) continue
    const entry = manifest[name]
    const formats = Array.isArray(entry.formats) ? entry.formats : []
    for (const format of formats) {
      process.stdout.write(`▸ ${name} → ${format}\n`)
      const r = await runBuild({ name, format })
      results.push(r)
      process.stdout.write(r.ok
        ? `  ✓ ${fmtBytes(r.bytes)} • ${relative(PKG_DIR, r.outPath)}\n`
        : `  ✗ ${r.error?.split('\n')[0] || 'failed'}\n`)
    }
    if (entry.variants && typeof entry.variants === 'object') {
      for (const [variantName, variant] of Object.entries(entry.variants)) {
        const variantFormats = Array.isArray(variant.formats) ? variant.formats : []
        for (const format of variantFormats) {
          process.stdout.write(`▸ ${name} / ${variantName} → ${format}\n`)
          const r = await runBuild({
            name,
            format,
            variantName,
            variantOverride: variant.documentYml || null,
          })
          results.push(r)
          process.stdout.write(r.ok
            ? `  ✓ ${fmtBytes(r.bytes)} • ${relative(PKG_DIR, r.outPath)}\n`
            : `  ✗ ${r.error?.split('\n')[0] || 'failed'}\n`)
        }
      }
    }
  }

  await writeIndex(results)

  const passed = results.filter(r => r.ok).length
  const failed = results.length - passed
  console.log('')
  console.log(`Builds: ${results.length} • Passed: ${passed} • Failed: ${failed}`)
  console.log(`Index:  ${relative(process.cwd(), join(OUTPUTS_DIR, 'INDEX.md'))}`)
  console.log(`Out:    ${relative(process.cwd(), OUTPUTS_DIR)}/`)
  // Audit is informational — surface failures via INDEX.md and the
  // summary line, not via the process exit code. Reserve non-zero exit
  // for script crashes (handled by main().catch).
}

main().catch((err) => {
  console.error(err && err.stack || err)
  process.exit(1)
})
