# `directory`

A simple records listing — a faculty directory, an alumni list, an item catalog. Pinned to `@uniweb/data`. Outputs an Excel workbook (one sheet, one row per record) or a Word listing.

## Scaffold

```bash
unipress create faculty --template directory --title "Faculty Directory" --author "Dean's Office"
cd faculty
unipress compile . --format xlsx --out faculty.xlsx
```

## What you get

```
faculty/
├── document.yml          pinned to @uniweb/data@<version>; one queryable collection
├── collections/
│   └── members/          three sample records
└── pages/
    └── directory/        cover (Loom-rendered count) + listing
```

## `document.yml` fields

| Field                       | Purpose                                                |
|-----------------------------|--------------------------------------------------------|
| `name`                      | Workbook title.                                        |
| `format`                    | `xlsx` (default) or `docx`.                            |
| `index`                     | Routes `/` → `pages/directory`.                        |
| `collections.members.path`  | Where the records live (`collections/members`).        |
| `collections.members.queryable` | Filterable fields — drives the FilterPanel UI.    |

## Add an entry

Drop a YAML file under `collections/members/`. Filename (stem) becomes the slug:

```yaml
# collections/members/your-name.yml
name: "Your Name"
role: member          # or lead / advisor
department: sciences  # or engineering / humanities
active: true
email: you@example.org
joined_year: 2024
```

## Adjust the queryable fields

The fields exposed in the FilterPanel UI come from `document.yml`'s `collections.members.queryable:` block. Each field becomes a control:

- `enum` → multi-select dropdown.
- `boolean` → toggle.
- `range` → numeric range input.
- `text` → search box (substring match).

Add a `joined_year:` range field, for example, if filtering by start year matters for your directory.

## Hand-pick the displayed columns

The Members section reads every key from each record by default. To restrict the columns shown in the web preview and the xlsx export, set `columns:` on the section frontmatter in `pages/directory/members.md`.

## When to pick `directory` over `data-report`

- The data is one flat collection of records (faculty, members, alumni, items).
- You want a single listing, not aggregate metrics broken out by axis.
- Filterability + a tabular export is the entire point.

For multi-section aggregate reports (publications-by-year, funding totals, supervision counts), use `data-report`.

## Foundation reference

`@uniweb/data` — see the foundation's README: `framework/unipress/foundations/data/README.md`.
