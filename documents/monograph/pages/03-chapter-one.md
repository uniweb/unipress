# The First Chapter

The body of the monograph starts here. The first chapter establishes the conceptual frame the rest of the book will inhabit — its central terms, the historical or empirical material it works with, and the kind of argumentation it will use.

## Section one

Subsection headings (`##`) appear in the printed PDF with a smaller weight, with the spacing rhythm tuned for royal-octavo trim — slightly tighter than the trade-6x9 default to fit the larger text block.

Footnotes are markdown's pain point in academic writing. Two practical approaches:

1. **Inline parentheticals** for short asides — they cost nothing to write and the reader can absorb them without breaking flow.
2. **Endnote-style numbered references** at the chapter's end, written manually as `[¹]` callouts that link to a numbered list. Less rich than true footnotes but simpler.

A future iteration of this template may add proper footnote support via a custom inset; for now, use one of the patterns above and the typography stays out of your way.

## Section two

Justified paragraphs with hyphenation are on by default in the foundation's Typst template — long words break at sensible points and the right margin stays even. The result is closer to scholarly press output than the looser ragged-right of trade paperbacks.

### A subsection

Three-deep headings appear in the TOC because `tocDepth: 3` in `document.yml`. Adjust it as needed.

## Closing the chapter

The next file in `document.yml`'s `pages:` list takes over from here. Add chapters by adding `04-chapter-two.md`, `05-chapter-three.md`, etc., and listing them in the `pages:` array.
