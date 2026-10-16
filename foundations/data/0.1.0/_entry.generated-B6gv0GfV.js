import { jsx as P, jsxs as G, Fragment as _t } from "react/jsx-runtime";
import * as jr from "react";
import C, { createContext as Wt, useContext as Lt, useMemo as Dr, createElement as ti, Children as Mr, isValidElement as Ct, cloneElement as De, useState as at, useEffect as pt, useReducer as CS, PureComponent as er, forwardRef as dT, useRef as ri, useImperativeHandle as NS, useCallback as RS, Component as hT } from "react";
import { renderToStaticMarkup as fp } from "react-dom/server";
import { getUniweb as dp, applyBasePath as DS, deriveCacheKey as MS } from "@uniweb/core";
const pT = /\s+/, LS = /([+\-*\/=<>!&|]+)/, R0 = {
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
function Dn(e, t, r = {}) {
  const n = Object.keys(t), a = r.minQuoteLevel || 0, i = r.splitText || !1;
  r.skipCommas;
  const u = [];
  let o = 0, s = "", c = !1, l = "", f = [], h = "", p = 0;
  const y = ["'", '"', "`", "‘", "’", "“", "”"], b = (g, _) => g === _ ? !0 : ["‘", "’"].includes(g) && ["‘", "’"].includes(_) || ["“", "”"].includes(g) && ["“", "”"].includes(_);
  function m(g, _) {
    if (i && g == "text") {
      const A = _.trim().split(pT);
      for (let v of A)
        v = BS(v), v !== "" && u.push({ type: g, value: v });
    } else
      u.push({ type: g, value: _ });
    s = "";
  }
  function E(g) {
    p === 0 ? (s !== "" && m("text", s), s = g) : s += g;
  }
  for (; o < e.length; ) {
    const g = e[o];
    n.includes(g) && !c ? (E(g), p = f.push(g), h = t[g]) : g === h && !c ? (s += g, f.pop(), p--, h = p > 0 ? t[f[p - 1]] : "", p === 0 && m("enclosure", s)) : !c && y.includes(g) && p > a ? (E(g), c = !0, l = g) : c && b(l, g) ? (s += g, c = !1, p === 0 && m("quote", s)) : s += g, o++;
  }
  return s !== "" && m("text", s), u;
}
function kS(e) {
  let t = 0, r = "", n = "", a = !1;
  const i = /* @__PURE__ */ new Map();
  function u(s, c) {
    i.set(n, { type: s, value: c }), a = !1, r = "";
  }
  function o(s) {
    i.set(s, { type: "text", value: !0 }), a = !0, n = s, r = "";
  }
  for (; t < e.length; ) {
    const s = e[t];
    if (s.type == "text" && s.value !== ":") {
      const c = s.value.split(":");
      c.length === 1 ? r += s.value : a ? (r += c[0], u("text", r), r = c[1] ?? "") : (r += c[0], n = r, o(n), r = c[1] ?? "");
    } else
      r !== "" && (a ? u("text", r) : o(r)), a && s.value !== ":" ? u(s.type, s.value) : s.type == "quote" ? (n = s, o(n)) : s.value !== ":" && console.warn(`Unexpected key: ${s.value} type: ${s.type}`);
    r !== "" && (a ? u("text", r) : o(r)), t++;
  }
  return i;
}
function mT(e, t = []) {
  if (typeof e != "string")
    return e instanceof Object ? { ...e } : {};
  const r = Dn(e, { "{": "}", "(": ")" }, { minQuoteLevel: 1 }), n = {};
  function a(i, u, o) {
    const s = `Invalid ${i} for snippet: ${o}. Expecting: ${u}`;
    t.push(s), console.error(s);
  }
  r.length <= 1 && a("input", "[name arg ...] { ... }", e);
  for (let i = 1; i < r.length; i += 2) {
    const u = r[i - 1].value.trim(), o = r[i].type === "enclosure" ? r[i].value[0] : "", s = o == "{" || o == "(" ? r[i].value.slice(1, -1).trim() : "";
    if (u.length < 3 || !u.startsWith("[") || !u.endsWith("]"))
      a("header", "[ ... ]", u);
    else if (!s)
      a("empty body", "{ ... }", u);
    else {
      const c = u.slice(1, -1).trim().split(pT), l = c.shift(), f = c[0] === "$0";
      f && c.shift(), !l || !/^[a-zA-Z_]\w*$/.test(l) ? a("name", "word", c.join(" ")) : c.every((h) => /^(\.\.\.)?[a-zA-Z_]\w*$/.test(h)) ? n[l] = { args: c, body: s, isText: o == "{", hasFlags: f } : a("arguments", "words", c.join(" "));
    }
  }
  return n;
}
function BS(e) {
  let t = 0, r = e.length - 1;
  for (; t <= r && e[t] === ","; )
    t++;
  for (; r >= t && e[r] === ","; )
    r--;
  return e.slice(t, r + 1);
}
function jS(e) {
  const t = [];
  let r, n, a;
  for (let i of e)
    if (i.type === "text")
      if (r = i.value.split(LS), r.length <= 1)
        t.push(i);
      else
        for (let u = 0; u < r.length; u++)
          n = r[u].trim(), n !== "" && (a = "+-*/=<>!&|".includes(n[0]), n === "!" && t.push({ type: "text", value: "" }), t.push({ type: "text", value: n, isOperator: a }));
    else
      t.push(i);
  return t;
}
function FS(e) {
  const t = [];
  let r = 0, n = !1, a = [];
  for (; r < e.length; ) {
    const i = e[r], u = e[r + 1];
    u && u.isOperator ? (n || (n = !0, a = []), a.push(i, u), r += 2) : (n ? (n = !1, a.push(i), t.push({ type: "chain", tokens: a })) : t.push(i), r++);
  }
  return n && t.push({ type: "chain", tokens: a }), t;
}
function $S(e) {
  const t = [], r = [];
  let n, a, i;
  for (let u of e)
    if (!u.isOperator)
      t.push(u.value);
    else {
      for (; r.length > 0 && R0[r[r.length - 1]] >= R0[u.value]; )
        n = r.pop(), a = t.pop(), i = t.pop(), t.push(`(${n} ${i} ${a})`);
      r.push(u.value);
    }
  for (; r.length > 0; )
    n = r.pop(), a = t.pop(), i = t.pop(), t.push(`(${n} ${i} ${a})`);
  return t[0];
}
function US(e) {
  const t = jS(e), r = FS(t);
  for (const n of r)
    n.type === "chain" && (n.type = "enclosure", n.value = $S(n.tokens), delete n.tokens);
  return r;
}
function HS(e) {
  if (!e.length) return [];
  const t = { show: "#", if: "?", sort: ">>" }, r = t[e[0].value.toLowerCase()];
  if (!r) return e;
  e = US(e);
  let n = { name: r, flags: {}, args: [] }, a = "";
  const i = [], u = ["by", "then", "with"], o = ["as", "of", "sort", "in", "asc", "desc", "heading", "label", "otherwise"], s = {
    sorted: "sort",
    order: "sort",
    ordered: "sort",
    ascending: "asc",
    descending: "desc",
    else: "otherwise"
  };
  for (let l = 1; l < e.length; l++) {
    const f = e[l], h = f.value.toLowerCase();
    f.type == "text" ? h in t ? (i.push(n), n = { name: t[h], flags: {}, args: [] }, a = "") : o.includes(h) ? (a = h, n.flags[a] = !0) : h in s ? (a = s[h], n.flags[a] = !0) : a ? u.includes(h) || (n.flags[a] = f, a = "") : u.includes(h) || n.args.push(f) : a ? (n.flags[a] = f, a = "") : n.args.push(f);
  }
  i.push(n);
  for (let l = 0; l < i.length; l++)
    if (i[l].name == "?") {
      l > 0 && i.unshift(...i.splice(l, 1));
      break;
    }
  const c = i.shift();
  for (const l of i) {
    const f = D0(l).map((h) => h.value);
    c.args.push({ type: "enclosure", value: "(" + f.join(" ") + ")" });
  }
  if (c.name == "?" && c.args.length == 2) {
    for (const l of i)
      if ("otherwise" in l.flags) {
        c.args.push(l.flags.otherwise);
        break;
      }
  }
  return D0(c);
}
function D0(e) {
  const t = [{ type: "text", value: e.name }];
  for (const r of e.args)
    t.push(r);
  for (const r in e.flags) {
    const n = e.flags[r];
    n === !0 ? t.push({ type: "text", value: "-" + r }) : t.push({ type: "text", value: "-" + r + "=" }, n);
  }
  return t;
}
const qS = {
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
}, WS = {
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
}, M0 = {
  accessor: {
    "": { handler: GS, minArgs: 2, spread: !1 },
    // handler
    ".": KS
  },
  collector: {
    "": o2,
    // handler
    "++": B0,
    // add, concat, merge
    "++!!": bT
  },
  creator: {
    "": { handler: VS, spread: !1 },
    //applyCreator, // handler
    "^": Fr,
    "~": QS,
    "\\": ZS,
    // Single backslash \ escaped
    "@": JS,
    "<>": e2,
    phone: t2,
    address: r2,
    org: n2,
    ref: a2,
    currency: i2,
    email: u2
  },
  filter: {
    "": m2,
    // handler
    "&": b2,
    // !!&
    "|": y2,
    // !!|
    "|=": d2,
    // (|= val set) same as (| (= val set))
    "|?": h2,
    // (|? COND val) same as (| (? COND val))
    "&?": p2,
    "+?": Kt
    // or maybe &&
  },
  formatter: {
    "": { handler: v2, minArgs: 1, spread: !1 },
    // handler
    "#": Mn
  },
  unary: {
    "": { handler: E2, minArgs: 1, spread: !1 },
    // handler
    "!": R2,
    // list-aware; use -l to treat list as one value
    "!!": D2
    // same as (! (! val))
  },
  joiner: {
    "": { handler: T2, minArgs: 2, spread: !0 },
    // handler
    "+-": Vt,
    "+:": Vt
    // new name
  },
  mapper: {
    "": { handler: g2, minArgs: 2, spread: !0 },
    // handler
    "+": B0,
    // add, prefix, suffix
    "-": s2,
    "%": c2,
    "*": l2,
    "/": f2,
    ">": O2,
    "<": S2,
    ">=": x2,
    "<=": w2,
    "=": P2,
    "==": I2,
    "!=": C2,
    "!==": N2
  },
  sorter: {
    "": M2,
    // handlers
    ">>": L2
  },
  switcher: {
    "": B2,
    // handlers
    "?": Fa,
    "??": Fa,
    // same as ? with no arguments, but can filter several args
    "???": Fa,
    "?:": Fa
  }
}, YS = ["wrap", "aux", "label", "heading", "title"];
let Nd;
const L0 = {};
function k0(e, t, r) {
  L0[e] ??= zS(e);
  const n = L0[e];
  if (!n) return;
  if (r.length < n.minArgs) return null;
  if ((n.spread && r.length == n.minArgs && !t.l || t.s) && xe(r[r.length - 1])) {
    const u = r.pop();
    r = r.concat(u);
  }
  let a = WS[e] || [];
  for (let u in a) {
    const o = a[u];
    if (xe(o)) {
      for (const s of o)
        if (s in t) {
          t[u] ? t[u] = [t[u], s] : t[u] = s, t.type = u, t.style = s;
          continue;
        }
    }
  }
  !t.type && typeof t.as == "string" && (t.type = t.as), t.lang ? t.locale = t.lang : (t.locale || (t.locale = ni(t.locale)), t.lang = TT(t.locale)), t._name = e;
  const i = n.handler(n.fn, t, r);
  return t.r && xe(i) && i.reverse(), i === void 0 ? null : i;
}
function zS(e) {
  for (let t in M0) {
    const r = M0[t];
    if (r.hasOwnProperty(e)) {
      let n = r[""];
      return typeof n == "function" ? n = { handler: n, minArgs: 1, spread: !0 } : Pt(n) && (n = { ...n }), n.fn = r[e], n;
    }
  }
  return !1;
}
function GS(e, t, r) {
  const n = r[0], a = r.slice(1);
  if (!a.length) return n;
  if (Pt(n))
    if (a.length > 1 || xe(a[0])) {
      const i = a.length == 1 ? a[0] : a, u = [];
      for (const o of i)
        u.push(e(n, o));
      return u;
    } else
      return e(n, a[0]);
  else return a.length == 1 ? e(n, a[0]) : e(n, a);
}
function KS(e, t) {
  if (qt(e) && (e = e.toString()), mr(e))
    return Lr(e, t);
  if (xe(e)) {
    const r = {};
    for (const n of e)
      r[n] = Lr(n, t);
    return r;
  }
  if (Pt(e)) {
    const r = {};
    for (const n in e)
      r[e[n]] = Lr(n, t);
    return r;
  }
}
function VS(e, t, r) {
  if (["~", "phone", "address", "ref", "email"].includes(t._name) && ln(r)) {
    let n = Fr(t, r);
    return t._name === "phone" && (n = n.filter((a) => a[0])), n.map((a) => e(t, a));
  }
  return e(t, r);
}
function Rd(e) {
  return Math.max(...e.map((t) => Array.isArray(t) ? t.length : 1));
}
function Fr(e, t) {
  const r = parseInt(e.sz) || Rd(t);
  let n = e.dv ?? null;
  n !== null && (n = lr(n, Au(n)));
  const a = [];
  for (const i of t)
    Array.isArray(i) ? r > i.length ? a.push([...i, ...Array(r - i.length).fill(n)]) : r < i.length ? a.push(i.slice(0, r)) : a.push(i) : a.push(Array(r).fill(i));
  return e.t ? a : XS(a);
}
function XS(e) {
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
function QS(e, t) {
  return new $t(e, t);
}
function ZS(e, t) {
  return new RegExp(t, e);
}
function JS(e, t) {
  return new z2(e, t);
}
function e2(e, t) {
  return new Fe(e, t);
}
function t2(e, t) {
  return new G2(e, t);
}
function r2(e, t) {
  return new K2(e, t);
}
function n2(e, t) {
  return new V2(e, t);
}
function a2(e, t) {
  return new X2(e, t);
}
function i2(e, t) {
  return new Q2(e, t);
}
function u2(e, t) {
  return new Z2(e, t);
}
function o2(e, t, r) {
  const n = zn(r);
  return n.length ? e.init !== void 0 ? n.reduce(e, e.init) : n.reduce(e) : "";
}
function s2(e, t) {
  if (qt(e) && qt(t)) return e - t;
  if (mr(e) && mr(t)) {
    if (e.length >= t.length) {
      if (e.endsWith(t)) return e.slice(0, -t.length);
    } else if (t.startsWith(e)) return t.slice(e.length);
    return e;
  }
  return null;
}
function c2(e, t) {
  return t / e * 100;
}
function l2(e, t) {
  return e * t;
}
function f2(e, t) {
  return qt(e) && qt(t) ? e / t : e.toString().split(t.toString());
}
function B0(e, t) {
  return e + t;
}
function d2(e) {
  const [t, r] = e;
  return t && r && r instanceof $t ? r.contains(t) : !1;
}
function h2(e, t) {
}
function p2(e, t) {
}
function Vt(e, t) {
  const r = t[0]?.toString();
  let n = t.slice(1);
  if (n = zn(n), mr(r))
    return n.filter((i) => !Po(i)).join(r);
  if (xe(r)) {
    const a = r.length ? r : [""];
    return n.reduce((u, o, s) => {
      if (!o && o !== 0) return "";
      if (s === 0) return o;
      const c = a[Math.min(s - 1, a.length - 1)];
      return u + c + o;
    }, "");
  }
  return "";
}
function Kt(e) {
  return e.every((t) => !Po(t)) ? Vt({}, ["", ...e]) : "";
}
function bT(e, t) {
  return gn(t) ? e : e + 1;
}
bT.init = 0;
function zn(e) {
  return xe(e) ? e.flat(1 / 0) : e == null ? [] : typeof e == "object" ? Object.values(e).flat(1 / 0) : [e];
}
function m2(e, t, r) {
  if (!ln(r))
    return e(r);
  const n = Fr({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(n[i]));
  return a;
}
function b2(e) {
  for (let t = 0; t < e.length; t++)
    if (gn(e[t])) return e[t];
  return e[e.length - 1];
}
function y2(e) {
  for (let t = 0; t < e.length; t++)
    if (!gn(e[t]))
      return e[t];
  return null;
}
function g2(e, t, r) {
  const n = r[0], a = r.slice(1);
  let i;
  return /*config.stepIn[0] &&*/ Array.isArray(n) ? i = n.map((u) => j0(e, u, a)) : i = j0(e, n, a), i;
}
function v2(e, t, r) {
  if (r.length === 1)
    return e({ ...t }, r[0]);
  const n = (i) => i.length == 1 ? e({ ...t }, i[0]) : i.map((u) => e({ ...t }, u));
  return ln(r) ? Fr({}, r).map((i) => n(i)) : n(r);
}
function E2(e, t, r) {
  const n = r[0];
  return t.l ? e({ ...t }, n) : Array.isArray(n) ? n.map((a) => e({ ...t }, a)) : e({ ...t }, n);
}
function T2(e, t, r) {
  if (!ln(r))
    return e(t, r);
  const n = Fr({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(t, n[i]));
  return a;
}
function j0(e, t, r) {
  return r.length == 1 && !xe(r[0]) ? e(t, r[0]) : (r.length == 1 && xe(r[0]) && (r = r[0]), r.map((n) => Array.isArray(n) ? n.map((a) => e(t, a)) : e(t, n)));
}
function _2(e, t) {
  if (!e) return [];
  if (e = Array.isArray(e) ? e : e.split("|"), mr(t) && (t = t.split(",")), !j2(t))
    return e;
  const r = [];
  for (const n of t)
    r.push(e[n]);
  return r;
}
function Mn(e, t) {
  if (e.type ??= Au(t, e), e.row ? (t = _2(t, e.row), e.type = "list") : t = lr(t, e.type, e), t === null) return "";
  const r = e.json ? "json" : e.type, n = { ...e };
  YS.forEach((i) => {
    delete n[i];
  });
  const a = { ...n, [e.type]: e[e.type] };
  return t = A2(r, a, t), e.title && mr(t) && (t = ET(t, e.locale)), e.aux && (xe(t) && (t = t.join(e.sep || ", ")), t = hp(e, t)), e.label && (xe(t) && (t = t.join(e.sep || ", ")), e.label === !0 && (e.label = e._params[0]), t = Y2(e, t)), e.heading && (xe(t) && (t = t.join(e.sep || ", ")), e.heading === !0 && (e.heading = e._params[0]), t = W2(e, t)), e.wrap && (Po(t) ? t = "" : (e.wrap === !0 && (e.wrap = "()"), t = e.wrap[0] + t + e.wrap[1])), t;
}
function A2(e, t, r) {
  switch (e) {
    case "null":
      return "";
    case "entity":
      return r.format(t);
    case "date":
      return $2(t, r);
    case "number":
      return U2(t, r);
    case "text":
    case "string":
      return H2(t, r);
    case "object":
      return vT(t, r);
    case "json":
      return JSON.stringify(r);
    case "list":
      return gT(t, r);
    case "boolean":
      return r ? "1" : "0";
    default:
      return r ? r?.toString() || "" : (console.warn(`Cannot format type: ${t.type} for the value ${r}`), "");
  }
}
function O2(e, t) {
  return e > t;
}
function S2(e, t) {
  return e < t;
}
function x2(e, t) {
  return e >= t;
}
function w2(e, t) {
  return e <= t;
}
function P2(e, t) {
  return e == t;
}
function I2(e, t) {
  return e === t;
}
function C2(e, t) {
  return e != t;
}
function N2(e, t) {
  return e !== t;
}
function R2(e, t) {
  return gn(t);
}
function D2(e, t) {
  return !gn(t);
}
function M2(e, t, r) {
  if (!ln(r))
    return e(t, r);
  const n = Fr({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(t, n[i]));
  return a;
}
function L2(e, t) {
  const r = e.date ? k2 : yT, n = e.desc ? -1 : 1;
  return t.sort((a, i) => n * r(e, a, i));
}
function _u(e, t) {
  if (t.by && Pt(e) && !xe(e)) {
    const r = e[t.by];
    return r !== void 0 ? r : F0(e);
  }
  return F0(e);
}
function k2(e, t, r) {
  let n = _u(t, e), a = _u(r, e);
  return fn(n) && fn(a) ? lr(n, "date").getTime() - lr(a, "date").getTime() : yT(e, t, r);
}
function yT(e, t, r) {
  let n = _u(t, e), a = _u(r, e);
  const i = qt(n), u = qt(a);
  return i && u ? Number(n) - Number(a) : !i && !u ? (typeof n != "string" && (n = String(n)), typeof a != "string" && (a = String(a)), n.localeCompare(a, e.locale)) : i ? -1 : 1;
}
function F0(e) {
  if (xe(e))
    return e[0];
  if (e instanceof Map)
    return e.values().next().value;
  if (Pt(e)) {
    const t = Object.keys(e);
    return e[t[0]];
  } else
    return e;
}
function B2(e, t, r) {
  let n = [], a = [];
  if (t._name === "?:")
    n = r, a = r;
  else {
    let i = parseInt(t.cases);
    if (i || (i = { "??": 2, "???": 3 }[t._name] || 1), i >= r.length)
      return null;
    n = r.slice(0, i), a = r.slice(i);
  }
  if (!ln(n) && !ln(a))
    return e(t, n, a);
  {
    const i = Math.max(Rd(n), Rd(a)), u = { sz: i }, o = Fr(u, n), s = Fr(u, a), c = [];
    for (let l = 0; l < i; l++)
      c.push(e(t, o[l], s[l]));
    return c;
  }
}
function Fa(e, t, r) {
  for (let n = 0; n < t.length; n++)
    if (!gn(t[n]))
      return r[n];
  return r.length > t.length ? r[t.length] : null;
}
function Po(e) {
  return e == null || e === "" || Number.isNaN(e) ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof tt && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function gn(e) {
  return !e || e === "0" ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof tt && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function Lr(e, t) {
  const r = e.split(".");
  let n = t;
  for (let a = 0; a < r.length; a++) {
    let i = r[a];
    if (xe(n) && !qt(i)) {
      const u = [];
      for (let o of n)
        i = r.slice(a).join("."), u.push(Lr(i, o));
      return u;
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
function Pt(e) {
  return e !== null && typeof e == "object";
}
function mr(e) {
  return typeof e == "string";
}
function xe(e) {
  return Array.isArray(e);
}
function j2(e) {
  if (!xe(e) || !e.length) return !1;
  for (const t of e)
    if (!qt(t)) return !1;
  return !0;
}
function ln(e) {
  for (let t of e)
    if (xe(t)) return !0;
  return !1;
}
function qt(e) {
  return !isNaN(Number(e));
}
function fn(e) {
  return e ? e instanceof Date ? !0 : typeof e != "string" ? !1 : !isNaN(new Date(e).getTime()) : !1;
}
function F2(e) {
  return fn(e) ? !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(e) : !1;
}
function lr(e, t, r = {}) {
  switch (t) {
    case "boolean":
      return !gn(e);
    case "date":
      return fn(e) ? e instanceof Date || r.date === "auto" && F2(e) ? e : new Date(e.replace(/-/g, "/")) : null;
    case "text":
    case "string":
      return mr(e) ? e : Vt(zn(e));
    case "list":
      return xe(e) ? e : Pt(e) ? zn(e) : null;
    case "object":
      return Pt(e) ? e : null;
    case "number":
      return qt(e) ? parseFloat(e) : fn(e) ? lr(e, "date").getTime() : 0;
    case "range":
      return e instanceof $t ? e : xe(e) ? new $t(r, e) : Pt(e) ? new $t(r, [e.start, e.end]) : new $t(r, [e]);
    case "tag":
      return e instanceof Fe ? e : xe(e) ? new Fe(r, [e]) : e instanceof tt ? new Fe(r, [[null, e, null]]) : Pt(e) ? new Fe(r, [e]) : new Fe(r, [[null, e, null]]);
  }
  return e;
}
function Au(e, t = {}) {
  if (e instanceof tt)
    return "entity";
  if (e instanceof Date)
    return "date";
  const r = typeof e;
  return r == "undefined" || e === null ? "null" : r == "boolean" ? r : xe(e) ? "list" : qt(e) ? "number" : fn(e) ? "date" : Pt(e) ? "object" : r;
}
function $2(e, t) {
  if (!fn(t))
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
  return mr(n) && (n = r[n]), (!n || n === !0) && (n = "medium"), mr(n) && (n = { dateStyle: n }), t instanceof Date ? t.toLocaleDateString(e.locale, n) : t;
}
function U2(e, t) {
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
function H2(e, t) {
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
function gT(e, t) {
  const r = [];
  for (let n of t)
    xe(n) ? n = gT(e, n) : Pt(n) && (n = vT(e, n)), Po(n) || r.push(n);
  return r.join(e.sep === void 0 ? " " : e.sep);
}
function vT(e, t) {
  return JSON.stringify(t);
}
function ET(e, t) {
  t = ni(t);
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
  return t.toLowerCase().startsWith("en") ? e.split(" ").map((a, i, u) => i === 0 || i === u.length - 1 || !r.has(a.toLowerCase()) ? n(a) : a.toLowerCase()).join(" ") : n(e);
}
function q2(e) {
  Nd = typeof document < "u" && document.documentElement?.getAttribute("lang") || "en";
}
function ni(e = null) {
  return Nd || q2(), e || Nd;
}
function TT(e = null) {
  return ni(e).split("-")[0].toLowerCase();
}
function $0(e) {
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
  }[TT(e)];
}
function hp(e, t) {
  return t ? new Fe(e, [["u-aux", t]]).format() : "";
}
function W2(e, t) {
  if (!t && !e.force) return "";
  let r = e.level || 3;
  return new Fe(e, [
    [
      "u-value-group",
      new Fe(e, [
        [`h${r}`, e.heading],
        ["span", t]
      ])
    ]
  ]).format();
}
function Y2(e, t) {
  return !t && !e.force ? "" : new Fe(e, [
    [
      "u-inline-value-group",
      new Fe(e, [
        ["label", e.label],
        ["span", t]
      ])
    ]
  ]).format();
}
class tt {
  constructor(t, r) {
    if (this.flags = { ...t }, this.values = Array.isArray(r) ? [...r] : typeof r == "object" ? { ...r } : r, this.parsedArgs = null, new.target === tt)
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
      let u = n[i];
      Array.isArray(u) || (u = [u]);
      let o = [], s = [];
      u.forEach((l) => {
        if (Array.isArray(l)) {
          let f = this.applyFunction(t, l);
          o.push(f), s.push(f);
        } else
          o.push(a.includes(l)), s.push(t?.[l] || "");
      });
      let c = Fa({}, o, s);
      r[i] = c;
    }), r;
  }
  applyFunction(t, r) {
    switch (r.shift()) {
      case ".":
        const a = r[1];
        if (!t?.[a]) return !1;
        let i = t[a];
        const u = r[0];
        return u || u === 0 ? i[u] : "";
      default:
        return !1;
    }
  }
  getFieldMapping() {
    return {};
  }
}
class z2 extends tt {
  constructor(t, r) {
    super(t, r);
    let n = xe(r) ? r?.[0] : r;
    this.values = Pt(n) ? n : {};
  }
  toString() {
    return this.values[this.flags.lang];
  }
  isEmpty() {
    return !this.values || Object.keys(this.values).length === 0;
  }
}
class $t extends tt {
  constructor(t, r) {
    super(t, r);
    const n = zn(r), a = n[0], i = n[1];
    this.givenStart = a, this.givenEnd = i, this.includeStart = !t.open, this.includeEnd = !t.open, this.flags.type || (this.flags.type = Au(a || i)), this.start = lr(a, "number"), this.end = lr(i, "number");
  }
  /**
   * Check if the Range includes a specific value
   */
  contains(t) {
    if (t instanceof $t) return this.overlaps(t);
    t = lr(t, "number");
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
    return t.type === "date" ? (n = n ? Mn(t, n) : $0(t.locale), a = a ? Mn(t, a) : $0(t.locale)) : t.type !== "range" && (n = Mn(t, n || ""), a = Mn(t, a || "")), n || a ? `${n}${r}${a}` : "";
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
class Fe extends tt {
  constructor(t, r) {
    super(t, r);
    let { tag: n } = t, a = n ? xe(n) ? n : [n] : [];
    this.markups = r.map((i) => {
      let u = "", o = "", s = {};
      Array.isArray(i) ? [u, o, s = {}] = i : typeof i == "object" ? (u = i.tag || "", o = i.children || "", s = i.attrs || {}) : typeof i == "string" && (o = i);
      let c = u ? [...a, u] : [...a];
      return c.length || (c = ["span"]), { tag: c, children: o, attrs: s };
    });
  }
  format() {
    let t = "";
    const r = ["strong", "em", "u", "s", "sup", "sub"];
    return this.markups.forEach((n) => {
      const { tag: a, children: i, attrs: u } = n;
      let o = i || "";
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
          if (o) {
            if (o instanceof tt && o.isEmpty()) return "";
          } else return "";
        if (c === 0 && (f = u), f && Object.keys(f).length) {
          l = l === "_self" ? "span" : l;
          let h = Object.keys(f).reduce((p, y) => `${p} ${y}="${f[y]}"`, "");
          o = `<${l}${h}>${o}</${l}>`;
        } else
          l === "span" && !o || (o = l === "_self" ? o : `<${l}>${o}</${l}>`);
      }), t += o;
    }), t;
  }
  isEmpty() {
    return this.markups.length === 1 && this.markups[0].tag.length === 1 && !this.markups[0].children && (!this.markups[0].attrs || !Object.keys(this.markups[0].attrs).length);
  }
  toString() {
    return this.format();
  }
}
class G2 extends tt {
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
    const { link: t = !1 } = this.flags, { type: r, country: n, ext: a, start: i, end: u } = this.parsedArgs;
    let o = new $t({}, [i, u]).format();
    return [
      Kt([r, ":"]),
      Kt(["+", n]),
      this.buildNumber(),
      Kt(["x ", a]),
      // joinIfAllTrue(['(', new Range({}, [start, end]), ')']),
      o ? new Fe({}, [["u-aux", o]]).format() : ""
    ].filter(Boolean).join(" ");
  }
  buildNumber() {
    const { area: t, number: r } = this.parsedArgs;
    return !t && !r ? "" : Kt([Kt(["(", t, ") "]), r]);
  }
  isEmpty() {
    return !this.buildNumber();
  }
  toString() {
    return this.format();
  }
}
class K2 extends tt {
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
      line3: u = "",
      line4: o = "",
      line5: s = "",
      province: c,
      zip: l = "",
      start: f = "",
      end: h = ""
    } = this.parsedArgs;
    return [
      Vt({}, [
        " ",
        Mn({ tag: "bold", type: "tag", bold: !0 }, Kt([t, ":"])),
        Vt({}, [
          " ",
          a,
          Kt(["(", new $t({}, [f, h]), ")"])
        ])
      ]),
      i,
      u,
      o,
      s,
      Vt({}, [
        ", ",
        n,
        Vt({}, [" ", c, Kt(["(", r, ")"])])
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
class V2 extends tt {
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
    const { type: t, organization: r, country: n, province: a } = this.parsedArgs, i = Vt(null, [" - ", n, a, t]);
    return new Fe({}, [
      [
        "u-org",
        new Fe({}, [
          ["u-org-name", r],
          ["_self", hp({}, i)]
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
class X2 extends tt {
  constructor(t, r) {
    super(t, zn(r));
  }
  format() {
    const [t, ...r] = this.values, n = Vt(null, [" - ", ...r]);
    return t ? new Fe({}, [
      [
        "u-ref",
        new Fe({}, [
          ["u-ref-name", t],
          ["_self", hp({}, n)]
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
class Q2 extends tt {
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
    const { amount: t, currency: r, convertedAmount: n } = this.parsedArgs, a = qS[r.toLowerCase()], u = [["u-amount", a ? new Intl.NumberFormat(`${ni()}-CA`, {
      style: "currency",
      currency: a
    }).format(t) : t]];
    return r && u.push(["u-unit", r]), n && n !== "0" && u.push([
      "u-aux",
      new Intl.NumberFormat(`${ni()}-CA`, {
        style: "currency",
        currency: "CAD"
      }).format(n)
    ]), new Fe({}, [["u-currency", new Fe({}, u)]]).format();
  }
  isEmpty() {
    return !this.parsedArgs.amount;
  }
  toString() {
    return this.format();
  }
}
class Z2 extends tt {
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
    let i = new $t({}, [n, a]).format();
    return [
      Kt([t, ":"]),
      r,
      i ? new Fe({}, [["u-aux", i]]).format() : ""
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
const U0 = /^[@]?[\$]?[\/]?[a-zA-Z_][a-zA-Z0-9_\/\.-]*$|^@$|^\?$/, J2 = /^-?\d+(\.\d+)?$/;
class ex {
  /**
   * Create a loom with given snippets and custom functions.
   *
   * @param {Object|string} snippets - A key-value object, or a string with snippet definitions.
   * @param {Object} functions - A map of custom function names to handlers.
   */
  constructor(t = {}, r = {}) {
    this.snippets = mT(t), this.functions = r;
  }
  /**
   * Sets the template variables.
   *
   * @param {Object|function} variables - A key-value object, or a function that maps a key to a value.
   * @return {void}
   */
  setVariables(t) {
    this.variables = typeof t == "function" ? t : (r) => Lr(r, t);
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
    const a = Dn(t, { "{": "}" });
    let i = "";
    for (const u of a)
      if (u.type === "enclosure") {
        let o = u.value.slice(1, -1);
        o.startsWith("{") && o.endsWith("}") && (o = o.slice(1, -1));
        try {
          o = this.evaluateText(o, null, n), typeof o != "string" && (o = k0("#", { l: !0, sep: ", " }, [o]), Array.isArray(o) && o.every((s) => typeof s == "string") && (o = o.join(", ")));
        } catch (s) {
          o = s;
        }
        i += o;
      } else
        i += u.value;
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
    if (t = t.trim(), r && this.setVariables(r), U0.test(t))
      return this.getVariable(t, n);
    if (t.length > 2 && t[0] === "(" && t[t.length - 1] === ")") {
      let a = 1, i = !0;
      for (let u = 1; u < t.length - 1; u++)
        if (t[u] === "(" ? a++ : t[u] === ")" && a--, a === 0) {
          i = !1;
          break;
        }
      if (i)
        return this.evaluateFunction(t.slice(1, -1), n);
    }
    return this.evaluateFunction(t, n);
  }
  evaluateList(t, r) {
    const n = Dn(
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
    const n = Dn(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!n.length) return "";
    const a = kS(n), i = {};
    for (let [u, o] of a.entries())
      typeof u != "string" && (u = this.evaluateExpression(u, r).value), o = this.evaluateExpression(o, r).value, i[u] = o;
    return i;
  }
  parseFunction(t) {
    let r = Dn(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!r.length) return {};
    r = HS(r);
    let n;
    return r[0].type == "text" && r[0].value[0] != "-" ? n = r.shift().value : r[0].type != "quote" || r[0].value[0] == "`" ? n = "#" : n = "+:", { name: n, tokens: r };
  }
  evaluateFunction(t, r) {
    const { name: n, tokens: a } = this.parseFunction(t);
    if (!n) return "";
    const i = [], u = { _params: [] };
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
        u[l[0]] = l[1] ?? !0;
      } else {
        const l = this.evaluateExpression(c, r);
        i.push(l.value), l.label && u._params.push(c.label);
      }
    }
    const o = k0(n, u, i);
    if (o !== void 0)
      return o;
    if (this.snippets.hasOwnProperty(n))
      return this.callSnippet(n, u, i);
    {
      const s = this.functions[n] ?? this.functions[n.toLowerCase()] ?? this.functions[n.toUpperCase()] ?? !1;
      return s ? this.callCustomFunction(s, u, i) : this.applyFallback(n, i);
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
    const u = r[1], o = /* @__PURE__ */ new Map();
    return i.call(n, (...s) => {
      for (let c = 0; c < s.length; c++)
        o.set("$" + (c + 1), s[c]);
      return this.evaluateFunction(u, o);
    });
  }
  getVariableMeta(t) {
    let r = this.variables("@" + t) || {};
    return typeof r == "string" ? { label: r } : (r.label ??= ET(t.split("_").join(" ")), r);
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
    return r && r.has(n) ? { value: r.get(n), type: "aux" } : U0.test(n) ? {
      value: this.getVariable(n, r),
      label: this.getVariableMeta(n).label,
      type: "variable"
    } : J2.test(n) ? { value: parseFloat(n), type: "number" } : { value: this.getError(103, "Invalid expression", n), type: "error" };
  }
  getVariable(t, r = null) {
    if (t.startsWith("@"))
      return this.getVariableMeta(t.slice(1)).label;
    const n = this.variables(t);
    if (n !== void 0) {
      const a = this.getVariableMeta(t);
      return a.type ? lr(n, a.type) : n;
    } else return r && r.has(t) ? r.get(t) : this.snippets.hasOwnProperty(t) ? this.callSnippet(t) : this.functions.hasOwnProperty(t) ? this.callCustomFunction(this.functions[t], []) : t === "_now" ? /* @__PURE__ */ new Date() : { true: !0, false: !1, null: null }[t];
  }
  callSnippet(t, r = {}, n = []) {
    let a = this.snippets[t];
    return typeof a != "function" && (a = this.makeSnippetFunction(a), this.snippets[t] = a), a(r, n);
  }
  makeSnippetFunction(t) {
    const r = t.args || [], n = t.isText, a = t.body, i = t.hasFlags, u = /* @__PURE__ */ new Map();
    return (s, c) => {
      i && u.set("$0", s);
      for (let l = 0; l < c.length; l++) {
        const f = r[l] || "$" + (l + 1);
        if (f.startsWith("...")) {
          u.set(f.slice(3), c.slice(l));
          break;
        } else
          u.set(f, c[l]);
      }
      return n ? this.render(a, null, u) : this.evaluateFunction(a, u);
    };
  }
  getError(t, r, n) {
    throw console.error(`Error ${t}: ${r} '${n}'`), `Error[${t}][${n}]`;
  }
}
const _T = [
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
_T.sort((e, t) => t.length - e.length);
const tx = new Set(_T.map((e) => e.join(" ").toUpperCase())), rx = /* @__PURE__ */ new Set([
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
]), nx = /* @__PURE__ */ new Set([">=", "<=", "!=", "==", "&&", "||"]), ax = /* @__PURE__ */ new Set(["+", "-", "*", "/", "%", "=", "<", ">", "!"]), ix = /[a-zA-Z_@$?]/, ux = /[a-zA-Z0-9_.\/@]/, _s = /[0-9]/;
function ox(e) {
  return sx(e);
}
function sx(e) {
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
      const u = AT(e, n, a);
      if (u < 0) throw new Error(`Unterminated string starting at ${n}`);
      t.push({ type: "string", value: e.slice(n + 1, u) }), n = u + 1;
      continue;
    }
    if (a === "{") {
      const u = lx(e, n, "{", "}");
      if (u < 0) throw new Error(`Unmatched '{' at ${n}`);
      t.push({ type: "loom", value: e.slice(n, u + 1) }), n = u + 1;
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
    if (_s.test(a) || a === "-" && _s.test(e[n + 1] || "") && cx(t)) {
      let u = n + (a === "-" ? 1 : 0);
      for (; u < r && (_s.test(e[u]) || e[u] === "."); ) u++;
      t.push({ type: "number", value: parseFloat(e.slice(n, u)) }), n = u;
      continue;
    }
    const i = e.slice(n, n + 2);
    if (nx.has(i)) {
      t.push({ type: "operator", value: i }), n += 2;
      continue;
    }
    if (ax.has(a)) {
      t.push({ type: "operator", value: a }), n++;
      continue;
    }
    if (ix.test(a)) {
      let u = n + 1;
      for (; u < r && ux.test(e[u]); ) u++;
      const o = e.slice(n, u), s = o.toLowerCase();
      s === "and" ? t.push({ type: "operator", value: "&" }) : s === "or" ? t.push({ type: "operator", value: "|" }) : s === "not" ? t.push({ type: "operator", value: "!" }) : t.push({ type: "word", value: o }), n = u;
      continue;
    }
    t.push({ type: "unknown", value: a }), n++;
  }
  return t;
}
function cx(e) {
  if (e.length === 0) return !0;
  const t = e[e.length - 1];
  return !!(t.type === "operator" || t.type === "lparen" || t.type === "word" && tx.has(t.value.toUpperCase()));
}
function AT(e, t, r) {
  for (let n = t + 1; n < e.length; n++) {
    if (e[n] === "\\" && n + 1 < e.length) {
      n++;
      continue;
    }
    if (e[n] === r) return n;
  }
  return -1;
}
function lx(e, t, r, n) {
  let a = 0;
  for (let i = t; i < e.length; i++) {
    const u = e[i];
    if (u === '"' || u === "'" || u === "`") {
      const o = AT(e, i, u);
      if (o < 0) return -1;
      i = o;
      continue;
    }
    if (u === r) a++;
    else if (u === n && (a--, a === 0))
      return i;
  }
  return -1;
}
function fx(e, t, r) {
  for (const n of r) {
    if (t + n.length > e.length) continue;
    let a = !0;
    for (let i = 0; i < n.length; i++) {
      const u = e[t + i];
      if (u.type !== "word" || u.value.toLowerCase() !== n[i]) {
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
class fr extends Error {
}
const dx = /* @__PURE__ */ new Set(["long", "full", "short", "medium"]), hx = [
  ["for", "each"],
  ["total", "of"],
  ["sum", "of"],
  ["average", "of"],
  ["count", "of"],
  ["show"],
  ["if"]
], Ui = [
  ["from", "lowest", "to", "highest"],
  ["from", "highest", "to", "lowest"],
  ["sorted", "by"],
  ["joined", "by"],
  ["with", "label"],
  ["if", "present"],
  ["where"],
  ["as"],
  ["if"]
], px = [["then"], ["show"]], mx = [["otherwise"], ["else"]], bx = [["else"], ["show"]], yx = [["in"]], gx = [["do"]], vx = [["ascending"]], Ex = [["descending"]];
function Et(e, t) {
  return fx(e.tokens, e.i, t);
}
function Xe(e, t) {
  e.i += t.length;
}
function Tx(e) {
  const t = { tokens: e, i: 0 }, r = pp(t);
  if (r == null)
    throw new fr("Empty Plain expression");
  if (t.i < t.tokens.length) {
    const n = t.tokens.slice(t.i).map((a) => a.value).join(" ");
    throw new fr(`Unexpected trailing tokens: ${n}`);
  }
  return r;
}
function Ue(e, t = 0) {
  return e.tokens[e.i + t];
}
function Ce(e) {
  return e.tokens[e.i++];
}
function OT(e, t, r) {
  const n = Ue(e);
  if (!n || n.type !== t || r != null) {
    const a = n ? `${n.type}:${n.value}` : "end of input";
    throw new fr(`Expected ${t}, got ${a}`);
  }
  return Ce(e);
}
function pp(e) {
  const t = Ue(e);
  if (!t) return null;
  const r = Et(e, hx);
  if (r && !_x(e, r))
    switch (Xe(e, r), r.canonical) {
      case "IF":
        return Px(e);
      case "SHOW":
        return H0(e);
      case "TOTAL OF":
      case "SUM OF":
        return As(e, { type: "sum", value: Nt(e) });
      case "AVERAGE OF":
        return As(e, { type: "average", value: Nt(e) });
      case "COUNT OF":
        return As(e, Ix(e));
      case "FOR EACH":
        return Cx(e);
    }
  if (t.type === "word" && Ax(e)) {
    const n = Ox(e), a = mp(e);
    return a.length > 0 ? { type: "show", value: n, modifiers: a } : n;
  }
  {
    const n = e.i;
    try {
      const a = bp(e);
      if (a != null && e.i >= e.tokens.length)
        return a;
    } catch {
    }
    e.i = n;
  }
  return H0(e);
}
function _x(e, t) {
  return e.tokens.length - e.i - t.length <= 0 && t.length === 1;
}
function Ax(e) {
  const t = Ue(e, 1);
  if (!t) return !1;
  if (t.type === "string" || t.type === "number" || t.type === "lparen" || t.type === "loom")
    return !0;
  if (t.type === "word") {
    const r = e.i;
    e.i += 1;
    const n = Et(e, Ui);
    return e.i = r, n == null;
  }
  return !1;
}
function Ox(e) {
  const t = Ce(e).value, r = [];
  for (; e.i < e.tokens.length; ) {
    const n = Ue(e);
    if (!n) break;
    if (n.type === "comma") {
      Ce(e);
      continue;
    }
    if (n.type === "rparen" || n.type === "operator" || n.type === "word" && Et(e, Ui)) break;
    const a = Nt(e);
    if (a == null) break;
    r.push(a);
  }
  return { type: "call", name: t, args: r };
}
function H0(e) {
  const t = Sx(e);
  if (t.length === 0) {
    const a = Ue(e), i = a ? `${a.type}:${a.value}` : "end of input";
    throw new fr(`Expected a value, got ${i}`);
  }
  const r = mp(e);
  if (t.length > 1) {
    for (const u of r)
      if (u.type !== "joinedBy" && u.type !== "ifPresent")
        throw new fr(
          `Multi-value SHOW supports only JOINED BY and IF PRESENT (got ${u.type})`
        );
    const a = r.some((u) => u.type === "joinedBy"), i = r.some((u) => u.type === "ifPresent");
    if (a && i)
      throw new fr(
        "JOINED BY and IF PRESENT cannot be combined on the same SHOW"
      );
    return { type: "show", values: t, modifiers: r };
  }
  const n = t[0];
  return r.length === 0 && xx(n) ? { type: "show", value: n, modifiers: [] } : { type: "show", value: n, modifiers: r };
}
function Sx(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const r = Ue(e);
    if (!r) break;
    if (r.type === "comma") {
      Ce(e);
      continue;
    }
    if (r.type === "rparen" || r.type === "operator" || r.type === "word" && Et(e, Ui)) break;
    const n = Nt(e);
    if (n == null) break;
    t.push(n);
  }
  return t;
}
function xx(e) {
  return e.type === "var" || e.type === "string" || e.type === "number" || e.type === "loom" || e.type === "group";
}
function mp(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const r = Et(e, Ui);
    if (!r) break;
    switch (r.canonical) {
      case "AS": {
        Xe(e, r), t.push({ type: "as", format: wx(e) });
        break;
      }
      case "WITH LABEL": {
        Xe(e, r);
        let n = null;
        Ue(e) && Ue(e).type === "string" && (n = Ce(e).value), t.push({ type: "withLabel", label: n });
        break;
      }
      case "SORTED BY": {
        Xe(e, r);
        const n = Nt(e);
        let a = "asc";
        const i = Et(e, Ex);
        if (i)
          Xe(e, i), a = "desc";
        else {
          const u = Et(e, vx);
          u && Xe(e, u);
        }
        t.push({ type: "sortedBy", value: n, order: a });
        break;
      }
      case "FROM LOWEST TO HIGHEST": {
        Xe(e, r), t.push({ type: "sortedBy", value: Nt(e), order: "asc" });
        break;
      }
      case "FROM HIGHEST TO LOWEST": {
        Xe(e, r), t.push({ type: "sortedBy", value: Nt(e), order: "desc" });
        break;
      }
      case "JOINED BY": {
        Xe(e, r);
        const n = Ue(e);
        if (!n || n.type !== "string")
          throw new fr("JOINED BY expects a quoted string");
        Ce(e), t.push({ type: "joinedBy", sep: n.value });
        break;
      }
      case "WHERE":
      case "IF": {
        Xe(e, r), t.push({ type: "where", condition: bp(e) });
        break;
      }
      case "IF PRESENT": {
        Xe(e, r), t.push({ type: "ifPresent" });
        break;
      }
      default:
        return t;
    }
  }
  return t;
}
function wx(e) {
  const t = Ue(e);
  if (t && t.type === "string")
    return Ce(e), { raw: t.value };
  const r = [];
  for (; r.length < 2; ) {
    const i = Ue(e);
    if (!i || i.type !== "word" || Et(e, Ui)) break;
    r.push(Ce(e).value.toLowerCase());
  }
  if (r.length === 0)
    throw new fr("AS requires a format type");
  const n = r[0], a = r[1];
  return a === "date" && dx.has(n) ? { type: "date", value: n } : a === "only" && (n === "year" || n === "month") ? { type: "date", value: n === "year" ? "y" : "m" } : rx.has(n) ? { type: n, value: a ?? null } : (a != null && e.i--, { type: n, value: null });
}
function Px(e) {
  const t = bp(e), r = Et(e, px);
  r && Xe(e, r);
  const n = q0(e);
  let a = null;
  const i = Et(e, mx);
  if (i) {
    Xe(e, i);
    const u = Et(e, bx);
    u && Xe(e, u), a = q0(e);
  }
  return { type: "if", condition: t, thenBranch: n, elseBranch: a };
}
function q0(e) {
  return Nt(e);
}
function Ix(e) {
  return { type: "count", value: Nt(e) };
}
function As(e, t) {
  const r = mp(e);
  return r.length === 0 ? t : { type: "show", value: t, modifiers: r };
}
function Cx(e) {
  const t = Ue(e);
  if (!t || t.type !== "word")
    throw new fr("FOR EACH expects an identifier");
  Ce(e);
  const r = Et(e, yx);
  r && Xe(e, r);
  const n = Nt(e), a = Et(e, gx);
  a && Xe(e, a);
  const i = pp(e);
  return { type: "forEach", ident: t.value, list: n, body: i };
}
function bp(e) {
  return ST(e);
}
function ST(e) {
  let t = W0(e);
  for (; ; ) {
    const r = Ue(e);
    if (!r || r.type !== "operator" || r.value !== "|" && r.value !== "||") break;
    Ce(e);
    const n = W0(e);
    t = { type: "binop", op: "|", left: t, right: n };
  }
  return t;
}
function W0(e) {
  let t = Dd(e);
  for (; ; ) {
    const r = Ue(e);
    if (!r || r.type !== "operator" || r.value !== "&" && r.value !== "&&") break;
    Ce(e);
    const n = Dd(e);
    t = { type: "binop", op: "&", left: t, right: n };
  }
  return t;
}
function Dd(e) {
  const t = Ue(e);
  if (t && t.type === "operator" && t.value === "!")
    return Ce(e), { type: "unop", op: "!", arg: Dd(e) };
  if (t && t.type === "lparen") {
    Ce(e);
    const r = ST(e);
    return OT(e, "rparen"), { type: "group", inner: r };
  }
  return Rx(e);
}
const Nx = /* @__PURE__ */ new Set(["=", "==", "!=", ">", "<", ">=", "<="]);
function Rx(e) {
  const t = Y0(e), r = Ue(e);
  if (r && r.type === "operator" && Nx.has(r.value)) {
    Ce(e);
    const n = Y0(e);
    return { type: "binop", op: r.value === "==" ? "=" : r.value, left: t, right: n };
  }
  return t;
}
function Y0(e) {
  let t = z0(e);
  for (; ; ) {
    const r = Ue(e);
    if (!r || r.type !== "operator" || r.value !== "+" && r.value !== "-") break;
    Ce(e);
    const n = z0(e);
    t = { type: "binop", op: r.value, left: t, right: n };
  }
  return t;
}
function z0(e) {
  let t = Nt(e);
  for (; ; ) {
    const r = Ue(e);
    if (!r || r.type !== "operator" || r.value !== "*" && r.value !== "/" && r.value !== "%") break;
    Ce(e);
    const n = Nt(e);
    t = { type: "binop", op: r.value, left: t, right: n };
  }
  return t;
}
function Nt(e) {
  const t = Ue(e);
  if (!t) return null;
  if (t.type === "lparen") {
    Ce(e);
    const r = pp(e);
    return OT(e, "rparen"), { type: "group", inner: r };
  }
  return t.type === "loom" ? (Ce(e), { type: "loom", value: t.value }) : t.type === "string" ? (Ce(e), { type: "string", value: t.value }) : t.type === "number" ? (Ce(e), { type: "number", value: t.value }) : t.type === "word" ? (Ce(e), { type: "var", path: t.value }) : null;
}
class xT extends Error {
}
function Dx(e) {
  if (e == null) return "";
  const t = Ie(e);
  return Yx(t);
}
function Ie(e) {
  switch (e.type) {
    case "loom": {
      const t = qx(e.value);
      return Wx(t) ? `(${t})` : t;
    }
    case "var":
      return e.path;
    case "string":
      return Un(e.value);
    case "number":
      return String(e.value);
    case "group":
      return Ie(e.inner);
    case "binop":
      return `(${e.op} ${Ie(e.left)} ${Ie(e.right)})`;
    case "unop":
      return `(${e.op} ${Ie(e.arg)})`;
    case "show":
      return Lx(e);
    case "if":
      return Bx(e);
    case "count":
      return jx(e);
    case "sum":
      return `(++ ${Ie(e.value)})`;
    case "average": {
      const t = Ie(e.value);
      return `(/ (++ ${t}) (++!! ${t}))`;
    }
    case "call":
      return Mx(e);
    case "forEach":
      return Fx(e);
    default:
      throw new xT(`Unknown node type: ${e.type}`);
  }
}
function Mx(e) {
  if (e.args.length === 0) return e.name;
  const t = e.args.map(Ie).join(" ");
  return `(${e.name} ${t})`;
}
function Lx(e) {
  if (e.values)
    return kx(e);
  const t = Ou(e.value), r = e.modifiers.some((o) => o.type === "sortedBy");
  let n = null;
  if (r && e.value.type === "var" && t) {
    const o = e.value.path, s = t + ".";
    o.startsWith(s) && o.length > s.length && (n = o.slice(s.length));
  }
  let a, i = -1;
  const u = e.value;
  if (u && (u.type === "count" || u.type === "sum" || u.type === "average")) {
    const o = e.modifiers.findIndex((s) => s.type === "where");
    if (o >= 0) {
      const s = e.modifiers[o], c = Ou(u.value), l = Ie(Ln(s.condition, c));
      if (u.type === "count")
        a = `(++!! ${l})`;
      else if (u.type === "sum")
        a = `(++ (? ${l} ${Ie(u.value)}))`;
      else {
        const f = Ie(u.value);
        a = `(/ (++ (? ${l} ${f})) (++!! ${l}))`;
      }
      i = o;
    }
  }
  a == null && (a = n ? t : Ie(e.value));
  for (let o = 0; o < e.modifiers.length; o++) {
    if (o === i) continue;
    const s = e.modifiers[o];
    switch (s.type) {
      case "where": {
        a = `(? ${Ie(Ln(s.condition, t))} ${a})`;
        break;
      }
      case "sortedBy": {
        const c = Ux(s.value);
        a = `(>> ${s.order === "desc" ? "-desc " : ""}-by=${c} ${a})`, n && (a = `(. ${Un(n)} ${a})`, n = null);
        break;
      }
      case "joinedBy":
        a = `(+: ${Un(s.sep)} ${a})`;
        break;
      case "as":
        a = `(# ${Hx(s.format)} ${a})`;
        break;
      case "withLabel": {
        a = `(# -label${s.label != null ? `=${Un(s.label)}` : ""} ${a})`;
        break;
      }
      default:
        throw new xT(`Unknown modifier type: ${s.type}`);
    }
  }
  return a;
}
function kx(e) {
  const t = e.values.map(Ie);
  if (e.modifiers.some((i) => i.type === "ifPresent"))
    return `(+? ${t.join(" ")})`;
  const n = e.modifiers.find((i) => i.type === "joinedBy"), a = n ? n.sep : "";
  return `(+: ${Un(a)} ${t.join(" ")})`;
}
function Bx(e) {
  const t = Ie(e.condition), r = Ie(e.thenBranch);
  return e.elseBranch != null ? `(? ${t} ${r} ${Ie(e.elseBranch)})` : `(? ${t} ${r})`;
}
function jx(e) {
  return `(++!! ${Ie(e.value)})`;
}
function Ou(e) {
  if (e == null) return null;
  if (e.type === "var") {
    const t = e.path.split(".");
    return t.length > 1 ? t.slice(0, -1).join(".") : e.path;
  }
  return e.type === "group" ? Ou(e.inner) : e.type === "count" || e.type === "sum" || e.type === "average" ? Ou(e.value) : null;
}
function Ln(e, t) {
  if (e == null || !t) return e;
  switch (e.type) {
    case "var": {
      const r = e.path;
      return r.startsWith(t + ".") || r === t || r.includes(".") || r === "true" || r === "false" || r === "null" || r.startsWith("@") || r.startsWith("$") ? e : { type: "var", path: `${t}.${r}` };
    }
    case "binop":
      return {
        ...e,
        left: Ln(e.left, t),
        right: Ln(e.right, t)
      };
    case "unop":
      return { ...e, arg: Ln(e.arg, t) };
    case "group":
      return { ...e, inner: Ln(e.inner, t) };
    default:
      return e;
  }
}
function Fx(e) {
  const t = Ie(e.list), r = Ie(e.body).replace(
    new RegExp(`\\b${$x(e.ident)}\\b`, "g"),
    "$1"
  );
  return `(map ${t} ${Un(r)})`;
}
function $x(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ux(e) {
  if (e.type === "var") {
    const t = e.path.split(".");
    return t[t.length - 1];
  }
  return e.type === "string" ? e.value : Ie(e);
}
function Hx(e) {
  if (e.raw != null) {
    const t = e.raw;
    return t.startsWith("-") ? t : `-${t}`;
  }
  return e.value != null ? `-${e.type}=${e.value}` : `-${e.type}`;
}
function Un(e) {
  return typeof e != "string" && (e = String(e)), e.includes("'") ? e.includes('"') ? `'${e.replace(/'/g, "\\'")}'` : `"${e}"` : `'${e}'`;
}
function qx(e) {
  return e.length >= 2 && e[0] === "{" && e[e.length - 1] === "}" ? e.slice(1, -1) : e;
}
function Wx(e) {
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
function Yx(e) {
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
class wT {
  /**
   * @param {Object|string} snippets - Same forms as LoomCore accepts
   *   (source string, object, or empty). Bodies written in Plain
   *   syntax are eagerly translated to Compact form at construction
   *   time so the evaluator never sees Plain syntax.
   * @param {Object} functions - Passed through to LoomCore unchanged.
   */
  constructor(t = {}, r = {}) {
    const n = this._prepareSnippets(t);
    this.core = new ex(n, r);
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
    const r = mT(t), n = {};
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
    const r = Dn(t, { "{": "}" });
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
      const u = this.translateExpression(i, { wrapped: !1 });
      n += `{${u}}`;
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
      const r = Tx(ox(t));
      return Dx(r);
    } catch {
      return t;
    }
  }
}
function zx(e) {
  if (!Array.isArray(e)) return [[]];
  const t = [[]];
  for (const r of e)
    r.type === "divider" ? t.push([]) : t[t.length - 1].push(r);
  return t;
}
function Nn(e, t, r) {
  if (Array.isArray(e))
    return e.map((a) => Md(a, t, r));
  if (!e || typeof e != "object") return e;
  const n = e.content;
  return Array.isArray(n) ? {
    ...e,
    content: n.map((a) => Md(a, t, r))
  } : e;
}
function Md(e, t, r) {
  if (!e || typeof e != "object") return e;
  const { type: n, content: a, text: i } = e;
  return n === "text" && typeof i == "string" ? {
    ...e,
    text: t.render(i, r)
  } : a && Array.isArray(a) ? {
    ...e,
    content: a.map((u) => Md(u, t, r))
  } : e;
}
function G0(e, t, r, n) {
  const a = e?.doc ?? e;
  if (!a?.content) return Nn(a, t, r);
  const i = Lr(n, r), u = zx(a.content);
  if (!Array.isArray(i) || i.length === 0 || u.length < 2)
    return Nn(a, t, r);
  const o = [];
  if (u[0].length > 0) {
    const l = Nn(
      { type: "doc", content: u[0] },
      t,
      r
    );
    o.push(...l.content || []);
  }
  const c = (u.length >= 3 ? u.slice(1, -1) : [u[1]]).reduce((l, f, h) => (h > 0 && l.push({ type: "divider" }), l.push(...f), l), []);
  for (const l of i) {
    const f = Nn(
      { type: "doc", content: c },
      t,
      { ...r, ...l }
    );
    o.push(...f.content || []);
  }
  if (u.length >= 3) {
    const l = u[u.length - 1];
    if (l.length > 0) {
      o.push({ type: "divider" });
      const f = Nn(
        { type: "doc", content: l },
        t,
        r
      );
      o.push(...f.content || []);
    }
  }
  return { type: "doc", content: o };
}
function Gx(e) {
  const t = e?.website?.config?.placeholders;
  return !t || typeof t != "object" || Array.isArray(t) ? null : t;
}
function Kx(e = {}) {
  const {
    vars: t,
    engine: r = new wT(),
    sourceParam: n = "source",
    whereParam: a = "where",
    sortByParam: i = "sort_by",
    orderParam: u = "order"
  } = e;
  if (typeof t != "function")
    throw new Error("createLoomHandlers requires a vars function");
  return {
    content: (o, s) => {
      const c = Gx(s), l = t(o);
      if (!l && !c) return null;
      const f = c ? { ...c, ...l || {} } : l, h = s.rawContent?.doc ?? s.rawContent, p = n ? s.properties?.[n] : null;
      if (!p) return Nn(h, r, f);
      let y = Lr(p, f);
      if (Array.isArray(y)) {
        const b = a ? s.properties?.[a] : null;
        b && (y = y.filter(
          (E) => r.evaluateText(b, { ...f, ...E })
        ));
        const m = i ? s.properties?.[i] : null;
        if (m) {
          const E = u ? s.properties?.[u] : null, g = String(E ?? "").trim().toLowerCase() === "desc";
          y = Vx(y, m, f, g ? -1 : 1);
        }
        if (b || m)
          return G0(h, r, { ...f, [p]: y }, p);
      }
      return G0(h, r, f, p);
    }
  };
}
const Ld = 0, K0 = 1, PT = 1e4;
function Vx(e, t, r, n) {
  return e.map((a, i) => ({
    record: a,
    index: i,
    key: Xx(Lr(t, { ...r, ...a }))
  })).sort((a, i) => {
    if (a.key === null || i.key === null)
      return a.key === null && i.key === null ? a.index - i.index : a.key === null ? 1 : -1;
    if (a.key.tier !== i.key.tier) return n * (a.key.tier - i.key.tier);
    const u = a.key.tier === Ld ? a.key.value - i.key.value : String(a.key.value).localeCompare(String(i.key.value));
    return n * u || a.index - i.index;
  }).map((a) => a.record);
}
function Xx(e) {
  if (e == null) return null;
  if (typeof e == "number")
    return Number.isFinite(e) ? { tier: Ld, value: e * PT } : null;
  if (typeof e == "string") {
    const t = e.trim();
    if (t === "") return null;
    const r = Qx(t);
    return r !== null ? { tier: Ld, value: r } : { tier: K0, value: t };
  }
  return { tier: K0, value: String(e) };
}
function Qx(e) {
  const t = /^(\d{4})(?:[/-](\d{1,2}))?(?:[/-](\d{1,2}))?/.exec(e);
  return t ? parseInt(t[1], 10) * PT + parseInt(t[2] ?? "0", 10) * 100 + parseInt(t[3] ?? "0", 10) : null;
}
const Zx = [
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
function IT(e, t = {}) {
  return {
    title: t.title ?? e?.config?.name ?? "Academic Metrics",
    creator: t.creator ?? "Uniweb",
    subject: t.subject ?? "Academic metrics report"
  };
}
function Jx(e, t = {}) {
  return {
    adapterOptions: IT(e, t)
  };
}
function ew(e, t = {}) {
  return {
    adapterOptions: {
      ...IT(e, t),
      paragraphStyles: t.paragraphStyles ?? Zx,
      loadAsset: t.loadAsset
    }
  };
}
const tw = new wT();
function rw(e) {
  const t = Array.isArray(e?.members) ? e.members : [], r = t.reduce(
    (o, s) => o + (Array.isArray(s.publications) ? s.publications.length : 0),
    0
  ), n = t.flatMap(
    (o) => Array.isArray(o.funding) ? o.funding : []
  ), a = n.reduce(
    (o, s) => o + (Number(s.amount) || 0),
    0
  ), i = n.length, u = t.reduce(
    (o, s) => o + (Array.isArray(s.supervisions) ? s.supervisions.length : 0),
    0
  );
  return {
    members: t,
    totalPublications: r,
    totalFunding: a,
    totalGrants: i,
    totalSupervisions: u
  };
}
const Su = {
  defaultLayout: "MetricsLayout",
  props: {},
  // ⭐ The `content.data` keys every section receives — what the Loom handlers read
  // (`buildVars`) and what useFilteredMembers reads in the report sections: the
  // members and the saved views. A section receives only the keys declared for it.
  data: { members: {}, queries: {} },
  handlers: Kx({
    engine: tw,
    vars: rw
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
      getOptions: (e, t) => Jx(e, t)
    },
    docx: {
      extension: "docx",
      getOptions: (e, t) => ew(e, t)
    }
  }
}, CT = Wt(null), V0 = Wt(""), dr = {
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
}, kd = Wt(dr);
function NT() {
  return Lt(kd) || dr;
}
function ai(e, t = dr) {
  if (!e) return;
  if (typeof e != "string") return e;
  const r = t && t.colors ? t.colors : dr.colors;
  return Object.prototype.hasOwnProperty.call(r, e) ? X0(r[e]) : X0(e);
}
function nw(e, t = dr) {
  if (!e) return;
  if (typeof e != "string") return e;
  const r = t && t.fonts ? t.fonts : dr.fonts;
  return Object.prototype.hasOwnProperty.call(r, e) ? r[e] : e;
}
function X0(e) {
  return typeof e == "string" && e.startsWith("#") ? e.slice(1) : e;
}
function RT() {
  const e = /* @__PURE__ */ new WeakMap(), t = [], r = (n, a) => `${n}@${a && a.role || "body"}`;
  return {
    register(n, a, i, u = {}) {
      let o = e.get(n);
      o || (o = /* @__PURE__ */ new Map(), e.set(n, o), t.push(n)), o.set(r(a, u), { fragment: i, options: u });
    },
    getOutputs(n) {
      const a = [], i = `${n}@`;
      for (const u of t) {
        const o = e.get(u);
        if (o)
          for (const [s, c] of o)
            s.startsWith(i) && a.push({ block: u, ...c });
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
function aw(e) {
  return e ? {
    colors: { ...dr.colors, ...e.colors || {} },
    fonts: { ...dr.fonts, ...e.fonts || {} },
    ...Object.fromEntries(
      Object.entries(e).filter(
        ([t]) => t !== "colors" && t !== "fonts"
      )
    )
  } : dr;
}
function DT({
  children: e,
  basePath: t = "",
  theme: r,
  store: n
}) {
  const a = Dr(
    () => n || RT(),
    [n]
  ), i = t || "", u = Dr(() => aw(r), [r]);
  return a.wrapWithProviders = (o) => ti(
    V0.Provider,
    { value: i },
    ti(
      kd.Provider,
      { value: u },
      o
    )
  ), /* @__PURE__ */ P(CT.Provider, { value: a, children: /* @__PURE__ */ P(V0.Provider, { value: i, children: /* @__PURE__ */ P(kd.Provider, { value: u, children: e }) }) });
}
function rt(e, t, r, n = {}) {
  const a = Lt(CT);
  a && a.register(e, t, r, n);
}
const iw = /* @__PURE__ */ new Set([
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
]), Oe = "�";
var O;
(function(e) {
  e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
})(O || (O = {}));
const lt = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function MT(e) {
  return e >= 55296 && e <= 57343;
}
function uw(e) {
  return e >= 56320 && e <= 57343;
}
function ow(e, t) {
  return (e - 55296) * 1024 + 9216 + t;
}
function LT(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function kT(e) {
  return e >= 64976 && e <= 65007 || iw.has(e);
}
var B;
(function(e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(B || (B = {}));
const sw = 65536;
class cw {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = sw, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(t, r) {
    const { line: n, col: a, offset: i } = this, u = a + r, o = i + r;
    return {
      code: t,
      startLine: n,
      endLine: n,
      startCol: u,
      endCol: u,
      startOffset: o,
      endOffset: o
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
      if (uw(r))
        return this.pos++, this._addGap(), ow(t, r);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, O.EOF;
    return this._err(B.surrogateInInputStream), t;
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
      return this.endOfChunkHit = !this.lastChunkWritten, O.EOF;
    const n = this.html.charCodeAt(r);
    return n === O.CARRIAGE_RETURN ? O.LINE_FEED : n;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, O.EOF;
    let t = this.html.charCodeAt(this.pos);
    return t === O.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, O.LINE_FEED) : t === O.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, MT(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === O.LINE_FEED || t === O.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    LT(t) ? this._err(B.controlCharacterInInputStream) : kT(t) && this._err(B.noncharacterInInputStream);
  }
  retreat(t) {
    for (this.pos -= t; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
var fe;
(function(e) {
  e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})(fe || (fe = {}));
function BT(e, t) {
  for (let r = e.attrs.length - 1; r >= 0; r--)
    if (e.attrs[r].name === t)
      return e.attrs[r].value;
  return null;
}
const lw = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ 'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), fw = /* @__PURE__ */ new Map([
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
function dw(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = fw.get(e)) !== null && t !== void 0 ? t : e;
}
var ze;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(ze || (ze = {}));
const hw = 32;
var Nr;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(Nr || (Nr = {}));
function Bd(e) {
  return e >= ze.ZERO && e <= ze.NINE;
}
function pw(e) {
  return e >= ze.UPPER_A && e <= ze.UPPER_F || e >= ze.LOWER_A && e <= ze.LOWER_F;
}
function mw(e) {
  return e >= ze.UPPER_A && e <= ze.UPPER_Z || e >= ze.LOWER_A && e <= ze.LOWER_Z || Bd(e);
}
function bw(e) {
  return e === ze.EQUALS || mw(e);
}
var qe;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(qe || (qe = {}));
var ur;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(ur || (ur = {}));
class yw {
  constructor(t, r, n) {
    this.decodeTree = t, this.emitCodePoint = r, this.errors = n, this.state = qe.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = ur.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = qe.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
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
      case qe.EntityStart:
        return t.charCodeAt(r) === ze.NUM ? (this.state = qe.NumericStart, this.consumed += 1, this.stateNumericStart(t, r + 1)) : (this.state = qe.NamedEntity, this.stateNamedEntity(t, r));
      case qe.NumericStart:
        return this.stateNumericStart(t, r);
      case qe.NumericDecimal:
        return this.stateNumericDecimal(t, r);
      case qe.NumericHex:
        return this.stateNumericHex(t, r);
      case qe.NamedEntity:
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
    return r >= t.length ? -1 : (t.charCodeAt(r) | hw) === ze.LOWER_X ? (this.state = qe.NumericHex, this.consumed += 1, this.stateNumericHex(t, r + 1)) : (this.state = qe.NumericDecimal, this.stateNumericDecimal(t, r));
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
      if (Bd(a) || pw(a))
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
      if (Bd(a))
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
    if (t === ze.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === ur.Strict)
      return 0;
    return this.emitCodePoint(dw(this.result), this.consumed), this.errors && (t !== ze.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
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
    let a = n[this.treeIndex], i = (a & Nr.VALUE_LENGTH) >> 14;
    for (; r < t.length; r++, this.excess++) {
      const u = t.charCodeAt(r);
      if (this.treeIndex = gw(n, a, this.treeIndex + Math.max(1, i), u), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === ur.Attribute && // We shouldn't have consumed any characters after the entity,
        (i === 0 || // And there should be no invalid characters.
        bw(u)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (a = n[this.treeIndex], i = (a & Nr.VALUE_LENGTH) >> 14, i !== 0) {
        if (u === ze.SEMI)
          return this.emitNamedEntityData(this.treeIndex, i, this.consumed + this.excess);
        this.decodeMode !== ur.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
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
    const { result: r, decodeTree: n } = this, a = (n[r] & Nr.VALUE_LENGTH) >> 14;
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
    return this.emitCodePoint(r === 1 ? a[t] & ~Nr.VALUE_LENGTH : a[t + 1], n), r === 3 && this.emitCodePoint(a[t + 2], n), n;
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
      case qe.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== ur.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case qe.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case qe.NumericHex:
        return this.emitNumericEntity(0, 3);
      case qe.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case qe.EntityStart:
        return 0;
    }
  }
}
function gw(e, t, r, n) {
  const a = (t & Nr.BRANCH_LENGTH) >> 7, i = t & Nr.JUMP_TABLE;
  if (a === 0)
    return i !== 0 && n === i ? r : -1;
  if (i) {
    const s = n - i;
    return s < 0 || s >= a ? -1 : e[r + s] - 1;
  }
  let u = r, o = u + a - 1;
  for (; u <= o; ) {
    const s = u + o >>> 1, c = e[s];
    if (c < n)
      u = s + 1;
    else if (c > n)
      o = s - 1;
    else
      return e[s + a];
  }
  return -1;
}
var H;
(function(e) {
  e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(H || (H = {}));
var un;
(function(e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(un || (un = {}));
var xt;
(function(e) {
  e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})(xt || (xt = {}));
var M;
(function(e) {
  e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(M || (M = {}));
var d;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP";
})(d || (d = {}));
const vw = /* @__PURE__ */ new Map([
  [M.A, d.A],
  [M.ADDRESS, d.ADDRESS],
  [M.ANNOTATION_XML, d.ANNOTATION_XML],
  [M.APPLET, d.APPLET],
  [M.AREA, d.AREA],
  [M.ARTICLE, d.ARTICLE],
  [M.ASIDE, d.ASIDE],
  [M.B, d.B],
  [M.BASE, d.BASE],
  [M.BASEFONT, d.BASEFONT],
  [M.BGSOUND, d.BGSOUND],
  [M.BIG, d.BIG],
  [M.BLOCKQUOTE, d.BLOCKQUOTE],
  [M.BODY, d.BODY],
  [M.BR, d.BR],
  [M.BUTTON, d.BUTTON],
  [M.CAPTION, d.CAPTION],
  [M.CENTER, d.CENTER],
  [M.CODE, d.CODE],
  [M.COL, d.COL],
  [M.COLGROUP, d.COLGROUP],
  [M.DD, d.DD],
  [M.DESC, d.DESC],
  [M.DETAILS, d.DETAILS],
  [M.DIALOG, d.DIALOG],
  [M.DIR, d.DIR],
  [M.DIV, d.DIV],
  [M.DL, d.DL],
  [M.DT, d.DT],
  [M.EM, d.EM],
  [M.EMBED, d.EMBED],
  [M.FIELDSET, d.FIELDSET],
  [M.FIGCAPTION, d.FIGCAPTION],
  [M.FIGURE, d.FIGURE],
  [M.FONT, d.FONT],
  [M.FOOTER, d.FOOTER],
  [M.FOREIGN_OBJECT, d.FOREIGN_OBJECT],
  [M.FORM, d.FORM],
  [M.FRAME, d.FRAME],
  [M.FRAMESET, d.FRAMESET],
  [M.H1, d.H1],
  [M.H2, d.H2],
  [M.H3, d.H3],
  [M.H4, d.H4],
  [M.H5, d.H5],
  [M.H6, d.H6],
  [M.HEAD, d.HEAD],
  [M.HEADER, d.HEADER],
  [M.HGROUP, d.HGROUP],
  [M.HR, d.HR],
  [M.HTML, d.HTML],
  [M.I, d.I],
  [M.IMG, d.IMG],
  [M.IMAGE, d.IMAGE],
  [M.INPUT, d.INPUT],
  [M.IFRAME, d.IFRAME],
  [M.KEYGEN, d.KEYGEN],
  [M.LABEL, d.LABEL],
  [M.LI, d.LI],
  [M.LINK, d.LINK],
  [M.LISTING, d.LISTING],
  [M.MAIN, d.MAIN],
  [M.MALIGNMARK, d.MALIGNMARK],
  [M.MARQUEE, d.MARQUEE],
  [M.MATH, d.MATH],
  [M.MENU, d.MENU],
  [M.META, d.META],
  [M.MGLYPH, d.MGLYPH],
  [M.MI, d.MI],
  [M.MO, d.MO],
  [M.MN, d.MN],
  [M.MS, d.MS],
  [M.MTEXT, d.MTEXT],
  [M.NAV, d.NAV],
  [M.NOBR, d.NOBR],
  [M.NOFRAMES, d.NOFRAMES],
  [M.NOEMBED, d.NOEMBED],
  [M.NOSCRIPT, d.NOSCRIPT],
  [M.OBJECT, d.OBJECT],
  [M.OL, d.OL],
  [M.OPTGROUP, d.OPTGROUP],
  [M.OPTION, d.OPTION],
  [M.P, d.P],
  [M.PARAM, d.PARAM],
  [M.PLAINTEXT, d.PLAINTEXT],
  [M.PRE, d.PRE],
  [M.RB, d.RB],
  [M.RP, d.RP],
  [M.RT, d.RT],
  [M.RTC, d.RTC],
  [M.RUBY, d.RUBY],
  [M.S, d.S],
  [M.SCRIPT, d.SCRIPT],
  [M.SEARCH, d.SEARCH],
  [M.SECTION, d.SECTION],
  [M.SELECT, d.SELECT],
  [M.SOURCE, d.SOURCE],
  [M.SMALL, d.SMALL],
  [M.SPAN, d.SPAN],
  [M.STRIKE, d.STRIKE],
  [M.STRONG, d.STRONG],
  [M.STYLE, d.STYLE],
  [M.SUB, d.SUB],
  [M.SUMMARY, d.SUMMARY],
  [M.SUP, d.SUP],
  [M.TABLE, d.TABLE],
  [M.TBODY, d.TBODY],
  [M.TEMPLATE, d.TEMPLATE],
  [M.TEXTAREA, d.TEXTAREA],
  [M.TFOOT, d.TFOOT],
  [M.TD, d.TD],
  [M.TH, d.TH],
  [M.THEAD, d.THEAD],
  [M.TITLE, d.TITLE],
  [M.TR, d.TR],
  [M.TRACK, d.TRACK],
  [M.TT, d.TT],
  [M.U, d.U],
  [M.UL, d.UL],
  [M.SVG, d.SVG],
  [M.VAR, d.VAR],
  [M.WBR, d.WBR],
  [M.XMP, d.XMP]
]);
function Io(e) {
  var t;
  return (t = vw.get(e)) !== null && t !== void 0 ? t : d.UNKNOWN;
}
const Y = d, Ew = {
  [H.HTML]: /* @__PURE__ */ new Set([
    Y.ADDRESS,
    Y.APPLET,
    Y.AREA,
    Y.ARTICLE,
    Y.ASIDE,
    Y.BASE,
    Y.BASEFONT,
    Y.BGSOUND,
    Y.BLOCKQUOTE,
    Y.BODY,
    Y.BR,
    Y.BUTTON,
    Y.CAPTION,
    Y.CENTER,
    Y.COL,
    Y.COLGROUP,
    Y.DD,
    Y.DETAILS,
    Y.DIR,
    Y.DIV,
    Y.DL,
    Y.DT,
    Y.EMBED,
    Y.FIELDSET,
    Y.FIGCAPTION,
    Y.FIGURE,
    Y.FOOTER,
    Y.FORM,
    Y.FRAME,
    Y.FRAMESET,
    Y.H1,
    Y.H2,
    Y.H3,
    Y.H4,
    Y.H5,
    Y.H6,
    Y.HEAD,
    Y.HEADER,
    Y.HGROUP,
    Y.HR,
    Y.HTML,
    Y.IFRAME,
    Y.IMG,
    Y.INPUT,
    Y.LI,
    Y.LINK,
    Y.LISTING,
    Y.MAIN,
    Y.MARQUEE,
    Y.MENU,
    Y.META,
    Y.NAV,
    Y.NOEMBED,
    Y.NOFRAMES,
    Y.NOSCRIPT,
    Y.OBJECT,
    Y.OL,
    Y.P,
    Y.PARAM,
    Y.PLAINTEXT,
    Y.PRE,
    Y.SCRIPT,
    Y.SECTION,
    Y.SELECT,
    Y.SOURCE,
    Y.STYLE,
    Y.SUMMARY,
    Y.TABLE,
    Y.TBODY,
    Y.TD,
    Y.TEMPLATE,
    Y.TEXTAREA,
    Y.TFOOT,
    Y.TH,
    Y.THEAD,
    Y.TITLE,
    Y.TR,
    Y.TRACK,
    Y.UL,
    Y.WBR,
    Y.XMP
  ]),
  [H.MATHML]: /* @__PURE__ */ new Set([Y.MI, Y.MO, Y.MN, Y.MS, Y.MTEXT, Y.ANNOTATION_XML]),
  [H.SVG]: /* @__PURE__ */ new Set([Y.TITLE, Y.FOREIGN_OBJECT, Y.DESC]),
  [H.XLINK]: /* @__PURE__ */ new Set(),
  [H.XML]: /* @__PURE__ */ new Set(),
  [H.XMLNS]: /* @__PURE__ */ new Set()
}, jd = /* @__PURE__ */ new Set([Y.H1, Y.H2, Y.H3, Y.H4, Y.H5, Y.H6]);
M.STYLE, M.SCRIPT, M.XMP, M.IFRAME, M.NOEMBED, M.NOFRAMES, M.PLAINTEXT;
var x;
(function(e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
})(x || (x = {}));
const dt = {
  DATA: x.DATA,
  RCDATA: x.RCDATA,
  RAWTEXT: x.RAWTEXT,
  SCRIPT_DATA: x.SCRIPT_DATA,
  PLAINTEXT: x.PLAINTEXT,
  CDATA_SECTION: x.CDATA_SECTION
};
function Tw(e) {
  return e >= O.DIGIT_0 && e <= O.DIGIT_9;
}
function $a(e) {
  return e >= O.LATIN_CAPITAL_A && e <= O.LATIN_CAPITAL_Z;
}
function _w(e) {
  return e >= O.LATIN_SMALL_A && e <= O.LATIN_SMALL_Z;
}
function xr(e) {
  return _w(e) || $a(e);
}
function Q0(e) {
  return xr(e) || Tw(e);
}
function tu(e) {
  return e + 32;
}
function jT(e) {
  return e === O.SPACE || e === O.LINE_FEED || e === O.TABULATION || e === O.FORM_FEED;
}
function Z0(e) {
  return jT(e) || e === O.SOLIDUS || e === O.GREATER_THAN_SIGN;
}
function Aw(e) {
  return e === O.NULL ? B.nullCharacterReference : e > 1114111 ? B.characterReferenceOutsideUnicodeRange : MT(e) ? B.surrogateCharacterReference : kT(e) ? B.noncharacterCharacterReference : LT(e) || e === O.CARRIAGE_RETURN ? B.controlCharacterReference : null;
}
class Ow {
  constructor(t, r) {
    this.options = t, this.handler = r, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = x.DATA, this.returnState = x.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new cw(r), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new yw(lw, (n, a) => {
      this.preprocessor.pos = this.entityStartPos + a - 1, this._flushCodePointConsumedAsCharacterReference(n);
    }, r.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(B.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (n) => {
        this._err(B.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + n);
      },
      validateNumericCharacterReference: (n) => {
        const a = Aw(n);
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
      type: fe.START_TAG,
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
      type: fe.END_TAG,
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
      type: fe.COMMENT,
      data: "",
      location: this.getCurrentLocation(t)
    };
  }
  _createDoctypeToken(t) {
    this.currentToken = {
      type: fe.DOCTYPE,
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
    if (BT(n, this.currentAttr.name) === null) {
      if (n.attrs.push(this.currentAttr), n.location && this.currentLocation) {
        const a = (t = (r = n.location).attrs) !== null && t !== void 0 ? t : r.attrs = /* @__PURE__ */ Object.create(null);
        a[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(B.duplicateAttribute);
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
    this.prepareToken(t), t.tagID = Io(t.tagName), t.type === fe.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(B.endTagWithAttributes), t.selfClosing && this._err(B.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
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
        case fe.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case fe.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case fe.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const t = this.getCurrentLocation(0);
    t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({ type: fe.EOF, location: t }), this.active = !1;
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
    const r = jT(t) ? fe.WHITESPACE_CHARACTER : t === O.NULL ? fe.NULL_CHARACTER : fe.CHARACTER;
    this._appendCharToCurrentCharacterToken(r, String.fromCodePoint(t));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(t) {
    this._appendCharToCurrentCharacterToken(fe.CHARACTER, t);
  }
  // Character reference helpers
  _startCharacterReference() {
    this.returnState = this.state, this.state = x.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? ur.Attribute : ur.Legacy);
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
      case O.LESS_THAN_SIGN: {
        this.state = x.TAG_OPEN;
        break;
      }
      case O.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this._emitCodePoint(t);
        break;
      }
      case O.EOF: {
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
      case O.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case O.LESS_THAN_SIGN: {
        this.state = x.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this._emitChars(Oe);
        break;
      }
      case O.EOF: {
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
      case O.LESS_THAN_SIGN: {
        this.state = x.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this._emitChars(Oe);
        break;
      }
      case O.EOF: {
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
      case O.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this._emitChars(Oe);
        break;
      }
      case O.EOF: {
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
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this._emitChars(Oe);
        break;
      }
      case O.EOF: {
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
    if (xr(t))
      this._createStartTagToken(), this.state = x.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case O.EXCLAMATION_MARK: {
          this.state = x.MARKUP_DECLARATION_OPEN;
          break;
        }
        case O.SOLIDUS: {
          this.state = x.END_TAG_OPEN;
          break;
        }
        case O.QUESTION_MARK: {
          this._err(B.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = x.BOGUS_COMMENT, this._stateBogusComment(t);
          break;
        }
        case O.EOF: {
          this._err(B.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(B.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = x.DATA, this._stateData(t);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(t) {
    if (xr(t))
      this._createEndTagToken(), this.state = x.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case O.GREATER_THAN_SIGN: {
          this._err(B.missingEndTagName), this.state = x.DATA;
          break;
        }
        case O.EOF: {
          this._err(B.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(B.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = x.BOGUS_COMMENT, this._stateBogusComment(t);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(t) {
    const r = this.currentToken;
    switch (t) {
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED: {
        this.state = x.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case O.SOLIDUS: {
        this.state = x.SELF_CLOSING_START_TAG;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), r.tagName += Oe;
        break;
      }
      case O.EOF: {
        this._err(B.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        r.tagName += String.fromCodePoint($a(t) ? tu(t) : t);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(t) {
    t === O.SOLIDUS ? this.state = x.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = x.RCDATA, this._stateRcdata(t));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(t) {
    xr(t) ? (this.state = x.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = x.RCDATA, this._stateRcdata(t));
  }
  handleSpecialEndTag(t) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    const r = this.currentToken;
    switch (r.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = x.BEFORE_ATTRIBUTE_NAME, !1;
      case O.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = x.SELF_CLOSING_START_TAG, !1;
      case O.GREATER_THAN_SIGN:
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
    t === O.SOLIDUS ? this.state = x.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = x.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(t) {
    xr(t) ? (this.state = x.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = x.RAWTEXT, this._stateRawtext(t));
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
      case O.SOLIDUS: {
        this.state = x.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case O.EXCLAMATION_MARK: {
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
    xr(t) ? (this.state = x.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = x.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = x.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(t) {
    t === O.HYPHEN_MINUS ? (this.state = x.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = x.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(t) {
    t === O.HYPHEN_MINUS ? (this.state = x.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = x.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(t) {
    switch (t) {
      case O.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case O.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this._emitChars(Oe);
        break;
      }
      case O.EOF: {
        this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
      case O.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case O.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_ESCAPED, this._emitChars(Oe);
        break;
      }
      case O.EOF: {
        this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
      case O.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case O.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this.state = x.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_ESCAPED, this._emitChars(Oe);
        break;
      }
      case O.EOF: {
        this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = x.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(t) {
    t === O.SOLIDUS ? this.state = x.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : xr(t) ? (this._emitChars("<"), this.state = x.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(t) {
    xr(t) ? (this.state = x.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(lt.SCRIPT, !1) && Z0(this.preprocessor.peek(lt.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let r = 0; r < lt.SCRIPT.length; r++)
        this._emitCodePoint(this._consume());
      this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else this._ensureHibernation() || (this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(t) {
    switch (t) {
      case O.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case O.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this._emitChars(Oe);
        break;
      }
      case O.EOF: {
        this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
      case O.HYPHEN_MINUS: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case O.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(Oe);
        break;
      }
      case O.EOF: {
        this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
      case O.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case O.LESS_THAN_SIGN: {
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this.state = x.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(Oe);
        break;
      }
      case O.EOF: {
        this._err(B.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(t) {
    t === O.SOLIDUS ? (this.state = x.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(t) {
    if (this.preprocessor.startsWith(lt.SCRIPT, !1) && Z0(this.preprocessor.peek(lt.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let r = 0; r < lt.SCRIPT.length; r++)
        this._emitCodePoint(this._consume());
      this.state = x.SCRIPT_DATA_ESCAPED;
    } else this._ensureHibernation() || (this.state = x.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(t) {
    switch (t) {
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED:
        break;
      case O.SOLIDUS:
      case O.GREATER_THAN_SIGN:
      case O.EOF: {
        this.state = x.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case O.EQUALS_SIGN: {
        this._err(B.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = x.ATTRIBUTE_NAME;
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
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED:
      case O.SOLIDUS:
      case O.GREATER_THAN_SIGN:
      case O.EOF: {
        this._leaveAttrName(), this.state = x.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case O.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = x.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case O.QUOTATION_MARK:
      case O.APOSTROPHE:
      case O.LESS_THAN_SIGN: {
        this._err(B.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this.currentAttr.name += Oe;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint($a(t) ? tu(t) : t);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(t) {
    switch (t) {
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED:
        break;
      case O.SOLIDUS: {
        this.state = x.SELF_CLOSING_START_TAG;
        break;
      }
      case O.EQUALS_SIGN: {
        this.state = x.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case O.EOF: {
        this._err(B.eofInTag), this._emitEOFToken();
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
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED:
        break;
      case O.QUOTATION_MARK: {
        this.state = x.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case O.APOSTROPHE: {
        this.state = x.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.missingAttributeValue), this.state = x.DATA, this.emitCurrentTagToken();
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
      case O.QUOTATION_MARK: {
        this.state = x.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case O.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this.currentAttr.value += Oe;
        break;
      }
      case O.EOF: {
        this._err(B.eofInTag), this._emitEOFToken();
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
      case O.APOSTROPHE: {
        this.state = x.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case O.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this.currentAttr.value += Oe;
        break;
      }
      case O.EOF: {
        this._err(B.eofInTag), this._emitEOFToken();
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
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED: {
        this._leaveAttrValue(), this.state = x.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case O.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), this.currentAttr.value += Oe;
        break;
      }
      case O.QUOTATION_MARK:
      case O.APOSTROPHE:
      case O.LESS_THAN_SIGN:
      case O.EQUALS_SIGN:
      case O.GRAVE_ACCENT: {
        this._err(B.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
        break;
      }
      case O.EOF: {
        this._err(B.eofInTag), this._emitEOFToken();
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
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED: {
        this._leaveAttrValue(), this.state = x.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case O.SOLIDUS: {
        this._leaveAttrValue(), this.state = x.SELF_CLOSING_START_TAG;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case O.EOF: {
        this._err(B.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(B.missingWhitespaceBetweenAttributes), this.state = x.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(t) {
    switch (t) {
      case O.GREATER_THAN_SIGN: {
        const r = this.currentToken;
        r.selfClosing = !0, this.state = x.DATA, this.emitCurrentTagToken();
        break;
      }
      case O.EOF: {
        this._err(B.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(B.unexpectedSolidusInTag), this.state = x.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(t) {
    const r = this.currentToken;
    switch (t) {
      case O.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentComment(r);
        break;
      }
      case O.EOF: {
        this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), r.data += Oe;
        break;
      }
      default:
        r.data += String.fromCodePoint(t);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(t) {
    this._consumeSequenceIfMatch(lt.DASH_DASH, !0) ? (this._createCommentToken(lt.DASH_DASH.length + 1), this.state = x.COMMENT_START) : this._consumeSequenceIfMatch(lt.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(lt.DOCTYPE.length + 1), this.state = x.DOCTYPE) : this._consumeSequenceIfMatch(lt.CDATA_START, !0) ? this.inForeignNode ? this.state = x.CDATA_SECTION : (this._err(B.cdataInHtmlContent), this._createCommentToken(lt.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = x.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(B.incorrectlyOpenedComment), this._createCommentToken(2), this.state = x.BOGUS_COMMENT, this._stateBogusComment(t));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(t) {
    switch (t) {
      case O.HYPHEN_MINUS: {
        this.state = x.COMMENT_START_DASH;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.abruptClosingOfEmptyComment), this.state = x.DATA;
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
      case O.HYPHEN_MINUS: {
        this.state = x.COMMENT_END;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.abruptClosingOfEmptyComment), this.state = x.DATA, this.emitCurrentComment(r);
        break;
      }
      case O.EOF: {
        this._err(B.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
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
      case O.HYPHEN_MINUS: {
        this.state = x.COMMENT_END_DASH;
        break;
      }
      case O.LESS_THAN_SIGN: {
        r.data += "<", this.state = x.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), r.data += Oe;
        break;
      }
      case O.EOF: {
        this._err(B.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
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
      case O.EXCLAMATION_MARK: {
        r.data += "!", this.state = x.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case O.LESS_THAN_SIGN: {
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
    t === O.HYPHEN_MINUS ? this.state = x.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = x.COMMENT, this._stateComment(t));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(t) {
    t === O.HYPHEN_MINUS ? this.state = x.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = x.COMMENT_END_DASH, this._stateCommentEndDash(t));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(t) {
    t !== O.GREATER_THAN_SIGN && t !== O.EOF && this._err(B.nestedComment), this.state = x.COMMENT_END, this._stateCommentEnd(t);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(t) {
    const r = this.currentToken;
    switch (t) {
      case O.HYPHEN_MINUS: {
        this.state = x.COMMENT_END;
        break;
      }
      case O.EOF: {
        this._err(B.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
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
      case O.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentComment(r);
        break;
      }
      case O.EXCLAMATION_MARK: {
        this.state = x.COMMENT_END_BANG;
        break;
      }
      case O.HYPHEN_MINUS: {
        r.data += "-";
        break;
      }
      case O.EOF: {
        this._err(B.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
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
      case O.HYPHEN_MINUS: {
        r.data += "--!", this.state = x.COMMENT_END_DASH;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.incorrectlyClosedComment), this.state = x.DATA, this.emitCurrentComment(r);
        break;
      }
      case O.EOF: {
        this._err(B.eofInComment), this.emitCurrentComment(r), this._emitEOFToken();
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
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED: {
        this.state = x.BEFORE_DOCTYPE_NAME;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this.state = x.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), this._createDoctypeToken(null);
        const r = this.currentToken;
        r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(B.missingWhitespaceBeforeDoctypeName), this.state = x.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(t) {
    if ($a(t))
      this._createDoctypeToken(String.fromCharCode(tu(t))), this.state = x.DOCTYPE_NAME;
    else
      switch (t) {
        case O.SPACE:
        case O.LINE_FEED:
        case O.TABULATION:
        case O.FORM_FEED:
          break;
        case O.NULL: {
          this._err(B.unexpectedNullCharacter), this._createDoctypeToken(Oe), this.state = x.DOCTYPE_NAME;
          break;
        }
        case O.GREATER_THAN_SIGN: {
          this._err(B.missingDoctypeName), this._createDoctypeToken(null);
          const r = this.currentToken;
          r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = x.DATA;
          break;
        }
        case O.EOF: {
          this._err(B.eofInDoctype), this._createDoctypeToken(null);
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
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED: {
        this.state = x.AFTER_DOCTYPE_NAME;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), r.name += Oe;
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        r.name += String.fromCodePoint($a(t) ? tu(t) : t);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(t) {
    const r = this.currentToken;
    switch (t) {
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED:
        break;
      case O.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(lt.PUBLIC, !1) ? this.state = x.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(lt.SYSTEM, !1) ? this.state = x.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(B.invalidCharacterSequenceAfterDoctypeName), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(t) {
    const r = this.currentToken;
    switch (t) {
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED: {
        this.state = x.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case O.QUOTATION_MARK: {
        this._err(B.missingWhitespaceAfterDoctypePublicKeyword), r.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case O.APOSTROPHE: {
        this._err(B.missingWhitespaceAfterDoctypePublicKeyword), r.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.missingDoctypePublicIdentifier), r.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(B.missingQuoteBeforeDoctypePublicIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED:
        break;
      case O.QUOTATION_MARK: {
        r.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case O.APOSTROPHE: {
        r.publicId = "", this.state = x.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.missingDoctypePublicIdentifier), r.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(B.missingQuoteBeforeDoctypePublicIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case O.QUOTATION_MARK: {
        this.state = x.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), r.publicId += Oe;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.abruptDoctypePublicIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
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
      case O.APOSTROPHE: {
        this.state = x.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), r.publicId += Oe;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.abruptDoctypePublicIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
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
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED: {
        this.state = x.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case O.QUOTATION_MARK: {
        this._err(B.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case O.APOSTROPHE: {
        this._err(B.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(B.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
    const r = this.currentToken;
    switch (t) {
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED:
        break;
      case O.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case O.QUOTATION_MARK: {
        r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case O.APOSTROPHE: {
        r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(B.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(t) {
    const r = this.currentToken;
    switch (t) {
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED: {
        this.state = x.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case O.QUOTATION_MARK: {
        this._err(B.missingWhitespaceAfterDoctypeSystemKeyword), r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case O.APOSTROPHE: {
        this._err(B.missingWhitespaceAfterDoctypeSystemKeyword), r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.missingDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(B.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(t) {
    const r = this.currentToken;
    switch (t) {
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED:
        break;
      case O.QUOTATION_MARK: {
        r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case O.APOSTROPHE: {
        r.systemId = "", this.state = x.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.missingDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.DATA, this.emitCurrentDoctype(r);
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(B.missingQuoteBeforeDoctypeSystemIdentifier), r.forceQuirks = !0, this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(t) {
    const r = this.currentToken;
    switch (t) {
      case O.QUOTATION_MARK: {
        this.state = x.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), r.systemId += Oe;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.abruptDoctypeSystemIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
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
      case O.APOSTROPHE: {
        this.state = x.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter), r.systemId += Oe;
        break;
      }
      case O.GREATER_THAN_SIGN: {
        this._err(B.abruptDoctypeSystemIdentifier), r.forceQuirks = !0, this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
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
      case O.SPACE:
      case O.LINE_FEED:
      case O.TABULATION:
      case O.FORM_FEED:
        break;
      case O.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case O.EOF: {
        this._err(B.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(B.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = x.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(t) {
    const r = this.currentToken;
    switch (t) {
      case O.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), this.state = x.DATA;
        break;
      }
      case O.NULL: {
        this._err(B.unexpectedNullCharacter);
        break;
      }
      case O.EOF: {
        this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(t) {
    switch (t) {
      case O.RIGHT_SQUARE_BRACKET: {
        this.state = x.CDATA_SECTION_BRACKET;
        break;
      }
      case O.EOF: {
        this._err(B.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(t) {
    t === O.RIGHT_SQUARE_BRACKET ? this.state = x.CDATA_SECTION_END : (this._emitChars("]"), this.state = x.CDATA_SECTION, this._stateCdataSection(t));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(t) {
    switch (t) {
      case O.GREATER_THAN_SIGN: {
        this.state = x.DATA;
        break;
      }
      case O.RIGHT_SQUARE_BRACKET: {
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
    t === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(O.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && Q0(this.preprocessor.peek(1)) ? x.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    Q0(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === O.SEMICOLON && this._err(B.unknownNamedCharacterReference), this.state = this.returnState, this._callState(t));
  }
}
const FT = /* @__PURE__ */ new Set([d.DD, d.DT, d.LI, d.OPTGROUP, d.OPTION, d.P, d.RB, d.RP, d.RT, d.RTC]), J0 = /* @__PURE__ */ new Set([
  ...FT,
  d.CAPTION,
  d.COLGROUP,
  d.TBODY,
  d.TD,
  d.TFOOT,
  d.TH,
  d.THEAD,
  d.TR
]), xu = /* @__PURE__ */ new Set([
  d.APPLET,
  d.CAPTION,
  d.HTML,
  d.MARQUEE,
  d.OBJECT,
  d.TABLE,
  d.TD,
  d.TEMPLATE,
  d.TH
]), Sw = /* @__PURE__ */ new Set([...xu, d.OL, d.UL]), xw = /* @__PURE__ */ new Set([...xu, d.BUTTON]), em = /* @__PURE__ */ new Set([d.ANNOTATION_XML, d.MI, d.MN, d.MO, d.MS, d.MTEXT]), tm = /* @__PURE__ */ new Set([d.DESC, d.FOREIGN_OBJECT, d.TITLE]), ww = /* @__PURE__ */ new Set([d.TR, d.TEMPLATE, d.HTML]), Pw = /* @__PURE__ */ new Set([d.TBODY, d.TFOOT, d.THEAD, d.TEMPLATE, d.HTML]), Iw = /* @__PURE__ */ new Set([d.TABLE, d.TEMPLATE, d.HTML]), Cw = /* @__PURE__ */ new Set([d.TD, d.TH]);
class Nw {
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
    return this.currentTagId === d.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === H.HTML;
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
    while (r > 0 && this.treeAdapter.getNamespaceURI(this.items[r]) !== H.HTML);
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
    this.popUntilPopped(jd, H.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(Cw, H.HTML);
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
    this.clearBackTo(Iw, H.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(Pw, H.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(ww, H.HTML);
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
        case H.HTML: {
          if (a === t)
            return !0;
          if (r.has(a))
            return !1;
          break;
        }
        case H.SVG: {
          if (tm.has(a))
            return !1;
          break;
        }
        case H.MATHML: {
          if (em.has(a))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInScope(t) {
    return this.hasInDynamicScope(t, xu);
  }
  hasInListItemScope(t) {
    return this.hasInDynamicScope(t, Sw);
  }
  hasInButtonScope(t) {
    return this.hasInDynamicScope(t, xw);
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t];
      switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
        case H.HTML: {
          if (jd.has(r))
            return !0;
          if (xu.has(r))
            return !1;
          break;
        }
        case H.SVG: {
          if (tm.has(r))
            return !1;
          break;
        }
        case H.MATHML: {
          if (em.has(r))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInTableScope(t) {
    for (let r = this.stackTop; r >= 0; r--)
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === H.HTML)
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
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === H.HTML)
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
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === H.HTML)
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
    for (; this.currentTagId !== void 0 && FT.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; this.currentTagId !== void 0 && J0.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== void 0 && this.currentTagId !== t && J0.has(this.currentTagId); )
      this.pop();
  }
}
const Os = 3;
var Gt;
(function(e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(Gt || (Gt = {}));
const rm = { type: Gt.Marker };
class Rw {
  constructor(t) {
    this.treeAdapter = t, this.entries = [], this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(t, r) {
    const n = [], a = r.length, i = this.treeAdapter.getTagName(t), u = this.treeAdapter.getNamespaceURI(t);
    for (let o = 0; o < this.entries.length; o++) {
      const s = this.entries[o];
      if (s.type === Gt.Marker)
        break;
      const { element: c } = s;
      if (this.treeAdapter.getTagName(c) === i && this.treeAdapter.getNamespaceURI(c) === u) {
        const l = this.treeAdapter.getAttrList(c);
        l.length === a && n.push({ idx: o, attrs: l });
      }
    }
    return n;
  }
  _ensureNoahArkCondition(t) {
    if (this.entries.length < Os)
      return;
    const r = this.treeAdapter.getAttrList(t), n = this._getNoahArkConditionCandidates(t, r);
    if (n.length < Os)
      return;
    const a = new Map(r.map((u) => [u.name, u.value]));
    let i = 0;
    for (let u = 0; u < n.length; u++) {
      const o = n[u];
      o.attrs.every((s) => a.get(s.name) === s.value) && (i += 1, i >= Os && this.entries.splice(o.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(rm);
  }
  pushElement(t, r) {
    this._ensureNoahArkCondition(t), this.entries.unshift({
      type: Gt.Element,
      element: t,
      token: r
    });
  }
  insertElementAfterBookmark(t, r) {
    const n = this.entries.indexOf(this.bookmark);
    this.entries.splice(n, 0, {
      type: Gt.Element,
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
    const t = this.entries.indexOf(rm);
    t === -1 ? this.entries.length = 0 : this.entries.splice(0, t + 1);
  }
  //Search
  getElementEntryInScopeWithTagName(t) {
    const r = this.entries.find((n) => n.type === Gt.Marker || this.treeAdapter.getTagName(n.element) === t);
    return r && r.type === Gt.Element ? r : null;
  }
  getElementEntry(t) {
    return this.entries.find((r) => r.type === Gt.Element && r.element === t);
  }
}
const wr = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: xt.NO_QUIRKS,
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
      wr.appendChild(e, i);
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
      if (wr.isTextNode(r)) {
        r.value += t;
        return;
      }
    }
    wr.appendChild(e, wr.createTextNode(t));
  },
  insertTextBefore(e, t, r) {
    const n = e.childNodes[e.childNodes.indexOf(r) - 1];
    n && wr.isTextNode(n) ? n.value += t : wr.insertBefore(e, wr.createTextNode(t), r);
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
}, $T = "html", Dw = "about:legacy-compat", Mw = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", UT = [
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
], Lw = [
  ...UT,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], kw = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), HT = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], Bw = [
  ...HT,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function nm(e, t) {
  return t.some((r) => e.startsWith(r));
}
function jw(e) {
  return e.name === $T && e.publicId === null && (e.systemId === null || e.systemId === Dw);
}
function Fw(e) {
  if (e.name !== $T)
    return xt.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === Mw)
    return xt.QUIRKS;
  let { publicId: r } = e;
  if (r !== null) {
    if (r = r.toLowerCase(), kw.has(r))
      return xt.QUIRKS;
    let n = t === null ? Lw : UT;
    if (nm(r, n))
      return xt.QUIRKS;
    if (n = t === null ? HT : Bw, nm(r, n))
      return xt.LIMITED_QUIRKS;
  }
  return xt.NO_QUIRKS;
}
const am = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, $w = "definitionurl", Uw = "definitionURL", Hw = new Map([
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
].map((e) => [e.toLowerCase(), e])), qw = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: H.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: H.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: H.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: H.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: H.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: H.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: H.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: H.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: H.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: H.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: H.XMLNS }]
]), Ww = new Map([
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
].map((e) => [e.toLowerCase(), e])), Yw = /* @__PURE__ */ new Set([
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
function zw(e) {
  const t = e.tagID;
  return t === d.FONT && e.attrs.some(({ name: n }) => n === un.COLOR || n === un.SIZE || n === un.FACE) || Yw.has(t);
}
function qT(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === $w) {
      e.attrs[t].name = Uw;
      break;
    }
}
function WT(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = Hw.get(e.attrs[t].name);
    r != null && (e.attrs[t].name = r);
  }
}
function yp(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = qw.get(e.attrs[t].name);
    r && (e.attrs[t].prefix = r.prefix, e.attrs[t].name = r.name, e.attrs[t].namespace = r.namespace);
  }
}
function Gw(e) {
  const t = Ww.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = Io(e.tagName));
}
function Kw(e, t) {
  return t === H.MATHML && (e === d.MI || e === d.MO || e === d.MN || e === d.MS || e === d.MTEXT);
}
function Vw(e, t, r) {
  if (t === H.MATHML && e === d.ANNOTATION_XML) {
    for (let n = 0; n < r.length; n++)
      if (r[n].name === un.ENCODING) {
        const a = r[n].value.toLowerCase();
        return a === am.TEXT_HTML || a === am.APPLICATION_XML;
      }
  }
  return t === H.SVG && (e === d.FOREIGN_OBJECT || e === d.DESC || e === d.TITLE);
}
function Xw(e, t, r, n) {
  return (!n || n === H.HTML) && Vw(e, t, r) || (!n || n === H.MATHML) && Kw(e, t);
}
const Qw = "hidden", Zw = 8, Jw = 3;
var w;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(w || (w = {}));
const eP = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, YT = /* @__PURE__ */ new Set([d.TABLE, d.TBODY, d.TFOOT, d.THEAD, d.TR]), im = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: wr,
  onParseError: null
};
class tP {
  constructor(t, r, n = null, a = null) {
    this.fragmentContext = n, this.scriptHandler = a, this.currentToken = null, this.stopped = !1, this.insertionMode = w.INITIAL, this.originalInsertionMode = w.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...im,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = r ?? this.treeAdapter.createDocument(), this.tokenizer = new Ow(this.options, this), this.activeFormattingElements = new Rw(this.treeAdapter), this.fragmentContextID = n ? Io(this.treeAdapter.getTagName(n)) : d.UNKNOWN, this._setContextModes(n ?? this.document, this.fragmentContextID), this.openElements = new Nw(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, r) {
    const n = new this(r);
    return n.tokenizer.write(t, !0), n.document;
  }
  static getFragmentParser(t, r) {
    const n = {
      ...im,
      ...r
    };
    t ?? (t = n.treeAdapter.createElement(M.TEMPLATE, H.HTML, []));
    const a = n.treeAdapter.createElement("documentmock", H.HTML, []), i = new this(n, a, t);
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
    const i = (a = t.location) !== null && a !== void 0 ? a : eP, u = {
      code: r,
      startLine: i.startLine,
      startCol: i.startCol,
      startOffset: i.startOffset,
      endLine: n ? i.startLine : i.endLine,
      endCol: n ? i.startCol : i.endCol,
      endOffset: n ? i.startOffset : i.endOffset
    };
    this.onParseError(u);
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
      let i, u;
      this.openElements.stackTop === 0 && this.fragmentContext ? (i = this.fragmentContext, u = this.fragmentContextID) : { current: i, currentTagId: u } = this.openElements, this._setContextModes(i, u);
    }
  }
  _setContextModes(t, r) {
    const n = t === this.document || t && this.treeAdapter.getNamespaceURI(t) === H.HTML;
    this.currentNotInHTML = !n, this.tokenizer.inForeignNode = !n && t !== void 0 && r !== void 0 && !this._isIntegrationPoint(r, t);
  }
  /** @protected */
  _switchToTextParsing(t, r) {
    this._insertElement(t, H.HTML), this.tokenizer.state = r, this.originalInsertionMode = this.insertionMode, this.insertionMode = w.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = w.TEXT, this.originalInsertionMode = w.IN_BODY, this.tokenizer.state = dt.PLAINTEXT;
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
      if (this.treeAdapter.getTagName(t) === M.FORM) {
        this.formElement = t;
        break;
      }
      t = this.treeAdapter.getParentNode(t);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== H.HTML))
      switch (this.fragmentContextID) {
        case d.TITLE:
        case d.TEXTAREA: {
          this.tokenizer.state = dt.RCDATA;
          break;
        }
        case d.STYLE:
        case d.XMP:
        case d.IFRAME:
        case d.NOEMBED:
        case d.NOFRAMES:
        case d.NOSCRIPT: {
          this.tokenizer.state = dt.RAWTEXT;
          break;
        }
        case d.SCRIPT: {
          this.tokenizer.state = dt.SCRIPT_DATA;
          break;
        }
        case d.PLAINTEXT: {
          this.tokenizer.state = dt.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  /** @protected */
  _setDocumentType(t) {
    const r = t.name || "", n = t.publicId || "", a = t.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, r, n, a), t.location) {
      const u = this.treeAdapter.getChildNodes(this.document).find((o) => this.treeAdapter.isDocumentTypeNode(o));
      u && this.treeAdapter.setNodeSourceCodeLocation(u, t.location);
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
    const n = this.treeAdapter.createElement(t, H.HTML, []);
    this._attachElementToTree(n, null), this.openElements.push(n, r);
  }
  /** @protected */
  _insertTemplate(t) {
    const r = this.treeAdapter.createElement(t.tagName, H.HTML, t.attrs), n = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(r, n), this._attachElementToTree(r, t.location), this.openElements.push(r, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(M.HTML, H.HTML, []);
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
    const a = this.treeAdapter.getChildNodes(r), i = n ? a.lastIndexOf(n) : a.length, u = a[i - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(u)) {
      const { endLine: s, endCol: c, endOffset: l } = t.location;
      this.treeAdapter.updateNodeSourceCodeLocation(u, { endLine: s, endCol: c, endOffset: l });
    } else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(u, t.location);
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
        r.type === fe.END_TAG && a === r.tagName ? {
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
    return this.openElements.stackTop === 0 && this.fragmentContext ? (r = this.fragmentContext, n = this.fragmentContextID) : { current: r, currentTagId: n } = this.openElements, t.tagID === d.SVG && this.treeAdapter.getTagName(r) === M.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(r) === H.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (t.tagID === d.MGLYPH || t.tagID === d.MALIGNMARK) && n !== void 0 && !this._isIntegrationPoint(n, r, H.HTML)
    );
  }
  /** @protected */
  _processToken(t) {
    switch (t.type) {
      case fe.CHARACTER: {
        this.onCharacter(t);
        break;
      }
      case fe.NULL_CHARACTER: {
        this.onNullCharacter(t);
        break;
      }
      case fe.COMMENT: {
        this.onComment(t);
        break;
      }
      case fe.DOCTYPE: {
        this.onDoctype(t);
        break;
      }
      case fe.START_TAG: {
        this._processStartTag(t);
        break;
      }
      case fe.END_TAG: {
        this.onEndTag(t);
        break;
      }
      case fe.EOF: {
        this.onEof(t);
        break;
      }
      case fe.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(t);
        break;
      }
    }
  }
  //Integration points
  /** @protected */
  _isIntegrationPoint(t, r, n) {
    const a = this.treeAdapter.getNamespaceURI(r), i = this.treeAdapter.getAttrList(r);
    return Xw(t, a, i, n);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const r = this.activeFormattingElements.entries.findIndex((a) => a.type === Gt.Marker || this.openElements.contains(a.element)), n = r === -1 ? t - 1 : r - 1;
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
    return YT.has(t);
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
          if (this.treeAdapter.getNamespaceURI(r) === H.HTML)
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
    return Ew[n].has(r);
  }
  /** @internal */
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      NI(this, t);
      return;
    }
    switch (this.insertionMode) {
      case w.INITIAL: {
        wa(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        Wa(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Ya(this, t);
        break;
      }
      case w.IN_HEAD: {
        za(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        Ga(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        Ka(this, t);
        break;
      }
      case w.IN_BODY:
      case w.IN_CAPTION:
      case w.IN_CELL:
      case w.IN_TEMPLATE: {
        GT(this, t);
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
        Ss(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        JT(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        wu(this, t);
        break;
      }
      case w.AFTER_BODY: {
        Pu(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        vu(this, t);
        break;
      }
    }
  }
  /** @internal */
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      CI(this, t);
      return;
    }
    switch (this.insertionMode) {
      case w.INITIAL: {
        wa(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        Wa(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Ya(this, t);
        break;
      }
      case w.IN_HEAD: {
        za(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        Ga(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        Ka(this, t);
        break;
      }
      case w.TEXT: {
        this._insertCharacters(t);
        break;
      }
      case w.IN_TABLE:
      case w.IN_TABLE_BODY:
      case w.IN_ROW: {
        Ss(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        wu(this, t);
        break;
      }
      case w.AFTER_BODY: {
        Pu(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        vu(this, t);
        break;
      }
    }
  }
  /** @internal */
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Fd(this, t);
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
        Fd(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Pa(this, t);
        break;
      }
      case w.AFTER_BODY: {
        sP(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY:
      case w.AFTER_AFTER_FRAMESET: {
        cP(this, t);
        break;
      }
    }
  }
  /** @internal */
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case w.INITIAL: {
        lP(this, t);
        break;
      }
      case w.BEFORE_HEAD:
      case w.IN_HEAD:
      case w.IN_HEAD_NO_SCRIPT:
      case w.AFTER_HEAD: {
        this._err(t, B.misplacedDoctype);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Pa(this, t);
        break;
      }
    }
  }
  /** @internal */
  onStartTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, B.nonVoidHtmlElementStartTagWithTrailingSolidus);
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
    this.shouldProcessStartTagTokenInForeignContent(t) ? RI(this, t) : this._startTagOutsideForeignContent(t);
  }
  /** @protected */
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        wa(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        fP(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        hP(this, t);
        break;
      }
      case w.IN_HEAD: {
        Yt(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        bP(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        gP(this, t);
        break;
      }
      case w.IN_BODY: {
        nt(this, t);
        break;
      }
      case w.IN_TABLE: {
        Gn(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Pa(this, t);
        break;
      }
      case w.IN_CAPTION: {
        pI(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        Ep(this, t);
        break;
      }
      case w.IN_TABLE_BODY: {
        Ro(this, t);
        break;
      }
      case w.IN_ROW: {
        Do(this, t);
        break;
      }
      case w.IN_CELL: {
        yI(this, t);
        break;
      }
      case w.IN_SELECT: {
        r_(this, t);
        break;
      }
      case w.IN_SELECT_IN_TABLE: {
        vI(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        TI(this, t);
        break;
      }
      case w.AFTER_BODY: {
        AI(this, t);
        break;
      }
      case w.IN_FRAMESET: {
        OI(this, t);
        break;
      }
      case w.AFTER_FRAMESET: {
        xI(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        PI(this, t);
        break;
      }
      case w.AFTER_AFTER_FRAMESET: {
        II(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? DI(this, t) : this._endTagOutsideForeignContent(t);
  }
  /** @protected */
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        wa(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        dP(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        pP(this, t);
        break;
      }
      case w.IN_HEAD: {
        mP(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        yP(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        vP(this, t);
        break;
      }
      case w.IN_BODY: {
        No(this, t);
        break;
      }
      case w.TEXT: {
        aI(this, t);
        break;
      }
      case w.IN_TABLE: {
        ii(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Pa(this, t);
        break;
      }
      case w.IN_CAPTION: {
        mI(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        bI(this, t);
        break;
      }
      case w.IN_TABLE_BODY: {
        $d(this, t);
        break;
      }
      case w.IN_ROW: {
        t_(this, t);
        break;
      }
      case w.IN_CELL: {
        gI(this, t);
        break;
      }
      case w.IN_SELECT: {
        n_(this, t);
        break;
      }
      case w.IN_SELECT_IN_TABLE: {
        EI(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        _I(this, t);
        break;
      }
      case w.AFTER_BODY: {
        i_(this, t);
        break;
      }
      case w.IN_FRAMESET: {
        SI(this, t);
        break;
      }
      case w.AFTER_FRAMESET: {
        wI(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        vu(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEof(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        wa(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        Wa(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Ya(this, t);
        break;
      }
      case w.IN_HEAD: {
        za(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        Ga(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        Ka(this, t);
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
        QT(this, t);
        break;
      }
      case w.TEXT: {
        iI(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Pa(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        a_(this, t);
        break;
      }
      case w.AFTER_BODY:
      case w.IN_FRAMESET:
      case w.AFTER_FRAMESET:
      case w.AFTER_AFTER_BODY:
      case w.AFTER_AFTER_FRAMESET: {
        vp(this, t);
        break;
      }
    }
  }
  /** @internal */
  onWhitespaceCharacter(t) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, t.chars.charCodeAt(0) === O.LINE_FEED)) {
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
        zT(this, t);
        break;
      }
      case w.IN_TABLE:
      case w.IN_TABLE_BODY:
      case w.IN_ROW: {
        Ss(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        ZT(this, t);
        break;
      }
    }
  }
}
function rP(e, t) {
  let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return r ? e.openElements.contains(r.element) ? e.openElements.hasInScope(t.tagID) || (r = null) : (e.activeFormattingElements.removeEntry(r), r = null) : XT(e, t), r;
}
function nP(e, t) {
  let r = null, n = e.openElements.stackTop;
  for (; n >= 0; n--) {
    const a = e.openElements.items[n];
    if (a === t.element)
      break;
    e._isSpecialElement(a, e.openElements.tagIDs[n]) && (r = a);
  }
  return r || (e.openElements.shortenToLength(Math.max(n, 0)), e.activeFormattingElements.removeEntry(t)), r;
}
function aP(e, t, r) {
  let n = t, a = e.openElements.getCommonAncestor(t);
  for (let i = 0, u = a; u !== r; i++, u = a) {
    a = e.openElements.getCommonAncestor(u);
    const o = e.activeFormattingElements.getElementEntry(u), s = o && i >= Jw;
    !o || s ? (s && e.activeFormattingElements.removeEntry(o), e.openElements.remove(u)) : (u = iP(e, o), n === t && (e.activeFormattingElements.bookmark = o), e.treeAdapter.detachNode(n), e.treeAdapter.appendChild(u, n), n = u);
  }
  return n;
}
function iP(e, t) {
  const r = e.treeAdapter.getNamespaceURI(t.element), n = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs);
  return e.openElements.replace(t.element, n), t.element = n, n;
}
function uP(e, t, r) {
  const n = e.treeAdapter.getTagName(t), a = Io(n);
  if (e._isElementCausesFosterParenting(a))
    e._fosterParentElement(r);
  else {
    const i = e.treeAdapter.getNamespaceURI(t);
    a === d.TEMPLATE && i === H.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, r);
  }
}
function oP(e, t, r) {
  const n = e.treeAdapter.getNamespaceURI(r.element), { token: a } = r, i = e.treeAdapter.createElement(a.tagName, n, a.attrs);
  e._adoptNodes(t, i), e.treeAdapter.appendChild(t, i), e.activeFormattingElements.insertElementAfterBookmark(i, a), e.activeFormattingElements.removeEntry(r), e.openElements.remove(r.element), e.openElements.insertAfter(t, i, a.tagID);
}
function gp(e, t) {
  for (let r = 0; r < Zw; r++) {
    const n = rP(e, t);
    if (!n)
      break;
    const a = nP(e, n);
    if (!a)
      break;
    e.activeFormattingElements.bookmark = n;
    const i = aP(e, a, n.element), u = e.openElements.getCommonAncestor(n.element);
    e.treeAdapter.detachNode(i), u && uP(e, u, i), oP(e, a, n);
  }
}
function Fd(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function sP(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function cP(e, t) {
  e._appendCommentNode(t, e.document);
}
function vp(e, t) {
  if (e.stopped = !0, t.location) {
    const r = e.fragmentContext ? 0 : 2;
    for (let n = e.openElements.stackTop; n >= r; n--)
      e._setEndLocation(e.openElements.items[n], t);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const n = e.openElements.items[0], a = e.treeAdapter.getNodeSourceCodeLocation(n);
      if (a && !a.endTag && (e._setEndLocation(n, t), e.openElements.stackTop >= 1)) {
        const i = e.openElements.items[1], u = e.treeAdapter.getNodeSourceCodeLocation(i);
        u && !u.endTag && e._setEndLocation(i, t);
      }
    }
  }
}
function lP(e, t) {
  e._setDocumentType(t);
  const r = t.forceQuirks ? xt.QUIRKS : Fw(t);
  jw(t) || e._err(t, B.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, r), e.insertionMode = w.BEFORE_HTML;
}
function wa(e, t) {
  e._err(t, B.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, xt.QUIRKS), e.insertionMode = w.BEFORE_HTML, e._processToken(t);
}
function fP(e, t) {
  t.tagID === d.HTML ? (e._insertElement(t, H.HTML), e.insertionMode = w.BEFORE_HEAD) : Wa(e, t);
}
function dP(e, t) {
  const r = t.tagID;
  (r === d.HTML || r === d.HEAD || r === d.BODY || r === d.BR) && Wa(e, t);
}
function Wa(e, t) {
  e._insertFakeRootElement(), e.insertionMode = w.BEFORE_HEAD, e._processToken(t);
}
function hP(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      nt(e, t);
      break;
    }
    case d.HEAD: {
      e._insertElement(t, H.HTML), e.headElement = e.openElements.current, e.insertionMode = w.IN_HEAD;
      break;
    }
    default:
      Ya(e, t);
  }
}
function pP(e, t) {
  const r = t.tagID;
  r === d.HEAD || r === d.BODY || r === d.HTML || r === d.BR ? Ya(e, t) : e._err(t, B.endTagWithoutMatchingOpenElement);
}
function Ya(e, t) {
  e._insertFakeElement(M.HEAD, d.HEAD), e.headElement = e.openElements.current, e.insertionMode = w.IN_HEAD, e._processToken(t);
}
function Yt(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      nt(e, t);
      break;
    }
    case d.BASE:
    case d.BASEFONT:
    case d.BGSOUND:
    case d.LINK:
    case d.META: {
      e._appendElement(t, H.HTML), t.ackSelfClosing = !0;
      break;
    }
    case d.TITLE: {
      e._switchToTextParsing(t, dt.RCDATA);
      break;
    }
    case d.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(t, dt.RAWTEXT) : (e._insertElement(t, H.HTML), e.insertionMode = w.IN_HEAD_NO_SCRIPT);
      break;
    }
    case d.NOFRAMES:
    case d.STYLE: {
      e._switchToTextParsing(t, dt.RAWTEXT);
      break;
    }
    case d.SCRIPT: {
      e._switchToTextParsing(t, dt.SCRIPT_DATA);
      break;
    }
    case d.TEMPLATE: {
      e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = w.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(w.IN_TEMPLATE);
      break;
    }
    case d.HEAD: {
      e._err(t, B.misplacedStartTagForHeadElement);
      break;
    }
    default:
      za(e, t);
  }
}
function mP(e, t) {
  switch (t.tagID) {
    case d.HEAD: {
      e.openElements.pop(), e.insertionMode = w.AFTER_HEAD;
      break;
    }
    case d.BODY:
    case d.BR:
    case d.HTML: {
      za(e, t);
      break;
    }
    case d.TEMPLATE: {
      vn(e, t);
      break;
    }
    default:
      e._err(t, B.endTagWithoutMatchingOpenElement);
  }
}
function vn(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== d.TEMPLATE && e._err(t, B.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(d.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, B.endTagWithoutMatchingOpenElement);
}
function za(e, t) {
  e.openElements.pop(), e.insertionMode = w.AFTER_HEAD, e._processToken(t);
}
function bP(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      nt(e, t);
      break;
    }
    case d.BASEFONT:
    case d.BGSOUND:
    case d.HEAD:
    case d.LINK:
    case d.META:
    case d.NOFRAMES:
    case d.STYLE: {
      Yt(e, t);
      break;
    }
    case d.NOSCRIPT: {
      e._err(t, B.nestedNoscriptInHead);
      break;
    }
    default:
      Ga(e, t);
  }
}
function yP(e, t) {
  switch (t.tagID) {
    case d.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = w.IN_HEAD;
      break;
    }
    case d.BR: {
      Ga(e, t);
      break;
    }
    default:
      e._err(t, B.endTagWithoutMatchingOpenElement);
  }
}
function Ga(e, t) {
  const r = t.type === fe.EOF ? B.openElementsLeftAfterEof : B.disallowedContentInNoscriptInHead;
  e._err(t, r), e.openElements.pop(), e.insertionMode = w.IN_HEAD, e._processToken(t);
}
function gP(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      nt(e, t);
      break;
    }
    case d.BODY: {
      e._insertElement(t, H.HTML), e.framesetOk = !1, e.insertionMode = w.IN_BODY;
      break;
    }
    case d.FRAMESET: {
      e._insertElement(t, H.HTML), e.insertionMode = w.IN_FRAMESET;
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
      e._err(t, B.abandonedHeadElementChild), e.openElements.push(e.headElement, d.HEAD), Yt(e, t), e.openElements.remove(e.headElement);
      break;
    }
    case d.HEAD: {
      e._err(t, B.misplacedStartTagForHeadElement);
      break;
    }
    default:
      Ka(e, t);
  }
}
function vP(e, t) {
  switch (t.tagID) {
    case d.BODY:
    case d.HTML:
    case d.BR: {
      Ka(e, t);
      break;
    }
    case d.TEMPLATE: {
      vn(e, t);
      break;
    }
    default:
      e._err(t, B.endTagWithoutMatchingOpenElement);
  }
}
function Ka(e, t) {
  e._insertFakeElement(M.BODY, d.BODY), e.insertionMode = w.IN_BODY, Co(e, t);
}
function Co(e, t) {
  switch (t.type) {
    case fe.CHARACTER: {
      GT(e, t);
      break;
    }
    case fe.WHITESPACE_CHARACTER: {
      zT(e, t);
      break;
    }
    case fe.COMMENT: {
      Fd(e, t);
      break;
    }
    case fe.START_TAG: {
      nt(e, t);
      break;
    }
    case fe.END_TAG: {
      No(e, t);
      break;
    }
    case fe.EOF: {
      QT(e, t);
      break;
    }
  }
}
function zT(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function GT(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function EP(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function TP(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  r && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(r, t.attrs));
}
function _P(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && r && (e.treeAdapter.detachNode(r), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, H.HTML), e.insertionMode = w.IN_FRAMESET);
}
function AP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, H.HTML);
}
function OP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && jd.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, H.HTML);
}
function SP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, H.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function xP(e, t) {
  const r = e.openElements.tmplCount > 0;
  (!e.formElement || r) && (e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, H.HTML), r || (e.formElement = e.openElements.current));
}
function wP(e, t) {
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
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, H.HTML);
}
function PP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, H.HTML), e.tokenizer.state = dt.PLAINTEXT;
}
function IP(e, t) {
  e.openElements.hasInScope(d.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, H.HTML), e.framesetOk = !1;
}
function CP(e, t) {
  const r = e.activeFormattingElements.getElementEntryInScopeWithTagName(M.A);
  r && (gp(e, t), e.openElements.remove(r.element), e.activeFormattingElements.removeEntry(r)), e._reconstructActiveFormattingElements(), e._insertElement(t, H.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function NP(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, H.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function RP(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(d.NOBR) && (gp(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, H.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function DP(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, H.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function MP(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== xt.QUIRKS && e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, H.HTML), e.framesetOk = !1, e.insertionMode = w.IN_TABLE;
}
function KT(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, H.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function VT(e) {
  const t = BT(e, un.TYPE);
  return t != null && t.toLowerCase() === Qw;
}
function LP(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, H.HTML), VT(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function kP(e, t) {
  e._appendElement(t, H.HTML), t.ackSelfClosing = !0;
}
function BP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._appendElement(t, H.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function jP(e, t) {
  t.tagName = M.IMG, t.tagID = d.IMG, KT(e, t);
}
function FP(e, t) {
  e._insertElement(t, H.HTML), e.skipNextNewLine = !0, e.tokenizer.state = dt.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = w.TEXT;
}
function $P(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, dt.RAWTEXT);
}
function UP(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, dt.RAWTEXT);
}
function um(e, t) {
  e._switchToTextParsing(t, dt.RAWTEXT);
}
function HP(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, H.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === w.IN_TABLE || e.insertionMode === w.IN_CAPTION || e.insertionMode === w.IN_TABLE_BODY || e.insertionMode === w.IN_ROW || e.insertionMode === w.IN_CELL ? w.IN_SELECT_IN_TABLE : w.IN_SELECT;
}
function qP(e, t) {
  e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, H.HTML);
}
function WP(e, t) {
  e.openElements.hasInScope(d.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, H.HTML);
}
function YP(e, t) {
  e.openElements.hasInScope(d.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(d.RTC), e._insertElement(t, H.HTML);
}
function zP(e, t) {
  e._reconstructActiveFormattingElements(), qT(t), yp(t), t.selfClosing ? e._appendElement(t, H.MATHML) : e._insertElement(t, H.MATHML), t.ackSelfClosing = !0;
}
function GP(e, t) {
  e._reconstructActiveFormattingElements(), WT(t), yp(t), t.selfClosing ? e._appendElement(t, H.SVG) : e._insertElement(t, H.SVG), t.ackSelfClosing = !0;
}
function om(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, H.HTML);
}
function nt(e, t) {
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
      NP(e, t);
      break;
    }
    case d.A: {
      CP(e, t);
      break;
    }
    case d.H1:
    case d.H2:
    case d.H3:
    case d.H4:
    case d.H5:
    case d.H6: {
      OP(e, t);
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
      AP(e, t);
      break;
    }
    case d.LI:
    case d.DD:
    case d.DT: {
      wP(e, t);
      break;
    }
    case d.BR:
    case d.IMG:
    case d.WBR:
    case d.AREA:
    case d.EMBED:
    case d.KEYGEN: {
      KT(e, t);
      break;
    }
    case d.HR: {
      BP(e, t);
      break;
    }
    case d.RB:
    case d.RTC: {
      WP(e, t);
      break;
    }
    case d.RT:
    case d.RP: {
      YP(e, t);
      break;
    }
    case d.PRE:
    case d.LISTING: {
      SP(e, t);
      break;
    }
    case d.XMP: {
      $P(e, t);
      break;
    }
    case d.SVG: {
      GP(e, t);
      break;
    }
    case d.HTML: {
      EP(e, t);
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
      Yt(e, t);
      break;
    }
    case d.BODY: {
      TP(e, t);
      break;
    }
    case d.FORM: {
      xP(e, t);
      break;
    }
    case d.NOBR: {
      RP(e, t);
      break;
    }
    case d.MATH: {
      zP(e, t);
      break;
    }
    case d.TABLE: {
      MP(e, t);
      break;
    }
    case d.INPUT: {
      LP(e, t);
      break;
    }
    case d.PARAM:
    case d.TRACK:
    case d.SOURCE: {
      kP(e, t);
      break;
    }
    case d.IMAGE: {
      jP(e, t);
      break;
    }
    case d.BUTTON: {
      IP(e, t);
      break;
    }
    case d.APPLET:
    case d.OBJECT:
    case d.MARQUEE: {
      DP(e, t);
      break;
    }
    case d.IFRAME: {
      UP(e, t);
      break;
    }
    case d.SELECT: {
      HP(e, t);
      break;
    }
    case d.OPTION:
    case d.OPTGROUP: {
      qP(e, t);
      break;
    }
    case d.NOEMBED:
    case d.NOFRAMES: {
      um(e, t);
      break;
    }
    case d.FRAMESET: {
      _P(e, t);
      break;
    }
    case d.TEXTAREA: {
      FP(e, t);
      break;
    }
    case d.NOSCRIPT: {
      e.options.scriptingEnabled ? um(e, t) : om(e, t);
      break;
    }
    case d.PLAINTEXT: {
      PP(e, t);
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
      om(e, t);
  }
}
function KP(e, t) {
  if (e.openElements.hasInScope(d.BODY) && (e.insertionMode = w.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const r = e.openElements.tryPeekProperlyNestedBodyElement();
    r && e._setEndLocation(r, t);
  }
}
function VP(e, t) {
  e.openElements.hasInScope(d.BODY) && (e.insertionMode = w.AFTER_BODY, i_(e, t));
}
function XP(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r));
}
function QP(e) {
  const t = e.openElements.tmplCount > 0, { formElement: r } = e;
  t || (e.formElement = null), (r || t) && e.openElements.hasInScope(d.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(d.FORM) : r && e.openElements.remove(r));
}
function ZP(e) {
  e.openElements.hasInButtonScope(d.P) || e._insertFakeElement(M.P, d.P), e._closePElement();
}
function JP(e) {
  e.openElements.hasInListItemScope(d.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(d.LI), e.openElements.popUntilTagNamePopped(d.LI));
}
function eI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.popUntilTagNamePopped(r));
}
function tI(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function rI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker());
}
function nI(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(M.BR, d.BR), e.openElements.pop(), e.framesetOk = !1;
}
function XT(e, t) {
  const r = t.tagName, n = t.tagID;
  for (let a = e.openElements.stackTop; a > 0; a--) {
    const i = e.openElements.items[a], u = e.openElements.tagIDs[a];
    if (n === u && (n !== d.UNKNOWN || e.treeAdapter.getTagName(i) === r)) {
      e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.stackTop >= a && e.openElements.shortenToLength(a);
      break;
    }
    if (e._isSpecialElement(i, u))
      break;
  }
}
function No(e, t) {
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
      gp(e, t);
      break;
    }
    case d.P: {
      ZP(e);
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
      XP(e, t);
      break;
    }
    case d.LI: {
      JP(e);
      break;
    }
    case d.DD:
    case d.DT: {
      eI(e, t);
      break;
    }
    case d.H1:
    case d.H2:
    case d.H3:
    case d.H4:
    case d.H5:
    case d.H6: {
      tI(e);
      break;
    }
    case d.BR: {
      nI(e);
      break;
    }
    case d.BODY: {
      KP(e, t);
      break;
    }
    case d.HTML: {
      VP(e, t);
      break;
    }
    case d.FORM: {
      QP(e);
      break;
    }
    case d.APPLET:
    case d.OBJECT:
    case d.MARQUEE: {
      rI(e, t);
      break;
    }
    case d.TEMPLATE: {
      vn(e, t);
      break;
    }
    default:
      XT(e, t);
  }
}
function QT(e, t) {
  e.tmplInsertionModeStack.length > 0 ? a_(e, t) : vp(e, t);
}
function aI(e, t) {
  var r;
  t.tagID === d.SCRIPT && ((r = e.scriptHandler) === null || r === void 0 || r.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function iI(e, t) {
  e._err(t, B.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function Ss(e, t) {
  if (e.openElements.currentTagId !== void 0 && YT.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = w.IN_TABLE_TEXT, t.type) {
      case fe.CHARACTER: {
        JT(e, t);
        break;
      }
      case fe.WHITESPACE_CHARACTER: {
        ZT(e, t);
        break;
      }
    }
  else
    Hi(e, t);
}
function uI(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, H.HTML), e.insertionMode = w.IN_CAPTION;
}
function oI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, H.HTML), e.insertionMode = w.IN_COLUMN_GROUP;
}
function sI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(M.COLGROUP, d.COLGROUP), e.insertionMode = w.IN_COLUMN_GROUP, Ep(e, t);
}
function cI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, H.HTML), e.insertionMode = w.IN_TABLE_BODY;
}
function lI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(M.TBODY, d.TBODY), e.insertionMode = w.IN_TABLE_BODY, Ro(e, t);
}
function fI(e, t) {
  e.openElements.hasInTableScope(d.TABLE) && (e.openElements.popUntilTagNamePopped(d.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function dI(e, t) {
  VT(t) ? e._appendElement(t, H.HTML) : Hi(e, t), t.ackSelfClosing = !0;
}
function hI(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, H.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function Gn(e, t) {
  switch (t.tagID) {
    case d.TD:
    case d.TH:
    case d.TR: {
      lI(e, t);
      break;
    }
    case d.STYLE:
    case d.SCRIPT:
    case d.TEMPLATE: {
      Yt(e, t);
      break;
    }
    case d.COL: {
      sI(e, t);
      break;
    }
    case d.FORM: {
      hI(e, t);
      break;
    }
    case d.TABLE: {
      fI(e, t);
      break;
    }
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      cI(e, t);
      break;
    }
    case d.INPUT: {
      dI(e, t);
      break;
    }
    case d.CAPTION: {
      uI(e, t);
      break;
    }
    case d.COLGROUP: {
      oI(e, t);
      break;
    }
    default:
      Hi(e, t);
  }
}
function ii(e, t) {
  switch (t.tagID) {
    case d.TABLE: {
      e.openElements.hasInTableScope(d.TABLE) && (e.openElements.popUntilTagNamePopped(d.TABLE), e._resetInsertionMode());
      break;
    }
    case d.TEMPLATE: {
      vn(e, t);
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
      Hi(e, t);
  }
}
function Hi(e, t) {
  const r = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, Co(e, t), e.fosterParentingEnabled = r;
}
function ZT(e, t) {
  e.pendingCharacterTokens.push(t);
}
function JT(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function Pa(e, t) {
  let r = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; r < e.pendingCharacterTokens.length; r++)
      Hi(e, e.pendingCharacterTokens[r]);
  else
    for (; r < e.pendingCharacterTokens.length; r++)
      e._insertCharacters(e.pendingCharacterTokens[r]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const e_ = /* @__PURE__ */ new Set([d.CAPTION, d.COL, d.COLGROUP, d.TBODY, d.TD, d.TFOOT, d.TH, d.THEAD, d.TR]);
function pI(e, t) {
  const r = t.tagID;
  e_.has(r) ? e.openElements.hasInTableScope(d.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = w.IN_TABLE, Gn(e, t)) : nt(e, t);
}
function mI(e, t) {
  const r = t.tagID;
  switch (r) {
    case d.CAPTION:
    case d.TABLE: {
      e.openElements.hasInTableScope(d.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = w.IN_TABLE, r === d.TABLE && ii(e, t));
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
      No(e, t);
  }
}
function Ep(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      nt(e, t);
      break;
    }
    case d.COL: {
      e._appendElement(t, H.HTML), t.ackSelfClosing = !0;
      break;
    }
    case d.TEMPLATE: {
      Yt(e, t);
      break;
    }
    default:
      wu(e, t);
  }
}
function bI(e, t) {
  switch (t.tagID) {
    case d.COLGROUP: {
      e.openElements.currentTagId === d.COLGROUP && (e.openElements.pop(), e.insertionMode = w.IN_TABLE);
      break;
    }
    case d.TEMPLATE: {
      vn(e, t);
      break;
    }
    case d.COL:
      break;
    default:
      wu(e, t);
  }
}
function wu(e, t) {
  e.openElements.currentTagId === d.COLGROUP && (e.openElements.pop(), e.insertionMode = w.IN_TABLE, e._processToken(t));
}
function Ro(e, t) {
  switch (t.tagID) {
    case d.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, H.HTML), e.insertionMode = w.IN_ROW;
      break;
    }
    case d.TH:
    case d.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(M.TR, d.TR), e.insertionMode = w.IN_ROW, Do(e, t);
      break;
    }
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE, Gn(e, t));
      break;
    }
    default:
      Gn(e, t);
  }
}
function $d(e, t) {
  const r = t.tagID;
  switch (t.tagID) {
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      e.openElements.hasInTableScope(r) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE);
      break;
    }
    case d.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE, ii(e, t));
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
      ii(e, t);
  }
}
function Do(e, t) {
  switch (t.tagID) {
    case d.TH:
    case d.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(t, H.HTML), e.insertionMode = w.IN_CELL, e.activeFormattingElements.insertMarker();
      break;
    }
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD:
    case d.TR: {
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, Ro(e, t));
      break;
    }
    default:
      Gn(e, t);
  }
}
function t_(e, t) {
  switch (t.tagID) {
    case d.TR: {
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY);
      break;
    }
    case d.TABLE: {
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, $d(e, t));
      break;
    }
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(d.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, $d(e, t));
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
      ii(e, t);
  }
}
function yI(e, t) {
  const r = t.tagID;
  e_.has(r) ? (e.openElements.hasInTableScope(d.TD) || e.openElements.hasInTableScope(d.TH)) && (e._closeTableCell(), Do(e, t)) : nt(e, t);
}
function gI(e, t) {
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
      e.openElements.hasInTableScope(r) && (e._closeTableCell(), t_(e, t));
      break;
    }
    case d.BODY:
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.HTML:
      break;
    default:
      No(e, t);
  }
}
function r_(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      nt(e, t);
      break;
    }
    case d.OPTION: {
      e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e._insertElement(t, H.HTML);
      break;
    }
    case d.OPTGROUP: {
      e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e.openElements.currentTagId === d.OPTGROUP && e.openElements.pop(), e._insertElement(t, H.HTML);
      break;
    }
    case d.HR: {
      e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e.openElements.currentTagId === d.OPTGROUP && e.openElements.pop(), e._appendElement(t, H.HTML), t.ackSelfClosing = !0;
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
      Yt(e, t);
      break;
    }
  }
}
function n_(e, t) {
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
      vn(e, t);
      break;
    }
  }
}
function vI(e, t) {
  const r = t.tagID;
  r === d.CAPTION || r === d.TABLE || r === d.TBODY || r === d.TFOOT || r === d.THEAD || r === d.TR || r === d.TD || r === d.TH ? (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : r_(e, t);
}
function EI(e, t) {
  const r = t.tagID;
  r === d.CAPTION || r === d.TABLE || r === d.TBODY || r === d.TFOOT || r === d.THEAD || r === d.TR || r === d.TD || r === d.TH ? e.openElements.hasInTableScope(r) && (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : n_(e, t);
}
function TI(e, t) {
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
      Yt(e, t);
      break;
    }
    // Re-process the token in the appropriate mode
    case d.CAPTION:
    case d.COLGROUP:
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      e.tmplInsertionModeStack[0] = w.IN_TABLE, e.insertionMode = w.IN_TABLE, Gn(e, t);
      break;
    }
    case d.COL: {
      e.tmplInsertionModeStack[0] = w.IN_COLUMN_GROUP, e.insertionMode = w.IN_COLUMN_GROUP, Ep(e, t);
      break;
    }
    case d.TR: {
      e.tmplInsertionModeStack[0] = w.IN_TABLE_BODY, e.insertionMode = w.IN_TABLE_BODY, Ro(e, t);
      break;
    }
    case d.TD:
    case d.TH: {
      e.tmplInsertionModeStack[0] = w.IN_ROW, e.insertionMode = w.IN_ROW, Do(e, t);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = w.IN_BODY, e.insertionMode = w.IN_BODY, nt(e, t);
  }
}
function _I(e, t) {
  t.tagID === d.TEMPLATE && vn(e, t);
}
function a_(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(d.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : vp(e, t);
}
function AI(e, t) {
  t.tagID === d.HTML ? nt(e, t) : Pu(e, t);
}
function i_(e, t) {
  var r;
  if (t.tagID === d.HTML) {
    if (e.fragmentContext || (e.insertionMode = w.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === d.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const n = e.openElements.items[1];
      n && !(!((r = e.treeAdapter.getNodeSourceCodeLocation(n)) === null || r === void 0) && r.endTag) && e._setEndLocation(n, t);
    }
  } else
    Pu(e, t);
}
function Pu(e, t) {
  e.insertionMode = w.IN_BODY, Co(e, t);
}
function OI(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      nt(e, t);
      break;
    }
    case d.FRAMESET: {
      e._insertElement(t, H.HTML);
      break;
    }
    case d.FRAME: {
      e._appendElement(t, H.HTML), t.ackSelfClosing = !0;
      break;
    }
    case d.NOFRAMES: {
      Yt(e, t);
      break;
    }
  }
}
function SI(e, t) {
  t.tagID === d.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== d.FRAMESET && (e.insertionMode = w.AFTER_FRAMESET));
}
function xI(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      nt(e, t);
      break;
    }
    case d.NOFRAMES: {
      Yt(e, t);
      break;
    }
  }
}
function wI(e, t) {
  t.tagID === d.HTML && (e.insertionMode = w.AFTER_AFTER_FRAMESET);
}
function PI(e, t) {
  t.tagID === d.HTML ? nt(e, t) : vu(e, t);
}
function vu(e, t) {
  e.insertionMode = w.IN_BODY, Co(e, t);
}
function II(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      nt(e, t);
      break;
    }
    case d.NOFRAMES: {
      Yt(e, t);
      break;
    }
  }
}
function CI(e, t) {
  t.chars = Oe, e._insertCharacters(t);
}
function NI(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function u_(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== H.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function RI(e, t) {
  if (zw(t))
    u_(e), e._startTagOutsideForeignContent(t);
  else {
    const r = e._getAdjustedCurrentElement(), n = e.treeAdapter.getNamespaceURI(r);
    n === H.MATHML ? qT(t) : n === H.SVG && (Gw(t), WT(t)), yp(t), t.selfClosing ? e._appendElement(t, n) : e._insertElement(t, n), t.ackSelfClosing = !0;
  }
}
function DI(e, t) {
  if (t.tagID === d.P || t.tagID === d.BR) {
    u_(e), e._endTagOutsideForeignContent(t);
    return;
  }
  for (let r = e.openElements.stackTop; r > 0; r--) {
    const n = e.openElements.items[r];
    if (e.treeAdapter.getNamespaceURI(n) === H.HTML) {
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
M.AREA, M.BASE, M.BASEFONT, M.BGSOUND, M.BR, M.COL, M.EMBED, M.FRAME, M.HR, M.IMG, M.INPUT, M.KEYGEN, M.LINK, M.META, M.PARAM, M.SOURCE, M.TRACK, M.WBR;
function MI(e, t, r) {
  typeof e == "string" && (r = t, t = e, e = null);
  const n = tP.getFragmentParser(e, r);
  return n.tokenizer.write(t, !0), n.getFragment();
}
const LI = () => ({}), Kr = () => !0, Sr = (e) => {
  const t = parseInt(e, 10);
  return Number.isFinite(t) ? t : e;
}, kI = (e) => typeof e != "string" ? e : e.split(",").map((t) => t.trim()).filter(Boolean).map((t) => parseInt(t, 10)).filter((t) => Number.isFinite(t)), BI = {
  "data-underline": { path: ["underline"], transform: LI },
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
  "data-grid-span": { path: ["columnSpan"], transform: Sr },
  // Cell row merge: how many rows this cell spans (vertical merge).
  // The adapter uses docx's `rowSpan` shorthand, which expects only
  // the *starting* cell to declare a count; library handles the
  // merge-continue rows internally.
  "data-row-span": { path: ["rowSpan"], transform: Sr },
  // ------------------------------------------------------------------
  // Stage 3 — paragraph polish
  // ------------------------------------------------------------------
  // Paragraph indentation. All values are twips. `firstLine` and
  // `hanging` are positive; `left` and `right` may be negative.
  "data-indent-left": { path: ["indent", "left"], transform: Sr },
  "data-indent-right": { path: ["indent", "right"], transform: Sr },
  "data-indent-firstline": { path: ["indent", "firstLine"], transform: Sr },
  "data-indent-hanging": { path: ["indent", "hanging"], transform: Sr },
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
  "data-smallcaps": { path: ["smallCaps"], transform: Kr },
  "data-allcaps": { path: ["allCaps"], transform: Kr },
  "data-strike": { path: ["strike"], transform: Kr },
  "data-subscript": { path: ["subScript"], transform: Kr },
  "data-superscript": { path: ["superScript"], transform: Kr },
  // Row-level: whether the row repeats as a header on each new page
  // when the table breaks. Presence-only — any truthy value counts.
  "data-row-header": { path: ["tableHeader"], transform: Kr },
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
    transform: kI
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
    transform: Sr
  },
  "data-floating-verticalposition-relative": {
    path: ["floating", "verticalPosition", "relative"]
  },
  "data-floating-verticalposition-align": {
    path: ["floating", "verticalPosition", "align"]
  },
  "data-floating-verticalposition-offset": {
    path: ["floating", "verticalPosition", "offset"],
    transform: Sr
  },
  // Page breaks — maps to DocxParagraph({ pageBreakBefore: true })
  // in the adapter. Presence attribute: any truthy value counts.
  "data-page-break-before": { path: ["pageBreakBefore"], transform: Kr },
  // Table of contents options — consumed by the tableOfContents node
  // type in the adapter (src/adapters/docx.js). See docx library's
  // ITableOfContentsOptions for the full shape; these are the three
  // useful ones and any additional data-toc-* attribute falls through
  // to the default rule below.
  "data-toc-title": { path: ["toc", "title"] },
  "data-toc-hyperlink": { path: ["toc", "hyperlink"] },
  "data-toc-heading-range": { path: ["toc", "headingRange"] }
};
function jI(e, t, r) {
  let n = e;
  for (let a = 0; a < t.length - 1; a++) {
    const i = t[a];
    (!n[i] || typeof n[i] != "object") && (n[i] = {}), n = n[i];
  }
  n[t[t.length - 1]] = r;
}
function FI(e) {
  const t = {};
  for (const { name: r, value: n } of e) {
    if (!r.startsWith("data-") || r === "data-type") continue;
    const a = BI[r];
    if (a) {
      const i = a.transform ? a.transform(n) : n;
      jI(t, a.path, i);
    } else {
      const i = r.slice(5);
      t[i] = n;
    }
  }
  return t;
}
function $I(e) {
  const t = MI(e);
  return Ud(t);
}
const UI = /* @__PURE__ */ new Set([
  "link",
  "meta",
  "script",
  "style",
  "base",
  "title",
  "noscript"
]);
function HI(e) {
  if (e.nodeName === "#text") {
    const o = e.value;
    return o && o.trim() ? { type: "text", content: o } : null;
  }
  if (!e.tagName) return null;
  const t = e.tagName.toLowerCase();
  if (UI.has(t)) return null;
  const n = sm(e, "data-type") || t;
  if (n === "emptyLine") return null;
  if (n === "contentWrapper")
    return Ud(e);
  const a = FI(e.attrs || []), i = Ud(e);
  if (n === "a" && a.href === void 0) {
    const o = sm(e, "href");
    o && (a.href = o);
  }
  const u = { type: n, ...a };
  return n === "text" ? u.content = i.map((o) => o.content || "").join("") : i.length > 0 && (u.children = i), u;
}
function Ud(e) {
  const t = [], r = e.childNodes || [];
  for (const n of r) {
    const a = HI(n);
    a != null && (Array.isArray(a) ? t.push(...a) : t.push(a));
  }
  return t;
}
function sm(e, t) {
  if (!e.attrs) return null;
  for (const r of e.attrs)
    if (r.name === t) return r.value;
  return null;
}
const qI = {
  docx: { load: () => import("./docx-Qi5Igqud.js"), consumes: "docx", ir: !0 },
  xlsx: { load: () => import("./xlsx-ospXEetz.js"), consumes: "xlsx", ir: !1 },
  typst: { load: () => import("./typst-BQ1kLXDX.js"), consumes: "typst", ir: !0 },
  // LaTeX consumes its own input key. Foundations targeting both Typst
  // and LaTeX register under each format separately — same JSX, two
  // useDocumentOutput calls — so the adapters can diverge as the
  // formats need without forcing a shared input shape.
  latex: { load: () => import("./latex-Cn-dBlKK.js"), consumes: "latex", ir: !0 },
  // Paged.js consumes 'html' — an input shape shared with EPUB below.
  // Foundations register once under 'html' and both adapters read it.
  pagedjs: { load: () => import("./pagedjs-BGhLfddG.js"), consumes: "html", ir: !1 },
  epub: { load: () => import("./epub-CBbaPnBu.js"), consumes: "html", ir: !1 }
};
function Tp(e) {
  const t = qI[e];
  return t ? {
    load: t.load,
    consumes: t.consumes || e,
    ir: t.ir !== !1
    // default to true for safety on under-specified entries
  } : null;
}
async function WI(e, t, r = {}) {
  const n = Tp(e);
  if (!n)
    throw new Error(`Unsupported document format: "${e}"`);
  const a = await n.load(), i = a.compileDocx || a.compileXlsx || a.compileTypst || a.compileLatex || a.compilePagedjs || a.compileEpub || a.compilePdf;
  if (!i)
    throw new Error(
      `Format adapter "${e}" does not export a compile function.`
    );
  return i(t, r);
}
function YI(e, t) {
  const r = Tp(t);
  if (!r)
    return { sections: [], header: null, footer: null, metadata: null };
  const n = e.getOutputs(r.consumes) || [];
  return r.ir ? zI(n, e) : r.consumes === "html" ? GI(n, e) : KI(n);
}
function zI(e, t) {
  let r = null, n = null, a = null, i = !1, u = !1;
  const o = [], s = t.wrapWithProviders || ((c) => c);
  for (const { fragment: c, options: l } of e) {
    const f = l.role || "body";
    if (f === "metadata") {
      r = c;
      continue;
    }
    const h = fp(s(c)), p = $I(h);
    switch (f) {
      case "header":
        n = p, l.applyTo === "first" && (i = !0);
        break;
      case "footer":
        a = p, l.applyTo === "first" && (u = !0);
        break;
      default:
        o.push(p);
        break;
    }
  }
  return {
    sections: o,
    header: n,
    footer: a,
    metadata: r,
    headerFirstPageOnly: i,
    footerFirstPageOnly: u
  };
}
function GI(e, t) {
  const r = t.wrapWithProviders || ((i) => i);
  let n = null;
  const a = [];
  for (const { fragment: i, options: u } of e) {
    const o = u.role || "body";
    if (o === "metadata") {
      n = i;
      continue;
    }
    if (o !== "body") continue;
    const s = fp(r(i));
    a.push(s);
  }
  return { sections: a, metadata: n };
}
function KI(e) {
  return { sections: e.map(({ fragment: r }) => r).filter(Boolean) };
}
function VI(e, t) {
  if (typeof document > "u") return;
  const r = URL.createObjectURL(e), n = document.createElement("a");
  n.href = r, n.download = t, document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(r);
}
function XI(e, t, r = {}) {
  const { basePath: n, theme: a } = r, i = RT();
  return fp(
    ti(
      DT,
      { store: i, basePath: n, theme: a },
      e
    )
  ), QI(i, t), YI(i, t);
}
const cm = /* @__PURE__ */ new Set();
function QI(e, t) {
  const r = Tp(t);
  if (!r) return;
  const n = r.consumes;
  if (!(cm.has(n) || (e.getOutputs && e.getOutputs(n) || []).length > 0) && (cm.add(n), typeof console < "u" && console.warn)) {
    const i = n === t ? `compileSubtree('${t}') found 0 registered sections. Did any section component call useDocumentOutput(block, '${t}', ...)?` : `compileSubtree('${t}') found 0 sections registered under input key '${n}'. Sections should call useDocumentOutput(block, '${n}', ...) (the output format '${t}' reads fragments registered under '${n}').`;
    console.warn(
      `@uniweb/press: ${i} Sections registered for a different input key do not cross-register.`
    );
  }
}
async function lm(e, t, r = {}) {
  const { basePath: n, theme: a, adapterOptions: i = {} } = r, u = XI(e, t, { basePath: n, theme: a });
  return WI(t, u, i);
}
async function ZI(e, t = {}) {
  if (e !== null && typeof e == "object" && // React elements have a $$typeof symbol; duck-typing avoids needing
  // `import { isValidElement } from 'react'` (minor, but keeps this
  // file free of React imports it doesn't otherwise need).
  !!e.$$typeof) {
    const { format: A, ...v } = t;
    if (!A)
      throw new Error(
        "compileDocument: 'format' is required (tree mode)."
      );
    return lm(e, A, v);
  }
  const n = e, {
    format: a,
    foundation: i,
    rootPath: u,
    adapterOptions: o = {},
    basePath: s,
    loadAsset: c,
    ...l
  } = t, f = c ?? eC(n);
  if (!a)
    throw new Error(
      "compileDocument: 'format' is required (website mode)."
    );
  if (!n || !Array.isArray(n.pages))
    throw new Error(
      "compileDocument: first argument must be either a React element (tree mode) or a Website (website mode: expected object with a pages array)."
    );
  const h = JI(i), p = h?.[a];
  if (!p) {
    const A = h ? Object.keys(h).join(", ") || "(none)" : "(no outputs declaration)";
    throw new Error(
      `compileDocument: foundation has no outputs.${a} declaration. Declared outputs: ${A}. Add outputs[format] = { getOptions, extension?, via? } to the foundation's default export.`
    );
  }
  const y = p.via ?? a, b = p.getOptions ? await p.getOptions(n, { format: a, rootPath: u, loadAsset: f, ...l }) : {}, m = {
    // Thread the host loadAsset through to the adapter so it can embed
    // inline body images (the typst/latex bundlers fetch bytes here, the
    // same capability the docx adapter uses). A foundation's getOptions or
    // the caller can still override it via adapterOptions.
    loadAsset: f,
    ...b.adapterOptions,
    ...o
  }, E = tC(n, u), g = globalThis.uniweb?.childBlockRenderer;
  if (typeof g != "function")
    throw new Error(
      "compileDocument: globalThis.uniweb.childBlockRenderer is not installed. Either call initPrerender (headless) or mount a Uniweb runtime (browser) before compileDocument, or pass a pre-built tree (tree mode)."
    );
  const _ = g({ blocks: E });
  return lm(_, y, {
    basePath: s ?? n?.basePath,
    ...b,
    adapterOptions: m
  });
}
function JI(e) {
  return e ? e.outputs ? e.outputs : e.default?.capabilities?.outputs ? e.default.capabilities.outputs : e.default?.outputs ? e.default.outputs : null : null;
}
function eC(e) {
  return async function(r) {
    if (!r || typeof r != "string") return null;
    if (r.startsWith("data:")) {
      const i = r.indexOf(",");
      if (i === -1) return null;
      const u = r.slice(5, i), o = r.slice(i + 1);
      if (u.includes(";base64")) {
        const s = atob(o), c = new Uint8Array(s.length);
        for (let l = 0; l < s.length; l++) c[l] = s.charCodeAt(l);
        return c;
      }
      return new TextEncoder().encode(decodeURIComponent(o));
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
function tC(e, t) {
  const r = e.pages || [];
  return (t && typeof t == "string" ? r.filter(
    (a) => a.route === t || typeof a.route == "string" && a.route.startsWith(t + "/")
  ) : r).flatMap((a) => a.bodyBlocks || []);
}
const rC = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function o_(e) {
  return String(e).replace(/&(#[xX][0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);/g, (t, r) => {
    if (r[0] !== "#") return rC[r] ?? t;
    const n = r[1] === "x" || r[1] === "X" ? parseInt(r.slice(2), 16) : parseInt(r.slice(1), 10);
    return n > 0 && n <= 1114111 ? String.fromCodePoint(n) : t;
  });
}
const nC = o_;
function Ia(e, t) {
  const r = new RegExp(`${t}="([^"]*)"`), n = e.match(r);
  return n ? nC(n[1]) : null;
}
function aC(e) {
  const t = (n, a) => ({
    type: "text",
    content: o_(n),
    ...a
  }), r = (n, a = {}) => {
    const i = /<(\w+)(\s[^>]*)?>(.+?)<\/\1>/gs;
    let u = [], o = 0;
    if (!n) return [t("", a)];
    n.replace(i, (c, l, f, h, p) => {
      const y = n.slice(o, p);
      if (y && u.push(t(y, a)), l === "a" && f) {
        const m = Ia(f, "href");
        if (m) {
          const E = r(h, a).filter(
            (g) => g.type === "text"
          );
          u.push({
            type: "link",
            content: E.map((g) => g.content).join(""),
            href: m,
            parts: E
          }), o = p + c.length;
          return;
        }
      }
      if (l === "span" && f && Ia(f, "data-type") === "math") {
        const E = Ia(f, "data-latex") || "", g = Ia(f, "data-display") === "true", _ = Ia(f, "data-id");
        u.push({
          type: "math",
          latex: E,
          display: g,
          ..._ ? { id: _ } : {}
        }), o = p + c.length;
        return;
      }
      const b = { ...a };
      (l === "strong" || l === "b") && (b.bold = !0), (l === "em" || l === "i") && (b.italics = !0), l === "u" && (b.underline = {}), l === "sub" && (b.subscript = !0), l === "sup" && (b.superscript = !0), u = u.concat(r(h, b)), o = p + c.length;
    });
    const s = n.slice(o);
    return s && u.push(t(s, a)), u;
  };
  return typeof e != "string" && (e = String(e ?? "")), r(e);
}
function fm(e) {
  if (!(e instanceof Date)) return e;
  if (Number.isNaN(e.getTime())) return "";
  const t = e.getUTCFullYear(), r = String(e.getUTCMonth() + 1).padStart(2, "0"), n = String(e.getUTCDate()).padStart(2, "0");
  return `${t}-${r}-${n}`;
}
function iC(e) {
  return e == null ? e : Array.isArray(e) ? e.map(fm) : fm(e);
}
function _p({
  children: e,
  bold: t,
  italics: r,
  underline: n,
  color: a,
  size: i,
  font: u,
  smallCaps: o,
  allCaps: s,
  strike: c,
  subscript: l,
  superscript: f,
  style: h,
  role: p,
  ...y
}) {
  const b = NT(), m = ai(a, b), E = nw(u, b), g = h ?? p, _ = { "data-type": "text" };
  return t && (_["data-bold"] = "true"), r && (_["data-italics"] = "true"), n && (_["data-underline"] = "true"), m && (_["data-color"] = m), i != null && (_["data-size"] = i), E && (_["data-font"] = E), o && (_["data-smallcaps"] = "true"), s && (_["data-allcaps"] = "true"), c && (_["data-strike"] = "true"), l && (_["data-subscript"] = "true"), f && (_["data-superscript"] = "true"), g && (_["data-style"] = g), /* @__PURE__ */ P("span", { ..._, ...y, children: iC(e) });
}
function uC(e) {
  return !e || typeof e != "string" ? { anchor: null } : e.startsWith("#") ? { anchor: e.slice(1) } : { anchor: null };
}
function oC(e) {
  return e.parts?.length ? e.parts : [{ content: e.content }];
}
function sC({ part: e }) {
  const t = e.href || "", { anchor: r } = uC(t);
  return /* @__PURE__ */ P("a", { ...r !== null ? { "data-type": "internalHyperlink", "data-anchor": r } : { "data-type": "externalHyperlink", "data-link": t }, href: t, children: oC(e).map((a, i) => /* @__PURE__ */ P(
    _p,
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
function cC({ latex: e, display: t = !1, id: r, ...n }) {
  const a = { "data-type": "math" };
  return a["data-latex"] = e || "", a["data-display"] = t ? "true" : "false", r && (a["data-id"] = r), /* @__PURE__ */ P("span", { ...a, ...n });
}
function lC({ tabStops: e, indent: t, role: r }) {
  const n = {};
  return Array.isArray(e) && e.length && (n["data-tab-stops"] = JSON.stringify(e)), t && typeof t == "object" && (t.left != null && (n["data-indent-left"] = t.left), t.right != null && (n["data-indent-right"] = t.right), t.firstLine != null && (n["data-indent-firstline"] = t.firstLine), t.hanging != null && (n["data-indent-hanging"] = t.hanging)), typeof r == "string" && r.length && (n["data-paragraph-style"] = r), n;
}
function Rt({
  as: e = "p",
  data: t,
  tabStops: r,
  indent: n,
  role: a,
  children: i,
  ...u
}) {
  const o = lC({ tabStops: r, indent: n, role: a });
  if (t) {
    const s = aC(t);
    return /* @__PURE__ */ P(e, { "data-type": "paragraph", ...o, ...u, children: s.map((c, l) => c.type === "link" ? /* @__PURE__ */ P(sC, { part: c }, l) : c.type === "math" ? /* @__PURE__ */ P(
      cC,
      {
        latex: c.latex,
        display: c.display,
        id: c.id
      },
      l
    ) : /* @__PURE__ */ P(
      _p,
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
  return /* @__PURE__ */ P(e, { "data-type": "paragraph", ...o, ...u, children: i });
}
function fC(e, t) {
  if (!e) return e;
  const r = {};
  for (const [n, a] of Object.entries(e))
    a && (r[n] = {
      ...a,
      ...a.color ? { color: ai(a.color, t) } : {}
    });
  return r;
}
const s_ = Wt({ widths: null, borderColor: "cccccc" });
function ga({
  widths: e,
  columnWidths: t,
  layout: r,
  width: n,
  borders: a,
  borderColor: i = "cccccc",
  className: u,
  children: o,
  ...s
}) {
  const c = NT(), l = {};
  t && t.length ? (l["data-table-column-widths"] = t.join(","), l["data-table-layout"] = r || "fixed") : r && (l["data-table-layout"] = r), n && (n.size != null && (l["data-table-width-size"] = n.size), l["data-table-width-type"] = n.type ?? "pct");
  const f = fC(a, c);
  if (f)
    for (const [p, y] of Object.entries(f)) {
      if (!y) continue;
      const b = p === "insideHorizontal" ? "insideh" : p === "insideVertical" ? "insidev" : p;
      y.style && (l[`data-table-borders-${b}-style`] = y.style), y.size != null && (l[`data-table-borders-${b}-size`] = y.size), y.color && (l[`data-table-borders-${b}-color`] = y.color);
    }
  const h = ai(i, c) ?? i;
  return /* @__PURE__ */ P(
    s_.Provider,
    {
      value: { widths: e, borderColor: h, theme: c },
      children: /* @__PURE__ */ P("div", { "data-type": "table", className: u, ...l, ...s, children: o })
    }
  );
}
function Ve({ header: e = !1, className: t, children: r, ...n }) {
  let a = 0;
  const i = Mr.toArray(r).map((o) => {
    if (!Ct(o)) return o;
    const s = o.props._col ?? a, c = typeof o.props.colSpan == "number" && o.props.colSpan > 1 ? o.props.colSpan : 1;
    return a = s + c, De(o, {
      _col: s,
      _header: o.props._header ?? e
    });
  });
  return /* @__PURE__ */ P("div", { "data-type": "tableRow", className: t, ...e ? { "data-row-header": "" } : {}, ...n, children: i });
}
const ru = { top: 80, bottom: 80, left: 120, right: 120 };
function oe({
  _col: e = 0,
  _header: t = !1,
  width: r,
  emphasis: n = !1,
  borderBottom: a,
  shading: i,
  valign: u,
  colSpan: o,
  rowSpan: s,
  className: c,
  style: l,
  children: f,
  ...h
}) {
  const { widths: p, borderColor: y, theme: b } = Lt(s_), m = r ?? p?.[e], E = {
    "data-type": "tableCell",
    "data-margins-top": ru.top,
    "data-margins-bottom": ru.bottom,
    "data-margins-left": ru.left,
    "data-margins-right": ru.right,
    "data-borders-top-style": "none",
    "data-borders-left-style": "none",
    "data-borders-right-style": "none",
    "data-borders-bottom-style": a ?? "single",
    "data-borders-bottom-size": t ? 6 : 4,
    "data-borders-bottom-color": y
  };
  if (m != null && (E["data-width-size"] = m, E["data-width-type"] = "pct"), i) {
    const v = typeof i == "string" ? { fill: i } : i, T = ai(v.fill, b), S = ai(v.color, b);
    T && (E["data-shading-fill"] = T), v.type && (E["data-shading-type"] = v.type), S && (E["data-shading-color"] = S);
  }
  u && (E["data-valign"] = u), typeof o == "number" && o > 1 && (E["data-grid-span"] = o), typeof s == "number" && s > 1 && (E["data-row-span"] = s);
  const g = m != null ? { flex: `${m} ${m} 0%`, minWidth: 0, ...l } : l;
  return /* @__PURE__ */ P("div", { className: c, style: g, ...E, ...h, children: typeof f == "string" || typeof f == "number" ? /* @__PURE__ */ P(Rt, { children: n || t ? /* @__PURE__ */ P(_p, { bold: !0, children: f }) : f }) : f });
}
function Mo() {
  const t = dp()?.activeWebsite;
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
function c_(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = c_(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function se() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = c_(e)) && (n && (n += " "), n += t);
  return n;
}
const dC = [
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
function hC(e) {
  if (!e || typeof e != "string") return !1;
  const t = e.toLowerCase();
  return dC.some((r) => t.includes(r));
}
const pC = /(<a\b[^>]*?\shref=)(["'])([^"']*)\2/gi, mC = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;
function bC(e, t) {
  if (!t.hasMultipleLocales?.()) return e;
  const r = t.getActiveLocale?.(), n = t.getDefaultLocale?.();
  if (!r || r === n) return e;
  const a = t.translateRoute ? t.translateRoute(e, r) : e, i = `/${r}`;
  return a === i || a.startsWith(`${i}/`) ? a : a === "/" ? `${i}/` : `${i}${a}`;
}
function yC(e, t, { locale: r = !0 } = {}) {
  if (!e || typeof e != "string" || !t) return e;
  let n = e;
  return (e.startsWith("page:") || e.startsWith("topic:")) && (n = t.makeHref ? t.makeHref(e) : e), mC.test(n) || r && n.startsWith("/") && !hC(n) && (n = bC(n, t)), n;
}
function gC(e, t) {
  return !e || typeof e != "string" || !t ? e : DS(yC(e, t), t.basePath || "");
}
function vC(e, t) {
  if (!e || typeof e != "string" || !t || !e.includes("<a")) return e;
  const r = e.includes("page:") || e.includes("topic:"), n = !!t.hasMultipleLocales?.() && t.getActiveLocale?.() !== t.getDefaultLocale?.();
  return !r && !t.basePath && !n ? e : e.replace(pC, (a, i, u, o) => {
    const s = gC(o, t);
    return s === o ? a : `${i}${u}${s}${u}`;
  });
}
function EC({ value: e, className: t, as: r = "div", ...n }) {
  const { website: a } = Mo(), i = Dr(() => {
    if (!e) return "";
    const u = Array.isArray(e) ? e.join("") : e;
    return vC(u, a);
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
function dm() {
  return { data: null, error: null, loading: !1 };
}
function hm() {
  return { data: null, error: null, loading: !0 };
}
function nu(e) {
  return { data: e, error: null, loading: !1 };
}
function pm(e, t = null) {
  return { data: t, error: e, loading: !1 };
}
function l_(e) {
  const t = dp()?.activeWebsite ?? null, r = e && t ? MS(e) : null, n = r ? t.dataStore.get(r) : null, [a, i] = at(
    () => n ? nu(n.data) : r ? hm() : dm()
  );
  return pt(() => {
    if (!r || !t) {
      i(dm());
      return;
    }
    const u = t.dataStore.get(r);
    i(u ? nu(u.data) : hm());
    const o = t.dataStore.subscribe(r, () => {
      const c = t.dataStore.get(r);
      c && i(nu(c.data));
    }), s = new AbortController();
    return t.fetcher.dispatch(e, { website: t, signal: s.signal }).then((c) => {
      if (!s.signal.aborted) {
        if (c?.error) {
          i(pm(c.error, c.data ?? null));
          return;
        }
        c && "data" in c && i(nu(c.data));
      }
    }).catch((c) => {
      s.signal.aborted || i(pm(String(c?.message || c)));
    }), () => {
      s.abort(), o();
    };
  }, [r, t]), a;
}
function TC(e) {
  const t = dp()?.activeWebsite;
  if (!t) return null;
  const r = t.config?.queries?.[e];
  if (!r || typeof r != "object") return null;
  const n = r.queryable;
  return !n || typeof n != "object" ? null : n;
}
function _C(e) {
  return e + 1;
}
function on(e, t) {
  const { website: r } = Mo(), [, n] = CS(_C, 0), i = r.activePage?.state;
  pt(() => {
    if (i)
      return i.subscribe(e, n);
  }, [i, e]);
  const u = i?.has(e) ? i.get(e) : t;
  return [u, (s) => {
    i && i.set(e, typeof s == "function" ? s(u) : s);
  }];
}
const f_ = "academic-metrics/options", Ap = "all-members", d_ = Ap, AC = [
  "members",
  "publications-by-type",
  "publications-by-journal",
  "publications-by-year",
  "publications-list",
  "funding",
  "supervisions"
], OC = {
  members: "Members",
  "publications-by-type": "Publications by type",
  "publications-by-journal": "Publications by journal",
  "publications-by-year": "Publications by year",
  "publications-list": "Publications (list)",
  funding: "Funding",
  supervisions: "Supervisions"
};
function SC(e) {
  return OC[e] || e;
}
const xC = [
  { value: "apa", label: "APA (7th)" },
  { value: "mla", label: "MLA (9th)" },
  { value: "chicago-author-date", label: "Chicago (author–date)" },
  { value: "ieee", label: "IEEE" },
  { value: "vancouver", label: "Vancouver" },
  { value: "harvard", label: "Harvard" },
  { value: "nature", label: "Nature" }
], Ze = {
  slug: Ap,
  panelWhere: null,
  excludedSections: [],
  dateRange: { start: null, end: null },
  refereedOnly: !1,
  citationStyle: "apa"
};
function wC() {
  if (typeof window > "u") return null;
  try {
    const e = window.localStorage.getItem(f_);
    if (!e) return null;
    const t = JSON.parse(e);
    return {
      slug: t.slug || Ze.slug,
      panelWhere: t.panelWhere && typeof t.panelWhere == "object" ? t.panelWhere : null,
      excludedSections: Array.isArray(t.excludedSections) ? t.excludedSections : [],
      dateRange: {
        start: t.dateRange?.start != null && t.dateRange?.start !== "" ? Number(t.dateRange.start) : null,
        end: t.dateRange?.end != null && t.dateRange?.end !== "" ? Number(t.dateRange.end) : null
      },
      refereedOnly: !!t.refereedOnly,
      citationStyle: t.citationStyle || Ze.citationStyle
    };
  } catch {
    return null;
  }
}
function PC(e) {
  if (typeof window > "u") return;
  const t = {
    slug: e.state.get("slug") ?? Ze.slug,
    panelWhere: e.state.get("panelWhere") ?? Ze.panelWhere,
    excludedSections: e.state.get("excludedSections") ?? Ze.excludedSections,
    dateRange: e.state.get("dateRange") ?? Ze.dateRange,
    refereedOnly: e.state.get("refereedOnly") ?? Ze.refereedOnly,
    citationStyle: e.state.get("citationStyle") ?? Ze.citationStyle
  };
  try {
    window.localStorage.setItem(f_, JSON.stringify(t));
  } catch {
  }
}
const mm = /* @__PURE__ */ new WeakSet(), bm = ["slug", "panelWhere", "excludedSections", "dateRange", "refereedOnly", "citationStyle"];
function IC(e) {
  if (!e || !e.state) return () => {
  };
  if (mm.has(e)) return () => {
  };
  mm.add(e);
  const t = wC() || Ze;
  for (const a of bm)
    e.state.has(a) || e.state.set(a, t[a]);
  const r = () => PC(e), n = bm.map((a) => e.state.subscribe(a, r));
  return () => n.forEach((a) => a());
}
function Op() {
  return on("slug", Ze.slug);
}
function Sp() {
  return on("panelWhere", Ze.panelWhere);
}
function En(e) {
  const [t] = on("excludedSections", Ze.excludedSections);
  return !t.includes(e);
}
function CC() {
  const [e, t] = on("excludedSections", Ze.excludedSections);
  return [e, (n) => {
    const a = new Set(e);
    a.has(n) ? a.delete(n) : a.add(n), t([...a]);
  }];
}
function qi() {
  const [e, t] = on("dateRange", Ze.dateRange), [r, n] = on("refereedOnly", Ze.refereedOnly), [a, i] = on("citationStyle", Ze.citationStyle);
  return [{ dateRange: e, refereedOnly: r, citationStyle: a }, (o) => {
    "dateRange" in o && t(o.dateRange), "refereedOnly" in o && n(o.refereedOnly), "citationStyle" in o && i(o.citationStyle);
  }];
}
function NC(e, t, r) {
  if (t && typeof t == "object" && Object.keys(t).length > 0)
    return { where: t, source: "panel", label: "Custom filter" };
  if (e && e !== Ap) {
    const n = r.find((a) => a.slug === e);
    if (n?.where)
      return { where: n.where, source: "view", label: n.name || e, view: n };
  }
  return { where: null, source: null, label: null, view: null };
}
function $r(e) {
  const [t] = Op(), [r] = Sp(), n = Dr(
    () => Array.isArray(e?.data?.queries) ? e.data.queries : [],
    [e?.data?.queries]
  ), a = Dr(
    () => Array.isArray(e?.data?.members) ? e.data.members : [],
    [e?.data?.members]
  ), i = Dr(
    () => NC(t, r, n),
    [t, r, n]
  ), { data: u, loading: o } = l_(
    i.where ? { path: "/data/members.json", as: "members", where: i.where } : null
  );
  return {
    members: i.where ? u || [] : a,
    activeView: i.view,
    activeWhere: i.where,
    activeLabel: i.label,
    totalCount: a.length,
    loading: i.where ? o : !1
  };
}
function c7({ content: e, block: t }) {
  const { members: r, activeView: n, activeLabel: a, totalCount: i } = $r(e), u = Array.isArray(e?.paragraphs) ? e.paragraphs : [], o = r.reduce(
    (h, p) => h + (Array.isArray(p.publications) ? p.publications.length : 0),
    0
  ), s = r.reduce((h, p) => Array.isArray(p.funding) ? h + p.funding.reduce((y, b) => y + (Number(b.amount) || 0), 0) : h, 0), c = r.reduce(
    (h, p) => h + (Array.isArray(p.supervisions) ? p.supervisions.length : 0),
    0
  ), l = e?.title || "Academic Metrics", f = n?.description || a || e?.subtitle || "All members";
  return rt(t, "xlsx", {
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
        o,
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
  }), rt(
    t,
    "docx",
    /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ P(
        Rt,
        {
          as: "h1",
          data: l,
          "data-heading": "HEADING_1",
          "data-spacing-after": 240
        }
      ),
      /* @__PURE__ */ P(
        Rt,
        {
          data: f,
          "data-spacing-after": 240
        }
      ),
      u.map((h, p) => /* @__PURE__ */ P(Rt, { data: h, "data-spacing-after": 160 }, p))
    ] })
  ), /* @__PURE__ */ G("section", { className: "cover", children: [
    /* @__PURE__ */ P("h1", { className: "cover-title", children: l }),
    /* @__PURE__ */ P("p", { className: "cover-subtitle", children: f }),
    u.length > 0 && /* @__PURE__ */ P("div", { className: "cover-narrative", children: u.map((h, p) => /* @__PURE__ */ P("p", { dangerouslySetInnerHTML: { __html: h } }, p)) }),
    a && /* @__PURE__ */ G("p", { className: "cover-population", children: [
      "Population: ",
      /* @__PURE__ */ P("strong", { children: a }),
      " —",
      " ",
      r.length,
      " of ",
      i,
      " members"
    ] }),
    /* @__PURE__ */ G("div", { className: "cover-meta", role: "list", children: [
      /* @__PURE__ */ P(au, { label: "Members", value: r.length }),
      /* @__PURE__ */ P(au, { label: "Publications", value: o }),
      /* @__PURE__ */ P(au, { label: "Funding", value: RC(s) }),
      /* @__PURE__ */ P(au, { label: "Supervisions", value: c })
    ] })
  ] });
}
function au({ label: e, value: t }) {
  return /* @__PURE__ */ G("div", { role: "listitem", children: [
    /* @__PURE__ */ P("span", { className: "cover-meta-label", children: e }),
    /* @__PURE__ */ P("span", { className: "cover-meta-value", children: t })
  ] });
}
function RC(e) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(e);
}
var iu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ye(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var xs, ym;
function mt() {
  if (ym) return xs;
  ym = 1;
  var e = Array.isArray;
  return xs = e, xs;
}
var ws, gm;
function h_() {
  if (gm) return ws;
  gm = 1;
  var e = typeof iu == "object" && iu && iu.Object === Object && iu;
  return ws = e, ws;
}
var Ps, vm;
function tr() {
  if (vm) return Ps;
  vm = 1;
  var e = h_(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return Ps = r, Ps;
}
var Is, Em;
function Wi() {
  if (Em) return Is;
  Em = 1;
  var e = tr(), t = e.Symbol;
  return Is = t, Is;
}
var Cs, Tm;
function DC() {
  if (Tm) return Cs;
  Tm = 1;
  var e = Wi(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, a = e ? e.toStringTag : void 0;
  function i(u) {
    var o = r.call(u, a), s = u[a];
    try {
      u[a] = void 0;
      var c = !0;
    } catch {
    }
    var l = n.call(u);
    return c && (o ? u[a] = s : delete u[a]), l;
  }
  return Cs = i, Cs;
}
var Ns, _m;
function MC() {
  if (_m) return Ns;
  _m = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return Ns = r, Ns;
}
var Rs, Am;
function Er() {
  if (Am) return Rs;
  Am = 1;
  var e = Wi(), t = DC(), r = MC(), n = "[object Null]", a = "[object Undefined]", i = e ? e.toStringTag : void 0;
  function u(o) {
    return o == null ? o === void 0 ? a : n : i && i in Object(o) ? t(o) : r(o);
  }
  return Rs = u, Rs;
}
var Ds, Om;
function Tr() {
  if (Om) return Ds;
  Om = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return Ds = e, Ds;
}
var Ms, Sm;
function va() {
  if (Sm) return Ms;
  Sm = 1;
  var e = Er(), t = Tr(), r = "[object Symbol]";
  function n(a) {
    return typeof a == "symbol" || t(a) && e(a) == r;
  }
  return Ms = n, Ms;
}
var Ls, xm;
function xp() {
  if (xm) return Ls;
  xm = 1;
  var e = mt(), t = va(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function a(i, u) {
    if (e(i))
      return !1;
    var o = typeof i;
    return o == "number" || o == "symbol" || o == "boolean" || i == null || t(i) ? !0 : n.test(i) || !r.test(i) || u != null && i in Object(u);
  }
  return Ls = a, Ls;
}
var ks, wm;
function Ur() {
  if (wm) return ks;
  wm = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return ks = e, ks;
}
var Bs, Pm;
function wp() {
  if (Pm) return Bs;
  Pm = 1;
  var e = Er(), t = Ur(), r = "[object AsyncFunction]", n = "[object Function]", a = "[object GeneratorFunction]", i = "[object Proxy]";
  function u(o) {
    if (!t(o))
      return !1;
    var s = e(o);
    return s == n || s == a || s == r || s == i;
  }
  return Bs = u, Bs;
}
var js, Im;
function LC() {
  if (Im) return js;
  Im = 1;
  var e = tr(), t = e["__core-js_shared__"];
  return js = t, js;
}
var Fs, Cm;
function kC() {
  if (Cm) return Fs;
  Cm = 1;
  var e = LC(), t = (function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  })();
  function r(n) {
    return !!t && t in n;
  }
  return Fs = r, Fs;
}
var $s, Nm;
function p_() {
  if (Nm) return $s;
  Nm = 1;
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
  return $s = r, $s;
}
var Us, Rm;
function BC() {
  if (Rm) return Us;
  Rm = 1;
  var e = wp(), t = kC(), r = Ur(), n = p_(), a = /[\\^$.*+?()[\]{}|]/g, i = /^\[object .+?Constructor\]$/, u = Function.prototype, o = Object.prototype, s = u.toString, c = o.hasOwnProperty, l = RegExp(
    "^" + s.call(c).replace(a, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function f(h) {
    if (!r(h) || t(h))
      return !1;
    var p = e(h) ? l : i;
    return p.test(n(h));
  }
  return Us = f, Us;
}
var Hs, Dm;
function jC() {
  if (Dm) return Hs;
  Dm = 1;
  function e(t, r) {
    return t?.[r];
  }
  return Hs = e, Hs;
}
var qs, Mm;
function Tn() {
  if (Mm) return qs;
  Mm = 1;
  var e = BC(), t = jC();
  function r(n, a) {
    var i = t(n, a);
    return e(i) ? i : void 0;
  }
  return qs = r, qs;
}
var Ws, Lm;
function Lo() {
  if (Lm) return Ws;
  Lm = 1;
  var e = Tn(), t = e(Object, "create");
  return Ws = t, Ws;
}
var Ys, km;
function FC() {
  if (km) return Ys;
  km = 1;
  var e = Lo();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Ys = t, Ys;
}
var zs, Bm;
function $C() {
  if (Bm) return zs;
  Bm = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return zs = e, zs;
}
var Gs, jm;
function UC() {
  if (jm) return Gs;
  jm = 1;
  var e = Lo(), t = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function a(i) {
    var u = this.__data__;
    if (e) {
      var o = u[i];
      return o === t ? void 0 : o;
    }
    return n.call(u, i) ? u[i] : void 0;
  }
  return Gs = a, Gs;
}
var Ks, Fm;
function HC() {
  if (Fm) return Ks;
  Fm = 1;
  var e = Lo(), t = Object.prototype, r = t.hasOwnProperty;
  function n(a) {
    var i = this.__data__;
    return e ? i[a] !== void 0 : r.call(i, a);
  }
  return Ks = n, Ks;
}
var Vs, $m;
function qC() {
  if ($m) return Vs;
  $m = 1;
  var e = Lo(), t = "__lodash_hash_undefined__";
  function r(n, a) {
    var i = this.__data__;
    return this.size += this.has(n) ? 0 : 1, i[n] = e && a === void 0 ? t : a, this;
  }
  return Vs = r, Vs;
}
var Xs, Um;
function WC() {
  if (Um) return Xs;
  Um = 1;
  var e = FC(), t = $C(), r = UC(), n = HC(), a = qC();
  function i(u) {
    var o = -1, s = u == null ? 0 : u.length;
    for (this.clear(); ++o < s; ) {
      var c = u[o];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, Xs = i, Xs;
}
var Qs, Hm;
function YC() {
  if (Hm) return Qs;
  Hm = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return Qs = e, Qs;
}
var Zs, qm;
function Pp() {
  if (qm) return Zs;
  qm = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return Zs = e, Zs;
}
var Js, Wm;
function ko() {
  if (Wm) return Js;
  Wm = 1;
  var e = Pp();
  function t(r, n) {
    for (var a = r.length; a--; )
      if (e(r[a][0], n))
        return a;
    return -1;
  }
  return Js = t, Js;
}
var ec, Ym;
function zC() {
  if (Ym) return ec;
  Ym = 1;
  var e = ko(), t = Array.prototype, r = t.splice;
  function n(a) {
    var i = this.__data__, u = e(i, a);
    if (u < 0)
      return !1;
    var o = i.length - 1;
    return u == o ? i.pop() : r.call(i, u, 1), --this.size, !0;
  }
  return ec = n, ec;
}
var tc, zm;
function GC() {
  if (zm) return tc;
  zm = 1;
  var e = ko();
  function t(r) {
    var n = this.__data__, a = e(n, r);
    return a < 0 ? void 0 : n[a][1];
  }
  return tc = t, tc;
}
var rc, Gm;
function KC() {
  if (Gm) return rc;
  Gm = 1;
  var e = ko();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return rc = t, rc;
}
var nc, Km;
function VC() {
  if (Km) return nc;
  Km = 1;
  var e = ko();
  function t(r, n) {
    var a = this.__data__, i = e(a, r);
    return i < 0 ? (++this.size, a.push([r, n])) : a[i][1] = n, this;
  }
  return nc = t, nc;
}
var ac, Vm;
function Bo() {
  if (Vm) return ac;
  Vm = 1;
  var e = YC(), t = zC(), r = GC(), n = KC(), a = VC();
  function i(u) {
    var o = -1, s = u == null ? 0 : u.length;
    for (this.clear(); ++o < s; ) {
      var c = u[o];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, ac = i, ac;
}
var ic, Xm;
function Ip() {
  if (Xm) return ic;
  Xm = 1;
  var e = Tn(), t = tr(), r = e(t, "Map");
  return ic = r, ic;
}
var uc, Qm;
function XC() {
  if (Qm) return uc;
  Qm = 1;
  var e = WC(), t = Bo(), r = Ip();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return uc = n, uc;
}
var oc, Zm;
function QC() {
  if (Zm) return oc;
  Zm = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return oc = e, oc;
}
var sc, Jm;
function jo() {
  if (Jm) return sc;
  Jm = 1;
  var e = QC();
  function t(r, n) {
    var a = r.__data__;
    return e(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
  }
  return sc = t, sc;
}
var cc, eb;
function ZC() {
  if (eb) return cc;
  eb = 1;
  var e = jo();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return cc = t, cc;
}
var lc, tb;
function JC() {
  if (tb) return lc;
  tb = 1;
  var e = jo();
  function t(r) {
    return e(this, r).get(r);
  }
  return lc = t, lc;
}
var fc, rb;
function eN() {
  if (rb) return fc;
  rb = 1;
  var e = jo();
  function t(r) {
    return e(this, r).has(r);
  }
  return fc = t, fc;
}
var dc, nb;
function tN() {
  if (nb) return dc;
  nb = 1;
  var e = jo();
  function t(r, n) {
    var a = e(this, r), i = a.size;
    return a.set(r, n), this.size += a.size == i ? 0 : 1, this;
  }
  return dc = t, dc;
}
var hc, ab;
function Cp() {
  if (ab) return hc;
  ab = 1;
  var e = XC(), t = ZC(), r = JC(), n = eN(), a = tN();
  function i(u) {
    var o = -1, s = u == null ? 0 : u.length;
    for (this.clear(); ++o < s; ) {
      var c = u[o];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, hc = i, hc;
}
var pc, ib;
function m_() {
  if (ib) return pc;
  ib = 1;
  var e = Cp(), t = "Expected a function";
  function r(n, a) {
    if (typeof n != "function" || a != null && typeof a != "function")
      throw new TypeError(t);
    var i = function() {
      var u = arguments, o = a ? a.apply(this, u) : u[0], s = i.cache;
      if (s.has(o))
        return s.get(o);
      var c = n.apply(this, u);
      return i.cache = s.set(o, c) || s, c;
    };
    return i.cache = new (r.Cache || e)(), i;
  }
  return r.Cache = e, pc = r, pc;
}
var mc, ub;
function rN() {
  if (ub) return mc;
  ub = 1;
  var e = m_(), t = 500;
  function r(n) {
    var a = e(n, function(u) {
      return i.size === t && i.clear(), u;
    }), i = a.cache;
    return a;
  }
  return mc = r, mc;
}
var bc, ob;
function nN() {
  if (ob) return bc;
  ob = 1;
  var e = rN(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = e(function(a) {
    var i = [];
    return a.charCodeAt(0) === 46 && i.push(""), a.replace(t, function(u, o, s, c) {
      i.push(s ? c.replace(r, "$1") : o || u);
    }), i;
  });
  return bc = n, bc;
}
var yc, sb;
function Np() {
  if (sb) return yc;
  sb = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length, i = Array(a); ++n < a; )
      i[n] = r(t[n], n, t);
    return i;
  }
  return yc = e, yc;
}
var gc, cb;
function aN() {
  if (cb) return gc;
  cb = 1;
  var e = Wi(), t = Np(), r = mt(), n = va(), a = e ? e.prototype : void 0, i = a ? a.toString : void 0;
  function u(o) {
    if (typeof o == "string")
      return o;
    if (r(o))
      return t(o, u) + "";
    if (n(o))
      return i ? i.call(o) : "";
    var s = o + "";
    return s == "0" && 1 / o == -1 / 0 ? "-0" : s;
  }
  return gc = u, gc;
}
var vc, lb;
function b_() {
  if (lb) return vc;
  lb = 1;
  var e = aN();
  function t(r) {
    return r == null ? "" : e(r);
  }
  return vc = t, vc;
}
var Ec, fb;
function y_() {
  if (fb) return Ec;
  fb = 1;
  var e = mt(), t = xp(), r = nN(), n = b_();
  function a(i, u) {
    return e(i) ? i : t(i, u) ? [i] : r(n(i));
  }
  return Ec = a, Ec;
}
var Tc, db;
function Fo() {
  if (db) return Tc;
  db = 1;
  var e = va();
  function t(r) {
    if (typeof r == "string" || e(r))
      return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return Tc = t, Tc;
}
var _c, hb;
function Rp() {
  if (hb) return _c;
  hb = 1;
  var e = y_(), t = Fo();
  function r(n, a) {
    a = e(a, n);
    for (var i = 0, u = a.length; n != null && i < u; )
      n = n[t(a[i++])];
    return i && i == u ? n : void 0;
  }
  return _c = r, _c;
}
var Ac, pb;
function g_() {
  if (pb) return Ac;
  pb = 1;
  var e = Rp();
  function t(r, n, a) {
    var i = r == null ? void 0 : e(r, n);
    return i === void 0 ? a : i;
  }
  return Ac = t, Ac;
}
var iN = g_();
const Tt = /* @__PURE__ */ ye(iN);
var Oc, mb;
function uN() {
  if (mb) return Oc;
  mb = 1;
  function e(t) {
    return t == null;
  }
  return Oc = e, Oc;
}
var oN = uN();
const ce = /* @__PURE__ */ ye(oN);
var Sc, bb;
function sN() {
  if (bb) return Sc;
  bb = 1;
  var e = Er(), t = mt(), r = Tr(), n = "[object String]";
  function a(i) {
    return typeof i == "string" || !t(i) && r(i) && e(i) == n;
  }
  return Sc = a, Sc;
}
var cN = sN();
const dn = /* @__PURE__ */ ye(cN);
var lN = wp();
const ae = /* @__PURE__ */ ye(lN);
var fN = Ur();
const Ea = /* @__PURE__ */ ye(fN);
var xc = { exports: {} }, he = {};
var yb;
function dN() {
  if (yb) return he;
  yb = 1;
  var e = /* @__PURE__ */ Symbol.for("react.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), n = /* @__PURE__ */ Symbol.for("react.strict_mode"), a = /* @__PURE__ */ Symbol.for("react.profiler"), i = /* @__PURE__ */ Symbol.for("react.provider"), u = /* @__PURE__ */ Symbol.for("react.context"), o = /* @__PURE__ */ Symbol.for("react.server_context"), s = /* @__PURE__ */ Symbol.for("react.forward_ref"), c = /* @__PURE__ */ Symbol.for("react.suspense"), l = /* @__PURE__ */ Symbol.for("react.suspense_list"), f = /* @__PURE__ */ Symbol.for("react.memo"), h = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.offscreen"), y;
  y = /* @__PURE__ */ Symbol.for("react.module.reference");
  function b(m) {
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
                case o:
                case u:
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
  return he.ContextConsumer = u, he.ContextProvider = i, he.Element = e, he.ForwardRef = s, he.Fragment = r, he.Lazy = h, he.Memo = f, he.Portal = t, he.Profiler = a, he.StrictMode = n, he.Suspense = c, he.SuspenseList = l, he.isAsyncMode = function() {
    return !1;
  }, he.isConcurrentMode = function() {
    return !1;
  }, he.isContextConsumer = function(m) {
    return b(m) === u;
  }, he.isContextProvider = function(m) {
    return b(m) === i;
  }, he.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, he.isForwardRef = function(m) {
    return b(m) === s;
  }, he.isFragment = function(m) {
    return b(m) === r;
  }, he.isLazy = function(m) {
    return b(m) === h;
  }, he.isMemo = function(m) {
    return b(m) === f;
  }, he.isPortal = function(m) {
    return b(m) === t;
  }, he.isProfiler = function(m) {
    return b(m) === a;
  }, he.isStrictMode = function(m) {
    return b(m) === n;
  }, he.isSuspense = function(m) {
    return b(m) === c;
  }, he.isSuspenseList = function(m) {
    return b(m) === l;
  }, he.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === r || m === a || m === n || m === c || m === l || m === p || typeof m == "object" && m !== null && (m.$$typeof === h || m.$$typeof === f || m.$$typeof === i || m.$$typeof === u || m.$$typeof === s || m.$$typeof === y || m.getModuleId !== void 0);
  }, he.typeOf = b, he;
}
var gb;
function hN() {
  return gb || (gb = 1, xc.exports = dN()), xc.exports;
}
var pN = hN(), wc, vb;
function v_() {
  if (vb) return wc;
  vb = 1;
  var e = Er(), t = Tr(), r = "[object Number]";
  function n(a) {
    return typeof a == "number" || t(a) && e(a) == r;
  }
  return wc = n, wc;
}
var Pc, Eb;
function mN() {
  if (Eb) return Pc;
  Eb = 1;
  var e = v_();
  function t(r) {
    return e(r) && r != +r;
  }
  return Pc = t, Pc;
}
var bN = mN();
const Yi = /* @__PURE__ */ ye(bN);
var yN = v_();
const gN = /* @__PURE__ */ ye(yN);
var it = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, tn = function(t) {
  return dn(t) && t.indexOf("%") === t.length - 1;
}, z = function(t) {
  return gN(t) && !Yi(t);
}, vN = function(t) {
  return ce(t);
}, $e = function(t) {
  return z(t) || dn(t);
}, EN = 0, zi = function(t) {
  var r = ++EN;
  return "".concat(t || "").concat(r);
}, ut = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!z(t) && !dn(t))
    return n;
  var i;
  if (tn(t)) {
    var u = t.indexOf("%");
    i = r * parseFloat(t.slice(0, u)) / 100;
  } else
    i = +t;
  return Yi(i) && (i = n), a && i > r && (i = r), i;
}, Cr = function(t) {
  if (!t)
    return null;
  var r = Object.keys(t);
  return r && r.length ? t[r[0]] : null;
}, TN = function(t) {
  if (!Array.isArray(t))
    return !1;
  for (var r = t.length, n = {}, a = 0; a < r; a++)
    if (!n[t[a]])
      n[t[a]] = !0;
    else
      return !0;
  return !1;
}, Pr = function(t, r) {
  return z(t) && z(r) ? function(n) {
    return t + n * (r - t);
  } : function() {
    return r;
  };
};
function Hd(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : Tt(n, t)) === r;
  });
}
var _N = function(t, r) {
  return z(t) && z(r) ? t - r : dn(t) && dn(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r));
};
function Hn(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r]))
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function qd(e) {
  "@babel/helpers - typeof";
  return qd = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, qd(e);
}
var AN = ["viewBox", "children"], ON = [
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
], Tb = ["points", "pathLength"], Ic = {
  svg: AN,
  polygon: Tb,
  polyline: Tb
}, Dp = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], Iu = function(t, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var n = t;
  if (/* @__PURE__ */ Ct(t) && (n = t.props), !Ea(n))
    return null;
  var a = {};
  return Object.keys(n).forEach(function(i) {
    Dp.includes(i) && (a[i] = r || function(u) {
      return n[i](n, u);
    });
  }), a;
}, SN = function(t, r, n) {
  return function(a) {
    return t(r, n, a), null;
  };
}, hn = function(t, r, n) {
  if (!Ea(t) || qd(t) !== "object")
    return null;
  var a = null;
  return Object.keys(t).forEach(function(i) {
    var u = t[i];
    Dp.includes(i) && typeof u == "function" && (a || (a = {}), a[i] = SN(u, r, n));
  }), a;
}, xN = ["children"], wN = ["children"];
function _b(e, t) {
  if (e == null) return {};
  var r = PN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function PN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var Ab = {
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
}, hr = function(t) {
  return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
}, Ob = null, Cc = null, Mp = function e(t) {
  if (t === Ob && Array.isArray(Cc))
    return Cc;
  var r = [];
  return Mr.forEach(t, function(n) {
    ce(n) || (pN.isFragment(n) ? r = r.concat(e(n.props.children)) : r.push(n));
  }), Cc = r, Ob = t, r;
};
function Dt(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map(function(a) {
    return hr(a);
  }) : n = [hr(t)], Mp(e).forEach(function(a) {
    var i = Tt(a, "type.displayName") || Tt(a, "type.name");
    n.indexOf(i) !== -1 && r.push(a);
  }), r;
}
function gt(e, t) {
  var r = Dt(e, t);
  return r && r[0];
}
var Sb = function(t) {
  if (!t || !t.props)
    return !1;
  var r = t.props, n = r.width, a = r.height;
  return !(!z(n) || n <= 0 || !z(a) || a <= 0);
}, IN = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], CN = function(t) {
  return t && t.type && dn(t.type) && IN.indexOf(t.type) >= 0;
}, NN = function(t, r, n, a) {
  var i, u = (i = Ic?.[a]) !== null && i !== void 0 ? i : [];
  return r.startsWith("data-") || !ae(t) && (a && u.includes(r) || ON.includes(r)) || n && Dp.includes(r);
}, ne = function(t, r, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var a = t;
  if (/* @__PURE__ */ Ct(t) && (a = t.props), !Ea(a))
    return null;
  var i = {};
  return Object.keys(a).forEach(function(u) {
    var o;
    NN((o = a) === null || o === void 0 ? void 0 : o[u], u, r, n) && (i[u] = a[u]);
  }), i;
}, Wd = function e(t, r) {
  if (t === r)
    return !0;
  var n = Mr.count(t);
  if (n !== Mr.count(r))
    return !1;
  if (n === 0)
    return !0;
  if (n === 1)
    return xb(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
  for (var a = 0; a < n; a++) {
    var i = t[a], u = r[a];
    if (Array.isArray(i) || Array.isArray(u)) {
      if (!e(i, u))
        return !1;
    } else if (!xb(i, u))
      return !1;
  }
  return !0;
}, xb = function(t, r) {
  if (ce(t) && ce(r))
    return !0;
  if (!ce(t) && !ce(r)) {
    var n = t.props || {}, a = n.children, i = _b(n, xN), u = r.props || {}, o = u.children, s = _b(u, wN);
    return a && o ? Hn(i, s) && Wd(a, o) : !a && !o ? Hn(i, s) : !1;
  }
  return !1;
}, wb = function(t, r) {
  var n = [], a = {};
  return Mp(t).forEach(function(i, u) {
    if (CN(i))
      n.push(i);
    else if (i) {
      var o = hr(i.type), s = r[o] || {}, c = s.handler, l = s.once;
      if (c && (!l || !a[o])) {
        var f = c(i, o, u);
        n.push(f), a[o] = !0;
      }
    }
  }), n;
}, RN = function(t) {
  var r = t && t.type;
  return r && Ab[r] ? Ab[r] : null;
}, DN = function(t, r) {
  return Mp(r).indexOf(t);
}, MN = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Yd() {
  return Yd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Yd.apply(this, arguments);
}
function LN(e, t) {
  if (e == null) return {};
  var r = kN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function kN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function zd(e) {
  var t = e.children, r = e.width, n = e.height, a = e.viewBox, i = e.className, u = e.style, o = e.title, s = e.desc, c = LN(e, MN), l = a || {
    width: r,
    height: n,
    x: 0,
    y: 0
  }, f = se("recharts-surface", i);
  return /* @__PURE__ */ C.createElement("svg", Yd({}, ne(c, !0, "svg"), {
    className: f,
    width: r,
    height: n,
    style: u,
    viewBox: "".concat(l.x, " ").concat(l.y, " ").concat(l.width, " ").concat(l.height)
  }), /* @__PURE__ */ C.createElement("title", null, o), /* @__PURE__ */ C.createElement("desc", null, s), t);
}
var BN = ["children", "className"];
function Gd() {
  return Gd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Gd.apply(this, arguments);
}
function jN(e, t) {
  if (e == null) return {};
  var r = FN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function FN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var me = /* @__PURE__ */ C.forwardRef(function(e, t) {
  var r = e.children, n = e.className, a = jN(e, BN), i = se("recharts-layer", n);
  return /* @__PURE__ */ C.createElement("g", Gd({
    className: i
  }, ne(a, !0), {
    ref: t
  }), r);
}), Ut = function(t, r) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    a[i - 2] = arguments[i];
}, Nc, Pb;
function $N() {
  if (Pb) return Nc;
  Pb = 1;
  function e(t, r, n) {
    var a = -1, i = t.length;
    r < 0 && (r = -r > i ? 0 : i + r), n = n > i ? i : n, n < 0 && (n += i), i = r > n ? 0 : n - r >>> 0, r >>>= 0;
    for (var u = Array(i); ++a < i; )
      u[a] = t[a + r];
    return u;
  }
  return Nc = e, Nc;
}
var Rc, Ib;
function UN() {
  if (Ib) return Rc;
  Ib = 1;
  var e = $N();
  function t(r, n, a) {
    var i = r.length;
    return a = a === void 0 ? i : a, !n && a >= i ? r : e(r, n, a);
  }
  return Rc = t, Rc;
}
var Dc, Cb;
function E_() {
  if (Cb) return Dc;
  Cb = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", a = t + r + n, i = "\\ufe0e\\ufe0f", u = "\\u200d", o = RegExp("[" + u + e + a + i + "]");
  function s(c) {
    return o.test(c);
  }
  return Dc = s, Dc;
}
var Mc, Nb;
function HN() {
  if (Nb) return Mc;
  Nb = 1;
  function e(t) {
    return t.split("");
  }
  return Mc = e, Mc;
}
var Lc, Rb;
function qN() {
  if (Rb) return Lc;
  Rb = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", a = t + r + n, i = "\\ufe0e\\ufe0f", u = "[" + e + "]", o = "[" + a + "]", s = "\\ud83c[\\udffb-\\udfff]", c = "(?:" + o + "|" + s + ")", l = "[^" + e + "]", f = "(?:\\ud83c[\\udde6-\\uddff]){2}", h = "[\\ud800-\\udbff][\\udc00-\\udfff]", p = "\\u200d", y = c + "?", b = "[" + i + "]?", m = "(?:" + p + "(?:" + [l, f, h].join("|") + ")" + b + y + ")*", E = b + y + m, g = "(?:" + [l + o + "?", o, f, h, u].join("|") + ")", _ = RegExp(s + "(?=" + s + ")|" + g + E, "g");
  function A(v) {
    return v.match(_) || [];
  }
  return Lc = A, Lc;
}
var kc, Db;
function WN() {
  if (Db) return kc;
  Db = 1;
  var e = HN(), t = E_(), r = qN();
  function n(a) {
    return t(a) ? r(a) : e(a);
  }
  return kc = n, kc;
}
var Bc, Mb;
function YN() {
  if (Mb) return Bc;
  Mb = 1;
  var e = UN(), t = E_(), r = WN(), n = b_();
  function a(i) {
    return function(u) {
      u = n(u);
      var o = t(u) ? r(u) : void 0, s = o ? o[0] : u.charAt(0), c = o ? e(o, 1).join("") : u.slice(1);
      return s[i]() + c;
    };
  }
  return Bc = a, Bc;
}
var jc, Lb;
function zN() {
  if (Lb) return jc;
  Lb = 1;
  var e = YN(), t = e("toUpperCase");
  return jc = t, jc;
}
var GN = zN();
const $o = /* @__PURE__ */ ye(GN);
function Ee(e) {
  return function() {
    return e;
  };
}
const T_ = Math.cos, Cu = Math.sin, zt = Math.sqrt, Nu = Math.PI, Uo = 2 * Nu, Kd = Math.PI, Vd = 2 * Kd, Zr = 1e-6, KN = Vd - Zr;
function __(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function VN(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return __;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let a = 1, i = n.length; a < i; ++a)
      this._ += Math.round(arguments[a] * r) / r + n[a];
  };
}
class XN {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? __ : VN(t);
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
  bezierCurveTo(t, r, n, a, i, u) {
    this._append`C${+t},${+r},${+n},${+a},${this._x1 = +i},${this._y1 = +u}`;
  }
  arcTo(t, r, n, a, i) {
    if (t = +t, r = +r, n = +n, a = +a, i = +i, i < 0) throw new Error(`negative radius: ${i}`);
    let u = this._x1, o = this._y1, s = n - t, c = a - r, l = u - t, f = o - r, h = l * l + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (h > Zr) if (!(Math.abs(f * s - c * l) > Zr) || !i)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let p = n - u, y = a - o, b = s * s + c * c, m = p * p + y * y, E = Math.sqrt(b), g = Math.sqrt(h), _ = i * Math.tan((Kd - Math.acos((b + h - m) / (2 * E * g))) / 2), A = _ / g, v = _ / E;
      Math.abs(A - 1) > Zr && this._append`L${t + A * l},${r + A * f}`, this._append`A${i},${i},0,0,${+(f * p > l * y)},${this._x1 = t + v * s},${this._y1 = r + v * c}`;
    }
  }
  arc(t, r, n, a, i, u) {
    if (t = +t, r = +r, n = +n, u = !!u, n < 0) throw new Error(`negative radius: ${n}`);
    let o = n * Math.cos(a), s = n * Math.sin(a), c = t + o, l = r + s, f = 1 ^ u, h = u ? a - i : i - a;
    this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > Zr || Math.abs(this._y1 - l) > Zr) && this._append`L${c},${l}`, n && (h < 0 && (h = h % Vd + Vd), h > KN ? this._append`A${n},${n},0,1,${f},${t - o},${r - s}A${n},${n},0,1,${f},${this._x1 = c},${this._y1 = l}` : h > Zr && this._append`A${n},${n},0,${+(h >= Kd)},${f},${this._x1 = t + n * Math.cos(i)},${this._y1 = r + n * Math.sin(i)}`);
  }
  rect(t, r, n, a) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+a}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Lp(e) {
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
  }, () => new XN(t);
}
function kp(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function A_(e) {
  this._context = e;
}
A_.prototype = {
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
function Ho(e) {
  return new A_(e);
}
function O_(e) {
  return e[0];
}
function S_(e) {
  return e[1];
}
function x_(e, t) {
  var r = Ee(!0), n = null, a = Ho, i = null, u = Lp(o);
  e = typeof e == "function" ? e : e === void 0 ? O_ : Ee(e), t = typeof t == "function" ? t : t === void 0 ? S_ : Ee(t);
  function o(s) {
    var c, l = (s = kp(s)).length, f, h = !1, p;
    for (n == null && (i = a(p = u())), c = 0; c <= l; ++c)
      !(c < l && r(f = s[c], c, s)) === h && ((h = !h) ? i.lineStart() : i.lineEnd()), h && i.point(+e(f, c, s), +t(f, c, s));
    if (p) return i = null, p + "" || null;
  }
  return o.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : Ee(+s), o) : e;
  }, o.y = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : Ee(+s), o) : t;
  }, o.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : Ee(!!s), o) : r;
  }, o.curve = function(s) {
    return arguments.length ? (a = s, n != null && (i = a(n)), o) : a;
  }, o.context = function(s) {
    return arguments.length ? (s == null ? n = i = null : i = a(n = s), o) : n;
  }, o;
}
function uu(e, t, r) {
  var n = null, a = Ee(!0), i = null, u = Ho, o = null, s = Lp(c);
  e = typeof e == "function" ? e : e === void 0 ? O_ : Ee(+e), t = typeof t == "function" ? t : Ee(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? S_ : Ee(+r);
  function c(f) {
    var h, p, y, b = (f = kp(f)).length, m, E = !1, g, _ = new Array(b), A = new Array(b);
    for (i == null && (o = u(g = s())), h = 0; h <= b; ++h) {
      if (!(h < b && a(m = f[h], h, f)) === E)
        if (E = !E)
          p = h, o.areaStart(), o.lineStart();
        else {
          for (o.lineEnd(), o.lineStart(), y = h - 1; y >= p; --y)
            o.point(_[y], A[y]);
          o.lineEnd(), o.areaEnd();
        }
      E && (_[h] = +e(m, h, f), A[h] = +t(m, h, f), o.point(n ? +n(m, h, f) : _[h], r ? +r(m, h, f) : A[h]));
    }
    if (g) return o = null, g + "" || null;
  }
  function l() {
    return x_().defined(a).curve(u).context(i);
  }
  return c.x = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : Ee(+f), n = null, c) : e;
  }, c.x0 = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : Ee(+f), c) : e;
  }, c.x1 = function(f) {
    return arguments.length ? (n = f == null ? null : typeof f == "function" ? f : Ee(+f), c) : n;
  }, c.y = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : Ee(+f), r = null, c) : t;
  }, c.y0 = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : Ee(+f), c) : t;
  }, c.y1 = function(f) {
    return arguments.length ? (r = f == null ? null : typeof f == "function" ? f : Ee(+f), c) : r;
  }, c.lineX0 = c.lineY0 = function() {
    return l().x(e).y(t);
  }, c.lineY1 = function() {
    return l().x(e).y(r);
  }, c.lineX1 = function() {
    return l().x(n).y(t);
  }, c.defined = function(f) {
    return arguments.length ? (a = typeof f == "function" ? f : Ee(!!f), c) : a;
  }, c.curve = function(f) {
    return arguments.length ? (u = f, i != null && (o = u(i)), c) : u;
  }, c.context = function(f) {
    return arguments.length ? (f == null ? i = o = null : o = u(i = f), c) : i;
  }, c;
}
class w_ {
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
function QN(e) {
  return new w_(e, !0);
}
function ZN(e) {
  return new w_(e, !1);
}
const Bp = {
  draw(e, t) {
    const r = zt(t / Nu);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, Uo);
  }
}, JN = {
  draw(e, t) {
    const r = zt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, P_ = zt(1 / 3), e3 = P_ * 2, t3 = {
  draw(e, t) {
    const r = zt(t / e3), n = r * P_;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, r3 = {
  draw(e, t) {
    const r = zt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, n3 = 0.8908130915292852, I_ = Cu(Nu / 10) / Cu(7 * Nu / 10), a3 = Cu(Uo / 10) * I_, i3 = -T_(Uo / 10) * I_, u3 = {
  draw(e, t) {
    const r = zt(t * n3), n = a3 * r, a = i3 * r;
    e.moveTo(0, -r), e.lineTo(n, a);
    for (let i = 1; i < 5; ++i) {
      const u = Uo * i / 5, o = T_(u), s = Cu(u);
      e.lineTo(s * r, -o * r), e.lineTo(o * n - s * a, s * n + o * a);
    }
    e.closePath();
  }
}, Fc = zt(3), o3 = {
  draw(e, t) {
    const r = -zt(t / (Fc * 3));
    e.moveTo(0, r * 2), e.lineTo(-Fc * r, -r), e.lineTo(Fc * r, -r), e.closePath();
  }
}, At = -0.5, Ot = zt(3) / 2, Xd = 1 / zt(12), s3 = (Xd / 2 + 1) * 3, c3 = {
  draw(e, t) {
    const r = zt(t / s3), n = r / 2, a = r * Xd, i = n, u = r * Xd + r, o = -i, s = u;
    e.moveTo(n, a), e.lineTo(i, u), e.lineTo(o, s), e.lineTo(At * n - Ot * a, Ot * n + At * a), e.lineTo(At * i - Ot * u, Ot * i + At * u), e.lineTo(At * o - Ot * s, Ot * o + At * s), e.lineTo(At * n + Ot * a, At * a - Ot * n), e.lineTo(At * i + Ot * u, At * u - Ot * i), e.lineTo(At * o + Ot * s, At * s - Ot * o), e.closePath();
  }
};
function l3(e, t) {
  let r = null, n = Lp(a);
  e = typeof e == "function" ? e : Ee(e || Bp), t = typeof t == "function" ? t : Ee(t === void 0 ? 64 : +t);
  function a() {
    let i;
    if (r || (r = i = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), i) return r = null, i + "" || null;
  }
  return a.type = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : Ee(i), a) : e;
  }, a.size = function(i) {
    return arguments.length ? (t = typeof i == "function" ? i : Ee(+i), a) : t;
  }, a.context = function(i) {
    return arguments.length ? (r = i ?? null, a) : r;
  }, a;
}
function Ru() {
}
function Du(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function C_(e) {
  this._context = e;
}
C_.prototype = {
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
        Du(this, this._x1, this._y1);
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
        Du(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function f3(e) {
  return new C_(e);
}
function N_(e) {
  this._context = e;
}
N_.prototype = {
  areaStart: Ru,
  areaEnd: Ru,
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
        Du(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function d3(e) {
  return new N_(e);
}
function R_(e) {
  this._context = e;
}
R_.prototype = {
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
        Du(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function h3(e) {
  return new R_(e);
}
function D_(e) {
  this._context = e;
}
D_.prototype = {
  areaStart: Ru,
  areaEnd: Ru,
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
function p3(e) {
  return new D_(e);
}
function kb(e) {
  return e < 0 ? -1 : 1;
}
function Bb(e, t, r) {
  var n = e._x1 - e._x0, a = t - e._x1, i = (e._y1 - e._y0) / (n || a < 0 && -0), u = (r - e._y1) / (a || n < 0 && -0), o = (i * a + u * n) / (n + a);
  return (kb(i) + kb(u)) * Math.min(Math.abs(i), Math.abs(u), 0.5 * Math.abs(o)) || 0;
}
function jb(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function $c(e, t, r) {
  var n = e._x0, a = e._y0, i = e._x1, u = e._y1, o = (i - n) / 3;
  e._context.bezierCurveTo(n + o, a + o * t, i - o, u - o * r, i, u);
}
function Mu(e) {
  this._context = e;
}
Mu.prototype = {
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
        $c(this, this._t0, jb(this, this._t0));
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
          this._point = 3, $c(this, jb(this, r = Bb(this, e, t)), r);
          break;
        default:
          $c(this, this._t0, r = Bb(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function M_(e) {
  this._context = new L_(e);
}
(M_.prototype = Object.create(Mu.prototype)).point = function(e, t) {
  Mu.prototype.point.call(this, t, e);
};
function L_(e) {
  this._context = e;
}
L_.prototype = {
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
function m3(e) {
  return new Mu(e);
}
function b3(e) {
  return new M_(e);
}
function k_(e) {
  this._context = e;
}
k_.prototype = {
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
        for (var n = Fb(e), a = Fb(t), i = 0, u = 1; u < r; ++i, ++u)
          this._context.bezierCurveTo(n[0][i], a[0][i], n[1][i], a[1][i], e[u], t[u]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function Fb(e) {
  var t, r = e.length - 1, n, a = new Array(r), i = new Array(r), u = new Array(r);
  for (a[0] = 0, i[0] = 2, u[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) a[t] = 1, i[t] = 4, u[t] = 4 * e[t] + 2 * e[t + 1];
  for (a[r - 1] = 2, i[r - 1] = 7, u[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = a[t] / i[t - 1], i[t] -= n, u[t] -= n * u[t - 1];
  for (a[r - 1] = u[r - 1] / i[r - 1], t = r - 2; t >= 0; --t) a[t] = (u[t] - a[t + 1]) / i[t];
  for (i[r - 1] = (e[r] + a[r - 1]) / 2, t = 0; t < r - 1; ++t) i[t] = 2 * e[t + 1] - a[t + 1];
  return [a, i];
}
function y3(e) {
  return new k_(e);
}
function qo(e, t) {
  this._context = e, this._t = t;
}
qo.prototype = {
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
function g3(e) {
  return new qo(e, 0.5);
}
function v3(e) {
  return new qo(e, 0);
}
function E3(e) {
  return new qo(e, 1);
}
function Kn(e, t) {
  if ((u = e.length) > 1)
    for (var r = 1, n, a, i = e[t[0]], u, o = i.length; r < u; ++r)
      for (a = i, i = e[t[r]], n = 0; n < o; ++n)
        i[n][1] += i[n][0] = isNaN(a[n][1]) ? a[n][0] : a[n][1];
}
function Qd(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function T3(e, t) {
  return e[t];
}
function _3(e) {
  const t = [];
  return t.key = e, t;
}
function A3() {
  var e = Ee([]), t = Qd, r = Kn, n = T3;
  function a(i) {
    var u = Array.from(e.apply(this, arguments), _3), o, s = u.length, c = -1, l;
    for (const f of i)
      for (o = 0, ++c; o < s; ++o)
        (u[o][c] = [0, +n(f, u[o].key, c, i)]).data = f;
    for (o = 0, l = kp(t(u)); o < s; ++o)
      u[l[o]].index = o;
    return r(u, l), u;
  }
  return a.keys = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : Ee(Array.from(i)), a) : e;
  }, a.value = function(i) {
    return arguments.length ? (n = typeof i == "function" ? i : Ee(+i), a) : n;
  }, a.order = function(i) {
    return arguments.length ? (t = i == null ? Qd : typeof i == "function" ? i : Ee(Array.from(i)), a) : t;
  }, a.offset = function(i) {
    return arguments.length ? (r = i ?? Kn, a) : r;
  }, a;
}
function O3(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, a = 0, i = e[0].length, u; a < i; ++a) {
      for (u = r = 0; r < n; ++r) u += e[r][a][1] || 0;
      if (u) for (r = 0; r < n; ++r) e[r][a][1] /= u;
    }
    Kn(e, t);
  }
}
function S3(e, t) {
  if ((a = e.length) > 0) {
    for (var r = 0, n = e[t[0]], a, i = n.length; r < i; ++r) {
      for (var u = 0, o = 0; u < a; ++u) o += e[u][r][1] || 0;
      n[r][1] += n[r][0] = -o / 2;
    }
    Kn(e, t);
  }
}
function x3(e, t) {
  if (!(!((u = e.length) > 0) || !((i = (a = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, a, i, u; n < i; ++n) {
      for (var o = 0, s = 0, c = 0; o < u; ++o) {
        for (var l = e[t[o]], f = l[n][1] || 0, h = l[n - 1][1] || 0, p = (f - h) / 2, y = 0; y < o; ++y) {
          var b = e[t[y]], m = b[n][1] || 0, E = b[n - 1][1] || 0;
          p += m - E;
        }
        s += f, c += p * f;
      }
      a[n - 1][1] += a[n - 1][0] = r, s && (r -= c / s);
    }
    a[n - 1][1] += a[n - 1][0] = r, Kn(e, t);
  }
}
function ui(e) {
  "@babel/helpers - typeof";
  return ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ui(e);
}
var w3 = ["type", "size", "sizeType"];
function Zd() {
  return Zd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Zd.apply(this, arguments);
}
function $b(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ub(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $b(Object(r), !0).forEach(function(n) {
      P3(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $b(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function P3(e, t, r) {
  return t = I3(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function I3(e) {
  var t = C3(e, "string");
  return ui(t) == "symbol" ? t : t + "";
}
function C3(e, t) {
  if (ui(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ui(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function N3(e, t) {
  if (e == null) return {};
  var r = R3(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function R3(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var B_ = {
  symbolCircle: Bp,
  symbolCross: JN,
  symbolDiamond: t3,
  symbolSquare: r3,
  symbolStar: u3,
  symbolTriangle: o3,
  symbolWye: c3
}, D3 = Math.PI / 180, M3 = function(t) {
  var r = "symbol".concat($o(t));
  return B_[r] || Bp;
}, L3 = function(t, r, n) {
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
      var a = 18 * D3;
      return 1.25 * t * t * (Math.tan(a) - Math.tan(a * 2) * Math.pow(Math.tan(a), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, k3 = function(t, r) {
  B_["symbol".concat($o(t))] = r;
}, jp = function(t) {
  var r = t.type, n = r === void 0 ? "circle" : r, a = t.size, i = a === void 0 ? 64 : a, u = t.sizeType, o = u === void 0 ? "area" : u, s = N3(t, w3), c = Ub(Ub({}, s), {}, {
    type: n,
    size: i,
    sizeType: o
  }), l = function() {
    var m = M3(n), E = l3().type(m).size(L3(i, o, n));
    return E();
  }, f = c.className, h = c.cx, p = c.cy, y = ne(c, !0);
  return h === +h && p === +p && i === +i ? /* @__PURE__ */ C.createElement("path", Zd({}, y, {
    className: se("recharts-symbols", f),
    transform: "translate(".concat(h, ", ").concat(p, ")"),
    d: l()
  })) : null;
};
jp.registerSymbol = k3;
function Vn(e) {
  "@babel/helpers - typeof";
  return Vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vn(e);
}
function Jd() {
  return Jd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Jd.apply(this, arguments);
}
function Hb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function B3(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hb(Object(r), !0).forEach(function(n) {
      oi(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function j3(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function F3(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, F_(n.key), n);
  }
}
function $3(e, t, r) {
  return t && F3(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function U3(e, t, r) {
  return t = Lu(t), H3(e, j_() ? Reflect.construct(t, r || [], Lu(e).constructor) : t.apply(e, r));
}
function H3(e, t) {
  if (t && (Vn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return q3(e);
}
function q3(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function j_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (j_ = function() {
    return !!e;
  })();
}
function Lu(e) {
  return Lu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Lu(e);
}
function W3(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && eh(e, t);
}
function eh(e, t) {
  return eh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, eh(e, t);
}
function oi(e, t, r) {
  return t = F_(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function F_(e) {
  var t = Y3(e, "string");
  return Vn(t) == "symbol" ? t : t + "";
}
function Y3(e, t) {
  if (Vn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Vn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var St = 32, Fp = /* @__PURE__ */ (function(e) {
  function t() {
    return j3(this, t), U3(this, t, arguments);
  }
  return W3(t, e), $3(t, [{
    key: "renderIcon",
    value: (
      /**
       * Render the path of icon
       * @param {Object} data Data of each legend item
       * @return {String} Path element
       */
      function(n) {
        var a = this.props.inactiveColor, i = St / 2, u = St / 6, o = St / 3, s = n.inactive ? a : n.color;
        if (n.type === "plainline")
          return /* @__PURE__ */ C.createElement("line", {
            strokeWidth: 4,
            fill: "none",
            stroke: s,
            strokeDasharray: n.payload.strokeDasharray,
            x1: 0,
            y1: i,
            x2: St,
            y2: i,
            className: "recharts-legend-icon"
          });
        if (n.type === "line")
          return /* @__PURE__ */ C.createElement("path", {
            strokeWidth: 4,
            fill: "none",
            stroke: s,
            d: "M0,".concat(i, "h").concat(o, `
            A`).concat(u, ",").concat(u, ",0,1,1,").concat(2 * o, ",").concat(i, `
            H`).concat(St, "M").concat(2 * o, ",").concat(i, `
            A`).concat(u, ",").concat(u, ",0,1,1,").concat(o, ",").concat(i),
            className: "recharts-legend-icon"
          });
        if (n.type === "rect")
          return /* @__PURE__ */ C.createElement("path", {
            stroke: "none",
            fill: s,
            d: "M0,".concat(St / 8, "h").concat(St, "v").concat(St * 3 / 4, "h").concat(-St, "z"),
            className: "recharts-legend-icon"
          });
        if (/* @__PURE__ */ C.isValidElement(n.legendIcon)) {
          var c = B3({}, n);
          return delete c.legendIcon, /* @__PURE__ */ C.cloneElement(n.legendIcon, c);
        }
        return /* @__PURE__ */ C.createElement(jp, {
          fill: s,
          cx: i,
          cy: i,
          size: St,
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
      var n = this, a = this.props, i = a.payload, u = a.iconSize, o = a.layout, s = a.formatter, c = a.inactiveColor, l = {
        x: 0,
        y: 0,
        width: St,
        height: St
      }, f = {
        display: o === "horizontal" ? "inline-block" : "block",
        marginRight: 10
      }, h = {
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 4
      };
      return i.map(function(p, y) {
        var b = p.formatter || s, m = se(oi(oi({
          "recharts-legend-item": !0
        }, "legend-item-".concat(y), !0), "inactive", p.inactive));
        if (p.type === "none")
          return null;
        var E = ae(p.value) ? null : p.value;
        Ut(
          !ae(p.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var g = p.inactive ? c : p.color;
        return /* @__PURE__ */ C.createElement("li", Jd({
          className: m,
          style: f,
          key: "legend-item-".concat(y)
        }, hn(n.props, p, y)), /* @__PURE__ */ C.createElement(zd, {
          width: u,
          height: u,
          viewBox: l,
          style: h
        }, n.renderIcon(p)), /* @__PURE__ */ C.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: g
          }
        }, b ? b(E, p, y) : E));
      });
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.payload, i = n.layout, u = n.align;
      if (!a || !a.length)
        return null;
      var o = {
        padding: 0,
        margin: 0,
        textAlign: i === "horizontal" ? u : "left"
      };
      return /* @__PURE__ */ C.createElement("ul", {
        className: "recharts-default-legend",
        style: o
      }, this.renderItems());
    }
  }]);
})(er);
oi(Fp, "displayName", "Legend");
oi(Fp, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Uc, qb;
function z3() {
  if (qb) return Uc;
  qb = 1;
  var e = Bo();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return Uc = t, Uc;
}
var Hc, Wb;
function G3() {
  if (Wb) return Hc;
  Wb = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return Hc = e, Hc;
}
var qc, Yb;
function K3() {
  if (Yb) return qc;
  Yb = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return qc = e, qc;
}
var Wc, zb;
function V3() {
  if (zb) return Wc;
  zb = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Wc = e, Wc;
}
var Yc, Gb;
function X3() {
  if (Gb) return Yc;
  Gb = 1;
  var e = Bo(), t = Ip(), r = Cp(), n = 200;
  function a(i, u) {
    var o = this.__data__;
    if (o instanceof e) {
      var s = o.__data__;
      if (!t || s.length < n - 1)
        return s.push([i, u]), this.size = ++o.size, this;
      o = this.__data__ = new r(s);
    }
    return o.set(i, u), this.size = o.size, this;
  }
  return Yc = a, Yc;
}
var zc, Kb;
function $_() {
  if (Kb) return zc;
  Kb = 1;
  var e = Bo(), t = z3(), r = G3(), n = K3(), a = V3(), i = X3();
  function u(o) {
    var s = this.__data__ = new e(o);
    this.size = s.size;
  }
  return u.prototype.clear = t, u.prototype.delete = r, u.prototype.get = n, u.prototype.has = a, u.prototype.set = i, zc = u, zc;
}
var Gc, Vb;
function Q3() {
  if (Vb) return Gc;
  Vb = 1;
  var e = "__lodash_hash_undefined__";
  function t(r) {
    return this.__data__.set(r, e), this;
  }
  return Gc = t, Gc;
}
var Kc, Xb;
function Z3() {
  if (Xb) return Kc;
  Xb = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Kc = e, Kc;
}
var Vc, Qb;
function U_() {
  if (Qb) return Vc;
  Qb = 1;
  var e = Cp(), t = Q3(), r = Z3();
  function n(a) {
    var i = -1, u = a == null ? 0 : a.length;
    for (this.__data__ = new e(); ++i < u; )
      this.add(a[i]);
  }
  return n.prototype.add = n.prototype.push = t, n.prototype.has = r, Vc = n, Vc;
}
var Xc, Zb;
function H_() {
  if (Zb) return Xc;
  Zb = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length; ++n < a; )
      if (r(t[n], n, t))
        return !0;
    return !1;
  }
  return Xc = e, Xc;
}
var Qc, Jb;
function q_() {
  if (Jb) return Qc;
  Jb = 1;
  function e(t, r) {
    return t.has(r);
  }
  return Qc = e, Qc;
}
var Zc, ey;
function W_() {
  if (ey) return Zc;
  ey = 1;
  var e = U_(), t = H_(), r = q_(), n = 1, a = 2;
  function i(u, o, s, c, l, f) {
    var h = s & n, p = u.length, y = o.length;
    if (p != y && !(h && y > p))
      return !1;
    var b = f.get(u), m = f.get(o);
    if (b && m)
      return b == o && m == u;
    var E = -1, g = !0, _ = s & a ? new e() : void 0;
    for (f.set(u, o), f.set(o, u); ++E < p; ) {
      var A = u[E], v = o[E];
      if (c)
        var T = h ? c(v, A, E, o, u, f) : c(A, v, E, u, o, f);
      if (T !== void 0) {
        if (T)
          continue;
        g = !1;
        break;
      }
      if (_) {
        if (!t(o, function(S, I) {
          if (!r(_, I) && (A === S || l(A, S, s, c, f)))
            return _.push(I);
        })) {
          g = !1;
          break;
        }
      } else if (!(A === v || l(A, v, s, c, f))) {
        g = !1;
        break;
      }
    }
    return f.delete(u), f.delete(o), g;
  }
  return Zc = i, Zc;
}
var Jc, ty;
function J3() {
  if (ty) return Jc;
  ty = 1;
  var e = tr(), t = e.Uint8Array;
  return Jc = t, Jc;
}
var el, ry;
function eR() {
  if (ry) return el;
  ry = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(a, i) {
      n[++r] = [i, a];
    }), n;
  }
  return el = e, el;
}
var tl, ny;
function $p() {
  if (ny) return tl;
  ny = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(a) {
      n[++r] = a;
    }), n;
  }
  return tl = e, tl;
}
var rl, ay;
function tR() {
  if (ay) return rl;
  ay = 1;
  var e = Wi(), t = J3(), r = Pp(), n = W_(), a = eR(), i = $p(), u = 1, o = 2, s = "[object Boolean]", c = "[object Date]", l = "[object Error]", f = "[object Map]", h = "[object Number]", p = "[object RegExp]", y = "[object Set]", b = "[object String]", m = "[object Symbol]", E = "[object ArrayBuffer]", g = "[object DataView]", _ = e ? e.prototype : void 0, A = _ ? _.valueOf : void 0;
  function v(T, S, I, N, k, D, R) {
    switch (I) {
      case g:
        if (T.byteLength != S.byteLength || T.byteOffset != S.byteOffset)
          return !1;
        T = T.buffer, S = S.buffer;
      case E:
        return !(T.byteLength != S.byteLength || !D(new t(T), new t(S)));
      case s:
      case c:
      case h:
        return r(+T, +S);
      case l:
        return T.name == S.name && T.message == S.message;
      case p:
      case b:
        return T == S + "";
      case f:
        var L = a;
      case y:
        var F = N & u;
        if (L || (L = i), T.size != S.size && !F)
          return !1;
        var j = R.get(T);
        if (j)
          return j == S;
        N |= o, R.set(T, S);
        var U = n(L(T), L(S), N, k, D, R);
        return R.delete(T), U;
      case m:
        if (A)
          return A.call(T) == A.call(S);
    }
    return !1;
  }
  return rl = v, rl;
}
var nl, iy;
function Y_() {
  if (iy) return nl;
  iy = 1;
  function e(t, r) {
    for (var n = -1, a = r.length, i = t.length; ++n < a; )
      t[i + n] = r[n];
    return t;
  }
  return nl = e, nl;
}
var al, uy;
function rR() {
  if (uy) return al;
  uy = 1;
  var e = Y_(), t = mt();
  function r(n, a, i) {
    var u = a(n);
    return t(n) ? u : e(u, i(n));
  }
  return al = r, al;
}
var il, oy;
function nR() {
  if (oy) return il;
  oy = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length, i = 0, u = []; ++n < a; ) {
      var o = t[n];
      r(o, n, t) && (u[i++] = o);
    }
    return u;
  }
  return il = e, il;
}
var ul, sy;
function aR() {
  if (sy) return ul;
  sy = 1;
  function e() {
    return [];
  }
  return ul = e, ul;
}
var ol, cy;
function iR() {
  if (cy) return ol;
  cy = 1;
  var e = nR(), t = aR(), r = Object.prototype, n = r.propertyIsEnumerable, a = Object.getOwnPropertySymbols, i = a ? function(u) {
    return u == null ? [] : (u = Object(u), e(a(u), function(o) {
      return n.call(u, o);
    }));
  } : t;
  return ol = i, ol;
}
var sl, ly;
function uR() {
  if (ly) return sl;
  ly = 1;
  function e(t, r) {
    for (var n = -1, a = Array(t); ++n < t; )
      a[n] = r(n);
    return a;
  }
  return sl = e, sl;
}
var cl, fy;
function oR() {
  if (fy) return cl;
  fy = 1;
  var e = Er(), t = Tr(), r = "[object Arguments]";
  function n(a) {
    return t(a) && e(a) == r;
  }
  return cl = n, cl;
}
var ll, dy;
function Up() {
  if (dy) return ll;
  dy = 1;
  var e = oR(), t = Tr(), r = Object.prototype, n = r.hasOwnProperty, a = r.propertyIsEnumerable, i = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(u) {
    return t(u) && n.call(u, "callee") && !a.call(u, "callee");
  };
  return ll = i, ll;
}
var Ua = { exports: {} }, fl, hy;
function sR() {
  if (hy) return fl;
  hy = 1;
  function e() {
    return !1;
  }
  return fl = e, fl;
}
Ua.exports;
var py;
function z_() {
  return py || (py = 1, (function(e, t) {
    var r = tr(), n = sR(), a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, u = i && i.exports === a, o = u ? r.Buffer : void 0, s = o ? o.isBuffer : void 0, c = s || n;
    e.exports = c;
  })(Ua, Ua.exports)), Ua.exports;
}
var dl, my;
function Hp() {
  if (my) return dl;
  my = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function r(n, a) {
    var i = typeof n;
    return a = a ?? e, !!a && (i == "number" || i != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < a;
  }
  return dl = r, dl;
}
var hl, by;
function qp() {
  if (by) return hl;
  by = 1;
  var e = 9007199254740991;
  function t(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
  }
  return hl = t, hl;
}
var pl, yy;
function cR() {
  if (yy) return pl;
  yy = 1;
  var e = Er(), t = qp(), r = Tr(), n = "[object Arguments]", a = "[object Array]", i = "[object Boolean]", u = "[object Date]", o = "[object Error]", s = "[object Function]", c = "[object Map]", l = "[object Number]", f = "[object Object]", h = "[object RegExp]", p = "[object Set]", y = "[object String]", b = "[object WeakMap]", m = "[object ArrayBuffer]", E = "[object DataView]", g = "[object Float32Array]", _ = "[object Float64Array]", A = "[object Int8Array]", v = "[object Int16Array]", T = "[object Int32Array]", S = "[object Uint8Array]", I = "[object Uint8ClampedArray]", N = "[object Uint16Array]", k = "[object Uint32Array]", D = {};
  D[g] = D[_] = D[A] = D[v] = D[T] = D[S] = D[I] = D[N] = D[k] = !0, D[n] = D[a] = D[m] = D[i] = D[E] = D[u] = D[o] = D[s] = D[c] = D[l] = D[f] = D[h] = D[p] = D[y] = D[b] = !1;
  function R(L) {
    return r(L) && t(L.length) && !!D[e(L)];
  }
  return pl = R, pl;
}
var ml, gy;
function G_() {
  if (gy) return ml;
  gy = 1;
  function e(t) {
    return function(r) {
      return t(r);
    };
  }
  return ml = e, ml;
}
var Ha = { exports: {} };
Ha.exports;
var vy;
function lR() {
  return vy || (vy = 1, (function(e, t) {
    var r = h_(), n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, i = a && a.exports === n, u = i && r.process, o = (function() {
      try {
        var s = a && a.require && a.require("util").types;
        return s || u && u.binding && u.binding("util");
      } catch {
      }
    })();
    e.exports = o;
  })(Ha, Ha.exports)), Ha.exports;
}
var bl, Ey;
function K_() {
  if (Ey) return bl;
  Ey = 1;
  var e = cR(), t = G_(), r = lR(), n = r && r.isTypedArray, a = n ? t(n) : e;
  return bl = a, bl;
}
var yl, Ty;
function fR() {
  if (Ty) return yl;
  Ty = 1;
  var e = uR(), t = Up(), r = mt(), n = z_(), a = Hp(), i = K_(), u = Object.prototype, o = u.hasOwnProperty;
  function s(c, l) {
    var f = r(c), h = !f && t(c), p = !f && !h && n(c), y = !f && !h && !p && i(c), b = f || h || p || y, m = b ? e(c.length, String) : [], E = m.length;
    for (var g in c)
      (l || o.call(c, g)) && !(b && // Safari 9 has enumerable `arguments.length` in strict mode.
      (g == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      p && (g == "offset" || g == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      y && (g == "buffer" || g == "byteLength" || g == "byteOffset") || // Skip index properties.
      a(g, E))) && m.push(g);
    return m;
  }
  return yl = s, yl;
}
var gl, _y;
function dR() {
  if (_y) return gl;
  _y = 1;
  var e = Object.prototype;
  function t(r) {
    var n = r && r.constructor, a = typeof n == "function" && n.prototype || e;
    return r === a;
  }
  return gl = t, gl;
}
var vl, Ay;
function V_() {
  if (Ay) return vl;
  Ay = 1;
  function e(t, r) {
    return function(n) {
      return t(r(n));
    };
  }
  return vl = e, vl;
}
var El, Oy;
function hR() {
  if (Oy) return El;
  Oy = 1;
  var e = V_(), t = e(Object.keys, Object);
  return El = t, El;
}
var Tl, Sy;
function pR() {
  if (Sy) return Tl;
  Sy = 1;
  var e = dR(), t = hR(), r = Object.prototype, n = r.hasOwnProperty;
  function a(i) {
    if (!e(i))
      return t(i);
    var u = [];
    for (var o in Object(i))
      n.call(i, o) && o != "constructor" && u.push(o);
    return u;
  }
  return Tl = a, Tl;
}
var _l, xy;
function Gi() {
  if (xy) return _l;
  xy = 1;
  var e = wp(), t = qp();
  function r(n) {
    return n != null && t(n.length) && !e(n);
  }
  return _l = r, _l;
}
var Al, wy;
function Wo() {
  if (wy) return Al;
  wy = 1;
  var e = fR(), t = pR(), r = Gi();
  function n(a) {
    return r(a) ? e(a) : t(a);
  }
  return Al = n, Al;
}
var Ol, Py;
function mR() {
  if (Py) return Ol;
  Py = 1;
  var e = rR(), t = iR(), r = Wo();
  function n(a) {
    return e(a, r, t);
  }
  return Ol = n, Ol;
}
var Sl, Iy;
function bR() {
  if (Iy) return Sl;
  Iy = 1;
  var e = mR(), t = 1, r = Object.prototype, n = r.hasOwnProperty;
  function a(i, u, o, s, c, l) {
    var f = o & t, h = e(i), p = h.length, y = e(u), b = y.length;
    if (p != b && !f)
      return !1;
    for (var m = p; m--; ) {
      var E = h[m];
      if (!(f ? E in u : n.call(u, E)))
        return !1;
    }
    var g = l.get(i), _ = l.get(u);
    if (g && _)
      return g == u && _ == i;
    var A = !0;
    l.set(i, u), l.set(u, i);
    for (var v = f; ++m < p; ) {
      E = h[m];
      var T = i[E], S = u[E];
      if (s)
        var I = f ? s(S, T, E, u, i, l) : s(T, S, E, i, u, l);
      if (!(I === void 0 ? T === S || c(T, S, o, s, l) : I)) {
        A = !1;
        break;
      }
      v || (v = E == "constructor");
    }
    if (A && !v) {
      var N = i.constructor, k = u.constructor;
      N != k && "constructor" in i && "constructor" in u && !(typeof N == "function" && N instanceof N && typeof k == "function" && k instanceof k) && (A = !1);
    }
    return l.delete(i), l.delete(u), A;
  }
  return Sl = a, Sl;
}
var xl, Cy;
function yR() {
  if (Cy) return xl;
  Cy = 1;
  var e = Tn(), t = tr(), r = e(t, "DataView");
  return xl = r, xl;
}
var wl, Ny;
function gR() {
  if (Ny) return wl;
  Ny = 1;
  var e = Tn(), t = tr(), r = e(t, "Promise");
  return wl = r, wl;
}
var Pl, Ry;
function X_() {
  if (Ry) return Pl;
  Ry = 1;
  var e = Tn(), t = tr(), r = e(t, "Set");
  return Pl = r, Pl;
}
var Il, Dy;
function vR() {
  if (Dy) return Il;
  Dy = 1;
  var e = Tn(), t = tr(), r = e(t, "WeakMap");
  return Il = r, Il;
}
var Cl, My;
function ER() {
  if (My) return Cl;
  My = 1;
  var e = yR(), t = Ip(), r = gR(), n = X_(), a = vR(), i = Er(), u = p_(), o = "[object Map]", s = "[object Object]", c = "[object Promise]", l = "[object Set]", f = "[object WeakMap]", h = "[object DataView]", p = u(e), y = u(t), b = u(r), m = u(n), E = u(a), g = i;
  return (e && g(new e(new ArrayBuffer(1))) != h || t && g(new t()) != o || r && g(r.resolve()) != c || n && g(new n()) != l || a && g(new a()) != f) && (g = function(_) {
    var A = i(_), v = A == s ? _.constructor : void 0, T = v ? u(v) : "";
    if (T)
      switch (T) {
        case p:
          return h;
        case y:
          return o;
        case b:
          return c;
        case m:
          return l;
        case E:
          return f;
      }
    return A;
  }), Cl = g, Cl;
}
var Nl, Ly;
function TR() {
  if (Ly) return Nl;
  Ly = 1;
  var e = $_(), t = W_(), r = tR(), n = bR(), a = ER(), i = mt(), u = z_(), o = K_(), s = 1, c = "[object Arguments]", l = "[object Array]", f = "[object Object]", h = Object.prototype, p = h.hasOwnProperty;
  function y(b, m, E, g, _, A) {
    var v = i(b), T = i(m), S = v ? l : a(b), I = T ? l : a(m);
    S = S == c ? f : S, I = I == c ? f : I;
    var N = S == f, k = I == f, D = S == I;
    if (D && u(b)) {
      if (!u(m))
        return !1;
      v = !0, N = !1;
    }
    if (D && !N)
      return A || (A = new e()), v || o(b) ? t(b, m, E, g, _, A) : r(b, m, S, E, g, _, A);
    if (!(E & s)) {
      var R = N && p.call(b, "__wrapped__"), L = k && p.call(m, "__wrapped__");
      if (R || L) {
        var F = R ? b.value() : b, j = L ? m.value() : m;
        return A || (A = new e()), _(F, j, E, g, A);
      }
    }
    return D ? (A || (A = new e()), n(b, m, E, g, _, A)) : !1;
  }
  return Nl = y, Nl;
}
var Rl, ky;
function Wp() {
  if (ky) return Rl;
  ky = 1;
  var e = TR(), t = Tr();
  function r(n, a, i, u, o) {
    return n === a ? !0 : n == null || a == null || !t(n) && !t(a) ? n !== n && a !== a : e(n, a, i, u, r, o);
  }
  return Rl = r, Rl;
}
var Dl, By;
function _R() {
  if (By) return Dl;
  By = 1;
  var e = $_(), t = Wp(), r = 1, n = 2;
  function a(i, u, o, s) {
    var c = o.length, l = c, f = !s;
    if (i == null)
      return !l;
    for (i = Object(i); c--; ) {
      var h = o[c];
      if (f && h[2] ? h[1] !== i[h[0]] : !(h[0] in i))
        return !1;
    }
    for (; ++c < l; ) {
      h = o[c];
      var p = h[0], y = i[p], b = h[1];
      if (f && h[2]) {
        if (y === void 0 && !(p in i))
          return !1;
      } else {
        var m = new e();
        if (s)
          var E = s(y, b, p, i, u, m);
        if (!(E === void 0 ? t(b, y, r | n, s, m) : E))
          return !1;
      }
    }
    return !0;
  }
  return Dl = a, Dl;
}
var Ml, jy;
function Q_() {
  if (jy) return Ml;
  jy = 1;
  var e = Ur();
  function t(r) {
    return r === r && !e(r);
  }
  return Ml = t, Ml;
}
var Ll, Fy;
function AR() {
  if (Fy) return Ll;
  Fy = 1;
  var e = Q_(), t = Wo();
  function r(n) {
    for (var a = t(n), i = a.length; i--; ) {
      var u = a[i], o = n[u];
      a[i] = [u, o, e(o)];
    }
    return a;
  }
  return Ll = r, Ll;
}
var kl, $y;
function Z_() {
  if ($y) return kl;
  $y = 1;
  function e(t, r) {
    return function(n) {
      return n == null ? !1 : n[t] === r && (r !== void 0 || t in Object(n));
    };
  }
  return kl = e, kl;
}
var Bl, Uy;
function OR() {
  if (Uy) return Bl;
  Uy = 1;
  var e = _R(), t = AR(), r = Z_();
  function n(a) {
    var i = t(a);
    return i.length == 1 && i[0][2] ? r(i[0][0], i[0][1]) : function(u) {
      return u === a || e(u, a, i);
    };
  }
  return Bl = n, Bl;
}
var jl, Hy;
function SR() {
  if (Hy) return jl;
  Hy = 1;
  function e(t, r) {
    return t != null && r in Object(t);
  }
  return jl = e, jl;
}
var Fl, qy;
function xR() {
  if (qy) return Fl;
  qy = 1;
  var e = y_(), t = Up(), r = mt(), n = Hp(), a = qp(), i = Fo();
  function u(o, s, c) {
    s = e(s, o);
    for (var l = -1, f = s.length, h = !1; ++l < f; ) {
      var p = i(s[l]);
      if (!(h = o != null && c(o, p)))
        break;
      o = o[p];
    }
    return h || ++l != f ? h : (f = o == null ? 0 : o.length, !!f && a(f) && n(p, f) && (r(o) || t(o)));
  }
  return Fl = u, Fl;
}
var $l, Wy;
function wR() {
  if (Wy) return $l;
  Wy = 1;
  var e = SR(), t = xR();
  function r(n, a) {
    return n != null && t(n, a, e);
  }
  return $l = r, $l;
}
var Ul, Yy;
function PR() {
  if (Yy) return Ul;
  Yy = 1;
  var e = Wp(), t = g_(), r = wR(), n = xp(), a = Q_(), i = Z_(), u = Fo(), o = 1, s = 2;
  function c(l, f) {
    return n(l) && a(f) ? i(u(l), f) : function(h) {
      var p = t(h, l);
      return p === void 0 && p === f ? r(h, l) : e(f, p, o | s);
    };
  }
  return Ul = c, Ul;
}
var Hl, zy;
function Ta() {
  if (zy) return Hl;
  zy = 1;
  function e(t) {
    return t;
  }
  return Hl = e, Hl;
}
var ql, Gy;
function IR() {
  if (Gy) return ql;
  Gy = 1;
  function e(t) {
    return function(r) {
      return r?.[t];
    };
  }
  return ql = e, ql;
}
var Wl, Ky;
function CR() {
  if (Ky) return Wl;
  Ky = 1;
  var e = Rp();
  function t(r) {
    return function(n) {
      return e(n, r);
    };
  }
  return Wl = t, Wl;
}
var Yl, Vy;
function NR() {
  if (Vy) return Yl;
  Vy = 1;
  var e = IR(), t = CR(), r = xp(), n = Fo();
  function a(i) {
    return r(i) ? e(n(i)) : t(i);
  }
  return Yl = a, Yl;
}
var zl, Xy;
function rr() {
  if (Xy) return zl;
  Xy = 1;
  var e = OR(), t = PR(), r = Ta(), n = mt(), a = NR();
  function i(u) {
    return typeof u == "function" ? u : u == null ? r : typeof u == "object" ? n(u) ? t(u[0], u[1]) : e(u) : a(u);
  }
  return zl = i, zl;
}
var Gl, Qy;
function J_() {
  if (Qy) return Gl;
  Qy = 1;
  function e(t, r, n, a) {
    for (var i = t.length, u = n + (a ? 1 : -1); a ? u-- : ++u < i; )
      if (r(t[u], u, t))
        return u;
    return -1;
  }
  return Gl = e, Gl;
}
var Kl, Zy;
function RR() {
  if (Zy) return Kl;
  Zy = 1;
  function e(t) {
    return t !== t;
  }
  return Kl = e, Kl;
}
var Vl, Jy;
function DR() {
  if (Jy) return Vl;
  Jy = 1;
  function e(t, r, n) {
    for (var a = n - 1, i = t.length; ++a < i; )
      if (t[a] === r)
        return a;
    return -1;
  }
  return Vl = e, Vl;
}
var Xl, eg;
function MR() {
  if (eg) return Xl;
  eg = 1;
  var e = J_(), t = RR(), r = DR();
  function n(a, i, u) {
    return i === i ? r(a, i, u) : e(a, t, u);
  }
  return Xl = n, Xl;
}
var Ql, tg;
function LR() {
  if (tg) return Ql;
  tg = 1;
  var e = MR();
  function t(r, n) {
    var a = r == null ? 0 : r.length;
    return !!a && e(r, n, 0) > -1;
  }
  return Ql = t, Ql;
}
var Zl, rg;
function kR() {
  if (rg) return Zl;
  rg = 1;
  function e(t, r, n) {
    for (var a = -1, i = t == null ? 0 : t.length; ++a < i; )
      if (n(r, t[a]))
        return !0;
    return !1;
  }
  return Zl = e, Zl;
}
var Jl, ng;
function BR() {
  if (ng) return Jl;
  ng = 1;
  function e() {
  }
  return Jl = e, Jl;
}
var ef, ag;
function jR() {
  if (ag) return ef;
  ag = 1;
  var e = X_(), t = BR(), r = $p(), n = 1 / 0, a = e && 1 / r(new e([, -0]))[1] == n ? function(i) {
    return new e(i);
  } : t;
  return ef = a, ef;
}
var tf, ig;
function FR() {
  if (ig) return tf;
  ig = 1;
  var e = U_(), t = LR(), r = kR(), n = q_(), a = jR(), i = $p(), u = 200;
  function o(s, c, l) {
    var f = -1, h = t, p = s.length, y = !0, b = [], m = b;
    if (l)
      y = !1, h = r;
    else if (p >= u) {
      var E = c ? null : a(s);
      if (E)
        return i(E);
      y = !1, h = n, m = new e();
    } else
      m = c ? [] : b;
    e:
      for (; ++f < p; ) {
        var g = s[f], _ = c ? c(g) : g;
        if (g = l || g !== 0 ? g : 0, y && _ === _) {
          for (var A = m.length; A--; )
            if (m[A] === _)
              continue e;
          c && m.push(_), b.push(g);
        } else h(m, _, l) || (m !== b && m.push(_), b.push(g));
      }
    return b;
  }
  return tf = o, tf;
}
var rf, ug;
function $R() {
  if (ug) return rf;
  ug = 1;
  var e = rr(), t = FR();
  function r(n, a) {
    return n && n.length ? t(n, e(a, 2)) : [];
  }
  return rf = r, rf;
}
var UR = $R();
const og = /* @__PURE__ */ ye(UR);
function eA(e, t, r) {
  return t === !0 ? og(e, r) : ae(t) ? og(e, t) : e;
}
function Xn(e) {
  "@babel/helpers - typeof";
  return Xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xn(e);
}
var HR = ["ref"];
function sg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ar(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sg(Object(r), !0).forEach(function(n) {
      Yo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qR(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function cg(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, rA(n.key), n);
  }
}
function WR(e, t, r) {
  return t && cg(e.prototype, t), r && cg(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function YR(e, t, r) {
  return t = ku(t), zR(e, tA() ? Reflect.construct(t, r || [], ku(e).constructor) : t.apply(e, r));
}
function zR(e, t) {
  if (t && (Xn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return GR(e);
}
function GR(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function tA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (tA = function() {
    return !!e;
  })();
}
function ku(e) {
  return ku = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ku(e);
}
function KR(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && th(e, t);
}
function th(e, t) {
  return th = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, th(e, t);
}
function Yo(e, t, r) {
  return t = rA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rA(e) {
  var t = VR(e, "string");
  return Xn(t) == "symbol" ? t : t + "";
}
function VR(e, t) {
  if (Xn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Xn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function XR(e, t) {
  if (e == null) return {};
  var r = QR(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function QR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function ZR(e) {
  return e.value;
}
function JR(e, t) {
  if (/* @__PURE__ */ C.isValidElement(e))
    return /* @__PURE__ */ C.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ C.createElement(e, t);
  t.ref;
  var r = XR(t, HR);
  return /* @__PURE__ */ C.createElement(Fp, r);
}
var lg = 1, kr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    qR(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = YR(this, t, [].concat(a)), Yo(r, "lastBoundingBox", {
      width: -1,
      height: -1
    }), r;
  }
  return KR(t, e), WR(t, [{
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
      a ? (Math.abs(a.width - this.lastBoundingBox.width) > lg || Math.abs(a.height - this.lastBoundingBox.height) > lg) && (this.lastBoundingBox.width = a.width, this.lastBoundingBox.height = a.height, n && n(a)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null));
    }
  }, {
    key: "getBBoxSnapshot",
    value: function() {
      return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? ar({}, this.lastBoundingBox) : {
        width: 0,
        height: 0
      };
    }
  }, {
    key: "getDefaultPosition",
    value: function(n) {
      var a = this.props, i = a.layout, u = a.align, o = a.verticalAlign, s = a.margin, c = a.chartWidth, l = a.chartHeight, f, h;
      if (!n || (n.left === void 0 || n.left === null) && (n.right === void 0 || n.right === null))
        if (u === "center" && i === "vertical") {
          var p = this.getBBoxSnapshot();
          f = {
            left: ((c || 0) - p.width) / 2
          };
        } else
          f = u === "right" ? {
            right: s && s.right || 0
          } : {
            left: s && s.left || 0
          };
      if (!n || (n.top === void 0 || n.top === null) && (n.bottom === void 0 || n.bottom === null))
        if (o === "middle") {
          var y = this.getBBoxSnapshot();
          h = {
            top: ((l || 0) - y.height) / 2
          };
        } else
          h = o === "bottom" ? {
            bottom: s && s.bottom || 0
          } : {
            top: s && s.top || 0
          };
      return ar(ar({}, f), h);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.content, u = a.width, o = a.height, s = a.wrapperStyle, c = a.payloadUniqBy, l = a.payload, f = ar(ar({
        position: "absolute",
        width: u || "auto",
        height: o || "auto"
      }, this.getDefaultPosition(s)), s);
      return /* @__PURE__ */ C.createElement("div", {
        className: "recharts-legend-wrapper",
        style: f,
        ref: function(p) {
          n.wrapperNode = p;
        }
      }, JR(i, ar(ar({}, this.props), {}, {
        payload: eA(l, c, ZR)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function(n, a) {
      var i = ar(ar({}, this.defaultProps), n.props), u = i.layout;
      return u === "vertical" && z(n.props.height) ? {
        height: n.props.height
      } : u === "horizontal" ? {
        width: n.props.width || a
      } : null;
    }
  }]);
})(er);
Yo(kr, "displayName", "Legend");
Yo(kr, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var nf, fg;
function eD() {
  if (fg) return nf;
  fg = 1;
  var e = Wi(), t = Up(), r = mt(), n = e ? e.isConcatSpreadable : void 0;
  function a(i) {
    return r(i) || t(i) || !!(n && i && i[n]);
  }
  return nf = a, nf;
}
var af, dg;
function nA() {
  if (dg) return af;
  dg = 1;
  var e = Y_(), t = eD();
  function r(n, a, i, u, o) {
    var s = -1, c = n.length;
    for (i || (i = t), o || (o = []); ++s < c; ) {
      var l = n[s];
      a > 0 && i(l) ? a > 1 ? r(l, a - 1, i, u, o) : e(o, l) : u || (o[o.length] = l);
    }
    return o;
  }
  return af = r, af;
}
var uf, hg;
function tD() {
  if (hg) return uf;
  hg = 1;
  function e(t) {
    return function(r, n, a) {
      for (var i = -1, u = Object(r), o = a(r), s = o.length; s--; ) {
        var c = o[t ? s : ++i];
        if (n(u[c], c, u) === !1)
          break;
      }
      return r;
    };
  }
  return uf = e, uf;
}
var of, pg;
function rD() {
  if (pg) return of;
  pg = 1;
  var e = tD(), t = e();
  return of = t, of;
}
var sf, mg;
function aA() {
  if (mg) return sf;
  mg = 1;
  var e = rD(), t = Wo();
  function r(n, a) {
    return n && e(n, a, t);
  }
  return sf = r, sf;
}
var cf, bg;
function nD() {
  if (bg) return cf;
  bg = 1;
  var e = Gi();
  function t(r, n) {
    return function(a, i) {
      if (a == null)
        return a;
      if (!e(a))
        return r(a, i);
      for (var u = a.length, o = n ? u : -1, s = Object(a); (n ? o-- : ++o < u) && i(s[o], o, s) !== !1; )
        ;
      return a;
    };
  }
  return cf = t, cf;
}
var lf, yg;
function Yp() {
  if (yg) return lf;
  yg = 1;
  var e = aA(), t = nD(), r = t(e);
  return lf = r, lf;
}
var ff, gg;
function iA() {
  if (gg) return ff;
  gg = 1;
  var e = Yp(), t = Gi();
  function r(n, a) {
    var i = -1, u = t(n) ? Array(n.length) : [];
    return e(n, function(o, s, c) {
      u[++i] = a(o, s, c);
    }), u;
  }
  return ff = r, ff;
}
var df, vg;
function aD() {
  if (vg) return df;
  vg = 1;
  function e(t, r) {
    var n = t.length;
    for (t.sort(r); n--; )
      t[n] = t[n].value;
    return t;
  }
  return df = e, df;
}
var hf, Eg;
function iD() {
  if (Eg) return hf;
  Eg = 1;
  var e = va();
  function t(r, n) {
    if (r !== n) {
      var a = r !== void 0, i = r === null, u = r === r, o = e(r), s = n !== void 0, c = n === null, l = n === n, f = e(n);
      if (!c && !f && !o && r > n || o && s && l && !c && !f || i && s && l || !a && l || !u)
        return 1;
      if (!i && !o && !f && r < n || f && a && u && !i && !o || c && a && u || !s && u || !l)
        return -1;
    }
    return 0;
  }
  return hf = t, hf;
}
var pf, Tg;
function uD() {
  if (Tg) return pf;
  Tg = 1;
  var e = iD();
  function t(r, n, a) {
    for (var i = -1, u = r.criteria, o = n.criteria, s = u.length, c = a.length; ++i < s; ) {
      var l = e(u[i], o[i]);
      if (l) {
        if (i >= c)
          return l;
        var f = a[i];
        return l * (f == "desc" ? -1 : 1);
      }
    }
    return r.index - n.index;
  }
  return pf = t, pf;
}
var mf, _g;
function oD() {
  if (_g) return mf;
  _g = 1;
  var e = Np(), t = Rp(), r = rr(), n = iA(), a = aD(), i = G_(), u = uD(), o = Ta(), s = mt();
  function c(l, f, h) {
    f.length ? f = e(f, function(b) {
      return s(b) ? function(m) {
        return t(m, b.length === 1 ? b[0] : b);
      } : b;
    }) : f = [o];
    var p = -1;
    f = e(f, i(r));
    var y = n(l, function(b, m, E) {
      var g = e(f, function(_) {
        return _(b);
      });
      return { criteria: g, index: ++p, value: b };
    });
    return a(y, function(b, m) {
      return u(b, m, h);
    });
  }
  return mf = c, mf;
}
var bf, Ag;
function sD() {
  if (Ag) return bf;
  Ag = 1;
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
  return bf = e, bf;
}
var yf, Og;
function cD() {
  if (Og) return yf;
  Og = 1;
  var e = sD(), t = Math.max;
  function r(n, a, i) {
    return a = t(a === void 0 ? n.length - 1 : a, 0), function() {
      for (var u = arguments, o = -1, s = t(u.length - a, 0), c = Array(s); ++o < s; )
        c[o] = u[a + o];
      o = -1;
      for (var l = Array(a + 1); ++o < a; )
        l[o] = u[o];
      return l[a] = i(c), e(n, this, l);
    };
  }
  return yf = r, yf;
}
var gf, Sg;
function lD() {
  if (Sg) return gf;
  Sg = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return gf = e, gf;
}
var vf, xg;
function uA() {
  if (xg) return vf;
  xg = 1;
  var e = Tn(), t = (function() {
    try {
      var r = e(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  })();
  return vf = t, vf;
}
var Ef, wg;
function fD() {
  if (wg) return Ef;
  wg = 1;
  var e = lD(), t = uA(), r = Ta(), n = t ? function(a, i) {
    return t(a, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(i),
      writable: !0
    });
  } : r;
  return Ef = n, Ef;
}
var Tf, Pg;
function dD() {
  if (Pg) return Tf;
  Pg = 1;
  var e = 800, t = 16, r = Date.now;
  function n(a) {
    var i = 0, u = 0;
    return function() {
      var o = r(), s = t - (o - u);
      if (u = o, s > 0) {
        if (++i >= e)
          return arguments[0];
      } else
        i = 0;
      return a.apply(void 0, arguments);
    };
  }
  return Tf = n, Tf;
}
var _f, Ig;
function hD() {
  if (Ig) return _f;
  Ig = 1;
  var e = fD(), t = dD(), r = t(e);
  return _f = r, _f;
}
var Af, Cg;
function pD() {
  if (Cg) return Af;
  Cg = 1;
  var e = Ta(), t = cD(), r = hD();
  function n(a, i) {
    return r(t(a, i, e), a + "");
  }
  return Af = n, Af;
}
var Of, Ng;
function zo() {
  if (Ng) return Of;
  Ng = 1;
  var e = Pp(), t = Gi(), r = Hp(), n = Ur();
  function a(i, u, o) {
    if (!n(o))
      return !1;
    var s = typeof u;
    return (s == "number" ? t(o) && r(u, o.length) : s == "string" && u in o) ? e(o[u], i) : !1;
  }
  return Of = a, Of;
}
var Sf, Rg;
function mD() {
  if (Rg) return Sf;
  Rg = 1;
  var e = nA(), t = oD(), r = pD(), n = zo(), a = r(function(i, u) {
    if (i == null)
      return [];
    var o = u.length;
    return o > 1 && n(i, u[0], u[1]) ? u = [] : o > 2 && n(u[0], u[1], u[2]) && (u = [u[0]]), t(i, e(u, 1), []);
  });
  return Sf = a, Sf;
}
var bD = mD();
const zp = /* @__PURE__ */ ye(bD);
function si(e) {
  "@babel/helpers - typeof";
  return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, si(e);
}
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
function yD(e, t) {
  return TD(e) || ED(e, t) || vD(e, t) || gD();
}
function gD() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function vD(e, t) {
  if (e) {
    if (typeof e == "string") return Dg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Dg(e, t);
  }
}
function Dg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function ED(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function TD(e) {
  if (Array.isArray(e)) return e;
}
function Mg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Mg(Object(r), !0).forEach(function(n) {
      _D(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Mg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _D(e, t, r) {
  return t = AD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function AD(e) {
  var t = OD(e, "string");
  return si(t) == "symbol" ? t : t + "";
}
function OD(e, t) {
  if (si(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (si(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function SD(e) {
  return Array.isArray(e) && $e(e[0]) && $e(e[1]) ? e.join(" ~ ") : e;
}
var xD = function(t) {
  var r = t.separator, n = r === void 0 ? " : " : r, a = t.contentStyle, i = a === void 0 ? {} : a, u = t.itemStyle, o = u === void 0 ? {} : u, s = t.labelStyle, c = s === void 0 ? {} : s, l = t.payload, f = t.formatter, h = t.itemSorter, p = t.wrapperClassName, y = t.labelClassName, b = t.label, m = t.labelFormatter, E = t.accessibilityLayer, g = E === void 0 ? !1 : E, _ = function() {
    if (l && l.length) {
      var R = {
        padding: 0,
        margin: 0
      }, L = (h ? zp(l, h) : l).map(function(F, j) {
        if (F.type === "none")
          return null;
        var U = xf({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: F.color || "#000"
        }, o), q = F.formatter || f || SD, K = F.value, V = F.name, J = K, te = V;
        if (q && J != null && te != null) {
          var Q = q(K, V, F, j, l);
          if (Array.isArray(Q)) {
            var re = yD(Q, 2);
            J = re[0], te = re[1];
          } else
            J = Q;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ C.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(j),
            style: U
          }, $e(te) ? /* @__PURE__ */ C.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, te) : null, $e(te) ? /* @__PURE__ */ C.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, n) : null, /* @__PURE__ */ C.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, J), /* @__PURE__ */ C.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, F.unit || ""))
        );
      });
      return /* @__PURE__ */ C.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: R
      }, L);
    }
    return null;
  }, A = xf({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, i), v = xf({
    margin: 0
  }, c), T = !ce(b), S = T ? b : "", I = se("recharts-default-tooltip", p), N = se("recharts-tooltip-label", y);
  T && m && l !== void 0 && l !== null && (S = m(b, l));
  var k = g ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ C.createElement("div", rh({
    className: I,
    style: A
  }, k), /* @__PURE__ */ C.createElement("p", {
    className: N,
    style: v
  }, /* @__PURE__ */ C.isValidElement(S) ? S : "".concat(S)), _());
};
function ci(e) {
  "@babel/helpers - typeof";
  return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ci(e);
}
function ou(e, t, r) {
  return t = wD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wD(e) {
  var t = PD(e, "string");
  return ci(t) == "symbol" ? t : t + "";
}
function PD(e, t) {
  if (ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ca = "recharts-tooltip-wrapper", ID = {
  visibility: "hidden"
};
function CD(e) {
  var t = e.coordinate, r = e.translateX, n = e.translateY;
  return se(Ca, ou(ou(ou(ou({}, "".concat(Ca, "-right"), z(r) && t && z(t.x) && r >= t.x), "".concat(Ca, "-left"), z(r) && t && z(t.x) && r < t.x), "".concat(Ca, "-bottom"), z(n) && t && z(t.y) && n >= t.y), "".concat(Ca, "-top"), z(n) && t && z(t.y) && n < t.y));
}
function Lg(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.key, a = e.offsetTopLeft, i = e.position, u = e.reverseDirection, o = e.tooltipDimension, s = e.viewBox, c = e.viewBoxDimension;
  if (i && z(i[n]))
    return i[n];
  var l = r[n] - o - a, f = r[n] + a;
  if (t[n])
    return u[n] ? l : f;
  if (u[n]) {
    var h = l, p = s[n];
    return h < p ? Math.max(f, s[n]) : Math.max(l, s[n]);
  }
  var y = f + o, b = s[n] + c;
  return y > b ? Math.max(l, s[n]) : Math.max(f, s[n]);
}
function ND(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function RD(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTopLeft, a = e.position, i = e.reverseDirection, u = e.tooltipBox, o = e.useTranslate3d, s = e.viewBox, c, l, f;
  return u.height > 0 && u.width > 0 && r ? (l = Lg({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: u.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), f = Lg({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: u.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), c = ND({
    translateX: l,
    translateY: f,
    useTranslate3d: o
  })) : c = ID, {
    cssProperties: c,
    cssClasses: CD({
      translateX: l,
      translateY: f,
      coordinate: r
    })
  };
}
function Qn(e) {
  "@babel/helpers - typeof";
  return Qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qn(e);
}
function kg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Bg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? kg(Object(r), !0).forEach(function(n) {
      ah(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : kg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function DD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function MD(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, sA(n.key), n);
  }
}
function LD(e, t, r) {
  return t && MD(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function kD(e, t, r) {
  return t = Bu(t), BD(e, oA() ? Reflect.construct(t, r || [], Bu(e).constructor) : t.apply(e, r));
}
function BD(e, t) {
  if (t && (Qn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return jD(e);
}
function jD(e) {
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
function Bu(e) {
  return Bu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Bu(e);
}
function FD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && nh(e, t);
}
function nh(e, t) {
  return nh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, nh(e, t);
}
function ah(e, t, r) {
  return t = sA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sA(e) {
  var t = $D(e, "string");
  return Qn(t) == "symbol" ? t : t + "";
}
function $D(e, t) {
  if (Qn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Qn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var jg = 1, UD = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    DD(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = kD(this, t, [].concat(a)), ah(r, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), ah(r, "handleKeyDown", function(u) {
      if (u.key === "Escape") {
        var o, s, c, l;
        r.setState({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (o = (s = r.props.coordinate) === null || s === void 0 ? void 0 : s.x) !== null && o !== void 0 ? o : 0,
            y: (c = (l = r.props.coordinate) === null || l === void 0 ? void 0 : l.y) !== null && c !== void 0 ? c : 0
          }
        });
      }
    }), r;
  }
  return FD(t, e), LD(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        (Math.abs(n.width - this.state.lastBoundingBox.width) > jg || Math.abs(n.height - this.state.lastBoundingBox.height) > jg) && this.setState({
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
      var n = this, a = this.props, i = a.active, u = a.allowEscapeViewBox, o = a.animationDuration, s = a.animationEasing, c = a.children, l = a.coordinate, f = a.hasPayload, h = a.isAnimationActive, p = a.offset, y = a.position, b = a.reverseDirection, m = a.useTranslate3d, E = a.viewBox, g = a.wrapperStyle, _ = RD({
        allowEscapeViewBox: u,
        coordinate: l,
        offsetTopLeft: p,
        position: y,
        reverseDirection: b,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: m,
        viewBox: E
      }), A = _.cssClasses, v = _.cssProperties, T = Bg(Bg({
        transition: h && i ? "transform ".concat(o, "ms ").concat(s) : void 0
      }, v), {}, {
        pointerEvents: "none",
        visibility: !this.state.dismissed && i && f ? "visible" : "hidden",
        position: "absolute",
        top: 0,
        left: 0
      }, g);
      return (
        // This element allow listening to the `Escape` key.
        // See https://github.com/recharts/recharts/pull/2925
        /* @__PURE__ */ C.createElement("div", {
          tabIndex: -1,
          className: A,
          style: T,
          ref: function(I) {
            n.wrapperNode = I;
          }
        }, c)
      );
    }
  }]);
})(er), HD = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, _a = {
  isSsr: HD()
};
function Zn(e) {
  "@babel/helpers - typeof";
  return Zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Zn(e);
}
function Fg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $g(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fg(Object(r), !0).forEach(function(n) {
      Gp(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function WD(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, lA(n.key), n);
  }
}
function YD(e, t, r) {
  return t && WD(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function zD(e, t, r) {
  return t = ju(t), GD(e, cA() ? Reflect.construct(t, r || [], ju(e).constructor) : t.apply(e, r));
}
function GD(e, t) {
  if (t && (Zn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return KD(e);
}
function KD(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function cA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (cA = function() {
    return !!e;
  })();
}
function ju(e) {
  return ju = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ju(e);
}
function VD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ih(e, t);
}
function ih(e, t) {
  return ih = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ih(e, t);
}
function Gp(e, t, r) {
  return t = lA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function lA(e) {
  var t = XD(e, "string");
  return Zn(t) == "symbol" ? t : t + "";
}
function XD(e, t) {
  if (Zn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Zn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function QD(e) {
  return e.dataKey;
}
function ZD(e, t) {
  return /* @__PURE__ */ C.isValidElement(e) ? /* @__PURE__ */ C.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ C.createElement(e, t) : /* @__PURE__ */ C.createElement(xD, t);
}
var ft = /* @__PURE__ */ (function(e) {
  function t() {
    return qD(this, t), zD(this, t, arguments);
  }
  return VD(t, e), YD(t, [{
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.active, u = a.allowEscapeViewBox, o = a.animationDuration, s = a.animationEasing, c = a.content, l = a.coordinate, f = a.filterNull, h = a.isAnimationActive, p = a.offset, y = a.payload, b = a.payloadUniqBy, m = a.position, E = a.reverseDirection, g = a.useTranslate3d, _ = a.viewBox, A = a.wrapperStyle, v = y ?? [];
      f && v.length && (v = eA(y.filter(function(S) {
        return S.value != null && (S.hide !== !0 || n.props.includeHidden);
      }), b, QD));
      var T = v.length > 0;
      return /* @__PURE__ */ C.createElement(UD, {
        allowEscapeViewBox: u,
        animationDuration: o,
        animationEasing: s,
        isAnimationActive: h,
        active: i,
        coordinate: l,
        hasPayload: T,
        offset: p,
        position: m,
        reverseDirection: E,
        useTranslate3d: g,
        viewBox: _,
        wrapperStyle: A
      }, ZD(c, $g($g({}, this.props), {}, {
        payload: v
      })));
    }
  }]);
})(er);
Gp(ft, "displayName", "Tooltip");
Gp(ft, "defaultProps", {
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
  isAnimationActive: !_a.isSsr,
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
var wf, Ug;
function JD() {
  if (Ug) return wf;
  Ug = 1;
  var e = tr(), t = function() {
    return e.Date.now();
  };
  return wf = t, wf;
}
var Pf, Hg;
function e6() {
  if (Hg) return Pf;
  Hg = 1;
  var e = /\s/;
  function t(r) {
    for (var n = r.length; n-- && e.test(r.charAt(n)); )
      ;
    return n;
  }
  return Pf = t, Pf;
}
var If, qg;
function t6() {
  if (qg) return If;
  qg = 1;
  var e = e6(), t = /^\s+/;
  function r(n) {
    return n && n.slice(0, e(n) + 1).replace(t, "");
  }
  return If = r, If;
}
var Cf, Wg;
function fA() {
  if (Wg) return Cf;
  Wg = 1;
  var e = t6(), t = Ur(), r = va(), n = NaN, a = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, u = /^0o[0-7]+$/i, o = parseInt;
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
    return f || u.test(c) ? o(c.slice(2), f ? 2 : 8) : a.test(c) ? n : +c;
  }
  return Cf = s, Cf;
}
var Nf, Yg;
function r6() {
  if (Yg) return Nf;
  Yg = 1;
  var e = Ur(), t = JD(), r = fA(), n = "Expected a function", a = Math.max, i = Math.min;
  function u(o, s, c) {
    var l, f, h, p, y, b, m = 0, E = !1, g = !1, _ = !0;
    if (typeof o != "function")
      throw new TypeError(n);
    s = r(s) || 0, e(c) && (E = !!c.leading, g = "maxWait" in c, h = g ? a(r(c.maxWait) || 0, s) : h, _ = "trailing" in c ? !!c.trailing : _);
    function A(L) {
      var F = l, j = f;
      return l = f = void 0, m = L, p = o.apply(j, F), p;
    }
    function v(L) {
      return m = L, y = setTimeout(I, s), E ? A(L) : p;
    }
    function T(L) {
      var F = L - b, j = L - m, U = s - F;
      return g ? i(U, h - j) : U;
    }
    function S(L) {
      var F = L - b, j = L - m;
      return b === void 0 || F >= s || F < 0 || g && j >= h;
    }
    function I() {
      var L = t();
      if (S(L))
        return N(L);
      y = setTimeout(I, T(L));
    }
    function N(L) {
      return y = void 0, _ && l ? A(L) : (l = f = void 0, p);
    }
    function k() {
      y !== void 0 && clearTimeout(y), m = 0, l = b = f = y = void 0;
    }
    function D() {
      return y === void 0 ? p : N(t());
    }
    function R() {
      var L = t(), F = S(L);
      if (l = arguments, f = this, b = L, F) {
        if (y === void 0)
          return v(b);
        if (g)
          return clearTimeout(y), y = setTimeout(I, s), A(b);
      }
      return y === void 0 && (y = setTimeout(I, s)), p;
    }
    return R.cancel = k, R.flush = D, R;
  }
  return Nf = u, Nf;
}
var Rf, zg;
function n6() {
  if (zg) return Rf;
  zg = 1;
  var e = r6(), t = Ur(), r = "Expected a function";
  function n(a, i, u) {
    var o = !0, s = !0;
    if (typeof a != "function")
      throw new TypeError(r);
    return t(u) && (o = "leading" in u ? !!u.leading : o, s = "trailing" in u ? !!u.trailing : s), e(a, i, {
      leading: o,
      maxWait: i,
      trailing: s
    });
  }
  return Rf = n, Rf;
}
var a6 = n6();
const dA = /* @__PURE__ */ ye(a6);
function li(e) {
  "@babel/helpers - typeof";
  return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, li(e);
}
function Gg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function su(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gg(Object(r), !0).forEach(function(n) {
      i6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function i6(e, t, r) {
  return t = u6(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function u6(e) {
  var t = o6(e, "string");
  return li(t) == "symbol" ? t : t + "";
}
function o6(e, t) {
  if (li(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function s6(e, t) {
  return d6(e) || f6(e, t) || l6(e, t) || c6();
}
function c6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function l6(e, t) {
  if (e) {
    if (typeof e == "string") return Kg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Kg(e, t);
  }
}
function Kg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function f6(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function d6(e) {
  if (Array.isArray(e)) return e;
}
var Ki = /* @__PURE__ */ dT(function(e, t) {
  var r = e.aspect, n = e.initialDimension, a = n === void 0 ? {
    width: -1,
    height: -1
  } : n, i = e.width, u = i === void 0 ? "100%" : i, o = e.height, s = o === void 0 ? "100%" : o, c = e.minWidth, l = c === void 0 ? 0 : c, f = e.minHeight, h = e.maxHeight, p = e.children, y = e.debounce, b = y === void 0 ? 0 : y, m = e.id, E = e.className, g = e.onResize, _ = e.style, A = _ === void 0 ? {} : _, v = ri(null), T = ri();
  T.current = g, NS(t, function() {
    return Object.defineProperty(v.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), v.current;
      },
      configurable: !0
    });
  });
  var S = at({
    containerWidth: a.width,
    containerHeight: a.height
  }), I = s6(S, 2), N = I[0], k = I[1], D = RS(function(L, F) {
    k(function(j) {
      var U = Math.round(L), q = Math.round(F);
      return j.containerWidth === U && j.containerHeight === q ? j : {
        containerWidth: U,
        containerHeight: q
      };
    });
  }, []);
  pt(function() {
    var L = function(V) {
      var J, te = V[0].contentRect, Q = te.width, re = te.height;
      D(Q, re), (J = T.current) === null || J === void 0 || J.call(T, Q, re);
    };
    b > 0 && (L = dA(L, b, {
      trailing: !0,
      leading: !1
    }));
    var F = new ResizeObserver(L), j = v.current.getBoundingClientRect(), U = j.width, q = j.height;
    return D(U, q), F.observe(v.current), function() {
      F.disconnect();
    };
  }, [D, b]);
  var R = Dr(function() {
    var L = N.containerWidth, F = N.containerHeight;
    if (L < 0 || F < 0)
      return null;
    Ut(tn(u) || tn(s), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, u, s), Ut(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var j = tn(u) ? L : u, U = tn(s) ? F : s;
    r && r > 0 && (j ? U = j / r : U && (j = U * r), h && U > h && (U = h)), Ut(j > 0 || U > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, j, U, u, s, l, f, r);
    var q = !Array.isArray(p) && hr(p.type).endsWith("Chart");
    return C.Children.map(p, function(K) {
      return /* @__PURE__ */ C.isValidElement(K) ? /* @__PURE__ */ De(K, su({
        width: j,
        height: U
      }, q ? {
        style: su({
          height: "100%",
          width: "100%",
          maxHeight: U,
          maxWidth: j
        }, K.props.style)
      } : {})) : K;
    });
  }, [r, p, s, h, f, l, N, u]);
  return /* @__PURE__ */ C.createElement("div", {
    id: m ? "".concat(m) : void 0,
    className: se("recharts-responsive-container", E),
    style: su(su({}, A), {}, {
      width: u,
      height: s,
      minWidth: l,
      minHeight: f,
      maxHeight: h
    }),
    ref: v
  }, R);
}), Go = function(t) {
  return null;
};
Go.displayName = "Cell";
function fi(e) {
  "@babel/helpers - typeof";
  return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fi(e);
}
function Vg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function uh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vg(Object(r), !0).forEach(function(n) {
      h6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function h6(e, t, r) {
  return t = p6(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function p6(e) {
  var t = m6(e, "string");
  return fi(t) == "symbol" ? t : t + "";
}
function m6(e, t) {
  if (fi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Pn = {
  widthCache: {},
  cacheCount: 0
}, b6 = 2e3, y6 = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, Xg = "recharts_measurement_span";
function g6(e) {
  var t = uh({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r];
  }), t;
}
var Va = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || _a.isSsr)
    return {
      width: 0,
      height: 0
    };
  var n = g6(r), a = JSON.stringify({
    text: t,
    copyStyle: n
  });
  if (Pn.widthCache[a])
    return Pn.widthCache[a];
  try {
    var i = document.getElementById(Xg);
    i || (i = document.createElement("span"), i.setAttribute("id", Xg), i.setAttribute("aria-hidden", "true"), document.body.appendChild(i));
    var u = uh(uh({}, y6), n);
    Object.assign(i.style, u), i.textContent = "".concat(t);
    var o = i.getBoundingClientRect(), s = {
      width: o.width,
      height: o.height
    };
    return Pn.widthCache[a] = s, ++Pn.cacheCount > b6 && (Pn.cacheCount = 0, Pn.widthCache = {}), s;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, v6 = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function di(e) {
  "@babel/helpers - typeof";
  return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, di(e);
}
function Fu(e, t) {
  return A6(e) || _6(e, t) || T6(e, t) || E6();
}
function E6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function T6(e, t) {
  if (e) {
    if (typeof e == "string") return Qg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Qg(e, t);
  }
}
function Qg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function _6(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function A6(e) {
  if (Array.isArray(e)) return e;
}
function O6(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Zg(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, x6(n.key), n);
  }
}
function S6(e, t, r) {
  return t && Zg(e.prototype, t), r && Zg(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function x6(e) {
  var t = w6(e, "string");
  return di(t) == "symbol" ? t : t + "";
}
function w6(e, t) {
  if (di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Jg = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, ev = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, P6 = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, I6 = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, hA = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, C6 = Object.keys(hA), kn = "NaN";
function N6(e, t) {
  return e * hA[t];
}
var cu = /* @__PURE__ */ (function() {
  function e(t, r) {
    O6(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !P6.test(r) && (this.num = NaN, this.unit = ""), C6.includes(r) && (this.num = N6(t, r), this.unit = "px");
  }
  return S6(e, [{
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
      var n, a = (n = I6.exec(r)) !== null && n !== void 0 ? n : [], i = Fu(a, 3), u = i[1], o = i[2];
      return new e(parseFloat(u), o ?? "");
    }
  }]);
})();
function pA(e) {
  if (e.includes(kn))
    return kn;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = Jg.exec(t)) !== null && r !== void 0 ? r : [], a = Fu(n, 4), i = a[1], u = a[2], o = a[3], s = cu.parse(i ?? ""), c = cu.parse(o ?? ""), l = u === "*" ? s.multiply(c) : s.divide(c);
    if (l.isNaN())
      return kn;
    t = t.replace(Jg, l.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var f, h = (f = ev.exec(t)) !== null && f !== void 0 ? f : [], p = Fu(h, 4), y = p[1], b = p[2], m = p[3], E = cu.parse(y ?? ""), g = cu.parse(m ?? ""), _ = b === "+" ? E.add(g) : E.subtract(g);
    if (_.isNaN())
      return kn;
    t = t.replace(ev, _.toString());
  }
  return t;
}
var tv = /\(([^()]*)\)/;
function R6(e) {
  for (var t = e; t.includes("("); ) {
    var r = tv.exec(t), n = Fu(r, 2), a = n[1];
    t = t.replace(tv, pA(a));
  }
  return t;
}
function D6(e) {
  var t = e.replace(/\s+/g, "");
  return t = R6(t), t = pA(t), t;
}
function M6(e) {
  try {
    return D6(e);
  } catch {
    return kn;
  }
}
function Df(e) {
  var t = M6(e.slice(5, -1));
  return t === kn ? "" : t;
}
var L6 = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], k6 = ["dx", "dy", "angle", "className", "breakAll"];
function oh() {
  return oh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, oh.apply(this, arguments);
}
function rv(e, t) {
  if (e == null) return {};
  var r = B6(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function B6(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function nv(e, t) {
  return U6(e) || $6(e, t) || F6(e, t) || j6();
}
function j6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function F6(e, t) {
  if (e) {
    if (typeof e == "string") return av(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return av(e, t);
  }
}
function av(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function $6(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function U6(e) {
  if (Array.isArray(e)) return e;
}
var mA = /[ \f\n\r\t\v\u2028\u2029]+/, bA = function(t) {
  var r = t.children, n = t.breakAll, a = t.style;
  try {
    var i = [];
    ce(r) || (n ? i = r.toString().split("") : i = r.toString().split(mA));
    var u = i.map(function(s) {
      return {
        word: s,
        width: Va(s, a).width
      };
    }), o = n ? 0 : Va(" ", a).width;
    return {
      wordsWithComputedWidth: u,
      spaceWidth: o
    };
  } catch {
    return null;
  }
}, H6 = function(t, r, n, a, i) {
  var u = t.maxLines, o = t.children, s = t.style, c = t.breakAll, l = z(u), f = o, h = function() {
    var j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return j.reduce(function(U, q) {
      var K = q.word, V = q.width, J = U[U.length - 1];
      if (J && (a == null || i || J.width + V + n < Number(a)))
        J.words.push(K), J.width += V + n;
      else {
        var te = {
          words: [K],
          width: V
        };
        U.push(te);
      }
      return U;
    }, []);
  }, p = h(r), y = function(j) {
    return j.reduce(function(U, q) {
      return U.width > q.width ? U : q;
    });
  };
  if (!l)
    return p;
  for (var b = "…", m = function(j) {
    var U = f.slice(0, j), q = bA({
      breakAll: c,
      style: s,
      children: U + b
    }).wordsWithComputedWidth, K = h(q), V = K.length > u || y(K).width > Number(a);
    return [V, K];
  }, E = 0, g = f.length - 1, _ = 0, A; E <= g && _ <= f.length - 1; ) {
    var v = Math.floor((E + g) / 2), T = v - 1, S = m(T), I = nv(S, 2), N = I[0], k = I[1], D = m(v), R = nv(D, 1), L = R[0];
    if (!N && !L && (E = v + 1), N && L && (g = v - 1), !N && L) {
      A = k;
      break;
    }
    _++;
  }
  return A || p;
}, iv = function(t) {
  var r = ce(t) ? [] : t.toString().split(mA);
  return [{
    words: r
  }];
}, q6 = function(t) {
  var r = t.width, n = t.scaleToFit, a = t.children, i = t.style, u = t.breakAll, o = t.maxLines;
  if ((r || n) && !_a.isSsr) {
    var s, c, l = bA({
      breakAll: u,
      children: a,
      style: i
    });
    if (l) {
      var f = l.wordsWithComputedWidth, h = l.spaceWidth;
      s = f, c = h;
    } else
      return iv(a);
    return H6({
      breakAll: u,
      children: a,
      maxLines: o,
      style: i
    }, s, c, r, n);
  }
  return iv(a);
}, uv = "#808080", pn = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, u = t.lineHeight, o = u === void 0 ? "1em" : u, s = t.capHeight, c = s === void 0 ? "0.71em" : s, l = t.scaleToFit, f = l === void 0 ? !1 : l, h = t.textAnchor, p = h === void 0 ? "start" : h, y = t.verticalAnchor, b = y === void 0 ? "end" : y, m = t.fill, E = m === void 0 ? uv : m, g = rv(t, L6), _ = Dr(function() {
    return q6({
      breakAll: g.breakAll,
      children: g.children,
      maxLines: g.maxLines,
      scaleToFit: f,
      style: g.style,
      width: g.width
    });
  }, [g.breakAll, g.children, g.maxLines, f, g.style, g.width]), A = g.dx, v = g.dy, T = g.angle, S = g.className, I = g.breakAll, N = rv(g, k6);
  if (!$e(n) || !$e(i))
    return null;
  var k = n + (z(A) ? A : 0), D = i + (z(v) ? v : 0), R;
  switch (b) {
    case "start":
      R = Df("calc(".concat(c, ")"));
      break;
    case "middle":
      R = Df("calc(".concat((_.length - 1) / 2, " * -").concat(o, " + (").concat(c, " / 2))"));
      break;
    default:
      R = Df("calc(".concat(_.length - 1, " * -").concat(o, ")"));
      break;
  }
  var L = [];
  if (f) {
    var F = _[0].width, j = g.width;
    L.push("scale(".concat((z(j) ? j / F : 1) / F, ")"));
  }
  return T && L.push("rotate(".concat(T, ", ").concat(k, ", ").concat(D, ")")), L.length && (N.transform = L.join(" ")), /* @__PURE__ */ C.createElement("text", oh({}, ne(N, !0), {
    x: k,
    y: D,
    className: se("recharts-text", S),
    textAnchor: p,
    fill: E.includes("url") ? uv : E
  }), _.map(function(U, q) {
    var K = U.words.join(I ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ C.createElement("tspan", {
        x: k,
        dy: q === 0 ? R : o,
        key: "".concat(K, "-").concat(q)
      }, K)
    );
  }));
};
function Br(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function W6(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Kp(e) {
  let t, r, n;
  e.length !== 2 ? (t = Br, r = (o, s) => Br(e(o), s), n = (o, s) => e(o) - s) : (t = e === Br || e === W6 ? e : Y6, r = e, n = e);
  function a(o, s, c = 0, l = o.length) {
    if (c < l) {
      if (t(s, s) !== 0) return l;
      do {
        const f = c + l >>> 1;
        r(o[f], s) < 0 ? c = f + 1 : l = f;
      } while (c < l);
    }
    return c;
  }
  function i(o, s, c = 0, l = o.length) {
    if (c < l) {
      if (t(s, s) !== 0) return l;
      do {
        const f = c + l >>> 1;
        r(o[f], s) <= 0 ? c = f + 1 : l = f;
      } while (c < l);
    }
    return c;
  }
  function u(o, s, c = 0, l = o.length) {
    const f = a(o, s, c, l - 1);
    return f > c && n(o[f - 1], s) > -n(o[f], s) ? f - 1 : f;
  }
  return { left: a, center: u, right: i };
}
function Y6() {
  return 0;
}
function yA(e) {
  return e === null ? NaN : +e;
}
function* z6(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const G6 = Kp(Br), Vi = G6.right;
Kp(yA).center;
class ov extends Map {
  constructor(t, r = X6) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, a] of t) this.set(n, a);
  }
  get(t) {
    return super.get(sv(this, t));
  }
  has(t) {
    return super.has(sv(this, t));
  }
  set(t, r) {
    return super.set(K6(this, t), r);
  }
  delete(t) {
    return super.delete(V6(this, t));
  }
}
function sv({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function K6({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function V6({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function X6(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function Q6(e = Br) {
  if (e === Br) return gA;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function gA(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const Z6 = Math.sqrt(50), J6 = Math.sqrt(10), eM = Math.sqrt(2);
function $u(e, t, r) {
  const n = (t - e) / Math.max(0, r), a = Math.floor(Math.log10(n)), i = n / Math.pow(10, a), u = i >= Z6 ? 10 : i >= J6 ? 5 : i >= eM ? 2 : 1;
  let o, s, c;
  return a < 0 ? (c = Math.pow(10, -a) / u, o = Math.round(e * c), s = Math.round(t * c), o / c < e && ++o, s / c > t && --s, c = -c) : (c = Math.pow(10, a) * u, o = Math.round(e / c), s = Math.round(t / c), o * c < e && ++o, s * c > t && --s), s < o && 0.5 <= r && r < 2 ? $u(e, t, r * 2) : [o, s, c];
}
function sh(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [a, i, u] = n ? $u(t, e, r) : $u(e, t, r);
  if (!(i >= a)) return [];
  const o = i - a + 1, s = new Array(o);
  if (n)
    if (u < 0) for (let c = 0; c < o; ++c) s[c] = (i - c) / -u;
    else for (let c = 0; c < o; ++c) s[c] = (i - c) * u;
  else if (u < 0) for (let c = 0; c < o; ++c) s[c] = (a + c) / -u;
  else for (let c = 0; c < o; ++c) s[c] = (a + c) * u;
  return s;
}
function ch(e, t, r) {
  return t = +t, e = +e, r = +r, $u(e, t, r)[2];
}
function lh(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, a = n ? ch(t, e, r) : ch(e, t, r);
  return (n ? -1 : 1) * (a < 0 ? 1 / -a : a);
}
function cv(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function lv(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function vA(e, t, r = 0, n = 1 / 0, a) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (a = a === void 0 ? gA : Q6(a); n > r; ) {
    if (n - r > 600) {
      const s = n - r + 1, c = t - r + 1, l = Math.log(s), f = 0.5 * Math.exp(2 * l / 3), h = 0.5 * Math.sqrt(l * f * (s - f) / s) * (c - s / 2 < 0 ? -1 : 1), p = Math.max(r, Math.floor(t - c * f / s + h)), y = Math.min(n, Math.floor(t + (s - c) * f / s + h));
      vA(e, t, p, y, a);
    }
    const i = e[t];
    let u = r, o = n;
    for (Na(e, r, t), a(e[n], i) > 0 && Na(e, r, n); u < o; ) {
      for (Na(e, u, o), ++u, --o; a(e[u], i) < 0; ) ++u;
      for (; a(e[o], i) > 0; ) --o;
    }
    a(e[r], i) === 0 ? Na(e, r, o) : (++o, Na(e, o, n)), o <= t && (r = o + 1), t <= o && (n = o - 1);
  }
  return e;
}
function Na(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function tM(e, t, r) {
  if (e = Float64Array.from(z6(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return lv(e);
    if (t >= 1) return cv(e);
    var n, a = (n - 1) * t, i = Math.floor(a), u = cv(vA(e, i).subarray(0, i + 1)), o = lv(e.subarray(i + 1));
    return u + (o - u) * (a - i);
  }
}
function rM(e, t, r = yA) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, a = (n - 1) * t, i = Math.floor(a), u = +r(e[i], i, e), o = +r(e[i + 1], i + 1, e);
    return u + (o - u) * (a - i);
  }
}
function nM(e, t, r) {
  e = +e, t = +t, r = (a = arguments.length) < 2 ? (t = e, e = 0, 1) : a < 3 ? 1 : +r;
  for (var n = -1, a = Math.max(0, Math.ceil((t - e) / r)) | 0, i = new Array(a); ++n < a; )
    i[n] = e + n * r;
  return i;
}
function kt(e, t) {
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
function _r(e, t) {
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
const fh = /* @__PURE__ */ Symbol("implicit");
function Vp() {
  var e = new ov(), t = [], r = [], n = fh;
  function a(i) {
    let u = e.get(i);
    if (u === void 0) {
      if (n !== fh) return n;
      e.set(i, u = t.push(i) - 1);
    }
    return r[u % r.length];
  }
  return a.domain = function(i) {
    if (!arguments.length) return t.slice();
    t = [], e = new ov();
    for (const u of i)
      e.has(u) || e.set(u, t.push(u) - 1);
    return a;
  }, a.range = function(i) {
    return arguments.length ? (r = Array.from(i), a) : r.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return Vp(t, r).unknown(n);
  }, kt.apply(a, arguments), a;
}
function hi() {
  var e = Vp().unknown(void 0), t = e.domain, r = e.range, n = 0, a = 1, i, u, o = !1, s = 0, c = 0, l = 0.5;
  delete e.unknown;
  function f() {
    var h = t().length, p = a < n, y = p ? a : n, b = p ? n : a;
    i = (b - y) / Math.max(1, h - s + c * 2), o && (i = Math.floor(i)), y += (b - y - i * (h - s)) * l, u = i * (1 - s), o && (y = Math.round(y), u = Math.round(u));
    var m = nM(h).map(function(E) {
      return y + i * E;
    });
    return r(p ? m.reverse() : m);
  }
  return e.domain = function(h) {
    return arguments.length ? (t(h), f()) : t();
  }, e.range = function(h) {
    return arguments.length ? ([n, a] = h, n = +n, a = +a, f()) : [n, a];
  }, e.rangeRound = function(h) {
    return [n, a] = h, n = +n, a = +a, o = !0, f();
  }, e.bandwidth = function() {
    return u;
  }, e.step = function() {
    return i;
  }, e.round = function(h) {
    return arguments.length ? (o = !!h, f()) : o;
  }, e.padding = function(h) {
    return arguments.length ? (s = Math.min(1, c = +h), f()) : s;
  }, e.paddingInner = function(h) {
    return arguments.length ? (s = Math.min(1, h), f()) : s;
  }, e.paddingOuter = function(h) {
    return arguments.length ? (c = +h, f()) : c;
  }, e.align = function(h) {
    return arguments.length ? (l = Math.max(0, Math.min(1, h)), f()) : l;
  }, e.copy = function() {
    return hi(t(), [n, a]).round(o).paddingInner(s).paddingOuter(c).align(l);
  }, kt.apply(f(), arguments);
}
function EA(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return EA(t());
  }, e;
}
function Xa() {
  return EA(hi.apply(null, arguments).paddingInner(1));
}
function Xp(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function TA(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Xi() {
}
var pi = 0.7, Uu = 1 / pi, qn = "\\s*([+-]?\\d+)\\s*", mi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Qt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", aM = /^#([0-9a-f]{3,8})$/, iM = new RegExp(`^rgb\\(${qn},${qn},${qn}\\)$`), uM = new RegExp(`^rgb\\(${Qt},${Qt},${Qt}\\)$`), oM = new RegExp(`^rgba\\(${qn},${qn},${qn},${mi}\\)$`), sM = new RegExp(`^rgba\\(${Qt},${Qt},${Qt},${mi}\\)$`), cM = new RegExp(`^hsl\\(${mi},${Qt},${Qt}\\)$`), lM = new RegExp(`^hsla\\(${mi},${Qt},${Qt},${mi}\\)$`), fv = {
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
Xp(Xi, bi, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: dv,
  // Deprecated! Use color.formatHex.
  formatHex: dv,
  formatHex8: fM,
  formatHsl: dM,
  formatRgb: hv,
  toString: hv
});
function dv() {
  return this.rgb().formatHex();
}
function fM() {
  return this.rgb().formatHex8();
}
function dM() {
  return _A(this).formatHsl();
}
function hv() {
  return this.rgb().formatRgb();
}
function bi(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = aM.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? pv(t) : r === 3 ? new ht(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? lu(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? lu(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = iM.exec(e)) ? new ht(t[1], t[2], t[3], 1) : (t = uM.exec(e)) ? new ht(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = oM.exec(e)) ? lu(t[1], t[2], t[3], t[4]) : (t = sM.exec(e)) ? lu(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = cM.exec(e)) ? yv(t[1], t[2] / 100, t[3] / 100, 1) : (t = lM.exec(e)) ? yv(t[1], t[2] / 100, t[3] / 100, t[4]) : fv.hasOwnProperty(e) ? pv(fv[e]) : e === "transparent" ? new ht(NaN, NaN, NaN, 0) : null;
}
function pv(e) {
  return new ht(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function lu(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new ht(e, t, r, n);
}
function hM(e) {
  return e instanceof Xi || (e = bi(e)), e ? (e = e.rgb(), new ht(e.r, e.g, e.b, e.opacity)) : new ht();
}
function dh(e, t, r, n) {
  return arguments.length === 1 ? hM(e) : new ht(e, t, r, n ?? 1);
}
function ht(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
Xp(ht, dh, TA(Xi, {
  brighter(e) {
    return e = e == null ? Uu : Math.pow(Uu, e), new ht(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? pi : Math.pow(pi, e), new ht(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ht(sn(this.r), sn(this.g), sn(this.b), Hu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: mv,
  // Deprecated! Use color.formatHex.
  formatHex: mv,
  formatHex8: pM,
  formatRgb: bv,
  toString: bv
}));
function mv() {
  return `#${rn(this.r)}${rn(this.g)}${rn(this.b)}`;
}
function pM() {
  return `#${rn(this.r)}${rn(this.g)}${rn(this.b)}${rn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function bv() {
  const e = Hu(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${sn(this.r)}, ${sn(this.g)}, ${sn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Hu(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function sn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function rn(e) {
  return e = sn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function yv(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ft(e, t, r, n);
}
function _A(e) {
  if (e instanceof Ft) return new Ft(e.h, e.s, e.l, e.opacity);
  if (e instanceof Xi || (e = bi(e)), !e) return new Ft();
  if (e instanceof Ft) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, a = Math.min(t, r, n), i = Math.max(t, r, n), u = NaN, o = i - a, s = (i + a) / 2;
  return o ? (t === i ? u = (r - n) / o + (r < n) * 6 : r === i ? u = (n - t) / o + 2 : u = (t - r) / o + 4, o /= s < 0.5 ? i + a : 2 - i - a, u *= 60) : o = s > 0 && s < 1 ? 0 : u, new Ft(u, o, s, e.opacity);
}
function mM(e, t, r, n) {
  return arguments.length === 1 ? _A(e) : new Ft(e, t, r, n ?? 1);
}
function Ft(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
Xp(Ft, mM, TA(Xi, {
  brighter(e) {
    return e = e == null ? Uu : Math.pow(Uu, e), new Ft(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? pi : Math.pow(pi, e), new Ft(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, a = 2 * r - n;
    return new ht(
      Mf(e >= 240 ? e - 240 : e + 120, a, n),
      Mf(e, a, n),
      Mf(e < 120 ? e + 240 : e - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new Ft(gv(this.h), fu(this.s), fu(this.l), Hu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Hu(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${gv(this.h)}, ${fu(this.s) * 100}%, ${fu(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function gv(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function fu(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Mf(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const Qp = (e) => () => e;
function bM(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function yM(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function gM(e) {
  return (e = +e) == 1 ? AA : function(t, r) {
    return r - t ? yM(t, r, e) : Qp(isNaN(t) ? r : t);
  };
}
function AA(e, t) {
  var r = t - e;
  return r ? bM(e, r) : Qp(isNaN(e) ? t : e);
}
const vv = (function e(t) {
  var r = gM(t);
  function n(a, i) {
    var u = r((a = dh(a)).r, (i = dh(i)).r), o = r(a.g, i.g), s = r(a.b, i.b), c = AA(a.opacity, i.opacity);
    return function(l) {
      return a.r = u(l), a.g = o(l), a.b = s(l), a.opacity = c(l), a + "";
    };
  }
  return n.gamma = e, n;
})(1);
function vM(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), a;
  return function(i) {
    for (a = 0; a < r; ++a) n[a] = e[a] * (1 - i) + t[a] * i;
    return n;
  };
}
function EM(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function TM(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, a = new Array(n), i = new Array(r), u;
  for (u = 0; u < n; ++u) a[u] = Aa(e[u], t[u]);
  for (; u < r; ++u) i[u] = t[u];
  return function(o) {
    for (u = 0; u < n; ++u) i[u] = a[u](o);
    return i;
  };
}
function _M(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function qu(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function AM(e, t) {
  var r = {}, n = {}, a;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in e ? r[a] = Aa(e[a], t[a]) : n[a] = t[a];
  return function(i) {
    for (a in r) n[a] = r[a](i);
    return n;
  };
}
var hh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Lf = new RegExp(hh.source, "g");
function OM(e) {
  return function() {
    return e;
  };
}
function SM(e) {
  return function(t) {
    return e(t) + "";
  };
}
function xM(e, t) {
  var r = hh.lastIndex = Lf.lastIndex = 0, n, a, i, u = -1, o = [], s = [];
  for (e = e + "", t = t + ""; (n = hh.exec(e)) && (a = Lf.exec(t)); )
    (i = a.index) > r && (i = t.slice(r, i), o[u] ? o[u] += i : o[++u] = i), (n = n[0]) === (a = a[0]) ? o[u] ? o[u] += a : o[++u] = a : (o[++u] = null, s.push({ i: u, x: qu(n, a) })), r = Lf.lastIndex;
  return r < t.length && (i = t.slice(r), o[u] ? o[u] += i : o[++u] = i), o.length < 2 ? s[0] ? SM(s[0].x) : OM(t) : (t = s.length, function(c) {
    for (var l = 0, f; l < t; ++l) o[(f = s[l]).i] = f.x(c);
    return o.join("");
  });
}
function Aa(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? Qp(t) : (r === "number" ? qu : r === "string" ? (n = bi(t)) ? (t = n, vv) : xM : t instanceof bi ? vv : t instanceof Date ? _M : EM(t) ? vM : Array.isArray(t) ? TM : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? AM : qu)(e, t);
}
function Zp(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function wM(e, t) {
  t === void 0 && (t = e, e = Aa);
  for (var r = 0, n = t.length - 1, a = t[0], i = new Array(n < 0 ? 0 : n); r < n; ) i[r] = e(a, a = t[++r]);
  return function(u) {
    var o = Math.max(0, Math.min(n - 1, Math.floor(u *= n)));
    return i[o](u - o);
  };
}
function PM(e) {
  return function() {
    return e;
  };
}
function Wu(e) {
  return +e;
}
var Ev = [0, 1];
function ot(e) {
  return e;
}
function ph(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : PM(isNaN(t) ? NaN : 0.5);
}
function IM(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function CM(e, t, r) {
  var n = e[0], a = e[1], i = t[0], u = t[1];
  return a < n ? (n = ph(a, n), i = r(u, i)) : (n = ph(n, a), i = r(i, u)), function(o) {
    return i(n(o));
  };
}
function NM(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, a = new Array(n), i = new Array(n), u = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++u < n; )
    a[u] = ph(e[u], e[u + 1]), i[u] = r(t[u], t[u + 1]);
  return function(o) {
    var s = Vi(e, o, 1, n) - 1;
    return i[s](a[s](o));
  };
}
function Qi(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Ko() {
  var e = Ev, t = Ev, r = Aa, n, a, i, u = ot, o, s, c;
  function l() {
    var h = Math.min(e.length, t.length);
    return u !== ot && (u = IM(e[0], e[h - 1])), o = h > 2 ? NM : CM, s = c = null, f;
  }
  function f(h) {
    return h == null || isNaN(h = +h) ? i : (s || (s = o(e.map(n), t, r)))(n(u(h)));
  }
  return f.invert = function(h) {
    return u(a((c || (c = o(t, e.map(n), qu)))(h)));
  }, f.domain = function(h) {
    return arguments.length ? (e = Array.from(h, Wu), l()) : e.slice();
  }, f.range = function(h) {
    return arguments.length ? (t = Array.from(h), l()) : t.slice();
  }, f.rangeRound = function(h) {
    return t = Array.from(h), r = Zp, l();
  }, f.clamp = function(h) {
    return arguments.length ? (u = h ? !0 : ot, l()) : u !== ot;
  }, f.interpolate = function(h) {
    return arguments.length ? (r = h, l()) : r;
  }, f.unknown = function(h) {
    return arguments.length ? (i = h, f) : i;
  }, function(h, p) {
    return n = h, a = p, l();
  };
}
function Jp() {
  return Ko()(ot, ot);
}
function RM(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function Yu(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function Jn(e) {
  return e = Yu(Math.abs(e)), e ? e[1] : NaN;
}
function DM(e, t) {
  return function(r, n) {
    for (var a = r.length, i = [], u = 0, o = e[0], s = 0; a > 0 && o > 0 && (s + o + 1 > n && (o = Math.max(1, n - s)), i.push(r.substring(a -= o, a + o)), !((s += o + 1) > n)); )
      o = e[u = (u + 1) % e.length];
    return i.reverse().join(t);
  };
}
function MM(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var LM = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function yi(e) {
  if (!(t = LM.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new e0({
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
yi.prototype = e0.prototype;
function e0(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
e0.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function kM(e) {
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
var zu;
function BM(e, t) {
  var r = Yu(e, t);
  if (!r) return zu = void 0, e.toPrecision(t);
  var n = r[0], a = r[1], i = a - (zu = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, u = n.length;
  return i === u ? n : i > u ? n + new Array(i - u + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + Yu(e, Math.max(0, t + i - 1))[0];
}
function Tv(e, t) {
  var r = Yu(e, t);
  if (!r) return e + "";
  var n = r[0], a = r[1];
  return a < 0 ? "0." + new Array(-a).join("0") + n : n.length > a + 1 ? n.slice(0, a + 1) + "." + n.slice(a + 1) : n + new Array(a - n.length + 2).join("0");
}
const _v = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: RM,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Tv(e * 100, t),
  r: Tv,
  s: BM,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Av(e) {
  return e;
}
var Ov = Array.prototype.map, Sv = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function jM(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Av : DM(Ov.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", a = e.decimal === void 0 ? "." : e.decimal + "", i = e.numerals === void 0 ? Av : MM(Ov.call(e.numerals, String)), u = e.percent === void 0 ? "%" : e.percent + "", o = e.minus === void 0 ? "−" : e.minus + "", s = e.nan === void 0 ? "NaN" : e.nan + "";
  function c(f, h) {
    f = yi(f);
    var p = f.fill, y = f.align, b = f.sign, m = f.symbol, E = f.zero, g = f.width, _ = f.comma, A = f.precision, v = f.trim, T = f.type;
    T === "n" ? (_ = !0, T = "g") : _v[T] || (A === void 0 && (A = 12), v = !0, T = "g"), (E || p === "0" && y === "=") && (E = !0, p = "0", y = "=");
    var S = (h && h.prefix !== void 0 ? h.prefix : "") + (m === "$" ? r : m === "#" && /[boxX]/.test(T) ? "0" + T.toLowerCase() : ""), I = (m === "$" ? n : /[%p]/.test(T) ? u : "") + (h && h.suffix !== void 0 ? h.suffix : ""), N = _v[T], k = /[defgprs%]/.test(T);
    A = A === void 0 ? 6 : /[gprs]/.test(T) ? Math.max(1, Math.min(21, A)) : Math.max(0, Math.min(20, A));
    function D(R) {
      var L = S, F = I, j, U, q;
      if (T === "c")
        F = N(R) + F, R = "";
      else {
        R = +R;
        var K = R < 0 || 1 / R < 0;
        if (R = isNaN(R) ? s : N(Math.abs(R), A), v && (R = kM(R)), K && +R == 0 && b !== "+" && (K = !1), L = (K ? b === "(" ? b : o : b === "-" || b === "(" ? "" : b) + L, F = (T === "s" && !isNaN(R) && zu !== void 0 ? Sv[8 + zu / 3] : "") + F + (K && b === "(" ? ")" : ""), k) {
          for (j = -1, U = R.length; ++j < U; )
            if (q = R.charCodeAt(j), 48 > q || q > 57) {
              F = (q === 46 ? a + R.slice(j + 1) : R.slice(j)) + F, R = R.slice(0, j);
              break;
            }
        }
      }
      _ && !E && (R = t(R, 1 / 0));
      var V = L.length + R.length + F.length, J = V < g ? new Array(g - V + 1).join(p) : "";
      switch (_ && E && (R = t(J + R, J.length ? g - F.length : 1 / 0), J = ""), y) {
        case "<":
          R = L + R + F + J;
          break;
        case "=":
          R = L + J + R + F;
          break;
        case "^":
          R = J.slice(0, V = J.length >> 1) + L + R + F + J.slice(V);
          break;
        default:
          R = J + L + R + F;
          break;
      }
      return i(R);
    }
    return D.toString = function() {
      return f + "";
    }, D;
  }
  function l(f, h) {
    var p = Math.max(-8, Math.min(8, Math.floor(Jn(h) / 3))) * 3, y = Math.pow(10, -p), b = c((f = yi(f), f.type = "f", f), { suffix: Sv[8 + p / 3] });
    return function(m) {
      return b(y * m);
    };
  }
  return {
    format: c,
    formatPrefix: l
  };
}
var du, t0, OA;
FM({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function FM(e) {
  return du = jM(e), t0 = du.format, OA = du.formatPrefix, du;
}
function $M(e) {
  return Math.max(0, -Jn(Math.abs(e)));
}
function UM(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Jn(t) / 3))) * 3 - Jn(Math.abs(e)));
}
function HM(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Jn(t) - Jn(e)) + 1;
}
function SA(e, t, r, n) {
  var a = lh(e, t, r), i;
  switch (n = yi(n ?? ",f"), n.type) {
    case "s": {
      var u = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(i = UM(a, u)) && (n.precision = i), OA(n, u);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = HM(a, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = i - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = $M(a)) && (n.precision = i - (n.type === "%") * 2);
      break;
    }
  }
  return t0(n);
}
function Hr(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return sh(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var a = t();
    return SA(a[0], a[a.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), a = 0, i = n.length - 1, u = n[a], o = n[i], s, c, l = 10;
    for (o < u && (c = u, u = o, o = c, c = a, a = i, i = c); l-- > 0; ) {
      if (c = ch(u, o, r), c === s)
        return n[a] = u, n[i] = o, t(n);
      if (c > 0)
        u = Math.floor(u / c) * c, o = Math.ceil(o / c) * c;
      else if (c < 0)
        u = Math.ceil(u * c) / c, o = Math.floor(o * c) / c;
      else
        break;
      s = c;
    }
    return e;
  }, e;
}
function Gu() {
  var e = Jp();
  return e.copy = function() {
    return Qi(e, Gu());
  }, kt.apply(e, arguments), Hr(e);
}
function xA(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, Wu), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return xA(e).unknown(t);
  }, e = arguments.length ? Array.from(e, Wu) : [0, 1], Hr(r);
}
function wA(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, a = e[r], i = e[n], u;
  return i < a && (u = r, r = n, n = u, u = a, a = i, i = u), e[r] = t.floor(a), e[n] = t.ceil(i), e;
}
function xv(e) {
  return Math.log(e);
}
function wv(e) {
  return Math.exp(e);
}
function qM(e) {
  return -Math.log(-e);
}
function WM(e) {
  return -Math.exp(-e);
}
function YM(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function zM(e) {
  return e === 10 ? YM : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function GM(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function Pv(e) {
  return (t, r) => -e(-t, r);
}
function r0(e) {
  const t = e(xv, wv), r = t.domain;
  let n = 10, a, i;
  function u() {
    return a = GM(n), i = zM(n), r()[0] < 0 ? (a = Pv(a), i = Pv(i), e(qM, WM)) : e(xv, wv), t;
  }
  return t.base = function(o) {
    return arguments.length ? (n = +o, u()) : n;
  }, t.domain = function(o) {
    return arguments.length ? (r(o), u()) : r();
  }, t.ticks = (o) => {
    const s = r();
    let c = s[0], l = s[s.length - 1];
    const f = l < c;
    f && ([c, l] = [l, c]);
    let h = a(c), p = a(l), y, b;
    const m = o == null ? 10 : +o;
    let E = [];
    if (!(n % 1) && p - h < m) {
      if (h = Math.floor(h), p = Math.ceil(p), c > 0) {
        for (; h <= p; ++h)
          for (y = 1; y < n; ++y)
            if (b = h < 0 ? y / i(-h) : y * i(h), !(b < c)) {
              if (b > l) break;
              E.push(b);
            }
      } else for (; h <= p; ++h)
        for (y = n - 1; y >= 1; --y)
          if (b = h > 0 ? y / i(-h) : y * i(h), !(b < c)) {
            if (b > l) break;
            E.push(b);
          }
      E.length * 2 < m && (E = sh(c, l, m));
    } else
      E = sh(h, p, Math.min(p - h, m)).map(i);
    return f ? E.reverse() : E;
  }, t.tickFormat = (o, s) => {
    if (o == null && (o = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = yi(s)).precision == null && (s.trim = !0), s = t0(s)), o === 1 / 0) return s;
    const c = Math.max(1, n * o / t.ticks().length);
    return (l) => {
      let f = l / i(Math.round(a(l)));
      return f * n < n - 0.5 && (f *= n), f <= c ? s(l) : "";
    };
  }, t.nice = () => r(wA(r(), {
    floor: (o) => i(Math.floor(a(o))),
    ceil: (o) => i(Math.ceil(a(o)))
  })), t;
}
function PA() {
  const e = r0(Ko()).domain([1, 10]);
  return e.copy = () => Qi(e, PA()).base(e.base()), kt.apply(e, arguments), e;
}
function Iv(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function Cv(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function n0(e) {
  var t = 1, r = e(Iv(t), Cv(t));
  return r.constant = function(n) {
    return arguments.length ? e(Iv(t = +n), Cv(t)) : t;
  }, Hr(r);
}
function IA() {
  var e = n0(Ko());
  return e.copy = function() {
    return Qi(e, IA()).constant(e.constant());
  }, kt.apply(e, arguments);
}
function Nv(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function KM(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function VM(e) {
  return e < 0 ? -e * e : e * e;
}
function a0(e) {
  var t = e(ot, ot), r = 1;
  function n() {
    return r === 1 ? e(ot, ot) : r === 0.5 ? e(KM, VM) : e(Nv(r), Nv(1 / r));
  }
  return t.exponent = function(a) {
    return arguments.length ? (r = +a, n()) : r;
  }, Hr(t);
}
function i0() {
  var e = a0(Ko());
  return e.copy = function() {
    return Qi(e, i0()).exponent(e.exponent());
  }, kt.apply(e, arguments), e;
}
function XM() {
  return i0.apply(null, arguments).exponent(0.5);
}
function Rv(e) {
  return Math.sign(e) * e * e;
}
function QM(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function CA() {
  var e = Jp(), t = [0, 1], r = !1, n;
  function a(i) {
    var u = QM(e(i));
    return isNaN(u) ? n : r ? Math.round(u) : u;
  }
  return a.invert = function(i) {
    return e.invert(Rv(i));
  }, a.domain = function(i) {
    return arguments.length ? (e.domain(i), a) : e.domain();
  }, a.range = function(i) {
    return arguments.length ? (e.range((t = Array.from(i, Wu)).map(Rv)), a) : t.slice();
  }, a.rangeRound = function(i) {
    return a.range(i).round(!0);
  }, a.round = function(i) {
    return arguments.length ? (r = !!i, a) : r;
  }, a.clamp = function(i) {
    return arguments.length ? (e.clamp(i), a) : e.clamp();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return CA(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, kt.apply(a, arguments), Hr(a);
}
function NA() {
  var e = [], t = [], r = [], n;
  function a() {
    var u = 0, o = Math.max(1, t.length);
    for (r = new Array(o - 1); ++u < o; ) r[u - 1] = rM(e, u / o);
    return i;
  }
  function i(u) {
    return u == null || isNaN(u = +u) ? n : t[Vi(r, u)];
  }
  return i.invertExtent = function(u) {
    var o = t.indexOf(u);
    return o < 0 ? [NaN, NaN] : [
      o > 0 ? r[o - 1] : e[0],
      o < r.length ? r[o] : e[e.length - 1]
    ];
  }, i.domain = function(u) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let o of u) o != null && !isNaN(o = +o) && e.push(o);
    return e.sort(Br), a();
  }, i.range = function(u) {
    return arguments.length ? (t = Array.from(u), a()) : t.slice();
  }, i.unknown = function(u) {
    return arguments.length ? (n = u, i) : n;
  }, i.quantiles = function() {
    return r.slice();
  }, i.copy = function() {
    return NA().domain(e).range(t).unknown(n);
  }, kt.apply(i, arguments);
}
function RA() {
  var e = 0, t = 1, r = 1, n = [0.5], a = [0, 1], i;
  function u(s) {
    return s != null && s <= s ? a[Vi(n, s, 0, r)] : i;
  }
  function o() {
    var s = -1;
    for (n = new Array(r); ++s < r; ) n[s] = ((s + 1) * t - (s - r) * e) / (r + 1);
    return u;
  }
  return u.domain = function(s) {
    return arguments.length ? ([e, t] = s, e = +e, t = +t, o()) : [e, t];
  }, u.range = function(s) {
    return arguments.length ? (r = (a = Array.from(s)).length - 1, o()) : a.slice();
  }, u.invertExtent = function(s) {
    var c = a.indexOf(s);
    return c < 0 ? [NaN, NaN] : c < 1 ? [e, n[0]] : c >= r ? [n[r - 1], t] : [n[c - 1], n[c]];
  }, u.unknown = function(s) {
    return arguments.length && (i = s), u;
  }, u.thresholds = function() {
    return n.slice();
  }, u.copy = function() {
    return RA().domain([e, t]).range(a).unknown(i);
  }, kt.apply(Hr(u), arguments);
}
function DA() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function a(i) {
    return i != null && i <= i ? t[Vi(e, i, 0, n)] : r;
  }
  return a.domain = function(i) {
    return arguments.length ? (e = Array.from(i), n = Math.min(e.length, t.length - 1), a) : e.slice();
  }, a.range = function(i) {
    return arguments.length ? (t = Array.from(i), n = Math.min(e.length, t.length - 1), a) : t.slice();
  }, a.invertExtent = function(i) {
    var u = t.indexOf(i);
    return [e[u - 1], e[u]];
  }, a.unknown = function(i) {
    return arguments.length ? (r = i, a) : r;
  }, a.copy = function() {
    return DA().domain(e).range(t).unknown(r);
  }, kt.apply(a, arguments);
}
const kf = /* @__PURE__ */ new Date(), Bf = /* @__PURE__ */ new Date();
function He(e, t, r, n) {
  function a(i) {
    return e(i = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+i)), i;
  }
  return a.floor = (i) => (e(i = /* @__PURE__ */ new Date(+i)), i), a.ceil = (i) => (e(i = new Date(i - 1)), t(i, 1), e(i), i), a.round = (i) => {
    const u = a(i), o = a.ceil(i);
    return i - u < o - i ? u : o;
  }, a.offset = (i, u) => (t(i = /* @__PURE__ */ new Date(+i), u == null ? 1 : Math.floor(u)), i), a.range = (i, u, o) => {
    const s = [];
    if (i = a.ceil(i), o = o == null ? 1 : Math.floor(o), !(i < u) || !(o > 0)) return s;
    let c;
    do
      s.push(c = /* @__PURE__ */ new Date(+i)), t(i, o), e(i);
    while (c < i && i < u);
    return s;
  }, a.filter = (i) => He((u) => {
    if (u >= u) for (; e(u), !i(u); ) u.setTime(u - 1);
  }, (u, o) => {
    if (u >= u)
      if (o < 0) for (; ++o <= 0; )
        for (; t(u, -1), !i(u); )
          ;
      else for (; --o >= 0; )
        for (; t(u, 1), !i(u); )
          ;
  }), r && (a.count = (i, u) => (kf.setTime(+i), Bf.setTime(+u), e(kf), e(Bf), Math.floor(r(kf, Bf))), a.every = (i) => (i = Math.floor(i), !isFinite(i) || !(i > 0) ? null : i > 1 ? a.filter(n ? (u) => n(u) % i === 0 : (u) => a.count(0, u) % i === 0) : a)), a;
}
const Ku = He(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Ku.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? He((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : Ku);
Ku.range;
const or = 1e3, It = or * 60, sr = It * 60, br = sr * 24, u0 = br * 7, Dv = br * 30, jf = br * 365, nn = He((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * or);
}, (e, t) => (t - e) / or, (e) => e.getUTCSeconds());
nn.range;
const o0 = He((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * or);
}, (e, t) => {
  e.setTime(+e + t * It);
}, (e, t) => (t - e) / It, (e) => e.getMinutes());
o0.range;
const s0 = He((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * It);
}, (e, t) => (t - e) / It, (e) => e.getUTCMinutes());
s0.range;
const c0 = He((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * or - e.getMinutes() * It);
}, (e, t) => {
  e.setTime(+e + t * sr);
}, (e, t) => (t - e) / sr, (e) => e.getHours());
c0.range;
const l0 = He((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * sr);
}, (e, t) => (t - e) / sr, (e) => e.getUTCHours());
l0.range;
const Zi = He(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * It) / br,
  (e) => e.getDate() - 1
);
Zi.range;
const Vo = He((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / br, (e) => e.getUTCDate() - 1);
Vo.range;
const MA = He((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / br, (e) => Math.floor(e / br));
MA.range;
function _n(e) {
  return He((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * It) / u0);
}
const Xo = _n(0), Vu = _n(1), ZM = _n(2), JM = _n(3), ea = _n(4), eL = _n(5), tL = _n(6);
Xo.range;
Vu.range;
ZM.range;
JM.range;
ea.range;
eL.range;
tL.range;
function An(e) {
  return He((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / u0);
}
const Qo = An(0), Xu = An(1), rL = An(2), nL = An(3), ta = An(4), aL = An(5), iL = An(6);
Qo.range;
Xu.range;
rL.range;
nL.range;
ta.range;
aL.range;
iL.range;
const f0 = He((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
f0.range;
const d0 = He((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
d0.range;
const yr = He((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
yr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : He((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
yr.range;
const gr = He((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
gr.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : He((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
gr.range;
function LA(e, t, r, n, a, i) {
  const u = [
    [nn, 1, or],
    [nn, 5, 5 * or],
    [nn, 15, 15 * or],
    [nn, 30, 30 * or],
    [i, 1, It],
    [i, 5, 5 * It],
    [i, 15, 15 * It],
    [i, 30, 30 * It],
    [a, 1, sr],
    [a, 3, 3 * sr],
    [a, 6, 6 * sr],
    [a, 12, 12 * sr],
    [n, 1, br],
    [n, 2, 2 * br],
    [r, 1, u0],
    [t, 1, Dv],
    [t, 3, 3 * Dv],
    [e, 1, jf]
  ];
  function o(c, l, f) {
    const h = l < c;
    h && ([c, l] = [l, c]);
    const p = f && typeof f.range == "function" ? f : s(c, l, f), y = p ? p.range(c, +l + 1) : [];
    return h ? y.reverse() : y;
  }
  function s(c, l, f) {
    const h = Math.abs(l - c) / f, p = Kp(([, , m]) => m).right(u, h);
    if (p === u.length) return e.every(lh(c / jf, l / jf, f));
    if (p === 0) return Ku.every(Math.max(lh(c, l, f), 1));
    const [y, b] = u[h / u[p - 1][2] < u[p][2] / h ? p - 1 : p];
    return y.every(b);
  }
  return [o, s];
}
const [uL, oL] = LA(gr, d0, Qo, MA, l0, s0), [sL, cL] = LA(yr, f0, Xo, Zi, c0, o0);
function Ff(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function $f(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Ra(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function lL(e) {
  var t = e.dateTime, r = e.date, n = e.time, a = e.periods, i = e.days, u = e.shortDays, o = e.months, s = e.shortMonths, c = Da(a), l = Ma(a), f = Da(i), h = Ma(i), p = Da(u), y = Ma(u), b = Da(o), m = Ma(o), E = Da(s), g = Ma(s), _ = {
    a: q,
    A: K,
    b: V,
    B: J,
    c: null,
    d: Fv,
    e: Fv,
    f: DL,
    g: qL,
    G: YL,
    H: CL,
    I: NL,
    j: RL,
    L: kA,
    m: ML,
    M: LL,
    p: te,
    q: Q,
    Q: Hv,
    s: qv,
    S: kL,
    u: BL,
    U: jL,
    V: FL,
    w: $L,
    W: UL,
    x: null,
    X: null,
    y: HL,
    Y: WL,
    Z: zL,
    "%": Uv
  }, A = {
    a: re,
    A: _e,
    b: Ne,
    B: bt,
    c: null,
    d: $v,
    e: $v,
    f: XL,
    g: uk,
    G: sk,
    H: GL,
    I: KL,
    j: VL,
    L: jA,
    m: QL,
    M: ZL,
    p: Yr,
    q: st,
    Q: Hv,
    s: qv,
    S: JL,
    u: ek,
    U: tk,
    V: rk,
    w: nk,
    W: ak,
    x: null,
    X: null,
    y: ik,
    Y: ok,
    Z: ck,
    "%": Uv
  }, v = {
    a: k,
    A: D,
    b: R,
    B: L,
    c: F,
    d: Bv,
    e: Bv,
    f: xL,
    g: kv,
    G: Lv,
    H: jv,
    I: jv,
    j: _L,
    L: SL,
    m: TL,
    M: AL,
    p: N,
    q: EL,
    Q: PL,
    s: IL,
    S: OL,
    u: mL,
    U: bL,
    V: yL,
    w: pL,
    W: gL,
    x: j,
    X: U,
    y: kv,
    Y: Lv,
    Z: vL,
    "%": wL
  };
  _.x = T(r, _), _.X = T(n, _), _.c = T(t, _), A.x = T(r, A), A.X = T(n, A), A.c = T(t, A);
  function T(X, ie) {
    return function(ue) {
      var W = [], we = -1, le = 0, Le = X.length, ke, ct, Or;
      for (ue instanceof Date || (ue = /* @__PURE__ */ new Date(+ue)); ++we < Le; )
        X.charCodeAt(we) === 37 && (W.push(X.slice(le, we)), (ct = Mv[ke = X.charAt(++we)]) != null ? ke = X.charAt(++we) : ct = ke === "e" ? " " : "0", (Or = ie[ke]) && (ke = Or(ue, ct)), W.push(ke), le = we + 1);
      return W.push(X.slice(le, we)), W.join("");
    };
  }
  function S(X, ie) {
    return function(ue) {
      var W = Ra(1900, void 0, 1), we = I(W, X, ue += "", 0), le, Le;
      if (we != ue.length) return null;
      if ("Q" in W) return new Date(W.Q);
      if ("s" in W) return new Date(W.s * 1e3 + ("L" in W ? W.L : 0));
      if (ie && !("Z" in W) && (W.Z = 0), "p" in W && (W.H = W.H % 12 + W.p * 12), W.m === void 0 && (W.m = "q" in W ? W.q : 0), "V" in W) {
        if (W.V < 1 || W.V > 53) return null;
        "w" in W || (W.w = 1), "Z" in W ? (le = $f(Ra(W.y, 0, 1)), Le = le.getUTCDay(), le = Le > 4 || Le === 0 ? Xu.ceil(le) : Xu(le), le = Vo.offset(le, (W.V - 1) * 7), W.y = le.getUTCFullYear(), W.m = le.getUTCMonth(), W.d = le.getUTCDate() + (W.w + 6) % 7) : (le = Ff(Ra(W.y, 0, 1)), Le = le.getDay(), le = Le > 4 || Le === 0 ? Vu.ceil(le) : Vu(le), le = Zi.offset(le, (W.V - 1) * 7), W.y = le.getFullYear(), W.m = le.getMonth(), W.d = le.getDate() + (W.w + 6) % 7);
      } else ("W" in W || "U" in W) && ("w" in W || (W.w = "u" in W ? W.u % 7 : "W" in W ? 1 : 0), Le = "Z" in W ? $f(Ra(W.y, 0, 1)).getUTCDay() : Ff(Ra(W.y, 0, 1)).getDay(), W.m = 0, W.d = "W" in W ? (W.w + 6) % 7 + W.W * 7 - (Le + 5) % 7 : W.w + W.U * 7 - (Le + 6) % 7);
      return "Z" in W ? (W.H += W.Z / 100 | 0, W.M += W.Z % 100, $f(W)) : Ff(W);
    };
  }
  function I(X, ie, ue, W) {
    for (var we = 0, le = ie.length, Le = ue.length, ke, ct; we < le; ) {
      if (W >= Le) return -1;
      if (ke = ie.charCodeAt(we++), ke === 37) {
        if (ke = ie.charAt(we++), ct = v[ke in Mv ? ie.charAt(we++) : ke], !ct || (W = ct(X, ue, W)) < 0) return -1;
      } else if (ke != ue.charCodeAt(W++))
        return -1;
    }
    return W;
  }
  function N(X, ie, ue) {
    var W = c.exec(ie.slice(ue));
    return W ? (X.p = l.get(W[0].toLowerCase()), ue + W[0].length) : -1;
  }
  function k(X, ie, ue) {
    var W = p.exec(ie.slice(ue));
    return W ? (X.w = y.get(W[0].toLowerCase()), ue + W[0].length) : -1;
  }
  function D(X, ie, ue) {
    var W = f.exec(ie.slice(ue));
    return W ? (X.w = h.get(W[0].toLowerCase()), ue + W[0].length) : -1;
  }
  function R(X, ie, ue) {
    var W = E.exec(ie.slice(ue));
    return W ? (X.m = g.get(W[0].toLowerCase()), ue + W[0].length) : -1;
  }
  function L(X, ie, ue) {
    var W = b.exec(ie.slice(ue));
    return W ? (X.m = m.get(W[0].toLowerCase()), ue + W[0].length) : -1;
  }
  function F(X, ie, ue) {
    return I(X, t, ie, ue);
  }
  function j(X, ie, ue) {
    return I(X, r, ie, ue);
  }
  function U(X, ie, ue) {
    return I(X, n, ie, ue);
  }
  function q(X) {
    return u[X.getDay()];
  }
  function K(X) {
    return i[X.getDay()];
  }
  function V(X) {
    return s[X.getMonth()];
  }
  function J(X) {
    return o[X.getMonth()];
  }
  function te(X) {
    return a[+(X.getHours() >= 12)];
  }
  function Q(X) {
    return 1 + ~~(X.getMonth() / 3);
  }
  function re(X) {
    return u[X.getUTCDay()];
  }
  function _e(X) {
    return i[X.getUTCDay()];
  }
  function Ne(X) {
    return s[X.getUTCMonth()];
  }
  function bt(X) {
    return o[X.getUTCMonth()];
  }
  function Yr(X) {
    return a[+(X.getUTCHours() >= 12)];
  }
  function st(X) {
    return 1 + ~~(X.getUTCMonth() / 3);
  }
  return {
    format: function(X) {
      var ie = T(X += "", _);
      return ie.toString = function() {
        return X;
      }, ie;
    },
    parse: function(X) {
      var ie = S(X += "", !1);
      return ie.toString = function() {
        return X;
      }, ie;
    },
    utcFormat: function(X) {
      var ie = T(X += "", A);
      return ie.toString = function() {
        return X;
      }, ie;
    },
    utcParse: function(X) {
      var ie = S(X += "", !0);
      return ie.toString = function() {
        return X;
      }, ie;
    }
  };
}
var Mv = { "-": "", _: " ", 0: "0" }, Ge = /^\s*\d+/, fL = /^%/, dL = /[\\^$*+?|[\]().{}]/g;
function de(e, t, r) {
  var n = e < 0 ? "-" : "", a = (n ? -e : e) + "", i = a.length;
  return n + (i < r ? new Array(r - i + 1).join(t) + a : a);
}
function hL(e) {
  return e.replace(dL, "\\$&");
}
function Da(e) {
  return new RegExp("^(?:" + e.map(hL).join("|") + ")", "i");
}
function Ma(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function pL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function mL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function bL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function yL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function gL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function Lv(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function kv(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function vL(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function EL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function TL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function Bv(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function _L(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function jv(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function AL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function OL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function SL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function xL(e, t, r) {
  var n = Ge.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function wL(e, t, r) {
  var n = fL.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function PL(e, t, r) {
  var n = Ge.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function IL(e, t, r) {
  var n = Ge.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function Fv(e, t) {
  return de(e.getDate(), t, 2);
}
function CL(e, t) {
  return de(e.getHours(), t, 2);
}
function NL(e, t) {
  return de(e.getHours() % 12 || 12, t, 2);
}
function RL(e, t) {
  return de(1 + Zi.count(yr(e), e), t, 3);
}
function kA(e, t) {
  return de(e.getMilliseconds(), t, 3);
}
function DL(e, t) {
  return kA(e, t) + "000";
}
function ML(e, t) {
  return de(e.getMonth() + 1, t, 2);
}
function LL(e, t) {
  return de(e.getMinutes(), t, 2);
}
function kL(e, t) {
  return de(e.getSeconds(), t, 2);
}
function BL(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function jL(e, t) {
  return de(Xo.count(yr(e) - 1, e), t, 2);
}
function BA(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? ea(e) : ea.ceil(e);
}
function FL(e, t) {
  return e = BA(e), de(ea.count(yr(e), e) + (yr(e).getDay() === 4), t, 2);
}
function $L(e) {
  return e.getDay();
}
function UL(e, t) {
  return de(Vu.count(yr(e) - 1, e), t, 2);
}
function HL(e, t) {
  return de(e.getFullYear() % 100, t, 2);
}
function qL(e, t) {
  return e = BA(e), de(e.getFullYear() % 100, t, 2);
}
function WL(e, t) {
  return de(e.getFullYear() % 1e4, t, 4);
}
function YL(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? ea(e) : ea.ceil(e), de(e.getFullYear() % 1e4, t, 4);
}
function zL(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + de(t / 60 | 0, "0", 2) + de(t % 60, "0", 2);
}
function $v(e, t) {
  return de(e.getUTCDate(), t, 2);
}
function GL(e, t) {
  return de(e.getUTCHours(), t, 2);
}
function KL(e, t) {
  return de(e.getUTCHours() % 12 || 12, t, 2);
}
function VL(e, t) {
  return de(1 + Vo.count(gr(e), e), t, 3);
}
function jA(e, t) {
  return de(e.getUTCMilliseconds(), t, 3);
}
function XL(e, t) {
  return jA(e, t) + "000";
}
function QL(e, t) {
  return de(e.getUTCMonth() + 1, t, 2);
}
function ZL(e, t) {
  return de(e.getUTCMinutes(), t, 2);
}
function JL(e, t) {
  return de(e.getUTCSeconds(), t, 2);
}
function ek(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function tk(e, t) {
  return de(Qo.count(gr(e) - 1, e), t, 2);
}
function FA(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? ta(e) : ta.ceil(e);
}
function rk(e, t) {
  return e = FA(e), de(ta.count(gr(e), e) + (gr(e).getUTCDay() === 4), t, 2);
}
function nk(e) {
  return e.getUTCDay();
}
function ak(e, t) {
  return de(Xu.count(gr(e) - 1, e), t, 2);
}
function ik(e, t) {
  return de(e.getUTCFullYear() % 100, t, 2);
}
function uk(e, t) {
  return e = FA(e), de(e.getUTCFullYear() % 100, t, 2);
}
function ok(e, t) {
  return de(e.getUTCFullYear() % 1e4, t, 4);
}
function sk(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? ta(e) : ta.ceil(e), de(e.getUTCFullYear() % 1e4, t, 4);
}
function ck() {
  return "+0000";
}
function Uv() {
  return "%";
}
function Hv(e) {
  return +e;
}
function qv(e) {
  return Math.floor(+e / 1e3);
}
var In, $A, UA;
lk({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function lk(e) {
  return In = lL(e), $A = In.format, In.parse, UA = In.utcFormat, In.utcParse, In;
}
function fk(e) {
  return new Date(e);
}
function dk(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function h0(e, t, r, n, a, i, u, o, s, c) {
  var l = Jp(), f = l.invert, h = l.domain, p = c(".%L"), y = c(":%S"), b = c("%I:%M"), m = c("%I %p"), E = c("%a %d"), g = c("%b %d"), _ = c("%B"), A = c("%Y");
  function v(T) {
    return (s(T) < T ? p : o(T) < T ? y : u(T) < T ? b : i(T) < T ? m : n(T) < T ? a(T) < T ? E : g : r(T) < T ? _ : A)(T);
  }
  return l.invert = function(T) {
    return new Date(f(T));
  }, l.domain = function(T) {
    return arguments.length ? h(Array.from(T, dk)) : h().map(fk);
  }, l.ticks = function(T) {
    var S = h();
    return e(S[0], S[S.length - 1], T ?? 10);
  }, l.tickFormat = function(T, S) {
    return S == null ? v : c(S);
  }, l.nice = function(T) {
    var S = h();
    return (!T || typeof T.range != "function") && (T = t(S[0], S[S.length - 1], T ?? 10)), T ? h(wA(S, T)) : l;
  }, l.copy = function() {
    return Qi(l, h0(e, t, r, n, a, i, u, o, s, c));
  }, l;
}
function hk() {
  return kt.apply(h0(sL, cL, yr, f0, Xo, Zi, c0, o0, nn, $A).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function pk() {
  return kt.apply(h0(uL, oL, gr, d0, Qo, Vo, l0, s0, nn, UA).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Zo() {
  var e = 0, t = 1, r, n, a, i, u = ot, o = !1, s;
  function c(f) {
    return f == null || isNaN(f = +f) ? s : u(a === 0 ? 0.5 : (f = (i(f) - r) * a, o ? Math.max(0, Math.min(1, f)) : f));
  }
  c.domain = function(f) {
    return arguments.length ? ([e, t] = f, r = i(e = +e), n = i(t = +t), a = r === n ? 0 : 1 / (n - r), c) : [e, t];
  }, c.clamp = function(f) {
    return arguments.length ? (o = !!f, c) : o;
  }, c.interpolator = function(f) {
    return arguments.length ? (u = f, c) : u;
  };
  function l(f) {
    return function(h) {
      var p, y;
      return arguments.length ? ([p, y] = h, u = f(p, y), c) : [u(0), u(1)];
    };
  }
  return c.range = l(Aa), c.rangeRound = l(Zp), c.unknown = function(f) {
    return arguments.length ? (s = f, c) : s;
  }, function(f) {
    return i = f, r = f(e), n = f(t), a = r === n ? 0 : 1 / (n - r), c;
  };
}
function qr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function HA() {
  var e = Hr(Zo()(ot));
  return e.copy = function() {
    return qr(e, HA());
  }, _r.apply(e, arguments);
}
function qA() {
  var e = r0(Zo()).domain([1, 10]);
  return e.copy = function() {
    return qr(e, qA()).base(e.base());
  }, _r.apply(e, arguments);
}
function WA() {
  var e = n0(Zo());
  return e.copy = function() {
    return qr(e, WA()).constant(e.constant());
  }, _r.apply(e, arguments);
}
function p0() {
  var e = a0(Zo());
  return e.copy = function() {
    return qr(e, p0()).exponent(e.exponent());
  }, _r.apply(e, arguments);
}
function mk() {
  return p0.apply(null, arguments).exponent(0.5);
}
function YA() {
  var e = [], t = ot;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Vi(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let a of n) a != null && !isNaN(a = +a) && e.push(a);
    return e.sort(Br), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, a) => t(a / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (a, i) => tM(e, i / n));
  }, r.copy = function() {
    return YA(t).domain(e);
  }, _r.apply(r, arguments);
}
function Jo() {
  var e = 0, t = 0.5, r = 1, n = 1, a, i, u, o, s, c = ot, l, f = !1, h;
  function p(b) {
    return isNaN(b = +b) ? h : (b = 0.5 + ((b = +l(b)) - i) * (n * b < n * i ? o : s), c(f ? Math.max(0, Math.min(1, b)) : b));
  }
  p.domain = function(b) {
    return arguments.length ? ([e, t, r] = b, a = l(e = +e), i = l(t = +t), u = l(r = +r), o = a === i ? 0 : 0.5 / (i - a), s = i === u ? 0 : 0.5 / (u - i), n = i < a ? -1 : 1, p) : [e, t, r];
  }, p.clamp = function(b) {
    return arguments.length ? (f = !!b, p) : f;
  }, p.interpolator = function(b) {
    return arguments.length ? (c = b, p) : c;
  };
  function y(b) {
    return function(m) {
      var E, g, _;
      return arguments.length ? ([E, g, _] = m, c = wM(b, [E, g, _]), p) : [c(0), c(0.5), c(1)];
    };
  }
  return p.range = y(Aa), p.rangeRound = y(Zp), p.unknown = function(b) {
    return arguments.length ? (h = b, p) : h;
  }, function(b) {
    return l = b, a = b(e), i = b(t), u = b(r), o = a === i ? 0 : 0.5 / (i - a), s = i === u ? 0 : 0.5 / (u - i), n = i < a ? -1 : 1, p;
  };
}
function zA() {
  var e = Hr(Jo()(ot));
  return e.copy = function() {
    return qr(e, zA());
  }, _r.apply(e, arguments);
}
function GA() {
  var e = r0(Jo()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return qr(e, GA()).base(e.base());
  }, _r.apply(e, arguments);
}
function KA() {
  var e = n0(Jo());
  return e.copy = function() {
    return qr(e, KA()).constant(e.constant());
  }, _r.apply(e, arguments);
}
function m0() {
  var e = a0(Jo());
  return e.copy = function() {
    return qr(e, m0()).exponent(e.exponent());
  }, _r.apply(e, arguments);
}
function bk() {
  return m0.apply(null, arguments).exponent(0.5);
}
const Wv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: hi,
  scaleDiverging: zA,
  scaleDivergingLog: GA,
  scaleDivergingPow: m0,
  scaleDivergingSqrt: bk,
  scaleDivergingSymlog: KA,
  scaleIdentity: xA,
  scaleImplicit: fh,
  scaleLinear: Gu,
  scaleLog: PA,
  scaleOrdinal: Vp,
  scalePoint: Xa,
  scalePow: i0,
  scaleQuantile: NA,
  scaleQuantize: RA,
  scaleRadial: CA,
  scaleSequential: HA,
  scaleSequentialLog: qA,
  scaleSequentialPow: p0,
  scaleSequentialQuantile: YA,
  scaleSequentialSqrt: mk,
  scaleSequentialSymlog: WA,
  scaleSqrt: XM,
  scaleSymlog: IA,
  scaleThreshold: DA,
  scaleTime: hk,
  scaleUtc: pk,
  tickFormat: SA
}, Symbol.toStringTag, { value: "Module" }));
var Uf, Yv;
function es() {
  if (Yv) return Uf;
  Yv = 1;
  var e = va();
  function t(r, n, a) {
    for (var i = -1, u = r.length; ++i < u; ) {
      var o = r[i], s = n(o);
      if (s != null && (c === void 0 ? s === s && !e(s) : a(s, c)))
        var c = s, l = o;
    }
    return l;
  }
  return Uf = t, Uf;
}
var Hf, zv;
function VA() {
  if (zv) return Hf;
  zv = 1;
  function e(t, r) {
    return t > r;
  }
  return Hf = e, Hf;
}
var qf, Gv;
function yk() {
  if (Gv) return qf;
  Gv = 1;
  var e = es(), t = VA(), r = Ta();
  function n(a) {
    return a && a.length ? e(a, r, t) : void 0;
  }
  return qf = n, qf;
}
var gk = yk();
const ts = /* @__PURE__ */ ye(gk);
var Wf, Kv;
function XA() {
  if (Kv) return Wf;
  Kv = 1;
  function e(t, r) {
    return t < r;
  }
  return Wf = e, Wf;
}
var Yf, Vv;
function vk() {
  if (Vv) return Yf;
  Vv = 1;
  var e = es(), t = XA(), r = Ta();
  function n(a) {
    return a && a.length ? e(a, r, t) : void 0;
  }
  return Yf = n, Yf;
}
var Ek = vk();
const rs = /* @__PURE__ */ ye(Ek);
var zf, Xv;
function Tk() {
  if (Xv) return zf;
  Xv = 1;
  var e = Np(), t = rr(), r = iA(), n = mt();
  function a(i, u) {
    var o = n(i) ? e : r;
    return o(i, t(u, 3));
  }
  return zf = a, zf;
}
var Gf, Qv;
function _k() {
  if (Qv) return Gf;
  Qv = 1;
  var e = nA(), t = Tk();
  function r(n, a) {
    return e(t(n, a), 1);
  }
  return Gf = r, Gf;
}
var Ak = _k();
const Ok = /* @__PURE__ */ ye(Ak);
var Kf, Zv;
function Sk() {
  if (Zv) return Kf;
  Zv = 1;
  var e = Wp();
  function t(r, n) {
    return e(r, n);
  }
  return Kf = t, Kf;
}
var xk = Sk();
const ns = /* @__PURE__ */ ye(xk);
var Oa = 1e9, wk = {
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
}, y0, Se = !0, Mt = "[DecimalError] ", cn = Mt + "Invalid argument: ", b0 = Mt + "Exponent out of range: ", Sa = Math.floor, Jr = Math.pow, Pk = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, vt, We = 1e7, Ae = 7, QA = 9007199254740991, Qu = Sa(QA / Ae), Z = {};
Z.absoluteValue = Z.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
Z.comparedTo = Z.cmp = function(e) {
  var t, r, n, a, i = this;
  if (e = new i.constructor(e), i.s !== e.s) return i.s || -e.s;
  if (i.e !== e.e) return i.e > e.e ^ i.s < 0 ? 1 : -1;
  for (n = i.d.length, a = e.d.length, t = 0, r = n < a ? n : a; t < r; ++t)
    if (i.d[t] !== e.d[t]) return i.d[t] > e.d[t] ^ i.s < 0 ? 1 : -1;
  return n === a ? 0 : n > a ^ i.s < 0 ? 1 : -1;
};
Z.decimalPlaces = Z.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * Ae;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
Z.dividedBy = Z.div = function(e) {
  return pr(this, new this.constructor(e));
};
Z.dividedToIntegerBy = Z.idiv = function(e) {
  var t = this, r = t.constructor;
  return ge(pr(t, new r(e), 0, 1), r.precision);
};
Z.equals = Z.eq = function(e) {
  return !this.cmp(e);
};
Z.exponent = function() {
  return Me(this);
};
Z.greaterThan = Z.gt = function(e) {
  return this.cmp(e) > 0;
};
Z.greaterThanOrEqualTo = Z.gte = function(e) {
  return this.cmp(e) >= 0;
};
Z.isInteger = Z.isint = function() {
  return this.e > this.d.length - 2;
};
Z.isNegative = Z.isneg = function() {
  return this.s < 0;
};
Z.isPositive = Z.ispos = function() {
  return this.s > 0;
};
Z.isZero = function() {
  return this.s === 0;
};
Z.lessThan = Z.lt = function(e) {
  return this.cmp(e) < 0;
};
Z.lessThanOrEqualTo = Z.lte = function(e) {
  return this.cmp(e) < 1;
};
Z.logarithm = Z.log = function(e) {
  var t, r = this, n = r.constructor, a = n.precision, i = a + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(vt)) throw Error(Mt + "NaN");
  if (r.s < 1) throw Error(Mt + (r.s ? "NaN" : "-Infinity"));
  return r.eq(vt) ? new n(0) : (Se = !1, t = pr(gi(r, i), gi(e, i), i), Se = !0, ge(t, a));
};
Z.minus = Z.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? eO(t, e) : ZA(t, (e.s = -e.s, e));
};
Z.modulo = Z.mod = function(e) {
  var t, r = this, n = r.constructor, a = n.precision;
  if (e = new n(e), !e.s) throw Error(Mt + "NaN");
  return r.s ? (Se = !1, t = pr(r, e, 0, 1).times(e), Se = !0, r.minus(t)) : ge(new n(r), a);
};
Z.naturalExponential = Z.exp = function() {
  return JA(this);
};
Z.naturalLogarithm = Z.ln = function() {
  return gi(this);
};
Z.negated = Z.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
Z.plus = Z.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? ZA(t, e) : eO(t, (e.s = -e.s, e));
};
Z.precision = Z.sd = function(e) {
  var t, r, n, a = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(cn + e);
  if (t = Me(a) + 1, n = a.d.length - 1, r = n * Ae + 1, n = a.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = a.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
Z.squareRoot = Z.sqrt = function() {
  var e, t, r, n, a, i, u, o = this, s = o.constructor;
  if (o.s < 1) {
    if (!o.s) return new s(0);
    throw Error(Mt + "NaN");
  }
  for (e = Me(o), Se = !1, a = Math.sqrt(+o), a == 0 || a == 1 / 0 ? (t = Xt(o.d), (t.length + e) % 2 == 0 && (t += "0"), a = Math.sqrt(t), e = Sa((e + 1) / 2) - (e < 0 || e % 2), a == 1 / 0 ? t = "5e" + e : (t = a.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new s(t)) : n = new s(a.toString()), r = s.precision, a = u = r + 3; ; )
    if (i = n, n = i.plus(pr(o, i, u + 2)).times(0.5), Xt(i.d).slice(0, u) === (t = Xt(n.d)).slice(0, u)) {
      if (t = t.slice(u - 3, u + 1), a == u && t == "4999") {
        if (ge(i, r + 1, 0), i.times(i).eq(o)) {
          n = i;
          break;
        }
      } else if (t != "9999")
        break;
      u += 4;
    }
  return Se = !0, ge(n, r);
};
Z.times = Z.mul = function(e) {
  var t, r, n, a, i, u, o, s, c, l = this, f = l.constructor, h = l.d, p = (e = new f(e)).d;
  if (!l.s || !e.s) return new f(0);
  for (e.s *= l.s, r = l.e + e.e, s = h.length, c = p.length, s < c && (i = h, h = p, p = i, u = s, s = c, c = u), i = [], u = s + c, n = u; n--; ) i.push(0);
  for (n = c; --n >= 0; ) {
    for (t = 0, a = s + n; a > n; )
      o = i[a] + p[n] * h[a - n - 1] + t, i[a--] = o % We | 0, t = o / We | 0;
    i[a] = (i[a] + t) % We | 0;
  }
  for (; !i[--u]; ) i.pop();
  return t ? ++r : i.shift(), e.d = i, e.e = r, Se ? ge(e, f.precision) : e;
};
Z.toDecimalPlaces = Z.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (Jt(e, 0, Oa), t === void 0 ? t = n.rounding : Jt(t, 0, 8), ge(r, e + Me(r) + 1, t));
};
Z.toExponential = function(e, t) {
  var r, n = this, a = n.constructor;
  return e === void 0 ? r = mn(n, !0) : (Jt(e, 0, Oa), t === void 0 ? t = a.rounding : Jt(t, 0, 8), n = ge(new a(n), e + 1, t), r = mn(n, !0, e + 1)), r;
};
Z.toFixed = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? mn(a) : (Jt(e, 0, Oa), t === void 0 ? t = i.rounding : Jt(t, 0, 8), n = ge(new i(a), e + Me(a) + 1, t), r = mn(n.abs(), !1, e + Me(n) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
};
Z.toInteger = Z.toint = function() {
  var e = this, t = e.constructor;
  return ge(new t(e), Me(e) + 1, t.rounding);
};
Z.toNumber = function() {
  return +this;
};
Z.toPower = Z.pow = function(e) {
  var t, r, n, a, i, u, o = this, s = o.constructor, c = 12, l = +(e = new s(e));
  if (!e.s) return new s(vt);
  if (o = new s(o), !o.s) {
    if (e.s < 1) throw Error(Mt + "Infinity");
    return o;
  }
  if (o.eq(vt)) return o;
  if (n = s.precision, e.eq(vt)) return ge(o, n);
  if (t = e.e, r = e.d.length - 1, u = t >= r, i = o.s, u) {
    if ((r = l < 0 ? -l : l) <= QA) {
      for (a = new s(vt), t = Math.ceil(n / Ae + 4), Se = !1; r % 2 && (a = a.times(o), e1(a.d, t)), r = Sa(r / 2), r !== 0; )
        o = o.times(o), e1(o.d, t);
      return Se = !0, e.s < 0 ? new s(vt).div(a) : ge(a, n);
    }
  } else if (i < 0) throw Error(Mt + "NaN");
  return i = i < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, o.s = 1, Se = !1, a = e.times(gi(o, n + c)), Se = !0, a = JA(a), a.s = i, a;
};
Z.toPrecision = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? (r = Me(a), n = mn(a, r <= i.toExpNeg || r >= i.toExpPos)) : (Jt(e, 1, Oa), t === void 0 ? t = i.rounding : Jt(t, 0, 8), a = ge(new i(a), e, t), r = Me(a), n = mn(a, e <= r || r <= i.toExpNeg, e)), n;
};
Z.toSignificantDigits = Z.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (Jt(e, 1, Oa), t === void 0 ? t = n.rounding : Jt(t, 0, 8)), ge(new n(r), e, t);
};
Z.toString = Z.valueOf = Z.val = Z.toJSON = Z[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = Me(e), r = e.constructor;
  return mn(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function ZA(e, t) {
  var r, n, a, i, u, o, s, c, l = e.constructor, f = l.precision;
  if (!e.s || !t.s)
    return t.s || (t = new l(e)), Se ? ge(t, f) : t;
  if (s = e.d, c = t.d, u = e.e, a = t.e, s = s.slice(), i = u - a, i) {
    for (i < 0 ? (n = s, i = -i, o = c.length) : (n = c, a = u, o = s.length), u = Math.ceil(f / Ae), o = u > o ? u + 1 : o + 1, i > o && (i = o, n.length = 1), n.reverse(); i--; ) n.push(0);
    n.reverse();
  }
  for (o = s.length, i = c.length, o - i < 0 && (i = o, n = c, c = s, s = n), r = 0; i; )
    r = (s[--i] = s[i] + c[i] + r) / We | 0, s[i] %= We;
  for (r && (s.unshift(r), ++a), o = s.length; s[--o] == 0; ) s.pop();
  return t.d = s, t.e = a, Se ? ge(t, f) : t;
}
function Jt(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(cn + e);
}
function Xt(e) {
  var t, r, n, a = e.length - 1, i = "", u = e[0];
  if (a > 0) {
    for (i += u, t = 1; t < a; t++)
      n = e[t] + "", r = Ae - n.length, r && (i += Ir(r)), i += n;
    u = e[t], n = u + "", r = Ae - n.length, r && (i += Ir(r));
  } else if (u === 0)
    return "0";
  for (; u % 10 === 0; ) u /= 10;
  return i + u;
}
var pr = /* @__PURE__ */ (function() {
  function e(n, a) {
    var i, u = 0, o = n.length;
    for (n = n.slice(); o--; )
      i = n[o] * a + u, n[o] = i % We | 0, u = i / We | 0;
    return u && n.unshift(u), n;
  }
  function t(n, a, i, u) {
    var o, s;
    if (i != u)
      s = i > u ? 1 : -1;
    else
      for (o = s = 0; o < i; o++)
        if (n[o] != a[o]) {
          s = n[o] > a[o] ? 1 : -1;
          break;
        }
    return s;
  }
  function r(n, a, i) {
    for (var u = 0; i--; )
      n[i] -= u, u = n[i] < a[i] ? 1 : 0, n[i] = u * We + n[i] - a[i];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, a, i, u) {
    var o, s, c, l, f, h, p, y, b, m, E, g, _, A, v, T, S, I, N = n.constructor, k = n.s == a.s ? 1 : -1, D = n.d, R = a.d;
    if (!n.s) return new N(n);
    if (!a.s) throw Error(Mt + "Division by zero");
    for (s = n.e - a.e, S = R.length, v = D.length, p = new N(k), y = p.d = [], c = 0; R[c] == (D[c] || 0); ) ++c;
    if (R[c] > (D[c] || 0) && --s, i == null ? g = i = N.precision : u ? g = i + (Me(n) - Me(a)) + 1 : g = i, g < 0) return new N(0);
    if (g = g / Ae + 2 | 0, c = 0, S == 1)
      for (l = 0, R = R[0], g++; (c < v || l) && g--; c++)
        _ = l * We + (D[c] || 0), y[c] = _ / R | 0, l = _ % R | 0;
    else {
      for (l = We / (R[0] + 1) | 0, l > 1 && (R = e(R, l), D = e(D, l), S = R.length, v = D.length), A = S, b = D.slice(0, S), m = b.length; m < S; ) b[m++] = 0;
      I = R.slice(), I.unshift(0), T = R[0], R[1] >= We / 2 && ++T;
      do
        l = 0, o = t(R, b, S, m), o < 0 ? (E = b[0], S != m && (E = E * We + (b[1] || 0)), l = E / T | 0, l > 1 ? (l >= We && (l = We - 1), f = e(R, l), h = f.length, m = b.length, o = t(f, b, h, m), o == 1 && (l--, r(f, S < h ? I : R, h))) : (l == 0 && (o = l = 1), f = R.slice()), h = f.length, h < m && f.unshift(0), r(b, f, m), o == -1 && (m = b.length, o = t(R, b, S, m), o < 1 && (l++, r(b, S < m ? I : R, m))), m = b.length) : o === 0 && (l++, b = [0]), y[c++] = l, o && b[0] ? b[m++] = D[A] || 0 : (b = [D[A]], m = 1);
      while ((A++ < v || b[0] !== void 0) && g--);
    }
    return y[0] || y.shift(), p.e = s, ge(p, u ? i + Me(p) + 1 : i);
  };
})();
function JA(e, t) {
  var r, n, a, i, u, o, s = 0, c = 0, l = e.constructor, f = l.precision;
  if (Me(e) > 16) throw Error(b0 + Me(e));
  if (!e.s) return new l(vt);
  for (Se = !1, o = f, u = new l(0.03125); e.abs().gte(0.1); )
    e = e.times(u), c += 5;
  for (n = Math.log(Jr(2, c)) / Math.LN10 * 2 + 5 | 0, o += n, r = a = i = new l(vt), l.precision = o; ; ) {
    if (a = ge(a.times(e), o), r = r.times(++s), u = i.plus(pr(a, r, o)), Xt(u.d).slice(0, o) === Xt(i.d).slice(0, o)) {
      for (; c--; ) i = ge(i.times(i), o);
      return l.precision = f, t == null ? (Se = !0, ge(i, f)) : i;
    }
    i = u;
  }
}
function Me(e) {
  for (var t = e.e * Ae, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function Vf(e, t, r) {
  if (t > e.LN10.sd())
    throw Se = !0, r && (e.precision = r), Error(Mt + "LN10 precision limit exceeded");
  return ge(new e(e.LN10), t);
}
function Ir(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function gi(e, t) {
  var r, n, a, i, u, o, s, c, l, f = 1, h = 10, p = e, y = p.d, b = p.constructor, m = b.precision;
  if (p.s < 1) throw Error(Mt + (p.s ? "NaN" : "-Infinity"));
  if (p.eq(vt)) return new b(0);
  if (t == null ? (Se = !1, c = m) : c = t, p.eq(10))
    return t == null && (Se = !0), Vf(b, c);
  if (c += h, b.precision = c, r = Xt(y), n = r.charAt(0), i = Me(p), Math.abs(i) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      p = p.times(e), r = Xt(p.d), n = r.charAt(0), f++;
    i = Me(p), n > 1 ? (p = new b("0." + r), i++) : p = new b(n + "." + r.slice(1));
  } else
    return s = Vf(b, c + 2, m).times(i + ""), p = gi(new b(n + "." + r.slice(1)), c - h).plus(s), b.precision = m, t == null ? (Se = !0, ge(p, m)) : p;
  for (o = u = p = pr(p.minus(vt), p.plus(vt), c), l = ge(p.times(p), c), a = 3; ; ) {
    if (u = ge(u.times(l), c), s = o.plus(pr(u, new b(a), c)), Xt(s.d).slice(0, c) === Xt(o.d).slice(0, c))
      return o = o.times(2), i !== 0 && (o = o.plus(Vf(b, c + 2, m).times(i + ""))), o = pr(o, new b(f), c), b.precision = m, t == null ? (Se = !0, ge(o, m)) : o;
    o = s, a += 2;
  }
}
function Jv(e, t) {
  var r, n, a;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (a = t.length; t.charCodeAt(a - 1) === 48; ) --a;
  if (t = t.slice(n, a), t) {
    if (a -= n, r = r - n - 1, e.e = Sa(r / Ae), e.d = [], n = (r + 1) % Ae, r < 0 && (n += Ae), n < a) {
      for (n && e.d.push(+t.slice(0, n)), a -= Ae; n < a; ) e.d.push(+t.slice(n, n += Ae));
      t = t.slice(n), n = Ae - t.length;
    } else
      n -= a;
    for (; n--; ) t += "0";
    if (e.d.push(+t), Se && (e.e > Qu || e.e < -Qu)) throw Error(b0 + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function ge(e, t, r) {
  var n, a, i, u, o, s, c, l, f = e.d;
  for (u = 1, i = f[0]; i >= 10; i /= 10) u++;
  if (n = t - u, n < 0)
    n += Ae, a = t, c = f[l = 0];
  else {
    if (l = Math.ceil((n + 1) / Ae), i = f.length, l >= i) return e;
    for (c = i = f[l], u = 1; i >= 10; i /= 10) u++;
    n %= Ae, a = n - Ae + u;
  }
  if (r !== void 0 && (i = Jr(10, u - a - 1), o = c / i % 10 | 0, s = t < 0 || f[l + 1] !== void 0 || c % i, s = r < 4 ? (o || s) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : o > 5 || o == 5 && (r == 4 || s || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? a > 0 ? c / Jr(10, u - a) : 0 : f[l - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !f[0])
    return s ? (i = Me(e), f.length = 1, t = t - i - 1, f[0] = Jr(10, (Ae - t % Ae) % Ae), e.e = Sa(-t / Ae) || 0) : (f.length = 1, f[0] = e.e = e.s = 0), e;
  if (n == 0 ? (f.length = l, i = 1, l--) : (f.length = l + 1, i = Jr(10, Ae - n), f[l] = a > 0 ? (c / Jr(10, u - a) % Jr(10, a) | 0) * i : 0), s)
    for (; ; )
      if (l == 0) {
        (f[0] += i) == We && (f[0] = 1, ++e.e);
        break;
      } else {
        if (f[l] += i, f[l] != We) break;
        f[l--] = 0, i = 1;
      }
  for (n = f.length; f[--n] === 0; ) f.pop();
  if (Se && (e.e > Qu || e.e < -Qu))
    throw Error(b0 + Me(e));
  return e;
}
function eO(e, t) {
  var r, n, a, i, u, o, s, c, l, f, h = e.constructor, p = h.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new h(e), Se ? ge(t, p) : t;
  if (s = e.d, f = t.d, n = t.e, c = e.e, s = s.slice(), u = c - n, u) {
    for (l = u < 0, l ? (r = s, u = -u, o = f.length) : (r = f, n = c, o = s.length), a = Math.max(Math.ceil(p / Ae), o) + 2, u > a && (u = a, r.length = 1), r.reverse(), a = u; a--; ) r.push(0);
    r.reverse();
  } else {
    for (a = s.length, o = f.length, l = a < o, l && (o = a), a = 0; a < o; a++)
      if (s[a] != f[a]) {
        l = s[a] < f[a];
        break;
      }
    u = 0;
  }
  for (l && (r = s, s = f, f = r, t.s = -t.s), o = s.length, a = f.length - o; a > 0; --a) s[o++] = 0;
  for (a = f.length; a > u; ) {
    if (s[--a] < f[a]) {
      for (i = a; i && s[--i] === 0; ) s[i] = We - 1;
      --s[i], s[a] += We;
    }
    s[a] -= f[a];
  }
  for (; s[--o] === 0; ) s.pop();
  for (; s[0] === 0; s.shift()) --n;
  return s[0] ? (t.d = s, t.e = n, Se ? ge(t, p) : t) : new h(0);
}
function mn(e, t, r) {
  var n, a = Me(e), i = Xt(e.d), u = i.length;
  return t ? (r && (n = r - u) > 0 ? i = i.charAt(0) + "." + i.slice(1) + Ir(n) : u > 1 && (i = i.charAt(0) + "." + i.slice(1)), i = i + (a < 0 ? "e" : "e+") + a) : a < 0 ? (i = "0." + Ir(-a - 1) + i, r && (n = r - u) > 0 && (i += Ir(n))) : a >= u ? (i += Ir(a + 1 - u), r && (n = r - a - 1) > 0 && (i = i + "." + Ir(n))) : ((n = a + 1) < u && (i = i.slice(0, n) + "." + i.slice(n)), r && (n = r - u) > 0 && (a + 1 === u && (i += "."), i += Ir(n))), e.s < 0 ? "-" + i : i;
}
function e1(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function tO(e) {
  var t, r, n;
  function a(i) {
    var u = this;
    if (!(u instanceof a)) return new a(i);
    if (u.constructor = a, i instanceof a) {
      u.s = i.s, u.e = i.e, u.d = (i = i.d) ? i.slice() : i;
      return;
    }
    if (typeof i == "number") {
      if (i * 0 !== 0)
        throw Error(cn + i);
      if (i > 0)
        u.s = 1;
      else if (i < 0)
        i = -i, u.s = -1;
      else {
        u.s = 0, u.e = 0, u.d = [0];
        return;
      }
      if (i === ~~i && i < 1e7) {
        u.e = 0, u.d = [i];
        return;
      }
      return Jv(u, i.toString());
    } else if (typeof i != "string")
      throw Error(cn + i);
    if (i.charCodeAt(0) === 45 ? (i = i.slice(1), u.s = -1) : u.s = 1, Pk.test(i)) Jv(u, i);
    else throw Error(cn + i);
  }
  if (a.prototype = Z, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.clone = tO, a.config = a.set = Ik, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return a.config(e), a;
}
function Ik(e) {
  if (!e || typeof e != "object")
    throw Error(Mt + "Object expected");
  var t, r, n, a = [
    "precision",
    1,
    Oa,
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
      if (Sa(n) === n && n >= a[t + 1] && n <= a[t + 2]) this[r] = n;
      else throw Error(cn + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(cn + r + ": " + n);
  return this;
}
var y0 = tO(wk);
vt = new y0(1);
const be = y0;
function Ck(e) {
  return Mk(e) || Dk(e) || Rk(e) || Nk();
}
function Nk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Rk(e, t) {
  if (e) {
    if (typeof e == "string") return mh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return mh(e, t);
  }
}
function Dk(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function Mk(e) {
  if (Array.isArray(e)) return mh(e);
}
function mh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var Lk = function(t) {
  return t;
}, rO = {}, nO = function(t) {
  return t === rO;
}, t1 = function(t) {
  return function r() {
    return arguments.length === 0 || arguments.length === 1 && nO(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments);
  };
}, kk = function e(t, r) {
  return t === 1 ? r : t1(function() {
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var u = a.filter(function(o) {
      return o !== rO;
    }).length;
    return u >= t ? r.apply(void 0, a) : e(t - u, t1(function() {
      for (var o = arguments.length, s = new Array(o), c = 0; c < o; c++)
        s[c] = arguments[c];
      var l = a.map(function(f) {
        return nO(f) ? s.shift() : f;
      });
      return r.apply(void 0, Ck(l).concat(s));
    }));
  });
}, as = function(t) {
  return kk(t.length, t);
}, bh = function(t, r) {
  for (var n = [], a = t; a < r; ++a)
    n[a - t] = a;
  return n;
}, Bk = as(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
    return t[r];
  }).map(e);
}), jk = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (!r.length)
    return Lk;
  var a = r.reverse(), i = a[0], u = a.slice(1);
  return function() {
    return u.reduce(function(o, s) {
      return s(o);
    }, i.apply(void 0, arguments));
  };
}, yh = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, aO = function(t) {
  var r = null, n = null;
  return function() {
    for (var a = arguments.length, i = new Array(a), u = 0; u < a; u++)
      i[u] = arguments[u];
    return r && i.every(function(o, s) {
      return o === r[s];
    }) || (r = i, n = t.apply(void 0, i)), n;
  };
};
function Fk(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new be(e).abs().log(10).toNumber()) + 1, t;
}
function $k(e, t, r) {
  for (var n = new be(e), a = 0, i = []; n.lt(t) && a < 1e5; )
    i.push(n.toNumber()), n = n.add(r), a++;
  return i;
}
var Uk = as(function(e, t, r) {
  var n = +e, a = +t;
  return n + r * (a - n);
}), Hk = as(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, (r - e) / n;
}), qk = as(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n));
});
const is = {
  rangeStep: $k,
  getDigitCount: Fk,
  interpolateNumber: Uk,
  uninterpolateNumber: Hk,
  uninterpolateTruncation: qk
};
function gh(e) {
  return zk(e) || Yk(e) || iO(e) || Wk();
}
function Wk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Yk(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function zk(e) {
  if (Array.isArray(e)) return vh(e);
}
function vi(e, t) {
  return Vk(e) || Kk(e, t) || iO(e, t) || Gk();
}
function Gk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function iO(e, t) {
  if (e) {
    if (typeof e == "string") return vh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return vh(e, t);
  }
}
function vh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function Kk(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [], n = !0, a = !1, i = void 0;
    try {
      for (var u = e[Symbol.iterator](), o; !(n = (o = u.next()).done) && (r.push(o.value), !(t && r.length === t)); n = !0)
        ;
    } catch (s) {
      a = !0, i = s;
    } finally {
      try {
        !n && u.return != null && u.return();
      } finally {
        if (a) throw i;
      }
    }
    return r;
  }
}
function Vk(e) {
  if (Array.isArray(e)) return e;
}
function uO(e) {
  var t = vi(e, 2), r = t[0], n = t[1], a = r, i = n;
  return r > n && (a = n, i = r), [a, i];
}
function oO(e, t, r) {
  if (e.lte(0))
    return new be(0);
  var n = is.getDigitCount(e.toNumber()), a = new be(10).pow(n), i = e.div(a), u = n !== 1 ? 0.05 : 0.1, o = new be(Math.ceil(i.div(u).toNumber())).add(r).mul(u), s = o.mul(a);
  return t ? s : new be(Math.ceil(s));
}
function Xk(e, t, r) {
  var n = 1, a = new be(e);
  if (!a.isint() && r) {
    var i = Math.abs(e);
    i < 1 ? (n = new be(10).pow(is.getDigitCount(e) - 1), a = new be(Math.floor(a.div(n).toNumber())).mul(n)) : i > 1 && (a = new be(Math.floor(e)));
  } else e === 0 ? a = new be(Math.floor((t - 1) / 2)) : r || (a = new be(Math.floor(e)));
  var u = Math.floor((t - 1) / 2), o = jk(Bk(function(s) {
    return a.add(new be(s - u).mul(n)).toNumber();
  }), bh);
  return o(0, t);
}
function sO(e, t, r, n) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1)))
    return {
      step: new be(0),
      tickMin: new be(0),
      tickMax: new be(0)
    };
  var i = oO(new be(t).sub(e).div(r - 1), n, a), u;
  e <= 0 && t >= 0 ? u = new be(0) : (u = new be(e).add(t).div(2), u = u.sub(new be(u).mod(i)));
  var o = Math.ceil(u.sub(e).div(i).toNumber()), s = Math.ceil(new be(t).sub(u).div(i).toNumber()), c = o + s + 1;
  return c > r ? sO(e, t, r, n, a + 1) : (c < r && (s = t > 0 ? s + (r - c) : s, o = t > 0 ? o : o + (r - c)), {
    step: i,
    tickMin: u.sub(new be(o).mul(i)),
    tickMax: u.add(new be(s).mul(i))
  });
}
function Qk(e) {
  var t = vi(e, 2), r = t[0], n = t[1], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, u = Math.max(a, 2), o = uO([r, n]), s = vi(o, 2), c = s[0], l = s[1];
  if (c === -1 / 0 || l === 1 / 0) {
    var f = l === 1 / 0 ? [c].concat(gh(bh(0, a - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(gh(bh(0, a - 1).map(function() {
      return -1 / 0;
    })), [l]);
    return r > n ? yh(f) : f;
  }
  if (c === l)
    return Xk(c, a, i);
  var h = sO(c, l, u, i), p = h.step, y = h.tickMin, b = h.tickMax, m = is.rangeStep(y, b.add(new be(0.1).mul(p)), p);
  return r > n ? yh(m) : m;
}
function Zk(e, t) {
  var r = vi(e, 2), n = r[0], a = r[1], i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, u = uO([n, a]), o = vi(u, 2), s = o[0], c = o[1];
  if (s === -1 / 0 || c === 1 / 0)
    return [n, a];
  if (s === c)
    return [s];
  var l = Math.max(t, 2), f = oO(new be(c).sub(s).div(l - 1), i, 0), h = [].concat(gh(is.rangeStep(new be(s), new be(c).sub(new be(0.99).mul(f)), f)), [c]);
  return n > a ? yh(h) : h;
}
var Jk = aO(Qk), e4 = aO(Zk), t4 = "Invariant failed";
function bn(e, t) {
  throw new Error(t4);
}
var r4 = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function ra(e) {
  "@babel/helpers - typeof";
  return ra = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ra(e);
}
function Zu() {
  return Zu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Zu.apply(this, arguments);
}
function n4(e, t) {
  return o4(e) || u4(e, t) || i4(e, t) || a4();
}
function a4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function i4(e, t) {
  if (e) {
    if (typeof e == "string") return r1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return r1(e, t);
  }
}
function r1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function u4(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function o4(e) {
  if (Array.isArray(e)) return e;
}
function s4(e, t) {
  if (e == null) return {};
  var r = c4(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function c4(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function l4(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function f4(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, fO(n.key), n);
  }
}
function d4(e, t, r) {
  return t && f4(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function h4(e, t, r) {
  return t = Ju(t), p4(e, cO() ? Reflect.construct(t, r || [], Ju(e).constructor) : t.apply(e, r));
}
function p4(e, t) {
  if (t && (ra(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return m4(e);
}
function m4(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function cO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (cO = function() {
    return !!e;
  })();
}
function Ju(e) {
  return Ju = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ju(e);
}
function b4(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Eh(e, t);
}
function Eh(e, t) {
  return Eh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Eh(e, t);
}
function lO(e, t, r) {
  return t = fO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fO(e) {
  var t = y4(e, "string");
  return ra(t) == "symbol" ? t : t + "";
}
function y4(e, t) {
  if (ra(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ra(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var us = /* @__PURE__ */ (function(e) {
  function t() {
    return l4(this, t), h4(this, t, arguments);
  }
  return b4(t, e), d4(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.offset, i = n.layout, u = n.width, o = n.dataKey, s = n.data, c = n.dataPointFormatter, l = n.xAxis, f = n.yAxis, h = s4(n, r4), p = ne(h, !1);
      this.props.direction === "x" && l.type !== "number" && bn();
      var y = s.map(function(b) {
        var m = c(b, o), E = m.x, g = m.y, _ = m.value, A = m.errorVal;
        if (!A)
          return null;
        var v = [], T, S;
        if (Array.isArray(A)) {
          var I = n4(A, 2);
          T = I[0], S = I[1];
        } else
          T = S = A;
        if (i === "vertical") {
          var N = l.scale, k = g + a, D = k + u, R = k - u, L = N(_ - T), F = N(_ + S);
          v.push({
            x1: F,
            y1: D,
            x2: F,
            y2: R
          }), v.push({
            x1: L,
            y1: k,
            x2: F,
            y2: k
          }), v.push({
            x1: L,
            y1: D,
            x2: L,
            y2: R
          });
        } else if (i === "horizontal") {
          var j = f.scale, U = E + a, q = U - u, K = U + u, V = j(_ - T), J = j(_ + S);
          v.push({
            x1: q,
            y1: J,
            x2: K,
            y2: J
          }), v.push({
            x1: U,
            y1: V,
            x2: U,
            y2: J
          }), v.push({
            x1: q,
            y1: V,
            x2: K,
            y2: V
          });
        }
        return /* @__PURE__ */ C.createElement(me, Zu({
          className: "recharts-errorBar",
          key: "bar-".concat(v.map(function(te) {
            return "".concat(te.x1, "-").concat(te.x2, "-").concat(te.y1, "-").concat(te.y2);
          }))
        }, p), v.map(function(te) {
          return /* @__PURE__ */ C.createElement("line", Zu({}, te, {
            key: "line-".concat(te.x1, "-").concat(te.x2, "-").concat(te.y1, "-").concat(te.y2)
          }));
        }));
      });
      return /* @__PURE__ */ C.createElement(me, {
        className: "recharts-errorBars"
      }, y);
    }
  }]);
})(C.Component);
lO(us, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
lO(us, "displayName", "ErrorBar");
function Ei(e) {
  "@babel/helpers - typeof";
  return Ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ei(e);
}
function n1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? n1(Object(r), !0).forEach(function(n) {
      g4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function g4(e, t, r) {
  return t = v4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function v4(e) {
  var t = E4(e, "string");
  return Ei(t) == "symbol" ? t : t + "";
}
function E4(e, t) {
  if (Ei(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var dO = function(t) {
  var r = t.children, n = t.formattedGraphicalItems, a = t.legendWidth, i = t.legendContent, u = gt(r, kr);
  if (!u)
    return null;
  var o = kr.defaultProps, s = o !== void 0 ? Vr(Vr({}, o), u.props) : {}, c;
  return u.props && u.props.payload ? c = u.props && u.props.payload : i === "children" ? c = (n || []).reduce(function(l, f) {
    var h = f.item, p = f.props, y = p.sectors || p.data || [];
    return l.concat(y.map(function(b) {
      return {
        type: u.props.iconType || h.props.legendType,
        value: b.name,
        color: b.fill,
        payload: b
      };
    }));
  }, []) : c = (n || []).map(function(l) {
    var f = l.item, h = f.type.defaultProps, p = h !== void 0 ? Vr(Vr({}, h), f.props) : {}, y = p.dataKey, b = p.name, m = p.legendType, E = p.hide;
    return {
      inactive: E,
      dataKey: y,
      type: s.iconType || m || "square",
      color: g0(f),
      value: b || y,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: p
    };
  }), Vr(Vr(Vr({}, s), kr.getWithHeight(u, a)), {}, {
    payload: c,
    item: u
  });
};
function Ti(e) {
  "@babel/helpers - typeof";
  return Ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ti(e);
}
function a1(e) {
  return O4(e) || A4(e) || _4(e) || T4();
}
function T4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _4(e, t) {
  if (e) {
    if (typeof e == "string") return Th(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Th(e, t);
  }
}
function A4(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function O4(e) {
  if (Array.isArray(e)) return Th(e);
}
function Th(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function i1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? i1(Object(r), !0).forEach(function(n) {
      Wn(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : i1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Wn(e, t, r) {
  return t = S4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function S4(e) {
  var t = x4(e, "string");
  return Ti(t) == "symbol" ? t : t + "";
}
function x4(e, t) {
  if (Ti(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function et(e, t, r) {
  return ce(e) || ce(t) ? r : $e(t) ? Tt(e, t, r) : ae(t) ? t(e) : r;
}
function Qa(e, t, r, n) {
  var a = Ok(e, function(o) {
    return et(o, t);
  });
  if (r === "number") {
    var i = a.filter(function(o) {
      return z(o) || parseFloat(o);
    });
    return i.length ? [rs(i), ts(i)] : [1 / 0, -1 / 0];
  }
  var u = n ? a.filter(function(o) {
    return !ce(o);
  }) : a;
  return u.map(function(o) {
    return $e(o) || o instanceof Date ? o : "";
  });
}
var w4 = function(t) {
  var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], a = arguments.length > 2 ? arguments[2] : void 0, i = arguments.length > 3 ? arguments[3] : void 0, u = -1, o = (r = n?.length) !== null && r !== void 0 ? r : 0;
  if (o <= 1)
    return 0;
  if (i && i.axisType === "angleAxis" && Math.abs(Math.abs(i.range[1] - i.range[0]) - 360) <= 1e-6)
    for (var s = i.range, c = 0; c < o; c++) {
      var l = c > 0 ? a[c - 1].coordinate : a[o - 1].coordinate, f = a[c].coordinate, h = c >= o - 1 ? a[0].coordinate : a[c + 1].coordinate, p = void 0;
      if (it(f - l) !== it(h - f)) {
        var y = [];
        if (it(h - f) === it(s[1] - s[0])) {
          p = h;
          var b = f + s[1] - s[0];
          y[0] = Math.min(b, (b + l) / 2), y[1] = Math.max(b, (b + l) / 2);
        } else {
          p = l;
          var m = h + s[1] - s[0];
          y[0] = Math.min(f, (m + f) / 2), y[1] = Math.max(f, (m + f) / 2);
        }
        var E = [Math.min(f, (p + f) / 2), Math.max(f, (p + f) / 2)];
        if (t > E[0] && t <= E[1] || t >= y[0] && t <= y[1]) {
          u = a[c].index;
          break;
        }
      } else {
        var g = Math.min(l, h), _ = Math.max(l, h);
        if (t > (g + f) / 2 && t <= (_ + f) / 2) {
          u = a[c].index;
          break;
        }
      }
    }
  else
    for (var A = 0; A < o; A++)
      if (A === 0 && t <= (n[A].coordinate + n[A + 1].coordinate) / 2 || A > 0 && A < o - 1 && t > (n[A].coordinate + n[A - 1].coordinate) / 2 && t <= (n[A].coordinate + n[A + 1].coordinate) / 2 || A === o - 1 && t > (n[A].coordinate + n[A - 1].coordinate) / 2) {
        u = n[A].index;
        break;
      }
  return u;
}, g0 = function(t) {
  var r, n = t, a = n.type.displayName, i = (r = t.type) !== null && r !== void 0 && r.defaultProps ? Pe(Pe({}, t.type.defaultProps), t.props) : t.props, u = i.stroke, o = i.fill, s;
  switch (a) {
    case "Line":
      s = u;
      break;
    case "Area":
    case "Radar":
      s = u && u !== "none" ? u : o;
      break;
    default:
      s = o;
      break;
  }
  return s;
}, P4 = function(t) {
  var r = t.barSize, n = t.totalSize, a = t.stackGroups, i = a === void 0 ? {} : a;
  if (!i)
    return {};
  for (var u = {}, o = Object.keys(i), s = 0, c = o.length; s < c; s++)
    for (var l = i[o[s]].stackGroups, f = Object.keys(l), h = 0, p = f.length; h < p; h++) {
      var y = l[f[h]], b = y.items, m = y.cateAxisId, E = b.filter(function(S) {
        return hr(S.type).indexOf("Bar") >= 0;
      });
      if (E && E.length) {
        var g = E[0].type.defaultProps, _ = g !== void 0 ? Pe(Pe({}, g), E[0].props) : E[0].props, A = _.barSize, v = _[m];
        u[v] || (u[v] = []);
        var T = ce(A) ? r : A;
        u[v].push({
          item: E[0],
          stackList: E.slice(1),
          barSize: ce(T) ? void 0 : ut(T, n, 0)
        });
      }
    }
  return u;
}, I4 = function(t) {
  var r = t.barGap, n = t.barCategoryGap, a = t.bandSize, i = t.sizeList, u = i === void 0 ? [] : i, o = t.maxBarSize, s = u.length;
  if (s < 1) return null;
  var c = ut(r, a, 0, !0), l, f = [];
  if (u[0].barSize === +u[0].barSize) {
    var h = !1, p = a / s, y = u.reduce(function(A, v) {
      return A + v.barSize || 0;
    }, 0);
    y += (s - 1) * c, y >= a && (y -= (s - 1) * c, c = 0), y >= a && p > 0 && (h = !0, p *= 0.9, y = s * p);
    var b = (a - y) / 2 >> 0, m = {
      offset: b - c,
      size: 0
    };
    l = u.reduce(function(A, v) {
      var T = {
        item: v.item,
        position: {
          offset: m.offset + m.size + c,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: h ? p : v.barSize
        }
      }, S = [].concat(a1(A), [T]);
      return m = S[S.length - 1].position, v.stackList && v.stackList.length && v.stackList.forEach(function(I) {
        S.push({
          item: I,
          position: m
        });
      }), S;
    }, f);
  } else {
    var E = ut(n, a, 0, !0);
    a - 2 * E - (s - 1) * c <= 0 && (c = 0);
    var g = (a - 2 * E - (s - 1) * c) / s;
    g > 1 && (g >>= 0);
    var _ = o === +o ? Math.min(g, o) : g;
    l = u.reduce(function(A, v, T) {
      var S = [].concat(a1(A), [{
        item: v.item,
        position: {
          offset: E + (g + c) * T + (g - _) / 2,
          size: _
        }
      }]);
      return v.stackList && v.stackList.length && v.stackList.forEach(function(I) {
        S.push({
          item: I,
          position: S[S.length - 1].position
        });
      }), S;
    }, f);
  }
  return l;
}, C4 = function(t, r, n, a) {
  var i = n.children, u = n.width, o = n.margin, s = u - (o.left || 0) - (o.right || 0), c = dO({
    children: i,
    legendWidth: s
  });
  if (c) {
    var l = a || {}, f = l.width, h = l.height, p = c.align, y = c.verticalAlign, b = c.layout;
    if ((b === "vertical" || b === "horizontal" && y === "middle") && p !== "center" && z(t[p]))
      return Pe(Pe({}, t), {}, Wn({}, p, t[p] + (f || 0)));
    if ((b === "horizontal" || b === "vertical" && p === "center") && y !== "middle" && z(t[y]))
      return Pe(Pe({}, t), {}, Wn({}, y, t[y] + (h || 0)));
  }
  return t;
}, N4 = function(t, r, n) {
  return ce(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0;
}, hO = function(t, r, n, a, i) {
  var u = r.props.children, o = Dt(u, us).filter(function(c) {
    return N4(a, i, c.props.direction);
  });
  if (o && o.length) {
    var s = o.map(function(c) {
      return c.props.dataKey;
    });
    return t.reduce(function(c, l) {
      var f = et(l, n);
      if (ce(f)) return c;
      var h = Array.isArray(f) ? [rs(f), ts(f)] : [f, f], p = s.reduce(function(y, b) {
        var m = et(l, b, 0), E = h[0] - Math.abs(Array.isArray(m) ? m[0] : m), g = h[1] + Math.abs(Array.isArray(m) ? m[1] : m);
        return [Math.min(E, y[0]), Math.max(g, y[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(p[0], c[0]), Math.max(p[1], c[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, R4 = function(t, r, n, a, i) {
  var u = r.map(function(o) {
    return hO(t, o, n, i, a);
  }).filter(function(o) {
    return !ce(o);
  });
  return u && u.length ? u.reduce(function(o, s) {
    return [Math.min(o[0], s[0]), Math.max(o[1], s[1])];
  }, [1 / 0, -1 / 0]) : null;
}, pO = function(t, r, n, a, i) {
  var u = r.map(function(s) {
    var c = s.props.dataKey;
    return n === "number" && c && hO(t, s, c, a) || Qa(t, c, n, i);
  });
  if (n === "number")
    return u.reduce(
      // @ts-expect-error if (type === number) means that the domain is numerical type
      // - but this link is missing in the type definition
      function(s, c) {
        return [Math.min(s[0], c[0]), Math.max(s[1], c[1])];
      },
      [1 / 0, -1 / 0]
    );
  var o = {};
  return u.reduce(function(s, c) {
    for (var l = 0, f = c.length; l < f; l++)
      o[c[l]] || (o[c[l]] = !0, s.push(c[l]));
    return s;
  }, []);
}, mO = function(t, r) {
  return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis";
}, bO = function(t, r, n, a) {
  if (a)
    return t.map(function(s) {
      return s.coordinate;
    });
  var i, u, o = t.map(function(s) {
    return s.coordinate === r && (i = !0), s.coordinate === n && (u = !0), s.coordinate;
  });
  return i || o.push(r), u || o.push(n), o;
}, cr = function(t, r, n) {
  if (!t) return null;
  var a = t.scale, i = t.duplicateDomain, u = t.type, o = t.range, s = t.realScaleType === "scaleBand" ? a.bandwidth() / 2 : 2, c = (r || n) && u === "category" && a.bandwidth ? a.bandwidth() / s : 0;
  if (c = t.axisType === "angleAxis" && o?.length >= 2 ? it(o[0] - o[1]) * 2 * c : c, r && (t.ticks || t.niceTicks)) {
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
      return !Yi(f.coordinate);
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
}, Xf = /* @__PURE__ */ new WeakMap(), hu = function(t, r) {
  if (typeof r != "function")
    return t;
  Xf.has(t) || Xf.set(t, /* @__PURE__ */ new WeakMap());
  var n = Xf.get(t);
  if (n.has(r))
    return n.get(r);
  var a = function() {
    t.apply(void 0, arguments), r.apply(void 0, arguments);
  };
  return n.set(r, a), a;
}, yO = function(t, r, n) {
  var a = t.scale, i = t.type, u = t.layout, o = t.axisType;
  if (a === "auto")
    return u === "radial" && o === "radiusAxis" ? {
      scale: hi(),
      realScaleType: "band"
    } : u === "radial" && o === "angleAxis" ? {
      scale: Gu(),
      realScaleType: "linear"
    } : i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: Xa(),
      realScaleType: "point"
    } : i === "category" ? {
      scale: hi(),
      realScaleType: "band"
    } : {
      scale: Gu(),
      realScaleType: "linear"
    };
  if (dn(a)) {
    var s = "scale".concat($o(a));
    return {
      scale: (Wv[s] || Xa)(),
      realScaleType: Wv[s] ? s : "point"
    };
  }
  return ae(a) ? {
    scale: a
  } : {
    scale: Xa(),
    realScaleType: "point"
  };
}, u1 = 1e-4, gO = function(t) {
  var r = t.domain();
  if (!(!r || r.length <= 2)) {
    var n = r.length, a = t.range(), i = Math.min(a[0], a[1]) - u1, u = Math.max(a[0], a[1]) + u1, o = t(r[0]), s = t(r[n - 1]);
    (o < i || o > u || s < i || s > u) && t.domain([r[0], r[n - 1]]);
  }
}, D4 = function(t, r) {
  if (!t)
    return null;
  for (var n = 0, a = t.length; n < a; n++)
    if (t[n].item === r)
      return t[n].position;
  return null;
}, M4 = function(t, r) {
  if (!r || r.length !== 2 || !z(r[0]) || !z(r[1]))
    return t;
  var n = Math.min(r[0], r[1]), a = Math.max(r[0], r[1]), i = [t[0], t[1]];
  return (!z(t[0]) || t[0] < n) && (i[0] = n), (!z(t[1]) || t[1] > a) && (i[1] = a), i[0] > a && (i[0] = a), i[1] < n && (i[1] = n), i;
}, L4 = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, u = 0, o = 0; o < r; ++o) {
        var s = Yi(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
        s >= 0 ? (t[o][n][0] = i, t[o][n][1] = i + s, i = t[o][n][1]) : (t[o][n][0] = u, t[o][n][1] = u + s, u = t[o][n][1]);
      }
}, k4 = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, u = 0; u < r; ++u) {
        var o = Yi(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
        o >= 0 ? (t[u][n][0] = i, t[u][n][1] = i + o, i = t[u][n][1]) : (t[u][n][0] = 0, t[u][n][1] = 0);
      }
}, B4 = {
  sign: L4,
  // @ts-expect-error definitelytyped types are incorrect
  expand: O3,
  // @ts-expect-error definitelytyped types are incorrect
  none: Kn,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: S3,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: x3,
  positive: k4
}, j4 = function(t, r, n) {
  var a = r.map(function(o) {
    return o.props.dataKey;
  }), i = B4[n], u = A3().keys(a).value(function(o, s) {
    return +et(o, s, 0);
  }).order(Qd).offset(i);
  return u(t);
}, F4 = function(t, r, n, a, i, u) {
  if (!t)
    return null;
  var o = u ? r.reverse() : r, s = {}, c = o.reduce(function(f, h) {
    var p, y = (p = h.type) !== null && p !== void 0 && p.defaultProps ? Pe(Pe({}, h.type.defaultProps), h.props) : h.props, b = y.stackId, m = y.hide;
    if (m)
      return f;
    var E = y[n], g = f[E] || {
      hasStack: !1,
      stackGroups: {}
    };
    if ($e(b)) {
      var _ = g.stackGroups[b] || {
        numericAxisId: n,
        cateAxisId: a,
        items: []
      };
      _.items.push(h), g.hasStack = !0, g.stackGroups[b] = _;
    } else
      g.stackGroups[zi("_stackId_")] = {
        numericAxisId: n,
        cateAxisId: a,
        items: [h]
      };
    return Pe(Pe({}, f), {}, Wn({}, E, g));
  }, s), l = {};
  return Object.keys(c).reduce(function(f, h) {
    var p = c[h];
    if (p.hasStack) {
      var y = {};
      p.stackGroups = Object.keys(p.stackGroups).reduce(function(b, m) {
        var E = p.stackGroups[m];
        return Pe(Pe({}, b), {}, Wn({}, m, {
          numericAxisId: n,
          cateAxisId: a,
          items: E.items,
          stackedData: j4(t, E.items, i)
        }));
      }, y);
    }
    return Pe(Pe({}, f), {}, Wn({}, h, p));
  }, l);
}, vO = function(t, r) {
  var n = r.realScaleType, a = r.type, i = r.tickCount, u = r.originalDomain, o = r.allowDecimals, s = n || r.scale;
  if (s !== "auto" && s !== "linear")
    return null;
  if (i && a === "number" && u && (u[0] === "auto" || u[1] === "auto")) {
    var c = t.domain();
    if (!c.length)
      return null;
    var l = Jk(c, i, o);
    return t.domain([rs(l), ts(l)]), {
      niceTicks: l
    };
  }
  if (i && a === "number") {
    var f = t.domain(), h = e4(f, i, o);
    return {
      niceTicks: h
    };
  }
  return null;
}, o1 = function(t) {
  var r = t.axis, n = t.ticks, a = t.offset, i = t.bandSize, u = t.entry, o = t.index;
  if (r.type === "category")
    return n[o] ? n[o].coordinate + a : null;
  var s = et(u, r.dataKey, r.domain[o]);
  return ce(s) ? null : r.scale(s) - i / 2 + a;
}, $4 = function(t) {
  var r = t.numericAxis, n = r.scale.domain();
  if (r.type === "number") {
    var a = Math.min(n[0], n[1]), i = Math.max(n[0], n[1]);
    return a <= 0 && i >= 0 ? 0 : i < 0 ? i : a;
  }
  return n[0];
}, U4 = function(t, r) {
  var n, a = (n = t.type) !== null && n !== void 0 && n.defaultProps ? Pe(Pe({}, t.type.defaultProps), t.props) : t.props, i = a.stackId;
  if ($e(i)) {
    var u = r[i];
    if (u) {
      var o = u.items.indexOf(t);
      return o >= 0 ? u.stackedData[o] : null;
    }
  }
  return null;
}, H4 = function(t) {
  return t.reduce(function(r, n) {
    return [rs(n.concat([r[0]]).filter(z)), ts(n.concat([r[1]]).filter(z))];
  }, [1 / 0, -1 / 0]);
}, EO = function(t, r, n) {
  return Object.keys(t).reduce(function(a, i) {
    var u = t[i], o = u.stackedData, s = o.reduce(function(c, l) {
      var f = H4(l.slice(r, n + 1));
      return [Math.min(c[0], f[0]), Math.max(c[1], f[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(s[0], a[0]), Math.max(s[1], a[1])];
  }, [1 / 0, -1 / 0]).map(function(a) {
    return a === 1 / 0 || a === -1 / 0 ? 0 : a;
  });
}, s1 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, c1 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, _h = function(t, r, n) {
  if (ae(t))
    return t(r, n);
  if (!Array.isArray(t))
    return r;
  var a = [];
  if (z(t[0]))
    a[0] = n ? t[0] : Math.min(t[0], r[0]);
  else if (s1.test(t[0])) {
    var i = +s1.exec(t[0])[1];
    a[0] = r[0] - i;
  } else ae(t[0]) ? a[0] = t[0](r[0]) : a[0] = r[0];
  if (z(t[1]))
    a[1] = n ? t[1] : Math.max(t[1], r[1]);
  else if (c1.test(t[1])) {
    var u = +c1.exec(t[1])[1];
    a[1] = r[1] + u;
  } else ae(t[1]) ? a[1] = t[1](r[1]) : a[1] = r[1];
  return a;
}, eo = function(t, r, n) {
  if (t && t.scale && t.scale.bandwidth) {
    var a = t.scale.bandwidth();
    if (!n || a > 0)
      return a;
  }
  if (t && r && r.length >= 2) {
    for (var i = zp(r, function(f) {
      return f.coordinate;
    }), u = 1 / 0, o = 1, s = i.length; o < s; o++) {
      var c = i[o], l = i[o - 1];
      u = Math.min((c.coordinate || 0) - (l.coordinate || 0), u);
    }
    return u === 1 / 0 ? 0 : u;
  }
  return n ? void 0 : 0;
}, l1 = function(t, r, n) {
  return !t || !t.length || ns(t, Tt(n, "type.defaultProps.domain")) ? r : t;
}, TO = function(t, r) {
  var n = t.type.defaultProps ? Pe(Pe({}, t.type.defaultProps), t.props) : t.props, a = n.dataKey, i = n.name, u = n.unit, o = n.formatter, s = n.tooltipType, c = n.chartType, l = n.hide;
  return Pe(Pe({}, ne(t, !1)), {}, {
    dataKey: a,
    unit: u,
    formatter: o,
    name: i || a,
    color: g0(t),
    value: et(r, a),
    type: s,
    payload: r,
    chartType: c,
    hide: l
  });
};
function _i(e) {
  "@babel/helpers - typeof";
  return _i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _i(e);
}
function f1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ir(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? f1(Object(r), !0).forEach(function(n) {
      _O(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : f1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _O(e, t, r) {
  return t = q4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function q4(e) {
  var t = W4(e, "string");
  return _i(t) == "symbol" ? t : t + "";
}
function W4(e, t) {
  if (_i(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (_i(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Y4(e, t) {
  return V4(e) || K4(e, t) || G4(e, t) || z4();
}
function z4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function G4(e, t) {
  if (e) {
    if (typeof e == "string") return d1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return d1(e, t);
  }
}
function d1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function K4(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function V4(e) {
  if (Array.isArray(e)) return e;
}
var to = Math.PI / 180, X4 = function(t) {
  return t * 180 / Math.PI;
}, Te = function(t, r, n, a) {
  return {
    x: t + Math.cos(-to * a) * n,
    y: r + Math.sin(-to * a) * n
  };
}, AO = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, Q4 = function(t, r, n, a, i) {
  var u = t.width, o = t.height, s = t.startAngle, c = t.endAngle, l = ut(t.cx, u, u / 2), f = ut(t.cy, o, o / 2), h = AO(u, o, n), p = ut(t.innerRadius, h, 0), y = ut(t.outerRadius, h, h * 0.8), b = Object.keys(r);
  return b.reduce(function(m, E) {
    var g = r[E], _ = g.domain, A = g.reversed, v;
    if (ce(g.range))
      a === "angleAxis" ? v = [s, c] : a === "radiusAxis" && (v = [p, y]), A && (v = [v[1], v[0]]);
    else {
      v = g.range;
      var T = v, S = Y4(T, 2);
      s = S[0], c = S[1];
    }
    var I = yO(g, i), N = I.realScaleType, k = I.scale;
    k.domain(_).range(v), gO(k);
    var D = vO(k, ir(ir({}, g), {}, {
      realScaleType: N
    })), R = ir(ir(ir({}, g), D), {}, {
      range: v,
      radius: y,
      realScaleType: N,
      scale: k,
      cx: l,
      cy: f,
      innerRadius: p,
      outerRadius: y,
      startAngle: s,
      endAngle: c
    });
    return ir(ir({}, m), {}, _O({}, E, R));
  }, {});
}, Z4 = function(t, r) {
  var n = t.x, a = t.y, i = r.x, u = r.y;
  return Math.sqrt(Math.pow(n - i, 2) + Math.pow(a - u, 2));
}, J4 = function(t, r) {
  var n = t.x, a = t.y, i = r.cx, u = r.cy, o = Z4({
    x: n,
    y: a
  }, {
    x: i,
    y: u
  });
  if (o <= 0)
    return {
      radius: o
    };
  var s = (n - i) / o, c = Math.acos(s);
  return a > u && (c = 2 * Math.PI - c), {
    radius: o,
    angle: X4(c),
    angleInRadian: c
  };
}, e8 = function(t) {
  var r = t.startAngle, n = t.endAngle, a = Math.floor(r / 360), i = Math.floor(n / 360), u = Math.min(a, i);
  return {
    startAngle: r - u * 360,
    endAngle: n - u * 360
  };
}, t8 = function(t, r) {
  var n = r.startAngle, a = r.endAngle, i = Math.floor(n / 360), u = Math.floor(a / 360), o = Math.min(i, u);
  return t + o * 360;
}, h1 = function(t, r) {
  var n = t.x, a = t.y, i = J4({
    x: n,
    y: a
  }, r), u = i.radius, o = i.angle, s = r.innerRadius, c = r.outerRadius;
  if (u < s || u > c)
    return !1;
  if (u === 0)
    return !0;
  var l = e8(r), f = l.startAngle, h = l.endAngle, p = o, y;
  if (f <= h) {
    for (; p > h; )
      p -= 360;
    for (; p < f; )
      p += 360;
    y = p >= f && p <= h;
  } else {
    for (; p > f; )
      p -= 360;
    for (; p < h; )
      p += 360;
    y = p >= h && p <= f;
  }
  return y ? ir(ir({}, r), {}, {
    radius: u,
    angle: t8(p, r)
  }) : null;
}, OO = function(t) {
  return !/* @__PURE__ */ Ct(t) && !ae(t) && typeof t != "boolean" ? t.className : "";
};
function Ai(e) {
  "@babel/helpers - typeof";
  return Ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ai(e);
}
var r8 = ["offset"];
function n8(e) {
  return o8(e) || u8(e) || i8(e) || a8();
}
function a8() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function i8(e, t) {
  if (e) {
    if (typeof e == "string") return Ah(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ah(e, t);
  }
}
function u8(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function o8(e) {
  if (Array.isArray(e)) return Ah(e);
}
function Ah(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function s8(e, t) {
  if (e == null) return {};
  var r = c8(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function c8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function p1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function je(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? p1(Object(r), !0).forEach(function(n) {
      l8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : p1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function l8(e, t, r) {
  return t = f8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function f8(e) {
  var t = d8(e, "string");
  return Ai(t) == "symbol" ? t : t + "";
}
function d8(e, t) {
  if (Ai(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ai(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Oi() {
  return Oi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Oi.apply(this, arguments);
}
var h8 = function(t) {
  var r = t.value, n = t.formatter, a = ce(t.children) ? r : t.children;
  return ae(n) ? n(a) : a;
}, p8 = function(t, r) {
  var n = it(r - t), a = Math.min(Math.abs(r - t), 360);
  return n * a;
}, m8 = function(t, r, n) {
  var a = t.position, i = t.viewBox, u = t.offset, o = t.className, s = i, c = s.cx, l = s.cy, f = s.innerRadius, h = s.outerRadius, p = s.startAngle, y = s.endAngle, b = s.clockWise, m = (f + h) / 2, E = p8(p, y), g = E >= 0 ? 1 : -1, _, A;
  a === "insideStart" ? (_ = p + g * u, A = b) : a === "insideEnd" ? (_ = y - g * u, A = !b) : a === "end" && (_ = y + g * u, A = b), A = E <= 0 ? A : !A;
  var v = Te(c, l, m, _), T = Te(c, l, m, _ + (A ? 1 : -1) * 359), S = "M".concat(v.x, ",").concat(v.y, `
    A`).concat(m, ",").concat(m, ",0,1,").concat(A ? 0 : 1, `,
    `).concat(T.x, ",").concat(T.y), I = ce(t.id) ? zi("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ C.createElement("text", Oi({}, n, {
    dominantBaseline: "central",
    className: se("recharts-radial-bar-label", o)
  }), /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("path", {
    id: I,
    d: S
  })), /* @__PURE__ */ C.createElement("textPath", {
    xlinkHref: "#".concat(I)
  }, r));
}, b8 = function(t) {
  var r = t.viewBox, n = t.offset, a = t.position, i = r, u = i.cx, o = i.cy, s = i.innerRadius, c = i.outerRadius, l = i.startAngle, f = i.endAngle, h = (l + f) / 2;
  if (a === "outside") {
    var p = Te(u, o, c + n, h), y = p.x, b = p.y;
    return {
      x: y,
      y: b,
      textAnchor: y >= u ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (a === "center")
    return {
      x: u,
      y: o,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (a === "centerTop")
    return {
      x: u,
      y: o,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (a === "centerBottom")
    return {
      x: u,
      y: o,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var m = (s + c) / 2, E = Te(u, o, m, h), g = E.x, _ = E.y;
  return {
    x: g,
    y: _,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, y8 = function(t) {
  var r = t.viewBox, n = t.parentViewBox, a = t.offset, i = t.position, u = r, o = u.x, s = u.y, c = u.width, l = u.height, f = l >= 0 ? 1 : -1, h = f * a, p = f > 0 ? "end" : "start", y = f > 0 ? "start" : "end", b = c >= 0 ? 1 : -1, m = b * a, E = b > 0 ? "end" : "start", g = b > 0 ? "start" : "end";
  if (i === "top") {
    var _ = {
      x: o + c / 2,
      y: s - f * a,
      textAnchor: "middle",
      verticalAnchor: p
    };
    return je(je({}, _), n ? {
      height: Math.max(s - n.y, 0),
      width: c
    } : {});
  }
  if (i === "bottom") {
    var A = {
      x: o + c / 2,
      y: s + l + h,
      textAnchor: "middle",
      verticalAnchor: y
    };
    return je(je({}, A), n ? {
      height: Math.max(n.y + n.height - (s + l), 0),
      width: c
    } : {});
  }
  if (i === "left") {
    var v = {
      x: o - m,
      y: s + l / 2,
      textAnchor: E,
      verticalAnchor: "middle"
    };
    return je(je({}, v), n ? {
      width: Math.max(v.x - n.x, 0),
      height: l
    } : {});
  }
  if (i === "right") {
    var T = {
      x: o + c + m,
      y: s + l / 2,
      textAnchor: g,
      verticalAnchor: "middle"
    };
    return je(je({}, T), n ? {
      width: Math.max(n.x + n.width - T.x, 0),
      height: l
    } : {});
  }
  var S = n ? {
    width: c,
    height: l
  } : {};
  return i === "insideLeft" ? je({
    x: o + m,
    y: s + l / 2,
    textAnchor: g,
    verticalAnchor: "middle"
  }, S) : i === "insideRight" ? je({
    x: o + c - m,
    y: s + l / 2,
    textAnchor: E,
    verticalAnchor: "middle"
  }, S) : i === "insideTop" ? je({
    x: o + c / 2,
    y: s + h,
    textAnchor: "middle",
    verticalAnchor: y
  }, S) : i === "insideBottom" ? je({
    x: o + c / 2,
    y: s + l - h,
    textAnchor: "middle",
    verticalAnchor: p
  }, S) : i === "insideTopLeft" ? je({
    x: o + m,
    y: s + h,
    textAnchor: g,
    verticalAnchor: y
  }, S) : i === "insideTopRight" ? je({
    x: o + c - m,
    y: s + h,
    textAnchor: E,
    verticalAnchor: y
  }, S) : i === "insideBottomLeft" ? je({
    x: o + m,
    y: s + l - h,
    textAnchor: g,
    verticalAnchor: p
  }, S) : i === "insideBottomRight" ? je({
    x: o + c - m,
    y: s + l - h,
    textAnchor: E,
    verticalAnchor: p
  }, S) : Ea(i) && (z(i.x) || tn(i.x)) && (z(i.y) || tn(i.y)) ? je({
    x: o + ut(i.x, c),
    y: s + ut(i.y, l),
    textAnchor: "end",
    verticalAnchor: "end"
  }, S) : je({
    x: o + c / 2,
    y: s + l / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, S);
}, g8 = function(t) {
  return "cx" in t && z(t.cx);
};
function Ye(e) {
  var t = e.offset, r = t === void 0 ? 5 : t, n = s8(e, r8), a = je({
    offset: r
  }, n), i = a.viewBox, u = a.position, o = a.value, s = a.children, c = a.content, l = a.className, f = l === void 0 ? "" : l, h = a.textBreakAll;
  if (!i || ce(o) && ce(s) && !/* @__PURE__ */ Ct(c) && !ae(c))
    return null;
  if (/* @__PURE__ */ Ct(c))
    return /* @__PURE__ */ De(c, a);
  var p;
  if (ae(c)) {
    if (p = /* @__PURE__ */ ti(c, a), /* @__PURE__ */ Ct(p))
      return p;
  } else
    p = h8(a);
  var y = g8(i), b = ne(a, !0);
  if (y && (u === "insideStart" || u === "insideEnd" || u === "end"))
    return m8(a, p, b);
  var m = y ? b8(a) : y8(a);
  return /* @__PURE__ */ C.createElement(pn, Oi({
    className: se("recharts-label", f)
  }, b, m, {
    breakAll: h
  }), p);
}
Ye.displayName = "Label";
var SO = function(t) {
  var r = t.cx, n = t.cy, a = t.angle, i = t.startAngle, u = t.endAngle, o = t.r, s = t.radius, c = t.innerRadius, l = t.outerRadius, f = t.x, h = t.y, p = t.top, y = t.left, b = t.width, m = t.height, E = t.clockWise, g = t.labelViewBox;
  if (g)
    return g;
  if (z(b) && z(m)) {
    if (z(f) && z(h))
      return {
        x: f,
        y: h,
        width: b,
        height: m
      };
    if (z(p) && z(y))
      return {
        x: p,
        y,
        width: b,
        height: m
      };
  }
  return z(f) && z(h) ? {
    x: f,
    y: h,
    width: 0,
    height: 0
  } : z(r) && z(n) ? {
    cx: r,
    cy: n,
    startAngle: i || a || 0,
    endAngle: u || a || 0,
    innerRadius: c || 0,
    outerRadius: l || s || o || 0,
    clockWise: E
  } : t.viewBox ? t.viewBox : {};
}, v8 = function(t, r) {
  return t ? t === !0 ? /* @__PURE__ */ C.createElement(Ye, {
    key: "label-implicit",
    viewBox: r
  }) : $e(t) ? /* @__PURE__ */ C.createElement(Ye, {
    key: "label-implicit",
    viewBox: r,
    value: t
  }) : /* @__PURE__ */ Ct(t) ? t.type === Ye ? /* @__PURE__ */ De(t, {
    key: "label-implicit",
    viewBox: r
  }) : /* @__PURE__ */ C.createElement(Ye, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : ae(t) ? /* @__PURE__ */ C.createElement(Ye, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : Ea(t) ? /* @__PURE__ */ C.createElement(Ye, Oi({
    viewBox: r
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, E8 = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && n && !t.label)
    return null;
  var a = t.children, i = SO(t), u = Dt(a, Ye).map(function(s, c) {
    return /* @__PURE__ */ De(s, {
      viewBox: r || i,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(c)
    });
  });
  if (!n)
    return u;
  var o = v8(t.label, r || i);
  return [o].concat(n8(u));
};
Ye.parseViewBox = SO;
Ye.renderCallByParent = E8;
var Qf, m1;
function T8() {
  if (m1) return Qf;
  m1 = 1;
  function e(t) {
    var r = t == null ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  }
  return Qf = e, Qf;
}
var _8 = T8();
const A8 = /* @__PURE__ */ ye(_8);
function Si(e) {
  "@babel/helpers - typeof";
  return Si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Si(e);
}
var O8 = ["valueAccessor"], S8 = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function x8(e) {
  return C8(e) || I8(e) || P8(e) || w8();
}
function w8() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function P8(e, t) {
  if (e) {
    if (typeof e == "string") return Oh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Oh(e, t);
  }
}
function I8(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function C8(e) {
  if (Array.isArray(e)) return Oh(e);
}
function Oh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function ro() {
  return ro = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ro.apply(this, arguments);
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
function y1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? b1(Object(r), !0).forEach(function(n) {
      N8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : b1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function N8(e, t, r) {
  return t = R8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function R8(e) {
  var t = D8(e, "string");
  return Si(t) == "symbol" ? t : t + "";
}
function D8(e, t) {
  if (Si(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Si(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function g1(e, t) {
  if (e == null) return {};
  var r = M8(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function M8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var L8 = function(t) {
  return Array.isArray(t.value) ? A8(t.value) : t.value;
};
function Ht(e) {
  var t = e.valueAccessor, r = t === void 0 ? L8 : t, n = g1(e, O8), a = n.data, i = n.dataKey, u = n.clockWise, o = n.id, s = n.textBreakAll, c = g1(n, S8);
  return !a || !a.length ? null : /* @__PURE__ */ C.createElement(me, {
    className: "recharts-label-list"
  }, a.map(function(l, f) {
    var h = ce(i) ? r(l, f) : et(l && l.payload, i), p = ce(o) ? {} : {
      id: "".concat(o, "-").concat(f)
    };
    return /* @__PURE__ */ C.createElement(Ye, ro({}, ne(l, !0), c, p, {
      parentViewBox: l.parentViewBox,
      value: h,
      textBreakAll: s,
      viewBox: Ye.parseViewBox(ce(u) ? l : y1(y1({}, l), {}, {
        clockWise: u
      })),
      key: "label-".concat(f),
      index: f
    }));
  }));
}
Ht.displayName = "LabelList";
function k8(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ C.createElement(Ht, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ C.isValidElement(e) || ae(e) ? /* @__PURE__ */ C.createElement(Ht, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : Ea(e) ? /* @__PURE__ */ C.createElement(Ht, ro({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function B8(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label)
    return null;
  var n = e.children, a = Dt(n, Ht).map(function(u, o) {
    return /* @__PURE__ */ De(u, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(o)
    });
  });
  if (!r)
    return a;
  var i = k8(e.label, t);
  return [i].concat(x8(a));
}
Ht.renderCallByParent = B8;
function xi(e) {
  "@babel/helpers - typeof";
  return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xi(e);
}
function Sh() {
  return Sh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Sh.apply(this, arguments);
}
function v1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function E1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? v1(Object(r), !0).forEach(function(n) {
      j8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : v1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function j8(e, t, r) {
  return t = F8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function F8(e) {
  var t = $8(e, "string");
  return xi(t) == "symbol" ? t : t + "";
}
function $8(e, t) {
  if (xi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (xi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var U8 = function(t, r) {
  var n = it(r - t), a = Math.min(Math.abs(r - t), 359.999);
  return n * a;
}, pu = function(t) {
  var r = t.cx, n = t.cy, a = t.radius, i = t.angle, u = t.sign, o = t.isExternal, s = t.cornerRadius, c = t.cornerIsExternal, l = s * (o ? 1 : -1) + a, f = Math.asin(s / l) / to, h = c ? i : i + u * f, p = Te(r, n, l, h), y = Te(r, n, a, h), b = c ? i - u * f : i, m = Te(r, n, l * Math.cos(f * to), b);
  return {
    center: p,
    circleTangency: y,
    lineTangency: m,
    theta: f
  };
}, xO = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, u = t.startAngle, o = t.endAngle, s = U8(u, o), c = u + s, l = Te(r, n, i, u), f = Te(r, n, i, c), h = "M ".concat(l.x, ",").concat(l.y, `
    A `).concat(i, ",").concat(i, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(u > c), `,
    `).concat(f.x, ",").concat(f.y, `
  `);
  if (a > 0) {
    var p = Te(r, n, a, u), y = Te(r, n, a, c);
    h += "L ".concat(y.x, ",").concat(y.y, `
            A `).concat(a, ",").concat(a, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(u <= c), `,
            `).concat(p.x, ",").concat(p.y, " Z");
  } else
    h += "L ".concat(r, ",").concat(n, " Z");
  return h;
}, H8 = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, u = t.cornerRadius, o = t.forceCornerRadius, s = t.cornerIsExternal, c = t.startAngle, l = t.endAngle, f = it(l - c), h = pu({
    cx: r,
    cy: n,
    radius: i,
    angle: c,
    sign: f,
    cornerRadius: u,
    cornerIsExternal: s
  }), p = h.circleTangency, y = h.lineTangency, b = h.theta, m = pu({
    cx: r,
    cy: n,
    radius: i,
    angle: l,
    sign: -f,
    cornerRadius: u,
    cornerIsExternal: s
  }), E = m.circleTangency, g = m.lineTangency, _ = m.theta, A = s ? Math.abs(c - l) : Math.abs(c - l) - b - _;
  if (A < 0)
    return o ? "M ".concat(y.x, ",").concat(y.y, `
        a`).concat(u, ",").concat(u, ",0,0,1,").concat(u * 2, `,0
        a`).concat(u, ",").concat(u, ",0,0,1,").concat(-u * 2, `,0
      `) : xO({
      cx: r,
      cy: n,
      innerRadius: a,
      outerRadius: i,
      startAngle: c,
      endAngle: l
    });
  var v = "M ".concat(y.x, ",").concat(y.y, `
    A`).concat(u, ",").concat(u, ",0,0,").concat(+(f < 0), ",").concat(p.x, ",").concat(p.y, `
    A`).concat(i, ",").concat(i, ",0,").concat(+(A > 180), ",").concat(+(f < 0), ",").concat(E.x, ",").concat(E.y, `
    A`).concat(u, ",").concat(u, ",0,0,").concat(+(f < 0), ",").concat(g.x, ",").concat(g.y, `
  `);
  if (a > 0) {
    var T = pu({
      cx: r,
      cy: n,
      radius: a,
      angle: c,
      sign: f,
      isExternal: !0,
      cornerRadius: u,
      cornerIsExternal: s
    }), S = T.circleTangency, I = T.lineTangency, N = T.theta, k = pu({
      cx: r,
      cy: n,
      radius: a,
      angle: l,
      sign: -f,
      isExternal: !0,
      cornerRadius: u,
      cornerIsExternal: s
    }), D = k.circleTangency, R = k.lineTangency, L = k.theta, F = s ? Math.abs(c - l) : Math.abs(c - l) - N - L;
    if (F < 0 && u === 0)
      return "".concat(v, "L").concat(r, ",").concat(n, "Z");
    v += "L".concat(R.x, ",").concat(R.y, `
      A`).concat(u, ",").concat(u, ",0,0,").concat(+(f < 0), ",").concat(D.x, ",").concat(D.y, `
      A`).concat(a, ",").concat(a, ",0,").concat(+(F > 180), ",").concat(+(f > 0), ",").concat(S.x, ",").concat(S.y, `
      A`).concat(u, ",").concat(u, ",0,0,").concat(+(f < 0), ",").concat(I.x, ",").concat(I.y, "Z");
  } else
    v += "L".concat(r, ",").concat(n, "Z");
  return v;
}, q8 = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, wO = function(t) {
  var r = E1(E1({}, q8), t), n = r.cx, a = r.cy, i = r.innerRadius, u = r.outerRadius, o = r.cornerRadius, s = r.forceCornerRadius, c = r.cornerIsExternal, l = r.startAngle, f = r.endAngle, h = r.className;
  if (u < i || l === f)
    return null;
  var p = se("recharts-sector", h), y = u - i, b = ut(o, y, 0, !0), m;
  return b > 0 && Math.abs(l - f) < 360 ? m = H8({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: u,
    cornerRadius: Math.min(b, y / 2),
    forceCornerRadius: s,
    cornerIsExternal: c,
    startAngle: l,
    endAngle: f
  }) : m = xO({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: u,
    startAngle: l,
    endAngle: f
  }), /* @__PURE__ */ C.createElement("path", Sh({}, ne(r, !0), {
    className: p,
    d: m,
    role: "img"
  }));
};
function wi(e) {
  "@babel/helpers - typeof";
  return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, wi(e);
}
function xh() {
  return xh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, xh.apply(this, arguments);
}
function T1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? T1(Object(r), !0).forEach(function(n) {
      W8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : T1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function W8(e, t, r) {
  return t = Y8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Y8(e) {
  var t = z8(e, "string");
  return wi(t) == "symbol" ? t : t + "";
}
function z8(e, t) {
  if (wi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var A1 = {
  curveBasisClosed: d3,
  curveBasisOpen: h3,
  curveBasis: f3,
  curveBumpX: QN,
  curveBumpY: ZN,
  curveLinearClosed: p3,
  curveLinear: Ho,
  curveMonotoneX: m3,
  curveMonotoneY: b3,
  curveNatural: y3,
  curveStep: g3,
  curveStepAfter: E3,
  curveStepBefore: v3
}, mu = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, La = function(t) {
  return t.x;
}, ka = function(t) {
  return t.y;
}, G8 = function(t, r) {
  if (ae(t))
    return t;
  var n = "curve".concat($o(t));
  return (n === "curveMonotone" || n === "curveBump") && r ? A1["".concat(n).concat(r === "vertical" ? "Y" : "X")] : A1[n] || Ho;
}, K8 = function(t) {
  var r = t.type, n = r === void 0 ? "linear" : r, a = t.points, i = a === void 0 ? [] : a, u = t.baseLine, o = t.layout, s = t.connectNulls, c = s === void 0 ? !1 : s, l = G8(n, o), f = c ? i.filter(function(b) {
    return mu(b);
  }) : i, h;
  if (Array.isArray(u)) {
    var p = c ? u.filter(function(b) {
      return mu(b);
    }) : u, y = f.map(function(b, m) {
      return _1(_1({}, b), {}, {
        base: p[m]
      });
    });
    return o === "vertical" ? h = uu().y(ka).x1(La).x0(function(b) {
      return b.base.x;
    }) : h = uu().x(La).y1(ka).y0(function(b) {
      return b.base.y;
    }), h.defined(mu).curve(l), h(y);
  }
  return o === "vertical" && z(u) ? h = uu().y(ka).x1(La).x0(u) : z(u) ? h = uu().x(La).y1(ka).y0(u) : h = x_().x(La).y(ka), h.defined(mu).curve(l), h(f);
}, wh = function(t) {
  var r = t.className, n = t.points, a = t.path, i = t.pathRef;
  if ((!n || !n.length) && !a)
    return null;
  var u = n && n.length ? K8(t) : a;
  return /* @__PURE__ */ jr.createElement("path", xh({}, ne(t, !1), Iu(t), {
    className: se("recharts-curve", r),
    d: u,
    ref: i
  }));
}, Zf = { exports: {} }, Jf, O1;
function V8() {
  if (O1) return Jf;
  O1 = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Jf = e, Jf;
}
var ed, S1;
function X8() {
  if (S1) return ed;
  S1 = 1;
  var e = /* @__PURE__ */ V8();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, ed = function() {
    function n(u, o, s, c, l, f) {
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
  }, ed;
}
var x1;
function Q8() {
  return x1 || (x1 = 1, Zf.exports = /* @__PURE__ */ X8()()), Zf.exports;
}
var Z8 = /* @__PURE__ */ Q8();
const pe = /* @__PURE__ */ ye(Z8), { getOwnPropertyNames: J8, getOwnPropertySymbols: eB } = Object, { hasOwnProperty: tB } = Object.prototype;
function td(e, t) {
  return function(n, a, i) {
    return e(n, a, i) && t(n, a, i);
  };
}
function Ba(e) {
  return function(r, n, a) {
    if (!r || !n || typeof r != "object" || typeof n != "object")
      return e(r, n, a);
    const { cache: i } = a, u = i.get(r), o = i.get(n);
    if (u && o)
      return u === n && o === r;
    i.set(r, n), i.set(n, r);
    const s = e(r, n, a);
    return i.delete(r), i.delete(n), s;
  };
}
function rB(e) {
  return e?.[Symbol.toStringTag];
}
function w1(e) {
  return J8(e).concat(eB(e));
}
const nB = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((e, t) => tB.call(e, t))
);
function On(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
const aB = "__v", iB = "__o", uB = "_owner", oB = 64, { getOwnPropertyDescriptor: Ph, keys: no } = Object, { propertyIsEnumerable: Eu } = Object.prototype, sB = Ph(Object.getPrototypeOf(Int8Array.prototype), Symbol.toStringTag).get;
function cB(e, t) {
  return e.byteLength === t.byteLength && ao(new Uint8Array(e), new Uint8Array(t));
}
function lB(e, t, r) {
  let n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function fB(e, t) {
  return e.byteLength === t.byteLength && ao(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}
function dB(e, t) {
  return On(e.getTime(), t.getTime());
}
function hB(e, t, r) {
  if (e.name !== t.name || e.message !== t.message || e.stack !== t.stack)
    return !1;
  const n = e.cause, a = t.cause;
  if (n !== a && !r.equals(n, a, "cause", "cause", e, t, r))
    return !1;
  const i = e.errors, u = t.errors;
  if (i !== u && !r.equals(i, u, "errors", "errors", e, t, r))
    return !1;
  const o = no(e), s = no(t);
  let c = o.length;
  if (!c && !s.length)
    return !0;
  let l = 0, f;
  for (; c-- > 0; )
    if (f = o[c], !(f === "cause" || f === "errors")) {
      if (f !== s[c] && !Eu.call(t, f) || !r.equals(e[f], t[f], f, f, e, t, r))
        return !1;
      ++l;
    }
  const h = s.length - l;
  return !h || h === (Eu.call(t, "cause") ? 1 : 0) + (Eu.call(t, "errors") ? 1 : 0);
}
function pB(e, t) {
  return e === t;
}
function mB(e, t, r) {
  return e.name === t.name && e.message === t.message && e.stack === t.stack && Rn(e, t, r);
}
function P1(e, t, r) {
  const n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  const a = new Array(n), i = e.entries();
  let u, o, s = 0;
  for (; (u = i.next()) && !u.done; ) {
    const c = t.entries();
    let l = !1, f = 0;
    for (; (o = c.next()) && !o.done; ) {
      if (a[f]) {
        f++;
        continue;
      }
      const h = u.value, p = o.value;
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
const bB = On;
function yB(e, t, r) {
  const n = no(e), a = no(t);
  let i = n.length;
  if (a.length !== i)
    return !1;
  const u = i <= oB;
  let o;
  for (; i-- > 0; )
    if (o = n[i], !PO(e, t, o) && (o !== a[i] && !(u ? a.includes(o) : Eu.call(t, o)) || !r.equals(e[o], t[o], o, o, e, t, r)))
      return !1;
  return !0;
}
function Rn(e, t, r) {
  const n = w1(e);
  let a = n.length;
  if (w1(t).length !== a)
    return !1;
  let i, u, o;
  for (; a-- > 0; )
    if (i = n[a], !PO(e, t, i) && (!nB(t, i) || !r.equals(e[i], t[i], i, i, e, t, r)) || (u = Ph(e, i), o = Ph(t, i), (u || o) && (!u || !o || u.configurable !== o.configurable || u.enumerable !== o.enumerable || u.writable !== o.writable)))
      return !1;
  return !0;
}
function gB(e, t) {
  return On(e.valueOf(), t.valueOf());
}
function vB(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function I1(e, t, r) {
  const n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  const a = new Array(n), i = e.values();
  let u, o;
  for (; (u = i.next()) && !u.done; ) {
    const s = t.values();
    let c = !1, l = 0;
    for (; (o = s.next()) && !o.done; ) {
      if (!a[l] && r.equals(u.value, o.value, u.value, o.value, e, t, r)) {
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
function ao(e, t) {
  let r = e.length;
  if (t.length !== r || e.byteOffset !== t.byteOffset)
    return !1;
  const n = sB.call(e);
  if (n === "Float64Array" || n === "Float32Array" || n === "Float16Array") {
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
function EB(e, t) {
  return e.href === t.href ? !0 : e.protocol === t.protocol && e.username === t.username && e.password === t.password && e.host === t.host && e.pathname === t.pathname && e.hash === t.hash && TB(e.searchParams, t.searchParams);
}
function TB(e, t) {
  const r = e.toString(), n = t.toString();
  return r === n || C1(r) === C1(n);
}
function C1(e) {
  return e.split("&").sort().join("&");
}
function PO(e, t, r) {
  return (r === uB || r === iB || r === aB) && !!(e.$$typeof || t.$$typeof);
}
const _B = "[object ArrayBuffer]", AB = "[object Arguments]", OB = "[object Boolean]", SB = "[object DataView]", xB = "[object Date]", wB = "[object Error]", PB = "[object Map]", IB = "[object Number]", CB = "[object Object]", NB = "[object RegExp]", RB = "[object Set]", DB = "[object String]", MB = {
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
}, LB = "[object URL]", kB = Object.prototype.toString;
function BB({ areArrayBuffersEqual: e, areArraysEqual: t, areDataViewsEqual: r, areDatesEqual: n, areErrorsEqual: a, areFunctionsEqual: i, areMapsEqual: u, areNumbersEqual: o, areObjectsEqual: s, arePrimitiveWrappersEqual: c, areRegExpsEqual: l, areSetsEqual: f, areTypedArraysEqual: h, areUrlsEqual: p, unknownTagComparators: y }) {
  return function(m, E, g) {
    if (m === E)
      return !0;
    if (m == null || E == null)
      return !1;
    const _ = typeof m;
    if (_ !== typeof E)
      return !1;
    if (_ !== "object")
      return _ === "number" ? o(m, E, g) : _ === "function" ? i(m, E, g) : !1;
    const A = m.constructor;
    if (A !== E.constructor)
      return !1;
    if (A === Object)
      return s(m, E, g);
    if (Array.isArray(m))
      return t(m, E, g);
    if (A === Date)
      return n(m, E, g);
    if (A === RegExp)
      return l(m, E, g);
    if (A === Map)
      return u(m, E, g);
    if (A === Set)
      return f(m, E, g);
    if (A == null)
      return s(m, E, g);
    const v = kB.call(m);
    if (v === xB)
      return n(m, E, g);
    if (v === NB)
      return l(m, E, g);
    if (v === PB)
      return u(m, E, g);
    if (v === RB)
      return f(m, E, g);
    if (v === CB)
      return typeof m.then != "function" && typeof E.then != "function" && s(m, E, g);
    if (v === LB)
      return p(m, E, g);
    if (v === wB)
      return a(m, E, g);
    if (v === AB)
      return s(m, E, g);
    if (MB[v])
      return h(m, E, g);
    if (v === _B)
      return e(m, E, g);
    if (v === SB)
      return r(m, E, g);
    if (v === OB || v === IB || v === DB)
      return c(m, E, g);
    if (y) {
      let T = y[v];
      if (!T) {
        const S = rB(m);
        S && (T = y[S]);
      }
      if (T)
        return T(m, E, g);
    }
    return !1;
  };
}
function jB({ circular: e, createCustomConfig: t, strict: r }) {
  let n = {
    areArrayBuffersEqual: cB,
    areArraysEqual: r ? Rn : lB,
    areDataViewsEqual: fB,
    areDatesEqual: dB,
    // `name` / `message` / `stack` / `cause` / `errors` are not enumerable (unless assigned), which is why
    // errors need a comparator of their own rather than being treated as plain objects. Each variant also
    // compares the own properties that `Error` subclasses routinely carry (`status`, `code`, ...):
    // enumerable ones in loose mode, and all of them (via `areObjectsEqualStrict`) in strict mode.
    areErrorsEqual: r ? mB : hB,
    areFunctionsEqual: pB,
    areMapsEqual: r ? td(P1, Rn) : P1,
    areNumbersEqual: bB,
    areObjectsEqual: r ? Rn : yB,
    arePrimitiveWrappersEqual: gB,
    areRegExpsEqual: vB,
    areSetsEqual: r ? td(I1, Rn) : I1,
    areTypedArraysEqual: r ? td(ao, Rn) : ao,
    areUrlsEqual: EB,
    unknownTagComparators: void 0
  };
  if (t && (n = Object.assign({}, n, t(n))), e) {
    const a = Ba(n.areArraysEqual), i = Ba(n.areErrorsEqual), u = Ba(n.areMapsEqual), o = Ba(n.areObjectsEqual), s = Ba(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: a,
      areErrorsEqual: i,
      areMapsEqual: u,
      areObjectsEqual: o,
      areSetsEqual: s
    });
  }
  return n;
}
function FB(e) {
  return function(t, r, n, a, i, u, o) {
    return e(t, r, o);
  };
}
function $B({ circular: e, comparator: t, createState: r, equals: n, strict: a }) {
  if (r)
    return function(o, s) {
      const { cache: c = e ? /* @__PURE__ */ new WeakMap() : void 0, meta: l } = r();
      return t(o, s, {
        cache: c,
        equals: n,
        meta: l,
        strict: a
      });
    };
  if (e)
    return function(o, s) {
      return t(o, s, {
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
  return function(o, s) {
    return t(o, s, i);
  };
}
const UB = Wr();
Wr({ strict: !0 });
Wr({ circular: !0 });
Wr({
  circular: !0,
  strict: !0
});
Wr({
  createInternalComparator: () => On
});
Wr({
  strict: !0,
  createInternalComparator: () => On
});
Wr({
  circular: !0,
  createInternalComparator: () => On
});
Wr({
  circular: !0,
  createInternalComparator: () => On,
  strict: !0
});
function Wr(e = {}) {
  const { circular: t = !1, createInternalComparator: r, createState: n, strict: a = !1 } = e, i = jB(e), u = BB(i), o = r ? r(u) : FB(u);
  return $B({ circular: t, comparator: u, createState: n, equals: o, strict: a });
}
function HB(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function N1(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = -1, n = function a(i) {
    r < 0 && (r = i), i - r > t ? (e(i), r = -1) : HB(a);
  };
  requestAnimationFrame(n);
}
function Ih(e) {
  "@babel/helpers - typeof";
  return Ih = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ih(e);
}
function qB(e) {
  return GB(e) || zB(e) || YB(e) || WB();
}
function WB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function YB(e, t) {
  if (e) {
    if (typeof e == "string") return R1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return R1(e, t);
  }
}
function R1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function zB(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function GB(e) {
  if (Array.isArray(e)) return e;
}
function KB() {
  var e = {}, t = function() {
    return null;
  }, r = !1, n = function a(i) {
    if (!r) {
      if (Array.isArray(i)) {
        if (!i.length)
          return;
        var u = i, o = qB(u), s = o[0], c = o.slice(1);
        if (typeof s == "number") {
          N1(a.bind(null, c), s);
          return;
        }
        a(s), N1(a.bind(null, c));
        return;
      }
      Ih(i) === "object" && (e = i, t(e)), typeof i == "function" && i();
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
function Pi(e) {
  "@babel/helpers - typeof";
  return Pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pi(e);
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
      IO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : D1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function IO(e, t, r) {
  return t = VB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VB(e) {
  var t = XB(e, "string");
  return Pi(t) === "symbol" ? t : String(t);
}
function XB(e, t) {
  if (Pi(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Pi(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var QB = function(t, r) {
  return [Object.keys(t), Object.keys(r)].reduce(function(n, a) {
    return n.filter(function(i) {
      return a.includes(i);
    });
  });
}, ZB = function(t) {
  return t;
}, JB = function(t) {
  return t.replace(/([A-Z])/g, function(r) {
    return "-".concat(r.toLowerCase());
  });
}, Za = function(t, r) {
  return Object.keys(r).reduce(function(n, a) {
    return M1(M1({}, n), {}, IO({}, a, t(a, r[a])));
  }, {});
}, L1 = function(t, r, n) {
  return t.map(function(a) {
    return "".concat(JB(a), " ").concat(r, "ms ").concat(n);
  }).join(",");
};
function e5(e, t) {
  return n5(e) || r5(e, t) || CO(e, t) || t5();
}
function t5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function r5(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function n5(e) {
  if (Array.isArray(e)) return e;
}
function a5(e) {
  return o5(e) || u5(e) || CO(e) || i5();
}
function i5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function CO(e, t) {
  if (e) {
    if (typeof e == "string") return Ch(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ch(e, t);
  }
}
function u5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function o5(e) {
  if (Array.isArray(e)) return Ch(e);
}
function Ch(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var io = 1e-4, NO = function(t, r) {
  return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
}, RO = function(t, r) {
  return t.map(function(n, a) {
    return n * Math.pow(r, a);
  }).reduce(function(n, a) {
    return n + a;
  });
}, k1 = function(t, r) {
  return function(n) {
    var a = NO(t, r);
    return RO(a, n);
  };
}, s5 = function(t, r) {
  return function(n) {
    var a = NO(t, r), i = [].concat(a5(a.map(function(u, o) {
      return u * o;
    }).slice(1)), [0]);
    return RO(i, n);
  };
}, B1 = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r[0], i = r[1], u = r[2], o = r[3];
  if (r.length === 1)
    switch (r[0]) {
      case "linear":
        a = 0, i = 0, u = 1, o = 1;
        break;
      case "ease":
        a = 0.25, i = 0.1, u = 0.25, o = 1;
        break;
      case "ease-in":
        a = 0.42, i = 0, u = 1, o = 1;
        break;
      case "ease-out":
        a = 0.42, i = 0, u = 0.58, o = 1;
        break;
      case "ease-in-out":
        a = 0, i = 0, u = 0.58, o = 1;
        break;
      default: {
        var s = r[0].split("(");
        if (s[0] === "cubic-bezier" && s[1].split(")")[0].split(",").length === 4) {
          var c = s[1].split(")")[0].split(",").map(function(m) {
            return parseFloat(m);
          }), l = e5(c, 4);
          a = l[0], i = l[1], u = l[2], o = l[3];
        }
      }
    }
  var f = k1(a, u), h = k1(i, o), p = s5(a, u), y = function(E) {
    return E > 1 ? 1 : E < 0 ? 0 : E;
  }, b = function(E) {
    for (var g = E > 1 ? 1 : E, _ = g, A = 0; A < 8; ++A) {
      var v = f(_) - g, T = p(_);
      if (Math.abs(v - g) < io || T < io)
        return h(_);
      _ = y(_ - v / T);
    }
    return h(_);
  };
  return b.isStepper = !1, b;
}, c5 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, a = t.damping, i = a === void 0 ? 8 : a, u = t.dt, o = u === void 0 ? 17 : u, s = function(l, f, h) {
    var p = -(l - f) * n, y = h * i, b = h + (p - y) * o / 1e3, m = h * o / 1e3 + l;
    return Math.abs(m - f) < io && Math.abs(b) < io ? [f, 0] : [m, b];
  };
  return s.isStepper = !0, s.dt = o, s;
}, l5 = function() {
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
        return B1(a);
      case "spring":
        return c5();
      default:
        if (a.split("(")[0] === "cubic-bezier")
          return B1(a);
    }
  return typeof a == "function" ? a : null;
};
function Ii(e) {
  "@babel/helpers - typeof";
  return Ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ii(e);
}
function j1(e) {
  return h5(e) || d5(e) || DO(e) || f5();
}
function f5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function d5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function h5(e) {
  if (Array.isArray(e)) return Rh(e);
}
function F1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ke(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? F1(Object(r), !0).forEach(function(n) {
      Nh(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : F1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Nh(e, t, r) {
  return t = p5(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function p5(e) {
  var t = m5(e, "string");
  return Ii(t) === "symbol" ? t : String(t);
}
function m5(e, t) {
  if (Ii(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ii(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function b5(e, t) {
  return v5(e) || g5(e, t) || DO(e, t) || y5();
}
function y5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function DO(e, t) {
  if (e) {
    if (typeof e == "string") return Rh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Rh(e, t);
  }
}
function Rh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function g5(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function v5(e) {
  if (Array.isArray(e)) return e;
}
var uo = function(t, r, n) {
  return t + (r - t) * n;
}, Dh = function(t) {
  var r = t.from, n = t.to;
  return r !== n;
}, E5 = function e(t, r, n) {
  var a = Za(function(i, u) {
    if (Dh(u)) {
      var o = t(u.from, u.to, u.velocity), s = b5(o, 2), c = s[0], l = s[1];
      return Ke(Ke({}, u), {}, {
        from: c,
        velocity: l
      });
    }
    return u;
  }, r);
  return n < 1 ? Za(function(i, u) {
    return Dh(u) ? Ke(Ke({}, u), {}, {
      velocity: uo(u.velocity, a[i].velocity, n),
      from: uo(u.from, a[i].from, n)
    }) : u;
  }, r) : e(t, a, n - 1);
};
const T5 = (function(e, t, r, n, a) {
  var i = QB(e, t), u = i.reduce(function(m, E) {
    return Ke(Ke({}, m), {}, Nh({}, E, [e[E], t[E]]));
  }, {}), o = i.reduce(function(m, E) {
    return Ke(Ke({}, m), {}, Nh({}, E, {
      from: e[E],
      velocity: 0,
      to: t[E]
    }));
  }, {}), s = -1, c, l, f = function() {
    return null;
  }, h = function() {
    return Za(function(E, g) {
      return g.from;
    }, o);
  }, p = function() {
    return !Object.values(o).filter(Dh).length;
  }, y = function(E) {
    c || (c = E);
    var g = E - c, _ = g / r.dt;
    o = E5(r, o, _), a(Ke(Ke(Ke({}, e), t), h())), c = E, p() || (s = requestAnimationFrame(f));
  }, b = function(E) {
    l || (l = E);
    var g = (E - l) / n, _ = Za(function(v, T) {
      return uo.apply(void 0, j1(T).concat([r(g)]));
    }, u);
    if (a(Ke(Ke(Ke({}, e), t), _)), g < 1)
      s = requestAnimationFrame(f);
    else {
      var A = Za(function(v, T) {
        return uo.apply(void 0, j1(T).concat([r(1)]));
      }, u);
      a(Ke(Ke(Ke({}, e), t), A));
    }
  };
  return f = r.isStepper ? y : b, function() {
    return requestAnimationFrame(f), function() {
      cancelAnimationFrame(s);
    };
  };
});
function na(e) {
  "@babel/helpers - typeof";
  return na = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, na(e);
}
var _5 = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function A5(e, t) {
  if (e == null) return {};
  var r = O5(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function O5(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function rd(e) {
  return P5(e) || w5(e) || x5(e) || S5();
}
function S5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function x5(e, t) {
  if (e) {
    if (typeof e == "string") return Mh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Mh(e, t);
  }
}
function w5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function P5(e) {
  if (Array.isArray(e)) return Mh(e);
}
function Mh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function $1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $1(Object(r), !0).forEach(function(n) {
      qa(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qa(e, t, r) {
  return t = MO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function I5(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function C5(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, MO(n.key), n);
  }
}
function N5(e, t, r) {
  return t && C5(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function MO(e) {
  var t = R5(e, "string");
  return na(t) === "symbol" ? t : String(t);
}
function R5(e, t) {
  if (na(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (na(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function D5(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Lh(e, t);
}
function Lh(e, t) {
  return Lh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Lh(e, t);
}
function M5(e) {
  var t = L5();
  return function() {
    var n = oo(e), a;
    if (t) {
      var i = oo(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return kh(this, a);
  };
}
function kh(e, t) {
  if (t && (na(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Bh(e);
}
function Bh(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function L5() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function oo(e) {
  return oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, oo(e);
}
var vr = /* @__PURE__ */ (function(e) {
  D5(r, e);
  var t = M5(r);
  function r(n, a) {
    var i;
    I5(this, r), i = t.call(this, n, a);
    var u = i.props, o = u.isActive, s = u.attributeName, c = u.from, l = u.to, f = u.steps, h = u.children, p = u.duration;
    if (i.handleStyleChange = i.handleStyleChange.bind(Bh(i)), i.changeStyle = i.changeStyle.bind(Bh(i)), !o || p <= 0)
      return i.state = {
        style: {}
      }, typeof h == "function" && (i.state = {
        style: l
      }), kh(i);
    if (f && f.length)
      i.state = {
        style: f[0].style
      };
    else if (c) {
      if (typeof h == "function")
        return i.state = {
          style: c
        }, kh(i);
      i.state = {
        style: s ? qa({}, s, c) : c
      };
    } else
      i.state = {
        style: {}
      };
    return i;
  }
  return N5(r, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.isActive, u = a.canBegin;
      this.mounted = !0, !(!i || !u) && this.runAnimation(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function(a) {
      var i = this.props, u = i.isActive, o = i.canBegin, s = i.attributeName, c = i.shouldReAnimate, l = i.to, f = i.from, h = this.state.style;
      if (o) {
        if (!u) {
          var p = {
            style: s ? qa({}, s, l) : l
          };
          this.state && h && (s && h[s] !== l || !s && h !== l) && this.setState(p);
          return;
        }
        if (!(UB(a.to, l) && a.canBegin && a.isActive)) {
          var y = !a.canBegin || !a.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var b = y || c ? f : a.to;
          if (this.state && h) {
            var m = {
              style: s ? qa({}, s, b) : b
            };
            (s && h[s] !== b || !s && h !== b) && this.setState(m);
          }
          this.runAnimation(Bt(Bt({}, this.props), {}, {
            from: b,
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
      var i = this, u = a.from, o = a.to, s = a.duration, c = a.easing, l = a.begin, f = a.onAnimationEnd, h = a.onAnimationStart, p = T5(u, o, l5(c), s, this.changeStyle), y = function() {
        i.stopJSAnimation = p();
      };
      this.manager.start([h, l, y, s, f]);
    }
  }, {
    key: "runStepAnimation",
    value: function(a) {
      var i = this, u = a.steps, o = a.begin, s = a.onAnimationStart, c = u[0], l = c.style, f = c.duration, h = f === void 0 ? 0 : f, p = function(b, m, E) {
        if (E === 0)
          return b;
        var g = m.duration, _ = m.easing, A = _ === void 0 ? "ease" : _, v = m.style, T = m.properties, S = m.onAnimationEnd, I = E > 0 ? u[E - 1] : m, N = T || Object.keys(v);
        if (typeof A == "function" || A === "spring")
          return [].concat(rd(b), [i.runJSAnimation.bind(i, {
            from: I.style,
            to: v,
            duration: g,
            easing: A
          }), g]);
        var k = L1(N, g, A), D = Bt(Bt(Bt({}, I.style), v), {}, {
          transition: k
        });
        return [].concat(rd(b), [D, g, S]).filter(ZB);
      };
      return this.manager.start([s].concat(rd(u.reduce(p, [l, Math.max(h, o)])), [a.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(a) {
      this.manager || (this.manager = KB());
      var i = a.begin, u = a.duration, o = a.attributeName, s = a.to, c = a.easing, l = a.onAnimationStart, f = a.onAnimationEnd, h = a.steps, p = a.children, y = this.manager;
      if (this.unSubscribe = y.subscribe(this.handleStyleChange), typeof c == "function" || typeof p == "function" || c === "spring") {
        this.runJSAnimation(a);
        return;
      }
      if (h.length > 1) {
        this.runStepAnimation(a);
        return;
      }
      var b = o ? qa({}, o, s) : s, m = L1(Object.keys(b), u, c);
      y.start([l, i, Bt(Bt({}, b), {}, {
        transition: m
      }), u, f]);
    }
  }, {
    key: "render",
    value: function() {
      var a = this.props, i = a.children;
      a.begin;
      var u = a.duration;
      a.attributeName, a.easing;
      var o = a.isActive;
      a.steps, a.from, a.to, a.canBegin, a.onAnimationEnd, a.shouldReAnimate, a.onAnimationReStart;
      var s = A5(a, _5), c = Mr.count(i), l = this.state.style;
      if (typeof i == "function")
        return i(l);
      if (!o || c === 0 || u <= 0)
        return i;
      var f = function(p) {
        var y = p.props, b = y.style, m = b === void 0 ? {} : b, E = y.className, g = /* @__PURE__ */ De(p, Bt(Bt({}, s), {}, {
          style: Bt(Bt({}, m), l),
          className: E
        }));
        return g;
      };
      return c === 1 ? f(Mr.only(i)) : /* @__PURE__ */ C.createElement("div", null, Mr.map(i, function(h) {
        return f(h);
      }));
    }
  }]), r;
})(er);
vr.displayName = "Animate";
vr.defaultProps = {
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
vr.propTypes = {
  from: pe.oneOfType([pe.object, pe.string]),
  to: pe.oneOfType([pe.object, pe.string]),
  attributeName: pe.string,
  // animation duration
  duration: pe.number,
  begin: pe.number,
  easing: pe.oneOfType([pe.string, pe.func]),
  steps: pe.arrayOf(pe.shape({
    duration: pe.number.isRequired,
    style: pe.object.isRequired,
    easing: pe.oneOfType([pe.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), pe.func]),
    // transition css properties(dash case), optional
    properties: pe.arrayOf("string"),
    onAnimationEnd: pe.func
  })),
  children: pe.oneOfType([pe.node, pe.func]),
  isActive: pe.bool,
  canBegin: pe.bool,
  onAnimationEnd: pe.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: pe.bool,
  onAnimationStart: pe.func,
  onAnimationReStart: pe.func
};
function Ci(e) {
  "@babel/helpers - typeof";
  return Ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ci(e);
}
function so() {
  return so = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, so.apply(this, arguments);
}
function k5(e, t) {
  return $5(e) || F5(e, t) || j5(e, t) || B5();
}
function B5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function j5(e, t) {
  if (e) {
    if (typeof e == "string") return U1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return U1(e, t);
  }
}
function U1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function F5(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function $5(e) {
  if (Array.isArray(e)) return e;
}
function H1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function q1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? H1(Object(r), !0).forEach(function(n) {
      U5(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : H1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function U5(e, t, r) {
  return t = H5(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function H5(e) {
  var t = q5(e, "string");
  return Ci(t) == "symbol" ? t : t + "";
}
function q5(e, t) {
  if (Ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var W1 = function(t, r, n, a, i) {
  var u = Math.min(Math.abs(n) / 2, Math.abs(a) / 2), o = a >= 0 ? 1 : -1, s = n >= 0 ? 1 : -1, c = a >= 0 && n >= 0 || a < 0 && n < 0 ? 1 : 0, l;
  if (u > 0 && i instanceof Array) {
    for (var f = [0, 0, 0, 0], h = 0, p = 4; h < p; h++)
      f[h] = i[h] > u ? u : i[h];
    l = "M".concat(t, ",").concat(r + o * f[0]), f[0] > 0 && (l += "A ".concat(f[0], ",").concat(f[0], ",0,0,").concat(c, ",").concat(t + s * f[0], ",").concat(r)), l += "L ".concat(t + n - s * f[1], ",").concat(r), f[1] > 0 && (l += "A ".concat(f[1], ",").concat(f[1], ",0,0,").concat(c, `,
        `).concat(t + n, ",").concat(r + o * f[1])), l += "L ".concat(t + n, ",").concat(r + a - o * f[2]), f[2] > 0 && (l += "A ".concat(f[2], ",").concat(f[2], ",0,0,").concat(c, `,
        `).concat(t + n - s * f[2], ",").concat(r + a)), l += "L ".concat(t + s * f[3], ",").concat(r + a), f[3] > 0 && (l += "A ".concat(f[3], ",").concat(f[3], ",0,0,").concat(c, `,
        `).concat(t, ",").concat(r + a - o * f[3])), l += "Z";
  } else if (u > 0 && i === +i && i > 0) {
    var y = Math.min(u, i);
    l = "M ".concat(t, ",").concat(r + o * y, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(c, ",").concat(t + s * y, ",").concat(r, `
            L `).concat(t + n - s * y, ",").concat(r, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(c, ",").concat(t + n, ",").concat(r + o * y, `
            L `).concat(t + n, ",").concat(r + a - o * y, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(c, ",").concat(t + n - s * y, ",").concat(r + a, `
            L `).concat(t + s * y, ",").concat(r + a, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(c, ",").concat(t, ",").concat(r + a - o * y, " Z");
  } else
    l = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(a, " h ").concat(-n, " Z");
  return l;
}, W5 = function(t, r) {
  if (!t || !r)
    return !1;
  var n = t.x, a = t.y, i = r.x, u = r.y, o = r.width, s = r.height;
  if (Math.abs(o) > 0 && Math.abs(s) > 0) {
    var c = Math.min(i, i + o), l = Math.max(i, i + o), f = Math.min(u, u + s), h = Math.max(u, u + s);
    return n >= c && n <= l && a >= f && a <= h;
  }
  return !1;
}, Y5 = {
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
}, v0 = function(t) {
  var r = q1(q1({}, Y5), t), n = ri(), a = at(-1), i = k5(a, 2), u = i[0], o = i[1];
  pt(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var A = n.current.getTotalLength();
        A && o(A);
      } catch {
      }
  }, []);
  var s = r.x, c = r.y, l = r.width, f = r.height, h = r.radius, p = r.className, y = r.animationEasing, b = r.animationDuration, m = r.animationBegin, E = r.isAnimationActive, g = r.isUpdateAnimationActive;
  if (s !== +s || c !== +c || l !== +l || f !== +f || l === 0 || f === 0)
    return null;
  var _ = se("recharts-rectangle", p);
  return g ? /* @__PURE__ */ C.createElement(vr, {
    canBegin: u > 0,
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
    duration: b,
    animationEasing: y,
    isActive: g
  }, function(A) {
    var v = A.width, T = A.height, S = A.x, I = A.y;
    return /* @__PURE__ */ C.createElement(vr, {
      canBegin: u > 0,
      from: "0px ".concat(u === -1 ? 1 : u, "px"),
      to: "".concat(u, "px 0px"),
      attributeName: "strokeDasharray",
      begin: m,
      duration: b,
      isActive: E,
      easing: y
    }, /* @__PURE__ */ C.createElement("path", so({}, ne(r, !0), {
      className: _,
      d: W1(S, I, v, T, h),
      ref: n
    })));
  }) : /* @__PURE__ */ C.createElement("path", so({}, ne(r, !0), {
    className: _,
    d: W1(s, c, l, f, h)
  }));
}, z5 = ["points", "className", "baseLinePoints", "connectNulls"];
function Bn() {
  return Bn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Bn.apply(this, arguments);
}
function G5(e, t) {
  if (e == null) return {};
  var r = K5(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function K5(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Y1(e) {
  return Z5(e) || Q5(e) || X5(e) || V5();
}
function V5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function X5(e, t) {
  if (e) {
    if (typeof e == "string") return jh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return jh(e, t);
  }
}
function Q5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Z5(e) {
  if (Array.isArray(e)) return jh(e);
}
function jh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var z1 = function(t) {
  return t && t.x === +t.x && t.y === +t.y;
}, J5 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  return t.forEach(function(n) {
    z1(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([]);
  }), z1(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r;
}, Ja = function(t, r) {
  var n = J5(t);
  r && (n = [n.reduce(function(i, u) {
    return [].concat(Y1(i), Y1(u));
  }, [])]);
  var a = n.map(function(i) {
    return i.reduce(function(u, o, s) {
      return "".concat(u).concat(s === 0 ? "M" : "L").concat(o.x, ",").concat(o.y);
    }, "");
  }).join("");
  return n.length === 1 ? "".concat(a, "Z") : a;
}, ej = function(t, r, n) {
  var a = Ja(t, n);
  return "".concat(a.slice(-1) === "Z" ? a.slice(0, -1) : a, "L").concat(Ja(r.reverse(), n).slice(1));
}, tj = function(t) {
  var r = t.points, n = t.className, a = t.baseLinePoints, i = t.connectNulls, u = G5(t, z5);
  if (!r || !r.length)
    return null;
  var o = se("recharts-polygon", n);
  if (a && a.length) {
    var s = u.stroke && u.stroke !== "none", c = ej(r, a, i);
    return /* @__PURE__ */ C.createElement("g", {
      className: o
    }, /* @__PURE__ */ C.createElement("path", Bn({}, ne(u, !0), {
      fill: c.slice(-1) === "Z" ? u.fill : "none",
      stroke: "none",
      d: c
    })), s ? /* @__PURE__ */ C.createElement("path", Bn({}, ne(u, !0), {
      fill: "none",
      d: Ja(r, i)
    })) : null, s ? /* @__PURE__ */ C.createElement("path", Bn({}, ne(u, !0), {
      fill: "none",
      d: Ja(a, i)
    })) : null);
  }
  var l = Ja(r, i);
  return /* @__PURE__ */ C.createElement("path", Bn({}, ne(u, !0), {
    fill: l.slice(-1) === "Z" ? u.fill : "none",
    className: o,
    d: l
  }));
};
function Fh() {
  return Fh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Fh.apply(this, arguments);
}
var E0 = function(t) {
  var r = t.cx, n = t.cy, a = t.r, i = t.className, u = se("recharts-dot", i);
  return r === +r && n === +n && a === +a ? /* @__PURE__ */ jr.createElement("circle", Fh({}, ne(t, !1), Iu(t), {
    className: u,
    cx: r,
    cy: n,
    r: a
  })) : null;
};
function Ni(e) {
  "@babel/helpers - typeof";
  return Ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ni(e);
}
var rj = ["x", "y", "top", "left", "width", "height", "className"];
function $h() {
  return $h = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, $h.apply(this, arguments);
}
function G1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? G1(Object(r), !0).forEach(function(n) {
      aj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : G1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function aj(e, t, r) {
  return t = ij(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ij(e) {
  var t = uj(e, "string");
  return Ni(t) == "symbol" ? t : t + "";
}
function uj(e, t) {
  if (Ni(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function oj(e, t) {
  if (e == null) return {};
  var r = sj(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function sj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var cj = function(t, r, n, a, i, u) {
  return "M".concat(t, ",").concat(i, "v").concat(a, "M").concat(u, ",").concat(r, "h").concat(n);
}, lj = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, u = t.top, o = u === void 0 ? 0 : u, s = t.left, c = s === void 0 ? 0 : s, l = t.width, f = l === void 0 ? 0 : l, h = t.height, p = h === void 0 ? 0 : h, y = t.className, b = oj(t, rj), m = nj({
    x: n,
    y: i,
    top: o,
    left: c,
    width: f,
    height: p
  }, b);
  return !z(n) || !z(i) || !z(f) || !z(p) || !z(o) || !z(c) ? null : /* @__PURE__ */ C.createElement("path", $h({}, ne(m, !0), {
    className: se("recharts-cross", y),
    d: cj(n, i, f, p, o, c)
  }));
}, nd, K1;
function fj() {
  if (K1) return nd;
  K1 = 1;
  var e = es(), t = VA(), r = rr();
  function n(a, i) {
    return a && a.length ? e(a, r(i, 2), t) : void 0;
  }
  return nd = n, nd;
}
var dj = fj();
const hj = /* @__PURE__ */ ye(dj);
var ad, V1;
function pj() {
  if (V1) return ad;
  V1 = 1;
  var e = es(), t = rr(), r = XA();
  function n(a, i) {
    return a && a.length ? e(a, t(i, 2), r) : void 0;
  }
  return ad = n, ad;
}
var mj = pj();
const bj = /* @__PURE__ */ ye(mj);
var yj = ["cx", "cy", "angle", "ticks", "axisLine"], gj = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function aa(e) {
  "@babel/helpers - typeof";
  return aa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, aa(e);
}
function ei() {
  return ei = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ei.apply(this, arguments);
}
function X1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Xr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? X1(Object(r), !0).forEach(function(n) {
      os(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : X1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Q1(e, t) {
  if (e == null) return {};
  var r = vj(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function vj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Ej(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Z1(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, kO(n.key), n);
  }
}
function Tj(e, t, r) {
  return t && Z1(e.prototype, t), r && Z1(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _j(e, t, r) {
  return t = co(t), Aj(e, LO() ? Reflect.construct(t, r || [], co(e).constructor) : t.apply(e, r));
}
function Aj(e, t) {
  if (t && (aa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Oj(e);
}
function Oj(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function LO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (LO = function() {
    return !!e;
  })();
}
function co(e) {
  return co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, co(e);
}
function Sj(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Uh(e, t);
}
function Uh(e, t) {
  return Uh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Uh(e, t);
}
function os(e, t, r) {
  return t = kO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kO(e) {
  var t = xj(e, "string");
  return aa(t) == "symbol" ? t : t + "";
}
function xj(e, t) {
  if (aa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (aa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ss = /* @__PURE__ */ (function(e) {
  function t() {
    return Ej(this, t), _j(this, t, arguments);
  }
  return Sj(t, e), Tj(t, [{
    key: "getTickValueCoord",
    value: (
      /**
       * Calculate the coordinate of tick
       * @param  {Number} coordinate The radius of tick
       * @return {Object} (x, y)
       */
      function(n) {
        var a = n.coordinate, i = this.props, u = i.angle, o = i.cx, s = i.cy;
        return Te(o, s, a, u);
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
      var n = this.props, a = n.cx, i = n.cy, u = n.angle, o = n.ticks, s = hj(o, function(l) {
        return l.coordinate || 0;
      }), c = bj(o, function(l) {
        return l.coordinate || 0;
      });
      return {
        cx: a,
        cy: i,
        startAngle: u,
        endAngle: u,
        innerRadius: c.coordinate || 0,
        outerRadius: s.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.cx, i = n.cy, u = n.angle, o = n.ticks, s = n.axisLine, c = Q1(n, yj), l = o.reduce(function(y, b) {
        return [Math.min(y[0], b.coordinate), Math.max(y[1], b.coordinate)];
      }, [1 / 0, -1 / 0]), f = Te(a, i, l[0], u), h = Te(a, i, l[1], u), p = Xr(Xr(Xr({}, ne(c, !1)), {}, {
        fill: "none"
      }, ne(s, !1)), {}, {
        x1: f.x,
        y1: f.y,
        x2: h.x,
        y2: h.y
      });
      return /* @__PURE__ */ C.createElement("line", ei({
        className: "recharts-polar-radius-axis-line"
      }, p));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, a = this.props, i = a.ticks, u = a.tick, o = a.angle, s = a.tickFormatter, c = a.stroke, l = Q1(a, gj), f = this.getTickTextAnchor(), h = ne(l, !1), p = ne(u, !1), y = i.map(function(b, m) {
        var E = n.getTickValueCoord(b), g = Xr(Xr(Xr(Xr({
          textAnchor: f,
          transform: "rotate(".concat(90 - o, ", ").concat(E.x, ", ").concat(E.y, ")")
        }, h), {}, {
          stroke: "none",
          fill: c
        }, p), {}, {
          index: m
        }, E), {}, {
          payload: b
        });
        return /* @__PURE__ */ C.createElement(me, ei({
          className: se("recharts-polar-radius-axis-tick", OO(u)),
          key: "tick-".concat(b.coordinate)
        }, hn(n.props, b, m)), t.renderTickItem(u, g, s ? s(b.value, m) : b.value));
      });
      return /* @__PURE__ */ C.createElement(me, {
        className: "recharts-polar-radius-axis-ticks"
      }, y);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.ticks, i = n.axisLine, u = n.tick;
      return !a || !a.length ? null : /* @__PURE__ */ C.createElement(me, {
        className: se("recharts-polar-radius-axis", this.props.className)
      }, i && this.renderAxisLine(), u && this.renderTicks(), Ye.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var u;
      return /* @__PURE__ */ C.isValidElement(n) ? u = /* @__PURE__ */ C.cloneElement(n, a) : ae(n) ? u = n(a) : u = /* @__PURE__ */ C.createElement(pn, ei({}, a, {
        className: "recharts-polar-radius-axis-tick-value"
      }), i), u;
    }
  }]);
})(er);
os(ss, "displayName", "PolarRadiusAxis");
os(ss, "axisType", "radiusAxis");
os(ss, "defaultProps", {
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
function ia(e) {
  "@babel/helpers - typeof";
  return ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ia(e);
}
function en() {
  return en = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, en.apply(this, arguments);
}
function J1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Qr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? J1(Object(r), !0).forEach(function(n) {
      cs(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : J1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function wj(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function eE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, jO(n.key), n);
  }
}
function Pj(e, t, r) {
  return t && eE(e.prototype, t), r && eE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Ij(e, t, r) {
  return t = lo(t), Cj(e, BO() ? Reflect.construct(t, r || [], lo(e).constructor) : t.apply(e, r));
}
function Cj(e, t) {
  if (t && (ia(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Nj(e);
}
function Nj(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function BO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (BO = function() {
    return !!e;
  })();
}
function lo(e) {
  return lo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, lo(e);
}
function Rj(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Hh(e, t);
}
function Hh(e, t) {
  return Hh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Hh(e, t);
}
function cs(e, t, r) {
  return t = jO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jO(e) {
  var t = Dj(e, "string");
  return ia(t) == "symbol" ? t : t + "";
}
function Dj(e, t) {
  if (ia(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ia(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Mj = Math.PI / 180, tE = 1e-5, ls = /* @__PURE__ */ (function(e) {
  function t() {
    return wj(this, t), Ij(this, t, arguments);
  }
  return Rj(t, e), Pj(t, [{
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
        var a = this.props, i = a.cx, u = a.cy, o = a.radius, s = a.orientation, c = a.tickSize, l = c || 8, f = Te(i, u, o, n.coordinate), h = Te(i, u, o + (s === "inner" ? -1 : 1) * l, n.coordinate);
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
      var a = this.props.orientation, i = Math.cos(-n.coordinate * Mj), u;
      return i > tE ? u = a === "outer" ? "start" : "end" : i < -tE ? u = a === "outer" ? "end" : "start" : u = "middle", u;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.cx, i = n.cy, u = n.radius, o = n.axisLine, s = n.axisLineType, c = Qr(Qr({}, ne(this.props, !1)), {}, {
        fill: "none"
      }, ne(o, !1));
      if (s === "circle")
        return /* @__PURE__ */ C.createElement(E0, en({
          className: "recharts-polar-angle-axis-line"
        }, c, {
          cx: a,
          cy: i,
          r: u
        }));
      var l = this.props.ticks, f = l.map(function(h) {
        return Te(a, i, u, h.coordinate);
      });
      return /* @__PURE__ */ C.createElement(tj, en({
        className: "recharts-polar-angle-axis-line"
      }, c, {
        points: f
      }));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, a = this.props, i = a.ticks, u = a.tick, o = a.tickLine, s = a.tickFormatter, c = a.stroke, l = ne(this.props, !1), f = ne(u, !1), h = Qr(Qr({}, l), {}, {
        fill: "none"
      }, ne(o, !1)), p = i.map(function(y, b) {
        var m = n.getTickLineCoord(y), E = n.getTickTextAnchor(y), g = Qr(Qr(Qr({
          textAnchor: E
        }, l), {}, {
          stroke: "none",
          fill: c
        }, f), {}, {
          index: b,
          payload: y,
          x: m.x2,
          y: m.y2
        });
        return /* @__PURE__ */ C.createElement(me, en({
          className: se("recharts-polar-angle-axis-tick", OO(u)),
          key: "tick-".concat(y.coordinate)
        }, hn(n.props, y, b)), o && /* @__PURE__ */ C.createElement("line", en({
          className: "recharts-polar-angle-axis-tick-line"
        }, h, m)), u && t.renderTickItem(u, g, s ? s(y.value, b) : y.value));
      });
      return /* @__PURE__ */ C.createElement(me, {
        className: "recharts-polar-angle-axis-ticks"
      }, p);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.ticks, i = n.radius, u = n.axisLine;
      return i <= 0 || !a || !a.length ? null : /* @__PURE__ */ C.createElement(me, {
        className: se("recharts-polar-angle-axis", this.props.className)
      }, u && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var u;
      return /* @__PURE__ */ C.isValidElement(n) ? u = /* @__PURE__ */ C.cloneElement(n, a) : ae(n) ? u = n(a) : u = /* @__PURE__ */ C.createElement(pn, en({}, a, {
        className: "recharts-polar-angle-axis-tick-value"
      }), i), u;
    }
  }]);
})(er);
cs(ls, "displayName", "PolarAngleAxis");
cs(ls, "axisType", "angleAxis");
cs(ls, "defaultProps", {
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
var id, rE;
function Lj() {
  if (rE) return id;
  rE = 1;
  var e = V_(), t = e(Object.getPrototypeOf, Object);
  return id = t, id;
}
var ud, nE;
function kj() {
  if (nE) return ud;
  nE = 1;
  var e = Er(), t = Lj(), r = Tr(), n = "[object Object]", a = Function.prototype, i = Object.prototype, u = a.toString, o = i.hasOwnProperty, s = u.call(Object);
  function c(l) {
    if (!r(l) || e(l) != n)
      return !1;
    var f = t(l);
    if (f === null)
      return !0;
    var h = o.call(f, "constructor") && f.constructor;
    return typeof h == "function" && h instanceof h && u.call(h) == s;
  }
  return ud = c, ud;
}
var Bj = kj();
const jj = /* @__PURE__ */ ye(Bj);
var od, aE;
function Fj() {
  if (aE) return od;
  aE = 1;
  var e = Er(), t = Tr(), r = "[object Boolean]";
  function n(a) {
    return a === !0 || a === !1 || t(a) && e(a) == r;
  }
  return od = n, od;
}
var $j = Fj();
const Uj = /* @__PURE__ */ ye($j);
function Ri(e) {
  "@babel/helpers - typeof";
  return Ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ri(e);
}
function fo() {
  return fo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fo.apply(this, arguments);
}
function Hj(e, t) {
  return zj(e) || Yj(e, t) || Wj(e, t) || qj();
}
function qj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Wj(e, t) {
  if (e) {
    if (typeof e == "string") return iE(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return iE(e, t);
  }
}
function iE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Yj(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function zj(e) {
  if (Array.isArray(e)) return e;
}
function uE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function oE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uE(Object(r), !0).forEach(function(n) {
      Gj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : uE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Gj(e, t, r) {
  return t = Kj(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Kj(e) {
  var t = Vj(e, "string");
  return Ri(t) == "symbol" ? t : t + "";
}
function Vj(e, t) {
  if (Ri(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ri(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var sE = function(t, r, n, a, i) {
  var u = n - a, o;
  return o = "M ".concat(t, ",").concat(r), o += "L ".concat(t + n, ",").concat(r), o += "L ".concat(t + n - u / 2, ",").concat(r + i), o += "L ".concat(t + n - u / 2 - a, ",").concat(r + i), o += "L ".concat(t, ",").concat(r, " Z"), o;
}, Xj = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, Qj = function(t) {
  var r = oE(oE({}, Xj), t), n = ri(), a = at(-1), i = Hj(a, 2), u = i[0], o = i[1];
  pt(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var _ = n.current.getTotalLength();
        _ && o(_);
      } catch {
      }
  }, []);
  var s = r.x, c = r.y, l = r.upperWidth, f = r.lowerWidth, h = r.height, p = r.className, y = r.animationEasing, b = r.animationDuration, m = r.animationBegin, E = r.isUpdateAnimationActive;
  if (s !== +s || c !== +c || l !== +l || f !== +f || h !== +h || l === 0 && f === 0 || h === 0)
    return null;
  var g = se("recharts-trapezoid", p);
  return E ? /* @__PURE__ */ C.createElement(vr, {
    canBegin: u > 0,
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
    duration: b,
    animationEasing: y,
    isActive: E
  }, function(_) {
    var A = _.upperWidth, v = _.lowerWidth, T = _.height, S = _.x, I = _.y;
    return /* @__PURE__ */ C.createElement(vr, {
      canBegin: u > 0,
      from: "0px ".concat(u === -1 ? 1 : u, "px"),
      to: "".concat(u, "px 0px"),
      attributeName: "strokeDasharray",
      begin: m,
      duration: b,
      easing: y
    }, /* @__PURE__ */ C.createElement("path", fo({}, ne(r, !0), {
      className: g,
      d: sE(S, I, A, v, T),
      ref: n
    })));
  }) : /* @__PURE__ */ C.createElement("g", null, /* @__PURE__ */ C.createElement("path", fo({}, ne(r, !0), {
    className: g,
    d: sE(s, c, l, f, h)
  })));
}, Zj = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function Di(e) {
  "@babel/helpers - typeof";
  return Di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Di(e);
}
function Jj(e, t) {
  if (e == null) return {};
  var r = eF(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function eF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
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
function ho(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cE(Object(r), !0).forEach(function(n) {
      tF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function tF(e, t, r) {
  return t = rF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rF(e) {
  var t = nF(e, "string");
  return Di(t) == "symbol" ? t : t + "";
}
function nF(e, t) {
  if (Di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function aF(e, t) {
  return ho(ho({}, t), e);
}
function iF(e, t) {
  return e === "symbols";
}
function lE(e) {
  var t = e.shapeType, r = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ C.createElement(v0, r);
    case "trapezoid":
      return /* @__PURE__ */ C.createElement(Qj, r);
    case "sector":
      return /* @__PURE__ */ C.createElement(wO, r);
    case "symbols":
      if (iF(t))
        return /* @__PURE__ */ C.createElement(jp, r);
      break;
    default:
      return null;
  }
}
function uF(e) {
  return /* @__PURE__ */ Ct(e) ? e.props : e;
}
function FO(e) {
  var t = e.option, r = e.shapeType, n = e.propTransformer, a = n === void 0 ? aF : n, i = e.activeClassName, u = i === void 0 ? "recharts-active-shape" : i, o = e.isActive, s = Jj(e, Zj), c;
  if (/* @__PURE__ */ Ct(t))
    c = /* @__PURE__ */ De(t, ho(ho({}, s), uF(t)));
  else if (ae(t))
    c = t(s);
  else if (jj(t) && !Uj(t)) {
    var l = a(t, s);
    c = /* @__PURE__ */ C.createElement(lE, {
      shapeType: r,
      elementProps: l
    });
  } else {
    var f = s;
    c = /* @__PURE__ */ C.createElement(lE, {
      shapeType: r,
      elementProps: f
    });
  }
  return o ? /* @__PURE__ */ C.createElement(me, {
    className: u
  }, c) : c;
}
function fs(e, t) {
  return t != null && "trapezoids" in e.props;
}
function ds(e, t) {
  return t != null && "sectors" in e.props;
}
function Mi(e, t) {
  return t != null && "points" in e.props;
}
function oF(e, t) {
  var r, n, a = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x, i = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return a && i;
}
function sF(e, t) {
  var r = e.endAngle === t.endAngle, n = e.startAngle === t.startAngle;
  return r && n;
}
function cF(e, t) {
  var r = e.x === t.x, n = e.y === t.y, a = e.z === t.z;
  return r && n && a;
}
function lF(e, t) {
  var r;
  return fs(e, t) ? r = oF : ds(e, t) ? r = sF : Mi(e, t) && (r = cF), r;
}
function fF(e, t) {
  var r;
  return fs(e, t) ? r = "trapezoids" : ds(e, t) ? r = "sectors" : Mi(e, t) && (r = "points"), r;
}
function dF(e, t) {
  if (fs(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  if (ds(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  return Mi(e, t) ? t.payload : {};
}
function hF(e) {
  var t = e.activeTooltipItem, r = e.graphicalItem, n = e.itemData, a = fF(r, t), i = dF(r, t), u = n.filter(function(s, c) {
    var l = ns(i, s), f = r.props[a].filter(function(y) {
      var b = lF(r, t);
      return b(y, t);
    }), h = r.props[a].indexOf(f[f.length - 1]), p = c === h;
    return l && p;
  }), o = n.indexOf(u[u.length - 1]);
  return o;
}
var Tu;
function ua(e) {
  "@babel/helpers - typeof";
  return ua = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ua(e);
}
function jn() {
  return jn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, jn.apply(this, arguments);
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
function ve(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fE(Object(r), !0).forEach(function(n) {
      wt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function pF(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function dE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, UO(n.key), n);
  }
}
function mF(e, t, r) {
  return t && dE(e.prototype, t), r && dE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function bF(e, t, r) {
  return t = po(t), yF(e, $O() ? Reflect.construct(t, r || [], po(e).constructor) : t.apply(e, r));
}
function yF(e, t) {
  if (t && (ua(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return gF(e);
}
function gF(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function $O() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return ($O = function() {
    return !!e;
  })();
}
function po(e) {
  return po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, po(e);
}
function vF(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && qh(e, t);
}
function qh(e, t) {
  return qh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, qh(e, t);
}
function wt(e, t, r) {
  return t = UO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function UO(e) {
  var t = EF(e, "string");
  return ua(t) == "symbol" ? t : t + "";
}
function EF(e, t) {
  if (ua(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ua(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ar = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return pF(this, t), n = bF(this, t, [r]), wt(n, "pieRef", null), wt(n, "sectorRefs", []), wt(n, "id", zi("recharts-pie-")), wt(n, "handleAnimationEnd", function() {
      var a = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), ae(a) && a();
    }), wt(n, "handleAnimationStart", function() {
      var a = n.props.onAnimationStart;
      n.setState({
        isAnimationFinished: !1
      }), ae(a) && a();
    }), n.state = {
      isAnimationFinished: !r.isAnimationActive,
      prevIsAnimationActive: r.isAnimationActive,
      prevAnimationId: r.animationId,
      sectorToFocus: 0
    }, n;
  }
  return vF(t, e), mF(t, [{
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
      var i = this.props, u = i.label, o = i.labelLine, s = i.dataKey, c = i.valueKey, l = ne(this.props, !1), f = ne(u, !1), h = ne(o, !1), p = u && u.offsetRadius || 20, y = n.map(function(b, m) {
        var E = (b.startAngle + b.endAngle) / 2, g = Te(b.cx, b.cy, b.outerRadius + p, E), _ = ve(ve(ve(ve({}, l), b), {}, {
          stroke: "none"
        }, f), {}, {
          index: m,
          textAnchor: t.getTextAnchor(g.x, b.cx)
        }, g), A = ve(ve(ve(ve({}, l), b), {}, {
          fill: "none",
          stroke: b.fill
        }, h), {}, {
          index: m,
          points: [Te(b.cx, b.cy, b.outerRadius, E), g]
        }), v = s;
        return ce(s) && ce(c) ? v = "value" : ce(s) && (v = c), // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ C.createElement(me, {
          key: "label-".concat(b.startAngle, "-").concat(b.endAngle, "-").concat(b.midAngle, "-").concat(m)
        }, o && t.renderLabelLineItem(o, A, "line"), t.renderLabelItem(u, _, et(b, v)));
      });
      return /* @__PURE__ */ C.createElement(me, {
        className: "recharts-pie-labels"
      }, y);
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var a = this, i = this.props, u = i.activeShape, o = i.blendStroke, s = i.inactiveShape;
      return n.map(function(c, l) {
        if (c?.startAngle === 0 && c?.endAngle === 0 && n.length !== 1) return null;
        var f = a.isActiveIndex(l), h = s && a.hasActiveIndex() ? s : null, p = f ? u : h, y = ve(ve({}, c), {}, {
          stroke: o ? c.fill : c.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ C.createElement(me, jn({
          ref: function(m) {
            m && !a.sectorRefs.includes(m) && a.sectorRefs.push(m);
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, hn(a.props, c, l), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(c?.startAngle, "-").concat(c?.endAngle, "-").concat(c.midAngle, "-").concat(l)
        }), /* @__PURE__ */ C.createElement(FO, jn({
          option: p,
          isActive: f,
          shapeType: "sector"
        }, y)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this, a = this.props, i = a.sectors, u = a.isAnimationActive, o = a.animationBegin, s = a.animationDuration, c = a.animationEasing, l = a.animationId, f = this.state, h = f.prevSectors, p = f.prevIsAnimationActive;
      return /* @__PURE__ */ C.createElement(vr, {
        begin: o,
        duration: s,
        isActive: u,
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
      }, function(y) {
        var b = y.t, m = [], E = i && i[0], g = E.startAngle;
        return i.forEach(function(_, A) {
          var v = h && h[A], T = A > 0 ? Tt(_, "paddingAngle", 0) : 0;
          if (v) {
            var S = Pr(v.endAngle - v.startAngle, _.endAngle - _.startAngle), I = ve(ve({}, _), {}, {
              startAngle: g + T,
              endAngle: g + S(b) + T
            });
            m.push(I), g = I.endAngle;
          } else {
            var N = _.endAngle, k = _.startAngle, D = Pr(0, N - k), R = D(b), L = ve(ve({}, _), {}, {
              startAngle: g + T,
              endAngle: g + R + T
            });
            m.push(L), g = L.endAngle;
          }
        }), /* @__PURE__ */ C.createElement(me, null, n.renderSectorsStatically(m));
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
              var u = ++a.state.sectorToFocus % a.sectorRefs.length;
              a.sectorRefs[u].focus(), a.setState({
                sectorToFocus: u
              });
              break;
            }
            case "ArrowRight": {
              var o = --a.state.sectorToFocus < 0 ? a.sectorRefs.length - 1 : a.state.sectorToFocus % a.sectorRefs.length;
              a.sectorRefs[o].focus(), a.setState({
                sectorToFocus: o
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
      var n = this.props, a = n.sectors, i = n.isAnimationActive, u = this.state.prevSectors;
      return i && a && a.length && (!u || !ns(u, a)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(a);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      this.pieRef && this.attachKeyboardHandlers(this.pieRef);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.hide, u = a.sectors, o = a.className, s = a.label, c = a.cx, l = a.cy, f = a.innerRadius, h = a.outerRadius, p = a.isAnimationActive, y = this.state.isAnimationFinished;
      if (i || !u || !u.length || !z(c) || !z(l) || !z(f) || !z(h))
        return null;
      var b = se("recharts-pie", o);
      return /* @__PURE__ */ C.createElement(me, {
        tabIndex: this.props.rootTabIndex,
        className: b,
        ref: function(E) {
          n.pieRef = E;
        }
      }, this.renderSectors(), s && this.renderLabels(u), Ye.renderCallByParent(this.props, null, !1), (!p || y) && Ht.renderCallByParent(this.props, u, !1));
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
      if (ae(n))
        return n(a);
      var u = se("recharts-pie-label-line", typeof n != "boolean" ? n.className : "");
      return /* @__PURE__ */ C.createElement(wh, jn({}, a, {
        key: i,
        type: "linear",
        className: u
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function(n, a, i) {
      if (/* @__PURE__ */ C.isValidElement(n))
        return /* @__PURE__ */ C.cloneElement(n, a);
      var u = i;
      if (ae(n) && (u = n(a), /* @__PURE__ */ C.isValidElement(u)))
        return u;
      var o = se("recharts-pie-label-text", typeof n != "boolean" && !ae(n) ? n.className : "");
      return /* @__PURE__ */ C.createElement(pn, jn({}, a, {
        alignmentBaseline: "middle",
        className: o
      }), u);
    }
  }]);
})(er);
Tu = Ar;
wt(Ar, "displayName", "Pie");
wt(Ar, "defaultProps", {
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
  isAnimationActive: !_a.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: !1,
  rootTabIndex: 0
});
wt(Ar, "parseDeltaAngle", function(e, t) {
  var r = it(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
});
wt(Ar, "getRealPieData", function(e) {
  var t = e.data, r = e.children, n = ne(e, !1), a = Dt(r, Go);
  return t && t.length ? t.map(function(i, u) {
    return ve(ve(ve({
      payload: i
    }, n), i), a && a[u] && a[u].props);
  }) : a && a.length ? a.map(function(i) {
    return ve(ve({}, n), i.props);
  }) : [];
});
wt(Ar, "parseCoordinateOfPie", function(e, t) {
  var r = t.top, n = t.left, a = t.width, i = t.height, u = AO(a, i), o = n + ut(e.cx, a, a / 2), s = r + ut(e.cy, i, i / 2), c = ut(e.innerRadius, u, 0), l = ut(e.outerRadius, u, u * 0.8), f = e.maxRadius || Math.sqrt(a * a + i * i) / 2;
  return {
    cx: o,
    cy: s,
    innerRadius: c,
    outerRadius: l,
    maxRadius: f
  };
});
wt(Ar, "getComposedData", function(e) {
  var t = e.item, r = e.offset, n = t.type.defaultProps !== void 0 ? ve(ve({}, t.type.defaultProps), t.props) : t.props, a = Tu.getRealPieData(n);
  if (!a || !a.length)
    return null;
  var i = n.cornerRadius, u = n.startAngle, o = n.endAngle, s = n.paddingAngle, c = n.dataKey, l = n.nameKey, f = n.valueKey, h = n.tooltipType, p = Math.abs(n.minAngle), y = Tu.parseCoordinateOfPie(n, r), b = Tu.parseDeltaAngle(u, o), m = Math.abs(b), E = c;
  ce(c) && ce(f) ? (Ut(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), E = "value") : ce(c) && (Ut(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), E = f);
  var g = a.filter(function(I) {
    return et(I, E, 0) !== 0;
  }).length, _ = (m >= 360 ? g : g - 1) * s, A = m - g * p - _, v = a.reduce(function(I, N) {
    var k = et(N, E, 0);
    return I + (z(k) ? k : 0);
  }, 0), T;
  if (v > 0) {
    var S;
    T = a.map(function(I, N) {
      var k = et(I, E, 0), D = et(I, l, N), R = (z(k) ? k : 0) / v, L;
      N ? L = S.endAngle + it(b) * s * (k !== 0 ? 1 : 0) : L = u;
      var F = L + it(b) * ((k !== 0 ? p : 0) + R * A), j = (L + F) / 2, U = (y.innerRadius + y.outerRadius) / 2, q = [{
        name: D,
        value: k,
        payload: I,
        dataKey: E,
        type: h
      }], K = Te(y.cx, y.cy, U, j);
      return S = ve(ve(ve({
        percent: R,
        cornerRadius: i,
        name: D,
        tooltipPayload: q,
        midAngle: j,
        middleRadius: U,
        tooltipPosition: K
      }, I), y), {}, {
        value: et(I, E),
        startAngle: L,
        endAngle: F,
        payload: I,
        paddingAngle: it(b) * s
      }), S;
    });
  }
  return ve(ve({}, y), {}, {
    sectors: T,
    data: a
  });
});
var sd, hE;
function TF() {
  if (hE) return sd;
  hE = 1;
  var e = Math.ceil, t = Math.max;
  function r(n, a, i, u) {
    for (var o = -1, s = t(e((a - n) / (i || 1)), 0), c = Array(s); s--; )
      c[u ? s : ++o] = n, n += i;
    return c;
  }
  return sd = r, sd;
}
var cd, pE;
function HO() {
  if (pE) return cd;
  pE = 1;
  var e = fA(), t = 1 / 0, r = 17976931348623157e292;
  function n(a) {
    if (!a)
      return a === 0 ? a : 0;
    if (a = e(a), a === t || a === -t) {
      var i = a < 0 ? -1 : 1;
      return i * r;
    }
    return a === a ? a : 0;
  }
  return cd = n, cd;
}
var ld, mE;
function _F() {
  if (mE) return ld;
  mE = 1;
  var e = TF(), t = zo(), r = HO();
  function n(a) {
    return function(i, u, o) {
      return o && typeof o != "number" && t(i, u, o) && (u = o = void 0), i = r(i), u === void 0 ? (u = i, i = 0) : u = r(u), o = o === void 0 ? i < u ? 1 : -1 : r(o), e(i, u, o, a);
    };
  }
  return ld = n, ld;
}
var fd, bE;
function AF() {
  if (bE) return fd;
  bE = 1;
  var e = _F(), t = e();
  return fd = t, fd;
}
var OF = AF();
const mo = /* @__PURE__ */ ye(OF);
function Li(e) {
  "@babel/helpers - typeof";
  return Li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Li(e);
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
function gE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yE(Object(r), !0).forEach(function(n) {
      qO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qO(e, t, r) {
  return t = SF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function SF(e) {
  var t = xF(e, "string");
  return Li(t) == "symbol" ? t : t + "";
}
function xF(e, t) {
  if (Li(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var wF = ["Webkit", "Moz", "O", "ms"], PF = function(t, r) {
  var n = t.replace(/(\w)/, function(i) {
    return i.toUpperCase();
  }), a = wF.reduce(function(i, u) {
    return gE(gE({}, i), {}, qO({}, u + n, r));
  }, {});
  return a[t] = r, a;
};
function oa(e) {
  "@babel/helpers - typeof";
  return oa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, oa(e);
}
function bo() {
  return bo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, bo.apply(this, arguments);
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
function dd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vE(Object(r), !0).forEach(function(n) {
      yt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function IF(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function EE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, YO(n.key), n);
  }
}
function CF(e, t, r) {
  return t && EE(e.prototype, t), r && EE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function NF(e, t, r) {
  return t = yo(t), RF(e, WO() ? Reflect.construct(t, r || [], yo(e).constructor) : t.apply(e, r));
}
function RF(e, t) {
  if (t && (oa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return DF(e);
}
function DF(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function WO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (WO = function() {
    return !!e;
  })();
}
function yo(e) {
  return yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, yo(e);
}
function MF(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Wh(e, t);
}
function Wh(e, t) {
  return Wh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Wh(e, t);
}
function yt(e, t, r) {
  return t = YO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function YO(e) {
  var t = LF(e, "string");
  return oa(t) == "symbol" ? t : t + "";
}
function LF(e, t) {
  if (oa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (oa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var kF = function(t) {
  var r = t.data, n = t.startIndex, a = t.endIndex, i = t.x, u = t.width, o = t.travellerWidth;
  if (!r || !r.length)
    return {};
  var s = r.length, c = Xa().domain(mo(0, s)).range([i, i + u - o]), l = c.domain().map(function(f) {
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
}, TE = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, sa = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return IF(this, t), n = NF(this, t, [r]), yt(n, "handleDrag", function(a) {
      n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(a) : n.state.isSlideMoving && n.handleSlideDrag(a);
    }), yt(n, "handleTouchMove", function(a) {
      a.changedTouches != null && a.changedTouches.length > 0 && n.handleDrag(a.changedTouches[0]);
    }), yt(n, "handleDragEnd", function() {
      n.setState({
        isTravellerMoving: !1,
        isSlideMoving: !1
      }, function() {
        var a = n.props, i = a.endIndex, u = a.onDragEnd, o = a.startIndex;
        u?.({
          endIndex: i,
          startIndex: o
        });
      }), n.detachDragEndListener();
    }), yt(n, "handleLeaveWrapper", function() {
      (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut));
    }), yt(n, "handleEnterSlideOrTraveller", function() {
      n.setState({
        isTextActive: !0
      });
    }), yt(n, "handleLeaveSlideOrTraveller", function() {
      n.setState({
        isTextActive: !1
      });
    }), yt(n, "handleSlideDragStart", function(a) {
      var i = TE(a) ? a.changedTouches[0] : a;
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
  return MF(t, e), CF(t, [{
    key: "componentWillUnmount",
    value: function() {
      this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
    }
  }, {
    key: "getIndex",
    value: function(n) {
      var a = n.startX, i = n.endX, u = this.state.scaleValues, o = this.props, s = o.gap, c = o.data, l = c.length - 1, f = Math.min(a, i), h = Math.max(a, i), p = t.getIndexInRange(u, f), y = t.getIndexInRange(u, h);
      return {
        startIndex: p - p % s,
        endIndex: y === l ? l : y - y % s
      };
    }
  }, {
    key: "getTextOfTick",
    value: function(n) {
      var a = this.props, i = a.data, u = a.tickFormatter, o = a.dataKey, s = et(i[n], o, n);
      return ae(u) ? u(s, n) : s;
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
      var a = this.state, i = a.slideMoveStartX, u = a.startX, o = a.endX, s = this.props, c = s.x, l = s.width, f = s.travellerWidth, h = s.startIndex, p = s.endIndex, y = s.onChange, b = n.pageX - i;
      b > 0 ? b = Math.min(b, c + l - f - o, c + l - f - u) : b < 0 && (b = Math.max(b, c - u, c - o));
      var m = this.getIndex({
        startX: u + b,
        endX: o + b
      });
      (m.startIndex !== h || m.endIndex !== p) && y && y(m), this.setState({
        startX: u + b,
        endX: o + b,
        slideMoveStartX: n.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function(n, a) {
      var i = TE(a) ? a.changedTouches[0] : a;
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
      var a = this.state, i = a.brushMoveStartX, u = a.movingTravellerId, o = a.endX, s = a.startX, c = this.state[u], l = this.props, f = l.x, h = l.width, p = l.travellerWidth, y = l.onChange, b = l.gap, m = l.data, E = {
        startX: this.state.startX,
        endX: this.state.endX
      }, g = n.pageX - i;
      g > 0 ? g = Math.min(g, f + h - p - c) : g < 0 && (g = Math.max(g, f - c)), E[u] = c + g;
      var _ = this.getIndex(E), A = _.startIndex, v = _.endIndex, T = function() {
        var I = m.length - 1;
        return u === "startX" && (o > s ? A % b === 0 : v % b === 0) || o < s && v === I || u === "endX" && (o > s ? v % b === 0 : A % b === 0) || o > s && v === I;
      };
      this.setState(yt(yt({}, u, c + g), "brushMoveStartX", n.pageX), function() {
        y && T() && y(_);
      });
    }
  }, {
    key: "handleTravellerMoveKeyboard",
    value: function(n, a) {
      var i = this, u = this.state, o = u.scaleValues, s = u.startX, c = u.endX, l = this.state[a], f = o.indexOf(l);
      if (f !== -1) {
        var h = f + n;
        if (!(h === -1 || h >= o.length)) {
          var p = o[h];
          a === "startX" && p >= c || a === "endX" && p <= s || this.setState(yt({}, a, p), function() {
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
      var n = this.props, a = n.x, i = n.y, u = n.width, o = n.height, s = n.fill, c = n.stroke;
      return /* @__PURE__ */ C.createElement("rect", {
        stroke: c,
        fill: s,
        x: a,
        y: i,
        width: u,
        height: o
      });
    }
  }, {
    key: "renderPanorama",
    value: function() {
      var n = this.props, a = n.x, i = n.y, u = n.width, o = n.height, s = n.data, c = n.children, l = n.padding, f = Mr.only(c);
      return f ? /* @__PURE__ */ C.cloneElement(f, {
        x: a,
        y: i,
        width: u,
        height: o,
        margin: l,
        compact: !0,
        data: s
      }) : null;
    }
  }, {
    key: "renderTravellerLayer",
    value: function(n, a) {
      var i, u, o = this, s = this.props, c = s.y, l = s.travellerWidth, f = s.height, h = s.traveller, p = s.ariaLabel, y = s.data, b = s.startIndex, m = s.endIndex, E = Math.max(n, this.props.x), g = dd(dd({}, ne(this.props, !1)), {}, {
        x: E,
        y: c,
        width: l,
        height: f
      }), _ = p || "Min value: ".concat((i = y[b]) === null || i === void 0 ? void 0 : i.name, ", Max value: ").concat((u = y[m]) === null || u === void 0 ? void 0 : u.name);
      return /* @__PURE__ */ C.createElement(me, {
        tabIndex: 0,
        role: "slider",
        "aria-label": _,
        "aria-valuenow": n,
        className: "recharts-brush-traveller",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.travellerDragStartHandlers[a],
        onTouchStart: this.travellerDragStartHandlers[a],
        onKeyDown: function(v) {
          ["ArrowLeft", "ArrowRight"].includes(v.key) && (v.preventDefault(), v.stopPropagation(), o.handleTravellerMoveKeyboard(v.key === "ArrowRight" ? 1 : -1, a));
        },
        onFocus: function() {
          o.setState({
            isTravellerFocused: !0
          });
        },
        onBlur: function() {
          o.setState({
            isTravellerFocused: !1
          });
        },
        style: {
          cursor: "col-resize"
        }
      }, t.renderTraveller(h, g));
    }
  }, {
    key: "renderSlide",
    value: function(n, a) {
      var i = this.props, u = i.y, o = i.height, s = i.stroke, c = i.travellerWidth, l = Math.min(n, a) + c, f = Math.max(Math.abs(a - n) - c, 0);
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
        y: u,
        width: f,
        height: o
      });
    }
  }, {
    key: "renderText",
    value: function() {
      var n = this.props, a = n.startIndex, i = n.endIndex, u = n.y, o = n.height, s = n.travellerWidth, c = n.stroke, l = this.state, f = l.startX, h = l.endX, p = 5, y = {
        pointerEvents: "none",
        fill: c
      };
      return /* @__PURE__ */ C.createElement(me, {
        className: "recharts-brush-texts"
      }, /* @__PURE__ */ C.createElement(pn, bo({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(f, h) - p,
        y: u + o / 2
      }, y), this.getTextOfTick(a)), /* @__PURE__ */ C.createElement(pn, bo({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(f, h) + s + p,
        y: u + o / 2
      }, y), this.getTextOfTick(i)));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.data, i = n.className, u = n.children, o = n.x, s = n.y, c = n.width, l = n.height, f = n.alwaysShowText, h = this.state, p = h.startX, y = h.endX, b = h.isTextActive, m = h.isSlideMoving, E = h.isTravellerMoving, g = h.isTravellerFocused;
      if (!a || !a.length || !z(o) || !z(s) || !z(c) || !z(l) || c <= 0 || l <= 0)
        return null;
      var _ = se("recharts-brush", i), A = C.Children.count(u) === 1, v = PF("userSelect", "none");
      return /* @__PURE__ */ C.createElement(me, {
        className: _,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: v
      }, this.renderBackground(), A && this.renderPanorama(), this.renderSlide(p, y), this.renderTravellerLayer(p, "startX"), this.renderTravellerLayer(y, "endX"), (b || m || E || g || f) && this.renderText());
    }
  }], [{
    key: "renderDefaultTraveller",
    value: function(n) {
      var a = n.x, i = n.y, u = n.width, o = n.height, s = n.stroke, c = Math.floor(i + o / 2) - 1;
      return /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("rect", {
        x: a,
        y: i,
        width: u,
        height: o,
        fill: s,
        stroke: "none"
      }), /* @__PURE__ */ C.createElement("line", {
        x1: a + 1,
        y1: c,
        x2: a + u - 1,
        y2: c,
        fill: "none",
        stroke: "#fff"
      }), /* @__PURE__ */ C.createElement("line", {
        x1: a + 1,
        y1: c + 2,
        x2: a + u - 1,
        y2: c + 2,
        fill: "none",
        stroke: "#fff"
      }));
    }
  }, {
    key: "renderTraveller",
    value: function(n, a) {
      var i;
      return /* @__PURE__ */ C.isValidElement(n) ? i = /* @__PURE__ */ C.cloneElement(n, a) : ae(n) ? i = n(a) : i = t.renderDefaultTraveller(a), i;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(n, a) {
      var i = n.data, u = n.width, o = n.x, s = n.travellerWidth, c = n.updateId, l = n.startIndex, f = n.endIndex;
      if (i !== a.prevData || c !== a.prevUpdateId)
        return dd({
          prevData: i,
          prevTravellerWidth: s,
          prevUpdateId: c,
          prevX: o,
          prevWidth: u
        }, i && i.length ? kF({
          data: i,
          width: u,
          x: o,
          travellerWidth: s,
          startIndex: l,
          endIndex: f
        }) : {
          scale: null,
          scaleValues: null
        });
      if (a.scale && (u !== a.prevWidth || o !== a.prevX || s !== a.prevTravellerWidth)) {
        a.scale.range([o, o + u - s]);
        var h = a.scale.domain().map(function(p) {
          return a.scale(p);
        });
        return {
          prevData: i,
          prevTravellerWidth: s,
          prevUpdateId: c,
          prevX: o,
          prevWidth: u,
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
      for (var i = n.length, u = 0, o = i - 1; o - u > 1; ) {
        var s = Math.floor((u + o) / 2);
        n[s] > a ? o = s : u = s;
      }
      return a >= n[o] ? o : u;
    }
  }]);
})(er);
yt(sa, "displayName", "Brush");
yt(sa, "defaultProps", {
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
var hd, _E;
function BF() {
  if (_E) return hd;
  _E = 1;
  var e = Yp();
  function t(r, n) {
    var a;
    return e(r, function(i, u, o) {
      return a = n(i, u, o), !a;
    }), !!a;
  }
  return hd = t, hd;
}
var pd, AE;
function jF() {
  if (AE) return pd;
  AE = 1;
  var e = H_(), t = rr(), r = BF(), n = mt(), a = zo();
  function i(u, o, s) {
    var c = n(u) ? e : r;
    return s && a(u, o, s) && (o = void 0), c(u, t(o, 3));
  }
  return pd = i, pd;
}
var FF = jF();
const $F = /* @__PURE__ */ ye(FF);
var Zt = function(t, r) {
  var n = t.alwaysShow, a = t.ifOverflow;
  return n && (a = "extendDomain"), a === r;
}, md, OE;
function UF() {
  if (OE) return md;
  OE = 1;
  var e = uA();
  function t(r, n, a) {
    n == "__proto__" && e ? e(r, n, {
      configurable: !0,
      enumerable: !0,
      value: a,
      writable: !0
    }) : r[n] = a;
  }
  return md = t, md;
}
var bd, SE;
function HF() {
  if (SE) return bd;
  SE = 1;
  var e = UF(), t = aA(), r = rr();
  function n(a, i) {
    var u = {};
    return i = r(i, 3), t(a, function(o, s, c) {
      e(u, s, i(o, s, c));
    }), u;
  }
  return bd = n, bd;
}
var qF = HF();
const WF = /* @__PURE__ */ ye(qF);
var yd, xE;
function YF() {
  if (xE) return yd;
  xE = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length; ++n < a; )
      if (!r(t[n], n, t))
        return !1;
    return !0;
  }
  return yd = e, yd;
}
var gd, wE;
function zF() {
  if (wE) return gd;
  wE = 1;
  var e = Yp();
  function t(r, n) {
    var a = !0;
    return e(r, function(i, u, o) {
      return a = !!n(i, u, o), a;
    }), a;
  }
  return gd = t, gd;
}
var vd, PE;
function GF() {
  if (PE) return vd;
  PE = 1;
  var e = YF(), t = zF(), r = rr(), n = mt(), a = zo();
  function i(u, o, s) {
    var c = n(u) ? e : t;
    return s && a(u, o, s) && (o = void 0), c(u, r(o, 3));
  }
  return vd = i, vd;
}
var KF = GF();
const zO = /* @__PURE__ */ ye(KF);
var VF = ["x", "y"];
function ki(e) {
  "@babel/helpers - typeof";
  return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ki(e);
}
function Yh() {
  return Yh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Yh.apply(this, arguments);
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
function ja(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? IE(Object(r), !0).forEach(function(n) {
      XF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : IE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function XF(e, t, r) {
  return t = QF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QF(e) {
  var t = ZF(e, "string");
  return ki(t) == "symbol" ? t : t + "";
}
function ZF(e, t) {
  if (ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ki(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function JF(e, t) {
  if (e == null) return {};
  var r = e9(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function e9(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function t9(e, t) {
  var r = e.x, n = e.y, a = JF(e, VF), i = "".concat(r), u = parseInt(i, 10), o = "".concat(n), s = parseInt(o, 10), c = "".concat(t.height || a.height), l = parseInt(c, 10), f = "".concat(t.width || a.width), h = parseInt(f, 10);
  return ja(ja(ja(ja(ja({}, t), a), u ? {
    x: u
  } : {}), s ? {
    y: s
  } : {}), {}, {
    height: l,
    width: h,
    name: t.name,
    radius: t.radius
  });
}
function CE(e) {
  return /* @__PURE__ */ C.createElement(FO, Yh({
    shapeType: "rectangle",
    propTransformer: t9,
    activeClassName: "recharts-active-bar"
  }, e));
}
var r9 = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, a) {
    if (typeof t == "number") return t;
    var i = z(n) || vN(n);
    return i ? t(n, a) : (i || bn(), r);
  };
}, n9 = ["value", "background"], GO;
function ca(e) {
  "@babel/helpers - typeof";
  return ca = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ca(e);
}
function a9(e, t) {
  if (e == null) return {};
  var r = i9(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function i9(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function go() {
  return go = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, go.apply(this, arguments);
}
function NE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Re(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? NE(Object(r), !0).forEach(function(n) {
      Rr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : NE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function u9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function RE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, VO(n.key), n);
  }
}
function o9(e, t, r) {
  return t && RE(e.prototype, t), r && RE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function s9(e, t, r) {
  return t = vo(t), c9(e, KO() ? Reflect.construct(t, r || [], vo(e).constructor) : t.apply(e, r));
}
function c9(e, t) {
  if (t && (ca(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return l9(e);
}
function l9(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function KO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (KO = function() {
    return !!e;
  })();
}
function vo(e) {
  return vo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, vo(e);
}
function f9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && zh(e, t);
}
function zh(e, t) {
  return zh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, zh(e, t);
}
function Rr(e, t, r) {
  return t = VO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VO(e) {
  var t = d9(e, "string");
  return ca(t) == "symbol" ? t : t + "";
}
function d9(e, t) {
  if (ca(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ca(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var nr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    u9(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = s9(this, t, [].concat(a)), Rr(r, "state", {
      isAnimationFinished: !1
    }), Rr(r, "id", zi("recharts-bar-")), Rr(r, "handleAnimationEnd", function() {
      var u = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), u && u();
    }), Rr(r, "handleAnimationStart", function() {
      var u = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), u && u();
    }), r;
  }
  return f9(t, e), o9(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var a = this, i = this.props, u = i.shape, o = i.dataKey, s = i.activeIndex, c = i.activeBar, l = ne(this.props, !1);
      return n && n.map(function(f, h) {
        var p = h === s, y = p ? c : u, b = Re(Re(Re({}, l), f), {}, {
          isActive: p,
          option: y,
          index: h,
          dataKey: o,
          onAnimationStart: a.handleAnimationStart,
          onAnimationEnd: a.handleAnimationEnd
        });
        return /* @__PURE__ */ C.createElement(me, go({
          className: "recharts-bar-rectangle"
        }, hn(a.props, f, h), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(f?.x, "-").concat(f?.y, "-").concat(f?.value, "-").concat(h)
        }), /* @__PURE__ */ C.createElement(CE, b));
      });
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var n = this, a = this.props, i = a.data, u = a.layout, o = a.isAnimationActive, s = a.animationBegin, c = a.animationDuration, l = a.animationEasing, f = a.animationId, h = this.state.prevData;
      return /* @__PURE__ */ C.createElement(vr, {
        begin: s,
        duration: c,
        isActive: o,
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
        var y = p.t, b = i.map(function(m, E) {
          var g = h && h[E];
          if (g) {
            var _ = Pr(g.x, m.x), A = Pr(g.y, m.y), v = Pr(g.width, m.width), T = Pr(g.height, m.height);
            return Re(Re({}, m), {}, {
              x: _(y),
              y: A(y),
              width: v(y),
              height: T(y)
            });
          }
          if (u === "horizontal") {
            var S = Pr(0, m.height), I = S(y);
            return Re(Re({}, m), {}, {
              y: m.y + m.height - I,
              height: I
            });
          }
          var N = Pr(0, m.width), k = N(y);
          return Re(Re({}, m), {}, {
            width: k
          });
        });
        return /* @__PURE__ */ C.createElement(me, null, n.renderRectanglesStatically(b));
      });
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props, a = n.data, i = n.isAnimationActive, u = this.state.prevData;
      return i && a && a.length && (!u || !ns(u, a)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(a);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this, a = this.props, i = a.data, u = a.dataKey, o = a.activeIndex, s = ne(this.props.background, !1);
      return i.map(function(c, l) {
        c.value;
        var f = c.background, h = a9(c, n9);
        if (!f)
          return null;
        var p = Re(Re(Re(Re(Re({}, h), {}, {
          fill: "#eee"
        }, f), s), hn(n.props, c, l)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: u,
          index: l,
          className: "recharts-bar-background-rectangle"
        });
        return /* @__PURE__ */ C.createElement(CE, go({
          key: "background-bar-".concat(l),
          option: n.props.background,
          isActive: l === o
        }, p));
      });
    }
  }, {
    key: "renderErrorBar",
    value: function(n, a) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished)
        return null;
      var i = this.props, u = i.data, o = i.xAxis, s = i.yAxis, c = i.layout, l = i.children, f = Dt(l, us);
      if (!f)
        return null;
      var h = c === "vertical" ? u[0].height / 2 : u[0].width / 2, p = function(m, E) {
        var g = Array.isArray(m.value) ? m.value[1] : m.value;
        return {
          x: m.x,
          y: m.y,
          value: g,
          errorVal: et(m, E)
        };
      }, y = {
        clipPath: n ? "url(#clipPath-".concat(a, ")") : null
      };
      return /* @__PURE__ */ C.createElement(me, y, f.map(function(b) {
        return /* @__PURE__ */ C.cloneElement(b, {
          key: "error-bar-".concat(a, "-").concat(b.props.dataKey),
          data: u,
          xAxis: o,
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
      var n = this.props, a = n.hide, i = n.data, u = n.className, o = n.xAxis, s = n.yAxis, c = n.left, l = n.top, f = n.width, h = n.height, p = n.isAnimationActive, y = n.background, b = n.id;
      if (a || !i || !i.length)
        return null;
      var m = this.state.isAnimationFinished, E = se("recharts-bar", u), g = o && o.allowDataOverflow, _ = s && s.allowDataOverflow, A = g || _, v = ce(b) ? this.id : b;
      return /* @__PURE__ */ C.createElement(me, {
        className: E
      }, g || _ ? /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("clipPath", {
        id: "clipPath-".concat(v)
      }, /* @__PURE__ */ C.createElement("rect", {
        x: g ? c : c - f / 2,
        y: _ ? l : l - h / 2,
        width: g ? f : f * 2,
        height: _ ? h : h * 2
      }))) : null, /* @__PURE__ */ C.createElement(me, {
        className: "recharts-bar-rectangles",
        clipPath: A ? "url(#clipPath-".concat(v, ")") : null
      }, y ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(A, v), (!p || m) && Ht.renderCallByParent(this.props, i));
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
})(er);
GO = nr;
Rr(nr, "displayName", "Bar");
Rr(nr, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !_a.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
Rr(nr, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.barPosition, a = e.bandSize, i = e.xAxis, u = e.yAxis, o = e.xAxisTicks, s = e.yAxisTicks, c = e.stackedData, l = e.dataStartIndex, f = e.displayedData, h = e.offset, p = D4(n, r);
  if (!p)
    return null;
  var y = t.layout, b = r.type.defaultProps, m = b !== void 0 ? Re(Re({}, b), r.props) : r.props, E = m.dataKey, g = m.children, _ = m.minPointSize, A = y === "horizontal" ? u : i, v = c ? A.scale.domain() : null, T = $4({
    numericAxis: A
  }), S = Dt(g, Go), I = f.map(function(N, k) {
    var D, R, L, F, j, U;
    c ? D = M4(c[l + k], v) : (D = et(N, E), Array.isArray(D) || (D = [T, D]));
    var q = r9(_, GO.defaultProps.minPointSize)(D[1], k);
    if (y === "horizontal") {
      var K, V = [u.scale(D[0]), u.scale(D[1])], J = V[0], te = V[1];
      R = o1({
        axis: i,
        ticks: o,
        bandSize: a,
        offset: p.offset,
        entry: N,
        index: k
      }), L = (K = te ?? J) !== null && K !== void 0 ? K : void 0, F = p.size;
      var Q = J - te;
      if (j = Number.isNaN(Q) ? 0 : Q, U = {
        x: R,
        y: u.y,
        width: F,
        height: u.height
      }, Math.abs(q) > 0 && Math.abs(j) < Math.abs(q)) {
        var re = it(j || q) * (Math.abs(q) - Math.abs(j));
        L -= re, j += re;
      }
    } else {
      var _e = [i.scale(D[0]), i.scale(D[1])], Ne = _e[0], bt = _e[1];
      if (R = Ne, L = o1({
        axis: u,
        ticks: s,
        bandSize: a,
        offset: p.offset,
        entry: N,
        index: k
      }), F = bt - Ne, j = p.size, U = {
        x: i.x,
        y: L,
        width: i.width,
        height: j
      }, Math.abs(q) > 0 && Math.abs(F) < Math.abs(q)) {
        var Yr = it(F || q) * (Math.abs(q) - Math.abs(F));
        F += Yr;
      }
    }
    return Re(Re(Re({}, N), {}, {
      x: R,
      y: L,
      width: F,
      height: j,
      value: c ? D : D[1],
      payload: N,
      background: U
    }, S && S[k] && S[k].props), {}, {
      tooltipPayload: [TO(r, N)],
      tooltipPosition: {
        x: R + F / 2,
        y: L + j / 2
      }
    });
  });
  return Re({
    data: I,
    layout: y
  }, h);
});
function Bi(e) {
  "@babel/helpers - typeof";
  return Bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Bi(e);
}
function h9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function DE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, XO(n.key), n);
  }
}
function p9(e, t, r) {
  return t && DE(e.prototype, t), r && DE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
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
function jt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ME(Object(r), !0).forEach(function(n) {
      hs(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ME(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hs(e, t, r) {
  return t = XO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function XO(e) {
  var t = m9(e, "string");
  return Bi(t) == "symbol" ? t : t + "";
}
function m9(e, t) {
  if (Bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var b9 = function(t, r, n, a, i) {
  var u = t.width, o = t.height, s = t.layout, c = t.children, l = Object.keys(r), f = {
    left: n.left,
    leftMirror: n.left,
    right: u - n.right,
    rightMirror: u - n.right,
    top: n.top,
    topMirror: n.top,
    bottom: o - n.bottom,
    bottomMirror: o - n.bottom
  }, h = !!gt(c, nr);
  return l.reduce(function(p, y) {
    var b = r[y], m = b.orientation, E = b.domain, g = b.padding, _ = g === void 0 ? {} : g, A = b.mirror, v = b.reversed, T = "".concat(m).concat(A ? "Mirror" : ""), S, I, N, k, D;
    if (b.type === "number" && (b.padding === "gap" || b.padding === "no-gap")) {
      var R = E[1] - E[0], L = 1 / 0, F = b.categoricalDomain.sort(_N);
      if (F.forEach(function(_e, Ne) {
        Ne > 0 && (L = Math.min((_e || 0) - (F[Ne - 1] || 0), L));
      }), Number.isFinite(L)) {
        var j = L / R, U = b.layout === "vertical" ? n.height : n.width;
        if (b.padding === "gap" && (S = j * U / 2), b.padding === "no-gap") {
          var q = ut(t.barCategoryGap, j * U), K = j * U / 2;
          S = K - q - (K - q) / U * q;
        }
      }
    }
    a === "xAxis" ? I = [n.left + (_.left || 0) + (S || 0), n.left + n.width - (_.right || 0) - (S || 0)] : a === "yAxis" ? I = s === "horizontal" ? [n.top + n.height - (_.bottom || 0), n.top + (_.top || 0)] : [n.top + (_.top || 0) + (S || 0), n.top + n.height - (_.bottom || 0) - (S || 0)] : I = b.range, v && (I = [I[1], I[0]]);
    var V = yO(b, i, h), J = V.scale, te = V.realScaleType;
    J.domain(E).range(I), gO(J);
    var Q = vO(J, jt(jt({}, b), {}, {
      realScaleType: te
    }));
    a === "xAxis" ? (D = m === "top" && !A || m === "bottom" && A, N = n.left, k = f[T] - D * b.height) : a === "yAxis" && (D = m === "left" && !A || m === "right" && A, N = f[T] - D * b.width, k = n.top);
    var re = jt(jt(jt({}, b), Q), {}, {
      realScaleType: te,
      x: N,
      y: k,
      scale: J,
      width: a === "xAxis" ? n.width : b.width,
      height: a === "yAxis" ? n.height : b.height
    });
    return re.bandSize = eo(re, Q), !b.hide && a === "xAxis" ? f[T] += (D ? -1 : 1) * re.height : b.hide || (f[T] += (D ? -1 : 1) * re.width), jt(jt({}, p), {}, hs({}, y, re));
  }, {});
}, QO = function(t, r) {
  var n = t.x, a = t.y, i = r.x, u = r.y;
  return {
    x: Math.min(n, i),
    y: Math.min(a, u),
    width: Math.abs(i - n),
    height: Math.abs(u - a)
  };
}, y9 = function(t) {
  var r = t.x1, n = t.y1, a = t.x2, i = t.y2;
  return QO({
    x: r,
    y: n
  }, {
    x: a,
    y: i
  });
}, ZO = /* @__PURE__ */ (function() {
  function e(t) {
    h9(this, e), this.scale = t;
  }
  return p9(e, [{
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
              var u = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(r) + u;
            }
            case "end": {
              var o = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(r) + o;
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
hs(ZO, "EPS", 1e-4);
var T0 = function(t) {
  var r = Object.keys(t).reduce(function(n, a) {
    return jt(jt({}, n), {}, hs({}, a, ZO.create(t[a])));
  }, {});
  return jt(jt({}, r), {}, {
    apply: function(a) {
      var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = i.bandAware, o = i.position;
      return WF(a, function(s, c) {
        return r[c].apply(s, {
          bandAware: u,
          position: o
        });
      });
    },
    isInRange: function(a) {
      return zO(a, function(i, u) {
        return r[u].isInRange(i);
      });
    }
  });
};
function g9(e) {
  return (e % 180 + 180) % 180;
}
var v9 = function(t) {
  var r = t.width, n = t.height, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, i = g9(a), u = i * Math.PI / 180, o = Math.atan(n / r), s = u > o && u < Math.PI - o ? n / Math.sin(u) : r / Math.cos(u);
  return Math.abs(s);
}, Ed, LE;
function E9() {
  if (LE) return Ed;
  LE = 1;
  var e = rr(), t = Gi(), r = Wo();
  function n(a) {
    return function(i, u, o) {
      var s = Object(i);
      if (!t(i)) {
        var c = e(u, 3);
        i = r(i), u = function(f) {
          return c(s[f], f, s);
        };
      }
      var l = a(i, u, o);
      return l > -1 ? s[c ? i[l] : l] : void 0;
    };
  }
  return Ed = n, Ed;
}
var Td, kE;
function T9() {
  if (kE) return Td;
  kE = 1;
  var e = HO();
  function t(r) {
    var n = e(r), a = n % 1;
    return n === n ? a ? n - a : n : 0;
  }
  return Td = t, Td;
}
var _d, BE;
function _9() {
  if (BE) return _d;
  BE = 1;
  var e = J_(), t = rr(), r = T9(), n = Math.max;
  function a(i, u, o) {
    var s = i == null ? 0 : i.length;
    if (!s)
      return -1;
    var c = o == null ? 0 : r(o);
    return c < 0 && (c = n(s + c, 0)), e(i, t(u, 3), c);
  }
  return _d = a, _d;
}
var Ad, jE;
function A9() {
  if (jE) return Ad;
  jE = 1;
  var e = E9(), t = _9(), r = e(t);
  return Ad = r, Ad;
}
var O9 = A9();
const S9 = /* @__PURE__ */ ye(O9);
var x9 = m_();
const w9 = /* @__PURE__ */ ye(x9);
var P9 = w9(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
}), _0 = /* @__PURE__ */ Wt(void 0), A0 = /* @__PURE__ */ Wt(void 0), JO = /* @__PURE__ */ Wt(void 0), eS = /* @__PURE__ */ Wt({}), tS = /* @__PURE__ */ Wt(void 0), rS = /* @__PURE__ */ Wt(0), nS = /* @__PURE__ */ Wt(0), FE = function(t) {
  var r = t.state, n = r.xAxisMap, a = r.yAxisMap, i = r.offset, u = t.clipPathId, o = t.children, s = t.width, c = t.height, l = P9(i);
  return /* @__PURE__ */ C.createElement(_0.Provider, {
    value: n
  }, /* @__PURE__ */ C.createElement(A0.Provider, {
    value: a
  }, /* @__PURE__ */ C.createElement(eS.Provider, {
    value: i
  }, /* @__PURE__ */ C.createElement(JO.Provider, {
    value: l
  }, /* @__PURE__ */ C.createElement(tS.Provider, {
    value: u
  }, /* @__PURE__ */ C.createElement(rS.Provider, {
    value: c
  }, /* @__PURE__ */ C.createElement(nS.Provider, {
    value: s
  }, o)))))));
}, I9 = function() {
  return Lt(tS);
}, aS = function(t) {
  var r = Lt(_0);
  r == null && bn();
  var n = r[t];
  return n == null && bn(), n;
}, C9 = function() {
  var t = Lt(_0);
  return Cr(t);
}, N9 = function() {
  var t = Lt(A0), r = S9(t, function(n) {
    return zO(n.domain, Number.isFinite);
  });
  return r || Cr(t);
}, iS = function(t) {
  var r = Lt(A0);
  r == null && bn();
  var n = r[t];
  return n == null && bn(), n;
}, R9 = function() {
  var t = Lt(JO);
  return t;
}, D9 = function() {
  return Lt(eS);
}, O0 = function() {
  return Lt(nS);
}, S0 = function() {
  return Lt(rS);
};
function la(e) {
  "@babel/helpers - typeof";
  return la = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, la(e);
}
function M9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function L9(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, oS(n.key), n);
  }
}
function k9(e, t, r) {
  return t && L9(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function B9(e, t, r) {
  return t = Eo(t), j9(e, uS() ? Reflect.construct(t, r || [], Eo(e).constructor) : t.apply(e, r));
}
function j9(e, t) {
  if (t && (la(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return F9(e);
}
function F9(e) {
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
function Eo(e) {
  return Eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Eo(e);
}
function $9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Gh(e, t);
}
function Gh(e, t) {
  return Gh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Gh(e, t);
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
      x0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $E(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function x0(e, t, r) {
  return t = oS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function oS(e) {
  var t = U9(e, "string");
  return la(t) == "symbol" ? t : t + "";
}
function U9(e, t) {
  if (la(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (la(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function H9(e, t) {
  return z9(e) || Y9(e, t) || W9(e, t) || q9();
}
function q9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function W9(e, t) {
  if (e) {
    if (typeof e == "string") return HE(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return HE(e, t);
  }
}
function HE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Y9(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function z9(e) {
  if (Array.isArray(e)) return e;
}
function Kh() {
  return Kh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Kh.apply(this, arguments);
}
var G9 = function(t, r) {
  var n;
  return /* @__PURE__ */ C.isValidElement(t) ? n = /* @__PURE__ */ C.cloneElement(t, r) : ae(t) ? n = t(r) : n = /* @__PURE__ */ C.createElement("line", Kh({}, r, {
    className: "recharts-reference-line-line"
  })), n;
}, K9 = function(t, r, n, a, i, u, o, s, c) {
  var l = i.x, f = i.y, h = i.width, p = i.height;
  if (n) {
    var y = c.y, b = t.y.apply(y, {
      position: u
    });
    if (Zt(c, "discard") && !t.y.isInRange(b))
      return null;
    var m = [{
      x: l + h,
      y: b
    }, {
      x: l,
      y: b
    }];
    return s === "left" ? m.reverse() : m;
  }
  if (r) {
    var E = c.x, g = t.x.apply(E, {
      position: u
    });
    if (Zt(c, "discard") && !t.x.isInRange(g))
      return null;
    var _ = [{
      x: g,
      y: f + p
    }, {
      x: g,
      y: f
    }];
    return o === "top" ? _.reverse() : _;
  }
  if (a) {
    var A = c.segment, v = A.map(function(T) {
      return t.apply(T, {
        position: u
      });
    });
    return Zt(c, "discard") && $F(v, function(T) {
      return !t.isInRange(T);
    }) ? null : v;
  }
  return null;
};
function V9(e) {
  var t = e.x, r = e.y, n = e.segment, a = e.xAxisId, i = e.yAxisId, u = e.shape, o = e.className, s = e.alwaysShow, c = I9(), l = aS(a), f = iS(i), h = R9();
  if (!c || !h)
    return null;
  Ut(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var p = T0({
    x: l.scale,
    y: f.scale
  }), y = $e(t), b = $e(r), m = n && n.length === 2, E = K9(p, y, b, m, h, e.position, l.orientation, f.orientation, e);
  if (!E)
    return null;
  var g = H9(E, 2), _ = g[0], A = _.x, v = _.y, T = g[1], S = T.x, I = T.y, N = Zt(e, "hidden") ? "url(#".concat(c, ")") : void 0, k = UE(UE({
    clipPath: N
  }, ne(e, !0)), {}, {
    x1: A,
    y1: v,
    x2: S,
    y2: I
  });
  return /* @__PURE__ */ C.createElement(me, {
    className: se("recharts-reference-line", o)
  }, G9(u, k), Ye.renderCallByParent(e, y9({
    x1: A,
    y1: v,
    x2: S,
    y2: I
  })));
}
var w0 = /* @__PURE__ */ (function(e) {
  function t() {
    return M9(this, t), B9(this, t, arguments);
  }
  return $9(t, e), k9(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ C.createElement(V9, this.props);
    }
  }]);
})(C.Component);
x0(w0, "displayName", "ReferenceLine");
x0(w0, "defaultProps", {
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
function fa(e) {
  "@babel/helpers - typeof";
  return fa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fa(e);
}
function qE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function WE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qE(Object(r), !0).forEach(function(n) {
      ps(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function X9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Q9(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, cS(n.key), n);
  }
}
function Z9(e, t, r) {
  return t && Q9(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function J9(e, t, r) {
  return t = To(t), e$(e, sS() ? Reflect.construct(t, r || [], To(e).constructor) : t.apply(e, r));
}
function e$(e, t) {
  if (t && (fa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return t$(e);
}
function t$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function sS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (sS = function() {
    return !!e;
  })();
}
function To(e) {
  return To = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, To(e);
}
function r$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Xh(e, t);
}
function Xh(e, t) {
  return Xh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Xh(e, t);
}
function ps(e, t, r) {
  return t = cS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function cS(e) {
  var t = n$(e, "string");
  return fa(t) == "symbol" ? t : t + "";
}
function n$(e, t) {
  if (fa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var a$ = function(t) {
  var r = t.x, n = t.y, a = t.xAxis, i = t.yAxis, u = T0({
    x: a.scale,
    y: i.scale
  }), o = u.apply({
    x: r,
    y: n
  }, {
    bandAware: !0
  });
  return Zt(t, "discard") && !u.isInRange(o) ? null : o;
}, ms = /* @__PURE__ */ (function(e) {
  function t() {
    return X9(this, t), J9(this, t, arguments);
  }
  return r$(t, e), Z9(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.x, i = n.y, u = n.r, o = n.alwaysShow, s = n.clipPathId, c = $e(a), l = $e(i);
      if (Ut(o === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !c || !l)
        return null;
      var f = a$(this.props);
      if (!f)
        return null;
      var h = f.x, p = f.y, y = this.props, b = y.shape, m = y.className, E = Zt(this.props, "hidden") ? "url(#".concat(s, ")") : void 0, g = WE(WE({
        clipPath: E
      }, ne(this.props, !0)), {}, {
        cx: h,
        cy: p
      });
      return /* @__PURE__ */ C.createElement(me, {
        className: se("recharts-reference-dot", m)
      }, t.renderDot(b, g), Ye.renderCallByParent(this.props, {
        x: h - u,
        y: p - u,
        width: 2 * u,
        height: 2 * u
      }));
    }
  }]);
})(C.Component);
ps(ms, "displayName", "ReferenceDot");
ps(ms, "defaultProps", {
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
ps(ms, "renderDot", function(e, t) {
  var r;
  return /* @__PURE__ */ C.isValidElement(e) ? r = /* @__PURE__ */ C.cloneElement(e, t) : ae(e) ? r = e(t) : r = /* @__PURE__ */ C.createElement(E0, Vh({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r;
});
function Qh() {
  return Qh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Qh.apply(this, arguments);
}
function da(e) {
  "@babel/helpers - typeof";
  return da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, da(e);
}
function YE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? YE(Object(r), !0).forEach(function(n) {
      bs(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : YE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function i$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function u$(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, fS(n.key), n);
  }
}
function o$(e, t, r) {
  return t && u$(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function s$(e, t, r) {
  return t = _o(t), c$(e, lS() ? Reflect.construct(t, r || [], _o(e).constructor) : t.apply(e, r));
}
function c$(e, t) {
  if (t && (da(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return l$(e);
}
function l$(e) {
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
function _o(e) {
  return _o = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, _o(e);
}
function f$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Zh(e, t);
}
function Zh(e, t) {
  return Zh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Zh(e, t);
}
function bs(e, t, r) {
  return t = fS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fS(e) {
  var t = d$(e, "string");
  return da(t) == "symbol" ? t : t + "";
}
function d$(e, t) {
  if (da(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (da(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var h$ = function(t, r, n, a, i) {
  var u = i.x1, o = i.x2, s = i.y1, c = i.y2, l = i.xAxis, f = i.yAxis;
  if (!l || !f) return null;
  var h = T0({
    x: l.scale,
    y: f.scale
  }), p = {
    x: t ? h.x.apply(u, {
      position: "start"
    }) : h.x.rangeMin,
    y: n ? h.y.apply(s, {
      position: "start"
    }) : h.y.rangeMin
  }, y = {
    x: r ? h.x.apply(o, {
      position: "end"
    }) : h.x.rangeMax,
    y: a ? h.y.apply(c, {
      position: "end"
    }) : h.y.rangeMax
  };
  return Zt(i, "discard") && (!h.isInRange(p) || !h.isInRange(y)) ? null : QO(p, y);
}, ys = /* @__PURE__ */ (function(e) {
  function t() {
    return i$(this, t), s$(this, t, arguments);
  }
  return f$(t, e), o$(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.x1, i = n.x2, u = n.y1, o = n.y2, s = n.className, c = n.alwaysShow, l = n.clipPathId;
      Ut(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var f = $e(a), h = $e(i), p = $e(u), y = $e(o), b = this.props.shape;
      if (!f && !h && !p && !y && !b)
        return null;
      var m = h$(f, h, p, y, this.props);
      if (!m && !b)
        return null;
      var E = Zt(this.props, "hidden") ? "url(#".concat(l, ")") : void 0;
      return /* @__PURE__ */ C.createElement(me, {
        className: se("recharts-reference-area", s)
      }, t.renderRect(b, zE(zE({
        clipPath: E
      }, ne(this.props, !0)), m)), Ye.renderCallByParent(this.props, m));
    }
  }]);
})(C.Component);
bs(ys, "displayName", "ReferenceArea");
bs(ys, "defaultProps", {
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
bs(ys, "renderRect", function(e, t) {
  var r;
  return /* @__PURE__ */ C.isValidElement(e) ? r = /* @__PURE__ */ C.cloneElement(e, t) : ae(e) ? r = e(t) : r = /* @__PURE__ */ C.createElement(v0, Qh({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
});
function dS(e, t, r) {
  if (t < 1)
    return [];
  if (t === 1 && r === void 0)
    return e;
  for (var n = [], a = 0; a < e.length; a += t)
    n.push(e[a]);
  return n;
}
function p$(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return v9(n, r);
}
function m$(e, t, r) {
  var n = r === "width", a = e.x, i = e.y, u = e.width, o = e.height;
  return t === 1 ? {
    start: n ? a : i,
    end: n ? a + u : i + o
  } : {
    start: n ? a + u : i + o,
    end: n ? a : i
  };
}
function Ao(e, t, r, n, a) {
  if (e * t < e * n || e * t > e * a)
    return !1;
  var i = r();
  return e * (t - e * i / 2 - n) >= 0 && e * (t + e * i / 2 - a) <= 0;
}
function b$(e, t) {
  return dS(e, t + 1);
}
function y$(e, t, r, n, a) {
  for (var i = (n || []).slice(), u = t.start, o = t.end, s = 0, c = 1, l = u, f = function() {
    var y = n?.[s];
    if (y === void 0)
      return {
        v: dS(n, c)
      };
    var b = s, m, E = function() {
      return m === void 0 && (m = r(y, b)), m;
    }, g = y.coordinate, _ = s === 0 || Ao(e, g, E, l, o);
    _ || (s = 0, l = u, c += 1), _ && (l = g + e * (E() / 2 + a), s += c);
  }, h; c <= i.length; )
    if (h = f(), h) return h.v;
  return [];
}
function ji(e) {
  "@babel/helpers - typeof";
  return ji = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ji(e);
}
function GE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? GE(Object(r), !0).forEach(function(n) {
      g$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : GE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function g$(e, t, r) {
  return t = v$(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function v$(e) {
  var t = E$(e, "string");
  return ji(t) == "symbol" ? t : t + "";
}
function E$(e, t) {
  if (ji(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ji(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function T$(e, t, r, n, a) {
  for (var i = (n || []).slice(), u = i.length, o = t.start, s = t.end, c = function(h) {
    var p = i[h], y, b = function() {
      return y === void 0 && (y = r(p, h)), y;
    };
    if (h === u - 1) {
      var m = e * (p.coordinate + e * b() / 2 - s);
      i[h] = p = Qe(Qe({}, p), {}, {
        tickCoord: m > 0 ? p.coordinate - m * e : p.coordinate
      });
    } else
      i[h] = p = Qe(Qe({}, p), {}, {
        tickCoord: p.coordinate
      });
    var E = Ao(e, p.tickCoord, b, o, s);
    E && (s = p.tickCoord - e * (b() / 2 + a), i[h] = Qe(Qe({}, p), {}, {
      isShow: !0
    }));
  }, l = u - 1; l >= 0; l--)
    c(l);
  return i;
}
function _$(e, t, r, n, a, i) {
  var u = (n || []).slice(), o = u.length, s = t.start, c = t.end;
  if (i) {
    var l = n[o - 1], f = r(l, o - 1), h = e * (l.coordinate + e * f / 2 - c);
    u[o - 1] = l = Qe(Qe({}, l), {}, {
      tickCoord: h > 0 ? l.coordinate - h * e : l.coordinate
    });
    var p = Ao(e, l.tickCoord, function() {
      return f;
    }, s, c);
    p && (c = l.tickCoord - e * (f / 2 + a), u[o - 1] = Qe(Qe({}, l), {}, {
      isShow: !0
    }));
  }
  for (var y = i ? o - 1 : o, b = function(g) {
    var _ = u[g], A, v = function() {
      return A === void 0 && (A = r(_, g)), A;
    };
    if (g === 0) {
      var T = e * (_.coordinate - e * v() / 2 - s);
      u[g] = _ = Qe(Qe({}, _), {}, {
        tickCoord: T < 0 ? _.coordinate - T * e : _.coordinate
      });
    } else
      u[g] = _ = Qe(Qe({}, _), {}, {
        tickCoord: _.coordinate
      });
    var S = Ao(e, _.tickCoord, v, s, c);
    S && (s = _.tickCoord + e * (v() / 2 + a), u[g] = Qe(Qe({}, _), {}, {
      isShow: !0
    }));
  }, m = 0; m < y; m++)
    b(m);
  return u;
}
function P0(e, t, r) {
  var n = e.tick, a = e.ticks, i = e.viewBox, u = e.minTickGap, o = e.orientation, s = e.interval, c = e.tickFormatter, l = e.unit, f = e.angle;
  if (!a || !a.length || !n)
    return [];
  if (z(s) || _a.isSsr)
    return b$(a, typeof s == "number" && z(s) ? s : 0);
  var h = [], p = o === "top" || o === "bottom" ? "width" : "height", y = l && p === "width" ? Va(l, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, b = function(_, A) {
    var v = ae(c) ? c(_.value, A) : _.value;
    return p === "width" ? p$(Va(v, {
      fontSize: t,
      letterSpacing: r
    }), y, f) : Va(v, {
      fontSize: t,
      letterSpacing: r
    })[p];
  }, m = a.length >= 2 ? it(a[1].coordinate - a[0].coordinate) : 1, E = m$(i, m, p);
  return s === "equidistantPreserveStart" ? y$(m, E, b, a, u) : (s === "preserveStart" || s === "preserveStartEnd" ? h = _$(m, E, b, a, u, s === "preserveStartEnd") : h = T$(m, E, b, a, u), h.filter(function(g) {
    return g.isShow;
  }));
}
var A$ = ["viewBox"], O$ = ["viewBox"], S$ = ["ticks"];
function ha(e) {
  "@babel/helpers - typeof";
  return ha = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ha(e);
}
function Fn() {
  return Fn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Fn.apply(this, arguments);
}
function KE(e, t) {
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
    t % 2 ? KE(Object(r), !0).forEach(function(n) {
      I0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : KE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Od(e, t) {
  if (e == null) return {};
  var r = x$(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function x$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function w$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function VE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, pS(n.key), n);
  }
}
function P$(e, t, r) {
  return t && VE(e.prototype, t), r && VE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function I$(e, t, r) {
  return t = Oo(t), C$(e, hS() ? Reflect.construct(t, r || [], Oo(e).constructor) : t.apply(e, r));
}
function C$(e, t) {
  if (t && (ha(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return N$(e);
}
function N$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function hS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (hS = function() {
    return !!e;
  })();
}
function Oo(e) {
  return Oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Oo(e);
}
function R$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Jh(e, t);
}
function Jh(e, t) {
  return Jh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Jh(e, t);
}
function I0(e, t, r) {
  return t = pS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pS(e) {
  var t = D$(e, "string");
  return ha(t) == "symbol" ? t : t + "";
}
function D$(e, t) {
  if (ha(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ha(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var xa = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return w$(this, t), n = I$(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n;
  }
  return R$(t, e), P$(t, [{
    key: "shouldComponentUpdate",
    value: function(n, a) {
      var i = n.viewBox, u = Od(n, A$), o = this.props, s = o.viewBox, c = Od(o, O$);
      return !Hn(i, s) || !Hn(u, c) || !Hn(a, this.state);
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
      var a = this.props, i = a.x, u = a.y, o = a.width, s = a.height, c = a.orientation, l = a.tickSize, f = a.mirror, h = a.tickMargin, p, y, b, m, E, g, _ = f ? -1 : 1, A = n.tickSize || l, v = z(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (c) {
        case "top":
          p = y = n.coordinate, m = u + +!f * s, b = m - _ * A, g = b - _ * h, E = v;
          break;
        case "left":
          b = m = n.coordinate, y = i + +!f * o, p = y - _ * A, E = p - _ * h, g = v;
          break;
        case "right":
          b = m = n.coordinate, y = i + +f * o, p = y + _ * A, E = p + _ * h, g = v;
          break;
        default:
          p = y = n.coordinate, m = u + +f * s, b = m + _ * A, g = b + _ * h, E = v;
          break;
      }
      return {
        line: {
          x1: p,
          y1: b,
          x2: y,
          y2: m
        },
        tick: {
          x: E,
          y: g
        }
      };
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props, a = n.orientation, i = n.mirror, u;
      switch (a) {
        case "left":
          u = i ? "start" : "end";
          break;
        case "right":
          u = i ? "end" : "start";
          break;
        default:
          u = "middle";
          break;
      }
      return u;
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function() {
      var n = this.props, a = n.orientation, i = n.mirror, u = "end";
      switch (a) {
        case "left":
        case "right":
          u = "middle";
          break;
        case "top":
          u = i ? "start" : "end";
          break;
        default:
          u = i ? "end" : "start";
          break;
      }
      return u;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.x, i = n.y, u = n.width, o = n.height, s = n.orientation, c = n.mirror, l = n.axisLine, f = Be(Be(Be({}, ne(this.props, !1)), ne(l, !1)), {}, {
        fill: "none"
      });
      if (s === "top" || s === "bottom") {
        var h = +(s === "top" && !c || s === "bottom" && c);
        f = Be(Be({}, f), {}, {
          x1: a,
          y1: i + h * o,
          x2: a + u,
          y2: i + h * o
        });
      } else {
        var p = +(s === "left" && !c || s === "right" && c);
        f = Be(Be({}, f), {}, {
          x1: a + p * u,
          y1: i,
          x2: a + p * u,
          y2: i + o
        });
      }
      return /* @__PURE__ */ C.createElement("line", Fn({}, f, {
        className: se("recharts-cartesian-axis-line", Tt(l, "className"))
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
        var u = this, o = this.props, s = o.tickLine, c = o.stroke, l = o.tick, f = o.tickFormatter, h = o.unit, p = P0(Be(Be({}, this.props), {}, {
          ticks: n
        }), a, i), y = this.getTickTextAnchor(), b = this.getTickVerticalAnchor(), m = ne(this.props, !1), E = ne(l, !1), g = Be(Be({}, m), {}, {
          fill: "none"
        }, ne(s, !1)), _ = p.map(function(A, v) {
          var T = u.getTickLineCoord(A), S = T.line, I = T.tick, N = Be(Be(Be(Be({
            textAnchor: y,
            verticalAnchor: b
          }, m), {}, {
            stroke: "none",
            fill: c
          }, E), I), {}, {
            index: v,
            payload: A,
            visibleTicksCount: p.length,
            tickFormatter: f
          });
          return /* @__PURE__ */ C.createElement(me, Fn({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(A.value, "-").concat(A.coordinate, "-").concat(A.tickCoord)
          }, hn(u.props, A, v)), s && /* @__PURE__ */ C.createElement("line", Fn({}, g, S, {
            className: se("recharts-cartesian-axis-tick-line", Tt(s, "className"))
          })), l && t.renderTickItem(l, N, "".concat(ae(f) ? f(A.value, v) : A.value).concat(h || "")));
        });
        return /* @__PURE__ */ C.createElement("g", {
          className: "recharts-cartesian-axis-ticks"
        }, _);
      }
    )
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.axisLine, u = a.width, o = a.height, s = a.ticksGenerator, c = a.className, l = a.hide;
      if (l)
        return null;
      var f = this.props, h = f.ticks, p = Od(f, S$), y = h;
      return ae(s) && (y = h && h.length > 0 ? s(this.props) : s(p)), u <= 0 || o <= 0 || !y || !y.length ? null : /* @__PURE__ */ C.createElement(me, {
        className: se("recharts-cartesian-axis", c),
        ref: function(m) {
          n.layerReference = m;
        }
      }, i && this.renderAxisLine(), this.renderTicks(y, this.state.fontSize, this.state.letterSpacing), Ye.renderCallByParent(this.props));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var u, o = se(a.className, "recharts-cartesian-axis-tick-value");
      return /* @__PURE__ */ C.isValidElement(n) ? u = /* @__PURE__ */ C.cloneElement(n, Be(Be({}, a), {}, {
        className: o
      })) : ae(n) ? u = n(Be(Be({}, a), {}, {
        className: o
      })) : u = /* @__PURE__ */ C.createElement(pn, Fn({}, a, {
        className: "recharts-cartesian-axis-tick-value"
      }), i), u;
    }
  }]);
})(hT);
I0(xa, "displayName", "CartesianAxis");
I0(xa, "defaultProps", {
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
var M$ = ["x1", "y1", "x2", "y2", "key"], L$ = ["offset"];
function yn(e) {
  "@babel/helpers - typeof";
  return yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, yn(e);
}
function XE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Je(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? XE(Object(r), !0).forEach(function(n) {
      k$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : XE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function k$(e, t, r) {
  return t = B$(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function B$(e) {
  var t = j$(e, "string");
  return yn(t) == "symbol" ? t : t + "";
}
function j$(e, t) {
  if (yn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (yn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
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
function QE(e, t) {
  if (e == null) return {};
  var r = F$(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function F$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var $$ = function(t) {
  var r = t.fill;
  if (!r || r === "none")
    return null;
  var n = t.fillOpacity, a = t.x, i = t.y, u = t.width, o = t.height, s = t.ry;
  return /* @__PURE__ */ C.createElement("rect", {
    x: a,
    y: i,
    ry: s,
    width: u,
    height: o,
    stroke: "none",
    fill: r,
    fillOpacity: n,
    className: "recharts-cartesian-grid-bg"
  });
};
function mS(e, t) {
  var r;
  if (/* @__PURE__ */ C.isValidElement(e))
    r = /* @__PURE__ */ C.cloneElement(e, t);
  else if (ae(e))
    r = e(t);
  else {
    var n = t.x1, a = t.y1, i = t.x2, u = t.y2, o = t.key, s = QE(t, M$), c = ne(s, !1);
    c.offset;
    var l = QE(c, L$);
    r = /* @__PURE__ */ C.createElement("line", an({}, l, {
      x1: n,
      y1: a,
      x2: i,
      y2: u,
      fill: "none",
      key: o
    }));
  }
  return r;
}
function U$(e) {
  var t = e.x, r = e.width, n = e.horizontal, a = n === void 0 ? !0 : n, i = e.horizontalPoints;
  if (!a || !i || !i.length)
    return null;
  var u = i.map(function(o, s) {
    var c = Je(Je({}, e), {}, {
      x1: t,
      y1: o,
      x2: t + r,
      y2: o,
      key: "line-".concat(s),
      index: s
    });
    return mS(a, c);
  });
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, u);
}
function H$(e) {
  var t = e.y, r = e.height, n = e.vertical, a = n === void 0 ? !0 : n, i = e.verticalPoints;
  if (!a || !i || !i.length)
    return null;
  var u = i.map(function(o, s) {
    var c = Je(Je({}, e), {}, {
      x1: o,
      y1: t,
      x2: o,
      y2: t + r,
      key: "line-".concat(s),
      index: s
    });
    return mS(a, c);
  });
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, u);
}
function q$(e) {
  var t = e.horizontalFill, r = e.fillOpacity, n = e.x, a = e.y, i = e.width, u = e.height, o = e.horizontalPoints, s = e.horizontal, c = s === void 0 ? !0 : s;
  if (!c || !t || !t.length)
    return null;
  var l = o.map(function(h) {
    return Math.round(h + a - a);
  }).sort(function(h, p) {
    return h - p;
  });
  a !== l[0] && l.unshift(0);
  var f = l.map(function(h, p) {
    var y = !l[p + 1], b = y ? a + u - h : l[p + 1] - h;
    if (b <= 0)
      return null;
    var m = p % t.length;
    return /* @__PURE__ */ C.createElement("rect", {
      key: "react-".concat(p),
      y: h,
      x: n,
      height: b,
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
function W$(e) {
  var t = e.vertical, r = t === void 0 ? !0 : t, n = e.verticalFill, a = e.fillOpacity, i = e.x, u = e.y, o = e.width, s = e.height, c = e.verticalPoints;
  if (!r || !n || !n.length)
    return null;
  var l = c.map(function(h) {
    return Math.round(h + i - i);
  }).sort(function(h, p) {
    return h - p;
  });
  i !== l[0] && l.unshift(0);
  var f = l.map(function(h, p) {
    var y = !l[p + 1], b = y ? i + o - h : l[p + 1] - h;
    if (b <= 0)
      return null;
    var m = p % n.length;
    return /* @__PURE__ */ C.createElement("rect", {
      key: "react-".concat(p),
      x: h,
      y: u,
      width: b,
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
var Y$ = function(t, r) {
  var n = t.xAxis, a = t.width, i = t.height, u = t.offset;
  return bO(P0(Je(Je(Je({}, xa.defaultProps), n), {}, {
    ticks: cr(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: i
    }
  })), u.left, u.left + u.width, r);
}, z$ = function(t, r) {
  var n = t.yAxis, a = t.width, i = t.height, u = t.offset;
  return bO(P0(Je(Je(Je({}, xa.defaultProps), n), {}, {
    ticks: cr(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: i
    }
  })), u.top, u.top + u.height, r);
}, Cn = {
  horizontal: !0,
  vertical: !0,
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
function Ji(e) {
  var t, r, n, a, i, u, o = O0(), s = S0(), c = D9(), l = Je(Je({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : Cn.stroke,
    fill: (r = e.fill) !== null && r !== void 0 ? r : Cn.fill,
    horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : Cn.horizontal,
    horizontalFill: (a = e.horizontalFill) !== null && a !== void 0 ? a : Cn.horizontalFill,
    vertical: (i = e.vertical) !== null && i !== void 0 ? i : Cn.vertical,
    verticalFill: (u = e.verticalFill) !== null && u !== void 0 ? u : Cn.verticalFill,
    x: z(e.x) ? e.x : c.left,
    y: z(e.y) ? e.y : c.top,
    width: z(e.width) ? e.width : c.width,
    height: z(e.height) ? e.height : c.height
  }), f = l.x, h = l.y, p = l.width, y = l.height, b = l.syncWithTicks, m = l.horizontalValues, E = l.verticalValues, g = C9(), _ = N9();
  if (!z(p) || p <= 0 || !z(y) || y <= 0 || !z(f) || f !== +f || !z(h) || h !== +h)
    return null;
  var A = l.verticalCoordinatesGenerator || Y$, v = l.horizontalCoordinatesGenerator || z$, T = l.horizontalPoints, S = l.verticalPoints;
  if ((!T || !T.length) && ae(v)) {
    var I = m && m.length, N = v({
      yAxis: _ ? Je(Je({}, _), {}, {
        ticks: I ? m : _.ticks
      }) : void 0,
      width: o,
      height: s,
      offset: c
    }, I ? !0 : b);
    Ut(Array.isArray(N), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(yn(N), "]")), Array.isArray(N) && (T = N);
  }
  if ((!S || !S.length) && ae(A)) {
    var k = E && E.length, D = A({
      xAxis: g ? Je(Je({}, g), {}, {
        ticks: k ? E : g.ticks
      }) : void 0,
      width: o,
      height: s,
      offset: c
    }, k ? !0 : b);
    Ut(Array.isArray(D), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(yn(D), "]")), Array.isArray(D) && (S = D);
  }
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ C.createElement($$, {
    fill: l.fill,
    fillOpacity: l.fillOpacity,
    x: l.x,
    y: l.y,
    width: l.width,
    height: l.height,
    ry: l.ry
  }), /* @__PURE__ */ C.createElement(U$, an({}, l, {
    offset: c,
    horizontalPoints: T,
    xAxis: g,
    yAxis: _
  })), /* @__PURE__ */ C.createElement(H$, an({}, l, {
    offset: c,
    verticalPoints: S,
    xAxis: g,
    yAxis: _
  })), /* @__PURE__ */ C.createElement(q$, an({}, l, {
    horizontalPoints: T
  })), /* @__PURE__ */ C.createElement(W$, an({}, l, {
    verticalPoints: S
  })));
}
Ji.displayName = "CartesianGrid";
function pa(e) {
  "@babel/helpers - typeof";
  return pa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pa(e);
}
function G$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function K$(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, gS(n.key), n);
  }
}
function V$(e, t, r) {
  return t && K$(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function X$(e, t, r) {
  return t = So(t), Q$(e, bS() ? Reflect.construct(t, r || [], So(e).constructor) : t.apply(e, r));
}
function Q$(e, t) {
  if (t && (pa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Z$(e);
}
function Z$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function bS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (bS = function() {
    return !!e;
  })();
}
function So(e) {
  return So = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, So(e);
}
function J$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ep(e, t);
}
function ep(e, t) {
  return ep = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ep(e, t);
}
function yS(e, t, r) {
  return t = gS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function gS(e) {
  var t = eU(e, "string");
  return pa(t) == "symbol" ? t : t + "";
}
function eU(e, t) {
  if (pa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
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
function tU(e) {
  var t = e.xAxisId, r = O0(), n = S0(), a = aS(t);
  return a == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ jr.createElement(xa, tp({}, a, {
      className: se("recharts-".concat(a.axisType, " ").concat(a.axisType), a.className),
      viewBox: {
        x: 0,
        y: 0,
        width: r,
        height: n
      },
      ticksGenerator: function(u) {
        return cr(u, !0);
      }
    }))
  );
}
var Sn = /* @__PURE__ */ (function(e) {
  function t() {
    return G$(this, t), X$(this, t, arguments);
  }
  return J$(t, e), V$(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ jr.createElement(tU, this.props);
    }
  }]);
})(jr.Component);
yS(Sn, "displayName", "XAxis");
yS(Sn, "defaultProps", {
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
function ma(e) {
  "@babel/helpers - typeof";
  return ma = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ma(e);
}
function rU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function nU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, TS(n.key), n);
  }
}
function aU(e, t, r) {
  return t && nU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function iU(e, t, r) {
  return t = xo(t), uU(e, vS() ? Reflect.construct(t, r || [], xo(e).constructor) : t.apply(e, r));
}
function uU(e, t) {
  if (t && (ma(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return oU(e);
}
function oU(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function vS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (vS = function() {
    return !!e;
  })();
}
function xo(e) {
  return xo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, xo(e);
}
function sU(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && rp(e, t);
}
function rp(e, t) {
  return rp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, rp(e, t);
}
function ES(e, t, r) {
  return t = TS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function TS(e) {
  var t = cU(e, "string");
  return ma(t) == "symbol" ? t : t + "";
}
function cU(e, t) {
  if (ma(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ma(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function np() {
  return np = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, np.apply(this, arguments);
}
var lU = function(t) {
  var r = t.yAxisId, n = O0(), a = S0(), i = iS(r);
  return i == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ jr.createElement(xa, np({}, i, {
      className: se("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: a
      },
      ticksGenerator: function(o) {
        return cr(o, !0);
      }
    }))
  );
}, xn = /* @__PURE__ */ (function(e) {
  function t() {
    return rU(this, t), iU(this, t, arguments);
  }
  return sU(t, e), aU(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ jr.createElement(lU, this.props);
    }
  }]);
})(jr.Component);
ES(xn, "displayName", "YAxis");
ES(xn, "defaultProps", {
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
function ZE(e) {
  return pU(e) || hU(e) || dU(e) || fU();
}
function fU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function dU(e, t) {
  if (e) {
    if (typeof e == "string") return ap(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ap(e, t);
  }
}
function hU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function pU(e) {
  if (Array.isArray(e)) return ap(e);
}
function ap(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var ip = function(t, r, n, a, i) {
  var u = Dt(t, w0), o = Dt(t, ms), s = [].concat(ZE(u), ZE(o)), c = Dt(t, ys), l = "".concat(a, "Id"), f = a[0], h = r;
  if (s.length && (h = s.reduce(function(b, m) {
    if (m.props[l] === n && Zt(m.props, "extendDomain") && z(m.props[f])) {
      var E = m.props[f];
      return [Math.min(b[0], E), Math.max(b[1], E)];
    }
    return b;
  }, h)), c.length) {
    var p = "".concat(f, "1"), y = "".concat(f, "2");
    h = c.reduce(function(b, m) {
      if (m.props[l] === n && Zt(m.props, "extendDomain") && z(m.props[p]) && z(m.props[y])) {
        var E = m.props[p], g = m.props[y];
        return [Math.min(b[0], E, g), Math.max(b[1], E, g)];
      }
      return b;
    }, h);
  }
  return i && i.length && (h = i.reduce(function(b, m) {
    return z(m) ? [Math.min(b[0], m), Math.max(b[1], m)] : b;
  }, h)), h;
}, Sd = { exports: {} }, JE;
function mU() {
  return JE || (JE = 1, (function(e) {
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
      var p = new a(l, f || s, h), y = r ? r + c : c;
      return s._events[y] ? s._events[y].fn ? s._events[y] = [s._events[y], p] : s._events[y].push(p) : (s._events[y] = p, s._eventsCount++), s;
    }
    function u(s, c) {
      --s._eventsCount === 0 ? s._events = new n() : delete s._events[c];
    }
    function o() {
      this._events = new n(), this._eventsCount = 0;
    }
    o.prototype.eventNames = function() {
      var c = [], l, f;
      if (this._eventsCount === 0) return c;
      for (f in l = this._events)
        t.call(l, f) && c.push(r ? f.slice(1) : f);
      return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(l)) : c;
    }, o.prototype.listeners = function(c) {
      var l = r ? r + c : c, f = this._events[l];
      if (!f) return [];
      if (f.fn) return [f.fn];
      for (var h = 0, p = f.length, y = new Array(p); h < p; h++)
        y[h] = f[h].fn;
      return y;
    }, o.prototype.listenerCount = function(c) {
      var l = r ? r + c : c, f = this._events[l];
      return f ? f.fn ? 1 : f.length : 0;
    }, o.prototype.emit = function(c, l, f, h, p, y) {
      var b = r ? r + c : c;
      if (!this._events[b]) return !1;
      var m = this._events[b], E = arguments.length, g, _;
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
            return m.fn.call(m.context, l, f, h, p, y), !0;
        }
        for (_ = 1, g = new Array(E - 1); _ < E; _++)
          g[_ - 1] = arguments[_];
        m.fn.apply(m.context, g);
      } else {
        var A = m.length, v;
        for (_ = 0; _ < A; _++)
          switch (m[_].once && this.removeListener(c, m[_].fn, void 0, !0), E) {
            case 1:
              m[_].fn.call(m[_].context);
              break;
            case 2:
              m[_].fn.call(m[_].context, l);
              break;
            case 3:
              m[_].fn.call(m[_].context, l, f);
              break;
            case 4:
              m[_].fn.call(m[_].context, l, f, h);
              break;
            default:
              if (!g) for (v = 1, g = new Array(E - 1); v < E; v++)
                g[v - 1] = arguments[v];
              m[_].fn.apply(m[_].context, g);
          }
      }
      return !0;
    }, o.prototype.on = function(c, l, f) {
      return i(this, c, l, f, !1);
    }, o.prototype.once = function(c, l, f) {
      return i(this, c, l, f, !0);
    }, o.prototype.removeListener = function(c, l, f, h) {
      var p = r ? r + c : c;
      if (!this._events[p]) return this;
      if (!l)
        return u(this, p), this;
      var y = this._events[p];
      if (y.fn)
        y.fn === l && (!h || y.once) && (!f || y.context === f) && u(this, p);
      else {
        for (var b = 0, m = [], E = y.length; b < E; b++)
          (y[b].fn !== l || h && !y[b].once || f && y[b].context !== f) && m.push(y[b]);
        m.length ? this._events[p] = m.length === 1 ? m[0] : m : u(this, p);
      }
      return this;
    }, o.prototype.removeAllListeners = function(c) {
      var l;
      return c ? (l = r ? r + c : c, this._events[l] && u(this, l)) : (this._events = new n(), this._eventsCount = 0), this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r, o.EventEmitter = o, e.exports = o;
  })(Sd)), Sd.exports;
}
var bU = mU();
const yU = /* @__PURE__ */ ye(bU);
var xd = new yU(), wd = "recharts.syncMouseEvents";
function Fi(e) {
  "@babel/helpers - typeof";
  return Fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fi(e);
}
function gU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function vU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, _S(n.key), n);
  }
}
function EU(e, t, r) {
  return t && vU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Pd(e, t, r) {
  return t = _S(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _S(e) {
  var t = TU(e, "string");
  return Fi(t) == "symbol" ? t : t + "";
}
function TU(e, t) {
  if (Fi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Fi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var _U = /* @__PURE__ */ (function() {
  function e() {
    gU(this, e), Pd(this, "activeIndex", 0), Pd(this, "coordinateList", []), Pd(this, "layout", "horizontal");
  }
  return EU(e, [{
    key: "setDetails",
    value: function(r) {
      var n, a = r.coordinateList, i = a === void 0 ? null : a, u = r.container, o = u === void 0 ? null : u, s = r.layout, c = s === void 0 ? null : s, l = r.offset, f = l === void 0 ? null : l, h = r.mouseHandlerCallback, p = h === void 0 ? null : h;
      this.coordinateList = (n = i ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = o ?? this.container, this.layout = c ?? this.layout, this.offset = f ?? this.offset, this.mouseHandlerCallback = p ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
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
        var a = this.container.getBoundingClientRect(), i = a.x, u = a.y, o = a.height, s = this.coordinateList[this.activeIndex].coordinate, c = ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0, l = ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0, f = i + s + c, h = u + this.offset.top + o / 2 + l;
        this.mouseHandlerCallback({
          pageX: f,
          pageY: h
        });
      }
    }
  }]);
})();
function AU(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e?.[0], a = e?.[1];
    if (n && a && z(n) && z(a))
      return !0;
  }
  return !1;
}
function OU(e, t, r, n) {
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
function AS(e) {
  var t = e.cx, r = e.cy, n = e.radius, a = e.startAngle, i = e.endAngle, u = Te(t, r, n, a), o = Te(t, r, n, i);
  return {
    points: [u, o],
    cx: t,
    cy: r,
    radius: n,
    startAngle: a,
    endAngle: i
  };
}
function SU(e, t, r) {
  var n, a, i, u;
  if (e === "horizontal")
    n = t.x, i = n, a = r.top, u = r.top + r.height;
  else if (e === "vertical")
    a = t.y, u = a, n = r.left, i = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var o = t.cx, s = t.cy, c = t.innerRadius, l = t.outerRadius, f = t.angle, h = Te(o, s, c, f), p = Te(o, s, l, f);
      n = h.x, a = h.y, i = p.x, u = p.y;
    } else
      return AS(t);
  return [{
    x: n,
    y: a
  }, {
    x: i,
    y: u
  }];
}
function $i(e) {
  "@babel/helpers - typeof";
  return $i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $i(e);
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
function bu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eT(Object(r), !0).forEach(function(n) {
      xU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xU(e, t, r) {
  return t = wU(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wU(e) {
  var t = PU(e, "string");
  return $i(t) == "symbol" ? t : t + "";
}
function PU(e, t) {
  if ($i(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if ($i(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function IU(e) {
  var t, r, n = e.element, a = e.tooltipEventType, i = e.isActive, u = e.activeCoordinate, o = e.activePayload, s = e.offset, c = e.activeTooltipIndex, l = e.tooltipAxisBandSize, f = e.layout, h = e.chartName, p = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !p || !i || !u || h !== "ScatterChart" && a !== "axis")
    return null;
  var y, b = wh;
  if (h === "ScatterChart")
    y = u, b = lj;
  else if (h === "BarChart")
    y = OU(f, u, s, l), b = v0;
  else if (f === "radial") {
    var m = AS(u), E = m.cx, g = m.cy, _ = m.radius, A = m.startAngle, v = m.endAngle;
    y = {
      cx: E,
      cy: g,
      startAngle: A,
      endAngle: v,
      innerRadius: _,
      outerRadius: _
    }, b = wO;
  } else
    y = {
      points: SU(f, u, s)
    }, b = wh;
  var T = bu(bu(bu(bu({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), y), ne(p, !1)), {}, {
    payload: o,
    payloadIndex: c,
    className: se("recharts-tooltip-cursor", p.className)
  });
  return /* @__PURE__ */ Ct(p) ? /* @__PURE__ */ De(p, T) : /* @__PURE__ */ ti(b, T);
}
var CU = ["item"], NU = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function ba(e) {
  "@babel/helpers - typeof";
  return ba = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ba(e);
}
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
function tT(e, t) {
  return MU(e) || DU(e, t) || SS(e, t) || RU();
}
function RU() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function DU(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, u, o = [], s = !0, c = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(s = (n = i.call(r)).done) && (o.push(n.value), o.length !== t); s = !0) ;
    } catch (l) {
      c = !0, a = l;
    } finally {
      try {
        if (!s && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (c) throw a;
      }
    }
    return o;
  }
}
function MU(e) {
  if (Array.isArray(e)) return e;
}
function rT(e, t) {
  if (e == null) return {};
  var r = LU(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function LU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function kU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function BU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, xS(n.key), n);
  }
}
function jU(e, t, r) {
  return t && BU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function FU(e, t, r) {
  return t = wo(t), $U(e, OS() ? Reflect.construct(t, r || [], wo(e).constructor) : t.apply(e, r));
}
function $U(e, t) {
  if (t && (ba(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return UU(e);
}
function UU(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function OS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (OS = function() {
    return !!e;
  })();
}
function wo(e) {
  return wo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, wo(e);
}
function HU(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && up(e, t);
}
function up(e, t) {
  return up = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, up(e, t);
}
function ya(e) {
  return YU(e) || WU(e) || SS(e) || qU();
}
function qU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function SS(e, t) {
  if (e) {
    if (typeof e == "string") return op(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return op(e, t);
  }
}
function WU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function YU(e) {
  if (Array.isArray(e)) return op(e);
}
function op(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
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
function $(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nT(Object(r), !0).forEach(function(n) {
      ee(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ee(e, t, r) {
  return t = xS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function xS(e) {
  var t = zU(e, "string");
  return ba(t) == "symbol" ? t : t + "";
}
function zU(e, t) {
  if (ba(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ba(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var GU = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, KU = {
  width: "100%",
  height: "100%"
}, wS = {
  x: 0,
  y: 0
};
function yu(e) {
  return e;
}
var VU = function(t, r) {
  return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius;
}, XU = function(t, r, n, a) {
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
      var u = i.coordinate, o = a.radius;
      return $($($({}, a), Te(a.cx, a.cy, o, u)), {}, {
        angle: u,
        radius: o
      });
    }
    var s = i.coordinate, c = a.angle;
    return $($($({}, a), Te(a.cx, a.cy, s, c)), {}, {
      angle: c,
      radius: s
    });
  }
  return wS;
}, gs = function(t, r) {
  var n = r.graphicalItems, a = r.dataStartIndex, i = r.dataEndIndex, u = (n ?? []).reduce(function(o, s) {
    var c = s.props.data;
    return c && c.length ? [].concat(ya(o), ya(c)) : o;
  }, []);
  return u.length > 0 ? u : t && t.length && z(a) && z(i) ? t.slice(a, i + 1) : [];
};
function PS(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var sp = function(t, r, n, a) {
  var i = t.graphicalItems, u = t.tooltipAxis, o = gs(r, t);
  return n < 0 || !i || !i.length || n >= o.length ? null : i.reduce(function(s, c) {
    var l, f = (l = c.props.data) !== null && l !== void 0 ? l : r;
    f && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= n && (f = f.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var h;
    if (u.dataKey && !u.allowDuplicatedCategory) {
      var p = f === void 0 ? o : f;
      h = Hd(p, u.dataKey, a);
    } else
      h = f && f[n] || o[n];
    return h ? [].concat(ya(s), [TO(c, h)]) : s;
  }, []);
}, aT = function(t, r, n, a) {
  var i = a || {
    x: t.chartX,
    y: t.chartY
  }, u = VU(i, n), o = t.orderedTooltipTicks, s = t.tooltipAxis, c = t.tooltipTicks, l = w4(u, o, c, s);
  if (l >= 0 && c) {
    var f = c[l] && c[l].value, h = sp(t, r, l, f), p = XU(n, o, l, i);
    return {
      activeTooltipIndex: l,
      activeLabel: f,
      activePayload: h,
      activeCoordinate: p
    };
  }
  return null;
}, QU = function(t, r) {
  var n = r.axes, a = r.graphicalItems, i = r.axisType, u = r.axisIdKey, o = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.layout, f = t.children, h = t.stackOffset, p = mO(l, i);
  return n.reduce(function(y, b) {
    var m, E = b.type.defaultProps !== void 0 ? $($({}, b.type.defaultProps), b.props) : b.props, g = E.type, _ = E.dataKey, A = E.allowDataOverflow, v = E.allowDuplicatedCategory, T = E.scale, S = E.ticks, I = E.includeHidden, N = E[u];
    if (y[N])
      return y;
    var k = gs(t.data, {
      graphicalItems: a.filter(function(Q) {
        var re, _e = u in Q.props ? Q.props[u] : (re = Q.type.defaultProps) === null || re === void 0 ? void 0 : re[u];
        return _e === N;
      }),
      dataStartIndex: s,
      dataEndIndex: c
    }), D = k.length, R, L, F;
    AU(E.domain, A, g) && (R = _h(E.domain, null, A), p && (g === "number" || T !== "auto") && (F = Qa(k, _, "category")));
    var j = PS(g);
    if (!R || R.length === 0) {
      var U, q = (U = E.domain) !== null && U !== void 0 ? U : j;
      if (_) {
        if (R = Qa(k, _, g), g === "category" && p) {
          var K = TN(R);
          v && K ? (L = R, R = mo(0, D)) : v || (R = l1(q, R, b).reduce(function(Q, re) {
            return Q.indexOf(re) >= 0 ? Q : [].concat(ya(Q), [re]);
          }, []));
        } else if (g === "category")
          v ? R = R.filter(function(Q) {
            return Q !== "" && !ce(Q);
          }) : R = l1(q, R, b).reduce(function(Q, re) {
            return Q.indexOf(re) >= 0 || re === "" || ce(re) ? Q : [].concat(ya(Q), [re]);
          }, []);
        else if (g === "number") {
          var V = R4(k, a.filter(function(Q) {
            var re, _e, Ne = u in Q.props ? Q.props[u] : (re = Q.type.defaultProps) === null || re === void 0 ? void 0 : re[u], bt = "hide" in Q.props ? Q.props.hide : (_e = Q.type.defaultProps) === null || _e === void 0 ? void 0 : _e.hide;
            return Ne === N && (I || !bt);
          }), _, i, l);
          V && (R = V);
        }
        p && (g === "number" || T !== "auto") && (F = Qa(k, _, "category"));
      } else p ? R = mo(0, D) : o && o[N] && o[N].hasStack && g === "number" ? R = h === "expand" ? [0, 1] : EO(o[N].stackGroups, s, c) : R = pO(k, a.filter(function(Q) {
        var re = u in Q.props ? Q.props[u] : Q.type.defaultProps[u], _e = "hide" in Q.props ? Q.props.hide : Q.type.defaultProps.hide;
        return re === N && (I || !_e);
      }), g, l, !0);
      if (g === "number")
        R = ip(f, R, N, i, S), q && (R = _h(q, R, A));
      else if (g === "category" && q) {
        var J = q, te = R.every(function(Q) {
          return J.indexOf(Q) >= 0;
        });
        te && (R = J);
      }
    }
    return $($({}, y), {}, ee({}, N, $($({}, E), {}, {
      axisType: i,
      domain: R,
      categoricalDomain: F,
      duplicateDomain: L,
      originalDomain: (m = E.domain) !== null && m !== void 0 ? m : j,
      isCategorical: p,
      layout: l
    })));
  }, {});
}, ZU = function(t, r) {
  var n = r.graphicalItems, a = r.Axis, i = r.axisType, u = r.axisIdKey, o = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.layout, f = t.children, h = gs(t.data, {
    graphicalItems: n,
    dataStartIndex: s,
    dataEndIndex: c
  }), p = h.length, y = mO(l, i), b = -1;
  return n.reduce(function(m, E) {
    var g = E.type.defaultProps !== void 0 ? $($({}, E.type.defaultProps), E.props) : E.props, _ = g[u], A = PS("number");
    if (!m[_]) {
      b++;
      var v;
      return y ? v = mo(0, p) : o && o[_] && o[_].hasStack ? (v = EO(o[_].stackGroups, s, c), v = ip(f, v, _, i)) : (v = _h(A, pO(h, n.filter(function(T) {
        var S, I, N = u in T.props ? T.props[u] : (S = T.type.defaultProps) === null || S === void 0 ? void 0 : S[u], k = "hide" in T.props ? T.props.hide : (I = T.type.defaultProps) === null || I === void 0 ? void 0 : I.hide;
        return N === _ && !k;
      }), "number", l), a.defaultProps.allowDataOverflow), v = ip(f, v, _, i)), $($({}, m), {}, ee({}, _, $($({
        axisType: i
      }, a.defaultProps), {}, {
        hide: !0,
        orientation: Tt(GU, "".concat(i, ".").concat(b % 2), null),
        domain: v,
        originalDomain: A,
        isCategorical: y,
        layout: l
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      })));
    }
    return m;
  }, {});
}, JU = function(t, r) {
  var n = r.axisType, a = n === void 0 ? "xAxis" : n, i = r.AxisComp, u = r.graphicalItems, o = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.children, f = "".concat(a, "Id"), h = Dt(l, i), p = {};
  return h && h.length ? p = QU(t, {
    axes: h,
    graphicalItems: u,
    axisType: a,
    axisIdKey: f,
    stackGroups: o,
    dataStartIndex: s,
    dataEndIndex: c
  }) : u && u.length && (p = ZU(t, {
    Axis: i,
    graphicalItems: u,
    axisType: a,
    axisIdKey: f,
    stackGroups: o,
    dataStartIndex: s,
    dataEndIndex: c
  })), p;
}, eH = function(t) {
  var r = Cr(t), n = cr(r, !1, !0);
  return {
    tooltipTicks: n,
    orderedTooltipTicks: zp(n, function(a) {
      return a.coordinate;
    }),
    tooltipAxis: r,
    tooltipAxisBandSize: eo(r, n)
  };
}, iT = function(t) {
  var r = t.children, n = t.defaultShowTooltip, a = gt(r, sa), i = 0, u = 0;
  return t.data && t.data.length !== 0 && (u = t.data.length - 1), a && a.props && (a.props.startIndex >= 0 && (i = a.props.startIndex), a.props.endIndex >= 0 && (u = a.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: i,
    dataEndIndex: u,
    activeTooltipIndex: -1,
    isTooltipActive: !!n
  };
}, tH = function(t) {
  return !t || !t.length ? !1 : t.some(function(r) {
    var n = hr(r && r.type);
    return n && n.indexOf("Bar") >= 0;
  });
}, uT = function(t) {
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
}, rH = function(t, r) {
  var n = t.props, a = t.graphicalItems, i = t.xAxisMap, u = i === void 0 ? {} : i, o = t.yAxisMap, s = o === void 0 ? {} : o, c = n.width, l = n.height, f = n.children, h = n.margin || {}, p = gt(f, sa), y = gt(f, kr), b = Object.keys(s).reduce(function(v, T) {
    var S = s[T], I = S.orientation;
    return !S.mirror && !S.hide ? $($({}, v), {}, ee({}, I, v[I] + S.width)) : v;
  }, {
    left: h.left || 0,
    right: h.right || 0
  }), m = Object.keys(u).reduce(function(v, T) {
    var S = u[T], I = S.orientation;
    return !S.mirror && !S.hide ? $($({}, v), {}, ee({}, I, Tt(v, "".concat(I)) + S.height)) : v;
  }, {
    top: h.top || 0,
    bottom: h.bottom || 0
  }), E = $($({}, m), b), g = E.bottom;
  p && (E.bottom += p.props.height || sa.defaultProps.height), y && r && (E = C4(E, a, n, r));
  var _ = c - E.left - E.right, A = l - E.top - E.bottom;
  return $($({
    brushBottom: g
  }, E), {}, {
    // never return negative values for height and width
    width: Math.max(_, 0),
    height: Math.max(A, 0)
  });
}, nH = function(t, r) {
  if (r === "xAxis")
    return t[r].width;
  if (r === "yAxis")
    return t[r].height;
}, IS = function(t) {
  var r = t.chartName, n = t.GraphicalChild, a = t.defaultTooltipEventType, i = a === void 0 ? "axis" : a, u = t.validateTooltipEventTypes, o = u === void 0 ? ["axis"] : u, s = t.axisComponents, c = t.legendContent, l = t.formatAxisMap, f = t.defaultProps, h = function(E, g) {
    var _ = g.graphicalItems, A = g.stackGroups, v = g.offset, T = g.updateId, S = g.dataStartIndex, I = g.dataEndIndex, N = E.barSize, k = E.layout, D = E.barGap, R = E.barCategoryGap, L = E.maxBarSize, F = uT(k), j = F.numericAxisName, U = F.cateAxisName, q = tH(_), K = [];
    return _.forEach(function(V, J) {
      var te = gs(E.data, {
        graphicalItems: [V],
        dataStartIndex: S,
        dataEndIndex: I
      }), Q = V.type.defaultProps !== void 0 ? $($({}, V.type.defaultProps), V.props) : V.props, re = Q.dataKey, _e = Q.maxBarSize, Ne = Q["".concat(j, "Id")], bt = Q["".concat(U, "Id")], Yr = {}, st = s.reduce(function(zr, Gr) {
        var Ts = g["".concat(Gr.axisType, "Map")], C0 = Q["".concat(Gr.axisType, "Id")];
        Ts && Ts[C0] || Gr.axisType === "zAxis" || bn();
        var N0 = Ts[C0];
        return $($({}, zr), {}, ee(ee({}, Gr.axisType, N0), "".concat(Gr.axisType, "Ticks"), cr(N0)));
      }, Yr), X = st[U], ie = st["".concat(U, "Ticks")], ue = A && A[Ne] && A[Ne].hasStack && U4(V, A[Ne].stackGroups), W = hr(V.type).indexOf("Bar") >= 0, we = eo(X, ie), le = [], Le = q && P4({
        barSize: N,
        stackGroups: A,
        totalSize: nH(st, U)
      });
      if (W) {
        var ke, ct, Or = ce(_e) ? L : _e, wn = (ke = (ct = eo(X, ie, !0)) !== null && ct !== void 0 ? ct : Or) !== null && ke !== void 0 ? ke : 0;
        le = I4({
          barGap: D,
          barCategoryGap: R,
          bandSize: wn !== we ? wn : we,
          sizeList: Le[bt],
          maxBarSize: Or
        }), wn !== we && (le = le.map(function(zr) {
          return $($({}, zr), {}, {
            position: $($({}, zr.position), {}, {
              offset: zr.position.offset - wn / 2
            })
          });
        }));
      }
      var eu = V && V.type && V.type.getComposedData;
      eu && K.push({
        props: $($({}, eu($($({}, st), {}, {
          displayedData: te,
          props: E,
          dataKey: re,
          item: V,
          bandSize: we,
          barPosition: le,
          offset: v,
          stackedData: ue,
          layout: k,
          dataStartIndex: S,
          dataEndIndex: I
        }))), {}, ee(ee(ee({
          key: V.key || "item-".concat(J)
        }, j, st[j]), U, st[U]), "animationId", T)),
        childIndex: DN(V, E.children),
        item: V
      });
    }), K;
  }, p = function(E, g) {
    var _ = E.props, A = E.dataStartIndex, v = E.dataEndIndex, T = E.updateId;
    if (!Sb({
      props: _
    }))
      return null;
    var S = _.children, I = _.layout, N = _.stackOffset, k = _.data, D = _.reverseStackOrder, R = uT(I), L = R.numericAxisName, F = R.cateAxisName, j = Dt(S, n), U = F4(k, j, "".concat(L, "Id"), "".concat(F, "Id"), N, D), q = s.reduce(function(Q, re) {
      var _e = "".concat(re.axisType, "Map");
      return $($({}, Q), {}, ee({}, _e, JU(_, $($({}, re), {}, {
        graphicalItems: j,
        stackGroups: re.axisType === L && U,
        dataStartIndex: A,
        dataEndIndex: v
      }))));
    }, {}), K = rH($($({}, q), {}, {
      props: _,
      graphicalItems: j
    }), g?.legendBBox);
    Object.keys(q).forEach(function(Q) {
      q[Q] = l(_, q[Q], K, Q.replace("Map", ""), r);
    });
    var V = q["".concat(F, "Map")], J = eH(V), te = h(_, $($({}, q), {}, {
      dataStartIndex: A,
      dataEndIndex: v,
      updateId: T,
      graphicalItems: j,
      stackGroups: U,
      offset: K
    }));
    return $($({
      formattedGraphicalItems: te,
      graphicalItems: j,
      offset: K,
      stackGroups: U
    }, J), q);
  }, y = /* @__PURE__ */ (function(m) {
    function E(g) {
      var _, A, v;
      return kU(this, E), v = FU(this, E, [g]), ee(v, "eventEmitterSymbol", /* @__PURE__ */ Symbol("rechartsEventEmitter")), ee(v, "accessibilityManager", new _U()), ee(v, "handleLegendBBoxUpdate", function(T) {
        if (T) {
          var S = v.state, I = S.dataStartIndex, N = S.dataEndIndex, k = S.updateId;
          v.setState($({
            legendBBox: T
          }, p({
            props: v.props,
            dataStartIndex: I,
            dataEndIndex: N,
            updateId: k
          }, $($({}, v.state), {}, {
            legendBBox: T
          }))));
        }
      }), ee(v, "handleReceiveSyncEvent", function(T, S, I) {
        if (v.props.syncId === T) {
          if (I === v.eventEmitterSymbol && typeof v.props.syncMethod != "function")
            return;
          v.applySyncEvent(S);
        }
      }), ee(v, "handleBrushChange", function(T) {
        var S = T.startIndex, I = T.endIndex;
        if (S !== v.state.dataStartIndex || I !== v.state.dataEndIndex) {
          var N = v.state.updateId;
          v.setState(function() {
            return $({
              dataStartIndex: S,
              dataEndIndex: I
            }, p({
              props: v.props,
              dataStartIndex: S,
              dataEndIndex: I,
              updateId: N
            }, v.state));
          }), v.triggerSyncEvent({
            dataStartIndex: S,
            dataEndIndex: I
          });
        }
      }), ee(v, "handleMouseEnter", function(T) {
        var S = v.getMouseInfo(T);
        if (S) {
          var I = $($({}, S), {}, {
            isTooltipActive: !0
          });
          v.setState(I), v.triggerSyncEvent(I);
          var N = v.props.onMouseEnter;
          ae(N) && N(I, T);
        }
      }), ee(v, "triggeredAfterMouseMove", function(T) {
        var S = v.getMouseInfo(T), I = S ? $($({}, S), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        v.setState(I), v.triggerSyncEvent(I);
        var N = v.props.onMouseMove;
        ae(N) && N(I, T);
      }), ee(v, "handleItemMouseEnter", function(T) {
        v.setState(function() {
          return {
            isTooltipActive: !0,
            activeItem: T,
            activePayload: T.tooltipPayload,
            activeCoordinate: T.tooltipPosition || {
              x: T.cx,
              y: T.cy
            }
          };
        });
      }), ee(v, "handleItemMouseLeave", function() {
        v.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), ee(v, "handleMouseMove", function(T) {
        T.persist(), v.throttleTriggeredAfterMouseMove(T);
      }), ee(v, "handleMouseLeave", function(T) {
        v.throttleTriggeredAfterMouseMove.cancel();
        var S = {
          isTooltipActive: !1
        };
        v.setState(S), v.triggerSyncEvent(S);
        var I = v.props.onMouseLeave;
        ae(I) && I(S, T);
      }), ee(v, "handleOuterEvent", function(T) {
        var S = RN(T), I = Tt(v.props, "".concat(S));
        if (S && ae(I)) {
          var N, k;
          /.*touch.*/i.test(S) ? k = v.getMouseInfo(T.changedTouches[0]) : k = v.getMouseInfo(T), I((N = k) !== null && N !== void 0 ? N : {}, T);
        }
      }), ee(v, "handleClick", function(T) {
        var S = v.getMouseInfo(T);
        if (S) {
          var I = $($({}, S), {}, {
            isTooltipActive: !0
          });
          v.setState(I), v.triggerSyncEvent(I);
          var N = v.props.onClick;
          ae(N) && N(I, T);
        }
      }), ee(v, "handleMouseDown", function(T) {
        var S = v.props.onMouseDown;
        if (ae(S)) {
          var I = v.getMouseInfo(T);
          S(I, T);
        }
      }), ee(v, "handleMouseUp", function(T) {
        var S = v.props.onMouseUp;
        if (ae(S)) {
          var I = v.getMouseInfo(T);
          S(I, T);
        }
      }), ee(v, "handleTouchMove", function(T) {
        T.changedTouches != null && T.changedTouches.length > 0 && v.throttleTriggeredAfterMouseMove(T.changedTouches[0]);
      }), ee(v, "handleTouchStart", function(T) {
        T.changedTouches != null && T.changedTouches.length > 0 && v.handleMouseDown(T.changedTouches[0]);
      }), ee(v, "handleTouchEnd", function(T) {
        T.changedTouches != null && T.changedTouches.length > 0 && v.handleMouseUp(T.changedTouches[0]);
      }), ee(v, "handleDoubleClick", function(T) {
        var S = v.props.onDoubleClick;
        if (ae(S)) {
          var I = v.getMouseInfo(T);
          S(I, T);
        }
      }), ee(v, "handleContextMenu", function(T) {
        var S = v.props.onContextMenu;
        if (ae(S)) {
          var I = v.getMouseInfo(T);
          S(I, T);
        }
      }), ee(v, "triggerSyncEvent", function(T) {
        v.props.syncId !== void 0 && xd.emit(wd, v.props.syncId, T, v.eventEmitterSymbol);
      }), ee(v, "applySyncEvent", function(T) {
        var S = v.props, I = S.layout, N = S.syncMethod, k = v.state.updateId, D = T.dataStartIndex, R = T.dataEndIndex;
        if (T.dataStartIndex !== void 0 || T.dataEndIndex !== void 0)
          v.setState($({
            dataStartIndex: D,
            dataEndIndex: R
          }, p({
            props: v.props,
            dataStartIndex: D,
            dataEndIndex: R,
            updateId: k
          }, v.state)));
        else if (T.activeTooltipIndex !== void 0) {
          var L = T.chartX, F = T.chartY, j = T.activeTooltipIndex, U = v.state, q = U.offset, K = U.tooltipTicks;
          if (!q)
            return;
          if (typeof N == "function")
            j = N(K, T);
          else if (N === "value") {
            j = -1;
            for (var V = 0; V < K.length; V++)
              if (K[V].value === T.activeLabel) {
                j = V;
                break;
              }
          }
          var J = $($({}, q), {}, {
            x: q.left,
            y: q.top
          }), te = Math.min(L, J.x + J.width), Q = Math.min(F, J.y + J.height), re = K[j] && K[j].value, _e = sp(v.state, v.props.data, j), Ne = K[j] ? {
            x: I === "horizontal" ? K[j].coordinate : te,
            y: I === "horizontal" ? Q : K[j].coordinate
          } : wS;
          v.setState($($({}, T), {}, {
            activeLabel: re,
            activeCoordinate: Ne,
            activePayload: _e,
            activeTooltipIndex: j
          }));
        } else
          v.setState(T);
      }), ee(v, "renderCursor", function(T) {
        var S, I = v.state, N = I.isTooltipActive, k = I.activeCoordinate, D = I.activePayload, R = I.offset, L = I.activeTooltipIndex, F = I.tooltipAxisBandSize, j = v.getTooltipEventType(), U = (S = T.props.active) !== null && S !== void 0 ? S : N, q = v.props.layout, K = T.key || "_recharts-cursor";
        return /* @__PURE__ */ C.createElement(IU, {
          key: K,
          activeCoordinate: k,
          activePayload: D,
          activeTooltipIndex: L,
          chartName: r,
          element: T,
          isActive: U,
          layout: q,
          offset: R,
          tooltipAxisBandSize: F,
          tooltipEventType: j
        });
      }), ee(v, "renderPolarAxis", function(T, S, I) {
        var N = Tt(T, "type.axisType"), k = Tt(v.state, "".concat(N, "Map")), D = T.type.defaultProps, R = D !== void 0 ? $($({}, D), T.props) : T.props, L = k && k[R["".concat(N, "Id")]];
        return /* @__PURE__ */ De(T, $($({}, L), {}, {
          className: se(N, L.className),
          key: T.key || "".concat(S, "-").concat(I),
          ticks: cr(L, !0)
        }));
      }), ee(v, "renderPolarGrid", function(T) {
        var S = T.props, I = S.radialLines, N = S.polarAngles, k = S.polarRadius, D = v.state, R = D.radiusAxisMap, L = D.angleAxisMap, F = Cr(R), j = Cr(L), U = j.cx, q = j.cy, K = j.innerRadius, V = j.outerRadius;
        return /* @__PURE__ */ De(T, {
          polarAngles: Array.isArray(N) ? N : cr(j, !0).map(function(J) {
            return J.coordinate;
          }),
          polarRadius: Array.isArray(k) ? k : cr(F, !0).map(function(J) {
            return J.coordinate;
          }),
          cx: U,
          cy: q,
          innerRadius: K,
          outerRadius: V,
          key: T.key || "polar-grid",
          radialLines: I
        });
      }), ee(v, "renderLegend", function() {
        var T = v.state.formattedGraphicalItems, S = v.props, I = S.children, N = S.width, k = S.height, D = v.props.margin || {}, R = N - (D.left || 0) - (D.right || 0), L = dO({
          children: I,
          formattedGraphicalItems: T,
          legendWidth: R,
          legendContent: c
        });
        if (!L)
          return null;
        var F = L.item, j = rT(L, CU);
        return /* @__PURE__ */ De(F, $($({}, j), {}, {
          chartWidth: N,
          chartHeight: k,
          margin: D,
          onBBoxUpdate: v.handleLegendBBoxUpdate
        }));
      }), ee(v, "renderTooltip", function() {
        var T, S = v.props, I = S.children, N = S.accessibilityLayer, k = gt(I, ft);
        if (!k)
          return null;
        var D = v.state, R = D.isTooltipActive, L = D.activeCoordinate, F = D.activePayload, j = D.activeLabel, U = D.offset, q = (T = k.props.active) !== null && T !== void 0 ? T : R;
        return /* @__PURE__ */ De(k, {
          viewBox: $($({}, U), {}, {
            x: U.left,
            y: U.top
          }),
          active: q,
          label: j,
          payload: q ? F : [],
          coordinate: L,
          accessibilityLayer: N
        });
      }), ee(v, "renderBrush", function(T) {
        var S = v.props, I = S.margin, N = S.data, k = v.state, D = k.offset, R = k.dataStartIndex, L = k.dataEndIndex, F = k.updateId;
        return /* @__PURE__ */ De(T, {
          key: T.key || "_recharts-brush",
          onChange: hu(v.handleBrushChange, T.props.onChange),
          data: N,
          x: z(T.props.x) ? T.props.x : D.left,
          y: z(T.props.y) ? T.props.y : D.top + D.height + D.brushBottom - (I.bottom || 0),
          width: z(T.props.width) ? T.props.width : D.width,
          startIndex: R,
          endIndex: L,
          updateId: "brush-".concat(F)
        });
      }), ee(v, "renderReferenceElement", function(T, S, I) {
        if (!T)
          return null;
        var N = v, k = N.clipPathId, D = v.state, R = D.xAxisMap, L = D.yAxisMap, F = D.offset, j = T.type.defaultProps || {}, U = T.props, q = U.xAxisId, K = q === void 0 ? j.xAxisId : q, V = U.yAxisId, J = V === void 0 ? j.yAxisId : V;
        return /* @__PURE__ */ De(T, {
          key: T.key || "".concat(S, "-").concat(I),
          xAxis: R[K],
          yAxis: L[J],
          viewBox: {
            x: F.left,
            y: F.top,
            width: F.width,
            height: F.height
          },
          clipPathId: k
        });
      }), ee(v, "renderActivePoints", function(T) {
        var S = T.item, I = T.activePoint, N = T.basePoint, k = T.childIndex, D = T.isRange, R = [], L = S.props.key, F = S.item.type.defaultProps !== void 0 ? $($({}, S.item.type.defaultProps), S.item.props) : S.item.props, j = F.activeDot, U = F.dataKey, q = $($({
          index: k,
          dataKey: U,
          cx: I.x,
          cy: I.y,
          r: 4,
          fill: g0(S.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: I.payload,
          value: I.value
        }, ne(j, !1)), Iu(j));
        return R.push(E.renderActiveDot(j, q, "".concat(L, "-activePoint-").concat(k))), N ? R.push(E.renderActiveDot(j, $($({}, q), {}, {
          cx: N.x,
          cy: N.y
        }), "".concat(L, "-basePoint-").concat(k))) : D && R.push(null), R;
      }), ee(v, "renderGraphicChild", function(T, S, I) {
        var N = v.filterFormatItem(T, S, I);
        if (!N)
          return null;
        var k = v.getTooltipEventType(), D = v.state, R = D.isTooltipActive, L = D.tooltipAxis, F = D.activeTooltipIndex, j = D.activeLabel, U = v.props.children, q = gt(U, ft), K = N.props, V = K.points, J = K.isRange, te = K.baseLine, Q = N.item.type.defaultProps !== void 0 ? $($({}, N.item.type.defaultProps), N.item.props) : N.item.props, re = Q.activeDot, _e = Q.hide, Ne = Q.activeBar, bt = Q.activeShape, Yr = !!(!_e && R && q && (re || Ne || bt)), st = {};
        k !== "axis" && q && q.props.trigger === "click" ? st = {
          onClick: hu(v.handleItemMouseEnter, T.props.onClick)
        } : k !== "axis" && (st = {
          onMouseLeave: hu(v.handleItemMouseLeave, T.props.onMouseLeave),
          onMouseEnter: hu(v.handleItemMouseEnter, T.props.onMouseEnter)
        });
        var X = /* @__PURE__ */ De(T, $($({}, N.props), st));
        function ie(Gr) {
          return typeof L.dataKey == "function" ? L.dataKey(Gr.payload) : null;
        }
        if (Yr)
          if (F >= 0) {
            var ue, W;
            if (L.dataKey && !L.allowDuplicatedCategory) {
              var we = typeof L.dataKey == "function" ? ie : "payload.".concat(L.dataKey.toString());
              ue = Hd(V, we, j), W = J && te && Hd(te, we, j);
            } else
              ue = V?.[F], W = J && te && te[F];
            if (bt || Ne) {
              var le = T.props.activeIndex !== void 0 ? T.props.activeIndex : F;
              return [/* @__PURE__ */ De(T, $($($({}, N.props), st), {}, {
                activeIndex: le
              })), null, null];
            }
            if (!ce(ue))
              return [X].concat(ya(v.renderActivePoints({
                item: N,
                activePoint: ue,
                basePoint: W,
                childIndex: F,
                isRange: J
              })));
          } else {
            var Le, ke = (Le = v.getItemByXY(v.state.activeCoordinate)) !== null && Le !== void 0 ? Le : {
              graphicalItem: X
            }, ct = ke.graphicalItem, Or = ct.item, wn = Or === void 0 ? T : Or, eu = ct.childIndex, zr = $($($({}, N.props), st), {}, {
              activeIndex: eu
            });
            return [/* @__PURE__ */ De(wn, zr), null, null];
          }
        return J ? [X, null, null] : [X, null];
      }), ee(v, "renderCustomized", function(T, S, I) {
        return /* @__PURE__ */ De(T, $($({
          key: "recharts-customized-".concat(I)
        }, v.props), v.state));
      }), ee(v, "renderMap", {
        CartesianGrid: {
          handler: yu,
          once: !0
        },
        ReferenceArea: {
          handler: v.renderReferenceElement
        },
        ReferenceLine: {
          handler: yu
        },
        ReferenceDot: {
          handler: v.renderReferenceElement
        },
        XAxis: {
          handler: yu
        },
        YAxis: {
          handler: yu
        },
        Brush: {
          handler: v.renderBrush,
          once: !0
        },
        Bar: {
          handler: v.renderGraphicChild
        },
        Line: {
          handler: v.renderGraphicChild
        },
        Area: {
          handler: v.renderGraphicChild
        },
        Radar: {
          handler: v.renderGraphicChild
        },
        RadialBar: {
          handler: v.renderGraphicChild
        },
        Scatter: {
          handler: v.renderGraphicChild
        },
        Pie: {
          handler: v.renderGraphicChild
        },
        Funnel: {
          handler: v.renderGraphicChild
        },
        Tooltip: {
          handler: v.renderCursor,
          once: !0
        },
        PolarGrid: {
          handler: v.renderPolarGrid,
          once: !0
        },
        PolarAngleAxis: {
          handler: v.renderPolarAxis
        },
        PolarRadiusAxis: {
          handler: v.renderPolarAxis
        },
        Customized: {
          handler: v.renderCustomized
        }
      }), v.clipPathId = "".concat((_ = g.id) !== null && _ !== void 0 ? _ : zi("recharts"), "-clip"), v.throttleTriggeredAfterMouseMove = dA(v.triggeredAfterMouseMove, (A = g.throttleDelay) !== null && A !== void 0 ? A : 1e3 / 60), v.state = {}, v;
    }
    return HU(E, m), jU(E, [{
      key: "componentDidMount",
      value: function() {
        var _, A;
        this.addListener(), this.accessibilityManager.setDetails({
          container: this.container,
          offset: {
            left: (_ = this.props.margin.left) !== null && _ !== void 0 ? _ : 0,
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
        var _ = this.props, A = _.children, v = _.data, T = _.height, S = _.layout, I = gt(A, ft);
        if (I) {
          var N = I.props.defaultIndex;
          if (!(typeof N != "number" || N < 0 || N > this.state.tooltipTicks.length - 1)) {
            var k = this.state.tooltipTicks[N] && this.state.tooltipTicks[N].value, D = sp(this.state, v, N, k), R = this.state.tooltipTicks[N].coordinate, L = (this.state.offset.top + T) / 2, F = S === "horizontal", j = F ? {
              x: R,
              y: L
            } : {
              y: R,
              x: L
            }, U = this.state.formattedGraphicalItems.find(function(K) {
              var V = K.item;
              return V.type.name === "Scatter";
            });
            U && (j = $($({}, j), U.props.points[N].tooltipPosition), D = U.props.points[N].tooltipPayload);
            var q = {
              activeTooltipIndex: N,
              isTooltipActive: !0,
              activeLabel: k,
              activePayload: D,
              activeCoordinate: j
            };
            this.setState(q), this.renderCursor(I), this.accessibilityManager.setIndex(N);
          }
        }
      }
    }, {
      key: "getSnapshotBeforeUpdate",
      value: function(_, A) {
        if (!this.props.accessibilityLayer)
          return null;
        if (this.state.tooltipTicks !== A.tooltipTicks && this.accessibilityManager.setDetails({
          coordinateList: this.state.tooltipTicks
        }), this.props.layout !== _.layout && this.accessibilityManager.setDetails({
          layout: this.props.layout
        }), this.props.margin !== _.margin) {
          var v, T;
          this.accessibilityManager.setDetails({
            offset: {
              left: (v = this.props.margin.left) !== null && v !== void 0 ? v : 0,
              top: (T = this.props.margin.top) !== null && T !== void 0 ? T : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function(_) {
        Wd([gt(_.children, ft)], [gt(this.props.children, ft)]) || this.displayDefaultTooltip();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function() {
        var _ = gt(this.props.children, ft);
        if (_ && typeof _.props.shared == "boolean") {
          var A = _.props.shared ? "axis" : "item";
          return o.indexOf(A) >= 0 ? A : i;
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
      value: function(_) {
        if (!this.container)
          return null;
        var A = this.container, v = A.getBoundingClientRect(), T = v6(v), S = {
          chartX: Math.round(_.pageX - T.left),
          chartY: Math.round(_.pageY - T.top)
        }, I = v.width / A.offsetWidth || 1, N = this.inRange(S.chartX, S.chartY, I);
        if (!N)
          return null;
        var k = this.state, D = k.xAxisMap, R = k.yAxisMap, L = this.getTooltipEventType(), F = aT(this.state, this.props.data, this.props.layout, N);
        if (L !== "axis" && D && R) {
          var j = Cr(D).scale, U = Cr(R).scale, q = j && j.invert ? j.invert(S.chartX) : null, K = U && U.invert ? U.invert(S.chartY) : null;
          return $($({}, S), {}, {
            xValue: q,
            yValue: K
          }, F);
        }
        return F ? $($({}, S), F) : null;
      }
    }, {
      key: "inRange",
      value: function(_, A) {
        var v = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, T = this.props.layout, S = _ / v, I = A / v;
        if (T === "horizontal" || T === "vertical") {
          var N = this.state.offset, k = S >= N.left && S <= N.left + N.width && I >= N.top && I <= N.top + N.height;
          return k ? {
            x: S,
            y: I
          } : null;
        }
        var D = this.state, R = D.angleAxisMap, L = D.radiusAxisMap;
        if (R && L) {
          var F = Cr(R);
          return h1({
            x: S,
            y: I
          }, F);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var _ = this.props.children, A = this.getTooltipEventType(), v = gt(_, ft), T = {};
        v && A === "axis" && (v.props.trigger === "click" ? T = {
          onClick: this.handleClick
        } : T = {
          onMouseEnter: this.handleMouseEnter,
          onDoubleClick: this.handleDoubleClick,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onContextMenu: this.handleContextMenu
        });
        var S = Iu(this.props, this.handleOuterEvent);
        return $($({}, S), T);
      }
    }, {
      key: "addListener",
      value: function() {
        xd.on(wd, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        xd.removeListener(wd, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(_, A, v) {
        for (var T = this.state.formattedGraphicalItems, S = 0, I = T.length; S < I; S++) {
          var N = T[S];
          if (N.item === _ || N.props.key === _.key || A === hr(N.item.type) && v === N.childIndex)
            return N;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var _ = this.clipPathId, A = this.state.offset, v = A.left, T = A.top, S = A.height, I = A.width;
        return /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("clipPath", {
          id: _
        }, /* @__PURE__ */ C.createElement("rect", {
          x: v,
          y: T,
          height: S,
          width: I
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var _ = this.state.xAxisMap;
        return _ ? Object.entries(_).reduce(function(A, v) {
          var T = tT(v, 2), S = T[0], I = T[1];
          return $($({}, A), {}, ee({}, S, I.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var _ = this.state.yAxisMap;
        return _ ? Object.entries(_).reduce(function(A, v) {
          var T = tT(v, 2), S = T[0], I = T[1];
          return $($({}, A), {}, ee({}, S, I.scale));
        }, {}) : null;
      }
    }, {
      key: "getXScaleByAxisId",
      value: function(_) {
        var A;
        return (A = this.state.xAxisMap) === null || A === void 0 || (A = A[_]) === null || A === void 0 ? void 0 : A.scale;
      }
    }, {
      key: "getYScaleByAxisId",
      value: function(_) {
        var A;
        return (A = this.state.yAxisMap) === null || A === void 0 || (A = A[_]) === null || A === void 0 ? void 0 : A.scale;
      }
    }, {
      key: "getItemByXY",
      value: function(_) {
        var A = this.state, v = A.formattedGraphicalItems, T = A.activeItem;
        if (v && v.length)
          for (var S = 0, I = v.length; S < I; S++) {
            var N = v[S], k = N.props, D = N.item, R = D.type.defaultProps !== void 0 ? $($({}, D.type.defaultProps), D.props) : D.props, L = hr(D.type);
            if (L === "Bar") {
              var F = (k.data || []).find(function(K) {
                return W5(_, K);
              });
              if (F)
                return {
                  graphicalItem: N,
                  payload: F
                };
            } else if (L === "RadialBar") {
              var j = (k.data || []).find(function(K) {
                return h1(_, K);
              });
              if (j)
                return {
                  graphicalItem: N,
                  payload: j
                };
            } else if (fs(N, T) || ds(N, T) || Mi(N, T)) {
              var U = hF({
                graphicalItem: N,
                activeTooltipItem: T,
                itemData: R.data
              }), q = R.activeIndex === void 0 ? U : R.activeIndex;
              return {
                graphicalItem: $($({}, N), {}, {
                  childIndex: q
                }),
                payload: Mi(N, T) ? R.data[U] : N.props.data[U]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var _ = this;
        if (!Sb(this))
          return null;
        var A = this.props, v = A.children, T = A.className, S = A.width, I = A.height, N = A.style, k = A.compact, D = A.title, R = A.desc, L = rT(A, NU), F = ne(L, !1);
        if (k)
          return /* @__PURE__ */ C.createElement(FE, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ C.createElement(zd, $n({}, F, {
            width: S,
            height: I,
            title: D,
            desc: R
          }), this.renderClipPath(), wb(v, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var j, U;
          F.tabIndex = (j = this.props.tabIndex) !== null && j !== void 0 ? j : 0, F.role = (U = this.props.role) !== null && U !== void 0 ? U : "application", F.onKeyDown = function(K) {
            _.accessibilityManager.keyboardEvent(K);
          }, F.onFocus = function() {
            _.accessibilityManager.focus();
          };
        }
        var q = this.parseEventsOfWrapper();
        return /* @__PURE__ */ C.createElement(FE, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ C.createElement("div", $n({
          className: se("recharts-wrapper", T),
          style: $({
            position: "relative",
            cursor: "default",
            width: S,
            height: I
          }, N)
        }, q, {
          ref: function(V) {
            _.container = V;
          }
        }), /* @__PURE__ */ C.createElement(zd, $n({}, F, {
          width: S,
          height: I,
          title: D,
          desc: R,
          style: KU
        }), this.renderClipPath(), wb(v, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  })(hT);
  ee(y, "displayName", r), ee(y, "defaultProps", $({
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
  }, f)), ee(y, "getDerivedStateFromProps", function(m, E) {
    var g = m.dataKey, _ = m.data, A = m.children, v = m.width, T = m.height, S = m.layout, I = m.stackOffset, N = m.margin, k = E.dataStartIndex, D = E.dataEndIndex;
    if (E.updateId === void 0) {
      var R = iT(m);
      return $($($({}, R), {}, {
        updateId: 0
      }, p($($({
        props: m
      }, R), {}, {
        updateId: 0
      }), E)), {}, {
        prevDataKey: g,
        prevData: _,
        prevWidth: v,
        prevHeight: T,
        prevLayout: S,
        prevStackOffset: I,
        prevMargin: N,
        prevChildren: A
      });
    }
    if (g !== E.prevDataKey || _ !== E.prevData || v !== E.prevWidth || T !== E.prevHeight || S !== E.prevLayout || I !== E.prevStackOffset || !Hn(N, E.prevMargin)) {
      var L = iT(m), F = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: E.chartX,
        chartY: E.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: E.isTooltipActive
      }, j = $($({}, aT(E, _, S)), {}, {
        updateId: E.updateId + 1
      }), U = $($($({}, L), F), j);
      return $($($({}, U), p($({
        props: m
      }, U), E)), {}, {
        prevDataKey: g,
        prevData: _,
        prevWidth: v,
        prevHeight: T,
        prevLayout: S,
        prevStackOffset: I,
        prevMargin: N,
        prevChildren: A
      });
    }
    if (!Wd(A, E.prevChildren)) {
      var q, K, V, J, te = gt(A, sa), Q = te && (q = (K = te.props) === null || K === void 0 ? void 0 : K.startIndex) !== null && q !== void 0 ? q : k, re = te && (V = (J = te.props) === null || J === void 0 ? void 0 : J.endIndex) !== null && V !== void 0 ? V : D, _e = Q !== k || re !== D, Ne = !ce(_), bt = Ne && !_e ? E.updateId : E.updateId + 1;
      return $($({
        updateId: bt
      }, p($($({
        props: m
      }, E), {}, {
        updateId: bt,
        dataStartIndex: Q,
        dataEndIndex: re
      }), E)), {}, {
        prevChildren: A,
        dataStartIndex: Q,
        dataEndIndex: re
      });
    }
    return null;
  }), ee(y, "renderActiveDot", function(m, E, g) {
    var _;
    return /* @__PURE__ */ Ct(m) ? _ = /* @__PURE__ */ De(m, E) : ae(m) ? _ = m(E) : _ = /* @__PURE__ */ C.createElement(E0, E), /* @__PURE__ */ C.createElement(me, {
      className: "recharts-active-dot",
      key: g
    }, _);
  });
  var b = /* @__PURE__ */ dT(function(E, g) {
    return /* @__PURE__ */ C.createElement(y, $n({}, E, {
      ref: g
    }));
  });
  return b.displayName = y.displayName, b;
}, vs = IS({
  chartName: "BarChart",
  GraphicalChild: nr,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Sn
  }, {
    axisType: "yAxis",
    AxisComp: xn
  }],
  formatAxisMap: b9
}), aH = IS({
  chartName: "PieChart",
  GraphicalChild: Ar,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: ls
  }, {
    axisType: "radiusAxis",
    AxisComp: ss
  }],
  formatAxisMap: Q4,
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
const iH = "funding", uH = ["Source", "Grants", "Total (GBP)"], oH = [32, 10, 18], sH = ["text", "number", "currency"], Yn = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0
});
function l7({ content: e, block: t }) {
  const r = En(iH), { members: n, activeLabel: a } = $r(e), i = e?.title || "Funding received", u = lH(n), o = u.reduce((c, l) => c + l.total, 0);
  rt(
    t,
    "xlsx",
    r && u.length > 0 ? {
      title: "Funding",
      headers: uH,
      data: u.map(({ source: c, count: l, total: f }) => [c, l, f]),
      columnWidths: oH,
      numberFormats: sH,
      totals: ["Total", "sum", "sum"]
    } : null
  );
  const s = u.reduce((c, l) => c + l.count, 0);
  return rt(
    t,
    "docx",
    r && u.length > 0 ? /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ P(
        Rt,
        {
          as: "h2",
          data: i,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ G(ga, { widths: [55, 15, 30], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ G(Ve, { header: !0, children: [
          /* @__PURE__ */ P(oe, { children: "Source" }),
          /* @__PURE__ */ P(oe, { children: "Grants" }),
          /* @__PURE__ */ P(oe, { children: "Total (GBP)" })
        ] }),
        u.map(({ source: c, count: l, total: f }, h) => /* @__PURE__ */ G(Ve, { children: [
          /* @__PURE__ */ P(oe, { children: c }),
          /* @__PURE__ */ P(oe, { children: String(l) }),
          /* @__PURE__ */ P(oe, { children: Yn.format(f) })
        ] }, h)),
        /* @__PURE__ */ G(Ve, { children: [
          /* @__PURE__ */ P(oe, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ P(oe, { emphasis: !0, children: String(s) }),
          /* @__PURE__ */ P(oe, { emphasis: !0, children: Yn.format(o) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ G("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: i }),
    a && /* @__PURE__ */ G("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    u.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No funding records for the selected population." }) : /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ G("p", { className: "chart-query-note", children: [
        "Grand total: ",
        /* @__PURE__ */ P("strong", { children: Yn.format(o) }),
        " across",
        " ",
        u.reduce((c, l) => c + l.count, 0),
        " grants from",
        " ",
        u.length,
        " ",
        u.length === 1 ? "source" : "sources",
        "."
      ] }),
      /* @__PURE__ */ P(cH, { rows: u })
    ] })
  ] }) : null;
}
function cH({ rows: e }) {
  const [t, r] = at(!1);
  if (pt(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((i) => ({ name: i.source, total: i.total })), a = Math.max(240, n.length * 56);
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Ki, { width: "100%", height: a, children: /* @__PURE__ */ G(
    vs,
    {
      data: n,
      layout: "vertical",
      margin: { top: 8, right: 80, bottom: 8, left: 16 },
      children: [
        /* @__PURE__ */ P(Ji, { strokeDasharray: "3 3", stroke: "var(--border)" }),
        /* @__PURE__ */ P(
          Sn,
          {
            type: "number",
            tickFormatter: (i) => Yn.format(i),
            tick: { fontSize: 11 }
          }
        ),
        /* @__PURE__ */ P(
          xn,
          {
            type: "category",
            dataKey: "name",
            width: 200,
            tick: { fontSize: 12 }
          }
        ),
        /* @__PURE__ */ P(
          ft,
          {
            formatter: (i) => Yn.format(i),
            contentStyle: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem"
            }
          }
        ),
        /* @__PURE__ */ P(nr, { dataKey: "total", fill: "#be123c", radius: [0, 4, 4, 0], children: /* @__PURE__ */ P(
          Ht,
          {
            dataKey: "total",
            position: "right",
            formatter: (i) => Yn.format(i)
          }
        ) })
      ]
    }
  ) }) });
}
function lH(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e) {
    const n = Array.isArray(r.funding) ? r.funding : [];
    for (const a of n) {
      const i = (a.source || "Unknown").trim(), u = Number(a.amount) || 0;
      t.has(i) || t.set(i, { source: i, count: 0, total: 0 });
      const o = t.get(i);
      o.count += 1, o.total += u;
    }
  }
  return [...t.values()].sort(
    (r, n) => n.total - r.total || r.source.localeCompare(n.source)
  );
}
const fH = "members", Id = ["Name", "Rank", "Department", "Tenured", "Start year"], dH = [28, 14, 18, 10, 12], hH = ["text", "text", "text", "text", "number"];
function f7({ content: e, block: t }) {
  const r = En(fH), { members: n, activeLabel: a } = $r(e), i = e?.title || "Members", u = [...n].sort((s, c) => {
    const l = s?.name || "", f = c?.name || "";
    return l.localeCompare(f);
  }), o = u.map((s) => [
    s.name || "",
    s.rank || "",
    s.department || "",
    s.tenured ? "Yes" : "No",
    Number(s.start_year) || null
  ]);
  return rt(
    t,
    "xlsx",
    r ? {
      title: "Members",
      headers: Id,
      data: o,
      columnWidths: dH,
      numberFormats: hH
    } : null
  ), rt(
    t,
    "docx",
    r ? /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ P(
        Rt,
        {
          as: "h2",
          data: i,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ G(ga, { widths: [32, 16, 22, 12, 18], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ P(Ve, { header: !0, children: Id.map((s) => /* @__PURE__ */ P(oe, { children: s }, s)) }),
        o.map((s, c) => /* @__PURE__ */ P(Ve, { children: s.map((l, f) => /* @__PURE__ */ P(oe, { children: l == null ? "" : String(l) }, f)) }, c))
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ G("section", { className: "members", children: [
    /* @__PURE__ */ P("h2", { className: "members-title", children: i }),
    a && /* @__PURE__ */ G("p", { className: "members-query-note", children: [
      "Showing ",
      n.length,
      " members matching ",
      /* @__PURE__ */ P("em", { children: a }),
      "."
    ] }),
    n.length === 0 ? /* @__PURE__ */ P("p", { className: "members-empty", children: "No members match the selected population." }) : /* @__PURE__ */ G("table", { className: "members-table", children: [
      /* @__PURE__ */ P("thead", { children: /* @__PURE__ */ P("tr", { children: Id.map((s) => /* @__PURE__ */ P("th", { children: s }, s)) }) }),
      /* @__PURE__ */ P("tbody", { children: u.map((s) => /* @__PURE__ */ G("tr", { children: [
        /* @__PURE__ */ P("td", { children: s.name }),
        /* @__PURE__ */ P("td", { children: s.rank }),
        /* @__PURE__ */ P("td", { children: s.department }),
        /* @__PURE__ */ P("td", { className: s.tenured ? "status-yes" : "status-no", children: s.tenured ? "Yes" : "No" }),
        /* @__PURE__ */ P("td", { className: "numeric", children: s.start_year || "" })
      ] }, s.slug || s.name)) })
    ] })
  ] }) : null;
}
function Es(e, t = {}) {
  const { dateRange: r, refereedOnly: n } = t, a = r?.start != null ? Number(r.start) : null, i = r?.end != null && r.end !== "" ? Number(r.end) : null;
  return Array.isArray(e) ? e.filter((u) => {
    if (n && u?.refereed !== !0) return !1;
    if (a == null && i == null) return !0;
    const o = Number(u?.year);
    return !(!Number.isFinite(o) || a != null && o < a || i != null && o > i);
  }) : [];
}
function pH(e, t = {}) {
  if (!Array.isArray(e)) return [];
  const r = [];
  for (const n of e) {
    const a = Es(n?.publications, t);
    for (const i of a)
      r.push({ ...i, _author: n?.name || n?.slug || "Unknown" });
  }
  return r;
}
const mH = "publications-by-journal", bH = 10, yH = ["Venue", "Count"], gH = [48, 10], vH = ["text", "number"];
function d7({ content: e, block: t }) {
  const r = En(mH), { members: n, activeLabel: a } = $r(e), [i] = qi(), u = e?.title || "Publications by journal", o = TH(n, bH, i);
  rt(
    t,
    "xlsx",
    r && o.length > 0 ? {
      title: "Publications by Journal",
      headers: yH,
      data: o.map(({ venue: c, count: l }) => [c, l]),
      columnWidths: gH,
      numberFormats: vH,
      totals: ["Total", "sum"]
    } : null
  );
  const s = o.reduce((c, l) => c + l.count, 0);
  return rt(
    t,
    "docx",
    r && o.length > 0 ? /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ P(
        Rt,
        {
          as: "h2",
          data: u,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ G(ga, { widths: [82, 18], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ G(Ve, { header: !0, children: [
          /* @__PURE__ */ P(oe, { children: "Venue" }),
          /* @__PURE__ */ P(oe, { children: "Count" })
        ] }),
        o.map(({ venue: c, count: l }, f) => /* @__PURE__ */ G(Ve, { children: [
          /* @__PURE__ */ P(oe, { children: c }),
          /* @__PURE__ */ P(oe, { children: String(l) })
        ] }, f)),
        /* @__PURE__ */ G(Ve, { children: [
          /* @__PURE__ */ P(oe, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ P(oe, { emphasis: !0, children: String(s) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ G("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: u }),
    a && /* @__PURE__ */ G("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    o.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No publications in the selected population." }) : /* @__PURE__ */ P(EH, { counts: o })
  ] }) : null;
}
function EH({ counts: e }) {
  const [t, r] = at(!1);
  if (pt(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((i) => ({ name: i.venue, value: i.count })), a = Math.max(240, n.length * 44);
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Ki, { width: "100%", height: a, children: /* @__PURE__ */ G(
    vs,
    {
      data: n,
      layout: "vertical",
      margin: { top: 8, right: 32, bottom: 8, left: 16 },
      children: [
        /* @__PURE__ */ P(Ji, { strokeDasharray: "3 3", stroke: "var(--border)" }),
        /* @__PURE__ */ P(Sn, { type: "number", allowDecimals: !1 }),
        /* @__PURE__ */ P(
          xn,
          {
            type: "category",
            dataKey: "name",
            width: 240,
            tick: { fontSize: 12 }
          }
        ),
        /* @__PURE__ */ P(
          ft,
          {
            contentStyle: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem"
            }
          }
        ),
        /* @__PURE__ */ P(nr, { dataKey: "value", fill: "#1e40af", radius: [0, 4, 4, 0], children: /* @__PURE__ */ P(Ht, { dataKey: "value", position: "right" }) })
      ]
    }
  ) }) });
}
function TH(e, t, r) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = Es(a.publications, r);
    for (const u of i) {
      const o = (u.journal || u.publisher || "Unknown").trim();
      o && n.set(o, (n.get(o) || 0) + 1);
    }
  }
  return [...n.entries()].map(([a, i]) => ({ venue: a, count: i })).sort((a, i) => i.count - a.count || a.venue.localeCompare(i.venue)).slice(0, t);
}
const _H = "publications-by-type", oT = [
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
], AH = ["Publication type", "Count"], OH = [24, 10], SH = ["text", "number"];
function h7({ content: e, block: t }) {
  const r = En(_H), { members: n, activeLabel: a } = $r(e), [i] = qi(), u = e?.title || "Publications by type", o = wH(n, i);
  rt(
    t,
    "xlsx",
    r && o.length > 0 ? {
      title: "Publications by Type",
      headers: AH,
      data: o.map(({ type: c, count: l }) => [cp(c), l]),
      columnWidths: OH,
      numberFormats: SH,
      totals: ["Total", "sum"]
    } : null
  );
  const s = o.reduce((c, l) => c + l.count, 0);
  return rt(
    t,
    "docx",
    r && o.length > 0 ? /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ P(
        Rt,
        {
          as: "h2",
          data: u,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ G(ga, { widths: [70, 30], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ G(Ve, { header: !0, children: [
          /* @__PURE__ */ P(oe, { children: "Publication type" }),
          /* @__PURE__ */ P(oe, { children: "Count" })
        ] }),
        o.map(({ type: c, count: l }, f) => /* @__PURE__ */ G(Ve, { children: [
          /* @__PURE__ */ P(oe, { children: cp(c) }),
          /* @__PURE__ */ P(oe, { children: String(l) })
        ] }, f)),
        /* @__PURE__ */ G(Ve, { children: [
          /* @__PURE__ */ P(oe, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ P(oe, { emphasis: !0, children: String(s) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ G("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: u }),
    a && /* @__PURE__ */ G("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    o.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No publications for the selected population." }) : /* @__PURE__ */ P(xH, { counts: o })
  ] }) : null;
}
function xH({ counts: e }) {
  const [t, r] = at(!1);
  if (pt(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map(({ type: a, count: i }) => ({
    name: cp(a),
    value: i
  }));
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Ki, { width: "100%", height: 320, children: /* @__PURE__ */ G(aH, { children: [
    /* @__PURE__ */ P(
      Ar,
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
        children: n.map((a, i) => /* @__PURE__ */ P(Go, { fill: oT[i % oT.length] }, i))
      }
    ),
    /* @__PURE__ */ P(
      ft,
      {
        contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem"
        }
      }
    ),
    /* @__PURE__ */ P(
      kr,
      {
        verticalAlign: "bottom",
        height: 36,
        wrapperStyle: { fontSize: "0.875rem" }
      }
    )
  ] }) }) });
}
function wH(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = Es(n.publications, t);
    for (const i of a) {
      const u = (i.type || "other").toLowerCase();
      r.set(u, (r.get(u) || 0) + 1);
    }
  }
  return [...r.entries()].map(([n, a]) => ({ type: n, count: a })).sort((n, a) => a.count - n.count);
}
function cp(e) {
  return String(e).charAt(0).toUpperCase() + String(e).slice(1);
}
const PH = "publications-by-year", IH = ["Year", "Count", "Cumulative"], CH = [10, 10, 12], NH = ["number", "number", "number"];
function p7({ content: e, block: t }) {
  const r = En(PH), { members: n, activeLabel: a } = $r(e), [i] = qi(), u = e?.title || "Publications by year", { series: o, total: s } = DH(n, i);
  return rt(
    t,
    "xlsx",
    r && o.length > 0 ? {
      title: "Publications by Year",
      headers: IH,
      data: o.map((c) => [c.year, c.count, c.cumulative]),
      columnWidths: CH,
      numberFormats: NH,
      totals: ["Total", "sum", s]
    } : null
  ), rt(
    t,
    "docx",
    r && o.length > 0 ? /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ P(
        Rt,
        {
          as: "h2",
          data: u,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ G(ga, { widths: [30, 35, 35], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ G(Ve, { header: !0, children: [
          /* @__PURE__ */ P(oe, { children: "Year" }),
          /* @__PURE__ */ P(oe, { children: "Count" }),
          /* @__PURE__ */ P(oe, { children: "Cumulative" })
        ] }),
        o.map((c, l) => /* @__PURE__ */ G(Ve, { children: [
          /* @__PURE__ */ P(oe, { children: String(c.year) }),
          /* @__PURE__ */ P(oe, { children: String(c.count) }),
          /* @__PURE__ */ P(oe, { children: String(c.cumulative) })
        ] }, l)),
        /* @__PURE__ */ G(Ve, { children: [
          /* @__PURE__ */ P(oe, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ P(oe, { emphasis: !0, children: String(s) }),
          /* @__PURE__ */ P(oe, { emphasis: !0, children: String(s) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ G("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: u }),
    a && /* @__PURE__ */ G("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    o.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No publications in the selected population." }) : /* @__PURE__ */ P(RH, { series: o })
  ] }) : null;
}
function RH({ series: e }) {
  const [t, r] = at(!1);
  if (pt(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((a) => ({ year: String(a.year), value: a.count }));
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Ki, { width: "100%", height: 320, children: /* @__PURE__ */ G(vs, { data: n, margin: { top: 16, right: 16, bottom: 16, left: 0 }, children: [
    /* @__PURE__ */ P(Ji, { strokeDasharray: "3 3", stroke: "var(--border)" }),
    /* @__PURE__ */ P(Sn, { dataKey: "year", tick: { fontSize: 12 } }),
    /* @__PURE__ */ P(xn, { allowDecimals: !1 }),
    /* @__PURE__ */ P(
      ft,
      {
        contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem"
        }
      }
    ),
    /* @__PURE__ */ P(nr, { dataKey: "value", fill: "#0f766e", radius: [4, 4, 0, 0], children: /* @__PURE__ */ P(Ht, { dataKey: "value", position: "top" }) })
  ] }) }) });
}
function DH(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (const i of e) {
    const u = Es(i.publications, t);
    for (const o of u) {
      const s = Number(o.year);
      Number.isFinite(s) && r.set(s, (r.get(s) || 0) + 1);
    }
  }
  const n = [...r.entries()].map(([i, u]) => ({ year: i, count: u })).sort((i, u) => i.year - u.year);
  let a = 0;
  for (const i of n)
    a += i.count, i.cumulative = a;
  return { series: n, total: a };
}
function MH(e) {
  const t = String(e || "").trim().split(/\s+/);
  if (t.length === 0) return { family: "Unknown", given: "" };
  if (t.length === 1) return { family: t[0], given: "" };
  const r = t[t.length - 1], n = t.slice(0, -1).join(" ");
  return { family: r, given: n };
}
function LH(e, { defaultAuthor: t } = {}) {
  if (!e) return null;
  const r = e.authors && e.authors.length ? e.authors : t ? [t] : [{ family: "Unknown", given: "" }], n = {
    id: e.id || `${(e.title || "pub").slice(0, 24)}-${e.year || "xx"}`,
    type: e.type || "book",
    title: e.title || "",
    author: r
  };
  return e.year != null && (n.issued = { "date-parts": [[Number(e.year) || e.year]] }), e.journal && (n["container-title"] = e.journal), e.publisher && (n.publisher = e.publisher), e.DOI && (n.DOI = e.DOI), n;
}
function kH(e) {
  return Array.isArray(e) ? e.map((t) => {
    const r = t._author ? MH(t._author) : void 0;
    return LH(t, { defaultAuthor: r });
  }).filter(Boolean) : [];
}
const BH = "publications-list", sT = {
  apa: () => import("./apa-DFWazoZc.js"),
  mla: () => import("./mla-D135I5OW.js"),
  "chicago-author-date": () => import("./chicago-author-date-D8QH1iwN.js"),
  ieee: () => import("./ieee-CHRt3McI.js"),
  vancouver: () => import("./vancouver-C_ZYAEtz.js"),
  harvard: () => import("./harvard-fzOIiT6h.js"),
  nature: () => import("./nature-BgGht0BR.js")
}, Cd = /* @__PURE__ */ new Map();
async function jH(e) {
  if (Cd.has(e)) return Cd.get(e);
  const t = sT[e] || sT.apa, [{ formatAll: r }, n] = await Promise.all([
    import("./index-CxzhyvpC.js"),
    t()
  ]), a = { formatAll: r, style: n };
  return Cd.set(e, a), a;
}
function m7({ content: e, block: t }) {
  const r = En(BH), { members: n, activeLabel: a } = $r(e), [i] = qi(), u = e?.title || "Publications", o = [...pH(n, i)].sort((b, m) => {
    const E = Number(b.year) || 0;
    return (Number(m.year) || 0) - E;
  }), s = kH(o), c = s.map((b) => b.id).join("|"), [l, f] = at({ loading: !0, entries: [] });
  pt(() => {
    let b = !1;
    if (!r || s.length === 0) {
      f({ loading: !1, entries: [] });
      return;
    }
    return jH(i.citationStyle).then(({ formatAll: m, style: E }) => {
      if (!b)
        try {
          f({ loading: !1, entries: m(E, s) });
        } catch (g) {
          console.error("PublicationsList: formatAll failed", g), b || f({ loading: !1, entries: [] });
        }
    }).catch((m) => {
      console.error("PublicationsList: style load failed", m), b || f({ loading: !1, entries: [] });
    }), () => {
      b = !0;
    };
  }, [c, i.citationStyle, r]);
  const { loading: h, entries: p } = l;
  if (rt(
    t,
    "xlsx",
    r && p.length > 0 ? {
      title: "Publications",
      headers: ["Year", "Author", "Citation"],
      data: p.map((b, m) => {
        const E = o[m];
        return [
          Number(E?.year) || null,
          E?._author || "",
          b.text || ""
        ];
      }),
      columnWidths: [8, 24, 80],
      numberFormats: ["number", "text", "text"]
    } : null
  ), rt(
    t,
    "docx",
    r && p.length > 0 ? /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ P(
        Rt,
        {
          as: "h2",
          data: u,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      p.map((b, m) => /* @__PURE__ */ P(
        Rt,
        {
          data: b.text,
          "data-style": "bibliography",
          "data-spacing-after": 120
        },
        b.id || m
      ))
    ] }) : null
  ), !r) return null;
  const y = i.citationStyle.toUpperCase().replace(/-/g, " ");
  return /* @__PURE__ */ G("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: u }),
    a && /* @__PURE__ */ G("p", { className: "chart-query-note", children: [
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
    !h && p.length > 0 && /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ P("ol", { className: "publications-list", children: p.map((b, m) => /* @__PURE__ */ P("li", { children: /* @__PURE__ */ P(
        EC,
        {
          as: "div",
          className: "csl-entry-wrapper",
          value: b.html
        }
      ) }, b.id || m)) }),
      /* @__PURE__ */ G("p", { className: "publications-list-note", children: [
        p.length,
        " ",
        p.length === 1 ? "entry" : "entries",
        " · formatted via citestyle · ",
        y
      ] })
    ] })
  ] });
}
const FH = "supervisions", cT = ["#1e40af", "#0f766e", "#ea580c", "#9333ea", "#be123c", "#0ea5e9"];
function b7({ content: e, block: t }) {
  const r = En(FH), { members: n, activeLabel: a } = $r(e), i = e?.title || "Supervisions", { levels: u, rows: o, grandTotal: s } = UH(n), c = ["Member", ...u.map(lp), "Total"], l = o.map((g) => [
    g.member,
    ...u.map((_) => g.counts[_] || 0),
    g.total
  ]), f = [28, ...u.map(() => 12), 10], h = ["text", ...u.map(() => "number"), "number"], p = ["Total", ...u.map(() => "sum"), "sum"];
  rt(
    t,
    "xlsx",
    r && o.length > 0 ? {
      title: "Supervisions",
      headers: c,
      data: l,
      columnWidths: f,
      numberFormats: h,
      totals: p
    } : null
  );
  const y = u.length > 0 ? Math.floor(60 / u.length) : 60, b = [
    100 - y * u.length - 10,
    ...u.map(() => y),
    10
  ], m = u.map(
    (g) => o.reduce((_, A) => _ + (A.counts[g] || 0), 0)
  ), E = o.reduce((g, _) => g + _.total, 0);
  return rt(
    t,
    "docx",
    r && o.length > 0 ? /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ P(
        Rt,
        {
          as: "h2",
          data: i,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ G(ga, { widths: b, borderColor: "cbd5e1", children: [
        /* @__PURE__ */ P(Ve, { header: !0, children: c.map((g) => /* @__PURE__ */ P(oe, { children: g }, g)) }),
        o.map((g, _) => /* @__PURE__ */ G(Ve, { children: [
          /* @__PURE__ */ P(oe, { children: g.member }),
          u.map((A) => /* @__PURE__ */ P(oe, { children: String(g.counts[A] || 0) }, A)),
          /* @__PURE__ */ P(oe, { children: String(g.total) })
        ] }, _)),
        /* @__PURE__ */ G(Ve, { children: [
          /* @__PURE__ */ P(oe, { emphasis: !0, children: "Total" }),
          m.map((g, _) => /* @__PURE__ */ P(oe, { emphasis: !0, children: String(g) }, _)),
          /* @__PURE__ */ P(oe, { emphasis: !0, children: String(E) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ G("section", { className: "chart-section", children: [
    /* @__PURE__ */ P("h2", { className: "chart-title", children: i }),
    a && /* @__PURE__ */ G("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ P("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    o.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No supervisions recorded for the selected population." }) : /* @__PURE__ */ G(_t, { children: [
      /* @__PURE__ */ G("p", { className: "chart-query-note", children: [
        "Grand total: ",
        /* @__PURE__ */ P("strong", { children: s }),
        " ",
        s === 1 ? "student" : "students",
        " across",
        " ",
        o.length,
        " ",
        o.length === 1 ? "supervisor" : "supervisors",
        "."
      ] }),
      /* @__PURE__ */ P($H, { rows: o, levels: u })
    ] })
  ] }) : null;
}
function $H({ rows: e, levels: t }) {
  const [r, n] = at(!1);
  if (pt(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const a = e.map((i) => {
    const u = { name: HH(i.member) };
    for (const o of t) u[lp(o)] = i.counts[o] || 0;
    return u;
  });
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Ki, { width: "100%", height: 320, children: /* @__PURE__ */ G(vs, { data: a, margin: { top: 16, right: 24, bottom: 16, left: 0 }, children: [
    /* @__PURE__ */ P(Ji, { strokeDasharray: "3 3", stroke: "var(--border)" }),
    /* @__PURE__ */ P(Sn, { dataKey: "name", tick: { fontSize: 12 } }),
    /* @__PURE__ */ P(xn, { allowDecimals: !1 }),
    /* @__PURE__ */ P(
      ft,
      {
        contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem"
        }
      }
    ),
    /* @__PURE__ */ P(kr, { wrapperStyle: { fontSize: "0.875rem" } }),
    t.map((i, u) => /* @__PURE__ */ P(
      nr,
      {
        dataKey: lp(i),
        stackId: "supervision",
        fill: cT[u % cT.length],
        radius: u === t.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]
      },
      i
    ))
  ] }) }) });
}
function UH(e) {
  const t = /* @__PURE__ */ new Set(), r = [];
  let n = 0;
  for (const u of e) {
    const o = Array.isArray(u.supervisions) ? u.supervisions : [];
    if (o.length === 0) continue;
    const s = {};
    for (const c of o) {
      const l = (c.level || "other").toLowerCase();
      t.add(l), s[l] = (s[l] || 0) + 1;
    }
    r.push({
      member: u.name || u.slug || "Unknown",
      counts: s,
      total: o.length
    }), n += o.length;
  }
  const a = /* @__PURE__ */ new Map();
  for (const u of r)
    for (const [o, s] of Object.entries(u.counts))
      a.set(o, (a.get(o) || 0) + s);
  const i = [...t].sort(
    (u, o) => (a.get(o) || 0) - (a.get(u) || 0) || u.localeCompare(o)
  );
  return r.sort((u, o) => o.total - u.total || u.member.localeCompare(o.member)), { levels: i, rows: r, grandTotal: n };
}
function lp(e) {
  return String(e).charAt(0).toUpperCase() + String(e).slice(1);
}
function HH(e) {
  const t = String(e).trim().split(/\s+/);
  return t.length <= 1 ? e : `${t[0][0]}. ${t[t.length - 1]}`;
}
function qH({ queries: e = [] }) {
  const [t, r] = Op(), [, n] = Sp(), a = (i) => {
    r(i), n(null);
  };
  return /* @__PURE__ */ G("div", { className: "query-selector", children: [
    /* @__PURE__ */ P("label", { className: "query-selector-label", htmlFor: "academic-metrics-query", children: "Population" }),
    /* @__PURE__ */ G(
      "select",
      {
        id: "academic-metrics-query",
        className: "query-selector-control",
        value: t,
        onChange: (i) => a(i.target.value),
        children: [
          /* @__PURE__ */ P("option", { value: d_, children: "All members" }),
          e.map((i) => /* @__PURE__ */ P("option", { value: i.slug, children: i.name || i.slug }, i.slug))
        ]
      }
    )
  ] });
}
const WH = "members";
function YH() {
  const e = TC(WH), [, t] = Op(), [r, n] = Sp(), [a, i] = at(() => fT(r, e));
  if (pt(() => {
    i(fT(r, e));
  }, [e]), !e) return null;
  const u = (c, l) => {
    const f = { ...a, [c]: l };
    i(f);
    const h = GH(f, e);
    n(h), h && t(d_);
  }, o = () => {
    i({}), n(null);
  }, s = r && Object.keys(r).length > 0;
  return /* @__PURE__ */ G("fieldset", { className: "filter-panel", children: [
    /* @__PURE__ */ P("legend", { className: "filter-panel-legend", children: "Filter members" }),
    Object.entries(e).map(([c, l]) => /* @__PURE__ */ P(
      zH,
      {
        field: c,
        def: l,
        value: a[c],
        onChange: (f) => u(c, f)
      },
      c
    )),
    /* @__PURE__ */ P(
      "button",
      {
        type: "button",
        className: "filter-panel-reset",
        onClick: o,
        disabled: !s,
        children: "Reset filters"
      }
    )
  ] });
}
function zH({ field: e, def: t, value: r, onChange: n }) {
  const a = t?.label || e;
  switch (t?.type) {
    case "enum":
      return /* @__PURE__ */ P(gu, { label: a, field: e, children: /* @__PURE__ */ G(
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
      return /* @__PURE__ */ P(gu, { label: a, field: e, children: /* @__PURE__ */ G(
        "select",
        {
          id: `filter-${e}`,
          value: r === void 0 ? "" : String(r),
          onChange: (i) => {
            const u = i.target.value;
            n(u === "" ? void 0 : u === "true");
          },
          children: [
            /* @__PURE__ */ P("option", { value: "", children: "Any" }),
            /* @__PURE__ */ P("option", { value: "true", children: "Yes" }),
            /* @__PURE__ */ P("option", { value: "false", children: "No" })
          ]
        }
      ) });
    case "range":
      return /* @__PURE__ */ P(gu, { label: a, field: e, children: /* @__PURE__ */ G("div", { className: "filter-range", children: [
        /* @__PURE__ */ P(
          "input",
          {
            type: "number",
            min: t.min,
            max: t.max,
            placeholder: t.min != null ? String(t.min) : "min",
            value: r?.min ?? "",
            onChange: (i) => {
              const u = i.target.value === "" ? void 0 : Number(i.target.value);
              n(lT(r, "min", u));
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
              const u = i.target.value === "" ? void 0 : Number(i.target.value);
              n(lT(r, "max", u));
            }
          }
        )
      ] }) });
    case "text":
      return /* @__PURE__ */ P(gu, { label: a, field: e, children: /* @__PURE__ */ P(
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
function gu({ label: e, field: t, children: r }) {
  return /* @__PURE__ */ G("div", { className: "filter-row", children: [
    /* @__PURE__ */ P("label", { className: "filter-label", htmlFor: `filter-${t}`, children: e }),
    r
  ] });
}
function lT(e, t, r) {
  const n = { ...e || {} };
  return r === void 0 ? delete n[t] : n[t] = r, Object.keys(n).length === 0 ? void 0 : n;
}
function GH(e, t) {
  if (!e || !t) return null;
  const r = {};
  for (const [n, a] of Object.entries(t)) {
    const i = e[n];
    if (!(i == null || i === ""))
      if (a.type === "range") {
        const u = {};
        typeof i.min == "number" && (u.gte = i.min), typeof i.max == "number" && (u.lte = i.max), Object.keys(u).length > 0 && (r[n] = u);
      } else
        r[n] = i;
  }
  return Object.keys(r).length > 0 ? r : null;
}
function fT(e, t) {
  if (!e || !t) return {};
  const r = {};
  for (const [n, a] of Object.entries(t)) {
    const i = e[n];
    if (i !== void 0)
      if (a.type === "range" && i && typeof i == "object") {
        const u = {};
        typeof i.gte == "number" && (u.min = i.gte), typeof i.lte == "number" && (u.max = i.lte), Object.keys(u).length > 0 && (r[n] = u);
      } else
        r[n] = i;
  }
  return r;
}
function KH() {
  const [e, t] = qi(), { dateRange: r, refereedOnly: n, citationStyle: a } = e, i = (c) => {
    const l = c.target.value;
    t({
      dateRange: {
        ...r,
        start: l === "" ? null : Number(l)
      }
    });
  }, u = (c) => {
    const l = c.target.value;
    t({
      dateRange: {
        ...r,
        end: l === "" ? null : Number(l)
      }
    });
  }, o = (c) => {
    t({ refereedOnly: c.target.checked });
  }, s = (c) => {
    t({ citationStyle: c.target.value });
  };
  return /* @__PURE__ */ G("fieldset", { className: "report-options", children: [
    /* @__PURE__ */ P("legend", { className: "report-options-legend", children: "Report options" }),
    /* @__PURE__ */ G("div", { className: "report-options-row", children: [
      /* @__PURE__ */ G("label", { className: "report-options-field", children: [
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
      /* @__PURE__ */ G("label", { className: "report-options-field", children: [
        /* @__PURE__ */ P("span", { className: "report-options-label", children: "To year" }),
        /* @__PURE__ */ P(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            placeholder: "open",
            value: r.end ?? "",
            onChange: u,
            className: "report-options-input"
          }
        )
      ] }),
      /* @__PURE__ */ G("label", { className: "report-options-field", children: [
        /* @__PURE__ */ P("span", { className: "report-options-label", children: "Citation style" }),
        /* @__PURE__ */ P(
          "select",
          {
            value: a,
            onChange: s,
            className: "report-options-input",
            children: xC.map((c) => /* @__PURE__ */ P("option", { value: c.value, children: c.label }, c.value))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ G("label", { className: "report-options-item", children: [
      /* @__PURE__ */ P(
        "input",
        {
          type: "checkbox",
          checked: n,
          onChange: o
        }
      ),
      /* @__PURE__ */ P("span", { children: "Refereed only" })
    ] })
  ] });
}
function VH() {
  const [e, t] = CC(), r = new Set(e);
  return /* @__PURE__ */ G("fieldset", { className: "section-toggles", children: [
    /* @__PURE__ */ P("legend", { className: "section-toggles-legend", children: "Sections" }),
    /* @__PURE__ */ P("div", { className: "section-toggles-list", children: AC.map((n) => /* @__PURE__ */ G("label", { className: "section-toggles-item", children: [
      /* @__PURE__ */ P(
        "input",
        {
          type: "checkbox",
          checked: !r.has(n),
          onChange: () => t(n)
        }
      ),
      /* @__PURE__ */ P("span", { children: SC(n) })
    ] }, n)) })
  ] });
}
function XH() {
  const { data: e } = l_({ path: "/data/queries.json", as: "queries" }), t = Array.isArray(e) ? e : [];
  return /* @__PURE__ */ G("div", { className: "w-[min(32rem,calc(100vw-3rem))] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-xl flex flex-col gap-4", children: [
    /* @__PURE__ */ P(qH, { queries: t }),
    /* @__PURE__ */ P(YH, {}),
    /* @__PURE__ */ P(KH, {}),
    /* @__PURE__ */ P(VH, {})
  ] });
}
function QH() {
  return /* @__PURE__ */ G(
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
function ZH() {
  return /* @__PURE__ */ G(
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
function JH() {
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
function e7({
  title: e = "Academic Metrics",
  filename: t = "academic-metrics"
}) {
  const { website: r } = Mo(), [n, a] = at(null), [i, u] = at(null), [o, s] = at(!1), [c, l] = at(!1), f = ri(null);
  pt(() => {
    if (!o && !c) return;
    const y = (b) => {
      f.current && !f.current.contains(b.target) && (s(!1), l(!1));
    };
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, [o, c]);
  const h = async (y) => {
    a(null), u(y), l(!1);
    try {
      const b = await ZI(r, {
        format: y,
        foundation: Su,
        title: e
      }), m = Su.outputs?.[y]?.extension || y;
      VI(b, `${t}.${m}`);
    } catch (b) {
      console.error("compile failed", b), a(b?.message || String(b));
    } finally {
      u(null);
    }
  };
  return /* @__PURE__ */ G(
    "div",
    {
      ref: f,
      className: "fixed top-6 right-6 z-40 flex flex-col items-end gap-2",
      children: [
        /* @__PURE__ */ G("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ G(
            "button",
            {
              type: "button",
              onClick: () => {
                s((y) => !y), l(!1);
              },
              "aria-expanded": o,
              "aria-label": "Report options",
              className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-body text-sm font-semibold shadow-md transition hover:bg-muted",
              children: [
                /* @__PURE__ */ P(QH, {}),
                "Options"
              ]
            }
          ),
          /* @__PURE__ */ G("div", { className: "relative", children: [
            /* @__PURE__ */ P(
              "button",
              {
                type: "button",
                onClick: () => {
                  l((y) => !y), s(!1);
                },
                disabled: i !== null,
                "aria-expanded": c,
                "aria-haspopup": "menu",
                className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 transition hover:bg-primary-hover disabled:opacity-60",
                children: i ? /* @__PURE__ */ G(_t, { children: [
                  /* @__PURE__ */ P("span", { className: "h-2 w-2 animate-pulse rounded-full bg-primary-foreground" }),
                  "Generating…"
                ] }) : /* @__PURE__ */ G(_t, { children: [
                  /* @__PURE__ */ P(ZH, {}),
                  "Download",
                  /* @__PURE__ */ P(JH, {})
                ] })
              }
            ),
            c && /* @__PURE__ */ G(
              "div",
              {
                role: "menu",
                className: "absolute right-0 top-full mt-2 min-w-48 rounded-lg border border-border bg-card p-1.5 shadow-xl flex flex-col gap-0.5",
                children: [
                  /* @__PURE__ */ G(
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
                  /* @__PURE__ */ G(
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
        o && /* @__PURE__ */ P(XH, {}),
        n && /* @__PURE__ */ P("p", { className: "max-w-xs rounded bg-error-subtle px-3 py-1 text-xs text-error", children: n })
      ]
    }
  );
}
function t7({ body: e, page: t }) {
  const { website: r } = Mo(), n = t?.title || "Academic Metrics", a = (t?.title || "academic-metrics").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return pt(() => IC(t), [t]), /* @__PURE__ */ G(DT, { basePath: r.basePath, children: [
    /* @__PURE__ */ P("main", { className: "metrics-body mx-auto max-w-5xl px-6 pb-16", children: /* @__PURE__ */ P("div", { className: "metrics-report", children: e }) }),
    /* @__PURE__ */ P(e7, { title: n, filename: a })
  ] });
}
const r7 = { handlers: Su?.handlers, outputs: Su?.outputs, vars: { "max-content-width": { default: "72rem" }, "section-padding-y": { default: "clamp(2rem, 4vw, 4rem)" }, "report-gap": { default: "clamp(2rem, 4vw, 4rem)" } }, data: { members: null, queries: null }, defaultLayout: "MetricsLayout", layouts: { MetricsLayout: t7 } }, n7 = {
  Members: {
    data: {
      members: null,
      queries: null
    }
  },
  PublicationsList: {
    data: {
      members: null,
      queries: null
    }
  }
}, a7 = {}, y7 = { meta: n7, capabilities: r7, layoutMeta: a7 };
export {
  c7 as C,
  dr as D,
  l7 as F,
  f7 as M,
  d7 as P,
  b7 as S,
  y7 as _,
  nw as a,
  h7 as b,
  iu as c,
  p7 as d,
  m7 as e,
  ZI as f,
  ye as g,
  lm as h,
  MI as p,
  ai as r
};
//# sourceMappingURL=_entry.generated-B6gv0GfV.js.map
