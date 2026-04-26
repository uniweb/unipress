/**
 * Cite — inline citation. Resolves a bibliography key to a style-correct
 * citation form for the current document.
 *
 * Authors normally reach this through the cite sugar — `[@key]{k=v}` —
 * which content-reader desugars to an inline inset_ref with
 * component: 'Cite' and embedKind: 'text'. The direct framework form
 * `[text](@Cite){k=v}` is also supported.
 *
 * Param shape (read at the call site, not declared in meta — matches
 * neighbouring meta.js conventions in this foundation):
 *   key            — bibliography entry id (or `a;b;...` for multi-cite).
 *   page           — page locator (shorthand for `locator: <p>, label: page`).
 *   locator        — generic locator value.
 *   label          — locator kind (page / chapter / section / paragraph).
 *   suppress-author — boolean; emit year-only output for "Author (1859, 42)" prose.
 */
export default {
  inset: true,
  defaults: {
    label: 'page',
  },
}
