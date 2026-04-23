// Detect which top-level config file a content directory uses.
//
// unipress projects use `document.yml`. To smooth migration and to support
// dogfooding inside uniweb workspaces, `site.yml` is accepted as a fallback
// and gets the same treatment — `collectSiteContent` reads whichever name
// we pass via its `configFile` option.

import { existsSync } from 'node:fs'
import { join } from 'node:path'

const PRIMARY = 'document.yml'
const FALLBACK = 'site.yml'

export function detectConfigFile(sitePath) {
  if (existsSync(join(sitePath, PRIMARY))) return PRIMARY
  if (existsSync(join(sitePath, FALLBACK))) return FALLBACK
  return null
}

export const CONFIG_FILE_NAMES = { PRIMARY, FALLBACK }
