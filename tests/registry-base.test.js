/**
 * The foundation registry base has ONE definition — `src/registry-base.js`.
 *
 * Two readers derive from it: `foundation-loader.js` builds the URL `compile`
 * FETCHES, and `foundations-data.js` builds the `source.url` that `create` and
 * `list-templates` SHOW. They held separate hardcoded bases until 2026-08-22,
 * decomposed differently (the catalog baked `/foundations` in; the loader
 * appended it), so a base move needed two dissimilar edits and only the loader
 * honoured `UNIWEB_REGISTRY_URL` — `list-templates` printed an address the tool
 * was not using.
 *
 * These tests fail on a re-duplication, not merely on a wrong value.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  DEFAULT_REGISTRY_BASE,
  foundationPath,
  foundationUrl,
  getRegistryBase
} from '../src/registry-base.js'

const SRC = fileURLToPath(new URL('../src', import.meta.url))

afterEach(() => {
  delete process.env.UNIWEB_REGISTRY_URL
})

describe('registry-base', () => {
  it('pins the published origin — a move must be deliberate', () => {
    expect(DEFAULT_REGISTRY_BASE).toBe('https://uniweb.github.io/unipress')
    expect(foundationUrl('book', '0.4.2')).toBe(
      'https://uniweb.github.io/unipress/foundations/book/0.4.2/entry.js'
    )
  })

  it('the namespace is implicit — a scope never appears in the path', () => {
    expect(foundationPath('book', '0.4.2')).toBe('foundations/book/0.4.2/entry.js')
    expect(foundationUrl('book', '0.4.2')).not.toContain('@uniweb')
  })

  it('honours UNIWEB_REGISTRY_URL, trailing slash or not', () => {
    process.env.UNIWEB_REGISTRY_URL = 'http://localhost:9999/reg/'
    expect(getRegistryBase()).toBe('http://localhost:9999/reg')
    expect(foundationUrl('book', '0.4.2')).toBe(
      'http://localhost:9999/reg/foundations/book/0.4.2/entry.js'
    )
  })

  it('reads the env at call time, not at import time', () => {
    // The catalog computes source.url at module eval; a base frozen at import
    // would make an override set later invisible.
    const before = getRegistryBase()
    process.env.UNIWEB_REGISTRY_URL = 'http://example.test'
    expect(getRegistryBase()).not.toBe(before)
  })
})

describe('the catalog shows what the loader fetches', () => {
  it('every entry source.url matches foundationUrl for its own ref', async () => {
    const { FOUNDATIONS } = await import('../src/foundations-data.js')
    expect(FOUNDATIONS.length).toBeGreaterThan(0)

    for (const entry of FOUNDATIONS) {
      const ref = entry.foundation?.ref
      const url = entry.foundation?.source?.url
      if (!ref || !url) continue
      // '@uniweb/book@0.4.2' -> name 'book', version '0.4.2'
      const m = ref.match(/^@[^/]+\/([^@]+)@(.+)$/)
      expect(m, `unparseable ref: ${ref}`).toBeTruthy()
      expect(url, `catalog url drifted for ${ref}`).toBe(foundationUrl(m[1], m[2]))
    }
  })

  it('the shown URL follows an override — the symptom that started this', async () => {
    // The catalog computes source.url at module eval, so the override has to be
    // in place before the import: reset the module registry and re-import.
    vi.resetModules()
    process.env.UNIWEB_REGISTRY_URL = 'http://localhost:9999/reg'
    const { FOUNDATIONS } = await import('../src/foundations-data.js')
    const shown = FOUNDATIONS.find((e) => e.foundation?.ref)?.foundation.source.url

    // Before 2026-08-22 this stayed on uniweb.github.io while compile fetched
    // from the override — a tool reporting an address it was not using.
    expect(shown).toContain('http://localhost:9999/reg/')
    expect(shown).not.toContain('uniweb.github.io')
    vi.resetModules()
  })

  it('control: the comparison is not vacuous — a wrong base is caught', () => {
    expect(foundationUrl('book', '0.4.2', 'http://elsewhere.test')).not.toBe(
      foundationUrl('book', '0.4.2')
    )
  })
})

describe('no second spelling of the base', () => {
  const files = readdirSync(SRC, { recursive: true })
    .filter((f) => typeof f === 'string' && f.endsWith('.js'))

  it('only registry-base.js contains the origin literal', () => {
    const offenders = files.filter(
      (f) =>
        f !== 'registry-base.js' &&
        readFileSync(join(SRC, f), 'utf8').includes('uniweb.github.io/unipress')
    )
    // Comments naming the URL pattern are fine in prose, but a second *literal*
    // is what drifted before. Any hit here should move to registry-base.js.
    expect(offenders).toEqual([])
  })

  it('control: the scan can see the literal where it does live', () => {
    // Without this, "no offenders" would also pass if the read returned nothing.
    expect(files).toContain('registry-base.js')
    expect(readFileSync(join(SRC, 'registry-base.js'), 'utf8')).toContain(
      'uniweb.github.io/unipress'
    )
  })
})
