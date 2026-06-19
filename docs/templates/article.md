# `article`

A single-column paper — A4 (default) or US Letter, continuous prose, no chapters. Clean typography, symmetric margins tuned for a comfortable ~75-character measure, an inline title block (no separate title page), and unnumbered section headings. It's the natural shape for turning a folder of notes, a report, a proposal, or an essay into one shareable PDF — and the default when you run `unipress compile .` on a loose folder of markdown.

The same `@uniweb/book` foundation drives `article`, `book`, `monograph`, and `report`. The difference is the genre: `article` sets `book.kind: article`, which renders continuous prose instead of chapters.

## Scaffold

```bash
unipress create my-paper --template article --title "On Systems" --author "Your Name"
cd my-paper
unipress compile . --format pdf --out my-paper.pdf
```

Or skip the scaffold entirely — point unipress at any folder of markdown and let it generate the config:

```bash
cd my-notes        # a folder of .md files
unipress compile . --yes
```

## What you get

```
my-paper/
├── document.yml          pinned to @uniweb/book@<version>; book.kind: article, trim: a4
├── content/
│   ├── 01-introduction.md
│   └── 02-main.md
└── README.md
```

Each file in `content/` is a section, ordered by its number prefix. The file's `# H1` is the section heading; `##` / `###` are subsections. Sections flow continuously — no page break before each one.

## When to pick `article` over `book`

- The writing is continuous prose, not divided into chapters.
- You want a full page of paper (A4 / Letter), not a small book trim.
- A title at the top is enough — no separate title page, copyright page, or cover.
- It's a report, proposal, essay, set of notes, or design doc rather than a book.

For chaptered, bindable, prose-driven work, use `book` (trade-6×9) or `monograph` (royal-octavo). For data-driven Excel/Word output, use `data-report` or `directory`.

## `document.yml` fields

Same `book:` shape as the other genres (see [book.md](./book.md)), with these article-specific defaults and knobs:

| Field                       | `article` default / note                                        |
|-----------------------------|-----------------------------------------------------------------|
| `book.kind`                 | `article` — selects the single-column genre                     |
| `book.trim`                 | `a4` (or `letter` for US/Canada)                                |
| `book.structure.toc`        | `false` — a paper has no TOC by default; set `true` for a longer one |
| `book.title` / `subtitle` / `author` | render as a centered title block atop page 1; clear the title to omit the block entirely |

Cover artwork, title pages, copyright pages, and chapter numbering don't apply to the article genre.

## Common customizations

- **US Letter instead of A4**: `book.trim: letter`.
- **Add a table of contents**: `book.structure: { toc: true, tocDepth: 2 }`.
- **Different body font**: `book.typography.bodyFont: ["EB Garamond", "Georgia"]`.
- **Tighter or looser measure**: override `book.trim` with an object — `{ preset: a4, margins: { inside: 40mm, outside: 40mm } }` — for narrower text.
- **Grow into a book**: remove `book.kind` (and set a book trim like `trade-6x9`), or start fresh with `unipress create --template book`.

## Foundation reference

`@uniweb/book` — see the foundation's README: `foundations/book/README.md`.
