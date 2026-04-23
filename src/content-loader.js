// Load a unipress content directory into a Uniweb content object.
//
// Wraps `@uniweb/build/site`'s `collectSiteContent`, but tells it which
// top-level config file to read (document.yml or site.yml).

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
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

  const content = await collectSiteContent(sitePath, {
    configFile,
    foundationPath: options.foundationPath
  })

  return { content, configFile, sitePath }
}
