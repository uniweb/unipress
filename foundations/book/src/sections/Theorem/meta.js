/**
 * Theorem — labeled math-style environment.
 *
 * The body of the section becomes the theorem statement. The id
 * (frontmatter id: thm-foo, or the section's xref label {#thm-foo})
 * flows through to LaTeX's \\label{} so [#thm-foo] cross-refs work.
 *
 * The optional `name` param renders as a parenthetical after the label —
 * "Theorem 3 (Pythagoras)".
 */
export default {
    defaults: {
        // Optional theorem name — "(Pythagoras)" / "(Cook–Levin)".
        name: null,
        // Override the default id prefix used to classify the section
        // as kind=theorem in the xref-registry. Foundation declares
        // prefix=`thm`; documents that prefer a different prefix can
        // set this and the section still classifies correctly.
        idPrefix: null,
    },
}
