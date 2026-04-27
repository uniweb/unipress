import { Prose } from '@uniweb/kit'
import { buildEnv } from '../Theorem/index.jsx'

export default function Definition({ content, params, block }) {
    buildEnv('definition', { content, params, block })

    return (
        <aside className="book-definition thm thm-definition mx-auto max-w-[var(--max-content-width)] px-6 my-6 border-l-4 border-accent py-3">
            <p className="thm-label font-semibold mb-2">
                Definition{params?.name ? ` (${params.name})` : ''}
                {content?.title ? ` — ${content.title}` : ''}
            </p>
            <Prose content={content} block={block} className="prose-book" />
        </aside>
    )
}
