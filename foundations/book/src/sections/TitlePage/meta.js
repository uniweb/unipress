/**
 * TitlePage — institution-shaped front matter.
 *
 * Renders the title page from a single structured payload — title,
 * author, degree, department, institution, year, etc. The default
 * shape supports a UofT-style thesis, but any institution that
 * provides equivalent fields can use this section.
 *
 * Authors set the data via frontmatter, a `thesis:` block in the
 * document's config (`thesis.yml` at the site root), or a `query: thesis`.
 * The monograph template uses frontmatter directly; the thesis template
 * uses thesis.yml for cleaner separation.
 *
 * Compile-side: emits a UofT-shaped title page in LaTeX (no \maketitle
 * — laid out manually for control over centering, vertical position,
 * and copyright line). Typst path mirrors. HTML / pagedjs / epub render
 * a centered prose layout.
 */
export default {
    // The `content.data` key this section reads — one thesis record, when a
    // query fills it. `{}`: no schema.
    data: { thesis: {} },

    defaults: {
        // Override the institutional template hint. 'uoft' is the
        // shipped default; foundations / sites can supply their own
        // string and route on it via params.template.
        template: 'uoft',
    },
}
