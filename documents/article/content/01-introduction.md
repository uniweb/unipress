# Introduction

You're looking at an article — a single-column document on a full page of
paper (A4 by default, or US Letter), typeset for comfortable reading. No
chapters, no cover, no separate title page: just your title at the top and
your writing flowing underneath.

This is the natural shape for most things people write in markdown — notes,
a report, a proposal, a design doc, an essay. You keep your content as
ordinary markdown files in `content/`; the number at the front of each
filename sets the order (`01-introduction.md` comes before `02-main.md`).
Each file becomes a section, and its `# H1` becomes that section's heading.

Everything you'd expect from markdown just works: **bold** and *italic*,
[links](https://uniweb.io), lists, tables, blockquotes, footnotes, fenced
code blocks, and math. You don't choose the typography — the margins, the
measure, the way headings sit on the page are the template's job. You write;
it typesets.

When you're ready, produce the PDF:

```bash
unipress compile . --format pdf
```
