async function A(e, t = {}) {
  const { loadAsset: n } = t;
  if (typeof n == "function")
    try {
      const c = await n(e);
      if (c && c.length > 0) {
        const m = h(e, c), w = u(m) || f(e) || "bin", d = await p(c);
        return { bytes: c, mime: m, hash: d, ext: w };
      }
    } catch {
    }
  const i = t.fetch || globalThis.fetch;
  if (typeof i != "function")
    throw new Error(
      "fetchAsset: no fetch() available. Pass options.fetch / options.loadAsset or run in an environment that provides globalThis.fetch."
    );
  const r = await i(e);
  if (!r.ok)
    throw new Error(`fetchAsset: HTTP ${r.status} ${r.statusText || ""} for ${e}`.trim());
  const a = await r.arrayBuffer(), s = new Uint8Array(a), g = (typeof r.headers?.get == "function" ? (r.headers.get("content-type") || "").split(";")[0].trim() : "") || h(e, s), l = u(g) || f(e) || "bin", x = await p(s);
  return { bytes: s, mime: g, hash: x, ext: l };
}
async function T(e, t = {}) {
  const n = Array.from(new Set(e)), i = await Promise.allSettled(
    n.map((a) => A(a, t))
  ), r = /* @__PURE__ */ new Map();
  return n.forEach((a, s) => {
    const o = i[s];
    o.status === "fulfilled" ? r.set(a, o.value) : r.set(a, { error: o.reason instanceof Error ? o.reason : new Error(String(o.reason)) });
  }), r;
}
function h(e, t) {
  if (t && t.length >= 4) {
    if (t[0] === 137 && t[1] === 80 && t[2] === 78 && t[3] === 71) return "image/png";
    if (t[0] === 255 && t[1] === 216 && t[2] === 255) return "image/jpeg";
    if (t[0] === 71 && t[1] === 73 && t[2] === 70) return "image/gif";
    if (t[0] === 66 && t[1] === 77) return "image/bmp";
    const i = String.fromCharCode(...t.slice(0, Math.min(256, t.length))).trimStart();
    if (i.startsWith("<?xml") || i.startsWith("<svg")) return "image/svg+xml";
  }
  const n = f(e);
  return n ? M(n) : "";
}
async function p(e) {
  const t = globalThis.crypto?.subtle;
  if (t && typeof t.digest == "function") {
    const i = await t.digest("SHA-256", e);
    return S(new Uint8Array(i)).slice(0, 16);
  }
  let n = 2166136261;
  for (let i = 0; i < e.length; i++)
    n ^= e[i], n = n + ((n << 1) + (n << 4) + (n << 7) + (n << 8) + (n << 24)) >>> 0;
  return n.toString(16).padStart(8, "0");
}
function S(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) t += e[n].toString(16).padStart(2, "0");
  return t;
}
function f(e) {
  if (!e) return "";
  const n = String(e).split(/[?#]/)[0].match(/\.([a-zA-Z0-9]+)$/);
  return n ? n[1].toLowerCase() : "";
}
const v = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  webp: "image/webp"
}, E = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/svg+xml": "svg",
  "image/webp": "webp"
};
function M(e) {
  return v[e] || "";
}
function u(e) {
  return E[e] || "";
}
export {
  T as a,
  A as f
};
//# sourceMappingURL=fetch-C-PgllAm.js.map
