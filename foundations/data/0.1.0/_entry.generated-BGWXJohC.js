import { jsx as P, jsxs as ee, Fragment as wt } from "react/jsx-runtime";
import * as Wr from "react";
import C, { createContext as Vt, useContext as $t, useMemo as Fr, createElement as oi, Children as $r, isValidElement as Lt, cloneElement as Ue, useState as ft, useEffect as Et, useReducer as tx, PureComponent as ir, forwardRef as LT, useRef as ui, useImperativeHandle as rx, useCallback as nx, Component as kT } from "react";
import { renderToStaticMarkup as Tp } from "react-dom/server";
import { getUniweb as _p, deriveCacheKey as ax } from "@uniweb/core";
const BT = /\s+/, ix = /([+\-*\/=<>!&|]+)/, q0 = {
  "|": 1,
  "&": 2,
  "=": 3,
  "!=": 3,
  "<": 4,
  "<=": 4,
  ">": 4,
  ">=": 4,
  "+": 5,
  "-": 5,
  "*": 6,
  "/": 6,
  "%": 6,
  "!": 7
};
function kn(e, t, r = {}) {
  const n = Object.keys(t), a = r.minQuoteLevel || 0, i = r.splitText || !1;
  r.skipCommas;
  const o = [];
  let u = 0, s = "", c = !1, l = "", f = [], h = "", p = 0;
  const g = ["'", '"', "`", "‘", "’", "“", "”"], y = (v, T) => v === T ? !0 : ["‘", "’"].includes(v) && ["‘", "’"].includes(T) || ["“", "”"].includes(v) && ["“", "”"].includes(T);
  function m(v, T) {
    if (i && v == "text") {
      const A = T.trim().split(BT);
      for (let b of A)
        b = ux(b), b !== "" && o.push({ type: v, value: b });
    } else
      o.push({ type: v, value: T });
    s = "";
  }
  function E(v) {
    p === 0 ? (s !== "" && m("text", s), s = v) : s += v;
  }
  for (; u < e.length; ) {
    const v = e[u];
    n.includes(v) && !c ? (E(v), p = f.push(v), h = t[v]) : v === h && !c ? (s += v, f.pop(), p--, h = p > 0 ? t[f[p - 1]] : "", p === 0 && m("enclosure", s)) : !c && g.includes(v) && p > a ? (E(v), c = !0, l = v) : c && y(l, v) ? (s += v, c = !1, p === 0 && m("quote", s)) : s += v, u++;
  }
  return s !== "" && m("text", s), o;
}
function ox(e) {
  let t = 0, r = "", n = "", a = !1;
  const i = /* @__PURE__ */ new Map();
  function o(s, c) {
    i.set(n, { type: s, value: c }), a = !1, r = "";
  }
  function u(s) {
    i.set(s, { type: "text", value: !0 }), a = !0, n = s, r = "";
  }
  for (; t < e.length; ) {
    const s = e[t];
    if (s.type == "text" && s.value !== ":") {
      const c = s.value.split(":");
      c.length === 1 ? r += s.value : a ? (r += c[0], o("text", r), r = c[1] ?? "") : (r += c[0], n = r, u(n), r = c[1] ?? "");
    } else
      r !== "" && (a ? o("text", r) : u(r)), a && s.value !== ":" ? o(s.type, s.value) : s.type == "quote" ? (n = s, u(n)) : s.value !== ":" && console.warn(`Unexpected key: ${s.value} type: ${s.type}`);
    r !== "" && (a ? o("text", r) : u(r)), t++;
  }
  return i;
}
function jT(e, t = []) {
  if (typeof e != "string")
    return e instanceof Object ? { ...e } : {};
  const r = kn(e, { "{": "}", "(": ")" }, { minQuoteLevel: 1 }), n = {};
  function a(i, o, u) {
    const s = `Invalid ${i} for snippet: ${u}. Expecting: ${o}`;
    t.push(s), console.error(s);
  }
  r.length <= 1 && a("input", "[name arg ...] { ... }", e);
  for (let i = 1; i < r.length; i += 2) {
    const o = r[i - 1].value.trim(), u = r[i].type === "enclosure" ? r[i].value[0] : "", s = u == "{" || u == "(" ? r[i].value.slice(1, -1).trim() : "";
    if (o.length < 3 || !o.startsWith("[") || !o.endsWith("]"))
      a("header", "[ ... ]", o);
    else if (!s)
      a("empty body", "{ ... }", o);
    else {
      const c = o.slice(1, -1).trim().split(BT), l = c.shift(), f = c[0] === "$0";
      f && c.shift(), !l || !/^[a-zA-Z_]\w*$/.test(l) ? a("name", "word", c.join(" ")) : c.every((h) => /^(\.\.\.)?[a-zA-Z_]\w*$/.test(h)) ? n[l] = { args: c, body: s, isText: u == "{", hasFlags: f } : a("arguments", "words", c.join(" "));
    }
  }
  return n;
}
function ux(e) {
  let t = 0, r = e.length - 1;
  for (; t <= r && e[t] === ","; )
    t++;
  for (; r >= t && e[r] === ","; )
    r--;
  return e.slice(t, r + 1);
}
function sx(e) {
  const t = [];
  let r, n, a;
  for (let i of e)
    if (i.type === "text")
      if (r = i.value.split(ix), r.length <= 1)
        t.push(i);
      else
        for (let o = 0; o < r.length; o++)
          n = r[o].trim(), n !== "" && (a = "+-*/=<>!&|".includes(n[0]), n === "!" && t.push({ type: "text", value: "" }), t.push({ type: "text", value: n, isOperator: a }));
    else
      t.push(i);
  return t;
}
function cx(e) {
  const t = [];
  let r = 0, n = !1, a = [];
  for (; r < e.length; ) {
    const i = e[r], o = e[r + 1];
    o && o.isOperator ? (n || (n = !0, a = []), a.push(i, o), r += 2) : (n ? (n = !1, a.push(i), t.push({ type: "chain", tokens: a })) : t.push(i), r++);
  }
  return n && t.push({ type: "chain", tokens: a }), t;
}
function lx(e) {
  const t = [], r = [];
  let n, a, i;
  for (let o of e)
    if (!o.isOperator)
      t.push(o.value);
    else {
      for (; r.length > 0 && q0[r[r.length - 1]] >= q0[o.value]; )
        n = r.pop(), a = t.pop(), i = t.pop(), t.push(`(${n} ${i} ${a})`);
      r.push(o.value);
    }
  for (; r.length > 0; )
    n = r.pop(), a = t.pop(), i = t.pop(), t.push(`(${n} ${i} ${a})`);
  return t[0];
}
function fx(e) {
  const t = sx(e), r = cx(t);
  for (const n of r)
    n.type === "chain" && (n.type = "enclosure", n.value = lx(n.tokens), delete n.tokens);
  return r;
}
function dx(e) {
  if (!e.length) return [];
  const t = { show: "#", if: "?", sort: ">>" }, r = t[e[0].value.toLowerCase()];
  if (!r) return e;
  e = fx(e);
  let n = { name: r, flags: {}, args: [] }, a = "";
  const i = [], o = ["by", "then", "with"], u = ["as", "of", "sort", "in", "asc", "desc", "heading", "label", "otherwise"], s = {
    sorted: "sort",
    order: "sort",
    ordered: "sort",
    ascending: "asc",
    descending: "desc",
    else: "otherwise"
  };
  for (let l = 1; l < e.length; l++) {
    const f = e[l], h = f.value.toLowerCase();
    f.type == "text" ? h in t ? (i.push(n), n = { name: t[h], flags: {}, args: [] }, a = "") : u.includes(h) ? (a = h, n.flags[a] = !0) : h in s ? (a = s[h], n.flags[a] = !0) : a ? o.includes(h) || (n.flags[a] = f, a = "") : o.includes(h) || n.args.push(f) : a ? (n.flags[a] = f, a = "") : n.args.push(f);
  }
  i.push(n);
  for (let l = 0; l < i.length; l++)
    if (i[l].name == "?") {
      l > 0 && i.unshift(...i.splice(l, 1));
      break;
    }
  const c = i.shift();
  for (const l of i) {
    const f = W0(l).map((h) => h.value);
    c.args.push({ type: "enclosure", value: "(" + f.join(" ") + ")" });
  }
  if (c.name == "?" && c.args.length == 2) {
    for (const l of i)
      if ("otherwise" in l.flags) {
        c.args.push(l.flags.otherwise);
        break;
      }
  }
  return W0(c);
}
function W0(e) {
  const t = [{ type: "text", value: e.name }];
  for (const r of e.args)
    t.push(r);
  for (const r in e.flags) {
    const n = e.flags[r];
    n === !0 ? t.push({ type: "text", value: "-" + r }) : t.push({ type: "text", value: "-" + r + "=" }, n);
  }
  return t;
}
const hx = {
  "afghan afghani": "AFN",
  "afghani afgan": "AFN",
  "albanian lek": "ALL",
  "lek albanais": "ALL",
  "algerian dinar": "DZD",
  "dinar algérien": "DZD",
  "angolan kwanza": "AOA",
  "kwanza angolais": "AOA",
  "argentine peso": "ARS",
  "peso argentin": "ARS",
  "armenian dram": "AMD",
  "dram arménien": "AMD",
  "aruban florin": "AWG",
  "florin arubais": "AWG",
  "australian dollar": "AUD",
  "dollar australien": "AUD",
  "azerbaijani manat": "AZN",
  "manat azerbaidjanais": "AZN",
  "bahamian dollar": "BSD",
  "dollar bahamien": "BSD",
  "bahraini dinar": "BHD",
  "dinar bahrëini": "BHD",
  "bangladeshi taka": "BDT",
  "taka bangladeshi": "BDT",
  "barbados dollar": "BBD",
  "dollar barbadien": "BBD",
  "belarusian ruble": "BYN",
  "rouble biélorusse": "BYN",
  "belize dollar": "BZD",
  "dollar bélizien": "BZD",
  "bermudian dollar": "BMD",
  "dollar bermudien": "BMD",
  "bhutanese ngultrum": "BTN",
  "ngultrum bhoutanais": "BTN",
  boliviano: "BOB",
  "boliviano bolivien": "BOB",
  "bosnia and herzegovina convertible mark": "BAM",
  "marka bosniaque": "BAM",
  "botswana pula": "BWP",
  "pula botswanéen": "BWP",
  "brazilian real": "BRL",
  "real brésilien": "BRL",
  "brunei dollar": "BND",
  "dollar brunéin": "BND",
  "bulgarian lev": "BGN",
  "lev bulgare": "BGN",
  "burundian franc": "BIF",
  "franc burundais": "BIF",
  "cambodian riel": "KHR",
  "rien cambodgien": "KHR",
  "canadian dollar": "CAD",
  "dollar canadien": "CAD",
  "cape verde escudo": "CVE",
  "escudo capverdien": "CVE",
  "cayman islands dollar": "KYD",
  "dollar des îles caïmans": "KYD",
  "chilean peso": "CLP",
  "peso chilien": "CLP",
  "chinese yuan": "CNY",
  "yuan chinois": "CNY",
  "colombian peso": "COP",
  "peso colombien": "COP",
  "comoro franc": "KMF",
  "franc comorien": "KMF",
  "congolese franc": "CDF",
  "franc congolais": "CDF",
  "cordoba oro": "NIO",
  "oro de cordoba": "NIO",
  "costa rican colon": "CRC",
  "colon costaricain": "CRC",
  "croatian kuna": "HRK",
  "kuna croate": "HRK",
  "cuban peso": "CUP",
  "peso cubain": "CUP",
  "czech koruna": "CZK",
  "couronne tchèque": "CZK",
  "danish krone": "DKK",
  "couronne danoise": "DKK",
  "djiboutian franc": "DJF",
  "franc djiboutien": "DJF",
  "dominican peso": "DOP",
  "peso dominicain": "DOP",
  "east caribbean dollar": "XCD",
  "dollar des caraïbes": "XCD",
  "egyptian pound": "EGP",
  "livre égyptienne": "EGP",
  "eritrean nakfa": "ERN",
  "nafka erythréen": "ERN",
  "ethiopian birr": "ETB",
  "birr éthiopien": "ETB",
  euro: "EUR",
  "falkland islands pound": "FKP",
  "livre des îles malouines": "FKP",
  "fiji dollar": "FJD",
  "dollar fidjien": "FJD",
  "gambian dalasi": "GMD",
  "dalasi gambien": "GMD",
  "georgian lari": "GEL",
  "lari georgien": "GEL",
  "ghanaian cedi": "GHS",
  "cedi ghanéen": "GHS",
  "gibraltar pound": "GIP",
  "livre de gibraltar": "GIP",
  "guatemalan quetzal": "GTQ",
  "quetzal guatémaltèque": "GTQ",
  "guinean franc": "GNF",
  "franc guinéen": "GNF",
  "guyanese dollar": "GYD",
  "dollar guyannais": "GYD",
  "haitian gourde": "HTG",
  "gourde haïtien": "HTG",
  "honduran lempira": "HNL",
  "lempira hondurien": "HNL",
  "hong kong dollar": "HKD",
  "dollar hongkongais": "HKD",
  "hungarian forint": "HUF",
  "forint hongrois": "HUF",
  "icelandic króna": "ISK",
  "couronne islandaise": "ISK",
  "indian rupee": "INR",
  "roupie indienne": "INR",
  "indonesian rupiah": "IDR",
  "roupie indonésienne": "IDR",
  "iranian rial": "IRR",
  "rial iranien": "IRR",
  "iraqi dinar": "IQD",
  "dinar irakien": "IQD",
  "israeli new sheqel": "ILS",
  "nouveau shekel israélien": "ILS",
  "jamaican dollar": "JMD",
  "dollar jamaicain": "JMD",
  "japanese yen": "JPY",
  "yen japonais": "JPY",
  "jordanian dinar": "JOD",
  "dinar jordanien": "JOD",
  "kazakhstani tenge": "KZT",
  "tenge kazakh": "KZT",
  "kenyan shilling": "KES",
  "shilling kenian": "KES",
  "kuwaiti dinar": "KWD",
  "dinar koweitien": "KWD",
  "kyrgyzstani som": "KGS",
  "som kirghiz": "KGS",
  "lao kip": "LAK",
  "kip laotien": "LAK",
  "latvian lats": "LVL",
  "lats letton": "LVL",
  "lebanese pound": "LBP",
  "livre libanaise": "LBP",
  "lesotho loti": "LSL",
  "loti lésothan": "LSL",
  "liberian dollar": "LRD",
  "dollar libérien": "LRD",
  "libyan dinar": "LYD",
  "dinar libyen": "LYD",
  lilangeni: "LTL",
  "lithuanian litas": "LTL",
  "litas lituanien": "LTL",
  "macanese pataca": "MOP",
  "pataca de macao": "MOP",
  "macedonian denar": "MKD",
  "denar macédonien": "MKD",
  "malagasy ariary": "MGA",
  "ariary malgache": "MGA",
  "malawian kwacha": "MWK",
  "kwacha malawite": "MWK",
  "malaysian ringgit": "MYR",
  "ringgit malaisien": "MYR",
  "maldivian rufiyaa": "MVR",
  "rufiyaa maldivien": "MVR",
  "mauritanian ouguiya": "MRO",
  "ouguiya mauritanien": "MRO",
  "mauritian rupee": "MUR",
  "roupie mauricienne": "MUR",
  "mexican peso": "MXN",
  "peso mexicain": "MXN",
  "moldovan leu": "MDL",
  "leu moldave": "MDL",
  "mongolian tugrik": "MNT",
  "tugrik mongolien": "MNT",
  "moroccan dirham": "MAD",
  "dirham marocain": "MAD",
  "mozambican metical": "MZN",
  "metical mozambicain": "MZN",
  "myanma kyat": "BUK",
  "kyat birman": "BUK",
  "namibian dollar": "NAD",
  "dollar namibien": "NAD",
  "nepalese rupee": "NPR",
  "roupie népalaise": "NPR",
  "netherlands antillean guilder": "ANG",
  "florin des antilles néerlandaises": "ANG",
  "new taiwan dollar": "TWD",
  "nouveau dollar de taïwan": "TWD",
  "new zealand dollar": "NZD",
  "dollar néo-zélandais": "NZD",
  "nigerian naira": "NGN",
  "naira nigérien": "NGN",
  "north korean won": "KPW",
  "won nord-coréen": "KPW",
  "norwegian krone": "NOK",
  "couronne norvégienne": "NOK",
  "omani rial": "OMR",
  "rial omanais": "OMR",
  "pakistani rupee": "PKR",
  "roupie pakistanaise": "PKR",
  "panamanian balboa": "PAB",
  "balboa panaméen": "PAB",
  "papua new guinean kina": "PGK",
  "kina papouan": "PGK",
  "paraguayan guaraní": "PYG",
  "guarani paraguayen": "PYG",
  "peruvian nuevo sol": "PEN",
  "nuevo sol péruvien": "PEN",
  "philippine peso": "PHP",
  "peso philippin": "PHP",
  "polish z?oty": "PLN",
  "zloty polonais": "PLN",
  "pound sterling": "GBP",
  "livre sterling": "GBP",
  "qatari rial": "QAR",
  "rial quatarien": "QAR",
  "romanian new leu": "RON",
  "leu roumain": "RON",
  "russian rouble": "RUB",
  "rouble russe": "RUB",
  "rwandan franc": "RWF",
  "franc rwandais": "RWF",
  "saint helena pound": "SHP",
  "livre de saint-hélène": "SHP",
  "samoan tala": "WST",
  "tala samoan": "WST",
  "são tomé and príncipe dobra": "STD",
  "dobra santoméen": "STD",
  "saudi riyal": "SAR",
  "riyal saoudien": "SAR",
  "serbian dinar": "RSD",
  "dinar serbe": "RSD",
  "seychelles rupee": "SCR",
  "roupie seychelloise": "SCR",
  "sierra leonean leone": "SLL",
  "leone sierra-léonais": "SLL",
  "singapore dollar": "SGD",
  "dollar singapourien": "SGD",
  "solomon islands dollar": "SBD",
  "dollar des îles solomon": "SBD",
  "somali shilling": "SOS",
  "shilling somalien": "SOS",
  "south african rand": "ZAR",
  "rand sud-africain": "ZAR",
  "south korean won": "KRW",
  "won sud-coréen": "KRW",
  "sri lanka rupee": "LKR",
  "roupie srilankaise": "LKR",
  "sudanese pound": "SDG",
  "livre sudanaise": "SDG",
  "surinamese dollar": "SRD",
  "dollar surinamien": "SRD",
  "swedish krona/kronor": "SEK",
  "couronne suédoise": "SEK",
  "swiss franc": "CHF",
  "franc suisse": "CHF",
  "syrian pound": "SYP",
  "livre syrienne": "SYP",
  "tajikistani somoni": "TJS",
  "somoni tadjik": "TJS",
  "tanzanian shilling": "TZS",
  "shilling tanzanien": "TZS",
  "thai baht": "THB",
  "baht thailandais": "THB",
  "tongan pa'anga": "TOP",
  "pa'anga tonguien": "TOP",
  "trinidad and tobago dollar": "TTD",
  "dollar trinidadien": "TTD",
  "tunisian dinar": "TND",
  "dinar tunisien": "TND",
  "turkish lira": "TRY",
  "livre turque": "TRY",
  "turkmenistani manat": "TMT",
  "manat turkmène": "TMM",
  "ugandan shilling": "UGX",
  "shilling ougandais": "UGX",
  "ukrainian hryvnia": "UAH",
  "hryvnia ukrainienne": "UAH",
  "united arab emirates dirham": "AED",
  "dirham des émirats arabes unis": "AED",
  "united states dollar": "USD",
  "dollar américain": "USD",
  "uruguayan peso": "UYU",
  "peso uruguayen": "UYU",
  "uzbekistan som": "UZS",
  "soum ouzbek": "UZS",
  "vanuatu vatu": "VUV",
  "vatu vanuatuan": "VUV",
  "venezuelan bolivar fuerte": "VEF",
  "bolivar fuerte vénézuélien": "VEF",
  "vietnamese dong": "VND",
  "dong vietnamien": "VND",
  "yemeni rial": "YER",
  "rial yéméni": "YER",
  "zambian kwacha": "ZMW",
  "kwacha zambien": "ZMW",
  "zimbabwe dollar": "ZWD",
  "dollar zimbabwéen": "ZWD"
}, px = {
  ">>": { prop: "*", by: "*", desc: !0, date: !0 },
  "#": {
    currency: "*",
    row: "*",
    // split string by | (like in a markdown table row)
    sep: "*",
    // separator
    wrap: "*",
    unit: "unit",
    number: ["decimal", "currency", "percent", "unit"],
    string: [],
    date: ["medium", "full", "long", "short", "year", "ym", "auto"],
    list: [],
    object: [],
    json: [],
    debug: [],
    range: ["open"],
    text: "string",
    // Alias to string
    map: "object",
    // Alias to object
    tag: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "superscript",
      "subscript",
      "span",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6"
    ]
  }
}, Y0 = {
  accessor: {
    "": { handler: bx, minArgs: 2, spread: !1 },
    // handler
    ".": gx
  },
  collector: {
    "": Nx,
    // handler
    "++": K0,
    // add, concat, merge
    "++!!": FT
  },
  creator: {
    "": { handler: vx, spread: !1 },
    //applyCreator, // handler
    "^": Yr,
    "~": Tx,
    "\\": _x,
    // Single backslash \ escaped
    "@": Ax,
    "<>": Ox,
    phone: Sx,
    address: xx,
    org: wx,
    ref: Px,
    currency: Ix,
    email: Cx
  },
  filter: {
    "": Fx,
    // handler
    "&": $x,
    // !!&
    "|": Ux,
    // !!|
    "|=": kx,
    // (|= val set) same as (| (= val set))
    "|?": Bx,
    // (|? COND val) same as (| (? COND val))
    "&?": jx,
    "+?": Jt
    // or maybe &&
  },
  formatter: {
    "": { handler: qx, minArgs: 1, spread: !1 },
    // handler
    "#": Bn
  },
  unary: {
    "": { handler: Wx, minArgs: 1, spread: !1 },
    // handler
    "!": r2,
    // list-aware; use -l to treat list as one value
    "!!": n2
    // same as (! (! val))
  },
  joiner: {
    "": { handler: Yx, minArgs: 2, spread: !0 },
    // handler
    "+-": er,
    "+:": er
    // new name
  },
  mapper: {
    "": { handler: Hx, minArgs: 2, spread: !0 },
    // handler
    "+": K0,
    // add, prefix, suffix
    "-": Rx,
    "%": Dx,
    "*": Mx,
    "/": Lx,
    ">": Kx,
    "<": Vx,
    ">=": Xx,
    "<=": Qx,
    "=": Zx,
    "==": Jx,
    "!=": e2,
    "!==": t2
  },
  sorter: {
    "": a2,
    // handlers
    ">>": i2
  },
  switcher: {
    "": u2,
    // handlers
    "?": Wa,
    "??": Wa,
    // same as ? with no arguments, but can filter several args
    "???": Wa,
    "?:": Wa
  }
}, mx = ["wrap", "aux", "label", "heading", "title"];
let Hd;
const z0 = {};
function G0(e, t, r) {
  z0[e] ??= yx(e);
  const n = z0[e];
  if (!n) return;
  if (r.length < n.minArgs) return null;
  if ((n.spread && r.length == n.minArgs && !t.l || t.s) && ke(r[r.length - 1])) {
    const o = r.pop();
    r = r.concat(o);
  }
  let a = px[e] || [];
  for (let o in a) {
    const u = a[o];
    if (ke(u)) {
      for (const s of u)
        if (s in t) {
          t[o] ? t[o] = [t[o], s] : t[o] = s, t.type = o, t.style = s;
          continue;
        }
    }
  }
  !t.type && typeof t.as == "string" && (t.type = t.as), t.lang ? t.locale = t.lang : (t.locale || (t.locale = si(t.locale)), t.lang = WT(t.locale)), t._name = e;
  const i = n.handler(n.fn, t, r);
  return t.r && ke(i) && i.reverse(), i === void 0 ? null : i;
}
function yx(e) {
  for (let t in Y0) {
    const r = Y0[t];
    if (r.hasOwnProperty(e)) {
      let n = r[""];
      return typeof n == "function" ? n = { handler: n, minArgs: 1, spread: !0 } : Dt(n) && (n = { ...n }), n.fn = r[e], n;
    }
  }
  return !1;
}
function bx(e, t, r) {
  const n = r[0], a = r.slice(1);
  if (!a.length) return n;
  if (Dt(n))
    if (a.length > 1 || ke(a[0])) {
      const i = a.length == 1 ? a[0] : a, o = [];
      for (const u of i)
        o.push(e(n, u));
      return o;
    } else
      return e(n, a[0]);
  else return a.length == 1 ? e(n, a[0]) : e(n, a);
}
function gx(e, t) {
  if (Kt(e) && (e = e.toString()), Tr(e))
    return Ur(e, t);
  if (ke(e)) {
    const r = {};
    for (const n of e)
      r[n] = Ur(n, t);
    return r;
  }
  if (Dt(e)) {
    const r = {};
    for (const n in e)
      r[e[n]] = Ur(n, t);
    return r;
  }
}
function vx(e, t, r) {
  if (["~", "phone", "address", "ref", "email"].includes(t._name) && pn(r)) {
    let n = Yr(t, r);
    return t._name === "phone" && (n = n.filter((a) => a[0])), n.map((a) => e(t, a));
  }
  return e(t, r);
}
function qd(e) {
  return Math.max(...e.map((t) => Array.isArray(t) ? t.length : 1));
}
function Yr(e, t) {
  const r = parseInt(e.sz) || qd(t);
  let n = e.dv ?? null;
  n !== null && (n = yr(n, Co(n)));
  const a = [];
  for (const i of t)
    Array.isArray(i) ? r > i.length ? a.push([...i, ...Array(r - i.length).fill(n)]) : r < i.length ? a.push(i.slice(0, r)) : a.push(i) : a.push(Array(r).fill(i));
  return e.t ? a : Ex(a);
}
function Ex(e) {
  const t = [];
  if (e.length === 0)
    return t;
  for (let r = 0; r < e[0].length; r++) {
    const n = [];
    for (let a = 0; a < e.length; a++)
      n.push(e[a][r]);
    t.push(n);
  }
  return t;
}
function Tx(e, t) {
  return new Yt(e, t);
}
function _x(e, t) {
  return new RegExp(t, e);
}
function Ax(e, t) {
  return new y2(e, t);
}
function Ox(e, t) {
  return new Ye(e, t);
}
function Sx(e, t) {
  return new b2(e, t);
}
function xx(e, t) {
  return new g2(e, t);
}
function wx(e, t) {
  return new v2(e, t);
}
function Px(e, t) {
  return new E2(e, t);
}
function Ix(e, t) {
  return new T2(e, t);
}
function Cx(e, t) {
  return new _2(e, t);
}
function Nx(e, t, r) {
  const n = Vn(r);
  return n.length ? e.init !== void 0 ? n.reduce(e, e.init) : n.reduce(e) : "";
}
function Rx(e, t) {
  if (Kt(e) && Kt(t)) return e - t;
  if (Tr(e) && Tr(t)) {
    if (e.length >= t.length) {
      if (e.endsWith(t)) return e.slice(0, -t.length);
    } else if (t.startsWith(e)) return t.slice(e.length);
    return e;
  }
  return null;
}
function Dx(e, t) {
  return t / e * 100;
}
function Mx(e, t) {
  return e * t;
}
function Lx(e, t) {
  return Kt(e) && Kt(t) ? e / t : e.toString().split(t.toString());
}
function K0(e, t) {
  return e + t;
}
function kx(e) {
  const [t, r] = e;
  return t && r && r instanceof Yt ? r.contains(t) : !1;
}
function Bx(e, t) {
}
function jx(e, t) {
}
function er(e, t) {
  const r = t[0]?.toString();
  let n = t.slice(1);
  if (n = Vn(n), Tr(r))
    return n.filter((i) => !Lu(i)).join(r);
  if (ke(r)) {
    const a = r.length ? r : [""];
    return n.reduce((o, u, s) => {
      if (!u && u !== 0) return "";
      if (s === 0) return u;
      const c = a[Math.min(s - 1, a.length - 1)];
      return o + c + u;
    }, "");
  }
  return "";
}
function Jt(e) {
  return e.every((t) => !Lu(t)) ? er({}, ["", ...e]) : "";
}
function FT(e, t) {
  return Tn(t) ? e : e + 1;
}
FT.init = 0;
function Vn(e) {
  return ke(e) ? e.flat(1 / 0) : e == null ? [] : typeof e == "object" ? Object.values(e).flat(1 / 0) : [e];
}
function Fx(e, t, r) {
  if (!pn(r))
    return e(r);
  const n = Yr({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(n[i]));
  return a;
}
function $x(e) {
  for (let t = 0; t < e.length; t++)
    if (Tn(e[t])) return e[t];
  return e[e.length - 1];
}
function Ux(e) {
  for (let t = 0; t < e.length; t++)
    if (!Tn(e[t]))
      return e[t];
  return null;
}
function Hx(e, t, r) {
  const n = r[0], a = r.slice(1);
  let i;
  return /*config.stepIn[0] &&*/ Array.isArray(n) ? i = n.map((o) => V0(e, o, a)) : i = V0(e, n, a), i;
}
function qx(e, t, r) {
  if (r.length === 1)
    return e({ ...t }, r[0]);
  const n = (i) => i.length == 1 ? e({ ...t }, i[0]) : i.map((o) => e({ ...t }, o));
  return pn(r) ? Yr({}, r).map((i) => n(i)) : n(r);
}
function Wx(e, t, r) {
  const n = r[0];
  return t.l ? e({ ...t }, n) : Array.isArray(n) ? n.map((a) => e({ ...t }, a)) : e({ ...t }, n);
}
function Yx(e, t, r) {
  if (!pn(r))
    return e(t, r);
  const n = Yr({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(t, n[i]));
  return a;
}
function V0(e, t, r) {
  return r.length == 1 && !ke(r[0]) ? e(t, r[0]) : (r.length == 1 && ke(r[0]) && (r = r[0]), r.map((n) => Array.isArray(n) ? n.map((a) => e(t, a)) : e(t, n)));
}
function zx(e, t) {
  if (!e) return [];
  if (e = Array.isArray(e) ? e : e.split("|"), Tr(t) && (t = t.split(",")), !s2(t))
    return e;
  const r = [];
  for (const n of t)
    r.push(e[n]);
  return r;
}
function Bn(e, t) {
  if (e.type ??= Co(t, e), e.row ? (t = zx(t, e.row), e.type = "list") : t = yr(t, e.type, e), t === null) return "";
  const r = e.json ? "json" : e.type, n = { ...e };
  mx.forEach((i) => {
    delete n[i];
  });
  const a = { ...n, [e.type]: e[e.type] };
  return t = Gx(r, a, t), e.title && Tr(t) && (t = qT(t, e.locale)), e.aux && (ke(t) && (t = t.join(e.sep || ", ")), t = Ap(e, t)), e.label && (ke(t) && (t = t.join(e.sep || ", ")), e.label === !0 && (e.label = e._params[0]), t = m2(e, t)), e.heading && (ke(t) && (t = t.join(e.sep || ", ")), e.heading === !0 && (e.heading = e._params[0]), t = p2(e, t)), e.wrap && (Lu(t) ? t = "" : (e.wrap === !0 && (e.wrap = "()"), t = e.wrap[0] + t + e.wrap[1])), t;
}
function Gx(e, t, r) {
  switch (e) {
    case "null":
      return "";
    case "entity":
      return r.format(t);
    case "date":
      return l2(t, r);
    case "number":
      return f2(t, r);
    case "text":
    case "string":
      return d2(t, r);
    case "object":
      return HT(t, r);
    case "json":
      return JSON.stringify(r);
    case "list":
      return UT(t, r);
    case "boolean":
      return r ? "1" : "0";
    default:
      return r ? r?.toString() || "" : (console.warn(`Cannot format type: ${t.type} for the value ${r}`), "");
  }
}
function Kx(e, t) {
  return e > t;
}
function Vx(e, t) {
  return e < t;
}
function Xx(e, t) {
  return e >= t;
}
function Qx(e, t) {
  return e <= t;
}
function Zx(e, t) {
  return e == t;
}
function Jx(e, t) {
  return e === t;
}
function e2(e, t) {
  return e != t;
}
function t2(e, t) {
  return e !== t;
}
function r2(e, t) {
  return Tn(t);
}
function n2(e, t) {
  return !Tn(t);
}
function a2(e, t, r) {
  if (!pn(r))
    return e(t, r);
  const n = Yr({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(t, n[i]));
  return a;
}
function i2(e, t) {
  const r = e.date ? o2 : $T, n = e.desc ? -1 : 1;
  return t.sort((a, i) => n * r(e, a, i));
}
function Io(e, t) {
  if (t.by && Dt(e) && !ke(e)) {
    const r = e[t.by];
    return r !== void 0 ? r : X0(e);
  }
  return X0(e);
}
function o2(e, t, r) {
  let n = Io(t, e), a = Io(r, e);
  return mn(n) && mn(a) ? yr(n, "date").getTime() - yr(a, "date").getTime() : $T(e, t, r);
}
function $T(e, t, r) {
  let n = Io(t, e), a = Io(r, e);
  const i = Kt(n), o = Kt(a);
  return i && o ? Number(n) - Number(a) : !i && !o ? (typeof n != "string" && (n = String(n)), typeof a != "string" && (a = String(a)), n.localeCompare(a, e.locale)) : i ? -1 : 1;
}
function X0(e) {
  if (ke(e))
    return e[0];
  if (e instanceof Map)
    return e.values().next().value;
  if (Dt(e)) {
    const t = Object.keys(e);
    return e[t[0]];
  } else
    return e;
}
function u2(e, t, r) {
  let n = [], a = [];
  if (t._name === "?:")
    n = r, a = r;
  else {
    let i = parseInt(t.cases);
    if (i || (i = { "??": 2, "???": 3 }[t._name] || 1), i >= r.length)
      return null;
    n = r.slice(0, i), a = r.slice(i);
  }
  if (!pn(n) && !pn(a))
    return e(t, n, a);
  {
    const i = Math.max(qd(n), qd(a)), o = { sz: i }, u = Yr(o, n), s = Yr(o, a), c = [];
    for (let l = 0; l < i; l++)
      c.push(e(t, u[l], s[l]));
    return c;
  }
}
function Wa(e, t, r) {
  for (let n = 0; n < t.length; n++)
    if (!Tn(t[n]))
      return r[n];
  return r.length > t.length ? r[t.length] : null;
}
function Lu(e) {
  return e == null || e === "" || Number.isNaN(e) ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof st && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function Tn(e) {
  return !e || e === "0" ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof st && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function Ur(e, t) {
  const r = e.split(".");
  let n = t;
  for (let a = 0; a < r.length; a++) {
    let i = r[a];
    if (ke(n) && !Kt(i)) {
      const o = [];
      for (let u of n)
        i = r.slice(a).join("."), o.push(Ur(i, u));
      return o;
    }
    if (n === null)
      return;
    if (typeof n == "object")
      if (n.hasOwnProperty(i))
        n = n[i];
      else
        return i = r.slice(a).join("."), n.hasOwnProperty(i) ? n[i] : void 0;
    else if (n instanceof Map)
      n = n.get(i);
    else
      return;
    if (n === void 0)
      return;
  }
  return n;
}
function Dt(e) {
  return e !== null && typeof e == "object";
}
function Tr(e) {
  return typeof e == "string";
}
function ke(e) {
  return Array.isArray(e);
}
function s2(e) {
  if (!ke(e) || !e.length) return !1;
  for (const t of e)
    if (!Kt(t)) return !1;
  return !0;
}
function pn(e) {
  for (let t of e)
    if (ke(t)) return !0;
  return !1;
}
function Kt(e) {
  return !isNaN(Number(e));
}
function mn(e) {
  return e ? e instanceof Date ? !0 : typeof e != "string" ? !1 : !isNaN(new Date(e).getTime()) : !1;
}
function c2(e) {
  return mn(e) ? !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(e) : !1;
}
function yr(e, t, r = {}) {
  switch (t) {
    case "boolean":
      return !Tn(e);
    case "date":
      return mn(e) ? e instanceof Date || r.date === "auto" && c2(e) ? e : new Date(e.replace(/-/g, "/")) : null;
    case "text":
    case "string":
      return Tr(e) ? e : er(Vn(e));
    case "list":
      return ke(e) ? e : Dt(e) ? Vn(e) : null;
    case "object":
      return Dt(e) ? e : null;
    case "number":
      return Kt(e) ? parseFloat(e) : mn(e) ? yr(e, "date").getTime() : 0;
    case "range":
      return e instanceof Yt ? e : ke(e) ? new Yt(r, e) : Dt(e) ? new Yt(r, [e.start, e.end]) : new Yt(r, [e]);
    case "tag":
      return e instanceof Ye ? e : ke(e) ? new Ye(r, [e]) : e instanceof st ? new Ye(r, [[null, e, null]]) : Dt(e) ? new Ye(r, [e]) : new Ye(r, [[null, e, null]]);
  }
  return e;
}
function Co(e, t = {}) {
  if (e instanceof st)
    return "entity";
  if (e instanceof Date)
    return "date";
  const r = typeof e;
  return r == "undefined" || e === null ? "null" : r == "boolean" ? r : ke(e) ? "list" : Kt(e) ? "number" : mn(e) ? "date" : Dt(e) ? "object" : r;
}
function l2(e, t) {
  if (!mn(t))
    return null;
  const r = {
    medium: "medium",
    full: "full",
    long: "long",
    short: "short",
    y: { year: "numeric" },
    m: { month: "long" },
    mm: { month: "2-digit" },
    ym: { year: "numeric", month: "long" },
    ymm: { year: "numeric", month: "2-digit" }
  };
  let n = e.date;
  return Tr(n) && (n = r[n]), (!n || n === !0) && (n = "medium"), Tr(n) && (n = { dateStyle: n }), t instanceof Date ? t.toLocaleDateString(e.locale, n) : t;
}
function f2(e, t) {
  if (isNaN(t)) return "";
  if (!e.style && Number.isInteger(t) && Math.abs(t) < 1e4)
    return t.toString();
  let r = e.style;
  if (typeof r == "string" && (r = { style: r }, r.style === "currency")) {
    const n = e.currency;
    n && typeof n == "string" ? r.currency = n.toUpperCase() : r = void 0;
  }
  return t.toLocaleString(e.locale, r);
}
function d2(e, t) {
  if (typeof t != "string")
    return console.error("Expecting a string. Found:", t), "";
  switch (t = t.trim() || "", e.style) {
    case "list":
      return t.split("|").join(" ");
    case "rlist":
      return t.split("|").reverse().join(" ");
    // case 'lang':
    //     return pickLang(text, locale);
    case "array":
      return t.split("|");
    default:
      return t;
  }
}
function UT(e, t) {
  const r = [];
  for (let n of t)
    ke(n) ? n = UT(e, n) : Dt(n) && (n = HT(e, n)), Lu(n) || r.push(n);
  return r.join(e.sep === void 0 ? " " : e.sep);
}
function HT(e, t) {
  return JSON.stringify(t);
}
function qT(e, t) {
  t = si(t);
  const r = /* @__PURE__ */ new Set([
    "and",
    "or",
    "but",
    "a",
    "an",
    "the",
    "in",
    "on",
    "at",
    "to",
    "for",
    "with",
    "not"
  ]);
  function n(a) {
    return a.charAt(0).toLocaleUpperCase(t) + a.slice(1).toLocaleLowerCase(t);
  }
  return t.toLowerCase().startsWith("en") ? e.split(" ").map((a, i, o) => i === 0 || i === o.length - 1 || !r.has(a.toLowerCase()) ? n(a) : a.toLowerCase()).join(" ") : n(e);
}
function h2(e) {
  Hd = typeof document < "u" && document.documentElement?.getAttribute("lang") || "en";
}
function si(e = null) {
  return Hd || h2(), e || Hd;
}
function WT(e = null) {
  return si(e).split("-")[0].toLowerCase();
}
function Q0(e) {
  return {
    en: "Present",
    fr: "présent",
    es: "presente",
    de: "heute",
    it: "presente",
    pt: "presente",
    zh: "至今",
    ja: "現在",
    ko: "현재",
    ru: "настоящее время",
    ar: "الحاضر",
    hi: "वर्तमान",
    bn: "বর্তমান",
    id: "sekarang",
    nl: "heden",
    pl: "obecnie",
    ro: "prezent",
    sv: "nuvarande",
    tr: "günümüz",
    uk: "теперішній час",
    vi: "hiện tại"
  }[WT(e)];
}
function Ap(e, t) {
  return t ? new Ye(e, [["u-aux", t]]).format() : "";
}
function p2(e, t) {
  if (!t && !e.force) return "";
  let r = e.level || 3;
  return new Ye(e, [
    [
      "u-value-group",
      new Ye(e, [
        [`h${r}`, e.heading],
        ["span", t]
      ])
    ]
  ]).format();
}
function m2(e, t) {
  return !t && !e.force ? "" : new Ye(e, [
    [
      "u-inline-value-group",
      new Ye(e, [
        ["label", e.label],
        ["span", t]
      ])
    ]
  ]).format();
}
class st {
  constructor(t, r) {
    if (this.flags = { ...t }, this.values = Array.isArray(r) ? [...r] : typeof r == "object" ? { ...r } : r, this.parsedArgs = null, new.target === st)
      throw new TypeError("Cannot instantiate BaseEntity directly.");
  }
  format() {
    return this.values;
  }
  isEmpty() {
    throw new Error("Method 'isEmpty()' must be implemented.");
  }
  toString() {
    throw new Error("Method 'toString()' must be implemented.");
  }
  getParsedArgs(t) {
    if (this.parsedArgs) return this.parsedArgs;
    let r = {};
    const n = this.getFieldMapping(), a = Object.keys(t);
    return Object.keys(n).forEach((i) => {
      let o = n[i];
      Array.isArray(o) || (o = [o]);
      let u = [], s = [];
      o.forEach((l) => {
        if (Array.isArray(l)) {
          let f = this.applyFunction(t, l);
          u.push(f), s.push(f);
        } else
          u.push(a.includes(l)), s.push(t?.[l] || "");
      });
      let c = Wa({}, u, s);
      r[i] = c;
    }), r;
  }
  applyFunction(t, r) {
    switch (r.shift()) {
      case ".":
        const a = r[1];
        if (!t?.[a]) return !1;
        let i = t[a];
        const o = r[0];
        return o || o === 0 ? i[o] : "";
      default:
        return !1;
    }
  }
  getFieldMapping() {
    return {};
  }
}
class y2 extends st {
  constructor(t, r) {
    super(t, r);
    let n = ke(r) ? r?.[0] : r;
    this.values = Dt(n) ? n : {};
  }
  toString() {
    return this.values[this.flags.lang];
  }
  isEmpty() {
    return !this.values || Object.keys(this.values).length === 0;
  }
}
class Yt extends st {
  constructor(t, r) {
    super(t, r);
    const n = Vn(r), a = n[0], i = n[1];
    this.givenStart = a, this.givenEnd = i, this.includeStart = !t.open, this.includeEnd = !t.open, this.flags.type || (this.flags.type = Co(a || i)), this.start = yr(a, "number"), this.end = yr(i, "number");
  }
  /**
   * Check if the Range includes a specific value
   */
  contains(t) {
    if (t instanceof Yt) return this.overlaps(t);
    t = yr(t, "number");
    let r = this.start ? this.includeStart ? t >= this.start : t > this.start : !0, n = this.end ? this.includeEnd ? t <= this.end : t < this.end : !0;
    return r && n;
  }
  /**
   * Check if another Range overlaps with this Range.
   */
  overlaps(t) {
    if (this.start && this.end && t.start && t.end) {
      const r = (this.includeStart || t.includeStart ? t.start >= this.start : t.start > this.start) && (this.includeEnd || t.includeEnd ? t.end <= this.end : t.end < this.end), n = (this.includeStart || t.includeStart ? this.start >= t.start : this.start > t.start) && (this.includeEnd || t.includeEnd ? this.end <= t.end : this.end < t.end), a = (this.includeStart || t.includeStart ? t.start <= this.end : t.start < this.end) && (this.includeEnd || t.includeEnd ? t.end >= this.start : t.end > this.start);
      return r || n || a;
    }
    return this.start && !this.end ? t.start ? this.includeStart || t.includeStart ? t.start >= this.start : t.start > this.start : !0 : !this.start && this.end ? t.end ? this.includeEnd || t.includeEnd ? t.end <= this.end : t.end < this.end : !0 : t.start && !t.end ? this.start && this.end ? (this.includeStart || t.includeStart ? t.start >= this.start : t.start > this.start) && (this.includeEnd ? t.start <= this.end : t.start < this.end) : !0 : !t.start && t.end ? this.start && this.end ? (this.includeStart ? t.end >= this.start : t.end > this.start) && (this.includeEnd || t.includeEnd ? t.end <= this.end : t.end < this.end) : !0 : !this.start && this.end && t.start && !t.end ? this.includeEnd ? t.start <= this.end : t.start < this.end : this.start && !this.end && !t.start && t.end ? this.includeStart ? t.end >= this.start : t.end > this.start : !this.start && !this.end || !t.start && !t.end || !this.start && !this.end && !t.start && !t.end;
  }
  format(t) {
    t = { ...t, ...this.flags };
    const r = t.separator || " – ";
    let n = this.givenStart, a = this.givenEnd;
    return t.type === "date" ? (n = n ? Bn(t, n) : Q0(t.locale), a = a ? Bn(t, a) : Q0(t.locale)) : t.type !== "range" && (n = Bn(t, n || ""), a = Bn(t, a || "")), n || a ? `${n}${r}${a}` : "";
  }
  isEmpty() {
    return !this.values || Array.isArray(this.values) && !this.values.filter(Boolean).length;
  }
  /**
   *  Method to convert Range to string
   */
  toString() {
    return this.format();
  }
}
class Ye extends st {
  constructor(t, r) {
    super(t, r);
    let { tag: n } = t, a = n ? ke(n) ? n : [n] : [];
    this.markups = r.map((i) => {
      let o = "", u = "", s = {};
      Array.isArray(i) ? [o, u, s = {}] = i : typeof i == "object" ? (o = i.tag || "", u = i.children || "", s = i.attrs || {}) : typeof i == "string" && (u = i);
      let c = o ? [...a, o] : [...a];
      return c.length || (c = ["span"]), { tag: c, children: u, attrs: s };
    });
  }
  format() {
    let t = "";
    const r = ["strong", "em", "u", "s", "sup", "sub"];
    return this.markups.forEach((n) => {
      const { tag: a, children: i, attrs: o } = n;
      let u = i || "";
      a.forEach((s, c) => {
        let l = "", f = {};
        switch (s) {
          case "bold":
            l = "strong";
            break;
          case "italic":
            l = "em";
            break;
          case "underline":
            l = "u";
            break;
          case "strikethrough":
            l = "s";
            break;
          case "superscript":
            l = "sup";
            break;
          case "subscript":
            l = "sub";
            break;
          default:
            l = s;
        }
        if (r.includes(l))
          if (u) {
            if (u instanceof st && u.isEmpty()) return "";
          } else return "";
        if (c === 0 && (f = o), f && Object.keys(f).length) {
          l = l === "_self" ? "span" : l;
          let h = Object.keys(f).reduce((p, g) => `${p} ${g}="${f[g]}"`, "");
          u = `<${l}${h}>${u}</${l}>`;
        } else
          l === "span" && !u || (u = l === "_self" ? u : `<${l}>${u}</${l}>`);
      }), t += u;
    }), t;
  }
  isEmpty() {
    return this.markups.length === 1 && this.markups[0].tag.length === 1 && !this.markups[0].children && (!this.markups[0].attrs || !Object.keys(this.markups[0].attrs).length);
  }
  toString() {
    return this.format();
  }
}
class b2 extends st {
  constructor(t, r) {
    super(t, r), this.parsedArgs = this.getParsedArgs(r?.[0] || {});
  }
  getFieldMapping() {
    return {
      type: ["type", "phone_type", "telephone_type"],
      country: ["country", "country_code", "telephone_country", "phone_country"],
      area: ["area", "area_code", "telephone_area", "phone_area"],
      number: ["number", "telephone_number", "phone_number"],
      ext: ["ext", "extension", "telephone_extension", "phone_extension"],
      start: ["start", "telephone_start_date", "phone_start_date"],
      end: [
        "end",
        "telephone_end_date",
        "phone_end_date",
        "telephone_expiration_date",
        "phone_expiration_date"
      ]
    };
  }
  format() {
    if (this.isEmpty()) return "";
    const { link: t = !1 } = this.flags, { type: r, country: n, ext: a, start: i, end: o } = this.parsedArgs;
    let u = new Yt({}, [i, o]).format();
    return [
      Jt([r, ":"]),
      Jt(["+", n]),
      this.buildNumber(),
      Jt(["x ", a]),
      // joinIfAllTrue(['(', new Range({}, [start, end]), ')']),
      u ? new Ye({}, [["u-aux", u]]).format() : ""
    ].filter(Boolean).join(" ");
  }
  buildNumber() {
    const { area: t, number: r } = this.parsedArgs;
    return !t && !r ? "" : Jt([Jt(["(", t, ") "]), r]);
  }
  isEmpty() {
    return !this.buildNumber();
  }
  toString() {
    return this.format();
  }
}
class g2 extends st {
  constructor(t, r) {
    super(t, r), this.parsedArgs = this.getParsedArgs(r?.[0]);
  }
  getFieldMapping() {
    return {
      type: ["type", "address_type"],
      line1: ["line1", "line_1", "address_-_line_1", "address_line_1"],
      line2: ["line2", "line_2", "address_-_line_2", "address_line_2"],
      line3: ["line3", "line_3", "address_-_line_3", "address_line_3"],
      line4: ["line4", "line_4", "address_-_line_4", "address_line_4"],
      line5: ["line5", "line_5", "address_-_line_5", "address_line_5"],
      start: ["start", "address_start_date", "start_date"],
      end: [
        "end",
        "address_end_date",
        "end_date",
        "expiration_date",
        "address_expiration_date"
      ],
      city: ["city", "address_city"],
      province: [
        [".", 0, "location"],
        "province",
        "address_province",
        "state",
        "address_state"
      ],
      country: [[".", 1, "location"], "country", "address_country"],
      zip: ["zip", "postal_code", "address_zip", "address_postal_code", "postal_zip_code"]
    };
  }
  format() {
    if (this.isEmpty()) return "";
    const {
      type: t,
      country: r,
      city: n,
      line1: a = "",
      line2: i = "",
      line3: o = "",
      line4: u = "",
      line5: s = "",
      province: c,
      zip: l = "",
      start: f = "",
      end: h = ""
    } = this.parsedArgs;
    return [
      er({}, [
        " ",
        Bn({ tag: "bold", type: "tag", bold: !0 }, Jt([t, ":"])),
        er({}, [
          " ",
          a,
          Jt(["(", new Yt({}, [f, h]), ")"])
        ])
      ]),
      i,
      o,
      u,
      s,
      er({}, [
        ", ",
        n,
        er({}, [" ", c, Jt(["(", r, ")"])])
      ]),
      l
    ].filter(Boolean).join("</br>");
  }
  isEmpty() {
    const { country: t, city: r, line1: n = "", province: a } = this.parsedArgs;
    return !t && !r && !n && !a;
  }
  toString() {
    return this.format();
  }
}
class v2 extends st {
  constructor(t, r) {
    super(t, r), this.parsedArgs = this.getParsedArgs(r?.[0]);
  }
  get name() {
    return this.parsedArgs.organization;
  }
  get country() {
    return this.parsedArgs.country;
  }
  get province() {
    return this.parsedArgs.province;
  }
  get type() {
    return this.parsedArgs.type;
  }
  getFieldMapping() {
    return {
      organization: [
        [".", 0, "organization"],
        "organization",
        "other_organization",
        "other_organization_type"
      ],
      country: [[".", 1, "organization"]],
      province: [
        [".", 2, "organization"],
        "province",
        "organization_province",
        "state",
        "organization_state"
      ],
      type: [[".", 3, "organization"], "type", "organization_type"]
    };
  }
  format() {
    if (this.isEmpty()) return "";
    const { type: t, organization: r, country: n, province: a } = this.parsedArgs, i = er(null, [" - ", n, a, t]);
    return new Ye({}, [
      [
        "u-org",
        new Ye({}, [
          ["u-org-name", r],
          ["_self", Ap({}, i)]
        ])
      ]
    ]).format();
  }
  isEmpty() {
    const { organization: t } = this.parsedArgs;
    return !t;
  }
  toString() {
    return this.format();
  }
}
class E2 extends st {
  constructor(t, r) {
    super(t, Vn(r));
  }
  format() {
    const [t, ...r] = this.values, n = er(null, [" - ", ...r]);
    return t ? new Ye({}, [
      [
        "u-ref",
        new Ye({}, [
          ["u-ref-name", t],
          ["_self", Ap({}, n)]
        ])
      ]
    ]).format() : "";
  }
  isEmpty() {
    return !this.values || !this.values.length;
  }
  toString() {
    return this.format();
  }
}
class T2 extends st {
  constructor(t, r) {
    super(t, r), this.parsedArgs = this.getParsedArgs(r?.[0]);
  }
  getFieldMapping() {
    return {
      amount: ["amount", "currency_amount"],
      currency: ["currency", "currency_code"],
      convertedAmount: ["converted_amount", "converted_currency_amount"]
    };
  }
  format() {
    if (this.isEmpty()) return "";
    const { amount: t, currency: r, convertedAmount: n } = this.parsedArgs, a = hx[r.toLowerCase()], o = [["u-amount", a ? new Intl.NumberFormat(`${si()}-CA`, {
      style: "currency",
      currency: a
    }).format(t) : t]];
    return r && o.push(["u-unit", r]), n && n !== "0" && o.push([
      "u-aux",
      new Intl.NumberFormat(`${si()}-CA`, {
        style: "currency",
        currency: "CAD"
      }).format(n)
    ]), new Ye({}, [["u-currency", new Ye({}, o)]]).format();
  }
  isEmpty() {
    return !this.parsedArgs.amount;
  }
  toString() {
    return this.format();
  }
}
class _2 extends st {
  constructor(t, r) {
    super(t, r), this.parsedArgs = this.getParsedArgs(r?.[0] || {});
  }
  getFieldMapping() {
    return {
      type: ["type", "email_type"],
      email: ["address", "email_address"],
      start: ["start", "email_start_date", "start_date"],
      end: ["end", "email_end_date", "end_date"]
    };
  }
  format() {
    if (this.isEmpty()) return "";
    const { type: t, email: r, start: n = "", end: a = "" } = this.parsedArgs;
    let i = new Yt({}, [n, a]).format();
    return [
      Jt([t, ":"]),
      r,
      i ? new Ye({}, [["u-aux", i]]).format() : ""
    ].filter(Boolean).join(" ");
  }
  isEmpty() {
    const { type: t, email: r } = this.parsedArgs;
    return !t || !r;
  }
  toString() {
    return this.format();
  }
}
const Z0 = /^[@]?[\$]?[\/]?[a-zA-Z_][a-zA-Z0-9_\/\.-]*$|^@$|^\?$/, A2 = /^-?\d+(\.\d+)?$/;
class O2 {
  /**
   * Create a loom with given snippets and custom functions.
   *
   * @param {Object|string} snippets - A key-value object, or a string with snippet definitions.
   * @param {Object} functions - A map of custom function names to handlers.
   */
  constructor(t = {}, r = {}) {
    this.snippets = jT(t), this.functions = r;
  }
  /**
   * Sets the template variables.
   *
   * @param {Object|function} variables - A key-value object, or a function that maps a key to a value.
   * @return {void}
   */
  setVariables(t) {
    this.variables = typeof t == "function" ? t : (r) => Ur(r, t);
  }
  /**
   * Finds and instantiates all the placeholders in the given text.
   *
   * @example
   * engine.render("My name is {firstName} {lastName}.")
   *
   * @param {string} template - A tex with placeholders.
   * @param {Object|function} [variables] - A key-value object, or a function that maps a key to a value.
   * @param {Map} [auxVariables] - Local variables that don't change this.variables.
   * @returns
   */
  render(t, r = null, n = null) {
    r && this.setVariables(r);
    const a = kn(t, { "{": "}" });
    let i = "";
    for (const o of a)
      if (o.type === "enclosure") {
        let u = o.value.slice(1, -1);
        u.startsWith("{") && u.endsWith("}") && (u = u.slice(1, -1));
        try {
          u = this.evaluateText(u, null, n), typeof u != "string" && (u = G0("#", { l: !0, sep: ", " }, [u]), Array.isArray(u) && u.every((s) => typeof s == "string") && (u = u.join(", ")));
        } catch (s) {
          u = s;
        }
        i += u;
      } else
        i += o.value;
    return i;
  }
  /**
   * Evaluates a placeholder.
   *
   * @param {string} text - The placeholder's text to evaluate.
   * @param {Object|function} [variables] - A key-value object, or a function that maps a key to a value.
   * @param {Map} [auxVariables] - Local variables that don't change this.variables.
   * @returns {*} The result of evaluation the placeholder.
   */
  evaluateText(t, r = null, n = null) {
    if (t = t.trim(), r && this.setVariables(r), Z0.test(t))
      return this.getVariable(t, n);
    if (t.length > 2 && t[0] === "(" && t[t.length - 1] === ")") {
      let a = 1, i = !0;
      for (let o = 1; o < t.length - 1; o++)
        if (t[o] === "(" ? a++ : t[o] === ")" && a--, a === 0) {
          i = !1;
          break;
        }
      if (i)
        return this.evaluateFunction(t.slice(1, -1), n);
    }
    return this.evaluateFunction(t, n);
  }
  evaluateList(t, r) {
    const n = kn(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!n.length) return "";
    const a = [];
    for (const i of n)
      a.push(this.evaluateExpression(i, r).value);
    return a;
  }
  evaluateObject(t, r) {
    const n = kn(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!n.length) return "";
    const a = ox(n), i = {};
    for (let [o, u] of a.entries())
      typeof o != "string" && (o = this.evaluateExpression(o, r).value), u = this.evaluateExpression(u, r).value, i[o] = u;
    return i;
  }
  parseFunction(t) {
    let r = kn(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!r.length) return {};
    r = dx(r);
    let n;
    return r[0].type == "text" && r[0].value[0] != "-" ? n = r.shift().value : r[0].type != "quote" || r[0].value[0] == "`" ? n = "#" : n = "+:", { name: n, tokens: r };
  }
  evaluateFunction(t, r) {
    const { name: n, tokens: a } = this.parseFunction(t);
    if (!n) return "";
    const i = [], o = { _params: [] };
    for (let s = 0; s < a.length; s++) {
      const c = a[s];
      if (c.type == "quote" && c.value[0] === "`" && (c.value = c.value.slice(1, -1).toLowerCase().split(" ").join("_"), c.type = "text"), c.type == "quote")
        i.push(c.value.slice(1, -1));
      else if (c.type == "text" && c.value.startsWith("-")) {
        const l = c.value.slice(1).split("=");
        if (l[1] === "" && s + 1 < a.length) {
          const f = a[++s];
          l[1] = this.evaluateExpression(f, r).value;
        } else l[1] && l[1][0] === "@" && (l[1] = this.evaluateExpression({ value: l[1] }, r).value);
        o[l[0]] = l[1] ?? !0;
      } else {
        const l = this.evaluateExpression(c, r);
        i.push(l.value), l.label && o._params.push(c.label);
      }
    }
    const u = G0(n, o, i);
    if (u !== void 0)
      return u;
    if (this.snippets.hasOwnProperty(n))
      return this.callSnippet(n, o, i);
    {
      const s = this.functions[n] ?? this.functions[n.toLowerCase()] ?? this.functions[n.toUpperCase()] ?? !1;
      return s ? this.callCustomFunction(s, o, i) : this.applyFallback(n, i);
    }
  }
  callCustomFunction(t, r, n) {
    const a = (i) => this.evaluateText(i);
    return t.call({ evaluate: a }, r, ...n);
  }
  applyFallback(t, r) {
    if (typeof Math[t] == "function")
      return Math[t](...r);
    let n = r[0];
    const a = typeof n;
    if (a === "object") {
      if (n === null)
        return "";
      Array.isArray(n) || (n = Object.values(n));
    } else if (a !== "string")
      return this.getError(102, "Invalid function name", t);
    const i = n[t] ?? n[t.toLowerCase()];
    if (typeof i != "function")
      return this.getError(104, "Invalid function name", t);
    if (r.length <= 1) return i.call(n);
    if (a === "string") return i.call(n, ...r.slice(1));
    const o = r[1], u = /* @__PURE__ */ new Map();
    return i.call(n, (...s) => {
      for (let c = 0; c < s.length; c++)
        u.set("$" + (c + 1), s[c]);
      return this.evaluateFunction(o, u);
    });
  }
  getVariableMeta(t) {
    let r = this.variables("@" + t) || {};
    return typeof r == "string" ? { label: r } : (r.label ??= qT(t.split("_").join(" ")), r);
  }
  /**
   * Evaluates an expression.
   * @param {Object} token - The expression to evaluate.
   * @param {Map} [auxVariables] - Extra environment variable values.
   * @returns {Object} The result of evaluating the expression as {value, type, label}
   */
  evaluateExpression(t, r = null) {
    const { value: n, type: a } = t;
    if (a === "quote")
      return { value: n.slice(1, -1), type: a };
    if (t.type === "enclosure") {
      if (n.startsWith("(") && n.endsWith(")"))
        return {
          value: this.evaluateFunction(n.slice(1, -1), r),
          type: "function"
        };
      if (n.startsWith("[") && n.endsWith("]"))
        return {
          value: this.evaluateList(n.slice(1, -1), r),
          type: "list"
        };
      if (n.startsWith("{") && n.endsWith("}"))
        return {
          value: this.evaluateObject(n.slice(1, -1), r),
          type: "object"
        };
    }
    return r && r.has(n) ? { value: r.get(n), type: "aux" } : Z0.test(n) ? {
      value: this.getVariable(n, r),
      label: this.getVariableMeta(n).label,
      type: "variable"
    } : A2.test(n) ? { value: parseFloat(n), type: "number" } : { value: this.getError(103, "Invalid expression", n), type: "error" };
  }
  getVariable(t, r = null) {
    if (t.startsWith("@"))
      return this.getVariableMeta(t.slice(1)).label;
    const n = this.variables(t);
    if (n !== void 0) {
      const a = this.getVariableMeta(t);
      return a.type ? yr(n, a.type) : n;
    } else return r && r.has(t) ? r.get(t) : this.snippets.hasOwnProperty(t) ? this.callSnippet(t) : this.functions.hasOwnProperty(t) ? this.callCustomFunction(this.functions[t], []) : t === "_now" ? /* @__PURE__ */ new Date() : { true: !0, false: !1, null: null }[t];
  }
  callSnippet(t, r = {}, n = []) {
    let a = this.snippets[t];
    return typeof a != "function" && (a = this.makeSnippetFunction(a), this.snippets[t] = a), a(r, n);
  }
  makeSnippetFunction(t) {
    const r = t.args || [], n = t.isText, a = t.body, i = t.hasFlags, o = /* @__PURE__ */ new Map();
    return (s, c) => {
      i && o.set("$0", s);
      for (let l = 0; l < c.length; l++) {
        const f = r[l] || "$" + (l + 1);
        if (f.startsWith("...")) {
          o.set(f.slice(3), c.slice(l));
          break;
        } else
          o.set(f, c[l]);
      }
      return n ? this.render(a, null, o) : this.evaluateFunction(a, o);
    };
  }
  getError(t, r, n) {
    throw console.error(`Error ${t}: ${r} '${n}'`), `Error[${t}][${n}]`;
  }
}
const YT = [
  ["from", "lowest", "to", "highest"],
  ["from", "highest", "to", "lowest"],
  ["sorted", "by"],
  ["joined", "by"],
  ["with", "label"],
  ["if", "present"],
  ["for", "each"],
  ["total", "of"],
  ["sum", "of"],
  ["average", "of"],
  ["count", "of"],
  ["show"],
  ["as"],
  ["if"],
  ["then"],
  ["else"],
  ["otherwise"],
  ["where"],
  ["in"],
  ["do"],
  ["ascending"],
  ["descending"]
];
YT.sort((e, t) => t.length - e.length);
const S2 = new Set(YT.map((e) => e.join(" ").toUpperCase())), x2 = /* @__PURE__ */ new Set([
  "date",
  "currency",
  "number",
  "phone",
  "address",
  "email",
  "json",
  "label",
  "text",
  "string",
  "list",
  "object",
  "tag"
]), w2 = /* @__PURE__ */ new Set([">=", "<=", "!=", "==", "&&", "||"]), P2 = /* @__PURE__ */ new Set(["+", "-", "*", "/", "%", "=", "<", ">", "!"]), I2 = /[a-zA-Z_@$?]/, C2 = /[a-zA-Z0-9_.\/@]/, Ns = /[0-9]/;
function N2(e) {
  return R2(e);
}
function R2(e) {
  const t = [], r = e.length;
  let n = 0;
  for (; n < r; ) {
    const a = e[n];
    if (a === " " || a === "	" || a === `
` || a === "\r") {
      n++;
      continue;
    }
    if (a === ",") {
      t.push({ type: "comma", value: "," }), n++;
      continue;
    }
    if (a === '"' || a === "'" || a === "`") {
      const o = zT(e, n, a);
      if (o < 0) throw new Error(`Unterminated string starting at ${n}`);
      t.push({ type: "string", value: e.slice(n + 1, o) }), n = o + 1;
      continue;
    }
    if (a === "{") {
      const o = M2(e, n, "{", "}");
      if (o < 0) throw new Error(`Unmatched '{' at ${n}`);
      t.push({ type: "loom", value: e.slice(n, o + 1) }), n = o + 1;
      continue;
    }
    if (a === "(") {
      t.push({ type: "lparen", value: "(" }), n++;
      continue;
    }
    if (a === ")") {
      t.push({ type: "rparen", value: ")" }), n++;
      continue;
    }
    if (Ns.test(a) || a === "-" && Ns.test(e[n + 1] || "") && D2(t)) {
      let o = n + (a === "-" ? 1 : 0);
      for (; o < r && (Ns.test(e[o]) || e[o] === "."); ) o++;
      t.push({ type: "number", value: parseFloat(e.slice(n, o)) }), n = o;
      continue;
    }
    const i = e.slice(n, n + 2);
    if (w2.has(i)) {
      t.push({ type: "operator", value: i }), n += 2;
      continue;
    }
    if (P2.has(a)) {
      t.push({ type: "operator", value: a }), n++;
      continue;
    }
    if (I2.test(a)) {
      let o = n + 1;
      for (; o < r && C2.test(e[o]); ) o++;
      const u = e.slice(n, o), s = u.toLowerCase();
      s === "and" ? t.push({ type: "operator", value: "&" }) : s === "or" ? t.push({ type: "operator", value: "|" }) : s === "not" ? t.push({ type: "operator", value: "!" }) : t.push({ type: "word", value: u }), n = o;
      continue;
    }
    t.push({ type: "unknown", value: a }), n++;
  }
  return t;
}
function D2(e) {
  if (e.length === 0) return !0;
  const t = e[e.length - 1];
  return !!(t.type === "operator" || t.type === "lparen" || t.type === "word" && S2.has(t.value.toUpperCase()));
}
function zT(e, t, r) {
  for (let n = t + 1; n < e.length; n++) {
    if (e[n] === "\\" && n + 1 < e.length) {
      n++;
      continue;
    }
    if (e[n] === r) return n;
  }
  return -1;
}
function M2(e, t, r, n) {
  let a = 0;
  for (let i = t; i < e.length; i++) {
    const o = e[i];
    if (o === '"' || o === "'" || o === "`") {
      const u = zT(e, i, o);
      if (u < 0) return -1;
      i = u;
      continue;
    }
    if (o === r) a++;
    else if (o === n && (a--, a === 0))
      return i;
  }
  return -1;
}
function L2(e, t, r) {
  for (const n of r) {
    if (t + n.length > e.length) continue;
    let a = !0;
    for (let i = 0; i < n.length; i++) {
      const o = e[t + i];
      if (o.type !== "word" || o.value.toLowerCase() !== n[i]) {
        a = !1;
        break;
      }
    }
    if (a)
      return {
        canonical: n.join(" ").toUpperCase(),
        length: n.length
      };
  }
  return null;
}
class br extends Error {
}
const k2 = /* @__PURE__ */ new Set(["long", "full", "short", "medium"]), B2 = [
  ["for", "each"],
  ["total", "of"],
  ["sum", "of"],
  ["average", "of"],
  ["count", "of"],
  ["show"],
  ["if"]
], Yi = [
  ["from", "lowest", "to", "highest"],
  ["from", "highest", "to", "lowest"],
  ["sorted", "by"],
  ["joined", "by"],
  ["with", "label"],
  ["if", "present"],
  ["where"],
  ["as"],
  ["if"]
], j2 = [["then"], ["show"]], F2 = [["otherwise"], ["else"]], $2 = [["else"], ["show"]], U2 = [["in"]], H2 = [["do"]], q2 = [["ascending"]], W2 = [["descending"]];
function St(e, t) {
  return L2(e.tokens, e.i, t);
}
function nt(e, t) {
  e.i += t.length;
}
function Y2(e) {
  const t = { tokens: e, i: 0 }, r = Op(t);
  if (r == null)
    throw new br("Empty Plain expression");
  if (t.i < t.tokens.length) {
    const n = t.tokens.slice(t.i).map((a) => a.value).join(" ");
    throw new br(`Unexpected trailing tokens: ${n}`);
  }
  return r;
}
function Ge(e, t = 0) {
  return e.tokens[e.i + t];
}
function Fe(e) {
  return e.tokens[e.i++];
}
function GT(e, t, r) {
  const n = Ge(e);
  if (!n || n.type !== t || r != null) {
    const a = n ? `${n.type}:${n.value}` : "end of input";
    throw new br(`Expected ${t}, got ${a}`);
  }
  return Fe(e);
}
function Op(e) {
  const t = Ge(e);
  if (!t) return null;
  const r = St(e, B2);
  if (r && !z2(e, r))
    switch (nt(e, r), r.canonical) {
      case "IF":
        return Z2(e);
      case "SHOW":
        return J0(e);
      case "TOTAL OF":
      case "SUM OF":
        return Rs(e, { type: "sum", value: kt(e) });
      case "AVERAGE OF":
        return Rs(e, { type: "average", value: kt(e) });
      case "COUNT OF":
        return Rs(e, J2(e));
      case "FOR EACH":
        return ew(e);
    }
  if (t.type === "word" && G2(e)) {
    const n = K2(e), a = Sp(e);
    return a.length > 0 ? { type: "show", value: n, modifiers: a } : n;
  }
  {
    const n = e.i;
    try {
      const a = xp(e);
      if (a != null && e.i >= e.tokens.length)
        return a;
    } catch {
    }
    e.i = n;
  }
  return J0(e);
}
function z2(e, t) {
  return e.tokens.length - e.i - t.length <= 0 && t.length === 1;
}
function G2(e) {
  const t = Ge(e, 1);
  if (!t) return !1;
  if (t.type === "string" || t.type === "number" || t.type === "lparen" || t.type === "loom")
    return !0;
  if (t.type === "word") {
    const r = e.i;
    e.i += 1;
    const n = St(e, Yi);
    return e.i = r, n == null;
  }
  return !1;
}
function K2(e) {
  const t = Fe(e).value, r = [];
  for (; e.i < e.tokens.length; ) {
    const n = Ge(e);
    if (!n) break;
    if (n.type === "comma") {
      Fe(e);
      continue;
    }
    if (n.type === "rparen" || n.type === "operator" || n.type === "word" && St(e, Yi)) break;
    const a = kt(e);
    if (a == null) break;
    r.push(a);
  }
  return { type: "call", name: t, args: r };
}
function J0(e) {
  const t = V2(e);
  if (t.length === 0) {
    const a = Ge(e), i = a ? `${a.type}:${a.value}` : "end of input";
    throw new br(`Expected a value, got ${i}`);
  }
  const r = Sp(e);
  if (t.length > 1) {
    for (const o of r)
      if (o.type !== "joinedBy" && o.type !== "ifPresent")
        throw new br(
          `Multi-value SHOW supports only JOINED BY and IF PRESENT (got ${o.type})`
        );
    const a = r.some((o) => o.type === "joinedBy"), i = r.some((o) => o.type === "ifPresent");
    if (a && i)
      throw new br(
        "JOINED BY and IF PRESENT cannot be combined on the same SHOW"
      );
    return { type: "show", values: t, modifiers: r };
  }
  const n = t[0];
  return r.length === 0 && X2(n) ? { type: "show", value: n, modifiers: [] } : { type: "show", value: n, modifiers: r };
}
function V2(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const r = Ge(e);
    if (!r) break;
    if (r.type === "comma") {
      Fe(e);
      continue;
    }
    if (r.type === "rparen" || r.type === "operator" || r.type === "word" && St(e, Yi)) break;
    const n = kt(e);
    if (n == null) break;
    t.push(n);
  }
  return t;
}
function X2(e) {
  return e.type === "var" || e.type === "string" || e.type === "number" || e.type === "loom" || e.type === "group";
}
function Sp(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const r = St(e, Yi);
    if (!r) break;
    switch (r.canonical) {
      case "AS": {
        nt(e, r), t.push({ type: "as", format: Q2(e) });
        break;
      }
      case "WITH LABEL": {
        nt(e, r);
        let n = null;
        Ge(e) && Ge(e).type === "string" && (n = Fe(e).value), t.push({ type: "withLabel", label: n });
        break;
      }
      case "SORTED BY": {
        nt(e, r);
        const n = kt(e);
        let a = "asc";
        const i = St(e, W2);
        if (i)
          nt(e, i), a = "desc";
        else {
          const o = St(e, q2);
          o && nt(e, o);
        }
        t.push({ type: "sortedBy", value: n, order: a });
        break;
      }
      case "FROM LOWEST TO HIGHEST": {
        nt(e, r), t.push({ type: "sortedBy", value: kt(e), order: "asc" });
        break;
      }
      case "FROM HIGHEST TO LOWEST": {
        nt(e, r), t.push({ type: "sortedBy", value: kt(e), order: "desc" });
        break;
      }
      case "JOINED BY": {
        nt(e, r);
        const n = Ge(e);
        if (!n || n.type !== "string")
          throw new br("JOINED BY expects a quoted string");
        Fe(e), t.push({ type: "joinedBy", sep: n.value });
        break;
      }
      case "WHERE":
      case "IF": {
        nt(e, r), t.push({ type: "where", condition: xp(e) });
        break;
      }
      case "IF PRESENT": {
        nt(e, r), t.push({ type: "ifPresent" });
        break;
      }
      default:
        return t;
    }
  }
  return t;
}
function Q2(e) {
  const t = Ge(e);
  if (t && t.type === "string")
    return Fe(e), { raw: t.value };
  const r = [];
  for (; r.length < 2; ) {
    const i = Ge(e);
    if (!i || i.type !== "word" || St(e, Yi)) break;
    r.push(Fe(e).value.toLowerCase());
  }
  if (r.length === 0)
    throw new br("AS requires a format type");
  const n = r[0], a = r[1];
  return a === "date" && k2.has(n) ? { type: "date", value: n } : a === "only" && (n === "year" || n === "month") ? { type: "date", value: n === "year" ? "y" : "m" } : x2.has(n) ? { type: n, value: a ?? null } : (a != null && e.i--, { type: n, value: null });
}
function Z2(e) {
  const t = xp(e), r = St(e, j2);
  r && nt(e, r);
  const n = em(e);
  let a = null;
  const i = St(e, F2);
  if (i) {
    nt(e, i);
    const o = St(e, $2);
    o && nt(e, o), a = em(e);
  }
  return { type: "if", condition: t, thenBranch: n, elseBranch: a };
}
function em(e) {
  return kt(e);
}
function J2(e) {
  return { type: "count", value: kt(e) };
}
function Rs(e, t) {
  const r = Sp(e);
  return r.length === 0 ? t : { type: "show", value: t, modifiers: r };
}
function ew(e) {
  const t = Ge(e);
  if (!t || t.type !== "word")
    throw new br("FOR EACH expects an identifier");
  Fe(e);
  const r = St(e, U2);
  r && nt(e, r);
  const n = kt(e), a = St(e, H2);
  a && nt(e, a);
  const i = Op(e);
  return { type: "forEach", ident: t.value, list: n, body: i };
}
function xp(e) {
  return KT(e);
}
function KT(e) {
  let t = tm(e);
  for (; ; ) {
    const r = Ge(e);
    if (!r || r.type !== "operator" || r.value !== "|" && r.value !== "||") break;
    Fe(e);
    const n = tm(e);
    t = { type: "binop", op: "|", left: t, right: n };
  }
  return t;
}
function tm(e) {
  let t = Wd(e);
  for (; ; ) {
    const r = Ge(e);
    if (!r || r.type !== "operator" || r.value !== "&" && r.value !== "&&") break;
    Fe(e);
    const n = Wd(e);
    t = { type: "binop", op: "&", left: t, right: n };
  }
  return t;
}
function Wd(e) {
  const t = Ge(e);
  if (t && t.type === "operator" && t.value === "!")
    return Fe(e), { type: "unop", op: "!", arg: Wd(e) };
  if (t && t.type === "lparen") {
    Fe(e);
    const r = KT(e);
    return GT(e, "rparen"), { type: "group", inner: r };
  }
  return rw(e);
}
const tw = /* @__PURE__ */ new Set(["=", "==", "!=", ">", "<", ">=", "<="]);
function rw(e) {
  const t = rm(e), r = Ge(e);
  if (r && r.type === "operator" && tw.has(r.value)) {
    Fe(e);
    const n = rm(e);
    return { type: "binop", op: r.value === "==" ? "=" : r.value, left: t, right: n };
  }
  return t;
}
function rm(e) {
  let t = nm(e);
  for (; ; ) {
    const r = Ge(e);
    if (!r || r.type !== "operator" || r.value !== "+" && r.value !== "-") break;
    Fe(e);
    const n = nm(e);
    t = { type: "binop", op: r.value, left: t, right: n };
  }
  return t;
}
function nm(e) {
  let t = kt(e);
  for (; ; ) {
    const r = Ge(e);
    if (!r || r.type !== "operator" || r.value !== "*" && r.value !== "/" && r.value !== "%") break;
    Fe(e);
    const n = kt(e);
    t = { type: "binop", op: r.value, left: t, right: n };
  }
  return t;
}
function kt(e) {
  const t = Ge(e);
  if (!t) return null;
  if (t.type === "lparen") {
    Fe(e);
    const r = Op(e);
    return GT(e, "rparen"), { type: "group", inner: r };
  }
  return t.type === "loom" ? (Fe(e), { type: "loom", value: t.value }) : t.type === "string" ? (Fe(e), { type: "string", value: t.value }) : t.type === "number" ? (Fe(e), { type: "number", value: t.value }) : t.type === "word" ? (Fe(e), { type: "var", path: t.value }) : null;
}
class VT extends Error {
}
function nw(e) {
  if (e == null) return "";
  const t = je(e);
  return mw(t);
}
function je(e) {
  switch (e.type) {
    case "loom": {
      const t = hw(e.value);
      return pw(t) ? `(${t})` : t;
    }
    case "var":
      return e.path;
    case "string":
      return Wn(e.value);
    case "number":
      return String(e.value);
    case "group":
      return je(e.inner);
    case "binop":
      return `(${e.op} ${je(e.left)} ${je(e.right)})`;
    case "unop":
      return `(${e.op} ${je(e.arg)})`;
    case "show":
      return iw(e);
    case "if":
      return uw(e);
    case "count":
      return sw(e);
    case "sum":
      return `(++ ${je(e.value)})`;
    case "average": {
      const t = je(e.value);
      return `(/ (++ ${t}) (++!! ${t}))`;
    }
    case "call":
      return aw(e);
    case "forEach":
      return cw(e);
    default:
      throw new VT(`Unknown node type: ${e.type}`);
  }
}
function aw(e) {
  if (e.args.length === 0) return e.name;
  const t = e.args.map(je).join(" ");
  return `(${e.name} ${t})`;
}
function iw(e) {
  if (e.values)
    return ow(e);
  const t = No(e.value), r = e.modifiers.some((u) => u.type === "sortedBy");
  let n = null;
  if (r && e.value.type === "var" && t) {
    const u = e.value.path, s = t + ".";
    u.startsWith(s) && u.length > s.length && (n = u.slice(s.length));
  }
  let a, i = -1;
  const o = e.value;
  if (o && (o.type === "count" || o.type === "sum" || o.type === "average")) {
    const u = e.modifiers.findIndex((s) => s.type === "where");
    if (u >= 0) {
      const s = e.modifiers[u], c = No(o.value), l = je(jn(s.condition, c));
      if (o.type === "count")
        a = `(++!! ${l})`;
      else if (o.type === "sum")
        a = `(++ (? ${l} ${je(o.value)}))`;
      else {
        const f = je(o.value);
        a = `(/ (++ (? ${l} ${f})) (++!! ${l}))`;
      }
      i = u;
    }
  }
  a == null && (a = n ? t : je(e.value));
  for (let u = 0; u < e.modifiers.length; u++) {
    if (u === i) continue;
    const s = e.modifiers[u];
    switch (s.type) {
      case "where": {
        a = `(? ${je(jn(s.condition, t))} ${a})`;
        break;
      }
      case "sortedBy": {
        const c = fw(s.value);
        a = `(>> ${s.order === "desc" ? "-desc " : ""}-by=${c} ${a})`, n && (a = `(. ${Wn(n)} ${a})`, n = null);
        break;
      }
      case "joinedBy":
        a = `(+: ${Wn(s.sep)} ${a})`;
        break;
      case "as":
        a = `(# ${dw(s.format)} ${a})`;
        break;
      case "withLabel": {
        a = `(# -label${s.label != null ? `=${Wn(s.label)}` : ""} ${a})`;
        break;
      }
      default:
        throw new VT(`Unknown modifier type: ${s.type}`);
    }
  }
  return a;
}
function ow(e) {
  const t = e.values.map(je);
  if (e.modifiers.some((i) => i.type === "ifPresent"))
    return `(+? ${t.join(" ")})`;
  const n = e.modifiers.find((i) => i.type === "joinedBy"), a = n ? n.sep : "";
  return `(+: ${Wn(a)} ${t.join(" ")})`;
}
function uw(e) {
  const t = je(e.condition), r = je(e.thenBranch);
  return e.elseBranch != null ? `(? ${t} ${r} ${je(e.elseBranch)})` : `(? ${t} ${r})`;
}
function sw(e) {
  return `(++!! ${je(e.value)})`;
}
function No(e) {
  if (e == null) return null;
  if (e.type === "var") {
    const t = e.path.split(".");
    return t.length > 1 ? t.slice(0, -1).join(".") : e.path;
  }
  return e.type === "group" ? No(e.inner) : e.type === "count" || e.type === "sum" || e.type === "average" ? No(e.value) : null;
}
function jn(e, t) {
  if (e == null || !t) return e;
  switch (e.type) {
    case "var": {
      const r = e.path;
      return r.startsWith(t + ".") || r === t || r.includes(".") || r === "true" || r === "false" || r === "null" || r.startsWith("@") || r.startsWith("$") ? e : { type: "var", path: `${t}.${r}` };
    }
    case "binop":
      return {
        ...e,
        left: jn(e.left, t),
        right: jn(e.right, t)
      };
    case "unop":
      return { ...e, arg: jn(e.arg, t) };
    case "group":
      return { ...e, inner: jn(e.inner, t) };
    default:
      return e;
  }
}
function cw(e) {
  const t = je(e.list), r = je(e.body).replace(
    new RegExp(`\\b${lw(e.ident)}\\b`, "g"),
    "$1"
  );
  return `(map ${t} ${Wn(r)})`;
}
function lw(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function fw(e) {
  if (e.type === "var") {
    const t = e.path.split(".");
    return t[t.length - 1];
  }
  return e.type === "string" ? e.value : je(e);
}
function dw(e) {
  if (e.raw != null) {
    const t = e.raw;
    return t.startsWith("-") ? t : `-${t}`;
  }
  return e.value != null ? `-${e.type}=${e.value}` : `-${e.type}`;
}
function Wn(e) {
  return typeof e != "string" && (e = String(e)), e.includes("'") ? e.includes('"') ? `'${e.replace(/'/g, "\\'")}'` : `"${e}"` : `'${e}'`;
}
function hw(e) {
  return e.length >= 2 && e[0] === "{" && e[e.length - 1] === "}" ? e.slice(1, -1) : e;
}
function pw(e) {
  let t = 0, r = !1, n = "";
  for (let a = 0; a < e.length; a++) {
    const i = e[a];
    if (r) {
      if (i === "\\" && a + 1 < e.length) {
        a++;
        continue;
      }
      i === n && (r = !1);
      continue;
    }
    if (i === '"' || i === "'" || i === "`") {
      r = !0, n = i;
      continue;
    }
    if (i === "(" || i === "{" || i === "[") {
      t++;
      continue;
    }
    if (i === ")" || i === "}" || i === "]") {
      t--;
      continue;
    }
    if (t === 0 && (i === " " || i === "	" || i === `
` || i === "\r"))
      return !0;
  }
  return !1;
}
function mw(e) {
  if (e.length < 2 || e[0] !== "(" || e[e.length - 1] !== ")") return e;
  let t = 0, r = !1, n = "";
  for (let a = 0; a < e.length; a++) {
    const i = e[a];
    if (r) {
      if (i === "\\" && a + 1 < e.length) {
        a++;
        continue;
      }
      i === n && (r = !1);
      continue;
    }
    if (i === '"' || i === "'" || i === "`") {
      r = !0, n = i;
      continue;
    }
    if (i === "(") t++;
    else if (i === ")" && (t--, t === 0 && a < e.length - 1))
      return e;
  }
  return e.slice(1, -1);
}
class XT {
  /**
   * @param {Object|string} snippets - Same forms as LoomCore accepts
   *   (source string, object, or empty). Bodies written in Plain
   *   syntax are eagerly translated to Compact form at construction
   *   time so the evaluator never sees Plain syntax.
   * @param {Object} functions - Passed through to LoomCore unchanged.
   */
  constructor(t = {}, r = {}) {
    const n = this._prepareSnippets(t);
    this.core = new O2(n, r);
  }
  /**
   * Pre-parse and translate snippet bodies so that any Plain syntax
   * inside a body is converted to Compact form before the body is
   * stored. After this step, the core evaluator never sees Plain
   * syntax — it just sees a library of normal Compact-form snippets.
   *
   * Uses the core tokenizer's parseSnippets to handle the source-string
   * form and to normalize the object form. Pre-built function values
   * pass through unchanged.
   */
  _prepareSnippets(t) {
    const r = jT(t), n = {};
    for (const [a, i] of Object.entries(r)) {
      if (typeof i == "function") {
        n[a] = i;
        continue;
      }
      n[a] = {
        ...i,
        body: i.isText ? this.translateTemplate(i.body) : this.translateExpression(i.body)
      };
    }
    return n;
  }
  /**
   * Render a template, translating each `{…}` placeholder from Plain
   * to Compact form before handing the result to the core renderer.
   */
  render(t, r = null, n = null) {
    const a = this.translateTemplate(t);
    return this.core.render(a, r, n);
  }
  /**
   * Evaluate a single expression. Accepts both Plain and Compact form.
   * Returns whatever the core engine returns — string, number, array,
   * object, etc.
   */
  evaluateText(t, r = null, n = null) {
    const a = this.translateExpression(t);
    return this.core.evaluateText(a, r, n);
  }
  /**
   * Walk a template, find each balanced `{…}` block, translate its
   * contents from Plain to Compact form, and rebuild the template.
   * Plain text outside placeholders is untouched.
   */
  translateTemplate(t) {
    const r = kn(t, { "{": "}" });
    let n = "";
    for (const a of r) {
      if (a.type !== "enclosure") {
        n += a.value;
        continue;
      }
      let i = a.value.slice(1, -1);
      if (i.startsWith("{") && i.endsWith("}")) {
        n += a.value;
        continue;
      }
      const o = this.translateExpression(i, { wrapped: !1 });
      n += `{${o}}`;
    }
    return n;
  }
  /**
   * Translate a single expression (the contents of a placeholder, or a
   * standalone expression passed to evaluateText). Falls back to the
   * original input on any parse or translation failure.
   */
  translateExpression(t) {
    try {
      const r = Y2(N2(t));
      return nw(r);
    } catch {
      return t;
    }
  }
}
function yw(e) {
  if (!Array.isArray(e)) return [[]];
  const t = [[]];
  for (const r of e)
    r.type === "divider" ? t.push([]) : t[t.length - 1].push(r);
  return t;
}
function Ln(e, t, r) {
  if (Array.isArray(e))
    return e.map((a) => Yd(a, t, r));
  if (!e || typeof e != "object") return e;
  const n = e.content;
  return Array.isArray(n) ? {
    ...e,
    content: n.map((a) => Yd(a, t, r))
  } : e;
}
function Yd(e, t, r) {
  if (!e || typeof e != "object") return e;
  const { type: n, content: a, text: i } = e;
  return n === "text" && typeof i == "string" ? {
    ...e,
    text: t.render(i, r)
  } : a && Array.isArray(a) ? {
    ...e,
    content: a.map((o) => Yd(o, t, r))
  } : e;
}
function am(e, t, r, n) {
  const a = e?.doc ?? e;
  if (!a?.content) return Ln(a, t, r);
  const i = Ur(n, r), o = yw(a.content);
  if (!Array.isArray(i) || i.length === 0 || o.length < 2)
    return Ln(a, t, r);
  const u = [];
  if (o[0].length > 0) {
    const l = Ln(
      { type: "doc", content: o[0] },
      t,
      r
    );
    u.push(...l.content || []);
  }
  const c = (o.length >= 3 ? o.slice(1, -1) : [o[1]]).reduce((l, f, h) => (h > 0 && l.push({ type: "divider" }), l.push(...f), l), []);
  for (const l of i) {
    const f = Ln(
      { type: "doc", content: c },
      t,
      { ...r, ...l }
    );
    u.push(...f.content || []);
  }
  if (o.length >= 3) {
    const l = o[o.length - 1];
    if (l.length > 0) {
      u.push({ type: "divider" });
      const f = Ln(
        { type: "doc", content: l },
        t,
        r
      );
      u.push(...f.content || []);
    }
  }
  return { type: "doc", content: u };
}
function bw(e = {}) {
  const {
    vars: t,
    engine: r = new XT(),
    sourceParam: n = "source",
    whereParam: a = "where",
    sortByParam: i = "sort_by",
    orderParam: o = "order"
  } = e;
  if (typeof t != "function")
    throw new Error("createLoomHandlers requires a vars function");
  return {
    content: (u, s) => {
      const c = t(u);
      if (!c) return null;
      const l = s.rawContent?.doc ?? s.rawContent, f = n ? s.properties?.[n] : null;
      if (!f) return Ln(l, r, c);
      let h = Ur(f, c);
      if (Array.isArray(h)) {
        const p = a ? s.properties?.[a] : null;
        p && (h = h.filter(
          (y) => r.evaluateText(p, { ...c, ...y })
        ));
        const g = i ? s.properties?.[i] : null;
        if (g) {
          const y = o ? s.properties?.[o] : null, m = String(y ?? "").trim().toLowerCase() === "desc";
          h = gw(h, g, c, m ? -1 : 1);
        }
        if (p || g)
          return am(l, r, { ...c, [f]: h }, f);
      }
      return am(l, r, c, f);
    }
  };
}
const zd = 0, im = 1, QT = 1e4;
function gw(e, t, r, n) {
  return e.map((a, i) => ({
    record: a,
    index: i,
    key: vw(Ur(t, { ...r, ...a }))
  })).sort((a, i) => {
    if (a.key === null || i.key === null)
      return a.key === null && i.key === null ? a.index - i.index : a.key === null ? 1 : -1;
    if (a.key.tier !== i.key.tier) return n * (a.key.tier - i.key.tier);
    const o = a.key.tier === zd ? a.key.value - i.key.value : String(a.key.value).localeCompare(String(i.key.value));
    return n * o || a.index - i.index;
  }).map((a) => a.record);
}
function vw(e) {
  if (e == null) return null;
  if (typeof e == "number")
    return Number.isFinite(e) ? { tier: zd, value: e * QT } : null;
  if (typeof e == "string") {
    const t = e.trim();
    if (t === "") return null;
    const r = Ew(t);
    return r !== null ? { tier: zd, value: r } : { tier: im, value: t };
  }
  return { tier: im, value: String(e) };
}
function Ew(e) {
  const t = /^(\d{4})(?:[/-](\d{1,2}))?(?:[/-](\d{1,2}))?/.exec(e);
  return t ? parseInt(t[1], 10) * QT + parseInt(t[2] ?? "0", 10) * 100 + parseInt(t[3] ?? "0", 10) : null;
}
const Tw = [
  {
    id: "bibliography",
    name: "Bibliography",
    basedOn: "Normal",
    next: "Normal",
    quickFormat: !0,
    run: { size: 22 },
    // 11pt
    paragraph: {
      indent: { left: 720, hanging: 720 },
      // 0.5" hanging
      spacing: { before: 0, after: 120 }
    }
  }
];
function ZT(e, t = {}) {
  return {
    title: t.title ?? e?.config?.name ?? "Academic Metrics",
    creator: t.creator ?? "Uniweb",
    subject: t.subject ?? "Academic metrics report"
  };
}
function _w(e, t = {}) {
  return {
    adapterOptions: ZT(e, t)
  };
}
function Aw(e, t = {}) {
  return {
    adapterOptions: {
      ...ZT(e, t),
      paragraphStyles: t.paragraphStyles ?? Tw,
      loadAsset: t.loadAsset
    }
  };
}
const Ow = {
  "max-content-width": {
    default: "72rem",
    description: "Maximum width for body content (wider than a book; tables need room)"
  },
  "section-padding-y": {
    default: "clamp(2rem, 4vw, 4rem)",
    description: "Vertical padding around each section"
  },
  "report-gap": {
    default: "clamp(2rem, 4vw, 4rem)",
    description: "Gap between report sections"
  }
}, Sw = new XT();
function xw(e) {
  const t = Array.isArray(e?.members) ? e.members : [], r = t.reduce(
    (u, s) => u + (Array.isArray(s.publications) ? s.publications.length : 0),
    0
  ), n = t.flatMap(
    (u) => Array.isArray(u.funding) ? u.funding : []
  ), a = n.reduce(
    (u, s) => u + (Number(s.amount) || 0),
    0
  ), i = n.length, o = t.reduce(
    (u, s) => u + (Array.isArray(s.supervisions) ? s.supervisions.length : 0),
    0
  );
  return {
    members: t,
    totalPublications: r,
    totalFunding: a,
    totalGrants: i,
    totalSupervisions: o
  };
}
const Ro = {
  defaultLayout: "MetricsLayout",
  props: {},
  handlers: bw({
    engine: Sw,
    vars: xw
  }),
  // Document outputs. Hosts (DownloadBar in-browser, `unipress compile`
  // headless) consume this map via `compileDocument(website, { format,
  // foundation, ...hostHints })`. Per-section sheet / paragraph
  // registrations still happen inside each section via useDocumentOutput;
  // these entries own document-level adapterOptions (workbook metadata,
  // paragraph style pack).
  outputs: {
    xlsx: {
      extension: "xlsx",
      getOptions: (e, t) => _w(e, t)
    },
    docx: {
      extension: "docx",
      getOptions: (e, t) => Aw(e, t)
    }
  }
}, JT = Vt(null), om = Vt(""), gr = {
  colors: {
    // Primary brand accent — used for titles, header rows, and
    // emphasis. Foundations should override this.
    accent: "0B5394",
    // Body text color.
    body: "3B3B3B",
    // Secondary / muted text (helper labels, footers).
    muted: "757575",
    // Soft border / grid color (table grid, dividers).
    softBorder: "BFD3ED",
    // Stage 6+: surface, surfaceAlt for tinted backgrounds.
    surface: "FFFFFF",
    surfaceAlt: "F5F7FB"
  },
  fonts: {
    // Default body font.
    body: "Calibri",
    // Headings / titles. Match body to keep things simple.
    heading: "Calibri",
    // Monospace (code, fixed-width data). Stage 6+.
    mono: "Consolas"
  },
  /**
   * Default locale for date / currency formatting. Foundations
   * override per-document via `website.config.business_docs.theme.locale`.
   * Builders that read the theme (`<DateText>`, `<DateRangeText>`,
   * `<Currency>`) fall back to this value when no explicit `locale`
   * prop is given. Format strings follow the BCP-47 convention.
   */
  locale: "en-CA",
  /**
   * Default ISO 4217 currency code for `<Currency>` when no explicit
   * `code` is set on the builder.
   */
  currency: "CAD",
  /**
   * Typography roles. Each entry is a small `{ font, size, bold,
   * italics, color, smallCaps, allCaps, strike, paragraph }` shape;
   * `font` and `color` may be theme keys ('body', 'heading', 'accent',
   * …) which resolve at compile time. `size` is in half-points
   * (use the convertPointsToHalfPoints helper / `pt(n)` wrapper).
   *
   * Press synthesises OOXML paragraph styles + character styles from
   * this registry on docx compile. Builders consume roles via
   * `<Paragraph role="Title">` / `<TextRun role="Label">`; the docx
   * adapter emits style references (<w:pStyle>/<w:rStyle>) instead
   * of inline run properties, so users can edit fonts/colors/sizes
   * from Word's Styles pane without find-and-replace formatting.
   *
   * Roles split into two natural buckets:
   *   - block-level (paragraph): set both paragraph and run properties,
   *     applied via `<Paragraph role="…">`. Use for whole-paragraph
   *     constructs like Title, Heading1-3, Body, Display.
   *   - inline (character): set run properties only, applied via
   *     `<TextRun role="…">`. Use for inline emphasis like Label,
   *     Caption, BodyStrong.
   *
   * Foundations override individual entries by passing
   * `theme.typography.<RoleName>` partial — anything not specified
   * inherits the default.
   */
  typography: {
    // ---- Block-level roles (paragraph) -----------------------------
    Title: {
      font: "heading",
      size: 56,
      bold: !0,
      color: "accent",
      paragraph: { spacing: { after: 240 } }
    },
    Heading1: {
      font: "heading",
      size: 32,
      bold: !0,
      color: "body",
      paragraph: { spacing: { before: 240, after: 120 } }
    },
    Heading2: {
      font: "heading",
      size: 26,
      bold: !0,
      color: "body",
      paragraph: { spacing: { before: 200, after: 100 } }
    },
    Heading3: {
      font: "heading",
      size: 22,
      bold: !0,
      color: "body",
      paragraph: { spacing: { before: 160, after: 80 } }
    },
    Body: {
      font: "body",
      size: 22,
      color: "body",
      paragraph: { spacing: { line: 276 } }
      // 1.15 line height
    },
    Display: {
      font: "body",
      size: 28,
      bold: !0,
      color: "body"
    },
    // ---- Inline roles (character) ----------------------------------
    BodyStrong: { font: "body", size: 22, bold: !0, color: "body" },
    Label: {
      font: "body",
      size: 18,
      bold: !0,
      color: "muted",
      allCaps: !0
    },
    Caption: { font: "body", size: 18, color: "muted" },
    TableHeader: {
      font: "heading",
      size: 20,
      bold: !0,
      color: "surface"
    },
    TotalLine: {
      font: "heading",
      size: 26,
      bold: !0,
      color: "surface"
    }
  },
  /**
   * Roles whose declaration should land in the OOXML paragraphStyles
   * bucket vs the characterStyles bucket. Block roles cover both
   * paragraph and run properties; inline roles cover only run
   * properties. Foundations adding new roles should classify them
   * here; unclassified roles default to character-style (run-only).
   */
  typographyKinds: {
    Title: "paragraph",
    Heading1: "paragraph",
    Heading2: "paragraph",
    Heading3: "paragraph",
    Body: "paragraph",
    Display: "paragraph",
    BodyStrong: "character",
    Label: "character",
    Caption: "character",
    TableHeader: "character",
    TotalLine: "character"
  }
}, Gd = Vt(gr);
function e_() {
  return $t(Gd) || gr;
}
function ci(e, t = gr) {
  if (!e) return;
  if (typeof e != "string") return e;
  const r = t && t.colors ? t.colors : gr.colors;
  return Object.prototype.hasOwnProperty.call(r, e) ? um(r[e]) : um(e);
}
function ww(e, t = gr) {
  if (!e) return;
  if (typeof e != "string") return e;
  const r = t && t.fonts ? t.fonts : gr.fonts;
  return Object.prototype.hasOwnProperty.call(r, e) ? r[e] : e;
}
function um(e) {
  return typeof e == "string" && e.startsWith("#") ? e.slice(1) : e;
}
function t_() {
  const e = /* @__PURE__ */ new WeakMap(), t = [], r = (n, a) => `${n}@${a && a.role || "body"}`;
  return {
    register(n, a, i, o = {}) {
      let u = e.get(n);
      u || (u = /* @__PURE__ */ new Map(), e.set(n, u), t.push(n)), u.set(r(a, o), { fragment: i, options: o });
    },
    getOutputs(n) {
      const a = [], i = `${n}@`;
      for (const o of t) {
        const u = e.get(o);
        if (u)
          for (const [s, c] of u)
            s.startsWith(i) && a.push({ block: o, ...c });
      }
      return a;
    },
    clear() {
      t.length = 0;
    },
    // Reassigned by the provider so the compile pipeline can re-wrap
    // fragments with the same contexts they rendered under. Identity
    // function until the provider sets it.
    wrapWithProviders: (n) => n
  };
}
function Pw(e) {
  return e ? {
    colors: { ...gr.colors, ...e.colors || {} },
    fonts: { ...gr.fonts, ...e.fonts || {} },
    ...Object.fromEntries(
      Object.entries(e).filter(
        ([t]) => t !== "colors" && t !== "fonts"
      )
    )
  } : gr;
}
function r_({
  children: e,
  basePath: t = "",
  theme: r,
  store: n
}) {
  const a = Fr(
    () => n || t_(),
    [n]
  ), i = t || "", o = Fr(() => Pw(r), [r]);
  return a.wrapWithProviders = (u) => oi(
    om.Provider,
    { value: i },
    oi(
      Gd.Provider,
      { value: o },
      u
    )
  ), /* @__PURE__ */ P(JT.Provider, { value: a, children: /* @__PURE__ */ P(om.Provider, { value: i, children: /* @__PURE__ */ P(Gd.Provider, { value: o, children: e }) }) });
}
function ct(e, t, r, n = {}) {
  const a = $t(JT);
  if (!a) {
    process.env.NODE_ENV !== "production" && console.warn(
      "useDocumentOutput was called outside of a <DocumentProvider>. Document output will not be registered."
    );
    return;
  }
  a.register(e, t, r, n);
}
const Iw = /* @__PURE__ */ new Set([
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
]), Me = "�";
var S;
(function(e) {
  e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
})(S || (S = {}));
const mt = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function n_(e) {
  return e >= 55296 && e <= 57343;
}
function Cw(e) {
  return e >= 56320 && e <= 57343;
}
function Nw(e, t) {
  return (e - 55296) * 1024 + 9216 + t;
}
function a_(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function i_(e) {
  return e >= 64976 && e <= 65007 || Iw.has(e);
}
var U;
(function(e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(U || (U = {}));
const Rw = 65536;
class Dw {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = Rw, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(t, r) {
    const { line: n, col: a, offset: i } = this, o = a + r, u = i + r;
    return {
      code: t,
      startLine: n,
      endLine: n,
      startCol: o,
      endCol: o,
      startOffset: u,
      endOffset: u
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
      const r = this.html.charCodeAt(this.pos + 1);
      if (Cw(r))
        return this.pos++, this._addGap(), Nw(t, r);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, S.EOF;
    return this._err(U.surrogateInInputStream), t;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
  }
  write(t, r) {
    this.html.length > 0 ? this.html += t : this.html = t, this.endOfChunkHit = !1, this.lastChunkWritten = r;
  }
  insertHtmlAtCurrentPos(t) {
    this.html = this.html.substring(0, this.pos + 1) + t + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
  }
  startsWith(t, r) {
    if (this.pos + t.length > this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (r)
      return this.html.startsWith(t, this.pos);
    for (let n = 0; n < t.length; n++)
      if ((this.html.charCodeAt(this.pos + n) | 32) !== t.charCodeAt(n))
        return !1;
    return !0;
  }
  peek(t) {
    const r = this.pos + t;
    if (r >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, S.EOF;
    const n = this.html.charCodeAt(r);
    return n === S.CARRIAGE_RETURN ? S.LINE_FEED : n;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, S.EOF;
    let t = this.html.charCodeAt(this.pos);
    return t === S.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, S.LINE_FEED) : t === S.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, n_(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === S.LINE_FEED || t === S.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    a_(t) ? this._err(U.controlCharacterInInputStream) : i_(t) && this._err(U.noncharacterInInputStream);
  }
  retreat(t) {
    for (this.pos -= t; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
var be;
(function(e) {
  e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})(be || (be = {}));
function o_(e, t) {
  for (let r = e.attrs.length - 1; r >= 0; r--)
    if (e.attrs[r].name === t)
      return e.attrs[r].value;
  return null;
}
const Mw = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ 'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), Lw = /* @__PURE__ */ new Map([
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
function kw(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = Lw.get(e)) !== null && t !== void 0 ? t : e;
}
var Ze;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(Ze || (Ze = {}));
const Bw = 32;
var Br;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(Br || (Br = {}));
function Kd(e) {
  return e >= Ze.ZERO && e <= Ze.NINE;
}
function jw(e) {
  return e >= Ze.UPPER_A && e <= Ze.UPPER_F || e >= Ze.LOWER_A && e <= Ze.LOWER_F;
}
function Fw(e) {
  return e >= Ze.UPPER_A && e <= Ze.UPPER_Z || e >= Ze.LOWER_A && e <= Ze.LOWER_Z || Kd(e);
}
function $w(e) {
  return e === Ze.EQUALS || Fw(e);
}
var Ve;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(Ve || (Ve = {}));
var dr;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(dr || (dr = {}));
class Uw {
  constructor(t, r, n) {
    this.decodeTree = t, this.emitCodePoint = r, this.errors = n, this.state = Ve.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = dr.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = Ve.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
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
  write(t, r) {
    switch (this.state) {
      case Ve.EntityStart:
        return t.charCodeAt(r) === Ze.NUM ? (this.state = Ve.NumericStart, this.consumed += 1, this.stateNumericStart(t, r + 1)) : (this.state = Ve.NamedEntity, this.stateNamedEntity(t, r));
      case Ve.NumericStart:
        return this.stateNumericStart(t, r);
      case Ve.NumericDecimal:
        return this.stateNumericDecimal(t, r);
      case Ve.NumericHex:
        return this.stateNumericHex(t, r);
      case Ve.NamedEntity:
        return this.stateNamedEntity(t, r);
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
  stateNumericStart(t, r) {
    return r >= t.length ? -1 : (t.charCodeAt(r) | Bw) === Ze.LOWER_X ? (this.state = Ve.NumericHex, this.consumed += 1, this.stateNumericHex(t, r + 1)) : (this.state = Ve.NumericDecimal, this.stateNumericDecimal(t, r));
  }
  addToNumericResult(t, r, n, a) {
    if (r !== n) {
      const i = n - r;
      this.result = this.result * Math.pow(a, i) + Number.parseInt(t.substr(r, i), a), this.consumed += i;
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
  stateNumericHex(t, r) {
    const n = r;
    for (; r < t.length; ) {
      const a = t.charCodeAt(r);
      if (Kd(a) || jw(a))
        r += 1;
      else
        return this.addToNumericResult(t, n, r, 16), this.emitNumericEntity(a, 3);
    }
    return this.addToNumericResult(t, n, r, 16), -1;
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
  stateNumericDecimal(t, r) {
    const n = r;
    for (; r < t.length; ) {
      const a = t.charCodeAt(r);
      if (Kd(a))
        r += 1;
      else
        return this.addToNumericResult(t, n, r, 10), this.emitNumericEntity(a, 2);
    }
    return this.addToNumericResult(t, n, r, 10), -1;
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
  emitNumericEntity(t, r) {
    var n;
    if (this.consumed <= r)
      return (n = this.errors) === null || n === void 0 || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === Ze.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === dr.Strict)
      return 0;
    return this.emitCodePoint(kw(this.result), this.consumed), this.errors && (t !== Ze.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
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
  stateNamedEntity(t, r) {
    const { decodeTree: n } = this;
    let a = n[this.treeIndex], i = (a & Br.VALUE_LENGTH) >> 14;
    for (; r < t.length; r++, this.excess++) {
      const o = t.charCodeAt(r);
      if (this.treeIndex = Hw(n, a, this.treeIndex + Math.max(1, i), o), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === dr.Attribute && // We shouldn't have consumed any characters after the entity,
        (i === 0 || // And there should be no invalid characters.
        $w(o)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (a = n[this.treeIndex], i = (a & Br.VALUE_LENGTH) >> 14, i !== 0) {
        if (o === Ze.SEMI)
          return this.emitNamedEntityData(this.treeIndex, i, this.consumed + this.excess);
        this.decodeMode !== dr.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
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
    const { result: r, decodeTree: n } = this, a = (n[r] & Br.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(r, a, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
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
  emitNamedEntityData(t, r, n) {
    const { decodeTree: a } = this;
    return this.emitCodePoint(r === 1 ? a[t] & ~Br.VALUE_LENGTH : a[t + 1], n), r === 3 && this.emitCodePoint(a[t + 2], n), n;
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
      case Ve.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== dr.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case Ve.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case Ve.NumericHex:
        return this.emitNumericEntity(0, 3);
      case Ve.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case Ve.EntityStart:
        return 0;
    }
  }
}
function Hw(e, t, r, n) {
  const a = (t & Br.BRANCH_LENGTH) >> 7, i = t & Br.JUMP_TABLE;
  if (a === 0)
    return i !== 0 && n === i ? r : -1;
  if (i) {
    const s = n - i;
    return s < 0 || s >= a ? -1 : e[r + s] - 1;
  }
  let o = r, u = o + a - 1;
  for (; o <= u; ) {
    const s = o + u >>> 1, c = e[s];
    if (c < n)
      o = s + 1;
    else if (c > n)
      u = s - 1;
    else
      return e[s + a];
  }
  return -1;
}
var K;
(function(e) {
  e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(K || (K = {}));
var ln;
(function(e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(ln || (ln = {}));
var Nt;
(function(e) {
  e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})(Nt || (Nt = {}));
var L;
(function(e) {
  e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(L || (L = {}));
var d;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP";
})(d || (d = {}));
const qw = /* @__PURE__ */ new Map([
  [L.A, d.A],
  [L.ADDRESS, d.ADDRESS],
  [L.ANNOTATION_XML, d.ANNOTATION_XML],
  [L.APPLET, d.APPLET],
  [L.AREA, d.AREA],
  [L.ARTICLE, d.ARTICLE],
  [L.ASIDE, d.ASIDE],
  [L.B, d.B],
  [L.BASE, d.BASE],
  [L.BASEFONT, d.BASEFONT],
  [L.BGSOUND, d.BGSOUND],
  [L.BIG, d.BIG],
  [L.BLOCKQUOTE, d.BLOCKQUOTE],
  [L.BODY, d.BODY],
  [L.BR, d.BR],
  [L.BUTTON, d.BUTTON],
  [L.CAPTION, d.CAPTION],
  [L.CENTER, d.CENTER],
  [L.CODE, d.CODE],
  [L.COL, d.COL],
  [L.COLGROUP, d.COLGROUP],
  [L.DD, d.DD],
  [L.DESC, d.DESC],
  [L.DETAILS, d.DETAILS],
  [L.DIALOG, d.DIALOG],
  [L.DIR, d.DIR],
  [L.DIV, d.DIV],
  [L.DL, d.DL],
  [L.DT, d.DT],
  [L.EM, d.EM],
  [L.EMBED, d.EMBED],
  [L.FIELDSET, d.FIELDSET],
  [L.FIGCAPTION, d.FIGCAPTION],
  [L.FIGURE, d.FIGURE],
  [L.FONT, d.FONT],
  [L.FOOTER, d.FOOTER],
  [L.FOREIGN_OBJECT, d.FOREIGN_OBJECT],
  [L.FORM, d.FORM],
  [L.FRAME, d.FRAME],
  [L.FRAMESET, d.FRAMESET],
  [L.H1, d.H1],
  [L.H2, d.H2],
  [L.H3, d.H3],
  [L.H4, d.H4],
  [L.H5, d.H5],
  [L.H6, d.H6],
  [L.HEAD, d.HEAD],
  [L.HEADER, d.HEADER],
  [L.HGROUP, d.HGROUP],
  [L.HR, d.HR],
  [L.HTML, d.HTML],
  [L.I, d.I],
  [L.IMG, d.IMG],
  [L.IMAGE, d.IMAGE],
  [L.INPUT, d.INPUT],
  [L.IFRAME, d.IFRAME],
  [L.KEYGEN, d.KEYGEN],
  [L.LABEL, d.LABEL],
  [L.LI, d.LI],
  [L.LINK, d.LINK],
  [L.LISTING, d.LISTING],
  [L.MAIN, d.MAIN],
  [L.MALIGNMARK, d.MALIGNMARK],
  [L.MARQUEE, d.MARQUEE],
  [L.MATH, d.MATH],
  [L.MENU, d.MENU],
  [L.META, d.META],
  [L.MGLYPH, d.MGLYPH],
  [L.MI, d.MI],
  [L.MO, d.MO],
  [L.MN, d.MN],
  [L.MS, d.MS],
  [L.MTEXT, d.MTEXT],
  [L.NAV, d.NAV],
  [L.NOBR, d.NOBR],
  [L.NOFRAMES, d.NOFRAMES],
  [L.NOEMBED, d.NOEMBED],
  [L.NOSCRIPT, d.NOSCRIPT],
  [L.OBJECT, d.OBJECT],
  [L.OL, d.OL],
  [L.OPTGROUP, d.OPTGROUP],
  [L.OPTION, d.OPTION],
  [L.P, d.P],
  [L.PARAM, d.PARAM],
  [L.PLAINTEXT, d.PLAINTEXT],
  [L.PRE, d.PRE],
  [L.RB, d.RB],
  [L.RP, d.RP],
  [L.RT, d.RT],
  [L.RTC, d.RTC],
  [L.RUBY, d.RUBY],
  [L.S, d.S],
  [L.SCRIPT, d.SCRIPT],
  [L.SEARCH, d.SEARCH],
  [L.SECTION, d.SECTION],
  [L.SELECT, d.SELECT],
  [L.SOURCE, d.SOURCE],
  [L.SMALL, d.SMALL],
  [L.SPAN, d.SPAN],
  [L.STRIKE, d.STRIKE],
  [L.STRONG, d.STRONG],
  [L.STYLE, d.STYLE],
  [L.SUB, d.SUB],
  [L.SUMMARY, d.SUMMARY],
  [L.SUP, d.SUP],
  [L.TABLE, d.TABLE],
  [L.TBODY, d.TBODY],
  [L.TEMPLATE, d.TEMPLATE],
  [L.TEXTAREA, d.TEXTAREA],
  [L.TFOOT, d.TFOOT],
  [L.TD, d.TD],
  [L.TH, d.TH],
  [L.THEAD, d.THEAD],
  [L.TITLE, d.TITLE],
  [L.TR, d.TR],
  [L.TRACK, d.TRACK],
  [L.TT, d.TT],
  [L.U, d.U],
  [L.UL, d.UL],
  [L.SVG, d.SVG],
  [L.VAR, d.VAR],
  [L.WBR, d.WBR],
  [L.XMP, d.XMP]
]);
function ku(e) {
  var t;
  return (t = qw.get(e)) !== null && t !== void 0 ? t : d.UNKNOWN;
}
const V = d, Ww = {
  [K.HTML]: /* @__PURE__ */ new Set([
    V.ADDRESS,
    V.APPLET,
    V.AREA,
    V.ARTICLE,
    V.ASIDE,
    V.BASE,
    V.BASEFONT,
    V.BGSOUND,
    V.BLOCKQUOTE,
    V.BODY,
    V.BR,
    V.BUTTON,
    V.CAPTION,
    V.CENTER,
    V.COL,
    V.COLGROUP,
    V.DD,
    V.DETAILS,
    V.DIR,
    V.DIV,
    V.DL,
    V.DT,
    V.EMBED,
    V.FIELDSET,
    V.FIGCAPTION,
    V.FIGURE,
    V.FOOTER,
    V.FORM,
    V.FRAME,
    V.FRAMESET,
    V.H1,
    V.H2,
    V.H3,
    V.H4,
    V.H5,
    V.H6,
    V.HEAD,
    V.HEADER,
    V.HGROUP,
    V.HR,
    V.HTML,
    V.IFRAME,
    V.IMG,
    V.INPUT,
    V.LI,
    V.LINK,
    V.LISTING,
    V.MAIN,
    V.MARQUEE,
    V.MENU,
    V.META,
    V.NAV,
    V.NOEMBED,
    V.NOFRAMES,
    V.NOSCRIPT,
    V.OBJECT,
    V.OL,
    V.P,
    V.PARAM,
    V.PLAINTEXT,
    V.PRE,
    V.SCRIPT,
    V.SECTION,
    V.SELECT,
    V.SOURCE,
    V.STYLE,
    V.SUMMARY,
    V.TABLE,
    V.TBODY,
    V.TD,
    V.TEMPLATE,
    V.TEXTAREA,
    V.TFOOT,
    V.TH,
    V.THEAD,
    V.TITLE,
    V.TR,
    V.TRACK,
    V.UL,
    V.WBR,
    V.XMP
  ]),
  [K.MATHML]: /* @__PURE__ */ new Set([V.MI, V.MO, V.MN, V.MS, V.MTEXT, V.ANNOTATION_XML]),
  [K.SVG]: /* @__PURE__ */ new Set([V.TITLE, V.FOREIGN_OBJECT, V.DESC]),
  [K.XLINK]: /* @__PURE__ */ new Set(),
  [K.XML]: /* @__PURE__ */ new Set(),
  [K.XMLNS]: /* @__PURE__ */ new Set()
}, Vd = /* @__PURE__ */ new Set([V.H1, V.H2, V.H3, V.H4, V.H5, V.H6]);
L.STYLE, L.SCRIPT, L.XMP, L.IFRAME, L.NOEMBED, L.NOFRAMES, L.PLAINTEXT;
var x;
(function(e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
})(x || (x = {}));
const bt = {
  DATA: x.DATA,
  RCDATA: x.RCDATA,
  RAWTEXT: x.RAWTEXT,
  SCRIPT_DATA: x.SCRIPT_DATA,
  PLAINTEXT: x.PLAINTEXT,
  CDATA_SECTION: x.CDATA_SECTION
};
function Yw(e) {
  return e >= S.DIGIT_0 && e <= S.DIGIT_9;
}
function Ya(e) {
  return e >= S.LATIN_CAPITAL_A && e <= S.LATIN_CAPITAL_Z;
}
function zw(e) {
  return e >= S.LATIN_SMALL_A && e <= S.LATIN_SMALL_Z;
}
function Rr(e) {
  return zw(e) || Ya(e);
}
function sm(e) {
  return Rr(e) || Yw(e);
}
function io(e) {
  return e + 32;
}
function u_(e) {
  return e === S.SPACE || e === S.LINE_FEED || e === S.TABULATION || e === S.FORM_FEED;
}
function cm(e) {
  return u_(e) || e === S.SOLIDUS || e === S.GREATER_THAN_SIGN;
}
function Gw(e) {
  return e === S.NULL ? U.nullCharacterReference : e > 1114111 ? U.characterReferenceOutsideUnicodeRange : n_(e) ? U.surrogateCharacterReference : i_(e) ? U.noncharacterCharacterReference : a_(e) || e === S.CARRIAGE_RETURN ? U.controlCharacterReference : null;
}
class Kw {
  constructor(t, r) {
    this.options = t, this.handler = r, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = x.DATA, this.returnState = x.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new Dw(r), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new Uw(Mw, (n, a) => {
      this.preprocessor.pos = this.entityStartPos + a - 1, this._flushCodePointConsumedAsCharacterReference(n);
    }, r.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(U.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (n) => {
        this._err(U.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + n);
      },
      validateNumericCharacterReference: (n) => {
        const a = Gw(n);
        a && this._err(a, 1);
      }
    } : void 0);
  }
  //Errors
  _err(t, r = 0) {
    var n, a;
    (a = (n = this.handler).onParseError) === null || a === void 0 || a.call(n, this.preprocessor.getError(t, r));
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
  write(t, r, n) {
    this.active = !0, this.preprocessor.write(t, r), this._runParsingLoop(), this.paused || n?.();
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
    for (let r = 0; r < t; r++)
      this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(t, r) {
    return this.preprocessor.startsWith(t, r) ? (this._advanceBy(t.length - 1), !0) : !1;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: be.START_TAG,
      tagName: "",
      tagID: d.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: be.END_TAG,
      tagName: "",
      tagID: d.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(t) {
    this.currentToken = {
      type: be.COMMENT,
      data: "",
      location: this.getCurrentLocation(t)
    };
  }
  _createDoctypeToken(t) {
    this.currentToken = {
      type: be.DOCTYPE,
      name: t,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(t, r) {
    this.currentCharacterToken = {
      type: t,
      chars: r,
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
    var t, r;
    const n = this.currentToken;
    if (o_(n, this.currentAttr.name) === null) {
      if (n.attrs.push(this.currentAttr), n.location && this.currentLocation) {
        const a = (t = (r = n.location).attrs) !== null && t !== void 0 ? t : r.attrs = /* @__PURE__ */ Object.create(null);
        a[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(U.duplicateAttribute);
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
    this.prepareToken(t), t.tagID = ku(t.tagName), t.type === be.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(U.endTagWithAttributes), t.selfClosing && this._err(U.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
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
        case be.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case be.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case be.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const t = this.getCurrentLocation(0);
    t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({ type: be.EOF, location: t }), this.active = !1;
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
  _appendCharToCurrentCharacterToken(t, r) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type === t) {
        this.currentCharacterToken.chars += r;
        return;
      } else
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
    this._createCharacterToken(t, r);
  }
  _emitCodePoint(t) {
    const r = u_(t) ? be.WHITESPACE_CHARACTER : t === S.NULL ? be.NULL_CHARACTER : be.CHARACTER;
    this._appendCharToCurrentCharacterToken(r, String.fromCodePoint(t));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(t) {
    this._appendCharToCurrentCharacterToken(be.CHARACTER, t);
  }
  // Character reference helpers
  _startCharacterReference() {
    this.returnState = this.state, this.state = x.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? dr.Attribute : dr.Legacy);
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === x.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === x.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === x.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(t) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(t) : this._emitCodePoint(t);
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(t) {
    switch (this.state) {
      case x.DATA: {
        this._stateData(t);
        break;
      }
      case x.RCDATA: {
        this._stateRcdata(t);
        break;
      }
      case x.RAWTEXT: {
        this._stateRawtext(t);
        break;
      }
      case x.SCRIPT_DATA: {
        this._stateScriptData(t);
        break;
      }
      case x.PLAINTEXT: {
        this._statePlaintext(t);
        break;
      }
      case x.TAG_OPEN: {
        this._stateTagOpen(t);
        break;
      }
      case x.END_TAG_OPEN: {
        this._stateEndTagOpen(t);
        break;
      }
      case x.TAG_NAME: {
        this._stateTagName(t);
        break;
      }
      case x.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(t);
        break;
      }
      case x.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(t);
        break;
      }
      case x.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(t);
        break;
      }
      case x.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(t);
        break;
      }
      case x.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(t);
        break;
      }
      case x.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(t);
        break;
      }
      case x.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(t);
        break;
      }
      case x.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(t);
        break;
      }
      case x.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(t);
        break;
      }
      case x.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(t);
        break;
      }
      case x.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(t);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(t);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(t);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(t);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(t);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(t);
        break;
      }
      case x.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(t);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(t);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(t);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(t);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(t);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(t);
        break;
      }
      case x.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(t);
        break;
      }
      case x.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(t);
        break;
      }
      case x.ATTRIBUTE_NAME: {
        this._stateAttributeName(t);
        break;
      }
      case x.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(t);
        break;
      }
      case x.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(t);
        break;
      }
      case x.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(t);
        break;
      }
      case x.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(t);
        break;
      }
      case x.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(t);
        break;
      }
      case x.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(t);
        break;
      }
      case x.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(t);
        break;
      }
      case x.BOGUS_COMMENT: {
        this._stateBogusComment(t);
        break;
      }
      case x.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(t);
        break;
      }
      case x.COMMENT_START: {
        this._stateCommentStart(t);
        break;
      }
      case x.COMMENT_START_DASH: {
        this._stateCommentStartDash(t);
        break;
      }
      case x.COMMENT: {
        this._stateComment(t);
        break;
      }
      case x.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(t);
        break;
      }
      case x.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(t);
        break;
      }
      case x.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(t);
        break;
      }
      case x.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(t);
        break;
      }
      case x.COMMENT_END_DASH: {
        this._stateCommentEndDash(t);
        break;
      }
      case x.COMMENT_END: {
        this._stateCommentEnd(t);
        break;
      }
      case x.COMMENT_END_BANG: {
        this._stateCommentEndBang(t);
        break;
      }
      case x.DOCTYPE: {
        this._stateDoctype(t);
        break;
      }
      case x.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(t);
        break;
      }
      case x.DOCTYPE_NAME: {
        this._stateDoctypeName(t);
        break;
      }
      case x.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(t);
        break;
      }
      case x.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(t);
        break;
      }
      case x.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(t);
        break;
      }
      case x.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(t);
        break;
      }
      case x.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(t);
        break;
      }
      case x.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(t);
        break;
      }
      case x.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
        break;
      }
      case x.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(t);
        break;
      }
      case x.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(t);
        break;
      }
      case x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(t);
        break;
      }
      case x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(t);
        break;
      }
      case x.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(t);
        break;
      }
      case x.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(t);
        break;
      }
      case x.CDATA_SECTION: {
        this._stateCdataSection(t);
        break;
      }
      case x.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(t);
        break;
      }
      case x.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(t);
        break;
      }
      case x.CHARACTER_REFERENCE: {
        this._stateCharacterReference();
        break;
      }
      case x.AMBIGUOUS_AMPERSAND: {
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
      case S.LESS_THAN_SIGN: {
        this.state = x.TAG_OPEN;
        break;
      }
      case S.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this._emitCodePoint(t);
        break;
      }
      case S.EOF: {
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
      case S.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case S.LESS_THAN_SIGN: {
        this.state = x.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this._emitChars(Me);
        break;
      }
      case S.EOF: {
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
      case S.LESS_THAN_SIGN: {
        this.state = x.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this._emitChars(Me);
        break;
      }
      case S.EOF: {
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
      case S.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this._emitChars(Me);
        break;
      }
      case S.EOF: {
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
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this._emitChars(Me);
        break;
      }
      case S.EOF: {
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
    if (Rr(t))
      this._createStartTagToken(), this.state = x.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case S.EXCLAMATION_MARK: {
          this.state = x.MARKUP_DECLARATION_OPEN;
          break;
        }
        case S.SOLIDUS: {
          this.state = x.END_TAG_OPEN;
          break;
        }
        case S.QUESTION_MARK: {
          this._err(U.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = x.BOGUS_COMMENT, this._stateBogusComment(t);
          break;
        }
        case S.EOF: {
          this._err(U.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(U.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = x.DATA, this._stateData(t);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(t) {
    if (Rr(t))
      this._createEndTagToken(), this.state = x.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case S.GREATER_THAN_SIGN: {
          this._err(U.missingEndTagName), this.state = x.DATA;
          break;
        }
        case S.EOF: {
          this._err(U.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(U.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = x.BOGUS_COMMENT, this._stateBogusComment(t);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(t) {
    const r = this.currentToken;
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED: {
        this.state = x.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case S.SOLIDUS: {
        this.state = x.SELF_CLOSING_START_TAG;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), r.tagName += Me;
        break;
      }
      case S.EOF: {
        this._err(U.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        r.tagName += String.fromCodePoint(Ya(t) ? io(t) : t);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(t) {
    t === S.SOLIDUS ? this.state = x.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = x.RCDATA, this._stateRcdata(t));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(t) {
    Rr(t) ? (this.state = x.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = x.RCDATA, this._stateRcdata(t));
  }
  handleSpecialEndTag(t) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    const r = this.currentToken;
    switch (r.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = x.BEFORE_ATTRIBUTE_NAME, !1;
      case S.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = x.SELF_CLOSING_START_TAG, !1;
      case S.GREATER_THAN_SIGN:
        return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = x.DATA, !1;
      default:
        return !this._ensureHibernation();
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = x.RCDATA, this._stateRcdata(t));
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(t) {
    t === S.SOLIDUS ? this.state = x.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = x.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(t) {
    Rr(t) ? (this.state = x.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = x.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = x.RAWTEXT, this._stateRawtext(t));
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(t) {
    switch (t) {
      case S.SOLIDUS: {
        this.state = x.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case S.EXCLAMATION_MARK: {
        this.state = x.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"), this.state = x.SCRIPT_DATA, this._stateScriptData(t);
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(t) {
    Rr(t) ? (this.state = x.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = x.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = x.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(t) {
    t === S.HYPHEN_MINUS ? (this.state = x.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = x.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(t) {
    t === S.HYPHEN_MINUS ? (this.state = x.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = x.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(t) {
    switch (t) {
      case S.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case S.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this._emitChars(Me);
        break;
      }
      case S.EOF: {
        this._err(U.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
      case S.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case S.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_ESCAPED, this._emitChars(Me);
        break;
      }
      case S.EOF: {
        this._err(U.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = x.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(t) {
    switch (t) {
      case S.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case S.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this.state = x.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_ESCAPED, this._emitChars(Me);
        break;
      }
      case S.EOF: {
        this._err(U.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = x.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(t) {
    t === S.SOLIDUS ? this.state = x.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : Rr(t) ? (this._emitChars("<"), this.state = x.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(t) {
    Rr(t) ? (this.state = x.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(mt.SCRIPT, !1) && cm(this.preprocessor.peek(mt.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let r = 0; r < mt.SCRIPT.length; r++)
        this._emitCodePoint(this._consume());
      this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else this._ensureHibernation() || (this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(t) {
    switch (t) {
      case S.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case S.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this._emitChars(Me);
        break;
      }
      case S.EOF: {
        this._err(U.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
      case S.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case S.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(Me);
        break;
      }
      case S.EOF: {
        this._err(U.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(t) {
    switch (t) {
      case S.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case S.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this.state = x.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(Me);
        break;
      }
      case S.EOF: {
        this._err(U.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(t) {
    t === S.SOLIDUS ? (this.state = x.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(t) {
    if (this.preprocessor.startsWith(mt.SCRIPT, !1) && cm(this.preprocessor.peek(mt.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let r = 0; r < mt.SCRIPT.length; r++)
        this._emitCodePoint(this._consume());
      this.state = x.SCRIPT_DATA_ESCAPED;
    } else this._ensureHibernation() || (this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(t) {
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED:
        break;
      case S.SOLIDUS:
      case S.GREATER_THAN_SIGN:
      case S.EOF: {
        this.state = x.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case S.EQUALS_SIGN: {
        this._err(U.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = x.ATTRIBUTE_NAME;
        break;
      }
      default:
        this._createAttr(""), this.state = x.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(t) {
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED:
      case S.SOLIDUS:
      case S.GREATER_THAN_SIGN:
      case S.EOF: {
        this._leaveAttrName(), this.state = x.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case S.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = x.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case S.QUOTATION_MARK:
      case S.APOSTROPHE:
      case S.LESS_THAN_SIGN: {
        this._err(U.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this.currentAttr.name += Me;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(Ya(t) ? io(t) : t);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(t) {
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED:
        break;
      case S.SOLIDUS: {
        this.state = x.SELF_CLOSING_START_TAG;
        break;
      }
      case S.EQUALS_SIGN: {
        this.state = x.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case S.EOF: {
        this._err(U.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""), this.state = x.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(t) {
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED:
        break;
      case S.QUOTATION_MARK: {
        this.state = x.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case S.APOSTROPHE: {
        this.state = x.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.missingAttributeValue), this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      default:
        this.state = x.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(t);
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(t) {
    switch (t) {
      case S.QUOTATION_MARK: {
        this.state = x.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case S.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this.currentAttr.value += Me;
        break;
      }
      case S.EOF: {
        this._err(U.eofInTag), this._emitEOFToken();
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
      case S.APOSTROPHE: {
        this.state = x.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case S.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this.currentAttr.value += Me;
        break;
      }
      case S.EOF: {
        this._err(U.eofInTag), this._emitEOFToken();
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
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED: {
        this._leaveAttrValue(), this.state = x.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case S.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), this.currentAttr.value += Me;
        break;
      }
      case S.QUOTATION_MARK:
      case S.APOSTROPHE:
      case S.LESS_THAN_SIGN:
      case S.EQUALS_SIGN:
      case S.GRAVE_ACCENT: {
        this._err(U.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
        break;
      }
      case S.EOF: {
        this._err(U.eofInTag), this._emitEOFToken();
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
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED: {
        this._leaveAttrValue(), this.state = x.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case S.SOLIDUS: {
        this._leaveAttrValue(), this.state = x.SELF_CLOSING_START_TAG;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case S.EOF: {
        this._err(U.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(U.missingWhitespaceBetweenAttributes), this.state = x.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(t) {
    switch (t) {
      case S.GREATER_THAN_SIGN: {
        const r = this.currentToken;
        r.selfClosing = !0, this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case S.EOF: {
        this._err(U.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(U.unexpectedSolidusInTag), this.state = x.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(t) {
    const r = this.currentToken;
    switch (t) {
      case S.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentComment(r);
        break;
      }
      case S.EOF: {
        this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), r.data += Me;
        break;
      }
      default:
        r.data += String.fromCodePoint(t);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(t) {
    this._consumeSequenceIfMatch(mt.DASH_DASH, !0) ? (this._createCommentToken(mt.DASH_DASH.length + 1), this.state = x.COMMENT_START) : this._consumeSequenceIfMatch(mt.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(mt.DOCTYPE.length + 1), this.state = x.DOCTYPE) : this._consumeSequenceIfMatch(mt.CDATA_START, !0) ? this.inForeignNode ? this.state = x.CDATA_SECTION : (this._err(U.cdataInHtmlContent), this._createCommentToken(mt.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = x.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(U.incorrectlyOpenedComment), this._createCommentToken(2), this.state = x.BOGUS_COMMENT, this._stateBogusComment(t));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(t) {
    switch (t) {
      case S.HYPHEN_MINUS: {
        this.state = x.COMMENT_START_DASH;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.abruptClosingOfEmptyComment), this.state = x.DATA;
        const r = this.currentToken;
        this.emitCurrentComment(r);
        break;
      }
      default:
        this.state = x.COMMENT, this._stateComment(t);
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(t) {
    const r = this.currentToken;
    switch (t) {
      case S.HYPHEN_MINUS: {
        this.state = x.COMMENT_END;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.abruptClosingOfEmptyComment), this.state = x.DATA, this.emitCurrentComment(r);
        break;
      }
      case S.EOF: {
        this._err(U.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "-", this.state = x.COMMENT, this._stateComment(t);
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(t) {
    const r = this.currentToken;
    switch (t) {
      case S.HYPHEN_MINUS: {
        this.state = x.COMMENT_END_DASH;
        break;
      }
      case S.LESS_THAN_SIGN: {
        r.data += "<", this.state = x.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), r.data += Me;
        break;
      }
      case S.EOF: {
        this._err(U.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += String.fromCodePoint(t);
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(t) {
    const r = this.currentToken;
    switch (t) {
      case S.EXCLAMATION_MARK: {
        r.data += "!", this.state = x.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case S.LESS_THAN_SIGN: {
        r.data += "<";
        break;
      }
      default:
        this.state = x.COMMENT, this._stateComment(t);
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(t) {
    t === S.HYPHEN_MINUS ? this.state = x.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = x.COMMENT, this._stateComment(t));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(t) {
    t === S.HYPHEN_MINUS ? this.state = x.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = x.COMMENT_END_DASH, this._stateCommentEndDash(t));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(t) {
    t !== S.GREATER_THAN_SIGN && t !== S.EOF && this._err(U.nestedComment), this.state = x.COMMENT_END, this._stateCommentEnd(t);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(t) {
    const r = this.currentToken;
    switch (t) {
      case S.HYPHEN_MINUS: {
        this.state = x.COMMENT_END;
        break;
      }
      case S.EOF: {
        this._err(U.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "-", this.state = x.COMMENT, this._stateComment(t);
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(t) {
    const r = this.currentToken;
    switch (t) {
      case S.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentComment(r);
        break;
      }
      case S.EXCLAMATION_MARK: {
        this.state = x.COMMENT_END_BANG;
        break;
      }
      case S.HYPHEN_MINUS: {
        r.data += "-";
        break;
      }
      case S.EOF: {
        this._err(U.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "--", this.state = x.COMMENT, this._stateComment(t);
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(t) {
    const r = this.currentToken;
    switch (t) {
      case S.HYPHEN_MINUS: {
        r.data += "--!", this.state = x.COMMENT_END_DASH;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.incorrectlyClosedComment), this.state = x.DATA, this.emitCurrentComment(r);
        break;
      }
      case S.EOF: {
        this._err(U.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      default:
        r.data += "--!", this.state = x.COMMENT, this._stateComment(t);
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(t) {
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED: {
        this.state = x.BEFORE_DOCTYPE_NAME;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this.state = x.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), this._createDoctypeToken(null);
        const r = this.currentToken;
        r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(U.missingWhitespaceBeforeDoctypeName), this.state = x.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(t) {
    if (Ya(t))
      this._createDoctypeToken(String.fromCharCode(io(t))), this.state = x.DOCTYPE_NAME;
    else
      switch (t) {
        case S.SPACE:
        case S.LINE_FEED:
        case S.TABULATION:
        case S.FORM_FEED:
          break;
        case S.NULL: {
          this._err(U.unexpectedNullCharacter), this._createDoctypeToken(Me), this.state = x.DOCTYPE_NAME;
          break;
        }
        case S.GREATER_THAN_SIGN: {
          this._err(U.missingDoctypeName), this._createDoctypeToken(null);
          const r = this.currentToken;
          r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = x.DATA;
          break;
        }
        case S.EOF: {
          this._err(U.eofInDoctype), this._createDoctypeToken(null);
          const r = this.currentToken;
          r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(t)), this.state = x.DOCTYPE_NAME;
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(t) {
    const r = this.currentToken;
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED: {
        this.state = x.AFTER_DOCTYPE_NAME;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), r.name += Me;
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.name += String.fromCodePoint(Ya(t) ? io(t) : t);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(t) {
    const r = this.currentToken;
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED:
        break;
      case S.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(mt.PUBLIC, !1) ? this.state = x.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(mt.SYSTEM, !1) ? this.state = x.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(U.invalidCharacterSequenceAfterDoctypeName), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(t) {
    const r = this.currentToken;
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED: {
        this.state = x.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case S.QUOTATION_MARK: {
        this._err(U.missingWhitespaceAfterDoctypePublicKeyword), r.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case S.APOSTROPHE: {
        this._err(U.missingWhitespaceAfterDoctypePublicKeyword), r.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.missingDoctypePublicIdentifier), r.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(U.missingQuoteBeforeDoctypePublicIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED:
        break;
      case S.QUOTATION_MARK: {
        r.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case S.APOSTROPHE: {
        r.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.missingDoctypePublicIdentifier), r.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(U.missingQuoteBeforeDoctypePublicIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case S.QUOTATION_MARK: {
        this.state = x.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), r.publicId += Me;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.abruptDoctypePublicIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.publicId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case S.APOSTROPHE: {
        this.state = x.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), r.publicId += Me;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.abruptDoctypePublicIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.publicId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED: {
        this.state = x.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case S.QUOTATION_MARK: {
        this._err(U.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case S.APOSTROPHE: {
        this._err(U.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(U.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
    const r = this.currentToken;
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED:
        break;
      case S.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case S.QUOTATION_MARK: {
        r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case S.APOSTROPHE: {
        r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(U.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(t) {
    const r = this.currentToken;
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED: {
        this.state = x.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case S.QUOTATION_MARK: {
        this._err(U.missingWhitespaceAfterDoctypeSystemKeyword), r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case S.APOSTROPHE: {
        this._err(U.missingWhitespaceAfterDoctypeSystemKeyword), r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.missingDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(U.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED:
        break;
      case S.QUOTATION_MARK: {
        r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case S.APOSTROPHE: {
        r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.missingDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(U.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case S.QUOTATION_MARK: {
        this.state = x.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), r.systemId += Me;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.abruptDoctypeSystemIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.systemId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case S.APOSTROPHE: {
        this.state = x.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter), r.systemId += Me;
        break;
      }
      case S.GREATER_THAN_SIGN: {
        this._err(U.abruptDoctypeSystemIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.systemId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case S.SPACE:
      case S.LINE_FEED:
      case S.TABULATION:
      case S.FORM_FEED:
        break;
      case S.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case S.EOF: {
        this._err(U.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(U.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(t) {
    const r = this.currentToken;
    switch (t) {
      case S.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case S.NULL: {
        this._err(U.unexpectedNullCharacter);
        break;
      }
      case S.EOF: {
        this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(t) {
    switch (t) {
      case S.RIGHT_SQUARE_BRACKET: {
        this.state = x.CDATA_SECTION_BRACKET;
        break;
      }
      case S.EOF: {
        this._err(U.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(t) {
    t === S.RIGHT_SQUARE_BRACKET ? this.state = x.CDATA_SECTION_END : (this._emitChars("]"), this.state = x.CDATA_SECTION, this._stateCdataSection(t));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(t) {
    switch (t) {
      case S.GREATER_THAN_SIGN: {
        this.state = x.DATA;
        break;
      }
      case S.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"), this.state = x.CDATA_SECTION, this._stateCdataSection(t);
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
    t === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(S.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && sm(this.preprocessor.peek(1)) ? x.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    sm(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === S.SEMICOLON && this._err(U.unknownNamedCharacterReference), this.state = this.returnState, this._callState(t));
  }
}
const s_ = /* @__PURE__ */ new Set([d.DD, d.DT, d.LI, d.OPTGROUP, d.OPTION, d.P, d.RB, d.RP, d.RT, d.RTC]), lm = /* @__PURE__ */ new Set([
  ...s_,
  d.CAPTION,
  d.COLGROUP,
  d.TBODY,
  d.TD,
  d.TFOOT,
  d.TH,
  d.THEAD,
  d.TR
]), Do = /* @__PURE__ */ new Set([
  d.APPLET,
  d.CAPTION,
  d.HTML,
  d.MARQUEE,
  d.OBJECT,
  d.TABLE,
  d.TD,
  d.TEMPLATE,
  d.TH
]), Vw = /* @__PURE__ */ new Set([...Do, d.OL, d.UL]), Xw = /* @__PURE__ */ new Set([...Do, d.BUTTON]), fm = /* @__PURE__ */ new Set([d.ANNOTATION_XML, d.MI, d.MN, d.MO, d.MS, d.MTEXT]), dm = /* @__PURE__ */ new Set([d.DESC, d.FOREIGN_OBJECT, d.TITLE]), Qw = /* @__PURE__ */ new Set([d.TR, d.TEMPLATE, d.HTML]), Zw = /* @__PURE__ */ new Set([d.TBODY, d.TFOOT, d.THEAD, d.TEMPLATE, d.HTML]), Jw = /* @__PURE__ */ new Set([d.TABLE, d.TEMPLATE, d.HTML]), eP = /* @__PURE__ */ new Set([d.TD, d.TH]);
class tP {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(t, r, n) {
    this.treeAdapter = r, this.handler = n, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = d.UNKNOWN, this.current = t;
  }
  //Index of element
  _indexOf(t) {
    return this.items.lastIndexOf(t, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === d.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === K.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(t, r) {
    this.stackTop++, this.items[this.stackTop] = t, this.current = t, this.tagIDs[this.stackTop] = r, this.currentTagId = r, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(t, r, !0);
  }
  pop() {
    const t = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !0);
  }
  replace(t, r) {
    const n = this._indexOf(t);
    this.items[n] = r, n === this.stackTop && (this.current = r);
  }
  insertAfter(t, r, n) {
    const a = this._indexOf(t) + 1;
    this.items.splice(a, 0, r), this.tagIDs.splice(a, 0, n), this.stackTop++, a === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, a === this.stackTop);
  }
  popUntilTagNamePopped(t) {
    let r = this.stackTop + 1;
    do
      r = this.tagIDs.lastIndexOf(t, r - 1);
    while (r > 0 && this.treeAdapter.getNamespaceURI(this.items[r]) !== K.HTML);
    this.shortenToLength(Math.max(r, 0));
  }
  shortenToLength(t) {
    for (; this.stackTop >= t; ) {
      const r = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(r, this.stackTop < t);
    }
  }
  popUntilElementPopped(t) {
    const r = this._indexOf(t);
    this.shortenToLength(Math.max(r, 0));
  }
  popUntilPopped(t, r) {
    const n = this._indexOfTagNames(t, r);
    this.shortenToLength(Math.max(n, 0));
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(Vd, K.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(eP, K.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(t, r) {
    for (let n = this.stackTop; n >= 0; n--)
      if (t.has(this.tagIDs[n]) && this.treeAdapter.getNamespaceURI(this.items[n]) === r)
        return n;
    return -1;
  }
  clearBackTo(t, r) {
    const n = this._indexOfTagNames(t, r);
    this.shortenToLength(n + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(Jw, K.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(Zw, K.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(Qw, K.HTML);
  }
  remove(t) {
    const r = this._indexOf(t);
    r >= 0 && (r === this.stackTop ? this.pop() : (this.items.splice(r, 1), this.tagIDs.splice(r, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === d.BODY ? this.items[1] : null;
  }
  contains(t) {
    return this._indexOf(t) > -1;
  }
  getCommonAncestor(t) {
    const r = this._indexOf(t) - 1;
    return r >= 0 ? this.items[r] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === d.HTML;
  }
  //Element in scope
  hasInDynamicScope(t, r) {
    for (let n = this.stackTop; n >= 0; n--) {
      const a = this.tagIDs[n];
      switch (this.treeAdapter.getNamespaceURI(this.items[n])) {
        case K.HTML: {
          if (a === t)
            return !0;
          if (r.has(a))
            return !1;
          break;
        }
        case K.SVG: {
          if (dm.has(a))
            return !1;
          break;
        }
        case K.MATHML: {
          if (fm.has(a))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInScope(t) {
    return this.hasInDynamicScope(t, Do);
  }
  hasInListItemScope(t) {
    return this.hasInDynamicScope(t, Vw);
  }
  hasInButtonScope(t) {
    return this.hasInDynamicScope(t, Xw);
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t];
      switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
        case K.HTML: {
          if (Vd.has(r))
            return !0;
          if (Do.has(r))
            return !1;
          break;
        }
        case K.SVG: {
          if (dm.has(r))
            return !1;
          break;
        }
        case K.MATHML: {
          if (fm.has(r))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInTableScope(t) {
    for (let r = this.stackTop; r >= 0; r--)
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === K.HTML)
        switch (this.tagIDs[r]) {
          case t:
            return !0;
          case d.TABLE:
          case d.HTML:
            return !1;
        }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let t = this.stackTop; t >= 0; t--)
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === K.HTML)
        switch (this.tagIDs[t]) {
          case d.TBODY:
          case d.THEAD:
          case d.TFOOT:
            return !0;
          case d.TABLE:
          case d.HTML:
            return !1;
        }
    return !0;
  }
  hasInSelectScope(t) {
    for (let r = this.stackTop; r >= 0; r--)
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === K.HTML)
        switch (this.tagIDs[r]) {
          case t:
            return !0;
          case d.OPTION:
          case d.OPTGROUP:
            break;
          default:
            return !1;
        }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; this.currentTagId !== void 0 && s_.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; this.currentTagId !== void 0 && lm.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== void 0 && this.currentTagId !== t && lm.has(this.currentTagId); )
      this.pop();
  }
}
const Ds = 3;
var Zt;
(function(e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(Zt || (Zt = {}));
const hm = { type: Zt.Marker };
class rP {
  constructor(t) {
    this.treeAdapter = t, this.entries = [], this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(t, r) {
    const n = [], a = r.length, i = this.treeAdapter.getTagName(t), o = this.treeAdapter.getNamespaceURI(t);
    for (let u = 0; u < this.entries.length; u++) {
      const s = this.entries[u];
      if (s.type === Zt.Marker)
        break;
      const { element: c } = s;
      if (this.treeAdapter.getTagName(c) === i && this.treeAdapter.getNamespaceURI(c) === o) {
        const l = this.treeAdapter.getAttrList(c);
        l.length === a && n.push({ idx: u, attrs: l });
      }
    }
    return n;
  }
  _ensureNoahArkCondition(t) {
    if (this.entries.length < Ds)
      return;
    const r = this.treeAdapter.getAttrList(t), n = this._getNoahArkConditionCandidates(t, r);
    if (n.length < Ds)
      return;
    const a = new Map(r.map((o) => [o.name, o.value]));
    let i = 0;
    for (let o = 0; o < n.length; o++) {
      const u = n[o];
      u.attrs.every((s) => a.get(s.name) === s.value) && (i += 1, i >= Ds && this.entries.splice(u.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(hm);
  }
  pushElement(t, r) {
    this._ensureNoahArkCondition(t), this.entries.unshift({
      type: Zt.Element,
      element: t,
      token: r
    });
  }
  insertElementAfterBookmark(t, r) {
    const n = this.entries.indexOf(this.bookmark);
    this.entries.splice(n, 0, {
      type: Zt.Element,
      element: t,
      token: r
    });
  }
  removeEntry(t) {
    const r = this.entries.indexOf(t);
    r !== -1 && this.entries.splice(r, 1);
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    const t = this.entries.indexOf(hm);
    t === -1 ? this.entries.length = 0 : this.entries.splice(0, t + 1);
  }
  //Search
  getElementEntryInScopeWithTagName(t) {
    const r = this.entries.find((n) => n.type === Zt.Marker || this.treeAdapter.getTagName(n.element) === t);
    return r && r.type === Zt.Element ? r : null;
  }
  getElementEntry(t) {
    return this.entries.find((r) => r.type === Zt.Element && r.element === t);
  }
}
const Dr = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: Nt.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(e, t, r) {
    return {
      nodeName: e,
      tagName: e,
      attrs: r,
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
  insertBefore(e, t, r) {
    const n = e.childNodes.indexOf(r);
    e.childNodes.splice(n, 0, t), t.parentNode = e;
  },
  setTemplateContent(e, t) {
    e.content = t;
  },
  getTemplateContent(e) {
    return e.content;
  },
  setDocumentType(e, t, r, n) {
    const a = e.childNodes.find((i) => i.nodeName === "#documentType");
    if (a)
      a.name = t, a.publicId = r, a.systemId = n;
    else {
      const i = {
        nodeName: "#documentType",
        name: t,
        publicId: r,
        systemId: n,
        parentNode: null
      };
      Dr.appendChild(e, i);
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
      const r = e.childNodes[e.childNodes.length - 1];
      if (Dr.isTextNode(r)) {
        r.value += t;
        return;
      }
    }
    Dr.appendChild(e, Dr.createTextNode(t));
  },
  insertTextBefore(e, t, r) {
    const n = e.childNodes[e.childNodes.indexOf(r) - 1];
    n && Dr.isTextNode(n) ? n.value += t : Dr.insertBefore(e, Dr.createTextNode(t), r);
  },
  adoptAttributes(e, t) {
    const r = new Set(e.attrs.map((n) => n.name));
    for (let n = 0; n < t.length; n++)
      r.has(t[n].name) || e.attrs.push(t[n]);
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
}, c_ = "html", nP = "about:legacy-compat", aP = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", l_ = [
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
], iP = [
  ...l_,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], oP = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), f_ = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], uP = [
  ...f_,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function pm(e, t) {
  return t.some((r) => e.startsWith(r));
}
function sP(e) {
  return e.name === c_ && e.publicId === null && (e.systemId === null || e.systemId === nP);
}
function cP(e) {
  if (e.name !== c_)
    return Nt.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === aP)
    return Nt.QUIRKS;
  let { publicId: r } = e;
  if (r !== null) {
    if (r = r.toLowerCase(), oP.has(r))
      return Nt.QUIRKS;
    let n = t === null ? iP : l_;
    if (pm(r, n))
      return Nt.QUIRKS;
    if (n = t === null ? f_ : uP, pm(r, n))
      return Nt.LIMITED_QUIRKS;
  }
  return Nt.NO_QUIRKS;
}
const mm = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, lP = "definitionurl", fP = "definitionURL", dP = new Map([
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
].map((e) => [e.toLowerCase(), e])), hP = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: K.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: K.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: K.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: K.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: K.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: K.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: K.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: K.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: K.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: K.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: K.XMLNS }]
]), pP = new Map([
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
].map((e) => [e.toLowerCase(), e])), mP = /* @__PURE__ */ new Set([
  d.B,
  d.BIG,
  d.BLOCKQUOTE,
  d.BODY,
  d.BR,
  d.CENTER,
  d.CODE,
  d.DD,
  d.DIV,
  d.DL,
  d.DT,
  d.EM,
  d.EMBED,
  d.H1,
  d.H2,
  d.H3,
  d.H4,
  d.H5,
  d.H6,
  d.HEAD,
  d.HR,
  d.I,
  d.IMG,
  d.LI,
  d.LISTING,
  d.MENU,
  d.META,
  d.NOBR,
  d.OL,
  d.P,
  d.PRE,
  d.RUBY,
  d.S,
  d.SMALL,
  d.SPAN,
  d.STRONG,
  d.STRIKE,
  d.SUB,
  d.SUP,
  d.TABLE,
  d.TT,
  d.U,
  d.UL,
  d.VAR
]);
function yP(e) {
  const t = e.tagID;
  return t === d.FONT && e.attrs.some(({ name: n }) => n === ln.COLOR || n === ln.SIZE || n === ln.FACE) || mP.has(t);
}
function d_(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === lP) {
      e.attrs[t].name = fP;
      break;
    }
}
function h_(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = dP.get(e.attrs[t].name);
    r != null && (e.attrs[t].name = r);
  }
}
function wp(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = hP.get(e.attrs[t].name);
    r && (e.attrs[t].prefix = r.prefix, e.attrs[t].name = r.name, e.attrs[t].namespace = r.namespace);
  }
}
function bP(e) {
  const t = pP.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = ku(e.tagName));
}
function gP(e, t) {
  return t === K.MATHML && (e === d.MI || e === d.MO || e === d.MN || e === d.MS || e === d.MTEXT);
}
function vP(e, t, r) {
  if (t === K.MATHML && e === d.ANNOTATION_XML) {
    for (let n = 0; n < r.length; n++)
      if (r[n].name === ln.ENCODING) {
        const a = r[n].value.toLowerCase();
        return a === mm.TEXT_HTML || a === mm.APPLICATION_XML;
      }
  }
  return t === K.SVG && (e === d.FOREIGN_OBJECT || e === d.DESC || e === d.TITLE);
}
function EP(e, t, r, n) {
  return (!n || n === K.HTML) && vP(e, t, r) || (!n || n === K.MATHML) && gP(e, t);
}
const TP = "hidden", _P = 8, AP = 3;
var w;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(w || (w = {}));
const OP = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, p_ = /* @__PURE__ */ new Set([d.TABLE, d.TBODY, d.TFOOT, d.THEAD, d.TR]), ym = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: Dr,
  onParseError: null
};
class SP {
  constructor(t, r, n = null, a = null) {
    this.fragmentContext = n, this.scriptHandler = a, this.currentToken = null, this.stopped = !1, this.insertionMode = w.INITIAL, this.originalInsertionMode = w.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...ym,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = r ?? this.treeAdapter.createDocument(), this.tokenizer = new Kw(this.options, this), this.activeFormattingElements = new rP(this.treeAdapter), this.fragmentContextID = n ? ku(this.treeAdapter.getTagName(n)) : d.UNKNOWN, this._setContextModes(n ?? this.document, this.fragmentContextID), this.openElements = new tP(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, r) {
    const n = new this(r);
    return n.tokenizer.write(t, !0), n.document;
  }
  static getFragmentParser(t, r) {
    const n = {
      ...ym,
      ...r
    };
    t ?? (t = n.treeAdapter.createElement(L.TEMPLATE, K.HTML, []));
    const a = n.treeAdapter.createElement("documentmock", K.HTML, []), i = new this(n, a, t);
    return i.fragmentContextID === d.TEMPLATE && i.tmplInsertionModeStack.unshift(w.IN_TEMPLATE), i._initTokenizerForFragmentParsing(), i._insertFakeRootElement(), i._resetInsertionMode(), i._findFormInFragmentContext(), i;
  }
  getFragment() {
    const t = this.treeAdapter.getFirstChild(this.document), r = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(t, r), r;
  }
  //Errors
  /** @internal */
  _err(t, r, n) {
    var a;
    if (!this.onParseError)
      return;
    const i = (a = t.location) !== null && a !== void 0 ? a : OP, o = {
      code: r,
      startLine: i.startLine,
      startCol: i.startCol,
      startOffset: i.startOffset,
      endLine: n ? i.startLine : i.endLine,
      endCol: n ? i.startCol : i.endCol,
      endOffset: n ? i.startOffset : i.endOffset
    };
    this.onParseError(o);
  }
  //Stack events
  /** @internal */
  onItemPush(t, r, n) {
    var a, i;
    (i = (a = this.treeAdapter).onItemPush) === null || i === void 0 || i.call(a, t), n && this.openElements.stackTop > 0 && this._setContextModes(t, r);
  }
  /** @internal */
  onItemPop(t, r) {
    var n, a;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(t, this.currentToken), (a = (n = this.treeAdapter).onItemPop) === null || a === void 0 || a.call(n, t, this.openElements.current), r) {
      let i, o;
      this.openElements.stackTop === 0 && this.fragmentContext ? (i = this.fragmentContext, o = this.fragmentContextID) : { current: i, currentTagId: o } = this.openElements, this._setContextModes(i, o);
    }
  }
  _setContextModes(t, r) {
    const n = t === this.document || t && this.treeAdapter.getNamespaceURI(t) === K.HTML;
    this.currentNotInHTML = !n, this.tokenizer.inForeignNode = !n && t !== void 0 && r !== void 0 && !this._isIntegrationPoint(r, t);
  }
  /** @protected */
  _switchToTextParsing(t, r) {
    this._insertElement(t, K.HTML), this.tokenizer.state = r, this.originalInsertionMode = this.insertionMode, this.insertionMode = w.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = w.TEXT, this.originalInsertionMode = w.IN_BODY, this.tokenizer.state = bt.PLAINTEXT;
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
      if (this.treeAdapter.getTagName(t) === L.FORM) {
        this.formElement = t;
        break;
      }
      t = this.treeAdapter.getParentNode(t);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== K.HTML))
      switch (this.fragmentContextID) {
        case d.TITLE:
        case d.TEXTAREA: {
          this.tokenizer.state = bt.RCDATA;
          break;
        }
        case d.STYLE:
        case d.XMP:
        case d.IFRAME:
        case d.NOEMBED:
        case d.NOFRAMES:
        case d.NOSCRIPT: {
          this.tokenizer.state = bt.RAWTEXT;
          break;
        }
        case d.SCRIPT: {
          this.tokenizer.state = bt.SCRIPT_DATA;
          break;
        }
        case d.PLAINTEXT: {
          this.tokenizer.state = bt.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  /** @protected */
  _setDocumentType(t) {
    const r = t.name || "", n = t.publicId || "", a = t.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, r, n, a), t.location) {
      const o = this.treeAdapter.getChildNodes(this.document).find((u) => this.treeAdapter.isDocumentTypeNode(u));
      o && this.treeAdapter.setNodeSourceCodeLocation(o, t.location);
    }
  }
  /** @protected */
  _attachElementToTree(t, r) {
    if (this.options.sourceCodeLocationInfo) {
      const n = r && {
        ...r,
        startTag: r
      };
      this.treeAdapter.setNodeSourceCodeLocation(t, n);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(t);
    else {
      const n = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(n ?? this.document, t);
    }
  }
  /**
   * For self-closing tags. Add an element to the tree, but skip adding it
   * to the stack.
   */
  /** @protected */
  _appendElement(t, r) {
    const n = this.treeAdapter.createElement(t.tagName, r, t.attrs);
    this._attachElementToTree(n, t.location);
  }
  /** @protected */
  _insertElement(t, r) {
    const n = this.treeAdapter.createElement(t.tagName, r, t.attrs);
    this._attachElementToTree(n, t.location), this.openElements.push(n, t.tagID);
  }
  /** @protected */
  _insertFakeElement(t, r) {
    const n = this.treeAdapter.createElement(t, K.HTML, []);
    this._attachElementToTree(n, null), this.openElements.push(n, r);
  }
  /** @protected */
  _insertTemplate(t) {
    const r = this.treeAdapter.createElement(t.tagName, K.HTML, t.attrs), n = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(r, n), this._attachElementToTree(r, t.location), this.openElements.push(r, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(L.HTML, K.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(t, null), this.treeAdapter.appendChild(this.openElements.current, t), this.openElements.push(t, d.HTML);
  }
  /** @protected */
  _appendCommentNode(t, r) {
    const n = this.treeAdapter.createCommentNode(t.data);
    this.treeAdapter.appendChild(r, n), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, t.location);
  }
  /** @protected */
  _insertCharacters(t) {
    let r, n;
    if (this._shouldFosterParentOnInsertion() ? ({ parent: r, beforeElement: n } = this._findFosterParentingLocation(), n ? this.treeAdapter.insertTextBefore(r, t.chars, n) : this.treeAdapter.insertText(r, t.chars)) : (r = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(r, t.chars)), !t.location)
      return;
    const a = this.treeAdapter.getChildNodes(r), i = n ? a.lastIndexOf(n) : a.length, o = a[i - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(o)) {
      const { endLine: s, endCol: c, endOffset: l } = t.location;
      this.treeAdapter.updateNodeSourceCodeLocation(o, { endLine: s, endCol: c, endOffset: l });
    } else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(o, t.location);
  }
  /** @protected */
  _adoptNodes(t, r) {
    for (let n = this.treeAdapter.getFirstChild(t); n; n = this.treeAdapter.getFirstChild(t))
      this.treeAdapter.detachNode(n), this.treeAdapter.appendChild(r, n);
  }
  /** @protected */
  _setEndLocation(t, r) {
    if (this.treeAdapter.getNodeSourceCodeLocation(t) && r.location) {
      const n = r.location, a = this.treeAdapter.getTagName(t), i = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        r.type === be.END_TAG && a === r.tagName ? {
          endTag: { ...n },
          endLine: n.endLine,
          endCol: n.endCol,
          endOffset: n.endOffset
        } : {
          endLine: n.startLine,
          endCol: n.startCol,
          endOffset: n.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(t, i);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(t) {
    if (!this.currentNotInHTML)
      return !1;
    let r, n;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (r = this.fragmentContext, n = this.fragmentContextID) : { current: r, currentTagId: n } = this.openElements, t.tagID === d.SVG && this.treeAdapter.getTagName(r) === L.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(r) === K.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (t.tagID === d.MGLYPH || t.tagID === d.MALIGNMARK) && n !== void 0 && !this._isIntegrationPoint(n, r, K.HTML)
    );
  }
  /** @protected */
  _processToken(t) {
    switch (t.type) {
      case be.CHARACTER: {
        this.onCharacter(t);
        break;
      }
      case be.NULL_CHARACTER: {
        this.onNullCharacter(t);
        break;
      }
      case be.COMMENT: {
        this.onComment(t);
        break;
      }
      case be.DOCTYPE: {
        this.onDoctype(t);
        break;
      }
      case be.START_TAG: {
        this._processStartTag(t);
        break;
      }
      case be.END_TAG: {
        this.onEndTag(t);
        break;
      }
      case be.EOF: {
        this.onEof(t);
        break;
      }
      case be.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(t);
        break;
      }
    }
  }
  //Integration points
  /** @protected */
  _isIntegrationPoint(t, r, n) {
    const a = this.treeAdapter.getNamespaceURI(r), i = this.treeAdapter.getAttrList(r);
    return EP(t, a, i, n);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const r = this.activeFormattingElements.entries.findIndex((a) => a.type === Zt.Marker || this.openElements.contains(a.element)), n = r === -1 ? t - 1 : r - 1;
      for (let a = n; a >= 0; a--) {
        const i = this.activeFormattingElements.entries[a];
        this._insertElement(i.token, this.treeAdapter.getNamespaceURI(i.element)), i.element = this.openElements.current;
      }
    }
  }
  //Close elements
  /** @protected */
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = w.IN_ROW;
  }
  /** @protected */
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(d.P), this.openElements.popUntilTagNamePopped(d.P);
  }
  //Insertion modes
  /** @protected */
  _resetInsertionMode() {
    for (let t = this.openElements.stackTop; t >= 0; t--)
      switch (t === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[t]) {
        case d.TR: {
          this.insertionMode = w.IN_ROW;
          return;
        }
        case d.TBODY:
        case d.THEAD:
        case d.TFOOT: {
          this.insertionMode = w.IN_TABLE_BODY;
          return;
        }
        case d.CAPTION: {
          this.insertionMode = w.IN_CAPTION;
          return;
        }
        case d.COLGROUP: {
          this.insertionMode = w.IN_COLUMN_GROUP;
          return;
        }
        case d.TABLE: {
          this.insertionMode = w.IN_TABLE;
          return;
        }
        case d.BODY: {
          this.insertionMode = w.IN_BODY;
          return;
        }
        case d.FRAMESET: {
          this.insertionMode = w.IN_FRAMESET;
          return;
        }
        case d.SELECT: {
          this._resetInsertionModeForSelect(t);
          return;
        }
        case d.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case d.HTML: {
          this.insertionMode = this.headElement ? w.AFTER_HEAD : w.BEFORE_HEAD;
          return;
        }
        case d.TD:
        case d.TH: {
          if (t > 0) {
            this.insertionMode = w.IN_CELL;
            return;
          }
          break;
        }
        case d.HEAD: {
          if (t > 0) {
            this.insertionMode = w.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = w.IN_BODY;
  }
  /** @protected */
  _resetInsertionModeForSelect(t) {
    if (t > 0)
      for (let r = t - 1; r > 0; r--) {
        const n = this.openElements.tagIDs[r];
        if (n === d.TEMPLATE)
          break;
        if (n === d.TABLE) {
          this.insertionMode = w.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = w.IN_SELECT;
  }
  //Foster parenting
  /** @protected */
  _isElementCausesFosterParenting(t) {
    return p_.has(t);
  }
  /** @protected */
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  /** @protected */
  _findFosterParentingLocation() {
    for (let t = this.openElements.stackTop; t >= 0; t--) {
      const r = this.openElements.items[t];
      switch (this.openElements.tagIDs[t]) {
        case d.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(r) === K.HTML)
            return { parent: this.treeAdapter.getTemplateContent(r), beforeElement: null };
          break;
        }
        case d.TABLE: {
          const n = this.treeAdapter.getParentNode(r);
          return n ? { parent: n, beforeElement: r } : { parent: this.openElements.items[t - 1], beforeElement: null };
        }
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  /** @protected */
  _fosterParentElement(t) {
    const r = this._findFosterParentingLocation();
    r.beforeElement ? this.treeAdapter.insertBefore(r.parent, t, r.beforeElement) : this.treeAdapter.appendChild(r.parent, t);
  }
  //Special elements
  /** @protected */
  _isSpecialElement(t, r) {
    const n = this.treeAdapter.getNamespaceURI(t);
    return Ww[n].has(r);
  }
  /** @internal */
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      tC(this, t);
      return;
    }
    switch (this.insertionMode) {
      case w.INITIAL: {
        Na(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        Va(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Xa(this, t);
        break;
      }
      case w.IN_HEAD: {
        Qa(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        Za(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        Ja(this, t);
        break;
      }
      case w.IN_BODY:
      case w.IN_CAPTION:
      case w.IN_CELL:
      case w.IN_TEMPLATE: {
        y_(this, t);
        break;
      }
      case w.TEXT:
      case w.IN_SELECT:
      case w.IN_SELECT_IN_TABLE: {
        this._insertCharacters(t);
        break;
      }
      case w.IN_TABLE:
      case w.IN_TABLE_BODY:
      case w.IN_ROW: {
        Ms(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        __(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        Mo(this, t);
        break;
      }
      case w.AFTER_BODY: {
        Lo(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        wo(this, t);
        break;
      }
    }
  }
  /** @internal */
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      eC(this, t);
      return;
    }
    switch (this.insertionMode) {
      case w.INITIAL: {
        Na(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        Va(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Xa(this, t);
        break;
      }
      case w.IN_HEAD: {
        Qa(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        Za(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        Ja(this, t);
        break;
      }
      case w.TEXT: {
        this._insertCharacters(t);
        break;
      }
      case w.IN_TABLE:
      case w.IN_TABLE_BODY:
      case w.IN_ROW: {
        Ms(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        Mo(this, t);
        break;
      }
      case w.AFTER_BODY: {
        Lo(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        wo(this, t);
        break;
      }
    }
  }
  /** @internal */
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Xd(this, t);
      return;
    }
    switch (this.insertionMode) {
      case w.INITIAL:
      case w.BEFORE_HTML:
      case w.BEFORE_HEAD:
      case w.IN_HEAD:
      case w.IN_HEAD_NO_SCRIPT:
      case w.AFTER_HEAD:
      case w.IN_BODY:
      case w.IN_TABLE:
      case w.IN_CAPTION:
      case w.IN_COLUMN_GROUP:
      case w.IN_TABLE_BODY:
      case w.IN_ROW:
      case w.IN_CELL:
      case w.IN_SELECT:
      case w.IN_SELECT_IN_TABLE:
      case w.IN_TEMPLATE:
      case w.IN_FRAMESET:
      case w.AFTER_FRAMESET: {
        Xd(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Ra(this, t);
        break;
      }
      case w.AFTER_BODY: {
        RP(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY:
      case w.AFTER_AFTER_FRAMESET: {
        DP(this, t);
        break;
      }
    }
  }
  /** @internal */
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case w.INITIAL: {
        MP(this, t);
        break;
      }
      case w.BEFORE_HEAD:
      case w.IN_HEAD:
      case w.IN_HEAD_NO_SCRIPT:
      case w.AFTER_HEAD: {
        this._err(t, U.misplacedDoctype);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Ra(this, t);
        break;
      }
    }
  }
  /** @internal */
  onStartTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, U.nonVoidHtmlElementStartTagWithTrailingSolidus);
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
    this.shouldProcessStartTagTokenInForeignContent(t) ? rC(this, t) : this._startTagOutsideForeignContent(t);
  }
  /** @protected */
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        Na(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        LP(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        BP(this, t);
        break;
      }
      case w.IN_HEAD: {
        Xt(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        $P(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        HP(this, t);
        break;
      }
      case w.IN_BODY: {
        lt(this, t);
        break;
      }
      case w.IN_TABLE: {
        Xn(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Ra(this, t);
        break;
      }
      case w.IN_CAPTION: {
        jI(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        Cp(this, t);
        break;
      }
      case w.IN_TABLE_BODY: {
        Fu(this, t);
        break;
      }
      case w.IN_ROW: {
        $u(this, t);
        break;
      }
      case w.IN_CELL: {
        UI(this, t);
        break;
      }
      case w.IN_SELECT: {
        S_(this, t);
        break;
      }
      case w.IN_SELECT_IN_TABLE: {
        qI(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        YI(this, t);
        break;
      }
      case w.AFTER_BODY: {
        GI(this, t);
        break;
      }
      case w.IN_FRAMESET: {
        KI(this, t);
        break;
      }
      case w.AFTER_FRAMESET: {
        XI(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        ZI(this, t);
        break;
      }
      case w.AFTER_AFTER_FRAMESET: {
        JI(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? nC(this, t) : this._endTagOutsideForeignContent(t);
  }
  /** @protected */
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        Na(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        kP(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        jP(this, t);
        break;
      }
      case w.IN_HEAD: {
        FP(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        UP(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        qP(this, t);
        break;
      }
      case w.IN_BODY: {
        ju(this, t);
        break;
      }
      case w.TEXT: {
        PI(this, t);
        break;
      }
      case w.IN_TABLE: {
        li(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Ra(this, t);
        break;
      }
      case w.IN_CAPTION: {
        FI(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        $I(this, t);
        break;
      }
      case w.IN_TABLE_BODY: {
        Qd(this, t);
        break;
      }
      case w.IN_ROW: {
        O_(this, t);
        break;
      }
      case w.IN_CELL: {
        HI(this, t);
        break;
      }
      case w.IN_SELECT: {
        x_(this, t);
        break;
      }
      case w.IN_SELECT_IN_TABLE: {
        WI(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        zI(this, t);
        break;
      }
      case w.AFTER_BODY: {
        P_(this, t);
        break;
      }
      case w.IN_FRAMESET: {
        VI(this, t);
        break;
      }
      case w.AFTER_FRAMESET: {
        QI(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        wo(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEof(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        Na(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        Va(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Xa(this, t);
        break;
      }
      case w.IN_HEAD: {
        Qa(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        Za(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        Ja(this, t);
        break;
      }
      case w.IN_BODY:
      case w.IN_TABLE:
      case w.IN_CAPTION:
      case w.IN_COLUMN_GROUP:
      case w.IN_TABLE_BODY:
      case w.IN_ROW:
      case w.IN_CELL:
      case w.IN_SELECT:
      case w.IN_SELECT_IN_TABLE: {
        E_(this, t);
        break;
      }
      case w.TEXT: {
        II(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Ra(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        w_(this, t);
        break;
      }
      case w.AFTER_BODY:
      case w.IN_FRAMESET:
      case w.AFTER_FRAMESET:
      case w.AFTER_AFTER_BODY:
      case w.AFTER_AFTER_FRAMESET: {
        Ip(this, t);
        break;
      }
    }
  }
  /** @internal */
  onWhitespaceCharacter(t) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, t.chars.charCodeAt(0) === S.LINE_FEED)) {
      if (t.chars.length === 1)
        return;
      t.chars = t.chars.substr(1);
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(t);
      return;
    }
    switch (this.insertionMode) {
      case w.IN_HEAD:
      case w.IN_HEAD_NO_SCRIPT:
      case w.AFTER_HEAD:
      case w.TEXT:
      case w.IN_COLUMN_GROUP:
      case w.IN_SELECT:
      case w.IN_SELECT_IN_TABLE:
      case w.IN_FRAMESET:
      case w.AFTER_FRAMESET: {
        this._insertCharacters(t);
        break;
      }
      case w.IN_BODY:
      case w.IN_CAPTION:
      case w.IN_CELL:
      case w.IN_TEMPLATE:
      case w.AFTER_BODY:
      case w.AFTER_AFTER_BODY:
      case w.AFTER_AFTER_FRAMESET: {
        m_(this, t);
        break;
      }
      case w.IN_TABLE:
      case w.IN_TABLE_BODY:
      case w.IN_ROW: {
        Ms(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        T_(this, t);
        break;
      }
    }
  }
}
function xP(e, t) {
  let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return r ? e.openElements.contains(r.element) ? e.openElements.hasInScope(t.tagID) || (r = null) : (e.activeFormattingElements.removeEntry(r), r = null) : v_(e, t), r;
}
function wP(e, t) {
  let r = null, n = e.openElements.stackTop;
  for (; n >= 0; n--) {
    const a = e.openElements.items[n];
    if (a === t.element)
      break;
    e._isSpecialElement(a, e.openElements.tagIDs[n]) && (r = a);
  }
  return r || (e.openElements.shortenToLength(Math.max(n, 0)), e.activeFormattingElements.removeEntry(t)), r;
}
function PP(e, t, r) {
  let n = t, a = e.openElements.getCommonAncestor(t);
  for (let i = 0, o = a; o !== r; i++, o = a) {
    a = e.openElements.getCommonAncestor(o);
    const u = e.activeFormattingElements.getElementEntry(o), s = u && i >= AP;
    !u || s ? (s && e.activeFormattingElements.removeEntry(u), e.openElements.remove(o)) : (o = IP(e, u), n === t && (e.activeFormattingElements.bookmark = u), e.treeAdapter.detachNode(n), e.treeAdapter.appendChild(o, n), n = o);
  }
  return n;
}
function IP(e, t) {
  const r = e.treeAdapter.getNamespaceURI(t.element), n = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs);
  return e.openElements.replace(t.element, n), t.element = n, n;
}
function CP(e, t, r) {
  const n = e.treeAdapter.getTagName(t), a = ku(n);
  if (e._isElementCausesFosterParenting(a))
    e._fosterParentElement(r);
  else {
    const i = e.treeAdapter.getNamespaceURI(t);
    a === d.TEMPLATE && i === K.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, r);
  }
}
function NP(e, t, r) {
  const n = e.treeAdapter.getNamespaceURI(r.element), { token: a } = r, i = e.treeAdapter.createElement(a.tagName, n, a.attrs);
  e._adoptNodes(t, i), e.treeAdapter.appendChild(t, i), e.activeFormattingElements.insertElementAfterBookmark(i, a), e.activeFormattingElements.removeEntry(r), e.openElements.remove(r.element), e.openElements.insertAfter(t, i, a.tagID);
}
function Pp(e, t) {
  for (let r = 0; r < _P; r++) {
    const n = xP(e, t);
    if (!n)
      break;
    const a = wP(e, n);
    if (!a)
      break;
    e.activeFormattingElements.bookmark = n;
    const i = PP(e, a, n.element), o = e.openElements.getCommonAncestor(n.element);
    e.treeAdapter.detachNode(i), o && CP(e, o, i), NP(e, a, n);
  }
}
function Xd(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function RP(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function DP(e, t) {
  e._appendCommentNode(t, e.document);
}
function Ip(e, t) {
  if (e.stopped = !0, t.location) {
    const r = e.fragmentContext ? 0 : 2;
    for (let n = e.openElements.stackTop; n >= r; n--)
      e._setEndLocation(e.openElements.items[n], t);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const n = e.openElements.items[0], a = e.treeAdapter.getNodeSourceCodeLocation(n);
      if (a && !a.endTag && (e._setEndLocation(n, t), e.openElements.stackTop >= 1)) {
        const i = e.openElements.items[1], o = e.treeAdapter.getNodeSourceCodeLocation(i);
        o && !o.endTag && e._setEndLocation(i, t);
      }
    }
  }
}
function MP(e, t) {
  e._setDocumentType(t);
  const r = t.forceQuirks ? Nt.QUIRKS : cP(t);
  sP(t) || e._err(t, U.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, r), e.insertionMode = w.BEFORE_HTML;
}
function Na(e, t) {
  e._err(t, U.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, Nt.QUIRKS), e.insertionMode = w.BEFORE_HTML, e._processToken(t);
}
function LP(e, t) {
  t.tagID === d.HTML ? (e._insertElement(t, K.HTML), e.insertionMode = w.BEFORE_HEAD) : Va(e, t);
}
function kP(e, t) {
  const r = t.tagID;
  (r === d.HTML || r === d.HEAD || r === d.BODY || r === d.BR) && Va(e, t);
}
function Va(e, t) {
  e._insertFakeRootElement(), e.insertionMode = w.BEFORE_HEAD, e._processToken(t);
}
function BP(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.HEAD: {
      e._insertElement(t, K.HTML), e.headElement = e.openElements.current, e.insertionMode = w.IN_HEAD;
      break;
    }
    default:
      Xa(e, t);
  }
}
function jP(e, t) {
  const r = t.tagID;
  r === d.HEAD || r === d.BODY || r === d.HTML || r === d.BR ? Xa(e, t) : e._err(t, U.endTagWithoutMatchingOpenElement);
}
function Xa(e, t) {
  e._insertFakeElement(L.HEAD, d.HEAD), e.headElement = e.openElements.current, e.insertionMode = w.IN_HEAD, e._processToken(t);
}
function Xt(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.BASE:
    case d.BASEFONT:
    case d.BGSOUND:
    case d.LINK:
    case d.META: {
      e._appendElement(t, K.HTML), t.ackSelfClosing = !0;
      break;
    }
    case d.TITLE: {
      e._switchToTextParsing(t, bt.RCDATA);
      break;
    }
    case d.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(t, bt.RAWTEXT) : (e._insertElement(t, K.HTML), e.insertionMode = w.IN_HEAD_NO_SCRIPT);
      break;
    }
    case d.NOFRAMES:
    case d.STYLE: {
      e._switchToTextParsing(t, bt.RAWTEXT);
      break;
    }
    case d.SCRIPT: {
      e._switchToTextParsing(t, bt.SCRIPT_DATA);
      break;
    }
    case d.TEMPLATE: {
      e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = w.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(w.IN_TEMPLATE);
      break;
    }
    case d.HEAD: {
      e._err(t, U.misplacedStartTagForHeadElement);
      break;
    }
    default:
      Qa(e, t);
  }
}
function FP(e, t) {
  switch (t.tagID) {
    case d.HEAD: {
      e.openElements.pop(), e.insertionMode = w.AFTER_HEAD;
      break;
    }
    case d.BODY:
    case d.BR:
    case d.HTML: {
      Qa(e, t);
      break;
    }
    case d.TEMPLATE: {
      _n(e, t);
      break;
    }
    default:
      e._err(t, U.endTagWithoutMatchingOpenElement);
  }
}
function _n(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== d.TEMPLATE && e._err(t, U.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(d.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, U.endTagWithoutMatchingOpenElement);
}
function Qa(e, t) {
  e.openElements.pop(), e.insertionMode = w.AFTER_HEAD, e._processToken(t);
}
function $P(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.BASEFONT:
    case d.BGSOUND:
    case d.HEAD:
    case d.LINK:
    case d.META:
    case d.NOFRAMES:
    case d.STYLE: {
      Xt(e, t);
      break;
    }
    case d.NOSCRIPT: {
      e._err(t, U.nestedNoscriptInHead);
      break;
    }
    default:
      Za(e, t);
  }
}
function UP(e, t) {
  switch (t.tagID) {
    case d.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = w.IN_HEAD;
      break;
    }
    case d.BR: {
      Za(e, t);
      break;
    }
    default:
      e._err(t, U.endTagWithoutMatchingOpenElement);
  }
}
function Za(e, t) {
  const r = t.type === be.EOF ? U.openElementsLeftAfterEof : U.disallowedContentInNoscriptInHead;
  e._err(t, r), e.openElements.pop(), e.insertionMode = w.IN_HEAD, e._processToken(t);
}
function HP(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.BODY: {
      e._insertElement(t, K.HTML), e.framesetOk = !1, e.insertionMode = w.IN_BODY;
      break;
    }
    case d.FRAMESET: {
      e._insertElement(t, K.HTML), e.insertionMode = w.IN_FRAMESET;
      break;
    }
    case d.BASE:
    case d.BASEFONT:
    case d.BGSOUND:
    case d.LINK:
    case d.META:
    case d.NOFRAMES:
    case d.SCRIPT:
    case d.STYLE:
    case d.TEMPLATE:
    case d.TITLE: {
      e._err(t, U.abandonedHeadElementChild), e.openElements.push(e.headElement, d.HEAD), Xt(e, t), e.openElements.remove(e.headElement);
      break;
    }
    case d.HEAD: {
      e._err(t, U.misplacedStartTagForHeadElement);
      break;
    }
    default:
      Ja(e, t);
  }
}
function qP(e, t) {
  switch (t.tagID) {
    case d.BODY:
    case d.HTML:
    case d.BR: {
      Ja(e, t);
      break;
    }
    case d.TEMPLATE: {
      _n(e, t);
      break;
    }
    default:
      e._err(t, U.endTagWithoutMatchingOpenElement);
  }
}
function Ja(e, t) {
  e._insertFakeElement(L.BODY, d.BODY), e.insertionMode = w.IN_BODY, Bu(e, t);
}
function Bu(e, t) {
  switch (t.type) {
    case be.CHARACTER: {
      y_(e, t);
      break;
    }
    case be.WHITESPACE_CHARACTER: {
      m_(e, t);
      break;
    }
    case be.COMMENT: {
      Xd(e, t);
      break;
    }
    case be.START_TAG: {
      lt(e, t);
      break;
    }
    case be.END_TAG: {
      ju(e, t);
      break;
    }
    case be.EOF: {
      E_(e, t);
      break;
    }
  }
}
function m_(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function y_(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function WP(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function YP(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  r && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(r, t.attrs));
}
function zP(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && r && (e.treeAdapter.detachNode(r), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_FRAMESET);
}
function GP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML);
}
function KP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && Vd.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, K.HTML);
}
function VP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function XP(e, t) {
  const r = e.openElements.tmplCount > 0;
  (!e.formElement || r) && (e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML), r || (e.formElement = e.openElements.current));
}
function QP(e, t) {
  e.framesetOk = !1;
  const r = t.tagID;
  for (let n = e.openElements.stackTop; n >= 0; n--) {
    const a = e.openElements.tagIDs[n];
    if (r === d.LI && a === d.LI || (r === d.DD || r === d.DT) && (a === d.DD || a === d.DT)) {
      e.openElements.generateImpliedEndTagsWithExclusion(a), e.openElements.popUntilTagNamePopped(a);
      break;
    }
    if (a !== d.ADDRESS && a !== d.DIV && a !== d.P && e._isSpecialElement(e.openElements.items[n], a))
      break;
  }
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML);
}
function ZP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML), e.tokenizer.state = bt.PLAINTEXT;
}
function JP(e, t) {
  e.openElements.hasInScope(d.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML), e.framesetOk = !1;
}
function eI(e, t) {
  const r = e.activeFormattingElements.getElementEntryInScopeWithTagName(L.A);
  r && (Pp(e, t), e.openElements.remove(r.element), e.activeFormattingElements.removeEntry(r)), e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function tI(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function rI(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(d.NOBR) && (Pp(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, K.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function nI(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function aI(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== Nt.QUIRKS && e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML), e.framesetOk = !1, e.insertionMode = w.IN_TABLE;
}
function b_(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, K.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function g_(e) {
  const t = o_(e, ln.TYPE);
  return t != null && t.toLowerCase() === TP;
}
function iI(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, K.HTML), g_(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function oI(e, t) {
  e._appendElement(t, K.HTML), t.ackSelfClosing = !0;
}
function uI(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._appendElement(t, K.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function sI(e, t) {
  t.tagName = L.IMG, t.tagID = d.IMG, b_(e, t);
}
function cI(e, t) {
  e._insertElement(t, K.HTML), e.skipNextNewLine = !0, e.tokenizer.state = bt.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = w.TEXT;
}
function lI(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, bt.RAWTEXT);
}
function fI(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, bt.RAWTEXT);
}
function bm(e, t) {
  e._switchToTextParsing(t, bt.RAWTEXT);
}
function dI(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === w.IN_TABLE || e.insertionMode === w.IN_CAPTION || e.insertionMode === w.IN_TABLE_BODY || e.insertionMode === w.IN_ROW || e.insertionMode === w.IN_CELL ? w.IN_SELECT_IN_TABLE : w.IN_SELECT;
}
function hI(e, t) {
  e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML);
}
function pI(e, t) {
  e.openElements.hasInScope(d.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, K.HTML);
}
function mI(e, t) {
  e.openElements.hasInScope(d.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(d.RTC), e._insertElement(t, K.HTML);
}
function yI(e, t) {
  e._reconstructActiveFormattingElements(), d_(t), wp(t), t.selfClosing ? e._appendElement(t, K.MATHML) : e._insertElement(t, K.MATHML), t.ackSelfClosing = !0;
}
function bI(e, t) {
  e._reconstructActiveFormattingElements(), h_(t), wp(t), t.selfClosing ? e._appendElement(t, K.SVG) : e._insertElement(t, K.SVG), t.ackSelfClosing = !0;
}
function gm(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML);
}
function lt(e, t) {
  switch (t.tagID) {
    case d.I:
    case d.S:
    case d.B:
    case d.U:
    case d.EM:
    case d.TT:
    case d.BIG:
    case d.CODE:
    case d.FONT:
    case d.SMALL:
    case d.STRIKE:
    case d.STRONG: {
      tI(e, t);
      break;
    }
    case d.A: {
      eI(e, t);
      break;
    }
    case d.H1:
    case d.H2:
    case d.H3:
    case d.H4:
    case d.H5:
    case d.H6: {
      KP(e, t);
      break;
    }
    case d.P:
    case d.DL:
    case d.OL:
    case d.UL:
    case d.DIV:
    case d.DIR:
    case d.NAV:
    case d.MAIN:
    case d.MENU:
    case d.ASIDE:
    case d.CENTER:
    case d.FIGURE:
    case d.FOOTER:
    case d.HEADER:
    case d.HGROUP:
    case d.DIALOG:
    case d.DETAILS:
    case d.ADDRESS:
    case d.ARTICLE:
    case d.SEARCH:
    case d.SECTION:
    case d.SUMMARY:
    case d.FIELDSET:
    case d.BLOCKQUOTE:
    case d.FIGCAPTION: {
      GP(e, t);
      break;
    }
    case d.LI:
    case d.DD:
    case d.DT: {
      QP(e, t);
      break;
    }
    case d.BR:
    case d.IMG:
    case d.WBR:
    case d.AREA:
    case d.EMBED:
    case d.KEYGEN: {
      b_(e, t);
      break;
    }
    case d.HR: {
      uI(e, t);
      break;
    }
    case d.RB:
    case d.RTC: {
      pI(e, t);
      break;
    }
    case d.RT:
    case d.RP: {
      mI(e, t);
      break;
    }
    case d.PRE:
    case d.LISTING: {
      VP(e, t);
      break;
    }
    case d.XMP: {
      lI(e, t);
      break;
    }
    case d.SVG: {
      bI(e, t);
      break;
    }
    case d.HTML: {
      WP(e, t);
      break;
    }
    case d.BASE:
    case d.LINK:
    case d.META:
    case d.STYLE:
    case d.TITLE:
    case d.SCRIPT:
    case d.BGSOUND:
    case d.BASEFONT:
    case d.TEMPLATE: {
      Xt(e, t);
      break;
    }
    case d.BODY: {
      YP(e, t);
      break;
    }
    case d.FORM: {
      XP(e, t);
      break;
    }
    case d.NOBR: {
      rI(e, t);
      break;
    }
    case d.MATH: {
      yI(e, t);
      break;
    }
    case d.TABLE: {
      aI(e, t);
      break;
    }
    case d.INPUT: {
      iI(e, t);
      break;
    }
    case d.PARAM:
    case d.TRACK:
    case d.SOURCE: {
      oI(e, t);
      break;
    }
    case d.IMAGE: {
      sI(e, t);
      break;
    }
    case d.BUTTON: {
      JP(e, t);
      break;
    }
    case d.APPLET:
    case d.OBJECT:
    case d.MARQUEE: {
      nI(e, t);
      break;
    }
    case d.IFRAME: {
      fI(e, t);
      break;
    }
    case d.SELECT: {
      dI(e, t);
      break;
    }
    case d.OPTION:
    case d.OPTGROUP: {
      hI(e, t);
      break;
    }
    case d.NOEMBED:
    case d.NOFRAMES: {
      bm(e, t);
      break;
    }
    case d.FRAMESET: {
      zP(e, t);
      break;
    }
    case d.TEXTAREA: {
      cI(e, t);
      break;
    }
    case d.NOSCRIPT: {
      e.options.scriptingEnabled ? bm(e, t) : gm(e, t);
      break;
    }
    case d.PLAINTEXT: {
      ZP(e, t);
      break;
    }
    case d.COL:
    case d.TH:
    case d.TD:
    case d.TR:
    case d.HEAD:
    case d.FRAME:
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD:
    case d.CAPTION:
    case d.COLGROUP:
      break;
    default:
      gm(e, t);
  }
}
function gI(e, t) {
  if (e.openElements.hasInScope(d.BODY) && (e.insertionMode = w.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const r = e.openElements.tryPeekProperlyNestedBodyElement();
    r && e._setEndLocation(r, t);
  }
}
function vI(e, t) {
  e.openElements.hasInScope(d.BODY) && (e.insertionMode = w.AFTER_BODY, P_(e, t));
}
function EI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r));
}
function TI(e) {
  const t = e.openElements.tmplCount > 0, { formElement: r } = e;
  t || (e.formElement = null), (r || t) && e.openElements.hasInScope(d.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(d.FORM) : r && e.openElements.remove(r));
}
function _I(e) {
  e.openElements.hasInButtonScope(d.P) || e._insertFakeElement(L.P, d.P), e._closePElement();
}
function AI(e) {
  e.openElements.hasInListItemScope(d.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(d.LI), e.openElements.popUntilTagNamePopped(d.LI));
}
function OI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.popUntilTagNamePopped(r));
}
function SI(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function xI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker());
}
function wI(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(L.BR, d.BR), e.openElements.pop(), e.framesetOk = !1;
}
function v_(e, t) {
  const r = t.tagName, n = t.tagID;
  for (let a = e.openElements.stackTop; a > 0; a--) {
    const i = e.openElements.items[a], o = e.openElements.tagIDs[a];
    if (n === o && (n !== d.UNKNOWN || e.treeAdapter.getTagName(i) === r)) {
      e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.stackTop >= a && e.openElements.shortenToLength(a);
      break;
    }
    if (e._isSpecialElement(i, o))
      break;
  }
}
function ju(e, t) {
  switch (t.tagID) {
    case d.A:
    case d.B:
    case d.I:
    case d.S:
    case d.U:
    case d.EM:
    case d.TT:
    case d.BIG:
    case d.CODE:
    case d.FONT:
    case d.NOBR:
    case d.SMALL:
    case d.STRIKE:
    case d.STRONG: {
      Pp(e, t);
      break;
    }
    case d.P: {
      _I(e);
      break;
    }
    case d.DL:
    case d.UL:
    case d.OL:
    case d.DIR:
    case d.DIV:
    case d.NAV:
    case d.PRE:
    case d.MAIN:
    case d.MENU:
    case d.ASIDE:
    case d.BUTTON:
    case d.CENTER:
    case d.FIGURE:
    case d.FOOTER:
    case d.HEADER:
    case d.HGROUP:
    case d.DIALOG:
    case d.ADDRESS:
    case d.ARTICLE:
    case d.DETAILS:
    case d.SEARCH:
    case d.SECTION:
    case d.SUMMARY:
    case d.LISTING:
    case d.FIELDSET:
    case d.BLOCKQUOTE:
    case d.FIGCAPTION: {
      EI(e, t);
      break;
    }
    case d.LI: {
      AI(e);
      break;
    }
    case d.DD:
    case d.DT: {
      OI(e, t);
      break;
    }
    case d.H1:
    case d.H2:
    case d.H3:
    case d.H4:
    case d.H5:
    case d.H6: {
      SI(e);
      break;
    }
    case d.BR: {
      wI(e);
      break;
    }
    case d.BODY: {
      gI(e, t);
      break;
    }
    case d.HTML: {
      vI(e, t);
      break;
    }
    case d.FORM: {
      TI(e);
      break;
    }
    case d.APPLET:
    case d.OBJECT:
    case d.MARQUEE: {
      xI(e, t);
      break;
    }
    case d.TEMPLATE: {
      _n(e, t);
      break;
    }
    default:
      v_(e, t);
  }
}
function E_(e, t) {
  e.tmplInsertionModeStack.length > 0 ? w_(e, t) : Ip(e, t);
}
function PI(e, t) {
  var r;
  t.tagID === d.SCRIPT && ((r = e.scriptHandler) === null || r === void 0 || r.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function II(e, t) {
  e._err(t, U.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function Ms(e, t) {
  if (e.openElements.currentTagId !== void 0 && p_.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = w.IN_TABLE_TEXT, t.type) {
      case be.CHARACTER: {
        __(e, t);
        break;
      }
      case be.WHITESPACE_CHARACTER: {
        T_(e, t);
        break;
      }
    }
  else
    zi(e, t);
}
function CI(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_CAPTION;
}
function NI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_COLUMN_GROUP;
}
function RI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(L.COLGROUP, d.COLGROUP), e.insertionMode = w.IN_COLUMN_GROUP, Cp(e, t);
}
function DI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_TABLE_BODY;
}
function MI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(L.TBODY, d.TBODY), e.insertionMode = w.IN_TABLE_BODY, Fu(e, t);
}
function LI(e, t) {
  e.openElements.hasInTableScope(d.TABLE) && (e.openElements.popUntilTagNamePopped(d.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function kI(e, t) {
  g_(t) ? e._appendElement(t, K.HTML) : zi(e, t), t.ackSelfClosing = !0;
}
function BI(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, K.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function Xn(e, t) {
  switch (t.tagID) {
    case d.TD:
    case d.TH:
    case d.TR: {
      MI(e, t);
      break;
    }
    case d.STYLE:
    case d.SCRIPT:
    case d.TEMPLATE: {
      Xt(e, t);
      break;
    }
    case d.COL: {
      RI(e, t);
      break;
    }
    case d.FORM: {
      BI(e, t);
      break;
    }
    case d.TABLE: {
      LI(e, t);
      break;
    }
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      DI(e, t);
      break;
    }
    case d.INPUT: {
      kI(e, t);
      break;
    }
    case d.CAPTION: {
      CI(e, t);
      break;
    }
    case d.COLGROUP: {
      NI(e, t);
      break;
    }
    default:
      zi(e, t);
  }
}
function li(e, t) {
  switch (t.tagID) {
    case d.TABLE: {
      e.openElements.hasInTableScope(d.TABLE) && (e.openElements.popUntilTagNamePopped(d.TABLE), e._resetInsertionMode());
      break;
    }
    case d.TEMPLATE: {
      _n(e, t);
      break;
    }
    case d.BODY:
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.HTML:
    case d.TBODY:
    case d.TD:
    case d.TFOOT:
    case d.TH:
    case d.THEAD:
    case d.TR:
      break;
    default:
      zi(e, t);
  }
}
function zi(e, t) {
  const r = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, Bu(e, t), e.fosterParentingEnabled = r;
}
function T_(e, t) {
  e.pendingCharacterTokens.push(t);
}
function __(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function Ra(e, t) {
  let r = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; r < e.pendingCharacterTokens.length; r++)
      zi(e, e.pendingCharacterTokens[r]);
  else
    for (; r < e.pendingCharacterTokens.length; r++)
      e._insertCharacters(e.pendingCharacterTokens[r]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const A_ = /* @__PURE__ */ new Set([d.CAPTION, d.COL, d.COLGROUP, d.TBODY, d.TD, d.TFOOT, d.TH, d.THEAD, d.TR]);
function jI(e, t) {
  const r = t.tagID;
  A_.has(r) ? e.openElements.hasInTableScope(d.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = w.IN_TABLE, Xn(e, t)) : lt(e, t);
}
function FI(e, t) {
  const r = t.tagID;
  switch (r) {
    case d.CAPTION:
    case d.TABLE: {
      e.openElements.hasInTableScope(d.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = w.IN_TABLE, r === d.TABLE && li(e, t));
      break;
    }
    case d.BODY:
    case d.COL:
    case d.COLGROUP:
    case d.HTML:
    case d.TBODY:
    case d.TD:
    case d.TFOOT:
    case d.TH:
    case d.THEAD:
    case d.TR:
      break;
    default:
      ju(e, t);
  }
}
function Cp(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.COL: {
      e._appendElement(t, K.HTML), t.ackSelfClosing = !0;
      break;
    }
    case d.TEMPLATE: {
      Xt(e, t);
      break;
    }
    default:
      Mo(e, t);
  }
}
function $I(e, t) {
  switch (t.tagID) {
    case d.COLGROUP: {
      e.openElements.currentTagId === d.COLGROUP && (e.openElements.pop(), e.insertionMode = w.IN_TABLE);
      break;
    }
    case d.TEMPLATE: {
      _n(e, t);
      break;
    }
    case d.COL:
      break;
    default:
      Mo(e, t);
  }
}
function Mo(e, t) {
  e.openElements.currentTagId === d.COLGROUP && (e.openElements.pop(), e.insertionMode = w.IN_TABLE, e._processToken(t));
}
function Fu(e, t) {
  switch (t.tagID) {
    case d.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_ROW;
      break;
    }
    case d.TH:
    case d.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(L.TR, d.TR), e.insertionMode = w.IN_ROW, $u(e, t);
      break;
    }
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE, Xn(e, t));
      break;
    }
    default:
      Xn(e, t);
  }
}
function Qd(e, t) {
  const r = t.tagID;
  switch (t.tagID) {
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      e.openElements.hasInTableScope(r) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE);
      break;
    }
    case d.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE, li(e, t));
      break;
    }
    case d.BODY:
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.HTML:
    case d.TD:
    case d.TH:
    case d.TR:
      break;
    default:
      li(e, t);
  }
}
function $u(e, t) {
  switch (t.tagID) {
    case d.TH:
    case d.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_CELL, e.activeFormattingElements.insertMarker();
      break;
    }
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD:
    case d.TR: {
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, Fu(e, t));
      break;
    }
    default:
      Xn(e, t);
  }
}
function O_(e, t) {
  switch (t.tagID) {
    case d.TR: {
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY);
      break;
    }
    case d.TABLE: {
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, Qd(e, t));
      break;
    }
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(d.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, Qd(e, t));
      break;
    }
    case d.BODY:
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.HTML:
    case d.TD:
    case d.TH:
      break;
    default:
      li(e, t);
  }
}
function UI(e, t) {
  const r = t.tagID;
  A_.has(r) ? (e.openElements.hasInTableScope(d.TD) || e.openElements.hasInTableScope(d.TH)) && (e._closeTableCell(), $u(e, t)) : lt(e, t);
}
function HI(e, t) {
  const r = t.tagID;
  switch (r) {
    case d.TD:
    case d.TH: {
      e.openElements.hasInTableScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = w.IN_ROW);
      break;
    }
    case d.TABLE:
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD:
    case d.TR: {
      e.openElements.hasInTableScope(r) && (e._closeTableCell(), O_(e, t));
      break;
    }
    case d.BODY:
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.HTML:
      break;
    default:
      ju(e, t);
  }
}
function S_(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.OPTION: {
      e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e._insertElement(t, K.HTML);
      break;
    }
    case d.OPTGROUP: {
      e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e.openElements.currentTagId === d.OPTGROUP && e.openElements.pop(), e._insertElement(t, K.HTML);
      break;
    }
    case d.HR: {
      e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e.openElements.currentTagId === d.OPTGROUP && e.openElements.pop(), e._appendElement(t, K.HTML), t.ackSelfClosing = !0;
      break;
    }
    case d.INPUT:
    case d.KEYGEN:
    case d.TEXTAREA:
    case d.SELECT: {
      e.openElements.hasInSelectScope(d.SELECT) && (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), t.tagID !== d.SELECT && e._processStartTag(t));
      break;
    }
    case d.SCRIPT:
    case d.TEMPLATE: {
      Xt(e, t);
      break;
    }
  }
}
function x_(e, t) {
  switch (t.tagID) {
    case d.OPTGROUP: {
      e.openElements.stackTop > 0 && e.openElements.currentTagId === d.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === d.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === d.OPTGROUP && e.openElements.pop();
      break;
    }
    case d.OPTION: {
      e.openElements.currentTagId === d.OPTION && e.openElements.pop();
      break;
    }
    case d.SELECT: {
      e.openElements.hasInSelectScope(d.SELECT) && (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode());
      break;
    }
    case d.TEMPLATE: {
      _n(e, t);
      break;
    }
  }
}
function qI(e, t) {
  const r = t.tagID;
  r === d.CAPTION || r === d.TABLE || r === d.TBODY || r === d.TFOOT || r === d.THEAD || r === d.TR || r === d.TD || r === d.TH ? (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : S_(e, t);
}
function WI(e, t) {
  const r = t.tagID;
  r === d.CAPTION || r === d.TABLE || r === d.TBODY || r === d.TFOOT || r === d.THEAD || r === d.TR || r === d.TD || r === d.TH ? e.openElements.hasInTableScope(r) && (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : x_(e, t);
}
function YI(e, t) {
  switch (t.tagID) {
    // First, handle tags that can start without a mode change
    case d.BASE:
    case d.BASEFONT:
    case d.BGSOUND:
    case d.LINK:
    case d.META:
    case d.NOFRAMES:
    case d.SCRIPT:
    case d.STYLE:
    case d.TEMPLATE:
    case d.TITLE: {
      Xt(e, t);
      break;
    }
    // Re-process the token in the appropriate mode
    case d.CAPTION:
    case d.COLGROUP:
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      e.tmplInsertionModeStack[0] = w.IN_TABLE, e.insertionMode = w.IN_TABLE, Xn(e, t);
      break;
    }
    case d.COL: {
      e.tmplInsertionModeStack[0] = w.IN_COLUMN_GROUP, e.insertionMode = w.IN_COLUMN_GROUP, Cp(e, t);
      break;
    }
    case d.TR: {
      e.tmplInsertionModeStack[0] = w.IN_TABLE_BODY, e.insertionMode = w.IN_TABLE_BODY, Fu(e, t);
      break;
    }
    case d.TD:
    case d.TH: {
      e.tmplInsertionModeStack[0] = w.IN_ROW, e.insertionMode = w.IN_ROW, $u(e, t);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = w.IN_BODY, e.insertionMode = w.IN_BODY, lt(e, t);
  }
}
function zI(e, t) {
  t.tagID === d.TEMPLATE && _n(e, t);
}
function w_(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(d.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : Ip(e, t);
}
function GI(e, t) {
  t.tagID === d.HTML ? lt(e, t) : Lo(e, t);
}
function P_(e, t) {
  var r;
  if (t.tagID === d.HTML) {
    if (e.fragmentContext || (e.insertionMode = w.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === d.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const n = e.openElements.items[1];
      n && !(!((r = e.treeAdapter.getNodeSourceCodeLocation(n)) === null || r === void 0) && r.endTag) && e._setEndLocation(n, t);
    }
  } else
    Lo(e, t);
}
function Lo(e, t) {
  e.insertionMode = w.IN_BODY, Bu(e, t);
}
function KI(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.FRAMESET: {
      e._insertElement(t, K.HTML);
      break;
    }
    case d.FRAME: {
      e._appendElement(t, K.HTML), t.ackSelfClosing = !0;
      break;
    }
    case d.NOFRAMES: {
      Xt(e, t);
      break;
    }
  }
}
function VI(e, t) {
  t.tagID === d.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== d.FRAMESET && (e.insertionMode = w.AFTER_FRAMESET));
}
function XI(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.NOFRAMES: {
      Xt(e, t);
      break;
    }
  }
}
function QI(e, t) {
  t.tagID === d.HTML && (e.insertionMode = w.AFTER_AFTER_FRAMESET);
}
function ZI(e, t) {
  t.tagID === d.HTML ? lt(e, t) : wo(e, t);
}
function wo(e, t) {
  e.insertionMode = w.IN_BODY, Bu(e, t);
}
function JI(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.NOFRAMES: {
      Xt(e, t);
      break;
    }
  }
}
function eC(e, t) {
  t.chars = Me, e._insertCharacters(t);
}
function tC(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function I_(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== K.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function rC(e, t) {
  if (yP(t))
    I_(e), e._startTagOutsideForeignContent(t);
  else {
    const r = e._getAdjustedCurrentElement(), n = e.treeAdapter.getNamespaceURI(r);
    n === K.MATHML ? d_(t) : n === K.SVG && (bP(t), h_(t)), wp(t), t.selfClosing ? e._appendElement(t, n) : e._insertElement(t, n), t.ackSelfClosing = !0;
  }
}
function nC(e, t) {
  if (t.tagID === d.P || t.tagID === d.BR) {
    I_(e), e._endTagOutsideForeignContent(t);
    return;
  }
  for (let r = e.openElements.stackTop; r > 0; r--) {
    const n = e.openElements.items[r];
    if (e.treeAdapter.getNamespaceURI(n) === K.HTML) {
      e._endTagOutsideForeignContent(t);
      break;
    }
    const a = e.treeAdapter.getTagName(n);
    if (a.toLowerCase() === t.tagName) {
      t.tagName = a, e.openElements.shortenToLength(r);
      break;
    }
  }
}
L.AREA, L.BASE, L.BASEFONT, L.BGSOUND, L.BR, L.COL, L.EMBED, L.FRAME, L.HR, L.IMG, L.INPUT, L.KEYGEN, L.LINK, L.META, L.PARAM, L.SOURCE, L.TRACK, L.WBR;
function aC(e, t, r) {
  typeof e == "string" && (r = t, t = e, e = null);
  const n = SP.getFragmentParser(e, r);
  return n.tokenizer.write(t, !0), n.getFragment();
}
const iC = () => ({}), Zr = () => !0, Nr = (e) => {
  const t = parseInt(e, 10);
  return Number.isFinite(t) ? t : e;
}, oC = (e) => typeof e != "string" ? e : e.split(",").map((t) => t.trim()).filter(Boolean).map((t) => parseInt(t, 10)).filter((t) => Number.isFinite(t)), uC = {
  "data-underline": { path: ["underline"], transform: iC },
  "data-positionaltab-alignment": { path: ["positionalTab", "alignment"] },
  "data-positionaltab-leader": { path: ["positionalTab", "leader"] },
  "data-positionaltab-relativeto": { path: ["positionalTab", "relativeTo"] },
  "data-spacing-before": { path: ["spacing", "before"] },
  "data-spacing-after": { path: ["spacing", "after"] },
  "data-spacing-line": { path: ["spacing", "line"] },
  "data-spacing-line-rule": { path: ["spacing", "lineRule"] },
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
  // ------------------------------------------------------------------
  // Table-cell additions (Stage 1 of the press-professional-docx plan)
  // ------------------------------------------------------------------
  // Cell shading. `data-shading-fill` is the load-bearing attribute
  // (the solid background color). `data-shading-type` defaults to
  // 'clear' in the adapter so a plain fill JSX prop produces a solid
  // background without callers having to remember the OOXML idiom.
  "data-shading-fill": { path: ["shading", "fill"] },
  "data-shading-color": { path: ["shading", "color"] },
  "data-shading-type": { path: ["shading", "type"] },
  // Vertical alignment of the cell's content. `top` | `center` | `bottom`.
  // Maps to docx's VerticalAlignTable enum at the adapter layer.
  "data-valign": { path: ["verticalAlign"] },
  // Cell column merge: how many adjacent columns this cell spans.
  "data-grid-span": { path: ["columnSpan"], transform: Nr },
  // Cell row merge: how many rows this cell spans (vertical merge).
  // The adapter uses docx's `rowSpan` shorthand, which expects only
  // the *starting* cell to declare a count; library handles the
  // merge-continue rows internally.
  "data-row-span": { path: ["rowSpan"], transform: Nr },
  // ------------------------------------------------------------------
  // Stage 3 — paragraph polish
  // ------------------------------------------------------------------
  // Paragraph indentation. All values are twips. `firstLine` and
  // `hanging` are positive; `left` and `right` may be negative.
  "data-indent-left": { path: ["indent", "left"], transform: Nr },
  "data-indent-right": { path: ["indent", "right"], transform: Nr },
  "data-indent-firstline": { path: ["indent", "firstLine"], transform: Nr },
  "data-indent-hanging": { path: ["indent", "hanging"], transform: Nr },
  // Paragraph tab stops. JSON-encoded array of TabStopDefinition objects:
  //   [{ position: 6804, type: 'right', leader: 'dot' }, …]
  // Position is in twips; type is left/right/center/decimal/etc;
  // leader is none/dot/hyphen/underscore/middleDot. Foundations
  // typically construct these via the <Paragraph tabStops=…> prop
  // and the unit helpers (cm, mm, inch, pt).
  // Paragraph-level named style ('Title', 'Heading1', 'Body', …).
  // Maps to `<w:pStyle w:val="…"/>` in the docx adapter. Distinct
  // from the run-level `data-style` (default fallthrough), which
  // emits `<w:rStyle>`.
  "data-paragraph-style": { path: ["paragraphStyle"] },
  // Paragraph bookmark target: when set, the docx adapter wraps the
  // paragraph's inline children in a Word Bookmark with this id, so
  // <Link href="..."> (InternalHyperlink) elsewhere in the document
  // can jump here. The adapter already handles `node.bookmark` (see
  // src/adapters/docx.js, irToParagraph); this entry is the missing
  // IR attribute mapping that wires React-side props through to it.
  "data-bookmark": { path: ["bookmark"] },
  "data-tab-stops": {
    path: ["tabStops"],
    transform: (e) => {
      if (typeof e != "string") return e;
      try {
        const t = JSON.parse(e);
        return Array.isArray(t) ? t : e;
      } catch {
        return e;
      }
    }
  },
  // TextRun toggles — explicit map entries route the lower-case
  // HTML attribute names to camelCase IR fields the adapter reads.
  "data-smallcaps": { path: ["smallCaps"], transform: Zr },
  "data-allcaps": { path: ["allCaps"], transform: Zr },
  "data-strike": { path: ["strike"], transform: Zr },
  "data-subscript": { path: ["subScript"], transform: Zr },
  "data-superscript": { path: ["superScript"], transform: Zr },
  // Row-level: whether the row repeats as a header on each new page
  // when the table breaks. Presence-only — any truthy value counts.
  "data-row-header": { path: ["tableHeader"], transform: Zr },
  // ------------------------------------------------------------------
  // Table-level options (Stage 1)
  //
  // Stored under the prefixed `tableXxx` namespace so they don't
  // collide with the cell-level `width` / `borders` properties that
  // existed before. `irToTable` reads these on table-typed nodes.
  // ------------------------------------------------------------------
  // Column widths in twips. Emitted as a comma-separated string on
  // the `<table>` element by Table.jsx; parsed back to an int array
  // here. Used with `tableLayout: 'fixed'` to lock columns; without
  // a fixed layout, Word redistributes columns to fit content.
  "data-table-column-widths": {
    path: ["tableColumnWidths"],
    transform: oC
  },
  // 'fixed' | 'autofit'. Default in the adapter is 'fixed' when
  // tableColumnWidths is set, undefined otherwise (Word's default).
  "data-table-layout": { path: ["tableLayout"] },
  // Whole-table width. Distinct from per-cell width. Same { size, type }
  // shape (pct/dxa/auto) as cell widths.
  "data-table-width-size": { path: ["tableWidth", "size"] },
  "data-table-width-type": { path: ["tableWidth", "type"] },
  // Table-level default borders. Per-cell borders still win (and
  // already exist via `data-borders-*`); these set the table grid.
  "data-table-borders-top-style": { path: ["tableBorders", "top", "style"] },
  "data-table-borders-top-size": { path: ["tableBorders", "top", "size"] },
  "data-table-borders-top-color": { path: ["tableBorders", "top", "color"] },
  "data-table-borders-bottom-style": { path: ["tableBorders", "bottom", "style"] },
  "data-table-borders-bottom-size": { path: ["tableBorders", "bottom", "size"] },
  "data-table-borders-bottom-color": { path: ["tableBorders", "bottom", "color"] },
  "data-table-borders-left-style": { path: ["tableBorders", "left", "style"] },
  "data-table-borders-left-size": { path: ["tableBorders", "left", "size"] },
  "data-table-borders-left-color": { path: ["tableBorders", "left", "color"] },
  "data-table-borders-right-style": { path: ["tableBorders", "right", "style"] },
  "data-table-borders-right-size": { path: ["tableBorders", "right", "size"] },
  "data-table-borders-right-color": { path: ["tableBorders", "right", "color"] },
  "data-table-borders-insideh-style": { path: ["tableBorders", "insideHorizontal", "style"] },
  "data-table-borders-insideh-size": { path: ["tableBorders", "insideHorizontal", "size"] },
  "data-table-borders-insideh-color": { path: ["tableBorders", "insideHorizontal", "color"] },
  "data-table-borders-insidev-style": { path: ["tableBorders", "insideVertical", "style"] },
  "data-table-borders-insidev-size": { path: ["tableBorders", "insideVertical", "size"] },
  "data-table-borders-insidev-color": { path: ["tableBorders", "insideVertical", "color"] },
  "data-image-type": { path: ["imageType"] },
  "data-floating-horizontalposition-relative": {
    path: ["floating", "horizontalPosition", "relative"]
  },
  "data-floating-horizontalposition-align": {
    path: ["floating", "horizontalPosition", "align"]
  },
  "data-floating-horizontalposition-offset": {
    path: ["floating", "horizontalPosition", "offset"],
    transform: Nr
  },
  "data-floating-verticalposition-relative": {
    path: ["floating", "verticalPosition", "relative"]
  },
  "data-floating-verticalposition-align": {
    path: ["floating", "verticalPosition", "align"]
  },
  "data-floating-verticalposition-offset": {
    path: ["floating", "verticalPosition", "offset"],
    transform: Nr
  },
  // Page breaks — maps to DocxParagraph({ pageBreakBefore: true })
  // in the adapter. Presence attribute: any truthy value counts.
  "data-page-break-before": { path: ["pageBreakBefore"], transform: Zr },
  // Table of contents options — consumed by the tableOfContents node
  // type in the adapter (src/adapters/docx.js). See docx library's
  // ITableOfContentsOptions for the full shape; these are the three
  // useful ones and any additional data-toc-* attribute falls through
  // to the default rule below.
  "data-toc-title": { path: ["toc", "title"] },
  "data-toc-hyperlink": { path: ["toc", "hyperlink"] },
  "data-toc-heading-range": { path: ["toc", "headingRange"] }
};
function sC(e, t, r) {
  let n = e;
  for (let a = 0; a < t.length - 1; a++) {
    const i = t[a];
    (!n[i] || typeof n[i] != "object") && (n[i] = {}), n = n[i];
  }
  n[t[t.length - 1]] = r;
}
function cC(e) {
  const t = {};
  for (const { name: r, value: n } of e) {
    if (!r.startsWith("data-") || r === "data-type") continue;
    const a = uC[r];
    if (a) {
      const i = a.transform ? a.transform(n) : n;
      sC(t, a.path, i);
    } else {
      const i = r.slice(5);
      t[i] = n;
    }
  }
  return t;
}
function lC(e) {
  const t = aC(e);
  return Zd(t);
}
const fC = /* @__PURE__ */ new Set([
  "link",
  "meta",
  "script",
  "style",
  "base",
  "title",
  "noscript"
]);
function dC(e) {
  if (e.nodeName === "#text") {
    const u = e.value;
    return u && u.trim() ? { type: "text", content: u } : null;
  }
  if (!e.tagName) return null;
  const t = e.tagName.toLowerCase();
  if (fC.has(t)) return null;
  const n = vm(e, "data-type") || t;
  if (n === "emptyLine") return null;
  if (n === "contentWrapper")
    return Zd(e);
  const a = cC(e.attrs || []), i = Zd(e);
  if (n === "a" && a.href === void 0) {
    const u = vm(e, "href");
    u && (a.href = u);
  }
  const o = { type: n, ...a };
  return n === "text" ? o.content = i.map((u) => u.content || "").join("") : i.length > 0 && (o.children = i), o;
}
function Zd(e) {
  const t = [], r = e.childNodes || [];
  for (const n of r) {
    const a = dC(n);
    a != null && (Array.isArray(a) ? t.push(...a) : t.push(a));
  }
  return t;
}
function vm(e, t) {
  if (!e.attrs) return null;
  for (const r of e.attrs)
    if (r.name === t) return r.value;
  return null;
}
const hC = {
  docx: { load: () => import("./docx-CUR-Nnw4.js"), consumes: "docx", ir: !0 },
  xlsx: { load: () => import("./xlsx-DCk2JZIB.js"), consumes: "xlsx", ir: !1 },
  typst: { load: () => import("./typst-CAy4H0eu.js"), consumes: "typst", ir: !0 },
  // LaTeX consumes its own input key. Foundations targeting both Typst
  // and LaTeX register under each format separately — same JSX, two
  // useDocumentOutput calls — so the adapters can diverge as the
  // formats need without forcing a shared input shape.
  latex: { load: () => import("./latex-CxQr_iwk.js"), consumes: "latex", ir: !0 },
  // Paged.js consumes 'html' — an input shape shared with EPUB below.
  // Foundations register once under 'html' and both adapters read it.
  pagedjs: { load: () => import("./pagedjs-BGhLfddG.js"), consumes: "html", ir: !1 },
  epub: { load: () => import("./epub-BOgEH7Er.js"), consumes: "html", ir: !1 }
};
function Np(e) {
  const t = hC[e];
  return t ? {
    load: t.load,
    consumes: t.consumes || e,
    ir: t.ir !== !1
    // default to true for safety on under-specified entries
  } : null;
}
async function pC(e, t, r = {}) {
  const n = Np(e);
  if (!n)
    throw new Error(`Unsupported document format: "${e}"`);
  const a = await n.load(), i = a.compileDocx || a.compileXlsx || a.compileTypst || a.compileLatex || a.compilePagedjs || a.compileEpub || a.compilePdf;
  if (!i)
    throw new Error(
      `Format adapter "${e}" does not export a compile function.`
    );
  return i(t, r);
}
function mC(e, t) {
  const r = Np(t);
  if (!r)
    return { sections: [], header: null, footer: null, metadata: null };
  const n = e.getOutputs(r.consumes) || [];
  return r.ir ? yC(n, e) : r.consumes === "html" ? bC(n, e) : gC(n);
}
function yC(e, t) {
  let r = null, n = null, a = null, i = !1, o = !1;
  const u = [], s = t.wrapWithProviders || ((c) => c);
  for (const { fragment: c, options: l } of e) {
    const f = l.role || "body";
    if (f === "metadata") {
      r = c;
      continue;
    }
    const h = Tp(s(c)), p = lC(h);
    switch (f) {
      case "header":
        n = p, l.applyTo === "first" && (i = !0);
        break;
      case "footer":
        a = p, l.applyTo === "first" && (o = !0);
        break;
      default:
        u.push(p);
        break;
    }
  }
  return {
    sections: u,
    header: n,
    footer: a,
    metadata: r,
    headerFirstPageOnly: i,
    footerFirstPageOnly: o
  };
}
function bC(e, t) {
  const r = t.wrapWithProviders || ((i) => i);
  let n = null;
  const a = [];
  for (const { fragment: i, options: o } of e) {
    const u = o.role || "body";
    if (u === "metadata") {
      n = i;
      continue;
    }
    if (u !== "body") continue;
    const s = Tp(r(i));
    a.push(s);
  }
  return { sections: a, metadata: n };
}
function gC(e) {
  return { sections: e.map(({ fragment: r }) => r).filter(Boolean) };
}
function vC(e, t) {
  if (typeof document > "u") return;
  const r = URL.createObjectURL(e), n = document.createElement("a");
  n.href = r, n.download = t, document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(r);
}
function EC(e, t, r = {}) {
  const { basePath: n, theme: a } = r, i = t_();
  return Tp(
    oi(
      r_,
      { store: i, basePath: n, theme: a },
      e
    )
  ), TC(i, t), mC(i, t);
}
const Em = /* @__PURE__ */ new Set();
function TC(e, t) {
  const r = Np(t);
  if (!r) return;
  const n = r.consumes;
  if (!(Em.has(n) || (e.getOutputs && e.getOutputs(n) || []).length > 0) && (Em.add(n), typeof console < "u" && console.warn)) {
    const i = n === t ? `compileSubtree('${t}') found 0 registered sections. Did any section component call useDocumentOutput(block, '${t}', ...)?` : `compileSubtree('${t}') found 0 sections registered under input key '${n}'. Sections should call useDocumentOutput(block, '${n}', ...) (the output format '${t}' reads fragments registered under '${n}').`;
    console.warn(
      `@uniweb/press: ${i} Sections registered for a different input key do not cross-register.`
    );
  }
}
async function Tm(e, t, r = {}) {
  const { basePath: n, theme: a, adapterOptions: i = {} } = r, o = EC(e, t, { basePath: n, theme: a });
  return pC(t, o, i);
}
async function _C(e, t = {}) {
  if (e !== null && typeof e == "object" && // React elements have a $$typeof symbol; duck-typing avoids needing
  // `import { isValidElement } from 'react'` (minor, but keeps this
  // file free of React imports it doesn't otherwise need).
  !!e.$$typeof) {
    const { format: A, ...b } = t;
    if (!A)
      throw new Error(
        "compileDocument: 'format' is required (tree mode)."
      );
    return Tm(e, A, b);
  }
  const n = e, {
    format: a,
    foundation: i,
    rootPath: o,
    adapterOptions: u = {},
    basePath: s,
    loadAsset: c,
    ...l
  } = t, f = c ?? OC(n);
  if (!a)
    throw new Error(
      "compileDocument: 'format' is required (website mode)."
    );
  if (!n || !Array.isArray(n.pages))
    throw new Error(
      "compileDocument: first argument must be either a React element (tree mode) or a Website (website mode: expected object with a pages array)."
    );
  const h = AC(i), p = h?.[a];
  if (!p) {
    const A = h ? Object.keys(h).join(", ") || "(none)" : "(no outputs declaration)";
    throw new Error(
      `compileDocument: foundation has no outputs.${a} declaration. Declared outputs: ${A}. Add outputs[format] = { getOptions, extension?, via? } to the foundation's default export.`
    );
  }
  const g = p.via ?? a, y = p.getOptions ? await p.getOptions(n, { format: a, rootPath: o, loadAsset: f, ...l }) : {}, m = {
    // Thread the host loadAsset through to the adapter so it can embed
    // inline body images (the typst/latex bundlers fetch bytes here, the
    // same capability the docx adapter uses). A foundation's getOptions or
    // the caller can still override it via adapterOptions.
    loadAsset: f,
    ...y.adapterOptions,
    ...u
  }, E = SC(n, o), v = globalThis.uniweb?.childBlockRenderer;
  if (typeof v != "function")
    throw new Error(
      "compileDocument: globalThis.uniweb.childBlockRenderer is not installed. Either call initPrerender (headless) or mount a Uniweb runtime (browser) before compileDocument, or pass a pre-built tree (tree mode)."
    );
  const T = v({ blocks: E });
  return Tm(T, g, {
    basePath: s ?? n?.basePath,
    ...y,
    adapterOptions: m
  });
}
function AC(e) {
  return e ? e.outputs ? e.outputs : e.default?.capabilities?.outputs ? e.default.capabilities.outputs : e.default?.outputs ? e.default.outputs : null : null;
}
function OC(e) {
  return async function(r) {
    if (!r || typeof r != "string") return null;
    if (r.startsWith("data:")) {
      const i = r.indexOf(",");
      if (i === -1) return null;
      const o = r.slice(5, i), u = r.slice(i + 1);
      if (o.includes(";base64")) {
        const s = atob(u), c = new Uint8Array(s.length);
        for (let l = 0; l < s.length; l++) c[l] = s.charCodeAt(l);
        return c;
      }
      return new TextEncoder().encode(decodeURIComponent(u));
    }
    if (typeof fetch != "function")
      throw new Error(
        "loadAsset: cannot load '" + r + "' — no fetch available in this environment. Pass a host-supplied loadAsset via compileDocument({ loadAsset })."
      );
    let n = r;
    if (!/^https?:\/\//i.test(n) && !n.startsWith("data:")) {
      const i = (e?.basePath || "") + (n.startsWith("/") ? n : "/" + n);
      n = typeof window < "u" && window.location?.origin ? window.location.origin + i : i;
    }
    const a = await fetch(n);
    if (!a.ok)
      throw new Error(
        "loadAsset: fetch failed for " + n + " (" + a.status + ")"
      );
    return new Uint8Array(await a.arrayBuffer());
  };
}
function SC(e, t) {
  const r = e.pages || [];
  return (t && typeof t == "string" ? r.filter(
    (a) => a.route === t || typeof a.route == "string" && a.route.startsWith(t + "/")
  ) : r).flatMap((a) => a.bodyBlocks || []);
}
function xC(e) {
  return String(e).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function Da(e, t) {
  const r = new RegExp(`${t}="([^"]*)"`), n = e.match(r);
  return n ? xC(n[1]) : null;
}
function wC(e) {
  const t = (n, a) => ({
    type: "text",
    content: n,
    ...a
  }), r = (n, a = {}) => {
    const i = /<(\w+)(\s[^>]*)?>(.+?)<\/\1>/gs;
    let o = [], u = 0;
    if (!n) return [t("", a)];
    n.replace(i, (c, l, f, h, p) => {
      const g = n.slice(u, p);
      if (g && o.push(t(g, a)), l === "a" && f) {
        const m = Da(f, "href");
        if (m) {
          const E = r(h, a).filter(
            (v) => v.type === "text"
          );
          o.push({
            type: "link",
            content: E.map((v) => v.content).join(""),
            href: m,
            parts: E
          }), u = p + c.length;
          return;
        }
      }
      if (l === "span" && f && Da(f, "data-type") === "math") {
        const E = Da(f, "data-latex") || "", v = Da(f, "data-display") === "true", T = Da(f, "data-id");
        o.push({
          type: "math",
          latex: E,
          display: v,
          ...T ? { id: T } : {}
        }), u = p + c.length;
        return;
      }
      const y = { ...a };
      (l === "strong" || l === "b") && (y.bold = !0), (l === "em" || l === "i") && (y.italics = !0), l === "u" && (y.underline = {}), l === "sub" && (y.subscript = !0), l === "sup" && (y.superscript = !0), o = o.concat(r(h, y)), u = p + c.length;
    });
    const s = n.slice(u);
    return s && o.push(t(s, a)), o;
  };
  return typeof e != "string" && (e = String(e ?? "")), r(e);
}
function _m(e) {
  if (!(e instanceof Date)) return e;
  if (Number.isNaN(e.getTime())) return "";
  const t = e.getUTCFullYear(), r = String(e.getUTCMonth() + 1).padStart(2, "0"), n = String(e.getUTCDate()).padStart(2, "0");
  return `${t}-${r}-${n}`;
}
function PC(e) {
  return e == null ? e : Array.isArray(e) ? e.map(_m) : _m(e);
}
function Rp({
  children: e,
  bold: t,
  italics: r,
  underline: n,
  color: a,
  size: i,
  font: o,
  smallCaps: u,
  allCaps: s,
  strike: c,
  subscript: l,
  superscript: f,
  style: h,
  role: p,
  ...g
}) {
  const y = e_(), m = ci(a, y), E = ww(o, y), v = h ?? p, T = { "data-type": "text" };
  return t && (T["data-bold"] = "true"), r && (T["data-italics"] = "true"), n && (T["data-underline"] = "true"), m && (T["data-color"] = m), i != null && (T["data-size"] = i), E && (T["data-font"] = E), u && (T["data-smallcaps"] = "true"), s && (T["data-allcaps"] = "true"), c && (T["data-strike"] = "true"), l && (T["data-subscript"] = "true"), f && (T["data-superscript"] = "true"), v && (T["data-style"] = v), /* @__PURE__ */ P("span", { ...T, ...g, children: PC(e) });
}
function IC(e) {
  return !e || typeof e != "string" ? { anchor: null } : e.startsWith("#") ? { anchor: e.slice(1) } : { anchor: null };
}
function CC(e) {
  return e.parts?.length ? e.parts : [{ content: e.content }];
}
function NC({ part: e }) {
  const t = e.href || "", { anchor: r } = IC(t);
  return /* @__PURE__ */ P("a", { ...r !== null ? { "data-type": "internalHyperlink", "data-anchor": r } : { "data-type": "externalHyperlink", "data-link": t }, href: t, children: CC(e).map((a, i) => /* @__PURE__ */ P(
    Rp,
    {
      style: "Hyperlink",
      bold: a.bold,
      italics: a.italics,
      underline: !!a.underline,
      subscript: a.subscript,
      superscript: a.superscript,
      children: a.content
    },
    i
  )) });
}
function RC({ latex: e, display: t = !1, id: r, ...n }) {
  const a = { "data-type": "math" };
  return a["data-latex"] = e || "", a["data-display"] = t ? "true" : "false", r && (a["data-id"] = r), /* @__PURE__ */ P("span", { ...a, ...n });
}
function DC({ tabStops: e, indent: t, role: r }) {
  const n = {};
  return Array.isArray(e) && e.length && (n["data-tab-stops"] = JSON.stringify(e)), t && typeof t == "object" && (t.left != null && (n["data-indent-left"] = t.left), t.right != null && (n["data-indent-right"] = t.right), t.firstLine != null && (n["data-indent-firstline"] = t.firstLine), t.hanging != null && (n["data-indent-hanging"] = t.hanging)), typeof r == "string" && r.length && (n["data-paragraph-style"] = r), n;
}
function Bt({
  as: e = "p",
  data: t,
  tabStops: r,
  indent: n,
  role: a,
  children: i,
  ...o
}) {
  const u = DC({ tabStops: r, indent: n, role: a });
  if (t) {
    const s = wC(t);
    return /* @__PURE__ */ P(e, { "data-type": "paragraph", ...u, ...o, children: s.map((c, l) => c.type === "link" ? /* @__PURE__ */ P(NC, { part: c }, l) : c.type === "math" ? /* @__PURE__ */ P(
      RC,
      {
        latex: c.latex,
        display: c.display,
        id: c.id
      },
      l
    ) : /* @__PURE__ */ P(
      Rp,
      {
        bold: c.bold,
        italics: c.italics,
        underline: !!c.underline,
        subscript: c.subscript,
        superscript: c.superscript,
        children: c.content
      },
      l
    )) });
  }
  return /* @__PURE__ */ P(e, { "data-type": "paragraph", ...u, ...o, children: i });
}
function MC(e, t) {
  if (!e) return e;
  const r = {};
  for (const [n, a] of Object.entries(e))
    a && (r[n] = {
      ...a,
      ...a.color ? { color: ci(a.color, t) } : {}
    });
  return r;
}
const C_ = Vt({ widths: null, borderColor: "cccccc" });
function _a({
  widths: e,
  columnWidths: t,
  layout: r,
  width: n,
  borders: a,
  borderColor: i = "cccccc",
  className: o,
  children: u,
  ...s
}) {
  const c = e_(), l = {};
  t && t.length ? (l["data-table-column-widths"] = t.join(","), l["data-table-layout"] = r || "fixed") : r && (l["data-table-layout"] = r), n && (n.size != null && (l["data-table-width-size"] = n.size), l["data-table-width-type"] = n.type ?? "pct");
  const f = MC(a, c);
  if (f)
    for (const [p, g] of Object.entries(f)) {
      if (!g) continue;
      const y = p === "insideHorizontal" ? "insideh" : p === "insideVertical" ? "insidev" : p;
      g.style && (l[`data-table-borders-${y}-style`] = g.style), g.size != null && (l[`data-table-borders-${y}-size`] = g.size), g.color && (l[`data-table-borders-${y}-color`] = g.color);
    }
  const h = ci(i, c) ?? i;
  return /* @__PURE__ */ P(
    C_.Provider,
    {
      value: { widths: e, borderColor: h, theme: c },
      children: /* @__PURE__ */ P("div", { "data-type": "table", className: o, ...l, ...s, children: u })
    }
  );
}
function rt({ header: e = !1, className: t, children: r, ...n }) {
  let a = 0;
  const i = $r.toArray(r).map((u) => {
    if (!Lt(u)) return u;
    const s = u.props._col ?? a, c = typeof u.props.colSpan == "number" && u.props.colSpan > 1 ? u.props.colSpan : 1;
    return a = s + c, Ue(u, {
      _col: s,
      _header: u.props._header ?? e
    });
  });
  return /* @__PURE__ */ P("div", { "data-type": "tableRow", className: t, ...e ? { "data-row-header": "" } : {}, ...n, children: i });
}
const oo = { top: 80, bottom: 80, left: 120, right: 120 };
function he({
  _col: e = 0,
  _header: t = !1,
  width: r,
  emphasis: n = !1,
  borderBottom: a,
  shading: i,
  valign: o,
  colSpan: u,
  rowSpan: s,
  className: c,
  style: l,
  children: f,
  ...h
}) {
  const { widths: p, borderColor: g, theme: y } = $t(C_), m = r ?? p?.[e], E = {
    "data-type": "tableCell",
    "data-margins-top": oo.top,
    "data-margins-bottom": oo.bottom,
    "data-margins-left": oo.left,
    "data-margins-right": oo.right,
    "data-borders-top-style": "none",
    "data-borders-left-style": "none",
    "data-borders-right-style": "none",
    "data-borders-bottom-style": a ?? "single",
    "data-borders-bottom-size": t ? 6 : 4,
    "data-borders-bottom-color": g
  };
  if (m != null && (E["data-width-size"] = m, E["data-width-type"] = "pct"), i) {
    const b = typeof i == "string" ? { fill: i } : i, _ = ci(b.fill, y), O = ci(b.color, y);
    _ && (E["data-shading-fill"] = _), b.type && (E["data-shading-type"] = b.type), O && (E["data-shading-color"] = O);
  }
  o && (E["data-valign"] = o), typeof u == "number" && u > 1 && (E["data-grid-span"] = u), typeof s == "number" && s > 1 && (E["data-row-span"] = s);
  const v = m != null ? { flex: `${m} ${m} 0%`, minWidth: 0, ...l } : l;
  return /* @__PURE__ */ P("div", { className: c, style: v, ...E, ...h, children: typeof f == "string" || typeof f == "number" ? /* @__PURE__ */ P(Bt, { children: n || t ? /* @__PURE__ */ P(Rp, { bold: !0, children: f }) : f }) : f });
}
function Uu() {
  const t = _p()?.activeWebsite;
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
    localize: (r, n = "") => t.localize(r, n),
    /**
     * Transform a href (handles topic: protocol, etc.)
     * @param {string} href
     * @returns {string}
     */
    makeHref: (r) => t.makeHref(r),
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
function N_(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = N_(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function pe() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = N_(e)) && (n && (n += " "), n += t);
  return n;
}
const LC = [
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
];
function kC(e) {
  if (!e || typeof e != "string") return !1;
  const t = e.toLowerCase();
  return LC.some((r) => t.includes(r));
}
function BC(e, t) {
  return !e || typeof e != "string" || !t || !e.startsWith("/") || e.startsWith("//") || e === t || e.startsWith(t + "/") ? e : t + e;
}
const jC = /(<a\b[^>]*?\shref=)(["'])([^"']*)\2/gi, FC = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;
function $C(e, t) {
  if (!t.hasMultipleLocales?.()) return e;
  const r = t.getActiveLocale?.(), n = t.getDefaultLocale?.();
  if (!r || r === n) return e;
  const a = t.translateRoute ? t.translateRoute(e, r) : e, i = `/${r}`;
  return a === i || a.startsWith(`${i}/`) ? a : a === "/" ? `${i}/` : `${i}${a}`;
}
function UC(e, t, { locale: r = !0 } = {}) {
  if (!e || typeof e != "string" || !t) return e;
  let n = e;
  return (e.startsWith("page:") || e.startsWith("topic:")) && (n = t.makeHref ? t.makeHref(e) : e), FC.test(n) || r && n.startsWith("/") && !kC(n) && (n = $C(n, t)), n;
}
function HC(e, t) {
  return !e || typeof e != "string" || !t ? e : BC(UC(e, t), t.basePath || "");
}
function qC(e, t) {
  if (!e || typeof e != "string" || !t || !e.includes("<a")) return e;
  const r = e.includes("page:") || e.includes("topic:"), n = !!t.hasMultipleLocales?.() && t.getActiveLocale?.() !== t.getDefaultLocale?.();
  return !r && !t.basePath && !n ? e : e.replace(jC, (a, i, o, u) => {
    const s = HC(u, t);
    return s === u ? a : `${i}${o}${s}${o}`;
  });
}
function WC({ value: e, className: t, as: r = "div", ...n }) {
  const { website: a } = Uu(), i = Fr(() => {
    if (!e) return "";
    const o = Array.isArray(e) ? e.join("") : e;
    return qC(o, a);
  }, [e, a]);
  return /* @__PURE__ */ P(
    r,
    {
      className: t,
      dangerouslySetInnerHTML: { __html: i },
      ...n
    }
  );
}
function Am() {
  return { data: null, error: null, loading: !1 };
}
function Om() {
  return { data: null, error: null, loading: !0 };
}
function uo(e) {
  return { data: e, error: null, loading: !1 };
}
function Sm(e, t = null) {
  return { data: t, error: e, loading: !1 };
}
function R_(e) {
  const t = _p()?.activeWebsite ?? null, r = e && t ? ax(e) : null, n = r ? t.dataStore.get(r) : null, [a, i] = ft(
    () => n ? uo(n.data) : r ? Om() : Am()
  );
  return Et(() => {
    if (!r || !t) {
      i(Am());
      return;
    }
    const o = t.dataStore.get(r);
    i(o ? uo(o.data) : Om());
    const u = t.dataStore.subscribe(r, () => {
      const c = t.dataStore.get(r);
      c && i(uo(c.data));
    }), s = new AbortController();
    return t.fetcher.dispatch(e, { website: t, signal: s.signal }).then((c) => {
      if (!s.signal.aborted) {
        if (c?.error) {
          i(Sm(c.error, c.data ?? null));
          return;
        }
        c && "data" in c && i(uo(c.data));
      }
    }).catch((c) => {
      s.signal.aborted || i(Sm(String(c?.message || c)));
    }), () => {
      s.abort(), u();
    };
  }, [r, t]), a;
}
function YC(e) {
  const t = _p()?.activeWebsite;
  if (!t) return null;
  const r = t.config?.queries?.[e];
  if (!r || typeof r != "object") return null;
  const n = r.queryable;
  return !n || typeof n != "object" ? null : n;
}
function zC(e) {
  return e + 1;
}
function fn(e, t) {
  const { website: r } = Uu(), [, n] = tx(zC, 0), i = r.activePage?.state;
  Et(() => {
    if (i)
      return i.subscribe(e, n);
  }, [i, e]);
  const o = i?.has(e) ? i.get(e) : t;
  return [o, (s) => {
    i && i.set(e, typeof s == "function" ? s(o) : s);
  }];
}
const D_ = "academic-metrics/options", Dp = "all-members", M_ = Dp, GC = [
  "members",
  "publications-by-type",
  "publications-by-journal",
  "publications-by-year",
  "publications-list",
  "funding",
  "supervisions"
], KC = {
  members: "Members",
  "publications-by-type": "Publications by type",
  "publications-by-journal": "Publications by journal",
  "publications-by-year": "Publications by year",
  "publications-list": "Publications (list)",
  funding: "Funding",
  supervisions: "Supervisions"
};
function VC(e) {
  return KC[e] || e;
}
const XC = [
  { value: "apa", label: "APA (7th)" },
  { value: "mla", label: "MLA (9th)" },
  { value: "chicago-author-date", label: "Chicago (author–date)" },
  { value: "ieee", label: "IEEE" },
  { value: "vancouver", label: "Vancouver" },
  { value: "harvard", label: "Harvard" },
  { value: "nature", label: "Nature" }
], it = {
  slug: Dp,
  panelWhere: null,
  excludedSections: [],
  dateRange: { start: null, end: null },
  refereedOnly: !1,
  citationStyle: "apa"
};
function QC() {
  if (typeof window > "u") return null;
  try {
    const e = window.localStorage.getItem(D_);
    if (!e) return null;
    const t = JSON.parse(e);
    return {
      slug: t.slug || it.slug,
      panelWhere: t.panelWhere && typeof t.panelWhere == "object" ? t.panelWhere : null,
      excludedSections: Array.isArray(t.excludedSections) ? t.excludedSections : [],
      dateRange: {
        start: t.dateRange?.start != null && t.dateRange?.start !== "" ? Number(t.dateRange.start) : null,
        end: t.dateRange?.end != null && t.dateRange?.end !== "" ? Number(t.dateRange.end) : null
      },
      refereedOnly: !!t.refereedOnly,
      citationStyle: t.citationStyle || it.citationStyle
    };
  } catch {
    return null;
  }
}
function ZC(e) {
  if (typeof window > "u") return;
  const t = {
    slug: e.state.get("slug") ?? it.slug,
    panelWhere: e.state.get("panelWhere") ?? it.panelWhere,
    excludedSections: e.state.get("excludedSections") ?? it.excludedSections,
    dateRange: e.state.get("dateRange") ?? it.dateRange,
    refereedOnly: e.state.get("refereedOnly") ?? it.refereedOnly,
    citationStyle: e.state.get("citationStyle") ?? it.citationStyle
  };
  try {
    window.localStorage.setItem(D_, JSON.stringify(t));
  } catch {
  }
}
const xm = /* @__PURE__ */ new WeakSet(), wm = ["slug", "panelWhere", "excludedSections", "dateRange", "refereedOnly", "citationStyle"];
function JC(e) {
  if (!e || !e.state) return () => {
  };
  if (xm.has(e)) return () => {
  };
  xm.add(e);
  const t = QC() || it;
  for (const a of wm)
    e.state.has(a) || e.state.set(a, t[a]);
  const r = () => ZC(e), n = wm.map((a) => e.state.subscribe(a, r));
  return () => n.forEach((a) => a());
}
function Mp() {
  return fn("slug", it.slug);
}
function Lp() {
  return fn("panelWhere", it.panelWhere);
}
function An(e) {
  const [t] = fn("excludedSections", it.excludedSections);
  return !t.includes(e);
}
function eN() {
  const [e, t] = fn("excludedSections", it.excludedSections);
  return [e, (n) => {
    const a = new Set(e);
    a.has(n) ? a.delete(n) : a.add(n), t([...a]);
  }];
}
function Gi() {
  const [e, t] = fn("dateRange", it.dateRange), [r, n] = fn("refereedOnly", it.refereedOnly), [a, i] = fn("citationStyle", it.citationStyle);
  return [{ dateRange: e, refereedOnly: r, citationStyle: a }, (u) => {
    "dateRange" in u && t(u.dateRange), "refereedOnly" in u && n(u.refereedOnly), "citationStyle" in u && i(u.citationStyle);
  }];
}
function tN(e, t, r) {
  if (t && typeof t == "object" && Object.keys(t).length > 0)
    return { where: t, source: "panel", label: "Custom filter" };
  if (e && e !== Dp) {
    const n = r.find((a) => a.slug === e);
    if (n?.where)
      return { where: n.where, source: "view", label: n.name || e, view: n };
  }
  return { where: null, source: null, label: null, view: null };
}
function zr(e) {
  const [t] = Mp(), [r] = Lp(), n = Fr(
    () => Array.isArray(e?.data?.queries) ? e.data.queries : [],
    [e?.data?.queries]
  ), a = Fr(
    () => Array.isArray(e?.data?.members) ? e.data.members : [],
    [e?.data?.members]
  ), i = Fr(
    () => tN(t, r, n),
    [t, r, n]
  ), { data: o, loading: u } = R_(
    i.where ? { path: "/data/members.json", schema: "members", where: i.where } : null
  );
  return {
    members: i.where ? o || [] : a,
    activeView: i.view,
    activeWhere: i.where,
    activeLabel: i.label,
    totalCount: a.length,
    loading: i.where ? u : !1
  };
}
function k7({ content: e, block: t }) {
  const { members: r, activeView: n, activeLabel: a, totalCount: i } = zr(e), o = Array.isArray(e?.paragraphs) ? e.paragraphs : [], u = r.reduce(
    (h, p) => h + (Array.isArray(p.publications) ? p.publications.length : 0),
    0
  ), s = r.reduce((h, p) => Array.isArray(p.funding) ? h + p.funding.reduce((g, y) => g + (Number(y.amount) || 0), 0) : h, 0), c = r.reduce(
    (h, p) => h + (Array.isArray(p.supervisions) ? p.supervisions.length : 0),
    0
  ), l = e?.title || "Academic Metrics", f = n?.description || a || e?.subtitle || "All members";
  return ct(t, "xlsx", {
    title: "Summary",
    headers: [
      "Report",
      "Population",
      "Matched",
      "Total",
      "Publications",
      "Funding (total)",
      "Supervisions"
    ],
    data: [
      [
        l,
        a || "All members",
        r.length,
        i,
        u,
        s,
        c
      ]
    ],
    numberFormats: [
      "text",
      "text",
      "number",
      "number",
      "number",
      "currency",
      "number"
    ]
  }), ct(
    t,
    "docx",
    /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ P(
        Bt,
        {
          as: "h1",
          data: l,
          "data-heading": "HEADING_1",
          "data-spacing-after": 240
        }
      ),
      /* @__PURE__ */ P(
        Bt,
        {
          data: f,
          "data-spacing-after": 240
        }
      ),
      o.map((h, p) => /* @__PURE__ */ P(Bt, { data: h, "data-spacing-after": 160 }, p))
    ] })
  ), /* @__PURE__ */ ee("section", { className: "cover", children: [
    /* @__PURE__ */ P("h1", { className: "cover-title", children: l }),
    /* @__PURE__ */ P("p", { className: "cover-subtitle", children: f }),
    o.length > 0 && /* @__PURE__ */ P("div", { className: "cover-narrative", children: o.map((h, p) => /* @__PURE__ */ P("p", { dangerouslySetInnerHTML: { __html: h } }, p)) }),
    a && /* @__PURE__ */ ee("p", { className: "cover-population", children: [
      "Population: ",
      /* @__PURE__ */ P("strong", { children: a }),
      " —",
      " ",
      r.length,
      " of ",
      i,
      " members"
    ] }),
    /* @__PURE__ */ ee("div", { className: "cover-meta", role: "list", children: [
      /* @__PURE__ */ P(so, { label: "Members", value: r.length }),
      /* @__PURE__ */ P(so, { label: "Publications", value: u }),
      /* @__PURE__ */ P(so, { label: "Funding", value: rN(s) }),
      /* @__PURE__ */ P(so, { label: "Supervisions", value: c })
    ] })
  ] });
}
function so({ label: e, value: t }) {
  return /* @__PURE__ */ ee("div", { role: "listitem", children: [
    /* @__PURE__ */ P("span", { className: "cover-meta-label", children: e }),
    /* @__PURE__ */ P("span", { className: "cover-meta-value", children: t })
  ] });
}
function rN(e) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(e);
}
var co = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xe(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ls, Pm;
function Tt() {
  if (Pm) return Ls;
  Pm = 1;
  var e = Array.isArray;
  return Ls = e, Ls;
}
var ks, Im;
function L_() {
  if (Im) return ks;
  Im = 1;
  var e = typeof co == "object" && co && co.Object === Object && co;
  return ks = e, ks;
}
var Bs, Cm;
function or() {
  if (Cm) return Bs;
  Cm = 1;
  var e = L_(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return Bs = r, Bs;
}
var js, Nm;
function Ki() {
  if (Nm) return js;
  Nm = 1;
  var e = or(), t = e.Symbol;
  return js = t, js;
}
var Fs, Rm;
function nN() {
  if (Rm) return Fs;
  Rm = 1;
  var e = Ki(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, a = e ? e.toStringTag : void 0;
  function i(o) {
    var u = r.call(o, a), s = o[a];
    try {
      o[a] = void 0;
      var c = !0;
    } catch {
    }
    var l = n.call(o);
    return c && (u ? o[a] = s : delete o[a]), l;
  }
  return Fs = i, Fs;
}
var $s, Dm;
function aN() {
  if (Dm) return $s;
  Dm = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return $s = r, $s;
}
var Us, Mm;
function xr() {
  if (Mm) return Us;
  Mm = 1;
  var e = Ki(), t = nN(), r = aN(), n = "[object Null]", a = "[object Undefined]", i = e ? e.toStringTag : void 0;
  function o(u) {
    return u == null ? u === void 0 ? a : n : i && i in Object(u) ? t(u) : r(u);
  }
  return Us = o, Us;
}
var Hs, Lm;
function wr() {
  if (Lm) return Hs;
  Lm = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return Hs = e, Hs;
}
var qs, km;
function Aa() {
  if (km) return qs;
  km = 1;
  var e = xr(), t = wr(), r = "[object Symbol]";
  function n(a) {
    return typeof a == "symbol" || t(a) && e(a) == r;
  }
  return qs = n, qs;
}
var Ws, Bm;
function kp() {
  if (Bm) return Ws;
  Bm = 1;
  var e = Tt(), t = Aa(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function a(i, o) {
    if (e(i))
      return !1;
    var u = typeof i;
    return u == "number" || u == "symbol" || u == "boolean" || i == null || t(i) ? !0 : n.test(i) || !r.test(i) || o != null && i in Object(o);
  }
  return Ws = a, Ws;
}
var Ys, jm;
function Gr() {
  if (jm) return Ys;
  jm = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return Ys = e, Ys;
}
var zs, Fm;
function Bp() {
  if (Fm) return zs;
  Fm = 1;
  var e = xr(), t = Gr(), r = "[object AsyncFunction]", n = "[object Function]", a = "[object GeneratorFunction]", i = "[object Proxy]";
  function o(u) {
    if (!t(u))
      return !1;
    var s = e(u);
    return s == n || s == a || s == r || s == i;
  }
  return zs = o, zs;
}
var Gs, $m;
function iN() {
  if ($m) return Gs;
  $m = 1;
  var e = or(), t = e["__core-js_shared__"];
  return Gs = t, Gs;
}
var Ks, Um;
function oN() {
  if (Um) return Ks;
  Um = 1;
  var e = iN(), t = (function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  })();
  function r(n) {
    return !!t && t in n;
  }
  return Ks = r, Ks;
}
var Vs, Hm;
function k_() {
  if (Hm) return Vs;
  Hm = 1;
  var e = Function.prototype, t = e.toString;
  function r(n) {
    if (n != null) {
      try {
        return t.call(n);
      } catch {
      }
      try {
        return n + "";
      } catch {
      }
    }
    return "";
  }
  return Vs = r, Vs;
}
var Xs, qm;
function uN() {
  if (qm) return Xs;
  qm = 1;
  var e = Bp(), t = oN(), r = Gr(), n = k_(), a = /[\\^$.*+?()[\]{}|]/g, i = /^\[object .+?Constructor\]$/, o = Function.prototype, u = Object.prototype, s = o.toString, c = u.hasOwnProperty, l = RegExp(
    "^" + s.call(c).replace(a, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function f(h) {
    if (!r(h) || t(h))
      return !1;
    var p = e(h) ? l : i;
    return p.test(n(h));
  }
  return Xs = f, Xs;
}
var Qs, Wm;
function sN() {
  if (Wm) return Qs;
  Wm = 1;
  function e(t, r) {
    return t?.[r];
  }
  return Qs = e, Qs;
}
var Zs, Ym;
function On() {
  if (Ym) return Zs;
  Ym = 1;
  var e = uN(), t = sN();
  function r(n, a) {
    var i = t(n, a);
    return e(i) ? i : void 0;
  }
  return Zs = r, Zs;
}
var Js, zm;
function Hu() {
  if (zm) return Js;
  zm = 1;
  var e = On(), t = e(Object, "create");
  return Js = t, Js;
}
var ec, Gm;
function cN() {
  if (Gm) return ec;
  Gm = 1;
  var e = Hu();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return ec = t, ec;
}
var tc, Km;
function lN() {
  if (Km) return tc;
  Km = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return tc = e, tc;
}
var rc, Vm;
function fN() {
  if (Vm) return rc;
  Vm = 1;
  var e = Hu(), t = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function a(i) {
    var o = this.__data__;
    if (e) {
      var u = o[i];
      return u === t ? void 0 : u;
    }
    return n.call(o, i) ? o[i] : void 0;
  }
  return rc = a, rc;
}
var nc, Xm;
function dN() {
  if (Xm) return nc;
  Xm = 1;
  var e = Hu(), t = Object.prototype, r = t.hasOwnProperty;
  function n(a) {
    var i = this.__data__;
    return e ? i[a] !== void 0 : r.call(i, a);
  }
  return nc = n, nc;
}
var ac, Qm;
function hN() {
  if (Qm) return ac;
  Qm = 1;
  var e = Hu(), t = "__lodash_hash_undefined__";
  function r(n, a) {
    var i = this.__data__;
    return this.size += this.has(n) ? 0 : 1, i[n] = e && a === void 0 ? t : a, this;
  }
  return ac = r, ac;
}
var ic, Zm;
function pN() {
  if (Zm) return ic;
  Zm = 1;
  var e = cN(), t = lN(), r = fN(), n = dN(), a = hN();
  function i(o) {
    var u = -1, s = o == null ? 0 : o.length;
    for (this.clear(); ++u < s; ) {
      var c = o[u];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, ic = i, ic;
}
var oc, Jm;
function mN() {
  if (Jm) return oc;
  Jm = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return oc = e, oc;
}
var uc, ey;
function jp() {
  if (ey) return uc;
  ey = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return uc = e, uc;
}
var sc, ty;
function qu() {
  if (ty) return sc;
  ty = 1;
  var e = jp();
  function t(r, n) {
    for (var a = r.length; a--; )
      if (e(r[a][0], n))
        return a;
    return -1;
  }
  return sc = t, sc;
}
var cc, ry;
function yN() {
  if (ry) return cc;
  ry = 1;
  var e = qu(), t = Array.prototype, r = t.splice;
  function n(a) {
    var i = this.__data__, o = e(i, a);
    if (o < 0)
      return !1;
    var u = i.length - 1;
    return o == u ? i.pop() : r.call(i, o, 1), --this.size, !0;
  }
  return cc = n, cc;
}
var lc, ny;
function bN() {
  if (ny) return lc;
  ny = 1;
  var e = qu();
  function t(r) {
    var n = this.__data__, a = e(n, r);
    return a < 0 ? void 0 : n[a][1];
  }
  return lc = t, lc;
}
var fc, ay;
function gN() {
  if (ay) return fc;
  ay = 1;
  var e = qu();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return fc = t, fc;
}
var dc, iy;
function vN() {
  if (iy) return dc;
  iy = 1;
  var e = qu();
  function t(r, n) {
    var a = this.__data__, i = e(a, r);
    return i < 0 ? (++this.size, a.push([r, n])) : a[i][1] = n, this;
  }
  return dc = t, dc;
}
var hc, oy;
function Wu() {
  if (oy) return hc;
  oy = 1;
  var e = mN(), t = yN(), r = bN(), n = gN(), a = vN();
  function i(o) {
    var u = -1, s = o == null ? 0 : o.length;
    for (this.clear(); ++u < s; ) {
      var c = o[u];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, hc = i, hc;
}
var pc, uy;
function Fp() {
  if (uy) return pc;
  uy = 1;
  var e = On(), t = or(), r = e(t, "Map");
  return pc = r, pc;
}
var mc, sy;
function EN() {
  if (sy) return mc;
  sy = 1;
  var e = pN(), t = Wu(), r = Fp();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return mc = n, mc;
}
var yc, cy;
function TN() {
  if (cy) return yc;
  cy = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return yc = e, yc;
}
var bc, ly;
function Yu() {
  if (ly) return bc;
  ly = 1;
  var e = TN();
  function t(r, n) {
    var a = r.__data__;
    return e(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
  }
  return bc = t, bc;
}
var gc, fy;
function _N() {
  if (fy) return gc;
  fy = 1;
  var e = Yu();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return gc = t, gc;
}
var vc, dy;
function AN() {
  if (dy) return vc;
  dy = 1;
  var e = Yu();
  function t(r) {
    return e(this, r).get(r);
  }
  return vc = t, vc;
}
var Ec, hy;
function ON() {
  if (hy) return Ec;
  hy = 1;
  var e = Yu();
  function t(r) {
    return e(this, r).has(r);
  }
  return Ec = t, Ec;
}
var Tc, py;
function SN() {
  if (py) return Tc;
  py = 1;
  var e = Yu();
  function t(r, n) {
    var a = e(this, r), i = a.size;
    return a.set(r, n), this.size += a.size == i ? 0 : 1, this;
  }
  return Tc = t, Tc;
}
var _c, my;
function $p() {
  if (my) return _c;
  my = 1;
  var e = EN(), t = _N(), r = AN(), n = ON(), a = SN();
  function i(o) {
    var u = -1, s = o == null ? 0 : o.length;
    for (this.clear(); ++u < s; ) {
      var c = o[u];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, _c = i, _c;
}
var Ac, yy;
function B_() {
  if (yy) return Ac;
  yy = 1;
  var e = $p(), t = "Expected a function";
  function r(n, a) {
    if (typeof n != "function" || a != null && typeof a != "function")
      throw new TypeError(t);
    var i = function() {
      var o = arguments, u = a ? a.apply(this, o) : o[0], s = i.cache;
      if (s.has(u))
        return s.get(u);
      var c = n.apply(this, o);
      return i.cache = s.set(u, c) || s, c;
    };
    return i.cache = new (r.Cache || e)(), i;
  }
  return r.Cache = e, Ac = r, Ac;
}
var Oc, by;
function xN() {
  if (by) return Oc;
  by = 1;
  var e = B_(), t = 500;
  function r(n) {
    var a = e(n, function(o) {
      return i.size === t && i.clear(), o;
    }), i = a.cache;
    return a;
  }
  return Oc = r, Oc;
}
var Sc, gy;
function wN() {
  if (gy) return Sc;
  gy = 1;
  var e = xN(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = e(function(a) {
    var i = [];
    return a.charCodeAt(0) === 46 && i.push(""), a.replace(t, function(o, u, s, c) {
      i.push(s ? c.replace(r, "$1") : u || o);
    }), i;
  });
  return Sc = n, Sc;
}
var xc, vy;
function Up() {
  if (vy) return xc;
  vy = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length, i = Array(a); ++n < a; )
      i[n] = r(t[n], n, t);
    return i;
  }
  return xc = e, xc;
}
var wc, Ey;
function PN() {
  if (Ey) return wc;
  Ey = 1;
  var e = Ki(), t = Up(), r = Tt(), n = Aa(), a = e ? e.prototype : void 0, i = a ? a.toString : void 0;
  function o(u) {
    if (typeof u == "string")
      return u;
    if (r(u))
      return t(u, o) + "";
    if (n(u))
      return i ? i.call(u) : "";
    var s = u + "";
    return s == "0" && 1 / u == -1 / 0 ? "-0" : s;
  }
  return wc = o, wc;
}
var Pc, Ty;
function j_() {
  if (Ty) return Pc;
  Ty = 1;
  var e = PN();
  function t(r) {
    return r == null ? "" : e(r);
  }
  return Pc = t, Pc;
}
var Ic, _y;
function F_() {
  if (_y) return Ic;
  _y = 1;
  var e = Tt(), t = kp(), r = wN(), n = j_();
  function a(i, o) {
    return e(i) ? i : t(i, o) ? [i] : r(n(i));
  }
  return Ic = a, Ic;
}
var Cc, Ay;
function zu() {
  if (Ay) return Cc;
  Ay = 1;
  var e = Aa();
  function t(r) {
    if (typeof r == "string" || e(r))
      return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return Cc = t, Cc;
}
var Nc, Oy;
function Hp() {
  if (Oy) return Nc;
  Oy = 1;
  var e = F_(), t = zu();
  function r(n, a) {
    a = e(a, n);
    for (var i = 0, o = a.length; n != null && i < o; )
      n = n[t(a[i++])];
    return i && i == o ? n : void 0;
  }
  return Nc = r, Nc;
}
var Rc, Sy;
function $_() {
  if (Sy) return Rc;
  Sy = 1;
  var e = Hp();
  function t(r, n, a) {
    var i = r == null ? void 0 : e(r, n);
    return i === void 0 ? a : i;
  }
  return Rc = t, Rc;
}
var IN = $_();
const xt = /* @__PURE__ */ xe(IN);
var Dc, xy;
function CN() {
  if (xy) return Dc;
  xy = 1;
  function e(t) {
    return t == null;
  }
  return Dc = e, Dc;
}
var NN = CN();
const me = /* @__PURE__ */ xe(NN);
var Mc, wy;
function RN() {
  if (wy) return Mc;
  wy = 1;
  var e = xr(), t = Tt(), r = wr(), n = "[object String]";
  function a(i) {
    return typeof i == "string" || !t(i) && r(i) && e(i) == n;
  }
  return Mc = a, Mc;
}
var DN = RN();
const yn = /* @__PURE__ */ xe(DN);
var MN = Bp();
const de = /* @__PURE__ */ xe(MN);
var LN = Gr();
const Oa = /* @__PURE__ */ xe(LN);
var lo = { exports: {} }, ve = {};
var Py;
function kN() {
  if (Py) return ve;
  Py = 1;
  var e = /* @__PURE__ */ Symbol.for("react.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), n = /* @__PURE__ */ Symbol.for("react.strict_mode"), a = /* @__PURE__ */ Symbol.for("react.profiler"), i = /* @__PURE__ */ Symbol.for("react.provider"), o = /* @__PURE__ */ Symbol.for("react.context"), u = /* @__PURE__ */ Symbol.for("react.server_context"), s = /* @__PURE__ */ Symbol.for("react.forward_ref"), c = /* @__PURE__ */ Symbol.for("react.suspense"), l = /* @__PURE__ */ Symbol.for("react.suspense_list"), f = /* @__PURE__ */ Symbol.for("react.memo"), h = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.offscreen"), g;
  g = /* @__PURE__ */ Symbol.for("react.module.reference");
  function y(m) {
    if (typeof m == "object" && m !== null) {
      var E = m.$$typeof;
      switch (E) {
        case e:
          switch (m = m.type, m) {
            case r:
            case a:
            case n:
            case c:
            case l:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case u:
                case o:
                case s:
                case h:
                case f:
                case i:
                  return m;
                default:
                  return E;
              }
          }
        case t:
          return E;
      }
    }
  }
  return ve.ContextConsumer = o, ve.ContextProvider = i, ve.Element = e, ve.ForwardRef = s, ve.Fragment = r, ve.Lazy = h, ve.Memo = f, ve.Portal = t, ve.Profiler = a, ve.StrictMode = n, ve.Suspense = c, ve.SuspenseList = l, ve.isAsyncMode = function() {
    return !1;
  }, ve.isConcurrentMode = function() {
    return !1;
  }, ve.isContextConsumer = function(m) {
    return y(m) === o;
  }, ve.isContextProvider = function(m) {
    return y(m) === i;
  }, ve.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, ve.isForwardRef = function(m) {
    return y(m) === s;
  }, ve.isFragment = function(m) {
    return y(m) === r;
  }, ve.isLazy = function(m) {
    return y(m) === h;
  }, ve.isMemo = function(m) {
    return y(m) === f;
  }, ve.isPortal = function(m) {
    return y(m) === t;
  }, ve.isProfiler = function(m) {
    return y(m) === a;
  }, ve.isStrictMode = function(m) {
    return y(m) === n;
  }, ve.isSuspense = function(m) {
    return y(m) === c;
  }, ve.isSuspenseList = function(m) {
    return y(m) === l;
  }, ve.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === r || m === a || m === n || m === c || m === l || m === p || typeof m == "object" && m !== null && (m.$$typeof === h || m.$$typeof === f || m.$$typeof === i || m.$$typeof === o || m.$$typeof === s || m.$$typeof === g || m.getModuleId !== void 0);
  }, ve.typeOf = y, ve;
}
var Ee = {};
var Iy;
function BN() {
  return Iy || (Iy = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = /* @__PURE__ */ Symbol.for("react.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), n = /* @__PURE__ */ Symbol.for("react.strict_mode"), a = /* @__PURE__ */ Symbol.for("react.profiler"), i = /* @__PURE__ */ Symbol.for("react.provider"), o = /* @__PURE__ */ Symbol.for("react.context"), u = /* @__PURE__ */ Symbol.for("react.server_context"), s = /* @__PURE__ */ Symbol.for("react.forward_ref"), c = /* @__PURE__ */ Symbol.for("react.suspense"), l = /* @__PURE__ */ Symbol.for("react.suspense_list"), f = /* @__PURE__ */ Symbol.for("react.memo"), h = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.offscreen"), g = !1, y = !1, m = !1, E = !1, v = !1, T;
    T = /* @__PURE__ */ Symbol.for("react.module.reference");
    function A(X) {
      return !!(typeof X == "string" || typeof X == "function" || X === r || X === a || v || X === n || X === c || X === l || E || X === p || g || y || m || typeof X == "object" && X !== null && (X.$$typeof === h || X.$$typeof === f || X.$$typeof === i || X.$$typeof === o || X.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      X.$$typeof === T || X.getModuleId !== void 0));
    }
    function b(X) {
      if (typeof X == "object" && X !== null) {
        var Pe = X.$$typeof;
        switch (Pe) {
          case e:
            var De = X.type;
            switch (De) {
              case r:
              case a:
              case n:
              case c:
              case l:
                return De;
              default:
                var et = De && De.$$typeof;
                switch (et) {
                  case u:
                  case o:
                  case s:
                  case h:
                  case f:
                  case i:
                    return et;
                  default:
                    return Pe;
                }
            }
          case t:
            return Pe;
        }
      }
    }
    var _ = o, O = i, I = e, N = s, j = r, D = h, R = f, B = t, F = a, $ = n, q = c, Y = l, Q = !1, te = !1;
    function k(X) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(X) {
      return te || (te = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function z(X) {
      return b(X) === o;
    }
    function Z(X) {
      return b(X) === i;
    }
    function ne(X) {
      return typeof X == "object" && X !== null && X.$$typeof === e;
    }
    function oe(X) {
      return b(X) === s;
    }
    function ue(X) {
      return b(X) === r;
    }
    function fe(X) {
      return b(X) === h;
    }
    function ce(X) {
      return b(X) === f;
    }
    function G(X) {
      return b(X) === t;
    }
    function re(X) {
      return b(X) === a;
    }
    function ie(X) {
      return b(X) === n;
    }
    function M(X) {
      return b(X) === c;
    }
    function ye(X) {
      return b(X) === l;
    }
    Ee.ContextConsumer = _, Ee.ContextProvider = O, Ee.Element = I, Ee.ForwardRef = N, Ee.Fragment = j, Ee.Lazy = D, Ee.Memo = R, Ee.Portal = B, Ee.Profiler = F, Ee.StrictMode = $, Ee.Suspense = q, Ee.SuspenseList = Y, Ee.isAsyncMode = k, Ee.isConcurrentMode = W, Ee.isContextConsumer = z, Ee.isContextProvider = Z, Ee.isElement = ne, Ee.isForwardRef = oe, Ee.isFragment = ue, Ee.isLazy = fe, Ee.isMemo = ce, Ee.isPortal = G, Ee.isProfiler = re, Ee.isStrictMode = ie, Ee.isSuspense = M, Ee.isSuspenseList = ye, Ee.isValidElementType = A, Ee.typeOf = b;
  })()), Ee;
}
var Cy;
function jN() {
  return Cy || (Cy = 1, process.env.NODE_ENV === "production" ? lo.exports = kN() : lo.exports = BN()), lo.exports;
}
var FN = jN(), Lc, Ny;
function U_() {
  if (Ny) return Lc;
  Ny = 1;
  var e = xr(), t = wr(), r = "[object Number]";
  function n(a) {
    return typeof a == "number" || t(a) && e(a) == r;
  }
  return Lc = n, Lc;
}
var kc, Ry;
function $N() {
  if (Ry) return kc;
  Ry = 1;
  var e = U_();
  function t(r) {
    return e(r) && r != +r;
  }
  return kc = t, kc;
}
var UN = $N();
const Vi = /* @__PURE__ */ xe(UN);
var HN = U_();
const qN = /* @__PURE__ */ xe(HN);
var dt = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, on = function(t) {
  return yn(t) && t.indexOf("%") === t.length - 1;
}, J = function(t) {
  return qN(t) && !Vi(t);
}, WN = function(t) {
  return me(t);
}, ze = function(t) {
  return J(t) || yn(t);
}, YN = 0, Xi = function(t) {
  var r = ++YN;
  return "".concat(t || "").concat(r);
}, ht = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!J(t) && !yn(t))
    return n;
  var i;
  if (on(t)) {
    var o = t.indexOf("%");
    i = r * parseFloat(t.slice(0, o)) / 100;
  } else
    i = +t;
  return Vi(i) && (i = n), a && i > r && (i = r), i;
}, kr = function(t) {
  if (!t)
    return null;
  var r = Object.keys(t);
  return r && r.length ? t[r[0]] : null;
}, zN = function(t) {
  if (!Array.isArray(t))
    return !1;
  for (var r = t.length, n = {}, a = 0; a < r; a++)
    if (!n[t[a]])
      n[t[a]] = !0;
    else
      return !0;
  return !1;
}, Mr = function(t, r) {
  return J(t) && J(r) ? function(n) {
    return t + n * (r - t);
  } : function() {
    return r;
  };
};
function Jd(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : xt(n, t)) === r;
  });
}
var GN = function(t, r) {
  return J(t) && J(r) ? t - r : yn(t) && yn(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r));
};
function Yn(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r]))
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function eh(e) {
  "@babel/helpers - typeof";
  return eh = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, eh(e);
}
var KN = ["viewBox", "children"], VN = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
], Dy = ["points", "pathLength"], Bc = {
  svg: KN,
  polygon: Dy,
  polyline: Dy
}, qp = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], ko = function(t, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var n = t;
  if (/* @__PURE__ */ Lt(t) && (n = t.props), !Oa(n))
    return null;
  var a = {};
  return Object.keys(n).forEach(function(i) {
    qp.includes(i) && (a[i] = r || function(o) {
      return n[i](n, o);
    });
  }), a;
}, XN = function(t, r, n) {
  return function(a) {
    return t(r, n, a), null;
  };
}, bn = function(t, r, n) {
  if (!Oa(t) || eh(t) !== "object")
    return null;
  var a = null;
  return Object.keys(t).forEach(function(i) {
    var o = t[i];
    qp.includes(i) && typeof o == "function" && (a || (a = {}), a[i] = XN(o, r, n));
  }), a;
}, QN = ["children"], ZN = ["children"];
function My(e, t) {
  if (e == null) return {};
  var r = JN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function JN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var Ly = {
  click: "onClick",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mousemove: "onMouseMove",
  mouseout: "onMouseOut",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  touchcancel: "onTouchCancel",
  touchend: "onTouchEnd",
  touchmove: "onTouchMove",
  touchstart: "onTouchStart",
  contextmenu: "onContextMenu",
  dblclick: "onDoubleClick"
}, vr = function(t) {
  return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
}, ky = null, jc = null, Wp = function e(t) {
  if (t === ky && Array.isArray(jc))
    return jc;
  var r = [];
  return $r.forEach(t, function(n) {
    me(n) || (FN.isFragment(n) ? r = r.concat(e(n.props.children)) : r.push(n));
  }), jc = r, ky = t, r;
};
function jt(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map(function(a) {
    return vr(a);
  }) : n = [vr(t)], Wp(e).forEach(function(a) {
    var i = xt(a, "type.displayName") || xt(a, "type.name");
    n.indexOf(i) !== -1 && r.push(a);
  }), r;
}
function At(e, t) {
  var r = jt(e, t);
  return r && r[0];
}
var By = function(t) {
  if (!t || !t.props)
    return !1;
  var r = t.props, n = r.width, a = r.height;
  return !(!J(n) || n <= 0 || !J(a) || a <= 0);
}, e3 = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], t3 = function(t) {
  return t && t.type && yn(t.type) && e3.indexOf(t.type) >= 0;
}, r3 = function(t, r, n, a) {
  var i, o = (i = Bc?.[a]) !== null && i !== void 0 ? i : [];
  return r.startsWith("data-") || !de(t) && (a && o.includes(r) || VN.includes(r)) || n && qp.includes(r);
}, le = function(t, r, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var a = t;
  if (/* @__PURE__ */ Lt(t) && (a = t.props), !Oa(a))
    return null;
  var i = {};
  return Object.keys(a).forEach(function(o) {
    var u;
    r3((u = a) === null || u === void 0 ? void 0 : u[o], o, r, n) && (i[o] = a[o]);
  }), i;
}, th = function e(t, r) {
  if (t === r)
    return !0;
  var n = $r.count(t);
  if (n !== $r.count(r))
    return !1;
  if (n === 0)
    return !0;
  if (n === 1)
    return jy(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
  for (var a = 0; a < n; a++) {
    var i = t[a], o = r[a];
    if (Array.isArray(i) || Array.isArray(o)) {
      if (!e(i, o))
        return !1;
    } else if (!jy(i, o))
      return !1;
  }
  return !0;
}, jy = function(t, r) {
  if (me(t) && me(r))
    return !0;
  if (!me(t) && !me(r)) {
    var n = t.props || {}, a = n.children, i = My(n, QN), o = r.props || {}, u = o.children, s = My(o, ZN);
    return a && u ? Yn(i, s) && th(a, u) : !a && !u ? Yn(i, s) : !1;
  }
  return !1;
}, Fy = function(t, r) {
  var n = [], a = {};
  return Wp(t).forEach(function(i, o) {
    if (t3(i))
      n.push(i);
    else if (i) {
      var u = vr(i.type), s = r[u] || {}, c = s.handler, l = s.once;
      if (c && (!l || !a[u])) {
        var f = c(i, u, o);
        n.push(f), a[u] = !0;
      }
    }
  }), n;
}, n3 = function(t) {
  var r = t && t.type;
  return r && Ly[r] ? Ly[r] : null;
}, a3 = function(t, r) {
  return Wp(r).indexOf(t);
}, i3 = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function rh() {
  return rh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, rh.apply(this, arguments);
}
function o3(e, t) {
  if (e == null) return {};
  var r = u3(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function u3(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function nh(e) {
  var t = e.children, r = e.width, n = e.height, a = e.viewBox, i = e.className, o = e.style, u = e.title, s = e.desc, c = o3(e, i3), l = a || {
    width: r,
    height: n,
    x: 0,
    y: 0
  }, f = pe("recharts-surface", i);
  return /* @__PURE__ */ C.createElement("svg", rh({}, le(c, !0, "svg"), {
    className: f,
    width: r,
    height: n,
    style: o,
    viewBox: "".concat(l.x, " ").concat(l.y, " ").concat(l.width, " ").concat(l.height)
  }), /* @__PURE__ */ C.createElement("title", null, u), /* @__PURE__ */ C.createElement("desc", null, s), t);
}
var s3 = ["children", "className"];
function ah() {
  return ah = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ah.apply(this, arguments);
}
function c3(e, t) {
  if (e == null) return {};
  var r = l3(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function l3(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var Oe = /* @__PURE__ */ C.forwardRef(function(e, t) {
  var r = e.children, n = e.className, a = c3(e, s3), i = pe("recharts-layer", n);
  return /* @__PURE__ */ C.createElement("g", ah({
    className: i
  }, le(a, !0), {
    ref: t
  }), r);
}), f3 = process.env.NODE_ENV !== "production", zt = function(t, r) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    a[i - 2] = arguments[i];
  if (f3 && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, function() {
        return a[o++];
      }));
    }
}, Fc, $y;
function d3() {
  if ($y) return Fc;
  $y = 1;
  function e(t, r, n) {
    var a = -1, i = t.length;
    r < 0 && (r = -r > i ? 0 : i + r), n = n > i ? i : n, n < 0 && (n += i), i = r > n ? 0 : n - r >>> 0, r >>>= 0;
    for (var o = Array(i); ++a < i; )
      o[a] = t[a + r];
    return o;
  }
  return Fc = e, Fc;
}
var $c, Uy;
function h3() {
  if (Uy) return $c;
  Uy = 1;
  var e = d3();
  function t(r, n, a) {
    var i = r.length;
    return a = a === void 0 ? i : a, !n && a >= i ? r : e(r, n, a);
  }
  return $c = t, $c;
}
var Uc, Hy;
function H_() {
  if (Hy) return Uc;
  Hy = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", a = t + r + n, i = "\\ufe0e\\ufe0f", o = "\\u200d", u = RegExp("[" + o + e + a + i + "]");
  function s(c) {
    return u.test(c);
  }
  return Uc = s, Uc;
}
var Hc, qy;
function p3() {
  if (qy) return Hc;
  qy = 1;
  function e(t) {
    return t.split("");
  }
  return Hc = e, Hc;
}
var qc, Wy;
function m3() {
  if (Wy) return qc;
  Wy = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", a = t + r + n, i = "\\ufe0e\\ufe0f", o = "[" + e + "]", u = "[" + a + "]", s = "\\ud83c[\\udffb-\\udfff]", c = "(?:" + u + "|" + s + ")", l = "[^" + e + "]", f = "(?:\\ud83c[\\udde6-\\uddff]){2}", h = "[\\ud800-\\udbff][\\udc00-\\udfff]", p = "\\u200d", g = c + "?", y = "[" + i + "]?", m = "(?:" + p + "(?:" + [l, f, h].join("|") + ")" + y + g + ")*", E = y + g + m, v = "(?:" + [l + u + "?", u, f, h, o].join("|") + ")", T = RegExp(s + "(?=" + s + ")|" + v + E, "g");
  function A(b) {
    return b.match(T) || [];
  }
  return qc = A, qc;
}
var Wc, Yy;
function y3() {
  if (Yy) return Wc;
  Yy = 1;
  var e = p3(), t = H_(), r = m3();
  function n(a) {
    return t(a) ? r(a) : e(a);
  }
  return Wc = n, Wc;
}
var Yc, zy;
function b3() {
  if (zy) return Yc;
  zy = 1;
  var e = h3(), t = H_(), r = y3(), n = j_();
  function a(i) {
    return function(o) {
      o = n(o);
      var u = t(o) ? r(o) : void 0, s = u ? u[0] : o.charAt(0), c = u ? e(u, 1).join("") : o.slice(1);
      return s[i]() + c;
    };
  }
  return Yc = a, Yc;
}
var zc, Gy;
function g3() {
  if (Gy) return zc;
  Gy = 1;
  var e = b3(), t = e("toUpperCase");
  return zc = t, zc;
}
var v3 = g3();
const Gu = /* @__PURE__ */ xe(v3);
function Ce(e) {
  return function() {
    return e;
  };
}
const q_ = Math.cos, Bo = Math.sin, Qt = Math.sqrt, jo = Math.PI, Ku = 2 * jo, ih = Math.PI, oh = 2 * ih, rn = 1e-6, E3 = oh - rn;
function W_(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function T3(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return W_;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let a = 1, i = n.length; a < i; ++a)
      this._ += Math.round(arguments[a] * r) / r + n[a];
  };
}
class _3 {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? W_ : T3(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, a) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +a}`;
  }
  bezierCurveTo(t, r, n, a, i, o) {
    this._append`C${+t},${+r},${+n},${+a},${this._x1 = +i},${this._y1 = +o}`;
  }
  arcTo(t, r, n, a, i) {
    if (t = +t, r = +r, n = +n, a = +a, i = +i, i < 0) throw new Error(`negative radius: ${i}`);
    let o = this._x1, u = this._y1, s = n - t, c = a - r, l = o - t, f = u - r, h = l * l + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (h > rn) if (!(Math.abs(f * s - c * l) > rn) || !i)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let p = n - o, g = a - u, y = s * s + c * c, m = p * p + g * g, E = Math.sqrt(y), v = Math.sqrt(h), T = i * Math.tan((ih - Math.acos((y + h - m) / (2 * E * v))) / 2), A = T / v, b = T / E;
      Math.abs(A - 1) > rn && this._append`L${t + A * l},${r + A * f}`, this._append`A${i},${i},0,0,${+(f * p > l * g)},${this._x1 = t + b * s},${this._y1 = r + b * c}`;
    }
  }
  arc(t, r, n, a, i, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(a), s = n * Math.sin(a), c = t + u, l = r + s, f = 1 ^ o, h = o ? a - i : i - a;
    this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > rn || Math.abs(this._y1 - l) > rn) && this._append`L${c},${l}`, n && (h < 0 && (h = h % oh + oh), h > E3 ? this._append`A${n},${n},0,1,${f},${t - u},${r - s}A${n},${n},0,1,${f},${this._x1 = c},${this._y1 = l}` : h > rn && this._append`A${n},${n},0,${+(h >= ih)},${f},${this._x1 = t + n * Math.cos(i)},${this._y1 = r + n * Math.sin(i)}`);
  }
  rect(t, r, n, a) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+a}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Yp(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e;
  }, () => new _3(t);
}
function zp(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Y_(e) {
  this._context = e;
}
Y_.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function Vu(e) {
  return new Y_(e);
}
function z_(e) {
  return e[0];
}
function G_(e) {
  return e[1];
}
function K_(e, t) {
  var r = Ce(!0), n = null, a = Vu, i = null, o = Yp(u);
  e = typeof e == "function" ? e : e === void 0 ? z_ : Ce(e), t = typeof t == "function" ? t : t === void 0 ? G_ : Ce(t);
  function u(s) {
    var c, l = (s = zp(s)).length, f, h = !1, p;
    for (n == null && (i = a(p = o())), c = 0; c <= l; ++c)
      !(c < l && r(f = s[c], c, s)) === h && ((h = !h) ? i.lineStart() : i.lineEnd()), h && i.point(+e(f, c, s), +t(f, c, s));
    if (p) return i = null, p + "" || null;
  }
  return u.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : Ce(+s), u) : e;
  }, u.y = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : Ce(+s), u) : t;
  }, u.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : Ce(!!s), u) : r;
  }, u.curve = function(s) {
    return arguments.length ? (a = s, n != null && (i = a(n)), u) : a;
  }, u.context = function(s) {
    return arguments.length ? (s == null ? n = i = null : i = a(n = s), u) : n;
  }, u;
}
function fo(e, t, r) {
  var n = null, a = Ce(!0), i = null, o = Vu, u = null, s = Yp(c);
  e = typeof e == "function" ? e : e === void 0 ? z_ : Ce(+e), t = typeof t == "function" ? t : Ce(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? G_ : Ce(+r);
  function c(f) {
    var h, p, g, y = (f = zp(f)).length, m, E = !1, v, T = new Array(y), A = new Array(y);
    for (i == null && (u = o(v = s())), h = 0; h <= y; ++h) {
      if (!(h < y && a(m = f[h], h, f)) === E)
        if (E = !E)
          p = h, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), g = h - 1; g >= p; --g)
            u.point(T[g], A[g]);
          u.lineEnd(), u.areaEnd();
        }
      E && (T[h] = +e(m, h, f), A[h] = +t(m, h, f), u.point(n ? +n(m, h, f) : T[h], r ? +r(m, h, f) : A[h]));
    }
    if (v) return u = null, v + "" || null;
  }
  function l() {
    return K_().defined(a).curve(o).context(i);
  }
  return c.x = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : Ce(+f), n = null, c) : e;
  }, c.x0 = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : Ce(+f), c) : e;
  }, c.x1 = function(f) {
    return arguments.length ? (n = f == null ? null : typeof f == "function" ? f : Ce(+f), c) : n;
  }, c.y = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : Ce(+f), r = null, c) : t;
  }, c.y0 = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : Ce(+f), c) : t;
  }, c.y1 = function(f) {
    return arguments.length ? (r = f == null ? null : typeof f == "function" ? f : Ce(+f), c) : r;
  }, c.lineX0 = c.lineY0 = function() {
    return l().x(e).y(t);
  }, c.lineY1 = function() {
    return l().x(e).y(r);
  }, c.lineX1 = function() {
    return l().x(n).y(t);
  }, c.defined = function(f) {
    return arguments.length ? (a = typeof f == "function" ? f : Ce(!!f), c) : a;
  }, c.curve = function(f) {
    return arguments.length ? (o = f, i != null && (u = o(i)), c) : o;
  }, c.context = function(f) {
    return arguments.length ? (f == null ? i = u = null : u = o(i = f), c) : i;
  }, c;
}
class V_ {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function A3(e) {
  return new V_(e, !0);
}
function O3(e) {
  return new V_(e, !1);
}
const Gp = {
  draw(e, t) {
    const r = Qt(t / jo);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, Ku);
  }
}, S3 = {
  draw(e, t) {
    const r = Qt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, X_ = Qt(1 / 3), x3 = X_ * 2, w3 = {
  draw(e, t) {
    const r = Qt(t / x3), n = r * X_;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, P3 = {
  draw(e, t) {
    const r = Qt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, I3 = 0.8908130915292852, Q_ = Bo(jo / 10) / Bo(7 * jo / 10), C3 = Bo(Ku / 10) * Q_, N3 = -q_(Ku / 10) * Q_, R3 = {
  draw(e, t) {
    const r = Qt(t * I3), n = C3 * r, a = N3 * r;
    e.moveTo(0, -r), e.lineTo(n, a);
    for (let i = 1; i < 5; ++i) {
      const o = Ku * i / 5, u = q_(o), s = Bo(o);
      e.lineTo(s * r, -u * r), e.lineTo(u * n - s * a, s * n + u * a);
    }
    e.closePath();
  }
}, Gc = Qt(3), D3 = {
  draw(e, t) {
    const r = -Qt(t / (Gc * 3));
    e.moveTo(0, r * 2), e.lineTo(-Gc * r, -r), e.lineTo(Gc * r, -r), e.closePath();
  }
}, Pt = -0.5, It = Qt(3) / 2, uh = 1 / Qt(12), M3 = (uh / 2 + 1) * 3, L3 = {
  draw(e, t) {
    const r = Qt(t / M3), n = r / 2, a = r * uh, i = n, o = r * uh + r, u = -i, s = o;
    e.moveTo(n, a), e.lineTo(i, o), e.lineTo(u, s), e.lineTo(Pt * n - It * a, It * n + Pt * a), e.lineTo(Pt * i - It * o, It * i + Pt * o), e.lineTo(Pt * u - It * s, It * u + Pt * s), e.lineTo(Pt * n + It * a, Pt * a - It * n), e.lineTo(Pt * i + It * o, Pt * o - It * i), e.lineTo(Pt * u + It * s, Pt * s - It * u), e.closePath();
  }
};
function k3(e, t) {
  let r = null, n = Yp(a);
  e = typeof e == "function" ? e : Ce(e || Gp), t = typeof t == "function" ? t : Ce(t === void 0 ? 64 : +t);
  function a() {
    let i;
    if (r || (r = i = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), i) return r = null, i + "" || null;
  }
  return a.type = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : Ce(i), a) : e;
  }, a.size = function(i) {
    return arguments.length ? (t = typeof i == "function" ? i : Ce(+i), a) : t;
  }, a.context = function(i) {
    return arguments.length ? (r = i ?? null, a) : r;
  }, a;
}
function Fo() {
}
function $o(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function Z_(e) {
  this._context = e;
}
Z_.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        $o(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        $o(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function B3(e) {
  return new Z_(e);
}
function J_(e) {
  this._context = e;
}
J_.prototype = {
  areaStart: Fo,
  areaEnd: Fo,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        $o(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function j3(e) {
  return new J_(e);
}
function eA(e) {
  this._context = e;
}
eA.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        $o(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function F3(e) {
  return new eA(e);
}
function tA(e) {
  this._context = e;
}
tA.prototype = {
  areaStart: Fo,
  areaEnd: Fo,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function $3(e) {
  return new tA(e);
}
function Ky(e) {
  return e < 0 ? -1 : 1;
}
function Vy(e, t, r) {
  var n = e._x1 - e._x0, a = t - e._x1, i = (e._y1 - e._y0) / (n || a < 0 && -0), o = (r - e._y1) / (a || n < 0 && -0), u = (i * a + o * n) / (n + a);
  return (Ky(i) + Ky(o)) * Math.min(Math.abs(i), Math.abs(o), 0.5 * Math.abs(u)) || 0;
}
function Xy(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function Kc(e, t, r) {
  var n = e._x0, a = e._y0, i = e._x1, o = e._y1, u = (i - n) / 3;
  e._context.bezierCurveTo(n + u, a + u * t, i - u, o - u * r, i, o);
}
function Uo(e) {
  this._context = e;
}
Uo.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Kc(this, this._t0, Xy(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, Kc(this, Xy(this, r = Vy(this, e, t)), r);
          break;
        default:
          Kc(this, this._t0, r = Vy(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function rA(e) {
  this._context = new nA(e);
}
(rA.prototype = Object.create(Uo.prototype)).point = function(e, t) {
  Uo.prototype.point.call(this, t, e);
};
function nA(e) {
  this._context = e;
}
nA.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, n, a, i) {
    this._context.bezierCurveTo(t, e, n, r, i, a);
  }
};
function U3(e) {
  return new Uo(e);
}
function H3(e) {
  return new rA(e);
}
function aA(e) {
  this._context = e;
}
aA.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var n = Qy(e), a = Qy(t), i = 0, o = 1; o < r; ++i, ++o)
          this._context.bezierCurveTo(n[0][i], a[0][i], n[1][i], a[1][i], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function Qy(e) {
  var t, r = e.length - 1, n, a = new Array(r), i = new Array(r), o = new Array(r);
  for (a[0] = 0, i[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) a[t] = 1, i[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (a[r - 1] = 2, i[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = a[t] / i[t - 1], i[t] -= n, o[t] -= n * o[t - 1];
  for (a[r - 1] = o[r - 1] / i[r - 1], t = r - 2; t >= 0; --t) a[t] = (o[t] - a[t + 1]) / i[t];
  for (i[r - 1] = (e[r] + a[r - 1]) / 2, t = 0; t < r - 1; ++t) i[t] = 2 * e[t + 1] - a[t + 1];
  return [a, i];
}
function q3(e) {
  return new aA(e);
}
function Xu(e, t) {
  this._context = e, this._t = t;
}
Xu.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function W3(e) {
  return new Xu(e, 0.5);
}
function Y3(e) {
  return new Xu(e, 0);
}
function z3(e) {
  return new Xu(e, 1);
}
function Qn(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, a, i = e[t[0]], o, u = i.length; r < o; ++r)
      for (a = i, i = e[t[r]], n = 0; n < u; ++n)
        i[n][1] += i[n][0] = isNaN(a[n][1]) ? a[n][0] : a[n][1];
}
function sh(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function G3(e, t) {
  return e[t];
}
function K3(e) {
  const t = [];
  return t.key = e, t;
}
function V3() {
  var e = Ce([]), t = sh, r = Qn, n = G3;
  function a(i) {
    var o = Array.from(e.apply(this, arguments), K3), u, s = o.length, c = -1, l;
    for (const f of i)
      for (u = 0, ++c; u < s; ++u)
        (o[u][c] = [0, +n(f, o[u].key, c, i)]).data = f;
    for (u = 0, l = zp(t(o)); u < s; ++u)
      o[l[u]].index = u;
    return r(o, l), o;
  }
  return a.keys = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : Ce(Array.from(i)), a) : e;
  }, a.value = function(i) {
    return arguments.length ? (n = typeof i == "function" ? i : Ce(+i), a) : n;
  }, a.order = function(i) {
    return arguments.length ? (t = i == null ? sh : typeof i == "function" ? i : Ce(Array.from(i)), a) : t;
  }, a.offset = function(i) {
    return arguments.length ? (r = i ?? Qn, a) : r;
  }, a;
}
function X3(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, a = 0, i = e[0].length, o; a < i; ++a) {
      for (o = r = 0; r < n; ++r) o += e[r][a][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][a][1] /= o;
    }
    Qn(e, t);
  }
}
function Q3(e, t) {
  if ((a = e.length) > 0) {
    for (var r = 0, n = e[t[0]], a, i = n.length; r < i; ++r) {
      for (var o = 0, u = 0; o < a; ++o) u += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2;
    }
    Qn(e, t);
  }
}
function Z3(e, t) {
  if (!(!((o = e.length) > 0) || !((i = (a = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, a, i, o; n < i; ++n) {
      for (var u = 0, s = 0, c = 0; u < o; ++u) {
        for (var l = e[t[u]], f = l[n][1] || 0, h = l[n - 1][1] || 0, p = (f - h) / 2, g = 0; g < u; ++g) {
          var y = e[t[g]], m = y[n][1] || 0, E = y[n - 1][1] || 0;
          p += m - E;
        }
        s += f, c += p * f;
      }
      a[n - 1][1] += a[n - 1][0] = r, s && (r -= c / s);
    }
    a[n - 1][1] += a[n - 1][0] = r, Qn(e, t);
  }
}
function fi(e) {
  "@babel/helpers - typeof";
  return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fi(e);
}
var J3 = ["type", "size", "sizeType"];
function ch() {
  return ch = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ch.apply(this, arguments);
}
function Zy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zy(Object(r), !0).forEach(function(n) {
      eR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eR(e, t, r) {
  return t = tR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tR(e) {
  var t = rR(e, "string");
  return fi(t) == "symbol" ? t : t + "";
}
function rR(e, t) {
  if (fi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function nR(e, t) {
  if (e == null) return {};
  var r = aR(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function aR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var iA = {
  symbolCircle: Gp,
  symbolCross: S3,
  symbolDiamond: w3,
  symbolSquare: P3,
  symbolStar: R3,
  symbolTriangle: D3,
  symbolWye: L3
}, iR = Math.PI / 180, oR = function(t) {
  var r = "symbol".concat(Gu(t));
  return iA[r] || Gp;
}, uR = function(t, r, n) {
  if (r === "area")
    return t;
  switch (n) {
    case "cross":
      return 5 * t * t / 9;
    case "diamond":
      return 0.5 * t * t / Math.sqrt(3);
    case "square":
      return t * t;
    case "star": {
      var a = 18 * iR;
      return 1.25 * t * t * (Math.tan(a) - Math.tan(a * 2) * Math.pow(Math.tan(a), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, sR = function(t, r) {
  iA["symbol".concat(Gu(t))] = r;
}, Kp = function(t) {
  var r = t.type, n = r === void 0 ? "circle" : r, a = t.size, i = a === void 0 ? 64 : a, o = t.sizeType, u = o === void 0 ? "area" : o, s = nR(t, J3), c = Jy(Jy({}, s), {}, {
    type: n,
    size: i,
    sizeType: u
  }), l = function() {
    var m = oR(n), E = k3().type(m).size(uR(i, u, n));
    return E();
  }, f = c.className, h = c.cx, p = c.cy, g = le(c, !0);
  return h === +h && p === +p && i === +i ? /* @__PURE__ */ C.createElement("path", ch({}, g, {
    className: pe("recharts-symbols", f),
    transform: "translate(".concat(h, ", ").concat(p, ")"),
    d: l()
  })) : null;
};
Kp.registerSymbol = sR;
function Zn(e) {
  "@babel/helpers - typeof";
  return Zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Zn(e);
}
function lh() {
  return lh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, lh.apply(this, arguments);
}
function eb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function cR(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eb(Object(r), !0).forEach(function(n) {
      di(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function lR(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function fR(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, uA(n.key), n);
  }
}
function dR(e, t, r) {
  return t && fR(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function hR(e, t, r) {
  return t = Ho(t), pR(e, oA() ? Reflect.construct(t, r || [], Ho(e).constructor) : t.apply(e, r));
}
function pR(e, t) {
  if (t && (Zn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return mR(e);
}
function mR(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function oA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (oA = function() {
    return !!e;
  })();
}
function Ho(e) {
  return Ho = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ho(e);
}
function yR(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fh(e, t);
}
function fh(e, t) {
  return fh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, fh(e, t);
}
function di(e, t, r) {
  return t = uA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uA(e) {
  var t = bR(e, "string");
  return Zn(t) == "symbol" ? t : t + "";
}
function bR(e, t) {
  if (Zn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Zn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ct = 32, Vp = /* @__PURE__ */ (function(e) {
  function t() {
    return lR(this, t), hR(this, t, arguments);
  }
  return yR(t, e), dR(t, [{
    key: "renderIcon",
    value: (
      /**
       * Render the path of icon
       * @param {Object} data Data of each legend item
       * @return {String} Path element
       */
      function(n) {
        var a = this.props.inactiveColor, i = Ct / 2, o = Ct / 6, u = Ct / 3, s = n.inactive ? a : n.color;
        if (n.type === "plainline")
          return /* @__PURE__ */ C.createElement("line", {
            strokeWidth: 4,
            fill: "none",
            stroke: s,
            strokeDasharray: n.payload.strokeDasharray,
            x1: 0,
            y1: i,
            x2: Ct,
            y2: i,
            className: "recharts-legend-icon"
          });
        if (n.type === "line")
          return /* @__PURE__ */ C.createElement("path", {
            strokeWidth: 4,
            fill: "none",
            stroke: s,
            d: "M0,".concat(i, "h").concat(u, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(2 * u, ",").concat(i, `
            H`).concat(Ct, "M").concat(2 * u, ",").concat(i, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(u, ",").concat(i),
            className: "recharts-legend-icon"
          });
        if (n.type === "rect")
          return /* @__PURE__ */ C.createElement("path", {
            stroke: "none",
            fill: s,
            d: "M0,".concat(Ct / 8, "h").concat(Ct, "v").concat(Ct * 3 / 4, "h").concat(-Ct, "z"),
            className: "recharts-legend-icon"
          });
        if (/* @__PURE__ */ C.isValidElement(n.legendIcon)) {
          var c = cR({}, n);
          return delete c.legendIcon, /* @__PURE__ */ C.cloneElement(n.legendIcon, c);
        }
        return /* @__PURE__ */ C.createElement(Kp, {
          fill: s,
          cx: i,
          cy: i,
          size: Ct,
          sizeType: "diameter",
          type: n.type
        });
      }
    )
    /**
     * Draw items of legend
     * @return {ReactElement} Items
     */
  }, {
    key: "renderItems",
    value: function() {
      var n = this, a = this.props, i = a.payload, o = a.iconSize, u = a.layout, s = a.formatter, c = a.inactiveColor, l = {
        x: 0,
        y: 0,
        width: Ct,
        height: Ct
      }, f = {
        display: u === "horizontal" ? "inline-block" : "block",
        marginRight: 10
      }, h = {
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 4
      };
      return i.map(function(p, g) {
        var y = p.formatter || s, m = pe(di(di({
          "recharts-legend-item": !0
        }, "legend-item-".concat(g), !0), "inactive", p.inactive));
        if (p.type === "none")
          return null;
        var E = de(p.value) ? null : p.value;
        zt(
          !de(p.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var v = p.inactive ? c : p.color;
        return /* @__PURE__ */ C.createElement("li", lh({
          className: m,
          style: f,
          key: "legend-item-".concat(g)
        }, bn(n.props, p, g)), /* @__PURE__ */ C.createElement(nh, {
          width: o,
          height: o,
          viewBox: l,
          style: h
        }, n.renderIcon(p)), /* @__PURE__ */ C.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: v
          }
        }, y ? y(E, p, g) : E));
      });
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.payload, i = n.layout, o = n.align;
      if (!a || !a.length)
        return null;
      var u = {
        padding: 0,
        margin: 0,
        textAlign: i === "horizontal" ? o : "left"
      };
      return /* @__PURE__ */ C.createElement("ul", {
        className: "recharts-default-legend",
        style: u
      }, this.renderItems());
    }
  }]);
})(ir);
di(Vp, "displayName", "Legend");
di(Vp, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Vc, tb;
function gR() {
  if (tb) return Vc;
  tb = 1;
  var e = Wu();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return Vc = t, Vc;
}
var Xc, rb;
function vR() {
  if (rb) return Xc;
  rb = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return Xc = e, Xc;
}
var Qc, nb;
function ER() {
  if (nb) return Qc;
  nb = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return Qc = e, Qc;
}
var Zc, ab;
function TR() {
  if (ab) return Zc;
  ab = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Zc = e, Zc;
}
var Jc, ib;
function _R() {
  if (ib) return Jc;
  ib = 1;
  var e = Wu(), t = Fp(), r = $p(), n = 200;
  function a(i, o) {
    var u = this.__data__;
    if (u instanceof e) {
      var s = u.__data__;
      if (!t || s.length < n - 1)
        return s.push([i, o]), this.size = ++u.size, this;
      u = this.__data__ = new r(s);
    }
    return u.set(i, o), this.size = u.size, this;
  }
  return Jc = a, Jc;
}
var el, ob;
function sA() {
  if (ob) return el;
  ob = 1;
  var e = Wu(), t = gR(), r = vR(), n = ER(), a = TR(), i = _R();
  function o(u) {
    var s = this.__data__ = new e(u);
    this.size = s.size;
  }
  return o.prototype.clear = t, o.prototype.delete = r, o.prototype.get = n, o.prototype.has = a, o.prototype.set = i, el = o, el;
}
var tl, ub;
function AR() {
  if (ub) return tl;
  ub = 1;
  var e = "__lodash_hash_undefined__";
  function t(r) {
    return this.__data__.set(r, e), this;
  }
  return tl = t, tl;
}
var rl, sb;
function OR() {
  if (sb) return rl;
  sb = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return rl = e, rl;
}
var nl, cb;
function cA() {
  if (cb) return nl;
  cb = 1;
  var e = $p(), t = AR(), r = OR();
  function n(a) {
    var i = -1, o = a == null ? 0 : a.length;
    for (this.__data__ = new e(); ++i < o; )
      this.add(a[i]);
  }
  return n.prototype.add = n.prototype.push = t, n.prototype.has = r, nl = n, nl;
}
var al, lb;
function lA() {
  if (lb) return al;
  lb = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length; ++n < a; )
      if (r(t[n], n, t))
        return !0;
    return !1;
  }
  return al = e, al;
}
var il, fb;
function fA() {
  if (fb) return il;
  fb = 1;
  function e(t, r) {
    return t.has(r);
  }
  return il = e, il;
}
var ol, db;
function dA() {
  if (db) return ol;
  db = 1;
  var e = cA(), t = lA(), r = fA(), n = 1, a = 2;
  function i(o, u, s, c, l, f) {
    var h = s & n, p = o.length, g = u.length;
    if (p != g && !(h && g > p))
      return !1;
    var y = f.get(o), m = f.get(u);
    if (y && m)
      return y == u && m == o;
    var E = -1, v = !0, T = s & a ? new e() : void 0;
    for (f.set(o, u), f.set(u, o); ++E < p; ) {
      var A = o[E], b = u[E];
      if (c)
        var _ = h ? c(b, A, E, u, o, f) : c(A, b, E, o, u, f);
      if (_ !== void 0) {
        if (_)
          continue;
        v = !1;
        break;
      }
      if (T) {
        if (!t(u, function(O, I) {
          if (!r(T, I) && (A === O || l(A, O, s, c, f)))
            return T.push(I);
        })) {
          v = !1;
          break;
        }
      } else if (!(A === b || l(A, b, s, c, f))) {
        v = !1;
        break;
      }
    }
    return f.delete(o), f.delete(u), v;
  }
  return ol = i, ol;
}
var ul, hb;
function SR() {
  if (hb) return ul;
  hb = 1;
  var e = or(), t = e.Uint8Array;
  return ul = t, ul;
}
var sl, pb;
function xR() {
  if (pb) return sl;
  pb = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(a, i) {
      n[++r] = [i, a];
    }), n;
  }
  return sl = e, sl;
}
var cl, mb;
function Xp() {
  if (mb) return cl;
  mb = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(a) {
      n[++r] = a;
    }), n;
  }
  return cl = e, cl;
}
var ll, yb;
function wR() {
  if (yb) return ll;
  yb = 1;
  var e = Ki(), t = SR(), r = jp(), n = dA(), a = xR(), i = Xp(), o = 1, u = 2, s = "[object Boolean]", c = "[object Date]", l = "[object Error]", f = "[object Map]", h = "[object Number]", p = "[object RegExp]", g = "[object Set]", y = "[object String]", m = "[object Symbol]", E = "[object ArrayBuffer]", v = "[object DataView]", T = e ? e.prototype : void 0, A = T ? T.valueOf : void 0;
  function b(_, O, I, N, j, D, R) {
    switch (I) {
      case v:
        if (_.byteLength != O.byteLength || _.byteOffset != O.byteOffset)
          return !1;
        _ = _.buffer, O = O.buffer;
      case E:
        return !(_.byteLength != O.byteLength || !D(new t(_), new t(O)));
      case s:
      case c:
      case h:
        return r(+_, +O);
      case l:
        return _.name == O.name && _.message == O.message;
      case p:
      case y:
        return _ == O + "";
      case f:
        var B = a;
      case g:
        var F = N & o;
        if (B || (B = i), _.size != O.size && !F)
          return !1;
        var $ = R.get(_);
        if ($)
          return $ == O;
        N |= u, R.set(_, O);
        var q = n(B(_), B(O), N, j, D, R);
        return R.delete(_), q;
      case m:
        if (A)
          return A.call(_) == A.call(O);
    }
    return !1;
  }
  return ll = b, ll;
}
var fl, bb;
function hA() {
  if (bb) return fl;
  bb = 1;
  function e(t, r) {
    for (var n = -1, a = r.length, i = t.length; ++n < a; )
      t[i + n] = r[n];
    return t;
  }
  return fl = e, fl;
}
var dl, gb;
function PR() {
  if (gb) return dl;
  gb = 1;
  var e = hA(), t = Tt();
  function r(n, a, i) {
    var o = a(n);
    return t(n) ? o : e(o, i(n));
  }
  return dl = r, dl;
}
var hl, vb;
function IR() {
  if (vb) return hl;
  vb = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length, i = 0, o = []; ++n < a; ) {
      var u = t[n];
      r(u, n, t) && (o[i++] = u);
    }
    return o;
  }
  return hl = e, hl;
}
var pl, Eb;
function CR() {
  if (Eb) return pl;
  Eb = 1;
  function e() {
    return [];
  }
  return pl = e, pl;
}
var ml, Tb;
function NR() {
  if (Tb) return ml;
  Tb = 1;
  var e = IR(), t = CR(), r = Object.prototype, n = r.propertyIsEnumerable, a = Object.getOwnPropertySymbols, i = a ? function(o) {
    return o == null ? [] : (o = Object(o), e(a(o), function(u) {
      return n.call(o, u);
    }));
  } : t;
  return ml = i, ml;
}
var yl, _b;
function RR() {
  if (_b) return yl;
  _b = 1;
  function e(t, r) {
    for (var n = -1, a = Array(t); ++n < t; )
      a[n] = r(n);
    return a;
  }
  return yl = e, yl;
}
var bl, Ab;
function DR() {
  if (Ab) return bl;
  Ab = 1;
  var e = xr(), t = wr(), r = "[object Arguments]";
  function n(a) {
    return t(a) && e(a) == r;
  }
  return bl = n, bl;
}
var gl, Ob;
function Qp() {
  if (Ob) return gl;
  Ob = 1;
  var e = DR(), t = wr(), r = Object.prototype, n = r.hasOwnProperty, a = r.propertyIsEnumerable, i = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(o) {
    return t(o) && n.call(o, "callee") && !a.call(o, "callee");
  };
  return gl = i, gl;
}
var za = { exports: {} }, vl, Sb;
function MR() {
  if (Sb) return vl;
  Sb = 1;
  function e() {
    return !1;
  }
  return vl = e, vl;
}
za.exports;
var xb;
function pA() {
  return xb || (xb = 1, (function(e, t) {
    var r = or(), n = MR(), a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, o = i && i.exports === a, u = o ? r.Buffer : void 0, s = u ? u.isBuffer : void 0, c = s || n;
    e.exports = c;
  })(za, za.exports)), za.exports;
}
var El, wb;
function Zp() {
  if (wb) return El;
  wb = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function r(n, a) {
    var i = typeof n;
    return a = a ?? e, !!a && (i == "number" || i != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < a;
  }
  return El = r, El;
}
var Tl, Pb;
function Jp() {
  if (Pb) return Tl;
  Pb = 1;
  var e = 9007199254740991;
  function t(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
  }
  return Tl = t, Tl;
}
var _l, Ib;
function LR() {
  if (Ib) return _l;
  Ib = 1;
  var e = xr(), t = Jp(), r = wr(), n = "[object Arguments]", a = "[object Array]", i = "[object Boolean]", o = "[object Date]", u = "[object Error]", s = "[object Function]", c = "[object Map]", l = "[object Number]", f = "[object Object]", h = "[object RegExp]", p = "[object Set]", g = "[object String]", y = "[object WeakMap]", m = "[object ArrayBuffer]", E = "[object DataView]", v = "[object Float32Array]", T = "[object Float64Array]", A = "[object Int8Array]", b = "[object Int16Array]", _ = "[object Int32Array]", O = "[object Uint8Array]", I = "[object Uint8ClampedArray]", N = "[object Uint16Array]", j = "[object Uint32Array]", D = {};
  D[v] = D[T] = D[A] = D[b] = D[_] = D[O] = D[I] = D[N] = D[j] = !0, D[n] = D[a] = D[m] = D[i] = D[E] = D[o] = D[u] = D[s] = D[c] = D[l] = D[f] = D[h] = D[p] = D[g] = D[y] = !1;
  function R(B) {
    return r(B) && t(B.length) && !!D[e(B)];
  }
  return _l = R, _l;
}
var Al, Cb;
function mA() {
  if (Cb) return Al;
  Cb = 1;
  function e(t) {
    return function(r) {
      return t(r);
    };
  }
  return Al = e, Al;
}
var Ga = { exports: {} };
Ga.exports;
var Nb;
function kR() {
  return Nb || (Nb = 1, (function(e, t) {
    var r = L_(), n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, i = a && a.exports === n, o = i && r.process, u = (function() {
      try {
        var s = a && a.require && a.require("util").types;
        return s || o && o.binding && o.binding("util");
      } catch {
      }
    })();
    e.exports = u;
  })(Ga, Ga.exports)), Ga.exports;
}
var Ol, Rb;
function yA() {
  if (Rb) return Ol;
  Rb = 1;
  var e = LR(), t = mA(), r = kR(), n = r && r.isTypedArray, a = n ? t(n) : e;
  return Ol = a, Ol;
}
var Sl, Db;
function BR() {
  if (Db) return Sl;
  Db = 1;
  var e = RR(), t = Qp(), r = Tt(), n = pA(), a = Zp(), i = yA(), o = Object.prototype, u = o.hasOwnProperty;
  function s(c, l) {
    var f = r(c), h = !f && t(c), p = !f && !h && n(c), g = !f && !h && !p && i(c), y = f || h || p || g, m = y ? e(c.length, String) : [], E = m.length;
    for (var v in c)
      (l || u.call(c, v)) && !(y && // Safari 9 has enumerable `arguments.length` in strict mode.
      (v == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      p && (v == "offset" || v == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      g && (v == "buffer" || v == "byteLength" || v == "byteOffset") || // Skip index properties.
      a(v, E))) && m.push(v);
    return m;
  }
  return Sl = s, Sl;
}
var xl, Mb;
function jR() {
  if (Mb) return xl;
  Mb = 1;
  var e = Object.prototype;
  function t(r) {
    var n = r && r.constructor, a = typeof n == "function" && n.prototype || e;
    return r === a;
  }
  return xl = t, xl;
}
var wl, Lb;
function bA() {
  if (Lb) return wl;
  Lb = 1;
  function e(t, r) {
    return function(n) {
      return t(r(n));
    };
  }
  return wl = e, wl;
}
var Pl, kb;
function FR() {
  if (kb) return Pl;
  kb = 1;
  var e = bA(), t = e(Object.keys, Object);
  return Pl = t, Pl;
}
var Il, Bb;
function $R() {
  if (Bb) return Il;
  Bb = 1;
  var e = jR(), t = FR(), r = Object.prototype, n = r.hasOwnProperty;
  function a(i) {
    if (!e(i))
      return t(i);
    var o = [];
    for (var u in Object(i))
      n.call(i, u) && u != "constructor" && o.push(u);
    return o;
  }
  return Il = a, Il;
}
var Cl, jb;
function Qi() {
  if (jb) return Cl;
  jb = 1;
  var e = Bp(), t = Jp();
  function r(n) {
    return n != null && t(n.length) && !e(n);
  }
  return Cl = r, Cl;
}
var Nl, Fb;
function Qu() {
  if (Fb) return Nl;
  Fb = 1;
  var e = BR(), t = $R(), r = Qi();
  function n(a) {
    return r(a) ? e(a) : t(a);
  }
  return Nl = n, Nl;
}
var Rl, $b;
function UR() {
  if ($b) return Rl;
  $b = 1;
  var e = PR(), t = NR(), r = Qu();
  function n(a) {
    return e(a, r, t);
  }
  return Rl = n, Rl;
}
var Dl, Ub;
function HR() {
  if (Ub) return Dl;
  Ub = 1;
  var e = UR(), t = 1, r = Object.prototype, n = r.hasOwnProperty;
  function a(i, o, u, s, c, l) {
    var f = u & t, h = e(i), p = h.length, g = e(o), y = g.length;
    if (p != y && !f)
      return !1;
    for (var m = p; m--; ) {
      var E = h[m];
      if (!(f ? E in o : n.call(o, E)))
        return !1;
    }
    var v = l.get(i), T = l.get(o);
    if (v && T)
      return v == o && T == i;
    var A = !0;
    l.set(i, o), l.set(o, i);
    for (var b = f; ++m < p; ) {
      E = h[m];
      var _ = i[E], O = o[E];
      if (s)
        var I = f ? s(O, _, E, o, i, l) : s(_, O, E, i, o, l);
      if (!(I === void 0 ? _ === O || c(_, O, u, s, l) : I)) {
        A = !1;
        break;
      }
      b || (b = E == "constructor");
    }
    if (A && !b) {
      var N = i.constructor, j = o.constructor;
      N != j && "constructor" in i && "constructor" in o && !(typeof N == "function" && N instanceof N && typeof j == "function" && j instanceof j) && (A = !1);
    }
    return l.delete(i), l.delete(o), A;
  }
  return Dl = a, Dl;
}
var Ml, Hb;
function qR() {
  if (Hb) return Ml;
  Hb = 1;
  var e = On(), t = or(), r = e(t, "DataView");
  return Ml = r, Ml;
}
var Ll, qb;
function WR() {
  if (qb) return Ll;
  qb = 1;
  var e = On(), t = or(), r = e(t, "Promise");
  return Ll = r, Ll;
}
var kl, Wb;
function gA() {
  if (Wb) return kl;
  Wb = 1;
  var e = On(), t = or(), r = e(t, "Set");
  return kl = r, kl;
}
var Bl, Yb;
function YR() {
  if (Yb) return Bl;
  Yb = 1;
  var e = On(), t = or(), r = e(t, "WeakMap");
  return Bl = r, Bl;
}
var jl, zb;
function zR() {
  if (zb) return jl;
  zb = 1;
  var e = qR(), t = Fp(), r = WR(), n = gA(), a = YR(), i = xr(), o = k_(), u = "[object Map]", s = "[object Object]", c = "[object Promise]", l = "[object Set]", f = "[object WeakMap]", h = "[object DataView]", p = o(e), g = o(t), y = o(r), m = o(n), E = o(a), v = i;
  return (e && v(new e(new ArrayBuffer(1))) != h || t && v(new t()) != u || r && v(r.resolve()) != c || n && v(new n()) != l || a && v(new a()) != f) && (v = function(T) {
    var A = i(T), b = A == s ? T.constructor : void 0, _ = b ? o(b) : "";
    if (_)
      switch (_) {
        case p:
          return h;
        case g:
          return u;
        case y:
          return c;
        case m:
          return l;
        case E:
          return f;
      }
    return A;
  }), jl = v, jl;
}
var Fl, Gb;
function GR() {
  if (Gb) return Fl;
  Gb = 1;
  var e = sA(), t = dA(), r = wR(), n = HR(), a = zR(), i = Tt(), o = pA(), u = yA(), s = 1, c = "[object Arguments]", l = "[object Array]", f = "[object Object]", h = Object.prototype, p = h.hasOwnProperty;
  function g(y, m, E, v, T, A) {
    var b = i(y), _ = i(m), O = b ? l : a(y), I = _ ? l : a(m);
    O = O == c ? f : O, I = I == c ? f : I;
    var N = O == f, j = I == f, D = O == I;
    if (D && o(y)) {
      if (!o(m))
        return !1;
      b = !0, N = !1;
    }
    if (D && !N)
      return A || (A = new e()), b || u(y) ? t(y, m, E, v, T, A) : r(y, m, O, E, v, T, A);
    if (!(E & s)) {
      var R = N && p.call(y, "__wrapped__"), B = j && p.call(m, "__wrapped__");
      if (R || B) {
        var F = R ? y.value() : y, $ = B ? m.value() : m;
        return A || (A = new e()), T(F, $, E, v, A);
      }
    }
    return D ? (A || (A = new e()), n(y, m, E, v, T, A)) : !1;
  }
  return Fl = g, Fl;
}
var $l, Kb;
function e0() {
  if (Kb) return $l;
  Kb = 1;
  var e = GR(), t = wr();
  function r(n, a, i, o, u) {
    return n === a ? !0 : n == null || a == null || !t(n) && !t(a) ? n !== n && a !== a : e(n, a, i, o, r, u);
  }
  return $l = r, $l;
}
var Ul, Vb;
function KR() {
  if (Vb) return Ul;
  Vb = 1;
  var e = sA(), t = e0(), r = 1, n = 2;
  function a(i, o, u, s) {
    var c = u.length, l = c, f = !s;
    if (i == null)
      return !l;
    for (i = Object(i); c--; ) {
      var h = u[c];
      if (f && h[2] ? h[1] !== i[h[0]] : !(h[0] in i))
        return !1;
    }
    for (; ++c < l; ) {
      h = u[c];
      var p = h[0], g = i[p], y = h[1];
      if (f && h[2]) {
        if (g === void 0 && !(p in i))
          return !1;
      } else {
        var m = new e();
        if (s)
          var E = s(g, y, p, i, o, m);
        if (!(E === void 0 ? t(y, g, r | n, s, m) : E))
          return !1;
      }
    }
    return !0;
  }
  return Ul = a, Ul;
}
var Hl, Xb;
function vA() {
  if (Xb) return Hl;
  Xb = 1;
  var e = Gr();
  function t(r) {
    return r === r && !e(r);
  }
  return Hl = t, Hl;
}
var ql, Qb;
function VR() {
  if (Qb) return ql;
  Qb = 1;
  var e = vA(), t = Qu();
  function r(n) {
    for (var a = t(n), i = a.length; i--; ) {
      var o = a[i], u = n[o];
      a[i] = [o, u, e(u)];
    }
    return a;
  }
  return ql = r, ql;
}
var Wl, Zb;
function EA() {
  if (Zb) return Wl;
  Zb = 1;
  function e(t, r) {
    return function(n) {
      return n == null ? !1 : n[t] === r && (r !== void 0 || t in Object(n));
    };
  }
  return Wl = e, Wl;
}
var Yl, Jb;
function XR() {
  if (Jb) return Yl;
  Jb = 1;
  var e = KR(), t = VR(), r = EA();
  function n(a) {
    var i = t(a);
    return i.length == 1 && i[0][2] ? r(i[0][0], i[0][1]) : function(o) {
      return o === a || e(o, a, i);
    };
  }
  return Yl = n, Yl;
}
var zl, eg;
function QR() {
  if (eg) return zl;
  eg = 1;
  function e(t, r) {
    return t != null && r in Object(t);
  }
  return zl = e, zl;
}
var Gl, tg;
function ZR() {
  if (tg) return Gl;
  tg = 1;
  var e = F_(), t = Qp(), r = Tt(), n = Zp(), a = Jp(), i = zu();
  function o(u, s, c) {
    s = e(s, u);
    for (var l = -1, f = s.length, h = !1; ++l < f; ) {
      var p = i(s[l]);
      if (!(h = u != null && c(u, p)))
        break;
      u = u[p];
    }
    return h || ++l != f ? h : (f = u == null ? 0 : u.length, !!f && a(f) && n(p, f) && (r(u) || t(u)));
  }
  return Gl = o, Gl;
}
var Kl, rg;
function JR() {
  if (rg) return Kl;
  rg = 1;
  var e = QR(), t = ZR();
  function r(n, a) {
    return n != null && t(n, a, e);
  }
  return Kl = r, Kl;
}
var Vl, ng;
function eD() {
  if (ng) return Vl;
  ng = 1;
  var e = e0(), t = $_(), r = JR(), n = kp(), a = vA(), i = EA(), o = zu(), u = 1, s = 2;
  function c(l, f) {
    return n(l) && a(f) ? i(o(l), f) : function(h) {
      var p = t(h, l);
      return p === void 0 && p === f ? r(h, l) : e(f, p, u | s);
    };
  }
  return Vl = c, Vl;
}
var Xl, ag;
function Sa() {
  if (ag) return Xl;
  ag = 1;
  function e(t) {
    return t;
  }
  return Xl = e, Xl;
}
var Ql, ig;
function tD() {
  if (ig) return Ql;
  ig = 1;
  function e(t) {
    return function(r) {
      return r?.[t];
    };
  }
  return Ql = e, Ql;
}
var Zl, og;
function rD() {
  if (og) return Zl;
  og = 1;
  var e = Hp();
  function t(r) {
    return function(n) {
      return e(n, r);
    };
  }
  return Zl = t, Zl;
}
var Jl, ug;
function nD() {
  if (ug) return Jl;
  ug = 1;
  var e = tD(), t = rD(), r = kp(), n = zu();
  function a(i) {
    return r(i) ? e(n(i)) : t(i);
  }
  return Jl = a, Jl;
}
var ef, sg;
function ur() {
  if (sg) return ef;
  sg = 1;
  var e = XR(), t = eD(), r = Sa(), n = Tt(), a = nD();
  function i(o) {
    return typeof o == "function" ? o : o == null ? r : typeof o == "object" ? n(o) ? t(o[0], o[1]) : e(o) : a(o);
  }
  return ef = i, ef;
}
var tf, cg;
function TA() {
  if (cg) return tf;
  cg = 1;
  function e(t, r, n, a) {
    for (var i = t.length, o = n + (a ? 1 : -1); a ? o-- : ++o < i; )
      if (r(t[o], o, t))
        return o;
    return -1;
  }
  return tf = e, tf;
}
var rf, lg;
function aD() {
  if (lg) return rf;
  lg = 1;
  function e(t) {
    return t !== t;
  }
  return rf = e, rf;
}
var nf, fg;
function iD() {
  if (fg) return nf;
  fg = 1;
  function e(t, r, n) {
    for (var a = n - 1, i = t.length; ++a < i; )
      if (t[a] === r)
        return a;
    return -1;
  }
  return nf = e, nf;
}
var af, dg;
function oD() {
  if (dg) return af;
  dg = 1;
  var e = TA(), t = aD(), r = iD();
  function n(a, i, o) {
    return i === i ? r(a, i, o) : e(a, t, o);
  }
  return af = n, af;
}
var of, hg;
function uD() {
  if (hg) return of;
  hg = 1;
  var e = oD();
  function t(r, n) {
    var a = r == null ? 0 : r.length;
    return !!a && e(r, n, 0) > -1;
  }
  return of = t, of;
}
var uf, pg;
function sD() {
  if (pg) return uf;
  pg = 1;
  function e(t, r, n) {
    for (var a = -1, i = t == null ? 0 : t.length; ++a < i; )
      if (n(r, t[a]))
        return !0;
    return !1;
  }
  return uf = e, uf;
}
var sf, mg;
function cD() {
  if (mg) return sf;
  mg = 1;
  function e() {
  }
  return sf = e, sf;
}
var cf, yg;
function lD() {
  if (yg) return cf;
  yg = 1;
  var e = gA(), t = cD(), r = Xp(), n = 1 / 0, a = e && 1 / r(new e([, -0]))[1] == n ? function(i) {
    return new e(i);
  } : t;
  return cf = a, cf;
}
var lf, bg;
function fD() {
  if (bg) return lf;
  bg = 1;
  var e = cA(), t = uD(), r = sD(), n = fA(), a = lD(), i = Xp(), o = 200;
  function u(s, c, l) {
    var f = -1, h = t, p = s.length, g = !0, y = [], m = y;
    if (l)
      g = !1, h = r;
    else if (p >= o) {
      var E = c ? null : a(s);
      if (E)
        return i(E);
      g = !1, h = n, m = new e();
    } else
      m = c ? [] : y;
    e:
      for (; ++f < p; ) {
        var v = s[f], T = c ? c(v) : v;
        if (v = l || v !== 0 ? v : 0, g && T === T) {
          for (var A = m.length; A--; )
            if (m[A] === T)
              continue e;
          c && m.push(T), y.push(v);
        } else h(m, T, l) || (m !== y && m.push(T), y.push(v));
      }
    return y;
  }
  return lf = u, lf;
}
var ff, gg;
function dD() {
  if (gg) return ff;
  gg = 1;
  var e = ur(), t = fD();
  function r(n, a) {
    return n && n.length ? t(n, e(a, 2)) : [];
  }
  return ff = r, ff;
}
var hD = dD();
const vg = /* @__PURE__ */ xe(hD);
function _A(e, t, r) {
  return t === !0 ? vg(e, r) : de(t) ? vg(e, t) : e;
}
function Jn(e) {
  "@babel/helpers - typeof";
  return Jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Jn(e);
}
var pD = ["ref"];
function Eg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function lr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Eg(Object(r), !0).forEach(function(n) {
      Zu(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Eg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function mD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Tg(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, OA(n.key), n);
  }
}
function yD(e, t, r) {
  return t && Tg(e.prototype, t), r && Tg(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function bD(e, t, r) {
  return t = qo(t), gD(e, AA() ? Reflect.construct(t, r || [], qo(e).constructor) : t.apply(e, r));
}
function gD(e, t) {
  if (t && (Jn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return vD(e);
}
function vD(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function AA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (AA = function() {
    return !!e;
  })();
}
function qo(e) {
  return qo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, qo(e);
}
function ED(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && dh(e, t);
}
function dh(e, t) {
  return dh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, dh(e, t);
}
function Zu(e, t, r) {
  return t = OA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function OA(e) {
  var t = TD(e, "string");
  return Jn(t) == "symbol" ? t : t + "";
}
function TD(e, t) {
  if (Jn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Jn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function _D(e, t) {
  if (e == null) return {};
  var r = AD(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function AD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function OD(e) {
  return e.value;
}
function SD(e, t) {
  if (/* @__PURE__ */ C.isValidElement(e))
    return /* @__PURE__ */ C.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ C.createElement(e, t);
  t.ref;
  var r = _D(t, pD);
  return /* @__PURE__ */ C.createElement(Vp, r);
}
var _g = 1, Hr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    mD(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = bD(this, t, [].concat(a)), Zu(r, "lastBoundingBox", {
      width: -1,
      height: -1
    }), r;
  }
  return ED(t, e), yD(t, [{
    key: "componentDidMount",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "getBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        return n.height = this.wrapperNode.offsetHeight, n.width = this.wrapperNode.offsetWidth, n;
      }
      return null;
    }
  }, {
    key: "updateBBox",
    value: function() {
      var n = this.props.onBBoxUpdate, a = this.getBBox();
      a ? (Math.abs(a.width - this.lastBoundingBox.width) > _g || Math.abs(a.height - this.lastBoundingBox.height) > _g) && (this.lastBoundingBox.width = a.width, this.lastBoundingBox.height = a.height, n && n(a)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null));
    }
  }, {
    key: "getBBoxSnapshot",
    value: function() {
      return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? lr({}, this.lastBoundingBox) : {
        width: 0,
        height: 0
      };
    }
  }, {
    key: "getDefaultPosition",
    value: function(n) {
      var a = this.props, i = a.layout, o = a.align, u = a.verticalAlign, s = a.margin, c = a.chartWidth, l = a.chartHeight, f, h;
      if (!n || (n.left === void 0 || n.left === null) && (n.right === void 0 || n.right === null))
        if (o === "center" && i === "vertical") {
          var p = this.getBBoxSnapshot();
          f = {
            left: ((c || 0) - p.width) / 2
          };
        } else
          f = o === "right" ? {
            right: s && s.right || 0
          } : {
            left: s && s.left || 0
          };
      if (!n || (n.top === void 0 || n.top === null) && (n.bottom === void 0 || n.bottom === null))
        if (u === "middle") {
          var g = this.getBBoxSnapshot();
          h = {
            top: ((l || 0) - g.height) / 2
          };
        } else
          h = u === "bottom" ? {
            bottom: s && s.bottom || 0
          } : {
            top: s && s.top || 0
          };
      return lr(lr({}, f), h);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.content, o = a.width, u = a.height, s = a.wrapperStyle, c = a.payloadUniqBy, l = a.payload, f = lr(lr({
        position: "absolute",
        width: o || "auto",
        height: u || "auto"
      }, this.getDefaultPosition(s)), s);
      return /* @__PURE__ */ C.createElement("div", {
        className: "recharts-legend-wrapper",
        style: f,
        ref: function(p) {
          n.wrapperNode = p;
        }
      }, SD(i, lr(lr({}, this.props), {}, {
        payload: _A(l, c, OD)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function(n, a) {
      var i = lr(lr({}, this.defaultProps), n.props), o = i.layout;
      return o === "vertical" && J(n.props.height) ? {
        height: n.props.height
      } : o === "horizontal" ? {
        width: n.props.width || a
      } : null;
    }
  }]);
})(ir);
Zu(Hr, "displayName", "Legend");
Zu(Hr, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var df, Ag;
function xD() {
  if (Ag) return df;
  Ag = 1;
  var e = Ki(), t = Qp(), r = Tt(), n = e ? e.isConcatSpreadable : void 0;
  function a(i) {
    return r(i) || t(i) || !!(n && i && i[n]);
  }
  return df = a, df;
}
var hf, Og;
function SA() {
  if (Og) return hf;
  Og = 1;
  var e = hA(), t = xD();
  function r(n, a, i, o, u) {
    var s = -1, c = n.length;
    for (i || (i = t), u || (u = []); ++s < c; ) {
      var l = n[s];
      a > 0 && i(l) ? a > 1 ? r(l, a - 1, i, o, u) : e(u, l) : o || (u[u.length] = l);
    }
    return u;
  }
  return hf = r, hf;
}
var pf, Sg;
function wD() {
  if (Sg) return pf;
  Sg = 1;
  function e(t) {
    return function(r, n, a) {
      for (var i = -1, o = Object(r), u = a(r), s = u.length; s--; ) {
        var c = u[t ? s : ++i];
        if (n(o[c], c, o) === !1)
          break;
      }
      return r;
    };
  }
  return pf = e, pf;
}
var mf, xg;
function PD() {
  if (xg) return mf;
  xg = 1;
  var e = wD(), t = e();
  return mf = t, mf;
}
var yf, wg;
function xA() {
  if (wg) return yf;
  wg = 1;
  var e = PD(), t = Qu();
  function r(n, a) {
    return n && e(n, a, t);
  }
  return yf = r, yf;
}
var bf, Pg;
function ID() {
  if (Pg) return bf;
  Pg = 1;
  var e = Qi();
  function t(r, n) {
    return function(a, i) {
      if (a == null)
        return a;
      if (!e(a))
        return r(a, i);
      for (var o = a.length, u = n ? o : -1, s = Object(a); (n ? u-- : ++u < o) && i(s[u], u, s) !== !1; )
        ;
      return a;
    };
  }
  return bf = t, bf;
}
var gf, Ig;
function t0() {
  if (Ig) return gf;
  Ig = 1;
  var e = xA(), t = ID(), r = t(e);
  return gf = r, gf;
}
var vf, Cg;
function wA() {
  if (Cg) return vf;
  Cg = 1;
  var e = t0(), t = Qi();
  function r(n, a) {
    var i = -1, o = t(n) ? Array(n.length) : [];
    return e(n, function(u, s, c) {
      o[++i] = a(u, s, c);
    }), o;
  }
  return vf = r, vf;
}
var Ef, Ng;
function CD() {
  if (Ng) return Ef;
  Ng = 1;
  function e(t, r) {
    var n = t.length;
    for (t.sort(r); n--; )
      t[n] = t[n].value;
    return t;
  }
  return Ef = e, Ef;
}
var Tf, Rg;
function ND() {
  if (Rg) return Tf;
  Rg = 1;
  var e = Aa();
  function t(r, n) {
    if (r !== n) {
      var a = r !== void 0, i = r === null, o = r === r, u = e(r), s = n !== void 0, c = n === null, l = n === n, f = e(n);
      if (!c && !f && !u && r > n || u && s && l && !c && !f || i && s && l || !a && l || !o)
        return 1;
      if (!i && !u && !f && r < n || f && a && o && !i && !u || c && a && o || !s && o || !l)
        return -1;
    }
    return 0;
  }
  return Tf = t, Tf;
}
var _f, Dg;
function RD() {
  if (Dg) return _f;
  Dg = 1;
  var e = ND();
  function t(r, n, a) {
    for (var i = -1, o = r.criteria, u = n.criteria, s = o.length, c = a.length; ++i < s; ) {
      var l = e(o[i], u[i]);
      if (l) {
        if (i >= c)
          return l;
        var f = a[i];
        return l * (f == "desc" ? -1 : 1);
      }
    }
    return r.index - n.index;
  }
  return _f = t, _f;
}
var Af, Mg;
function DD() {
  if (Mg) return Af;
  Mg = 1;
  var e = Up(), t = Hp(), r = ur(), n = wA(), a = CD(), i = mA(), o = RD(), u = Sa(), s = Tt();
  function c(l, f, h) {
    f.length ? f = e(f, function(y) {
      return s(y) ? function(m) {
        return t(m, y.length === 1 ? y[0] : y);
      } : y;
    }) : f = [u];
    var p = -1;
    f = e(f, i(r));
    var g = n(l, function(y, m, E) {
      var v = e(f, function(T) {
        return T(y);
      });
      return { criteria: v, index: ++p, value: y };
    });
    return a(g, function(y, m) {
      return o(y, m, h);
    });
  }
  return Af = c, Af;
}
var Of, Lg;
function MD() {
  if (Lg) return Of;
  Lg = 1;
  function e(t, r, n) {
    switch (n.length) {
      case 0:
        return t.call(r);
      case 1:
        return t.call(r, n[0]);
      case 2:
        return t.call(r, n[0], n[1]);
      case 3:
        return t.call(r, n[0], n[1], n[2]);
    }
    return t.apply(r, n);
  }
  return Of = e, Of;
}
var Sf, kg;
function LD() {
  if (kg) return Sf;
  kg = 1;
  var e = MD(), t = Math.max;
  function r(n, a, i) {
    return a = t(a === void 0 ? n.length - 1 : a, 0), function() {
      for (var o = arguments, u = -1, s = t(o.length - a, 0), c = Array(s); ++u < s; )
        c[u] = o[a + u];
      u = -1;
      for (var l = Array(a + 1); ++u < a; )
        l[u] = o[u];
      return l[a] = i(c), e(n, this, l);
    };
  }
  return Sf = r, Sf;
}
var xf, Bg;
function kD() {
  if (Bg) return xf;
  Bg = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return xf = e, xf;
}
var wf, jg;
function PA() {
  if (jg) return wf;
  jg = 1;
  var e = On(), t = (function() {
    try {
      var r = e(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  })();
  return wf = t, wf;
}
var Pf, Fg;
function BD() {
  if (Fg) return Pf;
  Fg = 1;
  var e = kD(), t = PA(), r = Sa(), n = t ? function(a, i) {
    return t(a, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(i),
      writable: !0
    });
  } : r;
  return Pf = n, Pf;
}
var If, $g;
function jD() {
  if ($g) return If;
  $g = 1;
  var e = 800, t = 16, r = Date.now;
  function n(a) {
    var i = 0, o = 0;
    return function() {
      var u = r(), s = t - (u - o);
      if (o = u, s > 0) {
        if (++i >= e)
          return arguments[0];
      } else
        i = 0;
      return a.apply(void 0, arguments);
    };
  }
  return If = n, If;
}
var Cf, Ug;
function FD() {
  if (Ug) return Cf;
  Ug = 1;
  var e = BD(), t = jD(), r = t(e);
  return Cf = r, Cf;
}
var Nf, Hg;
function $D() {
  if (Hg) return Nf;
  Hg = 1;
  var e = Sa(), t = LD(), r = FD();
  function n(a, i) {
    return r(t(a, i, e), a + "");
  }
  return Nf = n, Nf;
}
var Rf, qg;
function Ju() {
  if (qg) return Rf;
  qg = 1;
  var e = jp(), t = Qi(), r = Zp(), n = Gr();
  function a(i, o, u) {
    if (!n(u))
      return !1;
    var s = typeof o;
    return (s == "number" ? t(u) && r(o, u.length) : s == "string" && o in u) ? e(u[o], i) : !1;
  }
  return Rf = a, Rf;
}
var Df, Wg;
function UD() {
  if (Wg) return Df;
  Wg = 1;
  var e = SA(), t = DD(), r = $D(), n = Ju(), a = r(function(i, o) {
    if (i == null)
      return [];
    var u = o.length;
    return u > 1 && n(i, o[0], o[1]) ? o = [] : u > 2 && n(o[0], o[1], o[2]) && (o = [o[0]]), t(i, e(o, 1), []);
  });
  return Df = a, Df;
}
var HD = UD();
const r0 = /* @__PURE__ */ xe(HD);
function hi(e) {
  "@babel/helpers - typeof";
  return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hi(e);
}
function hh() {
  return hh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, hh.apply(this, arguments);
}
function qD(e, t) {
  return GD(e) || zD(e, t) || YD(e, t) || WD();
}
function WD() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function YD(e, t) {
  if (e) {
    if (typeof e == "string") return Yg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Yg(e, t);
  }
}
function Yg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function zD(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function GD(e) {
  if (Array.isArray(e)) return e;
}
function zg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Mf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zg(Object(r), !0).forEach(function(n) {
      KD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function KD(e, t, r) {
  return t = VD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VD(e) {
  var t = XD(e, "string");
  return hi(t) == "symbol" ? t : t + "";
}
function XD(e, t) {
  if (hi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (hi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function QD(e) {
  return Array.isArray(e) && ze(e[0]) && ze(e[1]) ? e.join(" ~ ") : e;
}
var ZD = function(t) {
  var r = t.separator, n = r === void 0 ? " : " : r, a = t.contentStyle, i = a === void 0 ? {} : a, o = t.itemStyle, u = o === void 0 ? {} : o, s = t.labelStyle, c = s === void 0 ? {} : s, l = t.payload, f = t.formatter, h = t.itemSorter, p = t.wrapperClassName, g = t.labelClassName, y = t.label, m = t.labelFormatter, E = t.accessibilityLayer, v = E === void 0 ? !1 : E, T = function() {
    if (l && l.length) {
      var R = {
        padding: 0,
        margin: 0
      }, B = (h ? r0(l, h) : l).map(function(F, $) {
        if (F.type === "none")
          return null;
        var q = Mf({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: F.color || "#000"
        }, u), Y = F.formatter || f || QD, Q = F.value, te = F.name, k = Q, W = te;
        if (Y && k != null && W != null) {
          var z = Y(Q, te, F, $, l);
          if (Array.isArray(z)) {
            var Z = qD(z, 2);
            k = Z[0], W = Z[1];
          } else
            k = z;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ C.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat($),
            style: q
          }, ze(W) ? /* @__PURE__ */ C.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, W) : null, ze(W) ? /* @__PURE__ */ C.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, n) : null, /* @__PURE__ */ C.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, k), /* @__PURE__ */ C.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, F.unit || ""))
        );
      });
      return /* @__PURE__ */ C.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: R
      }, B);
    }
    return null;
  }, A = Mf({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, i), b = Mf({
    margin: 0
  }, c), _ = !me(y), O = _ ? y : "", I = pe("recharts-default-tooltip", p), N = pe("recharts-tooltip-label", g);
  _ && m && l !== void 0 && l !== null && (O = m(y, l));
  var j = v ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ C.createElement("div", hh({
    className: I,
    style: A
  }, j), /* @__PURE__ */ C.createElement("p", {
    className: N,
    style: b
  }, /* @__PURE__ */ C.isValidElement(O) ? O : "".concat(O)), T());
};
function pi(e) {
  "@babel/helpers - typeof";
  return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pi(e);
}
function ho(e, t, r) {
  return t = JD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function JD(e) {
  var t = e6(e, "string");
  return pi(t) == "symbol" ? t : t + "";
}
function e6(e, t) {
  if (pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ma = "recharts-tooltip-wrapper", t6 = {
  visibility: "hidden"
};
function r6(e) {
  var t = e.coordinate, r = e.translateX, n = e.translateY;
  return pe(Ma, ho(ho(ho(ho({}, "".concat(Ma, "-right"), J(r) && t && J(t.x) && r >= t.x), "".concat(Ma, "-left"), J(r) && t && J(t.x) && r < t.x), "".concat(Ma, "-bottom"), J(n) && t && J(t.y) && n >= t.y), "".concat(Ma, "-top"), J(n) && t && J(t.y) && n < t.y));
}
function Gg(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.key, a = e.offsetTopLeft, i = e.position, o = e.reverseDirection, u = e.tooltipDimension, s = e.viewBox, c = e.viewBoxDimension;
  if (i && J(i[n]))
    return i[n];
  var l = r[n] - u - a, f = r[n] + a;
  if (t[n])
    return o[n] ? l : f;
  if (o[n]) {
    var h = l, p = s[n];
    return h < p ? Math.max(f, s[n]) : Math.max(l, s[n]);
  }
  var g = f + u, y = s[n] + c;
  return g > y ? Math.max(l, s[n]) : Math.max(f, s[n]);
}
function n6(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function a6(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTopLeft, a = e.position, i = e.reverseDirection, o = e.tooltipBox, u = e.useTranslate3d, s = e.viewBox, c, l, f;
  return o.height > 0 && o.width > 0 && r ? (l = Gg({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: o.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), f = Gg({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: o.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), c = n6({
    translateX: l,
    translateY: f,
    useTranslate3d: u
  })) : c = t6, {
    cssProperties: c,
    cssClasses: r6({
      translateX: l,
      translateY: f,
      coordinate: r
    })
  };
}
function ea(e) {
  "@babel/helpers - typeof";
  return ea = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ea(e);
}
function Kg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Kg(Object(r), !0).forEach(function(n) {
      mh(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Kg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function i6(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function o6(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, CA(n.key), n);
  }
}
function u6(e, t, r) {
  return t && o6(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function s6(e, t, r) {
  return t = Wo(t), c6(e, IA() ? Reflect.construct(t, r || [], Wo(e).constructor) : t.apply(e, r));
}
function c6(e, t) {
  if (t && (ea(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return l6(e);
}
function l6(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function IA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (IA = function() {
    return !!e;
  })();
}
function Wo(e) {
  return Wo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Wo(e);
}
function f6(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ph(e, t);
}
function ph(e, t) {
  return ph = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ph(e, t);
}
function mh(e, t, r) {
  return t = CA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function CA(e) {
  var t = d6(e, "string");
  return ea(t) == "symbol" ? t : t + "";
}
function d6(e, t) {
  if (ea(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ea(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Xg = 1, h6 = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    i6(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = s6(this, t, [].concat(a)), mh(r, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), mh(r, "handleKeyDown", function(o) {
      if (o.key === "Escape") {
        var u, s, c, l;
        r.setState({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (u = (s = r.props.coordinate) === null || s === void 0 ? void 0 : s.x) !== null && u !== void 0 ? u : 0,
            y: (c = (l = r.props.coordinate) === null || l === void 0 ? void 0 : l.y) !== null && c !== void 0 ? c : 0
          }
        });
      }
    }), r;
  }
  return f6(t, e), u6(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        (Math.abs(n.width - this.state.lastBoundingBox.width) > Xg || Math.abs(n.height - this.state.lastBoundingBox.height) > Xg) && this.setState({
          lastBoundingBox: {
            width: n.width,
            height: n.height
          }
        });
      } else (this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) && this.setState({
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function() {
      document.addEventListener("keydown", this.handleKeyDown), this.updateBBox();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      var n, a;
      this.props.active && this.updateBBox(), this.state.dismissed && (((n = this.props.coordinate) === null || n === void 0 ? void 0 : n.x) !== this.state.dismissedAtCoordinate.x || ((a = this.props.coordinate) === null || a === void 0 ? void 0 : a.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = !1);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.active, o = a.allowEscapeViewBox, u = a.animationDuration, s = a.animationEasing, c = a.children, l = a.coordinate, f = a.hasPayload, h = a.isAnimationActive, p = a.offset, g = a.position, y = a.reverseDirection, m = a.useTranslate3d, E = a.viewBox, v = a.wrapperStyle, T = a6({
        allowEscapeViewBox: o,
        coordinate: l,
        offsetTopLeft: p,
        position: g,
        reverseDirection: y,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: m,
        viewBox: E
      }), A = T.cssClasses, b = T.cssProperties, _ = Vg(Vg({
        transition: h && i ? "transform ".concat(u, "ms ").concat(s) : void 0
      }, b), {}, {
        pointerEvents: "none",
        visibility: !this.state.dismissed && i && f ? "visible" : "hidden",
        position: "absolute",
        top: 0,
        left: 0
      }, v);
      return (
        // This element allow listening to the `Escape` key.
        // See https://github.com/recharts/recharts/pull/2925
        /* @__PURE__ */ C.createElement("div", {
          tabIndex: -1,
          className: A,
          style: _,
          ref: function(I) {
            n.wrapperNode = I;
          }
        }, c)
      );
    }
  }]);
})(ir), p6 = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, xa = {
  isSsr: p6()
};
function ta(e) {
  "@babel/helpers - typeof";
  return ta = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ta(e);
}
function Qg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Zg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qg(Object(r), !0).forEach(function(n) {
      n0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function m6(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function y6(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, RA(n.key), n);
  }
}
function b6(e, t, r) {
  return t && y6(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function g6(e, t, r) {
  return t = Yo(t), v6(e, NA() ? Reflect.construct(t, r || [], Yo(e).constructor) : t.apply(e, r));
}
function v6(e, t) {
  if (t && (ta(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return E6(e);
}
function E6(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function NA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (NA = function() {
    return !!e;
  })();
}
function Yo(e) {
  return Yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Yo(e);
}
function T6(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && yh(e, t);
}
function yh(e, t) {
  return yh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, yh(e, t);
}
function n0(e, t, r) {
  return t = RA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RA(e) {
  var t = _6(e, "string");
  return ta(t) == "symbol" ? t : t + "";
}
function _6(e, t) {
  if (ta(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ta(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function A6(e) {
  return e.dataKey;
}
function O6(e, t) {
  return /* @__PURE__ */ C.isValidElement(e) ? /* @__PURE__ */ C.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ C.createElement(e, t) : /* @__PURE__ */ C.createElement(ZD, t);
}
var yt = /* @__PURE__ */ (function(e) {
  function t() {
    return m6(this, t), g6(this, t, arguments);
  }
  return T6(t, e), b6(t, [{
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.active, o = a.allowEscapeViewBox, u = a.animationDuration, s = a.animationEasing, c = a.content, l = a.coordinate, f = a.filterNull, h = a.isAnimationActive, p = a.offset, g = a.payload, y = a.payloadUniqBy, m = a.position, E = a.reverseDirection, v = a.useTranslate3d, T = a.viewBox, A = a.wrapperStyle, b = g ?? [];
      f && b.length && (b = _A(g.filter(function(O) {
        return O.value != null && (O.hide !== !0 || n.props.includeHidden);
      }), y, A6));
      var _ = b.length > 0;
      return /* @__PURE__ */ C.createElement(h6, {
        allowEscapeViewBox: o,
        animationDuration: u,
        animationEasing: s,
        isAnimationActive: h,
        active: i,
        coordinate: l,
        hasPayload: _,
        offset: p,
        position: m,
        reverseDirection: E,
        useTranslate3d: v,
        viewBox: T,
        wrapperStyle: A
      }, O6(c, Zg(Zg({}, this.props), {}, {
        payload: b
      })));
    }
  }]);
})(ir);
n0(yt, "displayName", "Tooltip");
n0(yt, "defaultProps", {
  accessibilityLayer: !1,
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  contentStyle: {},
  coordinate: {
    x: 0,
    y: 0
  },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !xa.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  },
  wrapperStyle: {}
});
var Lf, Jg;
function S6() {
  if (Jg) return Lf;
  Jg = 1;
  var e = or(), t = function() {
    return e.Date.now();
  };
  return Lf = t, Lf;
}
var kf, ev;
function x6() {
  if (ev) return kf;
  ev = 1;
  var e = /\s/;
  function t(r) {
    for (var n = r.length; n-- && e.test(r.charAt(n)); )
      ;
    return n;
  }
  return kf = t, kf;
}
var Bf, tv;
function w6() {
  if (tv) return Bf;
  tv = 1;
  var e = x6(), t = /^\s+/;
  function r(n) {
    return n && n.slice(0, e(n) + 1).replace(t, "");
  }
  return Bf = r, Bf;
}
var jf, rv;
function DA() {
  if (rv) return jf;
  rv = 1;
  var e = w6(), t = Gr(), r = Aa(), n = NaN, a = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, o = /^0o[0-7]+$/i, u = parseInt;
  function s(c) {
    if (typeof c == "number")
      return c;
    if (r(c))
      return n;
    if (t(c)) {
      var l = typeof c.valueOf == "function" ? c.valueOf() : c;
      c = t(l) ? l + "" : l;
    }
    if (typeof c != "string")
      return c === 0 ? c : +c;
    c = e(c);
    var f = i.test(c);
    return f || o.test(c) ? u(c.slice(2), f ? 2 : 8) : a.test(c) ? n : +c;
  }
  return jf = s, jf;
}
var Ff, nv;
function P6() {
  if (nv) return Ff;
  nv = 1;
  var e = Gr(), t = S6(), r = DA(), n = "Expected a function", a = Math.max, i = Math.min;
  function o(u, s, c) {
    var l, f, h, p, g, y, m = 0, E = !1, v = !1, T = !0;
    if (typeof u != "function")
      throw new TypeError(n);
    s = r(s) || 0, e(c) && (E = !!c.leading, v = "maxWait" in c, h = v ? a(r(c.maxWait) || 0, s) : h, T = "trailing" in c ? !!c.trailing : T);
    function A(B) {
      var F = l, $ = f;
      return l = f = void 0, m = B, p = u.apply($, F), p;
    }
    function b(B) {
      return m = B, g = setTimeout(I, s), E ? A(B) : p;
    }
    function _(B) {
      var F = B - y, $ = B - m, q = s - F;
      return v ? i(q, h - $) : q;
    }
    function O(B) {
      var F = B - y, $ = B - m;
      return y === void 0 || F >= s || F < 0 || v && $ >= h;
    }
    function I() {
      var B = t();
      if (O(B))
        return N(B);
      g = setTimeout(I, _(B));
    }
    function N(B) {
      return g = void 0, T && l ? A(B) : (l = f = void 0, p);
    }
    function j() {
      g !== void 0 && clearTimeout(g), m = 0, l = y = f = g = void 0;
    }
    function D() {
      return g === void 0 ? p : N(t());
    }
    function R() {
      var B = t(), F = O(B);
      if (l = arguments, f = this, y = B, F) {
        if (g === void 0)
          return b(y);
        if (v)
          return clearTimeout(g), g = setTimeout(I, s), A(y);
      }
      return g === void 0 && (g = setTimeout(I, s)), p;
    }
    return R.cancel = j, R.flush = D, R;
  }
  return Ff = o, Ff;
}
var $f, av;
function I6() {
  if (av) return $f;
  av = 1;
  var e = P6(), t = Gr(), r = "Expected a function";
  function n(a, i, o) {
    var u = !0, s = !0;
    if (typeof a != "function")
      throw new TypeError(r);
    return t(o) && (u = "leading" in o ? !!o.leading : u, s = "trailing" in o ? !!o.trailing : s), e(a, i, {
      leading: u,
      maxWait: i,
      trailing: s
    });
  }
  return $f = n, $f;
}
var C6 = I6();
const MA = /* @__PURE__ */ xe(C6);
function mi(e) {
  "@babel/helpers - typeof";
  return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mi(e);
}
function iv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function po(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? iv(Object(r), !0).forEach(function(n) {
      N6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : iv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function N6(e, t, r) {
  return t = R6(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function R6(e) {
  var t = D6(e, "string");
  return mi(t) == "symbol" ? t : t + "";
}
function D6(e, t) {
  if (mi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (mi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function M6(e, t) {
  return j6(e) || B6(e, t) || k6(e, t) || L6();
}
function L6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function k6(e, t) {
  if (e) {
    if (typeof e == "string") return ov(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ov(e, t);
  }
}
function ov(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function B6(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function j6(e) {
  if (Array.isArray(e)) return e;
}
var Zi = /* @__PURE__ */ LT(function(e, t) {
  var r = e.aspect, n = e.initialDimension, a = n === void 0 ? {
    width: -1,
    height: -1
  } : n, i = e.width, o = i === void 0 ? "100%" : i, u = e.height, s = u === void 0 ? "100%" : u, c = e.minWidth, l = c === void 0 ? 0 : c, f = e.minHeight, h = e.maxHeight, p = e.children, g = e.debounce, y = g === void 0 ? 0 : g, m = e.id, E = e.className, v = e.onResize, T = e.style, A = T === void 0 ? {} : T, b = ui(null), _ = ui();
  _.current = v, rx(t, function() {
    return Object.defineProperty(b.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), b.current;
      },
      configurable: !0
    });
  });
  var O = ft({
    containerWidth: a.width,
    containerHeight: a.height
  }), I = M6(O, 2), N = I[0], j = I[1], D = nx(function(B, F) {
    j(function($) {
      var q = Math.round(B), Y = Math.round(F);
      return $.containerWidth === q && $.containerHeight === Y ? $ : {
        containerWidth: q,
        containerHeight: Y
      };
    });
  }, []);
  Et(function() {
    var B = function(te) {
      var k, W = te[0].contentRect, z = W.width, Z = W.height;
      D(z, Z), (k = _.current) === null || k === void 0 || k.call(_, z, Z);
    };
    y > 0 && (B = MA(B, y, {
      trailing: !0,
      leading: !1
    }));
    var F = new ResizeObserver(B), $ = b.current.getBoundingClientRect(), q = $.width, Y = $.height;
    return D(q, Y), F.observe(b.current), function() {
      F.disconnect();
    };
  }, [D, y]);
  var R = Fr(function() {
    var B = N.containerWidth, F = N.containerHeight;
    if (B < 0 || F < 0)
      return null;
    zt(on(o) || on(s), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, o, s), zt(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var $ = on(o) ? B : o, q = on(s) ? F : s;
    r && r > 0 && ($ ? q = $ / r : q && ($ = q * r), h && q > h && (q = h)), zt($ > 0 || q > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, $, q, o, s, l, f, r);
    var Y = !Array.isArray(p) && vr(p.type).endsWith("Chart");
    return C.Children.map(p, function(Q) {
      return /* @__PURE__ */ C.isValidElement(Q) ? /* @__PURE__ */ Ue(Q, po({
        width: $,
        height: q
      }, Y ? {
        style: po({
          height: "100%",
          width: "100%",
          maxHeight: q,
          maxWidth: $
        }, Q.props.style)
      } : {})) : Q;
    });
  }, [r, p, s, h, f, l, N, o]);
  return /* @__PURE__ */ C.createElement("div", {
    id: m ? "".concat(m) : void 0,
    className: pe("recharts-responsive-container", E),
    style: po(po({}, A), {}, {
      width: o,
      height: s,
      minWidth: l,
      minHeight: f,
      maxHeight: h
    }),
    ref: b
  }, R);
}), es = function(t) {
  return null;
};
es.displayName = "Cell";
function yi(e) {
  "@babel/helpers - typeof";
  return yi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, yi(e);
}
function uv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uv(Object(r), !0).forEach(function(n) {
      F6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : uv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function F6(e, t, r) {
  return t = $6(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $6(e) {
  var t = U6(e, "string");
  return yi(t) == "symbol" ? t : t + "";
}
function U6(e, t) {
  if (yi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (yi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Nn = {
  widthCache: {},
  cacheCount: 0
}, H6 = 2e3, q6 = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, sv = "recharts_measurement_span";
function W6(e) {
  var t = bh({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r];
  }), t;
}
var ei = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || xa.isSsr)
    return {
      width: 0,
      height: 0
    };
  var n = W6(r), a = JSON.stringify({
    text: t,
    copyStyle: n
  });
  if (Nn.widthCache[a])
    return Nn.widthCache[a];
  try {
    var i = document.getElementById(sv);
    i || (i = document.createElement("span"), i.setAttribute("id", sv), i.setAttribute("aria-hidden", "true"), document.body.appendChild(i));
    var o = bh(bh({}, q6), n);
    Object.assign(i.style, o), i.textContent = "".concat(t);
    var u = i.getBoundingClientRect(), s = {
      width: u.width,
      height: u.height
    };
    return Nn.widthCache[a] = s, ++Nn.cacheCount > H6 && (Nn.cacheCount = 0, Nn.widthCache = {}), s;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, Y6 = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function bi(e) {
  "@babel/helpers - typeof";
  return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, bi(e);
}
function zo(e, t) {
  return V6(e) || K6(e, t) || G6(e, t) || z6();
}
function z6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function G6(e, t) {
  if (e) {
    if (typeof e == "string") return cv(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return cv(e, t);
  }
}
function cv(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function K6(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function V6(e) {
  if (Array.isArray(e)) return e;
}
function X6(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function lv(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Z6(n.key), n);
  }
}
function Q6(e, t, r) {
  return t && lv(e.prototype, t), r && lv(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Z6(e) {
  var t = J6(e, "string");
  return bi(t) == "symbol" ? t : t + "";
}
function J6(e, t) {
  if (bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var fv = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, dv = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, eM = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, tM = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, LA = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, rM = Object.keys(LA), Fn = "NaN";
function nM(e, t) {
  return e * LA[t];
}
var mo = /* @__PURE__ */ (function() {
  function e(t, r) {
    X6(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !eM.test(r) && (this.num = NaN, this.unit = ""), rM.includes(r) && (this.num = nM(t, r), this.unit = "px");
  }
  return Q6(e, [{
    key: "add",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num + r.num, this.unit);
    }
  }, {
    key: "subtract",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num - r.num, this.unit);
    }
  }, {
    key: "multiply",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num * r.num, this.unit || r.unit);
    }
  }, {
    key: "divide",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num / r.num, this.unit || r.unit);
    }
  }, {
    key: "toString",
    value: function() {
      return "".concat(this.num).concat(this.unit);
    }
  }, {
    key: "isNaN",
    value: function() {
      return Number.isNaN(this.num);
    }
  }], [{
    key: "parse",
    value: function(r) {
      var n, a = (n = tM.exec(r)) !== null && n !== void 0 ? n : [], i = zo(a, 3), o = i[1], u = i[2];
      return new e(parseFloat(o), u ?? "");
    }
  }]);
})();
function kA(e) {
  if (e.includes(Fn))
    return Fn;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = fv.exec(t)) !== null && r !== void 0 ? r : [], a = zo(n, 4), i = a[1], o = a[2], u = a[3], s = mo.parse(i ?? ""), c = mo.parse(u ?? ""), l = o === "*" ? s.multiply(c) : s.divide(c);
    if (l.isNaN())
      return Fn;
    t = t.replace(fv, l.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var f, h = (f = dv.exec(t)) !== null && f !== void 0 ? f : [], p = zo(h, 4), g = p[1], y = p[2], m = p[3], E = mo.parse(g ?? ""), v = mo.parse(m ?? ""), T = y === "+" ? E.add(v) : E.subtract(v);
    if (T.isNaN())
      return Fn;
    t = t.replace(dv, T.toString());
  }
  return t;
}
var hv = /\(([^()]*)\)/;
function aM(e) {
  for (var t = e; t.includes("("); ) {
    var r = hv.exec(t), n = zo(r, 2), a = n[1];
    t = t.replace(hv, kA(a));
  }
  return t;
}
function iM(e) {
  var t = e.replace(/\s+/g, "");
  return t = aM(t), t = kA(t), t;
}
function oM(e) {
  try {
    return iM(e);
  } catch {
    return Fn;
  }
}
function Uf(e) {
  var t = oM(e.slice(5, -1));
  return t === Fn ? "" : t;
}
var uM = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], sM = ["dx", "dy", "angle", "className", "breakAll"];
function gh() {
  return gh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, gh.apply(this, arguments);
}
function pv(e, t) {
  if (e == null) return {};
  var r = cM(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function cM(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function mv(e, t) {
  return hM(e) || dM(e, t) || fM(e, t) || lM();
}
function lM() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function fM(e, t) {
  if (e) {
    if (typeof e == "string") return yv(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return yv(e, t);
  }
}
function yv(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function dM(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function hM(e) {
  if (Array.isArray(e)) return e;
}
var BA = /[ \f\n\r\t\v\u2028\u2029]+/, jA = function(t) {
  var r = t.children, n = t.breakAll, a = t.style;
  try {
    var i = [];
    me(r) || (n ? i = r.toString().split("") : i = r.toString().split(BA));
    var o = i.map(function(s) {
      return {
        word: s,
        width: ei(s, a).width
      };
    }), u = n ? 0 : ei(" ", a).width;
    return {
      wordsWithComputedWidth: o,
      spaceWidth: u
    };
  } catch {
    return null;
  }
}, pM = function(t, r, n, a, i) {
  var o = t.maxLines, u = t.children, s = t.style, c = t.breakAll, l = J(o), f = u, h = function() {
    var $ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return $.reduce(function(q, Y) {
      var Q = Y.word, te = Y.width, k = q[q.length - 1];
      if (k && (a == null || i || k.width + te + n < Number(a)))
        k.words.push(Q), k.width += te + n;
      else {
        var W = {
          words: [Q],
          width: te
        };
        q.push(W);
      }
      return q;
    }, []);
  }, p = h(r), g = function($) {
    return $.reduce(function(q, Y) {
      return q.width > Y.width ? q : Y;
    });
  };
  if (!l)
    return p;
  for (var y = "…", m = function($) {
    var q = f.slice(0, $), Y = jA({
      breakAll: c,
      style: s,
      children: q + y
    }).wordsWithComputedWidth, Q = h(Y), te = Q.length > o || g(Q).width > Number(a);
    return [te, Q];
  }, E = 0, v = f.length - 1, T = 0, A; E <= v && T <= f.length - 1; ) {
    var b = Math.floor((E + v) / 2), _ = b - 1, O = m(_), I = mv(O, 2), N = I[0], j = I[1], D = m(b), R = mv(D, 1), B = R[0];
    if (!N && !B && (E = b + 1), N && B && (v = b - 1), !N && B) {
      A = j;
      break;
    }
    T++;
  }
  return A || p;
}, bv = function(t) {
  var r = me(t) ? [] : t.toString().split(BA);
  return [{
    words: r
  }];
}, mM = function(t) {
  var r = t.width, n = t.scaleToFit, a = t.children, i = t.style, o = t.breakAll, u = t.maxLines;
  if ((r || n) && !xa.isSsr) {
    var s, c, l = jA({
      breakAll: o,
      children: a,
      style: i
    });
    if (l) {
      var f = l.wordsWithComputedWidth, h = l.spaceWidth;
      s = f, c = h;
    } else
      return bv(a);
    return pM({
      breakAll: o,
      children: a,
      maxLines: u,
      style: i
    }, s, c, r, n);
  }
  return bv(a);
}, gv = "#808080", gn = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, o = t.lineHeight, u = o === void 0 ? "1em" : o, s = t.capHeight, c = s === void 0 ? "0.71em" : s, l = t.scaleToFit, f = l === void 0 ? !1 : l, h = t.textAnchor, p = h === void 0 ? "start" : h, g = t.verticalAnchor, y = g === void 0 ? "end" : g, m = t.fill, E = m === void 0 ? gv : m, v = pv(t, uM), T = Fr(function() {
    return mM({
      breakAll: v.breakAll,
      children: v.children,
      maxLines: v.maxLines,
      scaleToFit: f,
      style: v.style,
      width: v.width
    });
  }, [v.breakAll, v.children, v.maxLines, f, v.style, v.width]), A = v.dx, b = v.dy, _ = v.angle, O = v.className, I = v.breakAll, N = pv(v, sM);
  if (!ze(n) || !ze(i))
    return null;
  var j = n + (J(A) ? A : 0), D = i + (J(b) ? b : 0), R;
  switch (y) {
    case "start":
      R = Uf("calc(".concat(c, ")"));
      break;
    case "middle":
      R = Uf("calc(".concat((T.length - 1) / 2, " * -").concat(u, " + (").concat(c, " / 2))"));
      break;
    default:
      R = Uf("calc(".concat(T.length - 1, " * -").concat(u, ")"));
      break;
  }
  var B = [];
  if (f) {
    var F = T[0].width, $ = v.width;
    B.push("scale(".concat((J($) ? $ / F : 1) / F, ")"));
  }
  return _ && B.push("rotate(".concat(_, ", ").concat(j, ", ").concat(D, ")")), B.length && (N.transform = B.join(" ")), /* @__PURE__ */ C.createElement("text", gh({}, le(N, !0), {
    x: j,
    y: D,
    className: pe("recharts-text", O),
    textAnchor: p,
    fill: E.includes("url") ? gv : E
  }), T.map(function(q, Y) {
    var Q = q.words.join(I ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ C.createElement("tspan", {
        x: j,
        dy: Y === 0 ? R : u,
        key: "".concat(Q, "-").concat(Y)
      }, Q)
    );
  }));
};
function qr(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function yM(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function a0(e) {
  let t, r, n;
  e.length !== 2 ? (t = qr, r = (u, s) => qr(e(u), s), n = (u, s) => e(u) - s) : (t = e === qr || e === yM ? e : bM, r = e, n = e);
  function a(u, s, c = 0, l = u.length) {
    if (c < l) {
      if (t(s, s) !== 0) return l;
      do {
        const f = c + l >>> 1;
        r(u[f], s) < 0 ? c = f + 1 : l = f;
      } while (c < l);
    }
    return c;
  }
  function i(u, s, c = 0, l = u.length) {
    if (c < l) {
      if (t(s, s) !== 0) return l;
      do {
        const f = c + l >>> 1;
        r(u[f], s) <= 0 ? c = f + 1 : l = f;
      } while (c < l);
    }
    return c;
  }
  function o(u, s, c = 0, l = u.length) {
    const f = a(u, s, c, l - 1);
    return f > c && n(u[f - 1], s) > -n(u[f], s) ? f - 1 : f;
  }
  return { left: a, center: o, right: i };
}
function bM() {
  return 0;
}
function FA(e) {
  return e === null ? NaN : +e;
}
function* gM(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const vM = a0(qr), Ji = vM.right;
a0(FA).center;
class vv extends Map {
  constructor(t, r = _M) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, a] of t) this.set(n, a);
  }
  get(t) {
    return super.get(Ev(this, t));
  }
  has(t) {
    return super.has(Ev(this, t));
  }
  set(t, r) {
    return super.set(EM(this, t), r);
  }
  delete(t) {
    return super.delete(TM(this, t));
  }
}
function Ev({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function EM({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function TM({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function _M(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function AM(e = qr) {
  if (e === qr) return $A;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function $A(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const OM = Math.sqrt(50), SM = Math.sqrt(10), xM = Math.sqrt(2);
function Go(e, t, r) {
  const n = (t - e) / Math.max(0, r), a = Math.floor(Math.log10(n)), i = n / Math.pow(10, a), o = i >= OM ? 10 : i >= SM ? 5 : i >= xM ? 2 : 1;
  let u, s, c;
  return a < 0 ? (c = Math.pow(10, -a) / o, u = Math.round(e * c), s = Math.round(t * c), u / c < e && ++u, s / c > t && --s, c = -c) : (c = Math.pow(10, a) * o, u = Math.round(e / c), s = Math.round(t / c), u * c < e && ++u, s * c > t && --s), s < u && 0.5 <= r && r < 2 ? Go(e, t, r * 2) : [u, s, c];
}
function vh(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [a, i, o] = n ? Go(t, e, r) : Go(e, t, r);
  if (!(i >= a)) return [];
  const u = i - a + 1, s = new Array(u);
  if (n)
    if (o < 0) for (let c = 0; c < u; ++c) s[c] = (i - c) / -o;
    else for (let c = 0; c < u; ++c) s[c] = (i - c) * o;
  else if (o < 0) for (let c = 0; c < u; ++c) s[c] = (a + c) / -o;
  else for (let c = 0; c < u; ++c) s[c] = (a + c) * o;
  return s;
}
function Eh(e, t, r) {
  return t = +t, e = +e, r = +r, Go(e, t, r)[2];
}
function Th(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, a = n ? Eh(t, e, r) : Eh(e, t, r);
  return (n ? -1 : 1) * (a < 0 ? 1 / -a : a);
}
function Tv(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function _v(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function UA(e, t, r = 0, n = 1 / 0, a) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (a = a === void 0 ? $A : AM(a); n > r; ) {
    if (n - r > 600) {
      const s = n - r + 1, c = t - r + 1, l = Math.log(s), f = 0.5 * Math.exp(2 * l / 3), h = 0.5 * Math.sqrt(l * f * (s - f) / s) * (c - s / 2 < 0 ? -1 : 1), p = Math.max(r, Math.floor(t - c * f / s + h)), g = Math.min(n, Math.floor(t + (s - c) * f / s + h));
      UA(e, t, p, g, a);
    }
    const i = e[t];
    let o = r, u = n;
    for (La(e, r, t), a(e[n], i) > 0 && La(e, r, n); o < u; ) {
      for (La(e, o, u), ++o, --u; a(e[o], i) < 0; ) ++o;
      for (; a(e[u], i) > 0; ) --u;
    }
    a(e[r], i) === 0 ? La(e, r, u) : (++u, La(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1);
  }
  return e;
}
function La(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function wM(e, t, r) {
  if (e = Float64Array.from(gM(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return _v(e);
    if (t >= 1) return Tv(e);
    var n, a = (n - 1) * t, i = Math.floor(a), o = Tv(UA(e, i).subarray(0, i + 1)), u = _v(e.subarray(i + 1));
    return o + (u - o) * (a - i);
  }
}
function PM(e, t, r = FA) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, a = (n - 1) * t, i = Math.floor(a), o = +r(e[i], i, e), u = +r(e[i + 1], i + 1, e);
    return o + (u - o) * (a - i);
  }
}
function IM(e, t, r) {
  e = +e, t = +t, r = (a = arguments.length) < 2 ? (t = e, e = 0, 1) : a < 3 ? 1 : +r;
  for (var n = -1, a = Math.max(0, Math.ceil((t - e) / r)) | 0, i = new Array(a); ++n < a; )
    i[n] = e + n * r;
  return i;
}
function Ut(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Pr(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const _h = /* @__PURE__ */ Symbol("implicit");
function i0() {
  var e = new vv(), t = [], r = [], n = _h;
  function a(i) {
    let o = e.get(i);
    if (o === void 0) {
      if (n !== _h) return n;
      e.set(i, o = t.push(i) - 1);
    }
    return r[o % r.length];
  }
  return a.domain = function(i) {
    if (!arguments.length) return t.slice();
    t = [], e = new vv();
    for (const o of i)
      e.has(o) || e.set(o, t.push(o) - 1);
    return a;
  }, a.range = function(i) {
    return arguments.length ? (r = Array.from(i), a) : r.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return i0(t, r).unknown(n);
  }, Ut.apply(a, arguments), a;
}
function gi() {
  var e = i0().unknown(void 0), t = e.domain, r = e.range, n = 0, a = 1, i, o, u = !1, s = 0, c = 0, l = 0.5;
  delete e.unknown;
  function f() {
    var h = t().length, p = a < n, g = p ? a : n, y = p ? n : a;
    i = (y - g) / Math.max(1, h - s + c * 2), u && (i = Math.floor(i)), g += (y - g - i * (h - s)) * l, o = i * (1 - s), u && (g = Math.round(g), o = Math.round(o));
    var m = IM(h).map(function(E) {
      return g + i * E;
    });
    return r(p ? m.reverse() : m);
  }
  return e.domain = function(h) {
    return arguments.length ? (t(h), f()) : t();
  }, e.range = function(h) {
    return arguments.length ? ([n, a] = h, n = +n, a = +a, f()) : [n, a];
  }, e.rangeRound = function(h) {
    return [n, a] = h, n = +n, a = +a, u = !0, f();
  }, e.bandwidth = function() {
    return o;
  }, e.step = function() {
    return i;
  }, e.round = function(h) {
    return arguments.length ? (u = !!h, f()) : u;
  }, e.padding = function(h) {
    return arguments.length ? (s = Math.min(1, c = +h), f()) : s;
  }, e.paddingInner = function(h) {
    return arguments.length ? (s = Math.min(1, h), f()) : s;
  }, e.paddingOuter = function(h) {
    return arguments.length ? (c = +h, f()) : c;
  }, e.align = function(h) {
    return arguments.length ? (l = Math.max(0, Math.min(1, h)), f()) : l;
  }, e.copy = function() {
    return gi(t(), [n, a]).round(u).paddingInner(s).paddingOuter(c).align(l);
  }, Ut.apply(f(), arguments);
}
function HA(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return HA(t());
  }, e;
}
function ti() {
  return HA(gi.apply(null, arguments).paddingInner(1));
}
function o0(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function qA(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function eo() {
}
var vi = 0.7, Ko = 1 / vi, zn = "\\s*([+-]?\\d+)\\s*", Ei = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", rr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", CM = /^#([0-9a-f]{3,8})$/, NM = new RegExp(`^rgb\\(${zn},${zn},${zn}\\)$`), RM = new RegExp(`^rgb\\(${rr},${rr},${rr}\\)$`), DM = new RegExp(`^rgba\\(${zn},${zn},${zn},${Ei}\\)$`), MM = new RegExp(`^rgba\\(${rr},${rr},${rr},${Ei}\\)$`), LM = new RegExp(`^hsl\\(${Ei},${rr},${rr}\\)$`), kM = new RegExp(`^hsla\\(${Ei},${rr},${rr},${Ei}\\)$`), Av = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
o0(eo, Ti, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ov,
  // Deprecated! Use color.formatHex.
  formatHex: Ov,
  formatHex8: BM,
  formatHsl: jM,
  formatRgb: Sv,
  toString: Sv
});
function Ov() {
  return this.rgb().formatHex();
}
function BM() {
  return this.rgb().formatHex8();
}
function jM() {
  return WA(this).formatHsl();
}
function Sv() {
  return this.rgb().formatRgb();
}
function Ti(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = CM.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? xv(t) : r === 3 ? new gt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? yo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? yo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = NM.exec(e)) ? new gt(t[1], t[2], t[3], 1) : (t = RM.exec(e)) ? new gt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = DM.exec(e)) ? yo(t[1], t[2], t[3], t[4]) : (t = MM.exec(e)) ? yo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = LM.exec(e)) ? Iv(t[1], t[2] / 100, t[3] / 100, 1) : (t = kM.exec(e)) ? Iv(t[1], t[2] / 100, t[3] / 100, t[4]) : Av.hasOwnProperty(e) ? xv(Av[e]) : e === "transparent" ? new gt(NaN, NaN, NaN, 0) : null;
}
function xv(e) {
  return new gt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function yo(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new gt(e, t, r, n);
}
function FM(e) {
  return e instanceof eo || (e = Ti(e)), e ? (e = e.rgb(), new gt(e.r, e.g, e.b, e.opacity)) : new gt();
}
function Ah(e, t, r, n) {
  return arguments.length === 1 ? FM(e) : new gt(e, t, r, n ?? 1);
}
function gt(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
o0(gt, Ah, qA(eo, {
  brighter(e) {
    return e = e == null ? Ko : Math.pow(Ko, e), new gt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? vi : Math.pow(vi, e), new gt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new gt(dn(this.r), dn(this.g), dn(this.b), Vo(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: wv,
  // Deprecated! Use color.formatHex.
  formatHex: wv,
  formatHex8: $M,
  formatRgb: Pv,
  toString: Pv
}));
function wv() {
  return `#${un(this.r)}${un(this.g)}${un(this.b)}`;
}
function $M() {
  return `#${un(this.r)}${un(this.g)}${un(this.b)}${un((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Pv() {
  const e = Vo(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${dn(this.r)}, ${dn(this.g)}, ${dn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Vo(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function dn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function un(e) {
  return e = dn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Iv(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Wt(e, t, r, n);
}
function WA(e) {
  if (e instanceof Wt) return new Wt(e.h, e.s, e.l, e.opacity);
  if (e instanceof eo || (e = Ti(e)), !e) return new Wt();
  if (e instanceof Wt) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, a = Math.min(t, r, n), i = Math.max(t, r, n), o = NaN, u = i - a, s = (i + a) / 2;
  return u ? (t === i ? o = (r - n) / u + (r < n) * 6 : r === i ? o = (n - t) / u + 2 : o = (t - r) / u + 4, u /= s < 0.5 ? i + a : 2 - i - a, o *= 60) : u = s > 0 && s < 1 ? 0 : o, new Wt(o, u, s, e.opacity);
}
function UM(e, t, r, n) {
  return arguments.length === 1 ? WA(e) : new Wt(e, t, r, n ?? 1);
}
function Wt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
o0(Wt, UM, qA(eo, {
  brighter(e) {
    return e = e == null ? Ko : Math.pow(Ko, e), new Wt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? vi : Math.pow(vi, e), new Wt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, a = 2 * r - n;
    return new gt(
      Hf(e >= 240 ? e - 240 : e + 120, a, n),
      Hf(e, a, n),
      Hf(e < 120 ? e + 240 : e - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new Wt(Cv(this.h), bo(this.s), bo(this.l), Vo(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Vo(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Cv(this.h)}, ${bo(this.s) * 100}%, ${bo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Cv(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function bo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Hf(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const u0 = (e) => () => e;
function HM(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function qM(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function WM(e) {
  return (e = +e) == 1 ? YA : function(t, r) {
    return r - t ? qM(t, r, e) : u0(isNaN(t) ? r : t);
  };
}
function YA(e, t) {
  var r = t - e;
  return r ? HM(e, r) : u0(isNaN(e) ? t : e);
}
const Nv = (function e(t) {
  var r = WM(t);
  function n(a, i) {
    var o = r((a = Ah(a)).r, (i = Ah(i)).r), u = r(a.g, i.g), s = r(a.b, i.b), c = YA(a.opacity, i.opacity);
    return function(l) {
      return a.r = o(l), a.g = u(l), a.b = s(l), a.opacity = c(l), a + "";
    };
  }
  return n.gamma = e, n;
})(1);
function YM(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), a;
  return function(i) {
    for (a = 0; a < r; ++a) n[a] = e[a] * (1 - i) + t[a] * i;
    return n;
  };
}
function zM(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function GM(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, a = new Array(n), i = new Array(r), o;
  for (o = 0; o < n; ++o) a[o] = wa(e[o], t[o]);
  for (; o < r; ++o) i[o] = t[o];
  return function(u) {
    for (o = 0; o < n; ++o) i[o] = a[o](u);
    return i;
  };
}
function KM(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function Xo(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function VM(e, t) {
  var r = {}, n = {}, a;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in e ? r[a] = wa(e[a], t[a]) : n[a] = t[a];
  return function(i) {
    for (a in r) n[a] = r[a](i);
    return n;
  };
}
var Oh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, qf = new RegExp(Oh.source, "g");
function XM(e) {
  return function() {
    return e;
  };
}
function QM(e) {
  return function(t) {
    return e(t) + "";
  };
}
function ZM(e, t) {
  var r = Oh.lastIndex = qf.lastIndex = 0, n, a, i, o = -1, u = [], s = [];
  for (e = e + "", t = t + ""; (n = Oh.exec(e)) && (a = qf.exec(t)); )
    (i = a.index) > r && (i = t.slice(r, i), u[o] ? u[o] += i : u[++o] = i), (n = n[0]) === (a = a[0]) ? u[o] ? u[o] += a : u[++o] = a : (u[++o] = null, s.push({ i: o, x: Xo(n, a) })), r = qf.lastIndex;
  return r < t.length && (i = t.slice(r), u[o] ? u[o] += i : u[++o] = i), u.length < 2 ? s[0] ? QM(s[0].x) : XM(t) : (t = s.length, function(c) {
    for (var l = 0, f; l < t; ++l) u[(f = s[l]).i] = f.x(c);
    return u.join("");
  });
}
function wa(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? u0(t) : (r === "number" ? Xo : r === "string" ? (n = Ti(t)) ? (t = n, Nv) : ZM : t instanceof Ti ? Nv : t instanceof Date ? KM : zM(t) ? YM : Array.isArray(t) ? GM : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? VM : Xo)(e, t);
}
function s0(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function JM(e, t) {
  t === void 0 && (t = e, e = wa);
  for (var r = 0, n = t.length - 1, a = t[0], i = new Array(n < 0 ? 0 : n); r < n; ) i[r] = e(a, a = t[++r]);
  return function(o) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return i[u](o - u);
  };
}
function eL(e) {
  return function() {
    return e;
  };
}
function Qo(e) {
  return +e;
}
var Rv = [0, 1];
function pt(e) {
  return e;
}
function Sh(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : eL(isNaN(t) ? NaN : 0.5);
}
function tL(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function rL(e, t, r) {
  var n = e[0], a = e[1], i = t[0], o = t[1];
  return a < n ? (n = Sh(a, n), i = r(o, i)) : (n = Sh(n, a), i = r(i, o)), function(u) {
    return i(n(u));
  };
}
function nL(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, a = new Array(n), i = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    a[o] = Sh(e[o], e[o + 1]), i[o] = r(t[o], t[o + 1]);
  return function(u) {
    var s = Ji(e, u, 1, n) - 1;
    return i[s](a[s](u));
  };
}
function to(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function ts() {
  var e = Rv, t = Rv, r = wa, n, a, i, o = pt, u, s, c;
  function l() {
    var h = Math.min(e.length, t.length);
    return o !== pt && (o = tL(e[0], e[h - 1])), u = h > 2 ? nL : rL, s = c = null, f;
  }
  function f(h) {
    return h == null || isNaN(h = +h) ? i : (s || (s = u(e.map(n), t, r)))(n(o(h)));
  }
  return f.invert = function(h) {
    return o(a((c || (c = u(t, e.map(n), Xo)))(h)));
  }, f.domain = function(h) {
    return arguments.length ? (e = Array.from(h, Qo), l()) : e.slice();
  }, f.range = function(h) {
    return arguments.length ? (t = Array.from(h), l()) : t.slice();
  }, f.rangeRound = function(h) {
    return t = Array.from(h), r = s0, l();
  }, f.clamp = function(h) {
    return arguments.length ? (o = h ? !0 : pt, l()) : o !== pt;
  }, f.interpolate = function(h) {
    return arguments.length ? (r = h, l()) : r;
  }, f.unknown = function(h) {
    return arguments.length ? (i = h, f) : i;
  }, function(h, p) {
    return n = h, a = p, l();
  };
}
function c0() {
  return ts()(pt, pt);
}
function aL(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function Zo(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function ra(e) {
  return e = Zo(Math.abs(e)), e ? e[1] : NaN;
}
function iL(e, t) {
  return function(r, n) {
    for (var a = r.length, i = [], o = 0, u = e[0], s = 0; a > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), i.push(r.substring(a -= u, a + u)), !((s += u + 1) > n)); )
      u = e[o = (o + 1) % e.length];
    return i.reverse().join(t);
  };
}
function oL(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var uL = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function _i(e) {
  if (!(t = uL.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new l0({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
_i.prototype = l0.prototype;
function l0(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
l0.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function sL(e) {
  e: for (var t = e.length, r = 1, n = -1, a; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = a = r;
        break;
      case "0":
        n === 0 && (n = r), a = r;
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(a + 1) : e;
}
var Jo;
function cL(e, t) {
  var r = Zo(e, t);
  if (!r) return Jo = void 0, e.toPrecision(t);
  var n = r[0], a = r[1], i = a - (Jo = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, o = n.length;
  return i === o ? n : i > o ? n + new Array(i - o + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + Zo(e, Math.max(0, t + i - 1))[0];
}
function Dv(e, t) {
  var r = Zo(e, t);
  if (!r) return e + "";
  var n = r[0], a = r[1];
  return a < 0 ? "0." + new Array(-a).join("0") + n : n.length > a + 1 ? n.slice(0, a + 1) + "." + n.slice(a + 1) : n + new Array(a - n.length + 2).join("0");
}
const Mv = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: aL,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Dv(e * 100, t),
  r: Dv,
  s: cL,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Lv(e) {
  return e;
}
var kv = Array.prototype.map, Bv = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function lL(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Lv : iL(kv.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", a = e.decimal === void 0 ? "." : e.decimal + "", i = e.numerals === void 0 ? Lv : oL(kv.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", u = e.minus === void 0 ? "−" : e.minus + "", s = e.nan === void 0 ? "NaN" : e.nan + "";
  function c(f, h) {
    f = _i(f);
    var p = f.fill, g = f.align, y = f.sign, m = f.symbol, E = f.zero, v = f.width, T = f.comma, A = f.precision, b = f.trim, _ = f.type;
    _ === "n" ? (T = !0, _ = "g") : Mv[_] || (A === void 0 && (A = 12), b = !0, _ = "g"), (E || p === "0" && g === "=") && (E = !0, p = "0", g = "=");
    var O = (h && h.prefix !== void 0 ? h.prefix : "") + (m === "$" ? r : m === "#" && /[boxX]/.test(_) ? "0" + _.toLowerCase() : ""), I = (m === "$" ? n : /[%p]/.test(_) ? o : "") + (h && h.suffix !== void 0 ? h.suffix : ""), N = Mv[_], j = /[defgprs%]/.test(_);
    A = A === void 0 ? 6 : /[gprs]/.test(_) ? Math.max(1, Math.min(21, A)) : Math.max(0, Math.min(20, A));
    function D(R) {
      var B = O, F = I, $, q, Y;
      if (_ === "c")
        F = N(R) + F, R = "";
      else {
        R = +R;
        var Q = R < 0 || 1 / R < 0;
        if (R = isNaN(R) ? s : N(Math.abs(R), A), b && (R = sL(R)), Q && +R == 0 && y !== "+" && (Q = !1), B = (Q ? y === "(" ? y : u : y === "-" || y === "(" ? "" : y) + B, F = (_ === "s" && !isNaN(R) && Jo !== void 0 ? Bv[8 + Jo / 3] : "") + F + (Q && y === "(" ? ")" : ""), j) {
          for ($ = -1, q = R.length; ++$ < q; )
            if (Y = R.charCodeAt($), 48 > Y || Y > 57) {
              F = (Y === 46 ? a + R.slice($ + 1) : R.slice($)) + F, R = R.slice(0, $);
              break;
            }
        }
      }
      T && !E && (R = t(R, 1 / 0));
      var te = B.length + R.length + F.length, k = te < v ? new Array(v - te + 1).join(p) : "";
      switch (T && E && (R = t(k + R, k.length ? v - F.length : 1 / 0), k = ""), g) {
        case "<":
          R = B + R + F + k;
          break;
        case "=":
          R = B + k + R + F;
          break;
        case "^":
          R = k.slice(0, te = k.length >> 1) + B + R + F + k.slice(te);
          break;
        default:
          R = k + B + R + F;
          break;
      }
      return i(R);
    }
    return D.toString = function() {
      return f + "";
    }, D;
  }
  function l(f, h) {
    var p = Math.max(-8, Math.min(8, Math.floor(ra(h) / 3))) * 3, g = Math.pow(10, -p), y = c((f = _i(f), f.type = "f", f), { suffix: Bv[8 + p / 3] });
    return function(m) {
      return y(g * m);
    };
  }
  return {
    format: c,
    formatPrefix: l
  };
}
var go, f0, zA;
fL({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function fL(e) {
  return go = lL(e), f0 = go.format, zA = go.formatPrefix, go;
}
function dL(e) {
  return Math.max(0, -ra(Math.abs(e)));
}
function hL(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(ra(t) / 3))) * 3 - ra(Math.abs(e)));
}
function pL(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, ra(t) - ra(e)) + 1;
}
function GA(e, t, r, n) {
  var a = Th(e, t, r), i;
  switch (n = _i(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(i = hL(a, o)) && (n.precision = i), zA(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = pL(a, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = i - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = dL(a)) && (n.precision = i - (n.type === "%") * 2);
      break;
    }
  }
  return f0(n);
}
function Kr(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return vh(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var a = t();
    return GA(a[0], a[a.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), a = 0, i = n.length - 1, o = n[a], u = n[i], s, c, l = 10;
    for (u < o && (c = o, o = u, u = c, c = a, a = i, i = c); l-- > 0; ) {
      if (c = Eh(o, u, r), c === s)
        return n[a] = o, n[i] = u, t(n);
      if (c > 0)
        o = Math.floor(o / c) * c, u = Math.ceil(u / c) * c;
      else if (c < 0)
        o = Math.ceil(o * c) / c, u = Math.floor(u * c) / c;
      else
        break;
      s = c;
    }
    return e;
  }, e;
}
function eu() {
  var e = c0();
  return e.copy = function() {
    return to(e, eu());
  }, Ut.apply(e, arguments), Kr(e);
}
function KA(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, Qo), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return KA(e).unknown(t);
  }, e = arguments.length ? Array.from(e, Qo) : [0, 1], Kr(r);
}
function VA(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, a = e[r], i = e[n], o;
  return i < a && (o = r, r = n, n = o, o = a, a = i, i = o), e[r] = t.floor(a), e[n] = t.ceil(i), e;
}
function jv(e) {
  return Math.log(e);
}
function Fv(e) {
  return Math.exp(e);
}
function mL(e) {
  return -Math.log(-e);
}
function yL(e) {
  return -Math.exp(-e);
}
function bL(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function gL(e) {
  return e === 10 ? bL : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function vL(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function $v(e) {
  return (t, r) => -e(-t, r);
}
function d0(e) {
  const t = e(jv, Fv), r = t.domain;
  let n = 10, a, i;
  function o() {
    return a = vL(n), i = gL(n), r()[0] < 0 ? (a = $v(a), i = $v(i), e(mL, yL)) : e(jv, Fv), t;
  }
  return t.base = function(u) {
    return arguments.length ? (n = +u, o()) : n;
  }, t.domain = function(u) {
    return arguments.length ? (r(u), o()) : r();
  }, t.ticks = (u) => {
    const s = r();
    let c = s[0], l = s[s.length - 1];
    const f = l < c;
    f && ([c, l] = [l, c]);
    let h = a(c), p = a(l), g, y;
    const m = u == null ? 10 : +u;
    let E = [];
    if (!(n % 1) && p - h < m) {
      if (h = Math.floor(h), p = Math.ceil(p), c > 0) {
        for (; h <= p; ++h)
          for (g = 1; g < n; ++g)
            if (y = h < 0 ? g / i(-h) : g * i(h), !(y < c)) {
              if (y > l) break;
              E.push(y);
            }
      } else for (; h <= p; ++h)
        for (g = n - 1; g >= 1; --g)
          if (y = h > 0 ? g / i(-h) : g * i(h), !(y < c)) {
            if (y > l) break;
            E.push(y);
          }
      E.length * 2 < m && (E = vh(c, l, m));
    } else
      E = vh(h, p, Math.min(p - h, m)).map(i);
    return f ? E.reverse() : E;
  }, t.tickFormat = (u, s) => {
    if (u == null && (u = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = _i(s)).precision == null && (s.trim = !0), s = f0(s)), u === 1 / 0) return s;
    const c = Math.max(1, n * u / t.ticks().length);
    return (l) => {
      let f = l / i(Math.round(a(l)));
      return f * n < n - 0.5 && (f *= n), f <= c ? s(l) : "";
    };
  }, t.nice = () => r(VA(r(), {
    floor: (u) => i(Math.floor(a(u))),
    ceil: (u) => i(Math.ceil(a(u)))
  })), t;
}
function XA() {
  const e = d0(ts()).domain([1, 10]);
  return e.copy = () => to(e, XA()).base(e.base()), Ut.apply(e, arguments), e;
}
function Uv(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function Hv(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function h0(e) {
  var t = 1, r = e(Uv(t), Hv(t));
  return r.constant = function(n) {
    return arguments.length ? e(Uv(t = +n), Hv(t)) : t;
  }, Kr(r);
}
function QA() {
  var e = h0(ts());
  return e.copy = function() {
    return to(e, QA()).constant(e.constant());
  }, Ut.apply(e, arguments);
}
function qv(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function EL(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function TL(e) {
  return e < 0 ? -e * e : e * e;
}
function p0(e) {
  var t = e(pt, pt), r = 1;
  function n() {
    return r === 1 ? e(pt, pt) : r === 0.5 ? e(EL, TL) : e(qv(r), qv(1 / r));
  }
  return t.exponent = function(a) {
    return arguments.length ? (r = +a, n()) : r;
  }, Kr(t);
}
function m0() {
  var e = p0(ts());
  return e.copy = function() {
    return to(e, m0()).exponent(e.exponent());
  }, Ut.apply(e, arguments), e;
}
function _L() {
  return m0.apply(null, arguments).exponent(0.5);
}
function Wv(e) {
  return Math.sign(e) * e * e;
}
function AL(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function ZA() {
  var e = c0(), t = [0, 1], r = !1, n;
  function a(i) {
    var o = AL(e(i));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return a.invert = function(i) {
    return e.invert(Wv(i));
  }, a.domain = function(i) {
    return arguments.length ? (e.domain(i), a) : e.domain();
  }, a.range = function(i) {
    return arguments.length ? (e.range((t = Array.from(i, Qo)).map(Wv)), a) : t.slice();
  }, a.rangeRound = function(i) {
    return a.range(i).round(!0);
  }, a.round = function(i) {
    return arguments.length ? (r = !!i, a) : r;
  }, a.clamp = function(i) {
    return arguments.length ? (e.clamp(i), a) : e.clamp();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return ZA(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, Ut.apply(a, arguments), Kr(a);
}
function JA() {
  var e = [], t = [], r = [], n;
  function a() {
    var o = 0, u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++o < u; ) r[o - 1] = PM(e, o / u);
    return i;
  }
  function i(o) {
    return o == null || isNaN(o = +o) ? n : t[Ji(r, o)];
  }
  return i.invertExtent = function(o) {
    var u = t.indexOf(o);
    return u < 0 ? [NaN, NaN] : [
      u > 0 ? r[u - 1] : e[0],
      u < r.length ? r[u] : e[e.length - 1]
    ];
  }, i.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let u of o) u != null && !isNaN(u = +u) && e.push(u);
    return e.sort(qr), a();
  }, i.range = function(o) {
    return arguments.length ? (t = Array.from(o), a()) : t.slice();
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n;
  }, i.quantiles = function() {
    return r.slice();
  }, i.copy = function() {
    return JA().domain(e).range(t).unknown(n);
  }, Ut.apply(i, arguments);
}
function eO() {
  var e = 0, t = 1, r = 1, n = [0.5], a = [0, 1], i;
  function o(s) {
    return s != null && s <= s ? a[Ji(n, s, 0, r)] : i;
  }
  function u() {
    var s = -1;
    for (n = new Array(r); ++s < r; ) n[s] = ((s + 1) * t - (s - r) * e) / (r + 1);
    return o;
  }
  return o.domain = function(s) {
    return arguments.length ? ([e, t] = s, e = +e, t = +t, u()) : [e, t];
  }, o.range = function(s) {
    return arguments.length ? (r = (a = Array.from(s)).length - 1, u()) : a.slice();
  }, o.invertExtent = function(s) {
    var c = a.indexOf(s);
    return c < 0 ? [NaN, NaN] : c < 1 ? [e, n[0]] : c >= r ? [n[r - 1], t] : [n[c - 1], n[c]];
  }, o.unknown = function(s) {
    return arguments.length && (i = s), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return eO().domain([e, t]).range(a).unknown(i);
  }, Ut.apply(Kr(o), arguments);
}
function tO() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function a(i) {
    return i != null && i <= i ? t[Ji(e, i, 0, n)] : r;
  }
  return a.domain = function(i) {
    return arguments.length ? (e = Array.from(i), n = Math.min(e.length, t.length - 1), a) : e.slice();
  }, a.range = function(i) {
    return arguments.length ? (t = Array.from(i), n = Math.min(e.length, t.length - 1), a) : t.slice();
  }, a.invertExtent = function(i) {
    var o = t.indexOf(i);
    return [e[o - 1], e[o]];
  }, a.unknown = function(i) {
    return arguments.length ? (r = i, a) : r;
  }, a.copy = function() {
    return tO().domain(e).range(t).unknown(r);
  }, Ut.apply(a, arguments);
}
const Wf = /* @__PURE__ */ new Date(), Yf = /* @__PURE__ */ new Date();
function Ke(e, t, r, n) {
  function a(i) {
    return e(i = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+i)), i;
  }
  return a.floor = (i) => (e(i = /* @__PURE__ */ new Date(+i)), i), a.ceil = (i) => (e(i = new Date(i - 1)), t(i, 1), e(i), i), a.round = (i) => {
    const o = a(i), u = a.ceil(i);
    return i - o < u - i ? o : u;
  }, a.offset = (i, o) => (t(i = /* @__PURE__ */ new Date(+i), o == null ? 1 : Math.floor(o)), i), a.range = (i, o, u) => {
    const s = [];
    if (i = a.ceil(i), u = u == null ? 1 : Math.floor(u), !(i < o) || !(u > 0)) return s;
    let c;
    do
      s.push(c = /* @__PURE__ */ new Date(+i)), t(i, u), e(i);
    while (c < i && i < o);
    return s;
  }, a.filter = (i) => Ke((o) => {
    if (o >= o) for (; e(o), !i(o); ) o.setTime(o - 1);
  }, (o, u) => {
    if (o >= o)
      if (u < 0) for (; ++u <= 0; )
        for (; t(o, -1), !i(o); )
          ;
      else for (; --u >= 0; )
        for (; t(o, 1), !i(o); )
          ;
  }), r && (a.count = (i, o) => (Wf.setTime(+i), Yf.setTime(+o), e(Wf), e(Yf), Math.floor(r(Wf, Yf))), a.every = (i) => (i = Math.floor(i), !isFinite(i) || !(i > 0) ? null : i > 1 ? a.filter(n ? (o) => n(o) % i === 0 : (o) => a.count(0, o) % i === 0) : a)), a;
}
const tu = Ke(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
tu.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Ke((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : tu);
tu.range;
const hr = 1e3, Mt = hr * 60, pr = Mt * 60, _r = pr * 24, y0 = _r * 7, Yv = _r * 30, zf = _r * 365, sn = Ke((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * hr);
}, (e, t) => (t - e) / hr, (e) => e.getUTCSeconds());
sn.range;
const b0 = Ke((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * hr);
}, (e, t) => {
  e.setTime(+e + t * Mt);
}, (e, t) => (t - e) / Mt, (e) => e.getMinutes());
b0.range;
const g0 = Ke((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * Mt);
}, (e, t) => (t - e) / Mt, (e) => e.getUTCMinutes());
g0.range;
const v0 = Ke((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * hr - e.getMinutes() * Mt);
}, (e, t) => {
  e.setTime(+e + t * pr);
}, (e, t) => (t - e) / pr, (e) => e.getHours());
v0.range;
const E0 = Ke((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * pr);
}, (e, t) => (t - e) / pr, (e) => e.getUTCHours());
E0.range;
const ro = Ke(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Mt) / _r,
  (e) => e.getDate() - 1
);
ro.range;
const rs = Ke((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / _r, (e) => e.getUTCDate() - 1);
rs.range;
const rO = Ke((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / _r, (e) => Math.floor(e / _r));
rO.range;
function Sn(e) {
  return Ke((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Mt) / y0);
}
const ns = Sn(0), ru = Sn(1), OL = Sn(2), SL = Sn(3), na = Sn(4), xL = Sn(5), wL = Sn(6);
ns.range;
ru.range;
OL.range;
SL.range;
na.range;
xL.range;
wL.range;
function xn(e) {
  return Ke((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / y0);
}
const as = xn(0), nu = xn(1), PL = xn(2), IL = xn(3), aa = xn(4), CL = xn(5), NL = xn(6);
as.range;
nu.range;
PL.range;
IL.range;
aa.range;
CL.range;
NL.range;
const T0 = Ke((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
T0.range;
const _0 = Ke((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
_0.range;
const Ar = Ke((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Ar.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Ke((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
Ar.range;
const Or = Ke((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Or.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Ke((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
Or.range;
function nO(e, t, r, n, a, i) {
  const o = [
    [sn, 1, hr],
    [sn, 5, 5 * hr],
    [sn, 15, 15 * hr],
    [sn, 30, 30 * hr],
    [i, 1, Mt],
    [i, 5, 5 * Mt],
    [i, 15, 15 * Mt],
    [i, 30, 30 * Mt],
    [a, 1, pr],
    [a, 3, 3 * pr],
    [a, 6, 6 * pr],
    [a, 12, 12 * pr],
    [n, 1, _r],
    [n, 2, 2 * _r],
    [r, 1, y0],
    [t, 1, Yv],
    [t, 3, 3 * Yv],
    [e, 1, zf]
  ];
  function u(c, l, f) {
    const h = l < c;
    h && ([c, l] = [l, c]);
    const p = f && typeof f.range == "function" ? f : s(c, l, f), g = p ? p.range(c, +l + 1) : [];
    return h ? g.reverse() : g;
  }
  function s(c, l, f) {
    const h = Math.abs(l - c) / f, p = a0(([, , m]) => m).right(o, h);
    if (p === o.length) return e.every(Th(c / zf, l / zf, f));
    if (p === 0) return tu.every(Math.max(Th(c, l, f), 1));
    const [g, y] = o[h / o[p - 1][2] < o[p][2] / h ? p - 1 : p];
    return g.every(y);
  }
  return [u, s];
}
const [RL, DL] = nO(Or, _0, as, rO, E0, g0), [ML, LL] = nO(Ar, T0, ns, ro, v0, b0);
function Gf(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Kf(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function ka(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function kL(e) {
  var t = e.dateTime, r = e.date, n = e.time, a = e.periods, i = e.days, o = e.shortDays, u = e.months, s = e.shortMonths, c = Ba(a), l = ja(a), f = Ba(i), h = ja(i), p = Ba(o), g = ja(o), y = Ba(u), m = ja(u), E = Ba(s), v = ja(s), T = {
    a: Y,
    A: Q,
    b: te,
    B: k,
    c: null,
    d: Qv,
    e: Qv,
    f: ik,
    g: mk,
    G: bk,
    H: rk,
    I: nk,
    j: ak,
    L: aO,
    m: ok,
    M: uk,
    p: W,
    q: z,
    Q: e1,
    s: t1,
    S: sk,
    u: ck,
    U: lk,
    V: fk,
    w: dk,
    W: hk,
    x: null,
    X: null,
    y: pk,
    Y: yk,
    Z: gk,
    "%": Jv
  }, A = {
    a: Z,
    A: ne,
    b: oe,
    B: ue,
    c: null,
    d: Zv,
    e: Zv,
    f: _k,
    g: Rk,
    G: Mk,
    H: vk,
    I: Ek,
    j: Tk,
    L: oO,
    m: Ak,
    M: Ok,
    p: fe,
    q: ce,
    Q: e1,
    s: t1,
    S: Sk,
    u: xk,
    U: wk,
    V: Pk,
    w: Ik,
    W: Ck,
    x: null,
    X: null,
    y: Nk,
    Y: Dk,
    Z: Lk,
    "%": Jv
  }, b = {
    a: j,
    A: D,
    b: R,
    B,
    c: F,
    d: Vv,
    e: Vv,
    f: ZL,
    g: Kv,
    G: Gv,
    H: Xv,
    I: Xv,
    j: KL,
    L: QL,
    m: GL,
    M: VL,
    p: N,
    q: zL,
    Q: ek,
    s: tk,
    S: XL,
    u: UL,
    U: HL,
    V: qL,
    w: $L,
    W: WL,
    x: $,
    X: q,
    y: Kv,
    Y: Gv,
    Z: YL,
    "%": JL
  };
  T.x = _(r, T), T.X = _(n, T), T.c = _(t, T), A.x = _(r, A), A.X = _(n, A), A.c = _(t, A);
  function _(G, re) {
    return function(ie) {
      var M = [], ye = -1, X = 0, Pe = G.length, De, et, Cr;
      for (ie instanceof Date || (ie = /* @__PURE__ */ new Date(+ie)); ++ye < Pe; )
        G.charCodeAt(ye) === 37 && (M.push(G.slice(X, ye)), (et = zv[De = G.charAt(++ye)]) != null ? De = G.charAt(++ye) : et = De === "e" ? " " : "0", (Cr = re[De]) && (De = Cr(ie, et)), M.push(De), X = ye + 1);
      return M.push(G.slice(X, ye)), M.join("");
    };
  }
  function O(G, re) {
    return function(ie) {
      var M = ka(1900, void 0, 1), ye = I(M, G, ie += "", 0), X, Pe;
      if (ye != ie.length) return null;
      if ("Q" in M) return new Date(M.Q);
      if ("s" in M) return new Date(M.s * 1e3 + ("L" in M ? M.L : 0));
      if (re && !("Z" in M) && (M.Z = 0), "p" in M && (M.H = M.H % 12 + M.p * 12), M.m === void 0 && (M.m = "q" in M ? M.q : 0), "V" in M) {
        if (M.V < 1 || M.V > 53) return null;
        "w" in M || (M.w = 1), "Z" in M ? (X = Kf(ka(M.y, 0, 1)), Pe = X.getUTCDay(), X = Pe > 4 || Pe === 0 ? nu.ceil(X) : nu(X), X = rs.offset(X, (M.V - 1) * 7), M.y = X.getUTCFullYear(), M.m = X.getUTCMonth(), M.d = X.getUTCDate() + (M.w + 6) % 7) : (X = Gf(ka(M.y, 0, 1)), Pe = X.getDay(), X = Pe > 4 || Pe === 0 ? ru.ceil(X) : ru(X), X = ro.offset(X, (M.V - 1) * 7), M.y = X.getFullYear(), M.m = X.getMonth(), M.d = X.getDate() + (M.w + 6) % 7);
      } else ("W" in M || "U" in M) && ("w" in M || (M.w = "u" in M ? M.u % 7 : "W" in M ? 1 : 0), Pe = "Z" in M ? Kf(ka(M.y, 0, 1)).getUTCDay() : Gf(ka(M.y, 0, 1)).getDay(), M.m = 0, M.d = "W" in M ? (M.w + 6) % 7 + M.W * 7 - (Pe + 5) % 7 : M.w + M.U * 7 - (Pe + 6) % 7);
      return "Z" in M ? (M.H += M.Z / 100 | 0, M.M += M.Z % 100, Kf(M)) : Gf(M);
    };
  }
  function I(G, re, ie, M) {
    for (var ye = 0, X = re.length, Pe = ie.length, De, et; ye < X; ) {
      if (M >= Pe) return -1;
      if (De = re.charCodeAt(ye++), De === 37) {
        if (De = re.charAt(ye++), et = b[De in zv ? re.charAt(ye++) : De], !et || (M = et(G, ie, M)) < 0) return -1;
      } else if (De != ie.charCodeAt(M++))
        return -1;
    }
    return M;
  }
  function N(G, re, ie) {
    var M = c.exec(re.slice(ie));
    return M ? (G.p = l.get(M[0].toLowerCase()), ie + M[0].length) : -1;
  }
  function j(G, re, ie) {
    var M = p.exec(re.slice(ie));
    return M ? (G.w = g.get(M[0].toLowerCase()), ie + M[0].length) : -1;
  }
  function D(G, re, ie) {
    var M = f.exec(re.slice(ie));
    return M ? (G.w = h.get(M[0].toLowerCase()), ie + M[0].length) : -1;
  }
  function R(G, re, ie) {
    var M = E.exec(re.slice(ie));
    return M ? (G.m = v.get(M[0].toLowerCase()), ie + M[0].length) : -1;
  }
  function B(G, re, ie) {
    var M = y.exec(re.slice(ie));
    return M ? (G.m = m.get(M[0].toLowerCase()), ie + M[0].length) : -1;
  }
  function F(G, re, ie) {
    return I(G, t, re, ie);
  }
  function $(G, re, ie) {
    return I(G, r, re, ie);
  }
  function q(G, re, ie) {
    return I(G, n, re, ie);
  }
  function Y(G) {
    return o[G.getDay()];
  }
  function Q(G) {
    return i[G.getDay()];
  }
  function te(G) {
    return s[G.getMonth()];
  }
  function k(G) {
    return u[G.getMonth()];
  }
  function W(G) {
    return a[+(G.getHours() >= 12)];
  }
  function z(G) {
    return 1 + ~~(G.getMonth() / 3);
  }
  function Z(G) {
    return o[G.getUTCDay()];
  }
  function ne(G) {
    return i[G.getUTCDay()];
  }
  function oe(G) {
    return s[G.getUTCMonth()];
  }
  function ue(G) {
    return u[G.getUTCMonth()];
  }
  function fe(G) {
    return a[+(G.getUTCHours() >= 12)];
  }
  function ce(G) {
    return 1 + ~~(G.getUTCMonth() / 3);
  }
  return {
    format: function(G) {
      var re = _(G += "", T);
      return re.toString = function() {
        return G;
      }, re;
    },
    parse: function(G) {
      var re = O(G += "", !1);
      return re.toString = function() {
        return G;
      }, re;
    },
    utcFormat: function(G) {
      var re = _(G += "", A);
      return re.toString = function() {
        return G;
      }, re;
    },
    utcParse: function(G) {
      var re = O(G += "", !0);
      return re.toString = function() {
        return G;
      }, re;
    }
  };
}
var zv = { "-": "", _: " ", 0: "0" }, Je = /^\s*\d+/, BL = /^%/, jL = /[\\^$*+?|[\]().{}]/g;
function ge(e, t, r) {
  var n = e < 0 ? "-" : "", a = (n ? -e : e) + "", i = a.length;
  return n + (i < r ? new Array(r - i + 1).join(t) + a : a);
}
function FL(e) {
  return e.replace(jL, "\\$&");
}
function Ba(e) {
  return new RegExp("^(?:" + e.map(FL).join("|") + ")", "i");
}
function ja(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function $L(e, t, r) {
  var n = Je.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function UL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function HL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function qL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function WL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function Gv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function Kv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function YL(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function zL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function GL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function Vv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function KL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function Xv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function VL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function XL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function QL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function ZL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function JL(e, t, r) {
  var n = BL.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function ek(e, t, r) {
  var n = Je.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function tk(e, t, r) {
  var n = Je.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function Qv(e, t) {
  return ge(e.getDate(), t, 2);
}
function rk(e, t) {
  return ge(e.getHours(), t, 2);
}
function nk(e, t) {
  return ge(e.getHours() % 12 || 12, t, 2);
}
function ak(e, t) {
  return ge(1 + ro.count(Ar(e), e), t, 3);
}
function aO(e, t) {
  return ge(e.getMilliseconds(), t, 3);
}
function ik(e, t) {
  return aO(e, t) + "000";
}
function ok(e, t) {
  return ge(e.getMonth() + 1, t, 2);
}
function uk(e, t) {
  return ge(e.getMinutes(), t, 2);
}
function sk(e, t) {
  return ge(e.getSeconds(), t, 2);
}
function ck(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function lk(e, t) {
  return ge(ns.count(Ar(e) - 1, e), t, 2);
}
function iO(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? na(e) : na.ceil(e);
}
function fk(e, t) {
  return e = iO(e), ge(na.count(Ar(e), e) + (Ar(e).getDay() === 4), t, 2);
}
function dk(e) {
  return e.getDay();
}
function hk(e, t) {
  return ge(ru.count(Ar(e) - 1, e), t, 2);
}
function pk(e, t) {
  return ge(e.getFullYear() % 100, t, 2);
}
function mk(e, t) {
  return e = iO(e), ge(e.getFullYear() % 100, t, 2);
}
function yk(e, t) {
  return ge(e.getFullYear() % 1e4, t, 4);
}
function bk(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? na(e) : na.ceil(e), ge(e.getFullYear() % 1e4, t, 4);
}
function gk(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + ge(t / 60 | 0, "0", 2) + ge(t % 60, "0", 2);
}
function Zv(e, t) {
  return ge(e.getUTCDate(), t, 2);
}
function vk(e, t) {
  return ge(e.getUTCHours(), t, 2);
}
function Ek(e, t) {
  return ge(e.getUTCHours() % 12 || 12, t, 2);
}
function Tk(e, t) {
  return ge(1 + rs.count(Or(e), e), t, 3);
}
function oO(e, t) {
  return ge(e.getUTCMilliseconds(), t, 3);
}
function _k(e, t) {
  return oO(e, t) + "000";
}
function Ak(e, t) {
  return ge(e.getUTCMonth() + 1, t, 2);
}
function Ok(e, t) {
  return ge(e.getUTCMinutes(), t, 2);
}
function Sk(e, t) {
  return ge(e.getUTCSeconds(), t, 2);
}
function xk(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function wk(e, t) {
  return ge(as.count(Or(e) - 1, e), t, 2);
}
function uO(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? aa(e) : aa.ceil(e);
}
function Pk(e, t) {
  return e = uO(e), ge(aa.count(Or(e), e) + (Or(e).getUTCDay() === 4), t, 2);
}
function Ik(e) {
  return e.getUTCDay();
}
function Ck(e, t) {
  return ge(nu.count(Or(e) - 1, e), t, 2);
}
function Nk(e, t) {
  return ge(e.getUTCFullYear() % 100, t, 2);
}
function Rk(e, t) {
  return e = uO(e), ge(e.getUTCFullYear() % 100, t, 2);
}
function Dk(e, t) {
  return ge(e.getUTCFullYear() % 1e4, t, 4);
}
function Mk(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? aa(e) : aa.ceil(e), ge(e.getUTCFullYear() % 1e4, t, 4);
}
function Lk() {
  return "+0000";
}
function Jv() {
  return "%";
}
function e1(e) {
  return +e;
}
function t1(e) {
  return Math.floor(+e / 1e3);
}
var Rn, sO, cO;
kk({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function kk(e) {
  return Rn = kL(e), sO = Rn.format, Rn.parse, cO = Rn.utcFormat, Rn.utcParse, Rn;
}
function Bk(e) {
  return new Date(e);
}
function jk(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function A0(e, t, r, n, a, i, o, u, s, c) {
  var l = c0(), f = l.invert, h = l.domain, p = c(".%L"), g = c(":%S"), y = c("%I:%M"), m = c("%I %p"), E = c("%a %d"), v = c("%b %d"), T = c("%B"), A = c("%Y");
  function b(_) {
    return (s(_) < _ ? p : u(_) < _ ? g : o(_) < _ ? y : i(_) < _ ? m : n(_) < _ ? a(_) < _ ? E : v : r(_) < _ ? T : A)(_);
  }
  return l.invert = function(_) {
    return new Date(f(_));
  }, l.domain = function(_) {
    return arguments.length ? h(Array.from(_, jk)) : h().map(Bk);
  }, l.ticks = function(_) {
    var O = h();
    return e(O[0], O[O.length - 1], _ ?? 10);
  }, l.tickFormat = function(_, O) {
    return O == null ? b : c(O);
  }, l.nice = function(_) {
    var O = h();
    return (!_ || typeof _.range != "function") && (_ = t(O[0], O[O.length - 1], _ ?? 10)), _ ? h(VA(O, _)) : l;
  }, l.copy = function() {
    return to(l, A0(e, t, r, n, a, i, o, u, s, c));
  }, l;
}
function Fk() {
  return Ut.apply(A0(ML, LL, Ar, T0, ns, ro, v0, b0, sn, sO).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function $k() {
  return Ut.apply(A0(RL, DL, Or, _0, as, rs, E0, g0, sn, cO).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function is() {
  var e = 0, t = 1, r, n, a, i, o = pt, u = !1, s;
  function c(f) {
    return f == null || isNaN(f = +f) ? s : o(a === 0 ? 0.5 : (f = (i(f) - r) * a, u ? Math.max(0, Math.min(1, f)) : f));
  }
  c.domain = function(f) {
    return arguments.length ? ([e, t] = f, r = i(e = +e), n = i(t = +t), a = r === n ? 0 : 1 / (n - r), c) : [e, t];
  }, c.clamp = function(f) {
    return arguments.length ? (u = !!f, c) : u;
  }, c.interpolator = function(f) {
    return arguments.length ? (o = f, c) : o;
  };
  function l(f) {
    return function(h) {
      var p, g;
      return arguments.length ? ([p, g] = h, o = f(p, g), c) : [o(0), o(1)];
    };
  }
  return c.range = l(wa), c.rangeRound = l(s0), c.unknown = function(f) {
    return arguments.length ? (s = f, c) : s;
  }, function(f) {
    return i = f, r = f(e), n = f(t), a = r === n ? 0 : 1 / (n - r), c;
  };
}
function Vr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function lO() {
  var e = Kr(is()(pt));
  return e.copy = function() {
    return Vr(e, lO());
  }, Pr.apply(e, arguments);
}
function fO() {
  var e = d0(is()).domain([1, 10]);
  return e.copy = function() {
    return Vr(e, fO()).base(e.base());
  }, Pr.apply(e, arguments);
}
function dO() {
  var e = h0(is());
  return e.copy = function() {
    return Vr(e, dO()).constant(e.constant());
  }, Pr.apply(e, arguments);
}
function O0() {
  var e = p0(is());
  return e.copy = function() {
    return Vr(e, O0()).exponent(e.exponent());
  }, Pr.apply(e, arguments);
}
function Uk() {
  return O0.apply(null, arguments).exponent(0.5);
}
function hO() {
  var e = [], t = pt;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Ji(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let a of n) a != null && !isNaN(a = +a) && e.push(a);
    return e.sort(qr), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, a) => t(a / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (a, i) => wM(e, i / n));
  }, r.copy = function() {
    return hO(t).domain(e);
  }, Pr.apply(r, arguments);
}
function os() {
  var e = 0, t = 0.5, r = 1, n = 1, a, i, o, u, s, c = pt, l, f = !1, h;
  function p(y) {
    return isNaN(y = +y) ? h : (y = 0.5 + ((y = +l(y)) - i) * (n * y < n * i ? u : s), c(f ? Math.max(0, Math.min(1, y)) : y));
  }
  p.domain = function(y) {
    return arguments.length ? ([e, t, r] = y, a = l(e = +e), i = l(t = +t), o = l(r = +r), u = a === i ? 0 : 0.5 / (i - a), s = i === o ? 0 : 0.5 / (o - i), n = i < a ? -1 : 1, p) : [e, t, r];
  }, p.clamp = function(y) {
    return arguments.length ? (f = !!y, p) : f;
  }, p.interpolator = function(y) {
    return arguments.length ? (c = y, p) : c;
  };
  function g(y) {
    return function(m) {
      var E, v, T;
      return arguments.length ? ([E, v, T] = m, c = JM(y, [E, v, T]), p) : [c(0), c(0.5), c(1)];
    };
  }
  return p.range = g(wa), p.rangeRound = g(s0), p.unknown = function(y) {
    return arguments.length ? (h = y, p) : h;
  }, function(y) {
    return l = y, a = y(e), i = y(t), o = y(r), u = a === i ? 0 : 0.5 / (i - a), s = i === o ? 0 : 0.5 / (o - i), n = i < a ? -1 : 1, p;
  };
}
function pO() {
  var e = Kr(os()(pt));
  return e.copy = function() {
    return Vr(e, pO());
  }, Pr.apply(e, arguments);
}
function mO() {
  var e = d0(os()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return Vr(e, mO()).base(e.base());
  }, Pr.apply(e, arguments);
}
function yO() {
  var e = h0(os());
  return e.copy = function() {
    return Vr(e, yO()).constant(e.constant());
  }, Pr.apply(e, arguments);
}
function S0() {
  var e = p0(os());
  return e.copy = function() {
    return Vr(e, S0()).exponent(e.exponent());
  }, Pr.apply(e, arguments);
}
function Hk() {
  return S0.apply(null, arguments).exponent(0.5);
}
const r1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: gi,
  scaleDiverging: pO,
  scaleDivergingLog: mO,
  scaleDivergingPow: S0,
  scaleDivergingSqrt: Hk,
  scaleDivergingSymlog: yO,
  scaleIdentity: KA,
  scaleImplicit: _h,
  scaleLinear: eu,
  scaleLog: XA,
  scaleOrdinal: i0,
  scalePoint: ti,
  scalePow: m0,
  scaleQuantile: JA,
  scaleQuantize: eO,
  scaleRadial: ZA,
  scaleSequential: lO,
  scaleSequentialLog: fO,
  scaleSequentialPow: O0,
  scaleSequentialQuantile: hO,
  scaleSequentialSqrt: Uk,
  scaleSequentialSymlog: dO,
  scaleSqrt: _L,
  scaleSymlog: QA,
  scaleThreshold: tO,
  scaleTime: Fk,
  scaleUtc: $k,
  tickFormat: GA
}, Symbol.toStringTag, { value: "Module" }));
var Vf, n1;
function us() {
  if (n1) return Vf;
  n1 = 1;
  var e = Aa();
  function t(r, n, a) {
    for (var i = -1, o = r.length; ++i < o; ) {
      var u = r[i], s = n(u);
      if (s != null && (c === void 0 ? s === s && !e(s) : a(s, c)))
        var c = s, l = u;
    }
    return l;
  }
  return Vf = t, Vf;
}
var Xf, a1;
function bO() {
  if (a1) return Xf;
  a1 = 1;
  function e(t, r) {
    return t > r;
  }
  return Xf = e, Xf;
}
var Qf, i1;
function qk() {
  if (i1) return Qf;
  i1 = 1;
  var e = us(), t = bO(), r = Sa();
  function n(a) {
    return a && a.length ? e(a, r, t) : void 0;
  }
  return Qf = n, Qf;
}
var Wk = qk();
const ss = /* @__PURE__ */ xe(Wk);
var Zf, o1;
function gO() {
  if (o1) return Zf;
  o1 = 1;
  function e(t, r) {
    return t < r;
  }
  return Zf = e, Zf;
}
var Jf, u1;
function Yk() {
  if (u1) return Jf;
  u1 = 1;
  var e = us(), t = gO(), r = Sa();
  function n(a) {
    return a && a.length ? e(a, r, t) : void 0;
  }
  return Jf = n, Jf;
}
var zk = Yk();
const cs = /* @__PURE__ */ xe(zk);
var ed, s1;
function Gk() {
  if (s1) return ed;
  s1 = 1;
  var e = Up(), t = ur(), r = wA(), n = Tt();
  function a(i, o) {
    var u = n(i) ? e : r;
    return u(i, t(o, 3));
  }
  return ed = a, ed;
}
var td, c1;
function Kk() {
  if (c1) return td;
  c1 = 1;
  var e = SA(), t = Gk();
  function r(n, a) {
    return e(t(n, a), 1);
  }
  return td = r, td;
}
var Vk = Kk();
const Xk = /* @__PURE__ */ xe(Vk);
var rd, l1;
function Qk() {
  if (l1) return rd;
  l1 = 1;
  var e = e0();
  function t(r, n) {
    return e(r, n);
  }
  return rd = t, rd;
}
var Zk = Qk();
const ls = /* @__PURE__ */ xe(Zk);
var Pa = 1e9, Jk = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, w0, Le = !0, Ft = "[DecimalError] ", hn = Ft + "Invalid argument: ", x0 = Ft + "Exponent out of range: ", Ia = Math.floor, nn = Math.pow, e4 = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Ot, Xe = 1e7, Re = 7, vO = 9007199254740991, au = Ia(vO / Re), ae = {};
ae.absoluteValue = ae.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
ae.comparedTo = ae.cmp = function(e) {
  var t, r, n, a, i = this;
  if (e = new i.constructor(e), i.s !== e.s) return i.s || -e.s;
  if (i.e !== e.e) return i.e > e.e ^ i.s < 0 ? 1 : -1;
  for (n = i.d.length, a = e.d.length, t = 0, r = n < a ? n : a; t < r; ++t)
    if (i.d[t] !== e.d[t]) return i.d[t] > e.d[t] ^ i.s < 0 ? 1 : -1;
  return n === a ? 0 : n > a ^ i.s < 0 ? 1 : -1;
};
ae.decimalPlaces = ae.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * Re;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
ae.dividedBy = ae.div = function(e) {
  return Er(this, new this.constructor(e));
};
ae.dividedToIntegerBy = ae.idiv = function(e) {
  var t = this, r = t.constructor;
  return we(Er(t, new r(e), 0, 1), r.precision);
};
ae.equals = ae.eq = function(e) {
  return !this.cmp(e);
};
ae.exponent = function() {
  return He(this);
};
ae.greaterThan = ae.gt = function(e) {
  return this.cmp(e) > 0;
};
ae.greaterThanOrEqualTo = ae.gte = function(e) {
  return this.cmp(e) >= 0;
};
ae.isInteger = ae.isint = function() {
  return this.e > this.d.length - 2;
};
ae.isNegative = ae.isneg = function() {
  return this.s < 0;
};
ae.isPositive = ae.ispos = function() {
  return this.s > 0;
};
ae.isZero = function() {
  return this.s === 0;
};
ae.lessThan = ae.lt = function(e) {
  return this.cmp(e) < 0;
};
ae.lessThanOrEqualTo = ae.lte = function(e) {
  return this.cmp(e) < 1;
};
ae.logarithm = ae.log = function(e) {
  var t, r = this, n = r.constructor, a = n.precision, i = a + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(Ot)) throw Error(Ft + "NaN");
  if (r.s < 1) throw Error(Ft + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Ot) ? new n(0) : (Le = !1, t = Er(Ai(r, i), Ai(e, i), i), Le = !0, we(t, a));
};
ae.minus = ae.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? _O(t, e) : EO(t, (e.s = -e.s, e));
};
ae.modulo = ae.mod = function(e) {
  var t, r = this, n = r.constructor, a = n.precision;
  if (e = new n(e), !e.s) throw Error(Ft + "NaN");
  return r.s ? (Le = !1, t = Er(r, e, 0, 1).times(e), Le = !0, r.minus(t)) : we(new n(r), a);
};
ae.naturalExponential = ae.exp = function() {
  return TO(this);
};
ae.naturalLogarithm = ae.ln = function() {
  return Ai(this);
};
ae.negated = ae.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
ae.plus = ae.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? EO(t, e) : _O(t, (e.s = -e.s, e));
};
ae.precision = ae.sd = function(e) {
  var t, r, n, a = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(hn + e);
  if (t = He(a) + 1, n = a.d.length - 1, r = n * Re + 1, n = a.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = a.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
ae.squareRoot = ae.sqrt = function() {
  var e, t, r, n, a, i, o, u = this, s = u.constructor;
  if (u.s < 1) {
    if (!u.s) return new s(0);
    throw Error(Ft + "NaN");
  }
  for (e = He(u), Le = !1, a = Math.sqrt(+u), a == 0 || a == 1 / 0 ? (t = tr(u.d), (t.length + e) % 2 == 0 && (t += "0"), a = Math.sqrt(t), e = Ia((e + 1) / 2) - (e < 0 || e % 2), a == 1 / 0 ? t = "5e" + e : (t = a.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new s(t)) : n = new s(a.toString()), r = s.precision, a = o = r + 3; ; )
    if (i = n, n = i.plus(Er(u, i, o + 2)).times(0.5), tr(i.d).slice(0, o) === (t = tr(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), a == o && t == "4999") {
        if (we(i, r + 1, 0), i.times(i).eq(u)) {
          n = i;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return Le = !0, we(n, r);
};
ae.times = ae.mul = function(e) {
  var t, r, n, a, i, o, u, s, c, l = this, f = l.constructor, h = l.d, p = (e = new f(e)).d;
  if (!l.s || !e.s) return new f(0);
  for (e.s *= l.s, r = l.e + e.e, s = h.length, c = p.length, s < c && (i = h, h = p, p = i, o = s, s = c, c = o), i = [], o = s + c, n = o; n--; ) i.push(0);
  for (n = c; --n >= 0; ) {
    for (t = 0, a = s + n; a > n; )
      u = i[a] + p[n] * h[a - n - 1] + t, i[a--] = u % Xe | 0, t = u / Xe | 0;
    i[a] = (i[a] + t) % Xe | 0;
  }
  for (; !i[--o]; ) i.pop();
  return t ? ++r : i.shift(), e.d = i, e.e = r, Le ? we(e, f.precision) : e;
};
ae.toDecimalPlaces = ae.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (ar(e, 0, Pa), t === void 0 ? t = n.rounding : ar(t, 0, 8), we(r, e + He(r) + 1, t));
};
ae.toExponential = function(e, t) {
  var r, n = this, a = n.constructor;
  return e === void 0 ? r = vn(n, !0) : (ar(e, 0, Pa), t === void 0 ? t = a.rounding : ar(t, 0, 8), n = we(new a(n), e + 1, t), r = vn(n, !0, e + 1)), r;
};
ae.toFixed = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? vn(a) : (ar(e, 0, Pa), t === void 0 ? t = i.rounding : ar(t, 0, 8), n = we(new i(a), e + He(a) + 1, t), r = vn(n.abs(), !1, e + He(n) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
};
ae.toInteger = ae.toint = function() {
  var e = this, t = e.constructor;
  return we(new t(e), He(e) + 1, t.rounding);
};
ae.toNumber = function() {
  return +this;
};
ae.toPower = ae.pow = function(e) {
  var t, r, n, a, i, o, u = this, s = u.constructor, c = 12, l = +(e = new s(e));
  if (!e.s) return new s(Ot);
  if (u = new s(u), !u.s) {
    if (e.s < 1) throw Error(Ft + "Infinity");
    return u;
  }
  if (u.eq(Ot)) return u;
  if (n = s.precision, e.eq(Ot)) return we(u, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, i = u.s, o) {
    if ((r = l < 0 ? -l : l) <= vO) {
      for (a = new s(Ot), t = Math.ceil(n / Re + 4), Le = !1; r % 2 && (a = a.times(u), d1(a.d, t)), r = Ia(r / 2), r !== 0; )
        u = u.times(u), d1(u.d, t);
      return Le = !0, e.s < 0 ? new s(Ot).div(a) : we(a, n);
    }
  } else if (i < 0) throw Error(Ft + "NaN");
  return i = i < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, u.s = 1, Le = !1, a = e.times(Ai(u, n + c)), Le = !0, a = TO(a), a.s = i, a;
};
ae.toPrecision = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? (r = He(a), n = vn(a, r <= i.toExpNeg || r >= i.toExpPos)) : (ar(e, 1, Pa), t === void 0 ? t = i.rounding : ar(t, 0, 8), a = we(new i(a), e, t), r = He(a), n = vn(a, e <= r || r <= i.toExpNeg, e)), n;
};
ae.toSignificantDigits = ae.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (ar(e, 1, Pa), t === void 0 ? t = n.rounding : ar(t, 0, 8)), we(new n(r), e, t);
};
ae.toString = ae.valueOf = ae.val = ae.toJSON = ae[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = He(e), r = e.constructor;
  return vn(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function EO(e, t) {
  var r, n, a, i, o, u, s, c, l = e.constructor, f = l.precision;
  if (!e.s || !t.s)
    return t.s || (t = new l(e)), Le ? we(t, f) : t;
  if (s = e.d, c = t.d, o = e.e, a = t.e, s = s.slice(), i = o - a, i) {
    for (i < 0 ? (n = s, i = -i, u = c.length) : (n = c, a = o, u = s.length), o = Math.ceil(f / Re), u = o > u ? o + 1 : u + 1, i > u && (i = u, n.length = 1), n.reverse(); i--; ) n.push(0);
    n.reverse();
  }
  for (u = s.length, i = c.length, u - i < 0 && (i = u, n = c, c = s, s = n), r = 0; i; )
    r = (s[--i] = s[i] + c[i] + r) / Xe | 0, s[i] %= Xe;
  for (r && (s.unshift(r), ++a), u = s.length; s[--u] == 0; ) s.pop();
  return t.d = s, t.e = a, Le ? we(t, f) : t;
}
function ar(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(hn + e);
}
function tr(e) {
  var t, r, n, a = e.length - 1, i = "", o = e[0];
  if (a > 0) {
    for (i += o, t = 1; t < a; t++)
      n = e[t] + "", r = Re - n.length, r && (i += Lr(r)), i += n;
    o = e[t], n = o + "", r = Re - n.length, r && (i += Lr(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return i + o;
}
var Er = /* @__PURE__ */ (function() {
  function e(n, a) {
    var i, o = 0, u = n.length;
    for (n = n.slice(); u--; )
      i = n[u] * a + o, n[u] = i % Xe | 0, o = i / Xe | 0;
    return o && n.unshift(o), n;
  }
  function t(n, a, i, o) {
    var u, s;
    if (i != o)
      s = i > o ? 1 : -1;
    else
      for (u = s = 0; u < i; u++)
        if (n[u] != a[u]) {
          s = n[u] > a[u] ? 1 : -1;
          break;
        }
    return s;
  }
  function r(n, a, i) {
    for (var o = 0; i--; )
      n[i] -= o, o = n[i] < a[i] ? 1 : 0, n[i] = o * Xe + n[i] - a[i];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, a, i, o) {
    var u, s, c, l, f, h, p, g, y, m, E, v, T, A, b, _, O, I, N = n.constructor, j = n.s == a.s ? 1 : -1, D = n.d, R = a.d;
    if (!n.s) return new N(n);
    if (!a.s) throw Error(Ft + "Division by zero");
    for (s = n.e - a.e, O = R.length, b = D.length, p = new N(j), g = p.d = [], c = 0; R[c] == (D[c] || 0); ) ++c;
    if (R[c] > (D[c] || 0) && --s, i == null ? v = i = N.precision : o ? v = i + (He(n) - He(a)) + 1 : v = i, v < 0) return new N(0);
    if (v = v / Re + 2 | 0, c = 0, O == 1)
      for (l = 0, R = R[0], v++; (c < b || l) && v--; c++)
        T = l * Xe + (D[c] || 0), g[c] = T / R | 0, l = T % R | 0;
    else {
      for (l = Xe / (R[0] + 1) | 0, l > 1 && (R = e(R, l), D = e(D, l), O = R.length, b = D.length), A = O, y = D.slice(0, O), m = y.length; m < O; ) y[m++] = 0;
      I = R.slice(), I.unshift(0), _ = R[0], R[1] >= Xe / 2 && ++_;
      do
        l = 0, u = t(R, y, O, m), u < 0 ? (E = y[0], O != m && (E = E * Xe + (y[1] || 0)), l = E / _ | 0, l > 1 ? (l >= Xe && (l = Xe - 1), f = e(R, l), h = f.length, m = y.length, u = t(f, y, h, m), u == 1 && (l--, r(f, O < h ? I : R, h))) : (l == 0 && (u = l = 1), f = R.slice()), h = f.length, h < m && f.unshift(0), r(y, f, m), u == -1 && (m = y.length, u = t(R, y, O, m), u < 1 && (l++, r(y, O < m ? I : R, m))), m = y.length) : u === 0 && (l++, y = [0]), g[c++] = l, u && y[0] ? y[m++] = D[A] || 0 : (y = [D[A]], m = 1);
      while ((A++ < b || y[0] !== void 0) && v--);
    }
    return g[0] || g.shift(), p.e = s, we(p, o ? i + He(p) + 1 : i);
  };
})();
function TO(e, t) {
  var r, n, a, i, o, u, s = 0, c = 0, l = e.constructor, f = l.precision;
  if (He(e) > 16) throw Error(x0 + He(e));
  if (!e.s) return new l(Ot);
  for (Le = !1, u = f, o = new l(0.03125); e.abs().gte(0.1); )
    e = e.times(o), c += 5;
  for (n = Math.log(nn(2, c)) / Math.LN10 * 2 + 5 | 0, u += n, r = a = i = new l(Ot), l.precision = u; ; ) {
    if (a = we(a.times(e), u), r = r.times(++s), o = i.plus(Er(a, r, u)), tr(o.d).slice(0, u) === tr(i.d).slice(0, u)) {
      for (; c--; ) i = we(i.times(i), u);
      return l.precision = f, t == null ? (Le = !0, we(i, f)) : i;
    }
    i = o;
  }
}
function He(e) {
  for (var t = e.e * Re, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function nd(e, t, r) {
  if (t > e.LN10.sd())
    throw Le = !0, r && (e.precision = r), Error(Ft + "LN10 precision limit exceeded");
  return we(new e(e.LN10), t);
}
function Lr(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Ai(e, t) {
  var r, n, a, i, o, u, s, c, l, f = 1, h = 10, p = e, g = p.d, y = p.constructor, m = y.precision;
  if (p.s < 1) throw Error(Ft + (p.s ? "NaN" : "-Infinity"));
  if (p.eq(Ot)) return new y(0);
  if (t == null ? (Le = !1, c = m) : c = t, p.eq(10))
    return t == null && (Le = !0), nd(y, c);
  if (c += h, y.precision = c, r = tr(g), n = r.charAt(0), i = He(p), Math.abs(i) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      p = p.times(e), r = tr(p.d), n = r.charAt(0), f++;
    i = He(p), n > 1 ? (p = new y("0." + r), i++) : p = new y(n + "." + r.slice(1));
  } else
    return s = nd(y, c + 2, m).times(i + ""), p = Ai(new y(n + "." + r.slice(1)), c - h).plus(s), y.precision = m, t == null ? (Le = !0, we(p, m)) : p;
  for (u = o = p = Er(p.minus(Ot), p.plus(Ot), c), l = we(p.times(p), c), a = 3; ; ) {
    if (o = we(o.times(l), c), s = u.plus(Er(o, new y(a), c)), tr(s.d).slice(0, c) === tr(u.d).slice(0, c))
      return u = u.times(2), i !== 0 && (u = u.plus(nd(y, c + 2, m).times(i + ""))), u = Er(u, new y(f), c), y.precision = m, t == null ? (Le = !0, we(u, m)) : u;
    u = s, a += 2;
  }
}
function f1(e, t) {
  var r, n, a;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (a = t.length; t.charCodeAt(a - 1) === 48; ) --a;
  if (t = t.slice(n, a), t) {
    if (a -= n, r = r - n - 1, e.e = Ia(r / Re), e.d = [], n = (r + 1) % Re, r < 0 && (n += Re), n < a) {
      for (n && e.d.push(+t.slice(0, n)), a -= Re; n < a; ) e.d.push(+t.slice(n, n += Re));
      t = t.slice(n), n = Re - t.length;
    } else
      n -= a;
    for (; n--; ) t += "0";
    if (e.d.push(+t), Le && (e.e > au || e.e < -au)) throw Error(x0 + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function we(e, t, r) {
  var n, a, i, o, u, s, c, l, f = e.d;
  for (o = 1, i = f[0]; i >= 10; i /= 10) o++;
  if (n = t - o, n < 0)
    n += Re, a = t, c = f[l = 0];
  else {
    if (l = Math.ceil((n + 1) / Re), i = f.length, l >= i) return e;
    for (c = i = f[l], o = 1; i >= 10; i /= 10) o++;
    n %= Re, a = n - Re + o;
  }
  if (r !== void 0 && (i = nn(10, o - a - 1), u = c / i % 10 | 0, s = t < 0 || f[l + 1] !== void 0 || c % i, s = r < 4 ? (u || s) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : u > 5 || u == 5 && (r == 4 || s || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? a > 0 ? c / nn(10, o - a) : 0 : f[l - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !f[0])
    return s ? (i = He(e), f.length = 1, t = t - i - 1, f[0] = nn(10, (Re - t % Re) % Re), e.e = Ia(-t / Re) || 0) : (f.length = 1, f[0] = e.e = e.s = 0), e;
  if (n == 0 ? (f.length = l, i = 1, l--) : (f.length = l + 1, i = nn(10, Re - n), f[l] = a > 0 ? (c / nn(10, o - a) % nn(10, a) | 0) * i : 0), s)
    for (; ; )
      if (l == 0) {
        (f[0] += i) == Xe && (f[0] = 1, ++e.e);
        break;
      } else {
        if (f[l] += i, f[l] != Xe) break;
        f[l--] = 0, i = 1;
      }
  for (n = f.length; f[--n] === 0; ) f.pop();
  if (Le && (e.e > au || e.e < -au))
    throw Error(x0 + He(e));
  return e;
}
function _O(e, t) {
  var r, n, a, i, o, u, s, c, l, f, h = e.constructor, p = h.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new h(e), Le ? we(t, p) : t;
  if (s = e.d, f = t.d, n = t.e, c = e.e, s = s.slice(), o = c - n, o) {
    for (l = o < 0, l ? (r = s, o = -o, u = f.length) : (r = f, n = c, u = s.length), a = Math.max(Math.ceil(p / Re), u) + 2, o > a && (o = a, r.length = 1), r.reverse(), a = o; a--; ) r.push(0);
    r.reverse();
  } else {
    for (a = s.length, u = f.length, l = a < u, l && (u = a), a = 0; a < u; a++)
      if (s[a] != f[a]) {
        l = s[a] < f[a];
        break;
      }
    o = 0;
  }
  for (l && (r = s, s = f, f = r, t.s = -t.s), u = s.length, a = f.length - u; a > 0; --a) s[u++] = 0;
  for (a = f.length; a > o; ) {
    if (s[--a] < f[a]) {
      for (i = a; i && s[--i] === 0; ) s[i] = Xe - 1;
      --s[i], s[a] += Xe;
    }
    s[a] -= f[a];
  }
  for (; s[--u] === 0; ) s.pop();
  for (; s[0] === 0; s.shift()) --n;
  return s[0] ? (t.d = s, t.e = n, Le ? we(t, p) : t) : new h(0);
}
function vn(e, t, r) {
  var n, a = He(e), i = tr(e.d), o = i.length;
  return t ? (r && (n = r - o) > 0 ? i = i.charAt(0) + "." + i.slice(1) + Lr(n) : o > 1 && (i = i.charAt(0) + "." + i.slice(1)), i = i + (a < 0 ? "e" : "e+") + a) : a < 0 ? (i = "0." + Lr(-a - 1) + i, r && (n = r - o) > 0 && (i += Lr(n))) : a >= o ? (i += Lr(a + 1 - o), r && (n = r - a - 1) > 0 && (i = i + "." + Lr(n))) : ((n = a + 1) < o && (i = i.slice(0, n) + "." + i.slice(n)), r && (n = r - o) > 0 && (a + 1 === o && (i += "."), i += Lr(n))), e.s < 0 ? "-" + i : i;
}
function d1(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function AO(e) {
  var t, r, n;
  function a(i) {
    var o = this;
    if (!(o instanceof a)) return new a(i);
    if (o.constructor = a, i instanceof a) {
      o.s = i.s, o.e = i.e, o.d = (i = i.d) ? i.slice() : i;
      return;
    }
    if (typeof i == "number") {
      if (i * 0 !== 0)
        throw Error(hn + i);
      if (i > 0)
        o.s = 1;
      else if (i < 0)
        i = -i, o.s = -1;
      else {
        o.s = 0, o.e = 0, o.d = [0];
        return;
      }
      if (i === ~~i && i < 1e7) {
        o.e = 0, o.d = [i];
        return;
      }
      return f1(o, i.toString());
    } else if (typeof i != "string")
      throw Error(hn + i);
    if (i.charCodeAt(0) === 45 ? (i = i.slice(1), o.s = -1) : o.s = 1, e4.test(i)) f1(o, i);
    else throw Error(hn + i);
  }
  if (a.prototype = ae, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.clone = AO, a.config = a.set = t4, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return a.config(e), a;
}
function t4(e) {
  if (!e || typeof e != "object")
    throw Error(Ft + "Object expected");
  var t, r, n, a = [
    "precision",
    1,
    Pa,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (t = 0; t < a.length; t += 3)
    if ((n = e[r = a[t]]) !== void 0)
      if (Ia(n) === n && n >= a[t + 1] && n <= a[t + 2]) this[r] = n;
      else throw Error(hn + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(hn + r + ": " + n);
  return this;
}
var w0 = AO(Jk);
Ot = new w0(1);
const Se = w0;
function r4(e) {
  return o4(e) || i4(e) || a4(e) || n4();
}
function n4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function a4(e, t) {
  if (e) {
    if (typeof e == "string") return xh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return xh(e, t);
  }
}
function i4(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function o4(e) {
  if (Array.isArray(e)) return xh(e);
}
function xh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var u4 = function(t) {
  return t;
}, OO = {}, SO = function(t) {
  return t === OO;
}, h1 = function(t) {
  return function r() {
    return arguments.length === 0 || arguments.length === 1 && SO(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments);
  };
}, s4 = function e(t, r) {
  return t === 1 ? r : h1(function() {
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a.filter(function(u) {
      return u !== OO;
    }).length;
    return o >= t ? r.apply(void 0, a) : e(t - o, h1(function() {
      for (var u = arguments.length, s = new Array(u), c = 0; c < u; c++)
        s[c] = arguments[c];
      var l = a.map(function(f) {
        return SO(f) ? s.shift() : f;
      });
      return r.apply(void 0, r4(l).concat(s));
    }));
  });
}, fs = function(t) {
  return s4(t.length, t);
}, wh = function(t, r) {
  for (var n = [], a = t; a < r; ++a)
    n[a - t] = a;
  return n;
}, c4 = fs(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
    return t[r];
  }).map(e);
}), l4 = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (!r.length)
    return u4;
  var a = r.reverse(), i = a[0], o = a.slice(1);
  return function() {
    return o.reduce(function(u, s) {
      return s(u);
    }, i.apply(void 0, arguments));
  };
}, Ph = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, xO = function(t) {
  var r = null, n = null;
  return function() {
    for (var a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return r && i.every(function(u, s) {
      return u === r[s];
    }) || (r = i, n = t.apply(void 0, i)), n;
  };
};
function f4(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new Se(e).abs().log(10).toNumber()) + 1, t;
}
function d4(e, t, r) {
  for (var n = new Se(e), a = 0, i = []; n.lt(t) && a < 1e5; )
    i.push(n.toNumber()), n = n.add(r), a++;
  return i;
}
var h4 = fs(function(e, t, r) {
  var n = +e, a = +t;
  return n + r * (a - n);
}), p4 = fs(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, (r - e) / n;
}), m4 = fs(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n));
});
const ds = {
  rangeStep: d4,
  getDigitCount: f4,
  interpolateNumber: h4,
  uninterpolateNumber: p4,
  uninterpolateTruncation: m4
};
function Ih(e) {
  return g4(e) || b4(e) || wO(e) || y4();
}
function y4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function b4(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function g4(e) {
  if (Array.isArray(e)) return Ch(e);
}
function Oi(e, t) {
  return T4(e) || E4(e, t) || wO(e, t) || v4();
}
function v4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function wO(e, t) {
  if (e) {
    if (typeof e == "string") return Ch(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ch(e, t);
  }
}
function Ch(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function E4(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [], n = !0, a = !1, i = void 0;
    try {
      for (var o = e[Symbol.iterator](), u; !(n = (u = o.next()).done) && (r.push(u.value), !(t && r.length === t)); n = !0)
        ;
    } catch (s) {
      a = !0, i = s;
    } finally {
      try {
        !n && o.return != null && o.return();
      } finally {
        if (a) throw i;
      }
    }
    return r;
  }
}
function T4(e) {
  if (Array.isArray(e)) return e;
}
function PO(e) {
  var t = Oi(e, 2), r = t[0], n = t[1], a = r, i = n;
  return r > n && (a = n, i = r), [a, i];
}
function IO(e, t, r) {
  if (e.lte(0))
    return new Se(0);
  var n = ds.getDigitCount(e.toNumber()), a = new Se(10).pow(n), i = e.div(a), o = n !== 1 ? 0.05 : 0.1, u = new Se(Math.ceil(i.div(o).toNumber())).add(r).mul(o), s = u.mul(a);
  return t ? s : new Se(Math.ceil(s));
}
function _4(e, t, r) {
  var n = 1, a = new Se(e);
  if (!a.isint() && r) {
    var i = Math.abs(e);
    i < 1 ? (n = new Se(10).pow(ds.getDigitCount(e) - 1), a = new Se(Math.floor(a.div(n).toNumber())).mul(n)) : i > 1 && (a = new Se(Math.floor(e)));
  } else e === 0 ? a = new Se(Math.floor((t - 1) / 2)) : r || (a = new Se(Math.floor(e)));
  var o = Math.floor((t - 1) / 2), u = l4(c4(function(s) {
    return a.add(new Se(s - o).mul(n)).toNumber();
  }), wh);
  return u(0, t);
}
function CO(e, t, r, n) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1)))
    return {
      step: new Se(0),
      tickMin: new Se(0),
      tickMax: new Se(0)
    };
  var i = IO(new Se(t).sub(e).div(r - 1), n, a), o;
  e <= 0 && t >= 0 ? o = new Se(0) : (o = new Se(e).add(t).div(2), o = o.sub(new Se(o).mod(i)));
  var u = Math.ceil(o.sub(e).div(i).toNumber()), s = Math.ceil(new Se(t).sub(o).div(i).toNumber()), c = u + s + 1;
  return c > r ? CO(e, t, r, n, a + 1) : (c < r && (s = t > 0 ? s + (r - c) : s, u = t > 0 ? u : u + (r - c)), {
    step: i,
    tickMin: o.sub(new Se(u).mul(i)),
    tickMax: o.add(new Se(s).mul(i))
  });
}
function A4(e) {
  var t = Oi(e, 2), r = t[0], n = t[1], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = Math.max(a, 2), u = PO([r, n]), s = Oi(u, 2), c = s[0], l = s[1];
  if (c === -1 / 0 || l === 1 / 0) {
    var f = l === 1 / 0 ? [c].concat(Ih(wh(0, a - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(Ih(wh(0, a - 1).map(function() {
      return -1 / 0;
    })), [l]);
    return r > n ? Ph(f) : f;
  }
  if (c === l)
    return _4(c, a, i);
  var h = CO(c, l, o, i), p = h.step, g = h.tickMin, y = h.tickMax, m = ds.rangeStep(g, y.add(new Se(0.1).mul(p)), p);
  return r > n ? Ph(m) : m;
}
function O4(e, t) {
  var r = Oi(e, 2), n = r[0], a = r[1], i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = PO([n, a]), u = Oi(o, 2), s = u[0], c = u[1];
  if (s === -1 / 0 || c === 1 / 0)
    return [n, a];
  if (s === c)
    return [s];
  var l = Math.max(t, 2), f = IO(new Se(c).sub(s).div(l - 1), i, 0), h = [].concat(Ih(ds.rangeStep(new Se(s), new Se(c).sub(new Se(0.99).mul(f)), f)), [c]);
  return n > a ? Ph(h) : h;
}
var S4 = xO(A4), x4 = xO(O4), w4 = process.env.NODE_ENV === "production", ad = "Invariant failed";
function vt(e, t) {
  if (w4)
    throw new Error(ad);
  var r = typeof t == "function" ? t() : t, n = r ? "".concat(ad, ": ").concat(r) : ad;
  throw new Error(n);
}
var P4 = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function ia(e) {
  "@babel/helpers - typeof";
  return ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ia(e);
}
function iu() {
  return iu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, iu.apply(this, arguments);
}
function I4(e, t) {
  return D4(e) || R4(e, t) || N4(e, t) || C4();
}
function C4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function N4(e, t) {
  if (e) {
    if (typeof e == "string") return p1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return p1(e, t);
  }
}
function p1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function R4(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function D4(e) {
  if (Array.isArray(e)) return e;
}
function M4(e, t) {
  if (e == null) return {};
  var r = L4(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function L4(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function k4(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function B4(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, DO(n.key), n);
  }
}
function j4(e, t, r) {
  return t && B4(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function F4(e, t, r) {
  return t = ou(t), $4(e, NO() ? Reflect.construct(t, r || [], ou(e).constructor) : t.apply(e, r));
}
function $4(e, t) {
  if (t && (ia(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return U4(e);
}
function U4(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function NO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (NO = function() {
    return !!e;
  })();
}
function ou(e) {
  return ou = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ou(e);
}
function H4(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Nh(e, t);
}
function Nh(e, t) {
  return Nh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Nh(e, t);
}
function RO(e, t, r) {
  return t = DO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function DO(e) {
  var t = q4(e, "string");
  return ia(t) == "symbol" ? t : t + "";
}
function q4(e, t) {
  if (ia(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ia(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var hs = /* @__PURE__ */ (function(e) {
  function t() {
    return k4(this, t), F4(this, t, arguments);
  }
  return H4(t, e), j4(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.offset, i = n.layout, o = n.width, u = n.dataKey, s = n.data, c = n.dataPointFormatter, l = n.xAxis, f = n.yAxis, h = M4(n, P4), p = le(h, !1);
      this.props.direction === "x" && l.type !== "number" && (process.env.NODE_ENV !== "production" ? vt(!1, 'ErrorBar requires Axis type property to be "number".') : vt());
      var g = s.map(function(y) {
        var m = c(y, u), E = m.x, v = m.y, T = m.value, A = m.errorVal;
        if (!A)
          return null;
        var b = [], _, O;
        if (Array.isArray(A)) {
          var I = I4(A, 2);
          _ = I[0], O = I[1];
        } else
          _ = O = A;
        if (i === "vertical") {
          var N = l.scale, j = v + a, D = j + o, R = j - o, B = N(T - _), F = N(T + O);
          b.push({
            x1: F,
            y1: D,
            x2: F,
            y2: R
          }), b.push({
            x1: B,
            y1: j,
            x2: F,
            y2: j
          }), b.push({
            x1: B,
            y1: D,
            x2: B,
            y2: R
          });
        } else if (i === "horizontal") {
          var $ = f.scale, q = E + a, Y = q - o, Q = q + o, te = $(T - _), k = $(T + O);
          b.push({
            x1: Y,
            y1: k,
            x2: Q,
            y2: k
          }), b.push({
            x1: q,
            y1: te,
            x2: q,
            y2: k
          }), b.push({
            x1: Y,
            y1: te,
            x2: Q,
            y2: te
          });
        }
        return /* @__PURE__ */ C.createElement(Oe, iu({
          className: "recharts-errorBar",
          key: "bar-".concat(b.map(function(W) {
            return "".concat(W.x1, "-").concat(W.x2, "-").concat(W.y1, "-").concat(W.y2);
          }))
        }, p), b.map(function(W) {
          return /* @__PURE__ */ C.createElement("line", iu({}, W, {
            key: "line-".concat(W.x1, "-").concat(W.x2, "-").concat(W.y1, "-").concat(W.y2)
          }));
        }));
      });
      return /* @__PURE__ */ C.createElement(Oe, {
        className: "recharts-errorBars"
      }, g);
    }
  }]);
})(C.Component);
RO(hs, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
RO(hs, "displayName", "ErrorBar");
function Si(e) {
  "@babel/helpers - typeof";
  return Si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Si(e);
}
function m1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? m1(Object(r), !0).forEach(function(n) {
      W4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : m1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function W4(e, t, r) {
  return t = Y4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Y4(e) {
  var t = z4(e, "string");
  return Si(t) == "symbol" ? t : t + "";
}
function z4(e, t) {
  if (Si(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Si(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var MO = function(t) {
  var r = t.children, n = t.formattedGraphicalItems, a = t.legendWidth, i = t.legendContent, o = At(r, Hr);
  if (!o)
    return null;
  var u = Hr.defaultProps, s = u !== void 0 ? Jr(Jr({}, u), o.props) : {}, c;
  return o.props && o.props.payload ? c = o.props && o.props.payload : i === "children" ? c = (n || []).reduce(function(l, f) {
    var h = f.item, p = f.props, g = p.sectors || p.data || [];
    return l.concat(g.map(function(y) {
      return {
        type: o.props.iconType || h.props.legendType,
        value: y.name,
        color: y.fill,
        payload: y
      };
    }));
  }, []) : c = (n || []).map(function(l) {
    var f = l.item, h = f.type.defaultProps, p = h !== void 0 ? Jr(Jr({}, h), f.props) : {}, g = p.dataKey, y = p.name, m = p.legendType, E = p.hide;
    return {
      inactive: E,
      dataKey: g,
      type: s.iconType || m || "square",
      color: P0(f),
      value: y || g,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: p
    };
  }), Jr(Jr(Jr({}, s), Hr.getWithHeight(o, a)), {}, {
    payload: c,
    item: o
  });
};
function xi(e) {
  "@babel/helpers - typeof";
  return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xi(e);
}
function y1(e) {
  return X4(e) || V4(e) || K4(e) || G4();
}
function G4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function K4(e, t) {
  if (e) {
    if (typeof e == "string") return Rh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Rh(e, t);
  }
}
function V4(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function X4(e) {
  if (Array.isArray(e)) return Rh(e);
}
function Rh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function b1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Be(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? b1(Object(r), !0).forEach(function(n) {
      Gn(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : b1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Gn(e, t, r) {
  return t = Q4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Q4(e) {
  var t = Z4(e, "string");
  return xi(t) == "symbol" ? t : t + "";
}
function Z4(e, t) {
  if (xi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (xi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ut(e, t, r) {
  return me(e) || me(t) ? r : ze(t) ? xt(e, t, r) : de(t) ? t(e) : r;
}
function ri(e, t, r, n) {
  var a = Xk(e, function(u) {
    return ut(u, t);
  });
  if (r === "number") {
    var i = a.filter(function(u) {
      return J(u) || parseFloat(u);
    });
    return i.length ? [cs(i), ss(i)] : [1 / 0, -1 / 0];
  }
  var o = n ? a.filter(function(u) {
    return !me(u);
  }) : a;
  return o.map(function(u) {
    return ze(u) || u instanceof Date ? u : "";
  });
}
var J4 = function(t) {
  var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], a = arguments.length > 2 ? arguments[2] : void 0, i = arguments.length > 3 ? arguments[3] : void 0, o = -1, u = (r = n?.length) !== null && r !== void 0 ? r : 0;
  if (u <= 1)
    return 0;
  if (i && i.axisType === "angleAxis" && Math.abs(Math.abs(i.range[1] - i.range[0]) - 360) <= 1e-6)
    for (var s = i.range, c = 0; c < u; c++) {
      var l = c > 0 ? a[c - 1].coordinate : a[u - 1].coordinate, f = a[c].coordinate, h = c >= u - 1 ? a[0].coordinate : a[c + 1].coordinate, p = void 0;
      if (dt(f - l) !== dt(h - f)) {
        var g = [];
        if (dt(h - f) === dt(s[1] - s[0])) {
          p = h;
          var y = f + s[1] - s[0];
          g[0] = Math.min(y, (y + l) / 2), g[1] = Math.max(y, (y + l) / 2);
        } else {
          p = l;
          var m = h + s[1] - s[0];
          g[0] = Math.min(f, (m + f) / 2), g[1] = Math.max(f, (m + f) / 2);
        }
        var E = [Math.min(f, (p + f) / 2), Math.max(f, (p + f) / 2)];
        if (t > E[0] && t <= E[1] || t >= g[0] && t <= g[1]) {
          o = a[c].index;
          break;
        }
      } else {
        var v = Math.min(l, h), T = Math.max(l, h);
        if (t > (v + f) / 2 && t <= (T + f) / 2) {
          o = a[c].index;
          break;
        }
      }
    }
  else
    for (var A = 0; A < u; A++)
      if (A === 0 && t <= (n[A].coordinate + n[A + 1].coordinate) / 2 || A > 0 && A < u - 1 && t > (n[A].coordinate + n[A - 1].coordinate) / 2 && t <= (n[A].coordinate + n[A + 1].coordinate) / 2 || A === u - 1 && t > (n[A].coordinate + n[A - 1].coordinate) / 2) {
        o = n[A].index;
        break;
      }
  return o;
}, P0 = function(t) {
  var r, n = t, a = n.type.displayName, i = (r = t.type) !== null && r !== void 0 && r.defaultProps ? Be(Be({}, t.type.defaultProps), t.props) : t.props, o = i.stroke, u = i.fill, s;
  switch (a) {
    case "Line":
      s = o;
      break;
    case "Area":
    case "Radar":
      s = o && o !== "none" ? o : u;
      break;
    default:
      s = u;
      break;
  }
  return s;
}, e8 = function(t) {
  var r = t.barSize, n = t.totalSize, a = t.stackGroups, i = a === void 0 ? {} : a;
  if (!i)
    return {};
  for (var o = {}, u = Object.keys(i), s = 0, c = u.length; s < c; s++)
    for (var l = i[u[s]].stackGroups, f = Object.keys(l), h = 0, p = f.length; h < p; h++) {
      var g = l[f[h]], y = g.items, m = g.cateAxisId, E = y.filter(function(O) {
        return vr(O.type).indexOf("Bar") >= 0;
      });
      if (E && E.length) {
        var v = E[0].type.defaultProps, T = v !== void 0 ? Be(Be({}, v), E[0].props) : E[0].props, A = T.barSize, b = T[m];
        o[b] || (o[b] = []);
        var _ = me(A) ? r : A;
        o[b].push({
          item: E[0],
          stackList: E.slice(1),
          barSize: me(_) ? void 0 : ht(_, n, 0)
        });
      }
    }
  return o;
}, t8 = function(t) {
  var r = t.barGap, n = t.barCategoryGap, a = t.bandSize, i = t.sizeList, o = i === void 0 ? [] : i, u = t.maxBarSize, s = o.length;
  if (s < 1) return null;
  var c = ht(r, a, 0, !0), l, f = [];
  if (o[0].barSize === +o[0].barSize) {
    var h = !1, p = a / s, g = o.reduce(function(A, b) {
      return A + b.barSize || 0;
    }, 0);
    g += (s - 1) * c, g >= a && (g -= (s - 1) * c, c = 0), g >= a && p > 0 && (h = !0, p *= 0.9, g = s * p);
    var y = (a - g) / 2 >> 0, m = {
      offset: y - c,
      size: 0
    };
    l = o.reduce(function(A, b) {
      var _ = {
        item: b.item,
        position: {
          offset: m.offset + m.size + c,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: h ? p : b.barSize
        }
      }, O = [].concat(y1(A), [_]);
      return m = O[O.length - 1].position, b.stackList && b.stackList.length && b.stackList.forEach(function(I) {
        O.push({
          item: I,
          position: m
        });
      }), O;
    }, f);
  } else {
    var E = ht(n, a, 0, !0);
    a - 2 * E - (s - 1) * c <= 0 && (c = 0);
    var v = (a - 2 * E - (s - 1) * c) / s;
    v > 1 && (v >>= 0);
    var T = u === +u ? Math.min(v, u) : v;
    l = o.reduce(function(A, b, _) {
      var O = [].concat(y1(A), [{
        item: b.item,
        position: {
          offset: E + (v + c) * _ + (v - T) / 2,
          size: T
        }
      }]);
      return b.stackList && b.stackList.length && b.stackList.forEach(function(I) {
        O.push({
          item: I,
          position: O[O.length - 1].position
        });
      }), O;
    }, f);
  }
  return l;
}, r8 = function(t, r, n, a) {
  var i = n.children, o = n.width, u = n.margin, s = o - (u.left || 0) - (u.right || 0), c = MO({
    children: i,
    legendWidth: s
  });
  if (c) {
    var l = a || {}, f = l.width, h = l.height, p = c.align, g = c.verticalAlign, y = c.layout;
    if ((y === "vertical" || y === "horizontal" && g === "middle") && p !== "center" && J(t[p]))
      return Be(Be({}, t), {}, Gn({}, p, t[p] + (f || 0)));
    if ((y === "horizontal" || y === "vertical" && p === "center") && g !== "middle" && J(t[g]))
      return Be(Be({}, t), {}, Gn({}, g, t[g] + (h || 0)));
  }
  return t;
}, n8 = function(t, r, n) {
  return me(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0;
}, LO = function(t, r, n, a, i) {
  var o = r.props.children, u = jt(o, hs).filter(function(c) {
    return n8(a, i, c.props.direction);
  });
  if (u && u.length) {
    var s = u.map(function(c) {
      return c.props.dataKey;
    });
    return t.reduce(function(c, l) {
      var f = ut(l, n);
      if (me(f)) return c;
      var h = Array.isArray(f) ? [cs(f), ss(f)] : [f, f], p = s.reduce(function(g, y) {
        var m = ut(l, y, 0), E = h[0] - Math.abs(Array.isArray(m) ? m[0] : m), v = h[1] + Math.abs(Array.isArray(m) ? m[1] : m);
        return [Math.min(E, g[0]), Math.max(v, g[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(p[0], c[0]), Math.max(p[1], c[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, a8 = function(t, r, n, a, i) {
  var o = r.map(function(u) {
    return LO(t, u, n, i, a);
  }).filter(function(u) {
    return !me(u);
  });
  return o && o.length ? o.reduce(function(u, s) {
    return [Math.min(u[0], s[0]), Math.max(u[1], s[1])];
  }, [1 / 0, -1 / 0]) : null;
}, kO = function(t, r, n, a, i) {
  var o = r.map(function(s) {
    var c = s.props.dataKey;
    return n === "number" && c && LO(t, s, c, a) || ri(t, c, n, i);
  });
  if (n === "number")
    return o.reduce(
      // @ts-expect-error if (type === number) means that the domain is numerical type
      // - but this link is missing in the type definition
      function(s, c) {
        return [Math.min(s[0], c[0]), Math.max(s[1], c[1])];
      },
      [1 / 0, -1 / 0]
    );
  var u = {};
  return o.reduce(function(s, c) {
    for (var l = 0, f = c.length; l < f; l++)
      u[c[l]] || (u[c[l]] = !0, s.push(c[l]));
    return s;
  }, []);
}, BO = function(t, r) {
  return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis";
}, jO = function(t, r, n, a) {
  if (a)
    return t.map(function(s) {
      return s.coordinate;
    });
  var i, o, u = t.map(function(s) {
    return s.coordinate === r && (i = !0), s.coordinate === n && (o = !0), s.coordinate;
  });
  return i || u.push(r), o || u.push(n), u;
}, mr = function(t, r, n) {
  if (!t) return null;
  var a = t.scale, i = t.duplicateDomain, o = t.type, u = t.range, s = t.realScaleType === "scaleBand" ? a.bandwidth() / 2 : 2, c = (r || n) && o === "category" && a.bandwidth ? a.bandwidth() / s : 0;
  if (c = t.axisType === "angleAxis" && u?.length >= 2 ? dt(u[0] - u[1]) * 2 * c : c, r && (t.ticks || t.niceTicks)) {
    var l = (t.ticks || t.niceTicks).map(function(f) {
      var h = i ? i.indexOf(f) : f;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: a(h) + c,
        value: f,
        offset: c
      };
    });
    return l.filter(function(f) {
      return !Vi(f.coordinate);
    });
  }
  return t.isCategorical && t.categoricalDomain ? t.categoricalDomain.map(function(f, h) {
    return {
      coordinate: a(f) + c,
      value: f,
      index: h,
      offset: c
    };
  }) : a.ticks && !n ? a.ticks(t.tickCount).map(function(f) {
    return {
      coordinate: a(f) + c,
      value: f,
      offset: c
    };
  }) : a.domain().map(function(f, h) {
    return {
      coordinate: a(f) + c,
      value: i ? i[f] : f,
      index: h,
      offset: c
    };
  });
}, id = /* @__PURE__ */ new WeakMap(), vo = function(t, r) {
  if (typeof r != "function")
    return t;
  id.has(t) || id.set(t, /* @__PURE__ */ new WeakMap());
  var n = id.get(t);
  if (n.has(r))
    return n.get(r);
  var a = function() {
    t.apply(void 0, arguments), r.apply(void 0, arguments);
  };
  return n.set(r, a), a;
}, FO = function(t, r, n) {
  var a = t.scale, i = t.type, o = t.layout, u = t.axisType;
  if (a === "auto")
    return o === "radial" && u === "radiusAxis" ? {
      scale: gi(),
      realScaleType: "band"
    } : o === "radial" && u === "angleAxis" ? {
      scale: eu(),
      realScaleType: "linear"
    } : i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: ti(),
      realScaleType: "point"
    } : i === "category" ? {
      scale: gi(),
      realScaleType: "band"
    } : {
      scale: eu(),
      realScaleType: "linear"
    };
  if (yn(a)) {
    var s = "scale".concat(Gu(a));
    return {
      scale: (r1[s] || ti)(),
      realScaleType: r1[s] ? s : "point"
    };
  }
  return de(a) ? {
    scale: a
  } : {
    scale: ti(),
    realScaleType: "point"
  };
}, g1 = 1e-4, $O = function(t) {
  var r = t.domain();
  if (!(!r || r.length <= 2)) {
    var n = r.length, a = t.range(), i = Math.min(a[0], a[1]) - g1, o = Math.max(a[0], a[1]) + g1, u = t(r[0]), s = t(r[n - 1]);
    (u < i || u > o || s < i || s > o) && t.domain([r[0], r[n - 1]]);
  }
}, i8 = function(t, r) {
  if (!t)
    return null;
  for (var n = 0, a = t.length; n < a; n++)
    if (t[n].item === r)
      return t[n].position;
  return null;
}, o8 = function(t, r) {
  if (!r || r.length !== 2 || !J(r[0]) || !J(r[1]))
    return t;
  var n = Math.min(r[0], r[1]), a = Math.max(r[0], r[1]), i = [t[0], t[1]];
  return (!J(t[0]) || t[0] < n) && (i[0] = n), (!J(t[1]) || t[1] > a) && (i[1] = a), i[0] > a && (i[0] = a), i[1] < n && (i[1] = n), i;
}, u8 = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, o = 0, u = 0; u < r; ++u) {
        var s = Vi(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
        s >= 0 ? (t[u][n][0] = i, t[u][n][1] = i + s, i = t[u][n][1]) : (t[u][n][0] = o, t[u][n][1] = o + s, o = t[u][n][1]);
      }
}, s8 = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, o = 0; o < r; ++o) {
        var u = Vi(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
        u >= 0 ? (t[o][n][0] = i, t[o][n][1] = i + u, i = t[o][n][1]) : (t[o][n][0] = 0, t[o][n][1] = 0);
      }
}, c8 = {
  sign: u8,
  // @ts-expect-error definitelytyped types are incorrect
  expand: X3,
  // @ts-expect-error definitelytyped types are incorrect
  none: Qn,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: Q3,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: Z3,
  positive: s8
}, l8 = function(t, r, n) {
  var a = r.map(function(u) {
    return u.props.dataKey;
  }), i = c8[n], o = V3().keys(a).value(function(u, s) {
    return +ut(u, s, 0);
  }).order(sh).offset(i);
  return o(t);
}, f8 = function(t, r, n, a, i, o) {
  if (!t)
    return null;
  var u = o ? r.reverse() : r, s = {}, c = u.reduce(function(f, h) {
    var p, g = (p = h.type) !== null && p !== void 0 && p.defaultProps ? Be(Be({}, h.type.defaultProps), h.props) : h.props, y = g.stackId, m = g.hide;
    if (m)
      return f;
    var E = g[n], v = f[E] || {
      hasStack: !1,
      stackGroups: {}
    };
    if (ze(y)) {
      var T = v.stackGroups[y] || {
        numericAxisId: n,
        cateAxisId: a,
        items: []
      };
      T.items.push(h), v.hasStack = !0, v.stackGroups[y] = T;
    } else
      v.stackGroups[Xi("_stackId_")] = {
        numericAxisId: n,
        cateAxisId: a,
        items: [h]
      };
    return Be(Be({}, f), {}, Gn({}, E, v));
  }, s), l = {};
  return Object.keys(c).reduce(function(f, h) {
    var p = c[h];
    if (p.hasStack) {
      var g = {};
      p.stackGroups = Object.keys(p.stackGroups).reduce(function(y, m) {
        var E = p.stackGroups[m];
        return Be(Be({}, y), {}, Gn({}, m, {
          numericAxisId: n,
          cateAxisId: a,
          items: E.items,
          stackedData: l8(t, E.items, i)
        }));
      }, g);
    }
    return Be(Be({}, f), {}, Gn({}, h, p));
  }, l);
}, UO = function(t, r) {
  var n = r.realScaleType, a = r.type, i = r.tickCount, o = r.originalDomain, u = r.allowDecimals, s = n || r.scale;
  if (s !== "auto" && s !== "linear")
    return null;
  if (i && a === "number" && o && (o[0] === "auto" || o[1] === "auto")) {
    var c = t.domain();
    if (!c.length)
      return null;
    var l = S4(c, i, u);
    return t.domain([cs(l), ss(l)]), {
      niceTicks: l
    };
  }
  if (i && a === "number") {
    var f = t.domain(), h = x4(f, i, u);
    return {
      niceTicks: h
    };
  }
  return null;
}, v1 = function(t) {
  var r = t.axis, n = t.ticks, a = t.offset, i = t.bandSize, o = t.entry, u = t.index;
  if (r.type === "category")
    return n[u] ? n[u].coordinate + a : null;
  var s = ut(o, r.dataKey, r.domain[u]);
  return me(s) ? null : r.scale(s) - i / 2 + a;
}, d8 = function(t) {
  var r = t.numericAxis, n = r.scale.domain();
  if (r.type === "number") {
    var a = Math.min(n[0], n[1]), i = Math.max(n[0], n[1]);
    return a <= 0 && i >= 0 ? 0 : i < 0 ? i : a;
  }
  return n[0];
}, h8 = function(t, r) {
  var n, a = (n = t.type) !== null && n !== void 0 && n.defaultProps ? Be(Be({}, t.type.defaultProps), t.props) : t.props, i = a.stackId;
  if (ze(i)) {
    var o = r[i];
    if (o) {
      var u = o.items.indexOf(t);
      return u >= 0 ? o.stackedData[u] : null;
    }
  }
  return null;
}, p8 = function(t) {
  return t.reduce(function(r, n) {
    return [cs(n.concat([r[0]]).filter(J)), ss(n.concat([r[1]]).filter(J))];
  }, [1 / 0, -1 / 0]);
}, HO = function(t, r, n) {
  return Object.keys(t).reduce(function(a, i) {
    var o = t[i], u = o.stackedData, s = u.reduce(function(c, l) {
      var f = p8(l.slice(r, n + 1));
      return [Math.min(c[0], f[0]), Math.max(c[1], f[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(s[0], a[0]), Math.max(s[1], a[1])];
  }, [1 / 0, -1 / 0]).map(function(a) {
    return a === 1 / 0 || a === -1 / 0 ? 0 : a;
  });
}, E1 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, T1 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Dh = function(t, r, n) {
  if (de(t))
    return t(r, n);
  if (!Array.isArray(t))
    return r;
  var a = [];
  if (J(t[0]))
    a[0] = n ? t[0] : Math.min(t[0], r[0]);
  else if (E1.test(t[0])) {
    var i = +E1.exec(t[0])[1];
    a[0] = r[0] - i;
  } else de(t[0]) ? a[0] = t[0](r[0]) : a[0] = r[0];
  if (J(t[1]))
    a[1] = n ? t[1] : Math.max(t[1], r[1]);
  else if (T1.test(t[1])) {
    var o = +T1.exec(t[1])[1];
    a[1] = r[1] + o;
  } else de(t[1]) ? a[1] = t[1](r[1]) : a[1] = r[1];
  return a;
}, uu = function(t, r, n) {
  if (t && t.scale && t.scale.bandwidth) {
    var a = t.scale.bandwidth();
    if (!n || a > 0)
      return a;
  }
  if (t && r && r.length >= 2) {
    for (var i = r0(r, function(f) {
      return f.coordinate;
    }), o = 1 / 0, u = 1, s = i.length; u < s; u++) {
      var c = i[u], l = i[u - 1];
      o = Math.min((c.coordinate || 0) - (l.coordinate || 0), o);
    }
    return o === 1 / 0 ? 0 : o;
  }
  return n ? void 0 : 0;
}, _1 = function(t, r, n) {
  return !t || !t.length || ls(t, xt(n, "type.defaultProps.domain")) ? r : t;
}, qO = function(t, r) {
  var n = t.type.defaultProps ? Be(Be({}, t.type.defaultProps), t.props) : t.props, a = n.dataKey, i = n.name, o = n.unit, u = n.formatter, s = n.tooltipType, c = n.chartType, l = n.hide;
  return Be(Be({}, le(t, !1)), {}, {
    dataKey: a,
    unit: o,
    formatter: u,
    name: i || a,
    color: P0(t),
    value: ut(r, a),
    type: s,
    payload: r,
    chartType: c,
    hide: l
  });
};
function wi(e) {
  "@babel/helpers - typeof";
  return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, wi(e);
}
function A1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? A1(Object(r), !0).forEach(function(n) {
      WO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : A1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function WO(e, t, r) {
  return t = m8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function m8(e) {
  var t = y8(e, "string");
  return wi(t) == "symbol" ? t : t + "";
}
function y8(e, t) {
  if (wi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function b8(e, t) {
  return T8(e) || E8(e, t) || v8(e, t) || g8();
}
function g8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function v8(e, t) {
  if (e) {
    if (typeof e == "string") return O1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return O1(e, t);
  }
}
function O1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function E8(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function T8(e) {
  if (Array.isArray(e)) return e;
}
var su = Math.PI / 180, _8 = function(t) {
  return t * 180 / Math.PI;
}, Ne = function(t, r, n, a) {
  return {
    x: t + Math.cos(-su * a) * n,
    y: r + Math.sin(-su * a) * n
  };
}, YO = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, A8 = function(t, r, n, a, i) {
  var o = t.width, u = t.height, s = t.startAngle, c = t.endAngle, l = ht(t.cx, o, o / 2), f = ht(t.cy, u, u / 2), h = YO(o, u, n), p = ht(t.innerRadius, h, 0), g = ht(t.outerRadius, h, h * 0.8), y = Object.keys(r);
  return y.reduce(function(m, E) {
    var v = r[E], T = v.domain, A = v.reversed, b;
    if (me(v.range))
      a === "angleAxis" ? b = [s, c] : a === "radiusAxis" && (b = [p, g]), A && (b = [b[1], b[0]]);
    else {
      b = v.range;
      var _ = b, O = b8(_, 2);
      s = O[0], c = O[1];
    }
    var I = FO(v, i), N = I.realScaleType, j = I.scale;
    j.domain(T).range(b), $O(j);
    var D = UO(j, fr(fr({}, v), {}, {
      realScaleType: N
    })), R = fr(fr(fr({}, v), D), {}, {
      range: b,
      radius: g,
      realScaleType: N,
      scale: j,
      cx: l,
      cy: f,
      innerRadius: p,
      outerRadius: g,
      startAngle: s,
      endAngle: c
    });
    return fr(fr({}, m), {}, WO({}, E, R));
  }, {});
}, O8 = function(t, r) {
  var n = t.x, a = t.y, i = r.x, o = r.y;
  return Math.sqrt(Math.pow(n - i, 2) + Math.pow(a - o, 2));
}, S8 = function(t, r) {
  var n = t.x, a = t.y, i = r.cx, o = r.cy, u = O8({
    x: n,
    y: a
  }, {
    x: i,
    y: o
  });
  if (u <= 0)
    return {
      radius: u
    };
  var s = (n - i) / u, c = Math.acos(s);
  return a > o && (c = 2 * Math.PI - c), {
    radius: u,
    angle: _8(c),
    angleInRadian: c
  };
}, x8 = function(t) {
  var r = t.startAngle, n = t.endAngle, a = Math.floor(r / 360), i = Math.floor(n / 360), o = Math.min(a, i);
  return {
    startAngle: r - o * 360,
    endAngle: n - o * 360
  };
}, w8 = function(t, r) {
  var n = r.startAngle, a = r.endAngle, i = Math.floor(n / 360), o = Math.floor(a / 360), u = Math.min(i, o);
  return t + u * 360;
}, S1 = function(t, r) {
  var n = t.x, a = t.y, i = S8({
    x: n,
    y: a
  }, r), o = i.radius, u = i.angle, s = r.innerRadius, c = r.outerRadius;
  if (o < s || o > c)
    return !1;
  if (o === 0)
    return !0;
  var l = x8(r), f = l.startAngle, h = l.endAngle, p = u, g;
  if (f <= h) {
    for (; p > h; )
      p -= 360;
    for (; p < f; )
      p += 360;
    g = p >= f && p <= h;
  } else {
    for (; p > f; )
      p -= 360;
    for (; p < h; )
      p += 360;
    g = p >= h && p <= f;
  }
  return g ? fr(fr({}, r), {}, {
    radius: o,
    angle: w8(p, r)
  }) : null;
}, zO = function(t) {
  return !/* @__PURE__ */ Lt(t) && !de(t) && typeof t != "boolean" ? t.className : "";
};
function Pi(e) {
  "@babel/helpers - typeof";
  return Pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pi(e);
}
var P8 = ["offset"];
function I8(e) {
  return D8(e) || R8(e) || N8(e) || C8();
}
function C8() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function N8(e, t) {
  if (e) {
    if (typeof e == "string") return Mh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Mh(e, t);
  }
}
function R8(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function D8(e) {
  if (Array.isArray(e)) return Mh(e);
}
function Mh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function M8(e, t) {
  if (e == null) return {};
  var r = L8(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function L8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function x1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function We(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? x1(Object(r), !0).forEach(function(n) {
      k8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : x1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function k8(e, t, r) {
  return t = B8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function B8(e) {
  var t = j8(e, "string");
  return Pi(t) == "symbol" ? t : t + "";
}
function j8(e, t) {
  if (Pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ii() {
  return Ii = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ii.apply(this, arguments);
}
var F8 = function(t) {
  var r = t.value, n = t.formatter, a = me(t.children) ? r : t.children;
  return de(n) ? n(a) : a;
}, $8 = function(t, r) {
  var n = dt(r - t), a = Math.min(Math.abs(r - t), 360);
  return n * a;
}, U8 = function(t, r, n) {
  var a = t.position, i = t.viewBox, o = t.offset, u = t.className, s = i, c = s.cx, l = s.cy, f = s.innerRadius, h = s.outerRadius, p = s.startAngle, g = s.endAngle, y = s.clockWise, m = (f + h) / 2, E = $8(p, g), v = E >= 0 ? 1 : -1, T, A;
  a === "insideStart" ? (T = p + v * o, A = y) : a === "insideEnd" ? (T = g - v * o, A = !y) : a === "end" && (T = g + v * o, A = y), A = E <= 0 ? A : !A;
  var b = Ne(c, l, m, T), _ = Ne(c, l, m, T + (A ? 1 : -1) * 359), O = "M".concat(b.x, ",").concat(b.y, `
    A`).concat(m, ",").concat(m, ",0,1,").concat(A ? 0 : 1, `,
    `).concat(_.x, ",").concat(_.y), I = me(t.id) ? Xi("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ C.createElement("text", Ii({}, n, {
    dominantBaseline: "central",
    className: pe("recharts-radial-bar-label", u)
  }), /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("path", {
    id: I,
    d: O
  })), /* @__PURE__ */ C.createElement("textPath", {
    xlinkHref: "#".concat(I)
  }, r));
}, H8 = function(t) {
  var r = t.viewBox, n = t.offset, a = t.position, i = r, o = i.cx, u = i.cy, s = i.innerRadius, c = i.outerRadius, l = i.startAngle, f = i.endAngle, h = (l + f) / 2;
  if (a === "outside") {
    var p = Ne(o, u, c + n, h), g = p.x, y = p.y;
    return {
      x: g,
      y,
      textAnchor: g >= o ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (a === "center")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (a === "centerTop")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (a === "centerBottom")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var m = (s + c) / 2, E = Ne(o, u, m, h), v = E.x, T = E.y;
  return {
    x: v,
    y: T,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, q8 = function(t) {
  var r = t.viewBox, n = t.parentViewBox, a = t.offset, i = t.position, o = r, u = o.x, s = o.y, c = o.width, l = o.height, f = l >= 0 ? 1 : -1, h = f * a, p = f > 0 ? "end" : "start", g = f > 0 ? "start" : "end", y = c >= 0 ? 1 : -1, m = y * a, E = y > 0 ? "end" : "start", v = y > 0 ? "start" : "end";
  if (i === "top") {
    var T = {
      x: u + c / 2,
      y: s - f * a,
      textAnchor: "middle",
      verticalAnchor: p
    };
    return We(We({}, T), n ? {
      height: Math.max(s - n.y, 0),
      width: c
    } : {});
  }
  if (i === "bottom") {
    var A = {
      x: u + c / 2,
      y: s + l + h,
      textAnchor: "middle",
      verticalAnchor: g
    };
    return We(We({}, A), n ? {
      height: Math.max(n.y + n.height - (s + l), 0),
      width: c
    } : {});
  }
  if (i === "left") {
    var b = {
      x: u - m,
      y: s + l / 2,
      textAnchor: E,
      verticalAnchor: "middle"
    };
    return We(We({}, b), n ? {
      width: Math.max(b.x - n.x, 0),
      height: l
    } : {});
  }
  if (i === "right") {
    var _ = {
      x: u + c + m,
      y: s + l / 2,
      textAnchor: v,
      verticalAnchor: "middle"
    };
    return We(We({}, _), n ? {
      width: Math.max(n.x + n.width - _.x, 0),
      height: l
    } : {});
  }
  var O = n ? {
    width: c,
    height: l
  } : {};
  return i === "insideLeft" ? We({
    x: u + m,
    y: s + l / 2,
    textAnchor: v,
    verticalAnchor: "middle"
  }, O) : i === "insideRight" ? We({
    x: u + c - m,
    y: s + l / 2,
    textAnchor: E,
    verticalAnchor: "middle"
  }, O) : i === "insideTop" ? We({
    x: u + c / 2,
    y: s + h,
    textAnchor: "middle",
    verticalAnchor: g
  }, O) : i === "insideBottom" ? We({
    x: u + c / 2,
    y: s + l - h,
    textAnchor: "middle",
    verticalAnchor: p
  }, O) : i === "insideTopLeft" ? We({
    x: u + m,
    y: s + h,
    textAnchor: v,
    verticalAnchor: g
  }, O) : i === "insideTopRight" ? We({
    x: u + c - m,
    y: s + h,
    textAnchor: E,
    verticalAnchor: g
  }, O) : i === "insideBottomLeft" ? We({
    x: u + m,
    y: s + l - h,
    textAnchor: v,
    verticalAnchor: p
  }, O) : i === "insideBottomRight" ? We({
    x: u + c - m,
    y: s + l - h,
    textAnchor: E,
    verticalAnchor: p
  }, O) : Oa(i) && (J(i.x) || on(i.x)) && (J(i.y) || on(i.y)) ? We({
    x: u + ht(i.x, c),
    y: s + ht(i.y, l),
    textAnchor: "end",
    verticalAnchor: "end"
  }, O) : We({
    x: u + c / 2,
    y: s + l / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, O);
}, W8 = function(t) {
  return "cx" in t && J(t.cx);
};
function Qe(e) {
  var t = e.offset, r = t === void 0 ? 5 : t, n = M8(e, P8), a = We({
    offset: r
  }, n), i = a.viewBox, o = a.position, u = a.value, s = a.children, c = a.content, l = a.className, f = l === void 0 ? "" : l, h = a.textBreakAll;
  if (!i || me(u) && me(s) && !/* @__PURE__ */ Lt(c) && !de(c))
    return null;
  if (/* @__PURE__ */ Lt(c))
    return /* @__PURE__ */ Ue(c, a);
  var p;
  if (de(c)) {
    if (p = /* @__PURE__ */ oi(c, a), /* @__PURE__ */ Lt(p))
      return p;
  } else
    p = F8(a);
  var g = W8(i), y = le(a, !0);
  if (g && (o === "insideStart" || o === "insideEnd" || o === "end"))
    return U8(a, p, y);
  var m = g ? H8(a) : q8(a);
  return /* @__PURE__ */ C.createElement(gn, Ii({
    className: pe("recharts-label", f)
  }, y, m, {
    breakAll: h
  }), p);
}
Qe.displayName = "Label";
var GO = function(t) {
  var r = t.cx, n = t.cy, a = t.angle, i = t.startAngle, o = t.endAngle, u = t.r, s = t.radius, c = t.innerRadius, l = t.outerRadius, f = t.x, h = t.y, p = t.top, g = t.left, y = t.width, m = t.height, E = t.clockWise, v = t.labelViewBox;
  if (v)
    return v;
  if (J(y) && J(m)) {
    if (J(f) && J(h))
      return {
        x: f,
        y: h,
        width: y,
        height: m
      };
    if (J(p) && J(g))
      return {
        x: p,
        y: g,
        width: y,
        height: m
      };
  }
  return J(f) && J(h) ? {
    x: f,
    y: h,
    width: 0,
    height: 0
  } : J(r) && J(n) ? {
    cx: r,
    cy: n,
    startAngle: i || a || 0,
    endAngle: o || a || 0,
    innerRadius: c || 0,
    outerRadius: l || s || u || 0,
    clockWise: E
  } : t.viewBox ? t.viewBox : {};
}, Y8 = function(t, r) {
  return t ? t === !0 ? /* @__PURE__ */ C.createElement(Qe, {
    key: "label-implicit",
    viewBox: r
  }) : ze(t) ? /* @__PURE__ */ C.createElement(Qe, {
    key: "label-implicit",
    viewBox: r,
    value: t
  }) : /* @__PURE__ */ Lt(t) ? t.type === Qe ? /* @__PURE__ */ Ue(t, {
    key: "label-implicit",
    viewBox: r
  }) : /* @__PURE__ */ C.createElement(Qe, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : de(t) ? /* @__PURE__ */ C.createElement(Qe, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : Oa(t) ? /* @__PURE__ */ C.createElement(Qe, Ii({
    viewBox: r
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, z8 = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && n && !t.label)
    return null;
  var a = t.children, i = GO(t), o = jt(a, Qe).map(function(s, c) {
    return /* @__PURE__ */ Ue(s, {
      viewBox: r || i,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(c)
    });
  });
  if (!n)
    return o;
  var u = Y8(t.label, r || i);
  return [u].concat(I8(o));
};
Qe.parseViewBox = GO;
Qe.renderCallByParent = z8;
var od, w1;
function G8() {
  if (w1) return od;
  w1 = 1;
  function e(t) {
    var r = t == null ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  }
  return od = e, od;
}
var K8 = G8();
const V8 = /* @__PURE__ */ xe(K8);
function Ci(e) {
  "@babel/helpers - typeof";
  return Ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ci(e);
}
var X8 = ["valueAccessor"], Q8 = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function Z8(e) {
  return rB(e) || tB(e) || eB(e) || J8();
}
function J8() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function eB(e, t) {
  if (e) {
    if (typeof e == "string") return Lh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Lh(e, t);
  }
}
function tB(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function rB(e) {
  if (Array.isArray(e)) return Lh(e);
}
function Lh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function cu() {
  return cu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, cu.apply(this, arguments);
}
function P1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function I1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? P1(Object(r), !0).forEach(function(n) {
      nB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : P1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function nB(e, t, r) {
  return t = aB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function aB(e) {
  var t = iB(e, "string");
  return Ci(t) == "symbol" ? t : t + "";
}
function iB(e, t) {
  if (Ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function C1(e, t) {
  if (e == null) return {};
  var r = oB(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function oB(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var uB = function(t) {
  return Array.isArray(t.value) ? V8(t.value) : t.value;
};
function Gt(e) {
  var t = e.valueAccessor, r = t === void 0 ? uB : t, n = C1(e, X8), a = n.data, i = n.dataKey, o = n.clockWise, u = n.id, s = n.textBreakAll, c = C1(n, Q8);
  return !a || !a.length ? null : /* @__PURE__ */ C.createElement(Oe, {
    className: "recharts-label-list"
  }, a.map(function(l, f) {
    var h = me(i) ? r(l, f) : ut(l && l.payload, i), p = me(u) ? {} : {
      id: "".concat(u, "-").concat(f)
    };
    return /* @__PURE__ */ C.createElement(Qe, cu({}, le(l, !0), c, p, {
      parentViewBox: l.parentViewBox,
      value: h,
      textBreakAll: s,
      viewBox: Qe.parseViewBox(me(o) ? l : I1(I1({}, l), {}, {
        clockWise: o
      })),
      key: "label-".concat(f),
      index: f
    }));
  }));
}
Gt.displayName = "LabelList";
function sB(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ C.createElement(Gt, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ C.isValidElement(e) || de(e) ? /* @__PURE__ */ C.createElement(Gt, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : Oa(e) ? /* @__PURE__ */ C.createElement(Gt, cu({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function cB(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label)
    return null;
  var n = e.children, a = jt(n, Gt).map(function(o, u) {
    return /* @__PURE__ */ Ue(o, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(u)
    });
  });
  if (!r)
    return a;
  var i = sB(e.label, t);
  return [i].concat(Z8(a));
}
Gt.renderCallByParent = cB;
function Ni(e) {
  "@babel/helpers - typeof";
  return Ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ni(e);
}
function kh() {
  return kh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, kh.apply(this, arguments);
}
function N1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function R1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? N1(Object(r), !0).forEach(function(n) {
      lB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : N1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function lB(e, t, r) {
  return t = fB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fB(e) {
  var t = dB(e, "string");
  return Ni(t) == "symbol" ? t : t + "";
}
function dB(e, t) {
  if (Ni(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var hB = function(t, r) {
  var n = dt(r - t), a = Math.min(Math.abs(r - t), 359.999);
  return n * a;
}, Eo = function(t) {
  var r = t.cx, n = t.cy, a = t.radius, i = t.angle, o = t.sign, u = t.isExternal, s = t.cornerRadius, c = t.cornerIsExternal, l = s * (u ? 1 : -1) + a, f = Math.asin(s / l) / su, h = c ? i : i + o * f, p = Ne(r, n, l, h), g = Ne(r, n, a, h), y = c ? i - o * f : i, m = Ne(r, n, l * Math.cos(f * su), y);
  return {
    center: p,
    circleTangency: g,
    lineTangency: m,
    theta: f
  };
}, KO = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, o = t.startAngle, u = t.endAngle, s = hB(o, u), c = o + s, l = Ne(r, n, i, o), f = Ne(r, n, i, c), h = "M ".concat(l.x, ",").concat(l.y, `
    A `).concat(i, ",").concat(i, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(o > c), `,
    `).concat(f.x, ",").concat(f.y, `
  `);
  if (a > 0) {
    var p = Ne(r, n, a, o), g = Ne(r, n, a, c);
    h += "L ".concat(g.x, ",").concat(g.y, `
            A `).concat(a, ",").concat(a, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(o <= c), `,
            `).concat(p.x, ",").concat(p.y, " Z");
  } else
    h += "L ".concat(r, ",").concat(n, " Z");
  return h;
}, pB = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, o = t.cornerRadius, u = t.forceCornerRadius, s = t.cornerIsExternal, c = t.startAngle, l = t.endAngle, f = dt(l - c), h = Eo({
    cx: r,
    cy: n,
    radius: i,
    angle: c,
    sign: f,
    cornerRadius: o,
    cornerIsExternal: s
  }), p = h.circleTangency, g = h.lineTangency, y = h.theta, m = Eo({
    cx: r,
    cy: n,
    radius: i,
    angle: l,
    sign: -f,
    cornerRadius: o,
    cornerIsExternal: s
  }), E = m.circleTangency, v = m.lineTangency, T = m.theta, A = s ? Math.abs(c - l) : Math.abs(c - l) - y - T;
  if (A < 0)
    return u ? "M ".concat(g.x, ",").concat(g.y, `
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(o * 2, `,0
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(-o * 2, `,0
      `) : KO({
      cx: r,
      cy: n,
      innerRadius: a,
      outerRadius: i,
      startAngle: c,
      endAngle: l
    });
  var b = "M ".concat(g.x, ",").concat(g.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(f < 0), ",").concat(p.x, ",").concat(p.y, `
    A`).concat(i, ",").concat(i, ",0,").concat(+(A > 180), ",").concat(+(f < 0), ",").concat(E.x, ",").concat(E.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(f < 0), ",").concat(v.x, ",").concat(v.y, `
  `);
  if (a > 0) {
    var _ = Eo({
      cx: r,
      cy: n,
      radius: a,
      angle: c,
      sign: f,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: s
    }), O = _.circleTangency, I = _.lineTangency, N = _.theta, j = Eo({
      cx: r,
      cy: n,
      radius: a,
      angle: l,
      sign: -f,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: s
    }), D = j.circleTangency, R = j.lineTangency, B = j.theta, F = s ? Math.abs(c - l) : Math.abs(c - l) - N - B;
    if (F < 0 && o === 0)
      return "".concat(b, "L").concat(r, ",").concat(n, "Z");
    b += "L".concat(R.x, ",").concat(R.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(f < 0), ",").concat(D.x, ",").concat(D.y, `
      A`).concat(a, ",").concat(a, ",0,").concat(+(F > 180), ",").concat(+(f > 0), ",").concat(O.x, ",").concat(O.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(f < 0), ",").concat(I.x, ",").concat(I.y, "Z");
  } else
    b += "L".concat(r, ",").concat(n, "Z");
  return b;
}, mB = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, VO = function(t) {
  var r = R1(R1({}, mB), t), n = r.cx, a = r.cy, i = r.innerRadius, o = r.outerRadius, u = r.cornerRadius, s = r.forceCornerRadius, c = r.cornerIsExternal, l = r.startAngle, f = r.endAngle, h = r.className;
  if (o < i || l === f)
    return null;
  var p = pe("recharts-sector", h), g = o - i, y = ht(u, g, 0, !0), m;
  return y > 0 && Math.abs(l - f) < 360 ? m = pB({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: o,
    cornerRadius: Math.min(y, g / 2),
    forceCornerRadius: s,
    cornerIsExternal: c,
    startAngle: l,
    endAngle: f
  }) : m = KO({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: o,
    startAngle: l,
    endAngle: f
  }), /* @__PURE__ */ C.createElement("path", kh({}, le(r, !0), {
    className: p,
    d: m,
    role: "img"
  }));
};
function Ri(e) {
  "@babel/helpers - typeof";
  return Ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ri(e);
}
function Bh() {
  return Bh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Bh.apply(this, arguments);
}
function D1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function M1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? D1(Object(r), !0).forEach(function(n) {
      yB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : D1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function yB(e, t, r) {
  return t = bB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bB(e) {
  var t = gB(e, "string");
  return Ri(t) == "symbol" ? t : t + "";
}
function gB(e, t) {
  if (Ri(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ri(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var L1 = {
  curveBasisClosed: j3,
  curveBasisOpen: F3,
  curveBasis: B3,
  curveBumpX: A3,
  curveBumpY: O3,
  curveLinearClosed: $3,
  curveLinear: Vu,
  curveMonotoneX: U3,
  curveMonotoneY: H3,
  curveNatural: q3,
  curveStep: W3,
  curveStepAfter: z3,
  curveStepBefore: Y3
}, To = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, Fa = function(t) {
  return t.x;
}, $a = function(t) {
  return t.y;
}, vB = function(t, r) {
  if (de(t))
    return t;
  var n = "curve".concat(Gu(t));
  return (n === "curveMonotone" || n === "curveBump") && r ? L1["".concat(n).concat(r === "vertical" ? "Y" : "X")] : L1[n] || Vu;
}, EB = function(t) {
  var r = t.type, n = r === void 0 ? "linear" : r, a = t.points, i = a === void 0 ? [] : a, o = t.baseLine, u = t.layout, s = t.connectNulls, c = s === void 0 ? !1 : s, l = vB(n, u), f = c ? i.filter(function(y) {
    return To(y);
  }) : i, h;
  if (Array.isArray(o)) {
    var p = c ? o.filter(function(y) {
      return To(y);
    }) : o, g = f.map(function(y, m) {
      return M1(M1({}, y), {}, {
        base: p[m]
      });
    });
    return u === "vertical" ? h = fo().y($a).x1(Fa).x0(function(y) {
      return y.base.x;
    }) : h = fo().x(Fa).y1($a).y0(function(y) {
      return y.base.y;
    }), h.defined(To).curve(l), h(g);
  }
  return u === "vertical" && J(o) ? h = fo().y($a).x1(Fa).x0(o) : J(o) ? h = fo().x(Fa).y1($a).y0(o) : h = K_().x(Fa).y($a), h.defined(To).curve(l), h(f);
}, jh = function(t) {
  var r = t.className, n = t.points, a = t.path, i = t.pathRef;
  if ((!n || !n.length) && !a)
    return null;
  var o = n && n.length ? EB(t) : a;
  return /* @__PURE__ */ Wr.createElement("path", Bh({}, le(t, !1), ko(t), {
    className: pe("recharts-curve", r),
    d: o,
    ref: i
  }));
}, _o = { exports: {} }, Ao = { exports: {} }, Te = {};
var k1;
function TB() {
  if (k1) return Te;
  k1 = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? /* @__PURE__ */ Symbol.for("react.element") : 60103, r = e ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, n = e ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, a = e ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, i = e ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, o = e ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, u = e ? /* @__PURE__ */ Symbol.for("react.context") : 60110, s = e ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, c = e ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, l = e ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, f = e ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, h = e ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, p = e ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, g = e ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, y = e ? /* @__PURE__ */ Symbol.for("react.block") : 60121, m = e ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, E = e ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, v = e ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
  function T(b) {
    if (typeof b == "object" && b !== null) {
      var _ = b.$$typeof;
      switch (_) {
        case t:
          switch (b = b.type, b) {
            case s:
            case c:
            case n:
            case i:
            case a:
            case f:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case u:
                case l:
                case g:
                case p:
                case o:
                  return b;
                default:
                  return _;
              }
          }
        case r:
          return _;
      }
    }
  }
  function A(b) {
    return T(b) === c;
  }
  return Te.AsyncMode = s, Te.ConcurrentMode = c, Te.ContextConsumer = u, Te.ContextProvider = o, Te.Element = t, Te.ForwardRef = l, Te.Fragment = n, Te.Lazy = g, Te.Memo = p, Te.Portal = r, Te.Profiler = i, Te.StrictMode = a, Te.Suspense = f, Te.isAsyncMode = function(b) {
    return A(b) || T(b) === s;
  }, Te.isConcurrentMode = A, Te.isContextConsumer = function(b) {
    return T(b) === u;
  }, Te.isContextProvider = function(b) {
    return T(b) === o;
  }, Te.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, Te.isForwardRef = function(b) {
    return T(b) === l;
  }, Te.isFragment = function(b) {
    return T(b) === n;
  }, Te.isLazy = function(b) {
    return T(b) === g;
  }, Te.isMemo = function(b) {
    return T(b) === p;
  }, Te.isPortal = function(b) {
    return T(b) === r;
  }, Te.isProfiler = function(b) {
    return T(b) === i;
  }, Te.isStrictMode = function(b) {
    return T(b) === a;
  }, Te.isSuspense = function(b) {
    return T(b) === f;
  }, Te.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === n || b === c || b === i || b === a || b === f || b === h || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === p || b.$$typeof === o || b.$$typeof === u || b.$$typeof === l || b.$$typeof === m || b.$$typeof === E || b.$$typeof === v || b.$$typeof === y);
  }, Te.typeOf = T, Te;
}
var _e = {};
var B1;
function _B() {
  return B1 || (B1 = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? /* @__PURE__ */ Symbol.for("react.element") : 60103, r = e ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, n = e ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, a = e ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, i = e ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, o = e ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, u = e ? /* @__PURE__ */ Symbol.for("react.context") : 60110, s = e ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, c = e ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, l = e ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, f = e ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, h = e ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, p = e ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, g = e ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, y = e ? /* @__PURE__ */ Symbol.for("react.block") : 60121, m = e ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, E = e ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, v = e ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
    function T(M) {
      return typeof M == "string" || typeof M == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      M === n || M === c || M === i || M === a || M === f || M === h || typeof M == "object" && M !== null && (M.$$typeof === g || M.$$typeof === p || M.$$typeof === o || M.$$typeof === u || M.$$typeof === l || M.$$typeof === m || M.$$typeof === E || M.$$typeof === v || M.$$typeof === y);
    }
    function A(M) {
      if (typeof M == "object" && M !== null) {
        var ye = M.$$typeof;
        switch (ye) {
          case t:
            var X = M.type;
            switch (X) {
              case s:
              case c:
              case n:
              case i:
              case a:
              case f:
                return X;
              default:
                var Pe = X && X.$$typeof;
                switch (Pe) {
                  case u:
                  case l:
                  case g:
                  case p:
                  case o:
                    return Pe;
                  default:
                    return ye;
                }
            }
          case r:
            return ye;
        }
      }
    }
    var b = s, _ = c, O = u, I = o, N = t, j = l, D = n, R = g, B = p, F = r, $ = i, q = a, Y = f, Q = !1;
    function te(M) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), k(M) || A(M) === s;
    }
    function k(M) {
      return A(M) === c;
    }
    function W(M) {
      return A(M) === u;
    }
    function z(M) {
      return A(M) === o;
    }
    function Z(M) {
      return typeof M == "object" && M !== null && M.$$typeof === t;
    }
    function ne(M) {
      return A(M) === l;
    }
    function oe(M) {
      return A(M) === n;
    }
    function ue(M) {
      return A(M) === g;
    }
    function fe(M) {
      return A(M) === p;
    }
    function ce(M) {
      return A(M) === r;
    }
    function G(M) {
      return A(M) === i;
    }
    function re(M) {
      return A(M) === a;
    }
    function ie(M) {
      return A(M) === f;
    }
    _e.AsyncMode = b, _e.ConcurrentMode = _, _e.ContextConsumer = O, _e.ContextProvider = I, _e.Element = N, _e.ForwardRef = j, _e.Fragment = D, _e.Lazy = R, _e.Memo = B, _e.Portal = F, _e.Profiler = $, _e.StrictMode = q, _e.Suspense = Y, _e.isAsyncMode = te, _e.isConcurrentMode = k, _e.isContextConsumer = W, _e.isContextProvider = z, _e.isElement = Z, _e.isForwardRef = ne, _e.isFragment = oe, _e.isLazy = ue, _e.isMemo = fe, _e.isPortal = ce, _e.isProfiler = G, _e.isStrictMode = re, _e.isSuspense = ie, _e.isValidElementType = T, _e.typeOf = A;
  })()), _e;
}
var j1;
function XO() {
  return j1 || (j1 = 1, process.env.NODE_ENV === "production" ? Ao.exports = TB() : Ao.exports = _B()), Ao.exports;
}
var ud, F1;
function AB() {
  if (F1) return ud;
  F1 = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var o = {}, u = 0; u < 10; u++)
        o["_" + String.fromCharCode(u)] = u;
      var s = Object.getOwnPropertyNames(o).map(function(l) {
        return o[l];
      });
      if (s.join("") !== "0123456789")
        return !1;
      var c = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(l) {
        c[l] = l;
      }), Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ud = a() ? Object.assign : function(i, o) {
    for (var u, s = n(i), c, l = 1; l < arguments.length; l++) {
      u = Object(arguments[l]);
      for (var f in u)
        t.call(u, f) && (s[f] = u[f]);
      if (e) {
        c = e(u);
        for (var h = 0; h < c.length; h++)
          r.call(u, c[h]) && (s[c[h]] = u[c[h]]);
      }
    }
    return s;
  }, ud;
}
var sd, $1;
function I0() {
  if ($1) return sd;
  $1 = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return sd = e, sd;
}
var cd, U1;
function QO() {
  return U1 || (U1 = 1, cd = Function.call.bind(Object.prototype.hasOwnProperty)), cd;
}
var ld, H1;
function OB() {
  if (H1) return ld;
  H1 = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = /* @__PURE__ */ I0(), r = {}, n = /* @__PURE__ */ QO();
    e = function(i) {
      var o = "Warning: " + i;
      typeof console < "u" && console.error(o);
      try {
        throw new Error(o);
      } catch {
      }
    };
  }
  function a(i, o, u, s, c) {
    if (process.env.NODE_ENV !== "production") {
      for (var l in i)
        if (n(i, l)) {
          var f;
          try {
            if (typeof i[l] != "function") {
              var h = Error(
                (s || "React class") + ": " + u + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw h.name = "Invariant Violation", h;
            }
            f = i[l](o, l, s, u, null, t);
          } catch (g) {
            f = g;
          }
          if (f && !(f instanceof Error) && e(
            (s || "React class") + ": type specification of " + u + " `" + l + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in r)) {
            r[f.message] = !0;
            var p = c ? c() : "";
            e(
              "Failed " + u + " type: " + f.message + (p ?? "")
            );
          }
        }
    }
  }
  return a.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, ld = a, ld;
}
var fd, q1;
function SB() {
  if (q1) return fd;
  q1 = 1;
  var e = XO(), t = AB(), r = /* @__PURE__ */ I0(), n = /* @__PURE__ */ QO(), a = /* @__PURE__ */ OB(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(u) {
    var s = "Warning: " + u;
    typeof console < "u" && console.error(s);
    try {
      throw new Error(s);
    } catch {
    }
  });
  function o() {
    return null;
  }
  return fd = function(u, s) {
    var c = typeof Symbol == "function" && Symbol.iterator, l = "@@iterator";
    function f(k) {
      var W = k && (c && k[c] || k[l]);
      if (typeof W == "function")
        return W;
    }
    var h = "<<anonymous>>", p = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: v(),
      arrayOf: T,
      element: A(),
      elementType: b(),
      instanceOf: _,
      node: j(),
      objectOf: I,
      oneOf: O,
      oneOfType: N,
      shape: R,
      exact: B
    };
    function g(k, W) {
      return k === W ? k !== 0 || 1 / k === 1 / W : k !== k && W !== W;
    }
    function y(k, W) {
      this.message = k, this.data = W && typeof W == "object" ? W : {}, this.stack = "";
    }
    y.prototype = Error.prototype;
    function m(k) {
      if (process.env.NODE_ENV !== "production")
        var W = {}, z = 0;
      function Z(oe, ue, fe, ce, G, re, ie) {
        if (ce = ce || h, re = re || fe, ie !== r) {
          if (s) {
            var M = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw M.name = "Invariant Violation", M;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ye = ce + ":" + fe;
            !W[ye] && // Avoid spamming the console because they are often not actionable except for lib authors
            z < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + re + "` prop on `" + ce + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), W[ye] = !0, z++);
          }
        }
        return ue[fe] == null ? oe ? ue[fe] === null ? new y("The " + G + " `" + re + "` is marked as required " + ("in `" + ce + "`, but its value is `null`.")) : new y("The " + G + " `" + re + "` is marked as required in " + ("`" + ce + "`, but its value is `undefined`.")) : null : k(ue, fe, ce, G, re);
      }
      var ne = Z.bind(null, !1);
      return ne.isRequired = Z.bind(null, !0), ne;
    }
    function E(k) {
      function W(z, Z, ne, oe, ue, fe) {
        var ce = z[Z], G = q(ce);
        if (G !== k) {
          var re = Y(ce);
          return new y(
            "Invalid " + oe + " `" + ue + "` of type " + ("`" + re + "` supplied to `" + ne + "`, expected ") + ("`" + k + "`."),
            { expectedType: k }
          );
        }
        return null;
      }
      return m(W);
    }
    function v() {
      return m(o);
    }
    function T(k) {
      function W(z, Z, ne, oe, ue) {
        if (typeof k != "function")
          return new y("Property `" + ue + "` of component `" + ne + "` has invalid PropType notation inside arrayOf.");
        var fe = z[Z];
        if (!Array.isArray(fe)) {
          var ce = q(fe);
          return new y("Invalid " + oe + " `" + ue + "` of type " + ("`" + ce + "` supplied to `" + ne + "`, expected an array."));
        }
        for (var G = 0; G < fe.length; G++) {
          var re = k(fe, G, ne, oe, ue + "[" + G + "]", r);
          if (re instanceof Error)
            return re;
        }
        return null;
      }
      return m(W);
    }
    function A() {
      function k(W, z, Z, ne, oe) {
        var ue = W[z];
        if (!u(ue)) {
          var fe = q(ue);
          return new y("Invalid " + ne + " `" + oe + "` of type " + ("`" + fe + "` supplied to `" + Z + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(k);
    }
    function b() {
      function k(W, z, Z, ne, oe) {
        var ue = W[z];
        if (!e.isValidElementType(ue)) {
          var fe = q(ue);
          return new y("Invalid " + ne + " `" + oe + "` of type " + ("`" + fe + "` supplied to `" + Z + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(k);
    }
    function _(k) {
      function W(z, Z, ne, oe, ue) {
        if (!(z[Z] instanceof k)) {
          var fe = k.name || h, ce = te(z[Z]);
          return new y("Invalid " + oe + " `" + ue + "` of type " + ("`" + ce + "` supplied to `" + ne + "`, expected ") + ("instance of `" + fe + "`."));
        }
        return null;
      }
      return m(W);
    }
    function O(k) {
      if (!Array.isArray(k))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), o;
      function W(z, Z, ne, oe, ue) {
        for (var fe = z[Z], ce = 0; ce < k.length; ce++)
          if (g(fe, k[ce]))
            return null;
        var G = JSON.stringify(k, function(ie, M) {
          var ye = Y(M);
          return ye === "symbol" ? String(M) : M;
        });
        return new y("Invalid " + oe + " `" + ue + "` of value `" + String(fe) + "` " + ("supplied to `" + ne + "`, expected one of " + G + "."));
      }
      return m(W);
    }
    function I(k) {
      function W(z, Z, ne, oe, ue) {
        if (typeof k != "function")
          return new y("Property `" + ue + "` of component `" + ne + "` has invalid PropType notation inside objectOf.");
        var fe = z[Z], ce = q(fe);
        if (ce !== "object")
          return new y("Invalid " + oe + " `" + ue + "` of type " + ("`" + ce + "` supplied to `" + ne + "`, expected an object."));
        for (var G in fe)
          if (n(fe, G)) {
            var re = k(fe, G, ne, oe, ue + "." + G, r);
            if (re instanceof Error)
              return re;
          }
        return null;
      }
      return m(W);
    }
    function N(k) {
      if (!Array.isArray(k))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), o;
      for (var W = 0; W < k.length; W++) {
        var z = k[W];
        if (typeof z != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Q(z) + " at index " + W + "."
          ), o;
      }
      function Z(ne, oe, ue, fe, ce) {
        for (var G = [], re = 0; re < k.length; re++) {
          var ie = k[re], M = ie(ne, oe, ue, fe, ce, r);
          if (M == null)
            return null;
          M.data && n(M.data, "expectedType") && G.push(M.data.expectedType);
        }
        var ye = G.length > 0 ? ", expected one of type [" + G.join(", ") + "]" : "";
        return new y("Invalid " + fe + " `" + ce + "` supplied to " + ("`" + ue + "`" + ye + "."));
      }
      return m(Z);
    }
    function j() {
      function k(W, z, Z, ne, oe) {
        return F(W[z]) ? null : new y("Invalid " + ne + " `" + oe + "` supplied to " + ("`" + Z + "`, expected a ReactNode."));
      }
      return m(k);
    }
    function D(k, W, z, Z, ne) {
      return new y(
        (k || "React class") + ": " + W + " type `" + z + "." + Z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + ne + "`."
      );
    }
    function R(k) {
      function W(z, Z, ne, oe, ue) {
        var fe = z[Z], ce = q(fe);
        if (ce !== "object")
          return new y("Invalid " + oe + " `" + ue + "` of type `" + ce + "` " + ("supplied to `" + ne + "`, expected `object`."));
        for (var G in k) {
          var re = k[G];
          if (typeof re != "function")
            return D(ne, oe, ue, G, Y(re));
          var ie = re(fe, G, ne, oe, ue + "." + G, r);
          if (ie)
            return ie;
        }
        return null;
      }
      return m(W);
    }
    function B(k) {
      function W(z, Z, ne, oe, ue) {
        var fe = z[Z], ce = q(fe);
        if (ce !== "object")
          return new y("Invalid " + oe + " `" + ue + "` of type `" + ce + "` " + ("supplied to `" + ne + "`, expected `object`."));
        var G = t({}, z[Z], k);
        for (var re in G) {
          var ie = k[re];
          if (n(k, re) && typeof ie != "function")
            return D(ne, oe, ue, re, Y(ie));
          if (!ie)
            return new y(
              "Invalid " + oe + " `" + ue + "` key `" + re + "` supplied to `" + ne + "`.\nBad object: " + JSON.stringify(z[Z], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(k), null, "  ")
            );
          var M = ie(fe, re, ne, oe, ue + "." + re, r);
          if (M)
            return M;
        }
        return null;
      }
      return m(W);
    }
    function F(k) {
      switch (typeof k) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !k;
        case "object":
          if (Array.isArray(k))
            return k.every(F);
          if (k === null || u(k))
            return !0;
          var W = f(k);
          if (W) {
            var z = W.call(k), Z;
            if (W !== k.entries) {
              for (; !(Z = z.next()).done; )
                if (!F(Z.value))
                  return !1;
            } else
              for (; !(Z = z.next()).done; ) {
                var ne = Z.value;
                if (ne && !F(ne[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function $(k, W) {
      return k === "symbol" ? !0 : W ? W["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && W instanceof Symbol : !1;
    }
    function q(k) {
      var W = typeof k;
      return Array.isArray(k) ? "array" : k instanceof RegExp ? "object" : $(W, k) ? "symbol" : W;
    }
    function Y(k) {
      if (typeof k > "u" || k === null)
        return "" + k;
      var W = q(k);
      if (W === "object") {
        if (k instanceof Date)
          return "date";
        if (k instanceof RegExp)
          return "regexp";
      }
      return W;
    }
    function Q(k) {
      var W = Y(k);
      switch (W) {
        case "array":
        case "object":
          return "an " + W;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + W;
        default:
          return W;
      }
    }
    function te(k) {
      return !k.constructor || !k.constructor.name ? h : k.constructor.name;
    }
    return p.checkPropTypes = a, p.resetWarningCache = a.resetWarningCache, p.PropTypes = p, p;
  }, fd;
}
var dd, W1;
function xB() {
  if (W1) return dd;
  W1 = 1;
  var e = /* @__PURE__ */ I0();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, dd = function() {
    function n(o, u, s, c, l, f) {
      if (f !== e) {
        var h = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw h.name = "Invariant Violation", h;
      }
    }
    n.isRequired = n;
    function a() {
      return n;
    }
    var i = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: a,
      element: n,
      elementType: n,
      instanceOf: a,
      node: n,
      objectOf: a,
      oneOf: a,
      oneOfType: a,
      shape: a,
      exact: a,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, dd;
}
var Y1;
function wB() {
  if (Y1) return _o.exports;
  if (Y1 = 1, process.env.NODE_ENV !== "production") {
    var e = XO(), t = !0;
    _o.exports = /* @__PURE__ */ SB()(e.isElement, t);
  } else
    _o.exports = /* @__PURE__ */ xB()();
  return _o.exports;
}
var PB = /* @__PURE__ */ wB();
const Ae = /* @__PURE__ */ xe(PB), { getOwnPropertyNames: IB, getOwnPropertySymbols: CB } = Object, { hasOwnProperty: NB } = Object.prototype;
function Ua(e, t) {
  return function(n, a, i) {
    return e(n, a, i) && t(n, a, i);
  };
}
function Ha(e) {
  return function(r, n, a) {
    if (!r || !n || typeof r != "object" || typeof n != "object")
      return e(r, n, a);
    const { cache: i } = a, o = i.get(r), u = i.get(n);
    if (o && u)
      return o === n && u === r;
    i.set(r, n), i.set(n, r);
    const s = e(r, n, a);
    return i.delete(r), i.delete(n), s;
  };
}
function RB(e) {
  return e?.[Symbol.toStringTag];
}
function z1(e) {
  return IB(e).concat(CB(e));
}
const DB = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((e, t) => NB.call(e, t))
);
function wn(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
const MB = "__v", LB = "__o", kB = "_owner", BB = typeof Float16Array < "u", { getOwnPropertyDescriptor: G1, keys: K1 } = Object;
function jB(e, t) {
  return e.byteLength === t.byteLength && lu(new Uint8Array(e), new Uint8Array(t));
}
function FB(e, t, r) {
  let n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function $B(e, t) {
  return e.byteLength === t.byteLength && lu(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}
function UB(e, t) {
  return wn(e.getTime(), t.getTime());
}
function V1(e, t, r) {
  return e.name === t.name && e.message === t.message && e.stack === t.stack && r.equals(e.cause, t.cause, "cause", "cause", e, t, r);
}
function HB(e, t) {
  return e === t;
}
function X1(e, t, r) {
  const n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  const a = new Array(n), i = e.entries();
  let o, u, s = 0;
  for (; (o = i.next()) && !o.done; ) {
    const c = t.entries();
    let l = !1, f = 0;
    for (; (u = c.next()) && !u.done; ) {
      if (a[f]) {
        f++;
        continue;
      }
      const h = o.value, p = u.value;
      if (r.equals(h[0], p[0], s, f, e, t, r) && r.equals(h[1], p[1], h[0], p[0], e, t, r)) {
        l = a[f] = !0;
        break;
      }
      f++;
    }
    if (!l)
      return !1;
    s++;
  }
  return !0;
}
const qB = wn;
function Q1(e, t, r) {
  const n = K1(e);
  let a = n.length;
  if (K1(t).length !== a)
    return !1;
  for (; a-- > 0; )
    if (!ZO(e, t, r, n[a]))
      return !1;
  return !0;
}
function Dn(e, t, r) {
  const n = z1(e);
  let a = n.length;
  if (z1(t).length !== a)
    return !1;
  let i, o, u;
  for (; a-- > 0; )
    if (i = n[a], !ZO(e, t, r, i) || (o = G1(e, i), u = G1(t, i), (o || u) && (!o || !u || o.configurable !== u.configurable || o.enumerable !== u.enumerable || o.writable !== u.writable)))
      return !1;
  return !0;
}
function WB(e, t) {
  return wn(e.valueOf(), t.valueOf());
}
function YB(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function Z1(e, t, r) {
  const n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  const a = new Array(n), i = e.values();
  let o, u;
  for (; (o = i.next()) && !o.done; ) {
    const s = t.values();
    let c = !1, l = 0;
    for (; (u = s.next()) && !u.done; ) {
      if (!a[l] && r.equals(o.value, u.value, o.value, u.value, e, t, r)) {
        c = a[l] = !0;
        break;
      }
      l++;
    }
    if (!c)
      return !1;
  }
  return !0;
}
function lu(e, t) {
  let r = e.length;
  if (t.length !== r || e.byteOffset !== t.byteOffset)
    return !1;
  if (e instanceof Float64Array || e instanceof Float32Array || BB && e instanceof Float16Array) {
    for (; r-- > 0; )
      if (e[r] !== t[r] && (e[r] === e[r] || t[r] === t[r]))
        return !1;
    return !0;
  }
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function zB(e, t) {
  return e.href === t.href ? !0 : e.protocol === t.protocol && e.username === t.username && e.password === t.password && e.host === t.host && e.pathname === t.pathname && e.hash === t.hash && GB(e.searchParams, t.searchParams);
}
function GB(e, t) {
  const r = e.toString(), n = t.toString();
  return r === n || J1(r) === J1(n);
}
function J1(e) {
  return e.split("&").sort().join("&");
}
function ZO(e, t, r, n) {
  return (n === kB || n === LB || n === MB) && (e.$$typeof || t.$$typeof) ? !0 : DB(t, n) && r.equals(e[n], t[n], n, n, e, t, r);
}
const KB = "[object ArrayBuffer]", VB = "[object Arguments]", XB = "[object Boolean]", QB = "[object DataView]", ZB = "[object Date]", JB = "[object Error]", e5 = "[object Map]", t5 = "[object Number]", r5 = "[object Object]", n5 = "[object RegExp]", a5 = "[object Set]", i5 = "[object String]", o5 = {
  "[object Int8Array]": !0,
  "[object Uint8Array]": !0,
  "[object Uint8ClampedArray]": !0,
  "[object Int16Array]": !0,
  "[object Uint16Array]": !0,
  "[object Int32Array]": !0,
  "[object Uint32Array]": !0,
  "[object Float16Array]": !0,
  "[object Float32Array]": !0,
  "[object Float64Array]": !0,
  "[object BigInt64Array]": !0,
  "[object BigUint64Array]": !0
}, u5 = "[object URL]", s5 = Object.prototype.toString;
function c5({ areArrayBuffersEqual: e, areArraysEqual: t, areDataViewsEqual: r, areDatesEqual: n, areErrorsEqual: a, areFunctionsEqual: i, areMapsEqual: o, areNumbersEqual: u, areObjectsEqual: s, arePrimitiveWrappersEqual: c, areRegExpsEqual: l, areSetsEqual: f, areTypedArraysEqual: h, areUrlsEqual: p, unknownTagComparators: g }) {
  return function(m, E, v) {
    if (m === E)
      return !0;
    if (m == null || E == null)
      return !1;
    const T = typeof m;
    if (T !== typeof E)
      return !1;
    if (T !== "object")
      return T === "number" ? u(m, E, v) : T === "function" ? i(m, E, v) : !1;
    const A = m.constructor;
    if (A !== E.constructor)
      return !1;
    if (A === Object)
      return s(m, E, v);
    if (Array.isArray(m))
      return t(m, E, v);
    if (A === Date)
      return n(m, E, v);
    if (A === RegExp)
      return l(m, E, v);
    if (A === Map)
      return o(m, E, v);
    if (A === Set)
      return f(m, E, v);
    const b = s5.call(m);
    if (b === ZB)
      return n(m, E, v);
    if (b === n5)
      return l(m, E, v);
    if (b === e5)
      return o(m, E, v);
    if (b === a5)
      return f(m, E, v);
    if (b === r5)
      return typeof m.then != "function" && typeof E.then != "function" && s(m, E, v);
    if (b === u5)
      return p(m, E, v);
    if (b === JB)
      return a(m, E, v);
    if (b === VB)
      return s(m, E, v);
    if (o5[b])
      return h(m, E, v);
    if (b === KB)
      return e(m, E, v);
    if (b === QB)
      return r(m, E, v);
    if (b === XB || b === t5 || b === i5)
      return c(m, E, v);
    if (g) {
      let _ = g[b];
      if (!_) {
        const O = RB(m);
        O && (_ = g[O]);
      }
      if (_)
        return _(m, E, v);
    }
    return !1;
  };
}
function l5({ circular: e, createCustomConfig: t, strict: r }) {
  let n = {
    areArrayBuffersEqual: jB,
    areArraysEqual: r ? Dn : FB,
    areDataViewsEqual: $B,
    areDatesEqual: UB,
    // `Error` subclasses routinely carry their own enumerable properties (`status`, `code`, ...),
    // which the error comparator alone does not see, so it is composed with the object comparator.
    // `name` / `message` / `stack` are own but not enumerable, which is why errors need a
    // comparator of their own rather than being treated as plain objects in the first place.
    areErrorsEqual: r ? Ua(V1, Dn) : Ua(V1, Q1),
    areFunctionsEqual: HB,
    areMapsEqual: r ? Ua(X1, Dn) : X1,
    areNumbersEqual: qB,
    areObjectsEqual: r ? Dn : Q1,
    arePrimitiveWrappersEqual: WB,
    areRegExpsEqual: YB,
    areSetsEqual: r ? Ua(Z1, Dn) : Z1,
    areTypedArraysEqual: r ? Ua(lu, Dn) : lu,
    areUrlsEqual: zB,
    unknownTagComparators: void 0
  };
  if (t && (n = Object.assign({}, n, t(n))), e) {
    const a = Ha(n.areArraysEqual), i = Ha(n.areErrorsEqual), o = Ha(n.areMapsEqual), u = Ha(n.areObjectsEqual), s = Ha(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: a,
      areErrorsEqual: i,
      areMapsEqual: o,
      areObjectsEqual: u,
      areSetsEqual: s
    });
  }
  return n;
}
function f5(e) {
  return function(t, r, n, a, i, o, u) {
    return e(t, r, u);
  };
}
function d5({ circular: e, comparator: t, createState: r, equals: n, strict: a }) {
  if (r)
    return function(u, s) {
      const { cache: c = e ? /* @__PURE__ */ new WeakMap() : void 0, meta: l } = r();
      return t(u, s, {
        cache: c,
        equals: n,
        meta: l,
        strict: a
      });
    };
  if (e)
    return function(u, s) {
      return t(u, s, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: n,
        meta: void 0,
        strict: a
      });
    };
  const i = {
    cache: void 0,
    equals: n,
    meta: void 0,
    strict: a
  };
  return function(u, s) {
    return t(u, s, i);
  };
}
const h5 = Xr();
Xr({ strict: !0 });
Xr({ circular: !0 });
Xr({
  circular: !0,
  strict: !0
});
Xr({
  createInternalComparator: () => wn
});
Xr({
  strict: !0,
  createInternalComparator: () => wn
});
Xr({
  circular: !0,
  createInternalComparator: () => wn
});
Xr({
  circular: !0,
  createInternalComparator: () => wn,
  strict: !0
});
function Xr(e = {}) {
  const { circular: t = !1, createInternalComparator: r, createState: n, strict: a = !1 } = e, i = l5(e), o = c5(i), u = r ? r(o) : f5(o);
  return d5({ circular: t, comparator: o, createState: n, equals: u, strict: a });
}
function p5(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function eE(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = -1, n = function a(i) {
    r < 0 && (r = i), i - r > t ? (e(i), r = -1) : p5(a);
  };
  requestAnimationFrame(n);
}
function Fh(e) {
  "@babel/helpers - typeof";
  return Fh = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fh(e);
}
function m5(e) {
  return v5(e) || g5(e) || b5(e) || y5();
}
function y5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function b5(e, t) {
  if (e) {
    if (typeof e == "string") return tE(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return tE(e, t);
  }
}
function tE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function g5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function v5(e) {
  if (Array.isArray(e)) return e;
}
function E5() {
  var e = {}, t = function() {
    return null;
  }, r = !1, n = function a(i) {
    if (!r) {
      if (Array.isArray(i)) {
        if (!i.length)
          return;
        var o = i, u = m5(o), s = u[0], c = u.slice(1);
        if (typeof s == "number") {
          eE(a.bind(null, c), s);
          return;
        }
        a(s), eE(a.bind(null, c));
        return;
      }
      Fh(i) === "object" && (e = i, t(e)), typeof i == "function" && i();
    }
  };
  return {
    stop: function() {
      r = !0;
    },
    start: function(i) {
      r = !1, n(i);
    },
    subscribe: function(i) {
      return t = i, function() {
        t = function() {
          return null;
        };
      };
    }
  };
}
function Di(e) {
  "@babel/helpers - typeof";
  return Di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Di(e);
}
function rE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rE(Object(r), !0).forEach(function(n) {
      JO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function JO(e, t, r) {
  return t = T5(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function T5(e) {
  var t = _5(e, "string");
  return Di(t) === "symbol" ? t : String(t);
}
function _5(e, t) {
  if (Di(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Di(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var A5 = function(t, r) {
  return [Object.keys(t), Object.keys(r)].reduce(function(n, a) {
    return n.filter(function(i) {
      return a.includes(i);
    });
  });
}, O5 = function(t) {
  return t;
}, S5 = function(t) {
  return t.replace(/([A-Z])/g, function(r) {
    return "-".concat(r.toLowerCase());
  });
}, ni = function(t, r) {
  return Object.keys(r).reduce(function(n, a) {
    return nE(nE({}, n), {}, JO({}, a, t(a, r[a])));
  }, {});
}, aE = function(t, r, n) {
  return t.map(function(a) {
    return "".concat(S5(a), " ").concat(r, "ms ").concat(n);
  }).join(",");
}, x5 = process.env.NODE_ENV !== "production", fu = function(t, r, n, a, i, o, u, s) {
  if (x5 && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var c = [n, a, i, o, u, s], l = 0;
      console.warn(r.replace(/%s/g, function() {
        return c[l++];
      }));
    }
};
function w5(e, t) {
  return C5(e) || I5(e, t) || eS(e, t) || P5();
}
function P5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function I5(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function C5(e) {
  if (Array.isArray(e)) return e;
}
function N5(e) {
  return M5(e) || D5(e) || eS(e) || R5();
}
function R5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function eS(e, t) {
  if (e) {
    if (typeof e == "string") return $h(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return $h(e, t);
  }
}
function D5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function M5(e) {
  if (Array.isArray(e)) return $h(e);
}
function $h(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var du = 1e-4, tS = function(t, r) {
  return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
}, rS = function(t, r) {
  return t.map(function(n, a) {
    return n * Math.pow(r, a);
  }).reduce(function(n, a) {
    return n + a;
  });
}, iE = function(t, r) {
  return function(n) {
    var a = tS(t, r);
    return rS(a, n);
  };
}, L5 = function(t, r) {
  return function(n) {
    var a = tS(t, r), i = [].concat(N5(a.map(function(o, u) {
      return o * u;
    }).slice(1)), [0]);
    return rS(i, n);
  };
}, oE = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r[0], i = r[1], o = r[2], u = r[3];
  if (r.length === 1)
    switch (r[0]) {
      case "linear":
        a = 0, i = 0, o = 1, u = 1;
        break;
      case "ease":
        a = 0.25, i = 0.1, o = 0.25, u = 1;
        break;
      case "ease-in":
        a = 0.42, i = 0, o = 1, u = 1;
        break;
      case "ease-out":
        a = 0.42, i = 0, o = 0.58, u = 1;
        break;
      case "ease-in-out":
        a = 0, i = 0, o = 0.58, u = 1;
        break;
      default: {
        var s = r[0].split("(");
        if (s[0] === "cubic-bezier" && s[1].split(")")[0].split(",").length === 4) {
          var c = s[1].split(")")[0].split(",").map(function(m) {
            return parseFloat(m);
          }), l = w5(c, 4);
          a = l[0], i = l[1], o = l[2], u = l[3];
        } else
          fu(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r);
      }
    }
  fu([a, o, i, u].every(function(m) {
    return typeof m == "number" && m >= 0 && m <= 1;
  }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
  var f = iE(a, o), h = iE(i, u), p = L5(a, o), g = function(E) {
    return E > 1 ? 1 : E < 0 ? 0 : E;
  }, y = function(E) {
    for (var v = E > 1 ? 1 : E, T = v, A = 0; A < 8; ++A) {
      var b = f(T) - v, _ = p(T);
      if (Math.abs(b - v) < du || _ < du)
        return h(T);
      T = g(T - b / _);
    }
    return h(T);
  };
  return y.isStepper = !1, y;
}, k5 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, a = t.damping, i = a === void 0 ? 8 : a, o = t.dt, u = o === void 0 ? 17 : o, s = function(l, f, h) {
    var p = -(l - f) * n, g = h * i, y = h + (p - g) * u / 1e3, m = h * u / 1e3 + l;
    return Math.abs(m - f) < du && Math.abs(y) < du ? [f, 0] : [m, y];
  };
  return s.isStepper = !0, s.dt = u, s;
}, B5 = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r[0];
  if (typeof a == "string")
    switch (a) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return oE(a);
      case "spring":
        return k5();
      default:
        if (a.split("(")[0] === "cubic-bezier")
          return oE(a);
        fu(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r);
    }
  return typeof a == "function" ? a : (fu(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null);
};
function Mi(e) {
  "@babel/helpers - typeof";
  return Mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Mi(e);
}
function uE(e) {
  return $5(e) || F5(e) || nS(e) || j5();
}
function j5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function F5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function $5(e) {
  if (Array.isArray(e)) return Hh(e);
}
function sE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sE(Object(r), !0).forEach(function(n) {
      Uh(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Uh(e, t, r) {
  return t = U5(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function U5(e) {
  var t = H5(e, "string");
  return Mi(t) === "symbol" ? t : String(t);
}
function H5(e, t) {
  if (Mi(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Mi(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function q5(e, t) {
  return z5(e) || Y5(e, t) || nS(e, t) || W5();
}
function W5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nS(e, t) {
  if (e) {
    if (typeof e == "string") return Hh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Hh(e, t);
  }
}
function Hh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Y5(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function z5(e) {
  if (Array.isArray(e)) return e;
}
var hu = function(t, r, n) {
  return t + (r - t) * n;
}, qh = function(t) {
  var r = t.from, n = t.to;
  return r !== n;
}, G5 = function e(t, r, n) {
  var a = ni(function(i, o) {
    if (qh(o)) {
      var u = t(o.from, o.to, o.velocity), s = q5(u, 2), c = s[0], l = s[1];
      return tt(tt({}, o), {}, {
        from: c,
        velocity: l
      });
    }
    return o;
  }, r);
  return n < 1 ? ni(function(i, o) {
    return qh(o) ? tt(tt({}, o), {}, {
      velocity: hu(o.velocity, a[i].velocity, n),
      from: hu(o.from, a[i].from, n)
    }) : o;
  }, r) : e(t, a, n - 1);
};
const K5 = (function(e, t, r, n, a) {
  var i = A5(e, t), o = i.reduce(function(m, E) {
    return tt(tt({}, m), {}, Uh({}, E, [e[E], t[E]]));
  }, {}), u = i.reduce(function(m, E) {
    return tt(tt({}, m), {}, Uh({}, E, {
      from: e[E],
      velocity: 0,
      to: t[E]
    }));
  }, {}), s = -1, c, l, f = function() {
    return null;
  }, h = function() {
    return ni(function(E, v) {
      return v.from;
    }, u);
  }, p = function() {
    return !Object.values(u).filter(qh).length;
  }, g = function(E) {
    c || (c = E);
    var v = E - c, T = v / r.dt;
    u = G5(r, u, T), a(tt(tt(tt({}, e), t), h())), c = E, p() || (s = requestAnimationFrame(f));
  }, y = function(E) {
    l || (l = E);
    var v = (E - l) / n, T = ni(function(b, _) {
      return hu.apply(void 0, uE(_).concat([r(v)]));
    }, o);
    if (a(tt(tt(tt({}, e), t), T)), v < 1)
      s = requestAnimationFrame(f);
    else {
      var A = ni(function(b, _) {
        return hu.apply(void 0, uE(_).concat([r(1)]));
      }, o);
      a(tt(tt(tt({}, e), t), A));
    }
  };
  return f = r.isStepper ? g : y, function() {
    return requestAnimationFrame(f), function() {
      cancelAnimationFrame(s);
    };
  };
});
function oa(e) {
  "@babel/helpers - typeof";
  return oa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, oa(e);
}
var V5 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function X5(e, t) {
  if (e == null) return {};
  var r = Q5(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Q5(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function hd(e) {
  return tj(e) || ej(e) || J5(e) || Z5();
}
function Z5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function J5(e, t) {
  if (e) {
    if (typeof e == "string") return Wh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Wh(e, t);
  }
}
function ej(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function tj(e) {
  if (Array.isArray(e)) return Wh(e);
}
function Wh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function cE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ht(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cE(Object(r), !0).forEach(function(n) {
      Ka(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ka(e, t, r) {
  return t = aS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rj(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function nj(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, aS(n.key), n);
  }
}
function aj(e, t, r) {
  return t && nj(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function aS(e) {
  var t = ij(e, "string");
  return oa(t) === "symbol" ? t : String(t);
}
function ij(e, t) {
  if (oa(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (oa(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function oj(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Yh(e, t);
}
function Yh(e, t) {
  return Yh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Yh(e, t);
}
function uj(e) {
  var t = sj();
  return function() {
    var n = pu(e), a;
    if (t) {
      var i = pu(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return zh(this, a);
  };
}
function zh(e, t) {
  if (t && (oa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Gh(e);
}
function Gh(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function sj() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function pu(e) {
  return pu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, pu(e);
}
var Sr = /* @__PURE__ */ (function(e) {
  oj(r, e);
  var t = uj(r);
  function r(n, a) {
    var i;
    rj(this, r), i = t.call(this, n, a);
    var o = i.props, u = o.isActive, s = o.attributeName, c = o.from, l = o.to, f = o.steps, h = o.children, p = o.duration;
    if (i.handleStyleChange = i.handleStyleChange.bind(Gh(i)), i.changeStyle = i.changeStyle.bind(Gh(i)), !u || p <= 0)
      return i.state = {
        style: {}
      }, typeof h == "function" && (i.state = {
        style: l
      }), zh(i);
    if (f && f.length)
      i.state = {
        style: f[0].style
      };
    else if (c) {
      if (typeof h == "function")
        return i.state = {
          style: c
        }, zh(i);
      i.state = {
        style: s ? Ka({}, s, c) : c
      };
    } else
      i.state = {
        style: {}
      };
    return i;
  }
  return aj(r, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.isActive, o = a.canBegin;
      this.mounted = !0, !(!i || !o) && this.runAnimation(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function(a) {
      var i = this.props, o = i.isActive, u = i.canBegin, s = i.attributeName, c = i.shouldReAnimate, l = i.to, f = i.from, h = this.state.style;
      if (u) {
        if (!o) {
          var p = {
            style: s ? Ka({}, s, l) : l
          };
          this.state && h && (s && h[s] !== l || !s && h !== l) && this.setState(p);
          return;
        }
        if (!(h5(a.to, l) && a.canBegin && a.isActive)) {
          var g = !a.canBegin || !a.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var y = g || c ? f : a.to;
          if (this.state && h) {
            var m = {
              style: s ? Ka({}, s, y) : y
            };
            (s && h[s] !== y || !s && h !== y) && this.setState(m);
          }
          this.runAnimation(Ht(Ht({}, this.props), {}, {
            from: y,
            begin: 0
          }));
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.mounted = !1;
      var a = this.props.onAnimationEnd;
      this.unSubscribe && this.unSubscribe(), this.manager && (this.manager.stop(), this.manager = null), this.stopJSAnimation && this.stopJSAnimation(), a && a();
    }
  }, {
    key: "handleStyleChange",
    value: function(a) {
      this.changeStyle(a);
    }
  }, {
    key: "changeStyle",
    value: function(a) {
      this.mounted && this.setState({
        style: a
      });
    }
  }, {
    key: "runJSAnimation",
    value: function(a) {
      var i = this, o = a.from, u = a.to, s = a.duration, c = a.easing, l = a.begin, f = a.onAnimationEnd, h = a.onAnimationStart, p = K5(o, u, B5(c), s, this.changeStyle), g = function() {
        i.stopJSAnimation = p();
      };
      this.manager.start([h, l, g, s, f]);
    }
  }, {
    key: "runStepAnimation",
    value: function(a) {
      var i = this, o = a.steps, u = a.begin, s = a.onAnimationStart, c = o[0], l = c.style, f = c.duration, h = f === void 0 ? 0 : f, p = function(y, m, E) {
        if (E === 0)
          return y;
        var v = m.duration, T = m.easing, A = T === void 0 ? "ease" : T, b = m.style, _ = m.properties, O = m.onAnimationEnd, I = E > 0 ? o[E - 1] : m, N = _ || Object.keys(b);
        if (typeof A == "function" || A === "spring")
          return [].concat(hd(y), [i.runJSAnimation.bind(i, {
            from: I.style,
            to: b,
            duration: v,
            easing: A
          }), v]);
        var j = aE(N, v, A), D = Ht(Ht(Ht({}, I.style), b), {}, {
          transition: j
        });
        return [].concat(hd(y), [D, v, O]).filter(O5);
      };
      return this.manager.start([s].concat(hd(o.reduce(p, [l, Math.max(h, u)])), [a.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(a) {
      this.manager || (this.manager = E5());
      var i = a.begin, o = a.duration, u = a.attributeName, s = a.to, c = a.easing, l = a.onAnimationStart, f = a.onAnimationEnd, h = a.steps, p = a.children, g = this.manager;
      if (this.unSubscribe = g.subscribe(this.handleStyleChange), typeof c == "function" || typeof p == "function" || c === "spring") {
        this.runJSAnimation(a);
        return;
      }
      if (h.length > 1) {
        this.runStepAnimation(a);
        return;
      }
      var y = u ? Ka({}, u, s) : s, m = aE(Object.keys(y), o, c);
      g.start([l, i, Ht(Ht({}, y), {}, {
        transition: m
      }), o, f]);
    }
  }, {
    key: "render",
    value: function() {
      var a = this.props, i = a.children;
      a.begin;
      var o = a.duration;
      a.attributeName, a.easing;
      var u = a.isActive;
      a.steps, a.from, a.to, a.canBegin, a.onAnimationEnd, a.shouldReAnimate, a.onAnimationReStart;
      var s = X5(a, V5), c = $r.count(i), l = this.state.style;
      if (typeof i == "function")
        return i(l);
      if (!u || c === 0 || o <= 0)
        return i;
      var f = function(p) {
        var g = p.props, y = g.style, m = y === void 0 ? {} : y, E = g.className, v = /* @__PURE__ */ Ue(p, Ht(Ht({}, s), {}, {
          style: Ht(Ht({}, m), l),
          className: E
        }));
        return v;
      };
      return c === 1 ? f($r.only(i)) : /* @__PURE__ */ C.createElement("div", null, $r.map(i, function(h) {
        return f(h);
      }));
    }
  }]), r;
})(ir);
Sr.displayName = "Animate";
Sr.defaultProps = {
  begin: 0,
  duration: 1e3,
  from: "",
  to: "",
  attributeName: "",
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  steps: [],
  onAnimationEnd: function() {
  },
  onAnimationStart: function() {
  }
};
Sr.propTypes = {
  from: Ae.oneOfType([Ae.object, Ae.string]),
  to: Ae.oneOfType([Ae.object, Ae.string]),
  attributeName: Ae.string,
  // animation duration
  duration: Ae.number,
  begin: Ae.number,
  easing: Ae.oneOfType([Ae.string, Ae.func]),
  steps: Ae.arrayOf(Ae.shape({
    duration: Ae.number.isRequired,
    style: Ae.object.isRequired,
    easing: Ae.oneOfType([Ae.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), Ae.func]),
    // transition css properties(dash case), optional
    properties: Ae.arrayOf("string"),
    onAnimationEnd: Ae.func
  })),
  children: Ae.oneOfType([Ae.node, Ae.func]),
  isActive: Ae.bool,
  canBegin: Ae.bool,
  onAnimationEnd: Ae.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: Ae.bool,
  onAnimationStart: Ae.func,
  onAnimationReStart: Ae.func
};
function Li(e) {
  "@babel/helpers - typeof";
  return Li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Li(e);
}
function mu() {
  return mu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, mu.apply(this, arguments);
}
function cj(e, t) {
  return hj(e) || dj(e, t) || fj(e, t) || lj();
}
function lj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function fj(e, t) {
  if (e) {
    if (typeof e == "string") return lE(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return lE(e, t);
  }
}
function lE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function dj(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function hj(e) {
  if (Array.isArray(e)) return e;
}
function fE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function dE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fE(Object(r), !0).forEach(function(n) {
      pj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function pj(e, t, r) {
  return t = mj(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function mj(e) {
  var t = yj(e, "string");
  return Li(t) == "symbol" ? t : t + "";
}
function yj(e, t) {
  if (Li(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var hE = function(t, r, n, a, i) {
  var o = Math.min(Math.abs(n) / 2, Math.abs(a) / 2), u = a >= 0 ? 1 : -1, s = n >= 0 ? 1 : -1, c = a >= 0 && n >= 0 || a < 0 && n < 0 ? 1 : 0, l;
  if (o > 0 && i instanceof Array) {
    for (var f = [0, 0, 0, 0], h = 0, p = 4; h < p; h++)
      f[h] = i[h] > o ? o : i[h];
    l = "M".concat(t, ",").concat(r + u * f[0]), f[0] > 0 && (l += "A ".concat(f[0], ",").concat(f[0], ",0,0,").concat(c, ",").concat(t + s * f[0], ",").concat(r)), l += "L ".concat(t + n - s * f[1], ",").concat(r), f[1] > 0 && (l += "A ".concat(f[1], ",").concat(f[1], ",0,0,").concat(c, `,
        `).concat(t + n, ",").concat(r + u * f[1])), l += "L ".concat(t + n, ",").concat(r + a - u * f[2]), f[2] > 0 && (l += "A ".concat(f[2], ",").concat(f[2], ",0,0,").concat(c, `,
        `).concat(t + n - s * f[2], ",").concat(r + a)), l += "L ".concat(t + s * f[3], ",").concat(r + a), f[3] > 0 && (l += "A ".concat(f[3], ",").concat(f[3], ",0,0,").concat(c, `,
        `).concat(t, ",").concat(r + a - u * f[3])), l += "Z";
  } else if (o > 0 && i === +i && i > 0) {
    var g = Math.min(o, i);
    l = "M ".concat(t, ",").concat(r + u * g, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(c, ",").concat(t + s * g, ",").concat(r, `
            L `).concat(t + n - s * g, ",").concat(r, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(c, ",").concat(t + n, ",").concat(r + u * g, `
            L `).concat(t + n, ",").concat(r + a - u * g, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(c, ",").concat(t + n - s * g, ",").concat(r + a, `
            L `).concat(t + s * g, ",").concat(r + a, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(c, ",").concat(t, ",").concat(r + a - u * g, " Z");
  } else
    l = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(a, " h ").concat(-n, " Z");
  return l;
}, bj = function(t, r) {
  if (!t || !r)
    return !1;
  var n = t.x, a = t.y, i = r.x, o = r.y, u = r.width, s = r.height;
  if (Math.abs(u) > 0 && Math.abs(s) > 0) {
    var c = Math.min(i, i + u), l = Math.max(i, i + u), f = Math.min(o, o + s), h = Math.max(o, o + s);
    return n >= c && n <= l && a >= f && a <= h;
  }
  return !1;
}, gj = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, C0 = function(t) {
  var r = dE(dE({}, gj), t), n = ui(), a = ft(-1), i = cj(a, 2), o = i[0], u = i[1];
  Et(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var A = n.current.getTotalLength();
        A && u(A);
      } catch {
      }
  }, []);
  var s = r.x, c = r.y, l = r.width, f = r.height, h = r.radius, p = r.className, g = r.animationEasing, y = r.animationDuration, m = r.animationBegin, E = r.isAnimationActive, v = r.isUpdateAnimationActive;
  if (s !== +s || c !== +c || l !== +l || f !== +f || l === 0 || f === 0)
    return null;
  var T = pe("recharts-rectangle", p);
  return v ? /* @__PURE__ */ C.createElement(Sr, {
    canBegin: o > 0,
    from: {
      width: l,
      height: f,
      x: s,
      y: c
    },
    to: {
      width: l,
      height: f,
      x: s,
      y: c
    },
    duration: y,
    animationEasing: g,
    isActive: v
  }, function(A) {
    var b = A.width, _ = A.height, O = A.x, I = A.y;
    return /* @__PURE__ */ C.createElement(Sr, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: m,
      duration: y,
      isActive: E,
      easing: g
    }, /* @__PURE__ */ C.createElement("path", mu({}, le(r, !0), {
      className: T,
      d: hE(O, I, b, _, h),
      ref: n
    })));
  }) : /* @__PURE__ */ C.createElement("path", mu({}, le(r, !0), {
    className: T,
    d: hE(s, c, l, f, h)
  }));
}, vj = ["points", "className", "baseLinePoints", "connectNulls"];
function $n() {
  return $n = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, $n.apply(this, arguments);
}
function Ej(e, t) {
  if (e == null) return {};
  var r = Tj(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Tj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function pE(e) {
  return Sj(e) || Oj(e) || Aj(e) || _j();
}
function _j() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Aj(e, t) {
  if (e) {
    if (typeof e == "string") return Kh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Kh(e, t);
  }
}
function Oj(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Sj(e) {
  if (Array.isArray(e)) return Kh(e);
}
function Kh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var mE = function(t) {
  return t && t.x === +t.x && t.y === +t.y;
}, xj = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  return t.forEach(function(n) {
    mE(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([]);
  }), mE(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r;
}, ai = function(t, r) {
  var n = xj(t);
  r && (n = [n.reduce(function(i, o) {
    return [].concat(pE(i), pE(o));
  }, [])]);
  var a = n.map(function(i) {
    return i.reduce(function(o, u, s) {
      return "".concat(o).concat(s === 0 ? "M" : "L").concat(u.x, ",").concat(u.y);
    }, "");
  }).join("");
  return n.length === 1 ? "".concat(a, "Z") : a;
}, wj = function(t, r, n) {
  var a = ai(t, n);
  return "".concat(a.slice(-1) === "Z" ? a.slice(0, -1) : a, "L").concat(ai(r.reverse(), n).slice(1));
}, Pj = function(t) {
  var r = t.points, n = t.className, a = t.baseLinePoints, i = t.connectNulls, o = Ej(t, vj);
  if (!r || !r.length)
    return null;
  var u = pe("recharts-polygon", n);
  if (a && a.length) {
    var s = o.stroke && o.stroke !== "none", c = wj(r, a, i);
    return /* @__PURE__ */ C.createElement("g", {
      className: u
    }, /* @__PURE__ */ C.createElement("path", $n({}, le(o, !0), {
      fill: c.slice(-1) === "Z" ? o.fill : "none",
      stroke: "none",
      d: c
    })), s ? /* @__PURE__ */ C.createElement("path", $n({}, le(o, !0), {
      fill: "none",
      d: ai(r, i)
    })) : null, s ? /* @__PURE__ */ C.createElement("path", $n({}, le(o, !0), {
      fill: "none",
      d: ai(a, i)
    })) : null);
  }
  var l = ai(r, i);
  return /* @__PURE__ */ C.createElement("path", $n({}, le(o, !0), {
    fill: l.slice(-1) === "Z" ? o.fill : "none",
    className: u,
    d: l
  }));
};
function Vh() {
  return Vh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Vh.apply(this, arguments);
}
var N0 = function(t) {
  var r = t.cx, n = t.cy, a = t.r, i = t.className, o = pe("recharts-dot", i);
  return r === +r && n === +n && a === +a ? /* @__PURE__ */ Wr.createElement("circle", Vh({}, le(t, !1), ko(t), {
    className: o,
    cx: r,
    cy: n,
    r: a
  })) : null;
};
function ki(e) {
  "@babel/helpers - typeof";
  return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ki(e);
}
var Ij = ["x", "y", "top", "left", "width", "height", "className"];
function Xh() {
  return Xh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Xh.apply(this, arguments);
}
function yE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Cj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yE(Object(r), !0).forEach(function(n) {
      Nj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Nj(e, t, r) {
  return t = Rj(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Rj(e) {
  var t = Dj(e, "string");
  return ki(t) == "symbol" ? t : t + "";
}
function Dj(e, t) {
  if (ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ki(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Mj(e, t) {
  if (e == null) return {};
  var r = Lj(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Lj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var kj = function(t, r, n, a, i, o) {
  return "M".concat(t, ",").concat(i, "v").concat(a, "M").concat(o, ",").concat(r, "h").concat(n);
}, Bj = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, o = t.top, u = o === void 0 ? 0 : o, s = t.left, c = s === void 0 ? 0 : s, l = t.width, f = l === void 0 ? 0 : l, h = t.height, p = h === void 0 ? 0 : h, g = t.className, y = Mj(t, Ij), m = Cj({
    x: n,
    y: i,
    top: u,
    left: c,
    width: f,
    height: p
  }, y);
  return !J(n) || !J(i) || !J(f) || !J(p) || !J(u) || !J(c) ? null : /* @__PURE__ */ C.createElement("path", Xh({}, le(m, !0), {
    className: pe("recharts-cross", g),
    d: kj(n, i, f, p, u, c)
  }));
}, pd, bE;
function jj() {
  if (bE) return pd;
  bE = 1;
  var e = us(), t = bO(), r = ur();
  function n(a, i) {
    return a && a.length ? e(a, r(i, 2), t) : void 0;
  }
  return pd = n, pd;
}
var Fj = jj();
const $j = /* @__PURE__ */ xe(Fj);
var md, gE;
function Uj() {
  if (gE) return md;
  gE = 1;
  var e = us(), t = ur(), r = gO();
  function n(a, i) {
    return a && a.length ? e(a, t(i, 2), r) : void 0;
  }
  return md = n, md;
}
var Hj = Uj();
const qj = /* @__PURE__ */ xe(Hj);
var Wj = ["cx", "cy", "angle", "ticks", "axisLine"], Yj = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function ua(e) {
  "@babel/helpers - typeof";
  return ua = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ua(e);
}
function ii() {
  return ii = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ii.apply(this, arguments);
}
function vE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function en(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vE(Object(r), !0).forEach(function(n) {
      ps(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function EE(e, t) {
  if (e == null) return {};
  var r = zj(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function zj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Gj(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function TE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, oS(n.key), n);
  }
}
function Kj(e, t, r) {
  return t && TE(e.prototype, t), r && TE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Vj(e, t, r) {
  return t = yu(t), Xj(e, iS() ? Reflect.construct(t, r || [], yu(e).constructor) : t.apply(e, r));
}
function Xj(e, t) {
  if (t && (ua(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Qj(e);
}
function Qj(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function iS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (iS = function() {
    return !!e;
  })();
}
function yu(e) {
  return yu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, yu(e);
}
function Zj(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Qh(e, t);
}
function Qh(e, t) {
  return Qh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Qh(e, t);
}
function ps(e, t, r) {
  return t = oS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function oS(e) {
  var t = Jj(e, "string");
  return ua(t) == "symbol" ? t : t + "";
}
function Jj(e, t) {
  if (ua(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ua(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ms = /* @__PURE__ */ (function(e) {
  function t() {
    return Gj(this, t), Vj(this, t, arguments);
  }
  return Zj(t, e), Kj(t, [{
    key: "getTickValueCoord",
    value: (
      /**
       * Calculate the coordinate of tick
       * @param  {Number} coordinate The radius of tick
       * @return {Object} (x, y)
       */
      function(n) {
        var a = n.coordinate, i = this.props, o = i.angle, u = i.cx, s = i.cy;
        return Ne(u, s, a, o);
      }
    )
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props.orientation, a;
      switch (n) {
        case "left":
          a = "end";
          break;
        case "right":
          a = "start";
          break;
        default:
          a = "middle";
          break;
      }
      return a;
    }
  }, {
    key: "getViewBox",
    value: function() {
      var n = this.props, a = n.cx, i = n.cy, o = n.angle, u = n.ticks, s = $j(u, function(l) {
        return l.coordinate || 0;
      }), c = qj(u, function(l) {
        return l.coordinate || 0;
      });
      return {
        cx: a,
        cy: i,
        startAngle: o,
        endAngle: o,
        innerRadius: c.coordinate || 0,
        outerRadius: s.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.cx, i = n.cy, o = n.angle, u = n.ticks, s = n.axisLine, c = EE(n, Wj), l = u.reduce(function(g, y) {
        return [Math.min(g[0], y.coordinate), Math.max(g[1], y.coordinate)];
      }, [1 / 0, -1 / 0]), f = Ne(a, i, l[0], o), h = Ne(a, i, l[1], o), p = en(en(en({}, le(c, !1)), {}, {
        fill: "none"
      }, le(s, !1)), {}, {
        x1: f.x,
        y1: f.y,
        x2: h.x,
        y2: h.y
      });
      return /* @__PURE__ */ C.createElement("line", ii({
        className: "recharts-polar-radius-axis-line"
      }, p));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, a = this.props, i = a.ticks, o = a.tick, u = a.angle, s = a.tickFormatter, c = a.stroke, l = EE(a, Yj), f = this.getTickTextAnchor(), h = le(l, !1), p = le(o, !1), g = i.map(function(y, m) {
        var E = n.getTickValueCoord(y), v = en(en(en(en({
          textAnchor: f,
          transform: "rotate(".concat(90 - u, ", ").concat(E.x, ", ").concat(E.y, ")")
        }, h), {}, {
          stroke: "none",
          fill: c
        }, p), {}, {
          index: m
        }, E), {}, {
          payload: y
        });
        return /* @__PURE__ */ C.createElement(Oe, ii({
          className: pe("recharts-polar-radius-axis-tick", zO(o)),
          key: "tick-".concat(y.coordinate)
        }, bn(n.props, y, m)), t.renderTickItem(o, v, s ? s(y.value, m) : y.value));
      });
      return /* @__PURE__ */ C.createElement(Oe, {
        className: "recharts-polar-radius-axis-ticks"
      }, g);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.ticks, i = n.axisLine, o = n.tick;
      return !a || !a.length ? null : /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-polar-radius-axis", this.props.className)
      }, i && this.renderAxisLine(), o && this.renderTicks(), Qe.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var o;
      return /* @__PURE__ */ C.isValidElement(n) ? o = /* @__PURE__ */ C.cloneElement(n, a) : de(n) ? o = n(a) : o = /* @__PURE__ */ C.createElement(gn, ii({}, a, {
        className: "recharts-polar-radius-axis-tick-value"
      }), i), o;
    }
  }]);
})(ir);
ps(ms, "displayName", "PolarRadiusAxis");
ps(ms, "axisType", "radiusAxis");
ps(ms, "defaultProps", {
  type: "number",
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: "right",
  stroke: "#ccc",
  axisLine: !0,
  tick: !0,
  tickCount: 5,
  allowDataOverflow: !1,
  scale: "auto",
  allowDuplicatedCategory: !0
});
function sa(e) {
  "@babel/helpers - typeof";
  return sa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sa(e);
}
function an() {
  return an = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, an.apply(this, arguments);
}
function _E(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _E(Object(r), !0).forEach(function(n) {
      ys(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _E(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eF(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function AE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, sS(n.key), n);
  }
}
function tF(e, t, r) {
  return t && AE(e.prototype, t), r && AE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function rF(e, t, r) {
  return t = bu(t), nF(e, uS() ? Reflect.construct(t, r || [], bu(e).constructor) : t.apply(e, r));
}
function nF(e, t) {
  if (t && (sa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return aF(e);
}
function aF(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function uS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (uS = function() {
    return !!e;
  })();
}
function bu(e) {
  return bu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, bu(e);
}
function iF(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Zh(e, t);
}
function Zh(e, t) {
  return Zh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Zh(e, t);
}
function ys(e, t, r) {
  return t = sS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sS(e) {
  var t = oF(e, "string");
  return sa(t) == "symbol" ? t : t + "";
}
function oF(e, t) {
  if (sa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (sa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var uF = Math.PI / 180, OE = 1e-5, bs = /* @__PURE__ */ (function(e) {
  function t() {
    return eF(this, t), rF(this, t, arguments);
  }
  return iF(t, e), tF(t, [{
    key: "getTickLineCoord",
    value: (
      /**
       * Calculate the coordinate of line endpoint
       * @param  {Object} data The Data if ticks
       * @return {Object} (x0, y0): The start point of text,
       *                  (x1, y1): The end point close to text,
       *                  (x2, y2): The end point close to axis
       */
      function(n) {
        var a = this.props, i = a.cx, o = a.cy, u = a.radius, s = a.orientation, c = a.tickSize, l = c || 8, f = Ne(i, o, u, n.coordinate), h = Ne(i, o, u + (s === "inner" ? -1 : 1) * l, n.coordinate);
        return {
          x1: f.x,
          y1: f.y,
          x2: h.x,
          y2: h.y
        };
      }
    )
    /**
     * Get the text-anchor of each tick
     * @param  {Object} data Data of ticks
     * @return {String} text-anchor
     */
  }, {
    key: "getTickTextAnchor",
    value: function(n) {
      var a = this.props.orientation, i = Math.cos(-n.coordinate * uF), o;
      return i > OE ? o = a === "outer" ? "start" : "end" : i < -OE ? o = a === "outer" ? "end" : "start" : o = "middle", o;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.cx, i = n.cy, o = n.radius, u = n.axisLine, s = n.axisLineType, c = tn(tn({}, le(this.props, !1)), {}, {
        fill: "none"
      }, le(u, !1));
      if (s === "circle")
        return /* @__PURE__ */ C.createElement(N0, an({
          className: "recharts-polar-angle-axis-line"
        }, c, {
          cx: a,
          cy: i,
          r: o
        }));
      var l = this.props.ticks, f = l.map(function(h) {
        return Ne(a, i, o, h.coordinate);
      });
      return /* @__PURE__ */ C.createElement(Pj, an({
        className: "recharts-polar-angle-axis-line"
      }, c, {
        points: f
      }));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, a = this.props, i = a.ticks, o = a.tick, u = a.tickLine, s = a.tickFormatter, c = a.stroke, l = le(this.props, !1), f = le(o, !1), h = tn(tn({}, l), {}, {
        fill: "none"
      }, le(u, !1)), p = i.map(function(g, y) {
        var m = n.getTickLineCoord(g), E = n.getTickTextAnchor(g), v = tn(tn(tn({
          textAnchor: E
        }, l), {}, {
          stroke: "none",
          fill: c
        }, f), {}, {
          index: y,
          payload: g,
          x: m.x2,
          y: m.y2
        });
        return /* @__PURE__ */ C.createElement(Oe, an({
          className: pe("recharts-polar-angle-axis-tick", zO(o)),
          key: "tick-".concat(g.coordinate)
        }, bn(n.props, g, y)), u && /* @__PURE__ */ C.createElement("line", an({
          className: "recharts-polar-angle-axis-tick-line"
        }, h, m)), o && t.renderTickItem(o, v, s ? s(g.value, y) : g.value));
      });
      return /* @__PURE__ */ C.createElement(Oe, {
        className: "recharts-polar-angle-axis-ticks"
      }, p);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.ticks, i = n.radius, o = n.axisLine;
      return i <= 0 || !a || !a.length ? null : /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-polar-angle-axis", this.props.className)
      }, o && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var o;
      return /* @__PURE__ */ C.isValidElement(n) ? o = /* @__PURE__ */ C.cloneElement(n, a) : de(n) ? o = n(a) : o = /* @__PURE__ */ C.createElement(gn, an({}, a, {
        className: "recharts-polar-angle-axis-tick-value"
      }), i), o;
    }
  }]);
})(ir);
ys(bs, "displayName", "PolarAngleAxis");
ys(bs, "axisType", "angleAxis");
ys(bs, "defaultProps", {
  type: "category",
  angleAxisId: 0,
  scale: "auto",
  cx: 0,
  cy: 0,
  orientation: "outer",
  axisLine: !0,
  tickLine: !0,
  tickSize: 8,
  tick: !0,
  hide: !1,
  allowDuplicatedCategory: !0
});
var yd, SE;
function sF() {
  if (SE) return yd;
  SE = 1;
  var e = bA(), t = e(Object.getPrototypeOf, Object);
  return yd = t, yd;
}
var bd, xE;
function cF() {
  if (xE) return bd;
  xE = 1;
  var e = xr(), t = sF(), r = wr(), n = "[object Object]", a = Function.prototype, i = Object.prototype, o = a.toString, u = i.hasOwnProperty, s = o.call(Object);
  function c(l) {
    if (!r(l) || e(l) != n)
      return !1;
    var f = t(l);
    if (f === null)
      return !0;
    var h = u.call(f, "constructor") && f.constructor;
    return typeof h == "function" && h instanceof h && o.call(h) == s;
  }
  return bd = c, bd;
}
var lF = cF();
const fF = /* @__PURE__ */ xe(lF);
var gd, wE;
function dF() {
  if (wE) return gd;
  wE = 1;
  var e = xr(), t = wr(), r = "[object Boolean]";
  function n(a) {
    return a === !0 || a === !1 || t(a) && e(a) == r;
  }
  return gd = n, gd;
}
var hF = dF();
const pF = /* @__PURE__ */ xe(hF);
function Bi(e) {
  "@babel/helpers - typeof";
  return Bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Bi(e);
}
function gu() {
  return gu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, gu.apply(this, arguments);
}
function mF(e, t) {
  return vF(e) || gF(e, t) || bF(e, t) || yF();
}
function yF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bF(e, t) {
  if (e) {
    if (typeof e == "string") return PE(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return PE(e, t);
  }
}
function PE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function gF(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function vF(e) {
  if (Array.isArray(e)) return e;
}
function IE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function CE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? IE(Object(r), !0).forEach(function(n) {
      EF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : IE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function EF(e, t, r) {
  return t = TF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function TF(e) {
  var t = _F(e, "string");
  return Bi(t) == "symbol" ? t : t + "";
}
function _F(e, t) {
  if (Bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var NE = function(t, r, n, a, i) {
  var o = n - a, u;
  return u = "M ".concat(t, ",").concat(r), u += "L ".concat(t + n, ",").concat(r), u += "L ".concat(t + n - o / 2, ",").concat(r + i), u += "L ".concat(t + n - o / 2 - a, ",").concat(r + i), u += "L ".concat(t, ",").concat(r, " Z"), u;
}, AF = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, OF = function(t) {
  var r = CE(CE({}, AF), t), n = ui(), a = ft(-1), i = mF(a, 2), o = i[0], u = i[1];
  Et(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var T = n.current.getTotalLength();
        T && u(T);
      } catch {
      }
  }, []);
  var s = r.x, c = r.y, l = r.upperWidth, f = r.lowerWidth, h = r.height, p = r.className, g = r.animationEasing, y = r.animationDuration, m = r.animationBegin, E = r.isUpdateAnimationActive;
  if (s !== +s || c !== +c || l !== +l || f !== +f || h !== +h || l === 0 && f === 0 || h === 0)
    return null;
  var v = pe("recharts-trapezoid", p);
  return E ? /* @__PURE__ */ C.createElement(Sr, {
    canBegin: o > 0,
    from: {
      upperWidth: 0,
      lowerWidth: 0,
      height: h,
      x: s,
      y: c
    },
    to: {
      upperWidth: l,
      lowerWidth: f,
      height: h,
      x: s,
      y: c
    },
    duration: y,
    animationEasing: g,
    isActive: E
  }, function(T) {
    var A = T.upperWidth, b = T.lowerWidth, _ = T.height, O = T.x, I = T.y;
    return /* @__PURE__ */ C.createElement(Sr, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: m,
      duration: y,
      easing: g
    }, /* @__PURE__ */ C.createElement("path", gu({}, le(r, !0), {
      className: v,
      d: NE(O, I, A, b, _),
      ref: n
    })));
  }) : /* @__PURE__ */ C.createElement("g", null, /* @__PURE__ */ C.createElement("path", gu({}, le(r, !0), {
    className: v,
    d: NE(s, c, l, f, h)
  })));
}, SF = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function ji(e) {
  "@babel/helpers - typeof";
  return ji = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ji(e);
}
function xF(e, t) {
  if (e == null) return {};
  var r = wF(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function wF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function RE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? RE(Object(r), !0).forEach(function(n) {
      PF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : RE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function PF(e, t, r) {
  return t = IF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function IF(e) {
  var t = CF(e, "string");
  return ji(t) == "symbol" ? t : t + "";
}
function CF(e, t) {
  if (ji(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ji(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function NF(e, t) {
  return vu(vu({}, t), e);
}
function RF(e, t) {
  return e === "symbols";
}
function DE(e) {
  var t = e.shapeType, r = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ C.createElement(C0, r);
    case "trapezoid":
      return /* @__PURE__ */ C.createElement(OF, r);
    case "sector":
      return /* @__PURE__ */ C.createElement(VO, r);
    case "symbols":
      if (RF(t))
        return /* @__PURE__ */ C.createElement(Kp, r);
      break;
    default:
      return null;
  }
}
function DF(e) {
  return /* @__PURE__ */ Lt(e) ? e.props : e;
}
function cS(e) {
  var t = e.option, r = e.shapeType, n = e.propTransformer, a = n === void 0 ? NF : n, i = e.activeClassName, o = i === void 0 ? "recharts-active-shape" : i, u = e.isActive, s = xF(e, SF), c;
  if (/* @__PURE__ */ Lt(t))
    c = /* @__PURE__ */ Ue(t, vu(vu({}, s), DF(t)));
  else if (de(t))
    c = t(s);
  else if (fF(t) && !pF(t)) {
    var l = a(t, s);
    c = /* @__PURE__ */ C.createElement(DE, {
      shapeType: r,
      elementProps: l
    });
  } else {
    var f = s;
    c = /* @__PURE__ */ C.createElement(DE, {
      shapeType: r,
      elementProps: f
    });
  }
  return u ? /* @__PURE__ */ C.createElement(Oe, {
    className: o
  }, c) : c;
}
function gs(e, t) {
  return t != null && "trapezoids" in e.props;
}
function vs(e, t) {
  return t != null && "sectors" in e.props;
}
function Fi(e, t) {
  return t != null && "points" in e.props;
}
function MF(e, t) {
  var r, n, a = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x, i = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return a && i;
}
function LF(e, t) {
  var r = e.endAngle === t.endAngle, n = e.startAngle === t.startAngle;
  return r && n;
}
function kF(e, t) {
  var r = e.x === t.x, n = e.y === t.y, a = e.z === t.z;
  return r && n && a;
}
function BF(e, t) {
  var r;
  return gs(e, t) ? r = MF : vs(e, t) ? r = LF : Fi(e, t) && (r = kF), r;
}
function jF(e, t) {
  var r;
  return gs(e, t) ? r = "trapezoids" : vs(e, t) ? r = "sectors" : Fi(e, t) && (r = "points"), r;
}
function FF(e, t) {
  if (gs(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  if (vs(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  return Fi(e, t) ? t.payload : {};
}
function $F(e) {
  var t = e.activeTooltipItem, r = e.graphicalItem, n = e.itemData, a = jF(r, t), i = FF(r, t), o = n.filter(function(s, c) {
    var l = ls(i, s), f = r.props[a].filter(function(g) {
      var y = BF(r, t);
      return y(g, t);
    }), h = r.props[a].indexOf(f[f.length - 1]), p = c === h;
    return l && p;
  }), u = n.indexOf(o[o.length - 1]);
  return u;
}
var Po;
function ca(e) {
  "@babel/helpers - typeof";
  return ca = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ca(e);
}
function Un() {
  return Un = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Un.apply(this, arguments);
}
function ME(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ie(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ME(Object(r), !0).forEach(function(n) {
      Rt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ME(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function UF(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function LE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, fS(n.key), n);
  }
}
function HF(e, t, r) {
  return t && LE(e.prototype, t), r && LE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function qF(e, t, r) {
  return t = Eu(t), WF(e, lS() ? Reflect.construct(t, r || [], Eu(e).constructor) : t.apply(e, r));
}
function WF(e, t) {
  if (t && (ca(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return YF(e);
}
function YF(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function lS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (lS = function() {
    return !!e;
  })();
}
function Eu(e) {
  return Eu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Eu(e);
}
function zF(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Jh(e, t);
}
function Jh(e, t) {
  return Jh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Jh(e, t);
}
function Rt(e, t, r) {
  return t = fS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fS(e) {
  var t = GF(e, "string");
  return ca(t) == "symbol" ? t : t + "";
}
function GF(e, t) {
  if (ca(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ca(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ir = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return UF(this, t), n = qF(this, t, [r]), Rt(n, "pieRef", null), Rt(n, "sectorRefs", []), Rt(n, "id", Xi("recharts-pie-")), Rt(n, "handleAnimationEnd", function() {
      var a = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), de(a) && a();
    }), Rt(n, "handleAnimationStart", function() {
      var a = n.props.onAnimationStart;
      n.setState({
        isAnimationFinished: !1
      }), de(a) && a();
    }), n.state = {
      isAnimationFinished: !r.isAnimationActive,
      prevIsAnimationActive: r.isAnimationActive,
      prevAnimationId: r.animationId,
      sectorToFocus: 0
    }, n;
  }
  return zF(t, e), HF(t, [{
    key: "isActiveIndex",
    value: function(n) {
      var a = this.props.activeIndex;
      return Array.isArray(a) ? a.indexOf(n) !== -1 : n === a;
    }
  }, {
    key: "hasActiveIndex",
    value: function() {
      var n = this.props.activeIndex;
      return Array.isArray(n) ? n.length !== 0 : n || n === 0;
    }
  }, {
    key: "renderLabels",
    value: function(n) {
      var a = this.props.isAnimationActive;
      if (a && !this.state.isAnimationFinished)
        return null;
      var i = this.props, o = i.label, u = i.labelLine, s = i.dataKey, c = i.valueKey, l = le(this.props, !1), f = le(o, !1), h = le(u, !1), p = o && o.offsetRadius || 20, g = n.map(function(y, m) {
        var E = (y.startAngle + y.endAngle) / 2, v = Ne(y.cx, y.cy, y.outerRadius + p, E), T = Ie(Ie(Ie(Ie({}, l), y), {}, {
          stroke: "none"
        }, f), {}, {
          index: m,
          textAnchor: t.getTextAnchor(v.x, y.cx)
        }, v), A = Ie(Ie(Ie(Ie({}, l), y), {}, {
          fill: "none",
          stroke: y.fill
        }, h), {}, {
          index: m,
          points: [Ne(y.cx, y.cy, y.outerRadius, E), v]
        }), b = s;
        return me(s) && me(c) ? b = "value" : me(s) && (b = c), // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ C.createElement(Oe, {
          key: "label-".concat(y.startAngle, "-").concat(y.endAngle, "-").concat(y.midAngle, "-").concat(m)
        }, u && t.renderLabelLineItem(u, A, "line"), t.renderLabelItem(o, T, ut(y, b)));
      });
      return /* @__PURE__ */ C.createElement(Oe, {
        className: "recharts-pie-labels"
      }, g);
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var a = this, i = this.props, o = i.activeShape, u = i.blendStroke, s = i.inactiveShape;
      return n.map(function(c, l) {
        if (c?.startAngle === 0 && c?.endAngle === 0 && n.length !== 1) return null;
        var f = a.isActiveIndex(l), h = s && a.hasActiveIndex() ? s : null, p = f ? o : h, g = Ie(Ie({}, c), {}, {
          stroke: u ? c.fill : c.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ C.createElement(Oe, Un({
          ref: function(m) {
            m && !a.sectorRefs.includes(m) && a.sectorRefs.push(m);
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, bn(a.props, c, l), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(c?.startAngle, "-").concat(c?.endAngle, "-").concat(c.midAngle, "-").concat(l)
        }), /* @__PURE__ */ C.createElement(cS, Un({
          option: p,
          isActive: f,
          shapeType: "sector"
        }, g)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this, a = this.props, i = a.sectors, o = a.isAnimationActive, u = a.animationBegin, s = a.animationDuration, c = a.animationEasing, l = a.animationId, f = this.state, h = f.prevSectors, p = f.prevIsAnimationActive;
      return /* @__PURE__ */ C.createElement(Sr, {
        begin: u,
        duration: s,
        isActive: o,
        easing: c,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(l, "-").concat(p),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(g) {
        var y = g.t, m = [], E = i && i[0], v = E.startAngle;
        return i.forEach(function(T, A) {
          var b = h && h[A], _ = A > 0 ? xt(T, "paddingAngle", 0) : 0;
          if (b) {
            var O = Mr(b.endAngle - b.startAngle, T.endAngle - T.startAngle), I = Ie(Ie({}, T), {}, {
              startAngle: v + _,
              endAngle: v + O(y) + _
            });
            m.push(I), v = I.endAngle;
          } else {
            var N = T.endAngle, j = T.startAngle, D = Mr(0, N - j), R = D(y), B = Ie(Ie({}, T), {}, {
              startAngle: v + _,
              endAngle: v + R + _
            });
            m.push(B), v = B.endAngle;
          }
        }), /* @__PURE__ */ C.createElement(Oe, null, n.renderSectorsStatically(m));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function(n) {
      var a = this;
      n.onkeydown = function(i) {
        if (!i.altKey)
          switch (i.key) {
            case "ArrowLeft": {
              var o = ++a.state.sectorToFocus % a.sectorRefs.length;
              a.sectorRefs[o].focus(), a.setState({
                sectorToFocus: o
              });
              break;
            }
            case "ArrowRight": {
              var u = --a.state.sectorToFocus < 0 ? a.sectorRefs.length - 1 : a.state.sectorToFocus % a.sectorRefs.length;
              a.sectorRefs[u].focus(), a.setState({
                sectorToFocus: u
              });
              break;
            }
            case "Escape": {
              a.sectorRefs[a.state.sectorToFocus].blur(), a.setState({
                sectorToFocus: 0
              });
              break;
            }
          }
      };
    }
  }, {
    key: "renderSectors",
    value: function() {
      var n = this.props, a = n.sectors, i = n.isAnimationActive, o = this.state.prevSectors;
      return i && a && a.length && (!o || !ls(o, a)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(a);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      this.pieRef && this.attachKeyboardHandlers(this.pieRef);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.hide, o = a.sectors, u = a.className, s = a.label, c = a.cx, l = a.cy, f = a.innerRadius, h = a.outerRadius, p = a.isAnimationActive, g = this.state.isAnimationFinished;
      if (i || !o || !o.length || !J(c) || !J(l) || !J(f) || !J(h))
        return null;
      var y = pe("recharts-pie", u);
      return /* @__PURE__ */ C.createElement(Oe, {
        tabIndex: this.props.rootTabIndex,
        className: y,
        ref: function(E) {
          n.pieRef = E;
        }
      }, this.renderSectors(), s && this.renderLabels(o), Qe.renderCallByParent(this.props, null, !1), (!p || g) && Gt.renderCallByParent(this.props, o, !1));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, a) {
      return a.prevIsAnimationActive !== n.isAnimationActive ? {
        prevIsAnimationActive: n.isAnimationActive,
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: [],
        isAnimationFinished: !0
      } : n.isAnimationActive && n.animationId !== a.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: a.curSectors,
        isAnimationFinished: !0
      } : n.sectors !== a.curSectors ? {
        curSectors: n.sectors,
        isAnimationFinished: !0
      } : null;
    }
  }, {
    key: "getTextAnchor",
    value: function(n, a) {
      return n > a ? "start" : n < a ? "end" : "middle";
    }
  }, {
    key: "renderLabelLineItem",
    value: function(n, a, i) {
      if (/* @__PURE__ */ C.isValidElement(n))
        return /* @__PURE__ */ C.cloneElement(n, a);
      if (de(n))
        return n(a);
      var o = pe("recharts-pie-label-line", typeof n != "boolean" ? n.className : "");
      return /* @__PURE__ */ C.createElement(jh, Un({}, a, {
        key: i,
        type: "linear",
        className: o
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function(n, a, i) {
      if (/* @__PURE__ */ C.isValidElement(n))
        return /* @__PURE__ */ C.cloneElement(n, a);
      var o = i;
      if (de(n) && (o = n(a), /* @__PURE__ */ C.isValidElement(o)))
        return o;
      var u = pe("recharts-pie-label-text", typeof n != "boolean" && !de(n) ? n.className : "");
      return /* @__PURE__ */ C.createElement(gn, Un({}, a, {
        alignmentBaseline: "middle",
        className: u
      }), o);
    }
  }]);
})(ir);
Po = Ir;
Rt(Ir, "displayName", "Pie");
Rt(Ir, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: !0,
  hide: !1,
  minAngle: 0,
  isAnimationActive: !xa.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: !1,
  rootTabIndex: 0
});
Rt(Ir, "parseDeltaAngle", function(e, t) {
  var r = dt(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
});
Rt(Ir, "getRealPieData", function(e) {
  var t = e.data, r = e.children, n = le(e, !1), a = jt(r, es);
  return t && t.length ? t.map(function(i, o) {
    return Ie(Ie(Ie({
      payload: i
    }, n), i), a && a[o] && a[o].props);
  }) : a && a.length ? a.map(function(i) {
    return Ie(Ie({}, n), i.props);
  }) : [];
});
Rt(Ir, "parseCoordinateOfPie", function(e, t) {
  var r = t.top, n = t.left, a = t.width, i = t.height, o = YO(a, i), u = n + ht(e.cx, a, a / 2), s = r + ht(e.cy, i, i / 2), c = ht(e.innerRadius, o, 0), l = ht(e.outerRadius, o, o * 0.8), f = e.maxRadius || Math.sqrt(a * a + i * i) / 2;
  return {
    cx: u,
    cy: s,
    innerRadius: c,
    outerRadius: l,
    maxRadius: f
  };
});
Rt(Ir, "getComposedData", function(e) {
  var t = e.item, r = e.offset, n = t.type.defaultProps !== void 0 ? Ie(Ie({}, t.type.defaultProps), t.props) : t.props, a = Po.getRealPieData(n);
  if (!a || !a.length)
    return null;
  var i = n.cornerRadius, o = n.startAngle, u = n.endAngle, s = n.paddingAngle, c = n.dataKey, l = n.nameKey, f = n.valueKey, h = n.tooltipType, p = Math.abs(n.minAngle), g = Po.parseCoordinateOfPie(n, r), y = Po.parseDeltaAngle(o, u), m = Math.abs(y), E = c;
  me(c) && me(f) ? (zt(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), E = "value") : me(c) && (zt(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), E = f);
  var v = a.filter(function(I) {
    return ut(I, E, 0) !== 0;
  }).length, T = (m >= 360 ? v : v - 1) * s, A = m - v * p - T, b = a.reduce(function(I, N) {
    var j = ut(N, E, 0);
    return I + (J(j) ? j : 0);
  }, 0), _;
  if (b > 0) {
    var O;
    _ = a.map(function(I, N) {
      var j = ut(I, E, 0), D = ut(I, l, N), R = (J(j) ? j : 0) / b, B;
      N ? B = O.endAngle + dt(y) * s * (j !== 0 ? 1 : 0) : B = o;
      var F = B + dt(y) * ((j !== 0 ? p : 0) + R * A), $ = (B + F) / 2, q = (g.innerRadius + g.outerRadius) / 2, Y = [{
        name: D,
        value: j,
        payload: I,
        dataKey: E,
        type: h
      }], Q = Ne(g.cx, g.cy, q, $);
      return O = Ie(Ie(Ie({
        percent: R,
        cornerRadius: i,
        name: D,
        tooltipPayload: Y,
        midAngle: $,
        middleRadius: q,
        tooltipPosition: Q
      }, I), g), {}, {
        value: ut(I, E),
        startAngle: B,
        endAngle: F,
        payload: I,
        paddingAngle: dt(y) * s
      }), O;
    });
  }
  return Ie(Ie({}, g), {}, {
    sectors: _,
    data: a
  });
});
var vd, kE;
function KF() {
  if (kE) return vd;
  kE = 1;
  var e = Math.ceil, t = Math.max;
  function r(n, a, i, o) {
    for (var u = -1, s = t(e((a - n) / (i || 1)), 0), c = Array(s); s--; )
      c[o ? s : ++u] = n, n += i;
    return c;
  }
  return vd = r, vd;
}
var Ed, BE;
function dS() {
  if (BE) return Ed;
  BE = 1;
  var e = DA(), t = 1 / 0, r = 17976931348623157e292;
  function n(a) {
    if (!a)
      return a === 0 ? a : 0;
    if (a = e(a), a === t || a === -t) {
      var i = a < 0 ? -1 : 1;
      return i * r;
    }
    return a === a ? a : 0;
  }
  return Ed = n, Ed;
}
var Td, jE;
function VF() {
  if (jE) return Td;
  jE = 1;
  var e = KF(), t = Ju(), r = dS();
  function n(a) {
    return function(i, o, u) {
      return u && typeof u != "number" && t(i, o, u) && (o = u = void 0), i = r(i), o === void 0 ? (o = i, i = 0) : o = r(o), u = u === void 0 ? i < o ? 1 : -1 : r(u), e(i, o, u, a);
    };
  }
  return Td = n, Td;
}
var _d, FE;
function XF() {
  if (FE) return _d;
  FE = 1;
  var e = VF(), t = e();
  return _d = t, _d;
}
var QF = XF();
const Tu = /* @__PURE__ */ xe(QF);
function $i(e) {
  "@babel/helpers - typeof";
  return $i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $i(e);
}
function $E(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function UE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $E(Object(r), !0).forEach(function(n) {
      hS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $E(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hS(e, t, r) {
  return t = ZF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ZF(e) {
  var t = JF(e, "string");
  return $i(t) == "symbol" ? t : t + "";
}
function JF(e, t) {
  if ($i(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if ($i(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var e9 = ["Webkit", "Moz", "O", "ms"], t9 = function(t, r) {
  var n = t.replace(/(\w)/, function(i) {
    return i.toUpperCase();
  }), a = e9.reduce(function(i, o) {
    return UE(UE({}, i), {}, hS({}, o + n, r));
  }, {});
  return a[t] = r, a;
};
function la(e) {
  "@babel/helpers - typeof";
  return la = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, la(e);
}
function _u() {
  return _u = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, _u.apply(this, arguments);
}
function HE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ad(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? HE(Object(r), !0).forEach(function(n) {
      _t(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : HE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function r9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function qE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, mS(n.key), n);
  }
}
function n9(e, t, r) {
  return t && qE(e.prototype, t), r && qE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function a9(e, t, r) {
  return t = Au(t), i9(e, pS() ? Reflect.construct(t, r || [], Au(e).constructor) : t.apply(e, r));
}
function i9(e, t) {
  if (t && (la(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return o9(e);
}
function o9(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function pS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (pS = function() {
    return !!e;
  })();
}
function Au(e) {
  return Au = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Au(e);
}
function u9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ep(e, t);
}
function ep(e, t) {
  return ep = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ep(e, t);
}
function _t(e, t, r) {
  return t = mS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function mS(e) {
  var t = s9(e, "string");
  return la(t) == "symbol" ? t : t + "";
}
function s9(e, t) {
  if (la(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (la(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var c9 = function(t) {
  var r = t.data, n = t.startIndex, a = t.endIndex, i = t.x, o = t.width, u = t.travellerWidth;
  if (!r || !r.length)
    return {};
  var s = r.length, c = ti().domain(Tu(0, s)).range([i, i + o - u]), l = c.domain().map(function(f) {
    return c(f);
  });
  return {
    isTextActive: !1,
    isSlideMoving: !1,
    isTravellerMoving: !1,
    isTravellerFocused: !1,
    startX: c(n),
    endX: c(a),
    scale: c,
    scaleValues: l
  };
}, WE = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, fa = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return r9(this, t), n = a9(this, t, [r]), _t(n, "handleDrag", function(a) {
      n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(a) : n.state.isSlideMoving && n.handleSlideDrag(a);
    }), _t(n, "handleTouchMove", function(a) {
      a.changedTouches != null && a.changedTouches.length > 0 && n.handleDrag(a.changedTouches[0]);
    }), _t(n, "handleDragEnd", function() {
      n.setState({
        isTravellerMoving: !1,
        isSlideMoving: !1
      }, function() {
        var a = n.props, i = a.endIndex, o = a.onDragEnd, u = a.startIndex;
        o?.({
          endIndex: i,
          startIndex: u
        });
      }), n.detachDragEndListener();
    }), _t(n, "handleLeaveWrapper", function() {
      (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut));
    }), _t(n, "handleEnterSlideOrTraveller", function() {
      n.setState({
        isTextActive: !0
      });
    }), _t(n, "handleLeaveSlideOrTraveller", function() {
      n.setState({
        isTextActive: !1
      });
    }), _t(n, "handleSlideDragStart", function(a) {
      var i = WE(a) ? a.changedTouches[0] : a;
      n.setState({
        isTravellerMoving: !1,
        isSlideMoving: !0,
        slideMoveStartX: i.pageX
      }), n.attachDragEndListener();
    }), n.travellerDragStartHandlers = {
      startX: n.handleTravellerDragStart.bind(n, "startX"),
      endX: n.handleTravellerDragStart.bind(n, "endX")
    }, n.state = {}, n;
  }
  return u9(t, e), n9(t, [{
    key: "componentWillUnmount",
    value: function() {
      this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
    }
  }, {
    key: "getIndex",
    value: function(n) {
      var a = n.startX, i = n.endX, o = this.state.scaleValues, u = this.props, s = u.gap, c = u.data, l = c.length - 1, f = Math.min(a, i), h = Math.max(a, i), p = t.getIndexInRange(o, f), g = t.getIndexInRange(o, h);
      return {
        startIndex: p - p % s,
        endIndex: g === l ? l : g - g % s
      };
    }
  }, {
    key: "getTextOfTick",
    value: function(n) {
      var a = this.props, i = a.data, o = a.tickFormatter, u = a.dataKey, s = ut(i[n], u, n);
      return de(o) ? o(s, n) : s;
    }
  }, {
    key: "attachDragEndListener",
    value: function() {
      window.addEventListener("mouseup", this.handleDragEnd, !0), window.addEventListener("touchend", this.handleDragEnd, !0), window.addEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "detachDragEndListener",
    value: function() {
      window.removeEventListener("mouseup", this.handleDragEnd, !0), window.removeEventListener("touchend", this.handleDragEnd, !0), window.removeEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "handleSlideDrag",
    value: function(n) {
      var a = this.state, i = a.slideMoveStartX, o = a.startX, u = a.endX, s = this.props, c = s.x, l = s.width, f = s.travellerWidth, h = s.startIndex, p = s.endIndex, g = s.onChange, y = n.pageX - i;
      y > 0 ? y = Math.min(y, c + l - f - u, c + l - f - o) : y < 0 && (y = Math.max(y, c - o, c - u));
      var m = this.getIndex({
        startX: o + y,
        endX: u + y
      });
      (m.startIndex !== h || m.endIndex !== p) && g && g(m), this.setState({
        startX: o + y,
        endX: u + y,
        slideMoveStartX: n.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function(n, a) {
      var i = WE(a) ? a.changedTouches[0] : a;
      this.setState({
        isSlideMoving: !1,
        isTravellerMoving: !0,
        movingTravellerId: n,
        brushMoveStartX: i.pageX
      }), this.attachDragEndListener();
    }
  }, {
    key: "handleTravellerMove",
    value: function(n) {
      var a = this.state, i = a.brushMoveStartX, o = a.movingTravellerId, u = a.endX, s = a.startX, c = this.state[o], l = this.props, f = l.x, h = l.width, p = l.travellerWidth, g = l.onChange, y = l.gap, m = l.data, E = {
        startX: this.state.startX,
        endX: this.state.endX
      }, v = n.pageX - i;
      v > 0 ? v = Math.min(v, f + h - p - c) : v < 0 && (v = Math.max(v, f - c)), E[o] = c + v;
      var T = this.getIndex(E), A = T.startIndex, b = T.endIndex, _ = function() {
        var I = m.length - 1;
        return o === "startX" && (u > s ? A % y === 0 : b % y === 0) || u < s && b === I || o === "endX" && (u > s ? b % y === 0 : A % y === 0) || u > s && b === I;
      };
      this.setState(_t(_t({}, o, c + v), "brushMoveStartX", n.pageX), function() {
        g && _() && g(T);
      });
    }
  }, {
    key: "handleTravellerMoveKeyboard",
    value: function(n, a) {
      var i = this, o = this.state, u = o.scaleValues, s = o.startX, c = o.endX, l = this.state[a], f = u.indexOf(l);
      if (f !== -1) {
        var h = f + n;
        if (!(h === -1 || h >= u.length)) {
          var p = u[h];
          a === "startX" && p >= c || a === "endX" && p <= s || this.setState(_t({}, a, p), function() {
            i.props.onChange(i.getIndex({
              startX: i.state.startX,
              endX: i.state.endX
            }));
          });
        }
      }
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this.props, a = n.x, i = n.y, o = n.width, u = n.height, s = n.fill, c = n.stroke;
      return /* @__PURE__ */ C.createElement("rect", {
        stroke: c,
        fill: s,
        x: a,
        y: i,
        width: o,
        height: u
      });
    }
  }, {
    key: "renderPanorama",
    value: function() {
      var n = this.props, a = n.x, i = n.y, o = n.width, u = n.height, s = n.data, c = n.children, l = n.padding, f = $r.only(c);
      return f ? /* @__PURE__ */ C.cloneElement(f, {
        x: a,
        y: i,
        width: o,
        height: u,
        margin: l,
        compact: !0,
        data: s
      }) : null;
    }
  }, {
    key: "renderTravellerLayer",
    value: function(n, a) {
      var i, o, u = this, s = this.props, c = s.y, l = s.travellerWidth, f = s.height, h = s.traveller, p = s.ariaLabel, g = s.data, y = s.startIndex, m = s.endIndex, E = Math.max(n, this.props.x), v = Ad(Ad({}, le(this.props, !1)), {}, {
        x: E,
        y: c,
        width: l,
        height: f
      }), T = p || "Min value: ".concat((i = g[y]) === null || i === void 0 ? void 0 : i.name, ", Max value: ").concat((o = g[m]) === null || o === void 0 ? void 0 : o.name);
      return /* @__PURE__ */ C.createElement(Oe, {
        tabIndex: 0,
        role: "slider",
        "aria-label": T,
        "aria-valuenow": n,
        className: "recharts-brush-traveller",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.travellerDragStartHandlers[a],
        onTouchStart: this.travellerDragStartHandlers[a],
        onKeyDown: function(b) {
          ["ArrowLeft", "ArrowRight"].includes(b.key) && (b.preventDefault(), b.stopPropagation(), u.handleTravellerMoveKeyboard(b.key === "ArrowRight" ? 1 : -1, a));
        },
        onFocus: function() {
          u.setState({
            isTravellerFocused: !0
          });
        },
        onBlur: function() {
          u.setState({
            isTravellerFocused: !1
          });
        },
        style: {
          cursor: "col-resize"
        }
      }, t.renderTraveller(h, v));
    }
  }, {
    key: "renderSlide",
    value: function(n, a) {
      var i = this.props, o = i.y, u = i.height, s = i.stroke, c = i.travellerWidth, l = Math.min(n, a) + c, f = Math.max(Math.abs(a - n) - c, 0);
      return /* @__PURE__ */ C.createElement("rect", {
        className: "recharts-brush-slide",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.handleSlideDragStart,
        onTouchStart: this.handleSlideDragStart,
        style: {
          cursor: "move"
        },
        stroke: "none",
        fill: s,
        fillOpacity: 0.2,
        x: l,
        y: o,
        width: f,
        height: u
      });
    }
  }, {
    key: "renderText",
    value: function() {
      var n = this.props, a = n.startIndex, i = n.endIndex, o = n.y, u = n.height, s = n.travellerWidth, c = n.stroke, l = this.state, f = l.startX, h = l.endX, p = 5, g = {
        pointerEvents: "none",
        fill: c
      };
      return /* @__PURE__ */ C.createElement(Oe, {
        className: "recharts-brush-texts"
      }, /* @__PURE__ */ C.createElement(gn, _u({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(f, h) - p,
        y: o + u / 2
      }, g), this.getTextOfTick(a)), /* @__PURE__ */ C.createElement(gn, _u({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(f, h) + s + p,
        y: o + u / 2
      }, g), this.getTextOfTick(i)));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.data, i = n.className, o = n.children, u = n.x, s = n.y, c = n.width, l = n.height, f = n.alwaysShowText, h = this.state, p = h.startX, g = h.endX, y = h.isTextActive, m = h.isSlideMoving, E = h.isTravellerMoving, v = h.isTravellerFocused;
      if (!a || !a.length || !J(u) || !J(s) || !J(c) || !J(l) || c <= 0 || l <= 0)
        return null;
      var T = pe("recharts-brush", i), A = C.Children.count(o) === 1, b = t9("userSelect", "none");
      return /* @__PURE__ */ C.createElement(Oe, {
        className: T,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: b
      }, this.renderBackground(), A && this.renderPanorama(), this.renderSlide(p, g), this.renderTravellerLayer(p, "startX"), this.renderTravellerLayer(g, "endX"), (y || m || E || v || f) && this.renderText());
    }
  }], [{
    key: "renderDefaultTraveller",
    value: function(n) {
      var a = n.x, i = n.y, o = n.width, u = n.height, s = n.stroke, c = Math.floor(i + u / 2) - 1;
      return /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("rect", {
        x: a,
        y: i,
        width: o,
        height: u,
        fill: s,
        stroke: "none"
      }), /* @__PURE__ */ C.createElement("line", {
        x1: a + 1,
        y1: c,
        x2: a + o - 1,
        y2: c,
        fill: "none",
        stroke: "#fff"
      }), /* @__PURE__ */ C.createElement("line", {
        x1: a + 1,
        y1: c + 2,
        x2: a + o - 1,
        y2: c + 2,
        fill: "none",
        stroke: "#fff"
      }));
    }
  }, {
    key: "renderTraveller",
    value: function(n, a) {
      var i;
      return /* @__PURE__ */ C.isValidElement(n) ? i = /* @__PURE__ */ C.cloneElement(n, a) : de(n) ? i = n(a) : i = t.renderDefaultTraveller(a), i;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(n, a) {
      var i = n.data, o = n.width, u = n.x, s = n.travellerWidth, c = n.updateId, l = n.startIndex, f = n.endIndex;
      if (i !== a.prevData || c !== a.prevUpdateId)
        return Ad({
          prevData: i,
          prevTravellerWidth: s,
          prevUpdateId: c,
          prevX: u,
          prevWidth: o
        }, i && i.length ? c9({
          data: i,
          width: o,
          x: u,
          travellerWidth: s,
          startIndex: l,
          endIndex: f
        }) : {
          scale: null,
          scaleValues: null
        });
      if (a.scale && (o !== a.prevWidth || u !== a.prevX || s !== a.prevTravellerWidth)) {
        a.scale.range([u, u + o - s]);
        var h = a.scale.domain().map(function(p) {
          return a.scale(p);
        });
        return {
          prevData: i,
          prevTravellerWidth: s,
          prevUpdateId: c,
          prevX: u,
          prevWidth: o,
          startX: a.scale(n.startIndex),
          endX: a.scale(n.endIndex),
          scaleValues: h
        };
      }
      return null;
    }
  }, {
    key: "getIndexInRange",
    value: function(n, a) {
      for (var i = n.length, o = 0, u = i - 1; u - o > 1; ) {
        var s = Math.floor((o + u) / 2);
        n[s] > a ? u = s : o = s;
      }
      return a >= n[u] ? u : o;
    }
  }]);
})(ir);
_t(fa, "displayName", "Brush");
_t(fa, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1e3,
  alwaysShowText: !1
});
var Od, YE;
function l9() {
  if (YE) return Od;
  YE = 1;
  var e = t0();
  function t(r, n) {
    var a;
    return e(r, function(i, o, u) {
      return a = n(i, o, u), !a;
    }), !!a;
  }
  return Od = t, Od;
}
var Sd, zE;
function f9() {
  if (zE) return Sd;
  zE = 1;
  var e = lA(), t = ur(), r = l9(), n = Tt(), a = Ju();
  function i(o, u, s) {
    var c = n(o) ? e : r;
    return s && a(o, u, s) && (u = void 0), c(o, t(u, 3));
  }
  return Sd = i, Sd;
}
var d9 = f9();
const h9 = /* @__PURE__ */ xe(d9);
var nr = function(t, r) {
  var n = t.alwaysShow, a = t.ifOverflow;
  return n && (a = "extendDomain"), a === r;
}, xd, GE;
function p9() {
  if (GE) return xd;
  GE = 1;
  var e = PA();
  function t(r, n, a) {
    n == "__proto__" && e ? e(r, n, {
      configurable: !0,
      enumerable: !0,
      value: a,
      writable: !0
    }) : r[n] = a;
  }
  return xd = t, xd;
}
var wd, KE;
function m9() {
  if (KE) return wd;
  KE = 1;
  var e = p9(), t = xA(), r = ur();
  function n(a, i) {
    var o = {};
    return i = r(i, 3), t(a, function(u, s, c) {
      e(o, s, i(u, s, c));
    }), o;
  }
  return wd = n, wd;
}
var y9 = m9();
const b9 = /* @__PURE__ */ xe(y9);
var Pd, VE;
function g9() {
  if (VE) return Pd;
  VE = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length; ++n < a; )
      if (!r(t[n], n, t))
        return !1;
    return !0;
  }
  return Pd = e, Pd;
}
var Id, XE;
function v9() {
  if (XE) return Id;
  XE = 1;
  var e = t0();
  function t(r, n) {
    var a = !0;
    return e(r, function(i, o, u) {
      return a = !!n(i, o, u), a;
    }), a;
  }
  return Id = t, Id;
}
var Cd, QE;
function E9() {
  if (QE) return Cd;
  QE = 1;
  var e = g9(), t = v9(), r = ur(), n = Tt(), a = Ju();
  function i(o, u, s) {
    var c = n(o) ? e : t;
    return s && a(o, u, s) && (u = void 0), c(o, r(u, 3));
  }
  return Cd = i, Cd;
}
var T9 = E9();
const yS = /* @__PURE__ */ xe(T9);
var _9 = ["x", "y"];
function da(e) {
  "@babel/helpers - typeof";
  return da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, da(e);
}
function tp() {
  return tp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, tp.apply(this, arguments);
}
function ZE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ZE(Object(r), !0).forEach(function(n) {
      A9(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ZE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function A9(e, t, r) {
  return t = O9(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function O9(e) {
  var t = S9(e, "string");
  return da(t) == "symbol" ? t : t + "";
}
function S9(e, t) {
  if (da(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (da(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function x9(e, t) {
  if (e == null) return {};
  var r = w9(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function w9(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function P9(e, t) {
  var r = e.x, n = e.y, a = x9(e, _9), i = "".concat(r), o = parseInt(i, 10), u = "".concat(n), s = parseInt(u, 10), c = "".concat(t.height || a.height), l = parseInt(c, 10), f = "".concat(t.width || a.width), h = parseInt(f, 10);
  return qa(qa(qa(qa(qa({}, t), a), o ? {
    x: o
  } : {}), s ? {
    y: s
  } : {}), {}, {
    height: l,
    width: h,
    name: t.name,
    radius: t.radius
  });
}
function JE(e) {
  return /* @__PURE__ */ C.createElement(cS, tp({
    shapeType: "rectangle",
    propTransformer: P9,
    activeClassName: "recharts-active-bar"
  }, e));
}
var I9 = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, a) {
    if (typeof t == "number") return t;
    var i = J(n) || WN(n);
    return i ? t(n, a) : (i || (process.env.NODE_ENV !== "production" ? vt(!1, "minPointSize callback function received a value with type of ".concat(da(n), ". Currently only numbers or null/undefined are supported.")) : vt()), r);
  };
}, C9 = ["value", "background"], bS;
function ha(e) {
  "@babel/helpers - typeof";
  return ha = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ha(e);
}
function N9(e, t) {
  if (e == null) return {};
  var r = R9(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function R9(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Ou() {
  return Ou = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ou.apply(this, arguments);
}
function eT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eT(Object(r), !0).forEach(function(n) {
      jr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function D9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function tT(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, vS(n.key), n);
  }
}
function M9(e, t, r) {
  return t && tT(e.prototype, t), r && tT(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function L9(e, t, r) {
  return t = Su(t), k9(e, gS() ? Reflect.construct(t, r || [], Su(e).constructor) : t.apply(e, r));
}
function k9(e, t) {
  if (t && (ha(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return B9(e);
}
function B9(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function gS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (gS = function() {
    return !!e;
  })();
}
function Su(e) {
  return Su = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Su(e);
}
function j9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && rp(e, t);
}
function rp(e, t) {
  return rp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, rp(e, t);
}
function jr(e, t, r) {
  return t = vS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vS(e) {
  var t = F9(e, "string");
  return ha(t) == "symbol" ? t : t + "";
}
function F9(e, t) {
  if (ha(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ha(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var sr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    D9(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = L9(this, t, [].concat(a)), jr(r, "state", {
      isAnimationFinished: !1
    }), jr(r, "id", Xi("recharts-bar-")), jr(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), o && o();
    }), jr(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), o && o();
    }), r;
  }
  return j9(t, e), M9(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var a = this, i = this.props, o = i.shape, u = i.dataKey, s = i.activeIndex, c = i.activeBar, l = le(this.props, !1);
      return n && n.map(function(f, h) {
        var p = h === s, g = p ? c : o, y = $e($e($e({}, l), f), {}, {
          isActive: p,
          option: g,
          index: h,
          dataKey: u,
          onAnimationStart: a.handleAnimationStart,
          onAnimationEnd: a.handleAnimationEnd
        });
        return /* @__PURE__ */ C.createElement(Oe, Ou({
          className: "recharts-bar-rectangle"
        }, bn(a.props, f, h), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(f?.x, "-").concat(f?.y, "-").concat(f?.value, "-").concat(h)
        }), /* @__PURE__ */ C.createElement(JE, y));
      });
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var n = this, a = this.props, i = a.data, o = a.layout, u = a.isAnimationActive, s = a.animationBegin, c = a.animationDuration, l = a.animationEasing, f = a.animationId, h = this.state.prevData;
      return /* @__PURE__ */ C.createElement(Sr, {
        begin: s,
        duration: c,
        isActive: u,
        easing: l,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "bar-".concat(f),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(p) {
        var g = p.t, y = i.map(function(m, E) {
          var v = h && h[E];
          if (v) {
            var T = Mr(v.x, m.x), A = Mr(v.y, m.y), b = Mr(v.width, m.width), _ = Mr(v.height, m.height);
            return $e($e({}, m), {}, {
              x: T(g),
              y: A(g),
              width: b(g),
              height: _(g)
            });
          }
          if (o === "horizontal") {
            var O = Mr(0, m.height), I = O(g);
            return $e($e({}, m), {}, {
              y: m.y + m.height - I,
              height: I
            });
          }
          var N = Mr(0, m.width), j = N(g);
          return $e($e({}, m), {}, {
            width: j
          });
        });
        return /* @__PURE__ */ C.createElement(Oe, null, n.renderRectanglesStatically(y));
      });
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props, a = n.data, i = n.isAnimationActive, o = this.state.prevData;
      return i && a && a.length && (!o || !ls(o, a)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(a);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this, a = this.props, i = a.data, o = a.dataKey, u = a.activeIndex, s = le(this.props.background, !1);
      return i.map(function(c, l) {
        c.value;
        var f = c.background, h = N9(c, C9);
        if (!f)
          return null;
        var p = $e($e($e($e($e({}, h), {}, {
          fill: "#eee"
        }, f), s), bn(n.props, c, l)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: o,
          index: l,
          className: "recharts-bar-background-rectangle"
        });
        return /* @__PURE__ */ C.createElement(JE, Ou({
          key: "background-bar-".concat(l),
          option: n.props.background,
          isActive: l === u
        }, p));
      });
    }
  }, {
    key: "renderErrorBar",
    value: function(n, a) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished)
        return null;
      var i = this.props, o = i.data, u = i.xAxis, s = i.yAxis, c = i.layout, l = i.children, f = jt(l, hs);
      if (!f)
        return null;
      var h = c === "vertical" ? o[0].height / 2 : o[0].width / 2, p = function(m, E) {
        var v = Array.isArray(m.value) ? m.value[1] : m.value;
        return {
          x: m.x,
          y: m.y,
          value: v,
          errorVal: ut(m, E)
        };
      }, g = {
        clipPath: n ? "url(#clipPath-".concat(a, ")") : null
      };
      return /* @__PURE__ */ C.createElement(Oe, g, f.map(function(y) {
        return /* @__PURE__ */ C.cloneElement(y, {
          key: "error-bar-".concat(a, "-").concat(y.props.dataKey),
          data: o,
          xAxis: u,
          yAxis: s,
          layout: c,
          offset: h,
          dataPointFormatter: p
        });
      }));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.hide, i = n.data, o = n.className, u = n.xAxis, s = n.yAxis, c = n.left, l = n.top, f = n.width, h = n.height, p = n.isAnimationActive, g = n.background, y = n.id;
      if (a || !i || !i.length)
        return null;
      var m = this.state.isAnimationFinished, E = pe("recharts-bar", o), v = u && u.allowDataOverflow, T = s && s.allowDataOverflow, A = v || T, b = me(y) ? this.id : y;
      return /* @__PURE__ */ C.createElement(Oe, {
        className: E
      }, v || T ? /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("clipPath", {
        id: "clipPath-".concat(b)
      }, /* @__PURE__ */ C.createElement("rect", {
        x: v ? c : c - f / 2,
        y: T ? l : l - h / 2,
        width: v ? f : f * 2,
        height: T ? h : h * 2
      }))) : null, /* @__PURE__ */ C.createElement(Oe, {
        className: "recharts-bar-rectangles",
        clipPath: A ? "url(#clipPath-".concat(b, ")") : null
      }, g ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(A, b), (!p || m) && Gt.renderCallByParent(this.props, i));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, a) {
      return n.animationId !== a.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curData: n.data,
        prevData: a.curData
      } : n.data !== a.curData ? {
        curData: n.data
      } : null;
    }
  }]);
})(ir);
bS = sr;
jr(sr, "displayName", "Bar");
jr(sr, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !xa.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
jr(sr, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.barPosition, a = e.bandSize, i = e.xAxis, o = e.yAxis, u = e.xAxisTicks, s = e.yAxisTicks, c = e.stackedData, l = e.dataStartIndex, f = e.displayedData, h = e.offset, p = i8(n, r);
  if (!p)
    return null;
  var g = t.layout, y = r.type.defaultProps, m = y !== void 0 ? $e($e({}, y), r.props) : r.props, E = m.dataKey, v = m.children, T = m.minPointSize, A = g === "horizontal" ? o : i, b = c ? A.scale.domain() : null, _ = d8({
    numericAxis: A
  }), O = jt(v, es), I = f.map(function(N, j) {
    var D, R, B, F, $, q;
    c ? D = o8(c[l + j], b) : (D = ut(N, E), Array.isArray(D) || (D = [_, D]));
    var Y = I9(T, bS.defaultProps.minPointSize)(D[1], j);
    if (g === "horizontal") {
      var Q, te = [o.scale(D[0]), o.scale(D[1])], k = te[0], W = te[1];
      R = v1({
        axis: i,
        ticks: u,
        bandSize: a,
        offset: p.offset,
        entry: N,
        index: j
      }), B = (Q = W ?? k) !== null && Q !== void 0 ? Q : void 0, F = p.size;
      var z = k - W;
      if ($ = Number.isNaN(z) ? 0 : z, q = {
        x: R,
        y: o.y,
        width: F,
        height: o.height
      }, Math.abs(Y) > 0 && Math.abs($) < Math.abs(Y)) {
        var Z = dt($ || Y) * (Math.abs(Y) - Math.abs($));
        B -= Z, $ += Z;
      }
    } else {
      var ne = [i.scale(D[0]), i.scale(D[1])], oe = ne[0], ue = ne[1];
      if (R = oe, B = v1({
        axis: o,
        ticks: s,
        bandSize: a,
        offset: p.offset,
        entry: N,
        index: j
      }), F = ue - oe, $ = p.size, q = {
        x: i.x,
        y: B,
        width: i.width,
        height: $
      }, Math.abs(Y) > 0 && Math.abs(F) < Math.abs(Y)) {
        var fe = dt(F || Y) * (Math.abs(Y) - Math.abs(F));
        F += fe;
      }
    }
    return $e($e($e({}, N), {}, {
      x: R,
      y: B,
      width: F,
      height: $,
      value: c ? D : D[1],
      payload: N,
      background: q
    }, O && O[j] && O[j].props), {}, {
      tooltipPayload: [qO(r, N)],
      tooltipPosition: {
        x: R + F / 2,
        y: B + $ / 2
      }
    });
  });
  return $e({
    data: I,
    layout: g
  }, h);
});
function Ui(e) {
  "@babel/helpers - typeof";
  return Ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ui(e);
}
function $9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function rT(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, ES(n.key), n);
  }
}
function U9(e, t, r) {
  return t && rT(e.prototype, t), r && rT(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function nT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nT(Object(r), !0).forEach(function(n) {
      Es(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Es(e, t, r) {
  return t = ES(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ES(e) {
  var t = H9(e, "string");
  return Ui(t) == "symbol" ? t : t + "";
}
function H9(e, t) {
  if (Ui(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ui(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var q9 = function(t, r, n, a, i) {
  var o = t.width, u = t.height, s = t.layout, c = t.children, l = Object.keys(r), f = {
    left: n.left,
    leftMirror: n.left,
    right: o - n.right,
    rightMirror: o - n.right,
    top: n.top,
    topMirror: n.top,
    bottom: u - n.bottom,
    bottomMirror: u - n.bottom
  }, h = !!At(c, sr);
  return l.reduce(function(p, g) {
    var y = r[g], m = y.orientation, E = y.domain, v = y.padding, T = v === void 0 ? {} : v, A = y.mirror, b = y.reversed, _ = "".concat(m).concat(A ? "Mirror" : ""), O, I, N, j, D;
    if (y.type === "number" && (y.padding === "gap" || y.padding === "no-gap")) {
      var R = E[1] - E[0], B = 1 / 0, F = y.categoricalDomain.sort(GN);
      if (F.forEach(function(ne, oe) {
        oe > 0 && (B = Math.min((ne || 0) - (F[oe - 1] || 0), B));
      }), Number.isFinite(B)) {
        var $ = B / R, q = y.layout === "vertical" ? n.height : n.width;
        if (y.padding === "gap" && (O = $ * q / 2), y.padding === "no-gap") {
          var Y = ht(t.barCategoryGap, $ * q), Q = $ * q / 2;
          O = Q - Y - (Q - Y) / q * Y;
        }
      }
    }
    a === "xAxis" ? I = [n.left + (T.left || 0) + (O || 0), n.left + n.width - (T.right || 0) - (O || 0)] : a === "yAxis" ? I = s === "horizontal" ? [n.top + n.height - (T.bottom || 0), n.top + (T.top || 0)] : [n.top + (T.top || 0) + (O || 0), n.top + n.height - (T.bottom || 0) - (O || 0)] : I = y.range, b && (I = [I[1], I[0]]);
    var te = FO(y, i, h), k = te.scale, W = te.realScaleType;
    k.domain(E).range(I), $O(k);
    var z = UO(k, qt(qt({}, y), {}, {
      realScaleType: W
    }));
    a === "xAxis" ? (D = m === "top" && !A || m === "bottom" && A, N = n.left, j = f[_] - D * y.height) : a === "yAxis" && (D = m === "left" && !A || m === "right" && A, N = f[_] - D * y.width, j = n.top);
    var Z = qt(qt(qt({}, y), z), {}, {
      realScaleType: W,
      x: N,
      y: j,
      scale: k,
      width: a === "xAxis" ? n.width : y.width,
      height: a === "yAxis" ? n.height : y.height
    });
    return Z.bandSize = uu(Z, z), !y.hide && a === "xAxis" ? f[_] += (D ? -1 : 1) * Z.height : y.hide || (f[_] += (D ? -1 : 1) * Z.width), qt(qt({}, p), {}, Es({}, g, Z));
  }, {});
}, TS = function(t, r) {
  var n = t.x, a = t.y, i = r.x, o = r.y;
  return {
    x: Math.min(n, i),
    y: Math.min(a, o),
    width: Math.abs(i - n),
    height: Math.abs(o - a)
  };
}, W9 = function(t) {
  var r = t.x1, n = t.y1, a = t.x2, i = t.y2;
  return TS({
    x: r,
    y: n
  }, {
    x: a,
    y: i
  });
}, _S = /* @__PURE__ */ (function() {
  function e(t) {
    $9(this, e), this.scale = t;
  }
  return U9(e, [{
    key: "domain",
    get: function() {
      return this.scale.domain;
    }
  }, {
    key: "range",
    get: function() {
      return this.scale.range;
    }
  }, {
    key: "rangeMin",
    get: function() {
      return this.range()[0];
    }
  }, {
    key: "rangeMax",
    get: function() {
      return this.range()[1];
    }
  }, {
    key: "bandwidth",
    get: function() {
      return this.scale.bandwidth;
    }
  }, {
    key: "apply",
    value: function(r) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.bandAware, i = n.position;
      if (r !== void 0) {
        if (i)
          switch (i) {
            case "start":
              return this.scale(r);
            case "middle": {
              var o = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(r) + o;
            }
            case "end": {
              var u = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(r) + u;
            }
            default:
              return this.scale(r);
          }
        if (a) {
          var s = this.bandwidth ? this.bandwidth() / 2 : 0;
          return this.scale(r) + s;
        }
        return this.scale(r);
      }
    }
  }, {
    key: "isInRange",
    value: function(r) {
      var n = this.range(), a = n[0], i = n[n.length - 1];
      return a <= i ? r >= a && r <= i : r >= i && r <= a;
    }
  }], [{
    key: "create",
    value: function(r) {
      return new e(r);
    }
  }]);
})();
Es(_S, "EPS", 1e-4);
var R0 = function(t) {
  var r = Object.keys(t).reduce(function(n, a) {
    return qt(qt({}, n), {}, Es({}, a, _S.create(t[a])));
  }, {});
  return qt(qt({}, r), {}, {
    apply: function(a) {
      var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = i.bandAware, u = i.position;
      return b9(a, function(s, c) {
        return r[c].apply(s, {
          bandAware: o,
          position: u
        });
      });
    },
    isInRange: function(a) {
      return yS(a, function(i, o) {
        return r[o].isInRange(i);
      });
    }
  });
};
function Y9(e) {
  return (e % 180 + 180) % 180;
}
var z9 = function(t) {
  var r = t.width, n = t.height, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, i = Y9(a), o = i * Math.PI / 180, u = Math.atan(n / r), s = o > u && o < Math.PI - u ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(s);
}, Nd, aT;
function G9() {
  if (aT) return Nd;
  aT = 1;
  var e = ur(), t = Qi(), r = Qu();
  function n(a) {
    return function(i, o, u) {
      var s = Object(i);
      if (!t(i)) {
        var c = e(o, 3);
        i = r(i), o = function(f) {
          return c(s[f], f, s);
        };
      }
      var l = a(i, o, u);
      return l > -1 ? s[c ? i[l] : l] : void 0;
    };
  }
  return Nd = n, Nd;
}
var Rd, iT;
function K9() {
  if (iT) return Rd;
  iT = 1;
  var e = dS();
  function t(r) {
    var n = e(r), a = n % 1;
    return n === n ? a ? n - a : n : 0;
  }
  return Rd = t, Rd;
}
var Dd, oT;
function V9() {
  if (oT) return Dd;
  oT = 1;
  var e = TA(), t = ur(), r = K9(), n = Math.max;
  function a(i, o, u) {
    var s = i == null ? 0 : i.length;
    if (!s)
      return -1;
    var c = u == null ? 0 : r(u);
    return c < 0 && (c = n(s + c, 0)), e(i, t(o, 3), c);
  }
  return Dd = a, Dd;
}
var Md, uT;
function X9() {
  if (uT) return Md;
  uT = 1;
  var e = G9(), t = V9(), r = e(t);
  return Md = r, Md;
}
var Q9 = X9();
const Z9 = /* @__PURE__ */ xe(Q9);
var J9 = B_();
const e$ = /* @__PURE__ */ xe(J9);
var t$ = e$(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
});
function xu(e) {
  "@babel/helpers - typeof";
  return xu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xu(e);
}
var D0 = /* @__PURE__ */ Vt(void 0), M0 = /* @__PURE__ */ Vt(void 0), AS = /* @__PURE__ */ Vt(void 0), OS = /* @__PURE__ */ Vt({}), SS = /* @__PURE__ */ Vt(void 0), xS = /* @__PURE__ */ Vt(0), wS = /* @__PURE__ */ Vt(0), sT = function(t) {
  var r = t.state, n = r.xAxisMap, a = r.yAxisMap, i = r.offset, o = t.clipPathId, u = t.children, s = t.width, c = t.height, l = t$(i);
  return /* @__PURE__ */ C.createElement(D0.Provider, {
    value: n
  }, /* @__PURE__ */ C.createElement(M0.Provider, {
    value: a
  }, /* @__PURE__ */ C.createElement(OS.Provider, {
    value: i
  }, /* @__PURE__ */ C.createElement(AS.Provider, {
    value: l
  }, /* @__PURE__ */ C.createElement(SS.Provider, {
    value: o
  }, /* @__PURE__ */ C.createElement(xS.Provider, {
    value: c
  }, /* @__PURE__ */ C.createElement(wS.Provider, {
    value: s
  }, u)))))));
}, r$ = function() {
  return $t(SS);
};
function PS(e) {
  var t = Object.keys(e);
  return t.length === 0 ? "There are no available ids." : "Available ids are: ".concat(t, ".");
}
var IS = function(t) {
  var r = $t(D0);
  r == null && (process.env.NODE_ENV !== "production" ? vt(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : vt());
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? vt(!1, 'Could not find xAxis by id "'.concat(t, '" [').concat(xu(t), "]. ").concat(PS(r))) : vt()), n;
}, n$ = function() {
  var t = $t(D0);
  return kr(t);
}, a$ = function() {
  var t = $t(M0), r = Z9(t, function(n) {
    return yS(n.domain, Number.isFinite);
  });
  return r || kr(t);
}, CS = function(t) {
  var r = $t(M0);
  r == null && (process.env.NODE_ENV !== "production" ? vt(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : vt());
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? vt(!1, 'Could not find yAxis by id "'.concat(t, '" [').concat(xu(t), "]. ").concat(PS(r))) : vt()), n;
}, i$ = function() {
  var t = $t(AS);
  return t;
}, o$ = function() {
  return $t(OS);
}, L0 = function() {
  return $t(wS);
}, k0 = function() {
  return $t(xS);
};
function pa(e) {
  "@babel/helpers - typeof";
  return pa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pa(e);
}
function u$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function s$(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, RS(n.key), n);
  }
}
function c$(e, t, r) {
  return t && s$(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function l$(e, t, r) {
  return t = wu(t), f$(e, NS() ? Reflect.construct(t, r || [], wu(e).constructor) : t.apply(e, r));
}
function f$(e, t) {
  if (t && (pa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return d$(e);
}
function d$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function NS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (NS = function() {
    return !!e;
  })();
}
function wu(e) {
  return wu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, wu(e);
}
function h$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && np(e, t);
}
function np(e, t) {
  return np = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, np(e, t);
}
function cT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function lT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cT(Object(r), !0).forEach(function(n) {
      B0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function B0(e, t, r) {
  return t = RS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RS(e) {
  var t = p$(e, "string");
  return pa(t) == "symbol" ? t : t + "";
}
function p$(e, t) {
  if (pa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function m$(e, t) {
  return v$(e) || g$(e, t) || b$(e, t) || y$();
}
function y$() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function b$(e, t) {
  if (e) {
    if (typeof e == "string") return fT(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return fT(e, t);
  }
}
function fT(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function g$(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function v$(e) {
  if (Array.isArray(e)) return e;
}
function ap() {
  return ap = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ap.apply(this, arguments);
}
var E$ = function(t, r) {
  var n;
  return /* @__PURE__ */ C.isValidElement(t) ? n = /* @__PURE__ */ C.cloneElement(t, r) : de(t) ? n = t(r) : n = /* @__PURE__ */ C.createElement("line", ap({}, r, {
    className: "recharts-reference-line-line"
  })), n;
}, T$ = function(t, r, n, a, i, o, u, s, c) {
  var l = i.x, f = i.y, h = i.width, p = i.height;
  if (n) {
    var g = c.y, y = t.y.apply(g, {
      position: o
    });
    if (nr(c, "discard") && !t.y.isInRange(y))
      return null;
    var m = [{
      x: l + h,
      y
    }, {
      x: l,
      y
    }];
    return s === "left" ? m.reverse() : m;
  }
  if (r) {
    var E = c.x, v = t.x.apply(E, {
      position: o
    });
    if (nr(c, "discard") && !t.x.isInRange(v))
      return null;
    var T = [{
      x: v,
      y: f + p
    }, {
      x: v,
      y: f
    }];
    return u === "top" ? T.reverse() : T;
  }
  if (a) {
    var A = c.segment, b = A.map(function(_) {
      return t.apply(_, {
        position: o
      });
    });
    return nr(c, "discard") && h9(b, function(_) {
      return !t.isInRange(_);
    }) ? null : b;
  }
  return null;
};
function _$(e) {
  var t = e.x, r = e.y, n = e.segment, a = e.xAxisId, i = e.yAxisId, o = e.shape, u = e.className, s = e.alwaysShow, c = r$(), l = IS(a), f = CS(i), h = i$();
  if (!c || !h)
    return null;
  zt(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var p = R0({
    x: l.scale,
    y: f.scale
  }), g = ze(t), y = ze(r), m = n && n.length === 2, E = T$(p, g, y, m, h, e.position, l.orientation, f.orientation, e);
  if (!E)
    return null;
  var v = m$(E, 2), T = v[0], A = T.x, b = T.y, _ = v[1], O = _.x, I = _.y, N = nr(e, "hidden") ? "url(#".concat(c, ")") : void 0, j = lT(lT({
    clipPath: N
  }, le(e, !0)), {}, {
    x1: A,
    y1: b,
    x2: O,
    y2: I
  });
  return /* @__PURE__ */ C.createElement(Oe, {
    className: pe("recharts-reference-line", u)
  }, E$(o, j), Qe.renderCallByParent(e, W9({
    x1: A,
    y1: b,
    x2: O,
    y2: I
  })));
}
var j0 = /* @__PURE__ */ (function(e) {
  function t() {
    return u$(this, t), l$(this, t, arguments);
  }
  return h$(t, e), c$(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ C.createElement(_$, this.props);
    }
  }]);
})(C.Component);
B0(j0, "displayName", "ReferenceLine");
B0(j0, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle"
});
function ip() {
  return ip = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ip.apply(this, arguments);
}
function ma(e) {
  "@babel/helpers - typeof";
  return ma = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ma(e);
}
function dT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function hT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dT(Object(r), !0).forEach(function(n) {
      Ts(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function A$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function O$(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, MS(n.key), n);
  }
}
function S$(e, t, r) {
  return t && O$(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function x$(e, t, r) {
  return t = Pu(t), w$(e, DS() ? Reflect.construct(t, r || [], Pu(e).constructor) : t.apply(e, r));
}
function w$(e, t) {
  if (t && (ma(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return P$(e);
}
function P$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function DS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (DS = function() {
    return !!e;
  })();
}
function Pu(e) {
  return Pu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Pu(e);
}
function I$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && op(e, t);
}
function op(e, t) {
  return op = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, op(e, t);
}
function Ts(e, t, r) {
  return t = MS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function MS(e) {
  var t = C$(e, "string");
  return ma(t) == "symbol" ? t : t + "";
}
function C$(e, t) {
  if (ma(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ma(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var N$ = function(t) {
  var r = t.x, n = t.y, a = t.xAxis, i = t.yAxis, o = R0({
    x: a.scale,
    y: i.scale
  }), u = o.apply({
    x: r,
    y: n
  }, {
    bandAware: !0
  });
  return nr(t, "discard") && !o.isInRange(u) ? null : u;
}, _s = /* @__PURE__ */ (function(e) {
  function t() {
    return A$(this, t), x$(this, t, arguments);
  }
  return I$(t, e), S$(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.x, i = n.y, o = n.r, u = n.alwaysShow, s = n.clipPathId, c = ze(a), l = ze(i);
      if (zt(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !c || !l)
        return null;
      var f = N$(this.props);
      if (!f)
        return null;
      var h = f.x, p = f.y, g = this.props, y = g.shape, m = g.className, E = nr(this.props, "hidden") ? "url(#".concat(s, ")") : void 0, v = hT(hT({
        clipPath: E
      }, le(this.props, !0)), {}, {
        cx: h,
        cy: p
      });
      return /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-reference-dot", m)
      }, t.renderDot(y, v), Qe.renderCallByParent(this.props, {
        x: h - o,
        y: p - o,
        width: 2 * o,
        height: 2 * o
      }));
    }
  }]);
})(C.Component);
Ts(_s, "displayName", "ReferenceDot");
Ts(_s, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1
});
Ts(_s, "renderDot", function(e, t) {
  var r;
  return /* @__PURE__ */ C.isValidElement(e) ? r = /* @__PURE__ */ C.cloneElement(e, t) : de(e) ? r = e(t) : r = /* @__PURE__ */ C.createElement(N0, ip({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r;
});
function up() {
  return up = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, up.apply(this, arguments);
}
function ya(e) {
  "@babel/helpers - typeof";
  return ya = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ya(e);
}
function pT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function mT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pT(Object(r), !0).forEach(function(n) {
      As(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function R$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function D$(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, kS(n.key), n);
  }
}
function M$(e, t, r) {
  return t && D$(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function L$(e, t, r) {
  return t = Iu(t), k$(e, LS() ? Reflect.construct(t, r || [], Iu(e).constructor) : t.apply(e, r));
}
function k$(e, t) {
  if (t && (ya(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return B$(e);
}
function B$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function LS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (LS = function() {
    return !!e;
  })();
}
function Iu(e) {
  return Iu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Iu(e);
}
function j$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && sp(e, t);
}
function sp(e, t) {
  return sp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, sp(e, t);
}
function As(e, t, r) {
  return t = kS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kS(e) {
  var t = F$(e, "string");
  return ya(t) == "symbol" ? t : t + "";
}
function F$(e, t) {
  if (ya(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ya(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var $$ = function(t, r, n, a, i) {
  var o = i.x1, u = i.x2, s = i.y1, c = i.y2, l = i.xAxis, f = i.yAxis;
  if (!l || !f) return null;
  var h = R0({
    x: l.scale,
    y: f.scale
  }), p = {
    x: t ? h.x.apply(o, {
      position: "start"
    }) : h.x.rangeMin,
    y: n ? h.y.apply(s, {
      position: "start"
    }) : h.y.rangeMin
  }, g = {
    x: r ? h.x.apply(u, {
      position: "end"
    }) : h.x.rangeMax,
    y: a ? h.y.apply(c, {
      position: "end"
    }) : h.y.rangeMax
  };
  return nr(i, "discard") && (!h.isInRange(p) || !h.isInRange(g)) ? null : TS(p, g);
}, Os = /* @__PURE__ */ (function(e) {
  function t() {
    return R$(this, t), L$(this, t, arguments);
  }
  return j$(t, e), M$(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.x1, i = n.x2, o = n.y1, u = n.y2, s = n.className, c = n.alwaysShow, l = n.clipPathId;
      zt(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var f = ze(a), h = ze(i), p = ze(o), g = ze(u), y = this.props.shape;
      if (!f && !h && !p && !g && !y)
        return null;
      var m = $$(f, h, p, g, this.props);
      if (!m && !y)
        return null;
      var E = nr(this.props, "hidden") ? "url(#".concat(l, ")") : void 0;
      return /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-reference-area", s)
      }, t.renderRect(y, mT(mT({
        clipPath: E
      }, le(this.props, !0)), m)), Qe.renderCallByParent(this.props, m));
    }
  }]);
})(C.Component);
As(Os, "displayName", "ReferenceArea");
As(Os, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1
});
As(Os, "renderRect", function(e, t) {
  var r;
  return /* @__PURE__ */ C.isValidElement(e) ? r = /* @__PURE__ */ C.cloneElement(e, t) : de(e) ? r = e(t) : r = /* @__PURE__ */ C.createElement(C0, up({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
});
function BS(e, t, r) {
  if (t < 1)
    return [];
  if (t === 1 && r === void 0)
    return e;
  for (var n = [], a = 0; a < e.length; a += t)
    n.push(e[a]);
  return n;
}
function U$(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return z9(n, r);
}
function H$(e, t, r) {
  var n = r === "width", a = e.x, i = e.y, o = e.width, u = e.height;
  return t === 1 ? {
    start: n ? a : i,
    end: n ? a + o : i + u
  } : {
    start: n ? a + o : i + u,
    end: n ? a : i
  };
}
function Cu(e, t, r, n, a) {
  if (e * t < e * n || e * t > e * a)
    return !1;
  var i = r();
  return e * (t - e * i / 2 - n) >= 0 && e * (t + e * i / 2 - a) <= 0;
}
function q$(e, t) {
  return BS(e, t + 1);
}
function W$(e, t, r, n, a) {
  for (var i = (n || []).slice(), o = t.start, u = t.end, s = 0, c = 1, l = o, f = function() {
    var g = n?.[s];
    if (g === void 0)
      return {
        v: BS(n, c)
      };
    var y = s, m, E = function() {
      return m === void 0 && (m = r(g, y)), m;
    }, v = g.coordinate, T = s === 0 || Cu(e, v, E, l, u);
    T || (s = 0, l = o, c += 1), T && (l = v + e * (E() / 2 + a), s += c);
  }, h; c <= i.length; )
    if (h = f(), h) return h.v;
  return [];
}
function Hi(e) {
  "@babel/helpers - typeof";
  return Hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Hi(e);
}
function yT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function at(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yT(Object(r), !0).forEach(function(n) {
      Y$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Y$(e, t, r) {
  return t = z$(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function z$(e) {
  var t = G$(e, "string");
  return Hi(t) == "symbol" ? t : t + "";
}
function G$(e, t) {
  if (Hi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Hi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function K$(e, t, r, n, a) {
  for (var i = (n || []).slice(), o = i.length, u = t.start, s = t.end, c = function(h) {
    var p = i[h], g, y = function() {
      return g === void 0 && (g = r(p, h)), g;
    };
    if (h === o - 1) {
      var m = e * (p.coordinate + e * y() / 2 - s);
      i[h] = p = at(at({}, p), {}, {
        tickCoord: m > 0 ? p.coordinate - m * e : p.coordinate
      });
    } else
      i[h] = p = at(at({}, p), {}, {
        tickCoord: p.coordinate
      });
    var E = Cu(e, p.tickCoord, y, u, s);
    E && (s = p.tickCoord - e * (y() / 2 + a), i[h] = at(at({}, p), {}, {
      isShow: !0
    }));
  }, l = o - 1; l >= 0; l--)
    c(l);
  return i;
}
function V$(e, t, r, n, a, i) {
  var o = (n || []).slice(), u = o.length, s = t.start, c = t.end;
  if (i) {
    var l = n[u - 1], f = r(l, u - 1), h = e * (l.coordinate + e * f / 2 - c);
    o[u - 1] = l = at(at({}, l), {}, {
      tickCoord: h > 0 ? l.coordinate - h * e : l.coordinate
    });
    var p = Cu(e, l.tickCoord, function() {
      return f;
    }, s, c);
    p && (c = l.tickCoord - e * (f / 2 + a), o[u - 1] = at(at({}, l), {}, {
      isShow: !0
    }));
  }
  for (var g = i ? u - 1 : u, y = function(v) {
    var T = o[v], A, b = function() {
      return A === void 0 && (A = r(T, v)), A;
    };
    if (v === 0) {
      var _ = e * (T.coordinate - e * b() / 2 - s);
      o[v] = T = at(at({}, T), {}, {
        tickCoord: _ < 0 ? T.coordinate - _ * e : T.coordinate
      });
    } else
      o[v] = T = at(at({}, T), {}, {
        tickCoord: T.coordinate
      });
    var O = Cu(e, T.tickCoord, b, s, c);
    O && (s = T.tickCoord + e * (b() / 2 + a), o[v] = at(at({}, T), {}, {
      isShow: !0
    }));
  }, m = 0; m < g; m++)
    y(m);
  return o;
}
function F0(e, t, r) {
  var n = e.tick, a = e.ticks, i = e.viewBox, o = e.minTickGap, u = e.orientation, s = e.interval, c = e.tickFormatter, l = e.unit, f = e.angle;
  if (!a || !a.length || !n)
    return [];
  if (J(s) || xa.isSsr)
    return q$(a, typeof s == "number" && J(s) ? s : 0);
  var h = [], p = u === "top" || u === "bottom" ? "width" : "height", g = l && p === "width" ? ei(l, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, y = function(T, A) {
    var b = de(c) ? c(T.value, A) : T.value;
    return p === "width" ? U$(ei(b, {
      fontSize: t,
      letterSpacing: r
    }), g, f) : ei(b, {
      fontSize: t,
      letterSpacing: r
    })[p];
  }, m = a.length >= 2 ? dt(a[1].coordinate - a[0].coordinate) : 1, E = H$(i, m, p);
  return s === "equidistantPreserveStart" ? W$(m, E, y, a, o) : (s === "preserveStart" || s === "preserveStartEnd" ? h = V$(m, E, y, a, o, s === "preserveStartEnd") : h = K$(m, E, y, a, o), h.filter(function(v) {
    return v.isShow;
  }));
}
var X$ = ["viewBox"], Q$ = ["viewBox"], Z$ = ["ticks"];
function ba(e) {
  "@babel/helpers - typeof";
  return ba = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ba(e);
}
function Hn() {
  return Hn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hn.apply(this, arguments);
}
function bT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bT(Object(r), !0).forEach(function(n) {
      $0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ld(e, t) {
  if (e == null) return {};
  var r = J$(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function J$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function eU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function gT(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, FS(n.key), n);
  }
}
function tU(e, t, r) {
  return t && gT(e.prototype, t), r && gT(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function rU(e, t, r) {
  return t = Nu(t), nU(e, jS() ? Reflect.construct(t, r || [], Nu(e).constructor) : t.apply(e, r));
}
function nU(e, t) {
  if (t && (ba(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return aU(e);
}
function aU(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function jS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (jS = function() {
    return !!e;
  })();
}
function Nu(e) {
  return Nu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Nu(e);
}
function iU(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cp(e, t);
}
function cp(e, t) {
  return cp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, cp(e, t);
}
function $0(e, t, r) {
  return t = FS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function FS(e) {
  var t = oU(e, "string");
  return ba(t) == "symbol" ? t : t + "";
}
function oU(e, t) {
  if (ba(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ba(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ca = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return eU(this, t), n = rU(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n;
  }
  return iU(t, e), tU(t, [{
    key: "shouldComponentUpdate",
    value: function(n, a) {
      var i = n.viewBox, o = Ld(n, X$), u = this.props, s = u.viewBox, c = Ld(u, Q$);
      return !Yn(i, s) || !Yn(o, c) || !Yn(a, this.state);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      var n = this.layerReference;
      if (n) {
        var a = n.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
        a && this.setState({
          fontSize: window.getComputedStyle(a).fontSize,
          letterSpacing: window.getComputedStyle(a).letterSpacing
        });
      }
    }
    /**
     * Calculate the coordinates of endpoints in ticks
     * @param  {Object} data The data of a simple tick
     * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
     *  (x2, y2): The coordinate of endpoint close to axis
     */
  }, {
    key: "getTickLineCoord",
    value: function(n) {
      var a = this.props, i = a.x, o = a.y, u = a.width, s = a.height, c = a.orientation, l = a.tickSize, f = a.mirror, h = a.tickMargin, p, g, y, m, E, v, T = f ? -1 : 1, A = n.tickSize || l, b = J(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (c) {
        case "top":
          p = g = n.coordinate, m = o + +!f * s, y = m - T * A, v = y - T * h, E = b;
          break;
        case "left":
          y = m = n.coordinate, g = i + +!f * u, p = g - T * A, E = p - T * h, v = b;
          break;
        case "right":
          y = m = n.coordinate, g = i + +f * u, p = g + T * A, E = p + T * h, v = b;
          break;
        default:
          p = g = n.coordinate, m = o + +f * s, y = m + T * A, v = y + T * h, E = b;
          break;
      }
      return {
        line: {
          x1: p,
          y1: y,
          x2: g,
          y2: m
        },
        tick: {
          x: E,
          y: v
        }
      };
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props, a = n.orientation, i = n.mirror, o;
      switch (a) {
        case "left":
          o = i ? "start" : "end";
          break;
        case "right":
          o = i ? "end" : "start";
          break;
        default:
          o = "middle";
          break;
      }
      return o;
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function() {
      var n = this.props, a = n.orientation, i = n.mirror, o = "end";
      switch (a) {
        case "left":
        case "right":
          o = "middle";
          break;
        case "top":
          o = i ? "start" : "end";
          break;
        default:
          o = i ? "end" : "start";
          break;
      }
      return o;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.x, i = n.y, o = n.width, u = n.height, s = n.orientation, c = n.mirror, l = n.axisLine, f = qe(qe(qe({}, le(this.props, !1)), le(l, !1)), {}, {
        fill: "none"
      });
      if (s === "top" || s === "bottom") {
        var h = +(s === "top" && !c || s === "bottom" && c);
        f = qe(qe({}, f), {}, {
          x1: a,
          y1: i + h * u,
          x2: a + o,
          y2: i + h * u
        });
      } else {
        var p = +(s === "left" && !c || s === "right" && c);
        f = qe(qe({}, f), {}, {
          x1: a + p * o,
          y1: i,
          x2: a + p * o,
          y2: i + u
        });
      }
      return /* @__PURE__ */ C.createElement("line", Hn({}, f, {
        className: pe("recharts-cartesian-axis-line", xt(l, "className"))
      }));
    }
  }, {
    key: "renderTicks",
    value: (
      /**
       * render the ticks
       * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
       * @param {string} fontSize Fontsize to consider for tick spacing
       * @param {string} letterSpacing Letterspacing to consider for tick spacing
       * @return {ReactComponent} renderedTicks
       */
      function(n, a, i) {
        var o = this, u = this.props, s = u.tickLine, c = u.stroke, l = u.tick, f = u.tickFormatter, h = u.unit, p = F0(qe(qe({}, this.props), {}, {
          ticks: n
        }), a, i), g = this.getTickTextAnchor(), y = this.getTickVerticalAnchor(), m = le(this.props, !1), E = le(l, !1), v = qe(qe({}, m), {}, {
          fill: "none"
        }, le(s, !1)), T = p.map(function(A, b) {
          var _ = o.getTickLineCoord(A), O = _.line, I = _.tick, N = qe(qe(qe(qe({
            textAnchor: g,
            verticalAnchor: y
          }, m), {}, {
            stroke: "none",
            fill: c
          }, E), I), {}, {
            index: b,
            payload: A,
            visibleTicksCount: p.length,
            tickFormatter: f
          });
          return /* @__PURE__ */ C.createElement(Oe, Hn({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(A.value, "-").concat(A.coordinate, "-").concat(A.tickCoord)
          }, bn(o.props, A, b)), s && /* @__PURE__ */ C.createElement("line", Hn({}, v, O, {
            className: pe("recharts-cartesian-axis-tick-line", xt(s, "className"))
          })), l && t.renderTickItem(l, N, "".concat(de(f) ? f(A.value, b) : A.value).concat(h || "")));
        });
        return /* @__PURE__ */ C.createElement("g", {
          className: "recharts-cartesian-axis-ticks"
        }, T);
      }
    )
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.axisLine, o = a.width, u = a.height, s = a.ticksGenerator, c = a.className, l = a.hide;
      if (l)
        return null;
      var f = this.props, h = f.ticks, p = Ld(f, Z$), g = h;
      return de(s) && (g = h && h.length > 0 ? s(this.props) : s(p)), o <= 0 || u <= 0 || !g || !g.length ? null : /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-cartesian-axis", c),
        ref: function(m) {
          n.layerReference = m;
        }
      }, i && this.renderAxisLine(), this.renderTicks(g, this.state.fontSize, this.state.letterSpacing), Qe.renderCallByParent(this.props));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var o, u = pe(a.className, "recharts-cartesian-axis-tick-value");
      return /* @__PURE__ */ C.isValidElement(n) ? o = /* @__PURE__ */ C.cloneElement(n, qe(qe({}, a), {}, {
        className: u
      })) : de(n) ? o = n(qe(qe({}, a), {}, {
        className: u
      })) : o = /* @__PURE__ */ C.createElement(gn, Hn({}, a, {
        className: "recharts-cartesian-axis-tick-value"
      }), i), o;
    }
  }]);
})(kT);
$0(Ca, "displayName", "CartesianAxis");
$0(Ca, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd"
});
var uU = ["x1", "y1", "x2", "y2", "key"], sU = ["offset"];
function En(e) {
  "@babel/helpers - typeof";
  return En = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, En(e);
}
function vT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ot(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vT(Object(r), !0).forEach(function(n) {
      cU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function cU(e, t, r) {
  return t = lU(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function lU(e) {
  var t = fU(e, "string");
  return En(t) == "symbol" ? t : t + "";
}
function fU(e, t) {
  if (En(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (En(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function cn() {
  return cn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, cn.apply(this, arguments);
}
function ET(e, t) {
  if (e == null) return {};
  var r = dU(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function dU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var hU = function(t) {
  var r = t.fill;
  if (!r || r === "none")
    return null;
  var n = t.fillOpacity, a = t.x, i = t.y, o = t.width, u = t.height, s = t.ry;
  return /* @__PURE__ */ C.createElement("rect", {
    x: a,
    y: i,
    ry: s,
    width: o,
    height: u,
    stroke: "none",
    fill: r,
    fillOpacity: n,
    className: "recharts-cartesian-grid-bg"
  });
};
function $S(e, t) {
  var r;
  if (/* @__PURE__ */ C.isValidElement(e))
    r = /* @__PURE__ */ C.cloneElement(e, t);
  else if (de(e))
    r = e(t);
  else {
    var n = t.x1, a = t.y1, i = t.x2, o = t.y2, u = t.key, s = ET(t, uU), c = le(s, !1);
    c.offset;
    var l = ET(c, sU);
    r = /* @__PURE__ */ C.createElement("line", cn({}, l, {
      x1: n,
      y1: a,
      x2: i,
      y2: o,
      fill: "none",
      key: u
    }));
  }
  return r;
}
function pU(e) {
  var t = e.x, r = e.width, n = e.horizontal, a = n === void 0 ? !0 : n, i = e.horizontalPoints;
  if (!a || !i || !i.length)
    return null;
  var o = i.map(function(u, s) {
    var c = ot(ot({}, e), {}, {
      x1: t,
      y1: u,
      x2: t + r,
      y2: u,
      key: "line-".concat(s),
      index: s
    });
    return $S(a, c);
  });
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, o);
}
function mU(e) {
  var t = e.y, r = e.height, n = e.vertical, a = n === void 0 ? !0 : n, i = e.verticalPoints;
  if (!a || !i || !i.length)
    return null;
  var o = i.map(function(u, s) {
    var c = ot(ot({}, e), {}, {
      x1: u,
      y1: t,
      x2: u,
      y2: t + r,
      key: "line-".concat(s),
      index: s
    });
    return $S(a, c);
  });
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, o);
}
function yU(e) {
  var t = e.horizontalFill, r = e.fillOpacity, n = e.x, a = e.y, i = e.width, o = e.height, u = e.horizontalPoints, s = e.horizontal, c = s === void 0 ? !0 : s;
  if (!c || !t || !t.length)
    return null;
  var l = u.map(function(h) {
    return Math.round(h + a - a);
  }).sort(function(h, p) {
    return h - p;
  });
  a !== l[0] && l.unshift(0);
  var f = l.map(function(h, p) {
    var g = !l[p + 1], y = g ? a + o - h : l[p + 1] - h;
    if (y <= 0)
      return null;
    var m = p % t.length;
    return /* @__PURE__ */ C.createElement("rect", {
      key: "react-".concat(p),
      y: h,
      x: n,
      height: y,
      width: i,
      stroke: "none",
      fill: t[m],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, f);
}
function bU(e) {
  var t = e.vertical, r = t === void 0 ? !0 : t, n = e.verticalFill, a = e.fillOpacity, i = e.x, o = e.y, u = e.width, s = e.height, c = e.verticalPoints;
  if (!r || !n || !n.length)
    return null;
  var l = c.map(function(h) {
    return Math.round(h + i - i);
  }).sort(function(h, p) {
    return h - p;
  });
  i !== l[0] && l.unshift(0);
  var f = l.map(function(h, p) {
    var g = !l[p + 1], y = g ? i + u - h : l[p + 1] - h;
    if (y <= 0)
      return null;
    var m = p % n.length;
    return /* @__PURE__ */ C.createElement("rect", {
      key: "react-".concat(p),
      x: h,
      y: o,
      width: y,
      height: s,
      stroke: "none",
      fill: n[m],
      fillOpacity: a,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, f);
}
var gU = function(t, r) {
  var n = t.xAxis, a = t.width, i = t.height, o = t.offset;
  return jO(F0(ot(ot(ot({}, Ca.defaultProps), n), {}, {
    ticks: mr(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: i
    }
  })), o.left, o.left + o.width, r);
}, vU = function(t, r) {
  var n = t.yAxis, a = t.width, i = t.height, o = t.offset;
  return jO(F0(ot(ot(ot({}, Ca.defaultProps), n), {}, {
    ticks: mr(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: i
    }
  })), o.top, o.top + o.height, r);
}, Mn = {
  horizontal: !0,
  vertical: !0,
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
function no(e) {
  var t, r, n, a, i, o, u = L0(), s = k0(), c = o$(), l = ot(ot({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : Mn.stroke,
    fill: (r = e.fill) !== null && r !== void 0 ? r : Mn.fill,
    horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : Mn.horizontal,
    horizontalFill: (a = e.horizontalFill) !== null && a !== void 0 ? a : Mn.horizontalFill,
    vertical: (i = e.vertical) !== null && i !== void 0 ? i : Mn.vertical,
    verticalFill: (o = e.verticalFill) !== null && o !== void 0 ? o : Mn.verticalFill,
    x: J(e.x) ? e.x : c.left,
    y: J(e.y) ? e.y : c.top,
    width: J(e.width) ? e.width : c.width,
    height: J(e.height) ? e.height : c.height
  }), f = l.x, h = l.y, p = l.width, g = l.height, y = l.syncWithTicks, m = l.horizontalValues, E = l.verticalValues, v = n$(), T = a$();
  if (!J(p) || p <= 0 || !J(g) || g <= 0 || !J(f) || f !== +f || !J(h) || h !== +h)
    return null;
  var A = l.verticalCoordinatesGenerator || gU, b = l.horizontalCoordinatesGenerator || vU, _ = l.horizontalPoints, O = l.verticalPoints;
  if ((!_ || !_.length) && de(b)) {
    var I = m && m.length, N = b({
      yAxis: T ? ot(ot({}, T), {}, {
        ticks: I ? m : T.ticks
      }) : void 0,
      width: u,
      height: s,
      offset: c
    }, I ? !0 : y);
    zt(Array.isArray(N), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(En(N), "]")), Array.isArray(N) && (_ = N);
  }
  if ((!O || !O.length) && de(A)) {
    var j = E && E.length, D = A({
      xAxis: v ? ot(ot({}, v), {}, {
        ticks: j ? E : v.ticks
      }) : void 0,
      width: u,
      height: s,
      offset: c
    }, j ? !0 : y);
    zt(Array.isArray(D), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(En(D), "]")), Array.isArray(D) && (O = D);
  }
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ C.createElement(hU, {
    fill: l.fill,
    fillOpacity: l.fillOpacity,
    x: l.x,
    y: l.y,
    width: l.width,
    height: l.height,
    ry: l.ry
  }), /* @__PURE__ */ C.createElement(pU, cn({}, l, {
    offset: c,
    horizontalPoints: _,
    xAxis: v,
    yAxis: T
  })), /* @__PURE__ */ C.createElement(mU, cn({}, l, {
    offset: c,
    verticalPoints: O,
    xAxis: v,
    yAxis: T
  })), /* @__PURE__ */ C.createElement(yU, cn({}, l, {
    horizontalPoints: _
  })), /* @__PURE__ */ C.createElement(bU, cn({}, l, {
    verticalPoints: O
  })));
}
no.displayName = "CartesianGrid";
function ga(e) {
  "@babel/helpers - typeof";
  return ga = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ga(e);
}
function EU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function TU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, qS(n.key), n);
  }
}
function _U(e, t, r) {
  return t && TU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function AU(e, t, r) {
  return t = Ru(t), OU(e, US() ? Reflect.construct(t, r || [], Ru(e).constructor) : t.apply(e, r));
}
function OU(e, t) {
  if (t && (ga(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return SU(e);
}
function SU(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function US() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (US = function() {
    return !!e;
  })();
}
function Ru(e) {
  return Ru = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ru(e);
}
function xU(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && lp(e, t);
}
function lp(e, t) {
  return lp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, lp(e, t);
}
function HS(e, t, r) {
  return t = qS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qS(e) {
  var t = wU(e, "string");
  return ga(t) == "symbol" ? t : t + "";
}
function wU(e, t) {
  if (ga(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ga(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function fp() {
  return fp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fp.apply(this, arguments);
}
function PU(e) {
  var t = e.xAxisId, r = L0(), n = k0(), a = IS(t);
  return a == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ Wr.createElement(Ca, fp({}, a, {
      className: pe("recharts-".concat(a.axisType, " ").concat(a.axisType), a.className),
      viewBox: {
        x: 0,
        y: 0,
        width: r,
        height: n
      },
      ticksGenerator: function(o) {
        return mr(o, !0);
      }
    }))
  );
}
var Pn = /* @__PURE__ */ (function(e) {
  function t() {
    return EU(this, t), AU(this, t, arguments);
  }
  return xU(t, e), _U(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ Wr.createElement(PU, this.props);
    }
  }]);
})(Wr.Component);
HS(Pn, "displayName", "XAxis");
HS(Pn, "defaultProps", {
  allowDecimals: !0,
  hide: !1,
  orientation: "bottom",
  width: 0,
  height: 30,
  mirror: !1,
  xAxisId: 0,
  tickCount: 5,
  type: "category",
  padding: {
    left: 0,
    right: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
  allowDuplicatedCategory: !0
});
function va(e) {
  "@babel/helpers - typeof";
  return va = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, va(e);
}
function IU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function CU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, zS(n.key), n);
  }
}
function NU(e, t, r) {
  return t && CU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function RU(e, t, r) {
  return t = Du(t), DU(e, WS() ? Reflect.construct(t, r || [], Du(e).constructor) : t.apply(e, r));
}
function DU(e, t) {
  if (t && (va(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return MU(e);
}
function MU(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function WS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (WS = function() {
    return !!e;
  })();
}
function Du(e) {
  return Du = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Du(e);
}
function LU(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && dp(e, t);
}
function dp(e, t) {
  return dp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, dp(e, t);
}
function YS(e, t, r) {
  return t = zS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function zS(e) {
  var t = kU(e, "string");
  return va(t) == "symbol" ? t : t + "";
}
function kU(e, t) {
  if (va(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (va(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function hp() {
  return hp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, hp.apply(this, arguments);
}
var BU = function(t) {
  var r = t.yAxisId, n = L0(), a = k0(), i = CS(r);
  return i == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ Wr.createElement(Ca, hp({}, i, {
      className: pe("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: a
      },
      ticksGenerator: function(u) {
        return mr(u, !0);
      }
    }))
  );
}, In = /* @__PURE__ */ (function(e) {
  function t() {
    return IU(this, t), RU(this, t, arguments);
  }
  return LU(t, e), NU(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ Wr.createElement(BU, this.props);
    }
  }]);
})(Wr.Component);
YS(In, "displayName", "YAxis");
YS(In, "defaultProps", {
  allowDuplicatedCategory: !0,
  allowDecimals: !0,
  hide: !1,
  orientation: "left",
  width: 60,
  height: 0,
  mirror: !1,
  yAxisId: 0,
  tickCount: 5,
  type: "number",
  padding: {
    top: 0,
    bottom: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1
});
function TT(e) {
  return UU(e) || $U(e) || FU(e) || jU();
}
function jU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function FU(e, t) {
  if (e) {
    if (typeof e == "string") return pp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return pp(e, t);
  }
}
function $U(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function UU(e) {
  if (Array.isArray(e)) return pp(e);
}
function pp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var mp = function(t, r, n, a, i) {
  var o = jt(t, j0), u = jt(t, _s), s = [].concat(TT(o), TT(u)), c = jt(t, Os), l = "".concat(a, "Id"), f = a[0], h = r;
  if (s.length && (h = s.reduce(function(y, m) {
    if (m.props[l] === n && nr(m.props, "extendDomain") && J(m.props[f])) {
      var E = m.props[f];
      return [Math.min(y[0], E), Math.max(y[1], E)];
    }
    return y;
  }, h)), c.length) {
    var p = "".concat(f, "1"), g = "".concat(f, "2");
    h = c.reduce(function(y, m) {
      if (m.props[l] === n && nr(m.props, "extendDomain") && J(m.props[p]) && J(m.props[g])) {
        var E = m.props[p], v = m.props[g];
        return [Math.min(y[0], E, v), Math.max(y[1], E, v)];
      }
      return y;
    }, h);
  }
  return i && i.length && (h = i.reduce(function(y, m) {
    return J(m) ? [Math.min(y[0], m), Math.max(y[1], m)] : y;
  }, h)), h;
}, kd = { exports: {} }, _T;
function HU() {
  return _T || (_T = 1, (function(e) {
    var t = Object.prototype.hasOwnProperty, r = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
    function a(s, c, l) {
      this.fn = s, this.context = c, this.once = l || !1;
    }
    function i(s, c, l, f, h) {
      if (typeof l != "function")
        throw new TypeError("The listener must be a function");
      var p = new a(l, f || s, h), g = r ? r + c : c;
      return s._events[g] ? s._events[g].fn ? s._events[g] = [s._events[g], p] : s._events[g].push(p) : (s._events[g] = p, s._eventsCount++), s;
    }
    function o(s, c) {
      --s._eventsCount === 0 ? s._events = new n() : delete s._events[c];
    }
    function u() {
      this._events = new n(), this._eventsCount = 0;
    }
    u.prototype.eventNames = function() {
      var c = [], l, f;
      if (this._eventsCount === 0) return c;
      for (f in l = this._events)
        t.call(l, f) && c.push(r ? f.slice(1) : f);
      return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(l)) : c;
    }, u.prototype.listeners = function(c) {
      var l = r ? r + c : c, f = this._events[l];
      if (!f) return [];
      if (f.fn) return [f.fn];
      for (var h = 0, p = f.length, g = new Array(p); h < p; h++)
        g[h] = f[h].fn;
      return g;
    }, u.prototype.listenerCount = function(c) {
      var l = r ? r + c : c, f = this._events[l];
      return f ? f.fn ? 1 : f.length : 0;
    }, u.prototype.emit = function(c, l, f, h, p, g) {
      var y = r ? r + c : c;
      if (!this._events[y]) return !1;
      var m = this._events[y], E = arguments.length, v, T;
      if (m.fn) {
        switch (m.once && this.removeListener(c, m.fn, void 0, !0), E) {
          case 1:
            return m.fn.call(m.context), !0;
          case 2:
            return m.fn.call(m.context, l), !0;
          case 3:
            return m.fn.call(m.context, l, f), !0;
          case 4:
            return m.fn.call(m.context, l, f, h), !0;
          case 5:
            return m.fn.call(m.context, l, f, h, p), !0;
          case 6:
            return m.fn.call(m.context, l, f, h, p, g), !0;
        }
        for (T = 1, v = new Array(E - 1); T < E; T++)
          v[T - 1] = arguments[T];
        m.fn.apply(m.context, v);
      } else {
        var A = m.length, b;
        for (T = 0; T < A; T++)
          switch (m[T].once && this.removeListener(c, m[T].fn, void 0, !0), E) {
            case 1:
              m[T].fn.call(m[T].context);
              break;
            case 2:
              m[T].fn.call(m[T].context, l);
              break;
            case 3:
              m[T].fn.call(m[T].context, l, f);
              break;
            case 4:
              m[T].fn.call(m[T].context, l, f, h);
              break;
            default:
              if (!v) for (b = 1, v = new Array(E - 1); b < E; b++)
                v[b - 1] = arguments[b];
              m[T].fn.apply(m[T].context, v);
          }
      }
      return !0;
    }, u.prototype.on = function(c, l, f) {
      return i(this, c, l, f, !1);
    }, u.prototype.once = function(c, l, f) {
      return i(this, c, l, f, !0);
    }, u.prototype.removeListener = function(c, l, f, h) {
      var p = r ? r + c : c;
      if (!this._events[p]) return this;
      if (!l)
        return o(this, p), this;
      var g = this._events[p];
      if (g.fn)
        g.fn === l && (!h || g.once) && (!f || g.context === f) && o(this, p);
      else {
        for (var y = 0, m = [], E = g.length; y < E; y++)
          (g[y].fn !== l || h && !g[y].once || f && g[y].context !== f) && m.push(g[y]);
        m.length ? this._events[p] = m.length === 1 ? m[0] : m : o(this, p);
      }
      return this;
    }, u.prototype.removeAllListeners = function(c) {
      var l;
      return c ? (l = r ? r + c : c, this._events[l] && o(this, l)) : (this._events = new n(), this._eventsCount = 0), this;
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, e.exports = u;
  })(kd)), kd.exports;
}
var qU = HU();
const WU = /* @__PURE__ */ xe(qU);
var Bd = new WU(), jd = "recharts.syncMouseEvents";
function qi(e) {
  "@babel/helpers - typeof";
  return qi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, qi(e);
}
function YU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function zU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, GS(n.key), n);
  }
}
function GU(e, t, r) {
  return t && zU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Fd(e, t, r) {
  return t = GS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function GS(e) {
  var t = KU(e, "string");
  return qi(t) == "symbol" ? t : t + "";
}
function KU(e, t) {
  if (qi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (qi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var VU = /* @__PURE__ */ (function() {
  function e() {
    YU(this, e), Fd(this, "activeIndex", 0), Fd(this, "coordinateList", []), Fd(this, "layout", "horizontal");
  }
  return GU(e, [{
    key: "setDetails",
    value: function(r) {
      var n, a = r.coordinateList, i = a === void 0 ? null : a, o = r.container, u = o === void 0 ? null : o, s = r.layout, c = s === void 0 ? null : s, l = r.offset, f = l === void 0 ? null : l, h = r.mouseHandlerCallback, p = h === void 0 ? null : h;
      this.coordinateList = (n = i ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = u ?? this.container, this.layout = c ?? this.layout, this.offset = f ?? this.offset, this.mouseHandlerCallback = p ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
    }
  }, {
    key: "focus",
    value: function() {
      this.spoofMouse();
    }
  }, {
    key: "keyboardEvent",
    value: function(r) {
      if (this.coordinateList.length !== 0)
        switch (r.key) {
          case "ArrowRight": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1), this.spoofMouse();
            break;
          }
          case "ArrowLeft": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.max(this.activeIndex - 1, 0), this.spoofMouse();
            break;
          }
        }
    }
  }, {
    key: "setIndex",
    value: function(r) {
      this.activeIndex = r;
    }
  }, {
    key: "spoofMouse",
    value: function() {
      var r, n;
      if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
        var a = this.container.getBoundingClientRect(), i = a.x, o = a.y, u = a.height, s = this.coordinateList[this.activeIndex].coordinate, c = ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0, l = ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0, f = i + s + c, h = o + this.offset.top + u / 2 + l;
        this.mouseHandlerCallback({
          pageX: f,
          pageY: h
        });
      }
    }
  }]);
})();
function XU(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e?.[0], a = e?.[1];
    if (n && a && J(n) && J(a))
      return !0;
  }
  return !1;
}
function QU(e, t, r, n) {
  var a = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - a : r.left + 0.5,
    y: e === "horizontal" ? r.top + 0.5 : t.y - a,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  };
}
function KS(e) {
  var t = e.cx, r = e.cy, n = e.radius, a = e.startAngle, i = e.endAngle, o = Ne(t, r, n, a), u = Ne(t, r, n, i);
  return {
    points: [o, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: a,
    endAngle: i
  };
}
function ZU(e, t, r) {
  var n, a, i, o;
  if (e === "horizontal")
    n = t.x, i = n, a = r.top, o = r.top + r.height;
  else if (e === "vertical")
    a = t.y, o = a, n = r.left, i = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var u = t.cx, s = t.cy, c = t.innerRadius, l = t.outerRadius, f = t.angle, h = Ne(u, s, c, f), p = Ne(u, s, l, f);
      n = h.x, a = h.y, i = p.x, o = p.y;
    } else
      return KS(t);
  return [{
    x: n,
    y: a
  }, {
    x: i,
    y: o
  }];
}
function Wi(e) {
  "@babel/helpers - typeof";
  return Wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wi(e);
}
function AT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Oo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? AT(Object(r), !0).forEach(function(n) {
      JU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : AT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function JU(e, t, r) {
  return t = eH(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function eH(e) {
  var t = tH(e, "string");
  return Wi(t) == "symbol" ? t : t + "";
}
function tH(e, t) {
  if (Wi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function rH(e) {
  var t, r, n = e.element, a = e.tooltipEventType, i = e.isActive, o = e.activeCoordinate, u = e.activePayload, s = e.offset, c = e.activeTooltipIndex, l = e.tooltipAxisBandSize, f = e.layout, h = e.chartName, p = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !p || !i || !o || h !== "ScatterChart" && a !== "axis")
    return null;
  var g, y = jh;
  if (h === "ScatterChart")
    g = o, y = Bj;
  else if (h === "BarChart")
    g = QU(f, o, s, l), y = C0;
  else if (f === "radial") {
    var m = KS(o), E = m.cx, v = m.cy, T = m.radius, A = m.startAngle, b = m.endAngle;
    g = {
      cx: E,
      cy: v,
      startAngle: A,
      endAngle: b,
      innerRadius: T,
      outerRadius: T
    }, y = VO;
  } else
    g = {
      points: ZU(f, o, s)
    }, y = jh;
  var _ = Oo(Oo(Oo(Oo({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), g), le(p, !1)), {}, {
    payload: u,
    payloadIndex: c,
    className: pe("recharts-tooltip-cursor", p.className)
  });
  return /* @__PURE__ */ Lt(p) ? /* @__PURE__ */ Ue(p, _) : /* @__PURE__ */ oi(y, _);
}
var nH = ["item"], aH = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function Ea(e) {
  "@babel/helpers - typeof";
  return Ea = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ea(e);
}
function qn() {
  return qn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qn.apply(this, arguments);
}
function OT(e, t) {
  return uH(e) || oH(e, t) || XS(e, t) || iH();
}
function iH() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function oH(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (c) throw a;
      }
    }
    return u;
  }
}
function uH(e) {
  if (Array.isArray(e)) return e;
}
function ST(e, t) {
  if (e == null) return {};
  var r = sH(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function sH(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function cH(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function lH(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, QS(n.key), n);
  }
}
function fH(e, t, r) {
  return t && lH(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function dH(e, t, r) {
  return t = Mu(t), hH(e, VS() ? Reflect.construct(t, r || [], Mu(e).constructor) : t.apply(e, r));
}
function hH(e, t) {
  if (t && (Ea(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return pH(e);
}
function pH(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function VS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (VS = function() {
    return !!e;
  })();
}
function Mu(e) {
  return Mu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Mu(e);
}
function mH(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && yp(e, t);
}
function yp(e, t) {
  return yp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, yp(e, t);
}
function Ta(e) {
  return gH(e) || bH(e) || XS(e) || yH();
}
function yH() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function XS(e, t) {
  if (e) {
    if (typeof e == "string") return bp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return bp(e, t);
  }
}
function bH(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function gH(e) {
  if (Array.isArray(e)) return bp(e);
}
function bp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function xT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function H(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xT(Object(r), !0).forEach(function(n) {
      se(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function se(e, t, r) {
  return t = QS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QS(e) {
  var t = vH(e, "string");
  return Ea(t) == "symbol" ? t : t + "";
}
function vH(e, t) {
  if (Ea(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ea(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var EH = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, TH = {
  width: "100%",
  height: "100%"
}, ZS = {
  x: 0,
  y: 0
};
function So(e) {
  return e;
}
var _H = function(t, r) {
  return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius;
}, AH = function(t, r, n, a) {
  var i = r.find(function(l) {
    return l && l.index === n;
  });
  if (i) {
    if (t === "horizontal")
      return {
        x: i.coordinate,
        y: a.y
      };
    if (t === "vertical")
      return {
        x: a.x,
        y: i.coordinate
      };
    if (t === "centric") {
      var o = i.coordinate, u = a.radius;
      return H(H(H({}, a), Ne(a.cx, a.cy, u, o)), {}, {
        angle: o,
        radius: u
      });
    }
    var s = i.coordinate, c = a.angle;
    return H(H(H({}, a), Ne(a.cx, a.cy, s, c)), {}, {
      angle: c,
      radius: s
    });
  }
  return ZS;
}, Ss = function(t, r) {
  var n = r.graphicalItems, a = r.dataStartIndex, i = r.dataEndIndex, o = (n ?? []).reduce(function(u, s) {
    var c = s.props.data;
    return c && c.length ? [].concat(Ta(u), Ta(c)) : u;
  }, []);
  return o.length > 0 ? o : t && t.length && J(a) && J(i) ? t.slice(a, i + 1) : [];
};
function JS(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var gp = function(t, r, n, a) {
  var i = t.graphicalItems, o = t.tooltipAxis, u = Ss(r, t);
  return n < 0 || !i || !i.length || n >= u.length ? null : i.reduce(function(s, c) {
    var l, f = (l = c.props.data) !== null && l !== void 0 ? l : r;
    f && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= n && (f = f.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var h;
    if (o.dataKey && !o.allowDuplicatedCategory) {
      var p = f === void 0 ? u : f;
      h = Jd(p, o.dataKey, a);
    } else
      h = f && f[n] || u[n];
    return h ? [].concat(Ta(s), [qO(c, h)]) : s;
  }, []);
}, wT = function(t, r, n, a) {
  var i = a || {
    x: t.chartX,
    y: t.chartY
  }, o = _H(i, n), u = t.orderedTooltipTicks, s = t.tooltipAxis, c = t.tooltipTicks, l = J4(o, u, c, s);
  if (l >= 0 && c) {
    var f = c[l] && c[l].value, h = gp(t, r, l, f), p = AH(n, u, l, i);
    return {
      activeTooltipIndex: l,
      activeLabel: f,
      activePayload: h,
      activeCoordinate: p
    };
  }
  return null;
}, OH = function(t, r) {
  var n = r.axes, a = r.graphicalItems, i = r.axisType, o = r.axisIdKey, u = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.layout, f = t.children, h = t.stackOffset, p = BO(l, i);
  return n.reduce(function(g, y) {
    var m, E = y.type.defaultProps !== void 0 ? H(H({}, y.type.defaultProps), y.props) : y.props, v = E.type, T = E.dataKey, A = E.allowDataOverflow, b = E.allowDuplicatedCategory, _ = E.scale, O = E.ticks, I = E.includeHidden, N = E[o];
    if (g[N])
      return g;
    var j = Ss(t.data, {
      graphicalItems: a.filter(function(z) {
        var Z, ne = o in z.props ? z.props[o] : (Z = z.type.defaultProps) === null || Z === void 0 ? void 0 : Z[o];
        return ne === N;
      }),
      dataStartIndex: s,
      dataEndIndex: c
    }), D = j.length, R, B, F;
    XU(E.domain, A, v) && (R = Dh(E.domain, null, A), p && (v === "number" || _ !== "auto") && (F = ri(j, T, "category")));
    var $ = JS(v);
    if (!R || R.length === 0) {
      var q, Y = (q = E.domain) !== null && q !== void 0 ? q : $;
      if (T) {
        if (R = ri(j, T, v), v === "category" && p) {
          var Q = zN(R);
          b && Q ? (B = R, R = Tu(0, D)) : b || (R = _1(Y, R, y).reduce(function(z, Z) {
            return z.indexOf(Z) >= 0 ? z : [].concat(Ta(z), [Z]);
          }, []));
        } else if (v === "category")
          b ? R = R.filter(function(z) {
            return z !== "" && !me(z);
          }) : R = _1(Y, R, y).reduce(function(z, Z) {
            return z.indexOf(Z) >= 0 || Z === "" || me(Z) ? z : [].concat(Ta(z), [Z]);
          }, []);
        else if (v === "number") {
          var te = a8(j, a.filter(function(z) {
            var Z, ne, oe = o in z.props ? z.props[o] : (Z = z.type.defaultProps) === null || Z === void 0 ? void 0 : Z[o], ue = "hide" in z.props ? z.props.hide : (ne = z.type.defaultProps) === null || ne === void 0 ? void 0 : ne.hide;
            return oe === N && (I || !ue);
          }), T, i, l);
          te && (R = te);
        }
        p && (v === "number" || _ !== "auto") && (F = ri(j, T, "category"));
      } else p ? R = Tu(0, D) : u && u[N] && u[N].hasStack && v === "number" ? R = h === "expand" ? [0, 1] : HO(u[N].stackGroups, s, c) : R = kO(j, a.filter(function(z) {
        var Z = o in z.props ? z.props[o] : z.type.defaultProps[o], ne = "hide" in z.props ? z.props.hide : z.type.defaultProps.hide;
        return Z === N && (I || !ne);
      }), v, l, !0);
      if (v === "number")
        R = mp(f, R, N, i, O), Y && (R = Dh(Y, R, A));
      else if (v === "category" && Y) {
        var k = Y, W = R.every(function(z) {
          return k.indexOf(z) >= 0;
        });
        W && (R = k);
      }
    }
    return H(H({}, g), {}, se({}, N, H(H({}, E), {}, {
      axisType: i,
      domain: R,
      categoricalDomain: F,
      duplicateDomain: B,
      originalDomain: (m = E.domain) !== null && m !== void 0 ? m : $,
      isCategorical: p,
      layout: l
    })));
  }, {});
}, SH = function(t, r) {
  var n = r.graphicalItems, a = r.Axis, i = r.axisType, o = r.axisIdKey, u = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.layout, f = t.children, h = Ss(t.data, {
    graphicalItems: n,
    dataStartIndex: s,
    dataEndIndex: c
  }), p = h.length, g = BO(l, i), y = -1;
  return n.reduce(function(m, E) {
    var v = E.type.defaultProps !== void 0 ? H(H({}, E.type.defaultProps), E.props) : E.props, T = v[o], A = JS("number");
    if (!m[T]) {
      y++;
      var b;
      return g ? b = Tu(0, p) : u && u[T] && u[T].hasStack ? (b = HO(u[T].stackGroups, s, c), b = mp(f, b, T, i)) : (b = Dh(A, kO(h, n.filter(function(_) {
        var O, I, N = o in _.props ? _.props[o] : (O = _.type.defaultProps) === null || O === void 0 ? void 0 : O[o], j = "hide" in _.props ? _.props.hide : (I = _.type.defaultProps) === null || I === void 0 ? void 0 : I.hide;
        return N === T && !j;
      }), "number", l), a.defaultProps.allowDataOverflow), b = mp(f, b, T, i)), H(H({}, m), {}, se({}, T, H(H({
        axisType: i
      }, a.defaultProps), {}, {
        hide: !0,
        orientation: xt(EH, "".concat(i, ".").concat(y % 2), null),
        domain: b,
        originalDomain: A,
        isCategorical: g,
        layout: l
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      })));
    }
    return m;
  }, {});
}, xH = function(t, r) {
  var n = r.axisType, a = n === void 0 ? "xAxis" : n, i = r.AxisComp, o = r.graphicalItems, u = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.children, f = "".concat(a, "Id"), h = jt(l, i), p = {};
  return h && h.length ? p = OH(t, {
    axes: h,
    graphicalItems: o,
    axisType: a,
    axisIdKey: f,
    stackGroups: u,
    dataStartIndex: s,
    dataEndIndex: c
  }) : o && o.length && (p = SH(t, {
    Axis: i,
    graphicalItems: o,
    axisType: a,
    axisIdKey: f,
    stackGroups: u,
    dataStartIndex: s,
    dataEndIndex: c
  })), p;
}, wH = function(t) {
  var r = kr(t), n = mr(r, !1, !0);
  return {
    tooltipTicks: n,
    orderedTooltipTicks: r0(n, function(a) {
      return a.coordinate;
    }),
    tooltipAxis: r,
    tooltipAxisBandSize: uu(r, n)
  };
}, PT = function(t) {
  var r = t.children, n = t.defaultShowTooltip, a = At(r, fa), i = 0, o = 0;
  return t.data && t.data.length !== 0 && (o = t.data.length - 1), a && a.props && (a.props.startIndex >= 0 && (i = a.props.startIndex), a.props.endIndex >= 0 && (o = a.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: i,
    dataEndIndex: o,
    activeTooltipIndex: -1,
    isTooltipActive: !!n
  };
}, PH = function(t) {
  return !t || !t.length ? !1 : t.some(function(r) {
    var n = vr(r && r.type);
    return n && n.indexOf("Bar") >= 0;
  });
}, IT = function(t) {
  return t === "horizontal" ? {
    numericAxisName: "yAxis",
    cateAxisName: "xAxis"
  } : t === "vertical" ? {
    numericAxisName: "xAxis",
    cateAxisName: "yAxis"
  } : t === "centric" ? {
    numericAxisName: "radiusAxis",
    cateAxisName: "angleAxis"
  } : {
    numericAxisName: "angleAxis",
    cateAxisName: "radiusAxis"
  };
}, IH = function(t, r) {
  var n = t.props, a = t.graphicalItems, i = t.xAxisMap, o = i === void 0 ? {} : i, u = t.yAxisMap, s = u === void 0 ? {} : u, c = n.width, l = n.height, f = n.children, h = n.margin || {}, p = At(f, fa), g = At(f, Hr), y = Object.keys(s).reduce(function(b, _) {
    var O = s[_], I = O.orientation;
    return !O.mirror && !O.hide ? H(H({}, b), {}, se({}, I, b[I] + O.width)) : b;
  }, {
    left: h.left || 0,
    right: h.right || 0
  }), m = Object.keys(o).reduce(function(b, _) {
    var O = o[_], I = O.orientation;
    return !O.mirror && !O.hide ? H(H({}, b), {}, se({}, I, xt(b, "".concat(I)) + O.height)) : b;
  }, {
    top: h.top || 0,
    bottom: h.bottom || 0
  }), E = H(H({}, m), y), v = E.bottom;
  p && (E.bottom += p.props.height || fa.defaultProps.height), g && r && (E = r8(E, a, n, r));
  var T = c - E.left - E.right, A = l - E.top - E.bottom;
  return H(H({
    brushBottom: v
  }, E), {}, {
    // never return negative values for height and width
    width: Math.max(T, 0),
    height: Math.max(A, 0)
  });
}, CH = function(t, r) {
  if (r === "xAxis")
    return t[r].width;
  if (r === "yAxis")
    return t[r].height;
}, ex = function(t) {
  var r = t.chartName, n = t.GraphicalChild, a = t.defaultTooltipEventType, i = a === void 0 ? "axis" : a, o = t.validateTooltipEventTypes, u = o === void 0 ? ["axis"] : o, s = t.axisComponents, c = t.legendContent, l = t.formatAxisMap, f = t.defaultProps, h = function(E, v) {
    var T = v.graphicalItems, A = v.stackGroups, b = v.offset, _ = v.updateId, O = v.dataStartIndex, I = v.dataEndIndex, N = E.barSize, j = E.layout, D = E.barGap, R = E.barCategoryGap, B = E.maxBarSize, F = IT(j), $ = F.numericAxisName, q = F.cateAxisName, Y = PH(T), Q = [];
    return T.forEach(function(te, k) {
      var W = Ss(E.data, {
        graphicalItems: [te],
        dataStartIndex: O,
        dataEndIndex: I
      }), z = te.type.defaultProps !== void 0 ? H(H({}, te.type.defaultProps), te.props) : te.props, Z = z.dataKey, ne = z.maxBarSize, oe = z["".concat($, "Id")], ue = z["".concat(q, "Id")], fe = {}, ce = s.reduce(function(Qr, cr) {
        var Ps, Is, Cs = v["".concat(cr.axisType, "Map")], U0 = z["".concat(cr.axisType, "Id")];
        Cs && Cs[U0] || cr.axisType === "zAxis" || (process.env.NODE_ENV !== "production" ? vt(!1, "Specifying a(n) ".concat(cr.axisType, "Id requires a corresponding ").concat(
          cr.axisType,
          "Id on the targeted graphical component "
        ).concat((Ps = te == null || (Is = te.type) === null || Is === void 0 ? void 0 : Is.displayName) !== null && Ps !== void 0 ? Ps : "")) : vt());
        var H0 = Cs[U0];
        return H(H({}, Qr), {}, se(se({}, cr.axisType, H0), "".concat(cr.axisType, "Ticks"), mr(H0)));
      }, fe), G = ce[q], re = ce["".concat(q, "Ticks")], ie = A && A[oe] && A[oe].hasStack && h8(te, A[oe].stackGroups), M = vr(te.type).indexOf("Bar") >= 0, ye = uu(G, re), X = [], Pe = Y && e8({
        barSize: N,
        stackGroups: A,
        totalSize: CH(ce, q)
      });
      if (M) {
        var De, et, Cr = me(ne) ? B : ne, Cn = (De = (et = uu(G, re, !0)) !== null && et !== void 0 ? et : Cr) !== null && De !== void 0 ? De : 0;
        X = t8({
          barGap: D,
          barCategoryGap: R,
          bandSize: Cn !== ye ? Cn : ye,
          sizeList: Pe[ue],
          maxBarSize: Cr
        }), Cn !== ye && (X = X.map(function(Qr) {
          return H(H({}, Qr), {}, {
            position: H(H({}, Qr.position), {}, {
              offset: Qr.position.offset - Cn / 2
            })
          });
        }));
      }
      var ao = te && te.type && te.type.getComposedData;
      ao && Q.push({
        props: H(H({}, ao(H(H({}, ce), {}, {
          displayedData: W,
          props: E,
          dataKey: Z,
          item: te,
          bandSize: ye,
          barPosition: X,
          offset: b,
          stackedData: ie,
          layout: j,
          dataStartIndex: O,
          dataEndIndex: I
        }))), {}, se(se(se({
          key: te.key || "item-".concat(k)
        }, $, ce[$]), q, ce[q]), "animationId", _)),
        childIndex: a3(te, E.children),
        item: te
      });
    }), Q;
  }, p = function(E, v) {
    var T = E.props, A = E.dataStartIndex, b = E.dataEndIndex, _ = E.updateId;
    if (!By({
      props: T
    }))
      return null;
    var O = T.children, I = T.layout, N = T.stackOffset, j = T.data, D = T.reverseStackOrder, R = IT(I), B = R.numericAxisName, F = R.cateAxisName, $ = jt(O, n), q = f8(j, $, "".concat(B, "Id"), "".concat(F, "Id"), N, D), Y = s.reduce(function(z, Z) {
      var ne = "".concat(Z.axisType, "Map");
      return H(H({}, z), {}, se({}, ne, xH(T, H(H({}, Z), {}, {
        graphicalItems: $,
        stackGroups: Z.axisType === B && q,
        dataStartIndex: A,
        dataEndIndex: b
      }))));
    }, {}), Q = IH(H(H({}, Y), {}, {
      props: T,
      graphicalItems: $
    }), v?.legendBBox);
    Object.keys(Y).forEach(function(z) {
      Y[z] = l(T, Y[z], Q, z.replace("Map", ""), r);
    });
    var te = Y["".concat(F, "Map")], k = wH(te), W = h(T, H(H({}, Y), {}, {
      dataStartIndex: A,
      dataEndIndex: b,
      updateId: _,
      graphicalItems: $,
      stackGroups: q,
      offset: Q
    }));
    return H(H({
      formattedGraphicalItems: W,
      graphicalItems: $,
      offset: Q,
      stackGroups: q
    }, k), Y);
  }, g = /* @__PURE__ */ (function(m) {
    function E(v) {
      var T, A, b;
      return cH(this, E), b = dH(this, E, [v]), se(b, "eventEmitterSymbol", /* @__PURE__ */ Symbol("rechartsEventEmitter")), se(b, "accessibilityManager", new VU()), se(b, "handleLegendBBoxUpdate", function(_) {
        if (_) {
          var O = b.state, I = O.dataStartIndex, N = O.dataEndIndex, j = O.updateId;
          b.setState(H({
            legendBBox: _
          }, p({
            props: b.props,
            dataStartIndex: I,
            dataEndIndex: N,
            updateId: j
          }, H(H({}, b.state), {}, {
            legendBBox: _
          }))));
        }
      }), se(b, "handleReceiveSyncEvent", function(_, O, I) {
        if (b.props.syncId === _) {
          if (I === b.eventEmitterSymbol && typeof b.props.syncMethod != "function")
            return;
          b.applySyncEvent(O);
        }
      }), se(b, "handleBrushChange", function(_) {
        var O = _.startIndex, I = _.endIndex;
        if (O !== b.state.dataStartIndex || I !== b.state.dataEndIndex) {
          var N = b.state.updateId;
          b.setState(function() {
            return H({
              dataStartIndex: O,
              dataEndIndex: I
            }, p({
              props: b.props,
              dataStartIndex: O,
              dataEndIndex: I,
              updateId: N
            }, b.state));
          }), b.triggerSyncEvent({
            dataStartIndex: O,
            dataEndIndex: I
          });
        }
      }), se(b, "handleMouseEnter", function(_) {
        var O = b.getMouseInfo(_);
        if (O) {
          var I = H(H({}, O), {}, {
            isTooltipActive: !0
          });
          b.setState(I), b.triggerSyncEvent(I);
          var N = b.props.onMouseEnter;
          de(N) && N(I, _);
        }
      }), se(b, "triggeredAfterMouseMove", function(_) {
        var O = b.getMouseInfo(_), I = O ? H(H({}, O), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        b.setState(I), b.triggerSyncEvent(I);
        var N = b.props.onMouseMove;
        de(N) && N(I, _);
      }), se(b, "handleItemMouseEnter", function(_) {
        b.setState(function() {
          return {
            isTooltipActive: !0,
            activeItem: _,
            activePayload: _.tooltipPayload,
            activeCoordinate: _.tooltipPosition || {
              x: _.cx,
              y: _.cy
            }
          };
        });
      }), se(b, "handleItemMouseLeave", function() {
        b.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), se(b, "handleMouseMove", function(_) {
        _.persist(), b.throttleTriggeredAfterMouseMove(_);
      }), se(b, "handleMouseLeave", function(_) {
        b.throttleTriggeredAfterMouseMove.cancel();
        var O = {
          isTooltipActive: !1
        };
        b.setState(O), b.triggerSyncEvent(O);
        var I = b.props.onMouseLeave;
        de(I) && I(O, _);
      }), se(b, "handleOuterEvent", function(_) {
        var O = n3(_), I = xt(b.props, "".concat(O));
        if (O && de(I)) {
          var N, j;
          /.*touch.*/i.test(O) ? j = b.getMouseInfo(_.changedTouches[0]) : j = b.getMouseInfo(_), I((N = j) !== null && N !== void 0 ? N : {}, _);
        }
      }), se(b, "handleClick", function(_) {
        var O = b.getMouseInfo(_);
        if (O) {
          var I = H(H({}, O), {}, {
            isTooltipActive: !0
          });
          b.setState(I), b.triggerSyncEvent(I);
          var N = b.props.onClick;
          de(N) && N(I, _);
        }
      }), se(b, "handleMouseDown", function(_) {
        var O = b.props.onMouseDown;
        if (de(O)) {
          var I = b.getMouseInfo(_);
          O(I, _);
        }
      }), se(b, "handleMouseUp", function(_) {
        var O = b.props.onMouseUp;
        if (de(O)) {
          var I = b.getMouseInfo(_);
          O(I, _);
        }
      }), se(b, "handleTouchMove", function(_) {
        _.changedTouches != null && _.changedTouches.length > 0 && b.throttleTriggeredAfterMouseMove(_.changedTouches[0]);
      }), se(b, "handleTouchStart", function(_) {
        _.changedTouches != null && _.changedTouches.length > 0 && b.handleMouseDown(_.changedTouches[0]);
      }), se(b, "handleTouchEnd", function(_) {
        _.changedTouches != null && _.changedTouches.length > 0 && b.handleMouseUp(_.changedTouches[0]);
      }), se(b, "handleDoubleClick", function(_) {
        var O = b.props.onDoubleClick;
        if (de(O)) {
          var I = b.getMouseInfo(_);
          O(I, _);
        }
      }), se(b, "handleContextMenu", function(_) {
        var O = b.props.onContextMenu;
        if (de(O)) {
          var I = b.getMouseInfo(_);
          O(I, _);
        }
      }), se(b, "triggerSyncEvent", function(_) {
        b.props.syncId !== void 0 && Bd.emit(jd, b.props.syncId, _, b.eventEmitterSymbol);
      }), se(b, "applySyncEvent", function(_) {
        var O = b.props, I = O.layout, N = O.syncMethod, j = b.state.updateId, D = _.dataStartIndex, R = _.dataEndIndex;
        if (_.dataStartIndex !== void 0 || _.dataEndIndex !== void 0)
          b.setState(H({
            dataStartIndex: D,
            dataEndIndex: R
          }, p({
            props: b.props,
            dataStartIndex: D,
            dataEndIndex: R,
            updateId: j
          }, b.state)));
        else if (_.activeTooltipIndex !== void 0) {
          var B = _.chartX, F = _.chartY, $ = _.activeTooltipIndex, q = b.state, Y = q.offset, Q = q.tooltipTicks;
          if (!Y)
            return;
          if (typeof N == "function")
            $ = N(Q, _);
          else if (N === "value") {
            $ = -1;
            for (var te = 0; te < Q.length; te++)
              if (Q[te].value === _.activeLabel) {
                $ = te;
                break;
              }
          }
          var k = H(H({}, Y), {}, {
            x: Y.left,
            y: Y.top
          }), W = Math.min(B, k.x + k.width), z = Math.min(F, k.y + k.height), Z = Q[$] && Q[$].value, ne = gp(b.state, b.props.data, $), oe = Q[$] ? {
            x: I === "horizontal" ? Q[$].coordinate : W,
            y: I === "horizontal" ? z : Q[$].coordinate
          } : ZS;
          b.setState(H(H({}, _), {}, {
            activeLabel: Z,
            activeCoordinate: oe,
            activePayload: ne,
            activeTooltipIndex: $
          }));
        } else
          b.setState(_);
      }), se(b, "renderCursor", function(_) {
        var O, I = b.state, N = I.isTooltipActive, j = I.activeCoordinate, D = I.activePayload, R = I.offset, B = I.activeTooltipIndex, F = I.tooltipAxisBandSize, $ = b.getTooltipEventType(), q = (O = _.props.active) !== null && O !== void 0 ? O : N, Y = b.props.layout, Q = _.key || "_recharts-cursor";
        return /* @__PURE__ */ C.createElement(rH, {
          key: Q,
          activeCoordinate: j,
          activePayload: D,
          activeTooltipIndex: B,
          chartName: r,
          element: _,
          isActive: q,
          layout: Y,
          offset: R,
          tooltipAxisBandSize: F,
          tooltipEventType: $
        });
      }), se(b, "renderPolarAxis", function(_, O, I) {
        var N = xt(_, "type.axisType"), j = xt(b.state, "".concat(N, "Map")), D = _.type.defaultProps, R = D !== void 0 ? H(H({}, D), _.props) : _.props, B = j && j[R["".concat(N, "Id")]];
        return /* @__PURE__ */ Ue(_, H(H({}, B), {}, {
          className: pe(N, B.className),
          key: _.key || "".concat(O, "-").concat(I),
          ticks: mr(B, !0)
        }));
      }), se(b, "renderPolarGrid", function(_) {
        var O = _.props, I = O.radialLines, N = O.polarAngles, j = O.polarRadius, D = b.state, R = D.radiusAxisMap, B = D.angleAxisMap, F = kr(R), $ = kr(B), q = $.cx, Y = $.cy, Q = $.innerRadius, te = $.outerRadius;
        return /* @__PURE__ */ Ue(_, {
          polarAngles: Array.isArray(N) ? N : mr($, !0).map(function(k) {
            return k.coordinate;
          }),
          polarRadius: Array.isArray(j) ? j : mr(F, !0).map(function(k) {
            return k.coordinate;
          }),
          cx: q,
          cy: Y,
          innerRadius: Q,
          outerRadius: te,
          key: _.key || "polar-grid",
          radialLines: I
        });
      }), se(b, "renderLegend", function() {
        var _ = b.state.formattedGraphicalItems, O = b.props, I = O.children, N = O.width, j = O.height, D = b.props.margin || {}, R = N - (D.left || 0) - (D.right || 0), B = MO({
          children: I,
          formattedGraphicalItems: _,
          legendWidth: R,
          legendContent: c
        });
        if (!B)
          return null;
        var F = B.item, $ = ST(B, nH);
        return /* @__PURE__ */ Ue(F, H(H({}, $), {}, {
          chartWidth: N,
          chartHeight: j,
          margin: D,
          onBBoxUpdate: b.handleLegendBBoxUpdate
        }));
      }), se(b, "renderTooltip", function() {
        var _, O = b.props, I = O.children, N = O.accessibilityLayer, j = At(I, yt);
        if (!j)
          return null;
        var D = b.state, R = D.isTooltipActive, B = D.activeCoordinate, F = D.activePayload, $ = D.activeLabel, q = D.offset, Y = (_ = j.props.active) !== null && _ !== void 0 ? _ : R;
        return /* @__PURE__ */ Ue(j, {
          viewBox: H(H({}, q), {}, {
            x: q.left,
            y: q.top
          }),
          active: Y,
          label: $,
          payload: Y ? F : [],
          coordinate: B,
          accessibilityLayer: N
        });
      }), se(b, "renderBrush", function(_) {
        var O = b.props, I = O.margin, N = O.data, j = b.state, D = j.offset, R = j.dataStartIndex, B = j.dataEndIndex, F = j.updateId;
        return /* @__PURE__ */ Ue(_, {
          key: _.key || "_recharts-brush",
          onChange: vo(b.handleBrushChange, _.props.onChange),
          data: N,
          x: J(_.props.x) ? _.props.x : D.left,
          y: J(_.props.y) ? _.props.y : D.top + D.height + D.brushBottom - (I.bottom || 0),
          width: J(_.props.width) ? _.props.width : D.width,
          startIndex: R,
          endIndex: B,
          updateId: "brush-".concat(F)
        });
      }), se(b, "renderReferenceElement", function(_, O, I) {
        if (!_)
          return null;
        var N = b, j = N.clipPathId, D = b.state, R = D.xAxisMap, B = D.yAxisMap, F = D.offset, $ = _.type.defaultProps || {}, q = _.props, Y = q.xAxisId, Q = Y === void 0 ? $.xAxisId : Y, te = q.yAxisId, k = te === void 0 ? $.yAxisId : te;
        return /* @__PURE__ */ Ue(_, {
          key: _.key || "".concat(O, "-").concat(I),
          xAxis: R[Q],
          yAxis: B[k],
          viewBox: {
            x: F.left,
            y: F.top,
            width: F.width,
            height: F.height
          },
          clipPathId: j
        });
      }), se(b, "renderActivePoints", function(_) {
        var O = _.item, I = _.activePoint, N = _.basePoint, j = _.childIndex, D = _.isRange, R = [], B = O.props.key, F = O.item.type.defaultProps !== void 0 ? H(H({}, O.item.type.defaultProps), O.item.props) : O.item.props, $ = F.activeDot, q = F.dataKey, Y = H(H({
          index: j,
          dataKey: q,
          cx: I.x,
          cy: I.y,
          r: 4,
          fill: P0(O.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: I.payload,
          value: I.value
        }, le($, !1)), ko($));
        return R.push(E.renderActiveDot($, Y, "".concat(B, "-activePoint-").concat(j))), N ? R.push(E.renderActiveDot($, H(H({}, Y), {}, {
          cx: N.x,
          cy: N.y
        }), "".concat(B, "-basePoint-").concat(j))) : D && R.push(null), R;
      }), se(b, "renderGraphicChild", function(_, O, I) {
        var N = b.filterFormatItem(_, O, I);
        if (!N)
          return null;
        var j = b.getTooltipEventType(), D = b.state, R = D.isTooltipActive, B = D.tooltipAxis, F = D.activeTooltipIndex, $ = D.activeLabel, q = b.props.children, Y = At(q, yt), Q = N.props, te = Q.points, k = Q.isRange, W = Q.baseLine, z = N.item.type.defaultProps !== void 0 ? H(H({}, N.item.type.defaultProps), N.item.props) : N.item.props, Z = z.activeDot, ne = z.hide, oe = z.activeBar, ue = z.activeShape, fe = !!(!ne && R && Y && (Z || oe || ue)), ce = {};
        j !== "axis" && Y && Y.props.trigger === "click" ? ce = {
          onClick: vo(b.handleItemMouseEnter, _.props.onClick)
        } : j !== "axis" && (ce = {
          onMouseLeave: vo(b.handleItemMouseLeave, _.props.onMouseLeave),
          onMouseEnter: vo(b.handleItemMouseEnter, _.props.onMouseEnter)
        });
        var G = /* @__PURE__ */ Ue(_, H(H({}, N.props), ce));
        function re(cr) {
          return typeof B.dataKey == "function" ? B.dataKey(cr.payload) : null;
        }
        if (fe)
          if (F >= 0) {
            var ie, M;
            if (B.dataKey && !B.allowDuplicatedCategory) {
              var ye = typeof B.dataKey == "function" ? re : "payload.".concat(B.dataKey.toString());
              ie = Jd(te, ye, $), M = k && W && Jd(W, ye, $);
            } else
              ie = te?.[F], M = k && W && W[F];
            if (ue || oe) {
              var X = _.props.activeIndex !== void 0 ? _.props.activeIndex : F;
              return [/* @__PURE__ */ Ue(_, H(H(H({}, N.props), ce), {}, {
                activeIndex: X
              })), null, null];
            }
            if (!me(ie))
              return [G].concat(Ta(b.renderActivePoints({
                item: N,
                activePoint: ie,
                basePoint: M,
                childIndex: F,
                isRange: k
              })));
          } else {
            var Pe, De = (Pe = b.getItemByXY(b.state.activeCoordinate)) !== null && Pe !== void 0 ? Pe : {
              graphicalItem: G
            }, et = De.graphicalItem, Cr = et.item, Cn = Cr === void 0 ? _ : Cr, ao = et.childIndex, Qr = H(H(H({}, N.props), ce), {}, {
              activeIndex: ao
            });
            return [/* @__PURE__ */ Ue(Cn, Qr), null, null];
          }
        return k ? [G, null, null] : [G, null];
      }), se(b, "renderCustomized", function(_, O, I) {
        return /* @__PURE__ */ Ue(_, H(H({
          key: "recharts-customized-".concat(I)
        }, b.props), b.state));
      }), se(b, "renderMap", {
        CartesianGrid: {
          handler: So,
          once: !0
        },
        ReferenceArea: {
          handler: b.renderReferenceElement
        },
        ReferenceLine: {
          handler: So
        },
        ReferenceDot: {
          handler: b.renderReferenceElement
        },
        XAxis: {
          handler: So
        },
        YAxis: {
          handler: So
        },
        Brush: {
          handler: b.renderBrush,
          once: !0
        },
        Bar: {
          handler: b.renderGraphicChild
        },
        Line: {
          handler: b.renderGraphicChild
        },
        Area: {
          handler: b.renderGraphicChild
        },
        Radar: {
          handler: b.renderGraphicChild
        },
        RadialBar: {
          handler: b.renderGraphicChild
        },
        Scatter: {
          handler: b.renderGraphicChild
        },
        Pie: {
          handler: b.renderGraphicChild
        },
        Funnel: {
          handler: b.renderGraphicChild
        },
        Tooltip: {
          handler: b.renderCursor,
          once: !0
        },
        PolarGrid: {
          handler: b.renderPolarGrid,
          once: !0
        },
        PolarAngleAxis: {
          handler: b.renderPolarAxis
        },
        PolarRadiusAxis: {
          handler: b.renderPolarAxis
        },
        Customized: {
          handler: b.renderCustomized
        }
      }), b.clipPathId = "".concat((T = v.id) !== null && T !== void 0 ? T : Xi("recharts"), "-clip"), b.throttleTriggeredAfterMouseMove = MA(b.triggeredAfterMouseMove, (A = v.throttleDelay) !== null && A !== void 0 ? A : 1e3 / 60), b.state = {}, b;
    }
    return mH(E, m), fH(E, [{
      key: "componentDidMount",
      value: function() {
        var T, A;
        this.addListener(), this.accessibilityManager.setDetails({
          container: this.container,
          offset: {
            left: (T = this.props.margin.left) !== null && T !== void 0 ? T : 0,
            top: (A = this.props.margin.top) !== null && A !== void 0 ? A : 0
          },
          coordinateList: this.state.tooltipTicks,
          mouseHandlerCallback: this.triggeredAfterMouseMove,
          layout: this.props.layout
        }), this.displayDefaultTooltip();
      }
    }, {
      key: "displayDefaultTooltip",
      value: function() {
        var T = this.props, A = T.children, b = T.data, _ = T.height, O = T.layout, I = At(A, yt);
        if (I) {
          var N = I.props.defaultIndex;
          if (!(typeof N != "number" || N < 0 || N > this.state.tooltipTicks.length - 1)) {
            var j = this.state.tooltipTicks[N] && this.state.tooltipTicks[N].value, D = gp(this.state, b, N, j), R = this.state.tooltipTicks[N].coordinate, B = (this.state.offset.top + _) / 2, F = O === "horizontal", $ = F ? {
              x: R,
              y: B
            } : {
              y: R,
              x: B
            }, q = this.state.formattedGraphicalItems.find(function(Q) {
              var te = Q.item;
              return te.type.name === "Scatter";
            });
            q && ($ = H(H({}, $), q.props.points[N].tooltipPosition), D = q.props.points[N].tooltipPayload);
            var Y = {
              activeTooltipIndex: N,
              isTooltipActive: !0,
              activeLabel: j,
              activePayload: D,
              activeCoordinate: $
            };
            this.setState(Y), this.renderCursor(I), this.accessibilityManager.setIndex(N);
          }
        }
      }
    }, {
      key: "getSnapshotBeforeUpdate",
      value: function(T, A) {
        if (!this.props.accessibilityLayer)
          return null;
        if (this.state.tooltipTicks !== A.tooltipTicks && this.accessibilityManager.setDetails({
          coordinateList: this.state.tooltipTicks
        }), this.props.layout !== T.layout && this.accessibilityManager.setDetails({
          layout: this.props.layout
        }), this.props.margin !== T.margin) {
          var b, _;
          this.accessibilityManager.setDetails({
            offset: {
              left: (b = this.props.margin.left) !== null && b !== void 0 ? b : 0,
              top: (_ = this.props.margin.top) !== null && _ !== void 0 ? _ : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function(T) {
        th([At(T.children, yt)], [At(this.props.children, yt)]) || this.displayDefaultTooltip();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function() {
        var T = At(this.props.children, yt);
        if (T && typeof T.props.shared == "boolean") {
          var A = T.props.shared ? "axis" : "item";
          return u.indexOf(A) >= 0 ? A : i;
        }
        return i;
      }
      /**
       * Get the information of mouse in chart, return null when the mouse is not in the chart
       * @param  {MousePointer} event    The event object
       * @return {Object}          Mouse data
       */
    }, {
      key: "getMouseInfo",
      value: function(T) {
        if (!this.container)
          return null;
        var A = this.container, b = A.getBoundingClientRect(), _ = Y6(b), O = {
          chartX: Math.round(T.pageX - _.left),
          chartY: Math.round(T.pageY - _.top)
        }, I = b.width / A.offsetWidth || 1, N = this.inRange(O.chartX, O.chartY, I);
        if (!N)
          return null;
        var j = this.state, D = j.xAxisMap, R = j.yAxisMap, B = this.getTooltipEventType(), F = wT(this.state, this.props.data, this.props.layout, N);
        if (B !== "axis" && D && R) {
          var $ = kr(D).scale, q = kr(R).scale, Y = $ && $.invert ? $.invert(O.chartX) : null, Q = q && q.invert ? q.invert(O.chartY) : null;
          return H(H({}, O), {}, {
            xValue: Y,
            yValue: Q
          }, F);
        }
        return F ? H(H({}, O), F) : null;
      }
    }, {
      key: "inRange",
      value: function(T, A) {
        var b = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, _ = this.props.layout, O = T / b, I = A / b;
        if (_ === "horizontal" || _ === "vertical") {
          var N = this.state.offset, j = O >= N.left && O <= N.left + N.width && I >= N.top && I <= N.top + N.height;
          return j ? {
            x: O,
            y: I
          } : null;
        }
        var D = this.state, R = D.angleAxisMap, B = D.radiusAxisMap;
        if (R && B) {
          var F = kr(R);
          return S1({
            x: O,
            y: I
          }, F);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var T = this.props.children, A = this.getTooltipEventType(), b = At(T, yt), _ = {};
        b && A === "axis" && (b.props.trigger === "click" ? _ = {
          onClick: this.handleClick
        } : _ = {
          onMouseEnter: this.handleMouseEnter,
          onDoubleClick: this.handleDoubleClick,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onContextMenu: this.handleContextMenu
        });
        var O = ko(this.props, this.handleOuterEvent);
        return H(H({}, O), _);
      }
    }, {
      key: "addListener",
      value: function() {
        Bd.on(jd, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        Bd.removeListener(jd, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(T, A, b) {
        for (var _ = this.state.formattedGraphicalItems, O = 0, I = _.length; O < I; O++) {
          var N = _[O];
          if (N.item === T || N.props.key === T.key || A === vr(N.item.type) && b === N.childIndex)
            return N;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var T = this.clipPathId, A = this.state.offset, b = A.left, _ = A.top, O = A.height, I = A.width;
        return /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("clipPath", {
          id: T
        }, /* @__PURE__ */ C.createElement("rect", {
          x: b,
          y: _,
          height: O,
          width: I
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var T = this.state.xAxisMap;
        return T ? Object.entries(T).reduce(function(A, b) {
          var _ = OT(b, 2), O = _[0], I = _[1];
          return H(H({}, A), {}, se({}, O, I.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var T = this.state.yAxisMap;
        return T ? Object.entries(T).reduce(function(A, b) {
          var _ = OT(b, 2), O = _[0], I = _[1];
          return H(H({}, A), {}, se({}, O, I.scale));
        }, {}) : null;
      }
    }, {
      key: "getXScaleByAxisId",
      value: function(T) {
        var A;
        return (A = this.state.xAxisMap) === null || A === void 0 || (A = A[T]) === null || A === void 0 ? void 0 : A.scale;
      }
    }, {
      key: "getYScaleByAxisId",
      value: function(T) {
        var A;
        return (A = this.state.yAxisMap) === null || A === void 0 || (A = A[T]) === null || A === void 0 ? void 0 : A.scale;
      }
    }, {
      key: "getItemByXY",
      value: function(T) {
        var A = this.state, b = A.formattedGraphicalItems, _ = A.activeItem;
        if (b && b.length)
          for (var O = 0, I = b.length; O < I; O++) {
            var N = b[O], j = N.props, D = N.item, R = D.type.defaultProps !== void 0 ? H(H({}, D.type.defaultProps), D.props) : D.props, B = vr(D.type);
            if (B === "Bar") {
              var F = (j.data || []).find(function(Q) {
                return bj(T, Q);
              });
              if (F)
                return {
                  graphicalItem: N,
                  payload: F
                };
            } else if (B === "RadialBar") {
              var $ = (j.data || []).find(function(Q) {
                return S1(T, Q);
              });
              if ($)
                return {
                  graphicalItem: N,
                  payload: $
                };
            } else if (gs(N, _) || vs(N, _) || Fi(N, _)) {
              var q = $F({
                graphicalItem: N,
                activeTooltipItem: _,
                itemData: R.data
              }), Y = R.activeIndex === void 0 ? q : R.activeIndex;
              return {
                graphicalItem: H(H({}, N), {}, {
                  childIndex: Y
                }),
                payload: Fi(N, _) ? R.data[q] : N.props.data[q]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var T = this;
        if (!By(this))
          return null;
        var A = this.props, b = A.children, _ = A.className, O = A.width, I = A.height, N = A.style, j = A.compact, D = A.title, R = A.desc, B = ST(A, aH), F = le(B, !1);
        if (j)
          return /* @__PURE__ */ C.createElement(sT, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ C.createElement(nh, qn({}, F, {
            width: O,
            height: I,
            title: D,
            desc: R
          }), this.renderClipPath(), Fy(b, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var $, q;
          F.tabIndex = ($ = this.props.tabIndex) !== null && $ !== void 0 ? $ : 0, F.role = (q = this.props.role) !== null && q !== void 0 ? q : "application", F.onKeyDown = function(Q) {
            T.accessibilityManager.keyboardEvent(Q);
          }, F.onFocus = function() {
            T.accessibilityManager.focus();
          };
        }
        var Y = this.parseEventsOfWrapper();
        return /* @__PURE__ */ C.createElement(sT, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ C.createElement("div", qn({
          className: pe("recharts-wrapper", _),
          style: H({
            position: "relative",
            cursor: "default",
            width: O,
            height: I
          }, N)
        }, Y, {
          ref: function(te) {
            T.container = te;
          }
        }), /* @__PURE__ */ C.createElement(nh, qn({}, F, {
          width: O,
          height: I,
          title: D,
          desc: R,
          style: TH
        }), this.renderClipPath(), Fy(b, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  })(kT);
  se(g, "displayName", r), se(g, "defaultProps", H({
    layout: "horizontal",
    stackOffset: "none",
    barCategoryGap: "10%",
    barGap: 4,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    reverseStackOrder: !1,
    syncMethod: "index"
  }, f)), se(g, "getDerivedStateFromProps", function(m, E) {
    var v = m.dataKey, T = m.data, A = m.children, b = m.width, _ = m.height, O = m.layout, I = m.stackOffset, N = m.margin, j = E.dataStartIndex, D = E.dataEndIndex;
    if (E.updateId === void 0) {
      var R = PT(m);
      return H(H(H({}, R), {}, {
        updateId: 0
      }, p(H(H({
        props: m
      }, R), {}, {
        updateId: 0
      }), E)), {}, {
        prevDataKey: v,
        prevData: T,
        prevWidth: b,
        prevHeight: _,
        prevLayout: O,
        prevStackOffset: I,
        prevMargin: N,
        prevChildren: A
      });
    }
    if (v !== E.prevDataKey || T !== E.prevData || b !== E.prevWidth || _ !== E.prevHeight || O !== E.prevLayout || I !== E.prevStackOffset || !Yn(N, E.prevMargin)) {
      var B = PT(m), F = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: E.chartX,
        chartY: E.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: E.isTooltipActive
      }, $ = H(H({}, wT(E, T, O)), {}, {
        updateId: E.updateId + 1
      }), q = H(H(H({}, B), F), $);
      return H(H(H({}, q), p(H({
        props: m
      }, q), E)), {}, {
        prevDataKey: v,
        prevData: T,
        prevWidth: b,
        prevHeight: _,
        prevLayout: O,
        prevStackOffset: I,
        prevMargin: N,
        prevChildren: A
      });
    }
    if (!th(A, E.prevChildren)) {
      var Y, Q, te, k, W = At(A, fa), z = W && (Y = (Q = W.props) === null || Q === void 0 ? void 0 : Q.startIndex) !== null && Y !== void 0 ? Y : j, Z = W && (te = (k = W.props) === null || k === void 0 ? void 0 : k.endIndex) !== null && te !== void 0 ? te : D, ne = z !== j || Z !== D, oe = !me(T), ue = oe && !ne ? E.updateId : E.updateId + 1;
      return H(H({
        updateId: ue
      }, p(H(H({
        props: m
      }, E), {}, {
        updateId: ue,
        dataStartIndex: z,
        dataEndIndex: Z
      }), E)), {}, {
        prevChildren: A,
        dataStartIndex: z,
        dataEndIndex: Z
      });
    }
    return null;
  }), se(g, "renderActiveDot", function(m, E, v) {
    var T;
    return /* @__PURE__ */ Lt(m) ? T = /* @__PURE__ */ Ue(m, E) : de(m) ? T = m(E) : T = /* @__PURE__ */ C.createElement(N0, E), /* @__PURE__ */ C.createElement(Oe, {
      className: "recharts-active-dot",
      key: v
    }, T);
  });
  var y = /* @__PURE__ */ LT(function(E, v) {
    return /* @__PURE__ */ C.createElement(g, qn({}, E, {
      ref: v
    }));
  });
  return y.displayName = g.displayName, y;
}, xs = ex({
  chartName: "BarChart",
  GraphicalChild: sr,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Pn
  }, {
    axisType: "yAxis",
    AxisComp: In
  }],
  formatAxisMap: q9
}), NH = ex({
  chartName: "PieChart",
  GraphicalChild: Ir,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: bs
  }, {
    axisType: "radiusAxis",
    AxisComp: ms
  }],
  formatAxisMap: A8,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
const RH = "funding", DH = ["Source", "Grants", "Total (GBP)"], MH = [32, 10, 18], LH = ["text", "number", "currency"], Kn = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0
});
function B7({ content: e, block: t }) {
  const r = An(RH), { members: n, activeLabel: a } = zr(e), i = e?.title || "Funding received", o = BH(n), u = o.reduce((c, l) => c + l.total, 0);
  ct(
    t,
    "xlsx",
    r && o.length > 0 ? {
      title: "Funding",
      headers: DH,
      data: o.map(({ source: c, count: l, total: f }) => [c, l, f]),
      columnWidths: MH,
      numberFormats: LH,
      totals: ["Total", "sum", "sum"]
    } : null
  );
  const s = o.reduce((c, l) => c + l.count, 0);
  return ct(
    t,
    "docx",
    r && o.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ P(
        Bt,
        {
          as: "h2",
          data: i,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(_a, { widths: [55, 15, 30], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ ee(rt, { header: !0, children: [
          /* @__PURE__ */ P(he, { children: "Source" }),
          /* @__PURE__ */ P(he, { children: "Grants" }),
          /* @__PURE__ */ P(he, { children: "Total (GBP)" })
        ] }),
        o.map(({ source: c, count: l, total: f }, h) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { children: c }),
          /* @__PURE__ */ P(he, { children: String(l) }),
          /* @__PURE__ */ P(he, { children: Kn.format(f) })
        ] }, h)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ P(he, { emphasis: !0, children: String(s) }),
          /* @__PURE__ */ P(he, { emphasis: !0, children: Kn.format(u) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: i }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    o.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No funding records for the selected population." }) : /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
        "Grand total: ",
        /* @__PURE__ */ P("strong", { children: Kn.format(u) }),
        " across",
        " ",
        o.reduce((c, l) => c + l.count, 0),
        " grants from",
        " ",
        o.length,
        " ",
        o.length === 1 ? "source" : "sources",
        "."
      ] }),
      /* @__PURE__ */ P(kH, { rows: o })
    ] })
  ] }) : null;
}
function kH({ rows: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((i) => ({ name: i.source, total: i.total })), a = Math.max(240, n.length * 56);
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Zi, { width: "100%", height: a, children: /* @__PURE__ */ ee(
    xs,
    {
      data: n,
      layout: "vertical",
      margin: { top: 8, right: 80, bottom: 8, left: 16 },
      children: [
        /* @__PURE__ */ P(no, { strokeDasharray: "3 3", stroke: "var(--border)" }),
        /* @__PURE__ */ P(
          Pn,
          {
            type: "number",
            tickFormatter: (i) => Kn.format(i),
            tick: { fontSize: 11 }
          }
        ),
        /* @__PURE__ */ P(
          In,
          {
            type: "category",
            dataKey: "name",
            width: 200,
            tick: { fontSize: 12 }
          }
        ),
        /* @__PURE__ */ P(
          yt,
          {
            formatter: (i) => Kn.format(i),
            contentStyle: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem"
            }
          }
        ),
        /* @__PURE__ */ P(sr, { dataKey: "total", fill: "#be123c", radius: [0, 4, 4, 0], children: /* @__PURE__ */ P(
          Gt,
          {
            dataKey: "total",
            position: "right",
            formatter: (i) => Kn.format(i)
          }
        ) })
      ]
    }
  ) }) });
}
function BH(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e) {
    const n = Array.isArray(r.funding) ? r.funding : [];
    for (const a of n) {
      const i = (a.source || "Unknown").trim(), o = Number(a.amount) || 0;
      t.has(i) || t.set(i, { source: i, count: 0, total: 0 });
      const u = t.get(i);
      u.count += 1, u.total += o;
    }
  }
  return [...t.values()].sort(
    (r, n) => n.total - r.total || r.source.localeCompare(n.source)
  );
}
const jH = "members", $d = ["Name", "Rank", "Department", "Tenured", "Start year"], FH = [28, 14, 18, 10, 12], $H = ["text", "text", "text", "text", "number"];
function j7({ content: e, block: t }) {
  const r = An(jH), { members: n, activeLabel: a } = zr(e), i = e?.title || "Members", o = [...n].sort((s, c) => {
    const l = s?.name || "", f = c?.name || "";
    return l.localeCompare(f);
  }), u = o.map((s) => [
    s.name || "",
    s.rank || "",
    s.department || "",
    s.tenured ? "Yes" : "No",
    Number(s.start_year) || null
  ]);
  return ct(
    t,
    "xlsx",
    r ? {
      title: "Members",
      headers: $d,
      data: u,
      columnWidths: FH,
      numberFormats: $H
    } : null
  ), ct(
    t,
    "docx",
    r ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ P(
        Bt,
        {
          as: "h2",
          data: i,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(_a, { widths: [32, 16, 22, 12, 18], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ P(rt, { header: !0, children: $d.map((s) => /* @__PURE__ */ P(he, { children: s }, s)) }),
        u.map((s, c) => /* @__PURE__ */ P(rt, { children: s.map((l, f) => /* @__PURE__ */ P(he, { children: l == null ? "" : String(l) }, f)) }, c))
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "members", children: [
    /* @__PURE__ */ P("h2", { className: "members-title", children: i }),
    a && /* @__PURE__ */ ee("p", { className: "members-query-note", children: [
      "Showing ",
      n.length,
      " members matching ",
      /* @__PURE__ */ P("em", { children: a }),
      "."
    ] }),
    n.length === 0 ? /* @__PURE__ */ P("p", { className: "members-empty", children: "No members match the selected population." }) : /* @__PURE__ */ ee("table", { className: "members-table", children: [
      /* @__PURE__ */ P("thead", { children: /* @__PURE__ */ P("tr", { children: $d.map((s) => /* @__PURE__ */ P("th", { children: s }, s)) }) }),
      /* @__PURE__ */ P("tbody", { children: o.map((s) => /* @__PURE__ */ ee("tr", { children: [
        /* @__PURE__ */ P("td", { children: s.name }),
        /* @__PURE__ */ P("td", { children: s.rank }),
        /* @__PURE__ */ P("td", { children: s.department }),
        /* @__PURE__ */ P("td", { className: s.tenured ? "status-yes" : "status-no", children: s.tenured ? "Yes" : "No" }),
        /* @__PURE__ */ P("td", { className: "numeric", children: s.start_year || "" })
      ] }, s.slug || s.name)) })
    ] })
  ] }) : null;
}
function ws(e, t = {}) {
  const { dateRange: r, refereedOnly: n } = t, a = r?.start != null ? Number(r.start) : null, i = r?.end != null && r.end !== "" ? Number(r.end) : null;
  return Array.isArray(e) ? e.filter((o) => {
    if (n && o?.refereed !== !0) return !1;
    if (a == null && i == null) return !0;
    const u = Number(o?.year);
    return !(!Number.isFinite(u) || a != null && u < a || i != null && u > i);
  }) : [];
}
function UH(e, t = {}) {
  if (!Array.isArray(e)) return [];
  const r = [];
  for (const n of e) {
    const a = ws(n?.publications, t);
    for (const i of a)
      r.push({ ...i, _author: n?.name || n?.slug || "Unknown" });
  }
  return r;
}
const HH = "publications-by-journal", qH = 10, WH = ["Venue", "Count"], YH = [48, 10], zH = ["text", "number"];
function F7({ content: e, block: t }) {
  const r = An(HH), { members: n, activeLabel: a } = zr(e), [i] = Gi(), o = e?.title || "Publications by journal", u = KH(n, qH, i);
  ct(
    t,
    "xlsx",
    r && u.length > 0 ? {
      title: "Publications by Journal",
      headers: WH,
      data: u.map(({ venue: c, count: l }) => [c, l]),
      columnWidths: YH,
      numberFormats: zH,
      totals: ["Total", "sum"]
    } : null
  );
  const s = u.reduce((c, l) => c + l.count, 0);
  return ct(
    t,
    "docx",
    r && u.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ P(
        Bt,
        {
          as: "h2",
          data: o,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(_a, { widths: [82, 18], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ ee(rt, { header: !0, children: [
          /* @__PURE__ */ P(he, { children: "Venue" }),
          /* @__PURE__ */ P(he, { children: "Count" })
        ] }),
        u.map(({ venue: c, count: l }, f) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { children: c }),
          /* @__PURE__ */ P(he, { children: String(l) })
        ] }, f)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ P(he, { emphasis: !0, children: String(s) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: o }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    u.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No publications in the selected population." }) : /* @__PURE__ */ P(GH, { counts: u })
  ] }) : null;
}
function GH({ counts: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((i) => ({ name: i.venue, value: i.count })), a = Math.max(240, n.length * 44);
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Zi, { width: "100%", height: a, children: /* @__PURE__ */ ee(
    xs,
    {
      data: n,
      layout: "vertical",
      margin: { top: 8, right: 32, bottom: 8, left: 16 },
      children: [
        /* @__PURE__ */ P(no, { strokeDasharray: "3 3", stroke: "var(--border)" }),
        /* @__PURE__ */ P(Pn, { type: "number", allowDecimals: !1 }),
        /* @__PURE__ */ P(
          In,
          {
            type: "category",
            dataKey: "name",
            width: 240,
            tick: { fontSize: 12 }
          }
        ),
        /* @__PURE__ */ P(
          yt,
          {
            contentStyle: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem"
            }
          }
        ),
        /* @__PURE__ */ P(sr, { dataKey: "value", fill: "#1e40af", radius: [0, 4, 4, 0], children: /* @__PURE__ */ P(Gt, { dataKey: "value", position: "right" }) })
      ]
    }
  ) }) });
}
function KH(e, t, r) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = ws(a.publications, r);
    for (const o of i) {
      const u = (o.journal || o.publisher || "Unknown").trim();
      u && n.set(u, (n.get(u) || 0) + 1);
    }
  }
  return [...n.entries()].map(([a, i]) => ({ venue: a, count: i })).sort((a, i) => i.count - a.count || a.venue.localeCompare(i.venue)).slice(0, t);
}
const VH = "publications-by-type", CT = [
  "#1e40af",
  // primary
  "#be123c",
  // accent
  "#0f766e",
  // teal
  "#9333ea",
  // violet
  "#ea580c",
  // orange
  "#0ea5e9",
  // sky
  "#64748b"
  // slate (fallback)
], XH = ["Publication type", "Count"], QH = [24, 10], ZH = ["text", "number"];
function $7({ content: e, block: t }) {
  const r = An(VH), { members: n, activeLabel: a } = zr(e), [i] = Gi(), o = e?.title || "Publications by type", u = e7(n, i);
  ct(
    t,
    "xlsx",
    r && u.length > 0 ? {
      title: "Publications by Type",
      headers: XH,
      data: u.map(({ type: c, count: l }) => [vp(c), l]),
      columnWidths: QH,
      numberFormats: ZH,
      totals: ["Total", "sum"]
    } : null
  );
  const s = u.reduce((c, l) => c + l.count, 0);
  return ct(
    t,
    "docx",
    r && u.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ P(
        Bt,
        {
          as: "h2",
          data: o,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(_a, { widths: [70, 30], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ ee(rt, { header: !0, children: [
          /* @__PURE__ */ P(he, { children: "Publication type" }),
          /* @__PURE__ */ P(he, { children: "Count" })
        ] }),
        u.map(({ type: c, count: l }, f) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { children: vp(c) }),
          /* @__PURE__ */ P(he, { children: String(l) })
        ] }, f)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ P(he, { emphasis: !0, children: String(s) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: o }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    u.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No publications for the selected population." }) : /* @__PURE__ */ P(JH, { counts: u })
  ] }) : null;
}
function JH({ counts: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map(({ type: a, count: i }) => ({
    name: vp(a),
    value: i
  }));
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Zi, { width: "100%", height: 320, children: /* @__PURE__ */ ee(NH, { children: [
    /* @__PURE__ */ P(
      Ir,
      {
        data: n,
        dataKey: "value",
        nameKey: "name",
        cx: "50%",
        cy: "50%",
        innerRadius: 60,
        outerRadius: 110,
        paddingAngle: 2,
        stroke: "var(--card)",
        strokeWidth: 2,
        label: ({ name: a, value: i }) => `${a} (${i})`,
        children: n.map((a, i) => /* @__PURE__ */ P(es, { fill: CT[i % CT.length] }, i))
      }
    ),
    /* @__PURE__ */ P(
      yt,
      {
        contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem"
        }
      }
    ),
    /* @__PURE__ */ P(
      Hr,
      {
        verticalAlign: "bottom",
        height: 36,
        wrapperStyle: { fontSize: "0.875rem" }
      }
    )
  ] }) }) });
}
function e7(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = ws(n.publications, t);
    for (const i of a) {
      const o = (i.type || "other").toLowerCase();
      r.set(o, (r.get(o) || 0) + 1);
    }
  }
  return [...r.entries()].map(([n, a]) => ({ type: n, count: a })).sort((n, a) => a.count - n.count);
}
function vp(e) {
  return String(e).charAt(0).toUpperCase() + String(e).slice(1);
}
const t7 = "publications-by-year", r7 = ["Year", "Count", "Cumulative"], n7 = [10, 10, 12], a7 = ["number", "number", "number"];
function U7({ content: e, block: t }) {
  const r = An(t7), { members: n, activeLabel: a } = zr(e), [i] = Gi(), o = e?.title || "Publications by year", { series: u, total: s } = o7(n, i);
  return ct(
    t,
    "xlsx",
    r && u.length > 0 ? {
      title: "Publications by Year",
      headers: r7,
      data: u.map((c) => [c.year, c.count, c.cumulative]),
      columnWidths: n7,
      numberFormats: a7,
      totals: ["Total", "sum", s]
    } : null
  ), ct(
    t,
    "docx",
    r && u.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ P(
        Bt,
        {
          as: "h2",
          data: o,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(_a, { widths: [30, 35, 35], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ ee(rt, { header: !0, children: [
          /* @__PURE__ */ P(he, { children: "Year" }),
          /* @__PURE__ */ P(he, { children: "Count" }),
          /* @__PURE__ */ P(he, { children: "Cumulative" })
        ] }),
        u.map((c, l) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { children: String(c.year) }),
          /* @__PURE__ */ P(he, { children: String(c.count) }),
          /* @__PURE__ */ P(he, { children: String(c.cumulative) })
        ] }, l)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ P(he, { emphasis: !0, children: String(s) }),
          /* @__PURE__ */ P(he, { emphasis: !0, children: String(s) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: o }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    u.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No publications in the selected population." }) : /* @__PURE__ */ P(i7, { series: u })
  ] }) : null;
}
function i7({ series: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((a) => ({ year: String(a.year), value: a.count }));
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Zi, { width: "100%", height: 320, children: /* @__PURE__ */ ee(xs, { data: n, margin: { top: 16, right: 16, bottom: 16, left: 0 }, children: [
    /* @__PURE__ */ P(no, { strokeDasharray: "3 3", stroke: "var(--border)" }),
    /* @__PURE__ */ P(Pn, { dataKey: "year", tick: { fontSize: 12 } }),
    /* @__PURE__ */ P(In, { allowDecimals: !1 }),
    /* @__PURE__ */ P(
      yt,
      {
        contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem"
        }
      }
    ),
    /* @__PURE__ */ P(sr, { dataKey: "value", fill: "#0f766e", radius: [4, 4, 0, 0], children: /* @__PURE__ */ P(Gt, { dataKey: "value", position: "top" }) })
  ] }) }) });
}
function o7(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (const i of e) {
    const o = ws(i.publications, t);
    for (const u of o) {
      const s = Number(u.year);
      Number.isFinite(s) && r.set(s, (r.get(s) || 0) + 1);
    }
  }
  const n = [...r.entries()].map(([i, o]) => ({ year: i, count: o })).sort((i, o) => i.year - o.year);
  let a = 0;
  for (const i of n)
    a += i.count, i.cumulative = a;
  return { series: n, total: a };
}
function u7(e) {
  const t = String(e || "").trim().split(/\s+/);
  if (t.length === 0) return { family: "Unknown", given: "" };
  if (t.length === 1) return { family: t[0], given: "" };
  const r = t[t.length - 1], n = t.slice(0, -1).join(" ");
  return { family: r, given: n };
}
function s7(e, { defaultAuthor: t } = {}) {
  if (!e) return null;
  const r = e.authors && e.authors.length ? e.authors : t ? [t] : [{ family: "Unknown", given: "" }], n = {
    id: e.id || `${(e.title || "pub").slice(0, 24)}-${e.year || "xx"}`,
    type: e.type || "book",
    title: e.title || "",
    author: r
  };
  return e.year != null && (n.issued = { "date-parts": [[Number(e.year) || e.year]] }), e.journal && (n["container-title"] = e.journal), e.publisher && (n.publisher = e.publisher), e.DOI && (n.DOI = e.DOI), n;
}
function c7(e) {
  return Array.isArray(e) ? e.map((t) => {
    const r = t._author ? u7(t._author) : void 0;
    return s7(t, { defaultAuthor: r });
  }).filter(Boolean) : [];
}
const l7 = "publications-list", NT = {
  apa: () => import("./apa-DFWazoZc.js"),
  mla: () => import("./mla-D135I5OW.js"),
  "chicago-author-date": () => import("./chicago-author-date-D8QH1iwN.js"),
  ieee: () => import("./ieee-CHRt3McI.js"),
  vancouver: () => import("./vancouver-C_ZYAEtz.js"),
  harvard: () => import("./harvard-fzOIiT6h.js"),
  nature: () => import("./nature-BgGht0BR.js")
}, Ud = /* @__PURE__ */ new Map();
async function f7(e) {
  if (Ud.has(e)) return Ud.get(e);
  const t = NT[e] || NT.apa, [{ formatAll: r }, n] = await Promise.all([
    import("./index-CxzhyvpC.js"),
    t()
  ]), a = { formatAll: r, style: n };
  return Ud.set(e, a), a;
}
function H7({ content: e, block: t }) {
  const r = An(l7), { members: n, activeLabel: a } = zr(e), [i] = Gi(), o = e?.title || "Publications", u = [...UH(n, i)].sort((y, m) => {
    const E = Number(y.year) || 0;
    return (Number(m.year) || 0) - E;
  }), s = c7(u), c = s.map((y) => y.id).join("|"), [l, f] = ft({ loading: !0, entries: [] });
  Et(() => {
    let y = !1;
    if (!r || s.length === 0) {
      f({ loading: !1, entries: [] });
      return;
    }
    return f7(i.citationStyle).then(({ formatAll: m, style: E }) => {
      if (!y)
        try {
          f({ loading: !1, entries: m(E, s) });
        } catch (v) {
          console.error("PublicationsList: formatAll failed", v), y || f({ loading: !1, entries: [] });
        }
    }).catch((m) => {
      console.error("PublicationsList: style load failed", m), y || f({ loading: !1, entries: [] });
    }), () => {
      y = !0;
    };
  }, [c, i.citationStyle, r]);
  const { loading: h, entries: p } = l;
  if (ct(
    t,
    "xlsx",
    r && p.length > 0 ? {
      title: "Publications",
      headers: ["Year", "Author", "Citation"],
      data: p.map((y, m) => {
        const E = u[m];
        return [
          Number(E?.year) || null,
          E?._author || "",
          y.text || ""
        ];
      }),
      columnWidths: [8, 24, 80],
      numberFormats: ["number", "text", "text"]
    } : null
  ), ct(
    t,
    "docx",
    r && p.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ P(
        Bt,
        {
          as: "h2",
          data: o,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      p.map((y, m) => /* @__PURE__ */ P(
        Bt,
        {
          data: y.text,
          "data-style": "bibliography",
          "data-spacing-after": 120
        },
        y.id || m
      ))
    ] }) : null
  ), !r) return null;
  const g = i.citationStyle.toUpperCase().replace(/-/g, " ");
  return /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: o }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    h && /* @__PURE__ */ P("p", { className: "chart-empty", children: "Loading citations…" }),
    !h && p.length === 0 && /* @__PURE__ */ P("p", { className: "chart-empty", children: "No publications match the current query + date range + refereed filter." }),
    !h && p.length > 0 && /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ P("ol", { className: "publications-list", children: p.map((y, m) => /* @__PURE__ */ P("li", { children: /* @__PURE__ */ P(
        WC,
        {
          as: "div",
          className: "csl-entry-wrapper",
          value: y.html
        }
      ) }, y.id || m)) }),
      /* @__PURE__ */ ee("p", { className: "publications-list-note", children: [
        p.length,
        " ",
        p.length === 1 ? "entry" : "entries",
        " · formatted via citestyle · ",
        g
      ] })
    ] })
  ] });
}
const d7 = "supervisions", RT = ["#1e40af", "#0f766e", "#ea580c", "#9333ea", "#be123c", "#0ea5e9"];
function q7({ content: e, block: t }) {
  const r = An(d7), { members: n, activeLabel: a } = zr(e), i = e?.title || "Supervisions", { levels: o, rows: u, grandTotal: s } = p7(n), c = ["Member", ...o.map(Ep), "Total"], l = u.map((v) => [
    v.member,
    ...o.map((T) => v.counts[T] || 0),
    v.total
  ]), f = [28, ...o.map(() => 12), 10], h = ["text", ...o.map(() => "number"), "number"], p = ["Total", ...o.map(() => "sum"), "sum"];
  ct(
    t,
    "xlsx",
    r && u.length > 0 ? {
      title: "Supervisions",
      headers: c,
      data: l,
      columnWidths: f,
      numberFormats: h,
      totals: p
    } : null
  );
  const g = o.length > 0 ? Math.floor(60 / o.length) : 60, y = [
    100 - g * o.length - 10,
    ...o.map(() => g),
    10
  ], m = o.map(
    (v) => u.reduce((T, A) => T + (A.counts[v] || 0), 0)
  ), E = u.reduce((v, T) => v + T.total, 0);
  return ct(
    t,
    "docx",
    r && u.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ P(
        Bt,
        {
          as: "h2",
          data: i,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(_a, { widths: y, borderColor: "cbd5e1", children: [
        /* @__PURE__ */ P(rt, { header: !0, children: c.map((v) => /* @__PURE__ */ P(he, { children: v }, v)) }),
        u.map((v, T) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { children: v.member }),
          o.map((A) => /* @__PURE__ */ P(he, { children: String(v.counts[A] || 0) }, A)),
          /* @__PURE__ */ P(he, { children: String(v.total) })
        ] }, T)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { emphasis: !0, children: "Total" }),
          m.map((v, T) => /* @__PURE__ */ P(he, { emphasis: !0, children: String(v) }, T)),
          /* @__PURE__ */ P(he, { emphasis: !0, children: String(E) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: i }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    u.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No supervisions recorded for the selected population." }) : /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
        "Grand total: ",
        /* @__PURE__ */ P("strong", { children: s }),
        " ",
        s === 1 ? "student" : "students",
        " across",
        " ",
        u.length,
        " ",
        u.length === 1 ? "supervisor" : "supervisors",
        "."
      ] }),
      /* @__PURE__ */ P(h7, { rows: u, levels: o })
    ] })
  ] }) : null;
}
function h7({ rows: e, levels: t }) {
  const [r, n] = ft(!1);
  if (Et(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const a = e.map((i) => {
    const o = { name: m7(i.member) };
    for (const u of t) o[Ep(u)] = i.counts[u] || 0;
    return o;
  });
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Zi, { width: "100%", height: 320, children: /* @__PURE__ */ ee(xs, { data: a, margin: { top: 16, right: 24, bottom: 16, left: 0 }, children: [
    /* @__PURE__ */ P(no, { strokeDasharray: "3 3", stroke: "var(--border)" }),
    /* @__PURE__ */ P(Pn, { dataKey: "name", tick: { fontSize: 12 } }),
    /* @__PURE__ */ P(In, { allowDecimals: !1 }),
    /* @__PURE__ */ P(
      yt,
      {
        contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem"
        }
      }
    ),
    /* @__PURE__ */ P(Hr, { wrapperStyle: { fontSize: "0.875rem" } }),
    t.map((i, o) => /* @__PURE__ */ P(
      sr,
      {
        dataKey: Ep(i),
        stackId: "supervision",
        fill: RT[o % RT.length],
        radius: o === t.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]
      },
      i
    ))
  ] }) }) });
}
function p7(e) {
  const t = /* @__PURE__ */ new Set(), r = [];
  let n = 0;
  for (const o of e) {
    const u = Array.isArray(o.supervisions) ? o.supervisions : [];
    if (u.length === 0) continue;
    const s = {};
    for (const c of u) {
      const l = (c.level || "other").toLowerCase();
      t.add(l), s[l] = (s[l] || 0) + 1;
    }
    r.push({
      member: o.name || o.slug || "Unknown",
      counts: s,
      total: u.length
    }), n += u.length;
  }
  const a = /* @__PURE__ */ new Map();
  for (const o of r)
    for (const [u, s] of Object.entries(o.counts))
      a.set(u, (a.get(u) || 0) + s);
  const i = [...t].sort(
    (o, u) => (a.get(u) || 0) - (a.get(o) || 0) || o.localeCompare(u)
  );
  return r.sort((o, u) => u.total - o.total || o.member.localeCompare(u.member)), { levels: i, rows: r, grandTotal: n };
}
function Ep(e) {
  return String(e).charAt(0).toUpperCase() + String(e).slice(1);
}
function m7(e) {
  const t = String(e).trim().split(/\s+/);
  return t.length <= 1 ? e : `${t[0][0]}. ${t[t.length - 1]}`;
}
function y7({ queries: e = [] }) {
  const [t, r] = Mp(), [, n] = Lp(), a = (i) => {
    r(i), n(null);
  };
  return /* @__PURE__ */ ee("div", { className: "query-selector", children: [
    /* @__PURE__ */ P("label", { className: "query-selector-label", htmlFor: "academic-metrics-query", children: "Population" }),
    /* @__PURE__ */ ee(
      "select",
      {
        id: "academic-metrics-query",
        className: "query-selector-control",
        value: t,
        onChange: (i) => a(i.target.value),
        children: [
          /* @__PURE__ */ P("option", { value: M_, children: "All members" }),
          e.map((i) => /* @__PURE__ */ P("option", { value: i.slug, children: i.name || i.slug }, i.slug))
        ]
      }
    )
  ] });
}
const b7 = "members";
function g7() {
  const e = YC(b7), [, t] = Mp(), [r, n] = Lp(), [a, i] = ft(() => MT(r, e));
  if (Et(() => {
    i(MT(r, e));
  }, [e]), !e) return null;
  const o = (c, l) => {
    const f = { ...a, [c]: l };
    i(f);
    const h = E7(f, e);
    n(h), h && t(M_);
  }, u = () => {
    i({}), n(null);
  }, s = r && Object.keys(r).length > 0;
  return /* @__PURE__ */ ee("fieldset", { className: "filter-panel", children: [
    /* @__PURE__ */ P("legend", { className: "filter-panel-legend", children: "Filter members" }),
    Object.entries(e).map(([c, l]) => /* @__PURE__ */ P(
      v7,
      {
        field: c,
        def: l,
        value: a[c],
        onChange: (f) => o(c, f)
      },
      c
    )),
    /* @__PURE__ */ P(
      "button",
      {
        type: "button",
        className: "filter-panel-reset",
        onClick: u,
        disabled: !s,
        children: "Reset filters"
      }
    )
  ] });
}
function v7({ field: e, def: t, value: r, onChange: n }) {
  const a = t?.label || e;
  switch (t?.type) {
    case "enum":
      return /* @__PURE__ */ P(xo, { label: a, field: e, children: /* @__PURE__ */ ee(
        "select",
        {
          id: `filter-${e}`,
          value: r ?? "",
          onChange: (i) => n(i.target.value || void 0),
          children: [
            /* @__PURE__ */ P("option", { value: "", children: "Any" }),
            (t.options || []).map((i) => /* @__PURE__ */ P("option", { value: i, children: i }, i))
          ]
        }
      ) });
    case "boolean":
      return /* @__PURE__ */ P(xo, { label: a, field: e, children: /* @__PURE__ */ ee(
        "select",
        {
          id: `filter-${e}`,
          value: r === void 0 ? "" : String(r),
          onChange: (i) => {
            const o = i.target.value;
            n(o === "" ? void 0 : o === "true");
          },
          children: [
            /* @__PURE__ */ P("option", { value: "", children: "Any" }),
            /* @__PURE__ */ P("option", { value: "true", children: "Yes" }),
            /* @__PURE__ */ P("option", { value: "false", children: "No" })
          ]
        }
      ) });
    case "range":
      return /* @__PURE__ */ P(xo, { label: a, field: e, children: /* @__PURE__ */ ee("div", { className: "filter-range", children: [
        /* @__PURE__ */ P(
          "input",
          {
            type: "number",
            min: t.min,
            max: t.max,
            placeholder: t.min != null ? String(t.min) : "min",
            value: r?.min ?? "",
            onChange: (i) => {
              const o = i.target.value === "" ? void 0 : Number(i.target.value);
              n(DT(r, "min", o));
            }
          }
        ),
        /* @__PURE__ */ P("span", { "aria-hidden": "true", children: "–" }),
        /* @__PURE__ */ P(
          "input",
          {
            type: "number",
            min: t.min,
            max: t.max,
            placeholder: t.max != null ? String(t.max) : "max",
            value: r?.max ?? "",
            onChange: (i) => {
              const o = i.target.value === "" ? void 0 : Number(i.target.value);
              n(DT(r, "max", o));
            }
          }
        )
      ] }) });
    case "text":
      return /* @__PURE__ */ P(xo, { label: a, field: e, children: /* @__PURE__ */ P(
        "input",
        {
          type: "text",
          id: `filter-${e}`,
          placeholder: t.placeholder || "",
          value: r ?? "",
          onChange: (i) => n(i.target.value || void 0)
        }
      ) });
    default:
      return null;
  }
}
function xo({ label: e, field: t, children: r }) {
  return /* @__PURE__ */ ee("div", { className: "filter-row", children: [
    /* @__PURE__ */ P("label", { className: "filter-label", htmlFor: `filter-${t}`, children: e }),
    r
  ] });
}
function DT(e, t, r) {
  const n = { ...e || {} };
  return r === void 0 ? delete n[t] : n[t] = r, Object.keys(n).length === 0 ? void 0 : n;
}
function E7(e, t) {
  if (!e || !t) return null;
  const r = {};
  for (const [n, a] of Object.entries(t)) {
    const i = e[n];
    if (!(i == null || i === ""))
      if (a.type === "range") {
        const o = {};
        typeof i.min == "number" && (o.gte = i.min), typeof i.max == "number" && (o.lte = i.max), Object.keys(o).length > 0 && (r[n] = o);
      } else
        r[n] = i;
  }
  return Object.keys(r).length > 0 ? r : null;
}
function MT(e, t) {
  if (!e || !t) return {};
  const r = {};
  for (const [n, a] of Object.entries(t)) {
    const i = e[n];
    if (i !== void 0)
      if (a.type === "range" && i && typeof i == "object") {
        const o = {};
        typeof i.gte == "number" && (o.min = i.gte), typeof i.lte == "number" && (o.max = i.lte), Object.keys(o).length > 0 && (r[n] = o);
      } else
        r[n] = i;
  }
  return r;
}
function T7() {
  const [e, t] = Gi(), { dateRange: r, refereedOnly: n, citationStyle: a } = e, i = (c) => {
    const l = c.target.value;
    t({
      dateRange: {
        ...r,
        start: l === "" ? null : Number(l)
      }
    });
  }, o = (c) => {
    const l = c.target.value;
    t({
      dateRange: {
        ...r,
        end: l === "" ? null : Number(l)
      }
    });
  }, u = (c) => {
    t({ refereedOnly: c.target.checked });
  }, s = (c) => {
    t({ citationStyle: c.target.value });
  };
  return /* @__PURE__ */ ee("fieldset", { className: "report-options", children: [
    /* @__PURE__ */ P("legend", { className: "report-options-legend", children: "Report options" }),
    /* @__PURE__ */ ee("div", { className: "report-options-row", children: [
      /* @__PURE__ */ ee("label", { className: "report-options-field", children: [
        /* @__PURE__ */ P("span", { className: "report-options-label", children: "From year" }),
        /* @__PURE__ */ P(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            placeholder: "any",
            value: r.start ?? "",
            onChange: i,
            className: "report-options-input"
          }
        )
      ] }),
      /* @__PURE__ */ ee("label", { className: "report-options-field", children: [
        /* @__PURE__ */ P("span", { className: "report-options-label", children: "To year" }),
        /* @__PURE__ */ P(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            placeholder: "open",
            value: r.end ?? "",
            onChange: o,
            className: "report-options-input"
          }
        )
      ] }),
      /* @__PURE__ */ ee("label", { className: "report-options-field", children: [
        /* @__PURE__ */ P("span", { className: "report-options-label", children: "Citation style" }),
        /* @__PURE__ */ P(
          "select",
          {
            value: a,
            onChange: s,
            className: "report-options-input",
            children: XC.map((c) => /* @__PURE__ */ P("option", { value: c.value, children: c.label }, c.value))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ ee("label", { className: "report-options-item", children: [
      /* @__PURE__ */ P(
        "input",
        {
          type: "checkbox",
          checked: n,
          onChange: u
        }
      ),
      /* @__PURE__ */ P("span", { children: "Refereed only" })
    ] })
  ] });
}
function _7() {
  const [e, t] = eN(), r = new Set(e);
  return /* @__PURE__ */ ee("fieldset", { className: "section-toggles", children: [
    /* @__PURE__ */ P("legend", { className: "section-toggles-legend", children: "Sections" }),
    /* @__PURE__ */ P("div", { className: "section-toggles-list", children: GC.map((n) => /* @__PURE__ */ ee("label", { className: "section-toggles-item", children: [
      /* @__PURE__ */ P(
        "input",
        {
          type: "checkbox",
          checked: !r.has(n),
          onChange: () => t(n)
        }
      ),
      /* @__PURE__ */ P("span", { children: VC(n) })
    ] }, n)) })
  ] });
}
function A7() {
  const { data: e } = R_({ path: "/data/queries.json", schema: "queries" }), t = Array.isArray(e) ? e : [];
  return /* @__PURE__ */ ee("div", { className: "w-[min(32rem,calc(100vw-3rem))] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-xl flex flex-col gap-4", children: [
    /* @__PURE__ */ P(y7, { queries: t }),
    /* @__PURE__ */ P(g7, {}),
    /* @__PURE__ */ P(T7, {}),
    /* @__PURE__ */ P(_7, {})
  ] });
}
function O7() {
  return /* @__PURE__ */ ee(
    "svg",
    {
      "aria-hidden": "true",
      className: "h-4 w-4",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ P("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ P("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
      ]
    }
  );
}
function S7() {
  return /* @__PURE__ */ ee(
    "svg",
    {
      "aria-hidden": "true",
      className: "h-4 w-4",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ P("path", { d: "M12 3v12" }),
        /* @__PURE__ */ P("path", { d: "m7 10 5 5 5-5" }),
        /* @__PURE__ */ P("path", { d: "M5 21h14" })
      ]
    }
  );
}
function x7() {
  return /* @__PURE__ */ P(
    "svg",
    {
      "aria-hidden": "true",
      className: "h-3.5 w-3.5",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ P("polyline", { points: "6 9 12 15 18 9" })
    }
  );
}
function w7({
  title: e = "Academic Metrics",
  filename: t = "academic-metrics"
}) {
  const { website: r } = Uu(), [n, a] = ft(null), [i, o] = ft(null), [u, s] = ft(!1), [c, l] = ft(!1), f = ui(null);
  Et(() => {
    if (!u && !c) return;
    const g = (y) => {
      f.current && !f.current.contains(y.target) && (s(!1), l(!1));
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [u, c]);
  const h = async (g) => {
    a(null), o(g), l(!1);
    try {
      const y = await _C(r, {
        format: g,
        foundation: Ro,
        title: e
      }), m = Ro.outputs?.[g]?.extension || g;
      vC(y, `${t}.${m}`);
    } catch (y) {
      console.error("compile failed", y), a(y?.message || String(y));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ ee(
    "div",
    {
      ref: f,
      className: "fixed top-6 right-6 z-40 flex flex-col items-end gap-2",
      children: [
        /* @__PURE__ */ ee("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ ee(
            "button",
            {
              type: "button",
              onClick: () => {
                s((g) => !g), l(!1);
              },
              "aria-expanded": u,
              "aria-label": "Report options",
              className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-body text-sm font-semibold shadow-md transition hover:bg-muted",
              children: [
                /* @__PURE__ */ P(O7, {}),
                "Options"
              ]
            }
          ),
          /* @__PURE__ */ ee("div", { className: "relative", children: [
            /* @__PURE__ */ P(
              "button",
              {
                type: "button",
                onClick: () => {
                  l((g) => !g), s(!1);
                },
                disabled: i !== null,
                "aria-expanded": c,
                "aria-haspopup": "menu",
                className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 transition hover:bg-primary-hover disabled:opacity-60",
                children: i ? /* @__PURE__ */ ee(wt, { children: [
                  /* @__PURE__ */ P("span", { className: "h-2 w-2 animate-pulse rounded-full bg-primary-foreground" }),
                  "Generating…"
                ] }) : /* @__PURE__ */ ee(wt, { children: [
                  /* @__PURE__ */ P(S7, {}),
                  "Download",
                  /* @__PURE__ */ P(x7, {})
                ] })
              }
            ),
            c && /* @__PURE__ */ ee(
              "div",
              {
                role: "menu",
                className: "absolute right-0 top-full mt-2 min-w-48 rounded-lg border border-border bg-card p-1.5 shadow-xl flex flex-col gap-0.5",
                children: [
                  /* @__PURE__ */ ee(
                    "button",
                    {
                      type: "button",
                      role: "menuitem",
                      onClick: () => h("xlsx"),
                      className: "flex items-center justify-between gap-4 rounded-md px-3 py-2 text-sm text-body text-left hover:bg-muted hover:text-heading",
                      children: [
                        /* @__PURE__ */ P("span", { className: "font-medium", children: "Excel" }),
                        /* @__PURE__ */ P("span", { className: "text-xs text-subtle tabular-nums", children: ".xlsx" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ ee(
                    "button",
                    {
                      type: "button",
                      role: "menuitem",
                      onClick: () => h("docx"),
                      className: "flex items-center justify-between gap-4 rounded-md px-3 py-2 text-sm text-body text-left hover:bg-muted hover:text-heading",
                      children: [
                        /* @__PURE__ */ P("span", { className: "font-medium", children: "Word" }),
                        /* @__PURE__ */ P("span", { className: "text-xs text-subtle tabular-nums", children: ".docx" })
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ] }),
        u && /* @__PURE__ */ P(A7, {}),
        n && /* @__PURE__ */ P("p", { className: "max-w-xs rounded bg-error-subtle px-3 py-1 text-xs text-error", children: n })
      ]
    }
  );
}
function P7({ body: e, page: t }) {
  const { website: r } = Uu(), n = t?.title || "Academic Metrics", a = (t?.title || "academic-metrics").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return Et(() => JC(t), [t]), /* @__PURE__ */ ee(r_, { basePath: r.basePath, children: [
    /* @__PURE__ */ P("main", { className: "metrics-body mx-auto max-w-5xl px-6 pb-16", children: /* @__PURE__ */ P("div", { className: "metrics-report", children: e }) }),
    /* @__PURE__ */ P(w7, { title: n, filename: a })
  ] });
}
const I7 = { ...Ro, vars: Ow || Ro?.vars, layouts: { MetricsLayout: P7 } }, C7 = {}, N7 = {}, W7 = { meta: C7, capabilities: I7, layoutMeta: N7 };
export {
  k7 as C,
  gr as D,
  B7 as F,
  j7 as M,
  F7 as P,
  q7 as S,
  W7 as _,
  ww as a,
  $7 as b,
  co as c,
  U7 as d,
  H7 as e,
  _C as f,
  xe as g,
  Tm as h,
  aC as p,
  ci as r
};
//# sourceMappingURL=_entry.generated-BGWXJohC.js.map
