# Findings

The body of the report. Replace this content with the substance of what you measured, observed, or analyzed. Each subsection is one finding; lead with the conclusion and follow with the evidence.

## Finding one

A finding is a claim plus a justification. State the claim in the heading or the first sentence; let the rest of the paragraph carry the evidence.

The numbers you cite should be reproducible. Where they came from, what time window they cover, and how you computed them should be obvious to a reader six months from now who finds the report and has lost the original spreadsheet.

```js
// A short, runnable code listing.
const median = (xs) =>
  xs.sort((a, b) => a - b)[Math.floor(xs.length / 2)]
```

The `codeMarginRelief: 0.25in` setting in `document.yml` lets code blocks extend 0.25in past the body column on each side. For wide listings — long config files, full SQL queries, JSON snapshots — that extra room means lines don't wrap mid-statement.

## Finding two

A second finding, with its own claim and its own evidence. Keep the structure consistent across findings so the reader builds an expectation about how each section is going to be organized.

> A pull-quote or block quotation can break up a long stretch of body text and signal that what follows deserves extra attention.

## Finding three

The third typically points the reader toward whatever comes next — the methodology section that explains how the findings were obtained, an appendix with the raw data, or a follow-up report.
