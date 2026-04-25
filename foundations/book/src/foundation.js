/**
 * Book foundation. Turns a folder-mode Uniweb site of markdown chapters
 * into a browseable web book AND a set of downloadable documents: Typst
 * source bundle, server-compiled PDF, Paged.js HTML, EPUB.
 *
 * The document outputs are declared under `outputs:` so hosts can compile
 * the site as any of these formats without knowing book-specific
 * structure. Each entry points at an options builder in
 * ./compile-options.js:
 *
 *   - typst .. source-bundle zip (always available; the download
 *              users can compile locally).
 *   - pdf .... aliased to the typst adapter (`via: 'typst'`). Hosts
 *              supplying `mode: 'server'` + `endpoint` get a PDF via a
 *              backend; hosts supplying `mode: 'sources'` (unipress) get
 *              a typst bundle and finish locally.
 *   - pagedjs  HTML + stylesheet pair the browser paginates in a new tab.
 *   - epub ... EPUB3 reflowable, shares the 'html' input shape with pagedjs.
 */

import {
    buildTypstOptions,
    buildPagedjsOptions,
    buildEpubOptions,
} from './compile-options.js'

export const vars = {
    'max-content-width': {
        default: '48rem',
        description:
            'Maximum width of a book page on screen (reading column).',
    },
    'header-height': {
        default: '3.5rem',
        description: 'Height of the top bar in the web preview.',
    },
}

export default {
    defaultSection: 'Chapter',
    defaultLayout: 'BookLayout',

    // Foundation-wide props accessible via website.foundationProps.
    props: {},

    // Declared document outputs. Hosts (the in-page Download button,
    // unipress compile) consume this map via compileDocument(website,
    // { format, foundation }). getOptions receives the caller's rest
    // options (mode, endpoint, rootPath, …) and returns the adapterOptions
    // for the underlying Press format adapter.
    outputs: {
        typst: {
            extension: 'zip',
            getOptions: (website, opts) => buildTypstOptions(website, opts),
        },
        pdf: {
            extension: 'pdf',
            via: 'typst',
            getOptions: (website, opts) => buildTypstOptions(website, opts),
        },
        pagedjs: {
            extension: 'html',
            getOptions: buildPagedjsOptions,
        },
        epub: {
            extension: 'epub',
            getOptions: buildEpubOptions,
        },
    },
}
