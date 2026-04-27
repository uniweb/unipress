---
type: Proof
---

By analysis of a randomised rounding scheme applied to the Held–Karp
LP relaxation [@held-karp1970]. The rounding decomposes the LP
solution into a convex combination of cycle covers; randomly
selecting one and patching the resulting cycle structure into a
single tour yields the claimed approximation ratio. The technical
heart of the argument is bounding the expected patching cost, which
the cycle-cover decomposition of [@svensson-tarnawski-vegh2018]
allows us to do tighter than previous analyses.
