/**
 * Appendix — chapter-shaped back-matter section enumerated A/B/C.
 *
 * On the LaTeX path, the first Appendix in document order emits
 * \\appendix before \\chapter so chapter numbering switches from
 * arabic to alphabetic for all subsequent chapters. Authors place
 * Appendix sections after the references / bibliography in their
 * `pages:` ordering.
 *
 * For Typst / HTML, the heading is rendered as "Appendix A — Title"
 * etc. The "A / B / C" labelling is computed at render time from
 * the position in the website's page list.
 */

import { useDocumentOutput } from '@uniweb/press'
import { ChapterOpener, Sequence, Raw } from '@uniweb/press/typst'
import { Prose, H1 } from '@uniweb/kit'

const APPENDIX_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function classifyAppendix(block) {
    const website = block?.website
    if (!website) return { letter: 'A', isFirst: true }

    // Walk website pages in order; collect appendix slugs / classify.
    // A page is an appendix if its slug starts with `appendix` (the
    // historical convention shared with Chapter's classifyPage) OR if
    // any of its body blocks declares `type: Appendix`.
    const pages = website.pages || []
    const myPageRoute = block?.page?.route
    let count = 0
    let myIndex = -1
    for (const p of pages) {
        const isAppendix =
            (p.slug && /^appendix/i.test(p.slug)) ||
            (p.bodyBlocks || []).some((b) => b?.type === 'Appendix')
        if (isAppendix) {
            if (p.route === myPageRoute) myIndex = count
            count += 1
        }
    }
    const idx = myIndex >= 0 ? myIndex : 0
    return {
        letter: APPENDIX_LETTERS[idx] || `A${idx + 1}`,
        isFirst: idx === 0,
    }
}

export default function Appendix({ content, params, block }) {
    const { title, sequence } = content || {}
    const info = classifyAppendix(block)
    const headingText = title
        ? `Appendix ${info.letter} — ${title}`
        : `Appendix ${info.letter}`

    const wantsAuto = params?.auto !== false
    const emitSwitch = wantsAuto && info.isFirst

    // LaTeX: first Appendix emits \appendix to switch chapter
    // numbering, then \chapter{Title}. Subsequent appendices skip
    // the switch and just emit \chapter.
    useDocumentOutput(
        block,
        'latex',
        <>
            {emitSwitch ? <Raw>{'\\appendix\n'}</Raw> : null}
            <Raw>{`\\chapter{${(title || '').replace(/[\\{}]/g, '')}}`}</Raw>
            <Sequence data={sequence || []} />
        </>,
    )

    // Typst path: render as a chapter-opener with the "Appendix A"
    // prefix already baked into the title (the typst template's chapter
    // numbering doesn't auto-switch like LaTeX's \appendix; the
    // foundation's typst preamble can be extended later for that).
    useDocumentOutput(
        block,
        'typst',
        <>
            <ChapterOpener title={headingText} />
            <Sequence data={sequence || []} />
        </>,
    )

    useDocumentOutput(
        block,
        'html',
        <article className="appendix">
            <h1>{headingText}</h1>
            <Prose content={content} block={block} />
        </article>,
    )

    return (
        <article className="book-appendix mx-auto max-w-[var(--max-content-width)] px-6 py-12">
            <H1
                text={headingText}
                className="text-heading text-3xl font-bold mb-6"
            />
            <Prose content={content} block={block} className="prose-book" />
        </article>
    )
}
