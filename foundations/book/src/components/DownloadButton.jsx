/**
 * Whole-book Download — four formats offered side by side, all routed
 * through `compileDocument(website, { format, foundation, ... })`.
 *
 *   - "Download PDF" — typst via server mode: foundation produces a
 *      bundle, Press posts it to `endpoint`, server returns PDF bytes.
 *   - "Typst sources" — typst via sources mode: zip the user can compile
 *      locally (the unipress code path uses this variant too).
 *   - "PDF (Paged.js)" — HTML + stylesheet the browser paginates in a
 *      new tab. No triggerDownload: browsers only paginate live documents.
 *   - "EPUB" — reflowable EPUB3. Shares the 'html' input shape with
 *      Paged.js on Press's side.
 *
 * Per-format details (meta assembly, preamble, template, cover fetch)
 * live on the foundation's outputs declaration (src/foundation.js +
 * src/compile-options.js). This component just maps UI intent to format
 * + mode + delivery.
 */
import React, { useState } from 'react'
import { compileDocument, triggerDownload } from '@uniweb/press'
import { useWebsite } from '@uniweb/kit'
import foundation from '../foundation.js'

/**
 * In split-mode sites, some pages defer loading their markdown until
 * visited. compileDocument walks `website.pages[*].bodyBlocks` synchronously,
 * so any deferred pages in the requested scope must load first or their
 * blocks won't be part of the compile.
 */
async function preloadPages(website, rootPath) {
    const pages = (website?.pages || []).filter((page) => {
        if (!rootPath) return true
        return (
            page.route === rootPath ||
            page.route.startsWith(rootPath + '/')
        )
    })
    await Promise.all(
        pages.map((page) =>
            typeof page.loadContent === 'function'
                ? page.loadContent()
                : Promise.resolve(),
        ),
    )
}

// UI descriptor per button. `extra` supplies the per-format hints Press
// hands to the foundation's getOptions (mode, endpoint). `deliver` picks
// between triggerDownload (bytes-in-hand) and new-tab (Paged.js paginates
// only when live in a browser).
const BUTTONS = [
    {
        key: 'pdf',
        label: 'Download PDF',
        busyLabel: 'Building PDF…',
        className:
            'inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-medium shadow-lg hover:bg-slate-700 disabled:opacity-60 disabled:cursor-wait',
        extra: ({ endpoint }) => ({ mode: 'server', endpoint }),
        deliver: 'download',
    },
    {
        key: 'typst',
        label: 'Typst sources',
        busyLabel: 'Building…',
        title: 'Download a Typst project you can compile or edit locally',
        className:
            'inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white text-slate-700 text-xs font-medium border border-slate-300 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-wait',
        extra: () => ({ mode: 'sources' }),
        deliver: 'download',
    },
    {
        key: 'pagedjs',
        label: 'PDF (Paged.js)',
        busyLabel: 'Building…',
        title: "Opens the book in a new tab; use the browser's Print → Save as PDF",
        className:
            'inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white text-slate-700 text-xs font-medium border border-slate-300 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-wait',
        deliver: 'newtab',
    },
    {
        key: 'epub',
        label: 'EPUB',
        busyLabel: 'Building…',
        title: 'Download a reflowable EPUB3 for e-readers',
        className:
            'inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white text-slate-700 text-xs font-medium border border-slate-300 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-wait',
        deliver: 'download',
    },
]

export default function DownloadButton({
    filename = 'book',
    rootPath,
    endpoint, // Forwarded to pdf (server-mode) compile; defaults to /__press/typst/compile
}) {
    const { website } = useWebsite()
    const [busy, setBusy] = useState(null)
    const [error, setError] = useState(null)

    const doCompile = async (btn) => {
        setError(null)
        setBusy(btn.key)
        try {
            await preloadPages(website, rootPath)
            const extra = btn.extra ? btn.extra({ endpoint }) : {}
            const blob = await compileDocument(website, {
                format: btn.key,
                foundation,
                rootPath,
                ...extra,
            })
            const ext = foundation.outputs?.[btn.key]?.extension || btn.key
            if (btn.deliver === 'newtab') {
                const url = URL.createObjectURL(blob)
                window.open(url, '_blank')
                // Defer revocation — the opened tab needs the URL live.
            } else {
                triggerDownload(blob, `${filename}.${ext}`)
            }
        } catch (err) {
            console.error('[DownloadButton]', err)
            setError(err.message || String(err))
        } finally {
            setBusy(null)
        }
    }

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            {error ? (
                <span
                    role="alert"
                    className="text-xs px-2 py-1 rounded-md bg-red-50 text-red-700 shadow max-w-xs"
                >
                    {error}
                </span>
            ) : null}
            {BUTTONS.map((btn) => (
                <button
                    key={btn.key}
                    type="button"
                    onClick={() => doCompile(btn)}
                    disabled={!!busy}
                    title={btn.title}
                    className={btn.className}
                >
                    {busy === btn.key ? btn.busyLabel : btn.label}
                </button>
            ))}
        </div>
    )
}
