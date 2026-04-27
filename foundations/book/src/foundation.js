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
    buildLatexOptions,
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

// Domain-specific cross-reference kinds the book foundation extends
// the framework registry with. Each entry declares:
//   - prefix:   id-prefix the foundation owns (e.g. `thm-` -> theorem).
//               Used by the framework's xref-registry to classify ids
//               on elements whose node type isn't built-in.
//   - label / labelPlural: rendered by <Ref> for `[#thm-1]` -> "Theorem 1".
//   - counter:  `arabic` (flat) or `hierarchical` — currently all
//               theorem-family kinds use a flat counter that resets per
//               chapter (resetOn: 'chapter').
//   - resetOn:  scope at which the counter resets. 'chapter' matches the
//               LaTeX convention "Theorem 4.1 = first theorem of
//               chapter 4" via `\newtheorem{theorem}{Theorem}[chapter]`.
//               (resetOn-driven counter reset is a future hook on the
//               framework side; for now the LaTeX preamble's
//               [chapter] argument carries the behaviour.)
//   - sep:      separator between label and counter (' ' for "Theorem 1").
//
// These are read by both:
//   - framework/build/src/site/xref-registry.js (id-prefix
//     classification: `{#thm-main}` -> kind=theorem).
//   - framework/runtime/src/xref-styles.js (rendering: `[#thm-main]` ->
//     "Theorem 1" via the active xref preset merged with these meta).
//
// Foundations consuming the book foundation can extend this map further
// at the document level via book.xref.kinds in document.yml.
export const XREF_KINDS = {
    theorem: {
        prefix: 'thm',
        label: 'Theorem',
        labelPlural: 'Theorems',
        counter: 'arabic',
        resetOn: 'chapter',
        sep: ' ',
    },
    lemma: {
        prefix: 'lem',
        label: 'Lemma',
        labelPlural: 'Lemmas',
        counter: 'arabic',
        resetOn: 'chapter',
        sep: ' ',
    },
    definition: {
        prefix: 'def',
        label: 'Definition',
        labelPlural: 'Definitions',
        counter: 'arabic',
        resetOn: 'chapter',
        sep: ' ',
    },
    proof: {
        prefix: 'proof',
        label: 'Proof',
        labelPlural: 'Proofs',
        counter: null, // proofs are typically unnumbered
        sep: ' ',
    },
}

export default {
    defaultSection: 'Chapter',
    defaultLayout: 'BookLayout',

    // Foundation-wide props accessible via website.foundationProps.
    props: {},

    // Cross-reference kind extensions. The framework's xref-registry
    // and runtime <Ref> renderer both pick this up — see XREF_KINDS
    // declaration above for the contract.
    xref: {
        kinds: XREF_KINDS,
    },

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
        latex: {
            extension: 'zip',
            getOptions: (website, opts) => buildLatexOptions(website, opts),
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
