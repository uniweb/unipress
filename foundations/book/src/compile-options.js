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
 * Fetch cover image bytes so Typst can read them from the bundle's local
 * filesystem (Typst 0.13+ still requires local file resolution for #image).
 *
 * Skipped outside a window context (e.g., unipress during Node-side
 * compile): no fetch, no cover, compile still succeeds — the template
 * handles missing covers gracefully. A later milestone can add a
 * filesystem-reading variant when unipress needs inline covers.
 */
async function gatherCovers(coversFromConfig, basePath) {
    const bundlePaths = {}
    const assets = {}
    if (!coversFromConfig) return { bundlePaths, assets }
    if (typeof fetch !== 'function') return { bundlePaths, assets }

    for (const role of ['front', 'back']) {
        const src = coversFromConfig?.[role]
        if (!src) continue
        const url = resolveFetchUrl(src, basePath)
        try {
            const res = await fetch(url)
            if (!res.ok) continue
            const buf = new Uint8Array(await res.arrayBuffer())
            const bundlePath = 'covers/' + filenameFrom(src, role)
            bundlePaths[role] = bundlePath
            assets[bundlePath] = buf
        } catch {
            // A cover we can't fetch is not a compile-blocker — skip it.
        }
    }
    return { bundlePaths, assets }
}

function resolveFetchUrl(src, basePath) {
    if (/^https?:\/\//i.test(src) || src.startsWith('data:')) return src
    const prefixed = (basePath || '') + (src.startsWith('/') ? src : '/' + src)
    if (typeof window === 'undefined') return prefixed
    return window.location.origin + prefixed
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
export async function buildTypstOptions(website, { mode = 'sources', endpoint } = {}) {
    const bookCfg = website?.config?.book || {}
    const language = bookCfg.language ?? website?.config?.language
    const meta = buildBookMeta(website)
    const typography = resolveTypographyWithCssFallback(bookCfg.typography)
    const { bundlePaths: covers, assets } = await gatherCovers(
        bookCfg.covers,
        website?.basePath,
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
 * reads the cover URL from adapterOptions.cover.
 */
export async function buildEpubOptions(website) {
    const bookCfg = website?.config?.book || {}
    const coverSrc = bookCfg.covers?.front ?? bookCfg.coverImage
    const coverUrl = coverSrc
        ? resolveFetchUrl(coverSrc, website?.basePath)
        : undefined
    return {
        adapterOptions: {
            meta: buildBookMeta(website),
            cover: coverUrl,
        },
    }
}
