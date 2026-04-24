// Scaffold a content directory from a unipress template.
//
// Templates live in `framework/unipress/templates/<name>/`. Each template
// is a directory tree that gets copied into the target; files with a
// `.hbs` suffix get Handlebars-processed (stripping the `.hbs`). No
// package.json is written — unipress projects are content-only.
//
// Variables available in `.hbs` files:
//   title, author, year, date, foundation
//
// Consumers: src/commands/create.js.

import { readdir, stat, mkdir, readFile, writeFile, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'
import Handlebars from 'handlebars'
import { TemplateError } from './errors.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const TEMPLATES_DIR = join(__dirname, '..', 'templates')

export function getTemplatePath(name) {
  return join(TEMPLATES_DIR, name)
}

export async function scaffold({ templateName, targetDir, vars, force = false, onProgress = () => {} }) {
  const templateDir = getTemplatePath(templateName)
  if (!existsSync(templateDir)) {
    throw new TemplateError(
      `template not found: '${templateName}'\n` +
      `hint: run 'unipress list-foundations' to see available foundations and their scaffolds`
    )
  }
  if (existsSync(targetDir) && (await readdir(targetDir)).length > 0 && !force) {
    throw new TemplateError(
      `target directory is not empty: ${targetDir}\n` +
      `hint: pick a different directory, or pass --force to overwrite`
    )
  }
  await mkdir(targetDir, { recursive: true })
  await copyTree(templateDir, targetDir, vars, onProgress)
}

async function copyTree(srcDir, dstDir, vars, onProgress) {
  const entries = await readdir(srcDir, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name)
    if (entry.isDirectory()) {
      const dstSubdir = join(dstDir, entry.name)
      await mkdir(dstSubdir, { recursive: true })
      await copyTree(srcPath, dstSubdir, vars, onProgress)
      continue
    }
    if (!entry.isFile()) continue

    if (entry.name.endsWith('.hbs')) {
      const dstName = entry.name.slice(0, -'.hbs'.length)
      const dstPath = join(dstDir, dstName)
      const raw = await readFile(srcPath, 'utf8')
      const rendered = Handlebars.compile(raw, { noEscape: true })(vars)
      await writeFile(dstPath, rendered)
      onProgress(`rendered ${relative(TEMPLATES_DIR, srcPath)} → ${dstName}`)
    } else {
      const dstPath = join(dstDir, entry.name)
      await copyFile(srcPath, dstPath)
      onProgress(`copied   ${relative(TEMPLATES_DIR, srcPath)}`)
    }
  }
}
