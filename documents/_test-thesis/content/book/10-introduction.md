---
type: Chapter
title: "Introduction"
---

This **introductory chapter** exercises every block-level construct the
LaTeX adapter must emit: paragraphs with *italic*, **bold**, `inline
code`, and [a hyperlink](https://example.org). The thesis examines
free-riding behaviour in *Sciurus carolinensis* under realistic
door-closing constraints, building on classical externalities theory
[@coase1960] and a recent empirical replication [@squirrel2024]{page=132}.

A multi-cite literature-review cluster: [@coase1960; @squirrel2024]. A
suppress-author cite gives just the year: [@squirrel2024]{suppress-author}.

## Background {#sec-background}

Three observations motivate the work:

- Squirrels approach doors strategically.
- They free-ride on the work of others.
- They never close the door behind them.

We adopt the following numbered hypotheses:

1. Door-closing is costly.
2. Free-riding is rational.
3. Therefore, closure is undersupplied.

> The squirrel's behaviour is not stupidity — it is incentive design.
> A theory of door-closure is a theory of public goods.

A short code listing illustrates the model:

```python
def close_door(squirrel, door):
    if squirrel.utility(close=True) > squirrel.utility(close=False):
        door.close()
    return door.state
```

The remainder of the document is organised around results and
discussion.
