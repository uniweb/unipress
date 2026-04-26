import { J as I } from "./jszip.min-DTGXsDsh.js";
import { p as X } from "./_entry.generated-BNQ3mRKM.js";
import { a as B } from "./fetch-C-PgllAm.js";
async function ot(t, e = {}) {
  const { sections: n = [], metadata: i = null } = t || {}, { meta: o = {}, stylesheet: m, identifier: f, cover: h, loadAsset: y } = e, s = { ...i || {}, ...o }, C = m || W, x = f || s.identifier || Q(), u = h || s.cover || s.coverImage, T = n.map((r, c) => Y(r, c)), d = /* @__PURE__ */ new Set();
  for (const r of T)
    for (const c of r.images) d.add(c);
  u && d.add(u);
  const b = d.size ? await B(d, { loadAsset: y }) : /* @__PURE__ */ new Map(), g = [], p = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Set();
  let N = null;
  for (const [r, c] of b) {
    if (c.error) {
      console.warn(`@uniweb/press epub: failed to fetch image ${r}: ${c.error.message}`);
      continue;
    }
    const E = `images/${`${c.hash}.${c.ext}`}`;
    p.set(r, E);
    const z = `img-${c.hash}`;
    v.has(E) || (v.add(E), g.push({
      id: z,
      path: E,
      mime: c.mime || "application/octet-stream",
      bytes: c.bytes,
      isCover: r === u
    })), r === u && (N = z);
  }
  const U = T.map((r, c) => {
    F(r.tree, p, "../");
    const j = K({
      title: r.title || s.title || `Chapter ${c + 1}`,
      language: s.language || "en",
      body: k(r.tree),
      stylesheetHref: "../styles.css"
    });
    return {
      id: `ch-${A(c + 1)}`,
      path: `chapters/ch-${A(c + 1)}.xhtml`,
      title: r.title || `Chapter ${c + 1}`,
      xhtml: j
    };
  }), L = N ? g.find((r) => r.id === N) : null, w = L ? {
    id: "cover-page",
    path: "chapters/cover.xhtml",
    title: s.coverTitle || "Cover",
    xhtml: V({
      language: s.language || "en",
      title: s.title || "Cover",
      imagePath: `../${L.path}`,
      alt: s.coverAlt || s.title || "Cover"
    }),
    isCover: !0
  } : null, M = w ? [w, ...U] : U, S = new I();
  S.file("mimetype", "application/epub+zip", { compression: "STORE" }), S.file("META-INF/container.xml", R());
  const $ = S.folder("OEBPS");
  $.file("content.opf", Z({
    id: x,
    meta: s,
    chapters: M,
    images: g,
    coverImageId: N,
    coverPageId: w ? w.id : null
  })), $.file("nav.xhtml", _({
    language: s.language || "en",
    title: s.title || "Contents",
    chapters: U,
    coverPage: w
  })), $.file("toc.ncx", G({
    id: x,
    title: s.title || "Book",
    chapters: M
  })), $.file("styles.css", C);
  for (const r of M)
    $.file(r.path, r.xhtml);
  for (const r of g)
    $.file(r.path, r.bytes);
  return await S.generateAsync({
    type: "blob",
    mimeType: "application/epub+zip",
    compression: "DEFLATE",
    compressionOptions: { level: 6 }
  });
}
function Y(t, e) {
  const n = X(t || ""), i = { title: "", images: /* @__PURE__ */ new Set() };
  return P(n, i), {
    tree: n,
    title: i.title,
    images: i.images,
    index: e
  };
}
function P(t, e) {
  const n = t.childNodes || [];
  for (const i of n) {
    if (i.nodeName === "#text") continue;
    const o = (i.tagName || "").toLowerCase();
    if (!e.title && (o === "h1" || o === "h2" || o === "h3") && (e.title = O(i).trim()), o === "img") {
      const m = D(i, "src");
      m && !/^data:/i.test(m) && e.images.add(m);
    }
    i.childNodes && P(i, e);
  }
}
function F(t, e, n) {
  const i = t.childNodes || [];
  for (const o of i) {
    if (o.nodeName === "#text") continue;
    if ((o.tagName || "").toLowerCase() === "img") {
      const f = D(o, "src"), h = f && e.get(f);
      h && q(o, "src", n + h);
    }
    o.childNodes && F(o, e, n);
  }
}
function O(t) {
  if (t.nodeName === "#text") return t.value || "";
  let e = "";
  for (const n of t.childNodes || []) e += O(n);
  return e;
}
function D(t, e) {
  for (const n of t.attrs || [])
    if (n.name === e) return n.value;
  return null;
}
function q(t, e, n) {
  t.attrs || (t.attrs = []);
  for (const i of t.attrs)
    if (i.name === e) {
      i.value = n;
      return;
    }
  t.attrs.push({ name: e, value: n });
}
const H = /* @__PURE__ */ new Set([
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
function k(t) {
  if (t.nodeName === "#text") return l(t.value || "");
  if (t.nodeName === "#document-fragment")
    return (t.childNodes || []).map(k).join("");
  const e = (t.tagName || "").toLowerCase();
  if (!e)
    return (t.childNodes || []).map(k).join("");
  const n = J(t.attrs || []);
  if (H.has(e))
    return `<${e}${n}/>`;
  const i = (t.childNodes || []).map(k).join("");
  return `<${e}${n}>${i}</${e}>`;
}
function J(t) {
  if (!t.length) return "";
  let e = "";
  for (const n of t) {
    const i = n.name, o = n.value == null ? "" : String(n.value);
    e += ` ${i}="${a(o)}"`;
  }
  return e;
}
function l(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function a(t) {
  return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function R() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
`;
}
function Z({ id: t, meta: e, chapters: n, images: i, coverImageId: o, coverPageId: m }) {
  const f = e.title || "Untitled", h = e.language || "en", y = e.author, s = e.publisher, C = e.description, x = e.subject, u = e.rights, T = e.date || (/* @__PURE__ */ new Date()).toISOString().slice(0, 19) + "Z", d = [
    `    <dc:identifier id="pub-id">${l(t)}</dc:identifier>`,
    `    <dc:title>${l(f)}</dc:title>`,
    `    <dc:language>${l(h)}</dc:language>`
  ];
  y && d.push(`    <dc:creator>${l(y)}</dc:creator>`), s && d.push(`    <dc:publisher>${l(s)}</dc:publisher>`), C && d.push(`    <dc:description>${l(C)}</dc:description>`), x && d.push(`    <dc:subject>${l(x)}</dc:subject>`), u && d.push(`    <dc:rights>${l(u)}</dc:rights>`), d.push(`    <meta property="dcterms:modified">${l(T)}</meta>`), o && d.push(
    `    <meta name="cover" content="${a(o)}"/>`
  );
  const b = [
    '    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>',
    '    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>',
    '    <item id="css" href="styles.css" media-type="text/css"/>'
  ];
  for (const p of n)
    b.push(
      `    <item id="${a(p.id)}" href="${a(p.path)}" media-type="application/xhtml+xml"/>`
    );
  for (const p of i) {
    const v = p.id === o ? ' properties="cover-image"' : "";
    b.push(
      `    <item id="${a(p.id)}" href="${a(p.path)}" media-type="${a(p.mime)}"${v}/>`
    );
  }
  const g = n.map((p) => `    <itemref${p.id === m ? ` idref="${a(p.id)}" linear="no"` : ` idref="${a(p.id)}"`}/>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id" xml:lang="${a(h)}">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
${d.join(`
`)}
  </metadata>
  <manifest>
${b.join(`
`)}
  </manifest>
  <spine toc="ncx">
${g.join(`
`)}
  </spine>
</package>
`;
}
function _({ language: t, title: e, chapters: n, coverPage: i }) {
  const o = n.map(
    (h) => `        <li><a href="${a(h.path)}">${l(h.title)}</a></li>`
  ).join(`
`), m = [];
  i && m.push(
    `        <li><a epub:type="cover" href="${a(i.path)}">Cover</a></li>`
  ), m.push('        <li><a epub:type="toc" href="nav.xhtml#toc">Table of Contents</a></li>'), n.length && m.push(
    `        <li><a epub:type="bodymatter" href="${a(n[0].path)}">Start of Content</a></li>`
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
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${a(t)}">
  <head>
    <meta charset="utf-8"/>
    <title>${l(e)}</title>
  </head>
  <body>
    <nav epub:type="toc" id="toc">
      <h1>${l(e)}</h1>
      <ol>
${o}
      </ol>
    </nav>
${f}
  </body>
</html>
`;
}
function G({ id: t, title: e, chapters: n }) {
  const i = n.map(
    (o, m) => `    <navPoint id="${a(o.id)}" playOrder="${m + 1}">
      <navLabel><text>${l(o.title)}</text></navLabel>
      <content src="${a(o.path)}"/>
    </navPoint>`
  ).join(`
`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${a(t)}"/>
    <meta name="dtb:depth" content="1"/>
  </head>
  <docTitle><text>${l(e)}</text></docTitle>
  <navMap>
${i}
  </navMap>
</ncx>
`;
}
function V({ language: t, title: e, imagePath: n, alt: i }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${a(t)}">
  <head>
    <meta charset="utf-8"/>
    <title>${l(e)}</title>
    <style type="text/css">
      body { margin: 0; padding: 0; text-align: center; }
      img { max-width: 100%; max-height: 100vh; height: auto; }
    </style>
  </head>
  <body epub:type="cover">
    <div><img src="${a(n)}" alt="${a(i)}"/></div>
  </body>
</html>
`;
}
function K({ title: t, language: e, body: n, stylesheetHref: i }) {
  const o = i ? `    <link rel="stylesheet" type="text/css" href="${a(i)}"/>
` : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${a(e)}">
  <head>
    <meta charset="utf-8"/>
    <title>${l(t)}</title>
${o}  </head>
  <body>
${n}
  </body>
</html>
`;
}
function A(t) {
  return String(t).padStart(2, "0");
}
function Q() {
  if (globalThis.crypto?.randomUUID)
    return "urn:uuid:" + globalThis.crypto.randomUUID();
  const t = () => Math.floor(Math.random() * 65536).toString(16).padStart(4, "0");
  return `urn:uuid:${t()}${t()}-${t()}-4${t().slice(1)}-a${t().slice(1)}-${t()}${t()}${t()}`;
}
const W = `/* Minimal EPUB3 stylesheet — foundations can override via options.stylesheet. */
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
  W as DEFAULT_STYLESHEET,
  V as buildCoverXhtml,
  _ as buildNav,
  G as buildNcx,
  Z as buildOpf,
  ot as compileEpub,
  k as serializeXhtml,
  K as wrapChapterXhtml
};
//# sourceMappingURL=epub-CxBCk6ne.js.map
