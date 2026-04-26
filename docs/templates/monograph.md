# `monograph`

A scholarly monograph — sustained, single-author argument on a focused topic with a working citation system. Royal-octavo trim, classical typography (EB Garamond by default with Garamond and Georgia fall-backs), three-deep TOC, roman-numeralled front matter, inline `[@key]` cites, and a back-matter bibliography formatted by [citestyle](https://github.com/uniweb/csl) in any of nine styles. Same `@uniweb/book` foundation as the `book` and `report` templates, configured for academic press conventions.

## Scaffold

```bash
unipress create my-monograph --template monograph --title "On X" --author "Jane Doe"
cd my-monograph
unipress compile . --format pdf --out my-monograph.pdf
```

The starter ships a small Victorian-naturalist bibliography (nine entries — Darwin, Wallace, Lyell, Mendel, Huxley, Hooker, Spencer) and a chapter that exercises every inline-cite shape. Compile out of the box and read the result alongside the markdown source to see what each shape produces.

## What you get

```
my-monograph/
├── document.yml              pinned to @uniweb/book@<version>; royal-octavo, EB Garamond
├── collections/
│   └── bibliography/
│       └── refs.bib          BibTeX file — every @entry is one record
├── content/
│   ├── 01-preface.md         type: BackMatter
│   ├── 02-introduction.md    type: Chapter
│   ├── 03-chapter-one.md     type: Chapter (worked cite example)
│   └── 99-bibliography.md    type: Bibliography (back-matter list)
└── README.md
```

## When to pick `monograph` over `book`

- You need cited bibliographic references in your prose.
- You want section numbering deeper than two levels (default `tocDepth: 3`).
- You want classical book typography (EB Garamond) rather than the foundation's default sans/serif fall-back.
- You want a slightly larger page (royal-octavo, 6.14×9.21in) common in academic hardcovers.

For trade-paperback fiction or non-fiction prose, use `book` instead. For a technical report with tables and code, use `report`.

## Citations

The citation system has three pieces: a **style** declared in `document.yml`, a **collection** of bibliography records, and **inline cites** in the prose that reference those records by key.

### Pick a style

Set `book.citationStyle:` in `document.yml`. Nine styles ship statically wired — switch the document's whole bibliographic apparatus by changing one value:

| Style                  | Inline shape       | Use case                                        |
|------------------------|--------------------|-------------------------------------------------|
| `chicago-author-date`  | (Darwin 1859, 42)  | Humanities, history, social sciences (default) |
| `apa`                  | (Darwin, 1859)     | Psychology, education, social sciences          |
| `mla`                  | (Darwin 42)        | Literature, modern languages                    |
| `harvard`              | (Darwin 1859: 42)  | UK humanities, business                         |
| `ieee`                 | [1, p. 42]         | Engineering, computer science                   |
| `vancouver`            | (1)                | Medicine, biomedicine                           |
| `ama`                  | ¹                  | Medical journals                                |
| `nature`               | ¹                  | Nature journals                                 |
| `science`              | (1)                | Science journals                                |

Numbered styles (IEEE, Vancouver, Nature, Science, AMA) reuse the same numbering across inline cites and the back-matter list — `[1]` inline matches `[1]` in the back-matter.

Optional sort: `book.bibliography.sortBy:` — `author` (default), `year`, or `collection-order`.

### Author bibliography entries

Drop a `.bib` file into `collections/bibliography/`. Every `@entry{key, ...}` becomes one record; the BibTeX cite key is the entry id you reference from prose with `[@key]`. Standard BibTeX entry types work (`@article`, `@book`, `@incollection`, `@inproceedings`, `@phdthesis`, `@techreport`, `@misc`, etc.); LaTeX accents (`\"u`, `\'e`, `\v{c}`) are converted to Unicode automatically.

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

If a record needs a CSL field BibTeX can't carry — multi-script titles, fine-grained date parts, fielded notes — drop a hand-written YAML file (CSL-JSON shape) into the same folder. The loader merges every `.bib`, `.yml`, and `.json` it finds, so authors can mix the format their reference manager exports with one-off hand-edited entries.

```yaml
# collections/bibliography/wallace1858.yml — full CSL-JSON, overrides if a duplicate
# cite key exists in any .bib file in the same folder.
id: wallace1858
type: article-journal
author:
  - family: Wallace
    given: Alfred Russel
title: "On the Tendency of Varieties to Depart Indefinitely from the Original Type"
container-title: "Journal of the Proceedings of the Linnean Society of London. Zoology"
volume: 3
issue: 9
page: 53-62
issued:
  date-parts: [[1858]]
```

#### Common entry types

| `type:` value           | What it is                                                            |
|-------------------------|-----------------------------------------------------------------------|
| `book`                  | Single-volume monograph (Darwin's *Origin*).                          |
| `article-journal`       | Journal article (Mendel's *Versuche*).                                |
| `article-magazine`      | Magazine article.                                                     |
| `article-newspaper`     | Newspaper article.                                                    |
| `chapter`               | Chapter in an edited volume — set `editor:` and `container-title:`.   |
| `paper-conference`      | Conference proceedings.                                               |
| `thesis`                | Dissertation or thesis — set `genre: PhD` / `Master's` if relevant.   |
| `report`                | Technical or institutional report.                                    |
| `webpage`               | Web page, blog post, or any URL-only source.                          |
| `personal_communication`| Letter, email, interview.                                             |

The full CSL 1.0.2 type list is at [docs.citationstyles.org](https://docs.citationstyles.org/en/stable/specification.html#appendix-iii-types). The foundation passes `type:` through to citestyle unchanged; any valid CSL type works.

#### Common fields

| Field                                                | Purpose                                                              |
|------------------------------------------------------|----------------------------------------------------------------------|
| `id`                                                 | Cite key (defaults to the filename stem).                            |
| `type`                                               | One of the CSL types above.                                          |
| `author`                                             | String (`"Last, First"`) or array of name objects (`[{family, given}]`). |
| `editor`, `translator`, `container-author`           | Same shape as `author`.                                              |
| `title`                                              | The work's title.                                                    |
| `container-title`                                    | Journal name, edited-volume title, magazine.                         |
| `publisher`, `publisher-place`                       | Publisher and city.                                                  |
| `volume`, `issue`, `page`                            | Journal locators (string or number).                                 |
| `year` (shorthand) or `issued: { date-parts: [[YYYY]] }` | Publication date.                                                |
| `DOI`, `URL`, `ISBN`, `ISSN`, `PMID`                 | Identifiers — citestyle auto-links DOIs.                             |
| `edition`, `genre`, `note`, `language`               | Misc fields most styles consume.                                     |

### Cite in prose

Inline citations use a Pandoc-style sugar that compiles to an inline inset. Five shapes cover the full range:

| Markdown                          | Renders as (chicago-author-date)                          |
|-----------------------------------|-----------------------------------------------------------|
| `[@darwin1859]`                   | (Darwin 1859)                                             |
| `[@darwin1859]{page=42}`          | (Darwin 1859, 42)                                         |
| `[@darwin1859; @wallace1858]`     | (Darwin 1859; Wallace 1858)                               |
| `[@darwin1859]{suppress-author}`  | (1859) — when "Darwin" already appears in the prose       |
| `[@nope]`                         | [?] — visible placeholder, no compile failure             |

The locator can be `page=42`, `chapter=3`, `section=2.1`, `paragraph=12`, etc. Set `label=<kind>` to label it explicitly: `[@darwin1859]{locator=2 label=chapter}` renders as `(Darwin 1859, chap. 2)` in styles that abbreviate the label.

Multi-cite clusters collapse per the active style's rules. In chicago-author-date, two cites by the same author share the author and join their years with a comma: `[@darwin1859; @darwin1871]` renders as `(Darwin 1859, 1871)`.

The `[@key]` shorthand desugars to `[@key](@Cite){k=v}` — the framework's textual inline-inset form. You can also call other inline insets directly with the same `[text](@Component){k=v}` syntax (see the foundation README).

### The back-matter bibliography

`content/99-bibliography.md` is a one-line back-matter section that lists every record from the collection in style-correct order:

```markdown
---
type: Bibliography
title: References
data: bibliography
---
```

The `data: bibliography` shorthand fetches from the collection of that name declared in `document.yml`. For numbered styles the entries appear in citation-encounter order; for author-date styles they're alphabetical by author then year.

For collections of references that don't all need to ride together — say, a list of "further reading" separate from the main bibliography — declare a second collection in `document.yml` and reference it from a second `Bibliography` section with `data: <other-name>` and an optional `style: <override>`.

## `document.yml` fields

Same shape as `book` (see [book.md](./book.md)). The defaults differ:

| Field                                | `monograph` default                                 |
|--------------------------------------|------------------------------------------------------|
| `book.trim`                          | `royal-octavo`                                       |
| `book.typography.bodyFont`           | `["EB Garamond", "Garamond", "Georgia"]`             |
| `book.typography.headingFont`        | `["EB Garamond", "Garamond", "Georgia"]`             |
| `book.typography.bodySize`           | `10.5pt`                                             |
| `book.typography.leading`            | `0.68em`                                             |
| `book.structure.tocDepth`            | `3`                                                  |
| `book.structure.frontMatterNumbering`| `roman`                                              |
| `book.citationStyle`                 | `chicago-author-date`                                |
| `book.bibliography.sortBy`           | `author`                                             |
| `collections.bibliography.path`      | `collections/bibliography`                           |

## Common customizations

- **Switch citation style** by changing one line: `book.citationStyle: ieee` (or any of the nine styles above). Re-compile; every cite and the back-matter list re-formats to match.
- **Add a "further reading" section** by declaring a second collection in `document.yml` (`collections.further-reading.path: collections/further-reading`) and a second `Bibliography` content file with `data: further-reading`.
- **Drop the citations entirely** by deleting `99-bibliography.md`, the `collections/` directory, and the `book.citationStyle:` block. The remaining template behaves like a citation-free `book` with monograph typography.

## Foundation reference

`@uniweb/book` — see [foundations/book/README.md](https://github.com/uniweb/unipress/blob/main/foundations/book/README.md) for the full list of foundation knobs and `foundations/book/CHANGELOG.md` for the version history.
