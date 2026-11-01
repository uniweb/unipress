/**
 * Abstract — labeled "Abstract" section that wraps the prose.
 *
 * Rendered as an unnumbered chapter so it doesn't disrupt chapter
 * numbering — \chapter* not \chapter on the LaTeX path, an unnumbered
 * opener on the Typst path — and as a styled article in the HTML/EPUB
 * paths.
 */

import { useDocumentOutput } from '@uniweb/press'
import { Sequence, Raw } from '@uniweb/press/typst'
import { Prose, H1 } from '@uniweb/kit'
import { UnnumberedOpener, proseUnderTitle, typstBody, withoutTitleHeading } from '#utils/chapter-opening.jsx'
import { printSequences } from '#utils/print-sequences.js'

export default function Abstract({ content, params, block }) {
    const { typst, latex } = printSequences(content?.sequence, block)
    const heading = params?.title || content?.title || 'Abstract'

    useDocumentOutput(
        block,
        'typst',
        <>
            <UnnumberedOpener title={heading} />
            <Sequence data={typstBody(typst, content?.title, block?.website)} />
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
            <Sequence data={withoutTitleHeading(latex, content?.title)} />
        </>,
    )

    useDocumentOutput(
        block,
        'html',
        <article className="abstract">
            <h1>{heading}</h1>
            <Prose content={proseUnderTitle(content)} block={block} />
        </article>,
    )

    return (
        <article className="book-abstract mx-auto max-w-[var(--max-content-width)] px-6 py-12">
            <H1
                text={heading}
                className="text-heading text-3xl font-bold mb-6"
            />
            <Prose content={proseUnderTitle(content)} block={block} className="prose-book" />
        </article>
    )
}
