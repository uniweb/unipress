import { a as l } from "./fetch-C-PgllAm.js";
async function d(r, c) {
  const t = u(r);
  if (!t.length) return {};
  const o = [...new Set(t.map((n) => n.src).filter(Boolean))];
  if (!o.length) return {};
  const s = await l(o, { loadAsset: c }), f = {}, i = /* @__PURE__ */ new Map();
  for (const [n, e] of s) {
    if (!e || e.error || !e.bytes) continue;
    const a = `assets/${e.hash}.${e.ext}`;
    f[a] = e.bytes, i.set(n, a);
  }
  for (const n of t) {
    const e = i.get(n.src);
    e && (n.src = e);
  }
  return f;
}
function u(r) {
  const c = [], t = (o) => {
    if (Array.isArray(o))
      for (const s of o)
        !s || typeof s != "object" || (s.type === "image" && c.push(s), Array.isArray(s.children) && t(s.children));
  };
  for (const o of r?.sections || []) t(o);
  return t(r?.header || []), t(r?.footer || []), c;
}
export {
  d as b
};
//# sourceMappingURL=inline-images-yfTUOQ0l.js.map
