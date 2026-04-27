/**
 * Theorem — math-environment section type. Companion shape for Lemma,
 * Definition, Proof.
 *
 * LaTeX path:
 *   \begin{theorem}[\<name\>]
 *   \label{<id>}
 *   <body>
 *   \end{theorem}
 *
 * The foundation's preamble declares \\newtheorem{theorem}{Theorem}[chapter]
 * so theorems are numbered per chapter ("Theorem 4.1"). lemma shares the
 * theorem counter; definition has its own counter; proof is unnumbered
 * via \\newtheorem*. See latex-default/preamble.js for the declarations.
 *
 * Typst path: emit a styled box with bold "Theorem N. " followed by the
 * body. Counter management on the typst side is delegated to the
 * Typst template (which can reset per chapter to match LaTeX behaviour).
 *
 * HTML path: a styled <aside class="thm thm-theorem"> with the
 * counter rendered by the runtime's <Ref>/xref machinery.
 */

import { useDocumentOutput } from '@uniweb/press'
import { Sequence, Raw } from '@uniweb/press/typst'
import { Prose } from '@uniweb/kit'

export function buildEnv(env, { content, params, block }) {
    const { sequence } = content || {}
    const id = content?.id || params?.id
    const optName = params?.name ? `[${escTex(params.name)}]` : ''

    const beginLine = `\\begin{${env}}${optName}`
    const labelLine = id ? `\n\\label{${escTex(id)}}` : ''
    useDocumentOutput(
        block,
        'latex',
        <>
            <Raw>{beginLine + labelLine}</Raw>
            <Sequence data={sequence || []} />
            <Raw>{`\\end{${env}}`}</Raw>
        </>,
    )

    // Typst: foundation can override `#${env}(name: …, id: …)[…]`
    // via preamble customization. The default emits a #block with bold
    // label inline.
    useDocumentOutput(
        block,
        'typst',
        <>
            <Raw>
                {`#block(spacing: 1.2em, breakable: false)[*${capitalize(env)}.* `}
            </Raw>
            <Sequence data={sequence || []} />
            <Raw>{']'}</Raw>
        </>,
    )

    useDocumentOutput(
        block,
        'html',
        <aside className={`thm thm-${env}`}>
            <span className="thm-label">{capitalize(env)}.</span>
            <Prose content={content} block={block} />
        </aside>,
    )

    return { id, env }
}

function capitalize(s) {
    return String(s).charAt(0).toUpperCase() + String(s).slice(1)
}

function escTex(s) {
    return String(s)
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/&/g, '\\&')
        .replace(/%/g, '\\%')
        .replace(/\$/g, '\\$')
        .replace(/#/g, '\\#')
        .replace(/_/g, '\\_')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}')
}

export default function Theorem({ content, params, block }) {
    buildEnv('theorem', { content, params, block })

    return (
        <aside className="book-theorem thm thm-theorem mx-auto max-w-[var(--max-content-width)] px-6 my-6 border-l-4 border-primary py-3">
            <p className="thm-label font-semibold mb-2">
                Theorem{params?.name ? ` (${params.name})` : ''}
                {content?.title ? ` — ${content.title}` : ''}
            </p>
            <Prose content={content} block={block} className="prose-book" />
        </aside>
    )
}
