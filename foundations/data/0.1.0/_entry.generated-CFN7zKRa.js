import { jsx as P, jsxs as ee, Fragment as wt } from "react/jsx-runtime";
import * as qr from "react";
import C, { createContext as Vt, useContext as $t, useMemo as Fr, createElement as ai, Children as $r, isValidElement as Lt, cloneElement as Ue, Suspense as KS, useState as ft, useEffect as Et, useReducer as VS, PureComponent as ir, forwardRef as PT, useRef as ii, useImperativeHandle as XS, useCallback as QS, Component as IT } from "react";
import { renderToStaticMarkup as Ep } from "react-dom/server";
import { getUniweb as Tp, deriveCacheKey as ZS } from "@uniweb/core";
const CT = /\s+/, JS = /([+\-*\/=<>!&|]+)/, U0 = {
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
function Mn(e, t, r = {}) {
  const n = Object.keys(t), a = r.minQuoteLevel || 0, i = r.splitText || !1;
  r.skipCommas;
  const o = [];
  let u = 0, s = "", c = !1, l = "", f = [], h = "", p = 0;
  const g = ["'", '"', "`", "‘", "’", "“", "”"], y = (E, _) => E === _ ? !0 : ["‘", "’"].includes(E) && ["‘", "’"].includes(_) || ["“", "”"].includes(E) && ["“", "”"].includes(_);
  function m(E, _) {
    if (i && E == "text") {
      const A = _.trim().split(CT);
      for (let b of A)
        b = tx(b), b !== "" && o.push({ type: E, value: b });
    } else
      o.push({ type: E, value: _ });
    s = "";
  }
  function v(E) {
    p === 0 ? (s !== "" && m("text", s), s = E) : s += E;
  }
  for (; u < e.length; ) {
    const E = e[u];
    n.includes(E) && !c ? (v(E), p = f.push(E), h = t[E]) : E === h && !c ? (s += E, f.pop(), p--, h = p > 0 ? t[f[p - 1]] : "", p === 0 && m("enclosure", s)) : !c && g.includes(E) && p > a ? (v(E), c = !0, l = E) : c && y(l, E) ? (s += E, c = !1, p === 0 && m("quote", s)) : s += E, u++;
  }
  return s !== "" && m("text", s), o;
}
function ex(e) {
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
function NT(e, t = []) {
  if (typeof e != "string")
    return e instanceof Object ? { ...e } : {};
  const r = Mn(e, { "{": "}", "(": ")" }, { minQuoteLevel: 1 }), n = {};
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
      const c = o.slice(1, -1).trim().split(CT), l = c.shift(), f = c[0] === "$0";
      f && c.shift(), !l || !/^[a-zA-Z_]\w*$/.test(l) ? a("name", "word", c.join(" ")) : c.every((h) => /^(\.\.\.)?[a-zA-Z_]\w*$/.test(h)) ? n[l] = { args: c, body: s, isText: u == "{", hasFlags: f } : a("arguments", "words", c.join(" "));
    }
  }
  return n;
}
function tx(e) {
  let t = 0, r = e.length - 1;
  for (; t <= r && e[t] === ","; )
    t++;
  for (; r >= t && e[r] === ","; )
    r--;
  return e.slice(t, r + 1);
}
function rx(e) {
  const t = [];
  let r, n, a;
  for (let i of e)
    if (i.type === "text")
      if (r = i.value.split(JS), r.length <= 1)
        t.push(i);
      else
        for (let o = 0; o < r.length; o++)
          n = r[o].trim(), n !== "" && (a = "+-*/=<>!&|".includes(n[0]), n === "!" && t.push({ type: "text", value: "" }), t.push({ type: "text", value: n, isOperator: a }));
    else
      t.push(i);
  return t;
}
function nx(e) {
  const t = [];
  let r = 0, n = !1, a = [];
  for (; r < e.length; ) {
    const i = e[r], o = e[r + 1];
    o && o.isOperator ? (n || (n = !0, a = []), a.push(i, o), r += 2) : (n ? (n = !1, a.push(i), t.push({ type: "chain", tokens: a })) : t.push(i), r++);
  }
  return n && t.push({ type: "chain", tokens: a }), t;
}
function ax(e) {
  const t = [], r = [];
  let n, a, i;
  for (let o of e)
    if (!o.isOperator)
      t.push(o.value);
    else {
      for (; r.length > 0 && U0[r[r.length - 1]] >= U0[o.value]; )
        n = r.pop(), a = t.pop(), i = t.pop(), t.push(`(${n} ${i} ${a})`);
      r.push(o.value);
    }
  for (; r.length > 0; )
    n = r.pop(), a = t.pop(), i = t.pop(), t.push(`(${n} ${i} ${a})`);
  return t[0];
}
function ix(e) {
  const t = rx(e), r = nx(t);
  for (const n of r)
    n.type === "chain" && (n.type = "enclosure", n.value = ax(n.tokens), delete n.tokens);
  return r;
}
function ox(e) {
  if (!e.length) return [];
  const t = { show: "#", if: "?", sort: ">>" }, r = t[e[0].value.toLowerCase()];
  if (!r) return e;
  e = ix(e);
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
    const f = H0(l).map((h) => h.value);
    c.args.push({ type: "enclosure", value: "(" + f.join(" ") + ")" });
  }
  if (c.name == "?" && c.args.length == 2) {
    for (const l of i)
      if ("otherwise" in l.flags) {
        c.args.push(l.flags.otherwise);
        break;
      }
  }
  return H0(c);
}
function H0(e) {
  const t = [{ type: "text", value: e.name }];
  for (const r of e.args)
    t.push(r);
  for (const r in e.flags) {
    const n = e.flags[r];
    n === !0 ? t.push({ type: "text", value: "-" + r }) : t.push({ type: "text", value: "-" + r + "=" }, n);
  }
  return t;
}
const ux = {
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
}, sx = {
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
}, q0 = {
  accessor: {
    "": { handler: fx, minArgs: 2, spread: !1 },
    // handler
    ".": dx
  },
  collector: {
    "": Sx,
    // handler
    "++": z0,
    // add, concat, merge
    "++!!": RT
  },
  creator: {
    "": { handler: hx, spread: !1 },
    //applyCreator, // handler
    "^": Wr,
    "~": mx,
    "\\": yx,
    // Single backslash \ escaped
    "@": bx,
    "<>": gx,
    phone: vx,
    address: Ex,
    org: Tx,
    ref: _x,
    currency: Ax,
    email: Ox
  },
  filter: {
    "": Dx,
    // handler
    "&": Mx,
    // !!&
    "|": Lx,
    // !!|
    "|=": Cx,
    // (|= val set) same as (| (= val set))
    "|?": Nx,
    // (|? COND val) same as (| (? COND val))
    "&?": Rx,
    "+?": Jt
    // or maybe &&
  },
  formatter: {
    "": { handler: Bx, minArgs: 1, spread: !1 },
    // handler
    "#": Ln
  },
  unary: {
    "": { handler: jx, minArgs: 1, spread: !1 },
    // handler
    "!": Xx,
    // list-aware; use -l to treat list as one value
    "!!": Qx
    // same as (! (! val))
  },
  joiner: {
    "": { handler: Fx, minArgs: 2, spread: !0 },
    // handler
    "+-": er,
    "+:": er
    // new name
  },
  mapper: {
    "": { handler: kx, minArgs: 2, spread: !0 },
    // handler
    "+": z0,
    // add, prefix, suffix
    "-": xx,
    "%": wx,
    "*": Px,
    "/": Ix,
    ">": Hx,
    "<": qx,
    ">=": Wx,
    "<=": Yx,
    "=": zx,
    "==": Gx,
    "!=": Kx,
    "!==": Vx
  },
  sorter: {
    "": Zx,
    // handlers
    ">>": Jx
  },
  switcher: {
    "": t2,
    // handlers
    "?": Ha,
    "??": Ha,
    // same as ? with no arguments, but can filter several args
    "???": Ha,
    "?:": Ha
  }
}, cx = ["wrap", "aux", "label", "heading", "title"];
let Ud;
const W0 = {};
function Y0(e, t, r) {
  W0[e] ??= lx(e);
  const n = W0[e];
  if (!n) return;
  if (r.length < n.minArgs) return null;
  if ((n.spread && r.length == n.minArgs && !t.l || t.s) && ke(r[r.length - 1])) {
    const o = r.pop();
    r = r.concat(o);
  }
  let a = sx[e] || [];
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
  !t.type && typeof t.as == "string" && (t.type = t.as), t.lang ? t.locale = t.lang : (t.locale || (t.locale = oi(t.locale)), t.lang = BT(t.locale)), t._name = e;
  const i = n.handler(n.fn, t, r);
  return t.r && ke(i) && i.reverse(), i === void 0 ? null : i;
}
function lx(e) {
  for (let t in q0) {
    const r = q0[t];
    if (r.hasOwnProperty(e)) {
      let n = r[""];
      return typeof n == "function" ? n = { handler: n, minArgs: 1, spread: !0 } : Dt(n) && (n = { ...n }), n.fn = r[e], n;
    }
  }
  return !1;
}
function fx(e, t, r) {
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
function dx(e, t) {
  if (Kt(e) && (e = e.toString()), Tr(e))
    return sn(e, t);
  if (ke(e)) {
    const r = {};
    for (const n of e)
      r[n] = sn(n, t);
    return r;
  }
  if (Dt(e)) {
    const r = {};
    for (const n in e)
      r[e[n]] = sn(n, t);
    return r;
  }
}
function hx(e, t, r) {
  if (["~", "phone", "address", "ref", "email"].includes(t._name) && hn(r)) {
    let n = Wr(t, r);
    return t._name === "phone" && (n = n.filter((a) => a[0])), n.map((a) => e(t, a));
  }
  return e(t, r);
}
function Hd(e) {
  return Math.max(...e.map((t) => Array.isArray(t) ? t.length : 1));
}
function Wr(e, t) {
  const r = parseInt(e.sz) || Hd(t);
  let n = e.dv ?? null;
  n !== null && (n = yr(n, Io(n)));
  const a = [];
  for (const i of t)
    Array.isArray(i) ? r > i.length ? a.push([...i, ...Array(r - i.length).fill(n)]) : r < i.length ? a.push(i.slice(0, r)) : a.push(i) : a.push(Array(r).fill(i));
  return e.t ? a : px(a);
}
function px(e) {
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
function mx(e, t) {
  return new Yt(e, t);
}
function yx(e, t) {
  return new RegExp(t, e);
}
function bx(e, t) {
  return new l2(e, t);
}
function gx(e, t) {
  return new Ye(e, t);
}
function vx(e, t) {
  return new f2(e, t);
}
function Ex(e, t) {
  return new d2(e, t);
}
function Tx(e, t) {
  return new h2(e, t);
}
function _x(e, t) {
  return new p2(e, t);
}
function Ax(e, t) {
  return new m2(e, t);
}
function Ox(e, t) {
  return new y2(e, t);
}
function Sx(e, t, r) {
  const n = Gn(r);
  return n.length ? e.init !== void 0 ? n.reduce(e, e.init) : n.reduce(e) : "";
}
function xx(e, t) {
  if (Kt(e) && Kt(t)) return e - t;
  if (Tr(e) && Tr(t)) {
    if (e.length >= t.length) {
      if (e.endsWith(t)) return e.slice(0, -t.length);
    } else if (t.startsWith(e)) return t.slice(e.length);
    return e;
  }
  return null;
}
function wx(e, t) {
  return t / e * 100;
}
function Px(e, t) {
  return e * t;
}
function Ix(e, t) {
  return Kt(e) && Kt(t) ? e / t : e.toString().split(t.toString());
}
function z0(e, t) {
  return e + t;
}
function Cx(e) {
  const [t, r] = e;
  return t && r && r instanceof Yt ? r.contains(t) : !1;
}
function Nx(e, t) {
}
function Rx(e, t) {
}
function er(e, t) {
  const r = t[0]?.toString();
  let n = t.slice(1);
  if (n = Gn(n), Tr(r))
    return n.filter((i) => !Du(i)).join(r);
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
  return e.every((t) => !Du(t)) ? er({}, ["", ...e]) : "";
}
function RT(e, t) {
  return En(t) ? e : e + 1;
}
RT.init = 0;
function Gn(e) {
  return ke(e) ? e.flat(1 / 0) : e == null ? [] : typeof e == "object" ? Object.values(e).flat(1 / 0) : [e];
}
function Dx(e, t, r) {
  if (!hn(r))
    return e(r);
  const n = Wr({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(n[i]));
  return a;
}
function Mx(e) {
  for (let t = 0; t < e.length; t++)
    if (En(e[t])) return e[t];
  return e[e.length - 1];
}
function Lx(e) {
  for (let t = 0; t < e.length; t++)
    if (!En(e[t]))
      return e[t];
  return null;
}
function kx(e, t, r) {
  const n = r[0], a = r.slice(1);
  let i;
  return /*config.stepIn[0] &&*/ Array.isArray(n) ? i = n.map((o) => G0(e, o, a)) : i = G0(e, n, a), i;
}
function Bx(e, t, r) {
  if (r.length === 1)
    return e({ ...t }, r[0]);
  const n = (i) => i.length == 1 ? e({ ...t }, i[0]) : i.map((o) => e({ ...t }, o));
  return hn(r) ? Wr({}, r).map((i) => n(i)) : n(r);
}
function jx(e, t, r) {
  const n = r[0];
  return t.l ? e({ ...t }, n) : Array.isArray(n) ? n.map((a) => e({ ...t }, a)) : e({ ...t }, n);
}
function Fx(e, t, r) {
  if (!hn(r))
    return e(t, r);
  const n = Wr({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(t, n[i]));
  return a;
}
function G0(e, t, r) {
  return r.length == 1 && !ke(r[0]) ? e(t, r[0]) : (r.length == 1 && ke(r[0]) && (r = r[0]), r.map((n) => Array.isArray(n) ? n.map((a) => e(t, a)) : e(t, n)));
}
function $x(e, t) {
  if (!e) return [];
  if (e = Array.isArray(e) ? e : e.split("|"), Tr(t) && (t = t.split(",")), !r2(t))
    return e;
  const r = [];
  for (const n of t)
    r.push(e[n]);
  return r;
}
function Ln(e, t) {
  if (e.type ??= Io(t, e), e.row ? (t = $x(t, e.row), e.type = "list") : t = yr(t, e.type, e), t === null) return "";
  const r = e.json ? "json" : e.type, n = { ...e };
  cx.forEach((i) => {
    delete n[i];
  });
  const a = { ...n, [e.type]: e[e.type] };
  return t = Ux(r, a, t), e.title && Tr(t) && (t = kT(t, e.locale)), e.aux && (ke(t) && (t = t.join(e.sep || ", ")), t = _p(e, t)), e.label && (ke(t) && (t = t.join(e.sep || ", ")), e.label === !0 && (e.label = e._params[0]), t = c2(e, t)), e.heading && (ke(t) && (t = t.join(e.sep || ", ")), e.heading === !0 && (e.heading = e._params[0]), t = s2(e, t)), e.wrap && (Du(t) ? t = "" : (e.wrap === !0 && (e.wrap = "()"), t = e.wrap[0] + t + e.wrap[1])), t;
}
function Ux(e, t, r) {
  switch (e) {
    case "null":
      return "";
    case "entity":
      return r.format(t);
    case "date":
      return a2(t, r);
    case "number":
      return i2(t, r);
    case "text":
    case "string":
      return o2(t, r);
    case "object":
      return LT(t, r);
    case "json":
      return JSON.stringify(r);
    case "list":
      return MT(t, r);
    case "boolean":
      return r ? "1" : "0";
    default:
      return r ? r?.toString() || "" : (console.warn(`Cannot format type: ${t.type} for the value ${r}`), "");
  }
}
function Hx(e, t) {
  return e > t;
}
function qx(e, t) {
  return e < t;
}
function Wx(e, t) {
  return e >= t;
}
function Yx(e, t) {
  return e <= t;
}
function zx(e, t) {
  return e == t;
}
function Gx(e, t) {
  return e === t;
}
function Kx(e, t) {
  return e != t;
}
function Vx(e, t) {
  return e !== t;
}
function Xx(e, t) {
  return En(t);
}
function Qx(e, t) {
  return !En(t);
}
function Zx(e, t, r) {
  if (!hn(r))
    return e(t, r);
  const n = Wr({}, r), a = [];
  for (let i = 0; i < n.length; i++)
    a.push(e(t, n[i]));
  return a;
}
function Jx(e, t) {
  const r = e.date ? e2 : DT, n = e.desc ? -1 : 1;
  return t.sort((a, i) => n * r(e, a, i));
}
function Po(e, t) {
  if (t.by && Dt(e) && !ke(e)) {
    const r = e[t.by];
    return r !== void 0 ? r : K0(e);
  }
  return K0(e);
}
function e2(e, t, r) {
  let n = Po(t, e), a = Po(r, e);
  return pn(n) && pn(a) ? yr(n, "date").getTime() - yr(a, "date").getTime() : DT(e, t, r);
}
function DT(e, t, r) {
  let n = Po(t, e), a = Po(r, e);
  const i = Kt(n), o = Kt(a);
  return i && o ? Number(n) - Number(a) : !i && !o ? (typeof n != "string" && (n = String(n)), typeof a != "string" && (a = String(a)), n.localeCompare(a, e.locale)) : i ? -1 : 1;
}
function K0(e) {
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
function t2(e, t, r) {
  let n = [], a = [];
  if (t._name === "?:")
    n = r, a = r;
  else {
    let i = parseInt(t.cases);
    if (i || (i = { "??": 2, "???": 3 }[t._name] || 1), i >= r.length)
      return null;
    n = r.slice(0, i), a = r.slice(i);
  }
  if (!hn(n) && !hn(a))
    return e(t, n, a);
  {
    const i = Math.max(Hd(n), Hd(a)), o = { sz: i }, u = Wr(o, n), s = Wr(o, a), c = [];
    for (let l = 0; l < i; l++)
      c.push(e(t, u[l], s[l]));
    return c;
  }
}
function Ha(e, t, r) {
  for (let n = 0; n < t.length; n++)
    if (!En(t[n]))
      return r[n];
  return r.length > t.length ? r[t.length] : null;
}
function Du(e) {
  return e == null || e === "" || Number.isNaN(e) ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof st && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function En(e) {
  return !e || e === "0" ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof st && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function sn(e, t) {
  const r = e.split(".");
  let n = t;
  for (let a = 0; a < r.length; a++) {
    let i = r[a];
    if (ke(n) && !Kt(i)) {
      const o = [];
      for (let u of n)
        i = r.slice(a).join("."), o.push(sn(i, u));
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
function r2(e) {
  if (!ke(e) || !e.length) return !1;
  for (const t of e)
    if (!Kt(t)) return !1;
  return !0;
}
function hn(e) {
  for (let t of e)
    if (ke(t)) return !0;
  return !1;
}
function Kt(e) {
  return !isNaN(Number(e));
}
function pn(e) {
  return e ? e instanceof Date ? !0 : typeof e != "string" ? !1 : !isNaN(new Date(e).getTime()) : !1;
}
function n2(e) {
  return pn(e) ? !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(e) : !1;
}
function yr(e, t, r = {}) {
  switch (t) {
    case "boolean":
      return !En(e);
    case "date":
      return pn(e) ? e instanceof Date || r.date === "auto" && n2(e) ? e : new Date(e.replace(/-/g, "/")) : null;
    case "text":
    case "string":
      return Tr(e) ? e : er(Gn(e));
    case "list":
      return ke(e) ? e : Dt(e) ? Gn(e) : null;
    case "object":
      return Dt(e) ? e : null;
    case "number":
      return Kt(e) ? parseFloat(e) : pn(e) ? yr(e, "date").getTime() : 0;
    case "range":
      return e instanceof Yt ? e : ke(e) ? new Yt(r, e) : Dt(e) ? new Yt(r, [e.start, e.end]) : new Yt(r, [e]);
    case "tag":
      return e instanceof Ye ? e : ke(e) ? new Ye(r, [e]) : e instanceof st ? new Ye(r, [[null, e, null]]) : Dt(e) ? new Ye(r, [e]) : new Ye(r, [[null, e, null]]);
  }
  return e;
}
function Io(e, t = {}) {
  if (e instanceof st)
    return "entity";
  if (e instanceof Date)
    return "date";
  const r = typeof e;
  return r == "undefined" || e === null ? "null" : r == "boolean" ? r : ke(e) ? "list" : Kt(e) ? "number" : pn(e) ? "date" : Dt(e) ? "object" : r;
}
function a2(e, t) {
  if (!pn(t))
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
function i2(e, t) {
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
function o2(e, t) {
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
function MT(e, t) {
  const r = [];
  for (let n of t)
    ke(n) ? n = MT(e, n) : Dt(n) && (n = LT(e, n)), Du(n) || r.push(n);
  return r.join(e.sep === void 0 ? " " : e.sep);
}
function LT(e, t) {
  return JSON.stringify(t);
}
function kT(e, t) {
  t = oi(t);
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
function u2(e) {
  Ud = typeof document < "u" && document.documentElement?.getAttribute("lang") || "en";
}
function oi(e = null) {
  return Ud || u2(), e || Ud;
}
function BT(e = null) {
  return oi(e).split("-")[0].toLowerCase();
}
function V0(e) {
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
  }[BT(e)];
}
function _p(e, t) {
  return t ? new Ye(e, [["u-aux", t]]).format() : "";
}
function s2(e, t) {
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
function c2(e, t) {
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
      let c = Ha({}, u, s);
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
class l2 extends st {
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
    const n = Gn(r), a = n[0], i = n[1];
    this.givenStart = a, this.givenEnd = i, this.includeStart = !t.open, this.includeEnd = !t.open, this.flags.type || (this.flags.type = Io(a || i)), this.start = yr(a, "number"), this.end = yr(i, "number");
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
    return t.type === "date" ? (n = n ? Ln(t, n) : V0(t.locale), a = a ? Ln(t, a) : V0(t.locale)) : t.type !== "range" && (n = Ln(t, n || ""), a = Ln(t, a || "")), n || a ? `${n}${r}${a}` : "";
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
class f2 extends st {
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
class d2 extends st {
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
        Ln({ tag: "bold", type: "tag", bold: !0 }, Jt([t, ":"])),
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
class h2 extends st {
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
          ["_self", _p({}, i)]
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
class p2 extends st {
  constructor(t, r) {
    super(t, Gn(r));
  }
  format() {
    const [t, ...r] = this.values, n = er(null, [" - ", ...r]);
    return t ? new Ye({}, [
      [
        "u-ref",
        new Ye({}, [
          ["u-ref-name", t],
          ["_self", _p({}, n)]
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
class m2 extends st {
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
    const { amount: t, currency: r, convertedAmount: n } = this.parsedArgs, a = ux[r.toLowerCase()], o = [["u-amount", a ? new Intl.NumberFormat(`${oi()}-CA`, {
      style: "currency",
      currency: a
    }).format(t) : t]];
    return r && o.push(["u-unit", r]), n && n !== "0" && o.push([
      "u-aux",
      new Intl.NumberFormat(`${oi()}-CA`, {
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
class y2 extends st {
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
const X0 = /^[@]?[\$]?[\/]?[a-zA-Z_][a-zA-Z0-9_\/\.-]*$|^@$|^\?$/, b2 = /^-?\d+(\.\d+)?$/;
class g2 {
  /**
   * Create a loom with given snippets and custom functions.
   *
   * @param {Object|string} snippets - A key-value object, or a string with snippet definitions.
   * @param {Object} functions - A map of custom function names to handlers.
   */
  constructor(t = {}, r = {}) {
    this.snippets = NT(t), this.functions = r;
  }
  /**
   * Sets the template variables.
   *
   * @param {Object|function} variables - A key-value object, or a function that maps a key to a value.
   * @return {void}
   */
  setVariables(t) {
    this.variables = typeof t == "function" ? t : (r) => sn(r, t);
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
    const a = Mn(t, { "{": "}" });
    let i = "";
    for (const o of a)
      if (o.type === "enclosure") {
        let u = o.value.slice(1, -1);
        u.startsWith("{") && u.endsWith("}") && (u = u.slice(1, -1));
        try {
          u = this.evaluateText(u, null, n), typeof u != "string" && (u = Y0("#", { l: !0, sep: ", " }, [u]), Array.isArray(u) && u.every((s) => typeof s == "string") && (u = u.join(", ")));
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
    if (t = t.trim(), r && this.setVariables(r), X0.test(t))
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
    const n = Mn(
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
    const n = Mn(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!n.length) return "";
    const a = ex(n), i = {};
    for (let [o, u] of a.entries())
      typeof o != "string" && (o = this.evaluateExpression(o, r).value), u = this.evaluateExpression(u, r).value, i[o] = u;
    return i;
  }
  parseFunction(t) {
    let r = Mn(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!r.length) return {};
    r = ox(r);
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
    const u = Y0(n, o, i);
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
    return typeof r == "string" ? { label: r } : (r.label ??= kT(t.split("_").join(" ")), r);
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
    return r && r.has(n) ? { value: r.get(n), type: "aux" } : X0.test(n) ? {
      value: this.getVariable(n, r),
      label: this.getVariableMeta(n).label,
      type: "variable"
    } : b2.test(n) ? { value: parseFloat(n), type: "number" } : { value: this.getError(103, "Invalid expression", n), type: "error" };
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
const jT = [
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
jT.sort((e, t) => t.length - e.length);
const v2 = new Set(jT.map((e) => e.join(" ").toUpperCase())), E2 = /* @__PURE__ */ new Set([
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
]), T2 = /* @__PURE__ */ new Set([">=", "<=", "!=", "==", "&&", "||"]), _2 = /* @__PURE__ */ new Set(["+", "-", "*", "/", "%", "=", "<", ">", "!"]), A2 = /[a-zA-Z_@$?]/, O2 = /[a-zA-Z0-9_.\/@]/, Is = /[0-9]/;
function S2(e) {
  return x2(e);
}
function x2(e) {
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
      const o = FT(e, n, a);
      if (o < 0) throw new Error(`Unterminated string starting at ${n}`);
      t.push({ type: "string", value: e.slice(n + 1, o) }), n = o + 1;
      continue;
    }
    if (a === "{") {
      const o = P2(e, n, "{", "}");
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
    if (Is.test(a) || a === "-" && Is.test(e[n + 1] || "") && w2(t)) {
      let o = n + (a === "-" ? 1 : 0);
      for (; o < r && (Is.test(e[o]) || e[o] === "."); ) o++;
      t.push({ type: "number", value: parseFloat(e.slice(n, o)) }), n = o;
      continue;
    }
    const i = e.slice(n, n + 2);
    if (T2.has(i)) {
      t.push({ type: "operator", value: i }), n += 2;
      continue;
    }
    if (_2.has(a)) {
      t.push({ type: "operator", value: a }), n++;
      continue;
    }
    if (A2.test(a)) {
      let o = n + 1;
      for (; o < r && O2.test(e[o]); ) o++;
      const u = e.slice(n, o), s = u.toLowerCase();
      s === "and" ? t.push({ type: "operator", value: "&" }) : s === "or" ? t.push({ type: "operator", value: "|" }) : s === "not" ? t.push({ type: "operator", value: "!" }) : t.push({ type: "word", value: u }), n = o;
      continue;
    }
    t.push({ type: "unknown", value: a }), n++;
  }
  return t;
}
function w2(e) {
  if (e.length === 0) return !0;
  const t = e[e.length - 1];
  return !!(t.type === "operator" || t.type === "lparen" || t.type === "word" && v2.has(t.value.toUpperCase()));
}
function FT(e, t, r) {
  for (let n = t + 1; n < e.length; n++) {
    if (e[n] === "\\" && n + 1 < e.length) {
      n++;
      continue;
    }
    if (e[n] === r) return n;
  }
  return -1;
}
function P2(e, t, r, n) {
  let a = 0;
  for (let i = t; i < e.length; i++) {
    const o = e[i];
    if (o === '"' || o === "'" || o === "`") {
      const u = FT(e, i, o);
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
function I2(e, t, r) {
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
const C2 = /* @__PURE__ */ new Set(["long", "full", "short", "medium"]), N2 = [
  ["for", "each"],
  ["total", "of"],
  ["sum", "of"],
  ["average", "of"],
  ["count", "of"],
  ["show"],
  ["if"]
], qi = [
  ["from", "lowest", "to", "highest"],
  ["from", "highest", "to", "lowest"],
  ["sorted", "by"],
  ["joined", "by"],
  ["with", "label"],
  ["if", "present"],
  ["where"],
  ["as"],
  ["if"]
], R2 = [["then"], ["show"]], D2 = [["otherwise"], ["else"]], M2 = [["else"], ["show"]], L2 = [["in"]], k2 = [["do"]], B2 = [["ascending"]], j2 = [["descending"]];
function St(e, t) {
  return I2(e.tokens, e.i, t);
}
function nt(e, t) {
  e.i += t.length;
}
function F2(e) {
  const t = { tokens: e, i: 0 }, r = Ap(t);
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
function $T(e, t, r) {
  const n = Ge(e);
  if (!n || n.type !== t || r != null) {
    const a = n ? `${n.type}:${n.value}` : "end of input";
    throw new br(`Expected ${t}, got ${a}`);
  }
  return Fe(e);
}
function Ap(e) {
  const t = Ge(e);
  if (!t) return null;
  const r = St(e, N2);
  if (r && !$2(e, r))
    switch (nt(e, r), r.canonical) {
      case "IF":
        return z2(e);
      case "SHOW":
        return Q0(e);
      case "TOTAL OF":
      case "SUM OF":
        return Cs(e, { type: "sum", value: kt(e) });
      case "AVERAGE OF":
        return Cs(e, { type: "average", value: kt(e) });
      case "COUNT OF":
        return Cs(e, G2(e));
      case "FOR EACH":
        return K2(e);
    }
  if (t.type === "word" && U2(e)) {
    const n = H2(e), a = Op(e);
    return a.length > 0 ? { type: "show", value: n, modifiers: a } : n;
  }
  {
    const n = e.i;
    try {
      const a = Sp(e);
      if (a != null && e.i >= e.tokens.length)
        return a;
    } catch {
    }
    e.i = n;
  }
  return Q0(e);
}
function $2(e, t) {
  return e.tokens.length - e.i - t.length <= 0 && t.length === 1;
}
function U2(e) {
  const t = Ge(e, 1);
  if (!t) return !1;
  if (t.type === "string" || t.type === "number" || t.type === "lparen" || t.type === "loom")
    return !0;
  if (t.type === "word") {
    const r = e.i;
    e.i += 1;
    const n = St(e, qi);
    return e.i = r, n == null;
  }
  return !1;
}
function H2(e) {
  const t = Fe(e).value, r = [];
  for (; e.i < e.tokens.length; ) {
    const n = Ge(e);
    if (!n) break;
    if (n.type === "comma") {
      Fe(e);
      continue;
    }
    if (n.type === "rparen" || n.type === "operator" || n.type === "word" && St(e, qi)) break;
    const a = kt(e);
    if (a == null) break;
    r.push(a);
  }
  return { type: "call", name: t, args: r };
}
function Q0(e) {
  const t = q2(e);
  if (t.length === 0) {
    const a = Ge(e), i = a ? `${a.type}:${a.value}` : "end of input";
    throw new br(`Expected a value, got ${i}`);
  }
  const r = Op(e);
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
  return r.length === 0 && W2(n) ? { type: "show", value: n, modifiers: [] } : { type: "show", value: n, modifiers: r };
}
function q2(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const r = Ge(e);
    if (!r) break;
    if (r.type === "comma") {
      Fe(e);
      continue;
    }
    if (r.type === "rparen" || r.type === "operator" || r.type === "word" && St(e, qi)) break;
    const n = kt(e);
    if (n == null) break;
    t.push(n);
  }
  return t;
}
function W2(e) {
  return e.type === "var" || e.type === "string" || e.type === "number" || e.type === "loom" || e.type === "group";
}
function Op(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const r = St(e, qi);
    if (!r) break;
    switch (r.canonical) {
      case "AS": {
        nt(e, r), t.push({ type: "as", format: Y2(e) });
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
        const i = St(e, j2);
        if (i)
          nt(e, i), a = "desc";
        else {
          const o = St(e, B2);
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
        nt(e, r), t.push({ type: "where", condition: Sp(e) });
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
function Y2(e) {
  const t = Ge(e);
  if (t && t.type === "string")
    return Fe(e), { raw: t.value };
  const r = [];
  for (; r.length < 2; ) {
    const i = Ge(e);
    if (!i || i.type !== "word" || St(e, qi)) break;
    r.push(Fe(e).value.toLowerCase());
  }
  if (r.length === 0)
    throw new br("AS requires a format type");
  const n = r[0], a = r[1];
  return a === "date" && C2.has(n) ? { type: "date", value: n } : a === "only" && (n === "year" || n === "month") ? { type: "date", value: n === "year" ? "y" : "m" } : E2.has(n) ? { type: n, value: a ?? null } : (a != null && e.i--, { type: n, value: null });
}
function z2(e) {
  const t = Sp(e), r = St(e, R2);
  r && nt(e, r);
  const n = Z0(e);
  let a = null;
  const i = St(e, D2);
  if (i) {
    nt(e, i);
    const o = St(e, M2);
    o && nt(e, o), a = Z0(e);
  }
  return { type: "if", condition: t, thenBranch: n, elseBranch: a };
}
function Z0(e) {
  return kt(e);
}
function G2(e) {
  return { type: "count", value: kt(e) };
}
function Cs(e, t) {
  const r = Op(e);
  return r.length === 0 ? t : { type: "show", value: t, modifiers: r };
}
function K2(e) {
  const t = Ge(e);
  if (!t || t.type !== "word")
    throw new br("FOR EACH expects an identifier");
  Fe(e);
  const r = St(e, L2);
  r && nt(e, r);
  const n = kt(e), a = St(e, k2);
  a && nt(e, a);
  const i = Ap(e);
  return { type: "forEach", ident: t.value, list: n, body: i };
}
function Sp(e) {
  return UT(e);
}
function UT(e) {
  let t = J0(e);
  for (; ; ) {
    const r = Ge(e);
    if (!r || r.type !== "operator" || r.value !== "|" && r.value !== "||") break;
    Fe(e);
    const n = J0(e);
    t = { type: "binop", op: "|", left: t, right: n };
  }
  return t;
}
function J0(e) {
  let t = qd(e);
  for (; ; ) {
    const r = Ge(e);
    if (!r || r.type !== "operator" || r.value !== "&" && r.value !== "&&") break;
    Fe(e);
    const n = qd(e);
    t = { type: "binop", op: "&", left: t, right: n };
  }
  return t;
}
function qd(e) {
  const t = Ge(e);
  if (t && t.type === "operator" && t.value === "!")
    return Fe(e), { type: "unop", op: "!", arg: qd(e) };
  if (t && t.type === "lparen") {
    Fe(e);
    const r = UT(e);
    return $T(e, "rparen"), { type: "group", inner: r };
  }
  return X2(e);
}
const V2 = /* @__PURE__ */ new Set(["=", "==", "!=", ">", "<", ">=", "<="]);
function X2(e) {
  const t = em(e), r = Ge(e);
  if (r && r.type === "operator" && V2.has(r.value)) {
    Fe(e);
    const n = em(e);
    return { type: "binop", op: r.value === "==" ? "=" : r.value, left: t, right: n };
  }
  return t;
}
function em(e) {
  let t = tm(e);
  for (; ; ) {
    const r = Ge(e);
    if (!r || r.type !== "operator" || r.value !== "+" && r.value !== "-") break;
    Fe(e);
    const n = tm(e);
    t = { type: "binop", op: r.value, left: t, right: n };
  }
  return t;
}
function tm(e) {
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
    const r = Ap(e);
    return $T(e, "rparen"), { type: "group", inner: r };
  }
  return t.type === "loom" ? (Fe(e), { type: "loom", value: t.value }) : t.type === "string" ? (Fe(e), { type: "string", value: t.value }) : t.type === "number" ? (Fe(e), { type: "number", value: t.value }) : t.type === "word" ? (Fe(e), { type: "var", path: t.value }) : null;
}
class HT extends Error {
}
function Q2(e) {
  if (e == null) return "";
  const t = je(e);
  return cw(t);
}
function je(e) {
  switch (e.type) {
    case "loom": {
      const t = uw(e.value);
      return sw(t) ? `(${t})` : t;
    }
    case "var":
      return e.path;
    case "string":
      return Hn(e.value);
    case "number":
      return String(e.value);
    case "group":
      return je(e.inner);
    case "binop":
      return `(${e.op} ${je(e.left)} ${je(e.right)})`;
    case "unop":
      return `(${e.op} ${je(e.arg)})`;
    case "show":
      return J2(e);
    case "if":
      return tw(e);
    case "count":
      return rw(e);
    case "sum":
      return `(++ ${je(e.value)})`;
    case "average": {
      const t = je(e.value);
      return `(/ (++ ${t}) (++!! ${t}))`;
    }
    case "call":
      return Z2(e);
    case "forEach":
      return nw(e);
    default:
      throw new HT(`Unknown node type: ${e.type}`);
  }
}
function Z2(e) {
  if (e.args.length === 0) return e.name;
  const t = e.args.map(je).join(" ");
  return `(${e.name} ${t})`;
}
function J2(e) {
  if (e.values)
    return ew(e);
  const t = Co(e.value), r = e.modifiers.some((u) => u.type === "sortedBy");
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
      const s = e.modifiers[u], c = Co(o.value), l = je(kn(s.condition, c));
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
        a = `(? ${je(kn(s.condition, t))} ${a})`;
        break;
      }
      case "sortedBy": {
        const c = iw(s.value);
        a = `(>> ${s.order === "desc" ? "-desc " : ""}-by=${c} ${a})`, n && (a = `(. ${Hn(n)} ${a})`, n = null);
        break;
      }
      case "joinedBy":
        a = `(+: ${Hn(s.sep)} ${a})`;
        break;
      case "as":
        a = `(# ${ow(s.format)} ${a})`;
        break;
      case "withLabel": {
        a = `(# -label${s.label != null ? `=${Hn(s.label)}` : ""} ${a})`;
        break;
      }
      default:
        throw new HT(`Unknown modifier type: ${s.type}`);
    }
  }
  return a;
}
function ew(e) {
  const t = e.values.map(je);
  if (e.modifiers.some((i) => i.type === "ifPresent"))
    return `(+? ${t.join(" ")})`;
  const n = e.modifiers.find((i) => i.type === "joinedBy"), a = n ? n.sep : "";
  return `(+: ${Hn(a)} ${t.join(" ")})`;
}
function tw(e) {
  const t = je(e.condition), r = je(e.thenBranch);
  return e.elseBranch != null ? `(? ${t} ${r} ${je(e.elseBranch)})` : `(? ${t} ${r})`;
}
function rw(e) {
  return `(++!! ${je(e.value)})`;
}
function Co(e) {
  if (e == null) return null;
  if (e.type === "var") {
    const t = e.path.split(".");
    return t.length > 1 ? t.slice(0, -1).join(".") : e.path;
  }
  return e.type === "group" ? Co(e.inner) : e.type === "count" || e.type === "sum" || e.type === "average" ? Co(e.value) : null;
}
function kn(e, t) {
  if (e == null || !t) return e;
  switch (e.type) {
    case "var": {
      const r = e.path;
      return r.startsWith(t + ".") || r === t || r.includes(".") || r === "true" || r === "false" || r === "null" || r.startsWith("@") || r.startsWith("$") ? e : { type: "var", path: `${t}.${r}` };
    }
    case "binop":
      return {
        ...e,
        left: kn(e.left, t),
        right: kn(e.right, t)
      };
    case "unop":
      return { ...e, arg: kn(e.arg, t) };
    case "group":
      return { ...e, inner: kn(e.inner, t) };
    default:
      return e;
  }
}
function nw(e) {
  const t = je(e.list), r = je(e.body).replace(
    new RegExp(`\\b${aw(e.ident)}\\b`, "g"),
    "$1"
  );
  return `(map ${t} ${Hn(r)})`;
}
function aw(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function iw(e) {
  if (e.type === "var") {
    const t = e.path.split(".");
    return t[t.length - 1];
  }
  return e.type === "string" ? e.value : je(e);
}
function ow(e) {
  if (e.raw != null) {
    const t = e.raw;
    return t.startsWith("-") ? t : `-${t}`;
  }
  return e.value != null ? `-${e.type}=${e.value}` : `-${e.type}`;
}
function Hn(e) {
  return typeof e != "string" && (e = String(e)), e.includes("'") ? e.includes('"') ? `'${e.replace(/'/g, "\\'")}'` : `"${e}"` : `'${e}'`;
}
function uw(e) {
  return e.length >= 2 && e[0] === "{" && e[e.length - 1] === "}" ? e.slice(1, -1) : e;
}
function sw(e) {
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
function cw(e) {
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
class qT {
  /**
   * @param {Object|string} snippets - Same forms as LoomCore accepts
   *   (source string, object, or empty). Bodies written in Plain
   *   syntax are eagerly translated to Compact form at construction
   *   time so the evaluator never sees Plain syntax.
   * @param {Object} functions - Passed through to LoomCore unchanged.
   */
  constructor(t = {}, r = {}) {
    const n = this._prepareSnippets(t);
    this.core = new g2(n, r);
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
    const r = NT(t), n = {};
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
    const r = Mn(t, { "{": "}" });
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
      const r = F2(S2(t));
      return Q2(r);
    } catch {
      return t;
    }
  }
}
function lw(e) {
  if (!Array.isArray(e)) return [[]];
  const t = [[]];
  for (const r of e)
    r.type === "divider" ? t.push([]) : t[t.length - 1].push(r);
  return t;
}
function Dn(e, t, r) {
  if (Array.isArray(e))
    return e.map((a) => Wd(a, t, r));
  if (!e || typeof e != "object") return e;
  const n = e.content;
  return Array.isArray(n) ? {
    ...e,
    content: n.map((a) => Wd(a, t, r))
  } : e;
}
function Wd(e, t, r) {
  if (!e || typeof e != "object") return e;
  const { type: n, content: a, text: i } = e;
  return n === "text" && typeof i == "string" ? {
    ...e,
    text: t.render(i, r)
  } : a && Array.isArray(a) ? {
    ...e,
    content: a.map((o) => Wd(o, t, r))
  } : e;
}
function rm(e, t, r, n) {
  const a = e?.doc ?? e;
  if (!a?.content) return Dn(a, t, r);
  const i = sn(n, r), o = lw(a.content);
  if (!Array.isArray(i) || i.length === 0 || o.length < 2)
    return Dn(a, t, r);
  const u = [];
  if (o[0].length > 0) {
    const l = Dn(
      { type: "doc", content: o[0] },
      t,
      r
    );
    u.push(...l.content || []);
  }
  const c = (o.length >= 3 ? o.slice(1, -1) : [o[1]]).reduce((l, f, h) => (h > 0 && l.push({ type: "divider" }), l.push(...f), l), []);
  for (const l of i) {
    const f = Dn(
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
      const f = Dn(
        { type: "doc", content: l },
        t,
        r
      );
      u.push(...f.content || []);
    }
  }
  return { type: "doc", content: u };
}
function fw(e = {}) {
  const {
    vars: t,
    engine: r = new qT(),
    sourceParam: n = "source",
    whereParam: a = "where"
  } = e;
  if (typeof t != "function")
    throw new Error("createLoomHandlers requires a vars function");
  return {
    content: (i, o) => {
      const u = t(i);
      if (!u) return null;
      const s = o.rawContent?.doc ?? o.rawContent, c = n ? o.properties?.[n] : null;
      if (!c) return Dn(s, r, u);
      const l = a ? o.properties?.[a] : null;
      if (l) {
        const f = sn(c, u);
        if (Array.isArray(f)) {
          const h = f.filter(
            (p) => r.evaluateText(l, { ...u, ...p })
          );
          return rm(s, r, { ...u, [c]: h }, c);
        }
      }
      return rm(s, r, u, c);
    }
  };
}
const dw = [
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
function WT(e, t = {}) {
  return {
    title: t.title ?? e?.config?.name ?? "Academic Metrics",
    creator: t.creator ?? "Uniweb",
    subject: t.subject ?? "Academic metrics report"
  };
}
function hw(e, t = {}) {
  return {
    adapterOptions: WT(e, t)
  };
}
function pw(e, t = {}) {
  return {
    adapterOptions: {
      ...WT(e, t),
      paragraphStyles: t.paragraphStyles ?? dw,
      loadAsset: t.loadAsset
    }
  };
}
const mw = new qT();
function yw(e) {
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
const Yd = {
  defaultLayout: "MetricsLayout",
  props: {},
  handlers: fw({
    engine: mw,
    vars: yw
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
      getOptions: (e, t) => hw(e, t)
    },
    docx: {
      extension: "docx",
      getOptions: (e, t) => pw(e, t)
    }
  }
}, YT = Vt(null), nm = Vt(""), gr = {
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
}, zd = Vt(gr);
function zT() {
  return $t(zd) || gr;
}
function ui(e, t = gr) {
  if (!e) return;
  if (typeof e != "string") return e;
  const r = t && t.colors ? t.colors : gr.colors;
  return Object.prototype.hasOwnProperty.call(r, e) ? am(r[e]) : am(e);
}
function bw(e, t = gr) {
  if (!e) return;
  if (typeof e != "string") return e;
  const r = t && t.fonts ? t.fonts : gr.fonts;
  return Object.prototype.hasOwnProperty.call(r, e) ? r[e] : e;
}
function am(e) {
  return typeof e == "string" && e.startsWith("#") ? e.slice(1) : e;
}
function GT() {
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
function gw(e) {
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
function KT({
  children: e,
  basePath: t = "",
  theme: r,
  store: n
}) {
  const a = Fr(
    () => n || GT(),
    [n]
  ), i = t || "", o = Fr(() => gw(r), [r]);
  return a.wrapWithProviders = (u) => ai(
    nm.Provider,
    { value: i },
    ai(
      zd.Provider,
      { value: o },
      u
    )
  ), /* @__PURE__ */ P(YT.Provider, { value: a, children: /* @__PURE__ */ P(nm.Provider, { value: i, children: /* @__PURE__ */ P(zd.Provider, { value: o, children: e }) }) });
}
function ct(e, t, r, n = {}) {
  const a = $t(YT);
  if (!a) {
    process.env.NODE_ENV !== "production" && console.warn(
      "useDocumentOutput was called outside of a <DocumentProvider>. Document output will not be registered."
    );
    return;
  }
  a.register(e, t, r, n);
}
const vw = /* @__PURE__ */ new Set([
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
function VT(e) {
  return e >= 55296 && e <= 57343;
}
function Ew(e) {
  return e >= 56320 && e <= 57343;
}
function Tw(e, t) {
  return (e - 55296) * 1024 + 9216 + t;
}
function XT(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function QT(e) {
  return e >= 64976 && e <= 65007 || vw.has(e);
}
var U;
(function(e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(U || (U = {}));
const _w = 65536;
class Aw {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = _w, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
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
      if (Ew(r))
        return this.pos++, this._addGap(), Tw(t, r);
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
    return t === S.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, S.LINE_FEED) : t === S.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, VT(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === S.LINE_FEED || t === S.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    XT(t) ? this._err(U.controlCharacterInInputStream) : QT(t) && this._err(U.noncharacterInInputStream);
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
function ZT(e, t) {
  for (let r = e.attrs.length - 1; r >= 0; r--)
    if (e.attrs[r].name === t)
      return e.attrs[r].value;
  return null;
}
const Ow = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ 'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), Sw = /* @__PURE__ */ new Map([
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
function xw(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = Sw.get(e)) !== null && t !== void 0 ? t : e;
}
var Ze;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(Ze || (Ze = {}));
const ww = 32;
var Br;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(Br || (Br = {}));
function Gd(e) {
  return e >= Ze.ZERO && e <= Ze.NINE;
}
function Pw(e) {
  return e >= Ze.UPPER_A && e <= Ze.UPPER_F || e >= Ze.LOWER_A && e <= Ze.LOWER_F;
}
function Iw(e) {
  return e >= Ze.UPPER_A && e <= Ze.UPPER_Z || e >= Ze.LOWER_A && e <= Ze.LOWER_Z || Gd(e);
}
function Cw(e) {
  return e === Ze.EQUALS || Iw(e);
}
var Ve;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(Ve || (Ve = {}));
var dr;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(dr || (dr = {}));
class Nw {
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
    return r >= t.length ? -1 : (t.charCodeAt(r) | ww) === Ze.LOWER_X ? (this.state = Ve.NumericHex, this.consumed += 1, this.stateNumericHex(t, r + 1)) : (this.state = Ve.NumericDecimal, this.stateNumericDecimal(t, r));
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
      if (Gd(a) || Pw(a))
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
      if (Gd(a))
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
    return this.emitCodePoint(xw(this.result), this.consumed), this.errors && (t !== Ze.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
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
      if (this.treeIndex = Rw(n, a, this.treeIndex + Math.max(1, i), o), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === dr.Attribute && // We shouldn't have consumed any characters after the entity,
        (i === 0 || // And there should be no invalid characters.
        Cw(o)) ? 0 : this.emitNotTerminatedNamedEntity();
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
function Rw(e, t, r, n) {
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
var cn;
(function(e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(cn || (cn = {}));
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
const Dw = /* @__PURE__ */ new Map([
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
function Mu(e) {
  var t;
  return (t = Dw.get(e)) !== null && t !== void 0 ? t : d.UNKNOWN;
}
const V = d, Mw = {
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
}, Kd = /* @__PURE__ */ new Set([V.H1, V.H2, V.H3, V.H4, V.H5, V.H6]);
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
function Lw(e) {
  return e >= S.DIGIT_0 && e <= S.DIGIT_9;
}
function qa(e) {
  return e >= S.LATIN_CAPITAL_A && e <= S.LATIN_CAPITAL_Z;
}
function kw(e) {
  return e >= S.LATIN_SMALL_A && e <= S.LATIN_SMALL_Z;
}
function Rr(e) {
  return kw(e) || qa(e);
}
function im(e) {
  return Rr(e) || Lw(e);
}
function no(e) {
  return e + 32;
}
function JT(e) {
  return e === S.SPACE || e === S.LINE_FEED || e === S.TABULATION || e === S.FORM_FEED;
}
function om(e) {
  return JT(e) || e === S.SOLIDUS || e === S.GREATER_THAN_SIGN;
}
function Bw(e) {
  return e === S.NULL ? U.nullCharacterReference : e > 1114111 ? U.characterReferenceOutsideUnicodeRange : VT(e) ? U.surrogateCharacterReference : QT(e) ? U.noncharacterCharacterReference : XT(e) || e === S.CARRIAGE_RETURN ? U.controlCharacterReference : null;
}
class jw {
  constructor(t, r) {
    this.options = t, this.handler = r, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = x.DATA, this.returnState = x.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new Aw(r), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new Nw(Ow, (n, a) => {
      this.preprocessor.pos = this.entityStartPos + a - 1, this._flushCodePointConsumedAsCharacterReference(n);
    }, r.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(U.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (n) => {
        this._err(U.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + n);
      },
      validateNumericCharacterReference: (n) => {
        const a = Bw(n);
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
    if (ZT(n, this.currentAttr.name) === null) {
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
    this.prepareToken(t), t.tagID = Mu(t.tagName), t.type === be.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(U.endTagWithAttributes), t.selfClosing && this._err(U.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
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
    const r = JT(t) ? be.WHITESPACE_CHARACTER : t === S.NULL ? be.NULL_CHARACTER : be.CHARACTER;
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
        r.tagName += String.fromCodePoint(qa(t) ? no(t) : t);
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
    if (this.preprocessor.startsWith(mt.SCRIPT, !1) && om(this.preprocessor.peek(mt.SCRIPT.length))) {
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
    if (this.preprocessor.startsWith(mt.SCRIPT, !1) && om(this.preprocessor.peek(mt.SCRIPT.length))) {
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
        this.currentAttr.name += String.fromCodePoint(qa(t) ? no(t) : t);
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
    if (qa(t))
      this._createDoctypeToken(String.fromCharCode(no(t))), this.state = x.DOCTYPE_NAME;
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
        r.name += String.fromCodePoint(qa(t) ? no(t) : t);
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
    t === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(S.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && im(this.preprocessor.peek(1)) ? x.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    im(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === S.SEMICOLON && this._err(U.unknownNamedCharacterReference), this.state = this.returnState, this._callState(t));
  }
}
const e_ = /* @__PURE__ */ new Set([d.DD, d.DT, d.LI, d.OPTGROUP, d.OPTION, d.P, d.RB, d.RP, d.RT, d.RTC]), um = /* @__PURE__ */ new Set([
  ...e_,
  d.CAPTION,
  d.COLGROUP,
  d.TBODY,
  d.TD,
  d.TFOOT,
  d.TH,
  d.THEAD,
  d.TR
]), No = /* @__PURE__ */ new Set([
  d.APPLET,
  d.CAPTION,
  d.HTML,
  d.MARQUEE,
  d.OBJECT,
  d.TABLE,
  d.TD,
  d.TEMPLATE,
  d.TH
]), Fw = /* @__PURE__ */ new Set([...No, d.OL, d.UL]), $w = /* @__PURE__ */ new Set([...No, d.BUTTON]), sm = /* @__PURE__ */ new Set([d.ANNOTATION_XML, d.MI, d.MN, d.MO, d.MS, d.MTEXT]), cm = /* @__PURE__ */ new Set([d.DESC, d.FOREIGN_OBJECT, d.TITLE]), Uw = /* @__PURE__ */ new Set([d.TR, d.TEMPLATE, d.HTML]), Hw = /* @__PURE__ */ new Set([d.TBODY, d.TFOOT, d.THEAD, d.TEMPLATE, d.HTML]), qw = /* @__PURE__ */ new Set([d.TABLE, d.TEMPLATE, d.HTML]), Ww = /* @__PURE__ */ new Set([d.TD, d.TH]);
class Yw {
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
    this.popUntilPopped(Kd, K.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(Ww, K.HTML);
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
    this.clearBackTo(qw, K.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(Hw, K.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(Uw, K.HTML);
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
          if (cm.has(a))
            return !1;
          break;
        }
        case K.MATHML: {
          if (sm.has(a))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInScope(t) {
    return this.hasInDynamicScope(t, No);
  }
  hasInListItemScope(t) {
    return this.hasInDynamicScope(t, Fw);
  }
  hasInButtonScope(t) {
    return this.hasInDynamicScope(t, $w);
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const r = this.tagIDs[t];
      switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
        case K.HTML: {
          if (Kd.has(r))
            return !0;
          if (No.has(r))
            return !1;
          break;
        }
        case K.SVG: {
          if (cm.has(r))
            return !1;
          break;
        }
        case K.MATHML: {
          if (sm.has(r))
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
    for (; this.currentTagId !== void 0 && e_.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; this.currentTagId !== void 0 && um.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== void 0 && this.currentTagId !== t && um.has(this.currentTagId); )
      this.pop();
  }
}
const Ns = 3;
var Zt;
(function(e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(Zt || (Zt = {}));
const lm = { type: Zt.Marker };
class zw {
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
    if (this.entries.length < Ns)
      return;
    const r = this.treeAdapter.getAttrList(t), n = this._getNoahArkConditionCandidates(t, r);
    if (n.length < Ns)
      return;
    const a = new Map(r.map((o) => [o.name, o.value]));
    let i = 0;
    for (let o = 0; o < n.length; o++) {
      const u = n[o];
      u.attrs.every((s) => a.get(s.name) === s.value) && (i += 1, i >= Ns && this.entries.splice(u.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(lm);
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
    const t = this.entries.indexOf(lm);
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
}, t_ = "html", Gw = "about:legacy-compat", Kw = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", r_ = [
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
], Vw = [
  ...r_,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], Xw = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), n_ = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], Qw = [
  ...n_,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function fm(e, t) {
  return t.some((r) => e.startsWith(r));
}
function Zw(e) {
  return e.name === t_ && e.publicId === null && (e.systemId === null || e.systemId === Gw);
}
function Jw(e) {
  if (e.name !== t_)
    return Nt.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === Kw)
    return Nt.QUIRKS;
  let { publicId: r } = e;
  if (r !== null) {
    if (r = r.toLowerCase(), Xw.has(r))
      return Nt.QUIRKS;
    let n = t === null ? Vw : r_;
    if (fm(r, n))
      return Nt.QUIRKS;
    if (n = t === null ? n_ : Qw, fm(r, n))
      return Nt.LIMITED_QUIRKS;
  }
  return Nt.NO_QUIRKS;
}
const dm = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, eP = "definitionurl", tP = "definitionURL", rP = new Map([
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
].map((e) => [e.toLowerCase(), e])), nP = /* @__PURE__ */ new Map([
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
]), aP = new Map([
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
].map((e) => [e.toLowerCase(), e])), iP = /* @__PURE__ */ new Set([
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
function oP(e) {
  const t = e.tagID;
  return t === d.FONT && e.attrs.some(({ name: n }) => n === cn.COLOR || n === cn.SIZE || n === cn.FACE) || iP.has(t);
}
function a_(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === eP) {
      e.attrs[t].name = tP;
      break;
    }
}
function i_(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = rP.get(e.attrs[t].name);
    r != null && (e.attrs[t].name = r);
  }
}
function xp(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const r = nP.get(e.attrs[t].name);
    r && (e.attrs[t].prefix = r.prefix, e.attrs[t].name = r.name, e.attrs[t].namespace = r.namespace);
  }
}
function uP(e) {
  const t = aP.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = Mu(e.tagName));
}
function sP(e, t) {
  return t === K.MATHML && (e === d.MI || e === d.MO || e === d.MN || e === d.MS || e === d.MTEXT);
}
function cP(e, t, r) {
  if (t === K.MATHML && e === d.ANNOTATION_XML) {
    for (let n = 0; n < r.length; n++)
      if (r[n].name === cn.ENCODING) {
        const a = r[n].value.toLowerCase();
        return a === dm.TEXT_HTML || a === dm.APPLICATION_XML;
      }
  }
  return t === K.SVG && (e === d.FOREIGN_OBJECT || e === d.DESC || e === d.TITLE);
}
function lP(e, t, r, n) {
  return (!n || n === K.HTML) && cP(e, t, r) || (!n || n === K.MATHML) && sP(e, t);
}
const fP = "hidden", dP = 8, hP = 3;
var w;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(w || (w = {}));
const pP = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, o_ = /* @__PURE__ */ new Set([d.TABLE, d.TBODY, d.TFOOT, d.THEAD, d.TR]), hm = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: Dr,
  onParseError: null
};
class mP {
  constructor(t, r, n = null, a = null) {
    this.fragmentContext = n, this.scriptHandler = a, this.currentToken = null, this.stopped = !1, this.insertionMode = w.INITIAL, this.originalInsertionMode = w.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...hm,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = r ?? this.treeAdapter.createDocument(), this.tokenizer = new jw(this.options, this), this.activeFormattingElements = new zw(this.treeAdapter), this.fragmentContextID = n ? Mu(this.treeAdapter.getTagName(n)) : d.UNKNOWN, this._setContextModes(n ?? this.document, this.fragmentContextID), this.openElements = new Yw(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, r) {
    const n = new this(r);
    return n.tokenizer.write(t, !0), n.document;
  }
  static getFragmentParser(t, r) {
    const n = {
      ...hm,
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
    const i = (a = t.location) !== null && a !== void 0 ? a : pP, o = {
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
    return lP(t, a, i, n);
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
    return o_.has(t);
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
    return Mw[n].has(r);
  }
  /** @internal */
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      YI(this, t);
      return;
    }
    switch (this.insertionMode) {
      case w.INITIAL: {
        Ia(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        Ga(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Ka(this, t);
        break;
      }
      case w.IN_HEAD: {
        Va(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        Xa(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        Qa(this, t);
        break;
      }
      case w.IN_BODY:
      case w.IN_CAPTION:
      case w.IN_CELL:
      case w.IN_TEMPLATE: {
        s_(this, t);
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
        Rs(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        p_(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        Ro(this, t);
        break;
      }
      case w.AFTER_BODY: {
        Do(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        xo(this, t);
        break;
      }
    }
  }
  /** @internal */
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      WI(this, t);
      return;
    }
    switch (this.insertionMode) {
      case w.INITIAL: {
        Ia(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        Ga(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Ka(this, t);
        break;
      }
      case w.IN_HEAD: {
        Va(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        Xa(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        Qa(this, t);
        break;
      }
      case w.TEXT: {
        this._insertCharacters(t);
        break;
      }
      case w.IN_TABLE:
      case w.IN_TABLE_BODY:
      case w.IN_ROW: {
        Rs(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        Ro(this, t);
        break;
      }
      case w.AFTER_BODY: {
        Do(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        xo(this, t);
        break;
      }
    }
  }
  /** @internal */
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Vd(this, t);
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
        Vd(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Ca(this, t);
        break;
      }
      case w.AFTER_BODY: {
        _P(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY:
      case w.AFTER_AFTER_FRAMESET: {
        AP(this, t);
        break;
      }
    }
  }
  /** @internal */
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case w.INITIAL: {
        OP(this, t);
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
        Ca(this, t);
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
    this.shouldProcessStartTagTokenInForeignContent(t) ? zI(this, t) : this._startTagOutsideForeignContent(t);
  }
  /** @protected */
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        Ia(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        SP(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        wP(this, t);
        break;
      }
      case w.IN_HEAD: {
        Xt(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        CP(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        RP(this, t);
        break;
      }
      case w.IN_BODY: {
        lt(this, t);
        break;
      }
      case w.IN_TABLE: {
        Kn(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Ca(this, t);
        break;
      }
      case w.IN_CAPTION: {
        PI(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        Ip(this, t);
        break;
      }
      case w.IN_TABLE_BODY: {
        Bu(this, t);
        break;
      }
      case w.IN_ROW: {
        ju(this, t);
        break;
      }
      case w.IN_CELL: {
        NI(this, t);
        break;
      }
      case w.IN_SELECT: {
        b_(this, t);
        break;
      }
      case w.IN_SELECT_IN_TABLE: {
        DI(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        LI(this, t);
        break;
      }
      case w.AFTER_BODY: {
        BI(this, t);
        break;
      }
      case w.IN_FRAMESET: {
        jI(this, t);
        break;
      }
      case w.AFTER_FRAMESET: {
        $I(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        HI(this, t);
        break;
      }
      case w.AFTER_AFTER_FRAMESET: {
        qI(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? GI(this, t) : this._endTagOutsideForeignContent(t);
  }
  /** @protected */
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        Ia(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        xP(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        PP(this, t);
        break;
      }
      case w.IN_HEAD: {
        IP(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        NP(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        DP(this, t);
        break;
      }
      case w.IN_BODY: {
        ku(this, t);
        break;
      }
      case w.TEXT: {
        gI(this, t);
        break;
      }
      case w.IN_TABLE: {
        si(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Ca(this, t);
        break;
      }
      case w.IN_CAPTION: {
        II(this, t);
        break;
      }
      case w.IN_COLUMN_GROUP: {
        CI(this, t);
        break;
      }
      case w.IN_TABLE_BODY: {
        Xd(this, t);
        break;
      }
      case w.IN_ROW: {
        y_(this, t);
        break;
      }
      case w.IN_CELL: {
        RI(this, t);
        break;
      }
      case w.IN_SELECT: {
        g_(this, t);
        break;
      }
      case w.IN_SELECT_IN_TABLE: {
        MI(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        kI(this, t);
        break;
      }
      case w.AFTER_BODY: {
        E_(this, t);
        break;
      }
      case w.IN_FRAMESET: {
        FI(this, t);
        break;
      }
      case w.AFTER_FRAMESET: {
        UI(this, t);
        break;
      }
      case w.AFTER_AFTER_BODY: {
        xo(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEof(t) {
    switch (this.insertionMode) {
      case w.INITIAL: {
        Ia(this, t);
        break;
      }
      case w.BEFORE_HTML: {
        Ga(this, t);
        break;
      }
      case w.BEFORE_HEAD: {
        Ka(this, t);
        break;
      }
      case w.IN_HEAD: {
        Va(this, t);
        break;
      }
      case w.IN_HEAD_NO_SCRIPT: {
        Xa(this, t);
        break;
      }
      case w.AFTER_HEAD: {
        Qa(this, t);
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
        d_(this, t);
        break;
      }
      case w.TEXT: {
        vI(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        Ca(this, t);
        break;
      }
      case w.IN_TEMPLATE: {
        v_(this, t);
        break;
      }
      case w.AFTER_BODY:
      case w.IN_FRAMESET:
      case w.AFTER_FRAMESET:
      case w.AFTER_AFTER_BODY:
      case w.AFTER_AFTER_FRAMESET: {
        Pp(this, t);
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
        u_(this, t);
        break;
      }
      case w.IN_TABLE:
      case w.IN_TABLE_BODY:
      case w.IN_ROW: {
        Rs(this, t);
        break;
      }
      case w.IN_TABLE_TEXT: {
        h_(this, t);
        break;
      }
    }
  }
}
function yP(e, t) {
  let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return r ? e.openElements.contains(r.element) ? e.openElements.hasInScope(t.tagID) || (r = null) : (e.activeFormattingElements.removeEntry(r), r = null) : f_(e, t), r;
}
function bP(e, t) {
  let r = null, n = e.openElements.stackTop;
  for (; n >= 0; n--) {
    const a = e.openElements.items[n];
    if (a === t.element)
      break;
    e._isSpecialElement(a, e.openElements.tagIDs[n]) && (r = a);
  }
  return r || (e.openElements.shortenToLength(Math.max(n, 0)), e.activeFormattingElements.removeEntry(t)), r;
}
function gP(e, t, r) {
  let n = t, a = e.openElements.getCommonAncestor(t);
  for (let i = 0, o = a; o !== r; i++, o = a) {
    a = e.openElements.getCommonAncestor(o);
    const u = e.activeFormattingElements.getElementEntry(o), s = u && i >= hP;
    !u || s ? (s && e.activeFormattingElements.removeEntry(u), e.openElements.remove(o)) : (o = vP(e, u), n === t && (e.activeFormattingElements.bookmark = u), e.treeAdapter.detachNode(n), e.treeAdapter.appendChild(o, n), n = o);
  }
  return n;
}
function vP(e, t) {
  const r = e.treeAdapter.getNamespaceURI(t.element), n = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs);
  return e.openElements.replace(t.element, n), t.element = n, n;
}
function EP(e, t, r) {
  const n = e.treeAdapter.getTagName(t), a = Mu(n);
  if (e._isElementCausesFosterParenting(a))
    e._fosterParentElement(r);
  else {
    const i = e.treeAdapter.getNamespaceURI(t);
    a === d.TEMPLATE && i === K.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, r);
  }
}
function TP(e, t, r) {
  const n = e.treeAdapter.getNamespaceURI(r.element), { token: a } = r, i = e.treeAdapter.createElement(a.tagName, n, a.attrs);
  e._adoptNodes(t, i), e.treeAdapter.appendChild(t, i), e.activeFormattingElements.insertElementAfterBookmark(i, a), e.activeFormattingElements.removeEntry(r), e.openElements.remove(r.element), e.openElements.insertAfter(t, i, a.tagID);
}
function wp(e, t) {
  for (let r = 0; r < dP; r++) {
    const n = yP(e, t);
    if (!n)
      break;
    const a = bP(e, n);
    if (!a)
      break;
    e.activeFormattingElements.bookmark = n;
    const i = gP(e, a, n.element), o = e.openElements.getCommonAncestor(n.element);
    e.treeAdapter.detachNode(i), o && EP(e, o, i), TP(e, a, n);
  }
}
function Vd(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function _P(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function AP(e, t) {
  e._appendCommentNode(t, e.document);
}
function Pp(e, t) {
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
function OP(e, t) {
  e._setDocumentType(t);
  const r = t.forceQuirks ? Nt.QUIRKS : Jw(t);
  Zw(t) || e._err(t, U.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, r), e.insertionMode = w.BEFORE_HTML;
}
function Ia(e, t) {
  e._err(t, U.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, Nt.QUIRKS), e.insertionMode = w.BEFORE_HTML, e._processToken(t);
}
function SP(e, t) {
  t.tagID === d.HTML ? (e._insertElement(t, K.HTML), e.insertionMode = w.BEFORE_HEAD) : Ga(e, t);
}
function xP(e, t) {
  const r = t.tagID;
  (r === d.HTML || r === d.HEAD || r === d.BODY || r === d.BR) && Ga(e, t);
}
function Ga(e, t) {
  e._insertFakeRootElement(), e.insertionMode = w.BEFORE_HEAD, e._processToken(t);
}
function wP(e, t) {
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
      Ka(e, t);
  }
}
function PP(e, t) {
  const r = t.tagID;
  r === d.HEAD || r === d.BODY || r === d.HTML || r === d.BR ? Ka(e, t) : e._err(t, U.endTagWithoutMatchingOpenElement);
}
function Ka(e, t) {
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
      Va(e, t);
  }
}
function IP(e, t) {
  switch (t.tagID) {
    case d.HEAD: {
      e.openElements.pop(), e.insertionMode = w.AFTER_HEAD;
      break;
    }
    case d.BODY:
    case d.BR:
    case d.HTML: {
      Va(e, t);
      break;
    }
    case d.TEMPLATE: {
      Tn(e, t);
      break;
    }
    default:
      e._err(t, U.endTagWithoutMatchingOpenElement);
  }
}
function Tn(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== d.TEMPLATE && e._err(t, U.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(d.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, U.endTagWithoutMatchingOpenElement);
}
function Va(e, t) {
  e.openElements.pop(), e.insertionMode = w.AFTER_HEAD, e._processToken(t);
}
function CP(e, t) {
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
      Xa(e, t);
  }
}
function NP(e, t) {
  switch (t.tagID) {
    case d.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = w.IN_HEAD;
      break;
    }
    case d.BR: {
      Xa(e, t);
      break;
    }
    default:
      e._err(t, U.endTagWithoutMatchingOpenElement);
  }
}
function Xa(e, t) {
  const r = t.type === be.EOF ? U.openElementsLeftAfterEof : U.disallowedContentInNoscriptInHead;
  e._err(t, r), e.openElements.pop(), e.insertionMode = w.IN_HEAD, e._processToken(t);
}
function RP(e, t) {
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
      Qa(e, t);
  }
}
function DP(e, t) {
  switch (t.tagID) {
    case d.BODY:
    case d.HTML:
    case d.BR: {
      Qa(e, t);
      break;
    }
    case d.TEMPLATE: {
      Tn(e, t);
      break;
    }
    default:
      e._err(t, U.endTagWithoutMatchingOpenElement);
  }
}
function Qa(e, t) {
  e._insertFakeElement(L.BODY, d.BODY), e.insertionMode = w.IN_BODY, Lu(e, t);
}
function Lu(e, t) {
  switch (t.type) {
    case be.CHARACTER: {
      s_(e, t);
      break;
    }
    case be.WHITESPACE_CHARACTER: {
      u_(e, t);
      break;
    }
    case be.COMMENT: {
      Vd(e, t);
      break;
    }
    case be.START_TAG: {
      lt(e, t);
      break;
    }
    case be.END_TAG: {
      ku(e, t);
      break;
    }
    case be.EOF: {
      d_(e, t);
      break;
    }
  }
}
function u_(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function s_(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function MP(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function LP(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  r && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(r, t.attrs));
}
function kP(e, t) {
  const r = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && r && (e.treeAdapter.detachNode(r), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_FRAMESET);
}
function BP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML);
}
function jP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && Kd.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, K.HTML);
}
function FP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function $P(e, t) {
  const r = e.openElements.tmplCount > 0;
  (!e.formElement || r) && (e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML), r || (e.formElement = e.openElements.current));
}
function UP(e, t) {
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
function HP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML), e.tokenizer.state = bt.PLAINTEXT;
}
function qP(e, t) {
  e.openElements.hasInScope(d.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML), e.framesetOk = !1;
}
function WP(e, t) {
  const r = e.activeFormattingElements.getElementEntryInScopeWithTagName(L.A);
  r && (wp(e, t), e.openElements.remove(r.element), e.activeFormattingElements.removeEntry(r)), e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function YP(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function zP(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(d.NOBR) && (wp(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, K.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function GP(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function KP(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== Nt.QUIRKS && e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._insertElement(t, K.HTML), e.framesetOk = !1, e.insertionMode = w.IN_TABLE;
}
function c_(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, K.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function l_(e) {
  const t = ZT(e, cn.TYPE);
  return t != null && t.toLowerCase() === fP;
}
function VP(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, K.HTML), l_(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function XP(e, t) {
  e._appendElement(t, K.HTML), t.ackSelfClosing = !0;
}
function QP(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._appendElement(t, K.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function ZP(e, t) {
  t.tagName = L.IMG, t.tagID = d.IMG, c_(e, t);
}
function JP(e, t) {
  e._insertElement(t, K.HTML), e.skipNextNewLine = !0, e.tokenizer.state = bt.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = w.TEXT;
}
function eI(e, t) {
  e.openElements.hasInButtonScope(d.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, bt.RAWTEXT);
}
function tI(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, bt.RAWTEXT);
}
function pm(e, t) {
  e._switchToTextParsing(t, bt.RAWTEXT);
}
function rI(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === w.IN_TABLE || e.insertionMode === w.IN_CAPTION || e.insertionMode === w.IN_TABLE_BODY || e.insertionMode === w.IN_ROW || e.insertionMode === w.IN_CELL ? w.IN_SELECT_IN_TABLE : w.IN_SELECT;
}
function nI(e, t) {
  e.openElements.currentTagId === d.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, K.HTML);
}
function aI(e, t) {
  e.openElements.hasInScope(d.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, K.HTML);
}
function iI(e, t) {
  e.openElements.hasInScope(d.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(d.RTC), e._insertElement(t, K.HTML);
}
function oI(e, t) {
  e._reconstructActiveFormattingElements(), a_(t), xp(t), t.selfClosing ? e._appendElement(t, K.MATHML) : e._insertElement(t, K.MATHML), t.ackSelfClosing = !0;
}
function uI(e, t) {
  e._reconstructActiveFormattingElements(), i_(t), xp(t), t.selfClosing ? e._appendElement(t, K.SVG) : e._insertElement(t, K.SVG), t.ackSelfClosing = !0;
}
function mm(e, t) {
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
      YP(e, t);
      break;
    }
    case d.A: {
      WP(e, t);
      break;
    }
    case d.H1:
    case d.H2:
    case d.H3:
    case d.H4:
    case d.H5:
    case d.H6: {
      jP(e, t);
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
      BP(e, t);
      break;
    }
    case d.LI:
    case d.DD:
    case d.DT: {
      UP(e, t);
      break;
    }
    case d.BR:
    case d.IMG:
    case d.WBR:
    case d.AREA:
    case d.EMBED:
    case d.KEYGEN: {
      c_(e, t);
      break;
    }
    case d.HR: {
      QP(e, t);
      break;
    }
    case d.RB:
    case d.RTC: {
      aI(e, t);
      break;
    }
    case d.RT:
    case d.RP: {
      iI(e, t);
      break;
    }
    case d.PRE:
    case d.LISTING: {
      FP(e, t);
      break;
    }
    case d.XMP: {
      eI(e, t);
      break;
    }
    case d.SVG: {
      uI(e, t);
      break;
    }
    case d.HTML: {
      MP(e, t);
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
      LP(e, t);
      break;
    }
    case d.FORM: {
      $P(e, t);
      break;
    }
    case d.NOBR: {
      zP(e, t);
      break;
    }
    case d.MATH: {
      oI(e, t);
      break;
    }
    case d.TABLE: {
      KP(e, t);
      break;
    }
    case d.INPUT: {
      VP(e, t);
      break;
    }
    case d.PARAM:
    case d.TRACK:
    case d.SOURCE: {
      XP(e, t);
      break;
    }
    case d.IMAGE: {
      ZP(e, t);
      break;
    }
    case d.BUTTON: {
      qP(e, t);
      break;
    }
    case d.APPLET:
    case d.OBJECT:
    case d.MARQUEE: {
      GP(e, t);
      break;
    }
    case d.IFRAME: {
      tI(e, t);
      break;
    }
    case d.SELECT: {
      rI(e, t);
      break;
    }
    case d.OPTION:
    case d.OPTGROUP: {
      nI(e, t);
      break;
    }
    case d.NOEMBED:
    case d.NOFRAMES: {
      pm(e, t);
      break;
    }
    case d.FRAMESET: {
      kP(e, t);
      break;
    }
    case d.TEXTAREA: {
      JP(e, t);
      break;
    }
    case d.NOSCRIPT: {
      e.options.scriptingEnabled ? pm(e, t) : mm(e, t);
      break;
    }
    case d.PLAINTEXT: {
      HP(e, t);
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
      mm(e, t);
  }
}
function sI(e, t) {
  if (e.openElements.hasInScope(d.BODY) && (e.insertionMode = w.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const r = e.openElements.tryPeekProperlyNestedBodyElement();
    r && e._setEndLocation(r, t);
  }
}
function cI(e, t) {
  e.openElements.hasInScope(d.BODY) && (e.insertionMode = w.AFTER_BODY, E_(e, t));
}
function lI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r));
}
function fI(e) {
  const t = e.openElements.tmplCount > 0, { formElement: r } = e;
  t || (e.formElement = null), (r || t) && e.openElements.hasInScope(d.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(d.FORM) : r && e.openElements.remove(r));
}
function dI(e) {
  e.openElements.hasInButtonScope(d.P) || e._insertFakeElement(L.P, d.P), e._closePElement();
}
function hI(e) {
  e.openElements.hasInListItemScope(d.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(d.LI), e.openElements.popUntilTagNamePopped(d.LI));
}
function pI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.popUntilTagNamePopped(r));
}
function mI(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function yI(e, t) {
  const r = t.tagID;
  e.openElements.hasInScope(r) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r), e.activeFormattingElements.clearToLastMarker());
}
function bI(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(L.BR, d.BR), e.openElements.pop(), e.framesetOk = !1;
}
function f_(e, t) {
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
function ku(e, t) {
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
      wp(e, t);
      break;
    }
    case d.P: {
      dI(e);
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
      lI(e, t);
      break;
    }
    case d.LI: {
      hI(e);
      break;
    }
    case d.DD:
    case d.DT: {
      pI(e, t);
      break;
    }
    case d.H1:
    case d.H2:
    case d.H3:
    case d.H4:
    case d.H5:
    case d.H6: {
      mI(e);
      break;
    }
    case d.BR: {
      bI(e);
      break;
    }
    case d.BODY: {
      sI(e, t);
      break;
    }
    case d.HTML: {
      cI(e, t);
      break;
    }
    case d.FORM: {
      fI(e);
      break;
    }
    case d.APPLET:
    case d.OBJECT:
    case d.MARQUEE: {
      yI(e, t);
      break;
    }
    case d.TEMPLATE: {
      Tn(e, t);
      break;
    }
    default:
      f_(e, t);
  }
}
function d_(e, t) {
  e.tmplInsertionModeStack.length > 0 ? v_(e, t) : Pp(e, t);
}
function gI(e, t) {
  var r;
  t.tagID === d.SCRIPT && ((r = e.scriptHandler) === null || r === void 0 || r.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function vI(e, t) {
  e._err(t, U.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function Rs(e, t) {
  if (e.openElements.currentTagId !== void 0 && o_.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = w.IN_TABLE_TEXT, t.type) {
      case be.CHARACTER: {
        p_(e, t);
        break;
      }
      case be.WHITESPACE_CHARACTER: {
        h_(e, t);
        break;
      }
    }
  else
    Wi(e, t);
}
function EI(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_CAPTION;
}
function TI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_COLUMN_GROUP;
}
function _I(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(L.COLGROUP, d.COLGROUP), e.insertionMode = w.IN_COLUMN_GROUP, Ip(e, t);
}
function AI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_TABLE_BODY;
}
function OI(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(L.TBODY, d.TBODY), e.insertionMode = w.IN_TABLE_BODY, Bu(e, t);
}
function SI(e, t) {
  e.openElements.hasInTableScope(d.TABLE) && (e.openElements.popUntilTagNamePopped(d.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function xI(e, t) {
  l_(t) ? e._appendElement(t, K.HTML) : Wi(e, t), t.ackSelfClosing = !0;
}
function wI(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, K.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function Kn(e, t) {
  switch (t.tagID) {
    case d.TD:
    case d.TH:
    case d.TR: {
      OI(e, t);
      break;
    }
    case d.STYLE:
    case d.SCRIPT:
    case d.TEMPLATE: {
      Xt(e, t);
      break;
    }
    case d.COL: {
      _I(e, t);
      break;
    }
    case d.FORM: {
      wI(e, t);
      break;
    }
    case d.TABLE: {
      SI(e, t);
      break;
    }
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      AI(e, t);
      break;
    }
    case d.INPUT: {
      xI(e, t);
      break;
    }
    case d.CAPTION: {
      EI(e, t);
      break;
    }
    case d.COLGROUP: {
      TI(e, t);
      break;
    }
    default:
      Wi(e, t);
  }
}
function si(e, t) {
  switch (t.tagID) {
    case d.TABLE: {
      e.openElements.hasInTableScope(d.TABLE) && (e.openElements.popUntilTagNamePopped(d.TABLE), e._resetInsertionMode());
      break;
    }
    case d.TEMPLATE: {
      Tn(e, t);
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
      Wi(e, t);
  }
}
function Wi(e, t) {
  const r = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, Lu(e, t), e.fosterParentingEnabled = r;
}
function h_(e, t) {
  e.pendingCharacterTokens.push(t);
}
function p_(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function Ca(e, t) {
  let r = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; r < e.pendingCharacterTokens.length; r++)
      Wi(e, e.pendingCharacterTokens[r]);
  else
    for (; r < e.pendingCharacterTokens.length; r++)
      e._insertCharacters(e.pendingCharacterTokens[r]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const m_ = /* @__PURE__ */ new Set([d.CAPTION, d.COL, d.COLGROUP, d.TBODY, d.TD, d.TFOOT, d.TH, d.THEAD, d.TR]);
function PI(e, t) {
  const r = t.tagID;
  m_.has(r) ? e.openElements.hasInTableScope(d.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = w.IN_TABLE, Kn(e, t)) : lt(e, t);
}
function II(e, t) {
  const r = t.tagID;
  switch (r) {
    case d.CAPTION:
    case d.TABLE: {
      e.openElements.hasInTableScope(d.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(d.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = w.IN_TABLE, r === d.TABLE && si(e, t));
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
      ku(e, t);
  }
}
function Ip(e, t) {
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
      Ro(e, t);
  }
}
function CI(e, t) {
  switch (t.tagID) {
    case d.COLGROUP: {
      e.openElements.currentTagId === d.COLGROUP && (e.openElements.pop(), e.insertionMode = w.IN_TABLE);
      break;
    }
    case d.TEMPLATE: {
      Tn(e, t);
      break;
    }
    case d.COL:
      break;
    default:
      Ro(e, t);
  }
}
function Ro(e, t) {
  e.openElements.currentTagId === d.COLGROUP && (e.openElements.pop(), e.insertionMode = w.IN_TABLE, e._processToken(t));
}
function Bu(e, t) {
  switch (t.tagID) {
    case d.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, K.HTML), e.insertionMode = w.IN_ROW;
      break;
    }
    case d.TH:
    case d.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(L.TR, d.TR), e.insertionMode = w.IN_ROW, ju(e, t);
      break;
    }
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE, Kn(e, t));
      break;
    }
    default:
      Kn(e, t);
  }
}
function Xd(e, t) {
  const r = t.tagID;
  switch (t.tagID) {
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      e.openElements.hasInTableScope(r) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE);
      break;
    }
    case d.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE, si(e, t));
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
      si(e, t);
  }
}
function ju(e, t) {
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
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, Bu(e, t));
      break;
    }
    default:
      Kn(e, t);
  }
}
function y_(e, t) {
  switch (t.tagID) {
    case d.TR: {
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY);
      break;
    }
    case d.TABLE: {
      e.openElements.hasInTableScope(d.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, Xd(e, t));
      break;
    }
    case d.TBODY:
    case d.TFOOT:
    case d.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(d.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = w.IN_TABLE_BODY, Xd(e, t));
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
      si(e, t);
  }
}
function NI(e, t) {
  const r = t.tagID;
  m_.has(r) ? (e.openElements.hasInTableScope(d.TD) || e.openElements.hasInTableScope(d.TH)) && (e._closeTableCell(), ju(e, t)) : lt(e, t);
}
function RI(e, t) {
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
      e.openElements.hasInTableScope(r) && (e._closeTableCell(), y_(e, t));
      break;
    }
    case d.BODY:
    case d.CAPTION:
    case d.COL:
    case d.COLGROUP:
    case d.HTML:
      break;
    default:
      ku(e, t);
  }
}
function b_(e, t) {
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
function g_(e, t) {
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
      Tn(e, t);
      break;
    }
  }
}
function DI(e, t) {
  const r = t.tagID;
  r === d.CAPTION || r === d.TABLE || r === d.TBODY || r === d.TFOOT || r === d.THEAD || r === d.TR || r === d.TD || r === d.TH ? (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : b_(e, t);
}
function MI(e, t) {
  const r = t.tagID;
  r === d.CAPTION || r === d.TABLE || r === d.TBODY || r === d.TFOOT || r === d.THEAD || r === d.TR || r === d.TD || r === d.TH ? e.openElements.hasInTableScope(r) && (e.openElements.popUntilTagNamePopped(d.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : g_(e, t);
}
function LI(e, t) {
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
      e.tmplInsertionModeStack[0] = w.IN_TABLE, e.insertionMode = w.IN_TABLE, Kn(e, t);
      break;
    }
    case d.COL: {
      e.tmplInsertionModeStack[0] = w.IN_COLUMN_GROUP, e.insertionMode = w.IN_COLUMN_GROUP, Ip(e, t);
      break;
    }
    case d.TR: {
      e.tmplInsertionModeStack[0] = w.IN_TABLE_BODY, e.insertionMode = w.IN_TABLE_BODY, Bu(e, t);
      break;
    }
    case d.TD:
    case d.TH: {
      e.tmplInsertionModeStack[0] = w.IN_ROW, e.insertionMode = w.IN_ROW, ju(e, t);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = w.IN_BODY, e.insertionMode = w.IN_BODY, lt(e, t);
  }
}
function kI(e, t) {
  t.tagID === d.TEMPLATE && Tn(e, t);
}
function v_(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(d.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : Pp(e, t);
}
function BI(e, t) {
  t.tagID === d.HTML ? lt(e, t) : Do(e, t);
}
function E_(e, t) {
  var r;
  if (t.tagID === d.HTML) {
    if (e.fragmentContext || (e.insertionMode = w.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === d.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const n = e.openElements.items[1];
      n && !(!((r = e.treeAdapter.getNodeSourceCodeLocation(n)) === null || r === void 0) && r.endTag) && e._setEndLocation(n, t);
    }
  } else
    Do(e, t);
}
function Do(e, t) {
  e.insertionMode = w.IN_BODY, Lu(e, t);
}
function jI(e, t) {
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
function FI(e, t) {
  t.tagID === d.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== d.FRAMESET && (e.insertionMode = w.AFTER_FRAMESET));
}
function $I(e, t) {
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
function UI(e, t) {
  t.tagID === d.HTML && (e.insertionMode = w.AFTER_AFTER_FRAMESET);
}
function HI(e, t) {
  t.tagID === d.HTML ? lt(e, t) : xo(e, t);
}
function xo(e, t) {
  e.insertionMode = w.IN_BODY, Lu(e, t);
}
function qI(e, t) {
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
function WI(e, t) {
  t.chars = Me, e._insertCharacters(t);
}
function YI(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function T_(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== K.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function zI(e, t) {
  if (oP(t))
    T_(e), e._startTagOutsideForeignContent(t);
  else {
    const r = e._getAdjustedCurrentElement(), n = e.treeAdapter.getNamespaceURI(r);
    n === K.MATHML ? a_(t) : n === K.SVG && (uP(t), i_(t)), xp(t), t.selfClosing ? e._appendElement(t, n) : e._insertElement(t, n), t.ackSelfClosing = !0;
  }
}
function GI(e, t) {
  if (t.tagID === d.P || t.tagID === d.BR) {
    T_(e), e._endTagOutsideForeignContent(t);
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
function KI(e, t, r) {
  typeof e == "string" && (r = t, t = e, e = null);
  const n = mP.getFragmentParser(e, r);
  return n.tokenizer.write(t, !0), n.getFragment();
}
const VI = () => ({}), Na = () => !0, Nr = (e) => {
  const t = parseInt(e, 10);
  return Number.isFinite(t) ? t : e;
}, XI = (e) => typeof e != "string" ? e : e.split(",").map((t) => t.trim()).filter(Boolean).map((t) => parseInt(t, 10)).filter((t) => Number.isFinite(t)), QI = {
  "data-underline": { path: ["underline"], transform: VI },
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
  "data-smallcaps": { path: ["smallCaps"], transform: Na },
  "data-allcaps": { path: ["allCaps"], transform: Na },
  "data-strike": { path: ["strike"], transform: Na },
  // Row-level: whether the row repeats as a header on each new page
  // when the table breaks. Presence-only — any truthy value counts.
  "data-row-header": { path: ["tableHeader"], transform: Na },
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
    transform: XI
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
  "data-page-break-before": { path: ["pageBreakBefore"], transform: Na },
  // Table of contents options — consumed by the tableOfContents node
  // type in the adapter (src/adapters/docx.js). See docx library's
  // ITableOfContentsOptions for the full shape; these are the three
  // useful ones and any additional data-toc-* attribute falls through
  // to the default rule below.
  "data-toc-title": { path: ["toc", "title"] },
  "data-toc-hyperlink": { path: ["toc", "hyperlink"] },
  "data-toc-heading-range": { path: ["toc", "headingRange"] }
};
function ZI(e, t, r) {
  let n = e;
  for (let a = 0; a < t.length - 1; a++) {
    const i = t[a];
    (!n[i] || typeof n[i] != "object") && (n[i] = {}), n = n[i];
  }
  n[t[t.length - 1]] = r;
}
function JI(e) {
  const t = {};
  for (const { name: r, value: n } of e) {
    if (!r.startsWith("data-") || r === "data-type") continue;
    const a = QI[r];
    if (a) {
      const i = a.transform ? a.transform(n) : n;
      ZI(t, a.path, i);
    } else {
      const i = r.slice(5);
      t[i] = n;
    }
  }
  return t;
}
function eC(e) {
  const t = KI(e);
  return Qd(t);
}
const tC = /* @__PURE__ */ new Set([
  "link",
  "meta",
  "script",
  "style",
  "base",
  "title",
  "noscript"
]);
function rC(e) {
  if (e.nodeName === "#text") {
    const u = e.value;
    return u && u.trim() ? { type: "text", content: u } : null;
  }
  if (!e.tagName) return null;
  const t = e.tagName.toLowerCase();
  if (tC.has(t)) return null;
  const n = nC(e, "data-type") || t;
  if (n === "emptyLine") return null;
  if (n === "contentWrapper")
    return Qd(e);
  const a = JI(e.attrs || []), i = Qd(e), o = { type: n, ...a };
  return n === "text" ? o.content = i.map((u) => u.content || "").join("") : i.length > 0 && (o.children = i), o;
}
function Qd(e) {
  const t = [], r = e.childNodes || [];
  for (const n of r) {
    const a = rC(n);
    a != null && (Array.isArray(a) ? t.push(...a) : t.push(a));
  }
  return t;
}
function nC(e, t) {
  if (!e.attrs) return null;
  for (const r of e.attrs)
    if (r.name === t) return r.value;
  return null;
}
const aC = {
  docx: { load: () => import("./docx-DnyF1rSV.js"), consumes: "docx", ir: !0 },
  xlsx: { load: () => import("./xlsx-BDVpMKis.js"), consumes: "xlsx", ir: !1 },
  typst: { load: () => import("./typst-PfGC6xVw.js"), consumes: "typst", ir: !0 },
  // LaTeX consumes its own input key. Foundations targeting both Typst
  // and LaTeX register under each format separately — same JSX, two
  // useDocumentOutput calls — so the adapters can diverge as the
  // formats need without forcing a shared input shape.
  latex: { load: () => import("./latex-Dd0qmq6E.js"), consumes: "latex", ir: !0 },
  // Paged.js consumes 'html' — an input shape shared with EPUB below.
  // Foundations register once under 'html' and both adapters read it.
  pagedjs: { load: () => import("./pagedjs-C8Aj7-d3.js"), consumes: "html", ir: !1 },
  epub: { load: () => import("./epub-DR8sqWVp.js"), consumes: "html", ir: !1 }
};
function Cp(e) {
  const t = aC[e];
  return t ? {
    load: t.load,
    consumes: t.consumes || e,
    ir: t.ir !== !1
    // default to true for safety on under-specified entries
  } : null;
}
async function iC(e, t, r = {}) {
  const n = Cp(e);
  if (!n)
    throw new Error(`Unsupported document format: "${e}"`);
  const a = await n.load(), i = a.compileDocx || a.compileXlsx || a.compileTypst || a.compileLatex || a.compilePagedjs || a.compileEpub || a.compilePdf;
  if (!i)
    throw new Error(
      `Format adapter "${e}" does not export a compile function.`
    );
  return i(t, r);
}
function oC(e, t) {
  const r = Cp(t);
  if (!r)
    return { sections: [], header: null, footer: null, metadata: null };
  const n = e.getOutputs(r.consumes) || [];
  return r.ir ? uC(n, e) : r.consumes === "html" ? sC(n, e) : cC(n);
}
function uC(e, t) {
  let r = null, n = null, a = null, i = !1, o = !1;
  const u = [], s = t.wrapWithProviders || ((c) => c);
  for (const { fragment: c, options: l } of e) {
    const f = l.role || "body";
    if (f === "metadata") {
      r = c;
      continue;
    }
    const h = Ep(s(c)), p = eC(h);
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
function sC(e, t) {
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
    const s = Ep(r(i));
    a.push(s);
  }
  return { sections: a, metadata: n };
}
function cC(e) {
  return { sections: e.map(({ fragment: r }) => r).filter(Boolean) };
}
function lC(e, t) {
  if (typeof document > "u") return;
  const r = URL.createObjectURL(e), n = document.createElement("a");
  n.href = r, n.download = t, document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(r);
}
function fC(e, t, r = {}) {
  const { basePath: n, theme: a } = r, i = GT();
  return Ep(
    ai(
      KT,
      { store: i, basePath: n, theme: a },
      e
    )
  ), dC(i, t), oC(i, t);
}
const ym = /* @__PURE__ */ new Set();
function dC(e, t) {
  const r = Cp(t);
  if (!r) return;
  const n = r.consumes;
  if (!(ym.has(n) || (e.getOutputs && e.getOutputs(n) || []).length > 0) && (ym.add(n), typeof console < "u" && console.warn)) {
    const i = n === t ? `compileSubtree('${t}') found 0 registered sections. Did any section component call useDocumentOutput(block, '${t}', ...)?` : `compileSubtree('${t}') found 0 sections registered under input key '${n}'. Sections should call useDocumentOutput(block, '${n}', ...) (the output format '${t}' reads fragments registered under '${n}').`;
    console.warn(
      `@uniweb/press: ${i} Sections registered for a different input key do not cross-register.`
    );
  }
}
async function bm(e, t, r = {}) {
  const { basePath: n, theme: a, adapterOptions: i = {} } = r, o = fC(e, t, { basePath: n, theme: a });
  return iC(t, o, i);
}
async function hC(e, t = {}) {
  if (e !== null && typeof e == "object" && // React elements have a $$typeof symbol; duck-typing avoids needing
  // `import { isValidElement } from 'react'` (minor, but keeps this
  // file free of React imports it doesn't otherwise need).
  !!e.$$typeof) {
    const { format: A, ...b } = t;
    if (!A)
      throw new Error(
        "compileDocument: 'format' is required (tree mode)."
      );
    return bm(e, A, b);
  }
  const n = e, {
    format: a,
    foundation: i,
    rootPath: o,
    adapterOptions: u = {},
    basePath: s,
    loadAsset: c,
    ...l
  } = t, f = c ?? mC(n);
  if (!a)
    throw new Error(
      "compileDocument: 'format' is required (website mode)."
    );
  if (!n || !Array.isArray(n.pages))
    throw new Error(
      "compileDocument: first argument must be either a React element (tree mode) or a Website (website mode: expected object with a pages array)."
    );
  const h = pC(i), p = h?.[a];
  if (!p) {
    const A = h ? Object.keys(h).join(", ") || "(none)" : "(no outputs declaration)";
    throw new Error(
      `compileDocument: foundation has no outputs.${a} declaration. Declared outputs: ${A}. Add outputs[format] = { getOptions, extension?, via? } to the foundation's default export.`
    );
  }
  const g = p.via ?? a, y = p.getOptions ? await p.getOptions(n, { format: a, rootPath: o, loadAsset: f, ...l }) : {}, m = {
    ...y.adapterOptions,
    ...u
  }, v = yC(n, o), E = globalThis.uniweb?.childBlockRenderer;
  if (typeof E != "function")
    throw new Error(
      "compileDocument: globalThis.uniweb.childBlockRenderer is not installed. Either call initPrerender (headless) or mount a Uniweb runtime (browser) before compileDocument, or pass a pre-built tree (tree mode)."
    );
  const _ = E({ blocks: v });
  return bm(_, g, {
    basePath: s ?? n?.basePath,
    ...y,
    adapterOptions: m
  });
}
function pC(e) {
  return e ? e.outputs ? e.outputs : e.default?.capabilities?.outputs ? e.default.capabilities.outputs : e.default?.outputs ? e.default.outputs : null : null;
}
function mC(e) {
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
function yC(e, t) {
  const r = e.pages || [];
  return (t && typeof t == "string" ? r.filter(
    (a) => a.route === t || typeof a.route == "string" && a.route.startsWith(t + "/")
  ) : r).flatMap((a) => a.bodyBlocks || []);
}
function bC(e) {
  return String(e).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function Ra(e, t) {
  const r = new RegExp(`${t}="([^"]*)"`), n = e.match(r);
  return n ? bC(n[1]) : null;
}
function gC(e) {
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
        const m = Ra(f, "href");
        if (m) {
          o.push({
            type: "link",
            content: h,
            href: m
          }), u = p + c.length;
          return;
        }
      }
      if (l === "span" && f && Ra(f, "data-type") === "math") {
        const v = Ra(f, "data-latex") || "", E = Ra(f, "data-display") === "true", _ = Ra(f, "data-id");
        o.push({
          type: "math",
          latex: v,
          display: E,
          ..._ ? { id: _ } : {}
        }), u = p + c.length;
        return;
      }
      const y = { ...a };
      (l === "strong" || l === "b") && (y.bold = !0), (l === "em" || l === "i") && (y.italics = !0), l === "u" && (y.underline = {}), o = o.concat(r(h, y)), u = p + c.length;
    });
    const s = n.slice(u);
    return s && o.push(t(s, a)), o;
  };
  return typeof e != "string" && (e = String(e ?? "")), r(e);
}
function gm(e) {
  if (!(e instanceof Date)) return e;
  if (Number.isNaN(e.getTime())) return "";
  const t = e.getUTCFullYear(), r = String(e.getUTCMonth() + 1).padStart(2, "0"), n = String(e.getUTCDate()).padStart(2, "0");
  return `${t}-${r}-${n}`;
}
function vC(e) {
  return e == null ? e : Array.isArray(e) ? e.map(gm) : gm(e);
}
function __({
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
  style: l,
  role: f,
  ...h
}) {
  const p = zT(), g = ui(a, p), y = bw(o, p), m = l ?? f, v = { "data-type": "text" };
  return t && (v["data-bold"] = "true"), r && (v["data-italics"] = "true"), n && (v["data-underline"] = "true"), g && (v["data-color"] = g), i != null && (v["data-size"] = i), y && (v["data-font"] = y), u && (v["data-smallcaps"] = "true"), s && (v["data-allcaps"] = "true"), c && (v["data-strike"] = "true"), m && (v["data-style"] = m), /* @__PURE__ */ P("span", { ...v, ...h, children: vC(e) });
}
function EC({ latex: e, display: t = !1, id: r, ...n }) {
  const a = { "data-type": "math" };
  return a["data-latex"] = e || "", a["data-display"] = t ? "true" : "false", r && (a["data-id"] = r), /* @__PURE__ */ P("span", { ...a, ...n });
}
function TC({ tabStops: e, indent: t, role: r }) {
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
  const u = TC({ tabStops: r, indent: n, role: a });
  if (t) {
    const s = gC(t);
    return /* @__PURE__ */ P(e, { "data-type": "paragraph", ...u, ...o, children: s.map((c, l) => c.type === "link" ? /* @__PURE__ */ P(
      "a",
      {
        "data-type": "externalHyperlink",
        "data-link": c.href,
        href: c.href,
        children: /* @__PURE__ */ P("span", { "data-type": "text", "data-style": "Hyperlink", children: c.content })
      },
      l
    ) : c.type === "math" ? /* @__PURE__ */ P(
      EC,
      {
        latex: c.latex,
        display: c.display,
        id: c.id
      },
      l
    ) : /* @__PURE__ */ P(
      __,
      {
        bold: c.bold,
        italics: c.italics,
        underline: !!c.underline,
        children: c.content
      },
      l
    )) });
  }
  return /* @__PURE__ */ P(e, { "data-type": "paragraph", ...u, ...o, children: i });
}
function _C(e, t) {
  if (!e) return e;
  const r = {};
  for (const [n, a] of Object.entries(e))
    a && (r[n] = {
      ...a,
      ...a.color ? { color: ui(a.color, t) } : {}
    });
  return r;
}
const A_ = Vt({ widths: null, borderColor: "cccccc" });
function Ea({
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
  const c = zT(), l = {};
  t && t.length ? (l["data-table-column-widths"] = t.join(","), l["data-table-layout"] = r || "fixed") : r && (l["data-table-layout"] = r), n && (n.size != null && (l["data-table-width-size"] = n.size), l["data-table-width-type"] = n.type ?? "pct");
  const f = _C(a, c);
  if (f)
    for (const [p, g] of Object.entries(f)) {
      if (!g) continue;
      const y = p === "insideHorizontal" ? "insideh" : p === "insideVertical" ? "insidev" : p;
      g.style && (l[`data-table-borders-${y}-style`] = g.style), g.size != null && (l[`data-table-borders-${y}-size`] = g.size), g.color && (l[`data-table-borders-${y}-color`] = g.color);
    }
  const h = ui(i, c) ?? i;
  return /* @__PURE__ */ P(
    A_.Provider,
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
const ao = { top: 80, bottom: 80, left: 120, right: 120 };
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
  const { widths: p, borderColor: g, theme: y } = $t(A_), m = r ?? p?.[e], v = {
    "data-type": "tableCell",
    "data-margins-top": ao.top,
    "data-margins-bottom": ao.bottom,
    "data-margins-left": ao.left,
    "data-margins-right": ao.right,
    "data-borders-top-style": "none",
    "data-borders-left-style": "none",
    "data-borders-right-style": "none",
    "data-borders-bottom-style": a ?? "single",
    "data-borders-bottom-size": t ? 6 : 4,
    "data-borders-bottom-color": g
  };
  if (m != null && (v["data-width-size"] = m, v["data-width-type"] = "pct"), i) {
    const b = typeof i == "string" ? { fill: i } : i, T = ui(b.fill, y), O = ui(b.color, y);
    T && (v["data-shading-fill"] = T), b.type && (v["data-shading-type"] = b.type), O && (v["data-shading-color"] = O);
  }
  o && (v["data-valign"] = o), typeof u == "number" && u > 1 && (v["data-grid-span"] = u), typeof s == "number" && s > 1 && (v["data-row-span"] = s);
  const E = m != null ? { flex: `${m} ${m} 0%`, minWidth: 0, ...l } : l;
  return /* @__PURE__ */ P("div", { className: c, style: E, ...v, ...h, children: typeof f == "string" || typeof f == "number" ? /* @__PURE__ */ P(Bt, { children: n || t ? /* @__PURE__ */ P(__, { bold: !0, children: f }) : f }) : f });
}
function Fu() {
  const t = Tp()?.activeWebsite;
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
function O_(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = O_(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function pe() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = O_(e)) && (n && (n += " "), n += t);
  return n;
}
function AC(e, t) {
  if (!e || typeof e != "string" || !e.includes("topic:")) return e;
  try {
    const n = new DOMParser().parseFromString(e, "text/html");
    return n.querySelectorAll('a[href^="topic:"]').forEach((i) => {
      const o = i.getAttribute("href");
      o && i.setAttribute("href", t.makeHref(o));
    }), n.body.innerHTML;
  } catch (r) {
    return console.warn("[SafeHtml] Error resolving topic links:", r), e;
  }
}
function OC({ value: e, className: t, as: r = "div", ...n }) {
  const { website: a, getRoutingComponents: i } = Fu(), o = i()?.SafeHtml, u = Fr(() => {
    if (!e) return "";
    const s = Array.isArray(e) ? e.join("") : e;
    return a ? AC(s, a) : s;
  }, [e, a]);
  return o ? /* @__PURE__ */ P(KS, { fallback: null, children: /* @__PURE__ */ P(o, { value: u, className: t, ...n }) }) : /* @__PURE__ */ P(
    r,
    {
      className: t,
      dangerouslySetInnerHTML: { __html: u },
      ...n
    }
  );
}
function vm() {
  return { data: null, error: null, loading: !1 };
}
function Em() {
  return { data: null, error: null, loading: !0 };
}
function io(e) {
  return { data: e, error: null, loading: !1 };
}
function Tm(e, t = null) {
  return { data: t, error: e, loading: !1 };
}
function S_(e) {
  const t = Tp()?.activeWebsite ?? null, r = e && t ? ZS(e) : null, n = r ? t.dataStore.get(r) : null, [a, i] = ft(
    () => n ? io(n.data) : r ? Em() : vm()
  );
  return Et(() => {
    if (!r || !t) {
      i(vm());
      return;
    }
    const o = t.dataStore.get(r);
    i(o ? io(o.data) : Em());
    const u = t.dataStore.subscribe(r, () => {
      const c = t.dataStore.get(r);
      c && i(io(c.data));
    }), s = new AbortController();
    return t.fetcher.dispatch(e, { website: t, signal: s.signal }).then((c) => {
      if (!s.signal.aborted) {
        if (c?.error) {
          i(Tm(c.error, c.data ?? null));
          return;
        }
        c && "data" in c && i(io(c.data));
      }
    }).catch((c) => {
      s.signal.aborted || i(Tm(String(c?.message || c)));
    }), () => {
      s.abort(), u();
    };
  }, [r, t]), a;
}
function SC(e) {
  const t = Tp()?.activeWebsite;
  if (!t) return null;
  const r = t.config?.collections?.[e];
  if (!r || typeof r != "object") return null;
  const n = r.queryable;
  return !n || typeof n != "object" ? null : n;
}
function xC(e) {
  return e + 1;
}
function ln(e, t) {
  const { website: r } = Fu(), [, n] = VS(xC, 0), i = r.activePage?.state;
  Et(() => {
    if (i)
      return i.subscribe(e, n);
  }, [i, e]);
  const o = i?.has(e) ? i.get(e) : t;
  return [o, (s) => {
    i && i.set(e, typeof s == "function" ? s(o) : s);
  }];
}
const x_ = "academic-metrics/options", Np = "all-members", w_ = Np, wC = [
  "members",
  "publications-by-type",
  "publications-by-journal",
  "publications-by-year",
  "publications-list",
  "funding",
  "supervisions"
], PC = {
  members: "Members",
  "publications-by-type": "Publications by type",
  "publications-by-journal": "Publications by journal",
  "publications-by-year": "Publications by year",
  "publications-list": "Publications (list)",
  funding: "Funding",
  supervisions: "Supervisions"
};
function IC(e) {
  return PC[e] || e;
}
const CC = [
  { value: "apa", label: "APA (7th)" },
  { value: "mla", label: "MLA (9th)" },
  { value: "chicago-author-date", label: "Chicago (author–date)" },
  { value: "ieee", label: "IEEE" },
  { value: "vancouver", label: "Vancouver" },
  { value: "harvard", label: "Harvard" },
  { value: "nature", label: "Nature" }
], it = {
  slug: Np,
  panelWhere: null,
  excludedSections: [],
  dateRange: { start: null, end: null },
  refereedOnly: !1,
  citationStyle: "apa"
};
function NC() {
  if (typeof window > "u") return null;
  try {
    const e = window.localStorage.getItem(x_);
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
function RC(e) {
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
    window.localStorage.setItem(x_, JSON.stringify(t));
  } catch {
  }
}
const _m = /* @__PURE__ */ new WeakSet(), Am = ["slug", "panelWhere", "excludedSections", "dateRange", "refereedOnly", "citationStyle"];
function DC(e) {
  if (!e || !e.state) return () => {
  };
  if (_m.has(e)) return () => {
  };
  _m.add(e);
  const t = NC() || it;
  for (const a of Am)
    e.state.has(a) || e.state.set(a, t[a]);
  const r = () => RC(e), n = Am.map((a) => e.state.subscribe(a, r));
  return () => n.forEach((a) => a());
}
function Rp() {
  return ln("slug", it.slug);
}
function Dp() {
  return ln("panelWhere", it.panelWhere);
}
function _n(e) {
  const [t] = ln("excludedSections", it.excludedSections);
  return !t.includes(e);
}
function MC() {
  const [e, t] = ln("excludedSections", it.excludedSections);
  return [e, (n) => {
    const a = new Set(e);
    a.has(n) ? a.delete(n) : a.add(n), t([...a]);
  }];
}
function Yi() {
  const [e, t] = ln("dateRange", it.dateRange), [r, n] = ln("refereedOnly", it.refereedOnly), [a, i] = ln("citationStyle", it.citationStyle);
  return [{ dateRange: e, refereedOnly: r, citationStyle: a }, (u) => {
    "dateRange" in u && t(u.dateRange), "refereedOnly" in u && n(u.refereedOnly), "citationStyle" in u && i(u.citationStyle);
  }];
}
function LC(e, t, r) {
  if (t && typeof t == "object" && Object.keys(t).length > 0)
    return { where: t, source: "panel", label: "Custom filter" };
  if (e && e !== Np) {
    const n = r.find((a) => a.slug === e);
    if (n?.where)
      return { where: n.where, source: "view", label: n.name || e, view: n };
  }
  return { where: null, source: null, label: null, view: null };
}
function Yr(e) {
  const [t] = Rp(), [r] = Dp(), n = Fr(
    () => Array.isArray(e?.data?.queries) ? e.data.queries : [],
    [e?.data?.queries]
  ), a = Fr(
    () => Array.isArray(e?.data?.members) ? e.data.members : [],
    [e?.data?.members]
  ), i = Fr(
    () => LC(t, r, n),
    [t, r, n]
  ), { data: o, loading: u } = S_(
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
function yH({ content: e, block: t }) {
  const { members: r, activeView: n, activeLabel: a, totalCount: i } = Yr(e), o = Array.isArray(e?.paragraphs) ? e.paragraphs : [], u = r.reduce(
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
      /* @__PURE__ */ P(oo, { label: "Members", value: r.length }),
      /* @__PURE__ */ P(oo, { label: "Publications", value: u }),
      /* @__PURE__ */ P(oo, { label: "Funding", value: kC(s) }),
      /* @__PURE__ */ P(oo, { label: "Supervisions", value: c })
    ] })
  ] });
}
function oo({ label: e, value: t }) {
  return /* @__PURE__ */ ee("div", { role: "listitem", children: [
    /* @__PURE__ */ P("span", { className: "cover-meta-label", children: e }),
    /* @__PURE__ */ P("span", { className: "cover-meta-value", children: t })
  ] });
}
function kC(e) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(e);
}
var uo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xe(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ds, Om;
function Tt() {
  if (Om) return Ds;
  Om = 1;
  var e = Array.isArray;
  return Ds = e, Ds;
}
var Ms, Sm;
function P_() {
  if (Sm) return Ms;
  Sm = 1;
  var e = typeof uo == "object" && uo && uo.Object === Object && uo;
  return Ms = e, Ms;
}
var Ls, xm;
function or() {
  if (xm) return Ls;
  xm = 1;
  var e = P_(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return Ls = r, Ls;
}
var ks, wm;
function zi() {
  if (wm) return ks;
  wm = 1;
  var e = or(), t = e.Symbol;
  return ks = t, ks;
}
var Bs, Pm;
function BC() {
  if (Pm) return Bs;
  Pm = 1;
  var e = zi(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, a = e ? e.toStringTag : void 0;
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
  return Bs = i, Bs;
}
var js, Im;
function jC() {
  if (Im) return js;
  Im = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return js = r, js;
}
var Fs, Cm;
function xr() {
  if (Cm) return Fs;
  Cm = 1;
  var e = zi(), t = BC(), r = jC(), n = "[object Null]", a = "[object Undefined]", i = e ? e.toStringTag : void 0;
  function o(u) {
    return u == null ? u === void 0 ? a : n : i && i in Object(u) ? t(u) : r(u);
  }
  return Fs = o, Fs;
}
var $s, Nm;
function wr() {
  if (Nm) return $s;
  Nm = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return $s = e, $s;
}
var Us, Rm;
function Ta() {
  if (Rm) return Us;
  Rm = 1;
  var e = xr(), t = wr(), r = "[object Symbol]";
  function n(a) {
    return typeof a == "symbol" || t(a) && e(a) == r;
  }
  return Us = n, Us;
}
var Hs, Dm;
function Mp() {
  if (Dm) return Hs;
  Dm = 1;
  var e = Tt(), t = Ta(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function a(i, o) {
    if (e(i))
      return !1;
    var u = typeof i;
    return u == "number" || u == "symbol" || u == "boolean" || i == null || t(i) ? !0 : n.test(i) || !r.test(i) || o != null && i in Object(o);
  }
  return Hs = a, Hs;
}
var qs, Mm;
function zr() {
  if (Mm) return qs;
  Mm = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return qs = e, qs;
}
var Ws, Lm;
function Lp() {
  if (Lm) return Ws;
  Lm = 1;
  var e = xr(), t = zr(), r = "[object AsyncFunction]", n = "[object Function]", a = "[object GeneratorFunction]", i = "[object Proxy]";
  function o(u) {
    if (!t(u))
      return !1;
    var s = e(u);
    return s == n || s == a || s == r || s == i;
  }
  return Ws = o, Ws;
}
var Ys, km;
function FC() {
  if (km) return Ys;
  km = 1;
  var e = or(), t = e["__core-js_shared__"];
  return Ys = t, Ys;
}
var zs, Bm;
function $C() {
  if (Bm) return zs;
  Bm = 1;
  var e = FC(), t = (function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  })();
  function r(n) {
    return !!t && t in n;
  }
  return zs = r, zs;
}
var Gs, jm;
function I_() {
  if (jm) return Gs;
  jm = 1;
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
  return Gs = r, Gs;
}
var Ks, Fm;
function UC() {
  if (Fm) return Ks;
  Fm = 1;
  var e = Lp(), t = $C(), r = zr(), n = I_(), a = /[\\^$.*+?()[\]{}|]/g, i = /^\[object .+?Constructor\]$/, o = Function.prototype, u = Object.prototype, s = o.toString, c = u.hasOwnProperty, l = RegExp(
    "^" + s.call(c).replace(a, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function f(h) {
    if (!r(h) || t(h))
      return !1;
    var p = e(h) ? l : i;
    return p.test(n(h));
  }
  return Ks = f, Ks;
}
var Vs, $m;
function HC() {
  if ($m) return Vs;
  $m = 1;
  function e(t, r) {
    return t?.[r];
  }
  return Vs = e, Vs;
}
var Xs, Um;
function An() {
  if (Um) return Xs;
  Um = 1;
  var e = UC(), t = HC();
  function r(n, a) {
    var i = t(n, a);
    return e(i) ? i : void 0;
  }
  return Xs = r, Xs;
}
var Qs, Hm;
function $u() {
  if (Hm) return Qs;
  Hm = 1;
  var e = An(), t = e(Object, "create");
  return Qs = t, Qs;
}
var Zs, qm;
function qC() {
  if (qm) return Zs;
  qm = 1;
  var e = $u();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Zs = t, Zs;
}
var Js, Wm;
function WC() {
  if (Wm) return Js;
  Wm = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return Js = e, Js;
}
var ec, Ym;
function YC() {
  if (Ym) return ec;
  Ym = 1;
  var e = $u(), t = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function a(i) {
    var o = this.__data__;
    if (e) {
      var u = o[i];
      return u === t ? void 0 : u;
    }
    return n.call(o, i) ? o[i] : void 0;
  }
  return ec = a, ec;
}
var tc, zm;
function zC() {
  if (zm) return tc;
  zm = 1;
  var e = $u(), t = Object.prototype, r = t.hasOwnProperty;
  function n(a) {
    var i = this.__data__;
    return e ? i[a] !== void 0 : r.call(i, a);
  }
  return tc = n, tc;
}
var rc, Gm;
function GC() {
  if (Gm) return rc;
  Gm = 1;
  var e = $u(), t = "__lodash_hash_undefined__";
  function r(n, a) {
    var i = this.__data__;
    return this.size += this.has(n) ? 0 : 1, i[n] = e && a === void 0 ? t : a, this;
  }
  return rc = r, rc;
}
var nc, Km;
function KC() {
  if (Km) return nc;
  Km = 1;
  var e = qC(), t = WC(), r = YC(), n = zC(), a = GC();
  function i(o) {
    var u = -1, s = o == null ? 0 : o.length;
    for (this.clear(); ++u < s; ) {
      var c = o[u];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, nc = i, nc;
}
var ac, Vm;
function VC() {
  if (Vm) return ac;
  Vm = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return ac = e, ac;
}
var ic, Xm;
function kp() {
  if (Xm) return ic;
  Xm = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return ic = e, ic;
}
var oc, Qm;
function Uu() {
  if (Qm) return oc;
  Qm = 1;
  var e = kp();
  function t(r, n) {
    for (var a = r.length; a--; )
      if (e(r[a][0], n))
        return a;
    return -1;
  }
  return oc = t, oc;
}
var uc, Zm;
function XC() {
  if (Zm) return uc;
  Zm = 1;
  var e = Uu(), t = Array.prototype, r = t.splice;
  function n(a) {
    var i = this.__data__, o = e(i, a);
    if (o < 0)
      return !1;
    var u = i.length - 1;
    return o == u ? i.pop() : r.call(i, o, 1), --this.size, !0;
  }
  return uc = n, uc;
}
var sc, Jm;
function QC() {
  if (Jm) return sc;
  Jm = 1;
  var e = Uu();
  function t(r) {
    var n = this.__data__, a = e(n, r);
    return a < 0 ? void 0 : n[a][1];
  }
  return sc = t, sc;
}
var cc, ey;
function ZC() {
  if (ey) return cc;
  ey = 1;
  var e = Uu();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return cc = t, cc;
}
var lc, ty;
function JC() {
  if (ty) return lc;
  ty = 1;
  var e = Uu();
  function t(r, n) {
    var a = this.__data__, i = e(a, r);
    return i < 0 ? (++this.size, a.push([r, n])) : a[i][1] = n, this;
  }
  return lc = t, lc;
}
var fc, ry;
function Hu() {
  if (ry) return fc;
  ry = 1;
  var e = VC(), t = XC(), r = QC(), n = ZC(), a = JC();
  function i(o) {
    var u = -1, s = o == null ? 0 : o.length;
    for (this.clear(); ++u < s; ) {
      var c = o[u];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, fc = i, fc;
}
var dc, ny;
function Bp() {
  if (ny) return dc;
  ny = 1;
  var e = An(), t = or(), r = e(t, "Map");
  return dc = r, dc;
}
var hc, ay;
function eN() {
  if (ay) return hc;
  ay = 1;
  var e = KC(), t = Hu(), r = Bp();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return hc = n, hc;
}
var pc, iy;
function tN() {
  if (iy) return pc;
  iy = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return pc = e, pc;
}
var mc, oy;
function qu() {
  if (oy) return mc;
  oy = 1;
  var e = tN();
  function t(r, n) {
    var a = r.__data__;
    return e(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
  }
  return mc = t, mc;
}
var yc, uy;
function rN() {
  if (uy) return yc;
  uy = 1;
  var e = qu();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return yc = t, yc;
}
var bc, sy;
function nN() {
  if (sy) return bc;
  sy = 1;
  var e = qu();
  function t(r) {
    return e(this, r).get(r);
  }
  return bc = t, bc;
}
var gc, cy;
function aN() {
  if (cy) return gc;
  cy = 1;
  var e = qu();
  function t(r) {
    return e(this, r).has(r);
  }
  return gc = t, gc;
}
var vc, ly;
function iN() {
  if (ly) return vc;
  ly = 1;
  var e = qu();
  function t(r, n) {
    var a = e(this, r), i = a.size;
    return a.set(r, n), this.size += a.size == i ? 0 : 1, this;
  }
  return vc = t, vc;
}
var Ec, fy;
function jp() {
  if (fy) return Ec;
  fy = 1;
  var e = eN(), t = rN(), r = nN(), n = aN(), a = iN();
  function i(o) {
    var u = -1, s = o == null ? 0 : o.length;
    for (this.clear(); ++u < s; ) {
      var c = o[u];
      this.set(c[0], c[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, Ec = i, Ec;
}
var Tc, dy;
function C_() {
  if (dy) return Tc;
  dy = 1;
  var e = jp(), t = "Expected a function";
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
  return r.Cache = e, Tc = r, Tc;
}
var _c, hy;
function oN() {
  if (hy) return _c;
  hy = 1;
  var e = C_(), t = 500;
  function r(n) {
    var a = e(n, function(o) {
      return i.size === t && i.clear(), o;
    }), i = a.cache;
    return a;
  }
  return _c = r, _c;
}
var Ac, py;
function uN() {
  if (py) return Ac;
  py = 1;
  var e = oN(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = e(function(a) {
    var i = [];
    return a.charCodeAt(0) === 46 && i.push(""), a.replace(t, function(o, u, s, c) {
      i.push(s ? c.replace(r, "$1") : u || o);
    }), i;
  });
  return Ac = n, Ac;
}
var Oc, my;
function Fp() {
  if (my) return Oc;
  my = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length, i = Array(a); ++n < a; )
      i[n] = r(t[n], n, t);
    return i;
  }
  return Oc = e, Oc;
}
var Sc, yy;
function sN() {
  if (yy) return Sc;
  yy = 1;
  var e = zi(), t = Fp(), r = Tt(), n = Ta(), a = e ? e.prototype : void 0, i = a ? a.toString : void 0;
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
  return Sc = o, Sc;
}
var xc, by;
function N_() {
  if (by) return xc;
  by = 1;
  var e = sN();
  function t(r) {
    return r == null ? "" : e(r);
  }
  return xc = t, xc;
}
var wc, gy;
function R_() {
  if (gy) return wc;
  gy = 1;
  var e = Tt(), t = Mp(), r = uN(), n = N_();
  function a(i, o) {
    return e(i) ? i : t(i, o) ? [i] : r(n(i));
  }
  return wc = a, wc;
}
var Pc, vy;
function Wu() {
  if (vy) return Pc;
  vy = 1;
  var e = Ta();
  function t(r) {
    if (typeof r == "string" || e(r))
      return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return Pc = t, Pc;
}
var Ic, Ey;
function $p() {
  if (Ey) return Ic;
  Ey = 1;
  var e = R_(), t = Wu();
  function r(n, a) {
    a = e(a, n);
    for (var i = 0, o = a.length; n != null && i < o; )
      n = n[t(a[i++])];
    return i && i == o ? n : void 0;
  }
  return Ic = r, Ic;
}
var Cc, Ty;
function D_() {
  if (Ty) return Cc;
  Ty = 1;
  var e = $p();
  function t(r, n, a) {
    var i = r == null ? void 0 : e(r, n);
    return i === void 0 ? a : i;
  }
  return Cc = t, Cc;
}
var cN = D_();
const xt = /* @__PURE__ */ xe(cN);
var Nc, _y;
function lN() {
  if (_y) return Nc;
  _y = 1;
  function e(t) {
    return t == null;
  }
  return Nc = e, Nc;
}
var fN = lN();
const me = /* @__PURE__ */ xe(fN);
var Rc, Ay;
function dN() {
  if (Ay) return Rc;
  Ay = 1;
  var e = xr(), t = Tt(), r = wr(), n = "[object String]";
  function a(i) {
    return typeof i == "string" || !t(i) && r(i) && e(i) == n;
  }
  return Rc = a, Rc;
}
var hN = dN();
const mn = /* @__PURE__ */ xe(hN);
var pN = Lp();
const de = /* @__PURE__ */ xe(pN);
var mN = zr();
const _a = /* @__PURE__ */ xe(mN);
var so = { exports: {} }, ve = {};
var Oy;
function yN() {
  if (Oy) return ve;
  Oy = 1;
  var e = /* @__PURE__ */ Symbol.for("react.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), n = /* @__PURE__ */ Symbol.for("react.strict_mode"), a = /* @__PURE__ */ Symbol.for("react.profiler"), i = /* @__PURE__ */ Symbol.for("react.provider"), o = /* @__PURE__ */ Symbol.for("react.context"), u = /* @__PURE__ */ Symbol.for("react.server_context"), s = /* @__PURE__ */ Symbol.for("react.forward_ref"), c = /* @__PURE__ */ Symbol.for("react.suspense"), l = /* @__PURE__ */ Symbol.for("react.suspense_list"), f = /* @__PURE__ */ Symbol.for("react.memo"), h = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.offscreen"), g;
  g = /* @__PURE__ */ Symbol.for("react.module.reference");
  function y(m) {
    if (typeof m == "object" && m !== null) {
      var v = m.$$typeof;
      switch (v) {
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
                  return v;
              }
          }
        case t:
          return v;
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
var Sy;
function bN() {
  return Sy || (Sy = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = /* @__PURE__ */ Symbol.for("react.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), n = /* @__PURE__ */ Symbol.for("react.strict_mode"), a = /* @__PURE__ */ Symbol.for("react.profiler"), i = /* @__PURE__ */ Symbol.for("react.provider"), o = /* @__PURE__ */ Symbol.for("react.context"), u = /* @__PURE__ */ Symbol.for("react.server_context"), s = /* @__PURE__ */ Symbol.for("react.forward_ref"), c = /* @__PURE__ */ Symbol.for("react.suspense"), l = /* @__PURE__ */ Symbol.for("react.suspense_list"), f = /* @__PURE__ */ Symbol.for("react.memo"), h = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.offscreen"), g = !1, y = !1, m = !1, v = !1, E = !1, _;
    _ = /* @__PURE__ */ Symbol.for("react.module.reference");
    function A(X) {
      return !!(typeof X == "string" || typeof X == "function" || X === r || X === a || E || X === n || X === c || X === l || v || X === p || g || y || m || typeof X == "object" && X !== null && (X.$$typeof === h || X.$$typeof === f || X.$$typeof === i || X.$$typeof === o || X.$$typeof === s || // This needs to include all possible module reference object
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
    var T = o, O = i, I = e, N = s, j = r, D = h, R = f, B = t, F = a, $ = n, q = c, Y = l, Q = !1, te = !1;
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
    Ee.ContextConsumer = T, Ee.ContextProvider = O, Ee.Element = I, Ee.ForwardRef = N, Ee.Fragment = j, Ee.Lazy = D, Ee.Memo = R, Ee.Portal = B, Ee.Profiler = F, Ee.StrictMode = $, Ee.Suspense = q, Ee.SuspenseList = Y, Ee.isAsyncMode = k, Ee.isConcurrentMode = W, Ee.isContextConsumer = z, Ee.isContextProvider = Z, Ee.isElement = ne, Ee.isForwardRef = oe, Ee.isFragment = ue, Ee.isLazy = fe, Ee.isMemo = ce, Ee.isPortal = G, Ee.isProfiler = re, Ee.isStrictMode = ie, Ee.isSuspense = M, Ee.isSuspenseList = ye, Ee.isValidElementType = A, Ee.typeOf = b;
  })()), Ee;
}
var xy;
function gN() {
  return xy || (xy = 1, process.env.NODE_ENV === "production" ? so.exports = yN() : so.exports = bN()), so.exports;
}
var vN = gN(), Dc, wy;
function M_() {
  if (wy) return Dc;
  wy = 1;
  var e = xr(), t = wr(), r = "[object Number]";
  function n(a) {
    return typeof a == "number" || t(a) && e(a) == r;
  }
  return Dc = n, Dc;
}
var Mc, Py;
function EN() {
  if (Py) return Mc;
  Py = 1;
  var e = M_();
  function t(r) {
    return e(r) && r != +r;
  }
  return Mc = t, Mc;
}
var TN = EN();
const Gi = /* @__PURE__ */ xe(TN);
var _N = M_();
const AN = /* @__PURE__ */ xe(_N);
var dt = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, nn = function(t) {
  return mn(t) && t.indexOf("%") === t.length - 1;
}, J = function(t) {
  return AN(t) && !Gi(t);
}, ON = function(t) {
  return me(t);
}, ze = function(t) {
  return J(t) || mn(t);
}, SN = 0, Ki = function(t) {
  var r = ++SN;
  return "".concat(t || "").concat(r);
}, ht = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!J(t) && !mn(t))
    return n;
  var i;
  if (nn(t)) {
    var o = t.indexOf("%");
    i = r * parseFloat(t.slice(0, o)) / 100;
  } else
    i = +t;
  return Gi(i) && (i = n), a && i > r && (i = r), i;
}, kr = function(t) {
  if (!t)
    return null;
  var r = Object.keys(t);
  return r && r.length ? t[r[0]] : null;
}, xN = function(t) {
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
function Zd(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : xt(n, t)) === r;
  });
}
var wN = function(t, r) {
  return J(t) && J(r) ? t - r : mn(t) && mn(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r));
};
function qn(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r]))
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function Jd(e) {
  "@babel/helpers - typeof";
  return Jd = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Jd(e);
}
var PN = ["viewBox", "children"], IN = [
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
], Iy = ["points", "pathLength"], Lc = {
  svg: PN,
  polygon: Iy,
  polyline: Iy
}, Up = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], Mo = function(t, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var n = t;
  if (/* @__PURE__ */ Lt(t) && (n = t.props), !_a(n))
    return null;
  var a = {};
  return Object.keys(n).forEach(function(i) {
    Up.includes(i) && (a[i] = r || function(o) {
      return n[i](n, o);
    });
  }), a;
}, CN = function(t, r, n) {
  return function(a) {
    return t(r, n, a), null;
  };
}, yn = function(t, r, n) {
  if (!_a(t) || Jd(t) !== "object")
    return null;
  var a = null;
  return Object.keys(t).forEach(function(i) {
    var o = t[i];
    Up.includes(i) && typeof o == "function" && (a || (a = {}), a[i] = CN(o, r, n));
  }), a;
}, NN = ["children"], RN = ["children"];
function Cy(e, t) {
  if (e == null) return {};
  var r = DN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function DN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var Ny = {
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
}, Ry = null, kc = null, Hp = function e(t) {
  if (t === Ry && Array.isArray(kc))
    return kc;
  var r = [];
  return $r.forEach(t, function(n) {
    me(n) || (vN.isFragment(n) ? r = r.concat(e(n.props.children)) : r.push(n));
  }), kc = r, Ry = t, r;
};
function jt(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map(function(a) {
    return vr(a);
  }) : n = [vr(t)], Hp(e).forEach(function(a) {
    var i = xt(a, "type.displayName") || xt(a, "type.name");
    n.indexOf(i) !== -1 && r.push(a);
  }), r;
}
function At(e, t) {
  var r = jt(e, t);
  return r && r[0];
}
var Dy = function(t) {
  if (!t || !t.props)
    return !1;
  var r = t.props, n = r.width, a = r.height;
  return !(!J(n) || n <= 0 || !J(a) || a <= 0);
}, MN = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], LN = function(t) {
  return t && t.type && mn(t.type) && MN.indexOf(t.type) >= 0;
}, kN = function(t, r, n, a) {
  var i, o = (i = Lc?.[a]) !== null && i !== void 0 ? i : [];
  return r.startsWith("data-") || !de(t) && (a && o.includes(r) || IN.includes(r)) || n && Up.includes(r);
}, le = function(t, r, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var a = t;
  if (/* @__PURE__ */ Lt(t) && (a = t.props), !_a(a))
    return null;
  var i = {};
  return Object.keys(a).forEach(function(o) {
    var u;
    kN((u = a) === null || u === void 0 ? void 0 : u[o], o, r, n) && (i[o] = a[o]);
  }), i;
}, eh = function e(t, r) {
  if (t === r)
    return !0;
  var n = $r.count(t);
  if (n !== $r.count(r))
    return !1;
  if (n === 0)
    return !0;
  if (n === 1)
    return My(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
  for (var a = 0; a < n; a++) {
    var i = t[a], o = r[a];
    if (Array.isArray(i) || Array.isArray(o)) {
      if (!e(i, o))
        return !1;
    } else if (!My(i, o))
      return !1;
  }
  return !0;
}, My = function(t, r) {
  if (me(t) && me(r))
    return !0;
  if (!me(t) && !me(r)) {
    var n = t.props || {}, a = n.children, i = Cy(n, NN), o = r.props || {}, u = o.children, s = Cy(o, RN);
    return a && u ? qn(i, s) && eh(a, u) : !a && !u ? qn(i, s) : !1;
  }
  return !1;
}, Ly = function(t, r) {
  var n = [], a = {};
  return Hp(t).forEach(function(i, o) {
    if (LN(i))
      n.push(i);
    else if (i) {
      var u = vr(i.type), s = r[u] || {}, c = s.handler, l = s.once;
      if (c && (!l || !a[u])) {
        var f = c(i, u, o);
        n.push(f), a[u] = !0;
      }
    }
  }), n;
}, BN = function(t) {
  var r = t && t.type;
  return r && Ny[r] ? Ny[r] : null;
}, jN = function(t, r) {
  return Hp(r).indexOf(t);
}, FN = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function th() {
  return th = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, th.apply(this, arguments);
}
function $N(e, t) {
  if (e == null) return {};
  var r = UN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function UN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function rh(e) {
  var t = e.children, r = e.width, n = e.height, a = e.viewBox, i = e.className, o = e.style, u = e.title, s = e.desc, c = $N(e, FN), l = a || {
    width: r,
    height: n,
    x: 0,
    y: 0
  }, f = pe("recharts-surface", i);
  return /* @__PURE__ */ C.createElement("svg", th({}, le(c, !0, "svg"), {
    className: f,
    width: r,
    height: n,
    style: o,
    viewBox: "".concat(l.x, " ").concat(l.y, " ").concat(l.width, " ").concat(l.height)
  }), /* @__PURE__ */ C.createElement("title", null, u), /* @__PURE__ */ C.createElement("desc", null, s), t);
}
var HN = ["children", "className"];
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
function qN(e, t) {
  if (e == null) return {};
  var r = WN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function WN(e, t) {
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
  var r = e.children, n = e.className, a = qN(e, HN), i = pe("recharts-layer", n);
  return /* @__PURE__ */ C.createElement("g", nh({
    className: i
  }, le(a, !0), {
    ref: t
  }), r);
}), YN = process.env.NODE_ENV !== "production", zt = function(t, r) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    a[i - 2] = arguments[i];
  if (YN && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, function() {
        return a[o++];
      }));
    }
}, Bc, ky;
function zN() {
  if (ky) return Bc;
  ky = 1;
  function e(t, r, n) {
    var a = -1, i = t.length;
    r < 0 && (r = -r > i ? 0 : i + r), n = n > i ? i : n, n < 0 && (n += i), i = r > n ? 0 : n - r >>> 0, r >>>= 0;
    for (var o = Array(i); ++a < i; )
      o[a] = t[a + r];
    return o;
  }
  return Bc = e, Bc;
}
var jc, By;
function GN() {
  if (By) return jc;
  By = 1;
  var e = zN();
  function t(r, n, a) {
    var i = r.length;
    return a = a === void 0 ? i : a, !n && a >= i ? r : e(r, n, a);
  }
  return jc = t, jc;
}
var Fc, jy;
function L_() {
  if (jy) return Fc;
  jy = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", a = t + r + n, i = "\\ufe0e\\ufe0f", o = "\\u200d", u = RegExp("[" + o + e + a + i + "]");
  function s(c) {
    return u.test(c);
  }
  return Fc = s, Fc;
}
var $c, Fy;
function KN() {
  if (Fy) return $c;
  Fy = 1;
  function e(t) {
    return t.split("");
  }
  return $c = e, $c;
}
var Uc, $y;
function VN() {
  if ($y) return Uc;
  $y = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", a = t + r + n, i = "\\ufe0e\\ufe0f", o = "[" + e + "]", u = "[" + a + "]", s = "\\ud83c[\\udffb-\\udfff]", c = "(?:" + u + "|" + s + ")", l = "[^" + e + "]", f = "(?:\\ud83c[\\udde6-\\uddff]){2}", h = "[\\ud800-\\udbff][\\udc00-\\udfff]", p = "\\u200d", g = c + "?", y = "[" + i + "]?", m = "(?:" + p + "(?:" + [l, f, h].join("|") + ")" + y + g + ")*", v = y + g + m, E = "(?:" + [l + u + "?", u, f, h, o].join("|") + ")", _ = RegExp(s + "(?=" + s + ")|" + E + v, "g");
  function A(b) {
    return b.match(_) || [];
  }
  return Uc = A, Uc;
}
var Hc, Uy;
function XN() {
  if (Uy) return Hc;
  Uy = 1;
  var e = KN(), t = L_(), r = VN();
  function n(a) {
    return t(a) ? r(a) : e(a);
  }
  return Hc = n, Hc;
}
var qc, Hy;
function QN() {
  if (Hy) return qc;
  Hy = 1;
  var e = GN(), t = L_(), r = XN(), n = N_();
  function a(i) {
    return function(o) {
      o = n(o);
      var u = t(o) ? r(o) : void 0, s = u ? u[0] : o.charAt(0), c = u ? e(u, 1).join("") : o.slice(1);
      return s[i]() + c;
    };
  }
  return qc = a, qc;
}
var Wc, qy;
function ZN() {
  if (qy) return Wc;
  qy = 1;
  var e = QN(), t = e("toUpperCase");
  return Wc = t, Wc;
}
var JN = ZN();
const Yu = /* @__PURE__ */ xe(JN);
function Ce(e) {
  return function() {
    return e;
  };
}
const k_ = Math.cos, Lo = Math.sin, Qt = Math.sqrt, ko = Math.PI, zu = 2 * ko, ah = Math.PI, ih = 2 * ah, en = 1e-6, e3 = ih - en;
function B_(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function t3(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return B_;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let a = 1, i = n.length; a < i; ++a)
      this._ += Math.round(arguments[a] * r) / r + n[a];
  };
}
class r3 {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? B_ : t3(t);
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
    else if (h > en) if (!(Math.abs(f * s - c * l) > en) || !i)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let p = n - o, g = a - u, y = s * s + c * c, m = p * p + g * g, v = Math.sqrt(y), E = Math.sqrt(h), _ = i * Math.tan((ah - Math.acos((y + h - m) / (2 * v * E))) / 2), A = _ / E, b = _ / v;
      Math.abs(A - 1) > en && this._append`L${t + A * l},${r + A * f}`, this._append`A${i},${i},0,0,${+(f * p > l * g)},${this._x1 = t + b * s},${this._y1 = r + b * c}`;
    }
  }
  arc(t, r, n, a, i, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(a), s = n * Math.sin(a), c = t + u, l = r + s, f = 1 ^ o, h = o ? a - i : i - a;
    this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > en || Math.abs(this._y1 - l) > en) && this._append`L${c},${l}`, n && (h < 0 && (h = h % ih + ih), h > e3 ? this._append`A${n},${n},0,1,${f},${t - u},${r - s}A${n},${n},0,1,${f},${this._x1 = c},${this._y1 = l}` : h > en && this._append`A${n},${n},0,${+(h >= ah)},${f},${this._x1 = t + n * Math.cos(i)},${this._y1 = r + n * Math.sin(i)}`);
  }
  rect(t, r, n, a) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+a}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function qp(e) {
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
  }, () => new r3(t);
}
function Wp(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function j_(e) {
  this._context = e;
}
j_.prototype = {
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
function Gu(e) {
  return new j_(e);
}
function F_(e) {
  return e[0];
}
function $_(e) {
  return e[1];
}
function U_(e, t) {
  var r = Ce(!0), n = null, a = Gu, i = null, o = qp(u);
  e = typeof e == "function" ? e : e === void 0 ? F_ : Ce(e), t = typeof t == "function" ? t : t === void 0 ? $_ : Ce(t);
  function u(s) {
    var c, l = (s = Wp(s)).length, f, h = !1, p;
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
function co(e, t, r) {
  var n = null, a = Ce(!0), i = null, o = Gu, u = null, s = qp(c);
  e = typeof e == "function" ? e : e === void 0 ? F_ : Ce(+e), t = typeof t == "function" ? t : Ce(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? $_ : Ce(+r);
  function c(f) {
    var h, p, g, y = (f = Wp(f)).length, m, v = !1, E, _ = new Array(y), A = new Array(y);
    for (i == null && (u = o(E = s())), h = 0; h <= y; ++h) {
      if (!(h < y && a(m = f[h], h, f)) === v)
        if (v = !v)
          p = h, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), g = h - 1; g >= p; --g)
            u.point(_[g], A[g]);
          u.lineEnd(), u.areaEnd();
        }
      v && (_[h] = +e(m, h, f), A[h] = +t(m, h, f), u.point(n ? +n(m, h, f) : _[h], r ? +r(m, h, f) : A[h]));
    }
    if (E) return u = null, E + "" || null;
  }
  function l() {
    return U_().defined(a).curve(o).context(i);
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
class H_ {
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
function n3(e) {
  return new H_(e, !0);
}
function a3(e) {
  return new H_(e, !1);
}
const Yp = {
  draw(e, t) {
    const r = Qt(t / ko);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, zu);
  }
}, i3 = {
  draw(e, t) {
    const r = Qt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, q_ = Qt(1 / 3), o3 = q_ * 2, u3 = {
  draw(e, t) {
    const r = Qt(t / o3), n = r * q_;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, s3 = {
  draw(e, t) {
    const r = Qt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, c3 = 0.8908130915292852, W_ = Lo(ko / 10) / Lo(7 * ko / 10), l3 = Lo(zu / 10) * W_, f3 = -k_(zu / 10) * W_, d3 = {
  draw(e, t) {
    const r = Qt(t * c3), n = l3 * r, a = f3 * r;
    e.moveTo(0, -r), e.lineTo(n, a);
    for (let i = 1; i < 5; ++i) {
      const o = zu * i / 5, u = k_(o), s = Lo(o);
      e.lineTo(s * r, -u * r), e.lineTo(u * n - s * a, s * n + u * a);
    }
    e.closePath();
  }
}, Yc = Qt(3), h3 = {
  draw(e, t) {
    const r = -Qt(t / (Yc * 3));
    e.moveTo(0, r * 2), e.lineTo(-Yc * r, -r), e.lineTo(Yc * r, -r), e.closePath();
  }
}, Pt = -0.5, It = Qt(3) / 2, oh = 1 / Qt(12), p3 = (oh / 2 + 1) * 3, m3 = {
  draw(e, t) {
    const r = Qt(t / p3), n = r / 2, a = r * oh, i = n, o = r * oh + r, u = -i, s = o;
    e.moveTo(n, a), e.lineTo(i, o), e.lineTo(u, s), e.lineTo(Pt * n - It * a, It * n + Pt * a), e.lineTo(Pt * i - It * o, It * i + Pt * o), e.lineTo(Pt * u - It * s, It * u + Pt * s), e.lineTo(Pt * n + It * a, Pt * a - It * n), e.lineTo(Pt * i + It * o, Pt * o - It * i), e.lineTo(Pt * u + It * s, Pt * s - It * u), e.closePath();
  }
};
function y3(e, t) {
  let r = null, n = qp(a);
  e = typeof e == "function" ? e : Ce(e || Yp), t = typeof t == "function" ? t : Ce(t === void 0 ? 64 : +t);
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
function Bo() {
}
function jo(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
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
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        jo(this, this._x1, this._y1);
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
        jo(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function b3(e) {
  return new Y_(e);
}
function z_(e) {
  this._context = e;
}
z_.prototype = {
  areaStart: Bo,
  areaEnd: Bo,
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
        jo(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function g3(e) {
  return new z_(e);
}
function G_(e) {
  this._context = e;
}
G_.prototype = {
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
        jo(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function v3(e) {
  return new G_(e);
}
function K_(e) {
  this._context = e;
}
K_.prototype = {
  areaStart: Bo,
  areaEnd: Bo,
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
function E3(e) {
  return new K_(e);
}
function Wy(e) {
  return e < 0 ? -1 : 1;
}
function Yy(e, t, r) {
  var n = e._x1 - e._x0, a = t - e._x1, i = (e._y1 - e._y0) / (n || a < 0 && -0), o = (r - e._y1) / (a || n < 0 && -0), u = (i * a + o * n) / (n + a);
  return (Wy(i) + Wy(o)) * Math.min(Math.abs(i), Math.abs(o), 0.5 * Math.abs(u)) || 0;
}
function zy(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function zc(e, t, r) {
  var n = e._x0, a = e._y0, i = e._x1, o = e._y1, u = (i - n) / 3;
  e._context.bezierCurveTo(n + u, a + u * t, i - u, o - u * r, i, o);
}
function Fo(e) {
  this._context = e;
}
Fo.prototype = {
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
        zc(this, this._t0, zy(this, this._t0));
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
          this._point = 3, zc(this, zy(this, r = Yy(this, e, t)), r);
          break;
        default:
          zc(this, this._t0, r = Yy(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function V_(e) {
  this._context = new X_(e);
}
(V_.prototype = Object.create(Fo.prototype)).point = function(e, t) {
  Fo.prototype.point.call(this, t, e);
};
function X_(e) {
  this._context = e;
}
X_.prototype = {
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
function T3(e) {
  return new Fo(e);
}
function _3(e) {
  return new V_(e);
}
function Q_(e) {
  this._context = e;
}
Q_.prototype = {
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
        for (var n = Gy(e), a = Gy(t), i = 0, o = 1; o < r; ++i, ++o)
          this._context.bezierCurveTo(n[0][i], a[0][i], n[1][i], a[1][i], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function Gy(e) {
  var t, r = e.length - 1, n, a = new Array(r), i = new Array(r), o = new Array(r);
  for (a[0] = 0, i[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) a[t] = 1, i[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (a[r - 1] = 2, i[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = a[t] / i[t - 1], i[t] -= n, o[t] -= n * o[t - 1];
  for (a[r - 1] = o[r - 1] / i[r - 1], t = r - 2; t >= 0; --t) a[t] = (o[t] - a[t + 1]) / i[t];
  for (i[r - 1] = (e[r] + a[r - 1]) / 2, t = 0; t < r - 1; ++t) i[t] = 2 * e[t + 1] - a[t + 1];
  return [a, i];
}
function A3(e) {
  return new Q_(e);
}
function Ku(e, t) {
  this._context = e, this._t = t;
}
Ku.prototype = {
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
function O3(e) {
  return new Ku(e, 0.5);
}
function S3(e) {
  return new Ku(e, 0);
}
function x3(e) {
  return new Ku(e, 1);
}
function Vn(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, a, i = e[t[0]], o, u = i.length; r < o; ++r)
      for (a = i, i = e[t[r]], n = 0; n < u; ++n)
        i[n][1] += i[n][0] = isNaN(a[n][1]) ? a[n][0] : a[n][1];
}
function uh(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function w3(e, t) {
  return e[t];
}
function P3(e) {
  const t = [];
  return t.key = e, t;
}
function I3() {
  var e = Ce([]), t = uh, r = Vn, n = w3;
  function a(i) {
    var o = Array.from(e.apply(this, arguments), P3), u, s = o.length, c = -1, l;
    for (const f of i)
      for (u = 0, ++c; u < s; ++u)
        (o[u][c] = [0, +n(f, o[u].key, c, i)]).data = f;
    for (u = 0, l = Wp(t(o)); u < s; ++u)
      o[l[u]].index = u;
    return r(o, l), o;
  }
  return a.keys = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : Ce(Array.from(i)), a) : e;
  }, a.value = function(i) {
    return arguments.length ? (n = typeof i == "function" ? i : Ce(+i), a) : n;
  }, a.order = function(i) {
    return arguments.length ? (t = i == null ? uh : typeof i == "function" ? i : Ce(Array.from(i)), a) : t;
  }, a.offset = function(i) {
    return arguments.length ? (r = i ?? Vn, a) : r;
  }, a;
}
function C3(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, a = 0, i = e[0].length, o; a < i; ++a) {
      for (o = r = 0; r < n; ++r) o += e[r][a][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][a][1] /= o;
    }
    Vn(e, t);
  }
}
function N3(e, t) {
  if ((a = e.length) > 0) {
    for (var r = 0, n = e[t[0]], a, i = n.length; r < i; ++r) {
      for (var o = 0, u = 0; o < a; ++o) u += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2;
    }
    Vn(e, t);
  }
}
function R3(e, t) {
  if (!(!((o = e.length) > 0) || !((i = (a = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, a, i, o; n < i; ++n) {
      for (var u = 0, s = 0, c = 0; u < o; ++u) {
        for (var l = e[t[u]], f = l[n][1] || 0, h = l[n - 1][1] || 0, p = (f - h) / 2, g = 0; g < u; ++g) {
          var y = e[t[g]], m = y[n][1] || 0, v = y[n - 1][1] || 0;
          p += m - v;
        }
        s += f, c += p * f;
      }
      a[n - 1][1] += a[n - 1][0] = r, s && (r -= c / s);
    }
    a[n - 1][1] += a[n - 1][0] = r, Vn(e, t);
  }
}
function ci(e) {
  "@babel/helpers - typeof";
  return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ci(e);
}
var D3 = ["type", "size", "sizeType"];
function sh() {
  return sh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, sh.apply(this, arguments);
}
function Ky(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vy(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ky(Object(r), !0).forEach(function(n) {
      M3(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ky(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function M3(e, t, r) {
  return t = L3(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function L3(e) {
  var t = k3(e, "string");
  return ci(t) == "symbol" ? t : t + "";
}
function k3(e, t) {
  if (ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function B3(e, t) {
  if (e == null) return {};
  var r = j3(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function j3(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var Z_ = {
  symbolCircle: Yp,
  symbolCross: i3,
  symbolDiamond: u3,
  symbolSquare: s3,
  symbolStar: d3,
  symbolTriangle: h3,
  symbolWye: m3
}, F3 = Math.PI / 180, $3 = function(t) {
  var r = "symbol".concat(Yu(t));
  return Z_[r] || Yp;
}, U3 = function(t, r, n) {
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
      var a = 18 * F3;
      return 1.25 * t * t * (Math.tan(a) - Math.tan(a * 2) * Math.pow(Math.tan(a), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, H3 = function(t, r) {
  Z_["symbol".concat(Yu(t))] = r;
}, zp = function(t) {
  var r = t.type, n = r === void 0 ? "circle" : r, a = t.size, i = a === void 0 ? 64 : a, o = t.sizeType, u = o === void 0 ? "area" : o, s = B3(t, D3), c = Vy(Vy({}, s), {}, {
    type: n,
    size: i,
    sizeType: u
  }), l = function() {
    var m = $3(n), v = y3().type(m).size(U3(i, u, n));
    return v();
  }, f = c.className, h = c.cx, p = c.cy, g = le(c, !0);
  return h === +h && p === +p && i === +i ? /* @__PURE__ */ C.createElement("path", sh({}, g, {
    className: pe("recharts-symbols", f),
    transform: "translate(".concat(h, ", ").concat(p, ")"),
    d: l()
  })) : null;
};
zp.registerSymbol = H3;
function Xn(e) {
  "@babel/helpers - typeof";
  return Xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xn(e);
}
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
function Xy(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function q3(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Xy(Object(r), !0).forEach(function(n) {
      li(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xy(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function W3(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Y3(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, eA(n.key), n);
  }
}
function z3(e, t, r) {
  return t && Y3(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function G3(e, t, r) {
  return t = $o(t), K3(e, J_() ? Reflect.construct(t, r || [], $o(e).constructor) : t.apply(e, r));
}
function K3(e, t) {
  if (t && (Xn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return V3(e);
}
function V3(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function J_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (J_ = function() {
    return !!e;
  })();
}
function $o(e) {
  return $o = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, $o(e);
}
function X3(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && lh(e, t);
}
function lh(e, t) {
  return lh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, lh(e, t);
}
function li(e, t, r) {
  return t = eA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function eA(e) {
  var t = Q3(e, "string");
  return Xn(t) == "symbol" ? t : t + "";
}
function Q3(e, t) {
  if (Xn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Xn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ct = 32, Gp = /* @__PURE__ */ (function(e) {
  function t() {
    return W3(this, t), G3(this, t, arguments);
  }
  return X3(t, e), z3(t, [{
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
          var c = q3({}, n);
          return delete c.legendIcon, /* @__PURE__ */ C.cloneElement(n.legendIcon, c);
        }
        return /* @__PURE__ */ C.createElement(zp, {
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
        var y = p.formatter || s, m = pe(li(li({
          "recharts-legend-item": !0
        }, "legend-item-".concat(g), !0), "inactive", p.inactive));
        if (p.type === "none")
          return null;
        var v = de(p.value) ? null : p.value;
        zt(
          !de(p.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var E = p.inactive ? c : p.color;
        return /* @__PURE__ */ C.createElement("li", ch({
          className: m,
          style: f,
          key: "legend-item-".concat(g)
        }, yn(n.props, p, g)), /* @__PURE__ */ C.createElement(rh, {
          width: o,
          height: o,
          viewBox: l,
          style: h
        }, n.renderIcon(p)), /* @__PURE__ */ C.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: E
          }
        }, y ? y(v, p, g) : v));
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
li(Gp, "displayName", "Legend");
li(Gp, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Gc, Qy;
function Z3() {
  if (Qy) return Gc;
  Qy = 1;
  var e = Hu();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return Gc = t, Gc;
}
var Kc, Zy;
function J3() {
  if (Zy) return Kc;
  Zy = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return Kc = e, Kc;
}
var Vc, Jy;
function eR() {
  if (Jy) return Vc;
  Jy = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return Vc = e, Vc;
}
var Xc, eb;
function tR() {
  if (eb) return Xc;
  eb = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Xc = e, Xc;
}
var Qc, tb;
function rR() {
  if (tb) return Qc;
  tb = 1;
  var e = Hu(), t = Bp(), r = jp(), n = 200;
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
  return Qc = a, Qc;
}
var Zc, rb;
function tA() {
  if (rb) return Zc;
  rb = 1;
  var e = Hu(), t = Z3(), r = J3(), n = eR(), a = tR(), i = rR();
  function o(u) {
    var s = this.__data__ = new e(u);
    this.size = s.size;
  }
  return o.prototype.clear = t, o.prototype.delete = r, o.prototype.get = n, o.prototype.has = a, o.prototype.set = i, Zc = o, Zc;
}
var Jc, nb;
function nR() {
  if (nb) return Jc;
  nb = 1;
  var e = "__lodash_hash_undefined__";
  function t(r) {
    return this.__data__.set(r, e), this;
  }
  return Jc = t, Jc;
}
var el, ab;
function aR() {
  if (ab) return el;
  ab = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return el = e, el;
}
var tl, ib;
function rA() {
  if (ib) return tl;
  ib = 1;
  var e = jp(), t = nR(), r = aR();
  function n(a) {
    var i = -1, o = a == null ? 0 : a.length;
    for (this.__data__ = new e(); ++i < o; )
      this.add(a[i]);
  }
  return n.prototype.add = n.prototype.push = t, n.prototype.has = r, tl = n, tl;
}
var rl, ob;
function nA() {
  if (ob) return rl;
  ob = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length; ++n < a; )
      if (r(t[n], n, t))
        return !0;
    return !1;
  }
  return rl = e, rl;
}
var nl, ub;
function aA() {
  if (ub) return nl;
  ub = 1;
  function e(t, r) {
    return t.has(r);
  }
  return nl = e, nl;
}
var al, sb;
function iA() {
  if (sb) return al;
  sb = 1;
  var e = rA(), t = nA(), r = aA(), n = 1, a = 2;
  function i(o, u, s, c, l, f) {
    var h = s & n, p = o.length, g = u.length;
    if (p != g && !(h && g > p))
      return !1;
    var y = f.get(o), m = f.get(u);
    if (y && m)
      return y == u && m == o;
    var v = -1, E = !0, _ = s & a ? new e() : void 0;
    for (f.set(o, u), f.set(u, o); ++v < p; ) {
      var A = o[v], b = u[v];
      if (c)
        var T = h ? c(b, A, v, u, o, f) : c(A, b, v, o, u, f);
      if (T !== void 0) {
        if (T)
          continue;
        E = !1;
        break;
      }
      if (_) {
        if (!t(u, function(O, I) {
          if (!r(_, I) && (A === O || l(A, O, s, c, f)))
            return _.push(I);
        })) {
          E = !1;
          break;
        }
      } else if (!(A === b || l(A, b, s, c, f))) {
        E = !1;
        break;
      }
    }
    return f.delete(o), f.delete(u), E;
  }
  return al = i, al;
}
var il, cb;
function iR() {
  if (cb) return il;
  cb = 1;
  var e = or(), t = e.Uint8Array;
  return il = t, il;
}
var ol, lb;
function oR() {
  if (lb) return ol;
  lb = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(a, i) {
      n[++r] = [i, a];
    }), n;
  }
  return ol = e, ol;
}
var ul, fb;
function Kp() {
  if (fb) return ul;
  fb = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(a) {
      n[++r] = a;
    }), n;
  }
  return ul = e, ul;
}
var sl, db;
function uR() {
  if (db) return sl;
  db = 1;
  var e = zi(), t = iR(), r = kp(), n = iA(), a = oR(), i = Kp(), o = 1, u = 2, s = "[object Boolean]", c = "[object Date]", l = "[object Error]", f = "[object Map]", h = "[object Number]", p = "[object RegExp]", g = "[object Set]", y = "[object String]", m = "[object Symbol]", v = "[object ArrayBuffer]", E = "[object DataView]", _ = e ? e.prototype : void 0, A = _ ? _.valueOf : void 0;
  function b(T, O, I, N, j, D, R) {
    switch (I) {
      case E:
        if (T.byteLength != O.byteLength || T.byteOffset != O.byteOffset)
          return !1;
        T = T.buffer, O = O.buffer;
      case v:
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
        var F = N & o;
        if (B || (B = i), T.size != O.size && !F)
          return !1;
        var $ = R.get(T);
        if ($)
          return $ == O;
        N |= u, R.set(T, O);
        var q = n(B(T), B(O), N, j, D, R);
        return R.delete(T), q;
      case m:
        if (A)
          return A.call(T) == A.call(O);
    }
    return !1;
  }
  return sl = b, sl;
}
var cl, hb;
function oA() {
  if (hb) return cl;
  hb = 1;
  function e(t, r) {
    for (var n = -1, a = r.length, i = t.length; ++n < a; )
      t[i + n] = r[n];
    return t;
  }
  return cl = e, cl;
}
var ll, pb;
function sR() {
  if (pb) return ll;
  pb = 1;
  var e = oA(), t = Tt();
  function r(n, a, i) {
    var o = a(n);
    return t(n) ? o : e(o, i(n));
  }
  return ll = r, ll;
}
var fl, mb;
function cR() {
  if (mb) return fl;
  mb = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length, i = 0, o = []; ++n < a; ) {
      var u = t[n];
      r(u, n, t) && (o[i++] = u);
    }
    return o;
  }
  return fl = e, fl;
}
var dl, yb;
function lR() {
  if (yb) return dl;
  yb = 1;
  function e() {
    return [];
  }
  return dl = e, dl;
}
var hl, bb;
function fR() {
  if (bb) return hl;
  bb = 1;
  var e = cR(), t = lR(), r = Object.prototype, n = r.propertyIsEnumerable, a = Object.getOwnPropertySymbols, i = a ? function(o) {
    return o == null ? [] : (o = Object(o), e(a(o), function(u) {
      return n.call(o, u);
    }));
  } : t;
  return hl = i, hl;
}
var pl, gb;
function dR() {
  if (gb) return pl;
  gb = 1;
  function e(t, r) {
    for (var n = -1, a = Array(t); ++n < t; )
      a[n] = r(n);
    return a;
  }
  return pl = e, pl;
}
var ml, vb;
function hR() {
  if (vb) return ml;
  vb = 1;
  var e = xr(), t = wr(), r = "[object Arguments]";
  function n(a) {
    return t(a) && e(a) == r;
  }
  return ml = n, ml;
}
var yl, Eb;
function Vp() {
  if (Eb) return yl;
  Eb = 1;
  var e = hR(), t = wr(), r = Object.prototype, n = r.hasOwnProperty, a = r.propertyIsEnumerable, i = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(o) {
    return t(o) && n.call(o, "callee") && !a.call(o, "callee");
  };
  return yl = i, yl;
}
var Wa = { exports: {} }, bl, Tb;
function pR() {
  if (Tb) return bl;
  Tb = 1;
  function e() {
    return !1;
  }
  return bl = e, bl;
}
Wa.exports;
var _b;
function uA() {
  return _b || (_b = 1, (function(e, t) {
    var r = or(), n = pR(), a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, o = i && i.exports === a, u = o ? r.Buffer : void 0, s = u ? u.isBuffer : void 0, c = s || n;
    e.exports = c;
  })(Wa, Wa.exports)), Wa.exports;
}
var gl, Ab;
function Xp() {
  if (Ab) return gl;
  Ab = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function r(n, a) {
    var i = typeof n;
    return a = a ?? e, !!a && (i == "number" || i != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < a;
  }
  return gl = r, gl;
}
var vl, Ob;
function Qp() {
  if (Ob) return vl;
  Ob = 1;
  var e = 9007199254740991;
  function t(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
  }
  return vl = t, vl;
}
var El, Sb;
function mR() {
  if (Sb) return El;
  Sb = 1;
  var e = xr(), t = Qp(), r = wr(), n = "[object Arguments]", a = "[object Array]", i = "[object Boolean]", o = "[object Date]", u = "[object Error]", s = "[object Function]", c = "[object Map]", l = "[object Number]", f = "[object Object]", h = "[object RegExp]", p = "[object Set]", g = "[object String]", y = "[object WeakMap]", m = "[object ArrayBuffer]", v = "[object DataView]", E = "[object Float32Array]", _ = "[object Float64Array]", A = "[object Int8Array]", b = "[object Int16Array]", T = "[object Int32Array]", O = "[object Uint8Array]", I = "[object Uint8ClampedArray]", N = "[object Uint16Array]", j = "[object Uint32Array]", D = {};
  D[E] = D[_] = D[A] = D[b] = D[T] = D[O] = D[I] = D[N] = D[j] = !0, D[n] = D[a] = D[m] = D[i] = D[v] = D[o] = D[u] = D[s] = D[c] = D[l] = D[f] = D[h] = D[p] = D[g] = D[y] = !1;
  function R(B) {
    return r(B) && t(B.length) && !!D[e(B)];
  }
  return El = R, El;
}
var Tl, xb;
function sA() {
  if (xb) return Tl;
  xb = 1;
  function e(t) {
    return function(r) {
      return t(r);
    };
  }
  return Tl = e, Tl;
}
var Ya = { exports: {} };
Ya.exports;
var wb;
function yR() {
  return wb || (wb = 1, (function(e, t) {
    var r = P_(), n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, i = a && a.exports === n, o = i && r.process, u = (function() {
      try {
        var s = a && a.require && a.require("util").types;
        return s || o && o.binding && o.binding("util");
      } catch {
      }
    })();
    e.exports = u;
  })(Ya, Ya.exports)), Ya.exports;
}
var _l, Pb;
function cA() {
  if (Pb) return _l;
  Pb = 1;
  var e = mR(), t = sA(), r = yR(), n = r && r.isTypedArray, a = n ? t(n) : e;
  return _l = a, _l;
}
var Al, Ib;
function bR() {
  if (Ib) return Al;
  Ib = 1;
  var e = dR(), t = Vp(), r = Tt(), n = uA(), a = Xp(), i = cA(), o = Object.prototype, u = o.hasOwnProperty;
  function s(c, l) {
    var f = r(c), h = !f && t(c), p = !f && !h && n(c), g = !f && !h && !p && i(c), y = f || h || p || g, m = y ? e(c.length, String) : [], v = m.length;
    for (var E in c)
      (l || u.call(c, E)) && !(y && // Safari 9 has enumerable `arguments.length` in strict mode.
      (E == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      p && (E == "offset" || E == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      g && (E == "buffer" || E == "byteLength" || E == "byteOffset") || // Skip index properties.
      a(E, v))) && m.push(E);
    return m;
  }
  return Al = s, Al;
}
var Ol, Cb;
function gR() {
  if (Cb) return Ol;
  Cb = 1;
  var e = Object.prototype;
  function t(r) {
    var n = r && r.constructor, a = typeof n == "function" && n.prototype || e;
    return r === a;
  }
  return Ol = t, Ol;
}
var Sl, Nb;
function lA() {
  if (Nb) return Sl;
  Nb = 1;
  function e(t, r) {
    return function(n) {
      return t(r(n));
    };
  }
  return Sl = e, Sl;
}
var xl, Rb;
function vR() {
  if (Rb) return xl;
  Rb = 1;
  var e = lA(), t = e(Object.keys, Object);
  return xl = t, xl;
}
var wl, Db;
function ER() {
  if (Db) return wl;
  Db = 1;
  var e = gR(), t = vR(), r = Object.prototype, n = r.hasOwnProperty;
  function a(i) {
    if (!e(i))
      return t(i);
    var o = [];
    for (var u in Object(i))
      n.call(i, u) && u != "constructor" && o.push(u);
    return o;
  }
  return wl = a, wl;
}
var Pl, Mb;
function Vi() {
  if (Mb) return Pl;
  Mb = 1;
  var e = Lp(), t = Qp();
  function r(n) {
    return n != null && t(n.length) && !e(n);
  }
  return Pl = r, Pl;
}
var Il, Lb;
function Vu() {
  if (Lb) return Il;
  Lb = 1;
  var e = bR(), t = ER(), r = Vi();
  function n(a) {
    return r(a) ? e(a) : t(a);
  }
  return Il = n, Il;
}
var Cl, kb;
function TR() {
  if (kb) return Cl;
  kb = 1;
  var e = sR(), t = fR(), r = Vu();
  function n(a) {
    return e(a, r, t);
  }
  return Cl = n, Cl;
}
var Nl, Bb;
function _R() {
  if (Bb) return Nl;
  Bb = 1;
  var e = TR(), t = 1, r = Object.prototype, n = r.hasOwnProperty;
  function a(i, o, u, s, c, l) {
    var f = u & t, h = e(i), p = h.length, g = e(o), y = g.length;
    if (p != y && !f)
      return !1;
    for (var m = p; m--; ) {
      var v = h[m];
      if (!(f ? v in o : n.call(o, v)))
        return !1;
    }
    var E = l.get(i), _ = l.get(o);
    if (E && _)
      return E == o && _ == i;
    var A = !0;
    l.set(i, o), l.set(o, i);
    for (var b = f; ++m < p; ) {
      v = h[m];
      var T = i[v], O = o[v];
      if (s)
        var I = f ? s(O, T, v, o, i, l) : s(T, O, v, i, o, l);
      if (!(I === void 0 ? T === O || c(T, O, u, s, l) : I)) {
        A = !1;
        break;
      }
      b || (b = v == "constructor");
    }
    if (A && !b) {
      var N = i.constructor, j = o.constructor;
      N != j && "constructor" in i && "constructor" in o && !(typeof N == "function" && N instanceof N && typeof j == "function" && j instanceof j) && (A = !1);
    }
    return l.delete(i), l.delete(o), A;
  }
  return Nl = a, Nl;
}
var Rl, jb;
function AR() {
  if (jb) return Rl;
  jb = 1;
  var e = An(), t = or(), r = e(t, "DataView");
  return Rl = r, Rl;
}
var Dl, Fb;
function OR() {
  if (Fb) return Dl;
  Fb = 1;
  var e = An(), t = or(), r = e(t, "Promise");
  return Dl = r, Dl;
}
var Ml, $b;
function fA() {
  if ($b) return Ml;
  $b = 1;
  var e = An(), t = or(), r = e(t, "Set");
  return Ml = r, Ml;
}
var Ll, Ub;
function SR() {
  if (Ub) return Ll;
  Ub = 1;
  var e = An(), t = or(), r = e(t, "WeakMap");
  return Ll = r, Ll;
}
var kl, Hb;
function xR() {
  if (Hb) return kl;
  Hb = 1;
  var e = AR(), t = Bp(), r = OR(), n = fA(), a = SR(), i = xr(), o = I_(), u = "[object Map]", s = "[object Object]", c = "[object Promise]", l = "[object Set]", f = "[object WeakMap]", h = "[object DataView]", p = o(e), g = o(t), y = o(r), m = o(n), v = o(a), E = i;
  return (e && E(new e(new ArrayBuffer(1))) != h || t && E(new t()) != u || r && E(r.resolve()) != c || n && E(new n()) != l || a && E(new a()) != f) && (E = function(_) {
    var A = i(_), b = A == s ? _.constructor : void 0, T = b ? o(b) : "";
    if (T)
      switch (T) {
        case p:
          return h;
        case g:
          return u;
        case y:
          return c;
        case m:
          return l;
        case v:
          return f;
      }
    return A;
  }), kl = E, kl;
}
var Bl, qb;
function wR() {
  if (qb) return Bl;
  qb = 1;
  var e = tA(), t = iA(), r = uR(), n = _R(), a = xR(), i = Tt(), o = uA(), u = cA(), s = 1, c = "[object Arguments]", l = "[object Array]", f = "[object Object]", h = Object.prototype, p = h.hasOwnProperty;
  function g(y, m, v, E, _, A) {
    var b = i(y), T = i(m), O = b ? l : a(y), I = T ? l : a(m);
    O = O == c ? f : O, I = I == c ? f : I;
    var N = O == f, j = I == f, D = O == I;
    if (D && o(y)) {
      if (!o(m))
        return !1;
      b = !0, N = !1;
    }
    if (D && !N)
      return A || (A = new e()), b || u(y) ? t(y, m, v, E, _, A) : r(y, m, O, v, E, _, A);
    if (!(v & s)) {
      var R = N && p.call(y, "__wrapped__"), B = j && p.call(m, "__wrapped__");
      if (R || B) {
        var F = R ? y.value() : y, $ = B ? m.value() : m;
        return A || (A = new e()), _(F, $, v, E, A);
      }
    }
    return D ? (A || (A = new e()), n(y, m, v, E, _, A)) : !1;
  }
  return Bl = g, Bl;
}
var jl, Wb;
function Zp() {
  if (Wb) return jl;
  Wb = 1;
  var e = wR(), t = wr();
  function r(n, a, i, o, u) {
    return n === a ? !0 : n == null || a == null || !t(n) && !t(a) ? n !== n && a !== a : e(n, a, i, o, r, u);
  }
  return jl = r, jl;
}
var Fl, Yb;
function PR() {
  if (Yb) return Fl;
  Yb = 1;
  var e = tA(), t = Zp(), r = 1, n = 2;
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
          var v = s(g, y, p, i, o, m);
        if (!(v === void 0 ? t(y, g, r | n, s, m) : v))
          return !1;
      }
    }
    return !0;
  }
  return Fl = a, Fl;
}
var $l, zb;
function dA() {
  if (zb) return $l;
  zb = 1;
  var e = zr();
  function t(r) {
    return r === r && !e(r);
  }
  return $l = t, $l;
}
var Ul, Gb;
function IR() {
  if (Gb) return Ul;
  Gb = 1;
  var e = dA(), t = Vu();
  function r(n) {
    for (var a = t(n), i = a.length; i--; ) {
      var o = a[i], u = n[o];
      a[i] = [o, u, e(u)];
    }
    return a;
  }
  return Ul = r, Ul;
}
var Hl, Kb;
function hA() {
  if (Kb) return Hl;
  Kb = 1;
  function e(t, r) {
    return function(n) {
      return n == null ? !1 : n[t] === r && (r !== void 0 || t in Object(n));
    };
  }
  return Hl = e, Hl;
}
var ql, Vb;
function CR() {
  if (Vb) return ql;
  Vb = 1;
  var e = PR(), t = IR(), r = hA();
  function n(a) {
    var i = t(a);
    return i.length == 1 && i[0][2] ? r(i[0][0], i[0][1]) : function(o) {
      return o === a || e(o, a, i);
    };
  }
  return ql = n, ql;
}
var Wl, Xb;
function NR() {
  if (Xb) return Wl;
  Xb = 1;
  function e(t, r) {
    return t != null && r in Object(t);
  }
  return Wl = e, Wl;
}
var Yl, Qb;
function RR() {
  if (Qb) return Yl;
  Qb = 1;
  var e = R_(), t = Vp(), r = Tt(), n = Xp(), a = Qp(), i = Wu();
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
  return Yl = o, Yl;
}
var zl, Zb;
function DR() {
  if (Zb) return zl;
  Zb = 1;
  var e = NR(), t = RR();
  function r(n, a) {
    return n != null && t(n, a, e);
  }
  return zl = r, zl;
}
var Gl, Jb;
function MR() {
  if (Jb) return Gl;
  Jb = 1;
  var e = Zp(), t = D_(), r = DR(), n = Mp(), a = dA(), i = hA(), o = Wu(), u = 1, s = 2;
  function c(l, f) {
    return n(l) && a(f) ? i(o(l), f) : function(h) {
      var p = t(h, l);
      return p === void 0 && p === f ? r(h, l) : e(f, p, u | s);
    };
  }
  return Gl = c, Gl;
}
var Kl, eg;
function Aa() {
  if (eg) return Kl;
  eg = 1;
  function e(t) {
    return t;
  }
  return Kl = e, Kl;
}
var Vl, tg;
function LR() {
  if (tg) return Vl;
  tg = 1;
  function e(t) {
    return function(r) {
      return r?.[t];
    };
  }
  return Vl = e, Vl;
}
var Xl, rg;
function kR() {
  if (rg) return Xl;
  rg = 1;
  var e = $p();
  function t(r) {
    return function(n) {
      return e(n, r);
    };
  }
  return Xl = t, Xl;
}
var Ql, ng;
function BR() {
  if (ng) return Ql;
  ng = 1;
  var e = LR(), t = kR(), r = Mp(), n = Wu();
  function a(i) {
    return r(i) ? e(n(i)) : t(i);
  }
  return Ql = a, Ql;
}
var Zl, ag;
function ur() {
  if (ag) return Zl;
  ag = 1;
  var e = CR(), t = MR(), r = Aa(), n = Tt(), a = BR();
  function i(o) {
    return typeof o == "function" ? o : o == null ? r : typeof o == "object" ? n(o) ? t(o[0], o[1]) : e(o) : a(o);
  }
  return Zl = i, Zl;
}
var Jl, ig;
function pA() {
  if (ig) return Jl;
  ig = 1;
  function e(t, r, n, a) {
    for (var i = t.length, o = n + (a ? 1 : -1); a ? o-- : ++o < i; )
      if (r(t[o], o, t))
        return o;
    return -1;
  }
  return Jl = e, Jl;
}
var ef, og;
function jR() {
  if (og) return ef;
  og = 1;
  function e(t) {
    return t !== t;
  }
  return ef = e, ef;
}
var tf, ug;
function FR() {
  if (ug) return tf;
  ug = 1;
  function e(t, r, n) {
    for (var a = n - 1, i = t.length; ++a < i; )
      if (t[a] === r)
        return a;
    return -1;
  }
  return tf = e, tf;
}
var rf, sg;
function $R() {
  if (sg) return rf;
  sg = 1;
  var e = pA(), t = jR(), r = FR();
  function n(a, i, o) {
    return i === i ? r(a, i, o) : e(a, t, o);
  }
  return rf = n, rf;
}
var nf, cg;
function UR() {
  if (cg) return nf;
  cg = 1;
  var e = $R();
  function t(r, n) {
    var a = r == null ? 0 : r.length;
    return !!a && e(r, n, 0) > -1;
  }
  return nf = t, nf;
}
var af, lg;
function HR() {
  if (lg) return af;
  lg = 1;
  function e(t, r, n) {
    for (var a = -1, i = t == null ? 0 : t.length; ++a < i; )
      if (n(r, t[a]))
        return !0;
    return !1;
  }
  return af = e, af;
}
var of, fg;
function qR() {
  if (fg) return of;
  fg = 1;
  function e() {
  }
  return of = e, of;
}
var uf, dg;
function WR() {
  if (dg) return uf;
  dg = 1;
  var e = fA(), t = qR(), r = Kp(), n = 1 / 0, a = e && 1 / r(new e([, -0]))[1] == n ? function(i) {
    return new e(i);
  } : t;
  return uf = a, uf;
}
var sf, hg;
function YR() {
  if (hg) return sf;
  hg = 1;
  var e = rA(), t = UR(), r = HR(), n = aA(), a = WR(), i = Kp(), o = 200;
  function u(s, c, l) {
    var f = -1, h = t, p = s.length, g = !0, y = [], m = y;
    if (l)
      g = !1, h = r;
    else if (p >= o) {
      var v = c ? null : a(s);
      if (v)
        return i(v);
      g = !1, h = n, m = new e();
    } else
      m = c ? [] : y;
    e:
      for (; ++f < p; ) {
        var E = s[f], _ = c ? c(E) : E;
        if (E = l || E !== 0 ? E : 0, g && _ === _) {
          for (var A = m.length; A--; )
            if (m[A] === _)
              continue e;
          c && m.push(_), y.push(E);
        } else h(m, _, l) || (m !== y && m.push(_), y.push(E));
      }
    return y;
  }
  return sf = u, sf;
}
var cf, pg;
function zR() {
  if (pg) return cf;
  pg = 1;
  var e = ur(), t = YR();
  function r(n, a) {
    return n && n.length ? t(n, e(a, 2)) : [];
  }
  return cf = r, cf;
}
var GR = zR();
const mg = /* @__PURE__ */ xe(GR);
function mA(e, t, r) {
  return t === !0 ? mg(e, r) : de(t) ? mg(e, t) : e;
}
function Qn(e) {
  "@babel/helpers - typeof";
  return Qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qn(e);
}
var KR = ["ref"];
function yg(e, t) {
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
    t % 2 ? yg(Object(r), !0).forEach(function(n) {
      Xu(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function VR(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function bg(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, bA(n.key), n);
  }
}
function XR(e, t, r) {
  return t && bg(e.prototype, t), r && bg(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function QR(e, t, r) {
  return t = Uo(t), ZR(e, yA() ? Reflect.construct(t, r || [], Uo(e).constructor) : t.apply(e, r));
}
function ZR(e, t) {
  if (t && (Qn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return JR(e);
}
function JR(e) {
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
function Uo(e) {
  return Uo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Uo(e);
}
function eD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fh(e, t);
}
function fh(e, t) {
  return fh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, fh(e, t);
}
function Xu(e, t, r) {
  return t = bA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bA(e) {
  var t = tD(e, "string");
  return Qn(t) == "symbol" ? t : t + "";
}
function tD(e, t) {
  if (Qn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Qn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function rD(e, t) {
  if (e == null) return {};
  var r = nD(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function nD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function aD(e) {
  return e.value;
}
function iD(e, t) {
  if (/* @__PURE__ */ C.isValidElement(e))
    return /* @__PURE__ */ C.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ C.createElement(e, t);
  t.ref;
  var r = rD(t, KR);
  return /* @__PURE__ */ C.createElement(Gp, r);
}
var gg = 1, Ur = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    VR(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = QR(this, t, [].concat(a)), Xu(r, "lastBoundingBox", {
      width: -1,
      height: -1
    }), r;
  }
  return eD(t, e), XR(t, [{
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
      a ? (Math.abs(a.width - this.lastBoundingBox.width) > gg || Math.abs(a.height - this.lastBoundingBox.height) > gg) && (this.lastBoundingBox.width = a.width, this.lastBoundingBox.height = a.height, n && n(a)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null));
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
      }, iD(i, lr(lr({}, this.props), {}, {
        payload: mA(l, c, aD)
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
Xu(Ur, "displayName", "Legend");
Xu(Ur, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var lf, vg;
function oD() {
  if (vg) return lf;
  vg = 1;
  var e = zi(), t = Vp(), r = Tt(), n = e ? e.isConcatSpreadable : void 0;
  function a(i) {
    return r(i) || t(i) || !!(n && i && i[n]);
  }
  return lf = a, lf;
}
var ff, Eg;
function gA() {
  if (Eg) return ff;
  Eg = 1;
  var e = oA(), t = oD();
  function r(n, a, i, o, u) {
    var s = -1, c = n.length;
    for (i || (i = t), u || (u = []); ++s < c; ) {
      var l = n[s];
      a > 0 && i(l) ? a > 1 ? r(l, a - 1, i, o, u) : e(u, l) : o || (u[u.length] = l);
    }
    return u;
  }
  return ff = r, ff;
}
var df, Tg;
function uD() {
  if (Tg) return df;
  Tg = 1;
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
  return df = e, df;
}
var hf, _g;
function sD() {
  if (_g) return hf;
  _g = 1;
  var e = uD(), t = e();
  return hf = t, hf;
}
var pf, Ag;
function vA() {
  if (Ag) return pf;
  Ag = 1;
  var e = sD(), t = Vu();
  function r(n, a) {
    return n && e(n, a, t);
  }
  return pf = r, pf;
}
var mf, Og;
function cD() {
  if (Og) return mf;
  Og = 1;
  var e = Vi();
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
  return mf = t, mf;
}
var yf, Sg;
function Jp() {
  if (Sg) return yf;
  Sg = 1;
  var e = vA(), t = cD(), r = t(e);
  return yf = r, yf;
}
var bf, xg;
function EA() {
  if (xg) return bf;
  xg = 1;
  var e = Jp(), t = Vi();
  function r(n, a) {
    var i = -1, o = t(n) ? Array(n.length) : [];
    return e(n, function(u, s, c) {
      o[++i] = a(u, s, c);
    }), o;
  }
  return bf = r, bf;
}
var gf, wg;
function lD() {
  if (wg) return gf;
  wg = 1;
  function e(t, r) {
    var n = t.length;
    for (t.sort(r); n--; )
      t[n] = t[n].value;
    return t;
  }
  return gf = e, gf;
}
var vf, Pg;
function fD() {
  if (Pg) return vf;
  Pg = 1;
  var e = Ta();
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
  return vf = t, vf;
}
var Ef, Ig;
function dD() {
  if (Ig) return Ef;
  Ig = 1;
  var e = fD();
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
  return Ef = t, Ef;
}
var Tf, Cg;
function hD() {
  if (Cg) return Tf;
  Cg = 1;
  var e = Fp(), t = $p(), r = ur(), n = EA(), a = lD(), i = sA(), o = dD(), u = Aa(), s = Tt();
  function c(l, f, h) {
    f.length ? f = e(f, function(y) {
      return s(y) ? function(m) {
        return t(m, y.length === 1 ? y[0] : y);
      } : y;
    }) : f = [u];
    var p = -1;
    f = e(f, i(r));
    var g = n(l, function(y, m, v) {
      var E = e(f, function(_) {
        return _(y);
      });
      return { criteria: E, index: ++p, value: y };
    });
    return a(g, function(y, m) {
      return o(y, m, h);
    });
  }
  return Tf = c, Tf;
}
var _f, Ng;
function pD() {
  if (Ng) return _f;
  Ng = 1;
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
  return _f = e, _f;
}
var Af, Rg;
function mD() {
  if (Rg) return Af;
  Rg = 1;
  var e = pD(), t = Math.max;
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
  return Af = r, Af;
}
var Of, Dg;
function yD() {
  if (Dg) return Of;
  Dg = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return Of = e, Of;
}
var Sf, Mg;
function TA() {
  if (Mg) return Sf;
  Mg = 1;
  var e = An(), t = (function() {
    try {
      var r = e(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  })();
  return Sf = t, Sf;
}
var xf, Lg;
function bD() {
  if (Lg) return xf;
  Lg = 1;
  var e = yD(), t = TA(), r = Aa(), n = t ? function(a, i) {
    return t(a, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(i),
      writable: !0
    });
  } : r;
  return xf = n, xf;
}
var wf, kg;
function gD() {
  if (kg) return wf;
  kg = 1;
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
  return wf = n, wf;
}
var Pf, Bg;
function vD() {
  if (Bg) return Pf;
  Bg = 1;
  var e = bD(), t = gD(), r = t(e);
  return Pf = r, Pf;
}
var If, jg;
function ED() {
  if (jg) return If;
  jg = 1;
  var e = Aa(), t = mD(), r = vD();
  function n(a, i) {
    return r(t(a, i, e), a + "");
  }
  return If = n, If;
}
var Cf, Fg;
function Qu() {
  if (Fg) return Cf;
  Fg = 1;
  var e = kp(), t = Vi(), r = Xp(), n = zr();
  function a(i, o, u) {
    if (!n(u))
      return !1;
    var s = typeof o;
    return (s == "number" ? t(u) && r(o, u.length) : s == "string" && o in u) ? e(u[o], i) : !1;
  }
  return Cf = a, Cf;
}
var Nf, $g;
function TD() {
  if ($g) return Nf;
  $g = 1;
  var e = gA(), t = hD(), r = ED(), n = Qu(), a = r(function(i, o) {
    if (i == null)
      return [];
    var u = o.length;
    return u > 1 && n(i, o[0], o[1]) ? o = [] : u > 2 && n(o[0], o[1], o[2]) && (o = [o[0]]), t(i, e(o, 1), []);
  });
  return Nf = a, Nf;
}
var _D = TD();
const e0 = /* @__PURE__ */ xe(_D);
function fi(e) {
  "@babel/helpers - typeof";
  return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fi(e);
}
function dh() {
  return dh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, dh.apply(this, arguments);
}
function AD(e, t) {
  return wD(e) || xD(e, t) || SD(e, t) || OD();
}
function OD() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function SD(e, t) {
  if (e) {
    if (typeof e == "string") return Ug(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ug(e, t);
  }
}
function Ug(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function xD(e, t) {
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
function wD(e) {
  if (Array.isArray(e)) return e;
}
function Hg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Rf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hg(Object(r), !0).forEach(function(n) {
      PD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function PD(e, t, r) {
  return t = ID(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ID(e) {
  var t = CD(e, "string");
  return fi(t) == "symbol" ? t : t + "";
}
function CD(e, t) {
  if (fi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ND(e) {
  return Array.isArray(e) && ze(e[0]) && ze(e[1]) ? e.join(" ~ ") : e;
}
var RD = function(t) {
  var r = t.separator, n = r === void 0 ? " : " : r, a = t.contentStyle, i = a === void 0 ? {} : a, o = t.itemStyle, u = o === void 0 ? {} : o, s = t.labelStyle, c = s === void 0 ? {} : s, l = t.payload, f = t.formatter, h = t.itemSorter, p = t.wrapperClassName, g = t.labelClassName, y = t.label, m = t.labelFormatter, v = t.accessibilityLayer, E = v === void 0 ? !1 : v, _ = function() {
    if (l && l.length) {
      var R = {
        padding: 0,
        margin: 0
      }, B = (h ? e0(l, h) : l).map(function(F, $) {
        if (F.type === "none")
          return null;
        var q = Rf({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: F.color || "#000"
        }, u), Y = F.formatter || f || ND, Q = F.value, te = F.name, k = Q, W = te;
        if (Y && k != null && W != null) {
          var z = Y(Q, te, F, $, l);
          if (Array.isArray(z)) {
            var Z = AD(z, 2);
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
  }, A = Rf({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, i), b = Rf({
    margin: 0
  }, c), T = !me(y), O = T ? y : "", I = pe("recharts-default-tooltip", p), N = pe("recharts-tooltip-label", g);
  T && m && l !== void 0 && l !== null && (O = m(y, l));
  var j = E ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ C.createElement("div", dh({
    className: I,
    style: A
  }, j), /* @__PURE__ */ C.createElement("p", {
    className: N,
    style: b
  }, /* @__PURE__ */ C.isValidElement(O) ? O : "".concat(O)), _());
};
function di(e) {
  "@babel/helpers - typeof";
  return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, di(e);
}
function lo(e, t, r) {
  return t = DD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function DD(e) {
  var t = MD(e, "string");
  return di(t) == "symbol" ? t : t + "";
}
function MD(e, t) {
  if (di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Da = "recharts-tooltip-wrapper", LD = {
  visibility: "hidden"
};
function kD(e) {
  var t = e.coordinate, r = e.translateX, n = e.translateY;
  return pe(Da, lo(lo(lo(lo({}, "".concat(Da, "-right"), J(r) && t && J(t.x) && r >= t.x), "".concat(Da, "-left"), J(r) && t && J(t.x) && r < t.x), "".concat(Da, "-bottom"), J(n) && t && J(t.y) && n >= t.y), "".concat(Da, "-top"), J(n) && t && J(t.y) && n < t.y));
}
function qg(e) {
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
function BD(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function jD(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTopLeft, a = e.position, i = e.reverseDirection, o = e.tooltipBox, u = e.useTranslate3d, s = e.viewBox, c, l, f;
  return o.height > 0 && o.width > 0 && r ? (l = qg({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: o.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), f = qg({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: o.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), c = BD({
    translateX: l,
    translateY: f,
    useTranslate3d: u
  })) : c = LD, {
    cssProperties: c,
    cssClasses: kD({
      translateX: l,
      translateY: f,
      coordinate: r
    })
  };
}
function Zn(e) {
  "@babel/helpers - typeof";
  return Zn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Zn(e);
}
function Wg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Yg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wg(Object(r), !0).forEach(function(n) {
      ph(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function FD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function $D(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, AA(n.key), n);
  }
}
function UD(e, t, r) {
  return t && $D(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function HD(e, t, r) {
  return t = Ho(t), qD(e, _A() ? Reflect.construct(t, r || [], Ho(e).constructor) : t.apply(e, r));
}
function qD(e, t) {
  if (t && (Zn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return WD(e);
}
function WD(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _A() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (_A = function() {
    return !!e;
  })();
}
function Ho(e) {
  return Ho = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ho(e);
}
function YD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && hh(e, t);
}
function hh(e, t) {
  return hh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, hh(e, t);
}
function ph(e, t, r) {
  return t = AA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function AA(e) {
  var t = zD(e, "string");
  return Zn(t) == "symbol" ? t : t + "";
}
function zD(e, t) {
  if (Zn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Zn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var zg = 1, GD = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    FD(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = HD(this, t, [].concat(a)), ph(r, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), ph(r, "handleKeyDown", function(o) {
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
  return YD(t, e), UD(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        (Math.abs(n.width - this.state.lastBoundingBox.width) > zg || Math.abs(n.height - this.state.lastBoundingBox.height) > zg) && this.setState({
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
      var n = this, a = this.props, i = a.active, o = a.allowEscapeViewBox, u = a.animationDuration, s = a.animationEasing, c = a.children, l = a.coordinate, f = a.hasPayload, h = a.isAnimationActive, p = a.offset, g = a.position, y = a.reverseDirection, m = a.useTranslate3d, v = a.viewBox, E = a.wrapperStyle, _ = jD({
        allowEscapeViewBox: o,
        coordinate: l,
        offsetTopLeft: p,
        position: g,
        reverseDirection: y,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: m,
        viewBox: v
      }), A = _.cssClasses, b = _.cssProperties, T = Yg(Yg({
        transition: h && i ? "transform ".concat(u, "ms ").concat(s) : void 0
      }, b), {}, {
        pointerEvents: "none",
        visibility: !this.state.dismissed && i && f ? "visible" : "hidden",
        position: "absolute",
        top: 0,
        left: 0
      }, E);
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
})(ir), KD = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, Oa = {
  isSsr: KD()
};
function Jn(e) {
  "@babel/helpers - typeof";
  return Jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Jn(e);
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
function Kg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gg(Object(r), !0).forEach(function(n) {
      t0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function VD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function XD(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, SA(n.key), n);
  }
}
function QD(e, t, r) {
  return t && XD(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function ZD(e, t, r) {
  return t = qo(t), JD(e, OA() ? Reflect.construct(t, r || [], qo(e).constructor) : t.apply(e, r));
}
function JD(e, t) {
  if (t && (Jn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return e6(e);
}
function e6(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function OA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (OA = function() {
    return !!e;
  })();
}
function qo(e) {
  return qo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, qo(e);
}
function t6(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && mh(e, t);
}
function mh(e, t) {
  return mh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, mh(e, t);
}
function t0(e, t, r) {
  return t = SA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function SA(e) {
  var t = r6(e, "string");
  return Jn(t) == "symbol" ? t : t + "";
}
function r6(e, t) {
  if (Jn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Jn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function n6(e) {
  return e.dataKey;
}
function a6(e, t) {
  return /* @__PURE__ */ C.isValidElement(e) ? /* @__PURE__ */ C.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ C.createElement(e, t) : /* @__PURE__ */ C.createElement(RD, t);
}
var yt = /* @__PURE__ */ (function(e) {
  function t() {
    return VD(this, t), ZD(this, t, arguments);
  }
  return t6(t, e), QD(t, [{
    key: "render",
    value: function() {
      var n = this, a = this.props, i = a.active, o = a.allowEscapeViewBox, u = a.animationDuration, s = a.animationEasing, c = a.content, l = a.coordinate, f = a.filterNull, h = a.isAnimationActive, p = a.offset, g = a.payload, y = a.payloadUniqBy, m = a.position, v = a.reverseDirection, E = a.useTranslate3d, _ = a.viewBox, A = a.wrapperStyle, b = g ?? [];
      f && b.length && (b = mA(g.filter(function(O) {
        return O.value != null && (O.hide !== !0 || n.props.includeHidden);
      }), y, n6));
      var T = b.length > 0;
      return /* @__PURE__ */ C.createElement(GD, {
        allowEscapeViewBox: o,
        animationDuration: u,
        animationEasing: s,
        isAnimationActive: h,
        active: i,
        coordinate: l,
        hasPayload: T,
        offset: p,
        position: m,
        reverseDirection: v,
        useTranslate3d: E,
        viewBox: _,
        wrapperStyle: A
      }, a6(c, Kg(Kg({}, this.props), {}, {
        payload: b
      })));
    }
  }]);
})(ir);
t0(yt, "displayName", "Tooltip");
t0(yt, "defaultProps", {
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
  isAnimationActive: !Oa.isSsr,
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
var Df, Vg;
function i6() {
  if (Vg) return Df;
  Vg = 1;
  var e = or(), t = function() {
    return e.Date.now();
  };
  return Df = t, Df;
}
var Mf, Xg;
function o6() {
  if (Xg) return Mf;
  Xg = 1;
  var e = /\s/;
  function t(r) {
    for (var n = r.length; n-- && e.test(r.charAt(n)); )
      ;
    return n;
  }
  return Mf = t, Mf;
}
var Lf, Qg;
function u6() {
  if (Qg) return Lf;
  Qg = 1;
  var e = o6(), t = /^\s+/;
  function r(n) {
    return n && n.slice(0, e(n) + 1).replace(t, "");
  }
  return Lf = r, Lf;
}
var kf, Zg;
function xA() {
  if (Zg) return kf;
  Zg = 1;
  var e = u6(), t = zr(), r = Ta(), n = NaN, a = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, o = /^0o[0-7]+$/i, u = parseInt;
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
  return kf = s, kf;
}
var Bf, Jg;
function s6() {
  if (Jg) return Bf;
  Jg = 1;
  var e = zr(), t = i6(), r = xA(), n = "Expected a function", a = Math.max, i = Math.min;
  function o(u, s, c) {
    var l, f, h, p, g, y, m = 0, v = !1, E = !1, _ = !0;
    if (typeof u != "function")
      throw new TypeError(n);
    s = r(s) || 0, e(c) && (v = !!c.leading, E = "maxWait" in c, h = E ? a(r(c.maxWait) || 0, s) : h, _ = "trailing" in c ? !!c.trailing : _);
    function A(B) {
      var F = l, $ = f;
      return l = f = void 0, m = B, p = u.apply($, F), p;
    }
    function b(B) {
      return m = B, g = setTimeout(I, s), v ? A(B) : p;
    }
    function T(B) {
      var F = B - y, $ = B - m, q = s - F;
      return E ? i(q, h - $) : q;
    }
    function O(B) {
      var F = B - y, $ = B - m;
      return y === void 0 || F >= s || F < 0 || E && $ >= h;
    }
    function I() {
      var B = t();
      if (O(B))
        return N(B);
      g = setTimeout(I, T(B));
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
        if (E)
          return clearTimeout(g), g = setTimeout(I, s), A(y);
      }
      return g === void 0 && (g = setTimeout(I, s)), p;
    }
    return R.cancel = j, R.flush = D, R;
  }
  return Bf = o, Bf;
}
var jf, ev;
function c6() {
  if (ev) return jf;
  ev = 1;
  var e = s6(), t = zr(), r = "Expected a function";
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
  return jf = n, jf;
}
var l6 = c6();
const wA = /* @__PURE__ */ xe(l6);
function hi(e) {
  "@babel/helpers - typeof";
  return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hi(e);
}
function tv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tv(Object(r), !0).forEach(function(n) {
      f6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : tv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function f6(e, t, r) {
  return t = d6(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function d6(e) {
  var t = h6(e, "string");
  return hi(t) == "symbol" ? t : t + "";
}
function h6(e, t) {
  if (hi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (hi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function p6(e, t) {
  return g6(e) || b6(e, t) || y6(e, t) || m6();
}
function m6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function y6(e, t) {
  if (e) {
    if (typeof e == "string") return rv(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return rv(e, t);
  }
}
function rv(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function b6(e, t) {
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
function g6(e) {
  if (Array.isArray(e)) return e;
}
var Xi = /* @__PURE__ */ PT(function(e, t) {
  var r = e.aspect, n = e.initialDimension, a = n === void 0 ? {
    width: -1,
    height: -1
  } : n, i = e.width, o = i === void 0 ? "100%" : i, u = e.height, s = u === void 0 ? "100%" : u, c = e.minWidth, l = c === void 0 ? 0 : c, f = e.minHeight, h = e.maxHeight, p = e.children, g = e.debounce, y = g === void 0 ? 0 : g, m = e.id, v = e.className, E = e.onResize, _ = e.style, A = _ === void 0 ? {} : _, b = ii(null), T = ii();
  T.current = E, XS(t, function() {
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
  }), I = p6(O, 2), N = I[0], j = I[1], D = QS(function(B, F) {
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
      D(z, Z), (k = T.current) === null || k === void 0 || k.call(T, z, Z);
    };
    y > 0 && (B = wA(B, y, {
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
    zt(nn(o) || nn(s), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, o, s), zt(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var $ = nn(o) ? B : o, q = nn(s) ? F : s;
    r && r > 0 && ($ ? q = $ / r : q && ($ = q * r), h && q > h && (q = h)), zt($ > 0 || q > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, $, q, o, s, l, f, r);
    var Y = !Array.isArray(p) && vr(p.type).endsWith("Chart");
    return C.Children.map(p, function(Q) {
      return /* @__PURE__ */ C.isValidElement(Q) ? /* @__PURE__ */ Ue(Q, fo({
        width: $,
        height: q
      }, Y ? {
        style: fo({
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
    className: pe("recharts-responsive-container", v),
    style: fo(fo({}, A), {}, {
      width: o,
      height: s,
      minWidth: l,
      minHeight: f,
      maxHeight: h
    }),
    ref: b
  }, R);
}), Zu = function(t) {
  return null;
};
Zu.displayName = "Cell";
function pi(e) {
  "@babel/helpers - typeof";
  return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pi(e);
}
function nv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function yh(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nv(Object(r), !0).forEach(function(n) {
      v6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function v6(e, t, r) {
  return t = E6(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function E6(e) {
  var t = T6(e, "string");
  return pi(t) == "symbol" ? t : t + "";
}
function T6(e, t) {
  if (pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Cn = {
  widthCache: {},
  cacheCount: 0
}, _6 = 2e3, A6 = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, av = "recharts_measurement_span";
function O6(e) {
  var t = yh({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r];
  }), t;
}
var Za = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Oa.isSsr)
    return {
      width: 0,
      height: 0
    };
  var n = O6(r), a = JSON.stringify({
    text: t,
    copyStyle: n
  });
  if (Cn.widthCache[a])
    return Cn.widthCache[a];
  try {
    var i = document.getElementById(av);
    i || (i = document.createElement("span"), i.setAttribute("id", av), i.setAttribute("aria-hidden", "true"), document.body.appendChild(i));
    var o = yh(yh({}, A6), n);
    Object.assign(i.style, o), i.textContent = "".concat(t);
    var u = i.getBoundingClientRect(), s = {
      width: u.width,
      height: u.height
    };
    return Cn.widthCache[a] = s, ++Cn.cacheCount > _6 && (Cn.cacheCount = 0, Cn.widthCache = {}), s;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, S6 = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function mi(e) {
  "@babel/helpers - typeof";
  return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mi(e);
}
function Wo(e, t) {
  return I6(e) || P6(e, t) || w6(e, t) || x6();
}
function x6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function w6(e, t) {
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
function P6(e, t) {
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
function I6(e) {
  if (Array.isArray(e)) return e;
}
function C6(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function ov(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, R6(n.key), n);
  }
}
function N6(e, t, r) {
  return t && ov(e.prototype, t), r && ov(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
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
  return String(e);
}
var uv = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, sv = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, M6 = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, L6 = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, PA = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, k6 = Object.keys(PA), Bn = "NaN";
function B6(e, t) {
  return e * PA[t];
}
var ho = /* @__PURE__ */ (function() {
  function e(t, r) {
    C6(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !M6.test(r) && (this.num = NaN, this.unit = ""), k6.includes(r) && (this.num = B6(t, r), this.unit = "px");
  }
  return N6(e, [{
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
      var n, a = (n = L6.exec(r)) !== null && n !== void 0 ? n : [], i = Wo(a, 3), o = i[1], u = i[2];
      return new e(parseFloat(o), u ?? "");
    }
  }]);
})();
function IA(e) {
  if (e.includes(Bn))
    return Bn;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = uv.exec(t)) !== null && r !== void 0 ? r : [], a = Wo(n, 4), i = a[1], o = a[2], u = a[3], s = ho.parse(i ?? ""), c = ho.parse(u ?? ""), l = o === "*" ? s.multiply(c) : s.divide(c);
    if (l.isNaN())
      return Bn;
    t = t.replace(uv, l.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var f, h = (f = sv.exec(t)) !== null && f !== void 0 ? f : [], p = Wo(h, 4), g = p[1], y = p[2], m = p[3], v = ho.parse(g ?? ""), E = ho.parse(m ?? ""), _ = y === "+" ? v.add(E) : v.subtract(E);
    if (_.isNaN())
      return Bn;
    t = t.replace(sv, _.toString());
  }
  return t;
}
var cv = /\(([^()]*)\)/;
function j6(e) {
  for (var t = e; t.includes("("); ) {
    var r = cv.exec(t), n = Wo(r, 2), a = n[1];
    t = t.replace(cv, IA(a));
  }
  return t;
}
function F6(e) {
  var t = e.replace(/\s+/g, "");
  return t = j6(t), t = IA(t), t;
}
function $6(e) {
  try {
    return F6(e);
  } catch {
    return Bn;
  }
}
function Ff(e) {
  var t = $6(e.slice(5, -1));
  return t === Bn ? "" : t;
}
var U6 = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], H6 = ["dx", "dy", "angle", "className", "breakAll"];
function bh() {
  return bh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, bh.apply(this, arguments);
}
function lv(e, t) {
  if (e == null) return {};
  var r = q6(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function q6(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function fv(e, t) {
  return G6(e) || z6(e, t) || Y6(e, t) || W6();
}
function W6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Y6(e, t) {
  if (e) {
    if (typeof e == "string") return dv(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return dv(e, t);
  }
}
function dv(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function z6(e, t) {
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
function G6(e) {
  if (Array.isArray(e)) return e;
}
var CA = /[ \f\n\r\t\v\u2028\u2029]+/, NA = function(t) {
  var r = t.children, n = t.breakAll, a = t.style;
  try {
    var i = [];
    me(r) || (n ? i = r.toString().split("") : i = r.toString().split(CA));
    var o = i.map(function(s) {
      return {
        word: s,
        width: Za(s, a).width
      };
    }), u = n ? 0 : Za(" ", a).width;
    return {
      wordsWithComputedWidth: o,
      spaceWidth: u
    };
  } catch {
    return null;
  }
}, K6 = function(t, r, n, a, i) {
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
    var q = f.slice(0, $), Y = NA({
      breakAll: c,
      style: s,
      children: q + y
    }).wordsWithComputedWidth, Q = h(Y), te = Q.length > o || g(Q).width > Number(a);
    return [te, Q];
  }, v = 0, E = f.length - 1, _ = 0, A; v <= E && _ <= f.length - 1; ) {
    var b = Math.floor((v + E) / 2), T = b - 1, O = m(T), I = fv(O, 2), N = I[0], j = I[1], D = m(b), R = fv(D, 1), B = R[0];
    if (!N && !B && (v = b + 1), N && B && (E = b - 1), !N && B) {
      A = j;
      break;
    }
    _++;
  }
  return A || p;
}, hv = function(t) {
  var r = me(t) ? [] : t.toString().split(CA);
  return [{
    words: r
  }];
}, V6 = function(t) {
  var r = t.width, n = t.scaleToFit, a = t.children, i = t.style, o = t.breakAll, u = t.maxLines;
  if ((r || n) && !Oa.isSsr) {
    var s, c, l = NA({
      breakAll: o,
      children: a,
      style: i
    });
    if (l) {
      var f = l.wordsWithComputedWidth, h = l.spaceWidth;
      s = f, c = h;
    } else
      return hv(a);
    return K6({
      breakAll: o,
      children: a,
      maxLines: u,
      style: i
    }, s, c, r, n);
  }
  return hv(a);
}, pv = "#808080", bn = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, o = t.lineHeight, u = o === void 0 ? "1em" : o, s = t.capHeight, c = s === void 0 ? "0.71em" : s, l = t.scaleToFit, f = l === void 0 ? !1 : l, h = t.textAnchor, p = h === void 0 ? "start" : h, g = t.verticalAnchor, y = g === void 0 ? "end" : g, m = t.fill, v = m === void 0 ? pv : m, E = lv(t, U6), _ = Fr(function() {
    return V6({
      breakAll: E.breakAll,
      children: E.children,
      maxLines: E.maxLines,
      scaleToFit: f,
      style: E.style,
      width: E.width
    });
  }, [E.breakAll, E.children, E.maxLines, f, E.style, E.width]), A = E.dx, b = E.dy, T = E.angle, O = E.className, I = E.breakAll, N = lv(E, H6);
  if (!ze(n) || !ze(i))
    return null;
  var j = n + (J(A) ? A : 0), D = i + (J(b) ? b : 0), R;
  switch (y) {
    case "start":
      R = Ff("calc(".concat(c, ")"));
      break;
    case "middle":
      R = Ff("calc(".concat((_.length - 1) / 2, " * -").concat(u, " + (").concat(c, " / 2))"));
      break;
    default:
      R = Ff("calc(".concat(_.length - 1, " * -").concat(u, ")"));
      break;
  }
  var B = [];
  if (f) {
    var F = _[0].width, $ = E.width;
    B.push("scale(".concat((J($) ? $ / F : 1) / F, ")"));
  }
  return T && B.push("rotate(".concat(T, ", ").concat(j, ", ").concat(D, ")")), B.length && (N.transform = B.join(" ")), /* @__PURE__ */ C.createElement("text", bh({}, le(N, !0), {
    x: j,
    y: D,
    className: pe("recharts-text", O),
    textAnchor: p,
    fill: v.includes("url") ? pv : v
  }), _.map(function(q, Y) {
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
function Hr(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function X6(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function r0(e) {
  let t, r, n;
  e.length !== 2 ? (t = Hr, r = (u, s) => Hr(e(u), s), n = (u, s) => e(u) - s) : (t = e === Hr || e === X6 ? e : Q6, r = e, n = e);
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
function Q6() {
  return 0;
}
function RA(e) {
  return e === null ? NaN : +e;
}
function* Z6(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const J6 = r0(Hr), Qi = J6.right;
r0(RA).center;
class mv extends Map {
  constructor(t, r = rM) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, a] of t) this.set(n, a);
  }
  get(t) {
    return super.get(yv(this, t));
  }
  has(t) {
    return super.has(yv(this, t));
  }
  set(t, r) {
    return super.set(eM(this, t), r);
  }
  delete(t) {
    return super.delete(tM(this, t));
  }
}
function yv({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function eM({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function tM({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function rM(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function nM(e = Hr) {
  if (e === Hr) return DA;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function DA(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const aM = Math.sqrt(50), iM = Math.sqrt(10), oM = Math.sqrt(2);
function Yo(e, t, r) {
  const n = (t - e) / Math.max(0, r), a = Math.floor(Math.log10(n)), i = n / Math.pow(10, a), o = i >= aM ? 10 : i >= iM ? 5 : i >= oM ? 2 : 1;
  let u, s, c;
  return a < 0 ? (c = Math.pow(10, -a) / o, u = Math.round(e * c), s = Math.round(t * c), u / c < e && ++u, s / c > t && --s, c = -c) : (c = Math.pow(10, a) * o, u = Math.round(e / c), s = Math.round(t / c), u * c < e && ++u, s * c > t && --s), s < u && 0.5 <= r && r < 2 ? Yo(e, t, r * 2) : [u, s, c];
}
function gh(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [a, i, o] = n ? Yo(t, e, r) : Yo(e, t, r);
  if (!(i >= a)) return [];
  const u = i - a + 1, s = new Array(u);
  if (n)
    if (o < 0) for (let c = 0; c < u; ++c) s[c] = (i - c) / -o;
    else for (let c = 0; c < u; ++c) s[c] = (i - c) * o;
  else if (o < 0) for (let c = 0; c < u; ++c) s[c] = (a + c) / -o;
  else for (let c = 0; c < u; ++c) s[c] = (a + c) * o;
  return s;
}
function vh(e, t, r) {
  return t = +t, e = +e, r = +r, Yo(e, t, r)[2];
}
function Eh(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, a = n ? vh(t, e, r) : vh(e, t, r);
  return (n ? -1 : 1) * (a < 0 ? 1 / -a : a);
}
function bv(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function gv(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function MA(e, t, r = 0, n = 1 / 0, a) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (a = a === void 0 ? DA : nM(a); n > r; ) {
    if (n - r > 600) {
      const s = n - r + 1, c = t - r + 1, l = Math.log(s), f = 0.5 * Math.exp(2 * l / 3), h = 0.5 * Math.sqrt(l * f * (s - f) / s) * (c - s / 2 < 0 ? -1 : 1), p = Math.max(r, Math.floor(t - c * f / s + h)), g = Math.min(n, Math.floor(t + (s - c) * f / s + h));
      MA(e, t, p, g, a);
    }
    const i = e[t];
    let o = r, u = n;
    for (Ma(e, r, t), a(e[n], i) > 0 && Ma(e, r, n); o < u; ) {
      for (Ma(e, o, u), ++o, --u; a(e[o], i) < 0; ) ++o;
      for (; a(e[u], i) > 0; ) --u;
    }
    a(e[r], i) === 0 ? Ma(e, r, u) : (++u, Ma(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1);
  }
  return e;
}
function Ma(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function uM(e, t, r) {
  if (e = Float64Array.from(Z6(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return gv(e);
    if (t >= 1) return bv(e);
    var n, a = (n - 1) * t, i = Math.floor(a), o = bv(MA(e, i).subarray(0, i + 1)), u = gv(e.subarray(i + 1));
    return o + (u - o) * (a - i);
  }
}
function sM(e, t, r = RA) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, a = (n - 1) * t, i = Math.floor(a), o = +r(e[i], i, e), u = +r(e[i + 1], i + 1, e);
    return o + (u - o) * (a - i);
  }
}
function cM(e, t, r) {
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
const Th = /* @__PURE__ */ Symbol("implicit");
function n0() {
  var e = new mv(), t = [], r = [], n = Th;
  function a(i) {
    let o = e.get(i);
    if (o === void 0) {
      if (n !== Th) return n;
      e.set(i, o = t.push(i) - 1);
    }
    return r[o % r.length];
  }
  return a.domain = function(i) {
    if (!arguments.length) return t.slice();
    t = [], e = new mv();
    for (const o of i)
      e.has(o) || e.set(o, t.push(o) - 1);
    return a;
  }, a.range = function(i) {
    return arguments.length ? (r = Array.from(i), a) : r.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return n0(t, r).unknown(n);
  }, Ut.apply(a, arguments), a;
}
function yi() {
  var e = n0().unknown(void 0), t = e.domain, r = e.range, n = 0, a = 1, i, o, u = !1, s = 0, c = 0, l = 0.5;
  delete e.unknown;
  function f() {
    var h = t().length, p = a < n, g = p ? a : n, y = p ? n : a;
    i = (y - g) / Math.max(1, h - s + c * 2), u && (i = Math.floor(i)), g += (y - g - i * (h - s)) * l, o = i * (1 - s), u && (g = Math.round(g), o = Math.round(o));
    var m = cM(h).map(function(v) {
      return g + i * v;
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
    return yi(t(), [n, a]).round(u).paddingInner(s).paddingOuter(c).align(l);
  }, Ut.apply(f(), arguments);
}
function LA(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return LA(t());
  }, e;
}
function Ja() {
  return LA(yi.apply(null, arguments).paddingInner(1));
}
function a0(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function kA(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Zi() {
}
var bi = 0.7, zo = 1 / bi, Wn = "\\s*([+-]?\\d+)\\s*", gi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", rr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", lM = /^#([0-9a-f]{3,8})$/, fM = new RegExp(`^rgb\\(${Wn},${Wn},${Wn}\\)$`), dM = new RegExp(`^rgb\\(${rr},${rr},${rr}\\)$`), hM = new RegExp(`^rgba\\(${Wn},${Wn},${Wn},${gi}\\)$`), pM = new RegExp(`^rgba\\(${rr},${rr},${rr},${gi}\\)$`), mM = new RegExp(`^hsl\\(${gi},${rr},${rr}\\)$`), yM = new RegExp(`^hsla\\(${gi},${rr},${rr},${gi}\\)$`), vv = {
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
a0(Zi, vi, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ev,
  // Deprecated! Use color.formatHex.
  formatHex: Ev,
  formatHex8: bM,
  formatHsl: gM,
  formatRgb: Tv,
  toString: Tv
});
function Ev() {
  return this.rgb().formatHex();
}
function bM() {
  return this.rgb().formatHex8();
}
function gM() {
  return BA(this).formatHsl();
}
function Tv() {
  return this.rgb().formatRgb();
}
function vi(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = lM.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? _v(t) : r === 3 ? new gt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? po(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? po(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = fM.exec(e)) ? new gt(t[1], t[2], t[3], 1) : (t = dM.exec(e)) ? new gt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = hM.exec(e)) ? po(t[1], t[2], t[3], t[4]) : (t = pM.exec(e)) ? po(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = mM.exec(e)) ? Sv(t[1], t[2] / 100, t[3] / 100, 1) : (t = yM.exec(e)) ? Sv(t[1], t[2] / 100, t[3] / 100, t[4]) : vv.hasOwnProperty(e) ? _v(vv[e]) : e === "transparent" ? new gt(NaN, NaN, NaN, 0) : null;
}
function _v(e) {
  return new gt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function po(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new gt(e, t, r, n);
}
function vM(e) {
  return e instanceof Zi || (e = vi(e)), e ? (e = e.rgb(), new gt(e.r, e.g, e.b, e.opacity)) : new gt();
}
function _h(e, t, r, n) {
  return arguments.length === 1 ? vM(e) : new gt(e, t, r, n ?? 1);
}
function gt(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
a0(gt, _h, kA(Zi, {
  brighter(e) {
    return e = e == null ? zo : Math.pow(zo, e), new gt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? bi : Math.pow(bi, e), new gt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new gt(fn(this.r), fn(this.g), fn(this.b), Go(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Av,
  // Deprecated! Use color.formatHex.
  formatHex: Av,
  formatHex8: EM,
  formatRgb: Ov,
  toString: Ov
}));
function Av() {
  return `#${an(this.r)}${an(this.g)}${an(this.b)}`;
}
function EM() {
  return `#${an(this.r)}${an(this.g)}${an(this.b)}${an((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ov() {
  const e = Go(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${fn(this.r)}, ${fn(this.g)}, ${fn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Go(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function fn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function an(e) {
  return e = fn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Sv(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Wt(e, t, r, n);
}
function BA(e) {
  if (e instanceof Wt) return new Wt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Zi || (e = vi(e)), !e) return new Wt();
  if (e instanceof Wt) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, a = Math.min(t, r, n), i = Math.max(t, r, n), o = NaN, u = i - a, s = (i + a) / 2;
  return u ? (t === i ? o = (r - n) / u + (r < n) * 6 : r === i ? o = (n - t) / u + 2 : o = (t - r) / u + 4, u /= s < 0.5 ? i + a : 2 - i - a, o *= 60) : u = s > 0 && s < 1 ? 0 : o, new Wt(o, u, s, e.opacity);
}
function TM(e, t, r, n) {
  return arguments.length === 1 ? BA(e) : new Wt(e, t, r, n ?? 1);
}
function Wt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
a0(Wt, TM, kA(Zi, {
  brighter(e) {
    return e = e == null ? zo : Math.pow(zo, e), new Wt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? bi : Math.pow(bi, e), new Wt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, a = 2 * r - n;
    return new gt(
      $f(e >= 240 ? e - 240 : e + 120, a, n),
      $f(e, a, n),
      $f(e < 120 ? e + 240 : e - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new Wt(xv(this.h), mo(this.s), mo(this.l), Go(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Go(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${xv(this.h)}, ${mo(this.s) * 100}%, ${mo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function xv(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function mo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function $f(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const i0 = (e) => () => e;
function _M(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function AM(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function OM(e) {
  return (e = +e) == 1 ? jA : function(t, r) {
    return r - t ? AM(t, r, e) : i0(isNaN(t) ? r : t);
  };
}
function jA(e, t) {
  var r = t - e;
  return r ? _M(e, r) : i0(isNaN(e) ? t : e);
}
const wv = (function e(t) {
  var r = OM(t);
  function n(a, i) {
    var o = r((a = _h(a)).r, (i = _h(i)).r), u = r(a.g, i.g), s = r(a.b, i.b), c = jA(a.opacity, i.opacity);
    return function(l) {
      return a.r = o(l), a.g = u(l), a.b = s(l), a.opacity = c(l), a + "";
    };
  }
  return n.gamma = e, n;
})(1);
function SM(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), a;
  return function(i) {
    for (a = 0; a < r; ++a) n[a] = e[a] * (1 - i) + t[a] * i;
    return n;
  };
}
function xM(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function wM(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, a = new Array(n), i = new Array(r), o;
  for (o = 0; o < n; ++o) a[o] = Sa(e[o], t[o]);
  for (; o < r; ++o) i[o] = t[o];
  return function(u) {
    for (o = 0; o < n; ++o) i[o] = a[o](u);
    return i;
  };
}
function PM(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function Ko(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function IM(e, t) {
  var r = {}, n = {}, a;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in e ? r[a] = Sa(e[a], t[a]) : n[a] = t[a];
  return function(i) {
    for (a in r) n[a] = r[a](i);
    return n;
  };
}
var Ah = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Uf = new RegExp(Ah.source, "g");
function CM(e) {
  return function() {
    return e;
  };
}
function NM(e) {
  return function(t) {
    return e(t) + "";
  };
}
function RM(e, t) {
  var r = Ah.lastIndex = Uf.lastIndex = 0, n, a, i, o = -1, u = [], s = [];
  for (e = e + "", t = t + ""; (n = Ah.exec(e)) && (a = Uf.exec(t)); )
    (i = a.index) > r && (i = t.slice(r, i), u[o] ? u[o] += i : u[++o] = i), (n = n[0]) === (a = a[0]) ? u[o] ? u[o] += a : u[++o] = a : (u[++o] = null, s.push({ i: o, x: Ko(n, a) })), r = Uf.lastIndex;
  return r < t.length && (i = t.slice(r), u[o] ? u[o] += i : u[++o] = i), u.length < 2 ? s[0] ? NM(s[0].x) : CM(t) : (t = s.length, function(c) {
    for (var l = 0, f; l < t; ++l) u[(f = s[l]).i] = f.x(c);
    return u.join("");
  });
}
function Sa(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? i0(t) : (r === "number" ? Ko : r === "string" ? (n = vi(t)) ? (t = n, wv) : RM : t instanceof vi ? wv : t instanceof Date ? PM : xM(t) ? SM : Array.isArray(t) ? wM : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? IM : Ko)(e, t);
}
function o0(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function DM(e, t) {
  t === void 0 && (t = e, e = Sa);
  for (var r = 0, n = t.length - 1, a = t[0], i = new Array(n < 0 ? 0 : n); r < n; ) i[r] = e(a, a = t[++r]);
  return function(o) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return i[u](o - u);
  };
}
function MM(e) {
  return function() {
    return e;
  };
}
function Vo(e) {
  return +e;
}
var Pv = [0, 1];
function pt(e) {
  return e;
}
function Oh(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : MM(isNaN(t) ? NaN : 0.5);
}
function LM(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function kM(e, t, r) {
  var n = e[0], a = e[1], i = t[0], o = t[1];
  return a < n ? (n = Oh(a, n), i = r(o, i)) : (n = Oh(n, a), i = r(i, o)), function(u) {
    return i(n(u));
  };
}
function BM(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, a = new Array(n), i = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    a[o] = Oh(e[o], e[o + 1]), i[o] = r(t[o], t[o + 1]);
  return function(u) {
    var s = Qi(e, u, 1, n) - 1;
    return i[s](a[s](u));
  };
}
function Ji(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Ju() {
  var e = Pv, t = Pv, r = Sa, n, a, i, o = pt, u, s, c;
  function l() {
    var h = Math.min(e.length, t.length);
    return o !== pt && (o = LM(e[0], e[h - 1])), u = h > 2 ? BM : kM, s = c = null, f;
  }
  function f(h) {
    return h == null || isNaN(h = +h) ? i : (s || (s = u(e.map(n), t, r)))(n(o(h)));
  }
  return f.invert = function(h) {
    return o(a((c || (c = u(t, e.map(n), Ko)))(h)));
  }, f.domain = function(h) {
    return arguments.length ? (e = Array.from(h, Vo), l()) : e.slice();
  }, f.range = function(h) {
    return arguments.length ? (t = Array.from(h), l()) : t.slice();
  }, f.rangeRound = function(h) {
    return t = Array.from(h), r = o0, l();
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
function u0() {
  return Ju()(pt, pt);
}
function jM(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function Xo(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function ea(e) {
  return e = Xo(Math.abs(e)), e ? e[1] : NaN;
}
function FM(e, t) {
  return function(r, n) {
    for (var a = r.length, i = [], o = 0, u = e[0], s = 0; a > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), i.push(r.substring(a -= u, a + u)), !((s += u + 1) > n)); )
      u = e[o = (o + 1) % e.length];
    return i.reverse().join(t);
  };
}
function $M(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var UM = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ei(e) {
  if (!(t = UM.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new s0({
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
Ei.prototype = s0.prototype;
function s0(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
s0.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function HM(e) {
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
var Qo;
function qM(e, t) {
  var r = Xo(e, t);
  if (!r) return Qo = void 0, e.toPrecision(t);
  var n = r[0], a = r[1], i = a - (Qo = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, o = n.length;
  return i === o ? n : i > o ? n + new Array(i - o + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + Xo(e, Math.max(0, t + i - 1))[0];
}
function Iv(e, t) {
  var r = Xo(e, t);
  if (!r) return e + "";
  var n = r[0], a = r[1];
  return a < 0 ? "0." + new Array(-a).join("0") + n : n.length > a + 1 ? n.slice(0, a + 1) + "." + n.slice(a + 1) : n + new Array(a - n.length + 2).join("0");
}
const Cv = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: jM,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Iv(e * 100, t),
  r: Iv,
  s: qM,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Nv(e) {
  return e;
}
var Rv = Array.prototype.map, Dv = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function WM(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Nv : FM(Rv.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", a = e.decimal === void 0 ? "." : e.decimal + "", i = e.numerals === void 0 ? Nv : $M(Rv.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", u = e.minus === void 0 ? "−" : e.minus + "", s = e.nan === void 0 ? "NaN" : e.nan + "";
  function c(f, h) {
    f = Ei(f);
    var p = f.fill, g = f.align, y = f.sign, m = f.symbol, v = f.zero, E = f.width, _ = f.comma, A = f.precision, b = f.trim, T = f.type;
    T === "n" ? (_ = !0, T = "g") : Cv[T] || (A === void 0 && (A = 12), b = !0, T = "g"), (v || p === "0" && g === "=") && (v = !0, p = "0", g = "=");
    var O = (h && h.prefix !== void 0 ? h.prefix : "") + (m === "$" ? r : m === "#" && /[boxX]/.test(T) ? "0" + T.toLowerCase() : ""), I = (m === "$" ? n : /[%p]/.test(T) ? o : "") + (h && h.suffix !== void 0 ? h.suffix : ""), N = Cv[T], j = /[defgprs%]/.test(T);
    A = A === void 0 ? 6 : /[gprs]/.test(T) ? Math.max(1, Math.min(21, A)) : Math.max(0, Math.min(20, A));
    function D(R) {
      var B = O, F = I, $, q, Y;
      if (T === "c")
        F = N(R) + F, R = "";
      else {
        R = +R;
        var Q = R < 0 || 1 / R < 0;
        if (R = isNaN(R) ? s : N(Math.abs(R), A), b && (R = HM(R)), Q && +R == 0 && y !== "+" && (Q = !1), B = (Q ? y === "(" ? y : u : y === "-" || y === "(" ? "" : y) + B, F = (T === "s" && !isNaN(R) && Qo !== void 0 ? Dv[8 + Qo / 3] : "") + F + (Q && y === "(" ? ")" : ""), j) {
          for ($ = -1, q = R.length; ++$ < q; )
            if (Y = R.charCodeAt($), 48 > Y || Y > 57) {
              F = (Y === 46 ? a + R.slice($ + 1) : R.slice($)) + F, R = R.slice(0, $);
              break;
            }
        }
      }
      _ && !v && (R = t(R, 1 / 0));
      var te = B.length + R.length + F.length, k = te < E ? new Array(E - te + 1).join(p) : "";
      switch (_ && v && (R = t(k + R, k.length ? E - F.length : 1 / 0), k = ""), g) {
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
    var p = Math.max(-8, Math.min(8, Math.floor(ea(h) / 3))) * 3, g = Math.pow(10, -p), y = c((f = Ei(f), f.type = "f", f), { suffix: Dv[8 + p / 3] });
    return function(m) {
      return y(g * m);
    };
  }
  return {
    format: c,
    formatPrefix: l
  };
}
var yo, c0, FA;
YM({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function YM(e) {
  return yo = WM(e), c0 = yo.format, FA = yo.formatPrefix, yo;
}
function zM(e) {
  return Math.max(0, -ea(Math.abs(e)));
}
function GM(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(ea(t) / 3))) * 3 - ea(Math.abs(e)));
}
function KM(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, ea(t) - ea(e)) + 1;
}
function $A(e, t, r, n) {
  var a = Eh(e, t, r), i;
  switch (n = Ei(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(i = GM(a, o)) && (n.precision = i), FA(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = KM(a, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = i - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = zM(a)) && (n.precision = i - (n.type === "%") * 2);
      break;
    }
  }
  return c0(n);
}
function Gr(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return gh(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var a = t();
    return $A(a[0], a[a.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), a = 0, i = n.length - 1, o = n[a], u = n[i], s, c, l = 10;
    for (u < o && (c = o, o = u, u = c, c = a, a = i, i = c); l-- > 0; ) {
      if (c = vh(o, u, r), c === s)
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
function Zo() {
  var e = u0();
  return e.copy = function() {
    return Ji(e, Zo());
  }, Ut.apply(e, arguments), Gr(e);
}
function UA(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, Vo), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return UA(e).unknown(t);
  }, e = arguments.length ? Array.from(e, Vo) : [0, 1], Gr(r);
}
function HA(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, a = e[r], i = e[n], o;
  return i < a && (o = r, r = n, n = o, o = a, a = i, i = o), e[r] = t.floor(a), e[n] = t.ceil(i), e;
}
function Mv(e) {
  return Math.log(e);
}
function Lv(e) {
  return Math.exp(e);
}
function VM(e) {
  return -Math.log(-e);
}
function XM(e) {
  return -Math.exp(-e);
}
function QM(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function ZM(e) {
  return e === 10 ? QM : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function JM(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function kv(e) {
  return (t, r) => -e(-t, r);
}
function l0(e) {
  const t = e(Mv, Lv), r = t.domain;
  let n = 10, a, i;
  function o() {
    return a = JM(n), i = ZM(n), r()[0] < 0 ? (a = kv(a), i = kv(i), e(VM, XM)) : e(Mv, Lv), t;
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
    let v = [];
    if (!(n % 1) && p - h < m) {
      if (h = Math.floor(h), p = Math.ceil(p), c > 0) {
        for (; h <= p; ++h)
          for (g = 1; g < n; ++g)
            if (y = h < 0 ? g / i(-h) : g * i(h), !(y < c)) {
              if (y > l) break;
              v.push(y);
            }
      } else for (; h <= p; ++h)
        for (g = n - 1; g >= 1; --g)
          if (y = h > 0 ? g / i(-h) : g * i(h), !(y < c)) {
            if (y > l) break;
            v.push(y);
          }
      v.length * 2 < m && (v = gh(c, l, m));
    } else
      v = gh(h, p, Math.min(p - h, m)).map(i);
    return f ? v.reverse() : v;
  }, t.tickFormat = (u, s) => {
    if (u == null && (u = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = Ei(s)).precision == null && (s.trim = !0), s = c0(s)), u === 1 / 0) return s;
    const c = Math.max(1, n * u / t.ticks().length);
    return (l) => {
      let f = l / i(Math.round(a(l)));
      return f * n < n - 0.5 && (f *= n), f <= c ? s(l) : "";
    };
  }, t.nice = () => r(HA(r(), {
    floor: (u) => i(Math.floor(a(u))),
    ceil: (u) => i(Math.ceil(a(u)))
  })), t;
}
function qA() {
  const e = l0(Ju()).domain([1, 10]);
  return e.copy = () => Ji(e, qA()).base(e.base()), Ut.apply(e, arguments), e;
}
function Bv(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function jv(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function f0(e) {
  var t = 1, r = e(Bv(t), jv(t));
  return r.constant = function(n) {
    return arguments.length ? e(Bv(t = +n), jv(t)) : t;
  }, Gr(r);
}
function WA() {
  var e = f0(Ju());
  return e.copy = function() {
    return Ji(e, WA()).constant(e.constant());
  }, Ut.apply(e, arguments);
}
function Fv(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function eL(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function tL(e) {
  return e < 0 ? -e * e : e * e;
}
function d0(e) {
  var t = e(pt, pt), r = 1;
  function n() {
    return r === 1 ? e(pt, pt) : r === 0.5 ? e(eL, tL) : e(Fv(r), Fv(1 / r));
  }
  return t.exponent = function(a) {
    return arguments.length ? (r = +a, n()) : r;
  }, Gr(t);
}
function h0() {
  var e = d0(Ju());
  return e.copy = function() {
    return Ji(e, h0()).exponent(e.exponent());
  }, Ut.apply(e, arguments), e;
}
function rL() {
  return h0.apply(null, arguments).exponent(0.5);
}
function $v(e) {
  return Math.sign(e) * e * e;
}
function nL(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function YA() {
  var e = u0(), t = [0, 1], r = !1, n;
  function a(i) {
    var o = nL(e(i));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return a.invert = function(i) {
    return e.invert($v(i));
  }, a.domain = function(i) {
    return arguments.length ? (e.domain(i), a) : e.domain();
  }, a.range = function(i) {
    return arguments.length ? (e.range((t = Array.from(i, Vo)).map($v)), a) : t.slice();
  }, a.rangeRound = function(i) {
    return a.range(i).round(!0);
  }, a.round = function(i) {
    return arguments.length ? (r = !!i, a) : r;
  }, a.clamp = function(i) {
    return arguments.length ? (e.clamp(i), a) : e.clamp();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return YA(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, Ut.apply(a, arguments), Gr(a);
}
function zA() {
  var e = [], t = [], r = [], n;
  function a() {
    var o = 0, u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++o < u; ) r[o - 1] = sM(e, o / u);
    return i;
  }
  function i(o) {
    return o == null || isNaN(o = +o) ? n : t[Qi(r, o)];
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
    return e.sort(Hr), a();
  }, i.range = function(o) {
    return arguments.length ? (t = Array.from(o), a()) : t.slice();
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n;
  }, i.quantiles = function() {
    return r.slice();
  }, i.copy = function() {
    return zA().domain(e).range(t).unknown(n);
  }, Ut.apply(i, arguments);
}
function GA() {
  var e = 0, t = 1, r = 1, n = [0.5], a = [0, 1], i;
  function o(s) {
    return s != null && s <= s ? a[Qi(n, s, 0, r)] : i;
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
    return GA().domain([e, t]).range(a).unknown(i);
  }, Ut.apply(Gr(o), arguments);
}
function KA() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function a(i) {
    return i != null && i <= i ? t[Qi(e, i, 0, n)] : r;
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
    return KA().domain(e).range(t).unknown(r);
  }, Ut.apply(a, arguments);
}
const Hf = /* @__PURE__ */ new Date(), qf = /* @__PURE__ */ new Date();
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
  }), r && (a.count = (i, o) => (Hf.setTime(+i), qf.setTime(+o), e(Hf), e(qf), Math.floor(r(Hf, qf))), a.every = (i) => (i = Math.floor(i), !isFinite(i) || !(i > 0) ? null : i > 1 ? a.filter(n ? (o) => n(o) % i === 0 : (o) => a.count(0, o) % i === 0) : a)), a;
}
const Jo = Ke(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Jo.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Ke((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : Jo);
Jo.range;
const hr = 1e3, Mt = hr * 60, pr = Mt * 60, _r = pr * 24, p0 = _r * 7, Uv = _r * 30, Wf = _r * 365, on = Ke((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * hr);
}, (e, t) => (t - e) / hr, (e) => e.getUTCSeconds());
on.range;
const m0 = Ke((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * hr);
}, (e, t) => {
  e.setTime(+e + t * Mt);
}, (e, t) => (t - e) / Mt, (e) => e.getMinutes());
m0.range;
const y0 = Ke((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * Mt);
}, (e, t) => (t - e) / Mt, (e) => e.getUTCMinutes());
y0.range;
const b0 = Ke((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * hr - e.getMinutes() * Mt);
}, (e, t) => {
  e.setTime(+e + t * pr);
}, (e, t) => (t - e) / pr, (e) => e.getHours());
b0.range;
const g0 = Ke((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * pr);
}, (e, t) => (t - e) / pr, (e) => e.getUTCHours());
g0.range;
const eo = Ke(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Mt) / _r,
  (e) => e.getDate() - 1
);
eo.range;
const es = Ke((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / _r, (e) => e.getUTCDate() - 1);
es.range;
const VA = Ke((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / _r, (e) => Math.floor(e / _r));
VA.range;
function On(e) {
  return Ke((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Mt) / p0);
}
const ts = On(0), eu = On(1), aL = On(2), iL = On(3), ta = On(4), oL = On(5), uL = On(6);
ts.range;
eu.range;
aL.range;
iL.range;
ta.range;
oL.range;
uL.range;
function Sn(e) {
  return Ke((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / p0);
}
const rs = Sn(0), tu = Sn(1), sL = Sn(2), cL = Sn(3), ra = Sn(4), lL = Sn(5), fL = Sn(6);
rs.range;
tu.range;
sL.range;
cL.range;
ra.range;
lL.range;
fL.range;
const v0 = Ke((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
v0.range;
const E0 = Ke((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
E0.range;
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
function XA(e, t, r, n, a, i) {
  const o = [
    [on, 1, hr],
    [on, 5, 5 * hr],
    [on, 15, 15 * hr],
    [on, 30, 30 * hr],
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
    [r, 1, p0],
    [t, 1, Uv],
    [t, 3, 3 * Uv],
    [e, 1, Wf]
  ];
  function u(c, l, f) {
    const h = l < c;
    h && ([c, l] = [l, c]);
    const p = f && typeof f.range == "function" ? f : s(c, l, f), g = p ? p.range(c, +l + 1) : [];
    return h ? g.reverse() : g;
  }
  function s(c, l, f) {
    const h = Math.abs(l - c) / f, p = r0(([, , m]) => m).right(o, h);
    if (p === o.length) return e.every(Eh(c / Wf, l / Wf, f));
    if (p === 0) return Jo.every(Math.max(Eh(c, l, f), 1));
    const [g, y] = o[h / o[p - 1][2] < o[p][2] / h ? p - 1 : p];
    return g.every(y);
  }
  return [u, s];
}
const [dL, hL] = XA(Or, E0, rs, VA, g0, y0), [pL, mL] = XA(Ar, v0, ts, eo, b0, m0);
function Yf(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function zf(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function La(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function yL(e) {
  var t = e.dateTime, r = e.date, n = e.time, a = e.periods, i = e.days, o = e.shortDays, u = e.months, s = e.shortMonths, c = ka(a), l = Ba(a), f = ka(i), h = Ba(i), p = ka(o), g = Ba(o), y = ka(u), m = Ba(u), v = ka(s), E = Ba(s), _ = {
    a: Y,
    A: Q,
    b: te,
    B: k,
    c: null,
    d: Gv,
    e: Gv,
    f: FL,
    g: VL,
    G: QL,
    H: kL,
    I: BL,
    j: jL,
    L: QA,
    m: $L,
    M: UL,
    p: W,
    q: z,
    Q: Xv,
    s: Qv,
    S: HL,
    u: qL,
    U: WL,
    V: YL,
    w: zL,
    W: GL,
    x: null,
    X: null,
    y: KL,
    Y: XL,
    Z: ZL,
    "%": Vv
  }, A = {
    a: Z,
    A: ne,
    b: oe,
    B: ue,
    c: null,
    d: Kv,
    e: Kv,
    f: rk,
    g: dk,
    G: pk,
    H: JL,
    I: ek,
    j: tk,
    L: JA,
    m: nk,
    M: ak,
    p: fe,
    q: ce,
    Q: Xv,
    s: Qv,
    S: ik,
    u: ok,
    U: uk,
    V: sk,
    w: ck,
    W: lk,
    x: null,
    X: null,
    y: fk,
    Y: hk,
    Z: mk,
    "%": Vv
  }, b = {
    a: j,
    A: D,
    b: R,
    B,
    c: F,
    d: Yv,
    e: Yv,
    f: RL,
    g: Wv,
    G: qv,
    H: zv,
    I: zv,
    j: PL,
    L: NL,
    m: wL,
    M: IL,
    p: N,
    q: xL,
    Q: ML,
    s: LL,
    S: CL,
    u: TL,
    U: _L,
    V: AL,
    w: EL,
    W: OL,
    x: $,
    X: q,
    y: Wv,
    Y: qv,
    Z: SL,
    "%": DL
  };
  _.x = T(r, _), _.X = T(n, _), _.c = T(t, _), A.x = T(r, A), A.X = T(n, A), A.c = T(t, A);
  function T(G, re) {
    return function(ie) {
      var M = [], ye = -1, X = 0, Pe = G.length, De, et, Cr;
      for (ie instanceof Date || (ie = /* @__PURE__ */ new Date(+ie)); ++ye < Pe; )
        G.charCodeAt(ye) === 37 && (M.push(G.slice(X, ye)), (et = Hv[De = G.charAt(++ye)]) != null ? De = G.charAt(++ye) : et = De === "e" ? " " : "0", (Cr = re[De]) && (De = Cr(ie, et)), M.push(De), X = ye + 1);
      return M.push(G.slice(X, ye)), M.join("");
    };
  }
  function O(G, re) {
    return function(ie) {
      var M = La(1900, void 0, 1), ye = I(M, G, ie += "", 0), X, Pe;
      if (ye != ie.length) return null;
      if ("Q" in M) return new Date(M.Q);
      if ("s" in M) return new Date(M.s * 1e3 + ("L" in M ? M.L : 0));
      if (re && !("Z" in M) && (M.Z = 0), "p" in M && (M.H = M.H % 12 + M.p * 12), M.m === void 0 && (M.m = "q" in M ? M.q : 0), "V" in M) {
        if (M.V < 1 || M.V > 53) return null;
        "w" in M || (M.w = 1), "Z" in M ? (X = zf(La(M.y, 0, 1)), Pe = X.getUTCDay(), X = Pe > 4 || Pe === 0 ? tu.ceil(X) : tu(X), X = es.offset(X, (M.V - 1) * 7), M.y = X.getUTCFullYear(), M.m = X.getUTCMonth(), M.d = X.getUTCDate() + (M.w + 6) % 7) : (X = Yf(La(M.y, 0, 1)), Pe = X.getDay(), X = Pe > 4 || Pe === 0 ? eu.ceil(X) : eu(X), X = eo.offset(X, (M.V - 1) * 7), M.y = X.getFullYear(), M.m = X.getMonth(), M.d = X.getDate() + (M.w + 6) % 7);
      } else ("W" in M || "U" in M) && ("w" in M || (M.w = "u" in M ? M.u % 7 : "W" in M ? 1 : 0), Pe = "Z" in M ? zf(La(M.y, 0, 1)).getUTCDay() : Yf(La(M.y, 0, 1)).getDay(), M.m = 0, M.d = "W" in M ? (M.w + 6) % 7 + M.W * 7 - (Pe + 5) % 7 : M.w + M.U * 7 - (Pe + 6) % 7);
      return "Z" in M ? (M.H += M.Z / 100 | 0, M.M += M.Z % 100, zf(M)) : Yf(M);
    };
  }
  function I(G, re, ie, M) {
    for (var ye = 0, X = re.length, Pe = ie.length, De, et; ye < X; ) {
      if (M >= Pe) return -1;
      if (De = re.charCodeAt(ye++), De === 37) {
        if (De = re.charAt(ye++), et = b[De in Hv ? re.charAt(ye++) : De], !et || (M = et(G, ie, M)) < 0) return -1;
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
    var M = v.exec(re.slice(ie));
    return M ? (G.m = E.get(M[0].toLowerCase()), ie + M[0].length) : -1;
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
      var re = T(G += "", _);
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
      var re = T(G += "", A);
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
var Hv = { "-": "", _: " ", 0: "0" }, Je = /^\s*\d+/, bL = /^%/, gL = /[\\^$*+?|[\]().{}]/g;
function ge(e, t, r) {
  var n = e < 0 ? "-" : "", a = (n ? -e : e) + "", i = a.length;
  return n + (i < r ? new Array(r - i + 1).join(t) + a : a);
}
function vL(e) {
  return e.replace(gL, "\\$&");
}
function ka(e) {
  return new RegExp("^(?:" + e.map(vL).join("|") + ")", "i");
}
function Ba(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function EL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function TL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function _L(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function AL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function OL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function qv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function Wv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function SL(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function xL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function wL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function Yv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function PL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function zv(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function IL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function CL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function NL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function RL(e, t, r) {
  var n = Je.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function DL(e, t, r) {
  var n = bL.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function ML(e, t, r) {
  var n = Je.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function LL(e, t, r) {
  var n = Je.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function Gv(e, t) {
  return ge(e.getDate(), t, 2);
}
function kL(e, t) {
  return ge(e.getHours(), t, 2);
}
function BL(e, t) {
  return ge(e.getHours() % 12 || 12, t, 2);
}
function jL(e, t) {
  return ge(1 + eo.count(Ar(e), e), t, 3);
}
function QA(e, t) {
  return ge(e.getMilliseconds(), t, 3);
}
function FL(e, t) {
  return QA(e, t) + "000";
}
function $L(e, t) {
  return ge(e.getMonth() + 1, t, 2);
}
function UL(e, t) {
  return ge(e.getMinutes(), t, 2);
}
function HL(e, t) {
  return ge(e.getSeconds(), t, 2);
}
function qL(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function WL(e, t) {
  return ge(ts.count(Ar(e) - 1, e), t, 2);
}
function ZA(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? ta(e) : ta.ceil(e);
}
function YL(e, t) {
  return e = ZA(e), ge(ta.count(Ar(e), e) + (Ar(e).getDay() === 4), t, 2);
}
function zL(e) {
  return e.getDay();
}
function GL(e, t) {
  return ge(eu.count(Ar(e) - 1, e), t, 2);
}
function KL(e, t) {
  return ge(e.getFullYear() % 100, t, 2);
}
function VL(e, t) {
  return e = ZA(e), ge(e.getFullYear() % 100, t, 2);
}
function XL(e, t) {
  return ge(e.getFullYear() % 1e4, t, 4);
}
function QL(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? ta(e) : ta.ceil(e), ge(e.getFullYear() % 1e4, t, 4);
}
function ZL(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + ge(t / 60 | 0, "0", 2) + ge(t % 60, "0", 2);
}
function Kv(e, t) {
  return ge(e.getUTCDate(), t, 2);
}
function JL(e, t) {
  return ge(e.getUTCHours(), t, 2);
}
function ek(e, t) {
  return ge(e.getUTCHours() % 12 || 12, t, 2);
}
function tk(e, t) {
  return ge(1 + es.count(Or(e), e), t, 3);
}
function JA(e, t) {
  return ge(e.getUTCMilliseconds(), t, 3);
}
function rk(e, t) {
  return JA(e, t) + "000";
}
function nk(e, t) {
  return ge(e.getUTCMonth() + 1, t, 2);
}
function ak(e, t) {
  return ge(e.getUTCMinutes(), t, 2);
}
function ik(e, t) {
  return ge(e.getUTCSeconds(), t, 2);
}
function ok(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function uk(e, t) {
  return ge(rs.count(Or(e) - 1, e), t, 2);
}
function eO(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? ra(e) : ra.ceil(e);
}
function sk(e, t) {
  return e = eO(e), ge(ra.count(Or(e), e) + (Or(e).getUTCDay() === 4), t, 2);
}
function ck(e) {
  return e.getUTCDay();
}
function lk(e, t) {
  return ge(tu.count(Or(e) - 1, e), t, 2);
}
function fk(e, t) {
  return ge(e.getUTCFullYear() % 100, t, 2);
}
function dk(e, t) {
  return e = eO(e), ge(e.getUTCFullYear() % 100, t, 2);
}
function hk(e, t) {
  return ge(e.getUTCFullYear() % 1e4, t, 4);
}
function pk(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? ra(e) : ra.ceil(e), ge(e.getUTCFullYear() % 1e4, t, 4);
}
function mk() {
  return "+0000";
}
function Vv() {
  return "%";
}
function Xv(e) {
  return +e;
}
function Qv(e) {
  return Math.floor(+e / 1e3);
}
var Nn, tO, rO;
yk({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function yk(e) {
  return Nn = yL(e), tO = Nn.format, Nn.parse, rO = Nn.utcFormat, Nn.utcParse, Nn;
}
function bk(e) {
  return new Date(e);
}
function gk(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function T0(e, t, r, n, a, i, o, u, s, c) {
  var l = u0(), f = l.invert, h = l.domain, p = c(".%L"), g = c(":%S"), y = c("%I:%M"), m = c("%I %p"), v = c("%a %d"), E = c("%b %d"), _ = c("%B"), A = c("%Y");
  function b(T) {
    return (s(T) < T ? p : u(T) < T ? g : o(T) < T ? y : i(T) < T ? m : n(T) < T ? a(T) < T ? v : E : r(T) < T ? _ : A)(T);
  }
  return l.invert = function(T) {
    return new Date(f(T));
  }, l.domain = function(T) {
    return arguments.length ? h(Array.from(T, gk)) : h().map(bk);
  }, l.ticks = function(T) {
    var O = h();
    return e(O[0], O[O.length - 1], T ?? 10);
  }, l.tickFormat = function(T, O) {
    return O == null ? b : c(O);
  }, l.nice = function(T) {
    var O = h();
    return (!T || typeof T.range != "function") && (T = t(O[0], O[O.length - 1], T ?? 10)), T ? h(HA(O, T)) : l;
  }, l.copy = function() {
    return Ji(l, T0(e, t, r, n, a, i, o, u, s, c));
  }, l;
}
function vk() {
  return Ut.apply(T0(pL, mL, Ar, v0, ts, eo, b0, m0, on, tO).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function Ek() {
  return Ut.apply(T0(dL, hL, Or, E0, rs, es, g0, y0, on, rO).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function ns() {
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
  return c.range = l(Sa), c.rangeRound = l(o0), c.unknown = function(f) {
    return arguments.length ? (s = f, c) : s;
  }, function(f) {
    return i = f, r = f(e), n = f(t), a = r === n ? 0 : 1 / (n - r), c;
  };
}
function Kr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function nO() {
  var e = Gr(ns()(pt));
  return e.copy = function() {
    return Kr(e, nO());
  }, Pr.apply(e, arguments);
}
function aO() {
  var e = l0(ns()).domain([1, 10]);
  return e.copy = function() {
    return Kr(e, aO()).base(e.base());
  }, Pr.apply(e, arguments);
}
function iO() {
  var e = f0(ns());
  return e.copy = function() {
    return Kr(e, iO()).constant(e.constant());
  }, Pr.apply(e, arguments);
}
function _0() {
  var e = d0(ns());
  return e.copy = function() {
    return Kr(e, _0()).exponent(e.exponent());
  }, Pr.apply(e, arguments);
}
function Tk() {
  return _0.apply(null, arguments).exponent(0.5);
}
function oO() {
  var e = [], t = pt;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Qi(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let a of n) a != null && !isNaN(a = +a) && e.push(a);
    return e.sort(Hr), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, a) => t(a / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (a, i) => uM(e, i / n));
  }, r.copy = function() {
    return oO(t).domain(e);
  }, Pr.apply(r, arguments);
}
function as() {
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
      var v, E, _;
      return arguments.length ? ([v, E, _] = m, c = DM(y, [v, E, _]), p) : [c(0), c(0.5), c(1)];
    };
  }
  return p.range = g(Sa), p.rangeRound = g(o0), p.unknown = function(y) {
    return arguments.length ? (h = y, p) : h;
  }, function(y) {
    return l = y, a = y(e), i = y(t), o = y(r), u = a === i ? 0 : 0.5 / (i - a), s = i === o ? 0 : 0.5 / (o - i), n = i < a ? -1 : 1, p;
  };
}
function uO() {
  var e = Gr(as()(pt));
  return e.copy = function() {
    return Kr(e, uO());
  }, Pr.apply(e, arguments);
}
function sO() {
  var e = l0(as()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return Kr(e, sO()).base(e.base());
  }, Pr.apply(e, arguments);
}
function cO() {
  var e = f0(as());
  return e.copy = function() {
    return Kr(e, cO()).constant(e.constant());
  }, Pr.apply(e, arguments);
}
function A0() {
  var e = d0(as());
  return e.copy = function() {
    return Kr(e, A0()).exponent(e.exponent());
  }, Pr.apply(e, arguments);
}
function _k() {
  return A0.apply(null, arguments).exponent(0.5);
}
const Zv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: yi,
  scaleDiverging: uO,
  scaleDivergingLog: sO,
  scaleDivergingPow: A0,
  scaleDivergingSqrt: _k,
  scaleDivergingSymlog: cO,
  scaleIdentity: UA,
  scaleImplicit: Th,
  scaleLinear: Zo,
  scaleLog: qA,
  scaleOrdinal: n0,
  scalePoint: Ja,
  scalePow: h0,
  scaleQuantile: zA,
  scaleQuantize: GA,
  scaleRadial: YA,
  scaleSequential: nO,
  scaleSequentialLog: aO,
  scaleSequentialPow: _0,
  scaleSequentialQuantile: oO,
  scaleSequentialSqrt: Tk,
  scaleSequentialSymlog: iO,
  scaleSqrt: rL,
  scaleSymlog: WA,
  scaleThreshold: KA,
  scaleTime: vk,
  scaleUtc: Ek,
  tickFormat: $A
}, Symbol.toStringTag, { value: "Module" }));
var Gf, Jv;
function is() {
  if (Jv) return Gf;
  Jv = 1;
  var e = Ta();
  function t(r, n, a) {
    for (var i = -1, o = r.length; ++i < o; ) {
      var u = r[i], s = n(u);
      if (s != null && (c === void 0 ? s === s && !e(s) : a(s, c)))
        var c = s, l = u;
    }
    return l;
  }
  return Gf = t, Gf;
}
var Kf, e1;
function lO() {
  if (e1) return Kf;
  e1 = 1;
  function e(t, r) {
    return t > r;
  }
  return Kf = e, Kf;
}
var Vf, t1;
function Ak() {
  if (t1) return Vf;
  t1 = 1;
  var e = is(), t = lO(), r = Aa();
  function n(a) {
    return a && a.length ? e(a, r, t) : void 0;
  }
  return Vf = n, Vf;
}
var Ok = Ak();
const os = /* @__PURE__ */ xe(Ok);
var Xf, r1;
function fO() {
  if (r1) return Xf;
  r1 = 1;
  function e(t, r) {
    return t < r;
  }
  return Xf = e, Xf;
}
var Qf, n1;
function Sk() {
  if (n1) return Qf;
  n1 = 1;
  var e = is(), t = fO(), r = Aa();
  function n(a) {
    return a && a.length ? e(a, r, t) : void 0;
  }
  return Qf = n, Qf;
}
var xk = Sk();
const us = /* @__PURE__ */ xe(xk);
var Zf, a1;
function wk() {
  if (a1) return Zf;
  a1 = 1;
  var e = Fp(), t = ur(), r = EA(), n = Tt();
  function a(i, o) {
    var u = n(i) ? e : r;
    return u(i, t(o, 3));
  }
  return Zf = a, Zf;
}
var Jf, i1;
function Pk() {
  if (i1) return Jf;
  i1 = 1;
  var e = gA(), t = wk();
  function r(n, a) {
    return e(t(n, a), 1);
  }
  return Jf = r, Jf;
}
var Ik = Pk();
const Ck = /* @__PURE__ */ xe(Ik);
var ed, o1;
function Nk() {
  if (o1) return ed;
  o1 = 1;
  var e = Zp();
  function t(r, n) {
    return e(r, n);
  }
  return ed = t, ed;
}
var Rk = Nk();
const ss = /* @__PURE__ */ xe(Rk);
var xa = 1e9, Dk = {
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
}, S0, Le = !0, Ft = "[DecimalError] ", dn = Ft + "Invalid argument: ", O0 = Ft + "Exponent out of range: ", wa = Math.floor, tn = Math.pow, Mk = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Ot, Xe = 1e7, Re = 7, dO = 9007199254740991, ru = wa(dO / Re), ae = {};
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
  return r.eq(Ot) ? new n(0) : (Le = !1, t = Er(Ti(r, i), Ti(e, i), i), Le = !0, we(t, a));
};
ae.minus = ae.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? mO(t, e) : hO(t, (e.s = -e.s, e));
};
ae.modulo = ae.mod = function(e) {
  var t, r = this, n = r.constructor, a = n.precision;
  if (e = new n(e), !e.s) throw Error(Ft + "NaN");
  return r.s ? (Le = !1, t = Er(r, e, 0, 1).times(e), Le = !0, r.minus(t)) : we(new n(r), a);
};
ae.naturalExponential = ae.exp = function() {
  return pO(this);
};
ae.naturalLogarithm = ae.ln = function() {
  return Ti(this);
};
ae.negated = ae.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
ae.plus = ae.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? hO(t, e) : mO(t, (e.s = -e.s, e));
};
ae.precision = ae.sd = function(e) {
  var t, r, n, a = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(dn + e);
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
  for (e = He(u), Le = !1, a = Math.sqrt(+u), a == 0 || a == 1 / 0 ? (t = tr(u.d), (t.length + e) % 2 == 0 && (t += "0"), a = Math.sqrt(t), e = wa((e + 1) / 2) - (e < 0 || e % 2), a == 1 / 0 ? t = "5e" + e : (t = a.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new s(t)) : n = new s(a.toString()), r = s.precision, a = o = r + 3; ; )
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
  return r = new n(r), e === void 0 ? r : (ar(e, 0, xa), t === void 0 ? t = n.rounding : ar(t, 0, 8), we(r, e + He(r) + 1, t));
};
ae.toExponential = function(e, t) {
  var r, n = this, a = n.constructor;
  return e === void 0 ? r = gn(n, !0) : (ar(e, 0, xa), t === void 0 ? t = a.rounding : ar(t, 0, 8), n = we(new a(n), e + 1, t), r = gn(n, !0, e + 1)), r;
};
ae.toFixed = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? gn(a) : (ar(e, 0, xa), t === void 0 ? t = i.rounding : ar(t, 0, 8), n = we(new i(a), e + He(a) + 1, t), r = gn(n.abs(), !1, e + He(n) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
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
    if ((r = l < 0 ? -l : l) <= dO) {
      for (a = new s(Ot), t = Math.ceil(n / Re + 4), Le = !1; r % 2 && (a = a.times(u), s1(a.d, t)), r = wa(r / 2), r !== 0; )
        u = u.times(u), s1(u.d, t);
      return Le = !0, e.s < 0 ? new s(Ot).div(a) : we(a, n);
    }
  } else if (i < 0) throw Error(Ft + "NaN");
  return i = i < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, u.s = 1, Le = !1, a = e.times(Ti(u, n + c)), Le = !0, a = pO(a), a.s = i, a;
};
ae.toPrecision = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? (r = He(a), n = gn(a, r <= i.toExpNeg || r >= i.toExpPos)) : (ar(e, 1, xa), t === void 0 ? t = i.rounding : ar(t, 0, 8), a = we(new i(a), e, t), r = He(a), n = gn(a, e <= r || r <= i.toExpNeg, e)), n;
};
ae.toSignificantDigits = ae.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (ar(e, 1, xa), t === void 0 ? t = n.rounding : ar(t, 0, 8)), we(new n(r), e, t);
};
ae.toString = ae.valueOf = ae.val = ae.toJSON = ae[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = He(e), r = e.constructor;
  return gn(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function hO(e, t) {
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
    throw Error(dn + e);
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
    var u, s, c, l, f, h, p, g, y, m, v, E, _, A, b, T, O, I, N = n.constructor, j = n.s == a.s ? 1 : -1, D = n.d, R = a.d;
    if (!n.s) return new N(n);
    if (!a.s) throw Error(Ft + "Division by zero");
    for (s = n.e - a.e, O = R.length, b = D.length, p = new N(j), g = p.d = [], c = 0; R[c] == (D[c] || 0); ) ++c;
    if (R[c] > (D[c] || 0) && --s, i == null ? E = i = N.precision : o ? E = i + (He(n) - He(a)) + 1 : E = i, E < 0) return new N(0);
    if (E = E / Re + 2 | 0, c = 0, O == 1)
      for (l = 0, R = R[0], E++; (c < b || l) && E--; c++)
        _ = l * Xe + (D[c] || 0), g[c] = _ / R | 0, l = _ % R | 0;
    else {
      for (l = Xe / (R[0] + 1) | 0, l > 1 && (R = e(R, l), D = e(D, l), O = R.length, b = D.length), A = O, y = D.slice(0, O), m = y.length; m < O; ) y[m++] = 0;
      I = R.slice(), I.unshift(0), T = R[0], R[1] >= Xe / 2 && ++T;
      do
        l = 0, u = t(R, y, O, m), u < 0 ? (v = y[0], O != m && (v = v * Xe + (y[1] || 0)), l = v / T | 0, l > 1 ? (l >= Xe && (l = Xe - 1), f = e(R, l), h = f.length, m = y.length, u = t(f, y, h, m), u == 1 && (l--, r(f, O < h ? I : R, h))) : (l == 0 && (u = l = 1), f = R.slice()), h = f.length, h < m && f.unshift(0), r(y, f, m), u == -1 && (m = y.length, u = t(R, y, O, m), u < 1 && (l++, r(y, O < m ? I : R, m))), m = y.length) : u === 0 && (l++, y = [0]), g[c++] = l, u && y[0] ? y[m++] = D[A] || 0 : (y = [D[A]], m = 1);
      while ((A++ < b || y[0] !== void 0) && E--);
    }
    return g[0] || g.shift(), p.e = s, we(p, o ? i + He(p) + 1 : i);
  };
})();
function pO(e, t) {
  var r, n, a, i, o, u, s = 0, c = 0, l = e.constructor, f = l.precision;
  if (He(e) > 16) throw Error(O0 + He(e));
  if (!e.s) return new l(Ot);
  for (Le = !1, u = f, o = new l(0.03125); e.abs().gte(0.1); )
    e = e.times(o), c += 5;
  for (n = Math.log(tn(2, c)) / Math.LN10 * 2 + 5 | 0, u += n, r = a = i = new l(Ot), l.precision = u; ; ) {
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
function td(e, t, r) {
  if (t > e.LN10.sd())
    throw Le = !0, r && (e.precision = r), Error(Ft + "LN10 precision limit exceeded");
  return we(new e(e.LN10), t);
}
function Lr(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Ti(e, t) {
  var r, n, a, i, o, u, s, c, l, f = 1, h = 10, p = e, g = p.d, y = p.constructor, m = y.precision;
  if (p.s < 1) throw Error(Ft + (p.s ? "NaN" : "-Infinity"));
  if (p.eq(Ot)) return new y(0);
  if (t == null ? (Le = !1, c = m) : c = t, p.eq(10))
    return t == null && (Le = !0), td(y, c);
  if (c += h, y.precision = c, r = tr(g), n = r.charAt(0), i = He(p), Math.abs(i) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      p = p.times(e), r = tr(p.d), n = r.charAt(0), f++;
    i = He(p), n > 1 ? (p = new y("0." + r), i++) : p = new y(n + "." + r.slice(1));
  } else
    return s = td(y, c + 2, m).times(i + ""), p = Ti(new y(n + "." + r.slice(1)), c - h).plus(s), y.precision = m, t == null ? (Le = !0, we(p, m)) : p;
  for (u = o = p = Er(p.minus(Ot), p.plus(Ot), c), l = we(p.times(p), c), a = 3; ; ) {
    if (o = we(o.times(l), c), s = u.plus(Er(o, new y(a), c)), tr(s.d).slice(0, c) === tr(u.d).slice(0, c))
      return u = u.times(2), i !== 0 && (u = u.plus(td(y, c + 2, m).times(i + ""))), u = Er(u, new y(f), c), y.precision = m, t == null ? (Le = !0, we(u, m)) : u;
    u = s, a += 2;
  }
}
function u1(e, t) {
  var r, n, a;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (a = t.length; t.charCodeAt(a - 1) === 48; ) --a;
  if (t = t.slice(n, a), t) {
    if (a -= n, r = r - n - 1, e.e = wa(r / Re), e.d = [], n = (r + 1) % Re, r < 0 && (n += Re), n < a) {
      for (n && e.d.push(+t.slice(0, n)), a -= Re; n < a; ) e.d.push(+t.slice(n, n += Re));
      t = t.slice(n), n = Re - t.length;
    } else
      n -= a;
    for (; n--; ) t += "0";
    if (e.d.push(+t), Le && (e.e > ru || e.e < -ru)) throw Error(O0 + r);
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
  if (r !== void 0 && (i = tn(10, o - a - 1), u = c / i % 10 | 0, s = t < 0 || f[l + 1] !== void 0 || c % i, s = r < 4 ? (u || s) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : u > 5 || u == 5 && (r == 4 || s || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? a > 0 ? c / tn(10, o - a) : 0 : f[l - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !f[0])
    return s ? (i = He(e), f.length = 1, t = t - i - 1, f[0] = tn(10, (Re - t % Re) % Re), e.e = wa(-t / Re) || 0) : (f.length = 1, f[0] = e.e = e.s = 0), e;
  if (n == 0 ? (f.length = l, i = 1, l--) : (f.length = l + 1, i = tn(10, Re - n), f[l] = a > 0 ? (c / tn(10, o - a) % tn(10, a) | 0) * i : 0), s)
    for (; ; )
      if (l == 0) {
        (f[0] += i) == Xe && (f[0] = 1, ++e.e);
        break;
      } else {
        if (f[l] += i, f[l] != Xe) break;
        f[l--] = 0, i = 1;
      }
  for (n = f.length; f[--n] === 0; ) f.pop();
  if (Le && (e.e > ru || e.e < -ru))
    throw Error(O0 + He(e));
  return e;
}
function mO(e, t) {
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
function gn(e, t, r) {
  var n, a = He(e), i = tr(e.d), o = i.length;
  return t ? (r && (n = r - o) > 0 ? i = i.charAt(0) + "." + i.slice(1) + Lr(n) : o > 1 && (i = i.charAt(0) + "." + i.slice(1)), i = i + (a < 0 ? "e" : "e+") + a) : a < 0 ? (i = "0." + Lr(-a - 1) + i, r && (n = r - o) > 0 && (i += Lr(n))) : a >= o ? (i += Lr(a + 1 - o), r && (n = r - a - 1) > 0 && (i = i + "." + Lr(n))) : ((n = a + 1) < o && (i = i.slice(0, n) + "." + i.slice(n)), r && (n = r - o) > 0 && (a + 1 === o && (i += "."), i += Lr(n))), e.s < 0 ? "-" + i : i;
}
function s1(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function yO(e) {
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
        throw Error(dn + i);
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
      return u1(o, i.toString());
    } else if (typeof i != "string")
      throw Error(dn + i);
    if (i.charCodeAt(0) === 45 ? (i = i.slice(1), o.s = -1) : o.s = 1, Mk.test(i)) u1(o, i);
    else throw Error(dn + i);
  }
  if (a.prototype = ae, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.clone = yO, a.config = a.set = Lk, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return a.config(e), a;
}
function Lk(e) {
  if (!e || typeof e != "object")
    throw Error(Ft + "Object expected");
  var t, r, n, a = [
    "precision",
    1,
    xa,
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
      if (wa(n) === n && n >= a[t + 1] && n <= a[t + 2]) this[r] = n;
      else throw Error(dn + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(dn + r + ": " + n);
  return this;
}
var S0 = yO(Dk);
Ot = new S0(1);
const Se = S0;
function kk(e) {
  return $k(e) || Fk(e) || jk(e) || Bk();
}
function Bk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function jk(e, t) {
  if (e) {
    if (typeof e == "string") return Sh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Sh(e, t);
  }
}
function Fk(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function $k(e) {
  if (Array.isArray(e)) return Sh(e);
}
function Sh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var Uk = function(t) {
  return t;
}, bO = {}, gO = function(t) {
  return t === bO;
}, c1 = function(t) {
  return function r() {
    return arguments.length === 0 || arguments.length === 1 && gO(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments);
  };
}, Hk = function e(t, r) {
  return t === 1 ? r : c1(function() {
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a.filter(function(u) {
      return u !== bO;
    }).length;
    return o >= t ? r.apply(void 0, a) : e(t - o, c1(function() {
      for (var u = arguments.length, s = new Array(u), c = 0; c < u; c++)
        s[c] = arguments[c];
      var l = a.map(function(f) {
        return gO(f) ? s.shift() : f;
      });
      return r.apply(void 0, kk(l).concat(s));
    }));
  });
}, cs = function(t) {
  return Hk(t.length, t);
}, xh = function(t, r) {
  for (var n = [], a = t; a < r; ++a)
    n[a - t] = a;
  return n;
}, qk = cs(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
    return t[r];
  }).map(e);
}), Wk = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (!r.length)
    return Uk;
  var a = r.reverse(), i = a[0], o = a.slice(1);
  return function() {
    return o.reduce(function(u, s) {
      return s(u);
    }, i.apply(void 0, arguments));
  };
}, wh = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, vO = function(t) {
  var r = null, n = null;
  return function() {
    for (var a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return r && i.every(function(u, s) {
      return u === r[s];
    }) || (r = i, n = t.apply(void 0, i)), n;
  };
};
function Yk(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new Se(e).abs().log(10).toNumber()) + 1, t;
}
function zk(e, t, r) {
  for (var n = new Se(e), a = 0, i = []; n.lt(t) && a < 1e5; )
    i.push(n.toNumber()), n = n.add(r), a++;
  return i;
}
var Gk = cs(function(e, t, r) {
  var n = +e, a = +t;
  return n + r * (a - n);
}), Kk = cs(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, (r - e) / n;
}), Vk = cs(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n));
});
const ls = {
  rangeStep: zk,
  getDigitCount: Yk,
  interpolateNumber: Gk,
  uninterpolateNumber: Kk,
  uninterpolateTruncation: Vk
};
function Ph(e) {
  return Zk(e) || Qk(e) || EO(e) || Xk();
}
function Xk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Qk(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function Zk(e) {
  if (Array.isArray(e)) return Ih(e);
}
function _i(e, t) {
  return t4(e) || e4(e, t) || EO(e, t) || Jk();
}
function Jk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function EO(e, t) {
  if (e) {
    if (typeof e == "string") return Ih(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ih(e, t);
  }
}
function Ih(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function e4(e, t) {
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
function t4(e) {
  if (Array.isArray(e)) return e;
}
function TO(e) {
  var t = _i(e, 2), r = t[0], n = t[1], a = r, i = n;
  return r > n && (a = n, i = r), [a, i];
}
function _O(e, t, r) {
  if (e.lte(0))
    return new Se(0);
  var n = ls.getDigitCount(e.toNumber()), a = new Se(10).pow(n), i = e.div(a), o = n !== 1 ? 0.05 : 0.1, u = new Se(Math.ceil(i.div(o).toNumber())).add(r).mul(o), s = u.mul(a);
  return t ? s : new Se(Math.ceil(s));
}
function r4(e, t, r) {
  var n = 1, a = new Se(e);
  if (!a.isint() && r) {
    var i = Math.abs(e);
    i < 1 ? (n = new Se(10).pow(ls.getDigitCount(e) - 1), a = new Se(Math.floor(a.div(n).toNumber())).mul(n)) : i > 1 && (a = new Se(Math.floor(e)));
  } else e === 0 ? a = new Se(Math.floor((t - 1) / 2)) : r || (a = new Se(Math.floor(e)));
  var o = Math.floor((t - 1) / 2), u = Wk(qk(function(s) {
    return a.add(new Se(s - o).mul(n)).toNumber();
  }), xh);
  return u(0, t);
}
function AO(e, t, r, n) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1)))
    return {
      step: new Se(0),
      tickMin: new Se(0),
      tickMax: new Se(0)
    };
  var i = _O(new Se(t).sub(e).div(r - 1), n, a), o;
  e <= 0 && t >= 0 ? o = new Se(0) : (o = new Se(e).add(t).div(2), o = o.sub(new Se(o).mod(i)));
  var u = Math.ceil(o.sub(e).div(i).toNumber()), s = Math.ceil(new Se(t).sub(o).div(i).toNumber()), c = u + s + 1;
  return c > r ? AO(e, t, r, n, a + 1) : (c < r && (s = t > 0 ? s + (r - c) : s, u = t > 0 ? u : u + (r - c)), {
    step: i,
    tickMin: o.sub(new Se(u).mul(i)),
    tickMax: o.add(new Se(s).mul(i))
  });
}
function n4(e) {
  var t = _i(e, 2), r = t[0], n = t[1], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = Math.max(a, 2), u = TO([r, n]), s = _i(u, 2), c = s[0], l = s[1];
  if (c === -1 / 0 || l === 1 / 0) {
    var f = l === 1 / 0 ? [c].concat(Ph(xh(0, a - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(Ph(xh(0, a - 1).map(function() {
      return -1 / 0;
    })), [l]);
    return r > n ? wh(f) : f;
  }
  if (c === l)
    return r4(c, a, i);
  var h = AO(c, l, o, i), p = h.step, g = h.tickMin, y = h.tickMax, m = ls.rangeStep(g, y.add(new Se(0.1).mul(p)), p);
  return r > n ? wh(m) : m;
}
function a4(e, t) {
  var r = _i(e, 2), n = r[0], a = r[1], i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = TO([n, a]), u = _i(o, 2), s = u[0], c = u[1];
  if (s === -1 / 0 || c === 1 / 0)
    return [n, a];
  if (s === c)
    return [s];
  var l = Math.max(t, 2), f = _O(new Se(c).sub(s).div(l - 1), i, 0), h = [].concat(Ph(ls.rangeStep(new Se(s), new Se(c).sub(new Se(0.99).mul(f)), f)), [c]);
  return n > a ? wh(h) : h;
}
var i4 = vO(n4), o4 = vO(a4), u4 = process.env.NODE_ENV === "production", rd = "Invariant failed";
function vt(e, t) {
  if (u4)
    throw new Error(rd);
  var r = typeof t == "function" ? t() : t, n = r ? "".concat(rd, ": ").concat(r) : rd;
  throw new Error(n);
}
var s4 = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function na(e) {
  "@babel/helpers - typeof";
  return na = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, na(e);
}
function nu() {
  return nu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, nu.apply(this, arguments);
}
function c4(e, t) {
  return h4(e) || d4(e, t) || f4(e, t) || l4();
}
function l4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function f4(e, t) {
  if (e) {
    if (typeof e == "string") return l1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return l1(e, t);
  }
}
function l1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function d4(e, t) {
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
function h4(e) {
  if (Array.isArray(e)) return e;
}
function p4(e, t) {
  if (e == null) return {};
  var r = m4(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function m4(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function y4(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function b4(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, xO(n.key), n);
  }
}
function g4(e, t, r) {
  return t && b4(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function v4(e, t, r) {
  return t = au(t), E4(e, OO() ? Reflect.construct(t, r || [], au(e).constructor) : t.apply(e, r));
}
function E4(e, t) {
  if (t && (na(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return T4(e);
}
function T4(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function OO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (OO = function() {
    return !!e;
  })();
}
function au(e) {
  return au = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, au(e);
}
function _4(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ch(e, t);
}
function Ch(e, t) {
  return Ch = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Ch(e, t);
}
function SO(e, t, r) {
  return t = xO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function xO(e) {
  var t = A4(e, "string");
  return na(t) == "symbol" ? t : t + "";
}
function A4(e, t) {
  if (na(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (na(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var fs = /* @__PURE__ */ (function(e) {
  function t() {
    return y4(this, t), v4(this, t, arguments);
  }
  return _4(t, e), g4(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.offset, i = n.layout, o = n.width, u = n.dataKey, s = n.data, c = n.dataPointFormatter, l = n.xAxis, f = n.yAxis, h = p4(n, s4), p = le(h, !1);
      this.props.direction === "x" && l.type !== "number" && (process.env.NODE_ENV !== "production" ? vt(!1, 'ErrorBar requires Axis type property to be "number".') : vt());
      var g = s.map(function(y) {
        var m = c(y, u), v = m.x, E = m.y, _ = m.value, A = m.errorVal;
        if (!A)
          return null;
        var b = [], T, O;
        if (Array.isArray(A)) {
          var I = c4(A, 2);
          T = I[0], O = I[1];
        } else
          T = O = A;
        if (i === "vertical") {
          var N = l.scale, j = E + a, D = j + o, R = j - o, B = N(_ - T), F = N(_ + O);
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
          var $ = f.scale, q = v + a, Y = q - o, Q = q + o, te = $(_ - T), k = $(_ + O);
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
        return /* @__PURE__ */ C.createElement(Oe, nu({
          className: "recharts-errorBar",
          key: "bar-".concat(b.map(function(W) {
            return "".concat(W.x1, "-").concat(W.x2, "-").concat(W.y1, "-").concat(W.y2);
          }))
        }, p), b.map(function(W) {
          return /* @__PURE__ */ C.createElement("line", nu({}, W, {
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
SO(fs, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
SO(fs, "displayName", "ErrorBar");
function Ai(e) {
  "@babel/helpers - typeof";
  return Ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ai(e);
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
function Qr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? f1(Object(r), !0).forEach(function(n) {
      O4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : f1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function O4(e, t, r) {
  return t = S4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function S4(e) {
  var t = x4(e, "string");
  return Ai(t) == "symbol" ? t : t + "";
}
function x4(e, t) {
  if (Ai(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ai(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var wO = function(t) {
  var r = t.children, n = t.formattedGraphicalItems, a = t.legendWidth, i = t.legendContent, o = At(r, Ur);
  if (!o)
    return null;
  var u = Ur.defaultProps, s = u !== void 0 ? Qr(Qr({}, u), o.props) : {}, c;
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
    var f = l.item, h = f.type.defaultProps, p = h !== void 0 ? Qr(Qr({}, h), f.props) : {}, g = p.dataKey, y = p.name, m = p.legendType, v = p.hide;
    return {
      inactive: v,
      dataKey: g,
      type: s.iconType || m || "square",
      color: x0(f),
      value: y || g,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: p
    };
  }), Qr(Qr(Qr({}, s), Ur.getWithHeight(o, a)), {}, {
    payload: c,
    item: o
  });
};
function Oi(e) {
  "@babel/helpers - typeof";
  return Oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Oi(e);
}
function d1(e) {
  return C4(e) || I4(e) || P4(e) || w4();
}
function w4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function P4(e, t) {
  if (e) {
    if (typeof e == "string") return Nh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Nh(e, t);
  }
}
function I4(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function C4(e) {
  if (Array.isArray(e)) return Nh(e);
}
function Nh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function h1(e, t) {
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
    t % 2 ? h1(Object(r), !0).forEach(function(n) {
      Yn(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : h1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Yn(e, t, r) {
  return t = N4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function N4(e) {
  var t = R4(e, "string");
  return Oi(t) == "symbol" ? t : t + "";
}
function R4(e, t) {
  if (Oi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Oi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ut(e, t, r) {
  return me(e) || me(t) ? r : ze(t) ? xt(e, t, r) : de(t) ? t(e) : r;
}
function ei(e, t, r, n) {
  var a = Ck(e, function(u) {
    return ut(u, t);
  });
  if (r === "number") {
    var i = a.filter(function(u) {
      return J(u) || parseFloat(u);
    });
    return i.length ? [us(i), os(i)] : [1 / 0, -1 / 0];
  }
  var o = n ? a.filter(function(u) {
    return !me(u);
  }) : a;
  return o.map(function(u) {
    return ze(u) || u instanceof Date ? u : "";
  });
}
var D4 = function(t) {
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
        var v = [Math.min(f, (p + f) / 2), Math.max(f, (p + f) / 2)];
        if (t > v[0] && t <= v[1] || t >= g[0] && t <= g[1]) {
          o = a[c].index;
          break;
        }
      } else {
        var E = Math.min(l, h), _ = Math.max(l, h);
        if (t > (E + f) / 2 && t <= (_ + f) / 2) {
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
}, x0 = function(t) {
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
}, M4 = function(t) {
  var r = t.barSize, n = t.totalSize, a = t.stackGroups, i = a === void 0 ? {} : a;
  if (!i)
    return {};
  for (var o = {}, u = Object.keys(i), s = 0, c = u.length; s < c; s++)
    for (var l = i[u[s]].stackGroups, f = Object.keys(l), h = 0, p = f.length; h < p; h++) {
      var g = l[f[h]], y = g.items, m = g.cateAxisId, v = y.filter(function(O) {
        return vr(O.type).indexOf("Bar") >= 0;
      });
      if (v && v.length) {
        var E = v[0].type.defaultProps, _ = E !== void 0 ? Be(Be({}, E), v[0].props) : v[0].props, A = _.barSize, b = _[m];
        o[b] || (o[b] = []);
        var T = me(A) ? r : A;
        o[b].push({
          item: v[0],
          stackList: v.slice(1),
          barSize: me(T) ? void 0 : ht(T, n, 0)
        });
      }
    }
  return o;
}, L4 = function(t) {
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
      var T = {
        item: b.item,
        position: {
          offset: m.offset + m.size + c,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: h ? p : b.barSize
        }
      }, O = [].concat(d1(A), [T]);
      return m = O[O.length - 1].position, b.stackList && b.stackList.length && b.stackList.forEach(function(I) {
        O.push({
          item: I,
          position: m
        });
      }), O;
    }, f);
  } else {
    var v = ht(n, a, 0, !0);
    a - 2 * v - (s - 1) * c <= 0 && (c = 0);
    var E = (a - 2 * v - (s - 1) * c) / s;
    E > 1 && (E >>= 0);
    var _ = u === +u ? Math.min(E, u) : E;
    l = o.reduce(function(A, b, T) {
      var O = [].concat(d1(A), [{
        item: b.item,
        position: {
          offset: v + (E + c) * T + (E - _) / 2,
          size: _
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
}, k4 = function(t, r, n, a) {
  var i = n.children, o = n.width, u = n.margin, s = o - (u.left || 0) - (u.right || 0), c = wO({
    children: i,
    legendWidth: s
  });
  if (c) {
    var l = a || {}, f = l.width, h = l.height, p = c.align, g = c.verticalAlign, y = c.layout;
    if ((y === "vertical" || y === "horizontal" && g === "middle") && p !== "center" && J(t[p]))
      return Be(Be({}, t), {}, Yn({}, p, t[p] + (f || 0)));
    if ((y === "horizontal" || y === "vertical" && p === "center") && g !== "middle" && J(t[g]))
      return Be(Be({}, t), {}, Yn({}, g, t[g] + (h || 0)));
  }
  return t;
}, B4 = function(t, r, n) {
  return me(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0;
}, PO = function(t, r, n, a, i) {
  var o = r.props.children, u = jt(o, fs).filter(function(c) {
    return B4(a, i, c.props.direction);
  });
  if (u && u.length) {
    var s = u.map(function(c) {
      return c.props.dataKey;
    });
    return t.reduce(function(c, l) {
      var f = ut(l, n);
      if (me(f)) return c;
      var h = Array.isArray(f) ? [us(f), os(f)] : [f, f], p = s.reduce(function(g, y) {
        var m = ut(l, y, 0), v = h[0] - Math.abs(Array.isArray(m) ? m[0] : m), E = h[1] + Math.abs(Array.isArray(m) ? m[1] : m);
        return [Math.min(v, g[0]), Math.max(E, g[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(p[0], c[0]), Math.max(p[1], c[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, j4 = function(t, r, n, a, i) {
  var o = r.map(function(u) {
    return PO(t, u, n, i, a);
  }).filter(function(u) {
    return !me(u);
  });
  return o && o.length ? o.reduce(function(u, s) {
    return [Math.min(u[0], s[0]), Math.max(u[1], s[1])];
  }, [1 / 0, -1 / 0]) : null;
}, IO = function(t, r, n, a, i) {
  var o = r.map(function(s) {
    var c = s.props.dataKey;
    return n === "number" && c && PO(t, s, c, a) || ei(t, c, n, i);
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
}, CO = function(t, r) {
  return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis";
}, NO = function(t, r, n, a) {
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
      return !Gi(f.coordinate);
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
}, nd = /* @__PURE__ */ new WeakMap(), bo = function(t, r) {
  if (typeof r != "function")
    return t;
  nd.has(t) || nd.set(t, /* @__PURE__ */ new WeakMap());
  var n = nd.get(t);
  if (n.has(r))
    return n.get(r);
  var a = function() {
    t.apply(void 0, arguments), r.apply(void 0, arguments);
  };
  return n.set(r, a), a;
}, RO = function(t, r, n) {
  var a = t.scale, i = t.type, o = t.layout, u = t.axisType;
  if (a === "auto")
    return o === "radial" && u === "radiusAxis" ? {
      scale: yi(),
      realScaleType: "band"
    } : o === "radial" && u === "angleAxis" ? {
      scale: Zo(),
      realScaleType: "linear"
    } : i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: Ja(),
      realScaleType: "point"
    } : i === "category" ? {
      scale: yi(),
      realScaleType: "band"
    } : {
      scale: Zo(),
      realScaleType: "linear"
    };
  if (mn(a)) {
    var s = "scale".concat(Yu(a));
    return {
      scale: (Zv[s] || Ja)(),
      realScaleType: Zv[s] ? s : "point"
    };
  }
  return de(a) ? {
    scale: a
  } : {
    scale: Ja(),
    realScaleType: "point"
  };
}, p1 = 1e-4, DO = function(t) {
  var r = t.domain();
  if (!(!r || r.length <= 2)) {
    var n = r.length, a = t.range(), i = Math.min(a[0], a[1]) - p1, o = Math.max(a[0], a[1]) + p1, u = t(r[0]), s = t(r[n - 1]);
    (u < i || u > o || s < i || s > o) && t.domain([r[0], r[n - 1]]);
  }
}, F4 = function(t, r) {
  if (!t)
    return null;
  for (var n = 0, a = t.length; n < a; n++)
    if (t[n].item === r)
      return t[n].position;
  return null;
}, $4 = function(t, r) {
  if (!r || r.length !== 2 || !J(r[0]) || !J(r[1]))
    return t;
  var n = Math.min(r[0], r[1]), a = Math.max(r[0], r[1]), i = [t[0], t[1]];
  return (!J(t[0]) || t[0] < n) && (i[0] = n), (!J(t[1]) || t[1] > a) && (i[1] = a), i[0] > a && (i[0] = a), i[1] < n && (i[1] = n), i;
}, U4 = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, o = 0, u = 0; u < r; ++u) {
        var s = Gi(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
        s >= 0 ? (t[u][n][0] = i, t[u][n][1] = i + s, i = t[u][n][1]) : (t[u][n][0] = o, t[u][n][1] = o + s, o = t[u][n][1]);
      }
}, H4 = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, o = 0; o < r; ++o) {
        var u = Gi(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
        u >= 0 ? (t[o][n][0] = i, t[o][n][1] = i + u, i = t[o][n][1]) : (t[o][n][0] = 0, t[o][n][1] = 0);
      }
}, q4 = {
  sign: U4,
  // @ts-expect-error definitelytyped types are incorrect
  expand: C3,
  // @ts-expect-error definitelytyped types are incorrect
  none: Vn,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: N3,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: R3,
  positive: H4
}, W4 = function(t, r, n) {
  var a = r.map(function(u) {
    return u.props.dataKey;
  }), i = q4[n], o = I3().keys(a).value(function(u, s) {
    return +ut(u, s, 0);
  }).order(uh).offset(i);
  return o(t);
}, Y4 = function(t, r, n, a, i, o) {
  if (!t)
    return null;
  var u = o ? r.reverse() : r, s = {}, c = u.reduce(function(f, h) {
    var p, g = (p = h.type) !== null && p !== void 0 && p.defaultProps ? Be(Be({}, h.type.defaultProps), h.props) : h.props, y = g.stackId, m = g.hide;
    if (m)
      return f;
    var v = g[n], E = f[v] || {
      hasStack: !1,
      stackGroups: {}
    };
    if (ze(y)) {
      var _ = E.stackGroups[y] || {
        numericAxisId: n,
        cateAxisId: a,
        items: []
      };
      _.items.push(h), E.hasStack = !0, E.stackGroups[y] = _;
    } else
      E.stackGroups[Ki("_stackId_")] = {
        numericAxisId: n,
        cateAxisId: a,
        items: [h]
      };
    return Be(Be({}, f), {}, Yn({}, v, E));
  }, s), l = {};
  return Object.keys(c).reduce(function(f, h) {
    var p = c[h];
    if (p.hasStack) {
      var g = {};
      p.stackGroups = Object.keys(p.stackGroups).reduce(function(y, m) {
        var v = p.stackGroups[m];
        return Be(Be({}, y), {}, Yn({}, m, {
          numericAxisId: n,
          cateAxisId: a,
          items: v.items,
          stackedData: W4(t, v.items, i)
        }));
      }, g);
    }
    return Be(Be({}, f), {}, Yn({}, h, p));
  }, l);
}, MO = function(t, r) {
  var n = r.realScaleType, a = r.type, i = r.tickCount, o = r.originalDomain, u = r.allowDecimals, s = n || r.scale;
  if (s !== "auto" && s !== "linear")
    return null;
  if (i && a === "number" && o && (o[0] === "auto" || o[1] === "auto")) {
    var c = t.domain();
    if (!c.length)
      return null;
    var l = i4(c, i, u);
    return t.domain([us(l), os(l)]), {
      niceTicks: l
    };
  }
  if (i && a === "number") {
    var f = t.domain(), h = o4(f, i, u);
    return {
      niceTicks: h
    };
  }
  return null;
}, m1 = function(t) {
  var r = t.axis, n = t.ticks, a = t.offset, i = t.bandSize, o = t.entry, u = t.index;
  if (r.type === "category")
    return n[u] ? n[u].coordinate + a : null;
  var s = ut(o, r.dataKey, r.domain[u]);
  return me(s) ? null : r.scale(s) - i / 2 + a;
}, z4 = function(t) {
  var r = t.numericAxis, n = r.scale.domain();
  if (r.type === "number") {
    var a = Math.min(n[0], n[1]), i = Math.max(n[0], n[1]);
    return a <= 0 && i >= 0 ? 0 : i < 0 ? i : a;
  }
  return n[0];
}, G4 = function(t, r) {
  var n, a = (n = t.type) !== null && n !== void 0 && n.defaultProps ? Be(Be({}, t.type.defaultProps), t.props) : t.props, i = a.stackId;
  if (ze(i)) {
    var o = r[i];
    if (o) {
      var u = o.items.indexOf(t);
      return u >= 0 ? o.stackedData[u] : null;
    }
  }
  return null;
}, K4 = function(t) {
  return t.reduce(function(r, n) {
    return [us(n.concat([r[0]]).filter(J)), os(n.concat([r[1]]).filter(J))];
  }, [1 / 0, -1 / 0]);
}, LO = function(t, r, n) {
  return Object.keys(t).reduce(function(a, i) {
    var o = t[i], u = o.stackedData, s = u.reduce(function(c, l) {
      var f = K4(l.slice(r, n + 1));
      return [Math.min(c[0], f[0]), Math.max(c[1], f[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(s[0], a[0]), Math.max(s[1], a[1])];
  }, [1 / 0, -1 / 0]).map(function(a) {
    return a === 1 / 0 || a === -1 / 0 ? 0 : a;
  });
}, y1 = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, b1 = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Rh = function(t, r, n) {
  if (de(t))
    return t(r, n);
  if (!Array.isArray(t))
    return r;
  var a = [];
  if (J(t[0]))
    a[0] = n ? t[0] : Math.min(t[0], r[0]);
  else if (y1.test(t[0])) {
    var i = +y1.exec(t[0])[1];
    a[0] = r[0] - i;
  } else de(t[0]) ? a[0] = t[0](r[0]) : a[0] = r[0];
  if (J(t[1]))
    a[1] = n ? t[1] : Math.max(t[1], r[1]);
  else if (b1.test(t[1])) {
    var o = +b1.exec(t[1])[1];
    a[1] = r[1] + o;
  } else de(t[1]) ? a[1] = t[1](r[1]) : a[1] = r[1];
  return a;
}, iu = function(t, r, n) {
  if (t && t.scale && t.scale.bandwidth) {
    var a = t.scale.bandwidth();
    if (!n || a > 0)
      return a;
  }
  if (t && r && r.length >= 2) {
    for (var i = e0(r, function(f) {
      return f.coordinate;
    }), o = 1 / 0, u = 1, s = i.length; u < s; u++) {
      var c = i[u], l = i[u - 1];
      o = Math.min((c.coordinate || 0) - (l.coordinate || 0), o);
    }
    return o === 1 / 0 ? 0 : o;
  }
  return n ? void 0 : 0;
}, g1 = function(t, r, n) {
  return !t || !t.length || ss(t, xt(n, "type.defaultProps.domain")) ? r : t;
}, kO = function(t, r) {
  var n = t.type.defaultProps ? Be(Be({}, t.type.defaultProps), t.props) : t.props, a = n.dataKey, i = n.name, o = n.unit, u = n.formatter, s = n.tooltipType, c = n.chartType, l = n.hide;
  return Be(Be({}, le(t, !1)), {}, {
    dataKey: a,
    unit: o,
    formatter: u,
    name: i || a,
    color: x0(t),
    value: ut(r, a),
    type: s,
    payload: r,
    chartType: c,
    hide: l
  });
};
function Si(e) {
  "@babel/helpers - typeof";
  return Si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Si(e);
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
function fr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? v1(Object(r), !0).forEach(function(n) {
      BO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : v1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function BO(e, t, r) {
  return t = V4(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function V4(e) {
  var t = X4(e, "string");
  return Si(t) == "symbol" ? t : t + "";
}
function X4(e, t) {
  if (Si(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Si(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Q4(e, t) {
  return t8(e) || e8(e, t) || J4(e, t) || Z4();
}
function Z4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function J4(e, t) {
  if (e) {
    if (typeof e == "string") return E1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return E1(e, t);
  }
}
function E1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function e8(e, t) {
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
function t8(e) {
  if (Array.isArray(e)) return e;
}
var ou = Math.PI / 180, r8 = function(t) {
  return t * 180 / Math.PI;
}, Ne = function(t, r, n, a) {
  return {
    x: t + Math.cos(-ou * a) * n,
    y: r + Math.sin(-ou * a) * n
  };
}, jO = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, n8 = function(t, r, n, a, i) {
  var o = t.width, u = t.height, s = t.startAngle, c = t.endAngle, l = ht(t.cx, o, o / 2), f = ht(t.cy, u, u / 2), h = jO(o, u, n), p = ht(t.innerRadius, h, 0), g = ht(t.outerRadius, h, h * 0.8), y = Object.keys(r);
  return y.reduce(function(m, v) {
    var E = r[v], _ = E.domain, A = E.reversed, b;
    if (me(E.range))
      a === "angleAxis" ? b = [s, c] : a === "radiusAxis" && (b = [p, g]), A && (b = [b[1], b[0]]);
    else {
      b = E.range;
      var T = b, O = Q4(T, 2);
      s = O[0], c = O[1];
    }
    var I = RO(E, i), N = I.realScaleType, j = I.scale;
    j.domain(_).range(b), DO(j);
    var D = MO(j, fr(fr({}, E), {}, {
      realScaleType: N
    })), R = fr(fr(fr({}, E), D), {}, {
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
    return fr(fr({}, m), {}, BO({}, v, R));
  }, {});
}, a8 = function(t, r) {
  var n = t.x, a = t.y, i = r.x, o = r.y;
  return Math.sqrt(Math.pow(n - i, 2) + Math.pow(a - o, 2));
}, i8 = function(t, r) {
  var n = t.x, a = t.y, i = r.cx, o = r.cy, u = a8({
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
    angle: r8(c),
    angleInRadian: c
  };
}, o8 = function(t) {
  var r = t.startAngle, n = t.endAngle, a = Math.floor(r / 360), i = Math.floor(n / 360), o = Math.min(a, i);
  return {
    startAngle: r - o * 360,
    endAngle: n - o * 360
  };
}, u8 = function(t, r) {
  var n = r.startAngle, a = r.endAngle, i = Math.floor(n / 360), o = Math.floor(a / 360), u = Math.min(i, o);
  return t + u * 360;
}, T1 = function(t, r) {
  var n = t.x, a = t.y, i = i8({
    x: n,
    y: a
  }, r), o = i.radius, u = i.angle, s = r.innerRadius, c = r.outerRadius;
  if (o < s || o > c)
    return !1;
  if (o === 0)
    return !0;
  var l = o8(r), f = l.startAngle, h = l.endAngle, p = u, g;
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
    angle: u8(p, r)
  }) : null;
}, FO = function(t) {
  return !/* @__PURE__ */ Lt(t) && !de(t) && typeof t != "boolean" ? t.className : "";
};
function xi(e) {
  "@babel/helpers - typeof";
  return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xi(e);
}
var s8 = ["offset"];
function c8(e) {
  return h8(e) || d8(e) || f8(e) || l8();
}
function l8() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function f8(e, t) {
  if (e) {
    if (typeof e == "string") return Dh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Dh(e, t);
  }
}
function d8(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function h8(e) {
  if (Array.isArray(e)) return Dh(e);
}
function Dh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function p8(e, t) {
  if (e == null) return {};
  var r = m8(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function m8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
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
function We(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _1(Object(r), !0).forEach(function(n) {
      y8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function y8(e, t, r) {
  return t = b8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function b8(e) {
  var t = g8(e, "string");
  return xi(t) == "symbol" ? t : t + "";
}
function g8(e, t) {
  if (xi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (xi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wi() {
  return wi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, wi.apply(this, arguments);
}
var v8 = function(t) {
  var r = t.value, n = t.formatter, a = me(t.children) ? r : t.children;
  return de(n) ? n(a) : a;
}, E8 = function(t, r) {
  var n = dt(r - t), a = Math.min(Math.abs(r - t), 360);
  return n * a;
}, T8 = function(t, r, n) {
  var a = t.position, i = t.viewBox, o = t.offset, u = t.className, s = i, c = s.cx, l = s.cy, f = s.innerRadius, h = s.outerRadius, p = s.startAngle, g = s.endAngle, y = s.clockWise, m = (f + h) / 2, v = E8(p, g), E = v >= 0 ? 1 : -1, _, A;
  a === "insideStart" ? (_ = p + E * o, A = y) : a === "insideEnd" ? (_ = g - E * o, A = !y) : a === "end" && (_ = g + E * o, A = y), A = v <= 0 ? A : !A;
  var b = Ne(c, l, m, _), T = Ne(c, l, m, _ + (A ? 1 : -1) * 359), O = "M".concat(b.x, ",").concat(b.y, `
    A`).concat(m, ",").concat(m, ",0,1,").concat(A ? 0 : 1, `,
    `).concat(T.x, ",").concat(T.y), I = me(t.id) ? Ki("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ C.createElement("text", wi({}, n, {
    dominantBaseline: "central",
    className: pe("recharts-radial-bar-label", u)
  }), /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("path", {
    id: I,
    d: O
  })), /* @__PURE__ */ C.createElement("textPath", {
    xlinkHref: "#".concat(I)
  }, r));
}, _8 = function(t) {
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
  var m = (s + c) / 2, v = Ne(o, u, m, h), E = v.x, _ = v.y;
  return {
    x: E,
    y: _,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, A8 = function(t) {
  var r = t.viewBox, n = t.parentViewBox, a = t.offset, i = t.position, o = r, u = o.x, s = o.y, c = o.width, l = o.height, f = l >= 0 ? 1 : -1, h = f * a, p = f > 0 ? "end" : "start", g = f > 0 ? "start" : "end", y = c >= 0 ? 1 : -1, m = y * a, v = y > 0 ? "end" : "start", E = y > 0 ? "start" : "end";
  if (i === "top") {
    var _ = {
      x: u + c / 2,
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
      textAnchor: v,
      verticalAnchor: "middle"
    };
    return We(We({}, b), n ? {
      width: Math.max(b.x - n.x, 0),
      height: l
    } : {});
  }
  if (i === "right") {
    var T = {
      x: u + c + m,
      y: s + l / 2,
      textAnchor: E,
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
    x: u + m,
    y: s + l / 2,
    textAnchor: E,
    verticalAnchor: "middle"
  }, O) : i === "insideRight" ? We({
    x: u + c - m,
    y: s + l / 2,
    textAnchor: v,
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
    textAnchor: E,
    verticalAnchor: g
  }, O) : i === "insideTopRight" ? We({
    x: u + c - m,
    y: s + h,
    textAnchor: v,
    verticalAnchor: g
  }, O) : i === "insideBottomLeft" ? We({
    x: u + m,
    y: s + l - h,
    textAnchor: E,
    verticalAnchor: p
  }, O) : i === "insideBottomRight" ? We({
    x: u + c - m,
    y: s + l - h,
    textAnchor: v,
    verticalAnchor: p
  }, O) : _a(i) && (J(i.x) || nn(i.x)) && (J(i.y) || nn(i.y)) ? We({
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
}, O8 = function(t) {
  return "cx" in t && J(t.cx);
};
function Qe(e) {
  var t = e.offset, r = t === void 0 ? 5 : t, n = p8(e, s8), a = We({
    offset: r
  }, n), i = a.viewBox, o = a.position, u = a.value, s = a.children, c = a.content, l = a.className, f = l === void 0 ? "" : l, h = a.textBreakAll;
  if (!i || me(u) && me(s) && !/* @__PURE__ */ Lt(c) && !de(c))
    return null;
  if (/* @__PURE__ */ Lt(c))
    return /* @__PURE__ */ Ue(c, a);
  var p;
  if (de(c)) {
    if (p = /* @__PURE__ */ ai(c, a), /* @__PURE__ */ Lt(p))
      return p;
  } else
    p = v8(a);
  var g = O8(i), y = le(a, !0);
  if (g && (o === "insideStart" || o === "insideEnd" || o === "end"))
    return T8(a, p, y);
  var m = g ? _8(a) : A8(a);
  return /* @__PURE__ */ C.createElement(bn, wi({
    className: pe("recharts-label", f)
  }, y, m, {
    breakAll: h
  }), p);
}
Qe.displayName = "Label";
var $O = function(t) {
  var r = t.cx, n = t.cy, a = t.angle, i = t.startAngle, o = t.endAngle, u = t.r, s = t.radius, c = t.innerRadius, l = t.outerRadius, f = t.x, h = t.y, p = t.top, g = t.left, y = t.width, m = t.height, v = t.clockWise, E = t.labelViewBox;
  if (E)
    return E;
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
    clockWise: v
  } : t.viewBox ? t.viewBox : {};
}, S8 = function(t, r) {
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
  }) : _a(t) ? /* @__PURE__ */ C.createElement(Qe, wi({
    viewBox: r
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, x8 = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && n && !t.label)
    return null;
  var a = t.children, i = $O(t), o = jt(a, Qe).map(function(s, c) {
    return /* @__PURE__ */ Ue(s, {
      viewBox: r || i,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(c)
    });
  });
  if (!n)
    return o;
  var u = S8(t.label, r || i);
  return [u].concat(c8(o));
};
Qe.parseViewBox = $O;
Qe.renderCallByParent = x8;
var ad, A1;
function w8() {
  if (A1) return ad;
  A1 = 1;
  function e(t) {
    var r = t == null ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  }
  return ad = e, ad;
}
var P8 = w8();
const I8 = /* @__PURE__ */ xe(P8);
function Pi(e) {
  "@babel/helpers - typeof";
  return Pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pi(e);
}
var C8 = ["valueAccessor"], N8 = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function R8(e) {
  return k8(e) || L8(e) || M8(e) || D8();
}
function D8() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function M8(e, t) {
  if (e) {
    if (typeof e == "string") return Mh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Mh(e, t);
  }
}
function L8(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function k8(e) {
  if (Array.isArray(e)) return Mh(e);
}
function Mh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function uu() {
  return uu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, uu.apply(this, arguments);
}
function O1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function S1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? O1(Object(r), !0).forEach(function(n) {
      B8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : O1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function B8(e, t, r) {
  return t = j8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function j8(e) {
  var t = F8(e, "string");
  return Pi(t) == "symbol" ? t : t + "";
}
function F8(e, t) {
  if (Pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function x1(e, t) {
  if (e == null) return {};
  var r = $8(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function $8(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var U8 = function(t) {
  return Array.isArray(t.value) ? I8(t.value) : t.value;
};
function Gt(e) {
  var t = e.valueAccessor, r = t === void 0 ? U8 : t, n = x1(e, C8), a = n.data, i = n.dataKey, o = n.clockWise, u = n.id, s = n.textBreakAll, c = x1(n, N8);
  return !a || !a.length ? null : /* @__PURE__ */ C.createElement(Oe, {
    className: "recharts-label-list"
  }, a.map(function(l, f) {
    var h = me(i) ? r(l, f) : ut(l && l.payload, i), p = me(u) ? {} : {
      id: "".concat(u, "-").concat(f)
    };
    return /* @__PURE__ */ C.createElement(Qe, uu({}, le(l, !0), c, p, {
      parentViewBox: l.parentViewBox,
      value: h,
      textBreakAll: s,
      viewBox: Qe.parseViewBox(me(o) ? l : S1(S1({}, l), {}, {
        clockWise: o
      })),
      key: "label-".concat(f),
      index: f
    }));
  }));
}
Gt.displayName = "LabelList";
function H8(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ C.createElement(Gt, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ C.isValidElement(e) || de(e) ? /* @__PURE__ */ C.createElement(Gt, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : _a(e) ? /* @__PURE__ */ C.createElement(Gt, uu({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function q8(e, t) {
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
  var i = H8(e.label, t);
  return [i].concat(R8(a));
}
Gt.renderCallByParent = q8;
function Ii(e) {
  "@babel/helpers - typeof";
  return Ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ii(e);
}
function Lh() {
  return Lh = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Lh.apply(this, arguments);
}
function w1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function P1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? w1(Object(r), !0).forEach(function(n) {
      W8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : w1(Object(r)).forEach(function(n) {
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
  return Ii(t) == "symbol" ? t : t + "";
}
function z8(e, t) {
  if (Ii(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var G8 = function(t, r) {
  var n = dt(r - t), a = Math.min(Math.abs(r - t), 359.999);
  return n * a;
}, go = function(t) {
  var r = t.cx, n = t.cy, a = t.radius, i = t.angle, o = t.sign, u = t.isExternal, s = t.cornerRadius, c = t.cornerIsExternal, l = s * (u ? 1 : -1) + a, f = Math.asin(s / l) / ou, h = c ? i : i + o * f, p = Ne(r, n, l, h), g = Ne(r, n, a, h), y = c ? i - o * f : i, m = Ne(r, n, l * Math.cos(f * ou), y);
  return {
    center: p,
    circleTangency: g,
    lineTangency: m,
    theta: f
  };
}, UO = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, o = t.startAngle, u = t.endAngle, s = G8(o, u), c = o + s, l = Ne(r, n, i, o), f = Ne(r, n, i, c), h = "M ".concat(l.x, ",").concat(l.y, `
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
}, K8 = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, o = t.cornerRadius, u = t.forceCornerRadius, s = t.cornerIsExternal, c = t.startAngle, l = t.endAngle, f = dt(l - c), h = go({
    cx: r,
    cy: n,
    radius: i,
    angle: c,
    sign: f,
    cornerRadius: o,
    cornerIsExternal: s
  }), p = h.circleTangency, g = h.lineTangency, y = h.theta, m = go({
    cx: r,
    cy: n,
    radius: i,
    angle: l,
    sign: -f,
    cornerRadius: o,
    cornerIsExternal: s
  }), v = m.circleTangency, E = m.lineTangency, _ = m.theta, A = s ? Math.abs(c - l) : Math.abs(c - l) - y - _;
  if (A < 0)
    return u ? "M ".concat(g.x, ",").concat(g.y, `
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(o * 2, `,0
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(-o * 2, `,0
      `) : UO({
      cx: r,
      cy: n,
      innerRadius: a,
      outerRadius: i,
      startAngle: c,
      endAngle: l
    });
  var b = "M ".concat(g.x, ",").concat(g.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(f < 0), ",").concat(p.x, ",").concat(p.y, `
    A`).concat(i, ",").concat(i, ",0,").concat(+(A > 180), ",").concat(+(f < 0), ",").concat(v.x, ",").concat(v.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(f < 0), ",").concat(E.x, ",").concat(E.y, `
  `);
  if (a > 0) {
    var T = go({
      cx: r,
      cy: n,
      radius: a,
      angle: c,
      sign: f,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: s
    }), O = T.circleTangency, I = T.lineTangency, N = T.theta, j = go({
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
}, V8 = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, HO = function(t) {
  var r = P1(P1({}, V8), t), n = r.cx, a = r.cy, i = r.innerRadius, o = r.outerRadius, u = r.cornerRadius, s = r.forceCornerRadius, c = r.cornerIsExternal, l = r.startAngle, f = r.endAngle, h = r.className;
  if (o < i || l === f)
    return null;
  var p = pe("recharts-sector", h), g = o - i, y = ht(u, g, 0, !0), m;
  return y > 0 && Math.abs(l - f) < 360 ? m = K8({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: o,
    cornerRadius: Math.min(y, g / 2),
    forceCornerRadius: s,
    cornerIsExternal: c,
    startAngle: l,
    endAngle: f
  }) : m = UO({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: o,
    startAngle: l,
    endAngle: f
  }), /* @__PURE__ */ C.createElement("path", Lh({}, le(r, !0), {
    className: p,
    d: m,
    role: "img"
  }));
};
function Ci(e) {
  "@babel/helpers - typeof";
  return Ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ci(e);
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
function I1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function C1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? I1(Object(r), !0).forEach(function(n) {
      X8(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : I1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function X8(e, t, r) {
  return t = Q8(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Q8(e) {
  var t = Z8(e, "string");
  return Ci(t) == "symbol" ? t : t + "";
}
function Z8(e, t) {
  if (Ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var N1 = {
  curveBasisClosed: g3,
  curveBasisOpen: v3,
  curveBasis: b3,
  curveBumpX: n3,
  curveBumpY: a3,
  curveLinearClosed: E3,
  curveLinear: Gu,
  curveMonotoneX: T3,
  curveMonotoneY: _3,
  curveNatural: A3,
  curveStep: O3,
  curveStepAfter: x3,
  curveStepBefore: S3
}, vo = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, ja = function(t) {
  return t.x;
}, Fa = function(t) {
  return t.y;
}, J8 = function(t, r) {
  if (de(t))
    return t;
  var n = "curve".concat(Yu(t));
  return (n === "curveMonotone" || n === "curveBump") && r ? N1["".concat(n).concat(r === "vertical" ? "Y" : "X")] : N1[n] || Gu;
}, e5 = function(t) {
  var r = t.type, n = r === void 0 ? "linear" : r, a = t.points, i = a === void 0 ? [] : a, o = t.baseLine, u = t.layout, s = t.connectNulls, c = s === void 0 ? !1 : s, l = J8(n, u), f = c ? i.filter(function(y) {
    return vo(y);
  }) : i, h;
  if (Array.isArray(o)) {
    var p = c ? o.filter(function(y) {
      return vo(y);
    }) : o, g = f.map(function(y, m) {
      return C1(C1({}, y), {}, {
        base: p[m]
      });
    });
    return u === "vertical" ? h = co().y(Fa).x1(ja).x0(function(y) {
      return y.base.x;
    }) : h = co().x(ja).y1(Fa).y0(function(y) {
      return y.base.y;
    }), h.defined(vo).curve(l), h(g);
  }
  return u === "vertical" && J(o) ? h = co().y(Fa).x1(ja).x0(o) : J(o) ? h = co().x(ja).y1(Fa).y0(o) : h = U_().x(ja).y(Fa), h.defined(vo).curve(l), h(f);
}, Bh = function(t) {
  var r = t.className, n = t.points, a = t.path, i = t.pathRef;
  if ((!n || !n.length) && !a)
    return null;
  var o = n && n.length ? e5(t) : a;
  return /* @__PURE__ */ qr.createElement("path", kh({}, le(t, !1), Mo(t), {
    className: pe("recharts-curve", r),
    d: o,
    ref: i
  }));
}, Eo = { exports: {} }, To = { exports: {} }, Te = {};
var R1;
function t5() {
  if (R1) return Te;
  R1 = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? /* @__PURE__ */ Symbol.for("react.element") : 60103, r = e ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, n = e ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, a = e ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, i = e ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, o = e ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, u = e ? /* @__PURE__ */ Symbol.for("react.context") : 60110, s = e ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, c = e ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, l = e ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, f = e ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, h = e ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, p = e ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, g = e ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, y = e ? /* @__PURE__ */ Symbol.for("react.block") : 60121, m = e ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, v = e ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, E = e ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
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
                case u:
                case l:
                case g:
                case p:
                case o:
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
  return Te.AsyncMode = s, Te.ConcurrentMode = c, Te.ContextConsumer = u, Te.ContextProvider = o, Te.Element = t, Te.ForwardRef = l, Te.Fragment = n, Te.Lazy = g, Te.Memo = p, Te.Portal = r, Te.Profiler = i, Te.StrictMode = a, Te.Suspense = f, Te.isAsyncMode = function(b) {
    return A(b) || _(b) === s;
  }, Te.isConcurrentMode = A, Te.isContextConsumer = function(b) {
    return _(b) === u;
  }, Te.isContextProvider = function(b) {
    return _(b) === o;
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
    return typeof b == "string" || typeof b == "function" || b === n || b === c || b === i || b === a || b === f || b === h || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === p || b.$$typeof === o || b.$$typeof === u || b.$$typeof === l || b.$$typeof === m || b.$$typeof === v || b.$$typeof === E || b.$$typeof === y);
  }, Te.typeOf = _, Te;
}
var _e = {};
var D1;
function r5() {
  return D1 || (D1 = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? /* @__PURE__ */ Symbol.for("react.element") : 60103, r = e ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, n = e ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, a = e ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, i = e ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, o = e ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, u = e ? /* @__PURE__ */ Symbol.for("react.context") : 60110, s = e ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, c = e ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, l = e ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, f = e ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, h = e ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, p = e ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, g = e ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, y = e ? /* @__PURE__ */ Symbol.for("react.block") : 60121, m = e ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, v = e ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, E = e ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
    function _(M) {
      return typeof M == "string" || typeof M == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      M === n || M === c || M === i || M === a || M === f || M === h || typeof M == "object" && M !== null && (M.$$typeof === g || M.$$typeof === p || M.$$typeof === o || M.$$typeof === u || M.$$typeof === l || M.$$typeof === m || M.$$typeof === v || M.$$typeof === E || M.$$typeof === y);
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
    var b = s, T = c, O = u, I = o, N = t, j = l, D = n, R = g, B = p, F = r, $ = i, q = a, Y = f, Q = !1;
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
    _e.AsyncMode = b, _e.ConcurrentMode = T, _e.ContextConsumer = O, _e.ContextProvider = I, _e.Element = N, _e.ForwardRef = j, _e.Fragment = D, _e.Lazy = R, _e.Memo = B, _e.Portal = F, _e.Profiler = $, _e.StrictMode = q, _e.Suspense = Y, _e.isAsyncMode = te, _e.isConcurrentMode = k, _e.isContextConsumer = W, _e.isContextProvider = z, _e.isElement = Z, _e.isForwardRef = ne, _e.isFragment = oe, _e.isLazy = ue, _e.isMemo = fe, _e.isPortal = ce, _e.isProfiler = G, _e.isStrictMode = re, _e.isSuspense = ie, _e.isValidElementType = _, _e.typeOf = A;
  })()), _e;
}
var M1;
function qO() {
  return M1 || (M1 = 1, process.env.NODE_ENV === "production" ? To.exports = t5() : To.exports = r5()), To.exports;
}
var id, L1;
function n5() {
  if (L1) return id;
  L1 = 1;
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
  return id = a() ? Object.assign : function(i, o) {
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
  }, id;
}
var od, k1;
function w0() {
  if (k1) return od;
  k1 = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return od = e, od;
}
var ud, B1;
function WO() {
  return B1 || (B1 = 1, ud = Function.call.bind(Object.prototype.hasOwnProperty)), ud;
}
var sd, j1;
function a5() {
  if (j1) return sd;
  j1 = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = /* @__PURE__ */ w0(), r = {}, n = /* @__PURE__ */ WO();
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
  }, sd = a, sd;
}
var cd, F1;
function i5() {
  if (F1) return cd;
  F1 = 1;
  var e = qO(), t = n5(), r = /* @__PURE__ */ w0(), n = /* @__PURE__ */ WO(), a = /* @__PURE__ */ a5(), i = function() {
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
  return cd = function(u, s) {
    var c = typeof Symbol == "function" && Symbol.iterator, l = "@@iterator";
    function f(k) {
      var W = k && (c && k[c] || k[l]);
      if (typeof W == "function")
        return W;
    }
    var h = "<<anonymous>>", p = {
      array: v("array"),
      bigint: v("bigint"),
      bool: v("boolean"),
      func: v("function"),
      number: v("number"),
      object: v("object"),
      string: v("string"),
      symbol: v("symbol"),
      any: E(),
      arrayOf: _,
      element: A(),
      elementType: b(),
      instanceOf: T,
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
    function v(k) {
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
    function E() {
      return m(o);
    }
    function _(k) {
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
    function T(k) {
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
  }, cd;
}
var ld, $1;
function o5() {
  if ($1) return ld;
  $1 = 1;
  var e = /* @__PURE__ */ w0();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, ld = function() {
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
  }, ld;
}
var U1;
function u5() {
  if (U1) return Eo.exports;
  if (U1 = 1, process.env.NODE_ENV !== "production") {
    var e = qO(), t = !0;
    Eo.exports = /* @__PURE__ */ i5()(e.isElement, t);
  } else
    Eo.exports = /* @__PURE__ */ o5()();
  return Eo.exports;
}
var s5 = /* @__PURE__ */ u5();
const Ae = /* @__PURE__ */ xe(s5), { getOwnPropertyNames: c5, getOwnPropertySymbols: l5 } = Object, { hasOwnProperty: f5 } = Object.prototype;
function fd(e, t) {
  return function(n, a, i) {
    return e(n, a, i) && t(n, a, i);
  };
}
function _o(e) {
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
function d5(e) {
  return e?.[Symbol.toStringTag];
}
function H1(e) {
  return c5(e).concat(l5(e));
}
const h5 = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((e, t) => f5.call(e, t))
);
function xn(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
const p5 = "__v", m5 = "__o", y5 = "_owner", { getOwnPropertyDescriptor: q1, keys: W1 } = Object;
function b5(e, t) {
  return e.byteLength === t.byteLength && su(new Uint8Array(e), new Uint8Array(t));
}
function g5(e, t, r) {
  let n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function v5(e, t) {
  return e.byteLength === t.byteLength && su(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}
function E5(e, t) {
  return xn(e.getTime(), t.getTime());
}
function T5(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function _5(e, t) {
  return e === t;
}
function Y1(e, t, r) {
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
const A5 = xn;
function O5(e, t, r) {
  const n = W1(e);
  let a = n.length;
  if (W1(t).length !== a)
    return !1;
  for (; a-- > 0; )
    if (!YO(e, t, r, n[a]))
      return !1;
  return !0;
}
function $a(e, t, r) {
  const n = H1(e);
  let a = n.length;
  if (H1(t).length !== a)
    return !1;
  let i, o, u;
  for (; a-- > 0; )
    if (i = n[a], !YO(e, t, r, i) || (o = q1(e, i), u = q1(t, i), (o || u) && (!o || !u || o.configurable !== u.configurable || o.enumerable !== u.enumerable || o.writable !== u.writable)))
      return !1;
  return !0;
}
function S5(e, t) {
  return xn(e.valueOf(), t.valueOf());
}
function x5(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function z1(e, t, r) {
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
function su(e, t) {
  let r = e.byteLength;
  if (t.byteLength !== r || e.byteOffset !== t.byteOffset)
    return !1;
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function w5(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password;
}
function YO(e, t, r, n) {
  return (n === y5 || n === m5 || n === p5) && (e.$$typeof || t.$$typeof) ? !0 : h5(t, n) && r.equals(e[n], t[n], n, n, e, t, r);
}
const P5 = "[object ArrayBuffer]", I5 = "[object Arguments]", C5 = "[object Boolean]", N5 = "[object DataView]", R5 = "[object Date]", D5 = "[object Error]", M5 = "[object Map]", L5 = "[object Number]", k5 = "[object Object]", B5 = "[object RegExp]", j5 = "[object Set]", F5 = "[object String]", $5 = {
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
}, U5 = "[object URL]", H5 = Object.prototype.toString;
function q5({ areArrayBuffersEqual: e, areArraysEqual: t, areDataViewsEqual: r, areDatesEqual: n, areErrorsEqual: a, areFunctionsEqual: i, areMapsEqual: o, areNumbersEqual: u, areObjectsEqual: s, arePrimitiveWrappersEqual: c, areRegExpsEqual: l, areSetsEqual: f, areTypedArraysEqual: h, areUrlsEqual: p, unknownTagComparators: g }) {
  return function(m, v, E) {
    if (m === v)
      return !0;
    if (m == null || v == null)
      return !1;
    const _ = typeof m;
    if (_ !== typeof v)
      return !1;
    if (_ !== "object")
      return _ === "number" ? u(m, v, E) : _ === "function" ? i(m, v, E) : !1;
    const A = m.constructor;
    if (A !== v.constructor)
      return !1;
    if (A === Object)
      return s(m, v, E);
    if (Array.isArray(m))
      return t(m, v, E);
    if (A === Date)
      return n(m, v, E);
    if (A === RegExp)
      return l(m, v, E);
    if (A === Map)
      return o(m, v, E);
    if (A === Set)
      return f(m, v, E);
    const b = H5.call(m);
    if (b === R5)
      return n(m, v, E);
    if (b === B5)
      return l(m, v, E);
    if (b === M5)
      return o(m, v, E);
    if (b === j5)
      return f(m, v, E);
    if (b === k5)
      return typeof m.then != "function" && typeof v.then != "function" && s(m, v, E);
    if (b === U5)
      return p(m, v, E);
    if (b === D5)
      return a(m, v, E);
    if (b === I5)
      return s(m, v, E);
    if ($5[b])
      return h(m, v, E);
    if (b === P5)
      return e(m, v, E);
    if (b === N5)
      return r(m, v, E);
    if (b === C5 || b === L5 || b === F5)
      return c(m, v, E);
    if (g) {
      let T = g[b];
      if (!T) {
        const O = d5(m);
        O && (T = g[O]);
      }
      if (T)
        return T(m, v, E);
    }
    return !1;
  };
}
function W5({ circular: e, createCustomConfig: t, strict: r }) {
  let n = {
    areArrayBuffersEqual: b5,
    areArraysEqual: r ? $a : g5,
    areDataViewsEqual: v5,
    areDatesEqual: E5,
    areErrorsEqual: T5,
    areFunctionsEqual: _5,
    areMapsEqual: r ? fd(Y1, $a) : Y1,
    areNumbersEqual: A5,
    areObjectsEqual: r ? $a : O5,
    arePrimitiveWrappersEqual: S5,
    areRegExpsEqual: x5,
    areSetsEqual: r ? fd(z1, $a) : z1,
    areTypedArraysEqual: r ? fd(su, $a) : su,
    areUrlsEqual: w5,
    unknownTagComparators: void 0
  };
  if (t && (n = Object.assign({}, n, t(n))), e) {
    const a = _o(n.areArraysEqual), i = _o(n.areMapsEqual), o = _o(n.areObjectsEqual), u = _o(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: a,
      areMapsEqual: i,
      areObjectsEqual: o,
      areSetsEqual: u
    });
  }
  return n;
}
function Y5(e) {
  return function(t, r, n, a, i, o, u) {
    return e(t, r, u);
  };
}
function z5({ circular: e, comparator: t, createState: r, equals: n, strict: a }) {
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
const G5 = Vr();
Vr({ strict: !0 });
Vr({ circular: !0 });
Vr({
  circular: !0,
  strict: !0
});
Vr({
  createInternalComparator: () => xn
});
Vr({
  strict: !0,
  createInternalComparator: () => xn
});
Vr({
  circular: !0,
  createInternalComparator: () => xn
});
Vr({
  circular: !0,
  createInternalComparator: () => xn,
  strict: !0
});
function Vr(e = {}) {
  const { circular: t = !1, createInternalComparator: r, createState: n, strict: a = !1 } = e, i = W5(e), o = q5(i), u = r ? r(o) : Y5(o);
  return z5({ circular: t, comparator: o, createState: n, equals: u, strict: a });
}
function K5(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function G1(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = -1, n = function a(i) {
    r < 0 && (r = i), i - r > t ? (e(i), r = -1) : K5(a);
  };
  requestAnimationFrame(n);
}
function jh(e) {
  "@babel/helpers - typeof";
  return jh = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, jh(e);
}
function V5(e) {
  return J5(e) || Z5(e) || Q5(e) || X5();
}
function X5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Q5(e, t) {
  if (e) {
    if (typeof e == "string") return K1(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return K1(e, t);
  }
}
function K1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Z5(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function J5(e) {
  if (Array.isArray(e)) return e;
}
function eB() {
  var e = {}, t = function() {
    return null;
  }, r = !1, n = function a(i) {
    if (!r) {
      if (Array.isArray(i)) {
        if (!i.length)
          return;
        var o = i, u = V5(o), s = u[0], c = u.slice(1);
        if (typeof s == "number") {
          G1(a.bind(null, c), s);
          return;
        }
        a(s), G1(a.bind(null, c));
        return;
      }
      jh(i) === "object" && (e = i, t(e)), typeof i == "function" && i();
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
function Ni(e) {
  "@babel/helpers - typeof";
  return Ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ni(e);
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
function X1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? V1(Object(r), !0).forEach(function(n) {
      zO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : V1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function zO(e, t, r) {
  return t = tB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tB(e) {
  var t = rB(e, "string");
  return Ni(t) === "symbol" ? t : String(t);
}
function rB(e, t) {
  if (Ni(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ni(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var nB = function(t, r) {
  return [Object.keys(t), Object.keys(r)].reduce(function(n, a) {
    return n.filter(function(i) {
      return a.includes(i);
    });
  });
}, aB = function(t) {
  return t;
}, iB = function(t) {
  return t.replace(/([A-Z])/g, function(r) {
    return "-".concat(r.toLowerCase());
  });
}, ti = function(t, r) {
  return Object.keys(r).reduce(function(n, a) {
    return X1(X1({}, n), {}, zO({}, a, t(a, r[a])));
  }, {});
}, Q1 = function(t, r, n) {
  return t.map(function(a) {
    return "".concat(iB(a), " ").concat(r, "ms ").concat(n);
  }).join(",");
}, oB = process.env.NODE_ENV !== "production", cu = function(t, r, n, a, i, o, u, s) {
  if (oB && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var c = [n, a, i, o, u, s], l = 0;
      console.warn(r.replace(/%s/g, function() {
        return c[l++];
      }));
    }
};
function uB(e, t) {
  return lB(e) || cB(e, t) || GO(e, t) || sB();
}
function sB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function cB(e, t) {
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
function lB(e) {
  if (Array.isArray(e)) return e;
}
function fB(e) {
  return pB(e) || hB(e) || GO(e) || dB();
}
function dB() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function GO(e, t) {
  if (e) {
    if (typeof e == "string") return Fh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Fh(e, t);
  }
}
function hB(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function pB(e) {
  if (Array.isArray(e)) return Fh(e);
}
function Fh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var lu = 1e-4, KO = function(t, r) {
  return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
}, VO = function(t, r) {
  return t.map(function(n, a) {
    return n * Math.pow(r, a);
  }).reduce(function(n, a) {
    return n + a;
  });
}, Z1 = function(t, r) {
  return function(n) {
    var a = KO(t, r);
    return VO(a, n);
  };
}, mB = function(t, r) {
  return function(n) {
    var a = KO(t, r), i = [].concat(fB(a.map(function(o, u) {
      return o * u;
    }).slice(1)), [0]);
    return VO(i, n);
  };
}, J1 = function() {
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
          }), l = uB(c, 4);
          a = l[0], i = l[1], o = l[2], u = l[3];
        } else
          cu(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r);
      }
    }
  cu([a, o, i, u].every(function(m) {
    return typeof m == "number" && m >= 0 && m <= 1;
  }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
  var f = Z1(a, o), h = Z1(i, u), p = mB(a, o), g = function(v) {
    return v > 1 ? 1 : v < 0 ? 0 : v;
  }, y = function(v) {
    for (var E = v > 1 ? 1 : v, _ = E, A = 0; A < 8; ++A) {
      var b = f(_) - E, T = p(_);
      if (Math.abs(b - E) < lu || T < lu)
        return h(_);
      _ = g(_ - b / T);
    }
    return h(_);
  };
  return y.isStepper = !1, y;
}, yB = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, a = t.damping, i = a === void 0 ? 8 : a, o = t.dt, u = o === void 0 ? 17 : o, s = function(l, f, h) {
    var p = -(l - f) * n, g = h * i, y = h + (p - g) * u / 1e3, m = h * u / 1e3 + l;
    return Math.abs(m - f) < lu && Math.abs(y) < lu ? [f, 0] : [m, y];
  };
  return s.isStepper = !0, s.dt = u, s;
}, bB = function() {
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
        return J1(a);
      case "spring":
        return yB();
      default:
        if (a.split("(")[0] === "cubic-bezier")
          return J1(a);
        cu(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r);
    }
  return typeof a == "function" ? a : (cu(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null);
};
function Ri(e) {
  "@babel/helpers - typeof";
  return Ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ri(e);
}
function eE(e) {
  return EB(e) || vB(e) || XO(e) || gB();
}
function gB() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function vB(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function EB(e) {
  if (Array.isArray(e)) return Uh(e);
}
function tE(e, t) {
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
    t % 2 ? tE(Object(r), !0).forEach(function(n) {
      $h(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : tE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $h(e, t, r) {
  return t = TB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function TB(e) {
  var t = _B(e, "string");
  return Ri(t) === "symbol" ? t : String(t);
}
function _B(e, t) {
  if (Ri(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ri(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function AB(e, t) {
  return xB(e) || SB(e, t) || XO(e, t) || OB();
}
function OB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function XO(e, t) {
  if (e) {
    if (typeof e == "string") return Uh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Uh(e, t);
  }
}
function Uh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function SB(e, t) {
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
function xB(e) {
  if (Array.isArray(e)) return e;
}
var fu = function(t, r, n) {
  return t + (r - t) * n;
}, Hh = function(t) {
  var r = t.from, n = t.to;
  return r !== n;
}, wB = function e(t, r, n) {
  var a = ti(function(i, o) {
    if (Hh(o)) {
      var u = t(o.from, o.to, o.velocity), s = AB(u, 2), c = s[0], l = s[1];
      return tt(tt({}, o), {}, {
        from: c,
        velocity: l
      });
    }
    return o;
  }, r);
  return n < 1 ? ti(function(i, o) {
    return Hh(o) ? tt(tt({}, o), {}, {
      velocity: fu(o.velocity, a[i].velocity, n),
      from: fu(o.from, a[i].from, n)
    }) : o;
  }, r) : e(t, a, n - 1);
};
const PB = (function(e, t, r, n, a) {
  var i = nB(e, t), o = i.reduce(function(m, v) {
    return tt(tt({}, m), {}, $h({}, v, [e[v], t[v]]));
  }, {}), u = i.reduce(function(m, v) {
    return tt(tt({}, m), {}, $h({}, v, {
      from: e[v],
      velocity: 0,
      to: t[v]
    }));
  }, {}), s = -1, c, l, f = function() {
    return null;
  }, h = function() {
    return ti(function(v, E) {
      return E.from;
    }, u);
  }, p = function() {
    return !Object.values(u).filter(Hh).length;
  }, g = function(v) {
    c || (c = v);
    var E = v - c, _ = E / r.dt;
    u = wB(r, u, _), a(tt(tt(tt({}, e), t), h())), c = v, p() || (s = requestAnimationFrame(f));
  }, y = function(v) {
    l || (l = v);
    var E = (v - l) / n, _ = ti(function(b, T) {
      return fu.apply(void 0, eE(T).concat([r(E)]));
    }, o);
    if (a(tt(tt(tt({}, e), t), _)), E < 1)
      s = requestAnimationFrame(f);
    else {
      var A = ti(function(b, T) {
        return fu.apply(void 0, eE(T).concat([r(1)]));
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
function aa(e) {
  "@babel/helpers - typeof";
  return aa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, aa(e);
}
var IB = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function CB(e, t) {
  if (e == null) return {};
  var r = NB(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function NB(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function dd(e) {
  return LB(e) || MB(e) || DB(e) || RB();
}
function RB() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function DB(e, t) {
  if (e) {
    if (typeof e == "string") return qh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return qh(e, t);
  }
}
function MB(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function LB(e) {
  if (Array.isArray(e)) return qh(e);
}
function qh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
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
function Ht(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rE(Object(r), !0).forEach(function(n) {
      za(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function za(e, t, r) {
  return t = QO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kB(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function BB(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, QO(n.key), n);
  }
}
function jB(e, t, r) {
  return t && BB(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function QO(e) {
  var t = FB(e, "string");
  return aa(t) === "symbol" ? t : String(t);
}
function FB(e, t) {
  if (aa(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (aa(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $B(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Wh(e, t);
}
function Wh(e, t) {
  return Wh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Wh(e, t);
}
function UB(e) {
  var t = HB();
  return function() {
    var n = du(e), a;
    if (t) {
      var i = du(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return Yh(this, a);
  };
}
function Yh(e, t) {
  if (t && (aa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return zh(e);
}
function zh(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function HB() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function du(e) {
  return du = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, du(e);
}
var Sr = /* @__PURE__ */ (function(e) {
  $B(r, e);
  var t = UB(r);
  function r(n, a) {
    var i;
    kB(this, r), i = t.call(this, n, a);
    var o = i.props, u = o.isActive, s = o.attributeName, c = o.from, l = o.to, f = o.steps, h = o.children, p = o.duration;
    if (i.handleStyleChange = i.handleStyleChange.bind(zh(i)), i.changeStyle = i.changeStyle.bind(zh(i)), !u || p <= 0)
      return i.state = {
        style: {}
      }, typeof h == "function" && (i.state = {
        style: l
      }), Yh(i);
    if (f && f.length)
      i.state = {
        style: f[0].style
      };
    else if (c) {
      if (typeof h == "function")
        return i.state = {
          style: c
        }, Yh(i);
      i.state = {
        style: s ? za({}, s, c) : c
      };
    } else
      i.state = {
        style: {}
      };
    return i;
  }
  return jB(r, [{
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
            style: s ? za({}, s, l) : l
          };
          this.state && h && (s && h[s] !== l || !s && h !== l) && this.setState(p);
          return;
        }
        if (!(G5(a.to, l) && a.canBegin && a.isActive)) {
          var g = !a.canBegin || !a.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var y = g || c ? f : a.to;
          if (this.state && h) {
            var m = {
              style: s ? za({}, s, y) : y
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
      var i = this, o = a.from, u = a.to, s = a.duration, c = a.easing, l = a.begin, f = a.onAnimationEnd, h = a.onAnimationStart, p = PB(o, u, bB(c), s, this.changeStyle), g = function() {
        i.stopJSAnimation = p();
      };
      this.manager.start([h, l, g, s, f]);
    }
  }, {
    key: "runStepAnimation",
    value: function(a) {
      var i = this, o = a.steps, u = a.begin, s = a.onAnimationStart, c = o[0], l = c.style, f = c.duration, h = f === void 0 ? 0 : f, p = function(y, m, v) {
        if (v === 0)
          return y;
        var E = m.duration, _ = m.easing, A = _ === void 0 ? "ease" : _, b = m.style, T = m.properties, O = m.onAnimationEnd, I = v > 0 ? o[v - 1] : m, N = T || Object.keys(b);
        if (typeof A == "function" || A === "spring")
          return [].concat(dd(y), [i.runJSAnimation.bind(i, {
            from: I.style,
            to: b,
            duration: E,
            easing: A
          }), E]);
        var j = Q1(N, E, A), D = Ht(Ht(Ht({}, I.style), b), {}, {
          transition: j
        });
        return [].concat(dd(y), [D, E, O]).filter(aB);
      };
      return this.manager.start([s].concat(dd(o.reduce(p, [l, Math.max(h, u)])), [a.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(a) {
      this.manager || (this.manager = eB());
      var i = a.begin, o = a.duration, u = a.attributeName, s = a.to, c = a.easing, l = a.onAnimationStart, f = a.onAnimationEnd, h = a.steps, p = a.children, g = this.manager;
      if (this.unSubscribe = g.subscribe(this.handleStyleChange), typeof c == "function" || typeof p == "function" || c === "spring") {
        this.runJSAnimation(a);
        return;
      }
      if (h.length > 1) {
        this.runStepAnimation(a);
        return;
      }
      var y = u ? za({}, u, s) : s, m = Q1(Object.keys(y), o, c);
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
      var s = CB(a, IB), c = $r.count(i), l = this.state.style;
      if (typeof i == "function")
        return i(l);
      if (!u || c === 0 || o <= 0)
        return i;
      var f = function(p) {
        var g = p.props, y = g.style, m = y === void 0 ? {} : y, v = g.className, E = /* @__PURE__ */ Ue(p, Ht(Ht({}, s), {}, {
          style: Ht(Ht({}, m), l),
          className: v
        }));
        return E;
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
function Di(e) {
  "@babel/helpers - typeof";
  return Di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Di(e);
}
function hu() {
  return hu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, hu.apply(this, arguments);
}
function qB(e, t) {
  return GB(e) || zB(e, t) || YB(e, t) || WB();
}
function WB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function YB(e, t) {
  if (e) {
    if (typeof e == "string") return nE(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return nE(e, t);
  }
}
function nE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function zB(e, t) {
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
function GB(e) {
  if (Array.isArray(e)) return e;
}
function aE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function iE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? aE(Object(r), !0).forEach(function(n) {
      KB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : aE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function KB(e, t, r) {
  return t = VB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VB(e) {
  var t = XB(e, "string");
  return Di(t) == "symbol" ? t : t + "";
}
function XB(e, t) {
  if (Di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var oE = function(t, r, n, a, i) {
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
}, QB = function(t, r) {
  if (!t || !r)
    return !1;
  var n = t.x, a = t.y, i = r.x, o = r.y, u = r.width, s = r.height;
  if (Math.abs(u) > 0 && Math.abs(s) > 0) {
    var c = Math.min(i, i + u), l = Math.max(i, i + u), f = Math.min(o, o + s), h = Math.max(o, o + s);
    return n >= c && n <= l && a >= f && a <= h;
  }
  return !1;
}, ZB = {
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
}, P0 = function(t) {
  var r = iE(iE({}, ZB), t), n = ii(), a = ft(-1), i = qB(a, 2), o = i[0], u = i[1];
  Et(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var A = n.current.getTotalLength();
        A && u(A);
      } catch {
      }
  }, []);
  var s = r.x, c = r.y, l = r.width, f = r.height, h = r.radius, p = r.className, g = r.animationEasing, y = r.animationDuration, m = r.animationBegin, v = r.isAnimationActive, E = r.isUpdateAnimationActive;
  if (s !== +s || c !== +c || l !== +l || f !== +f || l === 0 || f === 0)
    return null;
  var _ = pe("recharts-rectangle", p);
  return E ? /* @__PURE__ */ C.createElement(Sr, {
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
    isActive: E
  }, function(A) {
    var b = A.width, T = A.height, O = A.x, I = A.y;
    return /* @__PURE__ */ C.createElement(Sr, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: m,
      duration: y,
      isActive: v,
      easing: g
    }, /* @__PURE__ */ C.createElement("path", hu({}, le(r, !0), {
      className: _,
      d: oE(O, I, b, T, h),
      ref: n
    })));
  }) : /* @__PURE__ */ C.createElement("path", hu({}, le(r, !0), {
    className: _,
    d: oE(s, c, l, f, h)
  }));
}, JB = ["points", "className", "baseLinePoints", "connectNulls"];
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
function ej(e, t) {
  if (e == null) return {};
  var r = tj(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function tj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function uE(e) {
  return ij(e) || aj(e) || nj(e) || rj();
}
function rj() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nj(e, t) {
  if (e) {
    if (typeof e == "string") return Gh(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Gh(e, t);
  }
}
function aj(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function ij(e) {
  if (Array.isArray(e)) return Gh(e);
}
function Gh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var sE = function(t) {
  return t && t.x === +t.x && t.y === +t.y;
}, oj = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  return t.forEach(function(n) {
    sE(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([]);
  }), sE(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r;
}, ri = function(t, r) {
  var n = oj(t);
  r && (n = [n.reduce(function(i, o) {
    return [].concat(uE(i), uE(o));
  }, [])]);
  var a = n.map(function(i) {
    return i.reduce(function(o, u, s) {
      return "".concat(o).concat(s === 0 ? "M" : "L").concat(u.x, ",").concat(u.y);
    }, "");
  }).join("");
  return n.length === 1 ? "".concat(a, "Z") : a;
}, uj = function(t, r, n) {
  var a = ri(t, n);
  return "".concat(a.slice(-1) === "Z" ? a.slice(0, -1) : a, "L").concat(ri(r.reverse(), n).slice(1));
}, sj = function(t) {
  var r = t.points, n = t.className, a = t.baseLinePoints, i = t.connectNulls, o = ej(t, JB);
  if (!r || !r.length)
    return null;
  var u = pe("recharts-polygon", n);
  if (a && a.length) {
    var s = o.stroke && o.stroke !== "none", c = uj(r, a, i);
    return /* @__PURE__ */ C.createElement("g", {
      className: u
    }, /* @__PURE__ */ C.createElement("path", jn({}, le(o, !0), {
      fill: c.slice(-1) === "Z" ? o.fill : "none",
      stroke: "none",
      d: c
    })), s ? /* @__PURE__ */ C.createElement("path", jn({}, le(o, !0), {
      fill: "none",
      d: ri(r, i)
    })) : null, s ? /* @__PURE__ */ C.createElement("path", jn({}, le(o, !0), {
      fill: "none",
      d: ri(a, i)
    })) : null);
  }
  var l = ri(r, i);
  return /* @__PURE__ */ C.createElement("path", jn({}, le(o, !0), {
    fill: l.slice(-1) === "Z" ? o.fill : "none",
    className: u,
    d: l
  }));
};
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
var I0 = function(t) {
  var r = t.cx, n = t.cy, a = t.r, i = t.className, o = pe("recharts-dot", i);
  return r === +r && n === +n && a === +a ? /* @__PURE__ */ qr.createElement("circle", Kh({}, le(t, !1), Mo(t), {
    className: o,
    cx: r,
    cy: n,
    r: a
  })) : null;
};
function Mi(e) {
  "@babel/helpers - typeof";
  return Mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Mi(e);
}
var cj = ["x", "y", "top", "left", "width", "height", "className"];
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
function lj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cE(Object(r), !0).forEach(function(n) {
      fj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function fj(e, t, r) {
  return t = dj(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dj(e) {
  var t = hj(e, "string");
  return Mi(t) == "symbol" ? t : t + "";
}
function hj(e, t) {
  if (Mi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Mi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function pj(e, t) {
  if (e == null) return {};
  var r = mj(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function mj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var yj = function(t, r, n, a, i, o) {
  return "M".concat(t, ",").concat(i, "v").concat(a, "M").concat(o, ",").concat(r, "h").concat(n);
}, bj = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, o = t.top, u = o === void 0 ? 0 : o, s = t.left, c = s === void 0 ? 0 : s, l = t.width, f = l === void 0 ? 0 : l, h = t.height, p = h === void 0 ? 0 : h, g = t.className, y = pj(t, cj), m = lj({
    x: n,
    y: i,
    top: u,
    left: c,
    width: f,
    height: p
  }, y);
  return !J(n) || !J(i) || !J(f) || !J(p) || !J(u) || !J(c) ? null : /* @__PURE__ */ C.createElement("path", Vh({}, le(m, !0), {
    className: pe("recharts-cross", g),
    d: yj(n, i, f, p, u, c)
  }));
}, hd, lE;
function gj() {
  if (lE) return hd;
  lE = 1;
  var e = is(), t = lO(), r = ur();
  function n(a, i) {
    return a && a.length ? e(a, r(i, 2), t) : void 0;
  }
  return hd = n, hd;
}
var vj = gj();
const Ej = /* @__PURE__ */ xe(vj);
var pd, fE;
function Tj() {
  if (fE) return pd;
  fE = 1;
  var e = is(), t = ur(), r = fO();
  function n(a, i) {
    return a && a.length ? e(a, t(i, 2), r) : void 0;
  }
  return pd = n, pd;
}
var _j = Tj();
const Aj = /* @__PURE__ */ xe(_j);
var Oj = ["cx", "cy", "angle", "ticks", "axisLine"], Sj = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function ia(e) {
  "@babel/helpers - typeof";
  return ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ia(e);
}
function ni() {
  return ni = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ni.apply(this, arguments);
}
function dE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Zr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dE(Object(r), !0).forEach(function(n) {
      ds(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hE(e, t) {
  if (e == null) return {};
  var r = xj(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function xj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function wj(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function pE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, JO(n.key), n);
  }
}
function Pj(e, t, r) {
  return t && pE(e.prototype, t), r && pE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Ij(e, t, r) {
  return t = pu(t), Cj(e, ZO() ? Reflect.construct(t, r || [], pu(e).constructor) : t.apply(e, r));
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
function ZO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (ZO = function() {
    return !!e;
  })();
}
function pu(e) {
  return pu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, pu(e);
}
function Rj(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Xh(e, t);
}
function Xh(e, t) {
  return Xh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Xh(e, t);
}
function ds(e, t, r) {
  return t = JO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function JO(e) {
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
var hs = /* @__PURE__ */ (function(e) {
  function t() {
    return wj(this, t), Ij(this, t, arguments);
  }
  return Rj(t, e), Pj(t, [{
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
      var n = this.props, a = n.cx, i = n.cy, o = n.angle, u = n.ticks, s = Ej(u, function(l) {
        return l.coordinate || 0;
      }), c = Aj(u, function(l) {
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
      var n = this.props, a = n.cx, i = n.cy, o = n.angle, u = n.ticks, s = n.axisLine, c = hE(n, Oj), l = u.reduce(function(g, y) {
        return [Math.min(g[0], y.coordinate), Math.max(g[1], y.coordinate)];
      }, [1 / 0, -1 / 0]), f = Ne(a, i, l[0], o), h = Ne(a, i, l[1], o), p = Zr(Zr(Zr({}, le(c, !1)), {}, {
        fill: "none"
      }, le(s, !1)), {}, {
        x1: f.x,
        y1: f.y,
        x2: h.x,
        y2: h.y
      });
      return /* @__PURE__ */ C.createElement("line", ni({
        className: "recharts-polar-radius-axis-line"
      }, p));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, a = this.props, i = a.ticks, o = a.tick, u = a.angle, s = a.tickFormatter, c = a.stroke, l = hE(a, Sj), f = this.getTickTextAnchor(), h = le(l, !1), p = le(o, !1), g = i.map(function(y, m) {
        var v = n.getTickValueCoord(y), E = Zr(Zr(Zr(Zr({
          textAnchor: f,
          transform: "rotate(".concat(90 - u, ", ").concat(v.x, ", ").concat(v.y, ")")
        }, h), {}, {
          stroke: "none",
          fill: c
        }, p), {}, {
          index: m
        }, v), {}, {
          payload: y
        });
        return /* @__PURE__ */ C.createElement(Oe, ni({
          className: pe("recharts-polar-radius-axis-tick", FO(o)),
          key: "tick-".concat(y.coordinate)
        }, yn(n.props, y, m)), t.renderTickItem(o, E, s ? s(y.value, m) : y.value));
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
      return /* @__PURE__ */ C.isValidElement(n) ? o = /* @__PURE__ */ C.cloneElement(n, a) : de(n) ? o = n(a) : o = /* @__PURE__ */ C.createElement(bn, ni({}, a, {
        className: "recharts-polar-radius-axis-tick-value"
      }), i), o;
    }
  }]);
})(ir);
ds(hs, "displayName", "PolarRadiusAxis");
ds(hs, "axisType", "radiusAxis");
ds(hs, "defaultProps", {
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
function oa(e) {
  "@babel/helpers - typeof";
  return oa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, oa(e);
}
function rn() {
  return rn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, rn.apply(this, arguments);
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
function Jr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mE(Object(r), !0).forEach(function(n) {
      ps(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Mj(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function yE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, tS(n.key), n);
  }
}
function Lj(e, t, r) {
  return t && yE(e.prototype, t), r && yE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function kj(e, t, r) {
  return t = mu(t), Bj(e, eS() ? Reflect.construct(t, r || [], mu(e).constructor) : t.apply(e, r));
}
function Bj(e, t) {
  if (t && (oa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return jj(e);
}
function jj(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function eS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (eS = function() {
    return !!e;
  })();
}
function mu(e) {
  return mu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, mu(e);
}
function Fj(e, t) {
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
  return t = tS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tS(e) {
  var t = $j(e, "string");
  return oa(t) == "symbol" ? t : t + "";
}
function $j(e, t) {
  if (oa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (oa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Uj = Math.PI / 180, bE = 1e-5, ms = /* @__PURE__ */ (function(e) {
  function t() {
    return Mj(this, t), kj(this, t, arguments);
  }
  return Fj(t, e), Lj(t, [{
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
      var a = this.props.orientation, i = Math.cos(-n.coordinate * Uj), o;
      return i > bE ? o = a === "outer" ? "start" : "end" : i < -bE ? o = a === "outer" ? "end" : "start" : o = "middle", o;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, a = n.cx, i = n.cy, o = n.radius, u = n.axisLine, s = n.axisLineType, c = Jr(Jr({}, le(this.props, !1)), {}, {
        fill: "none"
      }, le(u, !1));
      if (s === "circle")
        return /* @__PURE__ */ C.createElement(I0, rn({
          className: "recharts-polar-angle-axis-line"
        }, c, {
          cx: a,
          cy: i,
          r: o
        }));
      var l = this.props.ticks, f = l.map(function(h) {
        return Ne(a, i, o, h.coordinate);
      });
      return /* @__PURE__ */ C.createElement(sj, rn({
        className: "recharts-polar-angle-axis-line"
      }, c, {
        points: f
      }));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, a = this.props, i = a.ticks, o = a.tick, u = a.tickLine, s = a.tickFormatter, c = a.stroke, l = le(this.props, !1), f = le(o, !1), h = Jr(Jr({}, l), {}, {
        fill: "none"
      }, le(u, !1)), p = i.map(function(g, y) {
        var m = n.getTickLineCoord(g), v = n.getTickTextAnchor(g), E = Jr(Jr(Jr({
          textAnchor: v
        }, l), {}, {
          stroke: "none",
          fill: c
        }, f), {}, {
          index: y,
          payload: g,
          x: m.x2,
          y: m.y2
        });
        return /* @__PURE__ */ C.createElement(Oe, rn({
          className: pe("recharts-polar-angle-axis-tick", FO(o)),
          key: "tick-".concat(g.coordinate)
        }, yn(n.props, g, y)), u && /* @__PURE__ */ C.createElement("line", rn({
          className: "recharts-polar-angle-axis-tick-line"
        }, h, m)), o && t.renderTickItem(o, E, s ? s(g.value, y) : g.value));
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
      return /* @__PURE__ */ C.isValidElement(n) ? o = /* @__PURE__ */ C.cloneElement(n, a) : de(n) ? o = n(a) : o = /* @__PURE__ */ C.createElement(bn, rn({}, a, {
        className: "recharts-polar-angle-axis-tick-value"
      }), i), o;
    }
  }]);
})(ir);
ps(ms, "displayName", "PolarAngleAxis");
ps(ms, "axisType", "angleAxis");
ps(ms, "defaultProps", {
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
var md, gE;
function Hj() {
  if (gE) return md;
  gE = 1;
  var e = lA(), t = e(Object.getPrototypeOf, Object);
  return md = t, md;
}
var yd, vE;
function qj() {
  if (vE) return yd;
  vE = 1;
  var e = xr(), t = Hj(), r = wr(), n = "[object Object]", a = Function.prototype, i = Object.prototype, o = a.toString, u = i.hasOwnProperty, s = o.call(Object);
  function c(l) {
    if (!r(l) || e(l) != n)
      return !1;
    var f = t(l);
    if (f === null)
      return !0;
    var h = u.call(f, "constructor") && f.constructor;
    return typeof h == "function" && h instanceof h && o.call(h) == s;
  }
  return yd = c, yd;
}
var Wj = qj();
const Yj = /* @__PURE__ */ xe(Wj);
var bd, EE;
function zj() {
  if (EE) return bd;
  EE = 1;
  var e = xr(), t = wr(), r = "[object Boolean]";
  function n(a) {
    return a === !0 || a === !1 || t(a) && e(a) == r;
  }
  return bd = n, bd;
}
var Gj = zj();
const Kj = /* @__PURE__ */ xe(Gj);
function Li(e) {
  "@babel/helpers - typeof";
  return Li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Li(e);
}
function yu() {
  return yu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, yu.apply(this, arguments);
}
function Vj(e, t) {
  return Jj(e) || Zj(e, t) || Qj(e, t) || Xj();
}
function Xj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Qj(e, t) {
  if (e) {
    if (typeof e == "string") return TE(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return TE(e, t);
  }
}
function TE(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Zj(e, t) {
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
function Jj(e) {
  if (Array.isArray(e)) return e;
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
function AE(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _E(Object(r), !0).forEach(function(n) {
      eF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _E(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eF(e, t, r) {
  return t = tF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tF(e) {
  var t = rF(e, "string");
  return Li(t) == "symbol" ? t : t + "";
}
function rF(e, t) {
  if (Li(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var OE = function(t, r, n, a, i) {
  var o = n - a, u;
  return u = "M ".concat(t, ",").concat(r), u += "L ".concat(t + n, ",").concat(r), u += "L ".concat(t + n - o / 2, ",").concat(r + i), u += "L ".concat(t + n - o / 2 - a, ",").concat(r + i), u += "L ".concat(t, ",").concat(r, " Z"), u;
}, nF = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, aF = function(t) {
  var r = AE(AE({}, nF), t), n = ii(), a = ft(-1), i = Vj(a, 2), o = i[0], u = i[1];
  Et(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var _ = n.current.getTotalLength();
        _ && u(_);
      } catch {
      }
  }, []);
  var s = r.x, c = r.y, l = r.upperWidth, f = r.lowerWidth, h = r.height, p = r.className, g = r.animationEasing, y = r.animationDuration, m = r.animationBegin, v = r.isUpdateAnimationActive;
  if (s !== +s || c !== +c || l !== +l || f !== +f || h !== +h || l === 0 && f === 0 || h === 0)
    return null;
  var E = pe("recharts-trapezoid", p);
  return v ? /* @__PURE__ */ C.createElement(Sr, {
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
    isActive: v
  }, function(_) {
    var A = _.upperWidth, b = _.lowerWidth, T = _.height, O = _.x, I = _.y;
    return /* @__PURE__ */ C.createElement(Sr, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: m,
      duration: y,
      easing: g
    }, /* @__PURE__ */ C.createElement("path", yu({}, le(r, !0), {
      className: E,
      d: OE(O, I, A, b, T),
      ref: n
    })));
  }) : /* @__PURE__ */ C.createElement("g", null, /* @__PURE__ */ C.createElement("path", yu({}, le(r, !0), {
    className: E,
    d: OE(s, c, l, f, h)
  })));
}, iF = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function ki(e) {
  "@babel/helpers - typeof";
  return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ki(e);
}
function oF(e, t) {
  if (e == null) return {};
  var r = uF(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function uF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function SE(e, t) {
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
    t % 2 ? SE(Object(r), !0).forEach(function(n) {
      sF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : SE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function sF(e, t, r) {
  return t = cF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function cF(e) {
  var t = lF(e, "string");
  return ki(t) == "symbol" ? t : t + "";
}
function lF(e, t) {
  if (ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ki(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function fF(e, t) {
  return bu(bu({}, t), e);
}
function dF(e, t) {
  return e === "symbols";
}
function xE(e) {
  var t = e.shapeType, r = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ C.createElement(P0, r);
    case "trapezoid":
      return /* @__PURE__ */ C.createElement(aF, r);
    case "sector":
      return /* @__PURE__ */ C.createElement(HO, r);
    case "symbols":
      if (dF(t))
        return /* @__PURE__ */ C.createElement(zp, r);
      break;
    default:
      return null;
  }
}
function hF(e) {
  return /* @__PURE__ */ Lt(e) ? e.props : e;
}
function rS(e) {
  var t = e.option, r = e.shapeType, n = e.propTransformer, a = n === void 0 ? fF : n, i = e.activeClassName, o = i === void 0 ? "recharts-active-shape" : i, u = e.isActive, s = oF(e, iF), c;
  if (/* @__PURE__ */ Lt(t))
    c = /* @__PURE__ */ Ue(t, bu(bu({}, s), hF(t)));
  else if (de(t))
    c = t(s);
  else if (Yj(t) && !Kj(t)) {
    var l = a(t, s);
    c = /* @__PURE__ */ C.createElement(xE, {
      shapeType: r,
      elementProps: l
    });
  } else {
    var f = s;
    c = /* @__PURE__ */ C.createElement(xE, {
      shapeType: r,
      elementProps: f
    });
  }
  return u ? /* @__PURE__ */ C.createElement(Oe, {
    className: o
  }, c) : c;
}
function ys(e, t) {
  return t != null && "trapezoids" in e.props;
}
function bs(e, t) {
  return t != null && "sectors" in e.props;
}
function Bi(e, t) {
  return t != null && "points" in e.props;
}
function pF(e, t) {
  var r, n, a = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x, i = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return a && i;
}
function mF(e, t) {
  var r = e.endAngle === t.endAngle, n = e.startAngle === t.startAngle;
  return r && n;
}
function yF(e, t) {
  var r = e.x === t.x, n = e.y === t.y, a = e.z === t.z;
  return r && n && a;
}
function bF(e, t) {
  var r;
  return ys(e, t) ? r = pF : bs(e, t) ? r = mF : Bi(e, t) && (r = yF), r;
}
function gF(e, t) {
  var r;
  return ys(e, t) ? r = "trapezoids" : bs(e, t) ? r = "sectors" : Bi(e, t) && (r = "points"), r;
}
function vF(e, t) {
  if (ys(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  if (bs(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  return Bi(e, t) ? t.payload : {};
}
function EF(e) {
  var t = e.activeTooltipItem, r = e.graphicalItem, n = e.itemData, a = gF(r, t), i = vF(r, t), o = n.filter(function(s, c) {
    var l = ss(i, s), f = r.props[a].filter(function(g) {
      var y = bF(r, t);
      return y(g, t);
    }), h = r.props[a].indexOf(f[f.length - 1]), p = c === h;
    return l && p;
  }), u = n.indexOf(o[o.length - 1]);
  return u;
}
var wo;
function ua(e) {
  "@babel/helpers - typeof";
  return ua = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ua(e);
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
function wE(e, t) {
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
    t % 2 ? wE(Object(r), !0).forEach(function(n) {
      Rt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function TF(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function PE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, aS(n.key), n);
  }
}
function _F(e, t, r) {
  return t && PE(e.prototype, t), r && PE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function AF(e, t, r) {
  return t = gu(t), OF(e, nS() ? Reflect.construct(t, r || [], gu(e).constructor) : t.apply(e, r));
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
function gu(e) {
  return gu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, gu(e);
}
function xF(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Zh(e, t);
}
function Zh(e, t) {
  return Zh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Zh(e, t);
}
function Rt(e, t, r) {
  return t = aS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function aS(e) {
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
var Ir = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return TF(this, t), n = AF(this, t, [r]), Rt(n, "pieRef", null), Rt(n, "sectorRefs", []), Rt(n, "id", Ki("recharts-pie-")), Rt(n, "handleAnimationEnd", function() {
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
  return xF(t, e), _F(t, [{
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
        var v = (y.startAngle + y.endAngle) / 2, E = Ne(y.cx, y.cy, y.outerRadius + p, v), _ = Ie(Ie(Ie(Ie({}, l), y), {}, {
          stroke: "none"
        }, f), {}, {
          index: m,
          textAnchor: t.getTextAnchor(E.x, y.cx)
        }, E), A = Ie(Ie(Ie(Ie({}, l), y), {}, {
          fill: "none",
          stroke: y.fill
        }, h), {}, {
          index: m,
          points: [Ne(y.cx, y.cy, y.outerRadius, v), E]
        }), b = s;
        return me(s) && me(c) ? b = "value" : me(s) && (b = c), // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ C.createElement(Oe, {
          key: "label-".concat(y.startAngle, "-").concat(y.endAngle, "-").concat(y.midAngle, "-").concat(m)
        }, u && t.renderLabelLineItem(u, A, "line"), t.renderLabelItem(o, _, ut(y, b)));
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
        return /* @__PURE__ */ C.createElement(Oe, Fn({
          ref: function(m) {
            m && !a.sectorRefs.includes(m) && a.sectorRefs.push(m);
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, yn(a.props, c, l), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(c?.startAngle, "-").concat(c?.endAngle, "-").concat(c.midAngle, "-").concat(l)
        }), /* @__PURE__ */ C.createElement(rS, Fn({
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
        var y = g.t, m = [], v = i && i[0], E = v.startAngle;
        return i.forEach(function(_, A) {
          var b = h && h[A], T = A > 0 ? xt(_, "paddingAngle", 0) : 0;
          if (b) {
            var O = Mr(b.endAngle - b.startAngle, _.endAngle - _.startAngle), I = Ie(Ie({}, _), {}, {
              startAngle: E + T,
              endAngle: E + O(y) + T
            });
            m.push(I), E = I.endAngle;
          } else {
            var N = _.endAngle, j = _.startAngle, D = Mr(0, N - j), R = D(y), B = Ie(Ie({}, _), {}, {
              startAngle: E + T,
              endAngle: E + R + T
            });
            m.push(B), E = B.endAngle;
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
      return i && a && a.length && (!o || !ss(o, a)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(a);
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
        ref: function(v) {
          n.pieRef = v;
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
      return /* @__PURE__ */ C.createElement(Bh, Fn({}, a, {
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
      return /* @__PURE__ */ C.createElement(bn, Fn({}, a, {
        alignmentBaseline: "middle",
        className: u
      }), o);
    }
  }]);
})(ir);
wo = Ir;
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
  isAnimationActive: !Oa.isSsr,
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
  var t = e.data, r = e.children, n = le(e, !1), a = jt(r, Zu);
  return t && t.length ? t.map(function(i, o) {
    return Ie(Ie(Ie({
      payload: i
    }, n), i), a && a[o] && a[o].props);
  }) : a && a.length ? a.map(function(i) {
    return Ie(Ie({}, n), i.props);
  }) : [];
});
Rt(Ir, "parseCoordinateOfPie", function(e, t) {
  var r = t.top, n = t.left, a = t.width, i = t.height, o = jO(a, i), u = n + ht(e.cx, a, a / 2), s = r + ht(e.cy, i, i / 2), c = ht(e.innerRadius, o, 0), l = ht(e.outerRadius, o, o * 0.8), f = e.maxRadius || Math.sqrt(a * a + i * i) / 2;
  return {
    cx: u,
    cy: s,
    innerRadius: c,
    outerRadius: l,
    maxRadius: f
  };
});
Rt(Ir, "getComposedData", function(e) {
  var t = e.item, r = e.offset, n = t.type.defaultProps !== void 0 ? Ie(Ie({}, t.type.defaultProps), t.props) : t.props, a = wo.getRealPieData(n);
  if (!a || !a.length)
    return null;
  var i = n.cornerRadius, o = n.startAngle, u = n.endAngle, s = n.paddingAngle, c = n.dataKey, l = n.nameKey, f = n.valueKey, h = n.tooltipType, p = Math.abs(n.minAngle), g = wo.parseCoordinateOfPie(n, r), y = wo.parseDeltaAngle(o, u), m = Math.abs(y), v = c;
  me(c) && me(f) ? (zt(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), v = "value") : me(c) && (zt(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), v = f);
  var E = a.filter(function(I) {
    return ut(I, v, 0) !== 0;
  }).length, _ = (m >= 360 ? E : E - 1) * s, A = m - E * p - _, b = a.reduce(function(I, N) {
    var j = ut(N, v, 0);
    return I + (J(j) ? j : 0);
  }, 0), T;
  if (b > 0) {
    var O;
    T = a.map(function(I, N) {
      var j = ut(I, v, 0), D = ut(I, l, N), R = (J(j) ? j : 0) / b, B;
      N ? B = O.endAngle + dt(y) * s * (j !== 0 ? 1 : 0) : B = o;
      var F = B + dt(y) * ((j !== 0 ? p : 0) + R * A), $ = (B + F) / 2, q = (g.innerRadius + g.outerRadius) / 2, Y = [{
        name: D,
        value: j,
        payload: I,
        dataKey: v,
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
        value: ut(I, v),
        startAngle: B,
        endAngle: F,
        payload: I,
        paddingAngle: dt(y) * s
      }), O;
    });
  }
  return Ie(Ie({}, g), {}, {
    sectors: T,
    data: a
  });
});
var gd, IE;
function PF() {
  if (IE) return gd;
  IE = 1;
  var e = Math.ceil, t = Math.max;
  function r(n, a, i, o) {
    for (var u = -1, s = t(e((a - n) / (i || 1)), 0), c = Array(s); s--; )
      c[o ? s : ++u] = n, n += i;
    return c;
  }
  return gd = r, gd;
}
var vd, CE;
function iS() {
  if (CE) return vd;
  CE = 1;
  var e = xA(), t = 1 / 0, r = 17976931348623157e292;
  function n(a) {
    if (!a)
      return a === 0 ? a : 0;
    if (a = e(a), a === t || a === -t) {
      var i = a < 0 ? -1 : 1;
      return i * r;
    }
    return a === a ? a : 0;
  }
  return vd = n, vd;
}
var Ed, NE;
function IF() {
  if (NE) return Ed;
  NE = 1;
  var e = PF(), t = Qu(), r = iS();
  function n(a) {
    return function(i, o, u) {
      return u && typeof u != "number" && t(i, o, u) && (o = u = void 0), i = r(i), o === void 0 ? (o = i, i = 0) : o = r(o), u = u === void 0 ? i < o ? 1 : -1 : r(u), e(i, o, u, a);
    };
  }
  return Ed = n, Ed;
}
var Td, RE;
function CF() {
  if (RE) return Td;
  RE = 1;
  var e = IF(), t = e();
  return Td = t, Td;
}
var NF = CF();
const vu = /* @__PURE__ */ xe(NF);
function ji(e) {
  "@babel/helpers - typeof";
  return ji = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ji(e);
}
function DE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ME(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? DE(Object(r), !0).forEach(function(n) {
      oS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : DE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function oS(e, t, r) {
  return t = RF(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RF(e) {
  var t = DF(e, "string");
  return ji(t) == "symbol" ? t : t + "";
}
function DF(e, t) {
  if (ji(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ji(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var MF = ["Webkit", "Moz", "O", "ms"], LF = function(t, r) {
  var n = t.replace(/(\w)/, function(i) {
    return i.toUpperCase();
  }), a = MF.reduce(function(i, o) {
    return ME(ME({}, i), {}, oS({}, o + n, r));
  }, {});
  return a[t] = r, a;
};
function sa(e) {
  "@babel/helpers - typeof";
  return sa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sa(e);
}
function Eu() {
  return Eu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Eu.apply(this, arguments);
}
function LE(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _d(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? LE(Object(r), !0).forEach(function(n) {
      _t(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : LE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function kF(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function kE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, sS(n.key), n);
  }
}
function BF(e, t, r) {
  return t && kE(e.prototype, t), r && kE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function jF(e, t, r) {
  return t = Tu(t), FF(e, uS() ? Reflect.construct(t, r || [], Tu(e).constructor) : t.apply(e, r));
}
function FF(e, t) {
  if (t && (sa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return $F(e);
}
function $F(e) {
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
function Tu(e) {
  return Tu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Tu(e);
}
function UF(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Jh(e, t);
}
function Jh(e, t) {
  return Jh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Jh(e, t);
}
function _t(e, t, r) {
  return t = sS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sS(e) {
  var t = HF(e, "string");
  return sa(t) == "symbol" ? t : t + "";
}
function HF(e, t) {
  if (sa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (sa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var qF = function(t) {
  var r = t.data, n = t.startIndex, a = t.endIndex, i = t.x, o = t.width, u = t.travellerWidth;
  if (!r || !r.length)
    return {};
  var s = r.length, c = Ja().domain(vu(0, s)).range([i, i + o - u]), l = c.domain().map(function(f) {
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
}, BE = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, ca = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return kF(this, t), n = jF(this, t, [r]), _t(n, "handleDrag", function(a) {
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
      var i = BE(a) ? a.changedTouches[0] : a;
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
  return UF(t, e), BF(t, [{
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
      var i = BE(a) ? a.changedTouches[0] : a;
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
      var a = this.state, i = a.brushMoveStartX, o = a.movingTravellerId, u = a.endX, s = a.startX, c = this.state[o], l = this.props, f = l.x, h = l.width, p = l.travellerWidth, g = l.onChange, y = l.gap, m = l.data, v = {
        startX: this.state.startX,
        endX: this.state.endX
      }, E = n.pageX - i;
      E > 0 ? E = Math.min(E, f + h - p - c) : E < 0 && (E = Math.max(E, f - c)), v[o] = c + E;
      var _ = this.getIndex(v), A = _.startIndex, b = _.endIndex, T = function() {
        var I = m.length - 1;
        return o === "startX" && (u > s ? A % y === 0 : b % y === 0) || u < s && b === I || o === "endX" && (u > s ? b % y === 0 : A % y === 0) || u > s && b === I;
      };
      this.setState(_t(_t({}, o, c + E), "brushMoveStartX", n.pageX), function() {
        g && T() && g(_);
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
      var i, o, u = this, s = this.props, c = s.y, l = s.travellerWidth, f = s.height, h = s.traveller, p = s.ariaLabel, g = s.data, y = s.startIndex, m = s.endIndex, v = Math.max(n, this.props.x), E = _d(_d({}, le(this.props, !1)), {}, {
        x: v,
        y: c,
        width: l,
        height: f
      }), _ = p || "Min value: ".concat((i = g[y]) === null || i === void 0 ? void 0 : i.name, ", Max value: ").concat((o = g[m]) === null || o === void 0 ? void 0 : o.name);
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
      }, t.renderTraveller(h, E));
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
      }, /* @__PURE__ */ C.createElement(bn, Eu({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(f, h) - p,
        y: o + u / 2
      }, g), this.getTextOfTick(a)), /* @__PURE__ */ C.createElement(bn, Eu({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(f, h) + s + p,
        y: o + u / 2
      }, g), this.getTextOfTick(i)));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, a = n.data, i = n.className, o = n.children, u = n.x, s = n.y, c = n.width, l = n.height, f = n.alwaysShowText, h = this.state, p = h.startX, g = h.endX, y = h.isTextActive, m = h.isSlideMoving, v = h.isTravellerMoving, E = h.isTravellerFocused;
      if (!a || !a.length || !J(u) || !J(s) || !J(c) || !J(l) || c <= 0 || l <= 0)
        return null;
      var _ = pe("recharts-brush", i), A = C.Children.count(o) === 1, b = LF("userSelect", "none");
      return /* @__PURE__ */ C.createElement(Oe, {
        className: _,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: b
      }, this.renderBackground(), A && this.renderPanorama(), this.renderSlide(p, g), this.renderTravellerLayer(p, "startX"), this.renderTravellerLayer(g, "endX"), (y || m || v || E || f) && this.renderText());
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
        return _d({
          prevData: i,
          prevTravellerWidth: s,
          prevUpdateId: c,
          prevX: u,
          prevWidth: o
        }, i && i.length ? qF({
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
_t(ca, "displayName", "Brush");
_t(ca, "defaultProps", {
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
var Ad, jE;
function WF() {
  if (jE) return Ad;
  jE = 1;
  var e = Jp();
  function t(r, n) {
    var a;
    return e(r, function(i, o, u) {
      return a = n(i, o, u), !a;
    }), !!a;
  }
  return Ad = t, Ad;
}
var Od, FE;
function YF() {
  if (FE) return Od;
  FE = 1;
  var e = nA(), t = ur(), r = WF(), n = Tt(), a = Qu();
  function i(o, u, s) {
    var c = n(o) ? e : r;
    return s && a(o, u, s) && (u = void 0), c(o, t(u, 3));
  }
  return Od = i, Od;
}
var zF = YF();
const GF = /* @__PURE__ */ xe(zF);
var nr = function(t, r) {
  var n = t.alwaysShow, a = t.ifOverflow;
  return n && (a = "extendDomain"), a === r;
}, Sd, $E;
function KF() {
  if ($E) return Sd;
  $E = 1;
  var e = TA();
  function t(r, n, a) {
    n == "__proto__" && e ? e(r, n, {
      configurable: !0,
      enumerable: !0,
      value: a,
      writable: !0
    }) : r[n] = a;
  }
  return Sd = t, Sd;
}
var xd, UE;
function VF() {
  if (UE) return xd;
  UE = 1;
  var e = KF(), t = vA(), r = ur();
  function n(a, i) {
    var o = {};
    return i = r(i, 3), t(a, function(u, s, c) {
      e(o, s, i(u, s, c));
    }), o;
  }
  return xd = n, xd;
}
var XF = VF();
const QF = /* @__PURE__ */ xe(XF);
var wd, HE;
function ZF() {
  if (HE) return wd;
  HE = 1;
  function e(t, r) {
    for (var n = -1, a = t == null ? 0 : t.length; ++n < a; )
      if (!r(t[n], n, t))
        return !1;
    return !0;
  }
  return wd = e, wd;
}
var Pd, qE;
function JF() {
  if (qE) return Pd;
  qE = 1;
  var e = Jp();
  function t(r, n) {
    var a = !0;
    return e(r, function(i, o, u) {
      return a = !!n(i, o, u), a;
    }), a;
  }
  return Pd = t, Pd;
}
var Id, WE;
function e9() {
  if (WE) return Id;
  WE = 1;
  var e = ZF(), t = JF(), r = ur(), n = Tt(), a = Qu();
  function i(o, u, s) {
    var c = n(o) ? e : t;
    return s && a(o, u, s) && (u = void 0), c(o, r(u, 3));
  }
  return Id = i, Id;
}
var t9 = e9();
const cS = /* @__PURE__ */ xe(t9);
var r9 = ["x", "y"];
function la(e) {
  "@babel/helpers - typeof";
  return la = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, la(e);
}
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
function Ua(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? YE(Object(r), !0).forEach(function(n) {
      n9(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : YE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function n9(e, t, r) {
  return t = a9(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function a9(e) {
  var t = i9(e, "string");
  return la(t) == "symbol" ? t : t + "";
}
function i9(e, t) {
  if (la(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (la(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function o9(e, t) {
  if (e == null) return {};
  var r = u9(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function u9(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function s9(e, t) {
  var r = e.x, n = e.y, a = o9(e, r9), i = "".concat(r), o = parseInt(i, 10), u = "".concat(n), s = parseInt(u, 10), c = "".concat(t.height || a.height), l = parseInt(c, 10), f = "".concat(t.width || a.width), h = parseInt(f, 10);
  return Ua(Ua(Ua(Ua(Ua({}, t), a), o ? {
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
function zE(e) {
  return /* @__PURE__ */ C.createElement(rS, ep({
    shapeType: "rectangle",
    propTransformer: s9,
    activeClassName: "recharts-active-bar"
  }, e));
}
var c9 = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, a) {
    if (typeof t == "number") return t;
    var i = J(n) || ON(n);
    return i ? t(n, a) : (i || (process.env.NODE_ENV !== "production" ? vt(!1, "minPointSize callback function received a value with type of ".concat(la(n), ". Currently only numbers or null/undefined are supported.")) : vt()), r);
  };
}, l9 = ["value", "background"], lS;
function fa(e) {
  "@babel/helpers - typeof";
  return fa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fa(e);
}
function f9(e, t) {
  if (e == null) return {};
  var r = d9(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function d9(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
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
function $e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? GE(Object(r), !0).forEach(function(n) {
      jr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : GE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function h9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function KE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, dS(n.key), n);
  }
}
function p9(e, t, r) {
  return t && KE(e.prototype, t), r && KE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function m9(e, t, r) {
  return t = Au(t), y9(e, fS() ? Reflect.construct(t, r || [], Au(e).constructor) : t.apply(e, r));
}
function y9(e, t) {
  if (t && (fa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return b9(e);
}
function b9(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function fS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (fS = function() {
    return !!e;
  })();
}
function Au(e) {
  return Au = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Au(e);
}
function g9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && tp(e, t);
}
function tp(e, t) {
  return tp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, tp(e, t);
}
function jr(e, t, r) {
  return t = dS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dS(e) {
  var t = v9(e, "string");
  return fa(t) == "symbol" ? t : t + "";
}
function v9(e, t) {
  if (fa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var sr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    h9(this, t);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    return r = m9(this, t, [].concat(a)), jr(r, "state", {
      isAnimationFinished: !1
    }), jr(r, "id", Ki("recharts-bar-")), jr(r, "handleAnimationEnd", function() {
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
  return g9(t, e), p9(t, [{
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
        return /* @__PURE__ */ C.createElement(Oe, _u({
          className: "recharts-bar-rectangle"
        }, yn(a.props, f, h), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(f?.x, "-").concat(f?.y, "-").concat(f?.value, "-").concat(h)
        }), /* @__PURE__ */ C.createElement(zE, y));
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
        var g = p.t, y = i.map(function(m, v) {
          var E = h && h[v];
          if (E) {
            var _ = Mr(E.x, m.x), A = Mr(E.y, m.y), b = Mr(E.width, m.width), T = Mr(E.height, m.height);
            return $e($e({}, m), {}, {
              x: _(g),
              y: A(g),
              width: b(g),
              height: T(g)
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
      return i && a && a.length && (!o || !ss(o, a)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(a);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this, a = this.props, i = a.data, o = a.dataKey, u = a.activeIndex, s = le(this.props.background, !1);
      return i.map(function(c, l) {
        c.value;
        var f = c.background, h = f9(c, l9);
        if (!f)
          return null;
        var p = $e($e($e($e($e({}, h), {}, {
          fill: "#eee"
        }, f), s), yn(n.props, c, l)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: o,
          index: l,
          className: "recharts-bar-background-rectangle"
        });
        return /* @__PURE__ */ C.createElement(zE, _u({
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
      var i = this.props, o = i.data, u = i.xAxis, s = i.yAxis, c = i.layout, l = i.children, f = jt(l, fs);
      if (!f)
        return null;
      var h = c === "vertical" ? o[0].height / 2 : o[0].width / 2, p = function(m, v) {
        var E = Array.isArray(m.value) ? m.value[1] : m.value;
        return {
          x: m.x,
          y: m.y,
          value: E,
          errorVal: ut(m, v)
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
      var m = this.state.isAnimationFinished, v = pe("recharts-bar", o), E = u && u.allowDataOverflow, _ = s && s.allowDataOverflow, A = E || _, b = me(y) ? this.id : y;
      return /* @__PURE__ */ C.createElement(Oe, {
        className: v
      }, E || _ ? /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("clipPath", {
        id: "clipPath-".concat(b)
      }, /* @__PURE__ */ C.createElement("rect", {
        x: E ? c : c - f / 2,
        y: _ ? l : l - h / 2,
        width: E ? f : f * 2,
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
lS = sr;
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
  isAnimationActive: !Oa.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
jr(sr, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.barPosition, a = e.bandSize, i = e.xAxis, o = e.yAxis, u = e.xAxisTicks, s = e.yAxisTicks, c = e.stackedData, l = e.dataStartIndex, f = e.displayedData, h = e.offset, p = F4(n, r);
  if (!p)
    return null;
  var g = t.layout, y = r.type.defaultProps, m = y !== void 0 ? $e($e({}, y), r.props) : r.props, v = m.dataKey, E = m.children, _ = m.minPointSize, A = g === "horizontal" ? o : i, b = c ? A.scale.domain() : null, T = z4({
    numericAxis: A
  }), O = jt(E, Zu), I = f.map(function(N, j) {
    var D, R, B, F, $, q;
    c ? D = $4(c[l + j], b) : (D = ut(N, v), Array.isArray(D) || (D = [T, D]));
    var Y = c9(_, lS.defaultProps.minPointSize)(D[1], j);
    if (g === "horizontal") {
      var Q, te = [o.scale(D[0]), o.scale(D[1])], k = te[0], W = te[1];
      R = m1({
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
      if (R = oe, B = m1({
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
      tooltipPayload: [kO(r, N)],
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
function Fi(e) {
  "@babel/helpers - typeof";
  return Fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fi(e);
}
function E9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function VE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, hS(n.key), n);
  }
}
function T9(e, t, r) {
  return t && VE(e.prototype, t), r && VE(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
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
function qt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? XE(Object(r), !0).forEach(function(n) {
      gs(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : XE(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function gs(e, t, r) {
  return t = hS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function hS(e) {
  var t = _9(e, "string");
  return Fi(t) == "symbol" ? t : t + "";
}
function _9(e, t) {
  if (Fi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Fi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var A9 = function(t, r, n, a, i) {
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
    var y = r[g], m = y.orientation, v = y.domain, E = y.padding, _ = E === void 0 ? {} : E, A = y.mirror, b = y.reversed, T = "".concat(m).concat(A ? "Mirror" : ""), O, I, N, j, D;
    if (y.type === "number" && (y.padding === "gap" || y.padding === "no-gap")) {
      var R = v[1] - v[0], B = 1 / 0, F = y.categoricalDomain.sort(wN);
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
    a === "xAxis" ? I = [n.left + (_.left || 0) + (O || 0), n.left + n.width - (_.right || 0) - (O || 0)] : a === "yAxis" ? I = s === "horizontal" ? [n.top + n.height - (_.bottom || 0), n.top + (_.top || 0)] : [n.top + (_.top || 0) + (O || 0), n.top + n.height - (_.bottom || 0) - (O || 0)] : I = y.range, b && (I = [I[1], I[0]]);
    var te = RO(y, i, h), k = te.scale, W = te.realScaleType;
    k.domain(v).range(I), DO(k);
    var z = MO(k, qt(qt({}, y), {}, {
      realScaleType: W
    }));
    a === "xAxis" ? (D = m === "top" && !A || m === "bottom" && A, N = n.left, j = f[T] - D * y.height) : a === "yAxis" && (D = m === "left" && !A || m === "right" && A, N = f[T] - D * y.width, j = n.top);
    var Z = qt(qt(qt({}, y), z), {}, {
      realScaleType: W,
      x: N,
      y: j,
      scale: k,
      width: a === "xAxis" ? n.width : y.width,
      height: a === "yAxis" ? n.height : y.height
    });
    return Z.bandSize = iu(Z, z), !y.hide && a === "xAxis" ? f[T] += (D ? -1 : 1) * Z.height : y.hide || (f[T] += (D ? -1 : 1) * Z.width), qt(qt({}, p), {}, gs({}, g, Z));
  }, {});
}, pS = function(t, r) {
  var n = t.x, a = t.y, i = r.x, o = r.y;
  return {
    x: Math.min(n, i),
    y: Math.min(a, o),
    width: Math.abs(i - n),
    height: Math.abs(o - a)
  };
}, O9 = function(t) {
  var r = t.x1, n = t.y1, a = t.x2, i = t.y2;
  return pS({
    x: r,
    y: n
  }, {
    x: a,
    y: i
  });
}, mS = /* @__PURE__ */ (function() {
  function e(t) {
    E9(this, e), this.scale = t;
  }
  return T9(e, [{
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
gs(mS, "EPS", 1e-4);
var C0 = function(t) {
  var r = Object.keys(t).reduce(function(n, a) {
    return qt(qt({}, n), {}, gs({}, a, mS.create(t[a])));
  }, {});
  return qt(qt({}, r), {}, {
    apply: function(a) {
      var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = i.bandAware, u = i.position;
      return QF(a, function(s, c) {
        return r[c].apply(s, {
          bandAware: o,
          position: u
        });
      });
    },
    isInRange: function(a) {
      return cS(a, function(i, o) {
        return r[o].isInRange(i);
      });
    }
  });
};
function S9(e) {
  return (e % 180 + 180) % 180;
}
var x9 = function(t) {
  var r = t.width, n = t.height, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, i = S9(a), o = i * Math.PI / 180, u = Math.atan(n / r), s = o > u && o < Math.PI - u ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(s);
}, Cd, QE;
function w9() {
  if (QE) return Cd;
  QE = 1;
  var e = ur(), t = Vi(), r = Vu();
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
  return Cd = n, Cd;
}
var Nd, ZE;
function P9() {
  if (ZE) return Nd;
  ZE = 1;
  var e = iS();
  function t(r) {
    var n = e(r), a = n % 1;
    return n === n ? a ? n - a : n : 0;
  }
  return Nd = t, Nd;
}
var Rd, JE;
function I9() {
  if (JE) return Rd;
  JE = 1;
  var e = pA(), t = ur(), r = P9(), n = Math.max;
  function a(i, o, u) {
    var s = i == null ? 0 : i.length;
    if (!s)
      return -1;
    var c = u == null ? 0 : r(u);
    return c < 0 && (c = n(s + c, 0)), e(i, t(o, 3), c);
  }
  return Rd = a, Rd;
}
var Dd, eT;
function C9() {
  if (eT) return Dd;
  eT = 1;
  var e = w9(), t = I9(), r = e(t);
  return Dd = r, Dd;
}
var N9 = C9();
const R9 = /* @__PURE__ */ xe(N9);
var D9 = C_();
const M9 = /* @__PURE__ */ xe(D9);
var L9 = M9(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
});
function Ou(e) {
  "@babel/helpers - typeof";
  return Ou = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ou(e);
}
var N0 = /* @__PURE__ */ Vt(void 0), R0 = /* @__PURE__ */ Vt(void 0), yS = /* @__PURE__ */ Vt(void 0), bS = /* @__PURE__ */ Vt({}), gS = /* @__PURE__ */ Vt(void 0), vS = /* @__PURE__ */ Vt(0), ES = /* @__PURE__ */ Vt(0), tT = function(t) {
  var r = t.state, n = r.xAxisMap, a = r.yAxisMap, i = r.offset, o = t.clipPathId, u = t.children, s = t.width, c = t.height, l = L9(i);
  return /* @__PURE__ */ C.createElement(N0.Provider, {
    value: n
  }, /* @__PURE__ */ C.createElement(R0.Provider, {
    value: a
  }, /* @__PURE__ */ C.createElement(bS.Provider, {
    value: i
  }, /* @__PURE__ */ C.createElement(yS.Provider, {
    value: l
  }, /* @__PURE__ */ C.createElement(gS.Provider, {
    value: o
  }, /* @__PURE__ */ C.createElement(vS.Provider, {
    value: c
  }, /* @__PURE__ */ C.createElement(ES.Provider, {
    value: s
  }, u)))))));
}, k9 = function() {
  return $t(gS);
};
function TS(e) {
  var t = Object.keys(e);
  return t.length === 0 ? "There are no available ids." : "Available ids are: ".concat(t, ".");
}
var _S = function(t) {
  var r = $t(N0);
  r == null && (process.env.NODE_ENV !== "production" ? vt(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : vt());
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? vt(!1, 'Could not find xAxis by id "'.concat(t, '" [').concat(Ou(t), "]. ").concat(TS(r))) : vt()), n;
}, B9 = function() {
  var t = $t(N0);
  return kr(t);
}, j9 = function() {
  var t = $t(R0), r = R9(t, function(n) {
    return cS(n.domain, Number.isFinite);
  });
  return r || kr(t);
}, AS = function(t) {
  var r = $t(R0);
  r == null && (process.env.NODE_ENV !== "production" ? vt(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : vt());
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? vt(!1, 'Could not find yAxis by id "'.concat(t, '" [').concat(Ou(t), "]. ").concat(TS(r))) : vt()), n;
}, F9 = function() {
  var t = $t(yS);
  return t;
}, $9 = function() {
  return $t(bS);
}, D0 = function() {
  return $t(ES);
}, M0 = function() {
  return $t(vS);
};
function da(e) {
  "@babel/helpers - typeof";
  return da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, da(e);
}
function U9(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function H9(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, SS(n.key), n);
  }
}
function q9(e, t, r) {
  return t && H9(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function W9(e, t, r) {
  return t = Su(t), Y9(e, OS() ? Reflect.construct(t, r || [], Su(e).constructor) : t.apply(e, r));
}
function Y9(e, t) {
  if (t && (da(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return z9(e);
}
function z9(e) {
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
function Su(e) {
  return Su = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Su(e);
}
function G9(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && rp(e, t);
}
function rp(e, t) {
  return rp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, rp(e, t);
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
function nT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rT(Object(r), !0).forEach(function(n) {
      L0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function L0(e, t, r) {
  return t = SS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function SS(e) {
  var t = K9(e, "string");
  return da(t) == "symbol" ? t : t + "";
}
function K9(e, t) {
  if (da(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (da(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function V9(e, t) {
  return J9(e) || Z9(e, t) || Q9(e, t) || X9();
}
function X9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Q9(e, t) {
  if (e) {
    if (typeof e == "string") return aT(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return aT(e, t);
  }
}
function aT(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Z9(e, t) {
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
function J9(e) {
  if (Array.isArray(e)) return e;
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
var e$ = function(t, r) {
  var n;
  return /* @__PURE__ */ C.isValidElement(t) ? n = /* @__PURE__ */ C.cloneElement(t, r) : de(t) ? n = t(r) : n = /* @__PURE__ */ C.createElement("line", np({}, r, {
    className: "recharts-reference-line-line"
  })), n;
}, t$ = function(t, r, n, a, i, o, u, s, c) {
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
    var v = c.x, E = t.x.apply(v, {
      position: o
    });
    if (nr(c, "discard") && !t.x.isInRange(E))
      return null;
    var _ = [{
      x: E,
      y: f + p
    }, {
      x: E,
      y: f
    }];
    return u === "top" ? _.reverse() : _;
  }
  if (a) {
    var A = c.segment, b = A.map(function(T) {
      return t.apply(T, {
        position: o
      });
    });
    return nr(c, "discard") && GF(b, function(T) {
      return !t.isInRange(T);
    }) ? null : b;
  }
  return null;
};
function r$(e) {
  var t = e.x, r = e.y, n = e.segment, a = e.xAxisId, i = e.yAxisId, o = e.shape, u = e.className, s = e.alwaysShow, c = k9(), l = _S(a), f = AS(i), h = F9();
  if (!c || !h)
    return null;
  zt(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var p = C0({
    x: l.scale,
    y: f.scale
  }), g = ze(t), y = ze(r), m = n && n.length === 2, v = t$(p, g, y, m, h, e.position, l.orientation, f.orientation, e);
  if (!v)
    return null;
  var E = V9(v, 2), _ = E[0], A = _.x, b = _.y, T = E[1], O = T.x, I = T.y, N = nr(e, "hidden") ? "url(#".concat(c, ")") : void 0, j = nT(nT({
    clipPath: N
  }, le(e, !0)), {}, {
    x1: A,
    y1: b,
    x2: O,
    y2: I
  });
  return /* @__PURE__ */ C.createElement(Oe, {
    className: pe("recharts-reference-line", u)
  }, e$(o, j), Qe.renderCallByParent(e, O9({
    x1: A,
    y1: b,
    x2: O,
    y2: I
  })));
}
var k0 = /* @__PURE__ */ (function(e) {
  function t() {
    return U9(this, t), W9(this, t, arguments);
  }
  return G9(t, e), q9(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ C.createElement(r$, this.props);
    }
  }]);
})(C.Component);
L0(k0, "displayName", "ReferenceLine");
L0(k0, "defaultProps", {
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
function ha(e) {
  "@babel/helpers - typeof";
  return ha = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ha(e);
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
function oT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? iT(Object(r), !0).forEach(function(n) {
      vs(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : iT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function n$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function a$(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, wS(n.key), n);
  }
}
function i$(e, t, r) {
  return t && a$(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function o$(e, t, r) {
  return t = xu(t), u$(e, xS() ? Reflect.construct(t, r || [], xu(e).constructor) : t.apply(e, r));
}
function u$(e, t) {
  if (t && (ha(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return s$(e);
}
function s$(e) {
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
function xu(e) {
  return xu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, xu(e);
}
function c$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ip(e, t);
}
function ip(e, t) {
  return ip = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ip(e, t);
}
function vs(e, t, r) {
  return t = wS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wS(e) {
  var t = l$(e, "string");
  return ha(t) == "symbol" ? t : t + "";
}
function l$(e, t) {
  if (ha(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ha(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var f$ = function(t) {
  var r = t.x, n = t.y, a = t.xAxis, i = t.yAxis, o = C0({
    x: a.scale,
    y: i.scale
  }), u = o.apply({
    x: r,
    y: n
  }, {
    bandAware: !0
  });
  return nr(t, "discard") && !o.isInRange(u) ? null : u;
}, Es = /* @__PURE__ */ (function(e) {
  function t() {
    return n$(this, t), o$(this, t, arguments);
  }
  return c$(t, e), i$(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.x, i = n.y, o = n.r, u = n.alwaysShow, s = n.clipPathId, c = ze(a), l = ze(i);
      if (zt(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !c || !l)
        return null;
      var f = f$(this.props);
      if (!f)
        return null;
      var h = f.x, p = f.y, g = this.props, y = g.shape, m = g.className, v = nr(this.props, "hidden") ? "url(#".concat(s, ")") : void 0, E = oT(oT({
        clipPath: v
      }, le(this.props, !0)), {}, {
        cx: h,
        cy: p
      });
      return /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-reference-dot", m)
      }, t.renderDot(y, E), Qe.renderCallByParent(this.props, {
        x: h - o,
        y: p - o,
        width: 2 * o,
        height: 2 * o
      }));
    }
  }]);
})(C.Component);
vs(Es, "displayName", "ReferenceDot");
vs(Es, "defaultProps", {
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
vs(Es, "renderDot", function(e, t) {
  var r;
  return /* @__PURE__ */ C.isValidElement(e) ? r = /* @__PURE__ */ C.cloneElement(e, t) : de(e) ? r = e(t) : r = /* @__PURE__ */ C.createElement(I0, ap({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r;
});
function op() {
  return op = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, op.apply(this, arguments);
}
function pa(e) {
  "@babel/helpers - typeof";
  return pa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pa(e);
}
function uT(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function sT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? uT(Object(r), !0).forEach(function(n) {
      Ts(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : uT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function d$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function h$(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, IS(n.key), n);
  }
}
function p$(e, t, r) {
  return t && h$(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function m$(e, t, r) {
  return t = wu(t), y$(e, PS() ? Reflect.construct(t, r || [], wu(e).constructor) : t.apply(e, r));
}
function y$(e, t) {
  if (t && (pa(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return b$(e);
}
function b$(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function PS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (PS = function() {
    return !!e;
  })();
}
function wu(e) {
  return wu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, wu(e);
}
function g$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && up(e, t);
}
function up(e, t) {
  return up = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, up(e, t);
}
function Ts(e, t, r) {
  return t = IS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function IS(e) {
  var t = v$(e, "string");
  return pa(t) == "symbol" ? t : t + "";
}
function v$(e, t) {
  if (pa(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pa(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var E$ = function(t, r, n, a, i) {
  var o = i.x1, u = i.x2, s = i.y1, c = i.y2, l = i.xAxis, f = i.yAxis;
  if (!l || !f) return null;
  var h = C0({
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
  return nr(i, "discard") && (!h.isInRange(p) || !h.isInRange(g)) ? null : pS(p, g);
}, _s = /* @__PURE__ */ (function(e) {
  function t() {
    return d$(this, t), m$(this, t, arguments);
  }
  return g$(t, e), p$(t, [{
    key: "render",
    value: function() {
      var n = this.props, a = n.x1, i = n.x2, o = n.y1, u = n.y2, s = n.className, c = n.alwaysShow, l = n.clipPathId;
      zt(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var f = ze(a), h = ze(i), p = ze(o), g = ze(u), y = this.props.shape;
      if (!f && !h && !p && !g && !y)
        return null;
      var m = E$(f, h, p, g, this.props);
      if (!m && !y)
        return null;
      var v = nr(this.props, "hidden") ? "url(#".concat(l, ")") : void 0;
      return /* @__PURE__ */ C.createElement(Oe, {
        className: pe("recharts-reference-area", s)
      }, t.renderRect(y, sT(sT({
        clipPath: v
      }, le(this.props, !0)), m)), Qe.renderCallByParent(this.props, m));
    }
  }]);
})(C.Component);
Ts(_s, "displayName", "ReferenceArea");
Ts(_s, "defaultProps", {
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
Ts(_s, "renderRect", function(e, t) {
  var r;
  return /* @__PURE__ */ C.isValidElement(e) ? r = /* @__PURE__ */ C.cloneElement(e, t) : de(e) ? r = e(t) : r = /* @__PURE__ */ C.createElement(P0, op({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
});
function CS(e, t, r) {
  if (t < 1)
    return [];
  if (t === 1 && r === void 0)
    return e;
  for (var n = [], a = 0; a < e.length; a += t)
    n.push(e[a]);
  return n;
}
function T$(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return x9(n, r);
}
function _$(e, t, r) {
  var n = r === "width", a = e.x, i = e.y, o = e.width, u = e.height;
  return t === 1 ? {
    start: n ? a : i,
    end: n ? a + o : i + u
  } : {
    start: n ? a + o : i + u,
    end: n ? a : i
  };
}
function Pu(e, t, r, n, a) {
  if (e * t < e * n || e * t > e * a)
    return !1;
  var i = r();
  return e * (t - e * i / 2 - n) >= 0 && e * (t + e * i / 2 - a) <= 0;
}
function A$(e, t) {
  return CS(e, t + 1);
}
function O$(e, t, r, n, a) {
  for (var i = (n || []).slice(), o = t.start, u = t.end, s = 0, c = 1, l = o, f = function() {
    var g = n?.[s];
    if (g === void 0)
      return {
        v: CS(n, c)
      };
    var y = s, m, v = function() {
      return m === void 0 && (m = r(g, y)), m;
    }, E = g.coordinate, _ = s === 0 || Pu(e, E, v, l, u);
    _ || (s = 0, l = o, c += 1), _ && (l = E + e * (v() / 2 + a), s += c);
  }, h; c <= i.length; )
    if (h = f(), h) return h.v;
  return [];
}
function $i(e) {
  "@babel/helpers - typeof";
  return $i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $i(e);
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
function at(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cT(Object(r), !0).forEach(function(n) {
      S$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function S$(e, t, r) {
  return t = x$(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function x$(e) {
  var t = w$(e, "string");
  return $i(t) == "symbol" ? t : t + "";
}
function w$(e, t) {
  if ($i(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if ($i(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function P$(e, t, r, n, a) {
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
    var v = Pu(e, p.tickCoord, y, u, s);
    v && (s = p.tickCoord - e * (y() / 2 + a), i[h] = at(at({}, p), {}, {
      isShow: !0
    }));
  }, l = o - 1; l >= 0; l--)
    c(l);
  return i;
}
function I$(e, t, r, n, a, i) {
  var o = (n || []).slice(), u = o.length, s = t.start, c = t.end;
  if (i) {
    var l = n[u - 1], f = r(l, u - 1), h = e * (l.coordinate + e * f / 2 - c);
    o[u - 1] = l = at(at({}, l), {}, {
      tickCoord: h > 0 ? l.coordinate - h * e : l.coordinate
    });
    var p = Pu(e, l.tickCoord, function() {
      return f;
    }, s, c);
    p && (c = l.tickCoord - e * (f / 2 + a), o[u - 1] = at(at({}, l), {}, {
      isShow: !0
    }));
  }
  for (var g = i ? u - 1 : u, y = function(E) {
    var _ = o[E], A, b = function() {
      return A === void 0 && (A = r(_, E)), A;
    };
    if (E === 0) {
      var T = e * (_.coordinate - e * b() / 2 - s);
      o[E] = _ = at(at({}, _), {}, {
        tickCoord: T < 0 ? _.coordinate - T * e : _.coordinate
      });
    } else
      o[E] = _ = at(at({}, _), {}, {
        tickCoord: _.coordinate
      });
    var O = Pu(e, _.tickCoord, b, s, c);
    O && (s = _.tickCoord + e * (b() / 2 + a), o[E] = at(at({}, _), {}, {
      isShow: !0
    }));
  }, m = 0; m < g; m++)
    y(m);
  return o;
}
function B0(e, t, r) {
  var n = e.tick, a = e.ticks, i = e.viewBox, o = e.minTickGap, u = e.orientation, s = e.interval, c = e.tickFormatter, l = e.unit, f = e.angle;
  if (!a || !a.length || !n)
    return [];
  if (J(s) || Oa.isSsr)
    return A$(a, typeof s == "number" && J(s) ? s : 0);
  var h = [], p = u === "top" || u === "bottom" ? "width" : "height", g = l && p === "width" ? Za(l, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, y = function(_, A) {
    var b = de(c) ? c(_.value, A) : _.value;
    return p === "width" ? T$(Za(b, {
      fontSize: t,
      letterSpacing: r
    }), g, f) : Za(b, {
      fontSize: t,
      letterSpacing: r
    })[p];
  }, m = a.length >= 2 ? dt(a[1].coordinate - a[0].coordinate) : 1, v = _$(i, m, p);
  return s === "equidistantPreserveStart" ? O$(m, v, y, a, o) : (s === "preserveStart" || s === "preserveStartEnd" ? h = I$(m, v, y, a, o, s === "preserveStartEnd") : h = P$(m, v, y, a, o), h.filter(function(E) {
    return E.isShow;
  }));
}
var C$ = ["viewBox"], N$ = ["viewBox"], R$ = ["ticks"];
function ma(e) {
  "@babel/helpers - typeof";
  return ma = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ma(e);
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
function lT(e, t) {
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
    t % 2 ? lT(Object(r), !0).forEach(function(n) {
      j0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : lT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Md(e, t) {
  if (e == null) return {};
  var r = D$(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function D$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function M$(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function fT(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, RS(n.key), n);
  }
}
function L$(e, t, r) {
  return t && fT(e.prototype, t), r && fT(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function k$(e, t, r) {
  return t = Iu(t), B$(e, NS() ? Reflect.construct(t, r || [], Iu(e).constructor) : t.apply(e, r));
}
function B$(e, t) {
  if (t && (ma(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return j$(e);
}
function j$(e) {
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
function Iu(e) {
  return Iu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Iu(e);
}
function F$(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && sp(e, t);
}
function sp(e, t) {
  return sp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, sp(e, t);
}
function j0(e, t, r) {
  return t = RS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RS(e) {
  var t = $$(e, "string");
  return ma(t) == "symbol" ? t : t + "";
}
function $$(e, t) {
  if (ma(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ma(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Pa = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return M$(this, t), n = k$(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n;
  }
  return F$(t, e), L$(t, [{
    key: "shouldComponentUpdate",
    value: function(n, a) {
      var i = n.viewBox, o = Md(n, C$), u = this.props, s = u.viewBox, c = Md(u, N$);
      return !qn(i, s) || !qn(o, c) || !qn(a, this.state);
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
      var a = this.props, i = a.x, o = a.y, u = a.width, s = a.height, c = a.orientation, l = a.tickSize, f = a.mirror, h = a.tickMargin, p, g, y, m, v, E, _ = f ? -1 : 1, A = n.tickSize || l, b = J(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (c) {
        case "top":
          p = g = n.coordinate, m = o + +!f * s, y = m - _ * A, E = y - _ * h, v = b;
          break;
        case "left":
          y = m = n.coordinate, g = i + +!f * u, p = g - _ * A, v = p - _ * h, E = b;
          break;
        case "right":
          y = m = n.coordinate, g = i + +f * u, p = g + _ * A, v = p + _ * h, E = b;
          break;
        default:
          p = g = n.coordinate, m = o + +f * s, y = m + _ * A, E = y + _ * h, v = b;
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
          x: v,
          y: E
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
      return /* @__PURE__ */ C.createElement("line", $n({}, f, {
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
        var o = this, u = this.props, s = u.tickLine, c = u.stroke, l = u.tick, f = u.tickFormatter, h = u.unit, p = B0(qe(qe({}, this.props), {}, {
          ticks: n
        }), a, i), g = this.getTickTextAnchor(), y = this.getTickVerticalAnchor(), m = le(this.props, !1), v = le(l, !1), E = qe(qe({}, m), {}, {
          fill: "none"
        }, le(s, !1)), _ = p.map(function(A, b) {
          var T = o.getTickLineCoord(A), O = T.line, I = T.tick, N = qe(qe(qe(qe({
            textAnchor: g,
            verticalAnchor: y
          }, m), {}, {
            stroke: "none",
            fill: c
          }, v), I), {}, {
            index: b,
            payload: A,
            visibleTicksCount: p.length,
            tickFormatter: f
          });
          return /* @__PURE__ */ C.createElement(Oe, $n({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(A.value, "-").concat(A.coordinate, "-").concat(A.tickCoord)
          }, yn(o.props, A, b)), s && /* @__PURE__ */ C.createElement("line", $n({}, E, O, {
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
      var n = this, a = this.props, i = a.axisLine, o = a.width, u = a.height, s = a.ticksGenerator, c = a.className, l = a.hide;
      if (l)
        return null;
      var f = this.props, h = f.ticks, p = Md(f, R$), g = h;
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
      })) : o = /* @__PURE__ */ C.createElement(bn, $n({}, a, {
        className: "recharts-cartesian-axis-tick-value"
      }), i), o;
    }
  }]);
})(IT);
j0(Pa, "displayName", "CartesianAxis");
j0(Pa, "defaultProps", {
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
var U$ = ["x1", "y1", "x2", "y2", "key"], H$ = ["offset"];
function vn(e) {
  "@babel/helpers - typeof";
  return vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, vn(e);
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
function ot(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dT(Object(r), !0).forEach(function(n) {
      q$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function q$(e, t, r) {
  return t = W$(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function W$(e) {
  var t = Y$(e, "string");
  return vn(t) == "symbol" ? t : t + "";
}
function Y$(e, t) {
  if (vn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (vn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function un() {
  return un = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, un.apply(this, arguments);
}
function hT(e, t) {
  if (e == null) return {};
  var r = z$(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function z$(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var G$ = function(t) {
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
function DS(e, t) {
  var r;
  if (/* @__PURE__ */ C.isValidElement(e))
    r = /* @__PURE__ */ C.cloneElement(e, t);
  else if (de(e))
    r = e(t);
  else {
    var n = t.x1, a = t.y1, i = t.x2, o = t.y2, u = t.key, s = hT(t, U$), c = le(s, !1);
    c.offset;
    var l = hT(c, H$);
    r = /* @__PURE__ */ C.createElement("line", un({}, l, {
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
function K$(e) {
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
    return DS(a, c);
  });
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, o);
}
function V$(e) {
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
    return DS(a, c);
  });
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, o);
}
function X$(e) {
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
function Q$(e) {
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
var Z$ = function(t, r) {
  var n = t.xAxis, a = t.width, i = t.height, o = t.offset;
  return NO(B0(ot(ot(ot({}, Pa.defaultProps), n), {}, {
    ticks: mr(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: i
    }
  })), o.left, o.left + o.width, r);
}, J$ = function(t, r) {
  var n = t.yAxis, a = t.width, i = t.height, o = t.offset;
  return NO(B0(ot(ot(ot({}, Pa.defaultProps), n), {}, {
    ticks: mr(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: i
    }
  })), o.top, o.top + o.height, r);
}, Rn = {
  horizontal: !0,
  vertical: !0,
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
function to(e) {
  var t, r, n, a, i, o, u = D0(), s = M0(), c = $9(), l = ot(ot({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : Rn.stroke,
    fill: (r = e.fill) !== null && r !== void 0 ? r : Rn.fill,
    horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : Rn.horizontal,
    horizontalFill: (a = e.horizontalFill) !== null && a !== void 0 ? a : Rn.horizontalFill,
    vertical: (i = e.vertical) !== null && i !== void 0 ? i : Rn.vertical,
    verticalFill: (o = e.verticalFill) !== null && o !== void 0 ? o : Rn.verticalFill,
    x: J(e.x) ? e.x : c.left,
    y: J(e.y) ? e.y : c.top,
    width: J(e.width) ? e.width : c.width,
    height: J(e.height) ? e.height : c.height
  }), f = l.x, h = l.y, p = l.width, g = l.height, y = l.syncWithTicks, m = l.horizontalValues, v = l.verticalValues, E = B9(), _ = j9();
  if (!J(p) || p <= 0 || !J(g) || g <= 0 || !J(f) || f !== +f || !J(h) || h !== +h)
    return null;
  var A = l.verticalCoordinatesGenerator || Z$, b = l.horizontalCoordinatesGenerator || J$, T = l.horizontalPoints, O = l.verticalPoints;
  if ((!T || !T.length) && de(b)) {
    var I = m && m.length, N = b({
      yAxis: _ ? ot(ot({}, _), {}, {
        ticks: I ? m : _.ticks
      }) : void 0,
      width: u,
      height: s,
      offset: c
    }, I ? !0 : y);
    zt(Array.isArray(N), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(vn(N), "]")), Array.isArray(N) && (T = N);
  }
  if ((!O || !O.length) && de(A)) {
    var j = v && v.length, D = A({
      xAxis: E ? ot(ot({}, E), {}, {
        ticks: j ? v : E.ticks
      }) : void 0,
      width: u,
      height: s,
      offset: c
    }, j ? !0 : y);
    zt(Array.isArray(D), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(vn(D), "]")), Array.isArray(D) && (O = D);
  }
  return /* @__PURE__ */ C.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ C.createElement(G$, {
    fill: l.fill,
    fillOpacity: l.fillOpacity,
    x: l.x,
    y: l.y,
    width: l.width,
    height: l.height,
    ry: l.ry
  }), /* @__PURE__ */ C.createElement(K$, un({}, l, {
    offset: c,
    horizontalPoints: T,
    xAxis: E,
    yAxis: _
  })), /* @__PURE__ */ C.createElement(V$, un({}, l, {
    offset: c,
    verticalPoints: O,
    xAxis: E,
    yAxis: _
  })), /* @__PURE__ */ C.createElement(X$, un({}, l, {
    horizontalPoints: T
  })), /* @__PURE__ */ C.createElement(Q$, un({}, l, {
    verticalPoints: O
  })));
}
to.displayName = "CartesianGrid";
function ya(e) {
  "@babel/helpers - typeof";
  return ya = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ya(e);
}
function eU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function tU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, kS(n.key), n);
  }
}
function rU(e, t, r) {
  return t && tU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function nU(e, t, r) {
  return t = Cu(t), aU(e, MS() ? Reflect.construct(t, r || [], Cu(e).constructor) : t.apply(e, r));
}
function aU(e, t) {
  if (t && (ya(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return iU(e);
}
function iU(e) {
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
function Cu(e) {
  return Cu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Cu(e);
}
function oU(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cp(e, t);
}
function cp(e, t) {
  return cp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, cp(e, t);
}
function LS(e, t, r) {
  return t = kS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kS(e) {
  var t = uU(e, "string");
  return ya(t) == "symbol" ? t : t + "";
}
function uU(e, t) {
  if (ya(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ya(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function lp() {
  return lp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, lp.apply(this, arguments);
}
function sU(e) {
  var t = e.xAxisId, r = D0(), n = M0(), a = _S(t);
  return a == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ qr.createElement(Pa, lp({}, a, {
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
var wn = /* @__PURE__ */ (function(e) {
  function t() {
    return eU(this, t), nU(this, t, arguments);
  }
  return oU(t, e), rU(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ qr.createElement(sU, this.props);
    }
  }]);
})(qr.Component);
LS(wn, "displayName", "XAxis");
LS(wn, "defaultProps", {
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
function ba(e) {
  "@babel/helpers - typeof";
  return ba = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ba(e);
}
function cU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function lU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, FS(n.key), n);
  }
}
function fU(e, t, r) {
  return t && lU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function dU(e, t, r) {
  return t = Nu(t), hU(e, BS() ? Reflect.construct(t, r || [], Nu(e).constructor) : t.apply(e, r));
}
function hU(e, t) {
  if (t && (ba(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return pU(e);
}
function pU(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function BS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (BS = function() {
    return !!e;
  })();
}
function Nu(e) {
  return Nu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Nu(e);
}
function mU(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fp(e, t);
}
function fp(e, t) {
  return fp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, fp(e, t);
}
function jS(e, t, r) {
  return t = FS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function FS(e) {
  var t = yU(e, "string");
  return ba(t) == "symbol" ? t : t + "";
}
function yU(e, t) {
  if (ba(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ba(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function dp() {
  return dp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, dp.apply(this, arguments);
}
var bU = function(t) {
  var r = t.yAxisId, n = D0(), a = M0(), i = AS(r);
  return i == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ qr.createElement(Pa, dp({}, i, {
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
}, Pn = /* @__PURE__ */ (function(e) {
  function t() {
    return cU(this, t), dU(this, t, arguments);
  }
  return mU(t, e), fU(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ qr.createElement(bU, this.props);
    }
  }]);
})(qr.Component);
jS(Pn, "displayName", "YAxis");
jS(Pn, "defaultProps", {
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
function pT(e) {
  return TU(e) || EU(e) || vU(e) || gU();
}
function gU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function vU(e, t) {
  if (e) {
    if (typeof e == "string") return hp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return hp(e, t);
  }
}
function EU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function TU(e) {
  if (Array.isArray(e)) return hp(e);
}
function hp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var pp = function(t, r, n, a, i) {
  var o = jt(t, k0), u = jt(t, Es), s = [].concat(pT(o), pT(u)), c = jt(t, _s), l = "".concat(a, "Id"), f = a[0], h = r;
  if (s.length && (h = s.reduce(function(y, m) {
    if (m.props[l] === n && nr(m.props, "extendDomain") && J(m.props[f])) {
      var v = m.props[f];
      return [Math.min(y[0], v), Math.max(y[1], v)];
    }
    return y;
  }, h)), c.length) {
    var p = "".concat(f, "1"), g = "".concat(f, "2");
    h = c.reduce(function(y, m) {
      if (m.props[l] === n && nr(m.props, "extendDomain") && J(m.props[p]) && J(m.props[g])) {
        var v = m.props[p], E = m.props[g];
        return [Math.min(y[0], v, E), Math.max(y[1], v, E)];
      }
      return y;
    }, h);
  }
  return i && i.length && (h = i.reduce(function(y, m) {
    return J(m) ? [Math.min(y[0], m), Math.max(y[1], m)] : y;
  }, h)), h;
}, Ld = { exports: {} }, mT;
function _U() {
  return mT || (mT = 1, (function(e) {
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
      var m = this._events[y], v = arguments.length, E, _;
      if (m.fn) {
        switch (m.once && this.removeListener(c, m.fn, void 0, !0), v) {
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
        for (_ = 1, E = new Array(v - 1); _ < v; _++)
          E[_ - 1] = arguments[_];
        m.fn.apply(m.context, E);
      } else {
        var A = m.length, b;
        for (_ = 0; _ < A; _++)
          switch (m[_].once && this.removeListener(c, m[_].fn, void 0, !0), v) {
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
              if (!E) for (b = 1, E = new Array(v - 1); b < v; b++)
                E[b - 1] = arguments[b];
              m[_].fn.apply(m[_].context, E);
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
        for (var y = 0, m = [], v = g.length; y < v; y++)
          (g[y].fn !== l || h && !g[y].once || f && g[y].context !== f) && m.push(g[y]);
        m.length ? this._events[p] = m.length === 1 ? m[0] : m : o(this, p);
      }
      return this;
    }, u.prototype.removeAllListeners = function(c) {
      var l;
      return c ? (l = r ? r + c : c, this._events[l] && o(this, l)) : (this._events = new n(), this._eventsCount = 0), this;
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, e.exports = u;
  })(Ld)), Ld.exports;
}
var AU = _U();
const OU = /* @__PURE__ */ xe(AU);
var kd = new OU(), Bd = "recharts.syncMouseEvents";
function Ui(e) {
  "@babel/helpers - typeof";
  return Ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ui(e);
}
function SU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function xU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, $S(n.key), n);
  }
}
function wU(e, t, r) {
  return t && xU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function jd(e, t, r) {
  return t = $S(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $S(e) {
  var t = PU(e, "string");
  return Ui(t) == "symbol" ? t : t + "";
}
function PU(e, t) {
  if (Ui(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ui(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var IU = /* @__PURE__ */ (function() {
  function e() {
    SU(this, e), jd(this, "activeIndex", 0), jd(this, "coordinateList", []), jd(this, "layout", "horizontal");
  }
  return wU(e, [{
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
function CU(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e?.[0], a = e?.[1];
    if (n && a && J(n) && J(a))
      return !0;
  }
  return !1;
}
function NU(e, t, r, n) {
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
function US(e) {
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
function RU(e, t, r) {
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
      return US(t);
  return [{
    x: n,
    y: a
  }, {
    x: i,
    y: o
  }];
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
function Ao(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yT(Object(r), !0).forEach(function(n) {
      DU(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function DU(e, t, r) {
  return t = MU(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function MU(e) {
  var t = LU(e, "string");
  return Hi(t) == "symbol" ? t : t + "";
}
function LU(e, t) {
  if (Hi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Hi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function kU(e) {
  var t, r, n = e.element, a = e.tooltipEventType, i = e.isActive, o = e.activeCoordinate, u = e.activePayload, s = e.offset, c = e.activeTooltipIndex, l = e.tooltipAxisBandSize, f = e.layout, h = e.chartName, p = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !p || !i || !o || h !== "ScatterChart" && a !== "axis")
    return null;
  var g, y = Bh;
  if (h === "ScatterChart")
    g = o, y = bj;
  else if (h === "BarChart")
    g = NU(f, o, s, l), y = P0;
  else if (f === "radial") {
    var m = US(o), v = m.cx, E = m.cy, _ = m.radius, A = m.startAngle, b = m.endAngle;
    g = {
      cx: v,
      cy: E,
      startAngle: A,
      endAngle: b,
      innerRadius: _,
      outerRadius: _
    }, y = HO;
  } else
    g = {
      points: RU(f, o, s)
    }, y = Bh;
  var T = Ao(Ao(Ao(Ao({
    stroke: "#ccc",
    pointerEvents: "none"
  }, s), g), le(p, !1)), {}, {
    payload: u,
    payloadIndex: c,
    className: pe("recharts-tooltip-cursor", p.className)
  });
  return /* @__PURE__ */ Lt(p) ? /* @__PURE__ */ Ue(p, T) : /* @__PURE__ */ ai(y, T);
}
var BU = ["item"], jU = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function ga(e) {
  "@babel/helpers - typeof";
  return ga = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ga(e);
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
function bT(e, t) {
  return UU(e) || $U(e, t) || qS(e, t) || FU();
}
function FU() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function $U(e, t) {
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
function UU(e) {
  if (Array.isArray(e)) return e;
}
function gT(e, t) {
  if (e == null) return {};
  var r = HU(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function HU(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function qU(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function WU(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, WS(n.key), n);
  }
}
function YU(e, t, r) {
  return t && WU(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function zU(e, t, r) {
  return t = Ru(t), GU(e, HS() ? Reflect.construct(t, r || [], Ru(e).constructor) : t.apply(e, r));
}
function GU(e, t) {
  if (t && (ga(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return KU(e);
}
function KU(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function HS() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (HS = function() {
    return !!e;
  })();
}
function Ru(e) {
  return Ru = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ru(e);
}
function VU(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && mp(e, t);
}
function mp(e, t) {
  return mp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, mp(e, t);
}
function va(e) {
  return ZU(e) || QU(e) || qS(e) || XU();
}
function XU() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qS(e, t) {
  if (e) {
    if (typeof e == "string") return yp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return yp(e, t);
  }
}
function QU(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function ZU(e) {
  if (Array.isArray(e)) return yp(e);
}
function yp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
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
function H(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vT(Object(r), !0).forEach(function(n) {
      se(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vT(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function se(e, t, r) {
  return t = WS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function WS(e) {
  var t = JU(e, "string");
  return ga(t) == "symbol" ? t : t + "";
}
function JU(e, t) {
  if (ga(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ga(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var e7 = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, t7 = {
  width: "100%",
  height: "100%"
}, YS = {
  x: 0,
  y: 0
};
function Oo(e) {
  return e;
}
var r7 = function(t, r) {
  return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius;
}, n7 = function(t, r, n, a) {
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
  return YS;
}, As = function(t, r) {
  var n = r.graphicalItems, a = r.dataStartIndex, i = r.dataEndIndex, o = (n ?? []).reduce(function(u, s) {
    var c = s.props.data;
    return c && c.length ? [].concat(va(u), va(c)) : u;
  }, []);
  return o.length > 0 ? o : t && t.length && J(a) && J(i) ? t.slice(a, i + 1) : [];
};
function zS(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var bp = function(t, r, n, a) {
  var i = t.graphicalItems, o = t.tooltipAxis, u = As(r, t);
  return n < 0 || !i || !i.length || n >= u.length ? null : i.reduce(function(s, c) {
    var l, f = (l = c.props.data) !== null && l !== void 0 ? l : r;
    f && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= n && (f = f.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var h;
    if (o.dataKey && !o.allowDuplicatedCategory) {
      var p = f === void 0 ? u : f;
      h = Zd(p, o.dataKey, a);
    } else
      h = f && f[n] || u[n];
    return h ? [].concat(va(s), [kO(c, h)]) : s;
  }, []);
}, ET = function(t, r, n, a) {
  var i = a || {
    x: t.chartX,
    y: t.chartY
  }, o = r7(i, n), u = t.orderedTooltipTicks, s = t.tooltipAxis, c = t.tooltipTicks, l = D4(o, u, c, s);
  if (l >= 0 && c) {
    var f = c[l] && c[l].value, h = bp(t, r, l, f), p = n7(n, u, l, i);
    return {
      activeTooltipIndex: l,
      activeLabel: f,
      activePayload: h,
      activeCoordinate: p
    };
  }
  return null;
}, a7 = function(t, r) {
  var n = r.axes, a = r.graphicalItems, i = r.axisType, o = r.axisIdKey, u = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.layout, f = t.children, h = t.stackOffset, p = CO(l, i);
  return n.reduce(function(g, y) {
    var m, v = y.type.defaultProps !== void 0 ? H(H({}, y.type.defaultProps), y.props) : y.props, E = v.type, _ = v.dataKey, A = v.allowDataOverflow, b = v.allowDuplicatedCategory, T = v.scale, O = v.ticks, I = v.includeHidden, N = v[o];
    if (g[N])
      return g;
    var j = As(t.data, {
      graphicalItems: a.filter(function(z) {
        var Z, ne = o in z.props ? z.props[o] : (Z = z.type.defaultProps) === null || Z === void 0 ? void 0 : Z[o];
        return ne === N;
      }),
      dataStartIndex: s,
      dataEndIndex: c
    }), D = j.length, R, B, F;
    CU(v.domain, A, E) && (R = Rh(v.domain, null, A), p && (E === "number" || T !== "auto") && (F = ei(j, _, "category")));
    var $ = zS(E);
    if (!R || R.length === 0) {
      var q, Y = (q = v.domain) !== null && q !== void 0 ? q : $;
      if (_) {
        if (R = ei(j, _, E), E === "category" && p) {
          var Q = xN(R);
          b && Q ? (B = R, R = vu(0, D)) : b || (R = g1(Y, R, y).reduce(function(z, Z) {
            return z.indexOf(Z) >= 0 ? z : [].concat(va(z), [Z]);
          }, []));
        } else if (E === "category")
          b ? R = R.filter(function(z) {
            return z !== "" && !me(z);
          }) : R = g1(Y, R, y).reduce(function(z, Z) {
            return z.indexOf(Z) >= 0 || Z === "" || me(Z) ? z : [].concat(va(z), [Z]);
          }, []);
        else if (E === "number") {
          var te = j4(j, a.filter(function(z) {
            var Z, ne, oe = o in z.props ? z.props[o] : (Z = z.type.defaultProps) === null || Z === void 0 ? void 0 : Z[o], ue = "hide" in z.props ? z.props.hide : (ne = z.type.defaultProps) === null || ne === void 0 ? void 0 : ne.hide;
            return oe === N && (I || !ue);
          }), _, i, l);
          te && (R = te);
        }
        p && (E === "number" || T !== "auto") && (F = ei(j, _, "category"));
      } else p ? R = vu(0, D) : u && u[N] && u[N].hasStack && E === "number" ? R = h === "expand" ? [0, 1] : LO(u[N].stackGroups, s, c) : R = IO(j, a.filter(function(z) {
        var Z = o in z.props ? z.props[o] : z.type.defaultProps[o], ne = "hide" in z.props ? z.props.hide : z.type.defaultProps.hide;
        return Z === N && (I || !ne);
      }), E, l, !0);
      if (E === "number")
        R = pp(f, R, N, i, O), Y && (R = Rh(Y, R, A));
      else if (E === "category" && Y) {
        var k = Y, W = R.every(function(z) {
          return k.indexOf(z) >= 0;
        });
        W && (R = k);
      }
    }
    return H(H({}, g), {}, se({}, N, H(H({}, v), {}, {
      axisType: i,
      domain: R,
      categoricalDomain: F,
      duplicateDomain: B,
      originalDomain: (m = v.domain) !== null && m !== void 0 ? m : $,
      isCategorical: p,
      layout: l
    })));
  }, {});
}, i7 = function(t, r) {
  var n = r.graphicalItems, a = r.Axis, i = r.axisType, o = r.axisIdKey, u = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.layout, f = t.children, h = As(t.data, {
    graphicalItems: n,
    dataStartIndex: s,
    dataEndIndex: c
  }), p = h.length, g = CO(l, i), y = -1;
  return n.reduce(function(m, v) {
    var E = v.type.defaultProps !== void 0 ? H(H({}, v.type.defaultProps), v.props) : v.props, _ = E[o], A = zS("number");
    if (!m[_]) {
      y++;
      var b;
      return g ? b = vu(0, p) : u && u[_] && u[_].hasStack ? (b = LO(u[_].stackGroups, s, c), b = pp(f, b, _, i)) : (b = Rh(A, IO(h, n.filter(function(T) {
        var O, I, N = o in T.props ? T.props[o] : (O = T.type.defaultProps) === null || O === void 0 ? void 0 : O[o], j = "hide" in T.props ? T.props.hide : (I = T.type.defaultProps) === null || I === void 0 ? void 0 : I.hide;
        return N === _ && !j;
      }), "number", l), a.defaultProps.allowDataOverflow), b = pp(f, b, _, i)), H(H({}, m), {}, se({}, _, H(H({
        axisType: i
      }, a.defaultProps), {}, {
        hide: !0,
        orientation: xt(e7, "".concat(i, ".").concat(y % 2), null),
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
}, o7 = function(t, r) {
  var n = r.axisType, a = n === void 0 ? "xAxis" : n, i = r.AxisComp, o = r.graphicalItems, u = r.stackGroups, s = r.dataStartIndex, c = r.dataEndIndex, l = t.children, f = "".concat(a, "Id"), h = jt(l, i), p = {};
  return h && h.length ? p = a7(t, {
    axes: h,
    graphicalItems: o,
    axisType: a,
    axisIdKey: f,
    stackGroups: u,
    dataStartIndex: s,
    dataEndIndex: c
  }) : o && o.length && (p = i7(t, {
    Axis: i,
    graphicalItems: o,
    axisType: a,
    axisIdKey: f,
    stackGroups: u,
    dataStartIndex: s,
    dataEndIndex: c
  })), p;
}, u7 = function(t) {
  var r = kr(t), n = mr(r, !1, !0);
  return {
    tooltipTicks: n,
    orderedTooltipTicks: e0(n, function(a) {
      return a.coordinate;
    }),
    tooltipAxis: r,
    tooltipAxisBandSize: iu(r, n)
  };
}, TT = function(t) {
  var r = t.children, n = t.defaultShowTooltip, a = At(r, ca), i = 0, o = 0;
  return t.data && t.data.length !== 0 && (o = t.data.length - 1), a && a.props && (a.props.startIndex >= 0 && (i = a.props.startIndex), a.props.endIndex >= 0 && (o = a.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: i,
    dataEndIndex: o,
    activeTooltipIndex: -1,
    isTooltipActive: !!n
  };
}, s7 = function(t) {
  return !t || !t.length ? !1 : t.some(function(r) {
    var n = vr(r && r.type);
    return n && n.indexOf("Bar") >= 0;
  });
}, _T = function(t) {
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
}, c7 = function(t, r) {
  var n = t.props, a = t.graphicalItems, i = t.xAxisMap, o = i === void 0 ? {} : i, u = t.yAxisMap, s = u === void 0 ? {} : u, c = n.width, l = n.height, f = n.children, h = n.margin || {}, p = At(f, ca), g = At(f, Ur), y = Object.keys(s).reduce(function(b, T) {
    var O = s[T], I = O.orientation;
    return !O.mirror && !O.hide ? H(H({}, b), {}, se({}, I, b[I] + O.width)) : b;
  }, {
    left: h.left || 0,
    right: h.right || 0
  }), m = Object.keys(o).reduce(function(b, T) {
    var O = o[T], I = O.orientation;
    return !O.mirror && !O.hide ? H(H({}, b), {}, se({}, I, xt(b, "".concat(I)) + O.height)) : b;
  }, {
    top: h.top || 0,
    bottom: h.bottom || 0
  }), v = H(H({}, m), y), E = v.bottom;
  p && (v.bottom += p.props.height || ca.defaultProps.height), g && r && (v = k4(v, a, n, r));
  var _ = c - v.left - v.right, A = l - v.top - v.bottom;
  return H(H({
    brushBottom: E
  }, v), {}, {
    // never return negative values for height and width
    width: Math.max(_, 0),
    height: Math.max(A, 0)
  });
}, l7 = function(t, r) {
  if (r === "xAxis")
    return t[r].width;
  if (r === "yAxis")
    return t[r].height;
}, GS = function(t) {
  var r = t.chartName, n = t.GraphicalChild, a = t.defaultTooltipEventType, i = a === void 0 ? "axis" : a, o = t.validateTooltipEventTypes, u = o === void 0 ? ["axis"] : o, s = t.axisComponents, c = t.legendContent, l = t.formatAxisMap, f = t.defaultProps, h = function(v, E) {
    var _ = E.graphicalItems, A = E.stackGroups, b = E.offset, T = E.updateId, O = E.dataStartIndex, I = E.dataEndIndex, N = v.barSize, j = v.layout, D = v.barGap, R = v.barCategoryGap, B = v.maxBarSize, F = _T(j), $ = F.numericAxisName, q = F.cateAxisName, Y = s7(_), Q = [];
    return _.forEach(function(te, k) {
      var W = As(v.data, {
        graphicalItems: [te],
        dataStartIndex: O,
        dataEndIndex: I
      }), z = te.type.defaultProps !== void 0 ? H(H({}, te.type.defaultProps), te.props) : te.props, Z = z.dataKey, ne = z.maxBarSize, oe = z["".concat($, "Id")], ue = z["".concat(q, "Id")], fe = {}, ce = s.reduce(function(Xr, cr) {
        var xs, ws, Ps = E["".concat(cr.axisType, "Map")], F0 = z["".concat(cr.axisType, "Id")];
        Ps && Ps[F0] || cr.axisType === "zAxis" || (process.env.NODE_ENV !== "production" ? vt(!1, "Specifying a(n) ".concat(cr.axisType, "Id requires a corresponding ").concat(
          cr.axisType,
          "Id on the targeted graphical component "
        ).concat((xs = te == null || (ws = te.type) === null || ws === void 0 ? void 0 : ws.displayName) !== null && xs !== void 0 ? xs : "")) : vt());
        var $0 = Ps[F0];
        return H(H({}, Xr), {}, se(se({}, cr.axisType, $0), "".concat(cr.axisType, "Ticks"), mr($0)));
      }, fe), G = ce[q], re = ce["".concat(q, "Ticks")], ie = A && A[oe] && A[oe].hasStack && G4(te, A[oe].stackGroups), M = vr(te.type).indexOf("Bar") >= 0, ye = iu(G, re), X = [], Pe = Y && M4({
        barSize: N,
        stackGroups: A,
        totalSize: l7(ce, q)
      });
      if (M) {
        var De, et, Cr = me(ne) ? B : ne, In = (De = (et = iu(G, re, !0)) !== null && et !== void 0 ? et : Cr) !== null && De !== void 0 ? De : 0;
        X = L4({
          barGap: D,
          barCategoryGap: R,
          bandSize: In !== ye ? In : ye,
          sizeList: Pe[ue],
          maxBarSize: Cr
        }), In !== ye && (X = X.map(function(Xr) {
          return H(H({}, Xr), {}, {
            position: H(H({}, Xr.position), {}, {
              offset: Xr.position.offset - In / 2
            })
          });
        }));
      }
      var ro = te && te.type && te.type.getComposedData;
      ro && Q.push({
        props: H(H({}, ro(H(H({}, ce), {}, {
          displayedData: W,
          props: v,
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
        }, $, ce[$]), q, ce[q]), "animationId", T)),
        childIndex: jN(te, v.children),
        item: te
      });
    }), Q;
  }, p = function(v, E) {
    var _ = v.props, A = v.dataStartIndex, b = v.dataEndIndex, T = v.updateId;
    if (!Dy({
      props: _
    }))
      return null;
    var O = _.children, I = _.layout, N = _.stackOffset, j = _.data, D = _.reverseStackOrder, R = _T(I), B = R.numericAxisName, F = R.cateAxisName, $ = jt(O, n), q = Y4(j, $, "".concat(B, "Id"), "".concat(F, "Id"), N, D), Y = s.reduce(function(z, Z) {
      var ne = "".concat(Z.axisType, "Map");
      return H(H({}, z), {}, se({}, ne, o7(_, H(H({}, Z), {}, {
        graphicalItems: $,
        stackGroups: Z.axisType === B && q,
        dataStartIndex: A,
        dataEndIndex: b
      }))));
    }, {}), Q = c7(H(H({}, Y), {}, {
      props: _,
      graphicalItems: $
    }), E?.legendBBox);
    Object.keys(Y).forEach(function(z) {
      Y[z] = l(_, Y[z], Q, z.replace("Map", ""), r);
    });
    var te = Y["".concat(F, "Map")], k = u7(te), W = h(_, H(H({}, Y), {}, {
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
    function v(E) {
      var _, A, b;
      return qU(this, v), b = zU(this, v, [E]), se(b, "eventEmitterSymbol", /* @__PURE__ */ Symbol("rechartsEventEmitter")), se(b, "accessibilityManager", new IU()), se(b, "handleLegendBBoxUpdate", function(T) {
        if (T) {
          var O = b.state, I = O.dataStartIndex, N = O.dataEndIndex, j = O.updateId;
          b.setState(H({
            legendBBox: T
          }, p({
            props: b.props,
            dataStartIndex: I,
            dataEndIndex: N,
            updateId: j
          }, H(H({}, b.state), {}, {
            legendBBox: T
          }))));
        }
      }), se(b, "handleReceiveSyncEvent", function(T, O, I) {
        if (b.props.syncId === T) {
          if (I === b.eventEmitterSymbol && typeof b.props.syncMethod != "function")
            return;
          b.applySyncEvent(O);
        }
      }), se(b, "handleBrushChange", function(T) {
        var O = T.startIndex, I = T.endIndex;
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
      }), se(b, "handleMouseEnter", function(T) {
        var O = b.getMouseInfo(T);
        if (O) {
          var I = H(H({}, O), {}, {
            isTooltipActive: !0
          });
          b.setState(I), b.triggerSyncEvent(I);
          var N = b.props.onMouseEnter;
          de(N) && N(I, T);
        }
      }), se(b, "triggeredAfterMouseMove", function(T) {
        var O = b.getMouseInfo(T), I = O ? H(H({}, O), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        b.setState(I), b.triggerSyncEvent(I);
        var N = b.props.onMouseMove;
        de(N) && N(I, T);
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
        var I = b.props.onMouseLeave;
        de(I) && I(O, T);
      }), se(b, "handleOuterEvent", function(T) {
        var O = BN(T), I = xt(b.props, "".concat(O));
        if (O && de(I)) {
          var N, j;
          /.*touch.*/i.test(O) ? j = b.getMouseInfo(T.changedTouches[0]) : j = b.getMouseInfo(T), I((N = j) !== null && N !== void 0 ? N : {}, T);
        }
      }), se(b, "handleClick", function(T) {
        var O = b.getMouseInfo(T);
        if (O) {
          var I = H(H({}, O), {}, {
            isTooltipActive: !0
          });
          b.setState(I), b.triggerSyncEvent(I);
          var N = b.props.onClick;
          de(N) && N(I, T);
        }
      }), se(b, "handleMouseDown", function(T) {
        var O = b.props.onMouseDown;
        if (de(O)) {
          var I = b.getMouseInfo(T);
          O(I, T);
        }
      }), se(b, "handleMouseUp", function(T) {
        var O = b.props.onMouseUp;
        if (de(O)) {
          var I = b.getMouseInfo(T);
          O(I, T);
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
          var I = b.getMouseInfo(T);
          O(I, T);
        }
      }), se(b, "handleContextMenu", function(T) {
        var O = b.props.onContextMenu;
        if (de(O)) {
          var I = b.getMouseInfo(T);
          O(I, T);
        }
      }), se(b, "triggerSyncEvent", function(T) {
        b.props.syncId !== void 0 && kd.emit(Bd, b.props.syncId, T, b.eventEmitterSymbol);
      }), se(b, "applySyncEvent", function(T) {
        var O = b.props, I = O.layout, N = O.syncMethod, j = b.state.updateId, D = T.dataStartIndex, R = T.dataEndIndex;
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
          }), W = Math.min(B, k.x + k.width), z = Math.min(F, k.y + k.height), Z = Q[$] && Q[$].value, ne = bp(b.state, b.props.data, $), oe = Q[$] ? {
            x: I === "horizontal" ? Q[$].coordinate : W,
            y: I === "horizontal" ? z : Q[$].coordinate
          } : YS;
          b.setState(H(H({}, T), {}, {
            activeLabel: Z,
            activeCoordinate: oe,
            activePayload: ne,
            activeTooltipIndex: $
          }));
        } else
          b.setState(T);
      }), se(b, "renderCursor", function(T) {
        var O, I = b.state, N = I.isTooltipActive, j = I.activeCoordinate, D = I.activePayload, R = I.offset, B = I.activeTooltipIndex, F = I.tooltipAxisBandSize, $ = b.getTooltipEventType(), q = (O = T.props.active) !== null && O !== void 0 ? O : N, Y = b.props.layout, Q = T.key || "_recharts-cursor";
        return /* @__PURE__ */ C.createElement(kU, {
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
      }), se(b, "renderPolarAxis", function(T, O, I) {
        var N = xt(T, "type.axisType"), j = xt(b.state, "".concat(N, "Map")), D = T.type.defaultProps, R = D !== void 0 ? H(H({}, D), T.props) : T.props, B = j && j[R["".concat(N, "Id")]];
        return /* @__PURE__ */ Ue(T, H(H({}, B), {}, {
          className: pe(N, B.className),
          key: T.key || "".concat(O, "-").concat(I),
          ticks: mr(B, !0)
        }));
      }), se(b, "renderPolarGrid", function(T) {
        var O = T.props, I = O.radialLines, N = O.polarAngles, j = O.polarRadius, D = b.state, R = D.radiusAxisMap, B = D.angleAxisMap, F = kr(R), $ = kr(B), q = $.cx, Y = $.cy, Q = $.innerRadius, te = $.outerRadius;
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
          radialLines: I
        });
      }), se(b, "renderLegend", function() {
        var T = b.state.formattedGraphicalItems, O = b.props, I = O.children, N = O.width, j = O.height, D = b.props.margin || {}, R = N - (D.left || 0) - (D.right || 0), B = wO({
          children: I,
          formattedGraphicalItems: T,
          legendWidth: R,
          legendContent: c
        });
        if (!B)
          return null;
        var F = B.item, $ = gT(B, BU);
        return /* @__PURE__ */ Ue(F, H(H({}, $), {}, {
          chartWidth: N,
          chartHeight: j,
          margin: D,
          onBBoxUpdate: b.handleLegendBBoxUpdate
        }));
      }), se(b, "renderTooltip", function() {
        var T, O = b.props, I = O.children, N = O.accessibilityLayer, j = At(I, yt);
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
        var O = b.props, I = O.margin, N = O.data, j = b.state, D = j.offset, R = j.dataStartIndex, B = j.dataEndIndex, F = j.updateId;
        return /* @__PURE__ */ Ue(T, {
          key: T.key || "_recharts-brush",
          onChange: bo(b.handleBrushChange, T.props.onChange),
          data: N,
          x: J(T.props.x) ? T.props.x : D.left,
          y: J(T.props.y) ? T.props.y : D.top + D.height + D.brushBottom - (I.bottom || 0),
          width: J(T.props.width) ? T.props.width : D.width,
          startIndex: R,
          endIndex: B,
          updateId: "brush-".concat(F)
        });
      }), se(b, "renderReferenceElement", function(T, O, I) {
        if (!T)
          return null;
        var N = b, j = N.clipPathId, D = b.state, R = D.xAxisMap, B = D.yAxisMap, F = D.offset, $ = T.type.defaultProps || {}, q = T.props, Y = q.xAxisId, Q = Y === void 0 ? $.xAxisId : Y, te = q.yAxisId, k = te === void 0 ? $.yAxisId : te;
        return /* @__PURE__ */ Ue(T, {
          key: T.key || "".concat(O, "-").concat(I),
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
        var O = T.item, I = T.activePoint, N = T.basePoint, j = T.childIndex, D = T.isRange, R = [], B = O.props.key, F = O.item.type.defaultProps !== void 0 ? H(H({}, O.item.type.defaultProps), O.item.props) : O.item.props, $ = F.activeDot, q = F.dataKey, Y = H(H({
          index: j,
          dataKey: q,
          cx: I.x,
          cy: I.y,
          r: 4,
          fill: x0(O.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: I.payload,
          value: I.value
        }, le($, !1)), Mo($));
        return R.push(v.renderActiveDot($, Y, "".concat(B, "-activePoint-").concat(j))), N ? R.push(v.renderActiveDot($, H(H({}, Y), {}, {
          cx: N.x,
          cy: N.y
        }), "".concat(B, "-basePoint-").concat(j))) : D && R.push(null), R;
      }), se(b, "renderGraphicChild", function(T, O, I) {
        var N = b.filterFormatItem(T, O, I);
        if (!N)
          return null;
        var j = b.getTooltipEventType(), D = b.state, R = D.isTooltipActive, B = D.tooltipAxis, F = D.activeTooltipIndex, $ = D.activeLabel, q = b.props.children, Y = At(q, yt), Q = N.props, te = Q.points, k = Q.isRange, W = Q.baseLine, z = N.item.type.defaultProps !== void 0 ? H(H({}, N.item.type.defaultProps), N.item.props) : N.item.props, Z = z.activeDot, ne = z.hide, oe = z.activeBar, ue = z.activeShape, fe = !!(!ne && R && Y && (Z || oe || ue)), ce = {};
        j !== "axis" && Y && Y.props.trigger === "click" ? ce = {
          onClick: bo(b.handleItemMouseEnter, T.props.onClick)
        } : j !== "axis" && (ce = {
          onMouseLeave: bo(b.handleItemMouseLeave, T.props.onMouseLeave),
          onMouseEnter: bo(b.handleItemMouseEnter, T.props.onMouseEnter)
        });
        var G = /* @__PURE__ */ Ue(T, H(H({}, N.props), ce));
        function re(cr) {
          return typeof B.dataKey == "function" ? B.dataKey(cr.payload) : null;
        }
        if (fe)
          if (F >= 0) {
            var ie, M;
            if (B.dataKey && !B.allowDuplicatedCategory) {
              var ye = typeof B.dataKey == "function" ? re : "payload.".concat(B.dataKey.toString());
              ie = Zd(te, ye, $), M = k && W && Zd(W, ye, $);
            } else
              ie = te?.[F], M = k && W && W[F];
            if (ue || oe) {
              var X = T.props.activeIndex !== void 0 ? T.props.activeIndex : F;
              return [/* @__PURE__ */ Ue(T, H(H(H({}, N.props), ce), {}, {
                activeIndex: X
              })), null, null];
            }
            if (!me(ie))
              return [G].concat(va(b.renderActivePoints({
                item: N,
                activePoint: ie,
                basePoint: M,
                childIndex: F,
                isRange: k
              })));
          } else {
            var Pe, De = (Pe = b.getItemByXY(b.state.activeCoordinate)) !== null && Pe !== void 0 ? Pe : {
              graphicalItem: G
            }, et = De.graphicalItem, Cr = et.item, In = Cr === void 0 ? T : Cr, ro = et.childIndex, Xr = H(H(H({}, N.props), ce), {}, {
              activeIndex: ro
            });
            return [/* @__PURE__ */ Ue(In, Xr), null, null];
          }
        return k ? [G, null, null] : [G, null];
      }), se(b, "renderCustomized", function(T, O, I) {
        return /* @__PURE__ */ Ue(T, H(H({
          key: "recharts-customized-".concat(I)
        }, b.props), b.state));
      }), se(b, "renderMap", {
        CartesianGrid: {
          handler: Oo,
          once: !0
        },
        ReferenceArea: {
          handler: b.renderReferenceElement
        },
        ReferenceLine: {
          handler: Oo
        },
        ReferenceDot: {
          handler: b.renderReferenceElement
        },
        XAxis: {
          handler: Oo
        },
        YAxis: {
          handler: Oo
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
      }), b.clipPathId = "".concat((_ = E.id) !== null && _ !== void 0 ? _ : Ki("recharts"), "-clip"), b.throttleTriggeredAfterMouseMove = wA(b.triggeredAfterMouseMove, (A = E.throttleDelay) !== null && A !== void 0 ? A : 1e3 / 60), b.state = {}, b;
    }
    return VU(v, m), YU(v, [{
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
        var _ = this.props, A = _.children, b = _.data, T = _.height, O = _.layout, I = At(A, yt);
        if (I) {
          var N = I.props.defaultIndex;
          if (!(typeof N != "number" || N < 0 || N > this.state.tooltipTicks.length - 1)) {
            var j = this.state.tooltipTicks[N] && this.state.tooltipTicks[N].value, D = bp(this.state, b, N, j), R = this.state.tooltipTicks[N].coordinate, B = (this.state.offset.top + T) / 2, F = O === "horizontal", $ = F ? {
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
        eh([At(_.children, yt)], [At(this.props.children, yt)]) || this.displayDefaultTooltip();
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
      value: function(_) {
        if (!this.container)
          return null;
        var A = this.container, b = A.getBoundingClientRect(), T = S6(b), O = {
          chartX: Math.round(_.pageX - T.left),
          chartY: Math.round(_.pageY - T.top)
        }, I = b.width / A.offsetWidth || 1, N = this.inRange(O.chartX, O.chartY, I);
        if (!N)
          return null;
        var j = this.state, D = j.xAxisMap, R = j.yAxisMap, B = this.getTooltipEventType(), F = ET(this.state, this.props.data, this.props.layout, N);
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
      value: function(_, A) {
        var b = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, T = this.props.layout, O = _ / b, I = A / b;
        if (T === "horizontal" || T === "vertical") {
          var N = this.state.offset, j = O >= N.left && O <= N.left + N.width && I >= N.top && I <= N.top + N.height;
          return j ? {
            x: O,
            y: I
          } : null;
        }
        var D = this.state, R = D.angleAxisMap, B = D.radiusAxisMap;
        if (R && B) {
          var F = kr(R);
          return T1({
            x: O,
            y: I
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
        var O = Mo(this.props, this.handleOuterEvent);
        return H(H({}, O), T);
      }
    }, {
      key: "addListener",
      value: function() {
        kd.on(Bd, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        kd.removeListener(Bd, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(_, A, b) {
        for (var T = this.state.formattedGraphicalItems, O = 0, I = T.length; O < I; O++) {
          var N = T[O];
          if (N.item === _ || N.props.key === _.key || A === vr(N.item.type) && b === N.childIndex)
            return N;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var _ = this.clipPathId, A = this.state.offset, b = A.left, T = A.top, O = A.height, I = A.width;
        return /* @__PURE__ */ C.createElement("defs", null, /* @__PURE__ */ C.createElement("clipPath", {
          id: _
        }, /* @__PURE__ */ C.createElement("rect", {
          x: b,
          y: T,
          height: O,
          width: I
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var _ = this.state.xAxisMap;
        return _ ? Object.entries(_).reduce(function(A, b) {
          var T = bT(b, 2), O = T[0], I = T[1];
          return H(H({}, A), {}, se({}, O, I.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var _ = this.state.yAxisMap;
        return _ ? Object.entries(_).reduce(function(A, b) {
          var T = bT(b, 2), O = T[0], I = T[1];
          return H(H({}, A), {}, se({}, O, I.scale));
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
          for (var O = 0, I = b.length; O < I; O++) {
            var N = b[O], j = N.props, D = N.item, R = D.type.defaultProps !== void 0 ? H(H({}, D.type.defaultProps), D.props) : D.props, B = vr(D.type);
            if (B === "Bar") {
              var F = (j.data || []).find(function(Q) {
                return QB(_, Q);
              });
              if (F)
                return {
                  graphicalItem: N,
                  payload: F
                };
            } else if (B === "RadialBar") {
              var $ = (j.data || []).find(function(Q) {
                return T1(_, Q);
              });
              if ($)
                return {
                  graphicalItem: N,
                  payload: $
                };
            } else if (ys(N, T) || bs(N, T) || Bi(N, T)) {
              var q = EF({
                graphicalItem: N,
                activeTooltipItem: T,
                itemData: R.data
              }), Y = R.activeIndex === void 0 ? q : R.activeIndex;
              return {
                graphicalItem: H(H({}, N), {}, {
                  childIndex: Y
                }),
                payload: Bi(N, T) ? R.data[q] : N.props.data[q]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var _ = this;
        if (!Dy(this))
          return null;
        var A = this.props, b = A.children, T = A.className, O = A.width, I = A.height, N = A.style, j = A.compact, D = A.title, R = A.desc, B = gT(A, jU), F = le(B, !1);
        if (j)
          return /* @__PURE__ */ C.createElement(tT, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ C.createElement(rh, Un({}, F, {
            width: O,
            height: I,
            title: D,
            desc: R
          }), this.renderClipPath(), Ly(b, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var $, q;
          F.tabIndex = ($ = this.props.tabIndex) !== null && $ !== void 0 ? $ : 0, F.role = (q = this.props.role) !== null && q !== void 0 ? q : "application", F.onKeyDown = function(Q) {
            _.accessibilityManager.keyboardEvent(Q);
          }, F.onFocus = function() {
            _.accessibilityManager.focus();
          };
        }
        var Y = this.parseEventsOfWrapper();
        return /* @__PURE__ */ C.createElement(tT, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ C.createElement("div", Un({
          className: pe("recharts-wrapper", T),
          style: H({
            position: "relative",
            cursor: "default",
            width: O,
            height: I
          }, N)
        }, Y, {
          ref: function(te) {
            _.container = te;
          }
        }), /* @__PURE__ */ C.createElement(rh, Un({}, F, {
          width: O,
          height: I,
          title: D,
          desc: R,
          style: t7
        }), this.renderClipPath(), Ly(b, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  })(IT);
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
  }, f)), se(g, "getDerivedStateFromProps", function(m, v) {
    var E = m.dataKey, _ = m.data, A = m.children, b = m.width, T = m.height, O = m.layout, I = m.stackOffset, N = m.margin, j = v.dataStartIndex, D = v.dataEndIndex;
    if (v.updateId === void 0) {
      var R = TT(m);
      return H(H(H({}, R), {}, {
        updateId: 0
      }, p(H(H({
        props: m
      }, R), {}, {
        updateId: 0
      }), v)), {}, {
        prevDataKey: E,
        prevData: _,
        prevWidth: b,
        prevHeight: T,
        prevLayout: O,
        prevStackOffset: I,
        prevMargin: N,
        prevChildren: A
      });
    }
    if (E !== v.prevDataKey || _ !== v.prevData || b !== v.prevWidth || T !== v.prevHeight || O !== v.prevLayout || I !== v.prevStackOffset || !qn(N, v.prevMargin)) {
      var B = TT(m), F = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: v.chartX,
        chartY: v.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: v.isTooltipActive
      }, $ = H(H({}, ET(v, _, O)), {}, {
        updateId: v.updateId + 1
      }), q = H(H(H({}, B), F), $);
      return H(H(H({}, q), p(H({
        props: m
      }, q), v)), {}, {
        prevDataKey: E,
        prevData: _,
        prevWidth: b,
        prevHeight: T,
        prevLayout: O,
        prevStackOffset: I,
        prevMargin: N,
        prevChildren: A
      });
    }
    if (!eh(A, v.prevChildren)) {
      var Y, Q, te, k, W = At(A, ca), z = W && (Y = (Q = W.props) === null || Q === void 0 ? void 0 : Q.startIndex) !== null && Y !== void 0 ? Y : j, Z = W && (te = (k = W.props) === null || k === void 0 ? void 0 : k.endIndex) !== null && te !== void 0 ? te : D, ne = z !== j || Z !== D, oe = !me(_), ue = oe && !ne ? v.updateId : v.updateId + 1;
      return H(H({
        updateId: ue
      }, p(H(H({
        props: m
      }, v), {}, {
        updateId: ue,
        dataStartIndex: z,
        dataEndIndex: Z
      }), v)), {}, {
        prevChildren: A,
        dataStartIndex: z,
        dataEndIndex: Z
      });
    }
    return null;
  }), se(g, "renderActiveDot", function(m, v, E) {
    var _;
    return /* @__PURE__ */ Lt(m) ? _ = /* @__PURE__ */ Ue(m, v) : de(m) ? _ = m(v) : _ = /* @__PURE__ */ C.createElement(I0, v), /* @__PURE__ */ C.createElement(Oe, {
      className: "recharts-active-dot",
      key: E
    }, _);
  });
  var y = /* @__PURE__ */ PT(function(v, E) {
    return /* @__PURE__ */ C.createElement(g, Un({}, v, {
      ref: E
    }));
  });
  return y.displayName = g.displayName, y;
}, Os = GS({
  chartName: "BarChart",
  GraphicalChild: sr,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: wn
  }, {
    axisType: "yAxis",
    AxisComp: Pn
  }],
  formatAxisMap: A9
}), f7 = GS({
  chartName: "PieChart",
  GraphicalChild: Ir,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: ms
  }, {
    axisType: "radiusAxis",
    AxisComp: hs
  }],
  formatAxisMap: n8,
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
const d7 = "funding", h7 = ["Source", "Grants", "Total (GBP)"], p7 = [32, 10, 18], m7 = ["text", "number", "currency"], zn = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0
});
function bH({ content: e, block: t }) {
  const r = _n(d7), { members: n, activeLabel: a } = Yr(e), i = e?.title || "Funding received", o = b7(n), u = o.reduce((c, l) => c + l.total, 0);
  ct(
    t,
    "xlsx",
    r && o.length > 0 ? {
      title: "Funding",
      headers: h7,
      data: o.map(({ source: c, count: l, total: f }) => [c, l, f]),
      columnWidths: p7,
      numberFormats: m7,
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
      /* @__PURE__ */ ee(Ea, { widths: [55, 15, 30], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ ee(rt, { header: !0, children: [
          /* @__PURE__ */ P(he, { children: "Source" }),
          /* @__PURE__ */ P(he, { children: "Grants" }),
          /* @__PURE__ */ P(he, { children: "Total (GBP)" })
        ] }),
        o.map(({ source: c, count: l, total: f }, h) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { children: c }),
          /* @__PURE__ */ P(he, { children: String(l) }),
          /* @__PURE__ */ P(he, { children: zn.format(f) })
        ] }, h)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { emphasis: !0, children: "Total" }),
          /* @__PURE__ */ P(he, { emphasis: !0, children: String(s) }),
          /* @__PURE__ */ P(he, { emphasis: !0, children: zn.format(u) })
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
        /* @__PURE__ */ P("strong", { children: zn.format(u) }),
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
      /* @__PURE__ */ P(y7, { rows: o })
    ] })
  ] }) : null;
}
function y7({ rows: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((i) => ({ name: i.source, total: i.total })), a = Math.max(240, n.length * 56);
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Xi, { width: "100%", height: a, children: /* @__PURE__ */ ee(
    Os,
    {
      data: n,
      layout: "vertical",
      margin: { top: 8, right: 80, bottom: 8, left: 16 },
      children: [
        /* @__PURE__ */ P(to, { strokeDasharray: "3 3", stroke: "var(--border)" }),
        /* @__PURE__ */ P(
          wn,
          {
            type: "number",
            tickFormatter: (i) => zn.format(i),
            tick: { fontSize: 11 }
          }
        ),
        /* @__PURE__ */ P(
          Pn,
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
            formatter: (i) => zn.format(i),
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
            formatter: (i) => zn.format(i)
          }
        ) })
      ]
    }
  ) }) });
}
function b7(e) {
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
const g7 = "members", Fd = ["Name", "Rank", "Department", "Tenured", "Start year"], v7 = [28, 14, 18, 10, 12], E7 = ["text", "text", "text", "text", "number"];
function gH({ content: e, block: t }) {
  const r = _n(g7), { members: n, activeLabel: a } = Yr(e), i = e?.title || "Members", o = [...n].sort((s, c) => {
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
      headers: Fd,
      data: u,
      columnWidths: v7,
      numberFormats: E7
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
      /* @__PURE__ */ ee(Ea, { widths: [32, 16, 22, 12, 18], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ P(rt, { header: !0, children: Fd.map((s) => /* @__PURE__ */ P(he, { children: s }, s)) }),
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
      /* @__PURE__ */ P("thead", { children: /* @__PURE__ */ P("tr", { children: Fd.map((s) => /* @__PURE__ */ P("th", { children: s }, s)) }) }),
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
function Ss(e, t = {}) {
  const { dateRange: r, refereedOnly: n } = t, a = r?.start != null ? Number(r.start) : null, i = r?.end != null && r.end !== "" ? Number(r.end) : null;
  return Array.isArray(e) ? e.filter((o) => {
    if (n && o?.refereed !== !0) return !1;
    if (a == null && i == null) return !0;
    const u = Number(o?.year);
    return !(!Number.isFinite(u) || a != null && u < a || i != null && u > i);
  }) : [];
}
function T7(e, t = {}) {
  if (!Array.isArray(e)) return [];
  const r = [];
  for (const n of e) {
    const a = Ss(n?.publications, t);
    for (const i of a)
      r.push({ ...i, _author: n?.name || n?.slug || "Unknown" });
  }
  return r;
}
const _7 = "publications-by-journal", A7 = 10, O7 = ["Venue", "Count"], S7 = [48, 10], x7 = ["text", "number"];
function vH({ content: e, block: t }) {
  const r = _n(_7), { members: n, activeLabel: a } = Yr(e), [i] = Yi(), o = e?.title || "Publications by journal", u = P7(n, A7, i);
  ct(
    t,
    "xlsx",
    r && u.length > 0 ? {
      title: "Publications by Journal",
      headers: O7,
      data: u.map(({ venue: c, count: l }) => [c, l]),
      columnWidths: S7,
      numberFormats: x7,
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
      /* @__PURE__ */ ee(Ea, { widths: [82, 18], borderColor: "cbd5e1", children: [
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
    u.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No publications in the selected population." }) : /* @__PURE__ */ P(w7, { counts: u })
  ] }) : null;
}
function w7({ counts: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((i) => ({ name: i.venue, value: i.count })), a = Math.max(240, n.length * 44);
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Xi, { width: "100%", height: a, children: /* @__PURE__ */ ee(
    Os,
    {
      data: n,
      layout: "vertical",
      margin: { top: 8, right: 32, bottom: 8, left: 16 },
      children: [
        /* @__PURE__ */ P(to, { strokeDasharray: "3 3", stroke: "var(--border)" }),
        /* @__PURE__ */ P(wn, { type: "number", allowDecimals: !1 }),
        /* @__PURE__ */ P(
          Pn,
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
function P7(e, t, r) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = Ss(a.publications, r);
    for (const o of i) {
      const u = (o.journal || o.publisher || "Unknown").trim();
      u && n.set(u, (n.get(u) || 0) + 1);
    }
  }
  return [...n.entries()].map(([a, i]) => ({ venue: a, count: i })).sort((a, i) => i.count - a.count || a.venue.localeCompare(i.venue)).slice(0, t);
}
const I7 = "publications-by-type", AT = [
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
], C7 = ["Publication type", "Count"], N7 = [24, 10], R7 = ["text", "number"];
function EH({ content: e, block: t }) {
  const r = _n(I7), { members: n, activeLabel: a } = Yr(e), [i] = Yi(), o = e?.title || "Publications by type", u = M7(n, i);
  ct(
    t,
    "xlsx",
    r && u.length > 0 ? {
      title: "Publications by Type",
      headers: C7,
      data: u.map(({ type: c, count: l }) => [gp(c), l]),
      columnWidths: N7,
      numberFormats: R7,
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
      /* @__PURE__ */ ee(Ea, { widths: [70, 30], borderColor: "cbd5e1", children: [
        /* @__PURE__ */ ee(rt, { header: !0, children: [
          /* @__PURE__ */ P(he, { children: "Publication type" }),
          /* @__PURE__ */ P(he, { children: "Count" })
        ] }),
        u.map(({ type: c, count: l }, f) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { children: gp(c) }),
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
    u.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No publications for the selected population." }) : /* @__PURE__ */ P(D7, { counts: u })
  ] }) : null;
}
function D7({ counts: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map(({ type: a, count: i }) => ({
    name: gp(a),
    value: i
  }));
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Xi, { width: "100%", height: 320, children: /* @__PURE__ */ ee(f7, { children: [
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
        children: n.map((a, i) => /* @__PURE__ */ P(Zu, { fill: AT[i % AT.length] }, i))
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
      Ur,
      {
        verticalAlign: "bottom",
        height: 36,
        wrapperStyle: { fontSize: "0.875rem" }
      }
    )
  ] }) }) });
}
function M7(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = Ss(n.publications, t);
    for (const i of a) {
      const o = (i.type || "other").toLowerCase();
      r.set(o, (r.get(o) || 0) + 1);
    }
  }
  return [...r.entries()].map(([n, a]) => ({ type: n, count: a })).sort((n, a) => a.count - n.count);
}
function gp(e) {
  return String(e).charAt(0).toUpperCase() + String(e).slice(1);
}
const L7 = "publications-by-year", k7 = ["Year", "Count", "Cumulative"], B7 = [10, 10, 12], j7 = ["number", "number", "number"];
function TH({ content: e, block: t }) {
  const r = _n(L7), { members: n, activeLabel: a } = Yr(e), [i] = Yi(), o = e?.title || "Publications by year", { series: u, total: s } = $7(n, i);
  return ct(
    t,
    "xlsx",
    r && u.length > 0 ? {
      title: "Publications by Year",
      headers: k7,
      data: u.map((c) => [c.year, c.count, c.cumulative]),
      columnWidths: B7,
      numberFormats: j7,
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
      /* @__PURE__ */ ee(Ea, { widths: [30, 35, 35], borderColor: "cbd5e1", children: [
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
    u.length === 0 ? /* @__PURE__ */ P("p", { className: "chart-empty", children: "No publications in the selected population." }) : /* @__PURE__ */ P(F7, { series: u })
  ] }) : null;
}
function F7({ series: e }) {
  const [t, r] = ft(!1);
  if (Et(() => {
    r(!0);
  }, []), !t)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const n = e.map((a) => ({ year: String(a.year), value: a.count }));
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Xi, { width: "100%", height: 320, children: /* @__PURE__ */ ee(Os, { data: n, margin: { top: 16, right: 16, bottom: 16, left: 0 }, children: [
    /* @__PURE__ */ P(to, { strokeDasharray: "3 3", stroke: "var(--border)" }),
    /* @__PURE__ */ P(wn, { dataKey: "year", tick: { fontSize: 12 } }),
    /* @__PURE__ */ P(Pn, { allowDecimals: !1 }),
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
function $7(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (const i of e) {
    const o = Ss(i.publications, t);
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
function U7(e) {
  const t = String(e || "").trim().split(/\s+/);
  if (t.length === 0) return { family: "Unknown", given: "" };
  if (t.length === 1) return { family: t[0], given: "" };
  const r = t[t.length - 1], n = t.slice(0, -1).join(" ");
  return { family: r, given: n };
}
function H7(e, { defaultAuthor: t } = {}) {
  if (!e) return null;
  const r = e.authors && e.authors.length ? e.authors : t ? [t] : [{ family: "Unknown", given: "" }], n = {
    id: e.id || `${(e.title || "pub").slice(0, 24)}-${e.year || "xx"}`,
    type: e.type || "book",
    title: e.title || "",
    author: r
  };
  return e.year != null && (n.issued = { "date-parts": [[Number(e.year) || e.year]] }), e.journal && (n["container-title"] = e.journal), e.publisher && (n.publisher = e.publisher), e.DOI && (n.DOI = e.DOI), n;
}
function q7(e) {
  return Array.isArray(e) ? e.map((t) => {
    const r = t._author ? U7(t._author) : void 0;
    return H7(t, { defaultAuthor: r });
  }).filter(Boolean) : [];
}
const W7 = "publications-list", OT = {
  apa: () => import("./apa-DFWazoZc.js"),
  mla: () => import("./mla-D135I5OW.js"),
  "chicago-author-date": () => import("./chicago-author-date-D8QH1iwN.js"),
  ieee: () => import("./ieee-CHRt3McI.js"),
  vancouver: () => import("./vancouver-C_ZYAEtz.js"),
  harvard: () => import("./harvard-fzOIiT6h.js"),
  nature: () => import("./nature-BgGht0BR.js")
}, $d = /* @__PURE__ */ new Map();
async function Y7(e) {
  if ($d.has(e)) return $d.get(e);
  const t = OT[e] || OT.apa, [{ formatAll: r }, n] = await Promise.all([
    import("./index-CxzhyvpC.js"),
    t()
  ]), a = { formatAll: r, style: n };
  return $d.set(e, a), a;
}
function _H({ content: e, block: t }) {
  const r = _n(W7), { members: n, activeLabel: a } = Yr(e), [i] = Yi(), o = e?.title || "Publications", u = [...T7(n, i)].sort((y, m) => {
    const v = Number(y.year) || 0;
    return (Number(m.year) || 0) - v;
  }), s = q7(u), c = s.map((y) => y.id).join("|"), [l, f] = ft({ loading: !0, entries: [] });
  Et(() => {
    let y = !1;
    if (!r || s.length === 0) {
      f({ loading: !1, entries: [] });
      return;
    }
    return Y7(i.citationStyle).then(({ formatAll: m, style: v }) => {
      if (!y)
        try {
          f({ loading: !1, entries: m(v, s) });
        } catch (E) {
          console.error("PublicationsList: formatAll failed", E), y || f({ loading: !1, entries: [] });
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
        const v = u[m];
        return [
          Number(v?.year) || null,
          v?._author || "",
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
        OC,
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
const z7 = "supervisions", ST = ["#1e40af", "#0f766e", "#ea580c", "#9333ea", "#be123c", "#0ea5e9"];
function AH({ content: e, block: t }) {
  const r = _n(z7), { members: n, activeLabel: a } = Yr(e), i = e?.title || "Supervisions", { levels: o, rows: u, grandTotal: s } = K7(n), c = ["Member", ...o.map(vp), "Total"], l = u.map((E) => [
    E.member,
    ...o.map((_) => E.counts[_] || 0),
    E.total
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
    (E) => u.reduce((_, A) => _ + (A.counts[E] || 0), 0)
  ), v = u.reduce((E, _) => E + _.total, 0);
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
      /* @__PURE__ */ ee(Ea, { widths: y, borderColor: "cbd5e1", children: [
        /* @__PURE__ */ P(rt, { header: !0, children: c.map((E) => /* @__PURE__ */ P(he, { children: E }, E)) }),
        u.map((E, _) => /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { children: E.member }),
          o.map((A) => /* @__PURE__ */ P(he, { children: String(E.counts[A] || 0) }, A)),
          /* @__PURE__ */ P(he, { children: String(E.total) })
        ] }, _)),
        /* @__PURE__ */ ee(rt, { children: [
          /* @__PURE__ */ P(he, { emphasis: !0, children: "Total" }),
          m.map((E, _) => /* @__PURE__ */ P(he, { emphasis: !0, children: String(E) }, _)),
          /* @__PURE__ */ P(he, { emphasis: !0, children: String(v) })
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
      /* @__PURE__ */ P(G7, { rows: u, levels: o })
    ] })
  ] }) : null;
}
function G7({ rows: e, levels: t }) {
  const [r, n] = ft(!1);
  if (Et(() => {
    n(!0);
  }, []), !r)
    return /* @__PURE__ */ P("div", { className: "chart-container chart-container-placeholder" });
  const a = e.map((i) => {
    const o = { name: V7(i.member) };
    for (const u of t) o[vp(u)] = i.counts[u] || 0;
    return o;
  });
  return /* @__PURE__ */ P("div", { className: "chart-container", children: /* @__PURE__ */ P(Xi, { width: "100%", height: 320, children: /* @__PURE__ */ ee(Os, { data: a, margin: { top: 16, right: 24, bottom: 16, left: 0 }, children: [
    /* @__PURE__ */ P(to, { strokeDasharray: "3 3", stroke: "var(--border)" }),
    /* @__PURE__ */ P(wn, { dataKey: "name", tick: { fontSize: 12 } }),
    /* @__PURE__ */ P(Pn, { allowDecimals: !1 }),
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
    /* @__PURE__ */ P(Ur, { wrapperStyle: { fontSize: "0.875rem" } }),
    t.map((i, o) => /* @__PURE__ */ P(
      sr,
      {
        dataKey: vp(i),
        stackId: "supervision",
        fill: ST[o % ST.length],
        radius: o === t.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]
      },
      i
    ))
  ] }) }) });
}
function K7(e) {
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
function vp(e) {
  return String(e).charAt(0).toUpperCase() + String(e).slice(1);
}
function V7(e) {
  const t = String(e).trim().split(/\s+/);
  return t.length <= 1 ? e : `${t[0][0]}. ${t[t.length - 1]}`;
}
function X7({ queries: e = [] }) {
  const [t, r] = Rp(), [, n] = Dp(), a = (i) => {
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
          /* @__PURE__ */ P("option", { value: w_, children: "All members" }),
          e.map((i) => /* @__PURE__ */ P("option", { value: i.slug, children: i.name || i.slug }, i.slug))
        ]
      }
    )
  ] });
}
const Q7 = "members";
function Z7() {
  const e = SC(Q7), [, t] = Rp(), [r, n] = Dp(), [a, i] = ft(() => wT(r, e));
  if (Et(() => {
    i(wT(r, e));
  }, [e]), !e) return null;
  const o = (c, l) => {
    const f = { ...a, [c]: l };
    i(f);
    const h = eH(f, e);
    n(h), h && t(w_);
  }, u = () => {
    i({}), n(null);
  }, s = r && Object.keys(r).length > 0;
  return /* @__PURE__ */ ee("fieldset", { className: "filter-panel", children: [
    /* @__PURE__ */ P("legend", { className: "filter-panel-legend", children: "Filter members" }),
    Object.entries(e).map(([c, l]) => /* @__PURE__ */ P(
      J7,
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
function J7({ field: e, def: t, value: r, onChange: n }) {
  const a = t?.label || e;
  switch (t?.type) {
    case "enum":
      return /* @__PURE__ */ P(So, { label: a, field: e, children: /* @__PURE__ */ ee(
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
      return /* @__PURE__ */ P(So, { label: a, field: e, children: /* @__PURE__ */ ee(
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
      return /* @__PURE__ */ P(So, { label: a, field: e, children: /* @__PURE__ */ ee("div", { className: "filter-range", children: [
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
              n(xT(r, "min", o));
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
              n(xT(r, "max", o));
            }
          }
        )
      ] }) });
    case "text":
      return /* @__PURE__ */ P(So, { label: a, field: e, children: /* @__PURE__ */ P(
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
function So({ label: e, field: t, children: r }) {
  return /* @__PURE__ */ ee("div", { className: "filter-row", children: [
    /* @__PURE__ */ P("label", { className: "filter-label", htmlFor: `filter-${t}`, children: e }),
    r
  ] });
}
function xT(e, t, r) {
  const n = { ...e || {} };
  return r === void 0 ? delete n[t] : n[t] = r, Object.keys(n).length === 0 ? void 0 : n;
}
function eH(e, t) {
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
function wT(e, t) {
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
function tH() {
  const [e, t] = Yi(), { dateRange: r, refereedOnly: n, citationStyle: a } = e, i = (c) => {
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
            children: CC.map((c) => /* @__PURE__ */ P("option", { value: c.value, children: c.label }, c.value))
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
function rH() {
  const [e, t] = MC(), r = new Set(e);
  return /* @__PURE__ */ ee("fieldset", { className: "section-toggles", children: [
    /* @__PURE__ */ P("legend", { className: "section-toggles-legend", children: "Sections" }),
    /* @__PURE__ */ P("div", { className: "section-toggles-list", children: wC.map((n) => /* @__PURE__ */ ee("label", { className: "section-toggles-item", children: [
      /* @__PURE__ */ P(
        "input",
        {
          type: "checkbox",
          checked: !r.has(n),
          onChange: () => t(n)
        }
      ),
      /* @__PURE__ */ P("span", { children: IC(n) })
    ] }, n)) })
  ] });
}
function nH() {
  const { data: e } = S_({ path: "/data/queries.json", schema: "queries" }), t = Array.isArray(e) ? e : [];
  return /* @__PURE__ */ ee("div", { className: "w-[min(32rem,calc(100vw-3rem))] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-xl flex flex-col gap-4", children: [
    /* @__PURE__ */ P(X7, { queries: t }),
    /* @__PURE__ */ P(Z7, {}),
    /* @__PURE__ */ P(tH, {}),
    /* @__PURE__ */ P(rH, {})
  ] });
}
function aH() {
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
function iH() {
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
function oH() {
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
function uH({
  title: e = "Academic Metrics",
  filename: t = "academic-metrics"
}) {
  const { website: r } = Fu(), [n, a] = ft(null), [i, o] = ft(null), [u, s] = ft(!1), [c, l] = ft(!1), f = ii(null);
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
      const y = await hC(r, {
        format: g,
        foundation: Yd,
        title: e
      }), m = Yd.outputs?.[g]?.extension || g;
      lC(y, `${t}.${m}`);
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
                /* @__PURE__ */ P(aH, {}),
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
                  /* @__PURE__ */ P(iH, {}),
                  "Download",
                  /* @__PURE__ */ P(oH, {})
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
        u && /* @__PURE__ */ P(nH, {}),
        n && /* @__PURE__ */ P("p", { className: "max-w-xs rounded bg-error-subtle px-3 py-1 text-xs text-error", children: n })
      ]
    }
  );
}
function sH({ body: e, page: t }) {
  const { website: r } = Fu(), n = t?.title || "Academic Metrics", a = (t?.title || "academic-metrics").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return Et(() => DC(t), [t]), /* @__PURE__ */ ee(KT, { basePath: r.basePath, children: [
    /* @__PURE__ */ P("main", { className: "metrics-body mx-auto max-w-5xl px-6 pb-16", children: /* @__PURE__ */ P("div", { className: "metrics-report", children: e }) }),
    /* @__PURE__ */ P(uH, { title: n, filename: a })
  ] });
}
const cH = { ...Yd, layouts: { MetricsLayout: sH } }, lH = {}, fH = {}, OH = { meta: lH, capabilities: cH, layoutMeta: fH };
export {
  yH as C,
  gr as D,
  bH as F,
  gH as M,
  vH as P,
  AH as S,
  OH as _,
  bw as a,
  EH as b,
  uo as c,
  TH as d,
  _H as e,
  hC as f,
  xe as g,
  bm as h,
  KI as p,
  ui as r
};
//# sourceMappingURL=_entry.generated-CFN7zKRa.js.map
