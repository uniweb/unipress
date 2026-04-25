function d(r, n) {
  if (!r) return "";
  const t = r.replace(/\s*[-\u2013]\s*/, "–");
  if (!n || n === "expanded")
    return t;
  const e = r.match(/^(\d+)\s*[-\u2013]\s*(\d+)$/);
  if (!e) return t;
  const i = e[1], u = e[2];
  return n === "minimal" ? i + "–" + c(i, u, 1) : n === "minimal-two" ? i + "–" + c(i, u, 2) : n === "chicago" ? i + "–" + o(i, u) : t;
}
function c(r, n, t) {
  let e = 0;
  for (; e < r.length && e < n.length - t && r[e] === n[e]; )
    e++;
  return n.slice(e);
}
function o(r, n) {
  const t = parseInt(r, 10), e = parseInt(n, 10);
  if (t < 100) return n;
  const i = Math.floor(t / 100), u = Math.floor(e / 100);
  return i === u && e % 100 >= 0 && e % 100 <= 9 ? n : c(r, n, 2);
}
export {
  d as p
};
//# sourceMappingURL=pages-CFNIsOHR.js.map
