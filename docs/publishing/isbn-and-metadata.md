# ISBNs and metadata

The last mile of publishing isn't about your book's pages — it's about the
information *around* it: the identifier stores file it under, and the title,
description, and categories that help readers find it.

## ISBNs

An **ISBN** is the book industry's identifier — the number behind the barcode.
Retailers and libraries use it to order and track your book.

A few things to know:

- **Each format needs its own ISBN.** Your paperback, your hardcover, and your
  ebook are three products and get three different ISBNs. (You don't need one for a
  PDF you only sell direct.)
- **You can get them free — with a catch.** KDP and IngramSpark will assign a free
  ISBN, but it's **tied to that service** — you can't take it elsewhere, and that
  service is listed as the publisher of record.
- **Or you can own them.** Buy your own from your country's ISBN agency and they're
  **portable** across every service, with you as the publisher. In the **United
  States** that's [Bowker](https://www.myidentifiers.com) (paid, usually cheaper in
  blocks of 10). Many other countries issue them free or cheaply through a national
  agency — search "ISBN" plus your country to find yours.

**Which to choose?** Owning your ISBN gives you flexibility and a cleaner
publisher record; the free option saves money. Many first-time authors start with
the free ISBNs and buy their own later. If you plan to sell the same edition across
multiple services, owning one avoids being locked to a single store.

### Where the ISBN goes

Once you have it, put it in your book's config so it prints on the copyright page:

```yaml
book:
  isbn: "978-0-000000-0-0"
  rights: "© 2026 Your Name. All rights reserved."
  publisher: "Your Imprint"
```

You'll *also* enter the ISBN on each store's dashboard when you upload — the
copyright page shows it to readers; the store record makes it orderable.

## Metadata

Metadata is everything a store knows about your book besides the file itself. It's
entered on each store's dashboard (not baked into the EPUB or PDF), and it's how
readers discover you. Worth real thought:

- **Title and subtitle** — exact and consistent across stores. A subtitle is prime
  search real estate for nonfiction.
- **Description / blurb** — your sales pitch. The first sentence has to earn the
  second. Write it for a browsing reader, not a summary.
- **Categories (BISAC).** Stores classify books with
  [BISAC subject codes](https://www.bisg.org/complete-bisac-subject-headings-list).
  Pick the most specific categories that fit — a smaller, accurate category is
  easier to rank in than a giant vague one.
- **Keywords** — the search terms a reader would type. Concrete beats clever.
- **Author name** — consistent everywhere, so all your books group under one author
  page.

unipress carries a few of these into the book's own pages —
`book.title`, `book.subtitle`, `book.author`, `book.description`, `book.subject` —
but the store dashboards are the authoritative place for discovery metadata. Fill
them in carefully; they do more for sales than almost anything else in this guide.

## The copyright page

The imprint page on the back of the title page. Turn it on with
`book.structure.copyrightPage: true`, and it's built from your config:

```yaml
book:
  rights: "© 2026 Your Name. All rights reserved."
  publisher: "Your Imprint"
  isbn: "978-0-000000-0-0"
  structure:
    copyrightPage: true
```

A typical copyright page carries the copyright notice, a rights statement, the
edition/printing, the ISBN, and the publisher or imprint. If you're unsure what to
put, open a few books from your shelf in the same genre and follow their lead —
conventions vary by market and you can match yours.

## Next

- Back to the [overview and checklist](./README.md#before-you-publish--a-checklist).
- Make your [ebook](./ebooks.md) or [print](./print.md) files.
