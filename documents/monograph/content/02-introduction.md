---
type: Chapter
title: "Introduction"
---

Every monograph opens with an introduction that does three things at once: it situates the work in its existing scholarship, it states the question the rest of the book will pursue, and it tells the reader what to expect chapter by chapter. The first task is the most contested — too brief and the reader doubts that you know the literature, too thorough and you have written a literature review instead of an introduction.

The starter chapter that follows treats Victorian-naturalist sources as a worked example of the citation apparatus this template ships with. The author of this template assumes you will replace both the sample bibliography (`collections/bibliography/`) and the chapter prose with your own material — the structural pattern is what's reusable.

## The argument in brief

State the argument once, plainly, in a paragraph. The remainder of the introduction can elaborate, but the reader should leave this section knowing the claim before the evidence arrives.

## How citations work in this template

Inline citations use a Pandoc-style sugar: `[@key]` for a bare cite, `[@key]{page=42}` for a page locator, `[@a; @b]` for a multi-cite cluster, and `[@key]{suppress-author}` when the author is named in the running prose ("Darwin (1859) showed…"). The `key` is the bibliography entry's id — the filename stem of any YAML file under `collections/bibliography/`, or an explicit `id:` field inside that file. Pick a citation style by setting `book.citationStyle:` in `document.yml`; the same nine styles citestyle ships are wired in (Chicago author-date, APA, MLA, IEEE, Vancouver, Harvard, AMA, Nature, Science). Change one line and every cite plus the back-matter list re-formats to match.

## The chapters ahead

A monograph rewards readers who know the road map. Sketch each chapter in two or three sentences — what it does and why it has to be there.
