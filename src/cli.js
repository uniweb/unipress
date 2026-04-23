#!/usr/bin/env node

import { parseArgs } from 'node:util'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'))

const HELP = `unipress ${pkg.version}

Compile a content directory into a document using a Uniweb foundation.

Usage:
  unipress <command> [options]

Commands:
  compile <dir>          Compile a content directory into a document
  create <dir>           Scaffold a new unipress project from a template
  inspect <dir>          Dump the resolved Website graph as JSON
  list-templates         List available scaffold templates

Options:
  -h, --help             Show this help
  -v, --version          Show version

Run \`unipress <command> --help\` for command-specific options.
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

function main(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    options: {
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' }
    },
    allowPositionals: true,
    strict: false
  })

  if (values.version) {
    printVersion()
    return
  }

  const [command] = positionals

  if (!command || values.help) {
    printHelp()
    return
  }

  switch (command) {
    case 'compile':
    case 'create':
    case 'inspect':
    case 'list-templates':
      notImplemented(command)
      break
    default:
      unknownCommand(command)
  }
}

main(process.argv.slice(2))
