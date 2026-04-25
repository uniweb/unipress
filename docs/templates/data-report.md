# `data-report`

An aggregate metrics report — counts, totals, and breakdowns across a set of records (members, publications, funding, supervisions). Pinned to `@uniweb/data`. Outputs a downloadable Excel workbook (one sheet per section) and a Word report.

## Scaffold

```bash
unipress create q3-metrics --template data-report --title "Q3 Metrics" --author "Research Office"
cd q3-metrics
unipress compile . --format xlsx --out q3-metrics.xlsx
unipress compile . --format docx --out q3-metrics.docx
```

## What you get

```
q3-metrics/
├── document.yml          pinned to @uniweb/data@<version>
├── theme.yml             colors + typography for the web preview
├── collections/
│   ├── members/          three sample records (19th-century naturalists)
│   └── queries/          saved query examples for the Population dropdown
└── pages/
    └── report/           cover, members, publications-by-{type,journal,year},
                          publications-list, funding, supervisions
```

The starter ships three sample members so the first compile produces a non-empty workbook. Replace the YAML files under `collections/members/` with your own data.

## `document.yml` fields

| Field                      | Purpose                                                |
|----------------------------|--------------------------------------------------------|
| `name`, `author`, `year`   | Workbook metadata (shown in the file's properties).    |
| `format`                   | `xlsx` (default) or `docx`. Override on the CLI.       |
| `index`                    | Routes `/` → `pages/<index>` (here: `report`).         |
| `collections.members.path` | Where the records live (default `collections/members`).|
| `collections.members.queryable` | Filterable surface — drives the FilterPanel UI.   |
| `collections.queries.path` | Saved-view dropdown (Population selector).             |

## Add a member

```yaml
# collections/members/your-name.yml
name: "Jane Doe"
department: biology
rank: professor
tenured: true
start_year: 2018
publications:
  - { type: article, title: "...", year: 2024, journal: "...", doi: "..." }
funding:
  - { title: "...", amount: 250000, year: 2023, source: "..." }
supervisions:
  - { name: "...", level: PhD, year: 2024 }
```

The Cover section's Loom expressions (`{COUNT OF members}`, `{totalPublications}`, etc.) update automatically. The downstream sections (PublicationsByType, Funding, Supervisions, …) read from the same records.

## Filter the active selection

`document.yml`'s `collections.members.queryable:` block declares the filterable fields exposed in the FilterPanel UI:

- `enum` → multi-select dropdown.
- `boolean` → toggle.
- `range` → numeric range input.

The framework's transport-aware fetcher decides where the active where-object runs:

- `fetcher.supports: []` (default; static `/data/members.json`) — predicates evaluated in JS, multiple sections share one cached fetch.
- `fetcher.supports: [where]` — predicate ships with the request, backend returns only matching records.

Same author code, same components, same compile output. Switching modes is one block in `document.yml`.

## When to pick `data-report` over `directory`

- You want sections broken out by axis (publications by year, funding totals, supervision counts).
- The data has nested structure (each member has publications, funding, supervisions arrays).
- The audience expects a multi-section report rather than a flat listing.

For a flat records listing, use `directory` instead.

## Foundation reference

`@uniweb/data` — see the foundation's README: `framework/unipress/foundations/data/README.md`.
