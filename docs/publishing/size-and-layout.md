# Size and layout

The physical shape of your book — its **trim size**, margins, and typography — is
set in `document.yml` under `book:`. Pick it once; every build uses it. This page
explains the choices and how to make them.

> Full field reference: [`book` template](../templates/book.md). This page is the
> *why* behind the settings.

## Trim size

The trim size is the finished page dimensions after the printer cuts the sheet.
It's the single most defining physical choice — it sets how your book feels in the
hand and constrains everything else. Set it with `book.trim`:

```yaml
book:
  trim: trade-6x9
```

### Built-in presets

| Preset | Size | Good for |
|---|---|---|
| `trade-6x9` *(default)* | 6 × 9 in | The safe default. Most trade fiction and nonfiction. |
| `trade-7x10` | 7 × 10 in | Technical books, workbooks, anything with code or wide images. |
| `crown-octavo` | 7.44 × 9.69 in (189 × 246 mm) | Common UK trade hardcover. |
| `royal-octavo` | 6.14 × 9.21 in (156 × 234 mm) | Academic and scholarly hardcover. |
| `a5` | 148 × 210 mm | Compact European paperback; pocket guides. |

Two more sizes exist for the **article** genre — full-size paper for documents and
proofing copies rather than bound books:

| Preset | Size | Good for |
|---|---|---|
| `a4` | 210 × 297 mm | The world's standard paper. A roomy proofing copy. |
| `letter` | 8.5 × 11 in | US/Canada paper. A roomy proofing copy. |

### A custom size

Any trim your printer supports. Give a width and height (and, if you like,
margins) instead of a preset name:

```yaml
book:
  trim:
    width: 5in       # a common "mass-market"-ish trade size
    height: 8in
    margins: { inside: 0.75in, outside: 0.5in, top: 0.75in, bottom: 0.75in }
```

You can also start from a preset and nudge one value:

```yaml
book:
  trim:
    preset: trade-6x9
    margins: { inside: 0.9in }   # more gutter for a thick book
```

**Pick a size your print-on-demand service offers.** Each service lists its
supported trim sizes; matching one avoids a custom-size surcharge. Check
[KDP's list](https://kdp.amazon.com/help/topic/G201834180) or
[IngramSpark's](https://help.ingramspark.com/hc/en-us/articles/360010301911).

## Margins and the gutter

A bound book needs an **asymmetric** margin: the **inside** (gutter) edge — where
the pages meet the spine — must be wider than the **outside**, or text disappears
into the binding. The presets already do this. The four margins:

```yaml
book:
  trim:
    preset: trade-6x9
    margins: { inside: 0.75in, outside: 0.5in, top: 0.75in, bottom: 0.75in }
```

**The more pages, the more gutter you need** — a thick book's spine "steals" more
of the inside margin. Print-on-demand services publish a minimum inside margin by
page count; a ~300-page 6×9 usually wants at least 0.75–0.875 in inside. Confirm
against your service's table before you finalize, and widen `inside` if needed.

## Bleed

**Bleed** is art that runs off the edge of the page. Because printers can't cut
perfectly, anything meant to reach the edge must extend ~0.125 in *past* the trim,
so the cut never leaves a white sliver.

- **Text interiors need no bleed.** Your words sit inside the margins; unipress
  emits pages at the exact trim size, which is exactly what print-on-demand wants
  for a text interior. This is the common case — you don't have to think about it.
- **Full-bleed interior *images*** (a photo running to the paper edge) are the
  exception. unipress emits trim-size pages, so it isn't set up for edge-to-edge
  interior art. Keep interior images within the text block, or ask your printer how
  they want full-bleed interior pages supplied.
- **Your cover is where bleed really matters**, and that's handled separately by
  your print service's cover template — see [covers-and-images.md](./covers-and-images.md#covers).

## Front matter

The pages before Chapter 1 — title, copyright, contents. Toggle them under
`book.structure`:

```yaml
book:
  structure:
    titlePage: true
    copyrightPage: true
    toc: true
    tocDepth: 2                 # how many heading levels the contents lists
    frontMatterNumbering: roman # none | roman | arabic
```

- **`titlePage`** — the title, subtitle, and author, typeset. If your cover art
  already carries the title (many do), you may want this **off** to avoid repeating
  it: `titlePage: false`.
- **`copyrightPage`** — the copyright/imprint page. Pulls from `book.rights`,
  `book.publisher`, `book.isbn` (see [isbn-and-metadata.md](./isbn-and-metadata.md)).
- **`toc`** — a generated table of contents from your chapter titles.
- **`frontMatterNumbering: roman`** is the traditional convention: front matter is
  numbered i, ii, iii…; Chapter 1 resets to page 1. Use `none` to leave front
  matter unnumbered, or `arabic` to number straight through.

## Typography

The defaults produce a clean, readable book — you can ship without touching them.
When you want control, set it under `book.typography`:

```yaml
book:
  typography:
    bodySize: 11pt
    leading: 0.72em          # line spacing
    firstLineIndent: 1.4em   # paragraph indent
    bodyFont: ["EB Garamond", "Georgia"]   # first available wins
    headingFont: ["EB Garamond", "Georgia"]
```

- **Fonts are tried in order**; the first one installed on the machine running the
  compile is used, and unipress embeds it in the PDF. Leave them unset to use the
  compiler's clean built-in defaults. If you name a font, make sure it's installed
  where you build.
- **Body size and leading** are the levers for page count and comfort. 10.5–11 pt
  with roomy leading reads well in a 6×9.
- For a classical look with these choices preconfigured, scaffold the **monograph**
  template instead of tuning by hand: `unipress create my-book --template monograph`.

## Next

- Add your [covers and images](./covers-and-images.md).
- Produce your [ebook](./ebooks.md) or go to [print](./print.md).
