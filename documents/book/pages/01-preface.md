---
type: BackMatter
title: Preface
---

# Preface

This is a sample book scaffold for the `book` template in `@uniweb/unipress`. It exercises the `@uniweb/book` foundation's section types end-to-end — front matter via `BackMatter`, two `Chapter` sections, and the title-page / copyright / TOC structure declared in `document.yml`.

Replace this content with your own preface. The `BackMatter` section type skips chapter numbering, so the heading above renders without a "Chapter N" label.

You can compile this directory to PDF, EPUB, or Paged.js HTML:

```bash
unipress compile . --format pdf
unipress compile . --format epub
unipress compile . --format pagedjs
```

The same content drives every output. The foundation decides the typography, page layout, and per-format adapter options — you just write markdown.
