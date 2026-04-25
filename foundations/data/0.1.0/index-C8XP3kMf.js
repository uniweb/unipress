import { b as ze, d as Re, e as Ue, c as qe, f as Fe, g as Ge, s as He, a as Ye, h as Ze, t as Ke } from "./html-mG541ZVY.js";
import { l as Ve, o as We, r as Je } from "./numbers-BxM2Hr9k.js";
import { p as et } from "./pages-CFNIsOHR.js";
const ce = /* @__PURE__ */ new Set([
  "article",
  "article-journal",
  "article-magazine",
  "article-newspaper",
  "bill",
  "book",
  "broadcast",
  "chapter",
  "dataset",
  "entry",
  "entry-dictionary",
  "entry-encyclopedia",
  "figure",
  "graphic",
  "interview",
  "legal_case",
  "legislation",
  "manuscript",
  "map",
  "motion_picture",
  "musical_score",
  "pamphlet",
  "paper-conference",
  "patent",
  "personal_communication",
  "post",
  "post-weblog",
  "regulation",
  "report",
  "review",
  "review-book",
  "software",
  "song",
  "speech",
  "standard",
  "thesis",
  "treaty",
  "webpage"
]), fe = [
  "author",
  "editor",
  "translator",
  "container-author",
  "collection-editor",
  "composer",
  "director",
  "interviewer",
  "reviewed-author",
  "recipient",
  "illustrator",
  "original-author"
], pe = [
  "issued",
  "accessed",
  "original-date",
  "submitted",
  "event-date"
];
function De(e) {
  const i = [];
  if (!e || typeof e != "object")
    return { valid: !1, warnings: ["Item must be an object"] };
  (e.id == null || e.id === "") && i.push('Missing required field "id"'), e.type ? ce.has(e.type) || i.push(`Unknown type "${e.type}"`) : i.push('Missing required field "type"');
  for (const n of fe)
    if (e[n] != null)
      if (!Array.isArray(e[n]))
        i.push(`"${n}" must be an array of name objects`);
      else
        for (let t = 0; t < e[n].length; t++) {
          const r = e[n][t];
          !r || typeof r != "object" ? i.push(`${n}[${t}] must be a name object`) : !r.family && !r.literal && i.push(`${n}[${t}] must have "family" or "literal"`);
        }
  for (const n of pe)
    if (e[n] != null) {
      const t = e[n];
      if (typeof t != "object" || Array.isArray(t))
        i.push(`"${n}" must be a date object`);
      else if (!t["date-parts"] && !t.literal && !t.raw)
        i.push(`"${n}" must have "date-parts", "literal", or "raw"`);
      else if (t["date-parts"])
        if (!Array.isArray(t["date-parts"]))
          i.push(`${n}.date-parts must be an array`);
        else
          for (let r = 0; r < t["date-parts"].length; r++) {
            const l = t["date-parts"][r];
            (!Array.isArray(l) || l.length === 0) && i.push(`${n}.date-parts[${r}] must be a non-empty array [year, month?, day?]`);
          }
    }
  return e.doi && !e.DOI && i.push('"doi" should be "DOI" (uppercase)'), e.url && !e.URL && i.push('"url" should be "URL" (uppercase)'), e.isbn && !e.ISBN && i.push('"isbn" should be "ISBN" (uppercase)'), e.issn && !e.ISSN && i.push('"issn" should be "ISSN" (uppercase)'), { valid: i.length === 0, warnings: i };
}
function Ee(e, i = {}) {
  if (!e || !e.bibliography && !e.citation)
    throw new Error("createRegistry requires a compiled CSL style with bibliography() or citation()");
  const n = /* @__PURE__ */ new Map(), t = [], r = /* @__PURE__ */ new Map();
  let l = 1;
  const d = /* @__PURE__ */ new Map();
  let p = !0;
  function h(f) {
    for (const s of f) {
      const a = String(s.id);
      n.has(a) ? (n.set(a, s), s["citation-number"] = r.get(a), p = !0) : (n.set(a, s), t.push(a), r.set(a, l++), s["citation-number"] = r.get(a), p = !0);
    }
  }
  function g(f) {
    return n.get(String(f));
  }
  function u() {
    p && (p = !1, z(), oe());
  }
  function j(f, s = {}) {
    if (!e.citation)
      return { text: "", html: "" };
    u();
    const a = f.map((c) => {
      const m = c.item || n.get(String(c.id));
      if (!m)
        return { item: { id: c.id, type: "article", title: "[missing]" } };
      r.has(String(m.id)) || h([m]);
      const A = { item: m };
      c.locator != null && (A.locator = c.locator), c.label != null && (A.label = c.label), c.prefix != null && (A.prefix = c.prefix), c.suffix != null && (A.suffix = c.suffix);
      const S = d.get(String(m.id));
      return S && (A._disambig = S), A;
    }), o = e.meta?.collapse;
    return o === "citation-number" && a.length > 1 ? $(a, s) : (o === "year" || o === "year-suffix" || o === "year-suffix-ranged") && a.length > 1 ? D(a, s, o) : e.citation(a, s);
  }
  function $(f, s) {
    const a = [...f].sort(
      (w, b) => (w.item["citation-number"] || 0) - (b.item["citation-number"] || 0)
    ), o = a.map((w) => w.item["citation-number"] || 0);
    if (a.some((w) => w.locator != null))
      return e.citation(a, s);
    const m = [];
    let A = o[0], S = o[0];
    for (let w = 1; w < o.length; w++)
      o[w] === S + 1 || (m.push([A, S]), A = o[w]), S = o[w];
    if (m.push([A, S]), !m.some(([w, b]) => b - w >= 2))
      return e.citation(a, s);
    const v = e.citation([a[0]], s), E = String(o[0]), N = v.text.indexOf(E), X = N >= 0 ? v.text.slice(0, N) : "", V = N >= 0 ? v.text.slice(N + E.length) : "", R = e.meta?.citationLayoutDelimiter || ", ", U = m.map(([w, b]) => w === b ? String(w) : b - w === 1 ? `${w}${R}${b}` : `${w}–${b}`), H = X + U.join(R) + V, y = v.html.includes("<sup>") ? '<span class="csl-citation"><sup>' : '<span class="csl-citation">', M = v.html.includes("</sup>") ? "</sup></span>" : "</span>", C = v.html.replace(/<span class="csl-citation">/, "").replace(/<\/span>$/, "").replace(/<sup>/, "").replace(/<\/sup>/, ""), L = C.indexOf(E), B = L >= 0 ? C.slice(0, L) : "", O = L >= 0 ? C.slice(L + E.length) : "", x = y + B + U.join(R) + O + M;
    return { text: H, html: x };
  }
  function D(f, s, a) {
    const o = e.meta?.citationLayoutDelimiter || "; ", c = e.meta?.citationLayoutPrefix || "", m = e.meta?.citationLayoutSuffix || "", A = e.meta?.citeGroupDelimiter || ", ", S = e.meta?.yearSuffixDelimiter || A, k = e.meta?.afterCollapseDelimiter || o, v = f.map((y) => {
      let C = e.citation([y], s).text;
      c && C.startsWith(c) && (C = C.slice(c.length)), m && C.endsWith(m) && (C = C.slice(0, -m.length));
      const L = String(y.item.issued?.["date-parts"]?.[0]?.[0] || ""), B = y.item["year-suffix"] || "";
      return {
        cite: y,
        inner: C,
        authorKey: ge(y.item),
        year: L,
        yearSuffix: B,
        yearStr: L + B
      };
    }), E = [];
    let N = [v[0]];
    for (let y = 1; y < v.length; y++)
      v[y].authorKey && v[y].authorKey === N[0].authorKey ? N.push(v[y]) : (E.push(N), N = [v[y]]);
    if (E.push(N), !E.some((y) => y.length > 1))
      return e.citation(f, s);
    const R = E.map((y) => {
      if (y.length === 1) return y[0].inner;
      const M = y[0], C = M.inner.lastIndexOf(M.yearStr);
      if (C < 0)
        return y.map((O) => O.inner).join(o);
      const L = M.inner.slice(0, C);
      if (a === "year-suffix" || a === "year-suffix-ranged") {
        const O = [];
        let x = [y[0]];
        for (let b = 1; b < y.length; b++)
          y[b].year === x[0].year ? x.push(y[b]) : (O.push(x), x = [y[b]]);
        O.push(x);
        const w = O.map((b, se) => {
          if (b.length === 1)
            return b[0].yearStr;
          const le = b[0].yearStr, ue = b.slice(1).map((W) => W.yearSuffix || W.yearStr);
          return le + S + ue.join(S);
        });
        return L + w.join(A);
      }
      const B = y.slice(1).map((O) => O.yearStr);
      return L + M.yearStr + A + B.join(A);
    }).join(k), U = c + R + m, H = '<span class="csl-citation">' + G(U).replace(
      G(c),
      c ? G(c) : ""
    ) + "</span>";
    return { text: U, html: H };
  }
  function z() {
    const f = e.meta?.disambiguateAddGivenname, s = e.meta?.disambiguateAddNames;
    if (!f && !s || !e.citation) return;
    const a = e.meta?.givennameDisambiguationRule || "by-cite";
    d.clear();
    const o = /* @__PURE__ */ new Map();
    for (const m of t)
      n.get(m) && o.set(m, I(m));
    const c = P(o);
    for (const m of c)
      if (!(m.length <= 1) && (f && ne(m, a), s)) {
        const A = /* @__PURE__ */ new Map();
        for (const k of m)
          A.set(k, I(k));
        const S = P(A);
        for (const k of S)
          k.length <= 1 || re(k);
      }
  }
  function I(f) {
    const s = n.get(f), a = d.get(f), o = a ? { item: s, _disambig: a } : { item: s };
    return e.citation([o]).text;
  }
  function P(f) {
    const s = /* @__PURE__ */ new Map();
    for (const [a, o] of f)
      s.has(o) || s.set(o, []), s.get(o).push(a);
    return [...s.values()];
  }
  function ne(f, s) {
    switch (s) {
      case "primary-name":
        for (const a of f)
          d.set(a, { ...d.get(a), expandIndices: [0] });
        break;
      case "primary-name-with-initials":
        for (const a of f)
          d.set(a, { ...d.get(a), expandIndices: [0], withInitials: !0 });
        break;
      case "all-names":
        for (const a of f)
          d.set(a, { ...d.get(a), expandAll: !0 });
        break;
      case "all-names-with-initials":
        for (const a of f)
          d.set(a, { ...d.get(a), expandAll: !0, withInitials: !0 });
        break;
      case "by-cite":
        ie(f);
        break;
    }
  }
  function ie(f) {
    const s = f.map((o) => n.get(o)), a = Math.max(...s.map((o) => (o.author || o.editor || []).length));
    for (let o = 1; o <= a; o++) {
      const c = Array.from({ length: o }, (k, v) => v);
      for (const k of f)
        d.set(k, { ...d.get(k), expandIndices: c });
      const m = /* @__PURE__ */ new Map();
      for (const k of f)
        m.set(k, I(k));
      if (P(m).filter((k) => k.length > 1).length === 0) break;
    }
  }
  function re(f) {
    const s = f.map((o) => n.get(o)), a = Math.max(...s.map((o) => (o.author || o.editor || []).length));
    for (let o = 2; o <= a; o++) {
      for (const S of f) {
        const k = d.get(S) || {};
        d.set(S, { ...k, etAlUseFirst: o, etAlMin: o + 1 });
      }
      const c = /* @__PURE__ */ new Map();
      for (const S of f)
        c.set(S, I(S));
      if (P(c).filter((S) => S.length > 1).length === 0) break;
    }
  }
  function oe() {
    if (!(e.meta?.disambiguateAddYearSuffix === !0)) return;
    const s = /* @__PURE__ */ new Map();
    for (const a of t) {
      const o = n.get(a);
      if (!o) continue;
      const c = ye(o);
      c && (s.has(c) || s.set(c, []), s.get(c).push(o));
    }
    for (const [, a] of s) {
      if (a.length <= 1) {
        delete a[0]["year-suffix"];
        continue;
      }
      for (let o = 0; o < a.length; o++)
        a[o]["year-suffix"] = String.fromCharCode(97 + o);
    }
  }
  function ae(f = {}) {
    if (!e.bibliography) return [];
    u();
    let s = t.map((c) => n.get(c)).filter(Boolean);
    e.bibliographySort && (s = [...s].sort(e.bibliographySort));
    const a = s.map((c) => e.bibliography(c, f)), o = i.subsequentAuthorSubstitute ?? e.meta?.subsequentAuthorSubstitute ?? null;
    return o != null && he(a, s, o), a;
  }
  return {
    addItems: h,
    getItem: g,
    cite: j,
    getBibliography: ae,
    /** Number of items in the registry */
    get size() {
      return n.size;
    }
  };
}
function he(e, i, n) {
  if (e.length < 2) return;
  let t = J(i[0]);
  for (let r = 1; r < e.length; r++) {
    const l = J(i[r]);
    l && l === t && (e[r] = {
      ...e[r],
      text: de(e[r].text, i[r], n),
      html: me(e[r].html, i[r], n)
    }), t = l;
  }
}
function J(e) {
  const i = e.author || e.editor || [];
  return i.length ? i.map((n) => n.literal ? n.literal : [n.family, n.given, n["non-dropping-particle"], n["dropping-particle"]].filter(Boolean).join("|")).join(";") : "";
}
function ge(e) {
  const i = e.author || e.editor || [];
  return i.length ? i.map((n) => {
    if (n.literal) return n.literal;
    const t = n["non-dropping-particle"] || "";
    return [n["dropping-particle"] || "", t, n.family].filter(Boolean).join(" ");
  }).join(";") : "";
}
function de(e, i, n) {
  const t = i.author || i.editor || [];
  if (!t.length) return e;
  const r = t[0].literal || t[0].family || "";
  if (!r) return e;
  const l = e.indexOf(r);
  if (l < 0) return e;
  const d = e.indexOf(". (", l), p = e.indexOf(". ", l), h = d >= 0 ? d : p >= 0 ? p : -1;
  return h < 0 ? e : n + e.slice(h);
}
function me(e, i, n) {
  return e.replace(
    /<span class="csl-author">.*?<\/span>/,
    `<span class="csl-author">${G(n)}</span>`
  );
}
function G(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ye(e) {
  const i = e.author || e.editor || [];
  if (!i.length) return "";
  const n = i.map((r) => r.literal ? r.literal : (r.family || "") + "|" + (r.given || "")).join(";"), t = e.issued?.["date-parts"]?.[0]?.[0];
  return t == null ? "" : n + "/" + t;
}
function Oe(e, i, n = {}) {
  if (!e?.bibliography)
    throw new Error("format() requires a compiled style with a bibliography() function");
  return e.bibliography(i, n);
}
function _e(e, i, n = {}) {
  if (!e?.bibliography)
    throw new Error("formatAll() requires a compiled style with a bibliography() function");
  let t = [...i];
  return e.bibliographySort && t.sort(e.bibliographySort), t = t.map((r, l) => ({ ...r, "citation-number": l + 1 })), t.map((r) => e.bibliography(r, n));
}
function Me(e, i, n = {}) {
  if (!e?.citation)
    throw new Error("formatCitation() requires a compiled style with a citation() function");
  const t = i.map((r, l) => r.item && r.item["citation-number"] == null ? { ...r, item: { ...r.item, "citation-number": l + 1 } } : r);
  return e.citation(t, n);
}
const q = {
  "`": { a: "à", e: "è", i: "ì", o: "ò", u: "ù", A: "À", E: "È", I: "Ì", O: "Ò", U: "Ù" },
  "'": { a: "á", e: "é", i: "í", o: "ó", u: "ú", y: "ý", A: "Á", E: "É", I: "Í", O: "Ó", U: "Ú", Y: "Ý", c: "ć", n: "ń", s: "ś", z: "ź", C: "Ć", N: "Ń", S: "Ś", Z: "Ź" },
  '"': { a: "ä", e: "ë", i: "ï", o: "ö", u: "ü", y: "ÿ", A: "Ä", E: "Ë", I: "Ï", O: "Ö", U: "Ü", Y: "Ÿ" },
  "^": { a: "â", e: "ê", i: "î", o: "ô", u: "û", A: "Â", E: "Ê", I: "Î", O: "Ô", U: "Û" },
  "~": { a: "ã", n: "ñ", o: "õ", A: "Ã", N: "Ñ", O: "Õ" },
  "=": { a: "ā", e: "ē", i: "ī", o: "ō", u: "ū", A: "Ā", E: "Ē", I: "Ī", O: "Ō", U: "Ū" },
  ".": { z: "ż", Z: "Ż", e: "ė", I: "İ" },
  u: { a: "ă", A: "Ă", g: "ğ", G: "Ğ" },
  v: { c: "č", s: "š", z: "ž", r: "ř", C: "Č", S: "Š", Z: "Ž", R: "Ř", e: "ě", E: "Ě", n: "ň", N: "Ň" },
  c: { c: "ç", C: "Ç", s: "ş", S: "Ş", t: "ţ", T: "Ţ" },
  H: { o: "ő", u: "ű", O: "Ő", U: "Ű" },
  k: { a: "ą", e: "ę", A: "Ą", E: "Ę" },
  d: { a: "ạ", A: "Ạ" }
}, F = {
  ss: "ß",
  SS: "SS",
  o: "ø",
  O: "Ø",
  ae: "æ",
  AE: "Æ",
  oe: "œ",
  OE: "Œ",
  aa: "å",
  AA: "Å",
  l: "ł",
  L: "Ł",
  i: "ı",
  j: "ȷ",
  dh: "ð",
  DH: "Ð",
  dj: "đ",
  DJ: "Đ",
  ng: "ŋ",
  NG: "Ŋ",
  th: "þ",
  TH: "Þ",
  textendash: "–",
  textemdash: "—",
  textquotesingle: "'",
  textquotedblleft: "“",
  textquotedblright: "”",
  textquoteleft: "‘",
  textquoteright: "’",
  textregistered: "®",
  textcopyright: "©",
  texttrademark: "™",
  LaTeX: "LaTeX",
  TeX: "TeX",
  BibTeX: "BibTeX"
}, Se = { "&": "&", "%": "%", $: "$", "#": "#", _: "_", "{": "{", "}": "}" }, te = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12
}, we = {
  article: "article-journal",
  book: "book",
  booklet: "pamphlet",
  conference: "paper-conference",
  inbook: "chapter",
  incollection: "chapter",
  inproceedings: "paper-conference",
  manual: "report",
  mastersthesis: "thesis",
  misc: "article",
  online: "webpage",
  phdthesis: "thesis",
  proceedings: "book",
  techreport: "report",
  unpublished: "manuscript"
};
function _(e) {
  return e && (e = e.replace(/\\([&%$#_{}])/g, (i, n) => Se[n] || n), e = e.replace(/\\([`'"^~=.uvcHkd])\{([a-zA-Z])\}/g, (i, n, t) => q[n]?.[t] ?? `${n}${t}`), e = e.replace(/\\([`'"^~])\{\\([ij])\}/g, (i, n, t) => {
    const r = F[t] || t;
    return q[n]?.[r] ?? `${n}${r}`;
  }), e = e.replace(/\\([`'"^~])([a-zA-Z])/g, (i, n, t) => q[n]?.[t] ?? `${n}${t}`), e = e.replace(/\\([uvcHkd=.])\{([a-zA-Z])\}/g, (i, n, t) => q[n]?.[t] ?? `${n}${t}`), e = e.replace(/\\([a-zA-Z]+)\{\}/g, (i, n) => F[n] ?? `\\${n}`), e = e.replace(/\\([a-zA-Z]+)(?=[\s{},;.!?)]|$)/g, (i, n) => F[n] != null ? F[n] : `\\${n}`), e = e.replace(/\\url\{([^}]*)\}/g, "$1"), e = e.replace(/\\(?:emph|textit|textbf|textsc|texttt)\{([^}]*)\}/g, "$1"), e = e.replace(/[{}]/g, ""), e = e.replace(/~/g, " "), e = e.replace(/[\t\n\r ]+/g, " ").trim(), e);
}
function Ae(e) {
  const i = { ...te }, n = [];
  let t = 0;
  function r() {
    for (; t < e.length && /\s/.test(e[t]); ) t++;
  }
  function l() {
    let g = 1;
    t++;
    let u = "";
    for (; t < e.length && g > 0; )
      e[t] === "{" ? (g++, u += "{") : e[t] === "}" ? (g--, g > 0 && (u += "}")) : e[t] === "\\" ? (u += e[t], t++, t < e.length && (u += e[t])) : u += e[t], t++;
    return u;
  }
  function d() {
    t++;
    let g = "";
    for (; t < e.length && e[t] !== '"'; )
      e[t] === "{" ? g += "{" + l() + "}" : e[t] === "\\" ? (g += e[t], t++, t < e.length && (g += e[t]), t++) : (g += e[t], t++);
    return t < e.length && t++, g;
  }
  function p() {
    r();
    let g = "";
    for (; t < e.length; ) {
      r();
      let u;
      if (e[t] === "{")
        u = l();
      else if (e[t] === '"')
        u = d();
      else {
        let j = "";
        for (; t < e.length && /[a-zA-Z0-9_.-]/.test(e[t]); )
          j += e[t], t++;
        if (/^\d+$/.test(j))
          u = j;
        else {
          const $ = j.toLowerCase();
          u = i[$] != null ? String(i[$]) : j;
        }
      }
      if (g += u, r(), e[t] === "#") {
        t++;
        continue;
      }
      break;
    }
    return g;
  }
  function h(g) {
    const u = g === "{" ? "}" : ")";
    r();
    let j = "";
    for (; t < e.length && e[t] !== "," && e[t] !== u && !/\s/.test(e[t]); )
      j += e[t], t++;
    j = j.trim(), r(), e[t] === "," && t++;
    const $ = {};
    for (; t < e.length && e[t] !== u && (r(), e[t] !== u); ) {
      let D = "";
      for (; t < e.length && e[t] !== "=" && e[t] !== u && !/\s/.test(e[t]); )
        D += e[t], t++;
      if (D = D.trim().toLowerCase(), !D || e[t] === u || (r(), e[t] !== "=")) break;
      t++;
      const z = p();
      $[D] = z, r(), e[t] === "," && t++;
    }
    return e[t] === u && t++, { key: j, fields: $ };
  }
  for (; t < e.length; ) {
    const g = e.indexOf("@", t);
    if (g === -1) break;
    t = g + 1, r();
    let u = "";
    for (; t < e.length && /[a-zA-Z]/.test(e[t]); )
      u += e[t], t++;
    u = u.toLowerCase(), r();
    const j = e[t];
    if (j !== "{" && j !== "(") continue;
    t++;
    const $ = j === "{" ? "}" : ")";
    if (u === "comment") {
      let I = 1;
      for (; t < e.length && I > 0; )
        e[t] === j ? I++ : e[t] === $ && I--, t++;
      continue;
    }
    if (u === "preamble") {
      p(), r(), e[t] === $ && t++;
      continue;
    }
    if (u === "string") {
      r();
      let I = "";
      for (; t < e.length && e[t] !== "=" && !/\s/.test(e[t]); )
        I += e[t], t++;
      I = I.trim().toLowerCase(), r(), e[t] === "=" && t++;
      const P = p();
      i[I] = P, r(), e[t] === $ && t++;
      continue;
    }
    const { key: D, fields: z } = h(j);
    n.push({ type: u, key: D, fields: z });
  }
  return { entries: n, strings: i };
}
function Y(e) {
  return e ? be(e).map((n) => {
    if (n = n.trim(), !n) return null;
    if (n.startsWith("{") && n.endsWith("}"))
      return { literal: _(n.slice(1, -1)) };
    n = _(n);
    const t = ke(n, ",").map((r) => r.trim());
    if (t.length >= 3) {
      const { particle: r, family: l } = Q(t[0]);
      return K({
        family: l,
        given: t[2],
        suffix: t[1],
        "non-dropping-particle": r
      });
    } else if (t.length === 2) {
      const { particle: r, family: l } = Q(t[0]);
      return K({
        family: l,
        given: t[1],
        "non-dropping-particle": r
      });
    } else
      return je(n);
  }).filter(Boolean) : [];
}
function be(e) {
  const i = [];
  let n = 0, t = "";
  for (let r = 0; r < e.length; r++) {
    if (e[r] === "{" ? n++ : e[r] === "}" && n--, n === 0 && e.slice(r, r + 5).toLowerCase() === " and ") {
      i.push(t), t = "", r += 4;
      continue;
    }
    t += e[r];
  }
  return i.push(t), i;
}
function ke(e, i) {
  const n = [];
  let t = 0, r = "";
  for (const l of e)
    l === "{" ? t++ : l === "}" && t--, l === i && t === 0 ? (n.push(r), r = "") : r += l;
  return n.push(r), n;
}
function Q(e) {
  const i = e.trim().split(/\s+/);
  if (i.length <= 1) return { particle: null, family: e.trim() };
  let n = 0;
  for (let t = 0; t < i.length - 1 && (i[t][0] && i[t][0] === i[t][0].toLowerCase() && /[a-z]/.test(i[t][0])); t++)
    n = t + 1;
  return n === 0 ? { particle: null, family: e.trim() } : {
    particle: i.slice(0, n).join(" "),
    family: i.slice(n).join(" ")
  };
}
function je(e) {
  const i = e.trim().split(/\s+/);
  if (i.length === 1) return { family: i[0] };
  let n = -1;
  for (let p = 1; p < i.length - 1; p++)
    if (i[p][0] && i[p][0] === i[p][0].toLowerCase() && /[a-z]/.test(i[p][0])) {
      n = p;
      break;
    }
  if (n === -1)
    return {
      given: i.slice(0, -1).join(" "),
      family: i[i.length - 1]
    };
  let t = i.length - 1;
  for (let p = i.length - 2; p >= n && !(i[p][0] && i[p][0] === i[p][0].toUpperCase()); p--)
    t = p;
  const r = i.slice(0, n).join(" ") || void 0, l = i.slice(n, t).join(" ") || void 0, d = i.slice(t).join(" ");
  return K({
    given: r,
    family: d,
    "non-dropping-particle": l
  });
}
function K(e) {
  const i = {};
  for (const [n, t] of Object.entries(e))
    t != null && t !== "" && (i[n] = t);
  return i;
}
function ve(e) {
  const { type: i, key: n, fields: t } = e, r = {
    id: n,
    type: we[i] || "article"
  };
  i === "phdthesis" ? r.genre = "PhD thesis" : i === "mastersthesis" && (r.genre = "Master's thesis"), t.author && (r.author = Y(t.author)), t.editor && (r.editor = Y(t.editor)), t.translator && (r.translator = Y(t.translator)), t.title && (r.title = _(t.title)), t.journal ? r["container-title"] = _(t.journal) : t.booktitle && (r["container-title"] = _(t.booktitle));
  const l = t.year ? parseInt(t.year, 10) : null, d = t.month != null ? Ce(t.month) : null;
  if (l) {
    const h = [l];
    d && h.push(d), r.issued = { "date-parts": [h] };
  }
  const p = {
    volume: "volume",
    number: "issue",
    pages: "page",
    doi: "DOI",
    url: "URL",
    isbn: "ISBN",
    issn: "ISSN",
    publisher: "publisher",
    address: "publisher-place",
    edition: "edition",
    series: "collection-title",
    note: "note",
    abstract: "abstract",
    keywords: "keyword",
    language: "language",
    chapter: "chapter-number"
  };
  for (const [h, g] of Object.entries(p))
    if (t[h]) {
      let u = _(t[h]);
      g === "page" && (u = u.replace(/--/g, "–")), r[g] = u;
    }
  if (r.publisher || (t.school ? r.publisher = _(t.school) : t.institution && (r.publisher = _(t.institution))), t.howpublished && !r.URL) {
    const h = _(t.howpublished);
    /^https?:\/\//i.test(h) && (r.URL = h);
  }
  return r;
}
function Ce(e) {
  if (typeof e == "number") return e;
  const i = String(e).trim().toLowerCase(), n = parseInt(i, 10);
  return !isNaN(n) && n >= 1 && n <= 12 ? n : te[i.slice(0, 3)] || null;
}
function xe(e) {
  if (!e || typeof e != "string") return [];
  const { entries: i } = Ae(e);
  return i.map((n) => ve(n));
}
const Ie = {
  "article-journal": "article",
  "article-magazine": "article",
  "article-newspaper": "article",
  article: "misc",
  book: "book",
  chapter: "incollection",
  manuscript: "unpublished",
  pamphlet: "booklet",
  "paper-conference": "inproceedings",
  report: "techreport",
  thesis: "phdthesis",
  webpage: "misc",
  motion_picture: "misc",
  graphic: "misc",
  song: "misc",
  software: "misc",
  dataset: "misc",
  patent: "misc",
  bill: "misc",
  legislation: "misc",
  legal_case: "misc"
}, $e = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
function Ne(e) {
  if (e.literal) return `{${e.literal}}`;
  const i = [], n = e["non-dropping-particle"] || e["dropping-particle"] || "", t = (n ? n + " " : "") + (e.family || "");
  return e.suffix ? (i.push(t), i.push(e.suffix), e.given && i.push(e.given), i.join(", ")) : e.given ? `${t}, ${e.given}` : t;
}
function ee(e) {
  return !e || !e.length ? null : e.map(Ne).join(" and ");
}
function Z(e) {
  return e == null ? null : String(e);
}
function T(e) {
  return `{${e}}`;
}
function Le(e) {
  if (e.id && typeof e.id == "string" && !/\s/.test(e.id)) return e.id;
  let i = "";
  if (e.author && e.author.length) {
    const t = e.author[0];
    i += (t.family || t.literal || "unknown").replace(/\s+/g, "");
  }
  const n = e.issued?.["date-parts"]?.[0]?.[0];
  return n && (i += n), i || "item";
}
function Te(e) {
  return !e || !e.length ? "" : e.map((i) => {
    let n = Ie[i.type] || "misc";
    i.type === "thesis" && i.genre && (i.genre.toLowerCase().includes("master") ? n = "mastersthesis" : n = "phdthesis");
    const t = Le(i), r = [];
    if (i.author) {
      const h = ee(i.author);
      h && r.push(["author", T(h)]);
    }
    if (i.editor) {
      const h = ee(i.editor);
      h && r.push(["editor", T(h)]);
    }
    if (i.title && r.push(["title", T(Z(i.title))]), i["container-title"]) {
      const h = n === "article" ? "journal" : "booktitle";
      r.push([h, T(Z(i["container-title"]))]);
    }
    const l = i.issued?.["date-parts"]?.[0];
    l && (l[0] && r.push(["year", T(String(l[0]))]), l[1] && l[1] >= 1 && l[1] <= 12 && r.push(["month", $e[l[1] - 1]]));
    const d = [
      ["volume", "volume"],
      ["issue", "number"],
      ["page", "pages"],
      ["DOI", "doi"],
      ["URL", "url"],
      ["ISBN", "isbn"],
      ["ISSN", "issn"],
      ["publisher", "publisher"],
      ["publisher-place", "address"],
      ["edition", "edition"],
      ["collection-title", "series"],
      ["note", "note"],
      ["abstract", "abstract"],
      ["keyword", "keywords"],
      ["language", "language"],
      ["chapter-number", "chapter"]
    ];
    for (const [h, g] of d)
      if (i[h]) {
        let u = String(i[h]);
        g === "pages" && (u = u.replace(/–/g, "--")), r.push([g, T(u)]);
      }
    i.publisher, i.genre && n !== "phdthesis" && n !== "mastersthesis" && r.push(["type", T(Z(i.genre))]);
    const p = r.map(([h, g]) => `  ${h} = ${g}`).join(`,
`);
    return `@${n}{${t},
${p}
}`;
  }).join(`

`) + `
`;
}
export {
  ze as applyTextCase,
  Re as capitalize,
  _ as convertLatex,
  Ee as createRegistry,
  Ue as escapeHtml,
  Te as exportBibtex,
  Oe as format,
  _e as formatAll,
  Me as formatCitation,
  qe as formatDate,
  Fe as formatNames,
  Ve as longOrdinal,
  We as ordinal,
  et as pageRange,
  xe as parseBibtex,
  Je as roman,
  Ge as sentenceCase,
  He as stripFormatting,
  Ye as stripNocaseSpans,
  Ze as titleCase,
  Ke as toHtml,
  De as validateItem
};
//# sourceMappingURL=index-C8XP3kMf.js.map
