let R = class extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
};
function Rn(t) {
  return Ye(t);
}
function Ye(t) {
  return Array.isArray(t) ? Ln(t) : t instanceof RegExp ? t : typeof t == "object" ? Nn(t) : t;
}
function Ln(t) {
  let e = [];
  for (let n = 0, r = t.length; n < r; n++)
    e[n] = Ye(t[n]);
  return e;
}
function Nn(t) {
  let e = {};
  for (let n in t)
    e[n] = Ye(t[n]);
  return e;
}
function Et(t, ...e) {
  return e.forEach((n) => {
    for (let r in n)
      t[r] = n[r];
  }), t;
}
function It(t) {
  const e = ~t.lastIndexOf("/") || ~t.lastIndexOf("\\");
  return e === 0 ? t : ~e === t.length - 1 ? It(t.substring(0, t.length - 1)) : t.substr(~e + 1);
}
var xe = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g, le = class {
  static hasCaptures(t) {
    return t === null ? !1 : (xe.lastIndex = 0, xe.test(t));
  }
  static replaceCaptures(t, e, n) {
    return t.replace(xe, (r, i, o, s) => {
      let l = n[parseInt(i || o, 10)];
      if (l) {
        let a = e.substring(l.start, l.end);
        for (; a[0] === "."; )
          a = a.substring(1);
        switch (s) {
          case "downcase":
            return a.toLowerCase();
          case "upcase":
            return a.toUpperCase();
          default:
            return a;
        }
      } else
        return r;
    });
  }
};
function Ot(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function Mt(t, e) {
  if (t === null && e === null)
    return 0;
  if (!t)
    return -1;
  if (!e)
    return 1;
  let n = t.length, r = e.length;
  if (n === r) {
    for (let i = 0; i < n; i++) {
      let o = Ot(t[i], e[i]);
      if (o !== 0)
        return o;
    }
    return 0;
  }
  return n - r;
}
function ut(t) {
  return !!(/^#[0-9a-f]{6}$/i.test(t) || /^#[0-9a-f]{8}$/i.test(t) || /^#[0-9a-f]{3}$/i.test(t) || /^#[0-9a-f]{4}$/i.test(t));
}
function Bt(t) {
  return t.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}
var Dt = class {
  constructor(t) {
    this.fn = t;
  }
  cache = /* @__PURE__ */ new Map();
  get(t) {
    if (this.cache.has(t))
      return this.cache.get(t);
    const e = this.fn(t);
    return this.cache.set(t, e), e;
  }
}, fe = class {
  constructor(t, e, n) {
    this._colorMap = t, this._defaults = e, this._root = n;
  }
  static createFromRawTheme(t, e) {
    return this.createFromParsedTheme(Pn(t), e);
  }
  static createFromParsedTheme(t, e) {
    return In(t, e);
  }
  _cachedMatchRoot = new Dt(
    (t) => this._root.match(t)
  );
  getColorMap() {
    return this._colorMap.getColorMap();
  }
  getDefaults() {
    return this._defaults;
  }
  match(t) {
    if (t === null)
      return this._defaults;
    const e = t.scopeName, r = this._cachedMatchRoot.get(e).find(
      (i) => An(t.parent, i.parentScopes)
    );
    return r ? new Gt(
      r.fontStyle,
      r.foreground,
      r.background
    ) : null;
  }
}, Pe = class pe {
  constructor(e, n) {
    this.parent = e, this.scopeName = n;
  }
  static push(e, n) {
    for (const r of n)
      e = new pe(e, r);
    return e;
  }
  static from(...e) {
    let n = null;
    for (let r = 0; r < e.length; r++)
      n = new pe(n, e[r]);
    return n;
  }
  push(e) {
    return new pe(this, e);
  }
  getSegments() {
    let e = this;
    const n = [];
    for (; e; )
      n.push(e.scopeName), e = e.parent;
    return n.reverse(), n;
  }
  toString() {
    return this.getSegments().join(" ");
  }
  extends(e) {
    return this === e ? !0 : this.parent === null ? !1 : this.parent.extends(e);
  }
  getExtensionIfDefined(e) {
    const n = [];
    let r = this;
    for (; r && r !== e; )
      n.push(r.scopeName), r = r.parent;
    return r === e ? n.reverse() : void 0;
  }
};
function An(t, e) {
  if (e.length === 0)
    return !0;
  for (let n = 0; n < e.length; n++) {
    let r = e[n], i = !1;
    if (r === ">") {
      if (n === e.length - 1)
        return !1;
      r = e[++n], i = !0;
    }
    for (; t && !xn(t.scopeName, r); ) {
      if (i)
        return !1;
      t = t.parent;
    }
    if (!t)
      return !1;
    t = t.parent;
  }
  return !0;
}
function xn(t, e) {
  return e === t || t.startsWith(e) && t[e.length] === ".";
}
var Gt = class {
  constructor(t, e, n) {
    this.fontStyle = t, this.foregroundId = e, this.backgroundId = n;
  }
};
function Pn(t) {
  if (!t)
    return [];
  if (!t.settings || !Array.isArray(t.settings))
    return [];
  let e = t.settings, n = [], r = 0;
  for (let i = 0, o = e.length; i < o; i++) {
    let s = e[i];
    if (!s.settings)
      continue;
    let l;
    if (typeof s.scope == "string") {
      let m = s.scope;
      m = m.replace(/^[,]+/, ""), m = m.replace(/[,]+$/, ""), l = m.split(",");
    } else Array.isArray(s.scope) ? l = s.scope : l = [""];
    let a = -1;
    if (typeof s.settings.fontStyle == "string") {
      a = 0;
      let m = s.settings.fontStyle.split(" ");
      for (let d = 0, p = m.length; d < p; d++)
        switch (m[d]) {
          case "italic":
            a = a | 1;
            break;
          case "bold":
            a = a | 2;
            break;
          case "underline":
            a = a | 4;
            break;
          case "strikethrough":
            a = a | 8;
            break;
        }
    }
    let c = null;
    typeof s.settings.foreground == "string" && ut(s.settings.foreground) && (c = s.settings.foreground);
    let u = null;
    typeof s.settings.background == "string" && ut(s.settings.background) && (u = s.settings.background);
    for (let m = 0, d = l.length; m < d; m++) {
      let h = l[m].trim().split(" "), b = h[h.length - 1], S = null;
      h.length > 1 && (S = h.slice(0, h.length - 1), S.reverse()), n[r++] = new En(
        b,
        S,
        i,
        a,
        c,
        u
      );
    }
  }
  return n;
}
var En = class {
  constructor(t, e, n, r, i, o) {
    this.scope = t, this.parentScopes = e, this.index = n, this.fontStyle = r, this.foreground = i, this.background = o;
  }
}, P = /* @__PURE__ */ ((t) => (t[t.NotSet = -1] = "NotSet", t[t.None = 0] = "None", t[t.Italic = 1] = "Italic", t[t.Bold = 2] = "Bold", t[t.Underline = 4] = "Underline", t[t.Strikethrough = 8] = "Strikethrough", t))(P || {});
function In(t, e) {
  t.sort((a, c) => {
    let u = Ot(a.scope, c.scope);
    return u !== 0 || (u = Mt(a.parentScopes, c.parentScopes), u !== 0) ? u : a.index - c.index;
  });
  let n = 0, r = "#000000", i = "#ffffff";
  for (; t.length >= 1 && t[0].scope === ""; ) {
    let a = t.shift();
    a.fontStyle !== -1 && (n = a.fontStyle), a.foreground !== null && (r = a.foreground), a.background !== null && (i = a.background);
  }
  let o = new On(e), s = new Gt(n, o.getId(r), o.getId(i)), l = new Bn(new Ge(0, null, -1, 0, 0), []);
  for (let a = 0, c = t.length; a < c; a++) {
    let u = t[a];
    l.insert(0, u.scope, u.parentScopes, u.fontStyle, o.getId(u.foreground), o.getId(u.background));
  }
  return new fe(o, s, l);
}
var On = class {
  _isFrozen;
  _lastColorId;
  _id2color;
  _color2id;
  constructor(t) {
    if (this._lastColorId = 0, this._id2color = [], this._color2id = /* @__PURE__ */ Object.create(null), Array.isArray(t)) {
      this._isFrozen = !0;
      for (let e = 0, n = t.length; e < n; e++)
        this._color2id[t[e]] = e, this._id2color[e] = t[e];
    } else
      this._isFrozen = !1;
  }
  getId(t) {
    if (t === null)
      return 0;
    t = t.toUpperCase();
    let e = this._color2id[t];
    if (e)
      return e;
    if (this._isFrozen)
      throw new Error(`Missing color in color map - ${t}`);
    return e = ++this._lastColorId, this._color2id[t] = e, this._id2color[e] = t, e;
  }
  getColorMap() {
    return this._id2color.slice(0);
  }
}, Mn = Object.freeze([]), Ge = class jt {
  scopeDepth;
  parentScopes;
  fontStyle;
  foreground;
  background;
  constructor(e, n, r, i, o) {
    this.scopeDepth = e, this.parentScopes = n || Mn, this.fontStyle = r, this.foreground = i, this.background = o;
  }
  clone() {
    return new jt(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
  }
  static cloneArr(e) {
    let n = [];
    for (let r = 0, i = e.length; r < i; r++)
      n[r] = e[r].clone();
    return n;
  }
  acceptOverwrite(e, n, r, i) {
    this.scopeDepth > e ? console.log("how did this happen?") : this.scopeDepth = e, n !== -1 && (this.fontStyle = n), r !== 0 && (this.foreground = r), i !== 0 && (this.background = i);
  }
}, Bn = class je {
  constructor(e, n = [], r = {}) {
    this._mainRule = e, this._children = r, this._rulesWithParentScopes = n;
  }
  _rulesWithParentScopes;
  static _cmpBySpecificity(e, n) {
    if (e.scopeDepth !== n.scopeDepth)
      return n.scopeDepth - e.scopeDepth;
    let r = 0, i = 0;
    for (; e.parentScopes[r] === ">" && r++, n.parentScopes[i] === ">" && i++, !(r >= e.parentScopes.length || i >= n.parentScopes.length); ) {
      const o = n.parentScopes[i].length - e.parentScopes[r].length;
      if (o !== 0)
        return o;
      r++, i++;
    }
    return n.parentScopes.length - e.parentScopes.length;
  }
  match(e) {
    if (e !== "") {
      let r = e.indexOf("."), i, o;
      if (r === -1 ? (i = e, o = "") : (i = e.substring(0, r), o = e.substring(r + 1)), this._children.hasOwnProperty(i))
        return this._children[i].match(o);
    }
    const n = this._rulesWithParentScopes.concat(this._mainRule);
    return n.sort(je._cmpBySpecificity), n;
  }
  insert(e, n, r, i, o, s) {
    if (n === "") {
      this._doInsertHere(e, r, i, o, s);
      return;
    }
    let l = n.indexOf("."), a, c;
    l === -1 ? (a = n, c = "") : (a = n.substring(0, l), c = n.substring(l + 1));
    let u;
    this._children.hasOwnProperty(a) ? u = this._children[a] : (u = new je(this._mainRule.clone(), Ge.cloneArr(this._rulesWithParentScopes)), this._children[a] = u), u.insert(e + 1, c, r, i, o, s);
  }
  _doInsertHere(e, n, r, i, o) {
    if (n === null) {
      this._mainRule.acceptOverwrite(e, r, i, o);
      return;
    }
    for (let s = 0, l = this._rulesWithParentScopes.length; s < l; s++) {
      let a = this._rulesWithParentScopes[s];
      if (Mt(a.parentScopes, n) === 0) {
        a.acceptOverwrite(e, r, i, o);
        return;
      }
    }
    r === -1 && (r = this._mainRule.fontStyle), i === 0 && (i = this._mainRule.foreground), o === 0 && (o = this._mainRule.background), this._rulesWithParentScopes.push(new Ge(e, n, r, i, o));
  }
}, K = class M {
  static toBinaryStr(e) {
    return e.toString(2).padStart(32, "0");
  }
  static print(e) {
    const n = M.getLanguageId(e), r = M.getTokenType(e), i = M.getFontStyle(e), o = M.getForeground(e), s = M.getBackground(e);
    console.log({
      languageId: n,
      tokenType: r,
      fontStyle: i,
      foreground: o,
      background: s
    });
  }
  static getLanguageId(e) {
    return (e & 255) >>> 0;
  }
  static getTokenType(e) {
    return (e & 768) >>> 8;
  }
  static containsBalancedBrackets(e) {
    return (e & 1024) !== 0;
  }
  static getFontStyle(e) {
    return (e & 30720) >>> 11;
  }
  static getForeground(e) {
    return (e & 16744448) >>> 15;
  }
  static getBackground(e) {
    return (e & 4278190080) >>> 24;
  }
  /**
   * Updates the fields in `metadata`.
   * A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
   */
  static set(e, n, r, i, o, s, l) {
    let a = M.getLanguageId(e), c = M.getTokenType(e), u = M.containsBalancedBrackets(e) ? 1 : 0, m = M.getFontStyle(e), d = M.getForeground(e), p = M.getBackground(e);
    return n !== 0 && (a = n), r !== 8 && (c = r), i !== null && (u = i ? 1 : 0), o !== -1 && (m = o), s !== 0 && (d = s), l !== 0 && (p = l), (a << 0 | c << 8 | u << 10 | m << 11 | d << 15 | p << 24) >>> 0;
  }
};
function ge(t, e) {
  const n = [], r = Dn(t);
  let i = r.next();
  for (; i !== null; ) {
    let a = 0;
    if (i.length === 2 && i.charAt(1) === ":") {
      switch (i.charAt(0)) {
        case "R":
          a = 1;
          break;
        case "L":
          a = -1;
          break;
        default:
          console.log(`Unknown priority ${i} in scope selector`);
      }
      i = r.next();
    }
    let c = s();
    if (n.push({ matcher: c, priority: a }), i !== ",")
      break;
    i = r.next();
  }
  return n;
  function o() {
    if (i === "-") {
      i = r.next();
      const a = o();
      return (c) => !!a && !a(c);
    }
    if (i === "(") {
      i = r.next();
      const a = l();
      return i === ")" && (i = r.next()), a;
    }
    if (mt(i)) {
      const a = [];
      do
        a.push(i), i = r.next();
      while (mt(i));
      return (c) => e(a, c);
    }
    return null;
  }
  function s() {
    const a = [];
    let c = o();
    for (; c; )
      a.push(c), c = o();
    return (u) => a.every((m) => m(u));
  }
  function l() {
    const a = [];
    let c = s();
    for (; c && (a.push(c), i === "|" || i === ","); ) {
      do
        i = r.next();
      while (i === "|" || i === ",");
      c = s();
    }
    return (u) => a.some((m) => m(u));
  }
}
function mt(t) {
  return !!t && !!t.match(/[\w\.:]+/);
}
function Dn(t) {
  let e = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g, n = e.exec(t);
  return {
    next: () => {
      if (!n)
        return null;
      const r = n[0];
      return n = e.exec(t), r;
    }
  };
}
function $t(t) {
  typeof t.dispose == "function" && t.dispose();
}
var ee = class {
  constructor(t) {
    this.scopeName = t;
  }
  toKey() {
    return this.scopeName;
  }
}, Gn = class {
  constructor(t, e) {
    this.scopeName = t, this.ruleName = e;
  }
  toKey() {
    return `${this.scopeName}#${this.ruleName}`;
  }
}, jn = class {
  _references = [];
  _seenReferenceKeys = /* @__PURE__ */ new Set();
  get references() {
    return this._references;
  }
  visitedRule = /* @__PURE__ */ new Set();
  add(t) {
    const e = t.toKey();
    this._seenReferenceKeys.has(e) || (this._seenReferenceKeys.add(e), this._references.push(t));
  }
}, $n = class {
  constructor(t, e) {
    this.repo = t, this.initialScopeName = e, this.seenFullScopeRequests.add(this.initialScopeName), this.Q = [new ee(this.initialScopeName)];
  }
  seenFullScopeRequests = /* @__PURE__ */ new Set();
  seenPartialScopeRequests = /* @__PURE__ */ new Set();
  Q;
  processQueue() {
    const t = this.Q;
    this.Q = [];
    const e = new jn();
    for (const n of t)
      Fn(n, this.initialScopeName, this.repo, e);
    for (const n of e.references)
      if (n instanceof ee) {
        if (this.seenFullScopeRequests.has(n.scopeName))
          continue;
        this.seenFullScopeRequests.add(n.scopeName), this.Q.push(n);
      } else {
        if (this.seenFullScopeRequests.has(n.scopeName) || this.seenPartialScopeRequests.has(n.toKey()))
          continue;
        this.seenPartialScopeRequests.add(n.toKey()), this.Q.push(n);
      }
  }
};
function Fn(t, e, n, r) {
  const i = n.lookup(t.scopeName);
  if (!i) {
    if (t.scopeName === e)
      throw new Error(`No grammar provided for <${e}>`);
    return;
  }
  const o = n.lookup(e);
  t instanceof ee ? he({ baseGrammar: o, selfGrammar: i }, r) : $e(
    t.ruleName,
    { baseGrammar: o, selfGrammar: i, repository: i.repository },
    r
  );
  const s = n.injections(t.scopeName);
  if (s)
    for (const l of s)
      r.add(new ee(l));
}
function $e(t, e, n) {
  if (e.repository && e.repository[t]) {
    const r = e.repository[t];
    ye([r], e, n);
  }
}
function he(t, e) {
  t.selfGrammar.patterns && Array.isArray(t.selfGrammar.patterns) && ye(
    t.selfGrammar.patterns,
    { ...t, repository: t.selfGrammar.repository },
    e
  ), t.selfGrammar.injections && ye(
    Object.values(t.selfGrammar.injections),
    { ...t, repository: t.selfGrammar.repository },
    e
  );
}
function ye(t, e, n) {
  for (const r of t) {
    if (n.visitedRule.has(r))
      continue;
    n.visitedRule.add(r);
    const i = r.repository ? Et({}, e.repository, r.repository) : e.repository;
    Array.isArray(r.patterns) && ye(r.patterns, { ...e, repository: i }, n);
    const o = r.include;
    if (!o)
      continue;
    const s = Ft(o);
    switch (s.kind) {
      case 0:
        he({ ...e, selfGrammar: e.baseGrammar }, n);
        break;
      case 1:
        he(e, n);
        break;
      case 2:
        $e(s.ruleName, { ...e, repository: i }, n);
        break;
      case 3:
      case 4:
        const l = s.scopeName === e.selfGrammar.scopeName ? e.selfGrammar : s.scopeName === e.baseGrammar.scopeName ? e.baseGrammar : void 0;
        if (l) {
          const a = { baseGrammar: e.baseGrammar, selfGrammar: l, repository: i };
          s.kind === 4 ? $e(s.ruleName, a, n) : he(a, n);
        } else
          s.kind === 4 ? n.add(new Gn(s.scopeName, s.ruleName)) : n.add(new ee(s.scopeName));
        break;
    }
  }
}
var Un = class {
  kind = 0;
}, Hn = class {
  kind = 1;
}, Wn = class {
  constructor(t) {
    this.ruleName = t;
  }
  kind = 2;
}, zn = class {
  constructor(t) {
    this.scopeName = t;
  }
  kind = 3;
}, qn = class {
  constructor(t, e) {
    this.scopeName = t, this.ruleName = e;
  }
  kind = 4;
};
function Ft(t) {
  if (t === "$base")
    return new Un();
  if (t === "$self")
    return new Hn();
  const e = t.indexOf("#");
  if (e === -1)
    return new zn(t);
  if (e === 0)
    return new Wn(t.substring(1));
  {
    const n = t.substring(0, e), r = t.substring(e + 1);
    return new qn(n, r);
  }
}
var Vn = /\\(\d+)/, pt = /\\(\d+)/g, Kn = -1, Ut = -2;
var se = class {
  $location;
  id;
  _nameIsCapturing;
  _name;
  _contentNameIsCapturing;
  _contentName;
  constructor(t, e, n, r) {
    this.$location = t, this.id = e, this._name = n || null, this._nameIsCapturing = le.hasCaptures(this._name), this._contentName = r || null, this._contentNameIsCapturing = le.hasCaptures(this._contentName);
  }
  get debugName() {
    const t = this.$location ? `${It(this.$location.filename)}:${this.$location.line}` : "unknown";
    return `${this.constructor.name}#${this.id} @ ${t}`;
  }
  getName(t, e) {
    return !this._nameIsCapturing || this._name === null || t === null || e === null ? this._name : le.replaceCaptures(this._name, t, e);
  }
  getContentName(t, e) {
    return !this._contentNameIsCapturing || this._contentName === null ? this._contentName : le.replaceCaptures(this._contentName, t, e);
  }
}, Jn = class extends se {
  retokenizeCapturedWithRuleId;
  constructor(t, e, n, r, i) {
    super(t, e, n, r), this.retokenizeCapturedWithRuleId = i;
  }
  dispose() {
  }
  collectPatterns(t, e) {
    throw new Error("Not supported!");
  }
  compile(t, e) {
    throw new Error("Not supported!");
  }
  compileAG(t, e, n, r) {
    throw new Error("Not supported!");
  }
}, Yn = class extends se {
  _match;
  captures;
  _cachedCompiledPatterns;
  constructor(t, e, n, r, i) {
    super(t, e, n, null), this._match = new te(r, this.id), this.captures = i, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  get debugMatchRegExp() {
    return `${this._match.source}`;
  }
  collectPatterns(t, e) {
    e.push(this._match);
  }
  compile(t, e) {
    return this._getCachedCompiledPatterns(t).compile(t);
  }
  compileAG(t, e, n, r) {
    return this._getCachedCompiledPatterns(t).compileAG(t, n, r);
  }
  _getCachedCompiledPatterns(t) {
    return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new ne(), this.collectPatterns(t, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
  }
}, ht = class extends se {
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  constructor(t, e, n, r, i) {
    super(t, e, n, r), this.patterns = i.patterns, this.hasMissingPatterns = i.hasMissingPatterns, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  collectPatterns(t, e) {
    for (const n of this.patterns)
      t.getRule(n).collectPatterns(t, e);
  }
  compile(t, e) {
    return this._getCachedCompiledPatterns(t).compile(t);
  }
  compileAG(t, e, n, r) {
    return this._getCachedCompiledPatterns(t).compileAG(t, n, r);
  }
  _getCachedCompiledPatterns(t) {
    return this._cachedCompiledPatterns || (this._cachedCompiledPatterns = new ne(), this.collectPatterns(t, this._cachedCompiledPatterns)), this._cachedCompiledPatterns;
  }
}, Fe = class extends se {
  _begin;
  beginCaptures;
  _end;
  endHasBackReferences;
  endCaptures;
  applyEndPatternLast;
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  constructor(t, e, n, r, i, o, s, l, a, c) {
    super(t, e, n, r), this._begin = new te(i, this.id), this.beginCaptures = o, this._end = new te(s || "￿", -1), this.endHasBackReferences = this._end.hasBackReferences, this.endCaptures = l, this.applyEndPatternLast = a || !1, this.patterns = c.patterns, this.hasMissingPatterns = c.hasMissingPatterns, this._cachedCompiledPatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null);
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugEndRegExp() {
    return `${this._end.source}`;
  }
  getEndWithResolvedBackReferences(t, e) {
    return this._end.resolveBackReferences(t, e);
  }
  collectPatterns(t, e) {
    e.push(this._begin);
  }
  compile(t, e) {
    return this._getCachedCompiledPatterns(t, e).compile(t);
  }
  compileAG(t, e, n, r) {
    return this._getCachedCompiledPatterns(t, e).compileAG(t, n, r);
  }
  _getCachedCompiledPatterns(t, e) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new ne();
      for (const n of this.patterns)
        t.getRule(n).collectPatterns(t, this._cachedCompiledPatterns);
      this.applyEndPatternLast ? this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end) : this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
    }
    return this._end.hasBackReferences && (this.applyEndPatternLast ? this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, e) : this._cachedCompiledPatterns.setSource(0, e)), this._cachedCompiledPatterns;
  }
}, be = class extends se {
  _begin;
  beginCaptures;
  whileCaptures;
  _while;
  whileHasBackReferences;
  hasMissingPatterns;
  patterns;
  _cachedCompiledPatterns;
  _cachedCompiledWhilePatterns;
  constructor(t, e, n, r, i, o, s, l, a) {
    super(t, e, n, r), this._begin = new te(i, this.id), this.beginCaptures = o, this.whileCaptures = l, this._while = new te(s, Ut), this.whileHasBackReferences = this._while.hasBackReferences, this.patterns = a.patterns, this.hasMissingPatterns = a.hasMissingPatterns, this._cachedCompiledPatterns = null, this._cachedCompiledWhilePatterns = null;
  }
  dispose() {
    this._cachedCompiledPatterns && (this._cachedCompiledPatterns.dispose(), this._cachedCompiledPatterns = null), this._cachedCompiledWhilePatterns && (this._cachedCompiledWhilePatterns.dispose(), this._cachedCompiledWhilePatterns = null);
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugWhileRegExp() {
    return `${this._while.source}`;
  }
  getWhileWithResolvedBackReferences(t, e) {
    return this._while.resolveBackReferences(t, e);
  }
  collectPatterns(t, e) {
    e.push(this._begin);
  }
  compile(t, e) {
    return this._getCachedCompiledPatterns(t).compile(t);
  }
  compileAG(t, e, n, r) {
    return this._getCachedCompiledPatterns(t).compileAG(t, n, r);
  }
  _getCachedCompiledPatterns(t) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new ne();
      for (const e of this.patterns)
        t.getRule(e).collectPatterns(t, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
  compileWhile(t, e) {
    return this._getCachedCompiledWhilePatterns(t, e).compile(t);
  }
  compileWhileAG(t, e, n, r) {
    return this._getCachedCompiledWhilePatterns(t, e).compileAG(t, n, r);
  }
  _getCachedCompiledWhilePatterns(t, e) {
    return this._cachedCompiledWhilePatterns || (this._cachedCompiledWhilePatterns = new ne(), this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while)), this._while.hasBackReferences && this._cachedCompiledWhilePatterns.setSource(0, e || "￿"), this._cachedCompiledWhilePatterns;
  }
}, Ht = class x {
  static createCaptureRule(e, n, r, i, o) {
    return e.registerRule((s) => new Jn(n, s, r, i, o));
  }
  static getCompiledRuleId(e, n, r) {
    return e.id || n.registerRule((i) => {
      if (e.id = i, e.match)
        return new Yn(
          e.$vscodeTextmateLocation,
          e.id,
          e.name,
          e.match,
          x._compileCaptures(e.captures, n, r)
        );
      if (typeof e.begin > "u") {
        e.repository && (r = Et({}, r, e.repository));
        let o = e.patterns;
        return typeof o > "u" && e.include && (o = [{ include: e.include }]), new ht(
          e.$vscodeTextmateLocation,
          e.id,
          e.name,
          e.contentName,
          x._compilePatterns(o, n, r)
        );
      }
      return e.while ? new be(
        e.$vscodeTextmateLocation,
        e.id,
        e.name,
        e.contentName,
        e.begin,
        x._compileCaptures(e.beginCaptures || e.captures, n, r),
        e.while,
        x._compileCaptures(e.whileCaptures || e.captures, n, r),
        x._compilePatterns(e.patterns, n, r)
      ) : new Fe(
        e.$vscodeTextmateLocation,
        e.id,
        e.name,
        e.contentName,
        e.begin,
        x._compileCaptures(e.beginCaptures || e.captures, n, r),
        e.end,
        x._compileCaptures(e.endCaptures || e.captures, n, r),
        e.applyEndPatternLast,
        x._compilePatterns(e.patterns, n, r)
      );
    }), e.id;
  }
  static _compileCaptures(e, n, r) {
    let i = [];
    if (e) {
      let o = 0;
      for (const s in e) {
        if (s === "$vscodeTextmateLocation")
          continue;
        const l = parseInt(s, 10);
        l > o && (o = l);
      }
      for (let s = 0; s <= o; s++)
        i[s] = null;
      for (const s in e) {
        if (s === "$vscodeTextmateLocation")
          continue;
        const l = parseInt(s, 10);
        let a = 0;
        e[s].patterns && (a = x.getCompiledRuleId(e[s], n, r)), i[l] = x.createCaptureRule(n, e[s].$vscodeTextmateLocation, e[s].name, e[s].contentName, a);
      }
    }
    return i;
  }
  static _compilePatterns(e, n, r) {
    let i = [];
    if (e)
      for (let o = 0, s = e.length; o < s; o++) {
        const l = e[o];
        let a = -1;
        if (l.include) {
          const c = Ft(l.include);
          switch (c.kind) {
            case 0:
            case 1:
              a = x.getCompiledRuleId(r[l.include], n, r);
              break;
            case 2:
              let u = r[c.ruleName];
              u && (a = x.getCompiledRuleId(u, n, r));
              break;
            case 3:
            case 4:
              const m = c.scopeName, d = c.kind === 4 ? c.ruleName : null, p = n.getExternalGrammar(m, r);
              if (p)
                if (d) {
                  let h = p.repository[d];
                  h && (a = x.getCompiledRuleId(h, n, p.repository));
                } else
                  a = x.getCompiledRuleId(p.repository.$self, n, p.repository);
              break;
          }
        } else
          a = x.getCompiledRuleId(l, n, r);
        if (a !== -1) {
          const c = n.getRule(a);
          let u = !1;
          if ((c instanceof ht || c instanceof Fe || c instanceof be) && c.hasMissingPatterns && c.patterns.length === 0 && (u = !0), u)
            continue;
          i.push(a);
        }
      }
    return {
      patterns: i,
      hasMissingPatterns: (e ? e.length : 0) !== i.length
    };
  }
}, te = class Wt {
  source;
  ruleId;
  hasAnchor;
  hasBackReferences;
  _anchorCache;
  constructor(e, n) {
    if (e && typeof e == "string") {
      const r = e.length;
      let i = 0, o = [], s = !1;
      for (let l = 0; l < r; l++)
        if (e.charAt(l) === "\\" && l + 1 < r) {
          const c = e.charAt(l + 1);
          c === "z" ? (o.push(e.substring(i, l)), o.push("$(?!\\n)(?<!\\n)"), i = l + 2) : (c === "A" || c === "G") && (s = !0), l++;
        }
      this.hasAnchor = s, i === 0 ? this.source = e : (o.push(e.substring(i, r)), this.source = o.join(""));
    } else
      this.hasAnchor = !1, this.source = e;
    this.hasAnchor ? this._anchorCache = this._buildAnchorCache() : this._anchorCache = null, this.ruleId = n, typeof this.source == "string" ? this.hasBackReferences = Vn.test(this.source) : this.hasBackReferences = !1;
  }
  clone() {
    return new Wt(this.source, this.ruleId);
  }
  setSource(e) {
    this.source !== e && (this.source = e, this.hasAnchor && (this._anchorCache = this._buildAnchorCache()));
  }
  resolveBackReferences(e, n) {
    if (typeof this.source != "string")
      throw new Error("This method should only be called if the source is a string");
    let r = n.map((i) => e.substring(i.start, i.end));
    return pt.lastIndex = 0, this.source.replace(pt, (i, o) => Bt(r[parseInt(o, 10)] || ""));
  }
  _buildAnchorCache() {
    if (typeof this.source != "string")
      throw new Error("This method should only be called if the source is a string");
    let e = [], n = [], r = [], i = [], o, s, l, a;
    for (o = 0, s = this.source.length; o < s; o++)
      l = this.source.charAt(o), e[o] = l, n[o] = l, r[o] = l, i[o] = l, l === "\\" && o + 1 < s && (a = this.source.charAt(o + 1), a === "A" ? (e[o + 1] = "￿", n[o + 1] = "￿", r[o + 1] = "A", i[o + 1] = "A") : a === "G" ? (e[o + 1] = "￿", n[o + 1] = "G", r[o + 1] = "￿", i[o + 1] = "G") : (e[o + 1] = a, n[o + 1] = a, r[o + 1] = a, i[o + 1] = a), o++);
    return {
      A0_G0: e.join(""),
      A0_G1: n.join(""),
      A1_G0: r.join(""),
      A1_G1: i.join("")
    };
  }
  resolveAnchors(e, n) {
    return !this.hasAnchor || !this._anchorCache || typeof this.source != "string" ? this.source : e ? n ? this._anchorCache.A1_G1 : this._anchorCache.A1_G0 : n ? this._anchorCache.A0_G1 : this._anchorCache.A0_G0;
  }
}, ne = class {
  _items;
  _hasAnchors;
  _cached;
  _anchorCache;
  constructor() {
    this._items = [], this._hasAnchors = !1, this._cached = null, this._anchorCache = {
      A0_G0: null,
      A0_G1: null,
      A1_G0: null,
      A1_G1: null
    };
  }
  dispose() {
    this._disposeCaches();
  }
  _disposeCaches() {
    this._cached && (this._cached.dispose(), this._cached = null), this._anchorCache.A0_G0 && (this._anchorCache.A0_G0.dispose(), this._anchorCache.A0_G0 = null), this._anchorCache.A0_G1 && (this._anchorCache.A0_G1.dispose(), this._anchorCache.A0_G1 = null), this._anchorCache.A1_G0 && (this._anchorCache.A1_G0.dispose(), this._anchorCache.A1_G0 = null), this._anchorCache.A1_G1 && (this._anchorCache.A1_G1.dispose(), this._anchorCache.A1_G1 = null);
  }
  push(t) {
    this._items.push(t), this._hasAnchors = this._hasAnchors || t.hasAnchor;
  }
  unshift(t) {
    this._items.unshift(t), this._hasAnchors = this._hasAnchors || t.hasAnchor;
  }
  length() {
    return this._items.length;
  }
  setSource(t, e) {
    this._items[t].source !== e && (this._disposeCaches(), this._items[t].setSource(e));
  }
  compile(t) {
    if (!this._cached) {
      let e = this._items.map((n) => n.source);
      this._cached = new dt(t, e, this._items.map((n) => n.ruleId));
    }
    return this._cached;
  }
  compileAG(t, e, n) {
    return this._hasAnchors ? e ? n ? (this._anchorCache.A1_G1 || (this._anchorCache.A1_G1 = this._resolveAnchors(t, e, n)), this._anchorCache.A1_G1) : (this._anchorCache.A1_G0 || (this._anchorCache.A1_G0 = this._resolveAnchors(t, e, n)), this._anchorCache.A1_G0) : n ? (this._anchorCache.A0_G1 || (this._anchorCache.A0_G1 = this._resolveAnchors(t, e, n)), this._anchorCache.A0_G1) : (this._anchorCache.A0_G0 || (this._anchorCache.A0_G0 = this._resolveAnchors(t, e, n)), this._anchorCache.A0_G0) : this.compile(t);
  }
  _resolveAnchors(t, e, n) {
    let r = this._items.map((i) => i.resolveAnchors(e, n));
    return new dt(t, r, this._items.map((i) => i.ruleId));
  }
}, dt = class {
  constructor(t, e, n) {
    this.regExps = e, this.rules = n, this.scanner = t.createOnigScanner(e);
  }
  scanner;
  dispose() {
    typeof this.scanner.dispose == "function" && this.scanner.dispose();
  }
  toString() {
    const t = [];
    for (let e = 0, n = this.rules.length; e < n; e++)
      t.push("   - " + this.rules[e] + ": " + this.regExps[e]);
    return t.join(`
`);
  }
  findNextMatchSync(t, e, n) {
    const r = this.scanner.findNextMatchSync(t, e, n);
    return r ? {
      ruleId: this.rules[r.index],
      captureIndices: r.captureIndices
    } : null;
  }
}, Ee = class {
  constructor(t, e) {
    this.languageId = t, this.tokenType = e;
  }
}, Xn = class Ue {
  _defaultAttributes;
  _embeddedLanguagesMatcher;
  constructor(e, n) {
    this._defaultAttributes = new Ee(
      e,
      8
      /* NotSet */
    ), this._embeddedLanguagesMatcher = new Qn(Object.entries(n || {}));
  }
  getDefaultAttributes() {
    return this._defaultAttributes;
  }
  getBasicScopeAttributes(e) {
    return e === null ? Ue._NULL_SCOPE_METADATA : this._getBasicScopeAttributes.get(e);
  }
  static _NULL_SCOPE_METADATA = new Ee(0, 0);
  _getBasicScopeAttributes = new Dt((e) => {
    const n = this._scopeToLanguage(e), r = this._toStandardTokenType(e);
    return new Ee(n, r);
  });
  /**
   * Given a produced TM scope, return the language that token describes or null if unknown.
   * e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
   */
  _scopeToLanguage(e) {
    return this._embeddedLanguagesMatcher.match(e) || 0;
  }
  _toStandardTokenType(e) {
    const n = e.match(Ue.STANDARD_TOKEN_TYPE_REGEXP);
    if (!n)
      return 8;
    switch (n[1]) {
      case "comment":
        return 1;
      case "string":
        return 2;
      case "regex":
        return 3;
      case "meta.embedded":
        return 0;
    }
    throw new Error("Unexpected match for standard token type!");
  }
  static STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/;
}, Qn = class {
  values;
  scopesRegExp;
  constructor(t) {
    if (t.length === 0)
      this.values = null, this.scopesRegExp = null;
    else {
      this.values = new Map(t);
      const e = t.map(
        ([n, r]) => Bt(n)
      );
      e.sort(), e.reverse(), this.scopesRegExp = new RegExp(
        `^((${e.join(")|(")}))($|\\.)`,
        ""
      );
    }
  }
  match(t) {
    if (!this.scopesRegExp)
      return;
    const e = t.match(this.scopesRegExp);
    if (e)
      return this.values.get(e[1]);
  }
};
typeof process < "u" && process.env.VSCODE_TEXTMATE_DEBUG;
var ft = class {
  constructor(t, e) {
    this.stack = t, this.stoppedEarly = e;
  }
};
function zt(t, e, n, r, i, o, s, l) {
  const a = e.content.length;
  let c = !1, u = -1;
  if (s) {
    const p = Zn(
      t,
      e,
      n,
      r,
      i,
      o
    );
    i = p.stack, r = p.linePos, n = p.isFirstLine, u = p.anchorPosition;
  }
  const m = Date.now();
  for (; !c; ) {
    if (l !== 0 && Date.now() - m > l)
      return new ft(i, !0);
    d();
  }
  return new ft(i, !1);
  function d() {
    const p = er(
      t,
      e,
      n,
      r,
      i,
      u
    );
    if (!p) {
      o.produce(i, a), c = !0;
      return;
    }
    const h = p.captureIndices, b = p.matchedRuleId, S = h && h.length > 0 ? h[0].end > r : !1;
    if (b === Kn) {
      const y = i.getRule(t);
      o.produce(i, h[0].start), i = i.withContentNameScopesList(i.nameScopesList), Q(
        t,
        e,
        n,
        i,
        o,
        y.endCaptures,
        h
      ), o.produce(i, h[0].end);
      const _ = i;
      if (i = i.parent, u = _.getAnchorPos(), !S && _.getEnterPos() === r) {
        i = _, o.produce(i, a), c = !0;
        return;
      }
    } else {
      const y = t.getRule(b);
      o.produce(i, h[0].start);
      const _ = i, g = y.getName(e.content, h), w = i.contentNameScopesList.pushAttributed(
        g,
        t
      );
      if (i = i.push(
        b,
        r,
        u,
        h[0].end === a,
        null,
        w,
        w
      ), y instanceof Fe) {
        const v = y;
        Q(
          t,
          e,
          n,
          i,
          o,
          v.beginCaptures,
          h
        ), o.produce(i, h[0].end), u = h[0].end;
        const I = v.getContentName(
          e.content,
          h
        ), $ = w.pushAttributed(
          I,
          t
        );
        if (i = i.withContentNameScopesList($), v.endHasBackReferences && (i = i.withEndRule(
          v.getEndWithResolvedBackReferences(
            e.content,
            h
          )
        )), !S && _.hasSameRuleAs(i)) {
          i = i.pop(), o.produce(i, a), c = !0;
          return;
        }
      } else if (y instanceof be) {
        const v = y;
        Q(
          t,
          e,
          n,
          i,
          o,
          v.beginCaptures,
          h
        ), o.produce(i, h[0].end), u = h[0].end;
        const I = v.getContentName(
          e.content,
          h
        ), $ = w.pushAttributed(
          I,
          t
        );
        if (i = i.withContentNameScopesList($), v.whileHasBackReferences && (i = i.withEndRule(
          v.getWhileWithResolvedBackReferences(
            e.content,
            h
          )
        )), !S && _.hasSameRuleAs(i)) {
          i = i.pop(), o.produce(i, a), c = !0;
          return;
        }
      } else if (Q(
        t,
        e,
        n,
        i,
        o,
        y.captures,
        h
      ), o.produce(i, h[0].end), i = i.pop(), !S) {
        i = i.safePop(), o.produce(i, a), c = !0;
        return;
      }
    }
    h[0].end > r && (r = h[0].end, n = !1);
  }
}
function Zn(t, e, n, r, i, o) {
  let s = i.beginRuleCapturedEOL ? 0 : -1;
  const l = [];
  for (let a = i; a; a = a.pop()) {
    const c = a.getRule(t);
    c instanceof be && l.push({
      rule: c,
      stack: a
    });
  }
  for (let a = l.pop(); a; a = l.pop()) {
    const { ruleScanner: c, findOptions: u } = rr(a.rule, t, a.stack.endRule, n, r === s), m = c.findNextMatchSync(e, r, u);
    if (m) {
      if (m.ruleId !== Ut) {
        i = a.stack.pop();
        break;
      }
      m.captureIndices && m.captureIndices.length && (o.produce(a.stack, m.captureIndices[0].start), Q(t, e, n, a.stack, o, a.rule.whileCaptures, m.captureIndices), o.produce(a.stack, m.captureIndices[0].end), s = m.captureIndices[0].end, m.captureIndices[0].end > r && (r = m.captureIndices[0].end, n = !1));
    } else {
      i = a.stack.pop();
      break;
    }
  }
  return { stack: i, linePos: r, anchorPosition: s, isFirstLine: n };
}
function er(t, e, n, r, i, o) {
  const s = tr(t, e, n, r, i, o), l = t.getInjections();
  if (l.length === 0)
    return s;
  const a = nr(l, t, e, n, r, i, o);
  if (!a)
    return s;
  if (!s)
    return a;
  const c = s.captureIndices[0].start, u = a.captureIndices[0].start;
  return u < c || a.priorityMatch && u === c ? a : s;
}
function tr(t, e, n, r, i, o) {
  const s = i.getRule(t), { ruleScanner: l, findOptions: a } = qt(s, t, i.endRule, n, r === o), c = l.findNextMatchSync(e, r, a);
  return c ? {
    captureIndices: c.captureIndices,
    matchedRuleId: c.ruleId
  } : null;
}
function nr(t, e, n, r, i, o, s) {
  let l = Number.MAX_VALUE, a = null, c, u = 0;
  const m = o.contentNameScopesList.getScopeNames();
  for (let d = 0, p = t.length; d < p; d++) {
    const h = t[d];
    if (!h.matcher(m))
      continue;
    const b = e.getRule(h.ruleId), { ruleScanner: S, findOptions: y } = qt(b, e, null, r, i === s), _ = S.findNextMatchSync(n, i, y);
    if (!_)
      continue;
    const g = _.captureIndices[0].start;
    if (!(g >= l) && (l = g, a = _.captureIndices, c = _.ruleId, u = h.priority, l === i))
      break;
  }
  return a ? {
    priorityMatch: u === -1,
    captureIndices: a,
    matchedRuleId: c
  } : null;
}
function qt(t, e, n, r, i) {
  return {
    ruleScanner: t.compileAG(e, n, r, i),
    findOptions: 0
    /* None */
  };
}
function rr(t, e, n, r, i) {
  return {
    ruleScanner: t.compileWhileAG(e, n, r, i),
    findOptions: 0
    /* None */
  };
}
function Q(t, e, n, r, i, o, s) {
  if (o.length === 0)
    return;
  const l = e.content, a = Math.min(o.length, s.length), c = [], u = s[0].end;
  for (let m = 0; m < a; m++) {
    const d = o[m];
    if (d === null)
      continue;
    const p = s[m];
    if (p.length === 0)
      continue;
    if (p.start > u)
      break;
    for (; c.length > 0 && c[c.length - 1].endPos <= p.start; )
      i.produceFromScopes(c[c.length - 1].scopes, c[c.length - 1].endPos), c.pop();
    if (c.length > 0 ? i.produceFromScopes(c[c.length - 1].scopes, p.start) : i.produce(r, p.start), d.retokenizeCapturedWithRuleId) {
      const b = d.getName(l, s), S = r.contentNameScopesList.pushAttributed(b, t), y = d.getContentName(l, s), _ = S.pushAttributed(y, t), g = r.push(d.retokenizeCapturedWithRuleId, p.start, -1, !1, null, S, _), w = t.createOnigString(l.substring(0, p.end));
      zt(
        t,
        w,
        n && p.start === 0,
        p.start,
        g,
        i,
        !1,
        /* no time limit */
        0
      ), $t(w);
      continue;
    }
    const h = d.getName(l, s);
    if (h !== null) {
      const S = (c.length > 0 ? c[c.length - 1].scopes : r.contentNameScopesList).pushAttributed(h, t);
      c.push(new ir(S, p.end));
    }
  }
  for (; c.length > 0; )
    i.produceFromScopes(c[c.length - 1].scopes, c[c.length - 1].endPos), c.pop();
}
var ir = class {
  scopes;
  endPos;
  constructor(t, e) {
    this.scopes = t, this.endPos = e;
  }
};
function or(t, e, n, r, i, o, s, l) {
  return new ar(
    t,
    e,
    n,
    r,
    i,
    o,
    s,
    l
  );
}
function gt(t, e, n, r, i) {
  const o = ge(e, _e), s = Ht.getCompiledRuleId(n, r, i.repository);
  for (const l of o)
    t.push({
      debugSelector: e,
      matcher: l.matcher,
      ruleId: s,
      grammar: i,
      priority: l.priority
    });
}
function _e(t, e) {
  if (e.length < t.length)
    return !1;
  let n = 0;
  return t.every((r) => {
    for (let i = n; i < e.length; i++)
      if (sr(e[i], r))
        return n = i + 1, !0;
    return !1;
  });
}
function sr(t, e) {
  if (!t)
    return !1;
  if (t === e)
    return !0;
  const n = e.length;
  return t.length > n && t.substr(0, n) === e && t[n] === ".";
}
var ar = class {
  constructor(t, e, n, r, i, o, s, l) {
    if (this._rootScopeName = t, this.balancedBracketSelectors = o, this._onigLib = l, this._basicScopeAttributesProvider = new Xn(
      n,
      r
    ), this._rootId = -1, this._lastRuleId = 0, this._ruleId2desc = [null], this._includedGrammars = {}, this._grammarRepository = s, this._grammar = yt(e, null), this._injections = null, this._tokenTypeMatchers = [], i)
      for (const a of Object.keys(i)) {
        const c = ge(a, _e);
        for (const u of c)
          this._tokenTypeMatchers.push({
            matcher: u.matcher,
            type: i[a]
          });
      }
  }
  _rootId;
  _lastRuleId;
  _ruleId2desc;
  _includedGrammars;
  _grammarRepository;
  _grammar;
  _injections;
  _basicScopeAttributesProvider;
  _tokenTypeMatchers;
  get themeProvider() {
    return this._grammarRepository;
  }
  dispose() {
    for (const t of this._ruleId2desc)
      t && t.dispose();
  }
  createOnigScanner(t) {
    return this._onigLib.createOnigScanner(t);
  }
  createOnigString(t) {
    return this._onigLib.createOnigString(t);
  }
  getMetadataForScope(t) {
    return this._basicScopeAttributesProvider.getBasicScopeAttributes(t);
  }
  _collectInjections() {
    const t = {
      lookup: (i) => i === this._rootScopeName ? this._grammar : this.getExternalGrammar(i),
      injections: (i) => this._grammarRepository.injections(i)
    }, e = [], n = this._rootScopeName, r = t.lookup(n);
    if (r) {
      const i = r.injections;
      if (i)
        for (let s in i)
          gt(
            e,
            s,
            i[s],
            this,
            r
          );
      const o = this._grammarRepository.injections(n);
      o && o.forEach((s) => {
        const l = this.getExternalGrammar(s);
        if (l) {
          const a = l.injectionSelector;
          a && gt(
            e,
            a,
            l,
            this,
            l
          );
        }
      });
    }
    return e.sort((i, o) => i.priority - o.priority), e;
  }
  getInjections() {
    return this._injections === null && (this._injections = this._collectInjections()), this._injections;
  }
  registerRule(t) {
    const e = ++this._lastRuleId, n = t(e);
    return this._ruleId2desc[e] = n, n;
  }
  getRule(t) {
    return this._ruleId2desc[t];
  }
  getExternalGrammar(t, e) {
    if (this._includedGrammars[t])
      return this._includedGrammars[t];
    if (this._grammarRepository) {
      const n = this._grammarRepository.lookup(t);
      if (n)
        return this._includedGrammars[t] = yt(
          n,
          e && e.$base
        ), this._includedGrammars[t];
    }
  }
  tokenizeLine(t, e, n = 0) {
    const r = this._tokenize(t, e, !1, n);
    return {
      tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  tokenizeLine2(t, e, n = 0) {
    const r = this._tokenize(t, e, !0, n);
    return {
      tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  _tokenize(t, e, n, r) {
    this._rootId === -1 && (this._rootId = Ht.getCompiledRuleId(
      this._grammar.repository.$self,
      this,
      this._grammar.repository
    ), this.getInjections());
    let i;
    if (!e || e === He.NULL) {
      i = !0;
      const c = this._basicScopeAttributesProvider.getDefaultAttributes(), u = this.themeProvider.getDefaults(), m = K.set(
        0,
        c.languageId,
        c.tokenType,
        null,
        u.fontStyle,
        u.foregroundId,
        u.backgroundId
      ), d = this.getRule(this._rootId).getName(
        null,
        null
      );
      let p;
      d ? p = Z.createRootAndLookUpScopeName(
        d,
        m,
        this
      ) : p = Z.createRoot(
        "unknown",
        m
      ), e = new He(
        null,
        this._rootId,
        -1,
        -1,
        !1,
        null,
        p,
        p
      );
    } else
      i = !1, e.reset();
    t = t + `
`;
    const o = this.createOnigString(t), s = o.content.length, l = new cr(
      n,
      t,
      this._tokenTypeMatchers,
      this.balancedBracketSelectors
    ), a = zt(
      this,
      o,
      i,
      0,
      e,
      l,
      !0,
      r
    );
    return $t(o), {
      lineLength: s,
      lineTokens: l,
      ruleStack: a.stack,
      stoppedEarly: a.stoppedEarly
    };
  }
};
function yt(t, e) {
  return t = Rn(t), t.repository = t.repository || {}, t.repository.$self = {
    $vscodeTextmateLocation: t.$vscodeTextmateLocation,
    patterns: t.patterns,
    name: t.scopeName
  }, t.repository.$base = e || t.repository.$self, t;
}
var Z = class B {
  /**
   * Invariant:
   * ```
   * if (parent && !scopePath.extends(parent.scopePath)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(e, n, r) {
    this.parent = e, this.scopePath = n, this.tokenAttributes = r;
  }
  static fromExtension(e, n) {
    let r = e, i = e?.scopePath ?? null;
    for (const o of n)
      i = Pe.push(i, o.scopeNames), r = new B(r, i, o.encodedTokenAttributes);
    return r;
  }
  static createRoot(e, n) {
    return new B(null, new Pe(null, e), n);
  }
  static createRootAndLookUpScopeName(e, n, r) {
    const i = r.getMetadataForScope(e), o = new Pe(null, e), s = r.themeProvider.themeMatch(o), l = B.mergeAttributes(
      n,
      i,
      s
    );
    return new B(null, o, l);
  }
  get scopeName() {
    return this.scopePath.scopeName;
  }
  toString() {
    return this.getScopeNames().join(" ");
  }
  equals(e) {
    return B.equals(this, e);
  }
  static equals(e, n) {
    do {
      if (e === n || !e && !n)
        return !0;
      if (!e || !n || e.scopeName !== n.scopeName || e.tokenAttributes !== n.tokenAttributes)
        return !1;
      e = e.parent, n = n.parent;
    } while (!0);
  }
  static mergeAttributes(e, n, r) {
    let i = -1, o = 0, s = 0;
    return r !== null && (i = r.fontStyle, o = r.foregroundId, s = r.backgroundId), K.set(
      e,
      n.languageId,
      n.tokenType,
      null,
      i,
      o,
      s
    );
  }
  pushAttributed(e, n) {
    if (e === null)
      return this;
    if (e.indexOf(" ") === -1)
      return B._pushAttributed(this, e, n);
    const r = e.split(/ /g);
    let i = this;
    for (const o of r)
      i = B._pushAttributed(i, o, n);
    return i;
  }
  static _pushAttributed(e, n, r) {
    const i = r.getMetadataForScope(n), o = e.scopePath.push(n), s = r.themeProvider.themeMatch(o), l = B.mergeAttributes(
      e.tokenAttributes,
      i,
      s
    );
    return new B(e, o, l);
  }
  getScopeNames() {
    return this.scopePath.getSegments();
  }
  getExtensionIfDefined(e) {
    const n = [];
    let r = this;
    for (; r && r !== e; )
      n.push({
        encodedTokenAttributes: r.tokenAttributes,
        scopeNames: r.scopePath.getExtensionIfDefined(r.parent?.scopePath ?? null)
      }), r = r.parent;
    return r === e ? n.reverse() : void 0;
  }
}, He = class F {
  /**
   * Invariant:
   * ```
   * if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
   * 	throw new Error();
   * }
   * if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(e, n, r, i, o, s, l, a) {
    this.parent = e, this.ruleId = n, this.beginRuleCapturedEOL = o, this.endRule = s, this.nameScopesList = l, this.contentNameScopesList = a, this.depth = this.parent ? this.parent.depth + 1 : 1, this._enterPos = r, this._anchorPos = i;
  }
  _stackElementBrand = void 0;
  // TODO remove me
  static NULL = new F(
    null,
    0,
    0,
    0,
    !1,
    null,
    null,
    null
  );
  /**
   * The position on the current line where this state was pushed.
   * This is relevant only while tokenizing a line, to detect endless loops.
   * Its value is meaningless across lines.
   */
  _enterPos;
  /**
   * The captured anchor position when this stack element was pushed.
   * This is relevant only while tokenizing a line, to restore the anchor position when popping.
   * Its value is meaningless across lines.
   */
  _anchorPos;
  /**
   * The depth of the stack.
   */
  depth;
  equals(e) {
    return e === null ? !1 : F._equals(this, e);
  }
  static _equals(e, n) {
    return e === n ? !0 : this._structuralEquals(e, n) ? Z.equals(e.contentNameScopesList, n.contentNameScopesList) : !1;
  }
  /**
   * A structural equals check. Does not take into account `scopes`.
   */
  static _structuralEquals(e, n) {
    do {
      if (e === n || !e && !n)
        return !0;
      if (!e || !n || e.depth !== n.depth || e.ruleId !== n.ruleId || e.endRule !== n.endRule)
        return !1;
      e = e.parent, n = n.parent;
    } while (!0);
  }
  clone() {
    return this;
  }
  static _reset(e) {
    for (; e; )
      e._enterPos = -1, e._anchorPos = -1, e = e.parent;
  }
  reset() {
    F._reset(this);
  }
  pop() {
    return this.parent;
  }
  safePop() {
    return this.parent ? this.parent : this;
  }
  push(e, n, r, i, o, s, l) {
    return new F(
      this,
      e,
      n,
      r,
      i,
      o,
      s,
      l
    );
  }
  getEnterPos() {
    return this._enterPos;
  }
  getAnchorPos() {
    return this._anchorPos;
  }
  getRule(e) {
    return e.getRule(this.ruleId);
  }
  toString() {
    const e = [];
    return this._writeString(e, 0), "[" + e.join(",") + "]";
  }
  _writeString(e, n) {
    return this.parent && (n = this.parent._writeString(e, n)), e[n++] = `(${this.ruleId}, ${this.nameScopesList?.toString()}, ${this.contentNameScopesList?.toString()})`, n;
  }
  withContentNameScopesList(e) {
    return this.contentNameScopesList === e ? this : this.parent.push(
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      this.endRule,
      this.nameScopesList,
      e
    );
  }
  withEndRule(e) {
    return this.endRule === e ? this : new F(
      this.parent,
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      e,
      this.nameScopesList,
      this.contentNameScopesList
    );
  }
  // Used to warn of endless loops
  hasSameRuleAs(e) {
    let n = this;
    for (; n && n._enterPos === e._enterPos; ) {
      if (n.ruleId === e.ruleId)
        return !0;
      n = n.parent;
    }
    return !1;
  }
  toStateStackFrame() {
    return {
      ruleId: this.ruleId,
      beginRuleCapturedEOL: this.beginRuleCapturedEOL,
      endRule: this.endRule,
      nameScopesList: this.nameScopesList?.getExtensionIfDefined(this.parent?.nameScopesList ?? null) ?? [],
      contentNameScopesList: this.contentNameScopesList?.getExtensionIfDefined(this.nameScopesList) ?? []
    };
  }
  static pushFrame(e, n) {
    const r = Z.fromExtension(e?.nameScopesList ?? null, n.nameScopesList);
    return new F(
      e,
      n.ruleId,
      n.enterPos ?? -1,
      n.anchorPos ?? -1,
      n.beginRuleCapturedEOL,
      n.endRule,
      r,
      Z.fromExtension(r, n.contentNameScopesList)
    );
  }
}, lr = class {
  balancedBracketScopes;
  unbalancedBracketScopes;
  allowAny = !1;
  constructor(t, e) {
    this.balancedBracketScopes = t.flatMap(
      (n) => n === "*" ? (this.allowAny = !0, []) : ge(n, _e).map((r) => r.matcher)
    ), this.unbalancedBracketScopes = e.flatMap(
      (n) => ge(n, _e).map((r) => r.matcher)
    );
  }
  get matchesAlways() {
    return this.allowAny && this.unbalancedBracketScopes.length === 0;
  }
  get matchesNever() {
    return this.balancedBracketScopes.length === 0 && !this.allowAny;
  }
  match(t) {
    for (const e of this.unbalancedBracketScopes)
      if (e(t))
        return !1;
    for (const e of this.balancedBracketScopes)
      if (e(t))
        return !0;
    return this.allowAny;
  }
}, cr = class {
  constructor(t, e, n, r) {
    this.balancedBracketSelectors = r, this._emitBinaryTokens = t, this._tokenTypeOverrides = n, this._lineText = null, this._tokens = [], this._binaryTokens = [], this._lastTokenEndIndex = 0;
  }
  _emitBinaryTokens;
  /**
   * defined only if `false`.
   */
  _lineText;
  /**
   * used only if `_emitBinaryTokens` is false.
   */
  _tokens;
  /**
   * used only if `_emitBinaryTokens` is true.
   */
  _binaryTokens;
  _lastTokenEndIndex;
  _tokenTypeOverrides;
  produce(t, e) {
    this.produceFromScopes(t.contentNameScopesList, e);
  }
  produceFromScopes(t, e) {
    if (this._lastTokenEndIndex >= e)
      return;
    if (this._emitBinaryTokens) {
      let r = t?.tokenAttributes ?? 0, i = !1;
      if (this.balancedBracketSelectors?.matchesAlways && (i = !0), this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
        const o = t?.getScopeNames() ?? [];
        for (const s of this._tokenTypeOverrides)
          s.matcher(o) && (r = K.set(
            r,
            0,
            s.type,
            null,
            -1,
            0,
            0
          ));
        this.balancedBracketSelectors && (i = this.balancedBracketSelectors.match(o));
      }
      if (i && (r = K.set(
        r,
        0,
        8,
        i,
        -1,
        0,
        0
      )), this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === r) {
        this._lastTokenEndIndex = e;
        return;
      }
      this._binaryTokens.push(this._lastTokenEndIndex), this._binaryTokens.push(r), this._lastTokenEndIndex = e;
      return;
    }
    const n = t?.getScopeNames() ?? [];
    this._tokens.push({
      startIndex: this._lastTokenEndIndex,
      endIndex: e,
      // value: lineText.substring(lastTokenEndIndex, endIndex),
      scopes: n
    }), this._lastTokenEndIndex = e;
  }
  getResult(t, e) {
    return this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === e - 1 && this._tokens.pop(), this._tokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(t, e), this._tokens[this._tokens.length - 1].startIndex = 0), this._tokens;
  }
  getBinaryResult(t, e) {
    this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === e - 1 && (this._binaryTokens.pop(), this._binaryTokens.pop()), this._binaryTokens.length === 0 && (this._lastTokenEndIndex = -1, this.produce(t, e), this._binaryTokens[this._binaryTokens.length - 2] = 0);
    const n = new Uint32Array(this._binaryTokens.length);
    for (let r = 0, i = this._binaryTokens.length; r < i; r++)
      n[r] = this._binaryTokens[r];
    return n;
  }
}, ur = class {
  constructor(t, e) {
    this._onigLib = e, this._theme = t;
  }
  _grammars = /* @__PURE__ */ new Map();
  _rawGrammars = /* @__PURE__ */ new Map();
  _injectionGrammars = /* @__PURE__ */ new Map();
  _theme;
  dispose() {
    for (const t of this._grammars.values())
      t.dispose();
  }
  setTheme(t) {
    this._theme = t;
  }
  getColorMap() {
    return this._theme.getColorMap();
  }
  /**
   * Add `grammar` to registry and return a list of referenced scope names
   */
  addGrammar(t, e) {
    this._rawGrammars.set(t.scopeName, t), e && this._injectionGrammars.set(t.scopeName, e);
  }
  /**
   * Lookup a raw grammar.
   */
  lookup(t) {
    return this._rawGrammars.get(t);
  }
  /**
   * Returns the injections for the given grammar
   */
  injections(t) {
    return this._injectionGrammars.get(t);
  }
  /**
   * Get the default theme settings
   */
  getDefaults() {
    return this._theme.getDefaults();
  }
  /**
   * Match a scope in the theme.
   */
  themeMatch(t) {
    return this._theme.match(t);
  }
  /**
   * Lookup a grammar.
   */
  grammarForScopeName(t, e, n, r, i) {
    if (!this._grammars.has(t)) {
      let o = this._rawGrammars.get(t);
      if (!o)
        return null;
      this._grammars.set(t, or(
        t,
        o,
        e,
        n,
        r,
        i,
        this,
        this._onigLib
      ));
    }
    return this._grammars.get(t);
  }
}, mr = class {
  _options;
  _syncRegistry;
  _ensureGrammarCache;
  constructor(e) {
    this._options = e, this._syncRegistry = new ur(
      fe.createFromRawTheme(e.theme, e.colorMap),
      e.onigLib
    ), this._ensureGrammarCache = /* @__PURE__ */ new Map();
  }
  dispose() {
    this._syncRegistry.dispose();
  }
  /**
   * Change the theme. Once called, no previous `ruleStack` should be used anymore.
   */
  setTheme(e, n) {
    this._syncRegistry.setTheme(fe.createFromRawTheme(e, n));
  }
  /**
   * Returns a lookup array for color ids.
   */
  getColorMap() {
    return this._syncRegistry.getColorMap();
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithEmbeddedLanguages(e, n, r) {
    return this.loadGrammarWithConfiguration(e, n, { embeddedLanguages: r });
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithConfiguration(e, n, r) {
    return this._loadGrammar(
      e,
      n,
      r.embeddedLanguages,
      r.tokenTypes,
      new lr(
        r.balancedBracketSelectors || [],
        r.unbalancedBracketSelectors || []
      )
    );
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   */
  loadGrammar(e) {
    return this._loadGrammar(e, 0, null, null, null);
  }
  _loadGrammar(e, n, r, i, o) {
    const s = new $n(this._syncRegistry, e);
    for (; s.Q.length > 0; )
      s.Q.map((l) => this._loadSingleGrammar(l.scopeName)), s.processQueue();
    return this._grammarForScopeName(
      e,
      n,
      r,
      i,
      o
    );
  }
  _loadSingleGrammar(e) {
    this._ensureGrammarCache.has(e) || (this._doLoadSingleGrammar(e), this._ensureGrammarCache.set(e, !0));
  }
  _doLoadSingleGrammar(e) {
    const n = this._options.loadGrammar(e);
    if (n) {
      const r = typeof this._options.getInjections == "function" ? this._options.getInjections(e) : void 0;
      this._syncRegistry.addGrammar(n, r);
    }
  }
  /**
   * Adds a rawGrammar.
   */
  addGrammar(e, n = [], r = 0, i = null) {
    return this._syncRegistry.addGrammar(e, n), this._grammarForScopeName(e.scopeName, r, i);
  }
  /**
   * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
   */
  _grammarForScopeName(e, n = 0, r = null, i = null, o = null) {
    return this._syncRegistry.grammarForScopeName(
      e,
      n,
      r,
      i,
      o
    );
  }
}, We = He.NULL;
const pr = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
class ae {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(e, n, r) {
    this.normal = n, this.property = e, r && (this.space = r);
  }
}
ae.prototype.normal = {};
ae.prototype.property = {};
ae.prototype.space = void 0;
function Vt(t, e) {
  const n = {}, r = {};
  for (const i of t)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new ae(n, r, e);
}
function ze(t) {
  return t.toLowerCase();
}
class E {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(e, n) {
    this.attribute = n, this.property = e;
  }
}
E.prototype.attribute = "";
E.prototype.booleanish = !1;
E.prototype.boolean = !1;
E.prototype.commaOrSpaceSeparated = !1;
E.prototype.commaSeparated = !1;
E.prototype.defined = !1;
E.prototype.mustUseProperty = !1;
E.prototype.number = !1;
E.prototype.overloadedBoolean = !1;
E.prototype.property = "";
E.prototype.spaceSeparated = !1;
E.prototype.space = void 0;
let hr = 0;
const k = H(), T = H(), qe = H(), f = H(), C = H(), q = H(), O = H();
function H() {
  return 2 ** ++hr;
}
const Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: k,
  booleanish: T,
  commaOrSpaceSeparated: O,
  commaSeparated: q,
  number: f,
  overloadedBoolean: qe,
  spaceSeparated: C
}, Symbol.toStringTag, { value: "Module" })), Ie = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Ve)
);
class Xe extends E {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(e, n, r, i) {
    let o = -1;
    if (super(e, n), bt(this, "space", i), typeof r == "number")
      for (; ++o < Ie.length; ) {
        const s = Ie[o];
        bt(this, Ie[o], (r & Ve[s]) === Ve[s]);
      }
  }
}
Xe.prototype.defined = !0;
function bt(t, e, n) {
  n && (t[e] = n);
}
function J(t) {
  const e = {}, n = {};
  for (const [r, i] of Object.entries(t.properties)) {
    const o = new Xe(
      r,
      t.transform(t.attributes || {}, r),
      i,
      t.space
    );
    t.mustUseProperty && t.mustUseProperty.includes(r) && (o.mustUseProperty = !0), e[r] = o, n[ze(r)] = r, n[ze(o.attribute)] = r;
  }
  return new ae(e, n, t.space);
}
const Kt = J({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: T,
    ariaAutoComplete: null,
    ariaBusy: T,
    ariaChecked: T,
    ariaColCount: f,
    ariaColIndex: f,
    ariaColSpan: f,
    ariaControls: C,
    ariaCurrent: null,
    ariaDescribedBy: C,
    ariaDetails: null,
    ariaDisabled: T,
    ariaDropEffect: C,
    ariaErrorMessage: null,
    ariaExpanded: T,
    ariaFlowTo: C,
    ariaGrabbed: T,
    ariaHasPopup: null,
    ariaHidden: T,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: C,
    ariaLevel: f,
    ariaLive: null,
    ariaModal: T,
    ariaMultiLine: T,
    ariaMultiSelectable: T,
    ariaOrientation: null,
    ariaOwns: C,
    ariaPlaceholder: null,
    ariaPosInSet: f,
    ariaPressed: T,
    ariaReadOnly: T,
    ariaRelevant: null,
    ariaRequired: T,
    ariaRoleDescription: C,
    ariaRowCount: f,
    ariaRowIndex: f,
    ariaRowSpan: f,
    ariaSelected: T,
    ariaSetSize: f,
    ariaSort: null,
    ariaValueMax: f,
    ariaValueMin: f,
    ariaValueNow: f,
    ariaValueText: null,
    role: null
  },
  transform(t, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  }
});
function Jt(t, e) {
  return e in t ? t[e] : e;
}
function Yt(t, e) {
  return Jt(t, e.toLowerCase());
}
const dr = J({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: q,
    acceptCharset: C,
    accessKey: C,
    action: null,
    allow: null,
    allowFullScreen: k,
    allowPaymentRequest: k,
    allowUserMedia: k,
    alt: null,
    as: null,
    async: k,
    autoCapitalize: null,
    autoComplete: C,
    autoFocus: k,
    autoPlay: k,
    blocking: C,
    capture: null,
    charSet: null,
    checked: k,
    cite: null,
    className: C,
    cols: f,
    colSpan: null,
    content: null,
    contentEditable: T,
    controls: k,
    controlsList: C,
    coords: f | q,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: k,
    defer: k,
    dir: null,
    dirName: null,
    disabled: k,
    download: qe,
    draggable: T,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: k,
    formTarget: null,
    headers: C,
    height: f,
    hidden: qe,
    high: f,
    href: null,
    hrefLang: null,
    htmlFor: C,
    httpEquiv: C,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: k,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: k,
    itemId: null,
    itemProp: C,
    itemRef: C,
    itemScope: k,
    itemType: C,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: k,
    low: f,
    manifest: null,
    max: null,
    maxLength: f,
    media: null,
    method: null,
    min: null,
    minLength: f,
    multiple: k,
    muted: k,
    name: null,
    nonce: null,
    noModule: k,
    noValidate: k,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: k,
    optimum: f,
    pattern: null,
    ping: C,
    placeholder: null,
    playsInline: k,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: k,
    referrerPolicy: null,
    rel: C,
    required: k,
    reversed: k,
    rows: f,
    rowSpan: f,
    sandbox: C,
    scope: null,
    scoped: k,
    seamless: k,
    selected: k,
    shadowRootClonable: k,
    shadowRootDelegatesFocus: k,
    shadowRootMode: null,
    shape: null,
    size: f,
    sizes: null,
    slot: null,
    span: f,
    spellCheck: T,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: f,
    step: null,
    style: null,
    tabIndex: f,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: k,
    useMap: null,
    value: T,
    width: f,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: C,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: f,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: f,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: k,
    // Lists. Use CSS to reduce space between items instead
    declare: k,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: f,
    // `<img>` and `<object>`
    leftMargin: f,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: f,
    // `<body>`
    marginWidth: f,
    // `<body>`
    noResize: k,
    // `<frame>`
    noHref: k,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: k,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: k,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: f,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: T,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: f,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: f,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: k,
    disableRemotePlayback: k,
    prefix: null,
    property: null,
    results: f,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Yt
}), fr = J({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: O,
    accentHeight: f,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: f,
    amplitude: f,
    arabicForm: null,
    ascent: f,
    attributeName: null,
    attributeType: null,
    azimuth: f,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: f,
    by: null,
    calcMode: null,
    capHeight: f,
    className: C,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: f,
    diffuseConstant: f,
    direction: null,
    display: null,
    dur: null,
    divisor: f,
    dominantBaseline: null,
    download: k,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: f,
    enableBackground: null,
    end: null,
    event: null,
    exponent: f,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: f,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: q,
    g2: q,
    glyphName: q,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: f,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: f,
    horizOriginX: f,
    horizOriginY: f,
    id: null,
    ideographic: f,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: f,
    k: f,
    k1: f,
    k2: f,
    k3: f,
    k4: f,
    kernelMatrix: O,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: f,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: f,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: f,
    overlineThickness: f,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: f,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: C,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: f,
    pointsAtY: f,
    pointsAtZ: f,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: O,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: O,
    rev: O,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: O,
    requiredFeatures: O,
    requiredFonts: O,
    requiredFormats: O,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: f,
    specularExponent: f,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: f,
    strikethroughThickness: f,
    string: null,
    stroke: null,
    strokeDashArray: O,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: f,
    strokeOpacity: f,
    strokeWidth: null,
    style: null,
    surfaceScale: f,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: O,
    tabIndex: f,
    tableValues: null,
    target: null,
    targetX: f,
    targetY: f,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: O,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: f,
    underlineThickness: f,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: f,
    values: null,
    vAlphabetic: f,
    vMathematical: f,
    vectorEffect: null,
    vHanging: f,
    vIdeographic: f,
    version: null,
    vertAdvY: f,
    vertOriginX: f,
    vertOriginY: f,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: f,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Jt
}), Xt = J({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(t, e) {
    return "xlink:" + e.slice(5).toLowerCase();
  }
}), Qt = J({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Yt
}), Zt = J({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(t, e) {
    return "xml:" + e.slice(3).toLowerCase();
  }
}), gr = /[A-Z]/g, _t = /-[a-z]/g, yr = /^data[-\w.:]+$/i;
function br(t, e) {
  const n = ze(e);
  let r = e, i = E;
  if (n in t.normal)
    return t.property[t.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && yr.test(e)) {
    if (e.charAt(4) === "-") {
      const o = e.slice(5).replace(_t, Sr);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = e.slice(4);
      if (!_t.test(o)) {
        let s = o.replace(gr, _r);
        s.charAt(0) !== "-" && (s = "-" + s), e = "data" + s;
      }
    }
    i = Xe;
  }
  return new i(r, e);
}
function _r(t) {
  return "-" + t.toLowerCase();
}
function Sr(t) {
  return t.charAt(1).toUpperCase();
}
const kr = Vt([Kt, dr, Xt, Qt, Zt], "html"), en = Vt([Kt, fr, Xt, Qt, Zt], "svg"), St = {}.hasOwnProperty;
function wr(t, e) {
  const n = e || {};
  function r(i, ...o) {
    let s = r.invalid;
    const l = r.handlers;
    if (i && St.call(i, t)) {
      const a = String(i[t]);
      s = St.call(l, a) ? l[a] : r.unknown;
    }
    if (s)
      return s.call(this, i, ...o);
  }
  return r.handlers = n.handlers || {}, r.invalid = n.invalid, r.unknown = n.unknown, r;
}
const Cr = /["&'<>`]/g, vr = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Tr = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
), Rr = /[|\\{}()[\]^$+*?.]/g, kt = /* @__PURE__ */ new WeakMap();
function Lr(t, e) {
  if (t = t.replace(
    e.subset ? Nr(e.subset) : Cr,
    r
  ), e.subset || e.escapeOnly)
    return t;
  return t.replace(vr, n).replace(Tr, r);
  function n(i, o, s) {
    return e.format(
      (i.charCodeAt(0) - 55296) * 1024 + i.charCodeAt(1) - 56320 + 65536,
      s.charCodeAt(o + 2),
      e
    );
  }
  function r(i, o, s) {
    return e.format(
      i.charCodeAt(0),
      s.charCodeAt(o + 1),
      e
    );
  }
}
function Nr(t) {
  let e = kt.get(t);
  return e || (e = Ar(t), kt.set(t, e)), e;
}
function Ar(t) {
  const e = [];
  let n = -1;
  for (; ++n < t.length; )
    e.push(t[n].replace(Rr, "\\$&"));
  return new RegExp("(?:" + e.join("|") + ")", "g");
}
const xr = /[\dA-Fa-f]/;
function Pr(t, e, n) {
  const r = "&#x" + t.toString(16).toUpperCase();
  return n && e && !xr.test(String.fromCharCode(e)) ? r : r + ";";
}
const Er = /\d/;
function Ir(t, e, n) {
  const r = "&#" + String(t);
  return n && e && !Er.test(String.fromCharCode(e)) ? r : r + ";";
}
const Or = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
], Oe = {
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  fnof: "ƒ",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  bull: "•",
  hellip: "…",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",
  weierp: "℘",
  image: "ℑ",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  lsaquo: "‹",
  rsaquo: "›",
  euro: "€"
}, Mr = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
], tn = {}.hasOwnProperty, Ke = {};
let ce;
for (ce in Oe)
  tn.call(Oe, ce) && (Ke[Oe[ce]] = ce);
const Br = /[^\dA-Za-z]/;
function Dr(t, e, n, r) {
  const i = String.fromCharCode(t);
  if (tn.call(Ke, i)) {
    const o = Ke[i], s = "&" + o;
    return n && Or.includes(o) && !Mr.includes(o) && (!r || e && e !== 61 && Br.test(String.fromCharCode(e))) ? s : s + ";";
  }
  return "";
}
function Gr(t, e, n) {
  let r = Pr(t, e, n.omitOptionalSemicolons), i;
  if ((n.useNamedReferences || n.useShortestReferences) && (i = Dr(
    t,
    e,
    n.omitOptionalSemicolons,
    n.attribute
  )), (n.useShortestReferences || !i) && n.useShortestReferences) {
    const o = Ir(t, e, n.omitOptionalSemicolons);
    o.length < r.length && (r = o);
  }
  return i && (!n.useShortestReferences || i.length < r.length) ? i : r;
}
function V(t, e) {
  return Lr(t, Object.assign({ format: Gr }, e));
}
const jr = /^>|^->|<!--|-->|--!>|<!-$/g, $r = [">"], Fr = ["<", ">"];
function Ur(t, e, n, r) {
  return r.settings.bogusComments ? "<?" + V(
    t.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: $r
    })
  ) + ">" : "<!--" + t.value.replace(jr, i) + "-->";
  function i(o) {
    return V(
      o,
      Object.assign({}, r.settings.characterReferences, {
        subset: Fr
      })
    );
  }
}
function Hr(t, e, n, r) {
  return "<!" + (r.settings.upperDoctype ? "DOCTYPE" : "doctype") + (r.settings.tightDoctype ? "" : " ") + "html>";
}
function wt(t, e) {
  const n = String(t);
  if (typeof e != "string")
    throw new TypeError("Expected character");
  let r = 0, i = n.indexOf(e);
  for (; i !== -1; )
    r++, i = n.indexOf(e, i + e.length);
  return r;
}
function Wr(t, e) {
  const n = e || {};
  return (t[t.length - 1] === "" ? [...t, ""] : t).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
function zr(t) {
  return t.join(" ").trim();
}
const qr = /[ \t\n\f\r]/g;
function Qe(t) {
  return typeof t == "object" ? t.type === "text" ? Ct(t.value) : !1 : Ct(t);
}
function Ct(t) {
  return t.replace(qr, "") === "";
}
const N = rn(1), nn = rn(-1), Vr = [];
function rn(t) {
  return e;
  function e(n, r, i) {
    const o = n ? n.children : Vr;
    let s = (r || 0) + t, l = o[s];
    if (!i)
      for (; l && Qe(l); )
        s += t, l = o[s];
    return l;
  }
}
const Kr = {}.hasOwnProperty;
function on(t) {
  return e;
  function e(n, r, i) {
    return Kr.call(t, n.tagName) && t[n.tagName](n, r, i);
  }
}
const Ze = on({
  body: Yr,
  caption: Me,
  colgroup: Me,
  dd: ei,
  dt: Zr,
  head: Me,
  html: Jr,
  li: Qr,
  optgroup: ti,
  option: ni,
  p: Xr,
  rp: vt,
  rt: vt,
  tbody: ii,
  td: Tt,
  tfoot: oi,
  th: Tt,
  thead: ri,
  tr: si
});
function Me(t, e, n) {
  const r = N(n, e, !0);
  return !r || r.type !== "comment" && !(r.type === "text" && Qe(r.value.charAt(0)));
}
function Jr(t, e, n) {
  const r = N(n, e);
  return !r || r.type !== "comment";
}
function Yr(t, e, n) {
  const r = N(n, e);
  return !r || r.type !== "comment";
}
function Xr(t, e, n) {
  const r = N(n, e);
  return r ? r.type === "element" && (r.tagName === "address" || r.tagName === "article" || r.tagName === "aside" || r.tagName === "blockquote" || r.tagName === "details" || r.tagName === "div" || r.tagName === "dl" || r.tagName === "fieldset" || r.tagName === "figcaption" || r.tagName === "figure" || r.tagName === "footer" || r.tagName === "form" || r.tagName === "h1" || r.tagName === "h2" || r.tagName === "h3" || r.tagName === "h4" || r.tagName === "h5" || r.tagName === "h6" || r.tagName === "header" || r.tagName === "hgroup" || r.tagName === "hr" || r.tagName === "main" || r.tagName === "menu" || r.tagName === "nav" || r.tagName === "ol" || r.tagName === "p" || r.tagName === "pre" || r.tagName === "section" || r.tagName === "table" || r.tagName === "ul") : !n || // Confusing parent.
  !(n.type === "element" && (n.tagName === "a" || n.tagName === "audio" || n.tagName === "del" || n.tagName === "ins" || n.tagName === "map" || n.tagName === "noscript" || n.tagName === "video"));
}
function Qr(t, e, n) {
  const r = N(n, e);
  return !r || r.type === "element" && r.tagName === "li";
}
function Zr(t, e, n) {
  const r = N(n, e);
  return !!(r && r.type === "element" && (r.tagName === "dt" || r.tagName === "dd"));
}
function ei(t, e, n) {
  const r = N(n, e);
  return !r || r.type === "element" && (r.tagName === "dt" || r.tagName === "dd");
}
function vt(t, e, n) {
  const r = N(n, e);
  return !r || r.type === "element" && (r.tagName === "rp" || r.tagName === "rt");
}
function ti(t, e, n) {
  const r = N(n, e);
  return !r || r.type === "element" && r.tagName === "optgroup";
}
function ni(t, e, n) {
  const r = N(n, e);
  return !r || r.type === "element" && (r.tagName === "option" || r.tagName === "optgroup");
}
function ri(t, e, n) {
  const r = N(n, e);
  return !!(r && r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot"));
}
function ii(t, e, n) {
  const r = N(n, e);
  return !r || r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot");
}
function oi(t, e, n) {
  return !N(n, e);
}
function si(t, e, n) {
  const r = N(n, e);
  return !r || r.type === "element" && r.tagName === "tr";
}
function Tt(t, e, n) {
  const r = N(n, e);
  return !r || r.type === "element" && (r.tagName === "td" || r.tagName === "th");
}
const ai = on({
  body: ui,
  colgroup: mi,
  head: ci,
  html: li,
  tbody: pi
});
function li(t) {
  const e = N(t, -1);
  return !e || e.type !== "comment";
}
function ci(t) {
  const e = /* @__PURE__ */ new Set();
  for (const r of t.children)
    if (r.type === "element" && (r.tagName === "base" || r.tagName === "title")) {
      if (e.has(r.tagName)) return !1;
      e.add(r.tagName);
    }
  const n = t.children[0];
  return !n || n.type === "element";
}
function ui(t) {
  const e = N(t, -1, !0);
  return !e || e.type !== "comment" && !(e.type === "text" && Qe(e.value.charAt(0))) && !(e.type === "element" && (e.tagName === "meta" || e.tagName === "link" || e.tagName === "script" || e.tagName === "style" || e.tagName === "template"));
}
function mi(t, e, n) {
  const r = nn(n, e), i = N(t, -1, !0);
  return n && r && r.type === "element" && r.tagName === "colgroup" && Ze(r, n.children.indexOf(r), n) ? !1 : !!(i && i.type === "element" && i.tagName === "col");
}
function pi(t, e, n) {
  const r = nn(n, e), i = N(t, -1);
  return n && r && r.type === "element" && (r.tagName === "thead" || r.tagName === "tbody") && Ze(r, n.children.indexOf(r), n) ? !1 : !!(i && i.type === "element" && i.tagName === "tr");
}
const ue = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    [`	
\f\r &/=>`.split(""), `	
\f\r "&'/=>\``.split("")],
    [`\0	
\f\r "&'/<=>`.split(""), `\0	
\f\r "&'/<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    [`	
\f\r &>`.split(""), `\0	
\f\r "&'<=>\``.split("")],
    [`\0	
\f\r "&'<=>\``.split(""), `\0	
\f\r "&'<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function hi(t, e, n, r) {
  const i = r.schema, o = i.space === "svg" ? !1 : r.settings.omitOptionalTags;
  let s = i.space === "svg" ? r.settings.closeEmptyElements : r.settings.voids.includes(t.tagName.toLowerCase());
  const l = [];
  let a;
  i.space === "html" && t.tagName === "svg" && (r.schema = en);
  const c = di(r, t.properties), u = r.all(
    i.space === "html" && t.tagName === "template" ? t.content : t
  );
  return r.schema = i, u && (s = !1), (c || !o || !ai(t, e, n)) && (l.push("<", t.tagName, c ? " " + c : ""), s && (i.space === "svg" || r.settings.closeSelfClosing) && (a = c.charAt(c.length - 1), (!r.settings.tightSelfClosing || a === "/" || a && a !== '"' && a !== "'") && l.push(" "), l.push("/")), l.push(">")), l.push(u), !s && (!o || !Ze(t, e, n)) && l.push("</" + t.tagName + ">"), l.join("");
}
function di(t, e) {
  const n = [];
  let r = -1, i;
  if (e) {
    for (i in e)
      if (e[i] !== null && e[i] !== void 0) {
        const o = fi(t, i, e[i]);
        o && n.push(o);
      }
  }
  for (; ++r < n.length; ) {
    const o = t.settings.tightAttributes ? n[r].charAt(n[r].length - 1) : void 0;
    r !== n.length - 1 && o !== '"' && o !== "'" && (n[r] += " ");
  }
  return n.join("");
}
function fi(t, e, n) {
  const r = br(t.schema, e), i = t.settings.allowParseErrors && t.schema.space === "html" ? 0 : 1, o = t.settings.allowDangerousCharacters ? 0 : 1;
  let s = t.quote, l;
  if (r.overloadedBoolean && (n === r.attribute || n === "") ? n = !0 : (r.boolean || r.overloadedBoolean) && (typeof n != "string" || n === r.attribute || n === "") && (n = !!n), n == null || n === !1 || typeof n == "number" && Number.isNaN(n))
    return "";
  const a = V(
    r.attribute,
    Object.assign({}, t.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: ue.name[i][o]
    })
  );
  return n === !0 || (n = Array.isArray(n) ? (r.commaSeparated ? Wr : zr)(n, {
    padLeft: !t.settings.tightCommaSeparatedLists
  }) : String(n), t.settings.collapseEmptyAttributes && !n) ? a : (t.settings.preferUnquoted && (l = V(
    n,
    Object.assign({}, t.settings.characterReferences, {
      attribute: !0,
      subset: ue.unquoted[i][o]
    })
  )), l !== n && (t.settings.quoteSmart && wt(n, s) > wt(n, t.alternative) && (s = t.alternative), l = s + V(
    n,
    Object.assign({}, t.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: (s === "'" ? ue.single : ue.double)[i][o],
      attribute: !0
    })
  ) + s), a + (l && "=" + l));
}
const gi = ["<", "&"];
function sn(t, e, n, r) {
  return n && n.type === "element" && (n.tagName === "script" || n.tagName === "style") ? t.value : V(
    t.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: gi
    })
  );
}
function yi(t, e, n, r) {
  return r.settings.allowDangerousHtml ? t.value : sn(t, e, n, r);
}
function bi(t, e, n, r) {
  return r.all(t);
}
const _i = wr("type", {
  invalid: Si,
  unknown: ki,
  handlers: { comment: Ur, doctype: Hr, element: hi, raw: yi, root: bi, text: sn }
});
function Si(t) {
  throw new Error("Expected node, not `" + t + "`");
}
function ki(t) {
  const e = (
    /** @type {Nodes} */
    t
  );
  throw new Error("Cannot compile unknown node `" + e.type + "`");
}
const wi = {}, Ci = {}, vi = [];
function Ti(t, e) {
  const n = e || wi, r = n.quote || '"', i = r === '"' ? "'" : '"';
  if (r !== '"' && r !== "'")
    throw new Error("Invalid quote `" + r + "`, expected `'` or `\"`");
  return {
    one: Ri,
    all: Li,
    settings: {
      omitOptionalTags: n.omitOptionalTags || !1,
      allowParseErrors: n.allowParseErrors || !1,
      allowDangerousCharacters: n.allowDangerousCharacters || !1,
      quoteSmart: n.quoteSmart || !1,
      preferUnquoted: n.preferUnquoted || !1,
      tightAttributes: n.tightAttributes || !1,
      upperDoctype: n.upperDoctype || !1,
      tightDoctype: n.tightDoctype || !1,
      bogusComments: n.bogusComments || !1,
      tightCommaSeparatedLists: n.tightCommaSeparatedLists || !1,
      tightSelfClosing: n.tightSelfClosing || !1,
      collapseEmptyAttributes: n.collapseEmptyAttributes || !1,
      allowDangerousHtml: n.allowDangerousHtml || !1,
      voids: n.voids || pr,
      characterReferences: n.characterReferences || Ci,
      closeSelfClosing: n.closeSelfClosing || !1,
      closeEmptyElements: n.closeEmptyElements || !1
    },
    schema: n.space === "svg" ? en : kr,
    quote: r,
    alternative: i
  }.one(
    Array.isArray(t) ? { type: "root", children: t } : t,
    void 0,
    void 0
  );
}
function Ri(t, e, n) {
  return _i(t, e, n, this);
}
function Li(t) {
  const e = [], n = t && t.children || vi;
  let r = -1;
  for (; ++r < n.length; )
    e[r] = this.one(n[r], r, t);
  return e.join("");
}
function Se(t, e) {
  const n = typeof t == "string" ? {} : { ...t.colorReplacements }, r = typeof t == "string" ? t : t.name;
  for (const [i, o] of Object.entries(e?.colorReplacements || {}))
    typeof o == "string" ? n[i] = o : i === r && Object.assign(n, o);
  return n;
}
function j(t, e) {
  return t && (e?.[t?.toLowerCase()] || t);
}
function Ni(t) {
  return Array.isArray(t) ? t : [t];
}
async function an(t) {
  return Promise.resolve(typeof t == "function" ? t() : t).then((e) => e.default || e);
}
function et(t) {
  return !t || ["plaintext", "txt", "text", "plain"].includes(t);
}
function ln(t) {
  return t === "ansi" || et(t);
}
function tt(t) {
  return t === "none";
}
function cn(t) {
  return tt(t);
}
function un(t, e) {
  if (!e)
    return t;
  t.properties ||= {}, t.properties.class ||= [], typeof t.properties.class == "string" && (t.properties.class = t.properties.class.split(/\s+/g)), Array.isArray(t.properties.class) || (t.properties.class = []);
  const n = Array.isArray(e) ? e : e.split(/\s+/g);
  for (const r of n)
    r && !t.properties.class.includes(r) && t.properties.class.push(r);
  return t;
}
function Ce(t, e = !1) {
  if (t.length === 0)
    return [["", 0]];
  const n = t.split(/(\r?\n)/g);
  let r = 0;
  const i = [];
  for (let o = 0; o < n.length; o += 2) {
    const s = e ? n[o] + (n[o + 1] || "") : n[o];
    i.push([s, r]), r += n[o].length, r += n[o + 1]?.length || 0;
  }
  return i;
}
function Ai(t) {
  const e = Ce(t, !0).map(([i]) => i);
  function n(i) {
    if (i === t.length)
      return {
        line: e.length - 1,
        character: e[e.length - 1].length
      };
    let o = i, s = 0;
    for (const l of e) {
      if (o < l.length)
        break;
      o -= l.length, s++;
    }
    return { line: s, character: o };
  }
  function r(i, o) {
    let s = 0;
    for (let l = 0; l < i; l++)
      s += e[l].length;
    return s += o, s;
  }
  return {
    lines: e,
    indexToPos: n,
    posToIndex: r
  };
}
function xi(t, e, n) {
  const r = /* @__PURE__ */ new Set();
  for (const o of t.matchAll(/:?lang=["']([^"']+)["']/g)) {
    const s = o[1].toLowerCase().trim();
    s && r.add(s);
  }
  for (const o of t.matchAll(/(?:```|~~~)([\w-]+)/g)) {
    const s = o[1].toLowerCase().trim();
    s && r.add(s);
  }
  for (const o of t.matchAll(/\\begin\{([\w-]+)\}/g)) {
    const s = o[1].toLowerCase().trim();
    s && r.add(s);
  }
  for (const o of t.matchAll(/<script\s+(?:type|lang)=["']([^"']+)["']/gi)) {
    const s = o[1].toLowerCase().trim(), l = s.includes("/") ? s.split("/").pop() : s;
    l && r.add(l);
  }
  if (!n)
    return Array.from(r);
  const i = n.getBundledLanguages();
  return Array.from(r).filter((o) => o && i[o]);
}
const nt = "light-dark()", Pi = ["color", "background-color"];
function Ei(t, e) {
  let n = 0;
  const r = [];
  for (const i of e)
    i > n && r.push({
      ...t,
      content: t.content.slice(n, i),
      offset: t.offset + n
    }), n = i;
  return n < t.content.length && r.push({
    ...t,
    content: t.content.slice(n),
    offset: t.offset + n
  }), r;
}
function Ii(t, e) {
  const n = Array.from(e instanceof Set ? e : new Set(e)).sort((r, i) => r - i);
  return n.length ? t.map((r) => r.flatMap((i) => {
    const o = n.filter((s) => i.offset < s && s < i.offset + i.content.length).map((s) => s - i.offset).sort((s, l) => s - l);
    return o.length ? Ei(i, o) : i;
  })) : t;
}
function Oi(t, e, n, r, i = "css-vars") {
  const o = {
    content: t.content,
    explanation: t.explanation,
    offset: t.offset
  }, s = e.map((u) => ke(t.variants[u])), l = new Set(s.flatMap((u) => Object.keys(u))), a = {}, c = (u, m) => {
    const d = m === "color" ? "" : m === "background-color" ? "-bg" : `-${m}`;
    return n + e[u] + (m === "color" ? "" : d);
  };
  return s.forEach((u, m) => {
    for (const d of l) {
      const p = u[d] || "inherit";
      if (m === 0 && r && Pi.includes(d))
        if (r === nt && s.length > 1) {
          const h = e.findIndex((_) => _ === "light"), b = e.findIndex((_) => _ === "dark");
          if (h === -1 || b === -1)
            throw new R('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
          const S = s[h][d] || "inherit", y = s[b][d] || "inherit";
          a[d] = `light-dark(${S}, ${y})`, i === "css-vars" && (a[c(m, d)] = p);
        } else
          a[d] = p;
      else
        i === "css-vars" && (a[c(m, d)] = p);
    }
  }), o.htmlStyle = a, o;
}
function ke(t) {
  const e = {};
  if (t.color && (e.color = t.color), t.bgColor && (e["background-color"] = t.bgColor), t.fontStyle) {
    t.fontStyle & P.Italic && (e["font-style"] = "italic"), t.fontStyle & P.Bold && (e["font-weight"] = "bold");
    const n = [];
    t.fontStyle & P.Underline && n.push("underline"), t.fontStyle & P.Strikethrough && n.push("line-through"), n.length && (e["text-decoration"] = n.join(" "));
  }
  return e;
}
function Je(t) {
  return typeof t == "string" ? t : Object.entries(t).map(([e, n]) => `${e}:${n}`).join(";");
}
const mn = /* @__PURE__ */ new WeakMap();
function ve(t, e) {
  mn.set(t, e);
}
function re(t) {
  return mn.get(t);
}
class Y {
  /**
   * Theme to Stack mapping
   */
  _stacks = {};
  lang;
  get themes() {
    return Object.keys(this._stacks);
  }
  get theme() {
    return this.themes[0];
  }
  get _stack() {
    return this._stacks[this.theme];
  }
  /**
   * Static method to create a initial grammar state.
   */
  static initial(e, n) {
    return new Y(
      Object.fromEntries(Ni(n).map((r) => [r, We])),
      e
    );
  }
  constructor(...e) {
    if (e.length === 2) {
      const [n, r] = e;
      this.lang = r, this._stacks = n;
    } else {
      const [n, r, i] = e;
      this.lang = r, this._stacks = { [i]: n };
    }
  }
  /**
   * Get the internal stack object.
   * @internal
   */
  getInternalStack(e = this.theme) {
    return this._stacks[e];
  }
  getScopes(e = this.theme) {
    return Mi(this._stacks[e]);
  }
  toJSON() {
    return {
      lang: this.lang,
      theme: this.theme,
      themes: this.themes,
      scopes: this.getScopes()
    };
  }
}
function Mi(t) {
  const e = [], n = /* @__PURE__ */ new Set();
  function r(i) {
    if (n.has(i))
      return;
    n.add(i);
    const o = i?.nameScopesList?.scopeName;
    o && e.push(o), i.parent && r(i.parent);
  }
  return r(t), e;
}
function Bi(t, e) {
  if (!(t instanceof Y))
    throw new R("Invalid grammar state");
  return t.getInternalStack(e);
}
function Di() {
  const t = /* @__PURE__ */ new WeakMap();
  function e(n) {
    if (!t.has(n.meta)) {
      let r = function(s) {
        if (typeof s == "number") {
          if (s < 0 || s > n.source.length)
            throw new R(`Invalid decoration offset: ${s}. Code length: ${n.source.length}`);
          return {
            ...i.indexToPos(s),
            offset: s
          };
        } else {
          const l = i.lines[s.line];
          if (l === void 0)
            throw new R(`Invalid decoration position ${JSON.stringify(s)}. Lines length: ${i.lines.length}`);
          let a = s.character;
          if (a < 0 && (a = l.length + a), a < 0 || a > l.length)
            throw new R(`Invalid decoration position ${JSON.stringify(s)}. Line ${s.line} length: ${l.length}`);
          return {
            ...s,
            character: a,
            offset: i.posToIndex(s.line, a)
          };
        }
      };
      const i = Ai(n.source), o = (n.options.decorations || []).map((s) => ({
        ...s,
        start: r(s.start),
        end: r(s.end)
      }));
      Gi(o), t.set(n.meta, {
        decorations: o,
        converter: i,
        source: n.source
      });
    }
    return t.get(n.meta);
  }
  return {
    name: "shiki:decorations",
    tokens(n) {
      if (!this.options.decorations?.length)
        return;
      const i = e(this).decorations.flatMap((s) => [s.start.offset, s.end.offset]);
      return Ii(n, i);
    },
    code(n) {
      if (!this.options.decorations?.length)
        return;
      const r = e(this), i = Array.from(n.children).filter((u) => u.type === "element" && u.tagName === "span");
      if (i.length !== r.converter.lines.length)
        throw new R(`Number of lines in code element (${i.length}) does not match the number of lines in the source (${r.converter.lines.length}). Failed to apply decorations.`);
      function o(u, m, d, p) {
        const h = i[u];
        let b = "", S = -1, y = -1;
        if (m === 0 && (S = 0), d === 0 && (y = 0), d === Number.POSITIVE_INFINITY && (y = h.children.length), S === -1 || y === -1)
          for (let g = 0; g < h.children.length; g++)
            b += pn(h.children[g]), S === -1 && b.length === m && (S = g + 1), y === -1 && b.length === d && (y = g + 1);
        if (S === -1)
          throw new R(`Failed to find start index for decoration ${JSON.stringify(p.start)}`);
        if (y === -1)
          throw new R(`Failed to find end index for decoration ${JSON.stringify(p.end)}`);
        const _ = h.children.slice(S, y);
        if (!p.alwaysWrap && _.length === h.children.length)
          l(h, p, "line");
        else if (!p.alwaysWrap && _.length === 1 && _[0].type === "element")
          l(_[0], p, "token");
        else {
          const g = {
            type: "element",
            tagName: "span",
            properties: {},
            children: _
          };
          l(g, p, "wrapper"), h.children.splice(S, _.length, g);
        }
      }
      function s(u, m) {
        i[u] = l(i[u], m, "line");
      }
      function l(u, m, d) {
        const p = m.properties || {}, h = m.transform || ((b) => b);
        return u.tagName = m.tagName || "span", u.properties = {
          ...u.properties,
          ...p,
          class: u.properties.class
        }, m.properties?.class && un(u, m.properties.class), u = h(u, d) || u, u;
      }
      const a = [], c = r.decorations.sort((u, m) => m.start.offset - u.start.offset || u.end.offset - m.end.offset);
      for (const u of c) {
        const { start: m, end: d } = u;
        if (m.line === d.line)
          o(m.line, m.character, d.character, u);
        else if (m.line < d.line) {
          o(m.line, m.character, Number.POSITIVE_INFINITY, u);
          for (let p = m.line + 1; p < d.line; p++)
            a.unshift(() => s(p, u));
          o(d.line, 0, d.character, u);
        }
      }
      a.forEach((u) => u());
    }
  };
}
function Gi(t) {
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    if (n.start.offset > n.end.offset)
      throw new R(`Invalid decoration range: ${JSON.stringify(n.start)} - ${JSON.stringify(n.end)}`);
    for (let r = e + 1; r < t.length; r++) {
      const i = t[r], o = n.start.offset <= i.start.offset && i.start.offset < n.end.offset, s = n.start.offset < i.end.offset && i.end.offset <= n.end.offset, l = i.start.offset <= n.start.offset && n.start.offset < i.end.offset, a = i.start.offset < n.end.offset && n.end.offset <= i.end.offset;
      if (o || s || l || a) {
        if (o && s || l && a || l && n.start.offset === n.end.offset || s && i.start.offset === i.end.offset)
          continue;
        throw new R(`Decorations ${JSON.stringify(n.start)} and ${JSON.stringify(i.start)} intersect.`);
      }
    }
  }
}
function pn(t) {
  return t.type === "text" ? t.value : t.type === "element" ? t.children.map(pn).join("") : "";
}
const ji = [
  /* @__PURE__ */ Di()
];
function we(t) {
  const e = $i(t.transformers || []);
  return [
    ...e.pre,
    ...e.normal,
    ...e.post,
    ...ji
  ];
}
function $i(t) {
  const e = [], n = [], r = [];
  for (const i of t)
    switch (i.enforce) {
      case "pre":
        e.push(i);
        break;
      case "post":
        n.push(i);
        break;
      default:
        r.push(i);
    }
  return { pre: e, post: n, normal: r };
}
var U = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite"
], Be = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  8: "hidden",
  9: "strikethrough"
};
function Fi(t, e) {
  const n = t.indexOf("\x1B", e);
  if (n !== -1 && t[n + 1] === "[") {
    const r = t.indexOf("m", n);
    if (r !== -1)
      return {
        sequence: t.substring(n + 2, r).split(";"),
        startPosition: n,
        position: r + 1
      };
  }
  return {
    position: t.length
  };
}
function Rt(t) {
  const e = t.shift();
  if (e === "2") {
    const n = t.splice(0, 3).map((r) => Number.parseInt(r));
    return n.length !== 3 || n.some((r) => Number.isNaN(r)) ? void 0 : {
      type: "rgb",
      rgb: n
    };
  } else if (e === "5") {
    const n = t.shift();
    if (n)
      return { type: "table", index: Number(n) };
  }
}
function Ui(t) {
  const e = [];
  for (; t.length > 0; ) {
    const n = t.shift();
    if (!n)
      continue;
    const r = Number.parseInt(n);
    if (!Number.isNaN(r))
      if (r === 0)
        e.push({ type: "resetAll" });
      else if (r <= 9)
        Be[r] && e.push({
          type: "setDecoration",
          value: Be[r]
        });
      else if (r <= 29) {
        const i = Be[r - 20];
        i && (e.push({
          type: "resetDecoration",
          value: i
        }), i === "dim" && e.push({
          type: "resetDecoration",
          value: "bold"
        }));
      } else if (r <= 37)
        e.push({
          type: "setForegroundColor",
          value: { type: "named", name: U[r - 30] }
        });
      else if (r === 38) {
        const i = Rt(t);
        i && e.push({
          type: "setForegroundColor",
          value: i
        });
      } else if (r === 39)
        e.push({
          type: "resetForegroundColor"
        });
      else if (r <= 47)
        e.push({
          type: "setBackgroundColor",
          value: { type: "named", name: U[r - 40] }
        });
      else if (r === 48) {
        const i = Rt(t);
        i && e.push({
          type: "setBackgroundColor",
          value: i
        });
      } else r === 49 ? e.push({
        type: "resetBackgroundColor"
      }) : r === 53 ? e.push({
        type: "setDecoration",
        value: "overline"
      }) : r === 55 ? e.push({
        type: "resetDecoration",
        value: "overline"
      }) : r >= 90 && r <= 97 ? e.push({
        type: "setForegroundColor",
        value: { type: "named", name: U[r - 90 + 8] }
      }) : r >= 100 && r <= 107 && e.push({
        type: "setBackgroundColor",
        value: { type: "named", name: U[r - 100 + 8] }
      });
  }
  return e;
}
function Hi() {
  let t = null, e = null, n = /* @__PURE__ */ new Set();
  return {
    parse(r) {
      const i = [];
      let o = 0;
      do {
        const s = Fi(r, o), l = s.sequence ? r.substring(o, s.startPosition) : r.substring(o);
        if (l.length > 0 && i.push({
          value: l,
          foreground: t,
          background: e,
          decorations: new Set(n)
        }), s.sequence) {
          const a = Ui(s.sequence);
          for (const c of a)
            c.type === "resetAll" ? (t = null, e = null, n.clear()) : c.type === "resetForegroundColor" ? t = null : c.type === "resetBackgroundColor" ? e = null : c.type === "resetDecoration" && n.delete(c.value);
          for (const c of a)
            c.type === "setForegroundColor" ? t = c.value : c.type === "setBackgroundColor" ? e = c.value : c.type === "setDecoration" && n.add(c.value);
        }
        o = s.position;
      } while (o < r.length);
      return i;
    }
  };
}
var Wi = {
  black: "#000000",
  red: "#bb0000",
  green: "#00bb00",
  yellow: "#bbbb00",
  blue: "#0000bb",
  magenta: "#ff00ff",
  cyan: "#00bbbb",
  white: "#eeeeee",
  brightBlack: "#555555",
  brightRed: "#ff5555",
  brightGreen: "#00ff00",
  brightYellow: "#ffff55",
  brightBlue: "#5555ff",
  brightMagenta: "#ff55ff",
  brightCyan: "#55ffff",
  brightWhite: "#ffffff"
};
function zi(t = Wi) {
  function e(l) {
    return t[l];
  }
  function n(l) {
    return `#${l.map((a) => Math.max(0, Math.min(a, 255)).toString(16).padStart(2, "0")).join("")}`;
  }
  let r;
  function i() {
    if (r)
      return r;
    r = [];
    for (let c = 0; c < U.length; c++)
      r.push(e(U[c]));
    let l = [0, 95, 135, 175, 215, 255];
    for (let c = 0; c < 6; c++)
      for (let u = 0; u < 6; u++)
        for (let m = 0; m < 6; m++)
          r.push(n([l[c], l[u], l[m]]));
    let a = 8;
    for (let c = 0; c < 24; c++, a += 10)
      r.push(n([a, a, a]));
    return r;
  }
  function o(l) {
    return i()[l];
  }
  function s(l) {
    switch (l.type) {
      case "named":
        return e(l.name);
      case "rgb":
        return n(l.rgb);
      case "table":
        return o(l.index);
    }
  }
  return {
    value: s
  };
}
const qi = {
  black: "#000000",
  red: "#cd3131",
  green: "#0DBC79",
  yellow: "#E5E510",
  blue: "#2472C8",
  magenta: "#BC3FBC",
  cyan: "#11A8CD",
  white: "#E5E5E5",
  brightBlack: "#666666",
  brightRed: "#F14C4C",
  brightGreen: "#23D18B",
  brightYellow: "#F5F543",
  brightBlue: "#3B8EEA",
  brightMagenta: "#D670D6",
  brightCyan: "#29B8DB",
  brightWhite: "#FFFFFF"
};
function Vi(t, e, n) {
  const r = Se(t, n), i = Ce(e), o = Object.fromEntries(
    U.map((a) => {
      const c = `terminal.ansi${a[0].toUpperCase()}${a.substring(1)}`, u = t.colors?.[c];
      return [a, u || qi[a]];
    })
  ), s = zi(o), l = Hi();
  return i.map(
    (a) => l.parse(a[0]).map((c) => {
      let u, m;
      c.decorations.has("reverse") ? (u = c.background ? s.value(c.background) : t.bg, m = c.foreground ? s.value(c.foreground) : t.fg) : (u = c.foreground ? s.value(c.foreground) : t.fg, m = c.background ? s.value(c.background) : void 0), u = j(u, r), m = j(m, r), c.decorations.has("dim") && (u = Ki(u));
      let d = P.None;
      return c.decorations.has("bold") && (d |= P.Bold), c.decorations.has("italic") && (d |= P.Italic), c.decorations.has("underline") && (d |= P.Underline), c.decorations.has("strikethrough") && (d |= P.Strikethrough), {
        content: c.value,
        offset: a[1],
        // TODO: more accurate offset? might need to fork ansi-sequence-parser
        color: u,
        bgColor: m,
        fontStyle: d
      };
    })
  );
}
function Ki(t) {
  const e = t.match(/#([0-9a-f]{3,8})/i);
  if (e) {
    const r = e[1];
    if (r.length === 8) {
      const i = Math.round(Number.parseInt(r.slice(6, 8), 16) / 2).toString(16).padStart(2, "0");
      return `#${r.slice(0, 6)}${i}`;
    } else {
      if (r.length === 6)
        return `#${r}80`;
      if (r.length === 4) {
        const i = r[0], o = r[1], s = r[2], l = r[3], a = Math.round(Number.parseInt(`${l}${l}`, 16) / 2).toString(16).padStart(2, "0");
        return `#${i}${i}${o}${o}${s}${s}${a}`;
      } else if (r.length === 3) {
        const i = r[0], o = r[1], s = r[2];
        return `#${i}${i}${o}${o}${s}${s}80`;
      }
    }
  }
  const n = t.match(/var\((--[\w-]+-ansi-[\w-]+)\)/);
  return n ? `var(${n[1]}-dim)` : t;
}
function Te(t, e, n = {}) {
  const {
    theme: r = t.getLoadedThemes()[0]
  } = n, i = t.resolveLangAlias(n.lang || "text");
  if (et(i) || tt(r))
    return Ce(e).map((a) => [{ content: a[0], offset: a[1] }]);
  const { theme: o, colorMap: s } = t.setTheme(r);
  if (i === "ansi")
    return Vi(o, e, n);
  const l = t.getLanguage(n.lang || "text");
  if (n.grammarState) {
    if (n.grammarState.lang !== l.name)
      throw new R(`Grammar state language "${n.grammarState.lang}" does not match highlight language "${l.name}"`);
    if (!n.grammarState.themes.includes(o.name))
      throw new R(`Grammar state themes "${n.grammarState.themes}" do not contain highlight theme "${o.name}"`);
  }
  return Ji(e, l, o, s, n);
}
function hn(...t) {
  if (t.length === 2)
    return re(t[1]);
  const [e, n, r = {}] = t, {
    lang: i = "text",
    theme: o = e.getLoadedThemes()[0]
  } = r;
  if (et(i) || tt(o))
    throw new R("Plain language does not have grammar state");
  if (i === "ansi")
    throw new R("ANSI language does not have grammar state");
  const { theme: s, colorMap: l } = e.setTheme(o), a = e.getLanguage(i);
  return new Y(
    rt(n, a, s, l, r).stateStack,
    a.name,
    s.name
  );
}
function Ji(t, e, n, r, i) {
  const o = rt(t, e, n, r, i), s = new Y(
    o.stateStack,
    e.name,
    n.name
  );
  return ve(o.tokens, s), o.tokens;
}
function rt(t, e, n, r, i) {
  const o = Se(n, i), {
    tokenizeMaxLineLength: s = 0,
    tokenizeTimeLimit: l = 500
  } = i, a = Ce(t);
  let c = i.grammarState ? Bi(i.grammarState, n.name) ?? We : i.grammarContextCode != null ? rt(
    i.grammarContextCode,
    e,
    n,
    r,
    {
      ...i,
      grammarState: void 0,
      grammarContextCode: void 0
    }
  ).stateStack : We, u = [];
  const m = [];
  for (let d = 0, p = a.length; d < p; d++) {
    const [h, b] = a[d];
    if (h === "") {
      u = [], m.push([]);
      continue;
    }
    if (s > 0 && h.length >= s) {
      u = [], m.push([{
        content: h,
        offset: b,
        color: "",
        fontStyle: 0
      }]);
      continue;
    }
    let S, y, _;
    i.includeExplanation && (S = e.tokenizeLine(h, c, l), y = S.tokens, _ = 0);
    const g = e.tokenizeLine2(h, c, l), w = g.tokens.length / 2;
    for (let v = 0; v < w; v++) {
      const I = g.tokens[2 * v], $ = v + 1 < w ? g.tokens[2 * v + 2] : h.length;
      if (I === $)
        continue;
      const at = g.tokens[2 * v + 1], vn = j(
        r[K.getForeground(at)],
        o
      ), Tn = K.getFontStyle(at), Ne = {
        content: h.substring(I, $),
        offset: b + I,
        color: vn,
        fontStyle: Tn
      };
      if (i.includeExplanation) {
        const lt = [];
        if (i.includeExplanation !== "scopeName")
          for (const G of n.settings) {
            let W;
            switch (typeof G.scope) {
              case "string":
                W = G.scope.split(/,/).map((Ae) => Ae.trim());
                break;
              case "object":
                W = G.scope;
                break;
              default:
                continue;
            }
            lt.push({
              settings: G,
              selectors: W.map((Ae) => Ae.split(/ /))
            });
          }
        Ne.explanation = [];
        let ct = 0;
        for (; I + ct < $; ) {
          const G = y[_], W = h.substring(
            G.startIndex,
            G.endIndex
          );
          ct += W.length, Ne.explanation.push({
            content: W,
            scopes: i.includeExplanation === "scopeName" ? Yi(
              G.scopes
            ) : Xi(
              lt,
              G.scopes
            )
          }), _ += 1;
        }
      }
      u.push(Ne);
    }
    m.push(u), u = [], c = g.ruleStack;
  }
  return {
    tokens: m,
    stateStack: c
  };
}
function Yi(t) {
  return t.map((e) => ({ scopeName: e }));
}
function Xi(t, e) {
  const n = [];
  for (let r = 0, i = e.length; r < i; r++) {
    const o = e[r];
    n[r] = {
      scopeName: o,
      themeMatches: Zi(t, o, e.slice(0, r))
    };
  }
  return n;
}
function Lt(t, e) {
  return t === e || e.substring(0, t.length) === t && e[t.length] === ".";
}
function Qi(t, e, n) {
  if (!Lt(t[t.length - 1], e))
    return !1;
  let r = t.length - 2, i = n.length - 1;
  for (; r >= 0 && i >= 0; )
    Lt(t[r], n[i]) && (r -= 1), i -= 1;
  return r === -1;
}
function Zi(t, e, n) {
  const r = [];
  for (const { selectors: i, settings: o } of t)
    for (const s of i)
      if (Qi(s, e, n)) {
        r.push(o);
        break;
      }
  return r;
}
function it(t, e, n) {
  const r = Object.entries(n.themes).filter((a) => a[1]).map((a) => ({ color: a[0], theme: a[1] })), i = r.map((a) => {
    const c = Te(t, e, {
      ...n,
      theme: a.theme
    }), u = re(c), m = typeof a.theme == "string" ? a.theme : a.theme.name;
    return {
      tokens: c,
      state: u,
      theme: m
    };
  }), o = eo(
    ...i.map((a) => a.tokens)
  ), s = o[0].map(
    (a, c) => a.map((u, m) => {
      const d = {
        content: u.content,
        variants: {},
        offset: u.offset
      };
      return "includeExplanation" in n && n.includeExplanation && (d.explanation = u.explanation), o.forEach((p, h) => {
        const {
          content: b,
          explanation: S,
          offset: y,
          ..._
        } = p[c][m];
        d.variants[r[h].color] = _;
      }), d;
    })
  ), l = i[0].state ? new Y(
    Object.fromEntries(i.map((a) => [a.theme, a.state?.getInternalStack(a.theme)])),
    i[0].state.lang
  ) : void 0;
  return l && ve(s, l), s;
}
function eo(...t) {
  const e = t.map(() => []), n = t.length;
  for (let r = 0; r < t[0].length; r++) {
    const i = t.map((a) => a[r]), o = e.map(() => []);
    e.forEach((a, c) => a.push(o[c]));
    const s = i.map(() => 0), l = i.map((a) => a[0]);
    for (; l.every((a) => a); ) {
      const a = Math.min(...l.map((c) => c.content.length));
      for (let c = 0; c < n; c++) {
        const u = l[c];
        u.content.length === a ? (o[c].push(u), s[c] += 1, l[c] = i[c][s[c]]) : (o[c].push({
          ...u,
          content: u.content.slice(0, a)
        }), l[c] = {
          ...u,
          content: u.content.slice(a),
          offset: u.offset + a
        });
      }
    }
  }
  return e;
}
function ie(t, e, n) {
  let r, i, o, s, l, a;
  if ("themes" in n) {
    const {
      defaultColor: c = "light",
      cssVariablePrefix: u = "--shiki-",
      colorsRendering: m = "css-vars"
    } = n, d = Object.entries(n.themes).filter((y) => y[1]).map((y) => ({ color: y[0], theme: y[1] })).sort((y, _) => y.color === c ? -1 : _.color === c ? 1 : 0);
    if (d.length === 0)
      throw new R("`themes` option must not be empty");
    const p = it(
      t,
      e,
      n
    );
    if (a = re(p), c && nt !== c && !d.find((y) => y.color === c))
      throw new R(`\`themes\` option must contain the defaultColor key \`${c}\``);
    const h = d.map((y) => t.getTheme(y.theme)), b = d.map((y) => y.color);
    o = p.map((y) => y.map((_) => Oi(_, b, u, c, m))), a && ve(o, a);
    const S = d.map((y) => Se(y.theme, n));
    i = Nt(d, h, S, u, c, "fg", m), r = Nt(d, h, S, u, c, "bg", m), s = `shiki-themes ${h.map((y) => y.name).join(" ")}`, l = c ? void 0 : [i, r].join(";");
  } else if ("theme" in n) {
    const c = Se(n.theme, n);
    o = Te(
      t,
      e,
      n
    );
    const u = t.getTheme(n.theme);
    r = j(u.bg, c), i = j(u.fg, c), s = u.name, a = re(o);
  } else
    throw new R("Invalid options, either `theme` or `themes` must be provided");
  return {
    tokens: o,
    fg: i,
    bg: r,
    themeName: s,
    rootStyle: l,
    grammarState: a
  };
}
function Nt(t, e, n, r, i, o, s) {
  return t.map((l, a) => {
    const c = j(e[a][o], n[a]) || "inherit", u = `${r + l.color}${o === "bg" ? "-bg" : ""}:${c}`;
    if (a === 0 && i) {
      if (i === nt && t.length > 1) {
        const m = t.findIndex((b) => b.color === "light"), d = t.findIndex((b) => b.color === "dark");
        if (m === -1 || d === -1)
          throw new R('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
        const p = j(e[m][o], n[m]) || "inherit", h = j(e[d][o], n[d]) || "inherit";
        return `light-dark(${p}, ${h});${u}`;
      }
      return c;
    }
    return s === "css-vars" ? u : null;
  }).filter((l) => !!l).join(";");
}
function oe(t, e, n, r = {
  meta: {},
  options: n,
  codeToHast: (i, o) => oe(t, i, o),
  codeToTokens: (i, o) => ie(t, i, o)
}) {
  let i = e;
  for (const h of we(n))
    i = h.preprocess?.call(r, i, n) || i;
  let {
    tokens: o,
    fg: s,
    bg: l,
    themeName: a,
    rootStyle: c,
    grammarState: u
  } = ie(t, i, n);
  const {
    mergeWhitespaces: m = !0,
    mergeSameStyleTokens: d = !1
  } = n;
  m === !0 ? o = no(o) : m === "never" && (o = ro(o)), d && (o = io(o));
  const p = {
    ...r,
    get source() {
      return i;
    }
  };
  for (const h of we(n))
    o = h.tokens?.call(p, o) || o;
  return to(
    o,
    {
      ...n,
      fg: s,
      bg: l,
      themeName: a,
      rootStyle: n.rootStyle === !1 ? !1 : n.rootStyle ?? c
    },
    p,
    u
  );
}
function to(t, e, n, r = re(t)) {
  const i = we(e), o = [], s = {
    type: "root",
    children: []
  }, {
    structure: l = "classic",
    tabindex: a = "0"
  } = e, c = {
    class: `shiki ${e.themeName || ""}`
  };
  e.rootStyle !== !1 && (e.rootStyle != null ? c.style = e.rootStyle : c.style = `background-color:${e.bg};color:${e.fg}`), a !== !1 && a != null && (c.tabindex = a.toString());
  for (const [b, S] of Object.entries(e.meta || {}))
    b.startsWith("_") || (c[b] = S);
  let u = {
    type: "element",
    tagName: "pre",
    properties: c,
    children: [],
    data: e.data
  }, m = {
    type: "element",
    tagName: "code",
    properties: {},
    children: o
  };
  const d = [], p = {
    ...n,
    structure: l,
    addClassToHast: un,
    get source() {
      return n.source;
    },
    get tokens() {
      return t;
    },
    get options() {
      return e;
    },
    get root() {
      return s;
    },
    get pre() {
      return u;
    },
    get code() {
      return m;
    },
    get lines() {
      return d;
    }
  };
  if (t.forEach((b, S) => {
    S && (l === "inline" ? s.children.push({ type: "element", tagName: "br", properties: {}, children: [] }) : l === "classic" && o.push({ type: "text", value: `
` }));
    let y = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    }, _ = 0;
    for (const g of b) {
      let w = {
        type: "element",
        tagName: "span",
        properties: {
          ...g.htmlAttrs
        },
        children: [{ type: "text", value: g.content }]
      };
      const v = Je(g.htmlStyle || ke(g));
      v && (w.properties.style = v);
      for (const I of i)
        w = I?.span?.call(p, w, S + 1, _, y, g) || w;
      l === "inline" ? s.children.push(w) : l === "classic" && y.children.push(w), _ += g.content.length;
    }
    if (l === "classic") {
      for (const g of i)
        y = g?.line?.call(p, y, S + 1) || y;
      d.push(y), o.push(y);
    } else l === "inline" && d.push(y);
  }), l === "classic") {
    for (const b of i)
      m = b?.code?.call(p, m) || m;
    u.children.push(m);
    for (const b of i)
      u = b?.pre?.call(p, u) || u;
    s.children.push(u);
  } else if (l === "inline") {
    const b = [];
    let S = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    };
    for (const g of s.children)
      g.type === "element" && g.tagName === "br" ? (b.push(S), S = {
        type: "element",
        tagName: "span",
        properties: { class: "line" },
        children: []
      }) : (g.type === "element" || g.type === "text") && S.children.push(g);
    b.push(S);
    let _ = {
      type: "element",
      tagName: "code",
      properties: {},
      children: b
    };
    for (const g of i)
      _ = g?.code?.call(p, _) || _;
    s.children = [];
    for (let g = 0; g < _.children.length; g++) {
      g > 0 && s.children.push({ type: "element", tagName: "br", properties: {}, children: [] });
      const w = _.children[g];
      w.type === "element" && s.children.push(...w.children);
    }
  }
  let h = s;
  for (const b of i)
    h = b?.root?.call(p, h) || h;
  return r && ve(h, r), h;
}
function no(t) {
  return t.map((e) => {
    const n = [];
    let r = "", i;
    return e.forEach((o, s) => {
      const a = !(o.fontStyle && (o.fontStyle & P.Underline || o.fontStyle & P.Strikethrough));
      a && o.content.match(/^\s+$/) && e[s + 1] ? (i === void 0 && (i = o.offset), r += o.content) : r ? (a ? n.push({
        ...o,
        offset: i,
        content: r + o.content
      }) : n.push(
        {
          content: r,
          offset: i
        },
        o
      ), i = void 0, r = "") : n.push(o);
    }), n;
  });
}
function ro(t) {
  return t.map((e) => e.flatMap((n) => {
    if (n.content.match(/^\s+$/))
      return n;
    const r = n.content.match(/^(\s*)(.*?)(\s*)$/);
    if (!r)
      return n;
    const [, i, o, s] = r;
    if (!i && !s)
      return n;
    const l = [{
      ...n,
      offset: n.offset + i.length,
      content: o
    }];
    return i && l.unshift({
      content: i,
      offset: n.offset
    }), s && l.push({
      content: s,
      offset: n.offset + i.length + o.length
    }), l;
  }));
}
function io(t) {
  return t.map((e) => {
    const n = [];
    for (const r of e) {
      if (n.length === 0) {
        n.push({ ...r });
        continue;
      }
      const i = n[n.length - 1], o = Je(i.htmlStyle || ke(i)), s = Je(r.htmlStyle || ke(r)), l = i.fontStyle && (i.fontStyle & P.Underline || i.fontStyle & P.Strikethrough), a = r.fontStyle && (r.fontStyle & P.Underline || r.fontStyle & P.Strikethrough);
      !l && !a && o === s ? i.content += r.content : n.push({ ...r });
    }
    return n;
  });
}
const oo = Ti;
function dn(t, e, n) {
  const r = {
    meta: {},
    options: n,
    codeToHast: (o, s) => oe(t, o, s),
    codeToTokens: (o, s) => ie(t, o, s)
  };
  let i = oo(oe(t, e, n, r));
  for (const o of we(n))
    i = o.postprocess?.call(r, i, n) || i;
  return i;
}
const At = { light: "#333333", dark: "#bbbbbb" }, xt = { light: "#fffffe", dark: "#1e1e1e" }, Pt = "__shiki_resolved";
function ot(t) {
  if (t?.[Pt])
    return t;
  const e = {
    ...t
  };
  e.tokenColors && !e.settings && (e.settings = e.tokenColors, delete e.tokenColors), e.type ||= "dark", e.colorReplacements = { ...e.colorReplacements }, e.settings ||= [];
  let { bg: n, fg: r } = e;
  if (!n || !r) {
    const l = e.settings ? e.settings.find((a) => !a.name && !a.scope) : void 0;
    l?.settings?.foreground && (r = l.settings.foreground), l?.settings?.background && (n = l.settings.background), !r && e?.colors?.["editor.foreground"] && (r = e.colors["editor.foreground"]), !n && e?.colors?.["editor.background"] && (n = e.colors["editor.background"]), r || (r = e.type === "light" ? At.light : At.dark), n || (n = e.type === "light" ? xt.light : xt.dark), e.fg = r, e.bg = n;
  }
  e.settings[0] && e.settings[0].settings && !e.settings[0].scope || e.settings.unshift({
    settings: {
      foreground: e.fg,
      background: e.bg
    }
  });
  let i = 0;
  const o = /* @__PURE__ */ new Map();
  function s(l) {
    if (o.has(l))
      return o.get(l);
    i += 1;
    const a = `#${i.toString(16).padStart(8, "0").toLowerCase()}`;
    return e.colorReplacements?.[`#${a}`] ? s(l) : (o.set(l, a), a);
  }
  e.settings = e.settings.map((l) => {
    const a = l.settings?.foreground && !l.settings.foreground.startsWith("#"), c = l.settings?.background && !l.settings.background.startsWith("#");
    if (!a && !c)
      return l;
    const u = {
      ...l,
      settings: {
        ...l.settings
      }
    };
    if (a) {
      const m = s(l.settings.foreground);
      e.colorReplacements[m] = l.settings.foreground, u.settings.foreground = m;
    }
    if (c) {
      const m = s(l.settings.background);
      e.colorReplacements[m] = l.settings.background, u.settings.background = m;
    }
    return u;
  });
  for (const l of Object.keys(e.colors || {}))
    if ((l === "editor.foreground" || l === "editor.background" || l.startsWith("terminal.ansi")) && !e.colors[l]?.startsWith("#")) {
      const a = s(e.colors[l]);
      e.colorReplacements[a] = e.colors[l], e.colors[l] = a;
    }
  return Object.defineProperty(e, Pt, {
    enumerable: !1,
    writable: !1,
    value: !0
  }), e;
}
async function fn(t) {
  return Array.from(new Set((await Promise.all(
    t.filter((e) => !ln(e)).map(async (e) => await an(e).then((n) => Array.isArray(n) ? n : [n]))
  )).flat()));
}
async function gn(t) {
  return (await Promise.all(
    t.map(
      async (n) => cn(n) ? null : ot(await an(n))
    )
  )).filter((n) => !!n);
}
let de = 3, yn = !1;
function jo(t = !0, e = !1) {
  de = t, yn = e;
}
function so(t, e = 3) {
  if (de && !(typeof de == "number" && e > de)) {
    if (yn)
      throw new Error(`[SHIKI DEPRECATE]: ${t}`);
    console.trace(`[SHIKI DEPRECATE]: ${t}`);
  }
}
let z = class extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
};
function bn(t, e) {
  if (!e)
    return t;
  if (e[t]) {
    const n = /* @__PURE__ */ new Set([t]);
    for (; e[t]; ) {
      if (t = e[t], n.has(t))
        throw new z(`Circular alias \`${Array.from(n).join(" -> ")} -> ${t}\``);
      n.add(t);
    }
  }
  return t;
}
class ao extends mr {
  constructor(e, n, r, i = {}) {
    super(e), this._resolver = e, this._themes = n, this._langs = r, this._alias = i, this._themes.map((o) => this.loadTheme(o)), this.loadLanguages(this._langs);
  }
  _resolvedThemes = /* @__PURE__ */ new Map();
  _resolvedGrammars = /* @__PURE__ */ new Map();
  _langMap = /* @__PURE__ */ new Map();
  _langGraph = /* @__PURE__ */ new Map();
  _textmateThemeCache = /* @__PURE__ */ new WeakMap();
  _loadedThemesCache = null;
  _loadedLanguagesCache = null;
  getTheme(e) {
    return typeof e == "string" ? this._resolvedThemes.get(e) : this.loadTheme(e);
  }
  loadTheme(e) {
    const n = ot(e);
    return n.name && (this._resolvedThemes.set(n.name, n), this._loadedThemesCache = null), n;
  }
  getLoadedThemes() {
    return this._loadedThemesCache || (this._loadedThemesCache = [...this._resolvedThemes.keys()]), this._loadedThemesCache;
  }
  // Override and re-implement this method to cache the textmate themes as `TextMateTheme.createFromRawTheme`
  // is expensive. Themes can switch often especially for dual-theme support.
  //
  // The parent class also accepts `colorMap` as the second parameter, but since we don't use that,
  // we omit here so it's easier to cache the themes.
  setTheme(e) {
    let n = this._textmateThemeCache.get(e);
    n || (n = fe.createFromRawTheme(e), this._textmateThemeCache.set(e, n)), this._syncRegistry.setTheme(n);
  }
  getGrammar(e) {
    return e = bn(e, this._alias), this._resolvedGrammars.get(e);
  }
  loadLanguage(e) {
    if (this.getGrammar(e.name))
      return;
    const n = new Set(
      [...this._langMap.values()].filter((o) => o.embeddedLangsLazy?.includes(e.name))
    );
    this._resolver.addLanguage(e);
    const r = {
      balancedBracketSelectors: e.balancedBracketSelectors || ["*"],
      unbalancedBracketSelectors: e.unbalancedBracketSelectors || []
    };
    this._syncRegistry._rawGrammars.set(e.scopeName, e);
    const i = this.loadGrammarWithConfiguration(e.scopeName, 1, r);
    if (i.name = e.name, this._resolvedGrammars.set(e.name, i), e.aliases && e.aliases.forEach((o) => {
      this._alias[o] = e.name;
    }), this._loadedLanguagesCache = null, n.size)
      for (const o of n)
        this._resolvedGrammars.delete(o.name), this._loadedLanguagesCache = null, this._syncRegistry?._injectionGrammars?.delete(o.scopeName), this._syncRegistry?._grammars?.delete(o.scopeName), this.loadLanguage(this._langMap.get(o.name));
  }
  dispose() {
    super.dispose(), this._resolvedThemes.clear(), this._resolvedGrammars.clear(), this._langMap.clear(), this._langGraph.clear(), this._loadedThemesCache = null;
  }
  loadLanguages(e) {
    for (const i of e)
      this.resolveEmbeddedLanguages(i);
    const n = Array.from(this._langGraph.entries()), r = n.filter(([i, o]) => !o);
    if (r.length) {
      const i = n.filter(([o, s]) => s ? (s.embeddedLanguages || s.embeddedLangs)?.some((a) => r.map(([c]) => c).includes(a)) : !1).filter((o) => !r.includes(o));
      throw new z(`Missing languages ${r.map(([o]) => `\`${o}\``).join(", ")}, required by ${i.map(([o]) => `\`${o}\``).join(", ")}`);
    }
    for (const [i, o] of n)
      this._resolver.addLanguage(o);
    for (const [i, o] of n)
      this.loadLanguage(o);
  }
  getLoadedLanguages() {
    return this._loadedLanguagesCache || (this._loadedLanguagesCache = [
      .../* @__PURE__ */ new Set([...this._resolvedGrammars.keys(), ...Object.keys(this._alias)])
    ]), this._loadedLanguagesCache;
  }
  resolveEmbeddedLanguages(e) {
    this._langMap.set(e.name, e), this._langGraph.set(e.name, e);
    const n = e.embeddedLanguages ?? e.embeddedLangs;
    if (n)
      for (const r of n)
        this._langGraph.set(r, this._langMap.get(r));
  }
}
class lo {
  _langs = /* @__PURE__ */ new Map();
  _scopeToLang = /* @__PURE__ */ new Map();
  _injections = /* @__PURE__ */ new Map();
  _onigLib;
  constructor(e, n) {
    this._onigLib = {
      createOnigScanner: (r) => e.createScanner(r),
      createOnigString: (r) => e.createString(r)
    }, n.forEach((r) => this.addLanguage(r));
  }
  get onigLib() {
    return this._onigLib;
  }
  getLangRegistration(e) {
    return this._langs.get(e);
  }
  loadGrammar(e) {
    return this._scopeToLang.get(e);
  }
  addLanguage(e) {
    this._langs.set(e.name, e), e.aliases && e.aliases.forEach((n) => {
      this._langs.set(n, e);
    }), this._scopeToLang.set(e.scopeName, e), e.injectTo && e.injectTo.forEach((n) => {
      this._injections.get(n) || this._injections.set(n, []), this._injections.get(n).push(e.scopeName);
    });
  }
  getInjections(e) {
    const n = e.split(".");
    let r = [];
    for (let i = 1; i <= n.length; i++) {
      const o = n.slice(0, i).join(".");
      r = [...r, ...this._injections.get(o) || []];
    }
    return r;
  }
}
let X = 0;
function _n(t) {
  X += 1, t.warnings !== !1 && X >= 10 && X % 10 === 0 && console.warn(`[Shiki] ${X} instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call \`highlighter.dispose()\` to release unused instances.`);
  let e = !1;
  if (!t.engine)
    throw new z("`engine` option is required for synchronous mode");
  const n = (t.langs || []).flat(1), r = (t.themes || []).flat(1).map(ot), i = new lo(t.engine, n), o = new ao(i, r, n, t.langAlias);
  let s;
  function l(g) {
    return bn(g, t.langAlias);
  }
  function a(g) {
    y();
    const w = o.getGrammar(typeof g == "string" ? g : g.name);
    if (!w)
      throw new z(`Language \`${g}\` not found, you may need to load it first`);
    return w;
  }
  function c(g) {
    if (g === "none")
      return { bg: "", fg: "", name: "none", settings: [], type: "dark" };
    y();
    const w = o.getTheme(g);
    if (!w)
      throw new z(`Theme \`${g}\` not found, you may need to load it first`);
    return w;
  }
  function u(g) {
    y();
    const w = c(g);
    s !== g && (o.setTheme(w), s = g);
    const v = o.getColorMap();
    return {
      theme: w,
      colorMap: v
    };
  }
  function m() {
    return y(), o.getLoadedThemes();
  }
  function d() {
    return y(), o.getLoadedLanguages();
  }
  function p(...g) {
    y(), o.loadLanguages(g.flat(1));
  }
  async function h(...g) {
    return p(await fn(g));
  }
  function b(...g) {
    y();
    for (const w of g.flat(1))
      o.loadTheme(w);
  }
  async function S(...g) {
    return y(), b(await gn(g));
  }
  function y() {
    if (e)
      throw new z("Shiki instance has been disposed");
  }
  function _() {
    e || (e = !0, o.dispose(), X -= 1);
  }
  return {
    setTheme: u,
    getTheme: c,
    getLanguage: a,
    getLoadedThemes: m,
    getLoadedLanguages: d,
    resolveLangAlias: l,
    loadLanguage: h,
    loadLanguageSync: p,
    loadTheme: S,
    loadThemeSync: b,
    dispose: _,
    [Symbol.dispose]: _
  };
}
async function co(t) {
  t.engine || so("`engine` option is required. Use `createOnigurumaEngine` or `createJavaScriptRegexEngine` to create an engine.");
  const [
    e,
    n,
    r
  ] = await Promise.all([
    gn(t.themes || []),
    fn(t.langs || []),
    t.engine
  ]);
  return _n({
    ...t,
    themes: e,
    langs: n,
    engine: r
  });
}
async function Sn(t) {
  const e = await co(t);
  return {
    getLastGrammarState: (...n) => hn(e, ...n),
    codeToTokensBase: (n, r) => Te(e, n, r),
    codeToTokensWithThemes: (n, r) => it(e, n, r),
    codeToTokens: (n, r) => ie(e, n, r),
    codeToHast: (n, r) => oe(e, n, r),
    codeToHtml: (n, r) => dn(e, n, r),
    getBundledLanguages: () => ({}),
    getBundledThemes: () => ({}),
    ...e,
    getInternalContext: () => e
  };
}
function Fo(t) {
  const e = _n(t);
  return {
    getLastGrammarState: (...n) => hn(e, ...n),
    codeToTokensBase: (n, r) => Te(e, n, r),
    codeToTokensWithThemes: (n, r) => it(e, n, r),
    codeToTokens: (n, r) => ie(e, n, r),
    codeToHast: (n, r) => oe(e, n, r),
    codeToHtml: (n, r) => dn(e, n, r),
    getBundledLanguages: () => ({}),
    getBundledThemes: () => ({}),
    ...e,
    getInternalContext: () => e
  };
}
function uo(t) {
  let e;
  async function n(r) {
    if (e) {
      const i = await e;
      return await Promise.all([
        i.loadTheme(...r.themes || []),
        i.loadLanguage(...r.langs || [])
      ]), i;
    } else
      return e = t({
        ...r,
        themes: r.themes || [],
        langs: r.langs || []
      }), e;
  }
  return n;
}
const Uo = /* @__PURE__ */ uo(Sn);
function kn(t) {
  const e = t.langs, n = t.themes, r = t.engine;
  async function i(o) {
    function s(m) {
      if (typeof m == "string") {
        if (m = o.langAlias?.[m] || m, ln(m))
          return [];
        const d = e[m];
        if (!d)
          throw new R(`Language \`${m}\` is not included in this bundle. You may want to load it from external source.`);
        return d;
      }
      return m;
    }
    function l(m) {
      if (cn(m))
        return "none";
      if (typeof m == "string") {
        const d = n[m];
        if (!d)
          throw new R(`Theme \`${m}\` is not included in this bundle. You may want to load it from external source.`);
        return d;
      }
      return m;
    }
    const a = (o.themes ?? []).map((m) => l(m)), c = (o.langs ?? []).map((m) => s(m)), u = await Sn({
      engine: o.engine ?? r(),
      ...o,
      themes: a,
      langs: c
    });
    return {
      ...u,
      loadLanguage(...m) {
        return u.loadLanguage(...m.map(s));
      },
      loadTheme(...m) {
        return u.loadTheme(...m.map(l));
      },
      getBundledLanguages() {
        return e;
      },
      getBundledThemes() {
        return n;
      }
    };
  }
  return i;
}
function mo(t) {
  let e;
  async function n(r = {}) {
    if (e) {
      const i = await e;
      return await Promise.all([
        i.loadTheme(...r.themes || []),
        i.loadLanguage(...r.langs || [])
      ]), i;
    } else {
      e = t({
        ...r,
        themes: [],
        langs: []
      });
      const i = await e;
      return await Promise.all([
        i.loadTheme(...r.themes || []),
        i.loadLanguage(...r.langs || [])
      ]), i;
    }
  }
  return n;
}
function po(t, e) {
  const n = mo(t);
  async function r(i, o) {
    const s = await n({
      langs: [o.lang],
      themes: "theme" in o ? [o.theme] : Object.values(o.themes)
    }), l = await e?.guessEmbeddedLanguages?.(i, o.lang, s);
    return l && await s.loadLanguage(...l), s;
  }
  return {
    getSingletonHighlighter(i) {
      return n(i);
    },
    async codeToHtml(i, o) {
      return (await r(i, o)).codeToHtml(i, o);
    },
    async codeToHast(i, o) {
      return (await r(i, o)).codeToHast(i, o);
    },
    async codeToTokens(i, o) {
      return (await r(i, o)).codeToTokens(i, o);
    },
    async codeToTokensBase(i, o) {
      return (await r(i, o)).codeToTokensBase(i, o);
    },
    async codeToTokensWithThemes(i, o) {
      return (await r(i, o)).codeToTokensWithThemes(i, o);
    },
    async getLastGrammarState(i, o) {
      return (await n({
        langs: [o.lang],
        themes: [o.theme]
      })).getLastGrammarState(i, o);
    }
  };
}
const Ho = kn;
function Wo(t = {}) {
  const {
    name: e = "css-variables",
    variablePrefix: n = "--shiki-",
    fontStyle: r = !0
  } = t, i = (s) => t.variableDefaults?.[s] ? `var(${n}${s}, ${t.variableDefaults[s]})` : `var(${n}${s})`, o = {
    name: e,
    type: "dark",
    colors: {
      "editor.foreground": i("foreground"),
      "editor.background": i("background"),
      "terminal.ansiBlack": i("ansi-black"),
      "terminal.ansiRed": i("ansi-red"),
      "terminal.ansiGreen": i("ansi-green"),
      "terminal.ansiYellow": i("ansi-yellow"),
      "terminal.ansiBlue": i("ansi-blue"),
      "terminal.ansiMagenta": i("ansi-magenta"),
      "terminal.ansiCyan": i("ansi-cyan"),
      "terminal.ansiWhite": i("ansi-white"),
      "terminal.ansiBrightBlack": i("ansi-bright-black"),
      "terminal.ansiBrightRed": i("ansi-bright-red"),
      "terminal.ansiBrightGreen": i("ansi-bright-green"),
      "terminal.ansiBrightYellow": i("ansi-bright-yellow"),
      "terminal.ansiBrightBlue": i("ansi-bright-blue"),
      "terminal.ansiBrightMagenta": i("ansi-bright-magenta"),
      "terminal.ansiBrightCyan": i("ansi-bright-cyan"),
      "terminal.ansiBrightWhite": i("ansi-bright-white")
    },
    tokenColors: [
      {
        scope: [
          "keyword.operator.accessor",
          "meta.group.braces.round.function.arguments",
          "meta.template.expression",
          "markup.fenced_code meta.embedded.block"
        ],
        settings: {
          foreground: i("foreground")
        }
      },
      {
        scope: "emphasis",
        settings: {
          fontStyle: "italic"
        }
      },
      {
        scope: ["strong", "markup.heading.markdown", "markup.bold.markdown"],
        settings: {
          fontStyle: "bold"
        }
      },
      {
        scope: ["markup.italic.markdown"],
        settings: {
          fontStyle: "italic"
        }
      },
      {
        scope: "meta.link.inline.markdown",
        settings: {
          fontStyle: "underline",
          foreground: i("token-link")
        }
      },
      {
        scope: ["string", "markup.fenced_code", "markup.inline"],
        settings: {
          foreground: i("token-string")
        }
      },
      {
        scope: ["comment", "string.quoted.docstring.multi"],
        settings: {
          foreground: i("token-comment")
        }
      },
      {
        scope: [
          "constant.numeric",
          "constant.language",
          "constant.other.placeholder",
          "constant.character.format.placeholder",
          "variable.language.this",
          "variable.other.object",
          "variable.other.class",
          "variable.other.constant",
          "meta.property-name",
          "meta.property-value",
          "support"
        ],
        settings: {
          foreground: i("token-constant")
        }
      },
      {
        scope: [
          "keyword",
          "storage.modifier",
          "storage.type",
          "storage.control.clojure",
          "entity.name.function.clojure",
          "entity.name.tag.yaml",
          "support.function.node",
          "support.type.property-name.json",
          "punctuation.separator.key-value",
          "punctuation.definition.template-expression"
        ],
        settings: {
          foreground: i("token-keyword")
        }
      },
      {
        scope: "variable.parameter.function",
        settings: {
          foreground: i("token-parameter")
        }
      },
      {
        scope: [
          "support.function",
          "entity.name.type",
          "entity.other.inherited-class",
          "meta.function-call",
          "meta.instance.constructor",
          "entity.other.attribute-name",
          "entity.name.function",
          "constant.keyword.clojure"
        ],
        settings: {
          foreground: i("token-function")
        }
      },
      {
        scope: [
          "entity.name.tag",
          "string.quoted",
          "string.regexp",
          "string.interpolated",
          "string.template",
          "string.unquoted.plain.out.yaml",
          "keyword.other.template"
        ],
        settings: {
          foreground: i("token-string-expression")
        }
      },
      {
        scope: [
          "punctuation.definition.arguments",
          "punctuation.definition.dict",
          "punctuation.separator",
          "meta.function-call.arguments"
        ],
        settings: {
          foreground: i("token-punctuation")
        }
      },
      {
        // [Custom] Markdown links
        scope: [
          "markup.underline.link",
          "punctuation.definition.metadata.markdown"
        ],
        settings: {
          foreground: i("token-link")
        }
      },
      {
        // [Custom] Markdown list
        scope: ["beginning.punctuation.definition.list.markdown"],
        settings: {
          foreground: i("token-string")
        }
      },
      {
        // [Custom] Markdown punctuation definition brackets
        scope: [
          "punctuation.definition.string.begin.markdown",
          "punctuation.definition.string.end.markdown",
          "string.other.link.title.markdown",
          "string.other.link.description.markdown"
        ],
        settings: {
          foreground: i("token-keyword")
        }
      },
      {
        // [Custom] Diff
        scope: [
          "markup.inserted",
          "meta.diff.header.to-file",
          "punctuation.definition.inserted"
        ],
        settings: {
          foreground: i("token-inserted")
        }
      },
      {
        scope: [
          "markup.deleted",
          "meta.diff.header.from-file",
          "punctuation.definition.deleted"
        ],
        settings: {
          foreground: i("token-deleted")
        }
      },
      {
        scope: [
          "markup.changed",
          "punctuation.definition.changed"
        ],
        settings: {
          foreground: i("token-changed")
        }
      }
    ]
  };
  return r || (o.tokenColors = o.tokenColors?.map((s) => (s.settings?.fontStyle && delete s.settings.fontStyle, s))), o;
}
const wn = [
  {
    id: "abap",
    name: "ABAP",
    import: (() => import("./abap-Y8Dl9g_6.js"))
  },
  {
    id: "actionscript-3",
    name: "ActionScript",
    import: (() => import("./actionscript-3-DQVEcJUW.js"))
  },
  {
    id: "ada",
    name: "Ada",
    import: (() => import("./ada-vP6ak0IW.js"))
  },
  {
    id: "angular-html",
    name: "Angular HTML",
    import: (() => import("./angular-html-DPB4Rf0C.js").then((t) => t.f))
  },
  {
    id: "angular-ts",
    name: "Angular TypeScript",
    import: (() => import("./angular-ts-CTOR2ofC.js"))
  },
  {
    id: "apache",
    name: "Apache Conf",
    import: (() => import("./apache-BUjz-sD2.js"))
  },
  {
    id: "apex",
    name: "Apex",
    import: (() => import("./apex-OyTfjCYK.js"))
  },
  {
    id: "apl",
    name: "APL",
    import: (() => import("./apl-CjNiDgad.js"))
  },
  {
    id: "applescript",
    name: "AppleScript",
    import: (() => import("./applescript-BPx7YFFu.js"))
  },
  {
    id: "ara",
    name: "Ara",
    import: (() => import("./ara-Z2fSOxSw.js"))
  },
  {
    id: "asciidoc",
    name: "AsciiDoc",
    aliases: [
      "adoc"
    ],
    import: (() => import("./asciidoc-C1T9ziH6.js"))
  },
  {
    id: "asm",
    name: "Assembly",
    import: (() => import("./asm-BTWLY5ym.js"))
  },
  {
    id: "astro",
    name: "Astro",
    import: (() => import("./astro-CFFExE8Q.js"))
  },
  {
    id: "awk",
    name: "AWK",
    import: (() => import("./awk-Fb0P9dkn.js"))
  },
  {
    id: "ballerina",
    name: "Ballerina",
    import: (() => import("./ballerina-oZK-YekG.js"))
  },
  {
    id: "bat",
    name: "Batch File",
    aliases: [
      "batch"
    ],
    import: (() => import("./bat-0FvbqU9S.js"))
  },
  {
    id: "beancount",
    name: "Beancount",
    import: (() => import("./beancount-DqJEb89h.js"))
  },
  {
    id: "berry",
    name: "Berry",
    aliases: [
      "be"
    ],
    import: (() => import("./berry-DODBq_Ff.js"))
  },
  {
    id: "bibtex",
    name: "BibTeX",
    import: (() => import("./bibtex-EULQRLY5.js"))
  },
  {
    id: "bicep",
    name: "Bicep",
    import: (() => import("./bicep-BorU73w0.js"))
  },
  {
    id: "bird2",
    name: "BIRD2 Configuration",
    aliases: [
      "bird"
    ],
    import: (() => import("./bird2-CIjBSNj3.js"))
  },
  {
    id: "blade",
    name: "Blade",
    import: (() => import("./blade-D0HyNvCw.js"))
  },
  {
    id: "bsl",
    name: "1C (Enterprise)",
    aliases: [
      "1c"
    ],
    import: (() => import("./bsl-NkNNwerW.js"))
  },
  {
    id: "c",
    name: "C",
    import: (() => import("./c-eeMepfLm.js"))
  },
  {
    id: "c3",
    name: "C3",
    import: (() => import("./c3-BY5XW5ym.js"))
  },
  {
    id: "cadence",
    name: "Cadence",
    aliases: [
      "cdc"
    ],
    import: (() => import("./cadence-02UX7mW8.js"))
  },
  {
    id: "cairo",
    name: "Cairo",
    import: (() => import("./cairo-DM6WF2e3.js"))
  },
  {
    id: "clarity",
    name: "Clarity",
    import: (() => import("./clarity-PKm5CwqM.js"))
  },
  {
    id: "clojure",
    name: "Clojure",
    aliases: [
      "clj"
    ],
    import: (() => import("./clojure-CXJfHrL3.js"))
  },
  {
    id: "cmake",
    name: "CMake",
    import: (() => import("./cmake-BJz8BOTU.js"))
  },
  {
    id: "cobol",
    name: "COBOL",
    import: (() => import("./cobol-HihOMwht.js"))
  },
  {
    id: "codeowners",
    name: "CODEOWNERS",
    import: (() => import("./codeowners-Bt9yU6NX.js"))
  },
  {
    id: "codeql",
    name: "CodeQL",
    aliases: [
      "ql"
    ],
    import: (() => import("./codeql-DHkodjjI.js"))
  },
  {
    id: "coffee",
    name: "CoffeeScript",
    aliases: [
      "coffeescript"
    ],
    import: (() => import("./coffee-DGBR_nr_.js"))
  },
  {
    id: "common-lisp",
    name: "Common Lisp",
    aliases: [
      "lisp"
    ],
    import: (() => import("./common-lisp-EVqT9Zhp.js"))
  },
  {
    id: "coq",
    name: "Coq",
    import: (() => import("./coq-B0L9upzn.js"))
  },
  {
    id: "cpp",
    name: "C++",
    aliases: [
      "c++"
    ],
    import: (() => import("./cpp-Cj177cuW.js"))
  },
  {
    id: "crystal",
    name: "Crystal",
    import: (() => import("./crystal-CRJyc4G-.js"))
  },
  {
    id: "csharp",
    name: "C#",
    aliases: [
      "c#",
      "cs"
    ],
    import: (() => import("./csharp-CCgA4A09.js"))
  },
  {
    id: "css",
    name: "CSS",
    import: (() => import("./css-CECN5uSL.js"))
  },
  {
    id: "csv",
    name: "CSV",
    import: (() => import("./csv-CmYOceLb.js"))
  },
  {
    id: "cue",
    name: "CUE",
    import: (() => import("./cue-ZzumE7IT.js"))
  },
  {
    id: "cypher",
    name: "Cypher",
    aliases: [
      "cql"
    ],
    import: (() => import("./cypher-jpdmjtA6.js"))
  },
  {
    id: "d",
    name: "D",
    import: (() => import("./d-CBagWSwH.js"))
  },
  {
    id: "dart",
    name: "Dart",
    import: (() => import("./dart-6ObCrKr9.js"))
  },
  {
    id: "dax",
    name: "DAX",
    import: (() => import("./dax-CcDT-8dH.js"))
  },
  {
    id: "desktop",
    name: "Desktop",
    import: (() => import("./desktop-B93p9R9O.js"))
  },
  {
    id: "diff",
    name: "Diff",
    import: (() => import("./diff-BxzP2J8R.js"))
  },
  {
    id: "docker",
    name: "Dockerfile",
    aliases: [
      "dockerfile"
    ],
    import: (() => import("./docker-CsHqm9tx.js"))
  },
  {
    id: "dotenv",
    name: "dotEnv",
    import: (() => import("./dotenv-BMjVjUL1.js"))
  },
  {
    id: "dream-maker",
    name: "Dream Maker",
    import: (() => import("./dream-maker-PAx17jaB.js"))
  },
  {
    id: "edge",
    name: "Edge",
    import: (() => import("./edge-BYQkOzbF.js"))
  },
  {
    id: "elixir",
    name: "Elixir",
    import: (() => import("./elixir-Dh036GMp.js"))
  },
  {
    id: "elm",
    name: "Elm",
    import: (() => import("./elm-BtNbw_Cd.js"))
  },
  {
    id: "emacs-lisp",
    name: "Emacs Lisp",
    aliases: [
      "elisp"
    ],
    import: (() => import("./emacs-lisp-Cfxdx5D-.js"))
  },
  {
    id: "erb",
    name: "ERB",
    import: (() => import("./erb-ScVOXVpH.js"))
  },
  {
    id: "erlang",
    name: "Erlang",
    aliases: [
      "erl"
    ],
    import: (() => import("./erlang-DNcDT8Hi.js"))
  },
  {
    id: "fennel",
    name: "Fennel",
    import: (() => import("./fennel-N4WcXuKx.js"))
  },
  {
    id: "fish",
    name: "Fish",
    import: (() => import("./fish-BTDEUgqH.js"))
  },
  {
    id: "fluent",
    name: "Fluent",
    aliases: [
      "ftl"
    ],
    import: (() => import("./fluent-BMXUxfv1.js"))
  },
  {
    id: "fortran-fixed-form",
    name: "Fortran (Fixed Form)",
    aliases: [
      "f",
      "for",
      "f77"
    ],
    import: (() => import("./fortran-fixed-form-B67KFkXH.js"))
  },
  {
    id: "fortran-free-form",
    name: "Fortran (Free Form)",
    aliases: [
      "f90",
      "f95",
      "f03",
      "f08",
      "f18"
    ],
    import: (() => import("./fortran-free-form-CwqYvCLJ.js"))
  },
  {
    id: "fsharp",
    name: "F#",
    aliases: [
      "f#",
      "fs"
    ],
    import: (() => import("./fsharp-CYOiIVNx.js"))
  },
  {
    id: "gdresource",
    name: "GDResource",
    aliases: [
      "tscn",
      "tres"
    ],
    import: (() => import("./gdresource-CvCIUjhi.js"))
  },
  {
    id: "gdscript",
    name: "GDScript",
    aliases: [
      "gd"
    ],
    import: (() => import("./gdscript-DSAxJ_aS.js"))
  },
  {
    id: "gdshader",
    name: "GDShader",
    import: (() => import("./gdshader-Bk8fF6yr.js"))
  },
  {
    id: "genie",
    name: "Genie",
    import: (() => import("./genie-DzUvd7U9.js"))
  },
  {
    id: "gherkin",
    name: "Gherkin",
    import: (() => import("./gherkin-DHRaV0YP.js"))
  },
  {
    id: "git-commit",
    name: "Git Commit Message",
    import: (() => import("./git-commit-Bd32YZ0K.js"))
  },
  {
    id: "git-rebase",
    name: "Git Rebase Message",
    import: (() => import("./git-rebase-ZWUFO_T4.js"))
  },
  {
    id: "gleam",
    name: "Gleam",
    import: (() => import("./gleam-Bv284lvN.js"))
  },
  {
    id: "glimmer-js",
    name: "Glimmer JS",
    aliases: [
      "gjs"
    ],
    import: (() => import("./glimmer-js-DkxNrfPT.js"))
  },
  {
    id: "glimmer-ts",
    name: "Glimmer TS",
    aliases: [
      "gts"
    ],
    import: (() => import("./glimmer-ts-D6YZEmK_.js"))
  },
  {
    id: "glsl",
    name: "GLSL",
    import: (() => import("./glsl-CkUcVZNK.js"))
  },
  {
    id: "gn",
    name: "GN",
    import: (() => import("./gn-XtJxiLa4.js"))
  },
  {
    id: "gnuplot",
    name: "Gnuplot",
    import: (() => import("./gnuplot-yPG9-sE_.js"))
  },
  {
    id: "go",
    name: "Go",
    import: (() => import("./go-CvFNMTvu.js"))
  },
  {
    id: "graphql",
    name: "GraphQL",
    aliases: [
      "gql"
    ],
    import: (() => import("./graphql-CBu2ehBn.js"))
  },
  {
    id: "groovy",
    name: "Groovy",
    import: (() => import("./groovy-CJQTphOW.js"))
  },
  {
    id: "hack",
    name: "Hack",
    import: (() => import("./hack-ItRNKiEb.js"))
  },
  {
    id: "haml",
    name: "Ruby Haml",
    import: (() => import("./haml-NZLVzu_R.js"))
  },
  {
    id: "handlebars",
    name: "Handlebars",
    aliases: [
      "hbs"
    ],
    import: (() => import("./handlebars-mxStpSE7.js"))
  },
  {
    id: "haskell",
    name: "Haskell",
    aliases: [
      "hs"
    ],
    import: (() => import("./haskell-WeIwNIP6.js"))
  },
  {
    id: "haxe",
    name: "Haxe",
    import: (() => import("./haxe-TztHsm5T.js"))
  },
  {
    id: "hcl",
    name: "HashiCorp HCL",
    import: (() => import("./hcl-D438OF-I.js"))
  },
  {
    id: "hjson",
    name: "Hjson",
    import: (() => import("./hjson-DYBUbqOl.js"))
  },
  {
    id: "hlsl",
    name: "HLSL",
    import: (() => import("./hlsl-Bk8TCZNL.js"))
  },
  {
    id: "html",
    name: "HTML",
    import: (() => import("./html-B50bmoVb.js"))
  },
  {
    id: "html-derivative",
    name: "HTML (Derivative)",
    import: (() => import("./html-derivative-C6bxFbFW.js"))
  },
  {
    id: "http",
    name: "HTTP",
    import: (() => import("./http-DLvAkeD-.js"))
  },
  {
    id: "hurl",
    name: "Hurl",
    import: (() => import("./hurl-CgkFN90t.js"))
  },
  {
    id: "hxml",
    name: "HXML",
    import: (() => import("./hxml-GbqSQCLa.js"))
  },
  {
    id: "hy",
    name: "Hy",
    import: (() => import("./hy-Brt5EZ7-.js"))
  },
  {
    id: "imba",
    name: "Imba",
    import: (() => import("./imba-CimUv-Uh.js"))
  },
  {
    id: "ini",
    name: "INI",
    aliases: [
      "properties"
    ],
    import: (() => import("./ini-BZIuRIvJ.js"))
  },
  {
    id: "java",
    name: "Java",
    import: (() => import("./java-DY6VlHhP.js"))
  },
  {
    id: "javascript",
    name: "JavaScript",
    aliases: [
      "js",
      "cjs",
      "mjs"
    ],
    import: (() => import("./javascript-C25yR2R2.js"))
  },
  {
    id: "jinja",
    name: "Jinja",
    import: (() => import("./jinja-CFW5uAwY.js"))
  },
  {
    id: "jison",
    name: "Jison",
    import: (() => import("./jison-DdreslRX.js"))
  },
  {
    id: "json",
    name: "JSON",
    import: (() => import("./json-DxJze_jm.js"))
  },
  {
    id: "json5",
    name: "JSON5",
    import: (() => import("./json5-BT4Fjg39.js"))
  },
  {
    id: "jsonc",
    name: "JSON with Comments",
    import: (() => import("./jsonc-CHjZD8gR.js"))
  },
  {
    id: "jsonl",
    name: "JSON Lines",
    import: (() => import("./jsonl-BGuvDmy9.js"))
  },
  {
    id: "jsonnet",
    name: "Jsonnet",
    import: (() => import("./jsonnet-Bx2cfsXg.js"))
  },
  {
    id: "jssm",
    name: "JSSM",
    aliases: [
      "fsl"
    ],
    import: (() => import("./jssm-BcADi6EI.js"))
  },
  {
    id: "jsx",
    name: "JSX",
    import: (() => import("./jsx-BtKADgXT.js"))
  },
  {
    id: "julia",
    name: "Julia",
    aliases: [
      "jl"
    ],
    import: (() => import("./julia-CZiKXNNP.js"))
  },
  {
    id: "just",
    name: "Just",
    import: (() => import("./just-CEK2SJ_k.js"))
  },
  {
    id: "kdl",
    name: "KDL",
    import: (() => import("./kdl-BNOv9TC3.js"))
  },
  {
    id: "kotlin",
    name: "Kotlin",
    aliases: [
      "kt",
      "kts"
    ],
    import: (() => import("./kotlin-ByBMgTeR.js"))
  },
  {
    id: "kusto",
    name: "Kusto",
    aliases: [
      "kql"
    ],
    import: (() => import("./kusto-DH_XitHS.js"))
  },
  {
    id: "latex",
    name: "LaTeX",
    import: (() => import("./latex-B8Egmqc5.js"))
  },
  {
    id: "lean",
    name: "Lean 4",
    aliases: [
      "lean4"
    ],
    import: (() => import("./lean-BnVxaZxY.js"))
  },
  {
    id: "less",
    name: "Less",
    import: (() => import("./less-B1GLI2Di.js"))
  },
  {
    id: "liquid",
    name: "Liquid",
    import: (() => import("./liquid-CHzkx3jT.js"))
  },
  {
    id: "llvm",
    name: "LLVM IR",
    import: (() => import("./llvm-Bk2XctFf.js"))
  },
  {
    id: "log",
    name: "Log file",
    import: (() => import("./log-Al8wyEFV.js"))
  },
  {
    id: "logo",
    name: "Logo",
    import: (() => import("./logo-DBa4JDzV.js"))
  },
  {
    id: "lua",
    name: "Lua",
    import: (() => import("./lua-Bp3IRv7I.js"))
  },
  {
    id: "luau",
    name: "Luau",
    import: (() => import("./luau-UQyhudEE.js"))
  },
  {
    id: "make",
    name: "Makefile",
    aliases: [
      "makefile"
    ],
    import: (() => import("./make-CsMclxtr.js"))
  },
  {
    id: "markdown",
    name: "Markdown",
    aliases: [
      "md"
    ],
    import: (() => import("./markdown-CrScaQ96.js"))
  },
  {
    id: "marko",
    name: "Marko",
    import: (() => import("./marko-CJBA24Ri.js"))
  },
  {
    id: "matlab",
    name: "MATLAB",
    import: (() => import("./matlab-BOAaUVP0.js"))
  },
  {
    id: "mdc",
    name: "MDC",
    import: (() => import("./mdc-C9YSUwVC.js"))
  },
  {
    id: "mdx",
    name: "MDX",
    import: (() => import("./mdx-BOhZZUJ8.js"))
  },
  {
    id: "mermaid",
    name: "Mermaid",
    aliases: [
      "mmd"
    ],
    import: (() => import("./mermaid-C3rz4dYh.js"))
  },
  {
    id: "mipsasm",
    name: "MIPS Assembly",
    aliases: [
      "mips"
    ],
    import: (() => import("./mipsasm-CTx18fBl.js"))
  },
  {
    id: "mojo",
    name: "Mojo",
    import: (() => import("./mojo-EIZIZRTQ.js"))
  },
  {
    id: "moonbit",
    name: "MoonBit",
    aliases: [
      "mbt",
      "mbti"
    ],
    import: (() => import("./moonbit-B1TV0fG3.js"))
  },
  {
    id: "move",
    name: "Move",
    import: (() => import("./move-Db4ltDq1.js"))
  },
  {
    id: "narrat",
    name: "Narrat Language",
    aliases: [
      "nar"
    ],
    import: (() => import("./narrat-DmhDCBs-.js"))
  },
  {
    id: "nextflow",
    name: "Nextflow",
    aliases: [
      "nf"
    ],
    import: (() => import("./nextflow-47kAzSl1.js"))
  },
  {
    id: "nextflow-groovy",
    name: "nextflow-groovy",
    import: (() => import("./nextflow-groovy-Drz_2V0j.js"))
  },
  {
    id: "nginx",
    name: "Nginx",
    import: (() => import("./nginx-D7O4WoB1.js"))
  },
  {
    id: "nim",
    name: "Nim",
    import: (() => import("./nim-QAjRdh9w.js"))
  },
  {
    id: "nix",
    name: "Nix",
    import: (() => import("./nix-fTRXMGic.js"))
  },
  {
    id: "nushell",
    name: "nushell",
    aliases: [
      "nu"
    ],
    import: (() => import("./nushell-BGCPRlV5.js"))
  },
  {
    id: "objective-c",
    name: "Objective-C",
    aliases: [
      "objc"
    ],
    import: (() => import("./objective-c-Itk8tzmv.js"))
  },
  {
    id: "objective-cpp",
    name: "Objective-C++",
    import: (() => import("./objective-cpp-DGt5UKRO.js"))
  },
  {
    id: "ocaml",
    name: "OCaml",
    import: (() => import("./ocaml-eSVK32Eg.js"))
  },
  {
    id: "odin",
    name: "Odin",
    import: (() => import("./odin-BItnF517.js"))
  },
  {
    id: "openscad",
    name: "OpenSCAD",
    aliases: [
      "scad"
    ],
    import: (() => import("./openscad-Sp5uZ6f2.js"))
  },
  {
    id: "pascal",
    name: "Pascal",
    import: (() => import("./pascal-xy8pJNns.js"))
  },
  {
    id: "perl",
    name: "Perl",
    import: (() => import("./perl-DkVrgJBg.js"))
  },
  {
    id: "php",
    name: "PHP",
    import: (() => import("./php-BIzsF_5x.js"))
  },
  {
    id: "pkl",
    name: "Pkl",
    import: (() => import("./pkl-C-zSNmaA.js"))
  },
  {
    id: "plsql",
    name: "PL/SQL",
    import: (() => import("./plsql-pVbGZfOv.js"))
  },
  {
    id: "po",
    name: "Gettext PO",
    aliases: [
      "pot",
      "potx"
    ],
    import: (() => import("./po-BNfHvqmm.js"))
  },
  {
    id: "polar",
    name: "Polar",
    import: (() => import("./polar-CAZahv3u.js"))
  },
  {
    id: "postcss",
    name: "PostCSS",
    import: (() => import("./postcss-05aHdL-n.js"))
  },
  {
    id: "powerquery",
    name: "PowerQuery",
    import: (() => import("./powerquery-DI9HkTvs.js"))
  },
  {
    id: "powershell",
    name: "PowerShell",
    aliases: [
      "ps",
      "ps1"
    ],
    import: (() => import("./powershell-Clc4ydu-.js"))
  },
  {
    id: "prisma",
    name: "Prisma",
    import: (() => import("./prisma-FZjmVtSl.js"))
  },
  {
    id: "prolog",
    name: "Prolog",
    import: (() => import("./prolog-C5-yg4TO.js"))
  },
  {
    id: "proto",
    name: "Protocol Buffer 3",
    aliases: [
      "protobuf"
    ],
    import: (() => import("./proto-C7QgialS.js"))
  },
  {
    id: "pug",
    name: "Pug",
    aliases: [
      "jade"
    ],
    import: (() => import("./pug-XOw9Q1Ho.js"))
  },
  {
    id: "puppet",
    name: "Puppet",
    import: (() => import("./puppet-CUJHmnxV.js"))
  },
  {
    id: "purescript",
    name: "PureScript",
    import: (() => import("./purescript-rUfGld-4.js"))
  },
  {
    id: "python",
    name: "Python",
    aliases: [
      "py"
    ],
    import: (() => import("./python-BFNSHbwJ.js"))
  },
  {
    id: "qml",
    name: "QML",
    import: (() => import("./qml-rTNXsquU.js"))
  },
  {
    id: "qmldir",
    name: "QML Directory",
    import: (() => import("./qmldir-BInDYbpo.js"))
  },
  {
    id: "qss",
    name: "Qt Style Sheets",
    import: (() => import("./qss-AeJTysr_.js"))
  },
  {
    id: "r",
    name: "R",
    import: (() => import("./r-CSmzDPi7.js"))
  },
  {
    id: "racket",
    name: "Racket",
    import: (() => import("./racket-B83wSAja.js"))
  },
  {
    id: "raku",
    name: "Raku",
    aliases: [
      "perl6"
    ],
    import: (() => import("./raku-nEQ4ZJJ7.js"))
  },
  {
    id: "razor",
    name: "ASP.NET Razor",
    import: (() => import("./razor-Ci8D0dQK.js"))
  },
  {
    id: "reg",
    name: "Windows Registry Script",
    import: (() => import("./reg-m_s_Kiip.js"))
  },
  {
    id: "regexp",
    name: "RegExp",
    aliases: [
      "regex"
    ],
    import: (() => import("./regexp-BazyLpPg.js"))
  },
  {
    id: "rel",
    name: "Rel",
    import: (() => import("./rel-BcRfyd6Q.js"))
  },
  {
    id: "riscv",
    name: "RISC-V",
    import: (() => import("./riscv-Ce8MAQLP.js"))
  },
  {
    id: "ron",
    name: "RON",
    import: (() => import("./ron-DCEEQypA.js"))
  },
  {
    id: "rosmsg",
    name: "ROS Interface",
    import: (() => import("./rosmsg-Cz0w1km8.js"))
  },
  {
    id: "rst",
    name: "reStructuredText",
    import: (() => import("./rst-DM32Wy3O.js"))
  },
  {
    id: "ruby",
    name: "Ruby",
    aliases: [
      "rb"
    ],
    import: (() => import("./ruby-BeqCs27h.js"))
  },
  {
    id: "rust",
    name: "Rust",
    aliases: [
      "rs"
    ],
    import: (() => import("./rust-CLzF9zIN.js"))
  },
  {
    id: "sas",
    name: "SAS",
    import: (() => import("./sas-fpEvgATw.js"))
  },
  {
    id: "sass",
    name: "Sass",
    import: (() => import("./sass-DxHp5rTx.js"))
  },
  {
    id: "scala",
    name: "Scala",
    import: (() => import("./scala-D4grkFkl.js"))
  },
  {
    id: "scheme",
    name: "Scheme",
    import: (() => import("./scheme-BCRWuEm4.js"))
  },
  {
    id: "scss",
    name: "SCSS",
    import: (() => import("./scss-B1FaCqwR.js"))
  },
  {
    id: "sdbl",
    name: "1C (Query)",
    aliases: [
      "1c-query"
    ],
    import: (() => import("./sdbl-B7T8abf4.js"))
  },
  {
    id: "shaderlab",
    name: "ShaderLab",
    aliases: [
      "shader"
    ],
    import: (() => import("./shaderlab-Cr62-Wb4.js"))
  },
  {
    id: "shellscript",
    name: "Shell",
    aliases: [
      "bash",
      "sh",
      "shell",
      "zsh"
    ],
    import: (() => import("./shellscript-InADTalH.js"))
  },
  {
    id: "shellsession",
    name: "Shell Session",
    aliases: [
      "console"
    ],
    import: (() => import("./shellsession-DiDJNQdy.js"))
  },
  {
    id: "smalltalk",
    name: "Smalltalk",
    import: (() => import("./smalltalk-BlI1_OkM.js"))
  },
  {
    id: "solidity",
    name: "Solidity",
    import: (() => import("./solidity-DUWnFhS6.js"))
  },
  {
    id: "soy",
    name: "Closure Templates",
    aliases: [
      "closure-templates"
    ],
    import: (() => import("./soy-C1-6njHa.js"))
  },
  {
    id: "sparql",
    name: "SPARQL",
    import: (() => import("./sparql-B0KWFEri.js"))
  },
  {
    id: "splunk",
    name: "Splunk Query Language",
    aliases: [
      "spl"
    ],
    import: (() => import("./splunk-CRXR8A9s.js"))
  },
  {
    id: "sql",
    name: "SQL",
    import: (() => import("./sql-Cn_v3PB0.js"))
  },
  {
    id: "ssh-config",
    name: "SSH Config",
    import: (() => import("./ssh-config-DP-hNVbF.js"))
  },
  {
    id: "stata",
    name: "Stata",
    import: (() => import("./stata-B8c5fTjX.js"))
  },
  {
    id: "stylus",
    name: "Stylus",
    aliases: [
      "styl"
    ],
    import: (() => import("./stylus-CyKEU1Ej.js"))
  },
  {
    id: "surrealql",
    name: "SurrealQL",
    aliases: [
      "surql"
    ],
    import: (() => import("./surrealql-CQi7GQN7.js"))
  },
  {
    id: "svelte",
    name: "Svelte",
    import: (() => import("./svelte-rYri41WT.js"))
  },
  {
    id: "swift",
    name: "Swift",
    import: (() => import("./swift-DJpUqPLg.js"))
  },
  {
    id: "system-verilog",
    name: "SystemVerilog",
    import: (() => import("./system-verilog-BCm7smPJ.js"))
  },
  {
    id: "systemd",
    name: "Systemd Units",
    import: (() => import("./systemd-C-4qm6XH.js"))
  },
  {
    id: "talonscript",
    name: "TalonScript",
    aliases: [
      "talon"
    ],
    import: (() => import("./talonscript-CFF3LF_O.js"))
  },
  {
    id: "tasl",
    name: "Tasl",
    import: (() => import("./tasl-Cg_WBUAe.js"))
  },
  {
    id: "tcl",
    name: "Tcl",
    import: (() => import("./tcl-DN7buRTF.js"))
  },
  {
    id: "templ",
    name: "Templ",
    import: (() => import("./templ-Crs9Ui8q.js"))
  },
  {
    id: "terraform",
    name: "Terraform",
    aliases: [
      "tf",
      "tfvars"
    ],
    import: (() => import("./terraform-DGvcn9zM.js"))
  },
  {
    id: "tex",
    name: "TeX",
    import: (() => import("./tex-AHxmLTL0.js"))
  },
  {
    id: "toml",
    name: "TOML",
    import: (() => import("./toml-DY62mUL_.js"))
  },
  {
    id: "ts-tags",
    name: "TypeScript with Tags",
    aliases: [
      "lit"
    ],
    import: (() => import("./ts-tags-ioVe2PKw.js"))
  },
  {
    id: "tsv",
    name: "TSV",
    import: (() => import("./tsv-BtvSkaG0.js"))
  },
  {
    id: "tsx",
    name: "TSX",
    import: (() => import("./tsx-B8rCNbgL.js"))
  },
  {
    id: "turtle",
    name: "Turtle",
    import: (() => import("./turtle-_H59FV7D.js"))
  },
  {
    id: "twig",
    name: "Twig",
    import: (() => import("./twig-DwV2Fi4L.js"))
  },
  {
    id: "typescript",
    name: "TypeScript",
    aliases: [
      "ts",
      "cts",
      "mts"
    ],
    import: (() => import("./typescript-RycA9KXf.js"))
  },
  {
    id: "typespec",
    name: "TypeSpec",
    aliases: [
      "tsp"
    ],
    import: (() => import("./typespec-DWqp-kUU.js"))
  },
  {
    id: "typst",
    name: "Typst",
    aliases: [
      "typ"
    ],
    import: (() => import("./typst-D_1QKWns.js"))
  },
  {
    id: "v",
    name: "V",
    import: (() => import("./v-BPCNiyYe.js"))
  },
  {
    id: "vala",
    name: "Vala",
    import: (() => import("./vala-uxaPR7d1.js"))
  },
  {
    id: "vb",
    name: "Visual Basic",
    aliases: [
      "cmd"
    ],
    import: (() => import("./vb-D8_c5-KN.js"))
  },
  {
    id: "verilog",
    name: "Verilog",
    import: (() => import("./verilog-B-bybjPF.js"))
  },
  {
    id: "vhdl",
    name: "VHDL",
    import: (() => import("./vhdl-CUlNa8ac.js"))
  },
  {
    id: "viml",
    name: "Vim Script",
    aliases: [
      "vim",
      "vimscript"
    ],
    import: (() => import("./viml-DsfA-sWm.js"))
  },
  {
    id: "vue",
    name: "Vue",
    import: (() => import("./vue-DXEmyXn9.js"))
  },
  {
    id: "vue-html",
    name: "Vue HTML",
    import: (() => import("./vue-html-j9xNEdu3.js"))
  },
  {
    id: "vue-vine",
    name: "Vue Vine",
    import: (() => import("./vue-vine-D41-N99t.js"))
  },
  {
    id: "vyper",
    name: "Vyper",
    aliases: [
      "vy"
    ],
    import: (() => import("./vyper-CPQuu50u.js"))
  },
  {
    id: "wasm",
    name: "WebAssembly",
    import: (() => import("./wasm-BBXxrAl7.js"))
  },
  {
    id: "wenyan",
    name: "Wenyan",
    aliases: [
      "文言"
    ],
    import: (() => import("./wenyan-pbVjoM9_.js"))
  },
  {
    id: "wgsl",
    name: "WGSL",
    import: (() => import("./wgsl-DY4iK1q1.js"))
  },
  {
    id: "wikitext",
    name: "Wikitext",
    aliases: [
      "mediawiki",
      "wiki"
    ],
    import: (() => import("./wikitext-Z-MoUasO.js"))
  },
  {
    id: "wit",
    name: "WebAssembly Interface Types",
    import: (() => import("./wit-CQMQOlTg.js"))
  },
  {
    id: "wolfram",
    name: "Wolfram",
    aliases: [
      "wl"
    ],
    import: (() => import("./wolfram-Dz4KXISs.js"))
  },
  {
    id: "xml",
    name: "XML",
    import: (() => import("./xml-C2J0sS9M.js"))
  },
  {
    id: "xsl",
    name: "XSL",
    import: (() => import("./xsl-BmSZphgC.js"))
  },
  {
    id: "yaml",
    name: "YAML",
    aliases: [
      "yml"
    ],
    import: (() => import("./yaml-DaO7k5B1.js"))
  },
  {
    id: "zenscript",
    name: "ZenScript",
    import: (() => import("./zenscript-CxBjpf9c.js"))
  },
  {
    id: "zig",
    name: "Zig",
    import: (() => import("./zig-Vm0PO9wB.js"))
  }
], ho = Object.fromEntries(wn.map((t) => [t.id, t.import])), fo = Object.fromEntries(wn.flatMap((t) => t.aliases?.map((e) => [e, t.import]) || [])), go = {
  ...ho,
  ...fo
}, yo = [
  {
    id: "andromeeda",
    displayName: "Andromeeda",
    type: "dark",
    import: (() => import("./andromeeda-BbmzSJq1.js"))
  },
  {
    id: "aurora-x",
    displayName: "Aurora X",
    type: "dark",
    import: (() => import("./aurora-x-BwoVEUWZ.js"))
  },
  {
    id: "ayu-dark",
    displayName: "Ayu Dark",
    type: "dark",
    import: (() => import("./ayu-dark-DJoqd4M9.js"))
  },
  {
    id: "ayu-light",
    displayName: "Ayu Light",
    type: "light",
    import: (() => import("./ayu-light-BzXEJRJ-.js"))
  },
  {
    id: "ayu-mirage",
    displayName: "Ayu Mirage",
    type: "dark",
    import: (() => import("./ayu-mirage-BJ2oZGzi.js"))
  },
  {
    id: "catppuccin-frappe",
    displayName: "Catppuccin Frappé",
    type: "dark",
    import: (() => import("./catppuccin-frappe-D3cH2rXe.js"))
  },
  {
    id: "catppuccin-latte",
    displayName: "Catppuccin Latte",
    type: "light",
    import: (() => import("./catppuccin-latte-C0LRGUW4.js"))
  },
  {
    id: "catppuccin-macchiato",
    displayName: "Catppuccin Macchiato",
    type: "dark",
    import: (() => import("./catppuccin-macchiato-c5wQ11TT.js"))
  },
  {
    id: "catppuccin-mocha",
    displayName: "Catppuccin Mocha",
    type: "dark",
    import: (() => import("./catppuccin-mocha-WMD6Qvya.js"))
  },
  {
    id: "dark-plus",
    displayName: "Dark Plus",
    type: "dark",
    import: (() => import("./dark-plus-pUHDTVV0.js"))
  },
  {
    id: "dracula",
    displayName: "Dracula Theme",
    type: "dark",
    import: (() => import("./dracula-BtZx2Kac.js"))
  },
  {
    id: "dracula-soft",
    displayName: "Dracula Theme Soft",
    type: "dark",
    import: (() => import("./dracula-soft-BKa-aqBv.js"))
  },
  {
    id: "everforest-dark",
    displayName: "Everforest Dark",
    type: "dark",
    import: (() => import("./everforest-dark-DMCBqXCK.js"))
  },
  {
    id: "everforest-light",
    displayName: "Everforest Light",
    type: "light",
    import: (() => import("./everforest-light-BbXl82Em.js"))
  },
  {
    id: "github-dark",
    displayName: "GitHub Dark",
    type: "dark",
    import: (() => import("./github-dark-DenFmJkN.js"))
  },
  {
    id: "github-dark-default",
    displayName: "GitHub Dark Default",
    type: "dark",
    import: (() => import("./github-dark-default-BJPUVz4H.js"))
  },
  {
    id: "github-dark-dimmed",
    displayName: "GitHub Dark Dimmed",
    type: "dark",
    import: (() => import("./github-dark-dimmed-DUshB20C.js"))
  },
  {
    id: "github-dark-high-contrast",
    displayName: "GitHub Dark High Contrast",
    type: "dark",
    import: (() => import("./github-dark-high-contrast-D3aGCnF8.js"))
  },
  {
    id: "github-light",
    displayName: "GitHub Light",
    type: "light",
    import: (() => import("./github-light-JYsPkUQd.js"))
  },
  {
    id: "github-light-default",
    displayName: "GitHub Light Default",
    type: "light",
    import: (() => import("./github-light-default-D99KPAby.js"))
  },
  {
    id: "github-light-high-contrast",
    displayName: "GitHub Light High Contrast",
    type: "light",
    import: (() => import("./github-light-high-contrast-BbmZE-Mp.js"))
  },
  {
    id: "gruvbox-dark-hard",
    displayName: "Gruvbox Dark Hard",
    type: "dark",
    import: (() => import("./gruvbox-dark-hard-C5HOtKIh.js"))
  },
  {
    id: "gruvbox-dark-medium",
    displayName: "Gruvbox Dark Medium",
    type: "dark",
    import: (() => import("./gruvbox-dark-medium-FVgwJHuz.js"))
  },
  {
    id: "gruvbox-dark-soft",
    displayName: "Gruvbox Dark Soft",
    type: "dark",
    import: (() => import("./gruvbox-dark-soft-B46F314v.js"))
  },
  {
    id: "gruvbox-light-hard",
    displayName: "Gruvbox Light Hard",
    type: "light",
    import: (() => import("./gruvbox-light-hard-CJD38wDZ.js"))
  },
  {
    id: "gruvbox-light-medium",
    displayName: "Gruvbox Light Medium",
    type: "light",
    import: (() => import("./gruvbox-light-medium-BlIhMYTA.js"))
  },
  {
    id: "gruvbox-light-soft",
    displayName: "Gruvbox Light Soft",
    type: "light",
    import: (() => import("./gruvbox-light-soft-DoPHyLVZ.js"))
  },
  {
    id: "horizon",
    displayName: "Horizon",
    type: "dark",
    import: (() => import("./horizon-CJQ10nlf.js"))
  },
  {
    id: "horizon-bright",
    displayName: "Horizon Bright",
    type: "dark",
    import: (() => import("./horizon-bright-CdkBZOMB.js"))
  },
  {
    id: "houston",
    displayName: "Houston",
    type: "dark",
    import: (() => import("./houston-BDYrDoDW.js"))
  },
  {
    id: "kanagawa-dragon",
    displayName: "Kanagawa Dragon",
    type: "dark",
    import: (() => import("./kanagawa-dragon-CiKur4Hl.js"))
  },
  {
    id: "kanagawa-lotus",
    displayName: "Kanagawa Lotus",
    type: "light",
    import: (() => import("./kanagawa-lotus-BKu-smKu.js"))
  },
  {
    id: "kanagawa-wave",
    displayName: "Kanagawa Wave",
    type: "dark",
    import: (() => import("./kanagawa-wave-CQwozSzG.js"))
  },
  {
    id: "laserwave",
    displayName: "LaserWave",
    type: "dark",
    import: (() => import("./laserwave-6a00oqik.js"))
  },
  {
    id: "light-plus",
    displayName: "Light Plus",
    type: "light",
    import: (() => import("./light-plus-CZuVqSLX.js"))
  },
  {
    id: "material-theme",
    displayName: "Material Theme",
    type: "dark",
    import: (() => import("./material-theme-D6KBX41T.js"))
  },
  {
    id: "material-theme-darker",
    displayName: "Material Theme Darker",
    type: "dark",
    import: (() => import("./material-theme-darker-CkRroheE.js"))
  },
  {
    id: "material-theme-lighter",
    displayName: "Material Theme Lighter",
    type: "light",
    import: (() => import("./material-theme-lighter-BUBw43Yz.js"))
  },
  {
    id: "material-theme-ocean",
    displayName: "Material Theme Ocean",
    type: "dark",
    import: (() => import("./material-theme-ocean-ClGX14Ja.js"))
  },
  {
    id: "material-theme-palenight",
    displayName: "Material Theme Palenight",
    type: "dark",
    import: (() => import("./material-theme-palenight-C1RVm8K1.js"))
  },
  {
    id: "min-dark",
    displayName: "Min Dark",
    type: "dark",
    import: (() => import("./min-dark-C7ak0t6c.js"))
  },
  {
    id: "min-light",
    displayName: "Min Light",
    type: "light",
    import: (() => import("./min-light-CKFxVcPp.js"))
  },
  {
    id: "monokai",
    displayName: "Monokai",
    type: "dark",
    import: (() => import("./monokai-C1KBYcO0.js"))
  },
  {
    id: "night-owl",
    displayName: "Night Owl",
    type: "dark",
    import: (() => import("./night-owl-Bm2rzalh.js"))
  },
  {
    id: "night-owl-light",
    displayName: "Night Owl Light",
    type: "light",
    import: (() => import("./night-owl-light-CBI5u5kw.js"))
  },
  {
    id: "nord",
    displayName: "Nord",
    type: "dark",
    import: (() => import("./nord-CC5OiUXg.js"))
  },
  {
    id: "one-dark-pro",
    displayName: "One Dark Pro",
    type: "dark",
    import: (() => import("./one-dark-pro-DTA3VF0_.js"))
  },
  {
    id: "one-light",
    displayName: "One Light",
    type: "light",
    import: (() => import("./one-light-LkMrt1Cf.js"))
  },
  {
    id: "plastic",
    displayName: "Plastic",
    type: "dark",
    import: (() => import("./plastic-CSTz3KZp.js"))
  },
  {
    id: "poimandres",
    displayName: "Poimandres",
    type: "dark",
    import: (() => import("./poimandres-C-VADXHD.js"))
  },
  {
    id: "red",
    displayName: "Red",
    type: "dark",
    import: (() => import("./red-7y8PH7HH.js"))
  },
  {
    id: "rose-pine",
    displayName: "Rosé Pine",
    type: "dark",
    import: (() => import("./rose-pine-BKc3yVeu.js"))
  },
  {
    id: "rose-pine-dawn",
    displayName: "Rosé Pine Dawn",
    type: "light",
    import: (() => import("./rose-pine-dawn-BulJcPZT.js"))
  },
  {
    id: "rose-pine-moon",
    displayName: "Rosé Pine Moon",
    type: "dark",
    import: (() => import("./rose-pine-moon-j6jiXKV8.js"))
  },
  {
    id: "slack-dark",
    displayName: "Slack Dark",
    type: "dark",
    import: (() => import("./slack-dark-i7wN4OET.js"))
  },
  {
    id: "slack-ochin",
    displayName: "Slack Ochin",
    type: "light",
    import: (() => import("./slack-ochin-ndHf0LoP.js"))
  },
  {
    id: "snazzy-light",
    displayName: "Snazzy Light",
    type: "light",
    import: (() => import("./snazzy-light-BlSJXAu4.js"))
  },
  {
    id: "solarized-dark",
    displayName: "Solarized Dark",
    type: "dark",
    import: (() => import("./solarized-dark-UTmkh7lw.js"))
  },
  {
    id: "solarized-light",
    displayName: "Solarized Light",
    type: "light",
    import: (() => import("./solarized-light-BheCkDPT.js"))
  },
  {
    id: "synthwave-84",
    displayName: "Synthwave '84",
    type: "dark",
    import: (() => import("./synthwave-84-NU3C_KFZ.js"))
  },
  {
    id: "tokyo-night",
    displayName: "Tokyo Night",
    type: "dark",
    import: (() => import("./tokyo-night-DP4TmcQl.js"))
  },
  {
    id: "vesper",
    displayName: "Vesper",
    type: "dark",
    import: (() => import("./vesper-BckBta1U.js"))
  },
  {
    id: "vitesse-black",
    displayName: "Vitesse Black",
    type: "dark",
    import: (() => import("./vitesse-black-BoGvW84i.js"))
  },
  {
    id: "vitesse-dark",
    displayName: "Vitesse Dark",
    type: "dark",
    import: (() => import("./vitesse-dark-Cym-eLtO.js"))
  },
  {
    id: "vitesse-light",
    displayName: "Vitesse Light",
    type: "light",
    import: (() => import("./vitesse-light-CcmG315c.js"))
  }
], bo = Object.fromEntries(yo.map((t) => [t.id, t.import]));
class st extends Error {
  constructor(e) {
    super(e), this.name = "ShikiError";
  }
}
function _o() {
  return 2147483648;
}
function So() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
const ko = (t, e) => t + (e - t % e) % e;
async function wo(t) {
  let e, n;
  const r = {};
  function i(p) {
    n = p, r.HEAPU8 = new Uint8Array(p), r.HEAPU32 = new Uint32Array(p);
  }
  function o(p, h, b) {
    r.HEAPU8.copyWithin(p, h, h + b);
  }
  function s(p) {
    try {
      return e.grow(p - n.byteLength + 65535 >>> 16), i(e.buffer), 1;
    } catch {
    }
  }
  function l(p) {
    const h = r.HEAPU8.length;
    p = p >>> 0;
    const b = _o();
    if (p > b)
      return !1;
    for (let S = 1; S <= 4; S *= 2) {
      let y = h * (1 + 0.2 / S);
      y = Math.min(y, p + 100663296);
      const _ = Math.min(b, ko(Math.max(p, y), 65536));
      if (s(_))
        return !0;
    }
    return !1;
  }
  const a = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
  function c(p, h, b = 1024) {
    const S = h + b;
    let y = h;
    for (; p[y] && !(y >= S); ) ++y;
    if (y - h > 16 && p.buffer && a)
      return a.decode(p.subarray(h, y));
    let _ = "";
    for (; h < y; ) {
      let g = p[h++];
      if (!(g & 128)) {
        _ += String.fromCharCode(g);
        continue;
      }
      const w = p[h++] & 63;
      if ((g & 224) === 192) {
        _ += String.fromCharCode((g & 31) << 6 | w);
        continue;
      }
      const v = p[h++] & 63;
      if ((g & 240) === 224 ? g = (g & 15) << 12 | w << 6 | v : g = (g & 7) << 18 | w << 12 | v << 6 | p[h++] & 63, g < 65536)
        _ += String.fromCharCode(g);
      else {
        const I = g - 65536;
        _ += String.fromCharCode(55296 | I >> 10, 56320 | I & 1023);
      }
    }
    return _;
  }
  function u(p, h) {
    return p ? c(r.HEAPU8, p, h) : "";
  }
  const m = {
    emscripten_get_now: So,
    emscripten_memcpy_big: o,
    emscripten_resize_heap: l,
    fd_write: () => 0
  };
  async function d() {
    const h = await t({
      env: m,
      wasi_snapshot_preview1: m
    });
    e = h.memory, i(e.buffer), Object.assign(r, h), r.UTF8ToString = u;
  }
  return await d(), r;
}
var Co = Object.defineProperty, vo = (t, e, n) => e in t ? Co(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, L = (t, e, n) => vo(t, typeof e != "symbol" ? e + "" : e, n);
let A = null;
function To(t) {
  throw new st(t.UTF8ToString(t.getLastOnigError()));
}
class Re {
  constructor(e) {
    L(this, "utf16Length"), L(this, "utf8Length"), L(this, "utf16Value"), L(this, "utf8Value"), L(this, "utf16OffsetToUtf8"), L(this, "utf8OffsetToUtf16");
    const n = e.length, r = Re._utf8ByteLength(e), i = r !== n, o = i ? new Uint32Array(n + 1) : null;
    i && (o[n] = r);
    const s = i ? new Uint32Array(r + 1) : null;
    i && (s[r] = n);
    const l = new Uint8Array(r);
    let a = 0;
    for (let c = 0; c < n; c++) {
      const u = e.charCodeAt(c);
      let m = u, d = !1;
      if (u >= 55296 && u <= 56319 && c + 1 < n) {
        const p = e.charCodeAt(c + 1);
        p >= 56320 && p <= 57343 && (m = (u - 55296 << 10) + 65536 | p - 56320, d = !0);
      }
      i && (o[c] = a, d && (o[c + 1] = a), m <= 127 ? s[a + 0] = c : m <= 2047 ? (s[a + 0] = c, s[a + 1] = c) : m <= 65535 ? (s[a + 0] = c, s[a + 1] = c, s[a + 2] = c) : (s[a + 0] = c, s[a + 1] = c, s[a + 2] = c, s[a + 3] = c)), m <= 127 ? l[a++] = m : m <= 2047 ? (l[a++] = 192 | (m & 1984) >>> 6, l[a++] = 128 | (m & 63) >>> 0) : m <= 65535 ? (l[a++] = 224 | (m & 61440) >>> 12, l[a++] = 128 | (m & 4032) >>> 6, l[a++] = 128 | (m & 63) >>> 0) : (l[a++] = 240 | (m & 1835008) >>> 18, l[a++] = 128 | (m & 258048) >>> 12, l[a++] = 128 | (m & 4032) >>> 6, l[a++] = 128 | (m & 63) >>> 0), d && c++;
    }
    this.utf16Length = n, this.utf8Length = r, this.utf16Value = e, this.utf8Value = l, this.utf16OffsetToUtf8 = o, this.utf8OffsetToUtf16 = s;
  }
  static _utf8ByteLength(e) {
    let n = 0;
    for (let r = 0, i = e.length; r < i; r++) {
      const o = e.charCodeAt(r);
      let s = o, l = !1;
      if (o >= 55296 && o <= 56319 && r + 1 < i) {
        const a = e.charCodeAt(r + 1);
        a >= 56320 && a <= 57343 && (s = (o - 55296 << 10) + 65536 | a - 56320, l = !0);
      }
      s <= 127 ? n += 1 : s <= 2047 ? n += 2 : s <= 65535 ? n += 3 : n += 4, l && r++;
    }
    return n;
  }
  createString(e) {
    const n = e.omalloc(this.utf8Length);
    return e.HEAPU8.set(this.utf8Value, n), n;
  }
}
const Le = class D {
  constructor(e) {
    if (L(this, "id", ++D.LAST_ID), L(this, "_onigBinding"), L(this, "content"), L(this, "utf16Length"), L(this, "utf8Length"), L(this, "utf16OffsetToUtf8"), L(this, "utf8OffsetToUtf16"), L(this, "ptr"), !A)
      throw new st("Must invoke loadWasm first.");
    this._onigBinding = A, this.content = e;
    const n = new Re(e);
    this.utf16Length = n.utf16Length, this.utf8Length = n.utf8Length, this.utf16OffsetToUtf8 = n.utf16OffsetToUtf8, this.utf8OffsetToUtf16 = n.utf8OffsetToUtf16, this.utf8Length < 1e4 && !D._sharedPtrInUse ? (D._sharedPtr || (D._sharedPtr = A.omalloc(1e4)), D._sharedPtrInUse = !0, A.HEAPU8.set(n.utf8Value, D._sharedPtr), this.ptr = D._sharedPtr) : this.ptr = n.createString(A);
  }
  convertUtf8OffsetToUtf16(e) {
    return this.utf8OffsetToUtf16 ? e < 0 ? 0 : e > this.utf8Length ? this.utf16Length : this.utf8OffsetToUtf16[e] : e;
  }
  convertUtf16OffsetToUtf8(e) {
    return this.utf16OffsetToUtf8 ? e < 0 ? 0 : e > this.utf16Length ? this.utf8Length : this.utf16OffsetToUtf8[e] : e;
  }
  dispose() {
    this.ptr === D._sharedPtr ? D._sharedPtrInUse = !1 : this._onigBinding.ofree(this.ptr);
  }
};
L(Le, "LAST_ID", 0);
L(Le, "_sharedPtr", 0);
L(Le, "_sharedPtrInUse", !1);
let Cn = Le;
class Ro {
  constructor(e) {
    if (L(this, "_onigBinding"), L(this, "_ptr"), !A)
      throw new st("Must invoke loadWasm first.");
    const n = [], r = [];
    for (let l = 0, a = e.length; l < a; l++) {
      const c = new Re(e[l]);
      n[l] = c.createString(A), r[l] = c.utf8Length;
    }
    const i = A.omalloc(4 * e.length);
    A.HEAPU32.set(n, i / 4);
    const o = A.omalloc(4 * e.length);
    A.HEAPU32.set(r, o / 4);
    const s = A.createOnigScanner(i, o, e.length);
    for (let l = 0, a = e.length; l < a; l++)
      A.ofree(n[l]);
    A.ofree(o), A.ofree(i), s === 0 && To(A), this._onigBinding = A, this._ptr = s;
  }
  dispose() {
    this._onigBinding.freeOnigScanner(this._ptr);
  }
  findNextMatchSync(e, n, r) {
    let i = 0;
    if (typeof r == "number" && (i = r), typeof e == "string") {
      e = new Cn(e);
      const o = this._findNextMatchSync(e, n, !1, i);
      return e.dispose(), o;
    }
    return this._findNextMatchSync(e, n, !1, i);
  }
  _findNextMatchSync(e, n, r, i) {
    const o = this._onigBinding, s = o.findNextOnigScannerMatch(this._ptr, e.id, e.ptr, e.utf8Length, e.convertUtf16OffsetToUtf8(n), i);
    if (s === 0)
      return null;
    const l = o.HEAPU32;
    let a = s / 4;
    const c = l[a++], u = l[a++], m = [];
    for (let d = 0; d < u; d++) {
      const p = e.convertUtf8OffsetToUtf16(l[a++]), h = e.convertUtf8OffsetToUtf16(l[a++]);
      m[d] = {
        start: p,
        end: h,
        length: h - p
      };
    }
    return {
      index: c,
      captureIndices: m
    };
  }
}
function Lo(t) {
  return typeof t.instantiator == "function";
}
function No(t) {
  return typeof t.default == "function";
}
function Ao(t) {
  return typeof t.data < "u";
}
function xo(t) {
  return typeof Response < "u" && t instanceof Response;
}
function Po(t) {
  return typeof ArrayBuffer < "u" && (t instanceof ArrayBuffer || ArrayBuffer.isView(t)) || typeof Buffer < "u" && Buffer.isBuffer?.(t) || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer || typeof Uint32Array < "u" && t instanceof Uint32Array;
}
let me;
function Eo(t) {
  if (me)
    return me;
  async function e() {
    A = await wo(async (n) => {
      let r = t;
      return r = await r, typeof r == "function" && (r = await r(n)), typeof r == "function" && (r = await r(n)), Lo(r) ? r = await r.instantiator(n) : No(r) ? r = await r.default(n) : (Ao(r) && (r = r.data), xo(r) ? typeof WebAssembly.instantiateStreaming == "function" ? r = await Io(r)(n) : r = await Oo(r)(n) : Po(r) ? r = await De(r)(n) : r instanceof WebAssembly.Module ? r = await De(r)(n) : "default" in r && r.default instanceof WebAssembly.Module && (r = await De(r.default)(n))), "instance" in r && (r = r.instance), "exports" in r && (r = r.exports), r;
    });
  }
  return me = e(), me;
}
function De(t) {
  return (e) => WebAssembly.instantiate(t, e);
}
function Io(t) {
  return (e) => WebAssembly.instantiateStreaming(t, e);
}
function Oo(t) {
  return async (e) => {
    const n = await t.arrayBuffer();
    return WebAssembly.instantiate(n, e);
  };
}
async function Mo(t) {
  return t && await Eo(t), {
    createScanner(e) {
      return new Ro(e.map((n) => typeof n == "string" ? n : n.source));
    },
    createString(e) {
      return new Cn(e);
    }
  };
}
const Bo = /* @__PURE__ */ kn({
  langs: go,
  themes: bo,
  engine: () => Mo(import("./wasm-DQxwEHae.js"))
}), {
  codeToHtml: zo,
  codeToHast: qo,
  codeToTokens: Vo,
  codeToTokensBase: Ko,
  codeToTokensWithThemes: Jo,
  getSingletonHighlighter: Yo,
  getLastGrammarState: Xo
} = /* @__PURE__ */ po(
  Bo,
  { guessEmbeddedLanguages: xi }
);
export {
  R as ShikiError,
  un as addClassToHast,
  j as applyColorReplacements,
  go as bundledLanguages,
  fo as bundledLanguagesAlias,
  ho as bundledLanguagesBase,
  wn as bundledLanguagesInfo,
  bo as bundledThemes,
  yo as bundledThemesInfo,
  qo as codeToHast,
  zo as codeToHtml,
  Vo as codeToTokens,
  Ko as codeToTokensBase,
  Jo as codeToTokensWithThemes,
  kn as createBundledHighlighter,
  Wo as createCssVariablesTheme,
  Bo as createHighlighter,
  Sn as createHighlighterCore,
  Fo as createHighlighterCoreSync,
  Ai as createPositionConverter,
  co as createShikiInternal,
  _n as createShikiInternalSync,
  po as createSingletonShorthands,
  Ho as createdBundledHighlighter,
  jo as enableDeprecationWarnings,
  Oi as flatTokenVariants,
  Xo as getLastGrammarState,
  Yo as getSingletonHighlighter,
  Uo as getSingletonHighlighterCore,
  ke as getTokenStyleObject,
  xi as guessEmbeddedLanguages,
  oo as hastToHtml,
  tt as isNoneTheme,
  et as isPlainLang,
  ln as isSpecialLang,
  cn as isSpecialTheme,
  mo as makeSingletonHighlighter,
  uo as makeSingletonHighlighterCore,
  an as normalizeGetter,
  ot as normalizeTheme,
  Se as resolveColorReplacements,
  Ce as splitLines,
  Ei as splitToken,
  Ii as splitTokens,
  Je as stringifyTokenStyle,
  Ni as toArray,
  Vi as tokenizeAnsiWithTheme,
  Ji as tokenizeWithTheme,
  to as tokensToHast,
  Di as transformerDecorations,
  so as warnDeprecated
};
//# sourceMappingURL=bundle-full-gvvQC2VD.js.map
