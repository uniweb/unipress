# `invoice` document template

A self-contained worked invoice for the [`@uniweb/business-docs`](../../foundations/business-docs/)
foundation. Demonstrates a multi-line subscription bill referencing a
signed statement of work in the same project.

## Compile

```bash
unipress compile . --format docx --out invoice-0001.docx
unipress compile . --format pagedjs --out invoice-0001.html
```

`--format docx` produces a Word file directly. `--format pagedjs`
produces a Paged.js-wired HTML — open it in a browser and use the
browser's Print → Save as PDF for the printable artifact. (A native
PDF output via Paged.js or Typst is on the v2 roadmap; today's
unipress hardcodes `pdf → typst`, and `@uniweb/business-docs` doesn't
ship a Typst path.)

## Layout

```
invoice/
├── document.yml.hbs       # vendor + defaults + foundation reference
├── collections/
│   ├── sows/sow0001.yml   # signed SOW the invoice bills against
│   └── invoices/0001.yml  # the multi-line subscription invoice
└── content/invoice/
    ├── page.yml           # fetches both collections so cross-record validation runs
    ├── 01-cover.md        # invoice header (vendor, client, dates, period)
    ├── 02-line-items.md   # source: items — divider-split table body
    ├── 03-totals.md       # uses computed {subtotal}, {tax_amount}, {total}
    └── 04-payment.md      # remit instructions
```

## Loom in this template

`SHOW` is the default verb. `{number}` is the same as `{SHOW number}`.
Reserve explicit verbs for cases that need them:

- `{SHOW tax_amount IF tax_amount}` — render the tax amount only when
  it's > 0. The `IF` returns empty when falsy, leaving the surrounding
  table cell blank without breaking column structure.
- `{SHOW period.from IF period} – {SHOW period.to IF period}` — render
  the period column only when the line carries one.
- `{* qty unit_price}` — Compact-form arithmetic for the per-line
  amount (mixed Plain and Compact in the same template is fine).

The `{subtotal}`, `{tax_amount}`, `{tax_rate}`, `{tax_label}`, and
`{total}` placeholders are computed by the foundation handler before the
totals slice renders, so the slice itself stays declarative.

## Customization

Swap `business_docs.vendor` in `document.yml.hbs` for your real vendor
identity, set `defaults.tax_jurisdiction` to a registry key the
foundation ships with (`HST`, `GST`, `PST`, `QST`, `VAT`) or extend the
registry via `business_docs.registries.tax:`. Add invoices by dropping
new files into `collections/invoices/` and re-running compile.
