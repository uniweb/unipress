/**
 * ListOfTables — auto-generated index of tables with captions.
 * Mirrors ListOfFigures; differs only in the registry filter and the
 * LaTeX command (\listoftables vs \listoffigures).
 */

import { H1 } from '@uniweb/kit'
import { buildListOfX } from '../ListOfFigures/index.jsx'

export default function ListOfTables({ content, params, block }) {
    const { items, heading } = buildListOfX(
        { content, params, block },
        'table',
        'List of Tables',
        '\\listoftables',
    )

    return (
        <article className="book-list-of-tables mx-auto max-w-[var(--max-content-width)] px-6 py-12">
            <H1 text={heading} className="text-heading text-3xl font-bold mb-6" />
            {items.length === 0 ? (
                <p className="text-subtle">No tables.</p>
            ) : (
                <ul className="space-y-2">
                    {items.map((e) => (
                        <li key={e.id} className="flex justify-between gap-4">
                            <span>
                                <span className="font-medium">Table {e.counterText}</span>
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
