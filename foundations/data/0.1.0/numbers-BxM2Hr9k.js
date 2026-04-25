function s(t, r) {
  if (t == null) return "";
  if (t = Number(t), isNaN(t)) return String(t);
  if (r && r.terms) {
    const i = e(t, r.terms);
    if (i != null) return t + i;
  }
  const n = ["th", "st", "nd", "rd"], u = Math.abs(t) % 100;
  return t + (n[(u - 20) % 10] || n[u] || n[0]);
}
function e(t, r) {
  const n = Math.abs(t), u = String(n % 100).padStart(2, "0");
  if (r["ordinal-" + u] != null) return r["ordinal-" + u];
  const i = String(n % 10).padStart(2, "0");
  return r["ordinal-" + i] != null ? r["ordinal-" + i] : r.ordinal != null ? r.ordinal : null;
}
function o(t, r) {
  if (t == null) return "";
  if (t = Number(t), r && r.terms) {
    const u = String(Math.abs(t) % 100).padStart(2, "0"), i = r.terms["long-ordinal-" + u];
    if (i) return i;
  }
  const n = [
    "",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth"
  ];
  return t >= 1 && t <= 10 ? n[t] : s(t, r);
}
function a(t) {
  if (t == null) return "";
  if (t = Number(t), isNaN(t) || t <= 0) return String(t);
  const r = [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], n = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let u = "";
  for (let i = 0; i < r.length; i++)
    for (; t >= r[i]; )
      u += n[i], t -= r[i];
  return u.toLowerCase();
}
export {
  o as l,
  s as o,
  a as r
};
//# sourceMappingURL=numbers-BxM2Hr9k.js.map
