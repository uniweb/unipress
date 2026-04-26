# `data-report` template

A data-driven report aggregating metrics across a set of records (members, publications, funding, supervisions). Pinned to `@uniweb/data` — outputs both an Excel workbook (one sheet per section) and a Word report.

```bash
unipress compile . --format xlsx --out my-report.xlsx
unipress compile . --format docx --out my-report.docx
```

## What's here

```
data-report/
├── document.yml          pinned to @uniweb/data
├── theme.yml
├── collections/
│   ├── members/          three sample records (19th-century naturalists)
│   └── queries/          saved query examples
└── content/
    └── report/           cover, members, publications-by-*, funding, supervisions
```

The starter ships three sample members (Darwin, Lyell, Wallace) so the first compile produces a non-empty workbook. Replace the YAML files under `collections/members/` with your own data — the foundation reads any record matching the queryable schema declared in `document.yml`.

## Customize

### Add a member

Drop a YAML file under `collections/members/`:

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

The Cover section's Loom expressions (`{COUNT OF members}`, `{totalPublications}`, etc.) update automatically.

### Filter the active selection

Edit `document.yml`'s `collections.members.queryable:` to declare the filterable fields you want exposed in the FilterPanel UI. Each field becomes a control; `enum` fields render as multi-select, `boolean` as toggles, `range` as numeric range inputs.

### Switch from static files to a backend

When the data outgrows the YAML files (`/data/members.json`-shaped backed by `collections/members/`), declare a backend fetcher:

```yaml
collections:
  members:
    path: collections/members
    fetcher:
      url: https://api.example.com/members
      supports: [where, limit, sort]
```

`supports: [where]` ships the active where-object to the backend; the same foundation code, same components, same compile output — what changed is *where the predicate runs*.
