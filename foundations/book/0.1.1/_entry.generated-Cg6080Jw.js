import { jsx as f, Fragment as Xe, jsxs as k } from "react/jsx-runtime";
import { getUniweb as Be } from "@uniweb/core";
import { useState as X, useCallback as xt, useMemo as Te, Suspense as ta, useEffect as be, memo as ua, useRef as aa, createContext as nu, createElement as iu, useContext as ra } from "react";
import { renderToStaticMarkup as bt } from "react-dom/server";
const Pt = {
  en: { chapter: "Chapter", by: "by" },
  fr: { chapter: "Chapitre", by: "par" },
  es: { chapter: "Capítulo", by: "por" },
  de: { chapter: "Kapitel", by: "von" },
  pt: { chapter: "Capítulo", by: "por" },
  it: { chapter: "Capitolo", by: "di" },
  nl: { chapter: "Hoofdstuk", by: "door" }
}, yt = "en";
function ou({ language: e, overrides: t } = {}) {
  const u = (e || yt).toLowerCase().split("-")[0];
  return { ...Pt[u] || Pt[yt], ...t || {} };
}
function cu({ language: e, labels: t } = {}) {
  const u = ou({ language: e, overrides: t });
  return String.raw`// preamble.typ — named functions used by Press/typst section fragments.

// ─── Chapter opener ──────────────────────────────────────────────────────
#let chapter-opener(number: none, title: "", subtitle: "") = {
  pagebreak(weak: true)
  v(1.5in)
  if number != none {
    align(
      center,
      text(size: 11pt, weight: "regular", fill: luma(90))[
        ${sa(u.chapter)} #number
      ],
    )
    v(0.4em)
  }
  align(
    center,
    par(
      justify: false,
      text(size: 20pt, weight: "bold")[#title],
    ),
  )
  if subtitle != "" {
    v(0.4em)
    align(
      center,
      text(size: 13pt, style: "italic", fill: luma(60))[#subtitle],
    )
  }
  v(1.5em)
}

// ─── Section break ───────────────────────────────────────────────────────
#let section-break() = {
  v(1em)
  align(center, text(size: 12pt, "⁂"))
  v(1em)
}
`;
}
function sa(e) {
  return String(e).replace(/[\\#\*_\[\]]/g, (t) => "\\" + t);
}
cu();
const Ne = {
  "trade-6x9": {
    width: "6in",
    height: "9in",
    margins: {
      inside: "0.75in",
      outside: "0.5in",
      top: "0.75in",
      bottom: "0.75in"
    }
  },
  "trade-7x10": {
    width: "7in",
    height: "10in",
    margins: {
      inside: "0.875in",
      outside: "0.625in",
      top: "0.875in",
      bottom: "0.875in"
    }
  },
  "crown-octavo": {
    // 189 × 246 mm — common UK trade hardcover
    width: "7.44in",
    height: "9.69in",
    margins: {
      inside: "0.875in",
      outside: "0.625in",
      top: "0.875in",
      bottom: "0.875in"
    }
  },
  "royal-octavo": {
    // 156 × 234 mm — common academic hardcover
    width: "6.14in",
    height: "9.21in",
    margins: {
      inside: "0.75in",
      outside: "0.55in",
      top: "0.75in",
      bottom: "0.75in"
    }
  },
  a5: {
    width: "148mm",
    height: "210mm",
    margins: {
      inside: "18mm",
      outside: "14mm",
      top: "18mm",
      bottom: "18mm"
    }
  }
}, kt = "trade-6x9", na = {
  bodySize: "11pt",
  leading: "0.72em",
  firstLineIndent: "1.4em",
  // Code block + inline code sizes. Smaller values fit more characters
  // per line — useful on narrow trims where long code lines wrap. For
  // 6x9 trade paperback, 8pt / 9pt is a common tighter choice; for
  // 7x10 the 9pt / 9.5pt default usually has enough column space.
  codeBlockSize: "9pt",
  codeInlineSize: "9.5pt",
  // codeMarginRelief lets code blocks extend beyond the body text
  // column, gaining horizontal room for long code lines. Typst
  // symmetrically pads negatively on both sides, so a value of
  // "0.25in" gives code blocks 0.5in of extra width total. Default
  // "0pt" → no relief (byte-identical to pre-parameterisation output).
  codeMarginRelief: "0pt",
  // Fonts default to null → template omits `#set text(font: ...)` and
  // Typst uses its own default (currently New Computer Modern for
  // serif, DejaVu Sans Mono for raw).
  bodyFont: null,
  headingFont: null,
  codeFont: null
}, ia = {
  titlePage: !0,
  copyrightPage: !0,
  toc: !0,
  tocDepth: 2,
  // 'none'   — current behavior: front matter unnumbered, body starts 1 arabic.
  // 'roman'  — front matter numbered i, ii, iii…; body resets to 1 arabic.
  // 'arabic' — front matter numbered 1, 2, 3…, continuing into body.
  frontMatterNumbering: "none"
}, oa = /* @__PURE__ */ new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "math",
  "emoji",
  "fangsong",
  "inherit",
  "initial",
  "unset"
]), ca = /* @__PURE__ */ new Set([
  "-apple-system",
  "blinkmacsystemfont",
  "-webkit-system"
]);
function la(e) {
  if (e == null) return Mt(Ne[kt]);
  if (typeof e == "string") {
    const t = Ne[e];
    if (!t)
      throw new Error(
        `[@uniweb/book] unknown trim preset "${e}". Available: ${Object.keys(Ne).join(", ")}`
      );
    return Mt(t);
  }
  if (typeof e == "object") {
    const t = e.preset || kt, u = Ne[t];
    if (!u)
      throw new Error(
        `[@uniweb/book] unknown trim preset "${t}". Available: ${Object.keys(Ne).join(", ")}`
      );
    return {
      width: e.width ?? u.width,
      height: e.height ?? u.height,
      margins: { ...u.margins, ...e.margins || {} }
    };
  }
  throw new Error(
    `[@uniweb/book] invalid trim value: ${JSON.stringify(e)}`
  );
}
function da(e) {
  const t = { ...na, ...e || {} };
  return {
    bodySize: t.bodySize,
    leading: t.leading,
    firstLineIndent: t.firstLineIndent,
    codeBlockSize: t.codeBlockSize,
    codeInlineSize: t.codeInlineSize,
    codeMarginRelief: t.codeMarginRelief,
    bodyFont: De(t.bodyFont),
    headingFont: De(t.headingFont),
    codeFont: De(t.codeFont)
  };
}
function ha(e) {
  const t = { ...ia, ...e || {} }, u = ["none", "roman", "arabic"];
  if (!u.includes(t.frontMatterNumbering))
    throw new Error(
      `[@uniweb/book] invalid structure.frontMatterNumbering "${t.frontMatterNumbering}". Allowed: ${u.join(", ")}`
    );
  return t;
}
function De(e) {
  if (e == null || e === "") return null;
  let t = [];
  if (Array.isArray(e))
    t = e;
  else if (typeof e == "string")
    t = e.split(",");
  else
    return null;
  const u = t.map((s) => String(s).trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
  if (u.some((s) => ca.has(s.toLowerCase())))
    return null;
  const r = u.filter(
    (s) => !oa.has(s.toLowerCase())
  );
  return r.length ? r : null;
}
function Mt(e) {
  return { ...e, margins: { ...e.margins } };
}
function lu({
  trim: e,
  typography: t,
  structure: u,
  labels: r,
  language: s,
  covers: i
} = {}) {
  const l = la(e), d = da(t), m = ha(u), p = ou({ language: s, overrides: r }), g = i || {}, N = Ea(d), I = _a(g.front) + ma(m.frontMatterNumbering) + Ta(m.titlePage, p) + ba(m.copyrightPage) + pa(m.toc, m.tocDepth) + ga(m.frontMatterNumbering) + Aa(g.back);
  return String.raw`// template.typ — generated by @uniweb/book

#let template(meta: (:), doc) = [
  // ── Document metadata ───────────────────────────────────────────────
  #set document(
    title: meta.at("title", default: ""),
    author: meta.at("author", default: ""),
  )

  // ── Page geometry ──────────────────────────────────────────────────
  #set page(
    width: ${l.width},
    height: ${l.height},
    margin: (
      inside: ${l.margins.inside},
      outside: ${l.margins.outside},
      top: ${l.margins.top},
      bottom: ${l.margins.bottom},
    ),
    header: context {
      let current-page = here().page()
      let all-chapters = query(heading.where(level: 1))
      let on-opener = all-chapters
        .filter(h => h.location().page() == current-page)
        .len() > 0
      if on-opener {
        []
      } else {
        let pg = counter(page).get().first()
        let chapters = query(heading.where(level: 1).before(here()))
        let current-chapter = if chapters.len() > 0 {
          chapters.last().body
        } else {
          ""
        }
        if calc.odd(pg) {
          align(right, smallcaps(current-chapter))
        } else {
          align(left, smallcaps(meta.at("title", default: "")))
        }
      }
    },
    footer: context {
      let pg = counter(page).get().first()
      if calc.odd(pg) {
        align(right, counter(page).display("1"))
      } else {
        align(left, counter(page).display("1"))
      }
    },
  )

  // ── Typography ──────────────────────────────────────────────────────
  #set text(
    size: ${d.bodySize},
    lang: meta.at("language", default: "en"),
    hyphenate: true,
    costs: (orphan: 100%, widow: 100%),
  )${N}
  #set par(
    justify: true,
    leading: ${d.leading},
    first-line-indent: ${d.firstLineIndent},
  )

${fa(d)}

  #set heading(numbering: "1.")

  #show heading.where(level: 2): it => {
    block(above: 1.6em, below: 0.9em)[
      #text(size: 14pt, weight: "bold")[#it.body]
    ]
  }
  #show heading.where(level: 3): it => {
    block(above: 1.2em, below: 0.7em)[
      #text(size: 12pt, weight: "bold")[#it.body]
    ]
  }

  #show figure.caption: it => align(left, text(size: 9pt, it))

${I}]
`;
}
function fa(e) {
  const t = (e.codeMarginRelief || "0pt").toString().trim(), u = t !== "" && t !== "0" && t !== "0pt", r = `  #show raw.where(block: false): set text(size: ${e.codeInlineSize})`;
  return u ? [
    `  #show raw.where(block: true): it => pad(x: -${t}, block(`,
    "    fill: luma(240),",
    "    radius: 4pt,",
    "    inset: (x: 12pt, y: 12pt),",
    "    width: 100%,",
    `    text(size: ${e.codeBlockSize}, it),`,
    "  ))",
    r
  ].join(`
`) : [
    "  #show raw.where(block: true): set block(",
    "    fill: luma(240),",
    "    radius: 4pt,",
    "    inset: (x: 12pt, y: 12pt),",
    "    width: 100%,",
    "  )",
    `  #show raw.where(block: true): set text(size: ${e.codeBlockSize})`,
    r
  ].join(`
`);
}
function Ea(e) {
  const t = [];
  return e.bodyFont && t.push(`  #set text(font: ${at(e.bodyFont)})`), e.headingFont && t.push(
    `  #show heading: set text(font: ${at(e.headingFont)})`
  ), e.codeFont && t.push(`  #show raw: set text(font: ${at(e.codeFont)})`), t.length ? `
` + t.join(`
`) : "";
}
function at(e) {
  return e.length === 1 ? `"${Qe(e[0])}"` : `(${e.map((u) => `"${Qe(u)}"`).join(", ")})`;
}
function ma(e) {
  return e === "roman" ? `  // ── Front-matter numbering ─────────────────────────────────────────
  #set page(numbering: "i")

` : e === "arabic" ? `  // ── Front-matter numbering ─────────────────────────────────────────
  #set page(numbering: "1")

` : "";
}
function Ta(e, t) {
  return e ? `  // ── Title page ──────────────────────────────────────────────────────
  #pagebreak(to: "even")
  #page(header: none, footer: none, numbering: none)[
    #v(3in)
    #align(center, text(size: 24pt, weight: "bold")[#meta.at("title", default: "")])
    #if meta.at("subtitle", default: "") != "" [
      #v(0.6em)
      #align(
        center,
        text(size: 13pt, style: "italic", fill: luma(60))[#meta.subtitle],
      )
    ]
    #v(1.2em)
    #align(center, text(size: 13pt)[${Na(t.by)} #meta.at("author", default: "")])
  ]
  #pagebreak()

` : "";
}
function ba(e) {
  return e ? String.raw`  // ── Copyright / colophon page ───────────────────────────────────────
  #page(header: none, footer: none, numbering: none)[
    #v(1fr)
    #align(center, [
      #text(size: 9pt, fill: luma(90))[
        #meta.at("rights", default: "")
        #if meta.at("isbn", default: "") != "" [ \\ ISBN #meta.isbn ]
        #if meta.at("publisher", default: "") != "" [ \\ #meta.publisher ]
      ]
    ])
  ]
  #pagebreak(to: "even")

` : "";
}
function pa(e, t) {
  return e ? `  // ── Table of contents ───────────────────────────────────────────────
  #set outline.entry(fill: repeat([.], gap: 0.25em))
  #outline(
    indent: auto,
    depth: meta.at("toc_depth", default: ${t}),
  )
  #pagebreak()

` : "";
}
function ga(e) {
  return `  // ── Body ────────────────────────────────────────────────────────────
${e === "arabic" ? '  #set page(numbering: "1")' : `  #set page(numbering: "1")
  #counter(page).update(1)`}

  #doc
`;
}
function _a(e) {
  return e ? `  // ── Front cover ─────────────────────────────────────────────────────
  #page(
    margin: (x: 0cm, y: 0cm),
    header: none,
    footer: none,
    numbering: none,
  )[#image("${Qe(e)}", width: 100%, height: 100%)]

` : "";
}
function Aa(e) {
  return e ? `
  // ── Back cover ──────────────────────────────────────────────────────
  #page(
    margin: (x: 0cm, y: 0cm),
    header: none,
    footer: none,
    numbering: none,
  )[#image("${Qe(e)}", width: 100%, height: 100%)]
` : "";
}
function Qe(e) {
  return String(e).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function Na(e) {
  return String(e).replace(/[\\#\*_\[\]]/g, (t) => "\\" + t);
}
lu();
const Ia = String.raw`
/* Hidden metadata block — the DOM carries it for CSS string-set / string() */
[data-pagedjs-metadata] { display: none; }

/* Page geometry — 6×9 US trade size */
@page {
  size: 6in 9in;
  margin: 0.75in 0.5in 0.75in 0.75in;
}
@page :left  { margin: 0.75in 0.75in 0.75in 0.5in; }
@page :right { margin: 0.75in 0.5in 0.75in 0.75in; }

/* Named string: each h1 updates the running-header chapter name */
h1 { string-set: chapter content(); }

@page :left  { @top-left  { content: string(chapter); font-size: 9pt; color: #666; } }
@page :right { @top-right { content: string(chapter); font-size: 9pt; color: #666; } }

/* Page-number footer */
@page :left  { @bottom-left  { content: counter(page); font-size: 9pt; } }
@page :right { @bottom-right { content: counter(page); font-size: 9pt; } }

/* Chapter openers start on a right-hand page, no running header */
h1 {
  break-before: recto;
  page: chapter-opener;
  font-size: 22pt;
  margin-top: 2in;
}
@page chapter-opener {
  @top-left { content: none; }
  @top-right { content: none; }
}

/* Body typography */
body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 11pt;
  line-height: 1.45;
  hyphens: auto;
}
/* No paragraph indent on first paragraph (Paged.js 0.4.3 chokes on the
 * combined first-of-type + sibling selector; use a class when needed). */
p { margin: 0 0 0.75em; text-indent: 1.25em; }
p.lead, p:first-child { text-indent: 0; }

h2 { font-size: 14pt; margin: 1.5em 0 0.5em; page-break-after: avoid; }
h3 { font-size: 12pt; margin: 1.2em 0 0.4em; page-break-after: avoid; }
h4 { font-size: 11pt; margin: 1em 0 0.3em; page-break-after: avoid; font-weight: 700; }

/* Code */
code { font-family: ui-monospace, Menlo, monospace; font-size: 0.92em; }
pre {
  font-size: 9.5pt;
  padding: 0.8em;
  background: #f5f5f5;
  overflow: hidden;
  page-break-inside: avoid;
}

/* Quotes */
blockquote {
  border-left: 3px solid #ccc;
  margin: 1em 0;
  padding: 0 0 0 1em;
  color: #444;
  font-style: italic;
}

/* Lists */
ul, ol { margin: 0.5em 0 0.75em 1.5em; }

/* Figures — keep together */
figure { break-inside: avoid; margin: 1em 0; }
figure img { max-width: 100%; height: auto; }
figure figcaption { font-size: 9.5pt; color: #555; margin-top: 0.4em; }

/* Tables — avoid splitting rows across pages */
table { border-collapse: collapse; width: 100%; margin: 1em 0; }
table, th, td { page-break-inside: avoid; }
th, td { border: 1px solid #ddd; padding: 0.35em 0.5em; font-size: 10pt; }

/* Links — faint underline, same colour as body in print */
a { color: inherit; text-decoration: underline; text-decoration-thickness: 0.5pt; }
`;
function je(e) {
  const t = e?.config?.book || {}, u = {
    title: t.title ?? e?.config?.name ?? "Book",
    subtitle: t.subtitle,
    author: t.author,
    date: t.date,
    language: t.language ?? e?.config?.language,
    isbn: t.isbn,
    identifier: t.identifier,
    rights: t.rights,
    publisher: t.publisher,
    subject: t.subject,
    description: t.description,
    coverImage: t.coverImage ?? t["cover-image"],
    hook: t.hook,
    blurb: t.blurb,
    tocDepth: t.tocDepth ?? t["toc-depth"] ?? 2
  };
  for (const r of Object.keys(u))
    u[r] == null && delete u[r];
  return u;
}
async function Ca(e, t) {
  const u = {}, r = {};
  if (!e || typeof t != "function")
    return { bundlePaths: u, assets: r };
  for (const s of ["front", "back"]) {
    const i = e?.[s];
    if (i)
      try {
        const l = await t(i);
        if (!l) continue;
        const d = "covers/" + Sa(i, s);
        u[s] = d, r[d] = l;
      } catch {
      }
  }
  return { bundlePaths: u, assets: r };
}
function Sa(e, t) {
  return String(e).split(/[?#]/)[0].split("/").filter(Boolean).pop() || t + ".png";
}
function La(e) {
  const t = { ...e || {} };
  if (typeof document > "u") return t;
  const u = getComputedStyle(document.documentElement);
  if (t.bodyFont == null) {
    const r = De(u.getPropertyValue("--font-body"));
    r && (t.bodyFont = r);
  }
  if (t.headingFont == null) {
    const r = De(u.getPropertyValue("--font-heading"));
    r && (t.headingFont = r);
  }
  return t;
}
async function Bt(e, { mode: t = "sources", endpoint: u, loadAsset: r } = {}) {
  const s = e?.config?.book || {}, i = s.language ?? e?.config?.language, l = je(e), d = La(s.typography), { bundlePaths: m, assets: p } = await Ca(
    s.covers,
    r
  ), g = lu({
    trim: s.trim,
    typography: d,
    structure: s.structure,
    labels: s.labels,
    language: i,
    covers: m
  }), N = cu({
    language: i,
    labels: s.labels
  });
  return {
    adapterOptions: {
      mode: t,
      meta: l,
      preamble: N,
      template: g,
      assets: p,
      endpoint: u
    }
  };
}
async function Oa(e) {
  return {
    adapterOptions: {
      mode: "html",
      meta: je(e),
      stylesheet: Ia
    }
  };
}
async function Ra(e, { loadAsset: t } = {}) {
  const u = e?.config?.book || {}, r = u.covers?.front ?? u.coverImage;
  return {
    adapterOptions: {
      meta: je(e),
      cover: r,
      loadAsset: t
    }
  };
}
const ot = {
  defaultSection: "Chapter",
  defaultLayout: "BookLayout",
  // Foundation-wide props accessible via website.foundationProps.
  props: {},
  // Declared document outputs. Hosts (the in-page Download button,
  // unipress compile) consume this map via compileDocument(website,
  // { format, foundation }). getOptions receives the caller's rest
  // options (mode, endpoint, rootPath, …) and returns the adapterOptions
  // for the underlying Press format adapter.
  outputs: {
    typst: {
      extension: "zip",
      getOptions: (e, t) => Bt(e, t)
    },
    pdf: {
      extension: "pdf",
      via: "typst",
      getOptions: (e, t) => Bt(e, t)
    },
    pagedjs: {
      extension: "html",
      getOptions: Oa
    },
    epub: {
      extension: "epub",
      getOptions: Ra
    }
  }
};
function ce() {
  const t = Be()?.activeWebsite;
  if (!t)
    throw new Error(
      "[Kit] useWebsite() called before runtime initialization. Components must be rendered within a properly initialized Uniweb runtime."
    );
  return {
    /**
     * The active Website instance
     */
    website: t,
    /**
     * Localize a multilingual value
     * @param {Object|string} value - Object with language keys or string
     * @param {string} defaultVal - Fallback value
     * @returns {string}
     */
    localize: (u, r = "") => t.localize(u, r),
    /**
     * Transform a href (handles topic: protocol, etc.)
     * @param {string} href
     * @returns {string}
     */
    makeHref: (u) => t.makeHref(u),
    /**
     * Get current language code
     * @returns {string}
     */
    getLanguage: () => t.getLanguage(),
    /**
     * Get available languages
     * @returns {Array<{label: string, value: string}>}
     */
    getLanguages: () => t.getLanguages(),
    /**
     * Get routing components (Link, useNavigate, etc.)
     * @returns {Object}
     */
    getRoutingComponents: () => t.getRoutingComponents()
  };
}
function du(e) {
  var t, u, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (t = 0; t < s; t++) e[t] && (u = du(e[t])) && (r && (r += " "), r += u);
  } else for (u in e) e[u] && (r && (r += " "), r += u);
  return r;
}
function Da() {
  for (var e, t, u = 0, r = "", s = arguments.length; u < s; u++) (e = arguments[u]) && (t = du(e)) && (r && (r += " "), r += t);
  return r;
}
const pt = "-", xa = (e) => {
  const t = ya(e), {
    conflictingClassGroups: u,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (l) => {
      const d = l.split(pt);
      return d[0] === "" && d.length !== 1 && d.shift(), hu(d, t) || Pa(l);
    },
    getConflictingClassGroupIds: (l, d) => {
      const m = u[l] || [];
      return d && r[l] ? [...m, ...r[l]] : m;
    }
  };
}, hu = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const u = e[0], r = t.nextPart.get(u), s = r ? hu(e.slice(1), r) : void 0;
  if (s)
    return s;
  if (t.validators.length === 0)
    return;
  const i = e.join(pt);
  return t.validators.find(({
    validator: l
  }) => l(i))?.classGroupId;
}, wt = /^\[(.+)\]$/, Pa = (e) => {
  if (wt.test(e)) {
    const t = wt.exec(e)[1], u = t?.substring(0, t.indexOf(":"));
    if (u)
      return "arbitrary.." + u;
  }
}, ya = (e) => {
  const {
    theme: t,
    prefix: u
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Ma(Object.entries(e.classGroups), u).forEach(([i, l]) => {
    ct(l, r, i, t);
  }), r;
}, ct = (e, t, u, r) => {
  e.forEach((s) => {
    if (typeof s == "string") {
      const i = s === "" ? t : Ft(t, s);
      i.classGroupId = u;
      return;
    }
    if (typeof s == "function") {
      if (ka(s)) {
        ct(s(r), t, u, r);
        return;
      }
      t.validators.push({
        validator: s,
        classGroupId: u
      });
      return;
    }
    Object.entries(s).forEach(([i, l]) => {
      ct(l, Ft(t, i), u, r);
    });
  });
}, Ft = (e, t) => {
  let u = e;
  return t.split(pt).forEach((r) => {
    u.nextPart.has(r) || u.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), u = u.nextPart.get(r);
  }), u;
}, ka = (e) => e.isThemeGetter, Ma = (e, t) => t ? e.map(([u, r]) => {
  const s = r.map((i) => typeof i == "string" ? t + i : typeof i == "object" ? Object.fromEntries(Object.entries(i).map(([l, d]) => [t + l, d])) : i);
  return [u, s];
}) : e, Ba = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, u = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const s = (i, l) => {
    u.set(i, l), t++, t > e && (t = 0, r = u, u = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let l = u.get(i);
      if (l !== void 0)
        return l;
      if ((l = r.get(i)) !== void 0)
        return s(i, l), l;
    },
    set(i, l) {
      u.has(i) ? u.set(i, l) : s(i, l);
    }
  };
}, fu = "!", wa = (e) => {
  const {
    separator: t,
    experimentalParseClassName: u
  } = e, r = t.length === 1, s = t[0], i = t.length, l = (d) => {
    const m = [];
    let p = 0, g = 0, N;
    for (let S = 0; S < d.length; S++) {
      let R = d[S];
      if (p === 0) {
        if (R === s && (r || d.slice(S, S + i) === t)) {
          m.push(d.slice(g, S)), g = S + i;
          continue;
        }
        if (R === "/") {
          N = S;
          continue;
        }
      }
      R === "[" ? p++ : R === "]" && p--;
    }
    const I = m.length === 0 ? d : d.substring(g), A = I.startsWith(fu), _ = A ? I.substring(1) : I, C = N && N > g ? N - g : void 0;
    return {
      modifiers: m,
      hasImportantModifier: A,
      baseClassName: _,
      maybePostfixModifierPosition: C
    };
  };
  return u ? (d) => u({
    className: d,
    parseClassName: l
  }) : l;
}, Fa = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let u = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...u.sort(), r), u = []) : u.push(r);
  }), t.push(...u.sort()), t;
}, Ha = (e) => ({
  cache: Ba(e.cacheSize),
  parseClassName: wa(e),
  ...xa(e)
}), Ua = /\s+/, va = (e, t) => {
  const {
    parseClassName: u,
    getClassGroupId: r,
    getConflictingClassGroupIds: s
  } = t, i = [], l = e.trim().split(Ua);
  let d = "";
  for (let m = l.length - 1; m >= 0; m -= 1) {
    const p = l[m], {
      modifiers: g,
      hasImportantModifier: N,
      baseClassName: I,
      maybePostfixModifierPosition: A
    } = u(p);
    let _ = !!A, C = r(_ ? I.substring(0, A) : I);
    if (!C) {
      if (!_) {
        d = p + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (C = r(I), !C) {
        d = p + (d.length > 0 ? " " + d : d);
        continue;
      }
      _ = !1;
    }
    const S = Fa(g).join(":"), R = N ? S + fu : S, O = R + C;
    if (i.includes(O))
      continue;
    i.push(O);
    const x = s(C, _);
    for (let B = 0; B < x.length; ++B) {
      const W = x[B];
      i.push(R + W);
    }
    d = p + (d.length > 0 ? " " + d : d);
  }
  return d;
};
function Ya() {
  let e = 0, t, u, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (u = Eu(t)) && (r && (r += " "), r += u);
  return r;
}
const Eu = (e) => {
  if (typeof e == "string")
    return e;
  let t, u = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Eu(e[r])) && (u && (u += " "), u += t);
  return u;
};
function Wa(e, ...t) {
  let u, r, s, i = l;
  function l(m) {
    const p = t.reduce((g, N) => N(g), e());
    return u = Ha(p), r = u.cache.get, s = u.cache.set, i = d, d(m);
  }
  function d(m) {
    const p = r(m);
    if (p)
      return p;
    const g = va(m, u);
    return s(m, g), g;
  }
  return function() {
    return i(Ya.apply(null, arguments));
  };
}
const y = (e) => {
  const t = (u) => u[e] || [];
  return t.isThemeGetter = !0, t;
}, mu = /^\[(?:([a-z-]+):)?(.+)\]$/i, Ga = /^\d+\/\d+$/, Qa = /* @__PURE__ */ new Set(["px", "full", "screen"]), qa = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Va = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, za = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Ka = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Xa = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Z = (e) => me(e) || Qa.has(e) || Ga.test(e), ue = (e) => _e(e, "length", ar), me = (e) => !!e && !Number.isNaN(Number(e)), rt = (e) => _e(e, "number", me), Ie = (e) => !!e && Number.isInteger(Number(e)), ja = (e) => e.endsWith("%") && me(e.slice(0, -1)), L = (e) => mu.test(e), ae = (e) => qa.test(e), $a = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ja = (e) => _e(e, $a, Tu), Za = (e) => _e(e, "position", Tu), er = /* @__PURE__ */ new Set(["image", "url"]), tr = (e) => _e(e, er, sr), ur = (e) => _e(e, "", rr), Ce = () => !0, _e = (e, t, u) => {
  const r = mu.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : u(r[2]) : !1;
}, ar = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Va.test(e) && !za.test(e)
), Tu = () => !1, rr = (e) => Ka.test(e), sr = (e) => Xa.test(e), nr = () => {
  const e = y("colors"), t = y("spacing"), u = y("blur"), r = y("brightness"), s = y("borderColor"), i = y("borderRadius"), l = y("borderSpacing"), d = y("borderWidth"), m = y("contrast"), p = y("grayscale"), g = y("hueRotate"), N = y("invert"), I = y("gap"), A = y("gradientColorStops"), _ = y("gradientColorStopPositions"), C = y("inset"), S = y("margin"), R = y("opacity"), O = y("padding"), x = y("saturate"), B = y("scale"), W = y("sepia"), V = y("skew"), le = y("space"), $ = y("translate"), U = () => ["auto", "contain", "none"], te = () => ["auto", "hidden", "clip", "visible", "scroll"], Y = () => ["auto", L, t], P = () => [L, t], H = () => ["", Z, ue], de = () => ["auto", me, L], Ot = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], He = () => ["solid", "dashed", "dotted", "double", "none"], Rt = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ut = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], Ae = () => ["", "0", L], Dt = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], J = () => [me, L];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Ce],
      spacing: [Z, ue],
      blur: ["none", "", ae, L],
      brightness: J(),
      borderColor: [e],
      borderRadius: ["none", "", "full", ae, L],
      borderSpacing: P(),
      borderWidth: H(),
      contrast: J(),
      grayscale: Ae(),
      hueRotate: J(),
      invert: Ae(),
      gap: P(),
      gradientColorStops: [e],
      gradientColorStopPositions: [ja, ue],
      inset: Y(),
      margin: Y(),
      opacity: J(),
      padding: P(),
      saturate: J(),
      scale: J(),
      sepia: Ae(),
      skew: J(),
      space: P(),
      translate: P()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", L]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ae]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": Dt()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": Dt()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...Ot(), L]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: te()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": te()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": te()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: U()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": U()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": U()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [C]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [C]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [C]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [C]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [C]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [C]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [C]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [C]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [C]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", Ie, L]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: Y()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", L]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: Ae()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: Ae()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Ie, L]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Ce]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Ie, L]
        }, L]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": de()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": de()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Ce]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Ie, L]
        }, L]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": de()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": de()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", L]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", L]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [I]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [I]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [I]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...ut()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ut(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...ut(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [O]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [O]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [O]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [O]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [O]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [O]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [O]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [O]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [O]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [S]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [S]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [S]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [S]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [S]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [S]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [S]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [S]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [S]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [le]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [le]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", L, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [L, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [L, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [ae]
        }, ae]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [L, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [L, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [L, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [L, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", ae, ue]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", rt]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Ce]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", L]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", me, rt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Z, L]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", L]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", L]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [R]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [R]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...He(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Z, ue]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Z, L]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: P()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", L]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", L]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [R]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...Ot(), Za]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Ja]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, tr]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [_]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [_]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [_]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [A]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [A]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [A]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [i]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [i]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [i]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [i]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [i]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [i]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [i]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [i]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [i]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [i]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [i]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [i]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [i]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [i]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [i]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [d]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [d]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [d]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [d]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [d]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [d]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [d]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [d]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [d]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [R]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...He(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [d]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [d]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [R]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: He()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [s]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [s]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [s]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [s]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [s]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [s]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [s]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [s]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [s]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [s]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...He()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Z, L]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Z, ue]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: H()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [R]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Z, ue]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", ae, ur]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Ce]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [R]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Rt(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Rt()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [u]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [m]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", ae, L]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [p]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [g]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [N]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [x]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [W]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [u]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [m]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [p]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [g]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [N]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [R]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [x]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [W]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [l]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [l]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [l]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", L]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: J()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", L]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: J()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", L]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [B]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [B]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [B]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Ie, L]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [$]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [$]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [V]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [V]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", L]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", L]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": P()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": P()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": P()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": P()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": P()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": P()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": P()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": P()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": P()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": P()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": P()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": P()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": P()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": P()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": P()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": P()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": P()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": P()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", L]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Z, ue, rt]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, ir = /* @__PURE__ */ Wa(nr), or = [
  "lu",
  "hi",
  "hi2",
  "pi",
  "tb",
  "fi",
  "bs",
  "md",
  "ai",
  "ri",
  "si",
  "io5",
  "bi",
  "vsc",
  "wi",
  "gi",
  "fa",
  "fa6"
], cr = new Set(or);
function Ht(e) {
  if (!e || typeof e != "string") return null;
  const t = e.indexOf(":");
  if (t > 0)
    return { library: e.slice(0, t), name: e.slice(t + 1) };
  const u = e.indexOf("-");
  if (u > 0) {
    const r = e.slice(0, u);
    if (cr.has(r))
      return { library: r, name: e.slice(u + 1) };
  }
  return null;
}
function lr() {
  return globalThis.uniweb.childBlockRenderer;
}
function j(...e) {
  return ir(Da(e));
}
function lt(e) {
  if (!e || typeof e != "string" || e.startsWith("/") || e.startsWith("#")) return !1;
  try {
    return new URL(e, window.location.origin).origin !== window.location.origin;
  } catch {
    return !1;
  }
}
function bu(e) {
  if (!e || typeof e != "string") return !1;
  const t = [
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",
    ".mp3",
    ".wav",
    ".ogg",
    ".flac",
    ".mp4",
    ".avi",
    ".mov",
    ".wmv",
    ".webm",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".svg",
    ".webp",
    ".txt",
    ".csv",
    ".json",
    ".xml"
  ], u = e.toLowerCase();
  return t.some((r) => u.includes(r));
}
function dr(e) {
  if (!e) return "unknown";
  const t = e.toLowerCase();
  return t.includes("youtube.com") || t.includes("youtu.be") ? "youtube" : t.includes("vimeo.com") ? "vimeo" : /\.(mp4|webm|ogg|mov|avi)/.test(t) ? "video" : /\.(mp3|wav|ogg|flac|aac)/.test(t) ? "audio" : /\.(jpg|jpeg|png|gif|svg|webp|avif)/.test(t) ? "image" : "unknown";
}
const hr = {
  "twitter.com": "Twitter",
  "x.com": "X",
  "facebook.com": "Facebook",
  "linkedin.com": "LinkedIn",
  "instagram.com": "Instagram",
  "youtube.com": "YouTube",
  "github.com": "GitHub",
  "medium.com": "Medium"
};
function fr(e) {
  if (!e) return null;
  try {
    const u = new URL(e).hostname.replace("www.", "");
    for (const [r, s] of Object.entries(hr))
      if (u.includes(r)) return s;
  } catch {
  }
  return null;
}
function Er(e, t) {
  if (!e) return "";
  const u = fr(e);
  if (u)
    return t({
      en: `View on ${u}`,
      fr: `Voir sur ${u}`,
      es: `Ver en ${u}`
    });
  if (e.startsWith("mailto:")) {
    const r = e.replace("mailto:", "").split("?")[0];
    return t({
      en: `Send email to ${r}`,
      fr: `Envoyer un e-mail à ${r}`,
      es: `Enviar correo a ${r}`
    });
  }
  if (e.startsWith("tel:")) {
    const r = e.replace("tel:", "");
    return t({
      en: `Call ${r}`,
      fr: `Appeler ${r}`,
      es: `Llamar a ${r}`
    });
  }
  if (bu(e))
    return t({
      en: "Download file",
      fr: "Télécharger le fichier",
      es: "Descargar archivo"
    });
  if (lt(e))
    return t({
      en: "Open external link",
      fr: "Ouvrir le lien externe",
      es: "Abrir enlace externo"
    });
  try {
    const r = new URL(e, window.location.origin), s = decodeURIComponent(r.pathname).replace(/^\/+/, "").replace(/[-_]/g, " ").replace(/\.\w+$/, "").trim();
    if (s)
      return t({
        en: `Go to ${s}`,
        fr: `Aller à ${s}`,
        es: `Ir a ${s}`
      });
  } catch {
  }
  return "";
}
function oe({
  to: e,
  href: t,
  title: u,
  target: r,
  download: s,
  className: i,
  children: l,
  reload: d,
  ...m
}) {
  const { website: p, localize: g, makeHref: N, getRoutingComponents: I } = ce(), A = I()?.Link;
  let _ = t || e || "";
  if ((_.startsWith("topic:") || _.startsWith("page:")) && (_ = N(_)), !d && _.startsWith("/") && !lt(_) && p?.hasMultipleLocales?.()) {
    const x = p.getActiveLocale(), B = p.getDefaultLocale();
    if (x && x !== B) {
      p.translateRoute && (_ = p.translateRoute(_, x));
      const W = `/${x}`;
      !_.startsWith(`${W}/`) && _ !== W && (_ = _ === "/" ? `${W}/` : `${W}${_}`);
    }
  }
  const C = s || bu(_), S = lt(_), R = u || Er(_, g);
  if (d && !C) {
    const x = S ? "" : p?.basePath || "";
    return /* @__PURE__ */ f(
      "a",
      {
        href: x + _,
        title: R,
        className: i,
        ...m,
        children: l
      }
    );
  }
  if (C)
    return /* @__PURE__ */ f(
      "a",
      {
        href: _,
        download: !0,
        target: "_blank",
        rel: "noopener noreferrer",
        title: R,
        className: i,
        ...m,
        children: l
      }
    );
  if (S)
    return /* @__PURE__ */ f(
      "a",
      {
        href: _,
        target: r || "_blank",
        rel: "noopener noreferrer",
        title: R,
        className: i,
        ...m,
        children: l
      }
    );
  if (_.startsWith("mailto:") || _.startsWith("tel:"))
    return /* @__PURE__ */ f(
      "a",
      {
        href: _,
        title: R,
        className: i,
        ...m,
        children: l
      }
    );
  if (A)
    return /* @__PURE__ */ f(
      A,
      {
        to: _,
        title: R,
        className: i,
        ...m,
        children: l
      }
    );
  const O = p?.basePath || "";
  return /* @__PURE__ */ f(
    "a",
    {
      href: O + _,
      title: R,
      className: i,
      ...m,
      children: l
    }
  );
}
const mr = {
  xs: "w-8 h-8",
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
  "2xl": "w-48 h-48",
  full: "w-full h-full"
};
function Tr(e) {
  if (!e || typeof e != "object") return;
  const t = [];
  return e.blur && t.push(`blur(${e.blur}px)`), e.brightness && t.push(`brightness(${e.brightness}%)`), e.contrast && t.push(`contrast(${e.contrast}%)`), e.grayscale && t.push(`grayscale(${e.grayscale}%)`), e.saturate && t.push(`saturate(${e.saturate}%)`), e.sepia && t.push(`sepia(${e.sepia}%)`), t.length > 0 ? t.join(" ") : void 0;
}
function br({
  profile: e,
  type: t,
  size: u,
  value: r,
  src: s,
  url: i,
  alt: l = "",
  href: d,
  rounded: m,
  filter: p,
  loading: g = "lazy",
  className: N,
  ariaHidden: I,
  onError: A,
  onLoad: _,
  ...C
}) {
  const [S, R] = X(!1);
  let O = s || i || "", x = l;
  if (e && t) {
    if (t === "avatar" || t === "banner") {
      if (typeof e.getImageInfo == "function") {
        const Y = e.getImageInfo(t, u);
        O = Y?.url || O, x = Y?.alt || x;
      }
    } else if (r && typeof e.getAssetInfo == "function") {
      const Y = e.getAssetInfo(r, !0, l);
      O = Y?.src || O, x = Y?.alt || x;
    }
  }
  !O && r && (typeof r == "string" ? O = r : (r.url || r.src) && (O = r.url || r.src, x = r.alt || x));
  const B = u && mr[u], V = j("object-cover", B, m === !0 ? "rounded-full" : typeof m == "string" ? m : "", N), le = Tr(p), $ = xt(
    (Y) => {
      R(!0), A?.(Y);
    },
    [A]
  ), U = xt(
    (Y) => {
      _?.(Y);
    },
    [_]
  );
  if (!O || S)
    return null;
  const te = /* @__PURE__ */ f(
    "img",
    {
      src: O,
      alt: x,
      loading: g,
      className: V,
      style: le ? { filter: le } : void 0,
      onError: $,
      onLoad: U,
      "aria-hidden": I,
      ...C
    }
  );
  return d ? /* @__PURE__ */ f(oe, { to: d, className: "inline-block", children: te }) : te;
}
function pr(e, t) {
  if (!e || typeof e != "string" || !e.includes("topic:")) return e;
  try {
    const r = new DOMParser().parseFromString(e, "text/html");
    return r.querySelectorAll('a[href^="topic:"]').forEach((i) => {
      const l = i.getAttribute("href");
      l && i.setAttribute("href", t.makeHref(l));
    }), r.body.innerHTML;
  } catch (u) {
    return console.warn("[SafeHtml] Error resolving topic links:", u), e;
  }
}
function Ut({ value: e, className: t, as: u = "div", ...r }) {
  const { website: s, getRoutingComponents: i } = ce(), l = i()?.SafeHtml, d = Te(() => {
    if (!e) return "";
    const m = Array.isArray(e) ? e.join("") : e;
    return s ? pr(m, s) : m;
  }, [e, s]);
  return l ? /* @__PURE__ */ f(ta, { fallback: null, children: /* @__PURE__ */ f(l, { value: d, className: t, ...r }) }) : /* @__PURE__ */ f(
    u,
    {
      className: t,
      dangerouslySetInnerHTML: { __html: d },
      ...r
    }
  );
}
const Ue = {
  check: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
  alert: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>',
  user: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>',
  heart: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',
  settings: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
  star: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>',
  close: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
  menu: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>',
  chevronDown: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>',
  chevronRight: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>',
  externalLink: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>',
  download: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>',
  play: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
};
function re(e, t) {
  const u = e.match(new RegExp(`${t}="([^"]*)"`, "i"));
  return u ? u[1] : null;
}
function vt(e) {
  if (!e) return null;
  try {
    const t = e.match(/<svg\s[^>]*>/i);
    if (!t) return null;
    const u = t[0], r = re(u, "viewBox") || "0 0 24 24", s = re(u, "width"), i = re(u, "height"), l = re(u, "fill"), d = re(u, "stroke"), m = re(u, "stroke-width"), p = re(u, "stroke-linecap"), g = re(u, "stroke-linejoin"), N = e.match(/<svg\s[^>]*>([\s\S]*)<\/svg>/i), I = N ? N[1] : "";
    return {
      viewBox: r,
      content: I,
      width: s,
      height: i,
      fill: l,
      stroke: d,
      strokeWidth: m,
      strokeLinecap: p,
      strokeLinejoin: g
    };
  } catch (t) {
    return console.warn("[Icon] Error parsing SVG:", t), null;
  }
}
function Yt({
  library: e,
  name: t,
  svg: u,
  url: r,
  icon: s,
  // Legacy prop - can be string (URL) or object
  size: i = "24",
  color: l,
  preserveColors: d = !1,
  className: m,
  loadingComponent: p,
  errorComponent: g,
  ...N
}) {
  const I = typeof s == "string" ? Ht(s) : null, A = !e && typeof t == "string" ? Ht(t) : null;
  let _ = e || I?.library || A?.library || (typeof s == "object" ? s.library : null);
  const C = (A ? A.name : t) || I?.name || (typeof s == "object" ? s.name : null), S = r || (!I && typeof s == "string" ? s : s?.url), R = u || (typeof s == "object" ? s.svg : null);
  C && !_ && !Ue[C] && (_ = "lu");
  const O = Te(() => _ && C && Be()?.getIconSync?.(_, C) || null, [_, C]), [x, B] = X(O), [W, V] = X(!1), [le, $] = X(!1);
  be(() => {
    if (O || R) {
      B(O);
      return;
    }
    if (B(null), $(!1), S) {
      V(!0), fetch(S).then((H) => {
        if (!H.ok) throw new Error("Failed to fetch icon");
        return H.text();
      }).then((H) => {
        B(H), V(!1);
      }).catch((H) => {
        console.warn("[Icon] Error fetching:", H), $(!0), V(!1);
      });
      return;
    }
    if (!(C && !_ && Ue[C]) && _ && C) {
      const H = Be();
      H?.resolveIcon && (V(!0), H.resolveIcon(_, C).then((de) => {
        de ? B(de) : $(!0), V(!1);
      }).catch(() => {
        $(!0), V(!1);
      }));
    }
  }, [S, R, _, C, O]);
  const U = Te(() => {
    if (R)
      return vt(R);
    if (x)
      return vt(x);
    const H = C || t;
    return H && !_ && Ue[H] ? {
      viewBox: "0 0 24 24",
      content: Ue[H],
      isBuiltIn: !0
    } : null;
  }, [R, x, C, t, _]);
  if (W)
    return p || /* @__PURE__ */ f(
      "span",
      {
        className: j("inline-flex items-center justify-center", m),
        style: { width: i, height: i },
        role: "img",
        "aria-hidden": "true"
      }
    );
  if (le)
    return g || null;
  if (!U)
    return S ? /* @__PURE__ */ f(
      "img",
      {
        src: S,
        alt: "",
        width: i,
        height: i,
        className: m,
        "aria-hidden": "true",
        ...N
      }
    ) : _ && C ? /* @__PURE__ */ f(
      "span",
      {
        className: j("inline-flex items-center justify-center", m),
        style: { width: i, height: i },
        role: "img",
        "aria-hidden": "true"
      }
    ) : null;
  const te = {
    width: i,
    height: i,
    ...l && !d ? { color: l } : {}
  }, Y = U.isBuiltIn ? "none" : d ? void 0 : U.fill ?? "currentColor", P = U.isBuiltIn ? "currentColor" : d ? void 0 : U.stroke ?? void 0;
  return /* @__PURE__ */ f(
    "svg",
    {
      viewBox: U.viewBox,
      fill: Y,
      stroke: P,
      strokeWidth: U.strokeWidth ?? void 0,
      strokeLinecap: U.strokeLinecap ?? void 0,
      strokeLinejoin: U.strokeLinejoin ?? void 0,
      className: j("inline-block", m),
      style: te,
      role: "img",
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: U.content },
      ...N
    }
  );
}
const pu = ua(function({
  text: t,
  as: u = "p",
  html: r = !0,
  className: s,
  lineAs: i,
  ...l
}) {
  const d = Array.isArray(t), m = u, p = /^h[1-6]$/.test(u);
  if (!d)
    return !t || typeof t == "string" && t.trim() === "" ? null : r ? /* @__PURE__ */ f(
      m,
      {
        className: s,
        dangerouslySetInnerHTML: { __html: t },
        ...l
      }
    ) : /* @__PURE__ */ f(m, { className: s, ...l, children: t });
  const g = t.filter(
    (I) => typeof I == "string" && I.trim() !== ""
  );
  if (g.length === 0)
    return null;
  const N = i || (p ? "div" : "p");
  return p ? /* @__PURE__ */ f(m, { className: s, ...l, children: g.map((I, A) => r ? /* @__PURE__ */ f(
    N,
    {
      dangerouslySetInnerHTML: { __html: I }
    },
    A
  ) : /* @__PURE__ */ f(N, { children: I }, A)) }) : /* @__PURE__ */ f(Xe, { children: g.map((I, A) => r ? /* @__PURE__ */ f(
    N,
    {
      className: s,
      dangerouslySetInnerHTML: { __html: I },
      ...l
    },
    A
  ) : /* @__PURE__ */ f(N, { className: s, ...l, children: I }, A)) });
}), gu = (e) => /* @__PURE__ */ f(pu, { ...e, as: "h1" }), gr = (e) => /* @__PURE__ */ f(pu, { ...e, as: "h2" });
function _r(e) {
  return e && e.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
  )?.[1] || null;
}
function Ar(e) {
  return e && e.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] || null;
}
function Nr({ videoId: e, autoplay: t, muted: u, loop: r, className: s }) {
  const i = new URLSearchParams({
    enablejsapi: "1",
    autoplay: t ? "1" : "0",
    mute: u ? "1" : "0",
    loop: r ? "1" : "0",
    playlist: r ? e : "",
    rel: "0",
    modestbranding: "1"
  });
  return /* @__PURE__ */ f(
    "iframe",
    {
      src: `https://www.youtube.com/embed/${e}?${i}`,
      className: s,
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: !0,
      title: "YouTube video"
    }
  );
}
function Ir({ videoId: e, autoplay: t, muted: u, loop: r, className: s }) {
  const i = new URLSearchParams({
    autoplay: t ? "1" : "0",
    muted: u ? "1" : "0",
    loop: r ? "1" : "0",
    dnt: "1"
  });
  return /* @__PURE__ */ f(
    "iframe",
    {
      src: `https://player.vimeo.com/video/${e}?${i}`,
      className: s,
      allow: "autoplay; fullscreen; picture-in-picture",
      allowFullScreen: !0,
      title: "Vimeo video"
    }
  );
}
function Cr({
  src: e,
  autoplay: t,
  muted: u,
  loop: r,
  controls: s,
  poster: i,
  onProgress: l,
  className: d
}) {
  const m = aa(null), [p, g] = X({
    25: !1,
    50: !1,
    75: !1,
    95: !1
  });
  return be(() => {
    const N = m.current;
    if (!N || !l) return;
    const I = () => {
      const A = N.currentTime / N.duration * 100;
      Object.entries({ 25: 25, 50: 50, 75: 75, 95: 95 }).forEach(
        ([_, C]) => {
          A >= C && !p[_] && (g((S) => ({ ...S, [_]: !0 })), l({
            milestone: _,
            percent: A,
            currentTime: N.currentTime
          }));
        }
      );
    };
    return N.addEventListener("timeupdate", I), () => N.removeEventListener("timeupdate", I);
  }, [p, l]), /* @__PURE__ */ f(
    "video",
    {
      ref: m,
      src: e,
      autoPlay: t,
      muted: u,
      loop: r,
      controls: s,
      poster: i,
      playsInline: !0,
      className: d
    }
  );
}
function Sr({
  src: e,
  media: t,
  poster: u,
  autoplay: r = !1,
  muted: s = !1,
  loop: i = !1,
  controls: l = !0,
  aspectRatio: d = "16/9",
  className: m,
  videoClassName: p,
  onProgress: g,
  ...N
}) {
  const I = typeof e == "string" ? e : e?.src || t?.src || "", A = dr(I), _ = (() => {
    const C = j("w-full h-full", p);
    switch (A) {
      case "youtube": {
        const S = _r(I);
        return S ? /* @__PURE__ */ f(
          Nr,
          {
            videoId: S,
            autoplay: r,
            muted: s,
            loop: i,
            className: C
          }
        ) : null;
      }
      case "vimeo": {
        const S = Ar(I);
        return S ? /* @__PURE__ */ f(
          Ir,
          {
            videoId: S,
            autoplay: r,
            muted: s,
            loop: i,
            className: C
          }
        ) : null;
      }
      default:
        return /* @__PURE__ */ f(
          Cr,
          {
            src: I,
            autoplay: r,
            muted: s,
            loop: i,
            controls: l,
            poster: u,
            onProgress: g,
            className: C
          }
        );
    }
  })();
  return /* @__PURE__ */ f(
    "div",
    {
      className: j("relative overflow-hidden", m),
      style: { aspectRatio: d },
      ...N,
      children: _
    }
  );
}
const Wt = {
  pathname: "/",
  search: "",
  hash: "",
  state: null,
  key: "default"
}, Gt = {};
function _u() {
  const t = Be()?.routingComponents || {};
  return {
    /**
     * SSG-safe useLocation hook
     * Returns current location or defaults during SSG
     * @returns {Object} Location object { pathname, search, hash, state, key }
     */
    useLocation: () => {
      if (!t.useLocation)
        return Wt;
      try {
        return t.useLocation();
      } catch {
        return Wt;
      }
    },
    /**
     * SSG-safe useParams hook
     * Returns route params or empty object during SSG
     * @returns {Object} Params object
     */
    useParams: () => {
      if (!t.useParams)
        return Gt;
      try {
        return t.useParams();
      } catch {
        return Gt;
      }
    },
    /**
     * SSG-safe useNavigate hook
     * Returns navigate function or no-op during SSG
     * @returns {Function} Navigate function
     */
    useNavigate: () => {
      if (!t.useNavigate)
        return () => {
        };
      try {
        return t.useNavigate();
      } catch {
        return () => {
        };
      }
    },
    /**
     * Router Link component (or fallback to 'a')
     * Use Kit's Link component instead for most cases
     */
    Link: t.Link || "a",
    /**
     * Check if routing is available (browser with Router context)
     * @returns {boolean}
     */
    isRoutingAvailable: () => {
      if (!t.useLocation) return !1;
      try {
        return t.useLocation(), !0;
      } catch {
        return !1;
      }
    }
  };
}
let st = !1, ve = null, Se = null;
const Lr = {
  background: "--shiki-background",
  foreground: "--shiki-foreground",
  keyword: "--shiki-token-keyword",
  string: "--shiki-token-string",
  number: "--shiki-token-constant",
  comment: "--shiki-token-comment",
  function: "--shiki-token-function",
  variable: "--shiki-token-variable",
  operator: "--shiki-token-operator",
  punctuation: "--shiki-token-punctuation",
  type: "--shiki-token-type",
  constant: "--shiki-token-constant",
  property: "--shiki-token-property",
  tag: "--shiki-token-tag",
  attribute: "--shiki-token-attribute",
  lineNumber: "--shiki-line-number",
  selection: "--shiki-selection"
};
function Or(e) {
  if (st || typeof document > "u") return;
  const t = "uniweb-code-theme";
  if (document.getElementById(t)) {
    st = !0;
    return;
  }
  const u = [];
  for (const [s, i] of Object.entries(e || {})) {
    const l = Lr[s];
    l && i && u.push(`${l}: ${i};`);
  }
  const r = document.createElement("style");
  r.id = t, r.textContent = `
:root {
  ${u.join(`
  `)}
}

/* Code block base styles */
.shiki {
  background-color: var(--shiki-background, #1e1e2e);
  color: var(--shiki-foreground, #cdd6f4);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

/* Ensure proper token colors */
.shiki span {
  color: var(--shiki-token-foreground, inherit);
}

/* Code element inside shiki */
.shiki code {
  display: block;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace;
}
`, document.head.appendChild(r), st = !0;
}
async function Rr() {
  return ve || Se || (Se = (async () => {
    try {
      const { createHighlighter: e } = await import("./bundle-full-gvvQC2VD.js");
      return ve = await e({
        themes: ["github-dark"],
        langs: [
          "javascript",
          "typescript",
          "jsx",
          "tsx",
          "json",
          "html",
          "css",
          "markdown",
          "yaml",
          "bash",
          "shell",
          "python"
        ]
      }), ve;
    } catch (e) {
      return console.warn("[Code] Failed to load Shiki:", e), Se = null, null;
    }
  })(), Se);
}
async function Dr(e, t, u) {
  if (!u) return null;
  try {
    const r = u.getLoadedLanguages(), s = t?.toLowerCase() || "plaintext";
    if (!r.includes(s) && s !== "plaintext")
      try {
        await u.loadLanguage(s);
      } catch {
        return u.codeToHtml(e, {
          lang: "plaintext",
          theme: "github-dark"
        });
      }
    return u.codeToHtml(e, {
      lang: s === "plaintext" ? "text" : s,
      theme: "github-dark"
    });
  } catch (r) {
    return console.warn("[Code] Highlighting failed:", r), null;
  }
}
function xr({ content: e, language: t = "plaintext", className: u, ...r }) {
  const [s, i] = X(null), l = Te(() => {
    try {
      return Be()?.activeWebsite?.themeData?.code;
    } catch {
      return null;
    }
  }, []), d = Te(() => {
    const m = t?.toLowerCase() || "plaintext";
    return {
      js: "javascript",
      ts: "typescript",
      sh: "bash",
      yml: "yaml",
      md: "markdown"
    }[m] || m;
  }, [t]);
  return be(() => {
    typeof document < "u" && l && Or(l);
  }, [l]), be(() => {
    let m = !1;
    async function p() {
      const g = await Rr();
      if (!m && g && e) {
        const N = await Dr(e, d, g);
        m || i(N);
      }
    }
    return p(), () => {
      m = !0;
    };
  }, [e, d]), s ? /* @__PURE__ */ f(
    "div",
    {
      className: j("overflow-x-auto rounded-lg text-sm", u),
      dangerouslySetInnerHTML: { __html: s },
      ...r
    }
  ) : /* @__PURE__ */ f(
    "pre",
    {
      className: j(
        "overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm",
        u
      ),
      ...r,
      children: /* @__PURE__ */ f("code", { className: `language-${d} text-gray-100`, children: e })
    }
  );
}
const Qt = {
  sm: "prose-sm",
  base: "prose-base",
  lg: "prose-lg",
  xl: "prose-xl",
  "2xl": "prose-2xl"
};
function Pr(e) {
  return e.replace(/<[^>]*>/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function dt({ element: e, block: t }) {
  if (!e) return null;
  switch (e.type) {
    case "heading": {
      const r = `h${Math.min(e.level || 1, 6)}`, s = Pr(e.text || "");
      return /* @__PURE__ */ f(r, { id: s, children: /* @__PURE__ */ f(Ut, { value: e.text, as: "span" }) });
    }
    case "paragraph":
      return e.text ? /* @__PURE__ */ f("p", { children: /* @__PURE__ */ f(Ut, { value: e.text, as: "span" }) }) : null;
    case "image": {
      const { url: u, alt: r, caption: s, role: i } = e.attrs || {};
      return i === "icon" ? /* @__PURE__ */ f(Yt, { ...e.attrs }) : /* @__PURE__ */ k("figure", { children: [
        /* @__PURE__ */ f(br, { src: u, alt: r || s || "" }),
        s && /* @__PURE__ */ f("figcaption", { children: s })
      ] });
    }
    case "video":
      return /* @__PURE__ */ f(Sr, { src: e.attrs?.src });
    case "codeBlock":
      return /* @__PURE__ */ f(xr, { content: e.text || "", language: e.attrs?.language || "" });
    case "dataBlock":
      return null;
    case "math_display":
      return e.mathml ? /* @__PURE__ */ f(
        "div",
        {
          className: "math-display",
          dangerouslySetInnerHTML: { __html: e.mathml }
        }
      ) : null;
    case "list": {
      const u = e.style === "ordered" ? "ol" : "ul";
      return /* @__PURE__ */ f(u, { children: e.children?.map((r, s) => /* @__PURE__ */ f("li", { children: r.map((i, l) => /* @__PURE__ */ f(dt, { element: i, block: t }, l)) }, s)) });
    }
    case "blockquote":
      return /* @__PURE__ */ f("blockquote", { children: e.children?.map((u, r) => /* @__PURE__ */ f(dt, { element: u, block: t }, r)) });
    case "link": {
      const { href: u, label: r, role: s } = e.attrs || {};
      return /* @__PURE__ */ f("p", { children: /* @__PURE__ */ f(oe, { to: u, children: r }) });
    }
    case "button":
      return /* @__PURE__ */ f("p", { children: /* @__PURE__ */ f(oe, { to: e.attrs?.href, children: e.text }) });
    case "divider":
      return /* @__PURE__ */ f("hr", {});
    case "inset": {
      if (!t || !e.refId) return null;
      const u = t.getInset(e.refId);
      if (!u) return null;
      const r = lr();
      return r ? /* @__PURE__ */ f(r, { blocks: [u] }) : null;
    }
    case "icon":
      return /* @__PURE__ */ f(Yt, { ...e.attrs });
    default:
      return null;
  }
}
function pe({
  block: e,
  content: t,
  size: u = "lg",
  as: r = "div",
  className: s,
  children: i,
  ...l
}) {
  const d = Qt[u] || Qt.lg, m = t?.sequence;
  return /* @__PURE__ */ f(
    r,
    {
      className: j("prose", d, "max-w-none", s),
      ...l,
      children: m ? m.map((p, g) => /* @__PURE__ */ f(dt, { element: p, block: e }, g)) : i
    }
  );
}
function no({ content: e }) {
  const { website: t } = ce(), u = t?.config?.book?.covers || {}, r = yr(u.back, t?.basePath), s = e && e.title || "Back cover of " + (t?.config?.book?.title || "the book");
  return r ? /* @__PURE__ */ f("section", { className: "book-backcover-image flex justify-center px-4 py-12", children: /* @__PURE__ */ f(
    "img",
    {
      src: r,
      alt: s,
      className: "max-h-[80vh] w-auto shadow-2xl ring-1 ring-black/5 rounded-sm"
    }
  ) }) : /* @__PURE__ */ k("section", { className: "book-backcover-fallback mx-auto max-w-[var(--max-content-width)] px-6 py-16 text-center text-subtle text-sm", children: [
    "No back cover declared. Add ",
    /* @__PURE__ */ f("code", { children: "book.covers.back" }),
    " to",
    " ",
    /* @__PURE__ */ f("code", { children: "site.yml" }),
    "."
  ] });
}
function yr(e, t) {
  return e ? /^https?:\/\//i.test(e) || e.startsWith("data:") ? e : e.startsWith("/") ? (t || "") + e : e : null;
}
const Au = nu(null), qt = nu("");
function Nu() {
  const e = /* @__PURE__ */ new WeakMap(), t = [];
  return {
    register(u, r, s, i = {}) {
      let l = e.get(u);
      l || (l = /* @__PURE__ */ new Map(), e.set(u, l), t.push(u)), l.set(r, { fragment: s, options: i });
    },
    getOutputs(u) {
      const r = [];
      for (const s of t) {
        const i = e.get(s);
        if (!i) continue;
        const l = i.get(u);
        l && r.push({ block: s, ...l });
      }
      return r;
    },
    clear() {
      t.length = 0;
    },
    // Reassigned by the provider so the compile pipeline can re-wrap
    // fragments with the same contexts they rendered under. Identity
    // function until the provider sets it.
    wrapWithProviders: (u) => u
  };
}
function Iu({ children: e, basePath: t = "", store: u }) {
  const r = Te(
    () => u || Nu(),
    [u]
  ), s = t || "";
  return r.wrapWithProviders = (i) => iu(
    qt.Provider,
    { value: s },
    i
  ), /* @__PURE__ */ f(Au.Provider, { value: r, children: /* @__PURE__ */ f(qt.Provider, { value: s, children: e }) });
}
function fe(e, t, u, r = {}) {
  const s = ra(Au);
  if (!s) {
    process.env.NODE_ENV !== "production" && console.warn(
      "useDocumentOutput was called outside of a <DocumentProvider>. Document output will not be registered."
    );
    return;
  }
  s.register(e, t, u, r);
}
const kr = /* @__PURE__ */ new Set([
  65534,
  65535,
  131070,
  131071,
  196606,
  196607,
  262142,
  262143,
  327678,
  327679,
  393214,
  393215,
  458750,
  458751,
  524286,
  524287,
  589822,
  589823,
  655358,
  655359,
  720894,
  720895,
  786430,
  786431,
  851966,
  851967,
  917502,
  917503,
  983038,
  983039,
  1048574,
  1048575,
  1114110,
  1114111
]), M = "�";
var n;
(function(e) {
  e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
})(n || (n = {}));
const G = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function Cu(e) {
  return e >= 55296 && e <= 57343;
}
function Mr(e) {
  return e >= 56320 && e <= 57343;
}
function Br(e, t) {
  return (e - 55296) * 1024 + 9216 + t;
}
function Su(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function Lu(e) {
  return e >= 64976 && e <= 65007 || kr.has(e);
}
var E;
(function(e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(E || (E = {}));
const wr = 65536;
class Fr {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = wr, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(t, u) {
    const { line: r, col: s, offset: i } = this, l = s + u, d = i + u;
    return {
      code: t,
      startLine: r,
      endLine: r,
      startCol: l,
      endCol: l,
      startOffset: d,
      endOffset: d
    };
  }
  _err(t) {
    this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(t, 0)));
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
  }
  _processSurrogate(t) {
    if (this.pos !== this.html.length - 1) {
      const u = this.html.charCodeAt(this.pos + 1);
      if (Mr(u))
        return this.pos++, this._addGap(), Br(t, u);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, n.EOF;
    return this._err(E.surrogateInInputStream), t;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
  }
  write(t, u) {
    this.html.length > 0 ? this.html += t : this.html = t, this.endOfChunkHit = !1, this.lastChunkWritten = u;
  }
  insertHtmlAtCurrentPos(t) {
    this.html = this.html.substring(0, this.pos + 1) + t + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
  }
  startsWith(t, u) {
    if (this.pos + t.length > this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (u)
      return this.html.startsWith(t, this.pos);
    for (let r = 0; r < t.length; r++)
      if ((this.html.charCodeAt(this.pos + r) | 32) !== t.charCodeAt(r))
        return !1;
    return !0;
  }
  peek(t) {
    const u = this.pos + t;
    if (u >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, n.EOF;
    const r = this.html.charCodeAt(u);
    return r === n.CARRIAGE_RETURN ? n.LINE_FEED : r;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, n.EOF;
    let t = this.html.charCodeAt(this.pos);
    return t === n.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, n.LINE_FEED) : t === n.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, Cu(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === n.LINE_FEED || t === n.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    Su(t) ? this._err(E.controlCharacterInInputStream) : Lu(t) && this._err(E.noncharacterInInputStream);
  }
  retreat(t) {
    for (this.pos -= t; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
var D;
(function(e) {
  e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})(D || (D = {}));
function Ou(e, t) {
  for (let u = e.attrs.length - 1; u >= 0; u--)
    if (e.attrs[u].name === t)
      return e.attrs[u].value;
  return null;
}
const Hr = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ 'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), Ur = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
function vr(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = Ur.get(e)) !== null && t !== void 0 ? t : e;
}
var F;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(F || (F = {}));
const Yr = 32;
var ie;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(ie || (ie = {}));
function ht(e) {
  return e >= F.ZERO && e <= F.NINE;
}
function Wr(e) {
  return e >= F.UPPER_A && e <= F.UPPER_F || e >= F.LOWER_A && e <= F.LOWER_F;
}
function Gr(e) {
  return e >= F.UPPER_A && e <= F.UPPER_Z || e >= F.LOWER_A && e <= F.LOWER_Z || ht(e);
}
function Qr(e) {
  return e === F.EQUALS || Gr(e);
}
var w;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(w || (w = {}));
var ee;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(ee || (ee = {}));
class qr {
  constructor(t, u, r) {
    this.decodeTree = t, this.emitCodePoint = u, this.errors = r, this.state = w.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = ee.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = w.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, u) {
    switch (this.state) {
      case w.EntityStart:
        return t.charCodeAt(u) === F.NUM ? (this.state = w.NumericStart, this.consumed += 1, this.stateNumericStart(t, u + 1)) : (this.state = w.NamedEntity, this.stateNamedEntity(t, u));
      case w.NumericStart:
        return this.stateNumericStart(t, u);
      case w.NumericDecimal:
        return this.stateNumericDecimal(t, u);
      case w.NumericHex:
        return this.stateNumericHex(t, u);
      case w.NamedEntity:
        return this.stateNamedEntity(t, u);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(t, u) {
    return u >= t.length ? -1 : (t.charCodeAt(u) | Yr) === F.LOWER_X ? (this.state = w.NumericHex, this.consumed += 1, this.stateNumericHex(t, u + 1)) : (this.state = w.NumericDecimal, this.stateNumericDecimal(t, u));
  }
  addToNumericResult(t, u, r, s) {
    if (u !== r) {
      const i = r - u;
      this.result = this.result * Math.pow(s, i) + Number.parseInt(t.substr(u, i), s), this.consumed += i;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, u) {
    const r = u;
    for (; u < t.length; ) {
      const s = t.charCodeAt(u);
      if (ht(s) || Wr(s))
        u += 1;
      else
        return this.addToNumericResult(t, r, u, 16), this.emitNumericEntity(s, 3);
    }
    return this.addToNumericResult(t, r, u, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, u) {
    const r = u;
    for (; u < t.length; ) {
      const s = t.charCodeAt(u);
      if (ht(s))
        u += 1;
      else
        return this.addToNumericResult(t, r, u, 10), this.emitNumericEntity(s, 2);
    }
    return this.addToNumericResult(t, r, u, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, u) {
    var r;
    if (this.consumed <= u)
      return (r = this.errors) === null || r === void 0 || r.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === F.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === ee.Strict)
      return 0;
    return this.emitCodePoint(vr(this.result), this.consumed), this.errors && (t !== F.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, u) {
    const { decodeTree: r } = this;
    let s = r[this.treeIndex], i = (s & ie.VALUE_LENGTH) >> 14;
    for (; u < t.length; u++, this.excess++) {
      const l = t.charCodeAt(u);
      if (this.treeIndex = Vr(r, s, this.treeIndex + Math.max(1, i), l), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === ee.Attribute && // We shouldn't have consumed any characters after the entity,
        (i === 0 || // And there should be no invalid characters.
        Qr(l)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (s = r[this.treeIndex], i = (s & ie.VALUE_LENGTH) >> 14, i !== 0) {
        if (l === F.SEMI)
          return this.emitNamedEntityData(this.treeIndex, i, this.consumed + this.excess);
        this.decodeMode !== ee.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var t;
    const { result: u, decodeTree: r } = this, s = (r[u] & ie.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(u, s, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, u, r) {
    const { decodeTree: s } = this;
    return this.emitCodePoint(u === 1 ? s[t] & ~ie.VALUE_LENGTH : s[t + 1], r), u === 3 && this.emitCodePoint(s[t + 2], r), r;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var t;
    switch (this.state) {
      case w.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== ee.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case w.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case w.NumericHex:
        return this.emitNumericEntity(0, 3);
      case w.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case w.EntityStart:
        return 0;
    }
  }
}
function Vr(e, t, u, r) {
  const s = (t & ie.BRANCH_LENGTH) >> 7, i = t & ie.JUMP_TABLE;
  if (s === 0)
    return i !== 0 && r === i ? u : -1;
  if (i) {
    const m = r - i;
    return m < 0 || m >= s ? -1 : e[u + m] - 1;
  }
  let l = u, d = l + s - 1;
  for (; l <= d; ) {
    const m = l + d >>> 1, p = e[m];
    if (p < r)
      l = m + 1;
    else if (p > r)
      d = m - 1;
    else
      return e[m + s];
  }
  return -1;
}
var T;
(function(e) {
  e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(T || (T = {}));
var he;
(function(e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(he || (he = {}));
var q;
(function(e) {
  e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})(q || (q = {}));
var h;
(function(e) {
  e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(h || (h = {}));
var a;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP";
})(a || (a = {}));
const zr = /* @__PURE__ */ new Map([
  [h.A, a.A],
  [h.ADDRESS, a.ADDRESS],
  [h.ANNOTATION_XML, a.ANNOTATION_XML],
  [h.APPLET, a.APPLET],
  [h.AREA, a.AREA],
  [h.ARTICLE, a.ARTICLE],
  [h.ASIDE, a.ASIDE],
  [h.B, a.B],
  [h.BASE, a.BASE],
  [h.BASEFONT, a.BASEFONT],
  [h.BGSOUND, a.BGSOUND],
  [h.BIG, a.BIG],
  [h.BLOCKQUOTE, a.BLOCKQUOTE],
  [h.BODY, a.BODY],
  [h.BR, a.BR],
  [h.BUTTON, a.BUTTON],
  [h.CAPTION, a.CAPTION],
  [h.CENTER, a.CENTER],
  [h.CODE, a.CODE],
  [h.COL, a.COL],
  [h.COLGROUP, a.COLGROUP],
  [h.DD, a.DD],
  [h.DESC, a.DESC],
  [h.DETAILS, a.DETAILS],
  [h.DIALOG, a.DIALOG],
  [h.DIR, a.DIR],
  [h.DIV, a.DIV],
  [h.DL, a.DL],
  [h.DT, a.DT],
  [h.EM, a.EM],
  [h.EMBED, a.EMBED],
  [h.FIELDSET, a.FIELDSET],
  [h.FIGCAPTION, a.FIGCAPTION],
  [h.FIGURE, a.FIGURE],
  [h.FONT, a.FONT],
  [h.FOOTER, a.FOOTER],
  [h.FOREIGN_OBJECT, a.FOREIGN_OBJECT],
  [h.FORM, a.FORM],
  [h.FRAME, a.FRAME],
  [h.FRAMESET, a.FRAMESET],
  [h.H1, a.H1],
  [h.H2, a.H2],
  [h.H3, a.H3],
  [h.H4, a.H4],
  [h.H5, a.H5],
  [h.H6, a.H6],
  [h.HEAD, a.HEAD],
  [h.HEADER, a.HEADER],
  [h.HGROUP, a.HGROUP],
  [h.HR, a.HR],
  [h.HTML, a.HTML],
  [h.I, a.I],
  [h.IMG, a.IMG],
  [h.IMAGE, a.IMAGE],
  [h.INPUT, a.INPUT],
  [h.IFRAME, a.IFRAME],
  [h.KEYGEN, a.KEYGEN],
  [h.LABEL, a.LABEL],
  [h.LI, a.LI],
  [h.LINK, a.LINK],
  [h.LISTING, a.LISTING],
  [h.MAIN, a.MAIN],
  [h.MALIGNMARK, a.MALIGNMARK],
  [h.MARQUEE, a.MARQUEE],
  [h.MATH, a.MATH],
  [h.MENU, a.MENU],
  [h.META, a.META],
  [h.MGLYPH, a.MGLYPH],
  [h.MI, a.MI],
  [h.MO, a.MO],
  [h.MN, a.MN],
  [h.MS, a.MS],
  [h.MTEXT, a.MTEXT],
  [h.NAV, a.NAV],
  [h.NOBR, a.NOBR],
  [h.NOFRAMES, a.NOFRAMES],
  [h.NOEMBED, a.NOEMBED],
  [h.NOSCRIPT, a.NOSCRIPT],
  [h.OBJECT, a.OBJECT],
  [h.OL, a.OL],
  [h.OPTGROUP, a.OPTGROUP],
  [h.OPTION, a.OPTION],
  [h.P, a.P],
  [h.PARAM, a.PARAM],
  [h.PLAINTEXT, a.PLAINTEXT],
  [h.PRE, a.PRE],
  [h.RB, a.RB],
  [h.RP, a.RP],
  [h.RT, a.RT],
  [h.RTC, a.RTC],
  [h.RUBY, a.RUBY],
  [h.S, a.S],
  [h.SCRIPT, a.SCRIPT],
  [h.SEARCH, a.SEARCH],
  [h.SECTION, a.SECTION],
  [h.SELECT, a.SELECT],
  [h.SOURCE, a.SOURCE],
  [h.SMALL, a.SMALL],
  [h.SPAN, a.SPAN],
  [h.STRIKE, a.STRIKE],
  [h.STRONG, a.STRONG],
  [h.STYLE, a.STYLE],
  [h.SUB, a.SUB],
  [h.SUMMARY, a.SUMMARY],
  [h.SUP, a.SUP],
  [h.TABLE, a.TABLE],
  [h.TBODY, a.TBODY],
  [h.TEMPLATE, a.TEMPLATE],
  [h.TEXTAREA, a.TEXTAREA],
  [h.TFOOT, a.TFOOT],
  [h.TD, a.TD],
  [h.TH, a.TH],
  [h.THEAD, a.THEAD],
  [h.TITLE, a.TITLE],
  [h.TR, a.TR],
  [h.TRACK, a.TRACK],
  [h.TT, a.TT],
  [h.U, a.U],
  [h.UL, a.UL],
  [h.SVG, a.SVG],
  [h.VAR, a.VAR],
  [h.WBR, a.WBR],
  [h.XMP, a.XMP]
]);
function $e(e) {
  var t;
  return (t = zr.get(e)) !== null && t !== void 0 ? t : a.UNKNOWN;
}
const b = a, Kr = {
  [T.HTML]: /* @__PURE__ */ new Set([
    b.ADDRESS,
    b.APPLET,
    b.AREA,
    b.ARTICLE,
    b.ASIDE,
    b.BASE,
    b.BASEFONT,
    b.BGSOUND,
    b.BLOCKQUOTE,
    b.BODY,
    b.BR,
    b.BUTTON,
    b.CAPTION,
    b.CENTER,
    b.COL,
    b.COLGROUP,
    b.DD,
    b.DETAILS,
    b.DIR,
    b.DIV,
    b.DL,
    b.DT,
    b.EMBED,
    b.FIELDSET,
    b.FIGCAPTION,
    b.FIGURE,
    b.FOOTER,
    b.FORM,
    b.FRAME,
    b.FRAMESET,
    b.H1,
    b.H2,
    b.H3,
    b.H4,
    b.H5,
    b.H6,
    b.HEAD,
    b.HEADER,
    b.HGROUP,
    b.HR,
    b.HTML,
    b.IFRAME,
    b.IMG,
    b.INPUT,
    b.LI,
    b.LINK,
    b.LISTING,
    b.MAIN,
    b.MARQUEE,
    b.MENU,
    b.META,
    b.NAV,
    b.NOEMBED,
    b.NOFRAMES,
    b.NOSCRIPT,
    b.OBJECT,
    b.OL,
    b.P,
    b.PARAM,
    b.PLAINTEXT,
    b.PRE,
    b.SCRIPT,
    b.SECTION,
    b.SELECT,
    b.SOURCE,
    b.STYLE,
    b.SUMMARY,
    b.TABLE,
    b.TBODY,
    b.TD,
    b.TEMPLATE,
    b.TEXTAREA,
    b.TFOOT,
    b.TH,
    b.THEAD,
    b.TITLE,
    b.TR,
    b.TRACK,
    b.UL,
    b.WBR,
    b.XMP
  ]),
  [T.MATHML]: /* @__PURE__ */ new Set([b.MI, b.MO, b.MN, b.MS, b.MTEXT, b.ANNOTATION_XML]),
  [T.SVG]: /* @__PURE__ */ new Set([b.TITLE, b.FOREIGN_OBJECT, b.DESC]),
  [T.XLINK]: /* @__PURE__ */ new Set(),
  [T.XML]: /* @__PURE__ */ new Set(),
  [T.XMLNS]: /* @__PURE__ */ new Set()
}, ft = /* @__PURE__ */ new Set([b.H1, b.H2, b.H3, b.H4, b.H5, b.H6]);
h.STYLE, h.SCRIPT, h.XMP, h.IFRAME, h.NOEMBED, h.NOFRAMES, h.PLAINTEXT;
var o;
(function(e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
})(o || (o = {}));
const Q = {
  DATA: o.DATA,
  RCDATA: o.RCDATA,
  RAWTEXT: o.RAWTEXT,
  SCRIPT_DATA: o.SCRIPT_DATA,
  PLAINTEXT: o.PLAINTEXT,
  CDATA_SECTION: o.CDATA_SECTION
};
function Xr(e) {
  return e >= n.DIGIT_0 && e <= n.DIGIT_9;
}
function Re(e) {
  return e >= n.LATIN_CAPITAL_A && e <= n.LATIN_CAPITAL_Z;
}
function jr(e) {
  return e >= n.LATIN_SMALL_A && e <= n.LATIN_SMALL_Z;
}
function se(e) {
  return jr(e) || Re(e);
}
function Vt(e) {
  return se(e) || Xr(e);
}
function Ye(e) {
  return e + 32;
}
function Ru(e) {
  return e === n.SPACE || e === n.LINE_FEED || e === n.TABULATION || e === n.FORM_FEED;
}
function zt(e) {
  return Ru(e) || e === n.SOLIDUS || e === n.GREATER_THAN_SIGN;
}
function $r(e) {
  return e === n.NULL ? E.nullCharacterReference : e > 1114111 ? E.characterReferenceOutsideUnicodeRange : Cu(e) ? E.surrogateCharacterReference : Lu(e) ? E.noncharacterCharacterReference : Su(e) || e === n.CARRIAGE_RETURN ? E.controlCharacterReference : null;
}
class Jr {
  constructor(t, u) {
    this.options = t, this.handler = u, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = o.DATA, this.returnState = o.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new Fr(u), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new qr(Hr, (r, s) => {
      this.preprocessor.pos = this.entityStartPos + s - 1, this._flushCodePointConsumedAsCharacterReference(r);
    }, u.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(E.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (r) => {
        this._err(E.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + r);
      },
      validateNumericCharacterReference: (r) => {
        const s = $r(r);
        s && this._err(s, 1);
      }
    } : void 0);
  }
  //Errors
  _err(t, u = 0) {
    var r, s;
    (s = (r = this.handler).onParseError) === null || s === void 0 || s.call(r, this.preprocessor.getError(t, u));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(t) {
    return this.options.sourceCodeLocationInfo ? {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - t,
      startOffset: this.preprocessor.offset - t,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    } : null;
  }
  _runParsingLoop() {
    if (!this.inLoop) {
      for (this.inLoop = !0; this.active && !this.paused; ) {
        this.consumedAfterSnapshot = 0;
        const t = this._consume();
        this._ensureHibernation() || this._callState(t);
      }
      this.inLoop = !1;
    }
  }
  //API
  pause() {
    this.paused = !0;
  }
  resume(t) {
    if (!this.paused)
      throw new Error("Parser was already resumed");
    this.paused = !1, !this.inLoop && (this._runParsingLoop(), this.paused || t?.());
  }
  write(t, u, r) {
    this.active = !0, this.preprocessor.write(t, u), this._runParsingLoop(), this.paused || r?.();
  }
  insertHtmlAtCurrentPos(t) {
    this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(t), this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    return this.preprocessor.endOfChunkHit ? (this.preprocessor.retreat(this.consumedAfterSnapshot), this.consumedAfterSnapshot = 0, this.active = !1, !0) : !1;
  }
  //Consumption
  _consume() {
    return this.consumedAfterSnapshot++, this.preprocessor.advance();
  }
  _advanceBy(t) {
    this.consumedAfterSnapshot += t;
    for (let u = 0; u < t; u++)
      this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(t, u) {
    return this.preprocessor.startsWith(t, u) ? (this._advanceBy(t.length - 1), !0) : !1;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: D.START_TAG,
      tagName: "",
      tagID: a.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: D.END_TAG,
      tagName: "",
      tagID: a.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(t) {
    this.currentToken = {
      type: D.COMMENT,
      data: "",
      location: this.getCurrentLocation(t)
    };
  }
  _createDoctypeToken(t) {
    this.currentToken = {
      type: D.DOCTYPE,
      name: t,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(t, u) {
    this.currentCharacterToken = {
      type: t,
      chars: u,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(t) {
    this.currentAttr = {
      name: t,
      value: ""
    }, this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var t, u;
    const r = this.currentToken;
    if (Ou(r, this.currentAttr.name) === null) {
      if (r.attrs.push(this.currentAttr), r.location && this.currentLocation) {
        const s = (t = (u = r.location).attrs) !== null && t !== void 0 ? t : u.attrs = /* @__PURE__ */ Object.create(null);
        s[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(E.duplicateAttribute);
  }
  _leaveAttrValue() {
    this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
  }
  //Token emission
  prepareToken(t) {
    this._emitCurrentCharacterToken(t.location), this.currentToken = null, t.location && (t.location.endLine = this.preprocessor.line, t.location.endCol = this.preprocessor.col + 1, t.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const t = this.currentToken;
    this.prepareToken(t), t.tagID = $e(t.tagName), t.type === D.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(E.endTagWithAttributes), t.selfClosing && this._err(E.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(t) {
    this.prepareToken(t), this.handler.onComment(t), this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(t) {
    this.prepareToken(t), this.handler.onDoctype(t), this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(t) {
    if (this.currentCharacterToken) {
      switch (t && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = t.startLine, this.currentCharacterToken.location.endCol = t.startCol, this.currentCharacterToken.location.endOffset = t.startOffset), this.currentCharacterToken.type) {
        case D.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case D.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case D.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const t = this.getCurrentLocation(0);
    t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({ type: D.EOF, location: t }), this.active = !1;
  }
  //Characters emission
  //OPTIMIZATION: The specification uses only one type of character token (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, the parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
  _appendCharToCurrentCharacterToken(t, u) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type === t) {
        this.currentCharacterToken.chars += u;
        return;
      } else
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
    this._createCharacterToken(t, u);
  }
  _emitCodePoint(t) {
    const u = Ru(t) ? D.WHITESPACE_CHARACTER : t === n.NULL ? D.NULL_CHARACTER : D.CHARACTER;
    this._appendCharToCurrentCharacterToken(u, String.fromCodePoint(t));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(t) {
    this._appendCharToCurrentCharacterToken(D.CHARACTER, t);
  }
  // Character reference helpers
  _startCharacterReference() {
    this.returnState = this.state, this.state = o.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? ee.Attribute : ee.Legacy);
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === o.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === o.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === o.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(t) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(t) : this._emitCodePoint(t);
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(t) {
    switch (this.state) {
      case o.DATA: {
        this._stateData(t);
        break;
      }
      case o.RCDATA: {
        this._stateRcdata(t);
        break;
      }
      case o.RAWTEXT: {
        this._stateRawtext(t);
        break;
      }
      case o.SCRIPT_DATA: {
        this._stateScriptData(t);
        break;
      }
      case o.PLAINTEXT: {
        this._statePlaintext(t);
        break;
      }
      case o.TAG_OPEN: {
        this._stateTagOpen(t);
        break;
      }
      case o.END_TAG_OPEN: {
        this._stateEndTagOpen(t);
        break;
      }
      case o.TAG_NAME: {
        this._stateTagName(t);
        break;
      }
      case o.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(t);
        break;
      }
      case o.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(t);
        break;
      }
      case o.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(t);
        break;
      }
      case o.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(t);
        break;
      }
      case o.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(t);
        break;
      }
      case o.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(t);
        break;
      }
      case o.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(t);
        break;
      }
      case o.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(t);
        break;
      }
      case o.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(t);
        break;
      }
      case o.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(t);
        break;
      }
      case o.ATTRIBUTE_NAME: {
        this._stateAttributeName(t);
        break;
      }
      case o.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(t);
        break;
      }
      case o.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(t);
        break;
      }
      case o.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(t);
        break;
      }
      case o.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(t);
        break;
      }
      case o.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(t);
        break;
      }
      case o.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(t);
        break;
      }
      case o.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(t);
        break;
      }
      case o.BOGUS_COMMENT: {
        this._stateBogusComment(t);
        break;
      }
      case o.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(t);
        break;
      }
      case o.COMMENT_START: {
        this._stateCommentStart(t);
        break;
      }
      case o.COMMENT_START_DASH: {
        this._stateCommentStartDash(t);
        break;
      }
      case o.COMMENT: {
        this._stateComment(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(t);
        break;
      }
      case o.COMMENT_END_DASH: {
        this._stateCommentEndDash(t);
        break;
      }
      case o.COMMENT_END: {
        this._stateCommentEnd(t);
        break;
      }
      case o.COMMENT_END_BANG: {
        this._stateCommentEndBang(t);
        break;
      }
      case o.DOCTYPE: {
        this._stateDoctype(t);
        break;
      }
      case o.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(t);
        break;
      }
      case o.DOCTYPE_NAME: {
        this._stateDoctypeName(t);
        break;
      }
      case o.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(t);
        break;
      }
      case o.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(t);
        break;
      }
      case o.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(t);
        break;
      }
      case o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(t);
        break;
      }
      case o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(t);
        break;
      }
      case o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(t);
        break;
      }
      case o.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
        break;
      }
      case o.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(t);
        break;
      }
      case o.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(t);
        break;
      }
      case o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(t);
        break;
      }
      case o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(t);
        break;
      }
      case o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(t);
        break;
      }
      case o.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(t);
        break;
      }
      case o.CDATA_SECTION: {
        this._stateCdataSection(t);
        break;
      }
      case o.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(t);
        break;
      }
      case o.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(t);
        break;
      }
      case o.CHARACTER_REFERENCE: {
        this._stateCharacterReference();
        break;
      }
      case o.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(t);
        break;
      }
      default:
        throw new Error("Unknown state");
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(t) {
    switch (t) {
      case n.LESS_THAN_SIGN: {
        this.state = o.TAG_OPEN;
        break;
      }
      case n.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitCodePoint(t);
        break;
      }
      case n.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(t) {
    switch (t) {
      case n.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case n.LESS_THAN_SIGN: {
        this.state = o.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(M);
        break;
      }
      case n.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(t) {
    switch (t) {
      case n.LESS_THAN_SIGN: {
        this.state = o.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(M);
        break;
      }
      case n.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(t) {
    switch (t) {
      case n.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(M);
        break;
      }
      case n.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(t) {
    switch (t) {
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(M);
        break;
      }
      case n.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(t) {
    if (se(t))
      this._createStartTagToken(), this.state = o.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case n.EXCLAMATION_MARK: {
          this.state = o.MARKUP_DECLARATION_OPEN;
          break;
        }
        case n.SOLIDUS: {
          this.state = o.END_TAG_OPEN;
          break;
        }
        case n.QUESTION_MARK: {
          this._err(E.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t);
          break;
        }
        case n.EOF: {
          this._err(E.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(E.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = o.DATA, this._stateData(t);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(t) {
    if (se(t))
      this._createEndTagToken(), this.state = o.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case n.GREATER_THAN_SIGN: {
          this._err(E.missingEndTagName), this.state = o.DATA;
          break;
        }
        case n.EOF: {
          this._err(E.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(E.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(t) {
    const u = this.currentToken;
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED: {
        this.state = o.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case n.SOLIDUS: {
        this.state = o.SELF_CLOSING_START_TAG;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), u.tagName += M;
        break;
      }
      case n.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        u.tagName += String.fromCodePoint(Re(t) ? Ye(t) : t);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(t) {
    t === n.SOLIDUS ? this.state = o.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = o.RCDATA, this._stateRcdata(t));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(t) {
    se(t) ? (this.state = o.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = o.RCDATA, this._stateRcdata(t));
  }
  handleSpecialEndTag(t) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    const u = this.currentToken;
    switch (u.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = o.BEFORE_ATTRIBUTE_NAME, !1;
      case n.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = o.SELF_CLOSING_START_TAG, !1;
      case n.GREATER_THAN_SIGN:
        return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = o.DATA, !1;
      default:
        return !this._ensureHibernation();
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.RCDATA, this._stateRcdata(t));
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(t) {
    t === n.SOLIDUS ? this.state = o.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = o.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(t) {
    se(t) ? (this.state = o.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = o.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.RAWTEXT, this._stateRawtext(t));
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(t) {
    switch (t) {
      case n.SOLIDUS: {
        this.state = o.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case n.EXCLAMATION_MARK: {
        this.state = o.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"), this.state = o.SCRIPT_DATA, this._stateScriptData(t);
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(t) {
    se(t) ? (this.state = o.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(t) {
    t === n.HYPHEN_MINUS ? (this.state = o.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(t) {
    t === n.HYPHEN_MINUS ? (this.state = o.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(t) {
    switch (t) {
      case n.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case n.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(M);
        break;
      }
      case n.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(t) {
    switch (t) {
      case n.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case n.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_ESCAPED, this._emitChars(M);
        break;
      }
      case n.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(t) {
    switch (t) {
      case n.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case n.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this.state = o.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_ESCAPED, this._emitChars(M);
        break;
      }
      case n.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(t) {
    t === n.SOLIDUS ? this.state = o.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : se(t) ? (this._emitChars("<"), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(t) {
    se(t) ? (this.state = o.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(G.SCRIPT, !1) && zt(this.preprocessor.peek(G.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let u = 0; u < G.SCRIPT.length; u++)
        this._emitCodePoint(this._consume());
      this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else this._ensureHibernation() || (this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(t) {
    switch (t) {
      case n.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case n.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(M);
        break;
      }
      case n.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(t) {
    switch (t) {
      case n.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case n.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(M);
        break;
      }
      case n.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(t) {
    switch (t) {
      case n.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case n.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this.state = o.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(M);
        break;
      }
      case n.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(t) {
    t === n.SOLIDUS ? (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(t) {
    if (this.preprocessor.startsWith(G.SCRIPT, !1) && zt(this.preprocessor.peek(G.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let u = 0; u < G.SCRIPT.length; u++)
        this._emitCodePoint(this._consume());
      this.state = o.SCRIPT_DATA_ESCAPED;
    } else this._ensureHibernation() || (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(t) {
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED:
        break;
      case n.SOLIDUS:
      case n.GREATER_THAN_SIGN:
      case n.EOF: {
        this.state = o.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case n.EQUALS_SIGN: {
        this._err(E.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = o.ATTRIBUTE_NAME;
        break;
      }
      default:
        this._createAttr(""), this.state = o.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(t) {
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED:
      case n.SOLIDUS:
      case n.GREATER_THAN_SIGN:
      case n.EOF: {
        this._leaveAttrName(), this.state = o.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case n.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = o.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case n.QUOTATION_MARK:
      case n.APOSTROPHE:
      case n.LESS_THAN_SIGN: {
        this._err(E.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this.currentAttr.name += M;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(Re(t) ? Ye(t) : t);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(t) {
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED:
        break;
      case n.SOLIDUS: {
        this.state = o.SELF_CLOSING_START_TAG;
        break;
      }
      case n.EQUALS_SIGN: {
        this.state = o.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case n.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""), this.state = o.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(t) {
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED:
        break;
      case n.QUOTATION_MARK: {
        this.state = o.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case n.APOSTROPHE: {
        this.state = o.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.missingAttributeValue), this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      default:
        this.state = o.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(t);
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(t) {
    switch (t) {
      case n.QUOTATION_MARK: {
        this.state = o.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case n.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this.currentAttr.value += M;
        break;
      }
      case n.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(t) {
    switch (t) {
      case n.APOSTROPHE: {
        this.state = o.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case n.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this.currentAttr.value += M;
        break;
      }
      case n.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(t) {
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED: {
        this._leaveAttrValue(), this.state = o.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case n.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), this.currentAttr.value += M;
        break;
      }
      case n.QUOTATION_MARK:
      case n.APOSTROPHE:
      case n.LESS_THAN_SIGN:
      case n.EQUALS_SIGN:
      case n.GRAVE_ACCENT: {
        this._err(E.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
        break;
      }
      case n.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(t) {
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED: {
        this._leaveAttrValue(), this.state = o.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case n.SOLIDUS: {
        this._leaveAttrValue(), this.state = o.SELF_CLOSING_START_TAG;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case n.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingWhitespaceBetweenAttributes), this.state = o.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(t) {
    switch (t) {
      case n.GREATER_THAN_SIGN: {
        const u = this.currentToken;
        u.selfClosing = !0, this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case n.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.unexpectedSolidusInTag), this.state = o.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(t) {
    const u = this.currentToken;
    switch (t) {
      case n.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case n.EOF: {
        this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), u.data += M;
        break;
      }
      default:
        u.data += String.fromCodePoint(t);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(t) {
    this._consumeSequenceIfMatch(G.DASH_DASH, !0) ? (this._createCommentToken(G.DASH_DASH.length + 1), this.state = o.COMMENT_START) : this._consumeSequenceIfMatch(G.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(G.DOCTYPE.length + 1), this.state = o.DOCTYPE) : this._consumeSequenceIfMatch(G.CDATA_START, !0) ? this.inForeignNode ? this.state = o.CDATA_SECTION : (this._err(E.cdataInHtmlContent), this._createCommentToken(G.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = o.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(E.incorrectlyOpenedComment), this._createCommentToken(2), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(t) {
    switch (t) {
      case n.HYPHEN_MINUS: {
        this.state = o.COMMENT_START_DASH;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.abruptClosingOfEmptyComment), this.state = o.DATA;
        const u = this.currentToken;
        this.emitCurrentComment(u);
        break;
      }
      default:
        this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(t) {
    const u = this.currentToken;
    switch (t) {
      case n.HYPHEN_MINUS: {
        this.state = o.COMMENT_END;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.abruptClosingOfEmptyComment), this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case n.EOF: {
        this._err(E.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "-", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(t) {
    const u = this.currentToken;
    switch (t) {
      case n.HYPHEN_MINUS: {
        this.state = o.COMMENT_END_DASH;
        break;
      }
      case n.LESS_THAN_SIGN: {
        u.data += "<", this.state = o.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), u.data += M;
        break;
      }
      case n.EOF: {
        this._err(E.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += String.fromCodePoint(t);
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(t) {
    const u = this.currentToken;
    switch (t) {
      case n.EXCLAMATION_MARK: {
        u.data += "!", this.state = o.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case n.LESS_THAN_SIGN: {
        u.data += "<";
        break;
      }
      default:
        this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(t) {
    t === n.HYPHEN_MINUS ? this.state = o.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = o.COMMENT, this._stateComment(t));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(t) {
    t === n.HYPHEN_MINUS ? this.state = o.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = o.COMMENT_END_DASH, this._stateCommentEndDash(t));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(t) {
    t !== n.GREATER_THAN_SIGN && t !== n.EOF && this._err(E.nestedComment), this.state = o.COMMENT_END, this._stateCommentEnd(t);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(t) {
    const u = this.currentToken;
    switch (t) {
      case n.HYPHEN_MINUS: {
        this.state = o.COMMENT_END;
        break;
      }
      case n.EOF: {
        this._err(E.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "-", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(t) {
    const u = this.currentToken;
    switch (t) {
      case n.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case n.EXCLAMATION_MARK: {
        this.state = o.COMMENT_END_BANG;
        break;
      }
      case n.HYPHEN_MINUS: {
        u.data += "-";
        break;
      }
      case n.EOF: {
        this._err(E.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "--", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(t) {
    const u = this.currentToken;
    switch (t) {
      case n.HYPHEN_MINUS: {
        u.data += "--!", this.state = o.COMMENT_END_DASH;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.incorrectlyClosedComment), this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case n.EOF: {
        this._err(E.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "--!", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(t) {
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED: {
        this.state = o.BEFORE_DOCTYPE_NAME;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this.state = o.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), this._createDoctypeToken(null);
        const u = this.currentToken;
        u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingWhitespaceBeforeDoctypeName), this.state = o.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(t) {
    if (Re(t))
      this._createDoctypeToken(String.fromCharCode(Ye(t))), this.state = o.DOCTYPE_NAME;
    else
      switch (t) {
        case n.SPACE:
        case n.LINE_FEED:
        case n.TABULATION:
        case n.FORM_FEED:
          break;
        case n.NULL: {
          this._err(E.unexpectedNullCharacter), this._createDoctypeToken(M), this.state = o.DOCTYPE_NAME;
          break;
        }
        case n.GREATER_THAN_SIGN: {
          this._err(E.missingDoctypeName), this._createDoctypeToken(null);
          const u = this.currentToken;
          u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case n.EOF: {
          this._err(E.eofInDoctype), this._createDoctypeToken(null);
          const u = this.currentToken;
          u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(t)), this.state = o.DOCTYPE_NAME;
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(t) {
    const u = this.currentToken;
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED: {
        this.state = o.AFTER_DOCTYPE_NAME;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), u.name += M;
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.name += String.fromCodePoint(Re(t) ? Ye(t) : t);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(t) {
    const u = this.currentToken;
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED:
        break;
      case n.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(G.PUBLIC, !1) ? this.state = o.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(G.SYSTEM, !1) ? this.state = o.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(E.invalidCharacterSequenceAfterDoctypeName), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(t) {
    const u = this.currentToken;
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED: {
        this.state = o.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case n.QUOTATION_MARK: {
        this._err(E.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case n.APOSTROPHE: {
        this._err(E.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.missingDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED:
        break;
      case n.QUOTATION_MARK: {
        u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case n.APOSTROPHE: {
        u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.missingDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case n.QUOTATION_MARK: {
        this.state = o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), u.publicId += M;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.abruptDoctypePublicIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.publicId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case n.APOSTROPHE: {
        this.state = o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), u.publicId += M;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.abruptDoctypePublicIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.publicId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED: {
        this.state = o.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case n.QUOTATION_MARK: {
        this._err(E.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case n.APOSTROPHE: {
        this._err(E.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
    const u = this.currentToken;
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED:
        break;
      case n.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case n.QUOTATION_MARK: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case n.APOSTROPHE: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(t) {
    const u = this.currentToken;
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED: {
        this.state = o.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case n.QUOTATION_MARK: {
        this._err(E.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case n.APOSTROPHE: {
        this._err(E.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.missingDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED:
        break;
      case n.QUOTATION_MARK: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case n.APOSTROPHE: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.missingDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case n.QUOTATION_MARK: {
        this.state = o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), u.systemId += M;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.abruptDoctypeSystemIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.systemId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case n.APOSTROPHE: {
        this.state = o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter), u.systemId += M;
        break;
      }
      case n.GREATER_THAN_SIGN: {
        this._err(E.abruptDoctypeSystemIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.systemId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case n.SPACE:
      case n.LINE_FEED:
      case n.TABULATION:
      case n.FORM_FEED:
        break;
      case n.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case n.EOF: {
        this._err(E.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(t) {
    const u = this.currentToken;
    switch (t) {
      case n.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case n.NULL: {
        this._err(E.unexpectedNullCharacter);
        break;
      }
      case n.EOF: {
        this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(t) {
    switch (t) {
      case n.RIGHT_SQUARE_BRACKET: {
        this.state = o.CDATA_SECTION_BRACKET;
        break;
      }
      case n.EOF: {
        this._err(E.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(t) {
    t === n.RIGHT_SQUARE_BRACKET ? this.state = o.CDATA_SECTION_END : (this._emitChars("]"), this.state = o.CDATA_SECTION, this._stateCdataSection(t));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(t) {
    switch (t) {
      case n.GREATER_THAN_SIGN: {
        this.state = o.DATA;
        break;
      }
      case n.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"), this.state = o.CDATA_SECTION, this._stateCdataSection(t);
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference() {
    let t = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
    if (t < 0)
      if (this.preprocessor.lastChunkWritten)
        t = this.entityDecoder.end();
      else {
        this.active = !1, this.preprocessor.pos = this.preprocessor.html.length - 1, this.consumedAfterSnapshot = 0, this.preprocessor.endOfChunkHit = !0;
        return;
      }
    t === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(n.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && Vt(this.preprocessor.peek(1)) ? o.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    Vt(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === n.SEMICOLON && this._err(E.unknownNamedCharacterReference), this.state = this.returnState, this._callState(t));
  }
}
const Du = /* @__PURE__ */ new Set([a.DD, a.DT, a.LI, a.OPTGROUP, a.OPTION, a.P, a.RB, a.RP, a.RT, a.RTC]), Kt = /* @__PURE__ */ new Set([
  ...Du,
  a.CAPTION,
  a.COLGROUP,
  a.TBODY,
  a.TD,
  a.TFOOT,
  a.TH,
  a.THEAD,
  a.TR
]), qe = /* @__PURE__ */ new Set([
  a.APPLET,
  a.CAPTION,
  a.HTML,
  a.MARQUEE,
  a.OBJECT,
  a.TABLE,
  a.TD,
  a.TEMPLATE,
  a.TH
]), Zr = /* @__PURE__ */ new Set([...qe, a.OL, a.UL]), es = /* @__PURE__ */ new Set([...qe, a.BUTTON]), Xt = /* @__PURE__ */ new Set([a.ANNOTATION_XML, a.MI, a.MN, a.MO, a.MS, a.MTEXT]), jt = /* @__PURE__ */ new Set([a.DESC, a.FOREIGN_OBJECT, a.TITLE]), ts = /* @__PURE__ */ new Set([a.TR, a.TEMPLATE, a.HTML]), us = /* @__PURE__ */ new Set([a.TBODY, a.TFOOT, a.THEAD, a.TEMPLATE, a.HTML]), as = /* @__PURE__ */ new Set([a.TABLE, a.TEMPLATE, a.HTML]), rs = /* @__PURE__ */ new Set([a.TD, a.TH]);
class ss {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(t, u, r) {
    this.treeAdapter = u, this.handler = r, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = a.UNKNOWN, this.current = t;
  }
  //Index of element
  _indexOf(t) {
    return this.items.lastIndexOf(t, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === a.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === T.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(t, u) {
    this.stackTop++, this.items[this.stackTop] = t, this.current = t, this.tagIDs[this.stackTop] = u, this.currentTagId = u, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(t, u, !0);
  }
  pop() {
    const t = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !0);
  }
  replace(t, u) {
    const r = this._indexOf(t);
    this.items[r] = u, r === this.stackTop && (this.current = u);
  }
  insertAfter(t, u, r) {
    const s = this._indexOf(t) + 1;
    this.items.splice(s, 0, u), this.tagIDs.splice(s, 0, r), this.stackTop++, s === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, s === this.stackTop);
  }
  popUntilTagNamePopped(t) {
    let u = this.stackTop + 1;
    do
      u = this.tagIDs.lastIndexOf(t, u - 1);
    while (u > 0 && this.treeAdapter.getNamespaceURI(this.items[u]) !== T.HTML);
    this.shortenToLength(Math.max(u, 0));
  }
  shortenToLength(t) {
    for (; this.stackTop >= t; ) {
      const u = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(u, this.stackTop < t);
    }
  }
  popUntilElementPopped(t) {
    const u = this._indexOf(t);
    this.shortenToLength(Math.max(u, 0));
  }
  popUntilPopped(t, u) {
    const r = this._indexOfTagNames(t, u);
    this.shortenToLength(Math.max(r, 0));
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(ft, T.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(rs, T.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(t, u) {
    for (let r = this.stackTop; r >= 0; r--)
      if (t.has(this.tagIDs[r]) && this.treeAdapter.getNamespaceURI(this.items[r]) === u)
        return r;
    return -1;
  }
  clearBackTo(t, u) {
    const r = this._indexOfTagNames(t, u);
    this.shortenToLength(r + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(as, T.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(us, T.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(ts, T.HTML);
  }
  remove(t) {
    const u = this._indexOf(t);
    u >= 0 && (u === this.stackTop ? this.pop() : (this.items.splice(u, 1), this.tagIDs.splice(u, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === a.BODY ? this.items[1] : null;
  }
  contains(t) {
    return this._indexOf(t) > -1;
  }
  getCommonAncestor(t) {
    const u = this._indexOf(t) - 1;
    return u >= 0 ? this.items[u] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === a.HTML;
  }
  //Element in scope
  hasInDynamicScope(t, u) {
    for (let r = this.stackTop; r >= 0; r--) {
      const s = this.tagIDs[r];
      switch (this.treeAdapter.getNamespaceURI(this.items[r])) {
        case T.HTML: {
          if (s === t)
            return !0;
          if (u.has(s))
            return !1;
          break;
        }
        case T.SVG: {
          if (jt.has(s))
            return !1;
          break;
        }
        case T.MATHML: {
          if (Xt.has(s))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInScope(t) {
    return this.hasInDynamicScope(t, qe);
  }
  hasInListItemScope(t) {
    return this.hasInDynamicScope(t, Zr);
  }
  hasInButtonScope(t) {
    return this.hasInDynamicScope(t, es);
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const u = this.tagIDs[t];
      switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
        case T.HTML: {
          if (ft.has(u))
            return !0;
          if (qe.has(u))
            return !1;
          break;
        }
        case T.SVG: {
          if (jt.has(u))
            return !1;
          break;
        }
        case T.MATHML: {
          if (Xt.has(u))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInTableScope(t) {
    for (let u = this.stackTop; u >= 0; u--)
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === T.HTML)
        switch (this.tagIDs[u]) {
          case t:
            return !0;
          case a.TABLE:
          case a.HTML:
            return !1;
        }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let t = this.stackTop; t >= 0; t--)
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === T.HTML)
        switch (this.tagIDs[t]) {
          case a.TBODY:
          case a.THEAD:
          case a.TFOOT:
            return !0;
          case a.TABLE:
          case a.HTML:
            return !1;
        }
    return !0;
  }
  hasInSelectScope(t) {
    for (let u = this.stackTop; u >= 0; u--)
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === T.HTML)
        switch (this.tagIDs[u]) {
          case t:
            return !0;
          case a.OPTION:
          case a.OPTGROUP:
            break;
          default:
            return !1;
        }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; this.currentTagId !== void 0 && Du.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; this.currentTagId !== void 0 && Kt.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== void 0 && this.currentTagId !== t && Kt.has(this.currentTagId); )
      this.pop();
  }
}
const nt = 3;
var K;
(function(e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(K || (K = {}));
const $t = { type: K.Marker };
class ns {
  constructor(t) {
    this.treeAdapter = t, this.entries = [], this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(t, u) {
    const r = [], s = u.length, i = this.treeAdapter.getTagName(t), l = this.treeAdapter.getNamespaceURI(t);
    for (let d = 0; d < this.entries.length; d++) {
      const m = this.entries[d];
      if (m.type === K.Marker)
        break;
      const { element: p } = m;
      if (this.treeAdapter.getTagName(p) === i && this.treeAdapter.getNamespaceURI(p) === l) {
        const g = this.treeAdapter.getAttrList(p);
        g.length === s && r.push({ idx: d, attrs: g });
      }
    }
    return r;
  }
  _ensureNoahArkCondition(t) {
    if (this.entries.length < nt)
      return;
    const u = this.treeAdapter.getAttrList(t), r = this._getNoahArkConditionCandidates(t, u);
    if (r.length < nt)
      return;
    const s = new Map(u.map((l) => [l.name, l.value]));
    let i = 0;
    for (let l = 0; l < r.length; l++) {
      const d = r[l];
      d.attrs.every((m) => s.get(m.name) === m.value) && (i += 1, i >= nt && this.entries.splice(d.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift($t);
  }
  pushElement(t, u) {
    this._ensureNoahArkCondition(t), this.entries.unshift({
      type: K.Element,
      element: t,
      token: u
    });
  }
  insertElementAfterBookmark(t, u) {
    const r = this.entries.indexOf(this.bookmark);
    this.entries.splice(r, 0, {
      type: K.Element,
      element: t,
      token: u
    });
  }
  removeEntry(t) {
    const u = this.entries.indexOf(t);
    u !== -1 && this.entries.splice(u, 1);
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    const t = this.entries.indexOf($t);
    t === -1 ? this.entries.length = 0 : this.entries.splice(0, t + 1);
  }
  //Search
  getElementEntryInScopeWithTagName(t) {
    const u = this.entries.find((r) => r.type === K.Marker || this.treeAdapter.getTagName(r.element) === t);
    return u && u.type === K.Element ? u : null;
  }
  getElementEntry(t) {
    return this.entries.find((u) => u.type === K.Element && u.element === t);
  }
}
const ne = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: q.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(e, t, u) {
    return {
      nodeName: e,
      tagName: e,
      attrs: u,
      namespaceURI: t,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(e) {
    return {
      nodeName: "#comment",
      data: e,
      parentNode: null
    };
  },
  createTextNode(e) {
    return {
      nodeName: "#text",
      value: e,
      parentNode: null
    };
  },
  //Tree mutation
  appendChild(e, t) {
    e.childNodes.push(t), t.parentNode = e;
  },
  insertBefore(e, t, u) {
    const r = e.childNodes.indexOf(u);
    e.childNodes.splice(r, 0, t), t.parentNode = e;
  },
  setTemplateContent(e, t) {
    e.content = t;
  },
  getTemplateContent(e) {
    return e.content;
  },
  setDocumentType(e, t, u, r) {
    const s = e.childNodes.find((i) => i.nodeName === "#documentType");
    if (s)
      s.name = t, s.publicId = u, s.systemId = r;
    else {
      const i = {
        nodeName: "#documentType",
        name: t,
        publicId: u,
        systemId: r,
        parentNode: null
      };
      ne.appendChild(e, i);
    }
  },
  setDocumentMode(e, t) {
    e.mode = t;
  },
  getDocumentMode(e) {
    return e.mode;
  },
  detachNode(e) {
    if (e.parentNode) {
      const t = e.parentNode.childNodes.indexOf(e);
      e.parentNode.childNodes.splice(t, 1), e.parentNode = null;
    }
  },
  insertText(e, t) {
    if (e.childNodes.length > 0) {
      const u = e.childNodes[e.childNodes.length - 1];
      if (ne.isTextNode(u)) {
        u.value += t;
        return;
      }
    }
    ne.appendChild(e, ne.createTextNode(t));
  },
  insertTextBefore(e, t, u) {
    const r = e.childNodes[e.childNodes.indexOf(u) - 1];
    r && ne.isTextNode(r) ? r.value += t : ne.insertBefore(e, ne.createTextNode(t), u);
  },
  adoptAttributes(e, t) {
    const u = new Set(e.attrs.map((r) => r.name));
    for (let r = 0; r < t.length; r++)
      u.has(t[r].name) || e.attrs.push(t[r]);
  },
  //Tree traversing
  getFirstChild(e) {
    return e.childNodes[0];
  },
  getChildNodes(e) {
    return e.childNodes;
  },
  getParentNode(e) {
    return e.parentNode;
  },
  getAttrList(e) {
    return e.attrs;
  },
  //Node data
  getTagName(e) {
    return e.tagName;
  },
  getNamespaceURI(e) {
    return e.namespaceURI;
  },
  getTextNodeContent(e) {
    return e.value;
  },
  getCommentNodeContent(e) {
    return e.data;
  },
  getDocumentTypeNodeName(e) {
    return e.name;
  },
  getDocumentTypeNodePublicId(e) {
    return e.publicId;
  },
  getDocumentTypeNodeSystemId(e) {
    return e.systemId;
  },
  //Node types
  isTextNode(e) {
    return e.nodeName === "#text";
  },
  isCommentNode(e) {
    return e.nodeName === "#comment";
  },
  isDocumentTypeNode(e) {
    return e.nodeName === "#documentType";
  },
  isElementNode(e) {
    return Object.prototype.hasOwnProperty.call(e, "tagName");
  },
  // Source code location
  setNodeSourceCodeLocation(e, t) {
    e.sourceCodeLocation = t;
  },
  getNodeSourceCodeLocation(e) {
    return e.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(e, t) {
    e.sourceCodeLocation = { ...e.sourceCodeLocation, ...t };
  }
}, xu = "html", is = "about:legacy-compat", os = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", Pu = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
], cs = [
  ...Pu,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], ls = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), yu = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], ds = [
  ...yu,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function Jt(e, t) {
  return t.some((u) => e.startsWith(u));
}
function hs(e) {
  return e.name === xu && e.publicId === null && (e.systemId === null || e.systemId === is);
}
function fs(e) {
  if (e.name !== xu)
    return q.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === os)
    return q.QUIRKS;
  let { publicId: u } = e;
  if (u !== null) {
    if (u = u.toLowerCase(), ls.has(u))
      return q.QUIRKS;
    let r = t === null ? cs : Pu;
    if (Jt(u, r))
      return q.QUIRKS;
    if (r = t === null ? yu : ds, Jt(u, r))
      return q.LIMITED_QUIRKS;
  }
  return q.NO_QUIRKS;
}
const Zt = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, Es = "definitionurl", ms = "definitionURL", Ts = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((e) => [e.toLowerCase(), e])), bs = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: T.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: T.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: T.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: T.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: T.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: T.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: T.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: T.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: T.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: T.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: T.XMLNS }]
]), ps = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((e) => [e.toLowerCase(), e])), gs = /* @__PURE__ */ new Set([
  a.B,
  a.BIG,
  a.BLOCKQUOTE,
  a.BODY,
  a.BR,
  a.CENTER,
  a.CODE,
  a.DD,
  a.DIV,
  a.DL,
  a.DT,
  a.EM,
  a.EMBED,
  a.H1,
  a.H2,
  a.H3,
  a.H4,
  a.H5,
  a.H6,
  a.HEAD,
  a.HR,
  a.I,
  a.IMG,
  a.LI,
  a.LISTING,
  a.MENU,
  a.META,
  a.NOBR,
  a.OL,
  a.P,
  a.PRE,
  a.RUBY,
  a.S,
  a.SMALL,
  a.SPAN,
  a.STRONG,
  a.STRIKE,
  a.SUB,
  a.SUP,
  a.TABLE,
  a.TT,
  a.U,
  a.UL,
  a.VAR
]);
function _s(e) {
  const t = e.tagID;
  return t === a.FONT && e.attrs.some(({ name: r }) => r === he.COLOR || r === he.SIZE || r === he.FACE) || gs.has(t);
}
function ku(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === Es) {
      e.attrs[t].name = ms;
      break;
    }
}
function Mu(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const u = Ts.get(e.attrs[t].name);
    u != null && (e.attrs[t].name = u);
  }
}
function gt(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const u = bs.get(e.attrs[t].name);
    u && (e.attrs[t].prefix = u.prefix, e.attrs[t].name = u.name, e.attrs[t].namespace = u.namespace);
  }
}
function As(e) {
  const t = ps.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = $e(e.tagName));
}
function Ns(e, t) {
  return t === T.MATHML && (e === a.MI || e === a.MO || e === a.MN || e === a.MS || e === a.MTEXT);
}
function Is(e, t, u) {
  if (t === T.MATHML && e === a.ANNOTATION_XML) {
    for (let r = 0; r < u.length; r++)
      if (u[r].name === he.ENCODING) {
        const s = u[r].value.toLowerCase();
        return s === Zt.TEXT_HTML || s === Zt.APPLICATION_XML;
      }
  }
  return t === T.SVG && (e === a.FOREIGN_OBJECT || e === a.DESC || e === a.TITLE);
}
function Cs(e, t, u, r) {
  return (!r || r === T.HTML) && Is(e, t, u) || (!r || r === T.MATHML) && Ns(e, t);
}
const Ss = "hidden", Ls = 8, Os = 3;
var c;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(c || (c = {}));
const Rs = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, Bu = /* @__PURE__ */ new Set([a.TABLE, a.TBODY, a.TFOOT, a.THEAD, a.TR]), eu = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: ne,
  onParseError: null
};
class Ds {
  constructor(t, u, r = null, s = null) {
    this.fragmentContext = r, this.scriptHandler = s, this.currentToken = null, this.stopped = !1, this.insertionMode = c.INITIAL, this.originalInsertionMode = c.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...eu,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = u ?? this.treeAdapter.createDocument(), this.tokenizer = new Jr(this.options, this), this.activeFormattingElements = new ns(this.treeAdapter), this.fragmentContextID = r ? $e(this.treeAdapter.getTagName(r)) : a.UNKNOWN, this._setContextModes(r ?? this.document, this.fragmentContextID), this.openElements = new ss(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, u) {
    const r = new this(u);
    return r.tokenizer.write(t, !0), r.document;
  }
  static getFragmentParser(t, u) {
    const r = {
      ...eu,
      ...u
    };
    t ?? (t = r.treeAdapter.createElement(h.TEMPLATE, T.HTML, []));
    const s = r.treeAdapter.createElement("documentmock", T.HTML, []), i = new this(r, s, t);
    return i.fragmentContextID === a.TEMPLATE && i.tmplInsertionModeStack.unshift(c.IN_TEMPLATE), i._initTokenizerForFragmentParsing(), i._insertFakeRootElement(), i._resetInsertionMode(), i._findFormInFragmentContext(), i;
  }
  getFragment() {
    const t = this.treeAdapter.getFirstChild(this.document), u = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(t, u), u;
  }
  //Errors
  /** @internal */
  _err(t, u, r) {
    var s;
    if (!this.onParseError)
      return;
    const i = (s = t.location) !== null && s !== void 0 ? s : Rs, l = {
      code: u,
      startLine: i.startLine,
      startCol: i.startCol,
      startOffset: i.startOffset,
      endLine: r ? i.startLine : i.endLine,
      endCol: r ? i.startCol : i.endCol,
      endOffset: r ? i.startOffset : i.endOffset
    };
    this.onParseError(l);
  }
  //Stack events
  /** @internal */
  onItemPush(t, u, r) {
    var s, i;
    (i = (s = this.treeAdapter).onItemPush) === null || i === void 0 || i.call(s, t), r && this.openElements.stackTop > 0 && this._setContextModes(t, u);
  }
  /** @internal */
  onItemPop(t, u) {
    var r, s;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(t, this.currentToken), (s = (r = this.treeAdapter).onItemPop) === null || s === void 0 || s.call(r, t, this.openElements.current), u) {
      let i, l;
      this.openElements.stackTop === 0 && this.fragmentContext ? (i = this.fragmentContext, l = this.fragmentContextID) : { current: i, currentTagId: l } = this.openElements, this._setContextModes(i, l);
    }
  }
  _setContextModes(t, u) {
    const r = t === this.document || t && this.treeAdapter.getNamespaceURI(t) === T.HTML;
    this.currentNotInHTML = !r, this.tokenizer.inForeignNode = !r && t !== void 0 && u !== void 0 && !this._isIntegrationPoint(u, t);
  }
  /** @protected */
  _switchToTextParsing(t, u) {
    this._insertElement(t, T.HTML), this.tokenizer.state = u, this.originalInsertionMode = this.insertionMode, this.insertionMode = c.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = c.TEXT, this.originalInsertionMode = c.IN_BODY, this.tokenizer.state = Q.PLAINTEXT;
  }
  //Fragment parsing
  /** @protected */
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  /** @protected */
  _findFormInFragmentContext() {
    let t = this.fragmentContext;
    for (; t; ) {
      if (this.treeAdapter.getTagName(t) === h.FORM) {
        this.formElement = t;
        break;
      }
      t = this.treeAdapter.getParentNode(t);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== T.HTML))
      switch (this.fragmentContextID) {
        case a.TITLE:
        case a.TEXTAREA: {
          this.tokenizer.state = Q.RCDATA;
          break;
        }
        case a.STYLE:
        case a.XMP:
        case a.IFRAME:
        case a.NOEMBED:
        case a.NOFRAMES:
        case a.NOSCRIPT: {
          this.tokenizer.state = Q.RAWTEXT;
          break;
        }
        case a.SCRIPT: {
          this.tokenizer.state = Q.SCRIPT_DATA;
          break;
        }
        case a.PLAINTEXT: {
          this.tokenizer.state = Q.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  /** @protected */
  _setDocumentType(t) {
    const u = t.name || "", r = t.publicId || "", s = t.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, u, r, s), t.location) {
      const l = this.treeAdapter.getChildNodes(this.document).find((d) => this.treeAdapter.isDocumentTypeNode(d));
      l && this.treeAdapter.setNodeSourceCodeLocation(l, t.location);
    }
  }
  /** @protected */
  _attachElementToTree(t, u) {
    if (this.options.sourceCodeLocationInfo) {
      const r = u && {
        ...u,
        startTag: u
      };
      this.treeAdapter.setNodeSourceCodeLocation(t, r);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(t);
    else {
      const r = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(r ?? this.document, t);
    }
  }
  /**
   * For self-closing tags. Add an element to the tree, but skip adding it
   * to the stack.
   */
  /** @protected */
  _appendElement(t, u) {
    const r = this.treeAdapter.createElement(t.tagName, u, t.attrs);
    this._attachElementToTree(r, t.location);
  }
  /** @protected */
  _insertElement(t, u) {
    const r = this.treeAdapter.createElement(t.tagName, u, t.attrs);
    this._attachElementToTree(r, t.location), this.openElements.push(r, t.tagID);
  }
  /** @protected */
  _insertFakeElement(t, u) {
    const r = this.treeAdapter.createElement(t, T.HTML, []);
    this._attachElementToTree(r, null), this.openElements.push(r, u);
  }
  /** @protected */
  _insertTemplate(t) {
    const u = this.treeAdapter.createElement(t.tagName, T.HTML, t.attrs), r = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(u, r), this._attachElementToTree(u, t.location), this.openElements.push(u, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(h.HTML, T.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(t, null), this.treeAdapter.appendChild(this.openElements.current, t), this.openElements.push(t, a.HTML);
  }
  /** @protected */
  _appendCommentNode(t, u) {
    const r = this.treeAdapter.createCommentNode(t.data);
    this.treeAdapter.appendChild(u, r), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, t.location);
  }
  /** @protected */
  _insertCharacters(t) {
    let u, r;
    if (this._shouldFosterParentOnInsertion() ? ({ parent: u, beforeElement: r } = this._findFosterParentingLocation(), r ? this.treeAdapter.insertTextBefore(u, t.chars, r) : this.treeAdapter.insertText(u, t.chars)) : (u = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(u, t.chars)), !t.location)
      return;
    const s = this.treeAdapter.getChildNodes(u), i = r ? s.lastIndexOf(r) : s.length, l = s[i - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(l)) {
      const { endLine: m, endCol: p, endOffset: g } = t.location;
      this.treeAdapter.updateNodeSourceCodeLocation(l, { endLine: m, endCol: p, endOffset: g });
    } else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(l, t.location);
  }
  /** @protected */
  _adoptNodes(t, u) {
    for (let r = this.treeAdapter.getFirstChild(t); r; r = this.treeAdapter.getFirstChild(t))
      this.treeAdapter.detachNode(r), this.treeAdapter.appendChild(u, r);
  }
  /** @protected */
  _setEndLocation(t, u) {
    if (this.treeAdapter.getNodeSourceCodeLocation(t) && u.location) {
      const r = u.location, s = this.treeAdapter.getTagName(t), i = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        u.type === D.END_TAG && s === u.tagName ? {
          endTag: { ...r },
          endLine: r.endLine,
          endCol: r.endCol,
          endOffset: r.endOffset
        } : {
          endLine: r.startLine,
          endCol: r.startCol,
          endOffset: r.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(t, i);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(t) {
    if (!this.currentNotInHTML)
      return !1;
    let u, r;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (u = this.fragmentContext, r = this.fragmentContextID) : { current: u, currentTagId: r } = this.openElements, t.tagID === a.SVG && this.treeAdapter.getTagName(u) === h.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(u) === T.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (t.tagID === a.MGLYPH || t.tagID === a.MALIGNMARK) && r !== void 0 && !this._isIntegrationPoint(r, u, T.HTML)
    );
  }
  /** @protected */
  _processToken(t) {
    switch (t.type) {
      case D.CHARACTER: {
        this.onCharacter(t);
        break;
      }
      case D.NULL_CHARACTER: {
        this.onNullCharacter(t);
        break;
      }
      case D.COMMENT: {
        this.onComment(t);
        break;
      }
      case D.DOCTYPE: {
        this.onDoctype(t);
        break;
      }
      case D.START_TAG: {
        this._processStartTag(t);
        break;
      }
      case D.END_TAG: {
        this.onEndTag(t);
        break;
      }
      case D.EOF: {
        this.onEof(t);
        break;
      }
      case D.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(t);
        break;
      }
    }
  }
  //Integration points
  /** @protected */
  _isIntegrationPoint(t, u, r) {
    const s = this.treeAdapter.getNamespaceURI(u), i = this.treeAdapter.getAttrList(u);
    return Cs(t, s, i, r);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const u = this.activeFormattingElements.entries.findIndex((s) => s.type === K.Marker || this.openElements.contains(s.element)), r = u === -1 ? t - 1 : u - 1;
      for (let s = r; s >= 0; s--) {
        const i = this.activeFormattingElements.entries[s];
        this._insertElement(i.token, this.treeAdapter.getNamespaceURI(i.element)), i.element = this.openElements.current;
      }
    }
  }
  //Close elements
  /** @protected */
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = c.IN_ROW;
  }
  /** @protected */
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(a.P), this.openElements.popUntilTagNamePopped(a.P);
  }
  //Insertion modes
  /** @protected */
  _resetInsertionMode() {
    for (let t = this.openElements.stackTop; t >= 0; t--)
      switch (t === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[t]) {
        case a.TR: {
          this.insertionMode = c.IN_ROW;
          return;
        }
        case a.TBODY:
        case a.THEAD:
        case a.TFOOT: {
          this.insertionMode = c.IN_TABLE_BODY;
          return;
        }
        case a.CAPTION: {
          this.insertionMode = c.IN_CAPTION;
          return;
        }
        case a.COLGROUP: {
          this.insertionMode = c.IN_COLUMN_GROUP;
          return;
        }
        case a.TABLE: {
          this.insertionMode = c.IN_TABLE;
          return;
        }
        case a.BODY: {
          this.insertionMode = c.IN_BODY;
          return;
        }
        case a.FRAMESET: {
          this.insertionMode = c.IN_FRAMESET;
          return;
        }
        case a.SELECT: {
          this._resetInsertionModeForSelect(t);
          return;
        }
        case a.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case a.HTML: {
          this.insertionMode = this.headElement ? c.AFTER_HEAD : c.BEFORE_HEAD;
          return;
        }
        case a.TD:
        case a.TH: {
          if (t > 0) {
            this.insertionMode = c.IN_CELL;
            return;
          }
          break;
        }
        case a.HEAD: {
          if (t > 0) {
            this.insertionMode = c.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = c.IN_BODY;
  }
  /** @protected */
  _resetInsertionModeForSelect(t) {
    if (t > 0)
      for (let u = t - 1; u > 0; u--) {
        const r = this.openElements.tagIDs[u];
        if (r === a.TEMPLATE)
          break;
        if (r === a.TABLE) {
          this.insertionMode = c.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = c.IN_SELECT;
  }
  //Foster parenting
  /** @protected */
  _isElementCausesFosterParenting(t) {
    return Bu.has(t);
  }
  /** @protected */
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  /** @protected */
  _findFosterParentingLocation() {
    for (let t = this.openElements.stackTop; t >= 0; t--) {
      const u = this.openElements.items[t];
      switch (this.openElements.tagIDs[t]) {
        case a.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(u) === T.HTML)
            return { parent: this.treeAdapter.getTemplateContent(u), beforeElement: null };
          break;
        }
        case a.TABLE: {
          const r = this.treeAdapter.getParentNode(u);
          return r ? { parent: r, beforeElement: u } : { parent: this.openElements.items[t - 1], beforeElement: null };
        }
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  /** @protected */
  _fosterParentElement(t) {
    const u = this._findFosterParentingLocation();
    u.beforeElement ? this.treeAdapter.insertBefore(u.parent, t, u.beforeElement) : this.treeAdapter.appendChild(u.parent, t);
  }
  //Special elements
  /** @protected */
  _isSpecialElement(t, u) {
    const r = this.treeAdapter.getNamespaceURI(t);
    return Kr[r].has(u);
  }
  /** @internal */
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      ni(this, t);
      return;
    }
    switch (this.insertionMode) {
      case c.INITIAL: {
        Le(this, t);
        break;
      }
      case c.BEFORE_HTML: {
        xe(this, t);
        break;
      }
      case c.BEFORE_HEAD: {
        Pe(this, t);
        break;
      }
      case c.IN_HEAD: {
        ye(this, t);
        break;
      }
      case c.IN_HEAD_NO_SCRIPT: {
        ke(this, t);
        break;
      }
      case c.AFTER_HEAD: {
        Me(this, t);
        break;
      }
      case c.IN_BODY:
      case c.IN_CAPTION:
      case c.IN_CELL:
      case c.IN_TEMPLATE: {
        Fu(this, t);
        break;
      }
      case c.TEXT:
      case c.IN_SELECT:
      case c.IN_SELECT_IN_TABLE: {
        this._insertCharacters(t);
        break;
      }
      case c.IN_TABLE:
      case c.IN_TABLE_BODY:
      case c.IN_ROW: {
        it(this, t);
        break;
      }
      case c.IN_TABLE_TEXT: {
        Gu(this, t);
        break;
      }
      case c.IN_COLUMN_GROUP: {
        Ve(this, t);
        break;
      }
      case c.AFTER_BODY: {
        ze(this, t);
        break;
      }
      case c.AFTER_AFTER_BODY: {
        Ge(this, t);
        break;
      }
    }
  }
  /** @internal */
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      si(this, t);
      return;
    }
    switch (this.insertionMode) {
      case c.INITIAL: {
        Le(this, t);
        break;
      }
      case c.BEFORE_HTML: {
        xe(this, t);
        break;
      }
      case c.BEFORE_HEAD: {
        Pe(this, t);
        break;
      }
      case c.IN_HEAD: {
        ye(this, t);
        break;
      }
      case c.IN_HEAD_NO_SCRIPT: {
        ke(this, t);
        break;
      }
      case c.AFTER_HEAD: {
        Me(this, t);
        break;
      }
      case c.TEXT: {
        this._insertCharacters(t);
        break;
      }
      case c.IN_TABLE:
      case c.IN_TABLE_BODY:
      case c.IN_ROW: {
        it(this, t);
        break;
      }
      case c.IN_COLUMN_GROUP: {
        Ve(this, t);
        break;
      }
      case c.AFTER_BODY: {
        ze(this, t);
        break;
      }
      case c.AFTER_AFTER_BODY: {
        Ge(this, t);
        break;
      }
    }
  }
  /** @internal */
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Et(this, t);
      return;
    }
    switch (this.insertionMode) {
      case c.INITIAL:
      case c.BEFORE_HTML:
      case c.BEFORE_HEAD:
      case c.IN_HEAD:
      case c.IN_HEAD_NO_SCRIPT:
      case c.AFTER_HEAD:
      case c.IN_BODY:
      case c.IN_TABLE:
      case c.IN_CAPTION:
      case c.IN_COLUMN_GROUP:
      case c.IN_TABLE_BODY:
      case c.IN_ROW:
      case c.IN_CELL:
      case c.IN_SELECT:
      case c.IN_SELECT_IN_TABLE:
      case c.IN_TEMPLATE:
      case c.IN_FRAMESET:
      case c.AFTER_FRAMESET: {
        Et(this, t);
        break;
      }
      case c.IN_TABLE_TEXT: {
        Oe(this, t);
        break;
      }
      case c.AFTER_BODY: {
        ws(this, t);
        break;
      }
      case c.AFTER_AFTER_BODY:
      case c.AFTER_AFTER_FRAMESET: {
        Fs(this, t);
        break;
      }
    }
  }
  /** @internal */
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case c.INITIAL: {
        Hs(this, t);
        break;
      }
      case c.BEFORE_HEAD:
      case c.IN_HEAD:
      case c.IN_HEAD_NO_SCRIPT:
      case c.AFTER_HEAD: {
        this._err(t, E.misplacedDoctype);
        break;
      }
      case c.IN_TABLE_TEXT: {
        Oe(this, t);
        break;
      }
    }
  }
  /** @internal */
  onStartTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, E.nonVoidHtmlElementStartTagWithTrailingSolidus);
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   * @protected
   */
  _processStartTag(t) {
    this.shouldProcessStartTagTokenInForeignContent(t) ? ii(this, t) : this._startTagOutsideForeignContent(t);
  }
  /** @protected */
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case c.INITIAL: {
        Le(this, t);
        break;
      }
      case c.BEFORE_HTML: {
        Us(this, t);
        break;
      }
      case c.BEFORE_HEAD: {
        Ys(this, t);
        break;
      }
      case c.IN_HEAD: {
        z(this, t);
        break;
      }
      case c.IN_HEAD_NO_SCRIPT: {
        Qs(this, t);
        break;
      }
      case c.AFTER_HEAD: {
        Vs(this, t);
        break;
      }
      case c.IN_BODY: {
        v(this, t);
        break;
      }
      case c.IN_TABLE: {
        ge(this, t);
        break;
      }
      case c.IN_TABLE_TEXT: {
        Oe(this, t);
        break;
      }
      case c.IN_CAPTION: {
        Gn(this, t);
        break;
      }
      case c.IN_COLUMN_GROUP: {
        Nt(this, t);
        break;
      }
      case c.IN_TABLE_BODY: {
        et(this, t);
        break;
      }
      case c.IN_ROW: {
        tt(this, t);
        break;
      }
      case c.IN_CELL: {
        Vn(this, t);
        break;
      }
      case c.IN_SELECT: {
        Vu(this, t);
        break;
      }
      case c.IN_SELECT_IN_TABLE: {
        Kn(this, t);
        break;
      }
      case c.IN_TEMPLATE: {
        jn(this, t);
        break;
      }
      case c.AFTER_BODY: {
        Jn(this, t);
        break;
      }
      case c.IN_FRAMESET: {
        Zn(this, t);
        break;
      }
      case c.AFTER_FRAMESET: {
        ti(this, t);
        break;
      }
      case c.AFTER_AFTER_BODY: {
        ai(this, t);
        break;
      }
      case c.AFTER_AFTER_FRAMESET: {
        ri(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? oi(this, t) : this._endTagOutsideForeignContent(t);
  }
  /** @protected */
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case c.INITIAL: {
        Le(this, t);
        break;
      }
      case c.BEFORE_HTML: {
        vs(this, t);
        break;
      }
      case c.BEFORE_HEAD: {
        Ws(this, t);
        break;
      }
      case c.IN_HEAD: {
        Gs(this, t);
        break;
      }
      case c.IN_HEAD_NO_SCRIPT: {
        qs(this, t);
        break;
      }
      case c.AFTER_HEAD: {
        zs(this, t);
        break;
      }
      case c.IN_BODY: {
        Ze(this, t);
        break;
      }
      case c.TEXT: {
        kn(this, t);
        break;
      }
      case c.IN_TABLE: {
        we(this, t);
        break;
      }
      case c.IN_TABLE_TEXT: {
        Oe(this, t);
        break;
      }
      case c.IN_CAPTION: {
        Qn(this, t);
        break;
      }
      case c.IN_COLUMN_GROUP: {
        qn(this, t);
        break;
      }
      case c.IN_TABLE_BODY: {
        mt(this, t);
        break;
      }
      case c.IN_ROW: {
        qu(this, t);
        break;
      }
      case c.IN_CELL: {
        zn(this, t);
        break;
      }
      case c.IN_SELECT: {
        zu(this, t);
        break;
      }
      case c.IN_SELECT_IN_TABLE: {
        Xn(this, t);
        break;
      }
      case c.IN_TEMPLATE: {
        $n(this, t);
        break;
      }
      case c.AFTER_BODY: {
        Xu(this, t);
        break;
      }
      case c.IN_FRAMESET: {
        ei(this, t);
        break;
      }
      case c.AFTER_FRAMESET: {
        ui(this, t);
        break;
      }
      case c.AFTER_AFTER_BODY: {
        Ge(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEof(t) {
    switch (this.insertionMode) {
      case c.INITIAL: {
        Le(this, t);
        break;
      }
      case c.BEFORE_HTML: {
        xe(this, t);
        break;
      }
      case c.BEFORE_HEAD: {
        Pe(this, t);
        break;
      }
      case c.IN_HEAD: {
        ye(this, t);
        break;
      }
      case c.IN_HEAD_NO_SCRIPT: {
        ke(this, t);
        break;
      }
      case c.AFTER_HEAD: {
        Me(this, t);
        break;
      }
      case c.IN_BODY:
      case c.IN_TABLE:
      case c.IN_CAPTION:
      case c.IN_COLUMN_GROUP:
      case c.IN_TABLE_BODY:
      case c.IN_ROW:
      case c.IN_CELL:
      case c.IN_SELECT:
      case c.IN_SELECT_IN_TABLE: {
        Yu(this, t);
        break;
      }
      case c.TEXT: {
        Mn(this, t);
        break;
      }
      case c.IN_TABLE_TEXT: {
        Oe(this, t);
        break;
      }
      case c.IN_TEMPLATE: {
        Ku(this, t);
        break;
      }
      case c.AFTER_BODY:
      case c.IN_FRAMESET:
      case c.AFTER_FRAMESET:
      case c.AFTER_AFTER_BODY:
      case c.AFTER_AFTER_FRAMESET: {
        At(this, t);
        break;
      }
    }
  }
  /** @internal */
  onWhitespaceCharacter(t) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, t.chars.charCodeAt(0) === n.LINE_FEED)) {
      if (t.chars.length === 1)
        return;
      t.chars = t.chars.substr(1);
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(t);
      return;
    }
    switch (this.insertionMode) {
      case c.IN_HEAD:
      case c.IN_HEAD_NO_SCRIPT:
      case c.AFTER_HEAD:
      case c.TEXT:
      case c.IN_COLUMN_GROUP:
      case c.IN_SELECT:
      case c.IN_SELECT_IN_TABLE:
      case c.IN_FRAMESET:
      case c.AFTER_FRAMESET: {
        this._insertCharacters(t);
        break;
      }
      case c.IN_BODY:
      case c.IN_CAPTION:
      case c.IN_CELL:
      case c.IN_TEMPLATE:
      case c.AFTER_BODY:
      case c.AFTER_AFTER_BODY:
      case c.AFTER_AFTER_FRAMESET: {
        wu(this, t);
        break;
      }
      case c.IN_TABLE:
      case c.IN_TABLE_BODY:
      case c.IN_ROW: {
        it(this, t);
        break;
      }
      case c.IN_TABLE_TEXT: {
        Wu(this, t);
        break;
      }
    }
  }
}
function xs(e, t) {
  let u = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return u ? e.openElements.contains(u.element) ? e.openElements.hasInScope(t.tagID) || (u = null) : (e.activeFormattingElements.removeEntry(u), u = null) : vu(e, t), u;
}
function Ps(e, t) {
  let u = null, r = e.openElements.stackTop;
  for (; r >= 0; r--) {
    const s = e.openElements.items[r];
    if (s === t.element)
      break;
    e._isSpecialElement(s, e.openElements.tagIDs[r]) && (u = s);
  }
  return u || (e.openElements.shortenToLength(Math.max(r, 0)), e.activeFormattingElements.removeEntry(t)), u;
}
function ys(e, t, u) {
  let r = t, s = e.openElements.getCommonAncestor(t);
  for (let i = 0, l = s; l !== u; i++, l = s) {
    s = e.openElements.getCommonAncestor(l);
    const d = e.activeFormattingElements.getElementEntry(l), m = d && i >= Os;
    !d || m ? (m && e.activeFormattingElements.removeEntry(d), e.openElements.remove(l)) : (l = ks(e, d), r === t && (e.activeFormattingElements.bookmark = d), e.treeAdapter.detachNode(r), e.treeAdapter.appendChild(l, r), r = l);
  }
  return r;
}
function ks(e, t) {
  const u = e.treeAdapter.getNamespaceURI(t.element), r = e.treeAdapter.createElement(t.token.tagName, u, t.token.attrs);
  return e.openElements.replace(t.element, r), t.element = r, r;
}
function Ms(e, t, u) {
  const r = e.treeAdapter.getTagName(t), s = $e(r);
  if (e._isElementCausesFosterParenting(s))
    e._fosterParentElement(u);
  else {
    const i = e.treeAdapter.getNamespaceURI(t);
    s === a.TEMPLATE && i === T.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, u);
  }
}
function Bs(e, t, u) {
  const r = e.treeAdapter.getNamespaceURI(u.element), { token: s } = u, i = e.treeAdapter.createElement(s.tagName, r, s.attrs);
  e._adoptNodes(t, i), e.treeAdapter.appendChild(t, i), e.activeFormattingElements.insertElementAfterBookmark(i, s), e.activeFormattingElements.removeEntry(u), e.openElements.remove(u.element), e.openElements.insertAfter(t, i, s.tagID);
}
function _t(e, t) {
  for (let u = 0; u < Ls; u++) {
    const r = xs(e, t);
    if (!r)
      break;
    const s = Ps(e, r);
    if (!s)
      break;
    e.activeFormattingElements.bookmark = r;
    const i = ys(e, s, r.element), l = e.openElements.getCommonAncestor(r.element);
    e.treeAdapter.detachNode(i), l && Ms(e, l, i), Bs(e, s, r);
  }
}
function Et(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function ws(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function Fs(e, t) {
  e._appendCommentNode(t, e.document);
}
function At(e, t) {
  if (e.stopped = !0, t.location) {
    const u = e.fragmentContext ? 0 : 2;
    for (let r = e.openElements.stackTop; r >= u; r--)
      e._setEndLocation(e.openElements.items[r], t);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const r = e.openElements.items[0], s = e.treeAdapter.getNodeSourceCodeLocation(r);
      if (s && !s.endTag && (e._setEndLocation(r, t), e.openElements.stackTop >= 1)) {
        const i = e.openElements.items[1], l = e.treeAdapter.getNodeSourceCodeLocation(i);
        l && !l.endTag && e._setEndLocation(i, t);
      }
    }
  }
}
function Hs(e, t) {
  e._setDocumentType(t);
  const u = t.forceQuirks ? q.QUIRKS : fs(t);
  hs(t) || e._err(t, E.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, u), e.insertionMode = c.BEFORE_HTML;
}
function Le(e, t) {
  e._err(t, E.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, q.QUIRKS), e.insertionMode = c.BEFORE_HTML, e._processToken(t);
}
function Us(e, t) {
  t.tagID === a.HTML ? (e._insertElement(t, T.HTML), e.insertionMode = c.BEFORE_HEAD) : xe(e, t);
}
function vs(e, t) {
  const u = t.tagID;
  (u === a.HTML || u === a.HEAD || u === a.BODY || u === a.BR) && xe(e, t);
}
function xe(e, t) {
  e._insertFakeRootElement(), e.insertionMode = c.BEFORE_HEAD, e._processToken(t);
}
function Ys(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      v(e, t);
      break;
    }
    case a.HEAD: {
      e._insertElement(t, T.HTML), e.headElement = e.openElements.current, e.insertionMode = c.IN_HEAD;
      break;
    }
    default:
      Pe(e, t);
  }
}
function Ws(e, t) {
  const u = t.tagID;
  u === a.HEAD || u === a.BODY || u === a.HTML || u === a.BR ? Pe(e, t) : e._err(t, E.endTagWithoutMatchingOpenElement);
}
function Pe(e, t) {
  e._insertFakeElement(h.HEAD, a.HEAD), e.headElement = e.openElements.current, e.insertionMode = c.IN_HEAD, e._processToken(t);
}
function z(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      v(e, t);
      break;
    }
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META: {
      e._appendElement(t, T.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.TITLE: {
      e._switchToTextParsing(t, Q.RCDATA);
      break;
    }
    case a.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(t, Q.RAWTEXT) : (e._insertElement(t, T.HTML), e.insertionMode = c.IN_HEAD_NO_SCRIPT);
      break;
    }
    case a.NOFRAMES:
    case a.STYLE: {
      e._switchToTextParsing(t, Q.RAWTEXT);
      break;
    }
    case a.SCRIPT: {
      e._switchToTextParsing(t, Q.SCRIPT_DATA);
      break;
    }
    case a.TEMPLATE: {
      e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = c.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(c.IN_TEMPLATE);
      break;
    }
    case a.HEAD: {
      e._err(t, E.misplacedStartTagForHeadElement);
      break;
    }
    default:
      ye(e, t);
  }
}
function Gs(e, t) {
  switch (t.tagID) {
    case a.HEAD: {
      e.openElements.pop(), e.insertionMode = c.AFTER_HEAD;
      break;
    }
    case a.BODY:
    case a.BR:
    case a.HTML: {
      ye(e, t);
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
    default:
      e._err(t, E.endTagWithoutMatchingOpenElement);
  }
}
function Ee(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== a.TEMPLATE && e._err(t, E.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, E.endTagWithoutMatchingOpenElement);
}
function ye(e, t) {
  e.openElements.pop(), e.insertionMode = c.AFTER_HEAD, e._processToken(t);
}
function Qs(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      v(e, t);
      break;
    }
    case a.BASEFONT:
    case a.BGSOUND:
    case a.HEAD:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.STYLE: {
      z(e, t);
      break;
    }
    case a.NOSCRIPT: {
      e._err(t, E.nestedNoscriptInHead);
      break;
    }
    default:
      ke(e, t);
  }
}
function qs(e, t) {
  switch (t.tagID) {
    case a.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = c.IN_HEAD;
      break;
    }
    case a.BR: {
      ke(e, t);
      break;
    }
    default:
      e._err(t, E.endTagWithoutMatchingOpenElement);
  }
}
function ke(e, t) {
  const u = t.type === D.EOF ? E.openElementsLeftAfterEof : E.disallowedContentInNoscriptInHead;
  e._err(t, u), e.openElements.pop(), e.insertionMode = c.IN_HEAD, e._processToken(t);
}
function Vs(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      v(e, t);
      break;
    }
    case a.BODY: {
      e._insertElement(t, T.HTML), e.framesetOk = !1, e.insertionMode = c.IN_BODY;
      break;
    }
    case a.FRAMESET: {
      e._insertElement(t, T.HTML), e.insertionMode = c.IN_FRAMESET;
      break;
    }
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.SCRIPT:
    case a.STYLE:
    case a.TEMPLATE:
    case a.TITLE: {
      e._err(t, E.abandonedHeadElementChild), e.openElements.push(e.headElement, a.HEAD), z(e, t), e.openElements.remove(e.headElement);
      break;
    }
    case a.HEAD: {
      e._err(t, E.misplacedStartTagForHeadElement);
      break;
    }
    default:
      Me(e, t);
  }
}
function zs(e, t) {
  switch (t.tagID) {
    case a.BODY:
    case a.HTML:
    case a.BR: {
      Me(e, t);
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
    default:
      e._err(t, E.endTagWithoutMatchingOpenElement);
  }
}
function Me(e, t) {
  e._insertFakeElement(h.BODY, a.BODY), e.insertionMode = c.IN_BODY, Je(e, t);
}
function Je(e, t) {
  switch (t.type) {
    case D.CHARACTER: {
      Fu(e, t);
      break;
    }
    case D.WHITESPACE_CHARACTER: {
      wu(e, t);
      break;
    }
    case D.COMMENT: {
      Et(e, t);
      break;
    }
    case D.START_TAG: {
      v(e, t);
      break;
    }
    case D.END_TAG: {
      Ze(e, t);
      break;
    }
    case D.EOF: {
      Yu(e, t);
      break;
    }
  }
}
function wu(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function Fu(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function Ks(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function Xs(e, t) {
  const u = e.openElements.tryPeekProperlyNestedBodyElement();
  u && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(u, t.attrs));
}
function js(e, t) {
  const u = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && u && (e.treeAdapter.detachNode(u), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, T.HTML), e.insertionMode = c.IN_FRAMESET);
}
function $s(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, T.HTML);
}
function Js(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && ft.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, T.HTML);
}
function Zs(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, T.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function en(e, t) {
  const u = e.openElements.tmplCount > 0;
  (!e.formElement || u) && (e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, T.HTML), u || (e.formElement = e.openElements.current));
}
function tn(e, t) {
  e.framesetOk = !1;
  const u = t.tagID;
  for (let r = e.openElements.stackTop; r >= 0; r--) {
    const s = e.openElements.tagIDs[r];
    if (u === a.LI && s === a.LI || (u === a.DD || u === a.DT) && (s === a.DD || s === a.DT)) {
      e.openElements.generateImpliedEndTagsWithExclusion(s), e.openElements.popUntilTagNamePopped(s);
      break;
    }
    if (s !== a.ADDRESS && s !== a.DIV && s !== a.P && e._isSpecialElement(e.openElements.items[r], s))
      break;
  }
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, T.HTML);
}
function un(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, T.HTML), e.tokenizer.state = Q.PLAINTEXT;
}
function an(e, t) {
  e.openElements.hasInScope(a.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, T.HTML), e.framesetOk = !1;
}
function rn(e, t) {
  const u = e.activeFormattingElements.getElementEntryInScopeWithTagName(h.A);
  u && (_t(e, t), e.openElements.remove(u.element), e.activeFormattingElements.removeEntry(u)), e._reconstructActiveFormattingElements(), e._insertElement(t, T.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function sn(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, T.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function nn(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(a.NOBR) && (_t(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, T.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function on(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, T.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function cn(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== q.QUIRKS && e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, T.HTML), e.framesetOk = !1, e.insertionMode = c.IN_TABLE;
}
function Hu(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, T.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function Uu(e) {
  const t = Ou(e, he.TYPE);
  return t != null && t.toLowerCase() === Ss;
}
function ln(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, T.HTML), Uu(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function dn(e, t) {
  e._appendElement(t, T.HTML), t.ackSelfClosing = !0;
}
function hn(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._appendElement(t, T.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function fn(e, t) {
  t.tagName = h.IMG, t.tagID = a.IMG, Hu(e, t);
}
function En(e, t) {
  e._insertElement(t, T.HTML), e.skipNextNewLine = !0, e.tokenizer.state = Q.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = c.TEXT;
}
function mn(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, Q.RAWTEXT);
}
function Tn(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, Q.RAWTEXT);
}
function tu(e, t) {
  e._switchToTextParsing(t, Q.RAWTEXT);
}
function bn(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, T.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === c.IN_TABLE || e.insertionMode === c.IN_CAPTION || e.insertionMode === c.IN_TABLE_BODY || e.insertionMode === c.IN_ROW || e.insertionMode === c.IN_CELL ? c.IN_SELECT_IN_TABLE : c.IN_SELECT;
}
function pn(e, t) {
  e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, T.HTML);
}
function gn(e, t) {
  e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, T.HTML);
}
function _n(e, t) {
  e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(a.RTC), e._insertElement(t, T.HTML);
}
function An(e, t) {
  e._reconstructActiveFormattingElements(), ku(t), gt(t), t.selfClosing ? e._appendElement(t, T.MATHML) : e._insertElement(t, T.MATHML), t.ackSelfClosing = !0;
}
function Nn(e, t) {
  e._reconstructActiveFormattingElements(), Mu(t), gt(t), t.selfClosing ? e._appendElement(t, T.SVG) : e._insertElement(t, T.SVG), t.ackSelfClosing = !0;
}
function uu(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, T.HTML);
}
function v(e, t) {
  switch (t.tagID) {
    case a.I:
    case a.S:
    case a.B:
    case a.U:
    case a.EM:
    case a.TT:
    case a.BIG:
    case a.CODE:
    case a.FONT:
    case a.SMALL:
    case a.STRIKE:
    case a.STRONG: {
      sn(e, t);
      break;
    }
    case a.A: {
      rn(e, t);
      break;
    }
    case a.H1:
    case a.H2:
    case a.H3:
    case a.H4:
    case a.H5:
    case a.H6: {
      Js(e, t);
      break;
    }
    case a.P:
    case a.DL:
    case a.OL:
    case a.UL:
    case a.DIV:
    case a.DIR:
    case a.NAV:
    case a.MAIN:
    case a.MENU:
    case a.ASIDE:
    case a.CENTER:
    case a.FIGURE:
    case a.FOOTER:
    case a.HEADER:
    case a.HGROUP:
    case a.DIALOG:
    case a.DETAILS:
    case a.ADDRESS:
    case a.ARTICLE:
    case a.SEARCH:
    case a.SECTION:
    case a.SUMMARY:
    case a.FIELDSET:
    case a.BLOCKQUOTE:
    case a.FIGCAPTION: {
      $s(e, t);
      break;
    }
    case a.LI:
    case a.DD:
    case a.DT: {
      tn(e, t);
      break;
    }
    case a.BR:
    case a.IMG:
    case a.WBR:
    case a.AREA:
    case a.EMBED:
    case a.KEYGEN: {
      Hu(e, t);
      break;
    }
    case a.HR: {
      hn(e, t);
      break;
    }
    case a.RB:
    case a.RTC: {
      gn(e, t);
      break;
    }
    case a.RT:
    case a.RP: {
      _n(e, t);
      break;
    }
    case a.PRE:
    case a.LISTING: {
      Zs(e, t);
      break;
    }
    case a.XMP: {
      mn(e, t);
      break;
    }
    case a.SVG: {
      Nn(e, t);
      break;
    }
    case a.HTML: {
      Ks(e, t);
      break;
    }
    case a.BASE:
    case a.LINK:
    case a.META:
    case a.STYLE:
    case a.TITLE:
    case a.SCRIPT:
    case a.BGSOUND:
    case a.BASEFONT:
    case a.TEMPLATE: {
      z(e, t);
      break;
    }
    case a.BODY: {
      Xs(e, t);
      break;
    }
    case a.FORM: {
      en(e, t);
      break;
    }
    case a.NOBR: {
      nn(e, t);
      break;
    }
    case a.MATH: {
      An(e, t);
      break;
    }
    case a.TABLE: {
      cn(e, t);
      break;
    }
    case a.INPUT: {
      ln(e, t);
      break;
    }
    case a.PARAM:
    case a.TRACK:
    case a.SOURCE: {
      dn(e, t);
      break;
    }
    case a.IMAGE: {
      fn(e, t);
      break;
    }
    case a.BUTTON: {
      an(e, t);
      break;
    }
    case a.APPLET:
    case a.OBJECT:
    case a.MARQUEE: {
      on(e, t);
      break;
    }
    case a.IFRAME: {
      Tn(e, t);
      break;
    }
    case a.SELECT: {
      bn(e, t);
      break;
    }
    case a.OPTION:
    case a.OPTGROUP: {
      pn(e, t);
      break;
    }
    case a.NOEMBED:
    case a.NOFRAMES: {
      tu(e, t);
      break;
    }
    case a.FRAMESET: {
      js(e, t);
      break;
    }
    case a.TEXTAREA: {
      En(e, t);
      break;
    }
    case a.NOSCRIPT: {
      e.options.scriptingEnabled ? tu(e, t) : uu(e, t);
      break;
    }
    case a.PLAINTEXT: {
      un(e, t);
      break;
    }
    case a.COL:
    case a.TH:
    case a.TD:
    case a.TR:
    case a.HEAD:
    case a.FRAME:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.CAPTION:
    case a.COLGROUP:
      break;
    default:
      uu(e, t);
  }
}
function In(e, t) {
  if (e.openElements.hasInScope(a.BODY) && (e.insertionMode = c.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const u = e.openElements.tryPeekProperlyNestedBodyElement();
    u && e._setEndLocation(u, t);
  }
}
function Cn(e, t) {
  e.openElements.hasInScope(a.BODY) && (e.insertionMode = c.AFTER_BODY, Xu(e, t));
}
function Sn(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u));
}
function Ln(e) {
  const t = e.openElements.tmplCount > 0, { formElement: u } = e;
  t || (e.formElement = null), (u || t) && e.openElements.hasInScope(a.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(a.FORM) : u && e.openElements.remove(u));
}
function On(e) {
  e.openElements.hasInButtonScope(a.P) || e._insertFakeElement(h.P, a.P), e._closePElement();
}
function Rn(e) {
  e.openElements.hasInListItemScope(a.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(a.LI), e.openElements.popUntilTagNamePopped(a.LI));
}
function Dn(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTagsWithExclusion(u), e.openElements.popUntilTagNamePopped(u));
}
function xn(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function Pn(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker());
}
function yn(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(h.BR, a.BR), e.openElements.pop(), e.framesetOk = !1;
}
function vu(e, t) {
  const u = t.tagName, r = t.tagID;
  for (let s = e.openElements.stackTop; s > 0; s--) {
    const i = e.openElements.items[s], l = e.openElements.tagIDs[s];
    if (r === l && (r !== a.UNKNOWN || e.treeAdapter.getTagName(i) === u)) {
      e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.stackTop >= s && e.openElements.shortenToLength(s);
      break;
    }
    if (e._isSpecialElement(i, l))
      break;
  }
}
function Ze(e, t) {
  switch (t.tagID) {
    case a.A:
    case a.B:
    case a.I:
    case a.S:
    case a.U:
    case a.EM:
    case a.TT:
    case a.BIG:
    case a.CODE:
    case a.FONT:
    case a.NOBR:
    case a.SMALL:
    case a.STRIKE:
    case a.STRONG: {
      _t(e, t);
      break;
    }
    case a.P: {
      On(e);
      break;
    }
    case a.DL:
    case a.UL:
    case a.OL:
    case a.DIR:
    case a.DIV:
    case a.NAV:
    case a.PRE:
    case a.MAIN:
    case a.MENU:
    case a.ASIDE:
    case a.BUTTON:
    case a.CENTER:
    case a.FIGURE:
    case a.FOOTER:
    case a.HEADER:
    case a.HGROUP:
    case a.DIALOG:
    case a.ADDRESS:
    case a.ARTICLE:
    case a.DETAILS:
    case a.SEARCH:
    case a.SECTION:
    case a.SUMMARY:
    case a.LISTING:
    case a.FIELDSET:
    case a.BLOCKQUOTE:
    case a.FIGCAPTION: {
      Sn(e, t);
      break;
    }
    case a.LI: {
      Rn(e);
      break;
    }
    case a.DD:
    case a.DT: {
      Dn(e, t);
      break;
    }
    case a.H1:
    case a.H2:
    case a.H3:
    case a.H4:
    case a.H5:
    case a.H6: {
      xn(e);
      break;
    }
    case a.BR: {
      yn(e);
      break;
    }
    case a.BODY: {
      In(e, t);
      break;
    }
    case a.HTML: {
      Cn(e, t);
      break;
    }
    case a.FORM: {
      Ln(e);
      break;
    }
    case a.APPLET:
    case a.OBJECT:
    case a.MARQUEE: {
      Pn(e, t);
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
    default:
      vu(e, t);
  }
}
function Yu(e, t) {
  e.tmplInsertionModeStack.length > 0 ? Ku(e, t) : At(e, t);
}
function kn(e, t) {
  var u;
  t.tagID === a.SCRIPT && ((u = e.scriptHandler) === null || u === void 0 || u.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function Mn(e, t) {
  e._err(t, E.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function it(e, t) {
  if (e.openElements.currentTagId !== void 0 && Bu.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = c.IN_TABLE_TEXT, t.type) {
      case D.CHARACTER: {
        Gu(e, t);
        break;
      }
      case D.WHITESPACE_CHARACTER: {
        Wu(e, t);
        break;
      }
    }
  else
    Fe(e, t);
}
function Bn(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, T.HTML), e.insertionMode = c.IN_CAPTION;
}
function wn(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, T.HTML), e.insertionMode = c.IN_COLUMN_GROUP;
}
function Fn(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(h.COLGROUP, a.COLGROUP), e.insertionMode = c.IN_COLUMN_GROUP, Nt(e, t);
}
function Hn(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, T.HTML), e.insertionMode = c.IN_TABLE_BODY;
}
function Un(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(h.TBODY, a.TBODY), e.insertionMode = c.IN_TABLE_BODY, et(e, t);
}
function vn(e, t) {
  e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function Yn(e, t) {
  Uu(t) ? e._appendElement(t, T.HTML) : Fe(e, t), t.ackSelfClosing = !0;
}
function Wn(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, T.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function ge(e, t) {
  switch (t.tagID) {
    case a.TD:
    case a.TH:
    case a.TR: {
      Un(e, t);
      break;
    }
    case a.STYLE:
    case a.SCRIPT:
    case a.TEMPLATE: {
      z(e, t);
      break;
    }
    case a.COL: {
      Fn(e, t);
      break;
    }
    case a.FORM: {
      Wn(e, t);
      break;
    }
    case a.TABLE: {
      vn(e, t);
      break;
    }
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      Hn(e, t);
      break;
    }
    case a.INPUT: {
      Yn(e, t);
      break;
    }
    case a.CAPTION: {
      Bn(e, t);
      break;
    }
    case a.COLGROUP: {
      wn(e, t);
      break;
    }
    default:
      Fe(e, t);
  }
}
function we(e, t) {
  switch (t.tagID) {
    case a.TABLE: {
      e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode());
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TBODY:
    case a.TD:
    case a.TFOOT:
    case a.TH:
    case a.THEAD:
    case a.TR:
      break;
    default:
      Fe(e, t);
  }
}
function Fe(e, t) {
  const u = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, Je(e, t), e.fosterParentingEnabled = u;
}
function Wu(e, t) {
  e.pendingCharacterTokens.push(t);
}
function Gu(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function Oe(e, t) {
  let u = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; u < e.pendingCharacterTokens.length; u++)
      Fe(e, e.pendingCharacterTokens[u]);
  else
    for (; u < e.pendingCharacterTokens.length; u++)
      e._insertCharacters(e.pendingCharacterTokens[u]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const Qu = /* @__PURE__ */ new Set([a.CAPTION, a.COL, a.COLGROUP, a.TBODY, a.TD, a.TFOOT, a.TH, a.THEAD, a.TR]);
function Gn(e, t) {
  const u = t.tagID;
  Qu.has(u) ? e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = c.IN_TABLE, ge(e, t)) : v(e, t);
}
function Qn(e, t) {
  const u = t.tagID;
  switch (u) {
    case a.CAPTION:
    case a.TABLE: {
      e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = c.IN_TABLE, u === a.TABLE && we(e, t));
      break;
    }
    case a.BODY:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TBODY:
    case a.TD:
    case a.TFOOT:
    case a.TH:
    case a.THEAD:
    case a.TR:
      break;
    default:
      Ze(e, t);
  }
}
function Nt(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      v(e, t);
      break;
    }
    case a.COL: {
      e._appendElement(t, T.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.TEMPLATE: {
      z(e, t);
      break;
    }
    default:
      Ve(e, t);
  }
}
function qn(e, t) {
  switch (t.tagID) {
    case a.COLGROUP: {
      e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = c.IN_TABLE);
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
    case a.COL:
      break;
    default:
      Ve(e, t);
  }
}
function Ve(e, t) {
  e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = c.IN_TABLE, e._processToken(t));
}
function et(e, t) {
  switch (t.tagID) {
    case a.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, T.HTML), e.insertionMode = c.IN_ROW;
      break;
    }
    case a.TH:
    case a.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(h.TR, a.TR), e.insertionMode = c.IN_ROW, tt(e, t);
      break;
    }
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = c.IN_TABLE, ge(e, t));
      break;
    }
    default:
      ge(e, t);
  }
}
function mt(e, t) {
  const u = t.tagID;
  switch (t.tagID) {
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.openElements.hasInTableScope(u) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = c.IN_TABLE);
      break;
    }
    case a.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = c.IN_TABLE, we(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TD:
    case a.TH:
    case a.TR:
      break;
    default:
      we(e, t);
  }
}
function tt(e, t) {
  switch (t.tagID) {
    case a.TH:
    case a.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(t, T.HTML), e.insertionMode = c.IN_CELL, e.activeFormattingElements.insertMarker();
      break;
    }
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.TR: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = c.IN_TABLE_BODY, et(e, t));
      break;
    }
    default:
      ge(e, t);
  }
}
function qu(e, t) {
  switch (t.tagID) {
    case a.TR: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = c.IN_TABLE_BODY);
      break;
    }
    case a.TABLE: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = c.IN_TABLE_BODY, mt(e, t));
      break;
    }
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(a.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = c.IN_TABLE_BODY, mt(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TD:
    case a.TH:
      break;
    default:
      we(e, t);
  }
}
function Vn(e, t) {
  const u = t.tagID;
  Qu.has(u) ? (e.openElements.hasInTableScope(a.TD) || e.openElements.hasInTableScope(a.TH)) && (e._closeTableCell(), tt(e, t)) : v(e, t);
}
function zn(e, t) {
  const u = t.tagID;
  switch (u) {
    case a.TD:
    case a.TH: {
      e.openElements.hasInTableScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = c.IN_ROW);
      break;
    }
    case a.TABLE:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.TR: {
      e.openElements.hasInTableScope(u) && (e._closeTableCell(), qu(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
      break;
    default:
      Ze(e, t);
  }
}
function Vu(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      v(e, t);
      break;
    }
    case a.OPTION: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._insertElement(t, T.HTML);
      break;
    }
    case a.OPTGROUP: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(), e._insertElement(t, T.HTML);
      break;
    }
    case a.HR: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(), e._appendElement(t, T.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.INPUT:
    case a.KEYGEN:
    case a.TEXTAREA:
    case a.SELECT: {
      e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), t.tagID !== a.SELECT && e._processStartTag(t));
      break;
    }
    case a.SCRIPT:
    case a.TEMPLATE: {
      z(e, t);
      break;
    }
  }
}
function zu(e, t) {
  switch (t.tagID) {
    case a.OPTGROUP: {
      e.openElements.stackTop > 0 && e.openElements.currentTagId === a.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === a.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop();
      break;
    }
    case a.OPTION: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop();
      break;
    }
    case a.SELECT: {
      e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode());
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
  }
}
function Kn(e, t) {
  const u = t.tagID;
  u === a.CAPTION || u === a.TABLE || u === a.TBODY || u === a.TFOOT || u === a.THEAD || u === a.TR || u === a.TD || u === a.TH ? (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : Vu(e, t);
}
function Xn(e, t) {
  const u = t.tagID;
  u === a.CAPTION || u === a.TABLE || u === a.TBODY || u === a.TFOOT || u === a.THEAD || u === a.TR || u === a.TD || u === a.TH ? e.openElements.hasInTableScope(u) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : zu(e, t);
}
function jn(e, t) {
  switch (t.tagID) {
    // First, handle tags that can start without a mode change
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.SCRIPT:
    case a.STYLE:
    case a.TEMPLATE:
    case a.TITLE: {
      z(e, t);
      break;
    }
    // Re-process the token in the appropriate mode
    case a.CAPTION:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.tmplInsertionModeStack[0] = c.IN_TABLE, e.insertionMode = c.IN_TABLE, ge(e, t);
      break;
    }
    case a.COL: {
      e.tmplInsertionModeStack[0] = c.IN_COLUMN_GROUP, e.insertionMode = c.IN_COLUMN_GROUP, Nt(e, t);
      break;
    }
    case a.TR: {
      e.tmplInsertionModeStack[0] = c.IN_TABLE_BODY, e.insertionMode = c.IN_TABLE_BODY, et(e, t);
      break;
    }
    case a.TD:
    case a.TH: {
      e.tmplInsertionModeStack[0] = c.IN_ROW, e.insertionMode = c.IN_ROW, tt(e, t);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = c.IN_BODY, e.insertionMode = c.IN_BODY, v(e, t);
  }
}
function $n(e, t) {
  t.tagID === a.TEMPLATE && Ee(e, t);
}
function Ku(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : At(e, t);
}
function Jn(e, t) {
  t.tagID === a.HTML ? v(e, t) : ze(e, t);
}
function Xu(e, t) {
  var u;
  if (t.tagID === a.HTML) {
    if (e.fragmentContext || (e.insertionMode = c.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === a.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const r = e.openElements.items[1];
      r && !(!((u = e.treeAdapter.getNodeSourceCodeLocation(r)) === null || u === void 0) && u.endTag) && e._setEndLocation(r, t);
    }
  } else
    ze(e, t);
}
function ze(e, t) {
  e.insertionMode = c.IN_BODY, Je(e, t);
}
function Zn(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      v(e, t);
      break;
    }
    case a.FRAMESET: {
      e._insertElement(t, T.HTML);
      break;
    }
    case a.FRAME: {
      e._appendElement(t, T.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.NOFRAMES: {
      z(e, t);
      break;
    }
  }
}
function ei(e, t) {
  t.tagID === a.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== a.FRAMESET && (e.insertionMode = c.AFTER_FRAMESET));
}
function ti(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      v(e, t);
      break;
    }
    case a.NOFRAMES: {
      z(e, t);
      break;
    }
  }
}
function ui(e, t) {
  t.tagID === a.HTML && (e.insertionMode = c.AFTER_AFTER_FRAMESET);
}
function ai(e, t) {
  t.tagID === a.HTML ? v(e, t) : Ge(e, t);
}
function Ge(e, t) {
  e.insertionMode = c.IN_BODY, Je(e, t);
}
function ri(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      v(e, t);
      break;
    }
    case a.NOFRAMES: {
      z(e, t);
      break;
    }
  }
}
function si(e, t) {
  t.chars = M, e._insertCharacters(t);
}
function ni(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function ju(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== T.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function ii(e, t) {
  if (_s(t))
    ju(e), e._startTagOutsideForeignContent(t);
  else {
    const u = e._getAdjustedCurrentElement(), r = e.treeAdapter.getNamespaceURI(u);
    r === T.MATHML ? ku(t) : r === T.SVG && (As(t), Mu(t)), gt(t), t.selfClosing ? e._appendElement(t, r) : e._insertElement(t, r), t.ackSelfClosing = !0;
  }
}
function oi(e, t) {
  if (t.tagID === a.P || t.tagID === a.BR) {
    ju(e), e._endTagOutsideForeignContent(t);
    return;
  }
  for (let u = e.openElements.stackTop; u > 0; u--) {
    const r = e.openElements.items[u];
    if (e.treeAdapter.getNamespaceURI(r) === T.HTML) {
      e._endTagOutsideForeignContent(t);
      break;
    }
    const s = e.treeAdapter.getTagName(r);
    if (s.toLowerCase() === t.tagName) {
      t.tagName = s, e.openElements.shortenToLength(u);
      break;
    }
  }
}
h.AREA, h.BASE, h.BASEFONT, h.BGSOUND, h.BR, h.COL, h.EMBED, h.FRAME, h.HR, h.IMG, h.INPUT, h.KEYGEN, h.LINK, h.META, h.PARAM, h.SOURCE, h.TRACK, h.WBR;
function ci(e, t, u) {
  typeof e == "string" && (u = t, t = e, e = null);
  const r = Ds.getFragmentParser(e, u);
  return r.tokenizer.write(t, !0), r.getFragment();
}
const li = () => ({}), di = () => !0, au = (e) => {
  const t = parseInt(e, 10);
  return Number.isFinite(t) ? t : e;
}, hi = {
  "data-underline": { path: ["underline"], transform: li },
  "data-positionaltab-alignment": { path: ["positionalTab", "alignment"] },
  "data-positionaltab-leader": { path: ["positionalTab", "leader"] },
  "data-positionaltab-relativeto": { path: ["positionalTab", "relativeTo"] },
  "data-spacing-before": { path: ["spacing", "before"] },
  "data-spacing-after": { path: ["spacing", "after"] },
  "data-transformation-width": { path: ["transformation", "width"] },
  "data-transformation-height": { path: ["transformation", "height"] },
  "data-bullet-level": { path: ["bullet", "level"] },
  "data-numbering-reference": { path: ["numbering", "reference"] },
  "data-numbering-level": { path: ["numbering", "level"] },
  "data-numbering-instance": { path: ["numbering", "instance"] },
  "data-alttext-title": { path: ["altText", "title"] },
  "data-alttext-description": { path: ["altText", "description"] },
  "data-alttext-name": { path: ["altText", "name"] },
  "data-width-size": { path: ["width", "size"] },
  "data-width-type": { path: ["width", "type"] },
  "data-margins-top": { path: ["margins", "top"] },
  "data-margins-bottom": { path: ["margins", "bottom"] },
  "data-margins-left": { path: ["margins", "left"] },
  "data-margins-right": { path: ["margins", "right"] },
  "data-borders-top-style": { path: ["borders", "top", "style"] },
  "data-borders-top-size": { path: ["borders", "top", "size"] },
  "data-borders-top-color": { path: ["borders", "top", "color"] },
  "data-borders-bottom-style": { path: ["borders", "bottom", "style"] },
  "data-borders-bottom-size": { path: ["borders", "bottom", "size"] },
  "data-borders-bottom-color": { path: ["borders", "bottom", "color"] },
  "data-borders-left-style": { path: ["borders", "left", "style"] },
  "data-borders-left-size": { path: ["borders", "left", "size"] },
  "data-borders-left-color": { path: ["borders", "left", "color"] },
  "data-borders-right-style": { path: ["borders", "right", "style"] },
  "data-borders-right-size": { path: ["borders", "right", "size"] },
  "data-borders-right-color": { path: ["borders", "right", "color"] },
  "data-image-type": { path: ["imageType"] },
  "data-floating-horizontalposition-relative": {
    path: ["floating", "horizontalPosition", "relative"]
  },
  "data-floating-horizontalposition-align": {
    path: ["floating", "horizontalPosition", "align"]
  },
  "data-floating-horizontalposition-offset": {
    path: ["floating", "horizontalPosition", "offset"],
    transform: au
  },
  "data-floating-verticalposition-relative": {
    path: ["floating", "verticalPosition", "relative"]
  },
  "data-floating-verticalposition-align": {
    path: ["floating", "verticalPosition", "align"]
  },
  "data-floating-verticalposition-offset": {
    path: ["floating", "verticalPosition", "offset"],
    transform: au
  },
  // Page breaks — maps to DocxParagraph({ pageBreakBefore: true })
  // in the adapter. Presence attribute: any truthy value counts.
  "data-page-break-before": { path: ["pageBreakBefore"], transform: di },
  // Table of contents options — consumed by the tableOfContents node
  // type in the adapter (src/adapters/docx.js). See docx library's
  // ITableOfContentsOptions for the full shape; these are the three
  // useful ones and any additional data-toc-* attribute falls through
  // to the default rule below.
  "data-toc-title": { path: ["toc", "title"] },
  "data-toc-hyperlink": { path: ["toc", "hyperlink"] },
  "data-toc-heading-range": { path: ["toc", "headingRange"] }
};
function fi(e, t, u) {
  let r = e;
  for (let s = 0; s < t.length - 1; s++) {
    const i = t[s];
    (!r[i] || typeof r[i] != "object") && (r[i] = {}), r = r[i];
  }
  r[t[t.length - 1]] = u;
}
function Ei(e) {
  const t = {};
  for (const { name: u, value: r } of e) {
    if (!u.startsWith("data-") || u === "data-type") continue;
    const s = hi[u];
    if (s) {
      const i = s.transform ? s.transform(r) : r;
      fi(t, s.path, i);
    } else {
      const i = u.slice(5);
      t[i] = r;
    }
  }
  return t;
}
function mi(e) {
  const t = ci(e);
  return Tt(t);
}
const Ti = /* @__PURE__ */ new Set([
  "link",
  "meta",
  "script",
  "style",
  "base",
  "title",
  "noscript"
]);
function bi(e) {
  if (e.nodeName === "#text") {
    const d = e.value;
    return d && d.trim() ? { type: "text", content: d } : null;
  }
  if (!e.tagName) return null;
  const t = e.tagName.toLowerCase();
  if (Ti.has(t)) return null;
  const r = pi(e, "data-type") || t;
  if (r === "emptyLine") return null;
  if (r === "contentWrapper")
    return Tt(e);
  const s = Ei(e.attrs || []), i = Tt(e), l = { type: r, ...s };
  return r === "text" ? l.content = i.map((d) => d.content || "").join("") : i.length > 0 && (l.children = i), l;
}
function Tt(e) {
  const t = [], u = e.childNodes || [];
  for (const r of u) {
    const s = bi(r);
    s != null && (Array.isArray(s) ? t.push(...s) : t.push(s));
  }
  return t;
}
function pi(e, t) {
  if (!e.attrs) return null;
  for (const u of e.attrs)
    if (u.name === t) return u.value;
  return null;
}
const gi = {
  docx: { load: () => import("./docx-DnLMskId.js"), consumes: "docx", ir: !0 },
  xlsx: { load: () => import("./xlsx-ByoeiX6E.js"), consumes: "xlsx", ir: !1 },
  typst: { load: () => import("./typst-mG6-KOti.js"), consumes: "typst", ir: !0 },
  // Paged.js consumes 'html' — an input shape shared with EPUB below.
  // Foundations register once under 'html' and both adapters read it.
  pagedjs: { load: () => import("./pagedjs-C8Aj7-d3.js"), consumes: "html", ir: !1 },
  epub: { load: () => import("./epub-T6jBMXe-.js"), consumes: "html", ir: !1 }
};
function It(e) {
  const t = gi[e];
  return t ? {
    load: t.load,
    consumes: t.consumes || e,
    ir: t.ir !== !1
    // default to true for safety on under-specified entries
  } : null;
}
async function _i(e, t, u = {}) {
  const r = It(e);
  if (!r)
    throw new Error(`Unsupported document format: "${e}"`);
  const s = await r.load(), i = s.compileDocx || s.compileXlsx || s.compileTypst || s.compilePagedjs || s.compileEpub || s.compilePdf;
  if (!i)
    throw new Error(
      `Format adapter "${e}" does not export a compile function.`
    );
  return i(t, u);
}
function Ai(e, t) {
  const u = It(t);
  if (!u)
    return { sections: [], header: null, footer: null, metadata: null };
  const r = e.getOutputs(u.consumes) || [];
  return u.ir ? Ni(r, e) : u.consumes === "html" ? Ii(r, e) : Ci(r);
}
function Ni(e, t) {
  let u = null, r = null, s = null, i = !1, l = !1;
  const d = [], m = t.wrapWithProviders || ((p) => p);
  for (const { fragment: p, options: g } of e) {
    const N = g.role || "body";
    if (N === "metadata") {
      u = p;
      continue;
    }
    const I = bt(m(p)), A = mi(I);
    switch (N) {
      case "header":
        r = A, g.applyTo === "first" && (i = !0);
        break;
      case "footer":
        s = A, g.applyTo === "first" && (l = !0);
        break;
      default:
        d.push(A);
        break;
    }
  }
  return {
    sections: d,
    header: r,
    footer: s,
    metadata: u,
    headerFirstPageOnly: i,
    footerFirstPageOnly: l
  };
}
function Ii(e, t) {
  const u = t.wrapWithProviders || ((i) => i);
  let r = null;
  const s = [];
  for (const { fragment: i, options: l } of e) {
    const d = l.role || "body";
    if (d === "metadata") {
      r = i;
      continue;
    }
    if (d !== "body") continue;
    const m = bt(u(i));
    s.push(m);
  }
  return { sections: s, metadata: r };
}
function Ci(e) {
  return { sections: e.map(({ fragment: u }) => u).filter(Boolean) };
}
function Si(e, t) {
  if (typeof document > "u") return;
  const u = URL.createObjectURL(e), r = document.createElement("a");
  r.href = u, r.download = t, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(u);
}
function Li(e, t, u = {}) {
  const { basePath: r } = u, s = Nu();
  return bt(
    iu(
      Iu,
      { store: s, basePath: r },
      e
    )
  ), Oi(s, t), Ai(s, t);
}
const ru = /* @__PURE__ */ new Set();
function Oi(e, t) {
  const u = It(t);
  if (!u) return;
  const r = u.consumes;
  if (!(ru.has(r) || (e.getOutputs && e.getOutputs(r) || []).length > 0) && (ru.add(r), typeof console < "u" && console.warn)) {
    const i = r === t ? `compileSubtree('${t}') found 0 registered sections. Did any section component call useDocumentOutput(block, '${t}', ...)?` : `compileSubtree('${t}') found 0 sections registered under input key '${r}'. Sections should call useDocumentOutput(block, '${r}', ...) (the output format '${t}' reads fragments registered under '${r}').`;
    console.warn(
      `@uniweb/press: ${i} Sections registered for a different input key do not cross-register.`
    );
  }
}
async function su(e, t, u = {}) {
  const { basePath: r, adapterOptions: s = {} } = u, i = Li(e, t, { basePath: r });
  return _i(t, i, s);
}
async function Ri(e, t = {}) {
  if (e !== null && typeof e == "object" && // React elements have a $$typeof symbol; duck-typing avoids needing
  // `import { isValidElement } from 'react'` (minor, but keeps this
  // file free of React imports it doesn't otherwise need).
  !!e.$$typeof) {
    const { format: B, ...W } = t;
    if (!B)
      throw new Error(
        "compileDocument: 'format' is required (tree mode)."
      );
    return su(e, B, W);
  }
  const r = e, {
    format: s,
    foundation: i,
    rootPath: l,
    adapterOptions: d = {},
    basePath: m,
    loadAsset: p,
    ...g
  } = t, N = p ?? xi(r);
  if (!s)
    throw new Error(
      "compileDocument: 'format' is required (website mode)."
    );
  if (!r || !Array.isArray(r.pages))
    throw new Error(
      "compileDocument: first argument must be either a React element (tree mode) or a Website (website mode: expected object with a pages array)."
    );
  const I = Di(i), A = I?.[s];
  if (!A) {
    const B = I ? Object.keys(I).join(", ") || "(none)" : "(no outputs declaration)";
    throw new Error(
      `compileDocument: foundation has no outputs.${s} declaration. Declared outputs: ${B}. Add outputs[format] = { getOptions, extension?, via? } to the foundation's default export.`
    );
  }
  const _ = A.via ?? s, C = A.getOptions ? await A.getOptions(r, { format: s, rootPath: l, loadAsset: N, ...g }) : {}, S = {
    ...C.adapterOptions,
    ...d
  }, R = Pi(r, l), O = globalThis.uniweb?.childBlockRenderer;
  if (typeof O != "function")
    throw new Error(
      "compileDocument: globalThis.uniweb.childBlockRenderer is not installed. Either call initPrerender (headless) or mount a Uniweb runtime (browser) before compileDocument, or pass a pre-built tree (tree mode)."
    );
  const x = O({ blocks: R });
  return su(x, _, {
    basePath: m ?? r?.basePath,
    ...C,
    adapterOptions: S
  });
}
function Di(e) {
  return e ? e.outputs ? e.outputs : e.default?.capabilities?.outputs ? e.default.capabilities.outputs : e.default?.outputs ? e.default.outputs : null : null;
}
function xi(e) {
  return async function(u) {
    if (!u || typeof u != "string") return null;
    if (u.startsWith("data:")) {
      const i = u.indexOf(",");
      if (i === -1) return null;
      const l = u.slice(5, i), d = u.slice(i + 1);
      if (l.includes(";base64")) {
        const m = atob(d), p = new Uint8Array(m.length);
        for (let g = 0; g < m.length; g++) p[g] = m.charCodeAt(g);
        return p;
      }
      return new TextEncoder().encode(decodeURIComponent(d));
    }
    if (typeof fetch != "function")
      throw new Error(
        "loadAsset: cannot load '" + u + "' — no fetch available in this environment. Pass a host-supplied loadAsset via compileDocument({ loadAsset })."
      );
    let r = u;
    if (!/^https?:\/\//i.test(r) && !r.startsWith("data:")) {
      const i = (e?.basePath || "") + (r.startsWith("/") ? r : "/" + r);
      r = typeof window < "u" && window.location?.origin ? window.location.origin + i : i;
    }
    const s = await fetch(r);
    if (!s.ok)
      throw new Error(
        "loadAsset: fetch failed for " + r + " (" + s.status + ")"
      );
    return new Uint8Array(await s.arrayBuffer());
  };
}
function Pi(e, t) {
  const u = e.pages || [];
  return (t && typeof t == "string" ? u.filter(
    (s) => s.route === t || typeof s.route == "string" && s.route.startsWith(t + "/")
  ) : u).flatMap((s) => s.bodyBlocks || []);
}
function $u({ children: e, bold: t, italics: u, underline: r, code: s, style: i, ...l }) {
  const d = { "data-type": "text" };
  return t && (d["data-bold"] = "true"), u && (d["data-italics"] = "true"), r && (d["data-underline"] = "true"), s && (d["data-code"] = "true"), i && (d["data-style"] = i), /* @__PURE__ */ f("span", { ...d, ...l, children: e });
}
function Ju(e) {
  const t = (r, s) => ({
    type: "text",
    content: r,
    ...s
  }), u = (r, s = {}) => {
    const i = /<(\w+)(\s[^>]*)?>(.+?)<\/\1>/gs;
    let l = [], d = 0;
    if (!r) return [t("", s)];
    r.replace(i, (p, g, N, I, A) => {
      const _ = r.slice(d, A);
      if (_ && l.push(t(_, s)), g === "a" && N) {
        const R = N.match(/href="([^"]*)"/)?.[1];
        if (R) {
          l.push({
            type: "link",
            content: I,
            href: R
          }), d = A + p.length;
          return;
        }
      }
      const C = { ...s };
      (g === "strong" || g === "b") && (C.bold = !0), (g === "em" || g === "i") && (C.italics = !0), g === "u" && (C.underline = {}), l = l.concat(u(I, C)), d = A + p.length;
    });
    const m = r.slice(d);
    return m && l.push(t(m, s)), l;
  };
  return typeof e != "string" && (e = String(e ?? "")), u(e);
}
function Ke({ as: e = "p", data: t, children: u, ...r }) {
  if (t) {
    const s = Ju(t);
    return /* @__PURE__ */ f(e, { "data-type": "paragraph", ...r, children: s.map(
      (i, l) => i.type === "link" ? /* @__PURE__ */ f(
        "a",
        {
          "data-type": "link",
          "data-href": i.href,
          href: i.href,
          children: /* @__PURE__ */ f("span", { "data-type": "text", children: i.content })
        },
        l
      ) : /* @__PURE__ */ f(
        $u,
        {
          bold: i.bold,
          italics: i.italics,
          underline: !!i.underline,
          code: i.code,
          children: i.content
        },
        l
      )
    ) });
  }
  return /* @__PURE__ */ f(e, { "data-type": "paragraph", ...r, children: u });
}
function yi({ level: e = 1, data: t, children: u, ...r }) {
  const s = Math.min(Math.max(e, 1), 6), i = `h${s}`;
  if (t) {
    const l = Ju(t);
    return /* @__PURE__ */ f(i, { "data-type": "heading", "data-level": s, ...r, children: l.map(
      (d, m) => d.type === "link" ? /* @__PURE__ */ f(
        "a",
        {
          "data-type": "link",
          "data-href": d.href,
          href: d.href,
          children: /* @__PURE__ */ f("span", { "data-type": "text", children: d.content })
        },
        m
      ) : /* @__PURE__ */ f(
        $u,
        {
          bold: d.bold,
          italics: d.italics,
          underline: !!d.underline,
          code: d.code,
          children: d.content
        },
        m
      )
    ) });
  }
  return /* @__PURE__ */ f(i, { "data-type": "heading", "data-level": s, ...r, children: u });
}
function Ct({ number: e, title: t, subtitle: u, ...r }) {
  const s = { "data-type": "chapterOpener" };
  return e != null && (s["data-number"] = String(e)), t && (s["data-title"] = t), u && (s["data-subtitle"] = u), /* @__PURE__ */ f("div", { ...s, ...r });
}
function ki({ language: e, children: t, ...u }) {
  const r = { "data-type": "codeBlock" };
  return e && (r["data-language"] = e), /* @__PURE__ */ f("pre", { ...r, ...u, children: /* @__PURE__ */ f("code", { children: t }) });
}
let Zu;
function Mi(e, t) {
  if (typeof e == "string")
    return /* @__PURE__ */ f("div", { "data-type": "listItem", children: /* @__PURE__ */ f(Ke, { data: e }) }, t);
  if (Array.isArray(e))
    return /* @__PURE__ */ f("div", { "data-type": "listItem", children: e.map((u, r) => Zu(u, r)) }, t);
  if (e && typeof e == "object") {
    const u = e.paragraphs || (e.text ? [e.text] : []), r = e.lists || [];
    return /* @__PURE__ */ k("div", { "data-type": "listItem", children: [
      u.map((s, i) => /* @__PURE__ */ f(Ke, { data: s }, `p${i}`)),
      r.map((s, i) => /* @__PURE__ */ f(St, { items: s, ordered: e.ordered }, `l${i}`))
    ] }, t);
  }
  return null;
}
Zu = function(t, u) {
  if (!t || typeof t != "object") return null;
  switch (t.type) {
    case "paragraph":
      return t.text ? /* @__PURE__ */ f(Ke, { data: t.text }, u) : null;
    case "list":
      return /* @__PURE__ */ f(
        St,
        {
          items: t.children || [],
          ordered: t.style === "ordered"
        },
        u
      );
    // Dropped: headings (markdown invalid inside list items anyway),
    // codeBlock (rare inside a list item; add later if needed),
    // image (handled as a bare paragraph by the markdown parser).
    default:
      return null;
  }
};
function St({ items: e, ordered: t = !1, ...u }) {
  if (!e || !e.length) return null;
  const r = t ? "ol" : "ul", s = { "data-type": "list" };
  return t && (s["data-ordered"] = "true"), /* @__PURE__ */ f(r, { ...s, ...u, children: e.map((i, l) => Mi(i, l)) });
}
function Bi({ children: e, ...t }) {
  return /* @__PURE__ */ f("blockquote", { "data-type": "blockQuote", ...t, children: e });
}
function wi({ src: e, alt: t, width: u, caption: r, ...s }) {
  const i = { "data-type": "image" };
  return e && (i["data-src"] = e), t && (i.alt = t), u && (i["data-width"] = u), r && (i["data-caption"] = r), /* @__PURE__ */ f("img", { src: e, ...i, ...s });
}
function ea(e, t) {
  if (!e || typeof e != "object") return null;
  switch (e.type) {
    case "heading":
      return /* @__PURE__ */ f(yi, { level: e.level || 1, data: e.text || "" }, t);
    case "paragraph":
      return e.text ? /* @__PURE__ */ f(Ke, { data: e.text }, t) : null;
    case "codeBlock":
      return /* @__PURE__ */ f(ki, { language: e.attrs?.language || "", children: e.text || "" }, t);
    case "list":
      return /* @__PURE__ */ f(
        St,
        {
          items: e.children || [],
          ordered: e.style === "ordered"
        },
        t
      );
    case "blockquote":
      return /* @__PURE__ */ f(Bi, { children: (e.children || []).map(
        (u, r) => ea(u, r)
      ) }, t);
    case "image":
      return /* @__PURE__ */ f(
        wi,
        {
          src: e.attrs?.url,
          alt: e.attrs?.alt,
          caption: e.attrs?.caption,
          width: e.attrs?.width
        },
        t
      );
    // Skipped: dataBlock (not prose), video (not in print), inset (Phase 3).
    default:
      return null;
  }
}
function Lt({ data: e, ...t }) {
  return !e || !Array.isArray(e) || e.length === 0 ? null : /* @__PURE__ */ f("div", { "data-type": "contentWrapper", ...t, children: e.map((u, r) => ea(u, r)) });
}
function io({ content: e, block: t }) {
  const { title: u, sequence: r } = e || {};
  return fe(
    t,
    "typst",
    /* @__PURE__ */ k(Xe, { children: [
      /* @__PURE__ */ f(Ct, { title: u }),
      /* @__PURE__ */ f(Lt, { data: r || [] })
    ] })
  ), fe(
    t,
    "html",
    /* @__PURE__ */ k("article", { className: "backmatter", children: [
      u ? /* @__PURE__ */ f("h1", { children: u }) : null,
      /* @__PURE__ */ f(pe, { content: e })
    ] })
  ), /* @__PURE__ */ k("article", { className: "book-backmatter mx-auto max-w-[var(--max-content-width)] px-6 py-12", children: [
    u ? /* @__PURE__ */ f(gu, { text: u, className: "text-heading text-3xl font-bold mb-6" }) : null,
    /* @__PURE__ */ f(pe, { content: e, className: "prose-book" })
  ] });
}
function oo({ content: e, block: t }) {
  const { website: u } = ce(), r = u?.config?.book?.covers || {}, s = Fi(r.front, u?.basePath), i = e && e.title || u?.config?.book?.title || "Book cover";
  return s ? /* @__PURE__ */ f("section", { className: "book-cover-image flex justify-center px-4 py-12", children: /* @__PURE__ */ f(
    "img",
    {
      src: s,
      alt: i,
      className: "max-h-[80vh] w-auto shadow-2xl ring-1 ring-black/5 rounded-sm"
    }
  ) }) : /* @__PURE__ */ k("section", { className: "book-cover-fallback mx-auto max-w-[var(--max-content-width)] px-6 py-16 text-center text-subtle text-sm", children: [
    "No front cover declared. Add ",
    /* @__PURE__ */ f("code", { children: "book.covers.front" }),
    " to",
    " ",
    /* @__PURE__ */ f("code", { children: "site.yml" }),
    "."
  ] });
}
function Fi(e, t) {
  return e ? /^https?:\/\//i.test(e) || e.startsWith("data:") ? e : e.startsWith("/") ? (t || "") + e : e : null;
}
function co({ content: e, block: t, params: u }) {
  const { title: r, subtitle: s, sequence: i } = e || {}, l = Hi(t?.page), d = Ui(r, l);
  return fe(
    t,
    "typst",
    /* @__PURE__ */ k(Xe, { children: [
      /* @__PURE__ */ f(
        Ct,
        {
          number: l.number,
          title: d,
          subtitle: s
        }
      ),
      /* @__PURE__ */ f(Lt, { data: i || [] })
    ] })
  ), fe(
    t,
    "html",
    /* @__PURE__ */ k("article", { className: "chapter", children: [
      d ? /* @__PURE__ */ f("h1", { children: d }) : null,
      s ? /* @__PURE__ */ f("p", { className: "subtitle", children: s }) : null,
      /* @__PURE__ */ f(pe, { content: e })
    ] })
  ), /* @__PURE__ */ k("article", { className: "book-chapter mx-auto max-w-[var(--max-content-width)] px-6 py-12", children: [
    r ? /* @__PURE__ */ k("header", { className: "mb-8", children: [
      l.number != null ? /* @__PURE__ */ k("p", { className: "text-sm uppercase tracking-wide text-subtle mb-3", children: [
        "Chapter ",
        l.number
      ] }) : null,
      /* @__PURE__ */ f(gu, { text: d, className: "text-heading text-4xl font-bold mb-2" }),
      s ? /* @__PURE__ */ f(gr, { text: s, className: "text-subtle text-xl font-normal" }) : null
    ] }) : null,
    /* @__PURE__ */ f(pe, { content: e, className: "prose-book" })
  ] });
}
function Hi(e) {
  const t = e?.slug || "", u = t.match(/^chapter-(\d+)/);
  if (u) return { kind: "chapter", number: Number(u[1]), label: null };
  const r = t.match(/^appendix-([a-z0-9])/i);
  return r ? { kind: "appendix", number: null, label: r[1].toUpperCase() } : t === "cover" ? { kind: "cover", number: null, label: null } : { kind: "other", number: null, label: null };
}
function Ui(e, t) {
  return e ? Array.isArray(e) ? e.filter(Boolean).join(": ") : t.kind === "appendix" && t.label ? /^appendix/i.test(e) ? e : `Appendix ${t.label} — ${e}` : e : "";
}
function lo({ content: e }) {
  const { website: t } = ce(), [u, r] = X([]), [s, i] = X(!0);
  be(() => {
    let d = !1;
    async function m() {
      const p = t?.getPageHierarchy?.({ for: "header" }) || [], g = Yi(p).filter(vi), N = new Map(
        (t?.pages || []).map((A) => [A.route, A])
      ), I = [];
      for (const A of g) {
        const _ = N.get(A.route);
        if (!_) continue;
        try {
          typeof _.loadContent == "function" && await _.loadContent();
        } catch (O) {
          console.warn("[Contents] loadContent failed for", A.route, O);
        }
        const R = ((_.bodyBlocks || [])[0]?.rawContent?.content || []).filter((O) => O.type === "heading" && O.attrs?.level === 2).map((O) => {
          const x = Wi(O);
          return { text: x, slug: Gi(x) };
        });
        I.push({
          title: A.label || A.title || _.title,
          route: A.navigableRoute || A.route,
          sections: R
        });
      }
      d || (r(I), i(!1));
    }
    return m(), () => {
      d = !0;
    };
  }, [t]);
  const l = e?.title || "Contents";
  return /* @__PURE__ */ k("article", { className: "book-contents mx-auto max-w-[var(--max-content-width)] px-6 py-16", children: [
    /* @__PURE__ */ f("h1", { className: "text-heading text-4xl font-bold mb-12", children: l }),
    s ? /* @__PURE__ */ f("p", { className: "text-subtle", children: "Loading contents…" }) : u.length === 0 ? /* @__PURE__ */ f("p", { className: "text-subtle", children: "No entries." }) : /* @__PURE__ */ f("ol", { className: "space-y-6 list-none p-0", children: u.map((d) => /* @__PURE__ */ k("li", { children: [
      /* @__PURE__ */ f(
        oe,
        {
          href: d.route,
          className: "text-heading text-lg font-semibold hover:text-primary transition-colors",
          children: d.title
        }
      ),
      d.sections.length > 0 && /* @__PURE__ */ f("ul", { className: "mt-2 ml-6 space-y-1 list-none p-0", children: d.sections.map((m, p) => /* @__PURE__ */ f("li", { children: /* @__PURE__ */ f(
        oe,
        {
          href: `${d.route}#${m.slug}`,
          className: "text-subtle hover:text-heading transition-colors text-sm",
          children: m.text
        }
      ) }, p)) })
    ] }, d.route)) })
  ] });
}
function vi(e) {
  const t = (e.route || "").split("/").filter(Boolean).pop() || "";
  return !(e.route === "/" || t === "contents" || t === "front-cover" || t === "back-cover");
}
function Yi(e) {
  const t = [], u = (r) => {
    for (const s of r || [])
      t.push(s), s.children?.length && u(s.children);
  };
  return u(e), t;
}
function Wi(e) {
  return (e.content || []).filter((t) => t.type === "text").map((t) => t.text).join("");
}
function Gi(e) {
  return String(e).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function ho({ content: e, block: t }) {
  const { title: u, subtitle: r, sequence: s } = e || {};
  return fe(
    t,
    "typst",
    /* @__PURE__ */ k(Xe, { children: [
      /* @__PURE__ */ f(Ct, { title: u, subtitle: r }),
      /* @__PURE__ */ f(Lt, { data: s || [] })
    ] })
  ), fe(
    t,
    "html",
    /* @__PURE__ */ k("article", { className: "cover", children: [
      u ? /* @__PURE__ */ f("h1", { children: u }) : null,
      r ? /* @__PURE__ */ f("p", { className: "subtitle", children: r }) : null,
      /* @__PURE__ */ f(pe, { content: e })
    ] })
  ), /* @__PURE__ */ k("section", { className: "book-cover mx-auto max-w-[var(--max-content-width)] px-6 py-20 text-center", children: [
    u ? /* @__PURE__ */ f("h1", { className: "text-heading text-5xl font-bold mb-4", children: u }) : null,
    r ? /* @__PURE__ */ f("p", { className: "text-subtle text-2xl font-light mb-8", children: r }) : null,
    /* @__PURE__ */ f(pe, { content: e, className: "prose-book" })
  ] });
}
async function Qi(e, t) {
  const u = (e?.pages || []).filter((r) => t ? r.route === t || r.route.startsWith(t + "/") : !0);
  await Promise.all(
    u.map(
      (r) => typeof r.loadContent == "function" ? r.loadContent() : Promise.resolve()
    )
  );
}
const qi = [
  {
    key: "pdf",
    label: "Download PDF",
    busyLabel: "Building PDF…",
    className: "inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-medium shadow-lg hover:bg-slate-700 disabled:opacity-60 disabled:cursor-wait",
    extra: ({ endpoint: e }) => ({ mode: "server", endpoint: e }),
    deliver: "download"
  },
  {
    key: "typst",
    label: "Typst sources",
    busyLabel: "Building…",
    title: "Download a Typst project you can compile or edit locally",
    className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white text-slate-700 text-xs font-medium border border-slate-300 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-wait",
    extra: () => ({ mode: "sources" }),
    deliver: "download"
  },
  {
    key: "pagedjs",
    label: "PDF (Paged.js)",
    busyLabel: "Building…",
    title: "Opens the book in a new tab; use the browser's Print → Save as PDF",
    className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white text-slate-700 text-xs font-medium border border-slate-300 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-wait",
    deliver: "newtab"
  },
  {
    key: "epub",
    label: "EPUB",
    busyLabel: "Building…",
    title: "Download a reflowable EPUB3 for e-readers",
    className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white text-slate-700 text-xs font-medium border border-slate-300 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-wait",
    deliver: "download"
  }
];
function Vi({
  filename: e = "book",
  rootPath: t,
  endpoint: u
  // Forwarded to pdf (server-mode) compile; defaults to /__press/typst/compile
}) {
  const { website: r } = ce(), [s, i] = X(null), [l, d] = X(null), m = async (p) => {
    d(null), i(p.key);
    try {
      await Qi(r, t);
      const g = p.extra ? p.extra({ endpoint: u }) : {}, N = await Ri(r, {
        format: p.key,
        foundation: ot,
        rootPath: t,
        ...g
      }), I = ot.outputs?.[p.key]?.extension || p.key;
      if (p.deliver === "newtab") {
        const A = URL.createObjectURL(N);
        window.open(A, "_blank");
      } else
        Si(N, `${e}.${I}`);
    } catch (g) {
      console.error("[DownloadButton]", g), d(g.message || String(g));
    } finally {
      i(null);
    }
  };
  return /* @__PURE__ */ k("div", { className: "fixed top-4 right-4 z-50 flex items-center gap-2", children: [
    l ? /* @__PURE__ */ f(
      "span",
      {
        role: "alert",
        className: "text-xs px-2 py-1 rounded-md bg-red-50 text-red-700 shadow max-w-xs",
        children: l
      }
    ) : null,
    qi.map((p) => /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        onClick: () => m(p),
        disabled: !!s,
        title: p.title,
        className: p.className,
        children: s === p.key ? p.busyLabel : p.label
      },
      p.key
    ))
  ] });
}
function zi() {
  const { website: e } = ce(), { useLocation: t } = _u(), r = t()?.pathname || "/", s = e?.getPageHierarchy?.({ for: "header" }) || [], i = Ki(s);
  if (i.length <= 1) return null;
  const l = i.findIndex(
    (_) => We(_.route) === We(r)
  );
  if (l === -1) return null;
  const d = l > 0 ? i[l - 1] : null, m = l < i.length - 1 ? i[l + 1] : null, p = l === 0, g = l === i.length - 1, N = We(r) === "contents", A = i.find(
    (_) => We(_.route) === "contents"
  )?.route || "/";
  return /* @__PURE__ */ f(
    "nav",
    {
      className: "chapter-nav mx-auto max-w-[var(--max-content-width)] px-6 py-8 mt-12 border-t border-border",
      "aria-label": "Chapter navigation",
      children: /* @__PURE__ */ k("div", { className: "flex items-stretch justify-between gap-4 text-sm", children: [
        d ? /* @__PURE__ */ k(
          oe,
          {
            href: d.navigableRoute || d.route,
            className: "flex-1 min-w-0 text-left text-subtle hover:text-heading transition-colors",
            children: [
              /* @__PURE__ */ f("span", { className: "block text-xs uppercase tracking-wide opacity-70", children: "Previous" }),
              /* @__PURE__ */ k("span", { className: "block font-medium truncate", children: [
                "← ",
                d.label || d.title
              ] })
            ]
          }
        ) : /* @__PURE__ */ f("span", { className: "flex-1" }),
        !p && !g && !N ? /* @__PURE__ */ f(
          oe,
          {
            href: A,
            className: "self-center text-xs uppercase tracking-wide text-subtle hover:text-heading transition-colors whitespace-nowrap",
            children: "Contents"
          }
        ) : null,
        m ? /* @__PURE__ */ k(
          oe,
          {
            href: m.navigableRoute || m.route,
            className: j(
              "flex-1 min-w-0 text-right transition-colors",
              p ? "text-primary hover:text-primary/80" : "text-subtle hover:text-heading"
            ),
            children: [
              /* @__PURE__ */ f("span", { className: "block text-xs uppercase tracking-wide opacity-70", children: p ? "Start reading" : "Next" }),
              /* @__PURE__ */ k("span", { className: "block font-medium truncate", children: [
                m.label || m.title,
                " →"
              ] })
            ]
          }
        ) : /* @__PURE__ */ f("span", { className: "flex-1" })
      ] })
    }
  );
}
function Ki(e) {
  const t = [], u = (r) => {
    for (const s of r || [])
      t.push(s), s.children?.length && u(s.children);
  };
  return u(e), t;
}
function We(e) {
  return (e || "").replace(/^\//, "").replace(/\/$/, "");
}
function Xi() {
  const { useLocation: e } = _u(), t = e();
  return be(() => {
    const u = (t?.hash || "").replace(/^#/, "");
    if (!u) return;
    let r = !1;
    const s = Date.now() + 4e3, i = (d) => {
      const m = d.getBoundingClientRect().top;
      return m >= -5 && m < 200;
    }, l = () => {
      if (r) return;
      const d = document.getElementById(u);
      d && !i(d) && d.scrollIntoView({ block: "start", behavior: "auto" }), Date.now() < s && setTimeout(l, 80);
    };
    return l(), () => {
      r = !0;
    };
  }, [t?.pathname, t?.hash]), null;
}
function ji({ website: e }) {
  const t = je(e);
  return fe(e, "html", t, { role: "metadata" }), null;
}
function $i({ body: e, page: t, website: u }) {
  const r = ce(), s = u || r?.website, i = s?.config?.book?.title || s?.config?.name || "Book", l = Ji(i, t?.slug);
  return /* @__PURE__ */ k(Iu, { basePath: s?.basePath, children: [
    /* @__PURE__ */ f(ji, { website: s }),
    /* @__PURE__ */ f(Xi, {}),
    /* @__PURE__ */ f("div", { className: "book-frame min-h-screen bg-surface text-body", children: /* @__PURE__ */ k("main", { className: "book-body", children: [
      e,
      /* @__PURE__ */ f(zi, {})
    ] }) }),
    /* @__PURE__ */ f(Vi, { filename: l })
  ] });
}
function Ji(e, t) {
  const u = e.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return t ? `${u}-${t}` : u;
}
const Zi = { ...ot, layouts: { BookLayout: $i } }, eo = {}, to = {}, fo = { meta: eo, capabilities: Zi, layoutMeta: to };
export {
  no as B,
  co as C,
  fo as _,
  io as a,
  oo as b,
  lo as c,
  ho as d,
  Ri as e,
  su as f,
  ci as p
};
//# sourceMappingURL=_entry.generated-Cg6080Jw.js.map
