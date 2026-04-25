# Publishing your book

Once you have a finished book — the writing done, the cover artwork in place, a PDF or EPUB you're proud of — there's still a stretch of work between your folder and a reader. This file is a map of that stretch.

unipress produces the files. What you do with them is up to you. These are notes on the most common paths.

## What you'll need

You'll typically end up needing some or all of these:

- **A print-ready PDF** for physical books. unipress produces this with `--format pdf`.
- **An EPUB** for ebook stores. unipress produces this with `--format epub`.
- **A cover image** that meets the requirements of wherever you're publishing — different platforms want different sizes, color profiles, and layouts. The placeholder in `images/` works for testing but should be replaced before real publication.
- **An ISBN**, in most cases. More on this below.
- **Metadata**: title, subtitle, author, description, categories, keywords. You'll fill these in on the publishing platform; most aren't part of unipress.

## Print-on-demand

Print-on-demand (POD) services print and ship your book one copy at a time as readers buy it. You don't hold inventory. The two main ones for English-language books:

**[Kindle Direct Publishing (KDP)](https://kdp.amazon.com)** is Amazon's service. Free to set up; ships via Amazon. The most popular path for self-publishing fiction and many nonfiction books. Their submission requirements include specific PDF settings (bleed, trim size, color profile); read their [print formatting guide](https://kdp.amazon.com/help/topic/G201953020) before submitting.

**[IngramSpark](https://www.ingramspark.com)** distributes to bookstores and libraries beyond Amazon — the path you want if you care about non-Amazon retail. There's a small per-title setup fee. Their [file creation guide](https://help.ingramspark.com/hc/en-us/categories/360002107591-File-Creation) covers what they need.

Most authors who publish in print use both: KDP for Amazon's reach, IngramSpark for everywhere else. The same source files (with adjustments for each service's requirements) feed both.

A note on cover artwork for print: print covers are wrap-around (front + spine + back as a single image) with bleed extending past the trim line. The width of the spine depends on your book's page count and paper. Each POD service has a cover template generator that gives you the exact dimensions for your specific book — use it. The placeholder cover file in `images/` won't satisfy this; you'll need a real wrap-around cover before printing.

## Ebook distribution

For ebooks, you have two strategies:

**Direct distribution to each major store.** Set up accounts with KDP (for Kindle), [Apple Books](https://authors.apple.com), [Kobo Writing Life](https://www.kobo.com/writinglife), and [Google Play Books](https://play.google.com/books/publish). Upload your EPUB to each. More work; you keep more of the royalty.

**Aggregator distribution.** Services like [Draft2Digital](https://draft2digital.com) and [Smashwords](https://www.smashwords.com) take your EPUB once and distribute it to multiple stores. Less work; they take a small cut. Common choice for first-time authors.

Either way, your EPUB needs to pass validation. The free [EPUB Validator](https://validator.idpf.org) (also called epubcheck) tells you whether your file meets the EPUB standard. unipress produces valid EPUBs, but if you've heavily customized your foundation or included unusual content, validate before submitting.

## ISBNs

ISBNs are the book industry's identifiers. Each format of your book (paperback, hardcover, ebook) gets a different ISBN.

You generally need an ISBN if you want to sell your book through retail bookstores or libraries. KDP will give you a free ISBN for ebooks and paperbacks sold through Amazon, but those ISBNs are tied to KDP — you can't use them elsewhere.

If you want an ISBN you fully own, you buy one (or a block) from your country's ISBN agency:

- **United States**: [Bowker](https://www.myidentifiers.com)
- **Canada, UK, Australia, and many other countries**: ISBNs are free or low-cost from your national agency. Search "ISBN [your country]" to find the right one.

Whether to buy your own ISBNs or use the free ones from KDP is a personal decision. Owning your ISBN gives you flexibility; the free option saves money. Many first-time authors start with the free ones and switch later.

## Cover artwork: a real one

The placeholder cover in `images/` exists to make the sample book compile correctly. Before you publish — to anywhere — replace it with real artwork.

Real cover artwork is its own discipline. A few realistic options:

- **Hire a designer.** Sites like [Reedsy](https://reedsy.com), [99designs](https://99designs.com), and [Fiverr](https://www.fiverr.com) connect you with cover designers across a wide range of budgets. Expect $200–$2,000 for professional work, depending on the designer's experience.
- **Use a cover-design tool.** Canva, Adobe Express, and similar tools have book-cover templates. Cheaper; takes longer; results vary with your design skill.
- **Make your own** if you have the skills. The placeholder dimensions in `images/` are a reasonable starting point; check the requirements of your target POD service for the exact specifications.

Whatever path you take, your cover artwork has to meet the size, resolution, and bleed requirements of wherever you're publishing. KDP's print covers and Amazon's ebook thumbnails have different requirements than IngramSpark's. Your cover designer will know; if you're going alone, read each platform's specifications carefully.

## Where to learn more

Self-publishing is a wide subject. A few resources worth knowing about:

- **[Reedsy Learning](https://blog.reedsy.com)** publishes free guides on every aspect of self-publishing — writing, editing, design, marketing. Substantial and well-maintained.
- **[The Alliance of Independent Authors](https://www.allianceindependentauthors.org)** is a professional association with member resources, watchdog reports on dishonest services, and the [Self-Publishing Advice blog](https://selfpublishingadvice.org).
- **[Writer Beware](https://writerbeware.blog)** tracks scams and bad actors targeting writers. Worth bookmarking before you sign anything.
- **[Jane Friedman's blog](https://www.janefriedman.com/blog/)** is one of the more thoughtful long-running publishing-industry blogs from someone genuinely independent.

## What unipress does and doesn't do

unipress produces the files: PDF, EPUB, Word document, spreadsheet. That's the technical handoff.

unipress doesn't:

- Submit your book to publishers or platforms. You upload your files yourself.
- Generate ISBNs. You acquire them yourself.
- Design your cover. You design it (or hire someone to).
- Edit your prose. You edit it (or hire an editor).
- Market your book. That's a whole separate craft.

The work between your folder and a reader is mostly outside unipress. unipress just makes sure the files at the start of that journey are real, professional, and ready.

Good luck.
