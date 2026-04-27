import { jsx as _, jsxs as L, Fragment as Ve } from "react/jsx-runtime";
import { createContext as Dt, useMemo as ge, createElement as Su, useContext as ya, useState as Qe, useEffect as rt, useReducer as Pa, Fragment as je, useRef as Ma } from "react";
import { renderToStaticMarkup as Lt } from "react-dom/server";
import { getUniweb as Ou, deriveCacheKey as xa } from "@uniweb/core";
const Du = /\s+/, Ba = /([+\-*\/=<>!&|]+)/, Yt = {
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
function pe(e, t, u = {}) {
  const a = Object.keys(t), s = u.minQuoteLevel || 0, n = u.splitText || !1;
  u.skipCommas;
  const i = [];
  let d = 0, f = "", T = !1, h = "", A = [], g = "", N = 0;
  const H = ["'", '"', "`", "‘", "’", "“", "”"], Y = (S, $) => S === $ ? !0 : ["‘", "’"].includes(S) && ["‘", "’"].includes($) || ["“", "”"].includes(S) && ["“", "”"].includes($);
  function q(S, $) {
    if (n && S == "text") {
      const ue = $.trim().split(Du);
      for (let z of ue)
        z = wa(z), z !== "" && i.push({ type: S, value: z });
    } else
      i.push({ type: S, value: $ });
    f = "";
  }
  function te(S) {
    N === 0 ? (f !== "" && q("text", f), f = S) : f += S;
  }
  for (; d < e.length; ) {
    const S = e[d];
    a.includes(S) && !T ? (te(S), N = A.push(S), g = t[S]) : S === g && !T ? (f += S, A.pop(), N--, g = N > 0 ? t[A[N - 1]] : "", N === 0 && q("enclosure", f)) : !T && H.includes(S) && N > s ? (te(S), T = !0, h = S) : T && Y(h, S) ? (f += S, T = !1, N === 0 && q("quote", f)) : f += S, d++;
  }
  return f !== "" && q("text", f), i;
}
function ka(e) {
  let t = 0, u = "", a = "", s = !1;
  const n = /* @__PURE__ */ new Map();
  function i(f, T) {
    n.set(a, { type: f, value: T }), s = !1, u = "";
  }
  function d(f) {
    n.set(f, { type: "text", value: !0 }), s = !0, a = f, u = "";
  }
  for (; t < e.length; ) {
    const f = e[t];
    if (f.type == "text" && f.value !== ":") {
      const T = f.value.split(":");
      T.length === 1 ? u += f.value : s ? (u += T[0], i("text", u), u = T[1] ?? "") : (u += T[0], a = u, d(a), u = T[1] ?? "");
    } else
      u !== "" && (s ? i("text", u) : d(u)), s && f.value !== ":" ? i(f.type, f.value) : f.type == "quote" ? (a = f, d(a)) : f.value !== ":" && console.warn(`Unexpected key: ${f.value} type: ${f.type}`);
    u !== "" && (s ? i("text", u) : d(u)), t++;
  }
  return n;
}
function Lu(e, t = []) {
  if (typeof e != "string")
    return e instanceof Object ? { ...e } : {};
  const u = pe(e, { "{": "}", "(": ")" }, { minQuoteLevel: 1 }), a = {};
  function s(n, i, d) {
    const f = `Invalid ${n} for snippet: ${d}. Expecting: ${i}`;
    t.push(f), console.error(f);
  }
  u.length <= 1 && s("input", "[name arg ...] { ... }", e);
  for (let n = 1; n < u.length; n += 2) {
    const i = u[n - 1].value.trim(), d = u[n].type === "enclosure" ? u[n].value[0] : "", f = d == "{" || d == "(" ? u[n].value.slice(1, -1).trim() : "";
    if (i.length < 3 || !i.startsWith("[") || !i.endsWith("]"))
      s("header", "[ ... ]", i);
    else if (!f)
      s("empty body", "{ ... }", i);
    else {
      const T = i.slice(1, -1).trim().split(Du), h = T.shift(), A = T[0] === "$0";
      A && T.shift(), !h || !/^[a-zA-Z_]\w*$/.test(h) ? s("name", "word", T.join(" ")) : T.every((g) => /^(\.\.\.)?[a-zA-Z_]\w*$/.test(g)) ? a[h] = { args: T, body: f, isText: d == "{", hasFlags: A } : s("arguments", "words", T.join(" "));
    }
  }
  return a;
}
function wa(e) {
  let t = 0, u = e.length - 1;
  for (; t <= u && e[t] === ","; )
    t++;
  for (; u >= t && e[u] === ","; )
    u--;
  return e.slice(t, u + 1);
}
function Fa(e) {
  const t = [];
  let u, a, s;
  for (let n of e)
    if (n.type === "text")
      if (u = n.value.split(Ba), u.length <= 1)
        t.push(n);
      else
        for (let i = 0; i < u.length; i++)
          a = u[i].trim(), a !== "" && (s = "+-*/=<>!&|".includes(a[0]), a === "!" && t.push({ type: "text", value: "" }), t.push({ type: "text", value: a, isOperator: s }));
    else
      t.push(n);
  return t;
}
function Ha(e) {
  const t = [];
  let u = 0, a = !1, s = [];
  for (; u < e.length; ) {
    const n = e[u], i = e[u + 1];
    i && i.isOperator ? (a || (a = !0, s = []), s.push(n, i), u += 2) : (a ? (a = !1, s.push(n), t.push({ type: "chain", tokens: s })) : t.push(n), u++);
  }
  return a && t.push({ type: "chain", tokens: s }), t;
}
function Ua(e) {
  const t = [], u = [];
  let a, s, n;
  for (let i of e)
    if (!i.isOperator)
      t.push(i.value);
    else {
      for (; u.length > 0 && Yt[u[u.length - 1]] >= Yt[i.value]; )
        a = u.pop(), s = t.pop(), n = t.pop(), t.push(`(${a} ${n} ${s})`);
      u.push(i.value);
    }
  for (; u.length > 0; )
    a = u.pop(), s = t.pop(), n = t.pop(), t.push(`(${a} ${n} ${s})`);
  return t[0];
}
function va(e) {
  const t = Fa(e), u = Ha(t);
  for (const a of u)
    a.type === "chain" && (a.type = "enclosure", a.value = Ua(a.tokens), delete a.tokens);
  return u;
}
function Ya(e) {
  if (!e.length) return [];
  const t = { show: "#", if: "?", sort: ">>" }, u = t[e[0].value.toLowerCase()];
  if (!u) return e;
  e = va(e);
  let a = { name: u, flags: {}, args: [] }, s = "";
  const n = [], i = ["by", "then", "with"], d = ["as", "of", "sort", "in", "asc", "desc", "heading", "label", "otherwise"], f = {
    sorted: "sort",
    order: "sort",
    ordered: "sort",
    ascending: "asc",
    descending: "desc",
    else: "otherwise"
  };
  for (let h = 1; h < e.length; h++) {
    const A = e[h], g = A.value.toLowerCase();
    A.type == "text" ? g in t ? (n.push(a), a = { name: t[g], flags: {}, args: [] }, s = "") : d.includes(g) ? (s = g, a.flags[s] = !0) : g in f ? (s = f[g], a.flags[s] = !0) : s ? i.includes(g) || (a.flags[s] = A, s = "") : i.includes(g) || a.args.push(A) : s ? (a.flags[s] = A, s = "") : a.args.push(A);
  }
  n.push(a);
  for (let h = 0; h < n.length; h++)
    if (n[h].name == "?") {
      h > 0 && n.unshift(...n.splice(h, 1));
      break;
    }
  const T = n.shift();
  for (const h of n) {
    const A = Wt(h).map((g) => g.value);
    T.args.push({ type: "enclosure", value: "(" + A.join(" ") + ")" });
  }
  if (T.name == "?" && T.args.length == 2) {
    for (const h of n)
      if ("otherwise" in h.flags) {
        T.args.push(h.flags.otherwise);
        break;
      }
  }
  return Wt(T);
}
function Wt(e) {
  const t = [{ type: "text", value: e.name }];
  for (const u of e.args)
    t.push(u);
  for (const u in e.flags) {
    const a = e.flags[u];
    a === !0 ? t.push({ type: "text", value: "-" + u }) : t.push({ type: "text", value: "-" + u + "=" }, a);
  }
  return t;
}
const Wa = {
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
}, Ga = {
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
}, Gt = {
  accessor: {
    "": { handler: qa, minArgs: 2, spread: !1 },
    // handler
    ".": $a
  },
  collector: {
    "": nr,
    // handler
    "++": qt,
    // add, concat, merge
    "++!!": Ru
  },
  creator: {
    "": { handler: Va, spread: !1 },
    //applyCreator, // handler
    "^": de,
    "~": Xa,
    "\\": za,
    // Single backslash \ escaped
    "@": Ja,
    "<>": Za,
    phone: er,
    address: tr,
    org: ur,
    ref: ar,
    currency: rr,
    email: sr
  },
  filter: {
    "": Er,
    // handler
    "&": Tr,
    // !!&
    "|": mr,
    // !!|
    "|=": dr,
    // (|= val set) same as (| (= val set))
    "|?": fr,
    // (|? COND val) same as (| (? COND val))
    "&?": hr,
    "+?": Z
    // or maybe &&
  },
  formatter: {
    "": { handler: pr, minArgs: 1, spread: !1 },
    // handler
    "#": _e
  },
  unary: {
    "": { handler: _r, minArgs: 1, spread: !1 },
    // handler
    "!": Pr,
    // list-aware; use -l to treat list as one value
    "!!": Mr
    // same as (! (! val))
  },
  joiner: {
    "": { handler: Ar, minArgs: 2, spread: !0 },
    // handler
    "+-": ee,
    "+:": ee
    // new name
  },
  mapper: {
    "": { handler: br, minArgs: 2, spread: !0 },
    // handler
    "+": qt,
    // add, prefix, suffix
    "-": ir,
    "%": or,
    "*": cr,
    "/": lr,
    ">": Ir,
    "<": Cr,
    ">=": Sr,
    "<=": Or,
    "=": Dr,
    "==": Lr,
    "!=": Rr,
    "!==": yr
  },
  sorter: {
    "": xr,
    // handlers
    ">>": Br
  },
  switcher: {
    "": wr,
    // handlers
    "?": Re,
    "??": Re,
    // same as ? with no arguments, but can filter several args
    "???": Re,
    "?:": Re
  }
}, Ka = ["wrap", "aux", "label", "heading", "title"];
let mt;
const Kt = {};
function Qt(e, t, u) {
  Kt[e] ??= Qa(e);
  const a = Kt[e];
  if (!a) return;
  if (u.length < a.minArgs) return null;
  if ((a.spread && u.length == a.minArgs && !t.l || t.s) && D(u[u.length - 1])) {
    const i = u.pop();
    u = u.concat(i);
  }
  let s = Ga[e] || [];
  for (let i in s) {
    const d = s[i];
    if (D(d)) {
      for (const f of d)
        if (f in t) {
          t[i] ? t[i] = [t[i], f] : t[i] = f, t.type = i, t.style = f;
          continue;
        }
    }
  }
  !t.type && typeof t.as == "string" && (t.type = t.as), t.lang ? t.locale = t.lang : (t.locale || (t.locale = we(t.locale)), t.lang = Bu(t.locale)), t._name = e;
  const n = a.handler(a.fn, t, u);
  return t.r && D(n) && n.reverse(), n === void 0 ? null : n;
}
function Qa(e) {
  for (let t in Gt) {
    const u = Gt[t];
    if (u.hasOwnProperty(e)) {
      let a = u[""];
      return typeof a == "function" ? a = { handler: a, minArgs: 1, spread: !0 } : K(a) && (a = { ...a }), a.fn = u[e], a;
    }
  }
  return !1;
}
function qa(e, t, u) {
  const a = u[0], s = u.slice(1);
  if (!s.length) return a;
  if (K(a))
    if (s.length > 1 || D(s[0])) {
      const n = s.length == 1 ? s[0] : s, i = [];
      for (const d of n)
        i.push(e(a, d));
      return i;
    } else
      return e(a, s[0]);
  else return s.length == 1 ? e(a, s[0]) : e(a, s);
}
function $a(e, t) {
  if (j(e) && (e = e.toString()), ne(e))
    return Ne(e, t);
  if (D(e)) {
    const u = {};
    for (const a of e)
      u[a] = Ne(a, t);
    return u;
  }
  if (K(e)) {
    const u = {};
    for (const a in e)
      u[e[a]] = Ne(a, t);
    return u;
  }
}
function Va(e, t, u) {
  if (["~", "phone", "address", "ref", "email"].includes(t._name) && he(u)) {
    let a = de(t, u);
    return t._name === "phone" && (a = a.filter((s) => s[0])), a.map((s) => e(t, s));
  }
  return e(t, u);
}
function bt(e) {
  return Math.max(...e.map((t) => Array.isArray(t) ? t.length : 1));
}
function de(e, t) {
  const u = parseInt(e.sz) || bt(t);
  let a = e.dv ?? null;
  a !== null && (a = re(a, ze(a)));
  const s = [];
  for (const n of t)
    Array.isArray(n) ? u > n.length ? s.push([...n, ...Array(u - n.length).fill(a)]) : u < n.length ? s.push(n.slice(0, u)) : s.push(n) : s.push(Array(u).fill(n));
  return e.t ? s : ja(s);
}
function ja(e) {
  const t = [];
  if (e.length === 0)
    return t;
  for (let u = 0; u < e[0].length; u++) {
    const a = [];
    for (let s = 0; s < e.length; s++)
      a.push(e[s][u]);
    t.push(a);
  }
  return t;
}
function Xa(e, t) {
  return new V(e, t);
}
function za(e, t) {
  return new RegExp(t, e);
}
function Ja(e, t) {
  return new Qr(e, t);
}
function Za(e, t) {
  return new P(e, t);
}
function er(e, t) {
  return new qr(e, t);
}
function tr(e, t) {
  return new $r(e, t);
}
function ur(e, t) {
  return new Vr(e, t);
}
function ar(e, t) {
  return new jr(e, t);
}
function rr(e, t) {
  return new Xr(e, t);
}
function sr(e, t) {
  return new zr(e, t);
}
function nr(e, t, u) {
  const a = Ce(u);
  return a.length ? e.init !== void 0 ? a.reduce(e, e.init) : a.reduce(e) : "";
}
function ir(e, t) {
  if (j(e) && j(t)) return e - t;
  if (ne(e) && ne(t)) {
    if (e.length >= t.length) {
      if (e.endsWith(t)) return e.slice(0, -t.length);
    } else if (t.startsWith(e)) return t.slice(e.length);
    return e;
  }
  return null;
}
function or(e, t) {
  return t / e * 100;
}
function cr(e, t) {
  return e * t;
}
function lr(e, t) {
  return j(e) && j(t) ? e / t : e.toString().split(t.toString());
}
function qt(e, t) {
  return e + t;
}
function dr(e) {
  const [t, u] = e;
  return t && u && u instanceof V ? u.contains(t) : !1;
}
function fr(e, t) {
}
function hr(e, t) {
}
function ee(e, t) {
  const u = t[0]?.toString();
  let a = t.slice(1);
  if (a = Ce(a), ne(u))
    return a.filter((n) => !st(n)).join(u);
  if (D(u)) {
    const s = u.length ? u : [""];
    return a.reduce((i, d, f) => {
      if (!d && d !== 0) return "";
      if (f === 0) return d;
      const T = s[Math.min(f - 1, s.length - 1)];
      return i + T + d;
    }, "");
  }
  return "";
}
function Z(e) {
  return e.every((t) => !st(t)) ? ee({}, ["", ...e]) : "";
}
function Ru(e, t) {
  return Te(t) ? e : e + 1;
}
Ru.init = 0;
function Ce(e) {
  return D(e) ? e.flat(1 / 0) : e == null ? [] : typeof e == "object" ? Object.values(e).flat(1 / 0) : [e];
}
function Er(e, t, u) {
  if (!he(u))
    return e(u);
  const a = de({}, u), s = [];
  for (let n = 0; n < a.length; n++)
    s.push(e(a[n]));
  return s;
}
function Tr(e) {
  for (let t = 0; t < e.length; t++)
    if (Te(e[t])) return e[t];
  return e[e.length - 1];
}
function mr(e) {
  for (let t = 0; t < e.length; t++)
    if (!Te(e[t]))
      return e[t];
  return null;
}
function br(e, t, u) {
  const a = u[0], s = u.slice(1);
  let n;
  return /*config.stepIn[0] &&*/ Array.isArray(a) ? n = a.map((i) => $t(e, i, s)) : n = $t(e, a, s), n;
}
function pr(e, t, u) {
  if (u.length === 1)
    return e({ ...t }, u[0]);
  const a = (n) => n.length == 1 ? e({ ...t }, n[0]) : n.map((i) => e({ ...t }, i));
  return he(u) ? de({}, u).map((n) => a(n)) : a(u);
}
function _r(e, t, u) {
  const a = u[0];
  return t.l ? e({ ...t }, a) : Array.isArray(a) ? a.map((s) => e({ ...t }, s)) : e({ ...t }, a);
}
function Ar(e, t, u) {
  if (!he(u))
    return e(t, u);
  const a = de({}, u), s = [];
  for (let n = 0; n < a.length; n++)
    s.push(e(t, a[n]));
  return s;
}
function $t(e, t, u) {
  return u.length == 1 && !D(u[0]) ? e(t, u[0]) : (u.length == 1 && D(u[0]) && (u = u[0]), u.map((a) => Array.isArray(a) ? a.map((s) => e(t, s)) : e(t, a)));
}
function gr(e, t) {
  if (!e) return [];
  if (e = Array.isArray(e) ? e : e.split("|"), ne(t) && (t = t.split(",")), !Fr(t))
    return e;
  const u = [];
  for (const a of t)
    u.push(e[a]);
  return u;
}
function _e(e, t) {
  if (e.type ??= ze(t, e), e.row ? (t = gr(t, e.row), e.type = "list") : t = re(t, e.type, e), t === null) return "";
  const u = e.json ? "json" : e.type, a = { ...e };
  Ka.forEach((n) => {
    delete a[n];
  });
  const s = { ...a, [e.type]: e[e.type] };
  return t = Nr(u, s, t), e.title && ne(t) && (t = xu(t, e.locale)), e.aux && (D(t) && (t = t.join(e.sep || ", ")), t = Rt(e, t)), e.label && (D(t) && (t = t.join(e.sep || ", ")), e.label === !0 && (e.label = e._params[0]), t = Kr(e, t)), e.heading && (D(t) && (t = t.join(e.sep || ", ")), e.heading === !0 && (e.heading = e._params[0]), t = Gr(e, t)), e.wrap && (st(t) ? t = "" : (e.wrap === !0 && (e.wrap = "()"), t = e.wrap[0] + t + e.wrap[1])), t;
}
function Nr(e, t, u) {
  switch (e) {
    case "null":
      return "";
    case "entity":
      return u.format(t);
    case "date":
      return Ur(t, u);
    case "number":
      return vr(t, u);
    case "text":
    case "string":
      return Yr(t, u);
    case "object":
      return Mu(t, u);
    case "json":
      return JSON.stringify(u);
    case "list":
      return Pu(t, u);
    case "boolean":
      return u ? "1" : "0";
    default:
      return u ? u?.toString() || "" : (console.warn(`Cannot format type: ${t.type} for the value ${u}`), "");
  }
}
function Ir(e, t) {
  return e > t;
}
function Cr(e, t) {
  return e < t;
}
function Sr(e, t) {
  return e >= t;
}
function Or(e, t) {
  return e <= t;
}
function Dr(e, t) {
  return e == t;
}
function Lr(e, t) {
  return e === t;
}
function Rr(e, t) {
  return e != t;
}
function yr(e, t) {
  return e !== t;
}
function Pr(e, t) {
  return Te(t);
}
function Mr(e, t) {
  return !Te(t);
}
function xr(e, t, u) {
  if (!he(u))
    return e(t, u);
  const a = de({}, u), s = [];
  for (let n = 0; n < a.length; n++)
    s.push(e(t, a[n]));
  return s;
}
function Br(e, t) {
  const u = e.date ? kr : yu, a = e.desc ? -1 : 1;
  return t.sort((s, n) => a * u(e, s, n));
}
function Xe(e, t) {
  if (t.by && K(e) && !D(e)) {
    const u = e[t.by];
    return u !== void 0 ? u : Vt(e);
  }
  return Vt(e);
}
function kr(e, t, u) {
  let a = Xe(t, e), s = Xe(u, e);
  return Ee(a) && Ee(s) ? re(a, "date").getTime() - re(s, "date").getTime() : yu(e, t, u);
}
function yu(e, t, u) {
  let a = Xe(t, e), s = Xe(u, e);
  const n = j(a), i = j(s);
  return n && i ? Number(a) - Number(s) : !n && !i ? (typeof a != "string" && (a = String(a)), typeof s != "string" && (s = String(s)), a.localeCompare(s, e.locale)) : n ? -1 : 1;
}
function Vt(e) {
  if (D(e))
    return e[0];
  if (e instanceof Map)
    return e.values().next().value;
  if (K(e)) {
    const t = Object.keys(e);
    return e[t[0]];
  } else
    return e;
}
function wr(e, t, u) {
  let a = [], s = [];
  if (t._name === "?:")
    a = u, s = u;
  else {
    let n = parseInt(t.cases);
    if (n || (n = { "??": 2, "???": 3 }[t._name] || 1), n >= u.length)
      return null;
    a = u.slice(0, n), s = u.slice(n);
  }
  if (!he(a) && !he(s))
    return e(t, a, s);
  {
    const n = Math.max(bt(a), bt(s)), i = { sz: n }, d = de(i, a), f = de(i, s), T = [];
    for (let h = 0; h < n; h++)
      T.push(e(t, d[h], f[h]));
    return T;
  }
}
function Re(e, t, u) {
  for (let a = 0; a < t.length; a++)
    if (!Te(t[a]))
      return u[a];
  return u.length > t.length ? u[t.length] : null;
}
function st(e) {
  return e == null || e === "" || Number.isNaN(e) ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof w && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function Te(e) {
  return !e || e === "0" ? !0 : Array.isArray(e) ? e.length === 0 : e instanceof w && typeof e.isEmpty == "function" && e.isEmpty() ? !0 : typeof e == "object" && e.constructor === Object ? Object.keys(e).length === 0 : !1;
}
function Ne(e, t) {
  const u = e.split(".");
  let a = t;
  for (let s = 0; s < u.length; s++) {
    let n = u[s];
    if (D(a) && !j(n)) {
      const i = [];
      for (let d of a)
        n = u.slice(s).join("."), i.push(Ne(n, d));
      return i;
    }
    if (a === null)
      return;
    if (typeof a == "object")
      if (a.hasOwnProperty(n))
        a = a[n];
      else
        return n = u.slice(s).join("."), a.hasOwnProperty(n) ? a[n] : void 0;
    else if (a instanceof Map)
      a = a.get(n);
    else
      return;
    if (a === void 0)
      return;
  }
  return a;
}
function K(e) {
  return e !== null && typeof e == "object";
}
function ne(e) {
  return typeof e == "string";
}
function D(e) {
  return Array.isArray(e);
}
function Fr(e) {
  if (!D(e) || !e.length) return !1;
  for (const t of e)
    if (!j(t)) return !1;
  return !0;
}
function he(e) {
  for (let t of e)
    if (D(t)) return !0;
  return !1;
}
function j(e) {
  return !isNaN(Number(e));
}
function Ee(e) {
  return e ? e instanceof Date ? !0 : typeof e != "string" ? !1 : !isNaN(new Date(e).getTime()) : !1;
}
function Hr(e) {
  return Ee(e) ? !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(e) : !1;
}
function re(e, t, u = {}) {
  switch (t) {
    case "boolean":
      return !Te(e);
    case "date":
      return Ee(e) ? e instanceof Date || u.date === "auto" && Hr(e) ? e : new Date(e.replace(/-/g, "/")) : null;
    case "text":
    case "string":
      return ne(e) ? e : ee(Ce(e));
    case "list":
      return D(e) ? e : K(e) ? Ce(e) : null;
    case "object":
      return K(e) ? e : null;
    case "number":
      return j(e) ? parseFloat(e) : Ee(e) ? re(e, "date").getTime() : 0;
    case "range":
      return e instanceof V ? e : D(e) ? new V(u, e) : K(e) ? new V(u, [e.start, e.end]) : new V(u, [e]);
    case "tag":
      return e instanceof P ? e : D(e) ? new P(u, [e]) : e instanceof w ? new P(u, [[null, e, null]]) : K(e) ? new P(u, [e]) : new P(u, [[null, e, null]]);
  }
  return e;
}
function ze(e, t = {}) {
  if (e instanceof w)
    return "entity";
  if (e instanceof Date)
    return "date";
  const u = typeof e;
  return u == "undefined" || e === null ? "null" : u == "boolean" ? u : D(e) ? "list" : j(e) ? "number" : Ee(e) ? "date" : K(e) ? "object" : u;
}
function Ur(e, t) {
  if (!Ee(t))
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
  let a = e.date;
  return ne(a) && (a = u[a]), (!a || a === !0) && (a = "medium"), ne(a) && (a = { dateStyle: a }), t instanceof Date ? t.toLocaleDateString(e.locale, a) : t;
}
function vr(e, t) {
  if (isNaN(t)) return "";
  if (!e.style && Number.isInteger(t) && Math.abs(t) < 1e4)
    return t.toString();
  let u = e.style;
  if (typeof u == "string" && (u = { style: u }, u.style === "currency")) {
    const a = e.currency;
    a && typeof a == "string" ? u.currency = a.toUpperCase() : u = void 0;
  }
  return t.toLocaleString(e.locale, u);
}
function Yr(e, t) {
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
function Pu(e, t) {
  const u = [];
  for (let a of t)
    D(a) ? a = Pu(e, a) : K(a) && (a = Mu(e, a)), st(a) || u.push(a);
  return u.join(e.sep === void 0 ? " " : e.sep);
}
function Mu(e, t) {
  return JSON.stringify(t);
}
function xu(e, t) {
  t = we(t);
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
  function a(s) {
    return s.charAt(0).toLocaleUpperCase(t) + s.slice(1).toLocaleLowerCase(t);
  }
  return t.toLowerCase().startsWith("en") ? e.split(" ").map((s, n, i) => n === 0 || n === i.length - 1 || !u.has(s.toLowerCase()) ? a(s) : s.toLowerCase()).join(" ") : a(e);
}
function Wr(e) {
  mt = typeof document < "u" && document.documentElement?.getAttribute("lang") || "en";
}
function we(e = null) {
  return mt || Wr(), e || mt;
}
function Bu(e = null) {
  return we(e).split("-")[0].toLowerCase();
}
function jt(e) {
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
  }[Bu(e)];
}
function Rt(e, t) {
  return t ? new P(e, [["u-aux", t]]).format() : "";
}
function Gr(e, t) {
  if (!t && !e.force) return "";
  let u = e.level || 3;
  return new P(e, [
    [
      "u-value-group",
      new P(e, [
        [`h${u}`, e.heading],
        ["span", t]
      ])
    ]
  ]).format();
}
function Kr(e, t) {
  return !t && !e.force ? "" : new P(e, [
    [
      "u-inline-value-group",
      new P(e, [
        ["label", e.label],
        ["span", t]
      ])
    ]
  ]).format();
}
class w {
  constructor(t, u) {
    if (this.flags = { ...t }, this.values = Array.isArray(u) ? [...u] : typeof u == "object" ? { ...u } : u, this.parsedArgs = null, new.target === w)
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
    const a = this.getFieldMapping(), s = Object.keys(t);
    return Object.keys(a).forEach((n) => {
      let i = a[n];
      Array.isArray(i) || (i = [i]);
      let d = [], f = [];
      i.forEach((h) => {
        if (Array.isArray(h)) {
          let A = this.applyFunction(t, h);
          d.push(A), f.push(A);
        } else
          d.push(s.includes(h)), f.push(t?.[h] || "");
      });
      let T = Re({}, d, f);
      u[n] = T;
    }), u;
  }
  applyFunction(t, u) {
    switch (u.shift()) {
      case ".":
        const s = u[1];
        if (!t?.[s]) return !1;
        let n = t[s];
        const i = u[0];
        return i || i === 0 ? n[i] : "";
      default:
        return !1;
    }
  }
  getFieldMapping() {
    return {};
  }
}
class Qr extends w {
  constructor(t, u) {
    super(t, u);
    let a = D(u) ? u?.[0] : u;
    this.values = K(a) ? a : {};
  }
  toString() {
    return this.values[this.flags.lang];
  }
  isEmpty() {
    return !this.values || Object.keys(this.values).length === 0;
  }
}
class V extends w {
  constructor(t, u) {
    super(t, u);
    const a = Ce(u), s = a[0], n = a[1];
    this.givenStart = s, this.givenEnd = n, this.includeStart = !t.open, this.includeEnd = !t.open, this.flags.type || (this.flags.type = ze(s || n)), this.start = re(s, "number"), this.end = re(n, "number");
  }
  /**
   * Check if the Range includes a specific value
   */
  contains(t) {
    if (t instanceof V) return this.overlaps(t);
    t = re(t, "number");
    let u = this.start ? this.includeStart ? t >= this.start : t > this.start : !0, a = this.end ? this.includeEnd ? t <= this.end : t < this.end : !0;
    return u && a;
  }
  /**
   * Check if another Range overlaps with this Range.
   */
  overlaps(t) {
    if (this.start && this.end && t.start && t.end) {
      const u = (this.includeStart || t.includeStart ? t.start >= this.start : t.start > this.start) && (this.includeEnd || t.includeEnd ? t.end <= this.end : t.end < this.end), a = (this.includeStart || t.includeStart ? this.start >= t.start : this.start > t.start) && (this.includeEnd || t.includeEnd ? this.end <= t.end : this.end < t.end), s = (this.includeStart || t.includeStart ? t.start <= this.end : t.start < this.end) && (this.includeEnd || t.includeEnd ? t.end >= this.start : t.end > this.start);
      return u || a || s;
    }
    return this.start && !this.end ? t.start ? this.includeStart || t.includeStart ? t.start >= this.start : t.start > this.start : !0 : !this.start && this.end ? t.end ? this.includeEnd || t.includeEnd ? t.end <= this.end : t.end < this.end : !0 : t.start && !t.end ? this.start && this.end ? (this.includeStart || t.includeStart ? t.start >= this.start : t.start > this.start) && (this.includeEnd ? t.start <= this.end : t.start < this.end) : !0 : !t.start && t.end ? this.start && this.end ? (this.includeStart ? t.end >= this.start : t.end > this.start) && (this.includeEnd || t.includeEnd ? t.end <= this.end : t.end < this.end) : !0 : !this.start && this.end && t.start && !t.end ? this.includeEnd ? t.start <= this.end : t.start < this.end : this.start && !this.end && !t.start && t.end ? this.includeStart ? t.end >= this.start : t.end > this.start : !this.start && !this.end || !t.start && !t.end || !this.start && !this.end && !t.start && !t.end;
  }
  format(t) {
    t = { ...t, ...this.flags };
    const u = t.separator || " – ";
    let a = this.givenStart, s = this.givenEnd;
    return t.type === "date" ? (a = a ? _e(t, a) : jt(t.locale), s = s ? _e(t, s) : jt(t.locale)) : t.type !== "range" && (a = _e(t, a || ""), s = _e(t, s || "")), a || s ? `${a}${u}${s}` : "";
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
class P extends w {
  constructor(t, u) {
    super(t, u);
    let { tag: a } = t, s = a ? D(a) ? a : [a] : [];
    this.markups = u.map((n) => {
      let i = "", d = "", f = {};
      Array.isArray(n) ? [i, d, f = {}] = n : typeof n == "object" ? (i = n.tag || "", d = n.children || "", f = n.attrs || {}) : typeof n == "string" && (d = n);
      let T = i ? [...s, i] : [...s];
      return T.length || (T = ["span"]), { tag: T, children: d, attrs: f };
    });
  }
  format() {
    let t = "";
    const u = ["strong", "em", "u", "s", "sup", "sub"];
    return this.markups.forEach((a) => {
      const { tag: s, children: n, attrs: i } = a;
      let d = n || "";
      s.forEach((f, T) => {
        let h = "", A = {};
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
          if (d) {
            if (d instanceof w && d.isEmpty()) return "";
          } else return "";
        if (T === 0 && (A = i), A && Object.keys(A).length) {
          h = h === "_self" ? "span" : h;
          let g = Object.keys(A).reduce((N, H) => `${N} ${H}="${A[H]}"`, "");
          d = `<${h}${g}>${d}</${h}>`;
        } else
          h === "span" && !d || (d = h === "_self" ? d : `<${h}>${d}</${h}>`);
      }), t += d;
    }), t;
  }
  isEmpty() {
    return this.markups.length === 1 && this.markups[0].tag.length === 1 && !this.markups[0].children && (!this.markups[0].attrs || !Object.keys(this.markups[0].attrs).length);
  }
  toString() {
    return this.format();
  }
}
class qr extends w {
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
    const { link: t = !1 } = this.flags, { type: u, country: a, ext: s, start: n, end: i } = this.parsedArgs;
    let d = new V({}, [n, i]).format();
    return [
      Z([u, ":"]),
      Z(["+", a]),
      this.buildNumber(),
      Z(["x ", s]),
      // joinIfAllTrue(['(', new Range({}, [start, end]), ')']),
      d ? new P({}, [["u-aux", d]]).format() : ""
    ].filter(Boolean).join(" ");
  }
  buildNumber() {
    const { area: t, number: u } = this.parsedArgs;
    return !t && !u ? "" : Z([Z(["(", t, ") "]), u]);
  }
  isEmpty() {
    return !this.buildNumber();
  }
  toString() {
    return this.format();
  }
}
class $r extends w {
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
      city: a,
      line1: s = "",
      line2: n = "",
      line3: i = "",
      line4: d = "",
      line5: f = "",
      province: T,
      zip: h = "",
      start: A = "",
      end: g = ""
    } = this.parsedArgs;
    return [
      ee({}, [
        " ",
        _e({ tag: "bold", type: "tag", bold: !0 }, Z([t, ":"])),
        ee({}, [
          " ",
          s,
          Z(["(", new V({}, [A, g]), ")"])
        ])
      ]),
      n,
      i,
      d,
      f,
      ee({}, [
        ", ",
        a,
        ee({}, [" ", T, Z(["(", u, ")"])])
      ]),
      h
    ].filter(Boolean).join("</br>");
  }
  isEmpty() {
    const { country: t, city: u, line1: a = "", province: s } = this.parsedArgs;
    return !t && !u && !a && !s;
  }
  toString() {
    return this.format();
  }
}
class Vr extends w {
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
    const { type: t, organization: u, country: a, province: s } = this.parsedArgs, n = ee(null, [" - ", a, s, t]);
    return new P({}, [
      [
        "u-org",
        new P({}, [
          ["u-org-name", u],
          ["_self", Rt({}, n)]
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
class jr extends w {
  constructor(t, u) {
    super(t, Ce(u));
  }
  format() {
    const [t, ...u] = this.values, a = ee(null, [" - ", ...u]);
    return t ? new P({}, [
      [
        "u-ref",
        new P({}, [
          ["u-ref-name", t],
          ["_self", Rt({}, a)]
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
class Xr extends w {
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
    const { amount: t, currency: u, convertedAmount: a } = this.parsedArgs, s = Wa[u.toLowerCase()], i = [["u-amount", s ? new Intl.NumberFormat(`${we()}-CA`, {
      style: "currency",
      currency: s
    }).format(t) : t]];
    return u && i.push(["u-unit", u]), a && a !== "0" && i.push([
      "u-aux",
      new Intl.NumberFormat(`${we()}-CA`, {
        style: "currency",
        currency: "CAD"
      }).format(a)
    ]), new P({}, [["u-currency", new P({}, i)]]).format();
  }
  isEmpty() {
    return !this.parsedArgs.amount;
  }
  toString() {
    return this.format();
  }
}
class zr extends w {
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
    const { type: t, email: u, start: a = "", end: s = "" } = this.parsedArgs;
    let n = new V({}, [a, s]).format();
    return [
      Z([t, ":"]),
      u,
      n ? new P({}, [["u-aux", n]]).format() : ""
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
const Xt = /^[@]?[\$]?[\/]?[a-zA-Z_][a-zA-Z0-9_\/\.-]*$|^@$|^\?$/, Jr = /^-?\d+(\.\d+)?$/;
class Zr {
  /**
   * Create a loom with given snippets and custom functions.
   *
   * @param {Object|string} snippets - A key-value object, or a string with snippet definitions.
   * @param {Object} functions - A map of custom function names to handlers.
   */
  constructor(t = {}, u = {}) {
    this.snippets = Lu(t), this.functions = u;
  }
  /**
   * Sets the template variables.
   *
   * @param {Object|function} variables - A key-value object, or a function that maps a key to a value.
   * @return {void}
   */
  setVariables(t) {
    this.variables = typeof t == "function" ? t : (u) => Ne(u, t);
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
  render(t, u = null, a = null) {
    u && this.setVariables(u);
    const s = pe(t, { "{": "}" });
    let n = "";
    for (const i of s)
      if (i.type === "enclosure") {
        let d = i.value.slice(1, -1);
        d.startsWith("{") && d.endsWith("}") && (d = d.slice(1, -1));
        try {
          d = this.evaluateText(d, null, a), typeof d != "string" && (d = Qt("#", { l: !0, sep: ", " }, [d]), Array.isArray(d) && d.every((f) => typeof f == "string") && (d = d.join(", ")));
        } catch (f) {
          d = f;
        }
        n += d;
      } else
        n += i.value;
    return n;
  }
  /**
   * Evaluates a placeholder.
   *
   * @param {string} text - The placeholder's text to evaluate.
   * @param {Object|function} [variables] - A key-value object, or a function that maps a key to a value.
   * @param {Map} [auxVariables] - Local variables that don't change this.variables.
   * @returns {*} The result of evaluation the placeholder.
   */
  evaluateText(t, u = null, a = null) {
    if (t = t.trim(), u && this.setVariables(u), Xt.test(t))
      return this.getVariable(t, a);
    if (t.length > 2 && t[0] === "(" && t[t.length - 1] === ")") {
      let s = 1, n = !0;
      for (let i = 1; i < t.length - 1; i++)
        if (t[i] === "(" ? s++ : t[i] === ")" && s--, s === 0) {
          n = !1;
          break;
        }
      if (n)
        return this.evaluateFunction(t.slice(1, -1), a);
    }
    return this.evaluateFunction(t, a);
  }
  evaluateList(t, u) {
    const a = pe(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!a.length) return "";
    const s = [];
    for (const n of a)
      s.push(this.evaluateExpression(n, u).value);
    return s;
  }
  evaluateObject(t, u) {
    const a = pe(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!a.length) return "";
    const s = ka(a), n = {};
    for (let [i, d] of s.entries())
      typeof i != "string" && (i = this.evaluateExpression(i, u).value), d = this.evaluateExpression(d, u).value, n[i] = d;
    return n;
  }
  parseFunction(t) {
    let u = pe(
      t,
      { "(": ")", "[": "]", "{": "}" },
      { minQuoteLevel: -1, splitText: !0 }
    );
    if (!u.length) return {};
    u = Ya(u);
    let a;
    return u[0].type == "text" && u[0].value[0] != "-" ? a = u.shift().value : u[0].type != "quote" || u[0].value[0] == "`" ? a = "#" : a = "+:", { name: a, tokens: u };
  }
  evaluateFunction(t, u) {
    const { name: a, tokens: s } = this.parseFunction(t);
    if (!a) return "";
    const n = [], i = { _params: [] };
    for (let f = 0; f < s.length; f++) {
      const T = s[f];
      if (T.type == "quote" && T.value[0] === "`" && (T.value = T.value.slice(1, -1).toLowerCase().split(" ").join("_"), T.type = "text"), T.type == "quote")
        n.push(T.value.slice(1, -1));
      else if (T.type == "text" && T.value.startsWith("-")) {
        const h = T.value.slice(1).split("=");
        if (h[1] === "" && f + 1 < s.length) {
          const A = s[++f];
          h[1] = this.evaluateExpression(A, u).value;
        } else h[1] && h[1][0] === "@" && (h[1] = this.evaluateExpression({ value: h[1] }, u).value);
        i[h[0]] = h[1] ?? !0;
      } else {
        const h = this.evaluateExpression(T, u);
        n.push(h.value), h.label && i._params.push(T.label);
      }
    }
    const d = Qt(a, i, n);
    if (d !== void 0)
      return d;
    if (this.snippets.hasOwnProperty(a))
      return this.callSnippet(a, i, n);
    {
      const f = this.functions[a] ?? this.functions[a.toLowerCase()] ?? this.functions[a.toUpperCase()] ?? !1;
      return f ? this.callCustomFunction(f, i, n) : this.applyFallback(a, n);
    }
  }
  callCustomFunction(t, u, a) {
    const s = (n) => this.evaluateText(n);
    return t.call({ evaluate: s }, u, ...a);
  }
  applyFallback(t, u) {
    if (typeof Math[t] == "function")
      return Math[t](...u);
    let a = u[0];
    const s = typeof a;
    if (s === "object") {
      if (a === null)
        return "";
      Array.isArray(a) || (a = Object.values(a));
    } else if (s !== "string")
      return this.getError(102, "Invalid function name", t);
    const n = a[t] ?? a[t.toLowerCase()];
    if (typeof n != "function")
      return this.getError(104, "Invalid function name", t);
    if (u.length <= 1) return n.call(a);
    if (s === "string") return n.call(a, ...u.slice(1));
    const i = u[1], d = /* @__PURE__ */ new Map();
    return n.call(a, (...f) => {
      for (let T = 0; T < f.length; T++)
        d.set("$" + (T + 1), f[T]);
      return this.evaluateFunction(i, d);
    });
  }
  getVariableMeta(t) {
    let u = this.variables("@" + t) || {};
    return typeof u == "string" ? { label: u } : (u.label ??= xu(t.split("_").join(" ")), u);
  }
  /**
   * Evaluates an expression.
   * @param {Object} token - The expression to evaluate.
   * @param {Map} [auxVariables] - Extra environment variable values.
   * @returns {Object} The result of evaluating the expression as {value, type, label}
   */
  evaluateExpression(t, u = null) {
    const { value: a, type: s } = t;
    if (s === "quote")
      return { value: a.slice(1, -1), type: s };
    if (t.type === "enclosure") {
      if (a.startsWith("(") && a.endsWith(")"))
        return {
          value: this.evaluateFunction(a.slice(1, -1), u),
          type: "function"
        };
      if (a.startsWith("[") && a.endsWith("]"))
        return {
          value: this.evaluateList(a.slice(1, -1), u),
          type: "list"
        };
      if (a.startsWith("{") && a.endsWith("}"))
        return {
          value: this.evaluateObject(a.slice(1, -1), u),
          type: "object"
        };
    }
    return u && u.has(a) ? { value: u.get(a), type: "aux" } : Xt.test(a) ? {
      value: this.getVariable(a, u),
      label: this.getVariableMeta(a).label,
      type: "variable"
    } : Jr.test(a) ? { value: parseFloat(a), type: "number" } : { value: this.getError(103, "Invalid expression", a), type: "error" };
  }
  getVariable(t, u = null) {
    if (t.startsWith("@"))
      return this.getVariableMeta(t.slice(1)).label;
    const a = this.variables(t);
    if (a !== void 0) {
      const s = this.getVariableMeta(t);
      return s.type ? re(a, s.type) : a;
    } else return u && u.has(t) ? u.get(t) : this.snippets.hasOwnProperty(t) ? this.callSnippet(t) : this.functions.hasOwnProperty(t) ? this.callCustomFunction(this.functions[t], []) : t === "_now" ? /* @__PURE__ */ new Date() : { true: !0, false: !1, null: null }[t];
  }
  callSnippet(t, u = {}, a = []) {
    let s = this.snippets[t];
    return typeof s != "function" && (s = this.makeSnippetFunction(s), this.snippets[t] = s), s(u, a);
  }
  makeSnippetFunction(t) {
    const u = t.args || [], a = t.isText, s = t.body, n = t.hasFlags, i = /* @__PURE__ */ new Map();
    return (f, T) => {
      n && i.set("$0", f);
      for (let h = 0; h < T.length; h++) {
        const A = u[h] || "$" + (h + 1);
        if (A.startsWith("...")) {
          i.set(A.slice(3), T.slice(h));
          break;
        } else
          i.set(A, T[h]);
      }
      return a ? this.render(s, null, i) : this.evaluateFunction(s, i);
    };
  }
  getError(t, u, a) {
    throw console.error(`Error ${t}: ${u} '${a}'`), `Error[${t}][${a}]`;
  }
}
const ku = [
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
ku.sort((e, t) => t.length - e.length);
const es = new Set(ku.map((e) => e.join(" ").toUpperCase())), ts = /* @__PURE__ */ new Set([
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
]), us = /* @__PURE__ */ new Set([">=", "<=", "!=", "==", "&&", "||"]), as = /* @__PURE__ */ new Set(["+", "-", "*", "/", "%", "=", "<", ">", "!"]), rs = /[a-zA-Z_@$?]/, ss = /[a-zA-Z0-9_.\/@]/, ft = /[0-9]/;
function ns(e) {
  return is(e);
}
function is(e) {
  const t = [], u = e.length;
  let a = 0;
  for (; a < u; ) {
    const s = e[a];
    if (s === " " || s === "	" || s === `
` || s === "\r") {
      a++;
      continue;
    }
    if (s === ",") {
      t.push({ type: "comma", value: "," }), a++;
      continue;
    }
    if (s === '"' || s === "'" || s === "`") {
      const i = wu(e, a, s);
      if (i < 0) throw new Error(`Unterminated string starting at ${a}`);
      t.push({ type: "string", value: e.slice(a + 1, i) }), a = i + 1;
      continue;
    }
    if (s === "{") {
      const i = cs(e, a, "{", "}");
      if (i < 0) throw new Error(`Unmatched '{' at ${a}`);
      t.push({ type: "loom", value: e.slice(a, i + 1) }), a = i + 1;
      continue;
    }
    if (s === "(") {
      t.push({ type: "lparen", value: "(" }), a++;
      continue;
    }
    if (s === ")") {
      t.push({ type: "rparen", value: ")" }), a++;
      continue;
    }
    if (ft.test(s) || s === "-" && ft.test(e[a + 1] || "") && os(t)) {
      let i = a + (s === "-" ? 1 : 0);
      for (; i < u && (ft.test(e[i]) || e[i] === "."); ) i++;
      t.push({ type: "number", value: parseFloat(e.slice(a, i)) }), a = i;
      continue;
    }
    const n = e.slice(a, a + 2);
    if (us.has(n)) {
      t.push({ type: "operator", value: n }), a += 2;
      continue;
    }
    if (as.has(s)) {
      t.push({ type: "operator", value: s }), a++;
      continue;
    }
    if (rs.test(s)) {
      let i = a + 1;
      for (; i < u && ss.test(e[i]); ) i++;
      const d = e.slice(a, i), f = d.toLowerCase();
      f === "and" ? t.push({ type: "operator", value: "&" }) : f === "or" ? t.push({ type: "operator", value: "|" }) : f === "not" ? t.push({ type: "operator", value: "!" }) : t.push({ type: "word", value: d }), a = i;
      continue;
    }
    t.push({ type: "unknown", value: s }), a++;
  }
  return t;
}
function os(e) {
  if (e.length === 0) return !0;
  const t = e[e.length - 1];
  return !!(t.type === "operator" || t.type === "lparen" || t.type === "word" && es.has(t.value.toUpperCase()));
}
function wu(e, t, u) {
  for (let a = t + 1; a < e.length; a++) {
    if (e[a] === "\\" && a + 1 < e.length) {
      a++;
      continue;
    }
    if (e[a] === u) return a;
  }
  return -1;
}
function cs(e, t, u, a) {
  let s = 0;
  for (let n = t; n < e.length; n++) {
    const i = e[n];
    if (i === '"' || i === "'" || i === "`") {
      const d = wu(e, n, i);
      if (d < 0) return -1;
      n = d;
      continue;
    }
    if (i === u) s++;
    else if (i === a && (s--, s === 0))
      return n;
  }
  return -1;
}
function ls(e, t, u) {
  for (const a of u) {
    if (t + a.length > e.length) continue;
    let s = !0;
    for (let n = 0; n < a.length; n++) {
      const i = e[t + n];
      if (i.type !== "word" || i.value.toLowerCase() !== a[n]) {
        s = !1;
        break;
      }
    }
    if (s)
      return {
        canonical: a.join(" ").toUpperCase(),
        length: a.length
      };
  }
  return null;
}
class se extends Error {
}
const ds = /* @__PURE__ */ new Set(["long", "full", "short", "medium"]), fs = [
  ["for", "each"],
  ["total", "of"],
  ["sum", "of"],
  ["average", "of"],
  ["count", "of"],
  ["show"],
  ["if"]
], He = [
  ["from", "lowest", "to", "highest"],
  ["from", "highest", "to", "lowest"],
  ["sorted", "by"],
  ["joined", "by"],
  ["with", "label"],
  ["if", "present"],
  ["where"],
  ["as"],
  ["if"]
], hs = [["then"], ["show"]], Es = [["otherwise"], ["else"]], Ts = [["else"], ["show"]], ms = [["in"]], bs = [["do"]], ps = [["ascending"]], _s = [["descending"]];
function W(e, t) {
  return ls(e.tokens, e.i, t);
}
function k(e, t) {
  e.i += t.length;
}
function As(e) {
  const t = { tokens: e, i: 0 }, u = yt(t);
  if (u == null)
    throw new se("Empty Plain expression");
  if (t.i < t.tokens.length) {
    const a = t.tokens.slice(t.i).map((s) => s.value).join(" ");
    throw new se(`Unexpected trailing tokens: ${a}`);
  }
  return u;
}
function M(e, t = 0) {
  return e.tokens[e.i + t];
}
function y(e) {
  return e.tokens[e.i++];
}
function Fu(e, t, u) {
  const a = M(e);
  if (!a || a.type !== t || u != null) {
    const s = a ? `${a.type}:${a.value}` : "end of input";
    throw new se(`Expected ${t}, got ${s}`);
  }
  return y(e);
}
function yt(e) {
  const t = M(e);
  if (!t) return null;
  const u = W(e, fs);
  if (u && !gs(e, u))
    switch (k(e, u), u.canonical) {
      case "IF":
        return Ds(e);
      case "SHOW":
        return zt(e);
      case "TOTAL OF":
      case "SUM OF":
        return ht(e, { type: "sum", value: Q(e) });
      case "AVERAGE OF":
        return ht(e, { type: "average", value: Q(e) });
      case "COUNT OF":
        return ht(e, Ls(e));
      case "FOR EACH":
        return Rs(e);
    }
  if (t.type === "word" && Ns(e)) {
    const a = Is(e), s = Pt(e);
    return s.length > 0 ? { type: "show", value: a, modifiers: s } : a;
  }
  {
    const a = e.i;
    try {
      const s = Mt(e);
      if (s != null && e.i >= e.tokens.length)
        return s;
    } catch {
    }
    e.i = a;
  }
  return zt(e);
}
function gs(e, t) {
  return e.tokens.length - e.i - t.length <= 0 && t.length === 1;
}
function Ns(e) {
  const t = M(e, 1);
  if (!t) return !1;
  if (t.type === "string" || t.type === "number" || t.type === "lparen" || t.type === "loom")
    return !0;
  if (t.type === "word") {
    const u = e.i;
    e.i += 1;
    const a = W(e, He);
    return e.i = u, a == null;
  }
  return !1;
}
function Is(e) {
  const t = y(e).value, u = [];
  for (; e.i < e.tokens.length; ) {
    const a = M(e);
    if (!a) break;
    if (a.type === "comma") {
      y(e);
      continue;
    }
    if (a.type === "rparen" || a.type === "operator" || a.type === "word" && W(e, He)) break;
    const s = Q(e);
    if (s == null) break;
    u.push(s);
  }
  return { type: "call", name: t, args: u };
}
function zt(e) {
  const t = Cs(e);
  if (t.length === 0) {
    const s = M(e), n = s ? `${s.type}:${s.value}` : "end of input";
    throw new se(`Expected a value, got ${n}`);
  }
  const u = Pt(e);
  if (t.length > 1) {
    for (const i of u)
      if (i.type !== "joinedBy" && i.type !== "ifPresent")
        throw new se(
          `Multi-value SHOW supports only JOINED BY and IF PRESENT (got ${i.type})`
        );
    const s = u.some((i) => i.type === "joinedBy"), n = u.some((i) => i.type === "ifPresent");
    if (s && n)
      throw new se(
        "JOINED BY and IF PRESENT cannot be combined on the same SHOW"
      );
    return { type: "show", values: t, modifiers: u };
  }
  const a = t[0];
  return u.length === 0 && Ss(a) ? { type: "show", value: a, modifiers: [] } : { type: "show", value: a, modifiers: u };
}
function Cs(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const u = M(e);
    if (!u) break;
    if (u.type === "comma") {
      y(e);
      continue;
    }
    if (u.type === "rparen" || u.type === "operator" || u.type === "word" && W(e, He)) break;
    const a = Q(e);
    if (a == null) break;
    t.push(a);
  }
  return t;
}
function Ss(e) {
  return e.type === "var" || e.type === "string" || e.type === "number" || e.type === "loom" || e.type === "group";
}
function Pt(e) {
  const t = [];
  for (; e.i < e.tokens.length; ) {
    const u = W(e, He);
    if (!u) break;
    switch (u.canonical) {
      case "AS": {
        k(e, u), t.push({ type: "as", format: Os(e) });
        break;
      }
      case "WITH LABEL": {
        k(e, u);
        let a = null;
        M(e) && M(e).type === "string" && (a = y(e).value), t.push({ type: "withLabel", label: a });
        break;
      }
      case "SORTED BY": {
        k(e, u);
        const a = Q(e);
        let s = "asc";
        const n = W(e, _s);
        if (n)
          k(e, n), s = "desc";
        else {
          const i = W(e, ps);
          i && k(e, i);
        }
        t.push({ type: "sortedBy", value: a, order: s });
        break;
      }
      case "FROM LOWEST TO HIGHEST": {
        k(e, u), t.push({ type: "sortedBy", value: Q(e), order: "asc" });
        break;
      }
      case "FROM HIGHEST TO LOWEST": {
        k(e, u), t.push({ type: "sortedBy", value: Q(e), order: "desc" });
        break;
      }
      case "JOINED BY": {
        k(e, u);
        const a = M(e);
        if (!a || a.type !== "string")
          throw new se("JOINED BY expects a quoted string");
        y(e), t.push({ type: "joinedBy", sep: a.value });
        break;
      }
      case "WHERE":
      case "IF": {
        k(e, u), t.push({ type: "where", condition: Mt(e) });
        break;
      }
      case "IF PRESENT": {
        k(e, u), t.push({ type: "ifPresent" });
        break;
      }
      default:
        return t;
    }
  }
  return t;
}
function Os(e) {
  const t = M(e);
  if (t && t.type === "string")
    return y(e), { raw: t.value };
  const u = [];
  for (; u.length < 2; ) {
    const n = M(e);
    if (!n || n.type !== "word" || W(e, He)) break;
    u.push(y(e).value.toLowerCase());
  }
  if (u.length === 0)
    throw new se("AS requires a format type");
  const a = u[0], s = u[1];
  return s === "date" && ds.has(a) ? { type: "date", value: a } : s === "only" && (a === "year" || a === "month") ? { type: "date", value: a === "year" ? "y" : "m" } : ts.has(a) ? { type: a, value: s ?? null } : (s != null && e.i--, { type: a, value: null });
}
function Ds(e) {
  const t = Mt(e), u = W(e, hs);
  u && k(e, u);
  const a = Jt(e);
  let s = null;
  const n = W(e, Es);
  if (n) {
    k(e, n);
    const i = W(e, Ts);
    i && k(e, i), s = Jt(e);
  }
  return { type: "if", condition: t, thenBranch: a, elseBranch: s };
}
function Jt(e) {
  return Q(e);
}
function Ls(e) {
  return { type: "count", value: Q(e) };
}
function ht(e, t) {
  const u = Pt(e);
  return u.length === 0 ? t : { type: "show", value: t, modifiers: u };
}
function Rs(e) {
  const t = M(e);
  if (!t || t.type !== "word")
    throw new se("FOR EACH expects an identifier");
  y(e);
  const u = W(e, ms);
  u && k(e, u);
  const a = Q(e), s = W(e, bs);
  s && k(e, s);
  const n = yt(e);
  return { type: "forEach", ident: t.value, list: a, body: n };
}
function Mt(e) {
  return Hu(e);
}
function Hu(e) {
  let t = Zt(e);
  for (; ; ) {
    const u = M(e);
    if (!u || u.type !== "operator" || u.value !== "|" && u.value !== "||") break;
    y(e);
    const a = Zt(e);
    t = { type: "binop", op: "|", left: t, right: a };
  }
  return t;
}
function Zt(e) {
  let t = pt(e);
  for (; ; ) {
    const u = M(e);
    if (!u || u.type !== "operator" || u.value !== "&" && u.value !== "&&") break;
    y(e);
    const a = pt(e);
    t = { type: "binop", op: "&", left: t, right: a };
  }
  return t;
}
function pt(e) {
  const t = M(e);
  if (t && t.type === "operator" && t.value === "!")
    return y(e), { type: "unop", op: "!", arg: pt(e) };
  if (t && t.type === "lparen") {
    y(e);
    const u = Hu(e);
    return Fu(e, "rparen"), { type: "group", inner: u };
  }
  return Ps(e);
}
const ys = /* @__PURE__ */ new Set(["=", "==", "!=", ">", "<", ">=", "<="]);
function Ps(e) {
  const t = eu(e), u = M(e);
  if (u && u.type === "operator" && ys.has(u.value)) {
    y(e);
    const a = eu(e);
    return { type: "binop", op: u.value === "==" ? "=" : u.value, left: t, right: a };
  }
  return t;
}
function eu(e) {
  let t = tu(e);
  for (; ; ) {
    const u = M(e);
    if (!u || u.type !== "operator" || u.value !== "+" && u.value !== "-") break;
    y(e);
    const a = tu(e);
    t = { type: "binop", op: u.value, left: t, right: a };
  }
  return t;
}
function tu(e) {
  let t = Q(e);
  for (; ; ) {
    const u = M(e);
    if (!u || u.type !== "operator" || u.value !== "*" && u.value !== "/" && u.value !== "%") break;
    y(e);
    const a = Q(e);
    t = { type: "binop", op: u.value, left: t, right: a };
  }
  return t;
}
function Q(e) {
  const t = M(e);
  if (!t) return null;
  if (t.type === "lparen") {
    y(e);
    const u = yt(e);
    return Fu(e, "rparen"), { type: "group", inner: u };
  }
  return t.type === "loom" ? (y(e), { type: "loom", value: t.value }) : t.type === "string" ? (y(e), { type: "string", value: t.value }) : t.type === "number" ? (y(e), { type: "number", value: t.value }) : t.type === "word" ? (y(e), { type: "var", path: t.value }) : null;
}
class Uu extends Error {
}
function Ms(e) {
  if (e == null) return "";
  const t = R(e);
  return Ks(t);
}
function R(e) {
  switch (e.type) {
    case "loom": {
      const t = Ws(e.value);
      return Gs(t) ? `(${t})` : t;
    }
    case "var":
      return e.path;
    case "string":
      return Ie(e.value);
    case "number":
      return String(e.value);
    case "group":
      return R(e.inner);
    case "binop":
      return `(${e.op} ${R(e.left)} ${R(e.right)})`;
    case "unop":
      return `(${e.op} ${R(e.arg)})`;
    case "show":
      return Bs(e);
    case "if":
      return ws(e);
    case "count":
      return Fs(e);
    case "sum":
      return `(++ ${R(e.value)})`;
    case "average": {
      const t = R(e.value);
      return `(/ (++ ${t}) (++!! ${t}))`;
    }
    case "call":
      return xs(e);
    case "forEach":
      return Hs(e);
    default:
      throw new Uu(`Unknown node type: ${e.type}`);
  }
}
function xs(e) {
  if (e.args.length === 0) return e.name;
  const t = e.args.map(R).join(" ");
  return `(${e.name} ${t})`;
}
function Bs(e) {
  if (e.values)
    return ks(e);
  const t = Je(e.value), u = e.modifiers.some((d) => d.type === "sortedBy");
  let a = null;
  if (u && e.value.type === "var" && t) {
    const d = e.value.path, f = t + ".";
    d.startsWith(f) && d.length > f.length && (a = d.slice(f.length));
  }
  let s, n = -1;
  const i = e.value;
  if (i && (i.type === "count" || i.type === "sum" || i.type === "average")) {
    const d = e.modifiers.findIndex((f) => f.type === "where");
    if (d >= 0) {
      const f = e.modifiers[d], T = Je(i.value), h = R(Ae(f.condition, T));
      if (i.type === "count")
        s = `(++!! ${h})`;
      else if (i.type === "sum")
        s = `(++ (? ${h} ${R(i.value)}))`;
      else {
        const A = R(i.value);
        s = `(/ (++ (? ${h} ${A})) (++!! ${h}))`;
      }
      n = d;
    }
  }
  s == null && (s = a ? t : R(e.value));
  for (let d = 0; d < e.modifiers.length; d++) {
    if (d === n) continue;
    const f = e.modifiers[d];
    switch (f.type) {
      case "where": {
        s = `(? ${R(Ae(f.condition, t))} ${s})`;
        break;
      }
      case "sortedBy": {
        const T = vs(f.value);
        s = `(>> ${f.order === "desc" ? "-desc " : ""}-by=${T} ${s})`, a && (s = `(. ${Ie(a)} ${s})`, a = null);
        break;
      }
      case "joinedBy":
        s = `(+: ${Ie(f.sep)} ${s})`;
        break;
      case "as":
        s = `(# ${Ys(f.format)} ${s})`;
        break;
      case "withLabel": {
        s = `(# -label${f.label != null ? `=${Ie(f.label)}` : ""} ${s})`;
        break;
      }
      default:
        throw new Uu(`Unknown modifier type: ${f.type}`);
    }
  }
  return s;
}
function ks(e) {
  const t = e.values.map(R);
  if (e.modifiers.some((n) => n.type === "ifPresent"))
    return `(+? ${t.join(" ")})`;
  const a = e.modifiers.find((n) => n.type === "joinedBy"), s = a ? a.sep : "";
  return `(+: ${Ie(s)} ${t.join(" ")})`;
}
function ws(e) {
  const t = R(e.condition), u = R(e.thenBranch);
  return e.elseBranch != null ? `(? ${t} ${u} ${R(e.elseBranch)})` : `(? ${t} ${u})`;
}
function Fs(e) {
  return `(++!! ${R(e.value)})`;
}
function Je(e) {
  if (e == null) return null;
  if (e.type === "var") {
    const t = e.path.split(".");
    return t.length > 1 ? t.slice(0, -1).join(".") : e.path;
  }
  return e.type === "group" ? Je(e.inner) : e.type === "count" || e.type === "sum" || e.type === "average" ? Je(e.value) : null;
}
function Ae(e, t) {
  if (e == null || !t) return e;
  switch (e.type) {
    case "var": {
      const u = e.path;
      return u.startsWith(t + ".") || u === t || u.includes(".") || u === "true" || u === "false" || u === "null" || u.startsWith("@") || u.startsWith("$") ? e : { type: "var", path: `${t}.${u}` };
    }
    case "binop":
      return {
        ...e,
        left: Ae(e.left, t),
        right: Ae(e.right, t)
      };
    case "unop":
      return { ...e, arg: Ae(e.arg, t) };
    case "group":
      return { ...e, inner: Ae(e.inner, t) };
    default:
      return e;
  }
}
function Hs(e) {
  const t = R(e.list), u = R(e.body).replace(
    new RegExp(`\\b${Us(e.ident)}\\b`, "g"),
    "$1"
  );
  return `(map ${t} ${Ie(u)})`;
}
function Us(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function vs(e) {
  if (e.type === "var") {
    const t = e.path.split(".");
    return t[t.length - 1];
  }
  return e.type === "string" ? e.value : R(e);
}
function Ys(e) {
  if (e.raw != null) {
    const t = e.raw;
    return t.startsWith("-") ? t : `-${t}`;
  }
  return e.value != null ? `-${e.type}=${e.value}` : `-${e.type}`;
}
function Ie(e) {
  return typeof e != "string" && (e = String(e)), e.includes("'") ? e.includes('"') ? `'${e.replace(/'/g, "\\'")}'` : `"${e}"` : `'${e}'`;
}
function Ws(e) {
  return e.length >= 2 && e[0] === "{" && e[e.length - 1] === "}" ? e.slice(1, -1) : e;
}
function Gs(e) {
  let t = 0, u = !1, a = "";
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    if (u) {
      if (n === "\\" && s + 1 < e.length) {
        s++;
        continue;
      }
      n === a && (u = !1);
      continue;
    }
    if (n === '"' || n === "'" || n === "`") {
      u = !0, a = n;
      continue;
    }
    if (n === "(" || n === "{" || n === "[") {
      t++;
      continue;
    }
    if (n === ")" || n === "}" || n === "]") {
      t--;
      continue;
    }
    if (t === 0 && (n === " " || n === "	" || n === `
` || n === "\r"))
      return !0;
  }
  return !1;
}
function Ks(e) {
  if (e.length < 2 || e[0] !== "(" || e[e.length - 1] !== ")") return e;
  let t = 0, u = !1, a = "";
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    if (u) {
      if (n === "\\" && s + 1 < e.length) {
        s++;
        continue;
      }
      n === a && (u = !1);
      continue;
    }
    if (n === '"' || n === "'" || n === "`") {
      u = !0, a = n;
      continue;
    }
    if (n === "(") t++;
    else if (n === ")" && (t--, t === 0 && s < e.length - 1))
      return e;
  }
  return e.slice(1, -1);
}
class Qs {
  /**
   * @param {Object|string} snippets - Same forms as LoomCore accepts
   *   (source string, object, or empty). Bodies written in Plain
   *   syntax are eagerly translated to Compact form at construction
   *   time so the evaluator never sees Plain syntax.
   * @param {Object} functions - Passed through to LoomCore unchanged.
   */
  constructor(t = {}, u = {}) {
    const a = this._prepareSnippets(t);
    this.core = new Zr(a, u);
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
    const u = Lu(t), a = {};
    for (const [s, n] of Object.entries(u)) {
      if (typeof n == "function") {
        a[s] = n;
        continue;
      }
      a[s] = {
        ...n,
        body: n.isText ? this.translateTemplate(n.body) : this.translateExpression(n.body)
      };
    }
    return a;
  }
  /**
   * Render a template, translating each `{…}` placeholder from Plain
   * to Compact form before handing the result to the core renderer.
   */
  render(t, u = null, a = null) {
    const s = this.translateTemplate(t);
    return this.core.render(s, u, a);
  }
  /**
   * Evaluate a single expression. Accepts both Plain and Compact form.
   * Returns whatever the core engine returns — string, number, array,
   * object, etc.
   */
  evaluateText(t, u = null, a = null) {
    const s = this.translateExpression(t);
    return this.core.evaluateText(s, u, a);
  }
  /**
   * Walk a template, find each balanced `{…}` block, translate its
   * contents from Plain to Compact form, and rebuild the template.
   * Plain text outside placeholders is untouched.
   */
  translateTemplate(t) {
    const u = pe(t, { "{": "}" });
    let a = "";
    for (const s of u) {
      if (s.type !== "enclosure") {
        a += s.value;
        continue;
      }
      let n = s.value.slice(1, -1);
      if (n.startsWith("{") && n.endsWith("}")) {
        a += s.value;
        continue;
      }
      const i = this.translateExpression(n, { wrapped: !1 });
      a += `{${i}}`;
    }
    return a;
  }
  /**
   * Translate a single expression (the contents of a placeholder, or a
   * standalone expression passed to evaluateText). Falls back to the
   * original input on any parse or translation failure.
   */
  translateExpression(t) {
    try {
      const u = As(ns(t));
      return Ms(u);
    } catch {
      return t;
    }
  }
}
function qs(e) {
  if (!Array.isArray(e)) return [[]];
  const t = [[]];
  for (const u of e)
    u.type === "divider" ? t.push([]) : t[t.length - 1].push(u);
  return t;
}
function be(e, t, u) {
  if (Array.isArray(e))
    return e.map((s) => _t(s, t, u));
  if (!e || typeof e != "object") return e;
  const a = e.content;
  return Array.isArray(a) ? {
    ...e,
    content: a.map((s) => _t(s, t, u))
  } : e;
}
function _t(e, t, u) {
  if (!e || typeof e != "object") return e;
  const { type: a, content: s, text: n } = e;
  return a === "text" && typeof n == "string" ? {
    ...e,
    text: t.render(n, u)
  } : s && Array.isArray(s) ? {
    ...e,
    content: s.map((i) => _t(i, t, u))
  } : e;
}
function uu(e, t, u, a) {
  const s = e?.doc ?? e;
  if (!s?.content) return be(s, t, u);
  const n = Ne(a, u), i = qs(s.content);
  if (!Array.isArray(n) || n.length === 0 || i.length < 2)
    return be(s, t, u);
  const d = [];
  if (i[0].length > 0) {
    const h = be(
      { type: "doc", content: i[0] },
      t,
      u
    );
    d.push(...h.content || []);
  }
  const T = (i.length >= 3 ? i.slice(1, -1) : [i[1]]).reduce((h, A, g) => (g > 0 && h.push({ type: "divider" }), h.push(...A), h), []);
  for (const h of n) {
    const A = be(
      { type: "doc", content: T },
      t,
      { ...u, ...h }
    );
    d.push(...A.content || []);
  }
  if (i.length >= 3) {
    const h = i[i.length - 1];
    if (h.length > 0) {
      d.push({ type: "divider" });
      const A = be(
        { type: "doc", content: h },
        t,
        u
      );
      d.push(...A.content || []);
    }
  }
  return { type: "doc", content: d };
}
const $s = `
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
function xt(e, t = {}) {
  const u = e?.config?.business_docs || {};
  return {
    title: t.title ?? e?.config?.name ?? "Business document",
    creator: t.creator ?? u.vendor?.organization ?? "Uniweb",
    subject: t.subject ?? "Business document"
  };
}
const Vs = [
  {
    id: "invoice-line",
    name: "InvoiceLine",
    basedOn: "Normal",
    next: "Normal",
    quickFormat: !0,
    run: { size: 22 },
    // 11pt
    paragraph: { spacing: { before: 0, after: 80 } }
  },
  {
    id: "totals-row",
    name: "TotalsRow",
    basedOn: "Normal",
    next: "Normal",
    quickFormat: !0,
    run: { size: 22, bold: !0 },
    paragraph: { spacing: { before: 80, after: 80 } }
  }
];
function js(e, t = {}) {
  return {
    adapterOptions: {
      mode: "html",
      meta: xt(e, t),
      stylesheet: $s
    }
  };
}
function Xs(e, t = {}) {
  return {
    adapterOptions: {
      ...xt(e, t),
      paragraphStyles: t.paragraphStyles ?? Vs,
      loadAsset: t.loadAsset
    }
  };
}
function zs(e, t = {}) {
  return {
    adapterOptions: xt(e, t)
  };
}
const Js = {
  // Canada
  GST: { rate: 0.05, label: "GST" },
  PST: { rate: 0.07, label: "PST" },
  HST: { rate: 0.13, label: "HST" },
  QST: { rate: 0.09975, label: "QST" },
  // Common single-rate VAT placeholders. Authors override per jurisdiction.
  VAT: { rate: 0.2, label: "VAT" },
  NONE: { rate: 0, label: "" }
};
function Zs(e, t = {}) {
  const u = { ...Js, ...t };
  return e && u[e] || u.NONE;
}
function au(e) {
  if (e == null || e === "") return 0;
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function vu(e) {
  return au(e?.qty) * au(e?.unit_price);
}
function Yu(e) {
  return Array.isArray(e) ? Math.round(e.reduce((t, u) => t + vu(u), 0) * 100) / 100 : 0;
}
function en(e, t = {}, u = {}) {
  const a = Yu(e?.items), s = e?.tax?.jurisdiction || t.tax_jurisdiction || null;
  if (!s)
    return { jurisdiction: null, rate: 0, amount: 0, label: "" };
  const n = Zs(s, u), i = e?.tax?.rate != null ? Number(e.tax.rate) : n.rate, d = e?.tax?.amount != null ? Number(e.tax.amount) : Math.round(a * i * 100) / 100;
  return { jurisdiction: s, rate: i, amount: d, label: n.label };
}
function Bt(e, t = {}, u = {}) {
  const a = Yu(e?.items), s = en(e, t, u), n = Math.round((a + s.amount) * 100) / 100;
  return {
    subtotal: a,
    tax_amount: s.amount,
    tax_rate: s.rate,
    tax_label: s.label,
    tax_jurisdiction: s.jurisdiction,
    total: n
  };
}
const tn = /* @__PURE__ */ new Set([
  "issued",
  "open",
  "to-verify",
  "paid",
  "overdue"
]);
function un(e) {
  return tn.has(String(e?.status));
}
function an(e, t) {
  return !Array.isArray(e) || !t ? null : e.find((u) => u?.slug === t || String(u?.number) === String(t)) || null;
}
function rn(e, t) {
  return !e?.to || !t ? !1 : new Date(e.to) > new Date(t);
}
function sn({ invoices: e = [], sows: t = [] } = {}) {
  const u = [], a = (s, n, i, d) => u.push({ severity: s, code: n, recordType: "invoice", recordSlug: i, message: d });
  for (const s of e) {
    const n = s?.slug || s?.number || "(unknown)", i = un(s);
    if (!s?.sow_ref) {
      a(
        i ? "warn" : "info",
        "invoice-missing-sow-ref",
        n,
        `Invoice ${n} has no sow_ref. Issued invoices should reference an SOW.`
      );
      continue;
    }
    const d = an(t, s.sow_ref);
    if (!d) {
      a(
        i ? "error" : "warn",
        "invoice-sow-not-found",
        n,
        `Invoice ${n} references sow_ref "${s.sow_ref}" but no matching SOW exists.`
      );
      continue;
    }
    const f = String(d?.status || "");
    (f === "draft" || f === "in-review") && a(
      i ? "error" : "info",
      "invoice-sow-not-signed",
      n,
      `Invoice ${n} bills against SOW "${s.sow_ref}" which is still ${f}.`
    ), (f === "expired" || f === "superseded") && a(
      "warn",
      "invoice-sow-stale",
      n,
      `Invoice ${n} bills against SOW "${s.sow_ref}" which is ${f}.`
    ), f === "signed" && !d?.signed && a(
      "warn",
      "sow-signed-without-date",
      n,
      `Invoice ${n}: SOW "${s.sow_ref}" has status: signed but no signed: date.`
    ), Array.isArray(s?.items) && d?.expires && s.items.some((h) => rn(h?.period, d.expires)) && a(
      i ? "warn" : "info",
      "invoice-period-past-expiry",
      n,
      `Invoice ${n} contains line(s) whose period extends past SOW ${s.sow_ref} expires (${d.expires}).`
    );
  }
  return u;
}
function nn(e, t = console) {
  for (const u of e) {
    const a = `[business-docs] ${u.severity.toUpperCase()} ${u.code}`;
    u.severity === "error" ? t.error(`${a}: ${u.message}`) : u.severity === "warn" ? t.warn(`${a}: ${u.message}`) : t.info(`${a}: ${u.message}`);
  }
}
const ve = new Qs();
function Wu(e, t) {
  const u = e?.[t];
  return u ? Array.isArray(u) ? u[0] : u : null;
}
function on(e) {
  const t = Wu(e, "invoice");
  return t || (Array.isArray(e?.invoices) && e.invoices.length === 1 ? e.invoices[0] : null);
}
function cn(e) {
  const t = Wu(e, "sow");
  return t || (Array.isArray(e?.sows) && e.sows.length === 1 ? e.sows[0] : null);
}
function Ze(e, t, u) {
  if (Array.isArray(t?.[e])) return t[e];
  const a = u?.website?.config?.collections?.[e]?.records;
  return Array.isArray(a) ? a : [];
}
function ln(e, t) {
  const u = t?.website?.config?.business_docs || {}, a = u.vendor || {}, s = u.defaults || {}, n = u.registries?.tax || {}, i = Ze("invoices", e, t), d = Ze("sows", e, t), f = { vendor: a, defaults: s }, T = on({ invoice: e?.invoice, invoices: i });
  if (T) {
    const A = Bt(T, s, n), g = Array.isArray(T.items) ? T.items.map((N) => ({ ...N, amount: vu(N) })) : [];
    return { ...f, ...T, items: g, ...A };
  }
  const h = cn({ sow: e?.sow, sows: d });
  return h ? { ...f, ...h } : { ...f, invoices: i, sows: d };
}
let ru = /* @__PURE__ */ new WeakSet();
function dn(e, t) {
  const u = Ze("invoices", e, t), a = Ze("sows", e, t);
  if (u.length === 0 || a.length === 0 || ru.has(t)) return;
  ru.add(t);
  const s = sn({ invoices: u, sows: a });
  s.length > 0 && nn(s);
}
const qe = {
  defaultLayout: "BusinessDocLayout",
  props: {},
  handlers: {
    content: (e, t) => {
      dn(e, t);
      const u = ln(e, t), a = t.rawContent?.doc ?? t.rawContent, s = t.properties?.source;
      if (!s) return be(a, ve, u);
      const n = t.properties?.where;
      if (n) {
        const i = u[s];
        if (Array.isArray(i)) {
          const d = i.filter(
            (f) => ve.evaluateText(n, { ...u, ...f })
          );
          return uu(a, ve, { ...u, [s]: d }, s);
        }
      }
      return uu(a, ve, u, s);
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
      getOptions: js
    },
    docx: {
      extension: "docx",
      getOptions: Xs
    },
    xlsx: {
      extension: "xlsx",
      getOptions: zs
    }
  }
}, Gu = Dt(null), su = Dt("");
function Ku() {
  const e = /* @__PURE__ */ new WeakMap(), t = [];
  return {
    register(u, a, s, n = {}) {
      let i = e.get(u);
      i || (i = /* @__PURE__ */ new Map(), e.set(u, i), t.push(u)), i.set(a, { fragment: s, options: n });
    },
    getOutputs(u) {
      const a = [];
      for (const s of t) {
        const n = e.get(s);
        if (!n) continue;
        const i = n.get(u);
        i && a.push({ block: s, ...i });
      }
      return a;
    },
    clear() {
      t.length = 0;
    },
    // Reassigned by the provider so the compile pipeline can re-wrap
    // fragments with the same contexts they rendered under. Identity
    // function until the provider sets it.
    wrapWithProviders: (u) => u
  };
}
function Qu({ children: e, basePath: t = "", store: u }) {
  const a = ge(
    () => u || Ku(),
    [u]
  ), s = t || "";
  return a.wrapWithProviders = (n) => Su(
    su.Provider,
    { value: s },
    n
  ), /* @__PURE__ */ _(Gu.Provider, { value: a, children: /* @__PURE__ */ _(su.Provider, { value: s, children: e }) });
}
function Se(e, t, u, a = {}) {
  const s = ya(Gu);
  if (!s) {
    process.env.NODE_ENV !== "production" && console.warn(
      "useDocumentOutput was called outside of a <DocumentProvider>. Document output will not be registered."
    );
    return;
  }
  s.register(e, t, u, a);
}
const fn = /* @__PURE__ */ new Set([
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
]), O = "�";
var o;
(function(e) {
  e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
})(o || (o = {}));
const U = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function qu(e) {
  return e >= 55296 && e <= 57343;
}
function hn(e) {
  return e >= 56320 && e <= 57343;
}
function En(e, t) {
  return (e - 55296) * 1024 + 9216 + t;
}
function $u(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function Vu(e) {
  return e >= 64976 && e <= 65007 || fn.has(e);
}
var m;
(function(e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(m || (m = {}));
const Tn = 65536;
class mn {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = Tn, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(t, u) {
    const { line: a, col: s, offset: n } = this, i = s + u, d = n + u;
    return {
      code: t,
      startLine: a,
      endLine: a,
      startCol: i,
      endCol: i,
      startOffset: d,
      endOffset: d
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
      if (hn(u))
        return this.pos++, this._addGap(), En(t, u);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, o.EOF;
    return this._err(m.surrogateInInputStream), t;
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
    for (let a = 0; a < t.length; a++)
      if ((this.html.charCodeAt(this.pos + a) | 32) !== t.charCodeAt(a))
        return !1;
    return !0;
  }
  peek(t) {
    const u = this.pos + t;
    if (u >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, o.EOF;
    const a = this.html.charCodeAt(u);
    return a === o.CARRIAGE_RETURN ? o.LINE_FEED : a;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, o.EOF;
    let t = this.html.charCodeAt(this.pos);
    return t === o.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, o.LINE_FEED) : t === o.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, qu(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === o.LINE_FEED || t === o.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    $u(t) ? this._err(m.controlCharacterInInputStream) : Vu(t) && this._err(m.noncharacterInInputStream);
  }
  retreat(t) {
    for (this.pos -= t; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
var C;
(function(e) {
  e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})(C || (C = {}));
function ju(e, t) {
  for (let u = e.attrs.length - 1; u >= 0; u--)
    if (e.attrs[u].name === t)
      return e.attrs[u].value;
  return null;
}
const bn = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ 'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), pn = /* @__PURE__ */ new Map([
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
function _n(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = pn.get(e)) !== null && t !== void 0 ? t : e;
}
var B;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(B || (B = {}));
const An = 32;
var le;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(le || (le = {}));
function At(e) {
  return e >= B.ZERO && e <= B.NINE;
}
function gn(e) {
  return e >= B.UPPER_A && e <= B.UPPER_F || e >= B.LOWER_A && e <= B.LOWER_F;
}
function Nn(e) {
  return e >= B.UPPER_A && e <= B.UPPER_Z || e >= B.LOWER_A && e <= B.LOWER_Z || At(e);
}
function In(e) {
  return e === B.EQUALS || Nn(e);
}
var x;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(x || (x = {}));
var ae;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(ae || (ae = {}));
class Cn {
  constructor(t, u, a) {
    this.decodeTree = t, this.emitCodePoint = u, this.errors = a, this.state = x.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = ae.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = x.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
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
      case x.EntityStart:
        return t.charCodeAt(u) === B.NUM ? (this.state = x.NumericStart, this.consumed += 1, this.stateNumericStart(t, u + 1)) : (this.state = x.NamedEntity, this.stateNamedEntity(t, u));
      case x.NumericStart:
        return this.stateNumericStart(t, u);
      case x.NumericDecimal:
        return this.stateNumericDecimal(t, u);
      case x.NumericHex:
        return this.stateNumericHex(t, u);
      case x.NamedEntity:
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
    return u >= t.length ? -1 : (t.charCodeAt(u) | An) === B.LOWER_X ? (this.state = x.NumericHex, this.consumed += 1, this.stateNumericHex(t, u + 1)) : (this.state = x.NumericDecimal, this.stateNumericDecimal(t, u));
  }
  addToNumericResult(t, u, a, s) {
    if (u !== a) {
      const n = a - u;
      this.result = this.result * Math.pow(s, n) + Number.parseInt(t.substr(u, n), s), this.consumed += n;
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
    const a = u;
    for (; u < t.length; ) {
      const s = t.charCodeAt(u);
      if (At(s) || gn(s))
        u += 1;
      else
        return this.addToNumericResult(t, a, u, 16), this.emitNumericEntity(s, 3);
    }
    return this.addToNumericResult(t, a, u, 16), -1;
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
    const a = u;
    for (; u < t.length; ) {
      const s = t.charCodeAt(u);
      if (At(s))
        u += 1;
      else
        return this.addToNumericResult(t, a, u, 10), this.emitNumericEntity(s, 2);
    }
    return this.addToNumericResult(t, a, u, 10), -1;
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
    var a;
    if (this.consumed <= u)
      return (a = this.errors) === null || a === void 0 || a.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === B.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === ae.Strict)
      return 0;
    return this.emitCodePoint(_n(this.result), this.consumed), this.errors && (t !== B.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
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
    const { decodeTree: a } = this;
    let s = a[this.treeIndex], n = (s & le.VALUE_LENGTH) >> 14;
    for (; u < t.length; u++, this.excess++) {
      const i = t.charCodeAt(u);
      if (this.treeIndex = Sn(a, s, this.treeIndex + Math.max(1, n), i), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === ae.Attribute && // We shouldn't have consumed any characters after the entity,
        (n === 0 || // And there should be no invalid characters.
        In(i)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (s = a[this.treeIndex], n = (s & le.VALUE_LENGTH) >> 14, n !== 0) {
        if (i === B.SEMI)
          return this.emitNamedEntityData(this.treeIndex, n, this.consumed + this.excess);
        this.decodeMode !== ae.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
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
    const { result: u, decodeTree: a } = this, s = (a[u] & le.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(u, s, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
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
  emitNamedEntityData(t, u, a) {
    const { decodeTree: s } = this;
    return this.emitCodePoint(u === 1 ? s[t] & ~le.VALUE_LENGTH : s[t + 1], a), u === 3 && this.emitCodePoint(s[t + 2], a), a;
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
      case x.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== ae.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case x.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case x.NumericHex:
        return this.emitNumericEntity(0, 3);
      case x.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case x.EntityStart:
        return 0;
    }
  }
}
function Sn(e, t, u, a) {
  const s = (t & le.BRANCH_LENGTH) >> 7, n = t & le.JUMP_TABLE;
  if (s === 0)
    return n !== 0 && a === n ? u : -1;
  if (n) {
    const f = a - n;
    return f < 0 || f >= s ? -1 : e[u + f] - 1;
  }
  let i = u, d = i + s - 1;
  for (; i <= d; ) {
    const f = i + d >>> 1, T = e[f];
    if (T < a)
      i = f + 1;
    else if (T > a)
      d = f - 1;
    else
      return e[f + s];
  }
  return -1;
}
var b;
(function(e) {
  e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(b || (b = {}));
var fe;
(function(e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(fe || (fe = {}));
var G;
(function(e) {
  e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})(G || (G = {}));
var E;
(function(e) {
  e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(E || (E = {}));
var r;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP";
})(r || (r = {}));
const On = /* @__PURE__ */ new Map([
  [E.A, r.A],
  [E.ADDRESS, r.ADDRESS],
  [E.ANNOTATION_XML, r.ANNOTATION_XML],
  [E.APPLET, r.APPLET],
  [E.AREA, r.AREA],
  [E.ARTICLE, r.ARTICLE],
  [E.ASIDE, r.ASIDE],
  [E.B, r.B],
  [E.BASE, r.BASE],
  [E.BASEFONT, r.BASEFONT],
  [E.BGSOUND, r.BGSOUND],
  [E.BIG, r.BIG],
  [E.BLOCKQUOTE, r.BLOCKQUOTE],
  [E.BODY, r.BODY],
  [E.BR, r.BR],
  [E.BUTTON, r.BUTTON],
  [E.CAPTION, r.CAPTION],
  [E.CENTER, r.CENTER],
  [E.CODE, r.CODE],
  [E.COL, r.COL],
  [E.COLGROUP, r.COLGROUP],
  [E.DD, r.DD],
  [E.DESC, r.DESC],
  [E.DETAILS, r.DETAILS],
  [E.DIALOG, r.DIALOG],
  [E.DIR, r.DIR],
  [E.DIV, r.DIV],
  [E.DL, r.DL],
  [E.DT, r.DT],
  [E.EM, r.EM],
  [E.EMBED, r.EMBED],
  [E.FIELDSET, r.FIELDSET],
  [E.FIGCAPTION, r.FIGCAPTION],
  [E.FIGURE, r.FIGURE],
  [E.FONT, r.FONT],
  [E.FOOTER, r.FOOTER],
  [E.FOREIGN_OBJECT, r.FOREIGN_OBJECT],
  [E.FORM, r.FORM],
  [E.FRAME, r.FRAME],
  [E.FRAMESET, r.FRAMESET],
  [E.H1, r.H1],
  [E.H2, r.H2],
  [E.H3, r.H3],
  [E.H4, r.H4],
  [E.H5, r.H5],
  [E.H6, r.H6],
  [E.HEAD, r.HEAD],
  [E.HEADER, r.HEADER],
  [E.HGROUP, r.HGROUP],
  [E.HR, r.HR],
  [E.HTML, r.HTML],
  [E.I, r.I],
  [E.IMG, r.IMG],
  [E.IMAGE, r.IMAGE],
  [E.INPUT, r.INPUT],
  [E.IFRAME, r.IFRAME],
  [E.KEYGEN, r.KEYGEN],
  [E.LABEL, r.LABEL],
  [E.LI, r.LI],
  [E.LINK, r.LINK],
  [E.LISTING, r.LISTING],
  [E.MAIN, r.MAIN],
  [E.MALIGNMARK, r.MALIGNMARK],
  [E.MARQUEE, r.MARQUEE],
  [E.MATH, r.MATH],
  [E.MENU, r.MENU],
  [E.META, r.META],
  [E.MGLYPH, r.MGLYPH],
  [E.MI, r.MI],
  [E.MO, r.MO],
  [E.MN, r.MN],
  [E.MS, r.MS],
  [E.MTEXT, r.MTEXT],
  [E.NAV, r.NAV],
  [E.NOBR, r.NOBR],
  [E.NOFRAMES, r.NOFRAMES],
  [E.NOEMBED, r.NOEMBED],
  [E.NOSCRIPT, r.NOSCRIPT],
  [E.OBJECT, r.OBJECT],
  [E.OL, r.OL],
  [E.OPTGROUP, r.OPTGROUP],
  [E.OPTION, r.OPTION],
  [E.P, r.P],
  [E.PARAM, r.PARAM],
  [E.PLAINTEXT, r.PLAINTEXT],
  [E.PRE, r.PRE],
  [E.RB, r.RB],
  [E.RP, r.RP],
  [E.RT, r.RT],
  [E.RTC, r.RTC],
  [E.RUBY, r.RUBY],
  [E.S, r.S],
  [E.SCRIPT, r.SCRIPT],
  [E.SEARCH, r.SEARCH],
  [E.SECTION, r.SECTION],
  [E.SELECT, r.SELECT],
  [E.SOURCE, r.SOURCE],
  [E.SMALL, r.SMALL],
  [E.SPAN, r.SPAN],
  [E.STRIKE, r.STRIKE],
  [E.STRONG, r.STRONG],
  [E.STYLE, r.STYLE],
  [E.SUB, r.SUB],
  [E.SUMMARY, r.SUMMARY],
  [E.SUP, r.SUP],
  [E.TABLE, r.TABLE],
  [E.TBODY, r.TBODY],
  [E.TEMPLATE, r.TEMPLATE],
  [E.TEXTAREA, r.TEXTAREA],
  [E.TFOOT, r.TFOOT],
  [E.TD, r.TD],
  [E.TH, r.TH],
  [E.THEAD, r.THEAD],
  [E.TITLE, r.TITLE],
  [E.TR, r.TR],
  [E.TRACK, r.TRACK],
  [E.TT, r.TT],
  [E.U, r.U],
  [E.UL, r.UL],
  [E.SVG, r.SVG],
  [E.VAR, r.VAR],
  [E.WBR, r.WBR],
  [E.XMP, r.XMP]
]);
function nt(e) {
  var t;
  return (t = On.get(e)) !== null && t !== void 0 ? t : r.UNKNOWN;
}
const p = r, Dn = {
  [b.HTML]: /* @__PURE__ */ new Set([
    p.ADDRESS,
    p.APPLET,
    p.AREA,
    p.ARTICLE,
    p.ASIDE,
    p.BASE,
    p.BASEFONT,
    p.BGSOUND,
    p.BLOCKQUOTE,
    p.BODY,
    p.BR,
    p.BUTTON,
    p.CAPTION,
    p.CENTER,
    p.COL,
    p.COLGROUP,
    p.DD,
    p.DETAILS,
    p.DIR,
    p.DIV,
    p.DL,
    p.DT,
    p.EMBED,
    p.FIELDSET,
    p.FIGCAPTION,
    p.FIGURE,
    p.FOOTER,
    p.FORM,
    p.FRAME,
    p.FRAMESET,
    p.H1,
    p.H2,
    p.H3,
    p.H4,
    p.H5,
    p.H6,
    p.HEAD,
    p.HEADER,
    p.HGROUP,
    p.HR,
    p.HTML,
    p.IFRAME,
    p.IMG,
    p.INPUT,
    p.LI,
    p.LINK,
    p.LISTING,
    p.MAIN,
    p.MARQUEE,
    p.MENU,
    p.META,
    p.NAV,
    p.NOEMBED,
    p.NOFRAMES,
    p.NOSCRIPT,
    p.OBJECT,
    p.OL,
    p.P,
    p.PARAM,
    p.PLAINTEXT,
    p.PRE,
    p.SCRIPT,
    p.SECTION,
    p.SELECT,
    p.SOURCE,
    p.STYLE,
    p.SUMMARY,
    p.TABLE,
    p.TBODY,
    p.TD,
    p.TEMPLATE,
    p.TEXTAREA,
    p.TFOOT,
    p.TH,
    p.THEAD,
    p.TITLE,
    p.TR,
    p.TRACK,
    p.UL,
    p.WBR,
    p.XMP
  ]),
  [b.MATHML]: /* @__PURE__ */ new Set([p.MI, p.MO, p.MN, p.MS, p.MTEXT, p.ANNOTATION_XML]),
  [b.SVG]: /* @__PURE__ */ new Set([p.TITLE, p.FOREIGN_OBJECT, p.DESC]),
  [b.XLINK]: /* @__PURE__ */ new Set(),
  [b.XML]: /* @__PURE__ */ new Set(),
  [b.XMLNS]: /* @__PURE__ */ new Set()
}, gt = /* @__PURE__ */ new Set([p.H1, p.H2, p.H3, p.H4, p.H5, p.H6]);
E.STYLE, E.SCRIPT, E.XMP, E.IFRAME, E.NOEMBED, E.NOFRAMES, E.PLAINTEXT;
var c;
(function(e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
})(c || (c = {}));
const v = {
  DATA: c.DATA,
  RCDATA: c.RCDATA,
  RAWTEXT: c.RAWTEXT,
  SCRIPT_DATA: c.SCRIPT_DATA,
  PLAINTEXT: c.PLAINTEXT,
  CDATA_SECTION: c.CDATA_SECTION
};
function Ln(e) {
  return e >= o.DIGIT_0 && e <= o.DIGIT_9;
}
function ye(e) {
  return e >= o.LATIN_CAPITAL_A && e <= o.LATIN_CAPITAL_Z;
}
function Rn(e) {
  return e >= o.LATIN_SMALL_A && e <= o.LATIN_SMALL_Z;
}
function oe(e) {
  return Rn(e) || ye(e);
}
function nu(e) {
  return oe(e) || Ln(e);
}
function Ye(e) {
  return e + 32;
}
function Xu(e) {
  return e === o.SPACE || e === o.LINE_FEED || e === o.TABULATION || e === o.FORM_FEED;
}
function iu(e) {
  return Xu(e) || e === o.SOLIDUS || e === o.GREATER_THAN_SIGN;
}
function yn(e) {
  return e === o.NULL ? m.nullCharacterReference : e > 1114111 ? m.characterReferenceOutsideUnicodeRange : qu(e) ? m.surrogateCharacterReference : Vu(e) ? m.noncharacterCharacterReference : $u(e) || e === o.CARRIAGE_RETURN ? m.controlCharacterReference : null;
}
class Pn {
  constructor(t, u) {
    this.options = t, this.handler = u, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = c.DATA, this.returnState = c.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new mn(u), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new Cn(bn, (a, s) => {
      this.preprocessor.pos = this.entityStartPos + s - 1, this._flushCodePointConsumedAsCharacterReference(a);
    }, u.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(m.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (a) => {
        this._err(m.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + a);
      },
      validateNumericCharacterReference: (a) => {
        const s = yn(a);
        s && this._err(s, 1);
      }
    } : void 0);
  }
  //Errors
  _err(t, u = 0) {
    var a, s;
    (s = (a = this.handler).onParseError) === null || s === void 0 || s.call(a, this.preprocessor.getError(t, u));
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
  write(t, u, a) {
    this.active = !0, this.preprocessor.write(t, u), this._runParsingLoop(), this.paused || a?.();
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
      type: C.START_TAG,
      tagName: "",
      tagID: r.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: C.END_TAG,
      tagName: "",
      tagID: r.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(t) {
    this.currentToken = {
      type: C.COMMENT,
      data: "",
      location: this.getCurrentLocation(t)
    };
  }
  _createDoctypeToken(t) {
    this.currentToken = {
      type: C.DOCTYPE,
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
    const a = this.currentToken;
    if (ju(a, this.currentAttr.name) === null) {
      if (a.attrs.push(this.currentAttr), a.location && this.currentLocation) {
        const s = (t = (u = a.location).attrs) !== null && t !== void 0 ? t : u.attrs = /* @__PURE__ */ Object.create(null);
        s[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(m.duplicateAttribute);
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
    this.prepareToken(t), t.tagID = nt(t.tagName), t.type === C.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(m.endTagWithAttributes), t.selfClosing && this._err(m.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
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
        case C.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case C.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case C.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const t = this.getCurrentLocation(0);
    t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({ type: C.EOF, location: t }), this.active = !1;
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
    const u = Xu(t) ? C.WHITESPACE_CHARACTER : t === o.NULL ? C.NULL_CHARACTER : C.CHARACTER;
    this._appendCharToCurrentCharacterToken(u, String.fromCodePoint(t));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(t) {
    this._appendCharToCurrentCharacterToken(C.CHARACTER, t);
  }
  // Character reference helpers
  _startCharacterReference() {
    this.returnState = this.state, this.state = c.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? ae.Attribute : ae.Legacy);
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
        this._err(m.unexpectedNullCharacter), this._emitCodePoint(t);
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
        this._err(m.unexpectedNullCharacter), this._emitChars(O);
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
        this._err(m.unexpectedNullCharacter), this._emitChars(O);
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
        this._err(m.unexpectedNullCharacter), this._emitChars(O);
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
        this._err(m.unexpectedNullCharacter), this._emitChars(O);
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
    if (oe(t))
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
          this._err(m.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = c.BOGUS_COMMENT, this._stateBogusComment(t);
          break;
        }
        case o.EOF: {
          this._err(m.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(m.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = c.DATA, this._stateData(t);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(t) {
    if (oe(t))
      this._createEndTagToken(), this.state = c.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case o.GREATER_THAN_SIGN: {
          this._err(m.missingEndTagName), this.state = c.DATA;
          break;
        }
        case o.EOF: {
          this._err(m.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(m.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = c.BOGUS_COMMENT, this._stateBogusComment(t);
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
        this._err(m.unexpectedNullCharacter), u.tagName += O;
        break;
      }
      case o.EOF: {
        this._err(m.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        u.tagName += String.fromCodePoint(ye(t) ? Ye(t) : t);
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
    oe(t) ? (this.state = c.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = c.RCDATA, this._stateRcdata(t));
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
    oe(t) ? (this.state = c.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = c.RAWTEXT, this._stateRawtext(t));
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
    oe(t) ? (this.state = c.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = c.SCRIPT_DATA, this._stateScriptData(t));
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
        this._err(m.unexpectedNullCharacter), this._emitChars(O);
        break;
      }
      case o.EOF: {
        this._err(m.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
        this._err(m.unexpectedNullCharacter), this.state = c.SCRIPT_DATA_ESCAPED, this._emitChars(O);
        break;
      }
      case o.EOF: {
        this._err(m.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
        this._err(m.unexpectedNullCharacter), this.state = c.SCRIPT_DATA_ESCAPED, this._emitChars(O);
        break;
      }
      case o.EOF: {
        this._err(m.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = c.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(t) {
    t === o.SOLIDUS ? this.state = c.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : oe(t) ? (this._emitChars("<"), this.state = c.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = c.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(t) {
    oe(t) ? (this.state = c.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = c.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = c.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(U.SCRIPT, !1) && iu(this.preprocessor.peek(U.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let u = 0; u < U.SCRIPT.length; u++)
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
        this._err(m.unexpectedNullCharacter), this._emitChars(O);
        break;
      }
      case o.EOF: {
        this._err(m.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
        this._err(m.unexpectedNullCharacter), this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(O);
        break;
      }
      case o.EOF: {
        this._err(m.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
        this._err(m.unexpectedNullCharacter), this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(O);
        break;
      }
      case o.EOF: {
        this._err(m.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
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
    if (this.preprocessor.startsWith(U.SCRIPT, !1) && iu(this.preprocessor.peek(U.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let u = 0; u < U.SCRIPT.length; u++)
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
        this._err(m.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = c.ATTRIBUTE_NAME;
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
        this._err(m.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
        break;
      }
      case o.NULL: {
        this._err(m.unexpectedNullCharacter), this.currentAttr.name += O;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(ye(t) ? Ye(t) : t);
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
        this._err(m.eofInTag), this._emitEOFToken();
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
        this._err(m.missingAttributeValue), this.state = c.DATA, this.emitCurrentTagToken();
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
        this._err(m.unexpectedNullCharacter), this.currentAttr.value += O;
        break;
      }
      case o.EOF: {
        this._err(m.eofInTag), this._emitEOFToken();
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
        this._err(m.unexpectedNullCharacter), this.currentAttr.value += O;
        break;
      }
      case o.EOF: {
        this._err(m.eofInTag), this._emitEOFToken();
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
        this._err(m.unexpectedNullCharacter), this.currentAttr.value += O;
        break;
      }
      case o.QUOTATION_MARK:
      case o.APOSTROPHE:
      case o.LESS_THAN_SIGN:
      case o.EQUALS_SIGN:
      case o.GRAVE_ACCENT: {
        this._err(m.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
        break;
      }
      case o.EOF: {
        this._err(m.eofInTag), this._emitEOFToken();
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
        this._err(m.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(m.missingWhitespaceBetweenAttributes), this.state = c.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
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
        this._err(m.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(m.unexpectedSolidusInTag), this.state = c.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
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
        this._err(m.unexpectedNullCharacter), u.data += O;
        break;
      }
      default:
        u.data += String.fromCodePoint(t);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(t) {
    this._consumeSequenceIfMatch(U.DASH_DASH, !0) ? (this._createCommentToken(U.DASH_DASH.length + 1), this.state = c.COMMENT_START) : this._consumeSequenceIfMatch(U.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(U.DOCTYPE.length + 1), this.state = c.DOCTYPE) : this._consumeSequenceIfMatch(U.CDATA_START, !0) ? this.inForeignNode ? this.state = c.CDATA_SECTION : (this._err(m.cdataInHtmlContent), this._createCommentToken(U.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = c.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(m.incorrectlyOpenedComment), this._createCommentToken(2), this.state = c.BOGUS_COMMENT, this._stateBogusComment(t));
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
        this._err(m.abruptClosingOfEmptyComment), this.state = c.DATA;
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
        this._err(m.abruptClosingOfEmptyComment), this.state = c.DATA, this.emitCurrentComment(u);
        break;
      }
      case o.EOF: {
        this._err(m.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
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
        this._err(m.unexpectedNullCharacter), u.data += O;
        break;
      }
      case o.EOF: {
        this._err(m.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
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
    t !== o.GREATER_THAN_SIGN && t !== o.EOF && this._err(m.nestedComment), this.state = c.COMMENT_END, this._stateCommentEnd(t);
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
        this._err(m.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
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
        this._err(m.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
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
        this._err(m.incorrectlyClosedComment), this.state = c.DATA, this.emitCurrentComment(u);
        break;
      }
      case o.EOF: {
        this._err(m.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
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
        this._err(m.eofInDoctype), this._createDoctypeToken(null);
        const u = this.currentToken;
        u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(m.missingWhitespaceBeforeDoctypeName), this.state = c.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(t) {
    if (ye(t))
      this._createDoctypeToken(String.fromCharCode(Ye(t))), this.state = c.DOCTYPE_NAME;
    else
      switch (t) {
        case o.SPACE:
        case o.LINE_FEED:
        case o.TABULATION:
        case o.FORM_FEED:
          break;
        case o.NULL: {
          this._err(m.unexpectedNullCharacter), this._createDoctypeToken(O), this.state = c.DOCTYPE_NAME;
          break;
        }
        case o.GREATER_THAN_SIGN: {
          this._err(m.missingDoctypeName), this._createDoctypeToken(null);
          const u = this.currentToken;
          u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = c.DATA;
          break;
        }
        case o.EOF: {
          this._err(m.eofInDoctype), this._createDoctypeToken(null);
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
        this._err(m.unexpectedNullCharacter), u.name += O;
        break;
      }
      case o.EOF: {
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.name += String.fromCodePoint(ye(t) ? Ye(t) : t);
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
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(U.PUBLIC, !1) ? this.state = c.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(U.SYSTEM, !1) ? this.state = c.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(m.invalidCharacterSequenceAfterDoctypeName), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t));
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
        this._err(m.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = c.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case o.APOSTROPHE: {
        this._err(m.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = c.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(m.missingDoctypePublicIdentifier), u.forceQuirks = !0, this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.EOF: {
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(m.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
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
        this._err(m.missingDoctypePublicIdentifier), u.forceQuirks = !0, this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.EOF: {
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(m.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
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
        this._err(m.unexpectedNullCharacter), u.publicId += O;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(m.abruptDoctypePublicIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.EOF: {
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
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
        this._err(m.unexpectedNullCharacter), u.publicId += O;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(m.abruptDoctypePublicIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.EOF: {
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
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
        this._err(m.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case o.APOSTROPHE: {
        this._err(m.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case o.EOF: {
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(m.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
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
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(m.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
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
        this._err(m.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case o.APOSTROPHE: {
        this._err(m.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(m.missingDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.EOF: {
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(m.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
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
        this._err(m.missingDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case o.EOF: {
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(m.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
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
        this._err(m.unexpectedNullCharacter), u.systemId += O;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(m.abruptDoctypeSystemIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.EOF: {
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
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
        this._err(m.unexpectedNullCharacter), u.systemId += O;
        break;
      }
      case o.GREATER_THAN_SIGN: {
        this._err(m.abruptDoctypeSystemIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = c.DATA;
        break;
      }
      case o.EOF: {
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
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
        this._err(m.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(m.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = c.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
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
        this._err(m.unexpectedNullCharacter);
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
        this._err(m.eofInCdata), this._emitEOFToken();
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
    t === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(o.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && nu(this.preprocessor.peek(1)) ? c.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    nu(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === o.SEMICOLON && this._err(m.unknownNamedCharacterReference), this.state = this.returnState, this._callState(t));
  }
}
const zu = /* @__PURE__ */ new Set([r.DD, r.DT, r.LI, r.OPTGROUP, r.OPTION, r.P, r.RB, r.RP, r.RT, r.RTC]), ou = /* @__PURE__ */ new Set([
  ...zu,
  r.CAPTION,
  r.COLGROUP,
  r.TBODY,
  r.TD,
  r.TFOOT,
  r.TH,
  r.THEAD,
  r.TR
]), et = /* @__PURE__ */ new Set([
  r.APPLET,
  r.CAPTION,
  r.HTML,
  r.MARQUEE,
  r.OBJECT,
  r.TABLE,
  r.TD,
  r.TEMPLATE,
  r.TH
]), Mn = /* @__PURE__ */ new Set([...et, r.OL, r.UL]), xn = /* @__PURE__ */ new Set([...et, r.BUTTON]), cu = /* @__PURE__ */ new Set([r.ANNOTATION_XML, r.MI, r.MN, r.MO, r.MS, r.MTEXT]), lu = /* @__PURE__ */ new Set([r.DESC, r.FOREIGN_OBJECT, r.TITLE]), Bn = /* @__PURE__ */ new Set([r.TR, r.TEMPLATE, r.HTML]), kn = /* @__PURE__ */ new Set([r.TBODY, r.TFOOT, r.THEAD, r.TEMPLATE, r.HTML]), wn = /* @__PURE__ */ new Set([r.TABLE, r.TEMPLATE, r.HTML]), Fn = /* @__PURE__ */ new Set([r.TD, r.TH]);
class Hn {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(t, u, a) {
    this.treeAdapter = u, this.handler = a, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = r.UNKNOWN, this.current = t;
  }
  //Index of element
  _indexOf(t) {
    return this.items.lastIndexOf(t, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === r.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === b.HTML;
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
    const a = this._indexOf(t);
    this.items[a] = u, a === this.stackTop && (this.current = u);
  }
  insertAfter(t, u, a) {
    const s = this._indexOf(t) + 1;
    this.items.splice(s, 0, u), this.tagIDs.splice(s, 0, a), this.stackTop++, s === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, s === this.stackTop);
  }
  popUntilTagNamePopped(t) {
    let u = this.stackTop + 1;
    do
      u = this.tagIDs.lastIndexOf(t, u - 1);
    while (u > 0 && this.treeAdapter.getNamespaceURI(this.items[u]) !== b.HTML);
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
    const a = this._indexOfTagNames(t, u);
    this.shortenToLength(Math.max(a, 0));
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(gt, b.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(Fn, b.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(t, u) {
    for (let a = this.stackTop; a >= 0; a--)
      if (t.has(this.tagIDs[a]) && this.treeAdapter.getNamespaceURI(this.items[a]) === u)
        return a;
    return -1;
  }
  clearBackTo(t, u) {
    const a = this._indexOfTagNames(t, u);
    this.shortenToLength(a + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(wn, b.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(kn, b.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(Bn, b.HTML);
  }
  remove(t) {
    const u = this._indexOf(t);
    u >= 0 && (u === this.stackTop ? this.pop() : (this.items.splice(u, 1), this.tagIDs.splice(u, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === r.BODY ? this.items[1] : null;
  }
  contains(t) {
    return this._indexOf(t) > -1;
  }
  getCommonAncestor(t) {
    const u = this._indexOf(t) - 1;
    return u >= 0 ? this.items[u] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === r.HTML;
  }
  //Element in scope
  hasInDynamicScope(t, u) {
    for (let a = this.stackTop; a >= 0; a--) {
      const s = this.tagIDs[a];
      switch (this.treeAdapter.getNamespaceURI(this.items[a])) {
        case b.HTML: {
          if (s === t)
            return !0;
          if (u.has(s))
            return !1;
          break;
        }
        case b.SVG: {
          if (lu.has(s))
            return !1;
          break;
        }
        case b.MATHML: {
          if (cu.has(s))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInScope(t) {
    return this.hasInDynamicScope(t, et);
  }
  hasInListItemScope(t) {
    return this.hasInDynamicScope(t, Mn);
  }
  hasInButtonScope(t) {
    return this.hasInDynamicScope(t, xn);
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const u = this.tagIDs[t];
      switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
        case b.HTML: {
          if (gt.has(u))
            return !0;
          if (et.has(u))
            return !1;
          break;
        }
        case b.SVG: {
          if (lu.has(u))
            return !1;
          break;
        }
        case b.MATHML: {
          if (cu.has(u))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInTableScope(t) {
    for (let u = this.stackTop; u >= 0; u--)
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === b.HTML)
        switch (this.tagIDs[u]) {
          case t:
            return !0;
          case r.TABLE:
          case r.HTML:
            return !1;
        }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let t = this.stackTop; t >= 0; t--)
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === b.HTML)
        switch (this.tagIDs[t]) {
          case r.TBODY:
          case r.THEAD:
          case r.TFOOT:
            return !0;
          case r.TABLE:
          case r.HTML:
            return !1;
        }
    return !0;
  }
  hasInSelectScope(t) {
    for (let u = this.stackTop; u >= 0; u--)
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === b.HTML)
        switch (this.tagIDs[u]) {
          case t:
            return !0;
          case r.OPTION:
          case r.OPTGROUP:
            break;
          default:
            return !1;
        }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; this.currentTagId !== void 0 && zu.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; this.currentTagId !== void 0 && ou.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== void 0 && this.currentTagId !== t && ou.has(this.currentTagId); )
      this.pop();
  }
}
const Et = 3;
var J;
(function(e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(J || (J = {}));
const du = { type: J.Marker };
class Un {
  constructor(t) {
    this.treeAdapter = t, this.entries = [], this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(t, u) {
    const a = [], s = u.length, n = this.treeAdapter.getTagName(t), i = this.treeAdapter.getNamespaceURI(t);
    for (let d = 0; d < this.entries.length; d++) {
      const f = this.entries[d];
      if (f.type === J.Marker)
        break;
      const { element: T } = f;
      if (this.treeAdapter.getTagName(T) === n && this.treeAdapter.getNamespaceURI(T) === i) {
        const h = this.treeAdapter.getAttrList(T);
        h.length === s && a.push({ idx: d, attrs: h });
      }
    }
    return a;
  }
  _ensureNoahArkCondition(t) {
    if (this.entries.length < Et)
      return;
    const u = this.treeAdapter.getAttrList(t), a = this._getNoahArkConditionCandidates(t, u);
    if (a.length < Et)
      return;
    const s = new Map(u.map((i) => [i.name, i.value]));
    let n = 0;
    for (let i = 0; i < a.length; i++) {
      const d = a[i];
      d.attrs.every((f) => s.get(f.name) === f.value) && (n += 1, n >= Et && this.entries.splice(d.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(du);
  }
  pushElement(t, u) {
    this._ensureNoahArkCondition(t), this.entries.unshift({
      type: J.Element,
      element: t,
      token: u
    });
  }
  insertElementAfterBookmark(t, u) {
    const a = this.entries.indexOf(this.bookmark);
    this.entries.splice(a, 0, {
      type: J.Element,
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
    const t = this.entries.indexOf(du);
    t === -1 ? this.entries.length = 0 : this.entries.splice(0, t + 1);
  }
  //Search
  getElementEntryInScopeWithTagName(t) {
    const u = this.entries.find((a) => a.type === J.Marker || this.treeAdapter.getTagName(a.element) === t);
    return u && u.type === J.Element ? u : null;
  }
  getElementEntry(t) {
    return this.entries.find((u) => u.type === J.Element && u.element === t);
  }
}
const ce = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: G.NO_QUIRKS,
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
    const a = e.childNodes.indexOf(u);
    e.childNodes.splice(a, 0, t), t.parentNode = e;
  },
  setTemplateContent(e, t) {
    e.content = t;
  },
  getTemplateContent(e) {
    return e.content;
  },
  setDocumentType(e, t, u, a) {
    const s = e.childNodes.find((n) => n.nodeName === "#documentType");
    if (s)
      s.name = t, s.publicId = u, s.systemId = a;
    else {
      const n = {
        nodeName: "#documentType",
        name: t,
        publicId: u,
        systemId: a,
        parentNode: null
      };
      ce.appendChild(e, n);
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
      if (ce.isTextNode(u)) {
        u.value += t;
        return;
      }
    }
    ce.appendChild(e, ce.createTextNode(t));
  },
  insertTextBefore(e, t, u) {
    const a = e.childNodes[e.childNodes.indexOf(u) - 1];
    a && ce.isTextNode(a) ? a.value += t : ce.insertBefore(e, ce.createTextNode(t), u);
  },
  adoptAttributes(e, t) {
    const u = new Set(e.attrs.map((a) => a.name));
    for (let a = 0; a < t.length; a++)
      u.has(t[a].name) || e.attrs.push(t[a]);
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
}, Ju = "html", vn = "about:legacy-compat", Yn = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", Zu = [
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
], Wn = [
  ...Zu,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], Gn = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), ea = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], Kn = [
  ...ea,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function fu(e, t) {
  return t.some((u) => e.startsWith(u));
}
function Qn(e) {
  return e.name === Ju && e.publicId === null && (e.systemId === null || e.systemId === vn);
}
function qn(e) {
  if (e.name !== Ju)
    return G.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === Yn)
    return G.QUIRKS;
  let { publicId: u } = e;
  if (u !== null) {
    if (u = u.toLowerCase(), Gn.has(u))
      return G.QUIRKS;
    let a = t === null ? Wn : Zu;
    if (fu(u, a))
      return G.QUIRKS;
    if (a = t === null ? ea : Kn, fu(u, a))
      return G.LIMITED_QUIRKS;
  }
  return G.NO_QUIRKS;
}
const hu = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, $n = "definitionurl", Vn = "definitionURL", jn = new Map([
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
].map((e) => [e.toLowerCase(), e])), Xn = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: b.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: b.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: b.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: b.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: b.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: b.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: b.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: b.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: b.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: b.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: b.XMLNS }]
]), zn = new Map([
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
].map((e) => [e.toLowerCase(), e])), Jn = /* @__PURE__ */ new Set([
  r.B,
  r.BIG,
  r.BLOCKQUOTE,
  r.BODY,
  r.BR,
  r.CENTER,
  r.CODE,
  r.DD,
  r.DIV,
  r.DL,
  r.DT,
  r.EM,
  r.EMBED,
  r.H1,
  r.H2,
  r.H3,
  r.H4,
  r.H5,
  r.H6,
  r.HEAD,
  r.HR,
  r.I,
  r.IMG,
  r.LI,
  r.LISTING,
  r.MENU,
  r.META,
  r.NOBR,
  r.OL,
  r.P,
  r.PRE,
  r.RUBY,
  r.S,
  r.SMALL,
  r.SPAN,
  r.STRONG,
  r.STRIKE,
  r.SUB,
  r.SUP,
  r.TABLE,
  r.TT,
  r.U,
  r.UL,
  r.VAR
]);
function Zn(e) {
  const t = e.tagID;
  return t === r.FONT && e.attrs.some(({ name: a }) => a === fe.COLOR || a === fe.SIZE || a === fe.FACE) || Jn.has(t);
}
function ta(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === $n) {
      e.attrs[t].name = Vn;
      break;
    }
}
function ua(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const u = jn.get(e.attrs[t].name);
    u != null && (e.attrs[t].name = u);
  }
}
function kt(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const u = Xn.get(e.attrs[t].name);
    u && (e.attrs[t].prefix = u.prefix, e.attrs[t].name = u.name, e.attrs[t].namespace = u.namespace);
  }
}
function ei(e) {
  const t = zn.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = nt(e.tagName));
}
function ti(e, t) {
  return t === b.MATHML && (e === r.MI || e === r.MO || e === r.MN || e === r.MS || e === r.MTEXT);
}
function ui(e, t, u) {
  if (t === b.MATHML && e === r.ANNOTATION_XML) {
    for (let a = 0; a < u.length; a++)
      if (u[a].name === fe.ENCODING) {
        const s = u[a].value.toLowerCase();
        return s === hu.TEXT_HTML || s === hu.APPLICATION_XML;
      }
  }
  return t === b.SVG && (e === r.FOREIGN_OBJECT || e === r.DESC || e === r.TITLE);
}
function ai(e, t, u, a) {
  return (!a || a === b.HTML) && ui(e, t, u) || (!a || a === b.MATHML) && ti(e, t);
}
const ri = "hidden", si = 8, ni = 3;
var l;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(l || (l = {}));
const ii = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, aa = /* @__PURE__ */ new Set([r.TABLE, r.TBODY, r.TFOOT, r.THEAD, r.TR]), Eu = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: ce,
  onParseError: null
};
class oi {
  constructor(t, u, a = null, s = null) {
    this.fragmentContext = a, this.scriptHandler = s, this.currentToken = null, this.stopped = !1, this.insertionMode = l.INITIAL, this.originalInsertionMode = l.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...Eu,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = u ?? this.treeAdapter.createDocument(), this.tokenizer = new Pn(this.options, this), this.activeFormattingElements = new Un(this.treeAdapter), this.fragmentContextID = a ? nt(this.treeAdapter.getTagName(a)) : r.UNKNOWN, this._setContextModes(a ?? this.document, this.fragmentContextID), this.openElements = new Hn(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, u) {
    const a = new this(u);
    return a.tokenizer.write(t, !0), a.document;
  }
  static getFragmentParser(t, u) {
    const a = {
      ...Eu,
      ...u
    };
    t ?? (t = a.treeAdapter.createElement(E.TEMPLATE, b.HTML, []));
    const s = a.treeAdapter.createElement("documentmock", b.HTML, []), n = new this(a, s, t);
    return n.fragmentContextID === r.TEMPLATE && n.tmplInsertionModeStack.unshift(l.IN_TEMPLATE), n._initTokenizerForFragmentParsing(), n._insertFakeRootElement(), n._resetInsertionMode(), n._findFormInFragmentContext(), n;
  }
  getFragment() {
    const t = this.treeAdapter.getFirstChild(this.document), u = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(t, u), u;
  }
  //Errors
  /** @internal */
  _err(t, u, a) {
    var s;
    if (!this.onParseError)
      return;
    const n = (s = t.location) !== null && s !== void 0 ? s : ii, i = {
      code: u,
      startLine: n.startLine,
      startCol: n.startCol,
      startOffset: n.startOffset,
      endLine: a ? n.startLine : n.endLine,
      endCol: a ? n.startCol : n.endCol,
      endOffset: a ? n.startOffset : n.endOffset
    };
    this.onParseError(i);
  }
  //Stack events
  /** @internal */
  onItemPush(t, u, a) {
    var s, n;
    (n = (s = this.treeAdapter).onItemPush) === null || n === void 0 || n.call(s, t), a && this.openElements.stackTop > 0 && this._setContextModes(t, u);
  }
  /** @internal */
  onItemPop(t, u) {
    var a, s;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(t, this.currentToken), (s = (a = this.treeAdapter).onItemPop) === null || s === void 0 || s.call(a, t, this.openElements.current), u) {
      let n, i;
      this.openElements.stackTop === 0 && this.fragmentContext ? (n = this.fragmentContext, i = this.fragmentContextID) : { current: n, currentTagId: i } = this.openElements, this._setContextModes(n, i);
    }
  }
  _setContextModes(t, u) {
    const a = t === this.document || t && this.treeAdapter.getNamespaceURI(t) === b.HTML;
    this.currentNotInHTML = !a, this.tokenizer.inForeignNode = !a && t !== void 0 && u !== void 0 && !this._isIntegrationPoint(u, t);
  }
  /** @protected */
  _switchToTextParsing(t, u) {
    this._insertElement(t, b.HTML), this.tokenizer.state = u, this.originalInsertionMode = this.insertionMode, this.insertionMode = l.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = l.TEXT, this.originalInsertionMode = l.IN_BODY, this.tokenizer.state = v.PLAINTEXT;
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
      if (this.treeAdapter.getTagName(t) === E.FORM) {
        this.formElement = t;
        break;
      }
      t = this.treeAdapter.getParentNode(t);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== b.HTML))
      switch (this.fragmentContextID) {
        case r.TITLE:
        case r.TEXTAREA: {
          this.tokenizer.state = v.RCDATA;
          break;
        }
        case r.STYLE:
        case r.XMP:
        case r.IFRAME:
        case r.NOEMBED:
        case r.NOFRAMES:
        case r.NOSCRIPT: {
          this.tokenizer.state = v.RAWTEXT;
          break;
        }
        case r.SCRIPT: {
          this.tokenizer.state = v.SCRIPT_DATA;
          break;
        }
        case r.PLAINTEXT: {
          this.tokenizer.state = v.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  /** @protected */
  _setDocumentType(t) {
    const u = t.name || "", a = t.publicId || "", s = t.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, u, a, s), t.location) {
      const i = this.treeAdapter.getChildNodes(this.document).find((d) => this.treeAdapter.isDocumentTypeNode(d));
      i && this.treeAdapter.setNodeSourceCodeLocation(i, t.location);
    }
  }
  /** @protected */
  _attachElementToTree(t, u) {
    if (this.options.sourceCodeLocationInfo) {
      const a = u && {
        ...u,
        startTag: u
      };
      this.treeAdapter.setNodeSourceCodeLocation(t, a);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(t);
    else {
      const a = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(a ?? this.document, t);
    }
  }
  /**
   * For self-closing tags. Add an element to the tree, but skip adding it
   * to the stack.
   */
  /** @protected */
  _appendElement(t, u) {
    const a = this.treeAdapter.createElement(t.tagName, u, t.attrs);
    this._attachElementToTree(a, t.location);
  }
  /** @protected */
  _insertElement(t, u) {
    const a = this.treeAdapter.createElement(t.tagName, u, t.attrs);
    this._attachElementToTree(a, t.location), this.openElements.push(a, t.tagID);
  }
  /** @protected */
  _insertFakeElement(t, u) {
    const a = this.treeAdapter.createElement(t, b.HTML, []);
    this._attachElementToTree(a, null), this.openElements.push(a, u);
  }
  /** @protected */
  _insertTemplate(t) {
    const u = this.treeAdapter.createElement(t.tagName, b.HTML, t.attrs), a = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(u, a), this._attachElementToTree(u, t.location), this.openElements.push(u, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(a, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(E.HTML, b.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(t, null), this.treeAdapter.appendChild(this.openElements.current, t), this.openElements.push(t, r.HTML);
  }
  /** @protected */
  _appendCommentNode(t, u) {
    const a = this.treeAdapter.createCommentNode(t.data);
    this.treeAdapter.appendChild(u, a), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(a, t.location);
  }
  /** @protected */
  _insertCharacters(t) {
    let u, a;
    if (this._shouldFosterParentOnInsertion() ? ({ parent: u, beforeElement: a } = this._findFosterParentingLocation(), a ? this.treeAdapter.insertTextBefore(u, t.chars, a) : this.treeAdapter.insertText(u, t.chars)) : (u = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(u, t.chars)), !t.location)
      return;
    const s = this.treeAdapter.getChildNodes(u), n = a ? s.lastIndexOf(a) : s.length, i = s[n - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(i)) {
      const { endLine: f, endCol: T, endOffset: h } = t.location;
      this.treeAdapter.updateNodeSourceCodeLocation(i, { endLine: f, endCol: T, endOffset: h });
    } else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(i, t.location);
  }
  /** @protected */
  _adoptNodes(t, u) {
    for (let a = this.treeAdapter.getFirstChild(t); a; a = this.treeAdapter.getFirstChild(t))
      this.treeAdapter.detachNode(a), this.treeAdapter.appendChild(u, a);
  }
  /** @protected */
  _setEndLocation(t, u) {
    if (this.treeAdapter.getNodeSourceCodeLocation(t) && u.location) {
      const a = u.location, s = this.treeAdapter.getTagName(t), n = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        u.type === C.END_TAG && s === u.tagName ? {
          endTag: { ...a },
          endLine: a.endLine,
          endCol: a.endCol,
          endOffset: a.endOffset
        } : {
          endLine: a.startLine,
          endCol: a.startCol,
          endOffset: a.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(t, n);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(t) {
    if (!this.currentNotInHTML)
      return !1;
    let u, a;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (u = this.fragmentContext, a = this.fragmentContextID) : { current: u, currentTagId: a } = this.openElements, t.tagID === r.SVG && this.treeAdapter.getTagName(u) === E.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(u) === b.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (t.tagID === r.MGLYPH || t.tagID === r.MALIGNMARK) && a !== void 0 && !this._isIntegrationPoint(a, u, b.HTML)
    );
  }
  /** @protected */
  _processToken(t) {
    switch (t.type) {
      case C.CHARACTER: {
        this.onCharacter(t);
        break;
      }
      case C.NULL_CHARACTER: {
        this.onNullCharacter(t);
        break;
      }
      case C.COMMENT: {
        this.onComment(t);
        break;
      }
      case C.DOCTYPE: {
        this.onDoctype(t);
        break;
      }
      case C.START_TAG: {
        this._processStartTag(t);
        break;
      }
      case C.END_TAG: {
        this.onEndTag(t);
        break;
      }
      case C.EOF: {
        this.onEof(t);
        break;
      }
      case C.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(t);
        break;
      }
    }
  }
  //Integration points
  /** @protected */
  _isIntegrationPoint(t, u, a) {
    const s = this.treeAdapter.getNamespaceURI(u), n = this.treeAdapter.getAttrList(u);
    return ai(t, s, n, a);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const u = this.activeFormattingElements.entries.findIndex((s) => s.type === J.Marker || this.openElements.contains(s.element)), a = u === -1 ? t - 1 : u - 1;
      for (let s = a; s >= 0; s--) {
        const n = this.activeFormattingElements.entries[s];
        this._insertElement(n.token, this.treeAdapter.getNamespaceURI(n.element)), n.element = this.openElements.current;
      }
    }
  }
  //Close elements
  /** @protected */
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = l.IN_ROW;
  }
  /** @protected */
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(r.P), this.openElements.popUntilTagNamePopped(r.P);
  }
  //Insertion modes
  /** @protected */
  _resetInsertionMode() {
    for (let t = this.openElements.stackTop; t >= 0; t--)
      switch (t === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[t]) {
        case r.TR: {
          this.insertionMode = l.IN_ROW;
          return;
        }
        case r.TBODY:
        case r.THEAD:
        case r.TFOOT: {
          this.insertionMode = l.IN_TABLE_BODY;
          return;
        }
        case r.CAPTION: {
          this.insertionMode = l.IN_CAPTION;
          return;
        }
        case r.COLGROUP: {
          this.insertionMode = l.IN_COLUMN_GROUP;
          return;
        }
        case r.TABLE: {
          this.insertionMode = l.IN_TABLE;
          return;
        }
        case r.BODY: {
          this.insertionMode = l.IN_BODY;
          return;
        }
        case r.FRAMESET: {
          this.insertionMode = l.IN_FRAMESET;
          return;
        }
        case r.SELECT: {
          this._resetInsertionModeForSelect(t);
          return;
        }
        case r.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case r.HTML: {
          this.insertionMode = this.headElement ? l.AFTER_HEAD : l.BEFORE_HEAD;
          return;
        }
        case r.TD:
        case r.TH: {
          if (t > 0) {
            this.insertionMode = l.IN_CELL;
            return;
          }
          break;
        }
        case r.HEAD: {
          if (t > 0) {
            this.insertionMode = l.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = l.IN_BODY;
  }
  /** @protected */
  _resetInsertionModeForSelect(t) {
    if (t > 0)
      for (let u = t - 1; u > 0; u--) {
        const a = this.openElements.tagIDs[u];
        if (a === r.TEMPLATE)
          break;
        if (a === r.TABLE) {
          this.insertionMode = l.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = l.IN_SELECT;
  }
  //Foster parenting
  /** @protected */
  _isElementCausesFosterParenting(t) {
    return aa.has(t);
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
        case r.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(u) === b.HTML)
            return { parent: this.treeAdapter.getTemplateContent(u), beforeElement: null };
          break;
        }
        case r.TABLE: {
          const a = this.treeAdapter.getParentNode(u);
          return a ? { parent: a, beforeElement: u } : { parent: this.openElements.items[t - 1], beforeElement: null };
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
    const a = this.treeAdapter.getNamespaceURI(t);
    return Dn[a].has(u);
  }
  /** @internal */
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      Uo(this, t);
      return;
    }
    switch (this.insertionMode) {
      case l.INITIAL: {
        De(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        Pe(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Me(this, t);
        break;
      }
      case l.IN_HEAD: {
        xe(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Be(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        ke(this, t);
        break;
      }
      case l.IN_BODY:
      case l.IN_CAPTION:
      case l.IN_CELL:
      case l.IN_TEMPLATE: {
        sa(this, t);
        break;
      }
      case l.TEXT:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE: {
        this._insertCharacters(t);
        break;
      }
      case l.IN_TABLE:
      case l.IN_TABLE_BODY:
      case l.IN_ROW: {
        Tt(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        da(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        tt(this, t);
        break;
      }
      case l.AFTER_BODY: {
        ut(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        $e(this, t);
        break;
      }
    }
  }
  /** @internal */
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      Ho(this, t);
      return;
    }
    switch (this.insertionMode) {
      case l.INITIAL: {
        De(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        Pe(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Me(this, t);
        break;
      }
      case l.IN_HEAD: {
        xe(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Be(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        ke(this, t);
        break;
      }
      case l.TEXT: {
        this._insertCharacters(t);
        break;
      }
      case l.IN_TABLE:
      case l.IN_TABLE_BODY:
      case l.IN_ROW: {
        Tt(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        tt(this, t);
        break;
      }
      case l.AFTER_BODY: {
        ut(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        $e(this, t);
        break;
      }
    }
  }
  /** @internal */
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Nt(this, t);
      return;
    }
    switch (this.insertionMode) {
      case l.INITIAL:
      case l.BEFORE_HTML:
      case l.BEFORE_HEAD:
      case l.IN_HEAD:
      case l.IN_HEAD_NO_SCRIPT:
      case l.AFTER_HEAD:
      case l.IN_BODY:
      case l.IN_TABLE:
      case l.IN_CAPTION:
      case l.IN_COLUMN_GROUP:
      case l.IN_TABLE_BODY:
      case l.IN_ROW:
      case l.IN_CELL:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE:
      case l.IN_TEMPLATE:
      case l.IN_FRAMESET:
      case l.AFTER_FRAMESET: {
        Nt(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        Le(this, t);
        break;
      }
      case l.AFTER_BODY: {
        Ti(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY:
      case l.AFTER_AFTER_FRAMESET: {
        mi(this, t);
        break;
      }
    }
  }
  /** @internal */
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case l.INITIAL: {
        bi(this, t);
        break;
      }
      case l.BEFORE_HEAD:
      case l.IN_HEAD:
      case l.IN_HEAD_NO_SCRIPT:
      case l.AFTER_HEAD: {
        this._err(t, m.misplacedDoctype);
        break;
      }
      case l.IN_TABLE_TEXT: {
        Le(this, t);
        break;
      }
    }
  }
  /** @internal */
  onStartTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, m.nonVoidHtmlElementStartTagWithTrailingSolidus);
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
    this.shouldProcessStartTagTokenInForeignContent(t) ? vo(this, t) : this._startTagOutsideForeignContent(t);
  }
  /** @protected */
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case l.INITIAL: {
        De(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        pi(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Ai(this, t);
        break;
      }
      case l.IN_HEAD: {
        X(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Ii(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        Si(this, t);
        break;
      }
      case l.IN_BODY: {
        F(this, t);
        break;
      }
      case l.IN_TABLE: {
        Oe(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        Le(this, t);
        break;
      }
      case l.IN_CAPTION: {
        No(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        Ht(this, t);
        break;
      }
      case l.IN_TABLE_BODY: {
        ct(this, t);
        break;
      }
      case l.IN_ROW: {
        lt(this, t);
        break;
      }
      case l.IN_CELL: {
        So(this, t);
        break;
      }
      case l.IN_SELECT: {
        Ea(this, t);
        break;
      }
      case l.IN_SELECT_IN_TABLE: {
        Do(this, t);
        break;
      }
      case l.IN_TEMPLATE: {
        Ro(this, t);
        break;
      }
      case l.AFTER_BODY: {
        Po(this, t);
        break;
      }
      case l.IN_FRAMESET: {
        Mo(this, t);
        break;
      }
      case l.AFTER_FRAMESET: {
        Bo(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        wo(this, t);
        break;
      }
      case l.AFTER_AFTER_FRAMESET: {
        Fo(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? Yo(this, t) : this._endTagOutsideForeignContent(t);
  }
  /** @protected */
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case l.INITIAL: {
        De(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        _i(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        gi(this, t);
        break;
      }
      case l.IN_HEAD: {
        Ni(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Ci(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        Oi(this, t);
        break;
      }
      case l.IN_BODY: {
        ot(this, t);
        break;
      }
      case l.TEXT: {
        fo(this, t);
        break;
      }
      case l.IN_TABLE: {
        Fe(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        Le(this, t);
        break;
      }
      case l.IN_CAPTION: {
        Io(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        Co(this, t);
        break;
      }
      case l.IN_TABLE_BODY: {
        It(this, t);
        break;
      }
      case l.IN_ROW: {
        ha(this, t);
        break;
      }
      case l.IN_CELL: {
        Oo(this, t);
        break;
      }
      case l.IN_SELECT: {
        Ta(this, t);
        break;
      }
      case l.IN_SELECT_IN_TABLE: {
        Lo(this, t);
        break;
      }
      case l.IN_TEMPLATE: {
        yo(this, t);
        break;
      }
      case l.AFTER_BODY: {
        ba(this, t);
        break;
      }
      case l.IN_FRAMESET: {
        xo(this, t);
        break;
      }
      case l.AFTER_FRAMESET: {
        ko(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        $e(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEof(t) {
    switch (this.insertionMode) {
      case l.INITIAL: {
        De(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        Pe(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Me(this, t);
        break;
      }
      case l.IN_HEAD: {
        xe(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Be(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        ke(this, t);
        break;
      }
      case l.IN_BODY:
      case l.IN_TABLE:
      case l.IN_CAPTION:
      case l.IN_COLUMN_GROUP:
      case l.IN_TABLE_BODY:
      case l.IN_ROW:
      case l.IN_CELL:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE: {
        ca(this, t);
        break;
      }
      case l.TEXT: {
        ho(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        Le(this, t);
        break;
      }
      case l.IN_TEMPLATE: {
        ma(this, t);
        break;
      }
      case l.AFTER_BODY:
      case l.IN_FRAMESET:
      case l.AFTER_FRAMESET:
      case l.AFTER_AFTER_BODY:
      case l.AFTER_AFTER_FRAMESET: {
        Ft(this, t);
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
      case l.IN_HEAD:
      case l.IN_HEAD_NO_SCRIPT:
      case l.AFTER_HEAD:
      case l.TEXT:
      case l.IN_COLUMN_GROUP:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE:
      case l.IN_FRAMESET:
      case l.AFTER_FRAMESET: {
        this._insertCharacters(t);
        break;
      }
      case l.IN_BODY:
      case l.IN_CAPTION:
      case l.IN_CELL:
      case l.IN_TEMPLATE:
      case l.AFTER_BODY:
      case l.AFTER_AFTER_BODY:
      case l.AFTER_AFTER_FRAMESET: {
        ra(this, t);
        break;
      }
      case l.IN_TABLE:
      case l.IN_TABLE_BODY:
      case l.IN_ROW: {
        Tt(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        la(this, t);
        break;
      }
    }
  }
}
function ci(e, t) {
  let u = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return u ? e.openElements.contains(u.element) ? e.openElements.hasInScope(t.tagID) || (u = null) : (e.activeFormattingElements.removeEntry(u), u = null) : oa(e, t), u;
}
function li(e, t) {
  let u = null, a = e.openElements.stackTop;
  for (; a >= 0; a--) {
    const s = e.openElements.items[a];
    if (s === t.element)
      break;
    e._isSpecialElement(s, e.openElements.tagIDs[a]) && (u = s);
  }
  return u || (e.openElements.shortenToLength(Math.max(a, 0)), e.activeFormattingElements.removeEntry(t)), u;
}
function di(e, t, u) {
  let a = t, s = e.openElements.getCommonAncestor(t);
  for (let n = 0, i = s; i !== u; n++, i = s) {
    s = e.openElements.getCommonAncestor(i);
    const d = e.activeFormattingElements.getElementEntry(i), f = d && n >= ni;
    !d || f ? (f && e.activeFormattingElements.removeEntry(d), e.openElements.remove(i)) : (i = fi(e, d), a === t && (e.activeFormattingElements.bookmark = d), e.treeAdapter.detachNode(a), e.treeAdapter.appendChild(i, a), a = i);
  }
  return a;
}
function fi(e, t) {
  const u = e.treeAdapter.getNamespaceURI(t.element), a = e.treeAdapter.createElement(t.token.tagName, u, t.token.attrs);
  return e.openElements.replace(t.element, a), t.element = a, a;
}
function hi(e, t, u) {
  const a = e.treeAdapter.getTagName(t), s = nt(a);
  if (e._isElementCausesFosterParenting(s))
    e._fosterParentElement(u);
  else {
    const n = e.treeAdapter.getNamespaceURI(t);
    s === r.TEMPLATE && n === b.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, u);
  }
}
function Ei(e, t, u) {
  const a = e.treeAdapter.getNamespaceURI(u.element), { token: s } = u, n = e.treeAdapter.createElement(s.tagName, a, s.attrs);
  e._adoptNodes(t, n), e.treeAdapter.appendChild(t, n), e.activeFormattingElements.insertElementAfterBookmark(n, s), e.activeFormattingElements.removeEntry(u), e.openElements.remove(u.element), e.openElements.insertAfter(t, n, s.tagID);
}
function wt(e, t) {
  for (let u = 0; u < si; u++) {
    const a = ci(e, t);
    if (!a)
      break;
    const s = li(e, a);
    if (!s)
      break;
    e.activeFormattingElements.bookmark = a;
    const n = di(e, s, a.element), i = e.openElements.getCommonAncestor(a.element);
    e.treeAdapter.detachNode(n), i && hi(e, i, n), Ei(e, s, a);
  }
}
function Nt(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function Ti(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function mi(e, t) {
  e._appendCommentNode(t, e.document);
}
function Ft(e, t) {
  if (e.stopped = !0, t.location) {
    const u = e.fragmentContext ? 0 : 2;
    for (let a = e.openElements.stackTop; a >= u; a--)
      e._setEndLocation(e.openElements.items[a], t);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const a = e.openElements.items[0], s = e.treeAdapter.getNodeSourceCodeLocation(a);
      if (s && !s.endTag && (e._setEndLocation(a, t), e.openElements.stackTop >= 1)) {
        const n = e.openElements.items[1], i = e.treeAdapter.getNodeSourceCodeLocation(n);
        i && !i.endTag && e._setEndLocation(n, t);
      }
    }
  }
}
function bi(e, t) {
  e._setDocumentType(t);
  const u = t.forceQuirks ? G.QUIRKS : qn(t);
  Qn(t) || e._err(t, m.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, u), e.insertionMode = l.BEFORE_HTML;
}
function De(e, t) {
  e._err(t, m.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, G.QUIRKS), e.insertionMode = l.BEFORE_HTML, e._processToken(t);
}
function pi(e, t) {
  t.tagID === r.HTML ? (e._insertElement(t, b.HTML), e.insertionMode = l.BEFORE_HEAD) : Pe(e, t);
}
function _i(e, t) {
  const u = t.tagID;
  (u === r.HTML || u === r.HEAD || u === r.BODY || u === r.BR) && Pe(e, t);
}
function Pe(e, t) {
  e._insertFakeRootElement(), e.insertionMode = l.BEFORE_HEAD, e._processToken(t);
}
function Ai(e, t) {
  switch (t.tagID) {
    case r.HTML: {
      F(e, t);
      break;
    }
    case r.HEAD: {
      e._insertElement(t, b.HTML), e.headElement = e.openElements.current, e.insertionMode = l.IN_HEAD;
      break;
    }
    default:
      Me(e, t);
  }
}
function gi(e, t) {
  const u = t.tagID;
  u === r.HEAD || u === r.BODY || u === r.HTML || u === r.BR ? Me(e, t) : e._err(t, m.endTagWithoutMatchingOpenElement);
}
function Me(e, t) {
  e._insertFakeElement(E.HEAD, r.HEAD), e.headElement = e.openElements.current, e.insertionMode = l.IN_HEAD, e._processToken(t);
}
function X(e, t) {
  switch (t.tagID) {
    case r.HTML: {
      F(e, t);
      break;
    }
    case r.BASE:
    case r.BASEFONT:
    case r.BGSOUND:
    case r.LINK:
    case r.META: {
      e._appendElement(t, b.HTML), t.ackSelfClosing = !0;
      break;
    }
    case r.TITLE: {
      e._switchToTextParsing(t, v.RCDATA);
      break;
    }
    case r.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(t, v.RAWTEXT) : (e._insertElement(t, b.HTML), e.insertionMode = l.IN_HEAD_NO_SCRIPT);
      break;
    }
    case r.NOFRAMES:
    case r.STYLE: {
      e._switchToTextParsing(t, v.RAWTEXT);
      break;
    }
    case r.SCRIPT: {
      e._switchToTextParsing(t, v.SCRIPT_DATA);
      break;
    }
    case r.TEMPLATE: {
      e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = l.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(l.IN_TEMPLATE);
      break;
    }
    case r.HEAD: {
      e._err(t, m.misplacedStartTagForHeadElement);
      break;
    }
    default:
      xe(e, t);
  }
}
function Ni(e, t) {
  switch (t.tagID) {
    case r.HEAD: {
      e.openElements.pop(), e.insertionMode = l.AFTER_HEAD;
      break;
    }
    case r.BODY:
    case r.BR:
    case r.HTML: {
      xe(e, t);
      break;
    }
    case r.TEMPLATE: {
      me(e, t);
      break;
    }
    default:
      e._err(t, m.endTagWithoutMatchingOpenElement);
  }
}
function me(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== r.TEMPLATE && e._err(t, m.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(r.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, m.endTagWithoutMatchingOpenElement);
}
function xe(e, t) {
  e.openElements.pop(), e.insertionMode = l.AFTER_HEAD, e._processToken(t);
}
function Ii(e, t) {
  switch (t.tagID) {
    case r.HTML: {
      F(e, t);
      break;
    }
    case r.BASEFONT:
    case r.BGSOUND:
    case r.HEAD:
    case r.LINK:
    case r.META:
    case r.NOFRAMES:
    case r.STYLE: {
      X(e, t);
      break;
    }
    case r.NOSCRIPT: {
      e._err(t, m.nestedNoscriptInHead);
      break;
    }
    default:
      Be(e, t);
  }
}
function Ci(e, t) {
  switch (t.tagID) {
    case r.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = l.IN_HEAD;
      break;
    }
    case r.BR: {
      Be(e, t);
      break;
    }
    default:
      e._err(t, m.endTagWithoutMatchingOpenElement);
  }
}
function Be(e, t) {
  const u = t.type === C.EOF ? m.openElementsLeftAfterEof : m.disallowedContentInNoscriptInHead;
  e._err(t, u), e.openElements.pop(), e.insertionMode = l.IN_HEAD, e._processToken(t);
}
function Si(e, t) {
  switch (t.tagID) {
    case r.HTML: {
      F(e, t);
      break;
    }
    case r.BODY: {
      e._insertElement(t, b.HTML), e.framesetOk = !1, e.insertionMode = l.IN_BODY;
      break;
    }
    case r.FRAMESET: {
      e._insertElement(t, b.HTML), e.insertionMode = l.IN_FRAMESET;
      break;
    }
    case r.BASE:
    case r.BASEFONT:
    case r.BGSOUND:
    case r.LINK:
    case r.META:
    case r.NOFRAMES:
    case r.SCRIPT:
    case r.STYLE:
    case r.TEMPLATE:
    case r.TITLE: {
      e._err(t, m.abandonedHeadElementChild), e.openElements.push(e.headElement, r.HEAD), X(e, t), e.openElements.remove(e.headElement);
      break;
    }
    case r.HEAD: {
      e._err(t, m.misplacedStartTagForHeadElement);
      break;
    }
    default:
      ke(e, t);
  }
}
function Oi(e, t) {
  switch (t.tagID) {
    case r.BODY:
    case r.HTML:
    case r.BR: {
      ke(e, t);
      break;
    }
    case r.TEMPLATE: {
      me(e, t);
      break;
    }
    default:
      e._err(t, m.endTagWithoutMatchingOpenElement);
  }
}
function ke(e, t) {
  e._insertFakeElement(E.BODY, r.BODY), e.insertionMode = l.IN_BODY, it(e, t);
}
function it(e, t) {
  switch (t.type) {
    case C.CHARACTER: {
      sa(e, t);
      break;
    }
    case C.WHITESPACE_CHARACTER: {
      ra(e, t);
      break;
    }
    case C.COMMENT: {
      Nt(e, t);
      break;
    }
    case C.START_TAG: {
      F(e, t);
      break;
    }
    case C.END_TAG: {
      ot(e, t);
      break;
    }
    case C.EOF: {
      ca(e, t);
      break;
    }
  }
}
function ra(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function sa(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function Di(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function Li(e, t) {
  const u = e.openElements.tryPeekProperlyNestedBodyElement();
  u && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(u, t.attrs));
}
function Ri(e, t) {
  const u = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && u && (e.treeAdapter.detachNode(u), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, b.HTML), e.insertionMode = l.IN_FRAMESET);
}
function yi(e, t) {
  e.openElements.hasInButtonScope(r.P) && e._closePElement(), e._insertElement(t, b.HTML);
}
function Pi(e, t) {
  e.openElements.hasInButtonScope(r.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && gt.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, b.HTML);
}
function Mi(e, t) {
  e.openElements.hasInButtonScope(r.P) && e._closePElement(), e._insertElement(t, b.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function xi(e, t) {
  const u = e.openElements.tmplCount > 0;
  (!e.formElement || u) && (e.openElements.hasInButtonScope(r.P) && e._closePElement(), e._insertElement(t, b.HTML), u || (e.formElement = e.openElements.current));
}
function Bi(e, t) {
  e.framesetOk = !1;
  const u = t.tagID;
  for (let a = e.openElements.stackTop; a >= 0; a--) {
    const s = e.openElements.tagIDs[a];
    if (u === r.LI && s === r.LI || (u === r.DD || u === r.DT) && (s === r.DD || s === r.DT)) {
      e.openElements.generateImpliedEndTagsWithExclusion(s), e.openElements.popUntilTagNamePopped(s);
      break;
    }
    if (s !== r.ADDRESS && s !== r.DIV && s !== r.P && e._isSpecialElement(e.openElements.items[a], s))
      break;
  }
  e.openElements.hasInButtonScope(r.P) && e._closePElement(), e._insertElement(t, b.HTML);
}
function ki(e, t) {
  e.openElements.hasInButtonScope(r.P) && e._closePElement(), e._insertElement(t, b.HTML), e.tokenizer.state = v.PLAINTEXT;
}
function wi(e, t) {
  e.openElements.hasInScope(r.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, b.HTML), e.framesetOk = !1;
}
function Fi(e, t) {
  const u = e.activeFormattingElements.getElementEntryInScopeWithTagName(E.A);
  u && (wt(e, t), e.openElements.remove(u.element), e.activeFormattingElements.removeEntry(u)), e._reconstructActiveFormattingElements(), e._insertElement(t, b.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Hi(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, b.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Ui(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(r.NOBR) && (wt(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, b.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function vi(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, b.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function Yi(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== G.QUIRKS && e.openElements.hasInButtonScope(r.P) && e._closePElement(), e._insertElement(t, b.HTML), e.framesetOk = !1, e.insertionMode = l.IN_TABLE;
}
function na(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, b.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function ia(e) {
  const t = ju(e, fe.TYPE);
  return t != null && t.toLowerCase() === ri;
}
function Wi(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, b.HTML), ia(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function Gi(e, t) {
  e._appendElement(t, b.HTML), t.ackSelfClosing = !0;
}
function Ki(e, t) {
  e.openElements.hasInButtonScope(r.P) && e._closePElement(), e._appendElement(t, b.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function Qi(e, t) {
  t.tagName = E.IMG, t.tagID = r.IMG, na(e, t);
}
function qi(e, t) {
  e._insertElement(t, b.HTML), e.skipNextNewLine = !0, e.tokenizer.state = v.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = l.TEXT;
}
function $i(e, t) {
  e.openElements.hasInButtonScope(r.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, v.RAWTEXT);
}
function Vi(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, v.RAWTEXT);
}
function Tu(e, t) {
  e._switchToTextParsing(t, v.RAWTEXT);
}
function ji(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, b.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === l.IN_TABLE || e.insertionMode === l.IN_CAPTION || e.insertionMode === l.IN_TABLE_BODY || e.insertionMode === l.IN_ROW || e.insertionMode === l.IN_CELL ? l.IN_SELECT_IN_TABLE : l.IN_SELECT;
}
function Xi(e, t) {
  e.openElements.currentTagId === r.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, b.HTML);
}
function zi(e, t) {
  e.openElements.hasInScope(r.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, b.HTML);
}
function Ji(e, t) {
  e.openElements.hasInScope(r.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(r.RTC), e._insertElement(t, b.HTML);
}
function Zi(e, t) {
  e._reconstructActiveFormattingElements(), ta(t), kt(t), t.selfClosing ? e._appendElement(t, b.MATHML) : e._insertElement(t, b.MATHML), t.ackSelfClosing = !0;
}
function eo(e, t) {
  e._reconstructActiveFormattingElements(), ua(t), kt(t), t.selfClosing ? e._appendElement(t, b.SVG) : e._insertElement(t, b.SVG), t.ackSelfClosing = !0;
}
function mu(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, b.HTML);
}
function F(e, t) {
  switch (t.tagID) {
    case r.I:
    case r.S:
    case r.B:
    case r.U:
    case r.EM:
    case r.TT:
    case r.BIG:
    case r.CODE:
    case r.FONT:
    case r.SMALL:
    case r.STRIKE:
    case r.STRONG: {
      Hi(e, t);
      break;
    }
    case r.A: {
      Fi(e, t);
      break;
    }
    case r.H1:
    case r.H2:
    case r.H3:
    case r.H4:
    case r.H5:
    case r.H6: {
      Pi(e, t);
      break;
    }
    case r.P:
    case r.DL:
    case r.OL:
    case r.UL:
    case r.DIV:
    case r.DIR:
    case r.NAV:
    case r.MAIN:
    case r.MENU:
    case r.ASIDE:
    case r.CENTER:
    case r.FIGURE:
    case r.FOOTER:
    case r.HEADER:
    case r.HGROUP:
    case r.DIALOG:
    case r.DETAILS:
    case r.ADDRESS:
    case r.ARTICLE:
    case r.SEARCH:
    case r.SECTION:
    case r.SUMMARY:
    case r.FIELDSET:
    case r.BLOCKQUOTE:
    case r.FIGCAPTION: {
      yi(e, t);
      break;
    }
    case r.LI:
    case r.DD:
    case r.DT: {
      Bi(e, t);
      break;
    }
    case r.BR:
    case r.IMG:
    case r.WBR:
    case r.AREA:
    case r.EMBED:
    case r.KEYGEN: {
      na(e, t);
      break;
    }
    case r.HR: {
      Ki(e, t);
      break;
    }
    case r.RB:
    case r.RTC: {
      zi(e, t);
      break;
    }
    case r.RT:
    case r.RP: {
      Ji(e, t);
      break;
    }
    case r.PRE:
    case r.LISTING: {
      Mi(e, t);
      break;
    }
    case r.XMP: {
      $i(e, t);
      break;
    }
    case r.SVG: {
      eo(e, t);
      break;
    }
    case r.HTML: {
      Di(e, t);
      break;
    }
    case r.BASE:
    case r.LINK:
    case r.META:
    case r.STYLE:
    case r.TITLE:
    case r.SCRIPT:
    case r.BGSOUND:
    case r.BASEFONT:
    case r.TEMPLATE: {
      X(e, t);
      break;
    }
    case r.BODY: {
      Li(e, t);
      break;
    }
    case r.FORM: {
      xi(e, t);
      break;
    }
    case r.NOBR: {
      Ui(e, t);
      break;
    }
    case r.MATH: {
      Zi(e, t);
      break;
    }
    case r.TABLE: {
      Yi(e, t);
      break;
    }
    case r.INPUT: {
      Wi(e, t);
      break;
    }
    case r.PARAM:
    case r.TRACK:
    case r.SOURCE: {
      Gi(e, t);
      break;
    }
    case r.IMAGE: {
      Qi(e, t);
      break;
    }
    case r.BUTTON: {
      wi(e, t);
      break;
    }
    case r.APPLET:
    case r.OBJECT:
    case r.MARQUEE: {
      vi(e, t);
      break;
    }
    case r.IFRAME: {
      Vi(e, t);
      break;
    }
    case r.SELECT: {
      ji(e, t);
      break;
    }
    case r.OPTION:
    case r.OPTGROUP: {
      Xi(e, t);
      break;
    }
    case r.NOEMBED:
    case r.NOFRAMES: {
      Tu(e, t);
      break;
    }
    case r.FRAMESET: {
      Ri(e, t);
      break;
    }
    case r.TEXTAREA: {
      qi(e, t);
      break;
    }
    case r.NOSCRIPT: {
      e.options.scriptingEnabled ? Tu(e, t) : mu(e, t);
      break;
    }
    case r.PLAINTEXT: {
      ki(e, t);
      break;
    }
    case r.COL:
    case r.TH:
    case r.TD:
    case r.TR:
    case r.HEAD:
    case r.FRAME:
    case r.TBODY:
    case r.TFOOT:
    case r.THEAD:
    case r.CAPTION:
    case r.COLGROUP:
      break;
    default:
      mu(e, t);
  }
}
function to(e, t) {
  if (e.openElements.hasInScope(r.BODY) && (e.insertionMode = l.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const u = e.openElements.tryPeekProperlyNestedBodyElement();
    u && e._setEndLocation(u, t);
  }
}
function uo(e, t) {
  e.openElements.hasInScope(r.BODY) && (e.insertionMode = l.AFTER_BODY, ba(e, t));
}
function ao(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u));
}
function ro(e) {
  const t = e.openElements.tmplCount > 0, { formElement: u } = e;
  t || (e.formElement = null), (u || t) && e.openElements.hasInScope(r.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(r.FORM) : u && e.openElements.remove(u));
}
function so(e) {
  e.openElements.hasInButtonScope(r.P) || e._insertFakeElement(E.P, r.P), e._closePElement();
}
function no(e) {
  e.openElements.hasInListItemScope(r.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(r.LI), e.openElements.popUntilTagNamePopped(r.LI));
}
function io(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTagsWithExclusion(u), e.openElements.popUntilTagNamePopped(u));
}
function oo(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function co(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker());
}
function lo(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(E.BR, r.BR), e.openElements.pop(), e.framesetOk = !1;
}
function oa(e, t) {
  const u = t.tagName, a = t.tagID;
  for (let s = e.openElements.stackTop; s > 0; s--) {
    const n = e.openElements.items[s], i = e.openElements.tagIDs[s];
    if (a === i && (a !== r.UNKNOWN || e.treeAdapter.getTagName(n) === u)) {
      e.openElements.generateImpliedEndTagsWithExclusion(a), e.openElements.stackTop >= s && e.openElements.shortenToLength(s);
      break;
    }
    if (e._isSpecialElement(n, i))
      break;
  }
}
function ot(e, t) {
  switch (t.tagID) {
    case r.A:
    case r.B:
    case r.I:
    case r.S:
    case r.U:
    case r.EM:
    case r.TT:
    case r.BIG:
    case r.CODE:
    case r.FONT:
    case r.NOBR:
    case r.SMALL:
    case r.STRIKE:
    case r.STRONG: {
      wt(e, t);
      break;
    }
    case r.P: {
      so(e);
      break;
    }
    case r.DL:
    case r.UL:
    case r.OL:
    case r.DIR:
    case r.DIV:
    case r.NAV:
    case r.PRE:
    case r.MAIN:
    case r.MENU:
    case r.ASIDE:
    case r.BUTTON:
    case r.CENTER:
    case r.FIGURE:
    case r.FOOTER:
    case r.HEADER:
    case r.HGROUP:
    case r.DIALOG:
    case r.ADDRESS:
    case r.ARTICLE:
    case r.DETAILS:
    case r.SEARCH:
    case r.SECTION:
    case r.SUMMARY:
    case r.LISTING:
    case r.FIELDSET:
    case r.BLOCKQUOTE:
    case r.FIGCAPTION: {
      ao(e, t);
      break;
    }
    case r.LI: {
      no(e);
      break;
    }
    case r.DD:
    case r.DT: {
      io(e, t);
      break;
    }
    case r.H1:
    case r.H2:
    case r.H3:
    case r.H4:
    case r.H5:
    case r.H6: {
      oo(e);
      break;
    }
    case r.BR: {
      lo(e);
      break;
    }
    case r.BODY: {
      to(e, t);
      break;
    }
    case r.HTML: {
      uo(e, t);
      break;
    }
    case r.FORM: {
      ro(e);
      break;
    }
    case r.APPLET:
    case r.OBJECT:
    case r.MARQUEE: {
      co(e, t);
      break;
    }
    case r.TEMPLATE: {
      me(e, t);
      break;
    }
    default:
      oa(e, t);
  }
}
function ca(e, t) {
  e.tmplInsertionModeStack.length > 0 ? ma(e, t) : Ft(e, t);
}
function fo(e, t) {
  var u;
  t.tagID === r.SCRIPT && ((u = e.scriptHandler) === null || u === void 0 || u.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function ho(e, t) {
  e._err(t, m.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function Tt(e, t) {
  if (e.openElements.currentTagId !== void 0 && aa.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = l.IN_TABLE_TEXT, t.type) {
      case C.CHARACTER: {
        da(e, t);
        break;
      }
      case C.WHITESPACE_CHARACTER: {
        la(e, t);
        break;
      }
    }
  else
    Ue(e, t);
}
function Eo(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, b.HTML), e.insertionMode = l.IN_CAPTION;
}
function To(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, b.HTML), e.insertionMode = l.IN_COLUMN_GROUP;
}
function mo(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(E.COLGROUP, r.COLGROUP), e.insertionMode = l.IN_COLUMN_GROUP, Ht(e, t);
}
function bo(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, b.HTML), e.insertionMode = l.IN_TABLE_BODY;
}
function po(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(E.TBODY, r.TBODY), e.insertionMode = l.IN_TABLE_BODY, ct(e, t);
}
function _o(e, t) {
  e.openElements.hasInTableScope(r.TABLE) && (e.openElements.popUntilTagNamePopped(r.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function Ao(e, t) {
  ia(t) ? e._appendElement(t, b.HTML) : Ue(e, t), t.ackSelfClosing = !0;
}
function go(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, b.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function Oe(e, t) {
  switch (t.tagID) {
    case r.TD:
    case r.TH:
    case r.TR: {
      po(e, t);
      break;
    }
    case r.STYLE:
    case r.SCRIPT:
    case r.TEMPLATE: {
      X(e, t);
      break;
    }
    case r.COL: {
      mo(e, t);
      break;
    }
    case r.FORM: {
      go(e, t);
      break;
    }
    case r.TABLE: {
      _o(e, t);
      break;
    }
    case r.TBODY:
    case r.TFOOT:
    case r.THEAD: {
      bo(e, t);
      break;
    }
    case r.INPUT: {
      Ao(e, t);
      break;
    }
    case r.CAPTION: {
      Eo(e, t);
      break;
    }
    case r.COLGROUP: {
      To(e, t);
      break;
    }
    default:
      Ue(e, t);
  }
}
function Fe(e, t) {
  switch (t.tagID) {
    case r.TABLE: {
      e.openElements.hasInTableScope(r.TABLE) && (e.openElements.popUntilTagNamePopped(r.TABLE), e._resetInsertionMode());
      break;
    }
    case r.TEMPLATE: {
      me(e, t);
      break;
    }
    case r.BODY:
    case r.CAPTION:
    case r.COL:
    case r.COLGROUP:
    case r.HTML:
    case r.TBODY:
    case r.TD:
    case r.TFOOT:
    case r.TH:
    case r.THEAD:
    case r.TR:
      break;
    default:
      Ue(e, t);
  }
}
function Ue(e, t) {
  const u = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, it(e, t), e.fosterParentingEnabled = u;
}
function la(e, t) {
  e.pendingCharacterTokens.push(t);
}
function da(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function Le(e, t) {
  let u = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; u < e.pendingCharacterTokens.length; u++)
      Ue(e, e.pendingCharacterTokens[u]);
  else
    for (; u < e.pendingCharacterTokens.length; u++)
      e._insertCharacters(e.pendingCharacterTokens[u]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const fa = /* @__PURE__ */ new Set([r.CAPTION, r.COL, r.COLGROUP, r.TBODY, r.TD, r.TFOOT, r.TH, r.THEAD, r.TR]);
function No(e, t) {
  const u = t.tagID;
  fa.has(u) ? e.openElements.hasInTableScope(r.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = l.IN_TABLE, Oe(e, t)) : F(e, t);
}
function Io(e, t) {
  const u = t.tagID;
  switch (u) {
    case r.CAPTION:
    case r.TABLE: {
      e.openElements.hasInTableScope(r.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(r.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = l.IN_TABLE, u === r.TABLE && Fe(e, t));
      break;
    }
    case r.BODY:
    case r.COL:
    case r.COLGROUP:
    case r.HTML:
    case r.TBODY:
    case r.TD:
    case r.TFOOT:
    case r.TH:
    case r.THEAD:
    case r.TR:
      break;
    default:
      ot(e, t);
  }
}
function Ht(e, t) {
  switch (t.tagID) {
    case r.HTML: {
      F(e, t);
      break;
    }
    case r.COL: {
      e._appendElement(t, b.HTML), t.ackSelfClosing = !0;
      break;
    }
    case r.TEMPLATE: {
      X(e, t);
      break;
    }
    default:
      tt(e, t);
  }
}
function Co(e, t) {
  switch (t.tagID) {
    case r.COLGROUP: {
      e.openElements.currentTagId === r.COLGROUP && (e.openElements.pop(), e.insertionMode = l.IN_TABLE);
      break;
    }
    case r.TEMPLATE: {
      me(e, t);
      break;
    }
    case r.COL:
      break;
    default:
      tt(e, t);
  }
}
function tt(e, t) {
  e.openElements.currentTagId === r.COLGROUP && (e.openElements.pop(), e.insertionMode = l.IN_TABLE, e._processToken(t));
}
function ct(e, t) {
  switch (t.tagID) {
    case r.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, b.HTML), e.insertionMode = l.IN_ROW;
      break;
    }
    case r.TH:
    case r.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(E.TR, r.TR), e.insertionMode = l.IN_ROW, lt(e, t);
      break;
    }
    case r.CAPTION:
    case r.COL:
    case r.COLGROUP:
    case r.TBODY:
    case r.TFOOT:
    case r.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE, Oe(e, t));
      break;
    }
    default:
      Oe(e, t);
  }
}
function It(e, t) {
  const u = t.tagID;
  switch (t.tagID) {
    case r.TBODY:
    case r.TFOOT:
    case r.THEAD: {
      e.openElements.hasInTableScope(u) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE);
      break;
    }
    case r.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE, Fe(e, t));
      break;
    }
    case r.BODY:
    case r.CAPTION:
    case r.COL:
    case r.COLGROUP:
    case r.HTML:
    case r.TD:
    case r.TH:
    case r.TR:
      break;
    default:
      Fe(e, t);
  }
}
function lt(e, t) {
  switch (t.tagID) {
    case r.TH:
    case r.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(t, b.HTML), e.insertionMode = l.IN_CELL, e.activeFormattingElements.insertMarker();
      break;
    }
    case r.CAPTION:
    case r.COL:
    case r.COLGROUP:
    case r.TBODY:
    case r.TFOOT:
    case r.THEAD:
    case r.TR: {
      e.openElements.hasInTableScope(r.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY, ct(e, t));
      break;
    }
    default:
      Oe(e, t);
  }
}
function ha(e, t) {
  switch (t.tagID) {
    case r.TR: {
      e.openElements.hasInTableScope(r.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY);
      break;
    }
    case r.TABLE: {
      e.openElements.hasInTableScope(r.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY, It(e, t));
      break;
    }
    case r.TBODY:
    case r.TFOOT:
    case r.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(r.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY, It(e, t));
      break;
    }
    case r.BODY:
    case r.CAPTION:
    case r.COL:
    case r.COLGROUP:
    case r.HTML:
    case r.TD:
    case r.TH:
      break;
    default:
      Fe(e, t);
  }
}
function So(e, t) {
  const u = t.tagID;
  fa.has(u) ? (e.openElements.hasInTableScope(r.TD) || e.openElements.hasInTableScope(r.TH)) && (e._closeTableCell(), lt(e, t)) : F(e, t);
}
function Oo(e, t) {
  const u = t.tagID;
  switch (u) {
    case r.TD:
    case r.TH: {
      e.openElements.hasInTableScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = l.IN_ROW);
      break;
    }
    case r.TABLE:
    case r.TBODY:
    case r.TFOOT:
    case r.THEAD:
    case r.TR: {
      e.openElements.hasInTableScope(u) && (e._closeTableCell(), ha(e, t));
      break;
    }
    case r.BODY:
    case r.CAPTION:
    case r.COL:
    case r.COLGROUP:
    case r.HTML:
      break;
    default:
      ot(e, t);
  }
}
function Ea(e, t) {
  switch (t.tagID) {
    case r.HTML: {
      F(e, t);
      break;
    }
    case r.OPTION: {
      e.openElements.currentTagId === r.OPTION && e.openElements.pop(), e._insertElement(t, b.HTML);
      break;
    }
    case r.OPTGROUP: {
      e.openElements.currentTagId === r.OPTION && e.openElements.pop(), e.openElements.currentTagId === r.OPTGROUP && e.openElements.pop(), e._insertElement(t, b.HTML);
      break;
    }
    case r.HR: {
      e.openElements.currentTagId === r.OPTION && e.openElements.pop(), e.openElements.currentTagId === r.OPTGROUP && e.openElements.pop(), e._appendElement(t, b.HTML), t.ackSelfClosing = !0;
      break;
    }
    case r.INPUT:
    case r.KEYGEN:
    case r.TEXTAREA:
    case r.SELECT: {
      e.openElements.hasInSelectScope(r.SELECT) && (e.openElements.popUntilTagNamePopped(r.SELECT), e._resetInsertionMode(), t.tagID !== r.SELECT && e._processStartTag(t));
      break;
    }
    case r.SCRIPT:
    case r.TEMPLATE: {
      X(e, t);
      break;
    }
  }
}
function Ta(e, t) {
  switch (t.tagID) {
    case r.OPTGROUP: {
      e.openElements.stackTop > 0 && e.openElements.currentTagId === r.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === r.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === r.OPTGROUP && e.openElements.pop();
      break;
    }
    case r.OPTION: {
      e.openElements.currentTagId === r.OPTION && e.openElements.pop();
      break;
    }
    case r.SELECT: {
      e.openElements.hasInSelectScope(r.SELECT) && (e.openElements.popUntilTagNamePopped(r.SELECT), e._resetInsertionMode());
      break;
    }
    case r.TEMPLATE: {
      me(e, t);
      break;
    }
  }
}
function Do(e, t) {
  const u = t.tagID;
  u === r.CAPTION || u === r.TABLE || u === r.TBODY || u === r.TFOOT || u === r.THEAD || u === r.TR || u === r.TD || u === r.TH ? (e.openElements.popUntilTagNamePopped(r.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : Ea(e, t);
}
function Lo(e, t) {
  const u = t.tagID;
  u === r.CAPTION || u === r.TABLE || u === r.TBODY || u === r.TFOOT || u === r.THEAD || u === r.TR || u === r.TD || u === r.TH ? e.openElements.hasInTableScope(u) && (e.openElements.popUntilTagNamePopped(r.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : Ta(e, t);
}
function Ro(e, t) {
  switch (t.tagID) {
    // First, handle tags that can start without a mode change
    case r.BASE:
    case r.BASEFONT:
    case r.BGSOUND:
    case r.LINK:
    case r.META:
    case r.NOFRAMES:
    case r.SCRIPT:
    case r.STYLE:
    case r.TEMPLATE:
    case r.TITLE: {
      X(e, t);
      break;
    }
    // Re-process the token in the appropriate mode
    case r.CAPTION:
    case r.COLGROUP:
    case r.TBODY:
    case r.TFOOT:
    case r.THEAD: {
      e.tmplInsertionModeStack[0] = l.IN_TABLE, e.insertionMode = l.IN_TABLE, Oe(e, t);
      break;
    }
    case r.COL: {
      e.tmplInsertionModeStack[0] = l.IN_COLUMN_GROUP, e.insertionMode = l.IN_COLUMN_GROUP, Ht(e, t);
      break;
    }
    case r.TR: {
      e.tmplInsertionModeStack[0] = l.IN_TABLE_BODY, e.insertionMode = l.IN_TABLE_BODY, ct(e, t);
      break;
    }
    case r.TD:
    case r.TH: {
      e.tmplInsertionModeStack[0] = l.IN_ROW, e.insertionMode = l.IN_ROW, lt(e, t);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = l.IN_BODY, e.insertionMode = l.IN_BODY, F(e, t);
  }
}
function yo(e, t) {
  t.tagID === r.TEMPLATE && me(e, t);
}
function ma(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(r.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : Ft(e, t);
}
function Po(e, t) {
  t.tagID === r.HTML ? F(e, t) : ut(e, t);
}
function ba(e, t) {
  var u;
  if (t.tagID === r.HTML) {
    if (e.fragmentContext || (e.insertionMode = l.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === r.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const a = e.openElements.items[1];
      a && !(!((u = e.treeAdapter.getNodeSourceCodeLocation(a)) === null || u === void 0) && u.endTag) && e._setEndLocation(a, t);
    }
  } else
    ut(e, t);
}
function ut(e, t) {
  e.insertionMode = l.IN_BODY, it(e, t);
}
function Mo(e, t) {
  switch (t.tagID) {
    case r.HTML: {
      F(e, t);
      break;
    }
    case r.FRAMESET: {
      e._insertElement(t, b.HTML);
      break;
    }
    case r.FRAME: {
      e._appendElement(t, b.HTML), t.ackSelfClosing = !0;
      break;
    }
    case r.NOFRAMES: {
      X(e, t);
      break;
    }
  }
}
function xo(e, t) {
  t.tagID === r.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== r.FRAMESET && (e.insertionMode = l.AFTER_FRAMESET));
}
function Bo(e, t) {
  switch (t.tagID) {
    case r.HTML: {
      F(e, t);
      break;
    }
    case r.NOFRAMES: {
      X(e, t);
      break;
    }
  }
}
function ko(e, t) {
  t.tagID === r.HTML && (e.insertionMode = l.AFTER_AFTER_FRAMESET);
}
function wo(e, t) {
  t.tagID === r.HTML ? F(e, t) : $e(e, t);
}
function $e(e, t) {
  e.insertionMode = l.IN_BODY, it(e, t);
}
function Fo(e, t) {
  switch (t.tagID) {
    case r.HTML: {
      F(e, t);
      break;
    }
    case r.NOFRAMES: {
      X(e, t);
      break;
    }
  }
}
function Ho(e, t) {
  t.chars = O, e._insertCharacters(t);
}
function Uo(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function pa(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== b.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function vo(e, t) {
  if (Zn(t))
    pa(e), e._startTagOutsideForeignContent(t);
  else {
    const u = e._getAdjustedCurrentElement(), a = e.treeAdapter.getNamespaceURI(u);
    a === b.MATHML ? ta(t) : a === b.SVG && (ei(t), ua(t)), kt(t), t.selfClosing ? e._appendElement(t, a) : e._insertElement(t, a), t.ackSelfClosing = !0;
  }
}
function Yo(e, t) {
  if (t.tagID === r.P || t.tagID === r.BR) {
    pa(e), e._endTagOutsideForeignContent(t);
    return;
  }
  for (let u = e.openElements.stackTop; u > 0; u--) {
    const a = e.openElements.items[u];
    if (e.treeAdapter.getNamespaceURI(a) === b.HTML) {
      e._endTagOutsideForeignContent(t);
      break;
    }
    const s = e.treeAdapter.getTagName(a);
    if (s.toLowerCase() === t.tagName) {
      t.tagName = s, e.openElements.shortenToLength(u);
      break;
    }
  }
}
E.AREA, E.BASE, E.BASEFONT, E.BGSOUND, E.BR, E.COL, E.EMBED, E.FRAME, E.HR, E.IMG, E.INPUT, E.KEYGEN, E.LINK, E.META, E.PARAM, E.SOURCE, E.TRACK, E.WBR;
function Wo(e, t, u) {
  typeof e == "string" && (u = t, t = e, e = null);
  const a = oi.getFragmentParser(e, u);
  return a.tokenizer.write(t, !0), a.getFragment();
}
const Go = () => ({}), Ko = () => !0, bu = (e) => {
  const t = parseInt(e, 10);
  return Number.isFinite(t) ? t : e;
}, Qo = {
  "data-underline": { path: ["underline"], transform: Go },
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
    transform: bu
  },
  "data-floating-verticalposition-relative": {
    path: ["floating", "verticalPosition", "relative"]
  },
  "data-floating-verticalposition-align": {
    path: ["floating", "verticalPosition", "align"]
  },
  "data-floating-verticalposition-offset": {
    path: ["floating", "verticalPosition", "offset"],
    transform: bu
  },
  // Page breaks — maps to DocxParagraph({ pageBreakBefore: true })
  // in the adapter. Presence attribute: any truthy value counts.
  "data-page-break-before": { path: ["pageBreakBefore"], transform: Ko },
  // Table of contents options — consumed by the tableOfContents node
  // type in the adapter (src/adapters/docx.js). See docx library's
  // ITableOfContentsOptions for the full shape; these are the three
  // useful ones and any additional data-toc-* attribute falls through
  // to the default rule below.
  "data-toc-title": { path: ["toc", "title"] },
  "data-toc-hyperlink": { path: ["toc", "hyperlink"] },
  "data-toc-heading-range": { path: ["toc", "headingRange"] }
};
function qo(e, t, u) {
  let a = e;
  for (let s = 0; s < t.length - 1; s++) {
    const n = t[s];
    (!a[n] || typeof a[n] != "object") && (a[n] = {}), a = a[n];
  }
  a[t[t.length - 1]] = u;
}
function $o(e) {
  const t = {};
  for (const { name: u, value: a } of e) {
    if (!u.startsWith("data-") || u === "data-type") continue;
    const s = Qo[u];
    if (s) {
      const n = s.transform ? s.transform(a) : a;
      qo(t, s.path, n);
    } else {
      const n = u.slice(5);
      t[n] = a;
    }
  }
  return t;
}
function Vo(e) {
  const t = Wo(e);
  return Ct(t);
}
const jo = /* @__PURE__ */ new Set([
  "link",
  "meta",
  "script",
  "style",
  "base",
  "title",
  "noscript"
]);
function Xo(e) {
  if (e.nodeName === "#text") {
    const d = e.value;
    return d && d.trim() ? { type: "text", content: d } : null;
  }
  if (!e.tagName) return null;
  const t = e.tagName.toLowerCase();
  if (jo.has(t)) return null;
  const a = zo(e, "data-type") || t;
  if (a === "emptyLine") return null;
  if (a === "contentWrapper")
    return Ct(e);
  const s = $o(e.attrs || []), n = Ct(e), i = { type: a, ...s };
  return a === "text" ? i.content = n.map((d) => d.content || "").join("") : n.length > 0 && (i.children = n), i;
}
function Ct(e) {
  const t = [], u = e.childNodes || [];
  for (const a of u) {
    const s = Xo(a);
    s != null && (Array.isArray(s) ? t.push(...s) : t.push(s));
  }
  return t;
}
function zo(e, t) {
  if (!e.attrs) return null;
  for (const u of e.attrs)
    if (u.name === t) return u.value;
  return null;
}
const Jo = {
  docx: { load: () => import("./docx-DnLMskId.js"), consumes: "docx", ir: !0 },
  xlsx: { load: () => import("./xlsx-ByoeiX6E.js"), consumes: "xlsx", ir: !1 },
  typst: { load: () => import("./typst-mG6-KOti.js"), consumes: "typst", ir: !0 },
  // LaTeX consumes its own input key. Foundations targeting both Typst
  // and LaTeX register under each format separately — same JSX, two
  // useDocumentOutput calls — so the adapters can diverge as the
  // formats need without forcing a shared input shape.
  latex: { load: () => import("./latex-7_HOj4eu.js"), consumes: "latex", ir: !0 },
  // Paged.js consumes 'html' — an input shape shared with EPUB below.
  // Foundations register once under 'html' and both adapters read it.
  pagedjs: { load: () => import("./pagedjs-C8Aj7-d3.js"), consumes: "html", ir: !1 },
  epub: { load: () => import("./epub-B2MrQTKN.js"), consumes: "html", ir: !1 }
};
function Ut(e) {
  const t = Jo[e];
  return t ? {
    load: t.load,
    consumes: t.consumes || e,
    ir: t.ir !== !1
    // default to true for safety on under-specified entries
  } : null;
}
async function Zo(e, t, u = {}) {
  const a = Ut(e);
  if (!a)
    throw new Error(`Unsupported document format: "${e}"`);
  const s = await a.load(), n = s.compileDocx || s.compileXlsx || s.compileTypst || s.compileLatex || s.compilePagedjs || s.compileEpub || s.compilePdf;
  if (!n)
    throw new Error(
      `Format adapter "${e}" does not export a compile function.`
    );
  return n(t, u);
}
function ec(e, t) {
  const u = Ut(t);
  if (!u)
    return { sections: [], header: null, footer: null, metadata: null };
  const a = e.getOutputs(u.consumes) || [];
  return u.ir ? tc(a, e) : u.consumes === "html" ? uc(a, e) : ac(a);
}
function tc(e, t) {
  let u = null, a = null, s = null, n = !1, i = !1;
  const d = [], f = t.wrapWithProviders || ((T) => T);
  for (const { fragment: T, options: h } of e) {
    const A = h.role || "body";
    if (A === "metadata") {
      u = T;
      continue;
    }
    const g = Lt(f(T)), N = Vo(g);
    switch (A) {
      case "header":
        a = N, h.applyTo === "first" && (n = !0);
        break;
      case "footer":
        s = N, h.applyTo === "first" && (i = !0);
        break;
      default:
        d.push(N);
        break;
    }
  }
  return {
    sections: d,
    header: a,
    footer: s,
    metadata: u,
    headerFirstPageOnly: n,
    footerFirstPageOnly: i
  };
}
function uc(e, t) {
  const u = t.wrapWithProviders || ((n) => n);
  let a = null;
  const s = [];
  for (const { fragment: n, options: i } of e) {
    const d = i.role || "body";
    if (d === "metadata") {
      a = n;
      continue;
    }
    if (d !== "body") continue;
    const f = Lt(u(n));
    s.push(f);
  }
  return { sections: s, metadata: a };
}
function ac(e) {
  return { sections: e.map(({ fragment: u }) => u).filter(Boolean) };
}
function rc(e, t) {
  if (typeof document > "u") return;
  const u = URL.createObjectURL(e), a = document.createElement("a");
  a.href = u, a.download = t, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(u);
}
function sc(e, t, u = {}) {
  const { basePath: a } = u, s = Ku();
  return Lt(
    Su(
      Qu,
      { store: s, basePath: a },
      e
    )
  ), nc(s, t), ec(s, t);
}
const pu = /* @__PURE__ */ new Set();
function nc(e, t) {
  const u = Ut(t);
  if (!u) return;
  const a = u.consumes;
  if (!(pu.has(a) || (e.getOutputs && e.getOutputs(a) || []).length > 0) && (pu.add(a), typeof console < "u" && console.warn)) {
    const n = a === t ? `compileSubtree('${t}') found 0 registered sections. Did any section component call useDocumentOutput(block, '${t}', ...)?` : `compileSubtree('${t}') found 0 sections registered under input key '${a}'. Sections should call useDocumentOutput(block, '${a}', ...) (the output format '${t}' reads fragments registered under '${a}').`;
    console.warn(
      `@uniweb/press: ${n} Sections registered for a different input key do not cross-register.`
    );
  }
}
async function _u(e, t, u = {}) {
  const { basePath: a, adapterOptions: s = {} } = u, n = sc(e, t, { basePath: a });
  return Zo(t, n, s);
}
async function ic(e, t = {}) {
  if (e !== null && typeof e == "object" && // React elements have a $$typeof symbol; duck-typing avoids needing
  // `import { isValidElement } from 'react'` (minor, but keeps this
  // file free of React imports it doesn't otherwise need).
  !!e.$$typeof) {
    const { format: ue, ...z } = t;
    if (!ue)
      throw new Error(
        "compileDocument: 'format' is required (tree mode)."
      );
    return _u(e, ue, z);
  }
  const a = e, {
    format: s,
    foundation: n,
    rootPath: i,
    adapterOptions: d = {},
    basePath: f,
    loadAsset: T,
    ...h
  } = t, A = T ?? cc(a);
  if (!s)
    throw new Error(
      "compileDocument: 'format' is required (website mode)."
    );
  if (!a || !Array.isArray(a.pages))
    throw new Error(
      "compileDocument: first argument must be either a React element (tree mode) or a Website (website mode: expected object with a pages array)."
    );
  const g = oc(n), N = g?.[s];
  if (!N) {
    const ue = g ? Object.keys(g).join(", ") || "(none)" : "(no outputs declaration)";
    throw new Error(
      `compileDocument: foundation has no outputs.${s} declaration. Declared outputs: ${ue}. Add outputs[format] = { getOptions, extension?, via? } to the foundation's default export.`
    );
  }
  const H = N.via ?? s, Y = N.getOptions ? await N.getOptions(a, { format: s, rootPath: i, loadAsset: A, ...h }) : {}, q = {
    ...Y.adapterOptions,
    ...d
  }, te = lc(a, i), S = globalThis.uniweb?.childBlockRenderer;
  if (typeof S != "function")
    throw new Error(
      "compileDocument: globalThis.uniweb.childBlockRenderer is not installed. Either call initPrerender (headless) or mount a Uniweb runtime (browser) before compileDocument, or pass a pre-built tree (tree mode)."
    );
  const $ = S({ blocks: te });
  return _u($, H, {
    basePath: f ?? a?.basePath,
    ...Y,
    adapterOptions: q
  });
}
function oc(e) {
  return e ? e.outputs ? e.outputs : e.default?.capabilities?.outputs ? e.default.capabilities.outputs : e.default?.outputs ? e.default.outputs : null : null;
}
function cc(e) {
  return async function(u) {
    if (!u || typeof u != "string") return null;
    if (u.startsWith("data:")) {
      const n = u.indexOf(",");
      if (n === -1) return null;
      const i = u.slice(5, n), d = u.slice(n + 1);
      if (i.includes(";base64")) {
        const f = atob(d), T = new Uint8Array(f.length);
        for (let h = 0; h < f.length; h++) T[h] = f.charCodeAt(h);
        return T;
      }
      return new TextEncoder().encode(decodeURIComponent(d));
    }
    if (typeof fetch != "function")
      throw new Error(
        "loadAsset: cannot load '" + u + "' — no fetch available in this environment. Pass a host-supplied loadAsset via compileDocument({ loadAsset })."
      );
    let a = u;
    if (!/^https?:\/\//i.test(a) && !a.startsWith("data:")) {
      const n = (e?.basePath || "") + (a.startsWith("/") ? a : "/" + a);
      a = typeof window < "u" && window.location?.origin ? window.location.origin + n : n;
    }
    const s = await fetch(a);
    if (!s.ok)
      throw new Error(
        "loadAsset: fetch failed for " + a + " (" + s.status + ")"
      );
    return new Uint8Array(await s.arrayBuffer());
  };
}
function lc(e, t) {
  const u = e.pages || [];
  return (t && typeof t == "string" ? u.filter(
    (s) => s.route === t || typeof s.route == "string" && s.route.startsWith(t + "/")
  ) : u).flatMap((s) => s.bodyBlocks || []);
}
function vt() {
  const t = Ou()?.activeWebsite;
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
    localize: (u, a = "") => t.localize(u, a),
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
const dc = [
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
new Set(dc);
function _a() {
  return globalThis.uniweb.childBlockRenderer;
}
function Au() {
  return { data: null, error: null, loading: !1 };
}
function gu() {
  return { data: null, error: null, loading: !0 };
}
function We(e) {
  return { data: e, error: null, loading: !1 };
}
function Nu(e, t = null) {
  return { data: t, error: e, loading: !1 };
}
function Aa(e) {
  const t = Ou()?.activeWebsite ?? null, u = e && t ? xa(e) : null, a = u ? t.dataStore.get(u) : null, [s, n] = Qe(
    () => a ? We(a.data) : u ? gu() : Au()
  );
  return rt(() => {
    if (!u || !t) {
      n(Au());
      return;
    }
    const i = t.dataStore.get(u);
    n(i ? We(i.data) : gu());
    const d = t.dataStore.subscribe(u, () => {
      const T = t.dataStore.get(u);
      T && n(We(T.data));
    }), f = new AbortController();
    return t.fetcher.dispatch(e, { website: t, signal: f.signal }).then((T) => {
      if (!f.signal.aborted) {
        if (T?.error) {
          n(Nu(T.error, T.data ?? null));
          return;
        }
        T && "data" in T && n(We(T.data));
      }
    }).catch((T) => {
      f.signal.aborted || n(Nu(String(T?.message || T)));
    }), () => {
      f.abort(), d();
    };
  }, [u, t]), s;
}
function fc(e) {
  return e + 1;
}
function dt(e, t) {
  const { website: u } = vt(), [, a] = Pa(fc, 0), n = u.activePage?.state;
  rt(() => {
    if (n)
      return n.subscribe(e, a);
  }, [n, e]);
  const i = n?.has(e) ? n.get(e) : t;
  return [i, (f) => {
    n && n.set(e, typeof f == "function" ? f(i) : f);
  }];
}
const ga = "business-docs/report-options", ie = {
  source: "invoices",
  dateRange: { from: null, to: null },
  client: null,
  status: null
}, St = Object.keys(ie);
function hc() {
  if (typeof window > "u") return null;
  try {
    const e = window.localStorage.getItem(ga);
    if (!e) return null;
    const t = JSON.parse(e);
    return {
      source: t.source || ie.source,
      dateRange: t.dateRange && typeof t.dateRange == "object" ? { from: t.dateRange.from || null, to: t.dateRange.to || null } : ie.dateRange,
      client: t.client || null,
      status: t.status || null
    };
  } catch {
    return null;
  }
}
function Ec(e) {
  if (typeof window > "u") return;
  const t = {};
  for (const u of St)
    t[u] = e.state.get(u) ?? ie[u];
  try {
    window.localStorage.setItem(ga, JSON.stringify(t));
  } catch {
  }
}
const Iu = /* @__PURE__ */ new WeakSet();
function Tc(e) {
  if (!e || !e.state) return () => {
  };
  if (Iu.has(e)) return () => {
  };
  Iu.add(e);
  const t = hc() || ie;
  for (const s of St)
    e.state.has(s) || e.state.set(s, t[s]);
  const u = () => Ec(e), a = St.map((s) => e.state.subscribe(s, u));
  return () => a.forEach((s) => s());
}
function Na() {
  return dt("source", ie.source);
}
function mc() {
  return dt("dateRange", ie.dateRange);
}
function bc() {
  return dt("client", ie.client);
}
function pc() {
  return dt("status", ie.status);
}
function _c({ dateRange: e, client: t, status: u }) {
  const a = [];
  return e?.from && a.push({ issued: { gte: e.from } }), e?.to && a.push({ issued: { lte: e.to } }), t && a.push({ "client.organization": t }), u && a.push({ status: u }), a.length === 0 ? null : a.length === 1 ? a[0] : { and: a };
}
const Ac = /* @__PURE__ */ new Set(["paid", "void"]);
function gc({ source: e, dateRange: t, client: u, status: a }) {
  const s = [e === "sows" ? "SOWs" : "Invoices"];
  return (t?.from || t?.to) && s.push(`${t.from || ""}–${t.to || ""}`), u && s.push(u), a && s.push(a), s.length > 1 ? s.join(" · ") : null;
}
function Nc(e) {
  return e === "sows" ? "/data/sows.json" : "/data/invoices.json";
}
function Ic(e) {
  return e === "sows" ? "sows" : "invoices";
}
function Cc(e, t) {
  return e === "sows" ? Array.isArray(t?.data?.sows) ? t.data.sows : [] : Array.isArray(t?.data?.invoices) ? t.data.invoices : [];
}
function Sc(e, t, u, a) {
  let s = 0, n = 0, i = 0;
  if (t === "invoices")
    for (const d of e) {
      const f = Bt(d, u, a);
      s += f.subtotal, n += f.total, Ac.has(String(d?.status)) || (i += f.total);
    }
  else
    for (const d of e) {
      const f = Number(d?.budget?.total) || 0;
      n += f, s += f;
    }
  return {
    sumSubtotals: Math.round(s * 100) / 100,
    sumTotals: Math.round(n * 100) / 100,
    sumOutstanding: Math.round(i * 100) / 100
  };
}
function Oc(e, t) {
  const [u] = Na(), [a] = mc(), [s] = bc(), [n] = pc(), i = t?.website?.config?.business_docs || {}, d = i.defaults || {}, f = i.registries?.tax || {}, T = ge(
    () => _c({ dateRange: a, client: s, status: n }),
    [a, s, n]
  ), h = ge(
    () => Cc(u, e),
    [u, e?.data?.invoices, e?.data?.sows]
  ), { data: A, loading: g } = Aa(
    T ? { path: Nc(u), schema: Ic(u), where: T } : null
  ), N = T ? A || [] : h, { sumSubtotals: H, sumTotals: Y, sumOutstanding: q } = ge(
    () => Sc(N, u, d, f),
    [N, u, d, f]
  );
  return {
    records: N,
    count: N.length,
    sumSubtotals: H,
    sumTotals: Y,
    sumOutstanding: q,
    activeWhere: T,
    activeLabel: gc({ source: u, dateRange: a, client: s, status: n }),
    totalCount: h.length,
    loading: T ? g : !1
  };
}
function Dc(e, { currency: t = "CAD", locale: u = "en-CA" } = {}) {
  const a = Number(e);
  return Number.isFinite(a) ? new Intl.NumberFormat(u, {
    style: "currency",
    currency: t,
    maximumFractionDigits: 2
  }).format(a) : "";
}
function Ot(e, { locale: t = "en-CA" } = {}) {
  if (!e) return "";
  const u = e instanceof Date ? e : new Date(e);
  return Number.isNaN(u.getTime()) ? String(e) : new Intl.DateTimeFormat(t, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(u);
}
function Cu(e, t) {
  if (!e) return "";
  const u = Ot(e.from, t), a = Ot(e.to, t);
  return u && a ? `${u} – ${a}` : u || a;
}
function Wc({ content: e, block: t }) {
  const u = t?.website?.config?.business_docs || {}, a = u.defaults || {}, s = u.registries?.tax || {}, n = a.currency || "CAD", i = a.locale || "en-CA", d = (I) => Dc(I, { currency: n, locale: i }), f = (I) => Ot(I, { locale: i }), [T] = Na(), h = T !== "sows", {
    records: A,
    count: g,
    sumSubtotals: N,
    sumTotals: H,
    sumOutstanding: Y,
    activeLabel: q,
    totalCount: te,
    loading: S
  } = Oc(e, t), { data: $ } = Aa(
    h ? { path: "/data/sows.json", schema: "sows" } : null
  ), ue = ge(() => Lc($), [$]), z = ge(
    () => h ? A.map((I) => Rc(I, ue, a, s)) : A,
    [A, h, ue, a, s]
  );
  Se(t, "xlsx", {
    title: "Records",
    headers: h ? ["Number", "Date", "Client", "Period", "Status", "Currency", "Subtotal", "Tax", "Total", "SOW ref"] : ["Number", "Issued", "Status", "Client", "Title", "Fee model", "Budget"],
    data: z.map(
      (I) => h ? [
        I.number,
        I.issued || "",
        I.client?.organization || "",
        I.period ? Cu(I.period, { locale: i }) : "",
        I.status || "",
        I.currency || n,
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
  }), Se(t, "xlsx", {
    title: "Summary",
    headers: ["Group", "Bucket", "Count", "Subtotal", "Total", "Outstanding"],
    data: yc(z, h),
    numberFormats: ["text", "text", "number", "currency", "currency", "currency"]
  });
  const La = e?.title || (h ? "Invoice report" : "SOW report"), Ra = q || e?.subtitle || (h ? "All invoices" : "All SOWs");
  return /* @__PURE__ */ L("section", { className: "engagement-report", children: [
    /* @__PURE__ */ L("header", { children: [
      /* @__PURE__ */ _("h1", { children: La }),
      /* @__PURE__ */ _("p", { className: "engagement-report-subtitle", children: Ra }),
      /* @__PURE__ */ L("p", { className: "engagement-report-population", children: [
        g,
        " of ",
        te,
        " ",
        h ? "invoices" : "SOWs"
      ] })
    ] }),
    /* @__PURE__ */ L("div", { className: "engagement-report-cards", role: "list", children: [
      /* @__PURE__ */ _(Ge, { label: "Records", value: g }),
      /* @__PURE__ */ _(Ge, { label: "Subtotal", value: d(N) }),
      /* @__PURE__ */ _(Ge, { label: "Total", value: d(H) }),
      h && /* @__PURE__ */ _(Ge, { label: "Outstanding", value: d(Y) })
    ] }),
    S && /* @__PURE__ */ _("p", { className: "engagement-report-loading", children: "Loading…" }),
    /* @__PURE__ */ L("table", { className: "engagement-report-table", children: [
      /* @__PURE__ */ _("thead", { children: /* @__PURE__ */ _("tr", { children: h ? /* @__PURE__ */ L(Ve, { children: [
        /* @__PURE__ */ _("th", { children: "Number" }),
        /* @__PURE__ */ _("th", { children: "Date" }),
        /* @__PURE__ */ _("th", { children: "Client" }),
        /* @__PURE__ */ _("th", { children: "Period" }),
        /* @__PURE__ */ _("th", { children: "Status" }),
        /* @__PURE__ */ _("th", { children: "Total" }),
        /* @__PURE__ */ _("th", { children: "SOW" }),
        /* @__PURE__ */ _("th", { children: "% billed" })
      ] }) : /* @__PURE__ */ L(Ve, { children: [
        /* @__PURE__ */ _("th", { children: "Number" }),
        /* @__PURE__ */ _("th", { children: "Issued" }),
        /* @__PURE__ */ _("th", { children: "Client" }),
        /* @__PURE__ */ _("th", { children: "Title" }),
        /* @__PURE__ */ _("th", { children: "Status" }),
        /* @__PURE__ */ _("th", { children: "Budget" })
      ] }) }) }),
      /* @__PURE__ */ _("tbody", { children: z.map(
        (I) => h ? /* @__PURE__ */ L("tr", { children: [
          /* @__PURE__ */ _("td", { children: I.number }),
          /* @__PURE__ */ _("td", { children: f(I.issued) }),
          /* @__PURE__ */ _("td", { children: I.client?.organization || "" }),
          /* @__PURE__ */ _("td", { children: I.period ? Cu(I.period, { locale: i }) : "" }),
          /* @__PURE__ */ _("td", { children: I.status }),
          /* @__PURE__ */ _("td", { children: d(I._totals?.total ?? 0) }),
          /* @__PURE__ */ _("td", { children: I.sow_ref || "" }),
          /* @__PURE__ */ _("td", { children: I._percentBilled != null ? `${I._percentBilled.toFixed(1)}%` : "" })
        ] }, I.slug || I.number) : /* @__PURE__ */ L("tr", { children: [
          /* @__PURE__ */ _("td", { children: I.number }),
          /* @__PURE__ */ _("td", { children: f(I.issued) }),
          /* @__PURE__ */ _("td", { children: I.client?.organization || "" }),
          /* @__PURE__ */ _("td", { children: I.title }),
          /* @__PURE__ */ _("td", { children: I.status }),
          /* @__PURE__ */ _("td", { children: d(Number(I.budget?.total) || 0) })
        ] }, I.slug || I.number)
      ) })
    ] })
  ] });
}
function Ge({ label: e, value: t }) {
  return /* @__PURE__ */ L("div", { role: "listitem", className: "engagement-report-card", children: [
    /* @__PURE__ */ _("span", { className: "engagement-report-card-label", children: e }),
    /* @__PURE__ */ _("span", { className: "engagement-report-card-value", children: t })
  ] });
}
function Lc(e) {
  const t = /* @__PURE__ */ new Map();
  if (!Array.isArray(e)) return t;
  for (const u of e)
    u?.slug && t.set(u.slug, u), u?.number != null && t.set(String(u.number), u);
  return t;
}
function Rc(e, t, u, a) {
  const s = Bt(e, u, a), n = e?.sow_ref ? t.get(String(e.sow_ref)) : null, i = Number(n?.budget?.total) || 0, d = i > 0 ? s.total / i * 100 : null;
  return { ...e, _totals: s, _percentBilled: d };
}
function yc(e, t) {
  const u = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = (i, d, f) => {
    const T = i.get(d) || { count: 0, subtotal: 0, total: 0, outstanding: 0 };
    T.count += 1, T.subtotal += f.subtotal, T.total += f.total, T.outstanding += f.outstanding, i.set(d, T);
  };
  for (const i of e) {
    const d = t ? {
      subtotal: i._totals?.subtotal ?? 0,
      total: i._totals?.total ?? 0,
      outstanding: ["paid", "void"].includes(i.status) ? 0 : i._totals?.total ?? 0
    } : {
      subtotal: Number(i.budget?.total) || 0,
      total: Number(i.budget?.total) || 0,
      outstanding: 0
    };
    s(u, i.client?.organization || "(no client)", d), s(a, i.status || "(no status)", d);
  }
  const n = [];
  for (const [i, d] of u) n.push(["Client", i, d.count, d.subtotal, d.total, d.outstanding]);
  for (const [i, d] of a) n.push(["Status", i, d.count, d.subtotal, d.total, d.outstanding]);
  return n;
}
function Ia(e) {
  const t = (a, s) => ({
    type: "text",
    content: a,
    ...s
  }), u = (a, s = {}) => {
    const n = /<(\w+)(\s[^>]*)?>(.+?)<\/\1>/gs;
    let i = [], d = 0;
    if (!a) return [t("", s)];
    a.replace(n, (T, h, A, g, N) => {
      const H = a.slice(d, N);
      if (H && i.push(t(H, s)), h === "a" && A) {
        const te = A.match(/href="([^"]*)"/)?.[1];
        if (te) {
          i.push({
            type: "link",
            content: g,
            href: te
          }), d = N + T.length;
          return;
        }
      }
      const Y = { ...s };
      (h === "strong" || h === "b") && (Y.bold = !0), (h === "em" || h === "i") && (Y.italics = !0), h === "u" && (Y.underline = {}), i = i.concat(u(g, Y)), d = N + T.length;
    });
    const f = a.slice(d);
    return f && i.push(t(f, s)), i;
  };
  return typeof e != "string" && (e = String(e ?? "")), u(e);
}
function Ca({ children: e, bold: t, italics: u, underline: a, style: s, ...n }) {
  const i = { "data-type": "text" };
  return t && (i["data-bold"] = "true"), u && (i["data-italics"] = "true"), a && (i["data-underline"] = "true"), s && (i["data-style"] = s), /* @__PURE__ */ _("span", { ...i, ...n, children: e });
}
function at({ as: e = "p", data: t, children: u, ...a }) {
  if (t) {
    const s = Ia(t);
    return /* @__PURE__ */ _(e, { "data-type": "paragraph", ...a, children: s.map(
      (n, i) => n.type === "link" ? /* @__PURE__ */ _(
        "a",
        {
          "data-type": "externalHyperlink",
          "data-link": n.href,
          href: n.href,
          children: /* @__PURE__ */ _("span", { "data-type": "text", "data-style": "Hyperlink", children: n.content })
        },
        i
      ) : /* @__PURE__ */ _(
        Ca,
        {
          bold: n.bold,
          italics: n.italics,
          underline: !!n.underline,
          children: n.content
        },
        i
      )
    ) });
  }
  return /* @__PURE__ */ _(e, { "data-type": "paragraph", ...a, children: u });
}
function Sa({ level: e, data: t, children: u, ...a }) {
  const s = `h${e}`;
  if (t) {
    const n = Ia(t);
    return /* @__PURE__ */ _(s, { "data-type": "paragraph", "data-heading": `HEADING_${e}`, ...a, children: n.map(
      (i, d) => i.type === "link" ? /* @__PURE__ */ _(
        "a",
        {
          "data-type": "externalHyperlink",
          "data-link": i.href,
          href: i.href,
          children: /* @__PURE__ */ _("span", { "data-type": "text", "data-style": "Hyperlink", children: i.content })
        },
        d
      ) : /* @__PURE__ */ _(
        Ca,
        {
          bold: i.bold,
          italics: i.italics,
          underline: !!i.underline,
          children: i.content
        },
        d
      )
    ) });
  }
  return /* @__PURE__ */ _(s, { "data-type": "paragraph", "data-heading": `HEADING_${e}`, ...a, children: u });
}
function Oa(e) {
  return /* @__PURE__ */ _(Sa, { level: 1, ...e });
}
function Da(e) {
  return /* @__PURE__ */ _(Sa, { level: 2, ...e });
}
Dt({ widths: null, borderColor: "cccccc" });
function Pc(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const u of e) {
    if (u.type === "heading" && u.level === 2) break;
    (u.type === "paragraph" || u.type === "inset") && t.push(u);
  }
  return t;
}
function Gc({ content: e, block: t }) {
  const { title: u, items: a, sequence: s } = e, n = _a(), i = Pc(s), d = i.filter((h) => h.type === "paragraph").map((h) => h.text), f = /* @__PURE__ */ L(Ve, { children: [
    u && /* @__PURE__ */ _(Oa, { data: u, "data-spacing-after": 240 }),
    d.map((h, A) => /* @__PURE__ */ _(at, { data: h, "data-spacing-after": 120 }, `p${A}`)),
    a.map((h, A) => /* @__PURE__ */ L(je, { children: [
      h.title && /* @__PURE__ */ _(Da, { data: h.title, "data-spacing-before": 200, "data-spacing-after": 120 }),
      h.paragraphs.map((g, N) => /* @__PURE__ */ _(at, { data: g, "data-spacing-after": 100 }, `${A}-${N}`))
    ] }, A))
  ] }), T = /* @__PURE__ */ L("section", { className: "invoice-section", children: [
    u && /* @__PURE__ */ _("h1", { className: "invoice-title", children: u }),
    i.map((h, A) => {
      if (h.type === "paragraph")
        return /* @__PURE__ */ _("p", { dangerouslySetInnerHTML: { __html: h.text } }, `p${A}`);
      if (h.type === "inset") {
        const g = t.getInset(h.refId);
        return g ? /* @__PURE__ */ _(n, { blocks: [g] }, `i${A}`) : null;
      }
      return null;
    }),
    a.length > 0 && /* @__PURE__ */ _("div", { className: "invoice-items", children: a.map((h, A) => /* @__PURE__ */ L(je, { children: [
      h.title && /* @__PURE__ */ _("h2", { className: "invoice-item-title", children: h.title }),
      h.paragraphs.map((g, N) => /* @__PURE__ */ _("p", { className: "invoice-item-detail", dangerouslySetInnerHTML: { __html: g } }, `${A}-${N}`))
    ] }, A)) })
  ] });
  return Se(t, "docx", f), Se(t, "html", T), T;
}
function Mc(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const u of e) {
    if (u.type === "heading" && u.level === 2) break;
    (u.type === "paragraph" || u.type === "inset") && t.push(u);
  }
  return t;
}
function Kc({ content: e, block: t }) {
  const { title: u, items: a, sequence: s } = e, n = _a(), i = Mc(s), d = i.filter((h) => h.type === "paragraph").map((h) => h.text), f = /* @__PURE__ */ L(Ve, { children: [
    u && /* @__PURE__ */ _(Oa, { data: u, "data-spacing-after": 240 }),
    d.map((h, A) => /* @__PURE__ */ _(at, { data: h, "data-spacing-after": 120 }, `p${A}`)),
    a.map((h, A) => /* @__PURE__ */ L(je, { children: [
      h.title && /* @__PURE__ */ _(Da, { data: h.title, "data-spacing-before": 200, "data-spacing-after": 120 }),
      h.paragraphs.map((g, N) => /* @__PURE__ */ _(at, { data: g, "data-spacing-after": 100 }, `${A}-${N}`))
    ] }, A))
  ] }), T = /* @__PURE__ */ L("section", { className: "sow-section", children: [
    u && /* @__PURE__ */ _("h1", { className: "sow-title", children: u }),
    i.map((h, A) => {
      if (h.type === "paragraph")
        return /* @__PURE__ */ _("p", { dangerouslySetInnerHTML: { __html: h.text } }, `p${A}`);
      if (h.type === "inset") {
        const g = t.getInset(h.refId);
        return g ? /* @__PURE__ */ _(n, { blocks: [g] }, `i${A}`) : null;
      }
      return null;
    }),
    a.length > 0 && /* @__PURE__ */ _("div", { className: "sow-items", children: a.map((h, A) => /* @__PURE__ */ L(je, { children: [
      h.title && /* @__PURE__ */ _("h2", { className: "sow-item-title", children: h.title }),
      h.paragraphs.map((g, N) => /* @__PURE__ */ _("p", { className: "sow-item-detail", dangerouslySetInnerHTML: { __html: g } }, `${A}-${N}`)),
      Array.isArray(h.items) && h.items.length > 0 && /* @__PURE__ */ _("ul", { className: "sow-item-sublist", children: h.items.map((g, N) => /* @__PURE__ */ _("li", { dangerouslySetInnerHTML: { __html: g.title || g.paragraphs?.[0] || "" } }, N)) })
    ] }, A)) })
  ] });
  return Se(t, "docx", f), Se(t, "html", T), T;
}
const Ke = {
  pdf: { label: "PDF", ext: "pdf" },
  pagedjs: { label: "HTML (Paged.js)", ext: "html" },
  docx: { label: "Word", ext: "docx" },
  xlsx: { label: "Excel", ext: "xlsx" }
};
function xc({ title: e = "Document", filename: t = "document" }) {
  const { website: u } = vt(), [a, s] = Qe(null), [n, i] = Qe(null), [d, f] = Qe(!1), T = Ma(null);
  rt(() => {
    if (!d) return;
    const g = (N) => {
      T.current && !T.current.contains(N.target) && f(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [d]);
  const h = Object.keys(qe.outputs || {}).filter((g) => Ke[g]), A = async (g) => {
    i(null), s(g), f(!1);
    try {
      const N = await ic(u, { format: g, foundation: qe, title: e }), H = qe.outputs?.[g]?.extension || Ke[g]?.ext || g;
      rc(N, `${t}.${H}`);
    } catch (N) {
      console.error("compile failed", N), i(N?.message || String(N));
    } finally {
      s(null);
    }
  };
  return /* @__PURE__ */ L("div", { ref: T, className: "business-docs-download", children: [
    /* @__PURE__ */ _(
      "button",
      {
        type: "button",
        onClick: () => f((g) => !g),
        disabled: a !== null,
        "aria-expanded": d,
        "aria-haspopup": "menu",
        children: a ? `Generating ${a}…` : "Download"
      }
    ),
    d && /* @__PURE__ */ _("div", { role: "menu", className: "business-docs-download-menu", children: h.map((g) => /* @__PURE__ */ L(
      "button",
      {
        type: "button",
        role: "menuitem",
        onClick: () => A(g),
        children: [
          /* @__PURE__ */ _("span", { children: Ke[g].label }),
          /* @__PURE__ */ L("span", { className: "business-docs-download-ext", children: [
            ".",
            Ke[g].ext
          ] })
        ]
      },
      g
    )) }),
    n && /* @__PURE__ */ _("p", { className: "business-docs-download-error", children: n })
  ] });
}
function Bc({ body: e, page: t }) {
  const { website: u } = vt(), a = t?.title || "Business document", s = (t?.title || "document").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return rt(() => Tc(t), [t]), /* @__PURE__ */ L(Qu, { basePath: u.basePath, children: [
    /* @__PURE__ */ _("main", { className: "business-docs-body", children: /* @__PURE__ */ _("div", { className: "business-docs-document", children: e }) }),
    /* @__PURE__ */ _(xc, { title: a, filename: s })
  ] });
}
const kc = { ...qe, layouts: { BusinessDocLayout: Bc } }, wc = {}, Fc = {}, Qc = { meta: wc, capabilities: kc, layoutMeta: Fc };
export {
  Wc as E,
  Gc as I,
  Kc as S,
  Qc as _,
  _u as a,
  ic as c,
  Wo as p
};
//# sourceMappingURL=_entry.generated-B0DlssXR.js.map
