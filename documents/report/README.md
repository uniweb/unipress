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
├── content/
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

## Adding citations

Reports often cite — primary sources backing findings, prior work in methodology, regulatory references in compliance reports. The same `@uniweb/book` foundation supports inline cites and a back-matter bibliography; this template ships them commented out so a report that doesn't need them isn't carrying empty scaffolding. To opt in:

1. Uncomment the `citationStyle:` block under `book:` and the `collections:` block at the bottom of `document.yml`.
2. Create `collections/bibliography/` and add one YAML file per source — the filename stem is the cite key (`smith2024.yml` → `[@smith2024]`).
3. Cite in prose: `[@smith2024]`, `[@smith2024]{page=12}` for a locator, `[@a; @b]` for a multi-cite cluster, `[@key]{suppress-author}` when the author is named in the running prose.
4. Add a back-matter content file (e.g. `99-bibliography.md`) with `type: Bibliography` and `data: bibliography` in frontmatter.

Pick a citation style by setting `book.citationStyle:` to one of `chicago-author-date`, `apa`, `mla`, `harvard`, `ieee`, `vancouver`, `ama`, `nature`, `science`. For numbered styles (IEEE, Vancouver, Nature, etc.), the back-matter list reuses the same numbering as the inline cites — `[1]` inline matches `[1]` in the back-matter.

The `monograph` template ships with this turned on as a worked example — `unipress create my-mono --template monograph` to see it, including a Victorian-naturalist bibliography that exercises every cite shape.

## Customize

Edit `document.yml`:

- `book.trim:` — `trade-7x10` (default), `trade-6x9`, `crown-octavo`, `royal-octavo`, `a5`.
- `book.typography.codeMarginRelief:` — `0pt` to disable; `0.25in` (default) lets code blocks extend past the body column.
- `book.typography.firstLineIndent:` — `0pt` (default for reports) for block paragraphs; `1.25em` for prose-style indented paragraphs.
- `book.structure.copyrightPage:` — `false` (default for reports) to drop the copyright spread.
- `book.citationStyle:` — one of nine supported styles; pairs with the `collections.bibliography` block above.
