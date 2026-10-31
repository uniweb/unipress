// Unpack a zip, in process. The system's `tar` is no way to do it: macOS's and Windows's read a
// zip, and GNU tar does not. That is Linux's, and on Windows it is Git's, first on the PATH in Git
// Bash.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve, sep } from 'node:path'
import JSZip from 'jszip'

export async function unzip(bytes, destDir) {
  const zip = await JSZip.loadAsync(bytes)
  const root = resolve(destDir)
  for (const entry of Object.values(zip.files)) {
    if (entry.dir) continue
    const target = resolve(root, entry.name)
    if (!target.startsWith(root + sep)) throw new Error(`it names a path outside itself: ${entry.name}`)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, await entry.async('nodebuffer'))
  }
}
