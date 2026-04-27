import { jsx as E, jsxs as C, Fragment as Ne } from "react/jsx-runtime";
import { createContext as _t, useContext as At, useMemo as _e, createElement as kt, useState as ot, useEffect as gt, useReducer as ua, Children as ra, isValidElement as aa, cloneElement as na, Fragment as dt, useRef as sa } from "react";
import { renderToStaticMarkup as Jt } from "react-dom/server";
import { getUniweb as Zu, deriveCacheKey as ia } from "@uniweb/core";
const er = /\s+/, oa = /([+\-*\/=<>!&|]+)/, du = {
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
function De(e, t, u = {}) {
  const r = Object.keys(t), n = u.minQuoteLevel || 0, s = u.splitText || !1;
  u.skipCommas;
  const i = [];
  let l = 0, f = "", m = !1, h = "", _ = [], g = "", N = 0;
  const L = ["'", '"', "`", "‘", "’", "“", "”"], M = (D, $) => D === $ ? !0 : ["‘", "’"].includes(D) && ["‘", "’"].includes($) || ["“", "”"].includes(D) && ["“", "”"].includes($);
  function x(D, $) {
    if (s && D == "text") {
      const ue = $.trim().split(er);
      for (let z of ue)
        z = la(z), z !== "" && i.push({ type: D, value: z });
    } else
      i.push({ type: D, value: $ });
    f = "";
  }
  function R(D) {
    N === 0 ? (f !== "" && x("text", f), f = D) : f += D;
  }
  for (; l < e.length; ) {
    const D = e[l];
    r.includes(D) && !m ? (R(D), N = _.push(D), g = t[D]) : D === g && !m ? (f += D, _.pop(), N--, g = N > 0 ? t[_[N - 1]] : "", N === 0 && x("enclosure", f)) : !m && L.includes(D) && N > n ? (R(D), m = !0, h = D) : m && M(h, D) ? (f += D, m = !1, N === 0 && x("quote", f)) : f += D, l++;
  }
  return f !== "" && x("text", f), i;
}
function ca(e) {
  let t = 0, u = "", r = "", n = !1;
  const s = /* @__PURE__ */ new Map();
  function i(f, m) {
    s.set(r, { type: f, value: m }), n = !1, u = "";
  }
  function l(f) {
    s.set(f, { type: "text", value: !0 }), n = !0, r = f, u = "";
  }
  for (; t < e.length; ) {
    const f = e[t];
    if (f.type == "text" && f.value !== ":") {
      const m = f.value.split(":");
      m.length === 1 ? u += f.value : n ? (u += m[0], i("text", u), u = m[1] ?? "") : (u += m[0], r = u, l(r), u = m[1] ?? "");
    } else
      u !== "" && (n ? i("text", u) : l(u)), n && f.value !== ":" ? i(f.type, f.value) : f.type == "quote" ? (r = f, l(r)) : f.value !== ":" && console.warn(`Unexpected key: ${f.value} type: ${f.type}`);
    u !== "" && (n ? i("text", u) : l(u)), t++;
  }
  return s;
}
function tr(e, t = []) {
  if (typeof e != "string")
    return e instanceof Object ? { ...e } : {};
  const u = De(e, { "{": "}", "(": ")" }, { minQuoteLevel: 1 }), r = {};
  function n(s, i, l) {
    const f = `Invalid ${s} for snippet: ${l}. Expecting: ${i}`;
    t.push(f), console.error(f);
  }
  u.length <= 1 && n("input", "[name arg ...] { ... }", e);
  for (let s = 1; s < u.length; s += 2) {
    const i = u[s - 1].value.trim(), l = u[s].type === "enclosure" ? u[s].value[0] : "", f = l == "{" || l == "(" ? u[s].value.slice(1, -1).trim() : "";
    if (i.length < 3 || !i.startsWith("[") || !i.endsWith("]"))
      n("header", "[ ... ]", i);
    else if (!f)
      n("empty body", "{ ... }", i);
    else {
      const m = i.slice(1, -1).trim().split(er), h = m.shift(), _ = m[0] === "$0";
      _ && m.shift(), !h || !/^[a-zA-Z_]\w*$/.test(h) ? n("name", "word", m.join(" ")) : m.every((g) => /^(\.\.\.)?[a-zA-Z_]\w*$/.test(g)) ? r[h] = { args: m, body: f, isText: l == "{", hasFlags: _ } : n("arguments", "words", m.join(" "));
    }
  }
  return r;
}
function la(e) {
  let t = 0, u = e.length - 1;
  for (; t <= u && e[t] === ","; )
    t++;
  for (; u >= t && e[u] === ","; )
    u--;
  return e.slice(t, u + 1);
}
function da(e) {
  const t = [];
  let u, r, n;
  for (let s of e)
    if (s.type === "text")
      if (u = s.value.split(oa), u.length <= 1)
        t.push(s);
      else
        for (let i = 0; i < u.length; i++)
          r = u[i].trim(), r !== "" && (n = "+-*/=<>!&|".includes(r[0]), r === "!" && t.push({ type: "text", value: "" }), t.push({ type: "text", value: r, isOperator: n }));
    else
      t.push(s);
  return t;
}
function fa(e) {
  const t = [];
  let u = 0, r = !1, n = [];
  for (; u < e.length; ) {
    const s = e[u], i = e[u + 1];
    i && i.isOperator ? (r || (r = !0, n = []), n.push(s, i), u += 2) : (r ? (r = !1, n.push(s), t.push({ type: "chain", tokens: n })) : t.push(s), u++);
  }
  return r && t.push({ type: "chain", tokens: n }), t;
}
function ha(e) {
  const t = [], u = [];
  let r, n, s;
  for (let i of e)
    if (!i.isOperator)
      t.push(i.value);
    else {
      for (; u.length > 0 && du[u[u.length - 1]] >= du[i.value]; )
        r = u.pop(), n = t.pop(), s = t.pop(), t.push(`(${r} ${s} ${n})`);
      u.push(i.value);
    }
  for (; u.length > 0; )
    r = u.pop(), n = t.pop(), s = t.pop(), t.push(`(${r} ${s} ${n})`);
  return t[0];
}
function Ea(e) {
  const t = da(e), u = fa(t);
  for (const r of u)
    r.type === "chain" && (r.type = "enclosure", r.value = ha(r.tokens), delete r.tokens);
  return u;
}
function ma(e) {
  if (!e.length) return [];
  const t = { show: "#", if: "?", sort: ">>" }, u = t[e[0].value.toLowerCase()];
  if (!u) return e;
  e = Ea(e);
  let r = { name: u, flags: {}, args: [] }, n = "";
  const s = [], i = ["by", "then", "with"], l = ["as", "of", "sort", "in", "asc", "desc", "heading", "label", "otherwise"], f = {
    sorted: "sort",
    order: "sort",
    ordered: "sort",
    ascending: "asc",
    descending: "desc",
    else: "otherwise"
  };
  for (let h = 1; h < e.length; h++) {
    const _ = e[h], g = _.value.toLowerCase();
    _.type == "text" ? g in t ? (s.push(r), r = { name: t[g], flags: {}, args: [] }, n = "") : l.includes(g) ? (n = g, r.flags[n] = !0) : g in f ? (n = f[g], r.flags[n] = !0) : n ? i.includes(g) || (r.flags[n] = _, n = "") : i.includes(g) || r.args.push(_) : n ? (r.flags[n] = _, n = "") : r.args.push(_);
  }
  s.push(r);
  for (let h = 0; h < s.length; h++)
    if (s[h].name == "?") {
      h > 0 && s.unshift(...s.splice(h, 1));
      break;
    }
  const m = s.shift();
  for (const h of s) {
    const _ = fu(h).map((g) => g.value);
    m.args.push({ type: "enclosure", value: "(" + _.join(" ") + ")" });
  }
  if (m.name == "?" && m.args.length == 2) {
    for (const h of s)
      if ("otherwise" in h.flags) {
        m.args.push(h.flags.otherwise);
        break;
      }
  }
  return fu(m);
}
function fu(e) {
  const t = [{ type: "text", value: e.name }];
  for (const u of e.args)
    t.push(u);
  for (const u in e.flags) {
    const r = e.flags[u];
    r === !0 ? t.push({ type: "text", value: "-" + u }) : t.push({ type: "text", value: "-" + u + "=" }, r);
  }
  return t;
}
const Ta = {
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
}, ba = {
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
}, hu = {
  accessor: {
    "": { handler: Aa, minArgs: 2, spread: !1 },
    // handler
    ".": ga
  },
  collector: {
    "": xa,
    // handler
    "++": Tu,
    // add, concat, merge
    "++!!": ur
  },
  creator: {
    "": { handler: Na, spread: !1 },
    //applyCreator, // handler
    "^": pe,
    "~": Ca,
    "\\": Sa,
    // Single backslash \ escaped
    "@": Oa,
    "<>": ya,
    phone: Da,
    address: La,
    org: Ra,
    ref: Pa,
    currency: Ba,
    email: Ma
  },
  filter: {
    "": Wa,
    // handler
    "&": Ga,
    // !!&
    "|": Ka,
    // !!|
    "|=": Ua,
    // (|= val set) same as (| (= val set))
    "|?": va,
    // (|? COND val) same as (| (? COND val))
    "&?": Ya,
    "+?": ae
    // or maybe &&
  },
  formatter: {
    "": { handler: za, minArgs: 1, spread: !1 },
    // handler
    "#": Le
  },
  unary: {
    "": { handler: Qa, minArgs: 1, spread: !1 },
    // handler
    "!": nn,
    // list-aware; use -l to treat list as one value
    "!!": sn
    // same as (! (! val))
  },
  joiner: {
    "": { handler: qa, minArgs: 2, spread: !0 },
    // handler
    "+-": ne,
    "+:": ne
    // new name
  },
  mapper: {
    "": { handler: $a, minArgs: 2, spread: !0 },
    // handler
    "+": Tu,
    // add, prefix, suffix
    "-": ka,
    "%": wa,
    "*": Fa,
    "/": Ha,
    ">": Xa,
    "<": Ja,
    ">=": Za,
    "<=": en,
    "=": tn,
    "==": un,
    "!=": rn,
    "!==": an
  },
  sorter: {
    "": on,
    // handlers
    ">>": cn
  },
  switcher: {
    "": dn,
    // handlers
    "?": ve,
    "??": ve,
    // same as ? with no arguments, but can filter several args
    "???": ve,
    "?:": ve
  }
}, pa = ["wrap", "aux", "label", "heading", "title"];
let wt;
const Eu = {};
function mu(e, t, u) {
  Eu[e] ??= _a(e);
  const r = Eu[e];
  if (!r) return;
  if (u.length < r.minArgs) return null;
  if ((r.spread && u.length == r.minArgs && !t.l || t.s) && B(u[u.length - 1])) {
    const i = u.pop();
    u = u.concat(i);
  }
  let n = ba[e] || [];
  for (let i in n) {
    const l = n[i];
    if (B(l)) {
      for (const f of l)
        if (f in t) {
          t[i] ? t[i] = [t[i], f] : t[i] = f, t.type = i, t.style = f;
          continue;
        }
    }
  }
  !t.type && typeof t.as == "string" && (t.type = t.as), t.lang ? t.locale = t.lang : (t.locale || (t.locale = qe(t.locale)), t.lang = ir(t.locale)), t._name = e;
  const s = r.handler(r.fn, t, u);
  return t.r && B(s) && s.reverse(), s === void 0 ? null : s;
}
function _a(e) {
  for (let t in hu) {
    const u = hu[t];
    if (u.hasOwnProperty(e)) {
      let r = u[""];
      return typeof r == "function" ? r = { handler: r, minArgs: 1, spread: !0 } : X(r) && (r = { ...r }), r.fn = u[e], r;
    }
  }
  return !1;
}
function Aa(e, t, u) {
  const r = u[0], n = u.slice(1);
  if (!n.length) return r;
  if (X(r))
    if (n.length > 1 || B(n[0])) {
      const s = n.length == 1 ? n[0] : n, i = [];
      for (const l of s)
        i.push(e(r, l));
      return i;
    } else
      return e(r, n[0]);
  else return n.length == 1 ? e(r, n[0]) : e(r, n);
}
function ga(e, t) {
  if (ee(e) && (e = e.toString()), fe(e))
    return Pe(e, t);
  if (B(e)) {
    const u = {};
    for (const r of e)
      u[r] = Pe(r, t);
    return u;
  }
  if (X(e)) {
    const u = {};
    for (const r in e)
      u[e[r]] = Pe(r, t);
    return u;
  }
}
function Na(e, t, u) {
  if (["~", "phone", "address", "ref", "email"].includes(t._name) && Ie(u)) {
    let r = pe(t, u);
    return t._name === "phone" && (r = r.filter((n) => n[0])), r.map((n) => e(t, n));
  }
  return e(t, u);
}
function Ft(e) {
  return Math.max(...e.map((t) => Array.isArray(t) ? t.length : 1));
}
function pe(e, t) {
  const u = parseInt(e.sz) || Ft(t);
  let r = e.dv ?? null;
  r !== null && (r = ce(r, ht(r)));
  const n = [];
  for (const s of t)
    Array.isArray(s) ? u > s.length ? n.push([...s, ...Array(u - s.length).fill(r)]) : u < s.length ? n.push(s.slice(0, u)) : n.push(s) : n.push(Array(u).fill(s));
  return e.t ? n : Ia(n);
}
function Ia(e) {
  const t = [];
  if (e.length === 0)
    return t;
  for (let u = 0; u < e[0].length; u++) {
    const r = [];
    for (let n = 0; n < e.length; n++)
      r.push(e[n][u]);
    t.push(r);
  }
  return t;
}
function Ca(e, t) {
  return new Z(e, t);
}
function Sa(e, t) {
  return new RegExp(t, e);
}
function Oa(e, t) {
  return new An(e, t);
}
function ya(e, t) {
  return new F(e, t);
}
function Da(e, t) {
  return new gn(e, t);
}
function La(e, t) {
  return new Nn(e, t);
}
function Ra(e, t) {
  return new In(e, t);
}
function Pa(e, t) {
  return new Cn(e, t);
}
function Ba(e, t) {
  return new Sn(e, t);
}
function Ma(e, t) {
  return new On(e, t);
}
function xa(e, t, u) {
  const r = Me(u);
  return r.length ? e.init !== void 0 ? r.reduce(e, e.init) : r.reduce(e) : "";
}
function ka(e, t) {
  if (ee(e) && ee(t)) return e - t;
  if (fe(e) && fe(t)) {
    if (e.length >= t.length) {
      if (e.endsWith(t)) return e.slice(0, -t.length);
    } else if (t.startsWith(e)) return t.slice(e.length);
    return e;
  }
  return null;
}
function wa(e, t) {
  return t / e * 100;
}
function Fa(e, t) {
  return e * t;
}
function Ha(e, t) {
  return ee(e) && ee(t) ? e / t : e.toString().split(t.toString());
}
function Tu(e, t) {
  return e + t;
}
function Ua(e) {
  const [t, u] = e;
  return t && u && u instanceof Z ? u.contains(t) : !1;
}
function va(e, t) {
}
function Ya(e, t) {
}
function ne(e, t) {
  const u = t[0]?.toString();
  let r = t.slice(1);
  if (r = Me(r), fe(u))
    return r.filter((s) => !Nt(s)).join(u);
  if (B(u)) {
    const n = u.length ? u : [""];
    return r.reduce((i, l, f) => {
      if (!l && l !== 0) return "";
      if (f === 0) return l;
      const m = n[Math.min(f - 1, n.length - 1)];
      return i + m + l;
    }, "");
  }
  return "";
}
function ae(e) {
  return e.every((t) => !Nt(t)) ? ne({}, ["", ...e]) : "";
}
function ur(e, t) {
  return Se(t) ? e : e + 1;
}
ur.init = 0;
function Me(e) {
  return B(e) ? e.flat(1 / 0) : e == null ? [] : typeof e == "object" ? Object.values(e).flat(1 / 0) : [e];
}
function Wa(e, t, u) {
  if (!Ie(u))
    return e(u);
  const r = pe({}, u), n = [];
  for (let s = 0; s < r.length; s++)
    n.push(e(r[s]));
  return n;
}
function Ga(e) {
  for (let t = 0; t < e.length; t++)
    if (Se(e[t])) return e[t];
  return e[e.length - 1];
}
function Ka(e) {
  for (let t = 0; t < e.length; t++)
    if (!Se(e[t]))
      return e[t];
  return null;
}
function $a(e, t, u) {
  const r = u[0], n = u.slice(1);
  let s;
  return /*config.stepIn[0] &&*/ Array.isArray(r) ? s = r.map((i) => bu(e, i, n)) : s = bu(e, r, n), s;
}
function za(e, t, u) {
  if (u.length === 1)
    return e({ ...t }, u[0]);
  const r = (s) => s.length == 1 ? e({ ...t }, s[0]) : s.map((i) => e({ ...t }, i));
  return Ie(u) ? pe({}, u).map((s) => r(s)) : r(u);
}
function Qa(e, t, u) {
  const r = u[0];
  return t.l ? e({ ...t }, r) : Array.isArray(r) ? r.map((n) => e({ ...t }, n)) : e({ ...t }, r);
}
function qa(e, t, u) {
  if (!Ie(u))
    return e(t, u);
  const r = pe({}, u), n = [];
  for (let s = 0; s < r.length; s++)
    n.push(e(t, r[s]));
  return n;
}
function bu(e, t, u) {
  return u.length == 1 && !B(u[0]) ? e(t, u[0]) : (u.length == 1 && B(u[0]) && (u = u[0]), u.map((r) => Array.isArray(r) ? r.map((n) => e(t, n)) : e(t, r)));
}
function Va(e, t) {
  if (!e) return [];
  if (e = Array.isArray(e) ? e : e.split("|"), fe(t) && (t = t.split(",")), !fn(t))
    return e;
  const u = [];
  for (const r of t)
    u.push(e[r]);
  return u;
}
function Le(e, t) {
  if (e.type ??= ht(t, e), e.row ? (t = Va(t, e.row), e.type = "list") : t = ce(t, e.type, e), t === null) return "";
  const u = e.json ? "json" : e.type, r = { ...e };
  pa.forEach((s) => {
    delete r[s];
  });
  const n = { ...r, [e.type]: e[e.type] };
  return t = ja(u, n, t), e.title && fe(t) && (t = sr(t, e.locale)), e.aux && (B(t) && (t = t.join(e.sep || ", ")), t = Zt(e, t)), e.label && (B(t) && (t = t.join(e.sep || ", ")), e.label === !0 && (e.label = e._params[0]), t = _n(e, t)), e.heading && (B(t) && (t = t.join(e.sep || ", ")), e.heading === !0 && (e.heading = e._params[0]), t = pn(e, t)), e.wrap && (Nt(t) ? t = "" : (e.wrap === !0 && (e.wrap = "()"), t = e.wrap[0] + t + e.wrap[1])), t;
}
function ja(e, t, u) {
  switch (e) {
    case "null":
      return "";
    case "entity":
      return u.format(t);
    case "date":
      return En(t, u);
    case "number":
      return mn(t, u);
    case "text":
    case "string":
      return Tn(t, u);
    case "object":
      return nr(t, u);
    case "json":
      return JSON.stringify(u);
    case "list":
      return ar(t, u);
    case "boolean":
      return u ? "1" : "0";
    default:
      return u ? u?.toString() || "" : (console.warn(`Cannot format type: ${t.type} for the value ${u}`), "");
  }
}
function Xa(e, t) {
  return e > t;
}
function Ja(e, t) {
  return e < t;
}
function Za(e, t) {
  return e >= t;
}
function en(e, t) {
  return e <= t;
}
function tn(e, t) {
  return e == t;
}
function un(e, t) {
  return e === t;
}
function rn(e, t) {
  return e != t;
}
function an(e, t) {
  return e !== t;
}
function nn(e, t) {
  return Se(t);
}
function sn(e, t) {
  return !Se(t);
}
function on(e, t, u) {
  if (!Ie(u))
    return e(t, u);
  const r = pe({}, u), n = [];
  for (let s = 0; s < r.length; s++)
    n.push(e(t, r[s]));
  return n;
}
function cn(e, t) {
  const u = e.date ? ln : rr, r = e.desc ? -1 : 1;
  return t.sort((n, s) => r * u(e, n, s));
}
function ft(e, t) {
  if (t.by && X(e) && !B(e)) {
    const u = e[t.by];
    return u !== void 0 ? u : pu(e);
  }
  return pu(e);
}
function ln(e, t, u) {
  let r = ft(t, e), n = ft(u, e);
  return Ce(r) && Ce(n) ? ce(r, "date").getTime() - ce(n, "date").getTime() : rr(e, t, u);
}
function rr(e, t, u) {
  let r = ft(t, e), n = ft(u, e);
  const s = ee(r), i = ee(n);
  return s && i ? Number(r) - Number(n) : !s && !i ? (typeof r != "string" && (r = String(r)), typeof n != "string" && (n = String(n)), r.localeCompare(n, e.locale)) : s ? -1 : 1;
}
function pu(e) {
  if (B(e))
    return e[0];
  if (e instanceof Map)
    return e.values().next().value;
  if (X(e)) {
    const t = Object.keys(e);
    return e[t[0]];
  } else
    return e;
}
function dn(e, t, u) {
  let r = [], n = [];
  if (t._name === "?:")
    r = u, n = u;
  else {
    let s = parseInt(t.cases);
    if (s || (s = { "??": 2, "???": 3 }[t._name] || 1), s >= u.length)
      return null;
    r = u.slice(0, s), n = u.slice(s);
  }
  if (!Ie(r) && !Ie(n))
    return e(t, r, n);
  {
    const s = Math.max(Ft(r), Ft(n)), i = { sz: s }, l = pe(i, r), f = pe(i, n), m = [];
    for (let h = 0; h < s; h++)
      m.push(e(t, l[h], f[h]));
    return m;
  }
}
function ve(e, t, u) {
  for (let r = 0; r < t.length; r++)
    if (!Se(t[r]))
      return u[r];
  return u.length > t.length ? u[t.length] : null;
}
function Nt(e) {
  return e == null || e === "" || Number.isNaN(e) ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof G && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function Se(e) {
  return !e || e === "0" ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof G && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function Pe(e, t) {
  const u = e.split(".");
  let r = t;
  for (let n = 0; n < u.length; n++) {
    let s = u[n];
    if (B(r) && !ee(s)) {
      const i = [];
      for (let l of r)
        s = u.slice(n).join("."), i.push(Pe(s, l));
      return i;
    }
    if (r === null)
      return;
    if (typeof r == "object")
      if (r.hasOwnProperty(s))
        r = r[s];
      else
        return s = u.slice(n).join("."), r.hasOwnProperty(s) ? r[s] : void 0;
    else if (r instanceof Map)
      r = r.get(s);
    else
      return;
    if (r === void 0)
      return;
  }
  return r;
}
function X(e) {
  return e !== null && typeof e == "object";
}
function fe(e) {
  return typeof e == "string";
}
function B(e) {
  return Array.isArray(e);
}
function fn(e) {
  if (!B(e) || !e.length) return !1;
  for (const t of e)
    if (!ee(t)) return !1;
  return !0;
}
function Ie(e) {
  for (let t of e)
    if (B(t)) return !0;
  return !1;
}
function ee(e) {
  return !isNaN(Number(e));
}
function Ce(e) {
  return e ? e instanceof Date ? !0 : typeof e != "string" ? !1 : !isNaN(new Date(e).getTime()) : !1;
}
function hn(e) {
  return Ce(e) ? !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(e) : !1;
}
function ce(e, t, u = {}) {
  switch (t) {
    case "boolean":
      return !Se(e);
    case "date":
      return Ce(e) ? e instanceof Date || u.date === "auto" && hn(e) ? e : new Date(e.replace(/-/g, "/")) : null;
    case "text":
    case "string":
      return fe(e) ? e : ne(Me(e));
    case "list":
      return B(e) ? e : X(e) ? Me(e) : null;
    case "object":
      return X(e) ? e : null;
    case "number":
      return ee(e) ? parseFloat(e) : Ce(e) ? ce(e, "date").getTime() : 0;
    case "range":
      return e instanceof Z ? e : B(e) ? new Z(u, e) : X(e) ? new Z(u, [e.start, e.end]) : new Z(u, [e]);
    case "tag":
      return e instanceof F ? e : B(e) ? new F(u, [e]) : e instanceof G ? new F(u, [[null, e, null]]) : X(e) ? new F(u, [e]) : new F(u, [[null, e, null]]);
  }
  return e;
}
function ht(e, t = {}) {
  if (e instanceof G)
    return "entity";
  if (e instanceof Date)
    return "date";
  const u = typeof e;
  return u == "undefined" || e === null ? "null" : u == "boolean" ? u : B(e) ? "list" : ee(e) ? "number" : Ce(e) ? "date" : X(e) ? "object" : u;
}
function En(e, t) {
  if (!Ce(t))
    return null;
  const u = {
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
  let r = e.date;
  return fe(r) && (r = u[r]), (!r || r === !0) && (r = "medium"), fe(r) && (r = { dateStyle: r }), t instanceof Date ? t.toLocaleDateString(e.locale, r) : t;
}
function mn(e, t) {
  if (isNaN(t)) return "";
  if (!e.style && Number.isInteger(t) && Math.abs(t) < 1e4)
    return t.toString();
  let u = e.style;
  if (typeof u == "string" && (u = { style: u }, u.style === "currency")) {
    const r = e.currency;
    r && typeof r == "string" ? u.currency = r.toUpperCase() : u = void 0;
  }
  return t.toLocaleString(e.locale, u);
}
function Tn(e, t) {
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
function ar(e, t) {
  const u = [];
  for (let r of t)
    B(r) ? r = ar(e, r) : X(r) && (r = nr(e, r)), Nt(r) || u.push(r);
  return u.join(e.sep === void 0 ? " " : e.sep);
}
function nr(e, t) {
  return JSON.stringify(t);
}
function sr(e, t) {
  t = qe(t);
  const u = /* @__PURE__ */ new Set([
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
  function r(n) {
    return n.charAt(0).toLocaleUpperCase(t) + n.slice(1).toLocaleLowerCase(t);
  }
  return t.toLowerCase().startsWith("en") ? e.split(" ").map((n, s, i) => s === 0 || s === i.length - 1 || !u.has(n.toLowerCase()) ? r(n) : n.toLowerCase()).join(" ") : r(e);
}
function bn(e) {
  wt = typeof document < "u" && document.documentElement?.getAttribute("lang") || "en";
}
function qe(e = null) {
  return wt || bn(), e || wt;
}
function ir(e = null) {
  return qe(e).split("-")[0].toLowerCase();
}
function _u(e) {
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
  }[ir(e)];
}
function Zt(e, t) {
  return t ? new F(e, [["u-aux", t]]).format() : "";
}
function pn(e, t) {
  if (!t && !e.force) return "";
  let u = e.level || 3;
  return new F(e, [
    [
      "u-value-group",
      new F(e, [
        [`h${u}`, e.heading],
        ["span", t]
      ])
    ]
  ]).format();
}
function _n(e, t) {
  return !t && !e.force ? "" : new F(e, [
    [
      "u-inline-value-group",
      new F(e, [
        ["label", e.label],
        ["span", t]
      ])
    ]
  ]).format();
}
class G {
  constructor(t, u) {
    if (this.flags = { ...t }, this.values = Array.isArray(u) ? [...u] : typeof u == "object" ? { ...u } : u, this.parsedArgs = null, new.target === G)
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
    let u = {};
    const r = this.getFieldMapping(), n = Object.keys(t);
    return Object.keys(r).forEach((s) => {
      let i = r[s];
      Array.isArray(i) || (i = [i]);
      let l = [], f = [];
      i.forEach((h) => {
        if (Array.isArray(h)) {
          let _ = this.applyFunction(t, h);
          l.push(_), f.push(_);
        } else
          l.push(n.includes(h)), f.push(t?.[h] || "");
      });
      let m = ve({}, l, f);
      u[s] = m;
    }), u;
  }
  applyFunction(t, u) {
    switch (u.shift()) {
      case ".":
        const n = u[1];
        if (!t?.[n]) return !1;
        let s = t[n];
        const i = u[0];
        return i || i === 0 ? s[i] : "";
      default:
        return !1;
    }
  }
  getFieldMapping() {
    return {};
  }
}
class An extends G {
  constructor(t, u) {
    super(t, u);
    let r = B(u) ? u?.[0] : u;
    this.values = X(r) ? r : {};
  }
  toString() {
    return this.values[this.flags.lang];
  }
  isEmpty() {
    return !this.values || Object.keys(this.values).length === 0;
  }
}
class Z extends G {
  constructor(t, u) {
    super(t, u);
    const r = Me(u), n = r[0], s = r[1];
    this.givenStart = n, this.givenEnd = s, this.includeStart = !t.open, this.includeEnd = !t.open, this.flags.type || (this.flags.type = ht(n || s)), this.start = ce(n, "number"), this.end = ce(s, "number");
  }
  /**
   * Check if the Range includes a specific value
   */
  contains(t) {
    if (t instanceof Z) return this.overlaps(t);
    t = ce(t, "number");
    let u = this.start ? this.includeStart ? t >= this.start : t > this.start : !0, r = this.end ? this.includeEnd ? t <= this.end : t < this.end : !0;
    return u && r;
  }
  /**
   * Check if another Range overlaps with this Range.
   */
  overlaps(t) {
    if (this.start && this.end && t.start && t.end) {
      const u = (this.includeStart || t.includeStart ? t.start >= this.start : t.start > this.start) && (this.includeEnd || t.includeEnd ? t.end <= this.end : t.end < this.end), r = (this.includeStart || t.includeStart ? this.start >= t.start : this.start > t.start) && (this.includeEnd || t.includeEnd ? this.end <= t.end : this.end < t.end), n = (this.includeStart || t.includeStart ? t.start <= this.end : t.start < this.end) && (this.includeEnd || t.includeEnd ? t.end >= this.start : t.end > this.start);
      return u || r || n;
    }
    return this.start && !this.end ? t.start ? this.includeStart || t.includeStart ? t.start >= this.start : t.start > this.start : !0 : !this.start && this.end ? t.end ? this.includeEnd || t.includeEnd ? t.end <= this.end : t.end < this.end : !0 : t.start && !t.end ? this.start && this.end ? (this.includeStart || t.includeStart ? t.start >= this.start : t.start > this.start) && (this.includeEnd ? t.start <= this.end : t.start < this.end) : !0 : !t.start && t.end ? this.start && this.end ? (this.includeStart ? t.end >= this.start : t.end > this.start) && (this.includeEnd || t.includeEnd ? t.end <= this.end : t.end < this.end) : !0 : !this.start && this.end && t.start && !t.end ? this.includeEnd ? t.start <= this.end : t.start < this.end : this.start && !this.end && !t.start && t.end ? this.includeStart ? t.end >= this.start : t.end > this.start : !this.start && !this.end || !t.start && !t.end || !this.start && !this.end && !t.start && !t.end;
  }
  format(t) {
    t = { ...t, ...this.flags };
    const u = t.separator || " – ";
    let r = this.givenStart, n = this.givenEnd;
    return t.type === "date" ? (r = r ? Le(t, r) : _u(t.locale), n = n ? Le(t, n) : _u(t.locale)) : t.type !== "range" && (r = Le(t, r || ""), n = Le(t, n || "")), r || n ? `${r}${u}${n}` : "";
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
class F extends G {
  constructor(t, u) {
    super(t, u);
    let { tag: r } = t, n = r ? B(r) ? r : [r] : [];
    this.markups = u.map((s) => {
      let i = "", l = "", f = {};
      Array.isArray(s) ? [i, l, f = {}] = s : typeof s == "object" ? (i = s.tag || "", l = s.children || "", f = s.attrs || {}) : typeof s == "string" && (l = s);
      let m = i ? [...n, i] : [...n];
      return m.length || (m = ["span"]), { tag: m, children: l, attrs: f };
    });
  }
  format() {
    let t = "";
    const u = ["strong", "em", "u", "s", "sup", "sub"];
    return this.markups.forEach((r) => {
      const { tag: n, children: s, attrs: i } = r;
      let l = s || "";
      n.forEach((f, m) => {
        let h = "", _ = {};
        switch (f) {
          case "bold":
            h = "strong";
            break;
          case "italic":
            h = "em";
            break;
          case "underline":
            h = "u";
            break;
          case "strikethrough":
            h = "s";
            break;
          case "superscript":
            h = "sup";
            break;
          case "subscript":
            h = "sub";
            break;
          default:
            h = f;
        }
        if (u.includes(h))
          if (l) {
            if (l instanceof G && l.isEmpty()) return "";
          } else return "";
        if (m === 0 && (_ = i), _ && Object.keys(_).length) {
          h = h === "_self" ? "span" : h;
          let g = Object.keys(_).reduce((N, L) => `${N} ${L}="${_[L]}"`, "");
          l = `<${h}${g}>${l}</${h}>`;
        } else
          h === "span" && !l || (l = h === "_self" ? l : `<${h}>${l}</${h}>`);
      }), t += l;
    }), t;
  }
  isEmpty() {
    return this.markups.length === 1 && this.markups[0].tag.length === 1 && !this.markups[0].children && (!this.markups[0].attrs || !Object.keys(this.markups[0].attrs).length);
  }
  toString() {
    return this.format();
  }
}
class gn extends G {
  constructor(t, u) {
    super(t, u), this.parsedArgs = this.getParsedArgs(u?.[0] || {});
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
    const { link: t = !1 } = this.flags, { type: u, country: r, ext: n, start: s, end: i } = this.parsedArgs;
    let l = new Z({}, [s, i]).format();
    return [
      ae([u, ":"]),
      ae(["+", r]),
      this.buildNumber(),
      ae(["x ", n]),
      // joinIfAllTrue(['(', new Range({}, [start, end]), ')']),
      l ? new F({}, [["u-aux", l]]).format() : ""
    ].filter(Boolean).join(" ");
  }
  buildNumber() {
    const { area: t, number: u } = this.parsedArgs;
    return !t && !u ? "" : ae([ae(["(", t, ") "]), u]);
  }
  isEmpty() {
    return !this.buildNumber();
  }
  toString() {
    return this.format();
  }
}
class Nn extends G {
  constructor(t, u) {
    super(t, u), this.parsedArgs = this.getParsedArgs(u?.[0]);
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
      country: u,
      city: r,
      line1: n = "",
      line2: s = "",
      line3: i = "",
      line4: l = "",
      line5: f = "",
      province: m,
      zip: h = "",
      start: _ = "",
      end: g = ""
    } = this.parsedArgs;
    return [
      ne({}, [
        " ",
        Le({ tag: "bold", type: "tag", bold: !0 }, ae([t, ":"])),
        ne({}, [
          " ",
          n,
          ae(["(", new Z({}, [_, g]), ")"])
        ])
      ]),
      s,
      i,
      l,
      f,
      ne({}, [
        ", ",
        r,
        ne({}, [" ", m, ae(["(", u, ")"])])
      ]),
      h
    ].filter(Boolean).join("</br>");
  }
  isEmpty() {
    const { country: t, city: u, line1: r = "", province: n } = this.parsedArgs;
    return !t && !u && !r && !n;
  }
  toString() {
    return this.format();
  }
}
class In extends G {
  constructor(t, u) {
    super(t, u), this.parsedArgs = this.getParsedArgs(u?.[0]);
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
    const { type: t, organization: u, country: r, province: n } = this.parsedArgs, s = ne(null, [" - ", r, n, t]);
    return new F({}, [
      [
        "u-org",
        new F({}, [
          ["u-org-name", u],
          ["_self", Zt({}, s)]
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
class Cn extends G {
  constructor(t, u) {
    super(t, Me(u));
  }
  format() {
    const [t, ...u] = this.values, r = ne(null, [" - ", ...u]);
    return t ? new F({}, [
      [
        "u-ref",
        new F({}, [
          ["u-ref-name", t],
          ["_self", Zt({}, r)]
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
let Sn = class extends G {
  constructor(t, u) {
    super(t, u), this.parsedArgs = this.getParsedArgs(u?.[0]);
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
    const { amount: t, currency: u, convertedAmount: r } = this.parsedArgs, n = Ta[u.toLowerCase()], i = [["u-amount", n ? new Intl.NumberFormat(`${qe()}-CA`, {
      style: "currency",
      currency: n
    }).format(t) : t]];
    return u && i.push(["u-unit", u]), r && r !== "0" && i.push([
      "u-aux",
      new Intl.NumberFormat(`${qe()}-CA`, {
        style: "currency",
        currency: "CAD"
      }).format(r)
    ]), new F({}, [["u-currency", new F({}, i)]]).format();
  }
  isEmpty() {
    return !this.parsedArgs.amount;
  }
  toString() {
    return this.format();
  }
};
class On extends G {
  constructor(t, u) {
    super(t, u), this.parsedArgs = this.getParsedArgs(u?.[0] || {});
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
    const { type: t, email: u, start: r = "", end: n = "" } = this.parsedArgs;
    let s = new Z({}, [r, n]).format();
    return [
      ae([t, ":"]),
      u,
      s ? new F({}, [["u-aux", s]]).format() : ""
    ].filter(Boolean).join(" ");
  }
  isEmpty() {
    const { type: t, email: u } = this.parsedArgs;
    return !t || !u;
  }
  toString() {
    return this.format();
  }
}
const Au = /^[@]?[\$]?[\/]?[a-zA-Z_][a-zA-Z0-9_\/\.-]*$|^@$|^\?$/, yn = /^-?\d+(\.\d+)?$/;
class Dn {
  /**
   * Create a loom with given snippets and custom functions.
   *
   * @param {Object|string} snippets - A key-value object, or a string with snippet definitions.
   * @param {Object} functions - A map of custom function names to handlers.
   */
  constructor(t = {}, u = {}) {
    this.snippets = tr(t), this.functions = u;
  }
  /**
   * Sets the template variables.
   *
   * @param {Object|function} variables - A key-value object, or a function that maps a key to a value.
   * @return {void}
   */
  setVariables(t) {
    this.variables = typeof t == "function" ? t : (u) => Pe(u, t);
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
  render(t, u = null, r = null) {
    u && this.setVariables(u);
    const n = De(t, { "{": "}" });
    let s = "";
    for (const i of n)
      if (i.type === "enclosure") {
        let l = i.value.slice(1, -1);
        l.startsWith("{") && l.endsWith("}") && (l = l.slice(1, -1));
        try {
          l = this.evaluateText(l, null, r), typeof l != "string" && (l = mu("#", { l: !0, sep: ", " }, [l]), Array.isArray(l) && l.every((f) => typeof f == "string") && (l = l.join(", ")));
        } catch (f) {
          l = f;
        }
        s += l;
      } else
        s += i.value;
    return s;
  }
  /**
   * Evaluates a placeholder.
   *
   * @param {string} text - The placeholder's text to evaluate.
   * @param {Object|function} [variables] - A key-value object, or a function that maps a key to a value.
   * @param {Map} [auxVariables] - Local variables that don't change this.variables.
   * @returns {*} The result of evaluation the placeholder.
   */
  evaluateText(t, u = null, r = null) {
    if (t = t.trim(), u && this.setVariables(u), Au.test(t))
      return this.getVariable(t, r);
    if (t.length > 2 && t[0] === "(" && t[t.length - 1] === ")") {
      let n = 1, s = !0;
      for (let i = 1; i < t.length - 1; i++)
        if (t[i] === "(" ? n++ : t[i] === ")" && n--, n === 0) {
          s = !1;
          break;
        }
      if (s)
        return this.evaluateFunction(t.slice(1, -1), r);
    }
    return this.evaluateFunction(t, r);
  }
  evaluateList(t, u) {
    const r = De(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!r.length) return "";
    const n = [];
    for (const s of r)
      n.push(this.evaluateExpression(s, u).value);
    return n;
  }
  evaluateObject(t, u) {
    const r = De(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!r.length) return "";
    const n = ca(r), s = {};
    for (let [i, l] of n.entries())
      typeof i != "string" && (i = this.evaluateExpression(i, u).value), l = this.evaluateExpression(l, u).value, s[i] = l;
    return s;
  }
  parseFunction(t) {
    let u = De(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!u.length) return {};
    u = ma(u);
    let r;
    return u[0].type == "text" && u[0].value[0] != "-" ? r = u.shift().value : u[0].type != "quote" || u[0].value[0] == "`" ? r = "#" : r = "+:", { name: r, tokens: u };
  }
  evaluateFunction(t, u) {
    const { name: r, tokens: n } = this.parseFunction(t);
    if (!r) return "";
    const s = [], i = { _params: [] };
    for (let f = 0; f < n.length; f++) {
      const m = n[f];
      if (m.type == "quote" && m.value[0] === "`" && (m.value = m.value.slice(1, -1).toLowerCase().split(" ").join("_"), m.type = "text"), m.type == "quote")
        s.push(m.value.slice(1, -1));
      else if (m.type == "text" && m.value.startsWith("-")) {
        const h = m.value.slice(1).split("=");
        if (h[1] === "" && f + 1 < n.length) {
          const _ = n[++f];
          h[1] = this.evaluateExpression(_, u).value;
        } else h[1] && h[1][0] === "@" && (h[1] = this.evaluateExpression({ value: h[1] }, u).value);
        i[h[0]] = h[1] ?? !0;
      } else {
        const h = this.evaluateExpression(m, u);
        s.push(h.value), h.label && i._params.push(m.label);
      }
    }
    const l = mu(r, i, s);
    if (l !== void 0)
      return l;
    if (this.snippets.hasOwnProperty(r))
      return this.callSnippet(r, i, s);
    {
      const f = this.functions[r] ?? this.functions[r.toLowerCase()] ?? this.functions[r.toUpperCase()] ?? !1;
      return f ? this.callCustomFunction(f, i, s) : this.applyFallback(r, s);
    }
  }
  callCustomFunction(t, u, r) {
    const n = (s) => this.evaluateText(s);
    return t.call({ evaluate: n }, u, ...r);
  }
  applyFallback(t, u) {
    if (typeof Math[t] == "function")
      return Math[t](...u);
    let r = u[0];
    const n = typeof r;
    if (n === "object") {
      if (r === null)
        return "";
      Array.isArray(r) || (r = Object.values(r));
    } else if (n !== "string")
      return this.getError(102, "Invalid function name", t);
    const s = r[t] ?? r[t.toLowerCase()];
    if (typeof s != "function")
      return this.getError(104, "Invalid function name", t);
    if (u.length <= 1) return s.call(r);
    if (n === "string") return s.call(r, ...u.slice(1));
    const i = u[1], l = /* @__PURE__ */ new Map();
    return s.call(r, (...f) => {
      for (let m = 0; m < f.length; m++)
        l.set("$" + (m + 1), f[m]);
      return this.evaluateFunction(i, l);
    });
  }
  getVariableMeta(t) {
    let u = this.variables("@" + t) || {};
    return typeof u == "string" ? { label: u } : (u.label ??= sr(t.split("_").join(" ")), u);
  }
  /**
   * Evaluates an expression.
   * @param {Object} token - The expression to evaluate.
   * @param {Map} [auxVariables] - Extra environment variable values.
   * @returns {Object} The result of evaluating the expression as {value, type, label}
   */
  evaluateExpression(t, u = null) {
    const { value: r, type: n } = t;
    if (n === "quote")
      return { value: r.slice(1, -1), type: n };
    if (t.type === "enclosure") {
      if (r.startsWith("(") && r.endsWith(")"))
        return {
          value: this.evaluateFunction(r.slice(1, -1), u),
          type: "function"
        };
      if (r.startsWith("[") && r.endsWith("]"))
        return {
          value: this.evaluateList(r.slice(1, -1), u),
          type: "list"
        };
      if (r.startsWith("{") && r.endsWith("}"))
        return {
          value: this.evaluateObject(r.slice(1, -1), u),
          type: "object"
        };
    }
    return u && u.has(r) ? { value: u.get(r), type: "aux" } : Au.test(r) ? {
      value: this.getVariable(r, u),
      label: this.getVariableMeta(r).label,
      type: "variable"
    } : yn.test(r) ? { value: parseFloat(r), type: "number" } : { value: this.getError(103, "Invalid expression", r), type: "error" };
  }
  getVariable(t, u = null) {
    if (t.startsWith("@"))
      return this.getVariableMeta(t.slice(1)).label;
    const r = this.variables(t);
    if (r !== void 0) {
      const n = this.getVariableMeta(t);
      return n.type ? ce(r, n.type) : r;
    } else return u && u.has(t) ? u.get(t) : this.snippets.hasOwnProperty(t) ? this.callSnippet(t) : this.functions.hasOwnProperty(t) ? this.callCustomFunction(this.functions[t], []) : t === "_now" ? /* @__PURE__ */ new Date() : { true: !0, false: !1, null: null }[t];
  }
  callSnippet(t, u = {}, r = []) {
    let n = this.snippets[t];
    return typeof n != "function" && (n = this.makeSnippetFunction(n), this.snippets[t] = n), n(u, r);
  }
  makeSnippetFunction(t) {
    const u = t.args || [], r = t.isText, n = t.body, s = t.hasFlags, i = /* @__PURE__ */ new Map();
    return (f, m) => {
      s && i.set("$0", f);
      for (let h = 0; h < m.length; h++) {
        const _ = u[h] || "$" + (h + 1);
        if (_.startsWith("...")) {
          i.set(_.slice(3), m.slice(h));
          break;
        } else
          i.set(_, m[h]);
      }
      return r ? this.render(n, null, i) : this.evaluateFunction(n, i);
    };
  }
  getError(t, u, r) {
    throw console.error(`Error ${t}: ${u} '${r}'`), `Error[${t}][${r}]`;
  }
}
const or = [
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
or.sort((e, t) => t.length - e.length);
const Ln = new Set(or.map((e) => e.join(" ").toUpperCase())), Rn = /* @__PURE__ */ new Set([
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
]), Pn = /* @__PURE__ */ new Set([">=", "<=", "!=", "==", "&&", "||"]), Bn = /* @__PURE__ */ new Set(["+", "-", "*", "/", "%", "=", "<", ">", "!"]), Mn = /[a-zA-Z_@$?]/, xn = /[a-zA-Z0-9_.\/@]/, Rt = /[0-9]/;
function kn(e) {
  return wn(e);
}
function wn(e) {
  const t = [], u = e.length;
  let r = 0;
  for (; r < u; ) {
    const n = e[r];
    if (n === " " || n === "	" || n === `
` || n === "\r") {
      r++;
      continue;
    }
    if (n === ",") {
      t.push({ type: "comma", value: "," }), r++;
      continue;
    }
    if (n === '"' || n === "'" || n === "`") {
      const i = cr(e, r, n);
      if (i < 0) throw new Error(`Unterminated string starting at ${r}`);
      t.push({ type: "string", value: e.slice(r + 1, i) }), r = i + 1;
      continue;
    }
    if (n === "{") {
      const i = Hn(e, r, "{", "}");
      if (i < 0) throw new Error(`Unmatched '{' at ${r}`);
      t.push({ type: "loom", value: e.slice(r, i + 1) }), r = i + 1;
      continue;
    }
    if (n === "(") {
      t.push({ type: "lparen", value: "(" }), r++;
      continue;
    }
    if (n === ")") {
      t.push({ type: "rparen", value: ")" }), r++;
      continue;
    }
    if (Rt.test(n) || n === "-" && Rt.test(e[r + 1] || "") && Fn(t)) {
      let i = r + (n === "-" ? 1 : 0);
      for (; i < u && (Rt.test(e[i]) || e[i] === "."); ) i++;
      t.push({ type: "number", value: parseFloat(e.slice(r, i)) }), r = i;
      continue;
    }
    const s = e.slice(r, r + 2);
    if (Pn.has(s)) {
      t.push({ type: "operator", value: s }), r += 2;
      continue;
    }
    if (Bn.has(n)) {
      t.push({ type: "operator", value: n }), r++;
      continue;
    }
    if (Mn.test(n)) {
      let i = r + 1;
      for (; i < u && xn.test(e[i]); ) i++;
      const l = e.slice(r, i), f = l.toLowerCase();
      f === "and" ? t.push({ type: "operator", value: "&" }) : f === "or" ? t.push({ type: "operator", value: "|" }) : f === "not" ? t.push({ type: "operator", value: "!" }) : t.push({ type: "word", value: l }), r = i;
      continue;
    }
    t.push({ type: "unknown", value: n }), r++;
  }
  return t;
}
function Fn(e) {
  if (e.length === 0) return !0;
  const t = e[e.length - 1];
  return !!(t.type === "operator" || t.type === "lparen" || t.type === "word" && Ln.has(t.value.toUpperCase()));
}
function cr(e, t, u) {
  for (let r = t + 1; r < e.length; r++) {
    if (e[r] === "\\" && r + 1 < e.length) {
      r++;
      continue;
    }
    if (e[r] === u) return r;
  }
  return -1;
}
function Hn(e, t, u, r) {
  let n = 0;
  for (let s = t; s < e.length; s++) {
    const i = e[s];
    if (i === '"' || i === "'" || i === "`") {
      const l = cr(e, s, i);
      if (l < 0) return -1;
      s = l;
      continue;
    }
    if (i === u) n++;
    else if (i === r && (n--, n === 0))
      return s;
  }
  return -1;
}
function Un(e, t, u) {
  for (const r of u) {
    if (t + r.length > e.length) continue;
    let n = !0;
    for (let s = 0; s < r.length; s++) {
      const i = e[t + s];
      if (i.type !== "word" || i.value.toLowerCase() !== r[s]) {
        n = !1;
        break;
      }
    }
    if (n)
      return {
        canonical: r.join(" ").toUpperCase(),
        length: r.length
      };
  }
  return null;
}
class le extends Error {
}
const vn = /* @__PURE__ */ new Set(["long", "full", "short", "medium"]), Yn = [
  ["for", "each"],
  ["total", "of"],
  ["sum", "of"],
  ["average", "of"],
  ["count", "of"],
  ["show"],
  ["if"]
], Xe = [
  ["from", "lowest", "to", "highest"],
  ["from", "highest", "to", "lowest"],
  ["sorted", "by"],
  ["joined", "by"],
  ["with", "label"],
  ["if", "present"],
  ["where"],
  ["as"],
  ["if"]
], Wn = [["then"], ["show"]], Gn = [["otherwise"], ["else"]], Kn = [["else"], ["show"]], $n = [["in"]], zn = [["do"]], Qn = [["ascending"]], qn = [["descending"]];
function V(e, t) {
  return Un(e.tokens, e.i, t);
}
function Y(e, t) {
  e.i += t.length;
}
function Vn(e) {
  const t = { tokens: e, i: 0 }, u = eu(t);
  if (u == null)
    throw new le("Empty Plain expression");
  if (t.i < t.tokens.length) {
    const r = t.tokens.slice(t.i).map((n) => n.value).join(" ");
    throw new le(`Unexpected trailing tokens: ${r}`);
  }
  return u;
}
function H(e, t = 0) {
  return e.tokens[e.i + t];
}
function w(e) {
  return e.tokens[e.i++];
}
function lr(e, t, u) {
  const r = H(e);
  if (!r || r.type !== t || u != null) {
    const n = r ? `${r.type}:${r.value}` : "end of input";
    throw new le(`Expected ${t}, got ${n}`);
  }
  return w(e);
}
function eu(e) {
  const t = H(e);
  if (!t) return null;
  const u = V(e, Yn);
  if (u && !jn(e, u))
    switch (Y(e, u), u.canonical) {
      case "IF":
        return us(e);
      case "SHOW":
        return gu(e);
      case "TOTAL OF":
      case "SUM OF":
        return Pt(e, { type: "sum", value: J(e) });
      case "AVERAGE OF":
        return Pt(e, { type: "average", value: J(e) });
      case "COUNT OF":
        return Pt(e, rs(e));
      case "FOR EACH":
        return as(e);
    }
  if (t.type === "word" && Xn(e)) {
    const r = Jn(e), n = tu(e);
    return n.length > 0 ? { type: "show", value: r, modifiers: n } : r;
  }
  {
    const r = e.i;
    try {
      const n = uu(e);
      if (n != null && e.i >= e.tokens.length)
        return n;
    } catch {
    }
    e.i = r;
  }
  return gu(e);
}
function jn(e, t) {
  return e.tokens.length - e.i - t.length <= 0 && t.length === 1;
}
function Xn(e) {
  const t = H(e, 1);
  if (!t) return !1;
  if (t.type === "string" || t.type === "number" || t.type === "lparen" || t.type === "loom")
    return !0;
  if (t.type === "word") {
    const u = e.i;
    e.i += 1;
    const r = V(e, Xe);
    return e.i = u, r == null;
  }
  return !1;
}
function Jn(e) {
  const t = w(e).value, u = [];
  for (; e.i < e.tokens.length; ) {
    const r = H(e);
    if (!r) break;
    if (r.type === "comma") {
      w(e);
      continue;
    }
    if (r.type === "rparen" || r.type === "operator" || r.type === "word" && V(e, Xe)) break;
    const n = J(e);
    if (n == null) break;
    u.push(n);
  }
  return { type: "call", name: t, args: u };
}
function gu(e) {
  const t = Zn(e);
  if (t.length === 0) {
    const n = H(e), s = n ? `${n.type}:${n.value}` : "end of input";
    throw new le(`Expected a value, got ${s}`);
  }
  const u = tu(e);
  if (t.length > 1) {
    for (const i of u)
      if (i.type !== "joinedBy" && i.type !== "ifPresent")
        throw new le(
          `Multi-value SHOW supports only JOINED BY and IF PRESENT (got ${i.type})`
        );
    const n = u.some((i) => i.type === "joinedBy"), s = u.some((i) => i.type === "ifPresent");
    if (n && s)
      throw new le(
        "JOINED BY and IF PRESENT cannot be combined on the same SHOW"
      );
    return { type: "show", values: t, modifiers: u };
  }
  const r = t[0];
  return u.length === 0 && es(r) ? { type: "show", value: r, modifiers: [] } : { type: "show", value: r, modifiers: u };
}
function Zn(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const u = H(e);
    if (!u) break;
    if (u.type === "comma") {
      w(e);
      continue;
    }
    if (u.type === "rparen" || u.type === "operator" || u.type === "word" && V(e, Xe)) break;
    const r = J(e);
    if (r == null) break;
    t.push(r);
  }
  return t;
}
function es(e) {
  return e.type === "var" || e.type === "string" || e.type === "number" || e.type === "loom" || e.type === "group";
}
function tu(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const u = V(e, Xe);
    if (!u) break;
    switch (u.canonical) {
      case "AS": {
        Y(e, u), t.push({ type: "as", format: ts(e) });
        break;
      }
      case "WITH LABEL": {
        Y(e, u);
        let r = null;
        H(e) && H(e).type === "string" && (r = w(e).value), t.push({ type: "withLabel", label: r });
        break;
      }
      case "SORTED BY": {
        Y(e, u);
        const r = J(e);
        let n = "asc";
        const s = V(e, qn);
        if (s)
          Y(e, s), n = "desc";
        else {
          const i = V(e, Qn);
          i && Y(e, i);
        }
        t.push({ type: "sortedBy", value: r, order: n });
        break;
      }
      case "FROM LOWEST TO HIGHEST": {
        Y(e, u), t.push({ type: "sortedBy", value: J(e), order: "asc" });
        break;
      }
      case "FROM HIGHEST TO LOWEST": {
        Y(e, u), t.push({ type: "sortedBy", value: J(e), order: "desc" });
        break;
      }
      case "JOINED BY": {
        Y(e, u);
        const r = H(e);
        if (!r || r.type !== "string")
          throw new le("JOINED BY expects a quoted string");
        w(e), t.push({ type: "joinedBy", sep: r.value });
        break;
      }
      case "WHERE":
      case "IF": {
        Y(e, u), t.push({ type: "where", condition: uu(e) });
        break;
      }
      case "IF PRESENT": {
        Y(e, u), t.push({ type: "ifPresent" });
        break;
      }
      default:
        return t;
    }
  }
  return t;
}
function ts(e) {
  const t = H(e);
  if (t && t.type === "string")
    return w(e), { raw: t.value };
  const u = [];
  for (; u.length < 2; ) {
    const s = H(e);
    if (!s || s.type !== "word" || V(e, Xe)) break;
    u.push(w(e).value.toLowerCase());
  }
  if (u.length === 0)
    throw new le("AS requires a format type");
  const r = u[0], n = u[1];
  return n === "date" && vn.has(r) ? { type: "date", value: r } : n === "only" && (r === "year" || r === "month") ? { type: "date", value: r === "year" ? "y" : "m" } : Rn.has(r) ? { type: r, value: n ?? null } : (n != null && e.i--, { type: r, value: null });
}
function us(e) {
  const t = uu(e), u = V(e, Wn);
  u && Y(e, u);
  const r = Nu(e);
  let n = null;
  const s = V(e, Gn);
  if (s) {
    Y(e, s);
    const i = V(e, Kn);
    i && Y(e, i), n = Nu(e);
  }
  return { type: "if", condition: t, thenBranch: r, elseBranch: n };
}
function Nu(e) {
  return J(e);
}
function rs(e) {
  return { type: "count", value: J(e) };
}
function Pt(e, t) {
  const u = tu(e);
  return u.length === 0 ? t : { type: "show", value: t, modifiers: u };
}
function as(e) {
  const t = H(e);
  if (!t || t.type !== "word")
    throw new le("FOR EACH expects an identifier");
  w(e);
  const u = V(e, $n);
  u && Y(e, u);
  const r = J(e), n = V(e, zn);
  n && Y(e, n);
  const s = eu(e);
  return { type: "forEach", ident: t.value, list: r, body: s };
}
function uu(e) {
  return dr(e);
}
function dr(e) {
  let t = Iu(e);
  for (; ; ) {
    const u = H(e);
    if (!u || u.type !== "operator" || u.value !== "|" && u.value !== "||") break;
    w(e);
    const r = Iu(e);
    t = { type: "binop", op: "|", left: t, right: r };
  }
  return t;
}
function Iu(e) {
  let t = Ht(e);
  for (; ; ) {
    const u = H(e);
    if (!u || u.type !== "operator" || u.value !== "&" && u.value !== "&&") break;
    w(e);
    const r = Ht(e);
    t = { type: "binop", op: "&", left: t, right: r };
  }
  return t;
}
function Ht(e) {
  const t = H(e);
  if (t && t.type === "operator" && t.value === "!")
    return w(e), { type: "unop", op: "!", arg: Ht(e) };
  if (t && t.type === "lparen") {
    w(e);
    const u = dr(e);
    return lr(e, "rparen"), { type: "group", inner: u };
  }
  return ss(e);
}
const ns = /* @__PURE__ */ new Set(["=", "==", "!=", ">", "<", ">=", "<="]);
function ss(e) {
  const t = Cu(e), u = H(e);
  if (u && u.type === "operator" && ns.has(u.value)) {
    w(e);
    const r = Cu(e);
    return { type: "binop", op: u.value === "==" ? "=" : u.value, left: t, right: r };
  }
  return t;
}
function Cu(e) {
  let t = Su(e);
  for (; ; ) {
    const u = H(e);
    if (!u || u.type !== "operator" || u.value !== "+" && u.value !== "-") break;
    w(e);
    const r = Su(e);
    t = { type: "binop", op: u.value, left: t, right: r };
  }
  return t;
}
function Su(e) {
  let t = J(e);
  for (; ; ) {
    const u = H(e);
    if (!u || u.type !== "operator" || u.value !== "*" && u.value !== "/" && u.value !== "%") break;
    w(e);
    const r = J(e);
    t = { type: "binop", op: u.value, left: t, right: r };
  }
  return t;
}
function J(e) {
  const t = H(e);
  if (!t) return null;
  if (t.type === "lparen") {
    w(e);
    const u = eu(e);
    return lr(e, "rparen"), { type: "group", inner: u };
  }
  return t.type === "loom" ? (w(e), { type: "loom", value: t.value }) : t.type === "string" ? (w(e), { type: "string", value: t.value }) : t.type === "number" ? (w(e), { type: "number", value: t.value }) : t.type === "word" ? (w(e), { type: "var", path: t.value }) : null;
}
class fr extends Error {
}
function is(e) {
  if (e == null) return "";
  const t = k(e);
  return _s(t);
}
function k(e) {
  switch (e.type) {
    case "loom": {
      const t = bs(e.value);
      return ps(t) ? `(${t})` : t;
    }
    case "var":
      return e.path;
    case "string":
      return Be(e.value);
    case "number":
      return String(e.value);
    case "group":
      return k(e.inner);
    case "binop":
      return `(${e.op} ${k(e.left)} ${k(e.right)})`;
    case "unop":
      return `(${e.op} ${k(e.arg)})`;
    case "show":
      return cs(e);
    case "if":
      return ds(e);
    case "count":
      return fs(e);
    case "sum":
      return `(++ ${k(e.value)})`;
    case "average": {
      const t = k(e.value);
      return `(/ (++ ${t}) (++!! ${t}))`;
    }
    case "call":
      return os(e);
    case "forEach":
      return hs(e);
    default:
      throw new fr(`Unknown node type: ${e.type}`);
  }
}
function os(e) {
  if (e.args.length === 0) return e.name;
  const t = e.args.map(k).join(" ");
  return `(${e.name} ${t})`;
}
function cs(e) {
  if (e.values)
    return ls(e);
  const t = Et(e.value), u = e.modifiers.some((l) => l.type === "sortedBy");
  let r = null;
  if (u && e.value.type === "var" && t) {
    const l = e.value.path, f = t + ".";
    l.startsWith(f) && l.length > f.length && (r = l.slice(f.length));
  }
  let n, s = -1;
  const i = e.value;
  if (i && (i.type === "count" || i.type === "sum" || i.type === "average")) {
    const l = e.modifiers.findIndex((f) => f.type === "where");
    if (l >= 0) {
      const f = e.modifiers[l], m = Et(i.value), h = k(Re(f.condition, m));
      if (i.type === "count")
        n = `(++!! ${h})`;
      else if (i.type === "sum")
        n = `(++ (? ${h} ${k(i.value)}))`;
      else {
        const _ = k(i.value);
        n = `(/ (++ (? ${h} ${_})) (++!! ${h}))`;
      }
      s = l;
    }
  }
  n == null && (n = r ? t : k(e.value));
  for (let l = 0; l < e.modifiers.length; l++) {
    if (l === s) continue;
    const f = e.modifiers[l];
    switch (f.type) {
      case "where": {
        n = `(? ${k(Re(f.condition, t))} ${n})`;
        break;
      }
      case "sortedBy": {
        const m = ms(f.value);
        n = `(>> ${f.order === "desc" ? "-desc " : ""}-by=${m} ${n})`, r && (n = `(. ${Be(r)} ${n})`, r = null);
        break;
      }
      case "joinedBy":
        n = `(+: ${Be(f.sep)} ${n})`;
        break;
      case "as":
        n = `(# ${Ts(f.format)} ${n})`;
        break;
      case "withLabel": {
        n = `(# -label${f.label != null ? `=${Be(f.label)}` : ""} ${n})`;
        break;
      }
      default:
        throw new fr(`Unknown modifier type: ${f.type}`);
    }
  }
  return n;
}
function ls(e) {
  const t = e.values.map(k);
  if (e.modifiers.some((s) => s.type === "ifPresent"))
    return `(+? ${t.join(" ")})`;
  const r = e.modifiers.find((s) => s.type === "joinedBy"), n = r ? r.sep : "";
  return `(+: ${Be(n)} ${t.join(" ")})`;
}
function ds(e) {
  const t = k(e.condition), u = k(e.thenBranch);
  return e.elseBranch != null ? `(? ${t} ${u} ${k(e.elseBranch)})` : `(? ${t} ${u})`;
}
function fs(e) {
  return `(++!! ${k(e.value)})`;
}
function Et(e) {
  if (e == null) return null;
  if (e.type === "var") {
    const t = e.path.split(".");
    return t.length > 1 ? t.slice(0, -1).join(".") : e.path;
  }
  return e.type === "group" ? Et(e.inner) : e.type === "count" || e.type === "sum" || e.type === "average" ? Et(e.value) : null;
}
function Re(e, t) {
  if (e == null || !t) return e;
  switch (e.type) {
    case "var": {
      const u = e.path;
      return u.startsWith(t + ".") || u === t || u.includes(".") || u === "true" || u === "false" || u === "null" || u.startsWith("@") || u.startsWith("$") ? e : { type: "var", path: `${t}.${u}` };
    }
    case "binop":
      return {
        ...e,
        left: Re(e.left, t),
        right: Re(e.right, t)
      };
    case "unop":
      return { ...e, arg: Re(e.arg, t) };
    case "group":
      return { ...e, inner: Re(e.inner, t) };
    default:
      return e;
  }
}
function hs(e) {
  const t = k(e.list), u = k(e.body).replace(
    new RegExp(`\\b${Es(e.ident)}\\b`, "g"),
    "$1"
  );
  return `(map ${t} ${Be(u)})`;
}
function Es(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ms(e) {
  if (e.type === "var") {
    const t = e.path.split(".");
    return t[t.length - 1];
  }
  return e.type === "string" ? e.value : k(e);
}
function Ts(e) {
  if (e.raw != null) {
    const t = e.raw;
    return t.startsWith("-") ? t : `-${t}`;
  }
  return e.value != null ? `-${e.type}=${e.value}` : `-${e.type}`;
}
function Be(e) {
  return typeof e != "string" && (e = String(e)), e.includes("'") ? e.includes('"') ? `'${e.replace(/'/g, "\\'")}'` : `"${e}"` : `'${e}'`;
}
function bs(e) {
  return e.length >= 2 && e[0] === "{" && e[e.length - 1] === "}" ? e.slice(1, -1) : e;
}
function ps(e) {
  let t = 0, u = !1, r = "";
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    if (u) {
      if (s === "\\" && n + 1 < e.length) {
        n++;
        continue;
      }
      s === r && (u = !1);
      continue;
    }
    if (s === '"' || s === "'" || s === "`") {
      u = !0, r = s;
      continue;
    }
    if (s === "(" || s === "{" || s === "[") {
      t++;
      continue;
    }
    if (s === ")" || s === "}" || s === "]") {
      t--;
      continue;
    }
    if (t === 0 && (s === " " || s === "	" || s === `
` || s === "\r"))
      return !0;
  }
  return !1;
}
function _s(e) {
  if (e.length < 2 || e[0] !== "(" || e[e.length - 1] !== ")") return e;
  let t = 0, u = !1, r = "";
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    if (u) {
      if (s === "\\" && n + 1 < e.length) {
        n++;
        continue;
      }
      s === r && (u = !1);
      continue;
    }
    if (s === '"' || s === "'" || s === "`") {
      u = !0, r = s;
      continue;
    }
    if (s === "(") t++;
    else if (s === ")" && (t--, t === 0 && n < e.length - 1))
      return e;
  }
  return e.slice(1, -1);
}
class As {
  /**
   * @param {Object|string} snippets - Same forms as LoomCore accepts
   *   (source string, object, or empty). Bodies written in Plain
   *   syntax are eagerly translated to Compact form at construction
   *   time so the evaluator never sees Plain syntax.
   * @param {Object} functions - Passed through to LoomCore unchanged.
   */
  constructor(t = {}, u = {}) {
    const r = this._prepareSnippets(t);
    this.core = new Dn(r, u);
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
    const u = tr(t), r = {};
    for (const [n, s] of Object.entries(u)) {
      if (typeof s == "function") {
        r[n] = s;
        continue;
      }
      r[n] = {
        ...s,
        body: s.isText ? this.translateTemplate(s.body) : this.translateExpression(s.body)
      };
    }
    return r;
  }
  /**
   * Render a template, translating each `{…}` placeholder from Plain
   * to Compact form before handing the result to the core renderer.
   */
  render(t, u = null, r = null) {
    const n = this.translateTemplate(t);
    return this.core.render(n, u, r);
  }
  /**
   * Evaluate a single expression. Accepts both Plain and Compact form.
   * Returns whatever the core engine returns — string, number, array,
   * object, etc.
   */
  evaluateText(t, u = null, r = null) {
    const n = this.translateExpression(t);
    return this.core.evaluateText(n, u, r);
  }
  /**
   * Walk a template, find each balanced `{…}` block, translate its
   * contents from Plain to Compact form, and rebuild the template.
   * Plain text outside placeholders is untouched.
   */
  translateTemplate(t) {
    const u = De(t, { "{": "}" });
    let r = "";
    for (const n of u) {
      if (n.type !== "enclosure") {
        r += n.value;
        continue;
      }
      let s = n.value.slice(1, -1);
      if (s.startsWith("{") && s.endsWith("}")) {
        r += n.value;
        continue;
      }
      const i = this.translateExpression(s, { wrapped: !1 });
      r += `{${i}}`;
    }
    return r;
  }
  /**
   * Translate a single expression (the contents of a placeholder, or a
   * standalone expression passed to evaluateText). Falls back to the
   * original input on any parse or translation failure.
   */
  translateExpression(t) {
    try {
      const u = Vn(kn(t));
      return is(u);
    } catch {
      return t;
    }
  }
}
function gs(e) {
  if (!Array.isArray(e)) return [[]];
  const t = [[]];
  for (const u of e)
    u.type === "divider" ? t.push([]) : t[t.length - 1].push(u);
  return t;
}
function ye(e, t, u) {
  if (Array.isArray(e))
    return e.map((n) => Ut(n, t, u));
  if (!e || typeof e != "object") return e;
  const r = e.content;
  return Array.isArray(r) ? {
    ...e,
    content: r.map((n) => Ut(n, t, u))
  } : e;
}
function Ut(e, t, u) {
  if (!e || typeof e != "object") return e;
  const { type: r, content: n, text: s } = e;
  return r === "text" && typeof s == "string" ? {
    ...e,
    text: t.render(s, u)
  } : n && Array.isArray(n) ? {
    ...e,
    content: n.map((i) => Ut(i, t, u))
  } : e;
}
function Ou(e, t, u, r) {
  const n = e?.doc ?? e;
  if (!n?.content) return ye(n, t, u);
  const s = Pe(r, u), i = gs(n.content);
  if (!Array.isArray(s) || s.length === 0 || i.length < 2)
    return ye(n, t, u);
  const l = [];
  if (i[0].length > 0) {
    const h = ye(
      { type: "doc", content: i[0] },
      t,
      u
    );
    l.push(...h.content || []);
  }
  const m = (i.length >= 3 ? i.slice(1, -1) : [i[1]]).reduce((h, _, g) => (g > 0 && h.push({ type: "divider" }), h.push(..._), h), []);
  for (const h of s) {
    const _ = ye(
      { type: "doc", content: m },
      t,
      { ...u, ...h }
    );
    l.push(..._.content || []);
  }
  if (i.length >= 3) {
    const h = i[i.length - 1];
    if (h.length > 0) {
      l.push({ type: "divider" });
      const _ = ye(
        { type: "doc", content: h },
        t,
        u
      );
      l.push(..._.content || []);
    }
  }
  return { type: "doc", content: l };
}
const Ns = `
@page {
  size: letter;
  margin: 1in 0.75in;
  @bottom-right { content: counter(page) " / " counter(pages); font-size: 9pt; color: #666; }
}
body { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10.5pt; line-height: 1.45; color: #111; }
h1 { font-size: 22pt; margin: 0 0 0.5em; }
h2 { font-size: 14pt; margin: 1.5em 0 0.4em; }
h3 { font-size: 11.5pt; margin: 1em 0 0.3em; }
table { width: 100%; border-collapse: collapse; margin: 0.75em 0 1em; }
th, td { border-bottom: 1px solid #ddd; padding: 0.4em 0.5em; text-align: left; vertical-align: top; }
th { font-weight: 600; }
.totals-row td { border-bottom: none; padding-top: 0.6em; }
.totals-row.grand td { border-top: 2px solid #111; font-weight: 700; }
.signature-block { margin-top: 2.5em; page-break-inside: avoid; }
.unsigned { color: #888; font-style: italic; }
`;
function ru(e, t = {}) {
  const u = e?.config?.business_docs || {};
  return {
    title: t.title ?? e?.config?.name ?? "Business document",
    creator: t.creator ?? u.vendor?.organization ?? "Uniweb",
    subject: t.subject ?? "Business document"
  };
}
function Is(e, t = {}) {
  return {
    adapterOptions: {
      mode: "html",
      meta: ru(e, t),
      stylesheet: Ns
    }
  };
}
const hr = {
  // Block-level — applied via <Paragraph role="…">.
  Title: {
    font: "heading",
    size: 56,
    // 28pt
    bold: !0,
    color: "accent",
    paragraph: { spacing: { after: 240 } }
  },
  Heading1: {
    font: "heading",
    size: 32,
    // 16pt
    bold: !0,
    color: "body",
    paragraph: { spacing: { before: 240, after: 120 } }
  },
  Heading2: {
    font: "heading",
    size: 26,
    // 13pt
    bold: !0,
    color: "body",
    paragraph: { spacing: { before: 200, after: 100 } }
  },
  Body: {
    font: "body",
    size: 22,
    // 11pt
    color: "body",
    paragraph: { spacing: { line: 276 } }
    // 1.15
  },
  Display: {
    // Highlighted secondary value: invoice number, total. Larger than
    // body and bold but quieter than Title.
    font: "body",
    size: 28,
    // 14pt
    bold: !0,
    color: "body"
  },
  // Inline — applied via <TextRun role="…">.
  BodyStrong: { font: "body", size: 22, bold: !0, color: "body" },
  Label: {
    // Small uppercase muted labels: 'INVOICE NUMBER', 'BILL TO'.
    // Bold + allCaps + muted gray creates contrast against the
    // values without being visually heavy.
    font: "body",
    size: 18,
    // 9pt
    bold: !0,
    color: "muted",
    allCaps: !0
  },
  Caption: { font: "body", size: 18, color: "muted" },
  // White-on-blue table header rows.
  TableHeader: {
    font: "heading",
    size: 20,
    // 10pt
    bold: !0,
    color: "surface"
  },
  // Big bold "Total" row in the totals table.
  TotalLine: {
    font: "heading",
    size: 26,
    // 13pt
    bold: !0,
    color: "surface"
  }
}, Bt = {
  colors: {
    accent: "4775B2",
    body: "3B3B3B",
    muted: "757575",
    softBorder: "BFD3ED",
    surface: "FFFFFF"
  },
  fonts: {
    heading: "Calibri",
    body: "Calibri"
  },
  typography: hr
};
function Cs(e) {
  const t = e?.config?.business_docs?.theme;
  return t ? {
    colors: {
      ...Bt.colors,
      ...t.colors || {}
    },
    fonts: {
      ...Bt.fonts,
      ...t.fonts || {}
    },
    typography: {
      ...hr,
      ...t.typography || {}
    }
  } : Bt;
}
function Ss(e, t = {}) {
  const u = Cs(e);
  return {
    theme: u,
    adapterOptions: {
      ...ru(e, t),
      // Theme is also threaded through adapterOptions so the docx
      // adapter can synthesise its OOXML named-style block from
      // theme.typography. Foundations that want to add custom paragraph
      // styles on top can pass them via hostHints.paragraphStyles —
      // they merge with the synthesised pack (caller wins on id
      // conflict, except for built-in IDs which override the
      // default.<slot> instead).
      theme: u,
      paragraphStyles: t.paragraphStyles,
      loadAsset: t.loadAsset
    }
  };
}
function Os(e, t = {}) {
  return {
    adapterOptions: ru(e, t)
  };
}
const ys = {
  // Canada
  GST: { rate: 0.05, label: "GST" },
  PST: { rate: 0.07, label: "PST" },
  HST: { rate: 0.13, label: "HST" },
  QST: { rate: 0.09975, label: "QST" },
  // Common single-rate VAT placeholders. Authors override per jurisdiction.
  VAT: { rate: 0.2, label: "VAT" },
  NONE: { rate: 0, label: "" }
};
function Ds(e, t = {}) {
  const u = { ...ys, ...t };
  return e && u[e] || u.NONE;
}
function yu(e) {
  if (e == null || e === "") return 0;
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function au(e) {
  return yu(e?.qty) * yu(e?.unit_price);
}
function Er(e) {
  return Array.isArray(e) ? Math.round(e.reduce((t, u) => t + au(u), 0) * 100) / 100 : 0;
}
function Ls(e, t = {}, u = {}) {
  const r = Er(e?.items), n = e?.tax?.jurisdiction || t.tax_jurisdiction || null;
  if (!n)
    return { jurisdiction: null, rate: 0, amount: 0, label: "" };
  const s = Ds(n, u), i = e?.tax?.rate != null ? Number(e.tax.rate) : s.rate, l = e?.tax?.amount != null ? Number(e.tax.amount) : Math.round(r * i * 100) / 100;
  return { jurisdiction: n, rate: i, amount: l, label: s.label };
}
function It(e, t = {}, u = {}) {
  const r = Er(e?.items), n = Ls(e, t, u), s = Math.round((r + n.amount) * 100) / 100;
  return {
    subtotal: r,
    tax_amount: n.amount,
    tax_rate: n.rate,
    tax_label: n.label,
    tax_jurisdiction: n.jurisdiction,
    total: s
  };
}
const Rs = /* @__PURE__ */ new Set([
  "issued",
  "open",
  "to-verify",
  "paid",
  "overdue"
]);
function Ps(e) {
  return Rs.has(String(e?.status));
}
function Bs(e, t) {
  return !Array.isArray(e) || !t ? null : e.find((u) => u?.slug === t || String(u?.number) === String(t)) || null;
}
function Ms(e, t) {
  return !e?.to || !t ? !1 : new Date(e.to) > new Date(t);
}
function xs({ invoices: e = [], sows: t = [] } = {}) {
  const u = [], r = (n, s, i, l) => u.push({ severity: n, code: s, recordType: "invoice", recordSlug: i, message: l });
  for (const n of e) {
    const s = n?.slug || n?.number || "(unknown)", i = Ps(n);
    if (!n?.sow_ref) {
      r(
        i ? "warn" : "info",
        "invoice-missing-sow-ref",
        s,
        `Invoice ${s} has no sow_ref. Issued invoices should reference an SOW.`
      );
      continue;
    }
    const l = Bs(t, n.sow_ref);
    if (!l) {
      r(
        i ? "error" : "warn",
        "invoice-sow-not-found",
        s,
        `Invoice ${s} references sow_ref "${n.sow_ref}" but no matching SOW exists.`
      );
      continue;
    }
    const f = String(l?.status || "");
    (f === "draft" || f === "in-review") && r(
      i ? "error" : "info",
      "invoice-sow-not-signed",
      s,
      `Invoice ${s} bills against SOW "${n.sow_ref}" which is still ${f}.`
    ), (f === "expired" || f === "superseded") && r(
      "warn",
      "invoice-sow-stale",
      s,
      `Invoice ${s} bills against SOW "${n.sow_ref}" which is ${f}.`
    ), f === "signed" && !l?.signed && r(
      "warn",
      "sow-signed-without-date",
      s,
      `Invoice ${s}: SOW "${n.sow_ref}" has status: signed but no signed: date.`
    ), Array.isArray(n?.items) && l?.expires && n.items.some((h) => Ms(h?.period, l.expires)) && r(
      i ? "warn" : "info",
      "invoice-period-past-expiry",
      s,
      `Invoice ${s} contains line(s) whose period extends past SOW ${n.sow_ref} expires (${l.expires}).`
    );
  }
  return u;
}
function ks(e, t = console) {
  for (const u of e) {
    const r = `[business-docs] ${u.severity.toUpperCase()} ${u.code}`;
    u.severity === "error" ? t.error(`${r}: ${u.message}`) : u.severity === "warn" ? t.warn(`${r}: ${u.message}`) : t.info(`${r}: ${u.message}`);
  }
}
const ut = new As();
function mr(e, t) {
  const u = e?.[t];
  return u ? Array.isArray(u) ? u[0] : u : null;
}
function Tr(e) {
  const t = mr(e, "invoice");
  return t || (Array.isArray(e?.invoices) && e.invoices.length === 1 ? e.invoices[0] : null);
}
function br(e) {
  const t = mr(e, "sow");
  return t || (Array.isArray(e?.sows) && e.sows.length === 1 ? e.sows[0] : null);
}
function xe(e, t, u) {
  if (Array.isArray(t?.[e])) return t[e];
  const r = u?.website?.config?.collections?.[e]?.records;
  return Array.isArray(r) ? r : [];
}
function Du(e, t) {
  const u = t?.website?.config?.business_docs || {}, r = u.vendor || {}, n = u.defaults || {}, s = u.registries?.tax || {}, i = xe("invoices", e, t), l = xe("sows", e, t), f = { vendor: r, defaults: n }, m = Tr({ invoice: e?.invoice, invoices: i });
  if (m) {
    const _ = It(m, n, s), g = Array.isArray(m.items) ? m.items.map((N) => ({ ...N, amount: au(N) })) : [];
    return { ...f, ...m, items: g, ..._ };
  }
  const h = br({ sow: e?.sow, sows: l });
  return h ? { ...f, ...h } : { ...f, invoices: i, sows: l };
}
function vt(e) {
  if (e == null) return e;
  if (e instanceof Date) {
    if (Number.isNaN(e.getTime())) return "";
    const t = e.getUTCFullYear(), u = String(e.getUTCMonth() + 1).padStart(2, "0"), r = String(e.getUTCDate()).padStart(2, "0");
    return `${t}-${u}-${r}`;
  }
  if (Array.isArray(e)) return e.map(vt);
  if (typeof e == "object") {
    const t = {};
    for (const [u, r] of Object.entries(e)) t[u] = vt(r);
    return t;
  }
  return e;
}
function ws({ params: e, content: t, block: u }) {
  const r = e?.kind || u?.properties?.kind;
  if (typeof r == "string" && r.length) return r;
  const n = u?.properties?.source;
  if (n === "items") return "line-items";
  if (n === "deliverables") return "deliverables";
  const s = (u?.properties?.title || t?.title || "").toString().trim().toLowerCase();
  return s === "invoice" ? "cover" : s === "totals" ? "totals" : s === "payment" ? "payment" : s === "line items" ? "line-items" : s === "deliverables" ? "deliverables" : "body";
}
let Lu = /* @__PURE__ */ new WeakSet();
function Fs(e, t) {
  const u = xe("invoices", e, t), r = xe("sows", e, t);
  if (u.length === 0 || r.length === 0 || Lu.has(t)) return;
  Lu.add(t);
  const n = xs({ invoices: u, sows: r });
  n.length > 0 && ks(n);
}
const ct = {
  defaultLayout: "BusinessDocLayout",
  props: {},
  handlers: {
    content: (e, t) => {
      Fs(e, t);
      const u = vt(Du(e, t)), r = t.rawContent?.doc ?? t.rawContent, n = t.properties?.source;
      if (!n) return ye(r, ut, u);
      const s = t.properties?.where;
      if (s) {
        const i = u[n];
        if (Array.isArray(i)) {
          const l = i.filter(
            (f) => ut.evaluateText(s, { ...u, ...f })
          );
          return Ou(r, ut, { ...u, [n]: l }, n);
        }
      }
      return Ou(r, ut, u, n);
    },
    /**
     * Inject the raw business-docs namespace (vendor, defaults, active
     * invoice/SOW with computed totals + enriched items) into the
     * content object as a `__bd` field. Section components consume
     * this to render structured layouts (real line-items tables,
     * colSpan totals tables) in addition to the prose surface.
     *
     * Visible to the component as `content.__bd.{kind, invoice, sow,
     * items, totals, vendor, defaults}`. The `kind` field is inferred
     * from `block.properties.kind` (explicit) or the slice's title
     * (cover / line items / totals / payment) — matches the four-file
     * invoice composition shipped in the document templates.
     */
    props: (e, t, u) => {
      const r = u.parsedContent?.data, n = Du(r, u), s = u?.website?.config?.business_docs || {}, i = s.vendor || {}, l = s.defaults || {}, f = s.registries?.tax || {}, m = Tr({
        invoice: r?.invoice,
        invoices: xe("invoices", r, u)
      }), h = br({
        sow: r?.sow,
        sows: xe("sows", r, u)
      }), _ = m ? It(m, l, f) : null, g = m && Array.isArray(m.items) ? m.items.map((L) => ({ ...L, amount: au(L) })) : [], N = ws({ params: t, content: e, block: u });
      return {
        content: {
          ...e,
          __bd: { kind: N, invoice: m, sow: h, items: g, totals: _, vendor: i, defaults: l, namespace: n }
        },
        params: t
      };
    }
  },
  // Outputs the foundation supports. NOTE: no `pdf` entry — unipress
  // hardcodes `pdf → typst` in its sink dispatch (src/compile.js
  // pickSink), so declaring `pdf: { via: 'pagedjs' }` here would route
  // the html blob through the typst extractor. v1 ships Paged.js HTML
  // (browser print-to-PDF) and docx for direct files; a typst-based pdf
  // adapter is a v2 follow-up.
  outputs: {
    pagedjs: {
      extension: "html",
      getOptions: Is
    },
    docx: {
      extension: "docx",
      getOptions: Ss
    },
    xlsx: {
      extension: "xlsx",
      getOptions: Os
    }
  }
}, pr = _t(null), Yt = _t(""), de = {
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
}, Wt = _t(de);
function Je() {
  return At(Wt) || de;
}
function Ve(e, t = de) {
  if (!e) return;
  if (typeof e != "string") return e;
  const u = t && t.colors ? t.colors : de.colors;
  return Object.prototype.hasOwnProperty.call(u, e) ? Ru(u[e]) : Ru(e);
}
function Hs(e, t = de) {
  if (!e) return;
  if (typeof e != "string") return e;
  const u = t && t.fonts ? t.fonts : de.fonts;
  return Object.prototype.hasOwnProperty.call(u, e) ? u[e] : e;
}
function Ru(e) {
  return typeof e == "string" && e.startsWith("#") ? e.slice(1) : e;
}
function _r() {
  const e = /* @__PURE__ */ new WeakMap(), t = [], u = (r, n) => `${r}@${n && n.role || "body"}`;
  return {
    register(r, n, s, i = {}) {
      let l = e.get(r);
      l || (l = /* @__PURE__ */ new Map(), e.set(r, l), t.push(r)), l.set(u(n, i), { fragment: s, options: i });
    },
    getOutputs(r) {
      const n = [], s = `${r}@`;
      for (const i of t) {
        const l = e.get(i);
        if (l)
          for (const [f, m] of l)
            f.startsWith(s) && n.push({ block: i, ...m });
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
function Us(e) {
  return e ? {
    colors: { ...de.colors, ...e.colors || {} },
    fonts: { ...de.fonts, ...e.fonts || {} },
    ...Object.fromEntries(
      Object.entries(e).filter(
        ([t]) => t !== "colors" && t !== "fonts"
      )
    )
  } : de;
}
function Ar({
  children: e,
  basePath: t = "",
  theme: u,
  store: r
}) {
  const n = _e(
    () => r || _r(),
    [r]
  ), s = t || "", i = _e(() => Us(u), [u]);
  return n.wrapWithProviders = (l) => kt(
    Yt.Provider,
    { value: s },
    kt(
      Wt.Provider,
      { value: i },
      l
    )
  ), /* @__PURE__ */ E(pr.Provider, { value: n, children: /* @__PURE__ */ E(Yt.Provider, { value: s, children: /* @__PURE__ */ E(Wt.Provider, { value: i, children: e }) }) });
}
function se(e, t, u, r = {}) {
  const n = At(pr);
  if (!n) {
    process.env.NODE_ENV !== "production" && console.warn(
      "useDocumentOutput was called outside of a <DocumentProvider>. Document output will not be registered."
    );
    return;
  }
  n.register(e, t, u, r);
}
const vs = /* @__PURE__ */ new Set([
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
]), P = "�";
var o;
(function(e) {
  e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
})(o || (o = {}));
const Q = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function gr(e) {
  return e >= 55296 && e <= 57343;
}
function Ys(e) {
  return e >= 56320 && e <= 57343;
}
function Ws(e, t) {
  return (e - 55296) * 1024 + 9216 + t;
}
function Nr(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function Ir(e) {
  return e >= 64976 && e <= 65007 || vs.has(e);
}
var b;
(function(e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(b || (b = {}));
const Gs = 65536;
class Ks {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = Gs, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(t, u) {
    const { line: r, col: n, offset: s } = this, i = n + u, l = s + u;
    return {
      code: t,
      startLine: r,
      endLine: r,
      startCol: i,
      endCol: i,
      startOffset: l,
      endOffset: l
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
      const u = this.html.charCodeAt(this.pos + 1);
      if (Ys(u))
        return this.pos++, this._addGap(), Ws(t, u);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, o.EOF;
    return this._err(b.surrogateInInputStream), t;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
  }
  write(t, u) {
    this.html.length > 0 ? this.html += t : this.html = t, this.endOfChunkHit = !1, this.lastChunkWritten = u;
  }
  insertHtmlAtCurrentPos(t) {
    this.html = this.html.substring(0, this.pos + 1) + t + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
  }
  startsWith(t, u) {
    if (this.pos + t.length > this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (u)
      return this.html.startsWith(t, this.pos);
    for (let r = 0; r < t.length; r++)
      if ((this.html.charCodeAt(this.pos + r) | 32) !== t.charCodeAt(r))
        return !1;
    return !0;
  }
  peek(t) {
    const u = this.pos + t;
    if (u >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, o.EOF;
    const r = this.html.charCodeAt(u);
    return r === o.CARRIAGE_RETURN ? o.LINE_FEED : r;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, o.EOF;
    let t = this.html.charCodeAt(this.pos);
    return t === o.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, o.LINE_FEED) : t === o.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, gr(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === o.LINE_FEED || t === o.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    Nr(t) ? this._err(b.controlCharacterInInputStream) : Ir(t) && this._err(b.noncharacterInInputStream);
  }
  retreat(t) {
    for (this.pos -= t; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
var y;
(function(e) {
  e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})(y || (y = {}));
function Cr(e, t) {
  for (let u = e.attrs.length - 1; u >= 0; u--)
    if (e.attrs[u].name === t)
      return e.attrs[u].value;
  return null;
}
const $s = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ 'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), zs = /* @__PURE__ */ new Map([
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
function Qs(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = zs.get(e)) !== null && t !== void 0 ? t : e;
}
var v;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(v || (v = {}));
const qs = 32;
var be;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(be || (be = {}));
function Gt(e) {
  return e >= v.ZERO && e <= v.NINE;
}
function Vs(e) {
  return e >= v.UPPER_A && e <= v.UPPER_F || e >= v.LOWER_A && e <= v.LOWER_F;
}
function js(e) {
  return e >= v.UPPER_A && e <= v.UPPER_Z || e >= v.LOWER_A && e <= v.LOWER_Z || Gt(e);
}
function Xs(e) {
  return e === v.EQUALS || js(e);
}
var U;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(U || (U = {}));
var ie;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(ie || (ie = {}));
class Js {
  constructor(t, u, r) {
    this.decodeTree = t, this.emitCodePoint = u, this.errors = r, this.state = U.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = ie.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = U.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
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
  write(t, u) {
    switch (this.state) {
      case U.EntityStart:
        return t.charCodeAt(u) === v.NUM ? (this.state = U.NumericStart, this.consumed += 1, this.stateNumericStart(t, u + 1)) : (this.state = U.NamedEntity, this.stateNamedEntity(t, u));
      case U.NumericStart:
        return this.stateNumericStart(t, u);
      case U.NumericDecimal:
        return this.stateNumericDecimal(t, u);
      case U.NumericHex:
        return this.stateNumericHex(t, u);
      case U.NamedEntity:
        return this.stateNamedEntity(t, u);
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
  stateNumericStart(t, u) {
    return u >= t.length ? -1 : (t.charCodeAt(u) | qs) === v.LOWER_X ? (this.state = U.NumericHex, this.consumed += 1, this.stateNumericHex(t, u + 1)) : (this.state = U.NumericDecimal, this.stateNumericDecimal(t, u));
  }
  addToNumericResult(t, u, r, n) {
    if (u !== r) {
      const s = r - u;
      this.result = this.result * Math.pow(n, s) + Number.parseInt(t.substr(u, s), n), this.consumed += s;
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
  stateNumericHex(t, u) {
    const r = u;
    for (; u < t.length; ) {
      const n = t.charCodeAt(u);
      if (Gt(n) || Vs(n))
        u += 1;
      else
        return this.addToNumericResult(t, r, u, 16), this.emitNumericEntity(n, 3);
    }
    return this.addToNumericResult(t, r, u, 16), -1;
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
  stateNumericDecimal(t, u) {
    const r = u;
    for (; u < t.length; ) {
      const n = t.charCodeAt(u);
      if (Gt(n))
        u += 1;
      else
        return this.addToNumericResult(t, r, u, 10), this.emitNumericEntity(n, 2);
    }
    return this.addToNumericResult(t, r, u, 10), -1;
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
  emitNumericEntity(t, u) {
    var r;
    if (this.consumed <= u)
      return (r = this.errors) === null || r === void 0 || r.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === v.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === ie.Strict)
      return 0;
    return this.emitCodePoint(Qs(this.result), this.consumed), this.errors && (t !== v.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
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
  stateNamedEntity(t, u) {
    const { decodeTree: r } = this;
    let n = r[this.treeIndex], s = (n & be.VALUE_LENGTH) >> 14;
    for (; u < t.length; u++, this.excess++) {
      const i = t.charCodeAt(u);
      if (this.treeIndex = Zs(r, n, this.treeIndex + Math.max(1, s), i), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === ie.Attribute && // We shouldn't have consumed any characters after the entity,
        (s === 0 || // And there should be no invalid characters.
        Xs(i)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (n = r[this.treeIndex], s = (n & be.VALUE_LENGTH) >> 14, s !== 0) {
        if (i === v.SEMI)
          return this.emitNamedEntityData(this.treeIndex, s, this.consumed + this.excess);
        this.decodeMode !== ie.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
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
    const { result: u, decodeTree: r } = this, n = (r[u] & be.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(u, n, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
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
  emitNamedEntityData(t, u, r) {
    const { decodeTree: n } = this;
    return this.emitCodePoint(u === 1 ? n[t] & ~be.VALUE_LENGTH : n[t + 1], r), u === 3 && this.emitCodePoint(n[t + 2], r), r;
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
      case U.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== ie.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case U.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case U.NumericHex:
        return this.emitNumericEntity(0, 3);
      case U.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case U.EntityStart:
        return 0;
    }
  }
}
function Zs(e, t, u, r) {
  const n = (t & be.BRANCH_LENGTH) >> 7, s = t & be.JUMP_TABLE;
  if (n === 0)
    return s !== 0 && r === s ? u : -1;
  if (s) {
    const f = r - s;
    return f < 0 || f >= n ? -1 : e[u + f] - 1;
  }
  let i = u, l = i + n - 1;
  for (; i <= l; ) {
    const f = i + l >>> 1, m = e[f];
    if (m < r)
      i = f + 1;
    else if (m > r)
      l = f - 1;
    else
      return e[f + n];
  }
  return -1;
}
var p;
(function(e) {
  e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(p || (p = {}));
var Ae;
(function(e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(Ae || (Ae = {}));
var j;
(function(e) {
  e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})(j || (j = {}));
var T;
(function(e) {
  e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(T || (T = {}));
var a;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP";
})(a || (a = {}));
const ei = /* @__PURE__ */ new Map([
  [T.A, a.A],
  [T.ADDRESS, a.ADDRESS],
  [T.ANNOTATION_XML, a.ANNOTATION_XML],
  [T.APPLET, a.APPLET],
  [T.AREA, a.AREA],
  [T.ARTICLE, a.ARTICLE],
  [T.ASIDE, a.ASIDE],
  [T.B, a.B],
  [T.BASE, a.BASE],
  [T.BASEFONT, a.BASEFONT],
  [T.BGSOUND, a.BGSOUND],
  [T.BIG, a.BIG],
  [T.BLOCKQUOTE, a.BLOCKQUOTE],
  [T.BODY, a.BODY],
  [T.BR, a.BR],
  [T.BUTTON, a.BUTTON],
  [T.CAPTION, a.CAPTION],
  [T.CENTER, a.CENTER],
  [T.CODE, a.CODE],
  [T.COL, a.COL],
  [T.COLGROUP, a.COLGROUP],
  [T.DD, a.DD],
  [T.DESC, a.DESC],
  [T.DETAILS, a.DETAILS],
  [T.DIALOG, a.DIALOG],
  [T.DIR, a.DIR],
  [T.DIV, a.DIV],
  [T.DL, a.DL],
  [T.DT, a.DT],
  [T.EM, a.EM],
  [T.EMBED, a.EMBED],
  [T.FIELDSET, a.FIELDSET],
  [T.FIGCAPTION, a.FIGCAPTION],
  [T.FIGURE, a.FIGURE],
  [T.FONT, a.FONT],
  [T.FOOTER, a.FOOTER],
  [T.FOREIGN_OBJECT, a.FOREIGN_OBJECT],
  [T.FORM, a.FORM],
  [T.FRAME, a.FRAME],
  [T.FRAMESET, a.FRAMESET],
  [T.H1, a.H1],
  [T.H2, a.H2],
  [T.H3, a.H3],
  [T.H4, a.H4],
  [T.H5, a.H5],
  [T.H6, a.H6],
  [T.HEAD, a.HEAD],
  [T.HEADER, a.HEADER],
  [T.HGROUP, a.HGROUP],
  [T.HR, a.HR],
  [T.HTML, a.HTML],
  [T.I, a.I],
  [T.IMG, a.IMG],
  [T.IMAGE, a.IMAGE],
  [T.INPUT, a.INPUT],
  [T.IFRAME, a.IFRAME],
  [T.KEYGEN, a.KEYGEN],
  [T.LABEL, a.LABEL],
  [T.LI, a.LI],
  [T.LINK, a.LINK],
  [T.LISTING, a.LISTING],
  [T.MAIN, a.MAIN],
  [T.MALIGNMARK, a.MALIGNMARK],
  [T.MARQUEE, a.MARQUEE],
  [T.MATH, a.MATH],
  [T.MENU, a.MENU],
  [T.META, a.META],
  [T.MGLYPH, a.MGLYPH],
  [T.MI, a.MI],
  [T.MO, a.MO],
  [T.MN, a.MN],
  [T.MS, a.MS],
  [T.MTEXT, a.MTEXT],
  [T.NAV, a.NAV],
  [T.NOBR, a.NOBR],
  [T.NOFRAMES, a.NOFRAMES],
  [T.NOEMBED, a.NOEMBED],
  [T.NOSCRIPT, a.NOSCRIPT],
  [T.OBJECT, a.OBJECT],
  [T.OL, a.OL],
  [T.OPTGROUP, a.OPTGROUP],
  [T.OPTION, a.OPTION],
  [T.P, a.P],
  [T.PARAM, a.PARAM],
  [T.PLAINTEXT, a.PLAINTEXT],
  [T.PRE, a.PRE],
  [T.RB, a.RB],
  [T.RP, a.RP],
  [T.RT, a.RT],
  [T.RTC, a.RTC],
  [T.RUBY, a.RUBY],
  [T.S, a.S],
  [T.SCRIPT, a.SCRIPT],
  [T.SEARCH, a.SEARCH],
  [T.SECTION, a.SECTION],
  [T.SELECT, a.SELECT],
  [T.SOURCE, a.SOURCE],
  [T.SMALL, a.SMALL],
  [T.SPAN, a.SPAN],
  [T.STRIKE, a.STRIKE],
  [T.STRONG, a.STRONG],
  [T.STYLE, a.STYLE],
  [T.SUB, a.SUB],
  [T.SUMMARY, a.SUMMARY],
  [T.SUP, a.SUP],
  [T.TABLE, a.TABLE],
  [T.TBODY, a.TBODY],
  [T.TEMPLATE, a.TEMPLATE],
  [T.TEXTAREA, a.TEXTAREA],
  [T.TFOOT, a.TFOOT],
  [T.TD, a.TD],
  [T.TH, a.TH],
  [T.THEAD, a.THEAD],
  [T.TITLE, a.TITLE],
  [T.TR, a.TR],
  [T.TRACK, a.TRACK],
  [T.TT, a.TT],
  [T.U, a.U],
  [T.UL, a.UL],
  [T.SVG, a.SVG],
  [T.VAR, a.VAR],
  [T.WBR, a.WBR],
  [T.XMP, a.XMP]
]);
function Ct(e) {
  var t;
  return (t = ei.get(e)) !== null && t !== void 0 ? t : a.UNKNOWN;
}
const A = a, ti = {
  [p.HTML]: /* @__PURE__ */ new Set([
    A.ADDRESS,
    A.APPLET,
    A.AREA,
    A.ARTICLE,
    A.ASIDE,
    A.BASE,
    A.BASEFONT,
    A.BGSOUND,
    A.BLOCKQUOTE,
    A.BODY,
    A.BR,
    A.BUTTON,
    A.CAPTION,
    A.CENTER,
    A.COL,
    A.COLGROUP,
    A.DD,
    A.DETAILS,
    A.DIR,
    A.DIV,
    A.DL,
    A.DT,
    A.EMBED,
    A.FIELDSET,
    A.FIGCAPTION,
    A.FIGURE,
    A.FOOTER,
    A.FORM,
    A.FRAME,
    A.FRAMESET,
    A.H1,
    A.H2,
    A.H3,
    A.H4,
    A.H5,
    A.H6,
    A.HEAD,
    A.HEADER,
    A.HGROUP,
    A.HR,
    A.HTML,
    A.IFRAME,
    A.IMG,
    A.INPUT,
    A.LI,
    A.LINK,
    A.LISTING,
    A.MAIN,
    A.MARQUEE,
    A.MENU,
    A.META,
    A.NAV,
    A.NOEMBED,
    A.NOFRAMES,
    A.NOSCRIPT,
    A.OBJECT,
    A.OL,
    A.P,
    A.PARAM,
    A.PLAINTEXT,
    A.PRE,
    A.SCRIPT,
    A.SECTION,
    A.SELECT,
    A.SOURCE,
    A.STYLE,
    A.SUMMARY,
    A.TABLE,
    A.TBODY,
    A.TD,
    A.TEMPLATE,
    A.TEXTAREA,
    A.TFOOT,
    A.TH,
    A.THEAD,
    A.TITLE,
    A.TR,
    A.TRACK,
    A.UL,
    A.WBR,
    A.XMP
  ]),
  [p.MATHML]: /* @__PURE__ */ new Set([A.MI, A.MO, A.MN, A.MS, A.MTEXT, A.ANNOTATION_XML]),
  [p.SVG]: /* @__PURE__ */ new Set([A.TITLE, A.FOREIGN_OBJECT, A.DESC]),
  [p.XLINK]: /* @__PURE__ */ new Set(),
  [p.XML]: /* @__PURE__ */ new Set(),
  [p.XMLNS]: /* @__PURE__ */ new Set()
}, Kt = /* @__PURE__ */ new Set([A.H1, A.H2, A.H3, A.H4, A.H5, A.H6]);
T.STYLE, T.SCRIPT, T.XMP, T.IFRAME, T.NOEMBED, T.NOFRAMES, T.PLAINTEXT;
var c;
(function(e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
})(c || (c = {}));
const q = {
  DATA: c.DATA,
  RCDATA: c.RCDATA,
  RAWTEXT: c.RAWTEXT,
  SCRIPT_DATA: c.SCRIPT_DATA,
  PLAINTEXT: c.PLAINTEXT,
  CDATA_SECTION: c.CDATA_SECTION
};
function ui(e) {
  return e >= o.DIGIT_0 && e <= o.DIGIT_9;
}
function Ye(e) {
  return e >= o.LATIN_CAPITAL_A && e <= o.LATIN_CAPITAL_Z;
}
function ri(e) {
  return e >= o.LATIN_SMALL_A && e <= o.LATIN_SMALL_Z;
}
function me(e) {
  return ri(e) || Ye(e);
}
function Pu(e) {
  return me(e) || ui(e);
}
function rt(e) {
  return e + 32;
}
function Sr(e) {
  return e === o.SPACE || e === o.LINE_FEED || e === o.TABULATION || e === o.FORM_FEED;
}
function Bu(e) {
  return Sr(e) || e === o.SOLIDUS || e === o.GREATER_THAN_SIGN;
}
function ai(e) {
  return e === o.NULL ? b.nullCharacterReference : e > 1114111 ? b.characterReferenceOutsideUnicodeRange : gr(e) ? b.surrogateCharacterReference : Ir(e) ? b.noncharacterCharacterReference : Nr(e) || e === o.CARRIAGE_RETURN ? b.controlCharacterReference : null;
}
class ni {
  constructor(t, u) {
    this.options = t, this.handler = u, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = c.DATA, this.returnState = c.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new Ks(u), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new Js($s, (r, n) => {
      this.preprocessor.pos = this.entityStartPos + n - 1, this._flushCodePointConsumedAsCharacterReference(r);
    }, u.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(b.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (r) => {
        this._err(b.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + r);
      },
      validateNumericCharacterReference: (r) => {
        const n = ai(r);
        n && this._err(n, 1);
      }
    } : void 0);
  }
  //Errors
  _err(t, u = 0) {
    var r, n;
    (n = (r = this.handler).onParseError) === null || n === void 0 || n.call(r, this.preprocessor.getError(t, u));
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
  write(t, u, r) {
    this.active = !0, this.preprocessor.write(t, u), this._runParsingLoop(), this.paused || r?.();
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
    for (let u = 0; u < t; u++)
      this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(t, u) {
    return this.preprocessor.startsWith(t, u) ? (this._advanceBy(t.length - 1), !0) : !1;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: y.START_TAG,
      tagName: "",
      tagID: a.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: y.END_TAG,
      tagName: "",
      tagID: a.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(t) {
    this.currentToken = {
      type: y.COMMENT,
      data: "",
      location: this.getCurrentLocation(t)
    };
  }
  _createDoctypeToken(t) {
    this.currentToken = {
      type: y.DOCTYPE,
      name: t,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(t, u) {
    this.currentCharacterToken = {
      type: t,
      chars: u,
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
    var t, u;
    const r = this.currentToken;
    if (Cr(r, this.currentAttr.name) === null) {
      if (r.attrs.push(this.currentAttr), r.location && this.currentLocation) {
        const n = (t = (u = r.location).attrs) !== null && t !== void 0 ? t : u.attrs = /* @__PURE__ */ Object.create(null);
        n[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(b.duplicateAttribute);
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
    this.prepareToken(t), t.tagID = Ct(t.tagName), t.type === y.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(b.endTagWithAttributes), t.selfClosing && this._err(b.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
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
        case y.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case y.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case y.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const t = this.getCurrentLocation(0);
    t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({ type: y.EOF, location: t }), this.active = !1;
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
  _appendCharToCurrentCharacterToken(t, u) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type === t) {
        this.currentCharacterToken.chars += u;
        return;
      } else
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
    this._createCharacterToken(t, u);
  }
  _emitCodePoint(t) {
    const u = Sr(t) ? y.WHITESPACE_CHARACTER : t === o.NULL ? y.NULL_CHARACTER : y.CHARACTER;
    this._appendCharToCurrentCharacterToken(u, String.fromCodePoint(t));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(t) {
    this._appendCharToCurrentCharacterToken(y.CHARACTER, t);
  }
  // Character reference helpers
  _startCharacterReference() {
    this.returnState = this.state, this.state = c.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? ie.Attribute : ie.Legacy);
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === c.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === c.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === c.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(t) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(t) : this._emitCodePoint(t);
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(t) {
    switch (this.state) {
      case c.DATA: {
        this._stateData(t);
        break;
      }
      case c.RCDATA: {
        this._stateRcdata(t);
        break;
      }
      case c.RAWTEXT: {
        this._stateRawtext(t);
        break;
      }
      case c.SCRIPT_DATA: {
        this._stateScriptData(t);
        break;
      }
      case c.PLAINTEXT: {
        this._statePlaintext(t);
        break;
      }
      case c.TAG_OPEN: {
        this._stateTagOpen(t);
        break;
      }
      case c.END_TAG_OPEN: {
        this._stateEndTagOpen(t);
        break;
      }
      case c.TAG_NAME: {
        this._stateTagName(t);
        break;
      }
      case c.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(t);
        break;
      }
      case c.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(t);
        break;
      }
      case c.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(t);
        break;
      }
      case c.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(t);
        break;
      }
      case c.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(t);
        break;
      }
      case c.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(t);
        break;
      }
      case c.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(t);
        break;
      }
      case c.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(t);
        break;
      }
      case c.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(t);
        break;
      }
      case c.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(t);
        break;
      }
      case c.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(t);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(t);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(t);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(t);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(t);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(t);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(t);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(t);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(t);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(t);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(t);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(t);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(t);
        break;
      }
      case c.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(t);
        break;
      }
      case c.ATTRIBUTE_NAME: {
        this._stateAttributeName(t);
        break;
      }
      case c.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(t);
        break;
      }
      case c.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(t);
        break;
      }
      case c.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(t);
        break;
      }
      case c.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(t);
        break;
      }
      case c.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(t);
        break;
      }
      case c.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(t);
        break;
      }
      case c.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(t);
        break;
      }
      case c.BOGUS_COMMENT: {
        this._stateBogusComment(t);
        break;
      }
      case c.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(t);
        break;
      }
      case c.COMMENT_START: {
        this._stateCommentStart(t);
        break;
      }
      case c.COMMENT_START_DASH: {
        this._stateCommentStartDash(t);
        break;
      }
      case c.COMMENT: {
        this._stateComment(t);
        break;
      }
      case c.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(t);
        break;
      }
      case c.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(t);
        break;
      }
      case c.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(t);
        break;
      }
      case c.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(t);
        break;
      }
      case c.COMMENT_END_DASH: {
        this._stateCommentEndDash(t);
        break;
      }
      case c.COMMENT_END: {
        this._stateCommentEnd(t);
        break;
      }
      case c.COMMENT_END_BANG: {
        this._stateCommentEndBang(t);
        break;
      }
      case c.DOCTYPE: {
        this._stateDoctype(t);
        break;
      }
      case c.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(t);
        break;
      }
      case c.DOCTYPE_NAME: {
        this._stateDoctypeName(t);
        break;
      }
      case c.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(t);
        break;
      }
      case c.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(t);
        break;
      }
      case c.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(t);
        break;
      }
      case c.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(t);
        break;
      }
      case c.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(t);
        break;
      }
      case c.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(t);
        break;
      }
      case c.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
        break;
      }
      case c.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(t);
        break;
      }
      case c.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(t);
        break;
      }
      case c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(t);
        break;
      }
      case c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(t);
        break;
      }
      case c.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(t);
        break;
      }
      case c.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(t);
        break;
      }
      case c.CDATA_SECTION: {
        this._stateCdataSection(t);
        break;
      }
      case c.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(t);
        break;
      }
      case c.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(t);
        break;
      }
      case c.CHARACTER_REFERENCE: {
        this._stateCharacterReference();
        break;
      }
      case c.AMBIGUOUS_AMPERSAND: {
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
      case o.LESS_THAN_SIGN: {
        this.state = c.TAG_OPEN;
        break;
      }
      case o.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this._emitCodePoint(t);
        break;
      }
      case o.EOF: {
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
      case o.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case o.LESS_THAN_SIGN: {
        this.state = c.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case o.EOF: {
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
      case o.LESS_THAN_SIGN: {
        this.state = c.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case o.EOF: {
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
      case o.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case o.EOF: {
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
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case o.EOF: {
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
    if (me(t))
      this._createStartTagToken(), this.state = c.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case o.EXCLAMATION_MARK: {
          this.state = c.MARKUP_DECLARATION_OPEN;
          break;
        }
        case o.SOLIDUS: {
          this.state = c.END_TAG_OPEN;
          break;
        }
        case o.QUESTION_MARK: {
          this._err(b.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = c.BOGUS_COMMENT, this._stateBogusComment(t);
          break;
        }
        case o.EOF: {
          this._err(b.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = c.DATA, this._stateData(t);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(t) {
    if (me(t))
      this._createEndTagToken(), this.state = c.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case o.GREATER_THAN_SIGN: {
          this._err(b.missingEndTagName), this.state = c.DATA;
          break;
        }
        case o.EOF: {
          this._err(b.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = c.BOGUS_COMMENT, this._stateBogusComment(t);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(t) {
    const u = this.currentToken;
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED: {
        this.state = c.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case o.SOLIDUS: {
        this.state = c.SELF_CLOSING_START_TAG;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this.state = c.DATA, this.emitCurrentTagToken();
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), u.tagName += P;
        break;
      }
      case o.EOF: {
        this._err(b.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        u.tagName += String.fromCodePoint(Ye(t) ? rt(t) : t);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(t) {
    t === o.SOLIDUS ? this.state = c.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = c.RCDATA, this._stateRcdata(t));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(t) {
    me(t) ? (this.state = c.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = c.RCDATA, this._stateRcdata(t));
  }
  handleSpecialEndTag(t) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    const u = this.currentToken;
    switch (u.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = c.BEFORE_ATTRIBUTE_NAME, !1;
      case o.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = c.SELF_CLOSING_START_TAG, !1;
      case o.GREATER_THAN_SIGN:
        return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = c.DATA, !1;
      default:
        return !this._ensureHibernation();
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = c.RCDATA, this._stateRcdata(t));
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(t) {
    t === o.SOLIDUS ? this.state = c.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = c.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(t) {
    me(t) ? (this.state = c.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = c.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = c.RAWTEXT, this._stateRawtext(t));
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(t) {
    switch (t) {
      case o.SOLIDUS: {
        this.state = c.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case o.EXCLAMATION_MARK: {
        this.state = c.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"), this.state = c.SCRIPT_DATA, this._stateScriptData(t);
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(t) {
    me(t) ? (this.state = c.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = c.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = c.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(t) {
    t === o.HYPHEN_MINUS ? (this.state = c.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = c.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(t) {
    t === o.HYPHEN_MINUS ? (this.state = c.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = c.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(t) {
    switch (t) {
      case o.HYPHEN_MINUS: {
        this.state = c.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case o.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case o.EOF: {
        this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
      case o.HYPHEN_MINUS: {
        this.state = c.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case o.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this.state = c.SCRIPT_DATA_ESCAPED, this._emitChars(P);
        break;
      }
      case o.EOF: {
        this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = c.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(t) {
    switch (t) {
      case o.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case o.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this.state = c.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this.state = c.SCRIPT_DATA_ESCAPED, this._emitChars(P);
        break;
      }
      case o.EOF: {
        this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = c.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(t) {
    t === o.SOLIDUS ? this.state = c.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : me(t) ? (this._emitChars("<"), this.state = c.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = c.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(t) {
    me(t) ? (this.state = c.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = c.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = c.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(Q.SCRIPT, !1) && Bu(this.preprocessor.peek(Q.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let u = 0; u < Q.SCRIPT.length; u++)
        this._emitCodePoint(this._consume());
      this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else this._ensureHibernation() || (this.state = c.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(t) {
    switch (t) {
      case o.HYPHEN_MINUS: {
        this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case o.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case o.EOF: {
        this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
      case o.HYPHEN_MINUS: {
        this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case o.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(P);
        break;
      }
      case o.EOF: {
        this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(t) {
    switch (t) {
      case o.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case o.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this.state = c.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(P);
        break;
      }
      case o.EOF: {
        this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(t) {
    t === o.SOLIDUS ? (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(t) {
    if (this.preprocessor.startsWith(Q.SCRIPT, !1) && Bu(this.preprocessor.peek(Q.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let u = 0; u < Q.SCRIPT.length; u++)
        this._emitCodePoint(this._consume());
      this.state = c.SCRIPT_DATA_ESCAPED;
    } else this._ensureHibernation() || (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(t) {
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED:
        break;
      case o.SOLIDUS:
      case o.GREATER_THAN_SIGN:
      case o.EOF: {
        this.state = c.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case o.EQUALS_SIGN: {
        this._err(b.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = c.ATTRIBUTE_NAME;
        break;
      }
      default:
        this._createAttr(""), this.state = c.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(t) {
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED:
      case o.SOLIDUS:
      case o.GREATER_THAN_SIGN:
      case o.EOF: {
        this._leaveAttrName(), this.state = c.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case o.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = c.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case o.QUOTATION_MARK:
      case o.APOSTROPHE:
      case o.LESS_THAN_SIGN: {
        this._err(b.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this.currentAttr.name += P;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(Ye(t) ? rt(t) : t);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(t) {
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED:
        break;
      case o.SOLIDUS: {
        this.state = c.SELF_CLOSING_START_TAG;
        break;
      }
      case o.EQUALS_SIGN: {
        this.state = c.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this.state = c.DATA, this.emitCurrentTagToken();
        break;
      }
      case o.EOF: {
        this._err(b.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""), this.state = c.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(t) {
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED:
        break;
      case o.QUOTATION_MARK: {
        this.state = c.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case o.APOSTROPHE: {
        this.state = c.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.missingAttributeValue), this.state = c.DATA, this.emitCurrentTagToken();
        break;
      }
      default:
        this.state = c.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(t);
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(t) {
    switch (t) {
      case o.QUOTATION_MARK: {
        this.state = c.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case o.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this.currentAttr.value += P;
        break;
      }
      case o.EOF: {
        this._err(b.eofInTag), this._emitEOFToken();
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
      case o.APOSTROPHE: {
        this.state = c.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case o.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this.currentAttr.value += P;
        break;
      }
      case o.EOF: {
        this._err(b.eofInTag), this._emitEOFToken();
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
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED: {
        this._leaveAttrValue(), this.state = c.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case o.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = c.DATA, this.emitCurrentTagToken();
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), this.currentAttr.value += P;
        break;
      }
      case o.QUOTATION_MARK:
      case o.APOSTROPHE:
      case o.LESS_THAN_SIGN:
      case o.EQUALS_SIGN:
      case o.GRAVE_ACCENT: {
        this._err(b.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
        break;
      }
      case o.EOF: {
        this._err(b.eofInTag), this._emitEOFToken();
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
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED: {
        this._leaveAttrValue(), this.state = c.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case o.SOLIDUS: {
        this._leaveAttrValue(), this.state = c.SELF_CLOSING_START_TAG;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = c.DATA, this.emitCurrentTagToken();
        break;
      }
      case o.EOF: {
        this._err(b.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(b.missingWhitespaceBetweenAttributes), this.state = c.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(t) {
    switch (t) {
      case o.GREATER_THAN_SIGN: {
        const u = this.currentToken;
        u.selfClosing = !0, this.state = c.DATA, this.emitCurrentTagToken();
        break;
      }
      case o.EOF: {
        this._err(b.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(b.unexpectedSolidusInTag), this.state = c.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(t) {
    const u = this.currentToken;
    switch (t) {
      case o.GREATER_THAN_SIGN: {
        this.state = c.DATA, this.emitCurrentComment(u);
        break;
      }
      case o.EOF: {
        this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), u.data += P;
        break;
      }
      default:
        u.data += String.fromCodePoint(t);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(t) {
    this._consumeSequenceIfMatch(Q.DASH_DASH, !0) ? (this._createCommentToken(Q.DASH_DASH.length + 1), this.state = c.COMMENT_START) : this._consumeSequenceIfMatch(Q.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(Q.DOCTYPE.length + 1), this.state = c.DOCTYPE) : this._consumeSequenceIfMatch(Q.CDATA_START, !0) ? this.inForeignNode ? this.state = c.CDATA_SECTION : (this._err(b.cdataInHtmlContent), this._createCommentToken(Q.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = c.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(b.incorrectlyOpenedComment), this._createCommentToken(2), this.state = c.BOGUS_COMMENT, this._stateBogusComment(t));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(t) {
    switch (t) {
      case o.HYPHEN_MINUS: {
        this.state = c.COMMENT_START_DASH;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.abruptClosingOfEmptyComment), this.state = c.DATA;
        const u = this.currentToken;
        this.emitCurrentComment(u);
        break;
      }
      default:
        this.state = c.COMMENT, this._stateComment(t);
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(t) {
    const u = this.currentToken;
    switch (t) {
      case o.HYPHEN_MINUS: {
        this.state = c.COMMENT_END;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.abruptClosingOfEmptyComment), this.state = c.DATA, this.emitCurrentComment(u);
        break;
      }
      case o.EOF: {
        this._err(b.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "-", this.state = c.COMMENT, this._stateComment(t);
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(t) {
    const u = this.currentToken;
    switch (t) {
      case o.HYPHEN_MINUS: {
        this.state = c.COMMENT_END_DASH;
        break;
      }
      case o.LESS_THAN_SIGN: {
        u.data += "<", this.state = c.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), u.data += P;
        break;
      }
      case o.EOF: {
        this._err(b.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += String.fromCodePoint(t);
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(t) {
    const u = this.currentToken;
    switch (t) {
      case o.EXCLAMATION_MARK: {
        u.data += "!", this.state = c.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case o.LESS_THAN_SIGN: {
        u.data += "<";
        break;
      }
      default:
        this.state = c.COMMENT, this._stateComment(t);
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(t) {
    t === o.HYPHEN_MINUS ? this.state = c.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = c.COMMENT, this._stateComment(t));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(t) {
    t === o.HYPHEN_MINUS ? this.state = c.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = c.COMMENT_END_DASH, this._stateCommentEndDash(t));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(t) {
    t !== o.GREATER_THAN_SIGN && t !== o.EOF && this._err(b.nestedComment), this.state = c.COMMENT_END, this._stateCommentEnd(t);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(t) {
    const u = this.currentToken;
    switch (t) {
      case o.HYPHEN_MINUS: {
        this.state = c.COMMENT_END;
        break;
      }
      case o.EOF: {
        this._err(b.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "-", this.state = c.COMMENT, this._stateComment(t);
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(t) {
    const u = this.currentToken;
    switch (t) {
      case o.GREATER_THAN_SIGN: {
        this.state = c.DATA, this.emitCurrentComment(u);
        break;
      }
      case o.EXCLAMATION_MARK: {
        this.state = c.COMMENT_END_BANG;
        break;
      }
      case o.HYPHEN_MINUS: {
        u.data += "-";
        break;
      }
      case o.EOF: {
        this._err(b.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "--", this.state = c.COMMENT, this._stateComment(t);
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(t) {
    const u = this.currentToken;
    switch (t) {
      case o.HYPHEN_MINUS: {
        u.data += "--!", this.state = c.COMMENT_END_DASH;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.incorrectlyClosedComment), this.state = c.DATA, this.emitCurrentComment(u);
        break;
      }
      case o.EOF: {
        this._err(b.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "--!", this.state = c.COMMENT, this._stateComment(t);
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(t) {
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED: {
        this.state = c.BEFORE_DOCTYPE_NAME;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this.state = c.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), this._createDoctypeToken(null);
        const u = this.currentToken;
        u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(b.missingWhitespaceBeforeDoctypeName), this.state = c.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(t) {
    if (Ye(t))
      this._createDoctypeToken(String.fromCharCode(rt(t))), this.state = c.DOCTYPE_NAME;
    else
      switch (t) {
        case o.SPACE:
        case o.LINE_FEED:
        case o.TABULATION:
        case o.FORM_FEED:
          break;
        case o.NULL: {
          this._err(b.unexpectedNullCharacter), this._createDoctypeToken(P), this.state = c.DOCTYPE_NAME;
          break;
        }
        case o.GREATER_THAN_SIGN: {
          this._err(b.missingDoctypeName), this._createDoctypeToken(null);
          const u = this.currentToken;
          u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = c.DATA;
          break;
        }
        case o.EOF: {
          this._err(b.eofInDoctype), this._createDoctypeToken(null);
          const u = this.currentToken;
          u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(t)), this.state = c.DOCTYPE_NAME;
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(t) {
    const u = this.currentToken;
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED: {
        this.state = c.AFTER_DOCTYPE_NAME;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), u.name += P;
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.name += String.fromCodePoint(Ye(t) ? rt(t) : t);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(t) {
    const u = this.currentToken;
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED:
        break;
      case o.GREATER_THAN_SIGN: {
        this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(Q.PUBLIC, !1) ? this.state = c.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(Q.SYSTEM, !1) ? this.state = c.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(b.invalidCharacterSequenceAfterDoctypeName), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(t) {
    const u = this.currentToken;
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED: {
        this.state = c.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case o.QUOTATION_MARK: {
        this._err(b.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = c.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case o.APOSTROPHE: {
        this._err(b.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = c.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.missingDoctypePublicIdentifier), u.forceQuirks = !0, this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(b.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED:
        break;
      case o.QUOTATION_MARK: {
        u.publicId = "", this.state = c.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case o.APOSTROPHE: {
        u.publicId = "", this.state = c.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.missingDoctypePublicIdentifier), u.forceQuirks = !0, this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(b.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case o.QUOTATION_MARK: {
        this.state = c.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), u.publicId += P;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.abruptDoctypePublicIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.publicId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case o.APOSTROPHE: {
        this.state = c.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), u.publicId += P;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.abruptDoctypePublicIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.publicId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED: {
        this.state = c.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.QUOTATION_MARK: {
        this._err(b.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case o.APOSTROPHE: {
        this._err(b.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(b.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
    const u = this.currentToken;
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED:
        break;
      case o.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.QUOTATION_MARK: {
        u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case o.APOSTROPHE: {
        u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(b.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(t) {
    const u = this.currentToken;
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED: {
        this.state = c.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case o.QUOTATION_MARK: {
        this._err(b.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case o.APOSTROPHE: {
        this._err(b.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.missingDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(b.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED:
        break;
      case o.QUOTATION_MARK: {
        u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case o.APOSTROPHE: {
        u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.missingDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(b.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case o.QUOTATION_MARK: {
        this.state = c.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), u.systemId += P;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.abruptDoctypeSystemIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.systemId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case o.APOSTROPHE: {
        this.state = c.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter), u.systemId += P;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(b.abruptDoctypeSystemIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.systemId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case o.SPACE:
      case o.LINE_FEED:
      case o.TABULATION:
      case o.FORM_FEED:
        break;
      case o.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.EOF: {
        this._err(b.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(b.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(t) {
    const u = this.currentToken;
    switch (t) {
      case o.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.NULL: {
        this._err(b.unexpectedNullCharacter);
        break;
      }
      case o.EOF: {
        this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(t) {
    switch (t) {
      case o.RIGHT_SQUARE_BRACKET: {
        this.state = c.CDATA_SECTION_BRACKET;
        break;
      }
      case o.EOF: {
        this._err(b.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(t) {
    t === o.RIGHT_SQUARE_BRACKET ? this.state = c.CDATA_SECTION_END : (this._emitChars("]"), this.state = c.CDATA_SECTION, this._stateCdataSection(t));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(t) {
    switch (t) {
      case o.GREATER_THAN_SIGN: {
        this.state = c.DATA;
        break;
      }
      case o.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"), this.state = c.CDATA_SECTION, this._stateCdataSection(t);
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
    t === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(o.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && Pu(this.preprocessor.peek(1)) ? c.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    Pu(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === o.SEMICOLON && this._err(b.unknownNamedCharacterReference), this.state = this.returnState, this._callState(t));
  }
}
const Or = /* @__PURE__ */ new Set([a.DD, a.DT, a.LI, a.OPTGROUP, a.OPTION, a.P, a.RB, a.RP, a.RT, a.RTC]), Mu = /* @__PURE__ */ new Set([
  ...Or,
  a.CAPTION,
  a.COLGROUP,
  a.TBODY,
  a.TD,
  a.TFOOT,
  a.TH,
  a.THEAD,
  a.TR
]), mt = /* @__PURE__ */ new Set([
  a.APPLET,
  a.CAPTION,
  a.HTML,
  a.MARQUEE,
  a.OBJECT,
  a.TABLE,
  a.TD,
  a.TEMPLATE,
  a.TH
]), si = /* @__PURE__ */ new Set([...mt, a.OL, a.UL]), ii = /* @__PURE__ */ new Set([...mt, a.BUTTON]), xu = /* @__PURE__ */ new Set([a.ANNOTATION_XML, a.MI, a.MN, a.MO, a.MS, a.MTEXT]), ku = /* @__PURE__ */ new Set([a.DESC, a.FOREIGN_OBJECT, a.TITLE]), oi = /* @__PURE__ */ new Set([a.TR, a.TEMPLATE, a.HTML]), ci = /* @__PURE__ */ new Set([a.TBODY, a.TFOOT, a.THEAD, a.TEMPLATE, a.HTML]), li = /* @__PURE__ */ new Set([a.TABLE, a.TEMPLATE, a.HTML]), di = /* @__PURE__ */ new Set([a.TD, a.TH]);
class fi {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(t, u, r) {
    this.treeAdapter = u, this.handler = r, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = a.UNKNOWN, this.current = t;
  }
  //Index of element
  _indexOf(t) {
    return this.items.lastIndexOf(t, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === a.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === p.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(t, u) {
    this.stackTop++, this.items[this.stackTop] = t, this.current = t, this.tagIDs[this.stackTop] = u, this.currentTagId = u, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(t, u, !0);
  }
  pop() {
    const t = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !0);
  }
  replace(t, u) {
    const r = this._indexOf(t);
    this.items[r] = u, r === this.stackTop && (this.current = u);
  }
  insertAfter(t, u, r) {
    const n = this._indexOf(t) + 1;
    this.items.splice(n, 0, u), this.tagIDs.splice(n, 0, r), this.stackTop++, n === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, n === this.stackTop);
  }
  popUntilTagNamePopped(t) {
    let u = this.stackTop + 1;
    do
      u = this.tagIDs.lastIndexOf(t, u - 1);
    while (u > 0 && this.treeAdapter.getNamespaceURI(this.items[u]) !== p.HTML);
    this.shortenToLength(Math.max(u, 0));
  }
  shortenToLength(t) {
    for (; this.stackTop >= t; ) {
      const u = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(u, this.stackTop < t);
    }
  }
  popUntilElementPopped(t) {
    const u = this._indexOf(t);
    this.shortenToLength(Math.max(u, 0));
  }
  popUntilPopped(t, u) {
    const r = this._indexOfTagNames(t, u);
    this.shortenToLength(Math.max(r, 0));
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(Kt, p.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(di, p.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(t, u) {
    for (let r = this.stackTop; r >= 0; r--)
      if (t.has(this.tagIDs[r]) && this.treeAdapter.getNamespaceURI(this.items[r]) === u)
        return r;
    return -1;
  }
  clearBackTo(t, u) {
    const r = this._indexOfTagNames(t, u);
    this.shortenToLength(r + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(li, p.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(ci, p.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(oi, p.HTML);
  }
  remove(t) {
    const u = this._indexOf(t);
    u >= 0 && (u === this.stackTop ? this.pop() : (this.items.splice(u, 1), this.tagIDs.splice(u, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === a.BODY ? this.items[1] : null;
  }
  contains(t) {
    return this._indexOf(t) > -1;
  }
  getCommonAncestor(t) {
    const u = this._indexOf(t) - 1;
    return u >= 0 ? this.items[u] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === a.HTML;
  }
  //Element in scope
  hasInDynamicScope(t, u) {
    for (let r = this.stackTop; r >= 0; r--) {
      const n = this.tagIDs[r];
      switch (this.treeAdapter.getNamespaceURI(this.items[r])) {
        case p.HTML: {
          if (n === t)
            return !0;
          if (u.has(n))
            return !1;
          break;
        }
        case p.SVG: {
          if (ku.has(n))
            return !1;
          break;
        }
        case p.MATHML: {
          if (xu.has(n))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInScope(t) {
    return this.hasInDynamicScope(t, mt);
  }
  hasInListItemScope(t) {
    return this.hasInDynamicScope(t, si);
  }
  hasInButtonScope(t) {
    return this.hasInDynamicScope(t, ii);
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const u = this.tagIDs[t];
      switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
        case p.HTML: {
          if (Kt.has(u))
            return !0;
          if (mt.has(u))
            return !1;
          break;
        }
        case p.SVG: {
          if (ku.has(u))
            return !1;
          break;
        }
        case p.MATHML: {
          if (xu.has(u))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInTableScope(t) {
    for (let u = this.stackTop; u >= 0; u--)
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === p.HTML)
        switch (this.tagIDs[u]) {
          case t:
            return !0;
          case a.TABLE:
          case a.HTML:
            return !1;
        }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let t = this.stackTop; t >= 0; t--)
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === p.HTML)
        switch (this.tagIDs[t]) {
          case a.TBODY:
          case a.THEAD:
          case a.TFOOT:
            return !0;
          case a.TABLE:
          case a.HTML:
            return !1;
        }
    return !0;
  }
  hasInSelectScope(t) {
    for (let u = this.stackTop; u >= 0; u--)
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === p.HTML)
        switch (this.tagIDs[u]) {
          case t:
            return !0;
          case a.OPTION:
          case a.OPTGROUP:
            break;
          default:
            return !1;
        }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; this.currentTagId !== void 0 && Or.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; this.currentTagId !== void 0 && Mu.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== void 0 && this.currentTagId !== t && Mu.has(this.currentTagId); )
      this.pop();
  }
}
const Mt = 3;
var re;
(function(e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(re || (re = {}));
const wu = { type: re.Marker };
class hi {
  constructor(t) {
    this.treeAdapter = t, this.entries = [], this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(t, u) {
    const r = [], n = u.length, s = this.treeAdapter.getTagName(t), i = this.treeAdapter.getNamespaceURI(t);
    for (let l = 0; l < this.entries.length; l++) {
      const f = this.entries[l];
      if (f.type === re.Marker)
        break;
      const { element: m } = f;
      if (this.treeAdapter.getTagName(m) === s && this.treeAdapter.getNamespaceURI(m) === i) {
        const h = this.treeAdapter.getAttrList(m);
        h.length === n && r.push({ idx: l, attrs: h });
      }
    }
    return r;
  }
  _ensureNoahArkCondition(t) {
    if (this.entries.length < Mt)
      return;
    const u = this.treeAdapter.getAttrList(t), r = this._getNoahArkConditionCandidates(t, u);
    if (r.length < Mt)
      return;
    const n = new Map(u.map((i) => [i.name, i.value]));
    let s = 0;
    for (let i = 0; i < r.length; i++) {
      const l = r[i];
      l.attrs.every((f) => n.get(f.name) === f.value) && (s += 1, s >= Mt && this.entries.splice(l.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(wu);
  }
  pushElement(t, u) {
    this._ensureNoahArkCondition(t), this.entries.unshift({
      type: re.Element,
      element: t,
      token: u
    });
  }
  insertElementAfterBookmark(t, u) {
    const r = this.entries.indexOf(this.bookmark);
    this.entries.splice(r, 0, {
      type: re.Element,
      element: t,
      token: u
    });
  }
  removeEntry(t) {
    const u = this.entries.indexOf(t);
    u !== -1 && this.entries.splice(u, 1);
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    const t = this.entries.indexOf(wu);
    t === -1 ? this.entries.length = 0 : this.entries.splice(0, t + 1);
  }
  //Search
  getElementEntryInScopeWithTagName(t) {
    const u = this.entries.find((r) => r.type === re.Marker || this.treeAdapter.getTagName(r.element) === t);
    return u && u.type === re.Element ? u : null;
  }
  getElementEntry(t) {
    return this.entries.find((u) => u.type === re.Element && u.element === t);
  }
}
const Te = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: j.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(e, t, u) {
    return {
      nodeName: e,
      tagName: e,
      attrs: u,
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
  insertBefore(e, t, u) {
    const r = e.childNodes.indexOf(u);
    e.childNodes.splice(r, 0, t), t.parentNode = e;
  },
  setTemplateContent(e, t) {
    e.content = t;
  },
  getTemplateContent(e) {
    return e.content;
  },
  setDocumentType(e, t, u, r) {
    const n = e.childNodes.find((s) => s.nodeName === "#documentType");
    if (n)
      n.name = t, n.publicId = u, n.systemId = r;
    else {
      const s = {
        nodeName: "#documentType",
        name: t,
        publicId: u,
        systemId: r,
        parentNode: null
      };
      Te.appendChild(e, s);
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
      const u = e.childNodes[e.childNodes.length - 1];
      if (Te.isTextNode(u)) {
        u.value += t;
        return;
      }
    }
    Te.appendChild(e, Te.createTextNode(t));
  },
  insertTextBefore(e, t, u) {
    const r = e.childNodes[e.childNodes.indexOf(u) - 1];
    r && Te.isTextNode(r) ? r.value += t : Te.insertBefore(e, Te.createTextNode(t), u);
  },
  adoptAttributes(e, t) {
    const u = new Set(e.attrs.map((r) => r.name));
    for (let r = 0; r < t.length; r++)
      u.has(t[r].name) || e.attrs.push(t[r]);
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
}, yr = "html", Ei = "about:legacy-compat", mi = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", Dr = [
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
], Ti = [
  ...Dr,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], bi = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), Lr = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], pi = [
  ...Lr,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function Fu(e, t) {
  return t.some((u) => e.startsWith(u));
}
function _i(e) {
  return e.name === yr && e.publicId === null && (e.systemId === null || e.systemId === Ei);
}
function Ai(e) {
  if (e.name !== yr)
    return j.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === mi)
    return j.QUIRKS;
  let { publicId: u } = e;
  if (u !== null) {
    if (u = u.toLowerCase(), bi.has(u))
      return j.QUIRKS;
    let r = t === null ? Ti : Dr;
    if (Fu(u, r))
      return j.QUIRKS;
    if (r = t === null ? Lr : pi, Fu(u, r))
      return j.LIMITED_QUIRKS;
  }
  return j.NO_QUIRKS;
}
const Hu = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, gi = "definitionurl", Ni = "definitionURL", Ii = new Map([
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
].map((e) => [e.toLowerCase(), e])), Ci = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: p.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: p.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: p.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: p.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: p.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: p.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: p.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: p.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: p.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: p.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: p.XMLNS }]
]), Si = new Map([
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
].map((e) => [e.toLowerCase(), e])), Oi = /* @__PURE__ */ new Set([
  a.B,
  a.BIG,
  a.BLOCKQUOTE,
  a.BODY,
  a.BR,
  a.CENTER,
  a.CODE,
  a.DD,
  a.DIV,
  a.DL,
  a.DT,
  a.EM,
  a.EMBED,
  a.H1,
  a.H2,
  a.H3,
  a.H4,
  a.H5,
  a.H6,
  a.HEAD,
  a.HR,
  a.I,
  a.IMG,
  a.LI,
  a.LISTING,
  a.MENU,
  a.META,
  a.NOBR,
  a.OL,
  a.P,
  a.PRE,
  a.RUBY,
  a.S,
  a.SMALL,
  a.SPAN,
  a.STRONG,
  a.STRIKE,
  a.SUB,
  a.SUP,
  a.TABLE,
  a.TT,
  a.U,
  a.UL,
  a.VAR
]);
function yi(e) {
  const t = e.tagID;
  return t === a.FONT && e.attrs.some(({ name: r }) => r === Ae.COLOR || r === Ae.SIZE || r === Ae.FACE) || Oi.has(t);
}
function Rr(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === gi) {
      e.attrs[t].name = Ni;
      break;
    }
}
function Pr(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const u = Ii.get(e.attrs[t].name);
    u != null && (e.attrs[t].name = u);
  }
}
function nu(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const u = Ci.get(e.attrs[t].name);
    u && (e.attrs[t].prefix = u.prefix, e.attrs[t].name = u.name, e.attrs[t].namespace = u.namespace);
  }
}
function Di(e) {
  const t = Si.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = Ct(e.tagName));
}
function Li(e, t) {
  return t === p.MATHML && (e === a.MI || e === a.MO || e === a.MN || e === a.MS || e === a.MTEXT);
}
function Ri(e, t, u) {
  if (t === p.MATHML && e === a.ANNOTATION_XML) {
    for (let r = 0; r < u.length; r++)
      if (u[r].name === Ae.ENCODING) {
        const n = u[r].value.toLowerCase();
        return n === Hu.TEXT_HTML || n === Hu.APPLICATION_XML;
      }
  }
  return t === p.SVG && (e === a.FOREIGN_OBJECT || e === a.DESC || e === a.TITLE);
}
function Pi(e, t, u, r) {
  return (!r || r === p.HTML) && Ri(e, t, u) || (!r || r === p.MATHML) && Li(e, t);
}
const Bi = "hidden", Mi = 8, xi = 3;
var d;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(d || (d = {}));
const ki = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, Br = /* @__PURE__ */ new Set([a.TABLE, a.TBODY, a.TFOOT, a.THEAD, a.TR]), Uu = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: Te,
  onParseError: null
};
class wi {
  constructor(t, u, r = null, n = null) {
    this.fragmentContext = r, this.scriptHandler = n, this.currentToken = null, this.stopped = !1, this.insertionMode = d.INITIAL, this.originalInsertionMode = d.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...Uu,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = u ?? this.treeAdapter.createDocument(), this.tokenizer = new ni(this.options, this), this.activeFormattingElements = new hi(this.treeAdapter), this.fragmentContextID = r ? Ct(this.treeAdapter.getTagName(r)) : a.UNKNOWN, this._setContextModes(r ?? this.document, this.fragmentContextID), this.openElements = new fi(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, u) {
    const r = new this(u);
    return r.tokenizer.write(t, !0), r.document;
  }
  static getFragmentParser(t, u) {
    const r = {
      ...Uu,
      ...u
    };
    t ?? (t = r.treeAdapter.createElement(T.TEMPLATE, p.HTML, []));
    const n = r.treeAdapter.createElement("documentmock", p.HTML, []), s = new this(r, n, t);
    return s.fragmentContextID === a.TEMPLATE && s.tmplInsertionModeStack.unshift(d.IN_TEMPLATE), s._initTokenizerForFragmentParsing(), s._insertFakeRootElement(), s._resetInsertionMode(), s._findFormInFragmentContext(), s;
  }
  getFragment() {
    const t = this.treeAdapter.getFirstChild(this.document), u = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(t, u), u;
  }
  //Errors
  /** @internal */
  _err(t, u, r) {
    var n;
    if (!this.onParseError)
      return;
    const s = (n = t.location) !== null && n !== void 0 ? n : ki, i = {
      code: u,
      startLine: s.startLine,
      startCol: s.startCol,
      startOffset: s.startOffset,
      endLine: r ? s.startLine : s.endLine,
      endCol: r ? s.startCol : s.endCol,
      endOffset: r ? s.startOffset : s.endOffset
    };
    this.onParseError(i);
  }
  //Stack events
  /** @internal */
  onItemPush(t, u, r) {
    var n, s;
    (s = (n = this.treeAdapter).onItemPush) === null || s === void 0 || s.call(n, t), r && this.openElements.stackTop > 0 && this._setContextModes(t, u);
  }
  /** @internal */
  onItemPop(t, u) {
    var r, n;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(t, this.currentToken), (n = (r = this.treeAdapter).onItemPop) === null || n === void 0 || n.call(r, t, this.openElements.current), u) {
      let s, i;
      this.openElements.stackTop === 0 && this.fragmentContext ? (s = this.fragmentContext, i = this.fragmentContextID) : { current: s, currentTagId: i } = this.openElements, this._setContextModes(s, i);
    }
  }
  _setContextModes(t, u) {
    const r = t === this.document || t && this.treeAdapter.getNamespaceURI(t) === p.HTML;
    this.currentNotInHTML = !r, this.tokenizer.inForeignNode = !r && t !== void 0 && u !== void 0 && !this._isIntegrationPoint(u, t);
  }
  /** @protected */
  _switchToTextParsing(t, u) {
    this._insertElement(t, p.HTML), this.tokenizer.state = u, this.originalInsertionMode = this.insertionMode, this.insertionMode = d.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = d.TEXT, this.originalInsertionMode = d.IN_BODY, this.tokenizer.state = q.PLAINTEXT;
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
      if (this.treeAdapter.getTagName(t) === T.FORM) {
        this.formElement = t;
        break;
      }
      t = this.treeAdapter.getParentNode(t);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== p.HTML))
      switch (this.fragmentContextID) {
        case a.TITLE:
        case a.TEXTAREA: {
          this.tokenizer.state = q.RCDATA;
          break;
        }
        case a.STYLE:
        case a.XMP:
        case a.IFRAME:
        case a.NOEMBED:
        case a.NOFRAMES:
        case a.NOSCRIPT: {
          this.tokenizer.state = q.RAWTEXT;
          break;
        }
        case a.SCRIPT: {
          this.tokenizer.state = q.SCRIPT_DATA;
          break;
        }
        case a.PLAINTEXT: {
          this.tokenizer.state = q.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  /** @protected */
  _setDocumentType(t) {
    const u = t.name || "", r = t.publicId || "", n = t.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, u, r, n), t.location) {
      const i = this.treeAdapter.getChildNodes(this.document).find((l) => this.treeAdapter.isDocumentTypeNode(l));
      i && this.treeAdapter.setNodeSourceCodeLocation(i, t.location);
    }
  }
  /** @protected */
  _attachElementToTree(t, u) {
    if (this.options.sourceCodeLocationInfo) {
      const r = u && {
        ...u,
        startTag: u
      };
      this.treeAdapter.setNodeSourceCodeLocation(t, r);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(t);
    else {
      const r = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(r ?? this.document, t);
    }
  }
  /**
   * For self-closing tags. Add an element to the tree, but skip adding it
   * to the stack.
   */
  /** @protected */
  _appendElement(t, u) {
    const r = this.treeAdapter.createElement(t.tagName, u, t.attrs);
    this._attachElementToTree(r, t.location);
  }
  /** @protected */
  _insertElement(t, u) {
    const r = this.treeAdapter.createElement(t.tagName, u, t.attrs);
    this._attachElementToTree(r, t.location), this.openElements.push(r, t.tagID);
  }
  /** @protected */
  _insertFakeElement(t, u) {
    const r = this.treeAdapter.createElement(t, p.HTML, []);
    this._attachElementToTree(r, null), this.openElements.push(r, u);
  }
  /** @protected */
  _insertTemplate(t) {
    const u = this.treeAdapter.createElement(t.tagName, p.HTML, t.attrs), r = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(u, r), this._attachElementToTree(u, t.location), this.openElements.push(u, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(T.HTML, p.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(t, null), this.treeAdapter.appendChild(this.openElements.current, t), this.openElements.push(t, a.HTML);
  }
  /** @protected */
  _appendCommentNode(t, u) {
    const r = this.treeAdapter.createCommentNode(t.data);
    this.treeAdapter.appendChild(u, r), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, t.location);
  }
  /** @protected */
  _insertCharacters(t) {
    let u, r;
    if (this._shouldFosterParentOnInsertion() ? ({ parent: u, beforeElement: r } = this._findFosterParentingLocation(), r ? this.treeAdapter.insertTextBefore(u, t.chars, r) : this.treeAdapter.insertText(u, t.chars)) : (u = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(u, t.chars)), !t.location)
      return;
    const n = this.treeAdapter.getChildNodes(u), s = r ? n.lastIndexOf(r) : n.length, i = n[s - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(i)) {
      const { endLine: f, endCol: m, endOffset: h } = t.location;
      this.treeAdapter.updateNodeSourceCodeLocation(i, { endLine: f, endCol: m, endOffset: h });
    } else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(i, t.location);
  }
  /** @protected */
  _adoptNodes(t, u) {
    for (let r = this.treeAdapter.getFirstChild(t); r; r = this.treeAdapter.getFirstChild(t))
      this.treeAdapter.detachNode(r), this.treeAdapter.appendChild(u, r);
  }
  /** @protected */
  _setEndLocation(t, u) {
    if (this.treeAdapter.getNodeSourceCodeLocation(t) && u.location) {
      const r = u.location, n = this.treeAdapter.getTagName(t), s = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        u.type === y.END_TAG && n === u.tagName ? {
          endTag: { ...r },
          endLine: r.endLine,
          endCol: r.endCol,
          endOffset: r.endOffset
        } : {
          endLine: r.startLine,
          endCol: r.startCol,
          endOffset: r.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(t, s);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(t) {
    if (!this.currentNotInHTML)
      return !1;
    let u, r;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (u = this.fragmentContext, r = this.fragmentContextID) : { current: u, currentTagId: r } = this.openElements, t.tagID === a.SVG && this.treeAdapter.getTagName(u) === T.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(u) === p.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (t.tagID === a.MGLYPH || t.tagID === a.MALIGNMARK) && r !== void 0 && !this._isIntegrationPoint(r, u, p.HTML)
    );
  }
  /** @protected */
  _processToken(t) {
    switch (t.type) {
      case y.CHARACTER: {
        this.onCharacter(t);
        break;
      }
      case y.NULL_CHARACTER: {
        this.onNullCharacter(t);
        break;
      }
      case y.COMMENT: {
        this.onComment(t);
        break;
      }
      case y.DOCTYPE: {
        this.onDoctype(t);
        break;
      }
      case y.START_TAG: {
        this._processStartTag(t);
        break;
      }
      case y.END_TAG: {
        this.onEndTag(t);
        break;
      }
      case y.EOF: {
        this.onEof(t);
        break;
      }
      case y.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(t);
        break;
      }
    }
  }
  //Integration points
  /** @protected */
  _isIntegrationPoint(t, u, r) {
    const n = this.treeAdapter.getNamespaceURI(u), s = this.treeAdapter.getAttrList(u);
    return Pi(t, n, s, r);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const u = this.activeFormattingElements.entries.findIndex((n) => n.type === re.Marker || this.openElements.contains(n.element)), r = u === -1 ? t - 1 : u - 1;
      for (let n = r; n >= 0; n--) {
        const s = this.activeFormattingElements.entries[n];
        this._insertElement(s.token, this.treeAdapter.getNamespaceURI(s.element)), s.element = this.openElements.current;
      }
    }
  }
  //Close elements
  /** @protected */
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = d.IN_ROW;
  }
  /** @protected */
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(a.P), this.openElements.popUntilTagNamePopped(a.P);
  }
  //Insertion modes
  /** @protected */
  _resetInsertionMode() {
    for (let t = this.openElements.stackTop; t >= 0; t--)
      switch (t === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[t]) {
        case a.TR: {
          this.insertionMode = d.IN_ROW;
          return;
        }
        case a.TBODY:
        case a.THEAD:
        case a.TFOOT: {
          this.insertionMode = d.IN_TABLE_BODY;
          return;
        }
        case a.CAPTION: {
          this.insertionMode = d.IN_CAPTION;
          return;
        }
        case a.COLGROUP: {
          this.insertionMode = d.IN_COLUMN_GROUP;
          return;
        }
        case a.TABLE: {
          this.insertionMode = d.IN_TABLE;
          return;
        }
        case a.BODY: {
          this.insertionMode = d.IN_BODY;
          return;
        }
        case a.FRAMESET: {
          this.insertionMode = d.IN_FRAMESET;
          return;
        }
        case a.SELECT: {
          this._resetInsertionModeForSelect(t);
          return;
        }
        case a.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case a.HTML: {
          this.insertionMode = this.headElement ? d.AFTER_HEAD : d.BEFORE_HEAD;
          return;
        }
        case a.TD:
        case a.TH: {
          if (t > 0) {
            this.insertionMode = d.IN_CELL;
            return;
          }
          break;
        }
        case a.HEAD: {
          if (t > 0) {
            this.insertionMode = d.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = d.IN_BODY;
  }
  /** @protected */
  _resetInsertionModeForSelect(t) {
    if (t > 0)
      for (let u = t - 1; u > 0; u--) {
        const r = this.openElements.tagIDs[u];
        if (r === a.TEMPLATE)
          break;
        if (r === a.TABLE) {
          this.insertionMode = d.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = d.IN_SELECT;
  }
  //Foster parenting
  /** @protected */
  _isElementCausesFosterParenting(t) {
    return Br.has(t);
  }
  /** @protected */
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  /** @protected */
  _findFosterParentingLocation() {
    for (let t = this.openElements.stackTop; t >= 0; t--) {
      const u = this.openElements.items[t];
      switch (this.openElements.tagIDs[t]) {
        case a.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(u) === p.HTML)
            return { parent: this.treeAdapter.getTemplateContent(u), beforeElement: null };
          break;
        }
        case a.TABLE: {
          const r = this.treeAdapter.getParentNode(u);
          return r ? { parent: r, beforeElement: u } : { parent: this.openElements.items[t - 1], beforeElement: null };
        }
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  /** @protected */
  _fosterParentElement(t) {
    const u = this._findFosterParentingLocation();
    u.beforeElement ? this.treeAdapter.insertBefore(u.parent, t, u.beforeElement) : this.treeAdapter.appendChild(u.parent, t);
  }
  //Special elements
  /** @protected */
  _isSpecialElement(t, u) {
    const r = this.treeAdapter.getNamespaceURI(t);
    return ti[r].has(u);
  }
  /** @internal */
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      hc(this, t);
      return;
    }
    switch (this.insertionMode) {
      case d.INITIAL: {
        we(this, t);
        break;
      }
      case d.BEFORE_HTML: {
        We(this, t);
        break;
      }
      case d.BEFORE_HEAD: {
        Ge(this, t);
        break;
      }
      case d.IN_HEAD: {
        Ke(this, t);
        break;
      }
      case d.IN_HEAD_NO_SCRIPT: {
        $e(this, t);
        break;
      }
      case d.AFTER_HEAD: {
        ze(this, t);
        break;
      }
      case d.IN_BODY:
      case d.IN_CAPTION:
      case d.IN_CELL:
      case d.IN_TEMPLATE: {
        xr(this, t);
        break;
      }
      case d.TEXT:
      case d.IN_SELECT:
      case d.IN_SELECT_IN_TABLE: {
        this._insertCharacters(t);
        break;
      }
      case d.IN_TABLE:
      case d.IN_TABLE_BODY:
      case d.IN_ROW: {
        xt(this, t);
        break;
      }
      case d.IN_TABLE_TEXT: {
        vr(this, t);
        break;
      }
      case d.IN_COLUMN_GROUP: {
        Tt(this, t);
        break;
      }
      case d.AFTER_BODY: {
        bt(this, t);
        break;
      }
      case d.AFTER_AFTER_BODY: {
        lt(this, t);
        break;
      }
    }
  }
  /** @internal */
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      fc(this, t);
      return;
    }
    switch (this.insertionMode) {
      case d.INITIAL: {
        we(this, t);
        break;
      }
      case d.BEFORE_HTML: {
        We(this, t);
        break;
      }
      case d.BEFORE_HEAD: {
        Ge(this, t);
        break;
      }
      case d.IN_HEAD: {
        Ke(this, t);
        break;
      }
      case d.IN_HEAD_NO_SCRIPT: {
        $e(this, t);
        break;
      }
      case d.AFTER_HEAD: {
        ze(this, t);
        break;
      }
      case d.TEXT: {
        this._insertCharacters(t);
        break;
      }
      case d.IN_TABLE:
      case d.IN_TABLE_BODY:
      case d.IN_ROW: {
        xt(this, t);
        break;
      }
      case d.IN_COLUMN_GROUP: {
        Tt(this, t);
        break;
      }
      case d.AFTER_BODY: {
        bt(this, t);
        break;
      }
      case d.AFTER_AFTER_BODY: {
        lt(this, t);
        break;
      }
    }
  }
  /** @internal */
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      $t(this, t);
      return;
    }
    switch (this.insertionMode) {
      case d.INITIAL:
      case d.BEFORE_HTML:
      case d.BEFORE_HEAD:
      case d.IN_HEAD:
      case d.IN_HEAD_NO_SCRIPT:
      case d.AFTER_HEAD:
      case d.IN_BODY:
      case d.IN_TABLE:
      case d.IN_CAPTION:
      case d.IN_COLUMN_GROUP:
      case d.IN_TABLE_BODY:
      case d.IN_ROW:
      case d.IN_CELL:
      case d.IN_SELECT:
      case d.IN_SELECT_IN_TABLE:
      case d.IN_TEMPLATE:
      case d.IN_FRAMESET:
      case d.AFTER_FRAMESET: {
        $t(this, t);
        break;
      }
      case d.IN_TABLE_TEXT: {
        Fe(this, t);
        break;
      }
      case d.AFTER_BODY: {
        Gi(this, t);
        break;
      }
      case d.AFTER_AFTER_BODY:
      case d.AFTER_AFTER_FRAMESET: {
        Ki(this, t);
        break;
      }
    }
  }
  /** @internal */
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case d.INITIAL: {
        $i(this, t);
        break;
      }
      case d.BEFORE_HEAD:
      case d.IN_HEAD:
      case d.IN_HEAD_NO_SCRIPT:
      case d.AFTER_HEAD: {
        this._err(t, b.misplacedDoctype);
        break;
      }
      case d.IN_TABLE_TEXT: {
        Fe(this, t);
        break;
      }
    }
  }
  /** @internal */
  onStartTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, b.nonVoidHtmlElementStartTagWithTrailingSolidus);
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
    this.shouldProcessStartTagTokenInForeignContent(t) ? Ec(this, t) : this._startTagOutsideForeignContent(t);
  }
  /** @protected */
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case d.INITIAL: {
        we(this, t);
        break;
      }
      case d.BEFORE_HTML: {
        zi(this, t);
        break;
      }
      case d.BEFORE_HEAD: {
        qi(this, t);
        break;
      }
      case d.IN_HEAD: {
        te(this, t);
        break;
      }
      case d.IN_HEAD_NO_SCRIPT: {
        Xi(this, t);
        break;
      }
      case d.AFTER_HEAD: {
        Zi(this, t);
        break;
      }
      case d.IN_BODY: {
        K(this, t);
        break;
      }
      case d.IN_TABLE: {
        ke(this, t);
        break;
      }
      case d.IN_TABLE_TEXT: {
        Fe(this, t);
        break;
      }
      case d.IN_CAPTION: {
        jo(this, t);
        break;
      }
      case d.IN_COLUMN_GROUP: {
        ou(this, t);
        break;
      }
      case d.IN_TABLE_BODY: {
        yt(this, t);
        break;
      }
      case d.IN_ROW: {
        Dt(this, t);
        break;
      }
      case d.IN_CELL: {
        Zo(this, t);
        break;
      }
      case d.IN_SELECT: {
        Gr(this, t);
        break;
      }
      case d.IN_SELECT_IN_TABLE: {
        tc(this, t);
        break;
      }
      case d.IN_TEMPLATE: {
        rc(this, t);
        break;
      }
      case d.AFTER_BODY: {
        nc(this, t);
        break;
      }
      case d.IN_FRAMESET: {
        sc(this, t);
        break;
      }
      case d.AFTER_FRAMESET: {
        oc(this, t);
        break;
      }
      case d.AFTER_AFTER_BODY: {
        lc(this, t);
        break;
      }
      case d.AFTER_AFTER_FRAMESET: {
        dc(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? mc(this, t) : this._endTagOutsideForeignContent(t);
  }
  /** @protected */
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case d.INITIAL: {
        we(this, t);
        break;
      }
      case d.BEFORE_HTML: {
        Qi(this, t);
        break;
      }
      case d.BEFORE_HEAD: {
        Vi(this, t);
        break;
      }
      case d.IN_HEAD: {
        ji(this, t);
        break;
      }
      case d.IN_HEAD_NO_SCRIPT: {
        Ji(this, t);
        break;
      }
      case d.AFTER_HEAD: {
        eo(this, t);
        break;
      }
      case d.IN_BODY: {
        Ot(this, t);
        break;
      }
      case d.TEXT: {
        vo(this, t);
        break;
      }
      case d.IN_TABLE: {
        je(this, t);
        break;
      }
      case d.IN_TABLE_TEXT: {
        Fe(this, t);
        break;
      }
      case d.IN_CAPTION: {
        Xo(this, t);
        break;
      }
      case d.IN_COLUMN_GROUP: {
        Jo(this, t);
        break;
      }
      case d.IN_TABLE_BODY: {
        zt(this, t);
        break;
      }
      case d.IN_ROW: {
        Wr(this, t);
        break;
      }
      case d.IN_CELL: {
        ec(this, t);
        break;
      }
      case d.IN_SELECT: {
        Kr(this, t);
        break;
      }
      case d.IN_SELECT_IN_TABLE: {
        uc(this, t);
        break;
      }
      case d.IN_TEMPLATE: {
        ac(this, t);
        break;
      }
      case d.AFTER_BODY: {
        zr(this, t);
        break;
      }
      case d.IN_FRAMESET: {
        ic(this, t);
        break;
      }
      case d.AFTER_FRAMESET: {
        cc(this, t);
        break;
      }
      case d.AFTER_AFTER_BODY: {
        lt(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEof(t) {
    switch (this.insertionMode) {
      case d.INITIAL: {
        we(this, t);
        break;
      }
      case d.BEFORE_HTML: {
        We(this, t);
        break;
      }
      case d.BEFORE_HEAD: {
        Ge(this, t);
        break;
      }
      case d.IN_HEAD: {
        Ke(this, t);
        break;
      }
      case d.IN_HEAD_NO_SCRIPT: {
        $e(this, t);
        break;
      }
      case d.AFTER_HEAD: {
        ze(this, t);
        break;
      }
      case d.IN_BODY:
      case d.IN_TABLE:
      case d.IN_CAPTION:
      case d.IN_COLUMN_GROUP:
      case d.IN_TABLE_BODY:
      case d.IN_ROW:
      case d.IN_CELL:
      case d.IN_SELECT:
      case d.IN_SELECT_IN_TABLE: {
        Hr(this, t);
        break;
      }
      case d.TEXT: {
        Yo(this, t);
        break;
      }
      case d.IN_TABLE_TEXT: {
        Fe(this, t);
        break;
      }
      case d.IN_TEMPLATE: {
        $r(this, t);
        break;
      }
      case d.AFTER_BODY:
      case d.IN_FRAMESET:
      case d.AFTER_FRAMESET:
      case d.AFTER_AFTER_BODY:
      case d.AFTER_AFTER_FRAMESET: {
        iu(this, t);
        break;
      }
    }
  }
  /** @internal */
  onWhitespaceCharacter(t) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, t.chars.charCodeAt(0) === o.LINE_FEED)) {
      if (t.chars.length === 1)
        return;
      t.chars = t.chars.substr(1);
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(t);
      return;
    }
    switch (this.insertionMode) {
      case d.IN_HEAD:
      case d.IN_HEAD_NO_SCRIPT:
      case d.AFTER_HEAD:
      case d.TEXT:
      case d.IN_COLUMN_GROUP:
      case d.IN_SELECT:
      case d.IN_SELECT_IN_TABLE:
      case d.IN_FRAMESET:
      case d.AFTER_FRAMESET: {
        this._insertCharacters(t);
        break;
      }
      case d.IN_BODY:
      case d.IN_CAPTION:
      case d.IN_CELL:
      case d.IN_TEMPLATE:
      case d.AFTER_BODY:
      case d.AFTER_AFTER_BODY:
      case d.AFTER_AFTER_FRAMESET: {
        Mr(this, t);
        break;
      }
      case d.IN_TABLE:
      case d.IN_TABLE_BODY:
      case d.IN_ROW: {
        xt(this, t);
        break;
      }
      case d.IN_TABLE_TEXT: {
        Ur(this, t);
        break;
      }
    }
  }
}
function Fi(e, t) {
  let u = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return u ? e.openElements.contains(u.element) ? e.openElements.hasInScope(t.tagID) || (u = null) : (e.activeFormattingElements.removeEntry(u), u = null) : Fr(e, t), u;
}
function Hi(e, t) {
  let u = null, r = e.openElements.stackTop;
  for (; r >= 0; r--) {
    const n = e.openElements.items[r];
    if (n === t.element)
      break;
    e._isSpecialElement(n, e.openElements.tagIDs[r]) && (u = n);
  }
  return u || (e.openElements.shortenToLength(Math.max(r, 0)), e.activeFormattingElements.removeEntry(t)), u;
}
function Ui(e, t, u) {
  let r = t, n = e.openElements.getCommonAncestor(t);
  for (let s = 0, i = n; i !== u; s++, i = n) {
    n = e.openElements.getCommonAncestor(i);
    const l = e.activeFormattingElements.getElementEntry(i), f = l && s >= xi;
    !l || f ? (f && e.activeFormattingElements.removeEntry(l), e.openElements.remove(i)) : (i = vi(e, l), r === t && (e.activeFormattingElements.bookmark = l), e.treeAdapter.detachNode(r), e.treeAdapter.appendChild(i, r), r = i);
  }
  return r;
}
function vi(e, t) {
  const u = e.treeAdapter.getNamespaceURI(t.element), r = e.treeAdapter.createElement(t.token.tagName, u, t.token.attrs);
  return e.openElements.replace(t.element, r), t.element = r, r;
}
function Yi(e, t, u) {
  const r = e.treeAdapter.getTagName(t), n = Ct(r);
  if (e._isElementCausesFosterParenting(n))
    e._fosterParentElement(u);
  else {
    const s = e.treeAdapter.getNamespaceURI(t);
    n === a.TEMPLATE && s === p.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, u);
  }
}
function Wi(e, t, u) {
  const r = e.treeAdapter.getNamespaceURI(u.element), { token: n } = u, s = e.treeAdapter.createElement(n.tagName, r, n.attrs);
  e._adoptNodes(t, s), e.treeAdapter.appendChild(t, s), e.activeFormattingElements.insertElementAfterBookmark(s, n), e.activeFormattingElements.removeEntry(u), e.openElements.remove(u.element), e.openElements.insertAfter(t, s, n.tagID);
}
function su(e, t) {
  for (let u = 0; u < Mi; u++) {
    const r = Fi(e, t);
    if (!r)
      break;
    const n = Hi(e, r);
    if (!n)
      break;
    e.activeFormattingElements.bookmark = r;
    const s = Ui(e, n, r.element), i = e.openElements.getCommonAncestor(r.element);
    e.treeAdapter.detachNode(s), i && Yi(e, i, s), Wi(e, n, r);
  }
}
function $t(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function Gi(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function Ki(e, t) {
  e._appendCommentNode(t, e.document);
}
function iu(e, t) {
  if (e.stopped = !0, t.location) {
    const u = e.fragmentContext ? 0 : 2;
    for (let r = e.openElements.stackTop; r >= u; r--)
      e._setEndLocation(e.openElements.items[r], t);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const r = e.openElements.items[0], n = e.treeAdapter.getNodeSourceCodeLocation(r);
      if (n && !n.endTag && (e._setEndLocation(r, t), e.openElements.stackTop >= 1)) {
        const s = e.openElements.items[1], i = e.treeAdapter.getNodeSourceCodeLocation(s);
        i && !i.endTag && e._setEndLocation(s, t);
      }
    }
  }
}
function $i(e, t) {
  e._setDocumentType(t);
  const u = t.forceQuirks ? j.QUIRKS : Ai(t);
  _i(t) || e._err(t, b.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, u), e.insertionMode = d.BEFORE_HTML;
}
function we(e, t) {
  e._err(t, b.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, j.QUIRKS), e.insertionMode = d.BEFORE_HTML, e._processToken(t);
}
function zi(e, t) {
  t.tagID === a.HTML ? (e._insertElement(t, p.HTML), e.insertionMode = d.BEFORE_HEAD) : We(e, t);
}
function Qi(e, t) {
  const u = t.tagID;
  (u === a.HTML || u === a.HEAD || u === a.BODY || u === a.BR) && We(e, t);
}
function We(e, t) {
  e._insertFakeRootElement(), e.insertionMode = d.BEFORE_HEAD, e._processToken(t);
}
function qi(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      K(e, t);
      break;
    }
    case a.HEAD: {
      e._insertElement(t, p.HTML), e.headElement = e.openElements.current, e.insertionMode = d.IN_HEAD;
      break;
    }
    default:
      Ge(e, t);
  }
}
function Vi(e, t) {
  const u = t.tagID;
  u === a.HEAD || u === a.BODY || u === a.HTML || u === a.BR ? Ge(e, t) : e._err(t, b.endTagWithoutMatchingOpenElement);
}
function Ge(e, t) {
  e._insertFakeElement(T.HEAD, a.HEAD), e.headElement = e.openElements.current, e.insertionMode = d.IN_HEAD, e._processToken(t);
}
function te(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      K(e, t);
      break;
    }
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META: {
      e._appendElement(t, p.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.TITLE: {
      e._switchToTextParsing(t, q.RCDATA);
      break;
    }
    case a.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(t, q.RAWTEXT) : (e._insertElement(t, p.HTML), e.insertionMode = d.IN_HEAD_NO_SCRIPT);
      break;
    }
    case a.NOFRAMES:
    case a.STYLE: {
      e._switchToTextParsing(t, q.RAWTEXT);
      break;
    }
    case a.SCRIPT: {
      e._switchToTextParsing(t, q.SCRIPT_DATA);
      break;
    }
    case a.TEMPLATE: {
      e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = d.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(d.IN_TEMPLATE);
      break;
    }
    case a.HEAD: {
      e._err(t, b.misplacedStartTagForHeadElement);
      break;
    }
    default:
      Ke(e, t);
  }
}
function ji(e, t) {
  switch (t.tagID) {
    case a.HEAD: {
      e.openElements.pop(), e.insertionMode = d.AFTER_HEAD;
      break;
    }
    case a.BODY:
    case a.BR:
    case a.HTML: {
      Ke(e, t);
      break;
    }
    case a.TEMPLATE: {
      Oe(e, t);
      break;
    }
    default:
      e._err(t, b.endTagWithoutMatchingOpenElement);
  }
}
function Oe(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== a.TEMPLATE && e._err(t, b.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, b.endTagWithoutMatchingOpenElement);
}
function Ke(e, t) {
  e.openElements.pop(), e.insertionMode = d.AFTER_HEAD, e._processToken(t);
}
function Xi(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      K(e, t);
      break;
    }
    case a.BASEFONT:
    case a.BGSOUND:
    case a.HEAD:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.STYLE: {
      te(e, t);
      break;
    }
    case a.NOSCRIPT: {
      e._err(t, b.nestedNoscriptInHead);
      break;
    }
    default:
      $e(e, t);
  }
}
function Ji(e, t) {
  switch (t.tagID) {
    case a.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = d.IN_HEAD;
      break;
    }
    case a.BR: {
      $e(e, t);
      break;
    }
    default:
      e._err(t, b.endTagWithoutMatchingOpenElement);
  }
}
function $e(e, t) {
  const u = t.type === y.EOF ? b.openElementsLeftAfterEof : b.disallowedContentInNoscriptInHead;
  e._err(t, u), e.openElements.pop(), e.insertionMode = d.IN_HEAD, e._processToken(t);
}
function Zi(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      K(e, t);
      break;
    }
    case a.BODY: {
      e._insertElement(t, p.HTML), e.framesetOk = !1, e.insertionMode = d.IN_BODY;
      break;
    }
    case a.FRAMESET: {
      e._insertElement(t, p.HTML), e.insertionMode = d.IN_FRAMESET;
      break;
    }
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.SCRIPT:
    case a.STYLE:
    case a.TEMPLATE:
    case a.TITLE: {
      e._err(t, b.abandonedHeadElementChild), e.openElements.push(e.headElement, a.HEAD), te(e, t), e.openElements.remove(e.headElement);
      break;
    }
    case a.HEAD: {
      e._err(t, b.misplacedStartTagForHeadElement);
      break;
    }
    default:
      ze(e, t);
  }
}
function eo(e, t) {
  switch (t.tagID) {
    case a.BODY:
    case a.HTML:
    case a.BR: {
      ze(e, t);
      break;
    }
    case a.TEMPLATE: {
      Oe(e, t);
      break;
    }
    default:
      e._err(t, b.endTagWithoutMatchingOpenElement);
  }
}
function ze(e, t) {
  e._insertFakeElement(T.BODY, a.BODY), e.insertionMode = d.IN_BODY, St(e, t);
}
function St(e, t) {
  switch (t.type) {
    case y.CHARACTER: {
      xr(e, t);
      break;
    }
    case y.WHITESPACE_CHARACTER: {
      Mr(e, t);
      break;
    }
    case y.COMMENT: {
      $t(e, t);
      break;
    }
    case y.START_TAG: {
      K(e, t);
      break;
    }
    case y.END_TAG: {
      Ot(e, t);
      break;
    }
    case y.EOF: {
      Hr(e, t);
      break;
    }
  }
}
function Mr(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function xr(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function to(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function uo(e, t) {
  const u = e.openElements.tryPeekProperlyNestedBodyElement();
  u && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(u, t.attrs));
}
function ro(e, t) {
  const u = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && u && (e.treeAdapter.detachNode(u), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, p.HTML), e.insertionMode = d.IN_FRAMESET);
}
function ao(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, p.HTML);
}
function no(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && Kt.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, p.HTML);
}
function so(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, p.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function io(e, t) {
  const u = e.openElements.tmplCount > 0;
  (!e.formElement || u) && (e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, p.HTML), u || (e.formElement = e.openElements.current));
}
function oo(e, t) {
  e.framesetOk = !1;
  const u = t.tagID;
  for (let r = e.openElements.stackTop; r >= 0; r--) {
    const n = e.openElements.tagIDs[r];
    if (u === a.LI && n === a.LI || (u === a.DD || u === a.DT) && (n === a.DD || n === a.DT)) {
      e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.popUntilTagNamePopped(n);
      break;
    }
    if (n !== a.ADDRESS && n !== a.DIV && n !== a.P && e._isSpecialElement(e.openElements.items[r], n))
      break;
  }
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, p.HTML);
}
function co(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, p.HTML), e.tokenizer.state = q.PLAINTEXT;
}
function lo(e, t) {
  e.openElements.hasInScope(a.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, p.HTML), e.framesetOk = !1;
}
function fo(e, t) {
  const u = e.activeFormattingElements.getElementEntryInScopeWithTagName(T.A);
  u && (su(e, t), e.openElements.remove(u.element), e.activeFormattingElements.removeEntry(u)), e._reconstructActiveFormattingElements(), e._insertElement(t, p.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function ho(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, p.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Eo(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(a.NOBR) && (su(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, p.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function mo(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, p.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function To(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== j.QUIRKS && e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, p.HTML), e.framesetOk = !1, e.insertionMode = d.IN_TABLE;
}
function kr(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, p.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function wr(e) {
  const t = Cr(e, Ae.TYPE);
  return t != null && t.toLowerCase() === Bi;
}
function bo(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, p.HTML), wr(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function po(e, t) {
  e._appendElement(t, p.HTML), t.ackSelfClosing = !0;
}
function _o(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._appendElement(t, p.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function Ao(e, t) {
  t.tagName = T.IMG, t.tagID = a.IMG, kr(e, t);
}
function go(e, t) {
  e._insertElement(t, p.HTML), e.skipNextNewLine = !0, e.tokenizer.state = q.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = d.TEXT;
}
function No(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, q.RAWTEXT);
}
function Io(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, q.RAWTEXT);
}
function vu(e, t) {
  e._switchToTextParsing(t, q.RAWTEXT);
}
function Co(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, p.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === d.IN_TABLE || e.insertionMode === d.IN_CAPTION || e.insertionMode === d.IN_TABLE_BODY || e.insertionMode === d.IN_ROW || e.insertionMode === d.IN_CELL ? d.IN_SELECT_IN_TABLE : d.IN_SELECT;
}
function So(e, t) {
  e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, p.HTML);
}
function Oo(e, t) {
  e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, p.HTML);
}
function yo(e, t) {
  e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(a.RTC), e._insertElement(t, p.HTML);
}
function Do(e, t) {
  e._reconstructActiveFormattingElements(), Rr(t), nu(t), t.selfClosing ? e._appendElement(t, p.MATHML) : e._insertElement(t, p.MATHML), t.ackSelfClosing = !0;
}
function Lo(e, t) {
  e._reconstructActiveFormattingElements(), Pr(t), nu(t), t.selfClosing ? e._appendElement(t, p.SVG) : e._insertElement(t, p.SVG), t.ackSelfClosing = !0;
}
function Yu(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, p.HTML);
}
function K(e, t) {
  switch (t.tagID) {
    case a.I:
    case a.S:
    case a.B:
    case a.U:
    case a.EM:
    case a.TT:
    case a.BIG:
    case a.CODE:
    case a.FONT:
    case a.SMALL:
    case a.STRIKE:
    case a.STRONG: {
      ho(e, t);
      break;
    }
    case a.A: {
      fo(e, t);
      break;
    }
    case a.H1:
    case a.H2:
    case a.H3:
    case a.H4:
    case a.H5:
    case a.H6: {
      no(e, t);
      break;
    }
    case a.P:
    case a.DL:
    case a.OL:
    case a.UL:
    case a.DIV:
    case a.DIR:
    case a.NAV:
    case a.MAIN:
    case a.MENU:
    case a.ASIDE:
    case a.CENTER:
    case a.FIGURE:
    case a.FOOTER:
    case a.HEADER:
    case a.HGROUP:
    case a.DIALOG:
    case a.DETAILS:
    case a.ADDRESS:
    case a.ARTICLE:
    case a.SEARCH:
    case a.SECTION:
    case a.SUMMARY:
    case a.FIELDSET:
    case a.BLOCKQUOTE:
    case a.FIGCAPTION: {
      ao(e, t);
      break;
    }
    case a.LI:
    case a.DD:
    case a.DT: {
      oo(e, t);
      break;
    }
    case a.BR:
    case a.IMG:
    case a.WBR:
    case a.AREA:
    case a.EMBED:
    case a.KEYGEN: {
      kr(e, t);
      break;
    }
    case a.HR: {
      _o(e, t);
      break;
    }
    case a.RB:
    case a.RTC: {
      Oo(e, t);
      break;
    }
    case a.RT:
    case a.RP: {
      yo(e, t);
      break;
    }
    case a.PRE:
    case a.LISTING: {
      so(e, t);
      break;
    }
    case a.XMP: {
      No(e, t);
      break;
    }
    case a.SVG: {
      Lo(e, t);
      break;
    }
    case a.HTML: {
      to(e, t);
      break;
    }
    case a.BASE:
    case a.LINK:
    case a.META:
    case a.STYLE:
    case a.TITLE:
    case a.SCRIPT:
    case a.BGSOUND:
    case a.BASEFONT:
    case a.TEMPLATE: {
      te(e, t);
      break;
    }
    case a.BODY: {
      uo(e, t);
      break;
    }
    case a.FORM: {
      io(e, t);
      break;
    }
    case a.NOBR: {
      Eo(e, t);
      break;
    }
    case a.MATH: {
      Do(e, t);
      break;
    }
    case a.TABLE: {
      To(e, t);
      break;
    }
    case a.INPUT: {
      bo(e, t);
      break;
    }
    case a.PARAM:
    case a.TRACK:
    case a.SOURCE: {
      po(e, t);
      break;
    }
    case a.IMAGE: {
      Ao(e, t);
      break;
    }
    case a.BUTTON: {
      lo(e, t);
      break;
    }
    case a.APPLET:
    case a.OBJECT:
    case a.MARQUEE: {
      mo(e, t);
      break;
    }
    case a.IFRAME: {
      Io(e, t);
      break;
    }
    case a.SELECT: {
      Co(e, t);
      break;
    }
    case a.OPTION:
    case a.OPTGROUP: {
      So(e, t);
      break;
    }
    case a.NOEMBED:
    case a.NOFRAMES: {
      vu(e, t);
      break;
    }
    case a.FRAMESET: {
      ro(e, t);
      break;
    }
    case a.TEXTAREA: {
      go(e, t);
      break;
    }
    case a.NOSCRIPT: {
      e.options.scriptingEnabled ? vu(e, t) : Yu(e, t);
      break;
    }
    case a.PLAINTEXT: {
      co(e, t);
      break;
    }
    case a.COL:
    case a.TH:
    case a.TD:
    case a.TR:
    case a.HEAD:
    case a.FRAME:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.CAPTION:
    case a.COLGROUP:
      break;
    default:
      Yu(e, t);
  }
}
function Ro(e, t) {
  if (e.openElements.hasInScope(a.BODY) && (e.insertionMode = d.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const u = e.openElements.tryPeekProperlyNestedBodyElement();
    u && e._setEndLocation(u, t);
  }
}
function Po(e, t) {
  e.openElements.hasInScope(a.BODY) && (e.insertionMode = d.AFTER_BODY, zr(e, t));
}
function Bo(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u));
}
function Mo(e) {
  const t = e.openElements.tmplCount > 0, { formElement: u } = e;
  t || (e.formElement = null), (u || t) && e.openElements.hasInScope(a.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(a.FORM) : u && e.openElements.remove(u));
}
function xo(e) {
  e.openElements.hasInButtonScope(a.P) || e._insertFakeElement(T.P, a.P), e._closePElement();
}
function ko(e) {
  e.openElements.hasInListItemScope(a.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(a.LI), e.openElements.popUntilTagNamePopped(a.LI));
}
function wo(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTagsWithExclusion(u), e.openElements.popUntilTagNamePopped(u));
}
function Fo(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function Ho(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker());
}
function Uo(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(T.BR, a.BR), e.openElements.pop(), e.framesetOk = !1;
}
function Fr(e, t) {
  const u = t.tagName, r = t.tagID;
  for (let n = e.openElements.stackTop; n > 0; n--) {
    const s = e.openElements.items[n], i = e.openElements.tagIDs[n];
    if (r === i && (r !== a.UNKNOWN || e.treeAdapter.getTagName(s) === u)) {
      e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.stackTop >= n && e.openElements.shortenToLength(n);
      break;
    }
    if (e._isSpecialElement(s, i))
      break;
  }
}
function Ot(e, t) {
  switch (t.tagID) {
    case a.A:
    case a.B:
    case a.I:
    case a.S:
    case a.U:
    case a.EM:
    case a.TT:
    case a.BIG:
    case a.CODE:
    case a.FONT:
    case a.NOBR:
    case a.SMALL:
    case a.STRIKE:
    case a.STRONG: {
      su(e, t);
      break;
    }
    case a.P: {
      xo(e);
      break;
    }
    case a.DL:
    case a.UL:
    case a.OL:
    case a.DIR:
    case a.DIV:
    case a.NAV:
    case a.PRE:
    case a.MAIN:
    case a.MENU:
    case a.ASIDE:
    case a.BUTTON:
    case a.CENTER:
    case a.FIGURE:
    case a.FOOTER:
    case a.HEADER:
    case a.HGROUP:
    case a.DIALOG:
    case a.ADDRESS:
    case a.ARTICLE:
    case a.DETAILS:
    case a.SEARCH:
    case a.SECTION:
    case a.SUMMARY:
    case a.LISTING:
    case a.FIELDSET:
    case a.BLOCKQUOTE:
    case a.FIGCAPTION: {
      Bo(e, t);
      break;
    }
    case a.LI: {
      ko(e);
      break;
    }
    case a.DD:
    case a.DT: {
      wo(e, t);
      break;
    }
    case a.H1:
    case a.H2:
    case a.H3:
    case a.H4:
    case a.H5:
    case a.H6: {
      Fo(e);
      break;
    }
    case a.BR: {
      Uo(e);
      break;
    }
    case a.BODY: {
      Ro(e, t);
      break;
    }
    case a.HTML: {
      Po(e, t);
      break;
    }
    case a.FORM: {
      Mo(e);
      break;
    }
    case a.APPLET:
    case a.OBJECT:
    case a.MARQUEE: {
      Ho(e, t);
      break;
    }
    case a.TEMPLATE: {
      Oe(e, t);
      break;
    }
    default:
      Fr(e, t);
  }
}
function Hr(e, t) {
  e.tmplInsertionModeStack.length > 0 ? $r(e, t) : iu(e, t);
}
function vo(e, t) {
  var u;
  t.tagID === a.SCRIPT && ((u = e.scriptHandler) === null || u === void 0 || u.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function Yo(e, t) {
  e._err(t, b.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function xt(e, t) {
  if (e.openElements.currentTagId !== void 0 && Br.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = d.IN_TABLE_TEXT, t.type) {
      case y.CHARACTER: {
        vr(e, t);
        break;
      }
      case y.WHITESPACE_CHARACTER: {
        Ur(e, t);
        break;
      }
    }
  else
    Ze(e, t);
}
function Wo(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, p.HTML), e.insertionMode = d.IN_CAPTION;
}
function Go(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, p.HTML), e.insertionMode = d.IN_COLUMN_GROUP;
}
function Ko(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(T.COLGROUP, a.COLGROUP), e.insertionMode = d.IN_COLUMN_GROUP, ou(e, t);
}
function $o(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, p.HTML), e.insertionMode = d.IN_TABLE_BODY;
}
function zo(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(T.TBODY, a.TBODY), e.insertionMode = d.IN_TABLE_BODY, yt(e, t);
}
function Qo(e, t) {
  e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function qo(e, t) {
  wr(t) ? e._appendElement(t, p.HTML) : Ze(e, t), t.ackSelfClosing = !0;
}
function Vo(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, p.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function ke(e, t) {
  switch (t.tagID) {
    case a.TD:
    case a.TH:
    case a.TR: {
      zo(e, t);
      break;
    }
    case a.STYLE:
    case a.SCRIPT:
    case a.TEMPLATE: {
      te(e, t);
      break;
    }
    case a.COL: {
      Ko(e, t);
      break;
    }
    case a.FORM: {
      Vo(e, t);
      break;
    }
    case a.TABLE: {
      Qo(e, t);
      break;
    }
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      $o(e, t);
      break;
    }
    case a.INPUT: {
      qo(e, t);
      break;
    }
    case a.CAPTION: {
      Wo(e, t);
      break;
    }
    case a.COLGROUP: {
      Go(e, t);
      break;
    }
    default:
      Ze(e, t);
  }
}
function je(e, t) {
  switch (t.tagID) {
    case a.TABLE: {
      e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode());
      break;
    }
    case a.TEMPLATE: {
      Oe(e, t);
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TBODY:
    case a.TD:
    case a.TFOOT:
    case a.TH:
    case a.THEAD:
    case a.TR:
      break;
    default:
      Ze(e, t);
  }
}
function Ze(e, t) {
  const u = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, St(e, t), e.fosterParentingEnabled = u;
}
function Ur(e, t) {
  e.pendingCharacterTokens.push(t);
}
function vr(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function Fe(e, t) {
  let u = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; u < e.pendingCharacterTokens.length; u++)
      Ze(e, e.pendingCharacterTokens[u]);
  else
    for (; u < e.pendingCharacterTokens.length; u++)
      e._insertCharacters(e.pendingCharacterTokens[u]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const Yr = /* @__PURE__ */ new Set([a.CAPTION, a.COL, a.COLGROUP, a.TBODY, a.TD, a.TFOOT, a.TH, a.THEAD, a.TR]);
function jo(e, t) {
  const u = t.tagID;
  Yr.has(u) ? e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = d.IN_TABLE, ke(e, t)) : K(e, t);
}
function Xo(e, t) {
  const u = t.tagID;
  switch (u) {
    case a.CAPTION:
    case a.TABLE: {
      e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = d.IN_TABLE, u === a.TABLE && je(e, t));
      break;
    }
    case a.BODY:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TBODY:
    case a.TD:
    case a.TFOOT:
    case a.TH:
    case a.THEAD:
    case a.TR:
      break;
    default:
      Ot(e, t);
  }
}
function ou(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      K(e, t);
      break;
    }
    case a.COL: {
      e._appendElement(t, p.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.TEMPLATE: {
      te(e, t);
      break;
    }
    default:
      Tt(e, t);
  }
}
function Jo(e, t) {
  switch (t.tagID) {
    case a.COLGROUP: {
      e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = d.IN_TABLE);
      break;
    }
    case a.TEMPLATE: {
      Oe(e, t);
      break;
    }
    case a.COL:
      break;
    default:
      Tt(e, t);
  }
}
function Tt(e, t) {
  e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = d.IN_TABLE, e._processToken(t));
}
function yt(e, t) {
  switch (t.tagID) {
    case a.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, p.HTML), e.insertionMode = d.IN_ROW;
      break;
    }
    case a.TH:
    case a.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(T.TR, a.TR), e.insertionMode = d.IN_ROW, Dt(e, t);
      break;
    }
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE, ke(e, t));
      break;
    }
    default:
      ke(e, t);
  }
}
function zt(e, t) {
  const u = t.tagID;
  switch (t.tagID) {
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.openElements.hasInTableScope(u) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE);
      break;
    }
    case a.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE, je(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TD:
    case a.TH:
    case a.TR:
      break;
    default:
      je(e, t);
  }
}
function Dt(e, t) {
  switch (t.tagID) {
    case a.TH:
    case a.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(t, p.HTML), e.insertionMode = d.IN_CELL, e.activeFormattingElements.insertMarker();
      break;
    }
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.TR: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE_BODY, yt(e, t));
      break;
    }
    default:
      ke(e, t);
  }
}
function Wr(e, t) {
  switch (t.tagID) {
    case a.TR: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE_BODY);
      break;
    }
    case a.TABLE: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE_BODY, zt(e, t));
      break;
    }
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(a.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE_BODY, zt(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TD:
    case a.TH:
      break;
    default:
      je(e, t);
  }
}
function Zo(e, t) {
  const u = t.tagID;
  Yr.has(u) ? (e.openElements.hasInTableScope(a.TD) || e.openElements.hasInTableScope(a.TH)) && (e._closeTableCell(), Dt(e, t)) : K(e, t);
}
function ec(e, t) {
  const u = t.tagID;
  switch (u) {
    case a.TD:
    case a.TH: {
      e.openElements.hasInTableScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = d.IN_ROW);
      break;
    }
    case a.TABLE:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.TR: {
      e.openElements.hasInTableScope(u) && (e._closeTableCell(), Wr(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
      break;
    default:
      Ot(e, t);
  }
}
function Gr(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      K(e, t);
      break;
    }
    case a.OPTION: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._insertElement(t, p.HTML);
      break;
    }
    case a.OPTGROUP: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(), e._insertElement(t, p.HTML);
      break;
    }
    case a.HR: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(), e._appendElement(t, p.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.INPUT:
    case a.KEYGEN:
    case a.TEXTAREA:
    case a.SELECT: {
      e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), t.tagID !== a.SELECT && e._processStartTag(t));
      break;
    }
    case a.SCRIPT:
    case a.TEMPLATE: {
      te(e, t);
      break;
    }
  }
}
function Kr(e, t) {
  switch (t.tagID) {
    case a.OPTGROUP: {
      e.openElements.stackTop > 0 && e.openElements.currentTagId === a.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === a.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop();
      break;
    }
    case a.OPTION: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop();
      break;
    }
    case a.SELECT: {
      e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode());
      break;
    }
    case a.TEMPLATE: {
      Oe(e, t);
      break;
    }
  }
}
function tc(e, t) {
  const u = t.tagID;
  u === a.CAPTION || u === a.TABLE || u === a.TBODY || u === a.TFOOT || u === a.THEAD || u === a.TR || u === a.TD || u === a.TH ? (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : Gr(e, t);
}
function uc(e, t) {
  const u = t.tagID;
  u === a.CAPTION || u === a.TABLE || u === a.TBODY || u === a.TFOOT || u === a.THEAD || u === a.TR || u === a.TD || u === a.TH ? e.openElements.hasInTableScope(u) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : Kr(e, t);
}
function rc(e, t) {
  switch (t.tagID) {
    // First, handle tags that can start without a mode change
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.SCRIPT:
    case a.STYLE:
    case a.TEMPLATE:
    case a.TITLE: {
      te(e, t);
      break;
    }
    // Re-process the token in the appropriate mode
    case a.CAPTION:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.tmplInsertionModeStack[0] = d.IN_TABLE, e.insertionMode = d.IN_TABLE, ke(e, t);
      break;
    }
    case a.COL: {
      e.tmplInsertionModeStack[0] = d.IN_COLUMN_GROUP, e.insertionMode = d.IN_COLUMN_GROUP, ou(e, t);
      break;
    }
    case a.TR: {
      e.tmplInsertionModeStack[0] = d.IN_TABLE_BODY, e.insertionMode = d.IN_TABLE_BODY, yt(e, t);
      break;
    }
    case a.TD:
    case a.TH: {
      e.tmplInsertionModeStack[0] = d.IN_ROW, e.insertionMode = d.IN_ROW, Dt(e, t);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = d.IN_BODY, e.insertionMode = d.IN_BODY, K(e, t);
  }
}
function ac(e, t) {
  t.tagID === a.TEMPLATE && Oe(e, t);
}
function $r(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : iu(e, t);
}
function nc(e, t) {
  t.tagID === a.HTML ? K(e, t) : bt(e, t);
}
function zr(e, t) {
  var u;
  if (t.tagID === a.HTML) {
    if (e.fragmentContext || (e.insertionMode = d.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === a.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const r = e.openElements.items[1];
      r && !(!((u = e.treeAdapter.getNodeSourceCodeLocation(r)) === null || u === void 0) && u.endTag) && e._setEndLocation(r, t);
    }
  } else
    bt(e, t);
}
function bt(e, t) {
  e.insertionMode = d.IN_BODY, St(e, t);
}
function sc(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      K(e, t);
      break;
    }
    case a.FRAMESET: {
      e._insertElement(t, p.HTML);
      break;
    }
    case a.FRAME: {
      e._appendElement(t, p.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.NOFRAMES: {
      te(e, t);
      break;
    }
  }
}
function ic(e, t) {
  t.tagID === a.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== a.FRAMESET && (e.insertionMode = d.AFTER_FRAMESET));
}
function oc(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      K(e, t);
      break;
    }
    case a.NOFRAMES: {
      te(e, t);
      break;
    }
  }
}
function cc(e, t) {
  t.tagID === a.HTML && (e.insertionMode = d.AFTER_AFTER_FRAMESET);
}
function lc(e, t) {
  t.tagID === a.HTML ? K(e, t) : lt(e, t);
}
function lt(e, t) {
  e.insertionMode = d.IN_BODY, St(e, t);
}
function dc(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      K(e, t);
      break;
    }
    case a.NOFRAMES: {
      te(e, t);
      break;
    }
  }
}
function fc(e, t) {
  t.chars = P, e._insertCharacters(t);
}
function hc(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function Qr(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== p.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function Ec(e, t) {
  if (yi(t))
    Qr(e), e._startTagOutsideForeignContent(t);
  else {
    const u = e._getAdjustedCurrentElement(), r = e.treeAdapter.getNamespaceURI(u);
    r === p.MATHML ? Rr(t) : r === p.SVG && (Di(t), Pr(t)), nu(t), t.selfClosing ? e._appendElement(t, r) : e._insertElement(t, r), t.ackSelfClosing = !0;
  }
}
function mc(e, t) {
  if (t.tagID === a.P || t.tagID === a.BR) {
    Qr(e), e._endTagOutsideForeignContent(t);
    return;
  }
  for (let u = e.openElements.stackTop; u > 0; u--) {
    const r = e.openElements.items[u];
    if (e.treeAdapter.getNamespaceURI(r) === p.HTML) {
      e._endTagOutsideForeignContent(t);
      break;
    }
    const n = e.treeAdapter.getTagName(r);
    if (n.toLowerCase() === t.tagName) {
      t.tagName = n, e.openElements.shortenToLength(u);
      break;
    }
  }
}
T.AREA, T.BASE, T.BASEFONT, T.BGSOUND, T.BR, T.COL, T.EMBED, T.FRAME, T.HR, T.IMG, T.INPUT, T.KEYGEN, T.LINK, T.META, T.PARAM, T.SOURCE, T.TRACK, T.WBR;
function Tc(e, t, u) {
  typeof e == "string" && (u = t, t = e, e = null);
  const r = wi.getFragmentParser(e, u);
  return r.tokenizer.write(t, !0), r.getFragment();
}
const bc = () => ({}), He = () => !0, Ee = (e) => {
  const t = parseInt(e, 10);
  return Number.isFinite(t) ? t : e;
}, pc = (e) => typeof e != "string" ? e : e.split(",").map((t) => t.trim()).filter(Boolean).map((t) => parseInt(t, 10)).filter((t) => Number.isFinite(t)), _c = {
  "data-underline": { path: ["underline"], transform: bc },
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
  "data-grid-span": { path: ["columnSpan"], transform: Ee },
  // Cell row merge: how many rows this cell spans (vertical merge).
  // The adapter uses docx's `rowSpan` shorthand, which expects only
  // the *starting* cell to declare a count; library handles the
  // merge-continue rows internally.
  "data-row-span": { path: ["rowSpan"], transform: Ee },
  // ------------------------------------------------------------------
  // Stage 3 — paragraph polish
  // ------------------------------------------------------------------
  // Paragraph indentation. All values are twips. `firstLine` and
  // `hanging` are positive; `left` and `right` may be negative.
  "data-indent-left": { path: ["indent", "left"], transform: Ee },
  "data-indent-right": { path: ["indent", "right"], transform: Ee },
  "data-indent-firstline": { path: ["indent", "firstLine"], transform: Ee },
  "data-indent-hanging": { path: ["indent", "hanging"], transform: Ee },
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
  "data-smallcaps": { path: ["smallCaps"], transform: He },
  "data-allcaps": { path: ["allCaps"], transform: He },
  "data-strike": { path: ["strike"], transform: He },
  // Row-level: whether the row repeats as a header on each new page
  // when the table breaks. Presence-only — any truthy value counts.
  "data-row-header": { path: ["tableHeader"], transform: He },
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
    transform: pc
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
    transform: Ee
  },
  "data-floating-verticalposition-relative": {
    path: ["floating", "verticalPosition", "relative"]
  },
  "data-floating-verticalposition-align": {
    path: ["floating", "verticalPosition", "align"]
  },
  "data-floating-verticalposition-offset": {
    path: ["floating", "verticalPosition", "offset"],
    transform: Ee
  },
  // Page breaks — maps to DocxParagraph({ pageBreakBefore: true })
  // in the adapter. Presence attribute: any truthy value counts.
  "data-page-break-before": { path: ["pageBreakBefore"], transform: He },
  // Table of contents options — consumed by the tableOfContents node
  // type in the adapter (src/adapters/docx.js). See docx library's
  // ITableOfContentsOptions for the full shape; these are the three
  // useful ones and any additional data-toc-* attribute falls through
  // to the default rule below.
  "data-toc-title": { path: ["toc", "title"] },
  "data-toc-hyperlink": { path: ["toc", "hyperlink"] },
  "data-toc-heading-range": { path: ["toc", "headingRange"] }
};
function Ac(e, t, u) {
  let r = e;
  for (let n = 0; n < t.length - 1; n++) {
    const s = t[n];
    (!r[s] || typeof r[s] != "object") && (r[s] = {}), r = r[s];
  }
  r[t[t.length - 1]] = u;
}
function gc(e) {
  const t = {};
  for (const { name: u, value: r } of e) {
    if (!u.startsWith("data-") || u === "data-type") continue;
    const n = _c[u];
    if (n) {
      const s = n.transform ? n.transform(r) : r;
      Ac(t, n.path, s);
    } else {
      const s = u.slice(5);
      t[s] = r;
    }
  }
  return t;
}
function Nc(e) {
  const t = Tc(e);
  return Qt(t);
}
const Ic = /* @__PURE__ */ new Set([
  "link",
  "meta",
  "script",
  "style",
  "base",
  "title",
  "noscript"
]);
function Cc(e) {
  if (e.nodeName === "#text") {
    const l = e.value;
    return l && l.trim() ? { type: "text", content: l } : null;
  }
  if (!e.tagName) return null;
  const t = e.tagName.toLowerCase();
  if (Ic.has(t)) return null;
  const r = Sc(e, "data-type") || t;
  if (r === "emptyLine") return null;
  if (r === "contentWrapper")
    return Qt(e);
  const n = gc(e.attrs || []), s = Qt(e), i = { type: r, ...n };
  return r === "text" ? i.content = s.map((l) => l.content || "").join("") : s.length > 0 && (i.children = s), i;
}
function Qt(e) {
  const t = [], u = e.childNodes || [];
  for (const r of u) {
    const n = Cc(r);
    n != null && (Array.isArray(n) ? t.push(...n) : t.push(n));
  }
  return t;
}
function Sc(e, t) {
  if (!e.attrs) return null;
  for (const u of e.attrs)
    if (u.name === t) return u.value;
  return null;
}
const Oc = {
  docx: { load: () => import("./docx-CvPyWWkt.js"), consumes: "docx", ir: !0 },
  xlsx: { load: () => import("./xlsx-ByoeiX6E.js"), consumes: "xlsx", ir: !1 },
  typst: { load: () => import("./typst-D1mCGM3j.js"), consumes: "typst", ir: !0 },
  // LaTeX consumes its own input key. Foundations targeting both Typst
  // and LaTeX register under each format separately — same JSX, two
  // useDocumentOutput calls — so the adapters can diverge as the
  // formats need without forcing a shared input shape.
  latex: { load: () => import("./latex-BmGgHrIt.js"), consumes: "latex", ir: !0 },
  // Paged.js consumes 'html' — an input shape shared with EPUB below.
  // Foundations register once under 'html' and both adapters read it.
  pagedjs: { load: () => import("./pagedjs-C8Aj7-d3.js"), consumes: "html", ir: !1 },
  epub: { load: () => import("./epub-B0ZP6SKM.js"), consumes: "html", ir: !1 }
};
function cu(e) {
  const t = Oc[e];
  return t ? {
    load: t.load,
    consumes: t.consumes || e,
    ir: t.ir !== !1
    // default to true for safety on under-specified entries
  } : null;
}
async function yc(e, t, u = {}) {
  const r = cu(e);
  if (!r)
    throw new Error(`Unsupported document format: "${e}"`);
  const n = await r.load(), s = n.compileDocx || n.compileXlsx || n.compileTypst || n.compileLatex || n.compilePagedjs || n.compileEpub || n.compilePdf;
  if (!s)
    throw new Error(
      `Format adapter "${e}" does not export a compile function.`
    );
  return s(t, u);
}
function Dc(e, t) {
  const u = cu(t);
  if (!u)
    return { sections: [], header: null, footer: null, metadata: null };
  const r = e.getOutputs(u.consumes) || [];
  return u.ir ? Lc(r, e) : u.consumes === "html" ? Rc(r, e) : Pc(r);
}
function Lc(e, t) {
  let u = null, r = null, n = null, s = !1, i = !1;
  const l = [], f = t.wrapWithProviders || ((m) => m);
  for (const { fragment: m, options: h } of e) {
    const _ = h.role || "body";
    if (_ === "metadata") {
      u = m;
      continue;
    }
    const g = Jt(f(m)), N = Nc(g);
    switch (_) {
      case "header":
        r = N, h.applyTo === "first" && (s = !0);
        break;
      case "footer":
        n = N, h.applyTo === "first" && (i = !0);
        break;
      default:
        l.push(N);
        break;
    }
  }
  return {
    sections: l,
    header: r,
    footer: n,
    metadata: u,
    headerFirstPageOnly: s,
    footerFirstPageOnly: i
  };
}
function Rc(e, t) {
  const u = t.wrapWithProviders || ((s) => s);
  let r = null;
  const n = [];
  for (const { fragment: s, options: i } of e) {
    const l = i.role || "body";
    if (l === "metadata") {
      r = s;
      continue;
    }
    if (l !== "body") continue;
    const f = Jt(u(s));
    n.push(f);
  }
  return { sections: n, metadata: r };
}
function Pc(e) {
  return { sections: e.map(({ fragment: u }) => u).filter(Boolean) };
}
function Bc(e, t) {
  if (typeof document > "u") return;
  const u = URL.createObjectURL(e), r = document.createElement("a");
  r.href = u, r.download = t, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(u);
}
function Mc(e, t, u = {}) {
  const { basePath: r, theme: n } = u, s = _r();
  return Jt(
    kt(
      Ar,
      { store: s, basePath: r, theme: n },
      e
    )
  ), xc(s, t), Dc(s, t);
}
const Wu = /* @__PURE__ */ new Set();
function xc(e, t) {
  const u = cu(t);
  if (!u) return;
  const r = u.consumes;
  if (!(Wu.has(r) || (e.getOutputs && e.getOutputs(r) || []).length > 0) && (Wu.add(r), typeof console < "u" && console.warn)) {
    const s = r === t ? `compileSubtree('${t}') found 0 registered sections. Did any section component call useDocumentOutput(block, '${t}', ...)?` : `compileSubtree('${t}') found 0 sections registered under input key '${r}'. Sections should call useDocumentOutput(block, '${r}', ...) (the output format '${t}' reads fragments registered under '${r}').`;
    console.warn(
      `@uniweb/press: ${s} Sections registered for a different input key do not cross-register.`
    );
  }
}
async function Gu(e, t, u = {}) {
  const { basePath: r, theme: n, adapterOptions: s = {} } = u, i = Mc(e, t, { basePath: r, theme: n });
  return yc(t, i, s);
}
async function kc(e, t = {}) {
  if (e !== null && typeof e == "object" && // React elements have a $$typeof symbol; duck-typing avoids needing
  // `import { isValidElement } from 'react'` (minor, but keeps this
  // file free of React imports it doesn't otherwise need).
  !!e.$$typeof) {
    const { format: ue, ...z } = t;
    if (!ue)
      throw new Error(
        "compileDocument: 'format' is required (tree mode)."
      );
    return Gu(e, ue, z);
  }
  const r = e, {
    format: n,
    foundation: s,
    rootPath: i,
    adapterOptions: l = {},
    basePath: f,
    loadAsset: m,
    ...h
  } = t, _ = m ?? Fc(r);
  if (!n)
    throw new Error(
      "compileDocument: 'format' is required (website mode)."
    );
  if (!r || !Array.isArray(r.pages))
    throw new Error(
      "compileDocument: first argument must be either a React element (tree mode) or a Website (website mode: expected object with a pages array)."
    );
  const g = wc(s), N = g?.[n];
  if (!N) {
    const ue = g ? Object.keys(g).join(", ") || "(none)" : "(no outputs declaration)";
    throw new Error(
      `compileDocument: foundation has no outputs.${n} declaration. Declared outputs: ${ue}. Add outputs[format] = { getOptions, extension?, via? } to the foundation's default export.`
    );
  }
  const L = N.via ?? n, M = N.getOptions ? await N.getOptions(r, { format: n, rootPath: i, loadAsset: _, ...h }) : {}, x = {
    ...M.adapterOptions,
    ...l
  }, R = Hc(r, i), D = globalThis.uniweb?.childBlockRenderer;
  if (typeof D != "function")
    throw new Error(
      "compileDocument: globalThis.uniweb.childBlockRenderer is not installed. Either call initPrerender (headless) or mount a Uniweb runtime (browser) before compileDocument, or pass a pre-built tree (tree mode)."
    );
  const $ = D({ blocks: R });
  return Gu($, L, {
    basePath: f ?? r?.basePath,
    ...M,
    adapterOptions: x
  });
}
function wc(e) {
  return e ? e.outputs ? e.outputs : e.default?.capabilities?.outputs ? e.default.capabilities.outputs : e.default?.outputs ? e.default.outputs : null : null;
}
function Fc(e) {
  return async function(u) {
    if (!u || typeof u != "string") return null;
    if (u.startsWith("data:")) {
      const s = u.indexOf(",");
      if (s === -1) return null;
      const i = u.slice(5, s), l = u.slice(s + 1);
      if (i.includes(";base64")) {
        const f = atob(l), m = new Uint8Array(f.length);
        for (let h = 0; h < f.length; h++) m[h] = f.charCodeAt(h);
        return m;
      }
      return new TextEncoder().encode(decodeURIComponent(l));
    }
    if (typeof fetch != "function")
      throw new Error(
        "loadAsset: cannot load '" + u + "' — no fetch available in this environment. Pass a host-supplied loadAsset via compileDocument({ loadAsset })."
      );
    let r = u;
    if (!/^https?:\/\//i.test(r) && !r.startsWith("data:")) {
      const s = (e?.basePath || "") + (r.startsWith("/") ? r : "/" + r);
      r = typeof window < "u" && window.location?.origin ? window.location.origin + s : s;
    }
    const n = await fetch(r);
    if (!n.ok)
      throw new Error(
        "loadAsset: fetch failed for " + r + " (" + n.status + ")"
      );
    return new Uint8Array(await n.arrayBuffer());
  };
}
function Hc(e, t) {
  const u = e.pages || [];
  return (t && typeof t == "string" ? u.filter(
    (n) => n.route === t || typeof n.route == "string" && n.route.startsWith(t + "/")
  ) : u).flatMap((n) => n.bodyBlocks || []);
}
function lu() {
  const t = Zu()?.activeWebsite;
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
    localize: (u, r = "") => t.localize(u, r),
    /**
     * Transform a href (handles topic: protocol, etc.)
     * @param {string} href
     * @returns {string}
     */
    makeHref: (u) => t.makeHref(u),
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
const Uc = [
  "lu",
  "hi",
  "hi2",
  "pi",
  "tb",
  "fi",
  "bs",
  "md",
  "ai",
  "ri",
  "si",
  "io5",
  "bi",
  "vsc",
  "wi",
  "gi",
  "fa",
  "fa6"
];
new Set(Uc);
function qr() {
  return globalThis.uniweb.childBlockRenderer;
}
function Ku() {
  return { data: null, error: null, loading: !1 };
}
function $u() {
  return { data: null, error: null, loading: !0 };
}
function at(e) {
  return { data: e, error: null, loading: !1 };
}
function zu(e, t = null) {
  return { data: t, error: e, loading: !1 };
}
function Vr(e) {
  const t = Zu()?.activeWebsite ?? null, u = e && t ? ia(e) : null, r = u ? t.dataStore.get(u) : null, [n, s] = ot(
    () => r ? at(r.data) : u ? $u() : Ku()
  );
  return gt(() => {
    if (!u || !t) {
      s(Ku());
      return;
    }
    const i = t.dataStore.get(u);
    s(i ? at(i.data) : $u());
    const l = t.dataStore.subscribe(u, () => {
      const m = t.dataStore.get(u);
      m && s(at(m.data));
    }), f = new AbortController();
    return t.fetcher.dispatch(e, { website: t, signal: f.signal }).then((m) => {
      if (!f.signal.aborted) {
        if (m?.error) {
          s(zu(m.error, m.data ?? null));
          return;
        }
        m && "data" in m && s(at(m.data));
      }
    }).catch((m) => {
      f.signal.aborted || s(zu(String(m?.message || m)));
    }), () => {
      f.abort(), l();
    };
  }, [u, t]), n;
}
function vc(e) {
  return e + 1;
}
function Lt(e, t) {
  const { website: u } = lu(), [, r] = ua(vc, 0), s = u.activePage?.state;
  gt(() => {
    if (s)
      return s.subscribe(e, r);
  }, [s, e]);
  const i = s?.has(e) ? s.get(e) : t;
  return [i, (f) => {
    s && s.set(e, typeof f == "function" ? f(i) : f);
  }];
}
const jr = "business-docs/report-options", he = {
  source: "invoices",
  dateRange: { from: null, to: null },
  client: null,
  status: null
}, qt = Object.keys(he);
function Yc() {
  if (typeof window > "u") return null;
  try {
    const e = window.localStorage.getItem(jr);
    if (!e) return null;
    const t = JSON.parse(e);
    return {
      source: t.source || he.source,
      dateRange: t.dateRange && typeof t.dateRange == "object" ? { from: t.dateRange.from || null, to: t.dateRange.to || null } : he.dateRange,
      client: t.client || null,
      status: t.status || null
    };
  } catch {
    return null;
  }
}
function Wc(e) {
  if (typeof window > "u") return;
  const t = {};
  for (const u of qt)
    t[u] = e.state.get(u) ?? he[u];
  try {
    window.localStorage.setItem(jr, JSON.stringify(t));
  } catch {
  }
}
const Qu = /* @__PURE__ */ new WeakSet();
function Gc(e) {
  if (!e || !e.state) return () => {
  };
  if (Qu.has(e)) return () => {
  };
  Qu.add(e);
  const t = Yc() || he;
  for (const n of qt)
    e.state.has(n) || e.state.set(n, t[n]);
  const u = () => Wc(e), r = qt.map((n) => e.state.subscribe(n, u));
  return () => r.forEach((n) => n());
}
function Xr() {
  return Lt("source", he.source);
}
function Kc() {
  return Lt("dateRange", he.dateRange);
}
function $c() {
  return Lt("client", he.client);
}
function zc() {
  return Lt("status", he.status);
}
function Qc({ dateRange: e, client: t, status: u }) {
  const r = [];
  return e?.from && r.push({ issued: { gte: e.from } }), e?.to && r.push({ issued: { lte: e.to } }), t && r.push({ "client.organization": t }), u && r.push({ status: u }), r.length === 0 ? null : r.length === 1 ? r[0] : { and: r };
}
const qc = /* @__PURE__ */ new Set(["paid", "void"]);
function Vc({ source: e, dateRange: t, client: u, status: r }) {
  const n = [e === "sows" ? "SOWs" : "Invoices"];
  return (t?.from || t?.to) && n.push(`${t.from || ""}–${t.to || ""}`), u && n.push(u), r && n.push(r), n.length > 1 ? n.join(" · ") : null;
}
function jc(e) {
  return e === "sows" ? "/data/sows.json" : "/data/invoices.json";
}
function Xc(e) {
  return e === "sows" ? "sows" : "invoices";
}
function Jc(e, t) {
  return e === "sows" ? Array.isArray(t?.data?.sows) ? t.data.sows : [] : Array.isArray(t?.data?.invoices) ? t.data.invoices : [];
}
function Zc(e, t, u, r) {
  let n = 0, s = 0, i = 0;
  if (t === "invoices")
    for (const l of e) {
      const f = It(l, u, r);
      n += f.subtotal, s += f.total, qc.has(String(l?.status)) || (i += f.total);
    }
  else
    for (const l of e) {
      const f = Number(l?.budget?.total) || 0;
      s += f, n += f;
    }
  return {
    sumSubtotals: Math.round(n * 100) / 100,
    sumTotals: Math.round(s * 100) / 100,
    sumOutstanding: Math.round(i * 100) / 100
  };
}
function e0(e, t) {
  const [u] = Xr(), [r] = Kc(), [n] = $c(), [s] = zc(), i = t?.website?.config?.business_docs || {}, l = i.defaults || {}, f = i.registries?.tax || {}, m = _e(
    () => Qc({ dateRange: r, client: n, status: s }),
    [r, n, s]
  ), h = _e(
    () => Jc(u, e),
    [u, e?.data?.invoices, e?.data?.sows]
  ), { data: _, loading: g } = Vr(
    m ? { path: jc(u), schema: Xc(u), where: m } : null
  ), N = m ? _ || [] : h, { sumSubtotals: L, sumTotals: M, sumOutstanding: x } = _e(
    () => Zc(N, u, l, f),
    [N, u, l, f]
  );
  return {
    records: N,
    count: N.length,
    sumSubtotals: L,
    sumTotals: M,
    sumOutstanding: x,
    activeWhere: m,
    activeLabel: Vc({ source: u, dateRange: r, client: n, status: s }),
    totalCount: h.length,
    loading: m ? g : !1
  };
}
function t0(e, { currency: t = "CAD", locale: u = "en-CA" } = {}) {
  const r = Number(e);
  return Number.isFinite(r) ? new Intl.NumberFormat(u, {
    style: "currency",
    currency: t,
    maximumFractionDigits: 2
  }).format(r) : "";
}
function Vt(e, { locale: t = "en-CA" } = {}) {
  if (!e) return "";
  const u = e instanceof Date ? e : new Date(e);
  return Number.isNaN(u.getTime()) ? String(e) : new Intl.DateTimeFormat(t, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(u);
}
function qu(e, t) {
  if (!e) return "";
  const u = Vt(e.from, t), r = Vt(e.to, t);
  return u && r ? `${u} – ${r}` : u || r;
}
function v0({ content: e, block: t }) {
  const u = t?.website?.config?.business_docs || {}, r = u.defaults || {}, n = u.registries?.tax || {}, s = r.currency || "CAD", i = r.locale || "en-CA", l = (I) => t0(I, { currency: s, locale: i }), f = (I) => Vt(I, { locale: i }), [m] = Xr(), h = m !== "sows", {
    records: _,
    count: g,
    sumSubtotals: N,
    sumTotals: L,
    sumOutstanding: M,
    activeLabel: x,
    totalCount: R,
    loading: D
  } = e0(e, t), { data: $ } = Vr(
    h ? { path: "/data/sows.json", schema: "sows" } : null
  ), ue = _e(() => u0($), [$]), z = _e(
    () => h ? _.map((I) => r0(I, ue, r, n)) : _,
    [_, h, ue, r, n]
  );
  se(t, "xlsx", {
    title: "Records",
    headers: h ? ["Number", "Date", "Client", "Period", "Status", "Currency", "Subtotal", "Tax", "Total", "SOW ref"] : ["Number", "Issued", "Status", "Client", "Title", "Fee model", "Budget"],
    data: z.map(
      (I) => h ? [
        I.number,
        I.issued || "",
        I.client?.organization || "",
        I.period ? qu(I.period, { locale: i }) : "",
        I.status || "",
        I.currency || s,
        I._totals?.subtotal ?? 0,
        I._totals?.tax_amount ?? 0,
        I._totals?.total ?? 0,
        I.sow_ref || ""
      ] : [
        I.number,
        I.issued || "",
        I.status || "",
        I.client?.organization || "",
        I.title || "",
        I.fee_model || "",
        Number(I.budget?.total) || 0
      ]
    ),
    numberFormats: h ? ["text", "date", "text", "text", "text", "text", "currency", "currency", "currency", "text"] : ["text", "date", "text", "text", "text", "text", "currency"]
  }), se(t, "xlsx", {
    title: "Summary",
    headers: ["Group", "Bucket", "Count", "Subtotal", "Total", "Outstanding"],
    data: a0(z, h),
    numberFormats: ["text", "text", "number", "currency", "currency", "currency"]
  });
  const et = e?.title || (h ? "Invoice report" : "SOW report"), tt = x || e?.subtitle || (h ? "All invoices" : "All SOWs");
  return /* @__PURE__ */ C("section", { className: "engagement-report", children: [
    /* @__PURE__ */ C("header", { children: [
      /* @__PURE__ */ E("h1", { children: et }),
      /* @__PURE__ */ E("p", { className: "engagement-report-subtitle", children: tt }),
      /* @__PURE__ */ C("p", { className: "engagement-report-population", children: [
        g,
        " of ",
        R,
        " ",
        h ? "invoices" : "SOWs"
      ] })
    ] }),
    /* @__PURE__ */ C("div", { className: "engagement-report-cards", role: "list", children: [
      /* @__PURE__ */ E(nt, { label: "Records", value: g }),
      /* @__PURE__ */ E(nt, { label: "Subtotal", value: l(N) }),
      /* @__PURE__ */ E(nt, { label: "Total", value: l(L) }),
      h && /* @__PURE__ */ E(nt, { label: "Outstanding", value: l(M) })
    ] }),
    D && /* @__PURE__ */ E("p", { className: "engagement-report-loading", children: "Loading…" }),
    /* @__PURE__ */ C("table", { className: "engagement-report-table", children: [
      /* @__PURE__ */ E("thead", { children: /* @__PURE__ */ E("tr", { children: h ? /* @__PURE__ */ C(Ne, { children: [
        /* @__PURE__ */ E("th", { children: "Number" }),
        /* @__PURE__ */ E("th", { children: "Date" }),
        /* @__PURE__ */ E("th", { children: "Client" }),
        /* @__PURE__ */ E("th", { children: "Period" }),
        /* @__PURE__ */ E("th", { children: "Status" }),
        /* @__PURE__ */ E("th", { children: "Total" }),
        /* @__PURE__ */ E("th", { children: "SOW" }),
        /* @__PURE__ */ E("th", { children: "% billed" })
      ] }) : /* @__PURE__ */ C(Ne, { children: [
        /* @__PURE__ */ E("th", { children: "Number" }),
        /* @__PURE__ */ E("th", { children: "Issued" }),
        /* @__PURE__ */ E("th", { children: "Client" }),
        /* @__PURE__ */ E("th", { children: "Title" }),
        /* @__PURE__ */ E("th", { children: "Status" }),
        /* @__PURE__ */ E("th", { children: "Budget" })
      ] }) }) }),
      /* @__PURE__ */ E("tbody", { children: z.map(
        (I) => h ? /* @__PURE__ */ C("tr", { children: [
          /* @__PURE__ */ E("td", { children: I.number }),
          /* @__PURE__ */ E("td", { children: f(I.issued) }),
          /* @__PURE__ */ E("td", { children: I.client?.organization || "" }),
          /* @__PURE__ */ E("td", { children: I.period ? qu(I.period, { locale: i }) : "" }),
          /* @__PURE__ */ E("td", { children: I.status }),
          /* @__PURE__ */ E("td", { children: l(I._totals?.total ?? 0) }),
          /* @__PURE__ */ E("td", { children: I.sow_ref || "" }),
          /* @__PURE__ */ E("td", { children: I._percentBilled != null ? `${I._percentBilled.toFixed(1)}%` : "" })
        ] }, I.slug || I.number) : /* @__PURE__ */ C("tr", { children: [
          /* @__PURE__ */ E("td", { children: I.number }),
          /* @__PURE__ */ E("td", { children: f(I.issued) }),
          /* @__PURE__ */ E("td", { children: I.client?.organization || "" }),
          /* @__PURE__ */ E("td", { children: I.title }),
          /* @__PURE__ */ E("td", { children: I.status }),
          /* @__PURE__ */ E("td", { children: l(Number(I.budget?.total) || 0) })
        ] }, I.slug || I.number)
      ) })
    ] })
  ] });
}
function nt({ label: e, value: t }) {
  return /* @__PURE__ */ C("div", { role: "listitem", className: "engagement-report-card", children: [
    /* @__PURE__ */ E("span", { className: "engagement-report-card-label", children: e }),
    /* @__PURE__ */ E("span", { className: "engagement-report-card-value", children: t })
  ] });
}
function u0(e) {
  const t = /* @__PURE__ */ new Map();
  if (!Array.isArray(e)) return t;
  for (const u of e)
    u?.slug && t.set(u.slug, u), u?.number != null && t.set(String(u.number), u);
  return t;
}
function r0(e, t, u, r) {
  const n = It(e, u, r), s = e?.sow_ref ? t.get(String(e.sow_ref)) : null, i = Number(s?.budget?.total) || 0, l = i > 0 ? n.total / i * 100 : null;
  return { ...e, _totals: n, _percentBilled: l };
}
function a0(e, t) {
  const u = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = (i, l, f) => {
    const m = i.get(l) || { count: 0, subtotal: 0, total: 0, outstanding: 0 };
    m.count += 1, m.subtotal += f.subtotal, m.total += f.total, m.outstanding += f.outstanding, i.set(l, m);
  };
  for (const i of e) {
    const l = t ? {
      subtotal: i._totals?.subtotal ?? 0,
      total: i._totals?.total ?? 0,
      outstanding: ["paid", "void"].includes(i.status) ? 0 : i._totals?.total ?? 0
    } : {
      subtotal: Number(i.budget?.total) || 0,
      total: Number(i.budget?.total) || 0,
      outstanding: 0
    };
    n(u, i.client?.organization || "(no client)", l), n(r, i.status || "(no status)", l);
  }
  const s = [];
  for (const [i, l] of u) s.push(["Client", i, l.count, l.subtotal, l.total, l.outstanding]);
  for (const [i, l] of r) s.push(["Status", i, l.count, l.subtotal, l.total, l.outstanding]);
  return s;
}
function n0(e) {
  if (e == null || e === "") return null;
  if (e instanceof Date)
    return Number.isNaN(e.getTime()) ? null : e;
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? null : t;
}
const Vu = {
  iso: null,
  // sentinel — handled before Intl
  short: { year: "numeric", month: "numeric", day: "numeric" },
  medium: { year: "numeric", month: "short", day: "numeric" },
  long: { year: "numeric", month: "long", day: "numeric" },
  full: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }
};
function ju(e) {
  const t = e.getUTCFullYear(), u = String(e.getUTCMonth() + 1).padStart(2, "0"), r = String(e.getUTCDate()).padStart(2, "0");
  return `${t}-${u}-${r}`;
}
function jt(e, { locale: t = "en-CA", format: u = "medium" } = {}) {
  const r = n0(e);
  if (!r) return "";
  if (u === "iso") return ju(r);
  const n = Vu[u] || Vu.medium;
  try {
    return new Intl.DateTimeFormat(t, { ...n, timeZone: "UTC" }).format(r);
  } catch {
    return ju(r);
  }
}
function s0(e, t, u) {
  const r = jt(e, u), n = jt(t, u);
  return r && n ? `${r} – ${n}` : r || n || "";
}
function i0(e, { locale: t = "en-CA", code: u = "CAD" } = {}) {
  if (e == null || e === "") return "";
  const r = typeof e == "number" ? e : Number(e);
  if (!Number.isFinite(r)) return "";
  try {
    return new Intl.NumberFormat(t, {
      style: "currency",
      currency: u,
      maximumFractionDigits: 2
    }).format(r);
  } catch {
    return `${r.toFixed(2)} ${u}`;
  }
}
function Xu({ value: e, format: t = "medium", locale: u }) {
  const r = Je(), n = jt(e, {
    locale: u ?? r.locale,
    format: t
  });
  return /* @__PURE__ */ E("span", { "data-type": "text", children: n });
}
function Jr({
  from: e,
  to: t,
  period: u,
  format: r = "medium",
  locale: n
}) {
  const s = Je(), i = u?.from ?? e, l = u?.to ?? t, f = s0(i, l, {
    locale: n ?? s.locale,
    format: r
  });
  return /* @__PURE__ */ E("span", { "data-type": "text", children: f });
}
function Qe({ value: e, code: t, locale: u }) {
  const r = Je(), n = i0(e, {
    locale: u ?? r.locale,
    code: t ?? r.currency
  });
  return /* @__PURE__ */ E("span", { "data-type": "text", children: n });
}
function o0(e) {
  return String(e).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function Ue(e, t) {
  const u = new RegExp(`${t}="([^"]*)"`), r = e.match(u);
  return r ? o0(r[1]) : null;
}
function Zr(e) {
  const t = (r, n) => ({
    type: "text",
    content: r,
    ...n
  }), u = (r, n = {}) => {
    const s = /<(\w+)(\s[^>]*)?>(.+?)<\/\1>/gs;
    let i = [], l = 0;
    if (!r) return [t("", n)];
    r.replace(s, (m, h, _, g, N) => {
      const L = r.slice(l, N);
      if (L && i.push(t(L, n)), h === "a" && _) {
        const x = Ue(_, "href");
        if (x) {
          i.push({
            type: "link",
            content: g,
            href: x
          }), l = N + m.length;
          return;
        }
      }
      if (h === "span" && _ && Ue(_, "data-type") === "math") {
        const R = Ue(_, "data-latex") || "", D = Ue(_, "data-display") === "true", $ = Ue(_, "data-id");
        i.push({
          type: "math",
          latex: R,
          display: D,
          ...$ ? { id: $ } : {}
        }), l = N + m.length;
        return;
      }
      const M = { ...n };
      (h === "strong" || h === "b") && (M.bold = !0), (h === "em" || h === "i") && (M.italics = !0), h === "u" && (M.underline = {}), i = i.concat(u(g, M)), l = N + m.length;
    });
    const f = r.slice(l);
    return f && i.push(t(f, n)), i;
  };
  return typeof e != "string" && (e = String(e ?? "")), u(e);
}
function Ju(e) {
  if (!(e instanceof Date)) return e;
  if (Number.isNaN(e.getTime())) return "";
  const t = e.getUTCFullYear(), u = String(e.getUTCMonth() + 1).padStart(2, "0"), r = String(e.getUTCDate()).padStart(2, "0");
  return `${t}-${u}-${r}`;
}
function c0(e) {
  return e == null ? e : Array.isArray(e) ? e.map(Ju) : Ju(e);
}
function O({
  children: e,
  bold: t,
  italics: u,
  underline: r,
  color: n,
  size: s,
  font: i,
  smallCaps: l,
  allCaps: f,
  strike: m,
  style: h,
  role: _,
  ...g
}) {
  const N = Je(), L = Ve(n, N), M = Hs(i, N), x = h ?? _, R = { "data-type": "text" };
  return t && (R["data-bold"] = "true"), u && (R["data-italics"] = "true"), r && (R["data-underline"] = "true"), L && (R["data-color"] = L), s != null && (R["data-size"] = s), M && (R["data-font"] = M), l && (R["data-smallcaps"] = "true"), f && (R["data-allcaps"] = "true"), m && (R["data-strike"] = "true"), x && (R["data-style"] = x), /* @__PURE__ */ E("span", { ...R, ...g, children: c0(e) });
}
function l0({ latex: e, display: t = !1, id: u, ...r }) {
  const n = { "data-type": "math" };
  return n["data-latex"] = e || "", n["data-display"] = t ? "true" : "false", u && (n["data-id"] = u), /* @__PURE__ */ E("span", { ...n, ...r });
}
function d0({ tabStops: e, indent: t, role: u }) {
  const r = {};
  return Array.isArray(e) && e.length && (r["data-tab-stops"] = JSON.stringify(e)), t && typeof t == "object" && (t.left != null && (r["data-indent-left"] = t.left), t.right != null && (r["data-indent-right"] = t.right), t.firstLine != null && (r["data-indent-firstline"] = t.firstLine), t.hanging != null && (r["data-indent-hanging"] = t.hanging)), typeof u == "string" && u.length && (r["data-paragraph-style"] = u), r;
}
function S({
  as: e = "p",
  data: t,
  tabStops: u,
  indent: r,
  role: n,
  children: s,
  ...i
}) {
  const l = d0({ tabStops: u, indent: r, role: n });
  if (t) {
    const f = Zr(t);
    return /* @__PURE__ */ E(e, { "data-type": "paragraph", ...l, ...i, children: f.map((m, h) => m.type === "link" ? /* @__PURE__ */ E(
      "a",
      {
        "data-type": "externalHyperlink",
        "data-link": m.href,
        href: m.href,
        children: /* @__PURE__ */ E("span", { "data-type": "text", "data-style": "Hyperlink", children: m.content })
      },
      h
    ) : m.type === "math" ? /* @__PURE__ */ E(
      l0,
      {
        latex: m.latex,
        display: m.display,
        id: m.id
      },
      h
    ) : /* @__PURE__ */ E(
      O,
      {
        bold: m.bold,
        italics: m.italics,
        underline: !!m.underline,
        children: m.content
      },
      h
    )) });
  }
  return /* @__PURE__ */ E(e, { "data-type": "paragraph", ...l, ...i, children: s });
}
function ea({ level: e, data: t, children: u, ...r }) {
  const n = `h${e}`;
  if (t) {
    const s = Zr(t);
    return /* @__PURE__ */ E(n, { "data-type": "paragraph", "data-heading": `HEADING_${e}`, ...r, children: s.map(
      (i, l) => i.type === "link" ? /* @__PURE__ */ E(
        "a",
        {
          "data-type": "externalHyperlink",
          "data-link": i.href,
          href: i.href,
          children: /* @__PURE__ */ E("span", { "data-type": "text", "data-style": "Hyperlink", children: i.content })
        },
        l
      ) : /* @__PURE__ */ E(
        O,
        {
          bold: i.bold,
          italics: i.italics,
          underline: !!i.underline,
          children: i.content
        },
        l
      )
    ) });
  }
  return /* @__PURE__ */ E(n, { "data-type": "paragraph", "data-heading": `HEADING_${e}`, ...r, children: u });
}
function f0(e) {
  return /* @__PURE__ */ E(ea, { level: 1, ...e });
}
function h0(e) {
  return /* @__PURE__ */ E(ea, { level: 2, ...e });
}
function E0(e, t) {
  return !e || !t || typeof e != "string" || !e.startsWith("/") || e.startsWith("//") || e === t || e.startsWith(t + "/") ? e : t + e;
}
function m0({
  data: e,
  width: t = 400,
  height: u = 300,
  className: r,
  style: n,
  ...s
}) {
  const i = At(Yt);
  if (!e) return null;
  const { value: l, url: f, alt: m = "" } = typeof e == "string" ? { url: e } : e, h = f || l || "";
  if (!h) return null;
  const _ = E0(h, i);
  return /* @__PURE__ */ E(
    "img",
    {
      "data-type": "image",
      "data-src": _,
      "data-transformation-width": t,
      "data-transformation-height": u,
      "data-alttext-description": m,
      src: _,
      alt: m,
      className: r,
      style: { display: "block", maxWidth: "100%", height: "auto", ...n },
      ...s
    }
  );
}
const T0 = 180, b0 = 0.32;
function p0({
  url: e,
  alt: t = "",
  width: u = T0,
  height: r,
  align: n = "right",
  ...s
}) {
  if (!e) return null;
  const i = r ?? Math.round(u * b0);
  return /* @__PURE__ */ E(
    m0,
    {
      data: { url: e, alt: t },
      width: u,
      height: i,
      "data-alignment": n,
      ...s
    }
  );
}
function _0(e, t) {
  if (!e) return e;
  const u = {};
  for (const [r, n] of Object.entries(e))
    n && (u[r] = {
      ...n,
      ...n.color ? { color: Ve(n.color, t) } : {}
    });
  return u;
}
const ta = _t({ widths: null, borderColor: "cccccc" });
function pt({
  widths: e,
  columnWidths: t,
  layout: u,
  width: r,
  borders: n,
  borderColor: s = "cccccc",
  className: i,
  children: l,
  ...f
}) {
  const m = Je(), h = {};
  t && t.length ? (h["data-table-column-widths"] = t.join(","), h["data-table-layout"] = u || "fixed") : u && (h["data-table-layout"] = u), r && (r.size != null && (h["data-table-width-size"] = r.size), h["data-table-width-type"] = r.type ?? "pct");
  const _ = _0(n, m);
  if (_)
    for (const [N, L] of Object.entries(_)) {
      if (!L) continue;
      const M = N === "insideHorizontal" ? "insideh" : N === "insideVertical" ? "insidev" : N;
      L.style && (h[`data-table-borders-${M}-style`] = L.style), L.size != null && (h[`data-table-borders-${M}-size`] = L.size), L.color && (h[`data-table-borders-${M}-color`] = L.color);
    }
  const g = Ve(s, m) ?? s;
  return /* @__PURE__ */ E(
    ta.Provider,
    {
      value: { widths: e, borderColor: g, theme: m },
      children: /* @__PURE__ */ E("div", { "data-type": "table", className: i, ...h, ...f, children: l })
    }
  );
}
function ge({ header: e = !1, className: t, children: u, ...r }) {
  let n = 0;
  const s = ra.toArray(u).map((l) => {
    if (!aa(l)) return l;
    const f = l.props._col ?? n, m = typeof l.props.colSpan == "number" && l.props.colSpan > 1 ? l.props.colSpan : 1;
    return n = f + m, na(l, {
      _col: f,
      _header: l.props._header ?? e
    });
  });
  return /* @__PURE__ */ E("div", { "data-type": "tableRow", className: t, ...e ? { "data-row-header": "" } : {}, ...r, children: s });
}
const st = { top: 80, bottom: 80, left: 120, right: 120 };
function W({
  _col: e = 0,
  _header: t = !1,
  width: u,
  emphasis: r = !1,
  borderBottom: n,
  shading: s,
  valign: i,
  colSpan: l,
  rowSpan: f,
  className: m,
  style: h,
  children: _,
  ...g
}) {
  const { widths: N, borderColor: L, theme: M } = At(ta), x = u ?? N?.[e], R = {
    "data-type": "tableCell",
    "data-margins-top": st.top,
    "data-margins-bottom": st.bottom,
    "data-margins-left": st.left,
    "data-margins-right": st.right,
    "data-borders-top-style": "none",
    "data-borders-left-style": "none",
    "data-borders-right-style": "none",
    "data-borders-bottom-style": n ?? "single",
    "data-borders-bottom-size": t ? 6 : 4,
    "data-borders-bottom-color": L
  };
  if (x != null && (R["data-width-size"] = x, R["data-width-type"] = "pct"), s) {
    const z = typeof s == "string" ? { fill: s } : s, et = Ve(z.fill, M), tt = Ve(z.color, M);
    et && (R["data-shading-fill"] = et), z.type && (R["data-shading-type"] = z.type), tt && (R["data-shading-color"] = tt);
  }
  i && (R["data-valign"] = i), typeof l == "number" && l > 1 && (R["data-grid-span"] = l), typeof f == "number" && f > 1 && (R["data-row-span"] = f);
  const D = x != null ? { flex: `${x} ${x} 0%`, minWidth: 0, ...h } : h;
  return /* @__PURE__ */ E("div", { className: m, style: D, ...R, ...g, children: typeof _ == "string" || typeof _ == "number" ? /* @__PURE__ */ E(S, { children: r || t ? /* @__PURE__ */ E(O, { bold: !0, children: _ }) : _ }) : _ });
}
function A0({ children: e }) {
  return /* @__PURE__ */ E(Ne, { children: e });
}
function g0(e) {
  return Math.floor(e / 25.4 * 1440);
}
function N0(e) {
  return g0(e * 10);
}
const oe = N0;
function I0(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const u of e) {
    if (u.type === "heading" && u.level === 2) break;
    (u.type === "paragraph" || u.type === "inset") && t.push(u);
  }
  return t;
}
const Xt = () => ({
  top: { style: "none", size: 0, color: "FFFFFF" },
  bottom: { style: "none", size: 0, color: "FFFFFF" },
  left: { style: "none", size: 0, color: "FFFFFF" },
  right: { style: "none", size: 0, color: "FFFFFF" },
  insideHorizontal: { style: "none", size: 0, color: "FFFFFF" },
  insideVertical: { style: "none", size: 0, color: "FFFFFF" }
}), C0 = () => ({
  top: { style: "single", size: 4, color: "softBorder" },
  bottom: { style: "single", size: 4, color: "softBorder" },
  left: { style: "single", size: 4, color: "softBorder" },
  right: { style: "single", size: 4, color: "softBorder" },
  insideHorizontal: { style: "single", size: 4, color: "softBorder" },
  insideVertical: { style: "single", size: 4, color: "softBorder" }
});
function S0({ bd: e }) {
  const { invoice: t, vendor: u } = e, r = t?.client || {};
  return /* @__PURE__ */ C(Ne, { children: [
    /* @__PURE__ */ E(S, { role: "Title", children: /* @__PURE__ */ E(O, { children: "INVOICE" }) }),
    /* @__PURE__ */ E(pt, { widths: [50, 50], borders: Xt(), children: /* @__PURE__ */ C(ge, { children: [
      /* @__PURE__ */ C(W, { borderBottom: "none", children: [
        /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { role: "Label", children: "From" }) }),
        u?.organization && /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { role: "BodyStrong", children: u.organization }) }),
        u?.address && /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { children: u.address }) })
      ] }),
      /* @__PURE__ */ C(W, { borderBottom: "none", children: [
        /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { role: "Label", children: "Bill to" }) }),
        r.organization && /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { role: "BodyStrong", children: r.organization }) }),
        r.contact && /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { children: r.contact }) }),
        r.email && /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { role: "Caption", children: r.email }) })
      ] })
    ] }) }),
    /* @__PURE__ */ E(S, { "data-spacing-before": 200 }),
    /* @__PURE__ */ E(pt, { widths: [33, 33, 34], borders: Xt(), children: /* @__PURE__ */ C(ge, { children: [
      t?.number && /* @__PURE__ */ C(W, { borderBottom: "none", children: [
        /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { role: "Label", children: "Invoice number" }) }),
        /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { role: "Display", children: t.number }) })
      ] }),
      t?.issued && /* @__PURE__ */ C(W, { borderBottom: "none", children: [
        /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { role: "Label", children: "Issued" }) }),
        /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { children: /* @__PURE__ */ E(Xu, { value: t.issued, format: "long" }) }) })
      ] }),
      t?.due && /* @__PURE__ */ C(W, { borderBottom: "none", children: [
        /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { role: "Label", children: "Due" }) }),
        /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { children: /* @__PURE__ */ E(Xu, { value: t.due, format: "long" }) }) })
      ] })
    ] }) }),
    t?.period && /* @__PURE__ */ C(Ne, { children: [
      /* @__PURE__ */ E(S, { "data-spacing-before": 120, children: /* @__PURE__ */ E(O, { role: "Label", children: "Period" }) }),
      /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { children: /* @__PURE__ */ E(Jr, { period: t.period, format: "long" }) }) })
    ] })
  ] });
}
function O0({ bd: e }) {
  const { items: t, invoice: u } = e;
  if (!Array.isArray(t) || t.length === 0) return null;
  const r = u?.currency || void 0;
  return /* @__PURE__ */ C(
    pt,
    {
      columnWidths: [oe(10), oe(2), oe(2.5), oe(2.5)],
      borders: C0(),
      children: [
        /* @__PURE__ */ E(ge, { header: !0, children: ["Description", "Qty", "Unit price", "Amount"].map((n, s) => /* @__PURE__ */ E(W, { shading: "accent", valign: "center", children: /* @__PURE__ */ E(S, { "data-alignment": s === 0 ? "left" : "right", children: /* @__PURE__ */ E(O, { role: "TableHeader", children: n }) }) }, s)) }),
        t.map((n, s) => /* @__PURE__ */ C(ge, { children: [
          /* @__PURE__ */ C(W, { valign: "center", children: [
            /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { children: n.description }) }),
            n.period && /* @__PURE__ */ E(S, { children: /* @__PURE__ */ E(O, { role: "Caption", children: /* @__PURE__ */ E(Jr, { period: n.period, format: "medium" }) }) })
          ] }),
          /* @__PURE__ */ E(W, { valign: "center", children: /* @__PURE__ */ E(S, { "data-alignment": "right", children: /* @__PURE__ */ E(O, { children: String(n.qty ?? "") }) }) }),
          /* @__PURE__ */ E(W, { valign: "center", children: /* @__PURE__ */ E(S, { "data-alignment": "right", children: /* @__PURE__ */ E(O, { children: /* @__PURE__ */ E(Qe, { value: n.unit_price, code: r }) }) }) }),
          /* @__PURE__ */ E(W, { valign: "center", children: /* @__PURE__ */ E(S, { "data-alignment": "right", children: /* @__PURE__ */ E(O, { children: /* @__PURE__ */ E(Qe, { value: n.amount, code: r }) }) }) })
        ] }, s))
      ]
    }
  );
}
function y0({ bd: e }) {
  const { totals: t, invoice: u } = e;
  if (!t) return null;
  const r = u?.currency || void 0;
  return /* @__PURE__ */ C(
    pt,
    {
      columnWidths: [oe(10), oe(2), oe(2.5), oe(2.5)],
      borders: Xt(),
      children: [
        /* @__PURE__ */ C(ge, { children: [
          /* @__PURE__ */ E(W, { colSpan: 3, borderBottom: "none", children: /* @__PURE__ */ E(S, { "data-alignment": "right", children: /* @__PURE__ */ E(O, { role: "Label", children: "Subtotal" }) }) }),
          /* @__PURE__ */ E(W, { borderBottom: "none", children: /* @__PURE__ */ E(S, { "data-alignment": "right", children: /* @__PURE__ */ E(O, { role: "BodyStrong", children: /* @__PURE__ */ E(Qe, { value: t.subtotal, code: r }) }) }) })
        ] }),
        t.tax_amount > 0 && /* @__PURE__ */ C(ge, { children: [
          /* @__PURE__ */ E(W, { colSpan: 3, borderBottom: "none", children: /* @__PURE__ */ E(S, { "data-alignment": "right", children: /* @__PURE__ */ E(O, { role: "Label", children: t.tax_label }) }) }),
          /* @__PURE__ */ E(W, { borderBottom: "none", children: /* @__PURE__ */ E(S, { "data-alignment": "right", children: /* @__PURE__ */ E(O, { role: "BodyStrong", children: /* @__PURE__ */ E(Qe, { value: t.tax_amount, code: r }) }) }) })
        ] }),
        /* @__PURE__ */ C(ge, { children: [
          /* @__PURE__ */ E(W, { colSpan: 3, shading: "accent", borderBottom: "none", valign: "center", children: /* @__PURE__ */ E(S, { "data-alignment": "right", children: /* @__PURE__ */ E(O, { role: "TotalLine", children: "Total" }) }) }),
          /* @__PURE__ */ E(W, { shading: "accent", borderBottom: "none", valign: "center", children: /* @__PURE__ */ E(S, { "data-alignment": "right", children: /* @__PURE__ */ E(O, { role: "TotalLine", children: /* @__PURE__ */ E(Qe, { value: t.total, code: r }) }) }) })
        ] })
      ]
    }
  );
}
function D0({ content: e, block: t }) {
  const { title: u, items: r, sequence: n } = e, s = (() => {
    try {
      return qr();
    } catch {
      return null;
    }
  })(), i = I0(n), l = i.filter((h) => h.type === "paragraph").map((h) => h.text), f = /* @__PURE__ */ C(Ne, { children: [
    u && /* @__PURE__ */ E(S, { role: "Heading1", "data-spacing-after": 240, children: /* @__PURE__ */ E(O, { children: u }) }),
    l.map((h, _) => /* @__PURE__ */ E(S, { data: h, "data-spacing-after": 120 }, `p${_}`)),
    r.map((h, _) => /* @__PURE__ */ C(dt, { children: [
      h.title && /* @__PURE__ */ E(
        S,
        {
          role: "Heading2",
          "data-spacing-before": 200,
          "data-spacing-after": 120,
          children: /* @__PURE__ */ E(O, { children: h.title })
        }
      ),
      h.paragraphs.map((g, N) => /* @__PURE__ */ E(S, { data: g, "data-spacing-after": 100 }, `${_}-${N}`))
    ] }, _))
  ] }), m = /* @__PURE__ */ C("section", { className: "invoice-section", children: [
    u && /* @__PURE__ */ E("h1", { className: "invoice-title", children: u }),
    i.map((h, _) => {
      if (h.type === "paragraph")
        return /* @__PURE__ */ E("p", { dangerouslySetInnerHTML: { __html: h.text } }, `p${_}`);
      if (h.type === "inset") {
        if (!s) return null;
        const g = t.getInset(h.refId);
        return g ? /* @__PURE__ */ E(s, { blocks: [g] }, `i${_}`) : null;
      }
      return null;
    }),
    r.length > 0 && /* @__PURE__ */ E("div", { className: "invoice-items", children: r.map((h, _) => /* @__PURE__ */ C(dt, { children: [
      h.title && /* @__PURE__ */ E("h2", { className: "invoice-item-title", children: h.title }),
      h.paragraphs.map((g, N) => /* @__PURE__ */ E(
        "p",
        {
          className: "invoice-item-detail",
          dangerouslySetInnerHTML: { __html: g }
        },
        `${_}-${N}`
      ))
    ] }, _)) })
  ] });
  return { docxBody: f, previewJsx: m };
}
function Y0({ content: e, block: t }) {
  const u = e?.__bd, r = u?.kind || "body";
  let n = null;
  if (u && (r === "cover" ? n = /* @__PURE__ */ E(S0, { bd: u }) : r === "line-items" ? n = /* @__PURE__ */ E(O0, { bd: u }) : r === "totals" && (n = /* @__PURE__ */ E(y0, { bd: u }))), r === "cover" && u?.vendor?.logo) {
    const l = /* @__PURE__ */ E(A0, { children: /* @__PURE__ */ E(p0, { url: u.vendor.logo, width: oe(4), align: "right" }) });
    se(t, "docx", l, { role: "header" });
  }
  if (n)
    return se(t, "docx", n), se(t, "html", n), /* @__PURE__ */ E("section", { className: `invoice-section invoice-${r}`, children: n });
  const { docxBody: s, previewJsx: i } = D0({ content: e, block: t });
  return se(t, "docx", s), se(t, "html", i), i;
}
function L0(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const u of e) {
    if (u.type === "heading" && u.level === 2) break;
    (u.type === "paragraph" || u.type === "inset") && t.push(u);
  }
  return t;
}
function W0({ content: e, block: t }) {
  const { title: u, items: r, sequence: n } = e, s = qr(), i = L0(n), l = i.filter((h) => h.type === "paragraph").map((h) => h.text), f = /* @__PURE__ */ C(Ne, { children: [
    u && /* @__PURE__ */ E(f0, { data: u, "data-spacing-after": 240 }),
    l.map((h, _) => /* @__PURE__ */ E(S, { data: h, "data-spacing-after": 120 }, `p${_}`)),
    r.map((h, _) => /* @__PURE__ */ C(dt, { children: [
      h.title && /* @__PURE__ */ E(h0, { data: h.title, "data-spacing-before": 200, "data-spacing-after": 120 }),
      h.paragraphs.map((g, N) => /* @__PURE__ */ E(S, { data: g, "data-spacing-after": 100 }, `${_}-${N}`))
    ] }, _))
  ] }), m = /* @__PURE__ */ C("section", { className: "sow-section", children: [
    u && /* @__PURE__ */ E("h1", { className: "sow-title", children: u }),
    i.map((h, _) => {
      if (h.type === "paragraph")
        return /* @__PURE__ */ E("p", { dangerouslySetInnerHTML: { __html: h.text } }, `p${_}`);
      if (h.type === "inset") {
        const g = t.getInset(h.refId);
        return g ? /* @__PURE__ */ E(s, { blocks: [g] }, `i${_}`) : null;
      }
      return null;
    }),
    r.length > 0 && /* @__PURE__ */ E("div", { className: "sow-items", children: r.map((h, _) => /* @__PURE__ */ C(dt, { children: [
      h.title && /* @__PURE__ */ E("h2", { className: "sow-item-title", children: h.title }),
      h.paragraphs.map((g, N) => /* @__PURE__ */ E("p", { className: "sow-item-detail", dangerouslySetInnerHTML: { __html: g } }, `${_}-${N}`)),
      Array.isArray(h.items) && h.items.length > 0 && /* @__PURE__ */ E("ul", { className: "sow-item-sublist", children: h.items.map((g, N) => /* @__PURE__ */ E("li", { dangerouslySetInnerHTML: { __html: g.title || g.paragraphs?.[0] || "" } }, N)) })
    ] }, _)) })
  ] });
  return se(t, "docx", f), se(t, "html", m), m;
}
const it = {
  pdf: { label: "PDF", ext: "pdf" },
  pagedjs: { label: "HTML (Paged.js)", ext: "html" },
  docx: { label: "Word", ext: "docx" },
  xlsx: { label: "Excel", ext: "xlsx" }
};
function R0({ title: e = "Document", filename: t = "document" }) {
  const { website: u } = lu(), [r, n] = ot(null), [s, i] = ot(null), [l, f] = ot(!1), m = sa(null);
  gt(() => {
    if (!l) return;
    const g = (N) => {
      m.current && !m.current.contains(N.target) && f(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [l]);
  const h = Object.keys(ct.outputs || {}).filter((g) => it[g]), _ = async (g) => {
    i(null), n(g), f(!1);
    try {
      const N = await kc(u, { format: g, foundation: ct, title: e }), L = ct.outputs?.[g]?.extension || it[g]?.ext || g;
      Bc(N, `${t}.${L}`);
    } catch (N) {
      console.error("compile failed", N), i(N?.message || String(N));
    } finally {
      n(null);
    }
  };
  return /* @__PURE__ */ C("div", { ref: m, className: "business-docs-download", children: [
    /* @__PURE__ */ E(
      "button",
      {
        type: "button",
        onClick: () => f((g) => !g),
        disabled: r !== null,
        "aria-expanded": l,
        "aria-haspopup": "menu",
        children: r ? `Generating ${r}…` : "Download"
      }
    ),
    l && /* @__PURE__ */ E("div", { role: "menu", className: "business-docs-download-menu", children: h.map((g) => /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "menuitem",
        onClick: () => _(g),
        children: [
          /* @__PURE__ */ E("span", { children: it[g].label }),
          /* @__PURE__ */ C("span", { className: "business-docs-download-ext", children: [
            ".",
            it[g].ext
          ] })
        ]
      },
      g
    )) }),
    s && /* @__PURE__ */ E("p", { className: "business-docs-download-error", children: s })
  ] });
}
function P0({ body: e, page: t }) {
  const { website: u } = lu(), r = t?.title || "Business document", n = (t?.title || "document").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return gt(() => Gc(t), [t]), /* @__PURE__ */ C(Ar, { basePath: u.basePath, children: [
    /* @__PURE__ */ E("main", { className: "business-docs-body", children: /* @__PURE__ */ E("div", { className: "business-docs-document", children: e }) }),
    /* @__PURE__ */ E(R0, { title: r, filename: n })
  ] });
}
const B0 = { ...ct, layouts: { BusinessDocLayout: P0 } }, M0 = {}, x0 = {}, G0 = { meta: M0, capabilities: B0, layoutMeta: x0 };
export {
  de as D,
  v0 as E,
  Y0 as I,
  W0 as S,
  G0 as _,
  Hs as a,
  Gu as b,
  kc as c,
  Tc as p,
  Ve as r
};
//# sourceMappingURL=_entry.generated-BhDNGElH.js.map
