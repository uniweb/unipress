import { J as q } from "./jszip.min-DTGXsDsh.js";
import { p as B } from "./_entry.generated-u89bXxo4.js";
import { a as H } from "./fetch-C-PgllAm.js";
import { n as Y, M as _ } from "./math-css-DA-qfWJB.js";
async function ct(t, e = {}) {
  const { sections: n = [], metadata: i = null } = t || {}, { meta: o = {}, stylesheet: m, identifier: f, cover: d, loadAsset: y } = e, l = { ...i || {}, ...o }, C = `${_}
${m || it}`, v = f || l.identifier || nt(), u = d || l.cover || l.coverImage;
  let T = 1;
  const $ = n.map((a) => {
    const s = Y(a, T);
    return T = s.next, s.html;
  }).map((a, s) => J(a, s)), x = /* @__PURE__ */ new Set();
  for (const a of $)
    for (const s of a.images) x.add(s);
  u && x.add(u);
  const p = x.size ? await H(x, { loadAsset: y }) : /* @__PURE__ */ new Map(), g = [], L = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Set();
  let S = null;
  for (const [a, s] of p) {
    if (s.error) {
      console.warn(`@uniweb/press epub: failed to fetch image ${a}: ${s.error.message}`);
      continue;
    }
    const E = `images/${`${s.hash}.${s.ext}`}`;
    L.set(a, E);
    const P = `img-${s.hash}`;
    j.has(E) || (j.add(E), g.push({
      id: P,
      path: E,
      mime: s.mime || "application/octet-stream",
      bytes: s.bytes,
      isCover: a === u
    })), a === u && (S = P);
  }
  const k = $.map((a, s) => {
    D(a.tree, L, "../");
    const A = et({
      title: a.title || l.title || `Chapter ${s + 1}`,
      language: l.language || "en",
      body: M(a.tree),
      stylesheetHref: "../styles.css"
    });
    return {
      id: `ch-${F(s + 1)}`,
      path: `chapters/ch-${F(s + 1)}.xhtml`,
      title: a.title || `Chapter ${s + 1}`,
      xhtml: A
    };
  }), z = S ? g.find((a) => a.id === S) : null, w = z ? {
    id: "cover-page",
    path: "chapters/cover.xhtml",
    title: l.coverTitle || "Cover",
    xhtml: tt({
      language: l.language || "en",
      title: l.title || "Cover",
      imagePath: `../${z.path}`,
      alt: l.coverAlt || l.title || "Cover"
    }),
    isCover: !0
  } : null, U = w ? [w, ...k] : k, N = new q();
  N.file("mimetype", "application/epub+zip", { compression: "STORE" }), N.file("META-INF/container.xml", V());
  const b = N.folder("OEBPS");
  b.file("content.opf", K({
    id: v,
    meta: l,
    chapters: U,
    images: g,
    coverImageId: S,
    coverPageId: w ? w.id : null
  })), b.file("nav.xhtml", Q({
    language: l.language || "en",
    title: l.title || "Contents",
    chapters: k,
    coverPage: w
  })), b.file("toc.ncx", W({
    id: v,
    title: l.title || "Book",
    chapters: U
  })), b.file("styles.css", C);
  for (const a of U)
    b.file(a.path, a.xhtml);
  for (const a of g)
    b.file(a.path, a.bytes);
  return await N.generateAsync({
    type: "blob",
    mimeType: "application/epub+zip",
    compression: "DEFLATE",
    compressionOptions: { level: 6 }
  });
}
function J(t, e) {
  const n = B(t || ""), i = { title: "", images: /* @__PURE__ */ new Set() };
  return O(n, i), {
    tree: n,
    title: i.title,
    images: i.images,
    index: e
  };
}
function O(t, e) {
  const n = t.childNodes || [];
  for (const i of n) {
    if (i.nodeName === "#text") continue;
    const o = (i.tagName || "").toLowerCase();
    if (!e.title && (o === "h1" || o === "h2" || o === "h3") && (e.title = I(i).trim()), o === "img") {
      const m = X(i, "src");
      m && !/^data:/i.test(m) && e.images.add(m);
    }
    i.childNodes && O(i, e);
  }
}
function D(t, e, n) {
  const i = t.childNodes || [];
  for (const o of i) {
    if (o.nodeName === "#text") continue;
    if ((o.tagName || "").toLowerCase() === "img") {
      const f = X(o, "src"), d = f && e.get(f);
      d && R(o, "src", n + d);
    }
    o.childNodes && D(o, e, n);
  }
}
function I(t) {
  if (t.nodeName === "#text") return t.value || "";
  let e = "";
  for (const n of t.childNodes || []) e += I(n);
  return e;
}
function X(t, e) {
  for (const n of t.attrs || [])
    if (n.name === e) return n.value;
  return null;
}
function R(t, e, n) {
  t.attrs || (t.attrs = []);
  for (const i of t.attrs)
    if (i.name === e) {
      i.value = n;
      return;
    }
  t.attrs.push({ name: e, value: n });
}
const Z = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function M(t) {
  if (t.nodeName === "#text") return c(t.value || "");
  if (t.nodeName === "#document-fragment")
    return (t.childNodes || []).map(M).join("");
  const e = (t.tagName || "").toLowerCase();
  if (!e)
    return (t.childNodes || []).map(M).join("");
  const n = G(t.attrs || []);
  if (Z.has(e))
    return `<${e}${n}/>`;
  const i = (t.childNodes || []).map(M).join("");
  return `<${e}${n}>${i}</${e}>`;
}
function G(t) {
  if (!t.length) return "";
  let e = "";
  for (const n of t) {
    const i = n.name, o = n.value == null ? "" : String(n.value);
    e += ` ${i}="${r(o)}"`;
  }
  return e;
}
function c(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function r(t) {
  return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function V() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
`;
}
function K({ id: t, meta: e, chapters: n, images: i, coverImageId: o, coverPageId: m }) {
  const f = e.title || "Untitled", d = e.language || "en", y = e.author, l = e.publisher, C = e.description, v = e.subject, u = e.rights, T = e.date || (/* @__PURE__ */ new Date()).toISOString().slice(0, 19) + "Z", h = [
    `    <dc:identifier id="pub-id">${c(t)}</dc:identifier>`,
    `    <dc:title>${c(f)}</dc:title>`,
    `    <dc:language>${c(d)}</dc:language>`
  ];
  y && h.push(`    <dc:creator>${c(y)}</dc:creator>`), l && h.push(`    <dc:publisher>${c(l)}</dc:publisher>`), C && h.push(`    <dc:description>${c(C)}</dc:description>`), v && h.push(`    <dc:subject>${c(v)}</dc:subject>`), u && h.push(`    <dc:rights>${c(u)}</dc:rights>`), h.push(`    <meta property="dcterms:modified">${c(T)}</meta>`), o && h.push(
    `    <meta name="cover" content="${r(o)}"/>`
  );
  const $ = [
    '    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>',
    '    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>',
    '    <item id="css" href="styles.css" media-type="text/css"/>'
  ];
  for (const p of n)
    $.push(
      `    <item id="${r(p.id)}" href="${r(p.path)}" media-type="application/xhtml+xml"/>`
    );
  for (const p of i) {
    const g = p.id === o ? ' properties="cover-image"' : "";
    $.push(
      `    <item id="${r(p.id)}" href="${r(p.path)}" media-type="${r(p.mime)}"${g}/>`
    );
  }
  const x = n.map((p) => `    <itemref${p.id === m ? ` idref="${r(p.id)}" linear="no"` : ` idref="${r(p.id)}"`}/>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id" xml:lang="${r(d)}">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
${h.join(`
`)}
  </metadata>
  <manifest>
${$.join(`
`)}
  </manifest>
  <spine toc="ncx">
${x.join(`
`)}
  </spine>
</package>
`;
}
function Q({ language: t, title: e, chapters: n, coverPage: i }) {
  const o = n.map(
    (d) => `        <li><a href="${r(d.path)}">${c(d.title)}</a></li>`
  ).join(`
`), m = [];
  i && m.push(
    `        <li><a epub:type="cover" href="${r(i.path)}">Cover</a></li>`
  ), m.push('        <li><a epub:type="toc" href="nav.xhtml#toc">Table of Contents</a></li>'), n.length && m.push(
    `        <li><a epub:type="bodymatter" href="${r(n[0].path)}">Start of Content</a></li>`
  );
  const f = `    <nav epub:type="landmarks" id="landmarks" hidden="hidden">
      <h2>Landmarks</h2>
      <ol>
${m.join(`
`)}
      </ol>
    </nav>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${r(t)}">
  <head>
    <meta charset="utf-8"/>
    <title>${c(e)}</title>
  </head>
  <body>
    <nav epub:type="toc" id="toc">
      <h1>${c(e)}</h1>
      <ol>
${o}
      </ol>
    </nav>
${f}
  </body>
</html>
`;
}
function W({ id: t, title: e, chapters: n }) {
  const i = n.map(
    (o, m) => `    <navPoint id="${r(o.id)}" playOrder="${m + 1}">
      <navLabel><text>${c(o.title)}</text></navLabel>
      <content src="${r(o.path)}"/>
    </navPoint>`
  ).join(`
`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${r(t)}"/>
    <meta name="dtb:depth" content="1"/>
  </head>
  <docTitle><text>${c(e)}</text></docTitle>
  <navMap>
${i}
  </navMap>
</ncx>
`;
}
function tt({ language: t, title: e, imagePath: n, alt: i }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${r(t)}">
  <head>
    <meta charset="utf-8"/>
    <title>${c(e)}</title>
    <style type="text/css">
      body { margin: 0; padding: 0; text-align: center; }
      img { max-width: 100%; max-height: 100vh; height: auto; }
    </style>
  </head>
  <body epub:type="cover">
    <div><img src="${r(n)}" alt="${r(i)}"/></div>
  </body>
</html>
`;
}
function et({ title: t, language: e, body: n, stylesheetHref: i }) {
  const o = i ? `    <link rel="stylesheet" type="text/css" href="${r(i)}"/>
` : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${r(e)}">
  <head>
    <meta charset="utf-8"/>
    <title>${c(t)}</title>
${o}  </head>
  <body>
${n}
  </body>
</html>
`;
}
function F(t) {
  return String(t).padStart(2, "0");
}
function nt() {
  if (globalThis.crypto?.randomUUID)
    return "urn:uuid:" + globalThis.crypto.randomUUID();
  const t = () => Math.floor(Math.random() * 65536).toString(16).padStart(4, "0");
  return `urn:uuid:${t()}${t()}-${t()}-4${t().slice(1)}-a${t().slice(1)}-${t()}${t()}${t()}`;
}
const it = `/* Minimal EPUB3 stylesheet — foundations can override via options.stylesheet. */
body {
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.5;
  margin: 0 5%;
}
h1, h2, h3, h4, h5, h6 {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.2;
  page-break-after: avoid;
}
h1 { font-size: 1.8em; margin-top: 2em; }
h2 { font-size: 1.4em; margin-top: 1.5em; }
h3 { font-size: 1.15em; margin-top: 1em; }
p { margin: 0 0 0.8em; text-indent: 1.25em; }
p:first-child, p.lead { text-indent: 0; }
img { max-width: 100%; height: auto; }
figure { margin: 1em 0; text-align: center; }
figcaption { font-size: 0.9em; color: #555; }
blockquote {
  margin: 1em 1.5em;
  padding-left: 1em;
  border-left: 3px solid #ccc;
  color: #444;
}
code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 0.92em; }
pre {
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 0.9em;
  background: #f5f5f5;
  padding: 0.75em;
  overflow: auto;
  white-space: pre-wrap;
}
`;
export {
  it as DEFAULT_STYLESHEET,
  tt as buildCoverXhtml,
  Q as buildNav,
  W as buildNcx,
  K as buildOpf,
  ct as compileEpub,
  M as serializeXhtml,
  et as wrapChapterXhtml
};
//# sourceMappingURL=epub-D9xZ2F1p.js.map
