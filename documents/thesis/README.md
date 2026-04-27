# Thesis template (UofT-shaped)

A starter unipress template for an academic thesis. Produces a
PDF that meets the University of Toronto School of Graduate Studies
formatting requirements via `latexmk` on the LaTeX path; comparable
typography is available on the Typst path. Theses from other
institutions can switch the template by editing one value (see
[Switching institutions](#switching-institutions) below).

## Quick start

```sh
unipress create my-thesis --template thesis \
    --title "Your Thesis Title" \
    --author "Your Name"

cd my-thesis
unipress compile . --format latex --out my-thesis.zip
unzip -o my-thesis.zip -d build
cd build && latexmk -pdf main.tex
open main.pdf
```

That gives you a clean PDF with a UofT title page, a stub abstract, an
auto-generated list of figures, four chapters of placeholder
algorithmic-CS prose, a worked theorem and proof, a 12-entry
bibliography, and one appendix.

## What you edit, what you don't

The thesis template uses two distinct config files:

**`document.yml`** holds technical configuration — output format,
foundation reference, citation style, structural settings. You'll
typically only touch the `citationStyle:` field, and only if you
prefer something other than IEEE.

**`thesis.yml`** holds your institutional / candidate metadata. This
is where you replace four or five values that are personal to you:

```yaml
title: "Your Thesis Title"
candidate:
  name: "Your Name"
degree:
  level: M.Sc.    # or Ph.D., M.A., M.Eng.
  field: Computer Science
department: Department of Computer Science
institution: University of Toronto
year: 2026
```

The `TitlePage` section type reads this and renders the canonical
UofT-styled title page. You shouldn't need to edit `00-titlepage.md`
itself — the section just declares its type and the foundation does
the rest.

## Authoring chapters

Each chapter is one Markdown file under `content/`. Files are emitted
in alphabetical order by filename, so the `NN-` prefix gates the
sequence. `00-` / `01-` / `02-` are conventionally front-matter,
`10-`–`19-` are body chapters, `90-` is references / bibliography,
`99-` is appendices.

A chapter file looks like:

```markdown
---
type: Chapter
title: "Introduction"
id: sec-intro
---

The introduction begins here. Cite earlier work like
[@christofides1976] or with a locator [@cormen2009]{page=87}.

## A subsection {#sec-method}

Reference the section with [#sec-method] later in the chapter.

A figure with cross-reference:

![A diagram](images/diagram.png){#fig-1 caption="The diagram caption."}

In a later chapter, [#fig-1] resolves to "Fig. 1" or "Figure 1"
depending on the citation/xref preset.
```

The frontmatter `id:` on a chapter sets the cross-reference label for
the chapter as a whole — `[#sec-intro]` resolves to the chapter
number. Subsections get their own ids via `{#sec-id}` after the
heading.

## Theorems, lemmas, definitions, proofs

The foundation ships dedicated section types for math-style content:

```markdown
---
type: Theorem
id: thm-main
name: "Main Result"
---

The body of the theorem statement.
```

```markdown
---
type: Proof
---

The body of the proof.
```

Theorem, Lemma, and Definition are numbered per chapter ("Theorem
4.1, Lemma 4.2"). Lemma shares Theorem's counter so a Theorem
followed by a Lemma in the same chapter numbers consecutively.
Definition has its own counter. Proof is unnumbered.

Cross-reference a labelled theorem from anywhere in the document with
`[#thm-main]` — resolves to "Theorem 4.1" automatically via biblatex
hyperref's `\autoref`.

## Switching citation style

```yaml
# document.yml
book:
  citationStyle: chicago-author-date  # or apa, mla, harvard, ieee, vancouver, ama, nature, science
```

Nine styles are available. The setting drives both the inline `[@key]`
cite formatting and the back-matter `\printbibliography` rendering.
biblatex picks up the change on next compile; biber is invoked
automatically by `latexmk`.

## Switching institutions

The default template targets the UofT SGS formatting requirements
via the community-maintained `ut-thesis.cls` on CTAN. Other
institutions usually publish their own LaTeX class. To switch:

1. **Drop the institutional class file into the project**. If your
   institution publishes a `.cls` file (e.g. `mit-thesis.cls`), put
   it in `assets/` and the foundation will bundle it.
2. **Or rely on `tlmgr install`** if your institution's class is on
   CTAN — most major research universities have one.
3. **Comment out `book.kind: thesis-uoft`** in `document.yml` to fall
   back to the foundation's generic book template, then add a custom
   preamble to override `\documentclass` to your institution's class.

Future versions of the foundation may ship parameterised
`book.kind: 'thesis-mit'` / `'thesis-stanford'` etc. as the
ecosystem matures. Open an issue if you want yours added.

## ProQuest submission

The thesis-uoft template enables PDF/A-1b output for ProQuest
archival via the `pdfx` package. Confirm your generated PDF is
PDF/A-compliant before submission — Adobe Acrobat's
"Preflight → PDF/A → Verify Compliance" or the open-source
[veraPDF](https://verapdf.org/) tool both work.

UofT's specific submission flow is covered at
https://www.sgs.utoronto.ca/current-students/program-completion/
— the thesis template aims to produce output that meets the
formatting requirements there but cannot guarantee anti-drift; SGS
occasionally updates margin / spacing rules. Re-validate against
their current page before final submission.

## What's NOT covered yet

A few thesis features that authors sometimes want haven't been
shipped as first-class section types yet:

- **Glossary / list of abbreviations / list of symbols** — useful in
  long theses; for now, build via `BackMatter` sections.
- **Custom theorem-style declarations** ("Conjecture", "Observation",
  "Remark") — extend `foundation.xref.kinds` per project to add new
  named environments.
- **Equation labels for cross-reference** (`{#eq-id}` on a math
  display) — labels are emitted in the LaTeX source; runtime
  cross-referencing with `[#eq-id]` is implemented but the math
  display must carry the id explicitly via an inline attribute that
  is being rolled out.

If you need any of these badly, see the foundation's source under
`@uniweb/book` and extend; or open an issue.

## Verifying the structure compiles

```sh
unipress compile . --format pagedjs --out my-thesis.html
unipress compile . --format epub --out my-thesis.epub
unipress compile . --format typst --out my-thesis.zip
unipress compile . --format latex --out my-thesis.zip
```

All four outputs should produce files. Open `my-thesis.html` in a
browser; extract the typst zip and compile via `typst compile main.typ`;
extract the latex zip and compile via `latexmk -pdf main.tex`. UofT
is satisfied by either the typst PDF or the latex PDF — pick by
your advisor's preference.

This template was last validated against SGS formatting guidelines on
2026-04-26.
