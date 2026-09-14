import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { initPrerender } from '@uniweb/runtime/ssr'
import { loadContent } from '../src/content-loader.js'

const here = dirname(fileURLToPath(import.meta.url))

/**
 * A section receives the keys its component declares, filled at render by the runtime's
 * entity store — by name, then by the query's schema (`fillDeclaredKeys`, automatic `as`),
 * over the section's queries, its page's, its parent page's and, for a page with no parent,
 * the document's. unipress attaches each level's records under the fetch's own key, and the
 * store delivers an answer the section holds without asking — so a compiled document
 * receives what a website would. Rendered through `childBlockRenderer`, the path Press
 * compiles sections by.
 */
describe('declared keys in a compiled document', () => {
  afterEach(() => {
    delete globalThis.uniweb
  })

  // What each section type received: `content.data`, each list as its records' names.
  async function received(fixture, meta) {
    const { content } = await loadContent(join(here, 'fixtures', fixture))
    const show = (type) => ({ content: c }) =>
      React.createElement('pre', null, JSON.stringify([type, Object.fromEntries(
        Object.entries(c.data || {}).map(([k, v]) => [k, Array.isArray(v) ? v.map((r) => r.name ?? r.title) : v]),
      )]))
    const types = Object.keys(meta)
    const foundation = {
      ...Object.fromEntries(types.map((type) => [type, show(type)])),
      default: { meta, capabilities: null, layoutMeta: {} },
    }
    const uniweb = initPrerender(content, foundation)
    const out = {}
    for (const page of uniweb.activeWebsite.pages) {
      const html = renderToStaticMarkup(
        React.createElement(React.Fragment, null, uniweb.childBlockRenderer({ blocks: page.bodyBlocks || [] })),
      )
      for (const [, json] of html.matchAll(/<pre>(.*?)<\/pre>/g)) {
        const [type, data] = JSON.parse(json.replace(/&quot;/g, '"'))
        out[type] = data
      }
    }
    return out
  }

  it('a key declared under another name receives the query of its schema, from the page or the section', async () => {
    const got = await received('multi-query-page', {
      Summary: { data: { people: '@/members', stats: '@/views' } },
      Own: { data: { rows: '@/views', people: '@/members' } },
    })
    expect(got.Summary).toEqual({ people: ['Ada', 'Grace'], stats: ['All members'] })
    expect(got.Own).toEqual({ rows: ['All members'], people: ['Ada', 'Grace'] })
  })

  it('a parent page\'s query reaches a child page, and the document\'s reaches a page with no parent only', async () => {
    const got = await received('level-queries', {
      Summary: { data: { people: '@/members', views: {} } },
      Own: { data: { people: '@/members', stats: '@/views' } },
    })
    // /report: its own page's `members` by schema, the document's `views` by name
    expect(got.Summary).toEqual({ people: ['Ada', 'Grace'], views: ['All members'] })
    // /report/detail: its parent's `members`; the document's `views` does not reach a page
    // with a parent, as on a website (`siteReaches`)
    expect(got.Own).toEqual({ people: ['Ada', 'Grace'], stats: null })
  })

  it('CONTROL — a key of another schema receives nothing, and an undeclared key does not reach the component', async () => {
    const got = await received('multi-query-page', { Summary: { data: { other: '@/nothing' } }, Own: { data: {} } })
    expect(got.Summary).toEqual({ other: null })
  })
})
