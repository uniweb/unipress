/**
 * TitlePage — institutional title page (UofT-shaped by default).
 *
 * Three input shapes, in order of precedence:
 *   1. Frontmatter on the section's .md file (`title:`, `author:`,
 *      `degree:`, etc.) — fastest path; no separate data file.
 *   2. `website.config.thesis` — book-level metadata laid out in a
 *      dedicated `thesis.yml` at the site root. Recommended for a
 *      thesis where the structured data is reused across multiple
 *      front-matter sections.
 *   3. Content collections — when params.data names a collection,
 *      reads `content.data[<name>]` (one record).
 *
 * For LaTeX, emits the canonical UofT-style title page laid out
 * manually with \\begin{titlepage} ... \\end{titlepage}. ut-thesis.cls
 * (when book.kind === 'thesis-uoft' and the user has the package
 * installed via tlmgr) supplies its own \\maketitle command — but the
 * manual layout works on any TeX install and produces the same shape.
 */

import { useDocumentOutput } from '@uniweb/press'
import { Raw } from '@uniweb/press/typst'

function resolveData({ content, params, block }) {
    const dataName = params?.data || 'thesis'
    const fromCollection = content?.data?.[dataName]
    const fromConfig = block?.website?.config?.[dataName]
    const fromFrontmatter = {
        title: content?.title,
        subtitle: content?.subtitle,
    }
    return {
        ...fromFrontmatter,
        ...(fromConfig || {}),
        ...(fromCollection || {}),
    }
}

// Build a UofT-style title page in raw LaTeX. Order of elements
// follows the SGS template:
//   - title (24pt, centered, ~3in down)
//   - "by" + candidate name
//   - degree statement
//   - department + institution
//   - copyright line
function buildLatexTitlePage(data) {
    const title = data.title || 'Untitled'
    const author = data.candidate?.name || data.author || 'Unknown Author'
    const degreeLevel = data.degree?.level || 'M.Sc.'
    const degreeField = data.degree?.field || ''
    const department = data.department || ''
    const institution = data.institution || 'University of Toronto'
    const year = data.year || new Date().getFullYear()

    const degreeFieldLine = degreeField
        ? ` in ${escTex(degreeField)}`
        : ''
    const lines = [
        '\\begin{titlepage}',
        '\\thispagestyle{empty}',
        '\\begin{center}',
        '\\vspace*{2in}',
        `{\\Large\\bfseries ${escTex(title)}}\\\\[2cm]`,
        `by\\\\[1cm]`,
        `{\\large ${escTex(author)}}\\\\[2cm]`,
        'A thesis submitted in conformity with the requirements\\\\',
        `for the degree of ${escTex(degreeLevel)}${degreeFieldLine}\\\\[1cm]`,
    ]
    if (department) lines.push(`${escTex(department)}\\\\`)
    lines.push(`${escTex(institution)}\\\\[2cm]`)
    lines.push(`\\copyright\\ Copyright by ${escTex(author)} ${escTex(String(year))}`)
    lines.push('\\end{center}')
    lines.push('\\end{titlepage}')
    return lines.join('\n')
}

// Title-page text in metadata is plain — no inline marks expected — but
// LaTeX-special characters (& % $ # _ { }) still need escaping.
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

function buildTypstTitlePage(data) {
    const title = data.title || 'Untitled'
    const author = data.candidate?.name || data.author || 'Unknown Author'
    const degreeLevel = data.degree?.level || 'M.Sc.'
    const degreeField = data.degree?.field || ''
    const department = data.department || ''
    const institution = data.institution || 'University of Toronto'
    const year = data.year || new Date().getFullYear()
    const degreeLine = degreeField
        ? `${degreeLevel} in ${degreeField}`
        : degreeLevel

    return [
        '#page(numbering: none)[',
        '  #v(2in)',
        `  #align(center, text(size: 22pt, weight: "bold")[${escTypst(title)}])`,
        '  #v(2cm)',
        '  #align(center, text(size: 14pt)[by])',
        '  #v(0.5cm)',
        `  #align(center, text(size: 14pt)[${escTypst(author)}])`,
        '  #v(2cm)',
        '  #align(center, [A thesis submitted in conformity with the requirements])',
        `  #align(center, [for the degree of ${escTypst(degreeLine)}])`,
        '  #v(1cm)',
        department ? `  #align(center, [${escTypst(department)}])` : '',
        `  #align(center, [${escTypst(institution)}])`,
        '  #v(2cm)',
        `  #align(center, [© Copyright by ${escTypst(author)} ${escTypst(String(year))}])`,
        ']',
    ]
        .filter(Boolean)
        .join('\n')
}

function escTypst(s) {
    return String(s)
        .replace(/\\/g, '\\\\')
        .replace(/\*/g, '\\*')
        .replace(/_/g, '\\_')
        .replace(/\$/g, '\\$')
        .replace(/#/g, '\\#')
        .replace(/@/g, '\\@')
}

export default function TitlePage({ content, params, block }) {
    const data = resolveData({ content, params, block })

    useDocumentOutput(block, 'typst', <Raw>{buildTypstTitlePage(data)}</Raw>)
    // <Raw> already passes its content through verbatim (the IR walker
    // emits rawTextFromChildren without running escapeLatexInline). The
    // markRawLatex sentinel is only needed inside paragraph TEXT that
    // would otherwise be escaped — for raw-block content, plain string
    // is correct.
    useDocumentOutput(block, 'latex', <Raw>{buildLatexTitlePage(data)}</Raw>)

    useDocumentOutput(
        block,
        'html',
        <article className="thesis-titlepage">
            <h1>{data.title}</h1>
            {data.subtitle ? <p className="subtitle">{data.subtitle}</p> : null}
            <p>by</p>
            <p className="author">{data.candidate?.name || data.author}</p>
            <p>
                A thesis submitted in conformity with the requirements
                <br />
                for the degree of {data.degree?.level}
                {data.degree?.field ? ` in ${data.degree.field}` : ''}
            </p>
            {data.department ? <p>{data.department}</p> : null}
            <p>{data.institution || 'University of Toronto'}</p>
            <p>© Copyright by {data.candidate?.name || data.author} {data.year || ''}</p>
        </article>,
    )

    // Web preview — a centered prose rendering of the same data.
    return (
        <section className="thesis-titlepage mx-auto max-w-[var(--max-content-width)] px-6 py-20 text-center">
            <h1 className="text-heading text-4xl font-bold mb-4">{data.title}</h1>
            {data.subtitle ? (
                <p className="text-subtle text-2xl font-light mb-8">
                    {data.subtitle}
                </p>
            ) : null}
            <p className="my-6">by</p>
            <p className="text-2xl font-semibold mb-8">
                {data.candidate?.name || data.author}
            </p>
            <p className="leading-relaxed">
                A thesis submitted in conformity with the requirements
                <br />
                for the degree of {data.degree?.level}
                {data.degree?.field ? ` in ${data.degree.field}` : ''}
            </p>
            {data.department ? <p className="mt-4">{data.department}</p> : null}
            <p>{data.institution || 'University of Toronto'}</p>
            <p className="mt-12 text-subtle text-sm">
                © Copyright by {data.candidate?.name || data.author} {data.year || ''}
            </p>
        </section>
    )
}
