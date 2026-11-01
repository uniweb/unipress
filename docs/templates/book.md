# Book

A trade book — long-form prose with chapters. Trade-6x9 trim, default typography (system fonts via Typst's built-in fall-back), title page, copyright spread, table of contents, roman-numeralled front matter. Compiles to PDF (Typst), Typst source bundle, Paged.js HTML, or EPUB.

## Scaffold

```bash
unipress create my-book --template book --title "My Book" --author "Jane Doe"
cd my-book
unipress compile . --format pdf --out my-book.pdf
```

## What you get

```
my-book/
├── document.yml          pinned to @unipress/book@<version>
├── content/
│   ├── 01-welcome.md
│   ├── 02-formatting.md
│   ├── 03-where-next.md
│   └── 99-colophon.md    type: BackMatter — unnumbered
├── assets/               front.jpg and back.jpg, the placeholder covers
├── PUBLISHING.md         the path to a published book
└── README.md             starter notes
```

## `document.yml` fields

| Field                       | Purpose                                            |
|-----------------------------|----------------------------------------------------|
| `book.title`                | The title shown on the title page and in headers. |
| `book.subtitle`             | Optional subtitle, italic on the title page.      |
| `book.author`               | Author byline.                                    |
| `book.language`             | BCP-47 primary tag (`en`, `fr`, `es`, …) for label localization. |
| `book.rights`, `.publisher`, `.isbn` | Copyright-page strings.                  |
| `book.trim`                 | `trade-6x9` (default), `trade-7x10`, `crown-octavo`, `royal-octavo`, `a5`, or full-size paper: `a4`, `letter`. |
| `book.typography.bodySize`, `.leading`, `.firstLineIndent` | Body-copy spacing. |
| `book.typography.bodyFont`, `.headingFont`, `.codeFont` | Font lists; null for Typst defaults. |
| `book.structure.titlePage`, `.copyrightPage`, `.toc`     | Toggle front-matter blocks. |
| `book.structure.tocDepth`   | How deep TOC entries nest (default 2).            |
| `book.structure.frontMatterNumbering` | `none` / `roman` / `arabic`.            |
| `book.covers.front`, `.back`| Paths to cover artwork. One that isn't there stops the build, by name. |

## Add chapters

Drop a markdown file under `content/` and add its name (without its number or `.md`) to `document.yml`'s `content:` list in the order you want it to appear. Chapters need no frontmatter — the foundation's `Chapter` section handles them by default. For non-chapter pages (acknowledgments, colophon, appendices), use `type: BackMatter` in frontmatter to skip chapter numbering.

## Common customizations

- **Larger trim** for technical books: set `book.trim: trade-7x10`.
- **Classical typography**: switch to the `monograph` template, which preconfigures EB Garamond + royal-octavo trim and a deeper TOC.
- **Cover artwork**: drop image files under `assets/`, reference them via `book.covers.front: assets/cover.jpg`.

## Foundation reference

`@unipress/book` — see [the foundation's README](https://github.com/uniweb/unipress/blob/main/foundations/book/README.md) for the full list of section types, layout knobs, and theme variables.
