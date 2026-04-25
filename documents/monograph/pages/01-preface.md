---
type: BackMatter
title: Preface
---

# Preface

A monograph is a sustained, single-author argument on a focused topic — historically the form scholars use when an article is not enough and a textbook is too much. This template scaffolds one: royal-octavo trim, classical body typography (EB Garamond by default, falling back to Garamond and Georgia), section numbering three levels deep, and roman-numeralled front matter. The same `@uniweb/book` foundation that powers the trade `book` template is configured here for academic typography and a deeper TOC.

Replace this preface with your own. The `BackMatter` section type skips chapter numbering, so the "Preface" heading above renders without a "Chapter N" label. Acknowledgments, dedications, and a list of abbreviations all use the same section type.

Compile to PDF for archive-quality print or to EPUB for distribution:

```bash
unipress compile . --format pdf
unipress compile . --format epub
```
