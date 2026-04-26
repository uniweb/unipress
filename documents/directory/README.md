# `directory` template

A simple records-listing — a faculty directory, an alumni list, an item catalog. Pinned to `@uniweb/data`. Outputs an Excel workbook (one sheet, one row per record) or a Word listing.

```bash
unipress compile . --format xlsx --out my-directory.xlsx
unipress compile . --format docx --out my-directory.docx
```

## What's here

```
directory/
├── document.yml          pinned to @uniweb/data; one queryable collection
├── collections/
│   └── members/          three sample records to make the first compile non-empty
└── content/
    └── directory/        cover (with Loom-rendered count) + listing
```

The starter ships three sample entries; replace them with your own YAML files.

## When to pick `directory` over `data-report`

- The data is one flat collection of records (faculty, members, alumni, items).
- You want a single listing, not aggregate metrics broken out by axis.
- Filterability + a tabular export is the entire point.

For multi-section aggregate reports (publications-by-year, funding totals, supervision counts), use `data-report`.

## Customize

### Add an entry

Drop a YAML file under `collections/members/`. Each file is one record; the filename (stem) becomes its slug.

```yaml
# collections/members/your-name.yml
name: "Your Name"
role: member          # or lead / advisor
department: sciences  # or engineering / humanities
active: true
email: you@example.org
joined_year: 2024
```

### Adjust the queryable fields

The fields exposed in the FilterPanel UI come from `document.yml`'s `collections.members.queryable:` block. Each field becomes a control:

- `enum` → multi-select dropdown.
- `boolean` → toggle.
- `range` → numeric range input.
- `text` → search box (substring match).

Add `joined_year:` as a `range` field, for example, if filtering by start year matters for your directory.

### Hand-pick the displayed columns

The Members section reads every key from each record by default. To restrict the columns shown in the web preview and the xlsx export, set `columns:` on the section frontmatter in `content/directory/members.md`.
