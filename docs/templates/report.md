# `report`

A technical report — executive summary up top, findings in the body, methodology at the bottom. Trade-7x10 trim (wider than a book — tables and code need room), block paragraphs with no first-line indent, code-block margin relief so wide content extends past the body column. Same `@uniweb/book` foundation as the `book` and `monograph` templates, configured for technical writing.

## Scaffold

```bash
unipress create q3-report --template report --title "Q3 Report" --author "Platform Team"
cd q3-report
unipress compile . --format pdf --out q3-report.pdf
```

## What you get

```
q3-report/
├── document.yml          pinned to @uniweb/book@<version>; trade-7x10, block paragraphs
├── content/
│   ├── 01-summary.md     executive summary + recommendations table
│   ├── 02-findings.md    body, with code listing and pull-quote
│   └── 03-methodology.md
└── README.md
```

## When to pick `report` over `book` or `monograph`

- The reader expects a summary up top and methodology at the bottom.
- The body has tables, code, configuration snippets, or numbered findings.
- Block paragraphs (no indent) read better than first-line-indented prose.
- A wider page (trade-7x10) gives long code lines and wide tables more room.

For prose-driven content, use `book` (trade-6x9) or `monograph` (royal-octavo, classical typography). For data-driven reports — Excel workbooks aggregating metrics — use `data-report` instead.

## `document.yml` fields

Same shape as `book` (see [book.md](./book.md)). The differences are defaults:

| Field                       | `report` default                                    |
|-----------------------------|------------------------------------------------------|
| `book.trim`                 | `trade-7x10`                                         |
| `book.typography.firstLineIndent` | `0pt` (block paragraphs)                       |
| `book.typography.codeMarginRelief`| `0.25in` (code blocks extend past body column) |
| `book.structure.copyrightPage` | `false`                                          |
| `book.structure.frontMatterNumbering` | `none`                                     |

## Common customizations

- **Add an appendix**: a new markdown file with `type: BackMatter` in frontmatter, listed in `content:`.
- **Wider code blocks**: bump `book.typography.codeMarginRelief` to `0.5in` (code extends 0.5in past each side of the body column).
- **No TOC** for short reports: set `book.structure.toc: false`.

## Foundation reference

`@uniweb/book` — see the foundation's README: `framework/unipress/foundations/book/README.md`.
