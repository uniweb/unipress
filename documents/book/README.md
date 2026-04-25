# `book` template

A starter scaffold for a book — front matter (preface), two sample chapters, configured for trade-6x9 with a title page, copyright page, and TOC. Compile to PDF (Typst), Typst source bundle, Paged.js HTML, or EPUB.

```bash
unipress compile . --format pdf --out my-book.pdf
unipress compile . --format epub --out my-book.epub
unipress compile . --format typst --out my-book.zip   # Source bundle
```

## What's here

```
book/
├── document.yml         pinned to @uniweb/book; book metadata + structure
├── pages/
│   ├── 01-preface.md    type: BackMatter — unnumbered front matter
│   ├── 02-chapter-one.md
│   └── 03-chapter-two.md
└── README.md            this file
```

## Customize

Open `document.yml` and edit:

- `book.title`, `book.subtitle`, `book.author`, `book.language`
- `book.trim:` — `trade-6x9`, `trade-7x10`, `crown-octavo`, `royal-octavo`, `a5`
- `book.structure:` — toggle `titlePage`, `copyrightPage`, `toc`; set `tocDepth`; pick `frontMatterNumbering` (`none` / `roman` / `arabic`)
- `book.typography:` — `bodySize`, `leading`, `bodyFont`, `headingFont`
- `book.covers:` — `front:` and `back:` paths to cover artwork

See the foundation's reference for the full list: `framework/unipress/docs/templates/book.md` (planned) or `framework/unipress/foundations/book/README.md`.

## Add chapters

Add a new markdown file under `pages/`, then add its base name (without `.md`) to `document.yml`'s `pages:` list in the order you want it to appear. Chapters need no frontmatter; the foundation's `Chapter` section handles them by default.

For non-chapter pages (acknowledgments, colophon, appendices), use `type: BackMatter` in frontmatter to skip chapter numbering.
