# Publishing an ebook

An **ebook** is your book as an [EPUB](https://en.wikipedia.org/wiki/EPUB) file —
the format every major store except Amazon takes directly, and that Amazon accepts
and converts. Unlike a PDF, an EPUB is **reflowable**: the reader's device chooses
the font, the size, and where lines break, so your book adapts to a phone, a
tablet, or a 7-inch e-reader. That's the mental shift — an ebook is your *content*,
not your print *layout*. Trim size, margins, and page breaks don't apply; the cover,
the text, the chapters, and the metadata do.

## Make your EPUB

One command, from your book folder:

```bash
unipress compile . --variant book --format epub --out my-book.epub
```

This uses your final variant, so it picks up your [covers](./covers-and-images.md)
— the front cover becomes the ebook's thumbnail — your chapters, and your title and
author. You get `my-book.epub`, ready to upload.

## Validate before you upload

Stores reject EPUBs that don't meet the standard, and a bad file can fail *after*
you think you've published. Check yours first with **epubcheck**, the official
validator:

- Online: the [EPUBCheck validator](https://www.w3.org/publishing/epubcheck/) (or
  search "epubcheck online").
- A green result means every store will accept the file.

unipress produces valid EPUBs, but validating takes a minute and rules out a whole
category of upload problems — always do it.

## Where to sell it

Two strategies, and many authors use both:

### Direct to each store

Open an account with each retailer and upload your EPUB. More work, but you keep the
larger share and get each store's full tools and reporting.

| Store | Reaches | Sign up |
|---|---|---|
| **Amazon KDP** | Kindle — the largest ebook market | [kdp.amazon.com](https://kdp.amazon.com) |
| **Apple Books** | Apple devices | [authors.apple.com](https://authors.apple.com) |
| **Kobo Writing Life** | Kobo, and libraries via OverDrive | [kobo.com/writinglife](https://www.kobo.com/writinglife) |
| **Google Play Books** | Android and the web | [play.google.com/books/publish](https://play.google.com/books/publish) |

### Through an aggregator

Upload once; the aggregator distributes to many stores and pays you. Less work, and
they take a small cut. The main two:

- **[Draft2Digital](https://draft2digital.com)** — the popular default; reaches
  Apple, Kobo, Barnes & Noble, and more (you can still do Amazon yourself).
- **[Smashwords](https://www.smashwords.com)** — now part of Draft2Digital; broad
  reach including library channels.

A common setup: **KDP directly** (for Amazon's reach and terms) plus an
**aggregator** for everywhere else.

## Pricing and royalties

Each store pays a **royalty** — a percentage of your list price — that depends on
the price you set and the store's terms. Amazon, for example, offers a higher
royalty band for ebooks priced within a middle range and a lower one outside it;
other stores have their own rules. Set your price on each store's dashboard, and
read its current royalty terms there — the numbers change, so trust the store over
any guide (including this one). As a starting point, look at what comparable books
in your category charge.

## A few practical notes

- **Cover thumbnail.** Kindle and most stores want a tall cover of at least
  ~1600 × 2560 px — the same front-cover image unipress already uses. See
  [covers-and-images.md](./covers-and-images.md#size-and-resolution).
- **DRM.** At upload each store asks whether to apply DRM (copy protection). Most
  independent authors publish **DRM-free**; it's your call and it's reversible only
  in one direction, so decide deliberately.
- **ISBN.** An ebook doesn't strictly need one on every store (Amazon issues a free
  internal ID), but some stores prefer or require an ISBN. See
  [isbn-and-metadata.md](./isbn-and-metadata.md).
- **Metadata.** Title, description, categories, and keywords are entered on each
  store, not baked into the file. Getting them right is how readers find you — see
  [isbn-and-metadata.md](./isbn-and-metadata.md#metadata).

## Next

- Also selling in print? See [print.md](./print.md).
- Sort out your [ISBN and metadata](./isbn-and-metadata.md).
