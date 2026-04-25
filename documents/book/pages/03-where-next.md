# Where to Go from Here

You've seen what a unipress book looks like. The next steps depend on what you're working on.

If you're starting a new book, replace the contents of these chapter files with your own writing. Adjust the title and author in `document.yml`. Add or remove chapters as your book takes shape.

If you want a different look — a different page size, different fonts, a different cover treatment — open `document.yml` and look at the settings the book template exposes. Most visual aspects are configurable without leaving the template.

If you have your own cover artwork, replace `images/front.png` and `images/back.png` with your own files. The template will use yours instead of the placeholders.

If the book template isn't quite right for what you're writing — if you're producing an academic monograph, a thesis, a paper, or a report — try one of the other templates. Run `unipress list-templates` to see what's available.

If you want to take the typesetting further than the template allows, ask unipress for the Typst source: `unipress compile --format typst`. You'll get a folder of source files you can take into Typst directly, customize without limit, and compile yourself.

When you're ready to share your book, the formats are at your disposal: PDF for printing or sharing, EPUB for ebook readers, Word for committees and collaborators. One source, many outputs.

When you're ready to publish — to find readers, to put your book in stores or libraries — see the project's `PUBLISHING.md` for notes on what's next.

That's the tour. The blank chapters above this one are waiting for your own writing.
