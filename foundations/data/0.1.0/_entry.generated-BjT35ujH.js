import { jsx as I, jsxs as ee, Fragment as wt } from "react/jsx-runtime";
import * as $r from "react";
import C, { createContext as ar, useMemo as an, createElement as wo, useContext as zt, Children as Br, isValidElement as Lt, cloneElement as Ue, Suspense as $S, useState as ft, useEffect as Et, useReducer as US, PureComponent as ir, forwardRef as TT, useRef as ei, useImperativeHandle as HS, useCallback as qS, Component as _T } from "react";
import { renderToStaticMarkup as pp } from "react-dom/server";
import { getUniweb as mp, deriveCacheKey as WS } from "@uniweb/core";
const AT = /\s+/, YS = /([+\-*\/=<>!&|]+)/, L0 = {
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
function Rn(e, t, r = {}) {
  const n = Object.keys(t), a = r.minQuoteLevel || 0, i = r.splitText || !1;
  r.skipCommas;
  const u = [];
  let o = 0, s = "", c = !1, l = "", f = [], h = "", p = 0;
  const g = ["'", '"', "`", "‘", "’", "“", "”"], y = (v, _) => v === _ ? !0 : ["‘", "’"].includes(v) && ["‘", "’"].includes(_) || ["“", "”"].includes(v) && ["“", "”"].includes(_);
  function m(v, _) {
    if (i && v == "text") {
      const A = _.trim().split(AT);
      for (let b of A)
        b = KS(b), b !== "" && u.push({ type: v, value: b });
    } else
      u.push({ type: v, value: _ });
    s = "";
  }
  function E(v) {
    p === 0 ? (s !== "" && m("text", s), s = v) : s += v;
  }
  for (; o < e.length; ) {
    const v = e[o];
    n.includes(v) && !c ? (E(v), p = f.push(v), h = t[v]) : v === h && !c ? (s += v, f.pop(), p--, h = p > 0 ? t[f[p - 1]] : "", p === 0 && m("enclosure", s)) : !c && g.includes(v) && p > a ? (E(v), c = !0, l = v) : c && y(l, v) ? (s += v, c = !1, p === 0 && m("quote", s)) : s += v, o++;
  }
  return s !== "" && m("text", s), u;
}
function GS(e) {
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
function OT(e, t = []) {
  if (typeof e != "string")
    return e instanceof Object ? { ...e } : {};
  const r = Rn(e, { "{": "}", "(": ")" }, { minQuoteLevel: 1 }), n = {};
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
      const c = u.slice(1, -1).trim().split(AT), l = c.shift(), f = c[0] === "$0";
      f && c.shift(), !l || !/^[a-zA-Z_]\w*$/.test(l) ? a("name", "word", c.join(" ")) : c.every((h) => /^(\.\.\.)?[a-zA-Z_]\w*$/.test(h)) ? n[l] = { args: c, body: s, isText: o == "{", hasFlags: f } : a("arguments", "words", c.join(" "));
    }
  }
  return n;
}
function KS(e) {
  let t = 0, r = e.length - 1;
  for (; t <= r && e[t] === ","; )
    t++;
  for (; r >= t && e[r] === ","; )
    r--;
  return e.slice(t, r + 1);
}
function zS(e) {
  const t = [];
  let r, n, a;
  for (let i of e)
    if (i.type === "text")
      if (r = i.value.split(YS), r.length <= 1)
        t.push(i);
      else
        for (let u = 0; u < r.length; u++)
          n = r[u].trim(), n !== "" && (a = "+-*/=<>!&|".includes(n[0]), n === "!" && t.push({ type: "text", value: "" }), t.push({ type: "text", value: n, isOperator: a }));
    else
      t.push(i);
  return t;
}
function VS(e) {
  const t = [];
  let r = 0, n = !1, a = [];
  for (; r < e.length; ) {
    const i = e[r], u = e[r + 1];
    u && u.isOperator ? (n || (n = !0, a = []), a.push(i, u), r += 2) : (n ? (n = !1, a.push(i), t.push({ type: "chain", tokens: a })) : t.push(i), r++);
  }
  return n && t.push({ type: "chain", tokens: a }), t;
}
function XS(e) {
  const t = [], r = [];
  let n, a, i;
  for (let u of e)
    if (!u.isOperator)
      t.push(u.value);
    else {
      for (; r.length > 0 && L0[r[r.length - 1]] >= L0[u.value]; )
        n = r.pop(), a = t.pop(), i = t.pop(), t.push(`(${n} ${i} ${a})`);
      r.push(u.value);
    }
  for (; r.length > 0; )
    n = r.pop(), a = t.pop(), i = t.pop(), t.push(`(${n} ${i} ${a})`);
  return t[0];
}
function QS(e) {
  const t = zS(e), r = VS(t);
  for (const n of r)
    n.type === "chain" && (n.type = "enclosure", n.value = XS(n.tokens), delete n.tokens);
  return r;
}
function ZS(e) {
  if (!e.length) return [];
  const t = { show: "#", if: "?", sort: ">>" }, r = t[e[0].value.toLowerCase()];
  if (!r) return e;
  e = QS(e);
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
    const f = k0(l).map((h) => h.value);
    c.args.push({ type: "enclosure", value: "(" + f.join(" ") + ")" });
  }
  if (c.name == "?" && c.args.length == 2) {
    for (const l of i)
      if ("otherwise" in l.flags) {
        c.args.push(l.flags.otherwise);
        break;
      }
  }
  return k0(c);
}
function k0(e) {
  const t = [{ type: "text", value: e.name }];
  for (const r of e.args)
    t.push(r);
  for (const r in e.flags) {
    const n = e.flags[r];
    n === !0 ? t.push({ type: "text", value: "-" + r }) : t.push({ type: "text", value: "-" + r + "=" }, n);
  }
  return t;
}
const JS = {
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
}, ex = {
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
}, B0 = {
  accessor: {
    "": { handler: nx, minArgs: 2, spread: !1 },
    // handler
    ".": ax
  },
  collector: {
    "": bx,
    // handler
    "++": $0,
    // add, concat, merge
    "++!!": ST
  },
  creator: {
    "": { handler: ix, spread: !1 },
    //applyCreator, // handler
    "^": Ur,
    "~": ox,
    "\\": sx,
    // Single backslash \ escaped
    "@": cx,
    "<>": lx,
    phone: fx,
    address: dx,
    org: hx,
    ref: px,
    currency: mx,
    email: yx
  },
  filter: {
    "": Sx,
    // handler
    "&": xx,
    // !!&
    "|": wx,
    // !!|
    "|=": _x,
    // (|= val set) same as (| (= val set))
    "|?": Ax,
    // (|? COND val) same as (| (? COND val))
    "&?": Ox,
    "+?": Zt
    // or maybe &&
  },
  formatter: {
    "": { handler: Ix, minArgs: 1, spread: !1 },
    // handler
    "#": Dn
  },
  unary: {
    "": { handler: Cx, minArgs: 1, spread: !1 },
    // handler
    "!": Hx,
    // list-aware; use -l to treat list as one value
    "!!": qx
    // same as (! (! val))
  },
  joiner: {
    "": { handler: Nx, minArgs: 2, spread: !0 },
    // handler
    "+-": Jt,
    "+:": Jt
    // new name
  },
  mapper: {
    "": { handler: Px, minArgs: 2, spread: !0 },
    // handler
    "+": $0,
    // add, prefix, suffix
    "-": gx,
    "%": vx,
    "*": Ex,
    "/": Tx,
    ">": Mx,
    "<": Lx,
    ">=": kx,
    "<=": Bx,
    "=": jx,
    "==": Fx,
    "!=": $x,
    "!==": Ux
  },
  sorter: {
    "": Wx,
    // handlers
    ">>": Yx
  },
  switcher: {
    "": Kx,
    // handlers
    "?": ja,
    "??": ja,
    // same as ? with no arguments, but can filter several args
    "???": ja,
    "?:": ja
  }
}, tx = ["wrap", "aux", "label", "heading", "title"];
let kd;
const j0 = {};
function F0(e, t, r) {
  j0[e] ??= rx(e);
  const n = j0[e];
  if (!n) return;
  if (r.length < n.minArgs) return null;
  if ((n.spread && r.length == n.minArgs && !t.l || t.s) && ke(r[r.length - 1])) {
    const u = r.pop();
    r = r.concat(u);
  }
  let a = ex[e] || [];
  for (let u in a) {
    const o = a[u];
    if (ke(o)) {
      for (const s of o)
        if (s in t) {
          t[u] ? t[u] = [t[u], s] : t[u] = s, t.type = u, t.style = s;
          continue;
        }
    }
  }
  !t.type && typeof t.as == "string" && (t.type = t.as), t.lang ? t.locale = t.lang : (t.locale || (t.locale = ti(t.locale)), t.lang = CT(t.locale)), t._name = e;
  const i = n.handler(n.fn, t, r);
  return t.r && ke(i) && i.reverse(), i === void 0 ? null : i;
}
function rx(e) {
  for (let t in B0) {
    const r = B0[t];
    if (r.hasOwnProperty(e)) {
      let n = r[""];
      return typeof n == "function" ? n = { handler: n, minArgs: 1, spread: !0 } : Dt(n) && (n = { ...n }), n.fn = r[e], n;
    }
  }
  return !1;
}
function nx(e, t, r) {
  const n = r[0], a = r.slice(1);
  if (!a.length) return n;
  if (Dt(n))
    if (a.length > 1 || ke(a[0])) {
      const i = a.length == 1 ? a[0] : a, u = [];
      for (const o of i)
        u.push(e(n, o));
      return u;
    } else
      return e(n, a[0]);
  else return a.length == 1 ? e(n, a[0]) : e(n, a);
}
function ax(e, t) {
  if (Kt(e) && (e = e.toString()), Er(e))
    return un(e, t);
  if (ke(e)) {
    const r = {};
    for (const n of e)
      r[n] = un(n, t);
    return r;
  }
  if (Dt(e)) {
    const r = {};
    for (const n in e)
      r[e[n]] = un(n, t);
    return r;
  }
}
function ix(e, t, r) {
  if (["~", "phone", "address", "ref", "email"].includes(t._name) && fn(r)) {
    let n = Ur(t, r);
    return t._name === "phone" && (n = n.filter((a) => a[0])), n.map((a) => e(t, a));
  }
  return e(t, r);
}
function Bd(e) {
  return Math.max(...e.map((t) => Array.isArray(t) ? t.length : 1));
}
function Ur(e, t) {
  const r = parseInt(e.sz) || Bd(t);
  let n = e.dv ?? null;
  n !== null && (n = yr(n, _u(n)));
  const a = [];
  for (const i of t)
    Array.isArray(i) ? r > i.length ? a.push([...i, ...Array(r - i.length).fill(n)]) : r < i.length ? a.push(i.slice(0, r)) : a.push(i) : a.push(Array(r).fill(i));
  return e.t ? a : ux(a);
}
function ux(e) {
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
function ox(e, t) {
  return new Wt(e, t);
}
function sx(e, t) {
  return new RegExp(t, e);
}
function cx(e, t) {
  return new r2(e, t);
}
function lx(e, t) {
  return new Ye(e, t);
}
function fx(e, t) {
  return new n2(e, t);
}
function dx(e, t) {
  return new a2(e, t);
}
function hx(e, t) {
  return new i2(e, t);
}
function px(e, t) {
  return new u2(e, t);
}
function mx(e, t) {
  return new o2(e, t);
}
function yx(e, t) {
  return new s2(e, t);
}
function bx(e, t, r) {
  const n = Yn(r);
  return n.length ? e.init !== void 0 ? n.reduce(e, e.init) : n.reduce(e) : "";
}
function gx(e, t) {
  if (Kt(e) && Kt(t)) return e - t;
  if (Er(e) && Er(t)) {
    if (e.length >= t.length) {
      if (e.endsWith(t)) return e.slice(0, -t.length);
    } else if (t.startsWith(e)) return t.slice(e.length);
    return e;
  }
  return null;
}
function vx(e, t) {
  return t / e * 100;
}
function Ex(e, t) {
  return e * t;
}
function Tx(e, t) {
  return Kt(e) && Kt(t) ? e / t : e.toString().split(t.toString());
}
function $0(e, t) {
  return e + t;
}
function _x(e) {
  const [t, r] = e;
  return t && r && r instanceof Wt ? r.contains(t) : !1;
}
function Ax(e, t) {
}
function Ox(e, t) {
}
function Jt(e, t) {
  const r = t[0]?.toString();
  let n = t.slice(1);
  if (n = Yn(n), Er(r))
    return n.filter((i) => !Po(i)).join(r);
  if (ke(r)) {
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
function Zt(e) {
  return e.every((t) => !Po(t)) ? Jt({}, ["", ...e]) : "";
}
function ST(e, t) {
  return gn(t) ? e : e + 1;
}
ST.init = 0;
function Yn(e) {
  return ke(e) ? e.flat(1 / 0) : e == null ? [] : typeof e == "object" ? Object.values(e).flat(1 / 0) : [e];
}
function Sx(e, t, r) {
  if (!fn(r))
    return e(r);
  const n = Ur({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(n[i]));
  return a;
}
function xx(e) {
  for (let t = 0; t < e.length; t++)
    if (gn(e[t])) return e[t];
  return e[e.length - 1];
}
function wx(e) {
  for (let t = 0; t < e.length; t++)
    if (!gn(e[t]))
      return e[t];
  return null;
}
function Px(e, t, r) {
  const n = r[0], a = r.slice(1);
  let i;
  return /*config.stepIn[0] &&*/ Array.isArray(n) ? i = n.map((u) => U0(e, u, a)) : i = U0(e, n, a), i;
}
function Ix(e, t, r) {
  if (r.length === 1)
    return e({ ...t }, r[0]);
  const n = (i) => i.length == 1 ? e({ ...t }, i[0]) : i.map((u) => e({ ...t }, u));
  return fn(r) ? Ur({}, r).map((i) => n(i)) : n(r);
}
function Cx(e, t, r) {
  const n = r[0];
  return t.l ? e({ ...t }, n) : Array.isArray(n) ? n.map((a) => e({ ...t }, a)) : e({ ...t }, n);
}
function Nx(e, t, r) {
  if (!fn(r))
    return e(t, r);
  const n = Ur({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(t, n[i]));
  return a;
}
function U0(e, t, r) {
  return r.length == 1 && !ke(r[0]) ? e(t, r[0]) : (r.length == 1 && ke(r[0]) && (r = r[0]), r.map((n) => Array.isArray(n) ? n.map((a) => e(t, a)) : e(t, n)));
}
function Rx(e, t) {
  if (!e) return [];
  if (e = Array.isArray(e) ? e : e.split("|"), Er(t) && (t = t.split(",")), !zx(t))
    return e;
  const r = [];
  for (const n of t)
    r.push(e[n]);
  return r;
}
function Dn(e, t) {
  if (e.type ??= _u(t, e), e.row ? (t = Rx(t, e.row), e.type = "list") : t = yr(t, e.type, e), t === null) return "";
  const r = e.json ? "json" : e.type, n = { ...e };
  tx.forEach((i) => {
    delete n[i];
  });
  const a = { ...n, [e.type]: e[e.type] };
  return t = Dx(r, a, t), e.title && Er(t) && (t = IT(t, e.locale)), e.aux && (ke(t) && (t = t.join(e.sep || ", ")), t = yp(e, t)), e.label && (ke(t) && (t = t.join(e.sep || ", ")), e.label === !0 && (e.label = e._params[0]), t = t2(e, t)), e.heading && (ke(t) && (t = t.join(e.sep || ", ")), e.heading === !0 && (e.heading = e._params[0]), t = e2(e, t)), e.wrap && (Po(t) ? t = "" : (e.wrap === !0 && (e.wrap = "()"), t = e.wrap[0] + t + e.wrap[1])), t;
}
function Dx(e, t, r) {
  switch (e) {
    case "null":
      return "";
    case "entity":
      return r.format(t);
    case "date":
      return Xx(t, r);
    case "number":
      return Qx(t, r);
    case "text":
    case "string":
      return Zx(t, r);
    case "object":
      return PT(t, r);
    case "json":
      return JSON.stringify(r);
    case "list":
      return wT(t, r);
    case "boolean":
      return r ? "1" : "0";
    default:
      return r ? r?.toString() || "" : (console.warn(`Cannot format type: ${t.type} for the value ${r}`), "");
  }
}
function Mx(e, t) {
  return e > t;
}
function Lx(e, t) {
  return e < t;
}
function kx(e, t) {
  return e >= t;
}
function Bx(e, t) {
  return e <= t;
}
function jx(e, t) {
  return e == t;
}
function Fx(e, t) {
  return e === t;
}
function $x(e, t) {
  return e != t;
}
function Ux(e, t) {
  return e !== t;
}
function Hx(e, t) {
  return gn(t);
}
function qx(e, t) {
  return !gn(t);
}
function Wx(e, t, r) {
  if (!fn(r))
    return e(t, r);
  const n = Ur({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(t, n[i]));
  return a;
}
function Yx(e, t) {
  const r = e.date ? Gx : xT, n = e.desc ? -1 : 1;
  return t.sort((a, i) => n * r(e, a, i));
}
function Tu(e, t) {
  if (t.by && Dt(e) && !ke(e)) {
    const r = e[t.by];
    return r !== void 0 ? r : H0(e);
  }
  return H0(e);
}
function Gx(e, t, r) {
  let n = Tu(t, e), a = Tu(r, e);
  return dn(n) && dn(a) ? yr(n, "date").getTime() - yr(a, "date").getTime() : xT(e, t, r);
}
function xT(e, t, r) {
  let n = Tu(t, e), a = Tu(r, e);
  const i = Kt(n), u = Kt(a);
  return i && u ? Number(n) - Number(a) : !i && !u ? (typeof n != "string" && (n = String(n)), typeof a != "string" && (a = String(a)), n.localeCompare(a, e.locale)) : i ? -1 : 1;
}
function H0(e) {
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
function Kx(e, t, r) {
  let n = [], a = [];
  if (t._name === "?:")
    n = r, a = r;
  else {
    let i = parseInt(t.cases);
    if (i || (i = { "??": 2, "???": 3 }[t._name] || 1), i >= r.length)
      return null;
    n = r.slice(0, i), a = r.slice(i);
  }
  if (!fn(n) && !fn(a))
    return e(t, n, a);
  {
    const i = Math.max(Bd(n), Bd(a)), u = { sz: i }, o = Ur(u, n), s = Ur(u, a), c = [];
    for (let l = 0; l < i; l++)
      c.push(e(t, o[l], s[l]));
    return c;
  }
}
function ja(e, t, r) {
  for (let n = 0; n < t.length; n++)
    if (!gn(t[n]))
      return r[n];
  return r.length > t.length ? r[t.length] : null;
}
function Po(e) {
  return e == null || e === "" || Number.isNaN(e) ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof st && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function gn(e) {
  return !e || e === "0" ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof st && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function un(e, t) {
  const r = e.split(".");
  let n = t;
  for (let a = 0; a < r.length; a++) {
    let i = r[a];
    if (ke(n) && !Kt(i)) {
      const u = [];
      for (let o of n)
        i = r.slice(a).join("."), u.push(un(i, o));
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
function Dt(e) {
  return e !== null && typeof e == "object";
}
function Er(e) {
  return typeof e == "string";
}
function ke(e) {
  return Array.isArray(e);
}
function zx(e) {
  if (!ke(e) || !e.length) return !1;
  for (const t of e)
    if (!Kt(t)) return !1;
  return !0;
}
function fn(e) {
  for (let t of e)
    if (ke(t)) return !0;
  return !1;
}
function Kt(e) {
  return !isNaN(Number(e));
}
function dn(e) {
  return e ? e instanceof Date ? !0 : typeof e != "string" ? !1 : !isNaN(new Date(e).getTime()) : !1;
}
function Vx(e) {
  return dn(e) ? !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(e) : !1;
}
function yr(e, t, r = {}) {
  switch (t) {
    case "boolean":
      return !gn(e);
    case "date":
      return dn(e) ? e instanceof Date || r.date === "auto" && Vx(e) ? e : new Date(e.replace(/-/g, "/")) : null;
    case "text":
    case "string":
      return Er(e) ? e : Jt(Yn(e));
    case "list":
      return ke(e) ? e : Dt(e) ? Yn(e) : null;
    case "object":
      return Dt(e) ? e : null;
    case "number":
      return Kt(e) ? parseFloat(e) : dn(e) ? yr(e, "date").getTime() : 0;
    case "range":
      return e instanceof Wt ? e : ke(e) ? new Wt(r, e) : Dt(e) ? new Wt(r, [e.start, e.end]) : new Wt(r, [e]);
    case "tag":
      return e instanceof Ye ? e : ke(e) ? new Ye(r, [e]) : e instanceof st ? new Ye(r, [[null, e, null]]) : Dt(e) ? new Ye(r, [e]) : new Ye(r, [[null, e, null]]);
  }
  return e;
}
function _u(e, t = {}) {
  if (e instanceof st)
    return "entity";
  if (e instanceof Date)
    return "date";
  const r = typeof e;
  return r == "undefined" || e === null ? "null" : r == "boolean" ? r : ke(e) ? "list" : Kt(e) ? "number" : dn(e) ? "date" : Dt(e) ? "object" : r;
}
function Xx(e, t) {
  if (!dn(t))
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
  return Er(n) && (n = r[n]), (!n || n === !0) && (n = "medium"), Er(n) && (n = { dateStyle: n }), t instanceof Date ? t.toLocaleDateString(e.locale, n) : t;
}
function Qx(e, t) {
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
function Zx(e, t) {
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
function wT(e, t) {
  const r = [];
  for (let n of t)
    ke(n) ? n = wT(e, n) : Dt(n) && (n = PT(e, n)), Po(n) || r.push(n);
  return r.join(e.sep === void 0 ? " " : e.sep);
}
function PT(e, t) {
  return JSON.stringify(t);
}
function IT(e, t) {
  t = ti(t);
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
function Jx(e) {
  kd = typeof document < "u" && document.documentElement?.getAttribute("lang") || "en";
}
function ti(e = null) {
  return kd || Jx(), e || kd;
}
function CT(e = null) {
  return ti(e).split("-")[0].toLowerCase();
}
function q0(e) {
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
  }[CT(e)];
}
function yp(e, t) {
  return t ? new Ye(e, [["u-aux", t]]).format() : "";
}
function e2(e, t) {
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
function t2(e, t) {
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
      let c = ja({}, o, s);
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
class r2 extends st {
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
class Wt extends st {
  constructor(t, r) {
    super(t, r);
    const n = Yn(r), a = n[0], i = n[1];
    this.givenStart = a, this.givenEnd = i, this.includeStart = !t.open, this.includeEnd = !t.open, this.flags.type || (this.flags.type = _u(a || i)), this.start = yr(a, "number"), this.end = yr(i, "number");
  }
  /**
   * Check if the Range includes a specific value
   */
  contains(t) {
    if (t instanceof Wt) return this.overlaps(t);
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
    return t.type === "date" ? (n = n ? Dn(t, n) : q0(t.locale), a = a ? Dn(t, a) : q0(t.locale)) : t.type !== "range" && (n = Dn(t, n || ""), a = Dn(t, a || "")), n || a ? `${n}${r}${a}` : "";
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
            if (o instanceof st && o.isEmpty()) return "";
          } else return "";
        if (c === 0 && (f = u), f && Object.keys(f).length) {
          l = l === "_self" ? "span" : l;
          let h = Object.keys(f).reduce((p, g) => `${p} ${g}="${f[g]}"`, "");
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
class n2 extends st {
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
    let o = new Wt({}, [i, u]).format();
    return [
      Zt([r, ":"]),
      Zt(["+", n]),
      this.buildNumber(),
      Zt(["x ", a]),
      // joinIfAllTrue(['(', new Range({}, [start, end]), ')']),
      o ? new Ye({}, [["u-aux", o]]).format() : ""
    ].filter(Boolean).join(" ");
  }
  buildNumber() {
    const { area: t, number: r } = this.parsedArgs;
    return !t && !r ? "" : Zt([Zt(["(", t, ") "]), r]);
  }
  isEmpty() {
    return !this.buildNumber();
  }
  toString() {
    return this.format();
  }
}
class a2 extends st {
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
      Jt({}, [
        " ",
        Dn({ tag: "bold", type: "tag", bold: !0 }, Zt([t, ":"])),
        Jt({}, [
          " ",
          a,
          Zt(["(", new Wt({}, [f, h]), ")"])
        ])
      ]),
      i,
      u,
      o,
      s,
      Jt({}, [
        ", ",
        n,
        Jt({}, [" ", c, Zt(["(", r, ")"])])
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
class i2 extends st {
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
    const { type: t, organization: r, country: n, province: a } = this.parsedArgs, i = Jt(null, [" - ", n, a, t]);
    return new Ye({}, [
      [
        "u-org",
        new Ye({}, [
          ["u-org-name", r],
          ["_self", yp({}, i)]
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
class u2 extends st {
  constructor(t, r) {
    super(t, Yn(r));
  }
  format() {
    const [t, ...r] = this.values, n = Jt(null, [" - ", ...r]);
    return t ? new Ye({}, [
      [
        "u-ref",
        new Ye({}, [
          ["u-ref-name", t],
          ["_self", yp({}, n)]
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
class o2 extends st {
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
    const { amount: t, currency: r, convertedAmount: n } = this.parsedArgs, a = JS[r.toLowerCase()], u = [["u-amount", a ? new Intl.NumberFormat(`${ti()}-CA`, {
      style: "currency",
      currency: a
    }).format(t) : t]];
    return r && u.push(["u-unit", r]), n && n !== "0" && u.push([
      "u-aux",
      new Intl.NumberFormat(`${ti()}-CA`, {
        style: "currency",
        currency: "CAD"
      }).format(n)
    ]), new Ye({}, [["u-currency", new Ye({}, u)]]).format();
  }
  isEmpty() {
    return !this.parsedArgs.amount;
  }
  toString() {
    return this.format();
  }
}
class s2 extends st {
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
    let i = new Wt({}, [n, a]).format();
    return [
      Zt([t, ":"]),
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
const W0 = /^[@]?[\$]?[\/]?[a-zA-Z_][a-zA-Z0-9_\/\.-]*$|^@$|^\?$/, c2 = /^-?\d+(\.\d+)?$/;
class l2 {
  /**
   * Create a loom with given snippets and custom functions.
   *
   * @param {Object|string} snippets - A key-value object, or a string with snippet definitions.
   * @param {Object} functions - A map of custom function names to handlers.
   */
  constructor(t = {}, r = {}) {
    this.snippets = OT(t), this.functions = r;
  }
  /**
   * Sets the template variables.
   *
   * @param {Object|function} variables - A key-value object, or a function that maps a key to a value.
   * @return {void}
   */
  setVariables(t) {
    this.variables = typeof t == "function" ? t : (r) => un(r, t);
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
    const a = Rn(t, { "{": "}" });
    let i = "";
    for (const u of a)
      if (u.type === "enclosure") {
        let o = u.value.slice(1, -1);
        o.startsWith("{") && o.endsWith("}") && (o = o.slice(1, -1));
        try {
          o = this.evaluateText(o, null, n), typeof o != "string" && (o = F0("#", { l: !0, sep: ", " }, [o]), Array.isArray(o) && o.every((s) => typeof s == "string") && (o = o.join(", ")));
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
    if (t = t.trim(), r && this.setVariables(r), W0.test(t))
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
    const n = Rn(
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
    const n = Rn(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!n.length) return "";
    const a = GS(n), i = {};
    for (let [u, o] of a.entries())
      typeof u != "string" && (u = this.evaluateExpression(u, r).value), o = this.evaluateExpression(o, r).value, i[u] = o;
    return i;
  }
  parseFunction(t) {
    let r = Rn(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!r.length) return {};
    r = ZS(r);
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
    const o = F0(n, u, i);
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
    return typeof r == "string" ? { label: r } : (r.label ??= IT(t.split("_").join(" ")), r);
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
    return r && r.has(n) ? { value: r.get(n), type: "aux" } : W0.test(n) ? {
      value: this.getVariable(n, r),
      label: this.getVariableMeta(n).label,
      type: "variable"
    } : c2.test(n) ? { value: parseFloat(n), type: "number" } : { value: this.getError(103, "Invalid expression", n), type: "error" };
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
const NT = [
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
NT.sort((e, t) => t.length - e.length);
const f2 = new Set(NT.map((e) => e.join(" ").toUpperCase())), d2 = /* @__PURE__ */ new Set([
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
]), h2 = /* @__PURE__ */ new Set([">=", "<=", "!=", "==", "&&", "||"]), p2 = /* @__PURE__ */ new Set(["+", "-", "*", "/", "%", "=", "<", ">", "!"]), m2 = /[a-zA-Z_@$?]/, y2 = /[a-zA-Z0-9_.\/@]/, Os = /[0-9]/;
function b2(e) {
  return g2(e);
}
function g2(e) {
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
      const u = RT(e, n, a);
      if (u < 0) throw new Error(`Unterminated string starting at ${n}`);
      t.push({ type: "string", value: e.slice(n + 1, u) }), n = u + 1;
      continue;
    }
    if (a === "{") {
      const u = E2(e, n, "{", "}");
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
    if (Os.test(a) || a === "-" && Os.test(e[n + 1] || "") && v2(t)) {
      let u = n + (a === "-" ? 1 : 0);
      for (; u < r && (Os.test(e[u]) || e[u] === "."); ) u++;
      t.push({ type: "number", value: parseFloat(e.slice(n, u)) }), n = u;
      continue;
    }
    const i = e.slice(n, n + 2);
    if (h2.has(i)) {
      t.push({ type: "operator", value: i }), n += 2;
      continue;
    }
    if (p2.has(a)) {
      t.push({ type: "operator", value: a }), n++;
      continue;
    }
    if (m2.test(a)) {
      let u = n + 1;
      for (; u < r && y2.test(e[u]); ) u++;
      const o = e.slice(n, u), s = o.toLowerCase();
      s === "and" ? t.push({ type: "operator", value: "&" }) : s === "or" ? t.push({ type: "operator", value: "|" }) : s === "not" ? t.push({ type: "operator", value: "!" }) : t.push({ type: "word", value: o }), n = u;
      continue;
    }
    t.push({ type: "unknown", value: a }), n++;
  }
  return t;
}
function v2(e) {
  if (e.length === 0) return !0;
  const t = e[e.length - 1];
  return !!(t.type === "operator" || t.type === "lparen" || t.type === "word" && f2.has(t.value.toUpperCase()));
}
function RT(e, t, r) {
  for (let n = t + 1; n < e.length; n++) {
    if (e[n] === "\\" && n + 1 < e.length) {
      n++;
      continue;
    }
    if (e[n] === r) return n;
  }
  return -1;
}
function E2(e, t, r, n) {
  let a = 0;
  for (let i = t; i < e.length; i++) {
    const u = e[i];
    if (u === '"' || u === "'" || u === "`") {
      const o = RT(e, i, u);
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
function T2(e, t, r) {
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
class br extends Error {
}
const _2 = /* @__PURE__ */ new Set(["long", "full", "short", "medium"]), A2 = [
  ["for", "each"],
  ["total", "of"],
  ["sum", "of"],
  ["average", "of"],
  ["count", "of"],
  ["show"],
  ["if"]
], Bi = [
  ["from", "lowest", "to", "highest"],
  ["from", "highest", "to", "lowest"],
  ["sorted", "by"],
  ["joined", "by"],
  ["with", "label"],
  ["if", "present"],
  ["where"],
  ["as"],
  ["if"]
], O2 = [["then"], ["show"]], S2 = [["otherwise"], ["else"]], x2 = [["else"], ["show"]], w2 = [["in"]], P2 = [["do"]], I2 = [["ascending"]], C2 = [["descending"]];
function St(e, t) {
  return T2(e.tokens, e.i, t);
}
function nt(e, t) {
  e.i += t.length;
}
function N2(e) {
  const t = { tokens: e, i: 0 }, r = bp(t);
  if (r == null)
    throw new br("Empty Plain expression");
  if (t.i < t.tokens.length) {
    const n = t.tokens.slice(t.i).map((a) => a.value).join(" ");
    throw new br(`Unexpected trailing tokens: ${n}`);
  }
  return r;
}
function Ke(e, t = 0) {
  return e.tokens[e.i + t];
}
function Fe(e) {
  return e.tokens[e.i++];
}
function DT(e, t, r) {
  const n = Ke(e);
  if (!n || n.type !== t || r != null) {
    const a = n ? `${n.type}:${n.value}` : "end of input";
    throw new br(`Expected ${t}, got ${a}`);
  }
  return Fe(e);
}
function bp(e) {
  const t = Ke(e);
  if (!t) return null;
  const r = St(e, A2);
  if (r && !R2(e, r))
    switch (nt(e, r), r.canonical) {
      case "IF":
        return j2(e);
      case "SHOW":
        return Y0(e);
      case "TOTAL OF":
      case "SUM OF":
        return Ss(e, { type: "sum", value: kt(e) });
      case "AVERAGE OF":
        return Ss(e, { type: "average", value: kt(e) });
      case "COUNT OF":
        return Ss(e, F2(e));
      case "FOR EACH":
        return $2(e);
    }
  if (t.type === "word" && D2(e)) {
    const n = M2(e), a = gp(e);
    return a.length > 0 ? { type: "show", value: n, modifiers: a } : n;
  }
  {
    const n = e.i;
    try {
      const a = vp(e);
      if (a != null && e.i >= e.tokens.length)
        return a;
    } catch {
    }
    e.i = n;
  }
  return Y0(e);
}
function R2(e, t) {
  return e.tokens.length - e.i - t.length <= 0 && t.length === 1;
}
function D2(e) {
  const t = Ke(e, 1);
  if (!t) return !1;
  if (t.type === "string" || t.type === "number" || t.type === "lparen" || t.type === "loom")
    return !0;
  if (t.type === "word") {
    const r = e.i;
    e.i += 1;
    const n = St(e, Bi);
    return e.i = r, n == null;
  }
  return !1;
}
function M2(e) {
  const t = Fe(e).value, r = [];
  for (; e.i < e.tokens.length; ) {
    const n = Ke(e);
    if (!n) break;
    if (n.type === "comma") {
      Fe(e);
      continue;
    }
    if (n.type === "rparen" || n.type === "operator" || n.type === "word" && St(e, Bi)) break;
    const a = kt(e);
    if (a == null) break;
    r.push(a);
  }
  return { type: "call", name: t, args: r };
}
function Y0(e) {
  const t = L2(e);
  if (t.length === 0) {
    const a = Ke(e), i = a ? `${a.type}:${a.value}` : "end of input";
    throw new br(`Expected a value, got ${i}`);
  }
  const r = gp(e);
  if (t.length > 1) {
    for (const u of r)
      if (u.type !== "joinedBy" && u.type !== "ifPresent")
        throw new br(
          `Multi-value SHOW supports only JOINED BY and IF PRESENT (got ${u.type})`
        );
    const a = r.some((u) => u.type === "joinedBy"), i = r.some((u) => u.type === "ifPresent");
    if (a && i)
      throw new br(
        "JOINED BY and IF PRESENT cannot be combined on the same SHOW"
      );
    return { type: "show", values: t, modifiers: r };
  }
  const n = t[0];
  return r.length === 0 && k2(n) ? { type: "show", value: n, modifiers: [] } : { type: "show", value: n, modifiers: r };
}
function L2(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const r = Ke(e);
    if (!r) break;
    if (r.type === "comma") {
      Fe(e);
      continue;
    }
    if (r.type === "rparen" || r.type === "operator" || r.type === "word" && St(e, Bi)) break;
    const n = kt(e);
    if (n == null) break;
    t.push(n);
  }
  return t;
}
function k2(e) {
  return e.type === "var" || e.type === "string" || e.type === "number" || e.type === "loom" || e.type === "group";
}
function gp(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const r = St(e, Bi);
    if (!r) break;
    switch (r.canonical) {
      case "AS": {
        nt(e, r), t.push({ type: "as", format: B2(e) });
        break;
      }
      case "WITH LABEL": {
        nt(e, r);
        let n = null;
        Ke(e) && Ke(e).type === "string" && (n = Fe(e).value), t.push({ type: "withLabel", label: n });
        break;
      }
      case "SORTED BY": {
        nt(e, r);
        const n = kt(e);
        let a = "asc";
        const i = St(e, C2);
        if (i)
          nt(e, i), a = "desc";
        else {
          const u = St(e, I2);
          u && nt(e, u);
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
        const n = Ke(e);
        if (!n || n.type !== "string")
          throw new br("JOINED BY expects a quoted string");
        Fe(e), t.push({ type: "joinedBy", sep: n.value });
        break;
      }
      case "WHERE":
      case "IF": {
        nt(e, r), t.push({ type: "where", condition: vp(e) });
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
function B2(e) {
  const t = Ke(e);
  if (t && t.type === "string")
    return Fe(e), { raw: t.value };
  const r = [];
  for (; r.length < 2; ) {
    const i = Ke(e);
    if (!i || i.type !== "word" || St(e, Bi)) break;
    r.push(Fe(e).value.toLowerCase());
  }
  if (r.length === 0)
    throw new br("AS requires a format type");
  const n = r[0], a = r[1];
  return a === "date" && _2.has(n) ? { type: "date", value: n } : a === "only" && (n === "year" || n === "month") ? { type: "date", value: n === "year" ? "y" : "m" } : d2.has(n) ? { type: n, value: a ?? null } : (a != null && e.i--, { type: n, value: null });
}
function j2(e) {
  const t = vp(e), r = St(e, O2);
  r && nt(e, r);
  const n = G0(e);
  let a = null;
  const i = St(e, S2);
  if (i) {
    nt(e, i);
    const u = St(e, x2);
    u && nt(e, u), a = G0(e);
  }
  return { type: "if", condition: t, thenBranch: n, elseBranch: a };
}
function G0(e) {
  return kt(e);
}
function F2(e) {
  return { type: "count", value: kt(e) };
}
function Ss(e, t) {
  const r = gp(e);
  return r.length === 0 ? t : { type: "show", value: t, modifiers: r };
}
function $2(e) {
  const t = Ke(e);
  if (!t || t.type !== "word")
    throw new br("FOR EACH expects an identifier");
  Fe(e);
  const r = St(e, w2);
  r && nt(e, r);
  const n = kt(e), a = St(e, P2);
  a && nt(e, a);
  const i = bp(e);
  return { type: "forEach", ident: t.value, list: n, body: i };
}
function vp(e) {
  return MT(e);
}
function MT(e) {
  let t = K0(e);
  for (; ; ) {
    const r = Ke(e);
    if (!r || r.type !== "operator" || r.value !== "|" && r.value !== "||") break;
    Fe(e);
    const n = K0(e);
    t = { type: "binop", op: "|", left: t, right: n };
  }
  return t;
}
function K0(e) {
  let t = jd(e);
  for (; ; ) {
    const r = Ke(e);
    if (!r || r.type !== "operator" || r.value !== "&" && r.value !== "&&") break;
    Fe(e);
    const n = jd(e);
    t = { type: "binop", op: "&", left: t, right: n };
  }
  return t;
}
function jd(e) {
  const t = Ke(e);
  if (t && t.type === "operator" && t.value === "!")
    return Fe(e), { type: "unop", op: "!", arg: jd(e) };
  if (t && t.type === "lparen") {
    Fe(e);
    const r = MT(e);
    return DT(e, "rparen"), { type: "group", inner: r };
  }
  return H2(e);
}
const U2 = /* @__PURE__ */ new Set(["=", "==", "!=", ">", "<", ">=", "<="]);
function H2(e) {
  const t = z0(e), r = Ke(e);
  if (r && r.type === "operator" && U2.has(r.value)) {
    Fe(e);
    const n = z0(e);
    return { type: "binop", op: r.value === "==" ? "=" : r.value, left: t, right: n };
  }
  return t;
}
function z0(e) {
  let t = V0(e);
  for (; ; ) {
    const r = Ke(e);
    if (!r || r.type !== "operator" || r.value !== "+" && r.value !== "-") break;
    Fe(e);
    const n = V0(e);
    t = { type: "binop", op: r.value, left: t, right: n };
  }
  return t;
}
function V0(e) {
  let t = kt(e);
  for (; ; ) {
    const r = Ke(e);
    if (!r || r.type !== "operator" || r.value !== "*" && r.value !== "/" && r.value !== "%") break;
    Fe(e);
    const n = kt(e);
    t = { type: "binop", op: r.value, left: t, right: n };
  }
  return t;
}
function kt(e) {
  const t = Ke(e);
  if (!t) return null;
  if (t.type === "lparen") {
    Fe(e);
    const r = bp(e);
    return DT(e, "rparen"), { type: "group", inner: r };
  }
  return t.type === "loom" ? (Fe(e), { type: "loom", value: t.value }) : t.type === "string" ? (Fe(e), { type: "string", value: t.value }) : t.type === "number" ? (Fe(e), { type: "number", value: t.value }) : t.type === "word" ? (Fe(e), { type: "var", path: t.value }) : null;
}
class LT extends Error {
}
function q2(e) {
  if (e == null) return "";
  const t = je(e);
  return tw(t);
}
function je(e) {
  switch (e.type) {
    case "loom": {
      const t = J2(e.value);
      return ew(t) ? `(${t})` : t;
    }
    case "var":
      return e.path;
    case "string":
      return $n(e.value);
    case "number":
      return String(e.value);
    case "group":
      return je(e.inner);
    case "binop":
      return `(${e.op} ${je(e.left)} ${je(e.right)})`;
    case "unop":
      return `(${e.op} ${je(e.arg)})`;
    case "show":
      return Y2(e);
    case "if":
      return K2(e);
    case "count":
      return z2(e);
    case "sum":
      return `(++ ${je(e.value)})`;
    case "average": {
      const t = je(e.value);
      return `(/ (++ ${t}) (++!! ${t}))`;
    }
    case "call":
      return W2(e);
    case "forEach":
      return V2(e);
    default:
      throw new LT(`Unknown node type: ${e.type}`);
  }
}
function W2(e) {
  if (e.args.length === 0) return e.name;
  const t = e.args.map(je).join(" ");
  return `(${e.name} ${t})`;
}
function Y2(e) {
  if (e.values)
    return G2(e);
  const t = Au(e.value), r = e.modifiers.some((o) => o.type === "sortedBy");
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
      const s = e.modifiers[o], c = Au(u.value), l = je(Mn(s.condition, c));
      if (u.type === "count")
        a = `(++!! ${l})`;
      else if (u.type === "sum")
        a = `(++ (? ${l} ${je(u.value)}))`;
      else {
        const f = je(u.value);
        a = `(/ (++ (? ${l} ${f})) (++!! ${l}))`;
      }
      i = o;
    }
  }
  a == null && (a = n ? t : je(e.value));
  for (let o = 0; o < e.modifiers.length; o++) {
    if (o === i) continue;
    const s = e.modifiers[o];
    switch (s.type) {
      case "where": {
        a = `(? ${je(Mn(s.condition, t))} ${a})`;
        break;
      }
      case "sortedBy": {
        const c = Q2(s.value);
        a = `(>> ${s.order === "desc" ? "-desc " : ""}-by=${c} ${a})`, n && (a = `(. ${$n(n)} ${a})`, n = null);
        break;
      }
      case "joinedBy":
        a = `(+: ${$n(s.sep)} ${a})`;
        break;
      case "as":
        a = `(# ${Z2(s.format)} ${a})`;
        break;
      case "withLabel": {
        a = `(# -label${s.label != null ? `=${$n(s.label)}` : ""} ${a})`;
        break;
      }
      default:
        throw new LT(`Unknown modifier type: ${s.type}`);
    }
  }
  return a;
}
function G2(e) {
  const t = e.values.map(je);
  if (e.modifiers.some((i) => i.type === "ifPresent"))
    return `(+? ${t.join(" ")})`;
  const n = e.modifiers.find((i) => i.type === "joinedBy"), a = n ? n.sep : "";
  return `(+: ${$n(a)} ${t.join(" ")})`;
}
function K2(e) {
  const t = je(e.condition), r = je(e.thenBranch);
  return e.elseBranch != null ? `(? ${t} ${r} ${je(e.elseBranch)})` : `(? ${t} ${r})`;
}
function z2(e) {
  return `(++!! ${je(e.value)})`;
}
function Au(e) {
  if (e == null) return null;
  if (e.type === "var") {
    const t = e.path.split(".");
    return t.length > 1 ? t.slice(0, -1).join(".") : e.path;
  }
  return e.type === "group" ? Au(e.inner) : e.type === "count" || e.type === "sum" || e.type === "average" ? Au(e.value) : null;
}
function Mn(e, t) {
  if (e == null || !t) return e;
  switch (e.type) {
    case "var": {
      const r = e.path;
      return r.startsWith(t + ".") || r === t || r.includes(".") || r === "true" || r === "false" || r === "null" || r.startsWith("@") || r.startsWith("$") ? e : { type: "var", path: `${t}.${r}` };
    }
    case "binop":
      return {
        ...e,
        left: Mn(e.left, t),
        right: Mn(e.right, t)
      };
    case "unop":
      return { ...e, arg: Mn(e.arg, t) };
    case "group":
      return { ...e, inner: Mn(e.inner, t) };
    default:
      return e;
  }
}
function V2(e) {
  const t = je(e.list), r = je(e.body).replace(
    new RegExp(`\\b${X2(e.ident)}\\b`, "g"),
    "$1"
  );
  return `(map ${t} ${$n(r)})`;
}
function X2(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Q2(e) {
  if (e.type === "var") {
    const t = e.path.split(".");
    return t[t.length - 1];
  }
  return e.type === "string" ? e.value : je(e);
}
function Z2(e) {
  if (e.raw != null) {
    const t = e.raw;
    return t.startsWith("-") ? t : `-${t}`;
  }
  return e.value != null ? `-${e.type}=${e.value}` : `-${e.type}`;
}
function $n(e) {
  return typeof e != "string" && (e = String(e)), e.includes("'") ? e.includes('"') ? `'${e.replace(/'/g, "\\'")}'` : `"${e}"` : `'${e}'`;
}
function J2(e) {
  return e.length >= 2 && e[0] === "{" && e[e.length - 1] === "}" ? e.slice(1, -1) : e;
}
function ew(e) {
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
function tw(e) {
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
class kT {
  /**
   * @param {Object|string} snippets - Same forms as LoomCore accepts
   *   (source string, object, or empty). Bodies written in Plain
   *   syntax are eagerly translated to Compact form at construction
   *   time so the evaluator never sees Plain syntax.
   * @param {Object} functions - Passed through to LoomCore unchanged.
   */
  constructor(t = {}, r = {}) {
    const n = this._prepareSnippets(t);
    this.core = new l2(n, r);
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
    const r = OT(t), n = {};
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
    const r = Rn(t, { "{": "}" });
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
      const r = N2(b2(t));
      return q2(r);
    } catch {
      return t;
    }
  }
}
function rw(e) {
  if (!Array.isArray(e)) return [[]];
  const t = [[]];
  for (const r of e)
    r.type === "divider" ? t.push([]) : t[t.length - 1].push(r);
  return t;
}
function Nn(e, t, r) {
  if (Array.isArray(e))
    return e.map((a) => Fd(a, t, r));
  if (!e || typeof e != "object") return e;
  const n = e.content;
  return Array.isArray(n) ? {
    ...e,
    content: n.map((a) => Fd(a, t, r))
  } : e;
}
function Fd(e, t, r) {
  if (!e || typeof e != "object") return e;
  const { type: n, content: a, text: i } = e;
  return n === "text" && typeof i == "string" ? {
    ...e,
    text: t.render(i, r)
  } : a && Array.isArray(a) ? {
    ...e,
    content: a.map((u) => Fd(u, t, r))
  } : e;
}
function X0(e, t, r, n) {
  const a = e?.doc ?? e;
  if (!a?.content) return Nn(a, t, r);
  const i = un(n, r), u = rw(a.content);
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
function nw(e = {}) {
  const {
    vars: t,
    engine: r = new kT(),
    sourceParam: n = "source",
    whereParam: a = "where"
  } = e;
  if (typeof t != "function")
    throw new Error("createLoomHandlers requires a vars function");
  return {
    content: (i, u) => {
      const o = t(i);
      if (!o) return null;
      const s = u.rawContent?.doc ?? u.rawContent, c = n ? u.properties?.[n] : null;
      if (!c) return Nn(s, r, o);
      const l = a ? u.properties?.[a] : null;
      if (l) {
        const f = un(c, o);
        if (Array.isArray(f)) {
          const h = f.filter(
            (p) => r.evaluateText(l, { ...o, ...p })
          );
          return X0(s, r, { ...o, [c]: h }, c);
        }
      }
      return X0(s, r, o, c);
    }
  };
}
const aw = [
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
function BT(e, t = {}) {
  return {
    title: t.title ?? e?.config?.name ?? "Academic Metrics",
    creator: t.creator ?? "Uniweb",
    subject: t.subject ?? "Academic metrics report"
  };
}
function iw(e, t = {}) {
  return {
    adapterOptions: BT(e, t)
  };
}
function uw(e, t = {}) {
  return {
    adapterOptions: {
      ...BT(e, t),
      paragraphStyles: t.paragraphStyles ?? aw,
      loadAsset: t.loadAsset
    }
  };
}
const ow = new kT();
function sw(e) {
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
const $d = {
  defaultLayout: "MetricsLayout",
  props: {},
  handlers: nw({
    engine: ow,
    vars: sw
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
      getOptions: (e, t) => iw(e, t)
    },
    docx: {
      extension: "docx",
      getOptions: (e, t) => uw(e, t)
    }
  }
}, jT = ar(null), Q0 = ar("");
function FT() {
  const e = /* @__PURE__ */ new WeakMap(), t = [];
  return {
    register(r, n, a, i = {}) {
      let u = e.get(r);
      u || (u = /* @__PURE__ */ new Map(), e.set(r, u), t.push(r)), u.set(n, { fragment: a, options: i });
    },
    getOutputs(r) {
      const n = [];
      for (const a of t) {
        const i = e.get(a);
        if (!i) continue;
        const u = i.get(r);
        u && n.push({ block: a, ...u });
      }
      return n;
    },
    clear() {
      t.length = 0;
    },
    // Reassigned by the provider so the compile pipeline can re-wrap
    // fragments with the same contexts they rendered under. Identity
    // function until the provider sets it.
    wrapWithProviders: (r) => r
  };
}
function $T({ children: e, basePath: t = "", store: r }) {
  const n = an(
    () => r || FT(),
    [r]
  ), a = t || "";
  return n.wrapWithProviders = (i) => wo(
    Q0.Provider,
    { value: a },
    i
  ), /* @__PURE__ */ I(jT.Provider, { value: n, children: /* @__PURE__ */ I(Q0.Provider, { value: a, children: e }) });
}
function ct(e, t, r, n = {}) {
  const a = zt(jT);
  if (!a) {
    process.env.NODE_ENV !== "production" && console.warn(
      "useDocumentOutput was called outside of a <DocumentProvider>. Document output will not be registered."
    );
    return;
  }
  a.register(e, t, r, n);
}
const cw = /* @__PURE__ */ new Set([
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
function UT(e) {
  return e >= 55296 && e <= 57343;
}
function lw(e) {
  return e >= 56320 && e <= 57343;
}
function fw(e, t) {
  return (e - 55296) * 1024 + 9216 + t;
}
function HT(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function qT(e) {
  return e >= 64976 && e <= 65007 || cw.has(e);
}
var U;
(function(e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(U || (U = {}));
const dw = 65536;
class hw {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = dw, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
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
      if (lw(r))
        return this.pos++, this._addGap(), fw(t, r);
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
    return t === S.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, S.LINE_FEED) : t === S.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, UT(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === S.LINE_FEED || t === S.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    HT(t) ? this._err(U.controlCharacterInInputStream) : qT(t) && this._err(U.noncharacterInInputStream);
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
function WT(e, t) {
  for (let r = e.attrs.length - 1; r >= 0; r--)
    if (e.attrs[r].name === t)
      return e.attrs[r].value;
  return null;
}
const pw = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ 'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), mw = /* @__PURE__ */ new Map([
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
function yw(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = mw.get(e)) !== null && t !== void 0 ? t : e;
}
var Ze;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(Ze || (Ze = {}));
const bw = 32;
var Lr;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(Lr || (Lr = {}));
function Ud(e) {
  return e >= Ze.ZERO && e <= Ze.NINE;
}
function gw(e) {
  return e >= Ze.UPPER_A && e <= Ze.UPPER_F || e >= Ze.LOWER_A && e <= Ze.LOWER_F;
}
function vw(e) {
  return e >= Ze.UPPER_A && e <= Ze.UPPER_Z || e >= Ze.LOWER_A && e <= Ze.LOWER_Z || Ud(e);
}
function Ew(e) {
  return e === Ze.EQUALS || vw(e);
}
var Ve;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(Ve || (Ve = {}));
var dr;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(dr || (dr = {}));
class Tw {
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
    return r >= t.length ? -1 : (t.charCodeAt(r) | bw) === Ze.LOWER_X ? (this.state = Ve.NumericHex, this.consumed += 1, this.stateNumericHex(t, r + 1)) : (this.state = Ve.NumericDecimal, this.stateNumericDecimal(t, r));
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
      if (Ud(a) || gw(a))
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
      if (Ud(a))
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
    return this.emitCodePoint(yw(this.result), this.consumed), this.errors && (t !== Ze.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
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
    let a = n[this.treeIndex], i = (a & Lr.VALUE_LENGTH) >> 14;
    for (; r < t.length; r++, this.excess++) {
      const u = t.charCodeAt(r);
      if (this.treeIndex = _w(n, a, this.treeIndex + Math.max(1, i), u), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === dr.Attribute && // We shouldn't have consumed any characters after the entity,
        (i === 0 || // And there should be no invalid characters.
        Ew(u)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (a = n[this.treeIndex], i = (a & Lr.VALUE_LENGTH) >> 14, i !== 0) {
        if (u === Ze.SEMI)
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
    const { result: r, decodeTree: n } = this, a = (n[r] & Lr.VALUE_LENGTH) >> 14;
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
    return this.emitCodePoint(r === 1 ? a[t] & ~Lr.VALUE_LENGTH : a[t + 1], n), r === 3 && this.emitCodePoint(a[t + 2], n), n;
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
function _w(e, t, r, n) {
  const a = (t & Lr.BRANCH_LENGTH) >> 7, i = t & Lr.JUMP_TABLE;
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
var z;
(function(e) {
  e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(z || (z = {}));
var on;
(function(e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(on || (on = {}));
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
const Aw = /* @__PURE__ */ new Map([
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
function Io(e) {
  var t;
  return (t = Aw.get(e)) !== null && t !== void 0 ? t : d.UNKNOWN;
}
const V = d, Ow = {
  [z.HTML]: /* @__PURE__ */ new Set([
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
  [z.MATHML]: /* @__PURE__ */ new Set([V.MI, V.MO, V.MN, V.MS, V.MTEXT, V.ANNOTATION_XML]),
  [z.SVG]: /* @__PURE__ */ new Set([V.TITLE, V.FOREIGN_OBJECT, V.DESC]),
  [z.XLINK]: /* @__PURE__ */ new Set(),
  [z.XML]: /* @__PURE__ */ new Set(),
  [z.XMLNS]: /* @__PURE__ */ new Set()
}, Hd = /* @__PURE__ */ new Set([V.H1, V.H2, V.H3, V.H4, V.H5, V.H6]);
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
function Sw(e) {
  return e >= S.DIGIT_0 && e <= S.DIGIT_9;
}
function Fa(e) {
  return e >= S.LATIN_CAPITAL_A && e <= S.LATIN_CAPITAL_Z;
}
function xw(e) {
  return e >= S.LATIN_SMALL_A && e <= S.LATIN_SMALL_Z;
}
function Cr(e) {
  return xw(e) || Fa(e);
}
function Z0(e) {
  return Cr(e) || Sw(e);
}
function Qi(e) {
  return e + 32;
}
function YT(e) {
  return e === S.SPACE || e === S.LINE_FEED || e === S.TABULATION || e === S.FORM_FEED;
}
function J0(e) {
  return YT(e) || e === S.SOLIDUS || e === S.GREATER_THAN_SIGN;
}
function ww(e) {
  return e === S.NULL ? U.nullCharacterReference : e > 1114111 ? U.characterReferenceOutsideUnicodeRange : UT(e) ? U.surrogateCharacterReference : qT(e) ? U.noncharacterCharacterReference : HT(e) || e === S.CARRIAGE_RETURN ? U.controlCharacterReference : null;
}
class Pw {
  constructor(t, r) {
    this.options = t, this.handler = r, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = x.DATA, this.returnState = x.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new hw(r), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new Tw(pw, (n, a) => {
      this.preprocessor.pos = this.entityStartPos + a - 1, this._flushCodePointConsumedAsCharacterReference(n);
    }, r.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(U.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (n) => {
        this._err(U.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + n);
      },
      validateNumericCharacterReference: (n) => {
        const a = ww(n);
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
    if (WT(n, this.currentAttr.name) === null) {
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
    this.prepareToken(t), t.tagID = Io(t.tagName), t.type === be.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(U.endTagWithAttributes), t.selfClosing && this._err(U.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
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
    const r = YT(t) ? be.WHITESPACE_CHARACTER : t === S.NULL ? be.NULL_CHARACTER : be.CHARACTER;
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
    if (Cr(t))
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
    if (Cr(t))
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
        r.tagName += String.fromCodePoint(Fa(t) ? Qi(t) : t);
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
    Cr(t) ? (this.state = x.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = x.RCDATA, this._stateRcdata(t));
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
    Cr(t) ? (this.state = x.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = x.RAWTEXT, this._stateRawtext(t));
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
    Cr(t) ? (this.state = x.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = x.SCRIPT_DATA, this._stateScriptData(t));
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
    t === S.SOLIDUS ? this.state = x.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : Cr(t) ? (this._emitChars("<"), this.state = x.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(t) {
    Cr(t) ? (this.state = x.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = x.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(mt.SCRIPT, !1) && J0(this.preprocessor.peek(mt.SCRIPT.length))) {
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
    if (this.preprocessor.startsWith(mt.SCRIPT, !1) && J0(this.preprocessor.peek(mt.SCRIPT.length))) {
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
        this.currentAttr.name += String.fromCodePoint(Fa(t) ? Qi(t) : t);
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
    if (Fa(t))
      this._createDoctypeToken(String.fromCharCode(Qi(t))), this.state = x.DOCTYPE_NAME;
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
        r.name += String.fromCodePoint(Fa(t) ? Qi(t) : t);
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
    t === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(S.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && Z0(this.preprocessor.peek(1)) ? x.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    Z0(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === S.SEMICOLON && this._err(U.unknownNamedCharacterReference), this.state = this.returnState, this._callState(t));
  }
}
const GT = /* @__PURE__ */ new Set([d.DD, d.DT, d.LI, d.OPTGROUP, d.OPTION, d.P, d.RB, d.RP, d.RT, d.RTC]), em = /* @__PURE__ */ new Set([
  ...GT,
  d.CAPTION,
  d.COLGROUP,
  d.TBODY,
  d.TD,
  d.TFOOT,
  d.TH,
  d.THEAD,
  d.TR
]), Ou = /* @__PURE__ */ new Set([
  d.APPLET,
  d.CAPTION,
  d.HTML,
  d.MARQUEE,
  d.OBJECT,
  d.TABLE,
  d.TD,
  d.TEMPLATE,
  d.TH
]), Iw = /* @__PURE__ */ new Set([...Ou, d.OL, d.UL]), Cw = /* @__PURE__ */ new Set([...Ou, d.BUTTON]), tm = /* @__PURE__ */ new Set([d.ANNOTATION_XML, d.MI, d.MN, d.MO, d.MS, d.MTEXT]), rm = /* @__PURE__ */ new Set([d.DESC, d.FOREIGN_OBJECT, d.TITLE]), Nw = /* @__PURE__ */ new Set([d.TR, d.TEMPLATE, d.HTML]), Rw = /* @__PURE__ */ new Set([d.TBODY, d.TFOOT, d.THEAD, d.TEMPLATE, d.HTML]), Dw = /* @__PURE__ */ new Set([d.TABLE, d.TEMPLATE, d.HTML]), Mw = /* @__PURE__ */ new Set([d.TD, d.TH]);
class Lw {
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
    return this.currentTagId === d.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === z.HTML;
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
    while (r > 0 && this.treeAdapter.getNamespaceURI(this.items[r]) !== z.HTML);
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
    this.popUntilPopped(Hd, z.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(Mw, z.HTML);
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
    this.clearBackTo(Dw, z.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(Rw, z.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(Nw, z.HTML);
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
        case z.HTML: {
          if (a === t)
            return !0;
          if (r.has(a))
            return !1;
          break;
        }
        case z.SVG: {
          if (rm.has(a))
            return !1;
          break;
        }
        case z.MATHML: {
          if (tm.has(a))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInScope(t) {
    return this.hasInDynamicScope(t, Ou);
  }
  hasInListItemScope(t) {
    return this.hasInDynamicScope(t, Iw);
  }
  hasInButtonScope(t) {
    return this.hasInDynamicScope(t, Cw);
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t];
      switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
        case z.HTML: {
          if (Hd.has(r))
            return !0;
          if (Ou.has(r))
            return !1;
          break;
        }
        case z.SVG: {
          if (rm.has(r))
            return !1;
          break;
        }
        case z.MATHML: {
          if (tm.has(r))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInTableScope(t) {
    for (let r = this.stackTop; r >= 0; r--)
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === z.HTML)
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
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === z.HTML)
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
      if (this.treeAdapter.getNamespaceURI(this.items[r]) === z.HTML)
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
    for (; this.currentTagId !== void 0 && GT.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; this.currentTagId !== void 0 && em.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== void 0 && this.currentTagId !== t && em.has(this.currentTagId); )
      this.pop();
  }
}
const xs = 3;
var Qt;
(function(e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(Qt || (Qt = {}));
const nm = { type: Qt.Marker };
class kw {
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
      if (s.type === Qt.Marker)
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
    if (this.entries.length < xs)
      return;
    const r = this.treeAdapter.getAttrList(t), n = this._getNoahArkConditionCandidates(t, r);
    if (n.length < xs)
      return;
    const a = new Map(r.map((u) => [u.name, u.value]));
    let i = 0;
    for (let u = 0; u < n.length; u++) {
      const o = n[u];
      o.attrs.every((s) => a.get(s.name) === s.value) && (i += 1, i >= xs && this.entries.splice(o.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(nm);
  }
  pushElement(t, r) {
    this._ensureNoahArkCondition(t), this.entries.unshift({
      type: Qt.Element,
      element: t,
      token: r
    });
  }
  insertElementAfterBookmark(t, r) {
    const n = this.entries.indexOf(this.bookmark);
    this.entries.splice(n, 0, {
      type: Qt.Element,
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
    const t = this.entries.indexOf(nm);
    t === -1 ? this.entries.length = 0 : this.entries.splice(0, t + 1);
  }
  //Search
  getElementEntryInScopeWithTagName(t) {
    const r = this.entries.find((n) => n.type === Qt.Marker || this.treeAdapter.getTagName(n.element) === t);
    return r && r.type === Qt.Element ? r : null;
  }
  getElementEntry(t) {
    return this.entries.find((r) => r.type === Qt.Element && r.element === t);
  }
}
const Nr = {
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
      Nr.appendChild(e, i);
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
      if (Nr.isTextNode(r)) {
        r.value += t;
        return;
      }
    }
    Nr.appendChild(e, Nr.createTextNode(t));
  },
  insertTextBefore(e, t, r) {
    const n = e.childNodes[e.childNodes.indexOf(r) - 1];
    n && Nr.isTextNode(n) ? n.value += t : Nr.insertBefore(e, Nr.createTextNode(t), r);
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
}, KT = "html", Bw = "about:legacy-compat", jw = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", zT = [
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
], Fw = [
  ...zT,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], $w = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), VT = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], Uw = [
  ...VT,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function am(e, t) {
  return t.some((r) => e.startsWith(r));
}
function Hw(e) {
  return e.name === KT && e.publicId === null && (e.systemId === null || e.systemId === Bw);
}
function qw(e) {
  if (e.name !== KT)
    return Nt.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === jw)
    return Nt.QUIRKS;
  let { publicId: r } = e;
  if (r !== null) {
    if (r = r.toLowerCase(), $w.has(r))
      return Nt.QUIRKS;
    let n = t === null ? Fw : zT;
    if (am(r, n))
      return Nt.QUIRKS;
    if (n = t === null ? VT : Uw, am(r, n))
      return Nt.LIMITED_QUIRKS;
  }
  return Nt.NO_QUIRKS;
}
const im = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, Ww = "definitionurl", Yw = "definitionURL", Gw = new Map([
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
].map((e) => [e.toLowerCase(), e])), Kw = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: z.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: z.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: z.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: z.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: z.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: z.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: z.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: z.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: z.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: z.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: z.XMLNS }]
]), zw = new Map([
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
].map((e) => [e.toLowerCase(), e])), Vw = /* @__PURE__ */ new Set([
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
function Xw(e) {
  const t = e.tagID;
  return t === d.FONT && e.attrs.some(({ name: n }) => n === on.COLOR || n === on.SIZE || n === on.FACE) || Vw.has(t);
}
function XT(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === Ww) {
      e.attrs[t].name = Yw;
      break;
    }
}
function QT(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = Gw.get(e.attrs[t].name);
    r != null && (e.attrs[t].name = r);
  }
}
function Ep(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = Kw.get(e.attrs[t].name);
    r && (e.attrs[t].prefix = r.prefix, e.attrs[t].name = r.name, e.attrs[t].namespace = r.namespace);
  }
}
function Qw(e) {
  const t = zw.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = Io(e.tagName));
}
function Zw(e, t) {
  return t === z.MATHML && (e === d.MI || e === d.MO || e === d.MN || e === d.MS || e === d.MTEXT);
}
function Jw(e, t, r) {
  if (t === z.MATHML && e === d.ANNOTATION_XML) {
    for (let n = 0; n < r.length; n++)
      if (r[n].name === on.ENCODING) {
        const a = r[n].value.toLowerCase();
        return a === im.TEXT_HTML || a === im.APPLICATION_XML;
      }
  }
  return t === z.SVG && (e === d.FOREIGN_OBJECT || e === d.DESC || e === d.TITLE);
}
function eP(e, t, r, n) {
  return (!n || n === z.HTML) && Jw(e, t, r) || (!n || n === z.MATHML) && Zw(e, t);
}
const tP = "hidden", rP = 8, nP = 3;
var w;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(w || (w = {}));
const aP = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, ZT = /* @__PURE__ */ new Set([d.TABLE, d.TBODY, d.TFOOT, d.THEAD, d.TR]), um = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: Nr,
  onParseError: null
};
class iP {
  constructor(t, r, n = null, a = null) {
    this.fragmentContext = n, this.scriptHandler = a, this.currentToken = null, this.stopped = !1, this.insertionMode = w.INITIAL, this.originalInsertionMode = w.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...um,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = r ?? this.treeAdapter.createDocument(), this.tokenizer = new Pw(this.options, this), this.activeFormattingElements = new kw(this.treeAdapter), this.fragmentContextID = n ? Io(this.treeAdapter.getTagName(n)) : d.UNKNOWN, this._setContextModes(n ?? this.document, this.fragmentContextID), this.openElements = new Lw(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, r) {
    const n = new this(r);
    return n.tokenizer.write(t, !0), n.document;
  }
  static getFragmentParser(t, r) {
    const n = {
      ...um,
      ...r
    };
    t ?? (t = n.treeAdapter.createElement(L.TEMPLATE, z.HTML, []));
    const a = n.treeAdapter.createElement("documentmock", z.HTML, []), i = new this(n, a, t);
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
    const i = (a = t.location) !== null && a !== void 0 ? a : aP, u = {
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
    const n = t === this.document || t && this.treeAdapter.getNamespaceURI(t) === z.HTML;
    this.currentNotInHTML = !n, this.tokenizer.inForeignNode = !n && t !== void 0 && r !== void 0 && !this._isIntegrationPoint(r, t);
  }
  /** @protected */
  _switchToTextParsing(t, r) {
    this._insertElement(t, z.HTML), this.tokenizer.state = r, this.originalInsertionMode = this.insertionMode, this.insertionMode = w.TEXT;
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
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== z.HTML))
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
    const n = this.treeAdapter.createElement(t, z.HTML, []);
    this._attachElementToTree(n, null), this.openElements.push(n, r);
  }
  /** @protected */
  _insertTemplate(t) {
    const r = this.treeAdapter.createElement(t.tagName, z.HTML, t.attrs), n = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(r, n), this._attachElementToTree(r, t.location), this.openElements.push(r, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(L.HTML, z.HTML, []);
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
    return this.openElements.stackTop === 0 && this.fragmentContext ? (r = this.fragmentContext, n = this.fragmentContextID) : { current: r, currentTagId: n } = this.openElements, t.tagID === d.SVG && this.treeAdapter.getTagName(r) === L.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(r) === z.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (t.tagID === d.MGLYPH || t.tagID === d.MALIGNMARK) && n !== void 0 && !this._isIntegrationPoint(n, r, z.HTML)
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
    return eP(t, a, i, n);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const r = this.activeFormattingElements.entries.findIndex((a) => a.type === Qt.Marker || this.openElements.contains(a.element)), n = r === -1 ? t - 1 : r - 1;
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
    return ZT.has(t);
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
          if (this.treeAdapter.getNamespaceURI(r) === z.HTML)
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
    return Ow[n].has(r);
  }
  /** @internal */
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      LI(this, t);
      return;
    }
    switch (this.insertionMode) {
      case w.INITIAL: {
        wa(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        qa(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Wa(this, t);
        break;
      }
      case w.IN_HEAD: {
        Ya(this, t);
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
        e_(this, t);
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
        ws(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        u_(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        Su(this, t);
        break;
      }
      case w.AFTER_BODY: {
        xu(this, t);
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
      MI(this, t);
      return;
    }
    switch (this.insertionMode) {
      case w.INITIAL: {
        wa(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        qa(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Wa(this, t);
        break;
      }
      case w.IN_HEAD: {
        Ya(this, t);
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
        ws(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        Su(this, t);
        break;
      }
      case w.AFTER_BODY: {
        xu(this, t);
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
      qd(this, t);
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
        qd(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Pa(this, t);
        break;
      }
      case w.AFTER_BODY: {
        dP(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY:
      case w.AFTER_AFTER_FRAMESET: {
        hP(this, t);
        break;
      }
    }
  }
  /** @internal */
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case w.INITIAL: {
        pP(this, t);
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
        Pa(this, t);
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
    this.shouldProcessStartTagTokenInForeignContent(t) ? kI(this, t) : this._startTagOutsideForeignContent(t);
  }
  /** @protected */
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        wa(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        mP(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        bP(this, t);
        break;
      }
      case w.IN_HEAD: {
        Vt(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        EP(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        _P(this, t);
        break;
      }
      case w.IN_BODY: {
        lt(this, t);
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
        gI(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        Ap(this, t);
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
        TI(this, t);
        break;
      }
      case w.IN_SELECT: {
        c_(this, t);
        break;
      }
      case w.IN_SELECT_IN_TABLE: {
        AI(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        SI(this, t);
        break;
      }
      case w.AFTER_BODY: {
        wI(this, t);
        break;
      }
      case w.IN_FRAMESET: {
        PI(this, t);
        break;
      }
      case w.AFTER_FRAMESET: {
        CI(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        RI(this, t);
        break;
      }
      case w.AFTER_AFTER_FRAMESET: {
        DI(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? BI(this, t) : this._endTagOutsideForeignContent(t);
  }
  /** @protected */
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        wa(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        yP(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        gP(this, t);
        break;
      }
      case w.IN_HEAD: {
        vP(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        TP(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        AP(this, t);
        break;
      }
      case w.IN_BODY: {
        No(this, t);
        break;
      }
      case w.TEXT: {
        sI(this, t);
        break;
      }
      case w.IN_TABLE: {
        ri(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Pa(this, t);
        break;
      }
      case w.IN_CAPTION: {
        vI(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        EI(this, t);
        break;
      }
      case w.IN_TABLE_BODY: {
        Wd(this, t);
        break;
      }
      case w.IN_ROW: {
        s_(this, t);
        break;
      }
      case w.IN_CELL: {
        _I(this, t);
        break;
      }
      case w.IN_SELECT: {
        l_(this, t);
        break;
      }
      case w.IN_SELECT_IN_TABLE: {
        OI(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        xI(this, t);
        break;
      }
      case w.AFTER_BODY: {
        d_(this, t);
        break;
      }
      case w.IN_FRAMESET: {
        II(this, t);
        break;
      }
      case w.AFTER_FRAMESET: {
        NI(this, t);
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
        qa(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Wa(this, t);
        break;
      }
      case w.IN_HEAD: {
        Ya(this, t);
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
        a_(this, t);
        break;
      }
      case w.TEXT: {
        cI(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Pa(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        f_(this, t);
        break;
      }
      case w.AFTER_BODY:
      case w.IN_FRAMESET:
      case w.AFTER_FRAMESET:
      case w.AFTER_AFTER_BODY:
      case w.AFTER_AFTER_FRAMESET: {
        _p(this, t);
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
        JT(this, t);
        break;
      }
      case w.IN_TABLE:
      case w.IN_TABLE_BODY:
      case w.IN_ROW: {
        ws(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        i_(this, t);
        break;
      }
    }
  }
}
function uP(e, t) {
  let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return r ? e.openElements.contains(r.element) ? e.openElements.hasInScope(t.tagID) || (r = null) : (e.activeFormattingElements.removeEntry(r), r = null) : n_(e, t), r;
}
function oP(e, t) {
  let r = null, n = e.openElements.stackTop;
  for (; n >= 0; n--) {
    const a = e.openElements.items[n];
    if (a === t.element)
      break;
    e._isSpecialElement(a, e.openElements.tagIDs[n]) && (r = a);
  }
  return r || (e.openElements.shortenToLength(Math.max(n, 0)), e.activeFormattingElements.removeEntry(t)), r;
}
function sP(e, t, r) {
  let n = t, a = e.openElements.getCommonAncestor(t);
  for (let i = 0, u = a; u !== r; i++, u = a) {
    a = e.openElements.getCommonAncestor(u);
    const o = e.activeFormattingElements.getElementEntry(u), s = o && i >= nP;
    !o || s ? (s && e.activeFormattingElements.removeEntry(o), e.openElements.remove(u)) : (u = cP(e, o), n === t && (e.activeFormattingElements.bookmark = o), e.treeAdapter.detachNode(n), e.treeAdapter.appendChild(u, n), n = u);
  }
  return n;
}
function cP(e, t) {
  const r = e.treeAdapter.getNamespaceURI(t.element), n = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs);
  return e.openElements.replace(t.element, n), t.element = n, n;
}
function lP(e, t, r) {
  const n = e.treeAdapter.getTagName(t), a = Io(n);
  if (e._isElementCausesFosterParenting(a))
    e._fosterParentElement(r);
  else {
    const i = e.treeAdapter.getNamespaceURI(t);
    a === d.TEMPLATE && i === z.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, r);
  }
}
function fP(e, t, r) {
  const n = e.treeAdapter.getNamespaceURI(r.element), { token: a } = r, i = e.treeAdapter.createElement(a.tagName, n, a.attrs);
  e._adoptNodes(t, i), e.treeAdapter.appendChild(t, i), e.activeFormattingElements.insertElementAfterBookmark(i, a), e.activeFormattingElements.removeEntry(r), e.openElements.remove(r.element), e.openElements.insertAfter(t, i, a.tagID);
}
function Tp(e, t) {
  for (let r = 0; r < rP; r++) {
    const n = uP(e, t);
    if (!n)
      break;
    const a = oP(e, n);
    if (!a)
      break;
    e.activeFormattingElements.bookmark = n;
    const i = sP(e, a, n.element), u = e.openElements.getCommonAncestor(n.element);
    e.treeAdapter.detachNode(i), u && lP(e, u, i), fP(e, a, n);
  }
}
function qd(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function dP(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function hP(e, t) {
  e._appendCommentNode(t, e.document);
}
function _p(e, t) {
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
function pP(e, t) {
  e._setDocumentType(t);
  const r = t.forceQuirks ? Nt.QUIRKS : qw(t);
  Hw(t) || e._err(t, U.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, r), e.insertionMode = w.BEFORE_HTML;
}
function wa(e, t) {
  e._err(t, U.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, Nt.QUIRKS), e.insertionMode = w.BEFORE_HTML, e._processToken(t);
}
function mP(e, t) {
  t.tagID === d.HTML ? (e._insertElement(t, z.HTML), e.insertionMode = w.BEFORE_HEAD) : qa(e, t);
}
function yP(e, t) {
  const r = t.tagID;
  (r === d.HTML || r === d.HEAD || r === d.BODY || r === d.BR) && qa(e, t);
}
function qa(e, t) {
  e._insertFakeRootElement(), e.insertionMode = w.BEFORE_HEAD, e._processToken(t);
}
function bP(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.HEAD: {
      e._insertElement(t, z.HTML), e.headElement = e.openElements.current, e.insertionMode = w.IN_HEAD;
      break;
    }
    default:
      Wa(e, t);
  }
}
function gP(e, t) {
  const r = t.tagID;
  r === d.HEAD || r === d.BODY || r === d.HTML || r === d.BR ? Wa(e, t) : e._err(t, U.endTagWithoutMatchingOpenElement);
}
function Wa(e, t) {
  e._insertFakeElement(L.HEAD, d.HEAD), e.headElement = e.openElements.current, e.insertionMode = w.IN_HEAD, e._processToken(t);
}
function Vt(e, t) {
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
      e._appendElement(t, z.HTML), t.ackSelfClosing = !0;
      break;
    }
    case d.TITLE: {
      e._switchToTextParsing(t, bt.RCDATA);
      break;
    }
    case d.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(t, bt.RAWTEXT) : (e._insertElement(t, z.HTML), e.insertionMode = w.IN_HEAD_NO_SCRIPT);
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
      Ya(e, t);
  }
}
function vP(e, t) {
  switch (t.tagID) {
    case d.HEAD: {
      e.openElements.pop(), e.insertionMode = w.AFTER_HEAD;
      break;
    }
    case d.BODY:
    case d.BR:
    case d.HTML: {
      Ya(e, t);
      break;
    }
    case d.TEMPLATE: {
      vn(e, t);
      break;
    }
    default:
      e._err(t, U.endTagWithoutMatchingOpenElement);
  }
}
function vn(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== d.TEMPLATE && e._err(t, U.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(d.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, U.endTagWithoutMatchingOpenElement);
}
function Ya(e, t) {
  e.openElements.pop(), e.insertionMode = w.AFTER_HEAD, e._processToken(t);
}
function EP(e, t) {
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
      Vt(e, t);
      break;
    }
    case d.NOSCRIPT: {
      e._err(t, U.nestedNoscriptInHead);
      break;
    }
    default:
      Ga(e, t);
  }
}
function TP(e, t) {
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
      e._err(t, U.endTagWithoutMatchingOpenElement);
  }
}
function Ga(e, t) {
  const r = t.type === be.EOF ? U.openElementsLeftAfterEof : U.disallowedContentInNoscriptInHead;
  e._err(t, r), e.openElements.pop(), e.insertionMode = w.IN_HEAD, e._processToken(t);
}
function _P(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.BODY: {
      e._insertElement(t, z.HTML), e.framesetOk = !1, e.insertionMode = w.IN_BODY;
      break;
    }
    case d.FRAMESET: {
      e._insertElement(t, z.HTML), e.insertionMode = w.IN_FRAMESET;
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
      e._err(t, U.abandonedHeadElementChild), e.openElements.push(e.headElement, d.HEAD), Vt(e, t), e.openElements.remove(e.headElement);
      break;
    }
    case d.HEAD: {
      e._err(t, U.misplacedStartTagForHeadElement);
      break;
    }
    default:
      Ka(e, t);
  }
}
function AP(e, t) {
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
      e._err(t, U.endTagWithoutMatchingOpenElement);
  }
}
function Ka(e, t) {
  e._insertFakeElement(L.BODY, d.BODY), e.insertionMode = w.IN_BODY, Co(e, t);
}
function Co(e, t) {
  switch (t.type) {
    case be.CHARACTER: {
      e_(e, t);
      break;
    }
    case be.WHITESPACE_CHARACTER: {
      JT(e, t);
      break;
    }
    case be.COMMENT: {
      qd(e, t);
      break;
    }
    case be.START_TAG: {
      lt(e, t);
      break;
    }
    case be.END_TAG: {
      No(e, t);
      break;
    }
    case be.EOF: {
      a_(e, t);
      break;
    }
  }
}
function JT(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function e_(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function OP(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function SP(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  r && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(r, t.attrs));
}
function xP(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && r && (e.treeAdapter.detachNode(r), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, z.HTML), e.insertionMode = w.IN_FRAMESET);
}
function wP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, z.HTML);
}
function PP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && Hd.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, z.HTML);
}
function IP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, z.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function CP(e, t) {
  const r = e.openElements.tmplCount > 0;
  (!e.formElement || r) && (e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, z.HTML), r || (e.formElement = e.openElements.current));
}
function NP(e, t) {
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
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, z.HTML);
}
function RP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, z.HTML), e.tokenizer.state = bt.PLAINTEXT;
}
function DP(e, t) {
  e.openElements.hasInScope(d.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, z.HTML), e.framesetOk = !1;
}
function MP(e, t) {
  const r = e.activeFormattingElements.getElementEntryInScopeWithTagName(L.A);
  r && (Tp(e, t), e.openElements.remove(r.element), e.activeFormattingElements.removeEntry(r)), e._reconstructActiveFormattingElements(), e._insertElement(t, z.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function LP(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, z.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function kP(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(d.NOBR) && (Tp(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, z.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function BP(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, z.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function jP(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== Nt.QUIRKS && e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, z.HTML), e.framesetOk = !1, e.insertionMode = w.IN_TABLE;
}
function t_(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, z.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function r_(e) {
  const t = WT(e, on.TYPE);
  return t != null && t.toLowerCase() === tP;
}
function FP(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, z.HTML), r_(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function $P(e, t) {
  e._appendElement(t, z.HTML), t.ackSelfClosing = !0;
}
function UP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._appendElement(t, z.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function HP(e, t) {
  t.tagName = L.IMG, t.tagID = d.IMG, t_(e, t);
}
function qP(e, t) {
  e._insertElement(t, z.HTML), e.skipNextNewLine = !0, e.tokenizer.state = bt.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = w.TEXT;
}
function WP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, bt.RAWTEXT);
}
function YP(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, bt.RAWTEXT);
}
function om(e, t) {
  e._switchToTextParsing(t, bt.RAWTEXT);
}
function GP(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, z.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === w.IN_TABLE || e.insertionMode === w.IN_CAPTION || e.insertionMode === w.IN_TABLE_BODY || e.insertionMode === w.IN_ROW || e.insertionMode === w.IN_CELL ? w.IN_SELECT_IN_TABLE : w.IN_SELECT;
}
function KP(e, t) {
  e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, z.HTML);
}
function zP(e, t) {
  e.openElements.hasInScope(d.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, z.HTML);
}
function VP(e, t) {
  e.openElements.hasInScope(d.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(d.RTC), e._insertElement(t, z.HTML);
}
function XP(e, t) {
  e._reconstructActiveFormattingElements(), XT(t), Ep(t), t.selfClosing ? e._appendElement(t, z.MATHML) : e._insertElement(t, z.MATHML), t.ackSelfClosing = !0;
}
function QP(e, t) {
  e._reconstructActiveFormattingElements(), QT(t), Ep(t), t.selfClosing ? e._appendElement(t, z.SVG) : e._insertElement(t, z.SVG), t.ackSelfClosing = !0;
}
function sm(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, z.HTML);
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
      LP(e, t);
      break;
    }
    case d.A: {
      MP(e, t);
      break;
    }
    case d.H1:
    case d.H2:
    case d.H3:
    case d.H4:
    case d.H5:
    case d.H6: {
      PP(e, t);
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
      wP(e, t);
      break;
    }
    case d.LI:
    case d.DD:
    case d.DT: {
      NP(e, t);
      break;
    }
    case d.BR:
    case d.IMG:
    case d.WBR:
    case d.AREA:
    case d.EMBED:
    case d.KEYGEN: {
      t_(e, t);
      break;
    }
    case d.HR: {
      UP(e, t);
      break;
    }
    case d.RB:
    case d.RTC: {
      zP(e, t);
      break;
    }
    case d.RT:
    case d.RP: {
      VP(e, t);
      break;
    }
    case d.PRE:
    case d.LISTING: {
      IP(e, t);
      break;
    }
    case d.XMP: {
      WP(e, t);
      break;
    }
    case d.SVG: {
      QP(e, t);
      break;
    }
    case d.HTML: {
      OP(e, t);
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
      Vt(e, t);
      break;
    }
    case d.BODY: {
      SP(e, t);
      break;
    }
    case d.FORM: {
      CP(e, t);
      break;
    }
    case d.NOBR: {
      kP(e, t);
      break;
    }
    case d.MATH: {
      XP(e, t);
      break;
    }
    case d.TABLE: {
      jP(e, t);
      break;
    }
    case d.INPUT: {
      FP(e, t);
      break;
    }
    case d.PARAM:
    case d.TRACK:
    case d.SOURCE: {
      $P(e, t);
      break;
    }
    case d.IMAGE: {
      HP(e, t);
      break;
    }
    case d.BUTTON: {
      DP(e, t);
      break;
    }
    case d.APPLET:
    case d.OBJECT:
    case d.MARQUEE: {
      BP(e, t);
      break;
    }
    case d.IFRAME: {
      YP(e, t);
      break;
    }
    case d.SELECT: {
      GP(e, t);
      break;
    }
    case d.OPTION:
    case d.OPTGROUP: {
      KP(e, t);
      break;
    }
    case d.NOEMBED:
    case d.NOFRAMES: {
      om(e, t);
      break;
    }
    case d.FRAMESET: {
      xP(e, t);
      break;
    }
    case d.TEXTAREA: {
      qP(e, t);
      break;
    }
    case d.NOSCRIPT: {
      e.options.scriptingEnabled ? om(e, t) : sm(e, t);
      break;
    }
    case d.PLAINTEXT: {
      RP(e, t);
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
      sm(e, t);
  }
}
function ZP(e, t) {
  if (e.openElements.hasInScope(d.BODY) && (e.insertionMode = w.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const r = e.openElements.tryPeekProperlyNestedBodyElement();
    r && e._setEndLocation(r, t);
  }
}
function JP(e, t) {
  e.openElements.hasInScope(d.BODY) && (e.insertionMode = w.AFTER_BODY, d_(e, t));
}
function eI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r));
}
function tI(e) {
  const t = e.openElements.tmplCount > 0, { formElement: r } = e;
  t || (e.formElement = null), (r || t) && e.openElements.hasInScope(d.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(d.FORM) : r && e.openElements.remove(r));
}
function rI(e) {
  e.openElements.hasInButtonScope(d.P) || e._insertFakeElement(L.P, d.P), e._closePElement();
}
function nI(e) {
  e.openElements.hasInListItemScope(d.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(d.LI), e.openElements.popUntilTagNamePopped(d.LI));
}
function aI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.popUntilTagNamePopped(r));
}
function iI(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function uI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker());
}
function oI(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(L.BR, d.BR), e.openElements.pop(), e.framesetOk = !1;
}
function n_(e, t) {
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
      Tp(e, t);
      break;
    }
    case d.P: {
      rI(e);
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
      eI(e, t);
      break;
    }
    case d.LI: {
      nI(e);
      break;
    }
    case d.DD:
    case d.DT: {
      aI(e, t);
      break;
    }
    case d.H1:
    case d.H2:
    case d.H3:
    case d.H4:
    case d.H5:
    case d.H6: {
      iI(e);
      break;
    }
    case d.BR: {
      oI(e);
      break;
    }
    case d.BODY: {
      ZP(e, t);
      break;
    }
    case d.HTML: {
      JP(e, t);
      break;
    }
    case d.FORM: {
      tI(e);
      break;
    }
    case d.APPLET:
    case d.OBJECT:
    case d.MARQUEE: {
      uI(e, t);
      break;
    }
    case d.TEMPLATE: {
      vn(e, t);
      break;
    }
    default:
      n_(e, t);
  }
}
function a_(e, t) {
  e.tmplInsertionModeStack.length > 0 ? f_(e, t) : _p(e, t);
}
function sI(e, t) {
  var r;
  t.tagID === d.SCRIPT && ((r = e.scriptHandler) === null || r === void 0 || r.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function cI(e, t) {
  e._err(t, U.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function ws(e, t) {
  if (e.openElements.currentTagId !== void 0 && ZT.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = w.IN_TABLE_TEXT, t.type) {
      case be.CHARACTER: {
        u_(e, t);
        break;
      }
      case be.WHITESPACE_CHARACTER: {
        i_(e, t);
        break;
      }
    }
  else
    ji(e, t);
}
function lI(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, z.HTML), e.insertionMode = w.IN_CAPTION;
}
function fI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, z.HTML), e.insertionMode = w.IN_COLUMN_GROUP;
}
function dI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(L.COLGROUP, d.COLGROUP), e.insertionMode = w.IN_COLUMN_GROUP, Ap(e, t);
}
function hI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, z.HTML), e.insertionMode = w.IN_TABLE_BODY;
}
function pI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(L.TBODY, d.TBODY), e.insertionMode = w.IN_TABLE_BODY, Ro(e, t);
}
function mI(e, t) {
  e.openElements.hasInTableScope(d.TABLE) && (e.openElements.popUntilTagNamePopped(d.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function yI(e, t) {
  r_(t) ? e._appendElement(t, z.HTML) : ji(e, t), t.ackSelfClosing = !0;
}
function bI(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, z.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function Gn(e, t) {
  switch (t.tagID) {
    case d.TD:
    case d.TH:
    case d.TR: {
      pI(e, t);
      break;
    }
    case d.STYLE:
    case d.SCRIPT:
    case d.TEMPLATE: {
      Vt(e, t);
      break;
    }
    case d.COL: {
      dI(e, t);
      break;
    }
    case d.FORM: {
      bI(e, t);
      break;
    }
    case d.TABLE: {
      mI(e, t);
      break;
    }
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      hI(e, t);
      break;
    }
    case d.INPUT: {
      yI(e, t);
      break;
    }
    case d.CAPTION: {
      lI(e, t);
      break;
    }
    case d.COLGROUP: {
      fI(e, t);
      break;
    }
    default:
      ji(e, t);
  }
}
function ri(e, t) {
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
      ji(e, t);
  }
}
function ji(e, t) {
  const r = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, Co(e, t), e.fosterParentingEnabled = r;
}
function i_(e, t) {
  e.pendingCharacterTokens.push(t);
}
function u_(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function Pa(e, t) {
  let r = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; r < e.pendingCharacterTokens.length; r++)
      ji(e, e.pendingCharacterTokens[r]);
  else
    for (; r < e.pendingCharacterTokens.length; r++)
      e._insertCharacters(e.pendingCharacterTokens[r]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const o_ = /* @__PURE__ */ new Set([d.CAPTION, d.COL, d.COLGROUP, d.TBODY, d.TD, d.TFOOT, d.TH, d.THEAD, d.TR]);
function gI(e, t) {
  const r = t.tagID;
  o_.has(r) ? e.openElements.hasInTableScope(d.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = w.IN_TABLE, Gn(e, t)) : lt(e, t);
}
function vI(e, t) {
  const r = t.tagID;
  switch (r) {
    case d.CAPTION:
    case d.TABLE: {
      e.openElements.hasInTableScope(d.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = w.IN_TABLE, r === d.TABLE && ri(e, t));
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
function Ap(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.COL: {
      e._appendElement(t, z.HTML), t.ackSelfClosing = !0;
      break;
    }
    case d.TEMPLATE: {
      Vt(e, t);
      break;
    }
    default:
      Su(e, t);
  }
}
function EI(e, t) {
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
      Su(e, t);
  }
}
function Su(e, t) {
  e.openElements.currentTagId === d.COLGROUP && (e.openElements.pop(), e.insertionMode = w.IN_TABLE, e._processToken(t));
}
function Ro(e, t) {
  switch (t.tagID) {
    case d.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, z.HTML), e.insertionMode = w.IN_ROW;
      break;
    }
    case d.TH:
    case d.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(L.TR, d.TR), e.insertionMode = w.IN_ROW, Do(e, t);
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
function Wd(e, t) {
  const r = t.tagID;
  switch (t.tagID) {
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      e.openElements.hasInTableScope(r) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE);
      break;
    }
    case d.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE, ri(e, t));
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
      ri(e, t);
  }
}
function Do(e, t) {
  switch (t.tagID) {
    case d.TH:
    case d.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(t, z.HTML), e.insertionMode = w.IN_CELL, e.activeFormattingElements.insertMarker();
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
function s_(e, t) {
  switch (t.tagID) {
    case d.TR: {
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY);
      break;
    }
    case d.TABLE: {
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, Wd(e, t));
      break;
    }
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(d.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, Wd(e, t));
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
      ri(e, t);
  }
}
function TI(e, t) {
  const r = t.tagID;
  o_.has(r) ? (e.openElements.hasInTableScope(d.TD) || e.openElements.hasInTableScope(d.TH)) && (e._closeTableCell(), Do(e, t)) : lt(e, t);
}
function _I(e, t) {
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
      e.openElements.hasInTableScope(r) && (e._closeTableCell(), s_(e, t));
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
function c_(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.OPTION: {
      e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e._insertElement(t, z.HTML);
      break;
    }
    case d.OPTGROUP: {
      e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e.openElements.currentTagId === d.OPTGROUP && e.openElements.pop(), e._insertElement(t, z.HTML);
      break;
    }
    case d.HR: {
      e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e.openElements.currentTagId === d.OPTGROUP && e.openElements.pop(), e._appendElement(t, z.HTML), t.ackSelfClosing = !0;
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
      Vt(e, t);
      break;
    }
  }
}
function l_(e, t) {
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
function AI(e, t) {
  const r = t.tagID;
  r === d.CAPTION || r === d.TABLE || r === d.TBODY || r === d.TFOOT || r === d.THEAD || r === d.TR || r === d.TD || r === d.TH ? (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : c_(e, t);
}
function OI(e, t) {
  const r = t.tagID;
  r === d.CAPTION || r === d.TABLE || r === d.TBODY || r === d.TFOOT || r === d.THEAD || r === d.TR || r === d.TD || r === d.TH ? e.openElements.hasInTableScope(r) && (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : l_(e, t);
}
function SI(e, t) {
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
      Vt(e, t);
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
      e.tmplInsertionModeStack[0] = w.IN_COLUMN_GROUP, e.insertionMode = w.IN_COLUMN_GROUP, Ap(e, t);
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
      e.tmplInsertionModeStack[0] = w.IN_BODY, e.insertionMode = w.IN_BODY, lt(e, t);
  }
}
function xI(e, t) {
  t.tagID === d.TEMPLATE && vn(e, t);
}
function f_(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(d.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : _p(e, t);
}
function wI(e, t) {
  t.tagID === d.HTML ? lt(e, t) : xu(e, t);
}
function d_(e, t) {
  var r;
  if (t.tagID === d.HTML) {
    if (e.fragmentContext || (e.insertionMode = w.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === d.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const n = e.openElements.items[1];
      n && !(!((r = e.treeAdapter.getNodeSourceCodeLocation(n)) === null || r === void 0) && r.endTag) && e._setEndLocation(n, t);
    }
  } else
    xu(e, t);
}
function xu(e, t) {
  e.insertionMode = w.IN_BODY, Co(e, t);
}
function PI(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.FRAMESET: {
      e._insertElement(t, z.HTML);
      break;
    }
    case d.FRAME: {
      e._appendElement(t, z.HTML), t.ackSelfClosing = !0;
      break;
    }
    case d.NOFRAMES: {
      Vt(e, t);
      break;
    }
  }
}
function II(e, t) {
  t.tagID === d.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== d.FRAMESET && (e.insertionMode = w.AFTER_FRAMESET));
}
function CI(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.NOFRAMES: {
      Vt(e, t);
      break;
    }
  }
}
function NI(e, t) {
  t.tagID === d.HTML && (e.insertionMode = w.AFTER_AFTER_FRAMESET);
}
function RI(e, t) {
  t.tagID === d.HTML ? lt(e, t) : vu(e, t);
}
function vu(e, t) {
  e.insertionMode = w.IN_BODY, Co(e, t);
}
function DI(e, t) {
  switch (t.tagID) {
    case d.HTML: {
      lt(e, t);
      break;
    }
    case d.NOFRAMES: {
      Vt(e, t);
      break;
    }
  }
}
function MI(e, t) {
  t.chars = Me, e._insertCharacters(t);
}
function LI(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function h_(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== z.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function kI(e, t) {
  if (Xw(t))
    h_(e), e._startTagOutsideForeignContent(t);
  else {
    const r = e._getAdjustedCurrentElement(), n = e.treeAdapter.getNamespaceURI(r);
    n === z.MATHML ? XT(t) : n === z.SVG && (Qw(t), QT(t)), Ep(t), t.selfClosing ? e._appendElement(t, n) : e._insertElement(t, n), t.ackSelfClosing = !0;
  }
}
function BI(e, t) {
  if (t.tagID === d.P || t.tagID === d.BR) {
    h_(e), e._endTagOutsideForeignContent(t);
    return;
  }
  for (let r = e.openElements.stackTop; r > 0; r--) {
    const n = e.openElements.items[r];
    if (e.treeAdapter.getNamespaceURI(n) === z.HTML) {
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
function jI(e, t, r) {
  typeof e == "string" && (r = t, t = e, e = null);
  const n = iP.getFragmentParser(e, r);
  return n.tokenizer.write(t, !0), n.getFragment();
}
const FI = () => ({}), $I = () => !0, cm = (e) => {
  const t = parseInt(e, 10);
  return Number.isFinite(t) ? t : e;
}, UI = {
  "data-underline": { path: ["underline"], transform: FI },
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
    transform: cm
  },
  "data-floating-verticalposition-relative": {
    path: ["floating", "verticalPosition", "relative"]
  },
  "data-floating-verticalposition-align": {
    path: ["floating", "verticalPosition", "align"]
  },
  "data-floating-verticalposition-offset": {
    path: ["floating", "verticalPosition", "offset"],
    transform: cm
  },
  // Page breaks — maps to DocxParagraph({ pageBreakBefore: true })
  // in the adapter. Presence attribute: any truthy value counts.
  "data-page-break-before": { path: ["pageBreakBefore"], transform: $I },
  // Table of contents options — consumed by the tableOfContents node
  // type in the adapter (src/adapters/docx.js). See docx library's
  // ITableOfContentsOptions for the full shape; these are the three
  // useful ones and any additional data-toc-* attribute falls through
  // to the default rule below.
  "data-toc-title": { path: ["toc", "title"] },
  "data-toc-hyperlink": { path: ["toc", "hyperlink"] },
  "data-toc-heading-range": { path: ["toc", "headingRange"] }
};
function HI(e, t, r) {
  let n = e;
  for (let a = 0; a < t.length - 1; a++) {
    const i = t[a];
    (!n[i] || typeof n[i] != "object") && (n[i] = {}), n = n[i];
  }
  n[t[t.length - 1]] = r;
}
function qI(e) {
  const t = {};
  for (const { name: r, value: n } of e) {
    if (!r.startsWith("data-") || r === "data-type") continue;
    const a = UI[r];
    if (a) {
      const i = a.transform ? a.transform(n) : n;
      HI(t, a.path, i);
    } else {
      const i = r.slice(5);
      t[i] = n;
    }
  }
  return t;
}
function WI(e) {
  const t = jI(e);
  return Yd(t);
}
const YI = /* @__PURE__ */ new Set([
  "link",
  "meta",
  "script",
  "style",
  "base",
  "title",
  "noscript"
]);
function GI(e) {
  if (e.nodeName === "#text") {
    const o = e.value;
    return o && o.trim() ? { type: "text", content: o } : null;
  }
  if (!e.tagName) return null;
  const t = e.tagName.toLowerCase();
  if (YI.has(t)) return null;
  const n = KI(e, "data-type") || t;
  if (n === "emptyLine") return null;
  if (n === "contentWrapper")
    return Yd(e);
  const a = qI(e.attrs || []), i = Yd(e), u = { type: n, ...a };
  return n === "text" ? u.content = i.map((o) => o.content || "").join("") : i.length > 0 && (u.children = i), u;
}
function Yd(e) {
  const t = [], r = e.childNodes || [];
  for (const n of r) {
    const a = GI(n);
    a != null && (Array.isArray(a) ? t.push(...a) : t.push(a));
  }
  return t;
}
function KI(e, t) {
  if (!e.attrs) return null;
  for (const r of e.attrs)
    if (r.name === t) return r.value;
  return null;
}
const zI = {
  docx: { load: () => import("./docx-DnLMskId.js"), consumes: "docx", ir: !0 },
  xlsx: { load: () => import("./xlsx-kSRu1D58.js"), consumes: "xlsx", ir: !1 },
  typst: { load: () => import("./typst-EHnb7Rct.js"), consumes: "typst", ir: !0 },
  // LaTeX consumes its own input key. Foundations targeting both Typst
  // and LaTeX register under each format separately — same JSX, two
  // useDocumentOutput calls — so the adapters can diverge as the
  // formats need without forcing a shared input shape.
  latex: { load: () => import("./latex-CcOq0I0N.js"), consumes: "latex", ir: !0 },
  // Paged.js consumes 'html' — an input shape shared with EPUB below.
  // Foundations register once under 'html' and both adapters read it.
  pagedjs: { load: () => import("./pagedjs-C8Aj7-d3.js"), consumes: "html", ir: !1 },
  epub: { load: () => import("./epub-BF_KdKlQ.js"), consumes: "html", ir: !1 }
};
function Op(e) {
  const t = zI[e];
  return t ? {
    load: t.load,
    consumes: t.consumes || e,
    ir: t.ir !== !1
    // default to true for safety on under-specified entries
  } : null;
}
async function VI(e, t, r = {}) {
  const n = Op(e);
  if (!n)
    throw new Error(`Unsupported document format: "${e}"`);
  const a = await n.load(), i = a.compileDocx || a.compileXlsx || a.compileTypst || a.compileLatex || a.compilePagedjs || a.compileEpub || a.compilePdf;
  if (!i)
    throw new Error(
      `Format adapter "${e}" does not export a compile function.`
    );
  return i(t, r);
}
function XI(e, t) {
  const r = Op(t);
  if (!r)
    return { sections: [], header: null, footer: null, metadata: null };
  const n = e.getOutputs(r.consumes) || [];
  return r.ir ? QI(n, e) : r.consumes === "html" ? ZI(n, e) : JI(n);
}
function QI(e, t) {
  let r = null, n = null, a = null, i = !1, u = !1;
  const o = [], s = t.wrapWithProviders || ((c) => c);
  for (const { fragment: c, options: l } of e) {
    const f = l.role || "body";
    if (f === "metadata") {
      r = c;
      continue;
    }
    const h = pp(s(c)), p = WI(h);
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
function ZI(e, t) {
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
    const s = pp(r(i));
    a.push(s);
  }
  return { sections: a, metadata: n };
}
function JI(e) {
  return { sections: e.map(({ fragment: r }) => r).filter(Boolean) };
}
function eC(e, t) {
  if (typeof document > "u") return;
  const r = URL.createObjectURL(e), n = document.createElement("a");
  n.href = r, n.download = t, document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(r);
}
function tC(e, t, r = {}) {
  const { basePath: n } = r, a = FT();
  return pp(
    wo(
      $T,
      { store: a, basePath: n },
      e
    )
  ), rC(a, t), XI(a, t);
}
const lm = /* @__PURE__ */ new Set();
function rC(e, t) {
  const r = Op(t);
  if (!r) return;
  const n = r.consumes;
  if (!(lm.has(n) || (e.getOutputs && e.getOutputs(n) || []).length > 0) && (lm.add(n), typeof console < "u" && console.warn)) {
    const i = n === t ? `compileSubtree('${t}') found 0 registered sections. Did any section component call useDocumentOutput(block, '${t}', ...)?` : `compileSubtree('${t}') found 0 sections registered under input key '${n}'. Sections should call useDocumentOutput(block, '${n}', ...) (the output format '${t}' reads fragments registered under '${n}').`;
    console.warn(
      `@uniweb/press: ${i} Sections registered for a different input key do not cross-register.`
    );
  }
}
async function fm(e, t, r = {}) {
  const { basePath: n, adapterOptions: a = {} } = r, i = tC(e, t, { basePath: n });
  return VI(t, i, a);
}
async function nC(e, t = {}) {
  if (e !== null && typeof e == "object" && // React elements have a $$typeof symbol; duck-typing avoids needing
  // `import { isValidElement } from 'react'` (minor, but keeps this
  // file free of React imports it doesn't otherwise need).
  !!e.$$typeof) {
    const { format: A, ...b } = t;
    if (!A)
      throw new Error(
        "compileDocument: 'format' is required (tree mode)."
      );
    return fm(e, A, b);
  }
  const n = e, {
    format: a,
    foundation: i,
    rootPath: u,
    adapterOptions: o = {},
    basePath: s,
    loadAsset: c,
    ...l
  } = t, f = c ?? iC(n);
  if (!a)
    throw new Error(
      "compileDocument: 'format' is required (website mode)."
    );
  if (!n || !Array.isArray(n.pages))
    throw new Error(
      "compileDocument: first argument must be either a React element (tree mode) or a Website (website mode: expected object with a pages array)."
    );
  const h = aC(i), p = h?.[a];
  if (!p) {
    const A = h ? Object.keys(h).join(", ") || "(none)" : "(no outputs declaration)";
    throw new Error(
      `compileDocument: foundation has no outputs.${a} declaration. Declared outputs: ${A}. Add outputs[format] = { getOptions, extension?, via? } to the foundation's default export.`
    );
  }
  const g = p.via ?? a, y = p.getOptions ? await p.getOptions(n, { format: a, rootPath: u, loadAsset: f, ...l }) : {}, m = {
    ...y.adapterOptions,
    ...o
  }, E = uC(n, u), v = globalThis.uniweb?.childBlockRenderer;
  if (typeof v != "function")
    throw new Error(
      "compileDocument: globalThis.uniweb.childBlockRenderer is not installed. Either call initPrerender (headless) or mount a Uniweb runtime (browser) before compileDocument, or pass a pre-built tree (tree mode)."
    );
  const _ = v({ blocks: E });
  return fm(_, g, {
    basePath: s ?? n?.basePath,
    ...y,
    adapterOptions: m
  });
}
function aC(e) {
  return e ? e.outputs ? e.outputs : e.default?.capabilities?.outputs ? e.default.capabilities.outputs : e.default?.outputs ? e.default.outputs : null : null;
}
function iC(e) {
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
function uC(e, t) {
  const r = e.pages || [];
  return (t && typeof t == "string" ? r.filter(
    (a) => a.route === t || typeof a.route == "string" && a.route.startsWith(t + "/")
  ) : r).flatMap((a) => a.bodyBlocks || []);
}
function oC(e) {
  const t = (n, a) => ({
    type: "text",
    content: n,
    ...a
  }), r = (n, a = {}) => {
    const i = /<(\w+)(\s[^>]*)?>(.+?)<\/\1>/gs;
    let u = [], o = 0;
    if (!n) return [t("", a)];
    n.replace(i, (c, l, f, h, p) => {
      const g = n.slice(o, p);
      if (g && u.push(t(g, a)), l === "a" && f) {
        const E = f.match(/href="([^"]*)"/)?.[1];
        if (E) {
          u.push({
            type: "link",
            content: h,
            href: E
          }), o = p + c.length;
          return;
        }
      }
      const y = { ...a };
      (l === "strong" || l === "b") && (y.bold = !0), (l === "em" || l === "i") && (y.italics = !0), l === "u" && (y.underline = {}), u = u.concat(r(h, y)), o = p + c.length;
    });
    const s = n.slice(o);
    return s && u.push(t(s, a)), u;
  };
  return typeof e != "string" && (e = String(e ?? "")), r(e);
}
function p_({ children: e, bold: t, italics: r, underline: n, style: a, ...i }) {
  const u = { "data-type": "text" };
  return t && (u["data-bold"] = "true"), r && (u["data-italics"] = "true"), n && (u["data-underline"] = "true"), a && (u["data-style"] = a), /* @__PURE__ */ I("span", { ...u, ...i, children: e });
}
function Bt({ as: e = "p", data: t, children: r, ...n }) {
  if (t) {
    const a = oC(t);
    return /* @__PURE__ */ I(e, { "data-type": "paragraph", ...n, children: a.map(
      (i, u) => i.type === "link" ? /* @__PURE__ */ I(
        "a",
        {
          "data-type": "externalHyperlink",
          "data-link": i.href,
          href: i.href,
          children: /* @__PURE__ */ I("span", { "data-type": "text", "data-style": "Hyperlink", children: i.content })
        },
        u
      ) : /* @__PURE__ */ I(
        p_,
        {
          bold: i.bold,
          italics: i.italics,
          underline: !!i.underline,
          children: i.content
        },
        u
      )
    ) });
  }
  return /* @__PURE__ */ I(e, { "data-type": "paragraph", ...n, children: r });
}
const m_ = ar({ widths: null, borderColor: "cccccc" });
function ga({
  widths: e,
  borderColor: t = "cccccc",
  className: r,
  children: n,
  ...a
}) {
  return /* @__PURE__ */ I(m_.Provider, { value: { widths: e, borderColor: t }, children: /* @__PURE__ */ I("div", { "data-type": "table", className: r, ...a, children: n }) });
}
function rt({ header: e = !1, className: t, children: r, ...n }) {
  const a = Br.toArray(r).map(
    (i, u) => Lt(i) ? Ue(i, {
      _col: i.props._col ?? u,
      _header: i.props._header ?? e
    }) : i
  );
  return /* @__PURE__ */ I("div", { "data-type": "tableRow", className: t, ...n, children: a });
}
const Zi = { top: 80, bottom: 80, left: 120, right: 120 };
function he({
  _col: e = 0,
  _header: t = !1,
  width: r,
  emphasis: n = !1,
  borderBottom: a,
  className: i,
  style: u,
  children: o,
  ...s
}) {
  const { widths: c, borderColor: l } = zt(m_), f = r ?? c?.[e], h = {
    "data-type": "tableCell",
    "data-margins-top": Zi.top,
    "data-margins-bottom": Zi.bottom,
    "data-margins-left": Zi.left,
    "data-margins-right": Zi.right,
    "data-borders-top-style": "none",
    "data-borders-left-style": "none",
    "data-borders-right-style": "none",
    "data-borders-bottom-style": a ?? "single",
    "data-borders-bottom-size": t ? 6 : 4,
    "data-borders-bottom-color": l
  };
  f != null && (h["data-width-size"] = f, h["data-width-type"] = "pct");
  const p = f != null ? { flex: `${f} ${f} 0%`, minWidth: 0, ...u } : u;
  return /* @__PURE__ */ I("div", { className: i, style: p, ...h, ...s, children: typeof o == "string" || typeof o == "number" ? /* @__PURE__ */ I(Bt, { children: n || t ? /* @__PURE__ */ I(p_, { bold: !0, children: o }) : o }) : o });
}
function Mo() {
  const t = mp()?.activeWebsite;
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
function y_(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = y_(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function pe() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = y_(e)) && (n && (n += " "), n += t);
  return n;
}
function sC(e, t) {
  if (!e || typeof e != "string" || !e.includes("topic:")) return e;
  try {
    const n = new DOMParser().parseFromString(e, "text/html");
    return n.querySelectorAll('a[href^="topic:"]').forEach((i) => {
      const u = i.getAttribute("href");
      u && i.setAttribute("href", t.makeHref(u));
    }), n.body.innerHTML;
  } catch (r) {
    return console.warn("[SafeHtml] Error resolving topic links:", r), e;
  }
}
function cC({ value: e, className: t, as: r = "div", ...n }) {
  const { website: a, getRoutingComponents: i } = Mo(), u = i()?.SafeHtml, o = an(() => {
    if (!e) return "";
    const s = Array.isArray(e) ? e.join("") : e;
    return a ? sC(s, a) : s;
  }, [e, a]);
  return u ? /* @__PURE__ */ I($S, { fallback: null, children: /* @__PURE__ */ I(u, { value: o, className: t, ...n }) }) : /* @__PURE__ */ I(
    r,
    {
      className: t,
      dangerouslySetInnerHTML: { __html: o },
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
function Ji(e) {
  return { data: e, error: null, loading: !1 };
}
function pm(e, t = null) {
  return { data: t, error: e, loading: !1 };
}
function b_(e) {
  const t = mp()?.activeWebsite ?? null, r = e && t ? WS(e) : null, n = r ? t.dataStore.get(r) : null, [a, i] = ft(
    () => n ? Ji(n.data) : r ? hm() : dm()
  );
  return Et(() => {
    if (!r || !t) {
      i(dm());
      return;
    }
    const u = t.dataStore.get(r);
    i(u ? Ji(u.data) : hm());
    const o = t.dataStore.subscribe(r, () => {
      const c = t.dataStore.get(r);
      c && i(Ji(c.data));
    }), s = new AbortController();
    return t.fetcher.dispatch(e, { website: t, signal: s.signal }).then((c) => {
      if (!s.signal.aborted) {
        if (c?.error) {
          i(pm(c.error, c.data ?? null));
          return;
        }
        c && "data" in c && i(Ji(c.data));
      }
    }).catch((c) => {
      s.signal.aborted || i(pm(String(c?.message || c)));
    }), () => {
      s.abort(), o();
    };
  }, [r, t]), a;
}
function lC(e) {
  const t = mp()?.activeWebsite;
  if (!t) return null;
  const r = t.config?.collections?.[e];
  if (!r || typeof r != "object") return null;
  const n = r.queryable;
  return !n || typeof n != "object" ? null : n;
}
function fC(e) {
  return e + 1;
}
function sn(e, t) {
  const { website: r } = Mo(), [, n] = US(fC, 0), i = r.activePage?.state;
  Et(() => {
    if (i)
      return i.subscribe(e, n);
  }, [i, e]);
  const u = i?.has(e) ? i.get(e) : t;
  return [u, (s) => {
    i && i.set(e, typeof s == "function" ? s(u) : s);
  }];
}
const g_ = "academic-metrics/options", Sp = "all-members", v_ = Sp, dC = [
  "members",
  "publications-by-type",
  "publications-by-journal",
  "publications-by-year",
  "publications-list",
  "funding",
  "supervisions"
], hC = {
  members: "Members",
  "publications-by-type": "Publications by type",
  "publications-by-journal": "Publications by journal",
  "publications-by-year": "Publications by year",
  "publications-list": "Publications (list)",
  funding: "Funding",
  supervisions: "Supervisions"
};
function pC(e) {
  return hC[e] || e;
}
const mC = [
  { value: "apa", label: "APA (7th)" },
  { value: "mla", label: "MLA (9th)" },
  { value: "chicago-author-date", label: "Chicago (author–date)" },
  { value: "ieee", label: "IEEE" },
  { value: "vancouver", label: "Vancouver" },
  { value: "harvard", label: "Harvard" },
  { value: "nature", label: "Nature" }
], it = {
  slug: Sp,
  panelWhere: null,
  excludedSections: [],
  dateRange: { start: null, end: null },
  refereedOnly: !1,
  citationStyle: "apa"
};
function yC() {
  if (typeof window > "u") return null;
  try {
    const e = window.localStorage.getItem(g_);
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
function bC(e) {
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
    window.localStorage.setItem(g_, JSON.stringify(t));
  } catch {
  }
}
const mm = /* @__PURE__ */ new WeakSet(), ym = ["slug", "panelWhere", "excludedSections", "dateRange", "refereedOnly", "citationStyle"];
function gC(e) {
  if (!e || !e.state) return () => {
  };
  if (mm.has(e)) return () => {
  };
  mm.add(e);
  const t = yC() || it;
  for (const a of ym)
    e.state.has(a) || e.state.set(a, t[a]);
  const r = () => bC(e), n = ym.map((a) => e.state.subscribe(a, r));
  return () => n.forEach((a) => a());
}
function xp() {
  return sn("slug", it.slug);
}
function wp() {
  return sn("panelWhere", it.panelWhere);
}
function En(e) {
  const [t] = sn("excludedSections", it.excludedSections);
  return !t.includes(e);
}
function vC() {
  const [e, t] = sn("excludedSections", it.excludedSections);
  return [e, (n) => {
    const a = new Set(e);
    a.has(n) ? a.delete(n) : a.add(n), t([...a]);
  }];
}
function Fi() {
  const [e, t] = sn("dateRange", it.dateRange), [r, n] = sn("refereedOnly", it.refereedOnly), [a, i] = sn("citationStyle", it.citationStyle);
  return [{ dateRange: e, refereedOnly: r, citationStyle: a }, (o) => {
    "dateRange" in o && t(o.dateRange), "refereedOnly" in o && n(o.refereedOnly), "citationStyle" in o && i(o.citationStyle);
  }];
}
function EC(e, t, r) {
  if (t && typeof t == "object" && Object.keys(t).length > 0)
    return { where: t, source: "panel", label: "Custom filter" };
  if (e && e !== Sp) {
    const n = r.find((a) => a.slug === e);
    if (n?.where)
      return { where: n.where, source: "view", label: n.name || e, view: n };
  }
  return { where: null, source: null, label: null, view: null };
}
function Hr(e) {
  const [t] = xp(), [r] = wp(), n = an(
    () => Array.isArray(e?.data?.queries) ? e.data.queries : [],
    [e?.data?.queries]
  ), a = an(
    () => Array.isArray(e?.data?.members) ? e.data.members : [],
    [e?.data?.members]
  ), i = an(
    () => EC(t, r, n),
    [t, r, n]
  ), { data: u, loading: o } = b_(
    i.where ? { path: "/data/members.json", schema: "members", where: i.where } : null
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
function tH({ content: e, block: t }) {
  const { members: r, activeView: n, activeLabel: a, totalCount: i } = Hr(e), u = Array.isArray(e?.paragraphs) ? e.paragraphs : [], o = r.reduce(
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
  }), ct(
    t,
    "docx",
    /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ I(
        Bt,
        {
          as: "h1",
          data: l,
          "data-heading": "HEADING_1",
          "data-spacing-after": 240
        }
      ),
      /* @__PURE__ */ I(
        Bt,
        {
          data: f,
          "data-spacing-after": 240
        }
      ),
      u.map((h, p) => /* @__PURE__ */ I(Bt, { data: h, "data-spacing-after": 160 }, p))
    ] })
  ), /* @__PURE__ */ ee("section", { className: "cover", children: [
    /* @__PURE__ */ I("h1", { className: "cover-title", children: l }),
    /* @__PURE__ */ I("p", { className: "cover-subtitle", children: f }),
    u.length > 0 && /* @__PURE__ */ I("div", { className: "cover-narrative", children: u.map((h, p) => /* @__PURE__ */ I("p", { dangerouslySetInnerHTML: { __html: h } }, p)) }),
    a && /* @__PURE__ */ ee("p", { className: "cover-population", children: [
      "Population: ",
      /* @__PURE__ */ I("strong", { children: a }),
      " —",
      " ",
      r.length,
      " of ",
      i,
      " members"
    ] }),
    /* @__PURE__ */ ee("div", { className: "cover-meta", role: "list", children: [
      /* @__PURE__ */ I(eu, { label: "Members", value: r.length }),
      /* @__PURE__ */ I(eu, { label: "Publications", value: o }),
      /* @__PURE__ */ I(eu, { label: "Funding", value: TC(s) }),
      /* @__PURE__ */ I(eu, { label: "Supervisions", value: c })
    ] })
  ] });
}
function eu({ label: e, value: t }) {
  return /* @__PURE__ */ ee("div", { role: "listitem", children: [
    /* @__PURE__ */ I("span", { className: "cover-meta-label", children: e }),
    /* @__PURE__ */ I("span", { className: "cover-meta-value", children: t })
  ] });
}
function TC(e) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(e);
}
var tu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xe(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ps, bm;
function Tt() {
  if (bm) return Ps;
  bm = 1;
  var e = Array.isArray;
  return Ps = e, Ps;
}
var Is, gm;
function E_() {
  if (gm) return Is;
  gm = 1;
  var e = typeof tu == "object" && tu && tu.Object === Object && tu;
  return Is = e, Is;
}
var Cs, vm;
function ur() {
  if (vm) return Cs;
  vm = 1;
  var e = E_(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return Cs = r, Cs;
}
var Ns, Em;
function $i() {
  if (Em) return Ns;
  Em = 1;
  var e = ur(), t = e.Symbol;
  return Ns = t, Ns;
}
var Rs, Tm;
function _C() {
  if (Tm) return Rs;
  Tm = 1;
  var e = $i(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, a = e ? e.toStringTag : void 0;
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
  return Rs = i, Rs;
}
var Ds, _m;
function AC() {
  if (_m) return Ds;
  _m = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return Ds = r, Ds;
}
var Ms, Am;
function Sr() {
  if (Am) return Ms;
  Am = 1;
  var e = $i(), t = _C(), r = AC(), n = "[object Null]", a = "[object Undefined]", i = e ? e.toStringTag : void 0;
  function u(o) {
    return o == null ? o === void 0 ? a : n : i && i in Object(o) ? t(o) : r(o);
  }
  return Ms = u, Ms;
}
var Ls, Om;
function xr() {
  if (Om) return Ls;
  Om = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return Ls = e, Ls;
}
var ks, Sm;
function va() {
  if (Sm) return ks;
  Sm = 1;
  var e = Sr(), t = xr(), r = "[object Symbol]";
  function n(a) {
    return typeof a == "symbol" || t(a) && e(a) == r;
  }
  return ks = n, ks;
}
var Bs, xm;
function Pp() {
  if (xm) return Bs;
  xm = 1;
  var e = Tt(), t = va(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function a(i, u) {
    if (e(i))
      return !1;
    var o = typeof i;
    return o == "number" || o == "symbol" || o == "boolean" || i == null || t(i) ? !0 : n.test(i) || !r.test(i) || u != null && i in Object(u);
  }
  return Bs = a, Bs;
}
var js, wm;
function qr() {
  if (wm) return js;
  wm = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return js = e, js;
}
var Fs, Pm;
function Ip() {
  if (Pm) return Fs;
  Pm = 1;
  var e = Sr(), t = qr(), r = "[object AsyncFunction]", n = "[object Function]", a = "[object GeneratorFunction]", i = "[object Proxy]";
  function u(o) {
    if (!t(o))
      return !1;
    var s = e(o);
    return s == n || s == a || s == r || s == i;
  }
  return Fs = u, Fs;
}
var $s, Im;
function OC() {
  if (Im) return $s;
  Im = 1;
  var e = ur(), t = e["__core-js_shared__"];
  return $s = t, $s;
}
var Us, Cm;
function SC() {
  if (Cm) return Us;
  Cm = 1;
  var e = OC(), t = (function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  })();
  function r(n) {
    return !!t && t in n;
  }
  return Us = r, Us;
}
var Hs, Nm;
function T_() {
  if (Nm) return Hs;
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
  return Hs = r, Hs;
}
var qs, Rm;
function xC() {
  if (Rm) return qs;
  Rm = 1;
  var e = Ip(), t = SC(), r = qr(), n = T_(), a = /[\\^$.*+?()[\]{}|]/g, i = /^\[object .+?Constructor\]$/, u = Function.prototype, o = Object.prototype, s = u.toString, c = o.hasOwnProperty, l = RegExp(
    "^" + s.call(c).replace(a, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function f(h) {
    if (!r(h) || t(h))
      return !1;
    var p = e(h) ? l : i;
    return p.test(n(h));
  }
  return qs = f, qs;
}
var Ws, Dm;
function wC() {
  if (Dm) return Ws;
  Dm = 1;
  function e(t, r) {
    return t?.[r];
  }
  return Ws = e, Ws;
}
var Ys, Mm;
function Tn() {
  if (Mm) return Ys;
  Mm = 1;
  var e = xC(), t = wC();
  function r(n, a) {
    var i = t(n, a);
    return e(i) ? i : void 0;
  }
  return Ys = r, Ys;
}
var Gs, Lm;
function Lo() {
  if (Lm) return Gs;
  Lm = 1;
  var e = Tn(), t = e(Object, "create");
  return Gs = t, Gs;
}
var Ks, km;
function PC() {
  if (km) return Ks;
  km = 1;
  var e = Lo();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Ks = t, Ks;
}
var zs, Bm;
function IC() {
  if (Bm) return zs;
  Bm = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return zs = e, zs;
}
var Vs, jm;
function CC() {
  if (jm) return Vs;
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
  return Vs = a, Vs;
}
var Xs, Fm;
function NC() {
  if (Fm) return Xs;
  Fm = 1;
  var e = Lo(), t = Object.prototype, r = t.hasOwnProperty;
  function n(a) {
    var i = this.__data__;
    return e ? i[a] !== void 0 : r.call(i, a);
  }
  return Xs = n, Xs;
}
var Qs, $m;
function RC() {
  if ($m) return Qs;
  $m = 1;
  var e = Lo(), t = "__lodash_hash_undefined__";
  function r(n, a) {
    var i = this.__data__;
    return this.size += this.has(n) ? 0 : 1, i[n] = e && a === void 0 ? t : a, this;
  }
  return Qs = r, Qs;
}
var Zs, Um;
function DC() {
  if (Um) return Zs;
  Um = 1;
  var e = PC(), t = IC(), r = CC(), n = NC(), a = RC();
  function i(u) {
    var o = -1, s = u == null ? 0 : u.length;
    for (this.clear(); ++o < s; ) {
      var c = u[o];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, Zs = i, Zs;
}
var Js, Hm;
function MC() {
  if (Hm) return Js;
  Hm = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return Js = e, Js;
}
var ec, qm;
function Cp() {
  if (qm) return ec;
  qm = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return ec = e, ec;
}
var tc, Wm;
function ko() {
  if (Wm) return tc;
  Wm = 1;
  var e = Cp();
  function t(r, n) {
    for (var a = r.length; a--; )
      if (e(r[a][0], n))
        return a;
    return -1;
  }
  return tc = t, tc;
}
var rc, Ym;
function LC() {
  if (Ym) return rc;
  Ym = 1;
  var e = ko(), t = Array.prototype, r = t.splice;
  function n(a) {
    var i = this.__data__, u = e(i, a);
    if (u < 0)
      return !1;
    var o = i.length - 1;
    return u == o ? i.pop() : r.call(i, u, 1), --this.size, !0;
  }
  return rc = n, rc;
}
var nc, Gm;
function kC() {
  if (Gm) return nc;
  Gm = 1;
  var e = ko();
  function t(r) {
    var n = this.__data__, a = e(n, r);
    return a < 0 ? void 0 : n[a][1];
  }
  return nc = t, nc;
}
var ac, Km;
function BC() {
  if (Km) return ac;
  Km = 1;
  var e = ko();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return ac = t, ac;
}
var ic, zm;
function jC() {
  if (zm) return ic;
  zm = 1;
  var e = ko();
  function t(r, n) {
    var a = this.__data__, i = e(a, r);
    return i < 0 ? (++this.size, a.push([r, n])) : a[i][1] = n, this;
  }
  return ic = t, ic;
}
var uc, Vm;
function Bo() {
  if (Vm) return uc;
  Vm = 1;
  var e = MC(), t = LC(), r = kC(), n = BC(), a = jC();
  function i(u) {
    var o = -1, s = u == null ? 0 : u.length;
    for (this.clear(); ++o < s; ) {
      var c = u[o];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, uc = i, uc;
}
var oc, Xm;
function Np() {
  if (Xm) return oc;
  Xm = 1;
  var e = Tn(), t = ur(), r = e(t, "Map");
  return oc = r, oc;
}
var sc, Qm;
function FC() {
  if (Qm) return sc;
  Qm = 1;
  var e = DC(), t = Bo(), r = Np();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return sc = n, sc;
}
var cc, Zm;
function $C() {
  if (Zm) return cc;
  Zm = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return cc = e, cc;
}
var lc, Jm;
function jo() {
  if (Jm) return lc;
  Jm = 1;
  var e = $C();
  function t(r, n) {
    var a = r.__data__;
    return e(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
  }
  return lc = t, lc;
}
var fc, ey;
function UC() {
  if (ey) return fc;
  ey = 1;
  var e = jo();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return fc = t, fc;
}
var dc, ty;
function HC() {
  if (ty) return dc;
  ty = 1;
  var e = jo();
  function t(r) {
    return e(this, r).get(r);
  }
  return dc = t, dc;
}
var hc, ry;
function qC() {
  if (ry) return hc;
  ry = 1;
  var e = jo();
  function t(r) {
    return e(this, r).has(r);
  }
  return hc = t, hc;
}
var pc, ny;
function WC() {
  if (ny) return pc;
  ny = 1;
  var e = jo();
  function t(r, n) {
    var a = e(this, r), i = a.size;
    return a.set(r, n), this.size += a.size == i ? 0 : 1, this;
  }
  return pc = t, pc;
}
var mc, ay;
function Rp() {
  if (ay) return mc;
  ay = 1;
  var e = FC(), t = UC(), r = HC(), n = qC(), a = WC();
  function i(u) {
    var o = -1, s = u == null ? 0 : u.length;
    for (this.clear(); ++o < s; ) {
      var c = u[o];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, mc = i, mc;
}
var yc, iy;
function __() {
  if (iy) return yc;
  iy = 1;
  var e = Rp(), t = "Expected a function";
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
  return r.Cache = e, yc = r, yc;
}
var bc, uy;
function YC() {
  if (uy) return bc;
  uy = 1;
  var e = __(), t = 500;
  function r(n) {
    var a = e(n, function(u) {
      return i.size === t && i.clear(), u;
    }), i = a.cache;
    return a;
  }
  return bc = r, bc;
}
var gc, oy;
function GC() {
  if (oy) return gc;
  oy = 1;
  var e = YC(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = e(function(a) {
    var i = [];
    return a.charCodeAt(0) === 46 && i.push(""), a.replace(t, function(u, o, s, c) {
      i.push(s ? c.replace(r, "$1") : o || u);
    }), i;
  });
  return gc = n, gc;
}
var vc, sy;
function Dp() {
  if (sy) return vc;
  sy = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length, i = Array(a); ++n < a; )
      i[n] = r(t[n], n, t);
    return i;
  }
  return vc = e, vc;
}
var Ec, cy;
function KC() {
  if (cy) return Ec;
  cy = 1;
  var e = $i(), t = Dp(), r = Tt(), n = va(), a = e ? e.prototype : void 0, i = a ? a.toString : void 0;
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
  return Ec = u, Ec;
}
var Tc, ly;
function A_() {
  if (ly) return Tc;
  ly = 1;
  var e = KC();
  function t(r) {
    return r == null ? "" : e(r);
  }
  return Tc = t, Tc;
}
var _c, fy;
function O_() {
  if (fy) return _c;
  fy = 1;
  var e = Tt(), t = Pp(), r = GC(), n = A_();
  function a(i, u) {
    return e(i) ? i : t(i, u) ? [i] : r(n(i));
  }
  return _c = a, _c;
}
var Ac, dy;
function Fo() {
  if (dy) return Ac;
  dy = 1;
  var e = va();
  function t(r) {
    if (typeof r == "string" || e(r))
      return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return Ac = t, Ac;
}
var Oc, hy;
function Mp() {
  if (hy) return Oc;
  hy = 1;
  var e = O_(), t = Fo();
  function r(n, a) {
    a = e(a, n);
    for (var i = 0, u = a.length; n != null && i < u; )
      n = n[t(a[i++])];
    return i && i == u ? n : void 0;
  }
  return Oc = r, Oc;
}
var Sc, py;
function S_() {
  if (py) return Sc;
  py = 1;
  var e = Mp();
  function t(r, n, a) {
    var i = r == null ? void 0 : e(r, n);
    return i === void 0 ? a : i;
  }
  return Sc = t, Sc;
}
var zC = S_();
const xt = /* @__PURE__ */ xe(zC);
var xc, my;
function VC() {
  if (my) return xc;
  my = 1;
  function e(t) {
    return t == null;
  }
  return xc = e, xc;
}
var XC = VC();
const me = /* @__PURE__ */ xe(XC);
var wc, yy;
function QC() {
  if (yy) return wc;
  yy = 1;
  var e = Sr(), t = Tt(), r = xr(), n = "[object String]";
  function a(i) {
    return typeof i == "string" || !t(i) && r(i) && e(i) == n;
  }
  return wc = a, wc;
}
var ZC = QC();
const hn = /* @__PURE__ */ xe(ZC);
var JC = Ip();
const de = /* @__PURE__ */ xe(JC);
var eN = qr();
const Ea = /* @__PURE__ */ xe(eN);
var ru = { exports: {} }, ve = {};
var by;
function tN() {
  if (by) return ve;
  by = 1;
  var e = /* @__PURE__ */ Symbol.for("react.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), n = /* @__PURE__ */ Symbol.for("react.strict_mode"), a = /* @__PURE__ */ Symbol.for("react.profiler"), i = /* @__PURE__ */ Symbol.for("react.provider"), u = /* @__PURE__ */ Symbol.for("react.context"), o = /* @__PURE__ */ Symbol.for("react.server_context"), s = /* @__PURE__ */ Symbol.for("react.forward_ref"), c = /* @__PURE__ */ Symbol.for("react.suspense"), l = /* @__PURE__ */ Symbol.for("react.suspense_list"), f = /* @__PURE__ */ Symbol.for("react.memo"), h = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.offscreen"), g;
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
  return ve.ContextConsumer = u, ve.ContextProvider = i, ve.Element = e, ve.ForwardRef = s, ve.Fragment = r, ve.Lazy = h, ve.Memo = f, ve.Portal = t, ve.Profiler = a, ve.StrictMode = n, ve.Suspense = c, ve.SuspenseList = l, ve.isAsyncMode = function() {
    return !1;
  }, ve.isConcurrentMode = function() {
    return !1;
  }, ve.isContextConsumer = function(m) {
    return y(m) === u;
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
    return typeof m == "string" || typeof m == "function" || m === r || m === a || m === n || m === c || m === l || m === p || typeof m == "object" && m !== null && (m.$$typeof === h || m.$$typeof === f || m.$$typeof === i || m.$$typeof === u || m.$$typeof === s || m.$$typeof === g || m.getModuleId !== void 0);
  }, ve.typeOf = y, ve;
}
var Ee = {};
var gy;
function rN() {
  return gy || (gy = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = /* @__PURE__ */ Symbol.for("react.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), n = /* @__PURE__ */ Symbol.for("react.strict_mode"), a = /* @__PURE__ */ Symbol.for("react.profiler"), i = /* @__PURE__ */ Symbol.for("react.provider"), u = /* @__PURE__ */ Symbol.for("react.context"), o = /* @__PURE__ */ Symbol.for("react.server_context"), s = /* @__PURE__ */ Symbol.for("react.forward_ref"), c = /* @__PURE__ */ Symbol.for("react.suspense"), l = /* @__PURE__ */ Symbol.for("react.suspense_list"), f = /* @__PURE__ */ Symbol.for("react.memo"), h = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.offscreen"), g = !1, y = !1, m = !1, E = !1, v = !1, _;
    _ = /* @__PURE__ */ Symbol.for("react.module.reference");
    function A(X) {
      return !!(typeof X == "string" || typeof X == "function" || X === r || X === a || v || X === n || X === c || X === l || E || X === p || g || y || m || typeof X == "object" && X !== null && (X.$$typeof === h || X.$$typeof === f || X.$$typeof === i || X.$$typeof === u || X.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      X.$$typeof === _ || X.getModuleId !== void 0));
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
                  case o:
                  case u:
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
    var T = u, O = i, P = e, N = s, j = r, D = h, R = f, B = t, F = a, $ = n, q = c, Y = l, Q = !1, te = !1;
    function k(X) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(X) {
      return te || (te = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function G(X) {
      return b(X) === u;
    }
    function Z(X) {
      return b(X) === i;
    }
    function ne(X) {
      return typeof X == "object" && X !== null && X.$$typeof === e;
    }
    function ue(X) {
      return b(X) === s;
    }
    function oe(X) {
      return b(X) === r;
    }
    function fe(X) {
      return b(X) === h;
    }
    function ce(X) {
      return b(X) === f;
    }
    function K(X) {
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
    Ee.ContextConsumer = T, Ee.ContextProvider = O, Ee.Element = P, Ee.ForwardRef = N, Ee.Fragment = j, Ee.Lazy = D, Ee.Memo = R, Ee.Portal = B, Ee.Profiler = F, Ee.StrictMode = $, Ee.Suspense = q, Ee.SuspenseList = Y, Ee.isAsyncMode = k, Ee.isConcurrentMode = W, Ee.isContextConsumer = G, Ee.isContextProvider = Z, Ee.isElement = ne, Ee.isForwardRef = ue, Ee.isFragment = oe, Ee.isLazy = fe, Ee.isMemo = ce, Ee.isPortal = K, Ee.isProfiler = re, Ee.isStrictMode = ie, Ee.isSuspense = M, Ee.isSuspenseList = ye, Ee.isValidElementType = A, Ee.typeOf = b;
  })()), Ee;
}
var vy;
function nN() {
  return vy || (vy = 1, process.env.NODE_ENV === "production" ? ru.exports = tN() : ru.exports = rN()), ru.exports;
}
var aN = nN(), Pc, Ey;
function x_() {
  if (Ey) return Pc;
  Ey = 1;
  var e = Sr(), t = xr(), r = "[object Number]";
  function n(a) {
    return typeof a == "number" || t(a) && e(a) == r;
  }
  return Pc = n, Pc;
}
var Ic, Ty;
function iN() {
  if (Ty) return Ic;
  Ty = 1;
  var e = x_();
  function t(r) {
    return e(r) && r != +r;
  }
  return Ic = t, Ic;
}
var uN = iN();
const Ui = /* @__PURE__ */ xe(uN);
var oN = x_();
const sN = /* @__PURE__ */ xe(oN);
var dt = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, en = function(t) {
  return hn(t) && t.indexOf("%") === t.length - 1;
}, J = function(t) {
  return sN(t) && !Ui(t);
}, cN = function(t) {
  return me(t);
}, Ge = function(t) {
  return J(t) || hn(t);
}, lN = 0, Hi = function(t) {
  var r = ++lN;
  return "".concat(t || "").concat(r);
}, ht = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!J(t) && !hn(t))
    return n;
  var i;
  if (en(t)) {
    var u = t.indexOf("%");
    i = r * parseFloat(t.slice(0, u)) / 100;
  } else
    i = +t;
  return Ui(i) && (i = n), a && i > r && (i = r), i;
}, Mr = function(t) {
  if (!t)
    return null;
  var r = Object.keys(t);
  return r && r.length ? t[r[0]] : null;
}, fN = function(t) {
  if (!Array.isArray(t))
    return !1;
  for (var r = t.length, n = {}, a = 0; a < r; a++)
    if (!n[t[a]])
      n[t[a]] = !0;
    else
      return !0;
  return !1;
}, Rr = function(t, r) {
  return J(t) && J(r) ? function(n) {
    return t + n * (r - t);
  } : function() {
    return r;
  };
};
function Gd(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : xt(n, t)) === r;
  });
}
var dN = function(t, r) {
  return J(t) && J(r) ? t - r : hn(t) && hn(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r));
};
function Un(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r]))
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function Kd(e) {
  "@babel/helpers - typeof";
  return Kd = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Kd(e);
}
var hN = ["viewBox", "children"], pN = [
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
], _y = ["points", "pathLength"], Cc = {
  svg: hN,
  polygon: _y,
  polyline: _y
}, Lp = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], wu = function(t, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var n = t;
  if (/* @__PURE__ */ Lt(t) && (n = t.props), !Ea(n))
    return null;
  var a = {};
  return Object.keys(n).forEach(function(i) {
    Lp.includes(i) && (a[i] = r || function(u) {
      return n[i](n, u);
    });
  }), a;
}, mN = function(t, r, n) {
  return function(a) {
    return t(r, n, a), null;
  };
}, pn = function(t, r, n) {
  if (!Ea(t) || Kd(t) !== "object")
    return null;
  var a = null;
  return Object.keys(t).forEach(function(i) {
    var u = t[i];
    Lp.includes(i) && typeof u == "function" && (a || (a = {}), a[i] = mN(u, r, n));
  }), a;
}, yN = ["children"], bN = ["children"];
function Ay(e, t) {
  if (e == null) return {};
  var r = gN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function gN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var Oy = {
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
}, gr = function(t) {
  return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
}, Sy = null, Nc = null, kp = function e(t) {
  if (t === Sy && Array.isArray(Nc))
    return Nc;
  var r = [];
  return Br.forEach(t, function(n) {
    me(n) || (aN.isFragment(n) ? r = r.concat(e(n.props.children)) : r.push(n));
  }), Nc = r, Sy = t, r;
};
function jt(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map(function(a) {
    return gr(a);
  }) : n = [gr(t)], kp(e).forEach(function(a) {
    var i = xt(a, "type.displayName") || xt(a, "type.name");
    n.indexOf(i) !== -1 && r.push(a);
  }), r;
}
function At(e, t) {
  var r = jt(e, t);
  return r && r[0];
}
var xy = function(t) {
  if (!t || !t.props)
    return !1;
  var r = t.props, n = r.width, a = r.height;
  return !(!J(n) || n <= 0 || !J(a) || a <= 0);
}, vN = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], EN = function(t) {
  return t && t.type && hn(t.type) && vN.indexOf(t.type) >= 0;
}, TN = function(t, r, n, a) {
  var i, u = (i = Cc?.[a]) !== null && i !== void 0 ? i : [];
  return r.startsWith("data-") || !de(t) && (a && u.includes(r) || pN.includes(r)) || n && Lp.includes(r);
}, le = function(t, r, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var a = t;
  if (/* @__PURE__ */ Lt(t) && (a = t.props), !Ea(a))
    return null;
  var i = {};
  return Object.keys(a).forEach(function(u) {
    var o;
    TN((o = a) === null || o === void 0 ? void 0 : o[u], u, r, n) && (i[u] = a[u]);
  }), i;
}, zd = function e(t, r) {
  if (t === r)
    return !0;
  var n = Br.count(t);
  if (n !== Br.count(r))
    return !1;
  if (n === 0)
    return !0;
  if (n === 1)
    return wy(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
  for (var a = 0; a < n; a++) {
    var i = t[a], u = r[a];
    if (Array.isArray(i) || Array.isArray(u)) {
      if (!e(i, u))
        return !1;
    } else if (!wy(i, u))
      return !1;
  }
  return !0;
}, wy = function(t, r) {
  if (me(t) && me(r))
    return !0;
  if (!me(t) && !me(r)) {
    var n = t.props || {}, a = n.children, i = Ay(n, yN), u = r.props || {}, o = u.children, s = Ay(u, bN);
    return a && o ? Un(i, s) && zd(a, o) : !a && !o ? Un(i, s) : !1;
  }
  return !1;
}, Py = function(t, r) {
  var n = [], a = {};
  return kp(t).forEach(function(i, u) {
    if (EN(i))
      n.push(i);
    else if (i) {
      var o = gr(i.type), s = r[o] || {}, c = s.handler, l = s.once;
      if (c && (!l || !a[o])) {
        var f = c(i, o, u);
        n.push(f), a[o] = !0;
      }
    }
  }), n;
}, _N = function(t) {
  var r = t && t.type;
  return r && Oy[r] ? Oy[r] : null;
}, AN = function(t, r) {
  return kp(r).indexOf(t);
}, ON = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Vd() {
  return Vd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Vd.apply(this, arguments);
}
function SN(e, t) {
  if (e == null) return {};
  var r = xN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function xN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Xd(e) {
  var t = e.children, r = e.width, n = e.height, a = e.viewBox, i = e.className, u = e.style, o = e.title, s = e.desc, c = SN(e, ON), l = a || {
    width: r,
    height: n,
    x: 0,
    y: 0
  }, f = pe("recharts-surface", i);
  return /* @__PURE__ */ C.createElement("svg", Vd({}, le(c, !0, "svg"), {
    className: f,
    width: r,
    height: n,
    style: u,
    viewBox: "".concat(l.x, " ").concat(l.y, " ").concat(l.width, " ").concat(l.height)
  }), /* @__PURE__ */ C.createElement("title", null, o), /* @__PURE__ */ C.createElement("desc", null, s), t);
}
var wN = ["children", "className"];
function Qd() {
  return Qd = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Qd.apply(this, arguments);
}
function PN(e, t) {
  if (e == null) return {};
  var r = IN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function IN(e, t) {
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
  var r = e.children, n = e.className, a = PN(e, wN), i = pe("recharts-layer", n);
  return /* @__PURE__ */ C.createElement("g", Qd({
    className: i
  }, le(a, !0), {
    ref: t
  }), r);
}), CN = process.env.NODE_ENV !== "production", Yt = function(t, r) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    a[i - 2] = arguments[i];
  if (CN && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var u = 0;
      console.warn(r.replace(/%s/g, function() {
        return a[u++];
      }));
    }
}, Rc, Iy;
function NN() {
  if (Iy) return Rc;
  Iy = 1;
  function e(t, r, n) {
    var a = -1, i = t.length;
    r < 0 && (r = -r > i ? 0 : i + r), n = n > i ? i : n, n < 0 && (n += i), i = r > n ? 0 : n - r >>> 0, r >>>= 0;
    for (var u = Array(i); ++a < i; )
      u[a] = t[a + r];
    return u;
  }
  return Rc = e, Rc;
}
var Dc, Cy;
function RN() {
  if (Cy) return Dc;
  Cy = 1;
  var e = NN();
  function t(r, n, a) {
    var i = r.length;
    return a = a === void 0 ? i : a, !n && a >= i ? r : e(r, n, a);
  }
  return Dc = t, Dc;
}
var Mc, Ny;
function w_() {
  if (Ny) return Mc;
  Ny = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", a = t + r + n, i = "\\ufe0e\\ufe0f", u = "\\u200d", o = RegExp("[" + u + e + a + i + "]");
  function s(c) {
    return o.test(c);
  }
  return Mc = s, Mc;
}
var Lc, Ry;
function DN() {
  if (Ry) return Lc;
  Ry = 1;
  function e(t) {
    return t.split("");
  }
  return Lc = e, Lc;
}
var kc, Dy;
function MN() {
  if (Dy) return kc;
  Dy = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", a = t + r + n, i = "\\ufe0e\\ufe0f", u = "[" + e + "]", o = "[" + a + "]", s = "\\ud83c[\\udffb-\\udfff]", c = "(?:" + o + "|" + s + ")", l = "[^" + e + "]", f = "(?:\\ud83c[\\udde6-\\uddff]){2}", h = "[\\ud800-\\udbff][\\udc00-\\udfff]", p = "\\u200d", g = c + "?", y = "[" + i + "]?", m = "(?:" + p + "(?:" + [l, f, h].join("|") + ")" + y + g + ")*", E = y + g + m, v = "(?:" + [l + o + "?", o, f, h, u].join("|") + ")", _ = RegExp(s + "(?=" + s + ")|" + v + E, "g");
  function A(b) {
    return b.match(_) || [];
  }
  return kc = A, kc;
}
var Bc, My;
function LN() {
  if (My) return Bc;
  My = 1;
  var e = DN(), t = w_(), r = MN();
  function n(a) {
    return t(a) ? r(a) : e(a);
  }
  return Bc = n, Bc;
}
var jc, Ly;
function kN() {
  if (Ly) return jc;
  Ly = 1;
  var e = RN(), t = w_(), r = LN(), n = A_();
  function a(i) {
    return function(u) {
      u = n(u);
      var o = t(u) ? r(u) : void 0, s = o ? o[0] : u.charAt(0), c = o ? e(o, 1).join("") : u.slice(1);
      return s[i]() + c;
    };
  }
  return jc = a, jc;
}
var Fc, ky;
function BN() {
  if (ky) return Fc;
  ky = 1;
  var e = kN(), t = e("toUpperCase");
  return Fc = t, Fc;
}
var jN = BN();
const $o = /* @__PURE__ */ xe(jN);
function Ce(e) {
  return function() {
    return e;
  };
}
const P_ = Math.cos, Pu = Math.sin, Xt = Math.sqrt, Iu = Math.PI, Uo = 2 * Iu, Zd = Math.PI, Jd = 2 * Zd, Qr = 1e-6, FN = Jd - Qr;
function I_(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function $N(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return I_;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let a = 1, i = n.length; a < i; ++a)
      this._ += Math.round(arguments[a] * r) / r + n[a];
  };
}
class UN {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? I_ : $N(t);
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
    else if (h > Qr) if (!(Math.abs(f * s - c * l) > Qr) || !i)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let p = n - u, g = a - o, y = s * s + c * c, m = p * p + g * g, E = Math.sqrt(y), v = Math.sqrt(h), _ = i * Math.tan((Zd - Math.acos((y + h - m) / (2 * E * v))) / 2), A = _ / v, b = _ / E;
      Math.abs(A - 1) > Qr && this._append`L${t + A * l},${r + A * f}`, this._append`A${i},${i},0,0,${+(f * p > l * g)},${this._x1 = t + b * s},${this._y1 = r + b * c}`;
    }
  }
  arc(t, r, n, a, i, u) {
    if (t = +t, r = +r, n = +n, u = !!u, n < 0) throw new Error(`negative radius: ${n}`);
    let o = n * Math.cos(a), s = n * Math.sin(a), c = t + o, l = r + s, f = 1 ^ u, h = u ? a - i : i - a;
    this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > Qr || Math.abs(this._y1 - l) > Qr) && this._append`L${c},${l}`, n && (h < 0 && (h = h % Jd + Jd), h > FN ? this._append`A${n},${n},0,1,${f},${t - o},${r - s}A${n},${n},0,1,${f},${this._x1 = c},${this._y1 = l}` : h > Qr && this._append`A${n},${n},0,${+(h >= Zd)},${f},${this._x1 = t + n * Math.cos(i)},${this._y1 = r + n * Math.sin(i)}`);
  }
  rect(t, r, n, a) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+a}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Bp(e) {
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
  }, () => new UN(t);
}
function jp(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
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
  return new C_(e);
}
function N_(e) {
  return e[0];
}
function R_(e) {
  return e[1];
}
function D_(e, t) {
  var r = Ce(!0), n = null, a = Ho, i = null, u = Bp(o);
  e = typeof e == "function" ? e : e === void 0 ? N_ : Ce(e), t = typeof t == "function" ? t : t === void 0 ? R_ : Ce(t);
  function o(s) {
    var c, l = (s = jp(s)).length, f, h = !1, p;
    for (n == null && (i = a(p = u())), c = 0; c <= l; ++c)
      !(c < l && r(f = s[c], c, s)) === h && ((h = !h) ? i.lineStart() : i.lineEnd()), h && i.point(+e(f, c, s), +t(f, c, s));
    if (p) return i = null, p + "" || null;
  }
  return o.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : Ce(+s), o) : e;
  }, o.y = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : Ce(+s), o) : t;
  }, o.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : Ce(!!s), o) : r;
  }, o.curve = function(s) {
    return arguments.length ? (a = s, n != null && (i = a(n)), o) : a;
  }, o.context = function(s) {
    return arguments.length ? (s == null ? n = i = null : i = a(n = s), o) : n;
  }, o;
}
function nu(e, t, r) {
  var n = null, a = Ce(!0), i = null, u = Ho, o = null, s = Bp(c);
  e = typeof e == "function" ? e : e === void 0 ? N_ : Ce(+e), t = typeof t == "function" ? t : Ce(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? R_ : Ce(+r);
  function c(f) {
    var h, p, g, y = (f = jp(f)).length, m, E = !1, v, _ = new Array(y), A = new Array(y);
    for (i == null && (o = u(v = s())), h = 0; h <= y; ++h) {
      if (!(h < y && a(m = f[h], h, f)) === E)
        if (E = !E)
          p = h, o.areaStart(), o.lineStart();
        else {
          for (o.lineEnd(), o.lineStart(), g = h - 1; g >= p; --g)
            o.point(_[g], A[g]);
          o.lineEnd(), o.areaEnd();
        }
      E && (_[h] = +e(m, h, f), A[h] = +t(m, h, f), o.point(n ? +n(m, h, f) : _[h], r ? +r(m, h, f) : A[h]));
    }
    if (v) return o = null, v + "" || null;
  }
  function l() {
    return D_().defined(a).curve(u).context(i);
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
    return arguments.length ? (u = f, i != null && (o = u(i)), c) : u;
  }, c.context = function(f) {
    return arguments.length ? (f == null ? i = o = null : o = u(i = f), c) : i;
  }, c;
}
class M_ {
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
function HN(e) {
  return new M_(e, !0);
}
function qN(e) {
  return new M_(e, !1);
}
const Fp = {
  draw(e, t) {
    const r = Xt(t / Iu);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, Uo);
  }
}, WN = {
  draw(e, t) {
    const r = Xt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, L_ = Xt(1 / 3), YN = L_ * 2, GN = {
  draw(e, t) {
    const r = Xt(t / YN), n = r * L_;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, KN = {
  draw(e, t) {
    const r = Xt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, zN = 0.8908130915292852, k_ = Pu(Iu / 10) / Pu(7 * Iu / 10), VN = Pu(Uo / 10) * k_, XN = -P_(Uo / 10) * k_, QN = {
  draw(e, t) {
    const r = Xt(t * zN), n = VN * r, a = XN * r;
    e.moveTo(0, -r), e.lineTo(n, a);
    for (let i = 1; i < 5; ++i) {
      const u = Uo * i / 5, o = P_(u), s = Pu(u);
      e.lineTo(s * r, -o * r), e.lineTo(o * n - s * a, s * n + o * a);
    }
    e.closePath();
  }
}, $c = Xt(3), ZN = {
  draw(e, t) {
    const r = -Xt(t / ($c * 3));
    e.moveTo(0, r * 2), e.lineTo(-$c * r, -r), e.lineTo($c * r, -r), e.closePath();
  }
}, Pt = -0.5, It = Xt(3) / 2, eh = 1 / Xt(12), JN = (eh / 2 + 1) * 3, e3 = {
  draw(e, t) {
    const r = Xt(t / JN), n = r / 2, a = r * eh, i = n, u = r * eh + r, o = -i, s = u;
    e.moveTo(n, a), e.lineTo(i, u), e.lineTo(o, s), e.lineTo(Pt * n - It * a, It * n + Pt * a), e.lineTo(Pt * i - It * u, It * i + Pt * u), e.lineTo(Pt * o - It * s, It * o + Pt * s), e.lineTo(Pt * n + It * a, Pt * a - It * n), e.lineTo(Pt * i + It * u, Pt * u - It * i), e.lineTo(Pt * o + It * s, Pt * s - It * o), e.closePath();
  }
};
function t3(e, t) {
  let r = null, n = Bp(a);
  e = typeof e == "function" ? e : Ce(e || Fp), t = typeof t == "function" ? t : Ce(t === void 0 ? 64 : +t);
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
function Cu() {
}
function Nu(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function B_(e) {
  this._context = e;
}
B_.prototype = {
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
        Nu(this, this._x1, this._y1);
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
        Nu(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function r3(e) {
  return new B_(e);
}
function j_(e) {
  this._context = e;
}
j_.prototype = {
  areaStart: Cu,
  areaEnd: Cu,
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
        Nu(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function n3(e) {
  return new j_(e);
}
function F_(e) {
  this._context = e;
}
F_.prototype = {
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
        Nu(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function a3(e) {
  return new F_(e);
}
function $_(e) {
  this._context = e;
}
$_.prototype = {
  areaStart: Cu,
  areaEnd: Cu,
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
function i3(e) {
  return new $_(e);
}
function By(e) {
  return e < 0 ? -1 : 1;
}
function jy(e, t, r) {
  var n = e._x1 - e._x0, a = t - e._x1, i = (e._y1 - e._y0) / (n || a < 0 && -0), u = (r - e._y1) / (a || n < 0 && -0), o = (i * a + u * n) / (n + a);
  return (By(i) + By(u)) * Math.min(Math.abs(i), Math.abs(u), 0.5 * Math.abs(o)) || 0;
}
function Fy(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function Uc(e, t, r) {
  var n = e._x0, a = e._y0, i = e._x1, u = e._y1, o = (i - n) / 3;
  e._context.bezierCurveTo(n + o, a + o * t, i - o, u - o * r, i, u);
}
function Ru(e) {
  this._context = e;
}
Ru.prototype = {
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
        Uc(this, this._t0, Fy(this, this._t0));
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
          this._point = 3, Uc(this, Fy(this, r = jy(this, e, t)), r);
          break;
        default:
          Uc(this, this._t0, r = jy(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function U_(e) {
  this._context = new H_(e);
}
(U_.prototype = Object.create(Ru.prototype)).point = function(e, t) {
  Ru.prototype.point.call(this, t, e);
};
function H_(e) {
  this._context = e;
}
H_.prototype = {
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
function u3(e) {
  return new Ru(e);
}
function o3(e) {
  return new U_(e);
}
function q_(e) {
  this._context = e;
}
q_.prototype = {
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
        for (var n = $y(e), a = $y(t), i = 0, u = 1; u < r; ++i, ++u)
          this._context.bezierCurveTo(n[0][i], a[0][i], n[1][i], a[1][i], e[u], t[u]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function $y(e) {
  var t, r = e.length - 1, n, a = new Array(r), i = new Array(r), u = new Array(r);
  for (a[0] = 0, i[0] = 2, u[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) a[t] = 1, i[t] = 4, u[t] = 4 * e[t] + 2 * e[t + 1];
  for (a[r - 1] = 2, i[r - 1] = 7, u[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = a[t] / i[t - 1], i[t] -= n, u[t] -= n * u[t - 1];
  for (a[r - 1] = u[r - 1] / i[r - 1], t = r - 2; t >= 0; --t) a[t] = (u[t] - a[t + 1]) / i[t];
  for (i[r - 1] = (e[r] + a[r - 1]) / 2, t = 0; t < r - 1; ++t) i[t] = 2 * e[t + 1] - a[t + 1];
  return [a, i];
}
function s3(e) {
  return new q_(e);
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
function c3(e) {
  return new qo(e, 0.5);
}
function l3(e) {
  return new qo(e, 0);
}
function f3(e) {
  return new qo(e, 1);
}
function Kn(e, t) {
  if ((u = e.length) > 1)
    for (var r = 1, n, a, i = e[t[0]], u, o = i.length; r < u; ++r)
      for (a = i, i = e[t[r]], n = 0; n < o; ++n)
        i[n][1] += i[n][0] = isNaN(a[n][1]) ? a[n][0] : a[n][1];
}
function th(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function d3(e, t) {
  return e[t];
}
function h3(e) {
  const t = [];
  return t.key = e, t;
}
function p3() {
  var e = Ce([]), t = th, r = Kn, n = d3;
  function a(i) {
    var u = Array.from(e.apply(this, arguments), h3), o, s = u.length, c = -1, l;
    for (const f of i)
      for (o = 0, ++c; o < s; ++o)
        (u[o][c] = [0, +n(f, u[o].key, c, i)]).data = f;
    for (o = 0, l = jp(t(u)); o < s; ++o)
      u[l[o]].index = o;
    return r(u, l), u;
  }
  return a.keys = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : Ce(Array.from(i)), a) : e;
  }, a.value = function(i) {
    return arguments.length ? (n = typeof i == "function" ? i : Ce(+i), a) : n;
  }, a.order = function(i) {
    return arguments.length ? (t = i == null ? th : typeof i == "function" ? i : Ce(Array.from(i)), a) : t;
  }, a.offset = function(i) {
    return arguments.length ? (r = i ?? Kn, a) : r;
  }, a;
}
function m3(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, a = 0, i = e[0].length, u; a < i; ++a) {
      for (u = r = 0; r < n; ++r) u += e[r][a][1] || 0;
      if (u) for (r = 0; r < n; ++r) e[r][a][1] /= u;
    }
    Kn(e, t);
  }
}
function y3(e, t) {
  if ((a = e.length) > 0) {
    for (var r = 0, n = e[t[0]], a, i = n.length; r < i; ++r) {
      for (var u = 0, o = 0; u < a; ++u) o += e[u][r][1] || 0;
      n[r][1] += n[r][0] = -o / 2;
    }
    Kn(e, t);
  }
}
function b3(e, t) {
  if (!(!((u = e.length) > 0) || !((i = (a = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, a, i, u; n < i; ++n) {
      for (var o = 0, s = 0, c = 0; o < u; ++o) {
        for (var l = e[t[o]], f = l[n][1] || 0, h = l[n - 1][1] || 0, p = (f - h) / 2, g = 0; g < o; ++g) {
          var y = e[t[g]], m = y[n][1] || 0, E = y[n - 1][1] || 0;
          p += m - E;
        }
        s += f, c += p * f;
      }
      a[n - 1][1] += a[n - 1][0] = r, s && (r -= c / s);
    }
    a[n - 1][1] += a[n - 1][0] = r, Kn(e, t);
  }
}
function ni(e) {
  "@babel/helpers - typeof";
  return ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ni(e);
}
var g3 = ["type", "size", "sizeType"];
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
function Uy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Hy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Uy(Object(r), !0).forEach(function(n) {
      v3(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Uy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function v3(e, t, r) {
  return t = E3(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function E3(e) {
  var t = T3(e, "string");
  return ni(t) == "symbol" ? t : t + "";
}
function T3(e, t) {
  if (ni(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _3(e, t) {
  if (e == null) return {};
  var r = A3(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function A3(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var W_ = {
  symbolCircle: Fp,
  symbolCross: WN,
  symbolDiamond: GN,
  symbolSquare: KN,
  symbolStar: QN,
  symbolTriangle: ZN,
  symbolWye: e3
}, O3 = Math.PI / 180, S3 = function(t) {
  var r = "symbol".concat($o(t));
  return W_[r] || Fp;
}, x3 = function(t, r, n) {
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
      var a = 18 * O3;
      return 1.25 * t * t * (Math.tan(a) - Math.tan(a * 2) * Math.pow(Math.tan(a), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, w3 = function(t, r) {
  W_["symbol".concat($o(t))] = r;
}, $p = function(t) {
  var r = t.type, n = r === void 0 ? "circle" : r, a = t.size, i = a === void 0 ? 64 : a, u = t.sizeType, o = u === void 0 ? "area" : u, s = _3(t, g3), c = Hy(Hy({}, s), {}, {
    type: n,
    size: i,
    sizeType: o
  }), l = function() {
    var m = S3(n), E = t3().type(m).size(x3(i, o, n));
    return E();
  }, f = c.className, h = c.cx, p = c.cy, g = le(c, !0);
  return h === +h && p === +p && i === +i ? /* @__PURE__ */ C.createElement("path", rh({}, g, {
    className: pe("recharts-symbols", f),
    transform: "translate(".concat(h, ", ").concat(p, ")"),
    d: l()
  })) : null;
};
$p.registerSymbol = w3;
function zn(e) {
  "@babel/helpers - typeof";
  return zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zn(e);
}
function nh() {
  return nh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, nh.apply(this, arguments);
}
function qy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function P3(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qy(Object(r), !0).forEach(function(n) {
      ai(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function I3(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function C3(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, G_(n.key), n);
  }
}
function N3(e, t, r) {
  return t && C3(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function R3(e, t, r) {
  return t = Du(t), D3(e, Y_() ? Reflect.construct(t, r || [], Du(e).constructor) : t.apply(e, r));
}
function D3(e, t) {
  if (t && (zn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return M3(e);
}
function M3(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Y_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Y_ = function() {
    return !!e;
  })();
}
function Du(e) {
  return Du = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Du(e);
}
function L3(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ah(e, t);
}
function ah(e, t) {
  return ah = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ah(e, t);
}
function ai(e, t, r) {
  return t = G_(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function G_(e) {
  var t = k3(e, "string");
  return zn(t) == "symbol" ? t : t + "";
}
function k3(e, t) {
  if (zn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (zn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ct = 32, Up = /* @__PURE__ */ (function(e) {
  function t() {
    return I3(this, t), R3(this, t, arguments);
  }
  return L3(t, e), N3(t, [{
    key: "renderIcon",
    value: (
      /**
       * Render the path of icon
       * @param {Object} data Data of each legend item
       * @return {String} Path element
       */
      function(n) {
        var a = this.props.inactiveColor, i = Ct / 2, u = Ct / 6, o = Ct / 3, s = n.inactive ? a : n.color;
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
            d: "M0,".concat(i, "h").concat(o, `
            A`).concat(u, ",").concat(u, ",0,1,1,").concat(2 * o, ",").concat(i, `
            H`).concat(Ct, "M").concat(2 * o, ",").concat(i, `
            A`).concat(u, ",").concat(u, ",0,1,1,").concat(o, ",").concat(i),
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
          var c = P3({}, n);
          return delete c.legendIcon, /* @__PURE__ */ C.cloneElement(n.legendIcon, c);
        }
        return /* @__PURE__ */ C.createElement($p, {
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
      var n = this, a = this.props, i = a.payload, u = a.iconSize, o = a.layout, s = a.formatter, c = a.inactiveColor, l = {
        x: 0,
        y: 0,
        width: Ct,
        height: Ct
      }, f = {
        display: o === "horizontal" ? "inline-block" : "block",
        marginRight: 10
      }, h = {
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 4
      };
      return i.map(function(p, g) {
        var y = p.formatter || s, m = pe(ai(ai({
          "recharts-legend-item": !0
        }, "legend-item-".concat(g), !0), "inactive", p.inactive));
        if (p.type === "none")
          return null;
        var E = de(p.value) ? null : p.value;
        Yt(
          !de(p.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var v = p.inactive ? c : p.color;
        return /* @__PURE__ */ C.createElement("li", nh({
          className: m,
          style: f,
          key: "legend-item-".concat(g)
        }, pn(n.props, p, g)), /* @__PURE__ */ C.createElement(Xd, {
          width: u,
          height: u,
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
})(ir);
ai(Up, "displayName", "Legend");
ai(Up, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Hc, Wy;
function B3() {
  if (Wy) return Hc;
  Wy = 1;
  var e = Bo();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return Hc = t, Hc;
}
var qc, Yy;
function j3() {
  if (Yy) return qc;
  Yy = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return qc = e, qc;
}
var Wc, Gy;
function F3() {
  if (Gy) return Wc;
  Gy = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return Wc = e, Wc;
}
var Yc, Ky;
function $3() {
  if (Ky) return Yc;
  Ky = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Yc = e, Yc;
}
var Gc, zy;
function U3() {
  if (zy) return Gc;
  zy = 1;
  var e = Bo(), t = Np(), r = Rp(), n = 200;
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
  return Gc = a, Gc;
}
var Kc, Vy;
function K_() {
  if (Vy) return Kc;
  Vy = 1;
  var e = Bo(), t = B3(), r = j3(), n = F3(), a = $3(), i = U3();
  function u(o) {
    var s = this.__data__ = new e(o);
    this.size = s.size;
  }
  return u.prototype.clear = t, u.prototype.delete = r, u.prototype.get = n, u.prototype.has = a, u.prototype.set = i, Kc = u, Kc;
}
var zc, Xy;
function H3() {
  if (Xy) return zc;
  Xy = 1;
  var e = "__lodash_hash_undefined__";
  function t(r) {
    return this.__data__.set(r, e), this;
  }
  return zc = t, zc;
}
var Vc, Qy;
function q3() {
  if (Qy) return Vc;
  Qy = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Vc = e, Vc;
}
var Xc, Zy;
function z_() {
  if (Zy) return Xc;
  Zy = 1;
  var e = Rp(), t = H3(), r = q3();
  function n(a) {
    var i = -1, u = a == null ? 0 : a.length;
    for (this.__data__ = new e(); ++i < u; )
      this.add(a[i]);
  }
  return n.prototype.add = n.prototype.push = t, n.prototype.has = r, Xc = n, Xc;
}
var Qc, Jy;
function V_() {
  if (Jy) return Qc;
  Jy = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length; ++n < a; )
      if (r(t[n], n, t))
        return !0;
    return !1;
  }
  return Qc = e, Qc;
}
var Zc, eb;
function X_() {
  if (eb) return Zc;
  eb = 1;
  function e(t, r) {
    return t.has(r);
  }
  return Zc = e, Zc;
}
var Jc, tb;
function Q_() {
  if (tb) return Jc;
  tb = 1;
  var e = z_(), t = V_(), r = X_(), n = 1, a = 2;
  function i(u, o, s, c, l, f) {
    var h = s & n, p = u.length, g = o.length;
    if (p != g && !(h && g > p))
      return !1;
    var y = f.get(u), m = f.get(o);
    if (y && m)
      return y == o && m == u;
    var E = -1, v = !0, _ = s & a ? new e() : void 0;
    for (f.set(u, o), f.set(o, u); ++E < p; ) {
      var A = u[E], b = o[E];
      if (c)
        var T = h ? c(b, A, E, o, u, f) : c(A, b, E, u, o, f);
      if (T !== void 0) {
        if (T)
          continue;
        v = !1;
        break;
      }
      if (_) {
        if (!t(o, function(O, P) {
          if (!r(_, P) && (A === O || l(A, O, s, c, f)))
            return _.push(P);
        })) {
          v = !1;
          break;
        }
      } else if (!(A === b || l(A, b, s, c, f))) {
        v = !1;
        break;
      }
    }
    return f.delete(u), f.delete(o), v;
  }
  return Jc = i, Jc;
}
var el, rb;
function W3() {
  if (rb) return el;
  rb = 1;
  var e = ur(), t = e.Uint8Array;
  return el = t, el;
}
var tl, nb;
function Y3() {
  if (nb) return tl;
  nb = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(a, i) {
      n[++r] = [i, a];
    }), n;
  }
  return tl = e, tl;
}
var rl, ab;
function Hp() {
  if (ab) return rl;
  ab = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(a) {
      n[++r] = a;
    }), n;
  }
  return rl = e, rl;
}
var nl, ib;
function G3() {
  if (ib) return nl;
  ib = 1;
  var e = $i(), t = W3(), r = Cp(), n = Q_(), a = Y3(), i = Hp(), u = 1, o = 2, s = "[object Boolean]", c = "[object Date]", l = "[object Error]", f = "[object Map]", h = "[object Number]", p = "[object RegExp]", g = "[object Set]", y = "[object String]", m = "[object Symbol]", E = "[object ArrayBuffer]", v = "[object DataView]", _ = e ? e.prototype : void 0, A = _ ? _.valueOf : void 0;
  function b(T, O, P, N, j, D, R) {
    switch (P) {
      case v:
        if (T.byteLength != O.byteLength || T.byteOffset != O.byteOffset)
          return !1;
        T = T.buffer, O = O.buffer;
      case E:
        return !(T.byteLength != O.byteLength || !D(new t(T), new t(O)));
      case s:
      case c:
      case h:
        return r(+T, +O);
      case l:
        return T.name == O.name && T.message == O.message;
      case p:
      case y:
        return T == O + "";
      case f:
        var B = a;
      case g:
        var F = N & u;
        if (B || (B = i), T.size != O.size && !F)
          return !1;
        var $ = R.get(T);
        if ($)
          return $ == O;
        N |= o, R.set(T, O);
        var q = n(B(T), B(O), N, j, D, R);
        return R.delete(T), q;
      case m:
        if (A)
          return A.call(T) == A.call(O);
    }
    return !1;
  }
  return nl = b, nl;
}
var al, ub;
function Z_() {
  if (ub) return al;
  ub = 1;
  function e(t, r) {
    for (var n = -1, a = r.length, i = t.length; ++n < a; )
      t[i + n] = r[n];
    return t;
  }
  return al = e, al;
}
var il, ob;
function K3() {
  if (ob) return il;
  ob = 1;
  var e = Z_(), t = Tt();
  function r(n, a, i) {
    var u = a(n);
    return t(n) ? u : e(u, i(n));
  }
  return il = r, il;
}
var ul, sb;
function z3() {
  if (sb) return ul;
  sb = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length, i = 0, u = []; ++n < a; ) {
      var o = t[n];
      r(o, n, t) && (u[i++] = o);
    }
    return u;
  }
  return ul = e, ul;
}
var ol, cb;
function V3() {
  if (cb) return ol;
  cb = 1;
  function e() {
    return [];
  }
  return ol = e, ol;
}
var sl, lb;
function X3() {
  if (lb) return sl;
  lb = 1;
  var e = z3(), t = V3(), r = Object.prototype, n = r.propertyIsEnumerable, a = Object.getOwnPropertySymbols, i = a ? function(u) {
    return u == null ? [] : (u = Object(u), e(a(u), function(o) {
      return n.call(u, o);
    }));
  } : t;
  return sl = i, sl;
}
var cl, fb;
function Q3() {
  if (fb) return cl;
  fb = 1;
  function e(t, r) {
    for (var n = -1, a = Array(t); ++n < t; )
      a[n] = r(n);
    return a;
  }
  return cl = e, cl;
}
var ll, db;
function Z3() {
  if (db) return ll;
  db = 1;
  var e = Sr(), t = xr(), r = "[object Arguments]";
  function n(a) {
    return t(a) && e(a) == r;
  }
  return ll = n, ll;
}
var fl, hb;
function qp() {
  if (hb) return fl;
  hb = 1;
  var e = Z3(), t = xr(), r = Object.prototype, n = r.hasOwnProperty, a = r.propertyIsEnumerable, i = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(u) {
    return t(u) && n.call(u, "callee") && !a.call(u, "callee");
  };
  return fl = i, fl;
}
var $a = { exports: {} }, dl, pb;
function J3() {
  if (pb) return dl;
  pb = 1;
  function e() {
    return !1;
  }
  return dl = e, dl;
}
$a.exports;
var mb;
function J_() {
  return mb || (mb = 1, (function(e, t) {
    var r = ur(), n = J3(), a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, u = i && i.exports === a, o = u ? r.Buffer : void 0, s = o ? o.isBuffer : void 0, c = s || n;
    e.exports = c;
  })($a, $a.exports)), $a.exports;
}
var hl, yb;
function Wp() {
  if (yb) return hl;
  yb = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function r(n, a) {
    var i = typeof n;
    return a = a ?? e, !!a && (i == "number" || i != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < a;
  }
  return hl = r, hl;
}
var pl, bb;
function Yp() {
  if (bb) return pl;
  bb = 1;
  var e = 9007199254740991;
  function t(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
  }
  return pl = t, pl;
}
var ml, gb;
function eR() {
  if (gb) return ml;
  gb = 1;
  var e = Sr(), t = Yp(), r = xr(), n = "[object Arguments]", a = "[object Array]", i = "[object Boolean]", u = "[object Date]", o = "[object Error]", s = "[object Function]", c = "[object Map]", l = "[object Number]", f = "[object Object]", h = "[object RegExp]", p = "[object Set]", g = "[object String]", y = "[object WeakMap]", m = "[object ArrayBuffer]", E = "[object DataView]", v = "[object Float32Array]", _ = "[object Float64Array]", A = "[object Int8Array]", b = "[object Int16Array]", T = "[object Int32Array]", O = "[object Uint8Array]", P = "[object Uint8ClampedArray]", N = "[object Uint16Array]", j = "[object Uint32Array]", D = {};
  D[v] = D[_] = D[A] = D[b] = D[T] = D[O] = D[P] = D[N] = D[j] = !0, D[n] = D[a] = D[m] = D[i] = D[E] = D[u] = D[o] = D[s] = D[c] = D[l] = D[f] = D[h] = D[p] = D[g] = D[y] = !1;
  function R(B) {
    return r(B) && t(B.length) && !!D[e(B)];
  }
  return ml = R, ml;
}
var yl, vb;
function eA() {
  if (vb) return yl;
  vb = 1;
  function e(t) {
    return function(r) {
      return t(r);
    };
  }
  return yl = e, yl;
}
var Ua = { exports: {} };
Ua.exports;
var Eb;
function tR() {
  return Eb || (Eb = 1, (function(e, t) {
    var r = E_(), n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, i = a && a.exports === n, u = i && r.process, o = (function() {
      try {
        var s = a && a.require && a.require("util").types;
        return s || u && u.binding && u.binding("util");
      } catch {
      }
    })();
    e.exports = o;
  })(Ua, Ua.exports)), Ua.exports;
}
var bl, Tb;
function tA() {
  if (Tb) return bl;
  Tb = 1;
  var e = eR(), t = eA(), r = tR(), n = r && r.isTypedArray, a = n ? t(n) : e;
  return bl = a, bl;
}
var gl, _b;
function rR() {
  if (_b) return gl;
  _b = 1;
  var e = Q3(), t = qp(), r = Tt(), n = J_(), a = Wp(), i = tA(), u = Object.prototype, o = u.hasOwnProperty;
  function s(c, l) {
    var f = r(c), h = !f && t(c), p = !f && !h && n(c), g = !f && !h && !p && i(c), y = f || h || p || g, m = y ? e(c.length, String) : [], E = m.length;
    for (var v in c)
      (l || o.call(c, v)) && !(y && // Safari 9 has enumerable `arguments.length` in strict mode.
      (v == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      p && (v == "offset" || v == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      g && (v == "buffer" || v == "byteLength" || v == "byteOffset") || // Skip index properties.
      a(v, E))) && m.push(v);
    return m;
  }
  return gl = s, gl;
}
var vl, Ab;
function nR() {
  if (Ab) return vl;
  Ab = 1;
  var e = Object.prototype;
  function t(r) {
    var n = r && r.constructor, a = typeof n == "function" && n.prototype || e;
    return r === a;
  }
  return vl = t, vl;
}
var El, Ob;
function rA() {
  if (Ob) return El;
  Ob = 1;
  function e(t, r) {
    return function(n) {
      return t(r(n));
    };
  }
  return El = e, El;
}
var Tl, Sb;
function aR() {
  if (Sb) return Tl;
  Sb = 1;
  var e = rA(), t = e(Object.keys, Object);
  return Tl = t, Tl;
}
var _l, xb;
function iR() {
  if (xb) return _l;
  xb = 1;
  var e = nR(), t = aR(), r = Object.prototype, n = r.hasOwnProperty;
  function a(i) {
    if (!e(i))
      return t(i);
    var u = [];
    for (var o in Object(i))
      n.call(i, o) && o != "constructor" && u.push(o);
    return u;
  }
  return _l = a, _l;
}
var Al, wb;
function qi() {
  if (wb) return Al;
  wb = 1;
  var e = Ip(), t = Yp();
  function r(n) {
    return n != null && t(n.length) && !e(n);
  }
  return Al = r, Al;
}
var Ol, Pb;
function Wo() {
  if (Pb) return Ol;
  Pb = 1;
  var e = rR(), t = iR(), r = qi();
  function n(a) {
    return r(a) ? e(a) : t(a);
  }
  return Ol = n, Ol;
}
var Sl, Ib;
function uR() {
  if (Ib) return Sl;
  Ib = 1;
  var e = K3(), t = X3(), r = Wo();
  function n(a) {
    return e(a, r, t);
  }
  return Sl = n, Sl;
}
var xl, Cb;
function oR() {
  if (Cb) return xl;
  Cb = 1;
  var e = uR(), t = 1, r = Object.prototype, n = r.hasOwnProperty;
  function a(i, u, o, s, c, l) {
    var f = o & t, h = e(i), p = h.length, g = e(u), y = g.length;
    if (p != y && !f)
      return !1;
    for (var m = p; m--; ) {
      var E = h[m];
      if (!(f ? E in u : n.call(u, E)))
        return !1;
    }
    var v = l.get(i), _ = l.get(u);
    if (v && _)
      return v == u && _ == i;
    var A = !0;
    l.set(i, u), l.set(u, i);
    for (var b = f; ++m < p; ) {
      E = h[m];
      var T = i[E], O = u[E];
      if (s)
        var P = f ? s(O, T, E, u, i, l) : s(T, O, E, i, u, l);
      if (!(P === void 0 ? T === O || c(T, O, o, s, l) : P)) {
        A = !1;
        break;
      }
      b || (b = E == "constructor");
    }
    if (A && !b) {
      var N = i.constructor, j = u.constructor;
      N != j && "constructor" in i && "constructor" in u && !(typeof N == "function" && N instanceof N && typeof j == "function" && j instanceof j) && (A = !1);
    }
    return l.delete(i), l.delete(u), A;
  }
  return xl = a, xl;
}
var wl, Nb;
function sR() {
  if (Nb) return wl;
  Nb = 1;
  var e = Tn(), t = ur(), r = e(t, "DataView");
  return wl = r, wl;
}
var Pl, Rb;
function cR() {
  if (Rb) return Pl;
  Rb = 1;
  var e = Tn(), t = ur(), r = e(t, "Promise");
  return Pl = r, Pl;
}
var Il, Db;
function nA() {
  if (Db) return Il;
  Db = 1;
  var e = Tn(), t = ur(), r = e(t, "Set");
  return Il = r, Il;
}
var Cl, Mb;
function lR() {
  if (Mb) return Cl;
  Mb = 1;
  var e = Tn(), t = ur(), r = e(t, "WeakMap");
  return Cl = r, Cl;
}
var Nl, Lb;
function fR() {
  if (Lb) return Nl;
  Lb = 1;
  var e = sR(), t = Np(), r = cR(), n = nA(), a = lR(), i = Sr(), u = T_(), o = "[object Map]", s = "[object Object]", c = "[object Promise]", l = "[object Set]", f = "[object WeakMap]", h = "[object DataView]", p = u(e), g = u(t), y = u(r), m = u(n), E = u(a), v = i;
  return (e && v(new e(new ArrayBuffer(1))) != h || t && v(new t()) != o || r && v(r.resolve()) != c || n && v(new n()) != l || a && v(new a()) != f) && (v = function(_) {
    var A = i(_), b = A == s ? _.constructor : void 0, T = b ? u(b) : "";
    if (T)
      switch (T) {
        case p:
          return h;
        case g:
          return o;
        case y:
          return c;
        case m:
          return l;
        case E:
          return f;
      }
    return A;
  }), Nl = v, Nl;
}
var Rl, kb;
function dR() {
  if (kb) return Rl;
  kb = 1;
  var e = K_(), t = Q_(), r = G3(), n = oR(), a = fR(), i = Tt(), u = J_(), o = tA(), s = 1, c = "[object Arguments]", l = "[object Array]", f = "[object Object]", h = Object.prototype, p = h.hasOwnProperty;
  function g(y, m, E, v, _, A) {
    var b = i(y), T = i(m), O = b ? l : a(y), P = T ? l : a(m);
    O = O == c ? f : O, P = P == c ? f : P;
    var N = O == f, j = P == f, D = O == P;
    if (D && u(y)) {
      if (!u(m))
        return !1;
      b = !0, N = !1;
    }
    if (D && !N)
      return A || (A = new e()), b || o(y) ? t(y, m, E, v, _, A) : r(y, m, O, E, v, _, A);
    if (!(E & s)) {
      var R = N && p.call(y, "__wrapped__"), B = j && p.call(m, "__wrapped__");
      if (R || B) {
        var F = R ? y.value() : y, $ = B ? m.value() : m;
        return A || (A = new e()), _(F, $, E, v, A);
      }
    }
    return D ? (A || (A = new e()), n(y, m, E, v, _, A)) : !1;
  }
  return Rl = g, Rl;
}
var Dl, Bb;
function Gp() {
  if (Bb) return Dl;
  Bb = 1;
  var e = dR(), t = xr();
  function r(n, a, i, u, o) {
    return n === a ? !0 : n == null || a == null || !t(n) && !t(a) ? n !== n && a !== a : e(n, a, i, u, r, o);
  }
  return Dl = r, Dl;
}
var Ml, jb;
function hR() {
  if (jb) return Ml;
  jb = 1;
  var e = K_(), t = Gp(), r = 1, n = 2;
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
      var p = h[0], g = i[p], y = h[1];
      if (f && h[2]) {
        if (g === void 0 && !(p in i))
          return !1;
      } else {
        var m = new e();
        if (s)
          var E = s(g, y, p, i, u, m);
        if (!(E === void 0 ? t(y, g, r | n, s, m) : E))
          return !1;
      }
    }
    return !0;
  }
  return Ml = a, Ml;
}
var Ll, Fb;
function aA() {
  if (Fb) return Ll;
  Fb = 1;
  var e = qr();
  function t(r) {
    return r === r && !e(r);
  }
  return Ll = t, Ll;
}
var kl, $b;
function pR() {
  if ($b) return kl;
  $b = 1;
  var e = aA(), t = Wo();
  function r(n) {
    for (var a = t(n), i = a.length; i--; ) {
      var u = a[i], o = n[u];
      a[i] = [u, o, e(o)];
    }
    return a;
  }
  return kl = r, kl;
}
var Bl, Ub;
function iA() {
  if (Ub) return Bl;
  Ub = 1;
  function e(t, r) {
    return function(n) {
      return n == null ? !1 : n[t] === r && (r !== void 0 || t in Object(n));
    };
  }
  return Bl = e, Bl;
}
var jl, Hb;
function mR() {
  if (Hb) return jl;
  Hb = 1;
  var e = hR(), t = pR(), r = iA();
  function n(a) {
    var i = t(a);
    return i.length == 1 && i[0][2] ? r(i[0][0], i[0][1]) : function(u) {
      return u === a || e(u, a, i);
    };
  }
  return jl = n, jl;
}
var Fl, qb;
function yR() {
  if (qb) return Fl;
  qb = 1;
  function e(t, r) {
    return t != null && r in Object(t);
  }
  return Fl = e, Fl;
}
var $l, Wb;
function bR() {
  if (Wb) return $l;
  Wb = 1;
  var e = O_(), t = qp(), r = Tt(), n = Wp(), a = Yp(), i = Fo();
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
  return $l = u, $l;
}
var Ul, Yb;
function gR() {
  if (Yb) return Ul;
  Yb = 1;
  var e = yR(), t = bR();
  function r(n, a) {
    return n != null && t(n, a, e);
  }
  return Ul = r, Ul;
}
var Hl, Gb;
function vR() {
  if (Gb) return Hl;
  Gb = 1;
  var e = Gp(), t = S_(), r = gR(), n = Pp(), a = aA(), i = iA(), u = Fo(), o = 1, s = 2;
  function c(l, f) {
    return n(l) && a(f) ? i(u(l), f) : function(h) {
      var p = t(h, l);
      return p === void 0 && p === f ? r(h, l) : e(f, p, o | s);
    };
  }
  return Hl = c, Hl;
}
var ql, Kb;
function Ta() {
  if (Kb) return ql;
  Kb = 1;
  function e(t) {
    return t;
  }
  return ql = e, ql;
}
var Wl, zb;
function ER() {
  if (zb) return Wl;
  zb = 1;
  function e(t) {
    return function(r) {
      return r?.[t];
    };
  }
  return Wl = e, Wl;
}
var Yl, Vb;
function TR() {
  if (Vb) return Yl;
  Vb = 1;
  var e = Mp();
  function t(r) {
    return function(n) {
      return e(n, r);
    };
  }
  return Yl = t, Yl;
}
var Gl, Xb;
function _R() {
  if (Xb) return Gl;
  Xb = 1;
  var e = ER(), t = TR(), r = Pp(), n = Fo();
  function a(i) {
    return r(i) ? e(n(i)) : t(i);
  }
  return Gl = a, Gl;
}
var Kl, Qb;
function or() {
  if (Qb) return Kl;
  Qb = 1;
  var e = mR(), t = vR(), r = Ta(), n = Tt(), a = _R();
  function i(u) {
    return typeof u == "function" ? u : u == null ? r : typeof u == "object" ? n(u) ? t(u[0], u[1]) : e(u) : a(u);
  }
  return Kl = i, Kl;
}
var zl, Zb;
function uA() {
  if (Zb) return zl;
  Zb = 1;
  function e(t, r, n, a) {
    for (var i = t.length, u = n + (a ? 1 : -1); a ? u-- : ++u < i; )
      if (r(t[u], u, t))
        return u;
    return -1;
  }
  return zl = e, zl;
}
var Vl, Jb;
function AR() {
  if (Jb) return Vl;
  Jb = 1;
  function e(t) {
    return t !== t;
  }
  return Vl = e, Vl;
}
var Xl, eg;
function OR() {
  if (eg) return Xl;
  eg = 1;
  function e(t, r, n) {
    for (var a = n - 1, i = t.length; ++a < i; )
      if (t[a] === r)
        return a;
    return -1;
  }
  return Xl = e, Xl;
}
var Ql, tg;
function SR() {
  if (tg) return Ql;
  tg = 1;
  var e = uA(), t = AR(), r = OR();
  function n(a, i, u) {
    return i === i ? r(a, i, u) : e(a, t, u);
  }
  return Ql = n, Ql;
}
var Zl, rg;
function xR() {
  if (rg) return Zl;
  rg = 1;
  var e = SR();
  function t(r, n) {
    var a = r == null ? 0 : r.length;
    return !!a && e(r, n, 0) > -1;
  }
  return Zl = t, Zl;
}
var Jl, ng;
function wR() {
  if (ng) return Jl;
  ng = 1;
  function e(t, r, n) {
    for (var a = -1, i = t == null ? 0 : t.length; ++a < i; )
      if (n(r, t[a]))
        return !0;
    return !1;
  }
  return Jl = e, Jl;
}
var ef, ag;
function PR() {
  if (ag) return ef;
  ag = 1;
  function e() {
  }
  return ef = e, ef;
}
var tf, ig;
function IR() {
  if (ig) return tf;
  ig = 1;
  var e = nA(), t = PR(), r = Hp(), n = 1 / 0, a = e && 1 / r(new e([, -0]))[1] == n ? function(i) {
    return new e(i);
  } : t;
  return tf = a, tf;
}
var rf, ug;
function CR() {
  if (ug) return rf;
  ug = 1;
  var e = z_(), t = xR(), r = wR(), n = X_(), a = IR(), i = Hp(), u = 200;
  function o(s, c, l) {
    var f = -1, h = t, p = s.length, g = !0, y = [], m = y;
    if (l)
      g = !1, h = r;
    else if (p >= u) {
      var E = c ? null : a(s);
      if (E)
        return i(E);
      g = !1, h = n, m = new e();
    } else
      m = c ? [] : y;
    e:
      for (; ++f < p; ) {
        var v = s[f], _ = c ? c(v) : v;
        if (v = l || v !== 0 ? v : 0, g && _ === _) {
          for (var A = m.length; A--; )
            if (m[A] === _)
              continue e;
          c && m.push(_), y.push(v);
        } else h(m, _, l) || (m !== y && m.push(_), y.push(v));
      }
    return y;
  }
  return rf = o, rf;
}
var nf, og;
function NR() {
  if (og) return nf;
  og = 1;
  var e = or(), t = CR();
  function r(n, a) {
    return n && n.length ? t(n, e(a, 2)) : [];
  }
  return nf = r, nf;
}
var RR = NR();
const sg = /* @__PURE__ */ xe(RR);
function oA(e, t, r) {
  return t === !0 ? sg(e, r) : de(t) ? sg(e, t) : e;
}
function Vn(e) {
  "@babel/helpers - typeof";
  return Vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vn(e);
}
var DR = ["ref"];
function cg(e, t) {
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
    t % 2 ? cg(Object(r), !0).forEach(function(n) {
      Yo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function MR(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function lg(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, cA(n.key), n);
  }
}
function LR(e, t, r) {
  return t && lg(e.prototype, t), r && lg(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function kR(e, t, r) {
  return t = Mu(t), BR(e, sA() ? Reflect.construct(t, r || [], Mu(e).constructor) : t.apply(e, r));
}
function BR(e, t) {
  if (t && (Vn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return jR(e);
}
function jR(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function sA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (sA = function() {
    return !!e;
  })();
}
function Mu(e) {
  return Mu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Mu(e);
}
function FR(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ih(e, t);
}
function ih(e, t) {
  return ih = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ih(e, t);
}
function Yo(e, t, r) {
  return t = cA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function cA(e) {
  var t = $R(e, "string");
  return Vn(t) == "symbol" ? t : t + "";
}
function $R(e, t) {
  if (Vn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Vn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function UR(e, t) {
  if (e == null) return {};
  var r = HR(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function HR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function qR(e) {
  return e.value;
}
function WR(e, t) {
  if (/* @__PURE__ */ C.isValidElement(e))
    return /* @__PURE__ */ C.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ C.createElement(e, t);
  t.ref;
  var r = UR(t, DR);
  return /* @__PURE__ */ C.createElement(Up, r);
}
var fg = 1, jr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    MR(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = kR(this, t, [].concat(a)), Yo(r, "lastBoundingBox", {
      width: -1,
      height: -1
    }), r;
  }
  return FR(t, e), LR(t, [{
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
      a ? (Math.abs(a.width - this.lastBoundingBox.width) > fg || Math.abs(a.height - this.lastBoundingBox.height) > fg) && (this.lastBoundingBox.width = a.width, this.lastBoundingBox.height = a.height, n && n(a)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null));
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
          var g = this.getBBoxSnapshot();
          h = {
            top: ((l || 0) - g.height) / 2
          };
        } else
          h = o === "bottom" ? {
            bottom: s && s.bottom || 0
          } : {
            top: s && s.top || 0
          };
      return lr(lr({}, f), h);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.content, u = a.width, o = a.height, s = a.wrapperStyle, c = a.payloadUniqBy, l = a.payload, f = lr(lr({
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
      }, WR(i, lr(lr({}, this.props), {}, {
        payload: oA(l, c, qR)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function(n, a) {
      var i = lr(lr({}, this.defaultProps), n.props), u = i.layout;
      return u === "vertical" && J(n.props.height) ? {
        height: n.props.height
      } : u === "horizontal" ? {
        width: n.props.width || a
      } : null;
    }
  }]);
})(ir);
Yo(jr, "displayName", "Legend");
Yo(jr, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var af, dg;
function YR() {
  if (dg) return af;
  dg = 1;
  var e = $i(), t = qp(), r = Tt(), n = e ? e.isConcatSpreadable : void 0;
  function a(i) {
    return r(i) || t(i) || !!(n && i && i[n]);
  }
  return af = a, af;
}
var uf, hg;
function lA() {
  if (hg) return uf;
  hg = 1;
  var e = Z_(), t = YR();
  function r(n, a, i, u, o) {
    var s = -1, c = n.length;
    for (i || (i = t), o || (o = []); ++s < c; ) {
      var l = n[s];
      a > 0 && i(l) ? a > 1 ? r(l, a - 1, i, u, o) : e(o, l) : u || (o[o.length] = l);
    }
    return o;
  }
  return uf = r, uf;
}
var of, pg;
function GR() {
  if (pg) return of;
  pg = 1;
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
  return of = e, of;
}
var sf, mg;
function KR() {
  if (mg) return sf;
  mg = 1;
  var e = GR(), t = e();
  return sf = t, sf;
}
var cf, yg;
function fA() {
  if (yg) return cf;
  yg = 1;
  var e = KR(), t = Wo();
  function r(n, a) {
    return n && e(n, a, t);
  }
  return cf = r, cf;
}
var lf, bg;
function zR() {
  if (bg) return lf;
  bg = 1;
  var e = qi();
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
  return lf = t, lf;
}
var ff, gg;
function Kp() {
  if (gg) return ff;
  gg = 1;
  var e = fA(), t = zR(), r = t(e);
  return ff = r, ff;
}
var df, vg;
function dA() {
  if (vg) return df;
  vg = 1;
  var e = Kp(), t = qi();
  function r(n, a) {
    var i = -1, u = t(n) ? Array(n.length) : [];
    return e(n, function(o, s, c) {
      u[++i] = a(o, s, c);
    }), u;
  }
  return df = r, df;
}
var hf, Eg;
function VR() {
  if (Eg) return hf;
  Eg = 1;
  function e(t, r) {
    var n = t.length;
    for (t.sort(r); n--; )
      t[n] = t[n].value;
    return t;
  }
  return hf = e, hf;
}
var pf, Tg;
function XR() {
  if (Tg) return pf;
  Tg = 1;
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
  return pf = t, pf;
}
var mf, _g;
function QR() {
  if (_g) return mf;
  _g = 1;
  var e = XR();
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
  return mf = t, mf;
}
var yf, Ag;
function ZR() {
  if (Ag) return yf;
  Ag = 1;
  var e = Dp(), t = Mp(), r = or(), n = dA(), a = VR(), i = eA(), u = QR(), o = Ta(), s = Tt();
  function c(l, f, h) {
    f.length ? f = e(f, function(y) {
      return s(y) ? function(m) {
        return t(m, y.length === 1 ? y[0] : y);
      } : y;
    }) : f = [o];
    var p = -1;
    f = e(f, i(r));
    var g = n(l, function(y, m, E) {
      var v = e(f, function(_) {
        return _(y);
      });
      return { criteria: v, index: ++p, value: y };
    });
    return a(g, function(y, m) {
      return u(y, m, h);
    });
  }
  return yf = c, yf;
}
var bf, Og;
function JR() {
  if (Og) return bf;
  Og = 1;
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
var gf, Sg;
function eD() {
  if (Sg) return gf;
  Sg = 1;
  var e = JR(), t = Math.max;
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
  return gf = r, gf;
}
var vf, xg;
function tD() {
  if (xg) return vf;
  xg = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return vf = e, vf;
}
var Ef, wg;
function hA() {
  if (wg) return Ef;
  wg = 1;
  var e = Tn(), t = (function() {
    try {
      var r = e(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  })();
  return Ef = t, Ef;
}
var Tf, Pg;
function rD() {
  if (Pg) return Tf;
  Pg = 1;
  var e = tD(), t = hA(), r = Ta(), n = t ? function(a, i) {
    return t(a, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(i),
      writable: !0
    });
  } : r;
  return Tf = n, Tf;
}
var _f, Ig;
function nD() {
  if (Ig) return _f;
  Ig = 1;
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
  return _f = n, _f;
}
var Af, Cg;
function aD() {
  if (Cg) return Af;
  Cg = 1;
  var e = rD(), t = nD(), r = t(e);
  return Af = r, Af;
}
var Of, Ng;
function iD() {
  if (Ng) return Of;
  Ng = 1;
  var e = Ta(), t = eD(), r = aD();
  function n(a, i) {
    return r(t(a, i, e), a + "");
  }
  return Of = n, Of;
}
var Sf, Rg;
function Go() {
  if (Rg) return Sf;
  Rg = 1;
  var e = Cp(), t = qi(), r = Wp(), n = qr();
  function a(i, u, o) {
    if (!n(o))
      return !1;
    var s = typeof u;
    return (s == "number" ? t(o) && r(u, o.length) : s == "string" && u in o) ? e(o[u], i) : !1;
  }
  return Sf = a, Sf;
}
var xf, Dg;
function uD() {
  if (Dg) return xf;
  Dg = 1;
  var e = lA(), t = ZR(), r = iD(), n = Go(), a = r(function(i, u) {
    if (i == null)
      return [];
    var o = u.length;
    return o > 1 && n(i, u[0], u[1]) ? u = [] : o > 2 && n(u[0], u[1], u[2]) && (u = [u[0]]), t(i, e(u, 1), []);
  });
  return xf = a, xf;
}
var oD = uD();
const zp = /* @__PURE__ */ xe(oD);
function ii(e) {
  "@babel/helpers - typeof";
  return ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ii(e);
}
function uh() {
  return uh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, uh.apply(this, arguments);
}
function sD(e, t) {
  return dD(e) || fD(e, t) || lD(e, t) || cD();
}
function cD() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function lD(e, t) {
  if (e) {
    if (typeof e == "string") return Mg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Mg(e, t);
  }
}
function Mg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function fD(e, t) {
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
function dD(e) {
  if (Array.isArray(e)) return e;
}
function Lg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function wf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lg(Object(r), !0).forEach(function(n) {
      hD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hD(e, t, r) {
  return t = pD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pD(e) {
  var t = mD(e, "string");
  return ii(t) == "symbol" ? t : t + "";
}
function mD(e, t) {
  if (ii(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function yD(e) {
  return Array.isArray(e) && Ge(e[0]) && Ge(e[1]) ? e.join(" ~ ") : e;
}
var bD = function(t) {
  var r = t.separator, n = r === void 0 ? " : " : r, a = t.contentStyle, i = a === void 0 ? {} : a, u = t.itemStyle, o = u === void 0 ? {} : u, s = t.labelStyle, c = s === void 0 ? {} : s, l = t.payload, f = t.formatter, h = t.itemSorter, p = t.wrapperClassName, g = t.labelClassName, y = t.label, m = t.labelFormatter, E = t.accessibilityLayer, v = E === void 0 ? !1 : E, _ = function() {
    if (l && l.length) {
      var R = {
        padding: 0,
        margin: 0
      }, B = (h ? zp(l, h) : l).map(function(F, $) {
        if (F.type === "none")
          return null;
        var q = wf({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: F.color || "#000"
        }, o), Y = F.formatter || f || yD, Q = F.value, te = F.name, k = Q, W = te;
        if (Y && k != null && W != null) {
          var G = Y(Q, te, F, $, l);
          if (Array.isArray(G)) {
            var Z = sD(G, 2);
            k = Z[0], W = Z[1];
          } else
            k = G;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ C.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat($),
            style: q
          }, Ge(W) ? /* @__PURE__ */ C.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, W) : null, Ge(W) ? /* @__PURE__ */ C.createElement("span", {
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
  }, A = wf({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, i), b = wf({
    margin: 0
  }, c), T = !me(y), O = T ? y : "", P = pe("recharts-default-tooltip", p), N = pe("recharts-tooltip-label", g);
  T && m && l !== void 0 && l !== null && (O = m(y, l));
  var j = v ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ C.createElement("div", uh({
    className: P,
    style: A
  }, j), /* @__PURE__ */ C.createElement("p", {
    className: N,
    style: b
  }, /* @__PURE__ */ C.isValidElement(O) ? O : "".concat(O)), _());
};
function ui(e) {
  "@babel/helpers - typeof";
  return ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ui(e);
}
function au(e, t, r) {
  return t = gD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function gD(e) {
  var t = vD(e, "string");
  return ui(t) == "symbol" ? t : t + "";
}
function vD(e, t) {
  if (ui(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ui(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ia = "recharts-tooltip-wrapper", ED = {
  visibility: "hidden"
};
function TD(e) {
  var t = e.coordinate, r = e.translateX, n = e.translateY;
  return pe(Ia, au(au(au(au({}, "".concat(Ia, "-right"), J(r) && t && J(t.x) && r >= t.x), "".concat(Ia, "-left"), J(r) && t && J(t.x) && r < t.x), "".concat(Ia, "-bottom"), J(n) && t && J(t.y) && n >= t.y), "".concat(Ia, "-top"), J(n) && t && J(t.y) && n < t.y));
}
function kg(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.key, a = e.offsetTopLeft, i = e.position, u = e.reverseDirection, o = e.tooltipDimension, s = e.viewBox, c = e.viewBoxDimension;
  if (i && J(i[n]))
    return i[n];
  var l = r[n] - o - a, f = r[n] + a;
  if (t[n])
    return u[n] ? l : f;
  if (u[n]) {
    var h = l, p = s[n];
    return h < p ? Math.max(f, s[n]) : Math.max(l, s[n]);
  }
  var g = f + o, y = s[n] + c;
  return g > y ? Math.max(l, s[n]) : Math.max(f, s[n]);
}
function _D(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function AD(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTopLeft, a = e.position, i = e.reverseDirection, u = e.tooltipBox, o = e.useTranslate3d, s = e.viewBox, c, l, f;
  return u.height > 0 && u.width > 0 && r ? (l = kg({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: u.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), f = kg({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: u.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), c = _D({
    translateX: l,
    translateY: f,
    useTranslate3d: o
  })) : c = ED, {
    cssProperties: c,
    cssClasses: TD({
      translateX: l,
      translateY: f,
      coordinate: r
    })
  };
}
function Xn(e) {
  "@babel/helpers - typeof";
  return Xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xn(e);
}
function Bg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bg(Object(r), !0).forEach(function(n) {
      sh(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Bg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function OD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function SD(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, mA(n.key), n);
  }
}
function xD(e, t, r) {
  return t && SD(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function wD(e, t, r) {
  return t = Lu(t), PD(e, pA() ? Reflect.construct(t, r || [], Lu(e).constructor) : t.apply(e, r));
}
function PD(e, t) {
  if (t && (Xn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return ID(e);
}
function ID(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function pA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (pA = function() {
    return !!e;
  })();
}
function Lu(e) {
  return Lu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Lu(e);
}
function CD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && oh(e, t);
}
function oh(e, t) {
  return oh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, oh(e, t);
}
function sh(e, t, r) {
  return t = mA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function mA(e) {
  var t = ND(e, "string");
  return Xn(t) == "symbol" ? t : t + "";
}
function ND(e, t) {
  if (Xn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Xn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Fg = 1, RD = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    OD(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = wD(this, t, [].concat(a)), sh(r, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), sh(r, "handleKeyDown", function(u) {
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
  return CD(t, e), xD(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        (Math.abs(n.width - this.state.lastBoundingBox.width) > Fg || Math.abs(n.height - this.state.lastBoundingBox.height) > Fg) && this.setState({
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
      var n = this, a = this.props, i = a.active, u = a.allowEscapeViewBox, o = a.animationDuration, s = a.animationEasing, c = a.children, l = a.coordinate, f = a.hasPayload, h = a.isAnimationActive, p = a.offset, g = a.position, y = a.reverseDirection, m = a.useTranslate3d, E = a.viewBox, v = a.wrapperStyle, _ = AD({
        allowEscapeViewBox: u,
        coordinate: l,
        offsetTopLeft: p,
        position: g,
        reverseDirection: y,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: m,
        viewBox: E
      }), A = _.cssClasses, b = _.cssProperties, T = jg(jg({
        transition: h && i ? "transform ".concat(o, "ms ").concat(s) : void 0
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
          style: T,
          ref: function(P) {
            n.wrapperNode = P;
          }
        }, c)
      );
    }
  }]);
})(ir), DD = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, _a = {
  isSsr: DD()
};
function Qn(e) {
  "@babel/helpers - typeof";
  return Qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qn(e);
}
function $g(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ug(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $g(Object(r), !0).forEach(function(n) {
      Vp(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $g(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function MD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function LD(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, bA(n.key), n);
  }
}
function kD(e, t, r) {
  return t && LD(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function BD(e, t, r) {
  return t = ku(t), jD(e, yA() ? Reflect.construct(t, r || [], ku(e).constructor) : t.apply(e, r));
}
function jD(e, t) {
  if (t && (Qn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return FD(e);
}
function FD(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function yA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (yA = function() {
    return !!e;
  })();
}
function ku(e) {
  return ku = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ku(e);
}
function $D(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ch(e, t);
}
function ch(e, t) {
  return ch = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ch(e, t);
}
function Vp(e, t, r) {
  return t = bA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bA(e) {
  var t = UD(e, "string");
  return Qn(t) == "symbol" ? t : t + "";
}
function UD(e, t) {
  if (Qn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Qn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function HD(e) {
  return e.dataKey;
}
function qD(e, t) {
  return /* @__PURE__ */ C.isValidElement(e) ? /* @__PURE__ */ C.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ C.createElement(e, t) : /* @__PURE__ */ C.createElement(bD, t);
}
var yt = /* @__PURE__ */ (function(e) {
  function t() {
    return MD(this, t), BD(this, t, arguments);
  }
  return $D(t, e), kD(t, [{
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.active, u = a.allowEscapeViewBox, o = a.animationDuration, s = a.animationEasing, c = a.content, l = a.coordinate, f = a.filterNull, h = a.isAnimationActive, p = a.offset, g = a.payload, y = a.payloadUniqBy, m = a.position, E = a.reverseDirection, v = a.useTranslate3d, _ = a.viewBox, A = a.wrapperStyle, b = g ?? [];
      f && b.length && (b = oA(g.filter(function(O) {
        return O.value != null && (O.hide !== !0 || n.props.includeHidden);
      }), y, HD));
      var T = b.length > 0;
      return /* @__PURE__ */ C.createElement(RD, {
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
        useTranslate3d: v,
        viewBox: _,
        wrapperStyle: A
      }, qD(c, Ug(Ug({}, this.props), {}, {
        payload: b
      })));
    }
  }]);
})(ir);
Vp(yt, "displayName", "Tooltip");
Vp(yt, "defaultProps", {
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
var Pf, Hg;
function WD() {
  if (Hg) return Pf;
  Hg = 1;
  var e = ur(), t = function() {
    return e.Date.now();
  };
  return Pf = t, Pf;
}
var If, qg;
function YD() {
  if (qg) return If;
  qg = 1;
  var e = /\s/;
  function t(r) {
    for (var n = r.length; n-- && e.test(r.charAt(n)); )
      ;
    return n;
  }
  return If = t, If;
}
var Cf, Wg;
function GD() {
  if (Wg) return Cf;
  Wg = 1;
  var e = YD(), t = /^\s+/;
  function r(n) {
    return n && n.slice(0, e(n) + 1).replace(t, "");
  }
  return Cf = r, Cf;
}
var Nf, Yg;
function gA() {
  if (Yg) return Nf;
  Yg = 1;
  var e = GD(), t = qr(), r = va(), n = NaN, a = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, u = /^0o[0-7]+$/i, o = parseInt;
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
  return Nf = s, Nf;
}
var Rf, Gg;
function KD() {
  if (Gg) return Rf;
  Gg = 1;
  var e = qr(), t = WD(), r = gA(), n = "Expected a function", a = Math.max, i = Math.min;
  function u(o, s, c) {
    var l, f, h, p, g, y, m = 0, E = !1, v = !1, _ = !0;
    if (typeof o != "function")
      throw new TypeError(n);
    s = r(s) || 0, e(c) && (E = !!c.leading, v = "maxWait" in c, h = v ? a(r(c.maxWait) || 0, s) : h, _ = "trailing" in c ? !!c.trailing : _);
    function A(B) {
      var F = l, $ = f;
      return l = f = void 0, m = B, p = o.apply($, F), p;
    }
    function b(B) {
      return m = B, g = setTimeout(P, s), E ? A(B) : p;
    }
    function T(B) {
      var F = B - y, $ = B - m, q = s - F;
      return v ? i(q, h - $) : q;
    }
    function O(B) {
      var F = B - y, $ = B - m;
      return y === void 0 || F >= s || F < 0 || v && $ >= h;
    }
    function P() {
      var B = t();
      if (O(B))
        return N(B);
      g = setTimeout(P, T(B));
    }
    function N(B) {
      return g = void 0, _ && l ? A(B) : (l = f = void 0, p);
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
          return clearTimeout(g), g = setTimeout(P, s), A(y);
      }
      return g === void 0 && (g = setTimeout(P, s)), p;
    }
    return R.cancel = j, R.flush = D, R;
  }
  return Rf = u, Rf;
}
var Df, Kg;
function zD() {
  if (Kg) return Df;
  Kg = 1;
  var e = KD(), t = qr(), r = "Expected a function";
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
  return Df = n, Df;
}
var VD = zD();
const vA = /* @__PURE__ */ xe(VD);
function oi(e) {
  "@babel/helpers - typeof";
  return oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, oi(e);
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
function iu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zg(Object(r), !0).forEach(function(n) {
      XD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function XD(e, t, r) {
  return t = QD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QD(e) {
  var t = ZD(e, "string");
  return oi(t) == "symbol" ? t : t + "";
}
function ZD(e, t) {
  if (oi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (oi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function JD(e, t) {
  return n6(e) || r6(e, t) || t6(e, t) || e6();
}
function e6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function t6(e, t) {
  if (e) {
    if (typeof e == "string") return Vg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Vg(e, t);
  }
}
function Vg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function r6(e, t) {
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
function n6(e) {
  if (Array.isArray(e)) return e;
}
var Wi = /* @__PURE__ */ TT(function(e, t) {
  var r = e.aspect, n = e.initialDimension, a = n === void 0 ? {
    width: -1,
    height: -1
  } : n, i = e.width, u = i === void 0 ? "100%" : i, o = e.height, s = o === void 0 ? "100%" : o, c = e.minWidth, l = c === void 0 ? 0 : c, f = e.minHeight, h = e.maxHeight, p = e.children, g = e.debounce, y = g === void 0 ? 0 : g, m = e.id, E = e.className, v = e.onResize, _ = e.style, A = _ === void 0 ? {} : _, b = ei(null), T = ei();
  T.current = v, HS(t, function() {
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
  }), P = JD(O, 2), N = P[0], j = P[1], D = qS(function(B, F) {
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
      var k, W = te[0].contentRect, G = W.width, Z = W.height;
      D(G, Z), (k = T.current) === null || k === void 0 || k.call(T, G, Z);
    };
    y > 0 && (B = vA(B, y, {
      trailing: !0,
      leading: !1
    }));
    var F = new ResizeObserver(B), $ = b.current.getBoundingClientRect(), q = $.width, Y = $.height;
    return D(q, Y), F.observe(b.current), function() {
      F.disconnect();
    };
  }, [D, y]);
  var R = an(function() {
    var B = N.containerWidth, F = N.containerHeight;
    if (B < 0 || F < 0)
      return null;
    Yt(en(u) || en(s), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, u, s), Yt(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var $ = en(u) ? B : u, q = en(s) ? F : s;
    r && r > 0 && ($ ? q = $ / r : q && ($ = q * r), h && q > h && (q = h)), Yt($ > 0 || q > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, $, q, u, s, l, f, r);
    var Y = !Array.isArray(p) && gr(p.type).endsWith("Chart");
    return C.Children.map(p, function(Q) {
      return /* @__PURE__ */ C.isValidElement(Q) ? /* @__PURE__ */ Ue(Q, iu({
        width: $,
        height: q
      }, Y ? {
        style: iu({
          height: "100%",
          width: "100%",
          maxHeight: q,
          maxWidth: $
        }, Q.props.style)
      } : {})) : Q;
    });
  }, [r, p, s, h, f, l, N, u]);
  return /* @__PURE__ */ C.createElement("div", {
    id: m ? "".concat(m) : void 0,
    className: pe("recharts-responsive-container", E),
    style: iu(iu({}, A), {}, {
      width: u,
      height: s,
      minWidth: l,
      minHeight: f,
      maxHeight: h
    }),
    ref: b
  }, R);
}), Ko = function(t) {
  return null;
};
Ko.displayName = "Cell";
function si(e) {
  "@babel/helpers - typeof";
  return si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, si(e);
}
function Xg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function lh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Xg(Object(r), !0).forEach(function(n) {
      a6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function a6(e, t, r) {
  return t = i6(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function i6(e) {
  var t = u6(e, "string");
  return si(t) == "symbol" ? t : t + "";
}
function u6(e, t) {
  if (si(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (si(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Pn = {
  widthCache: {},
  cacheCount: 0
}, o6 = 2e3, s6 = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, Qg = "recharts_measurement_span";
function c6(e) {
  var t = lh({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r];
  }), t;
}
var za = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || _a.isSsr)
    return {
      width: 0,
      height: 0
    };
  var n = c6(r), a = JSON.stringify({
    text: t,
    copyStyle: n
  });
  if (Pn.widthCache[a])
    return Pn.widthCache[a];
  try {
    var i = document.getElementById(Qg);
    i || (i = document.createElement("span"), i.setAttribute("id", Qg), i.setAttribute("aria-hidden", "true"), document.body.appendChild(i));
    var u = lh(lh({}, s6), n);
    Object.assign(i.style, u), i.textContent = "".concat(t);
    var o = i.getBoundingClientRect(), s = {
      width: o.width,
      height: o.height
    };
    return Pn.widthCache[a] = s, ++Pn.cacheCount > o6 && (Pn.cacheCount = 0, Pn.widthCache = {}), s;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, l6 = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function ci(e) {
  "@babel/helpers - typeof";
  return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ci(e);
}
function Bu(e, t) {
  return p6(e) || h6(e, t) || d6(e, t) || f6();
}
function f6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function d6(e, t) {
  if (e) {
    if (typeof e == "string") return Zg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Zg(e, t);
  }
}
function Zg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function h6(e, t) {
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
function p6(e) {
  if (Array.isArray(e)) return e;
}
function m6(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Jg(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, b6(n.key), n);
  }
}
function y6(e, t, r) {
  return t && Jg(e.prototype, t), r && Jg(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function b6(e) {
  var t = g6(e, "string");
  return ci(t) == "symbol" ? t : t + "";
}
function g6(e, t) {
  if (ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var ev = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, tv = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, v6 = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, E6 = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, EA = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, T6 = Object.keys(EA), Ln = "NaN";
function _6(e, t) {
  return e * EA[t];
}
var uu = /* @__PURE__ */ (function() {
  function e(t, r) {
    m6(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !v6.test(r) && (this.num = NaN, this.unit = ""), T6.includes(r) && (this.num = _6(t, r), this.unit = "px");
  }
  return y6(e, [{
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
      var n, a = (n = E6.exec(r)) !== null && n !== void 0 ? n : [], i = Bu(a, 3), u = i[1], o = i[2];
      return new e(parseFloat(u), o ?? "");
    }
  }]);
})();
function TA(e) {
  if (e.includes(Ln))
    return Ln;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = ev.exec(t)) !== null && r !== void 0 ? r : [], a = Bu(n, 4), i = a[1], u = a[2], o = a[3], s = uu.parse(i ?? ""), c = uu.parse(o ?? ""), l = u === "*" ? s.multiply(c) : s.divide(c);
    if (l.isNaN())
      return Ln;
    t = t.replace(ev, l.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var f, h = (f = tv.exec(t)) !== null && f !== void 0 ? f : [], p = Bu(h, 4), g = p[1], y = p[2], m = p[3], E = uu.parse(g ?? ""), v = uu.parse(m ?? ""), _ = y === "+" ? E.add(v) : E.subtract(v);
    if (_.isNaN())
      return Ln;
    t = t.replace(tv, _.toString());
  }
  return t;
}
var rv = /\(([^()]*)\)/;
function A6(e) {
  for (var t = e; t.includes("("); ) {
    var r = rv.exec(t), n = Bu(r, 2), a = n[1];
    t = t.replace(rv, TA(a));
  }
  return t;
}
function O6(e) {
  var t = e.replace(/\s+/g, "");
  return t = A6(t), t = TA(t), t;
}
function S6(e) {
  try {
    return O6(e);
  } catch {
    return Ln;
  }
}
function Mf(e) {
  var t = S6(e.slice(5, -1));
  return t === Ln ? "" : t;
}
var x6 = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], w6 = ["dx", "dy", "angle", "className", "breakAll"];
function fh() {
  return fh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fh.apply(this, arguments);
}
function nv(e, t) {
  if (e == null) return {};
  var r = P6(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function P6(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function av(e, t) {
  return R6(e) || N6(e, t) || C6(e, t) || I6();
}
function I6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function C6(e, t) {
  if (e) {
    if (typeof e == "string") return iv(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return iv(e, t);
  }
}
function iv(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function N6(e, t) {
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
function R6(e) {
  if (Array.isArray(e)) return e;
}
var _A = /[ \f\n\r\t\v\u2028\u2029]+/, AA = function(t) {
  var r = t.children, n = t.breakAll, a = t.style;
  try {
    var i = [];
    me(r) || (n ? i = r.toString().split("") : i = r.toString().split(_A));
    var u = i.map(function(s) {
      return {
        word: s,
        width: za(s, a).width
      };
    }), o = n ? 0 : za(" ", a).width;
    return {
      wordsWithComputedWidth: u,
      spaceWidth: o
    };
  } catch {
    return null;
  }
}, D6 = function(t, r, n, a, i) {
  var u = t.maxLines, o = t.children, s = t.style, c = t.breakAll, l = J(u), f = o, h = function() {
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
    var q = f.slice(0, $), Y = AA({
      breakAll: c,
      style: s,
      children: q + y
    }).wordsWithComputedWidth, Q = h(Y), te = Q.length > u || g(Q).width > Number(a);
    return [te, Q];
  }, E = 0, v = f.length - 1, _ = 0, A; E <= v && _ <= f.length - 1; ) {
    var b = Math.floor((E + v) / 2), T = b - 1, O = m(T), P = av(O, 2), N = P[0], j = P[1], D = m(b), R = av(D, 1), B = R[0];
    if (!N && !B && (E = b + 1), N && B && (v = b - 1), !N && B) {
      A = j;
      break;
    }
    _++;
  }
  return A || p;
}, uv = function(t) {
  var r = me(t) ? [] : t.toString().split(_A);
  return [{
    words: r
  }];
}, M6 = function(t) {
  var r = t.width, n = t.scaleToFit, a = t.children, i = t.style, u = t.breakAll, o = t.maxLines;
  if ((r || n) && !_a.isSsr) {
    var s, c, l = AA({
      breakAll: u,
      children: a,
      style: i
    });
    if (l) {
      var f = l.wordsWithComputedWidth, h = l.spaceWidth;
      s = f, c = h;
    } else
      return uv(a);
    return D6({
      breakAll: u,
      children: a,
      maxLines: o,
      style: i
    }, s, c, r, n);
  }
  return uv(a);
}, ov = "#808080", mn = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, u = t.lineHeight, o = u === void 0 ? "1em" : u, s = t.capHeight, c = s === void 0 ? "0.71em" : s, l = t.scaleToFit, f = l === void 0 ? !1 : l, h = t.textAnchor, p = h === void 0 ? "start" : h, g = t.verticalAnchor, y = g === void 0 ? "end" : g, m = t.fill, E = m === void 0 ? ov : m, v = nv(t, x6), _ = an(function() {
    return M6({
      breakAll: v.breakAll,
      children: v.children,
      maxLines: v.maxLines,
      scaleToFit: f,
      style: v.style,
      width: v.width
    });
  }, [v.breakAll, v.children, v.maxLines, f, v.style, v.width]), A = v.dx, b = v.dy, T = v.angle, O = v.className, P = v.breakAll, N = nv(v, w6);
  if (!Ge(n) || !Ge(i))
    return null;
  var j = n + (J(A) ? A : 0), D = i + (J(b) ? b : 0), R;
  switch (y) {
    case "start":
      R = Mf("calc(".concat(c, ")"));
      break;
    case "middle":
      R = Mf("calc(".concat((_.length - 1) / 2, " * -").concat(o, " + (").concat(c, " / 2))"));
      break;
    default:
      R = Mf("calc(".concat(_.length - 1, " * -").concat(o, ")"));
      break;
  }
  var B = [];
  if (f) {
    var F = _[0].width, $ = v.width;
    B.push("scale(".concat((J($) ? $ / F : 1) / F, ")"));
  }
  return T && B.push("rotate(".concat(T, ", ").concat(j, ", ").concat(D, ")")), B.length && (N.transform = B.join(" ")), /* @__PURE__ */ C.createElement("text", fh({}, le(N, !0), {
    x: j,
    y: D,
    className: pe("recharts-text", O),
    textAnchor: p,
    fill: E.includes("url") ? ov : E
  }), _.map(function(q, Y) {
    var Q = q.words.join(P ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ C.createElement("tspan", {
        x: j,
        dy: Y === 0 ? R : o,
        key: "".concat(Q, "-").concat(Y)
      }, Q)
    );
  }));
};
function Fr(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function L6(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Xp(e) {
  let t, r, n;
  e.length !== 2 ? (t = Fr, r = (o, s) => Fr(e(o), s), n = (o, s) => e(o) - s) : (t = e === Fr || e === L6 ? e : k6, r = e, n = e);
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
function k6() {
  return 0;
}
function OA(e) {
  return e === null ? NaN : +e;
}
function* B6(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const j6 = Xp(Fr), Yi = j6.right;
Xp(OA).center;
class sv extends Map {
  constructor(t, r = U6) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, a] of t) this.set(n, a);
  }
  get(t) {
    return super.get(cv(this, t));
  }
  has(t) {
    return super.has(cv(this, t));
  }
  set(t, r) {
    return super.set(F6(this, t), r);
  }
  delete(t) {
    return super.delete($6(this, t));
  }
}
function cv({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function F6({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function $6({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function U6(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function H6(e = Fr) {
  if (e === Fr) return SA;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function SA(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const q6 = Math.sqrt(50), W6 = Math.sqrt(10), Y6 = Math.sqrt(2);
function ju(e, t, r) {
  const n = (t - e) / Math.max(0, r), a = Math.floor(Math.log10(n)), i = n / Math.pow(10, a), u = i >= q6 ? 10 : i >= W6 ? 5 : i >= Y6 ? 2 : 1;
  let o, s, c;
  return a < 0 ? (c = Math.pow(10, -a) / u, o = Math.round(e * c), s = Math.round(t * c), o / c < e && ++o, s / c > t && --s, c = -c) : (c = Math.pow(10, a) * u, o = Math.round(e / c), s = Math.round(t / c), o * c < e && ++o, s * c > t && --s), s < o && 0.5 <= r && r < 2 ? ju(e, t, r * 2) : [o, s, c];
}
function dh(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [a, i, u] = n ? ju(t, e, r) : ju(e, t, r);
  if (!(i >= a)) return [];
  const o = i - a + 1, s = new Array(o);
  if (n)
    if (u < 0) for (let c = 0; c < o; ++c) s[c] = (i - c) / -u;
    else for (let c = 0; c < o; ++c) s[c] = (i - c) * u;
  else if (u < 0) for (let c = 0; c < o; ++c) s[c] = (a + c) / -u;
  else for (let c = 0; c < o; ++c) s[c] = (a + c) * u;
  return s;
}
function hh(e, t, r) {
  return t = +t, e = +e, r = +r, ju(e, t, r)[2];
}
function ph(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, a = n ? hh(t, e, r) : hh(e, t, r);
  return (n ? -1 : 1) * (a < 0 ? 1 / -a : a);
}
function lv(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function fv(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function xA(e, t, r = 0, n = 1 / 0, a) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (a = a === void 0 ? SA : H6(a); n > r; ) {
    if (n - r > 600) {
      const s = n - r + 1, c = t - r + 1, l = Math.log(s), f = 0.5 * Math.exp(2 * l / 3), h = 0.5 * Math.sqrt(l * f * (s - f) / s) * (c - s / 2 < 0 ? -1 : 1), p = Math.max(r, Math.floor(t - c * f / s + h)), g = Math.min(n, Math.floor(t + (s - c) * f / s + h));
      xA(e, t, p, g, a);
    }
    const i = e[t];
    let u = r, o = n;
    for (Ca(e, r, t), a(e[n], i) > 0 && Ca(e, r, n); u < o; ) {
      for (Ca(e, u, o), ++u, --o; a(e[u], i) < 0; ) ++u;
      for (; a(e[o], i) > 0; ) --o;
    }
    a(e[r], i) === 0 ? Ca(e, r, o) : (++o, Ca(e, o, n)), o <= t && (r = o + 1), t <= o && (n = o - 1);
  }
  return e;
}
function Ca(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function G6(e, t, r) {
  if (e = Float64Array.from(B6(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return fv(e);
    if (t >= 1) return lv(e);
    var n, a = (n - 1) * t, i = Math.floor(a), u = lv(xA(e, i).subarray(0, i + 1)), o = fv(e.subarray(i + 1));
    return u + (o - u) * (a - i);
  }
}
function K6(e, t, r = OA) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, a = (n - 1) * t, i = Math.floor(a), u = +r(e[i], i, e), o = +r(e[i + 1], i + 1, e);
    return u + (o - u) * (a - i);
  }
}
function z6(e, t, r) {
  e = +e, t = +t, r = (a = arguments.length) < 2 ? (t = e, e = 0, 1) : a < 3 ? 1 : +r;
  for (var n = -1, a = Math.max(0, Math.ceil((t - e) / r)) | 0, i = new Array(a); ++n < a; )
    i[n] = e + n * r;
  return i;
}
function $t(e, t) {
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
function wr(e, t) {
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
const mh = /* @__PURE__ */ Symbol("implicit");
function Qp() {
  var e = new sv(), t = [], r = [], n = mh;
  function a(i) {
    let u = e.get(i);
    if (u === void 0) {
      if (n !== mh) return n;
      e.set(i, u = t.push(i) - 1);
    }
    return r[u % r.length];
  }
  return a.domain = function(i) {
    if (!arguments.length) return t.slice();
    t = [], e = new sv();
    for (const u of i)
      e.has(u) || e.set(u, t.push(u) - 1);
    return a;
  }, a.range = function(i) {
    return arguments.length ? (r = Array.from(i), a) : r.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return Qp(t, r).unknown(n);
  }, $t.apply(a, arguments), a;
}
function li() {
  var e = Qp().unknown(void 0), t = e.domain, r = e.range, n = 0, a = 1, i, u, o = !1, s = 0, c = 0, l = 0.5;
  delete e.unknown;
  function f() {
    var h = t().length, p = a < n, g = p ? a : n, y = p ? n : a;
    i = (y - g) / Math.max(1, h - s + c * 2), o && (i = Math.floor(i)), g += (y - g - i * (h - s)) * l, u = i * (1 - s), o && (g = Math.round(g), u = Math.round(u));
    var m = z6(h).map(function(E) {
      return g + i * E;
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
    return li(t(), [n, a]).round(o).paddingInner(s).paddingOuter(c).align(l);
  }, $t.apply(f(), arguments);
}
function wA(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return wA(t());
  }, e;
}
function Va() {
  return wA(li.apply(null, arguments).paddingInner(1));
}
function Zp(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function PA(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Gi() {
}
var fi = 0.7, Fu = 1 / fi, Hn = "\\s*([+-]?\\d+)\\s*", di = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", tr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", V6 = /^#([0-9a-f]{3,8})$/, X6 = new RegExp(`^rgb\\(${Hn},${Hn},${Hn}\\)$`), Q6 = new RegExp(`^rgb\\(${tr},${tr},${tr}\\)$`), Z6 = new RegExp(`^rgba\\(${Hn},${Hn},${Hn},${di}\\)$`), J6 = new RegExp(`^rgba\\(${tr},${tr},${tr},${di}\\)$`), eM = new RegExp(`^hsl\\(${di},${tr},${tr}\\)$`), tM = new RegExp(`^hsla\\(${di},${tr},${tr},${di}\\)$`), dv = {
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
Zp(Gi, hi, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: hv,
  // Deprecated! Use color.formatHex.
  formatHex: hv,
  formatHex8: rM,
  formatHsl: nM,
  formatRgb: pv,
  toString: pv
});
function hv() {
  return this.rgb().formatHex();
}
function rM() {
  return this.rgb().formatHex8();
}
function nM() {
  return IA(this).formatHsl();
}
function pv() {
  return this.rgb().formatRgb();
}
function hi(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = V6.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? mv(t) : r === 3 ? new gt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? ou(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? ou(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = X6.exec(e)) ? new gt(t[1], t[2], t[3], 1) : (t = Q6.exec(e)) ? new gt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Z6.exec(e)) ? ou(t[1], t[2], t[3], t[4]) : (t = J6.exec(e)) ? ou(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = eM.exec(e)) ? gv(t[1], t[2] / 100, t[3] / 100, 1) : (t = tM.exec(e)) ? gv(t[1], t[2] / 100, t[3] / 100, t[4]) : dv.hasOwnProperty(e) ? mv(dv[e]) : e === "transparent" ? new gt(NaN, NaN, NaN, 0) : null;
}
function mv(e) {
  return new gt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ou(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new gt(e, t, r, n);
}
function aM(e) {
  return e instanceof Gi || (e = hi(e)), e ? (e = e.rgb(), new gt(e.r, e.g, e.b, e.opacity)) : new gt();
}
function yh(e, t, r, n) {
  return arguments.length === 1 ? aM(e) : new gt(e, t, r, n ?? 1);
}
function gt(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
Zp(gt, yh, PA(Gi, {
  brighter(e) {
    return e = e == null ? Fu : Math.pow(Fu, e), new gt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? fi : Math.pow(fi, e), new gt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new gt(cn(this.r), cn(this.g), cn(this.b), $u(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: yv,
  // Deprecated! Use color.formatHex.
  formatHex: yv,
  formatHex8: iM,
  formatRgb: bv,
  toString: bv
}));
function yv() {
  return `#${tn(this.r)}${tn(this.g)}${tn(this.b)}`;
}
function iM() {
  return `#${tn(this.r)}${tn(this.g)}${tn(this.b)}${tn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function bv() {
  const e = $u(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${cn(this.r)}, ${cn(this.g)}, ${cn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function $u(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function cn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function tn(e) {
  return e = cn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function gv(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new qt(e, t, r, n);
}
function IA(e) {
  if (e instanceof qt) return new qt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Gi || (e = hi(e)), !e) return new qt();
  if (e instanceof qt) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, a = Math.min(t, r, n), i = Math.max(t, r, n), u = NaN, o = i - a, s = (i + a) / 2;
  return o ? (t === i ? u = (r - n) / o + (r < n) * 6 : r === i ? u = (n - t) / o + 2 : u = (t - r) / o + 4, o /= s < 0.5 ? i + a : 2 - i - a, u *= 60) : o = s > 0 && s < 1 ? 0 : u, new qt(u, o, s, e.opacity);
}
function uM(e, t, r, n) {
  return arguments.length === 1 ? IA(e) : new qt(e, t, r, n ?? 1);
}
function qt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
Zp(qt, uM, PA(Gi, {
  brighter(e) {
    return e = e == null ? Fu : Math.pow(Fu, e), new qt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? fi : Math.pow(fi, e), new qt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, a = 2 * r - n;
    return new gt(
      Lf(e >= 240 ? e - 240 : e + 120, a, n),
      Lf(e, a, n),
      Lf(e < 120 ? e + 240 : e - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new qt(vv(this.h), su(this.s), su(this.l), $u(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = $u(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${vv(this.h)}, ${su(this.s) * 100}%, ${su(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function vv(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function su(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Lf(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const Jp = (e) => () => e;
function oM(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function sM(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function cM(e) {
  return (e = +e) == 1 ? CA : function(t, r) {
    return r - t ? sM(t, r, e) : Jp(isNaN(t) ? r : t);
  };
}
function CA(e, t) {
  var r = t - e;
  return r ? oM(e, r) : Jp(isNaN(e) ? t : e);
}
const Ev = (function e(t) {
  var r = cM(t);
  function n(a, i) {
    var u = r((a = yh(a)).r, (i = yh(i)).r), o = r(a.g, i.g), s = r(a.b, i.b), c = CA(a.opacity, i.opacity);
    return function(l) {
      return a.r = u(l), a.g = o(l), a.b = s(l), a.opacity = c(l), a + "";
    };
  }
  return n.gamma = e, n;
})(1);
function lM(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), a;
  return function(i) {
    for (a = 0; a < r; ++a) n[a] = e[a] * (1 - i) + t[a] * i;
    return n;
  };
}
function fM(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function dM(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, a = new Array(n), i = new Array(r), u;
  for (u = 0; u < n; ++u) a[u] = Aa(e[u], t[u]);
  for (; u < r; ++u) i[u] = t[u];
  return function(o) {
    for (u = 0; u < n; ++u) i[u] = a[u](o);
    return i;
  };
}
function hM(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function Uu(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function pM(e, t) {
  var r = {}, n = {}, a;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in e ? r[a] = Aa(e[a], t[a]) : n[a] = t[a];
  return function(i) {
    for (a in r) n[a] = r[a](i);
    return n;
  };
}
var bh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, kf = new RegExp(bh.source, "g");
function mM(e) {
  return function() {
    return e;
  };
}
function yM(e) {
  return function(t) {
    return e(t) + "";
  };
}
function bM(e, t) {
  var r = bh.lastIndex = kf.lastIndex = 0, n, a, i, u = -1, o = [], s = [];
  for (e = e + "", t = t + ""; (n = bh.exec(e)) && (a = kf.exec(t)); )
    (i = a.index) > r && (i = t.slice(r, i), o[u] ? o[u] += i : o[++u] = i), (n = n[0]) === (a = a[0]) ? o[u] ? o[u] += a : o[++u] = a : (o[++u] = null, s.push({ i: u, x: Uu(n, a) })), r = kf.lastIndex;
  return r < t.length && (i = t.slice(r), o[u] ? o[u] += i : o[++u] = i), o.length < 2 ? s[0] ? yM(s[0].x) : mM(t) : (t = s.length, function(c) {
    for (var l = 0, f; l < t; ++l) o[(f = s[l]).i] = f.x(c);
    return o.join("");
  });
}
function Aa(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? Jp(t) : (r === "number" ? Uu : r === "string" ? (n = hi(t)) ? (t = n, Ev) : bM : t instanceof hi ? Ev : t instanceof Date ? hM : fM(t) ? lM : Array.isArray(t) ? dM : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? pM : Uu)(e, t);
}
function e0(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function gM(e, t) {
  t === void 0 && (t = e, e = Aa);
  for (var r = 0, n = t.length - 1, a = t[0], i = new Array(n < 0 ? 0 : n); r < n; ) i[r] = e(a, a = t[++r]);
  return function(u) {
    var o = Math.max(0, Math.min(n - 1, Math.floor(u *= n)));
    return i[o](u - o);
  };
}
function vM(e) {
  return function() {
    return e;
  };
}
function Hu(e) {
  return +e;
}
var Tv = [0, 1];
function pt(e) {
  return e;
}
function gh(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : vM(isNaN(t) ? NaN : 0.5);
}
function EM(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function TM(e, t, r) {
  var n = e[0], a = e[1], i = t[0], u = t[1];
  return a < n ? (n = gh(a, n), i = r(u, i)) : (n = gh(n, a), i = r(i, u)), function(o) {
    return i(n(o));
  };
}
function _M(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, a = new Array(n), i = new Array(n), u = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++u < n; )
    a[u] = gh(e[u], e[u + 1]), i[u] = r(t[u], t[u + 1]);
  return function(o) {
    var s = Yi(e, o, 1, n) - 1;
    return i[s](a[s](o));
  };
}
function Ki(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function zo() {
  var e = Tv, t = Tv, r = Aa, n, a, i, u = pt, o, s, c;
  function l() {
    var h = Math.min(e.length, t.length);
    return u !== pt && (u = EM(e[0], e[h - 1])), o = h > 2 ? _M : TM, s = c = null, f;
  }
  function f(h) {
    return h == null || isNaN(h = +h) ? i : (s || (s = o(e.map(n), t, r)))(n(u(h)));
  }
  return f.invert = function(h) {
    return u(a((c || (c = o(t, e.map(n), Uu)))(h)));
  }, f.domain = function(h) {
    return arguments.length ? (e = Array.from(h, Hu), l()) : e.slice();
  }, f.range = function(h) {
    return arguments.length ? (t = Array.from(h), l()) : t.slice();
  }, f.rangeRound = function(h) {
    return t = Array.from(h), r = e0, l();
  }, f.clamp = function(h) {
    return arguments.length ? (u = h ? !0 : pt, l()) : u !== pt;
  }, f.interpolate = function(h) {
    return arguments.length ? (r = h, l()) : r;
  }, f.unknown = function(h) {
    return arguments.length ? (i = h, f) : i;
  }, function(h, p) {
    return n = h, a = p, l();
  };
}
function t0() {
  return zo()(pt, pt);
}
function AM(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function qu(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function Zn(e) {
  return e = qu(Math.abs(e)), e ? e[1] : NaN;
}
function OM(e, t) {
  return function(r, n) {
    for (var a = r.length, i = [], u = 0, o = e[0], s = 0; a > 0 && o > 0 && (s + o + 1 > n && (o = Math.max(1, n - s)), i.push(r.substring(a -= o, a + o)), !((s += o + 1) > n)); )
      o = e[u = (u + 1) % e.length];
    return i.reverse().join(t);
  };
}
function SM(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var xM = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function pi(e) {
  if (!(t = xM.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new r0({
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
pi.prototype = r0.prototype;
function r0(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
r0.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function wM(e) {
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
var Wu;
function PM(e, t) {
  var r = qu(e, t);
  if (!r) return Wu = void 0, e.toPrecision(t);
  var n = r[0], a = r[1], i = a - (Wu = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, u = n.length;
  return i === u ? n : i > u ? n + new Array(i - u + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + qu(e, Math.max(0, t + i - 1))[0];
}
function _v(e, t) {
  var r = qu(e, t);
  if (!r) return e + "";
  var n = r[0], a = r[1];
  return a < 0 ? "0." + new Array(-a).join("0") + n : n.length > a + 1 ? n.slice(0, a + 1) + "." + n.slice(a + 1) : n + new Array(a - n.length + 2).join("0");
}
const Av = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: AM,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => _v(e * 100, t),
  r: _v,
  s: PM,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Ov(e) {
  return e;
}
var Sv = Array.prototype.map, xv = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function IM(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Ov : OM(Sv.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", a = e.decimal === void 0 ? "." : e.decimal + "", i = e.numerals === void 0 ? Ov : SM(Sv.call(e.numerals, String)), u = e.percent === void 0 ? "%" : e.percent + "", o = e.minus === void 0 ? "−" : e.minus + "", s = e.nan === void 0 ? "NaN" : e.nan + "";
  function c(f, h) {
    f = pi(f);
    var p = f.fill, g = f.align, y = f.sign, m = f.symbol, E = f.zero, v = f.width, _ = f.comma, A = f.precision, b = f.trim, T = f.type;
    T === "n" ? (_ = !0, T = "g") : Av[T] || (A === void 0 && (A = 12), b = !0, T = "g"), (E || p === "0" && g === "=") && (E = !0, p = "0", g = "=");
    var O = (h && h.prefix !== void 0 ? h.prefix : "") + (m === "$" ? r : m === "#" && /[boxX]/.test(T) ? "0" + T.toLowerCase() : ""), P = (m === "$" ? n : /[%p]/.test(T) ? u : "") + (h && h.suffix !== void 0 ? h.suffix : ""), N = Av[T], j = /[defgprs%]/.test(T);
    A = A === void 0 ? 6 : /[gprs]/.test(T) ? Math.max(1, Math.min(21, A)) : Math.max(0, Math.min(20, A));
    function D(R) {
      var B = O, F = P, $, q, Y;
      if (T === "c")
        F = N(R) + F, R = "";
      else {
        R = +R;
        var Q = R < 0 || 1 / R < 0;
        if (R = isNaN(R) ? s : N(Math.abs(R), A), b && (R = wM(R)), Q && +R == 0 && y !== "+" && (Q = !1), B = (Q ? y === "(" ? y : o : y === "-" || y === "(" ? "" : y) + B, F = (T === "s" && !isNaN(R) && Wu !== void 0 ? xv[8 + Wu / 3] : "") + F + (Q && y === "(" ? ")" : ""), j) {
          for ($ = -1, q = R.length; ++$ < q; )
            if (Y = R.charCodeAt($), 48 > Y || Y > 57) {
              F = (Y === 46 ? a + R.slice($ + 1) : R.slice($)) + F, R = R.slice(0, $);
              break;
            }
        }
      }
      _ && !E && (R = t(R, 1 / 0));
      var te = B.length + R.length + F.length, k = te < v ? new Array(v - te + 1).join(p) : "";
      switch (_ && E && (R = t(k + R, k.length ? v - F.length : 1 / 0), k = ""), g) {
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
    var p = Math.max(-8, Math.min(8, Math.floor(Zn(h) / 3))) * 3, g = Math.pow(10, -p), y = c((f = pi(f), f.type = "f", f), { suffix: xv[8 + p / 3] });
    return function(m) {
      return y(g * m);
    };
  }
  return {
    format: c,
    formatPrefix: l
  };
}
var cu, n0, NA;
CM({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function CM(e) {
  return cu = IM(e), n0 = cu.format, NA = cu.formatPrefix, cu;
}
function NM(e) {
  return Math.max(0, -Zn(Math.abs(e)));
}
function RM(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Zn(t) / 3))) * 3 - Zn(Math.abs(e)));
}
function DM(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Zn(t) - Zn(e)) + 1;
}
function RA(e, t, r, n) {
  var a = ph(e, t, r), i;
  switch (n = pi(n ?? ",f"), n.type) {
    case "s": {
      var u = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(i = RM(a, u)) && (n.precision = i), NA(n, u);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = DM(a, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = i - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = NM(a)) && (n.precision = i - (n.type === "%") * 2);
      break;
    }
  }
  return n0(n);
}
function Wr(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return dh(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var a = t();
    return RA(a[0], a[a.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), a = 0, i = n.length - 1, u = n[a], o = n[i], s, c, l = 10;
    for (o < u && (c = u, u = o, o = c, c = a, a = i, i = c); l-- > 0; ) {
      if (c = hh(u, o, r), c === s)
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
function Yu() {
  var e = t0();
  return e.copy = function() {
    return Ki(e, Yu());
  }, $t.apply(e, arguments), Wr(e);
}
function DA(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, Hu), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return DA(e).unknown(t);
  }, e = arguments.length ? Array.from(e, Hu) : [0, 1], Wr(r);
}
function MA(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, a = e[r], i = e[n], u;
  return i < a && (u = r, r = n, n = u, u = a, a = i, i = u), e[r] = t.floor(a), e[n] = t.ceil(i), e;
}
function wv(e) {
  return Math.log(e);
}
function Pv(e) {
  return Math.exp(e);
}
function MM(e) {
  return -Math.log(-e);
}
function LM(e) {
  return -Math.exp(-e);
}
function kM(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function BM(e) {
  return e === 10 ? kM : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function jM(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function Iv(e) {
  return (t, r) => -e(-t, r);
}
function a0(e) {
  const t = e(wv, Pv), r = t.domain;
  let n = 10, a, i;
  function u() {
    return a = jM(n), i = BM(n), r()[0] < 0 ? (a = Iv(a), i = Iv(i), e(MM, LM)) : e(wv, Pv), t;
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
    let h = a(c), p = a(l), g, y;
    const m = o == null ? 10 : +o;
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
      E.length * 2 < m && (E = dh(c, l, m));
    } else
      E = dh(h, p, Math.min(p - h, m)).map(i);
    return f ? E.reverse() : E;
  }, t.tickFormat = (o, s) => {
    if (o == null && (o = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = pi(s)).precision == null && (s.trim = !0), s = n0(s)), o === 1 / 0) return s;
    const c = Math.max(1, n * o / t.ticks().length);
    return (l) => {
      let f = l / i(Math.round(a(l)));
      return f * n < n - 0.5 && (f *= n), f <= c ? s(l) : "";
    };
  }, t.nice = () => r(MA(r(), {
    floor: (o) => i(Math.floor(a(o))),
    ceil: (o) => i(Math.ceil(a(o)))
  })), t;
}
function LA() {
  const e = a0(zo()).domain([1, 10]);
  return e.copy = () => Ki(e, LA()).base(e.base()), $t.apply(e, arguments), e;
}
function Cv(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function Nv(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function i0(e) {
  var t = 1, r = e(Cv(t), Nv(t));
  return r.constant = function(n) {
    return arguments.length ? e(Cv(t = +n), Nv(t)) : t;
  }, Wr(r);
}
function kA() {
  var e = i0(zo());
  return e.copy = function() {
    return Ki(e, kA()).constant(e.constant());
  }, $t.apply(e, arguments);
}
function Rv(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function FM(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function $M(e) {
  return e < 0 ? -e * e : e * e;
}
function u0(e) {
  var t = e(pt, pt), r = 1;
  function n() {
    return r === 1 ? e(pt, pt) : r === 0.5 ? e(FM, $M) : e(Rv(r), Rv(1 / r));
  }
  return t.exponent = function(a) {
    return arguments.length ? (r = +a, n()) : r;
  }, Wr(t);
}
function o0() {
  var e = u0(zo());
  return e.copy = function() {
    return Ki(e, o0()).exponent(e.exponent());
  }, $t.apply(e, arguments), e;
}
function UM() {
  return o0.apply(null, arguments).exponent(0.5);
}
function Dv(e) {
  return Math.sign(e) * e * e;
}
function HM(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function BA() {
  var e = t0(), t = [0, 1], r = !1, n;
  function a(i) {
    var u = HM(e(i));
    return isNaN(u) ? n : r ? Math.round(u) : u;
  }
  return a.invert = function(i) {
    return e.invert(Dv(i));
  }, a.domain = function(i) {
    return arguments.length ? (e.domain(i), a) : e.domain();
  }, a.range = function(i) {
    return arguments.length ? (e.range((t = Array.from(i, Hu)).map(Dv)), a) : t.slice();
  }, a.rangeRound = function(i) {
    return a.range(i).round(!0);
  }, a.round = function(i) {
    return arguments.length ? (r = !!i, a) : r;
  }, a.clamp = function(i) {
    return arguments.length ? (e.clamp(i), a) : e.clamp();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return BA(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, $t.apply(a, arguments), Wr(a);
}
function jA() {
  var e = [], t = [], r = [], n;
  function a() {
    var u = 0, o = Math.max(1, t.length);
    for (r = new Array(o - 1); ++u < o; ) r[u - 1] = K6(e, u / o);
    return i;
  }
  function i(u) {
    return u == null || isNaN(u = +u) ? n : t[Yi(r, u)];
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
    return e.sort(Fr), a();
  }, i.range = function(u) {
    return arguments.length ? (t = Array.from(u), a()) : t.slice();
  }, i.unknown = function(u) {
    return arguments.length ? (n = u, i) : n;
  }, i.quantiles = function() {
    return r.slice();
  }, i.copy = function() {
    return jA().domain(e).range(t).unknown(n);
  }, $t.apply(i, arguments);
}
function FA() {
  var e = 0, t = 1, r = 1, n = [0.5], a = [0, 1], i;
  function u(s) {
    return s != null && s <= s ? a[Yi(n, s, 0, r)] : i;
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
    return FA().domain([e, t]).range(a).unknown(i);
  }, $t.apply(Wr(u), arguments);
}
function $A() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function a(i) {
    return i != null && i <= i ? t[Yi(e, i, 0, n)] : r;
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
    return $A().domain(e).range(t).unknown(r);
  }, $t.apply(a, arguments);
}
const Bf = /* @__PURE__ */ new Date(), jf = /* @__PURE__ */ new Date();
function ze(e, t, r, n) {
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
  }, a.filter = (i) => ze((u) => {
    if (u >= u) for (; e(u), !i(u); ) u.setTime(u - 1);
  }, (u, o) => {
    if (u >= u)
      if (o < 0) for (; ++o <= 0; )
        for (; t(u, -1), !i(u); )
          ;
      else for (; --o >= 0; )
        for (; t(u, 1), !i(u); )
          ;
  }), r && (a.count = (i, u) => (Bf.setTime(+i), jf.setTime(+u), e(Bf), e(jf), Math.floor(r(Bf, jf))), a.every = (i) => (i = Math.floor(i), !isFinite(i) || !(i > 0) ? null : i > 1 ? a.filter(n ? (u) => n(u) % i === 0 : (u) => a.count(0, u) % i === 0) : a)), a;
}
const Gu = ze(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Gu.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? ze((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : Gu);
Gu.range;
const hr = 1e3, Mt = hr * 60, pr = Mt * 60, Tr = pr * 24, s0 = Tr * 7, Mv = Tr * 30, Ff = Tr * 365, rn = ze((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * hr);
}, (e, t) => (t - e) / hr, (e) => e.getUTCSeconds());
rn.range;
const c0 = ze((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * hr);
}, (e, t) => {
  e.setTime(+e + t * Mt);
}, (e, t) => (t - e) / Mt, (e) => e.getMinutes());
c0.range;
const l0 = ze((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * Mt);
}, (e, t) => (t - e) / Mt, (e) => e.getUTCMinutes());
l0.range;
const f0 = ze((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * hr - e.getMinutes() * Mt);
}, (e, t) => {
  e.setTime(+e + t * pr);
}, (e, t) => (t - e) / pr, (e) => e.getHours());
f0.range;
const d0 = ze((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * pr);
}, (e, t) => (t - e) / pr, (e) => e.getUTCHours());
d0.range;
const zi = ze(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Mt) / Tr,
  (e) => e.getDate() - 1
);
zi.range;
const Vo = ze((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Tr, (e) => e.getUTCDate() - 1);
Vo.range;
const UA = ze((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Tr, (e) => Math.floor(e / Tr));
UA.range;
function _n(e) {
  return ze((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Mt) / s0);
}
const Xo = _n(0), Ku = _n(1), qM = _n(2), WM = _n(3), Jn = _n(4), YM = _n(5), GM = _n(6);
Xo.range;
Ku.range;
qM.range;
WM.range;
Jn.range;
YM.range;
GM.range;
function An(e) {
  return ze((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / s0);
}
const Qo = An(0), zu = An(1), KM = An(2), zM = An(3), ea = An(4), VM = An(5), XM = An(6);
Qo.range;
zu.range;
KM.range;
zM.range;
ea.range;
VM.range;
XM.range;
const h0 = ze((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
h0.range;
const p0 = ze((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
p0.range;
const _r = ze((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
_r.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : ze((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
_r.range;
const Ar = ze((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Ar.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : ze((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
Ar.range;
function HA(e, t, r, n, a, i) {
  const u = [
    [rn, 1, hr],
    [rn, 5, 5 * hr],
    [rn, 15, 15 * hr],
    [rn, 30, 30 * hr],
    [i, 1, Mt],
    [i, 5, 5 * Mt],
    [i, 15, 15 * Mt],
    [i, 30, 30 * Mt],
    [a, 1, pr],
    [a, 3, 3 * pr],
    [a, 6, 6 * pr],
    [a, 12, 12 * pr],
    [n, 1, Tr],
    [n, 2, 2 * Tr],
    [r, 1, s0],
    [t, 1, Mv],
    [t, 3, 3 * Mv],
    [e, 1, Ff]
  ];
  function o(c, l, f) {
    const h = l < c;
    h && ([c, l] = [l, c]);
    const p = f && typeof f.range == "function" ? f : s(c, l, f), g = p ? p.range(c, +l + 1) : [];
    return h ? g.reverse() : g;
  }
  function s(c, l, f) {
    const h = Math.abs(l - c) / f, p = Xp(([, , m]) => m).right(u, h);
    if (p === u.length) return e.every(ph(c / Ff, l / Ff, f));
    if (p === 0) return Gu.every(Math.max(ph(c, l, f), 1));
    const [g, y] = u[h / u[p - 1][2] < u[p][2] / h ? p - 1 : p];
    return g.every(y);
  }
  return [o, s];
}
const [QM, ZM] = HA(Ar, p0, Qo, UA, d0, l0), [JM, eL] = HA(_r, h0, Xo, zi, f0, c0);
function $f(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Uf(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Na(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function tL(e) {
  var t = e.dateTime, r = e.date, n = e.time, a = e.periods, i = e.days, u = e.shortDays, o = e.months, s = e.shortMonths, c = Ra(a), l = Da(a), f = Ra(i), h = Da(i), p = Ra(u), g = Da(u), y = Ra(o), m = Da(o), E = Ra(s), v = Da(s), _ = {
    a: Y,
    A: Q,
    b: te,
    B: k,
    c: null,
    d: $v,
    e: $v,
    f: OL,
    g: ML,
    G: kL,
    H: TL,
    I: _L,
    j: AL,
    L: qA,
    m: SL,
    M: xL,
    p: W,
    q: G,
    Q: qv,
    s: Wv,
    S: wL,
    u: PL,
    U: IL,
    V: CL,
    w: NL,
    W: RL,
    x: null,
    X: null,
    y: DL,
    Y: LL,
    Z: BL,
    "%": Hv
  }, A = {
    a: Z,
    A: ne,
    b: ue,
    B: oe,
    c: null,
    d: Uv,
    e: Uv,
    f: UL,
    g: QL,
    G: JL,
    H: jL,
    I: FL,
    j: $L,
    L: YA,
    m: HL,
    M: qL,
    p: fe,
    q: ce,
    Q: qv,
    s: Wv,
    S: WL,
    u: YL,
    U: GL,
    V: KL,
    w: zL,
    W: VL,
    x: null,
    X: null,
    y: XL,
    Y: ZL,
    Z: ek,
    "%": Hv
  }, b = {
    a: j,
    A: D,
    b: R,
    B,
    c: F,
    d: jv,
    e: jv,
    f: bL,
    g: Bv,
    G: kv,
    H: Fv,
    I: Fv,
    j: hL,
    L: yL,
    m: dL,
    M: pL,
    p: N,
    q: fL,
    Q: vL,
    s: EL,
    S: mL,
    u: uL,
    U: oL,
    V: sL,
    w: iL,
    W: cL,
    x: $,
    X: q,
    y: Bv,
    Y: kv,
    Z: lL,
    "%": gL
  };
  _.x = T(r, _), _.X = T(n, _), _.c = T(t, _), A.x = T(r, A), A.X = T(n, A), A.c = T(t, A);
  function T(K, re) {
    return function(ie) {
      var M = [], ye = -1, X = 0, Pe = K.length, De, et, Ir;
      for (ie instanceof Date || (ie = /* @__PURE__ */ new Date(+ie)); ++ye < Pe; )
        K.charCodeAt(ye) === 37 && (M.push(K.slice(X, ye)), (et = Lv[De = K.charAt(++ye)]) != null ? De = K.charAt(++ye) : et = De === "e" ? " " : "0", (Ir = re[De]) && (De = Ir(ie, et)), M.push(De), X = ye + 1);
      return M.push(K.slice(X, ye)), M.join("");
    };
  }
  function O(K, re) {
    return function(ie) {
      var M = Na(1900, void 0, 1), ye = P(M, K, ie += "", 0), X, Pe;
      if (ye != ie.length) return null;
      if ("Q" in M) return new Date(M.Q);
      if ("s" in M) return new Date(M.s * 1e3 + ("L" in M ? M.L : 0));
      if (re && !("Z" in M) && (M.Z = 0), "p" in M && (M.H = M.H % 12 + M.p * 12), M.m === void 0 && (M.m = "q" in M ? M.q : 0), "V" in M) {
        if (M.V < 1 || M.V > 53) return null;
        "w" in M || (M.w = 1), "Z" in M ? (X = Uf(Na(M.y, 0, 1)), Pe = X.getUTCDay(), X = Pe > 4 || Pe === 0 ? zu.ceil(X) : zu(X), X = Vo.offset(X, (M.V - 1) * 7), M.y = X.getUTCFullYear(), M.m = X.getUTCMonth(), M.d = X.getUTCDate() + (M.w + 6) % 7) : (X = $f(Na(M.y, 0, 1)), Pe = X.getDay(), X = Pe > 4 || Pe === 0 ? Ku.ceil(X) : Ku(X), X = zi.offset(X, (M.V - 1) * 7), M.y = X.getFullYear(), M.m = X.getMonth(), M.d = X.getDate() + (M.w + 6) % 7);
      } else ("W" in M || "U" in M) && ("w" in M || (M.w = "u" in M ? M.u % 7 : "W" in M ? 1 : 0), Pe = "Z" in M ? Uf(Na(M.y, 0, 1)).getUTCDay() : $f(Na(M.y, 0, 1)).getDay(), M.m = 0, M.d = "W" in M ? (M.w + 6) % 7 + M.W * 7 - (Pe + 5) % 7 : M.w + M.U * 7 - (Pe + 6) % 7);
      return "Z" in M ? (M.H += M.Z / 100 | 0, M.M += M.Z % 100, Uf(M)) : $f(M);
    };
  }
  function P(K, re, ie, M) {
    for (var ye = 0, X = re.length, Pe = ie.length, De, et; ye < X; ) {
      if (M >= Pe) return -1;
      if (De = re.charCodeAt(ye++), De === 37) {
        if (De = re.charAt(ye++), et = b[De in Lv ? re.charAt(ye++) : De], !et || (M = et(K, ie, M)) < 0) return -1;
      } else if (De != ie.charCodeAt(M++))
        return -1;
    }
    return M;
  }
  function N(K, re, ie) {
    var M = c.exec(re.slice(ie));
    return M ? (K.p = l.get(M[0].toLowerCase()), ie + M[0].length) : -1;
  }
  function j(K, re, ie) {
    var M = p.exec(re.slice(ie));
    return M ? (K.w = g.get(M[0].toLowerCase()), ie + M[0].length) : -1;
  }
  function D(K, re, ie) {
    var M = f.exec(re.slice(ie));
    return M ? (K.w = h.get(M[0].toLowerCase()), ie + M[0].length) : -1;
  }
  function R(K, re, ie) {
    var M = E.exec(re.slice(ie));
    return M ? (K.m = v.get(M[0].toLowerCase()), ie + M[0].length) : -1;
  }
  function B(K, re, ie) {
    var M = y.exec(re.slice(ie));
    return M ? (K.m = m.get(M[0].toLowerCase()), ie + M[0].length) : -1;
  }
  function F(K, re, ie) {
    return P(K, t, re, ie);
  }
  function $(K, re, ie) {
    return P(K, r, re, ie);
  }
  function q(K, re, ie) {
    return P(K, n, re, ie);
  }
  function Y(K) {
    return u[K.getDay()];
  }
  function Q(K) {
    return i[K.getDay()];
  }
  function te(K) {
    return s[K.getMonth()];
  }
  function k(K) {
    return o[K.getMonth()];
  }
  function W(K) {
    return a[+(K.getHours() >= 12)];
  }
  function G(K) {
    return 1 + ~~(K.getMonth() / 3);
  }
  function Z(K) {
    return u[K.getUTCDay()];
  }
  function ne(K) {
    return i[K.getUTCDay()];
  }
  function ue(K) {
    return s[K.getUTCMonth()];
  }
  function oe(K) {
    return o[K.getUTCMonth()];
  }
  function fe(K) {
    return a[+(K.getUTCHours() >= 12)];
  }
  function ce(K) {
    return 1 + ~~(K.getUTCMonth() / 3);
  }
  return {
    format: function(K) {
      var re = T(K += "", _);
      return re.toString = function() {
        return K;
      }, re;
    },
    parse: function(K) {
      var re = O(K += "", !1);
      return re.toString = function() {
        return K;
      }, re;
    },
    utcFormat: function(K) {
      var re = T(K += "", A);
      return re.toString = function() {
        return K;
      }, re;
    },
    utcParse: function(K) {
      var re = O(K += "", !0);
      return re.toString = function() {
        return K;
      }, re;
    }
  };
}
var Lv = { "-": "", _: " ", 0: "0" }, Je = /^\s*\d+/, rL = /^%/, nL = /[\\^$*+?|[\]().{}]/g;
function ge(e, t, r) {
  var n = e < 0 ? "-" : "", a = (n ? -e : e) + "", i = a.length;
  return n + (i < r ? new Array(r - i + 1).join(t) + a : a);
}
function aL(e) {
  return e.replace(nL, "\\$&");
}
function Ra(e) {
  return new RegExp("^(?:" + e.map(aL).join("|") + ")", "i");
}
function Da(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function iL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function uL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function oL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function sL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function cL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function kv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function Bv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function lL(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function fL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function dL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function jv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function hL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function Fv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function pL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function mL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function yL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function bL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function gL(e, t, r) {
  var n = rL.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function vL(e, t, r) {
  var n = Je.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function EL(e, t, r) {
  var n = Je.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function $v(e, t) {
  return ge(e.getDate(), t, 2);
}
function TL(e, t) {
  return ge(e.getHours(), t, 2);
}
function _L(e, t) {
  return ge(e.getHours() % 12 || 12, t, 2);
}
function AL(e, t) {
  return ge(1 + zi.count(_r(e), e), t, 3);
}
function qA(e, t) {
  return ge(e.getMilliseconds(), t, 3);
}
function OL(e, t) {
  return qA(e, t) + "000";
}
function SL(e, t) {
  return ge(e.getMonth() + 1, t, 2);
}
function xL(e, t) {
  return ge(e.getMinutes(), t, 2);
}
function wL(e, t) {
  return ge(e.getSeconds(), t, 2);
}
function PL(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function IL(e, t) {
  return ge(Xo.count(_r(e) - 1, e), t, 2);
}
function WA(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Jn(e) : Jn.ceil(e);
}
function CL(e, t) {
  return e = WA(e), ge(Jn.count(_r(e), e) + (_r(e).getDay() === 4), t, 2);
}
function NL(e) {
  return e.getDay();
}
function RL(e, t) {
  return ge(Ku.count(_r(e) - 1, e), t, 2);
}
function DL(e, t) {
  return ge(e.getFullYear() % 100, t, 2);
}
function ML(e, t) {
  return e = WA(e), ge(e.getFullYear() % 100, t, 2);
}
function LL(e, t) {
  return ge(e.getFullYear() % 1e4, t, 4);
}
function kL(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? Jn(e) : Jn.ceil(e), ge(e.getFullYear() % 1e4, t, 4);
}
function BL(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + ge(t / 60 | 0, "0", 2) + ge(t % 60, "0", 2);
}
function Uv(e, t) {
  return ge(e.getUTCDate(), t, 2);
}
function jL(e, t) {
  return ge(e.getUTCHours(), t, 2);
}
function FL(e, t) {
  return ge(e.getUTCHours() % 12 || 12, t, 2);
}
function $L(e, t) {
  return ge(1 + Vo.count(Ar(e), e), t, 3);
}
function YA(e, t) {
  return ge(e.getUTCMilliseconds(), t, 3);
}
function UL(e, t) {
  return YA(e, t) + "000";
}
function HL(e, t) {
  return ge(e.getUTCMonth() + 1, t, 2);
}
function qL(e, t) {
  return ge(e.getUTCMinutes(), t, 2);
}
function WL(e, t) {
  return ge(e.getUTCSeconds(), t, 2);
}
function YL(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function GL(e, t) {
  return ge(Qo.count(Ar(e) - 1, e), t, 2);
}
function GA(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? ea(e) : ea.ceil(e);
}
function KL(e, t) {
  return e = GA(e), ge(ea.count(Ar(e), e) + (Ar(e).getUTCDay() === 4), t, 2);
}
function zL(e) {
  return e.getUTCDay();
}
function VL(e, t) {
  return ge(zu.count(Ar(e) - 1, e), t, 2);
}
function XL(e, t) {
  return ge(e.getUTCFullYear() % 100, t, 2);
}
function QL(e, t) {
  return e = GA(e), ge(e.getUTCFullYear() % 100, t, 2);
}
function ZL(e, t) {
  return ge(e.getUTCFullYear() % 1e4, t, 4);
}
function JL(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? ea(e) : ea.ceil(e), ge(e.getUTCFullYear() % 1e4, t, 4);
}
function ek() {
  return "+0000";
}
function Hv() {
  return "%";
}
function qv(e) {
  return +e;
}
function Wv(e) {
  return Math.floor(+e / 1e3);
}
var In, KA, zA;
tk({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function tk(e) {
  return In = tL(e), KA = In.format, In.parse, zA = In.utcFormat, In.utcParse, In;
}
function rk(e) {
  return new Date(e);
}
function nk(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function m0(e, t, r, n, a, i, u, o, s, c) {
  var l = t0(), f = l.invert, h = l.domain, p = c(".%L"), g = c(":%S"), y = c("%I:%M"), m = c("%I %p"), E = c("%a %d"), v = c("%b %d"), _ = c("%B"), A = c("%Y");
  function b(T) {
    return (s(T) < T ? p : o(T) < T ? g : u(T) < T ? y : i(T) < T ? m : n(T) < T ? a(T) < T ? E : v : r(T) < T ? _ : A)(T);
  }
  return l.invert = function(T) {
    return new Date(f(T));
  }, l.domain = function(T) {
    return arguments.length ? h(Array.from(T, nk)) : h().map(rk);
  }, l.ticks = function(T) {
    var O = h();
    return e(O[0], O[O.length - 1], T ?? 10);
  }, l.tickFormat = function(T, O) {
    return O == null ? b : c(O);
  }, l.nice = function(T) {
    var O = h();
    return (!T || typeof T.range != "function") && (T = t(O[0], O[O.length - 1], T ?? 10)), T ? h(MA(O, T)) : l;
  }, l.copy = function() {
    return Ki(l, m0(e, t, r, n, a, i, u, o, s, c));
  }, l;
}
function ak() {
  return $t.apply(m0(JM, eL, _r, h0, Xo, zi, f0, c0, rn, KA).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function ik() {
  return $t.apply(m0(QM, ZM, Ar, p0, Qo, Vo, d0, l0, rn, zA).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Zo() {
  var e = 0, t = 1, r, n, a, i, u = pt, o = !1, s;
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
      var p, g;
      return arguments.length ? ([p, g] = h, u = f(p, g), c) : [u(0), u(1)];
    };
  }
  return c.range = l(Aa), c.rangeRound = l(e0), c.unknown = function(f) {
    return arguments.length ? (s = f, c) : s;
  }, function(f) {
    return i = f, r = f(e), n = f(t), a = r === n ? 0 : 1 / (n - r), c;
  };
}
function Yr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function VA() {
  var e = Wr(Zo()(pt));
  return e.copy = function() {
    return Yr(e, VA());
  }, wr.apply(e, arguments);
}
function XA() {
  var e = a0(Zo()).domain([1, 10]);
  return e.copy = function() {
    return Yr(e, XA()).base(e.base());
  }, wr.apply(e, arguments);
}
function QA() {
  var e = i0(Zo());
  return e.copy = function() {
    return Yr(e, QA()).constant(e.constant());
  }, wr.apply(e, arguments);
}
function y0() {
  var e = u0(Zo());
  return e.copy = function() {
    return Yr(e, y0()).exponent(e.exponent());
  }, wr.apply(e, arguments);
}
function uk() {
  return y0.apply(null, arguments).exponent(0.5);
}
function ZA() {
  var e = [], t = pt;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Yi(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let a of n) a != null && !isNaN(a = +a) && e.push(a);
    return e.sort(Fr), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, a) => t(a / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (a, i) => G6(e, i / n));
  }, r.copy = function() {
    return ZA(t).domain(e);
  }, wr.apply(r, arguments);
}
function Jo() {
  var e = 0, t = 0.5, r = 1, n = 1, a, i, u, o, s, c = pt, l, f = !1, h;
  function p(y) {
    return isNaN(y = +y) ? h : (y = 0.5 + ((y = +l(y)) - i) * (n * y < n * i ? o : s), c(f ? Math.max(0, Math.min(1, y)) : y));
  }
  p.domain = function(y) {
    return arguments.length ? ([e, t, r] = y, a = l(e = +e), i = l(t = +t), u = l(r = +r), o = a === i ? 0 : 0.5 / (i - a), s = i === u ? 0 : 0.5 / (u - i), n = i < a ? -1 : 1, p) : [e, t, r];
  }, p.clamp = function(y) {
    return arguments.length ? (f = !!y, p) : f;
  }, p.interpolator = function(y) {
    return arguments.length ? (c = y, p) : c;
  };
  function g(y) {
    return function(m) {
      var E, v, _;
      return arguments.length ? ([E, v, _] = m, c = gM(y, [E, v, _]), p) : [c(0), c(0.5), c(1)];
    };
  }
  return p.range = g(Aa), p.rangeRound = g(e0), p.unknown = function(y) {
    return arguments.length ? (h = y, p) : h;
  }, function(y) {
    return l = y, a = y(e), i = y(t), u = y(r), o = a === i ? 0 : 0.5 / (i - a), s = i === u ? 0 : 0.5 / (u - i), n = i < a ? -1 : 1, p;
  };
}
function JA() {
  var e = Wr(Jo()(pt));
  return e.copy = function() {
    return Yr(e, JA());
  }, wr.apply(e, arguments);
}
function eO() {
  var e = a0(Jo()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return Yr(e, eO()).base(e.base());
  }, wr.apply(e, arguments);
}
function tO() {
  var e = i0(Jo());
  return e.copy = function() {
    return Yr(e, tO()).constant(e.constant());
  }, wr.apply(e, arguments);
}
function b0() {
  var e = u0(Jo());
  return e.copy = function() {
    return Yr(e, b0()).exponent(e.exponent());
  }, wr.apply(e, arguments);
}
function ok() {
  return b0.apply(null, arguments).exponent(0.5);
}
const Yv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: li,
  scaleDiverging: JA,
  scaleDivergingLog: eO,
  scaleDivergingPow: b0,
  scaleDivergingSqrt: ok,
  scaleDivergingSymlog: tO,
  scaleIdentity: DA,
  scaleImplicit: mh,
  scaleLinear: Yu,
  scaleLog: LA,
  scaleOrdinal: Qp,
  scalePoint: Va,
  scalePow: o0,
  scaleQuantile: jA,
  scaleQuantize: FA,
  scaleRadial: BA,
  scaleSequential: VA,
  scaleSequentialLog: XA,
  scaleSequentialPow: y0,
  scaleSequentialQuantile: ZA,
  scaleSequentialSqrt: uk,
  scaleSequentialSymlog: QA,
  scaleSqrt: UM,
  scaleSymlog: kA,
  scaleThreshold: $A,
  scaleTime: ak,
  scaleUtc: ik,
  tickFormat: RA
}, Symbol.toStringTag, { value: "Module" }));
var Hf, Gv;
function es() {
  if (Gv) return Hf;
  Gv = 1;
  var e = va();
  function t(r, n, a) {
    for (var i = -1, u = r.length; ++i < u; ) {
      var o = r[i], s = n(o);
      if (s != null && (c === void 0 ? s === s && !e(s) : a(s, c)))
        var c = s, l = o;
    }
    return l;
  }
  return Hf = t, Hf;
}
var qf, Kv;
function rO() {
  if (Kv) return qf;
  Kv = 1;
  function e(t, r) {
    return t > r;
  }
  return qf = e, qf;
}
var Wf, zv;
function sk() {
  if (zv) return Wf;
  zv = 1;
  var e = es(), t = rO(), r = Ta();
  function n(a) {
    return a && a.length ? e(a, r, t) : void 0;
  }
  return Wf = n, Wf;
}
var ck = sk();
const ts = /* @__PURE__ */ xe(ck);
var Yf, Vv;
function nO() {
  if (Vv) return Yf;
  Vv = 1;
  function e(t, r) {
    return t < r;
  }
  return Yf = e, Yf;
}
var Gf, Xv;
function lk() {
  if (Xv) return Gf;
  Xv = 1;
  var e = es(), t = nO(), r = Ta();
  function n(a) {
    return a && a.length ? e(a, r, t) : void 0;
  }
  return Gf = n, Gf;
}
var fk = lk();
const rs = /* @__PURE__ */ xe(fk);
var Kf, Qv;
function dk() {
  if (Qv) return Kf;
  Qv = 1;
  var e = Dp(), t = or(), r = dA(), n = Tt();
  function a(i, u) {
    var o = n(i) ? e : r;
    return o(i, t(u, 3));
  }
  return Kf = a, Kf;
}
var zf, Zv;
function hk() {
  if (Zv) return zf;
  Zv = 1;
  var e = lA(), t = dk();
  function r(n, a) {
    return e(t(n, a), 1);
  }
  return zf = r, zf;
}
var pk = hk();
const mk = /* @__PURE__ */ xe(pk);
var Vf, Jv;
function yk() {
  if (Jv) return Vf;
  Jv = 1;
  var e = Gp();
  function t(r, n) {
    return e(r, n);
  }
  return Vf = t, Vf;
}
var bk = yk();
const ns = /* @__PURE__ */ xe(bk);
var Oa = 1e9, gk = {
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
}, v0, Le = !0, Ft = "[DecimalError] ", ln = Ft + "Invalid argument: ", g0 = Ft + "Exponent out of range: ", Sa = Math.floor, Zr = Math.pow, vk = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Ot, Xe = 1e7, Re = 7, aO = 9007199254740991, Vu = Sa(aO / Re), ae = {};
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
  return vr(this, new this.constructor(e));
};
ae.dividedToIntegerBy = ae.idiv = function(e) {
  var t = this, r = t.constructor;
  return we(vr(t, new r(e), 0, 1), r.precision);
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
  return r.eq(Ot) ? new n(0) : (Le = !1, t = vr(mi(r, i), mi(e, i), i), Le = !0, we(t, a));
};
ae.minus = ae.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? oO(t, e) : iO(t, (e.s = -e.s, e));
};
ae.modulo = ae.mod = function(e) {
  var t, r = this, n = r.constructor, a = n.precision;
  if (e = new n(e), !e.s) throw Error(Ft + "NaN");
  return r.s ? (Le = !1, t = vr(r, e, 0, 1).times(e), Le = !0, r.minus(t)) : we(new n(r), a);
};
ae.naturalExponential = ae.exp = function() {
  return uO(this);
};
ae.naturalLogarithm = ae.ln = function() {
  return mi(this);
};
ae.negated = ae.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
ae.plus = ae.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? iO(t, e) : oO(t, (e.s = -e.s, e));
};
ae.precision = ae.sd = function(e) {
  var t, r, n, a = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(ln + e);
  if (t = He(a) + 1, n = a.d.length - 1, r = n * Re + 1, n = a.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = a.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
ae.squareRoot = ae.sqrt = function() {
  var e, t, r, n, a, i, u, o = this, s = o.constructor;
  if (o.s < 1) {
    if (!o.s) return new s(0);
    throw Error(Ft + "NaN");
  }
  for (e = He(o), Le = !1, a = Math.sqrt(+o), a == 0 || a == 1 / 0 ? (t = er(o.d), (t.length + e) % 2 == 0 && (t += "0"), a = Math.sqrt(t), e = Sa((e + 1) / 2) - (e < 0 || e % 2), a == 1 / 0 ? t = "5e" + e : (t = a.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new s(t)) : n = new s(a.toString()), r = s.precision, a = u = r + 3; ; )
    if (i = n, n = i.plus(vr(o, i, u + 2)).times(0.5), er(i.d).slice(0, u) === (t = er(n.d)).slice(0, u)) {
      if (t = t.slice(u - 3, u + 1), a == u && t == "4999") {
        if (we(i, r + 1, 0), i.times(i).eq(o)) {
          n = i;
          break;
        }
      } else if (t != "9999")
        break;
      u += 4;
    }
  return Le = !0, we(n, r);
};
ae.times = ae.mul = function(e) {
  var t, r, n, a, i, u, o, s, c, l = this, f = l.constructor, h = l.d, p = (e = new f(e)).d;
  if (!l.s || !e.s) return new f(0);
  for (e.s *= l.s, r = l.e + e.e, s = h.length, c = p.length, s < c && (i = h, h = p, p = i, u = s, s = c, c = u), i = [], u = s + c, n = u; n--; ) i.push(0);
  for (n = c; --n >= 0; ) {
    for (t = 0, a = s + n; a > n; )
      o = i[a] + p[n] * h[a - n - 1] + t, i[a--] = o % Xe | 0, t = o / Xe | 0;
    i[a] = (i[a] + t) % Xe | 0;
  }
  for (; !i[--u]; ) i.pop();
  return t ? ++r : i.shift(), e.d = i, e.e = r, Le ? we(e, f.precision) : e;
};
ae.toDecimalPlaces = ae.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (nr(e, 0, Oa), t === void 0 ? t = n.rounding : nr(t, 0, 8), we(r, e + He(r) + 1, t));
};
ae.toExponential = function(e, t) {
  var r, n = this, a = n.constructor;
  return e === void 0 ? r = yn(n, !0) : (nr(e, 0, Oa), t === void 0 ? t = a.rounding : nr(t, 0, 8), n = we(new a(n), e + 1, t), r = yn(n, !0, e + 1)), r;
};
ae.toFixed = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? yn(a) : (nr(e, 0, Oa), t === void 0 ? t = i.rounding : nr(t, 0, 8), n = we(new i(a), e + He(a) + 1, t), r = yn(n.abs(), !1, e + He(n) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
};
ae.toInteger = ae.toint = function() {
  var e = this, t = e.constructor;
  return we(new t(e), He(e) + 1, t.rounding);
};
ae.toNumber = function() {
  return +this;
};
ae.toPower = ae.pow = function(e) {
  var t, r, n, a, i, u, o = this, s = o.constructor, c = 12, l = +(e = new s(e));
  if (!e.s) return new s(Ot);
  if (o = new s(o), !o.s) {
    if (e.s < 1) throw Error(Ft + "Infinity");
    return o;
  }
  if (o.eq(Ot)) return o;
  if (n = s.precision, e.eq(Ot)) return we(o, n);
  if (t = e.e, r = e.d.length - 1, u = t >= r, i = o.s, u) {
    if ((r = l < 0 ? -l : l) <= aO) {
      for (a = new s(Ot), t = Math.ceil(n / Re + 4), Le = !1; r % 2 && (a = a.times(o), t1(a.d, t)), r = Sa(r / 2), r !== 0; )
        o = o.times(o), t1(o.d, t);
      return Le = !0, e.s < 0 ? new s(Ot).div(a) : we(a, n);
    }
  } else if (i < 0) throw Error(Ft + "NaN");
  return i = i < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, o.s = 1, Le = !1, a = e.times(mi(o, n + c)), Le = !0, a = uO(a), a.s = i, a;
};
ae.toPrecision = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? (r = He(a), n = yn(a, r <= i.toExpNeg || r >= i.toExpPos)) : (nr(e, 1, Oa), t === void 0 ? t = i.rounding : nr(t, 0, 8), a = we(new i(a), e, t), r = He(a), n = yn(a, e <= r || r <= i.toExpNeg, e)), n;
};
ae.toSignificantDigits = ae.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (nr(e, 1, Oa), t === void 0 ? t = n.rounding : nr(t, 0, 8)), we(new n(r), e, t);
};
ae.toString = ae.valueOf = ae.val = ae.toJSON = ae[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = He(e), r = e.constructor;
  return yn(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function iO(e, t) {
  var r, n, a, i, u, o, s, c, l = e.constructor, f = l.precision;
  if (!e.s || !t.s)
    return t.s || (t = new l(e)), Le ? we(t, f) : t;
  if (s = e.d, c = t.d, u = e.e, a = t.e, s = s.slice(), i = u - a, i) {
    for (i < 0 ? (n = s, i = -i, o = c.length) : (n = c, a = u, o = s.length), u = Math.ceil(f / Re), o = u > o ? u + 1 : o + 1, i > o && (i = o, n.length = 1), n.reverse(); i--; ) n.push(0);
    n.reverse();
  }
  for (o = s.length, i = c.length, o - i < 0 && (i = o, n = c, c = s, s = n), r = 0; i; )
    r = (s[--i] = s[i] + c[i] + r) / Xe | 0, s[i] %= Xe;
  for (r && (s.unshift(r), ++a), o = s.length; s[--o] == 0; ) s.pop();
  return t.d = s, t.e = a, Le ? we(t, f) : t;
}
function nr(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(ln + e);
}
function er(e) {
  var t, r, n, a = e.length - 1, i = "", u = e[0];
  if (a > 0) {
    for (i += u, t = 1; t < a; t++)
      n = e[t] + "", r = Re - n.length, r && (i += Dr(r)), i += n;
    u = e[t], n = u + "", r = Re - n.length, r && (i += Dr(r));
  } else if (u === 0)
    return "0";
  for (; u % 10 === 0; ) u /= 10;
  return i + u;
}
var vr = /* @__PURE__ */ (function() {
  function e(n, a) {
    var i, u = 0, o = n.length;
    for (n = n.slice(); o--; )
      i = n[o] * a + u, n[o] = i % Xe | 0, u = i / Xe | 0;
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
      n[i] -= u, u = n[i] < a[i] ? 1 : 0, n[i] = u * Xe + n[i] - a[i];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, a, i, u) {
    var o, s, c, l, f, h, p, g, y, m, E, v, _, A, b, T, O, P, N = n.constructor, j = n.s == a.s ? 1 : -1, D = n.d, R = a.d;
    if (!n.s) return new N(n);
    if (!a.s) throw Error(Ft + "Division by zero");
    for (s = n.e - a.e, O = R.length, b = D.length, p = new N(j), g = p.d = [], c = 0; R[c] == (D[c] || 0); ) ++c;
    if (R[c] > (D[c] || 0) && --s, i == null ? v = i = N.precision : u ? v = i + (He(n) - He(a)) + 1 : v = i, v < 0) return new N(0);
    if (v = v / Re + 2 | 0, c = 0, O == 1)
      for (l = 0, R = R[0], v++; (c < b || l) && v--; c++)
        _ = l * Xe + (D[c] || 0), g[c] = _ / R | 0, l = _ % R | 0;
    else {
      for (l = Xe / (R[0] + 1) | 0, l > 1 && (R = e(R, l), D = e(D, l), O = R.length, b = D.length), A = O, y = D.slice(0, O), m = y.length; m < O; ) y[m++] = 0;
      P = R.slice(), P.unshift(0), T = R[0], R[1] >= Xe / 2 && ++T;
      do
        l = 0, o = t(R, y, O, m), o < 0 ? (E = y[0], O != m && (E = E * Xe + (y[1] || 0)), l = E / T | 0, l > 1 ? (l >= Xe && (l = Xe - 1), f = e(R, l), h = f.length, m = y.length, o = t(f, y, h, m), o == 1 && (l--, r(f, O < h ? P : R, h))) : (l == 0 && (o = l = 1), f = R.slice()), h = f.length, h < m && f.unshift(0), r(y, f, m), o == -1 && (m = y.length, o = t(R, y, O, m), o < 1 && (l++, r(y, O < m ? P : R, m))), m = y.length) : o === 0 && (l++, y = [0]), g[c++] = l, o && y[0] ? y[m++] = D[A] || 0 : (y = [D[A]], m = 1);
      while ((A++ < b || y[0] !== void 0) && v--);
    }
    return g[0] || g.shift(), p.e = s, we(p, u ? i + He(p) + 1 : i);
  };
})();
function uO(e, t) {
  var r, n, a, i, u, o, s = 0, c = 0, l = e.constructor, f = l.precision;
  if (He(e) > 16) throw Error(g0 + He(e));
  if (!e.s) return new l(Ot);
  for (Le = !1, o = f, u = new l(0.03125); e.abs().gte(0.1); )
    e = e.times(u), c += 5;
  for (n = Math.log(Zr(2, c)) / Math.LN10 * 2 + 5 | 0, o += n, r = a = i = new l(Ot), l.precision = o; ; ) {
    if (a = we(a.times(e), o), r = r.times(++s), u = i.plus(vr(a, r, o)), er(u.d).slice(0, o) === er(i.d).slice(0, o)) {
      for (; c--; ) i = we(i.times(i), o);
      return l.precision = f, t == null ? (Le = !0, we(i, f)) : i;
    }
    i = u;
  }
}
function He(e) {
  for (var t = e.e * Re, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function Xf(e, t, r) {
  if (t > e.LN10.sd())
    throw Le = !0, r && (e.precision = r), Error(Ft + "LN10 precision limit exceeded");
  return we(new e(e.LN10), t);
}
function Dr(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function mi(e, t) {
  var r, n, a, i, u, o, s, c, l, f = 1, h = 10, p = e, g = p.d, y = p.constructor, m = y.precision;
  if (p.s < 1) throw Error(Ft + (p.s ? "NaN" : "-Infinity"));
  if (p.eq(Ot)) return new y(0);
  if (t == null ? (Le = !1, c = m) : c = t, p.eq(10))
    return t == null && (Le = !0), Xf(y, c);
  if (c += h, y.precision = c, r = er(g), n = r.charAt(0), i = He(p), Math.abs(i) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      p = p.times(e), r = er(p.d), n = r.charAt(0), f++;
    i = He(p), n > 1 ? (p = new y("0." + r), i++) : p = new y(n + "." + r.slice(1));
  } else
    return s = Xf(y, c + 2, m).times(i + ""), p = mi(new y(n + "." + r.slice(1)), c - h).plus(s), y.precision = m, t == null ? (Le = !0, we(p, m)) : p;
  for (o = u = p = vr(p.minus(Ot), p.plus(Ot), c), l = we(p.times(p), c), a = 3; ; ) {
    if (u = we(u.times(l), c), s = o.plus(vr(u, new y(a), c)), er(s.d).slice(0, c) === er(o.d).slice(0, c))
      return o = o.times(2), i !== 0 && (o = o.plus(Xf(y, c + 2, m).times(i + ""))), o = vr(o, new y(f), c), y.precision = m, t == null ? (Le = !0, we(o, m)) : o;
    o = s, a += 2;
  }
}
function e1(e, t) {
  var r, n, a;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (a = t.length; t.charCodeAt(a - 1) === 48; ) --a;
  if (t = t.slice(n, a), t) {
    if (a -= n, r = r - n - 1, e.e = Sa(r / Re), e.d = [], n = (r + 1) % Re, r < 0 && (n += Re), n < a) {
      for (n && e.d.push(+t.slice(0, n)), a -= Re; n < a; ) e.d.push(+t.slice(n, n += Re));
      t = t.slice(n), n = Re - t.length;
    } else
      n -= a;
    for (; n--; ) t += "0";
    if (e.d.push(+t), Le && (e.e > Vu || e.e < -Vu)) throw Error(g0 + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function we(e, t, r) {
  var n, a, i, u, o, s, c, l, f = e.d;
  for (u = 1, i = f[0]; i >= 10; i /= 10) u++;
  if (n = t - u, n < 0)
    n += Re, a = t, c = f[l = 0];
  else {
    if (l = Math.ceil((n + 1) / Re), i = f.length, l >= i) return e;
    for (c = i = f[l], u = 1; i >= 10; i /= 10) u++;
    n %= Re, a = n - Re + u;
  }
  if (r !== void 0 && (i = Zr(10, u - a - 1), o = c / i % 10 | 0, s = t < 0 || f[l + 1] !== void 0 || c % i, s = r < 4 ? (o || s) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : o > 5 || o == 5 && (r == 4 || s || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? a > 0 ? c / Zr(10, u - a) : 0 : f[l - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !f[0])
    return s ? (i = He(e), f.length = 1, t = t - i - 1, f[0] = Zr(10, (Re - t % Re) % Re), e.e = Sa(-t / Re) || 0) : (f.length = 1, f[0] = e.e = e.s = 0), e;
  if (n == 0 ? (f.length = l, i = 1, l--) : (f.length = l + 1, i = Zr(10, Re - n), f[l] = a > 0 ? (c / Zr(10, u - a) % Zr(10, a) | 0) * i : 0), s)
    for (; ; )
      if (l == 0) {
        (f[0] += i) == Xe && (f[0] = 1, ++e.e);
        break;
      } else {
        if (f[l] += i, f[l] != Xe) break;
        f[l--] = 0, i = 1;
      }
  for (n = f.length; f[--n] === 0; ) f.pop();
  if (Le && (e.e > Vu || e.e < -Vu))
    throw Error(g0 + He(e));
  return e;
}
function oO(e, t) {
  var r, n, a, i, u, o, s, c, l, f, h = e.constructor, p = h.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new h(e), Le ? we(t, p) : t;
  if (s = e.d, f = t.d, n = t.e, c = e.e, s = s.slice(), u = c - n, u) {
    for (l = u < 0, l ? (r = s, u = -u, o = f.length) : (r = f, n = c, o = s.length), a = Math.max(Math.ceil(p / Re), o) + 2, u > a && (u = a, r.length = 1), r.reverse(), a = u; a--; ) r.push(0);
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
      for (i = a; i && s[--i] === 0; ) s[i] = Xe - 1;
      --s[i], s[a] += Xe;
    }
    s[a] -= f[a];
  }
  for (; s[--o] === 0; ) s.pop();
  for (; s[0] === 0; s.shift()) --n;
  return s[0] ? (t.d = s, t.e = n, Le ? we(t, p) : t) : new h(0);
}
function yn(e, t, r) {
  var n, a = He(e), i = er(e.d), u = i.length;
  return t ? (r && (n = r - u) > 0 ? i = i.charAt(0) + "." + i.slice(1) + Dr(n) : u > 1 && (i = i.charAt(0) + "." + i.slice(1)), i = i + (a < 0 ? "e" : "e+") + a) : a < 0 ? (i = "0." + Dr(-a - 1) + i, r && (n = r - u) > 0 && (i += Dr(n))) : a >= u ? (i += Dr(a + 1 - u), r && (n = r - a - 1) > 0 && (i = i + "." + Dr(n))) : ((n = a + 1) < u && (i = i.slice(0, n) + "." + i.slice(n)), r && (n = r - u) > 0 && (a + 1 === u && (i += "."), i += Dr(n))), e.s < 0 ? "-" + i : i;
}
function t1(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function sO(e) {
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
        throw Error(ln + i);
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
      return e1(u, i.toString());
    } else if (typeof i != "string")
      throw Error(ln + i);
    if (i.charCodeAt(0) === 45 ? (i = i.slice(1), u.s = -1) : u.s = 1, vk.test(i)) e1(u, i);
    else throw Error(ln + i);
  }
  if (a.prototype = ae, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.clone = sO, a.config = a.set = Ek, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return a.config(e), a;
}
function Ek(e) {
  if (!e || typeof e != "object")
    throw Error(Ft + "Object expected");
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
      else throw Error(ln + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(ln + r + ": " + n);
  return this;
}
var v0 = sO(gk);
Ot = new v0(1);
const Se = v0;
function Tk(e) {
  return Sk(e) || Ok(e) || Ak(e) || _k();
}
function _k() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ak(e, t) {
  if (e) {
    if (typeof e == "string") return vh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return vh(e, t);
  }
}
function Ok(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function Sk(e) {
  if (Array.isArray(e)) return vh(e);
}
function vh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var xk = function(t) {
  return t;
}, cO = {}, lO = function(t) {
  return t === cO;
}, r1 = function(t) {
  return function r() {
    return arguments.length === 0 || arguments.length === 1 && lO(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments);
  };
}, wk = function e(t, r) {
  return t === 1 ? r : r1(function() {
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var u = a.filter(function(o) {
      return o !== cO;
    }).length;
    return u >= t ? r.apply(void 0, a) : e(t - u, r1(function() {
      for (var o = arguments.length, s = new Array(o), c = 0; c < o; c++)
        s[c] = arguments[c];
      var l = a.map(function(f) {
        return lO(f) ? s.shift() : f;
      });
      return r.apply(void 0, Tk(l).concat(s));
    }));
  });
}, as = function(t) {
  return wk(t.length, t);
}, Eh = function(t, r) {
  for (var n = [], a = t; a < r; ++a)
    n[a - t] = a;
  return n;
}, Pk = as(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
    return t[r];
  }).map(e);
}), Ik = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (!r.length)
    return xk;
  var a = r.reverse(), i = a[0], u = a.slice(1);
  return function() {
    return u.reduce(function(o, s) {
      return s(o);
    }, i.apply(void 0, arguments));
  };
}, Th = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, fO = function(t) {
  var r = null, n = null;
  return function() {
    for (var a = arguments.length, i = new Array(a), u = 0; u < a; u++)
      i[u] = arguments[u];
    return r && i.every(function(o, s) {
      return o === r[s];
    }) || (r = i, n = t.apply(void 0, i)), n;
  };
};
function Ck(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new Se(e).abs().log(10).toNumber()) + 1, t;
}
function Nk(e, t, r) {
  for (var n = new Se(e), a = 0, i = []; n.lt(t) && a < 1e5; )
    i.push(n.toNumber()), n = n.add(r), a++;
  return i;
}
var Rk = as(function(e, t, r) {
  var n = +e, a = +t;
  return n + r * (a - n);
}), Dk = as(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, (r - e) / n;
}), Mk = as(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n));
});
const is = {
  rangeStep: Nk,
  getDigitCount: Ck,
  interpolateNumber: Rk,
  uninterpolateNumber: Dk,
  uninterpolateTruncation: Mk
};
function _h(e) {
  return Bk(e) || kk(e) || dO(e) || Lk();
}
function Lk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kk(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function Bk(e) {
  if (Array.isArray(e)) return Ah(e);
}
function yi(e, t) {
  return $k(e) || Fk(e, t) || dO(e, t) || jk();
}
function jk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function dO(e, t) {
  if (e) {
    if (typeof e == "string") return Ah(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ah(e, t);
  }
}
function Ah(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function Fk(e, t) {
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
function $k(e) {
  if (Array.isArray(e)) return e;
}
function hO(e) {
  var t = yi(e, 2), r = t[0], n = t[1], a = r, i = n;
  return r > n && (a = n, i = r), [a, i];
}
function pO(e, t, r) {
  if (e.lte(0))
    return new Se(0);
  var n = is.getDigitCount(e.toNumber()), a = new Se(10).pow(n), i = e.div(a), u = n !== 1 ? 0.05 : 0.1, o = new Se(Math.ceil(i.div(u).toNumber())).add(r).mul(u), s = o.mul(a);
  return t ? s : new Se(Math.ceil(s));
}
function Uk(e, t, r) {
  var n = 1, a = new Se(e);
  if (!a.isint() && r) {
    var i = Math.abs(e);
    i < 1 ? (n = new Se(10).pow(is.getDigitCount(e) - 1), a = new Se(Math.floor(a.div(n).toNumber())).mul(n)) : i > 1 && (a = new Se(Math.floor(e)));
  } else e === 0 ? a = new Se(Math.floor((t - 1) / 2)) : r || (a = new Se(Math.floor(e)));
  var u = Math.floor((t - 1) / 2), o = Ik(Pk(function(s) {
    return a.add(new Se(s - u).mul(n)).toNumber();
  }), Eh);
  return o(0, t);
}
function mO(e, t, r, n) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1)))
    return {
      step: new Se(0),
      tickMin: new Se(0),
      tickMax: new Se(0)
    };
  var i = pO(new Se(t).sub(e).div(r - 1), n, a), u;
  e <= 0 && t >= 0 ? u = new Se(0) : (u = new Se(e).add(t).div(2), u = u.sub(new Se(u).mod(i)));
  var o = Math.ceil(u.sub(e).div(i).toNumber()), s = Math.ceil(new Se(t).sub(u).div(i).toNumber()), c = o + s + 1;
  return c > r ? mO(e, t, r, n, a + 1) : (c < r && (s = t > 0 ? s + (r - c) : s, o = t > 0 ? o : o + (r - c)), {
    step: i,
    tickMin: u.sub(new Se(o).mul(i)),
    tickMax: u.add(new Se(s).mul(i))
  });
}
function Hk(e) {
  var t = yi(e, 2), r = t[0], n = t[1], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, u = Math.max(a, 2), o = hO([r, n]), s = yi(o, 2), c = s[0], l = s[1];
  if (c === -1 / 0 || l === 1 / 0) {
    var f = l === 1 / 0 ? [c].concat(_h(Eh(0, a - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(_h(Eh(0, a - 1).map(function() {
      return -1 / 0;
    })), [l]);
    return r > n ? Th(f) : f;
  }
  if (c === l)
    return Uk(c, a, i);
  var h = mO(c, l, u, i), p = h.step, g = h.tickMin, y = h.tickMax, m = is.rangeStep(g, y.add(new Se(0.1).mul(p)), p);
  return r > n ? Th(m) : m;
}
function qk(e, t) {
  var r = yi(e, 2), n = r[0], a = r[1], i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, u = hO([n, a]), o = yi(u, 2), s = o[0], c = o[1];
  if (s === -1 / 0 || c === 1 / 0)
    return [n, a];
  if (s === c)
    return [s];
  var l = Math.max(t, 2), f = pO(new Se(c).sub(s).div(l - 1), i, 0), h = [].concat(_h(is.rangeStep(new Se(s), new Se(c).sub(new Se(0.99).mul(f)), f)), [c]);
  return n > a ? Th(h) : h;
}
var Wk = fO(Hk), Yk = fO(qk), Gk = process.env.NODE_ENV === "production", Qf = "Invariant failed";
function vt(e, t) {
  if (Gk)
    throw new Error(Qf);
  var r = typeof t == "function" ? t() : t, n = r ? "".concat(Qf, ": ").concat(r) : Qf;
  throw new Error(n);
}
var Kk = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function ta(e) {
  "@babel/helpers - typeof";
  return ta = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ta(e);
}
function Xu() {
  return Xu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Xu.apply(this, arguments);
}
function zk(e, t) {
  return Zk(e) || Qk(e, t) || Xk(e, t) || Vk();
}
function Vk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Xk(e, t) {
  if (e) {
    if (typeof e == "string") return n1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return n1(e, t);
  }
}
function n1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Qk(e, t) {
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
function Zk(e) {
  if (Array.isArray(e)) return e;
}
function Jk(e, t) {
  if (e == null) return {};
  var r = e4(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function e4(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function t4(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function r4(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, gO(n.key), n);
  }
}
function n4(e, t, r) {
  return t && r4(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function a4(e, t, r) {
  return t = Qu(t), i4(e, yO() ? Reflect.construct(t, r || [], Qu(e).constructor) : t.apply(e, r));
}
function i4(e, t) {
  if (t && (ta(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return u4(e);
}
function u4(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function yO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (yO = function() {
    return !!e;
  })();
}
function Qu(e) {
  return Qu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Qu(e);
}
function o4(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Oh(e, t);
}
function Oh(e, t) {
  return Oh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Oh(e, t);
}
function bO(e, t, r) {
  return t = gO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function gO(e) {
  var t = s4(e, "string");
  return ta(t) == "symbol" ? t : t + "";
}
function s4(e, t) {
  if (ta(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ta(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var us = /* @__PURE__ */ (function(e) {
  function t() {
    return t4(this, t), a4(this, t, arguments);
  }
  return o4(t, e), n4(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.offset, i = n.layout, u = n.width, o = n.dataKey, s = n.data, c = n.dataPointFormatter, l = n.xAxis, f = n.yAxis, h = Jk(n, Kk), p = le(h, !1);
      this.props.direction === "x" && l.type !== "number" && (process.env.NODE_ENV !== "production" ? vt(!1, 'ErrorBar requires Axis type property to be "number".') : vt());
      var g = s.map(function(y) {
        var m = c(y, o), E = m.x, v = m.y, _ = m.value, A = m.errorVal;
        if (!A)
          return null;
        var b = [], T, O;
        if (Array.isArray(A)) {
          var P = zk(A, 2);
          T = P[0], O = P[1];
        } else
          T = O = A;
        if (i === "vertical") {
          var N = l.scale, j = v + a, D = j + u, R = j - u, B = N(_ - T), F = N(_ + O);
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
          var $ = f.scale, q = E + a, Y = q - u, Q = q + u, te = $(_ - T), k = $(_ + O);
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
        return /* @__PURE__ */ C.createElement(Oe, Xu({
          className: "recharts-errorBar",
          key: "bar-".concat(b.map(function(W) {
            return "".concat(W.x1, "-").concat(W.x2, "-").concat(W.y1, "-").concat(W.y2);
          }))
        }, p), b.map(function(W) {
          return /* @__PURE__ */ C.createElement("line", Xu({}, W, {
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
bO(us, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
bO(us, "displayName", "ErrorBar");
function bi(e) {
  "@babel/helpers - typeof";
  return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, bi(e);
}
function a1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? a1(Object(r), !0).forEach(function(n) {
      c4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : a1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function c4(e, t, r) {
  return t = l4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function l4(e) {
  var t = f4(e, "string");
  return bi(t) == "symbol" ? t : t + "";
}
function f4(e, t) {
  if (bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var vO = function(t) {
  var r = t.children, n = t.formattedGraphicalItems, a = t.legendWidth, i = t.legendContent, u = At(r, jr);
  if (!u)
    return null;
  var o = jr.defaultProps, s = o !== void 0 ? zr(zr({}, o), u.props) : {}, c;
  return u.props && u.props.payload ? c = u.props && u.props.payload : i === "children" ? c = (n || []).reduce(function(l, f) {
    var h = f.item, p = f.props, g = p.sectors || p.data || [];
    return l.concat(g.map(function(y) {
      return {
        type: u.props.iconType || h.props.legendType,
        value: y.name,
        color: y.fill,
        payload: y
      };
    }));
  }, []) : c = (n || []).map(function(l) {
    var f = l.item, h = f.type.defaultProps, p = h !== void 0 ? zr(zr({}, h), f.props) : {}, g = p.dataKey, y = p.name, m = p.legendType, E = p.hide;
    return {
      inactive: E,
      dataKey: g,
      type: s.iconType || m || "square",
      color: E0(f),
      value: y || g,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: p
    };
  }), zr(zr(zr({}, s), jr.getWithHeight(u, a)), {}, {
    payload: c,
    item: u
  });
};
function gi(e) {
  "@babel/helpers - typeof";
  return gi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, gi(e);
}
function i1(e) {
  return m4(e) || p4(e) || h4(e) || d4();
}
function d4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function h4(e, t) {
  if (e) {
    if (typeof e == "string") return Sh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Sh(e, t);
  }
}
function p4(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function m4(e) {
  if (Array.isArray(e)) return Sh(e);
}
function Sh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function u1(e, t) {
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
    t % 2 ? u1(Object(r), !0).forEach(function(n) {
      qn(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : u1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qn(e, t, r) {
  return t = y4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function y4(e) {
  var t = b4(e, "string");
  return gi(t) == "symbol" ? t : t + "";
}
function b4(e, t) {
  if (gi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (gi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ot(e, t, r) {
  return me(e) || me(t) ? r : Ge(t) ? xt(e, t, r) : de(t) ? t(e) : r;
}
function Xa(e, t, r, n) {
  var a = mk(e, function(o) {
    return ot(o, t);
  });
  if (r === "number") {
    var i = a.filter(function(o) {
      return J(o) || parseFloat(o);
    });
    return i.length ? [rs(i), ts(i)] : [1 / 0, -1 / 0];
  }
  var u = n ? a.filter(function(o) {
    return !me(o);
  }) : a;
  return u.map(function(o) {
    return Ge(o) || o instanceof Date ? o : "";
  });
}
var g4 = function(t) {
  var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], a = arguments.length > 2 ? arguments[2] : void 0, i = arguments.length > 3 ? arguments[3] : void 0, u = -1, o = (r = n?.length) !== null && r !== void 0 ? r : 0;
  if (o <= 1)
    return 0;
  if (i && i.axisType === "angleAxis" && Math.abs(Math.abs(i.range[1] - i.range[0]) - 360) <= 1e-6)
    for (var s = i.range, c = 0; c < o; c++) {
      var l = c > 0 ? a[c - 1].coordinate : a[o - 1].coordinate, f = a[c].coordinate, h = c >= o - 1 ? a[0].coordinate : a[c + 1].coordinate, p = void 0;
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
          u = a[c].index;
          break;
        }
      } else {
        var v = Math.min(l, h), _ = Math.max(l, h);
        if (t > (v + f) / 2 && t <= (_ + f) / 2) {
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
}, E0 = function(t) {
  var r, n = t, a = n.type.displayName, i = (r = t.type) !== null && r !== void 0 && r.defaultProps ? Be(Be({}, t.type.defaultProps), t.props) : t.props, u = i.stroke, o = i.fill, s;
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
}, v4 = function(t) {
  var r = t.barSize, n = t.totalSize, a = t.stackGroups, i = a === void 0 ? {} : a;
  if (!i)
    return {};
  for (var u = {}, o = Object.keys(i), s = 0, c = o.length; s < c; s++)
    for (var l = i[o[s]].stackGroups, f = Object.keys(l), h = 0, p = f.length; h < p; h++) {
      var g = l[f[h]], y = g.items, m = g.cateAxisId, E = y.filter(function(O) {
        return gr(O.type).indexOf("Bar") >= 0;
      });
      if (E && E.length) {
        var v = E[0].type.defaultProps, _ = v !== void 0 ? Be(Be({}, v), E[0].props) : E[0].props, A = _.barSize, b = _[m];
        u[b] || (u[b] = []);
        var T = me(A) ? r : A;
        u[b].push({
          item: E[0],
          stackList: E.slice(1),
          barSize: me(T) ? void 0 : ht(T, n, 0)
        });
      }
    }
  return u;
}, E4 = function(t) {
  var r = t.barGap, n = t.barCategoryGap, a = t.bandSize, i = t.sizeList, u = i === void 0 ? [] : i, o = t.maxBarSize, s = u.length;
  if (s < 1) return null;
  var c = ht(r, a, 0, !0), l, f = [];
  if (u[0].barSize === +u[0].barSize) {
    var h = !1, p = a / s, g = u.reduce(function(A, b) {
      return A + b.barSize || 0;
    }, 0);
    g += (s - 1) * c, g >= a && (g -= (s - 1) * c, c = 0), g >= a && p > 0 && (h = !0, p *= 0.9, g = s * p);
    var y = (a - g) / 2 >> 0, m = {
      offset: y - c,
      size: 0
    };
    l = u.reduce(function(A, b) {
      var T = {
        item: b.item,
        position: {
          offset: m.offset + m.size + c,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: h ? p : b.barSize
        }
      }, O = [].concat(i1(A), [T]);
      return m = O[O.length - 1].position, b.stackList && b.stackList.length && b.stackList.forEach(function(P) {
        O.push({
          item: P,
          position: m
        });
      }), O;
    }, f);
  } else {
    var E = ht(n, a, 0, !0);
    a - 2 * E - (s - 1) * c <= 0 && (c = 0);
    var v = (a - 2 * E - (s - 1) * c) / s;
    v > 1 && (v >>= 0);
    var _ = o === +o ? Math.min(v, o) : v;
    l = u.reduce(function(A, b, T) {
      var O = [].concat(i1(A), [{
        item: b.item,
        position: {
          offset: E + (v + c) * T + (v - _) / 2,
          size: _
        }
      }]);
      return b.stackList && b.stackList.length && b.stackList.forEach(function(P) {
        O.push({
          item: P,
          position: O[O.length - 1].position
        });
      }), O;
    }, f);
  }
  return l;
}, T4 = function(t, r, n, a) {
  var i = n.children, u = n.width, o = n.margin, s = u - (o.left || 0) - (o.right || 0), c = vO({
    children: i,
    legendWidth: s
  });
  if (c) {
    var l = a || {}, f = l.width, h = l.height, p = c.align, g = c.verticalAlign, y = c.layout;
    if ((y === "vertical" || y === "horizontal" && g === "middle") && p !== "center" && J(t[p]))
      return Be(Be({}, t), {}, qn({}, p, t[p] + (f || 0)));
    if ((y === "horizontal" || y === "vertical" && p === "center") && g !== "middle" && J(t[g]))
      return Be(Be({}, t), {}, qn({}, g, t[g] + (h || 0)));
  }
  return t;
}, _4 = function(t, r, n) {
  return me(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0;
}, EO = function(t, r, n, a, i) {
  var u = r.props.children, o = jt(u, us).filter(function(c) {
    return _4(a, i, c.props.direction);
  });
  if (o && o.length) {
    var s = o.map(function(c) {
      return c.props.dataKey;
    });
    return t.reduce(function(c, l) {
      var f = ot(l, n);
      if (me(f)) return c;
      var h = Array.isArray(f) ? [rs(f), ts(f)] : [f, f], p = s.reduce(function(g, y) {
        var m = ot(l, y, 0), E = h[0] - Math.abs(Array.isArray(m) ? m[0] : m), v = h[1] + Math.abs(Array.isArray(m) ? m[1] : m);
        return [Math.min(E, g[0]), Math.max(v, g[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(p[0], c[0]), Math.max(p[1], c[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, A4 = function(t, r, n, a, i) {
  var u = r.map(function(o) {
    return EO(t, o, n, i, a);
  }).filter(function(o) {
    return !me(o);
  });
  return u && u.length ? u.reduce(function(o, s) {
    return [Math.min(o[0], s[0]), Math.max(o[1], s[1])];
  }, [1 / 0, -1 / 0]) : null;
}, TO = function(t, r, n, a, i) {
  var u = r.map(function(s) {
    var c = s.props.dataKey;
    return n === "number" && c && EO(t, s, c, a) || Xa(t, c, n, i);
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
}, _O = function(t, r) {
  return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis";
}, AO = function(t, r, n, a) {
  if (a)
    return t.map(function(s) {
      return s.coordinate;
    });
  var i, u, o = t.map(function(s) {
    return s.coordinate === r && (i = !0), s.coordinate === n && (u = !0), s.coordinate;
  });
  return i || o.push(r), u || o.push(n), o;
}, mr = function(t, r, n) {
  if (!t) return null;
  var a = t.scale, i = t.duplicateDomain, u = t.type, o = t.range, s = t.realScaleType === "scaleBand" ? a.bandwidth() / 2 : 2, c = (r || n) && u === "category" && a.bandwidth ? a.bandwidth() / s : 0;
  if (c = t.axisType === "angleAxis" && o?.length >= 2 ? dt(o[0] - o[1]) * 2 * c : c, r && (t.ticks || t.niceTicks)) {
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
      return !Ui(f.coordinate);
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
}, Zf = /* @__PURE__ */ new WeakMap(), lu = function(t, r) {
  if (typeof r != "function")
    return t;
  Zf.has(t) || Zf.set(t, /* @__PURE__ */ new WeakMap());
  var n = Zf.get(t);
  if (n.has(r))
    return n.get(r);
  var a = function() {
    t.apply(void 0, arguments), r.apply(void 0, arguments);
  };
  return n.set(r, a), a;
}, OO = function(t, r, n) {
  var a = t.scale, i = t.type, u = t.layout, o = t.axisType;
  if (a === "auto")
    return u === "radial" && o === "radiusAxis" ? {
      scale: li(),
      realScaleType: "band"
    } : u === "radial" && o === "angleAxis" ? {
      scale: Yu(),
      realScaleType: "linear"
    } : i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: Va(),
      realScaleType: "point"
    } : i === "category" ? {
      scale: li(),
      realScaleType: "band"
    } : {
      scale: Yu(),
      realScaleType: "linear"
    };
  if (hn(a)) {
    var s = "scale".concat($o(a));
    return {
      scale: (Yv[s] || Va)(),
      realScaleType: Yv[s] ? s : "point"
    };
  }
  return de(a) ? {
    scale: a
  } : {
    scale: Va(),
    realScaleType: "point"
  };
}, o1 = 1e-4, SO = function(t) {
  var r = t.domain();
  if (!(!r || r.length <= 2)) {
    var n = r.length, a = t.range(), i = Math.min(a[0], a[1]) - o1, u = Math.max(a[0], a[1]) + o1, o = t(r[0]), s = t(r[n - 1]);
    (o < i || o > u || s < i || s > u) && t.domain([r[0], r[n - 1]]);
  }
}, O4 = function(t, r) {
  if (!t)
    return null;
  for (var n = 0, a = t.length; n < a; n++)
    if (t[n].item === r)
      return t[n].position;
  return null;
}, S4 = function(t, r) {
  if (!r || r.length !== 2 || !J(r[0]) || !J(r[1]))
    return t;
  var n = Math.min(r[0], r[1]), a = Math.max(r[0], r[1]), i = [t[0], t[1]];
  return (!J(t[0]) || t[0] < n) && (i[0] = n), (!J(t[1]) || t[1] > a) && (i[1] = a), i[0] > a && (i[0] = a), i[1] < n && (i[1] = n), i;
}, x4 = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, u = 0, o = 0; o < r; ++o) {
        var s = Ui(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
        s >= 0 ? (t[o][n][0] = i, t[o][n][1] = i + s, i = t[o][n][1]) : (t[o][n][0] = u, t[o][n][1] = u + s, u = t[o][n][1]);
      }
}, w4 = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, u = 0; u < r; ++u) {
        var o = Ui(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
        o >= 0 ? (t[u][n][0] = i, t[u][n][1] = i + o, i = t[u][n][1]) : (t[u][n][0] = 0, t[u][n][1] = 0);
      }
}, P4 = {
  sign: x4,
  // @ts-expect-error definitelytyped types are incorrect
  expand: m3,
  // @ts-expect-error definitelytyped types are incorrect
  none: Kn,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: y3,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: b3,
  positive: w4
}, I4 = function(t, r, n) {
  var a = r.map(function(o) {
    return o.props.dataKey;
  }), i = P4[n], u = p3().keys(a).value(function(o, s) {
    return +ot(o, s, 0);
  }).order(th).offset(i);
  return u(t);
}, C4 = function(t, r, n, a, i, u) {
  if (!t)
    return null;
  var o = u ? r.reverse() : r, s = {}, c = o.reduce(function(f, h) {
    var p, g = (p = h.type) !== null && p !== void 0 && p.defaultProps ? Be(Be({}, h.type.defaultProps), h.props) : h.props, y = g.stackId, m = g.hide;
    if (m)
      return f;
    var E = g[n], v = f[E] || {
      hasStack: !1,
      stackGroups: {}
    };
    if (Ge(y)) {
      var _ = v.stackGroups[y] || {
        numericAxisId: n,
        cateAxisId: a,
        items: []
      };
      _.items.push(h), v.hasStack = !0, v.stackGroups[y] = _;
    } else
      v.stackGroups[Hi("_stackId_")] = {
        numericAxisId: n,
        cateAxisId: a,
        items: [h]
      };
    return Be(Be({}, f), {}, qn({}, E, v));
  }, s), l = {};
  return Object.keys(c).reduce(function(f, h) {
    var p = c[h];
    if (p.hasStack) {
      var g = {};
      p.stackGroups = Object.keys(p.stackGroups).reduce(function(y, m) {
        var E = p.stackGroups[m];
        return Be(Be({}, y), {}, qn({}, m, {
          numericAxisId: n,
          cateAxisId: a,
          items: E.items,
          stackedData: I4(t, E.items, i)
        }));
      }, g);
    }
    return Be(Be({}, f), {}, qn({}, h, p));
  }, l);
}, xO = function(t, r) {
  var n = r.realScaleType, a = r.type, i = r.tickCount, u = r.originalDomain, o = r.allowDecimals, s = n || r.scale;
  if (s !== "auto" && s !== "linear")
    return null;
  if (i && a === "number" && u && (u[0] === "auto" || u[1] === "auto")) {
    var c = t.domain();
    if (!c.length)
      return null;
    var l = Wk(c, i, o);
    return t.domain([rs(l), ts(l)]), {
      niceTicks: l
    };
  }
  if (i && a === "number") {
    var f = t.domain(), h = Yk(f, i, o);
    return {
      niceTicks: h
    };
  }
  return null;
}, s1 = function(t) {
  var r = t.axis, n = t.ticks, a = t.offset, i = t.bandSize, u = t.entry, o = t.index;
  if (r.type === "category")
    return n[o] ? n[o].coordinate + a : null;
  var s = ot(u, r.dataKey, r.domain[o]);
  return me(s) ? null : r.scale(s) - i / 2 + a;
}, N4 = function(t) {
  var r = t.numericAxis, n = r.scale.domain();
  if (r.type === "number") {
    var a = Math.min(n[0], n[1]), i = Math.max(n[0], n[1]);
    return a <= 0 && i >= 0 ? 0 : i < 0 ? i : a;
  }
  return n[0];
}, R4 = function(t, r) {
  var n, a = (n = t.type) !== null && n !== void 0 && n.defaultProps ? Be(Be({}, t.type.defaultProps), t.props) : t.props, i = a.stackId;
  if (Ge(i)) {
    var u = r[i];
    if (u) {
      var o = u.items.indexOf(t);
      return o >= 0 ? u.stackedData[o] : null;
    }
  }
  return null;
}, D4 = function(t) {
  return t.reduce(function(r, n) {
    return [rs(n.concat([r[0]]).filter(J)), ts(n.concat([r[1]]).filter(J))];
  }, [1 / 0, -1 / 0]);
}, wO = function(t, r, n) {
  return Object.keys(t).reduce(function(a, i) {
    var u = t[i], o = u.stackedData, s = o.reduce(function(c, l) {
      var f = D4(l.slice(r, n + 1));
      return [Math.min(c[0], f[0]), Math.max(c[1], f[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(s[0], a[0]), Math.max(s[1], a[1])];
  }, [1 / 0, -1 / 0]).map(function(a) {
    return a === 1 / 0 || a === -1 / 0 ? 0 : a;
  });
}, c1 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, l1 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, xh = function(t, r, n) {
  if (de(t))
    return t(r, n);
  if (!Array.isArray(t))
    return r;
  var a = [];
  if (J(t[0]))
    a[0] = n ? t[0] : Math.min(t[0], r[0]);
  else if (c1.test(t[0])) {
    var i = +c1.exec(t[0])[1];
    a[0] = r[0] - i;
  } else de(t[0]) ? a[0] = t[0](r[0]) : a[0] = r[0];
  if (J(t[1]))
    a[1] = n ? t[1] : Math.max(t[1], r[1]);
  else if (l1.test(t[1])) {
    var u = +l1.exec(t[1])[1];
    a[1] = r[1] + u;
  } else de(t[1]) ? a[1] = t[1](r[1]) : a[1] = r[1];
  return a;
}, Zu = function(t, r, n) {
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
}, f1 = function(t, r, n) {
  return !t || !t.length || ns(t, xt(n, "type.defaultProps.domain")) ? r : t;
}, PO = function(t, r) {
  var n = t.type.defaultProps ? Be(Be({}, t.type.defaultProps), t.props) : t.props, a = n.dataKey, i = n.name, u = n.unit, o = n.formatter, s = n.tooltipType, c = n.chartType, l = n.hide;
  return Be(Be({}, le(t, !1)), {}, {
    dataKey: a,
    unit: u,
    formatter: o,
    name: i || a,
    color: E0(t),
    value: ot(r, a),
    type: s,
    payload: r,
    chartType: c,
    hide: l
  });
};
function vi(e) {
  "@babel/helpers - typeof";
  return vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, vi(e);
}
function d1(e, t) {
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
    t % 2 ? d1(Object(r), !0).forEach(function(n) {
      IO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : d1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function IO(e, t, r) {
  return t = M4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function M4(e) {
  var t = L4(e, "string");
  return vi(t) == "symbol" ? t : t + "";
}
function L4(e, t) {
  if (vi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (vi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function k4(e, t) {
  return $4(e) || F4(e, t) || j4(e, t) || B4();
}
function B4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function j4(e, t) {
  if (e) {
    if (typeof e == "string") return h1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return h1(e, t);
  }
}
function h1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function F4(e, t) {
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
function $4(e) {
  if (Array.isArray(e)) return e;
}
var Ju = Math.PI / 180, U4 = function(t) {
  return t * 180 / Math.PI;
}, Ne = function(t, r, n, a) {
  return {
    x: t + Math.cos(-Ju * a) * n,
    y: r + Math.sin(-Ju * a) * n
  };
}, CO = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, H4 = function(t, r, n, a, i) {
  var u = t.width, o = t.height, s = t.startAngle, c = t.endAngle, l = ht(t.cx, u, u / 2), f = ht(t.cy, o, o / 2), h = CO(u, o, n), p = ht(t.innerRadius, h, 0), g = ht(t.outerRadius, h, h * 0.8), y = Object.keys(r);
  return y.reduce(function(m, E) {
    var v = r[E], _ = v.domain, A = v.reversed, b;
    if (me(v.range))
      a === "angleAxis" ? b = [s, c] : a === "radiusAxis" && (b = [p, g]), A && (b = [b[1], b[0]]);
    else {
      b = v.range;
      var T = b, O = k4(T, 2);
      s = O[0], c = O[1];
    }
    var P = OO(v, i), N = P.realScaleType, j = P.scale;
    j.domain(_).range(b), SO(j);
    var D = xO(j, fr(fr({}, v), {}, {
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
    return fr(fr({}, m), {}, IO({}, E, R));
  }, {});
}, q4 = function(t, r) {
  var n = t.x, a = t.y, i = r.x, u = r.y;
  return Math.sqrt(Math.pow(n - i, 2) + Math.pow(a - u, 2));
}, W4 = function(t, r) {
  var n = t.x, a = t.y, i = r.cx, u = r.cy, o = q4({
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
    angle: U4(c),
    angleInRadian: c
  };
}, Y4 = function(t) {
  var r = t.startAngle, n = t.endAngle, a = Math.floor(r / 360), i = Math.floor(n / 360), u = Math.min(a, i);
  return {
    startAngle: r - u * 360,
    endAngle: n - u * 360
  };
}, G4 = function(t, r) {
  var n = r.startAngle, a = r.endAngle, i = Math.floor(n / 360), u = Math.floor(a / 360), o = Math.min(i, u);
  return t + o * 360;
}, p1 = function(t, r) {
  var n = t.x, a = t.y, i = W4({
    x: n,
    y: a
  }, r), u = i.radius, o = i.angle, s = r.innerRadius, c = r.outerRadius;
  if (u < s || u > c)
    return !1;
  if (u === 0)
    return !0;
  var l = Y4(r), f = l.startAngle, h = l.endAngle, p = o, g;
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
    radius: u,
    angle: G4(p, r)
  }) : null;
}, NO = function(t) {
  return !/* @__PURE__ */ Lt(t) && !de(t) && typeof t != "boolean" ? t.className : "";
};
function Ei(e) {
  "@babel/helpers - typeof";
  return Ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ei(e);
}
var K4 = ["offset"];
function z4(e) {
  return Z4(e) || Q4(e) || X4(e) || V4();
}
function V4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function X4(e, t) {
  if (e) {
    if (typeof e == "string") return wh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return wh(e, t);
  }
}
function Q4(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Z4(e) {
  if (Array.isArray(e)) return wh(e);
}
function wh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function J4(e, t) {
  if (e == null) return {};
  var r = e8(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function e8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
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
function We(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? m1(Object(r), !0).forEach(function(n) {
      t8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : m1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function t8(e, t, r) {
  return t = r8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function r8(e) {
  var t = n8(e, "string");
  return Ei(t) == "symbol" ? t : t + "";
}
function n8(e, t) {
  if (Ei(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ti() {
  return Ti = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ti.apply(this, arguments);
}
var a8 = function(t) {
  var r = t.value, n = t.formatter, a = me(t.children) ? r : t.children;
  return de(n) ? n(a) : a;
}, i8 = function(t, r) {
  var n = dt(r - t), a = Math.min(Math.abs(r - t), 360);
  return n * a;
}, u8 = function(t, r, n) {
  var a = t.position, i = t.viewBox, u = t.offset, o = t.className, s = i, c = s.cx, l = s.cy, f = s.innerRadius, h = s.outerRadius, p = s.startAngle, g = s.endAngle, y = s.clockWise, m = (f + h) / 2, E = i8(p, g), v = E >= 0 ? 1 : -1, _, A;
  a === "insideStart" ? (_ = p + v * u, A = y) : a === "insideEnd" ? (_ = g - v * u, A = !y) : a === "end" && (_ = g + v * u, A = y), A = E <= 0 ? A : !A;
  var b = Ne(c, l, m, _), T = Ne(c, l, m, _ + (A ? 1 : -1) * 359), O = "M".concat(b.x, ",").concat(b.y, `
    A`).concat(m, ",").concat(m, ",0,1,").concat(A ? 0 : 1, `,
    `).concat(T.x, ",").concat(T.y), P = me(t.id) ? Hi("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ C.createElement("text", Ti({}, n, {
    dominantBaseline: "central",
    className: pe("recharts-radial-bar-label", o)
  }), /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("path", {
    id: P,
    d: O
  })), /* @__PURE__ */ C.createElement("textPath", {
    xlinkHref: "#".concat(P)
  }, r));
}, o8 = function(t) {
  var r = t.viewBox, n = t.offset, a = t.position, i = r, u = i.cx, o = i.cy, s = i.innerRadius, c = i.outerRadius, l = i.startAngle, f = i.endAngle, h = (l + f) / 2;
  if (a === "outside") {
    var p = Ne(u, o, c + n, h), g = p.x, y = p.y;
    return {
      x: g,
      y,
      textAnchor: g >= u ? "start" : "end",
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
  var m = (s + c) / 2, E = Ne(u, o, m, h), v = E.x, _ = E.y;
  return {
    x: v,
    y: _,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, s8 = function(t) {
  var r = t.viewBox, n = t.parentViewBox, a = t.offset, i = t.position, u = r, o = u.x, s = u.y, c = u.width, l = u.height, f = l >= 0 ? 1 : -1, h = f * a, p = f > 0 ? "end" : "start", g = f > 0 ? "start" : "end", y = c >= 0 ? 1 : -1, m = y * a, E = y > 0 ? "end" : "start", v = y > 0 ? "start" : "end";
  if (i === "top") {
    var _ = {
      x: o + c / 2,
      y: s - f * a,
      textAnchor: "middle",
      verticalAnchor: p
    };
    return We(We({}, _), n ? {
      height: Math.max(s - n.y, 0),
      width: c
    } : {});
  }
  if (i === "bottom") {
    var A = {
      x: o + c / 2,
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
      x: o - m,
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
    var T = {
      x: o + c + m,
      y: s + l / 2,
      textAnchor: v,
      verticalAnchor: "middle"
    };
    return We(We({}, T), n ? {
      width: Math.max(n.x + n.width - T.x, 0),
      height: l
    } : {});
  }
  var O = n ? {
    width: c,
    height: l
  } : {};
  return i === "insideLeft" ? We({
    x: o + m,
    y: s + l / 2,
    textAnchor: v,
    verticalAnchor: "middle"
  }, O) : i === "insideRight" ? We({
    x: o + c - m,
    y: s + l / 2,
    textAnchor: E,
    verticalAnchor: "middle"
  }, O) : i === "insideTop" ? We({
    x: o + c / 2,
    y: s + h,
    textAnchor: "middle",
    verticalAnchor: g
  }, O) : i === "insideBottom" ? We({
    x: o + c / 2,
    y: s + l - h,
    textAnchor: "middle",
    verticalAnchor: p
  }, O) : i === "insideTopLeft" ? We({
    x: o + m,
    y: s + h,
    textAnchor: v,
    verticalAnchor: g
  }, O) : i === "insideTopRight" ? We({
    x: o + c - m,
    y: s + h,
    textAnchor: E,
    verticalAnchor: g
  }, O) : i === "insideBottomLeft" ? We({
    x: o + m,
    y: s + l - h,
    textAnchor: v,
    verticalAnchor: p
  }, O) : i === "insideBottomRight" ? We({
    x: o + c - m,
    y: s + l - h,
    textAnchor: E,
    verticalAnchor: p
  }, O) : Ea(i) && (J(i.x) || en(i.x)) && (J(i.y) || en(i.y)) ? We({
    x: o + ht(i.x, c),
    y: s + ht(i.y, l),
    textAnchor: "end",
    verticalAnchor: "end"
  }, O) : We({
    x: o + c / 2,
    y: s + l / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, O);
}, c8 = function(t) {
  return "cx" in t && J(t.cx);
};
function Qe(e) {
  var t = e.offset, r = t === void 0 ? 5 : t, n = J4(e, K4), a = We({
    offset: r
  }, n), i = a.viewBox, u = a.position, o = a.value, s = a.children, c = a.content, l = a.className, f = l === void 0 ? "" : l, h = a.textBreakAll;
  if (!i || me(o) && me(s) && !/* @__PURE__ */ Lt(c) && !de(c))
    return null;
  if (/* @__PURE__ */ Lt(c))
    return /* @__PURE__ */ Ue(c, a);
  var p;
  if (de(c)) {
    if (p = /* @__PURE__ */ wo(c, a), /* @__PURE__ */ Lt(p))
      return p;
  } else
    p = a8(a);
  var g = c8(i), y = le(a, !0);
  if (g && (u === "insideStart" || u === "insideEnd" || u === "end"))
    return u8(a, p, y);
  var m = g ? o8(a) : s8(a);
  return /* @__PURE__ */ C.createElement(mn, Ti({
    className: pe("recharts-label", f)
  }, y, m, {
    breakAll: h
  }), p);
}
Qe.displayName = "Label";
var RO = function(t) {
  var r = t.cx, n = t.cy, a = t.angle, i = t.startAngle, u = t.endAngle, o = t.r, s = t.radius, c = t.innerRadius, l = t.outerRadius, f = t.x, h = t.y, p = t.top, g = t.left, y = t.width, m = t.height, E = t.clockWise, v = t.labelViewBox;
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
    endAngle: u || a || 0,
    innerRadius: c || 0,
    outerRadius: l || s || o || 0,
    clockWise: E
  } : t.viewBox ? t.viewBox : {};
}, l8 = function(t, r) {
  return t ? t === !0 ? /* @__PURE__ */ C.createElement(Qe, {
    key: "label-implicit",
    viewBox: r
  }) : Ge(t) ? /* @__PURE__ */ C.createElement(Qe, {
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
  }) : Ea(t) ? /* @__PURE__ */ C.createElement(Qe, Ti({
    viewBox: r
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, f8 = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && n && !t.label)
    return null;
  var a = t.children, i = RO(t), u = jt(a, Qe).map(function(s, c) {
    return /* @__PURE__ */ Ue(s, {
      viewBox: r || i,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(c)
    });
  });
  if (!n)
    return u;
  var o = l8(t.label, r || i);
  return [o].concat(z4(u));
};
Qe.parseViewBox = RO;
Qe.renderCallByParent = f8;
var Jf, y1;
function d8() {
  if (y1) return Jf;
  y1 = 1;
  function e(t) {
    var r = t == null ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  }
  return Jf = e, Jf;
}
var h8 = d8();
const p8 = /* @__PURE__ */ xe(h8);
function _i(e) {
  "@babel/helpers - typeof";
  return _i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _i(e);
}
var m8 = ["valueAccessor"], y8 = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function b8(e) {
  return T8(e) || E8(e) || v8(e) || g8();
}
function g8() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function v8(e, t) {
  if (e) {
    if (typeof e == "string") return Ph(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ph(e, t);
  }
}
function E8(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function T8(e) {
  if (Array.isArray(e)) return Ph(e);
}
function Ph(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function eo() {
  return eo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, eo.apply(this, arguments);
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
function g1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? b1(Object(r), !0).forEach(function(n) {
      _8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : b1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _8(e, t, r) {
  return t = A8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function A8(e) {
  var t = O8(e, "string");
  return _i(t) == "symbol" ? t : t + "";
}
function O8(e, t) {
  if (_i(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (_i(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function v1(e, t) {
  if (e == null) return {};
  var r = S8(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function S8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var x8 = function(t) {
  return Array.isArray(t.value) ? p8(t.value) : t.value;
};
function Gt(e) {
  var t = e.valueAccessor, r = t === void 0 ? x8 : t, n = v1(e, m8), a = n.data, i = n.dataKey, u = n.clockWise, o = n.id, s = n.textBreakAll, c = v1(n, y8);
  return !a || !a.length ? null : /* @__PURE__ */ C.createElement(Oe, {
    className: "recharts-label-list"
  }, a.map(function(l, f) {
    var h = me(i) ? r(l, f) : ot(l && l.payload, i), p = me(o) ? {} : {
      id: "".concat(o, "-").concat(f)
    };
    return /* @__PURE__ */ C.createElement(Qe, eo({}, le(l, !0), c, p, {
      parentViewBox: l.parentViewBox,
      value: h,
      textBreakAll: s,
      viewBox: Qe.parseViewBox(me(u) ? l : g1(g1({}, l), {}, {
        clockWise: u
      })),
      key: "label-".concat(f),
      index: f
    }));
  }));
}
Gt.displayName = "LabelList";
function w8(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ C.createElement(Gt, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ C.isValidElement(e) || de(e) ? /* @__PURE__ */ C.createElement(Gt, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : Ea(e) ? /* @__PURE__ */ C.createElement(Gt, eo({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function P8(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label)
    return null;
  var n = e.children, a = jt(n, Gt).map(function(u, o) {
    return /* @__PURE__ */ Ue(u, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(o)
    });
  });
  if (!r)
    return a;
  var i = w8(e.label, t);
  return [i].concat(b8(a));
}
Gt.renderCallByParent = P8;
function Ai(e) {
  "@babel/helpers - typeof";
  return Ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ai(e);
}
function Ih() {
  return Ih = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ih.apply(this, arguments);
}
function E1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function T1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? E1(Object(r), !0).forEach(function(n) {
      I8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : E1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function I8(e, t, r) {
  return t = C8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function C8(e) {
  var t = N8(e, "string");
  return Ai(t) == "symbol" ? t : t + "";
}
function N8(e, t) {
  if (Ai(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ai(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var R8 = function(t, r) {
  var n = dt(r - t), a = Math.min(Math.abs(r - t), 359.999);
  return n * a;
}, fu = function(t) {
  var r = t.cx, n = t.cy, a = t.radius, i = t.angle, u = t.sign, o = t.isExternal, s = t.cornerRadius, c = t.cornerIsExternal, l = s * (o ? 1 : -1) + a, f = Math.asin(s / l) / Ju, h = c ? i : i + u * f, p = Ne(r, n, l, h), g = Ne(r, n, a, h), y = c ? i - u * f : i, m = Ne(r, n, l * Math.cos(f * Ju), y);
  return {
    center: p,
    circleTangency: g,
    lineTangency: m,
    theta: f
  };
}, DO = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, u = t.startAngle, o = t.endAngle, s = R8(u, o), c = u + s, l = Ne(r, n, i, u), f = Ne(r, n, i, c), h = "M ".concat(l.x, ",").concat(l.y, `
    A `).concat(i, ",").concat(i, `,0,
    `).concat(+(Math.abs(s) > 180), ",").concat(+(u > c), `,
    `).concat(f.x, ",").concat(f.y, `
  `);
  if (a > 0) {
    var p = Ne(r, n, a, u), g = Ne(r, n, a, c);
    h += "L ".concat(g.x, ",").concat(g.y, `
            A `).concat(a, ",").concat(a, `,0,
            `).concat(+(Math.abs(s) > 180), ",").concat(+(u <= c), `,
            `).concat(p.x, ",").concat(p.y, " Z");
  } else
    h += "L ".concat(r, ",").concat(n, " Z");
  return h;
}, D8 = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, u = t.cornerRadius, o = t.forceCornerRadius, s = t.cornerIsExternal, c = t.startAngle, l = t.endAngle, f = dt(l - c), h = fu({
    cx: r,
    cy: n,
    radius: i,
    angle: c,
    sign: f,
    cornerRadius: u,
    cornerIsExternal: s
  }), p = h.circleTangency, g = h.lineTangency, y = h.theta, m = fu({
    cx: r,
    cy: n,
    radius: i,
    angle: l,
    sign: -f,
    cornerRadius: u,
    cornerIsExternal: s
  }), E = m.circleTangency, v = m.lineTangency, _ = m.theta, A = s ? Math.abs(c - l) : Math.abs(c - l) - y - _;
  if (A < 0)
    return o ? "M ".concat(g.x, ",").concat(g.y, `
        a`).concat(u, ",").concat(u, ",0,0,1,").concat(u * 2, `,0
        a`).concat(u, ",").concat(u, ",0,0,1,").concat(-u * 2, `,0
      `) : DO({
      cx: r,
      cy: n,
      innerRadius: a,
      outerRadius: i,
      startAngle: c,
      endAngle: l
    });
  var b = "M ".concat(g.x, ",").concat(g.y, `
    A`).concat(u, ",").concat(u, ",0,0,").concat(+(f < 0), ",").concat(p.x, ",").concat(p.y, `
    A`).concat(i, ",").concat(i, ",0,").concat(+(A > 180), ",").concat(+(f < 0), ",").concat(E.x, ",").concat(E.y, `
    A`).concat(u, ",").concat(u, ",0,0,").concat(+(f < 0), ",").concat(v.x, ",").concat(v.y, `
  `);
  if (a > 0) {
    var T = fu({
      cx: r,
      cy: n,
      radius: a,
      angle: c,
      sign: f,
      isExternal: !0,
      cornerRadius: u,
      cornerIsExternal: s
    }), O = T.circleTangency, P = T.lineTangency, N = T.theta, j = fu({
      cx: r,
      cy: n,
      radius: a,
      angle: l,
      sign: -f,
      isExternal: !0,
      cornerRadius: u,
      cornerIsExternal: s
    }), D = j.circleTangency, R = j.lineTangency, B = j.theta, F = s ? Math.abs(c - l) : Math.abs(c - l) - N - B;
    if (F < 0 && u === 0)
      return "".concat(b, "L").concat(r, ",").concat(n, "Z");
    b += "L".concat(R.x, ",").concat(R.y, `
      A`).concat(u, ",").concat(u, ",0,0,").concat(+(f < 0), ",").concat(D.x, ",").concat(D.y, `
      A`).concat(a, ",").concat(a, ",0,").concat(+(F > 180), ",").concat(+(f > 0), ",").concat(O.x, ",").concat(O.y, `
      A`).concat(u, ",").concat(u, ",0,0,").concat(+(f < 0), ",").concat(P.x, ",").concat(P.y, "Z");
  } else
    b += "L".concat(r, ",").concat(n, "Z");
  return b;
}, M8 = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, MO = function(t) {
  var r = T1(T1({}, M8), t), n = r.cx, a = r.cy, i = r.innerRadius, u = r.outerRadius, o = r.cornerRadius, s = r.forceCornerRadius, c = r.cornerIsExternal, l = r.startAngle, f = r.endAngle, h = r.className;
  if (u < i || l === f)
    return null;
  var p = pe("recharts-sector", h), g = u - i, y = ht(o, g, 0, !0), m;
  return y > 0 && Math.abs(l - f) < 360 ? m = D8({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: u,
    cornerRadius: Math.min(y, g / 2),
    forceCornerRadius: s,
    cornerIsExternal: c,
    startAngle: l,
    endAngle: f
  }) : m = DO({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: u,
    startAngle: l,
    endAngle: f
  }), /* @__PURE__ */ C.createElement("path", Ih({}, le(r, !0), {
    className: p,
    d: m,
    role: "img"
  }));
};
function Oi(e) {
  "@babel/helpers - typeof";
  return Oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Oi(e);
}
function Ch() {
  return Ch = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ch.apply(this, arguments);
}
function _1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function A1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _1(Object(r), !0).forEach(function(n) {
      L8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function L8(e, t, r) {
  return t = k8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function k8(e) {
  var t = B8(e, "string");
  return Oi(t) == "symbol" ? t : t + "";
}
function B8(e, t) {
  if (Oi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Oi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var O1 = {
  curveBasisClosed: n3,
  curveBasisOpen: a3,
  curveBasis: r3,
  curveBumpX: HN,
  curveBumpY: qN,
  curveLinearClosed: i3,
  curveLinear: Ho,
  curveMonotoneX: u3,
  curveMonotoneY: o3,
  curveNatural: s3,
  curveStep: c3,
  curveStepAfter: f3,
  curveStepBefore: l3
}, du = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, Ma = function(t) {
  return t.x;
}, La = function(t) {
  return t.y;
}, j8 = function(t, r) {
  if (de(t))
    return t;
  var n = "curve".concat($o(t));
  return (n === "curveMonotone" || n === "curveBump") && r ? O1["".concat(n).concat(r === "vertical" ? "Y" : "X")] : O1[n] || Ho;
}, F8 = function(t) {
  var r = t.type, n = r === void 0 ? "linear" : r, a = t.points, i = a === void 0 ? [] : a, u = t.baseLine, o = t.layout, s = t.connectNulls, c = s === void 0 ? !1 : s, l = j8(n, o), f = c ? i.filter(function(y) {
    return du(y);
  }) : i, h;
  if (Array.isArray(u)) {
    var p = c ? u.filter(function(y) {
      return du(y);
    }) : u, g = f.map(function(y, m) {
      return A1(A1({}, y), {}, {
        base: p[m]
      });
    });
    return o === "vertical" ? h = nu().y(La).x1(Ma).x0(function(y) {
      return y.base.x;
    }) : h = nu().x(Ma).y1(La).y0(function(y) {
      return y.base.y;
    }), h.defined(du).curve(l), h(g);
  }
  return o === "vertical" && J(u) ? h = nu().y(La).x1(Ma).x0(u) : J(u) ? h = nu().x(Ma).y1(La).y0(u) : h = D_().x(Ma).y(La), h.defined(du).curve(l), h(f);
}, Nh = function(t) {
  var r = t.className, n = t.points, a = t.path, i = t.pathRef;
  if ((!n || !n.length) && !a)
    return null;
  var u = n && n.length ? F8(t) : a;
  return /* @__PURE__ */ $r.createElement("path", Ch({}, le(t, !1), wu(t), {
    className: pe("recharts-curve", r),
    d: u,
    ref: i
  }));
}, hu = { exports: {} }, pu = { exports: {} }, Te = {};
var S1;
function $8() {
  if (S1) return Te;
  S1 = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? /* @__PURE__ */ Symbol.for("react.element") : 60103, r = e ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, n = e ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, a = e ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, i = e ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, u = e ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, o = e ? /* @__PURE__ */ Symbol.for("react.context") : 60110, s = e ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, c = e ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, l = e ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, f = e ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, h = e ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, p = e ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, g = e ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, y = e ? /* @__PURE__ */ Symbol.for("react.block") : 60121, m = e ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, E = e ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, v = e ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
  function _(b) {
    if (typeof b == "object" && b !== null) {
      var T = b.$$typeof;
      switch (T) {
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
                case o:
                case l:
                case g:
                case p:
                case u:
                  return b;
                default:
                  return T;
              }
          }
        case r:
          return T;
      }
    }
  }
  function A(b) {
    return _(b) === c;
  }
  return Te.AsyncMode = s, Te.ConcurrentMode = c, Te.ContextConsumer = o, Te.ContextProvider = u, Te.Element = t, Te.ForwardRef = l, Te.Fragment = n, Te.Lazy = g, Te.Memo = p, Te.Portal = r, Te.Profiler = i, Te.StrictMode = a, Te.Suspense = f, Te.isAsyncMode = function(b) {
    return A(b) || _(b) === s;
  }, Te.isConcurrentMode = A, Te.isContextConsumer = function(b) {
    return _(b) === o;
  }, Te.isContextProvider = function(b) {
    return _(b) === u;
  }, Te.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, Te.isForwardRef = function(b) {
    return _(b) === l;
  }, Te.isFragment = function(b) {
    return _(b) === n;
  }, Te.isLazy = function(b) {
    return _(b) === g;
  }, Te.isMemo = function(b) {
    return _(b) === p;
  }, Te.isPortal = function(b) {
    return _(b) === r;
  }, Te.isProfiler = function(b) {
    return _(b) === i;
  }, Te.isStrictMode = function(b) {
    return _(b) === a;
  }, Te.isSuspense = function(b) {
    return _(b) === f;
  }, Te.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === n || b === c || b === i || b === a || b === f || b === h || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === p || b.$$typeof === u || b.$$typeof === o || b.$$typeof === l || b.$$typeof === m || b.$$typeof === E || b.$$typeof === v || b.$$typeof === y);
  }, Te.typeOf = _, Te;
}
var _e = {};
var x1;
function U8() {
  return x1 || (x1 = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? /* @__PURE__ */ Symbol.for("react.element") : 60103, r = e ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, n = e ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, a = e ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, i = e ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, u = e ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, o = e ? /* @__PURE__ */ Symbol.for("react.context") : 60110, s = e ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, c = e ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, l = e ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, f = e ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, h = e ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, p = e ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, g = e ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, y = e ? /* @__PURE__ */ Symbol.for("react.block") : 60121, m = e ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, E = e ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, v = e ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
    function _(M) {
      return typeof M == "string" || typeof M == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      M === n || M === c || M === i || M === a || M === f || M === h || typeof M == "object" && M !== null && (M.$$typeof === g || M.$$typeof === p || M.$$typeof === u || M.$$typeof === o || M.$$typeof === l || M.$$typeof === m || M.$$typeof === E || M.$$typeof === v || M.$$typeof === y);
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
                  case o:
                  case l:
                  case g:
                  case p:
                  case u:
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
    var b = s, T = c, O = o, P = u, N = t, j = l, D = n, R = g, B = p, F = r, $ = i, q = a, Y = f, Q = !1;
    function te(M) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), k(M) || A(M) === s;
    }
    function k(M) {
      return A(M) === c;
    }
    function W(M) {
      return A(M) === o;
    }
    function G(M) {
      return A(M) === u;
    }
    function Z(M) {
      return typeof M == "object" && M !== null && M.$$typeof === t;
    }
    function ne(M) {
      return A(M) === l;
    }
    function ue(M) {
      return A(M) === n;
    }
    function oe(M) {
      return A(M) === g;
    }
    function fe(M) {
      return A(M) === p;
    }
    function ce(M) {
      return A(M) === r;
    }
    function K(M) {
      return A(M) === i;
    }
    function re(M) {
      return A(M) === a;
    }
    function ie(M) {
      return A(M) === f;
    }
    _e.AsyncMode = b, _e.ConcurrentMode = T, _e.ContextConsumer = O, _e.ContextProvider = P, _e.Element = N, _e.ForwardRef = j, _e.Fragment = D, _e.Lazy = R, _e.Memo = B, _e.Portal = F, _e.Profiler = $, _e.StrictMode = q, _e.Suspense = Y, _e.isAsyncMode = te, _e.isConcurrentMode = k, _e.isContextConsumer = W, _e.isContextProvider = G, _e.isElement = Z, _e.isForwardRef = ne, _e.isFragment = ue, _e.isLazy = oe, _e.isMemo = fe, _e.isPortal = ce, _e.isProfiler = K, _e.isStrictMode = re, _e.isSuspense = ie, _e.isValidElementType = _, _e.typeOf = A;
  })()), _e;
}
var w1;
function LO() {
  return w1 || (w1 = 1, process.env.NODE_ENV === "production" ? pu.exports = $8() : pu.exports = U8()), pu.exports;
}
var ed, P1;
function H8() {
  if (P1) return ed;
  P1 = 1;
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
      for (var u = {}, o = 0; o < 10; o++)
        u["_" + String.fromCharCode(o)] = o;
      var s = Object.getOwnPropertyNames(u).map(function(l) {
        return u[l];
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
  return ed = a() ? Object.assign : function(i, u) {
    for (var o, s = n(i), c, l = 1; l < arguments.length; l++) {
      o = Object(arguments[l]);
      for (var f in o)
        t.call(o, f) && (s[f] = o[f]);
      if (e) {
        c = e(o);
        for (var h = 0; h < c.length; h++)
          r.call(o, c[h]) && (s[c[h]] = o[c[h]]);
      }
    }
    return s;
  }, ed;
}
var td, I1;
function T0() {
  if (I1) return td;
  I1 = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return td = e, td;
}
var rd, C1;
function kO() {
  return C1 || (C1 = 1, rd = Function.call.bind(Object.prototype.hasOwnProperty)), rd;
}
var nd, N1;
function q8() {
  if (N1) return nd;
  N1 = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = /* @__PURE__ */ T0(), r = {}, n = /* @__PURE__ */ kO();
    e = function(i) {
      var u = "Warning: " + i;
      typeof console < "u" && console.error(u);
      try {
        throw new Error(u);
      } catch {
      }
    };
  }
  function a(i, u, o, s, c) {
    if (process.env.NODE_ENV !== "production") {
      for (var l in i)
        if (n(i, l)) {
          var f;
          try {
            if (typeof i[l] != "function") {
              var h = Error(
                (s || "React class") + ": " + o + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw h.name = "Invariant Violation", h;
            }
            f = i[l](u, l, s, o, null, t);
          } catch (g) {
            f = g;
          }
          if (f && !(f instanceof Error) && e(
            (s || "React class") + ": type specification of " + o + " `" + l + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in r)) {
            r[f.message] = !0;
            var p = c ? c() : "";
            e(
              "Failed " + o + " type: " + f.message + (p ?? "")
            );
          }
        }
    }
  }
  return a.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, nd = a, nd;
}
var ad, R1;
function W8() {
  if (R1) return ad;
  R1 = 1;
  var e = LO(), t = H8(), r = /* @__PURE__ */ T0(), n = /* @__PURE__ */ kO(), a = /* @__PURE__ */ q8(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(o) {
    var s = "Warning: " + o;
    typeof console < "u" && console.error(s);
    try {
      throw new Error(s);
    } catch {
    }
  });
  function u() {
    return null;
  }
  return ad = function(o, s) {
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
      arrayOf: _,
      element: A(),
      elementType: b(),
      instanceOf: T,
      node: j(),
      objectOf: P,
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
        var W = {}, G = 0;
      function Z(ue, oe, fe, ce, K, re, ie) {
        if (ce = ce || h, re = re || fe, ie !== r) {
          if (s) {
            var M = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw M.name = "Invariant Violation", M;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ye = ce + ":" + fe;
            !W[ye] && // Avoid spamming the console because they are often not actionable except for lib authors
            G < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + re + "` prop on `" + ce + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), W[ye] = !0, G++);
          }
        }
        return oe[fe] == null ? ue ? oe[fe] === null ? new y("The " + K + " `" + re + "` is marked as required " + ("in `" + ce + "`, but its value is `null`.")) : new y("The " + K + " `" + re + "` is marked as required in " + ("`" + ce + "`, but its value is `undefined`.")) : null : k(oe, fe, ce, K, re);
      }
      var ne = Z.bind(null, !1);
      return ne.isRequired = Z.bind(null, !0), ne;
    }
    function E(k) {
      function W(G, Z, ne, ue, oe, fe) {
        var ce = G[Z], K = q(ce);
        if (K !== k) {
          var re = Y(ce);
          return new y(
            "Invalid " + ue + " `" + oe + "` of type " + ("`" + re + "` supplied to `" + ne + "`, expected ") + ("`" + k + "`."),
            { expectedType: k }
          );
        }
        return null;
      }
      return m(W);
    }
    function v() {
      return m(u);
    }
    function _(k) {
      function W(G, Z, ne, ue, oe) {
        if (typeof k != "function")
          return new y("Property `" + oe + "` of component `" + ne + "` has invalid PropType notation inside arrayOf.");
        var fe = G[Z];
        if (!Array.isArray(fe)) {
          var ce = q(fe);
          return new y("Invalid " + ue + " `" + oe + "` of type " + ("`" + ce + "` supplied to `" + ne + "`, expected an array."));
        }
        for (var K = 0; K < fe.length; K++) {
          var re = k(fe, K, ne, ue, oe + "[" + K + "]", r);
          if (re instanceof Error)
            return re;
        }
        return null;
      }
      return m(W);
    }
    function A() {
      function k(W, G, Z, ne, ue) {
        var oe = W[G];
        if (!o(oe)) {
          var fe = q(oe);
          return new y("Invalid " + ne + " `" + ue + "` of type " + ("`" + fe + "` supplied to `" + Z + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(k);
    }
    function b() {
      function k(W, G, Z, ne, ue) {
        var oe = W[G];
        if (!e.isValidElementType(oe)) {
          var fe = q(oe);
          return new y("Invalid " + ne + " `" + ue + "` of type " + ("`" + fe + "` supplied to `" + Z + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(k);
    }
    function T(k) {
      function W(G, Z, ne, ue, oe) {
        if (!(G[Z] instanceof k)) {
          var fe = k.name || h, ce = te(G[Z]);
          return new y("Invalid " + ue + " `" + oe + "` of type " + ("`" + ce + "` supplied to `" + ne + "`, expected ") + ("instance of `" + fe + "`."));
        }
        return null;
      }
      return m(W);
    }
    function O(k) {
      if (!Array.isArray(k))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), u;
      function W(G, Z, ne, ue, oe) {
        for (var fe = G[Z], ce = 0; ce < k.length; ce++)
          if (g(fe, k[ce]))
            return null;
        var K = JSON.stringify(k, function(ie, M) {
          var ye = Y(M);
          return ye === "symbol" ? String(M) : M;
        });
        return new y("Invalid " + ue + " `" + oe + "` of value `" + String(fe) + "` " + ("supplied to `" + ne + "`, expected one of " + K + "."));
      }
      return m(W);
    }
    function P(k) {
      function W(G, Z, ne, ue, oe) {
        if (typeof k != "function")
          return new y("Property `" + oe + "` of component `" + ne + "` has invalid PropType notation inside objectOf.");
        var fe = G[Z], ce = q(fe);
        if (ce !== "object")
          return new y("Invalid " + ue + " `" + oe + "` of type " + ("`" + ce + "` supplied to `" + ne + "`, expected an object."));
        for (var K in fe)
          if (n(fe, K)) {
            var re = k(fe, K, ne, ue, oe + "." + K, r);
            if (re instanceof Error)
              return re;
          }
        return null;
      }
      return m(W);
    }
    function N(k) {
      if (!Array.isArray(k))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), u;
      for (var W = 0; W < k.length; W++) {
        var G = k[W];
        if (typeof G != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Q(G) + " at index " + W + "."
          ), u;
      }
      function Z(ne, ue, oe, fe, ce) {
        for (var K = [], re = 0; re < k.length; re++) {
          var ie = k[re], M = ie(ne, ue, oe, fe, ce, r);
          if (M == null)
            return null;
          M.data && n(M.data, "expectedType") && K.push(M.data.expectedType);
        }
        var ye = K.length > 0 ? ", expected one of type [" + K.join(", ") + "]" : "";
        return new y("Invalid " + fe + " `" + ce + "` supplied to " + ("`" + oe + "`" + ye + "."));
      }
      return m(Z);
    }
    function j() {
      function k(W, G, Z, ne, ue) {
        return F(W[G]) ? null : new y("Invalid " + ne + " `" + ue + "` supplied to " + ("`" + Z + "`, expected a ReactNode."));
      }
      return m(k);
    }
    function D(k, W, G, Z, ne) {
      return new y(
        (k || "React class") + ": " + W + " type `" + G + "." + Z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + ne + "`."
      );
    }
    function R(k) {
      function W(G, Z, ne, ue, oe) {
        var fe = G[Z], ce = q(fe);
        if (ce !== "object")
          return new y("Invalid " + ue + " `" + oe + "` of type `" + ce + "` " + ("supplied to `" + ne + "`, expected `object`."));
        for (var K in k) {
          var re = k[K];
          if (typeof re != "function")
            return D(ne, ue, oe, K, Y(re));
          var ie = re(fe, K, ne, ue, oe + "." + K, r);
          if (ie)
            return ie;
        }
        return null;
      }
      return m(W);
    }
    function B(k) {
      function W(G, Z, ne, ue, oe) {
        var fe = G[Z], ce = q(fe);
        if (ce !== "object")
          return new y("Invalid " + ue + " `" + oe + "` of type `" + ce + "` " + ("supplied to `" + ne + "`, expected `object`."));
        var K = t({}, G[Z], k);
        for (var re in K) {
          var ie = k[re];
          if (n(k, re) && typeof ie != "function")
            return D(ne, ue, oe, re, Y(ie));
          if (!ie)
            return new y(
              "Invalid " + ue + " `" + oe + "` key `" + re + "` supplied to `" + ne + "`.\nBad object: " + JSON.stringify(G[Z], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(k), null, "  ")
            );
          var M = ie(fe, re, ne, ue, oe + "." + re, r);
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
          if (k === null || o(k))
            return !0;
          var W = f(k);
          if (W) {
            var G = W.call(k), Z;
            if (W !== k.entries) {
              for (; !(Z = G.next()).done; )
                if (!F(Z.value))
                  return !1;
            } else
              for (; !(Z = G.next()).done; ) {
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
  }, ad;
}
var id, D1;
function Y8() {
  if (D1) return id;
  D1 = 1;
  var e = /* @__PURE__ */ T0();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, id = function() {
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
  }, id;
}
var M1;
function G8() {
  if (M1) return hu.exports;
  if (M1 = 1, process.env.NODE_ENV !== "production") {
    var e = LO(), t = !0;
    hu.exports = /* @__PURE__ */ W8()(e.isElement, t);
  } else
    hu.exports = /* @__PURE__ */ Y8()();
  return hu.exports;
}
var K8 = /* @__PURE__ */ G8();
const Ae = /* @__PURE__ */ xe(K8), { getOwnPropertyNames: z8, getOwnPropertySymbols: V8 } = Object, { hasOwnProperty: X8 } = Object.prototype;
function ud(e, t) {
  return function(n, a, i) {
    return e(n, a, i) && t(n, a, i);
  };
}
function mu(e) {
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
function Q8(e) {
  return e?.[Symbol.toStringTag];
}
function L1(e) {
  return z8(e).concat(V8(e));
}
const Z8 = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((e, t) => X8.call(e, t))
);
function On(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
const J8 = "__v", e5 = "__o", t5 = "_owner", { getOwnPropertyDescriptor: k1, keys: B1 } = Object;
function r5(e, t) {
  return e.byteLength === t.byteLength && to(new Uint8Array(e), new Uint8Array(t));
}
function n5(e, t, r) {
  let n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function a5(e, t) {
  return e.byteLength === t.byteLength && to(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}
function i5(e, t) {
  return On(e.getTime(), t.getTime());
}
function u5(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function o5(e, t) {
  return e === t;
}
function j1(e, t, r) {
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
const s5 = On;
function c5(e, t, r) {
  const n = B1(e);
  let a = n.length;
  if (B1(t).length !== a)
    return !1;
  for (; a-- > 0; )
    if (!BO(e, t, r, n[a]))
      return !1;
  return !0;
}
function ka(e, t, r) {
  const n = L1(e);
  let a = n.length;
  if (L1(t).length !== a)
    return !1;
  let i, u, o;
  for (; a-- > 0; )
    if (i = n[a], !BO(e, t, r, i) || (u = k1(e, i), o = k1(t, i), (u || o) && (!u || !o || u.configurable !== o.configurable || u.enumerable !== o.enumerable || u.writable !== o.writable)))
      return !1;
  return !0;
}
function l5(e, t) {
  return On(e.valueOf(), t.valueOf());
}
function f5(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function F1(e, t, r) {
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
function to(e, t) {
  let r = e.byteLength;
  if (t.byteLength !== r || e.byteOffset !== t.byteOffset)
    return !1;
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function d5(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password;
}
function BO(e, t, r, n) {
  return (n === t5 || n === e5 || n === J8) && (e.$$typeof || t.$$typeof) ? !0 : Z8(t, n) && r.equals(e[n], t[n], n, n, e, t, r);
}
const h5 = "[object ArrayBuffer]", p5 = "[object Arguments]", m5 = "[object Boolean]", y5 = "[object DataView]", b5 = "[object Date]", g5 = "[object Error]", v5 = "[object Map]", E5 = "[object Number]", T5 = "[object Object]", _5 = "[object RegExp]", A5 = "[object Set]", O5 = "[object String]", S5 = {
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
}, x5 = "[object URL]", w5 = Object.prototype.toString;
function P5({ areArrayBuffersEqual: e, areArraysEqual: t, areDataViewsEqual: r, areDatesEqual: n, areErrorsEqual: a, areFunctionsEqual: i, areMapsEqual: u, areNumbersEqual: o, areObjectsEqual: s, arePrimitiveWrappersEqual: c, areRegExpsEqual: l, areSetsEqual: f, areTypedArraysEqual: h, areUrlsEqual: p, unknownTagComparators: g }) {
  return function(m, E, v) {
    if (m === E)
      return !0;
    if (m == null || E == null)
      return !1;
    const _ = typeof m;
    if (_ !== typeof E)
      return !1;
    if (_ !== "object")
      return _ === "number" ? o(m, E, v) : _ === "function" ? i(m, E, v) : !1;
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
      return u(m, E, v);
    if (A === Set)
      return f(m, E, v);
    const b = w5.call(m);
    if (b === b5)
      return n(m, E, v);
    if (b === _5)
      return l(m, E, v);
    if (b === v5)
      return u(m, E, v);
    if (b === A5)
      return f(m, E, v);
    if (b === T5)
      return typeof m.then != "function" && typeof E.then != "function" && s(m, E, v);
    if (b === x5)
      return p(m, E, v);
    if (b === g5)
      return a(m, E, v);
    if (b === p5)
      return s(m, E, v);
    if (S5[b])
      return h(m, E, v);
    if (b === h5)
      return e(m, E, v);
    if (b === y5)
      return r(m, E, v);
    if (b === m5 || b === E5 || b === O5)
      return c(m, E, v);
    if (g) {
      let T = g[b];
      if (!T) {
        const O = Q8(m);
        O && (T = g[O]);
      }
      if (T)
        return T(m, E, v);
    }
    return !1;
  };
}
function I5({ circular: e, createCustomConfig: t, strict: r }) {
  let n = {
    areArrayBuffersEqual: r5,
    areArraysEqual: r ? ka : n5,
    areDataViewsEqual: a5,
    areDatesEqual: i5,
    areErrorsEqual: u5,
    areFunctionsEqual: o5,
    areMapsEqual: r ? ud(j1, ka) : j1,
    areNumbersEqual: s5,
    areObjectsEqual: r ? ka : c5,
    arePrimitiveWrappersEqual: l5,
    areRegExpsEqual: f5,
    areSetsEqual: r ? ud(F1, ka) : F1,
    areTypedArraysEqual: r ? ud(to, ka) : to,
    areUrlsEqual: d5,
    unknownTagComparators: void 0
  };
  if (t && (n = Object.assign({}, n, t(n))), e) {
    const a = mu(n.areArraysEqual), i = mu(n.areMapsEqual), u = mu(n.areObjectsEqual), o = mu(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: a,
      areMapsEqual: i,
      areObjectsEqual: u,
      areSetsEqual: o
    });
  }
  return n;
}
function C5(e) {
  return function(t, r, n, a, i, u, o) {
    return e(t, r, o);
  };
}
function N5({ circular: e, comparator: t, createState: r, equals: n, strict: a }) {
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
const R5 = Gr();
Gr({ strict: !0 });
Gr({ circular: !0 });
Gr({
  circular: !0,
  strict: !0
});
Gr({
  createInternalComparator: () => On
});
Gr({
  strict: !0,
  createInternalComparator: () => On
});
Gr({
  circular: !0,
  createInternalComparator: () => On
});
Gr({
  circular: !0,
  createInternalComparator: () => On,
  strict: !0
});
function Gr(e = {}) {
  const { circular: t = !1, createInternalComparator: r, createState: n, strict: a = !1 } = e, i = I5(e), u = P5(i), o = r ? r(u) : C5(u);
  return N5({ circular: t, comparator: u, createState: n, equals: o, strict: a });
}
function D5(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function $1(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = -1, n = function a(i) {
    r < 0 && (r = i), i - r > t ? (e(i), r = -1) : D5(a);
  };
  requestAnimationFrame(n);
}
function Rh(e) {
  "@babel/helpers - typeof";
  return Rh = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Rh(e);
}
function M5(e) {
  return j5(e) || B5(e) || k5(e) || L5();
}
function L5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function k5(e, t) {
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
function B5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function j5(e) {
  if (Array.isArray(e)) return e;
}
function F5() {
  var e = {}, t = function() {
    return null;
  }, r = !1, n = function a(i) {
    if (!r) {
      if (Array.isArray(i)) {
        if (!i.length)
          return;
        var u = i, o = M5(u), s = o[0], c = o.slice(1);
        if (typeof s == "number") {
          $1(a.bind(null, c), s);
          return;
        }
        a(s), $1(a.bind(null, c));
        return;
      }
      Rh(i) === "object" && (e = i, t(e)), typeof i == "function" && i();
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
function Si(e) {
  "@babel/helpers - typeof";
  return Si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Si(e);
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
      jO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : H1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function jO(e, t, r) {
  return t = $5(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $5(e) {
  var t = U5(e, "string");
  return Si(t) === "symbol" ? t : String(t);
}
function U5(e, t) {
  if (Si(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Si(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var H5 = function(t, r) {
  return [Object.keys(t), Object.keys(r)].reduce(function(n, a) {
    return n.filter(function(i) {
      return a.includes(i);
    });
  });
}, q5 = function(t) {
  return t;
}, W5 = function(t) {
  return t.replace(/([A-Z])/g, function(r) {
    return "-".concat(r.toLowerCase());
  });
}, Qa = function(t, r) {
  return Object.keys(r).reduce(function(n, a) {
    return q1(q1({}, n), {}, jO({}, a, t(a, r[a])));
  }, {});
}, W1 = function(t, r, n) {
  return t.map(function(a) {
    return "".concat(W5(a), " ").concat(r, "ms ").concat(n);
  }).join(",");
}, Y5 = process.env.NODE_ENV !== "production", ro = function(t, r, n, a, i, u, o, s) {
  if (Y5 && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var c = [n, a, i, u, o, s], l = 0;
      console.warn(r.replace(/%s/g, function() {
        return c[l++];
      }));
    }
};
function G5(e, t) {
  return V5(e) || z5(e, t) || FO(e, t) || K5();
}
function K5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function z5(e, t) {
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
function V5(e) {
  if (Array.isArray(e)) return e;
}
function X5(e) {
  return J5(e) || Z5(e) || FO(e) || Q5();
}
function Q5() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function FO(e, t) {
  if (e) {
    if (typeof e == "string") return Dh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Dh(e, t);
  }
}
function Z5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function J5(e) {
  if (Array.isArray(e)) return Dh(e);
}
function Dh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var no = 1e-4, $O = function(t, r) {
  return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
}, UO = function(t, r) {
  return t.map(function(n, a) {
    return n * Math.pow(r, a);
  }).reduce(function(n, a) {
    return n + a;
  });
}, Y1 = function(t, r) {
  return function(n) {
    var a = $O(t, r);
    return UO(a, n);
  };
}, eB = function(t, r) {
  return function(n) {
    var a = $O(t, r), i = [].concat(X5(a.map(function(u, o) {
      return u * o;
    }).slice(1)), [0]);
    return UO(i, n);
  };
}, G1 = function() {
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
          }), l = G5(c, 4);
          a = l[0], i = l[1], u = l[2], o = l[3];
        } else
          ro(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r);
      }
    }
  ro([a, u, i, o].every(function(m) {
    return typeof m == "number" && m >= 0 && m <= 1;
  }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
  var f = Y1(a, u), h = Y1(i, o), p = eB(a, u), g = function(E) {
    return E > 1 ? 1 : E < 0 ? 0 : E;
  }, y = function(E) {
    for (var v = E > 1 ? 1 : E, _ = v, A = 0; A < 8; ++A) {
      var b = f(_) - v, T = p(_);
      if (Math.abs(b - v) < no || T < no)
        return h(_);
      _ = g(_ - b / T);
    }
    return h(_);
  };
  return y.isStepper = !1, y;
}, tB = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, a = t.damping, i = a === void 0 ? 8 : a, u = t.dt, o = u === void 0 ? 17 : u, s = function(l, f, h) {
    var p = -(l - f) * n, g = h * i, y = h + (p - g) * o / 1e3, m = h * o / 1e3 + l;
    return Math.abs(m - f) < no && Math.abs(y) < no ? [f, 0] : [m, y];
  };
  return s.isStepper = !0, s.dt = o, s;
}, rB = function() {
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
        return G1(a);
      case "spring":
        return tB();
      default:
        if (a.split("(")[0] === "cubic-bezier")
          return G1(a);
        ro(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r);
    }
  return typeof a == "function" ? a : (ro(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null);
};
function xi(e) {
  "@babel/helpers - typeof";
  return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xi(e);
}
function K1(e) {
  return iB(e) || aB(e) || HO(e) || nB();
}
function nB() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function aB(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function iB(e) {
  if (Array.isArray(e)) return Lh(e);
}
function z1(e, t) {
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
    t % 2 ? z1(Object(r), !0).forEach(function(n) {
      Mh(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : z1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Mh(e, t, r) {
  return t = uB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uB(e) {
  var t = oB(e, "string");
  return xi(t) === "symbol" ? t : String(t);
}
function oB(e, t) {
  if (xi(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (xi(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function sB(e, t) {
  return fB(e) || lB(e, t) || HO(e, t) || cB();
}
function cB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function HO(e, t) {
  if (e) {
    if (typeof e == "string") return Lh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Lh(e, t);
  }
}
function Lh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function lB(e, t) {
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
function fB(e) {
  if (Array.isArray(e)) return e;
}
var ao = function(t, r, n) {
  return t + (r - t) * n;
}, kh = function(t) {
  var r = t.from, n = t.to;
  return r !== n;
}, dB = function e(t, r, n) {
  var a = Qa(function(i, u) {
    if (kh(u)) {
      var o = t(u.from, u.to, u.velocity), s = sB(o, 2), c = s[0], l = s[1];
      return tt(tt({}, u), {}, {
        from: c,
        velocity: l
      });
    }
    return u;
  }, r);
  return n < 1 ? Qa(function(i, u) {
    return kh(u) ? tt(tt({}, u), {}, {
      velocity: ao(u.velocity, a[i].velocity, n),
      from: ao(u.from, a[i].from, n)
    }) : u;
  }, r) : e(t, a, n - 1);
};
const hB = (function(e, t, r, n, a) {
  var i = H5(e, t), u = i.reduce(function(m, E) {
    return tt(tt({}, m), {}, Mh({}, E, [e[E], t[E]]));
  }, {}), o = i.reduce(function(m, E) {
    return tt(tt({}, m), {}, Mh({}, E, {
      from: e[E],
      velocity: 0,
      to: t[E]
    }));
  }, {}), s = -1, c, l, f = function() {
    return null;
  }, h = function() {
    return Qa(function(E, v) {
      return v.from;
    }, o);
  }, p = function() {
    return !Object.values(o).filter(kh).length;
  }, g = function(E) {
    c || (c = E);
    var v = E - c, _ = v / r.dt;
    o = dB(r, o, _), a(tt(tt(tt({}, e), t), h())), c = E, p() || (s = requestAnimationFrame(f));
  }, y = function(E) {
    l || (l = E);
    var v = (E - l) / n, _ = Qa(function(b, T) {
      return ao.apply(void 0, K1(T).concat([r(v)]));
    }, u);
    if (a(tt(tt(tt({}, e), t), _)), v < 1)
      s = requestAnimationFrame(f);
    else {
      var A = Qa(function(b, T) {
        return ao.apply(void 0, K1(T).concat([r(1)]));
      }, u);
      a(tt(tt(tt({}, e), t), A));
    }
  };
  return f = r.isStepper ? g : y, function() {
    return requestAnimationFrame(f), function() {
      cancelAnimationFrame(s);
    };
  };
});
function ra(e) {
  "@babel/helpers - typeof";
  return ra = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ra(e);
}
var pB = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function mB(e, t) {
  if (e == null) return {};
  var r = yB(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function yB(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function od(e) {
  return EB(e) || vB(e) || gB(e) || bB();
}
function bB() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gB(e, t) {
  if (e) {
    if (typeof e == "string") return Bh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Bh(e, t);
  }
}
function vB(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function EB(e) {
  if (Array.isArray(e)) return Bh(e);
}
function Bh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function V1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? V1(Object(r), !0).forEach(function(n) {
      Ha(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : V1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ha(e, t, r) {
  return t = qO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function TB(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _B(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, qO(n.key), n);
  }
}
function AB(e, t, r) {
  return t && _B(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function qO(e) {
  var t = OB(e, "string");
  return ra(t) === "symbol" ? t : String(t);
}
function OB(e, t) {
  if (ra(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ra(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function SB(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && jh(e, t);
}
function jh(e, t) {
  return jh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, jh(e, t);
}
function xB(e) {
  var t = wB();
  return function() {
    var n = io(e), a;
    if (t) {
      var i = io(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return Fh(this, a);
  };
}
function Fh(e, t) {
  if (t && (ra(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return $h(e);
}
function $h(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function wB() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function io(e) {
  return io = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, io(e);
}
var Or = /* @__PURE__ */ (function(e) {
  SB(r, e);
  var t = xB(r);
  function r(n, a) {
    var i;
    TB(this, r), i = t.call(this, n, a);
    var u = i.props, o = u.isActive, s = u.attributeName, c = u.from, l = u.to, f = u.steps, h = u.children, p = u.duration;
    if (i.handleStyleChange = i.handleStyleChange.bind($h(i)), i.changeStyle = i.changeStyle.bind($h(i)), !o || p <= 0)
      return i.state = {
        style: {}
      }, typeof h == "function" && (i.state = {
        style: l
      }), Fh(i);
    if (f && f.length)
      i.state = {
        style: f[0].style
      };
    else if (c) {
      if (typeof h == "function")
        return i.state = {
          style: c
        }, Fh(i);
      i.state = {
        style: s ? Ha({}, s, c) : c
      };
    } else
      i.state = {
        style: {}
      };
    return i;
  }
  return AB(r, [{
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
            style: s ? Ha({}, s, l) : l
          };
          this.state && h && (s && h[s] !== l || !s && h !== l) && this.setState(p);
          return;
        }
        if (!(R5(a.to, l) && a.canBegin && a.isActive)) {
          var g = !a.canBegin || !a.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var y = g || c ? f : a.to;
          if (this.state && h) {
            var m = {
              style: s ? Ha({}, s, y) : y
            };
            (s && h[s] !== y || !s && h !== y) && this.setState(m);
          }
          this.runAnimation(Ut(Ut({}, this.props), {}, {
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
      var i = this, u = a.from, o = a.to, s = a.duration, c = a.easing, l = a.begin, f = a.onAnimationEnd, h = a.onAnimationStart, p = hB(u, o, rB(c), s, this.changeStyle), g = function() {
        i.stopJSAnimation = p();
      };
      this.manager.start([h, l, g, s, f]);
    }
  }, {
    key: "runStepAnimation",
    value: function(a) {
      var i = this, u = a.steps, o = a.begin, s = a.onAnimationStart, c = u[0], l = c.style, f = c.duration, h = f === void 0 ? 0 : f, p = function(y, m, E) {
        if (E === 0)
          return y;
        var v = m.duration, _ = m.easing, A = _ === void 0 ? "ease" : _, b = m.style, T = m.properties, O = m.onAnimationEnd, P = E > 0 ? u[E - 1] : m, N = T || Object.keys(b);
        if (typeof A == "function" || A === "spring")
          return [].concat(od(y), [i.runJSAnimation.bind(i, {
            from: P.style,
            to: b,
            duration: v,
            easing: A
          }), v]);
        var j = W1(N, v, A), D = Ut(Ut(Ut({}, P.style), b), {}, {
          transition: j
        });
        return [].concat(od(y), [D, v, O]).filter(q5);
      };
      return this.manager.start([s].concat(od(u.reduce(p, [l, Math.max(h, o)])), [a.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(a) {
      this.manager || (this.manager = F5());
      var i = a.begin, u = a.duration, o = a.attributeName, s = a.to, c = a.easing, l = a.onAnimationStart, f = a.onAnimationEnd, h = a.steps, p = a.children, g = this.manager;
      if (this.unSubscribe = g.subscribe(this.handleStyleChange), typeof c == "function" || typeof p == "function" || c === "spring") {
        this.runJSAnimation(a);
        return;
      }
      if (h.length > 1) {
        this.runStepAnimation(a);
        return;
      }
      var y = o ? Ha({}, o, s) : s, m = W1(Object.keys(y), u, c);
      g.start([l, i, Ut(Ut({}, y), {}, {
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
      var s = mB(a, pB), c = Br.count(i), l = this.state.style;
      if (typeof i == "function")
        return i(l);
      if (!o || c === 0 || u <= 0)
        return i;
      var f = function(p) {
        var g = p.props, y = g.style, m = y === void 0 ? {} : y, E = g.className, v = /* @__PURE__ */ Ue(p, Ut(Ut({}, s), {}, {
          style: Ut(Ut({}, m), l),
          className: E
        }));
        return v;
      };
      return c === 1 ? f(Br.only(i)) : /* @__PURE__ */ C.createElement("div", null, Br.map(i, function(h) {
        return f(h);
      }));
    }
  }]), r;
})(ir);
Or.displayName = "Animate";
Or.defaultProps = {
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
Or.propTypes = {
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
function wi(e) {
  "@babel/helpers - typeof";
  return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, wi(e);
}
function uo() {
  return uo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, uo.apply(this, arguments);
}
function PB(e, t) {
  return RB(e) || NB(e, t) || CB(e, t) || IB();
}
function IB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function CB(e, t) {
  if (e) {
    if (typeof e == "string") return X1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return X1(e, t);
  }
}
function X1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function NB(e, t) {
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
function RB(e) {
  if (Array.isArray(e)) return e;
}
function Q1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Z1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Q1(Object(r), !0).forEach(function(n) {
      DB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Q1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function DB(e, t, r) {
  return t = MB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function MB(e) {
  var t = LB(e, "string");
  return wi(t) == "symbol" ? t : t + "";
}
function LB(e, t) {
  if (wi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var J1 = function(t, r, n, a, i) {
  var u = Math.min(Math.abs(n) / 2, Math.abs(a) / 2), o = a >= 0 ? 1 : -1, s = n >= 0 ? 1 : -1, c = a >= 0 && n >= 0 || a < 0 && n < 0 ? 1 : 0, l;
  if (u > 0 && i instanceof Array) {
    for (var f = [0, 0, 0, 0], h = 0, p = 4; h < p; h++)
      f[h] = i[h] > u ? u : i[h];
    l = "M".concat(t, ",").concat(r + o * f[0]), f[0] > 0 && (l += "A ".concat(f[0], ",").concat(f[0], ",0,0,").concat(c, ",").concat(t + s * f[0], ",").concat(r)), l += "L ".concat(t + n - s * f[1], ",").concat(r), f[1] > 0 && (l += "A ".concat(f[1], ",").concat(f[1], ",0,0,").concat(c, `,
        `).concat(t + n, ",").concat(r + o * f[1])), l += "L ".concat(t + n, ",").concat(r + a - o * f[2]), f[2] > 0 && (l += "A ".concat(f[2], ",").concat(f[2], ",0,0,").concat(c, `,
        `).concat(t + n - s * f[2], ",").concat(r + a)), l += "L ".concat(t + s * f[3], ",").concat(r + a), f[3] > 0 && (l += "A ".concat(f[3], ",").concat(f[3], ",0,0,").concat(c, `,
        `).concat(t, ",").concat(r + a - o * f[3])), l += "Z";
  } else if (u > 0 && i === +i && i > 0) {
    var g = Math.min(u, i);
    l = "M ".concat(t, ",").concat(r + o * g, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(c, ",").concat(t + s * g, ",").concat(r, `
            L `).concat(t + n - s * g, ",").concat(r, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(c, ",").concat(t + n, ",").concat(r + o * g, `
            L `).concat(t + n, ",").concat(r + a - o * g, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(c, ",").concat(t + n - s * g, ",").concat(r + a, `
            L `).concat(t + s * g, ",").concat(r + a, `
            A `).concat(g, ",").concat(g, ",0,0,").concat(c, ",").concat(t, ",").concat(r + a - o * g, " Z");
  } else
    l = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(a, " h ").concat(-n, " Z");
  return l;
}, kB = function(t, r) {
  if (!t || !r)
    return !1;
  var n = t.x, a = t.y, i = r.x, u = r.y, o = r.width, s = r.height;
  if (Math.abs(o) > 0 && Math.abs(s) > 0) {
    var c = Math.min(i, i + o), l = Math.max(i, i + o), f = Math.min(u, u + s), h = Math.max(u, u + s);
    return n >= c && n <= l && a >= f && a <= h;
  }
  return !1;
}, BB = {
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
}, _0 = function(t) {
  var r = Z1(Z1({}, BB), t), n = ei(), a = ft(-1), i = PB(a, 2), u = i[0], o = i[1];
  Et(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var A = n.current.getTotalLength();
        A && o(A);
      } catch {
      }
  }, []);
  var s = r.x, c = r.y, l = r.width, f = r.height, h = r.radius, p = r.className, g = r.animationEasing, y = r.animationDuration, m = r.animationBegin, E = r.isAnimationActive, v = r.isUpdateAnimationActive;
  if (s !== +s || c !== +c || l !== +l || f !== +f || l === 0 || f === 0)
    return null;
  var _ = pe("recharts-rectangle", p);
  return v ? /* @__PURE__ */ C.createElement(Or, {
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
    duration: y,
    animationEasing: g,
    isActive: v
  }, function(A) {
    var b = A.width, T = A.height, O = A.x, P = A.y;
    return /* @__PURE__ */ C.createElement(Or, {
      canBegin: u > 0,
      from: "0px ".concat(u === -1 ? 1 : u, "px"),
      to: "".concat(u, "px 0px"),
      attributeName: "strokeDasharray",
      begin: m,
      duration: y,
      isActive: E,
      easing: g
    }, /* @__PURE__ */ C.createElement("path", uo({}, le(r, !0), {
      className: _,
      d: J1(O, P, b, T, h),
      ref: n
    })));
  }) : /* @__PURE__ */ C.createElement("path", uo({}, le(r, !0), {
    className: _,
    d: J1(s, c, l, f, h)
  }));
}, jB = ["points", "className", "baseLinePoints", "connectNulls"];
function kn() {
  return kn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, kn.apply(this, arguments);
}
function FB(e, t) {
  if (e == null) return {};
  var r = $B(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function $B(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function eE(e) {
  return WB(e) || qB(e) || HB(e) || UB();
}
function UB() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function HB(e, t) {
  if (e) {
    if (typeof e == "string") return Uh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Uh(e, t);
  }
}
function qB(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function WB(e) {
  if (Array.isArray(e)) return Uh(e);
}
function Uh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var tE = function(t) {
  return t && t.x === +t.x && t.y === +t.y;
}, YB = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  return t.forEach(function(n) {
    tE(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([]);
  }), tE(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r;
}, Za = function(t, r) {
  var n = YB(t);
  r && (n = [n.reduce(function(i, u) {
    return [].concat(eE(i), eE(u));
  }, [])]);
  var a = n.map(function(i) {
    return i.reduce(function(u, o, s) {
      return "".concat(u).concat(s === 0 ? "M" : "L").concat(o.x, ",").concat(o.y);
    }, "");
  }).join("");
  return n.length === 1 ? "".concat(a, "Z") : a;
}, GB = function(t, r, n) {
  var a = Za(t, n);
  return "".concat(a.slice(-1) === "Z" ? a.slice(0, -1) : a, "L").concat(Za(r.reverse(), n).slice(1));
}, KB = function(t) {
  var r = t.points, n = t.className, a = t.baseLinePoints, i = t.connectNulls, u = FB(t, jB);
  if (!r || !r.length)
    return null;
  var o = pe("recharts-polygon", n);
  if (a && a.length) {
    var s = u.stroke && u.stroke !== "none", c = GB(r, a, i);
    return /* @__PURE__ */ C.createElement("g", {
      className: o
    }, /* @__PURE__ */ C.createElement("path", kn({}, le(u, !0), {
      fill: c.slice(-1) === "Z" ? u.fill : "none",
      stroke: "none",
      d: c
    })), s ? /* @__PURE__ */ C.createElement("path", kn({}, le(u, !0), {
      fill: "none",
      d: Za(r, i)
    })) : null, s ? /* @__PURE__ */ C.createElement("path", kn({}, le(u, !0), {
      fill: "none",
      d: Za(a, i)
    })) : null);
  }
  var l = Za(r, i);
  return /* @__PURE__ */ C.createElement("path", kn({}, le(u, !0), {
    fill: l.slice(-1) === "Z" ? u.fill : "none",
    className: o,
    d: l
  }));
};
function Hh() {
  return Hh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hh.apply(this, arguments);
}
var A0 = function(t) {
  var r = t.cx, n = t.cy, a = t.r, i = t.className, u = pe("recharts-dot", i);
  return r === +r && n === +n && a === +a ? /* @__PURE__ */ $r.createElement("circle", Hh({}, le(t, !1), wu(t), {
    className: u,
    cx: r,
    cy: n,
    r: a
  })) : null;
};
function Pi(e) {
  "@babel/helpers - typeof";
  return Pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pi(e);
}
var zB = ["x", "y", "top", "left", "width", "height", "className"];
function qh() {
  return qh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qh.apply(this, arguments);
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
function VB(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rE(Object(r), !0).forEach(function(n) {
      XB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function XB(e, t, r) {
  return t = QB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QB(e) {
  var t = ZB(e, "string");
  return Pi(t) == "symbol" ? t : t + "";
}
function ZB(e, t) {
  if (Pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function JB(e, t) {
  if (e == null) return {};
  var r = ej(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function ej(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var tj = function(t, r, n, a, i, u) {
  return "M".concat(t, ",").concat(i, "v").concat(a, "M").concat(u, ",").concat(r, "h").concat(n);
}, rj = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, u = t.top, o = u === void 0 ? 0 : u, s = t.left, c = s === void 0 ? 0 : s, l = t.width, f = l === void 0 ? 0 : l, h = t.height, p = h === void 0 ? 0 : h, g = t.className, y = JB(t, zB), m = VB({
    x: n,
    y: i,
    top: o,
    left: c,
    width: f,
    height: p
  }, y);
  return !J(n) || !J(i) || !J(f) || !J(p) || !J(o) || !J(c) ? null : /* @__PURE__ */ C.createElement("path", qh({}, le(m, !0), {
    className: pe("recharts-cross", g),
    d: tj(n, i, f, p, o, c)
  }));
}, sd, nE;
function nj() {
  if (nE) return sd;
  nE = 1;
  var e = es(), t = rO(), r = or();
  function n(a, i) {
    return a && a.length ? e(a, r(i, 2), t) : void 0;
  }
  return sd = n, sd;
}
var aj = nj();
const ij = /* @__PURE__ */ xe(aj);
var cd, aE;
function uj() {
  if (aE) return cd;
  aE = 1;
  var e = es(), t = or(), r = nO();
  function n(a, i) {
    return a && a.length ? e(a, t(i, 2), r) : void 0;
  }
  return cd = n, cd;
}
var oj = uj();
const sj = /* @__PURE__ */ xe(oj);
var cj = ["cx", "cy", "angle", "ticks", "axisLine"], lj = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function na(e) {
  "@babel/helpers - typeof";
  return na = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, na(e);
}
function Ja() {
  return Ja = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ja.apply(this, arguments);
}
function iE(e, t) {
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
    t % 2 ? iE(Object(r), !0).forEach(function(n) {
      os(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : iE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function uE(e, t) {
  if (e == null) return {};
  var r = fj(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function fj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function dj(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function oE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, YO(n.key), n);
  }
}
function hj(e, t, r) {
  return t && oE(e.prototype, t), r && oE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function pj(e, t, r) {
  return t = oo(t), mj(e, WO() ? Reflect.construct(t, r || [], oo(e).constructor) : t.apply(e, r));
}
function mj(e, t) {
  if (t && (na(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return yj(e);
}
function yj(e) {
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
function oo(e) {
  return oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, oo(e);
}
function bj(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Wh(e, t);
}
function Wh(e, t) {
  return Wh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Wh(e, t);
}
function os(e, t, r) {
  return t = YO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function YO(e) {
  var t = gj(e, "string");
  return na(t) == "symbol" ? t : t + "";
}
function gj(e, t) {
  if (na(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (na(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ss = /* @__PURE__ */ (function(e) {
  function t() {
    return dj(this, t), pj(this, t, arguments);
  }
  return bj(t, e), hj(t, [{
    key: "getTickValueCoord",
    value: (
      /**
       * Calculate the coordinate of tick
       * @param  {Number} coordinate The radius of tick
       * @return {Object} (x, y)
       */
      function(n) {
        var a = n.coordinate, i = this.props, u = i.angle, o = i.cx, s = i.cy;
        return Ne(o, s, a, u);
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
      var n = this.props, a = n.cx, i = n.cy, u = n.angle, o = n.ticks, s = ij(o, function(l) {
        return l.coordinate || 0;
      }), c = sj(o, function(l) {
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
      var n = this.props, a = n.cx, i = n.cy, u = n.angle, o = n.ticks, s = n.axisLine, c = uE(n, cj), l = o.reduce(function(g, y) {
        return [Math.min(g[0], y.coordinate), Math.max(g[1], y.coordinate)];
      }, [1 / 0, -1 / 0]), f = Ne(a, i, l[0], u), h = Ne(a, i, l[1], u), p = Vr(Vr(Vr({}, le(c, !1)), {}, {
        fill: "none"
      }, le(s, !1)), {}, {
        x1: f.x,
        y1: f.y,
        x2: h.x,
        y2: h.y
      });
      return /* @__PURE__ */ C.createElement("line", Ja({
        className: "recharts-polar-radius-axis-line"
      }, p));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, a = this.props, i = a.ticks, u = a.tick, o = a.angle, s = a.tickFormatter, c = a.stroke, l = uE(a, lj), f = this.getTickTextAnchor(), h = le(l, !1), p = le(u, !1), g = i.map(function(y, m) {
        var E = n.getTickValueCoord(y), v = Vr(Vr(Vr(Vr({
          textAnchor: f,
          transform: "rotate(".concat(90 - o, ", ").concat(E.x, ", ").concat(E.y, ")")
        }, h), {}, {
          stroke: "none",
          fill: c
        }, p), {}, {
          index: m
        }, E), {}, {
          payload: y
        });
        return /* @__PURE__ */ C.createElement(Oe, Ja({
          className: pe("recharts-polar-radius-axis-tick", NO(u)),
          key: "tick-".concat(y.coordinate)
        }, pn(n.props, y, m)), t.renderTickItem(u, v, s ? s(y.value, m) : y.value));
      });
      return /* @__PURE__ */ C.createElement(Oe, {
        className: "recharts-polar-radius-axis-ticks"
      }, g);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.ticks, i = n.axisLine, u = n.tick;
      return !a || !a.length ? null : /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-polar-radius-axis", this.props.className)
      }, i && this.renderAxisLine(), u && this.renderTicks(), Qe.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var u;
      return /* @__PURE__ */ C.isValidElement(n) ? u = /* @__PURE__ */ C.cloneElement(n, a) : de(n) ? u = n(a) : u = /* @__PURE__ */ C.createElement(mn, Ja({}, a, {
        className: "recharts-polar-radius-axis-tick-value"
      }), i), u;
    }
  }]);
})(ir);
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
function aa(e) {
  "@babel/helpers - typeof";
  return aa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, aa(e);
}
function Jr() {
  return Jr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Jr.apply(this, arguments);
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
function Xr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sE(Object(r), !0).forEach(function(n) {
      cs(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function vj(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function cE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, KO(n.key), n);
  }
}
function Ej(e, t, r) {
  return t && cE(e.prototype, t), r && cE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Tj(e, t, r) {
  return t = so(t), _j(e, GO() ? Reflect.construct(t, r || [], so(e).constructor) : t.apply(e, r));
}
function _j(e, t) {
  if (t && (aa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Aj(e);
}
function Aj(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function GO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (GO = function() {
    return !!e;
  })();
}
function so(e) {
  return so = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, so(e);
}
function Oj(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Yh(e, t);
}
function Yh(e, t) {
  return Yh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Yh(e, t);
}
function cs(e, t, r) {
  return t = KO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function KO(e) {
  var t = Sj(e, "string");
  return aa(t) == "symbol" ? t : t + "";
}
function Sj(e, t) {
  if (aa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (aa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var xj = Math.PI / 180, lE = 1e-5, ls = /* @__PURE__ */ (function(e) {
  function t() {
    return vj(this, t), Tj(this, t, arguments);
  }
  return Oj(t, e), Ej(t, [{
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
        var a = this.props, i = a.cx, u = a.cy, o = a.radius, s = a.orientation, c = a.tickSize, l = c || 8, f = Ne(i, u, o, n.coordinate), h = Ne(i, u, o + (s === "inner" ? -1 : 1) * l, n.coordinate);
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
      var a = this.props.orientation, i = Math.cos(-n.coordinate * xj), u;
      return i > lE ? u = a === "outer" ? "start" : "end" : i < -lE ? u = a === "outer" ? "end" : "start" : u = "middle", u;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.cx, i = n.cy, u = n.radius, o = n.axisLine, s = n.axisLineType, c = Xr(Xr({}, le(this.props, !1)), {}, {
        fill: "none"
      }, le(o, !1));
      if (s === "circle")
        return /* @__PURE__ */ C.createElement(A0, Jr({
          className: "recharts-polar-angle-axis-line"
        }, c, {
          cx: a,
          cy: i,
          r: u
        }));
      var l = this.props.ticks, f = l.map(function(h) {
        return Ne(a, i, u, h.coordinate);
      });
      return /* @__PURE__ */ C.createElement(KB, Jr({
        className: "recharts-polar-angle-axis-line"
      }, c, {
        points: f
      }));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, a = this.props, i = a.ticks, u = a.tick, o = a.tickLine, s = a.tickFormatter, c = a.stroke, l = le(this.props, !1), f = le(u, !1), h = Xr(Xr({}, l), {}, {
        fill: "none"
      }, le(o, !1)), p = i.map(function(g, y) {
        var m = n.getTickLineCoord(g), E = n.getTickTextAnchor(g), v = Xr(Xr(Xr({
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
        return /* @__PURE__ */ C.createElement(Oe, Jr({
          className: pe("recharts-polar-angle-axis-tick", NO(u)),
          key: "tick-".concat(g.coordinate)
        }, pn(n.props, g, y)), o && /* @__PURE__ */ C.createElement("line", Jr({
          className: "recharts-polar-angle-axis-tick-line"
        }, h, m)), u && t.renderTickItem(u, v, s ? s(g.value, y) : g.value));
      });
      return /* @__PURE__ */ C.createElement(Oe, {
        className: "recharts-polar-angle-axis-ticks"
      }, p);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.ticks, i = n.radius, u = n.axisLine;
      return i <= 0 || !a || !a.length ? null : /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-polar-angle-axis", this.props.className)
      }, u && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var u;
      return /* @__PURE__ */ C.isValidElement(n) ? u = /* @__PURE__ */ C.cloneElement(n, a) : de(n) ? u = n(a) : u = /* @__PURE__ */ C.createElement(mn, Jr({}, a, {
        className: "recharts-polar-angle-axis-tick-value"
      }), i), u;
    }
  }]);
})(ir);
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
var ld, fE;
function wj() {
  if (fE) return ld;
  fE = 1;
  var e = rA(), t = e(Object.getPrototypeOf, Object);
  return ld = t, ld;
}
var fd, dE;
function Pj() {
  if (dE) return fd;
  dE = 1;
  var e = Sr(), t = wj(), r = xr(), n = "[object Object]", a = Function.prototype, i = Object.prototype, u = a.toString, o = i.hasOwnProperty, s = u.call(Object);
  function c(l) {
    if (!r(l) || e(l) != n)
      return !1;
    var f = t(l);
    if (f === null)
      return !0;
    var h = o.call(f, "constructor") && f.constructor;
    return typeof h == "function" && h instanceof h && u.call(h) == s;
  }
  return fd = c, fd;
}
var Ij = Pj();
const Cj = /* @__PURE__ */ xe(Ij);
var dd, hE;
function Nj() {
  if (hE) return dd;
  hE = 1;
  var e = Sr(), t = xr(), r = "[object Boolean]";
  function n(a) {
    return a === !0 || a === !1 || t(a) && e(a) == r;
  }
  return dd = n, dd;
}
var Rj = Nj();
const Dj = /* @__PURE__ */ xe(Rj);
function Ii(e) {
  "@babel/helpers - typeof";
  return Ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ii(e);
}
function co() {
  return co = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, co.apply(this, arguments);
}
function Mj(e, t) {
  return jj(e) || Bj(e, t) || kj(e, t) || Lj();
}
function Lj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kj(e, t) {
  if (e) {
    if (typeof e == "string") return pE(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return pE(e, t);
  }
}
function pE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Bj(e, t) {
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
function jj(e) {
  if (Array.isArray(e)) return e;
}
function mE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function yE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mE(Object(r), !0).forEach(function(n) {
      Fj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Fj(e, t, r) {
  return t = $j(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $j(e) {
  var t = Uj(e, "string");
  return Ii(t) == "symbol" ? t : t + "";
}
function Uj(e, t) {
  if (Ii(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var bE = function(t, r, n, a, i) {
  var u = n - a, o;
  return o = "M ".concat(t, ",").concat(r), o += "L ".concat(t + n, ",").concat(r), o += "L ".concat(t + n - u / 2, ",").concat(r + i), o += "L ".concat(t + n - u / 2 - a, ",").concat(r + i), o += "L ".concat(t, ",").concat(r, " Z"), o;
}, Hj = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, qj = function(t) {
  var r = yE(yE({}, Hj), t), n = ei(), a = ft(-1), i = Mj(a, 2), u = i[0], o = i[1];
  Et(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var _ = n.current.getTotalLength();
        _ && o(_);
      } catch {
      }
  }, []);
  var s = r.x, c = r.y, l = r.upperWidth, f = r.lowerWidth, h = r.height, p = r.className, g = r.animationEasing, y = r.animationDuration, m = r.animationBegin, E = r.isUpdateAnimationActive;
  if (s !== +s || c !== +c || l !== +l || f !== +f || h !== +h || l === 0 && f === 0 || h === 0)
    return null;
  var v = pe("recharts-trapezoid", p);
  return E ? /* @__PURE__ */ C.createElement(Or, {
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
    duration: y,
    animationEasing: g,
    isActive: E
  }, function(_) {
    var A = _.upperWidth, b = _.lowerWidth, T = _.height, O = _.x, P = _.y;
    return /* @__PURE__ */ C.createElement(Or, {
      canBegin: u > 0,
      from: "0px ".concat(u === -1 ? 1 : u, "px"),
      to: "".concat(u, "px 0px"),
      attributeName: "strokeDasharray",
      begin: m,
      duration: y,
      easing: g
    }, /* @__PURE__ */ C.createElement("path", co({}, le(r, !0), {
      className: v,
      d: bE(O, P, A, b, T),
      ref: n
    })));
  }) : /* @__PURE__ */ C.createElement("g", null, /* @__PURE__ */ C.createElement("path", co({}, le(r, !0), {
    className: v,
    d: bE(s, c, l, f, h)
  })));
}, Wj = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function Ci(e) {
  "@babel/helpers - typeof";
  return Ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ci(e);
}
function Yj(e, t) {
  if (e == null) return {};
  var r = Gj(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Gj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function gE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function lo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gE(Object(r), !0).forEach(function(n) {
      Kj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Kj(e, t, r) {
  return t = zj(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function zj(e) {
  var t = Vj(e, "string");
  return Ci(t) == "symbol" ? t : t + "";
}
function Vj(e, t) {
  if (Ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Xj(e, t) {
  return lo(lo({}, t), e);
}
function Qj(e, t) {
  return e === "symbols";
}
function vE(e) {
  var t = e.shapeType, r = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ C.createElement(_0, r);
    case "trapezoid":
      return /* @__PURE__ */ C.createElement(qj, r);
    case "sector":
      return /* @__PURE__ */ C.createElement(MO, r);
    case "symbols":
      if (Qj(t))
        return /* @__PURE__ */ C.createElement($p, r);
      break;
    default:
      return null;
  }
}
function Zj(e) {
  return /* @__PURE__ */ Lt(e) ? e.props : e;
}
function zO(e) {
  var t = e.option, r = e.shapeType, n = e.propTransformer, a = n === void 0 ? Xj : n, i = e.activeClassName, u = i === void 0 ? "recharts-active-shape" : i, o = e.isActive, s = Yj(e, Wj), c;
  if (/* @__PURE__ */ Lt(t))
    c = /* @__PURE__ */ Ue(t, lo(lo({}, s), Zj(t)));
  else if (de(t))
    c = t(s);
  else if (Cj(t) && !Dj(t)) {
    var l = a(t, s);
    c = /* @__PURE__ */ C.createElement(vE, {
      shapeType: r,
      elementProps: l
    });
  } else {
    var f = s;
    c = /* @__PURE__ */ C.createElement(vE, {
      shapeType: r,
      elementProps: f
    });
  }
  return o ? /* @__PURE__ */ C.createElement(Oe, {
    className: u
  }, c) : c;
}
function fs(e, t) {
  return t != null && "trapezoids" in e.props;
}
function ds(e, t) {
  return t != null && "sectors" in e.props;
}
function Ni(e, t) {
  return t != null && "points" in e.props;
}
function Jj(e, t) {
  var r, n, a = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x, i = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return a && i;
}
function eF(e, t) {
  var r = e.endAngle === t.endAngle, n = e.startAngle === t.startAngle;
  return r && n;
}
function tF(e, t) {
  var r = e.x === t.x, n = e.y === t.y, a = e.z === t.z;
  return r && n && a;
}
function rF(e, t) {
  var r;
  return fs(e, t) ? r = Jj : ds(e, t) ? r = eF : Ni(e, t) && (r = tF), r;
}
function nF(e, t) {
  var r;
  return fs(e, t) ? r = "trapezoids" : ds(e, t) ? r = "sectors" : Ni(e, t) && (r = "points"), r;
}
function aF(e, t) {
  if (fs(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  if (ds(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  return Ni(e, t) ? t.payload : {};
}
function iF(e) {
  var t = e.activeTooltipItem, r = e.graphicalItem, n = e.itemData, a = nF(r, t), i = aF(r, t), u = n.filter(function(s, c) {
    var l = ns(i, s), f = r.props[a].filter(function(g) {
      var y = rF(r, t);
      return y(g, t);
    }), h = r.props[a].indexOf(f[f.length - 1]), p = c === h;
    return l && p;
  }), o = n.indexOf(u[u.length - 1]);
  return o;
}
var Eu;
function ia(e) {
  "@babel/helpers - typeof";
  return ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ia(e);
}
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
function EE(e, t) {
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
    t % 2 ? EE(Object(r), !0).forEach(function(n) {
      Rt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : EE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function uF(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function TE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, XO(n.key), n);
  }
}
function oF(e, t, r) {
  return t && TE(e.prototype, t), r && TE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function sF(e, t, r) {
  return t = fo(t), cF(e, VO() ? Reflect.construct(t, r || [], fo(e).constructor) : t.apply(e, r));
}
function cF(e, t) {
  if (t && (ia(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return lF(e);
}
function lF(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function VO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (VO = function() {
    return !!e;
  })();
}
function fo(e) {
  return fo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, fo(e);
}
function fF(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Gh(e, t);
}
function Gh(e, t) {
  return Gh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Gh(e, t);
}
function Rt(e, t, r) {
  return t = XO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function XO(e) {
  var t = dF(e, "string");
  return ia(t) == "symbol" ? t : t + "";
}
function dF(e, t) {
  if (ia(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ia(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Pr = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return uF(this, t), n = sF(this, t, [r]), Rt(n, "pieRef", null), Rt(n, "sectorRefs", []), Rt(n, "id", Hi("recharts-pie-")), Rt(n, "handleAnimationEnd", function() {
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
  return fF(t, e), oF(t, [{
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
      var i = this.props, u = i.label, o = i.labelLine, s = i.dataKey, c = i.valueKey, l = le(this.props, !1), f = le(u, !1), h = le(o, !1), p = u && u.offsetRadius || 20, g = n.map(function(y, m) {
        var E = (y.startAngle + y.endAngle) / 2, v = Ne(y.cx, y.cy, y.outerRadius + p, E), _ = Ie(Ie(Ie(Ie({}, l), y), {}, {
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
        }, o && t.renderLabelLineItem(o, A, "line"), t.renderLabelItem(u, _, ot(y, b)));
      });
      return /* @__PURE__ */ C.createElement(Oe, {
        className: "recharts-pie-labels"
      }, g);
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var a = this, i = this.props, u = i.activeShape, o = i.blendStroke, s = i.inactiveShape;
      return n.map(function(c, l) {
        if (c?.startAngle === 0 && c?.endAngle === 0 && n.length !== 1) return null;
        var f = a.isActiveIndex(l), h = s && a.hasActiveIndex() ? s : null, p = f ? u : h, g = Ie(Ie({}, c), {}, {
          stroke: o ? c.fill : c.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ C.createElement(Oe, Bn({
          ref: function(m) {
            m && !a.sectorRefs.includes(m) && a.sectorRefs.push(m);
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, pn(a.props, c, l), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(c?.startAngle, "-").concat(c?.endAngle, "-").concat(c.midAngle, "-").concat(l)
        }), /* @__PURE__ */ C.createElement(zO, Bn({
          option: p,
          isActive: f,
          shapeType: "sector"
        }, g)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this, a = this.props, i = a.sectors, u = a.isAnimationActive, o = a.animationBegin, s = a.animationDuration, c = a.animationEasing, l = a.animationId, f = this.state, h = f.prevSectors, p = f.prevIsAnimationActive;
      return /* @__PURE__ */ C.createElement(Or, {
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
      }, function(g) {
        var y = g.t, m = [], E = i && i[0], v = E.startAngle;
        return i.forEach(function(_, A) {
          var b = h && h[A], T = A > 0 ? xt(_, "paddingAngle", 0) : 0;
          if (b) {
            var O = Rr(b.endAngle - b.startAngle, _.endAngle - _.startAngle), P = Ie(Ie({}, _), {}, {
              startAngle: v + T,
              endAngle: v + O(y) + T
            });
            m.push(P), v = P.endAngle;
          } else {
            var N = _.endAngle, j = _.startAngle, D = Rr(0, N - j), R = D(y), B = Ie(Ie({}, _), {}, {
              startAngle: v + T,
              endAngle: v + R + T
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
      var n = this, a = this.props, i = a.hide, u = a.sectors, o = a.className, s = a.label, c = a.cx, l = a.cy, f = a.innerRadius, h = a.outerRadius, p = a.isAnimationActive, g = this.state.isAnimationFinished;
      if (i || !u || !u.length || !J(c) || !J(l) || !J(f) || !J(h))
        return null;
      var y = pe("recharts-pie", o);
      return /* @__PURE__ */ C.createElement(Oe, {
        tabIndex: this.props.rootTabIndex,
        className: y,
        ref: function(E) {
          n.pieRef = E;
        }
      }, this.renderSectors(), s && this.renderLabels(u), Qe.renderCallByParent(this.props, null, !1), (!p || g) && Gt.renderCallByParent(this.props, u, !1));
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
      var u = pe("recharts-pie-label-line", typeof n != "boolean" ? n.className : "");
      return /* @__PURE__ */ C.createElement(Nh, Bn({}, a, {
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
      if (de(n) && (u = n(a), /* @__PURE__ */ C.isValidElement(u)))
        return u;
      var o = pe("recharts-pie-label-text", typeof n != "boolean" && !de(n) ? n.className : "");
      return /* @__PURE__ */ C.createElement(mn, Bn({}, a, {
        alignmentBaseline: "middle",
        className: o
      }), u);
    }
  }]);
})(ir);
Eu = Pr;
Rt(Pr, "displayName", "Pie");
Rt(Pr, "defaultProps", {
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
Rt(Pr, "parseDeltaAngle", function(e, t) {
  var r = dt(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
});
Rt(Pr, "getRealPieData", function(e) {
  var t = e.data, r = e.children, n = le(e, !1), a = jt(r, Ko);
  return t && t.length ? t.map(function(i, u) {
    return Ie(Ie(Ie({
      payload: i
    }, n), i), a && a[u] && a[u].props);
  }) : a && a.length ? a.map(function(i) {
    return Ie(Ie({}, n), i.props);
  }) : [];
});
Rt(Pr, "parseCoordinateOfPie", function(e, t) {
  var r = t.top, n = t.left, a = t.width, i = t.height, u = CO(a, i), o = n + ht(e.cx, a, a / 2), s = r + ht(e.cy, i, i / 2), c = ht(e.innerRadius, u, 0), l = ht(e.outerRadius, u, u * 0.8), f = e.maxRadius || Math.sqrt(a * a + i * i) / 2;
  return {
    cx: o,
    cy: s,
    innerRadius: c,
    outerRadius: l,
    maxRadius: f
  };
});
Rt(Pr, "getComposedData", function(e) {
  var t = e.item, r = e.offset, n = t.type.defaultProps !== void 0 ? Ie(Ie({}, t.type.defaultProps), t.props) : t.props, a = Eu.getRealPieData(n);
  if (!a || !a.length)
    return null;
  var i = n.cornerRadius, u = n.startAngle, o = n.endAngle, s = n.paddingAngle, c = n.dataKey, l = n.nameKey, f = n.valueKey, h = n.tooltipType, p = Math.abs(n.minAngle), g = Eu.parseCoordinateOfPie(n, r), y = Eu.parseDeltaAngle(u, o), m = Math.abs(y), E = c;
  me(c) && me(f) ? (Yt(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), E = "value") : me(c) && (Yt(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), E = f);
  var v = a.filter(function(P) {
    return ot(P, E, 0) !== 0;
  }).length, _ = (m >= 360 ? v : v - 1) * s, A = m - v * p - _, b = a.reduce(function(P, N) {
    var j = ot(N, E, 0);
    return P + (J(j) ? j : 0);
  }, 0), T;
  if (b > 0) {
    var O;
    T = a.map(function(P, N) {
      var j = ot(P, E, 0), D = ot(P, l, N), R = (J(j) ? j : 0) / b, B;
      N ? B = O.endAngle + dt(y) * s * (j !== 0 ? 1 : 0) : B = u;
      var F = B + dt(y) * ((j !== 0 ? p : 0) + R * A), $ = (B + F) / 2, q = (g.innerRadius + g.outerRadius) / 2, Y = [{
        name: D,
        value: j,
        payload: P,
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
      }, P), g), {}, {
        value: ot(P, E),
        startAngle: B,
        endAngle: F,
        payload: P,
        paddingAngle: dt(y) * s
      }), O;
    });
  }
  return Ie(Ie({}, g), {}, {
    sectors: T,
    data: a
  });
});
var hd, _E;
function hF() {
  if (_E) return hd;
  _E = 1;
  var e = Math.ceil, t = Math.max;
  function r(n, a, i, u) {
    for (var o = -1, s = t(e((a - n) / (i || 1)), 0), c = Array(s); s--; )
      c[u ? s : ++o] = n, n += i;
    return c;
  }
  return hd = r, hd;
}
var pd, AE;
function QO() {
  if (AE) return pd;
  AE = 1;
  var e = gA(), t = 1 / 0, r = 17976931348623157e292;
  function n(a) {
    if (!a)
      return a === 0 ? a : 0;
    if (a = e(a), a === t || a === -t) {
      var i = a < 0 ? -1 : 1;
      return i * r;
    }
    return a === a ? a : 0;
  }
  return pd = n, pd;
}
var md, OE;
function pF() {
  if (OE) return md;
  OE = 1;
  var e = hF(), t = Go(), r = QO();
  function n(a) {
    return function(i, u, o) {
      return o && typeof o != "number" && t(i, u, o) && (u = o = void 0), i = r(i), u === void 0 ? (u = i, i = 0) : u = r(u), o = o === void 0 ? i < u ? 1 : -1 : r(o), e(i, u, o, a);
    };
  }
  return md = n, md;
}
var yd, SE;
function mF() {
  if (SE) return yd;
  SE = 1;
  var e = pF(), t = e();
  return yd = t, yd;
}
var yF = mF();
const ho = /* @__PURE__ */ xe(yF);
function Ri(e) {
  "@babel/helpers - typeof";
  return Ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ri(e);
}
function xE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function wE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xE(Object(r), !0).forEach(function(n) {
      ZO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ZO(e, t, r) {
  return t = bF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bF(e) {
  var t = gF(e, "string");
  return Ri(t) == "symbol" ? t : t + "";
}
function gF(e, t) {
  if (Ri(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ri(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var vF = ["Webkit", "Moz", "O", "ms"], EF = function(t, r) {
  var n = t.replace(/(\w)/, function(i) {
    return i.toUpperCase();
  }), a = vF.reduce(function(i, u) {
    return wE(wE({}, i), {}, ZO({}, u + n, r));
  }, {});
  return a[t] = r, a;
};
function ua(e) {
  "@babel/helpers - typeof";
  return ua = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ua(e);
}
function po() {
  return po = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, po.apply(this, arguments);
}
function PE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? PE(Object(r), !0).forEach(function(n) {
      _t(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : PE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function TF(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function IE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, eS(n.key), n);
  }
}
function _F(e, t, r) {
  return t && IE(e.prototype, t), r && IE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function AF(e, t, r) {
  return t = mo(t), OF(e, JO() ? Reflect.construct(t, r || [], mo(e).constructor) : t.apply(e, r));
}
function OF(e, t) {
  if (t && (ua(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return SF(e);
}
function SF(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function JO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (JO = function() {
    return !!e;
  })();
}
function mo(e) {
  return mo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, mo(e);
}
function xF(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Kh(e, t);
}
function Kh(e, t) {
  return Kh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Kh(e, t);
}
function _t(e, t, r) {
  return t = eS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function eS(e) {
  var t = wF(e, "string");
  return ua(t) == "symbol" ? t : t + "";
}
function wF(e, t) {
  if (ua(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ua(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var PF = function(t) {
  var r = t.data, n = t.startIndex, a = t.endIndex, i = t.x, u = t.width, o = t.travellerWidth;
  if (!r || !r.length)
    return {};
  var s = r.length, c = Va().domain(ho(0, s)).range([i, i + u - o]), l = c.domain().map(function(f) {
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
}, CE = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, oa = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return TF(this, t), n = AF(this, t, [r]), _t(n, "handleDrag", function(a) {
      n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(a) : n.state.isSlideMoving && n.handleSlideDrag(a);
    }), _t(n, "handleTouchMove", function(a) {
      a.changedTouches != null && a.changedTouches.length > 0 && n.handleDrag(a.changedTouches[0]);
    }), _t(n, "handleDragEnd", function() {
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
      var i = CE(a) ? a.changedTouches[0] : a;
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
  return xF(t, e), _F(t, [{
    key: "componentWillUnmount",
    value: function() {
      this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
    }
  }, {
    key: "getIndex",
    value: function(n) {
      var a = n.startX, i = n.endX, u = this.state.scaleValues, o = this.props, s = o.gap, c = o.data, l = c.length - 1, f = Math.min(a, i), h = Math.max(a, i), p = t.getIndexInRange(u, f), g = t.getIndexInRange(u, h);
      return {
        startIndex: p - p % s,
        endIndex: g === l ? l : g - g % s
      };
    }
  }, {
    key: "getTextOfTick",
    value: function(n) {
      var a = this.props, i = a.data, u = a.tickFormatter, o = a.dataKey, s = ot(i[n], o, n);
      return de(u) ? u(s, n) : s;
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
      var a = this.state, i = a.slideMoveStartX, u = a.startX, o = a.endX, s = this.props, c = s.x, l = s.width, f = s.travellerWidth, h = s.startIndex, p = s.endIndex, g = s.onChange, y = n.pageX - i;
      y > 0 ? y = Math.min(y, c + l - f - o, c + l - f - u) : y < 0 && (y = Math.max(y, c - u, c - o));
      var m = this.getIndex({
        startX: u + y,
        endX: o + y
      });
      (m.startIndex !== h || m.endIndex !== p) && g && g(m), this.setState({
        startX: u + y,
        endX: o + y,
        slideMoveStartX: n.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function(n, a) {
      var i = CE(a) ? a.changedTouches[0] : a;
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
      var a = this.state, i = a.brushMoveStartX, u = a.movingTravellerId, o = a.endX, s = a.startX, c = this.state[u], l = this.props, f = l.x, h = l.width, p = l.travellerWidth, g = l.onChange, y = l.gap, m = l.data, E = {
        startX: this.state.startX,
        endX: this.state.endX
      }, v = n.pageX - i;
      v > 0 ? v = Math.min(v, f + h - p - c) : v < 0 && (v = Math.max(v, f - c)), E[u] = c + v;
      var _ = this.getIndex(E), A = _.startIndex, b = _.endIndex, T = function() {
        var P = m.length - 1;
        return u === "startX" && (o > s ? A % y === 0 : b % y === 0) || o < s && b === P || u === "endX" && (o > s ? b % y === 0 : A % y === 0) || o > s && b === P;
      };
      this.setState(_t(_t({}, u, c + v), "brushMoveStartX", n.pageX), function() {
        g && T() && g(_);
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
      var n = this.props, a = n.x, i = n.y, u = n.width, o = n.height, s = n.data, c = n.children, l = n.padding, f = Br.only(c);
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
      var i, u, o = this, s = this.props, c = s.y, l = s.travellerWidth, f = s.height, h = s.traveller, p = s.ariaLabel, g = s.data, y = s.startIndex, m = s.endIndex, E = Math.max(n, this.props.x), v = bd(bd({}, le(this.props, !1)), {}, {
        x: E,
        y: c,
        width: l,
        height: f
      }), _ = p || "Min value: ".concat((i = g[y]) === null || i === void 0 ? void 0 : i.name, ", Max value: ").concat((u = g[m]) === null || u === void 0 ? void 0 : u.name);
      return /* @__PURE__ */ C.createElement(Oe, {
        tabIndex: 0,
        role: "slider",
        "aria-label": _,
        "aria-valuenow": n,
        className: "recharts-brush-traveller",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.travellerDragStartHandlers[a],
        onTouchStart: this.travellerDragStartHandlers[a],
        onKeyDown: function(b) {
          ["ArrowLeft", "ArrowRight"].includes(b.key) && (b.preventDefault(), b.stopPropagation(), o.handleTravellerMoveKeyboard(b.key === "ArrowRight" ? 1 : -1, a));
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
      }, t.renderTraveller(h, v));
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
      var n = this.props, a = n.startIndex, i = n.endIndex, u = n.y, o = n.height, s = n.travellerWidth, c = n.stroke, l = this.state, f = l.startX, h = l.endX, p = 5, g = {
        pointerEvents: "none",
        fill: c
      };
      return /* @__PURE__ */ C.createElement(Oe, {
        className: "recharts-brush-texts"
      }, /* @__PURE__ */ C.createElement(mn, po({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(f, h) - p,
        y: u + o / 2
      }, g), this.getTextOfTick(a)), /* @__PURE__ */ C.createElement(mn, po({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(f, h) + s + p,
        y: u + o / 2
      }, g), this.getTextOfTick(i)));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.data, i = n.className, u = n.children, o = n.x, s = n.y, c = n.width, l = n.height, f = n.alwaysShowText, h = this.state, p = h.startX, g = h.endX, y = h.isTextActive, m = h.isSlideMoving, E = h.isTravellerMoving, v = h.isTravellerFocused;
      if (!a || !a.length || !J(o) || !J(s) || !J(c) || !J(l) || c <= 0 || l <= 0)
        return null;
      var _ = pe("recharts-brush", i), A = C.Children.count(u) === 1, b = EF("userSelect", "none");
      return /* @__PURE__ */ C.createElement(Oe, {
        className: _,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: b
      }, this.renderBackground(), A && this.renderPanorama(), this.renderSlide(p, g), this.renderTravellerLayer(p, "startX"), this.renderTravellerLayer(g, "endX"), (y || m || E || v || f) && this.renderText());
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
      return /* @__PURE__ */ C.isValidElement(n) ? i = /* @__PURE__ */ C.cloneElement(n, a) : de(n) ? i = n(a) : i = t.renderDefaultTraveller(a), i;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(n, a) {
      var i = n.data, u = n.width, o = n.x, s = n.travellerWidth, c = n.updateId, l = n.startIndex, f = n.endIndex;
      if (i !== a.prevData || c !== a.prevUpdateId)
        return bd({
          prevData: i,
          prevTravellerWidth: s,
          prevUpdateId: c,
          prevX: o,
          prevWidth: u
        }, i && i.length ? PF({
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
})(ir);
_t(oa, "displayName", "Brush");
_t(oa, "defaultProps", {
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
var gd, NE;
function IF() {
  if (NE) return gd;
  NE = 1;
  var e = Kp();
  function t(r, n) {
    var a;
    return e(r, function(i, u, o) {
      return a = n(i, u, o), !a;
    }), !!a;
  }
  return gd = t, gd;
}
var vd, RE;
function CF() {
  if (RE) return vd;
  RE = 1;
  var e = V_(), t = or(), r = IF(), n = Tt(), a = Go();
  function i(u, o, s) {
    var c = n(u) ? e : r;
    return s && a(u, o, s) && (o = void 0), c(u, t(o, 3));
  }
  return vd = i, vd;
}
var NF = CF();
const RF = /* @__PURE__ */ xe(NF);
var rr = function(t, r) {
  var n = t.alwaysShow, a = t.ifOverflow;
  return n && (a = "extendDomain"), a === r;
}, Ed, DE;
function DF() {
  if (DE) return Ed;
  DE = 1;
  var e = hA();
  function t(r, n, a) {
    n == "__proto__" && e ? e(r, n, {
      configurable: !0,
      enumerable: !0,
      value: a,
      writable: !0
    }) : r[n] = a;
  }
  return Ed = t, Ed;
}
var Td, ME;
function MF() {
  if (ME) return Td;
  ME = 1;
  var e = DF(), t = fA(), r = or();
  function n(a, i) {
    var u = {};
    return i = r(i, 3), t(a, function(o, s, c) {
      e(u, s, i(o, s, c));
    }), u;
  }
  return Td = n, Td;
}
var LF = MF();
const kF = /* @__PURE__ */ xe(LF);
var _d, LE;
function BF() {
  if (LE) return _d;
  LE = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length; ++n < a; )
      if (!r(t[n], n, t))
        return !1;
    return !0;
  }
  return _d = e, _d;
}
var Ad, kE;
function jF() {
  if (kE) return Ad;
  kE = 1;
  var e = Kp();
  function t(r, n) {
    var a = !0;
    return e(r, function(i, u, o) {
      return a = !!n(i, u, o), a;
    }), a;
  }
  return Ad = t, Ad;
}
var Od, BE;
function FF() {
  if (BE) return Od;
  BE = 1;
  var e = BF(), t = jF(), r = or(), n = Tt(), a = Go();
  function i(u, o, s) {
    var c = n(u) ? e : t;
    return s && a(u, o, s) && (o = void 0), c(u, r(o, 3));
  }
  return Od = i, Od;
}
var $F = FF();
const tS = /* @__PURE__ */ xe($F);
var UF = ["x", "y"];
function sa(e) {
  "@babel/helpers - typeof";
  return sa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sa(e);
}
function zh() {
  return zh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, zh.apply(this, arguments);
}
function jE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ba(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jE(Object(r), !0).forEach(function(n) {
      HF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function HF(e, t, r) {
  return t = qF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qF(e) {
  var t = WF(e, "string");
  return sa(t) == "symbol" ? t : t + "";
}
function WF(e, t) {
  if (sa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (sa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function YF(e, t) {
  if (e == null) return {};
  var r = GF(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function GF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function KF(e, t) {
  var r = e.x, n = e.y, a = YF(e, UF), i = "".concat(r), u = parseInt(i, 10), o = "".concat(n), s = parseInt(o, 10), c = "".concat(t.height || a.height), l = parseInt(c, 10), f = "".concat(t.width || a.width), h = parseInt(f, 10);
  return Ba(Ba(Ba(Ba(Ba({}, t), a), u ? {
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
function FE(e) {
  return /* @__PURE__ */ C.createElement(zO, zh({
    shapeType: "rectangle",
    propTransformer: KF,
    activeClassName: "recharts-active-bar"
  }, e));
}
var zF = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, a) {
    if (typeof t == "number") return t;
    var i = J(n) || cN(n);
    return i ? t(n, a) : (i || (process.env.NODE_ENV !== "production" ? vt(!1, "minPointSize callback function received a value with type of ".concat(sa(n), ". Currently only numbers or null/undefined are supported.")) : vt()), r);
  };
}, VF = ["value", "background"], rS;
function ca(e) {
  "@babel/helpers - typeof";
  return ca = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ca(e);
}
function XF(e, t) {
  if (e == null) return {};
  var r = QF(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function QF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function yo() {
  return yo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, yo.apply(this, arguments);
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
function $e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $E(Object(r), !0).forEach(function(n) {
      kr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $E(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ZF(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function UE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, aS(n.key), n);
  }
}
function JF(e, t, r) {
  return t && UE(e.prototype, t), r && UE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function e9(e, t, r) {
  return t = bo(t), t9(e, nS() ? Reflect.construct(t, r || [], bo(e).constructor) : t.apply(e, r));
}
function t9(e, t) {
  if (t && (ca(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return r9(e);
}
function r9(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function nS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (nS = function() {
    return !!e;
  })();
}
function bo(e) {
  return bo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, bo(e);
}
function n9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Vh(e, t);
}
function Vh(e, t) {
  return Vh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Vh(e, t);
}
function kr(e, t, r) {
  return t = aS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function aS(e) {
  var t = a9(e, "string");
  return ca(t) == "symbol" ? t : t + "";
}
function a9(e, t) {
  if (ca(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ca(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var sr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    ZF(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = e9(this, t, [].concat(a)), kr(r, "state", {
      isAnimationFinished: !1
    }), kr(r, "id", Hi("recharts-bar-")), kr(r, "handleAnimationEnd", function() {
      var u = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), u && u();
    }), kr(r, "handleAnimationStart", function() {
      var u = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), u && u();
    }), r;
  }
  return n9(t, e), JF(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var a = this, i = this.props, u = i.shape, o = i.dataKey, s = i.activeIndex, c = i.activeBar, l = le(this.props, !1);
      return n && n.map(function(f, h) {
        var p = h === s, g = p ? c : u, y = $e($e($e({}, l), f), {}, {
          isActive: p,
          option: g,
          index: h,
          dataKey: o,
          onAnimationStart: a.handleAnimationStart,
          onAnimationEnd: a.handleAnimationEnd
        });
        return /* @__PURE__ */ C.createElement(Oe, yo({
          className: "recharts-bar-rectangle"
        }, pn(a.props, f, h), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(f?.x, "-").concat(f?.y, "-").concat(f?.value, "-").concat(h)
        }), /* @__PURE__ */ C.createElement(FE, y));
      });
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var n = this, a = this.props, i = a.data, u = a.layout, o = a.isAnimationActive, s = a.animationBegin, c = a.animationDuration, l = a.animationEasing, f = a.animationId, h = this.state.prevData;
      return /* @__PURE__ */ C.createElement(Or, {
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
        var g = p.t, y = i.map(function(m, E) {
          var v = h && h[E];
          if (v) {
            var _ = Rr(v.x, m.x), A = Rr(v.y, m.y), b = Rr(v.width, m.width), T = Rr(v.height, m.height);
            return $e($e({}, m), {}, {
              x: _(g),
              y: A(g),
              width: b(g),
              height: T(g)
            });
          }
          if (u === "horizontal") {
            var O = Rr(0, m.height), P = O(g);
            return $e($e({}, m), {}, {
              y: m.y + m.height - P,
              height: P
            });
          }
          var N = Rr(0, m.width), j = N(g);
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
      var n = this.props, a = n.data, i = n.isAnimationActive, u = this.state.prevData;
      return i && a && a.length && (!u || !ns(u, a)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(a);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this, a = this.props, i = a.data, u = a.dataKey, o = a.activeIndex, s = le(this.props.background, !1);
      return i.map(function(c, l) {
        c.value;
        var f = c.background, h = XF(c, VF);
        if (!f)
          return null;
        var p = $e($e($e($e($e({}, h), {}, {
          fill: "#eee"
        }, f), s), pn(n.props, c, l)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: u,
          index: l,
          className: "recharts-bar-background-rectangle"
        });
        return /* @__PURE__ */ C.createElement(FE, yo({
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
      var i = this.props, u = i.data, o = i.xAxis, s = i.yAxis, c = i.layout, l = i.children, f = jt(l, us);
      if (!f)
        return null;
      var h = c === "vertical" ? u[0].height / 2 : u[0].width / 2, p = function(m, E) {
        var v = Array.isArray(m.value) ? m.value[1] : m.value;
        return {
          x: m.x,
          y: m.y,
          value: v,
          errorVal: ot(m, E)
        };
      }, g = {
        clipPath: n ? "url(#clipPath-".concat(a, ")") : null
      };
      return /* @__PURE__ */ C.createElement(Oe, g, f.map(function(y) {
        return /* @__PURE__ */ C.cloneElement(y, {
          key: "error-bar-".concat(a, "-").concat(y.props.dataKey),
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
      var n = this.props, a = n.hide, i = n.data, u = n.className, o = n.xAxis, s = n.yAxis, c = n.left, l = n.top, f = n.width, h = n.height, p = n.isAnimationActive, g = n.background, y = n.id;
      if (a || !i || !i.length)
        return null;
      var m = this.state.isAnimationFinished, E = pe("recharts-bar", u), v = o && o.allowDataOverflow, _ = s && s.allowDataOverflow, A = v || _, b = me(y) ? this.id : y;
      return /* @__PURE__ */ C.createElement(Oe, {
        className: E
      }, v || _ ? /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("clipPath", {
        id: "clipPath-".concat(b)
      }, /* @__PURE__ */ C.createElement("rect", {
        x: v ? c : c - f / 2,
        y: _ ? l : l - h / 2,
        width: v ? f : f * 2,
        height: _ ? h : h * 2
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
rS = sr;
kr(sr, "displayName", "Bar");
kr(sr, "defaultProps", {
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
kr(sr, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.barPosition, a = e.bandSize, i = e.xAxis, u = e.yAxis, o = e.xAxisTicks, s = e.yAxisTicks, c = e.stackedData, l = e.dataStartIndex, f = e.displayedData, h = e.offset, p = O4(n, r);
  if (!p)
    return null;
  var g = t.layout, y = r.type.defaultProps, m = y !== void 0 ? $e($e({}, y), r.props) : r.props, E = m.dataKey, v = m.children, _ = m.minPointSize, A = g === "horizontal" ? u : i, b = c ? A.scale.domain() : null, T = N4({
    numericAxis: A
  }), O = jt(v, Ko), P = f.map(function(N, j) {
    var D, R, B, F, $, q;
    c ? D = S4(c[l + j], b) : (D = ot(N, E), Array.isArray(D) || (D = [T, D]));
    var Y = zF(_, rS.defaultProps.minPointSize)(D[1], j);
    if (g === "horizontal") {
      var Q, te = [u.scale(D[0]), u.scale(D[1])], k = te[0], W = te[1];
      R = s1({
        axis: i,
        ticks: o,
        bandSize: a,
        offset: p.offset,
        entry: N,
        index: j
      }), B = (Q = W ?? k) !== null && Q !== void 0 ? Q : void 0, F = p.size;
      var G = k - W;
      if ($ = Number.isNaN(G) ? 0 : G, q = {
        x: R,
        y: u.y,
        width: F,
        height: u.height
      }, Math.abs(Y) > 0 && Math.abs($) < Math.abs(Y)) {
        var Z = dt($ || Y) * (Math.abs(Y) - Math.abs($));
        B -= Z, $ += Z;
      }
    } else {
      var ne = [i.scale(D[0]), i.scale(D[1])], ue = ne[0], oe = ne[1];
      if (R = ue, B = s1({
        axis: u,
        ticks: s,
        bandSize: a,
        offset: p.offset,
        entry: N,
        index: j
      }), F = oe - ue, $ = p.size, q = {
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
      tooltipPayload: [PO(r, N)],
      tooltipPosition: {
        x: R + F / 2,
        y: B + $ / 2
      }
    });
  });
  return $e({
    data: P,
    layout: g
  }, h);
});
function Di(e) {
  "@babel/helpers - typeof";
  return Di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Di(e);
}
function i9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function HE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, iS(n.key), n);
  }
}
function u9(e, t, r) {
  return t && HE(e.prototype, t), r && HE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
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
function Ht(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qE(Object(r), !0).forEach(function(n) {
      hs(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hs(e, t, r) {
  return t = iS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function iS(e) {
  var t = o9(e, "string");
  return Di(t) == "symbol" ? t : t + "";
}
function o9(e, t) {
  if (Di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var s9 = function(t, r, n, a, i) {
  var u = t.width, o = t.height, s = t.layout, c = t.children, l = Object.keys(r), f = {
    left: n.left,
    leftMirror: n.left,
    right: u - n.right,
    rightMirror: u - n.right,
    top: n.top,
    topMirror: n.top,
    bottom: o - n.bottom,
    bottomMirror: o - n.bottom
  }, h = !!At(c, sr);
  return l.reduce(function(p, g) {
    var y = r[g], m = y.orientation, E = y.domain, v = y.padding, _ = v === void 0 ? {} : v, A = y.mirror, b = y.reversed, T = "".concat(m).concat(A ? "Mirror" : ""), O, P, N, j, D;
    if (y.type === "number" && (y.padding === "gap" || y.padding === "no-gap")) {
      var R = E[1] - E[0], B = 1 / 0, F = y.categoricalDomain.sort(dN);
      if (F.forEach(function(ne, ue) {
        ue > 0 && (B = Math.min((ne || 0) - (F[ue - 1] || 0), B));
      }), Number.isFinite(B)) {
        var $ = B / R, q = y.layout === "vertical" ? n.height : n.width;
        if (y.padding === "gap" && (O = $ * q / 2), y.padding === "no-gap") {
          var Y = ht(t.barCategoryGap, $ * q), Q = $ * q / 2;
          O = Q - Y - (Q - Y) / q * Y;
        }
      }
    }
    a === "xAxis" ? P = [n.left + (_.left || 0) + (O || 0), n.left + n.width - (_.right || 0) - (O || 0)] : a === "yAxis" ? P = s === "horizontal" ? [n.top + n.height - (_.bottom || 0), n.top + (_.top || 0)] : [n.top + (_.top || 0) + (O || 0), n.top + n.height - (_.bottom || 0) - (O || 0)] : P = y.range, b && (P = [P[1], P[0]]);
    var te = OO(y, i, h), k = te.scale, W = te.realScaleType;
    k.domain(E).range(P), SO(k);
    var G = xO(k, Ht(Ht({}, y), {}, {
      realScaleType: W
    }));
    a === "xAxis" ? (D = m === "top" && !A || m === "bottom" && A, N = n.left, j = f[T] - D * y.height) : a === "yAxis" && (D = m === "left" && !A || m === "right" && A, N = f[T] - D * y.width, j = n.top);
    var Z = Ht(Ht(Ht({}, y), G), {}, {
      realScaleType: W,
      x: N,
      y: j,
      scale: k,
      width: a === "xAxis" ? n.width : y.width,
      height: a === "yAxis" ? n.height : y.height
    });
    return Z.bandSize = Zu(Z, G), !y.hide && a === "xAxis" ? f[T] += (D ? -1 : 1) * Z.height : y.hide || (f[T] += (D ? -1 : 1) * Z.width), Ht(Ht({}, p), {}, hs({}, g, Z));
  }, {});
}, uS = function(t, r) {
  var n = t.x, a = t.y, i = r.x, u = r.y;
  return {
    x: Math.min(n, i),
    y: Math.min(a, u),
    width: Math.abs(i - n),
    height: Math.abs(u - a)
  };
}, c9 = function(t) {
  var r = t.x1, n = t.y1, a = t.x2, i = t.y2;
  return uS({
    x: r,
    y: n
  }, {
    x: a,
    y: i
  });
}, oS = /* @__PURE__ */ (function() {
  function e(t) {
    i9(this, e), this.scale = t;
  }
  return u9(e, [{
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
hs(oS, "EPS", 1e-4);
var O0 = function(t) {
  var r = Object.keys(t).reduce(function(n, a) {
    return Ht(Ht({}, n), {}, hs({}, a, oS.create(t[a])));
  }, {});
  return Ht(Ht({}, r), {}, {
    apply: function(a) {
      var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = i.bandAware, o = i.position;
      return kF(a, function(s, c) {
        return r[c].apply(s, {
          bandAware: u,
          position: o
        });
      });
    },
    isInRange: function(a) {
      return tS(a, function(i, u) {
        return r[u].isInRange(i);
      });
    }
  });
};
function l9(e) {
  return (e % 180 + 180) % 180;
}
var f9 = function(t) {
  var r = t.width, n = t.height, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, i = l9(a), u = i * Math.PI / 180, o = Math.atan(n / r), s = u > o && u < Math.PI - o ? n / Math.sin(u) : r / Math.cos(u);
  return Math.abs(s);
}, Sd, WE;
function d9() {
  if (WE) return Sd;
  WE = 1;
  var e = or(), t = qi(), r = Wo();
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
  return Sd = n, Sd;
}
var xd, YE;
function h9() {
  if (YE) return xd;
  YE = 1;
  var e = QO();
  function t(r) {
    var n = e(r), a = n % 1;
    return n === n ? a ? n - a : n : 0;
  }
  return xd = t, xd;
}
var wd, GE;
function p9() {
  if (GE) return wd;
  GE = 1;
  var e = uA(), t = or(), r = h9(), n = Math.max;
  function a(i, u, o) {
    var s = i == null ? 0 : i.length;
    if (!s)
      return -1;
    var c = o == null ? 0 : r(o);
    return c < 0 && (c = n(s + c, 0)), e(i, t(u, 3), c);
  }
  return wd = a, wd;
}
var Pd, KE;
function m9() {
  if (KE) return Pd;
  KE = 1;
  var e = d9(), t = p9(), r = e(t);
  return Pd = r, Pd;
}
var y9 = m9();
const b9 = /* @__PURE__ */ xe(y9);
var g9 = __();
const v9 = /* @__PURE__ */ xe(g9);
var E9 = v9(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
});
function go(e) {
  "@babel/helpers - typeof";
  return go = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, go(e);
}
var S0 = /* @__PURE__ */ ar(void 0), x0 = /* @__PURE__ */ ar(void 0), sS = /* @__PURE__ */ ar(void 0), cS = /* @__PURE__ */ ar({}), lS = /* @__PURE__ */ ar(void 0), fS = /* @__PURE__ */ ar(0), dS = /* @__PURE__ */ ar(0), zE = function(t) {
  var r = t.state, n = r.xAxisMap, a = r.yAxisMap, i = r.offset, u = t.clipPathId, o = t.children, s = t.width, c = t.height, l = E9(i);
  return /* @__PURE__ */ C.createElement(S0.Provider, {
    value: n
  }, /* @__PURE__ */ C.createElement(x0.Provider, {
    value: a
  }, /* @__PURE__ */ C.createElement(cS.Provider, {
    value: i
  }, /* @__PURE__ */ C.createElement(sS.Provider, {
    value: l
  }, /* @__PURE__ */ C.createElement(lS.Provider, {
    value: u
  }, /* @__PURE__ */ C.createElement(fS.Provider, {
    value: c
  }, /* @__PURE__ */ C.createElement(dS.Provider, {
    value: s
  }, o)))))));
}, T9 = function() {
  return zt(lS);
};
function hS(e) {
  var t = Object.keys(e);
  return t.length === 0 ? "There are no available ids." : "Available ids are: ".concat(t, ".");
}
var pS = function(t) {
  var r = zt(S0);
  r == null && (process.env.NODE_ENV !== "production" ? vt(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : vt());
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? vt(!1, 'Could not find xAxis by id "'.concat(t, '" [').concat(go(t), "]. ").concat(hS(r))) : vt()), n;
}, _9 = function() {
  var t = zt(S0);
  return Mr(t);
}, A9 = function() {
  var t = zt(x0), r = b9(t, function(n) {
    return tS(n.domain, Number.isFinite);
  });
  return r || Mr(t);
}, mS = function(t) {
  var r = zt(x0);
  r == null && (process.env.NODE_ENV !== "production" ? vt(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : vt());
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? vt(!1, 'Could not find yAxis by id "'.concat(t, '" [').concat(go(t), "]. ").concat(hS(r))) : vt()), n;
}, O9 = function() {
  var t = zt(sS);
  return t;
}, S9 = function() {
  return zt(cS);
}, w0 = function() {
  return zt(dS);
}, P0 = function() {
  return zt(fS);
};
function la(e) {
  "@babel/helpers - typeof";
  return la = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, la(e);
}
function x9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function w9(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, bS(n.key), n);
  }
}
function P9(e, t, r) {
  return t && w9(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function I9(e, t, r) {
  return t = vo(t), C9(e, yS() ? Reflect.construct(t, r || [], vo(e).constructor) : t.apply(e, r));
}
function C9(e, t) {
  if (t && (la(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return N9(e);
}
function N9(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function yS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (yS = function() {
    return !!e;
  })();
}
function vo(e) {
  return vo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, vo(e);
}
function R9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Xh(e, t);
}
function Xh(e, t) {
  return Xh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Xh(e, t);
}
function VE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function XE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? VE(Object(r), !0).forEach(function(n) {
      I0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : VE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function I0(e, t, r) {
  return t = bS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bS(e) {
  var t = D9(e, "string");
  return la(t) == "symbol" ? t : t + "";
}
function D9(e, t) {
  if (la(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (la(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function M9(e, t) {
  return j9(e) || B9(e, t) || k9(e, t) || L9();
}
function L9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function k9(e, t) {
  if (e) {
    if (typeof e == "string") return QE(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return QE(e, t);
  }
}
function QE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function B9(e, t) {
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
function j9(e) {
  if (Array.isArray(e)) return e;
}
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
var F9 = function(t, r) {
  var n;
  return /* @__PURE__ */ C.isValidElement(t) ? n = /* @__PURE__ */ C.cloneElement(t, r) : de(t) ? n = t(r) : n = /* @__PURE__ */ C.createElement("line", Qh({}, r, {
    className: "recharts-reference-line-line"
  })), n;
}, $9 = function(t, r, n, a, i, u, o, s, c) {
  var l = i.x, f = i.y, h = i.width, p = i.height;
  if (n) {
    var g = c.y, y = t.y.apply(g, {
      position: u
    });
    if (rr(c, "discard") && !t.y.isInRange(y))
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
      position: u
    });
    if (rr(c, "discard") && !t.x.isInRange(v))
      return null;
    var _ = [{
      x: v,
      y: f + p
    }, {
      x: v,
      y: f
    }];
    return o === "top" ? _.reverse() : _;
  }
  if (a) {
    var A = c.segment, b = A.map(function(T) {
      return t.apply(T, {
        position: u
      });
    });
    return rr(c, "discard") && RF(b, function(T) {
      return !t.isInRange(T);
    }) ? null : b;
  }
  return null;
};
function U9(e) {
  var t = e.x, r = e.y, n = e.segment, a = e.xAxisId, i = e.yAxisId, u = e.shape, o = e.className, s = e.alwaysShow, c = T9(), l = pS(a), f = mS(i), h = O9();
  if (!c || !h)
    return null;
  Yt(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var p = O0({
    x: l.scale,
    y: f.scale
  }), g = Ge(t), y = Ge(r), m = n && n.length === 2, E = $9(p, g, y, m, h, e.position, l.orientation, f.orientation, e);
  if (!E)
    return null;
  var v = M9(E, 2), _ = v[0], A = _.x, b = _.y, T = v[1], O = T.x, P = T.y, N = rr(e, "hidden") ? "url(#".concat(c, ")") : void 0, j = XE(XE({
    clipPath: N
  }, le(e, !0)), {}, {
    x1: A,
    y1: b,
    x2: O,
    y2: P
  });
  return /* @__PURE__ */ C.createElement(Oe, {
    className: pe("recharts-reference-line", o)
  }, F9(u, j), Qe.renderCallByParent(e, c9({
    x1: A,
    y1: b,
    x2: O,
    y2: P
  })));
}
var C0 = /* @__PURE__ */ (function(e) {
  function t() {
    return x9(this, t), I9(this, t, arguments);
  }
  return R9(t, e), P9(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ C.createElement(U9, this.props);
    }
  }]);
})(C.Component);
I0(C0, "displayName", "ReferenceLine");
I0(C0, "defaultProps", {
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
function Zh() {
  return Zh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Zh.apply(this, arguments);
}
function fa(e) {
  "@babel/helpers - typeof";
  return fa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fa(e);
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
function JE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ZE(Object(r), !0).forEach(function(n) {
      ps(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ZE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function H9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function q9(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, vS(n.key), n);
  }
}
function W9(e, t, r) {
  return t && q9(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Y9(e, t, r) {
  return t = Eo(t), G9(e, gS() ? Reflect.construct(t, r || [], Eo(e).constructor) : t.apply(e, r));
}
function G9(e, t) {
  if (t && (fa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return K9(e);
}
function K9(e) {
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
function Eo(e) {
  return Eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Eo(e);
}
function z9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Jh(e, t);
}
function Jh(e, t) {
  return Jh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Jh(e, t);
}
function ps(e, t, r) {
  return t = vS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vS(e) {
  var t = V9(e, "string");
  return fa(t) == "symbol" ? t : t + "";
}
function V9(e, t) {
  if (fa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var X9 = function(t) {
  var r = t.x, n = t.y, a = t.xAxis, i = t.yAxis, u = O0({
    x: a.scale,
    y: i.scale
  }), o = u.apply({
    x: r,
    y: n
  }, {
    bandAware: !0
  });
  return rr(t, "discard") && !u.isInRange(o) ? null : o;
}, ms = /* @__PURE__ */ (function(e) {
  function t() {
    return H9(this, t), Y9(this, t, arguments);
  }
  return z9(t, e), W9(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.x, i = n.y, u = n.r, o = n.alwaysShow, s = n.clipPathId, c = Ge(a), l = Ge(i);
      if (Yt(o === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !c || !l)
        return null;
      var f = X9(this.props);
      if (!f)
        return null;
      var h = f.x, p = f.y, g = this.props, y = g.shape, m = g.className, E = rr(this.props, "hidden") ? "url(#".concat(s, ")") : void 0, v = JE(JE({
        clipPath: E
      }, le(this.props, !0)), {}, {
        cx: h,
        cy: p
      });
      return /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-reference-dot", m)
      }, t.renderDot(y, v), Qe.renderCallByParent(this.props, {
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
  return /* @__PURE__ */ C.isValidElement(e) ? r = /* @__PURE__ */ C.cloneElement(e, t) : de(e) ? r = e(t) : r = /* @__PURE__ */ C.createElement(A0, Zh({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r;
});
function ep() {
  return ep = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ep.apply(this, arguments);
}
function da(e) {
  "@babel/helpers - typeof";
  return da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, da(e);
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
function tT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eT(Object(r), !0).forEach(function(n) {
      ys(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Q9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Z9(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, TS(n.key), n);
  }
}
function J9(e, t, r) {
  return t && Z9(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function e$(e, t, r) {
  return t = To(t), t$(e, ES() ? Reflect.construct(t, r || [], To(e).constructor) : t.apply(e, r));
}
function t$(e, t) {
  if (t && (da(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return r$(e);
}
function r$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ES() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (ES = function() {
    return !!e;
  })();
}
function To(e) {
  return To = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, To(e);
}
function n$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && tp(e, t);
}
function tp(e, t) {
  return tp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, tp(e, t);
}
function ys(e, t, r) {
  return t = TS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function TS(e) {
  var t = a$(e, "string");
  return da(t) == "symbol" ? t : t + "";
}
function a$(e, t) {
  if (da(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (da(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var i$ = function(t, r, n, a, i) {
  var u = i.x1, o = i.x2, s = i.y1, c = i.y2, l = i.xAxis, f = i.yAxis;
  if (!l || !f) return null;
  var h = O0({
    x: l.scale,
    y: f.scale
  }), p = {
    x: t ? h.x.apply(u, {
      position: "start"
    }) : h.x.rangeMin,
    y: n ? h.y.apply(s, {
      position: "start"
    }) : h.y.rangeMin
  }, g = {
    x: r ? h.x.apply(o, {
      position: "end"
    }) : h.x.rangeMax,
    y: a ? h.y.apply(c, {
      position: "end"
    }) : h.y.rangeMax
  };
  return rr(i, "discard") && (!h.isInRange(p) || !h.isInRange(g)) ? null : uS(p, g);
}, bs = /* @__PURE__ */ (function(e) {
  function t() {
    return Q9(this, t), e$(this, t, arguments);
  }
  return n$(t, e), J9(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.x1, i = n.x2, u = n.y1, o = n.y2, s = n.className, c = n.alwaysShow, l = n.clipPathId;
      Yt(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var f = Ge(a), h = Ge(i), p = Ge(u), g = Ge(o), y = this.props.shape;
      if (!f && !h && !p && !g && !y)
        return null;
      var m = i$(f, h, p, g, this.props);
      if (!m && !y)
        return null;
      var E = rr(this.props, "hidden") ? "url(#".concat(l, ")") : void 0;
      return /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-reference-area", s)
      }, t.renderRect(y, tT(tT({
        clipPath: E
      }, le(this.props, !0)), m)), Qe.renderCallByParent(this.props, m));
    }
  }]);
})(C.Component);
ys(bs, "displayName", "ReferenceArea");
ys(bs, "defaultProps", {
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
ys(bs, "renderRect", function(e, t) {
  var r;
  return /* @__PURE__ */ C.isValidElement(e) ? r = /* @__PURE__ */ C.cloneElement(e, t) : de(e) ? r = e(t) : r = /* @__PURE__ */ C.createElement(_0, ep({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
});
function _S(e, t, r) {
  if (t < 1)
    return [];
  if (t === 1 && r === void 0)
    return e;
  for (var n = [], a = 0; a < e.length; a += t)
    n.push(e[a]);
  return n;
}
function u$(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return f9(n, r);
}
function o$(e, t, r) {
  var n = r === "width", a = e.x, i = e.y, u = e.width, o = e.height;
  return t === 1 ? {
    start: n ? a : i,
    end: n ? a + u : i + o
  } : {
    start: n ? a + u : i + o,
    end: n ? a : i
  };
}
function _o(e, t, r, n, a) {
  if (e * t < e * n || e * t > e * a)
    return !1;
  var i = r();
  return e * (t - e * i / 2 - n) >= 0 && e * (t + e * i / 2 - a) <= 0;
}
function s$(e, t) {
  return _S(e, t + 1);
}
function c$(e, t, r, n, a) {
  for (var i = (n || []).slice(), u = t.start, o = t.end, s = 0, c = 1, l = u, f = function() {
    var g = n?.[s];
    if (g === void 0)
      return {
        v: _S(n, c)
      };
    var y = s, m, E = function() {
      return m === void 0 && (m = r(g, y)), m;
    }, v = g.coordinate, _ = s === 0 || _o(e, v, E, l, o);
    _ || (s = 0, l = u, c += 1), _ && (l = v + e * (E() / 2 + a), s += c);
  }, h; c <= i.length; )
    if (h = f(), h) return h.v;
  return [];
}
function Mi(e) {
  "@babel/helpers - typeof";
  return Mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Mi(e);
}
function rT(e, t) {
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
    t % 2 ? rT(Object(r), !0).forEach(function(n) {
      l$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function l$(e, t, r) {
  return t = f$(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function f$(e) {
  var t = d$(e, "string");
  return Mi(t) == "symbol" ? t : t + "";
}
function d$(e, t) {
  if (Mi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Mi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function h$(e, t, r, n, a) {
  for (var i = (n || []).slice(), u = i.length, o = t.start, s = t.end, c = function(h) {
    var p = i[h], g, y = function() {
      return g === void 0 && (g = r(p, h)), g;
    };
    if (h === u - 1) {
      var m = e * (p.coordinate + e * y() / 2 - s);
      i[h] = p = at(at({}, p), {}, {
        tickCoord: m > 0 ? p.coordinate - m * e : p.coordinate
      });
    } else
      i[h] = p = at(at({}, p), {}, {
        tickCoord: p.coordinate
      });
    var E = _o(e, p.tickCoord, y, o, s);
    E && (s = p.tickCoord - e * (y() / 2 + a), i[h] = at(at({}, p), {}, {
      isShow: !0
    }));
  }, l = u - 1; l >= 0; l--)
    c(l);
  return i;
}
function p$(e, t, r, n, a, i) {
  var u = (n || []).slice(), o = u.length, s = t.start, c = t.end;
  if (i) {
    var l = n[o - 1], f = r(l, o - 1), h = e * (l.coordinate + e * f / 2 - c);
    u[o - 1] = l = at(at({}, l), {}, {
      tickCoord: h > 0 ? l.coordinate - h * e : l.coordinate
    });
    var p = _o(e, l.tickCoord, function() {
      return f;
    }, s, c);
    p && (c = l.tickCoord - e * (f / 2 + a), u[o - 1] = at(at({}, l), {}, {
      isShow: !0
    }));
  }
  for (var g = i ? o - 1 : o, y = function(v) {
    var _ = u[v], A, b = function() {
      return A === void 0 && (A = r(_, v)), A;
    };
    if (v === 0) {
      var T = e * (_.coordinate - e * b() / 2 - s);
      u[v] = _ = at(at({}, _), {}, {
        tickCoord: T < 0 ? _.coordinate - T * e : _.coordinate
      });
    } else
      u[v] = _ = at(at({}, _), {}, {
        tickCoord: _.coordinate
      });
    var O = _o(e, _.tickCoord, b, s, c);
    O && (s = _.tickCoord + e * (b() / 2 + a), u[v] = at(at({}, _), {}, {
      isShow: !0
    }));
  }, m = 0; m < g; m++)
    y(m);
  return u;
}
function N0(e, t, r) {
  var n = e.tick, a = e.ticks, i = e.viewBox, u = e.minTickGap, o = e.orientation, s = e.interval, c = e.tickFormatter, l = e.unit, f = e.angle;
  if (!a || !a.length || !n)
    return [];
  if (J(s) || _a.isSsr)
    return s$(a, typeof s == "number" && J(s) ? s : 0);
  var h = [], p = o === "top" || o === "bottom" ? "width" : "height", g = l && p === "width" ? za(l, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, y = function(_, A) {
    var b = de(c) ? c(_.value, A) : _.value;
    return p === "width" ? u$(za(b, {
      fontSize: t,
      letterSpacing: r
    }), g, f) : za(b, {
      fontSize: t,
      letterSpacing: r
    })[p];
  }, m = a.length >= 2 ? dt(a[1].coordinate - a[0].coordinate) : 1, E = o$(i, m, p);
  return s === "equidistantPreserveStart" ? c$(m, E, y, a, u) : (s === "preserveStart" || s === "preserveStartEnd" ? h = p$(m, E, y, a, u, s === "preserveStartEnd") : h = h$(m, E, y, a, u), h.filter(function(v) {
    return v.isShow;
  }));
}
var m$ = ["viewBox"], y$ = ["viewBox"], b$ = ["ticks"];
function ha(e) {
  "@babel/helpers - typeof";
  return ha = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ha(e);
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
function qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nT(Object(r), !0).forEach(function(n) {
      R0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Id(e, t) {
  if (e == null) return {};
  var r = g$(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function g$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function v$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function aT(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, OS(n.key), n);
  }
}
function E$(e, t, r) {
  return t && aT(e.prototype, t), r && aT(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function T$(e, t, r) {
  return t = Ao(t), _$(e, AS() ? Reflect.construct(t, r || [], Ao(e).constructor) : t.apply(e, r));
}
function _$(e, t) {
  if (t && (ha(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return A$(e);
}
function A$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function AS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (AS = function() {
    return !!e;
  })();
}
function Ao(e) {
  return Ao = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ao(e);
}
function O$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && rp(e, t);
}
function rp(e, t) {
  return rp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, rp(e, t);
}
function R0(e, t, r) {
  return t = OS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function OS(e) {
  var t = S$(e, "string");
  return ha(t) == "symbol" ? t : t + "";
}
function S$(e, t) {
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
    return v$(this, t), n = T$(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n;
  }
  return O$(t, e), E$(t, [{
    key: "shouldComponentUpdate",
    value: function(n, a) {
      var i = n.viewBox, u = Id(n, m$), o = this.props, s = o.viewBox, c = Id(o, y$);
      return !Un(i, s) || !Un(u, c) || !Un(a, this.state);
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
      var a = this.props, i = a.x, u = a.y, o = a.width, s = a.height, c = a.orientation, l = a.tickSize, f = a.mirror, h = a.tickMargin, p, g, y, m, E, v, _ = f ? -1 : 1, A = n.tickSize || l, b = J(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (c) {
        case "top":
          p = g = n.coordinate, m = u + +!f * s, y = m - _ * A, v = y - _ * h, E = b;
          break;
        case "left":
          y = m = n.coordinate, g = i + +!f * o, p = g - _ * A, E = p - _ * h, v = b;
          break;
        case "right":
          y = m = n.coordinate, g = i + +f * o, p = g + _ * A, E = p + _ * h, v = b;
          break;
        default:
          p = g = n.coordinate, m = u + +f * s, y = m + _ * A, v = y + _ * h, E = b;
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
      var n = this.props, a = n.x, i = n.y, u = n.width, o = n.height, s = n.orientation, c = n.mirror, l = n.axisLine, f = qe(qe(qe({}, le(this.props, !1)), le(l, !1)), {}, {
        fill: "none"
      });
      if (s === "top" || s === "bottom") {
        var h = +(s === "top" && !c || s === "bottom" && c);
        f = qe(qe({}, f), {}, {
          x1: a,
          y1: i + h * o,
          x2: a + u,
          y2: i + h * o
        });
      } else {
        var p = +(s === "left" && !c || s === "right" && c);
        f = qe(qe({}, f), {}, {
          x1: a + p * u,
          y1: i,
          x2: a + p * u,
          y2: i + o
        });
      }
      return /* @__PURE__ */ C.createElement("line", jn({}, f, {
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
        var u = this, o = this.props, s = o.tickLine, c = o.stroke, l = o.tick, f = o.tickFormatter, h = o.unit, p = N0(qe(qe({}, this.props), {}, {
          ticks: n
        }), a, i), g = this.getTickTextAnchor(), y = this.getTickVerticalAnchor(), m = le(this.props, !1), E = le(l, !1), v = qe(qe({}, m), {}, {
          fill: "none"
        }, le(s, !1)), _ = p.map(function(A, b) {
          var T = u.getTickLineCoord(A), O = T.line, P = T.tick, N = qe(qe(qe(qe({
            textAnchor: g,
            verticalAnchor: y
          }, m), {}, {
            stroke: "none",
            fill: c
          }, E), P), {}, {
            index: b,
            payload: A,
            visibleTicksCount: p.length,
            tickFormatter: f
          });
          return /* @__PURE__ */ C.createElement(Oe, jn({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(A.value, "-").concat(A.coordinate, "-").concat(A.tickCoord)
          }, pn(u.props, A, b)), s && /* @__PURE__ */ C.createElement("line", jn({}, v, O, {
            className: pe("recharts-cartesian-axis-tick-line", xt(s, "className"))
          })), l && t.renderTickItem(l, N, "".concat(de(f) ? f(A.value, b) : A.value).concat(h || "")));
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
      var f = this.props, h = f.ticks, p = Id(f, b$), g = h;
      return de(s) && (g = h && h.length > 0 ? s(this.props) : s(p)), u <= 0 || o <= 0 || !g || !g.length ? null : /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-cartesian-axis", c),
        ref: function(m) {
          n.layerReference = m;
        }
      }, i && this.renderAxisLine(), this.renderTicks(g, this.state.fontSize, this.state.letterSpacing), Qe.renderCallByParent(this.props));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, a, i) {
      var u, o = pe(a.className, "recharts-cartesian-axis-tick-value");
      return /* @__PURE__ */ C.isValidElement(n) ? u = /* @__PURE__ */ C.cloneElement(n, qe(qe({}, a), {}, {
        className: o
      })) : de(n) ? u = n(qe(qe({}, a), {}, {
        className: o
      })) : u = /* @__PURE__ */ C.createElement(mn, jn({}, a, {
        className: "recharts-cartesian-axis-tick-value"
      }), i), u;
    }
  }]);
})(_T);
R0(xa, "displayName", "CartesianAxis");
R0(xa, "defaultProps", {
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
var x$ = ["x1", "y1", "x2", "y2", "key"], w$ = ["offset"];
function bn(e) {
  "@babel/helpers - typeof";
  return bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, bn(e);
}
function iT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? iT(Object(r), !0).forEach(function(n) {
      P$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : iT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function P$(e, t, r) {
  return t = I$(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function I$(e) {
  var t = C$(e, "string");
  return bn(t) == "symbol" ? t : t + "";
}
function C$(e, t) {
  if (bn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (bn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function nn() {
  return nn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, nn.apply(this, arguments);
}
function uT(e, t) {
  if (e == null) return {};
  var r = N$(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function N$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var R$ = function(t) {
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
function SS(e, t) {
  var r;
  if (/* @__PURE__ */ C.isValidElement(e))
    r = /* @__PURE__ */ C.cloneElement(e, t);
  else if (de(e))
    r = e(t);
  else {
    var n = t.x1, a = t.y1, i = t.x2, u = t.y2, o = t.key, s = uT(t, x$), c = le(s, !1);
    c.offset;
    var l = uT(c, w$);
    r = /* @__PURE__ */ C.createElement("line", nn({}, l, {
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
function D$(e) {
  var t = e.x, r = e.width, n = e.horizontal, a = n === void 0 ? !0 : n, i = e.horizontalPoints;
  if (!a || !i || !i.length)
    return null;
  var u = i.map(function(o, s) {
    var c = ut(ut({}, e), {}, {
      x1: t,
      y1: o,
      x2: t + r,
      y2: o,
      key: "line-".concat(s),
      index: s
    });
    return SS(a, c);
  });
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, u);
}
function M$(e) {
  var t = e.y, r = e.height, n = e.vertical, a = n === void 0 ? !0 : n, i = e.verticalPoints;
  if (!a || !i || !i.length)
    return null;
  var u = i.map(function(o, s) {
    var c = ut(ut({}, e), {}, {
      x1: o,
      y1: t,
      x2: o,
      y2: t + r,
      key: "line-".concat(s),
      index: s
    });
    return SS(a, c);
  });
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, u);
}
function L$(e) {
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
    var g = !l[p + 1], y = g ? a + u - h : l[p + 1] - h;
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
function k$(e) {
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
    var g = !l[p + 1], y = g ? i + o - h : l[p + 1] - h;
    if (y <= 0)
      return null;
    var m = p % n.length;
    return /* @__PURE__ */ C.createElement("rect", {
      key: "react-".concat(p),
      x: h,
      y: u,
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
var B$ = function(t, r) {
  var n = t.xAxis, a = t.width, i = t.height, u = t.offset;
  return AO(N0(ut(ut(ut({}, xa.defaultProps), n), {}, {
    ticks: mr(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: i
    }
  })), u.left, u.left + u.width, r);
}, j$ = function(t, r) {
  var n = t.yAxis, a = t.width, i = t.height, u = t.offset;
  return AO(N0(ut(ut(ut({}, xa.defaultProps), n), {}, {
    ticks: mr(n, !0),
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
function Vi(e) {
  var t, r, n, a, i, u, o = w0(), s = P0(), c = S9(), l = ut(ut({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : Cn.stroke,
    fill: (r = e.fill) !== null && r !== void 0 ? r : Cn.fill,
    horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : Cn.horizontal,
    horizontalFill: (a = e.horizontalFill) !== null && a !== void 0 ? a : Cn.horizontalFill,
    vertical: (i = e.vertical) !== null && i !== void 0 ? i : Cn.vertical,
    verticalFill: (u = e.verticalFill) !== null && u !== void 0 ? u : Cn.verticalFill,
    x: J(e.x) ? e.x : c.left,
    y: J(e.y) ? e.y : c.top,
    width: J(e.width) ? e.width : c.width,
    height: J(e.height) ? e.height : c.height
  }), f = l.x, h = l.y, p = l.width, g = l.height, y = l.syncWithTicks, m = l.horizontalValues, E = l.verticalValues, v = _9(), _ = A9();
  if (!J(p) || p <= 0 || !J(g) || g <= 0 || !J(f) || f !== +f || !J(h) || h !== +h)
    return null;
  var A = l.verticalCoordinatesGenerator || B$, b = l.horizontalCoordinatesGenerator || j$, T = l.horizontalPoints, O = l.verticalPoints;
  if ((!T || !T.length) && de(b)) {
    var P = m && m.length, N = b({
      yAxis: _ ? ut(ut({}, _), {}, {
        ticks: P ? m : _.ticks
      }) : void 0,
      width: o,
      height: s,
      offset: c
    }, P ? !0 : y);
    Yt(Array.isArray(N), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(bn(N), "]")), Array.isArray(N) && (T = N);
  }
  if ((!O || !O.length) && de(A)) {
    var j = E && E.length, D = A({
      xAxis: v ? ut(ut({}, v), {}, {
        ticks: j ? E : v.ticks
      }) : void 0,
      width: o,
      height: s,
      offset: c
    }, j ? !0 : y);
    Yt(Array.isArray(D), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(bn(D), "]")), Array.isArray(D) && (O = D);
  }
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ C.createElement(R$, {
    fill: l.fill,
    fillOpacity: l.fillOpacity,
    x: l.x,
    y: l.y,
    width: l.width,
    height: l.height,
    ry: l.ry
  }), /* @__PURE__ */ C.createElement(D$, nn({}, l, {
    offset: c,
    horizontalPoints: T,
    xAxis: v,
    yAxis: _
  })), /* @__PURE__ */ C.createElement(M$, nn({}, l, {
    offset: c,
    verticalPoints: O,
    xAxis: v,
    yAxis: _
  })), /* @__PURE__ */ C.createElement(L$, nn({}, l, {
    horizontalPoints: T
  })), /* @__PURE__ */ C.createElement(k$, nn({}, l, {
    verticalPoints: O
  })));
}
Vi.displayName = "CartesianGrid";
function pa(e) {
  "@babel/helpers - typeof";
  return pa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pa(e);
}
function F$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function $$(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, PS(n.key), n);
  }
}
function U$(e, t, r) {
  return t && $$(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function H$(e, t, r) {
  return t = Oo(t), q$(e, xS() ? Reflect.construct(t, r || [], Oo(e).constructor) : t.apply(e, r));
}
function q$(e, t) {
  if (t && (pa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return W$(e);
}
function W$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function xS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (xS = function() {
    return !!e;
  })();
}
function Oo(e) {
  return Oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Oo(e);
}
function Y$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && np(e, t);
}
function np(e, t) {
  return np = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, np(e, t);
}
function wS(e, t, r) {
  return t = PS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function PS(e) {
  var t = G$(e, "string");
  return pa(t) == "symbol" ? t : t + "";
}
function G$(e, t) {
  if (pa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
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
function K$(e) {
  var t = e.xAxisId, r = w0(), n = P0(), a = pS(t);
  return a == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ $r.createElement(xa, ap({}, a, {
      className: pe("recharts-".concat(a.axisType, " ").concat(a.axisType), a.className),
      viewBox: {
        x: 0,
        y: 0,
        width: r,
        height: n
      },
      ticksGenerator: function(u) {
        return mr(u, !0);
      }
    }))
  );
}
var Sn = /* @__PURE__ */ (function(e) {
  function t() {
    return F$(this, t), H$(this, t, arguments);
  }
  return Y$(t, e), U$(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ $r.createElement(K$, this.props);
    }
  }]);
})($r.Component);
wS(Sn, "displayName", "XAxis");
wS(Sn, "defaultProps", {
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
function z$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function V$(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, NS(n.key), n);
  }
}
function X$(e, t, r) {
  return t && V$(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Q$(e, t, r) {
  return t = So(t), Z$(e, IS() ? Reflect.construct(t, r || [], So(e).constructor) : t.apply(e, r));
}
function Z$(e, t) {
  if (t && (ma(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return J$(e);
}
function J$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function IS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (IS = function() {
    return !!e;
  })();
}
function So(e) {
  return So = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, So(e);
}
function eU(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ip(e, t);
}
function ip(e, t) {
  return ip = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ip(e, t);
}
function CS(e, t, r) {
  return t = NS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function NS(e) {
  var t = tU(e, "string");
  return ma(t) == "symbol" ? t : t + "";
}
function tU(e, t) {
  if (ma(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ma(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
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
var rU = function(t) {
  var r = t.yAxisId, n = w0(), a = P0(), i = mS(r);
  return i == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ $r.createElement(xa, up({}, i, {
      className: pe("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: a
      },
      ticksGenerator: function(o) {
        return mr(o, !0);
      }
    }))
  );
}, xn = /* @__PURE__ */ (function(e) {
  function t() {
    return z$(this, t), Q$(this, t, arguments);
  }
  return eU(t, e), X$(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ $r.createElement(rU, this.props);
    }
  }]);
})($r.Component);
CS(xn, "displayName", "YAxis");
CS(xn, "defaultProps", {
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
function oT(e) {
  return uU(e) || iU(e) || aU(e) || nU();
}
function nU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function aU(e, t) {
  if (e) {
    if (typeof e == "string") return op(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return op(e, t);
  }
}
function iU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function uU(e) {
  if (Array.isArray(e)) return op(e);
}
function op(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var sp = function(t, r, n, a, i) {
  var u = jt(t, C0), o = jt(t, ms), s = [].concat(oT(u), oT(o)), c = jt(t, bs), l = "".concat(a, "Id"), f = a[0], h = r;
  if (s.length && (h = s.reduce(function(y, m) {
    if (m.props[l] === n && rr(m.props, "extendDomain") && J(m.props[f])) {
      var E = m.props[f];
      return [Math.min(y[0], E), Math.max(y[1], E)];
    }
    return y;
  }, h)), c.length) {
    var p = "".concat(f, "1"), g = "".concat(f, "2");
    h = c.reduce(function(y, m) {
      if (m.props[l] === n && rr(m.props, "extendDomain") && J(m.props[p]) && J(m.props[g])) {
        var E = m.props[p], v = m.props[g];
        return [Math.min(y[0], E, v), Math.max(y[1], E, v)];
      }
      return y;
    }, h);
  }
  return i && i.length && (h = i.reduce(function(y, m) {
    return J(m) ? [Math.min(y[0], m), Math.max(y[1], m)] : y;
  }, h)), h;
}, Cd = { exports: {} }, sT;
function oU() {
  return sT || (sT = 1, (function(e) {
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
      for (var h = 0, p = f.length, g = new Array(p); h < p; h++)
        g[h] = f[h].fn;
      return g;
    }, o.prototype.listenerCount = function(c) {
      var l = r ? r + c : c, f = this._events[l];
      return f ? f.fn ? 1 : f.length : 0;
    }, o.prototype.emit = function(c, l, f, h, p, g) {
      var y = r ? r + c : c;
      if (!this._events[y]) return !1;
      var m = this._events[y], E = arguments.length, v, _;
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
        for (_ = 1, v = new Array(E - 1); _ < E; _++)
          v[_ - 1] = arguments[_];
        m.fn.apply(m.context, v);
      } else {
        var A = m.length, b;
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
              if (!v) for (b = 1, v = new Array(E - 1); b < E; b++)
                v[b - 1] = arguments[b];
              m[_].fn.apply(m[_].context, v);
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
      var g = this._events[p];
      if (g.fn)
        g.fn === l && (!h || g.once) && (!f || g.context === f) && u(this, p);
      else {
        for (var y = 0, m = [], E = g.length; y < E; y++)
          (g[y].fn !== l || h && !g[y].once || f && g[y].context !== f) && m.push(g[y]);
        m.length ? this._events[p] = m.length === 1 ? m[0] : m : u(this, p);
      }
      return this;
    }, o.prototype.removeAllListeners = function(c) {
      var l;
      return c ? (l = r ? r + c : c, this._events[l] && u(this, l)) : (this._events = new n(), this._eventsCount = 0), this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r, o.EventEmitter = o, e.exports = o;
  })(Cd)), Cd.exports;
}
var sU = oU();
const cU = /* @__PURE__ */ xe(sU);
var Nd = new cU(), Rd = "recharts.syncMouseEvents";
function Li(e) {
  "@babel/helpers - typeof";
  return Li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Li(e);
}
function lU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function fU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, RS(n.key), n);
  }
}
function dU(e, t, r) {
  return t && fU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Dd(e, t, r) {
  return t = RS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RS(e) {
  var t = hU(e, "string");
  return Li(t) == "symbol" ? t : t + "";
}
function hU(e, t) {
  if (Li(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var pU = /* @__PURE__ */ (function() {
  function e() {
    lU(this, e), Dd(this, "activeIndex", 0), Dd(this, "coordinateList", []), Dd(this, "layout", "horizontal");
  }
  return dU(e, [{
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
function mU(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e?.[0], a = e?.[1];
    if (n && a && J(n) && J(a))
      return !0;
  }
  return !1;
}
function yU(e, t, r, n) {
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
function DS(e) {
  var t = e.cx, r = e.cy, n = e.radius, a = e.startAngle, i = e.endAngle, u = Ne(t, r, n, a), o = Ne(t, r, n, i);
  return {
    points: [u, o],
    cx: t,
    cy: r,
    radius: n,
    startAngle: a,
    endAngle: i
  };
}
function bU(e, t, r) {
  var n, a, i, u;
  if (e === "horizontal")
    n = t.x, i = n, a = r.top, u = r.top + r.height;
  else if (e === "vertical")
    a = t.y, u = a, n = r.left, i = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var o = t.cx, s = t.cy, c = t.innerRadius, l = t.outerRadius, f = t.angle, h = Ne(o, s, c, f), p = Ne(o, s, l, f);
      n = h.x, a = h.y, i = p.x, u = p.y;
    } else
      return DS(t);
  return [{
    x: n,
    y: a
  }, {
    x: i,
    y: u
  }];
}
function ki(e) {
  "@babel/helpers - typeof";
  return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ki(e);
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
function yu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cT(Object(r), !0).forEach(function(n) {
      gU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function gU(e, t, r) {
  return t = vU(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vU(e) {
  var t = EU(e, "string");
  return ki(t) == "symbol" ? t : t + "";
}
function EU(e, t) {
  if (ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ki(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function TU(e) {
  var t, r, n = e.element, a = e.tooltipEventType, i = e.isActive, u = e.activeCoordinate, o = e.activePayload, s = e.offset, c = e.activeTooltipIndex, l = e.tooltipAxisBandSize, f = e.layout, h = e.chartName, p = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !p || !i || !u || h !== "ScatterChart" && a !== "axis")
    return null;
  var g, y = Nh;
  if (h === "ScatterChart")
    g = u, y = rj;
  else if (h === "BarChart")
    g = yU(f, u, s, l), y = _0;
  else if (f === "radial") {
    var m = DS(u), E = m.cx, v = m.cy, _ = m.radius, A = m.startAngle, b = m.endAngle;
    g = {
      cx: E,
      cy: v,
      startAngle: A,
      endAngle: b,
      innerRadius: _,
      outerRadius: _
    }, y = MO;
  } else
    g = {
      points: bU(f, u, s)
    }, y = Nh;
  var T = yu(yu(yu(yu({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), g), le(p, !1)), {}, {
    payload: o,
    payloadIndex: c,
    className: pe("recharts-tooltip-cursor", p.className)
  });
  return /* @__PURE__ */ Lt(p) ? /* @__PURE__ */ Ue(p, T) : /* @__PURE__ */ wo(y, T);
}
var _U = ["item"], AU = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function ya(e) {
  "@babel/helpers - typeof";
  return ya = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ya(e);
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
function lT(e, t) {
  return xU(e) || SU(e, t) || LS(e, t) || OU();
}
function OU() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function SU(e, t) {
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
function xU(e) {
  if (Array.isArray(e)) return e;
}
function fT(e, t) {
  if (e == null) return {};
  var r = wU(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function wU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function PU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function IU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, kS(n.key), n);
  }
}
function CU(e, t, r) {
  return t && IU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function NU(e, t, r) {
  return t = xo(t), RU(e, MS() ? Reflect.construct(t, r || [], xo(e).constructor) : t.apply(e, r));
}
function RU(e, t) {
  if (t && (ya(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return DU(e);
}
function DU(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function MS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (MS = function() {
    return !!e;
  })();
}
function xo(e) {
  return xo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, xo(e);
}
function MU(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cp(e, t);
}
function cp(e, t) {
  return cp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, cp(e, t);
}
function ba(e) {
  return BU(e) || kU(e) || LS(e) || LU();
}
function LU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function LS(e, t) {
  if (e) {
    if (typeof e == "string") return lp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return lp(e, t);
  }
}
function kU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function BU(e) {
  if (Array.isArray(e)) return lp(e);
}
function lp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
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
function H(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dT(Object(r), !0).forEach(function(n) {
      se(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function se(e, t, r) {
  return t = kS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kS(e) {
  var t = jU(e, "string");
  return ya(t) == "symbol" ? t : t + "";
}
function jU(e, t) {
  if (ya(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ya(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var FU = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, $U = {
  width: "100%",
  height: "100%"
}, BS = {
  x: 0,
  y: 0
};
function bu(e) {
  return e;
}
var UU = function(t, r) {
  return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius;
}, HU = function(t, r, n, a) {
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
      return H(H(H({}, a), Ne(a.cx, a.cy, o, u)), {}, {
        angle: u,
        radius: o
      });
    }
    var s = i.coordinate, c = a.angle;
    return H(H(H({}, a), Ne(a.cx, a.cy, s, c)), {}, {
      angle: c,
      radius: s
    });
  }
  return BS;
}, gs = function(t, r) {
  var n = r.graphicalItems, a = r.dataStartIndex, i = r.dataEndIndex, u = (n ?? []).reduce(function(o, s) {
    var c = s.props.data;
    return c && c.length ? [].concat(ba(o), ba(c)) : o;
  }, []);
  return u.length > 0 ? u : t && t.length && J(a) && J(i) ? t.slice(a, i + 1) : [];
};
function jS(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var fp = function(t, r, n, a) {
  var i = t.graphicalItems, u = t.tooltipAxis, o = gs(r, t);
  return n < 0 || !i || !i.length || n >= o.length ? null : i.reduce(function(s, c) {
    var l, f = (l = c.props.data) !== null && l !== void 0 ? l : r;
    f && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= n && (f = f.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var h;
    if (u.dataKey && !u.allowDuplicatedCategory) {
      var p = f === void 0 ? o : f;
      h = Gd(p, u.dataKey, a);
    } else
      h = f && f[n] || o[n];
    return h ? [].concat(ba(s), [PO(c, h)]) : s;
  }, []);
}, hT = function(t, r, n, a) {
  var i = a || {
    x: t.chartX,
    y: t.chartY
  }, u = UU(i, n), o = t.orderedTooltipTicks, s = t.tooltipAxis, c = t.tooltipTicks, l = g4(u, o, c, s);
  if (l >= 0 && c) {
    var f = c[l] && c[l].value, h = fp(t, r, l, f), p = HU(n, o, l, i);
    return {
      activeTooltipIndex: l,
      activeLabel: f,
      activePayload: h,
      activeCoordinate: p
    };
  }
  return null;
}, qU = function(t, r) {
  var n = r.axes, a = r.graphicalItems, i = r.axisType, u = r.axisIdKey, o = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.layout, f = t.children, h = t.stackOffset, p = _O(l, i);
  return n.reduce(function(g, y) {
    var m, E = y.type.defaultProps !== void 0 ? H(H({}, y.type.defaultProps), y.props) : y.props, v = E.type, _ = E.dataKey, A = E.allowDataOverflow, b = E.allowDuplicatedCategory, T = E.scale, O = E.ticks, P = E.includeHidden, N = E[u];
    if (g[N])
      return g;
    var j = gs(t.data, {
      graphicalItems: a.filter(function(G) {
        var Z, ne = u in G.props ? G.props[u] : (Z = G.type.defaultProps) === null || Z === void 0 ? void 0 : Z[u];
        return ne === N;
      }),
      dataStartIndex: s,
      dataEndIndex: c
    }), D = j.length, R, B, F;
    mU(E.domain, A, v) && (R = xh(E.domain, null, A), p && (v === "number" || T !== "auto") && (F = Xa(j, _, "category")));
    var $ = jS(v);
    if (!R || R.length === 0) {
      var q, Y = (q = E.domain) !== null && q !== void 0 ? q : $;
      if (_) {
        if (R = Xa(j, _, v), v === "category" && p) {
          var Q = fN(R);
          b && Q ? (B = R, R = ho(0, D)) : b || (R = f1(Y, R, y).reduce(function(G, Z) {
            return G.indexOf(Z) >= 0 ? G : [].concat(ba(G), [Z]);
          }, []));
        } else if (v === "category")
          b ? R = R.filter(function(G) {
            return G !== "" && !me(G);
          }) : R = f1(Y, R, y).reduce(function(G, Z) {
            return G.indexOf(Z) >= 0 || Z === "" || me(Z) ? G : [].concat(ba(G), [Z]);
          }, []);
        else if (v === "number") {
          var te = A4(j, a.filter(function(G) {
            var Z, ne, ue = u in G.props ? G.props[u] : (Z = G.type.defaultProps) === null || Z === void 0 ? void 0 : Z[u], oe = "hide" in G.props ? G.props.hide : (ne = G.type.defaultProps) === null || ne === void 0 ? void 0 : ne.hide;
            return ue === N && (P || !oe);
          }), _, i, l);
          te && (R = te);
        }
        p && (v === "number" || T !== "auto") && (F = Xa(j, _, "category"));
      } else p ? R = ho(0, D) : o && o[N] && o[N].hasStack && v === "number" ? R = h === "expand" ? [0, 1] : wO(o[N].stackGroups, s, c) : R = TO(j, a.filter(function(G) {
        var Z = u in G.props ? G.props[u] : G.type.defaultProps[u], ne = "hide" in G.props ? G.props.hide : G.type.defaultProps.hide;
        return Z === N && (P || !ne);
      }), v, l, !0);
      if (v === "number")
        R = sp(f, R, N, i, O), Y && (R = xh(Y, R, A));
      else if (v === "category" && Y) {
        var k = Y, W = R.every(function(G) {
          return k.indexOf(G) >= 0;
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
}, WU = function(t, r) {
  var n = r.graphicalItems, a = r.Axis, i = r.axisType, u = r.axisIdKey, o = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.layout, f = t.children, h = gs(t.data, {
    graphicalItems: n,
    dataStartIndex: s,
    dataEndIndex: c
  }), p = h.length, g = _O(l, i), y = -1;
  return n.reduce(function(m, E) {
    var v = E.type.defaultProps !== void 0 ? H(H({}, E.type.defaultProps), E.props) : E.props, _ = v[u], A = jS("number");
    if (!m[_]) {
      y++;
      var b;
      return g ? b = ho(0, p) : o && o[_] && o[_].hasStack ? (b = wO(o[_].stackGroups, s, c), b = sp(f, b, _, i)) : (b = xh(A, TO(h, n.filter(function(T) {
        var O, P, N = u in T.props ? T.props[u] : (O = T.type.defaultProps) === null || O === void 0 ? void 0 : O[u], j = "hide" in T.props ? T.props.hide : (P = T.type.defaultProps) === null || P === void 0 ? void 0 : P.hide;
        return N === _ && !j;
      }), "number", l), a.defaultProps.allowDataOverflow), b = sp(f, b, _, i)), H(H({}, m), {}, se({}, _, H(H({
        axisType: i
      }, a.defaultProps), {}, {
        hide: !0,
        orientation: xt(FU, "".concat(i, ".").concat(y % 2), null),
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
}, YU = function(t, r) {
  var n = r.axisType, a = n === void 0 ? "xAxis" : n, i = r.AxisComp, u = r.graphicalItems, o = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.children, f = "".concat(a, "Id"), h = jt(l, i), p = {};
  return h && h.length ? p = qU(t, {
    axes: h,
    graphicalItems: u,
    axisType: a,
    axisIdKey: f,
    stackGroups: o,
    dataStartIndex: s,
    dataEndIndex: c
  }) : u && u.length && (p = WU(t, {
    Axis: i,
    graphicalItems: u,
    axisType: a,
    axisIdKey: f,
    stackGroups: o,
    dataStartIndex: s,
    dataEndIndex: c
  })), p;
}, GU = function(t) {
  var r = Mr(t), n = mr(r, !1, !0);
  return {
    tooltipTicks: n,
    orderedTooltipTicks: zp(n, function(a) {
      return a.coordinate;
    }),
    tooltipAxis: r,
    tooltipAxisBandSize: Zu(r, n)
  };
}, pT = function(t) {
  var r = t.children, n = t.defaultShowTooltip, a = At(r, oa), i = 0, u = 0;
  return t.data && t.data.length !== 0 && (u = t.data.length - 1), a && a.props && (a.props.startIndex >= 0 && (i = a.props.startIndex), a.props.endIndex >= 0 && (u = a.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: i,
    dataEndIndex: u,
    activeTooltipIndex: -1,
    isTooltipActive: !!n
  };
}, KU = function(t) {
  return !t || !t.length ? !1 : t.some(function(r) {
    var n = gr(r && r.type);
    return n && n.indexOf("Bar") >= 0;
  });
}, mT = function(t) {
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
}, zU = function(t, r) {
  var n = t.props, a = t.graphicalItems, i = t.xAxisMap, u = i === void 0 ? {} : i, o = t.yAxisMap, s = o === void 0 ? {} : o, c = n.width, l = n.height, f = n.children, h = n.margin || {}, p = At(f, oa), g = At(f, jr), y = Object.keys(s).reduce(function(b, T) {
    var O = s[T], P = O.orientation;
    return !O.mirror && !O.hide ? H(H({}, b), {}, se({}, P, b[P] + O.width)) : b;
  }, {
    left: h.left || 0,
    right: h.right || 0
  }), m = Object.keys(u).reduce(function(b, T) {
    var O = u[T], P = O.orientation;
    return !O.mirror && !O.hide ? H(H({}, b), {}, se({}, P, xt(b, "".concat(P)) + O.height)) : b;
  }, {
    top: h.top || 0,
    bottom: h.bottom || 0
  }), E = H(H({}, m), y), v = E.bottom;
  p && (E.bottom += p.props.height || oa.defaultProps.height), g && r && (E = T4(E, a, n, r));
  var _ = c - E.left - E.right, A = l - E.top - E.bottom;
  return H(H({
    brushBottom: v
  }, E), {}, {
    // never return negative values for height and width
    width: Math.max(_, 0),
    height: Math.max(A, 0)
  });
}, VU = function(t, r) {
  if (r === "xAxis")
    return t[r].width;
  if (r === "yAxis")
    return t[r].height;
}, FS = function(t) {
  var r = t.chartName, n = t.GraphicalChild, a = t.defaultTooltipEventType, i = a === void 0 ? "axis" : a, u = t.validateTooltipEventTypes, o = u === void 0 ? ["axis"] : u, s = t.axisComponents, c = t.legendContent, l = t.formatAxisMap, f = t.defaultProps, h = function(E, v) {
    var _ = v.graphicalItems, A = v.stackGroups, b = v.offset, T = v.updateId, O = v.dataStartIndex, P = v.dataEndIndex, N = E.barSize, j = E.layout, D = E.barGap, R = E.barCategoryGap, B = E.maxBarSize, F = mT(j), $ = F.numericAxisName, q = F.cateAxisName, Y = KU(_), Q = [];
    return _.forEach(function(te, k) {
      var W = gs(E.data, {
        graphicalItems: [te],
        dataStartIndex: O,
        dataEndIndex: P
      }), G = te.type.defaultProps !== void 0 ? H(H({}, te.type.defaultProps), te.props) : te.props, Z = G.dataKey, ne = G.maxBarSize, ue = G["".concat($, "Id")], oe = G["".concat(q, "Id")], fe = {}, ce = s.reduce(function(Kr, cr) {
        var Ts, _s, As = v["".concat(cr.axisType, "Map")], D0 = G["".concat(cr.axisType, "Id")];
        As && As[D0] || cr.axisType === "zAxis" || (process.env.NODE_ENV !== "production" ? vt(!1, "Specifying a(n) ".concat(cr.axisType, "Id requires a corresponding ").concat(
          cr.axisType,
          "Id on the targeted graphical component "
        ).concat((Ts = te == null || (_s = te.type) === null || _s === void 0 ? void 0 : _s.displayName) !== null && Ts !== void 0 ? Ts : "")) : vt());
        var M0 = As[D0];
        return H(H({}, Kr), {}, se(se({}, cr.axisType, M0), "".concat(cr.axisType, "Ticks"), mr(M0)));
      }, fe), K = ce[q], re = ce["".concat(q, "Ticks")], ie = A && A[ue] && A[ue].hasStack && R4(te, A[ue].stackGroups), M = gr(te.type).indexOf("Bar") >= 0, ye = Zu(K, re), X = [], Pe = Y && v4({
        barSize: N,
        stackGroups: A,
        totalSize: VU(ce, q)
      });
      if (M) {
        var De, et, Ir = me(ne) ? B : ne, wn = (De = (et = Zu(K, re, !0)) !== null && et !== void 0 ? et : Ir) !== null && De !== void 0 ? De : 0;
        X = E4({
          barGap: D,
          barCategoryGap: R,
          bandSize: wn !== ye ? wn : ye,
          sizeList: Pe[oe],
          maxBarSize: Ir
        }), wn !== ye && (X = X.map(function(Kr) {
          return H(H({}, Kr), {}, {
            position: H(H({}, Kr.position), {}, {
              offset: Kr.position.offset - wn / 2
            })
          });
        }));
      }
      var Xi = te && te.type && te.type.getComposedData;
      Xi && Q.push({
        props: H(H({}, Xi(H(H({}, ce), {}, {
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
          dataEndIndex: P
        }))), {}, se(se(se({
          key: te.key || "item-".concat(k)
        }, $, ce[$]), q, ce[q]), "animationId", T)),
        childIndex: AN(te, E.children),
        item: te
      });
    }), Q;
  }, p = function(E, v) {
    var _ = E.props, A = E.dataStartIndex, b = E.dataEndIndex, T = E.updateId;
    if (!xy({
      props: _
    }))
      return null;
    var O = _.children, P = _.layout, N = _.stackOffset, j = _.data, D = _.reverseStackOrder, R = mT(P), B = R.numericAxisName, F = R.cateAxisName, $ = jt(O, n), q = C4(j, $, "".concat(B, "Id"), "".concat(F, "Id"), N, D), Y = s.reduce(function(G, Z) {
      var ne = "".concat(Z.axisType, "Map");
      return H(H({}, G), {}, se({}, ne, YU(_, H(H({}, Z), {}, {
        graphicalItems: $,
        stackGroups: Z.axisType === B && q,
        dataStartIndex: A,
        dataEndIndex: b
      }))));
    }, {}), Q = zU(H(H({}, Y), {}, {
      props: _,
      graphicalItems: $
    }), v?.legendBBox);
    Object.keys(Y).forEach(function(G) {
      Y[G] = l(_, Y[G], Q, G.replace("Map", ""), r);
    });
    var te = Y["".concat(F, "Map")], k = GU(te), W = h(_, H(H({}, Y), {}, {
      dataStartIndex: A,
      dataEndIndex: b,
      updateId: T,
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
      var _, A, b;
      return PU(this, E), b = NU(this, E, [v]), se(b, "eventEmitterSymbol", /* @__PURE__ */ Symbol("rechartsEventEmitter")), se(b, "accessibilityManager", new pU()), se(b, "handleLegendBBoxUpdate", function(T) {
        if (T) {
          var O = b.state, P = O.dataStartIndex, N = O.dataEndIndex, j = O.updateId;
          b.setState(H({
            legendBBox: T
          }, p({
            props: b.props,
            dataStartIndex: P,
            dataEndIndex: N,
            updateId: j
          }, H(H({}, b.state), {}, {
            legendBBox: T
          }))));
        }
      }), se(b, "handleReceiveSyncEvent", function(T, O, P) {
        if (b.props.syncId === T) {
          if (P === b.eventEmitterSymbol && typeof b.props.syncMethod != "function")
            return;
          b.applySyncEvent(O);
        }
      }), se(b, "handleBrushChange", function(T) {
        var O = T.startIndex, P = T.endIndex;
        if (O !== b.state.dataStartIndex || P !== b.state.dataEndIndex) {
          var N = b.state.updateId;
          b.setState(function() {
            return H({
              dataStartIndex: O,
              dataEndIndex: P
            }, p({
              props: b.props,
              dataStartIndex: O,
              dataEndIndex: P,
              updateId: N
            }, b.state));
          }), b.triggerSyncEvent({
            dataStartIndex: O,
            dataEndIndex: P
          });
        }
      }), se(b, "handleMouseEnter", function(T) {
        var O = b.getMouseInfo(T);
        if (O) {
          var P = H(H({}, O), {}, {
            isTooltipActive: !0
          });
          b.setState(P), b.triggerSyncEvent(P);
          var N = b.props.onMouseEnter;
          de(N) && N(P, T);
        }
      }), se(b, "triggeredAfterMouseMove", function(T) {
        var O = b.getMouseInfo(T), P = O ? H(H({}, O), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        b.setState(P), b.triggerSyncEvent(P);
        var N = b.props.onMouseMove;
        de(N) && N(P, T);
      }), se(b, "handleItemMouseEnter", function(T) {
        b.setState(function() {
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
      }), se(b, "handleItemMouseLeave", function() {
        b.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), se(b, "handleMouseMove", function(T) {
        T.persist(), b.throttleTriggeredAfterMouseMove(T);
      }), se(b, "handleMouseLeave", function(T) {
        b.throttleTriggeredAfterMouseMove.cancel();
        var O = {
          isTooltipActive: !1
        };
        b.setState(O), b.triggerSyncEvent(O);
        var P = b.props.onMouseLeave;
        de(P) && P(O, T);
      }), se(b, "handleOuterEvent", function(T) {
        var O = _N(T), P = xt(b.props, "".concat(O));
        if (O && de(P)) {
          var N, j;
          /.*touch.*/i.test(O) ? j = b.getMouseInfo(T.changedTouches[0]) : j = b.getMouseInfo(T), P((N = j) !== null && N !== void 0 ? N : {}, T);
        }
      }), se(b, "handleClick", function(T) {
        var O = b.getMouseInfo(T);
        if (O) {
          var P = H(H({}, O), {}, {
            isTooltipActive: !0
          });
          b.setState(P), b.triggerSyncEvent(P);
          var N = b.props.onClick;
          de(N) && N(P, T);
        }
      }), se(b, "handleMouseDown", function(T) {
        var O = b.props.onMouseDown;
        if (de(O)) {
          var P = b.getMouseInfo(T);
          O(P, T);
        }
      }), se(b, "handleMouseUp", function(T) {
        var O = b.props.onMouseUp;
        if (de(O)) {
          var P = b.getMouseInfo(T);
          O(P, T);
        }
      }), se(b, "handleTouchMove", function(T) {
        T.changedTouches != null && T.changedTouches.length > 0 && b.throttleTriggeredAfterMouseMove(T.changedTouches[0]);
      }), se(b, "handleTouchStart", function(T) {
        T.changedTouches != null && T.changedTouches.length > 0 && b.handleMouseDown(T.changedTouches[0]);
      }), se(b, "handleTouchEnd", function(T) {
        T.changedTouches != null && T.changedTouches.length > 0 && b.handleMouseUp(T.changedTouches[0]);
      }), se(b, "handleDoubleClick", function(T) {
        var O = b.props.onDoubleClick;
        if (de(O)) {
          var P = b.getMouseInfo(T);
          O(P, T);
        }
      }), se(b, "handleContextMenu", function(T) {
        var O = b.props.onContextMenu;
        if (de(O)) {
          var P = b.getMouseInfo(T);
          O(P, T);
        }
      }), se(b, "triggerSyncEvent", function(T) {
        b.props.syncId !== void 0 && Nd.emit(Rd, b.props.syncId, T, b.eventEmitterSymbol);
      }), se(b, "applySyncEvent", function(T) {
        var O = b.props, P = O.layout, N = O.syncMethod, j = b.state.updateId, D = T.dataStartIndex, R = T.dataEndIndex;
        if (T.dataStartIndex !== void 0 || T.dataEndIndex !== void 0)
          b.setState(H({
            dataStartIndex: D,
            dataEndIndex: R
          }, p({
            props: b.props,
            dataStartIndex: D,
            dataEndIndex: R,
            updateId: j
          }, b.state)));
        else if (T.activeTooltipIndex !== void 0) {
          var B = T.chartX, F = T.chartY, $ = T.activeTooltipIndex, q = b.state, Y = q.offset, Q = q.tooltipTicks;
          if (!Y)
            return;
          if (typeof N == "function")
            $ = N(Q, T);
          else if (N === "value") {
            $ = -1;
            for (var te = 0; te < Q.length; te++)
              if (Q[te].value === T.activeLabel) {
                $ = te;
                break;
              }
          }
          var k = H(H({}, Y), {}, {
            x: Y.left,
            y: Y.top
          }), W = Math.min(B, k.x + k.width), G = Math.min(F, k.y + k.height), Z = Q[$] && Q[$].value, ne = fp(b.state, b.props.data, $), ue = Q[$] ? {
            x: P === "horizontal" ? Q[$].coordinate : W,
            y: P === "horizontal" ? G : Q[$].coordinate
          } : BS;
          b.setState(H(H({}, T), {}, {
            activeLabel: Z,
            activeCoordinate: ue,
            activePayload: ne,
            activeTooltipIndex: $
          }));
        } else
          b.setState(T);
      }), se(b, "renderCursor", function(T) {
        var O, P = b.state, N = P.isTooltipActive, j = P.activeCoordinate, D = P.activePayload, R = P.offset, B = P.activeTooltipIndex, F = P.tooltipAxisBandSize, $ = b.getTooltipEventType(), q = (O = T.props.active) !== null && O !== void 0 ? O : N, Y = b.props.layout, Q = T.key || "_recharts-cursor";
        return /* @__PURE__ */ C.createElement(TU, {
          key: Q,
          activeCoordinate: j,
          activePayload: D,
          activeTooltipIndex: B,
          chartName: r,
          element: T,
          isActive: q,
          layout: Y,
          offset: R,
          tooltipAxisBandSize: F,
          tooltipEventType: $
        });
      }), se(b, "renderPolarAxis", function(T, O, P) {
        var N = xt(T, "type.axisType"), j = xt(b.state, "".concat(N, "Map")), D = T.type.defaultProps, R = D !== void 0 ? H(H({}, D), T.props) : T.props, B = j && j[R["".concat(N, "Id")]];
        return /* @__PURE__ */ Ue(T, H(H({}, B), {}, {
          className: pe(N, B.className),
          key: T.key || "".concat(O, "-").concat(P),
          ticks: mr(B, !0)
        }));
      }), se(b, "renderPolarGrid", function(T) {
        var O = T.props, P = O.radialLines, N = O.polarAngles, j = O.polarRadius, D = b.state, R = D.radiusAxisMap, B = D.angleAxisMap, F = Mr(R), $ = Mr(B), q = $.cx, Y = $.cy, Q = $.innerRadius, te = $.outerRadius;
        return /* @__PURE__ */ Ue(T, {
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
          key: T.key || "polar-grid",
          radialLines: P
        });
      }), se(b, "renderLegend", function() {
        var T = b.state.formattedGraphicalItems, O = b.props, P = O.children, N = O.width, j = O.height, D = b.props.margin || {}, R = N - (D.left || 0) - (D.right || 0), B = vO({
          children: P,
          formattedGraphicalItems: T,
          legendWidth: R,
          legendContent: c
        });
        if (!B)
          return null;
        var F = B.item, $ = fT(B, _U);
        return /* @__PURE__ */ Ue(F, H(H({}, $), {}, {
          chartWidth: N,
          chartHeight: j,
          margin: D,
          onBBoxUpdate: b.handleLegendBBoxUpdate
        }));
      }), se(b, "renderTooltip", function() {
        var T, O = b.props, P = O.children, N = O.accessibilityLayer, j = At(P, yt);
        if (!j)
          return null;
        var D = b.state, R = D.isTooltipActive, B = D.activeCoordinate, F = D.activePayload, $ = D.activeLabel, q = D.offset, Y = (T = j.props.active) !== null && T !== void 0 ? T : R;
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
      }), se(b, "renderBrush", function(T) {
        var O = b.props, P = O.margin, N = O.data, j = b.state, D = j.offset, R = j.dataStartIndex, B = j.dataEndIndex, F = j.updateId;
        return /* @__PURE__ */ Ue(T, {
          key: T.key || "_recharts-brush",
          onChange: lu(b.handleBrushChange, T.props.onChange),
          data: N,
          x: J(T.props.x) ? T.props.x : D.left,
          y: J(T.props.y) ? T.props.y : D.top + D.height + D.brushBottom - (P.bottom || 0),
          width: J(T.props.width) ? T.props.width : D.width,
          startIndex: R,
          endIndex: B,
          updateId: "brush-".concat(F)
        });
      }), se(b, "renderReferenceElement", function(T, O, P) {
        if (!T)
          return null;
        var N = b, j = N.clipPathId, D = b.state, R = D.xAxisMap, B = D.yAxisMap, F = D.offset, $ = T.type.defaultProps || {}, q = T.props, Y = q.xAxisId, Q = Y === void 0 ? $.xAxisId : Y, te = q.yAxisId, k = te === void 0 ? $.yAxisId : te;
        return /* @__PURE__ */ Ue(T, {
          key: T.key || "".concat(O, "-").concat(P),
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
      }), se(b, "renderActivePoints", function(T) {
        var O = T.item, P = T.activePoint, N = T.basePoint, j = T.childIndex, D = T.isRange, R = [], B = O.props.key, F = O.item.type.defaultProps !== void 0 ? H(H({}, O.item.type.defaultProps), O.item.props) : O.item.props, $ = F.activeDot, q = F.dataKey, Y = H(H({
          index: j,
          dataKey: q,
          cx: P.x,
          cy: P.y,
          r: 4,
          fill: E0(O.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: P.payload,
          value: P.value
        }, le($, !1)), wu($));
        return R.push(E.renderActiveDot($, Y, "".concat(B, "-activePoint-").concat(j))), N ? R.push(E.renderActiveDot($, H(H({}, Y), {}, {
          cx: N.x,
          cy: N.y
        }), "".concat(B, "-basePoint-").concat(j))) : D && R.push(null), R;
      }), se(b, "renderGraphicChild", function(T, O, P) {
        var N = b.filterFormatItem(T, O, P);
        if (!N)
          return null;
        var j = b.getTooltipEventType(), D = b.state, R = D.isTooltipActive, B = D.tooltipAxis, F = D.activeTooltipIndex, $ = D.activeLabel, q = b.props.children, Y = At(q, yt), Q = N.props, te = Q.points, k = Q.isRange, W = Q.baseLine, G = N.item.type.defaultProps !== void 0 ? H(H({}, N.item.type.defaultProps), N.item.props) : N.item.props, Z = G.activeDot, ne = G.hide, ue = G.activeBar, oe = G.activeShape, fe = !!(!ne && R && Y && (Z || ue || oe)), ce = {};
        j !== "axis" && Y && Y.props.trigger === "click" ? ce = {
          onClick: lu(b.handleItemMouseEnter, T.props.onClick)
        } : j !== "axis" && (ce = {
          onMouseLeave: lu(b.handleItemMouseLeave, T.props.onMouseLeave),
          onMouseEnter: lu(b.handleItemMouseEnter, T.props.onMouseEnter)
        });
        var K = /* @__PURE__ */ Ue(T, H(H({}, N.props), ce));
        function re(cr) {
          return typeof B.dataKey == "function" ? B.dataKey(cr.payload) : null;
        }
        if (fe)
          if (F >= 0) {
            var ie, M;
            if (B.dataKey && !B.allowDuplicatedCategory) {
              var ye = typeof B.dataKey == "function" ? re : "payload.".concat(B.dataKey.toString());
              ie = Gd(te, ye, $), M = k && W && Gd(W, ye, $);
            } else
              ie = te?.[F], M = k && W && W[F];
            if (oe || ue) {
              var X = T.props.activeIndex !== void 0 ? T.props.activeIndex : F;
              return [/* @__PURE__ */ Ue(T, H(H(H({}, N.props), ce), {}, {
                activeIndex: X
              })), null, null];
            }
            if (!me(ie))
              return [K].concat(ba(b.renderActivePoints({
                item: N,
                activePoint: ie,
                basePoint: M,
                childIndex: F,
                isRange: k
              })));
          } else {
            var Pe, De = (Pe = b.getItemByXY(b.state.activeCoordinate)) !== null && Pe !== void 0 ? Pe : {
              graphicalItem: K
            }, et = De.graphicalItem, Ir = et.item, wn = Ir === void 0 ? T : Ir, Xi = et.childIndex, Kr = H(H(H({}, N.props), ce), {}, {
              activeIndex: Xi
            });
            return [/* @__PURE__ */ Ue(wn, Kr), null, null];
          }
        return k ? [K, null, null] : [K, null];
      }), se(b, "renderCustomized", function(T, O, P) {
        return /* @__PURE__ */ Ue(T, H(H({
          key: "recharts-customized-".concat(P)
        }, b.props), b.state));
      }), se(b, "renderMap", {
        CartesianGrid: {
          handler: bu,
          once: !0
        },
        ReferenceArea: {
          handler: b.renderReferenceElement
        },
        ReferenceLine: {
          handler: bu
        },
        ReferenceDot: {
          handler: b.renderReferenceElement
        },
        XAxis: {
          handler: bu
        },
        YAxis: {
          handler: bu
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
      }), b.clipPathId = "".concat((_ = v.id) !== null && _ !== void 0 ? _ : Hi("recharts"), "-clip"), b.throttleTriggeredAfterMouseMove = vA(b.triggeredAfterMouseMove, (A = v.throttleDelay) !== null && A !== void 0 ? A : 1e3 / 60), b.state = {}, b;
    }
    return MU(E, m), CU(E, [{
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
        var _ = this.props, A = _.children, b = _.data, T = _.height, O = _.layout, P = At(A, yt);
        if (P) {
          var N = P.props.defaultIndex;
          if (!(typeof N != "number" || N < 0 || N > this.state.tooltipTicks.length - 1)) {
            var j = this.state.tooltipTicks[N] && this.state.tooltipTicks[N].value, D = fp(this.state, b, N, j), R = this.state.tooltipTicks[N].coordinate, B = (this.state.offset.top + T) / 2, F = O === "horizontal", $ = F ? {
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
            this.setState(Y), this.renderCursor(P), this.accessibilityManager.setIndex(N);
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
          var b, T;
          this.accessibilityManager.setDetails({
            offset: {
              left: (b = this.props.margin.left) !== null && b !== void 0 ? b : 0,
              top: (T = this.props.margin.top) !== null && T !== void 0 ? T : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function(_) {
        zd([At(_.children, yt)], [At(this.props.children, yt)]) || this.displayDefaultTooltip();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function() {
        var _ = At(this.props.children, yt);
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
        var A = this.container, b = A.getBoundingClientRect(), T = l6(b), O = {
          chartX: Math.round(_.pageX - T.left),
          chartY: Math.round(_.pageY - T.top)
        }, P = b.width / A.offsetWidth || 1, N = this.inRange(O.chartX, O.chartY, P);
        if (!N)
          return null;
        var j = this.state, D = j.xAxisMap, R = j.yAxisMap, B = this.getTooltipEventType(), F = hT(this.state, this.props.data, this.props.layout, N);
        if (B !== "axis" && D && R) {
          var $ = Mr(D).scale, q = Mr(R).scale, Y = $ && $.invert ? $.invert(O.chartX) : null, Q = q && q.invert ? q.invert(O.chartY) : null;
          return H(H({}, O), {}, {
            xValue: Y,
            yValue: Q
          }, F);
        }
        return F ? H(H({}, O), F) : null;
      }
    }, {
      key: "inRange",
      value: function(_, A) {
        var b = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, T = this.props.layout, O = _ / b, P = A / b;
        if (T === "horizontal" || T === "vertical") {
          var N = this.state.offset, j = O >= N.left && O <= N.left + N.width && P >= N.top && P <= N.top + N.height;
          return j ? {
            x: O,
            y: P
          } : null;
        }
        var D = this.state, R = D.angleAxisMap, B = D.radiusAxisMap;
        if (R && B) {
          var F = Mr(R);
          return p1({
            x: O,
            y: P
          }, F);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var _ = this.props.children, A = this.getTooltipEventType(), b = At(_, yt), T = {};
        b && A === "axis" && (b.props.trigger === "click" ? T = {
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
        var O = wu(this.props, this.handleOuterEvent);
        return H(H({}, O), T);
      }
    }, {
      key: "addListener",
      value: function() {
        Nd.on(Rd, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        Nd.removeListener(Rd, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(_, A, b) {
        for (var T = this.state.formattedGraphicalItems, O = 0, P = T.length; O < P; O++) {
          var N = T[O];
          if (N.item === _ || N.props.key === _.key || A === gr(N.item.type) && b === N.childIndex)
            return N;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var _ = this.clipPathId, A = this.state.offset, b = A.left, T = A.top, O = A.height, P = A.width;
        return /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("clipPath", {
          id: _
        }, /* @__PURE__ */ C.createElement("rect", {
          x: b,
          y: T,
          height: O,
          width: P
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var _ = this.state.xAxisMap;
        return _ ? Object.entries(_).reduce(function(A, b) {
          var T = lT(b, 2), O = T[0], P = T[1];
          return H(H({}, A), {}, se({}, O, P.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var _ = this.state.yAxisMap;
        return _ ? Object.entries(_).reduce(function(A, b) {
          var T = lT(b, 2), O = T[0], P = T[1];
          return H(H({}, A), {}, se({}, O, P.scale));
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
        var A = this.state, b = A.formattedGraphicalItems, T = A.activeItem;
        if (b && b.length)
          for (var O = 0, P = b.length; O < P; O++) {
            var N = b[O], j = N.props, D = N.item, R = D.type.defaultProps !== void 0 ? H(H({}, D.type.defaultProps), D.props) : D.props, B = gr(D.type);
            if (B === "Bar") {
              var F = (j.data || []).find(function(Q) {
                return kB(_, Q);
              });
              if (F)
                return {
                  graphicalItem: N,
                  payload: F
                };
            } else if (B === "RadialBar") {
              var $ = (j.data || []).find(function(Q) {
                return p1(_, Q);
              });
              if ($)
                return {
                  graphicalItem: N,
                  payload: $
                };
            } else if (fs(N, T) || ds(N, T) || Ni(N, T)) {
              var q = iF({
                graphicalItem: N,
                activeTooltipItem: T,
                itemData: R.data
              }), Y = R.activeIndex === void 0 ? q : R.activeIndex;
              return {
                graphicalItem: H(H({}, N), {}, {
                  childIndex: Y
                }),
                payload: Ni(N, T) ? R.data[q] : N.props.data[q]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var _ = this;
        if (!xy(this))
          return null;
        var A = this.props, b = A.children, T = A.className, O = A.width, P = A.height, N = A.style, j = A.compact, D = A.title, R = A.desc, B = fT(A, AU), F = le(B, !1);
        if (j)
          return /* @__PURE__ */ C.createElement(zE, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ C.createElement(Xd, Fn({}, F, {
            width: O,
            height: P,
            title: D,
            desc: R
          }), this.renderClipPath(), Py(b, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var $, q;
          F.tabIndex = ($ = this.props.tabIndex) !== null && $ !== void 0 ? $ : 0, F.role = (q = this.props.role) !== null && q !== void 0 ? q : "application", F.onKeyDown = function(Q) {
            _.accessibilityManager.keyboardEvent(Q);
          }, F.onFocus = function() {
            _.accessibilityManager.focus();
          };
        }
        var Y = this.parseEventsOfWrapper();
        return /* @__PURE__ */ C.createElement(zE, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ C.createElement("div", Fn({
          className: pe("recharts-wrapper", T),
          style: H({
            position: "relative",
            cursor: "default",
            width: O,
            height: P
          }, N)
        }, Y, {
          ref: function(te) {
            _.container = te;
          }
        }), /* @__PURE__ */ C.createElement(Xd, Fn({}, F, {
          width: O,
          height: P,
          title: D,
          desc: R,
          style: $U
        }), this.renderClipPath(), Py(b, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  })(_T);
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
    var v = m.dataKey, _ = m.data, A = m.children, b = m.width, T = m.height, O = m.layout, P = m.stackOffset, N = m.margin, j = E.dataStartIndex, D = E.dataEndIndex;
    if (E.updateId === void 0) {
      var R = pT(m);
      return H(H(H({}, R), {}, {
        updateId: 0
      }, p(H(H({
        props: m
      }, R), {}, {
        updateId: 0
      }), E)), {}, {
        prevDataKey: v,
        prevData: _,
        prevWidth: b,
        prevHeight: T,
        prevLayout: O,
        prevStackOffset: P,
        prevMargin: N,
        prevChildren: A
      });
    }
    if (v !== E.prevDataKey || _ !== E.prevData || b !== E.prevWidth || T !== E.prevHeight || O !== E.prevLayout || P !== E.prevStackOffset || !Un(N, E.prevMargin)) {
      var B = pT(m), F = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: E.chartX,
        chartY: E.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: E.isTooltipActive
      }, $ = H(H({}, hT(E, _, O)), {}, {
        updateId: E.updateId + 1
      }), q = H(H(H({}, B), F), $);
      return H(H(H({}, q), p(H({
        props: m
      }, q), E)), {}, {
        prevDataKey: v,
        prevData: _,
        prevWidth: b,
        prevHeight: T,
        prevLayout: O,
        prevStackOffset: P,
        prevMargin: N,
        prevChildren: A
      });
    }
    if (!zd(A, E.prevChildren)) {
      var Y, Q, te, k, W = At(A, oa), G = W && (Y = (Q = W.props) === null || Q === void 0 ? void 0 : Q.startIndex) !== null && Y !== void 0 ? Y : j, Z = W && (te = (k = W.props) === null || k === void 0 ? void 0 : k.endIndex) !== null && te !== void 0 ? te : D, ne = G !== j || Z !== D, ue = !me(_), oe = ue && !ne ? E.updateId : E.updateId + 1;
      return H(H({
        updateId: oe
      }, p(H(H({
        props: m
      }, E), {}, {
        updateId: oe,
        dataStartIndex: G,
        dataEndIndex: Z
      }), E)), {}, {
        prevChildren: A,
        dataStartIndex: G,
        dataEndIndex: Z
      });
    }
    return null;
  }), se(g, "renderActiveDot", function(m, E, v) {
    var _;
    return /* @__PURE__ */ Lt(m) ? _ = /* @__PURE__ */ Ue(m, E) : de(m) ? _ = m(E) : _ = /* @__PURE__ */ C.createElement(A0, E), /* @__PURE__ */ C.createElement(Oe, {
      className: "recharts-active-dot",
      key: v
    }, _);
  });
  var y = /* @__PURE__ */ TT(function(E, v) {
    return /* @__PURE__ */ C.createElement(g, Fn({}, E, {
      ref: v
    }));
  });
  return y.displayName = g.displayName, y;
}, vs = FS({
  chartName: "BarChart",
  GraphicalChild: sr,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Sn
  }, {
    axisType: "yAxis",
    AxisComp: xn
  }],
  formatAxisMap: s9
}), XU = FS({
  chartName: "PieChart",
  GraphicalChild: Pr,
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
  formatAxisMap: H4,
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
const QU = "funding", ZU = ["Source", "Grants", "Total (GBP)"], JU = [32, 10, 18], e7 = ["text", "number", "currency"], Wn = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0
});
function rH({ content: e, block: t }) {
  const r = En(QU), { members: n, activeLabel: a } = Hr(e), i = e?.title || "Funding received", u = r7(n), o = u.reduce((c, l) => c + l.total, 0);
  ct(
    t,
    "xlsx",
    r && u.length > 0 ? {
      title: "Funding",
      headers: ZU,
      data: u.map(({ source: c, count: l, total: f }) => [c, l, f]),
      columnWidths: JU,
      numberFormats: e7,
      totals: ["Total", "sum", "sum"]
    } : null
  );
  const s = u.reduce((c, l) => c + l.count, 0);
  return ct(
    t,
    "docx",
    r && u.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ I(
        Bt,
        {
          as: "h2",
          data: i,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(ga, { widths: [55, 15, 30], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ ee(rt, { header: !0, children: [
          /* @__PURE__ */ I(he, { children: "Source" }),
          /* @__PURE__ */ I(he, { children: "Grants" }),
          /* @__PURE__ */ I(he, { children: "Total (GBP)" })
        ] }),
        u.map(({ source: c, count: l, total: f }, h) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ I(he, { children: c }),
          /* @__PURE__ */ I(he, { children: String(l) }),
          /* @__PURE__ */ I(he, { children: Wn.format(f) })
        ] }, h)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ I(he, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ I(he, { emphasis: !0, children: String(s) }),
          /* @__PURE__ */ I(he, { emphasis: !0, children: Wn.format(o) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ I("h2", { className: "chart-title", children: i }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ I("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    u.length === 0 ? /* @__PURE__ */ I("p", { className: "chart-empty", children: "No funding records for the selected population." }) : /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
        "Grand total: ",
        /* @__PURE__ */ I("strong", { children: Wn.format(o) }),
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
      /* @__PURE__ */ I(t7, { rows: u })
    ] })
  ] }) : null;
}
function t7({ rows: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ I("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((i) => ({ name: i.source, total: i.total })), a = Math.max(240, n.length * 56);
  return /* @__PURE__ */ I("div", { className: "chart-container", children: /* @__PURE__ */ I(Wi, { width: "100%", height: a, children: /* @__PURE__ */ ee(
    vs,
    {
      data: n,
      layout: "vertical",
      margin: { top: 8, right: 80, bottom: 8, left: 16 },
      children: [
        /* @__PURE__ */ I(Vi, { strokeDasharray: "3 3", stroke: "var(--border)" }),
        /* @__PURE__ */ I(
          Sn,
          {
            type: "number",
            tickFormatter: (i) => Wn.format(i),
            tick: { fontSize: 11 }
          }
        ),
        /* @__PURE__ */ I(
          xn,
          {
            type: "category",
            dataKey: "name",
            width: 200,
            tick: { fontSize: 12 }
          }
        ),
        /* @__PURE__ */ I(
          yt,
          {
            formatter: (i) => Wn.format(i),
            contentStyle: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem"
            }
          }
        ),
        /* @__PURE__ */ I(sr, { dataKey: "total", fill: "#be123c", radius: [0, 4, 4, 0], children: /* @__PURE__ */ I(
          Gt,
          {
            dataKey: "total",
            position: "right",
            formatter: (i) => Wn.format(i)
          }
        ) })
      ]
    }
  ) }) });
}
function r7(e) {
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
const n7 = "members", Md = ["Name", "Rank", "Department", "Tenured", "Start year"], a7 = [28, 14, 18, 10, 12], i7 = ["text", "text", "text", "text", "number"];
function nH({ content: e, block: t }) {
  const r = En(n7), { members: n, activeLabel: a } = Hr(e), i = e?.title || "Members", u = [...n].sort((s, c) => {
    const l = s?.name || "", f = c?.name || "";
    return l.localeCompare(f);
  }), o = u.map((s) => [
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
      headers: Md,
      data: o,
      columnWidths: a7,
      numberFormats: i7
    } : null
  ), ct(
    t,
    "docx",
    r ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ I(
        Bt,
        {
          as: "h2",
          data: i,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(ga, { widths: [32, 16, 22, 12, 18], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ I(rt, { header: !0, children: Md.map((s) => /* @__PURE__ */ I(he, { children: s }, s)) }),
        o.map((s, c) => /* @__PURE__ */ I(rt, { children: s.map((l, f) => /* @__PURE__ */ I(he, { children: l == null ? "" : String(l) }, f)) }, c))
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "members", children: [
    /* @__PURE__ */ I("h2", { className: "members-title", children: i }),
    a && /* @__PURE__ */ ee("p", { className: "members-query-note", children: [
      "Showing ",
      n.length,
      " members matching ",
      /* @__PURE__ */ I("em", { children: a }),
      "."
    ] }),
    n.length === 0 ? /* @__PURE__ */ I("p", { className: "members-empty", children: "No members match the selected population." }) : /* @__PURE__ */ ee("table", { className: "members-table", children: [
      /* @__PURE__ */ I("thead", { children: /* @__PURE__ */ I("tr", { children: Md.map((s) => /* @__PURE__ */ I("th", { children: s }, s)) }) }),
      /* @__PURE__ */ I("tbody", { children: u.map((s) => /* @__PURE__ */ ee("tr", { children: [
        /* @__PURE__ */ I("td", { children: s.name }),
        /* @__PURE__ */ I("td", { children: s.rank }),
        /* @__PURE__ */ I("td", { children: s.department }),
        /* @__PURE__ */ I("td", { className: s.tenured ? "status-yes" : "status-no", children: s.tenured ? "Yes" : "No" }),
        /* @__PURE__ */ I("td", { className: "numeric", children: s.start_year || "" })
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
function u7(e, t = {}) {
  if (!Array.isArray(e)) return [];
  const r = [];
  for (const n of e) {
    const a = Es(n?.publications, t);
    for (const i of a)
      r.push({ ...i, _author: n?.name || n?.slug || "Unknown" });
  }
  return r;
}
const o7 = "publications-by-journal", s7 = 10, c7 = ["Venue", "Count"], l7 = [48, 10], f7 = ["text", "number"];
function aH({ content: e, block: t }) {
  const r = En(o7), { members: n, activeLabel: a } = Hr(e), [i] = Fi(), u = e?.title || "Publications by journal", o = h7(n, s7, i);
  ct(
    t,
    "xlsx",
    r && o.length > 0 ? {
      title: "Publications by Journal",
      headers: c7,
      data: o.map(({ venue: c, count: l }) => [c, l]),
      columnWidths: l7,
      numberFormats: f7,
      totals: ["Total", "sum"]
    } : null
  );
  const s = o.reduce((c, l) => c + l.count, 0);
  return ct(
    t,
    "docx",
    r && o.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ I(
        Bt,
        {
          as: "h2",
          data: u,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(ga, { widths: [82, 18], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ ee(rt, { header: !0, children: [
          /* @__PURE__ */ I(he, { children: "Venue" }),
          /* @__PURE__ */ I(he, { children: "Count" })
        ] }),
        o.map(({ venue: c, count: l }, f) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ I(he, { children: c }),
          /* @__PURE__ */ I(he, { children: String(l) })
        ] }, f)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ I(he, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ I(he, { emphasis: !0, children: String(s) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ I("h2", { className: "chart-title", children: u }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ I("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    o.length === 0 ? /* @__PURE__ */ I("p", { className: "chart-empty", children: "No publications in the selected population." }) : /* @__PURE__ */ I(d7, { counts: o })
  ] }) : null;
}
function d7({ counts: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ I("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((i) => ({ name: i.venue, value: i.count })), a = Math.max(240, n.length * 44);
  return /* @__PURE__ */ I("div", { className: "chart-container", children: /* @__PURE__ */ I(Wi, { width: "100%", height: a, children: /* @__PURE__ */ ee(
    vs,
    {
      data: n,
      layout: "vertical",
      margin: { top: 8, right: 32, bottom: 8, left: 16 },
      children: [
        /* @__PURE__ */ I(Vi, { strokeDasharray: "3 3", stroke: "var(--border)" }),
        /* @__PURE__ */ I(Sn, { type: "number", allowDecimals: !1 }),
        /* @__PURE__ */ I(
          xn,
          {
            type: "category",
            dataKey: "name",
            width: 240,
            tick: { fontSize: 12 }
          }
        ),
        /* @__PURE__ */ I(
          yt,
          {
            contentStyle: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem"
            }
          }
        ),
        /* @__PURE__ */ I(sr, { dataKey: "value", fill: "#1e40af", radius: [0, 4, 4, 0], children: /* @__PURE__ */ I(Gt, { dataKey: "value", position: "right" }) })
      ]
    }
  ) }) });
}
function h7(e, t, r) {
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
const p7 = "publications-by-type", yT = [
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
], m7 = ["Publication type", "Count"], y7 = [24, 10], b7 = ["text", "number"];
function iH({ content: e, block: t }) {
  const r = En(p7), { members: n, activeLabel: a } = Hr(e), [i] = Fi(), u = e?.title || "Publications by type", o = v7(n, i);
  ct(
    t,
    "xlsx",
    r && o.length > 0 ? {
      title: "Publications by Type",
      headers: m7,
      data: o.map(({ type: c, count: l }) => [dp(c), l]),
      columnWidths: y7,
      numberFormats: b7,
      totals: ["Total", "sum"]
    } : null
  );
  const s = o.reduce((c, l) => c + l.count, 0);
  return ct(
    t,
    "docx",
    r && o.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ I(
        Bt,
        {
          as: "h2",
          data: u,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(ga, { widths: [70, 30], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ ee(rt, { header: !0, children: [
          /* @__PURE__ */ I(he, { children: "Publication type" }),
          /* @__PURE__ */ I(he, { children: "Count" })
        ] }),
        o.map(({ type: c, count: l }, f) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ I(he, { children: dp(c) }),
          /* @__PURE__ */ I(he, { children: String(l) })
        ] }, f)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ I(he, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ I(he, { emphasis: !0, children: String(s) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ I("h2", { className: "chart-title", children: u }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ I("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    o.length === 0 ? /* @__PURE__ */ I("p", { className: "chart-empty", children: "No publications for the selected population." }) : /* @__PURE__ */ I(g7, { counts: o })
  ] }) : null;
}
function g7({ counts: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ I("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map(({ type: a, count: i }) => ({
    name: dp(a),
    value: i
  }));
  return /* @__PURE__ */ I("div", { className: "chart-container", children: /* @__PURE__ */ I(Wi, { width: "100%", height: 320, children: /* @__PURE__ */ ee(XU, { children: [
    /* @__PURE__ */ I(
      Pr,
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
        children: n.map((a, i) => /* @__PURE__ */ I(Ko, { fill: yT[i % yT.length] }, i))
      }
    ),
    /* @__PURE__ */ I(
      yt,
      {
        contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem"
        }
      }
    ),
    /* @__PURE__ */ I(
      jr,
      {
        verticalAlign: "bottom",
        height: 36,
        wrapperStyle: { fontSize: "0.875rem" }
      }
    )
  ] }) }) });
}
function v7(e, t) {
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
function dp(e) {
  return String(e).charAt(0).toUpperCase() + String(e).slice(1);
}
const E7 = "publications-by-year", T7 = ["Year", "Count", "Cumulative"], _7 = [10, 10, 12], A7 = ["number", "number", "number"];
function uH({ content: e, block: t }) {
  const r = En(E7), { members: n, activeLabel: a } = Hr(e), [i] = Fi(), u = e?.title || "Publications by year", { series: o, total: s } = S7(n, i);
  return ct(
    t,
    "xlsx",
    r && o.length > 0 ? {
      title: "Publications by Year",
      headers: T7,
      data: o.map((c) => [c.year, c.count, c.cumulative]),
      columnWidths: _7,
      numberFormats: A7,
      totals: ["Total", "sum", s]
    } : null
  ), ct(
    t,
    "docx",
    r && o.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ I(
        Bt,
        {
          as: "h2",
          data: u,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(ga, { widths: [30, 35, 35], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ ee(rt, { header: !0, children: [
          /* @__PURE__ */ I(he, { children: "Year" }),
          /* @__PURE__ */ I(he, { children: "Count" }),
          /* @__PURE__ */ I(he, { children: "Cumulative" })
        ] }),
        o.map((c, l) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ I(he, { children: String(c.year) }),
          /* @__PURE__ */ I(he, { children: String(c.count) }),
          /* @__PURE__ */ I(he, { children: String(c.cumulative) })
        ] }, l)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ I(he, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ I(he, { emphasis: !0, children: String(s) }),
          /* @__PURE__ */ I(he, { emphasis: !0, children: String(s) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ I("h2", { className: "chart-title", children: u }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ I("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    o.length === 0 ? /* @__PURE__ */ I("p", { className: "chart-empty", children: "No publications in the selected population." }) : /* @__PURE__ */ I(O7, { series: o })
  ] }) : null;
}
function O7({ series: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ I("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((a) => ({ year: String(a.year), value: a.count }));
  return /* @__PURE__ */ I("div", { className: "chart-container", children: /* @__PURE__ */ I(Wi, { width: "100%", height: 320, children: /* @__PURE__ */ ee(vs, { data: n, margin: { top: 16, right: 16, bottom: 16, left: 0 }, children: [
    /* @__PURE__ */ I(Vi, { strokeDasharray: "3 3", stroke: "var(--border)" }),
    /* @__PURE__ */ I(Sn, { dataKey: "year", tick: { fontSize: 12 } }),
    /* @__PURE__ */ I(xn, { allowDecimals: !1 }),
    /* @__PURE__ */ I(
      yt,
      {
        contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem"
        }
      }
    ),
    /* @__PURE__ */ I(sr, { dataKey: "value", fill: "#0f766e", radius: [4, 4, 0, 0], children: /* @__PURE__ */ I(Gt, { dataKey: "value", position: "top" }) })
  ] }) }) });
}
function S7(e, t) {
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
function x7(e) {
  const t = String(e || "").trim().split(/\s+/);
  if (t.length === 0) return { family: "Unknown", given: "" };
  if (t.length === 1) return { family: t[0], given: "" };
  const r = t[t.length - 1], n = t.slice(0, -1).join(" ");
  return { family: r, given: n };
}
function w7(e, { defaultAuthor: t } = {}) {
  if (!e) return null;
  const r = e.authors && e.authors.length ? e.authors : t ? [t] : [{ family: "Unknown", given: "" }], n = {
    id: e.id || `${(e.title || "pub").slice(0, 24)}-${e.year || "xx"}`,
    type: e.type || "book",
    title: e.title || "",
    author: r
  };
  return e.year != null && (n.issued = { "date-parts": [[Number(e.year) || e.year]] }), e.journal && (n["container-title"] = e.journal), e.publisher && (n.publisher = e.publisher), e.DOI && (n.DOI = e.DOI), n;
}
function P7(e) {
  return Array.isArray(e) ? e.map((t) => {
    const r = t._author ? x7(t._author) : void 0;
    return w7(t, { defaultAuthor: r });
  }).filter(Boolean) : [];
}
const I7 = "publications-list", bT = {
  apa: () => import("./apa-DFWazoZc.js"),
  mla: () => import("./mla-D135I5OW.js"),
  "chicago-author-date": () => import("./chicago-author-date-D8QH1iwN.js"),
  ieee: () => import("./ieee-CHRt3McI.js"),
  vancouver: () => import("./vancouver-C_ZYAEtz.js"),
  harvard: () => import("./harvard-fzOIiT6h.js"),
  nature: () => import("./nature-BgGht0BR.js")
}, Ld = /* @__PURE__ */ new Map();
async function C7(e) {
  if (Ld.has(e)) return Ld.get(e);
  const t = bT[e] || bT.apa, [{ formatAll: r }, n] = await Promise.all([
    import("./index-CxzhyvpC.js"),
    t()
  ]), a = { formatAll: r, style: n };
  return Ld.set(e, a), a;
}
function oH({ content: e, block: t }) {
  const r = En(I7), { members: n, activeLabel: a } = Hr(e), [i] = Fi(), u = e?.title || "Publications", o = [...u7(n, i)].sort((y, m) => {
    const E = Number(y.year) || 0;
    return (Number(m.year) || 0) - E;
  }), s = P7(o), c = s.map((y) => y.id).join("|"), [l, f] = ft({ loading: !0, entries: [] });
  Et(() => {
    let y = !1;
    if (!r || s.length === 0) {
      f({ loading: !1, entries: [] });
      return;
    }
    return C7(i.citationStyle).then(({ formatAll: m, style: E }) => {
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
        const E = o[m];
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
      /* @__PURE__ */ I(
        Bt,
        {
          as: "h2",
          data: u,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      p.map((y, m) => /* @__PURE__ */ I(
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
    /* @__PURE__ */ I("h2", { className: "chart-title", children: u }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ I("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    h && /* @__PURE__ */ I("p", { className: "chart-empty", children: "Loading citations…" }),
    !h && p.length === 0 && /* @__PURE__ */ I("p", { className: "chart-empty", children: "No publications match the current query + date range + refereed filter." }),
    !h && p.length > 0 && /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ I("ol", { className: "publications-list", children: p.map((y, m) => /* @__PURE__ */ I("li", { children: /* @__PURE__ */ I(
        cC,
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
const N7 = "supervisions", gT = ["#1e40af", "#0f766e", "#ea580c", "#9333ea", "#be123c", "#0ea5e9"];
function sH({ content: e, block: t }) {
  const r = En(N7), { members: n, activeLabel: a } = Hr(e), i = e?.title || "Supervisions", { levels: u, rows: o, grandTotal: s } = D7(n), c = ["Member", ...u.map(hp), "Total"], l = o.map((v) => [
    v.member,
    ...u.map((_) => v.counts[_] || 0),
    v.total
  ]), f = [28, ...u.map(() => 12), 10], h = ["text", ...u.map(() => "number"), "number"], p = ["Total", ...u.map(() => "sum"), "sum"];
  ct(
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
  const g = u.length > 0 ? Math.floor(60 / u.length) : 60, y = [
    100 - g * u.length - 10,
    ...u.map(() => g),
    10
  ], m = u.map(
    (v) => o.reduce((_, A) => _ + (A.counts[v] || 0), 0)
  ), E = o.reduce((v, _) => v + _.total, 0);
  return ct(
    t,
    "docx",
    r && o.length > 0 ? /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ I(
        Bt,
        {
          as: "h2",
          data: i,
          "data-heading": "HEADING_2",
          "data-spacing-before": 240,
          "data-spacing-after": 160
        }
      ),
      /* @__PURE__ */ ee(ga, { widths: y, borderColor: "cbd5e1", children: [
        /* @__PURE__ */ I(rt, { header: !0, children: c.map((v) => /* @__PURE__ */ I(he, { children: v }, v)) }),
        o.map((v, _) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ I(he, { children: v.member }),
          u.map((A) => /* @__PURE__ */ I(he, { children: String(v.counts[A] || 0) }, A)),
          /* @__PURE__ */ I(he, { children: String(v.total) })
        ] }, _)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ I(he, { emphasis: !0, children: "Total" }),
          m.map((v, _) => /* @__PURE__ */ I(he, { emphasis: !0, children: String(v) }, _)),
          /* @__PURE__ */ I(he, { emphasis: !0, children: String(E) })
        ] })
      ] })
    ] }) : null
  ), r ? /* @__PURE__ */ ee("section", { className: "chart-section", children: [
    /* @__PURE__ */ I("h2", { className: "chart-title", children: i }),
    a && /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
      "Across ",
      /* @__PURE__ */ I("em", { children: a }),
      " (",
      n.length,
      " ",
      n.length === 1 ? "member" : "members",
      ")."
    ] }),
    o.length === 0 ? /* @__PURE__ */ I("p", { className: "chart-empty", children: "No supervisions recorded for the selected population." }) : /* @__PURE__ */ ee(wt, { children: [
      /* @__PURE__ */ ee("p", { className: "chart-query-note", children: [
        "Grand total: ",
        /* @__PURE__ */ I("strong", { children: s }),
        " ",
        s === 1 ? "student" : "students",
        " across",
        " ",
        o.length,
        " ",
        o.length === 1 ? "supervisor" : "supervisors",
        "."
      ] }),
      /* @__PURE__ */ I(R7, { rows: o, levels: u })
    ] })
  ] }) : null;
}
function R7({ rows: e, levels: t }) {
  const [r, n] = ft(!1);
  if (Et(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ I("div", { className: "chart-container chart-container-placeholder" });
  const a = e.map((i) => {
    const u = { name: M7(i.member) };
    for (const o of t) u[hp(o)] = i.counts[o] || 0;
    return u;
  });
  return /* @__PURE__ */ I("div", { className: "chart-container", children: /* @__PURE__ */ I(Wi, { width: "100%", height: 320, children: /* @__PURE__ */ ee(vs, { data: a, margin: { top: 16, right: 24, bottom: 16, left: 0 }, children: [
    /* @__PURE__ */ I(Vi, { strokeDasharray: "3 3", stroke: "var(--border)" }),
    /* @__PURE__ */ I(Sn, { dataKey: "name", tick: { fontSize: 12 } }),
    /* @__PURE__ */ I(xn, { allowDecimals: !1 }),
    /* @__PURE__ */ I(
      yt,
      {
        contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem"
        }
      }
    ),
    /* @__PURE__ */ I(jr, { wrapperStyle: { fontSize: "0.875rem" } }),
    t.map((i, u) => /* @__PURE__ */ I(
      sr,
      {
        dataKey: hp(i),
        stackId: "supervision",
        fill: gT[u % gT.length],
        radius: u === t.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]
      },
      i
    ))
  ] }) }) });
}
function D7(e) {
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
function hp(e) {
  return String(e).charAt(0).toUpperCase() + String(e).slice(1);
}
function M7(e) {
  const t = String(e).trim().split(/\s+/);
  return t.length <= 1 ? e : `${t[0][0]}. ${t[t.length - 1]}`;
}
function L7({ queries: e = [] }) {
  const [t, r] = xp(), [, n] = wp(), a = (i) => {
    r(i), n(null);
  };
  return /* @__PURE__ */ ee("div", { className: "query-selector", children: [
    /* @__PURE__ */ I("label", { className: "query-selector-label", htmlFor: "academic-metrics-query", children: "Population" }),
    /* @__PURE__ */ ee(
      "select",
      {
        id: "academic-metrics-query",
        className: "query-selector-control",
        value: t,
        onChange: (i) => a(i.target.value),
        children: [
          /* @__PURE__ */ I("option", { value: v_, children: "All members" }),
          e.map((i) => /* @__PURE__ */ I("option", { value: i.slug, children: i.name || i.slug }, i.slug))
        ]
      }
    )
  ] });
}
const k7 = "members";
function B7() {
  const e = lC(k7), [, t] = xp(), [r, n] = wp(), [a, i] = ft(() => ET(r, e));
  if (Et(() => {
    i(ET(r, e));
  }, [e]), !e) return null;
  const u = (c, l) => {
    const f = { ...a, [c]: l };
    i(f);
    const h = F7(f, e);
    n(h), h && t(v_);
  }, o = () => {
    i({}), n(null);
  }, s = r && Object.keys(r).length > 0;
  return /* @__PURE__ */ ee("fieldset", { className: "filter-panel", children: [
    /* @__PURE__ */ I("legend", { className: "filter-panel-legend", children: "Filter members" }),
    Object.entries(e).map(([c, l]) => /* @__PURE__ */ I(
      j7,
      {
        field: c,
        def: l,
        value: a[c],
        onChange: (f) => u(c, f)
      },
      c
    )),
    /* @__PURE__ */ I(
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
function j7({ field: e, def: t, value: r, onChange: n }) {
  const a = t?.label || e;
  switch (t?.type) {
    case "enum":
      return /* @__PURE__ */ I(gu, { label: a, field: e, children: /* @__PURE__ */ ee(
        "select",
        {
          id: `filter-${e}`,
          value: r ?? "",
          onChange: (i) => n(i.target.value || void 0),
          children: [
            /* @__PURE__ */ I("option", { value: "", children: "Any" }),
            (t.options || []).map((i) => /* @__PURE__ */ I("option", { value: i, children: i }, i))
          ]
        }
      ) });
    case "boolean":
      return /* @__PURE__ */ I(gu, { label: a, field: e, children: /* @__PURE__ */ ee(
        "select",
        {
          id: `filter-${e}`,
          value: r === void 0 ? "" : String(r),
          onChange: (i) => {
            const u = i.target.value;
            n(u === "" ? void 0 : u === "true");
          },
          children: [
            /* @__PURE__ */ I("option", { value: "", children: "Any" }),
            /* @__PURE__ */ I("option", { value: "true", children: "Yes" }),
            /* @__PURE__ */ I("option", { value: "false", children: "No" })
          ]
        }
      ) });
    case "range":
      return /* @__PURE__ */ I(gu, { label: a, field: e, children: /* @__PURE__ */ ee("div", { className: "filter-range", children: [
        /* @__PURE__ */ I(
          "input",
          {
            type: "number",
            min: t.min,
            max: t.max,
            placeholder: t.min != null ? String(t.min) : "min",
            value: r?.min ?? "",
            onChange: (i) => {
              const u = i.target.value === "" ? void 0 : Number(i.target.value);
              n(vT(r, "min", u));
            }
          }
        ),
        /* @__PURE__ */ I("span", { "aria-hidden": "true", children: "–" }),
        /* @__PURE__ */ I(
          "input",
          {
            type: "number",
            min: t.min,
            max: t.max,
            placeholder: t.max != null ? String(t.max) : "max",
            value: r?.max ?? "",
            onChange: (i) => {
              const u = i.target.value === "" ? void 0 : Number(i.target.value);
              n(vT(r, "max", u));
            }
          }
        )
      ] }) });
    case "text":
      return /* @__PURE__ */ I(gu, { label: a, field: e, children: /* @__PURE__ */ I(
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
  return /* @__PURE__ */ ee("div", { className: "filter-row", children: [
    /* @__PURE__ */ I("label", { className: "filter-label", htmlFor: `filter-${t}`, children: e }),
    r
  ] });
}
function vT(e, t, r) {
  const n = { ...e || {} };
  return r === void 0 ? delete n[t] : n[t] = r, Object.keys(n).length === 0 ? void 0 : n;
}
function F7(e, t) {
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
function ET(e, t) {
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
function $7() {
  const [e, t] = Fi(), { dateRange: r, refereedOnly: n, citationStyle: a } = e, i = (c) => {
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
  return /* @__PURE__ */ ee("fieldset", { className: "report-options", children: [
    /* @__PURE__ */ I("legend", { className: "report-options-legend", children: "Report options" }),
    /* @__PURE__ */ ee("div", { className: "report-options-row", children: [
      /* @__PURE__ */ ee("label", { className: "report-options-field", children: [
        /* @__PURE__ */ I("span", { className: "report-options-label", children: "From year" }),
        /* @__PURE__ */ I(
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
        /* @__PURE__ */ I("span", { className: "report-options-label", children: "To year" }),
        /* @__PURE__ */ I(
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
      /* @__PURE__ */ ee("label", { className: "report-options-field", children: [
        /* @__PURE__ */ I("span", { className: "report-options-label", children: "Citation style" }),
        /* @__PURE__ */ I(
          "select",
          {
            value: a,
            onChange: s,
            className: "report-options-input",
            children: mC.map((c) => /* @__PURE__ */ I("option", { value: c.value, children: c.label }, c.value))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ ee("label", { className: "report-options-item", children: [
      /* @__PURE__ */ I(
        "input",
        {
          type: "checkbox",
          checked: n,
          onChange: o
        }
      ),
      /* @__PURE__ */ I("span", { children: "Refereed only" })
    ] })
  ] });
}
function U7() {
  const [e, t] = vC(), r = new Set(e);
  return /* @__PURE__ */ ee("fieldset", { className: "section-toggles", children: [
    /* @__PURE__ */ I("legend", { className: "section-toggles-legend", children: "Sections" }),
    /* @__PURE__ */ I("div", { className: "section-toggles-list", children: dC.map((n) => /* @__PURE__ */ ee("label", { className: "section-toggles-item", children: [
      /* @__PURE__ */ I(
        "input",
        {
          type: "checkbox",
          checked: !r.has(n),
          onChange: () => t(n)
        }
      ),
      /* @__PURE__ */ I("span", { children: pC(n) })
    ] }, n)) })
  ] });
}
function H7() {
  const { data: e } = b_({ path: "/data/queries.json", schema: "queries" }), t = Array.isArray(e) ? e : [];
  return /* @__PURE__ */ ee("div", { className: "w-[min(32rem,calc(100vw-3rem))] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-xl flex flex-col gap-4", children: [
    /* @__PURE__ */ I(L7, { queries: t }),
    /* @__PURE__ */ I(B7, {}),
    /* @__PURE__ */ I($7, {}),
    /* @__PURE__ */ I(U7, {})
  ] });
}
function q7() {
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
        /* @__PURE__ */ I("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ I("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
      ]
    }
  );
}
function W7() {
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
        /* @__PURE__ */ I("path", { d: "M12 3v12" }),
        /* @__PURE__ */ I("path", { d: "m7 10 5 5 5-5" }),
        /* @__PURE__ */ I("path", { d: "M5 21h14" })
      ]
    }
  );
}
function Y7() {
  return /* @__PURE__ */ I(
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
      children: /* @__PURE__ */ I("polyline", { points: "6 9 12 15 18 9" })
    }
  );
}
function G7({
  title: e = "Academic Metrics",
  filename: t = "academic-metrics"
}) {
  const { website: r } = Mo(), [n, a] = ft(null), [i, u] = ft(null), [o, s] = ft(!1), [c, l] = ft(!1), f = ei(null);
  Et(() => {
    if (!o && !c) return;
    const g = (y) => {
      f.current && !f.current.contains(y.target) && (s(!1), l(!1));
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [o, c]);
  const h = async (g) => {
    a(null), u(g), l(!1);
    try {
      const y = await nC(r, {
        format: g,
        foundation: $d,
        title: e
      }), m = $d.outputs?.[g]?.extension || g;
      eC(y, `${t}.${m}`);
    } catch (y) {
      console.error("compile failed", y), a(y?.message || String(y));
    } finally {
      u(null);
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
              "aria-expanded": o,
              "aria-label": "Report options",
              className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-body text-sm font-semibold shadow-md transition hover:bg-muted",
              children: [
                /* @__PURE__ */ I(q7, {}),
                "Options"
              ]
            }
          ),
          /* @__PURE__ */ ee("div", { className: "relative", children: [
            /* @__PURE__ */ I(
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
                  /* @__PURE__ */ I("span", { className: "h-2 w-2 animate-pulse rounded-full bg-primary-foreground" }),
                  "Generating…"
                ] }) : /* @__PURE__ */ ee(wt, { children: [
                  /* @__PURE__ */ I(W7, {}),
                  "Download",
                  /* @__PURE__ */ I(Y7, {})
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
                        /* @__PURE__ */ I("span", { className: "font-medium", children: "Excel" }),
                        /* @__PURE__ */ I("span", { className: "text-xs text-subtle tabular-nums", children: ".xlsx" })
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
                        /* @__PURE__ */ I("span", { className: "font-medium", children: "Word" }),
                        /* @__PURE__ */ I("span", { className: "text-xs text-subtle tabular-nums", children: ".docx" })
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ] }),
        o && /* @__PURE__ */ I(H7, {}),
        n && /* @__PURE__ */ I("p", { className: "max-w-xs rounded bg-error-subtle px-3 py-1 text-xs text-error", children: n })
      ]
    }
  );
}
function K7({ body: e, page: t }) {
  const { website: r } = Mo(), n = t?.title || "Academic Metrics", a = (t?.title || "academic-metrics").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return Et(() => gC(t), [t]), /* @__PURE__ */ ee($T, { basePath: r.basePath, children: [
    /* @__PURE__ */ I("main", { className: "metrics-body mx-auto max-w-5xl px-6 pb-16", children: /* @__PURE__ */ I("div", { className: "metrics-report", children: e }) }),
    /* @__PURE__ */ I(G7, { title: n, filename: a })
  ] });
}
const z7 = { ...$d, layouts: { MetricsLayout: K7 } }, V7 = {}, X7 = {}, cH = { meta: V7, capabilities: z7, layoutMeta: X7 };
export {
  tH as C,
  rH as F,
  nH as M,
  aH as P,
  sH as S,
  cH as _,
  iH as a,
  uH as b,
  tu as c,
  oH as d,
  nC as e,
  fm as f,
  xe as g,
  jI as p
};
//# sourceMappingURL=_entry.generated-BjT35ujH.js.map
