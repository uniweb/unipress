---
type: Chapter
title: "Conclusion and Future Work"
id: sec-conclusion
---

We presented a refined analysis of randomised rounding for ATSP that
improves the leading constant in the approximation factor. The result
in [#sec-main-result] complements the constant-factor approximation
of [@svensson-tarnawski-vegh2018] and the structural insights of
[@christofides1976] for the symmetric setting.

Three directions for future work suggest themselves. First, the gap
between our upper bound and the integrality gap of the Held–Karp
relaxation [@held-karp1970] remains a constant factor; closing it
would yield a tight analysis. Second, the rounding scheme in
[#sec-main-result] is randomised; derandomisation by the method of
conditional expectations [@motwani-raghavan1995] is a natural next
step. Third, we have not addressed the *Euclidean* asymmetric TSP, a
geometric specialisation where stronger structural properties may
admit a PTAS in the spirit of [@arora1998].
