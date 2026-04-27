/**
 * Abstract — labeled "Abstract" section that wraps the prose.
 *
 * Rendered as an unnumbered chapter on the LaTeX path (so it doesn't
 * disrupt chapter numbering — \chapter* not \chapter), via Typst's
 * regular chapter-opener (Typst's heading numbering is template-
 * controlled and the foundation's template skips numbers for front
 * matter), and as a styled article in the HTML/EPUB paths.
 */

import { useDocumentOutput } from '@uniweb/press'
import { ChapterOpener, Sequence, Raw } from '@uniweb/press/typst'
import { Prose, H1 } from '@uniweb/kit'

export default function Abstract({ content, params, block }) {
    const { sequence } = content || {}
    const heading = params?.title || content?.title || 'Abstract'

    // Typst path uses ChapterOpener like Cover/BackMatter — the
    // foundation's template renders these without a chapter number.
    useDocumentOutput(
        block,
        'typst',
        <>
            <ChapterOpener title={heading} />
            <Sequence data={sequence || []} />
        </>,
    )

    // LaTeX uses \chapter* (unnumbered) so the abstract precedes the
    // numbered chapters without consuming counter 1. Inserts the body
    // via the same JSX as the other chapter-shaped sections.
    useDocumentOutput(
        block,
        'latex',
        <>
            <Raw>{`\\chapter*{${heading.replace(/[\\{}]/g, '')}}`}</Raw>
            <Sequence data={sequence || []} />
        </>,
    )

    useDocumentOutput(
        block,
        'html',
        <article className="abstract">
            <h1>{heading}</h1>
            <Prose content={content} block={block} />
        </article>,
    )

    return (
        <article className="book-abstract mx-auto max-w-[var(--max-content-width)] px-6 py-12">
            <H1
                text={heading}
                className="text-heading text-3xl font-bold mb-6"
            />
            <Prose content={content} block={block} className="prose-book" />
        </article>
    )
}
