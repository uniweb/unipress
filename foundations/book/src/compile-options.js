/**
 * Per-format adapter-options builders for the book's declared outputs.
 *
 * These are the functions referenced by `outputs[format].getOptions` in
 * foundation.js. They assemble what Press's format adapters need — meta,
 * preamble, template, cover assets, stylesheet — from the site's config,
 * and return `{ adapterOptions }` for compileDocument to pass through.
 *
 * They are also used from BookLayout's per-page BookMetadata component
 * (for the pagedjs/epub HTML registration store) and from the browser
 * DownloadButton's filename display. Two shapes hit the same helpers, so
 * metadata stays consistent across web rendering and headless compile.
 */

import {
    createPreamble,
    createTemplate,
    normaliseFontList,
} from './typst-default/index.js'
import { stylesheet as pagedjsStylesheet } from './pagedjs-default/index.js'
import { bibliographyCss } from './utils/bibliography-css.js'

/**
 * Document-level metadata object, the shape the Typst and HTML adapters
 * consume. Source of truth is `website.config.book`, with `website.config.name`
 * / `website.config.language` as sensible fallbacks.
 */
export function buildBookMeta(website) {
    const m = website?.config?.book || {}
    const meta = {
        title: m.title ?? website?.config?.name ?? 'Book',
        subtitle: m.subtitle,
        author: m.author,
        date: m.date,
        language: m.language ?? website?.config?.language,
        isbn: m.isbn,
        identifier: m.identifier,
        rights: m.rights,
        publisher: m.publisher,
        subject: m.subject,
        description: m.description,
        coverImage: m.coverImage ?? m['cover-image'],
        hook: m.hook,
        blurb: m.blurb,
        tocDepth: m.tocDepth ?? m['toc-depth'] ?? 2,
    }
    // Strip undefined keys so meta.typ doesn't emit "key: none" for every
    // missing field.
    for (const k of Object.keys(meta)) {
        if (meta[k] == null) delete meta[k]
    }
    return meta
}

/**
 * Load cover image bytes for inclusion in the Typst source bundle (Typst
 * 0.13+ resolves #image() against the local filesystem at compile time).
 *
 * Uses the host-supplied loadAsset helper threaded in by Press's
 * compileDocument — fs in Node (unipress), fetch in the browser.
 * Foundation stays environment-agnostic; bytes-loading lives in the
 * host that knows its own runtime.
 *
 * A cover that fails to load is not a compile-blocker — the template
 * handles missing covers gracefully.
 */
async function gatherCovers(coversFromConfig, loadAsset) {
    const bundlePaths = {}
    const assets = {}
    if (!coversFromConfig || typeof loadAsset !== 'function') {
        return { bundlePaths, assets }
    }

    for (const role of ['front', 'back']) {
        const src = coversFromConfig?.[role]
        if (!src) continue
        try {
            const bytes = await loadAsset(src)
            if (!bytes) continue
            const bundlePath = 'covers/' + filenameFrom(src, role)
            bundlePaths[role] = bundlePath
            assets[bundlePath] = bytes
        } catch {
            // Skip — log nothing; a missing cover isn't a compile failure.
        }
    }
    return { bundlePaths, assets }
}

function filenameFrom(src, role) {
    const cleaned = String(src).split(/[?#]/)[0]
    const seg = cleaned.split('/').filter(Boolean).pop()
    return seg || role + '.png'
}

/**
 * Build typography with CSS-variable fallback for the browser case. Lets
 * web theme choices flow into the compiled PDF without the author
 * declaring fonts twice. Outside the browser, just returns what was
 * declared in site.yml.
 */
function resolveTypographyWithCssFallback(typographyFromConfig) {
    const ty = { ...(typographyFromConfig || {}) }
    if (typeof document === 'undefined') return ty
    const cs = getComputedStyle(document.documentElement)
    if (ty.bodyFont == null) {
        const fromCss = normaliseFontList(cs.getPropertyValue('--font-body'))
        if (fromCss) ty.bodyFont = fromCss
    }
    if (ty.headingFont == null) {
        const fromCss = normaliseFontList(cs.getPropertyValue('--font-heading'))
        if (fromCss) ty.headingFont = fromCss
    }
    return ty
}

/**
 * Typst outputs (both the `typst` source-bundle download and the `pdf`
 * aliased compile). The caller can pass `mode` and `endpoint` via
 * compileDocument's rest-options; defaults are sources-mode with no
 * endpoint (works for unipress and the in-browser sources download).
 */
export async function buildTypstOptions(website, { mode = 'sources', endpoint, loadAsset } = {}) {
    const bookCfg = website?.config?.book || {}
    const language = bookCfg.language ?? website?.config?.language
    const meta = buildBookMeta(website)
    const typography = resolveTypographyWithCssFallback(bookCfg.typography)
    const { bundlePaths: covers, assets } = await gatherCovers(
        bookCfg.covers,
        loadAsset,
    )
    const template = createTemplate({
        trim: bookCfg.trim,
        typography,
        structure: bookCfg.structure,
        labels: bookCfg.labels,
        language,
        covers,
    })
    const preamble = createPreamble({
        language,
        labels: bookCfg.labels,
    })
    return {
        adapterOptions: {
            mode,
            meta,
            preamble,
            template,
            assets,
            endpoint,
        },
    }
}

/**
 * Paged.js output: HTML-string mode, with the shared book stylesheet.
 */
export async function buildPagedjsOptions(website) {
    return {
        adapterOptions: {
            mode: 'html',
            meta: buildBookMeta(website),
            stylesheet: pagedjsStylesheet,
        },
    }
}

/**
 * EPUB output: shares the 'html' input shape with Paged.js. The adapter
 * reads the cover spec from `adapterOptions.cover` and uses the host-
 * supplied `loadAsset` to turn it into bytes — same abstraction the typst
 * path uses, so the foundation doesn't need to branch on environment.
 */
// Foundation-supplied EPUB stylesheet. Press's adapter takes a single
// `options.stylesheet` (which replaces its DEFAULT_STYLESHEET; there's no
// "append" hook), so the book foundation owns the whole sheet. The base
// rules below mirror Press's defaults — book-shaped typography that
// reading apps can rely on — and we append the shared bibliography CSS
// so .csl-bibliography / .csl-entry / .cite render correctly.
const EPUB_BASE_CSS = `body {
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.5;
  margin: 0 5%;
}
h1, h2, h3, h4, h5, h6 {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.2;
  page-break-after: avoid;
}
h1 { font-size: 1.8em; margin-top: 2em; }
h2 { font-size: 1.4em; margin-top: 1.5em; }
h3 { font-size: 1.15em; margin-top: 1em; }
p { margin: 0 0 0.8em; text-indent: 1.25em; }
p:first-child, p.lead { text-indent: 0; }
img { max-width: 100%; height: auto; }
figure { margin: 1em 0; text-align: center; }
figcaption { font-size: 0.9em; color: #555; }
blockquote {
  margin: 1em 1.5em;
  padding-left: 1em;
  border-left: 3px solid #ccc;
  color: #444;
}
code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 0.92em; }
pre {
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 0.9em;
  background: #f5f5f5;
  padding: 0.75em;
  overflow: auto;
  white-space: pre-wrap;
}
`

export async function buildEpubOptions(website, { loadAsset } = {}) {
    const bookCfg = website?.config?.book || {}
    const coverSrc = bookCfg.covers?.front ?? bookCfg.coverImage
    return {
        adapterOptions: {
            meta: buildBookMeta(website),
            cover: coverSrc,
            loadAsset,
            stylesheet: EPUB_BASE_CSS + bibliographyCss,
        },
    }
}
