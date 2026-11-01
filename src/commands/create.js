// `unipress create <dir>` — scaffold a content directory from a catalog
// template. A template pins a foundation and ships starter content; the
// foundation it pins is the runtime artifact unipress loads at compile.
//
// Flow:
//   1. If --template is not given, interactively pick from the catalog. A
//      run nobody can answer (--yes, or no terminal) fails instead.
//   2. Look up the catalog entry — resolves to a scaffold name.
//   3. Collect scaffold vars (title, author, year) via prompts, or from
//      defaults and flags in a run nobody can answer.
//   4. Copy templates/<scaffold>/ to <dir> with Handlebars substitution.
//   5. Print next steps, and in such a run what it chose.
//
// Result is a content-only folder — no package.json, no node_modules. On
// first compile, unipress downloads the foundation from the catalog URL
// into the shared cache and imports it.

import { resolve } from 'node:path'
import prompts from 'prompts'
import { listCatalog, findCatalogEntry } from '../catalog.js'
import { scaffold } from '../scaffold.js'
import { TemplateError } from '../errors.js'
import { detectPaper, normalizePaper, PAPER_LABELS, PAPERS } from '../paper.js'

function log(line) {
  process.stdout.write(line + '\n')
}
function err(line) {
  process.stderr.write(line + '\n')
}

async function pickTemplate() {
  const entries = listCatalog()
  if (entries.length === 0) {
    throw new TemplateError(
      `catalog is empty — no templates available for scaffolding\n` +
      `hint: edit foundations.yml to add a template entry`
    )
  }
  const response = await prompts({
    type: 'select',
    name: 'id',
    message: 'Pick a template',
    choices: entries.map((e) => ({
      title: e.name || e.id,
      description: e.description ? String(e.description).trim().replace(/\s+/g, ' ') : undefined,
      value: e.id,
    })),
  })
  if (!response.id) {
    throw new TemplateError('no template selected — aborting')
  }
  return response.id
}

// `paper`: the page the document.yml will state — the flag, else what this system's region uses
// (`paper.js`), asked at a terminal where the template prints on paper. `paperChosen`: whether it
// was asked for by name, which a template with a book trim reads: a 6×9 book stays one unless
// someone says otherwise.
async function collectVars({ flagTitle, flagAuthor, flagPaper, takesPaper, interactive }) {
  const now = new Date()
  const detected = detectPaper()
  const defaults = {
    title: flagTitle || 'Untitled document',
    author: flagAuthor || '',
    year: String(now.getFullYear()),
    date: now.toISOString().slice(0, 10),
    paper: flagPaper || detected.paper,
    paperChosen: Boolean(flagPaper),
  }
  if (!interactive) return defaults
  let cancelled = false
  const answers = await prompts([
    { type: flagTitle ? null : 'text', name: 'title', message: 'Title', initial: defaults.title },
    { type: flagAuthor ? null : 'text', name: 'author', message: 'Author', initial: defaults.author },
    {
      type: takesPaper && !flagPaper ? 'select' : null,
      name: 'paper',
      message: 'Page size',
      choices: PAPERS.map((p) => ({ title: PAPER_LABELS[p], value: p })),
      initial: PAPERS.indexOf(detected.paper),
    },
  ], {
    // Left to itself, prompts hands back the answers so far, and Ctrl-C would make the project.
    onCancel: () => {
      cancelled = true
    },
  })
  if (cancelled) throw new TemplateError('cancelled — nothing created')
  return {
    ...defaults,
    title: flagTitle || answers.title || defaults.title,
    author: flagAuthor || answers.author || defaults.author,
    paper: answers.paper ?? defaults.paper,
  }
}

export async function createCommand({ dir, template, title, author, paper, force = false, yes = false }) {
  if (!dir) {
    throw new TemplateError(
      `usage: unipress create <dir> [--template <id>] [--title <t>] [--author <a>] [--paper <a4|letter>]`
    )
  }
  const flagPaper = normalizePaper(paper, '--paper')
  const targetDir = resolve(dir)

  // No terminal means nobody to ask. A prompt would read a stdin already at its end, the event loop
  // would run out with the question open, and the process would exit 0 with nothing on disk. So
  // that run goes the way of `--yes`: it finishes, and says what it chose.
  const unattended = yes || !process.stdin.isTTY

  let templateId = template
  if (!templateId) {
    if (unattended) {
      const ids = listCatalog().map((e) => e.id).join(', ')
      throw new TemplateError(
        `no template named, and ${yes ? '--yes means nobody is asked' : 'no terminal to ask at'}\n` +
        `hint: unipress create ${dir} --template <id>, one of: ${ids}\n` +
        `hint: run 'unipress list-templates' for what each one is`
      )
    }
    templateId = await pickTemplate()
  }

  const entry = findCatalogEntry(templateId)
  if (!entry) {
    throw new TemplateError(
      `template '${templateId}' is not in the catalog\n` +
      `hint: run 'unipress list-templates' to see available entries`
    )
  }

  const scaffoldName = entry.scaffold
  if (!scaffoldName) {
    throw new TemplateError(
      `catalog entry '${templateId}' has no scaffold declared\n` +
      `hint: add 'scaffold: <name>' to the entry in foundations.yml`
    )
  }

  const vars = await collectVars({
    flagTitle: title,
    flagAuthor: author,
    flagPaper,
    takesPaper: Boolean(entry.takesPaper),
    interactive: !unattended,
  })
  vars.foundation = templateId

  log(`scaffolding ${targetDir}`)
  log(`  template:  ${entry.name || entry.id} (id: ${entry.id})`)
  log(`  scaffold:  ${scaffoldName}`)
  // Said, not asked, in a run nobody can answer: that is how an agent runs this.
  if (unattended && !title) log(`  title:     ${vars.title} — change it in document.yml, or --title`)
  if (unattended && !author) log(`  author:    none — change it in document.yml, or --author`)
  if (entry.takesPaper || flagPaper) {
    const { region } = detectPaper()
    const why = region ? `the paper of this system's region (${region})` : 'the default, with no region to go by'
    log(`  paper:     ${PAPER_LABELS[vars.paper]}${unattended && !flagPaper ? `, ${why} — change it in document.yml, or --paper for one build` : ''}`)
  }

  await scaffold({
    templateName: scaffoldName,
    targetDir,
    vars,
    force,
    onProgress: (msg) => log(`  ${msg}`),
  })

  log('')
  log(`✓ ready`)
  log(`  next: cd ${dir}`)
  log(`        unipress compile .`)
  if (Array.isArray(entry.outputs) && entry.outputs.length > 1) {
    log(`  or any of its formats: unipress compile . --format <${entry.outputs.join(' | ')}>`)
  }
  log('')
  const foundationUrl = entry.foundation?.source?.url ?? entry.source?.url
  const foundationRef = entry.foundation?.ref
  if (foundationRef) {
    log(`note: the document.yml pins ${foundationRef}`)
  }
  if (foundationUrl) {
    log(`      it will be fetched from ${foundationUrl}`)
    log(`      and cached on the first compile.`)
  }
}

export async function listTemplatesCommand() {
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
    if (e.foundation?.ref) log(`  pins:    ${e.foundation.ref}`)
    const url = e.foundation?.source?.url ?? e.source?.url
    if (url) log(`  source:  ${url}`)
    log('')
  }
}
