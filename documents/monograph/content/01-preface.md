---
type: BackMatter
title: Preface
---

# Preface

A monograph is a sustained, single-author argument on a focused topic — historically the form scholars use when an article is not enough and a textbook is too much. This template scaffolds one: royal-octavo trim, classical body typography (EB Garamond by default, falling back to Garamond and Georgia), section numbering three levels deep, roman-numeralled front matter, and a working citation system.

Replace this preface with your own. The `BackMatter` section type skips chapter numbering, so the "Preface" heading above renders without a "Chapter N" label. Acknowledgments, dedications, and a list of abbreviations all use the same section type.

The starter ships a small Victorian-naturalist bibliography (`collections/bibliography/refs.bib`) and a chapter that exercises the inline `[@key]` cite syntax. Replace the entries with your own — drop in the `.bib` file your reference manager exports — and rewrite the chapter to fit your topic. The cites and the back-matter bibliography both update automatically.

Compile to PDF for archive-quality print or to EPUB for distribution:

```bash
unipress compile . --format pdf
unipress compile . --format epub
```
