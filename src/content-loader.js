// Load a unipress content directory into a Uniweb content object.
//
// Wraps `@uniweb/build/site`'s `collectSiteContent`, but tells it which
// top-level config file to read (document.yml or site.yml).

import { existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { collectSiteContent } from '@uniweb/build/site'
import { detectConfigFile, CONFIG_FILE_NAMES } from './document-yml.js'
import { ContentDirectoryError, DocumentYmlError } from './errors.js'

export async function loadContent(dir, options = {}) {
  const sitePath = resolve(dir)

  if (!existsSync(sitePath)) {
    throw new ContentDirectoryError(`content directory does not exist: ${sitePath}`)
  }

  const configFile = detectConfigFile(sitePath)
  if (!configFile) {
    throw new DocumentYmlError(
      `no ${CONFIG_FILE_NAMES.PRIMARY} (or ${CONFIG_FILE_NAMES.FALLBACK}) found in ${sitePath}`
    )
  }

  let content
  try {
    content = await collectSiteContent(sitePath, {
      configFile,
      foundationPath: options.foundationPath
    })
  } catch (err) {
    // js-yaml throws YAMLException with .mark.line/.column. Wrap it in
    // DocumentYmlError so the CLI reports it with a location hint
    // instead of a bare stack trace.
    if (err?.name === 'YAMLException') {
      const configPath = join(sitePath, configFile)
      const line = err?.mark?.line != null ? err.mark.line + 1 : null
      const col = err?.mark?.column != null ? err.mark.column + 1 : null
      const loc = line != null ? `${configPath}:${line}${col != null ? `:${col}` : ''}` : configPath
      throw new DocumentYmlError(
        `malformed YAML in ${configFile}\n` +
        `at ${loc}\n` +
        `cause: ${err.reason || err.message}`
      )
    }
    throw err
  }

  return { content, configFile, sitePath }
}
