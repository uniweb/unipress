/**
 * Appendix — chapter-shaped section, but enumerated A/B/C rather than
 * 1/2/3. LaTeX's \\appendix command switches the chapter counter to
 * alphabetic for everything that follows; subsequent Appendix sections
 * just use \\chapter and pick up the alphabetic numbering automatically.
 */
export default {
    defaults: {
        // First Appendix in a document emits \appendix before \chapter
        // to switch the counter; subsequent Appendix sections in the
        // same document don't re-emit it. The runtime detects the first
        // one by walking the website's section list — we expose
        // `auto` here so authors can override (force first / force
        // not-first) when nesting goes weird.
        auto: true,
    },
}
