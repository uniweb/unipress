/**
 * BookLayout — the frame for a book site.
 *
 * Wraps the page body in <DocumentProvider> so each rendered section can
 * register a Typst fragment via useDocumentOutput. Includes a floating
 * DownloadButton that compiles the whole book to a Typst sources bundle.
 *
 * In Phase 1 the download is limited to the currently active page — the
 * registration store lives inside a single DocumentProvider and sections
 * register during render. A whole-book download requires all chapters to
 * be mounted concurrently; that's a Phase-2 concern (SSG prerender collects
 * everything, or a dedicated "compile all" route renders every page into
 * one provider).
 *
 * Sites using this layout can choose between:
 *   - Per-page downloads: one chapter's Typst source at a time (current default).
 *   - Whole-book downloads: the user builds via `pnpm book:compile` script
 *     (scripts/framework/compile-book.js) while in-browser support is Phase 2.
 */
import React from 'react'
import { useWebsite } from '@uniweb/kit'
import { DocumentProvider, useDocumentOutput } from '@uniweb/press'
import DownloadButton from '#components/DownloadButton.jsx'
import ChapterNav from '#components/ChapterNav.jsx'
import HashScroller from '#components/HashScroller.jsx'
import { buildBookMeta } from '../../compile-options.js'

/**
 * Registers document-level metadata (title, author, …) under the
 * 'html' input key so Press's HTML-based adapters (pagedjs, future
 * EPUB) see it during on-page compile.
 *
 * The typst path does NOT need this registration — the foundation's
 * outputs.typst.getOptions supplies meta as adapterOptions directly,
 * so compileDocument flows it through on both the browser and headless
 * code paths without any per-page component rendering it.
 */
function BookMetadata({ website }) {
  const metadata = buildBookMeta(website)
  useDocumentOutput(website, 'html', metadata, { role: 'metadata' })
  return null
}

export default function BookLayout({ body, page, website: websiteProp }) {
  // The runtime passes `website` into the layout, but useWebsite is the
  // idiomatic way to access it (handles edge cases).
  const websiteCtx = useWebsite()
  const website = websiteProp || websiteCtx?.website

  const rawTitle = website?.config?.book?.title || website?.config?.name || 'Book'
  // Base name only; DownloadButton appends the extension per mode.
  const filename = toFilename(rawTitle, page?.slug)

  return (
    <DocumentProvider basePath={website?.basePath}>
      <BookMetadata website={website} />
      <HashScroller />
      <div className="book-frame min-h-screen bg-surface text-body">
        <main className="book-body">
          {body}
          <ChapterNav />
        </main>
      </div>
      <DownloadButton filename={filename} />
    </DocumentProvider>
  )
}

function toFilename(title, slug) {
  const base = (title || slug || 'book')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug ? `${base}-${slug}` : base
}
