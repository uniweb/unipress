# Publishing in print

You don't need a print run or a garage full of boxes. **Print-on-demand** (POD)
services print and ship each copy as a reader buys it — no inventory, no upfront
cost. You upload two files, set a price, and your book appears for sale as a real
paperback (or hardcover).

## The two files you upload

This is the part that trips up first-time authors. A print book is **two separate
files**, not one:

1. **The interior** — a PDF of the book's pages, **with no cover**. Just front
   matter and chapters, sized to your trim.
2. **The cover** — a single **wrap-around** image: back + spine + front, with
   bleed. Made from your print service's cover template. See
   [covers-and-images.md](./covers-and-images.md#the-print-cover-is-a-different-file).

If you upload your with-covers PDF as the interior, your cover art prints as
interior *pages* — wrong. So print gets its own cover-less cut of the book.

### Make the interior

Add a `document-print.yml` beside your other configs — the same trade book, front
matter and all, but with the `covers` block **left out**:

```yaml
# document-print.yml
format: pdf
paths: { pages: . }
book:
  trim: trade-6x9
  structure: { titlePage: true, copyrightPage: true, toc: true, frontMatterNumbering: roman }
  # no covers: — the wrap-around cover is uploaded separately
content: [ ... ]
```

Build it:

```bash
unipress compile . --variant print --format pdf --out interior.pdf
```

`interior.pdf` is your print interior. It's already what POD services want: pages at
the exact trim size, with fonts embedded. Confirm your inside margin is generous
enough for your page count ([size-and-layout.md](./size-and-layout.md#margins-and-the-gutter)),
and if any interior image runs to the page edge, read the bleed note in
[size-and-layout.md](./size-and-layout.md#bleed).

## Choosing a print service

The two that matter for English-language books:

| Service | Reaches | Cost | Notes |
|---|---|---|---|
| **[Amazon KDP Print](https://kdp.amazon.com)** | Amazon | Free to set up | The easy default; huge reach, but Amazon-centric. |
| **[IngramSpark](https://www.ingramspark.com)** | Bookstores and libraries worldwide | Small per-title fee | The path to non-Amazon retail and library orders. |

Many authors use **both**: KDP for Amazon's reach, IngramSpark for everywhere else.
The same interior and cover files (adjusted to each service's exact template) feed
both. Read each service's file-prep guide before uploading —
[KDP's](https://kdp.amazon.com/help/topic/G201953020),
[IngramSpark's](https://help.ingramspark.com/hc/en-us/categories/360002107591).

## Order a proof copy

**Always order a physical proof and read it before you press publish.** A screen
can't show you ink density, paper feel, a cover that's a few millimeters off, or a
gutter that swallows text on a thick book. Both services offer proof copies (KDP
also has a free digital previewer, but order the real thing at least once). Read it
cover to cover with a pencil. This single step catches the errors that are
expensive to fix after readers have bought the book.

## Pricing

Your **list price** has to cover the **printing cost** (POD charges you per copy,
based on page count, trim, color vs. black-and-white, and paper) plus the retailer's
cut, and leave you a royalty. Each service shows your per-copy print cost and
computes your royalty as you set the price. Price too low and you earn nothing per
sale; too high and readers balk — look at comparable books in your category, and
remember color interiors cost noticeably more to print than black-and-white.

## ISBN

Print books effectively need an **ISBN** to sell through retail. KDP and IngramSpark
can assign one free (tied to that service), or you can buy your own so it's portable
across services. This is a real decision — see
[isbn-and-metadata.md](./isbn-and-metadata.md#isbns).

## Next

- Sort out your [ISBN and metadata](./isbn-and-metadata.md).
- Also publishing digitally? See [ebooks.md](./ebooks.md).
