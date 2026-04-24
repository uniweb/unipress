// `unipress create <dir>` — scaffold a content directory from a catalog
// foundation's associated template.
//
// Flow:
//   1. If --foundation is not given and not --yes, interactively pick from
//      the catalog. If --yes without --foundation, fail.
//   2. Look up the catalog entry — resolves to a scaffold name.
//   3. Collect scaffold vars (title, author, year) via prompts unless
//      --yes is set (then defaults are used; flags override).
//   4. Copy templates/<scaffold>/ to <dir> with Handlebars substitution.
//   5. Print next steps.
//
// Result is a content-only folder — no package.json, no node_modules. On
// first compile, unipress downloads the foundation from the catalog URL
// into the shared cache and imports it.

import { resolve } from 'node:path'
import prompts from 'prompts'
import { listCatalog, findCatalogEntry } from '../catalog.js'
import { scaffold } from '../scaffold.js'
import { TemplateError } from '../errors.js'

function log(line) {
  process.stdout.write(line + '\n')
}
function err(line) {
  process.stderr.write(line + '\n')
}

async function pickFoundation() {
  const entries = listCatalog()
  if (entries.length === 0) {
    throw new TemplateError(
      `catalog is empty — no foundations available for scaffolding\n` +
      `hint: pass --foundation <ref> to bypass the catalog, or edit foundations.yml`
    )
  }
  const response = await prompts({
    type: 'select',
    name: 'id',
    message: 'Pick a foundation',
    choices: entries.map((e) => ({
      title: e.name || e.id,
      description: e.description ? String(e.description).trim().replace(/\s+/g, ' ') : undefined,
      value: e.id,
    })),
  })
  if (!response.id) {
    throw new TemplateError('no foundation selected — aborting')
  }
  return response.id
}

async function collectVars({ flagTitle, flagAuthor, interactive }) {
  const now = new Date()
  const defaults = {
    title: flagTitle || 'Untitled document',
    author: flagAuthor || '',
    year: String(now.getFullYear()),
    date: now.toISOString().slice(0, 10),
  }
  if (!interactive) return defaults
  const answers = await prompts([
    { type: flagTitle ? null : 'text', name: 'title', message: 'Title', initial: defaults.title },
    { type: flagAuthor ? null : 'text', name: 'author', message: 'Author', initial: defaults.author },
  ])
  return {
    title: flagTitle || answers.title || defaults.title,
    author: flagAuthor || answers.author || defaults.author,
    year: defaults.year,
    date: defaults.date,
  }
}

export async function createCommand({ dir, foundation, title, author, force = false, yes = false }) {
  if (!dir) {
    throw new TemplateError(
      `usage: unipress create <dir> [--foundation <id>] [--title <t>] [--author <a>]`
    )
  }
  const targetDir = resolve(dir)

  let foundationId = foundation
  if (!foundationId) {
    if (yes) {
      throw new TemplateError(
        `--yes requires --foundation (no interactive selection when --yes is set)`
      )
    }
    foundationId = await pickFoundation()
  }

  const entry = findCatalogEntry(foundationId)
  if (!entry) {
    throw new TemplateError(
      `foundation '${foundationId}' is not in the catalog\n` +
      `hint: run 'unipress list-foundations' to see available entries`
    )
  }

  const templateName = entry.scaffold
  if (!templateName) {
    throw new TemplateError(
      `catalog entry '${foundationId}' has no scaffold declared\n` +
      `hint: add 'scaffold: <name>' to the entry in foundations.yml`
    )
  }

  const vars = await collectVars({ flagTitle: title, flagAuthor: author, interactive: !yes })
  vars.foundation = foundationId

  log(`scaffolding ${targetDir}`)
  log(`  foundation: ${entry.name || entry.id} (id: ${entry.id})`)
  log(`  template:   ${templateName}`)

  await scaffold({
    templateName,
    targetDir,
    vars,
    force,
    onProgress: (msg) => log(`  ${msg}`),
  })

  log('')
  log(`✓ ready`)
  log(`  next: cd ${dir}`)
  const formats = Array.isArray(entry.outputs) && entry.outputs.length > 0
    ? entry.outputs.join(' | ')
    : 'pdf'
  log(`        unipress compile --format <${formats}>`)
  log('')
  log(`note: the foundation is loaded from ${entry.source?.url ?? '(no source.url)'}`)
  log(`      it will be fetched + cached on the first compile. See foundations.yml.`)
}

export async function listFoundationsCommand() {
  const entries = listCatalog()
  if (entries.length === 0) {
    err('catalog is empty')
    return
  }
  for (const e of entries) {
    log(`${e.id}`)
    if (e.name) log(`  ${e.name}`)
    if (e.description) {
      const desc = String(e.description).trim().replace(/\s+/g, ' ')
      log(`  ${desc}`)
    }
    if (Array.isArray(e.outputs) && e.outputs.length > 0) {
      log(`  outputs: ${e.outputs.join(', ')}`)
    }
    if (e.source?.url) log(`  source:  ${e.source.url}`)
    log('')
  }
}
