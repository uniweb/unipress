# @uniweb/business-docs

A Uniweb foundation for **statements of work, invoices, and engagement
reports**.

The same source ships in three forms:

| Surface | Use it for |
|---|---|
| **Foundation** (`@uniweb/business-docs`) | Hosted as a federated module on GitHub Pages; loaded by both unipress documents and uniweb sites. |
| **Unipress doc template** (`unipress new --template invoice`) | One worked invoice + the SOW it bills against; compiles to PDF and DOCX. |
| **Uniweb site template** (`uniweb create --template business-docs`) | A complete site: list of invoices, list of SOWs, per-record preview, filtered report page with XLSX export. |

## What it provides

Three section types under `src/sections/`:

- **`SOW`** — a slice of a statement-of-work document (cover, scope,
  deliverables, fees, terms, signatures). Generic: title + paragraphs +
  items + insets, with an optional `source: <field>` to iterate over an
  array (deliverables, signatures).
- **`Invoice`** — a slice of an invoice document (cover, line items,
  totals, payment instructions). The Loom namespace exposes
  `{subtotal}`, `{tax_amount}`, `{tax_rate}`, `{tax_label}`, `{total}` so
  the totals slice renders with plain placeholders.
- **`EngagementReport`** — aggregate view across a collection of
  invoices or SOWs. Filterable by date range, client, and status; the
  active selection drives both the on-screen table and the XLSX export.

## Site / document configuration

Vendor identity, default currency, default tax jurisdiction, and locale
formatting live at the site or document level:

```yaml
business_docs:
  vendor:
    organization: Acme Studios
    contact: First Last
    email: billing@acme.example
    address: |
      123 Example Street
      City, Region 00000
  defaults:
    currency: CAD
    locale: en-CA
    tax_jurisdiction: HST
    payment_terms_days: 30
  registries:
    tax:
      VAT-EU: { rate: 0.20, label: VAT }   # optional override / extension
```

`registries.tax` is shallow-merged on top of the foundation's built-in
registry (`HST`, `GST`, `PST`, `QST`, `VAT`, `NONE`), so authors only
declare jurisdictions the foundation doesn't ship with.

## Loom usage in markdown

Loom expressions resolve against a namespace built from the active
record plus the site/document `business_docs` config:

```markdown
# Invoice {number}

Bill to: {client.organization}
Issued: {issued}
Due: {due}

Subtotal: {subtotal}
Tax ({tax_label}): {tax_amount}
**Total: {total}**
```

`SHOW` is the default verb — `{number}` is identical to `{SHOW number}`.
Reserve explicit verbs (`SHOW WHERE`, `COUNT OF`, `TOTAL OF`, `IF`) for
cases that need them. See `framework/loom/docs/` for the Loom reference.

## Cross-record validation

Every invoice may carry an `sow_ref:` linking it to the SOW it bills
against. The foundation's content handler runs cross-record validation
when both collections are in scope, with severity that depends on the
invoice's own status. Findings are logged to console; the build does
not fail on validation alone. See
`src/utils/validate-cross-refs.js` for the rules.

## Versioning and archival

Every record (SOW or invoice) carries
`foundation_version: '@uniweb/business-docs@<semver>'`. A signed PDF
committed alongside the YAML is the authoritative legal record; the
YAML + foundation version + compiler reproduce that artifact
deterministically. Recompilation against a newer foundation should be
explicit — bump the record's `foundation_version:` only when re-signing.

## License

Apache-2.0.
