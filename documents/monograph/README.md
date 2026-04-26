# `monograph` template

A scholarly monograph: royal-octavo trim, classical typography (EB Garamond by default), three-deep TOC, roman-numeralled front matter, and a working citation system. Same `@uniweb/book` foundation as the `book` and `report` templates — different defaults to fit academic press conventions.

```bash
unipress compile . --format pdf --out my-monograph.pdf
unipress compile . --format epub --out my-monograph.epub
```

## What's here

```
monograph/
├── document.yml              pinned to @uniweb/book; royal-octavo, EB Garamond
├── collections/
│   └── bibliography/
│       └── refs.bib          BibTeX records — one .bib file, every @entry is one record
├── content/
│   ├── 01-preface.md         type: BackMatter
│   ├── 02-introduction.md    type: Chapter
│   ├── 03-chapter-one.md     type: Chapter (worked cite example)
│   └── 99-bibliography.md    type: Bibliography (back-matter list)
└── README.md                 this file
```

The starter ships a small Victorian-naturalist bibliography and a chapter that exercises every inline-cite shape — bare, page locator, multi-cite cluster, suppress-author. Compile out of the box and read the result alongside the markdown source to see what each shape produces.

## Citations

### Pick a style

Set `book.citationStyle:` in `document.yml`. Nine styles ship:

| Style | Shape | Use case |
|---|---|---|
| `chicago-author-date` (default) | (Darwin 1859, 42) | Humanities, history, social sciences |
| `apa` | (Darwin, 1859) | Psychology, education, social sciences |
| `mla` | (Darwin 42) | Literature, modern languages |
| `harvard` | (Darwin 1859: 42) | UK humanities, business |
| `ieee` | [1, p. 42] | Engineering, computer science |
| `vancouver` | (1) | Medicine, biomedicine |
| `ama` | ¹ | Medical journals |
| `nature` | ¹ | Nature journals |
| `science` | (1) | Science journals |

Switching the style re-formats every inline cite and the back-matter bibliography to match. No other change is needed.

### Author bibliography entries

Drop a `.bib` file into `collections/bibliography/`. Every `@entry{key, ...}` becomes one record; the BibTeX cite key is the entry id you reference from prose with `[@key]`. Standard BibTeX entry types — `@article`, `@book`, `@incollection`, `@inproceedings`, `@phdthesis`, `@techreport`, `@misc`, and the rest — all work; LaTeX accents (`\"u`, `\'e`, `\v{c}`) are converted to Unicode automatically.

```bibtex
% collections/bibliography/refs.bib

@book{darwin1859,
  author    = {Darwin, Charles},
  title     = {On the Origin of Species},
  publisher = {John Murray},
  address   = {London},
  year      = {1859}
}

@article{wallace1858,
  author  = {Wallace, Alfred Russel},
  title   = {On the Tendency of Varieties to Depart Indefinitely from the Original Type},
  journal = {Journal of the Proceedings of the Linnean Society of London. Zoology},
  volume  = {3},
  number  = {9},
  pages   = {53--62},
  year    = {1858}
}
```

Already have records as YAML or JSON in CSL-JSON shape? Drop them in the same folder — the loader merges every `.bib`, `.yml`, and `.json` it finds into one collection. Use whatever your reference manager exports; reach for hand-written YAML when an entry needs a field BibTeX can't carry. The full list of CSL types and fields is at [docs.citationstyles.org](https://docs.citationstyles.org/en/stable/specification.html#appendix-iii-types).

### Cite in prose

```markdown
Darwin (1859) showed [@darwin1859]{suppress-author} that selection
acts on heritable variation [@darwin1859]{page=42}.
Independent contemporary work [@wallace1858; @lyell1830] reached
compatible conclusions.
```

| Markdown | Renders as (chicago-author-date) |
|---|---|
| `[@darwin1859]` | (Darwin 1859) |
| `[@darwin1859]{page=42}` | (Darwin 1859, 42) |
| `[@a; @b]` | (Author A 1900; Author B 1910) |
| `[@darwin1859]{suppress-author}` | (1859) — for prose where the author is already named |
| `[@nope]` | [?] — visible placeholder, no compile failure |

A missing key never breaks the compile — the `[?]` mark is a visible reminder to fix the citation.

### The back-matter bibliography

`content/99-bibliography.md` is a one-line back-matter section that lists every record from the collection in style-correct order:

```markdown
---
type: Bibliography
title: References
data: bibliography
---
```

For numbered styles (IEEE, Vancouver, etc.), the bibliography list reuses the same numbering the inline cites use — `[1]` inline matches `[1]` in the back-matter list.

## When to pick `monograph` over `book`

- You need cited bibliographic references in your prose.
- You want section numbering deeper than two levels (default `tocDepth: 3`).
- You want classical book typography (EB Garamond) rather than the foundation's default sans/serif fall-back.
- You want a slightly larger page (royal-octavo, 6.14×9.21in) common in academic hardcovers.

For trade-paperback fiction or non-fiction prose, use `book` instead.

## Customize

Edit `document.yml`:

- `book.citationStyle:` — pick from the nine styles above.
- `book.bibliography.sortBy:` — `author` (default), `year`, or `collection-order`.
- `book.typography.bodyFont`, `book.typography.headingFont` — the EB Garamond fallback chain.
- `book.trim:` — `royal-octavo` (default), `crown-octavo`, `trade-6x9`, `trade-7x10`, `a5`.
- `book.structure.tocDepth:` — bump to 4 for very subdivided arguments.

For the full list of foundation knobs, see `framework/unipress/foundations/book/README.md`.
