function ne(e, i = {}) {
  if (!e || !e.length) return "";
  const {
    and: t,
    delimiter: n = ", ",
    delimiterPrecedesLast: r = "contextual",
    delimiterPrecedesEtAl: a = "contextual",
    etAlMin: s,
    etAlUseFirst: c,
    etAlUseLast: o = !1,
    initialize: l = !0,
    initializeWith: x,
    nameAsSortOrder: f,
    sortSeparator: $ = ", ",
    andTerm: j = "and",
    etAlTerm: b = "et al.",
    form: y = "long",
    nameParts: g = []
  } = i, E = i._disambig?.etAlMin ?? s, p = i._disambig?.etAlUseFirst ?? c;
  let A = !1, C = e;
  if (E && p && e.length >= E && (A = !0, o && e.length > p + 1 ? C = [
    ...e.slice(0, p),
    e[e.length - 1]
  ] : C = e.slice(0, p)), y === "count") return String(C.length);
  const S = i._disambig, u = C.map((h, m) => {
    let d = y, v = l, W = x;
    if (S && d === "short" && (S.expandAll || S.expandIndices && S.expandIndices.includes(m)) && (d = "long", S.withInitials ? (v = !0, W = S.initializeWith ?? x ?? ". ") : v = !1), d === "short") {
      if (h.literal) return h.literal;
      let U = _(h);
      return U = I(U, "family", g), U;
    }
    return R(h, {
      initialize: v,
      initializeWith: W,
      nameAsSortOrder: f,
      sortSeparator: $,
      index: m,
      nameParts: g
    });
  });
  if (u.length === 0) return "";
  if (u.length === 1 && !A)
    return u[0];
  if (A && o) {
    const h = u.slice(0, -1), m = u[u.length - 1];
    return (h.length > 0 ? h.join(n) + n : "") + "… " + m;
  }
  if (A) {
    const h = u.join(n), m = a || "contextual";
    let d;
    return m === "always" ? d = !0 : m === "never" ? d = !1 : m === "after-inverted-name" ? d = !!f : d = u.length > 1, h + (d ? n : " ") + b;
  }
  const z = t === "symbol" ? "&" : t === "text" ? j : null;
  if (!z)
    return u.join(n);
  if (u.length === 2) {
    const m = r === "always" || r === "after-inverted-name" && f ? n + z + " " : " " + z + " ";
    return u[0] + m + u[1];
  }
  const O = u.slice(0, -1), M = u[u.length - 1], P = r === "always" || r === "after-inverted-name" || r === "contextual" && u.length > 2 ? n + z + " " : " " + z + " ";
  return O.join(n) + P + M;
}
function R(e, i) {
  const { initialize: t, initializeWith: n, nameAsSortOrder: r, sortSeparator: a = ", ", index: s, nameParts: c = [] } = i;
  if (e.literal) return e.literal;
  let o = _(e), l = e.given || "";
  return t && n != null && l && (l = B(l, n)), o = I(o, "family", c), l = I(l, "given", c), l ? r === "all" || r === "first" && s === 0 ? o + a + l : l + " " + o : o;
}
function _(e) {
  let i = e.family || "";
  const t = e["non-dropping-particle"], n = e["dropping-particle"], r = e.suffix;
  return t && (i = t + " " + i), n && (i = n + " " + i), r && (i = i + " " + r), i;
}
function I(e, i, t) {
  if (!e || !t || t.length === 0) return e;
  const n = t.find((r) => r.name === i);
  return n && (n.textCase === "uppercase" ? e = e.toUpperCase() : n.textCase === "lowercase" ? e = e.toLowerCase() : n.textCase === "capitalize-first" ? e = e.charAt(0).toUpperCase() + e.slice(1) : n.textCase === "capitalize-all" && (e = e.split(" ").map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ")), n.fontStyle === "italic" && (e = "" + e + ""), n.fontWeight === "bold" && (e = "" + e + ""), n.fontVariant === "small-caps" && (e = "" + e + "")), e;
}
function B(e, i) {
  const t = i.trimEnd(), n = i === "" ? "" : " ";
  return e.split(/\s+/).filter(Boolean).map((r) => r.includes("-") ? r.split("-").map((a) => a ? a.charAt(0).toUpperCase() + t : "").join("-") : r.charAt(0).toUpperCase() + t).join(n);
}
function ie(e, i = {}) {
  if (!e) return "";
  if (e.literal) return e.literal;
  const t = e["date-parts"];
  if (!t || !t.length || !t[0].length) return "";
  const {
    dateParts: n = [{ name: "year" }],
    monthTerms: r = H,
    seasonTerms: a = J
  } = i, s = t[0], c = s[0], o = s.length > 1 ? s[1] : void 0, l = s.length > 2 ? s[2] : void 0, x = t.length > 1 && t[1].length > 0, f = x ? t[1] : null, $ = f ? f[0] : void 0, j = f && f.length > 1 ? f[1] : void 0, b = f && f.length > 2 ? f[2] : void 0, y = [];
  for (const g of n) {
    const E = T(g, { year: c, month: o, day: l, date: e }, { monthTerms: r, seasonTerms: a });
    if (E === "") continue;
    let p = E;
    if (x) {
      const A = T(g, {
        year: $,
        month: j,
        day: b,
        date: e
      }, { monthTerms: r, seasonTerms: a });
      if (A && A !== E) {
        const C = g.rangeDelimiter || "–";
        p = E + C + A;
      }
    }
    g.prefix && (p = g.prefix + p), g.suffix && (p = p + g.suffix), y.push(p);
  }
  return y.join("");
}
function T(e, i, t) {
  const { name: n, form: r } = e, { year: a, month: s, day: c, date: o } = i;
  if (n === "year") {
    if (a == null) return "";
    let l = String(a);
    return r === "short" && (l = l.slice(-2)), l;
  }
  return n === "month" ? o && o.season ? t.seasonTerms[String(o.season)] || "" : s == null ? "" : r === "numeric" ? String(s) : r === "numeric-leading-zeros" ? String(s).padStart(2, "0") : r === "short" ? (t.monthTerms[String(s)] || "").slice(0, 3) : t.monthTerms[String(s)] || "" : n === "day" ? c == null ? "" : r === "numeric-leading-zeros" ? String(c).padStart(2, "0") : r === "ordinal" ? G(c) : String(c) : "";
}
function G(e) {
  const i = ["th", "st", "nd", "rd"], t = e % 100;
  return e + (i[(t - 20) % 10] || i[t] || i[0]);
}
const H = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
}, J = {
  1: "Spring",
  2: "Summer",
  3: "Autumn",
  4: "Winter"
}, Z = /<span class="nocase">([\s\S]*?)<\/span>/g;
function L(e, i) {
  if (!e) return "";
  if (!e.includes('<span class="nocase">')) return i(e);
  const t = [];
  let n = 0, r;
  const a = new RegExp(Z.source, "g");
  for (; (r = a.exec(e)) !== null; )
    r.index > n && t.push({ text: e.slice(n, r.index), protect: !1 }), t.push({ text: r[1], protect: !0 }), n = a.lastIndex;
  return n < e.length && t.push({ text: e.slice(n), protect: !1 }), t.map((s) => s.protect ? s.text : i(s.text)).join("");
}
const D = /* @__PURE__ */ new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "down",
  "for",
  "from",
  "in",
  "into",
  "nor",
  "of",
  "on",
  "onto",
  "or",
  "over",
  "so",
  "the",
  "till",
  "to",
  "up",
  "via",
  "with",
  "yet"
]);
function w(e) {
  if (!e) return "";
  if (!e.includes('<span class="nocase">')) return X(e);
  const i = N(e), t = [];
  for (const c of i) {
    const o = c.text.split(/(\s+)/);
    for (const l of o)
      l.trim() && t.push({ word: l, protect: c.protect });
  }
  const n = t.length, r = e.replace(Z, "$1"), a = r === r.toUpperCase() && /[a-zA-Z]/.test(r);
  let s = 0;
  return i.map((c) => {
    if (c.protect) {
      const l = c.text.split(/(\s+)/);
      for (const x of l)
        x.trim() && s++;
      return c.text;
    }
    return c.text.split(/(\s+)/).map((l) => !l.trim() || (s++, /[a-z][A-Z]|[A-Z][a-z].*[A-Z]/.test(l)) || /^[A-Z]{2,}$/.test(l) && !a ? l : s === 1 || s === n ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : D.has(l.toLowerCase()) ? l.toLowerCase() : l.charAt(0).toUpperCase() + l.slice(1).toLowerCase()).join("");
  }).join("");
}
function X(e) {
  if (!e) return "";
  const i = e.split(/(\s+)/);
  let t = 0;
  const n = i.filter((a) => a.trim()).length, r = e === e.toUpperCase() && /[a-zA-Z]/.test(e);
  return i.map((a) => !a.trim() || (t++, /[a-z][A-Z]|[A-Z][a-z].*[A-Z]/.test(a)) || /^[A-Z]{2,}$/.test(a) && !r ? a : t === 1 || t === n ? a.charAt(0).toUpperCase() + a.slice(1).toLowerCase() : D.has(a.toLowerCase()) ? a.toLowerCase() : a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join("");
}
function N(e) {
  const i = [];
  let t = 0, n;
  const r = new RegExp(Z.source, "g");
  for (; (n = r.exec(e)) !== null; )
    n.index > t && i.push({ text: e.slice(t, n.index), protect: !1 }), i.push({ text: n[1], protect: !0 }), t = r.lastIndex;
  return t < e.length && i.push({ text: e.slice(t), protect: !1 }), i;
}
function q(e) {
  if (!e) return "";
  if (!e.includes('<span class="nocase">')) return V(e);
  const i = N(e), t = i.filter((s) => !s.protect).map((s) => s.text).join(""), n = t === t.toUpperCase() && /[a-zA-Z]/.test(t);
  let r = 0, a = !1;
  return i.map((s) => {
    if (s.protect) {
      const o = s.text.split(/(\s+)/);
      for (const l of o)
        l.trim() && (r++, a = l.endsWith(":"));
      return s.text;
    }
    return s.text.split(/(\s+)/).map((o) => o.trim() ? (r++, r === 1 || a ? (a = o.endsWith(":"), o.charAt(0).toUpperCase() + o.slice(1).toLowerCase()) : (o.endsWith(":") && (a = !0), /^[A-Z]{2,}$/.test(o) && !n || /[a-z][A-Z]|[A-Z][a-z].*[A-Z]/.test(o) ? o : o.toLowerCase())) : o).join("");
  }).join("");
}
function V(e) {
  if (!e) return "";
  const i = e === e.toUpperCase() && /[a-zA-Z]/.test(e), t = e.split(/(\s+)/);
  let n = 0, r = !1;
  return t.map((s) => !s.trim() || (n++, /^[A-Z]{2,}$/.test(s) && !i && n > 1) || /[a-z][A-Z]|[A-Z][a-z].*[A-Z]/.test(s) && n > 1 ? s : n === 1 || r ? (r = !1, s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()) : (s.endsWith(":") && (r = !0), s.toLowerCase())).join("");
}
function k(e) {
  return L(e, F);
}
function F(e) {
  return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
}
function re(e, i) {
  if (!e || !i) return e || "";
  switch (i) {
    case "lowercase":
      return L(e, (t) => t.toLowerCase());
    case "uppercase":
      return L(e, (t) => t.toUpperCase());
    case "capitalize-first":
      return k(e);
    case "capitalize-all":
      return L(e, (t) => t.split(" ").map((n) => F(n)).join(" "));
    case "title":
      return w(e);
    case "sentence":
      return q(e);
    default:
      return e;
  }
}
function se(e) {
  return !e || typeof e != "string" ? e || "" : e.replace(Z, "$1");
}
function K(e) {
  return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;") : "";
}
const Q = /[\uE000-\uE007]/g, Y = /\uE020[^\uE021]*\uE021/g, ee = /\uE022/g;
function ae(e) {
  return e ? e.replace(Y, "").replace(Q, "").replace(ee, "") : "";
}
function le(e) {
  if (!e) return "";
  let i = K(e);
  return i = i.replace(
    /https:\/\/doi\.org\/[^\s<)\uE000-\uE022]+/g,
    (t) => {
      const n = t.replace(/[.,;:]+$/, ""), r = t.slice(n.length);
      return `<a class="csl-doi" href="${n}">${n}</a>${r}`;
    }
  ), i = i.replace(
    new RegExp('(?<!href="|">)doi:\\s*(10\\.[^\\s<)\\uE000-\\uE022]+)', "gi"),
    (t, n) => {
      const r = n.replace(/[.,;:]+$/, ""), a = n.slice(r.length);
      return `${t.slice(0, t.indexOf("10."))}<a class="csl-doi" href="https://doi.org/${r}">${r}</a>${a}`;
    }
  ), i = i.replace(
    new RegExp('(?<!href="|">)https?:\\/\\/[^\\s<)\\uE000-\\uE022]+', "g"),
    (t) => {
      if (t.includes("doi.org/")) return t;
      const n = t.replace(/[.,;:]+$/, ""), r = t.slice(n.length);
      return `<a class="csl-url" href="${n}">${n}</a>${r}`;
    }
  ), i = i.replace(/\uE000/g, "<i>").replace(/\uE001/g, "</i>").replace(/\uE002/g, "<b>").replace(/\uE003/g, "</b>").replace(/\uE004/g, '<span class="csl-sc">').replace(/\uE005/g, "</span>").replace(/\uE006/g, '<span class="csl-ul">').replace(/\uE007/g, "</span>"), i = i.replace(
    /\uE020([^\uE021]*)\uE021/g,
    (t, n) => `<span class="csl-${n}">`
  ), i = i.replace(/\uE022/g, "</span>"), i;
}
export {
  se as a,
  re as b,
  ie as c,
  k as d,
  K as e,
  ne as f,
  q as g,
  w as h,
  ae as s,
  le as t
};
//# sourceMappingURL=html-mG541ZVY.js.map
