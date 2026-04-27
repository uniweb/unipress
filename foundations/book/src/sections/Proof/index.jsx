import { Prose } from '@uniweb/kit'
import { buildEnv } from '../Theorem/index.jsx'

/**
 * Proof — unnumbered companion environment to Theorem. The LaTeX
 * preamble declares `proof` via \\newtheorem* (no counter). Renders a
 * ☐ tombstone at the end via amsthm's default proof environment.
 */
export default function Proof({ content, params, block }) {
    buildEnv('proof', { content, params, block })

    return (
        <aside className="book-proof thm thm-proof mx-auto max-w-[var(--max-content-width)] px-6 my-4 italic">
            <p className="thm-label font-semibold mb-2 not-italic">Proof.</p>
            <Prose content={content} block={block} className="prose-book" />
            <p className="text-right mt-2 not-italic">▢</p>
        </aside>
    )
}
