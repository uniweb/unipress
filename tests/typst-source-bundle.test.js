import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import JSZip from 'jszip'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { TypstBinaryError } from '../src/errors.js'
import { extractSourceBundle } from '../src/sinks/typst.js'

// The bundle a foundation hands the PDF sink is a zip Press writes with JSZip. It was unpacked with
// the system's `tar`, which reads a zip on macOS and not on Linux. `scripts/smoke.js` proves a PDF
// on Linux in CI; this is what the unpacking has to keep doing, on any system.
describe('extractSourceBundle', () => {
  let dest

  beforeEach(() => {
    dest = mkdtempSync(join(tmpdir(), 'unipress-bundle-test-'))
  })
  afterEach(() => {
    rmSync(dest, { recursive: true, force: true })
  })

  const bundle = (files) => {
    const zip = new JSZip()
    for (const [path, content] of Object.entries(files)) zip.file(path, content)
    return zip.generateAsync({ type: 'nodebuffer' })
  }

  it('writes every file at its path, nested folders and non-ASCII names included', async () => {
    const image = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0xff, 0x0d, 0x0a])
    await extractSourceBundle(
      await bundle({ 'main.typ': '#import "x"', 'assets/a/b.png': image, 'assets/página.txt': 'ñ' }),
      dest
    )
    expect(readFileSync(join(dest, 'main.typ'), 'utf8')).toBe('#import "x"')
    expect(readFileSync(join(dest, 'assets/a/b.png')).equals(image)).toBe(true)
    expect(readFileSync(join(dest, 'assets/página.txt'), 'utf8')).toBe('ñ')
  })

  it('reads a compressed bundle too, in case a foundation writes one', async () => {
    const zip = new JSZip()
    zip.file('main.typ', 'x'.repeat(10_000))
    const bytes = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
    expect(bytes.length).toBeLessThan(10_000)
    await extractSourceBundle(bytes, dest)
    expect(readFileSync(join(dest, 'main.typ'), 'utf8')).toHaveLength(10_000)
  })

  it('keeps a name that climbs out of the bundle inside the folder', async () => {
    await extractSourceBundle(await bundle({ '../../escaped.typ': 'x' }), dest)
    expect(existsSync(join(dest, '..', '..', 'escaped.typ'))).toBe(false)
    expect(existsSync(join(dest, 'escaped.typ'))).toBe(true)
  })

  it('says so, as a user-facing error, when the bundle is not a zip', async () => {
    await expect(extractSourceBundle(Buffer.from('not a zip'), dest)).rejects.toThrow(TypstBinaryError)
    await expect(extractSourceBundle(Buffer.from('not a zip'), dest)).rejects.toThrow(/is not a zip/)
  })
})
