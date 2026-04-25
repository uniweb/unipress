# `report` template

A technical report: trade-7x10 trim, block paragraphs (no first-line indent), tables and code listings styled for clarity, code-block margin relief so wide content doesn't wrap awkwardly. Same `@uniweb/book` foundation as the `book` and `monograph` templates — configured for technical writing.

```bash
unipress compile . --format pdf --out my-report.pdf
unipress compile . --format pagedjs --out my-report.html
```

## What's here

```
report/
├── document.yml          pinned to @uniweb/book; trade-7x10, block paragraphs
├── pages/
│   ├── 01-summary.md     executive summary + recommendations table
│   ├── 02-findings.md    body, with code listing and pull-quote
│   └── 03-methodology.md
└── README.md             this file
```

## When to pick `report` over `book` or `monograph`

- The reader expects a summary up top and methodology at the bottom.
- The body has tables, code, configuration snippets, or numbered findings.
- Block paragraphs (no indent) read better than first-line-indented prose for the content.
- A wider page (trade-7x10) gives long code lines and wide tables more room.

For prose-driven content, pick `book` (trade-6x9) or `monograph` (royal-octavo, classical typography).

## Customize

Edit `document.yml`:

- `book.trim:` — `trade-7x10` (default), `trade-6x9`, `crown-octavo`, `royal-octavo`, `a5`.
- `book.typography.codeMarginRelief:` — `0pt` to disable; `0.25in` (default) lets code blocks extend past the body column.
- `book.typography.firstLineIndent:` — `0pt` (default for reports) for block paragraphs; `1.25em` for prose-style indented paragraphs.
- `book.structure.copyrightPage:` — `false` (default for reports) to drop the copyright spread.
