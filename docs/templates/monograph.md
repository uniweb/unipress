# `monograph`

A scholarly monograph — sustained, single-author argument on a focused topic. Royal-octavo trim, classical typography (EB Garamond by default with Garamond and Georgia fall-backs), three-deep TOC, roman-numeralled front matter. Same `@uniweb/book` foundation as the `book` and `report` templates, configured for academic press conventions.

## Scaffold

```bash
unipress create my-monograph --template monograph --title "On X" --author "Jane Doe"
cd my-monograph
unipress compile . --format pdf --out my-monograph.pdf
```

## What you get

```
my-monograph/
├── document.yml          pinned to @uniweb/book@<version>; royal-octavo, EB Garamond, tocDepth: 3
├── content/
│   ├── 01-preface.md     type: BackMatter
│   ├── 02-introduction.md
│   └── 03-chapter-one.md
└── README.md
```

## When to pick `monograph` over `book`

- You want section numbering deeper than two levels (default `tocDepth: 3`).
- You want classical book typography (EB Garamond) rather than the foundation's default sans/serif fall-back.
- You want a slightly larger page (royal-octavo, 6.14×9.21in) common in academic hardcovers.

For trade-paperback fiction or non-fiction prose, use `book` instead. For a technical report with tables and code, use `report`.

## `document.yml` fields

Same shape as `book` (see [book.md](./book.md)). The differences are defaults:

| Field                       | `monograph` default                                 |
|-----------------------------|------------------------------------------------------|
| `book.trim`                 | `royal-octavo`                                       |
| `book.typography.bodyFont`  | `["EB Garamond", "Garamond", "Georgia"]`             |
| `book.typography.headingFont`| `["EB Garamond", "Garamond", "Georgia"]`            |
| `book.typography.bodySize`  | `10.5pt`                                             |
| `book.typography.leading`   | `0.68em`                                             |
| `book.structure.tocDepth`   | `3`                                                  |
| `book.structure.frontMatterNumbering` | `roman`                                    |

## Foundation reference

`@uniweb/book` — see the foundation's README: `framework/unipress/foundations/book/README.md`.
