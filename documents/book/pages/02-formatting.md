# What the Template Can Do

This chapter exercises the formatting features the book template supports. You can keep it around as a reference while you work, or delete it once you've seen what's here.

## Headings

A first-level heading like the one above starts a new chapter. Second-level headings like this one mark sections within a chapter. Third-level headings exist if you need them, but most books don't.

## Emphasis and quotation

Body text can be *italic* or **bold** or even ***both at once***. You can mark technical terms in `monospace`, which the template renders in a slightly smaller size to keep them from disrupting the line.

For longer quotations, blockquotes pull away from the body:

> The book template treats quotations as a separate visual register, not just indented prose. The result is that a long passage of someone else's words looks like quotation, not like a paragraph that wandered off-margin.

That's the kind of detail typography handles for you.

## Lists

Numbered lists are useful when order matters:

1. First, the order matters.
2. Then, the order matters more.
3. Finally, the order has mattered enough.

Bulleted lists are useful when it doesn't:

- One thing.
- Another thing.
- A third thing, related to the first two.

## Mathematics

If your book includes equations, write them in LaTeX style. Inline equations sit in the flow of a sentence, like $E = mc^2$, without disrupting the line. Displayed equations get their own line and centered position:

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

The book template knows how to size and space these properly.

## Footnotes

Footnotes attach to the end of the relevant page.[^1] Multiple footnotes work fine.[^2] You don't have to manage their numbering — the template does.

[^1]: Like this one. The numbering is automatic; you can refer to footnotes by name in the markdown source and the template renumbers them in the order they appear.

[^2]: This is the second footnote. It's longer, to show that footnotes wrap properly across multiple lines if they need to, and that the typography of footnote text is different from the body text.

## Code blocks

If your book includes code, fenced code blocks render with monospace typography and proper spacing:

```
function example() {
  return "this is a code block"
}
```

You can name a language for syntax highlighting in printed and digital outputs.

## Images

Images live in your project's `images/` folder. Reference them with standard markdown:

```
![A descriptive caption for accessibility](images/diagram.png)
```

The book template handles figure numbering, captions, and placement.

That's most of it. The next chapter points you toward where to go from here.
