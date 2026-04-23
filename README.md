# unipress

Compile a directory of markdown and YAML into a document — `.docx`, `.xlsx`, or PDF — using a [Uniweb](https://uniweb.io) foundation for composition and presentation.

```bash
unipress compile ./my-book      --format pdf  --out book.pdf
unipress compile ./annual-report --format docx --out report.docx
unipress compile ./catalog       --format xlsx --out catalog.xlsx
```

## Status

**Pre-release placeholder.** This package reserves the `unipress` name on npm. The CLI prints help but does not yet compile anything. Watch the [GitHub repository](https://github.com/uniweb/unipress) for the first working release.

If you are looking for the website-building toolchain, install [`uniweb`](https://www.npmjs.com/package/uniweb) instead. unipress is its document-generation sibling.

## What it will do

A unipress project is a content directory — markdown pages, a `document.yml` config, a `theme.yml`, optional `collections/` and `assets/`. No `package.json`, no bundler, no build workflow. Authors ship content; unipress turns it into a single file.

The directory references a Uniweb **foundation** — a published component system that decides what section types exist, how data flows, and how the document is laid out. The same foundation can drive both a website (with `uniweb`) and a downloadable document (with `unipress`).

```bash
unipress create my-doc           # scaffold a starter project
unipress compile my-doc --out doc.docx
```

## Why a separate CLI?

Websites and documents have different lifecycles. Websites are deployed; documents are downloaded. Websites need a dev server, hot reload, routing, and a bundler; documents need a content directory and a binary. `uniweb` handles the first; `unipress` handles the second. Both consume the same foundations.

## License

Apache-2.0 © Proximify
