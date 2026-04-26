# `monograph` template

A scholarly monograph: royal-octavo trim, classical typography (EB Garamond by default), three-deep TOC, roman-numeralled front matter. Same `@uniweb/book` foundation as the `book` and `report` templates — different defaults to fit academic press conventions.

```bash
unipress compile . --format pdf --out my-monograph.pdf
unipress compile . --format epub --out my-monograph.epub
```

## What's here

```
monograph/
├── document.yml         pinned to @uniweb/book; royal-octavo, EB Garamond
├── content/
│   ├── 01-preface.md    type: BackMatter
│   ├── 02-introduction.md
│   └── 03-chapter-one.md
└── README.md            this file
```

## When to pick `monograph` over `book`

- You want section numbering deeper than two levels (default `tocDepth: 3`).
- You want classical book typography (EB Garamond) rather than the foundation's default sans/serif fall-back.
- You want a slightly larger page (royal-octavo, 6.14×9.21in) common in academic hardcovers.

For trade-paperback fiction or non-fiction prose, use `book` instead.

## Customize

Edit `document.yml`:

- `book.typography.bodyFont`, `book.typography.headingFont` — the EB Garamond fallback chain.
- `book.trim:` — `royal-octavo` (default), `crown-octavo`, `trade-6x9`, `trade-7x10`, `a5`.
- `book.structure.tocDepth:` — bump to 4 for very subdivided arguments.

For the full list of foundation knobs, see `framework/unipress/foundations/book/README.md`.
