# @uniweb/data

A Uniweb foundation for structured-data documents. Aggregates collections of records (members, publications, funding, supervisions, …) and emits Excel workbooks and Word reports alongside a web preview. Pairs with `@uniweb/press` for the document outputs and `@uniweb/loom` for inline content expressions. Drives the `data-report` and `directory` templates in `@uniweb/unipress`.

## Shape

**Default layout:** `MetricsLayout` — wraps the page body in Press's `<DocumentProvider>`, exposes a download bar with format-specific options, and a filter panel for the queryable surface declared on collections in `document.yml`.

**Sections shipped:**

- `Cover` — title page with Loom-driven aggregate stats (counts, totals, member roster).
- `Members` — roster table; one row per member with summary metrics.
- `PublicationsByType` — grouping by publication type (article, chapter, book, …).
- `PublicationsByJournal` — grouping by venue.
- `PublicationsByYear` — grouping by year.
- `PublicationsList` — flat list with full citation formatting via `citestyle`.
- `Funding` — grants table with totals.
- `Supervisions` — student supervisions table.

Each section calls `useDocumentOutput(block, 'xlsx', …)` and `useDocumentOutput(block, 'docx', …)` to register per-section sheets / paragraphs with Press; document-level workbook metadata + paragraph-style packs are assembled in `src/compile-options.js`.

## Outputs

| Format | Adapter | Notes |
|--------|---------|-------|
| `xlsx` | xlsx    | Excel workbook; one sheet per section. |
| `docx` | docx    | Word report; flowing paragraphs + inline tables. |

## Loom integration

The Cover section's markdown body uses `@uniweb/loom` expressions — e.g., `{COUNT OF members}`, `{SHOW members.name JOINED BY ', '}`, `{totalPublications}`, `{totalFunding}`. The foundation registers `createLoomHandlers({ engine, vars })`; Loom runs during the content-handler pass so every component below receives fully resolved content.

The handler's `vars` extractor exposes the members collection plus a few precomputed totals — unit-wide numbers, not filtered by the active selection. This contrasts on screen with the per-selection numbers shown by sections that call `useFilteredMembers` (see `src/components/query-context.jsx`).

## Filtering: framework decides where the predicate runs

This foundation does NOT filter members itself. Sections that show the active population call `useFilteredMembers` — a thin hook over `@uniweb/kit`'s `useFetched` — passing the active where-object as part of the request.

The framework decides whether to ship that where-object to the source or evaluate it locally based on the site's `fetcher.supports:` declaration:

- `supports: []` (default; static `/data/members.json`) — framework fetches once and applies the predicate in JS. Multiple sections share one cached fetch.
- `supports: [where]` (real backend) — the predicate ships in the request; the backend returns only matching records.

Same author code, same foundation code, same components. Switching modes is one block in `document.yml` / `site.yml`.

## Wiring into a document

```yaml
# document.yml
foundation: '@uniweb/data@0.1.0'
format: xlsx

collections:
  members:
    path: collections/members
    queryable:
      department:
        type: enum
        label: Department
```

The `data-report` and `directory` templates in `@uniweb/unipress` ship a complete starter scaffold including sample collections, `theme.yml`, and a configured filter surface.

## Theme variables

```yaml
# theme.yml
vars:
  max-content-width: 72rem        # wider than a book; tables need room
  section-padding-y: clamp(2rem, 4vw, 4rem)
  report-gap: clamp(2rem, 4vw, 4rem)
```

## See also

- `framework/press/docs/concepts.md` — Press's adapter model.
- `framework/loom/` — Loom expression syntax.
- `framework/unipress/` — the CLI that compiles author-supplied content directories using this foundation.
