---
type: Chapter
title: "Preliminaries"
id: sec-preliminaries
---

This chapter fixes notation and recalls the definitions and facts the
main result builds on. Readers familiar with [@cormen2009] and
[@vazirani2001] can skim or skip.

## Graph notation

Throughout the thesis, $G = (V, E)$ denotes a directed graph on $n$
vertices with non-negative edge costs $c : E \\to \\mathbb{R}_{\\ge 0}$.
We assume connectivity in both directions: there is a directed path
from every vertex to every other vertex, ruling out trivially
unsolvable instances. The asymmetric TSP asks for a Hamiltonian cycle
of minimum total cost.
