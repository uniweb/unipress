# `article` template

A single-column paper — A4 or US Letter, continuous prose, no chapters.
Clean typography, an inline title block, comfortable margins. The natural
shape for turning a folder of notes or docs into one shareable PDF. Pinned
to `@uniweb/book` (the `article` genre of the book foundation).

```bash
unipress compile . --format pdf
unipress compile . --format epub      # or pagedjs, or the typst source bundle
```

## What's here

```
article/
├── document.yml          pinned to @uniweb/book; book.kind: article, trim: a4
└── content/
    ├── 01-introduction.md
    └── 02-main.md
```

Each file in `content/` is a section, ordered by the number prefix. Its
`# H1` is the section heading; `##`/`###` are subsections. Add a section by
dropping in `content/03-<name>.md` and listing its base name under
`content:` in `document.yml`.

## Customize

### Page size

`book.trim` is `a4` by default; set it to `letter` for US/Canada. Both ship
as presets — it's a one-word change.

### Title block

`book.title`, `book.subtitle`, and `book.author` render as a centered block
at the top of the first page. Leave a field blank to omit that line; clear
the title entirely for a paper with no title block at all.

### Table of contents

Off by default for an article. For a longer paper, turn it on:

```yaml
book:
  structure:
    toc: true
    tocDepth: 2
```

### When to pick `book` instead

If your writing has chapters — and wants a title page, copyright page, and
a smaller bindable trim — use the `book` template (or `monograph` /
`report`). Same foundation; the genre is the difference.
