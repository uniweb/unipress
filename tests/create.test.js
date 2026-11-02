/**
 * `unipress create` with no terminal, which is how an agent or a script runs it.
 *
 * It spawns the CLI because the thing under test is what the process does: a prompt read from a
 * stdin already at its end leaves the event loop with nothing to wait for, so the process used to
 * exit 0 with the question still open and nothing on disk. Only an exit code and a folder show that.
 */

import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, describe, expect, it } from 'vitest'
import { listCatalog } from '../src/catalog.js'

const CLI = resolve(dirname(fileURLToPath(import.meta.url)), '../src/cli.js')
const work = mkdtempSync(join(tmpdir(), 'unipress-create-'))
afterAll(() => rmSync(work, { recursive: true, force: true }))

// `input` given: stdin is a pipe holding it. Not given: stdin is closed.
function create(args, input) {
  return spawnSync(process.execPath, [CLI, 'create', ...args], {
    cwd: work,
    encoding: 'utf8',
    timeout: 30_000,
    ...(input === undefined ? { stdio: ['ignore', 'pipe', 'pipe'] } : { input }),
  })
}

describe('unipress create with no terminal', () => {
  it('creates the project from --template, as --yes does', () => {
    const r = create(['closed', '--template', 'invoice'])
    expect(r.status).toBe(0)
    expect(existsSync(join(work, 'closed/document.yml'))).toBe(true)
    expect(r.stdout).toContain('✓ ready')
  })

  it('does the same when stdin is an empty pipe', () => {
    const r = create(['piped', '--template', 'invoice'], '')
    expect(r.status).toBe(0)
    expect(existsSync(join(work, 'piped/document.yml'))).toBe(true)
  })

  it('says what it chose, since nobody was asked', () => {
    const r = create(['said', '--template', 'data-report'])
    expect(r.stdout).toMatch(/title: +Untitled document/)
    expect(r.stdout).toContain('--title')
    expect(r.stdout).toMatch(/paper: +(A4|US Letter)/)
    expect(readFileSync(join(work, 'said/document.yml'), 'utf8')).toContain('name: "Untitled document"')
  })

  it('takes the flags it is given, and repeats none of them as a choice', () => {
    const r = create(['flags', '--template', 'data-report', '--title', 'Q3', '--author', 'Finance', '--paper', 'a4'])
    expect(r.status).toBe(0)
    expect(r.stdout).not.toMatch(/title: +Q3/)
    const yml = readFileSync(join(work, 'flags/document.yml'), 'utf8')
    expect(yml).toContain('name: "Q3"')
    expect(yml).toContain('author: "Finance"')
    expect(yml).toContain('paper: a4')
  })

  it('refuses with no --template, naming the ids, and creates nothing', () => {
    const r = create(['none'])
    expect(r.status).toBe(1)
    expect(existsSync(join(work, 'none'))).toBe(false)
    expect(r.stderr).toContain('--template')
    for (const { id } of listCatalog()) expect(r.stderr).toContain(id)
  })

  it('refuses a template the catalog does not have, with a failing exit', () => {
    const r = create(['unknown', '--template', 'no-such-template'])
    expect(r.status).toBe(1)
    expect(existsSync(join(work, 'unknown'))).toBe(false)
  })
})

// Closes the read end after the first thing the CLI says, as `| head -1` does.
function createWhileTheReaderLeaves(args) {
  return new Promise((done, fail) => {
    const child = spawn(process.execPath, [CLI, 'create', ...args], { cwd: work, stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = ''
    child.stderr.setEncoding('utf8').on('data', (chunk) => { stderr += chunk })
    child.stdout.once('data', () => child.stdout.destroy())
    child.on('error', fail)
    child.on('close', (status) => done({ status, stderr }))
  })
}

describe('unipress create when its reader goes away', () => {
  const filesIn = (dir) => readdirSync(join(work, dir), { recursive: true }).sort()

  it('still makes the whole project, and exits 0', async () => {
    const args = ['--template', 'thesis', '--title', 'T', '--author', 'A']
    expect(create(['stayed', ...args]).status).toBe(0)
    const r = await createWhileTheReaderLeaves(['left', ...args])
    expect(r.stderr).toBe('')
    expect(r.status).toBe(0)
    expect(filesIn('left')).toEqual(filesIn('stayed'))
  })

  it('still fails when the work fails', async () => {
    mkdirSync(join(work, 'taken'))
    writeFileSync(join(work, 'taken/mine.txt'), 'mine')
    const r = await createWhileTheReaderLeaves(['taken', '--template', 'thesis'])
    expect(r.status).toBe(1)
    expect(filesIn('taken')).toEqual(['mine.txt'])
  })
})

describe('unipress create --yes', () => {
  it('creates the project from --template', () => {
    const r = create(['yes', '--template', 'invoice', '--yes'])
    expect(r.status).toBe(0)
    expect(existsSync(join(work, 'yes/document.yml'))).toBe(true)
  })

  it('refuses with no --template, naming the ids', () => {
    const r = create(['yes-none', '--yes'])
    expect(r.status).toBe(1)
    expect(existsSync(join(work, 'yes-none'))).toBe(false)
    for (const { id } of listCatalog()) expect(r.stderr).toContain(id)
  })
})
