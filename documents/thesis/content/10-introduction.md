---
type: Chapter
title: "Introduction"
---

Approximation algorithms occupy a particular niche in the theory of
computation: the study of polynomial-time algorithms whose output is
provably within a guaranteed factor of the optimal solution to a
problem we cannot solve exactly in polynomial time, assuming
$\\text{P} \\neq \\text{NP}$. This thesis examines one such problem —
the asymmetric traveling salesman problem (ATSP) — and presents a new
approximation algorithm with an improved performance guarantee.

## Background {#sec-background}

The traveling salesman problem (TSP) is a foundational problem in
combinatorial optimisation: given a set of cities and the cost of
travel between every pair, find the cheapest tour that visits each
city exactly once and returns to the starting city. The general TSP
is NP-hard [@karp1972; @garey-johnson1979], and the metric TSP — the
restricted setting where costs satisfy the triangle inequality — has
been the subject of intensive algorithmic study since
[@christofides1976], whose algorithm achieves a $3/2$-approximation
that resisted improvement for over four decades.

## The asymmetric variant {#sec-asymmetric}

The asymmetric TSP relaxes the symmetry assumption: travel from city
$a$ to city $b$ may cost different from travel from $b$ to $a$. This
captures real-world routing problems where one-way streets, prevailing
winds, or directional pricing make round-trip costs asymmetric. The
asymmetric setting is harder; for many years the best known
approximation factor was $O(\\log n)$ [@frieze-galbiati-maffioli1982],
and only recently has constant-factor approximation become available
[@svensson-tarnawski-vegh2018].

## Contribution

This thesis presents a refined analysis of a randomised rounding
scheme for ATSP that improves the constant of approximation. The main
technical contribution is described in [#sec-main-result], with
preliminaries in [#sec-preliminaries] and concluding remarks in
[#sec-conclusion].
