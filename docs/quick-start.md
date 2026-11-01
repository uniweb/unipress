# Quick start

Point unipress at markdown you already have, or start from a template.

## Markdown you already have → a PDF

Point it at your folder:

```bash
cd my-docs        # a folder of .md files
unipress compile .
```

There's no project to set up. The first time, unipress sees there's no config, offers to create a small `document.yml` for you, and produces the PDF — a clean, single-column **article**: typeset prose, an inline title block, no chapters, on the paper your region uses. Numbered filenames (`01-intro.md`, `02-overview.md`) set the section order; `README.md` and draft files (`_notes.md`) are left out.

Prefer no prompts? `--yes` takes the defaults — an article, PDF output:

```bash
unipress compile . --yes
unipress compile . --yes --format epub      # or any format the foundation emits
```

The generated `document.yml` is yours to keep and edit — it holds the title, reading order, and output format. Re-run compile whenever the content changes.

## A4 or US Letter?

Both, in every template and every format with pages. When unipress writes a `document.yml` — `create`, or the first compile of a folder — it asks, and offers the paper your system's region uses: Letter in the US, Canada and the other [countries that use it](./publishing/size-and-layout.md#paper), A4 everywhere else. Without a terminal it picks that one and says so. From then on the file states it, so the document prints the same on any machine:

```yaml
paper: letter       # or a4
```

To print one build on the other paper, or to choose when creating:

```bash
unipress compile . --paper a4                       # this build only
unipress compile . --paper a4 --out my-doc-a4.pdf   # keep both
unipress create my-report --template data-report --paper letter
```

A couple of other one-line tweaks live in the `book:` block — numbered sections (`structure: { numberHeadings: true }`) and a table of contents (`structure: { toc: true }`). See the [article guide](./templates/article.md) for the full list.

## Starting from scratch

No content yet? Scaffold a starter from a template:

```bash
unipress create my-book --template book --title "My Book" --author "Your Name"
cd my-book && unipress compile .
```

`create` writes a content-only directory — markdown, a `document.yml`, optional `theme.yml` and `assets/`; no `package.json`, no `node_modules`. `unipress list-templates` lists the templates. Each carries the typography and structure, so a book reads like a book and a directory like a directory.

> **Planning to publish?** There's a full author's guide that takes a book from your folder all the way to Amazon and print — [Publishing your book](./publishing/overview.md).
