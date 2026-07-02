# Covers and images

Two kinds of artwork go into a book: the **covers** (front and back), and the
**images** inside the text. unipress handles both — this page covers how to add
them and how to make them the right size and resolution for print.

## Covers

Your book has a front cover and, optionally, a back cover. Put the image files in
your project's `assets/` folder and point to them under `book.covers`:

```yaml
# document-book.yml  (your final variant)
book:
  covers:
    front: assets/front.png
    back:  assets/back.png
```

That's it. On the next build the front cover becomes the first page of the PDF and
the thumbnail of your EPUB; the back cover becomes the last page of the PDF. (EPUBs
have no back cover — ebook readers only use the front.)

> **Covers must live in the config unipress actually reads** — your default
> `document.yml` or the file you pass to `--variant`. Covers set only in a
> `unipress.config.js` (`--config`) won't be picked up. If a cover silently doesn't
> appear, see [troubleshooting](../troubleshooting.md#cover-image-or-other-config-asset-doesnt-appear-in-the-output).

### Size and resolution

Make the cover image the **same proportions as your trim** so it fills the page
without stretching or letterboxing. A 6 × 9 book is a 2 : 3 (0.667) ratio, so a
portrait image around **1800 × 2700 px** covers it at print quality (300 DPI at
6 × 9). For the ebook thumbnail, a tall image of at least **1600 × 2560 px** is a
safe, widely-accepted size.

| Your trim | Cover proportions | ~300 DPI pixel size |
|---|---|---|
| 6 × 9 in | 2 : 3 | 1800 × 2700 |
| 7 × 10 in | 7 : 10 | 2100 × 3000 |
| A5 (148 × 210 mm) | ~1 : 1.41 | 1748 × 2480 |

Use PNG or high-quality JPEG. The title and author usually live **in the artwork**
itself — if yours does, turn off the typeset title page so it isn't repeated:
`book.structure.titlePage: false` (see
[size-and-layout.md](./size-and-layout.md#front-matter)).

### The print cover is a different file

This is the one thing that surprises first-time authors. The `book.covers` images
above are your **digital** covers — used for the EPUB and the standalone PDF. A
**print** book needs something else: a single **wrap-around** cover image —
back + spine + front in one piece, with **bleed** past the edges.

The catch is the **spine width**, which depends on your page count and paper stock,
so you can only make the wrap cover once the interior is final. Every
print-on-demand service gives you a **cover template generator** that outputs the
exact dimensions for *your* book:

- [KDP cover calculator](https://kdp.amazon.com/cover-calculator)
- [IngramSpark cover template generator](https://myaccount.ingramspark.com/Portal/Tools/CoverTemplateGenerator)

Feed it your trim, page count, and paper, drop your art onto the template, and
upload that as the cover — separate from the interior PDF. See
[print.md](./print.md) for the full upload flow.

### Getting cover art made

A good cover sells the book; it's worth doing well. Realistic options:

- **Hire a designer** — [Reedsy](https://reedsy.com), [99designs](https://99designs.com),
  or [Fiverr](https://www.fiverr.com) span a wide range of budgets.
- **Use a cover tool** — Canva and Adobe Express have book-cover templates.
- **Make your own** if you have the skill; start from your trim's proportions above.

Whichever you choose, match the size and bleed your print service asks for.

## Images in your book

Put image files in `assets/` and reference them from your markdown with a normal
image link. The book foundation numbers figures and renders your caption:

```markdown
![A cross-section of the cell, labelled.](/assets/cell-diagram.png)
```

The text in the brackets becomes the caption (and the accessibility description —
worth writing well). You don't manage figure numbers; the foundation does.

### Resolution: enough pixels to print

Screens are forgiving; print is not. A print needs about **300 pixels per inch at
the size the image appears on the page**. So an image printed 4.5 in wide (roughly
the text width of a 6 × 9 book) wants to be about **1350 px wide** minimum; a
full-page plate wants more. A photo that looks crisp on screen at 600 px will print
soft and blocky.

Rule of thumb: **printed width in inches × 300 = minimum pixels wide.** Supply the
highest-resolution originals you have; unipress embeds them at full quality, so the
source image is what determines how it prints.

### Color

Screens are RGB; presses are CMYK. Print-on-demand services accept RGB images and
convert them for you, which is fine for most books. If exact color fidelity matters
(art books, brand colors), ask your print service whether they want CMYK and
proof a physical copy before publishing — on-screen color never fully matches ink.

### Formats and file size

PNG for diagrams, line art, and anything with text or sharp edges; JPEG for
photographs. There's no need to hand-optimize — but very large originals make for
large PDFs, so a few-MB photo is plenty; you rarely need 20 MB camera raws.

## Next

- Set your [size and layout](./size-and-layout.md).
- Produce your [ebook](./ebooks.md) or go to [print](./print.md).
