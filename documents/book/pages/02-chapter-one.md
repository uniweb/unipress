# A Beginning

The first chapter of a book sets the tone. It introduces the reader to the world of the text — the questions it will pursue, the ground it will cover, the kind of attention it expects.

Write a few paragraphs of natural prose here, or replace this entire file. The `Chapter` section type is the foundation's default, so a markdown file like this — no frontmatter required — is rendered as a chapter automatically.

## A subsection

Subsection headings (`##`) appear in the printed PDF with a smaller weight, with the spacing rhythm tuned for trade-6x9 trim. The Paged.js stylesheet handles them analogously for HTML output.

The chapter ends when the next `# Heading` starts a new chapter, or when the file ends. To split a long chapter across multiple files, give each file a number prefix (`02a-introduction.md`, `02b-history.md`) and list them in `document.yml`'s `pages:` in the order you want them to appear.

### Even smaller subsections

Three-deep heading (`###`) is the deepest level the default TOC includes (`tocDepth: 2` keeps it to chapter + section). Bump `tocDepth: 3` in `document.yml` to expose this level in the table of contents.
