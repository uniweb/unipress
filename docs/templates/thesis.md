# Thesis

A graduate thesis: title page, abstract, contents, chapters, theorems and proofs, citations and a bibliography, appendices. Compiles to a LaTeX source bundle by default (UofT-shaped, biblatex), or to PDF through Typst, Paged.js HTML, or EPUB.

## Scaffold

```bash
unipress create my-thesis --template thesis --title "My Thesis" --author "Jane Doe"
cd my-thesis
unipress compile . --format pdf --out my-thesis.pdf
```

For LaTeX, which needs a TeX install of your own:

```bash
unipress compile . --format latex --out my-thesis.zip
unzip -o my-thesis.zip -d build
cd build && latexmk -pdf main.tex
```

## What you get

```
my-thesis/
├── document.yml          pinned to @unipress/book@<version>; the thesis: block is your title page
├── content/
│   ├── 00-titlepage.md   type: TitlePage
│   ├── 01-abstract.md    type: Abstract
│   ├── 02-acknowledgments.md
│   ├── 03-contents.md    type: Contents, where the table of contents stands
│   ├── 03-list-of-figures.md
│   ├── 10-introduction.md  and the chapters after it
│   ├── 12-main-result-theorem.md  type: Theorem
│   ├── 12-main-result-proof.md    type: Proof
│   ├── 90-references.md  type: Bibliography
│   └── 99-appendix-a.md  type: Appendix
├── records/bibliography/ one record per source, or a .bib file
└── README.md             the same notes, in more depth
```

## Things that print themselves

- **Citations.** `[@held-karp1970]` prints in the style `book.citationStyle` names, with the entry in the bibliography.
- **Cross-references.** A heading declares an id, as `# Main Result {#sec-main-result}`, and `[#sec-main-result]` prints its number. A theorem's file declares one in its frontmatter (`id: thm-main`), and `[#thm-main]` prints "Theorem 1". An id that names nothing prints as `[?id]`, so a typo shows on the page.
- **The contents.** A file with `type: Contents` puts them where it stands. A list of figures with no figures in it prints nothing.
- **Page order.** `content:` in `document.yml` lists the pages by name, which has no number. It decides the order, so `main-result` can come before `main-result-theorem`.

## Foundation reference

`@unipress/book` — see [the foundation's README](https://github.com/uniweb/unipress/blob/main/foundations/book/README.md).
