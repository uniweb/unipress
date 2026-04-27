/**
 * ListOfFigures — generated index of figures with captions.
 *
 * Three rendering paths:
 *   - LaTeX: emits `\listoffigures` directly. LaTeX builds the list
 *     itself from \caption commands, so the foundation doesn't need
 *     to enumerate the registry.
 *   - Typst / HTML: enumerate the framework's xref-registry filtering
 *     for kind=figure, render each as "Figure N — caption" with a
 *     `caption:` field captured at registry-build time.
 *
 * The shape is reused by ListOfTables — same code, different `kind`.
 */

import { useDocumentOutput } from '@uniweb/press'
import { ChapterOpener, Sequence, Raw } from '@uniweb/press/typst'
import { H1 } from '@uniweb/kit'

export function buildListOfX({ content, params, block }, kind, defaultTitle, latexCmd) {
    const entries = block?.website?.xref?.entries || {}
    const items = Object.values(entries)
        .filter((e) => e.kind === kind)
        .sort((a, b) => (a.counter || 0) - (b.counter || 0))

    const heading = params?.title || content?.title || defaultTitle

    // LaTeX: \listoffigures / \listoftables — LaTeX itself maintains
    // these from \caption commands at compile time, so the foundation
    // need not enumerate.
    useDocumentOutput(
        block,
        'latex',
        <>
            <Raw>{`\\chapter*{${heading.replace(/[\\{}]/g, '')}}`}</Raw>
            <Raw>{latexCmd}</Raw>
        </>,
    )

    // Typst / HTML: enumerate from the registry. Each entry becomes a
    // line with the labelled counter and the captured caption.
    const entryLines = items.map((e) => ({
        type: 'paragraph',
        text: `Figure ${e.counterText} — ${e.caption || '(no caption)'}`,
    }))
    useDocumentOutput(
        block,
        'typst',
        <>
            <ChapterOpener title={heading} />
            <Sequence data={entryLines} />
        </>,
    )

    useDocumentOutput(
        block,
        'html',
        <article className={`list-of-${kind}s`}>
            <h1>{heading}</h1>
            <ul>
                {items.map((e) => (
                    <li key={e.id}>
                        {capitalize(kind)} {e.counterText} — {e.caption || '(no caption)'}
                    </li>
                ))}
            </ul>
        </article>,
    )

    return { items, heading }
}

function capitalize(s) {
    return String(s).charAt(0).toUpperCase() + String(s).slice(1)
}

export default function ListOfFigures({ content, params, block }) {
    const { items, heading } = buildListOfX(
        { content, params, block },
        'figure',
        'List of Figures',
        '\\listoffigures',
    )

    return (
        <article className="book-list-of-figures mx-auto max-w-[var(--max-content-width)] px-6 py-12">
            <H1 text={heading} className="text-heading text-3xl font-bold mb-6" />
            {items.length === 0 ? (
                <p className="text-subtle">No figures.</p>
            ) : (
                <ul className="space-y-2">
                    {items.map((e) => (
                        <li key={e.id} className="flex justify-between gap-4">
                            <span>
                                <span className="font-medium">Figure {e.counterText}</span>
                                {' — '}
                                {e.caption || '(no caption)'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </article>
    )
}
