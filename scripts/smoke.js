#!/usr/bin/env node

/**
 * What a person does with unipress, run against what they would install, and the
 * result read: every template scaffolded, compiled to every format it lists, on each
 * paper. A compile that exits 0 proves little, so each file is opened: the right kind
 * of file, on the page that was asked for.
 *
 * Usage:
 *   node scripts/smoke.js                     this checkout, with foundations/ (built first)
 *   node scripts/smoke.js --bin <path>        a compiled binary, with the foundations its
 *                                             templates pin, as a person's first compile gets
 *   node scripts/smoke.js --foundations local use foundations/ with --bin too
 *   node scripts/smoke.js --template book,invoice
 *   node scripts/smoke.js --no-pdf            skip what needs the Typst binary
 *   node scripts/smoke.js --epubcheck <jar>   also validate each EPUB with EPUBCheck
 *   node scripts/smoke.js --keep              keep the working folder
 *
 * Exits 1 when anything failed, naming it.
 */

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { inflateRawSync } from 'node:zlib'
import { listCatalog } from '../src/catalog.js'
import pkg from '../package.json' with { type: 'json' }

const PKG_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const { values } = parseArgs({
  options: {
    bin: { type: 'string' },
    foundations: { type: 'string' },
    template: { type: 'string' },
    'no-pdf': { type: 'boolean' },
    epubcheck: { type: 'string' },
    keep: { type: 'boolean' },
  },
})

const command = values.bin ? [resolve(values.bin)] : [process.execPath, join(PKG_DIR, 'src/cli.js')]
const localFoundations = (values.foundations ?? (values.bin ? 'pinned' : 'local')) === 'local'
const only = values.template ? new Set(values.template.split(',')) : null

const work = mkdtempSync(join(tmpdir(), 'unipress-smoke-'))
const failures = []
let passed = 0

function check(label, ok, detail = '') {
  if (ok) {
    passed += 1
    process.stdout.write(`  ✓ ${label}\n`)
  } else {
    failures.push(`${label}${detail ? `: ${detail}` : ''}`)
    process.stdout.write(`  ✗ ${label}${detail ? `: ${detail}` : ''}\n`)
  }
  return ok
}

function run(args, { cwd = work, timeout = 180_000 } = {}) {
  const [bin, ...lead] = command
  const r = spawnSync(bin, [...lead, ...args], { cwd, encoding: 'utf8', timeout })
  return { status: r.status, text: `${r.stdout ?? ''}${r.stderr ?? ''}`.trim() }
}

// What a failed command said, from its `error:` line on: that is where the cause is, and the last
// line is only ever a hint.
const whatItSaid = (text) => {
  const lines = text.split('\n').filter(Boolean)
  const from = lines.findIndex((line) => /^(internal )?error:/.test(line))
  return (from < 0 ? lines.slice(-3) : lines.slice(from)).join('\n      ')
}

/** The files in a zip, by name. Enough for what the Office libraries and JSZip write. */
function readZip(file) {
  const buf = readFileSync(file)
  let eocd = buf.length - 22
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd -= 1
  if (eocd < 0) throw new Error('not a zip')
  const entries = new Map()
  let at = buf.readUInt32LE(eocd + 16)
  for (let i = buf.readUInt16LE(eocd + 10); i > 0; i -= 1) {
    const method = buf.readUInt16LE(at + 10)
    const size = buf.readUInt32LE(at + 20)
    const nameLength = buf.readUInt16LE(at + 28)
    const local = buf.readUInt32LE(at + 42)
    const name = buf.toString('utf8', at + 46, at + 46 + nameLength)
    entries.set(name, () => {
      const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28)
      const body = buf.subarray(start, start + size)
      return (method === 8 ? inflateRawSync(body) : body).toString('utf8')
    })
    at += 46 + nameLength + buf.readUInt16LE(at + 30) + buf.readUInt16LE(at + 32)
  }
  return entries
}

// What page each kind of file says it prints on: 'a4', 'letter', a size for anything else, or
// null when the file holds no statement of one.
const PAGE_OF = {
  pdf(file) {
    const box = /\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*\]/.exec(readFileSync(file, 'latin1'))
    if (!box) return null
    const [w, h] = [Math.round(Number(box[1])), Math.round(Number(box[2]))]
    return w === 595 && h === 842 ? 'a4' : w === 612 && h === 792 ? 'letter' : `${w}x${h}`
  },
  typst(file) {
    const page = /#set page\(\s*width:\s*([\w.]+),\s*height:\s*([\w.]+)/.exec(readZip(file).get('template.typ')())
    if (!page) return null
    return page[1] === '210mm' ? 'a4' : page[1] === '8.5in' ? 'letter' : `${page[1]}x${page[2]}`
  },
  latex(file) {
    const page = /paperwidth=([\w.]+), paperheight=([\w.]+)/.exec(readZip(file).get('template.tex')())
    if (!page) return null
    return page[1] === '210mm' ? 'a4' : page[1] === '8.5in' ? 'letter' : `${page[1]}x${page[2]}`
  },
  pagedjs(file) {
    const page = /@page\s*\{\s*size:\s*([^;]+);/.exec(readFileSync(file, 'utf8'))
    if (!page) return null
    const size = page[1].trim().toLowerCase()
    return size === 'a4' || size === '210mm 297mm' ? 'a4' : size === 'letter' || size === '8.5in 11in' ? 'letter' : size
  },
  docx(file) {
    const width = /<w:pgSz[^>]*w:w="(\d+)"/.exec(readZip(file).get('word/document.xml')())?.[1]
    return width === '11906' ? 'a4' : width === '12240' ? 'letter' : width ?? null
  },
  xlsx(file) {
    const code = /<pageSetup[^>]*paperSize="(\d+)"/.exec(readZip(file).get('xl/worksheets/sheet1.xml')())?.[1]
    return code === '9' ? 'a4' : code === '1' ? 'letter' : code ?? null
  },
}

// The file's own bytes say it is what it claims to be.
const KIND_OF = {
  pdf: (buf) => buf.subarray(0, 5).toString() === '%PDF-',
  typst: (buf) => buf.readUInt32LE(0) === 0x04034b50,
  latex: (buf) => buf.readUInt32LE(0) === 0x04034b50,
  docx: (buf) => buf.readUInt32LE(0) === 0x04034b50,
  xlsx: (buf) => buf.readUInt32LE(0) === 0x04034b50,
  epub: (buf) => buf.toString('latin1', 30, 58) === 'mimetypeapplication/epub+zip',
  pagedjs: (buf) => buf.toString('utf8', 0, 200).toLowerCase().includes('<!doctype html'),
}

const EXTENSION = { typst: 'typst.zip', latex: 'latex.zip', pagedjs: 'html' }

function foundationDir(entry) {
  return join(PKG_DIR, 'foundations', /^@[^/]+\/([^@]+)@/.exec(entry.foundation.ref)[1])
}

function compile(entry, dir, format, extra = []) {
  const file = join(work, 'out', `${dir}.${EXTENSION[format] ?? format}`)
  const args = ['compile', dir, '--format', format, '--out', file, ...extra]
  if (localFoundations) args.push('--foundation', foundationDir(entry))
  return { file, ...run(args) }
}

function checkCompiled(label, { file, status, text }, format, want) {
  if (!check(`${label} compiles`, status === 0 && existsSync(file), whatItSaid(text))) return
  check(`${label} is a ${format} file`, KIND_OF[format](readFileSync(file)))
  if (want && PAGE_OF[format]) {
    const page = PAGE_OF[format](file)
    check(`${label} prints on ${want}`, page === want, `reads as ${page}`)
  }
}

const catalog = listCatalog().filter((e) => !only || only.has(e.id))

process.stdout.write(`${command.map((c) => c.replace(PKG_DIR, '.')).join(' ')}\n`)
process.stdout.write(`foundations: ${localFoundations ? 'this checkout' : 'as the templates pin them'}\n`)

// ── It starts, and is the version it says ───────────────────────────────────
const version = run(['--version'])
check(`--version is ${pkg.version}`, version.status === 0 && version.text === pkg.version, whatItSaid(version.text))

// ── Every template, every format, each paper ───────────────────────────────
for (const entry of catalog) {
  const formats = entry.outputs.filter((f) => !(values['no-pdf'] && f === 'pdf'))
  for (const paper of ['a4', 'letter']) {
    const dir = `${entry.id}-${paper}`
    process.stdout.write(`\n${entry.id}, --paper ${paper}\n`)
    const created = run(['create', dir, '--template', entry.id, '--title', `Smoke ${entry.id}`, '--author', 'A. Tester', '--yes', '--paper', paper])
    if (!check(`${dir} scaffolds`, created.status === 0 && existsSync(join(work, dir, 'document.yml')), whatItSaid(created.text))) continue
    for (const format of formats) {
      // The UofT template's LaTeX takes its page from its class, and that file states none.
      const want = entry.id === 'thesis' && format === 'latex' ? null : paper
      checkCompiled(`${dir} ${format}`, compile(entry, dir, format), format, want)
    }
  }
}

// ── The settings around it ──────────────────────────────────────────────────
const article = catalog.find((e) => e.id === 'article')
const book = catalog.find((e) => e.id === 'book')

if (article) {
  process.stdout.write('\narticle, the paper a document states and the one a build names\n')
  const yml = readFileSync(join(work, 'article-a4/document.yml'), 'utf8')
  check('the document.yml states it', /^paper: a4$/m.test(yml))

  const pagedjs = compile(article, 'article-a4', 'pagedjs', ['--paper', 'letter'])
  check('--paper letter beats paper: a4', PAGE_OF.pagedjs(pagedjs.file) === 'letter', PAGE_OF.pagedjs(pagedjs.file))

  const refused = run(['compile', 'article-a4', '--format', 'pagedjs', '--paper', 'legal'])
  check('--paper legal is refused, by name', refused.status === 1 && /is not a paper/.test(refused.text), refused.text)

  const epub = compile(article, 'article-a4', 'epub', ['--paper', 'letter'])
  check('--paper on a format with no pages says so', epub.status === 0 && /has no pages/.test(epub.text), whatItSaid(epub.text))
}

if (book) {
  process.stdout.write('\nbook, the shape it is trimmed to and the title it opens with\n')
  const created = run(['create', 'book-plain', '--template', 'book', '--title', 'Smoke book', '--author', 'A. Tester', '--yes'])
  check('a book scaffolds with no paper named', created.status === 0, whatItSaid(created.text))
  check('and keeps its trim', /^\s*trim: trade-6x9$/m.test(readFileSync(join(work, 'book-plain/document.yml'), 'utf8')))

  // As printed, from where it says to stand.
  const next = /next: cd (\S+)\n\s+unipress (.+)/.exec(created.text)
  const nextStep = next
    ? run([...next[2].trim().split(/\s+/), ...(localFoundations ? ['--foundation', foundationDir(book)] : [])], { cwd: join(work, next[1]) })
    : { status: null, text: created.text }
  check('the next step it prints works', nextStep.status === 0, whatItSaid(nextStep.text))
  check('a compile says what happened, and no more', /^wrote /.test(nextStep.text) && !/^\[/m.test(nextStep.text), nextStep.text.slice(0, 200))
  const inspected = run(['inspect', 'book-plain', '--summary', '--no-orchestrate'])
  check('inspect writes JSON', (() => { try { return Boolean(JSON.parse(inspected.text)) } catch { return false } })(), inspected.text.slice(0, 120))

  const yml = join(work, 'book-plain/document.yml')
  const asScaffolded = readFileSync(yml, 'utf8')
  writeFileSync(yml, asScaffolded.replace(/front: .*/, 'front: /assets/front.jpg'))
  const rooted = compile(book, 'book-plain', 'typst')
  check('a cover named from the top of the folder is found', rooted.status === 0 && readZip(rooted.file).has('covers/front.jpg'), whatItSaid(rooted.text))
  writeFileSync(yml, asScaffolded.replace(/front: .*/, 'front: assets/nope.jpg'))
  const noCover = compile(book, 'book-plain', 'typst')
  check('a cover that is not there stops the build, by name', noCover.status === 1 && /assets\/nope\.jpg/.test(noCover.text), whatItSaid(noCover.text))
  writeFileSync(yml, asScaffolded)

  const named = join(work, 'out/named.epub')
  const byName = run(['compile', 'book-plain', '--out', named, ...(localFoundations ? ['--foundation', foundationDir(book)] : [])])
  check('--out o.epub builds an EPUB', byName.status === 0 && KIND_OF.epub(readFileSync(named)), whatItSaid(byName.text))
  const mismatch = run(['compile', 'book-plain', '--format', 'pagedjs', '--out', join(work, 'out/mismatch.pdf')])
  check('--format pagedjs --out o.pdf is refused', mismatch.status === 1 && /writes pagedjs/.test(mismatch.text), mismatch.text)

  const pagedjs = compile(book, 'book-plain', 'pagedjs')
  check('the same trim in every format', PAGE_OF.pagedjs(pagedjs.file) === '6in 9in', PAGE_OF.pagedjs(pagedjs.file))

  const typst = compile(book, 'book-plain', 'typst')
  const body = readZip(typst.file).get('content.typ')()
  check('a chapter opens with its title, once', /#chapter-opener\(title: "Welcome"\)/.test(body) && !/^= Welcome$/m.test(body))
  const latex = compile(book, 'book-plain', 'latex')
  const tex = readZip(latex.file).get('content.tex')()
  check('in LaTeX too', /\\chapteropener\{\}\{Welcome\}/.test(tex) && !/^\\chapter\{Welcome\}/m.test(tex))
  const html = readFileSync(pagedjs.file, 'utf8')
  check('in Paged.js too', html.match(/<h1[^>]*>\s*Welcome\s*<\/h1>/g)?.length === 1)
  check('a footnote reaches its mark', body.includes('#footnote[') && !body.includes('[^1]'))
  check('in LaTeX too', tex.includes('\\footnote{') && !tex.includes('[^1]'))
  check('in Paged.js, as a numbered note', html.includes('class="footnote-ref"') && html.includes('class="footnotes"') && !html.includes('[^1]'))
}

const report = catalog.find((e) => e.id === 'report')
if (report) {
  process.stdout.write('\nreport, the table it opens with\n')
  const created = run(['create', 'report-plain', '--template', 'report', '--title', 'Smoke report', '--author', 'A. Tester', '--yes'])
  check('a report scaffolds', created.status === 0, whatItSaid(created.text))
  const typst = compile(report, 'report-plain', 'typst')
  check('its table reaches Typst', readZip(typst.file).get('content.typ')().includes('#table('))
  const latex = compile(report, 'report-plain', 'latex')
  check('and LaTeX', readZip(latex.file).get('content.tex')().includes('\\begin{tabular}'))
  const pagedjs = compile(report, 'report-plain', 'pagedjs')
  check('and Paged.js', readFileSync(pagedjs.file, 'utf8').includes('<table'))
  const template = readZip(typst.file).get('template.typ')()
  check('with no cover, it opens on its title page and not a blank one', !template.slice(0, template.indexOf('#v(3in)')).includes('pagebreak(to:'))
}

const thesis = catalog.find((e) => e.id === 'thesis')
if (thesis) {
  process.stdout.write('\nthesis, read\n')
  const created = run(['create', 'thesis-plain', '--template', 'thesis', '--title', 'Smoke thesis', '--author', 'A. Tester', '--yes'])
  check('a thesis scaffolds', created.status === 0, whatItSaid(created.text))
  const typst = compile(thesis, 'thesis-plain', 'typst')
  const bundle = readZip(typst.file)
  const body = bundle.get('content.typ')()
  check('its math is math', body.includes('#mitex') && !body.includes('\\$'))
  check('its references print', !/described in ,/.test(body) && !/preliminaries in  /.test(body))
  check('a citation in a theorem prints', !/established in \./.test(body))
  check('the first citation prints under a numbered style', /NP-hard \[\d+\], \[\d+\],/.test(body))
  check('every citation finds its record', !body.includes('[?'))
  const at = (text) => body.indexOf(text)
  check('it opens on its own title page', at('#page(numbering: none)') !== -1 && !/Title page/.test(bundle.get('template.typ')()))
  check('its contents follow the abstract', at('title: "Abstract"') !== -1 && at('title: "Abstract"') < at('#outline('))
  check('its chapters are in the order it lists', at('title: "Main Result"') !== -1 && at('title: "Main Result"') < at('*Theorem'))
  check('a list of figures with no figures takes no chapter number', !body.includes('title: "List of Figures")'))
}

const monograph = catalog.find((e) => e.id === 'monograph')
if (monograph && !values['no-pdf']) {
  process.stdout.write('\nmonograph, the typeface it ships\n')
  const created = run(['create', 'monograph-plain', '--template', 'monograph', '--title', 'Smoke monograph', '--author', 'A. Tester', '--yes'])
  check('it brings its font and the license', existsSync(join(work, 'monograph-plain/fonts/EBGaramond-Regular.ttf')) && existsSync(join(work, 'monograph-plain/fonts/OFL.txt')), whatItSaid(created.text))
  const pdf = compile(monograph, 'monograph-plain', 'pdf')
  check('the PDF is set in it, on any machine', pdf.status === 0 && readFileSync(pdf.file, 'latin1').includes('EBGaramond'), whatItSaid(pdf.text))
  check('and says nothing of a missing font', !/have the font/.test(pdf.text), pdf.text)
}

// ── A folder of markdown, no project ───────────────────────────────────────
if (article) {
  process.stdout.write('\na bare folder of markdown\n')
  const dir = join(work, 'my-notes')
  mkdirSync(dir)
  writeFileSync(join(dir, '01-intro.md'), '# Intro\n\nA first section.\n')
  writeFileSync(join(dir, '02-next.md'), '# Next\n\nA second section.\n')
  writeFileSync(join(dir, 'README.md'), '# Not part of it\n')
  const file = join(work, 'out/my-notes.html')
  const args = ['compile', dir, '--yes', '--format', 'pagedjs', '--paper', 'letter', '--out', file]
  if (localFoundations) args.push('--foundation', foundationDir(article))
  const result = run(args)
  check('compiles with --yes', result.status === 0 && existsSync(file), whatItSaid(result.text))
  check('writes a document.yml', existsSync(join(dir, 'document.yml')))
  if (existsSync(join(dir, 'document.yml'))) {
    const yml = readFileSync(join(dir, 'document.yml'), 'utf8')
    check('states the paper in it', /^paper: letter$/m.test(yml))
    check('leaves the README out of it', !/readme/i.test(yml.split('content:')[1] ?? ''))
  }
}

// ── EPUBCheck, when there is one to hand ───────────────────────────────────
if (values.epubcheck) {
  process.stdout.write('\nEPUBCheck\n')
  for (const entry of catalog) {
    if (!entry.outputs.includes('epub')) continue
    const file = join(work, 'out', `${entry.id}-a4.epub`)
    const r = spawnSync('java', ['-jar', values.epubcheck, file], { encoding: 'utf8', timeout: 120_000 })
    const messages = `${r.stdout}${r.stderr}`
    const errors = messages.split('\n').filter((l) => /^(ERROR|FATAL)/.test(l))
    check(`${entry.id}.epub passes`, r.status === 0, errors.slice(0, 3).join(' | ').slice(0, 400))
  }
}

process.stdout.write(`\n${passed} passed, ${failures.length} failed\n`)
if (failures.length) for (const f of failures) process.stdout.write(`  ✗ ${f}\n`)

if (values.keep) process.stdout.write(`kept ${work}\n`)
else rmSync(work, { recursive: true, force: true })

process.exit(failures.length ? 1 : 0)
