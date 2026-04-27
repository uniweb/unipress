/**
 * TitlePage — institution-shaped front matter.
 *
 * Renders the title page from a single structured payload — title,
 * author, degree, department, institution, year, etc. The default
 * shape supports a UofT-style thesis, but any institution that
 * provides equivalent fields can use this section.
 *
 * Authors set the data via frontmatter or `data: thesis` to read from
 * a `thesis.yml` collection-style document at the site root. The
 * monograph template uses frontmatter directly; the thesis template
 * uses thesis.yml for cleaner separation.
 *
 * Compile-side: emits a UofT-shaped title page in LaTeX (no \maketitle
 * — laid out manually for control over centering, vertical position,
 * and copyright line). Typst path mirrors. HTML / pagedjs / epub render
 * a centered prose layout.
 */
export default {
    defaults: {
        // When set, read structured data from website.config.thesis
        // or content.data[<dataName>]. Otherwise use the section's
        // own frontmatter (title, subtitle, author, etc.).
        data: 'thesis',
        // Override the institutional template hint. 'uoft' is the
        // shipped default; foundations / sites can supply their own
        // string and route on it via params.template.
        template: 'uoft',
    },
}
