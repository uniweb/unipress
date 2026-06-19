# Writing your article

Replace this file with your own writing, or split it into several files —
`03-results.md`, `04-discussion.md`, and so on. Each one becomes a section
in reading order.

## Headings and structure

Use `##` for section headings within a file and `###` for subsections. They
render as clean, unnumbered headings — no "Chapter 1", no page break before
each one. The document reads as one continuous piece.

### A worked example

Lists, quotes, and code all behave the way you'd expect:

- A first point, stated plainly.
- A second point, with a bit more detail.
- A third, to round things out.

> A blockquote sets a passage apart — useful for an epigraph, a pulled
> quote, or a definition you want to dwell on.

```python
def measure(text):
    """Roughly 75 characters per line is a comfortable measure."""
    return sum(len(line) for line in text.splitlines())
```

## Math

Inline math like $E = mc^2$ sits in the run of text, and displayed
equations stand on their own line:

$$
\int_{0}^{\infty} e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}
$$

## Switching to a book

If your writing grows chapters — and wants a title page, a table of
contents, and a smaller trim — it's one foundation, two genres. Remove
`kind: article` from `document.yml` (and set a book trim), or start fresh
with `unipress create my-book --template book`.
