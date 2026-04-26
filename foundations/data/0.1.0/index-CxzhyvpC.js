import { b as qe, d as Ue, e as Fe, c as Ge, f as He, g as Ye, s as Ze, a as Ke, h as Xe, t as Ve } from "./html-mG541ZVY.js";
import { l as Je, o as Qe, r as et } from "./numbers-BxM2Hr9k.js";
import { p as nt } from "./pages-CFNIsOHR.js";
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
function Oe(e) {
  const n = [];
  if (!e || typeof e != "object")
    return { valid: !1, warnings: ["Item must be an object"] };
  (e.id == null || e.id === "") && n.push('Missing required field "id"'), e.type ? ce.has(e.type) || n.push(`Unknown type "${e.type}"`) : n.push('Missing required field "type"');
  for (const r of fe)
    if (e[r] != null)
      if (!Array.isArray(e[r]))
        n.push(`"${r}" must be an array of name objects`);
      else
        for (let t = 0; t < e[r].length; t++) {
          const i = e[r][t];
          !i || typeof i != "object" ? n.push(`${r}[${t}] must be a name object`) : !i.family && !i.literal && n.push(`${r}[${t}] must have "family" or "literal"`);
        }
  for (const r of pe)
    if (e[r] != null) {
      const t = e[r];
      if (typeof t != "object" || Array.isArray(t))
        n.push(`"${r}" must be a date object`);
      else if (!t["date-parts"] && !t.literal && !t.raw)
        n.push(`"${r}" must have "date-parts", "literal", or "raw"`);
      else if (t["date-parts"])
        if (!Array.isArray(t["date-parts"]))
          n.push(`${r}.date-parts must be an array`);
        else
          for (let i = 0; i < t["date-parts"].length; i++) {
            const l = t["date-parts"][i];
            (!Array.isArray(l) || l.length === 0) && n.push(`${r}.date-parts[${i}] must be a non-empty array [year, month?, day?]`);
          }
    }
  return e.doi && !e.DOI && n.push('"doi" should be "DOI" (uppercase)'), e.url && !e.URL && n.push('"url" should be "URL" (uppercase)'), e.isbn && !e.ISBN && n.push('"isbn" should be "ISBN" (uppercase)'), e.issn && !e.ISSN && n.push('"issn" should be "ISSN" (uppercase)'), { valid: n.length === 0, warnings: n };
}
function _e(e, n = {}) {
  if (!e || !e.bibliography && !e.citation)
    throw new Error("createRegistry requires a compiled CSL style with bibliography() or citation()");
  const r = /* @__PURE__ */ new Map(), t = [], i = /* @__PURE__ */ new Map();
  let l = 1;
  const d = /* @__PURE__ */ new Map();
  let p = !0;
  function h(c) {
    for (const o of c) {
      const s = String(o.id);
      r.has(s) ? (r.set(s, o), o["citation-number"] = i.get(s), p = !0) : (r.set(s, o), t.push(s), i.set(s, l++), o["citation-number"] = i.get(s), p = !0);
    }
  }
  function g(c) {
    return r.get(String(c));
  }
  function u() {
    p && (p = !1, z(), se());
  }
  function v(c, o = {}) {
    if (!e.citation)
      return { text: "", html: "" };
    u();
    const s = c.map((f) => {
      const w = f.item || r.get(String(f.id));
      if (!w)
        return { item: { id: f.id, type: "article", title: "[missing]" } };
      i.has(String(w.id)) || h([w]);
      const A = { item: w };
      f.locator != null && (A.locator = f.locator), f.label != null && (A.label = f.label), f.prefix != null && (A.prefix = f.prefix), f.suffix != null && (A.suffix = f.suffix), f.suppressAuthor && (A.suppressAuthor = !0);
      const $ = d.get(String(w.id));
      return $ && (A._disambig = $), A;
    }), a = s.length > 0 && s.every((f) => f.suppressAuthor), S = o.mode === "suppress-author" || a, m = e.meta?.collapse;
    let k;
    return m === "citation-number" && s.length > 1 ? k = N(s, o) : (m === "year" || m === "year-suffix" || m === "year-suffix-ranged") && s.length > 1 ? k = E(s, o, m) : k = e.citation(s, o), S && (k = he(k)), k;
  }
  function N(c, o) {
    const s = [...c].sort(
      (b, j) => (b.item["citation-number"] || 0) - (j.item["citation-number"] || 0)
    ), a = s.map((b) => b.item["citation-number"] || 0);
    if (s.some((b) => b.locator != null))
      return e.citation(s, o);
    const m = [];
    let k = a[0], f = a[0];
    for (let b = 1; b < a.length; b++)
      a[b] === f + 1 || (m.push([k, f]), k = a[b]), f = a[b];
    if (m.push([k, f]), !m.some(([b, j]) => j - b >= 2))
      return e.citation(s, o);
    const A = e.citation([s[0]], o), $ = String(a[0]), L = A.text.indexOf($), X = L >= 0 ? A.text.slice(0, L) : "", V = L >= 0 ? A.text.slice(L + $.length) : "", R = e.meta?.citationLayoutDelimiter || ", ", q = m.map(([b, j]) => b === j ? String(b) : j - b === 1 ? `${b}${R}${j}` : `${b}–${j}`), H = X + q.join(R) + V, y = A.html.includes("<sup>") ? '<span class="csl-citation"><sup>' : '<span class="csl-citation">', x = A.html.includes("</sup>") ? "</sup></span>" : "</span>", C = A.html.replace(/<span class="csl-citation">/, "").replace(/<\/span>$/, "").replace(/<sup>/, "").replace(/<\/sup>/, ""), D = C.indexOf($), B = D >= 0 ? C.slice(0, D) : "", O = D >= 0 ? C.slice(D + $.length) : "", M = y + B + q.join(R) + O + x;
    return { text: H, html: M };
  }
  function E(c, o, s) {
    const a = e.meta?.citationLayoutDelimiter || "; ", S = e.meta?.citationLayoutPrefix || "", m = e.meta?.citationLayoutSuffix || "", k = e.meta?.citeGroupDelimiter || ", ", f = e.meta?.yearSuffixDelimiter || k, w = e.meta?.afterCollapseDelimiter || a, A = c.map((y) => {
      let C = e.citation([y], o).text;
      S && C.startsWith(S) && (C = C.slice(S.length)), m && C.endsWith(m) && (C = C.slice(0, -m.length));
      const D = String(y.item.issued?.["date-parts"]?.[0]?.[0] || ""), B = y.item["year-suffix"] || "";
      return {
        cite: y,
        inner: C,
        authorKey: me(y.item),
        year: D,
        yearSuffix: B,
        yearStr: D + B
      };
    }), $ = [];
    let L = [A[0]];
    for (let y = 1; y < A.length; y++)
      A[y].authorKey && A[y].authorKey === L[0].authorKey ? L.push(A[y]) : ($.push(L), L = [A[y]]);
    if ($.push(L), !$.some((y) => y.length > 1))
      return e.citation(c, o);
    const R = $.map((y) => {
      if (y.length === 1) return y[0].inner;
      const x = y[0], C = x.inner.lastIndexOf(x.yearStr);
      if (C < 0)
        return y.map((O) => O.inner).join(a);
      const D = x.inner.slice(0, C);
      if (s === "year-suffix" || s === "year-suffix-ranged") {
        const O = [];
        let M = [y[0]];
        for (let j = 1; j < y.length; j++)
          y[j].year === M[0].year ? M.push(y[j]) : (O.push(M), M = [y[j]]);
        O.push(M);
        const b = O.map((j, oe) => {
          if (j.length === 1)
            return j[0].yearStr;
          const le = j[0].yearStr, ue = j.slice(1).map((W) => W.yearSuffix || W.yearStr);
          return le + f + ue.join(f);
        });
        return D + b.join(k);
      }
      const B = y.slice(1).map((O) => O.yearStr);
      return D + x.yearStr + k + B.join(k);
    }).join(w), q = S + R + m, H = '<span class="csl-citation">' + G(q).replace(
      G(S),
      S ? G(S) : ""
    ) + "</span>";
    return { text: q, html: H };
  }
  function z() {
    const c = e.meta?.disambiguateAddGivenname, o = e.meta?.disambiguateAddNames;
    if (!c && !o || !e.citation) return;
    const s = e.meta?.givennameDisambiguationRule || "by-cite";
    d.clear();
    const a = /* @__PURE__ */ new Map();
    for (const m of t)
      r.get(m) && a.set(m, I(m));
    const S = P(a);
    for (const m of S)
      if (!(m.length <= 1) && (c && ne(m, s), o)) {
        const k = /* @__PURE__ */ new Map();
        for (const w of m)
          k.set(w, I(w));
        const f = P(k);
        for (const w of f)
          w.length <= 1 || ie(w);
      }
  }
  function I(c) {
    const o = r.get(c), s = d.get(c), a = s ? { item: o, _disambig: s } : { item: o };
    return e.citation([a]).text;
  }
  function P(c) {
    const o = /* @__PURE__ */ new Map();
    for (const [s, a] of c)
      o.has(a) || o.set(a, []), o.get(a).push(s);
    return [...o.values()];
  }
  function ne(c, o) {
    switch (o) {
      case "primary-name":
        for (const s of c)
          d.set(s, { ...d.get(s), expandIndices: [0] });
        break;
      case "primary-name-with-initials":
        for (const s of c)
          d.set(s, { ...d.get(s), expandIndices: [0], withInitials: !0 });
        break;
      case "all-names":
        for (const s of c)
          d.set(s, { ...d.get(s), expandAll: !0 });
        break;
      case "all-names-with-initials":
        for (const s of c)
          d.set(s, { ...d.get(s), expandAll: !0, withInitials: !0 });
        break;
      case "by-cite":
        re(c);
        break;
    }
  }
  function re(c) {
    const o = c.map((a) => r.get(a)), s = Math.max(...o.map((a) => (a.author || a.editor || []).length));
    for (let a = 1; a <= s; a++) {
      const S = Array.from({ length: a }, (w, A) => A);
      for (const w of c)
        d.set(w, { ...d.get(w), expandIndices: S });
      const m = /* @__PURE__ */ new Map();
      for (const w of c)
        m.set(w, I(w));
      if (P(m).filter((w) => w.length > 1).length === 0) break;
    }
  }
  function ie(c) {
    const o = c.map((a) => r.get(a)), s = Math.max(...o.map((a) => (a.author || a.editor || []).length));
    for (let a = 2; a <= s; a++) {
      for (const f of c) {
        const w = d.get(f) || {};
        d.set(f, { ...w, etAlUseFirst: a, etAlMin: a + 1 });
      }
      const S = /* @__PURE__ */ new Map();
      for (const f of c)
        S.set(f, I(f));
      if (P(S).filter((f) => f.length > 1).length === 0) break;
    }
  }
  function se() {
    if (!(e.meta?.disambiguateAddYearSuffix === !0)) return;
    const o = /* @__PURE__ */ new Map();
    for (const s of t) {
      const a = r.get(s);
      if (!a) continue;
      const S = we(a);
      S && (o.has(S) || o.set(S, []), o.get(S).push(a));
    }
    for (const [, s] of o) {
      if (s.length <= 1) {
        delete s[0]["year-suffix"];
        continue;
      }
      for (let a = 0; a < s.length; a++)
        s[a]["year-suffix"] = String.fromCharCode(97 + a);
    }
  }
  function ae(c = {}) {
    if (!e.bibliography) return [];
    u();
    let o = t.map((S) => r.get(S)).filter(Boolean);
    e.bibliographySort && (o = [...o].sort(e.bibliographySort));
    const s = o.map((S) => e.bibliography(S, c)), a = n.subsequentAuthorSubstitute ?? e.meta?.subsequentAuthorSubstitute ?? null;
    return a != null && de(s, o, a), s;
  }
  return {
    addItems: h,
    getItem: g,
    cite: v,
    getBibliography: ae,
    /** Number of items in the registry */
    get size() {
      return r.size;
    }
  };
}
function he(e) {
  if (!e || typeof e.html != "string") return e;
  let n = e.html;
  return n = n.replace(
    /<span class="csl-author"[^>]*>[\s\S]*?<\/span>(,\s*|\s+)?/g,
    ""
  ), n = n.replace(/\(\s+/g, "(").replace(/\s{2,}/g, " ").replace(/\s+,/g, ",").replace(/\(,\s*/g, "("), { text: ge(n), html: n };
}
function ge(e) {
  return e ? String(e).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'") : "";
}
function de(e, n, r) {
  if (e.length < 2) return;
  let t = J(n[0]);
  for (let i = 1; i < e.length; i++) {
    const l = J(n[i]);
    l && l === t && (e[i] = {
      ...e[i],
      text: ye(e[i].text, n[i], r),
      html: Se(e[i].html, n[i], r)
    }), t = l;
  }
}
function J(e) {
  const n = e.author || e.editor || [];
  return n.length ? n.map((r) => r.literal ? r.literal : [r.family, r.given, r["non-dropping-particle"], r["dropping-particle"]].filter(Boolean).join("|")).join(";") : "";
}
function me(e) {
  const n = e.author || e.editor || [];
  return n.length ? n.map((r) => {
    if (r.literal) return r.literal;
    const t = r["non-dropping-particle"] || "";
    return [r["dropping-particle"] || "", t, r.family].filter(Boolean).join(" ");
  }).join(";") : "";
}
function ye(e, n, r) {
  const t = n.author || n.editor || [];
  if (!t.length) return e;
  const i = t[0].literal || t[0].family || "";
  if (!i) return e;
  const l = e.indexOf(i);
  if (l < 0) return e;
  const d = e.indexOf(". (", l), p = e.indexOf(". ", l), h = d >= 0 ? d : p >= 0 ? p : -1;
  return h < 0 ? e : r + e.slice(h);
}
function Se(e, n, r) {
  return e.replace(
    /<span class="csl-author">.*?<\/span>/,
    `<span class="csl-author">${G(r)}</span>`
  );
}
function G(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function we(e) {
  const n = e.author || e.editor || [];
  if (!n.length) return "";
  const r = n.map((i) => i.literal ? i.literal : (i.family || "") + "|" + (i.given || "")).join(";"), t = e.issued?.["date-parts"]?.[0]?.[0];
  return t == null ? "" : r + "/" + t;
}
function xe(e, n, r = {}) {
  if (!e?.bibliography)
    throw new Error("format() requires a compiled style with a bibliography() function");
  return e.bibliography(n, r);
}
function Me(e, n, r = {}) {
  if (!e?.bibliography)
    throw new Error("formatAll() requires a compiled style with a bibliography() function");
  let t = [...n];
  return e.bibliographySort && t.sort(e.bibliographySort), t = t.map((i, l) => ({ ...i, "citation-number": l + 1 })), t.map((i) => e.bibliography(i, r));
}
function Te(e, n, r = {}) {
  if (!e?.citation)
    throw new Error("formatCitation() requires a compiled style with a citation() function");
  const t = n.map((i, l) => i.item && i.item["citation-number"] == null ? { ...i, item: { ...i.item, "citation-number": l + 1 } } : i);
  return e.citation(t, r);
}
const U = {
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
}, Ae = { "&": "&", "%": "%", $: "$", "#": "#", _: "_", "{": "{", "}": "}" }, te = {
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
}, be = {
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
  return e && (e = e.replace(/\\([&%$#_{}])/g, (n, r) => Ae[r] || r), e = e.replace(/\\([`'"^~=.uvcHkd])\{([a-zA-Z])\}/g, (n, r, t) => U[r]?.[t] ?? `${r}${t}`), e = e.replace(/\\([`'"^~])\{\\([ij])\}/g, (n, r, t) => {
    const i = F[t] || t;
    return U[r]?.[i] ?? `${r}${i}`;
  }), e = e.replace(/\\([`'"^~])([a-zA-Z])/g, (n, r, t) => U[r]?.[t] ?? `${r}${t}`), e = e.replace(/\\([uvcHkd=.])\{([a-zA-Z])\}/g, (n, r, t) => U[r]?.[t] ?? `${r}${t}`), e = e.replace(/\\([a-zA-Z]+)\{\}/g, (n, r) => F[r] ?? `\\${r}`), e = e.replace(/\\([a-zA-Z]+)(?=[\s{},;.!?)]|$)/g, (n, r) => F[r] != null ? F[r] : `\\${r}`), e = e.replace(/\\url\{([^}]*)\}/g, "$1"), e = e.replace(/\\(?:emph|textit|textbf|textsc|texttt)\{([^}]*)\}/g, "$1"), e = e.replace(/[{}]/g, ""), e = e.replace(/~/g, " "), e = e.replace(/[\t\n\r ]+/g, " ").trim(), e);
}
function ke(e) {
  const n = { ...te }, r = [];
  let t = 0;
  function i() {
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
    i();
    let g = "";
    for (; t < e.length; ) {
      i();
      let u;
      if (e[t] === "{")
        u = l();
      else if (e[t] === '"')
        u = d();
      else {
        let v = "";
        for (; t < e.length && /[a-zA-Z0-9_.-]/.test(e[t]); )
          v += e[t], t++;
        if (/^\d+$/.test(v))
          u = v;
        else {
          const N = v.toLowerCase();
          u = n[N] != null ? String(n[N]) : v;
        }
      }
      if (g += u, i(), e[t] === "#") {
        t++;
        continue;
      }
      break;
    }
    return g;
  }
  function h(g) {
    const u = g === "{" ? "}" : ")";
    i();
    let v = "";
    for (; t < e.length && e[t] !== "," && e[t] !== u && !/\s/.test(e[t]); )
      v += e[t], t++;
    v = v.trim(), i(), e[t] === "," && t++;
    const N = {};
    for (; t < e.length && e[t] !== u && (i(), e[t] !== u); ) {
      let E = "";
      for (; t < e.length && e[t] !== "=" && e[t] !== u && !/\s/.test(e[t]); )
        E += e[t], t++;
      if (E = E.trim().toLowerCase(), !E || e[t] === u || (i(), e[t] !== "=")) break;
      t++;
      const z = p();
      N[E] = z, i(), e[t] === "," && t++;
    }
    return e[t] === u && t++, { key: v, fields: N };
  }
  for (; t < e.length; ) {
    const g = e.indexOf("@", t);
    if (g === -1) break;
    t = g + 1, i();
    let u = "";
    for (; t < e.length && /[a-zA-Z]/.test(e[t]); )
      u += e[t], t++;
    u = u.toLowerCase(), i();
    const v = e[t];
    if (v !== "{" && v !== "(") continue;
    t++;
    const N = v === "{" ? "}" : ")";
    if (u === "comment") {
      let I = 1;
      for (; t < e.length && I > 0; )
        e[t] === v ? I++ : e[t] === N && I--, t++;
      continue;
    }
    if (u === "preamble") {
      p(), i(), e[t] === N && t++;
      continue;
    }
    if (u === "string") {
      i();
      let I = "";
      for (; t < e.length && e[t] !== "=" && !/\s/.test(e[t]); )
        I += e[t], t++;
      I = I.trim().toLowerCase(), i(), e[t] === "=" && t++;
      const P = p();
      n[I] = P, i(), e[t] === N && t++;
      continue;
    }
    const { key: E, fields: z } = h(v);
    r.push({ type: u, key: E, fields: z });
  }
  return { entries: r, strings: n };
}
function Y(e) {
  return e ? je(e).map((r) => {
    if (r = r.trim(), !r) return null;
    if (r.startsWith("{") && r.endsWith("}"))
      return { literal: _(r.slice(1, -1)) };
    r = _(r);
    const t = ve(r, ",").map((i) => i.trim());
    if (t.length >= 3) {
      const { particle: i, family: l } = Q(t[0]);
      return K({
        family: l,
        given: t[2],
        suffix: t[1],
        "non-dropping-particle": i
      });
    } else if (t.length === 2) {
      const { particle: i, family: l } = Q(t[0]);
      return K({
        family: l,
        given: t[1],
        "non-dropping-particle": i
      });
    } else
      return Ce(r);
  }).filter(Boolean) : [];
}
function je(e) {
  const n = [];
  let r = 0, t = "";
  for (let i = 0; i < e.length; i++) {
    if (e[i] === "{" ? r++ : e[i] === "}" && r--, r === 0 && e.slice(i, i + 5).toLowerCase() === " and ") {
      n.push(t), t = "", i += 4;
      continue;
    }
    t += e[i];
  }
  return n.push(t), n;
}
function ve(e, n) {
  const r = [];
  let t = 0, i = "";
  for (const l of e)
    l === "{" ? t++ : l === "}" && t--, l === n && t === 0 ? (r.push(i), i = "") : i += l;
  return r.push(i), r;
}
function Q(e) {
  const n = e.trim().split(/\s+/);
  if (n.length <= 1) return { particle: null, family: e.trim() };
  let r = 0;
  for (let t = 0; t < n.length - 1 && (n[t][0] && n[t][0] === n[t][0].toLowerCase() && /[a-z]/.test(n[t][0])); t++)
    r = t + 1;
  return r === 0 ? { particle: null, family: e.trim() } : {
    particle: n.slice(0, r).join(" "),
    family: n.slice(r).join(" ")
  };
}
function Ce(e) {
  const n = e.trim().split(/\s+/);
  if (n.length === 1) return { family: n[0] };
  let r = -1;
  for (let p = 1; p < n.length - 1; p++)
    if (n[p][0] && n[p][0] === n[p][0].toLowerCase() && /[a-z]/.test(n[p][0])) {
      r = p;
      break;
    }
  if (r === -1)
    return {
      given: n.slice(0, -1).join(" "),
      family: n[n.length - 1]
    };
  let t = n.length - 1;
  for (let p = n.length - 2; p >= r && !(n[p][0] && n[p][0] === n[p][0].toUpperCase()); p--)
    t = p;
  const i = n.slice(0, r).join(" ") || void 0, l = n.slice(r, t).join(" ") || void 0, d = n.slice(t).join(" ");
  return K({
    given: i,
    family: d,
    "non-dropping-particle": l
  });
}
function K(e) {
  const n = {};
  for (const [r, t] of Object.entries(e))
    t != null && t !== "" && (n[r] = t);
  return n;
}
function Ie(e) {
  const { type: n, key: r, fields: t } = e, i = {
    id: r,
    type: be[n] || "article"
  };
  n === "phdthesis" ? i.genre = "PhD thesis" : n === "mastersthesis" && (i.genre = "Master's thesis"), t.author && (i.author = Y(t.author)), t.editor && (i.editor = Y(t.editor)), t.translator && (i.translator = Y(t.translator)), t.title && (i.title = _(t.title)), t.journal ? i["container-title"] = _(t.journal) : t.booktitle && (i["container-title"] = _(t.booktitle));
  const l = t.year ? parseInt(t.year, 10) : null, d = t.month != null ? $e(t.month) : null;
  if (l) {
    const h = [l];
    d && h.push(d), i.issued = { "date-parts": [h] };
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
      g === "page" && (u = u.replace(/--/g, "–")), i[g] = u;
    }
  if (i.publisher || (t.school ? i.publisher = _(t.school) : t.institution && (i.publisher = _(t.institution))), t.howpublished && !i.URL) {
    const h = _(t.howpublished);
    /^https?:\/\//i.test(h) && (i.URL = h);
  }
  return i;
}
function $e(e) {
  if (typeof e == "number") return e;
  const n = String(e).trim().toLowerCase(), r = parseInt(n, 10);
  return !isNaN(r) && r >= 1 && r <= 12 ? r : te[n.slice(0, 3)] || null;
}
function Pe(e) {
  if (!e || typeof e != "string") return [];
  const { entries: n } = ke(e);
  return n.map((r) => Ie(r));
}
const Ne = {
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
}, Le = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
function De(e) {
  if (e.literal) return `{${e.literal}}`;
  const n = [], r = e["non-dropping-particle"] || e["dropping-particle"] || "", t = (r ? r + " " : "") + (e.family || "");
  return e.suffix ? (n.push(t), n.push(e.suffix), e.given && n.push(e.given), n.join(", ")) : e.given ? `${t}, ${e.given}` : t;
}
function ee(e) {
  return !e || !e.length ? null : e.map(De).join(" and ");
}
function Z(e) {
  return e == null ? null : String(e);
}
function T(e) {
  return `{${e}}`;
}
function Ee(e) {
  if (e.id && typeof e.id == "string" && !/\s/.test(e.id)) return e.id;
  let n = "";
  if (e.author && e.author.length) {
    const t = e.author[0];
    n += (t.family || t.literal || "unknown").replace(/\s+/g, "");
  }
  const r = e.issued?.["date-parts"]?.[0]?.[0];
  return r && (n += r), n || "item";
}
function Be(e) {
  return !e || !e.length ? "" : e.map((n) => {
    let r = Ne[n.type] || "misc";
    n.type === "thesis" && n.genre && (n.genre.toLowerCase().includes("master") ? r = "mastersthesis" : r = "phdthesis");
    const t = Ee(n), i = [];
    if (n.author) {
      const h = ee(n.author);
      h && i.push(["author", T(h)]);
    }
    if (n.editor) {
      const h = ee(n.editor);
      h && i.push(["editor", T(h)]);
    }
    if (n.title && i.push(["title", T(Z(n.title))]), n["container-title"]) {
      const h = r === "article" ? "journal" : "booktitle";
      i.push([h, T(Z(n["container-title"]))]);
    }
    const l = n.issued?.["date-parts"]?.[0];
    l && (l[0] && i.push(["year", T(String(l[0]))]), l[1] && l[1] >= 1 && l[1] <= 12 && i.push(["month", Le[l[1] - 1]]));
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
      if (n[h]) {
        let u = String(n[h]);
        g === "pages" && (u = u.replace(/–/g, "--")), i.push([g, T(u)]);
      }
    n.publisher, n.genre && r !== "phdthesis" && r !== "mastersthesis" && i.push(["type", T(Z(n.genre))]);
    const p = i.map(([h, g]) => `  ${h} = ${g}`).join(`,
`);
    return `@${r}{${t},
${p}
}`;
  }).join(`

`) + `
`;
}
export {
  qe as applyTextCase,
  Ue as capitalize,
  _ as convertLatex,
  _e as createRegistry,
  Fe as escapeHtml,
  Be as exportBibtex,
  xe as format,
  Me as formatAll,
  Te as formatCitation,
  Ge as formatDate,
  He as formatNames,
  Je as longOrdinal,
  Qe as ordinal,
  nt as pageRange,
  Pe as parseBibtex,
  et as roman,
  Ye as sentenceCase,
  Ze as stripFormatting,
  Ke as stripNocaseSpans,
  Xe as titleCase,
  Ve as toHtml,
  Oe as validateItem
};
//# sourceMappingURL=index-CxzhyvpC.js.map
