async function $(e, t = {}) {
  const { mode: r = "html", meta: o = {}, stylesheet: n, polyfillUrl: i, ...a } = t, l = (e && e.sections || []).join(`
`), g = { ...e?.metadata || {}, ...o }, c = f({
    body: l,
    meta: g,
    stylesheet: n,
    polyfillUrl: i
  });
  if (r === "html")
    return new Blob([c], { type: "text/html; charset=utf-8" });
  if (r === "server")
    return m(c, a);
  throw new Error(
    `pagedjs adapter: unknown mode "${r}". Valid modes: 'html' (returns paged-ready HTML), 'server' (POSTs HTML to endpoint, receives PDF).`
  );
}
async function m(e, t = {}) {
  const r = t.endpoint || "/__press/pagedjs/compile", o = new FormData();
  o.append(
    "document.html",
    new Blob([e], { type: "text/html" }),
    "document.html"
  );
  let n;
  try {
    n = await fetch(r, { method: "POST", body: o });
  } catch (a) {
    throw new Error(
      `pagedjs adapter (server mode): request to ${r} failed. Is the dev server (or your compile endpoint) running? Original error: ${a.message || a}`
    );
  }
  if (!n.ok) {
    const a = await n.text().catch(() => "(no body)");
    throw new Error(
      `pagedjs adapter (server mode): ${r} returned ${n.status} ${n.statusText}.
${a}`
    );
  }
  const i = await n.blob();
  return i.type === "application/pdf" ? i : new Blob([await i.arrayBuffer()], { type: "application/pdf" });
}
function f({ body: e = "", meta: t = {}, stylesheet: r, polyfillUrl: o } = {}) {
  const n = t.language ?? "en", i = t.title ?? "Book", a = r || b, p = o || y;
  return `<!doctype html>
<html lang="${s(n)}">
  <head>
    <meta charset="utf-8" />
    <title>${d(i)}</title>
${h(t)}    <style>${a}</style>
    <script src="${s(p)}" defer><\/script>
  </head>
  <body>
${u(t)}${e}
  </body>
</html>`;
}
function h(e) {
  const t = [];
  return e?.author && t.push(`    <meta name="author" content="${s(e.author)}" />`), e?.description && t.push(
    `    <meta name="description" content="${s(e.description)}" />`
  ), e?.subject && t.push(
    `    <meta name="subject" content="${s(e.subject)}" />`
  ), t.length ? t.join(`
`) + `
` : "";
}
function u(e) {
  if (!e || typeof e != "object") return "";
  const t = Object.entries(e).filter(
    ([, o]) => o != null && typeof o != "object"
  );
  return t.length ? `    <div data-pagedjs-metadata hidden>
${t.map(
    ([o, n]) => `      <span data-field="${s(o)}">${d(String(n))}</span>`
  ).join(`
`)}
    </div>
` : "";
}
function d(e) {
  return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function s(e) {
  return String(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const y = "https://unpkg.com/pagedjs@0.4.3/dist/paged.polyfill.js", b = `
/* Hidden metadata block — the DOM carries it for CSS string-set / string() */
[data-pagedjs-metadata] { display: none; }

/* Page geometry — 6×9 US trade size */
@page {
  size: 6in 9in;
  margin: 0.75in 0.5in 0.75in 0.75in;
}
@page :left  { margin: 0.75in 0.75in 0.75in 0.5in; }
@page :right { margin: 0.75in 0.5in 0.75in 0.75in; }

/* Named string for running headers */
h1 { string-set: chapter content(); }
@page :left  { @top-left  { content: string(chapter); font-size: 9pt; color: #666; } }
@page :right { @top-right { content: string(chapter); font-size: 9pt; color: #666; } }

/* Page number footer */
@page :left  { @bottom-left  { content: counter(page); font-size: 9pt; } }
@page :right { @bottom-right { content: counter(page); font-size: 9pt; } }

/* Chapter openers: start on recto */
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
p { margin: 0 0 0.75em; text-indent: 1.25em; }
p.lead, p:first-child { text-indent: 0; }
h2 { font-size: 14pt; margin: 1.5em 0 0.5em; page-break-after: avoid; }
h3 { font-size: 12pt; margin: 1.2em 0 0.4em; page-break-after: avoid; }
code { font-family: ui-monospace, Menlo, monospace; font-size: 0.92em; }
pre {
  font-size: 9.5pt;
  padding: 0.8em;
  background: #f5f5f5;
  overflow: hidden;
  page-break-inside: avoid;
}
blockquote {
  border-left: 3px solid #ccc;
  margin: 1em 0;
  padding: 0 0 0 1em;
  color: #444;
  font-style: italic;
}
ul, ol { margin: 0.5em 0 0.75em 1.5em; }
figure { break-inside: avoid; }
`;
export {
  y as DEFAULT_POLYFILL_URL,
  b as DEFAULT_STYLESHEET,
  $ as compilePagedjs,
  f as emitDocument
};
//# sourceMappingURL=pagedjs-C8Aj7-d3.js.map
