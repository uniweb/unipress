# Your unipress book project

This folder is a unipress book project. It already contains a small sample book — title, chapters, cover placeholder, colophon — so you can compile it immediately and see what you're working with.

When you're ready to make this folder yours, replace the sample content with your own writing.

## Compile the sample

From this folder's parent directory:

```
unipress compile my-book
```

You'll get a PDF (`my-book.pdf`) next to this folder. Open it. That's your starting point.

To produce a different format:

```
unipress compile my-book --format epub
unipress compile my-book --format docx
unipress compile my-book --format typst   # source bundle for further hand-editing
```

## What's in here

```
my-book/
├── README.md         ← This file. Read first.
├── PUBLISHING.md     ← Notes about publishing your finished book.
├── document.yml      ← Settings: title, author, format, trim, fonts, cover.
├── pages/            ← Your writing. Markdown files, one per chapter.
└── images/           ← Image files used by your book, including the cover.
```

The four files in `pages/` are the sample chapters. They explain what the book template can do as you read through them. Replace them with your own writing when you're ready — keep the structure or change it; it's yours now.

The single file in `images/` is a placeholder cover (`wrap.png`). Replace it with your own artwork when you have it.

`document.yml` holds your project's settings: the title, the author, what format the book compiles to by default, what trim size to use, what fonts. After you run `unipress create`, it has sensible defaults; adjust them as you need.

## Writing in this folder

Each markdown file in `pages/` becomes a chapter of the compiled book. The order is set by the `pages:` list in `document.yml` — add a new file to `pages/` and add its base name (without `.md`) to that list in the order you want it to appear.

If you'd rather rely on filename sorting and let unipress order things alphabetically, drop the explicit `pages:` list from `document.yml` and the framework will read every `.md` file in `pages/` in filename order. Numbering filenames (`01-welcome.md`, `02-formatting.md`, …) is the easiest way to control order; if you want to insert a new chapter between two others, give it a number that sorts between theirs.

## Compile, look, revise

Most of your time will be: edit a chapter, compile, open the PDF, see how it looks, edit again. The book template handles the typography; you focus on the words.

A few things to know about compile:

- It's fast. A short book takes a few seconds.
- It's safe. unipress doesn't change anything in your `pages/` folder.
- It's deterministic. The same content produces the same PDF every time.

If something looks wrong in the output, run `unipress inspect my-book` to see how unipress parsed your content. Most surprises trace back to something the parser interpreted differently than you expected.

## When you're ready to publish

See [`PUBLISHING.md`](./PUBLISHING.md) for notes on what's next after you have a finished book — print-on-demand, ebook distribution, ISBNs, cover requirements, and where to find more help.

## More documentation

- The [unipress README](https://github.com/uniweb/unipress) has the broader picture and command reference.
- `unipress --help` (or just typing it in a terminal) lists every option.
- The book template's settings — trim presets, typography overrides, cover knobs, structure toggles — are documented at the [book template guide](https://github.com/uniweb/unipress/blob/main/docs/templates/book.md) and the [book foundation README](https://github.com/uniweb/unipress/blob/main/foundations/book/README.md).
