import { Prose } from '@uniweb/kit'
import { buildEnv } from '../Theorem/index.jsx'

export default function Lemma({ content, params, block }) {
    buildEnv('lemma', { content, params, block })

    return (
        <aside className="book-lemma thm thm-lemma mx-auto max-w-[var(--max-content-width)] px-6 my-6 border-l-4 border-secondary py-3">
            <p className="thm-label font-semibold mb-2">
                Lemma{params?.name ? ` (${params.name})` : ''}
                {content?.title ? ` — ${content.title}` : ''}
            </p>
            <Prose content={content} block={block} className="prose-book" />
        </aside>
    )
}
