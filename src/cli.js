#!/usr/bin/env node

import { parseArgs } from 'node:util'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { inspect } from './commands/inspect.js'
import { compileCommand } from './commands/compile.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'))

const HELP = `unipress ${pkg.version}

Compile a content directory into a document using a Uniweb foundation.

Usage:
  unipress <command> [options]

Commands:
  compile <dir>          Compile a content directory into a document
                           --format <fmt>      output format (pdf | typst | docx | xlsx)
                                                 overrides format: in document.yml
                                                 pdf compiles via typst source bundle
                           --foundation <ref>  override document.yml's foundation: field
                           --out <path>        output file (default: ./<dir>.<ext>)
                           --config <path>     explicit config file (default: <dir>/unipress.config.js)
                           --typst-binary <p>  path to a typst binary (skips managed download)
                           --keep-temp         keep the typst temp dir on failure (for debugging)
  create <dir>           Scaffold a new unipress project from a template
  inspect <dir>          Dump the resolved Website graph as JSON
                           --full              include web-only fields (assets, icons, ...)
                           --summary           replace pages[] with route strings only
                           --page <route>      keep only the page matching <route>
                           --depth <n>         truncate nested values beyond depth n
                           --foundation <ref>  override document.yml's foundation: field
                           --no-orchestrate    skip foundation import + initPrerender (raw content only)
  list-templates         List available scaffold templates

Options:
  -h, --help             Show this help
  -v, --version          Show version
      --verbose          Include stack traces in error output
`

function printHelp() {
  process.stdout.write(HELP)
}

function printVersion() {
  process.stdout.write(`${pkg.version}\n`)
}

function unknownCommand(name) {
  process.stderr.write(`error: unknown command \`${name}\`\n`)
  process.stderr.write(`run \`unipress --help\` to see available commands\n`)
  process.exit(1)
}

function notImplemented(name) {
  process.stderr.write(`error: \`${name}\` is not implemented yet (M1 — package scaffold)\n`)
  process.exit(2)
}

async function main(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    options: {
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' },
      full: { type: 'boolean' },
      summary: { type: 'boolean' },
      page: { type: 'string' },
      depth: { type: 'string' },
      foundation: { type: 'string' },
      format: { type: 'string' },
      out: { type: 'string' },
      config: { type: 'string' },
      'typst-binary': { type: 'string' },
      'keep-temp': { type: 'boolean' },
      'no-orchestrate': { type: 'boolean' },
      verbose: { type: 'boolean' }
    },
    allowPositionals: true,
    strict: false
  })

  if (values.version) {
    printVersion()
    process.exit(0)
  }

  const [command, ...rest] = positionals

  if (!command || values.help) {
    printHelp()
    process.exit(0)
  }

  try {
    switch (command) {
      case 'inspect':
        await inspect({
          dir: rest[0],
          full: values.full,
          summary: values.summary,
          page: values.page ?? null,
          depth: values.depth != null ? Number(values.depth) : null,
          foundation: values.foundation ?? null,
          orchestrate: !values['no-orchestrate']
        })
        break
      case 'compile':
        await compileCommand({
          dir: rest[0],
          format: values.format ?? null,
          foundation: values.foundation ?? null,
          out: values.out ?? null,
          config: values.config ?? null,
          typstBinary: values['typst-binary'] ?? null,
          keepTemp: !!values['keep-temp'],
          verbose: !!values.verbose
        })
        break
      case 'create':
      case 'list-templates':
        notImplemented(command)
        break
      default:
        unknownCommand(command)
    }
  } catch (err) {
    process.stderr.write(`error: ${err.message}\n`)
    if (values.verbose && err.stack) {
      process.stderr.write(err.stack + '\n')
    }
    process.exit(1)
  }

  // Defensive force-exit. Originally added because importing a built
  // foundation kept a MessagePort alive (react-dom/server got bundled
  // into a foundation chunk and ran React's scheduler at module-eval).
  // Fixed at the source in @uniweb/build by externalizing react-dom/*
  // properly, but kept here as a backstop: foundations published before
  // the fix still leak, and any future module that creates a long-lived
  // handle at import-time would do the same. CLIs shouldn't wait for
  // non-essential handles regardless.
  process.exit(0)
}

main(process.argv.slice(2))
