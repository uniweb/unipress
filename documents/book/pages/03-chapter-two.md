# What Came Next

The second chapter picks up where the first left off. By now the reader has settled into the cadence of the book — a sentence shape, a vocabulary, a willingness to follow the argument wherever it leads.

This chapter exists primarily to demonstrate that the foundation handles multi-chapter books cleanly: chapter openers are emitted with the right break-before behavior in PDF, the TOC includes both, and running headers update on each chapter boundary.

## Lists, code, and quotes

The default Paged.js stylesheet handles common markdown shapes:

- An unordered list, with hanging indents.
- Another item.
- A third, just to show the rhythm.

Numbered lists work the same way:

1. First.
2. Second.
3. Third.

Block quotes:

> "All happy families are alike; each unhappy family is unhappy in its own way."

And code:

```js
function greet(name) {
  return `Hello, ${name}!`
}
```

Inline `code` snippets too. The Typst pipeline handles all of these with sensible typography defaults; the Paged.js stylesheet does the same for the HTML/print fallback.

## Closing thought

End the chapter however feels right. The next file in `document.yml`'s `pages:` list takes over from here.
