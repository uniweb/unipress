import { f as hu } from "./fetch-C-PgllAm.js";
var fu = Object.defineProperty, du = Object.defineProperties, pu = Object.getOwnPropertyDescriptors, er = Object.getOwnPropertySymbols, Hs = Object.prototype.hasOwnProperty, qs = Object.prototype.propertyIsEnumerable, ci = (t, e, r) => e in t ? fu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, me = (t, e) => {
  for (var r in e || (e = {}))
    Hs.call(e, r) && ci(t, r, e[r]);
  if (er)
    for (var r of er(e))
      qs.call(e, r) && ci(t, r, e[r]);
  return t;
}, Ae = (t, e) => du(t, pu(e)), mu = (t, e) => {
  var r = {};
  for (var n in t)
    Hs.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
  if (t != null && er)
    for (var n of er(t))
      e.indexOf(n) < 0 && qs.call(t, n) && (r[n] = t[n]);
  return r;
}, re = (t, e, r) => ci(t, typeof e != "symbol" ? e + "" : e, r), wu = (t, e, r) => new Promise((n, u) => {
  var l = (h) => {
    try {
      a(r.next(h));
    } catch (k) {
      u(k);
    }
  }, f = (h) => {
    try {
      a(r.throw(h));
    } catch (k) {
      u(k);
    }
  }, a = (h) => h.done ? n(h.value) : Promise.resolve(h.value).then(l, f);
  a((r = r.apply(t, e)).next());
});
class tr {
  /**
   * Creates a new BaseXmlComponent with the specified XML element name.
   *
   * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
   */
  constructor(e) {
    re(this, "rootKey"), this.rootKey = e;
  }
}
const gu = Object.seal({});
class ae extends tr {
  /**
   * Creates a new XmlComponent.
   *
   * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
   */
  constructor(e) {
    super(e), re(this, "root"), this.root = new Array();
  }
  /**
   * Prepares this component and its children for XML serialization.
   *
   * This method is called by the Formatter to convert the component tree into
   * an object structure compatible with the xml library (https://www.npmjs.com/package/xml).
   * It recursively processes all children and handles special cases like
   * attribute-only elements and empty elements.
   *
   * The method can be overridden by subclasses to customize XML representation
   * or execute side effects during serialization (e.g., creating relationships).
   *
   * @param context - The serialization context containing document state
   * @returns The XML-serializable object, or undefined to exclude from output
   *
   * @example
   * ```typescript
   * // Override to add custom serialization logic
   * prepForXml(context: IContext): IXmlableObject | undefined {
   *   // Custom logic here
   *   return super.prepForXml(context);
   * }
   * ```
   */
  prepForXml(e) {
    var r;
    e.stack.push(this);
    const n = this.root.map((u) => u instanceof tr ? u.prepForXml(e) : u).filter((u) => u !== void 0);
    return e.stack.pop(), {
      [this.rootKey]: n.length ? n.length === 1 && ((r = n[0]) != null && r._attr) ? n[0] : n : gu
    };
  }
  /**
   * Adds a child element to this component.
   *
   * @deprecated Do not use this method. It is only used internally by the library. It will be removed in a future version.
   * @param child - The child component or text string to add
   * @returns This component (for chaining)
   */
  addChildElement(e) {
    return this.root.push(e), this;
  }
}
class Qe extends ae {
  constructor(e, r) {
    super(e), re(this, "includeIfEmpty"), this.includeIfEmpty = r;
  }
  /**
   * Prepares the component for XML serialization, excluding it if empty.
   *
   * @param context - The serialization context
   * @returns The XML-serializable object, or undefined if empty
   */
  prepForXml(e) {
    const r = super.prepForXml(e);
    if (this.includeIfEmpty || r && (typeof r[this.rootKey] != "object" || Object.keys(r[this.rootKey]).length))
      return r;
  }
}
class pe extends tr {
  /**
   * Creates a new attribute component.
   *
   * @param root - The attribute data object
   */
  constructor(e) {
    super("_attr"), re(this, "xmlKeys"), this.root = e;
  }
  /**
   * Converts the attribute data to an XML-serializable object.
   *
   * This method transforms the property names using xmlKeys (if defined)
   * and filters out undefined values.
   *
   * @param _ - Context (unused for attributes)
   * @returns Object with _attr key containing the mapped attributes
   */
  prepForXml(e) {
    const r = {};
    return Object.entries(this.root).forEach(([n, u]) => {
      if (u !== void 0) {
        const l = this.xmlKeys && this.xmlKeys[n] || n;
        r[l] = u;
      }
    }), { _attr: r };
  }
}
class Gs extends tr {
  /**
   * Creates a new NextAttributeComponent.
   *
   * @param root - Attribute payload with explicit key-value mappings
   */
  constructor(e) {
    super("_attr"), this.root = e;
  }
  /**
   * Converts the attribute payload to an XML-serializable object.
   *
   * Extracts the key and value from each property and filters out
   * undefined values.
   *
   * @param _ - Context (unused for attributes)
   * @returns Object with _attr key containing the attributes
   */
  prepForXml(e) {
    return { _attr: Object.values(this.root).filter(({ value: n }) => n !== void 0).reduce((n, { key: u, value: l }) => Ae(me({}, n), { [u]: l }), {}) };
  }
}
class Re extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      val: "w:val",
      color: "w:color",
      fill: "w:fill",
      space: "w:space",
      sz: "w:sz",
      type: "w:type",
      rsidR: "w:rsidR",
      rsidRPr: "w:rsidRPr",
      rsidSect: "w:rsidSect",
      w: "w:w",
      h: "w:h",
      top: "w:top",
      right: "w:right",
      bottom: "w:bottom",
      left: "w:left",
      header: "w:header",
      footer: "w:footer",
      gutter: "w:gutter",
      linePitch: "w:linePitch",
      pos: "w:pos"
    });
  }
}
var Pe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gi(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var dr = {}, Wt = { exports: {} }, Bi;
function yi() {
  if (Bi) return Wt.exports;
  Bi = 1;
  var t = typeof Reflect == "object" ? Reflect : null, e = t && typeof t.apply == "function" ? t.apply : function(x, F, B) {
    return Function.prototype.apply.call(x, F, B);
  }, r;
  t && typeof t.ownKeys == "function" ? r = t.ownKeys : Object.getOwnPropertySymbols ? r = function(x) {
    return Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
  } : r = function(x) {
    return Object.getOwnPropertyNames(x);
  };
  function n(c) {
    console && console.warn && console.warn(c);
  }
  var u = Number.isNaN || function(x) {
    return x !== x;
  };
  function l() {
    l.init.call(this);
  }
  Wt.exports = l, Wt.exports.once = o, l.EventEmitter = l, l.prototype._events = void 0, l.prototype._eventsCount = 0, l.prototype._maxListeners = void 0;
  var f = 10;
  function a(c) {
    if (typeof c != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof c);
  }
  Object.defineProperty(l, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return f;
    },
    set: function(c) {
      if (typeof c != "number" || c < 0 || u(c))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + c + ".");
      f = c;
    }
  }), l.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, l.prototype.setMaxListeners = function(x) {
    if (typeof x != "number" || x < 0 || u(x))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + x + ".");
    return this._maxListeners = x, this;
  };
  function h(c) {
    return c._maxListeners === void 0 ? l.defaultMaxListeners : c._maxListeners;
  }
  l.prototype.getMaxListeners = function() {
    return h(this);
  }, l.prototype.emit = function(x) {
    for (var F = [], B = 1; B < arguments.length; B++) F.push(arguments[B]);
    var z = x === "error", C = this._events;
    if (C !== void 0)
      z = z && C.error === void 0;
    else if (!z)
      return !1;
    if (z) {
      var $;
      if (F.length > 0 && ($ = F[0]), $ instanceof Error)
        throw $;
      var le = new Error("Unhandled error." + ($ ? " (" + $.message + ")" : ""));
      throw le.context = $, le;
    }
    var N = C[x];
    if (N === void 0)
      return !1;
    if (typeof N == "function")
      e(N, this, F);
    else
      for (var U = N.length, v = S(N, U), B = 0; B < U; ++B)
        e(v[B], this, F);
    return !0;
  };
  function k(c, x, F, B) {
    var z, C, $;
    if (a(F), C = c._events, C === void 0 ? (C = c._events = /* @__PURE__ */ Object.create(null), c._eventsCount = 0) : (C.newListener !== void 0 && (c.emit(
      "newListener",
      x,
      F.listener ? F.listener : F
    ), C = c._events), $ = C[x]), $ === void 0)
      $ = C[x] = F, ++c._eventsCount;
    else if (typeof $ == "function" ? $ = C[x] = B ? [F, $] : [$, F] : B ? $.unshift(F) : $.push(F), z = h(c), z > 0 && $.length > z && !$.warned) {
      $.warned = !0;
      var le = new Error("Possible EventEmitter memory leak detected. " + $.length + " " + String(x) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      le.name = "MaxListenersExceededWarning", le.emitter = c, le.type = x, le.count = $.length, n(le);
    }
    return c;
  }
  l.prototype.addListener = function(x, F) {
    return k(this, x, F, !1);
  }, l.prototype.on = l.prototype.addListener, l.prototype.prependListener = function(x, F) {
    return k(this, x, F, !0);
  };
  function A() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function R(c, x, F) {
    var B = { fired: !1, wrapFn: void 0, target: c, type: x, listener: F }, z = A.bind(B);
    return z.listener = F, B.wrapFn = z, z;
  }
  l.prototype.once = function(x, F) {
    return a(F), this.on(x, R(this, x, F)), this;
  }, l.prototype.prependOnceListener = function(x, F) {
    return a(F), this.prependListener(x, R(this, x, F)), this;
  }, l.prototype.removeListener = function(x, F) {
    var B, z, C, $, le;
    if (a(F), z = this._events, z === void 0)
      return this;
    if (B = z[x], B === void 0)
      return this;
    if (B === F || B.listener === F)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete z[x], z.removeListener && this.emit("removeListener", x, B.listener || F));
    else if (typeof B != "function") {
      for (C = -1, $ = B.length - 1; $ >= 0; $--)
        if (B[$] === F || B[$].listener === F) {
          le = B[$].listener, C = $;
          break;
        }
      if (C < 0)
        return this;
      C === 0 ? B.shift() : w(B, C), B.length === 1 && (z[x] = B[0]), z.removeListener !== void 0 && this.emit("removeListener", x, le || F);
    }
    return this;
  }, l.prototype.off = l.prototype.removeListener, l.prototype.removeAllListeners = function(x) {
    var F, B, z;
    if (B = this._events, B === void 0)
      return this;
    if (B.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : B[x] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete B[x]), this;
    if (arguments.length === 0) {
      var C = Object.keys(B), $;
      for (z = 0; z < C.length; ++z)
        $ = C[z], $ !== "removeListener" && this.removeAllListeners($);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (F = B[x], typeof F == "function")
      this.removeListener(x, F);
    else if (F !== void 0)
      for (z = F.length - 1; z >= 0; z--)
        this.removeListener(x, F[z]);
    return this;
  };
  function I(c, x, F) {
    var B = c._events;
    if (B === void 0)
      return [];
    var z = B[x];
    return z === void 0 ? [] : typeof z == "function" ? F ? [z.listener || z] : [z] : F ? T(z) : S(z, z.length);
  }
  l.prototype.listeners = function(x) {
    return I(this, x, !0);
  }, l.prototype.rawListeners = function(x) {
    return I(this, x, !1);
  }, l.listenerCount = function(c, x) {
    return typeof c.listenerCount == "function" ? c.listenerCount(x) : _.call(c, x);
  }, l.prototype.listenerCount = _;
  function _(c) {
    var x = this._events;
    if (x !== void 0) {
      var F = x[c];
      if (typeof F == "function")
        return 1;
      if (F !== void 0)
        return F.length;
    }
    return 0;
  }
  l.prototype.eventNames = function() {
    return this._eventsCount > 0 ? r(this._events) : [];
  };
  function S(c, x) {
    for (var F = new Array(x), B = 0; B < x; ++B)
      F[B] = c[B];
    return F;
  }
  function w(c, x) {
    for (; x + 1 < c.length; x++)
      c[x] = c[x + 1];
    c.pop();
  }
  function T(c) {
    for (var x = new Array(c.length), F = 0; F < x.length; ++F)
      x[F] = c[F].listener || c[F];
    return x;
  }
  function o(c, x) {
    return new Promise(function(F, B) {
      function z($) {
        c.removeListener(x, C), B($);
      }
      function C() {
        typeof c.removeListener == "function" && c.removeListener("error", z), F([].slice.call(arguments));
      }
      m(c, x, C, { once: !0 }), x !== "error" && g(c, z, { once: !0 });
    });
  }
  function g(c, x, F) {
    typeof c.on == "function" && m(c, "error", x, F);
  }
  function m(c, x, F, B) {
    if (typeof c.on == "function")
      B.once ? c.once(x, F) : c.on(x, F);
    else if (typeof c.addEventListener == "function")
      c.addEventListener(x, function z(C) {
        B.once && c.removeEventListener(x, z), F(C);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof c);
  }
  return Wt.exports;
}
var Ht = { exports: {} }, Li;
function et() {
  return Li || (Li = 1, typeof Object.create == "function" ? Ht.exports = function(e, r) {
    r && (e.super_ = r, e.prototype = Object.create(r.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : Ht.exports = function(e, r) {
    if (r) {
      e.super_ = r;
      var n = function() {
      };
      n.prototype = r.prototype, e.prototype = new n(), e.prototype.constructor = e;
    }
  }), Ht.exports;
}
function yu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ks = { exports: {} }, Ee = Ks.exports = {}, Me, Ue;
function hi() {
  throw new Error("setTimeout has not been defined");
}
function fi() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Me = setTimeout : Me = hi;
  } catch {
    Me = hi;
  }
  try {
    typeof clearTimeout == "function" ? Ue = clearTimeout : Ue = fi;
  } catch {
    Ue = fi;
  }
})();
function Vs(t) {
  if (Me === setTimeout)
    return setTimeout(t, 0);
  if ((Me === hi || !Me) && setTimeout)
    return Me = setTimeout, setTimeout(t, 0);
  try {
    return Me(t, 0);
  } catch {
    try {
      return Me.call(null, t, 0);
    } catch {
      return Me.call(this, t, 0);
    }
  }
}
function vu(t) {
  if (Ue === clearTimeout)
    return clearTimeout(t);
  if ((Ue === fi || !Ue) && clearTimeout)
    return Ue = clearTimeout, clearTimeout(t);
  try {
    return Ue(t);
  } catch {
    try {
      return Ue.call(null, t);
    } catch {
      return Ue.call(this, t);
    }
  }
}
var Ve = [], wt = !1, ot, Yt = -1;
function bu() {
  !wt || !ot || (wt = !1, ot.length ? Ve = ot.concat(Ve) : Yt = -1, Ve.length && Xs());
}
function Xs() {
  if (!wt) {
    var t = Vs(bu);
    wt = !0;
    for (var e = Ve.length; e; ) {
      for (ot = Ve, Ve = []; ++Yt < e; )
        ot && ot[Yt].run();
      Yt = -1, e = Ve.length;
    }
    ot = null, wt = !1, vu(t);
  }
}
Ee.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
  Ve.push(new $s(t, e)), Ve.length === 1 && !wt && Vs(Xs);
};
function $s(t, e) {
  this.fun = t, this.array = e;
}
$s.prototype.run = function() {
  this.fun.apply(null, this.array);
};
Ee.title = "browser";
Ee.browser = !0;
Ee.env = {};
Ee.argv = [];
Ee.version = "";
Ee.versions = {};
function $e() {
}
Ee.on = $e;
Ee.addListener = $e;
Ee.once = $e;
Ee.off = $e;
Ee.removeListener = $e;
Ee.removeAllListeners = $e;
Ee.emit = $e;
Ee.prependListener = $e;
Ee.prependOnceListener = $e;
Ee.listeners = function(t) {
  return [];
};
Ee.binding = function(t) {
  throw new Error("process.binding is not supported");
};
Ee.cwd = function() {
  return "/";
};
Ee.chdir = function(t) {
  throw new Error("process.chdir is not supported");
};
Ee.umask = function() {
  return 0;
};
var _u = Ks.exports;
const ge = /* @__PURE__ */ yu(_u);
var pr, Mi;
function Zs() {
  return Mi || (Mi = 1, pr = yi().EventEmitter), pr;
}
var mr = {}, St = {}, Ui;
function Eu() {
  if (Ui) return St;
  Ui = 1, St.byteLength = a, St.toByteArray = k, St.fromByteArray = I;
  for (var t = [], e = [], r = typeof Uint8Array < "u" ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, l = n.length; u < l; ++u)
    t[u] = n[u], e[n.charCodeAt(u)] = u;
  e[45] = 62, e[95] = 63;
  function f(_) {
    var S = _.length;
    if (S % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var w = _.indexOf("=");
    w === -1 && (w = S);
    var T = w === S ? 0 : 4 - w % 4;
    return [w, T];
  }
  function a(_) {
    var S = f(_), w = S[0], T = S[1];
    return (w + T) * 3 / 4 - T;
  }
  function h(_, S, w) {
    return (S + w) * 3 / 4 - w;
  }
  function k(_) {
    var S, w = f(_), T = w[0], o = w[1], g = new r(h(_, T, o)), m = 0, c = o > 0 ? T - 4 : T, x;
    for (x = 0; x < c; x += 4)
      S = e[_.charCodeAt(x)] << 18 | e[_.charCodeAt(x + 1)] << 12 | e[_.charCodeAt(x + 2)] << 6 | e[_.charCodeAt(x + 3)], g[m++] = S >> 16 & 255, g[m++] = S >> 8 & 255, g[m++] = S & 255;
    return o === 2 && (S = e[_.charCodeAt(x)] << 2 | e[_.charCodeAt(x + 1)] >> 4, g[m++] = S & 255), o === 1 && (S = e[_.charCodeAt(x)] << 10 | e[_.charCodeAt(x + 1)] << 4 | e[_.charCodeAt(x + 2)] >> 2, g[m++] = S >> 8 & 255, g[m++] = S & 255), g;
  }
  function A(_) {
    return t[_ >> 18 & 63] + t[_ >> 12 & 63] + t[_ >> 6 & 63] + t[_ & 63];
  }
  function R(_, S, w) {
    for (var T, o = [], g = S; g < w; g += 3)
      T = (_[g] << 16 & 16711680) + (_[g + 1] << 8 & 65280) + (_[g + 2] & 255), o.push(A(T));
    return o.join("");
  }
  function I(_) {
    for (var S, w = _.length, T = w % 3, o = [], g = 16383, m = 0, c = w - T; m < c; m += g)
      o.push(R(_, m, m + g > c ? c : m + g));
    return T === 1 ? (S = _[w - 1], o.push(
      t[S >> 2] + t[S << 4 & 63] + "=="
    )) : T === 2 && (S = (_[w - 2] << 8) + _[w - 1], o.push(
      t[S >> 10] + t[S >> 4 & 63] + t[S << 2 & 63] + "="
    )), o.join("");
  }
  return St;
}
var qt = {}, ji;
function xu() {
  return ji || (ji = 1, qt.read = function(t, e, r, n, u) {
    var l, f, a = u * 8 - n - 1, h = (1 << a) - 1, k = h >> 1, A = -7, R = r ? u - 1 : 0, I = r ? -1 : 1, _ = t[e + R];
    for (R += I, l = _ & (1 << -A) - 1, _ >>= -A, A += a; A > 0; l = l * 256 + t[e + R], R += I, A -= 8)
      ;
    for (f = l & (1 << -A) - 1, l >>= -A, A += n; A > 0; f = f * 256 + t[e + R], R += I, A -= 8)
      ;
    if (l === 0)
      l = 1 - k;
    else {
      if (l === h)
        return f ? NaN : (_ ? -1 : 1) * (1 / 0);
      f = f + Math.pow(2, n), l = l - k;
    }
    return (_ ? -1 : 1) * f * Math.pow(2, l - n);
  }, qt.write = function(t, e, r, n, u, l) {
    var f, a, h, k = l * 8 - u - 1, A = (1 << k) - 1, R = A >> 1, I = u === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _ = n ? 0 : l - 1, S = n ? 1 : -1, w = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, f = A) : (f = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -f)) < 1 && (f--, h *= 2), f + R >= 1 ? e += I / h : e += I * Math.pow(2, 1 - R), e * h >= 2 && (f++, h /= 2), f + R >= A ? (a = 0, f = A) : f + R >= 1 ? (a = (e * h - 1) * Math.pow(2, u), f = f + R) : (a = e * Math.pow(2, R - 1) * Math.pow(2, u), f = 0)); u >= 8; t[r + _] = a & 255, _ += S, a /= 256, u -= 8)
      ;
    for (f = f << u | a, k += u; k > 0; t[r + _] = f & 255, _ += S, f /= 256, k -= 8)
      ;
    t[r + _ - S] |= w * 128;
  }), qt;
}
var zi;
function ir() {
  return zi || (zi = 1, (function(t) {
    var e = Eu(), r = xu(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
    t.Buffer = a, t.SlowBuffer = g, t.INSPECT_MAX_BYTES = 50;
    var u = 2147483647;
    t.kMaxLength = u, a.TYPED_ARRAY_SUPPORT = l(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function l() {
      try {
        var E = new Uint8Array(1), i = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(i, Uint8Array.prototype), Object.setPrototypeOf(E, i), E.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(a.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (a.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(a.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (a.isBuffer(this))
          return this.byteOffset;
      }
    });
    function f(E) {
      if (E > u)
        throw new RangeError('The value "' + E + '" is invalid for option "size"');
      var i = new Uint8Array(E);
      return Object.setPrototypeOf(i, a.prototype), i;
    }
    function a(E, i, s) {
      if (typeof E == "number") {
        if (typeof i == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return R(E);
      }
      return h(E, i, s);
    }
    a.poolSize = 8192;
    function h(E, i, s) {
      if (typeof E == "string")
        return I(E, i);
      if (ArrayBuffer.isView(E))
        return S(E);
      if (E == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E
        );
      if (J(E, ArrayBuffer) || E && J(E.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (J(E, SharedArrayBuffer) || E && J(E.buffer, SharedArrayBuffer)))
        return w(E, i, s);
      if (typeof E == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      var p = E.valueOf && E.valueOf();
      if (p != null && p !== E)
        return a.from(p, i, s);
      var L = T(E);
      if (L) return L;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof E[Symbol.toPrimitive] == "function")
        return a.from(
          E[Symbol.toPrimitive]("string"),
          i,
          s
        );
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof E
      );
    }
    a.from = function(E, i, s) {
      return h(E, i, s);
    }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
    function k(E) {
      if (typeof E != "number")
        throw new TypeError('"size" argument must be of type number');
      if (E < 0)
        throw new RangeError('The value "' + E + '" is invalid for option "size"');
    }
    function A(E, i, s) {
      return k(E), E <= 0 ? f(E) : i !== void 0 ? typeof s == "string" ? f(E).fill(i, s) : f(E).fill(i) : f(E);
    }
    a.alloc = function(E, i, s) {
      return A(E, i, s);
    };
    function R(E) {
      return k(E), f(E < 0 ? 0 : o(E) | 0);
    }
    a.allocUnsafe = function(E) {
      return R(E);
    }, a.allocUnsafeSlow = function(E) {
      return R(E);
    };
    function I(E, i) {
      if ((typeof i != "string" || i === "") && (i = "utf8"), !a.isEncoding(i))
        throw new TypeError("Unknown encoding: " + i);
      var s = m(E, i) | 0, p = f(s), L = p.write(E, i);
      return L !== s && (p = p.slice(0, L)), p;
    }
    function _(E) {
      for (var i = E.length < 0 ? 0 : o(E.length) | 0, s = f(i), p = 0; p < i; p += 1)
        s[p] = E[p] & 255;
      return s;
    }
    function S(E) {
      if (J(E, Uint8Array)) {
        var i = new Uint8Array(E);
        return w(i.buffer, i.byteOffset, i.byteLength);
      }
      return _(E);
    }
    function w(E, i, s) {
      if (i < 0 || E.byteLength < i)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (E.byteLength < i + (s || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      var p;
      return i === void 0 && s === void 0 ? p = new Uint8Array(E) : s === void 0 ? p = new Uint8Array(E, i) : p = new Uint8Array(E, i, s), Object.setPrototypeOf(p, a.prototype), p;
    }
    function T(E) {
      if (a.isBuffer(E)) {
        var i = o(E.length) | 0, s = f(i);
        return s.length === 0 || E.copy(s, 0, 0, i), s;
      }
      if (E.length !== void 0)
        return typeof E.length != "number" || d(E.length) ? f(0) : _(E);
      if (E.type === "Buffer" && Array.isArray(E.data))
        return _(E.data);
    }
    function o(E) {
      if (E >= u)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + u.toString(16) + " bytes");
      return E | 0;
    }
    function g(E) {
      return +E != E && (E = 0), a.alloc(+E);
    }
    a.isBuffer = function(i) {
      return i != null && i._isBuffer === !0 && i !== a.prototype;
    }, a.compare = function(i, s) {
      if (J(i, Uint8Array) && (i = a.from(i, i.offset, i.byteLength)), J(s, Uint8Array) && (s = a.from(s, s.offset, s.byteLength)), !a.isBuffer(i) || !a.isBuffer(s))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (i === s) return 0;
      for (var p = i.length, L = s.length, q = 0, j = Math.min(p, L); q < j; ++q)
        if (i[q] !== s[q]) {
          p = i[q], L = s[q];
          break;
        }
      return p < L ? -1 : L < p ? 1 : 0;
    }, a.isEncoding = function(i) {
      switch (String(i).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, a.concat = function(i, s) {
      if (!Array.isArray(i))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (i.length === 0)
        return a.alloc(0);
      var p;
      if (s === void 0)
        for (s = 0, p = 0; p < i.length; ++p)
          s += i[p].length;
      var L = a.allocUnsafe(s), q = 0;
      for (p = 0; p < i.length; ++p) {
        var j = i[p];
        if (J(j, Uint8Array))
          q + j.length > L.length ? a.from(j).copy(L, q) : Uint8Array.prototype.set.call(
            L,
            j,
            q
          );
        else if (a.isBuffer(j))
          j.copy(L, q);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        q += j.length;
      }
      return L;
    };
    function m(E, i) {
      if (a.isBuffer(E))
        return E.length;
      if (ArrayBuffer.isView(E) || J(E, ArrayBuffer))
        return E.byteLength;
      if (typeof E != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof E
        );
      var s = E.length, p = arguments.length > 2 && arguments[2] === !0;
      if (!p && s === 0) return 0;
      for (var L = !1; ; )
        switch (i) {
          case "ascii":
          case "latin1":
          case "binary":
            return s;
          case "utf8":
          case "utf-8":
            return y(E).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return s * 2;
          case "hex":
            return s >>> 1;
          case "base64":
            return O(E).length;
          default:
            if (L)
              return p ? -1 : y(E).length;
            i = ("" + i).toLowerCase(), L = !0;
        }
    }
    a.byteLength = m;
    function c(E, i, s) {
      var p = !1;
      if ((i === void 0 || i < 0) && (i = 0), i > this.length || ((s === void 0 || s > this.length) && (s = this.length), s <= 0) || (s >>>= 0, i >>>= 0, s <= i))
        return "";
      for (E || (E = "utf8"); ; )
        switch (E) {
          case "hex":
            return Q(this, i, s);
          case "utf8":
          case "utf-8":
            return v(this, i, s);
          case "ascii":
            return H(this, i, s);
          case "latin1":
          case "binary":
            return ie(this, i, s);
          case "base64":
            return U(this, i, s);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ce(this, i, s);
          default:
            if (p) throw new TypeError("Unknown encoding: " + E);
            E = (E + "").toLowerCase(), p = !0;
        }
    }
    a.prototype._isBuffer = !0;
    function x(E, i, s) {
      var p = E[i];
      E[i] = E[s], E[s] = p;
    }
    a.prototype.swap16 = function() {
      var i = this.length;
      if (i % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var s = 0; s < i; s += 2)
        x(this, s, s + 1);
      return this;
    }, a.prototype.swap32 = function() {
      var i = this.length;
      if (i % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var s = 0; s < i; s += 4)
        x(this, s, s + 3), x(this, s + 1, s + 2);
      return this;
    }, a.prototype.swap64 = function() {
      var i = this.length;
      if (i % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var s = 0; s < i; s += 8)
        x(this, s, s + 7), x(this, s + 1, s + 6), x(this, s + 2, s + 5), x(this, s + 3, s + 4);
      return this;
    }, a.prototype.toString = function() {
      var i = this.length;
      return i === 0 ? "" : arguments.length === 0 ? v(this, 0, i) : c.apply(this, arguments);
    }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(i) {
      if (!a.isBuffer(i)) throw new TypeError("Argument must be a Buffer");
      return this === i ? !0 : a.compare(this, i) === 0;
    }, a.prototype.inspect = function() {
      var i = "", s = t.INSPECT_MAX_BYTES;
      return i = this.toString("hex", 0, s).replace(/(.{2})/g, "$1 ").trim(), this.length > s && (i += " ... "), "<Buffer " + i + ">";
    }, n && (a.prototype[n] = a.prototype.inspect), a.prototype.compare = function(i, s, p, L, q) {
      if (J(i, Uint8Array) && (i = a.from(i, i.offset, i.byteLength)), !a.isBuffer(i))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof i
        );
      if (s === void 0 && (s = 0), p === void 0 && (p = i ? i.length : 0), L === void 0 && (L = 0), q === void 0 && (q = this.length), s < 0 || p > i.length || L < 0 || q > this.length)
        throw new RangeError("out of range index");
      if (L >= q && s >= p)
        return 0;
      if (L >= q)
        return -1;
      if (s >= p)
        return 1;
      if (s >>>= 0, p >>>= 0, L >>>= 0, q >>>= 0, this === i) return 0;
      for (var j = q - L, ne = p - s, oe = Math.min(j, ne), se = this.slice(L, q), he = i.slice(s, p), de = 0; de < oe; ++de)
        if (se[de] !== he[de]) {
          j = se[de], ne = he[de];
          break;
        }
      return j < ne ? -1 : ne < j ? 1 : 0;
    };
    function F(E, i, s, p, L) {
      if (E.length === 0) return -1;
      if (typeof s == "string" ? (p = s, s = 0) : s > 2147483647 ? s = 2147483647 : s < -2147483648 && (s = -2147483648), s = +s, d(s) && (s = L ? 0 : E.length - 1), s < 0 && (s = E.length + s), s >= E.length) {
        if (L) return -1;
        s = E.length - 1;
      } else if (s < 0)
        if (L) s = 0;
        else return -1;
      if (typeof i == "string" && (i = a.from(i, p)), a.isBuffer(i))
        return i.length === 0 ? -1 : B(E, i, s, p, L);
      if (typeof i == "number")
        return i = i & 255, typeof Uint8Array.prototype.indexOf == "function" ? L ? Uint8Array.prototype.indexOf.call(E, i, s) : Uint8Array.prototype.lastIndexOf.call(E, i, s) : B(E, [i], s, p, L);
      throw new TypeError("val must be string, number or Buffer");
    }
    function B(E, i, s, p, L) {
      var q = 1, j = E.length, ne = i.length;
      if (p !== void 0 && (p = String(p).toLowerCase(), p === "ucs2" || p === "ucs-2" || p === "utf16le" || p === "utf-16le")) {
        if (E.length < 2 || i.length < 2)
          return -1;
        q = 2, j /= 2, ne /= 2, s /= 2;
      }
      function oe(Ie, Ze) {
        return q === 1 ? Ie[Ze] : Ie.readUInt16BE(Ze * q);
      }
      var se;
      if (L) {
        var he = -1;
        for (se = s; se < j; se++)
          if (oe(E, se) === oe(i, he === -1 ? 0 : se - he)) {
            if (he === -1 && (he = se), se - he + 1 === ne) return he * q;
          } else
            he !== -1 && (se -= se - he), he = -1;
      } else
        for (s + ne > j && (s = j - ne), se = s; se >= 0; se--) {
          for (var de = !0, we = 0; we < ne; we++)
            if (oe(E, se + we) !== oe(i, we)) {
              de = !1;
              break;
            }
          if (de) return se;
        }
      return -1;
    }
    a.prototype.includes = function(i, s, p) {
      return this.indexOf(i, s, p) !== -1;
    }, a.prototype.indexOf = function(i, s, p) {
      return F(this, i, s, p, !0);
    }, a.prototype.lastIndexOf = function(i, s, p) {
      return F(this, i, s, p, !1);
    };
    function z(E, i, s, p) {
      s = Number(s) || 0;
      var L = E.length - s;
      p ? (p = Number(p), p > L && (p = L)) : p = L;
      var q = i.length;
      p > q / 2 && (p = q / 2);
      for (var j = 0; j < p; ++j) {
        var ne = parseInt(i.substr(j * 2, 2), 16);
        if (d(ne)) return j;
        E[s + j] = ne;
      }
      return j;
    }
    function C(E, i, s, p) {
      return D(y(i, E.length - s), E, s, p);
    }
    function $(E, i, s, p) {
      return D(W(i), E, s, p);
    }
    function le(E, i, s, p) {
      return D(O(i), E, s, p);
    }
    function N(E, i, s, p) {
      return D(M(i, E.length - s), E, s, p);
    }
    a.prototype.write = function(i, s, p, L) {
      if (s === void 0)
        L = "utf8", p = this.length, s = 0;
      else if (p === void 0 && typeof s == "string")
        L = s, p = this.length, s = 0;
      else if (isFinite(s))
        s = s >>> 0, isFinite(p) ? (p = p >>> 0, L === void 0 && (L = "utf8")) : (L = p, p = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      var q = this.length - s;
      if ((p === void 0 || p > q) && (p = q), i.length > 0 && (p < 0 || s < 0) || s > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      L || (L = "utf8");
      for (var j = !1; ; )
        switch (L) {
          case "hex":
            return z(this, i, s, p);
          case "utf8":
          case "utf-8":
            return C(this, i, s, p);
          case "ascii":
          case "latin1":
          case "binary":
            return $(this, i, s, p);
          case "base64":
            return le(this, i, s, p);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return N(this, i, s, p);
          default:
            if (j) throw new TypeError("Unknown encoding: " + L);
            L = ("" + L).toLowerCase(), j = !0;
        }
    }, a.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function U(E, i, s) {
      return i === 0 && s === E.length ? e.fromByteArray(E) : e.fromByteArray(E.slice(i, s));
    }
    function v(E, i, s) {
      s = Math.min(E.length, s);
      for (var p = [], L = i; L < s; ) {
        var q = E[L], j = null, ne = q > 239 ? 4 : q > 223 ? 3 : q > 191 ? 2 : 1;
        if (L + ne <= s) {
          var oe, se, he, de;
          switch (ne) {
            case 1:
              q < 128 && (j = q);
              break;
            case 2:
              oe = E[L + 1], (oe & 192) === 128 && (de = (q & 31) << 6 | oe & 63, de > 127 && (j = de));
              break;
            case 3:
              oe = E[L + 1], se = E[L + 2], (oe & 192) === 128 && (se & 192) === 128 && (de = (q & 15) << 12 | (oe & 63) << 6 | se & 63, de > 2047 && (de < 55296 || de > 57343) && (j = de));
              break;
            case 4:
              oe = E[L + 1], se = E[L + 2], he = E[L + 3], (oe & 192) === 128 && (se & 192) === 128 && (he & 192) === 128 && (de = (q & 15) << 18 | (oe & 63) << 12 | (se & 63) << 6 | he & 63, de > 65535 && de < 1114112 && (j = de));
          }
        }
        j === null ? (j = 65533, ne = 1) : j > 65535 && (j -= 65536, p.push(j >>> 10 & 1023 | 55296), j = 56320 | j & 1023), p.push(j), L += ne;
      }
      return ee(p);
    }
    var K = 4096;
    function ee(E) {
      var i = E.length;
      if (i <= K)
        return String.fromCharCode.apply(String, E);
      for (var s = "", p = 0; p < i; )
        s += String.fromCharCode.apply(
          String,
          E.slice(p, p += K)
        );
      return s;
    }
    function H(E, i, s) {
      var p = "";
      s = Math.min(E.length, s);
      for (var L = i; L < s; ++L)
        p += String.fromCharCode(E[L] & 127);
      return p;
    }
    function ie(E, i, s) {
      var p = "";
      s = Math.min(E.length, s);
      for (var L = i; L < s; ++L)
        p += String.fromCharCode(E[L]);
      return p;
    }
    function Q(E, i, s) {
      var p = E.length;
      (!i || i < 0) && (i = 0), (!s || s < 0 || s > p) && (s = p);
      for (var L = "", q = i; q < s; ++q)
        L += Y[E[q]];
      return L;
    }
    function ce(E, i, s) {
      for (var p = E.slice(i, s), L = "", q = 0; q < p.length - 1; q += 2)
        L += String.fromCharCode(p[q] + p[q + 1] * 256);
      return L;
    }
    a.prototype.slice = function(i, s) {
      var p = this.length;
      i = ~~i, s = s === void 0 ? p : ~~s, i < 0 ? (i += p, i < 0 && (i = 0)) : i > p && (i = p), s < 0 ? (s += p, s < 0 && (s = 0)) : s > p && (s = p), s < i && (s = i);
      var L = this.subarray(i, s);
      return Object.setPrototypeOf(L, a.prototype), L;
    };
    function V(E, i, s) {
      if (E % 1 !== 0 || E < 0) throw new RangeError("offset is not uint");
      if (E + i > s) throw new RangeError("Trying to access beyond buffer length");
    }
    a.prototype.readUintLE = a.prototype.readUIntLE = function(i, s, p) {
      i = i >>> 0, s = s >>> 0, p || V(i, s, this.length);
      for (var L = this[i], q = 1, j = 0; ++j < s && (q *= 256); )
        L += this[i + j] * q;
      return L;
    }, a.prototype.readUintBE = a.prototype.readUIntBE = function(i, s, p) {
      i = i >>> 0, s = s >>> 0, p || V(i, s, this.length);
      for (var L = this[i + --s], q = 1; s > 0 && (q *= 256); )
        L += this[i + --s] * q;
      return L;
    }, a.prototype.readUint8 = a.prototype.readUInt8 = function(i, s) {
      return i = i >>> 0, s || V(i, 1, this.length), this[i];
    }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(i, s) {
      return i = i >>> 0, s || V(i, 2, this.length), this[i] | this[i + 1] << 8;
    }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(i, s) {
      return i = i >>> 0, s || V(i, 2, this.length), this[i] << 8 | this[i + 1];
    }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(i, s) {
      return i = i >>> 0, s || V(i, 4, this.length), (this[i] | this[i + 1] << 8 | this[i + 2] << 16) + this[i + 3] * 16777216;
    }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(i, s) {
      return i = i >>> 0, s || V(i, 4, this.length), this[i] * 16777216 + (this[i + 1] << 16 | this[i + 2] << 8 | this[i + 3]);
    }, a.prototype.readIntLE = function(i, s, p) {
      i = i >>> 0, s = s >>> 0, p || V(i, s, this.length);
      for (var L = this[i], q = 1, j = 0; ++j < s && (q *= 256); )
        L += this[i + j] * q;
      return q *= 128, L >= q && (L -= Math.pow(2, 8 * s)), L;
    }, a.prototype.readIntBE = function(i, s, p) {
      i = i >>> 0, s = s >>> 0, p || V(i, s, this.length);
      for (var L = s, q = 1, j = this[i + --L]; L > 0 && (q *= 256); )
        j += this[i + --L] * q;
      return q *= 128, j >= q && (j -= Math.pow(2, 8 * s)), j;
    }, a.prototype.readInt8 = function(i, s) {
      return i = i >>> 0, s || V(i, 1, this.length), this[i] & 128 ? (255 - this[i] + 1) * -1 : this[i];
    }, a.prototype.readInt16LE = function(i, s) {
      i = i >>> 0, s || V(i, 2, this.length);
      var p = this[i] | this[i + 1] << 8;
      return p & 32768 ? p | 4294901760 : p;
    }, a.prototype.readInt16BE = function(i, s) {
      i = i >>> 0, s || V(i, 2, this.length);
      var p = this[i + 1] | this[i] << 8;
      return p & 32768 ? p | 4294901760 : p;
    }, a.prototype.readInt32LE = function(i, s) {
      return i = i >>> 0, s || V(i, 4, this.length), this[i] | this[i + 1] << 8 | this[i + 2] << 16 | this[i + 3] << 24;
    }, a.prototype.readInt32BE = function(i, s) {
      return i = i >>> 0, s || V(i, 4, this.length), this[i] << 24 | this[i + 1] << 16 | this[i + 2] << 8 | this[i + 3];
    }, a.prototype.readFloatLE = function(i, s) {
      return i = i >>> 0, s || V(i, 4, this.length), r.read(this, i, !0, 23, 4);
    }, a.prototype.readFloatBE = function(i, s) {
      return i = i >>> 0, s || V(i, 4, this.length), r.read(this, i, !1, 23, 4);
    }, a.prototype.readDoubleLE = function(i, s) {
      return i = i >>> 0, s || V(i, 8, this.length), r.read(this, i, !0, 52, 8);
    }, a.prototype.readDoubleBE = function(i, s) {
      return i = i >>> 0, s || V(i, 8, this.length), r.read(this, i, !1, 52, 8);
    };
    function P(E, i, s, p, L, q) {
      if (!a.isBuffer(E)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (i > L || i < q) throw new RangeError('"value" argument is out of bounds');
      if (s + p > E.length) throw new RangeError("Index out of range");
    }
    a.prototype.writeUintLE = a.prototype.writeUIntLE = function(i, s, p, L) {
      if (i = +i, s = s >>> 0, p = p >>> 0, !L) {
        var q = Math.pow(2, 8 * p) - 1;
        P(this, i, s, p, q, 0);
      }
      var j = 1, ne = 0;
      for (this[s] = i & 255; ++ne < p && (j *= 256); )
        this[s + ne] = i / j & 255;
      return s + p;
    }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(i, s, p, L) {
      if (i = +i, s = s >>> 0, p = p >>> 0, !L) {
        var q = Math.pow(2, 8 * p) - 1;
        P(this, i, s, p, q, 0);
      }
      var j = p - 1, ne = 1;
      for (this[s + j] = i & 255; --j >= 0 && (ne *= 256); )
        this[s + j] = i / ne & 255;
      return s + p;
    }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(i, s, p) {
      return i = +i, s = s >>> 0, p || P(this, i, s, 1, 255, 0), this[s] = i & 255, s + 1;
    }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(i, s, p) {
      return i = +i, s = s >>> 0, p || P(this, i, s, 2, 65535, 0), this[s] = i & 255, this[s + 1] = i >>> 8, s + 2;
    }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(i, s, p) {
      return i = +i, s = s >>> 0, p || P(this, i, s, 2, 65535, 0), this[s] = i >>> 8, this[s + 1] = i & 255, s + 2;
    }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(i, s, p) {
      return i = +i, s = s >>> 0, p || P(this, i, s, 4, 4294967295, 0), this[s + 3] = i >>> 24, this[s + 2] = i >>> 16, this[s + 1] = i >>> 8, this[s] = i & 255, s + 4;
    }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(i, s, p) {
      return i = +i, s = s >>> 0, p || P(this, i, s, 4, 4294967295, 0), this[s] = i >>> 24, this[s + 1] = i >>> 16, this[s + 2] = i >>> 8, this[s + 3] = i & 255, s + 4;
    }, a.prototype.writeIntLE = function(i, s, p, L) {
      if (i = +i, s = s >>> 0, !L) {
        var q = Math.pow(2, 8 * p - 1);
        P(this, i, s, p, q - 1, -q);
      }
      var j = 0, ne = 1, oe = 0;
      for (this[s] = i & 255; ++j < p && (ne *= 256); )
        i < 0 && oe === 0 && this[s + j - 1] !== 0 && (oe = 1), this[s + j] = (i / ne >> 0) - oe & 255;
      return s + p;
    }, a.prototype.writeIntBE = function(i, s, p, L) {
      if (i = +i, s = s >>> 0, !L) {
        var q = Math.pow(2, 8 * p - 1);
        P(this, i, s, p, q - 1, -q);
      }
      var j = p - 1, ne = 1, oe = 0;
      for (this[s + j] = i & 255; --j >= 0 && (ne *= 256); )
        i < 0 && oe === 0 && this[s + j + 1] !== 0 && (oe = 1), this[s + j] = (i / ne >> 0) - oe & 255;
      return s + p;
    }, a.prototype.writeInt8 = function(i, s, p) {
      return i = +i, s = s >>> 0, p || P(this, i, s, 1, 127, -128), i < 0 && (i = 255 + i + 1), this[s] = i & 255, s + 1;
    }, a.prototype.writeInt16LE = function(i, s, p) {
      return i = +i, s = s >>> 0, p || P(this, i, s, 2, 32767, -32768), this[s] = i & 255, this[s + 1] = i >>> 8, s + 2;
    }, a.prototype.writeInt16BE = function(i, s, p) {
      return i = +i, s = s >>> 0, p || P(this, i, s, 2, 32767, -32768), this[s] = i >>> 8, this[s + 1] = i & 255, s + 2;
    }, a.prototype.writeInt32LE = function(i, s, p) {
      return i = +i, s = s >>> 0, p || P(this, i, s, 4, 2147483647, -2147483648), this[s] = i & 255, this[s + 1] = i >>> 8, this[s + 2] = i >>> 16, this[s + 3] = i >>> 24, s + 4;
    }, a.prototype.writeInt32BE = function(i, s, p) {
      return i = +i, s = s >>> 0, p || P(this, i, s, 4, 2147483647, -2147483648), i < 0 && (i = 4294967295 + i + 1), this[s] = i >>> 24, this[s + 1] = i >>> 16, this[s + 2] = i >>> 8, this[s + 3] = i & 255, s + 4;
    };
    function X(E, i, s, p, L, q) {
      if (s + p > E.length) throw new RangeError("Index out of range");
      if (s < 0) throw new RangeError("Index out of range");
    }
    function Z(E, i, s, p, L) {
      return i = +i, s = s >>> 0, L || X(E, i, s, 4), r.write(E, i, s, p, 23, 4), s + 4;
    }
    a.prototype.writeFloatLE = function(i, s, p) {
      return Z(this, i, s, !0, p);
    }, a.prototype.writeFloatBE = function(i, s, p) {
      return Z(this, i, s, !1, p);
    };
    function te(E, i, s, p, L) {
      return i = +i, s = s >>> 0, L || X(E, i, s, 8), r.write(E, i, s, p, 52, 8), s + 8;
    }
    a.prototype.writeDoubleLE = function(i, s, p) {
      return te(this, i, s, !0, p);
    }, a.prototype.writeDoubleBE = function(i, s, p) {
      return te(this, i, s, !1, p);
    }, a.prototype.copy = function(i, s, p, L) {
      if (!a.isBuffer(i)) throw new TypeError("argument should be a Buffer");
      if (p || (p = 0), !L && L !== 0 && (L = this.length), s >= i.length && (s = i.length), s || (s = 0), L > 0 && L < p && (L = p), L === p || i.length === 0 || this.length === 0) return 0;
      if (s < 0)
        throw new RangeError("targetStart out of bounds");
      if (p < 0 || p >= this.length) throw new RangeError("Index out of range");
      if (L < 0) throw new RangeError("sourceEnd out of bounds");
      L > this.length && (L = this.length), i.length - s < L - p && (L = i.length - s + p);
      var q = L - p;
      return this === i && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(s, p, L) : Uint8Array.prototype.set.call(
        i,
        this.subarray(p, L),
        s
      ), q;
    }, a.prototype.fill = function(i, s, p, L) {
      if (typeof i == "string") {
        if (typeof s == "string" ? (L = s, s = 0, p = this.length) : typeof p == "string" && (L = p, p = this.length), L !== void 0 && typeof L != "string")
          throw new TypeError("encoding must be a string");
        if (typeof L == "string" && !a.isEncoding(L))
          throw new TypeError("Unknown encoding: " + L);
        if (i.length === 1) {
          var q = i.charCodeAt(0);
          (L === "utf8" && q < 128 || L === "latin1") && (i = q);
        }
      } else typeof i == "number" ? i = i & 255 : typeof i == "boolean" && (i = Number(i));
      if (s < 0 || this.length < s || this.length < p)
        throw new RangeError("Out of range index");
      if (p <= s)
        return this;
      s = s >>> 0, p = p === void 0 ? this.length : p >>> 0, i || (i = 0);
      var j;
      if (typeof i == "number")
        for (j = s; j < p; ++j)
          this[j] = i;
      else {
        var ne = a.isBuffer(i) ? i : a.from(i, L), oe = ne.length;
        if (oe === 0)
          throw new TypeError('The value "' + i + '" is invalid for argument "value"');
        for (j = 0; j < p - s; ++j)
          this[j + s] = ne[j % oe];
      }
      return this;
    };
    var G = /[^+/0-9A-Za-z-_]/g;
    function b(E) {
      if (E = E.split("=")[0], E = E.trim().replace(G, ""), E.length < 2) return "";
      for (; E.length % 4 !== 0; )
        E = E + "=";
      return E;
    }
    function y(E, i) {
      i = i || 1 / 0;
      for (var s, p = E.length, L = null, q = [], j = 0; j < p; ++j) {
        if (s = E.charCodeAt(j), s > 55295 && s < 57344) {
          if (!L) {
            if (s > 56319) {
              (i -= 3) > -1 && q.push(239, 191, 189);
              continue;
            } else if (j + 1 === p) {
              (i -= 3) > -1 && q.push(239, 191, 189);
              continue;
            }
            L = s;
            continue;
          }
          if (s < 56320) {
            (i -= 3) > -1 && q.push(239, 191, 189), L = s;
            continue;
          }
          s = (L - 55296 << 10 | s - 56320) + 65536;
        } else L && (i -= 3) > -1 && q.push(239, 191, 189);
        if (L = null, s < 128) {
          if ((i -= 1) < 0) break;
          q.push(s);
        } else if (s < 2048) {
          if ((i -= 2) < 0) break;
          q.push(
            s >> 6 | 192,
            s & 63 | 128
          );
        } else if (s < 65536) {
          if ((i -= 3) < 0) break;
          q.push(
            s >> 12 | 224,
            s >> 6 & 63 | 128,
            s & 63 | 128
          );
        } else if (s < 1114112) {
          if ((i -= 4) < 0) break;
          q.push(
            s >> 18 | 240,
            s >> 12 & 63 | 128,
            s >> 6 & 63 | 128,
            s & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return q;
    }
    function W(E) {
      for (var i = [], s = 0; s < E.length; ++s)
        i.push(E.charCodeAt(s) & 255);
      return i;
    }
    function M(E, i) {
      for (var s, p, L, q = [], j = 0; j < E.length && !((i -= 2) < 0); ++j)
        s = E.charCodeAt(j), p = s >> 8, L = s % 256, q.push(L), q.push(p);
      return q;
    }
    function O(E) {
      return e.toByteArray(b(E));
    }
    function D(E, i, s, p) {
      for (var L = 0; L < p && !(L + s >= i.length || L >= E.length); ++L)
        i[L + s] = E[L];
      return L;
    }
    function J(E, i) {
      return E instanceof i || E != null && E.constructor != null && E.constructor.name != null && E.constructor.name === i.name;
    }
    function d(E) {
      return E !== E;
    }
    var Y = (function() {
      for (var E = "0123456789abcdef", i = new Array(256), s = 0; s < 16; ++s)
        for (var p = s * 16, L = 0; L < 16; ++L)
          i[p + L] = E[s] + E[L];
      return i;
    })();
  })(mr)), mr;
}
var wr = {}, gr = {}, yr, Wi;
function Ys() {
  return Wi || (Wi = 1, yr = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, r = /* @__PURE__ */ Symbol("test"), n = Object(r);
    if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
      return !1;
    var u = 42;
    e[r] = u;
    for (var l in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var f = Object.getOwnPropertySymbols(e);
    if (f.length !== 1 || f[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var a = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, r)
      );
      if (a.value !== u || a.enumerable !== !0)
        return !1;
    }
    return !0;
  }), yr;
}
var vr, Hi;
function vi() {
  if (Hi) return vr;
  Hi = 1;
  var t = Ys();
  return vr = function() {
    return t() && !!Symbol.toStringTag;
  }, vr;
}
var br, qi;
function Js() {
  return qi || (qi = 1, br = Object), br;
}
var _r, Gi;
function Tu() {
  return Gi || (Gi = 1, _r = Error), _r;
}
var Er, Ki;
function Su() {
  return Ki || (Ki = 1, Er = EvalError), Er;
}
var xr, Vi;
function Au() {
  return Vi || (Vi = 1, xr = RangeError), xr;
}
var Tr, Xi;
function ku() {
  return Xi || (Xi = 1, Tr = ReferenceError), Tr;
}
var Sr, $i;
function Qs() {
  return $i || ($i = 1, Sr = SyntaxError), Sr;
}
var Ar, Zi;
function ar() {
  return Zi || (Zi = 1, Ar = TypeError), Ar;
}
var kr, Yi;
function Ru() {
  return Yi || (Yi = 1, kr = URIError), kr;
}
var Rr, Ji;
function Iu() {
  return Ji || (Ji = 1, Rr = Math.abs), Rr;
}
var Ir, Qi;
function Cu() {
  return Qi || (Qi = 1, Ir = Math.floor), Ir;
}
var Cr, ea;
function Nu() {
  return ea || (ea = 1, Cr = Math.max), Cr;
}
var Nr, ta;
function Ou() {
  return ta || (ta = 1, Nr = Math.min), Nr;
}
var Or, ra;
function Pu() {
  return ra || (ra = 1, Or = Math.pow), Or;
}
var Pr, na;
function Fu() {
  return na || (na = 1, Pr = Math.round), Pr;
}
var Fr, ia;
function Du() {
  return ia || (ia = 1, Fr = Number.isNaN || function(e) {
    return e !== e;
  }), Fr;
}
var Dr, aa;
function Bu() {
  if (aa) return Dr;
  aa = 1;
  var t = /* @__PURE__ */ Du();
  return Dr = function(r) {
    return t(r) || r === 0 ? r : r < 0 ? -1 : 1;
  }, Dr;
}
var Br, sa;
function Lu() {
  return sa || (sa = 1, Br = Object.getOwnPropertyDescriptor), Br;
}
var Lr, oa;
function Ft() {
  if (oa) return Lr;
  oa = 1;
  var t = /* @__PURE__ */ Lu();
  if (t)
    try {
      t([], "length");
    } catch {
      t = null;
    }
  return Lr = t, Lr;
}
var Mr, ua;
function sr() {
  if (ua) return Mr;
  ua = 1;
  var t = Object.defineProperty || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return Mr = t, Mr;
}
var Ur, la;
function Mu() {
  if (la) return Ur;
  la = 1;
  var t = typeof Symbol < "u" && Symbol, e = Ys();
  return Ur = function() {
    return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : e();
  }, Ur;
}
var jr, ca;
function eo() {
  return ca || (ca = 1, jr = typeof Reflect < "u" && Reflect.getPrototypeOf || null), jr;
}
var zr, ha;
function to() {
  if (ha) return zr;
  ha = 1;
  var t = /* @__PURE__ */ Js();
  return zr = t.getPrototypeOf || null, zr;
}
var Wr, fa;
function Uu() {
  if (fa) return Wr;
  fa = 1;
  var t = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, r = Math.max, n = "[object Function]", u = function(h, k) {
    for (var A = [], R = 0; R < h.length; R += 1)
      A[R] = h[R];
    for (var I = 0; I < k.length; I += 1)
      A[I + h.length] = k[I];
    return A;
  }, l = function(h, k) {
    for (var A = [], R = k, I = 0; R < h.length; R += 1, I += 1)
      A[I] = h[R];
    return A;
  }, f = function(a, h) {
    for (var k = "", A = 0; A < a.length; A += 1)
      k += a[A], A + 1 < a.length && (k += h);
    return k;
  };
  return Wr = function(h) {
    var k = this;
    if (typeof k != "function" || e.apply(k) !== n)
      throw new TypeError(t + k);
    for (var A = l(arguments, 1), R, I = function() {
      if (this instanceof R) {
        var o = k.apply(
          this,
          u(A, arguments)
        );
        return Object(o) === o ? o : this;
      }
      return k.apply(
        h,
        u(A, arguments)
      );
    }, _ = r(0, k.length - A.length), S = [], w = 0; w < _; w++)
      S[w] = "$" + w;
    if (R = Function("binder", "return function (" + f(S, ",") + "){ return binder.apply(this,arguments); }")(I), k.prototype) {
      var T = function() {
      };
      T.prototype = k.prototype, R.prototype = new T(), T.prototype = null;
    }
    return R;
  }, Wr;
}
var Hr, da;
function Dt() {
  if (da) return Hr;
  da = 1;
  var t = Uu();
  return Hr = Function.prototype.bind || t, Hr;
}
var qr, pa;
function bi() {
  return pa || (pa = 1, qr = Function.prototype.call), qr;
}
var Gr, ma;
function _i() {
  return ma || (ma = 1, Gr = Function.prototype.apply), Gr;
}
var Kr, wa;
function ju() {
  return wa || (wa = 1, Kr = typeof Reflect < "u" && Reflect && Reflect.apply), Kr;
}
var Vr, ga;
function ro() {
  if (ga) return Vr;
  ga = 1;
  var t = Dt(), e = _i(), r = bi(), n = ju();
  return Vr = n || t.call(r, e), Vr;
}
var Xr, ya;
function Ei() {
  if (ya) return Xr;
  ya = 1;
  var t = Dt(), e = /* @__PURE__ */ ar(), r = bi(), n = ro();
  return Xr = function(l) {
    if (l.length < 1 || typeof l[0] != "function")
      throw new e("a function is required");
    return n(t, r, l);
  }, Xr;
}
var $r, va;
function zu() {
  if (va) return $r;
  va = 1;
  var t = Ei(), e = /* @__PURE__ */ Ft(), r;
  try {
    r = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (f) {
    if (!f || typeof f != "object" || !("code" in f) || f.code !== "ERR_PROTO_ACCESS")
      throw f;
  }
  var n = !!r && e && e(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), u = Object, l = u.getPrototypeOf;
  return $r = n && typeof n.get == "function" ? t([n.get]) : typeof l == "function" ? (
    /** @type {import('./get')} */
    (function(a) {
      return l(a == null ? a : u(a));
    })
  ) : !1, $r;
}
var Zr, ba;
function no() {
  if (ba) return Zr;
  ba = 1;
  var t = eo(), e = to(), r = /* @__PURE__ */ zu();
  return Zr = t ? function(u) {
    return t(u);
  } : e ? function(u) {
    if (!u || typeof u != "object" && typeof u != "function")
      throw new TypeError("getProto: not an object");
    return e(u);
  } : r ? function(u) {
    return r(u);
  } : null, Zr;
}
var Yr, _a;
function Wu() {
  if (_a) return Yr;
  _a = 1;
  var t = Function.prototype.call, e = Object.prototype.hasOwnProperty, r = Dt();
  return Yr = r.call(t, e), Yr;
}
var Jr, Ea;
function io() {
  if (Ea) return Jr;
  Ea = 1;
  var t, e = /* @__PURE__ */ Js(), r = /* @__PURE__ */ Tu(), n = /* @__PURE__ */ Su(), u = /* @__PURE__ */ Au(), l = /* @__PURE__ */ ku(), f = /* @__PURE__ */ Qs(), a = /* @__PURE__ */ ar(), h = /* @__PURE__ */ Ru(), k = /* @__PURE__ */ Iu(), A = /* @__PURE__ */ Cu(), R = /* @__PURE__ */ Nu(), I = /* @__PURE__ */ Ou(), _ = /* @__PURE__ */ Pu(), S = /* @__PURE__ */ Fu(), w = /* @__PURE__ */ Bu(), T = Function, o = function(W) {
    try {
      return T('"use strict"; return (' + W + ").constructor;")();
    } catch {
    }
  }, g = /* @__PURE__ */ Ft(), m = /* @__PURE__ */ sr(), c = function() {
    throw new a();
  }, x = g ? (function() {
    try {
      return arguments.callee, c;
    } catch {
      try {
        return g(arguments, "callee").get;
      } catch {
        return c;
      }
    }
  })() : c, F = Mu()(), B = no(), z = to(), C = eo(), $ = _i(), le = bi(), N = {}, U = typeof Uint8Array > "u" || !B ? t : B(Uint8Array), v = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? t : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? t : ArrayBuffer,
    "%ArrayIteratorPrototype%": F && B ? B([][Symbol.iterator]()) : t,
    "%AsyncFromSyncIteratorPrototype%": t,
    "%AsyncFunction%": N,
    "%AsyncGenerator%": N,
    "%AsyncGeneratorFunction%": N,
    "%AsyncIteratorPrototype%": N,
    "%Atomics%": typeof Atomics > "u" ? t : Atomics,
    "%BigInt%": typeof BigInt > "u" ? t : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? t : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? t : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? t : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": r,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": n,
    "%Float16Array%": typeof Float16Array > "u" ? t : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? t : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? t : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? t : FinalizationRegistry,
    "%Function%": T,
    "%GeneratorFunction%": N,
    "%Int8Array%": typeof Int8Array > "u" ? t : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? t : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? t : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": F && B ? B(B([][Symbol.iterator]())) : t,
    "%JSON%": typeof JSON == "object" ? JSON : t,
    "%Map%": typeof Map > "u" ? t : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !F || !B ? t : B((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": e,
    "%Object.getOwnPropertyDescriptor%": g,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? t : Promise,
    "%Proxy%": typeof Proxy > "u" ? t : Proxy,
    "%RangeError%": u,
    "%ReferenceError%": l,
    "%Reflect%": typeof Reflect > "u" ? t : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? t : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !F || !B ? t : B((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? t : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": F && B ? B(""[Symbol.iterator]()) : t,
    "%Symbol%": F ? Symbol : t,
    "%SyntaxError%": f,
    "%ThrowTypeError%": x,
    "%TypedArray%": U,
    "%TypeError%": a,
    "%Uint8Array%": typeof Uint8Array > "u" ? t : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? t : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? t : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? t : Uint32Array,
    "%URIError%": h,
    "%WeakMap%": typeof WeakMap > "u" ? t : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? t : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? t : WeakSet,
    "%Function.prototype.call%": le,
    "%Function.prototype.apply%": $,
    "%Object.defineProperty%": m,
    "%Object.getPrototypeOf%": z,
    "%Math.abs%": k,
    "%Math.floor%": A,
    "%Math.max%": R,
    "%Math.min%": I,
    "%Math.pow%": _,
    "%Math.round%": S,
    "%Math.sign%": w,
    "%Reflect.getPrototypeOf%": C
  };
  if (B)
    try {
      null.error;
    } catch (W) {
      var K = B(B(W));
      v["%Error.prototype%"] = K;
    }
  var ee = function W(M) {
    var O;
    if (M === "%AsyncFunction%")
      O = o("async function () {}");
    else if (M === "%GeneratorFunction%")
      O = o("function* () {}");
    else if (M === "%AsyncGeneratorFunction%")
      O = o("async function* () {}");
    else if (M === "%AsyncGenerator%") {
      var D = W("%AsyncGeneratorFunction%");
      D && (O = D.prototype);
    } else if (M === "%AsyncIteratorPrototype%") {
      var J = W("%AsyncGenerator%");
      J && B && (O = B(J.prototype));
    }
    return v[M] = O, O;
  }, H = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, ie = Dt(), Q = /* @__PURE__ */ Wu(), ce = ie.call(le, Array.prototype.concat), V = ie.call($, Array.prototype.splice), P = ie.call(le, String.prototype.replace), X = ie.call(le, String.prototype.slice), Z = ie.call(le, RegExp.prototype.exec), te = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, G = /\\(\\)?/g, b = function(M) {
    var O = X(M, 0, 1), D = X(M, -1);
    if (O === "%" && D !== "%")
      throw new f("invalid intrinsic syntax, expected closing `%`");
    if (D === "%" && O !== "%")
      throw new f("invalid intrinsic syntax, expected opening `%`");
    var J = [];
    return P(M, te, function(d, Y, E, i) {
      J[J.length] = E ? P(i, G, "$1") : Y || d;
    }), J;
  }, y = function(M, O) {
    var D = M, J;
    if (Q(H, D) && (J = H[D], D = "%" + J[0] + "%"), Q(v, D)) {
      var d = v[D];
      if (d === N && (d = ee(D)), typeof d > "u" && !O)
        throw new a("intrinsic " + M + " exists, but is not available. Please file an issue!");
      return {
        alias: J,
        name: D,
        value: d
      };
    }
    throw new f("intrinsic " + M + " does not exist!");
  };
  return Jr = function(M, O) {
    if (typeof M != "string" || M.length === 0)
      throw new a("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof O != "boolean")
      throw new a('"allowMissing" argument must be a boolean');
    if (Z(/^%?[^%]*%?$/, M) === null)
      throw new f("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var D = b(M), J = D.length > 0 ? D[0] : "", d = y("%" + J + "%", O), Y = d.name, E = d.value, i = !1, s = d.alias;
    s && (J = s[0], V(D, ce([0, 1], s)));
    for (var p = 1, L = !0; p < D.length; p += 1) {
      var q = D[p], j = X(q, 0, 1), ne = X(q, -1);
      if ((j === '"' || j === "'" || j === "`" || ne === '"' || ne === "'" || ne === "`") && j !== ne)
        throw new f("property names with quotes must have matching quotes");
      if ((q === "constructor" || !L) && (i = !0), J += "." + q, Y = "%" + J + "%", Q(v, Y))
        E = v[Y];
      else if (E != null) {
        if (!(q in E)) {
          if (!O)
            throw new a("base intrinsic for " + M + " exists, but the property is not available.");
          return;
        }
        if (g && p + 1 >= D.length) {
          var oe = g(E, q);
          L = !!oe, L && "get" in oe && !("originalValue" in oe.get) ? E = oe.get : E = E[q];
        } else
          L = Q(E, q), E = E[q];
        L && !i && (v[Y] = E);
      }
    }
    return E;
  }, Jr;
}
var Qr, xa;
function ao() {
  if (xa) return Qr;
  xa = 1;
  var t = /* @__PURE__ */ io(), e = Ei(), r = e([t("%String.prototype.indexOf%")]);
  return Qr = function(u, l) {
    var f = (
      /** @type {(this: unknown, ...args: unknown[]) => unknown} */
      t(u, !!l)
    );
    return typeof f == "function" && r(u, ".prototype.") > -1 ? e(
      /** @type {const} */
      [f]
    ) : f;
  }, Qr;
}
var en, Ta;
function Hu() {
  if (Ta) return en;
  Ta = 1;
  var t = vi()(), e = /* @__PURE__ */ ao(), r = e("Object.prototype.toString"), n = function(a) {
    return t && a && typeof a == "object" && Symbol.toStringTag in a ? !1 : r(a) === "[object Arguments]";
  }, u = function(a) {
    return n(a) ? !0 : a !== null && typeof a == "object" && "length" in a && typeof a.length == "number" && a.length >= 0 && r(a) !== "[object Array]" && "callee" in a && r(a.callee) === "[object Function]";
  }, l = (function() {
    return n(arguments);
  })();
  return n.isLegacyArguments = u, en = l ? n : u, en;
}
var tn, Sa;
function qu() {
  if (Sa) return tn;
  Sa = 1;
  var t = Object.prototype.toString, e = Function.prototype.toString, r = /^\s*(?:function)?\*/, n = vi()(), u = Object.getPrototypeOf, l = function() {
    if (!n)
      return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, f;
  return tn = function(h) {
    if (typeof h != "function")
      return !1;
    if (r.test(e.call(h)))
      return !0;
    if (!n) {
      var k = t.call(h);
      return k === "[object GeneratorFunction]";
    }
    if (!u)
      return !1;
    if (typeof f > "u") {
      var A = l();
      f = A ? u(A) : !1;
    }
    return u(h) === f;
  }, tn;
}
var rn, Aa;
function Gu() {
  if (Aa) return rn;
  Aa = 1;
  var t = Function.prototype.toString, e = typeof Reflect == "object" && Reflect !== null && Reflect.apply, r, n;
  if (typeof e == "function" && typeof Object.defineProperty == "function")
    try {
      r = Object.defineProperty({}, "length", {
        get: function() {
          throw n;
        }
      }), n = {}, e(function() {
        throw 42;
      }, null, r);
    } catch (g) {
      g !== n && (e = null);
    }
  else
    e = null;
  var u = /^\s*class\b/, l = function(m) {
    try {
      var c = t.call(m);
      return u.test(c);
    } catch {
      return !1;
    }
  }, f = function(m) {
    try {
      return l(m) ? !1 : (t.call(m), !0);
    } catch {
      return !1;
    }
  }, a = Object.prototype.toString, h = "[object Object]", k = "[object Function]", A = "[object GeneratorFunction]", R = "[object HTMLAllCollection]", I = "[object HTML document.all class]", _ = "[object HTMLCollection]", S = typeof Symbol == "function" && !!Symbol.toStringTag, w = !(0 in [,]), T = function() {
    return !1;
  };
  if (typeof document == "object") {
    var o = document.all;
    a.call(o) === a.call(document.all) && (T = function(m) {
      if ((w || !m) && (typeof m > "u" || typeof m == "object"))
        try {
          var c = a.call(m);
          return (c === R || c === I || c === _ || c === h) && m("") == null;
        } catch {
        }
      return !1;
    });
  }
  return rn = e ? function(m) {
    if (T(m))
      return !0;
    if (!m || typeof m != "function" && typeof m != "object")
      return !1;
    try {
      e(m, null, r);
    } catch (c) {
      if (c !== n)
        return !1;
    }
    return !l(m) && f(m);
  } : function(m) {
    if (T(m))
      return !0;
    if (!m || typeof m != "function" && typeof m != "object")
      return !1;
    if (S)
      return f(m);
    if (l(m))
      return !1;
    var c = a.call(m);
    return c !== k && c !== A && !/^\[object HTML/.test(c) ? !1 : f(m);
  }, rn;
}
var nn, ka;
function Ku() {
  if (ka) return nn;
  ka = 1;
  var t = Gu(), e = Object.prototype.toString, r = Object.prototype.hasOwnProperty, n = function(h, k, A) {
    for (var R = 0, I = h.length; R < I; R++)
      r.call(h, R) && (A == null ? k(h[R], R, h) : k.call(A, h[R], R, h));
  }, u = function(h, k, A) {
    for (var R = 0, I = h.length; R < I; R++)
      A == null ? k(h.charAt(R), R, h) : k.call(A, h.charAt(R), R, h);
  }, l = function(h, k, A) {
    for (var R in h)
      r.call(h, R) && (A == null ? k(h[R], R, h) : k.call(A, h[R], R, h));
  };
  function f(a) {
    return e.call(a) === "[object Array]";
  }
  return nn = function(h, k, A) {
    if (!t(k))
      throw new TypeError("iterator must be a function");
    var R;
    arguments.length >= 3 && (R = A), f(h) ? n(h, k, R) : typeof h == "string" ? u(h, k, R) : l(h, k, R);
  }, nn;
}
var an, Ra;
function Vu() {
  return Ra || (Ra = 1, an = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ]), an;
}
var sn, Ia;
function Xu() {
  if (Ia) return sn;
  Ia = 1;
  var t = /* @__PURE__ */ Vu(), e = typeof globalThis > "u" ? Pe : globalThis;
  return sn = function() {
    for (var n = [], u = 0; u < t.length; u++)
      typeof e[t[u]] == "function" && (n[n.length] = t[u]);
    return n;
  }, sn;
}
var on = { exports: {} }, un, Ca;
function $u() {
  if (Ca) return un;
  Ca = 1;
  var t = /* @__PURE__ */ sr(), e = /* @__PURE__ */ Qs(), r = /* @__PURE__ */ ar(), n = /* @__PURE__ */ Ft();
  return un = function(l, f, a) {
    if (!l || typeof l != "object" && typeof l != "function")
      throw new r("`obj` must be an object or a function`");
    if (typeof f != "string" && typeof f != "symbol")
      throw new r("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new r("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new r("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new r("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new r("`loose`, if provided, must be a boolean");
    var h = arguments.length > 3 ? arguments[3] : null, k = arguments.length > 4 ? arguments[4] : null, A = arguments.length > 5 ? arguments[5] : null, R = arguments.length > 6 ? arguments[6] : !1, I = !!n && n(l, f);
    if (t)
      t(l, f, {
        configurable: A === null && I ? I.configurable : !A,
        enumerable: h === null && I ? I.enumerable : !h,
        value: a,
        writable: k === null && I ? I.writable : !k
      });
    else if (R || !h && !k && !A)
      l[f] = a;
    else
      throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, un;
}
var ln, Na;
function Zu() {
  if (Na) return ln;
  Na = 1;
  var t = /* @__PURE__ */ sr(), e = function() {
    return !!t;
  };
  return e.hasArrayLengthDefineBug = function() {
    if (!t)
      return null;
    try {
      return t([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, ln = e, ln;
}
var cn, Oa;
function Yu() {
  if (Oa) return cn;
  Oa = 1;
  var t = /* @__PURE__ */ io(), e = /* @__PURE__ */ $u(), r = /* @__PURE__ */ Zu()(), n = /* @__PURE__ */ Ft(), u = /* @__PURE__ */ ar(), l = t("%Math.floor%");
  return cn = function(a, h) {
    if (typeof a != "function")
      throw new u("`fn` is not a function");
    if (typeof h != "number" || h < 0 || h > 4294967295 || l(h) !== h)
      throw new u("`length` must be a positive 32-bit integer");
    var k = arguments.length > 2 && !!arguments[2], A = !0, R = !0;
    if ("length" in a && n) {
      var I = n(a, "length");
      I && !I.configurable && (A = !1), I && !I.writable && (R = !1);
    }
    return (A || R || !k) && (r ? e(
      /** @type {Parameters<define>[0]} */
      a,
      "length",
      h,
      !0,
      !0
    ) : e(
      /** @type {Parameters<define>[0]} */
      a,
      "length",
      h
    )), a;
  }, cn;
}
var hn, Pa;
function Ju() {
  if (Pa) return hn;
  Pa = 1;
  var t = Dt(), e = _i(), r = ro();
  return hn = function() {
    return r(t, e, arguments);
  }, hn;
}
var Fa;
function Qu() {
  return Fa || (Fa = 1, (function(t) {
    var e = /* @__PURE__ */ Yu(), r = /* @__PURE__ */ sr(), n = Ei(), u = Ju();
    t.exports = function(f) {
      var a = n(arguments), h = f.length - (arguments.length - 1);
      return e(
        a,
        1 + (h > 0 ? h : 0),
        !0
      );
    }, r ? r(t.exports, "apply", { value: u }) : t.exports.apply = u;
  })(on)), on.exports;
}
var fn, Da;
function so() {
  if (Da) return fn;
  Da = 1;
  var t = Ku(), e = /* @__PURE__ */ Xu(), r = Qu(), n = /* @__PURE__ */ ao(), u = /* @__PURE__ */ Ft(), l = no(), f = n("Object.prototype.toString"), a = vi()(), h = typeof globalThis > "u" ? Pe : globalThis, k = e(), A = n("String.prototype.slice"), R = n("Array.prototype.indexOf", !0) || function(T, o) {
    for (var g = 0; g < T.length; g += 1)
      if (T[g] === o)
        return g;
    return -1;
  }, I = { __proto__: null };
  a && u && l ? t(k, function(w) {
    var T = new h[w]();
    if (Symbol.toStringTag in T && l) {
      var o = l(T), g = u(o, Symbol.toStringTag);
      if (!g && o) {
        var m = l(o);
        g = u(m, Symbol.toStringTag);
      }
      I["$" + w] = r(g.get);
    }
  }) : t(k, function(w) {
    var T = new h[w](), o = T.slice || T.set;
    o && (I[
      /** @type {`$${import('.').TypedArrayName}`} */
      "$" + w
    ] = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
    // @ts-expect-error TODO FIXME
    r(o));
  });
  var _ = function(T) {
    var o = !1;
    return t(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      I,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(g, m) {
        if (!o)
          try {
            "$" + g(T) === m && (o = /** @type {import('.').TypedArrayName} */
            A(m, 1));
          } catch {
          }
      }
    ), o;
  }, S = function(T) {
    var o = !1;
    return t(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      I,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(g, m) {
        if (!o)
          try {
            g(T), o = /** @type {import('.').TypedArrayName} */
            A(m, 1);
          } catch {
          }
      }
    ), o;
  };
  return fn = function(T) {
    if (!T || typeof T != "object")
      return !1;
    if (!a) {
      var o = A(f(T), 8, -1);
      return R(k, o) > -1 ? o : o !== "Object" ? !1 : S(T);
    }
    return u ? _(T) : null;
  }, fn;
}
var dn, Ba;
function el() {
  if (Ba) return dn;
  Ba = 1;
  var t = /* @__PURE__ */ so();
  return dn = function(r) {
    return !!t(r);
  }, dn;
}
var La;
function tl() {
  return La || (La = 1, (function(t) {
    var e = /* @__PURE__ */ Hu(), r = qu(), n = /* @__PURE__ */ so(), u = /* @__PURE__ */ el();
    function l(p) {
      return p.call.bind(p);
    }
    var f = typeof BigInt < "u", a = typeof Symbol < "u", h = l(Object.prototype.toString), k = l(Number.prototype.valueOf), A = l(String.prototype.valueOf), R = l(Boolean.prototype.valueOf);
    if (f)
      var I = l(BigInt.prototype.valueOf);
    if (a)
      var _ = l(Symbol.prototype.valueOf);
    function S(p, L) {
      if (typeof p != "object")
        return !1;
      try {
        return L(p), !0;
      } catch {
        return !1;
      }
    }
    t.isArgumentsObject = e, t.isGeneratorFunction = r, t.isTypedArray = u;
    function w(p) {
      return typeof Promise < "u" && p instanceof Promise || p !== null && typeof p == "object" && typeof p.then == "function" && typeof p.catch == "function";
    }
    t.isPromise = w;
    function T(p) {
      return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(p) : u(p) || X(p);
    }
    t.isArrayBufferView = T;
    function o(p) {
      return n(p) === "Uint8Array";
    }
    t.isUint8Array = o;
    function g(p) {
      return n(p) === "Uint8ClampedArray";
    }
    t.isUint8ClampedArray = g;
    function m(p) {
      return n(p) === "Uint16Array";
    }
    t.isUint16Array = m;
    function c(p) {
      return n(p) === "Uint32Array";
    }
    t.isUint32Array = c;
    function x(p) {
      return n(p) === "Int8Array";
    }
    t.isInt8Array = x;
    function F(p) {
      return n(p) === "Int16Array";
    }
    t.isInt16Array = F;
    function B(p) {
      return n(p) === "Int32Array";
    }
    t.isInt32Array = B;
    function z(p) {
      return n(p) === "Float32Array";
    }
    t.isFloat32Array = z;
    function C(p) {
      return n(p) === "Float64Array";
    }
    t.isFloat64Array = C;
    function $(p) {
      return n(p) === "BigInt64Array";
    }
    t.isBigInt64Array = $;
    function le(p) {
      return n(p) === "BigUint64Array";
    }
    t.isBigUint64Array = le;
    function N(p) {
      return h(p) === "[object Map]";
    }
    N.working = typeof Map < "u" && N(/* @__PURE__ */ new Map());
    function U(p) {
      return typeof Map > "u" ? !1 : N.working ? N(p) : p instanceof Map;
    }
    t.isMap = U;
    function v(p) {
      return h(p) === "[object Set]";
    }
    v.working = typeof Set < "u" && v(/* @__PURE__ */ new Set());
    function K(p) {
      return typeof Set > "u" ? !1 : v.working ? v(p) : p instanceof Set;
    }
    t.isSet = K;
    function ee(p) {
      return h(p) === "[object WeakMap]";
    }
    ee.working = typeof WeakMap < "u" && ee(/* @__PURE__ */ new WeakMap());
    function H(p) {
      return typeof WeakMap > "u" ? !1 : ee.working ? ee(p) : p instanceof WeakMap;
    }
    t.isWeakMap = H;
    function ie(p) {
      return h(p) === "[object WeakSet]";
    }
    ie.working = typeof WeakSet < "u" && ie(/* @__PURE__ */ new WeakSet());
    function Q(p) {
      return ie(p);
    }
    t.isWeakSet = Q;
    function ce(p) {
      return h(p) === "[object ArrayBuffer]";
    }
    ce.working = typeof ArrayBuffer < "u" && ce(new ArrayBuffer());
    function V(p) {
      return typeof ArrayBuffer > "u" ? !1 : ce.working ? ce(p) : p instanceof ArrayBuffer;
    }
    t.isArrayBuffer = V;
    function P(p) {
      return h(p) === "[object DataView]";
    }
    P.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && P(new DataView(new ArrayBuffer(1), 0, 1));
    function X(p) {
      return typeof DataView > "u" ? !1 : P.working ? P(p) : p instanceof DataView;
    }
    t.isDataView = X;
    var Z = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
    function te(p) {
      return h(p) === "[object SharedArrayBuffer]";
    }
    function G(p) {
      return typeof Z > "u" ? !1 : (typeof te.working > "u" && (te.working = te(new Z())), te.working ? te(p) : p instanceof Z);
    }
    t.isSharedArrayBuffer = G;
    function b(p) {
      return h(p) === "[object AsyncFunction]";
    }
    t.isAsyncFunction = b;
    function y(p) {
      return h(p) === "[object Map Iterator]";
    }
    t.isMapIterator = y;
    function W(p) {
      return h(p) === "[object Set Iterator]";
    }
    t.isSetIterator = W;
    function M(p) {
      return h(p) === "[object Generator]";
    }
    t.isGeneratorObject = M;
    function O(p) {
      return h(p) === "[object WebAssembly.Module]";
    }
    t.isWebAssemblyCompiledModule = O;
    function D(p) {
      return S(p, k);
    }
    t.isNumberObject = D;
    function J(p) {
      return S(p, A);
    }
    t.isStringObject = J;
    function d(p) {
      return S(p, R);
    }
    t.isBooleanObject = d;
    function Y(p) {
      return f && S(p, I);
    }
    t.isBigIntObject = Y;
    function E(p) {
      return a && S(p, _);
    }
    t.isSymbolObject = E;
    function i(p) {
      return D(p) || J(p) || d(p) || Y(p) || E(p);
    }
    t.isBoxedPrimitive = i;
    function s(p) {
      return typeof Uint8Array < "u" && (V(p) || G(p));
    }
    t.isAnyArrayBuffer = s, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(p) {
      Object.defineProperty(t, p, {
        enumerable: !1,
        value: function() {
          throw new Error(p + " is not supported in userland");
        }
      });
    });
  })(gr)), gr;
}
var pn, Ma;
function rl() {
  return Ma || (Ma = 1, pn = function(e) {
    return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
  }), pn;
}
var Ua;
function oo() {
  return Ua || (Ua = 1, (function(t) {
    var e = Object.getOwnPropertyDescriptors || function(X) {
      for (var Z = Object.keys(X), te = {}, G = 0; G < Z.length; G++)
        te[Z[G]] = Object.getOwnPropertyDescriptor(X, Z[G]);
      return te;
    }, r = /%[sdj%]/g;
    t.format = function(P) {
      if (!x(P)) {
        for (var X = [], Z = 0; Z < arguments.length; Z++)
          X.push(f(arguments[Z]));
        return X.join(" ");
      }
      for (var Z = 1, te = arguments, G = te.length, b = String(P).replace(r, function(W) {
        if (W === "%%") return "%";
        if (Z >= G) return W;
        switch (W) {
          case "%s":
            return String(te[Z++]);
          case "%d":
            return Number(te[Z++]);
          case "%j":
            try {
              return JSON.stringify(te[Z++]);
            } catch {
              return "[Circular]";
            }
          default:
            return W;
        }
      }), y = te[Z]; Z < G; y = te[++Z])
        g(y) || !C(y) ? b += " " + y : b += " " + f(y);
      return b;
    }, t.deprecate = function(P, X) {
      if (typeof ge < "u" && ge.noDeprecation === !0)
        return P;
      if (typeof ge > "u")
        return function() {
          return t.deprecate(P, X).apply(this, arguments);
        };
      var Z = !1;
      function te() {
        if (!Z) {
          if (ge.throwDeprecation)
            throw new Error(X);
          ge.traceDeprecation ? console.trace(X) : console.error(X), Z = !0;
        }
        return P.apply(this, arguments);
      }
      return te;
    };
    var n = {}, u = /^$/;
    if (ge.env.NODE_DEBUG) {
      var l = ge.env.NODE_DEBUG;
      l = l.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), u = new RegExp("^" + l + "$", "i");
    }
    t.debuglog = function(P) {
      if (P = P.toUpperCase(), !n[P])
        if (u.test(P)) {
          var X = ge.pid;
          n[P] = function() {
            var Z = t.format.apply(t, arguments);
            console.error("%s %d: %s", P, X, Z);
          };
        } else
          n[P] = function() {
          };
      return n[P];
    };
    function f(P, X) {
      var Z = {
        seen: [],
        stylize: h
      };
      return arguments.length >= 3 && (Z.depth = arguments[2]), arguments.length >= 4 && (Z.colors = arguments[3]), o(X) ? Z.showHidden = X : X && t._extend(Z, X), B(Z.showHidden) && (Z.showHidden = !1), B(Z.depth) && (Z.depth = 2), B(Z.colors) && (Z.colors = !1), B(Z.customInspect) && (Z.customInspect = !0), Z.colors && (Z.stylize = a), A(Z, P, Z.depth);
    }
    t.inspect = f, f.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39]
    }, f.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      // "name": intentionally not styling
      regexp: "red"
    };
    function a(P, X) {
      var Z = f.styles[X];
      return Z ? "\x1B[" + f.colors[Z][0] + "m" + P + "\x1B[" + f.colors[Z][1] + "m" : P;
    }
    function h(P, X) {
      return P;
    }
    function k(P) {
      var X = {};
      return P.forEach(function(Z, te) {
        X[Z] = !0;
      }), X;
    }
    function A(P, X, Z) {
      if (P.customInspect && X && N(X.inspect) && // Filter out the util module, it's inspect function is special
      X.inspect !== t.inspect && // Also filter out any prototype objects using the circular check.
      !(X.constructor && X.constructor.prototype === X)) {
        var te = X.inspect(Z, P);
        return x(te) || (te = A(P, te, Z)), te;
      }
      var G = R(P, X);
      if (G)
        return G;
      var b = Object.keys(X), y = k(b);
      if (P.showHidden && (b = Object.getOwnPropertyNames(X)), le(X) && (b.indexOf("message") >= 0 || b.indexOf("description") >= 0))
        return I(X);
      if (b.length === 0) {
        if (N(X)) {
          var W = X.name ? ": " + X.name : "";
          return P.stylize("[Function" + W + "]", "special");
        }
        if (z(X))
          return P.stylize(RegExp.prototype.toString.call(X), "regexp");
        if ($(X))
          return P.stylize(Date.prototype.toString.call(X), "date");
        if (le(X))
          return I(X);
      }
      var M = "", O = !1, D = ["{", "}"];
      if (T(X) && (O = !0, D = ["[", "]"]), N(X)) {
        var J = X.name ? ": " + X.name : "";
        M = " [Function" + J + "]";
      }
      if (z(X) && (M = " " + RegExp.prototype.toString.call(X)), $(X) && (M = " " + Date.prototype.toUTCString.call(X)), le(X) && (M = " " + I(X)), b.length === 0 && (!O || X.length == 0))
        return D[0] + M + D[1];
      if (Z < 0)
        return z(X) ? P.stylize(RegExp.prototype.toString.call(X), "regexp") : P.stylize("[Object]", "special");
      P.seen.push(X);
      var d;
      return O ? d = _(P, X, Z, y, b) : d = b.map(function(Y) {
        return S(P, X, Z, y, Y, O);
      }), P.seen.pop(), w(d, M, D);
    }
    function R(P, X) {
      if (B(X))
        return P.stylize("undefined", "undefined");
      if (x(X)) {
        var Z = "'" + JSON.stringify(X).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return P.stylize(Z, "string");
      }
      if (c(X))
        return P.stylize("" + X, "number");
      if (o(X))
        return P.stylize("" + X, "boolean");
      if (g(X))
        return P.stylize("null", "null");
    }
    function I(P) {
      return "[" + Error.prototype.toString.call(P) + "]";
    }
    function _(P, X, Z, te, G) {
      for (var b = [], y = 0, W = X.length; y < W; ++y)
        ie(X, String(y)) ? b.push(S(
          P,
          X,
          Z,
          te,
          String(y),
          !0
        )) : b.push("");
      return G.forEach(function(M) {
        M.match(/^\d+$/) || b.push(S(
          P,
          X,
          Z,
          te,
          M,
          !0
        ));
      }), b;
    }
    function S(P, X, Z, te, G, b) {
      var y, W, M;
      if (M = Object.getOwnPropertyDescriptor(X, G) || { value: X[G] }, M.get ? M.set ? W = P.stylize("[Getter/Setter]", "special") : W = P.stylize("[Getter]", "special") : M.set && (W = P.stylize("[Setter]", "special")), ie(te, G) || (y = "[" + G + "]"), W || (P.seen.indexOf(M.value) < 0 ? (g(Z) ? W = A(P, M.value, null) : W = A(P, M.value, Z - 1), W.indexOf(`
`) > -1 && (b ? W = W.split(`
`).map(function(O) {
        return "  " + O;
      }).join(`
`).slice(2) : W = `
` + W.split(`
`).map(function(O) {
        return "   " + O;
      }).join(`
`))) : W = P.stylize("[Circular]", "special")), B(y)) {
        if (b && G.match(/^\d+$/))
          return W;
        y = JSON.stringify("" + G), y.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (y = y.slice(1, -1), y = P.stylize(y, "name")) : (y = y.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), y = P.stylize(y, "string"));
      }
      return y + ": " + W;
    }
    function w(P, X, Z) {
      var te = P.reduce(function(G, b) {
        return b.indexOf(`
`) >= 0, G + b.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      return te > 60 ? Z[0] + (X === "" ? "" : X + `
 `) + " " + P.join(`,
  `) + " " + Z[1] : Z[0] + X + " " + P.join(", ") + " " + Z[1];
    }
    t.types = tl();
    function T(P) {
      return Array.isArray(P);
    }
    t.isArray = T;
    function o(P) {
      return typeof P == "boolean";
    }
    t.isBoolean = o;
    function g(P) {
      return P === null;
    }
    t.isNull = g;
    function m(P) {
      return P == null;
    }
    t.isNullOrUndefined = m;
    function c(P) {
      return typeof P == "number";
    }
    t.isNumber = c;
    function x(P) {
      return typeof P == "string";
    }
    t.isString = x;
    function F(P) {
      return typeof P == "symbol";
    }
    t.isSymbol = F;
    function B(P) {
      return P === void 0;
    }
    t.isUndefined = B;
    function z(P) {
      return C(P) && v(P) === "[object RegExp]";
    }
    t.isRegExp = z, t.types.isRegExp = z;
    function C(P) {
      return typeof P == "object" && P !== null;
    }
    t.isObject = C;
    function $(P) {
      return C(P) && v(P) === "[object Date]";
    }
    t.isDate = $, t.types.isDate = $;
    function le(P) {
      return C(P) && (v(P) === "[object Error]" || P instanceof Error);
    }
    t.isError = le, t.types.isNativeError = le;
    function N(P) {
      return typeof P == "function";
    }
    t.isFunction = N;
    function U(P) {
      return P === null || typeof P == "boolean" || typeof P == "number" || typeof P == "string" || typeof P == "symbol" || // ES6 symbol
      typeof P > "u";
    }
    t.isPrimitive = U, t.isBuffer = rl();
    function v(P) {
      return Object.prototype.toString.call(P);
    }
    function K(P) {
      return P < 10 ? "0" + P.toString(10) : P.toString(10);
    }
    var ee = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function H() {
      var P = /* @__PURE__ */ new Date(), X = [
        K(P.getHours()),
        K(P.getMinutes()),
        K(P.getSeconds())
      ].join(":");
      return [P.getDate(), ee[P.getMonth()], X].join(" ");
    }
    t.log = function() {
      console.log("%s - %s", H(), t.format.apply(t, arguments));
    }, t.inherits = et(), t._extend = function(P, X) {
      if (!X || !C(X)) return P;
      for (var Z = Object.keys(X), te = Z.length; te--; )
        P[Z[te]] = X[Z[te]];
      return P;
    };
    function ie(P, X) {
      return Object.prototype.hasOwnProperty.call(P, X);
    }
    var Q = typeof Symbol < "u" ? /* @__PURE__ */ Symbol("util.promisify.custom") : void 0;
    t.promisify = function(X) {
      if (typeof X != "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (Q && X[Q]) {
        var Z = X[Q];
        if (typeof Z != "function")
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty(Z, Q, {
          value: Z,
          enumerable: !1,
          writable: !1,
          configurable: !0
        }), Z;
      }
      function Z() {
        for (var te, G, b = new Promise(function(M, O) {
          te = M, G = O;
        }), y = [], W = 0; W < arguments.length; W++)
          y.push(arguments[W]);
        y.push(function(M, O) {
          M ? G(M) : te(O);
        });
        try {
          X.apply(this, y);
        } catch (M) {
          G(M);
        }
        return b;
      }
      return Object.setPrototypeOf(Z, Object.getPrototypeOf(X)), Q && Object.defineProperty(Z, Q, {
        value: Z,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), Object.defineProperties(
        Z,
        e(X)
      );
    }, t.promisify.custom = Q;
    function ce(P, X) {
      if (!P) {
        var Z = new Error("Promise was rejected with a falsy value");
        Z.reason = P, P = Z;
      }
      return X(P);
    }
    function V(P) {
      if (typeof P != "function")
        throw new TypeError('The "original" argument must be of type Function');
      function X() {
        for (var Z = [], te = 0; te < arguments.length; te++)
          Z.push(arguments[te]);
        var G = Z.pop();
        if (typeof G != "function")
          throw new TypeError("The last argument must be of type Function");
        var b = this, y = function() {
          return G.apply(b, arguments);
        };
        P.apply(this, Z).then(
          function(W) {
            ge.nextTick(y.bind(null, null, W));
          },
          function(W) {
            ge.nextTick(ce.bind(null, W, y));
          }
        );
      }
      return Object.setPrototypeOf(X, Object.getPrototypeOf(P)), Object.defineProperties(
        X,
        e(P)
      ), X;
    }
    t.callbackify = V;
  })(wr)), wr;
}
var mn, ja;
function nl() {
  if (ja) return mn;
  ja = 1;
  function t(S, w) {
    var T = Object.keys(S);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(S);
      w && (o = o.filter(function(g) {
        return Object.getOwnPropertyDescriptor(S, g).enumerable;
      })), T.push.apply(T, o);
    }
    return T;
  }
  function e(S) {
    for (var w = 1; w < arguments.length; w++) {
      var T = arguments[w] != null ? arguments[w] : {};
      w % 2 ? t(Object(T), !0).forEach(function(o) {
        r(S, o, T[o]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(S, Object.getOwnPropertyDescriptors(T)) : t(Object(T)).forEach(function(o) {
        Object.defineProperty(S, o, Object.getOwnPropertyDescriptor(T, o));
      });
    }
    return S;
  }
  function r(S, w, T) {
    return w = f(w), w in S ? Object.defineProperty(S, w, { value: T, enumerable: !0, configurable: !0, writable: !0 }) : S[w] = T, S;
  }
  function n(S, w) {
    if (!(S instanceof w))
      throw new TypeError("Cannot call a class as a function");
  }
  function u(S, w) {
    for (var T = 0; T < w.length; T++) {
      var o = w[T];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(S, f(o.key), o);
    }
  }
  function l(S, w, T) {
    return w && u(S.prototype, w), Object.defineProperty(S, "prototype", { writable: !1 }), S;
  }
  function f(S) {
    var w = a(S, "string");
    return typeof w == "symbol" ? w : String(w);
  }
  function a(S, w) {
    if (typeof S != "object" || S === null) return S;
    var T = S[Symbol.toPrimitive];
    if (T !== void 0) {
      var o = T.call(S, w);
      if (typeof o != "object") return o;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(S);
  }
  var h = ir(), k = h.Buffer, A = oo(), R = A.inspect, I = R && R.custom || "inspect";
  function _(S, w, T) {
    k.prototype.copy.call(S, w, T);
  }
  return mn = /* @__PURE__ */ (function() {
    function S() {
      n(this, S), this.head = null, this.tail = null, this.length = 0;
    }
    return l(S, [{
      key: "push",
      value: function(T) {
        var o = {
          data: T,
          next: null
        };
        this.length > 0 ? this.tail.next = o : this.head = o, this.tail = o, ++this.length;
      }
    }, {
      key: "unshift",
      value: function(T) {
        var o = {
          data: T,
          next: this.head
        };
        this.length === 0 && (this.tail = o), this.head = o, ++this.length;
      }
    }, {
      key: "shift",
      value: function() {
        if (this.length !== 0) {
          var T = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, T;
        }
      }
    }, {
      key: "clear",
      value: function() {
        this.head = this.tail = null, this.length = 0;
      }
    }, {
      key: "join",
      value: function(T) {
        if (this.length === 0) return "";
        for (var o = this.head, g = "" + o.data; o = o.next; ) g += T + o.data;
        return g;
      }
    }, {
      key: "concat",
      value: function(T) {
        if (this.length === 0) return k.alloc(0);
        for (var o = k.allocUnsafe(T >>> 0), g = this.head, m = 0; g; )
          _(g.data, o, m), m += g.data.length, g = g.next;
        return o;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function(T, o) {
        var g;
        return T < this.head.data.length ? (g = this.head.data.slice(0, T), this.head.data = this.head.data.slice(T)) : T === this.head.data.length ? g = this.shift() : g = o ? this._getString(T) : this._getBuffer(T), g;
      }
    }, {
      key: "first",
      value: function() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function(T) {
        var o = this.head, g = 1, m = o.data;
        for (T -= m.length; o = o.next; ) {
          var c = o.data, x = T > c.length ? c.length : T;
          if (x === c.length ? m += c : m += c.slice(0, T), T -= x, T === 0) {
            x === c.length ? (++g, o.next ? this.head = o.next : this.head = this.tail = null) : (this.head = o, o.data = c.slice(x));
            break;
          }
          ++g;
        }
        return this.length -= g, m;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function(T) {
        var o = k.allocUnsafe(T), g = this.head, m = 1;
        for (g.data.copy(o), T -= g.data.length; g = g.next; ) {
          var c = g.data, x = T > c.length ? c.length : T;
          if (c.copy(o, o.length - T, 0, x), T -= x, T === 0) {
            x === c.length ? (++m, g.next ? this.head = g.next : this.head = this.tail = null) : (this.head = g, g.data = c.slice(x));
            break;
          }
          ++m;
        }
        return this.length -= m, o;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: I,
      value: function(T, o) {
        return R(this, e(e({}, o), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), S;
  })(), mn;
}
var wn, za;
function uo() {
  if (za) return wn;
  za = 1;
  function t(f, a) {
    var h = this, k = this._readableState && this._readableState.destroyed, A = this._writableState && this._writableState.destroyed;
    return k || A ? (a ? a(f) : f && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, ge.nextTick(u, this, f)) : ge.nextTick(u, this, f)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(f || null, function(R) {
      !a && R ? h._writableState ? h._writableState.errorEmitted ? ge.nextTick(r, h) : (h._writableState.errorEmitted = !0, ge.nextTick(e, h, R)) : ge.nextTick(e, h, R) : a ? (ge.nextTick(r, h), a(R)) : ge.nextTick(r, h);
    }), this);
  }
  function e(f, a) {
    u(f, a), r(f);
  }
  function r(f) {
    f._writableState && !f._writableState.emitClose || f._readableState && !f._readableState.emitClose || f.emit("close");
  }
  function n() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function u(f, a) {
    f.emit("error", a);
  }
  function l(f, a) {
    var h = f._readableState, k = f._writableState;
    h && h.autoDestroy || k && k.autoDestroy ? f.destroy(a) : f.emit("error", a);
  }
  return wn = {
    destroy: t,
    undestroy: n,
    errorOrDestroy: l
  }, wn;
}
var gn = {}, Wa;
function _t() {
  if (Wa) return gn;
  Wa = 1;
  function t(a, h) {
    a.prototype = Object.create(h.prototype), a.prototype.constructor = a, a.__proto__ = h;
  }
  var e = {};
  function r(a, h, k) {
    k || (k = Error);
    function A(I, _, S) {
      return typeof h == "string" ? h : h(I, _, S);
    }
    var R = /* @__PURE__ */ (function(I) {
      t(_, I);
      function _(S, w, T) {
        return I.call(this, A(S, w, T)) || this;
      }
      return _;
    })(k);
    R.prototype.name = k.name, R.prototype.code = a, e[a] = R;
  }
  function n(a, h) {
    if (Array.isArray(a)) {
      var k = a.length;
      return a = a.map(function(A) {
        return String(A);
      }), k > 2 ? "one of ".concat(h, " ").concat(a.slice(0, k - 1).join(", "), ", or ") + a[k - 1] : k === 2 ? "one of ".concat(h, " ").concat(a[0], " or ").concat(a[1]) : "of ".concat(h, " ").concat(a[0]);
    } else
      return "of ".concat(h, " ").concat(String(a));
  }
  function u(a, h, k) {
    return a.substr(0, h.length) === h;
  }
  function l(a, h, k) {
    return (k === void 0 || k > a.length) && (k = a.length), a.substring(k - h.length, k) === h;
  }
  function f(a, h, k) {
    return typeof k != "number" && (k = 0), k + h.length > a.length ? !1 : a.indexOf(h, k) !== -1;
  }
  return r("ERR_INVALID_OPT_VALUE", function(a, h) {
    return 'The value "' + h + '" is invalid for option "' + a + '"';
  }, TypeError), r("ERR_INVALID_ARG_TYPE", function(a, h, k) {
    var A;
    typeof h == "string" && u(h, "not ") ? (A = "must not be", h = h.replace(/^not /, "")) : A = "must be";
    var R;
    if (l(a, " argument"))
      R = "The ".concat(a, " ").concat(A, " ").concat(n(h, "type"));
    else {
      var I = f(a, ".") ? "property" : "argument";
      R = 'The "'.concat(a, '" ').concat(I, " ").concat(A, " ").concat(n(h, "type"));
    }
    return R += ". Received type ".concat(typeof k), R;
  }, TypeError), r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), r("ERR_METHOD_NOT_IMPLEMENTED", function(a) {
    return "The " + a + " method is not implemented";
  }), r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), r("ERR_STREAM_DESTROYED", function(a) {
    return "Cannot call " + a + " after a stream was destroyed";
  }), r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), r("ERR_STREAM_WRITE_AFTER_END", "write after end"), r("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), r("ERR_UNKNOWN_ENCODING", function(a) {
    return "Unknown encoding: " + a;
  }, TypeError), r("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), gn.codes = e, gn;
}
var yn, Ha;
function lo() {
  if (Ha) return yn;
  Ha = 1;
  var t = _t().codes.ERR_INVALID_OPT_VALUE;
  function e(n, u, l) {
    return n.highWaterMark != null ? n.highWaterMark : u ? n[l] : null;
  }
  function r(n, u, l, f) {
    var a = e(u, f, l);
    if (a != null) {
      if (!(isFinite(a) && Math.floor(a) === a) || a < 0) {
        var h = f ? l : "highWaterMark";
        throw new t(h, a);
      }
      return Math.floor(a);
    }
    return n.objectMode ? 16 : 16 * 1024;
  }
  return yn = {
    getHighWaterMark: r
  }, yn;
}
var vn, qa;
function il() {
  if (qa) return vn;
  qa = 1, vn = t;
  function t(r, n) {
    if (e("noDeprecation"))
      return r;
    var u = !1;
    function l() {
      if (!u) {
        if (e("throwDeprecation"))
          throw new Error(n);
        e("traceDeprecation") ? console.trace(n) : console.warn(n), u = !0;
      }
      return r.apply(this, arguments);
    }
    return l;
  }
  function e(r) {
    try {
      if (!Pe.localStorage) return !1;
    } catch {
      return !1;
    }
    var n = Pe.localStorage[r];
    return n == null ? !1 : String(n).toLowerCase() === "true";
  }
  return vn;
}
var bn, Ga;
function co() {
  if (Ga) return bn;
  Ga = 1, bn = z;
  function t(G) {
    var b = this;
    this.next = null, this.entry = null, this.finish = function() {
      te(b, G);
    };
  }
  var e;
  z.WritableState = F;
  var r = {
    deprecate: il()
  }, n = Zs(), u = ir().Buffer, l = (typeof Pe < "u" ? Pe : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function f(G) {
    return u.from(G);
  }
  function a(G) {
    return u.isBuffer(G) || G instanceof l;
  }
  var h = uo(), k = lo(), A = k.getHighWaterMark, R = _t().codes, I = R.ERR_INVALID_ARG_TYPE, _ = R.ERR_METHOD_NOT_IMPLEMENTED, S = R.ERR_MULTIPLE_CALLBACK, w = R.ERR_STREAM_CANNOT_PIPE, T = R.ERR_STREAM_DESTROYED, o = R.ERR_STREAM_NULL_VALUES, g = R.ERR_STREAM_WRITE_AFTER_END, m = R.ERR_UNKNOWN_ENCODING, c = h.errorOrDestroy;
  et()(z, n);
  function x() {
  }
  function F(G, b, y) {
    e = e || yt(), G = G || {}, typeof y != "boolean" && (y = b instanceof e), this.objectMode = !!G.objectMode, y && (this.objectMode = this.objectMode || !!G.writableObjectMode), this.highWaterMark = A(this, G, "writableHighWaterMark", y), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var W = G.decodeStrings === !1;
    this.decodeStrings = !W, this.defaultEncoding = G.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(M) {
      ee(b, M);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = G.emitClose !== !1, this.autoDestroy = !!G.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new t(this);
  }
  F.prototype.getBuffer = function() {
    for (var b = this.bufferedRequest, y = []; b; )
      y.push(b), b = b.next;
    return y;
  }, (function() {
    try {
      Object.defineProperty(F.prototype, "buffer", {
        get: r.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  })();
  var B;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (B = Function.prototype[Symbol.hasInstance], Object.defineProperty(z, Symbol.hasInstance, {
    value: function(b) {
      return B.call(this, b) ? !0 : this !== z ? !1 : b && b._writableState instanceof F;
    }
  })) : B = function(b) {
    return b instanceof this;
  };
  function z(G) {
    e = e || yt();
    var b = this instanceof e;
    if (!b && !B.call(z, this)) return new z(G);
    this._writableState = new F(G, this, b), this.writable = !0, G && (typeof G.write == "function" && (this._write = G.write), typeof G.writev == "function" && (this._writev = G.writev), typeof G.destroy == "function" && (this._destroy = G.destroy), typeof G.final == "function" && (this._final = G.final)), n.call(this);
  }
  z.prototype.pipe = function() {
    c(this, new w());
  };
  function C(G, b) {
    var y = new g();
    c(G, y), ge.nextTick(b, y);
  }
  function $(G, b, y, W) {
    var M;
    return y === null ? M = new o() : typeof y != "string" && !b.objectMode && (M = new I("chunk", ["string", "Buffer"], y)), M ? (c(G, M), ge.nextTick(W, M), !1) : !0;
  }
  z.prototype.write = function(G, b, y) {
    var W = this._writableState, M = !1, O = !W.objectMode && a(G);
    return O && !u.isBuffer(G) && (G = f(G)), typeof b == "function" && (y = b, b = null), O ? b = "buffer" : b || (b = W.defaultEncoding), typeof y != "function" && (y = x), W.ending ? C(this, y) : (O || $(this, W, G, y)) && (W.pendingcb++, M = N(this, W, O, G, b, y)), M;
  }, z.prototype.cork = function() {
    this._writableState.corked++;
  }, z.prototype.uncork = function() {
    var G = this._writableState;
    G.corked && (G.corked--, !G.writing && !G.corked && !G.bufferProcessing && G.bufferedRequest && Q(this, G));
  }, z.prototype.setDefaultEncoding = function(b) {
    if (typeof b == "string" && (b = b.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((b + "").toLowerCase()) > -1)) throw new m(b);
    return this._writableState.defaultEncoding = b, this;
  }, Object.defineProperty(z.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function le(G, b, y) {
    return !G.objectMode && G.decodeStrings !== !1 && typeof b == "string" && (b = u.from(b, y)), b;
  }
  Object.defineProperty(z.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function N(G, b, y, W, M, O) {
    if (!y) {
      var D = le(b, W, M);
      W !== D && (y = !0, M = "buffer", W = D);
    }
    var J = b.objectMode ? 1 : W.length;
    b.length += J;
    var d = b.length < b.highWaterMark;
    if (d || (b.needDrain = !0), b.writing || b.corked) {
      var Y = b.lastBufferedRequest;
      b.lastBufferedRequest = {
        chunk: W,
        encoding: M,
        isBuf: y,
        callback: O,
        next: null
      }, Y ? Y.next = b.lastBufferedRequest : b.bufferedRequest = b.lastBufferedRequest, b.bufferedRequestCount += 1;
    } else
      U(G, b, !1, J, W, M, O);
    return d;
  }
  function U(G, b, y, W, M, O, D) {
    b.writelen = W, b.writecb = D, b.writing = !0, b.sync = !0, b.destroyed ? b.onwrite(new T("write")) : y ? G._writev(M, b.onwrite) : G._write(M, O, b.onwrite), b.sync = !1;
  }
  function v(G, b, y, W, M) {
    --b.pendingcb, y ? (ge.nextTick(M, W), ge.nextTick(X, G, b), G._writableState.errorEmitted = !0, c(G, W)) : (M(W), G._writableState.errorEmitted = !0, c(G, W), X(G, b));
  }
  function K(G) {
    G.writing = !1, G.writecb = null, G.length -= G.writelen, G.writelen = 0;
  }
  function ee(G, b) {
    var y = G._writableState, W = y.sync, M = y.writecb;
    if (typeof M != "function") throw new S();
    if (K(y), b) v(G, y, W, b, M);
    else {
      var O = ce(y) || G.destroyed;
      !O && !y.corked && !y.bufferProcessing && y.bufferedRequest && Q(G, y), W ? ge.nextTick(H, G, y, O, M) : H(G, y, O, M);
    }
  }
  function H(G, b, y, W) {
    y || ie(G, b), b.pendingcb--, W(), X(G, b);
  }
  function ie(G, b) {
    b.length === 0 && b.needDrain && (b.needDrain = !1, G.emit("drain"));
  }
  function Q(G, b) {
    b.bufferProcessing = !0;
    var y = b.bufferedRequest;
    if (G._writev && y && y.next) {
      var W = b.bufferedRequestCount, M = new Array(W), O = b.corkedRequestsFree;
      O.entry = y;
      for (var D = 0, J = !0; y; )
        M[D] = y, y.isBuf || (J = !1), y = y.next, D += 1;
      M.allBuffers = J, U(G, b, !0, b.length, M, "", O.finish), b.pendingcb++, b.lastBufferedRequest = null, O.next ? (b.corkedRequestsFree = O.next, O.next = null) : b.corkedRequestsFree = new t(b), b.bufferedRequestCount = 0;
    } else {
      for (; y; ) {
        var d = y.chunk, Y = y.encoding, E = y.callback, i = b.objectMode ? 1 : d.length;
        if (U(G, b, !1, i, d, Y, E), y = y.next, b.bufferedRequestCount--, b.writing)
          break;
      }
      y === null && (b.lastBufferedRequest = null);
    }
    b.bufferedRequest = y, b.bufferProcessing = !1;
  }
  z.prototype._write = function(G, b, y) {
    y(new _("_write()"));
  }, z.prototype._writev = null, z.prototype.end = function(G, b, y) {
    var W = this._writableState;
    return typeof G == "function" ? (y = G, G = null, b = null) : typeof b == "function" && (y = b, b = null), G != null && this.write(G, b), W.corked && (W.corked = 1, this.uncork()), W.ending || Z(this, W, y), this;
  }, Object.defineProperty(z.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function ce(G) {
    return G.ending && G.length === 0 && G.bufferedRequest === null && !G.finished && !G.writing;
  }
  function V(G, b) {
    G._final(function(y) {
      b.pendingcb--, y && c(G, y), b.prefinished = !0, G.emit("prefinish"), X(G, b);
    });
  }
  function P(G, b) {
    !b.prefinished && !b.finalCalled && (typeof G._final == "function" && !b.destroyed ? (b.pendingcb++, b.finalCalled = !0, ge.nextTick(V, G, b)) : (b.prefinished = !0, G.emit("prefinish")));
  }
  function X(G, b) {
    var y = ce(b);
    if (y && (P(G, b), b.pendingcb === 0 && (b.finished = !0, G.emit("finish"), b.autoDestroy))) {
      var W = G._readableState;
      (!W || W.autoDestroy && W.endEmitted) && G.destroy();
    }
    return y;
  }
  function Z(G, b, y) {
    b.ending = !0, X(G, b), y && (b.finished ? ge.nextTick(y) : G.once("finish", y)), b.ended = !0, G.writable = !1;
  }
  function te(G, b, y) {
    var W = G.entry;
    for (G.entry = null; W; ) {
      var M = W.callback;
      b.pendingcb--, M(y), W = W.next;
    }
    b.corkedRequestsFree.next = G;
  }
  return Object.defineProperty(z.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(b) {
      this._writableState && (this._writableState.destroyed = b);
    }
  }), z.prototype.destroy = h.destroy, z.prototype._undestroy = h.undestroy, z.prototype._destroy = function(G, b) {
    b(G);
  }, bn;
}
var _n, Ka;
function yt() {
  if (Ka) return _n;
  Ka = 1;
  var t = Object.keys || function(k) {
    var A = [];
    for (var R in k) A.push(R);
    return A;
  };
  _n = f;
  var e = ho(), r = co();
  et()(f, e);
  for (var n = t(r.prototype), u = 0; u < n.length; u++) {
    var l = n[u];
    f.prototype[l] || (f.prototype[l] = r.prototype[l]);
  }
  function f(k) {
    if (!(this instanceof f)) return new f(k);
    e.call(this, k), r.call(this, k), this.allowHalfOpen = !0, k && (k.readable === !1 && (this.readable = !1), k.writable === !1 && (this.writable = !1), k.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", a)));
  }
  Object.defineProperty(f.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(f.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(f.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function a() {
    this._writableState.ended || ge.nextTick(h, this);
  }
  function h(k) {
    k.end();
  }
  return Object.defineProperty(f.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(A) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = A, this._writableState.destroyed = A);
    }
  }), _n;
}
var En = {}, Gt = { exports: {} }, Va;
function al() {
  return Va || (Va = 1, (function(t, e) {
    var r = ir(), n = r.Buffer;
    function u(f, a) {
      for (var h in f)
        a[h] = f[h];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (u(r, e), e.Buffer = l);
    function l(f, a, h) {
      return n(f, a, h);
    }
    u(n, l), l.from = function(f, a, h) {
      if (typeof f == "number")
        throw new TypeError("Argument must not be a number");
      return n(f, a, h);
    }, l.alloc = function(f, a, h) {
      if (typeof f != "number")
        throw new TypeError("Argument must be a number");
      var k = n(f);
      return a !== void 0 ? typeof h == "string" ? k.fill(a, h) : k.fill(a) : k.fill(0), k;
    }, l.allocUnsafe = function(f) {
      if (typeof f != "number")
        throw new TypeError("Argument must be a number");
      return n(f);
    }, l.allocUnsafeSlow = function(f) {
      if (typeof f != "number")
        throw new TypeError("Argument must be a number");
      return r.SlowBuffer(f);
    };
  })(Gt, Gt.exports)), Gt.exports;
}
var Xa;
function di() {
  if (Xa) return En;
  Xa = 1;
  var t = al().Buffer, e = t.isEncoding || function(o) {
    switch (o = "" + o, o && o.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function r(o) {
    if (!o) return "utf8";
    for (var g; ; )
      switch (o) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return o;
        default:
          if (g) return;
          o = ("" + o).toLowerCase(), g = !0;
      }
  }
  function n(o) {
    var g = r(o);
    if (typeof g != "string" && (t.isEncoding === e || !e(o))) throw new Error("Unknown encoding: " + o);
    return g || o;
  }
  En.StringDecoder = u;
  function u(o) {
    this.encoding = n(o);
    var g;
    switch (this.encoding) {
      case "utf16le":
        this.text = R, this.end = I, g = 4;
        break;
      case "utf8":
        this.fillLast = h, g = 4;
        break;
      case "base64":
        this.text = _, this.end = S, g = 3;
        break;
      default:
        this.write = w, this.end = T;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(g);
  }
  u.prototype.write = function(o) {
    if (o.length === 0) return "";
    var g, m;
    if (this.lastNeed) {
      if (g = this.fillLast(o), g === void 0) return "";
      m = this.lastNeed, this.lastNeed = 0;
    } else
      m = 0;
    return m < o.length ? g ? g + this.text(o, m) : this.text(o, m) : g || "";
  }, u.prototype.end = A, u.prototype.text = k, u.prototype.fillLast = function(o) {
    if (this.lastNeed <= o.length)
      return o.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    o.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, o.length), this.lastNeed -= o.length;
  };
  function l(o) {
    return o <= 127 ? 0 : o >> 5 === 6 ? 2 : o >> 4 === 14 ? 3 : o >> 3 === 30 ? 4 : o >> 6 === 2 ? -1 : -2;
  }
  function f(o, g, m) {
    var c = g.length - 1;
    if (c < m) return 0;
    var x = l(g[c]);
    return x >= 0 ? (x > 0 && (o.lastNeed = x - 1), x) : --c < m || x === -2 ? 0 : (x = l(g[c]), x >= 0 ? (x > 0 && (o.lastNeed = x - 2), x) : --c < m || x === -2 ? 0 : (x = l(g[c]), x >= 0 ? (x > 0 && (x === 2 ? x = 0 : o.lastNeed = x - 3), x) : 0));
  }
  function a(o, g, m) {
    if ((g[0] & 192) !== 128)
      return o.lastNeed = 0, "�";
    if (o.lastNeed > 1 && g.length > 1) {
      if ((g[1] & 192) !== 128)
        return o.lastNeed = 1, "�";
      if (o.lastNeed > 2 && g.length > 2 && (g[2] & 192) !== 128)
        return o.lastNeed = 2, "�";
    }
  }
  function h(o) {
    var g = this.lastTotal - this.lastNeed, m = a(this, o);
    if (m !== void 0) return m;
    if (this.lastNeed <= o.length)
      return o.copy(this.lastChar, g, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    o.copy(this.lastChar, g, 0, o.length), this.lastNeed -= o.length;
  }
  function k(o, g) {
    var m = f(this, o, g);
    if (!this.lastNeed) return o.toString("utf8", g);
    this.lastTotal = m;
    var c = o.length - (m - this.lastNeed);
    return o.copy(this.lastChar, 0, c), o.toString("utf8", g, c);
  }
  function A(o) {
    var g = o && o.length ? this.write(o) : "";
    return this.lastNeed ? g + "�" : g;
  }
  function R(o, g) {
    if ((o.length - g) % 2 === 0) {
      var m = o.toString("utf16le", g);
      if (m) {
        var c = m.charCodeAt(m.length - 1);
        if (c >= 55296 && c <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = o[o.length - 2], this.lastChar[1] = o[o.length - 1], m.slice(0, -1);
      }
      return m;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = o[o.length - 1], o.toString("utf16le", g, o.length - 1);
  }
  function I(o) {
    var g = o && o.length ? this.write(o) : "";
    if (this.lastNeed) {
      var m = this.lastTotal - this.lastNeed;
      return g + this.lastChar.toString("utf16le", 0, m);
    }
    return g;
  }
  function _(o, g) {
    var m = (o.length - g) % 3;
    return m === 0 ? o.toString("base64", g) : (this.lastNeed = 3 - m, this.lastTotal = 3, m === 1 ? this.lastChar[0] = o[o.length - 1] : (this.lastChar[0] = o[o.length - 2], this.lastChar[1] = o[o.length - 1]), o.toString("base64", g, o.length - m));
  }
  function S(o) {
    var g = o && o.length ? this.write(o) : "";
    return this.lastNeed ? g + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : g;
  }
  function w(o) {
    return o.toString(this.encoding);
  }
  function T(o) {
    return o && o.length ? this.write(o) : "";
  }
  return En;
}
var xn, $a;
function xi() {
  if ($a) return xn;
  $a = 1;
  var t = _t().codes.ERR_STREAM_PREMATURE_CLOSE;
  function e(l) {
    var f = !1;
    return function() {
      if (!f) {
        f = !0;
        for (var a = arguments.length, h = new Array(a), k = 0; k < a; k++)
          h[k] = arguments[k];
        l.apply(this, h);
      }
    };
  }
  function r() {
  }
  function n(l) {
    return l.setHeader && typeof l.abort == "function";
  }
  function u(l, f, a) {
    if (typeof f == "function") return u(l, null, f);
    f || (f = {}), a = e(a || r);
    var h = f.readable || f.readable !== !1 && l.readable, k = f.writable || f.writable !== !1 && l.writable, A = function() {
      l.writable || I();
    }, R = l._writableState && l._writableState.finished, I = function() {
      k = !1, R = !0, h || a.call(l);
    }, _ = l._readableState && l._readableState.endEmitted, S = function() {
      h = !1, _ = !0, k || a.call(l);
    }, w = function(m) {
      a.call(l, m);
    }, T = function() {
      var m;
      if (h && !_)
        return (!l._readableState || !l._readableState.ended) && (m = new t()), a.call(l, m);
      if (k && !R)
        return (!l._writableState || !l._writableState.ended) && (m = new t()), a.call(l, m);
    }, o = function() {
      l.req.on("finish", I);
    };
    return n(l) ? (l.on("complete", I), l.on("abort", T), l.req ? o() : l.on("request", o)) : k && !l._writableState && (l.on("end", A), l.on("close", A)), l.on("end", S), l.on("finish", I), f.error !== !1 && l.on("error", w), l.on("close", T), function() {
      l.removeListener("complete", I), l.removeListener("abort", T), l.removeListener("request", o), l.req && l.req.removeListener("finish", I), l.removeListener("end", A), l.removeListener("close", A), l.removeListener("finish", I), l.removeListener("end", S), l.removeListener("error", w), l.removeListener("close", T);
    };
  }
  return xn = u, xn;
}
var Tn, Za;
function sl() {
  if (Za) return Tn;
  Za = 1;
  var t;
  function e(m, c, x) {
    return c = r(c), c in m ? Object.defineProperty(m, c, { value: x, enumerable: !0, configurable: !0, writable: !0 }) : m[c] = x, m;
  }
  function r(m) {
    var c = n(m, "string");
    return typeof c == "symbol" ? c : String(c);
  }
  function n(m, c) {
    if (typeof m != "object" || m === null) return m;
    var x = m[Symbol.toPrimitive];
    if (x !== void 0) {
      var F = x.call(m, c);
      if (typeof F != "object") return F;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (c === "string" ? String : Number)(m);
  }
  var u = xi(), l = /* @__PURE__ */ Symbol("lastResolve"), f = /* @__PURE__ */ Symbol("lastReject"), a = /* @__PURE__ */ Symbol("error"), h = /* @__PURE__ */ Symbol("ended"), k = /* @__PURE__ */ Symbol("lastPromise"), A = /* @__PURE__ */ Symbol("handlePromise"), R = /* @__PURE__ */ Symbol("stream");
  function I(m, c) {
    return {
      value: m,
      done: c
    };
  }
  function _(m) {
    var c = m[l];
    if (c !== null) {
      var x = m[R].read();
      x !== null && (m[k] = null, m[l] = null, m[f] = null, c(I(x, !1)));
    }
  }
  function S(m) {
    ge.nextTick(_, m);
  }
  function w(m, c) {
    return function(x, F) {
      m.then(function() {
        if (c[h]) {
          x(I(void 0, !0));
          return;
        }
        c[A](x, F);
      }, F);
    };
  }
  var T = Object.getPrototypeOf(function() {
  }), o = Object.setPrototypeOf((t = {
    get stream() {
      return this[R];
    },
    next: function() {
      var c = this, x = this[a];
      if (x !== null)
        return Promise.reject(x);
      if (this[h])
        return Promise.resolve(I(void 0, !0));
      if (this[R].destroyed)
        return new Promise(function(C, $) {
          ge.nextTick(function() {
            c[a] ? $(c[a]) : C(I(void 0, !0));
          });
        });
      var F = this[k], B;
      if (F)
        B = new Promise(w(F, this));
      else {
        var z = this[R].read();
        if (z !== null)
          return Promise.resolve(I(z, !1));
        B = new Promise(this[A]);
      }
      return this[k] = B, B;
    }
  }, e(t, Symbol.asyncIterator, function() {
    return this;
  }), e(t, "return", function() {
    var c = this;
    return new Promise(function(x, F) {
      c[R].destroy(null, function(B) {
        if (B) {
          F(B);
          return;
        }
        x(I(void 0, !0));
      });
    });
  }), t), T), g = function(c) {
    var x, F = Object.create(o, (x = {}, e(x, R, {
      value: c,
      writable: !0
    }), e(x, l, {
      value: null,
      writable: !0
    }), e(x, f, {
      value: null,
      writable: !0
    }), e(x, a, {
      value: null,
      writable: !0
    }), e(x, h, {
      value: c._readableState.endEmitted,
      writable: !0
    }), e(x, A, {
      value: function(z, C) {
        var $ = F[R].read();
        $ ? (F[k] = null, F[l] = null, F[f] = null, z(I($, !1))) : (F[l] = z, F[f] = C);
      },
      writable: !0
    }), x));
    return F[k] = null, u(c, function(B) {
      if (B && B.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var z = F[f];
        z !== null && (F[k] = null, F[l] = null, F[f] = null, z(B)), F[a] = B;
        return;
      }
      var C = F[l];
      C !== null && (F[k] = null, F[l] = null, F[f] = null, C(I(void 0, !0))), F[h] = !0;
    }), c.on("readable", S.bind(null, F)), F;
  };
  return Tn = g, Tn;
}
var Sn, Ya;
function ol() {
  return Ya || (Ya = 1, Sn = function() {
    throw new Error("Readable.from is not available in the browser");
  }), Sn;
}
var An, Ja;
function ho() {
  if (Ja) return An;
  Ja = 1, An = C;
  var t;
  C.ReadableState = z, yi().EventEmitter;
  var e = function(D, J) {
    return D.listeners(J).length;
  }, r = Zs(), n = ir().Buffer, u = (typeof Pe < "u" ? Pe : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function l(O) {
    return n.from(O);
  }
  function f(O) {
    return n.isBuffer(O) || O instanceof u;
  }
  var a = oo(), h;
  a && a.debuglog ? h = a.debuglog("stream") : h = function() {
  };
  var k = nl(), A = uo(), R = lo(), I = R.getHighWaterMark, _ = _t().codes, S = _.ERR_INVALID_ARG_TYPE, w = _.ERR_STREAM_PUSH_AFTER_EOF, T = _.ERR_METHOD_NOT_IMPLEMENTED, o = _.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, g, m, c;
  et()(C, r);
  var x = A.errorOrDestroy, F = ["error", "close", "destroy", "pause", "resume"];
  function B(O, D, J) {
    if (typeof O.prependListener == "function") return O.prependListener(D, J);
    !O._events || !O._events[D] ? O.on(D, J) : Array.isArray(O._events[D]) ? O._events[D].unshift(J) : O._events[D] = [J, O._events[D]];
  }
  function z(O, D, J) {
    t = t || yt(), O = O || {}, typeof J != "boolean" && (J = D instanceof t), this.objectMode = !!O.objectMode, J && (this.objectMode = this.objectMode || !!O.readableObjectMode), this.highWaterMark = I(this, O, "readableHighWaterMark", J), this.buffer = new k(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = O.emitClose !== !1, this.autoDestroy = !!O.autoDestroy, this.destroyed = !1, this.defaultEncoding = O.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, O.encoding && (g || (g = di().StringDecoder), this.decoder = new g(O.encoding), this.encoding = O.encoding);
  }
  function C(O) {
    if (t = t || yt(), !(this instanceof C)) return new C(O);
    var D = this instanceof t;
    this._readableState = new z(O, this, D), this.readable = !0, O && (typeof O.read == "function" && (this._read = O.read), typeof O.destroy == "function" && (this._destroy = O.destroy)), r.call(this);
  }
  Object.defineProperty(C.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(D) {
      this._readableState && (this._readableState.destroyed = D);
    }
  }), C.prototype.destroy = A.destroy, C.prototype._undestroy = A.undestroy, C.prototype._destroy = function(O, D) {
    D(O);
  }, C.prototype.push = function(O, D) {
    var J = this._readableState, d;
    return J.objectMode ? d = !0 : typeof O == "string" && (D = D || J.defaultEncoding, D !== J.encoding && (O = n.from(O, D), D = ""), d = !0), $(this, O, D, !1, d);
  }, C.prototype.unshift = function(O) {
    return $(this, O, null, !0, !1);
  };
  function $(O, D, J, d, Y) {
    h("readableAddChunk", D);
    var E = O._readableState;
    if (D === null)
      E.reading = !1, ee(O, E);
    else {
      var i;
      if (Y || (i = N(E, D)), i)
        x(O, i);
      else if (E.objectMode || D && D.length > 0)
        if (typeof D != "string" && !E.objectMode && Object.getPrototypeOf(D) !== n.prototype && (D = l(D)), d)
          E.endEmitted ? x(O, new o()) : le(O, E, D, !0);
        else if (E.ended)
          x(O, new w());
        else {
          if (E.destroyed)
            return !1;
          E.reading = !1, E.decoder && !J ? (D = E.decoder.write(D), E.objectMode || D.length !== 0 ? le(O, E, D, !1) : Q(O, E)) : le(O, E, D, !1);
        }
      else d || (E.reading = !1, Q(O, E));
    }
    return !E.ended && (E.length < E.highWaterMark || E.length === 0);
  }
  function le(O, D, J, d) {
    D.flowing && D.length === 0 && !D.sync ? (D.awaitDrain = 0, O.emit("data", J)) : (D.length += D.objectMode ? 1 : J.length, d ? D.buffer.unshift(J) : D.buffer.push(J), D.needReadable && H(O)), Q(O, D);
  }
  function N(O, D) {
    var J;
    return !f(D) && typeof D != "string" && D !== void 0 && !O.objectMode && (J = new S("chunk", ["string", "Buffer", "Uint8Array"], D)), J;
  }
  C.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, C.prototype.setEncoding = function(O) {
    g || (g = di().StringDecoder);
    var D = new g(O);
    this._readableState.decoder = D, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var J = this._readableState.buffer.head, d = ""; J !== null; )
      d += D.write(J.data), J = J.next;
    return this._readableState.buffer.clear(), d !== "" && this._readableState.buffer.push(d), this._readableState.length = d.length, this;
  };
  var U = 1073741824;
  function v(O) {
    return O >= U ? O = U : (O--, O |= O >>> 1, O |= O >>> 2, O |= O >>> 4, O |= O >>> 8, O |= O >>> 16, O++), O;
  }
  function K(O, D) {
    return O <= 0 || D.length === 0 && D.ended ? 0 : D.objectMode ? 1 : O !== O ? D.flowing && D.length ? D.buffer.head.data.length : D.length : (O > D.highWaterMark && (D.highWaterMark = v(O)), O <= D.length ? O : D.ended ? D.length : (D.needReadable = !0, 0));
  }
  C.prototype.read = function(O) {
    h("read", O), O = parseInt(O, 10);
    var D = this._readableState, J = O;
    if (O !== 0 && (D.emittedReadable = !1), O === 0 && D.needReadable && ((D.highWaterMark !== 0 ? D.length >= D.highWaterMark : D.length > 0) || D.ended))
      return h("read: emitReadable", D.length, D.ended), D.length === 0 && D.ended ? y(this) : H(this), null;
    if (O = K(O, D), O === 0 && D.ended)
      return D.length === 0 && y(this), null;
    var d = D.needReadable;
    h("need readable", d), (D.length === 0 || D.length - O < D.highWaterMark) && (d = !0, h("length less than watermark", d)), D.ended || D.reading ? (d = !1, h("reading or ended", d)) : d && (h("do read"), D.reading = !0, D.sync = !0, D.length === 0 && (D.needReadable = !0), this._read(D.highWaterMark), D.sync = !1, D.reading || (O = K(J, D)));
    var Y;
    return O > 0 ? Y = b(O, D) : Y = null, Y === null ? (D.needReadable = D.length <= D.highWaterMark, O = 0) : (D.length -= O, D.awaitDrain = 0), D.length === 0 && (D.ended || (D.needReadable = !0), J !== O && D.ended && y(this)), Y !== null && this.emit("data", Y), Y;
  };
  function ee(O, D) {
    if (h("onEofChunk"), !D.ended) {
      if (D.decoder) {
        var J = D.decoder.end();
        J && J.length && (D.buffer.push(J), D.length += D.objectMode ? 1 : J.length);
      }
      D.ended = !0, D.sync ? H(O) : (D.needReadable = !1, D.emittedReadable || (D.emittedReadable = !0, ie(O)));
    }
  }
  function H(O) {
    var D = O._readableState;
    h("emitReadable", D.needReadable, D.emittedReadable), D.needReadable = !1, D.emittedReadable || (h("emitReadable", D.flowing), D.emittedReadable = !0, ge.nextTick(ie, O));
  }
  function ie(O) {
    var D = O._readableState;
    h("emitReadable_", D.destroyed, D.length, D.ended), !D.destroyed && (D.length || D.ended) && (O.emit("readable"), D.emittedReadable = !1), D.needReadable = !D.flowing && !D.ended && D.length <= D.highWaterMark, G(O);
  }
  function Q(O, D) {
    D.readingMore || (D.readingMore = !0, ge.nextTick(ce, O, D));
  }
  function ce(O, D) {
    for (; !D.reading && !D.ended && (D.length < D.highWaterMark || D.flowing && D.length === 0); ) {
      var J = D.length;
      if (h("maybeReadMore read 0"), O.read(0), J === D.length)
        break;
    }
    D.readingMore = !1;
  }
  C.prototype._read = function(O) {
    x(this, new T("_read()"));
  }, C.prototype.pipe = function(O, D) {
    var J = this, d = this._readableState;
    switch (d.pipesCount) {
      case 0:
        d.pipes = O;
        break;
      case 1:
        d.pipes = [d.pipes, O];
        break;
      default:
        d.pipes.push(O);
        break;
    }
    d.pipesCount += 1, h("pipe count=%d opts=%j", d.pipesCount, D);
    var Y = (!D || D.end !== !1) && O !== ge.stdout && O !== ge.stderr, E = Y ? s : he;
    d.endEmitted ? ge.nextTick(E) : J.once("end", E), O.on("unpipe", i);
    function i(de, we) {
      h("onunpipe"), de === J && we && we.hasUnpiped === !1 && (we.hasUnpiped = !0, q());
    }
    function s() {
      h("onend"), O.end();
    }
    var p = V(J);
    O.on("drain", p);
    var L = !1;
    function q() {
      h("cleanup"), O.removeListener("close", oe), O.removeListener("finish", se), O.removeListener("drain", p), O.removeListener("error", ne), O.removeListener("unpipe", i), J.removeListener("end", s), J.removeListener("end", he), J.removeListener("data", j), L = !0, d.awaitDrain && (!O._writableState || O._writableState.needDrain) && p();
    }
    J.on("data", j);
    function j(de) {
      h("ondata");
      var we = O.write(de);
      h("dest.write", we), we === !1 && ((d.pipesCount === 1 && d.pipes === O || d.pipesCount > 1 && M(d.pipes, O) !== -1) && !L && (h("false write response, pause", d.awaitDrain), d.awaitDrain++), J.pause());
    }
    function ne(de) {
      h("onerror", de), he(), O.removeListener("error", ne), e(O, "error") === 0 && x(O, de);
    }
    B(O, "error", ne);
    function oe() {
      O.removeListener("finish", se), he();
    }
    O.once("close", oe);
    function se() {
      h("onfinish"), O.removeListener("close", oe), he();
    }
    O.once("finish", se);
    function he() {
      h("unpipe"), J.unpipe(O);
    }
    return O.emit("pipe", J), d.flowing || (h("pipe resume"), J.resume()), O;
  };
  function V(O) {
    return function() {
      var J = O._readableState;
      h("pipeOnDrain", J.awaitDrain), J.awaitDrain && J.awaitDrain--, J.awaitDrain === 0 && e(O, "data") && (J.flowing = !0, G(O));
    };
  }
  C.prototype.unpipe = function(O) {
    var D = this._readableState, J = {
      hasUnpiped: !1
    };
    if (D.pipesCount === 0) return this;
    if (D.pipesCount === 1)
      return O && O !== D.pipes ? this : (O || (O = D.pipes), D.pipes = null, D.pipesCount = 0, D.flowing = !1, O && O.emit("unpipe", this, J), this);
    if (!O) {
      var d = D.pipes, Y = D.pipesCount;
      D.pipes = null, D.pipesCount = 0, D.flowing = !1;
      for (var E = 0; E < Y; E++) d[E].emit("unpipe", this, {
        hasUnpiped: !1
      });
      return this;
    }
    var i = M(D.pipes, O);
    return i === -1 ? this : (D.pipes.splice(i, 1), D.pipesCount -= 1, D.pipesCount === 1 && (D.pipes = D.pipes[0]), O.emit("unpipe", this, J), this);
  }, C.prototype.on = function(O, D) {
    var J = r.prototype.on.call(this, O, D), d = this._readableState;
    return O === "data" ? (d.readableListening = this.listenerCount("readable") > 0, d.flowing !== !1 && this.resume()) : O === "readable" && !d.endEmitted && !d.readableListening && (d.readableListening = d.needReadable = !0, d.flowing = !1, d.emittedReadable = !1, h("on readable", d.length, d.reading), d.length ? H(this) : d.reading || ge.nextTick(X, this)), J;
  }, C.prototype.addListener = C.prototype.on, C.prototype.removeListener = function(O, D) {
    var J = r.prototype.removeListener.call(this, O, D);
    return O === "readable" && ge.nextTick(P, this), J;
  }, C.prototype.removeAllListeners = function(O) {
    var D = r.prototype.removeAllListeners.apply(this, arguments);
    return (O === "readable" || O === void 0) && ge.nextTick(P, this), D;
  };
  function P(O) {
    var D = O._readableState;
    D.readableListening = O.listenerCount("readable") > 0, D.resumeScheduled && !D.paused ? D.flowing = !0 : O.listenerCount("data") > 0 && O.resume();
  }
  function X(O) {
    h("readable nexttick read 0"), O.read(0);
  }
  C.prototype.resume = function() {
    var O = this._readableState;
    return O.flowing || (h("resume"), O.flowing = !O.readableListening, Z(this, O)), O.paused = !1, this;
  };
  function Z(O, D) {
    D.resumeScheduled || (D.resumeScheduled = !0, ge.nextTick(te, O, D));
  }
  function te(O, D) {
    h("resume", D.reading), D.reading || O.read(0), D.resumeScheduled = !1, O.emit("resume"), G(O), D.flowing && !D.reading && O.read(0);
  }
  C.prototype.pause = function() {
    return h("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (h("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function G(O) {
    var D = O._readableState;
    for (h("flow", D.flowing); D.flowing && O.read() !== null; ) ;
  }
  C.prototype.wrap = function(O) {
    var D = this, J = this._readableState, d = !1;
    O.on("end", function() {
      if (h("wrapped end"), J.decoder && !J.ended) {
        var i = J.decoder.end();
        i && i.length && D.push(i);
      }
      D.push(null);
    }), O.on("data", function(i) {
      if (h("wrapped data"), J.decoder && (i = J.decoder.write(i)), !(J.objectMode && i == null) && !(!J.objectMode && (!i || !i.length))) {
        var s = D.push(i);
        s || (d = !0, O.pause());
      }
    });
    for (var Y in O)
      this[Y] === void 0 && typeof O[Y] == "function" && (this[Y] = /* @__PURE__ */ (function(s) {
        return function() {
          return O[s].apply(O, arguments);
        };
      })(Y));
    for (var E = 0; E < F.length; E++)
      O.on(F[E], this.emit.bind(this, F[E]));
    return this._read = function(i) {
      h("wrapped _read", i), d && (d = !1, O.resume());
    }, this;
  }, typeof Symbol == "function" && (C.prototype[Symbol.asyncIterator] = function() {
    return m === void 0 && (m = sl()), m(this);
  }), Object.defineProperty(C.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(C.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(C.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(D) {
      this._readableState && (this._readableState.flowing = D);
    }
  }), C._fromList = b, Object.defineProperty(C.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function b(O, D) {
    if (D.length === 0) return null;
    var J;
    return D.objectMode ? J = D.buffer.shift() : !O || O >= D.length ? (D.decoder ? J = D.buffer.join("") : D.buffer.length === 1 ? J = D.buffer.first() : J = D.buffer.concat(D.length), D.buffer.clear()) : J = D.buffer.consume(O, D.decoder), J;
  }
  function y(O) {
    var D = O._readableState;
    h("endReadable", D.endEmitted), D.endEmitted || (D.ended = !0, ge.nextTick(W, D, O));
  }
  function W(O, D) {
    if (h("endReadableNT", O.endEmitted, O.length), !O.endEmitted && O.length === 0 && (O.endEmitted = !0, D.readable = !1, D.emit("end"), O.autoDestroy)) {
      var J = D._writableState;
      (!J || J.autoDestroy && J.finished) && D.destroy();
    }
  }
  typeof Symbol == "function" && (C.from = function(O, D) {
    return c === void 0 && (c = ol()), c(C, O, D);
  });
  function M(O, D) {
    for (var J = 0, d = O.length; J < d; J++)
      if (O[J] === D) return J;
    return -1;
  }
  return An;
}
var kn, Qa;
function fo() {
  if (Qa) return kn;
  Qa = 1, kn = a;
  var t = _t().codes, e = t.ERR_METHOD_NOT_IMPLEMENTED, r = t.ERR_MULTIPLE_CALLBACK, n = t.ERR_TRANSFORM_ALREADY_TRANSFORMING, u = t.ERR_TRANSFORM_WITH_LENGTH_0, l = yt();
  et()(a, l);
  function f(A, R) {
    var I = this._transformState;
    I.transforming = !1;
    var _ = I.writecb;
    if (_ === null)
      return this.emit("error", new r());
    I.writechunk = null, I.writecb = null, R != null && this.push(R), _(A);
    var S = this._readableState;
    S.reading = !1, (S.needReadable || S.length < S.highWaterMark) && this._read(S.highWaterMark);
  }
  function a(A) {
    if (!(this instanceof a)) return new a(A);
    l.call(this, A), this._transformState = {
      afterTransform: f.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, A && (typeof A.transform == "function" && (this._transform = A.transform), typeof A.flush == "function" && (this._flush = A.flush)), this.on("prefinish", h);
  }
  function h() {
    var A = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(R, I) {
      k(A, R, I);
    }) : k(this, null, null);
  }
  a.prototype.push = function(A, R) {
    return this._transformState.needTransform = !1, l.prototype.push.call(this, A, R);
  }, a.prototype._transform = function(A, R, I) {
    I(new e("_transform()"));
  }, a.prototype._write = function(A, R, I) {
    var _ = this._transformState;
    if (_.writecb = I, _.writechunk = A, _.writeencoding = R, !_.transforming) {
      var S = this._readableState;
      (_.needTransform || S.needReadable || S.length < S.highWaterMark) && this._read(S.highWaterMark);
    }
  }, a.prototype._read = function(A) {
    var R = this._transformState;
    R.writechunk !== null && !R.transforming ? (R.transforming = !0, this._transform(R.writechunk, R.writeencoding, R.afterTransform)) : R.needTransform = !0;
  }, a.prototype._destroy = function(A, R) {
    l.prototype._destroy.call(this, A, function(I) {
      R(I);
    });
  };
  function k(A, R, I) {
    if (R) return A.emit("error", R);
    if (I != null && A.push(I), A._writableState.length) throw new u();
    if (A._transformState.transforming) throw new n();
    return A.push(null);
  }
  return kn;
}
var Rn, es;
function ul() {
  if (es) return Rn;
  es = 1, Rn = e;
  var t = fo();
  et()(e, t);
  function e(r) {
    if (!(this instanceof e)) return new e(r);
    t.call(this, r);
  }
  return e.prototype._transform = function(r, n, u) {
    u(null, r);
  }, Rn;
}
var In, ts;
function ll() {
  if (ts) return In;
  ts = 1;
  var t;
  function e(I) {
    var _ = !1;
    return function() {
      _ || (_ = !0, I.apply(void 0, arguments));
    };
  }
  var r = _t().codes, n = r.ERR_MISSING_ARGS, u = r.ERR_STREAM_DESTROYED;
  function l(I) {
    if (I) throw I;
  }
  function f(I) {
    return I.setHeader && typeof I.abort == "function";
  }
  function a(I, _, S, w) {
    w = e(w);
    var T = !1;
    I.on("close", function() {
      T = !0;
    }), t === void 0 && (t = xi()), t(I, {
      readable: _,
      writable: S
    }, function(g) {
      if (g) return w(g);
      T = !0, w();
    });
    var o = !1;
    return function(g) {
      if (!T && !o) {
        if (o = !0, f(I)) return I.abort();
        if (typeof I.destroy == "function") return I.destroy();
        w(g || new u("pipe"));
      }
    };
  }
  function h(I) {
    I();
  }
  function k(I, _) {
    return I.pipe(_);
  }
  function A(I) {
    return !I.length || typeof I[I.length - 1] != "function" ? l : I.pop();
  }
  function R() {
    for (var I = arguments.length, _ = new Array(I), S = 0; S < I; S++)
      _[S] = arguments[S];
    var w = A(_);
    if (Array.isArray(_[0]) && (_ = _[0]), _.length < 2)
      throw new n("streams");
    var T, o = _.map(function(g, m) {
      var c = m < _.length - 1, x = m > 0;
      return a(g, c, x, function(F) {
        T || (T = F), F && o.forEach(h), !c && (o.forEach(h), w(T));
      });
    });
    return _.reduce(k);
  }
  return In = R, In;
}
var Cn, rs;
function Ti() {
  if (rs) return Cn;
  rs = 1, Cn = r;
  var t = yi().EventEmitter, e = et();
  e(r, t), r.Readable = ho(), r.Writable = co(), r.Duplex = yt(), r.Transform = fo(), r.PassThrough = ul(), r.finished = xi(), r.pipeline = ll(), r.Stream = r;
  function r() {
    t.call(this);
  }
  return r.prototype.pipe = function(n, u) {
    var l = this;
    function f(_) {
      n.writable && n.write(_) === !1 && l.pause && l.pause();
    }
    l.on("data", f);
    function a() {
      l.readable && l.resume && l.resume();
    }
    n.on("drain", a), !n._isStdio && (!u || u.end !== !1) && (l.on("end", k), l.on("close", A));
    var h = !1;
    function k() {
      h || (h = !0, n.end());
    }
    function A() {
      h || (h = !0, typeof n.destroy == "function" && n.destroy());
    }
    function R(_) {
      if (I(), t.listenerCount(this, "error") === 0)
        throw _;
    }
    l.on("error", R), n.on("error", R);
    function I() {
      l.removeListener("data", f), n.removeListener("drain", a), l.removeListener("end", k), l.removeListener("close", A), l.removeListener("error", R), n.removeListener("error", R), l.removeListener("end", I), l.removeListener("close", I), n.removeListener("close", I);
    }
    return l.on("end", I), l.on("close", I), n.on("close", I), n.emit("pipe", l), n;
  }, Cn;
}
var ns;
function cl() {
  return ns || (ns = 1, (function(t) {
    (function(e) {
      e.parser = function(b, y) {
        return new n(b, y);
      }, e.SAXParser = n, e.SAXStream = A, e.createStream = k, e.MAX_BUFFER_LENGTH = 64 * 1024;
      var r = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      e.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function n(b, y) {
        if (!(this instanceof n))
          return new n(b, y);
        var W = this;
        l(W), W.q = W.c = "", W.bufferCheckPosition = e.MAX_BUFFER_LENGTH, W.opt = y || {}, W.opt.lowercase = W.opt.lowercase || W.opt.lowercasetags, W.looseCase = W.opt.lowercase ? "toLowerCase" : "toUpperCase", W.tags = [], W.closed = W.closedRoot = W.sawRoot = !1, W.tag = W.error = null, W.strict = !!b, W.noscript = !!(b || W.opt.noscript), W.state = C.BEGIN, W.strictEntities = W.opt.strictEntities, W.ENTITIES = W.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES), W.attribList = [], W.opt.xmlns && (W.ns = Object.create(w)), W.trackPosition = W.opt.position !== !1, W.trackPosition && (W.position = W.line = W.column = 0), le(W, "onready");
      }
      Object.create || (Object.create = function(b) {
        function y() {
        }
        y.prototype = b;
        var W = new y();
        return W;
      }), Object.keys || (Object.keys = function(b) {
        var y = [];
        for (var W in b) b.hasOwnProperty(W) && y.push(W);
        return y;
      });
      function u(b) {
        for (var y = Math.max(e.MAX_BUFFER_LENGTH, 10), W = 0, M = 0, O = r.length; M < O; M++) {
          var D = b[r[M]].length;
          if (D > y)
            switch (r[M]) {
              case "textNode":
                U(b);
                break;
              case "cdata":
                N(b, "oncdata", b.cdata), b.cdata = "";
                break;
              case "script":
                N(b, "onscript", b.script), b.script = "";
                break;
              default:
                K(b, "Max buffer length exceeded: " + r[M]);
            }
          W = Math.max(W, D);
        }
        var J = e.MAX_BUFFER_LENGTH - W;
        b.bufferCheckPosition = J + b.position;
      }
      function l(b) {
        for (var y = 0, W = r.length; y < W; y++)
          b[r[y]] = "";
      }
      function f(b) {
        U(b), b.cdata !== "" && (N(b, "oncdata", b.cdata), b.cdata = ""), b.script !== "" && (N(b, "onscript", b.script), b.script = "");
      }
      n.prototype = {
        end: function() {
          ee(this);
        },
        write: G,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          f(this);
        }
      };
      var a;
      try {
        a = Ti().Stream;
      } catch {
        a = function() {
        };
      }
      var h = e.EVENTS.filter(function(b) {
        return b !== "error" && b !== "end";
      });
      function k(b, y) {
        return new A(b, y);
      }
      function A(b, y) {
        if (!(this instanceof A))
          return new A(b, y);
        a.apply(this), this._parser = new n(b, y), this.writable = !0, this.readable = !0;
        var W = this;
        this._parser.onend = function() {
          W.emit("end");
        }, this._parser.onerror = function(M) {
          W.emit("error", M), W._parser.error = null;
        }, this._decoder = null, h.forEach(function(M) {
          Object.defineProperty(W, "on" + M, {
            get: function() {
              return W._parser["on" + M];
            },
            set: function(O) {
              if (!O)
                return W.removeAllListeners(M), W._parser["on" + M] = O, O;
              W.on(M, O);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      A.prototype = Object.create(a.prototype, {
        constructor: {
          value: A
        }
      }), A.prototype.write = function(b) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(b)) {
          if (!this._decoder) {
            var y = di().StringDecoder;
            this._decoder = new y("utf8");
          }
          b = this._decoder.write(b);
        }
        return this._parser.write(b.toString()), this.emit("data", b), !0;
      }, A.prototype.end = function(b) {
        return b && b.length && this.write(b), this._parser.end(), !0;
      }, A.prototype.on = function(b, y) {
        var W = this;
        return !W._parser["on" + b] && h.indexOf(b) !== -1 && (W._parser["on" + b] = function() {
          var M = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          M.splice(0, 0, b), W.emit.apply(W, M);
        }), a.prototype.on.call(W, b, y);
      };
      var R = "[CDATA[", I = "DOCTYPE", _ = "http://www.w3.org/XML/1998/namespace", S = "http://www.w3.org/2000/xmlns/", w = { xml: _, xmlns: S }, T = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, o = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, g = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, m = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function c(b) {
        return b === " " || b === `
` || b === "\r" || b === "	";
      }
      function x(b) {
        return b === '"' || b === "'";
      }
      function F(b) {
        return b === ">" || c(b);
      }
      function B(b, y) {
        return b.test(y);
      }
      function z(b, y) {
        return !B(b, y);
      }
      var C = 0;
      e.STATE = {
        BEGIN: C++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: C++,
        // leading whitespace
        TEXT: C++,
        // general stuff
        TEXT_ENTITY: C++,
        // &amp and such.
        OPEN_WAKA: C++,
        // <
        SGML_DECL: C++,
        // <!BLARG
        SGML_DECL_QUOTED: C++,
        // <!BLARG foo "bar
        DOCTYPE: C++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: C++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: C++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: C++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: C++,
        // <!-
        COMMENT: C++,
        // <!--
        COMMENT_ENDING: C++,
        // <!-- blah -
        COMMENT_ENDED: C++,
        // <!-- blah --
        CDATA: C++,
        // <![CDATA[ something
        CDATA_ENDING: C++,
        // ]
        CDATA_ENDING_2: C++,
        // ]]
        PROC_INST: C++,
        // <?hi
        PROC_INST_BODY: C++,
        // <?hi there
        PROC_INST_ENDING: C++,
        // <?hi "there" ?
        OPEN_TAG: C++,
        // <strong
        OPEN_TAG_SLASH: C++,
        // <strong /
        ATTRIB: C++,
        // <a
        ATTRIB_NAME: C++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: C++,
        // <a foo _
        ATTRIB_VALUE: C++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: C++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: C++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: C++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: C++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: C++,
        // <foo bar=&quot
        CLOSE_TAG: C++,
        // </a
        CLOSE_TAG_SAW_WHITE: C++,
        // </a   >
        SCRIPT: C++,
        // <script> ...
        SCRIPT_ENDING: C++
        // <script> ... <
      }, e.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, e.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(e.ENTITIES).forEach(function(b) {
        var y = e.ENTITIES[b], W = typeof y == "number" ? String.fromCharCode(y) : y;
        e.ENTITIES[b] = W;
      });
      for (var $ in e.STATE)
        e.STATE[e.STATE[$]] = $;
      C = e.STATE;
      function le(b, y, W) {
        b[y] && b[y](W);
      }
      function N(b, y, W) {
        b.textNode && U(b), le(b, y, W);
      }
      function U(b) {
        b.textNode = v(b.opt, b.textNode), b.textNode && le(b, "ontext", b.textNode), b.textNode = "";
      }
      function v(b, y) {
        return b.trim && (y = y.trim()), b.normalize && (y = y.replace(/\s+/g, " ")), y;
      }
      function K(b, y) {
        return U(b), b.trackPosition && (y += `
Line: ` + b.line + `
Column: ` + b.column + `
Char: ` + b.c), y = new Error(y), b.error = y, le(b, "onerror", y), b;
      }
      function ee(b) {
        return b.sawRoot && !b.closedRoot && H(b, "Unclosed root tag"), b.state !== C.BEGIN && b.state !== C.BEGIN_WHITESPACE && b.state !== C.TEXT && K(b, "Unexpected end"), U(b), b.c = "", b.closed = !0, le(b, "onend"), n.call(b, b.strict, b.opt), b;
      }
      function H(b, y) {
        if (typeof b != "object" || !(b instanceof n))
          throw new Error("bad call to strictFail");
        b.strict && K(b, y);
      }
      function ie(b) {
        b.strict || (b.tagName = b.tagName[b.looseCase]());
        var y = b.tags[b.tags.length - 1] || b, W = b.tag = { name: b.tagName, attributes: {} };
        b.opt.xmlns && (W.ns = y.ns), b.attribList.length = 0, N(b, "onopentagstart", W);
      }
      function Q(b, y) {
        var W = b.indexOf(":"), M = W < 0 ? ["", b] : b.split(":"), O = M[0], D = M[1];
        return y && b === "xmlns" && (O = "xmlns", D = ""), { prefix: O, local: D };
      }
      function ce(b) {
        if (b.strict || (b.attribName = b.attribName[b.looseCase]()), b.attribList.indexOf(b.attribName) !== -1 || b.tag.attributes.hasOwnProperty(b.attribName)) {
          b.attribName = b.attribValue = "";
          return;
        }
        if (b.opt.xmlns) {
          var y = Q(b.attribName, !0), W = y.prefix, M = y.local;
          if (W === "xmlns")
            if (M === "xml" && b.attribValue !== _)
              H(
                b,
                "xml: prefix must be bound to " + _ + `
Actual: ` + b.attribValue
              );
            else if (M === "xmlns" && b.attribValue !== S)
              H(
                b,
                "xmlns: prefix must be bound to " + S + `
Actual: ` + b.attribValue
              );
            else {
              var O = b.tag, D = b.tags[b.tags.length - 1] || b;
              O.ns === D.ns && (O.ns = Object.create(D.ns)), O.ns[M] = b.attribValue;
            }
          b.attribList.push([b.attribName, b.attribValue]);
        } else
          b.tag.attributes[b.attribName] = b.attribValue, N(b, "onattribute", {
            name: b.attribName,
            value: b.attribValue
          });
        b.attribName = b.attribValue = "";
      }
      function V(b, y) {
        if (b.opt.xmlns) {
          var W = b.tag, M = Q(b.tagName);
          W.prefix = M.prefix, W.local = M.local, W.uri = W.ns[M.prefix] || "", W.prefix && !W.uri && (H(b, "Unbound namespace prefix: " + JSON.stringify(b.tagName)), W.uri = M.prefix);
          var O = b.tags[b.tags.length - 1] || b;
          W.ns && O.ns !== W.ns && Object.keys(W.ns).forEach(function(j) {
            N(b, "onopennamespace", {
              prefix: j,
              uri: W.ns[j]
            });
          });
          for (var D = 0, J = b.attribList.length; D < J; D++) {
            var d = b.attribList[D], Y = d[0], E = d[1], i = Q(Y, !0), s = i.prefix, p = i.local, L = s === "" ? "" : W.ns[s] || "", q = {
              name: Y,
              value: E,
              prefix: s,
              local: p,
              uri: L
            };
            s && s !== "xmlns" && !L && (H(b, "Unbound namespace prefix: " + JSON.stringify(s)), q.uri = s), b.tag.attributes[Y] = q, N(b, "onattribute", q);
          }
          b.attribList.length = 0;
        }
        b.tag.isSelfClosing = !!y, b.sawRoot = !0, b.tags.push(b.tag), N(b, "onopentag", b.tag), y || (!b.noscript && b.tagName.toLowerCase() === "script" ? b.state = C.SCRIPT : b.state = C.TEXT, b.tag = null, b.tagName = ""), b.attribName = b.attribValue = "", b.attribList.length = 0;
      }
      function P(b) {
        if (!b.tagName) {
          H(b, "Weird empty close tag."), b.textNode += "</>", b.state = C.TEXT;
          return;
        }
        if (b.script) {
          if (b.tagName !== "script") {
            b.script += "</" + b.tagName + ">", b.tagName = "", b.state = C.SCRIPT;
            return;
          }
          N(b, "onscript", b.script), b.script = "";
        }
        var y = b.tags.length, W = b.tagName;
        b.strict || (W = W[b.looseCase]());
        for (var M = W; y--; ) {
          var O = b.tags[y];
          if (O.name !== M)
            H(b, "Unexpected close tag");
          else
            break;
        }
        if (y < 0) {
          H(b, "Unmatched closing tag: " + b.tagName), b.textNode += "</" + b.tagName + ">", b.state = C.TEXT;
          return;
        }
        b.tagName = W;
        for (var D = b.tags.length; D-- > y; ) {
          var J = b.tag = b.tags.pop();
          b.tagName = b.tag.name, N(b, "onclosetag", b.tagName);
          var d = {};
          for (var Y in J.ns)
            d[Y] = J.ns[Y];
          var E = b.tags[b.tags.length - 1] || b;
          b.opt.xmlns && J.ns !== E.ns && Object.keys(J.ns).forEach(function(i) {
            var s = J.ns[i];
            N(b, "onclosenamespace", { prefix: i, uri: s });
          });
        }
        y === 0 && (b.closedRoot = !0), b.tagName = b.attribValue = b.attribName = "", b.attribList.length = 0, b.state = C.TEXT;
      }
      function X(b) {
        var y = b.entity, W = y.toLowerCase(), M, O = "";
        return b.ENTITIES[y] ? b.ENTITIES[y] : b.ENTITIES[W] ? b.ENTITIES[W] : (y = W, y.charAt(0) === "#" && (y.charAt(1) === "x" ? (y = y.slice(2), M = parseInt(y, 16), O = M.toString(16)) : (y = y.slice(1), M = parseInt(y, 10), O = M.toString(10))), y = y.replace(/^0+/, ""), isNaN(M) || O.toLowerCase() !== y ? (H(b, "Invalid character entity"), "&" + b.entity + ";") : String.fromCodePoint(M));
      }
      function Z(b, y) {
        y === "<" ? (b.state = C.OPEN_WAKA, b.startTagPosition = b.position) : c(y) || (H(b, "Non-whitespace before first tag."), b.textNode = y, b.state = C.TEXT);
      }
      function te(b, y) {
        var W = "";
        return y < b.length && (W = b.charAt(y)), W;
      }
      function G(b) {
        var y = this;
        if (this.error)
          throw this.error;
        if (y.closed)
          return K(
            y,
            "Cannot write after close. Assign an onready handler."
          );
        if (b === null)
          return ee(y);
        typeof b == "object" && (b = b.toString());
        for (var W = 0, M = ""; M = te(b, W++), y.c = M, !!M; )
          switch (y.trackPosition && (y.position++, M === `
` ? (y.line++, y.column = 0) : y.column++), y.state) {
            case C.BEGIN:
              if (y.state = C.BEGIN_WHITESPACE, M === "\uFEFF")
                continue;
              Z(y, M);
              continue;
            case C.BEGIN_WHITESPACE:
              Z(y, M);
              continue;
            case C.TEXT:
              if (y.sawRoot && !y.closedRoot) {
                for (var O = W - 1; M && M !== "<" && M !== "&"; )
                  M = te(b, W++), M && y.trackPosition && (y.position++, M === `
` ? (y.line++, y.column = 0) : y.column++);
                y.textNode += b.substring(O, W - 1);
              }
              M === "<" && !(y.sawRoot && y.closedRoot && !y.strict) ? (y.state = C.OPEN_WAKA, y.startTagPosition = y.position) : (!c(M) && (!y.sawRoot || y.closedRoot) && H(y, "Text data outside of root node."), M === "&" ? y.state = C.TEXT_ENTITY : y.textNode += M);
              continue;
            case C.SCRIPT:
              M === "<" ? y.state = C.SCRIPT_ENDING : y.script += M;
              continue;
            case C.SCRIPT_ENDING:
              M === "/" ? y.state = C.CLOSE_TAG : (y.script += "<" + M, y.state = C.SCRIPT);
              continue;
            case C.OPEN_WAKA:
              if (M === "!")
                y.state = C.SGML_DECL, y.sgmlDecl = "";
              else if (!c(M)) if (B(T, M))
                y.state = C.OPEN_TAG, y.tagName = M;
              else if (M === "/")
                y.state = C.CLOSE_TAG, y.tagName = "";
              else if (M === "?")
                y.state = C.PROC_INST, y.procInstName = y.procInstBody = "";
              else {
                if (H(y, "Unencoded <"), y.startTagPosition + 1 < y.position) {
                  var D = y.position - y.startTagPosition;
                  M = new Array(D).join(" ") + M;
                }
                y.textNode += "<" + M, y.state = C.TEXT;
              }
              continue;
            case C.SGML_DECL:
              (y.sgmlDecl + M).toUpperCase() === R ? (N(y, "onopencdata"), y.state = C.CDATA, y.sgmlDecl = "", y.cdata = "") : y.sgmlDecl + M === "--" ? (y.state = C.COMMENT, y.comment = "", y.sgmlDecl = "") : (y.sgmlDecl + M).toUpperCase() === I ? (y.state = C.DOCTYPE, (y.doctype || y.sawRoot) && H(
                y,
                "Inappropriately located doctype declaration"
              ), y.doctype = "", y.sgmlDecl = "") : M === ">" ? (N(y, "onsgmldeclaration", y.sgmlDecl), y.sgmlDecl = "", y.state = C.TEXT) : (x(M) && (y.state = C.SGML_DECL_QUOTED), y.sgmlDecl += M);
              continue;
            case C.SGML_DECL_QUOTED:
              M === y.q && (y.state = C.SGML_DECL, y.q = ""), y.sgmlDecl += M;
              continue;
            case C.DOCTYPE:
              M === ">" ? (y.state = C.TEXT, N(y, "ondoctype", y.doctype), y.doctype = !0) : (y.doctype += M, M === "[" ? y.state = C.DOCTYPE_DTD : x(M) && (y.state = C.DOCTYPE_QUOTED, y.q = M));
              continue;
            case C.DOCTYPE_QUOTED:
              y.doctype += M, M === y.q && (y.q = "", y.state = C.DOCTYPE);
              continue;
            case C.DOCTYPE_DTD:
              y.doctype += M, M === "]" ? y.state = C.DOCTYPE : x(M) && (y.state = C.DOCTYPE_DTD_QUOTED, y.q = M);
              continue;
            case C.DOCTYPE_DTD_QUOTED:
              y.doctype += M, M === y.q && (y.state = C.DOCTYPE_DTD, y.q = "");
              continue;
            case C.COMMENT:
              M === "-" ? y.state = C.COMMENT_ENDING : y.comment += M;
              continue;
            case C.COMMENT_ENDING:
              M === "-" ? (y.state = C.COMMENT_ENDED, y.comment = v(y.opt, y.comment), y.comment && N(y, "oncomment", y.comment), y.comment = "") : (y.comment += "-" + M, y.state = C.COMMENT);
              continue;
            case C.COMMENT_ENDED:
              M !== ">" ? (H(y, "Malformed comment"), y.comment += "--" + M, y.state = C.COMMENT) : y.state = C.TEXT;
              continue;
            case C.CDATA:
              M === "]" ? y.state = C.CDATA_ENDING : y.cdata += M;
              continue;
            case C.CDATA_ENDING:
              M === "]" ? y.state = C.CDATA_ENDING_2 : (y.cdata += "]" + M, y.state = C.CDATA);
              continue;
            case C.CDATA_ENDING_2:
              M === ">" ? (y.cdata && N(y, "oncdata", y.cdata), N(y, "onclosecdata"), y.cdata = "", y.state = C.TEXT) : M === "]" ? y.cdata += "]" : (y.cdata += "]]" + M, y.state = C.CDATA);
              continue;
            case C.PROC_INST:
              M === "?" ? y.state = C.PROC_INST_ENDING : c(M) ? y.state = C.PROC_INST_BODY : y.procInstName += M;
              continue;
            case C.PROC_INST_BODY:
              if (!y.procInstBody && c(M))
                continue;
              M === "?" ? y.state = C.PROC_INST_ENDING : y.procInstBody += M;
              continue;
            case C.PROC_INST_ENDING:
              M === ">" ? (N(y, "onprocessinginstruction", {
                name: y.procInstName,
                body: y.procInstBody
              }), y.procInstName = y.procInstBody = "", y.state = C.TEXT) : (y.procInstBody += "?" + M, y.state = C.PROC_INST_BODY);
              continue;
            case C.OPEN_TAG:
              B(o, M) ? y.tagName += M : (ie(y), M === ">" ? V(y) : M === "/" ? y.state = C.OPEN_TAG_SLASH : (c(M) || H(y, "Invalid character in tag name"), y.state = C.ATTRIB));
              continue;
            case C.OPEN_TAG_SLASH:
              M === ">" ? (V(y, !0), P(y)) : (H(y, "Forward-slash in opening tag not followed by >"), y.state = C.ATTRIB);
              continue;
            case C.ATTRIB:
              if (c(M))
                continue;
              M === ">" ? V(y) : M === "/" ? y.state = C.OPEN_TAG_SLASH : B(T, M) ? (y.attribName = M, y.attribValue = "", y.state = C.ATTRIB_NAME) : H(y, "Invalid attribute name");
              continue;
            case C.ATTRIB_NAME:
              M === "=" ? y.state = C.ATTRIB_VALUE : M === ">" ? (H(y, "Attribute without value"), y.attribValue = y.attribName, ce(y), V(y)) : c(M) ? y.state = C.ATTRIB_NAME_SAW_WHITE : B(o, M) ? y.attribName += M : H(y, "Invalid attribute name");
              continue;
            case C.ATTRIB_NAME_SAW_WHITE:
              if (M === "=")
                y.state = C.ATTRIB_VALUE;
              else {
                if (c(M))
                  continue;
                H(y, "Attribute without value"), y.tag.attributes[y.attribName] = "", y.attribValue = "", N(y, "onattribute", {
                  name: y.attribName,
                  value: ""
                }), y.attribName = "", M === ">" ? V(y) : B(T, M) ? (y.attribName = M, y.state = C.ATTRIB_NAME) : (H(y, "Invalid attribute name"), y.state = C.ATTRIB);
              }
              continue;
            case C.ATTRIB_VALUE:
              if (c(M))
                continue;
              x(M) ? (y.q = M, y.state = C.ATTRIB_VALUE_QUOTED) : (H(y, "Unquoted attribute value"), y.state = C.ATTRIB_VALUE_UNQUOTED, y.attribValue = M);
              continue;
            case C.ATTRIB_VALUE_QUOTED:
              if (M !== y.q) {
                M === "&" ? y.state = C.ATTRIB_VALUE_ENTITY_Q : y.attribValue += M;
                continue;
              }
              ce(y), y.q = "", y.state = C.ATTRIB_VALUE_CLOSED;
              continue;
            case C.ATTRIB_VALUE_CLOSED:
              c(M) ? y.state = C.ATTRIB : M === ">" ? V(y) : M === "/" ? y.state = C.OPEN_TAG_SLASH : B(T, M) ? (H(y, "No whitespace between attributes"), y.attribName = M, y.attribValue = "", y.state = C.ATTRIB_NAME) : H(y, "Invalid attribute name");
              continue;
            case C.ATTRIB_VALUE_UNQUOTED:
              if (!F(M)) {
                M === "&" ? y.state = C.ATTRIB_VALUE_ENTITY_U : y.attribValue += M;
                continue;
              }
              ce(y), M === ">" ? V(y) : y.state = C.ATTRIB;
              continue;
            case C.CLOSE_TAG:
              if (y.tagName)
                M === ">" ? P(y) : B(o, M) ? y.tagName += M : y.script ? (y.script += "</" + y.tagName, y.tagName = "", y.state = C.SCRIPT) : (c(M) || H(y, "Invalid tagname in closing tag"), y.state = C.CLOSE_TAG_SAW_WHITE);
              else {
                if (c(M))
                  continue;
                z(T, M) ? y.script ? (y.script += "</" + M, y.state = C.SCRIPT) : H(y, "Invalid tagname in closing tag.") : y.tagName = M;
              }
              continue;
            case C.CLOSE_TAG_SAW_WHITE:
              if (c(M))
                continue;
              M === ">" ? P(y) : H(y, "Invalid characters in closing tag");
              continue;
            case C.TEXT_ENTITY:
            case C.ATTRIB_VALUE_ENTITY_Q:
            case C.ATTRIB_VALUE_ENTITY_U:
              var J, d;
              switch (y.state) {
                case C.TEXT_ENTITY:
                  J = C.TEXT, d = "textNode";
                  break;
                case C.ATTRIB_VALUE_ENTITY_Q:
                  J = C.ATTRIB_VALUE_QUOTED, d = "attribValue";
                  break;
                case C.ATTRIB_VALUE_ENTITY_U:
                  J = C.ATTRIB_VALUE_UNQUOTED, d = "attribValue";
                  break;
              }
              M === ";" ? (y[d] += X(y), y.entity = "", y.state = J) : B(y.entity.length ? m : g, M) ? y.entity += M : (H(y, "Invalid character in entity name"), y[d] += "&" + y.entity + M, y.entity = "", y.state = J);
              continue;
            default:
              throw new Error(y, "Unknown state: " + y.state);
          }
        return y.position >= y.bufferCheckPosition && u(y), y;
      }
      String.fromCodePoint || (function() {
        var b = String.fromCharCode, y = Math.floor, W = function() {
          var M = 16384, O = [], D, J, d = -1, Y = arguments.length;
          if (!Y)
            return "";
          for (var E = ""; ++d < Y; ) {
            var i = Number(arguments[d]);
            if (!isFinite(i) || // `NaN`, `+Infinity`, or `-Infinity`
            i < 0 || // not a valid Unicode code point
            i > 1114111 || // not a valid Unicode code point
            y(i) !== i)
              throw RangeError("Invalid code point: " + i);
            i <= 65535 ? O.push(i) : (i -= 65536, D = (i >> 10) + 55296, J = i % 1024 + 56320, O.push(D, J)), (d + 1 === Y || O.length > M) && (E += b.apply(null, O), O.length = 0);
          }
          return E;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: W,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = W;
      })();
    })(t);
  })(dr)), dr;
}
var Nn, is;
function Si() {
  return is || (is = 1, Nn = {
    isArray: function(t) {
      return Array.isArray ? Array.isArray(t) : Object.prototype.toString.call(t) === "[object Array]";
    }
  }), Nn;
}
var On, as;
function Ai() {
  if (as) return On;
  as = 1;
  var t = Si().isArray;
  return On = {
    copyOptions: function(e) {
      var r, n = {};
      for (r in e)
        e.hasOwnProperty(r) && (n[r] = e[r]);
      return n;
    },
    ensureFlagExists: function(e, r) {
      (!(e in r) || typeof r[e] != "boolean") && (r[e] = !1);
    },
    ensureSpacesExists: function(e) {
      (!("spaces" in e) || typeof e.spaces != "number" && typeof e.spaces != "string") && (e.spaces = 0);
    },
    ensureAlwaysArrayExists: function(e) {
      (!("alwaysArray" in e) || typeof e.alwaysArray != "boolean" && !t(e.alwaysArray)) && (e.alwaysArray = !1);
    },
    ensureKeyExists: function(e, r) {
      (!(e + "Key" in r) || typeof r[e + "Key"] != "string") && (r[e + "Key"] = r.compact ? "_" + e : e);
    },
    checkFnExists: function(e, r) {
      return e + "Fn" in r;
    }
  }, On;
}
var Pn, ss;
function po() {
  if (ss) return Pn;
  ss = 1;
  var t = cl(), e = Ai(), r = Si().isArray, n, u;
  function l(o) {
    return n = e.copyOptions(o), e.ensureFlagExists("ignoreDeclaration", n), e.ensureFlagExists("ignoreInstruction", n), e.ensureFlagExists("ignoreAttributes", n), e.ensureFlagExists("ignoreText", n), e.ensureFlagExists("ignoreComment", n), e.ensureFlagExists("ignoreCdata", n), e.ensureFlagExists("ignoreDoctype", n), e.ensureFlagExists("compact", n), e.ensureFlagExists("alwaysChildren", n), e.ensureFlagExists("addParent", n), e.ensureFlagExists("trim", n), e.ensureFlagExists("nativeType", n), e.ensureFlagExists("nativeTypeAttributes", n), e.ensureFlagExists("sanitize", n), e.ensureFlagExists("instructionHasAttributes", n), e.ensureFlagExists("captureSpacesBetweenElements", n), e.ensureAlwaysArrayExists(n), e.ensureKeyExists("declaration", n), e.ensureKeyExists("instruction", n), e.ensureKeyExists("attributes", n), e.ensureKeyExists("text", n), e.ensureKeyExists("comment", n), e.ensureKeyExists("cdata", n), e.ensureKeyExists("doctype", n), e.ensureKeyExists("type", n), e.ensureKeyExists("name", n), e.ensureKeyExists("elements", n), e.ensureKeyExists("parent", n), e.checkFnExists("doctype", n), e.checkFnExists("instruction", n), e.checkFnExists("cdata", n), e.checkFnExists("comment", n), e.checkFnExists("text", n), e.checkFnExists("instructionName", n), e.checkFnExists("elementName", n), e.checkFnExists("attributeName", n), e.checkFnExists("attributeValue", n), e.checkFnExists("attributes", n), n;
  }
  function f(o) {
    var g = Number(o);
    if (!isNaN(g))
      return g;
    var m = o.toLowerCase();
    return m === "true" ? !0 : m === "false" ? !1 : o;
  }
  function a(o, g) {
    var m;
    if (n.compact) {
      if (!u[n[o + "Key"]] && (r(n.alwaysArray) ? n.alwaysArray.indexOf(n[o + "Key"]) !== -1 : n.alwaysArray) && (u[n[o + "Key"]] = []), u[n[o + "Key"]] && !r(u[n[o + "Key"]]) && (u[n[o + "Key"]] = [u[n[o + "Key"]]]), o + "Fn" in n && typeof g == "string" && (g = n[o + "Fn"](g, u)), o === "instruction" && ("instructionFn" in n || "instructionNameFn" in n)) {
        for (m in g)
          if (g.hasOwnProperty(m))
            if ("instructionFn" in n)
              g[m] = n.instructionFn(g[m], m, u);
            else {
              var c = g[m];
              delete g[m], g[n.instructionNameFn(m, c, u)] = c;
            }
      }
      r(u[n[o + "Key"]]) ? u[n[o + "Key"]].push(g) : u[n[o + "Key"]] = g;
    } else {
      u[n.elementsKey] || (u[n.elementsKey] = []);
      var x = {};
      if (x[n.typeKey] = o, o === "instruction") {
        for (m in g)
          if (g.hasOwnProperty(m))
            break;
        x[n.nameKey] = "instructionNameFn" in n ? n.instructionNameFn(m, g, u) : m, n.instructionHasAttributes ? (x[n.attributesKey] = g[m][n.attributesKey], "instructionFn" in n && (x[n.attributesKey] = n.instructionFn(x[n.attributesKey], m, u))) : ("instructionFn" in n && (g[m] = n.instructionFn(g[m], m, u)), x[n.instructionKey] = g[m]);
      } else
        o + "Fn" in n && (g = n[o + "Fn"](g, u)), x[n[o + "Key"]] = g;
      n.addParent && (x[n.parentKey] = u), u[n.elementsKey].push(x);
    }
  }
  function h(o) {
    if ("attributesFn" in n && o && (o = n.attributesFn(o, u)), (n.trim || "attributeValueFn" in n || "attributeNameFn" in n || n.nativeTypeAttributes) && o) {
      var g;
      for (g in o)
        if (o.hasOwnProperty(g) && (n.trim && (o[g] = o[g].trim()), n.nativeTypeAttributes && (o[g] = f(o[g])), "attributeValueFn" in n && (o[g] = n.attributeValueFn(o[g], g, u)), "attributeNameFn" in n)) {
          var m = o[g];
          delete o[g], o[n.attributeNameFn(g, o[g], u)] = m;
        }
    }
    return o;
  }
  function k(o) {
    var g = {};
    if (o.body && (o.name.toLowerCase() === "xml" || n.instructionHasAttributes)) {
      for (var m = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g, c; (c = m.exec(o.body)) !== null; )
        g[c[1]] = c[2] || c[3] || c[4];
      g = h(g);
    }
    if (o.name.toLowerCase() === "xml") {
      if (n.ignoreDeclaration)
        return;
      u[n.declarationKey] = {}, Object.keys(g).length && (u[n.declarationKey][n.attributesKey] = g), n.addParent && (u[n.declarationKey][n.parentKey] = u);
    } else {
      if (n.ignoreInstruction)
        return;
      n.trim && (o.body = o.body.trim());
      var x = {};
      n.instructionHasAttributes && Object.keys(g).length ? (x[o.name] = {}, x[o.name][n.attributesKey] = g) : x[o.name] = o.body, a("instruction", x);
    }
  }
  function A(o, g) {
    var m;
    if (typeof o == "object" && (g = o.attributes, o = o.name), g = h(g), "elementNameFn" in n && (o = n.elementNameFn(o, u)), n.compact) {
      if (m = {}, !n.ignoreAttributes && g && Object.keys(g).length) {
        m[n.attributesKey] = {};
        var c;
        for (c in g)
          g.hasOwnProperty(c) && (m[n.attributesKey][c] = g[c]);
      }
      !(o in u) && (r(n.alwaysArray) ? n.alwaysArray.indexOf(o) !== -1 : n.alwaysArray) && (u[o] = []), u[o] && !r(u[o]) && (u[o] = [u[o]]), r(u[o]) ? u[o].push(m) : u[o] = m;
    } else
      u[n.elementsKey] || (u[n.elementsKey] = []), m = {}, m[n.typeKey] = "element", m[n.nameKey] = o, !n.ignoreAttributes && g && Object.keys(g).length && (m[n.attributesKey] = g), n.alwaysChildren && (m[n.elementsKey] = []), u[n.elementsKey].push(m);
    m[n.parentKey] = u, u = m;
  }
  function R(o) {
    n.ignoreText || !o.trim() && !n.captureSpacesBetweenElements || (n.trim && (o = o.trim()), n.nativeType && (o = f(o)), n.sanitize && (o = o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), a("text", o));
  }
  function I(o) {
    n.ignoreComment || (n.trim && (o = o.trim()), a("comment", o));
  }
  function _(o) {
    var g = u[n.parentKey];
    n.addParent || delete u[n.parentKey], u = g;
  }
  function S(o) {
    n.ignoreCdata || (n.trim && (o = o.trim()), a("cdata", o));
  }
  function w(o) {
    n.ignoreDoctype || (o = o.replace(/^ /, ""), n.trim && (o = o.trim()), a("doctype", o));
  }
  function T(o) {
    o.note = o;
  }
  return Pn = function(o, g) {
    var m = t.parser(!0, {}), c = {};
    if (u = c, n = l(g), m.opt = { strictEntities: !0 }, m.onopentag = A, m.ontext = R, m.oncomment = I, m.onclosetag = _, m.onerror = T, m.oncdata = S, m.ondoctype = w, m.onprocessinginstruction = k, m.write(o).close(), c[n.elementsKey]) {
      var x = c[n.elementsKey];
      delete c[n.elementsKey], c[n.elementsKey] = x, delete c.text;
    }
    return c;
  }, Pn;
}
var Fn, os;
function hl() {
  if (os) return Fn;
  os = 1;
  var t = Ai(), e = po();
  function r(n) {
    var u = t.copyOptions(n);
    return t.ensureSpacesExists(u), u;
  }
  return Fn = function(n, u) {
    var l, f, a, h;
    return l = r(u), f = e(n, l), h = "compact" in l && l.compact ? "_parent" : "parent", "addParent" in l && l.addParent ? a = JSON.stringify(f, function(k, A) {
      return k === h ? "_" : A;
    }, l.spaces) : a = JSON.stringify(f, null, l.spaces), a.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }, Fn;
}
var Dn, us;
function mo() {
  if (us) return Dn;
  us = 1;
  var t = Ai(), e = Si().isArray, r, n;
  function u(m) {
    var c = t.copyOptions(m);
    return t.ensureFlagExists("ignoreDeclaration", c), t.ensureFlagExists("ignoreInstruction", c), t.ensureFlagExists("ignoreAttributes", c), t.ensureFlagExists("ignoreText", c), t.ensureFlagExists("ignoreComment", c), t.ensureFlagExists("ignoreCdata", c), t.ensureFlagExists("ignoreDoctype", c), t.ensureFlagExists("compact", c), t.ensureFlagExists("indentText", c), t.ensureFlagExists("indentCdata", c), t.ensureFlagExists("indentAttributes", c), t.ensureFlagExists("indentInstruction", c), t.ensureFlagExists("fullTagEmptyElement", c), t.ensureFlagExists("noQuotesForNativeAttributes", c), t.ensureSpacesExists(c), typeof c.spaces == "number" && (c.spaces = Array(c.spaces + 1).join(" ")), t.ensureKeyExists("declaration", c), t.ensureKeyExists("instruction", c), t.ensureKeyExists("attributes", c), t.ensureKeyExists("text", c), t.ensureKeyExists("comment", c), t.ensureKeyExists("cdata", c), t.ensureKeyExists("doctype", c), t.ensureKeyExists("type", c), t.ensureKeyExists("name", c), t.ensureKeyExists("elements", c), t.checkFnExists("doctype", c), t.checkFnExists("instruction", c), t.checkFnExists("cdata", c), t.checkFnExists("comment", c), t.checkFnExists("text", c), t.checkFnExists("instructionName", c), t.checkFnExists("elementName", c), t.checkFnExists("attributeName", c), t.checkFnExists("attributeValue", c), t.checkFnExists("attributes", c), t.checkFnExists("fullTagEmptyElement", c), c;
  }
  function l(m, c, x) {
    return (!x && m.spaces ? `
` : "") + Array(c + 1).join(m.spaces);
  }
  function f(m, c, x) {
    if (c.ignoreAttributes)
      return "";
    "attributesFn" in c && (m = c.attributesFn(m, n, r));
    var F, B, z, C, $ = [];
    for (F in m)
      m.hasOwnProperty(F) && m[F] !== null && m[F] !== void 0 && (C = c.noQuotesForNativeAttributes && typeof m[F] != "string" ? "" : '"', B = "" + m[F], B = B.replace(/"/g, "&quot;"), z = "attributeNameFn" in c ? c.attributeNameFn(F, B, n, r) : F, $.push(c.spaces && c.indentAttributes ? l(c, x + 1, !1) : " "), $.push(z + "=" + C + ("attributeValueFn" in c ? c.attributeValueFn(B, F, n, r) : B) + C));
    return m && Object.keys(m).length && c.spaces && c.indentAttributes && $.push(l(c, x, !1)), $.join("");
  }
  function a(m, c, x) {
    return r = m, n = "xml", c.ignoreDeclaration ? "" : "<?xml" + f(m[c.attributesKey], c, x) + "?>";
  }
  function h(m, c, x) {
    if (c.ignoreInstruction)
      return "";
    var F;
    for (F in m)
      if (m.hasOwnProperty(F))
        break;
    var B = "instructionNameFn" in c ? c.instructionNameFn(F, m[F], n, r) : F;
    if (typeof m[F] == "object")
      return r = m, n = B, "<?" + B + f(m[F][c.attributesKey], c, x) + "?>";
    var z = m[F] ? m[F] : "";
    return "instructionFn" in c && (z = c.instructionFn(z, F, n, r)), "<?" + B + (z ? " " + z : "") + "?>";
  }
  function k(m, c) {
    return c.ignoreComment ? "" : "<!--" + ("commentFn" in c ? c.commentFn(m, n, r) : m) + "-->";
  }
  function A(m, c) {
    return c.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in c ? c.cdataFn(m, n, r) : m.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function R(m, c) {
    return c.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in c ? c.doctypeFn(m, n, r) : m) + ">";
  }
  function I(m, c) {
    return c.ignoreText ? "" : (m = "" + m, m = m.replace(/&amp;/g, "&"), m = m.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in c ? c.textFn(m, n, r) : m);
  }
  function _(m, c) {
    var x;
    if (m.elements && m.elements.length)
      for (x = 0; x < m.elements.length; ++x)
        switch (m.elements[x][c.typeKey]) {
          case "text":
            if (c.indentText)
              return !0;
            break;
          // skip to next key
          case "cdata":
            if (c.indentCdata)
              return !0;
            break;
          // skip to next key
          case "instruction":
            if (c.indentInstruction)
              return !0;
            break;
          // skip to next key
          case "doctype":
          case "comment":
          case "element":
            return !0;
          default:
            return !0;
        }
    return !1;
  }
  function S(m, c, x) {
    r = m, n = m.name;
    var F = [], B = "elementNameFn" in c ? c.elementNameFn(m.name, m) : m.name;
    F.push("<" + B), m[c.attributesKey] && F.push(f(m[c.attributesKey], c, x));
    var z = m[c.elementsKey] && m[c.elementsKey].length || m[c.attributesKey] && m[c.attributesKey]["xml:space"] === "preserve";
    return z || ("fullTagEmptyElementFn" in c ? z = c.fullTagEmptyElementFn(m.name, m) : z = c.fullTagEmptyElement), z ? (F.push(">"), m[c.elementsKey] && m[c.elementsKey].length && (F.push(w(m[c.elementsKey], c, x + 1)), r = m, n = m.name), F.push(c.spaces && _(m, c) ? `
` + Array(x + 1).join(c.spaces) : ""), F.push("</" + B + ">")) : F.push("/>"), F.join("");
  }
  function w(m, c, x, F) {
    return m.reduce(function(B, z) {
      var C = l(c, x, F && !B);
      switch (z.type) {
        case "element":
          return B + C + S(z, c, x);
        case "comment":
          return B + C + k(z[c.commentKey], c);
        case "doctype":
          return B + C + R(z[c.doctypeKey], c);
        case "cdata":
          return B + (c.indentCdata ? C : "") + A(z[c.cdataKey], c);
        case "text":
          return B + (c.indentText ? C : "") + I(z[c.textKey], c);
        case "instruction":
          var $ = {};
          return $[z[c.nameKey]] = z[c.attributesKey] ? z : z[c.instructionKey], B + (c.indentInstruction ? C : "") + h($, c, x);
      }
    }, "");
  }
  function T(m, c, x) {
    var F;
    for (F in m)
      if (m.hasOwnProperty(F))
        switch (F) {
          case c.parentKey:
          case c.attributesKey:
            break;
          // skip to next key
          case c.textKey:
            if (c.indentText || x)
              return !0;
            break;
          // skip to next key
          case c.cdataKey:
            if (c.indentCdata || x)
              return !0;
            break;
          // skip to next key
          case c.instructionKey:
            if (c.indentInstruction || x)
              return !0;
            break;
          // skip to next key
          case c.doctypeKey:
          case c.commentKey:
            return !0;
          default:
            return !0;
        }
    return !1;
  }
  function o(m, c, x, F, B) {
    r = m, n = c;
    var z = "elementNameFn" in x ? x.elementNameFn(c, m) : c;
    if (typeof m > "u" || m === null || m === "")
      return "fullTagEmptyElementFn" in x && x.fullTagEmptyElementFn(c, m) || x.fullTagEmptyElement ? "<" + z + "></" + z + ">" : "<" + z + "/>";
    var C = [];
    if (c) {
      if (C.push("<" + z), typeof m != "object")
        return C.push(">" + I(m, x) + "</" + z + ">"), C.join("");
      m[x.attributesKey] && C.push(f(m[x.attributesKey], x, F));
      var $ = T(m, x, !0) || m[x.attributesKey] && m[x.attributesKey]["xml:space"] === "preserve";
      if ($ || ("fullTagEmptyElementFn" in x ? $ = x.fullTagEmptyElementFn(c, m) : $ = x.fullTagEmptyElement), $)
        C.push(">");
      else
        return C.push("/>"), C.join("");
    }
    return C.push(g(m, x, F + 1, !1)), r = m, n = c, c && C.push((B ? l(x, F, !1) : "") + "</" + z + ">"), C.join("");
  }
  function g(m, c, x, F) {
    var B, z, C, $ = [];
    for (z in m)
      if (m.hasOwnProperty(z))
        for (C = e(m[z]) ? m[z] : [m[z]], B = 0; B < C.length; ++B) {
          switch (z) {
            case c.declarationKey:
              $.push(a(C[B], c, x));
              break;
            case c.instructionKey:
              $.push((c.indentInstruction ? l(c, x, F) : "") + h(C[B], c, x));
              break;
            case c.attributesKey:
            case c.parentKey:
              break;
            // skip
            case c.textKey:
              $.push((c.indentText ? l(c, x, F) : "") + I(C[B], c));
              break;
            case c.cdataKey:
              $.push((c.indentCdata ? l(c, x, F) : "") + A(C[B], c));
              break;
            case c.doctypeKey:
              $.push(l(c, x, F) + R(C[B], c));
              break;
            case c.commentKey:
              $.push(l(c, x, F) + k(C[B], c));
              break;
            default:
              $.push(l(c, x, F) + o(C[B], z, c, x, T(C[B], c)));
          }
          F = F && !$.length;
        }
    return $.join("");
  }
  return Dn = function(m, c) {
    c = u(c);
    var x = [];
    return r = m, n = "_root_", c.compact ? x.push(g(m, c, 0, !0)) : (m[c.declarationKey] && x.push(a(m[c.declarationKey], c, 0)), m[c.elementsKey] && m[c.elementsKey].length && x.push(w(m[c.elementsKey], c, 0, !x.length))), x.join("");
  }, Dn;
}
var Bn, ls;
function fl() {
  if (ls) return Bn;
  ls = 1;
  var t = mo();
  return Bn = function(e, r) {
    e instanceof Buffer && (e = e.toString());
    var n = null;
    if (typeof e == "string")
      try {
        n = JSON.parse(e);
      } catch {
        throw new Error("The JSON structure is invalid");
      }
    else
      n = e;
    return t(n, r);
  }, Bn;
}
var Ln, cs;
function dl() {
  if (cs) return Ln;
  cs = 1;
  var t = po(), e = hl(), r = mo(), n = fl();
  return Ln = {
    xml2js: t,
    xml2json: e,
    js2xml: r,
    json2xml: n
  }, Ln;
}
var wo = dl();
const ki = (t) => {
  switch (t.type) {
    case void 0:
    case "element":
      const e = new ml(t.name, t.attributes), r = t.elements || [];
      for (const n of r) {
        const u = ki(n);
        u !== void 0 && e.push(u);
      }
      return e;
    case "text":
      return t.text;
    default:
      return;
  }
};
class pl extends pe {
  // noop
}
class ml extends ae {
  /**
   * Parses an XML string and converts it to an ImportedXmlComponent tree.
   *
   * This static method is the primary way to import external XML content.
   * It uses xml-js to parse the XML string into a JSON representation,
   * then converts that into a tree of XmlComponent objects.
   *
   * @param importedContent - The XML content as a string
   * @returns An ImportedXmlComponent representing the parsed XML
   *
   * @example
   * ```typescript
   * const xml = '<w:p><w:r><w:t>Hello</w:t></w:r></w:p>';
   * const component = ImportedXmlComponent.fromXmlString(xml);
   * ```
   */
  static fromXmlString(e) {
    const r = wo.xml2js(e, { compact: !1 });
    return ki(r);
  }
  /**
   * Creates an ImportedXmlComponent.
   *
   * @param rootKey - The XML element name
   * @param _attr - Optional attributes for the root element
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e, r) {
    super(e), r && this.root.push(new pl(r));
  }
  /**
   * Adds a child component or text to this element.
   *
   * @param xmlComponent - The child component or text string to add
   */
  push(e) {
    this.root.push(e);
  }
}
class wl extends ae {
  /**
   * Creates an ImportedRootElementAttributes component.
   *
   * @param _attr - The attributes object to pass through
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e) {
    super(""), this._attr = e;
  }
  /**
   * Prepares the attributes for XML serialization.
   *
   * @param _ - Context (unused)
   * @returns Object with _attr key containing the raw attributes
   */
  prepForXml(e) {
    return {
      _attr: this._attr
    };
  }
}
class go extends ae {
  /**
   * Creates a new InitializableXmlComponent.
   *
   * @param rootKey - The XML element name
   * @param initComponent - Optional component to copy children from
   */
  constructor(e, r) {
    super(e), r && (this.root = r.root);
  }
}
const ke = (t) => {
  if (isNaN(t))
    throw new Error(`Invalid value '${t}' specified. Must be an integer.`);
  return Math.floor(t);
}, or = (t) => {
  const e = ke(t);
  if (e < 0)
    throw new Error(`Invalid value '${t}' specified. Must be a positive integer.`);
  return e;
}, yo = (t, e) => {
  const r = e * 2;
  if (t.length !== r || isNaN(+`0x${t}`))
    throw new Error(`Invalid hex value '${t}'. Expected ${r} digit hex value`);
  return t;
}, hs = (t) => yo(t, 1), Ri = (t) => {
  const e = t.slice(-2), r = t.substring(0, t.length - 2);
  return `${Number(r)}${e}`;
}, vo = (t) => {
  const e = Ri(t);
  if (parseFloat(e) < 0)
    throw new Error(`Invalid value '${e}' specified. Expected a positive number.`);
  return e;
}, vt = (t) => {
  if (t === "auto")
    return t;
  const e = t.charAt(0) === "#" ? t.substring(1) : t;
  return yo(e, 3);
}, Xe = (t) => typeof t == "string" ? Ri(t) : ke(t), gl = (t) => typeof t == "string" ? vo(t) : or(t), Se = (t) => typeof t == "string" ? vo(t) : or(t), yl = (t) => {
  const e = t.substring(0, t.length - 1);
  return `${Number(e)}%`;
}, bo = (t) => typeof t == "number" ? ke(t) : t.slice(-1) === "%" ? yl(t) : Ri(t), vl = or, bl = or, _l = (t) => t.toISOString();
class ue extends ae {
  /**
   * Creates an OnOffElement.
   *
   * @param name - The XML element name (e.g., "w:b", "w:i")
   * @param val - The boolean value (defaults to true)
   */
  constructor(e, r = !0) {
    super(e), r !== !0 && this.root.push(new Re({ val: r }));
  }
}
class Mn extends ae {
  /**
   * Creates an HpsMeasureElement.
   *
   * @param name - The XML element name
   * @param val - The measurement value (number in half-points or string with units)
   */
  constructor(e, r) {
    super(e), this.root.push(new Re({ val: gl(r) }));
  }
}
class _o extends ae {
}
class Je extends ae {
  /**
   * Creates a StringValueElement.
   *
   * @param name - The XML element name
   * @param val - The string value
   */
  constructor(e, r) {
    super(e), this.root.push(new Re({ val: r }));
  }
}
const At = (t, e) => new fe({
  name: t,
  attributes: {
    value: { key: "w:val", value: e }
  }
});
class Pt extends ae {
  /**
   * Creates a NumberValueElement.
   *
   * @param name - The XML element name
   * @param val - The numeric value
   */
  constructor(e, r) {
    super(e), this.root.push(new Re({ val: r }));
  }
}
class nt extends ae {
  /**
   * Creates a StringContainer.
   *
   * @param name - The XML element name
   * @param val - The text content
   */
  constructor(e, r) {
    super(e), this.root.push(r);
  }
}
class fe extends ae {
  /**
   * Creates a BuilderElement with the specified configuration.
   *
   * @param config - Element configuration
   * @param config.name - The XML element name
   * @param config.attributes - Optional attributes with explicit key-value pairs
   * @param config.children - Optional child elements
   */
  constructor({
    name: e,
    attributes: r,
    children: n
  }) {
    super(e), r && this.root.push(new Gs(r)), n && this.root.push(...n);
  }
}
const Te = {
  /** Align Start */
  START: "start",
  /** Align Center */
  CENTER: "center",
  /** Align Left */
  LEFT: "left",
  /** Align Right */
  RIGHT: "right",
  /** Justified */
  JUSTIFIED: "both"
}, Eo = (t) => new fe({
  name: "w:jc",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), be = (t, { color: e, size: r, space: n, style: u }) => new fe({
  name: t,
  attributes: {
    style: { key: "w:val", value: u },
    color: { key: "w:color", value: e === void 0 ? void 0 : vt(e) },
    size: { key: "w:sz", value: r === void 0 ? void 0 : vl(r) },
    space: { key: "w:space", value: n === void 0 ? void 0 : bl(n) }
  }
}), Oe = {
  /** a single line */
  SINGLE: "single",
  /** a dashed line */
  DASHED: "dashed",
  /** a dotted line */
  DOTTED: "dotted",
  /** a double line */
  DOUBLE: "double",
  /** no border */
  NIL: "nil",
  /** no border */
  NONE: "none",
  /** a single line */
  THICK: "thick",
  /** a triple line */
  TRIPLE: "triple"
};
class El extends Qe {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(be("w:top", e.top)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.left && this.root.push(be("w:left", e.left)), e.right && this.root.push(be("w:right", e.right)), e.between && this.root.push(be("w:between", e.between));
  }
}
class xl extends ae {
  constructor() {
    super("w:pBdr");
    const e = be("w:bottom", {
      color: "auto",
      space: 1,
      style: Oe.SINGLE,
      size: 6
    });
    this.root.push(e);
  }
}
const Tl = ({ start: t, end: e, left: r, right: n, hanging: u, firstLine: l }) => new fe({
  name: "w:ind",
  attributes: {
    start: { key: "w:start", value: t === void 0 ? void 0 : Xe(t) },
    end: { key: "w:end", value: e === void 0 ? void 0 : Xe(e) },
    left: { key: "w:left", value: r === void 0 ? void 0 : Xe(r) },
    right: { key: "w:right", value: n === void 0 ? void 0 : Xe(n) },
    hanging: { key: "w:hanging", value: u === void 0 ? void 0 : Se(u) },
    firstLine: { key: "w:firstLine", value: l === void 0 ? void 0 : Se(l) }
  }
}), Sl = () => new fe({
  name: "w:br"
}), Ii = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
}, Ci = (t, e) => new fe({
  name: "w:fldChar",
  attributes: {
    type: { key: "w:fldCharType", value: t },
    dirty: { key: "w:dirty", value: e }
  }
}), Ct = (t) => Ci(Ii.BEGIN, t), Nt = (t) => Ci(Ii.SEPARATE, t), Ot = (t) => Ci(Ii.END, t), Al = {
  DECIMAL: "decimal"
}, ut = {
  DEFAULT: "default",
  PRESERVE: "preserve"
};
class lt extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { space: "xml:space" });
  }
}
class kl extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new lt({ space: ut.PRESERVE })), this.root.push("PAGE");
  }
}
class Rl extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new lt({ space: ut.PRESERVE })), this.root.push("NUMPAGES");
  }
}
class Il extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new lt({ space: ut.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}
class Cl extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new lt({ space: ut.PRESERVE })), this.root.push("SECTION");
  }
}
const ur = ({ fill: t, color: e, type: r }) => new fe({
  name: "w:shd",
  attributes: {
    fill: { key: "w:fill", value: t === void 0 ? void 0 : vt(t) },
    color: { key: "w:color", value: e === void 0 ? void 0 : vt(e) },
    type: { key: "w:val", value: r }
  }
});
class Fe extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
}
class Nl extends ae {
  constructor(e) {
    super("w:del"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
class Ol extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
const Pl = {
  /** Dot emphasis mark */
  DOT: "dot"
}, Fl = (t = Pl.DOT) => new fe({
  name: "w:em",
  attributes: {
    val: { key: "w:val", value: t }
  }
});
class Dl extends ae {
  constructor(e) {
    super("w:spacing"), this.root.push(
      new Re({
        val: Xe(e)
      })
    );
  }
}
class Bl extends ae {
  constructor(e) {
    super("w:color"), this.root.push(
      new Re({
        val: vt(e)
      })
    );
  }
}
class Ll extends ae {
  constructor(e) {
    super("w:highlight"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class Ml extends ae {
  constructor(e) {
    super("w:highlightCs"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
const Ul = (t) => new fe({
  name: "w:lang",
  attributes: {
    value: {
      key: "w:val",
      value: t.value
    },
    eastAsia: {
      key: "w:eastAsia",
      value: t.eastAsia
    },
    bidirectional: {
      key: "w:bidi",
      value: t.bidirectional
    }
  }
}), Un = (t, e) => {
  if (typeof t == "string") {
    const n = t;
    return new fe({
      name: "w:rFonts",
      attributes: {
        ascii: { key: "w:ascii", value: n },
        cs: { key: "w:cs", value: n },
        eastAsia: { key: "w:eastAsia", value: n },
        hAnsi: { key: "w:hAnsi", value: n },
        hint: { key: "w:hint", value: e }
      }
    });
  }
  const r = t;
  return new fe({
    name: "w:rFonts",
    attributes: {
      ascii: { key: "w:ascii", value: r.ascii },
      cs: { key: "w:cs", value: r.cs },
      eastAsia: { key: "w:eastAsia", value: r.eastAsia },
      hAnsi: { key: "w:hAnsi", value: r.hAnsi },
      hint: { key: "w:hint", value: r.hint }
    }
  });
}, xo = (t) => new fe({
  name: "w:vertAlign",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), jl = () => xo("superscript"), zl = () => xo("subscript"), To = {
  /** Single underline */
  SINGLE: "single"
}, Wl = (t = To.SINGLE, e) => new fe({
  name: "w:u",
  attributes: {
    val: { key: "w:val", value: t },
    color: { key: "w:color", value: e === void 0 ? void 0 : vt(e) }
  }
});
class ht extends Qe {
  constructor(e) {
    var r, n;
    if (super("w:rPr"), !e)
      return;
    e.style && this.push(new Je("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(Un(e.font)) : "name" in e.font ? this.push(Un(e.font.name, e.font.hint)) : this.push(Un(e.font))), e.bold !== void 0 && this.push(new ue("w:b", e.bold)), (e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) && this.push(new ue("w:bCs", (r = e.boldComplexScript) != null ? r : e.bold)), e.italics !== void 0 && this.push(new ue("w:i", e.italics)), (e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) && this.push(new ue("w:iCs", (n = e.italicsComplexScript) != null ? n : e.italics)), e.smallCaps !== void 0 ? this.push(new ue("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new ue("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new ue("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new ue("w:dstrike", e.doubleStrike)), e.emboss !== void 0 && this.push(new ue("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new ue("w:imprint", e.imprint)), e.noProof !== void 0 && this.push(new ue("w:noProof", e.noProof)), e.snapToGrid !== void 0 && this.push(new ue("w:snapToGrid", e.snapToGrid)), e.vanish && this.push(new ue("w:vanish", e.vanish)), e.color && this.push(new Bl(e.color)), e.characterSpacing && this.push(new Dl(e.characterSpacing)), e.scale !== void 0 && this.push(new Pt("w:w", e.scale)), e.kern && this.push(new Mn("w:kern", e.kern)), e.position && this.push(new Je("w:position", e.position)), e.size !== void 0 && this.push(new Mn("w:sz", e.size));
    const u = e.sizeComplexScript === void 0 || e.sizeComplexScript === !0 ? e.size : e.sizeComplexScript;
    u && this.push(new Mn("w:szCs", u)), e.highlight && this.push(new Ll(e.highlight));
    const l = e.highlightComplexScript === void 0 || e.highlightComplexScript === !0 ? e.highlight : e.highlightComplexScript;
    l && this.push(new Ml(l)), e.underline && this.push(Wl(e.underline.type, e.underline.color)), e.effect && this.push(new Je("w:effect", e.effect)), e.border && this.push(be("w:bdr", e.border)), e.shading && this.push(ur(e.shading)), e.subScript && this.push(zl()), e.superScript && this.push(jl()), e.rightToLeft !== void 0 && this.push(new ue("w:rtl", e.rightToLeft)), e.emphasisMark && this.push(Fl(e.emphasisMark.type)), e.language && this.push(Ul(e.language)), e.specVanish && this.push(new ue("w:specVanish", e.vanish)), e.math && this.push(new ue("w:oMath", e.math)), e.revision && this.push(new ql(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
}
class Hl extends ht {
  constructor(e) {
    super(e), e?.insertion && this.push(new Ol(e.insertion)), e?.deletion && this.push(new Nl(e.deletion));
  }
}
class ql extends ae {
  constructor(e) {
    super("w:rPrChange"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.addChildElement(new ht(e));
  }
}
class rr extends ae {
  constructor(e) {
    var r;
    super("w:t"), typeof e == "string" ? (this.root.push(new lt({ space: ut.PRESERVE })), this.root.push(e)) : (this.root.push(new lt({ space: (r = e.space) != null ? r : ut.DEFAULT })), this.root.push(e.text));
  }
}
const Ye = {
  /** Inserts the current page number */
  CURRENT: "CURRENT",
  /** Inserts the total number of pages in the document */
  TOTAL_PAGES: "TOTAL_PAGES",
  /** Inserts the total number of pages in the current section */
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  /** Inserts the current section number */
  CURRENT_SECTION: "SECTION"
};
class We extends ae {
  constructor(e) {
    if (super("w:r"), re(this, "properties"), this.properties = new ht(e), this.root.push(this.properties), e.break)
      for (let r = 0; r < e.break; r++)
        this.root.push(Sl());
    if (e.children)
      for (const r of e.children) {
        if (typeof r == "string") {
          switch (r) {
            case Ye.CURRENT:
              this.root.push(Ct()), this.root.push(new kl()), this.root.push(Nt()), this.root.push(Ot());
              break;
            case Ye.TOTAL_PAGES:
              this.root.push(Ct()), this.root.push(new Rl()), this.root.push(Nt()), this.root.push(Ot());
              break;
            case Ye.TOTAL_PAGES_IN_SECTION:
              this.root.push(Ct()), this.root.push(new Il()), this.root.push(Nt()), this.root.push(Ot());
              break;
            case Ye.CURRENT_SECTION:
              this.root.push(Ct()), this.root.push(new Cl()), this.root.push(Nt()), this.root.push(Ot());
              break;
            default:
              this.root.push(new rr(r));
              break;
          }
          continue;
        }
        this.root.push(r);
      }
    else e.text !== void 0 && this.root.push(new rr(e.text));
  }
}
class Ne extends We {
  constructor(e) {
    super(typeof e == "string" ? { text: e } : e);
  }
}
var jn = {}, ye = {}, zn, fs;
function Bt() {
  if (fs) return zn;
  fs = 1, zn = t;
  function t(e, r) {
    if (!e)
      throw new Error(r || "Assertion failed");
  }
  return t.equal = function(r, n, u) {
    if (r != n)
      throw new Error(u || "Assertion failed: " + r + " != " + n);
  }, zn;
}
var ds;
function He() {
  if (ds) return ye;
  ds = 1;
  var t = Bt(), e = et();
  ye.inherits = e;
  function r(N, U) {
    return (N.charCodeAt(U) & 64512) !== 55296 || U < 0 || U + 1 >= N.length ? !1 : (N.charCodeAt(U + 1) & 64512) === 56320;
  }
  function n(N, U) {
    if (Array.isArray(N))
      return N.slice();
    if (!N)
      return [];
    var v = [];
    if (typeof N == "string")
      if (U) {
        if (U === "hex")
          for (N = N.replace(/[^a-z0-9]+/ig, ""), N.length % 2 !== 0 && (N = "0" + N), ee = 0; ee < N.length; ee += 2)
            v.push(parseInt(N[ee] + N[ee + 1], 16));
      } else for (var K = 0, ee = 0; ee < N.length; ee++) {
        var H = N.charCodeAt(ee);
        H < 128 ? v[K++] = H : H < 2048 ? (v[K++] = H >> 6 | 192, v[K++] = H & 63 | 128) : r(N, ee) ? (H = 65536 + ((H & 1023) << 10) + (N.charCodeAt(++ee) & 1023), v[K++] = H >> 18 | 240, v[K++] = H >> 12 & 63 | 128, v[K++] = H >> 6 & 63 | 128, v[K++] = H & 63 | 128) : (v[K++] = H >> 12 | 224, v[K++] = H >> 6 & 63 | 128, v[K++] = H & 63 | 128);
      }
    else
      for (ee = 0; ee < N.length; ee++)
        v[ee] = N[ee] | 0;
    return v;
  }
  ye.toArray = n;
  function u(N) {
    for (var U = "", v = 0; v < N.length; v++)
      U += a(N[v].toString(16));
    return U;
  }
  ye.toHex = u;
  function l(N) {
    var U = N >>> 24 | N >>> 8 & 65280 | N << 8 & 16711680 | (N & 255) << 24;
    return U >>> 0;
  }
  ye.htonl = l;
  function f(N, U) {
    for (var v = "", K = 0; K < N.length; K++) {
      var ee = N[K];
      U === "little" && (ee = l(ee)), v += h(ee.toString(16));
    }
    return v;
  }
  ye.toHex32 = f;
  function a(N) {
    return N.length === 1 ? "0" + N : N;
  }
  ye.zero2 = a;
  function h(N) {
    return N.length === 7 ? "0" + N : N.length === 6 ? "00" + N : N.length === 5 ? "000" + N : N.length === 4 ? "0000" + N : N.length === 3 ? "00000" + N : N.length === 2 ? "000000" + N : N.length === 1 ? "0000000" + N : N;
  }
  ye.zero8 = h;
  function k(N, U, v, K) {
    var ee = v - U;
    t(ee % 4 === 0);
    for (var H = new Array(ee / 4), ie = 0, Q = U; ie < H.length; ie++, Q += 4) {
      var ce;
      K === "big" ? ce = N[Q] << 24 | N[Q + 1] << 16 | N[Q + 2] << 8 | N[Q + 3] : ce = N[Q + 3] << 24 | N[Q + 2] << 16 | N[Q + 1] << 8 | N[Q], H[ie] = ce >>> 0;
    }
    return H;
  }
  ye.join32 = k;
  function A(N, U) {
    for (var v = new Array(N.length * 4), K = 0, ee = 0; K < N.length; K++, ee += 4) {
      var H = N[K];
      U === "big" ? (v[ee] = H >>> 24, v[ee + 1] = H >>> 16 & 255, v[ee + 2] = H >>> 8 & 255, v[ee + 3] = H & 255) : (v[ee + 3] = H >>> 24, v[ee + 2] = H >>> 16 & 255, v[ee + 1] = H >>> 8 & 255, v[ee] = H & 255);
    }
    return v;
  }
  ye.split32 = A;
  function R(N, U) {
    return N >>> U | N << 32 - U;
  }
  ye.rotr32 = R;
  function I(N, U) {
    return N << U | N >>> 32 - U;
  }
  ye.rotl32 = I;
  function _(N, U) {
    return N + U >>> 0;
  }
  ye.sum32 = _;
  function S(N, U, v) {
    return N + U + v >>> 0;
  }
  ye.sum32_3 = S;
  function w(N, U, v, K) {
    return N + U + v + K >>> 0;
  }
  ye.sum32_4 = w;
  function T(N, U, v, K, ee) {
    return N + U + v + K + ee >>> 0;
  }
  ye.sum32_5 = T;
  function o(N, U, v, K) {
    var ee = N[U], H = N[U + 1], ie = K + H >>> 0, Q = (ie < K ? 1 : 0) + v + ee;
    N[U] = Q >>> 0, N[U + 1] = ie;
  }
  ye.sum64 = o;
  function g(N, U, v, K) {
    var ee = U + K >>> 0, H = (ee < U ? 1 : 0) + N + v;
    return H >>> 0;
  }
  ye.sum64_hi = g;
  function m(N, U, v, K) {
    var ee = U + K;
    return ee >>> 0;
  }
  ye.sum64_lo = m;
  function c(N, U, v, K, ee, H, ie, Q) {
    var ce = 0, V = U;
    V = V + K >>> 0, ce += V < U ? 1 : 0, V = V + H >>> 0, ce += V < H ? 1 : 0, V = V + Q >>> 0, ce += V < Q ? 1 : 0;
    var P = N + v + ee + ie + ce;
    return P >>> 0;
  }
  ye.sum64_4_hi = c;
  function x(N, U, v, K, ee, H, ie, Q) {
    var ce = U + K + H + Q;
    return ce >>> 0;
  }
  ye.sum64_4_lo = x;
  function F(N, U, v, K, ee, H, ie, Q, ce, V) {
    var P = 0, X = U;
    X = X + K >>> 0, P += X < U ? 1 : 0, X = X + H >>> 0, P += X < H ? 1 : 0, X = X + Q >>> 0, P += X < Q ? 1 : 0, X = X + V >>> 0, P += X < V ? 1 : 0;
    var Z = N + v + ee + ie + ce + P;
    return Z >>> 0;
  }
  ye.sum64_5_hi = F;
  function B(N, U, v, K, ee, H, ie, Q, ce, V) {
    var P = U + K + H + Q + V;
    return P >>> 0;
  }
  ye.sum64_5_lo = B;
  function z(N, U, v) {
    var K = U << 32 - v | N >>> v;
    return K >>> 0;
  }
  ye.rotr64_hi = z;
  function C(N, U, v) {
    var K = N << 32 - v | U >>> v;
    return K >>> 0;
  }
  ye.rotr64_lo = C;
  function $(N, U, v) {
    return N >>> v;
  }
  ye.shr64_hi = $;
  function le(N, U, v) {
    var K = N << 32 - v | U >>> v;
    return K >>> 0;
  }
  return ye.shr64_lo = le, ye;
}
var Wn = {}, ps;
function Lt() {
  if (ps) return Wn;
  ps = 1;
  var t = He(), e = Bt();
  function r() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  return Wn.BlockHash = r, r.prototype.update = function(u, l) {
    if (u = t.toArray(u, l), this.pending ? this.pending = this.pending.concat(u) : this.pending = u, this.pendingTotal += u.length, this.pending.length >= this._delta8) {
      u = this.pending;
      var f = u.length % this._delta8;
      this.pending = u.slice(u.length - f, u.length), this.pending.length === 0 && (this.pending = null), u = t.join32(u, 0, u.length - f, this.endian);
      for (var a = 0; a < u.length; a += this._delta32)
        this._update(u, a, a + this._delta32);
    }
    return this;
  }, r.prototype.digest = function(u) {
    return this.update(this._pad()), e(this.pending === null), this._digest(u);
  }, r.prototype._pad = function() {
    var u = this.pendingTotal, l = this._delta8, f = l - (u + this.padLength) % l, a = new Array(f + this.padLength);
    a[0] = 128;
    for (var h = 1; h < f; h++)
      a[h] = 0;
    if (u <<= 3, this.endian === "big") {
      for (var k = 8; k < this.padLength; k++)
        a[h++] = 0;
      a[h++] = 0, a[h++] = 0, a[h++] = 0, a[h++] = 0, a[h++] = u >>> 24 & 255, a[h++] = u >>> 16 & 255, a[h++] = u >>> 8 & 255, a[h++] = u & 255;
    } else
      for (a[h++] = u & 255, a[h++] = u >>> 8 & 255, a[h++] = u >>> 16 & 255, a[h++] = u >>> 24 & 255, a[h++] = 0, a[h++] = 0, a[h++] = 0, a[h++] = 0, k = 8; k < this.padLength; k++)
        a[h++] = 0;
    return a;
  }, Wn;
}
var it = {}, Le = {}, ms;
function So() {
  if (ms) return Le;
  ms = 1;
  var t = He(), e = t.rotr32;
  function r(A, R, I, _) {
    if (A === 0)
      return n(R, I, _);
    if (A === 1 || A === 3)
      return l(R, I, _);
    if (A === 2)
      return u(R, I, _);
  }
  Le.ft_1 = r;
  function n(A, R, I) {
    return A & R ^ ~A & I;
  }
  Le.ch32 = n;
  function u(A, R, I) {
    return A & R ^ A & I ^ R & I;
  }
  Le.maj32 = u;
  function l(A, R, I) {
    return A ^ R ^ I;
  }
  Le.p32 = l;
  function f(A) {
    return e(A, 2) ^ e(A, 13) ^ e(A, 22);
  }
  Le.s0_256 = f;
  function a(A) {
    return e(A, 6) ^ e(A, 11) ^ e(A, 25);
  }
  Le.s1_256 = a;
  function h(A) {
    return e(A, 7) ^ e(A, 18) ^ A >>> 3;
  }
  Le.g0_256 = h;
  function k(A) {
    return e(A, 17) ^ e(A, 19) ^ A >>> 10;
  }
  return Le.g1_256 = k, Le;
}
var Hn, ws;
function Gl() {
  if (ws) return Hn;
  ws = 1;
  var t = He(), e = Lt(), r = So(), n = t.rotl32, u = t.sum32, l = t.sum32_5, f = r.ft_1, a = e.BlockHash, h = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function k() {
    if (!(this instanceof k))
      return new k();
    a.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  return t.inherits(k, a), Hn = k, k.blockSize = 512, k.outSize = 160, k.hmacStrength = 80, k.padLength = 64, k.prototype._update = function(R, I) {
    for (var _ = this.W, S = 0; S < 16; S++)
      _[S] = R[I + S];
    for (; S < _.length; S++)
      _[S] = n(_[S - 3] ^ _[S - 8] ^ _[S - 14] ^ _[S - 16], 1);
    var w = this.h[0], T = this.h[1], o = this.h[2], g = this.h[3], m = this.h[4];
    for (S = 0; S < _.length; S++) {
      var c = ~~(S / 20), x = l(n(w, 5), f(c, T, o, g), m, _[S], h[c]);
      m = g, g = o, o = n(T, 30), T = w, w = x;
    }
    this.h[0] = u(this.h[0], w), this.h[1] = u(this.h[1], T), this.h[2] = u(this.h[2], o), this.h[3] = u(this.h[3], g), this.h[4] = u(this.h[4], m);
  }, k.prototype._digest = function(R) {
    return R === "hex" ? t.toHex32(this.h, "big") : t.split32(this.h, "big");
  }, Hn;
}
var qn, gs;
function Ao() {
  if (gs) return qn;
  gs = 1;
  var t = He(), e = Lt(), r = So(), n = Bt(), u = t.sum32, l = t.sum32_4, f = t.sum32_5, a = r.ch32, h = r.maj32, k = r.s0_256, A = r.s1_256, R = r.g0_256, I = r.g1_256, _ = e.BlockHash, S = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function w() {
    if (!(this instanceof w))
      return new w();
    _.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = S, this.W = new Array(64);
  }
  return t.inherits(w, _), qn = w, w.blockSize = 512, w.outSize = 256, w.hmacStrength = 192, w.padLength = 64, w.prototype._update = function(o, g) {
    for (var m = this.W, c = 0; c < 16; c++)
      m[c] = o[g + c];
    for (; c < m.length; c++)
      m[c] = l(I(m[c - 2]), m[c - 7], R(m[c - 15]), m[c - 16]);
    var x = this.h[0], F = this.h[1], B = this.h[2], z = this.h[3], C = this.h[4], $ = this.h[5], le = this.h[6], N = this.h[7];
    for (n(this.k.length === m.length), c = 0; c < m.length; c++) {
      var U = f(N, A(C), a(C, $, le), this.k[c], m[c]), v = u(k(x), h(x, F, B));
      N = le, le = $, $ = C, C = u(z, U), z = B, B = F, F = x, x = u(U, v);
    }
    this.h[0] = u(this.h[0], x), this.h[1] = u(this.h[1], F), this.h[2] = u(this.h[2], B), this.h[3] = u(this.h[3], z), this.h[4] = u(this.h[4], C), this.h[5] = u(this.h[5], $), this.h[6] = u(this.h[6], le), this.h[7] = u(this.h[7], N);
  }, w.prototype._digest = function(o) {
    return o === "hex" ? t.toHex32(this.h, "big") : t.split32(this.h, "big");
  }, qn;
}
var Gn, ys;
function Kl() {
  if (ys) return Gn;
  ys = 1;
  var t = He(), e = Ao();
  function r() {
    if (!(this instanceof r))
      return new r();
    e.call(this), this.h = [
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428
    ];
  }
  return t.inherits(r, e), Gn = r, r.blockSize = 512, r.outSize = 224, r.hmacStrength = 192, r.padLength = 64, r.prototype._digest = function(u) {
    return u === "hex" ? t.toHex32(this.h.slice(0, 7), "big") : t.split32(this.h.slice(0, 7), "big");
  }, Gn;
}
var Kn, vs;
function ko() {
  if (vs) return Kn;
  vs = 1;
  var t = He(), e = Lt(), r = Bt(), n = t.rotr64_hi, u = t.rotr64_lo, l = t.shr64_hi, f = t.shr64_lo, a = t.sum64, h = t.sum64_hi, k = t.sum64_lo, A = t.sum64_4_hi, R = t.sum64_4_lo, I = t.sum64_5_hi, _ = t.sum64_5_lo, S = e.BlockHash, w = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  function T() {
    if (!(this instanceof T))
      return new T();
    S.call(this), this.h = [
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ], this.k = w, this.W = new Array(160);
  }
  t.inherits(T, S), Kn = T, T.blockSize = 1024, T.outSize = 512, T.hmacStrength = 192, T.padLength = 128, T.prototype._prepareBlock = function(v, K) {
    for (var ee = this.W, H = 0; H < 32; H++)
      ee[H] = v[K + H];
    for (; H < ee.length; H += 2) {
      var ie = le(ee[H - 4], ee[H - 3]), Q = N(ee[H - 4], ee[H - 3]), ce = ee[H - 14], V = ee[H - 13], P = C(ee[H - 30], ee[H - 29]), X = $(ee[H - 30], ee[H - 29]), Z = ee[H - 32], te = ee[H - 31];
      ee[H] = A(
        ie,
        Q,
        ce,
        V,
        P,
        X,
        Z,
        te
      ), ee[H + 1] = R(
        ie,
        Q,
        ce,
        V,
        P,
        X,
        Z,
        te
      );
    }
  }, T.prototype._update = function(v, K) {
    this._prepareBlock(v, K);
    var ee = this.W, H = this.h[0], ie = this.h[1], Q = this.h[2], ce = this.h[3], V = this.h[4], P = this.h[5], X = this.h[6], Z = this.h[7], te = this.h[8], G = this.h[9], b = this.h[10], y = this.h[11], W = this.h[12], M = this.h[13], O = this.h[14], D = this.h[15];
    r(this.k.length === ee.length);
    for (var J = 0; J < ee.length; J += 2) {
      var d = O, Y = D, E = B(te, G), i = z(te, G), s = o(te, G, b, y, W), p = g(te, G, b, y, W, M), L = this.k[J], q = this.k[J + 1], j = ee[J], ne = ee[J + 1], oe = I(
        d,
        Y,
        E,
        i,
        s,
        p,
        L,
        q,
        j,
        ne
      ), se = _(
        d,
        Y,
        E,
        i,
        s,
        p,
        L,
        q,
        j,
        ne
      );
      d = x(H, ie), Y = F(H, ie), E = m(H, ie, Q, ce, V), i = c(H, ie, Q, ce, V, P);
      var he = h(d, Y, E, i), de = k(d, Y, E, i);
      O = W, D = M, W = b, M = y, b = te, y = G, te = h(X, Z, oe, se), G = k(Z, Z, oe, se), X = V, Z = P, V = Q, P = ce, Q = H, ce = ie, H = h(oe, se, he, de), ie = k(oe, se, he, de);
    }
    a(this.h, 0, H, ie), a(this.h, 2, Q, ce), a(this.h, 4, V, P), a(this.h, 6, X, Z), a(this.h, 8, te, G), a(this.h, 10, b, y), a(this.h, 12, W, M), a(this.h, 14, O, D);
  }, T.prototype._digest = function(v) {
    return v === "hex" ? t.toHex32(this.h, "big") : t.split32(this.h, "big");
  };
  function o(U, v, K, ee, H) {
    var ie = U & K ^ ~U & H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function g(U, v, K, ee, H, ie) {
    var Q = v & ee ^ ~v & ie;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function m(U, v, K, ee, H) {
    var ie = U & K ^ U & H ^ K & H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function c(U, v, K, ee, H, ie) {
    var Q = v & ee ^ v & ie ^ ee & ie;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function x(U, v) {
    var K = n(U, v, 28), ee = n(v, U, 2), H = n(v, U, 7), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function F(U, v) {
    var K = u(U, v, 28), ee = u(v, U, 2), H = u(v, U, 7), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function B(U, v) {
    var K = n(U, v, 14), ee = n(U, v, 18), H = n(v, U, 9), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function z(U, v) {
    var K = u(U, v, 14), ee = u(U, v, 18), H = u(v, U, 9), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function C(U, v) {
    var K = n(U, v, 1), ee = n(U, v, 8), H = l(U, v, 7), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function $(U, v) {
    var K = u(U, v, 1), ee = u(U, v, 8), H = f(U, v, 7), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function le(U, v) {
    var K = n(U, v, 19), ee = n(v, U, 29), H = l(U, v, 6), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function N(U, v) {
    var K = u(U, v, 19), ee = u(v, U, 29), H = f(U, v, 6), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  return Kn;
}
var Vn, bs;
function Vl() {
  if (bs) return Vn;
  bs = 1;
  var t = He(), e = ko();
  function r() {
    if (!(this instanceof r))
      return new r();
    e.call(this), this.h = [
      3418070365,
      3238371032,
      1654270250,
      914150663,
      2438529370,
      812702999,
      355462360,
      4144912697,
      1731405415,
      4290775857,
      2394180231,
      1750603025,
      3675008525,
      1694076839,
      1203062813,
      3204075428
    ];
  }
  return t.inherits(r, e), Vn = r, r.blockSize = 1024, r.outSize = 384, r.hmacStrength = 192, r.padLength = 128, r.prototype._digest = function(u) {
    return u === "hex" ? t.toHex32(this.h.slice(0, 12), "big") : t.split32(this.h.slice(0, 12), "big");
  }, Vn;
}
var _s;
function Xl() {
  return _s || (_s = 1, it.sha1 = Gl(), it.sha224 = Kl(), it.sha256 = Ao(), it.sha384 = Vl(), it.sha512 = ko()), it;
}
var Xn = {}, Es;
function $l() {
  if (Es) return Xn;
  Es = 1;
  var t = He(), e = Lt(), r = t.rotl32, n = t.sum32, u = t.sum32_3, l = t.sum32_4, f = e.BlockHash;
  function a() {
    if (!(this instanceof a))
      return new a();
    f.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
  }
  t.inherits(a, f), Xn.ripemd160 = a, a.blockSize = 512, a.outSize = 160, a.hmacStrength = 192, a.padLength = 64, a.prototype._update = function(T, o) {
    for (var g = this.h[0], m = this.h[1], c = this.h[2], x = this.h[3], F = this.h[4], B = g, z = m, C = c, $ = x, le = F, N = 0; N < 80; N++) {
      var U = n(
        r(
          l(g, h(N, m, c, x), T[R[N] + o], k(N)),
          _[N]
        ),
        F
      );
      g = F, F = x, x = r(c, 10), c = m, m = U, U = n(
        r(
          l(B, h(79 - N, z, C, $), T[I[N] + o], A(N)),
          S[N]
        ),
        le
      ), B = le, le = $, $ = r(C, 10), C = z, z = U;
    }
    U = u(this.h[1], c, $), this.h[1] = u(this.h[2], x, le), this.h[2] = u(this.h[3], F, B), this.h[3] = u(this.h[4], g, z), this.h[4] = u(this.h[0], m, C), this.h[0] = U;
  }, a.prototype._digest = function(T) {
    return T === "hex" ? t.toHex32(this.h, "little") : t.split32(this.h, "little");
  };
  function h(w, T, o, g) {
    return w <= 15 ? T ^ o ^ g : w <= 31 ? T & o | ~T & g : w <= 47 ? (T | ~o) ^ g : w <= 63 ? T & g | o & ~g : T ^ (o | ~g);
  }
  function k(w) {
    return w <= 15 ? 0 : w <= 31 ? 1518500249 : w <= 47 ? 1859775393 : w <= 63 ? 2400959708 : 2840853838;
  }
  function A(w) {
    return w <= 15 ? 1352829926 : w <= 31 ? 1548603684 : w <= 47 ? 1836072691 : w <= 63 ? 2053994217 : 0;
  }
  var R = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], I = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], _ = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], S = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ];
  return Xn;
}
var $n, xs;
function Zl() {
  if (xs) return $n;
  xs = 1;
  var t = He(), e = Bt();
  function r(n, u, l) {
    if (!(this instanceof r))
      return new r(n, u, l);
    this.Hash = n, this.blockSize = n.blockSize / 8, this.outSize = n.outSize / 8, this.inner = null, this.outer = null, this._init(t.toArray(u, l));
  }
  return $n = r, r.prototype._init = function(u) {
    u.length > this.blockSize && (u = new this.Hash().update(u).digest()), e(u.length <= this.blockSize);
    for (var l = u.length; l < this.blockSize; l++)
      u.push(0);
    for (l = 0; l < u.length; l++)
      u[l] ^= 54;
    for (this.inner = new this.Hash().update(u), l = 0; l < u.length; l++)
      u[l] ^= 106;
    this.outer = new this.Hash().update(u);
  }, r.prototype.update = function(u, l) {
    return this.inner.update(u, l), this;
  }, r.prototype.digest = function(u) {
    return this.outer.update(this.inner.digest()), this.outer.digest(u);
  }, $n;
}
var Ts;
function Yl() {
  return Ts || (Ts = 1, (function(t) {
    var e = t;
    e.utils = He(), e.common = Lt(), e.sha = Xl(), e.ripemd = $l(), e.hmac = Zl(), e.sha1 = e.sha.sha1, e.sha256 = e.sha.sha256, e.sha224 = e.sha.sha224, e.sha384 = e.sha.sha384, e.sha512 = e.sha.sha512, e.ripemd160 = e.ripemd.ripemd160;
  })(jn)), jn;
}
var Jl = Yl();
const Ql = /* @__PURE__ */ gi(Jl);
let ec = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", tc = (t, e = 21) => (r = e) => {
  let n = "", u = r | 0;
  for (; u--; )
    n += t[Math.random() * t.length | 0];
  return n;
}, rc = (t = 21) => {
  let e = "", r = t | 0;
  for (; r--; )
    e += ec[Math.random() * 64 | 0];
  return e;
};
const De = (t) => Math.floor(t * 72 * 20), lr = (t = 0) => {
  let e = t;
  return () => ++e;
}, nc = () => lr(), ic = () => lr(1), ac = () => lr(), sc = () => lr(), Ro = () => rc().toLowerCase(), Ss = (t) => Ql.sha1().update(t instanceof ArrayBuffer ? new Uint8Array(t) : t).digest("hex"), kt = (t) => tc("1234567890abcdef", t)(), oc = () => `${kt(8)}-${kt(4)}-${kt(4)}-${kt(4)}-${kt(12)}`, Zn = (t) => new Uint8Array(new TextEncoder().encode(t)), uc = {
  /**
   * ## Page Edge
   *
   * Specifies that the horizontal positioning shall be relative to the edge of the page.
   */
  PAGE: "page"
}, lc = {
  /**
   * ## Page Edge
   *
   * Specifies that the vertical positioning shall be relative to the edge of the page.
   */
  PAGE: "page"
}, cc = () => new fe({
  name: "wp:simplePos",
  // NOTE: It's not fully supported in Microsoft Word, but this element is needed anyway
  attributes: {
    x: { key: "x", value: 0 },
    y: { key: "y", value: 0 }
  }
}), Io = (t) => new fe({
  name: "wp:align",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: [t]
}), Co = (t) => new fe({
  name: "wp:posOffset",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: [t.toString()]
}), hc = ({ relative: t, align: e, offset: r }) => new fe({
  name: "wp:positionH",
  attributes: {
    relativeFrom: { key: "relativeFrom", value: t ?? uc.PAGE }
  },
  children: [
    (() => {
      if (e)
        return Io(e);
      if (r !== void 0)
        return Co(r);
      throw new Error("There is no configuration provided for floating position (Align or offset)");
    })()
  ]
}), fc = ({ relative: t, align: e, offset: r }) => new fe({
  name: "wp:positionV",
  attributes: {
    relativeFrom: { key: "relativeFrom", value: t ?? lc.PAGE }
  },
  children: [
    (() => {
      if (e)
        return Io(e);
      if (r !== void 0)
        return Co(r);
      throw new Error("There is no configuration provided for floating position (Align or offset)");
    })()
  ]
}), dc = (t = {}) => {
  var e, r, n, u;
  return new fe({
    name: "wps:bodyPr",
    attributes: {
      lIns: { key: "lIns", value: (e = t.margins) == null ? void 0 : e.left },
      rIns: { key: "rIns", value: (r = t.margins) == null ? void 0 : r.right },
      tIns: { key: "tIns", value: (n = t.margins) == null ? void 0 : n.top },
      bIns: { key: "bIns", value: (u = t.margins) == null ? void 0 : u.bottom },
      anchor: { key: "anchor", value: t.verticalAnchor }
    },
    children: [...t.noAutoFit ? [new ue("a:noAutofit", t.noAutoFit)] : []]
  });
}, pc = (t = { txBox: "1" }) => new fe({
  name: "wps:cNvSpPr",
  attributes: {
    txBox: { key: "txBox", value: t.txBox }
  }
}), mc = (t) => new fe({
  name: "w:txbxContent",
  children: [...t]
}), wc = (t) => new fe({
  name: "wps:txbx",
  children: [mc(t)]
});
class gc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
}
class yc extends ae {
  constructor(e, r) {
    super("a:ext"), re(this, "attributes"), this.attributes = new gc({
      cx: e,
      cy: r
    }), this.root.push(this.attributes);
  }
}
class vc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
}
class bc extends ae {
  constructor(e, r) {
    super("a:off"), this.root.push(
      new vc({
        x: e ?? 0,
        y: r ?? 0
      })
    );
  }
}
class _c extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
}
class No extends ae {
  constructor(e) {
    var r, n, u, l, f, a;
    super("a:xfrm"), re(this, "extents"), re(this, "offset"), this.root.push(
      new _c({
        flipVertical: (r = e.flip) == null ? void 0 : r.vertical,
        flipHorizontal: (n = e.flip) == null ? void 0 : n.horizontal,
        rotation: e.rotation
      })
    ), this.offset = new bc((l = (u = e.offset) == null ? void 0 : u.emus) == null ? void 0 : l.x, (a = (f = e.offset) == null ? void 0 : f.emus) == null ? void 0 : a.y), this.extents = new yc(e.emus.x, e.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}
const Oo = () => new fe({ name: "a:noFill" }), Ec = (t) => new fe({
  name: "a:srgbClr",
  attributes: {
    value: {
      key: "val",
      value: t.value
    }
  }
}), xc = (t) => new fe({
  name: "a:schemeClr",
  attributes: {
    value: {
      key: "val",
      value: t.value
    }
  }
}), pi = (t) => new fe({
  name: "a:solidFill",
  children: [t.type === "rgb" ? Ec(t) : xc(t)]
}), Tc = (t) => new fe({
  name: "a:ln",
  attributes: {
    width: {
      key: "w",
      value: t.width
    },
    cap: {
      key: "cap",
      value: t.cap
    },
    compoundLine: {
      key: "cmpd",
      value: t.compoundLine
    },
    align: {
      key: "algn",
      value: t.align
    }
  },
  children: [
    t.type === "noFill" ? Oo() : t.solidFillType === "rgb" ? pi({
      type: "rgb",
      value: t.value
    }) : pi({
      type: "scheme",
      value: t.value
    })
  ]
});
class Sc extends ae {
  constructor() {
    super("a:avLst");
  }
}
class Ac extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      prst: "prst"
    });
  }
}
class kc extends ae {
  constructor() {
    super("a:prstGeom"), this.root.push(
      new Ac({
        prst: "rect"
      })
    ), this.root.push(new Sc());
  }
}
class Rc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      bwMode: "bwMode"
    });
  }
}
class Po extends ae {
  constructor({
    element: e,
    outline: r,
    solidFill: n,
    transform: u
  }) {
    super(`${e}:spPr`), re(this, "form"), this.root.push(
      new Rc({
        bwMode: "auto"
      })
    ), this.form = new No(u), this.root.push(this.form), this.root.push(new kc()), r && (this.root.push(Oo()), this.root.push(Tc(r))), n && this.root.push(pi(n));
  }
}
const As = (t) => new fe({
  name: "wps:wsp",
  children: [
    pc(t.nonVisualProperties),
    new Po({
      element: "wps",
      transform: t.transformation,
      outline: t.outline,
      solidFill: t.solidFill
    }),
    wc(t.children),
    dc(t.bodyProperties)
  ]
});
class Yn extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      uri: "uri"
    });
  }
}
const Ic = (t) => new fe({
  name: "asvg:svgBlip",
  attributes: {
    asvg: {
      key: "xmlns:asvg",
      value: "http://schemas.microsoft.com/office/drawing/2016/SVG/main"
    },
    embed: {
      key: "r:embed",
      value: `rId{${t.fileName}}`
    }
  }
}), Cc = (t) => new fe({
  name: "a:ext",
  attributes: {
    uri: {
      key: "uri",
      value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
    }
  },
  children: [Ic(t)]
}), Nc = (t) => new fe({
  name: "a:extLst",
  children: [Cc(t)]
}), Oc = (t) => new fe({
  name: "a:blip",
  attributes: {
    embed: {
      key: "r:embed",
      value: `rId{${t.type === "svg" ? t.fallback.fileName : t.fileName}}`
    },
    cstate: {
      key: "cstate",
      value: "none"
    }
  },
  children: t.type === "svg" ? [Nc(t)] : []
});
class Pc extends ae {
  constructor() {
    super("a:srcRect");
  }
}
class Fc extends ae {
  constructor() {
    super("a:fillRect");
  }
}
class Dc extends ae {
  constructor() {
    super("a:stretch"), this.root.push(new Fc());
  }
}
class Bc extends ae {
  constructor(e) {
    super("pic:blipFill"), this.root.push(Oc(e)), this.root.push(new Pc()), this.root.push(new Dc());
  }
}
class Lc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
}
class Mc extends ae {
  constructor() {
    super("a:picLocks"), this.root.push(
      new Lc({
        noChangeAspect: 1,
        noChangeArrowheads: 1
      })
    );
  }
}
class Uc extends ae {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new Mc());
  }
}
const Fo = (t, e) => new fe({
  name: "a:hlinkClick",
  attributes: Ae(me({}, e ? {
    xmlns: {
      key: "xmlns:a",
      value: "http://schemas.openxmlformats.org/drawingml/2006/main"
    }
  } : {}), {
    id: {
      key: "r:id",
      value: `rId${t}`
    }
  })
});
class jc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
}
class zc extends ae {
  constructor() {
    super("pic:cNvPr"), this.root.push(
      new jc({
        id: 0,
        name: "",
        descr: ""
      })
    );
  }
  prepForXml(e) {
    for (let r = e.stack.length - 1; r >= 0; r--) {
      const n = e.stack[r];
      if (n instanceof cr) {
        this.root.push(Fo(n.linkId, !1));
        break;
      }
    }
    return super.prepForXml(e);
  }
}
class Wc extends ae {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new zc()), this.root.push(new Uc());
  }
}
class Hc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns:pic"
    });
  }
}
class ks extends ae {
  constructor({
    mediaData: e,
    transform: r,
    outline: n
  }) {
    super("pic:pic"), this.root.push(
      new Hc({
        xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture"
      })
    ), this.root.push(new Wc()), this.root.push(new Bc(e)), this.root.push(new Po({ element: "pic", transform: r, outline: n }));
  }
}
const qc = (t) => new fe({
  name: "wpg:grpSpPr",
  children: [new No(t)]
}), Gc = () => new fe({
  name: "wpg:cNvGrpSpPr"
}), Kc = (t) => new fe({
  name: "wpg:wgp",
  children: [Gc(), qc(t.transformation), ...t.children]
});
class Vc extends ae {
  // private readonly pic: Pic;
  constructor({
    mediaData: e,
    transform: r,
    outline: n,
    solidFill: u
  }) {
    if (super("a:graphicData"), e.type === "wps") {
      this.root.push(
        new Yn({
          uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
        })
      );
      const l = As(Ae(me({}, e.data), { transformation: r, outline: n, solidFill: u }));
      this.root.push(l);
    } else if (e.type === "wpg") {
      this.root.push(
        new Yn({
          uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
        })
      );
      const f = e.children.map((h) => h.type === "wps" ? As(Ae(me({}, h.data), {
        transformation: h.transformation,
        outline: h.outline,
        solidFill: h.solidFill
      })) : new ks({ mediaData: h, transform: h.transformation, outline: h.outline })), a = Kc({ children: f, transformation: r });
      this.root.push(a);
    } else {
      this.root.push(
        new Yn({
          uri: "http://schemas.openxmlformats.org/drawingml/2006/picture"
        })
      );
      const l = e, f = new ks({ mediaData: l, transform: r, outline: n });
      this.root.push(f);
    }
  }
}
class Xc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      a: "xmlns:a"
    });
  }
}
class Do extends ae {
  constructor({
    mediaData: e,
    transform: r,
    outline: n,
    solidFill: u
  }) {
    super("a:graphic"), re(this, "data"), this.root.push(
      new Xc({
        a: "http://schemas.openxmlformats.org/drawingml/2006/main"
      })
    ), this.data = new Vc({ mediaData: e, transform: r, outline: n, solidFill: u }), this.root.push(this.data);
  }
}
const Kt = {
  NONE: 0,
  SQUARE: 1,
  TIGHT: 2,
  TOP_AND_BOTTOM: 3
}, $c = {
  /** Text wraps on both sides of the drawing */
  BOTH_SIDES: "bothSides"
}, Rs = () => new fe({
  name: "wp:wrapNone"
}), Zc = (t, e = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new fe({
  name: "wp:wrapSquare",
  attributes: {
    wrapText: { key: "wrapText", value: t.side || $c.BOTH_SIDES },
    distT: { key: "distT", value: e.top },
    distB: { key: "distB", value: e.bottom },
    distL: { key: "distL", value: e.left },
    distR: { key: "distR", value: e.right }
  }
}), Yc = (t = {
  top: 0,
  bottom: 0
}) => new fe({
  name: "wp:wrapTight",
  attributes: {
    distT: { key: "distT", value: t.top },
    distB: { key: "distB", value: t.bottom }
  }
}), Jc = (t = {
  top: 0,
  bottom: 0
}) => new fe({
  name: "wp:wrapTopAndBottom",
  attributes: {
    distT: { key: "distT", value: t.top },
    distB: { key: "distB", value: t.bottom }
  }
});
class Bo extends ae {
  constructor({ name: e, description: r, title: n, id: u } = { name: "", description: "", title: "" }) {
    super("wp:docPr"), re(this, "docPropertiesUniqueNumericId", ac());
    const l = {
      id: {
        key: "id",
        value: u ?? this.docPropertiesUniqueNumericId()
      },
      name: {
        key: "name",
        value: e
      }
    };
    r != null && (l.description = {
      key: "descr",
      value: r
    }), n != null && (l.title = {
      key: "title",
      value: n
    }), this.root.push(new Gs(l));
  }
  prepForXml(e) {
    for (let r = e.stack.length - 1; r >= 0; r--) {
      const n = e.stack[r];
      if (n instanceof cr) {
        this.root.push(Fo(n.linkId, !0));
        break;
      }
    }
    return super.prepForXml(e);
  }
}
const Lo = ({ top: t, right: e, bottom: r, left: n }) => new fe({
  name: "wp:effectExtent",
  attributes: {
    top: {
      key: "t",
      value: t
    },
    right: {
      key: "r",
      value: e
    },
    bottom: {
      key: "b",
      value: r
    },
    left: {
      key: "l",
      value: n
    }
  }
}), Mo = ({ x: t, y: e }) => new fe({
  name: "wp:extent",
  attributes: {
    x: { key: "cx", value: t },
    y: { key: "cy", value: e }
  }
});
class Qc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
}
class eh extends ae {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(
      new Qc({
        xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
        noChangeAspect: 1
      })
    );
  }
}
const Uo = () => new fe({
  name: "wp:cNvGraphicFramePr",
  children: [new eh()]
});
class th extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      distT: "distT",
      distB: "distB",
      distL: "distL",
      distR: "distR",
      allowOverlap: "allowOverlap",
      behindDoc: "behindDoc",
      layoutInCell: "layoutInCell",
      locked: "locked",
      relativeHeight: "relativeHeight",
      simplePos: "simplePos"
    });
  }
}
class rh extends ae {
  constructor({
    mediaData: e,
    transform: r,
    drawingOptions: n
  }) {
    super("wp:anchor");
    const u = me({
      allowOverlap: !0,
      behindDocument: !1,
      lockAnchor: !1,
      layoutInCell: !0,
      verticalPosition: {},
      horizontalPosition: {}
    }, n.floating);
    if (this.root.push(
      new th({
        distT: u.margins && u.margins.top || 0,
        distB: u.margins && u.margins.bottom || 0,
        distL: u.margins && u.margins.left || 0,
        distR: u.margins && u.margins.right || 0,
        simplePos: "0",
        // note: word doesn't fully support - so we use 0
        allowOverlap: u.allowOverlap === !0 ? "1" : "0",
        behindDoc: u.behindDocument === !0 ? "1" : "0",
        locked: u.lockAnchor === !0 ? "1" : "0",
        layoutInCell: u.layoutInCell === !0 ? "1" : "0",
        relativeHeight: u.zIndex ? u.zIndex : r.emus.y
      })
    ), this.root.push(cc()), this.root.push(hc(u.horizontalPosition)), this.root.push(fc(u.verticalPosition)), this.root.push(Mo({ x: r.emus.x, y: r.emus.y })), this.root.push(Lo({ top: 0, right: 0, bottom: 0, left: 0 })), n.floating !== void 0 && n.floating.wrap !== void 0)
      switch (n.floating.wrap.type) {
        case Kt.SQUARE:
          this.root.push(Zc(n.floating.wrap, n.floating.margins));
          break;
        case Kt.TIGHT:
          this.root.push(Yc(n.floating.margins));
          break;
        case Kt.TOP_AND_BOTTOM:
          this.root.push(Jc(n.floating.margins));
          break;
        case Kt.NONE:
        default:
          this.root.push(Rs());
      }
    else
      this.root.push(Rs());
    this.root.push(new Bo(n.docProperties)), this.root.push(Uo()), this.root.push(new Do({ mediaData: e, transform: r, outline: n.outline, solidFill: n.solidFill }));
  }
}
const nh = ({ mediaData: t, transform: e, docProperties: r, outline: n, solidFill: u }) => {
  var l, f, a, h;
  return new fe({
    name: "wp:inline",
    attributes: {
      distanceTop: {
        key: "distT",
        value: 0
      },
      distanceBottom: {
        key: "distB",
        value: 0
      },
      distanceLeft: {
        key: "distL",
        value: 0
      },
      distanceRight: {
        key: "distR",
        value: 0
      }
    },
    children: [
      Mo({ x: e.emus.x, y: e.emus.y }),
      Lo(
        n ? {
          top: ((l = n.width) != null ? l : 9525) * 2,
          right: ((f = n.width) != null ? f : 9525) * 2,
          bottom: ((a = n.width) != null ? a : 9525) * 2,
          left: ((h = n.width) != null ? h : 9525) * 2
        } : { top: 0, right: 0, bottom: 0, left: 0 }
      ),
      new Bo(r),
      Uo(),
      new Do({ mediaData: t, transform: e, outline: n, solidFill: u })
    ]
  });
};
class ih extends ae {
  constructor(e, r = {}) {
    super("w:drawing"), r.floating ? this.root.push(new rh({ mediaData: e, transform: e.transformation, drawingOptions: r })) : this.root.push(
      nh({
        mediaData: e,
        transform: e.transformation,
        docProperties: r.docProperties,
        outline: r.outline,
        solidFill: r.solidFill
      })
    );
  }
}
const ah = (t) => {
  const e = ";base64,", r = t.indexOf(e), n = r === -1 ? 0 : r + e.length;
  return new Uint8Array(
    atob(t.substring(n)).split("").map((u) => u.charCodeAt(0))
  );
}, sh = (t) => typeof t == "string" ? ah(t) : t, Jn = (t, e) => ({
  data: sh(t.data),
  fileName: e,
  transformation: {
    pixels: {
      x: Math.round(t.transformation.width),
      y: Math.round(t.transformation.height)
    },
    emus: {
      x: Math.round(t.transformation.width * 9525),
      y: Math.round(t.transformation.height * 9525)
    },
    flip: t.transformation.flip,
    rotation: t.transformation.rotation ? t.transformation.rotation * 6e4 : void 0
  }
});
class oh extends We {
  constructor(e) {
    super({}), re(this, "imageData");
    const n = `${Ss(e.data)}.${e.type}`;
    this.imageData = e.type === "svg" ? Ae(me({
      type: e.type
    }, Jn(e, n)), {
      fallback: me({
        type: e.fallback.type
      }, Jn(
        Ae(me({}, e.fallback), {
          transformation: e.transformation
        }),
        `${Ss(e.fallback.data)}.${e.fallback.type}`
      ))
    }) : me({
      type: e.type
    }, Jn(e, n));
    const u = new ih(this.imageData, {
      floating: e.floating,
      docProperties: e.altText,
      outline: e.outline
    });
    this.root.push(u);
  }
  prepForXml(e) {
    return e.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && e.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(e);
  }
}
class uh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns"
    });
  }
}
const lh = {
  /** Target is external to the package (e.g., hyperlink to a URL) */
  EXTERNAL: "External"
}, ch = (t, e, r, n) => new fe({
  name: "Relationship",
  attributes: {
    id: { key: "Id", value: t },
    type: { key: "Type", value: e },
    target: { key: "Target", value: r },
    targetMode: { key: "TargetMode", value: n }
  }
});
class tt extends ae {
  constructor() {
    super("Relationships"), this.root.push(
      new uh({
        xmlns: "http://schemas.openxmlformats.org/package/2006/relationships"
      })
    );
  }
  /**
   * Creates a new relationship to another part in the package.
   *
   * @param id - Unique identifier for this relationship (will be prefixed with "rId")
   * @param type - Relationship type URI (e.g., image, header, hyperlink)
   * @param target - Path to the target part
   * @param targetMode - Optional mode indicating if target is external
   */
  addRelationship(e, r, n, u) {
    this.root.push(ch(`rId${e}`, r, n, u));
  }
  /**
   * Gets the count of relationships in this collection.
   * Excludes the attributes element from the count.
   */
  get RelationshipCount() {
    return this.root.length - 1;
  }
}
class hh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { id: "w:id", initials: "w:initials", author: "w:author", date: "w:date" });
  }
}
class fh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      "xmlns:cx": "xmlns:cx",
      "xmlns:cx1": "xmlns:cx1",
      "xmlns:cx2": "xmlns:cx2",
      "xmlns:cx3": "xmlns:cx3",
      "xmlns:cx4": "xmlns:cx4",
      "xmlns:cx5": "xmlns:cx5",
      "xmlns:cx6": "xmlns:cx6",
      "xmlns:cx7": "xmlns:cx7",
      "xmlns:cx8": "xmlns:cx8",
      "xmlns:mc": "xmlns:mc",
      "xmlns:aink": "xmlns:aink",
      "xmlns:am3d": "xmlns:am3d",
      "xmlns:o": "xmlns:o",
      "xmlns:r": "xmlns:r",
      "xmlns:m": "xmlns:m",
      "xmlns:v": "xmlns:v",
      "xmlns:wp14": "xmlns:wp14",
      "xmlns:wp": "xmlns:wp",
      "xmlns:w10": "xmlns:w10",
      "xmlns:w": "xmlns:w",
      "xmlns:w14": "xmlns:w14",
      "xmlns:w15": "xmlns:w15",
      "xmlns:w16cex": "xmlns:w16cex",
      "xmlns:w16cid": "xmlns:w16cid",
      "xmlns:w16": "xmlns:w16",
      "xmlns:w16sdtdh": "xmlns:w16sdtdh",
      "xmlns:w16se": "xmlns:w16se",
      "xmlns:wpg": "xmlns:wpg",
      "xmlns:wpi": "xmlns:wpi",
      "xmlns:wne": "xmlns:wne",
      "xmlns:wps": "xmlns:wps"
    });
  }
}
class dh extends ae {
  constructor({ id: e, initials: r, author: n, date: u = /* @__PURE__ */ new Date(), children: l }) {
    super("w:comment"), this.root.push(
      new hh({
        id: e,
        initials: r,
        author: n,
        date: u.toISOString()
      })
    );
    for (const f of l)
      this.root.push(f);
  }
}
class ph extends ae {
  constructor({ children: e }) {
    super("w:comments"), re(this, "relationships"), this.root.push(
      new fh({
        "xmlns:cx": "http://schemas.microsoft.com/office/drawing/2014/chartex",
        "xmlns:cx1": "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
        "xmlns:cx2": "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
        "xmlns:cx3": "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
        "xmlns:cx4": "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
        "xmlns:cx5": "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
        "xmlns:cx6": "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
        "xmlns:cx7": "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
        "xmlns:cx8": "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
        "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
        "xmlns:aink": "http://schemas.microsoft.com/office/drawing/2016/ink",
        "xmlns:am3d": "http://schemas.microsoft.com/office/drawing/2017/model3d",
        "xmlns:o": "urn:schemas-microsoft-com:office:office",
        "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        "xmlns:m": "http://schemas.openxmlformats.org/officeDocument/2006/math",
        "xmlns:v": "urn:schemas-microsoft-com:vml",
        "xmlns:wp14": "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        "xmlns:wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        "xmlns:w10": "urn:schemas-microsoft-com:office:word",
        "xmlns:w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        "xmlns:w14": "http://schemas.microsoft.com/office/word/2010/wordml",
        "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
        "xmlns:w16cex": "http://schemas.microsoft.com/office/word/2018/wordml/cex",
        "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
        "xmlns:w16": "http://schemas.microsoft.com/office/word/2018/wordml",
        "xmlns:w16sdtdh": "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
        "xmlns:w16se": "http://schemas.microsoft.com/office/word/2015/wordml/symex",
        "xmlns:wpg": "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        "xmlns:wpi": "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        "xmlns:wne": "http://schemas.microsoft.com/office/word/2006/wordml",
        "xmlns:wps": "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
      })
    );
    for (const r of e)
      this.root.push(new dh(r));
    this.relationships = new tt();
  }
  get Relationships() {
    return this.relationships;
  }
}
class mh extends _o {
  constructor() {
    super("w:endnoteRef");
  }
}
class wh extends _o {
  constructor() {
    super("w:tab");
  }
}
const Jt = {
  /** Left-aligned tab */
  LEFT: "left",
  /** Center-aligned tab */
  CENTER: "center",
  /** Right-aligned tab */
  RIGHT: "right"
}, mi = {
  /** Position relative to margin */
  MARGIN: "margin",
  /** Position relative to indent */
  INDENT: "indent"
}, st = {
  /** No leader character */
  NONE: "none",
  /** Dot leader (...) */
  DOT: "dot",
  /** Hyphen leader (---) */
  HYPHEN: "hyphen",
  /** Underscore leader (___) */
  UNDERSCORE: "underscore",
  /** Middle dot leader (···) */
  MIDDLE_DOT: "middleDot"
};
class gh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      alignment: "w:alignment",
      relativeTo: "w:relativeTo",
      leader: "w:leader"
    });
  }
}
class yh extends ae {
  constructor(e) {
    super("w:ptab"), this.root.push(
      new gh({
        alignment: e.alignment,
        relativeTo: e.relativeTo,
        leader: e.leader
      })
    );
  }
}
class vh extends ae {
  constructor() {
    super("w:pageBreakBefore");
  }
}
const bt = {
  /** Line spacing is automatically determined based on content */
  AUTO: "auto"
}, bh = ({ after: t, before: e, line: r, lineRule: n, beforeAutoSpacing: u, afterAutoSpacing: l }) => new fe({
  name: "w:spacing",
  attributes: {
    after: { key: "w:after", value: t },
    before: { key: "w:before", value: e },
    line: { key: "w:line", value: r },
    lineRule: { key: "w:lineRule", value: n },
    beforeAutoSpacing: { key: "w:beforeAutospacing", value: u },
    afterAutoSpacing: { key: "w:afterAutospacing", value: l }
  }
}), ft = {
  /** Heading 1 style */
  HEADING_1: "Heading1",
  /** Heading 2 style */
  HEADING_2: "Heading2",
  /** Heading 3 style */
  HEADING_3: "Heading3",
  /** Heading 4 style */
  HEADING_4: "Heading4",
  /** Heading 5 style */
  HEADING_5: "Heading5",
  /** Heading 6 style */
  HEADING_6: "Heading6"
}, Vt = (t) => new fe({
  name: "w:pStyle",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), Is = {
  /** Left-aligned tab stop */
  LEFT: "left",
  /** Right-aligned tab stop */
  RIGHT: "right"
}, _h = ({ type: t, position: e, leader: r }) => new fe({
  name: "w:tab",
  attributes: {
    val: { key: "w:val", value: t },
    pos: { key: "w:pos", value: e },
    leader: { key: "w:leader", value: r }
  }
}), Eh = (t) => new fe({
  name: "w:tabs",
  children: t.map((e) => _h(e))
});
class Qn extends ae {
  constructor(e, r) {
    super("w:numPr"), this.root.push(new xh(r)), this.root.push(new Th(e));
  }
}
class xh extends ae {
  constructor(e) {
    if (super("w:ilvl"), e > 9)
      throw new Error(
        "Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7"
      );
    this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class Th extends ae {
  constructor(e) {
    super("w:numId"), this.root.push(
      new Re({
        val: typeof e == "string" ? `{${e}}` : e
      })
    );
  }
}
class Ni extends ae {
  constructor() {
    super(...arguments), re(this, "fileChild", /* @__PURE__ */ Symbol());
  }
}
class Sh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}
class cr extends ae {
  constructor(e, r, n) {
    super("w:hyperlink"), re(this, "linkId"), this.linkId = r;
    const u = {
      history: 1,
      anchor: n || void 0,
      id: n ? void 0 : `rId${this.linkId}`
    }, l = new Sh(u);
    this.root.push(l), e.forEach((f) => {
      this.root.push(f);
    });
  }
}
class jo extends cr {
  constructor(e) {
    super(e.children, Ro(), e.anchor);
  }
}
class zo extends ae {
  constructor(e) {
    super("w:externalHyperlink"), this.options = e;
  }
}
class Ah extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
}
class kh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "w:id"
    });
  }
}
class Wo {
  constructor(e) {
    re(this, "bookmarkUniqueNumericId", sc()), re(this, "start"), re(this, "children"), re(this, "end");
    const r = this.bookmarkUniqueNumericId();
    this.start = new Rh(e.id, r), this.children = e.children, this.end = new Ih(r);
  }
}
class Rh extends ae {
  constructor(e, r) {
    super("w:bookmarkStart");
    const n = new Ah({
      name: e,
      id: r
    });
    this.root.push(n);
  }
}
class Ih extends ae {
  constructor(e) {
    super("w:bookmarkEnd");
    const r = new kh({
      id: e
    });
    this.root.push(r);
  }
}
const Ch = (t) => new fe({
  name: "w:outlineLvl",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), Xt = ({ id: t, fontKey: e, subsetted: r }, n) => new fe({
  name: n,
  attributes: me({
    id: { key: "r:id", value: t }
  }, e ? { fontKey: { key: "w:fontKey", value: `{${e}}` } } : {}),
  children: [...r ? [new ue("w:subsetted", r)] : []]
}), Nh = ({
  name: t,
  altName: e,
  panose1: r,
  charset: n,
  family: u,
  notTrueType: l,
  pitch: f,
  sig: a,
  embedRegular: h,
  embedBold: k,
  embedItalic: A,
  embedBoldItalic: R
}) => new fe({
  name: "w:font",
  attributes: {
    name: { key: "w:name", value: t }
  },
  children: [
    // http://www.datypic.com/sc/ooxml/e-w_altName-1.html
    ...e ? [At("w:altName", e)] : [],
    // http://www.datypic.com/sc/ooxml/e-w_panose1-1.html
    ...r ? [At("w:panose1", r)] : [],
    // http://www.datypic.com/sc/ooxml/e-w_charset-1.html
    ...n ? [At("w:charset", n)] : [],
    At("w:family", u),
    // http://www.datypic.com/sc/ooxml/e-w_notTrueType-1.html
    ...l ? [new ue("w:notTrueType", l)] : [],
    At("w:pitch", f),
    // http://www.datypic.com/sc/ooxml/e-w_sig-1.html
    ...a ? [
      new fe({
        name: "w:sig",
        attributes: {
          usb0: { key: "w:usb0", value: a.usb0 },
          usb1: { key: "w:usb1", value: a.usb1 },
          usb2: { key: "w:usb2", value: a.usb2 },
          usb3: { key: "w:usb3", value: a.usb3 },
          csb0: { key: "w:csb0", value: a.csb0 },
          csb1: { key: "w:csb1", value: a.csb1 }
        }
      })
    ] : [],
    // http://www.datypic.com/sc/ooxml/e-w_embedRegular-1.html
    ...h ? [Xt(h, "w:embedRegular")] : [],
    // http://www.datypic.com/sc/ooxml/e-w_embedBold-1.html
    ...k ? [Xt(k, "w:embedBold")] : [],
    // http://www.datypic.com/sc/ooxml/e-w_embedItalic-1.html
    ...A ? [Xt(A, "w:embedItalic")] : [],
    // http://www.datypic.com/sc/ooxml/e-w_embedBoldItalic-1.html
    ...R ? [Xt(R, "w:embedBoldItalic")] : []
  ]
}), Oh = ({
  name: t,
  index: e,
  fontKey: r,
  characterSet: n
}) => Nh({
  name: t,
  sig: {
    usb0: "E0002AFF",
    usb1: "C000247B",
    usb2: "00000009",
    usb3: "00000000",
    csb0: "000001FF",
    csb1: "00000000"
  },
  charset: n,
  family: "auto",
  pitch: "variable",
  embedRegular: {
    fontKey: r,
    id: `rId${e}`
  }
}), Ph = (t) => (
  // https://c-rex.net/projects/samples/ooxml/e1/Part4/OOXML_P4_DOCX_Font_topic_ID0ERNCU.html
  // http://www.datypic.com/sc/ooxml/e-w_fonts.html
  new fe({
    name: "w:fonts",
    attributes: {
      mc: { key: "xmlns:mc", value: "http://schemas.openxmlformats.org/markup-compatibility/2006" },
      r: { key: "xmlns:r", value: "http://schemas.openxmlformats.org/officeDocument/2006/relationships" },
      w: { key: "xmlns:w", value: "http://schemas.openxmlformats.org/wordprocessingml/2006/main" },
      w14: { key: "xmlns:w14", value: "http://schemas.microsoft.com/office/word/2010/wordml" },
      w15: { key: "xmlns:w15", value: "http://schemas.microsoft.com/office/word/2012/wordml" },
      w16cex: { key: "xmlns:w16cex", value: "http://schemas.microsoft.com/office/word/2018/wordml/cex" },
      w16cid: { key: "xmlns:w16cid", value: "http://schemas.microsoft.com/office/word/2016/wordml/cid" },
      w16: { key: "xmlns:w16", value: "http://schemas.microsoft.com/office/word/2018/wordml" },
      w16sdtdh: { key: "xmlns:w16sdtdh", value: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" },
      w16se: { key: "xmlns:w16se", value: "http://schemas.microsoft.com/office/word/2015/wordml/symex" },
      Ignorable: { key: "mc:Ignorable", value: "w14 w15 w16se w16cid w16 w16cex w16sdtdh" }
    },
    children: t.map(
      (e, r) => Oh({
        name: e.name,
        index: r + 1,
        fontKey: e.fontKey,
        characterSet: e.characterSet
      })
    )
  })
);
class Ho {
  constructor(e) {
    re(this, "fontTable"), re(this, "relationships"), re(this, "fontOptionsWithKey", []), this.options = e, this.fontOptionsWithKey = e.map((r) => Ae(me({}, r), { fontKey: oc() })), this.fontTable = Ph(this.fontOptionsWithKey), this.relationships = new tt();
    for (let r = 0; r < e.length; r++)
      this.relationships.addRelationship(
        r + 1,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font",
        `fonts/${e[r].name}.odttf`
      );
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}
const Fh = () => new fe({
  name: "w:wordWrap",
  attributes: {
    val: { key: "w:val", value: 0 }
  }
}), Dh = (t) => {
  var e, r;
  return new fe({
    name: "w:framePr",
    attributes: {
      anchorLock: {
        key: "w:anchorLock",
        value: t.anchorLock
      },
      dropCap: {
        key: "w:dropCap",
        value: t.dropCap
      },
      width: {
        key: "w:w",
        value: t.width
      },
      height: {
        key: "w:h",
        value: t.height
      },
      x: {
        key: "w:x",
        value: t.position ? t.position.x : void 0
      },
      y: {
        key: "w:y",
        value: t.position ? t.position.y : void 0
      },
      anchorHorizontal: {
        key: "w:hAnchor",
        value: t.anchor.horizontal
      },
      anchorVertical: {
        key: "w:vAnchor",
        value: t.anchor.vertical
      },
      spaceHorizontal: {
        key: "w:hSpace",
        value: (e = t.space) == null ? void 0 : e.horizontal
      },
      spaceVertical: {
        key: "w:vSpace",
        value: (r = t.space) == null ? void 0 : r.vertical
      },
      rule: {
        key: "w:hRule",
        value: t.rule
      },
      alignmentX: {
        key: "w:xAlign",
        value: t.alignment ? t.alignment.x : void 0
      },
      alignmentY: {
        key: "w:yAlign",
        value: t.alignment ? t.alignment.y : void 0
      },
      lines: {
        key: "w:lines",
        value: t.lines
      },
      wrap: {
        key: "w:wrap",
        value: t.wrap
      }
    }
  });
};
class ct extends Qe {
  constructor(e) {
    var r, n;
    if (super("w:pPr", e?.includeIfEmpty), re(this, "numberingReferences", []), !e)
      return this;
    e.heading && this.push(Vt(e.heading)), e.bullet && this.push(Vt("ListParagraph")), e.numbering && !e.style && !e.heading && (e.numbering.custom || this.push(Vt("ListParagraph"))), e.style && this.push(Vt(e.style)), e.keepNext !== void 0 && this.push(new ue("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new ue("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new vh()), e.frame && this.push(Dh(e.frame)), e.widowControl !== void 0 && this.push(new ue("w:widowControl", e.widowControl)), e.bullet && this.push(new Qn(1, e.bullet.level)), e.numbering ? (this.numberingReferences.push({
      reference: e.numbering.reference,
      instance: (r = e.numbering.instance) != null ? r : 0
    }), this.push(new Qn(`${e.numbering.reference}-${(n = e.numbering.instance) != null ? n : 0}`, e.numbering.level))) : e.numbering === !1 && this.push(new Qn(0, 0)), e.border && this.push(new El(e.border)), e.thematicBreak && this.push(new xl()), e.shading && this.push(ur(e.shading)), e.wordWrap && this.push(Fh()), e.overflowPunctuation && this.push(new ue("w:overflowPunct", e.overflowPunctuation));
    const u = [
      ...e.rightTabStop !== void 0 ? [{ type: Is.RIGHT, position: e.rightTabStop }] : [],
      ...e.tabStops ? e.tabStops : [],
      ...e.leftTabStop !== void 0 ? [{ type: Is.LEFT, position: e.leftTabStop }] : []
    ];
    u.length > 0 && this.push(Eh(u)), e.bidirectional !== void 0 && this.push(new ue("w:bidi", e.bidirectional)), e.spacing && this.push(bh(e.spacing)), e.indent && this.push(Tl(e.indent)), e.contextualSpacing !== void 0 && this.push(new ue("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(Eo(e.alignment)), e.outlineLevel !== void 0 && this.push(Ch(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new ue("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new ue("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new Hl(e.run)), e.revision && this.push(new Bh(e.revision));
  }
  /**
   * Adds a property element to the paragraph properties.
   *
   * @param item - The XML component to add to the paragraph properties
   */
  push(e) {
    this.root.push(e);
  }
  /**
   * Prepares the paragraph properties for XML serialization.
   *
   * This method creates concrete numbering instances for any numbering references
   * before the properties are converted to XML.
   *
   * @param context - The XML context containing document and file information
   * @returns The prepared XML object, or undefined if the component should be ignored
   */
  prepForXml(e) {
    if (!(e.viewWrapper instanceof Ho))
      for (const r of this.numberingReferences)
        e.file.Numbering.createConcreteNumberingInstance(r.reference, r.instance);
    return super.prepForXml(e);
  }
}
class Bh extends ae {
  constructor(e) {
    super("w:pPrChange"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.root.push(new ct(Ae(me({}, e), { includeIfEmpty: !0 })));
  }
}
class xe extends Ni {
  constructor(e) {
    if (super("w:p"), re(this, "properties"), typeof e == "string")
      return this.properties = new ct({}), this.root.push(this.properties), this.root.push(new Ne(e)), this;
    if (this.properties = new ct(e), this.root.push(this.properties), e.text && this.root.push(new Ne(e.text)), e.children)
      for (const r of e.children) {
        if (r instanceof Wo) {
          this.root.push(r.start);
          for (const n of r.children)
            this.root.push(n);
          this.root.push(r.end);
          continue;
        }
        this.root.push(r);
      }
  }
  prepForXml(e) {
    for (const r of this.root)
      if (r instanceof zo) {
        const n = this.root.indexOf(r), u = new cr(r.options.children, Ro());
        e.viewWrapper.Relationships.addRelationship(
          u.linkId,
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
          r.options.link,
          lh.EXTERNAL
        ), this.root[n] = u;
      }
    return super.prepForXml(e);
  }
  addRunToFront(e) {
    return this.root.splice(1, 0, e), this;
  }
}
const Lh = (t) => new fe({
  name: "w:gridCol",
  attributes: t !== void 0 ? {
    width: { key: "w:w", value: Se(t) }
  } : void 0
});
class qo extends ae {
  constructor(e, r) {
    super("w:tblGrid");
    for (const n of e)
      this.root.push(Lh(n));
    r && this.root.push(new Uh(r));
  }
}
class Mh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { id: "w:id" });
  }
}
class Uh extends ae {
  constructor(e) {
    super("w:tblGridChange"), this.root.push(
      new Mh({
        id: e.id
      })
    ), this.root.push(new qo(e.columnWidths));
  }
}
class jh extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
class zh extends ae {
  constructor(e) {
    super("w:del"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
class Wh extends ae {
  constructor(e) {
    super("w:cellIns"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
class Hh extends ae {
  constructor(e) {
    super("w:cellDel"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
class qh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date",
      verticalMerge: "w:vMerge",
      verticalMergeOriginal: "w:vMergeOrig"
    });
  }
}
class Gh extends ae {
  constructor(e) {
    super("w:cellMerge"), this.root.push(new qh(e));
  }
}
const Kh = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
};
Ae(me({}, Kh), {
  BOTH: "both"
});
const Go = (t) => new fe({
  name: "w:vAlign",
  attributes: {
    verticalAlign: { key: "w:val", value: t }
  }
}), Ko = ({
  marginUnitType: t = je.DXA,
  top: e,
  left: r,
  bottom: n,
  right: u
}) => [
  { name: "w:top", size: e },
  { name: "w:left", size: r },
  { name: "w:bottom", size: n },
  { name: "w:right", size: u }
].filter((l) => l.size !== void 0).map(({ name: l, size: f }) => nr(l, { type: t, size: f })), Vh = (t) => {
  const e = Ko(t);
  if (e.length !== 0)
    return new fe({
      name: "w:tblCellMar",
      children: e
    });
}, Xh = (t) => {
  const e = Ko(t);
  if (e.length !== 0)
    return new fe({
      name: "w:tcMar",
      children: e
    });
}, je = {
  /** Auto. */
  AUTO: "auto",
  /** Value is in twentieths of a point */
  DXA: "dxa",
  /** No (empty) value. */
  NIL: "nil",
  /** Value is in percentage. */
  PERCENTAGE: "pct"
}, nr = (t, { type: e = je.AUTO, size: r }) => {
  let n = r;
  return e === je.PERCENTAGE && typeof r == "number" && (n = `${r}%`), new fe({
    name: t,
    attributes: {
      type: { key: "w:type", value: e },
      size: { key: "w:w", value: bo(n) }
    }
  });
};
class $h extends Qe {
  constructor(e) {
    super("w:tcBorders"), e.top && this.root.push(be("w:top", e.top)), e.start && this.root.push(be("w:start", e.start)), e.left && this.root.push(be("w:left", e.left)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.end && this.root.push(be("w:end", e.end)), e.right && this.root.push(be("w:right", e.right));
  }
}
class Zh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class Yh extends ae {
  constructor(e) {
    super("w:gridSpan"), this.root.push(
      new Zh({
        val: ke(e)
      })
    );
  }
}
const Vo = {
  /**
   * Cell that is merged with upper one.
   * This cell continues a vertical merge started by a cell above it.
   */
  CONTINUE: "continue",
  /**
   * Cell that is starting the vertical merge.
   * This cell begins a new vertical merge region.
   */
  RESTART: "restart"
};
class Jh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class Cs extends ae {
  constructor(e) {
    super("w:vMerge"), this.root.push(
      new Jh({
        val: e
      })
    );
  }
}
class Qh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class ef extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(
      new Qh({
        val: e
      })
    );
  }
}
class Xo extends Qe {
  constructor(e) {
    if (super("w:tcPr", e.includeIfEmpty), e.width && this.root.push(nr("w:tcW", e.width)), e.columnSpan && this.root.push(new Yh(e.columnSpan)), e.verticalMerge ? this.root.push(new Cs(e.verticalMerge)) : e.rowSpan && e.rowSpan > 1 && this.root.push(new Cs(Vo.RESTART)), e.borders && this.root.push(new $h(e.borders)), e.shading && this.root.push(ur(e.shading)), e.margins) {
      const r = Xh(e.margins);
      r && this.root.push(r);
    }
    e.textDirection && this.root.push(new ef(e.textDirection)), e.verticalAlign && this.root.push(Go(e.verticalAlign)), e.insertion && this.root.push(new Wh(e.insertion)), e.deletion && this.root.push(new Hh(e.deletion)), e.revision && this.root.push(new tf(e.revision)), e.cellMerge && this.root.push(new Gh(e.cellMerge));
  }
}
class tf extends ae {
  constructor(e) {
    super("w:tcPrChange"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.root.push(new Xo(Ae(me({}, e), { includeIfEmpty: !0 })));
  }
}
class Oi extends ae {
  constructor(e) {
    super("w:tc"), this.options = e, this.root.push(new Xo(e));
    for (const r of e.children)
      this.root.push(r);
  }
  prepForXml(e) {
    return this.root[this.root.length - 1] instanceof xe || this.root.push(new xe({})), super.prepForXml(e);
  }
}
const dt = {
  style: Oe.NONE,
  size: 0,
  color: "auto"
}, pt = {
  style: Oe.SINGLE,
  size: 4,
  color: "auto"
};
class $o extends ae {
  constructor(e) {
    var r, n, u, l, f, a;
    super("w:tblBorders"), this.root.push(be("w:top", (r = e.top) != null ? r : pt)), this.root.push(be("w:left", (n = e.left) != null ? n : pt)), this.root.push(be("w:bottom", (u = e.bottom) != null ? u : pt)), this.root.push(be("w:right", (l = e.right) != null ? l : pt)), this.root.push(be("w:insideH", (f = e.insideHorizontal) != null ? f : pt)), this.root.push(be("w:insideV", (a = e.insideVertical) != null ? a : pt));
  }
}
re($o, "NONE", {
  top: dt,
  bottom: dt,
  left: dt,
  right: dt,
  insideHorizontal: dt,
  insideVertical: dt
});
const rf = (t) => new fe({
  name: "w:tblOverlap",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), nf = ({
  horizontalAnchor: t,
  verticalAnchor: e,
  absoluteHorizontalPosition: r,
  relativeHorizontalPosition: n,
  absoluteVerticalPosition: u,
  relativeVerticalPosition: l,
  bottomFromText: f,
  topFromText: a,
  leftFromText: h,
  rightFromText: k,
  overlap: A
}) => new fe({
  name: "w:tblpPr",
  attributes: {
    leftFromText: {
      key: "w:leftFromText",
      value: h === void 0 ? void 0 : Se(h)
    },
    rightFromText: {
      key: "w:rightFromText",
      value: k === void 0 ? void 0 : Se(k)
    },
    topFromText: {
      key: "w:topFromText",
      value: a === void 0 ? void 0 : Se(a)
    },
    bottomFromText: {
      key: "w:bottomFromText",
      value: f === void 0 ? void 0 : Se(f)
    },
    absoluteHorizontalPosition: {
      key: "w:tblpX",
      value: r === void 0 ? void 0 : Xe(r)
    },
    absoluteVerticalPosition: {
      key: "w:tblpY",
      value: u === void 0 ? void 0 : Xe(u)
    },
    horizontalAnchor: {
      key: "w:horzAnchor",
      value: t
    },
    relativeHorizontalPosition: {
      key: "w:tblpXSpec",
      value: n
    },
    relativeVerticalPosition: {
      key: "w:tblpYSpec",
      value: l
    },
    verticalAnchor: {
      key: "w:vertAnchor",
      value: e
    }
  },
  children: A ? [rf(A)] : void 0
}), af = (t) => new fe({
  name: "w:tblLayout",
  attributes: {
    type: { key: "w:type", value: t }
  }
}), sf = {
  /** Value is in twentieths of a point */
  DXA: "dxa"
}, Zo = ({ type: t = sf.DXA, value: e }) => new fe({
  name: "w:tblCellSpacing",
  attributes: {
    type: { key: "w:type", value: t },
    value: { key: "w:w", value: bo(e) }
  }
}), of = ({ firstRow: t, lastRow: e, firstColumn: r, lastColumn: n, noHBand: u, noVBand: l }) => new fe({
  name: "w:tblLook",
  attributes: {
    firstRow: { key: "w:firstRow", value: t },
    lastRow: { key: "w:lastRow", value: e },
    firstColumn: { key: "w:firstColumn", value: r },
    lastColumn: { key: "w:lastColumn", value: n },
    noHBand: { key: "w:noHBand", value: u },
    noVBand: { key: "w:noVBand", value: l }
  }
});
class Yo extends Qe {
  constructor(e) {
    if (super("w:tblPr", e.includeIfEmpty), e.style && this.root.push(new Je("w:tblStyle", e.style)), e.float && this.root.push(nf(e.float)), e.visuallyRightToLeft !== void 0 && this.root.push(new ue("w:bidiVisual", e.visuallyRightToLeft)), e.width && this.root.push(nr("w:tblW", e.width)), e.alignment && this.root.push(Eo(e.alignment)), e.indent && this.root.push(nr("w:tblInd", e.indent)), e.borders && this.root.push(new $o(e.borders)), e.shading && this.root.push(ur(e.shading)), e.layout && this.root.push(af(e.layout)), e.cellMargin) {
      const r = Vh(e.cellMargin);
      r && this.root.push(r);
    }
    e.tableLook && this.root.push(of(e.tableLook)), e.cellSpacing && this.root.push(Zo(e.cellSpacing)), e.revision && this.root.push(new uf(e.revision));
  }
}
class uf extends ae {
  constructor(e) {
    super("w:tblPrChange"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.root.push(new Yo(Ae(me({}, e), { includeIfEmpty: !0 })));
  }
}
class lf extends Ni {
  constructor({
    rows: e,
    width: r,
    // eslint-disable-next-line functional/immutable-data
    columnWidths: n = Array(Math.max(...e.map((T) => T.CellCount))).fill(100),
    columnWidthsRevision: u,
    margins: l,
    indent: f,
    float: a,
    layout: h,
    style: k,
    borders: A,
    alignment: R,
    visuallyRightToLeft: I,
    tableLook: _,
    cellSpacing: S,
    revision: w
  }) {
    super("w:tbl"), this.root.push(
      new Yo({
        borders: A ?? {},
        width: r ?? { size: 100 },
        indent: f,
        float: a,
        layout: h,
        style: k,
        alignment: R,
        cellMargin: l,
        visuallyRightToLeft: I,
        tableLook: _,
        cellSpacing: S,
        revision: w
      })
    ), this.root.push(new qo(n, u));
    for (const T of e)
      this.root.push(T);
    e.forEach((T, o) => {
      if (o === e.length - 1)
        return;
      let g = 0;
      T.cells.forEach((m) => {
        if (m.options.rowSpan && m.options.rowSpan > 1) {
          const c = new Oi({
            // the inserted CONTINUE cell has rowSpan, and will be handled when process the next row
            rowSpan: m.options.rowSpan - 1,
            columnSpan: m.options.columnSpan,
            borders: m.options.borders,
            children: [],
            verticalMerge: Vo.CONTINUE
          });
          e[o + 1].addCellToColumnIndex(c, g);
        }
        g += m.options.columnSpan || 1;
      });
    });
  }
}
const cf = (t, e) => new fe({
  name: "w:trHeight",
  attributes: {
    value: { key: "w:val", value: Se(t) },
    rule: { key: "w:hRule", value: e }
  }
});
class Jo extends Qe {
  constructor(e) {
    super("w:trPr", e.includeIfEmpty), e.cantSplit !== void 0 && this.root.push(new ue("w:cantSplit", e.cantSplit)), e.tableHeader !== void 0 && this.root.push(new ue("w:tblHeader", e.tableHeader)), e.height && this.root.push(cf(e.height.value, e.height.rule)), e.cellSpacing && this.root.push(Zo(e.cellSpacing)), e.insertion && this.root.push(new jh(e.insertion)), e.deletion && this.root.push(new zh(e.deletion)), e.revision && this.root.push(new hf(e.revision));
  }
}
class hf extends ae {
  constructor(e) {
    super("w:trPrChange"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.root.push(new Jo(Ae(me({}, e), { includeIfEmpty: !0 })));
  }
}
class ff extends ae {
  constructor(e) {
    super("w:tr"), this.options = e, this.root.push(new Jo(e));
    for (const r of e.children)
      this.root.push(r);
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((e) => e instanceof Oi);
  }
  addCellToIndex(e, r) {
    this.root.splice(r + 1, 0, e);
  }
  addCellToColumnIndex(e, r) {
    const n = this.columnIndexToRootIndex(r, !0);
    this.addCellToIndex(e, n - 1);
  }
  rootIndexToColumnIndex(e) {
    if (e < 1 || e >= this.root.length)
      throw new Error(`cell 'rootIndex' should between 1 to ${this.root.length - 1}`);
    let r = 0;
    for (let n = 1; n < e; n++) {
      const u = this.root[n];
      r += u.options.columnSpan || 1;
    }
    return r;
  }
  columnIndexToRootIndex(e, r = !1) {
    if (e < 0)
      throw new Error("cell 'columnIndex' should not less than zero");
    let n = 0, u = 1;
    for (; n <= e; ) {
      if (u >= this.root.length) {
        if (r)
          return this.root.length;
        throw new Error(`cell 'columnIndex' should not great than ${n - 1}`);
      }
      const l = this.root[u];
      u += 1, n += l && l.options.columnSpan || 1;
    }
    return u - 1;
  }
}
class df extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}
class pf extends ae {
  constructor() {
    super("Properties"), this.root.push(
      new df({
        xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
        vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
      })
    );
  }
}
class mf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns"
    });
  }
}
const Ge = (t, e) => new fe({
  name: "Default",
  attributes: {
    contentType: { key: "ContentType", value: t },
    extension: { key: "Extension", value: e }
  }
}), Ce = (t, e) => new fe({
  name: "Override",
  attributes: {
    contentType: { key: "ContentType", value: t },
    partName: { key: "PartName", value: e }
  }
});
class wf extends ae {
  constructor() {
    super("Types"), this.root.push(
      new mf({
        xmlns: "http://schemas.openxmlformats.org/package/2006/content-types"
      })
    ), this.root.push(Ge("image/png", "png")), this.root.push(Ge("image/jpeg", "jpeg")), this.root.push(Ge("image/jpeg", "jpg")), this.root.push(Ge("image/bmp", "bmp")), this.root.push(Ge("image/gif", "gif")), this.root.push(Ge("image/svg+xml", "svg")), this.root.push(Ge("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(Ge("application/xml", "xml")), this.root.push(Ge("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(
      Ce("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")
    ), this.root.push(Ce("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(Ce("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(Ce("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(Ce("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(
      Ce("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")
    ), this.root.push(
      Ce("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")
    ), this.root.push(Ce("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(Ce("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(Ce("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml")), this.root.push(
      Ce("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml")
    );
  }
  /**
   * Registers a footer part in the content types.
   *
   * @param index - Footer index number (e.g., 1 for footer1.xml)
   */
  addFooter(e) {
    this.root.push(
      Ce("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${e}.xml`)
    );
  }
  /**
   * Registers a header part in the content types.
   *
   * @param index - Header index number (e.g., 1 for header1.xml)
   */
  addHeader(e) {
    this.root.push(
      Ce("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${e}.xml`)
    );
  }
}
const Ns = {
  wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
  mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
  o: "urn:schemas-microsoft-com:office:office",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
  v: "urn:schemas-microsoft-com:vml",
  wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
  wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
  w10: "urn:schemas-microsoft-com:office:word",
  w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  w14: "http://schemas.microsoft.com/office/word/2010/wordml",
  w15: "http://schemas.microsoft.com/office/word/2012/wordml",
  wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
  wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
  wne: "http://schemas.microsoft.com/office/word/2006/wordml",
  wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
  cp: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  dcmitype: "http://purl.org/dc/dcmitype/",
  xsi: "http://www.w3.org/2001/XMLSchema-instance",
  cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
  cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
  cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
  cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
  cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
  cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
  cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
  cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
  cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
  aink: "http://schemas.microsoft.com/office/drawing/2016/ink",
  am3d: "http://schemas.microsoft.com/office/drawing/2017/model3d",
  w16cex: "http://schemas.microsoft.com/office/word/2018/wordml/cex",
  w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid",
  w16: "http://schemas.microsoft.com/office/word/2018/wordml",
  w16sdtdh: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
  w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
};
class hr extends pe {
  constructor(e, r) {
    super(me({ Ignorable: r }, Object.fromEntries(e.map((n) => [n, Ns[n]])))), re(this, "xmlKeys", me({
      Ignorable: "mc:Ignorable"
    }, Object.fromEntries(Object.keys(Ns).map((n) => [n, `xmlns:${n}`]))));
  }
}
class gf extends ae {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new hr(["cp", "dc", "dcterms", "dcmitype", "xsi"])), e.title && this.root.push(new nt("dc:title", e.title)), e.subject && this.root.push(new nt("dc:subject", e.subject)), e.creator && this.root.push(new nt("dc:creator", e.creator)), e.keywords && this.root.push(new nt("cp:keywords", e.keywords)), e.description && this.root.push(new nt("dc:description", e.description)), e.lastModifiedBy && this.root.push(new nt("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new nt("cp:revision", String(e.revision))), this.root.push(new Os("dcterms:created")), this.root.push(new Os("dcterms:modified"));
  }
}
class yf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { type: "xsi:type" });
  }
}
class Os extends ae {
  constructor(e) {
    super(e), this.root.push(
      new yf({
        type: "dcterms:W3CDTF"
      })
    ), this.root.push(_l(/* @__PURE__ */ new Date()));
  }
}
class vf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}
class bf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}
class _f extends ae {
  constructor(e, r) {
    super("property"), this.root.push(
      new bf({
        formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
        pid: e.toString(),
        name: r.name
      })
    ), this.root.push(new Ef(r.value));
  }
}
class Ef extends ae {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}
class xf extends ae {
  constructor(e) {
    super("Properties"), re(this, "nextId"), re(this, "properties", []), this.root.push(
      new vf({
        xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
        vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
      })
    ), this.nextId = 2;
    for (const r of e)
      this.addCustomProperty(r);
  }
  prepForXml(e) {
    return this.properties.forEach((r) => this.root.push(r)), super.prepForXml(e);
  }
  addCustomProperty(e) {
    this.properties.push(new _f(this.nextId++, e));
  }
}
const Tf = ({ space: t, count: e, separate: r, equalWidth: n, children: u }) => new fe({
  name: "w:cols",
  attributes: {
    space: { key: "w:space", value: t === void 0 ? void 0 : Se(t) },
    count: { key: "w:num", value: e === void 0 ? void 0 : ke(e) },
    separate: { key: "w:sep", value: r },
    equalWidth: { key: "w:equalWidth", value: n }
  },
  children: !n && u ? u : void 0
}), Sf = ({ type: t, linePitch: e, charSpace: r }) => new fe({
  name: "w:docGrid",
  attributes: {
    type: { key: "w:type", value: t },
    linePitch: { key: "w:linePitch", value: ke(e) },
    charSpace: { key: "w:charSpace", value: r ? ke(r) : void 0 }
  }
}), gt = {
  /** Specifies that this header or footer shall appear on every page in this section which is not overridden with a specific `even` or `first` page header/footer. In a section with all three types specified, this type shall be used on all odd numbered pages (counting from the `first` page in the section, not the section numbering). */
  DEFAULT: "default",
  /** Specifies that this header or footer shall appear on the first page in this section. The appearance of this header or footer is contingent on the setting of the `titlePg` element (§2.10.6). */
  FIRST: "first",
  /** Specifies that this header or footer shall appear on all even numbered pages in this section (counting from the first page in the section, not the section numbering). The appearance of this header or footer is contingent on the setting of the `evenAndOddHeaders` element (§2.10.1). */
  EVEN: "even"
}, Ps = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
}, ei = (t, e) => new fe({
  name: t,
  attributes: {
    type: { key: "w:type", value: e.type || gt.DEFAULT },
    id: { key: "r:id", value: `rId${e.id}` }
  }
}), Af = ({ countBy: t, start: e, restart: r, distance: n }) => new fe({
  name: "w:lnNumType",
  attributes: {
    countBy: { key: "w:countBy", value: t === void 0 ? void 0 : ke(t) },
    start: { key: "w:start", value: e === void 0 ? void 0 : ke(e) },
    restart: { key: "w:restart", value: r },
    distance: {
      key: "w:distance",
      value: n === void 0 ? void 0 : Se(n)
    }
  }
});
class Fs extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}
class kf extends Qe {
  constructor(e) {
    if (super("w:pgBorders"), !e)
      return this;
    e.pageBorders ? this.root.push(
      new Fs({
        display: e.pageBorders.display,
        offsetFrom: e.pageBorders.offsetFrom,
        zOrder: e.pageBorders.zOrder
      })
    ) : this.root.push(new Fs({})), e.pageBorderTop && this.root.push(be("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(be("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(be("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(be("w:right", e.pageBorderRight));
  }
}
const Rf = (t, e, r, n, u, l, f) => new fe({
  name: "w:pgMar",
  attributes: {
    top: { key: "w:top", value: Xe(t) },
    right: { key: "w:right", value: Se(e) },
    bottom: { key: "w:bottom", value: Xe(r) },
    left: { key: "w:left", value: Se(n) },
    header: { key: "w:header", value: Se(u) },
    footer: { key: "w:footer", value: Se(l) },
    gutter: { key: "w:gutter", value: Se(f) }
  }
}), If = ({ start: t, formatType: e, separator: r }) => new fe({
  name: "w:pgNumType",
  attributes: {
    start: { key: "w:start", value: t === void 0 ? void 0 : ke(t) },
    formatType: { key: "w:fmt", value: e },
    separator: { key: "w:chapSep", value: r }
  }
}), wi = {
  /**
   * ## Portrait Mode
   *
   * Specifies that pages in this section shall be printed in portrait mode.
   */
  PORTRAIT: "portrait",
  /**
   * ## Landscape Mode
   *
   * Specifies that pages in this section shall be printed in landscape mode, which prints the page contents with a 90 degree rotation with respect to the normal page orientation.
   */
  LANDSCAPE: "landscape"
}, Cf = ({ width: t, height: e, orientation: r, code: n }) => {
  const u = Se(t), l = Se(e);
  return new fe({
    name: "w:pgSz",
    attributes: {
      width: { key: "w:w", value: r === wi.LANDSCAPE ? l : u },
      height: { key: "w:h", value: r === wi.LANDSCAPE ? u : l },
      orientation: { key: "w:orient", value: r },
      code: { key: "w:code", value: n }
    }
  });
};
class Nf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class Of extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(
      new Nf({
        val: e
      })
    );
  }
}
const Pf = {
  /** Section begins immediately following the previous section */
  CONTINUOUS: "continuous"
}, Ff = (t) => new fe({
  name: "w:type",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), at = {
  /** Top margin: 1440 twips (1 inch) */
  TOP: 1440,
  /** Right margin: 1440 twips (1 inch) */
  RIGHT: 1440,
  /** Bottom margin: 1440 twips (1 inch) */
  BOTTOM: 1440,
  /** Left margin: 1440 twips (1 inch) */
  LEFT: 1440,
  /** Header margin from top: 708 twips (0.5 inches) */
  HEADER: 708,
  /** Footer margin from bottom: 708 twips (0.5 inches) */
  FOOTER: 708,
  /** Gutter margin for binding: 0 twips */
  GUTTER: 0
}, ti = {
  /** Page width: 11906 twips (8.27 inches, 210mm) */
  WIDTH: 11906,
  /** Page height: 16838 twips (11.69 inches, 297mm) */
  HEIGHT: 16838,
  /** Page orientation: portrait */
  ORIENTATION: wi.PORTRAIT
};
class Qo extends ae {
  constructor({
    page: {
      size: {
        width: e = ti.WIDTH,
        height: r = ti.HEIGHT,
        orientation: n = ti.ORIENTATION
      } = {},
      margin: {
        top: u = at.TOP,
        right: l = at.RIGHT,
        bottom: f = at.BOTTOM,
        left: a = at.LEFT,
        header: h = at.HEADER,
        footer: k = at.FOOTER,
        gutter: A = at.GUTTER
      } = {},
      pageNumbers: R = {},
      borders: I,
      textDirection: _
    } = {},
    grid: { linePitch: S = 360, charSpace: w, type: T } = {},
    headerWrapperGroup: o = {},
    footerWrapperGroup: g = {},
    lineNumbers: m,
    titlePage: c,
    verticalAlign: x,
    column: F,
    type: B,
    revision: z
  } = {}) {
    super("w:sectPr"), this.addHeaderFooterGroup(Ps.HEADER, o), this.addHeaderFooterGroup(Ps.FOOTER, g), B && this.root.push(Ff(B)), this.root.push(Cf({ width: e, height: r, orientation: n })), this.root.push(Rf(u, l, f, a, h, k, A)), I && this.root.push(new kf(I)), m && this.root.push(Af(m)), this.root.push(If(R)), F && this.root.push(Tf(F)), x && this.root.push(Go(x)), c !== void 0 && this.root.push(new ue("w:titlePg", c)), _ && this.root.push(new Of(_)), z && this.root.push(new Df(z)), this.root.push(Sf({ linePitch: S, charSpace: w, type: T }));
  }
  addHeaderFooterGroup(e, r) {
    r.default && this.root.push(
      ei(e, {
        type: gt.DEFAULT,
        id: r.default.View.ReferenceId
      })
    ), r.first && this.root.push(
      ei(e, {
        type: gt.FIRST,
        id: r.first.View.ReferenceId
      })
    ), r.even && this.root.push(
      ei(e, {
        type: gt.EVEN,
        id: r.even.View.ReferenceId
      })
    );
  }
}
class Df extends ae {
  constructor(e) {
    super("w:sectPrChange"), this.root.push(
      new Fe({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.root.push(new Qo(e));
  }
}
class Bf extends ae {
  constructor() {
    super("w:body"), re(this, "sections", []);
  }
  /**
   * Adds new section properties to the document body.
   *
   * Creates a new section by moving the previous section's properties into a paragraph
   * at the end of that section, and then adding the new section as the current section.
   *
   * According to the OOXML specification:
   * - Section properties for all sections except the last must be stored in a paragraph's
   *   properties (pPr/sectPr) at the end of each section
   * - The last section's properties are stored as a direct child of the body element (w:body/w:sectPr)
   *
   * @param options - Section properties configuration (page size, margins, headers, footers, etc.)
   */
  addSection(e) {
    const r = this.sections.pop();
    this.root.push(this.createSectionParagraph(r)), this.sections.push(new Qo(e));
  }
  /**
   * Prepares the body element for XML serialization.
   *
   * Ensures that the last section's properties are placed as a direct child of the body
   * element, as required by the OOXML specification.
   *
   * @param context - The XML serialization context
   * @returns The prepared XML object or undefined
   */
  prepForXml(e) {
    return this.sections.length === 1 && (this.root.splice(0, 1), this.root.push(this.sections.pop())), super.prepForXml(e);
  }
  /**
   * Adds a block-level component to the body.
   *
   * This method is used internally by the Document class to add paragraphs,
   * tables, and other block-level elements to the document body.
   *
   * @param component - The XML component to add (paragraph, table, etc.)
   */
  push(e) {
    this.root.push(e);
  }
  createSectionParagraph(e) {
    const r = new xe({}), n = new ct({});
    return n.push(e), r.addChildElement(n), r;
  }
}
class Lf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      color: "w:color",
      themeColor: "w:themeColor",
      themeShade: "w:themeShade",
      themeTint: "w:themeTint"
    });
  }
}
class Mf extends ae {
  constructor(e) {
    super("w:background"), this.root.push(
      new Lf({
        color: e.color === void 0 ? void 0 : vt(e.color),
        themeColor: e.themeColor,
        themeShade: e.themeShade === void 0 ? void 0 : hs(e.themeShade),
        themeTint: e.themeTint === void 0 ? void 0 : hs(e.themeTint)
      })
    );
  }
}
class Uf extends ae {
  constructor(e) {
    super("w:document"), re(this, "body"), this.root.push(
      new hr(
        [
          "wpc",
          "mc",
          "o",
          "r",
          "m",
          "v",
          "wp14",
          "wp",
          "w10",
          "w",
          "w14",
          "w15",
          "wpg",
          "wpi",
          "wne",
          "wps",
          "cx",
          "cx1",
          "cx2",
          "cx3",
          "cx4",
          "cx5",
          "cx6",
          "cx7",
          "cx8",
          "aink",
          "am3d",
          "w16cex",
          "w16cid",
          "w16",
          "w16sdtdh",
          "w16se"
        ],
        "w14 w15 wp14"
      )
    ), this.body = new Bf(), e.background && this.root.push(new Mf(e.background)), this.root.push(this.body);
  }
  /**
   * Adds a block-level element to the document body.
   *
   * @param item - The element to add (paragraph, table, table of contents, or hyperlink)
   * @returns The Document instance for method chaining
   */
  add(e) {
    return this.body.push(e), this;
  }
  /**
   * Gets the document body element.
   *
   * @returns The Body instance containing all document content
   */
  get Body() {
    return this.body;
  }
}
class jf {
  constructor(e) {
    re(this, "document"), re(this, "relationships"), this.document = new Uf(e), this.relationships = new tt();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}
class zf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
}
class Wf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}
class Hf extends We {
  constructor() {
    super({
      style: "EndnoteReference"
    }), this.root.push(new mh());
  }
}
const Ds = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
};
class ri extends ae {
  constructor(e) {
    super("w:endnote"), this.root.push(
      new Wf({
        type: e.type,
        id: e.id
      })
    );
    for (let r = 0; r < e.children.length; r++) {
      const n = e.children[r];
      r === 0 && n.addRunToFront(new Hf()), this.root.push(n);
    }
  }
}
class qf extends ae {
  constructor() {
    super("w:continuationSeparator");
  }
}
class eu extends We {
  constructor() {
    super({}), this.root.push(new qf());
  }
}
class Gf extends ae {
  constructor() {
    super("w:separator");
  }
}
class tu extends We {
  constructor() {
    super({}), this.root.push(new Gf());
  }
}
class Kf extends ae {
  constructor() {
    super("w:endnotes"), this.root.push(
      new zf({
        wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
        mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
        o: "urn:schemas-microsoft-com:office:office",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
        v: "urn:schemas-microsoft-com:vml",
        wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        w10: "urn:schemas-microsoft-com:office:word",
        w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        w14: "http://schemas.microsoft.com/office/word/2010/wordml",
        w15: "http://schemas.microsoft.com/office/word/2012/wordml",
        wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        wne: "http://schemas.microsoft.com/office/word/2006/wordml",
        wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
        Ignorable: "w14 w15 wp14"
      })
    );
    const e = new ri({
      id: -1,
      type: Ds.SEPARATOR,
      children: [
        new xe({
          spacing: {
            after: 0,
            line: 240,
            lineRule: bt.AUTO
          },
          children: [new tu()]
        })
      ]
    });
    this.root.push(e);
    const r = new ri({
      id: 0,
      type: Ds.CONTINUATION_SEPARATOR,
      children: [
        new xe({
          spacing: {
            after: 0,
            line: 240,
            lineRule: bt.AUTO
          },
          children: [new eu()]
        })
      ]
    });
    this.root.push(r);
  }
  createEndnote(e, r) {
    const n = new ri({
      id: e,
      children: r
    });
    this.root.push(n);
  }
}
class Vf {
  constructor() {
    re(this, "endnotes"), re(this, "relationships"), this.endnotes = new Kf(), this.relationships = new tt();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}
class Xf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      cp: "xmlns:cp",
      dc: "xmlns:dc",
      dcterms: "xmlns:dcterms",
      dcmitype: "xmlns:dcmitype",
      xsi: "xmlns:xsi",
      type: "xsi:type"
    });
  }
}
let $f = class extends go {
  constructor(e, r) {
    super("w:ftr", r), re(this, "refId"), this.refId = e, r || this.root.push(
      new Xf({
        wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
        mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
        o: "urn:schemas-microsoft-com:office:office",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
        v: "urn:schemas-microsoft-com:vml",
        wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        w10: "urn:schemas-microsoft-com:office:word",
        w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        w14: "http://schemas.microsoft.com/office/word/2010/wordml",
        w15: "http://schemas.microsoft.com/office/word/2012/wordml",
        wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        wne: "http://schemas.microsoft.com/office/word/2006/wordml",
        wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
      })
    );
  }
  get ReferenceId() {
    return this.refId;
  }
  add(e) {
    this.root.push(e);
  }
};
class Zf {
  constructor(e, r, n) {
    re(this, "footer"), re(this, "relationships"), this.media = e, this.footer = new $f(r, n), this.relationships = new tt();
  }
  add(e) {
    this.footer.add(e);
  }
  addChildElement(e) {
    this.footer.addChildElement(e);
  }
  get View() {
    return this.footer;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
}
class Yf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}
class Jf extends ae {
  constructor() {
    super("w:footnoteRef");
  }
}
class Qf extends We {
  constructor() {
    super({
      style: "FootnoteReference"
    }), this.root.push(new Jf());
  }
}
const Bs = {
  /** Separator line between body text and footnotes */
  SEPERATOR: "separator",
  /** Continuation separator for footnotes spanning pages */
  CONTINUATION_SEPERATOR: "continuationSeparator"
};
class ni extends ae {
  constructor(e) {
    super("w:footnote"), this.root.push(
      new Yf({
        type: e.type,
        id: e.id
      })
    );
    for (let r = 0; r < e.children.length; r++) {
      const n = e.children[r];
      r === 0 && n.addRunToFront(new Qf()), this.root.push(n);
    }
  }
}
class ed extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
}
class td extends ae {
  constructor() {
    super("w:footnotes"), this.root.push(
      new ed({
        wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
        mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
        o: "urn:schemas-microsoft-com:office:office",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
        v: "urn:schemas-microsoft-com:vml",
        wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        w10: "urn:schemas-microsoft-com:office:word",
        w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        w14: "http://schemas.microsoft.com/office/word/2010/wordml",
        w15: "http://schemas.microsoft.com/office/word/2012/wordml",
        wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        wne: "http://schemas.microsoft.com/office/word/2006/wordml",
        wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
        Ignorable: "w14 w15 wp14"
      })
    );
    const e = new ni({
      id: -1,
      type: Bs.SEPERATOR,
      children: [
        new xe({
          spacing: {
            after: 0,
            line: 240,
            lineRule: bt.AUTO
          },
          children: [new tu()]
        })
      ]
    });
    this.root.push(e);
    const r = new ni({
      id: 0,
      type: Bs.CONTINUATION_SEPERATOR,
      children: [
        new xe({
          spacing: {
            after: 0,
            line: 240,
            lineRule: bt.AUTO
          },
          children: [new eu()]
        })
      ]
    });
    this.root.push(r);
  }
  /**
   * Creates and adds a new footnote to the collection.
   *
   * @param id - Unique numeric identifier for the footnote
   * @param paragraph - Array of paragraphs that make up the footnote content
   */
  createFootNote(e, r) {
    const n = new ni({
      id: e,
      children: r
    });
    this.root.push(n);
  }
}
class rd {
  constructor() {
    re(this, "footnotess"), re(this, "relationships"), this.footnotess = new td(), this.relationships = new tt();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}
class nd extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      cp: "xmlns:cp",
      dc: "xmlns:dc",
      dcterms: "xmlns:dcterms",
      dcmitype: "xmlns:dcmitype",
      xsi: "xmlns:xsi",
      type: "xsi:type",
      cx: "xmlns:cx",
      cx1: "xmlns:cx1",
      cx2: "xmlns:cx2",
      cx3: "xmlns:cx3",
      cx4: "xmlns:cx4",
      cx5: "xmlns:cx5",
      cx6: "xmlns:cx6",
      cx7: "xmlns:cx7",
      cx8: "xmlns:cx8",
      w16cid: "xmlns:w16cid",
      w16se: "xmlns:w16se"
    });
  }
}
let id = class extends go {
  constructor(e, r) {
    super("w:hdr", r), re(this, "refId"), this.refId = e, r || this.root.push(
      new nd({
        wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
        mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
        o: "urn:schemas-microsoft-com:office:office",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
        v: "urn:schemas-microsoft-com:vml",
        wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        w10: "urn:schemas-microsoft-com:office:word",
        w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        w14: "http://schemas.microsoft.com/office/word/2010/wordml",
        w15: "http://schemas.microsoft.com/office/word/2012/wordml",
        wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        wne: "http://schemas.microsoft.com/office/word/2006/wordml",
        wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
        cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
        cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
        cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
        cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
        cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
        cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
        cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
        cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
        cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
        w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid",
        w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
      })
    );
  }
  get ReferenceId() {
    return this.refId;
  }
  add(e) {
    this.root.push(e);
  }
};
class ad {
  constructor(e, r, n) {
    re(this, "header"), re(this, "relationships"), this.media = e, this.header = new id(r, n), this.relationships = new tt();
  }
  add(e) {
    return this.header.add(e), this;
  }
  addChildElement(e) {
    this.header.addChildElement(e);
  }
  get View() {
    return this.header;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
}
class sd {
  constructor() {
    re(this, "map"), this.map = /* @__PURE__ */ new Map();
  }
  /**
   * Adds an image to the media collection.
   *
   * @param key - Unique identifier for this image
   * @param mediaData - Complete image data including file name, transformation, and raw data
   */
  addImage(e, r) {
    this.map.set(e, r);
  }
  /**
   * Gets all images as an array.
   *
   * @returns Read-only array of all media data in the collection
   */
  get Array() {
    return Array.from(this.map.values());
  }
}
const Ke = {
  /** Bullet points. */
  BULLET: "bullet"
};
class od extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w15:tentative"
    });
  }
}
class ud extends ae {
  constructor(e) {
    super("w:numFmt"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class ld extends ae {
  constructor(e) {
    super("w:lvlText"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class cd extends ae {
  constructor(e) {
    super("w:lvlJc"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class hd extends ae {
  constructor(e) {
    super("w:suff"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class fd extends ae {
  constructor() {
    super("w:isLgl");
  }
}
class dd extends ae {
  /**
   * Creates a new numbering level.
   *
   * @param options - Level configuration options
   * @throws Error if level is greater than 9 (Word limitation)
   */
  constructor({
    level: e,
    format: r,
    text: n,
    alignment: u = Te.START,
    start: l = 1,
    style: f,
    suffix: a,
    isLegalNumberingStyle: h
  }) {
    if (super("w:lvl"), re(this, "paragraphProperties"), re(this, "runProperties"), this.root.push(new Pt("w:start", ke(l))), r && this.root.push(new ud(r)), a && this.root.push(new hd(a)), h && this.root.push(new fd()), n && this.root.push(new ld(n)), this.root.push(new cd(u)), this.paragraphProperties = new ct(f && f.paragraph), this.runProperties = new ht(f && f.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9)
      throw new Error(
        "Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7"
      );
    this.root.push(
      new od({
        ilvl: ke(e),
        tentative: 1
      })
    );
  }
}
class pd extends dd {
  // This is the level that sits under abstractNum
}
class md extends ae {
  /**
   * Creates a new multi-level type specification.
   *
   * @param value - The multi-level type: "singleLevel", "multilevel", or "hybridMultilevel"
   */
  constructor(e) {
    super("w:multiLevelType"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class wd extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}
class Ls extends ae {
  /**
   * Creates a new abstract numbering definition.
   *
   * @param id - Unique identifier for this abstract numbering definition
   * @param levelOptions - Array of level definitions (up to 9 levels)
   */
  constructor(e, r) {
    super("w:abstractNum"), re(this, "id"), this.root.push(
      new wd({
        abstractNumId: ke(e),
        restartNumberingAfterBreak: 0
      })
    ), this.root.push(new md("hybridMultilevel")), this.id = e;
    for (const n of r)
      this.root.push(new pd(n));
  }
}
class gd extends ae {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class yd extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { numId: "w:numId" });
  }
}
class Ms extends ae {
  /**
   * Creates a new concrete numbering instance.
   *
   * @param options - Configuration options for the numbering instance
   */
  constructor(e) {
    if (super("w:num"), re(this, "numId"), re(this, "reference"), re(this, "instance"), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.root.push(
      new yd({
        numId: ke(e.numId)
      })
    ), this.root.push(new gd(ke(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length)
      for (const r of e.overrideLevels)
        this.root.push(new bd(r.num, r.start));
  }
}
class vd extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}
class bd extends ae {
  /**
   * Creates a new level override.
   *
   * @param levelNum - The level number to override (0-8)
   * @param start - Optional starting number for the level
   */
  constructor(e, r) {
    super("w:lvlOverride"), this.root.push(new vd({ ilvl: e })), r !== void 0 && this.root.push(new Ed(r));
  }
}
class _d extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class Ed extends ae {
  /**
   * Creates a new start override.
   *
   * @param start - The starting number
   */
  constructor(e) {
    super("w:startOverride"), this.root.push(new _d({ val: e }));
  }
}
class xd extends ae {
  /**
   * Creates a new numbering definition collection.
   *
   * Initializes the numbering with a default bullet list configuration and
   * any custom numbering configurations provided in the options.
   *
   * @param options - Configuration options for numbering definitions
   */
  constructor(e) {
    super("w:numbering"), re(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), re(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), re(this, "referenceConfigMap", /* @__PURE__ */ new Map()), re(this, "abstractNumUniqueNumericId", nc()), re(this, "concreteNumUniqueNumericId", ic()), this.root.push(
      new hr(
        ["wpc", "mc", "o", "r", "m", "v", "wp14", "wp", "w10", "w", "w14", "w15", "wpg", "wpi", "wne", "wps"],
        "w14 w15 wp14"
      )
    );
    const r = new Ls(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: Ke.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: De(0.5), hanging: De(0.25) }
          }
        }
      },
      {
        level: 1,
        format: Ke.BULLET,
        text: "○",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: De(1), hanging: De(0.25) }
          }
        }
      },
      {
        level: 2,
        format: Ke.BULLET,
        text: "■",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 2160, hanging: De(0.25) }
          }
        }
      },
      {
        level: 3,
        format: Ke.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 2880, hanging: De(0.25) }
          }
        }
      },
      {
        level: 4,
        format: Ke.BULLET,
        text: "○",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 3600, hanging: De(0.25) }
          }
        }
      },
      {
        level: 5,
        format: Ke.BULLET,
        text: "■",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 4320, hanging: De(0.25) }
          }
        }
      },
      {
        level: 6,
        format: Ke.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 5040, hanging: De(0.25) }
          }
        }
      },
      {
        level: 7,
        format: Ke.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 5760, hanging: De(0.25) }
          }
        }
      },
      {
        level: 8,
        format: Ke.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 6480, hanging: De(0.25) }
          }
        }
      }
    ]);
    this.concreteNumberingMap.set(
      "default-bullet-numbering",
      new Ms({
        numId: 1,
        abstractNumId: r.id,
        reference: "default-bullet-numbering",
        instance: 0,
        overrideLevels: [
          {
            num: 0,
            start: 1
          }
        ]
      })
    ), this.abstractNumberingMap.set("default-bullet-numbering", r);
    for (const n of e.config)
      this.abstractNumberingMap.set(n.reference, new Ls(this.abstractNumUniqueNumericId(), n.levels)), this.referenceConfigMap.set(n.reference, n.levels);
  }
  /**
   * Prepares the numbering definitions for XML serialization.
   *
   * Adds all abstract and concrete numbering definitions to the XML tree.
   *
   * @param context - The XML context
   * @returns The prepared XML object
   */
  prepForXml(e) {
    for (const r of this.abstractNumberingMap.values())
      this.root.push(r);
    for (const r of this.concreteNumberingMap.values())
      this.root.push(r);
    return super.prepForXml(e);
  }
  /**
   * Creates a concrete numbering instance from an abstract numbering definition.
   *
   * This method creates a new concrete numbering instance that references an
   * abstract numbering definition. It's used internally when paragraphs reference
   * numbering configurations.
   *
   * @param reference - The reference name of the abstract numbering definition
   * @param instance - The instance number for this concrete numbering
   */
  createConcreteNumberingInstance(e, r) {
    const n = this.abstractNumberingMap.get(e);
    if (!n)
      return;
    const u = `${e}-${r}`;
    if (this.concreteNumberingMap.has(u))
      return;
    const l = this.referenceConfigMap.get(e), f = l && l[0].start, a = {
      numId: this.concreteNumUniqueNumericId(),
      abstractNumId: n.id,
      reference: e,
      instance: r,
      overrideLevels: [
        typeof f == "number" && Number.isInteger(f) ? {
          num: 0,
          start: f
        } : {
          num: 0,
          start: 1
        }
      ]
    };
    this.concreteNumberingMap.set(u, new Ms(a));
  }
  /**
   * Gets all concrete numbering instances.
   *
   * @returns An array of all concrete numbering instances
   */
  get ConcreteNumbering() {
    return Array.from(this.concreteNumberingMap.values());
  }
  /**
   * Gets all reference configurations.
   *
   * @returns An array of all numbering reference configurations
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get ReferenceConfig() {
    return Array.from(this.referenceConfigMap.values());
  }
}
const Td = (t) => new fe({
  name: "w:compatSetting",
  attributes: {
    version: { key: "w:val", value: t },
    name: { key: "w:name", value: "compatibilityMode" },
    uri: { key: "w:uri", value: "http://schemas.microsoft.com/office/word" }
  }
});
class Sd extends ae {
  constructor(e) {
    super("w:compat"), e.version && this.root.push(Td(e.version)), e.useSingleBorderforContiguousCells && this.root.push(new ue("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new ue("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new ue("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new ue("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new ue("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new ue("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new ue("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new ue("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new ue("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new ue("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new ue("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new ue("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new ue("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new ue("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new ue("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new ue("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new ue("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new ue("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new ue("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new ue("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new ue("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new ue("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new ue("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new ue("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new ue("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new ue("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new ue("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new ue("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new ue("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new ue("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new ue("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new ue("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new ue("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new ue("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new ue("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new ue("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new ue("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new ue("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new ue("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new ue("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new ue("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new ue("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new ue("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new ue("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new ue("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new ue("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new ue("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new ue("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new ue("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new ue("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new ue("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new ue("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new ue("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new ue("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new ue("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new ue("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new ue("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new ue("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new ue("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new ue("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new ue("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new ue("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new ue("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new ue("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new ue("w:cachedColBalance", e.cachedColumnBalance));
  }
}
class Ad extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
}
class kd extends ae {
  constructor(e) {
    var r, n, u, l, f, a, h, k;
    super("w:settings"), this.root.push(
      new Ad({
        wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
        mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
        o: "urn:schemas-microsoft-com:office:office",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
        v: "urn:schemas-microsoft-com:vml",
        wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
        wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        w10: "urn:schemas-microsoft-com:office:word",
        w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        w14: "http://schemas.microsoft.com/office/word/2010/wordml",
        w15: "http://schemas.microsoft.com/office/word/2012/wordml",
        wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
        wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
        wne: "http://schemas.microsoft.com/office/word/2006/wordml",
        wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
        Ignorable: "w14 w15 wp14"
      })
    ), this.root.push(new ue("w:displayBackgroundShape", !0)), e.trackRevisions !== void 0 && this.root.push(new ue("w:trackRevisions", e.trackRevisions)), e.evenAndOddHeaders !== void 0 && this.root.push(new ue("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new ue("w:updateFields", e.updateFields)), e.defaultTabStop !== void 0 && this.root.push(new Pt("w:defaultTabStop", e.defaultTabStop)), ((r = e.hyphenation) == null ? void 0 : r.autoHyphenation) !== void 0 && this.root.push(new ue("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((n = e.hyphenation) == null ? void 0 : n.hyphenationZone) !== void 0 && this.root.push(new Pt("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((u = e.hyphenation) == null ? void 0 : u.consecutiveHyphenLimit) !== void 0 && this.root.push(new Pt("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((l = e.hyphenation) == null ? void 0 : l.doNotHyphenateCaps) !== void 0 && this.root.push(new ue("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), this.root.push(
      new Sd(Ae(me({}, (f = e.compatibility) != null ? f : {}), {
        version: (k = (h = (a = e.compatibility) == null ? void 0 : a.version) != null ? h : e.compatibilityModeVersion) != null ? k : 15
      }))
    );
  }
}
class ru extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class Rd extends ae {
  constructor(e) {
    super("w:name"), this.root.push(new ru({ val: e }));
  }
}
class Id extends ae {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new ru({ val: ke(e) }));
  }
}
class Cd extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}
class nu extends ae {
  constructor(e, r) {
    super("w:style"), this.root.push(new Cd(e)), r.name && this.root.push(new Rd(r.name)), r.basedOn && this.root.push(new Je("w:basedOn", r.basedOn)), r.next && this.root.push(new Je("w:next", r.next)), r.link && this.root.push(new Je("w:link", r.link)), r.uiPriority !== void 0 && this.root.push(new Id(r.uiPriority)), r.semiHidden !== void 0 && this.root.push(new ue("w:semiHidden", r.semiHidden)), r.unhideWhenUsed !== void 0 && this.root.push(new ue("w:unhideWhenUsed", r.unhideWhenUsed)), r.quickFormat !== void 0 && this.root.push(new ue("w:qFormat", r.quickFormat));
  }
}
class Mt extends nu {
  constructor(e) {
    super({ type: "paragraph", styleId: e.id }, e), re(this, "paragraphProperties"), re(this, "runProperties"), this.paragraphProperties = new ct(e.paragraph), this.runProperties = new ht(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}
class Et extends nu {
  constructor(e) {
    super(
      { type: "character", styleId: e.id },
      me({
        uiPriority: 99,
        unhideWhenUsed: !0
      }, e)
    ), re(this, "runProperties"), this.runProperties = new ht(e.run), this.root.push(this.runProperties);
  }
}
class rt extends Mt {
  constructor(e) {
    super(me({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, e));
  }
}
class Nd extends rt {
  constructor(e) {
    super(me({
      id: "Title",
      name: "Title"
    }, e));
  }
}
class Od extends rt {
  constructor(e) {
    super(me({
      id: "Heading1",
      name: "Heading 1"
    }, e));
  }
}
class Pd extends rt {
  constructor(e) {
    super(me({
      id: "Heading2",
      name: "Heading 2"
    }, e));
  }
}
class Fd extends rt {
  constructor(e) {
    super(me({
      id: "Heading3",
      name: "Heading 3"
    }, e));
  }
}
class Dd extends rt {
  constructor(e) {
    super(me({
      id: "Heading4",
      name: "Heading 4"
    }, e));
  }
}
class Bd extends rt {
  constructor(e) {
    super(me({
      id: "Heading5",
      name: "Heading 5"
    }, e));
  }
}
class Ld extends rt {
  constructor(e) {
    super(me({
      id: "Heading6",
      name: "Heading 6"
    }, e));
  }
}
class Md extends rt {
  constructor(e) {
    super(me({
      id: "Strong",
      name: "Strong"
    }, e));
  }
}
class Ud extends Mt {
  constructor(e) {
    super(me({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, e));
  }
}
class jd extends Mt {
  constructor(e) {
    super(me({
      id: "FootnoteText",
      name: "footnote text",
      link: "FootnoteTextChar",
      basedOn: "Normal",
      uiPriority: 99,
      semiHidden: !0,
      unhideWhenUsed: !0,
      paragraph: {
        spacing: {
          after: 0,
          line: 240,
          lineRule: bt.AUTO
        }
      },
      run: {
        size: 20
      }
    }, e));
  }
}
class zd extends Et {
  constructor(e) {
    super(me({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: {
        superScript: !0
      }
    }, e));
  }
}
class Wd extends Et {
  constructor(e) {
    super(me({
      id: "FootnoteTextChar",
      name: "Footnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "FootnoteText",
      semiHidden: !0,
      run: {
        size: 20
      }
    }, e));
  }
}
class Hd extends Mt {
  constructor(e) {
    super(me({
      id: "EndnoteText",
      name: "endnote text",
      link: "EndnoteTextChar",
      basedOn: "Normal",
      uiPriority: 99,
      semiHidden: !0,
      unhideWhenUsed: !0,
      paragraph: {
        spacing: {
          after: 0,
          line: 240,
          lineRule: bt.AUTO
        }
      },
      run: {
        size: 20
      }
    }, e));
  }
}
class qd extends Et {
  constructor(e) {
    super(me({
      id: "EndnoteReference",
      name: "endnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: {
        superScript: !0
      }
    }, e));
  }
}
class Gd extends Et {
  constructor(e) {
    super(me({
      id: "EndnoteTextChar",
      name: "Endnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "EndnoteText",
      semiHidden: !0,
      run: {
        size: 20
      }
    }, e));
  }
}
class Kd extends Et {
  constructor(e) {
    super(me({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: {
          type: To.SINGLE
        }
      }
    }, e));
  }
}
class ii extends ae {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles)
      for (const r of e.importedStyles)
        this.root.push(r);
    if (e.paragraphStyles)
      for (const r of e.paragraphStyles)
        this.root.push(new Mt(r));
    if (e.characterStyles)
      for (const r of e.characterStyles)
        this.root.push(new Et(r));
  }
}
class Vd extends ae {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new ct(e));
  }
}
class Xd extends ae {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new ht(e));
  }
}
class $d extends ae {
  constructor(e) {
    super("w:docDefaults"), re(this, "runPropertiesDefaults"), re(this, "paragraphPropertiesDefaults"), this.runPropertiesDefaults = new Xd(e.run), this.paragraphPropertiesDefaults = new Vd(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}
class Zd {
  /**
   * Creates new Styles based on the given XML data.
   *
   * Parses the styles XML and converts them to XmlComponent instances.
   *
   * Example content from styles.xml:
   * ```xml
   * <?xml version="1.0"?>
   * <w:styles xmlns:mc="some schema" ...>
   *   <w:style w:type="paragraph" w:styleId="Heading1">
   *     <w:name w:val="heading 1"/>
   *     ...
   *   </w:style>
   *   <w:style w:type="paragraph" w:styleId="Heading2">
   *     <w:name w:val="heading 2"/>
   *     ...
   *   </w:style>
   *   <w:docDefaults>...</w:docDefaults>
   * </w:styles>
   * ```
   *
   * @param xmlData - XML string containing styles data from styles.xml
   * @returns Styles object containing all parsed styles
   * @throws Error if styles element cannot be found in the XML
   */
  newInstance(e) {
    const r = wo.xml2js(e, { compact: !1 });
    let n;
    for (const l of r.elements || [])
      l.name === "w:styles" && (n = l);
    if (n === void 0)
      throw new Error("can not find styles element");
    const u = n.elements || [];
    return {
      initialStyles: new wl(n.attributes),
      importedStyles: u.map((l) => ki(l))
    };
  }
}
class ai {
  newInstance(e = {}) {
    var r;
    return {
      initialStyles: new hr(["mc", "r", "w", "w14", "w15"], "w14 w15"),
      importedStyles: [
        new $d((r = e.document) != null ? r : {}),
        new Nd(me({
          run: {
            size: 56
          }
        }, e.title)),
        new Od(me({
          run: {
            color: "2E74B5",
            size: 32
          }
        }, e.heading1)),
        new Pd(me({
          run: {
            color: "2E74B5",
            size: 26
          }
        }, e.heading2)),
        new Fd(me({
          run: {
            color: "1F4D78",
            size: 24
          }
        }, e.heading3)),
        new Dd(me({
          run: {
            color: "2E74B5",
            italics: !0
          }
        }, e.heading4)),
        new Bd(me({
          run: {
            color: "2E74B5"
          }
        }, e.heading5)),
        new Ld(me({
          run: {
            color: "1F4D78"
          }
        }, e.heading6)),
        new Md(me({
          run: {
            bold: !0
          }
        }, e.strong)),
        new Ud(e.listParagraph || {}),
        new Kd(e.hyperlink || {}),
        new zd(e.footnoteReference || {}),
        new jd(e.footnoteText || {}),
        new Wd(e.footnoteTextChar || {}),
        new qd(e.endnoteReference || {}),
        new Hd(e.endnoteText || {}),
        new Gd(e.endnoteTextChar || {})
      ]
    };
  }
}
class Yd {
  constructor(e) {
    re(this, "currentRelationshipId", 1), re(this, "documentWrapper"), re(this, "headers", []), re(this, "footers", []), re(this, "coreProperties"), re(this, "numbering"), re(this, "media"), re(this, "fileRelationships"), re(this, "footnotesWrapper"), re(this, "endnotesWrapper"), re(this, "settings"), re(this, "contentTypes"), re(this, "customProperties"), re(this, "appProperties"), re(this, "styles"), re(this, "comments"), re(this, "fontWrapper");
    var r, n, u, l, f, a, h, k, A, R, I, _, S;
    if (this.coreProperties = new gf(Ae(me({}, e), {
      creator: (r = e.creator) != null ? r : "Un-named",
      revision: (n = e.revision) != null ? n : 1,
      lastModifiedBy: (u = e.lastModifiedBy) != null ? u : "Un-named"
    })), this.numbering = new xd(e.numbering ? e.numbering : { config: [] }), this.comments = new ph((l = e.comments) != null ? l : { children: [] }), this.fileRelationships = new tt(), this.customProperties = new xf((f = e.customProperties) != null ? f : []), this.appProperties = new pf(), this.footnotesWrapper = new rd(), this.endnotesWrapper = new Vf(), this.contentTypes = new wf(), this.documentWrapper = new jf({ background: e.background }), this.settings = new kd({
      compatibilityModeVersion: e.compatabilityModeVersion,
      compatibility: e.compatibility,
      evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters,
      trackRevisions: (a = e.features) == null ? void 0 : a.trackRevisions,
      updateFields: (h = e.features) == null ? void 0 : h.updateFields,
      defaultTabStop: e.defaultTabStop,
      hyphenation: {
        autoHyphenation: (k = e.hyphenation) == null ? void 0 : k.autoHyphenation,
        hyphenationZone: (A = e.hyphenation) == null ? void 0 : A.hyphenationZone,
        consecutiveHyphenLimit: (R = e.hyphenation) == null ? void 0 : R.consecutiveHyphenLimit,
        doNotHyphenateCaps: (I = e.hyphenation) == null ? void 0 : I.doNotHyphenateCaps
      }
    }), this.media = new sd(), e.externalStyles !== void 0) {
      const T = new ai().newInstance((_ = e.styles) == null ? void 0 : _.default), g = new Zd().newInstance(e.externalStyles);
      this.styles = new ii(Ae(me({}, g), {
        importedStyles: [...T.importedStyles, ...g.importedStyles]
      }));
    } else if (e.styles) {
      const T = new ai().newInstance(e.styles.default);
      this.styles = new ii(me(me({}, T), e.styles));
    } else {
      const w = new ai();
      this.styles = new ii(w.newInstance());
    }
    this.addDefaultRelationships();
    for (const w of e.sections)
      this.addSection(w);
    if (e.footnotes)
      for (const w in e.footnotes)
        this.footnotesWrapper.View.createFootNote(parseFloat(w), e.footnotes[w].children);
    if (e.endnotes)
      for (const w in e.endnotes)
        this.endnotesWrapper.View.createEndnote(parseFloat(w), e.endnotes[w].children);
    this.fontWrapper = new Ho((S = e.fonts) != null ? S : []);
  }
  addSection({ headers: e = {}, footers: r = {}, children: n, properties: u }) {
    this.documentWrapper.View.Body.addSection(Ae(me({}, u), {
      headerWrapperGroup: {
        default: e.default ? this.createHeader(e.default) : void 0,
        first: e.first ? this.createHeader(e.first) : void 0,
        even: e.even ? this.createHeader(e.even) : void 0
      },
      footerWrapperGroup: {
        default: r.default ? this.createFooter(r.default) : void 0,
        first: r.first ? this.createFooter(r.first) : void 0,
        even: r.even ? this.createFooter(r.even) : void 0
      }
    }));
    for (const l of n)
      this.documentWrapper.View.add(l);
  }
  createHeader(e) {
    const r = new ad(this.media, this.currentRelationshipId++);
    for (const n of e.options.children)
      r.add(n);
    return this.addHeaderToDocument(r), r;
  }
  createFooter(e) {
    const r = new Zf(this.media, this.currentRelationshipId++);
    for (const n of e.options.children)
      r.add(n);
    return this.addFooterToDocument(r), r;
  }
  addHeaderToDocument(e, r = gt.DEFAULT) {
    this.headers.push({ header: e, type: r }), this.documentWrapper.Relationships.addRelationship(
      e.View.ReferenceId,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header",
      `header${this.headers.length}.xml`
    ), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(e, r = gt.DEFAULT) {
    this.footers.push({ footer: e, type: r }), this.documentWrapper.Relationships.addRelationship(
      e.View.ReferenceId,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer",
      `footer${this.footers.length}.xml`
    ), this.contentTypes.addFooter(this.footers.length);
  }
  addDefaultRelationships() {
    this.fileRelationships.addRelationship(
      1,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      "word/document.xml"
    ), this.fileRelationships.addRelationship(
      2,
      "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
      "docProps/core.xml"
    ), this.fileRelationships.addRelationship(
      3,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
      "docProps/app.xml"
    ), this.fileRelationships.addRelationship(
      4,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
      "docProps/custom.xml"
    ), this.documentWrapper.Relationships.addRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
      "styles.xml"
    ), this.documentWrapper.Relationships.addRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering",
      "numbering.xml"
    ), this.documentWrapper.Relationships.addRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes",
      "footnotes.xml"
    ), this.documentWrapper.Relationships.addRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes",
      "endnotes.xml"
    ), this.documentWrapper.Relationships.addRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings",
      "settings.xml"
    ), this.documentWrapper.Relationships.addRelationship(
      // eslint-disable-next-line functional/immutable-data
      this.currentRelationshipId++,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
      "comments.xml"
    );
  }
  get Document() {
    return this.documentWrapper;
  }
  get Styles() {
    return this.styles;
  }
  get CoreProperties() {
    return this.coreProperties;
  }
  get Numbering() {
    return this.numbering;
  }
  get Media() {
    return this.media;
  }
  get FileRelationships() {
    return this.fileRelationships;
  }
  get Headers() {
    return this.headers.map((e) => e.header);
  }
  get Footers() {
    return this.footers.map((e) => e.footer);
  }
  get ContentTypes() {
    return this.contentTypes;
  }
  get CustomProperties() {
    return this.customProperties;
  }
  get AppProperties() {
    return this.appProperties;
  }
  get FootNotes() {
    return this.footnotesWrapper;
  }
  get Endnotes() {
    return this.endnotesWrapper;
  }
  get Settings() {
    return this.settings;
  }
  get Comments() {
    return this.comments;
  }
  get FontTable() {
    return this.fontWrapper;
  }
}
class Jd extends ae {
  constructor(e = {}) {
    super("w:instrText"), re(this, "properties"), this.properties = e, this.root.push(new lt({ space: ut.PRESERVE }));
    let r = "TOC";
    if (this.properties.captionLabel && (r = `${r} \\a "${this.properties.captionLabel}"`), this.properties.entriesFromBookmark && (r = `${r} \\b "${this.properties.entriesFromBookmark}"`), this.properties.captionLabelIncludingNumbers && (r = `${r} \\c "${this.properties.captionLabelIncludingNumbers}"`), this.properties.sequenceAndPageNumbersSeparator && (r = `${r} \\d "${this.properties.sequenceAndPageNumbersSeparator}"`), this.properties.tcFieldIdentifier && (r = `${r} \\f "${this.properties.tcFieldIdentifier}"`), this.properties.hyperlink && (r = `${r} \\h`), this.properties.tcFieldLevelRange && (r = `${r} \\l "${this.properties.tcFieldLevelRange}"`), this.properties.pageNumbersEntryLevelsRange && (r = `${r} \\n "${this.properties.pageNumbersEntryLevelsRange}"`), this.properties.headingStyleRange && (r = `${r} \\o "${this.properties.headingStyleRange}"`), this.properties.entryAndPageNumberSeparator && (r = `${r} \\p "${this.properties.entryAndPageNumberSeparator}"`), this.properties.seqFieldIdentifierForPrefix && (r = `${r} \\s "${this.properties.seqFieldIdentifierForPrefix}"`), this.properties.stylesWithLevels && this.properties.stylesWithLevels.length) {
      const n = this.properties.stylesWithLevels.map((u) => `${u.styleName},${u.level}`).join(",");
      r = `${r} \\t "${n}"`;
    }
    this.properties.useAppliedParagraphOutlineLevel && (r = `${r} \\u`), this.properties.preserveTabInEntries && (r = `${r} \\w`), this.properties.preserveNewLineInEntries && (r = `${r} \\x`), this.properties.hideTabAndPageNumbersInWebView && (r = `${r} \\z`), this.root.push(r);
  }
}
class Qd extends ae {
  constructor() {
    super("w:sdtContent");
  }
}
class ep extends ae {
  constructor(e) {
    super("w:sdtPr"), e && this.root.push(new Je("w:alias", e));
  }
}
class tp extends Ni {
  constructor(e = "Table of Contents", r = {}) {
    var n = r, {
      contentChildren: u = [],
      cachedEntries: l = [],
      beginDirty: f = !0
    } = n, a = mu(n, [
      "contentChildren",
      "cachedEntries",
      "beginDirty"
    ]);
    super("w:sdt"), this.root.push(new ep(e));
    const h = new Qd(), k = [
      new We({
        children: [Ct(f), new Jd(a), Nt()]
      })
    ], A = [
      new We({
        children: [Ot()]
      })
    ];
    if (l !== void 0 && l.length > 0) {
      const { stylesWithLevels: I } = a, _ = l.map((w, T) => {
        var o, g;
        const m = this.buildCachedContentParagraphChild(w, a), c = (g = (o = I?.find((F) => F.level === w.level)) == null ? void 0 : o.styleName) != null ? g : `TOC${w.level}`, x = T === 0 ? [...k, m] : T === l.length - 1 ? [m, ...A] : [m];
        return new xe({
          style: c,
          tabStops: this.getTabStopsForLevel(w.level),
          children: x
        });
      });
      let S = _;
      l.length <= 1 && (S = [
        ..._,
        new xe({
          children: A
        })
      ]);
      for (const w of S)
        h.addChildElement(w);
    } else {
      const I = new xe({
        children: k
      });
      h.addChildElement(I);
      for (const S of u)
        h.addChildElement(S);
      const _ = new xe({
        children: A
      });
      h.addChildElement(_);
    }
    this.root.push(h);
  }
  getTabStopsForLevel(e, r = 9025) {
    return [
      {
        type: "clear",
        position: r + 1 - (e - 1) * 240
      },
      {
        type: "right",
        position: r,
        leader: "dot"
      }
    ];
  }
  buildCachedContentRun(e, r) {
    var n, u;
    return new We({
      // TODO: The IndexLink style might always need to be set regardless of the hyperlink property. This needs to be verified.
      style: r?.hyperlink && e.href !== void 0 ? "IndexLink" : void 0,
      children: [
        new rr({
          text: e.title
        }),
        new wh(),
        new rr({
          text: (u = (n = e.page) == null ? void 0 : n.toString()) != null ? u : ""
        })
      ]
    });
  }
  buildCachedContentParagraphChild(e, r) {
    const n = this.buildCachedContentRun(e, r);
    return r?.hyperlink && e.href !== void 0 ? new jo({
      anchor: e.href,
      children: [n]
    }) : n;
  }
}
class iu {
  constructor(e = { children: [] }) {
    re(this, "options"), this.options = e;
  }
}
class au {
  constructor(e = { children: [] }) {
    re(this, "options"), this.options = e;
  }
}
class rp extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "w:id"
    });
  }
}
class np extends ae {
  constructor(e) {
    super("w:footnoteReference"), this.root.push(
      new rp({
        id: e
      })
    );
  }
}
class ip extends We {
  /**
   * Creates a new footnote reference run.
   *
   * @param id - Unique identifier linking to the footnote content
   */
  constructor(e) {
    super({ style: "FootnoteReference" }), this.root.push(new np(e));
  }
}
var ap = Ti();
function $t(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var si = { exports: {} }, Us;
function sp() {
  return Us || (Us = 1, (function(t, e) {
    (function(r) {
      t.exports = r();
    })(function() {
      return (function r(n, u, l) {
        function f(k, A) {
          if (!u[k]) {
            if (!n[k]) {
              var R = typeof $t == "function" && $t;
              if (!A && R) return R(k, !0);
              if (a) return a(k, !0);
              var I = new Error("Cannot find module '" + k + "'");
              throw I.code = "MODULE_NOT_FOUND", I;
            }
            var _ = u[k] = { exports: {} };
            n[k][0].call(_.exports, function(S) {
              var w = n[k][1][S];
              return f(w || S);
            }, _, _.exports, r, n, u, l);
          }
          return u[k].exports;
        }
        for (var a = typeof $t == "function" && $t, h = 0; h < l.length; h++) f(l[h]);
        return f;
      })({ 1: [function(r, n, u) {
        var l = r("./utils"), f = r("./support"), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        u.encode = function(h) {
          for (var k, A, R, I, _, S, w, T = [], o = 0, g = h.length, m = g, c = l.getTypeOf(h) !== "string"; o < h.length; ) m = g - o, R = c ? (k = h[o++], A = o < g ? h[o++] : 0, o < g ? h[o++] : 0) : (k = h.charCodeAt(o++), A = o < g ? h.charCodeAt(o++) : 0, o < g ? h.charCodeAt(o++) : 0), I = k >> 2, _ = (3 & k) << 4 | A >> 4, S = 1 < m ? (15 & A) << 2 | R >> 6 : 64, w = 2 < m ? 63 & R : 64, T.push(a.charAt(I) + a.charAt(_) + a.charAt(S) + a.charAt(w));
          return T.join("");
        }, u.decode = function(h) {
          var k, A, R, I, _, S, w = 0, T = 0, o = "data:";
          if (h.substr(0, o.length) === o) throw new Error("Invalid base64 input, it looks like a data url.");
          var g, m = 3 * (h = h.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (h.charAt(h.length - 1) === a.charAt(64) && m--, h.charAt(h.length - 2) === a.charAt(64) && m--, m % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (g = f.uint8array ? new Uint8Array(0 | m) : new Array(0 | m); w < h.length; ) k = a.indexOf(h.charAt(w++)) << 2 | (I = a.indexOf(h.charAt(w++))) >> 4, A = (15 & I) << 4 | (_ = a.indexOf(h.charAt(w++))) >> 2, R = (3 & _) << 6 | (S = a.indexOf(h.charAt(w++))), g[T++] = k, _ !== 64 && (g[T++] = A), S !== 64 && (g[T++] = R);
          return g;
        };
      }, { "./support": 30, "./utils": 32 }], 2: [function(r, n, u) {
        var l = r("./external"), f = r("./stream/DataWorker"), a = r("./stream/Crc32Probe"), h = r("./stream/DataLengthProbe");
        function k(A, R, I, _, S) {
          this.compressedSize = A, this.uncompressedSize = R, this.crc32 = I, this.compression = _, this.compressedContent = S;
        }
        k.prototype = { getContentWorker: function() {
          var A = new f(l.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new h("data_length")), R = this;
          return A.on("end", function() {
            if (this.streamInfo.data_length !== R.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
          }), A;
        }, getCompressedWorker: function() {
          return new f(l.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
        } }, k.createWorkerFrom = function(A, R, I) {
          return A.pipe(new a()).pipe(new h("uncompressedSize")).pipe(R.compressWorker(I)).pipe(new h("compressedSize")).withStreamInfo("compression", R);
        }, n.exports = k;
      }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(r, n, u) {
        var l = r("./stream/GenericWorker");
        u.STORE = { magic: "\0\0", compressWorker: function() {
          return new l("STORE compression");
        }, uncompressWorker: function() {
          return new l("STORE decompression");
        } }, u.DEFLATE = r("./flate");
      }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(r, n, u) {
        var l = r("./utils"), f = (function() {
          for (var a, h = [], k = 0; k < 256; k++) {
            a = k;
            for (var A = 0; A < 8; A++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
            h[k] = a;
          }
          return h;
        })();
        n.exports = function(a, h) {
          return a !== void 0 && a.length ? l.getTypeOf(a) !== "string" ? (function(k, A, R, I) {
            var _ = f, S = I + R;
            k ^= -1;
            for (var w = I; w < S; w++) k = k >>> 8 ^ _[255 & (k ^ A[w])];
            return -1 ^ k;
          })(0 | h, a, a.length, 0) : (function(k, A, R, I) {
            var _ = f, S = I + R;
            k ^= -1;
            for (var w = I; w < S; w++) k = k >>> 8 ^ _[255 & (k ^ A.charCodeAt(w))];
            return -1 ^ k;
          })(0 | h, a, a.length, 0) : 0;
        };
      }, { "./utils": 32 }], 5: [function(r, n, u) {
        u.base64 = !1, u.binary = !1, u.dir = !1, u.createFolders = !0, u.date = null, u.compression = null, u.compressionOptions = null, u.comment = null, u.unixPermissions = null, u.dosPermissions = null;
      }, {}], 6: [function(r, n, u) {
        var l = null;
        l = typeof Promise < "u" ? Promise : r("lie"), n.exports = { Promise: l };
      }, { lie: 37 }], 7: [function(r, n, u) {
        var l = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", f = r("pako"), a = r("./utils"), h = r("./stream/GenericWorker"), k = l ? "uint8array" : "array";
        function A(R, I) {
          h.call(this, "FlateWorker/" + R), this._pako = null, this._pakoAction = R, this._pakoOptions = I, this.meta = {};
        }
        u.magic = "\b\0", a.inherits(A, h), A.prototype.processChunk = function(R) {
          this.meta = R.meta, this._pako === null && this._createPako(), this._pako.push(a.transformTo(k, R.data), !1);
        }, A.prototype.flush = function() {
          h.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
        }, A.prototype.cleanUp = function() {
          h.prototype.cleanUp.call(this), this._pako = null;
        }, A.prototype._createPako = function() {
          this._pako = new f[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
          var R = this;
          this._pako.onData = function(I) {
            R.push({ data: I, meta: R.meta });
          };
        }, u.compressWorker = function(R) {
          return new A("Deflate", R);
        }, u.uncompressWorker = function() {
          return new A("Inflate", {});
        };
      }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(r, n, u) {
        function l(_, S) {
          var w, T = "";
          for (w = 0; w < S; w++) T += String.fromCharCode(255 & _), _ >>>= 8;
          return T;
        }
        function f(_, S, w, T, o, g) {
          var m, c, x = _.file, F = _.compression, B = g !== k.utf8encode, z = a.transformTo("string", g(x.name)), C = a.transformTo("string", k.utf8encode(x.name)), $ = x.comment, le = a.transformTo("string", g($)), N = a.transformTo("string", k.utf8encode($)), U = C.length !== x.name.length, v = N.length !== $.length, K = "", ee = "", H = "", ie = x.dir, Q = x.date, ce = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
          S && !w || (ce.crc32 = _.crc32, ce.compressedSize = _.compressedSize, ce.uncompressedSize = _.uncompressedSize);
          var V = 0;
          S && (V |= 8), B || !U && !v || (V |= 2048);
          var P = 0, X = 0;
          ie && (P |= 16), o === "UNIX" ? (X = 798, P |= (function(te, G) {
            var b = te;
            return te || (b = G ? 16893 : 33204), (65535 & b) << 16;
          })(x.unixPermissions, ie)) : (X = 20, P |= (function(te) {
            return 63 & (te || 0);
          })(x.dosPermissions)), m = Q.getUTCHours(), m <<= 6, m |= Q.getUTCMinutes(), m <<= 5, m |= Q.getUTCSeconds() / 2, c = Q.getUTCFullYear() - 1980, c <<= 4, c |= Q.getUTCMonth() + 1, c <<= 5, c |= Q.getUTCDate(), U && (ee = l(1, 1) + l(A(z), 4) + C, K += "up" + l(ee.length, 2) + ee), v && (H = l(1, 1) + l(A(le), 4) + N, K += "uc" + l(H.length, 2) + H);
          var Z = "";
          return Z += `
\0`, Z += l(V, 2), Z += F.magic, Z += l(m, 2), Z += l(c, 2), Z += l(ce.crc32, 4), Z += l(ce.compressedSize, 4), Z += l(ce.uncompressedSize, 4), Z += l(z.length, 2), Z += l(K.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + Z + z + K, dirRecord: R.CENTRAL_FILE_HEADER + l(X, 2) + Z + l(le.length, 2) + "\0\0\0\0" + l(P, 4) + l(T, 4) + z + K + le };
        }
        var a = r("../utils"), h = r("../stream/GenericWorker"), k = r("../utf8"), A = r("../crc32"), R = r("../signature");
        function I(_, S, w, T) {
          h.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = S, this.zipPlatform = w, this.encodeFileName = T, this.streamFiles = _, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        a.inherits(I, h), I.prototype.push = function(_) {
          var S = _.meta.percent || 0, w = this.entriesCount, T = this._sources.length;
          this.accumulate ? this.contentBuffer.push(_) : (this.bytesWritten += _.data.length, h.prototype.push.call(this, { data: _.data, meta: { currentFile: this.currentFile, percent: w ? (S + 100 * (w - T - 1)) / w : 100 } }));
        }, I.prototype.openedSource = function(_) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = _.file.name;
          var S = this.streamFiles && !_.file.dir;
          if (S) {
            var w = f(_, S, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({ data: w.fileRecord, meta: { percent: 0 } });
          } else this.accumulate = !0;
        }, I.prototype.closedSource = function(_) {
          this.accumulate = !1;
          var S = this.streamFiles && !_.file.dir, w = f(_, S, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(w.dirRecord), S) this.push({ data: (function(T) {
            return R.DATA_DESCRIPTOR + l(T.crc32, 4) + l(T.compressedSize, 4) + l(T.uncompressedSize, 4);
          })(_), meta: { percent: 100 } });
          else for (this.push({ data: w.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, I.prototype.flush = function() {
          for (var _ = this.bytesWritten, S = 0; S < this.dirRecords.length; S++) this.push({ data: this.dirRecords[S], meta: { percent: 100 } });
          var w = this.bytesWritten - _, T = (function(o, g, m, c, x) {
            var F = a.transformTo("string", x(c));
            return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + l(o, 2) + l(o, 2) + l(g, 4) + l(m, 4) + l(F.length, 2) + F;
          })(this.dirRecords.length, w, _, this.zipComment, this.encodeFileName);
          this.push({ data: T, meta: { percent: 100 } });
        }, I.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, I.prototype.registerPrevious = function(_) {
          this._sources.push(_);
          var S = this;
          return _.on("data", function(w) {
            S.processChunk(w);
          }), _.on("end", function() {
            S.closedSource(S.previous.streamInfo), S._sources.length ? S.prepareNextSource() : S.end();
          }), _.on("error", function(w) {
            S.error(w);
          }), this;
        }, I.prototype.resume = function() {
          return !!h.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
        }, I.prototype.error = function(_) {
          var S = this._sources;
          if (!h.prototype.error.call(this, _)) return !1;
          for (var w = 0; w < S.length; w++) try {
            S[w].error(_);
          } catch {
          }
          return !0;
        }, I.prototype.lock = function() {
          h.prototype.lock.call(this);
          for (var _ = this._sources, S = 0; S < _.length; S++) _[S].lock();
        }, n.exports = I;
      }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(r, n, u) {
        var l = r("../compressions"), f = r("./ZipFileWorker");
        u.generateWorker = function(a, h, k) {
          var A = new f(h.streamFiles, k, h.platform, h.encodeFileName), R = 0;
          try {
            a.forEach(function(I, _) {
              R++;
              var S = (function(g, m) {
                var c = g || m, x = l[c];
                if (!x) throw new Error(c + " is not a valid compression method !");
                return x;
              })(_.options.compression, h.compression), w = _.options.compressionOptions || h.compressionOptions || {}, T = _.dir, o = _.date;
              _._compressWorker(S, w).withStreamInfo("file", { name: I, dir: T, date: o, comment: _.comment || "", unixPermissions: _.unixPermissions, dosPermissions: _.dosPermissions }).pipe(A);
            }), A.entriesCount = R;
          } catch (I) {
            A.error(I);
          }
          return A;
        };
      }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(r, n, u) {
        function l() {
          if (!(this instanceof l)) return new l();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var f = new l();
            for (var a in this) typeof this[a] != "function" && (f[a] = this[a]);
            return f;
          };
        }
        (l.prototype = r("./object")).loadAsync = r("./load"), l.support = r("./support"), l.defaults = r("./defaults"), l.version = "3.10.1", l.loadAsync = function(f, a) {
          return new l().loadAsync(f, a);
        }, l.external = r("./external"), n.exports = l;
      }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(r, n, u) {
        var l = r("./utils"), f = r("./external"), a = r("./utf8"), h = r("./zipEntries"), k = r("./stream/Crc32Probe"), A = r("./nodejsUtils");
        function R(I) {
          return new f.Promise(function(_, S) {
            var w = I.decompressed.getContentWorker().pipe(new k());
            w.on("error", function(T) {
              S(T);
            }).on("end", function() {
              w.streamInfo.crc32 !== I.decompressed.crc32 ? S(new Error("Corrupted zip : CRC32 mismatch")) : _();
            }).resume();
          });
        }
        n.exports = function(I, _) {
          var S = this;
          return _ = l.extend(_ || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: a.utf8decode }), A.isNode && A.isStream(I) ? f.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : l.prepareContent("the loaded zip file", I, !0, _.optimizedBinaryString, _.base64).then(function(w) {
            var T = new h(_);
            return T.load(w), T;
          }).then(function(w) {
            var T = [f.Promise.resolve(w)], o = w.files;
            if (_.checkCRC32) for (var g = 0; g < o.length; g++) T.push(R(o[g]));
            return f.Promise.all(T);
          }).then(function(w) {
            for (var T = w.shift(), o = T.files, g = 0; g < o.length; g++) {
              var m = o[g], c = m.fileNameStr, x = l.resolve(m.fileNameStr);
              S.file(x, m.decompressed, { binary: !0, optimizedBinaryString: !0, date: m.date, dir: m.dir, comment: m.fileCommentStr.length ? m.fileCommentStr : null, unixPermissions: m.unixPermissions, dosPermissions: m.dosPermissions, createFolders: _.createFolders }), m.dir || (S.file(x).unsafeOriginalName = c);
            }
            return T.zipComment.length && (S.comment = T.zipComment), S;
          });
        };
      }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(r, n, u) {
        var l = r("../utils"), f = r("../stream/GenericWorker");
        function a(h, k) {
          f.call(this, "Nodejs stream input adapter for " + h), this._upstreamEnded = !1, this._bindStream(k);
        }
        l.inherits(a, f), a.prototype._bindStream = function(h) {
          var k = this;
          (this._stream = h).pause(), h.on("data", function(A) {
            k.push({ data: A, meta: { percent: 0 } });
          }).on("error", function(A) {
            k.isPaused ? this.generatedError = A : k.error(A);
          }).on("end", function() {
            k.isPaused ? k._upstreamEnded = !0 : k.end();
          });
        }, a.prototype.pause = function() {
          return !!f.prototype.pause.call(this) && (this._stream.pause(), !0);
        }, a.prototype.resume = function() {
          return !!f.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
        }, n.exports = a;
      }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(r, n, u) {
        var l = r("readable-stream").Readable;
        function f(a, h, k) {
          l.call(this, h), this._helper = a;
          var A = this;
          a.on("data", function(R, I) {
            A.push(R) || A._helper.pause(), k && k(I);
          }).on("error", function(R) {
            A.emit("error", R);
          }).on("end", function() {
            A.push(null);
          });
        }
        r("../utils").inherits(f, l), f.prototype._read = function() {
          this._helper.resume();
        }, n.exports = f;
      }, { "../utils": 32, "readable-stream": 16 }], 14: [function(r, n, u) {
        n.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(l, f) {
          if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(l, f);
          if (typeof l == "number") throw new Error('The "data" argument must not be a number');
          return new Buffer(l, f);
        }, allocBuffer: function(l) {
          if (Buffer.alloc) return Buffer.alloc(l);
          var f = new Buffer(l);
          return f.fill(0), f;
        }, isBuffer: function(l) {
          return Buffer.isBuffer(l);
        }, isStream: function(l) {
          return l && typeof l.on == "function" && typeof l.pause == "function" && typeof l.resume == "function";
        } };
      }, {}], 15: [function(r, n, u) {
        function l(x, F, B) {
          var z, C = a.getTypeOf(F), $ = a.extend(B || {}, A);
          $.date = $.date || /* @__PURE__ */ new Date(), $.compression !== null && ($.compression = $.compression.toUpperCase()), typeof $.unixPermissions == "string" && ($.unixPermissions = parseInt($.unixPermissions, 8)), $.unixPermissions && 16384 & $.unixPermissions && ($.dir = !0), $.dosPermissions && 16 & $.dosPermissions && ($.dir = !0), $.dir && (x = o(x)), $.createFolders && (z = T(x)) && g.call(this, z, !0);
          var le = C === "string" && $.binary === !1 && $.base64 === !1;
          B && B.binary !== void 0 || ($.binary = !le), (F instanceof R && F.uncompressedSize === 0 || $.dir || !F || F.length === 0) && ($.base64 = !1, $.binary = !0, F = "", $.compression = "STORE", C = "string");
          var N = null;
          N = F instanceof R || F instanceof h ? F : S.isNode && S.isStream(F) ? new w(x, F) : a.prepareContent(x, F, $.binary, $.optimizedBinaryString, $.base64);
          var U = new I(x, N, $);
          this.files[x] = U;
        }
        var f = r("./utf8"), a = r("./utils"), h = r("./stream/GenericWorker"), k = r("./stream/StreamHelper"), A = r("./defaults"), R = r("./compressedObject"), I = r("./zipObject"), _ = r("./generate"), S = r("./nodejsUtils"), w = r("./nodejs/NodejsStreamInputAdapter"), T = function(x) {
          x.slice(-1) === "/" && (x = x.substring(0, x.length - 1));
          var F = x.lastIndexOf("/");
          return 0 < F ? x.substring(0, F) : "";
        }, o = function(x) {
          return x.slice(-1) !== "/" && (x += "/"), x;
        }, g = function(x, F) {
          return F = F !== void 0 ? F : A.createFolders, x = o(x), this.files[x] || l.call(this, x, null, { dir: !0, createFolders: F }), this.files[x];
        };
        function m(x) {
          return Object.prototype.toString.call(x) === "[object RegExp]";
        }
        var c = { load: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, forEach: function(x) {
          var F, B, z;
          for (F in this.files) z = this.files[F], (B = F.slice(this.root.length, F.length)) && F.slice(0, this.root.length) === this.root && x(B, z);
        }, filter: function(x) {
          var F = [];
          return this.forEach(function(B, z) {
            x(B, z) && F.push(z);
          }), F;
        }, file: function(x, F, B) {
          if (arguments.length !== 1) return x = this.root + x, l.call(this, x, F, B), this;
          if (m(x)) {
            var z = x;
            return this.filter(function($, le) {
              return !le.dir && z.test($);
            });
          }
          var C = this.files[this.root + x];
          return C && !C.dir ? C : null;
        }, folder: function(x) {
          if (!x) return this;
          if (m(x)) return this.filter(function(C, $) {
            return $.dir && x.test(C);
          });
          var F = this.root + x, B = g.call(this, F), z = this.clone();
          return z.root = B.name, z;
        }, remove: function(x) {
          x = this.root + x;
          var F = this.files[x];
          if (F || (x.slice(-1) !== "/" && (x += "/"), F = this.files[x]), F && !F.dir) delete this.files[x];
          else for (var B = this.filter(function(C, $) {
            return $.name.slice(0, x.length) === x;
          }), z = 0; z < B.length; z++) delete this.files[B[z].name];
          return this;
        }, generate: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, generateInternalStream: function(x) {
          var F, B = {};
          try {
            if ((B = a.extend(x || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: f.utf8encode })).type = B.type.toLowerCase(), B.compression = B.compression.toUpperCase(), B.type === "binarystring" && (B.type = "string"), !B.type) throw new Error("No output type specified.");
            a.checkSupport(B.type), B.platform !== "darwin" && B.platform !== "freebsd" && B.platform !== "linux" && B.platform !== "sunos" || (B.platform = "UNIX"), B.platform === "win32" && (B.platform = "DOS");
            var z = B.comment || this.comment || "";
            F = _.generateWorker(this, B, z);
          } catch (C) {
            (F = new h("error")).error(C);
          }
          return new k(F, B.type || "string", B.mimeType);
        }, generateAsync: function(x, F) {
          return this.generateInternalStream(x).accumulate(F);
        }, generateNodeStream: function(x, F) {
          return (x = x || {}).type || (x.type = "nodebuffer"), this.generateInternalStream(x).toNodejsStream(F);
        } };
        n.exports = c;
      }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(r, n, u) {
        n.exports = r("stream");
      }, { stream: void 0 }], 17: [function(r, n, u) {
        var l = r("./DataReader");
        function f(a) {
          l.call(this, a);
          for (var h = 0; h < this.data.length; h++) a[h] = 255 & a[h];
        }
        r("../utils").inherits(f, l), f.prototype.byteAt = function(a) {
          return this.data[this.zero + a];
        }, f.prototype.lastIndexOfSignature = function(a) {
          for (var h = a.charCodeAt(0), k = a.charCodeAt(1), A = a.charCodeAt(2), R = a.charCodeAt(3), I = this.length - 4; 0 <= I; --I) if (this.data[I] === h && this.data[I + 1] === k && this.data[I + 2] === A && this.data[I + 3] === R) return I - this.zero;
          return -1;
        }, f.prototype.readAndCheckSignature = function(a) {
          var h = a.charCodeAt(0), k = a.charCodeAt(1), A = a.charCodeAt(2), R = a.charCodeAt(3), I = this.readData(4);
          return h === I[0] && k === I[1] && A === I[2] && R === I[3];
        }, f.prototype.readData = function(a) {
          if (this.checkOffset(a), a === 0) return [];
          var h = this.data.slice(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, h;
        }, n.exports = f;
      }, { "../utils": 32, "./DataReader": 18 }], 18: [function(r, n, u) {
        var l = r("../utils");
        function f(a) {
          this.data = a, this.length = a.length, this.index = 0, this.zero = 0;
        }
        f.prototype = { checkOffset: function(a) {
          this.checkIndex(this.index + a);
        }, checkIndex: function(a) {
          if (this.length < this.zero + a || a < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?");
        }, setIndex: function(a) {
          this.checkIndex(a), this.index = a;
        }, skip: function(a) {
          this.setIndex(this.index + a);
        }, byteAt: function() {
        }, readInt: function(a) {
          var h, k = 0;
          for (this.checkOffset(a), h = this.index + a - 1; h >= this.index; h--) k = (k << 8) + this.byteAt(h);
          return this.index += a, k;
        }, readString: function(a) {
          return l.transformTo("string", this.readData(a));
        }, readData: function() {
        }, lastIndexOfSignature: function() {
        }, readAndCheckSignature: function() {
        }, readDate: function() {
          var a = this.readInt(4);
          return new Date(Date.UTC(1980 + (a >> 25 & 127), (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1));
        } }, n.exports = f;
      }, { "../utils": 32 }], 19: [function(r, n, u) {
        var l = r("./Uint8ArrayReader");
        function f(a) {
          l.call(this, a);
        }
        r("../utils").inherits(f, l), f.prototype.readData = function(a) {
          this.checkOffset(a);
          var h = this.data.slice(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, h;
        }, n.exports = f;
      }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(r, n, u) {
        var l = r("./DataReader");
        function f(a) {
          l.call(this, a);
        }
        r("../utils").inherits(f, l), f.prototype.byteAt = function(a) {
          return this.data.charCodeAt(this.zero + a);
        }, f.prototype.lastIndexOfSignature = function(a) {
          return this.data.lastIndexOf(a) - this.zero;
        }, f.prototype.readAndCheckSignature = function(a) {
          return a === this.readData(4);
        }, f.prototype.readData = function(a) {
          this.checkOffset(a);
          var h = this.data.slice(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, h;
        }, n.exports = f;
      }, { "../utils": 32, "./DataReader": 18 }], 21: [function(r, n, u) {
        var l = r("./ArrayReader");
        function f(a) {
          l.call(this, a);
        }
        r("../utils").inherits(f, l), f.prototype.readData = function(a) {
          if (this.checkOffset(a), a === 0) return new Uint8Array(0);
          var h = this.data.subarray(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, h;
        }, n.exports = f;
      }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(r, n, u) {
        var l = r("../utils"), f = r("../support"), a = r("./ArrayReader"), h = r("./StringReader"), k = r("./NodeBufferReader"), A = r("./Uint8ArrayReader");
        n.exports = function(R) {
          var I = l.getTypeOf(R);
          return l.checkSupport(I), I !== "string" || f.uint8array ? I === "nodebuffer" ? new k(R) : f.uint8array ? new A(l.transformTo("uint8array", R)) : new a(l.transformTo("array", R)) : new h(R);
        };
      }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(r, n, u) {
        u.LOCAL_FILE_HEADER = "PK", u.CENTRAL_FILE_HEADER = "PK", u.CENTRAL_DIRECTORY_END = "PK", u.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", u.ZIP64_CENTRAL_DIRECTORY_END = "PK", u.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}], 24: [function(r, n, u) {
        var l = r("./GenericWorker"), f = r("../utils");
        function a(h) {
          l.call(this, "ConvertWorker to " + h), this.destType = h;
        }
        f.inherits(a, l), a.prototype.processChunk = function(h) {
          this.push({ data: f.transformTo(this.destType, h.data), meta: h.meta });
        }, n.exports = a;
      }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(r, n, u) {
        var l = r("./GenericWorker"), f = r("../crc32");
        function a() {
          l.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        r("../utils").inherits(a, l), a.prototype.processChunk = function(h) {
          this.streamInfo.crc32 = f(h.data, this.streamInfo.crc32 || 0), this.push(h);
        }, n.exports = a;
      }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(r, n, u) {
        var l = r("../utils"), f = r("./GenericWorker");
        function a(h) {
          f.call(this, "DataLengthProbe for " + h), this.propName = h, this.withStreamInfo(h, 0);
        }
        l.inherits(a, f), a.prototype.processChunk = function(h) {
          if (h) {
            var k = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = k + h.data.length;
          }
          f.prototype.processChunk.call(this, h);
        }, n.exports = a;
      }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(r, n, u) {
        var l = r("../utils"), f = r("./GenericWorker");
        function a(h) {
          f.call(this, "DataWorker");
          var k = this;
          this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, h.then(function(A) {
            k.dataIsReady = !0, k.data = A, k.max = A && A.length || 0, k.type = l.getTypeOf(A), k.isPaused || k._tickAndRepeat();
          }, function(A) {
            k.error(A);
          });
        }
        l.inherits(a, f), a.prototype.cleanUp = function() {
          f.prototype.cleanUp.call(this), this.data = null;
        }, a.prototype.resume = function() {
          return !!f.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, l.delay(this._tickAndRepeat, [], this)), !0);
        }, a.prototype._tickAndRepeat = function() {
          this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (l.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
        }, a.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return !1;
          var h = null, k = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              h = this.data.substring(this.index, k);
              break;
            case "uint8array":
              h = this.data.subarray(this.index, k);
              break;
            case "array":
            case "nodebuffer":
              h = this.data.slice(this.index, k);
          }
          return this.index = k, this.push({ data: h, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
        }, n.exports = a;
      }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(r, n, u) {
        function l(f) {
          this.name = f || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
        }
        l.prototype = { push: function(f) {
          this.emit("data", f);
        }, end: function() {
          if (this.isFinished) return !1;
          this.flush();
          try {
            this.emit("end"), this.cleanUp(), this.isFinished = !0;
          } catch (f) {
            this.emit("error", f);
          }
          return !0;
        }, error: function(f) {
          return !this.isFinished && (this.isPaused ? this.generatedError = f : (this.isFinished = !0, this.emit("error", f), this.previous && this.previous.error(f), this.cleanUp()), !0);
        }, on: function(f, a) {
          return this._listeners[f].push(a), this;
        }, cleanUp: function() {
          this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
        }, emit: function(f, a) {
          if (this._listeners[f]) for (var h = 0; h < this._listeners[f].length; h++) this._listeners[f][h].call(this, a);
        }, pipe: function(f) {
          return f.registerPrevious(this);
        }, registerPrevious: function(f) {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.streamInfo = f.streamInfo, this.mergeStreamInfo(), this.previous = f;
          var a = this;
          return f.on("data", function(h) {
            a.processChunk(h);
          }), f.on("end", function() {
            a.end();
          }), f.on("error", function(h) {
            a.error(h);
          }), this;
        }, pause: function() {
          return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
        }, resume: function() {
          if (!this.isPaused || this.isFinished) return !1;
          var f = this.isPaused = !1;
          return this.generatedError && (this.error(this.generatedError), f = !0), this.previous && this.previous.resume(), !f;
        }, flush: function() {
        }, processChunk: function(f) {
          this.push(f);
        }, withStreamInfo: function(f, a) {
          return this.extraStreamInfo[f] = a, this.mergeStreamInfo(), this;
        }, mergeStreamInfo: function() {
          for (var f in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, f) && (this.streamInfo[f] = this.extraStreamInfo[f]);
        }, lock: function() {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.isLocked = !0, this.previous && this.previous.lock();
        }, toString: function() {
          var f = "Worker " + this.name;
          return this.previous ? this.previous + " -> " + f : f;
        } }, n.exports = l;
      }, {}], 29: [function(r, n, u) {
        var l = r("../utils"), f = r("./ConvertWorker"), a = r("./GenericWorker"), h = r("../base64"), k = r("../support"), A = r("../external"), R = null;
        if (k.nodestream) try {
          R = r("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function I(S, w) {
          return new A.Promise(function(T, o) {
            var g = [], m = S._internalType, c = S._outputType, x = S._mimeType;
            S.on("data", function(F, B) {
              g.push(F), w && w(B);
            }).on("error", function(F) {
              g = [], o(F);
            }).on("end", function() {
              try {
                var F = (function(B, z, C) {
                  switch (B) {
                    case "blob":
                      return l.newBlob(l.transformTo("arraybuffer", z), C);
                    case "base64":
                      return h.encode(z);
                    default:
                      return l.transformTo(B, z);
                  }
                })(c, (function(B, z) {
                  var C, $ = 0, le = null, N = 0;
                  for (C = 0; C < z.length; C++) N += z[C].length;
                  switch (B) {
                    case "string":
                      return z.join("");
                    case "array":
                      return Array.prototype.concat.apply([], z);
                    case "uint8array":
                      for (le = new Uint8Array(N), C = 0; C < z.length; C++) le.set(z[C], $), $ += z[C].length;
                      return le;
                    case "nodebuffer":
                      return Buffer.concat(z);
                    default:
                      throw new Error("concat : unsupported type '" + B + "'");
                  }
                })(m, g), x);
                T(F);
              } catch (B) {
                o(B);
              }
              g = [];
            }).resume();
          });
        }
        function _(S, w, T) {
          var o = w;
          switch (w) {
            case "blob":
            case "arraybuffer":
              o = "uint8array";
              break;
            case "base64":
              o = "string";
          }
          try {
            this._internalType = o, this._outputType = w, this._mimeType = T, l.checkSupport(o), this._worker = S.pipe(new f(o)), S.lock();
          } catch (g) {
            this._worker = new a("error"), this._worker.error(g);
          }
        }
        _.prototype = { accumulate: function(S) {
          return I(this, S);
        }, on: function(S, w) {
          var T = this;
          return S === "data" ? this._worker.on(S, function(o) {
            w.call(T, o.data, o.meta);
          }) : this._worker.on(S, function() {
            l.delay(w, arguments, T);
          }), this;
        }, resume: function() {
          return l.delay(this._worker.resume, [], this._worker), this;
        }, pause: function() {
          return this._worker.pause(), this;
        }, toNodejsStream: function(S) {
          if (l.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
          return new R(this, { objectMode: this._outputType !== "nodebuffer" }, S);
        } }, n.exports = _;
      }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(r, n, u) {
        if (u.base64 = !0, u.array = !0, u.string = !0, u.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", u.nodebuffer = typeof Buffer < "u", u.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") u.blob = !1;
        else {
          var l = new ArrayBuffer(0);
          try {
            u.blob = new Blob([l], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var f = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              f.append(l), u.blob = f.getBlob("application/zip").size === 0;
            } catch {
              u.blob = !1;
            }
          }
        }
        try {
          u.nodestream = !!r("readable-stream").Readable;
        } catch {
          u.nodestream = !1;
        }
      }, { "readable-stream": 16 }], 31: [function(r, n, u) {
        for (var l = r("./utils"), f = r("./support"), a = r("./nodejsUtils"), h = r("./stream/GenericWorker"), k = new Array(256), A = 0; A < 256; A++) k[A] = 252 <= A ? 6 : 248 <= A ? 5 : 240 <= A ? 4 : 224 <= A ? 3 : 192 <= A ? 2 : 1;
        k[254] = k[254] = 1;
        function R() {
          h.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function I() {
          h.call(this, "utf-8 encode");
        }
        u.utf8encode = function(_) {
          return f.nodebuffer ? a.newBufferFrom(_, "utf-8") : (function(S) {
            var w, T, o, g, m, c = S.length, x = 0;
            for (g = 0; g < c; g++) (64512 & (T = S.charCodeAt(g))) == 55296 && g + 1 < c && (64512 & (o = S.charCodeAt(g + 1))) == 56320 && (T = 65536 + (T - 55296 << 10) + (o - 56320), g++), x += T < 128 ? 1 : T < 2048 ? 2 : T < 65536 ? 3 : 4;
            for (w = f.uint8array ? new Uint8Array(x) : new Array(x), g = m = 0; m < x; g++) (64512 & (T = S.charCodeAt(g))) == 55296 && g + 1 < c && (64512 & (o = S.charCodeAt(g + 1))) == 56320 && (T = 65536 + (T - 55296 << 10) + (o - 56320), g++), T < 128 ? w[m++] = T : (T < 2048 ? w[m++] = 192 | T >>> 6 : (T < 65536 ? w[m++] = 224 | T >>> 12 : (w[m++] = 240 | T >>> 18, w[m++] = 128 | T >>> 12 & 63), w[m++] = 128 | T >>> 6 & 63), w[m++] = 128 | 63 & T);
            return w;
          })(_);
        }, u.utf8decode = function(_) {
          return f.nodebuffer ? l.transformTo("nodebuffer", _).toString("utf-8") : (function(S) {
            var w, T, o, g, m = S.length, c = new Array(2 * m);
            for (w = T = 0; w < m; ) if ((o = S[w++]) < 128) c[T++] = o;
            else if (4 < (g = k[o])) c[T++] = 65533, w += g - 1;
            else {
              for (o &= g === 2 ? 31 : g === 3 ? 15 : 7; 1 < g && w < m; ) o = o << 6 | 63 & S[w++], g--;
              1 < g ? c[T++] = 65533 : o < 65536 ? c[T++] = o : (o -= 65536, c[T++] = 55296 | o >> 10 & 1023, c[T++] = 56320 | 1023 & o);
            }
            return c.length !== T && (c.subarray ? c = c.subarray(0, T) : c.length = T), l.applyFromCharCode(c);
          })(_ = l.transformTo(f.uint8array ? "uint8array" : "array", _));
        }, l.inherits(R, h), R.prototype.processChunk = function(_) {
          var S = l.transformTo(f.uint8array ? "uint8array" : "array", _.data);
          if (this.leftOver && this.leftOver.length) {
            if (f.uint8array) {
              var w = S;
              (S = new Uint8Array(w.length + this.leftOver.length)).set(this.leftOver, 0), S.set(w, this.leftOver.length);
            } else S = this.leftOver.concat(S);
            this.leftOver = null;
          }
          var T = (function(g, m) {
            var c;
            for ((m = m || g.length) > g.length && (m = g.length), c = m - 1; 0 <= c && (192 & g[c]) == 128; ) c--;
            return c < 0 || c === 0 ? m : c + k[g[c]] > m ? c : m;
          })(S), o = S;
          T !== S.length && (f.uint8array ? (o = S.subarray(0, T), this.leftOver = S.subarray(T, S.length)) : (o = S.slice(0, T), this.leftOver = S.slice(T, S.length))), this.push({ data: u.utf8decode(o), meta: _.meta });
        }, R.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({ data: u.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
        }, u.Utf8DecodeWorker = R, l.inherits(I, h), I.prototype.processChunk = function(_) {
          this.push({ data: u.utf8encode(_.data), meta: _.meta });
        }, u.Utf8EncodeWorker = I;
      }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(r, n, u) {
        var l = r("./support"), f = r("./base64"), a = r("./nodejsUtils"), h = r("./external");
        function k(w) {
          return w;
        }
        function A(w, T) {
          for (var o = 0; o < w.length; ++o) T[o] = 255 & w.charCodeAt(o);
          return T;
        }
        r("setimmediate"), u.newBlob = function(w, T) {
          u.checkSupport("blob");
          try {
            return new Blob([w], { type: T });
          } catch {
            try {
              var o = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return o.append(w), o.getBlob(T);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var R = { stringifyByChunk: function(w, T, o) {
          var g = [], m = 0, c = w.length;
          if (c <= o) return String.fromCharCode.apply(null, w);
          for (; m < c; ) T === "array" || T === "nodebuffer" ? g.push(String.fromCharCode.apply(null, w.slice(m, Math.min(m + o, c)))) : g.push(String.fromCharCode.apply(null, w.subarray(m, Math.min(m + o, c)))), m += o;
          return g.join("");
        }, stringifyByChar: function(w) {
          for (var T = "", o = 0; o < w.length; o++) T += String.fromCharCode(w[o]);
          return T;
        }, applyCanBeUsed: { uint8array: (function() {
          try {
            return l.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
          } catch {
            return !1;
          }
        })(), nodebuffer: (function() {
          try {
            return l.nodebuffer && String.fromCharCode.apply(null, a.allocBuffer(1)).length === 1;
          } catch {
            return !1;
          }
        })() } };
        function I(w) {
          var T = 65536, o = u.getTypeOf(w), g = !0;
          if (o === "uint8array" ? g = R.applyCanBeUsed.uint8array : o === "nodebuffer" && (g = R.applyCanBeUsed.nodebuffer), g) for (; 1 < T; ) try {
            return R.stringifyByChunk(w, o, T);
          } catch {
            T = Math.floor(T / 2);
          }
          return R.stringifyByChar(w);
        }
        function _(w, T) {
          for (var o = 0; o < w.length; o++) T[o] = w[o];
          return T;
        }
        u.applyFromCharCode = I;
        var S = {};
        S.string = { string: k, array: function(w) {
          return A(w, new Array(w.length));
        }, arraybuffer: function(w) {
          return S.string.uint8array(w).buffer;
        }, uint8array: function(w) {
          return A(w, new Uint8Array(w.length));
        }, nodebuffer: function(w) {
          return A(w, a.allocBuffer(w.length));
        } }, S.array = { string: I, array: k, arraybuffer: function(w) {
          return new Uint8Array(w).buffer;
        }, uint8array: function(w) {
          return new Uint8Array(w);
        }, nodebuffer: function(w) {
          return a.newBufferFrom(w);
        } }, S.arraybuffer = { string: function(w) {
          return I(new Uint8Array(w));
        }, array: function(w) {
          return _(new Uint8Array(w), new Array(w.byteLength));
        }, arraybuffer: k, uint8array: function(w) {
          return new Uint8Array(w);
        }, nodebuffer: function(w) {
          return a.newBufferFrom(new Uint8Array(w));
        } }, S.uint8array = { string: I, array: function(w) {
          return _(w, new Array(w.length));
        }, arraybuffer: function(w) {
          return w.buffer;
        }, uint8array: k, nodebuffer: function(w) {
          return a.newBufferFrom(w);
        } }, S.nodebuffer = { string: I, array: function(w) {
          return _(w, new Array(w.length));
        }, arraybuffer: function(w) {
          return S.nodebuffer.uint8array(w).buffer;
        }, uint8array: function(w) {
          return _(w, new Uint8Array(w.length));
        }, nodebuffer: k }, u.transformTo = function(w, T) {
          if (T = T || "", !w) return T;
          u.checkSupport(w);
          var o = u.getTypeOf(T);
          return S[o][w](T);
        }, u.resolve = function(w) {
          for (var T = w.split("/"), o = [], g = 0; g < T.length; g++) {
            var m = T[g];
            m === "." || m === "" && g !== 0 && g !== T.length - 1 || (m === ".." ? o.pop() : o.push(m));
          }
          return o.join("/");
        }, u.getTypeOf = function(w) {
          return typeof w == "string" ? "string" : Object.prototype.toString.call(w) === "[object Array]" ? "array" : l.nodebuffer && a.isBuffer(w) ? "nodebuffer" : l.uint8array && w instanceof Uint8Array ? "uint8array" : l.arraybuffer && w instanceof ArrayBuffer ? "arraybuffer" : void 0;
        }, u.checkSupport = function(w) {
          if (!l[w.toLowerCase()]) throw new Error(w + " is not supported by this platform");
        }, u.MAX_VALUE_16BITS = 65535, u.MAX_VALUE_32BITS = -1, u.pretty = function(w) {
          var T, o, g = "";
          for (o = 0; o < (w || "").length; o++) g += "\\x" + ((T = w.charCodeAt(o)) < 16 ? "0" : "") + T.toString(16).toUpperCase();
          return g;
        }, u.delay = function(w, T, o) {
          setImmediate(function() {
            w.apply(o || null, T || []);
          });
        }, u.inherits = function(w, T) {
          function o() {
          }
          o.prototype = T.prototype, w.prototype = new o();
        }, u.extend = function() {
          var w, T, o = {};
          for (w = 0; w < arguments.length; w++) for (T in arguments[w]) Object.prototype.hasOwnProperty.call(arguments[w], T) && o[T] === void 0 && (o[T] = arguments[w][T]);
          return o;
        }, u.prepareContent = function(w, T, o, g, m) {
          return h.Promise.resolve(T).then(function(c) {
            return l.blob && (c instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(c)) !== -1) && typeof FileReader < "u" ? new h.Promise(function(x, F) {
              var B = new FileReader();
              B.onload = function(z) {
                x(z.target.result);
              }, B.onerror = function(z) {
                F(z.target.error);
              }, B.readAsArrayBuffer(c);
            }) : c;
          }).then(function(c) {
            var x = u.getTypeOf(c);
            return x ? (x === "arraybuffer" ? c = u.transformTo("uint8array", c) : x === "string" && (m ? c = f.decode(c) : o && g !== !0 && (c = (function(F) {
              return A(F, l.uint8array ? new Uint8Array(F.length) : new Array(F.length));
            })(c))), c) : h.Promise.reject(new Error("Can't read the data of '" + w + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(r, n, u) {
        var l = r("./reader/readerFor"), f = r("./utils"), a = r("./signature"), h = r("./zipEntry"), k = r("./support");
        function A(R) {
          this.files = [], this.loadOptions = R;
        }
        A.prototype = { checkSignature: function(R) {
          if (!this.reader.readAndCheckSignature(R)) {
            this.reader.index -= 4;
            var I = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature (" + f.pretty(I) + ", expected " + f.pretty(R) + ")");
          }
        }, isSignature: function(R, I) {
          var _ = this.reader.index;
          this.reader.setIndex(R);
          var S = this.reader.readString(4) === I;
          return this.reader.setIndex(_), S;
        }, readBlockEndOfCentral: function() {
          this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
          var R = this.reader.readData(this.zipCommentLength), I = k.uint8array ? "uint8array" : "array", _ = f.transformTo(I, R);
          this.zipComment = this.loadOptions.decodeFileName(_);
        }, readBlockZip64EndOfCentral: function() {
          this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
          for (var R, I, _, S = this.zip64EndOfCentralSize - 44; 0 < S; ) R = this.reader.readInt(2), I = this.reader.readInt(4), _ = this.reader.readData(I), this.zip64ExtensibleData[R] = { id: R, length: I, value: _ };
        }, readBlockZip64EndOfCentralLocator: function() {
          if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
        }, readLocalFiles: function() {
          var R, I;
          for (R = 0; R < this.files.length; R++) I = this.files[R], this.reader.setIndex(I.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), I.readLocalPart(this.reader), I.handleUTF8(), I.processAttributes();
        }, readCentralDir: function() {
          var R;
          for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER); ) (R = new h({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(R);
          if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        }, readEndOfCentral: function() {
          var R = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
          if (R < 0) throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
          this.reader.setIndex(R);
          var I = R;
          if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === f.MAX_VALUE_16BITS || this.diskWithCentralDirStart === f.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === f.MAX_VALUE_16BITS || this.centralDirRecords === f.MAX_VALUE_16BITS || this.centralDirSize === f.MAX_VALUE_32BITS || this.centralDirOffset === f.MAX_VALUE_32BITS) {
            if (this.zip64 = !0, (R = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            if (this.reader.setIndex(R), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
          }
          var _ = this.centralDirOffset + this.centralDirSize;
          this.zip64 && (_ += 20, _ += 12 + this.zip64EndOfCentralSize);
          var S = I - _;
          if (0 < S) this.isSignature(I, a.CENTRAL_FILE_HEADER) || (this.reader.zero = S);
          else if (S < 0) throw new Error("Corrupted zip: missing " + Math.abs(S) + " bytes.");
        }, prepareReader: function(R) {
          this.reader = l(R);
        }, load: function(R) {
          this.prepareReader(R), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
        } }, n.exports = A;
      }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(r, n, u) {
        var l = r("./reader/readerFor"), f = r("./utils"), a = r("./compressedObject"), h = r("./crc32"), k = r("./utf8"), A = r("./compressions"), R = r("./support");
        function I(_, S) {
          this.options = _, this.loadOptions = S;
        }
        I.prototype = { isEncrypted: function() {
          return (1 & this.bitFlag) == 1;
        }, useUTF8: function() {
          return (2048 & this.bitFlag) == 2048;
        }, readLocalPart: function(_) {
          var S, w;
          if (_.skip(22), this.fileNameLength = _.readInt(2), w = _.readInt(2), this.fileName = _.readData(this.fileNameLength), _.skip(w), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
          if ((S = (function(T) {
            for (var o in A) if (Object.prototype.hasOwnProperty.call(A, o) && A[o].magic === T) return A[o];
            return null;
          })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + f.pretty(this.compressionMethod) + " unknown (inner file : " + f.transformTo("string", this.fileName) + ")");
          this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, S, _.readData(this.compressedSize));
        }, readCentralPart: function(_) {
          this.versionMadeBy = _.readInt(2), _.skip(2), this.bitFlag = _.readInt(2), this.compressionMethod = _.readString(2), this.date = _.readDate(), this.crc32 = _.readInt(4), this.compressedSize = _.readInt(4), this.uncompressedSize = _.readInt(4);
          var S = _.readInt(2);
          if (this.extraFieldsLength = _.readInt(2), this.fileCommentLength = _.readInt(2), this.diskNumberStart = _.readInt(2), this.internalFileAttributes = _.readInt(2), this.externalFileAttributes = _.readInt(4), this.localHeaderOffset = _.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
          _.skip(S), this.readExtraFields(_), this.parseZIP64ExtraField(_), this.fileComment = _.readData(this.fileCommentLength);
        }, processAttributes: function() {
          this.unixPermissions = null, this.dosPermissions = null;
          var _ = this.versionMadeBy >> 8;
          this.dir = !!(16 & this.externalFileAttributes), _ == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), _ == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
        }, parseZIP64ExtraField: function() {
          if (this.extraFields[1]) {
            var _ = l(this.extraFields[1].value);
            this.uncompressedSize === f.MAX_VALUE_32BITS && (this.uncompressedSize = _.readInt(8)), this.compressedSize === f.MAX_VALUE_32BITS && (this.compressedSize = _.readInt(8)), this.localHeaderOffset === f.MAX_VALUE_32BITS && (this.localHeaderOffset = _.readInt(8)), this.diskNumberStart === f.MAX_VALUE_32BITS && (this.diskNumberStart = _.readInt(4));
          }
        }, readExtraFields: function(_) {
          var S, w, T, o = _.index + this.extraFieldsLength;
          for (this.extraFields || (this.extraFields = {}); _.index + 4 < o; ) S = _.readInt(2), w = _.readInt(2), T = _.readData(w), this.extraFields[S] = { id: S, length: w, value: T };
          _.setIndex(o);
        }, handleUTF8: function() {
          var _ = R.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) this.fileNameStr = k.utf8decode(this.fileName), this.fileCommentStr = k.utf8decode(this.fileComment);
          else {
            var S = this.findExtraFieldUnicodePath();
            if (S !== null) this.fileNameStr = S;
            else {
              var w = f.transformTo(_, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(w);
            }
            var T = this.findExtraFieldUnicodeComment();
            if (T !== null) this.fileCommentStr = T;
            else {
              var o = f.transformTo(_, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(o);
            }
          }
        }, findExtraFieldUnicodePath: function() {
          var _ = this.extraFields[28789];
          if (_) {
            var S = l(_.value);
            return S.readInt(1) !== 1 || h(this.fileName) !== S.readInt(4) ? null : k.utf8decode(S.readData(_.length - 5));
          }
          return null;
        }, findExtraFieldUnicodeComment: function() {
          var _ = this.extraFields[25461];
          if (_) {
            var S = l(_.value);
            return S.readInt(1) !== 1 || h(this.fileComment) !== S.readInt(4) ? null : k.utf8decode(S.readData(_.length - 5));
          }
          return null;
        } }, n.exports = I;
      }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(r, n, u) {
        function l(S, w, T) {
          this.name = S, this.dir = T.dir, this.date = T.date, this.comment = T.comment, this.unixPermissions = T.unixPermissions, this.dosPermissions = T.dosPermissions, this._data = w, this._dataBinary = T.binary, this.options = { compression: T.compression, compressionOptions: T.compressionOptions };
        }
        var f = r("./stream/StreamHelper"), a = r("./stream/DataWorker"), h = r("./utf8"), k = r("./compressedObject"), A = r("./stream/GenericWorker");
        l.prototype = { internalStream: function(S) {
          var w = null, T = "string";
          try {
            if (!S) throw new Error("No output type specified.");
            var o = (T = S.toLowerCase()) === "string" || T === "text";
            T !== "binarystring" && T !== "text" || (T = "string"), w = this._decompressWorker();
            var g = !this._dataBinary;
            g && !o && (w = w.pipe(new h.Utf8EncodeWorker())), !g && o && (w = w.pipe(new h.Utf8DecodeWorker()));
          } catch (m) {
            (w = new A("error")).error(m);
          }
          return new f(w, T, "");
        }, async: function(S, w) {
          return this.internalStream(S).accumulate(w);
        }, nodeStream: function(S, w) {
          return this.internalStream(S || "nodebuffer").toNodejsStream(w);
        }, _compressWorker: function(S, w) {
          if (this._data instanceof k && this._data.compression.magic === S.magic) return this._data.getCompressedWorker();
          var T = this._decompressWorker();
          return this._dataBinary || (T = T.pipe(new h.Utf8EncodeWorker())), k.createWorkerFrom(T, S, w);
        }, _decompressWorker: function() {
          return this._data instanceof k ? this._data.getContentWorker() : this._data instanceof A ? this._data : new a(this._data);
        } };
        for (var R = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], I = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, _ = 0; _ < R.length; _++) l.prototype[R[_]] = I;
        n.exports = l;
      }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(r, n, u) {
        (function(l) {
          var f, a, h = l.MutationObserver || l.WebKitMutationObserver;
          if (h) {
            var k = 0, A = new h(S), R = l.document.createTextNode("");
            A.observe(R, { characterData: !0 }), f = function() {
              R.data = k = ++k % 2;
            };
          } else if (l.setImmediate || l.MessageChannel === void 0) f = "document" in l && "onreadystatechange" in l.document.createElement("script") ? function() {
            var w = l.document.createElement("script");
            w.onreadystatechange = function() {
              S(), w.onreadystatechange = null, w.parentNode.removeChild(w), w = null;
            }, l.document.documentElement.appendChild(w);
          } : function() {
            setTimeout(S, 0);
          };
          else {
            var I = new l.MessageChannel();
            I.port1.onmessage = S, f = function() {
              I.port2.postMessage(0);
            };
          }
          var _ = [];
          function S() {
            var w, T;
            a = !0;
            for (var o = _.length; o; ) {
              for (T = _, _ = [], w = -1; ++w < o; ) T[w]();
              o = _.length;
            }
            a = !1;
          }
          n.exports = function(w) {
            _.push(w) !== 1 || a || f();
          };
        }).call(this, typeof Pe < "u" ? Pe : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}], 37: [function(r, n, u) {
        var l = r("immediate");
        function f() {
        }
        var a = {}, h = ["REJECTED"], k = ["FULFILLED"], A = ["PENDING"];
        function R(o) {
          if (typeof o != "function") throw new TypeError("resolver must be a function");
          this.state = A, this.queue = [], this.outcome = void 0, o !== f && w(this, o);
        }
        function I(o, g, m) {
          this.promise = o, typeof g == "function" && (this.onFulfilled = g, this.callFulfilled = this.otherCallFulfilled), typeof m == "function" && (this.onRejected = m, this.callRejected = this.otherCallRejected);
        }
        function _(o, g, m) {
          l(function() {
            var c;
            try {
              c = g(m);
            } catch (x) {
              return a.reject(o, x);
            }
            c === o ? a.reject(o, new TypeError("Cannot resolve promise with itself")) : a.resolve(o, c);
          });
        }
        function S(o) {
          var g = o && o.then;
          if (o && (typeof o == "object" || typeof o == "function") && typeof g == "function") return function() {
            g.apply(o, arguments);
          };
        }
        function w(o, g) {
          var m = !1;
          function c(B) {
            m || (m = !0, a.reject(o, B));
          }
          function x(B) {
            m || (m = !0, a.resolve(o, B));
          }
          var F = T(function() {
            g(x, c);
          });
          F.status === "error" && c(F.value);
        }
        function T(o, g) {
          var m = {};
          try {
            m.value = o(g), m.status = "success";
          } catch (c) {
            m.status = "error", m.value = c;
          }
          return m;
        }
        (n.exports = R).prototype.finally = function(o) {
          if (typeof o != "function") return this;
          var g = this.constructor;
          return this.then(function(m) {
            return g.resolve(o()).then(function() {
              return m;
            });
          }, function(m) {
            return g.resolve(o()).then(function() {
              throw m;
            });
          });
        }, R.prototype.catch = function(o) {
          return this.then(null, o);
        }, R.prototype.then = function(o, g) {
          if (typeof o != "function" && this.state === k || typeof g != "function" && this.state === h) return this;
          var m = new this.constructor(f);
          return this.state !== A ? _(m, this.state === k ? o : g, this.outcome) : this.queue.push(new I(m, o, g)), m;
        }, I.prototype.callFulfilled = function(o) {
          a.resolve(this.promise, o);
        }, I.prototype.otherCallFulfilled = function(o) {
          _(this.promise, this.onFulfilled, o);
        }, I.prototype.callRejected = function(o) {
          a.reject(this.promise, o);
        }, I.prototype.otherCallRejected = function(o) {
          _(this.promise, this.onRejected, o);
        }, a.resolve = function(o, g) {
          var m = T(S, g);
          if (m.status === "error") return a.reject(o, m.value);
          var c = m.value;
          if (c) w(o, c);
          else {
            o.state = k, o.outcome = g;
            for (var x = -1, F = o.queue.length; ++x < F; ) o.queue[x].callFulfilled(g);
          }
          return o;
        }, a.reject = function(o, g) {
          o.state = h, o.outcome = g;
          for (var m = -1, c = o.queue.length; ++m < c; ) o.queue[m].callRejected(g);
          return o;
        }, R.resolve = function(o) {
          return o instanceof this ? o : a.resolve(new this(f), o);
        }, R.reject = function(o) {
          var g = new this(f);
          return a.reject(g, o);
        }, R.all = function(o) {
          var g = this;
          if (Object.prototype.toString.call(o) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var m = o.length, c = !1;
          if (!m) return this.resolve([]);
          for (var x = new Array(m), F = 0, B = -1, z = new this(f); ++B < m; ) C(o[B], B);
          return z;
          function C($, le) {
            g.resolve($).then(function(N) {
              x[le] = N, ++F !== m || c || (c = !0, a.resolve(z, x));
            }, function(N) {
              c || (c = !0, a.reject(z, N));
            });
          }
        }, R.race = function(o) {
          var g = this;
          if (Object.prototype.toString.call(o) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var m = o.length, c = !1;
          if (!m) return this.resolve([]);
          for (var x = -1, F = new this(f); ++x < m; ) B = o[x], g.resolve(B).then(function(z) {
            c || (c = !0, a.resolve(F, z));
          }, function(z) {
            c || (c = !0, a.reject(F, z));
          });
          var B;
          return F;
        };
      }, { immediate: 36 }], 38: [function(r, n, u) {
        var l = {};
        (0, r("./lib/utils/common").assign)(l, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), n.exports = l;
      }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(r, n, u) {
        var l = r("./zlib/deflate"), f = r("./utils/common"), a = r("./utils/strings"), h = r("./zlib/messages"), k = r("./zlib/zstream"), A = Object.prototype.toString, R = 0, I = -1, _ = 0, S = 8;
        function w(o) {
          if (!(this instanceof w)) return new w(o);
          this.options = f.assign({ level: I, method: S, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: _, to: "" }, o || {});
          var g = this.options;
          g.raw && 0 < g.windowBits ? g.windowBits = -g.windowBits : g.gzip && 0 < g.windowBits && g.windowBits < 16 && (g.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new k(), this.strm.avail_out = 0;
          var m = l.deflateInit2(this.strm, g.level, g.method, g.windowBits, g.memLevel, g.strategy);
          if (m !== R) throw new Error(h[m]);
          if (g.header && l.deflateSetHeader(this.strm, g.header), g.dictionary) {
            var c;
            if (c = typeof g.dictionary == "string" ? a.string2buf(g.dictionary) : A.call(g.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(g.dictionary) : g.dictionary, (m = l.deflateSetDictionary(this.strm, c)) !== R) throw new Error(h[m]);
            this._dict_set = !0;
          }
        }
        function T(o, g) {
          var m = new w(g);
          if (m.push(o, !0), m.err) throw m.msg || h[m.err];
          return m.result;
        }
        w.prototype.push = function(o, g) {
          var m, c, x = this.strm, F = this.options.chunkSize;
          if (this.ended) return !1;
          c = g === ~~g ? g : g === !0 ? 4 : 0, typeof o == "string" ? x.input = a.string2buf(o) : A.call(o) === "[object ArrayBuffer]" ? x.input = new Uint8Array(o) : x.input = o, x.next_in = 0, x.avail_in = x.input.length;
          do {
            if (x.avail_out === 0 && (x.output = new f.Buf8(F), x.next_out = 0, x.avail_out = F), (m = l.deflate(x, c)) !== 1 && m !== R) return this.onEnd(m), !(this.ended = !0);
            x.avail_out !== 0 && (x.avail_in !== 0 || c !== 4 && c !== 2) || (this.options.to === "string" ? this.onData(a.buf2binstring(f.shrinkBuf(x.output, x.next_out))) : this.onData(f.shrinkBuf(x.output, x.next_out)));
          } while ((0 < x.avail_in || x.avail_out === 0) && m !== 1);
          return c === 4 ? (m = l.deflateEnd(this.strm), this.onEnd(m), this.ended = !0, m === R) : c !== 2 || (this.onEnd(R), !(x.avail_out = 0));
        }, w.prototype.onData = function(o) {
          this.chunks.push(o);
        }, w.prototype.onEnd = function(o) {
          o === R && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = f.flattenChunks(this.chunks)), this.chunks = [], this.err = o, this.msg = this.strm.msg;
        }, u.Deflate = w, u.deflate = T, u.deflateRaw = function(o, g) {
          return (g = g || {}).raw = !0, T(o, g);
        }, u.gzip = function(o, g) {
          return (g = g || {}).gzip = !0, T(o, g);
        };
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(r, n, u) {
        var l = r("./zlib/inflate"), f = r("./utils/common"), a = r("./utils/strings"), h = r("./zlib/constants"), k = r("./zlib/messages"), A = r("./zlib/zstream"), R = r("./zlib/gzheader"), I = Object.prototype.toString;
        function _(w) {
          if (!(this instanceof _)) return new _(w);
          this.options = f.assign({ chunkSize: 16384, windowBits: 0, to: "" }, w || {});
          var T = this.options;
          T.raw && 0 <= T.windowBits && T.windowBits < 16 && (T.windowBits = -T.windowBits, T.windowBits === 0 && (T.windowBits = -15)), !(0 <= T.windowBits && T.windowBits < 16) || w && w.windowBits || (T.windowBits += 32), 15 < T.windowBits && T.windowBits < 48 && (15 & T.windowBits) == 0 && (T.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new A(), this.strm.avail_out = 0;
          var o = l.inflateInit2(this.strm, T.windowBits);
          if (o !== h.Z_OK) throw new Error(k[o]);
          this.header = new R(), l.inflateGetHeader(this.strm, this.header);
        }
        function S(w, T) {
          var o = new _(T);
          if (o.push(w, !0), o.err) throw o.msg || k[o.err];
          return o.result;
        }
        _.prototype.push = function(w, T) {
          var o, g, m, c, x, F, B = this.strm, z = this.options.chunkSize, C = this.options.dictionary, $ = !1;
          if (this.ended) return !1;
          g = T === ~~T ? T : T === !0 ? h.Z_FINISH : h.Z_NO_FLUSH, typeof w == "string" ? B.input = a.binstring2buf(w) : I.call(w) === "[object ArrayBuffer]" ? B.input = new Uint8Array(w) : B.input = w, B.next_in = 0, B.avail_in = B.input.length;
          do {
            if (B.avail_out === 0 && (B.output = new f.Buf8(z), B.next_out = 0, B.avail_out = z), (o = l.inflate(B, h.Z_NO_FLUSH)) === h.Z_NEED_DICT && C && (F = typeof C == "string" ? a.string2buf(C) : I.call(C) === "[object ArrayBuffer]" ? new Uint8Array(C) : C, o = l.inflateSetDictionary(this.strm, F)), o === h.Z_BUF_ERROR && $ === !0 && (o = h.Z_OK, $ = !1), o !== h.Z_STREAM_END && o !== h.Z_OK) return this.onEnd(o), !(this.ended = !0);
            B.next_out && (B.avail_out !== 0 && o !== h.Z_STREAM_END && (B.avail_in !== 0 || g !== h.Z_FINISH && g !== h.Z_SYNC_FLUSH) || (this.options.to === "string" ? (m = a.utf8border(B.output, B.next_out), c = B.next_out - m, x = a.buf2string(B.output, m), B.next_out = c, B.avail_out = z - c, c && f.arraySet(B.output, B.output, m, c, 0), this.onData(x)) : this.onData(f.shrinkBuf(B.output, B.next_out)))), B.avail_in === 0 && B.avail_out === 0 && ($ = !0);
          } while ((0 < B.avail_in || B.avail_out === 0) && o !== h.Z_STREAM_END);
          return o === h.Z_STREAM_END && (g = h.Z_FINISH), g === h.Z_FINISH ? (o = l.inflateEnd(this.strm), this.onEnd(o), this.ended = !0, o === h.Z_OK) : g !== h.Z_SYNC_FLUSH || (this.onEnd(h.Z_OK), !(B.avail_out = 0));
        }, _.prototype.onData = function(w) {
          this.chunks.push(w);
        }, _.prototype.onEnd = function(w) {
          w === h.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = f.flattenChunks(this.chunks)), this.chunks = [], this.err = w, this.msg = this.strm.msg;
        }, u.Inflate = _, u.inflate = S, u.inflateRaw = function(w, T) {
          return (T = T || {}).raw = !0, S(w, T);
        }, u.ungzip = S;
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(r, n, u) {
        var l = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        u.assign = function(h) {
          for (var k = Array.prototype.slice.call(arguments, 1); k.length; ) {
            var A = k.shift();
            if (A) {
              if (typeof A != "object") throw new TypeError(A + "must be non-object");
              for (var R in A) A.hasOwnProperty(R) && (h[R] = A[R]);
            }
          }
          return h;
        }, u.shrinkBuf = function(h, k) {
          return h.length === k ? h : h.subarray ? h.subarray(0, k) : (h.length = k, h);
        };
        var f = { arraySet: function(h, k, A, R, I) {
          if (k.subarray && h.subarray) h.set(k.subarray(A, A + R), I);
          else for (var _ = 0; _ < R; _++) h[I + _] = k[A + _];
        }, flattenChunks: function(h) {
          var k, A, R, I, _, S;
          for (k = R = 0, A = h.length; k < A; k++) R += h[k].length;
          for (S = new Uint8Array(R), k = I = 0, A = h.length; k < A; k++) _ = h[k], S.set(_, I), I += _.length;
          return S;
        } }, a = { arraySet: function(h, k, A, R, I) {
          for (var _ = 0; _ < R; _++) h[I + _] = k[A + _];
        }, flattenChunks: function(h) {
          return [].concat.apply([], h);
        } };
        u.setTyped = function(h) {
          h ? (u.Buf8 = Uint8Array, u.Buf16 = Uint16Array, u.Buf32 = Int32Array, u.assign(u, f)) : (u.Buf8 = Array, u.Buf16 = Array, u.Buf32 = Array, u.assign(u, a));
        }, u.setTyped(l);
      }, {}], 42: [function(r, n, u) {
        var l = r("./common"), f = !0, a = !0;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch {
          f = !1;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch {
          a = !1;
        }
        for (var h = new l.Buf8(256), k = 0; k < 256; k++) h[k] = 252 <= k ? 6 : 248 <= k ? 5 : 240 <= k ? 4 : 224 <= k ? 3 : 192 <= k ? 2 : 1;
        function A(R, I) {
          if (I < 65537 && (R.subarray && a || !R.subarray && f)) return String.fromCharCode.apply(null, l.shrinkBuf(R, I));
          for (var _ = "", S = 0; S < I; S++) _ += String.fromCharCode(R[S]);
          return _;
        }
        h[254] = h[254] = 1, u.string2buf = function(R) {
          var I, _, S, w, T, o = R.length, g = 0;
          for (w = 0; w < o; w++) (64512 & (_ = R.charCodeAt(w))) == 55296 && w + 1 < o && (64512 & (S = R.charCodeAt(w + 1))) == 56320 && (_ = 65536 + (_ - 55296 << 10) + (S - 56320), w++), g += _ < 128 ? 1 : _ < 2048 ? 2 : _ < 65536 ? 3 : 4;
          for (I = new l.Buf8(g), w = T = 0; T < g; w++) (64512 & (_ = R.charCodeAt(w))) == 55296 && w + 1 < o && (64512 & (S = R.charCodeAt(w + 1))) == 56320 && (_ = 65536 + (_ - 55296 << 10) + (S - 56320), w++), _ < 128 ? I[T++] = _ : (_ < 2048 ? I[T++] = 192 | _ >>> 6 : (_ < 65536 ? I[T++] = 224 | _ >>> 12 : (I[T++] = 240 | _ >>> 18, I[T++] = 128 | _ >>> 12 & 63), I[T++] = 128 | _ >>> 6 & 63), I[T++] = 128 | 63 & _);
          return I;
        }, u.buf2binstring = function(R) {
          return A(R, R.length);
        }, u.binstring2buf = function(R) {
          for (var I = new l.Buf8(R.length), _ = 0, S = I.length; _ < S; _++) I[_] = R.charCodeAt(_);
          return I;
        }, u.buf2string = function(R, I) {
          var _, S, w, T, o = I || R.length, g = new Array(2 * o);
          for (_ = S = 0; _ < o; ) if ((w = R[_++]) < 128) g[S++] = w;
          else if (4 < (T = h[w])) g[S++] = 65533, _ += T - 1;
          else {
            for (w &= T === 2 ? 31 : T === 3 ? 15 : 7; 1 < T && _ < o; ) w = w << 6 | 63 & R[_++], T--;
            1 < T ? g[S++] = 65533 : w < 65536 ? g[S++] = w : (w -= 65536, g[S++] = 55296 | w >> 10 & 1023, g[S++] = 56320 | 1023 & w);
          }
          return A(g, S);
        }, u.utf8border = function(R, I) {
          var _;
          for ((I = I || R.length) > R.length && (I = R.length), _ = I - 1; 0 <= _ && (192 & R[_]) == 128; ) _--;
          return _ < 0 || _ === 0 ? I : _ + h[R[_]] > I ? _ : I;
        };
      }, { "./common": 41 }], 43: [function(r, n, u) {
        n.exports = function(l, f, a, h) {
          for (var k = 65535 & l | 0, A = l >>> 16 & 65535 | 0, R = 0; a !== 0; ) {
            for (a -= R = 2e3 < a ? 2e3 : a; A = A + (k = k + f[h++] | 0) | 0, --R; ) ;
            k %= 65521, A %= 65521;
          }
          return k | A << 16 | 0;
        };
      }, {}], 44: [function(r, n, u) {
        n.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
      }, {}], 45: [function(r, n, u) {
        var l = (function() {
          for (var f, a = [], h = 0; h < 256; h++) {
            f = h;
            for (var k = 0; k < 8; k++) f = 1 & f ? 3988292384 ^ f >>> 1 : f >>> 1;
            a[h] = f;
          }
          return a;
        })();
        n.exports = function(f, a, h, k) {
          var A = l, R = k + h;
          f ^= -1;
          for (var I = k; I < R; I++) f = f >>> 8 ^ A[255 & (f ^ a[I])];
          return -1 ^ f;
        };
      }, {}], 46: [function(r, n, u) {
        var l, f = r("../utils/common"), a = r("./trees"), h = r("./adler32"), k = r("./crc32"), A = r("./messages"), R = 0, I = 4, _ = 0, S = -2, w = -1, T = 4, o = 2, g = 8, m = 9, c = 286, x = 30, F = 19, B = 2 * c + 1, z = 15, C = 3, $ = 258, le = $ + C + 1, N = 42, U = 113, v = 1, K = 2, ee = 3, H = 4;
        function ie(d, Y) {
          return d.msg = A[Y], Y;
        }
        function Q(d) {
          return (d << 1) - (4 < d ? 9 : 0);
        }
        function ce(d) {
          for (var Y = d.length; 0 <= --Y; ) d[Y] = 0;
        }
        function V(d) {
          var Y = d.state, E = Y.pending;
          E > d.avail_out && (E = d.avail_out), E !== 0 && (f.arraySet(d.output, Y.pending_buf, Y.pending_out, E, d.next_out), d.next_out += E, Y.pending_out += E, d.total_out += E, d.avail_out -= E, Y.pending -= E, Y.pending === 0 && (Y.pending_out = 0));
        }
        function P(d, Y) {
          a._tr_flush_block(d, 0 <= d.block_start ? d.block_start : -1, d.strstart - d.block_start, Y), d.block_start = d.strstart, V(d.strm);
        }
        function X(d, Y) {
          d.pending_buf[d.pending++] = Y;
        }
        function Z(d, Y) {
          d.pending_buf[d.pending++] = Y >>> 8 & 255, d.pending_buf[d.pending++] = 255 & Y;
        }
        function te(d, Y) {
          var E, i, s = d.max_chain_length, p = d.strstart, L = d.prev_length, q = d.nice_match, j = d.strstart > d.w_size - le ? d.strstart - (d.w_size - le) : 0, ne = d.window, oe = d.w_mask, se = d.prev, he = d.strstart + $, de = ne[p + L - 1], we = ne[p + L];
          d.prev_length >= d.good_match && (s >>= 2), q > d.lookahead && (q = d.lookahead);
          do
            if (ne[(E = Y) + L] === we && ne[E + L - 1] === de && ne[E] === ne[p] && ne[++E] === ne[p + 1]) {
              p += 2, E++;
              do
                ;
              while (ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && ne[++p] === ne[++E] && p < he);
              if (i = $ - (he - p), p = he - $, L < i) {
                if (d.match_start = Y, q <= (L = i)) break;
                de = ne[p + L - 1], we = ne[p + L];
              }
            }
          while ((Y = se[Y & oe]) > j && --s != 0);
          return L <= d.lookahead ? L : d.lookahead;
        }
        function G(d) {
          var Y, E, i, s, p, L, q, j, ne, oe, se = d.w_size;
          do {
            if (s = d.window_size - d.lookahead - d.strstart, d.strstart >= se + (se - le)) {
              for (f.arraySet(d.window, d.window, se, se, 0), d.match_start -= se, d.strstart -= se, d.block_start -= se, Y = E = d.hash_size; i = d.head[--Y], d.head[Y] = se <= i ? i - se : 0, --E; ) ;
              for (Y = E = se; i = d.prev[--Y], d.prev[Y] = se <= i ? i - se : 0, --E; ) ;
              s += se;
            }
            if (d.strm.avail_in === 0) break;
            if (L = d.strm, q = d.window, j = d.strstart + d.lookahead, ne = s, oe = void 0, oe = L.avail_in, ne < oe && (oe = ne), E = oe === 0 ? 0 : (L.avail_in -= oe, f.arraySet(q, L.input, L.next_in, oe, j), L.state.wrap === 1 ? L.adler = h(L.adler, q, oe, j) : L.state.wrap === 2 && (L.adler = k(L.adler, q, oe, j)), L.next_in += oe, L.total_in += oe, oe), d.lookahead += E, d.lookahead + d.insert >= C) for (p = d.strstart - d.insert, d.ins_h = d.window[p], d.ins_h = (d.ins_h << d.hash_shift ^ d.window[p + 1]) & d.hash_mask; d.insert && (d.ins_h = (d.ins_h << d.hash_shift ^ d.window[p + C - 1]) & d.hash_mask, d.prev[p & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = p, p++, d.insert--, !(d.lookahead + d.insert < C)); ) ;
          } while (d.lookahead < le && d.strm.avail_in !== 0);
        }
        function b(d, Y) {
          for (var E, i; ; ) {
            if (d.lookahead < le) {
              if (G(d), d.lookahead < le && Y === R) return v;
              if (d.lookahead === 0) break;
            }
            if (E = 0, d.lookahead >= C && (d.ins_h = (d.ins_h << d.hash_shift ^ d.window[d.strstart + C - 1]) & d.hash_mask, E = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = d.strstart), E !== 0 && d.strstart - E <= d.w_size - le && (d.match_length = te(d, E)), d.match_length >= C) if (i = a._tr_tally(d, d.strstart - d.match_start, d.match_length - C), d.lookahead -= d.match_length, d.match_length <= d.max_lazy_match && d.lookahead >= C) {
              for (d.match_length--; d.strstart++, d.ins_h = (d.ins_h << d.hash_shift ^ d.window[d.strstart + C - 1]) & d.hash_mask, E = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = d.strstart, --d.match_length != 0; ) ;
              d.strstart++;
            } else d.strstart += d.match_length, d.match_length = 0, d.ins_h = d.window[d.strstart], d.ins_h = (d.ins_h << d.hash_shift ^ d.window[d.strstart + 1]) & d.hash_mask;
            else i = a._tr_tally(d, 0, d.window[d.strstart]), d.lookahead--, d.strstart++;
            if (i && (P(d, !1), d.strm.avail_out === 0)) return v;
          }
          return d.insert = d.strstart < C - 1 ? d.strstart : C - 1, Y === I ? (P(d, !0), d.strm.avail_out === 0 ? ee : H) : d.last_lit && (P(d, !1), d.strm.avail_out === 0) ? v : K;
        }
        function y(d, Y) {
          for (var E, i, s; ; ) {
            if (d.lookahead < le) {
              if (G(d), d.lookahead < le && Y === R) return v;
              if (d.lookahead === 0) break;
            }
            if (E = 0, d.lookahead >= C && (d.ins_h = (d.ins_h << d.hash_shift ^ d.window[d.strstart + C - 1]) & d.hash_mask, E = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = d.strstart), d.prev_length = d.match_length, d.prev_match = d.match_start, d.match_length = C - 1, E !== 0 && d.prev_length < d.max_lazy_match && d.strstart - E <= d.w_size - le && (d.match_length = te(d, E), d.match_length <= 5 && (d.strategy === 1 || d.match_length === C && 4096 < d.strstart - d.match_start) && (d.match_length = C - 1)), d.prev_length >= C && d.match_length <= d.prev_length) {
              for (s = d.strstart + d.lookahead - C, i = a._tr_tally(d, d.strstart - 1 - d.prev_match, d.prev_length - C), d.lookahead -= d.prev_length - 1, d.prev_length -= 2; ++d.strstart <= s && (d.ins_h = (d.ins_h << d.hash_shift ^ d.window[d.strstart + C - 1]) & d.hash_mask, E = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = d.strstart), --d.prev_length != 0; ) ;
              if (d.match_available = 0, d.match_length = C - 1, d.strstart++, i && (P(d, !1), d.strm.avail_out === 0)) return v;
            } else if (d.match_available) {
              if ((i = a._tr_tally(d, 0, d.window[d.strstart - 1])) && P(d, !1), d.strstart++, d.lookahead--, d.strm.avail_out === 0) return v;
            } else d.match_available = 1, d.strstart++, d.lookahead--;
          }
          return d.match_available && (i = a._tr_tally(d, 0, d.window[d.strstart - 1]), d.match_available = 0), d.insert = d.strstart < C - 1 ? d.strstart : C - 1, Y === I ? (P(d, !0), d.strm.avail_out === 0 ? ee : H) : d.last_lit && (P(d, !1), d.strm.avail_out === 0) ? v : K;
        }
        function W(d, Y, E, i, s) {
          this.good_length = d, this.max_lazy = Y, this.nice_length = E, this.max_chain = i, this.func = s;
        }
        function M() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new f.Buf16(2 * B), this.dyn_dtree = new f.Buf16(2 * (2 * x + 1)), this.bl_tree = new f.Buf16(2 * (2 * F + 1)), ce(this.dyn_ltree), ce(this.dyn_dtree), ce(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new f.Buf16(z + 1), this.heap = new f.Buf16(2 * c + 1), ce(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new f.Buf16(2 * c + 1), ce(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function O(d) {
          var Y;
          return d && d.state ? (d.total_in = d.total_out = 0, d.data_type = o, (Y = d.state).pending = 0, Y.pending_out = 0, Y.wrap < 0 && (Y.wrap = -Y.wrap), Y.status = Y.wrap ? N : U, d.adler = Y.wrap === 2 ? 0 : 1, Y.last_flush = R, a._tr_init(Y), _) : ie(d, S);
        }
        function D(d) {
          var Y = O(d);
          return Y === _ && (function(E) {
            E.window_size = 2 * E.w_size, ce(E.head), E.max_lazy_match = l[E.level].max_lazy, E.good_match = l[E.level].good_length, E.nice_match = l[E.level].nice_length, E.max_chain_length = l[E.level].max_chain, E.strstart = 0, E.block_start = 0, E.lookahead = 0, E.insert = 0, E.match_length = E.prev_length = C - 1, E.match_available = 0, E.ins_h = 0;
          })(d.state), Y;
        }
        function J(d, Y, E, i, s, p) {
          if (!d) return S;
          var L = 1;
          if (Y === w && (Y = 6), i < 0 ? (L = 0, i = -i) : 15 < i && (L = 2, i -= 16), s < 1 || m < s || E !== g || i < 8 || 15 < i || Y < 0 || 9 < Y || p < 0 || T < p) return ie(d, S);
          i === 8 && (i = 9);
          var q = new M();
          return (d.state = q).strm = d, q.wrap = L, q.gzhead = null, q.w_bits = i, q.w_size = 1 << q.w_bits, q.w_mask = q.w_size - 1, q.hash_bits = s + 7, q.hash_size = 1 << q.hash_bits, q.hash_mask = q.hash_size - 1, q.hash_shift = ~~((q.hash_bits + C - 1) / C), q.window = new f.Buf8(2 * q.w_size), q.head = new f.Buf16(q.hash_size), q.prev = new f.Buf16(q.w_size), q.lit_bufsize = 1 << s + 6, q.pending_buf_size = 4 * q.lit_bufsize, q.pending_buf = new f.Buf8(q.pending_buf_size), q.d_buf = 1 * q.lit_bufsize, q.l_buf = 3 * q.lit_bufsize, q.level = Y, q.strategy = p, q.method = E, D(d);
        }
        l = [new W(0, 0, 0, 0, function(d, Y) {
          var E = 65535;
          for (E > d.pending_buf_size - 5 && (E = d.pending_buf_size - 5); ; ) {
            if (d.lookahead <= 1) {
              if (G(d), d.lookahead === 0 && Y === R) return v;
              if (d.lookahead === 0) break;
            }
            d.strstart += d.lookahead, d.lookahead = 0;
            var i = d.block_start + E;
            if ((d.strstart === 0 || d.strstart >= i) && (d.lookahead = d.strstart - i, d.strstart = i, P(d, !1), d.strm.avail_out === 0) || d.strstart - d.block_start >= d.w_size - le && (P(d, !1), d.strm.avail_out === 0)) return v;
          }
          return d.insert = 0, Y === I ? (P(d, !0), d.strm.avail_out === 0 ? ee : H) : (d.strstart > d.block_start && (P(d, !1), d.strm.avail_out), v);
        }), new W(4, 4, 8, 4, b), new W(4, 5, 16, 8, b), new W(4, 6, 32, 32, b), new W(4, 4, 16, 16, y), new W(8, 16, 32, 32, y), new W(8, 16, 128, 128, y), new W(8, 32, 128, 256, y), new W(32, 128, 258, 1024, y), new W(32, 258, 258, 4096, y)], u.deflateInit = function(d, Y) {
          return J(d, Y, g, 15, 8, 0);
        }, u.deflateInit2 = J, u.deflateReset = D, u.deflateResetKeep = O, u.deflateSetHeader = function(d, Y) {
          return d && d.state ? d.state.wrap !== 2 ? S : (d.state.gzhead = Y, _) : S;
        }, u.deflate = function(d, Y) {
          var E, i, s, p;
          if (!d || !d.state || 5 < Y || Y < 0) return d ? ie(d, S) : S;
          if (i = d.state, !d.output || !d.input && d.avail_in !== 0 || i.status === 666 && Y !== I) return ie(d, d.avail_out === 0 ? -5 : S);
          if (i.strm = d, E = i.last_flush, i.last_flush = Y, i.status === N) if (i.wrap === 2) d.adler = 0, X(i, 31), X(i, 139), X(i, 8), i.gzhead ? (X(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), X(i, 255 & i.gzhead.time), X(i, i.gzhead.time >> 8 & 255), X(i, i.gzhead.time >> 16 & 255), X(i, i.gzhead.time >> 24 & 255), X(i, i.level === 9 ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), X(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (X(i, 255 & i.gzhead.extra.length), X(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (d.adler = k(d.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = 69) : (X(i, 0), X(i, 0), X(i, 0), X(i, 0), X(i, 0), X(i, i.level === 9 ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), X(i, 3), i.status = U);
          else {
            var L = g + (i.w_bits - 8 << 4) << 8;
            L |= (2 <= i.strategy || i.level < 2 ? 0 : i.level < 6 ? 1 : i.level === 6 ? 2 : 3) << 6, i.strstart !== 0 && (L |= 32), L += 31 - L % 31, i.status = U, Z(i, L), i.strstart !== 0 && (Z(i, d.adler >>> 16), Z(i, 65535 & d.adler)), d.adler = 1;
          }
          if (i.status === 69) if (i.gzhead.extra) {
            for (s = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > s && (d.adler = k(d.adler, i.pending_buf, i.pending - s, s)), V(d), s = i.pending, i.pending !== i.pending_buf_size)); ) X(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;
            i.gzhead.hcrc && i.pending > s && (d.adler = k(d.adler, i.pending_buf, i.pending - s, s)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = 73);
          } else i.status = 73;
          if (i.status === 73) if (i.gzhead.name) {
            s = i.pending;
            do {
              if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > s && (d.adler = k(d.adler, i.pending_buf, i.pending - s, s)), V(d), s = i.pending, i.pending === i.pending_buf_size)) {
                p = 1;
                break;
              }
              p = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, X(i, p);
            } while (p !== 0);
            i.gzhead.hcrc && i.pending > s && (d.adler = k(d.adler, i.pending_buf, i.pending - s, s)), p === 0 && (i.gzindex = 0, i.status = 91);
          } else i.status = 91;
          if (i.status === 91) if (i.gzhead.comment) {
            s = i.pending;
            do {
              if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > s && (d.adler = k(d.adler, i.pending_buf, i.pending - s, s)), V(d), s = i.pending, i.pending === i.pending_buf_size)) {
                p = 1;
                break;
              }
              p = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, X(i, p);
            } while (p !== 0);
            i.gzhead.hcrc && i.pending > s && (d.adler = k(d.adler, i.pending_buf, i.pending - s, s)), p === 0 && (i.status = 103);
          } else i.status = 103;
          if (i.status === 103 && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && V(d), i.pending + 2 <= i.pending_buf_size && (X(i, 255 & d.adler), X(i, d.adler >> 8 & 255), d.adler = 0, i.status = U)) : i.status = U), i.pending !== 0) {
            if (V(d), d.avail_out === 0) return i.last_flush = -1, _;
          } else if (d.avail_in === 0 && Q(Y) <= Q(E) && Y !== I) return ie(d, -5);
          if (i.status === 666 && d.avail_in !== 0) return ie(d, -5);
          if (d.avail_in !== 0 || i.lookahead !== 0 || Y !== R && i.status !== 666) {
            var q = i.strategy === 2 ? (function(j, ne) {
              for (var oe; ; ) {
                if (j.lookahead === 0 && (G(j), j.lookahead === 0)) {
                  if (ne === R) return v;
                  break;
                }
                if (j.match_length = 0, oe = a._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++, oe && (P(j, !1), j.strm.avail_out === 0)) return v;
              }
              return j.insert = 0, ne === I ? (P(j, !0), j.strm.avail_out === 0 ? ee : H) : j.last_lit && (P(j, !1), j.strm.avail_out === 0) ? v : K;
            })(i, Y) : i.strategy === 3 ? (function(j, ne) {
              for (var oe, se, he, de, we = j.window; ; ) {
                if (j.lookahead <= $) {
                  if (G(j), j.lookahead <= $ && ne === R) return v;
                  if (j.lookahead === 0) break;
                }
                if (j.match_length = 0, j.lookahead >= C && 0 < j.strstart && (se = we[he = j.strstart - 1]) === we[++he] && se === we[++he] && se === we[++he]) {
                  de = j.strstart + $;
                  do
                    ;
                  while (se === we[++he] && se === we[++he] && se === we[++he] && se === we[++he] && se === we[++he] && se === we[++he] && se === we[++he] && se === we[++he] && he < de);
                  j.match_length = $ - (de - he), j.match_length > j.lookahead && (j.match_length = j.lookahead);
                }
                if (j.match_length >= C ? (oe = a._tr_tally(j, 1, j.match_length - C), j.lookahead -= j.match_length, j.strstart += j.match_length, j.match_length = 0) : (oe = a._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++), oe && (P(j, !1), j.strm.avail_out === 0)) return v;
              }
              return j.insert = 0, ne === I ? (P(j, !0), j.strm.avail_out === 0 ? ee : H) : j.last_lit && (P(j, !1), j.strm.avail_out === 0) ? v : K;
            })(i, Y) : l[i.level].func(i, Y);
            if (q !== ee && q !== H || (i.status = 666), q === v || q === ee) return d.avail_out === 0 && (i.last_flush = -1), _;
            if (q === K && (Y === 1 ? a._tr_align(i) : Y !== 5 && (a._tr_stored_block(i, 0, 0, !1), Y === 3 && (ce(i.head), i.lookahead === 0 && (i.strstart = 0, i.block_start = 0, i.insert = 0))), V(d), d.avail_out === 0)) return i.last_flush = -1, _;
          }
          return Y !== I ? _ : i.wrap <= 0 ? 1 : (i.wrap === 2 ? (X(i, 255 & d.adler), X(i, d.adler >> 8 & 255), X(i, d.adler >> 16 & 255), X(i, d.adler >> 24 & 255), X(i, 255 & d.total_in), X(i, d.total_in >> 8 & 255), X(i, d.total_in >> 16 & 255), X(i, d.total_in >> 24 & 255)) : (Z(i, d.adler >>> 16), Z(i, 65535 & d.adler)), V(d), 0 < i.wrap && (i.wrap = -i.wrap), i.pending !== 0 ? _ : 1);
        }, u.deflateEnd = function(d) {
          var Y;
          return d && d.state ? (Y = d.state.status) !== N && Y !== 69 && Y !== 73 && Y !== 91 && Y !== 103 && Y !== U && Y !== 666 ? ie(d, S) : (d.state = null, Y === U ? ie(d, -3) : _) : S;
        }, u.deflateSetDictionary = function(d, Y) {
          var E, i, s, p, L, q, j, ne, oe = Y.length;
          if (!d || !d.state || (p = (E = d.state).wrap) === 2 || p === 1 && E.status !== N || E.lookahead) return S;
          for (p === 1 && (d.adler = h(d.adler, Y, oe, 0)), E.wrap = 0, oe >= E.w_size && (p === 0 && (ce(E.head), E.strstart = 0, E.block_start = 0, E.insert = 0), ne = new f.Buf8(E.w_size), f.arraySet(ne, Y, oe - E.w_size, E.w_size, 0), Y = ne, oe = E.w_size), L = d.avail_in, q = d.next_in, j = d.input, d.avail_in = oe, d.next_in = 0, d.input = Y, G(E); E.lookahead >= C; ) {
            for (i = E.strstart, s = E.lookahead - (C - 1); E.ins_h = (E.ins_h << E.hash_shift ^ E.window[i + C - 1]) & E.hash_mask, E.prev[i & E.w_mask] = E.head[E.ins_h], E.head[E.ins_h] = i, i++, --s; ) ;
            E.strstart = i, E.lookahead = C - 1, G(E);
          }
          return E.strstart += E.lookahead, E.block_start = E.strstart, E.insert = E.lookahead, E.lookahead = 0, E.match_length = E.prev_length = C - 1, E.match_available = 0, d.next_in = q, d.input = j, d.avail_in = L, E.wrap = p, _;
        }, u.deflateInfo = "pako deflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(r, n, u) {
        n.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
        };
      }, {}], 48: [function(r, n, u) {
        n.exports = function(l, f) {
          var a, h, k, A, R, I, _, S, w, T, o, g, m, c, x, F, B, z, C, $, le, N, U, v, K;
          a = l.state, h = l.next_in, v = l.input, k = h + (l.avail_in - 5), A = l.next_out, K = l.output, R = A - (f - l.avail_out), I = A + (l.avail_out - 257), _ = a.dmax, S = a.wsize, w = a.whave, T = a.wnext, o = a.window, g = a.hold, m = a.bits, c = a.lencode, x = a.distcode, F = (1 << a.lenbits) - 1, B = (1 << a.distbits) - 1;
          e: do {
            m < 15 && (g += v[h++] << m, m += 8, g += v[h++] << m, m += 8), z = c[g & F];
            t: for (; ; ) {
              if (g >>>= C = z >>> 24, m -= C, (C = z >>> 16 & 255) === 0) K[A++] = 65535 & z;
              else {
                if (!(16 & C)) {
                  if ((64 & C) == 0) {
                    z = c[(65535 & z) + (g & (1 << C) - 1)];
                    continue t;
                  }
                  if (32 & C) {
                    a.mode = 12;
                    break e;
                  }
                  l.msg = "invalid literal/length code", a.mode = 30;
                  break e;
                }
                $ = 65535 & z, (C &= 15) && (m < C && (g += v[h++] << m, m += 8), $ += g & (1 << C) - 1, g >>>= C, m -= C), m < 15 && (g += v[h++] << m, m += 8, g += v[h++] << m, m += 8), z = x[g & B];
                r: for (; ; ) {
                  if (g >>>= C = z >>> 24, m -= C, !(16 & (C = z >>> 16 & 255))) {
                    if ((64 & C) == 0) {
                      z = x[(65535 & z) + (g & (1 << C) - 1)];
                      continue r;
                    }
                    l.msg = "invalid distance code", a.mode = 30;
                    break e;
                  }
                  if (le = 65535 & z, m < (C &= 15) && (g += v[h++] << m, (m += 8) < C && (g += v[h++] << m, m += 8)), _ < (le += g & (1 << C) - 1)) {
                    l.msg = "invalid distance too far back", a.mode = 30;
                    break e;
                  }
                  if (g >>>= C, m -= C, (C = A - R) < le) {
                    if (w < (C = le - C) && a.sane) {
                      l.msg = "invalid distance too far back", a.mode = 30;
                      break e;
                    }
                    if (U = o, (N = 0) === T) {
                      if (N += S - C, C < $) {
                        for ($ -= C; K[A++] = o[N++], --C; ) ;
                        N = A - le, U = K;
                      }
                    } else if (T < C) {
                      if (N += S + T - C, (C -= T) < $) {
                        for ($ -= C; K[A++] = o[N++], --C; ) ;
                        if (N = 0, T < $) {
                          for ($ -= C = T; K[A++] = o[N++], --C; ) ;
                          N = A - le, U = K;
                        }
                      }
                    } else if (N += T - C, C < $) {
                      for ($ -= C; K[A++] = o[N++], --C; ) ;
                      N = A - le, U = K;
                    }
                    for (; 2 < $; ) K[A++] = U[N++], K[A++] = U[N++], K[A++] = U[N++], $ -= 3;
                    $ && (K[A++] = U[N++], 1 < $ && (K[A++] = U[N++]));
                  } else {
                    for (N = A - le; K[A++] = K[N++], K[A++] = K[N++], K[A++] = K[N++], 2 < ($ -= 3); ) ;
                    $ && (K[A++] = K[N++], 1 < $ && (K[A++] = K[N++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (h < k && A < I);
          h -= $ = m >> 3, g &= (1 << (m -= $ << 3)) - 1, l.next_in = h, l.next_out = A, l.avail_in = h < k ? k - h + 5 : 5 - (h - k), l.avail_out = A < I ? I - A + 257 : 257 - (A - I), a.hold = g, a.bits = m;
        };
      }, {}], 49: [function(r, n, u) {
        var l = r("../utils/common"), f = r("./adler32"), a = r("./crc32"), h = r("./inffast"), k = r("./inftrees"), A = 1, R = 2, I = 0, _ = -2, S = 1, w = 852, T = 592;
        function o(N) {
          return (N >>> 24 & 255) + (N >>> 8 & 65280) + ((65280 & N) << 8) + ((255 & N) << 24);
        }
        function g() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new l.Buf16(320), this.work = new l.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function m(N) {
          var U;
          return N && N.state ? (U = N.state, N.total_in = N.total_out = U.total = 0, N.msg = "", U.wrap && (N.adler = 1 & U.wrap), U.mode = S, U.last = 0, U.havedict = 0, U.dmax = 32768, U.head = null, U.hold = 0, U.bits = 0, U.lencode = U.lendyn = new l.Buf32(w), U.distcode = U.distdyn = new l.Buf32(T), U.sane = 1, U.back = -1, I) : _;
        }
        function c(N) {
          var U;
          return N && N.state ? ((U = N.state).wsize = 0, U.whave = 0, U.wnext = 0, m(N)) : _;
        }
        function x(N, U) {
          var v, K;
          return N && N.state ? (K = N.state, U < 0 ? (v = 0, U = -U) : (v = 1 + (U >> 4), U < 48 && (U &= 15)), U && (U < 8 || 15 < U) ? _ : (K.window !== null && K.wbits !== U && (K.window = null), K.wrap = v, K.wbits = U, c(N))) : _;
        }
        function F(N, U) {
          var v, K;
          return N ? (K = new g(), (N.state = K).window = null, (v = x(N, U)) !== I && (N.state = null), v) : _;
        }
        var B, z, C = !0;
        function $(N) {
          if (C) {
            var U;
            for (B = new l.Buf32(512), z = new l.Buf32(32), U = 0; U < 144; ) N.lens[U++] = 8;
            for (; U < 256; ) N.lens[U++] = 9;
            for (; U < 280; ) N.lens[U++] = 7;
            for (; U < 288; ) N.lens[U++] = 8;
            for (k(A, N.lens, 0, 288, B, 0, N.work, { bits: 9 }), U = 0; U < 32; ) N.lens[U++] = 5;
            k(R, N.lens, 0, 32, z, 0, N.work, { bits: 5 }), C = !1;
          }
          N.lencode = B, N.lenbits = 9, N.distcode = z, N.distbits = 5;
        }
        function le(N, U, v, K) {
          var ee, H = N.state;
          return H.window === null && (H.wsize = 1 << H.wbits, H.wnext = 0, H.whave = 0, H.window = new l.Buf8(H.wsize)), K >= H.wsize ? (l.arraySet(H.window, U, v - H.wsize, H.wsize, 0), H.wnext = 0, H.whave = H.wsize) : (K < (ee = H.wsize - H.wnext) && (ee = K), l.arraySet(H.window, U, v - K, ee, H.wnext), (K -= ee) ? (l.arraySet(H.window, U, v - K, K, 0), H.wnext = K, H.whave = H.wsize) : (H.wnext += ee, H.wnext === H.wsize && (H.wnext = 0), H.whave < H.wsize && (H.whave += ee))), 0;
        }
        u.inflateReset = c, u.inflateReset2 = x, u.inflateResetKeep = m, u.inflateInit = function(N) {
          return F(N, 15);
        }, u.inflateInit2 = F, u.inflate = function(N, U) {
          var v, K, ee, H, ie, Q, ce, V, P, X, Z, te, G, b, y, W, M, O, D, J, d, Y, E, i, s = 0, p = new l.Buf8(4), L = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
          if (!N || !N.state || !N.output || !N.input && N.avail_in !== 0) return _;
          (v = N.state).mode === 12 && (v.mode = 13), ie = N.next_out, ee = N.output, ce = N.avail_out, H = N.next_in, K = N.input, Q = N.avail_in, V = v.hold, P = v.bits, X = Q, Z = ce, Y = I;
          e: for (; ; ) switch (v.mode) {
            case S:
              if (v.wrap === 0) {
                v.mode = 13;
                break;
              }
              for (; P < 16; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              if (2 & v.wrap && V === 35615) {
                p[v.check = 0] = 255 & V, p[1] = V >>> 8 & 255, v.check = a(v.check, p, 2, 0), P = V = 0, v.mode = 2;
                break;
              }
              if (v.flags = 0, v.head && (v.head.done = !1), !(1 & v.wrap) || (((255 & V) << 8) + (V >> 8)) % 31) {
                N.msg = "incorrect header check", v.mode = 30;
                break;
              }
              if ((15 & V) != 8) {
                N.msg = "unknown compression method", v.mode = 30;
                break;
              }
              if (P -= 4, d = 8 + (15 & (V >>>= 4)), v.wbits === 0) v.wbits = d;
              else if (d > v.wbits) {
                N.msg = "invalid window size", v.mode = 30;
                break;
              }
              v.dmax = 1 << d, N.adler = v.check = 1, v.mode = 512 & V ? 10 : 12, P = V = 0;
              break;
            case 2:
              for (; P < 16; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              if (v.flags = V, (255 & v.flags) != 8) {
                N.msg = "unknown compression method", v.mode = 30;
                break;
              }
              if (57344 & v.flags) {
                N.msg = "unknown header flags set", v.mode = 30;
                break;
              }
              v.head && (v.head.text = V >> 8 & 1), 512 & v.flags && (p[0] = 255 & V, p[1] = V >>> 8 & 255, v.check = a(v.check, p, 2, 0)), P = V = 0, v.mode = 3;
            case 3:
              for (; P < 32; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              v.head && (v.head.time = V), 512 & v.flags && (p[0] = 255 & V, p[1] = V >>> 8 & 255, p[2] = V >>> 16 & 255, p[3] = V >>> 24 & 255, v.check = a(v.check, p, 4, 0)), P = V = 0, v.mode = 4;
            case 4:
              for (; P < 16; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              v.head && (v.head.xflags = 255 & V, v.head.os = V >> 8), 512 & v.flags && (p[0] = 255 & V, p[1] = V >>> 8 & 255, v.check = a(v.check, p, 2, 0)), P = V = 0, v.mode = 5;
            case 5:
              if (1024 & v.flags) {
                for (; P < 16; ) {
                  if (Q === 0) break e;
                  Q--, V += K[H++] << P, P += 8;
                }
                v.length = V, v.head && (v.head.extra_len = V), 512 & v.flags && (p[0] = 255 & V, p[1] = V >>> 8 & 255, v.check = a(v.check, p, 2, 0)), P = V = 0;
              } else v.head && (v.head.extra = null);
              v.mode = 6;
            case 6:
              if (1024 & v.flags && (Q < (te = v.length) && (te = Q), te && (v.head && (d = v.head.extra_len - v.length, v.head.extra || (v.head.extra = new Array(v.head.extra_len)), l.arraySet(v.head.extra, K, H, te, d)), 512 & v.flags && (v.check = a(v.check, K, te, H)), Q -= te, H += te, v.length -= te), v.length)) break e;
              v.length = 0, v.mode = 7;
            case 7:
              if (2048 & v.flags) {
                if (Q === 0) break e;
                for (te = 0; d = K[H + te++], v.head && d && v.length < 65536 && (v.head.name += String.fromCharCode(d)), d && te < Q; ) ;
                if (512 & v.flags && (v.check = a(v.check, K, te, H)), Q -= te, H += te, d) break e;
              } else v.head && (v.head.name = null);
              v.length = 0, v.mode = 8;
            case 8:
              if (4096 & v.flags) {
                if (Q === 0) break e;
                for (te = 0; d = K[H + te++], v.head && d && v.length < 65536 && (v.head.comment += String.fromCharCode(d)), d && te < Q; ) ;
                if (512 & v.flags && (v.check = a(v.check, K, te, H)), Q -= te, H += te, d) break e;
              } else v.head && (v.head.comment = null);
              v.mode = 9;
            case 9:
              if (512 & v.flags) {
                for (; P < 16; ) {
                  if (Q === 0) break e;
                  Q--, V += K[H++] << P, P += 8;
                }
                if (V !== (65535 & v.check)) {
                  N.msg = "header crc mismatch", v.mode = 30;
                  break;
                }
                P = V = 0;
              }
              v.head && (v.head.hcrc = v.flags >> 9 & 1, v.head.done = !0), N.adler = v.check = 0, v.mode = 12;
              break;
            case 10:
              for (; P < 32; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              N.adler = v.check = o(V), P = V = 0, v.mode = 11;
            case 11:
              if (v.havedict === 0) return N.next_out = ie, N.avail_out = ce, N.next_in = H, N.avail_in = Q, v.hold = V, v.bits = P, 2;
              N.adler = v.check = 1, v.mode = 12;
            case 12:
              if (U === 5 || U === 6) break e;
            case 13:
              if (v.last) {
                V >>>= 7 & P, P -= 7 & P, v.mode = 27;
                break;
              }
              for (; P < 3; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              switch (v.last = 1 & V, P -= 1, 3 & (V >>>= 1)) {
                case 0:
                  v.mode = 14;
                  break;
                case 1:
                  if ($(v), v.mode = 20, U !== 6) break;
                  V >>>= 2, P -= 2;
                  break e;
                case 2:
                  v.mode = 17;
                  break;
                case 3:
                  N.msg = "invalid block type", v.mode = 30;
              }
              V >>>= 2, P -= 2;
              break;
            case 14:
              for (V >>>= 7 & P, P -= 7 & P; P < 32; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              if ((65535 & V) != (V >>> 16 ^ 65535)) {
                N.msg = "invalid stored block lengths", v.mode = 30;
                break;
              }
              if (v.length = 65535 & V, P = V = 0, v.mode = 15, U === 6) break e;
            case 15:
              v.mode = 16;
            case 16:
              if (te = v.length) {
                if (Q < te && (te = Q), ce < te && (te = ce), te === 0) break e;
                l.arraySet(ee, K, H, te, ie), Q -= te, H += te, ce -= te, ie += te, v.length -= te;
                break;
              }
              v.mode = 12;
              break;
            case 17:
              for (; P < 14; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              if (v.nlen = 257 + (31 & V), V >>>= 5, P -= 5, v.ndist = 1 + (31 & V), V >>>= 5, P -= 5, v.ncode = 4 + (15 & V), V >>>= 4, P -= 4, 286 < v.nlen || 30 < v.ndist) {
                N.msg = "too many length or distance symbols", v.mode = 30;
                break;
              }
              v.have = 0, v.mode = 18;
            case 18:
              for (; v.have < v.ncode; ) {
                for (; P < 3; ) {
                  if (Q === 0) break e;
                  Q--, V += K[H++] << P, P += 8;
                }
                v.lens[L[v.have++]] = 7 & V, V >>>= 3, P -= 3;
              }
              for (; v.have < 19; ) v.lens[L[v.have++]] = 0;
              if (v.lencode = v.lendyn, v.lenbits = 7, E = { bits: v.lenbits }, Y = k(0, v.lens, 0, 19, v.lencode, 0, v.work, E), v.lenbits = E.bits, Y) {
                N.msg = "invalid code lengths set", v.mode = 30;
                break;
              }
              v.have = 0, v.mode = 19;
            case 19:
              for (; v.have < v.nlen + v.ndist; ) {
                for (; W = (s = v.lencode[V & (1 << v.lenbits) - 1]) >>> 16 & 255, M = 65535 & s, !((y = s >>> 24) <= P); ) {
                  if (Q === 0) break e;
                  Q--, V += K[H++] << P, P += 8;
                }
                if (M < 16) V >>>= y, P -= y, v.lens[v.have++] = M;
                else {
                  if (M === 16) {
                    for (i = y + 2; P < i; ) {
                      if (Q === 0) break e;
                      Q--, V += K[H++] << P, P += 8;
                    }
                    if (V >>>= y, P -= y, v.have === 0) {
                      N.msg = "invalid bit length repeat", v.mode = 30;
                      break;
                    }
                    d = v.lens[v.have - 1], te = 3 + (3 & V), V >>>= 2, P -= 2;
                  } else if (M === 17) {
                    for (i = y + 3; P < i; ) {
                      if (Q === 0) break e;
                      Q--, V += K[H++] << P, P += 8;
                    }
                    P -= y, d = 0, te = 3 + (7 & (V >>>= y)), V >>>= 3, P -= 3;
                  } else {
                    for (i = y + 7; P < i; ) {
                      if (Q === 0) break e;
                      Q--, V += K[H++] << P, P += 8;
                    }
                    P -= y, d = 0, te = 11 + (127 & (V >>>= y)), V >>>= 7, P -= 7;
                  }
                  if (v.have + te > v.nlen + v.ndist) {
                    N.msg = "invalid bit length repeat", v.mode = 30;
                    break;
                  }
                  for (; te--; ) v.lens[v.have++] = d;
                }
              }
              if (v.mode === 30) break;
              if (v.lens[256] === 0) {
                N.msg = "invalid code -- missing end-of-block", v.mode = 30;
                break;
              }
              if (v.lenbits = 9, E = { bits: v.lenbits }, Y = k(A, v.lens, 0, v.nlen, v.lencode, 0, v.work, E), v.lenbits = E.bits, Y) {
                N.msg = "invalid literal/lengths set", v.mode = 30;
                break;
              }
              if (v.distbits = 6, v.distcode = v.distdyn, E = { bits: v.distbits }, Y = k(R, v.lens, v.nlen, v.ndist, v.distcode, 0, v.work, E), v.distbits = E.bits, Y) {
                N.msg = "invalid distances set", v.mode = 30;
                break;
              }
              if (v.mode = 20, U === 6) break e;
            case 20:
              v.mode = 21;
            case 21:
              if (6 <= Q && 258 <= ce) {
                N.next_out = ie, N.avail_out = ce, N.next_in = H, N.avail_in = Q, v.hold = V, v.bits = P, h(N, Z), ie = N.next_out, ee = N.output, ce = N.avail_out, H = N.next_in, K = N.input, Q = N.avail_in, V = v.hold, P = v.bits, v.mode === 12 && (v.back = -1);
                break;
              }
              for (v.back = 0; W = (s = v.lencode[V & (1 << v.lenbits) - 1]) >>> 16 & 255, M = 65535 & s, !((y = s >>> 24) <= P); ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              if (W && (240 & W) == 0) {
                for (O = y, D = W, J = M; W = (s = v.lencode[J + ((V & (1 << O + D) - 1) >> O)]) >>> 16 & 255, M = 65535 & s, !(O + (y = s >>> 24) <= P); ) {
                  if (Q === 0) break e;
                  Q--, V += K[H++] << P, P += 8;
                }
                V >>>= O, P -= O, v.back += O;
              }
              if (V >>>= y, P -= y, v.back += y, v.length = M, W === 0) {
                v.mode = 26;
                break;
              }
              if (32 & W) {
                v.back = -1, v.mode = 12;
                break;
              }
              if (64 & W) {
                N.msg = "invalid literal/length code", v.mode = 30;
                break;
              }
              v.extra = 15 & W, v.mode = 22;
            case 22:
              if (v.extra) {
                for (i = v.extra; P < i; ) {
                  if (Q === 0) break e;
                  Q--, V += K[H++] << P, P += 8;
                }
                v.length += V & (1 << v.extra) - 1, V >>>= v.extra, P -= v.extra, v.back += v.extra;
              }
              v.was = v.length, v.mode = 23;
            case 23:
              for (; W = (s = v.distcode[V & (1 << v.distbits) - 1]) >>> 16 & 255, M = 65535 & s, !((y = s >>> 24) <= P); ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              if ((240 & W) == 0) {
                for (O = y, D = W, J = M; W = (s = v.distcode[J + ((V & (1 << O + D) - 1) >> O)]) >>> 16 & 255, M = 65535 & s, !(O + (y = s >>> 24) <= P); ) {
                  if (Q === 0) break e;
                  Q--, V += K[H++] << P, P += 8;
                }
                V >>>= O, P -= O, v.back += O;
              }
              if (V >>>= y, P -= y, v.back += y, 64 & W) {
                N.msg = "invalid distance code", v.mode = 30;
                break;
              }
              v.offset = M, v.extra = 15 & W, v.mode = 24;
            case 24:
              if (v.extra) {
                for (i = v.extra; P < i; ) {
                  if (Q === 0) break e;
                  Q--, V += K[H++] << P, P += 8;
                }
                v.offset += V & (1 << v.extra) - 1, V >>>= v.extra, P -= v.extra, v.back += v.extra;
              }
              if (v.offset > v.dmax) {
                N.msg = "invalid distance too far back", v.mode = 30;
                break;
              }
              v.mode = 25;
            case 25:
              if (ce === 0) break e;
              if (te = Z - ce, v.offset > te) {
                if ((te = v.offset - te) > v.whave && v.sane) {
                  N.msg = "invalid distance too far back", v.mode = 30;
                  break;
                }
                G = te > v.wnext ? (te -= v.wnext, v.wsize - te) : v.wnext - te, te > v.length && (te = v.length), b = v.window;
              } else b = ee, G = ie - v.offset, te = v.length;
              for (ce < te && (te = ce), ce -= te, v.length -= te; ee[ie++] = b[G++], --te; ) ;
              v.length === 0 && (v.mode = 21);
              break;
            case 26:
              if (ce === 0) break e;
              ee[ie++] = v.length, ce--, v.mode = 21;
              break;
            case 27:
              if (v.wrap) {
                for (; P < 32; ) {
                  if (Q === 0) break e;
                  Q--, V |= K[H++] << P, P += 8;
                }
                if (Z -= ce, N.total_out += Z, v.total += Z, Z && (N.adler = v.check = v.flags ? a(v.check, ee, Z, ie - Z) : f(v.check, ee, Z, ie - Z)), Z = ce, (v.flags ? V : o(V)) !== v.check) {
                  N.msg = "incorrect data check", v.mode = 30;
                  break;
                }
                P = V = 0;
              }
              v.mode = 28;
            case 28:
              if (v.wrap && v.flags) {
                for (; P < 32; ) {
                  if (Q === 0) break e;
                  Q--, V += K[H++] << P, P += 8;
                }
                if (V !== (4294967295 & v.total)) {
                  N.msg = "incorrect length check", v.mode = 30;
                  break;
                }
                P = V = 0;
              }
              v.mode = 29;
            case 29:
              Y = 1;
              break e;
            case 30:
              Y = -3;
              break e;
            case 31:
              return -4;
            default:
              return _;
          }
          return N.next_out = ie, N.avail_out = ce, N.next_in = H, N.avail_in = Q, v.hold = V, v.bits = P, (v.wsize || Z !== N.avail_out && v.mode < 30 && (v.mode < 27 || U !== 4)) && le(N, N.output, N.next_out, Z - N.avail_out) ? (v.mode = 31, -4) : (X -= N.avail_in, Z -= N.avail_out, N.total_in += X, N.total_out += Z, v.total += Z, v.wrap && Z && (N.adler = v.check = v.flags ? a(v.check, ee, Z, N.next_out - Z) : f(v.check, ee, Z, N.next_out - Z)), N.data_type = v.bits + (v.last ? 64 : 0) + (v.mode === 12 ? 128 : 0) + (v.mode === 20 || v.mode === 15 ? 256 : 0), (X == 0 && Z === 0 || U === 4) && Y === I && (Y = -5), Y);
        }, u.inflateEnd = function(N) {
          if (!N || !N.state) return _;
          var U = N.state;
          return U.window && (U.window = null), N.state = null, I;
        }, u.inflateGetHeader = function(N, U) {
          var v;
          return N && N.state ? (2 & (v = N.state).wrap) == 0 ? _ : ((v.head = U).done = !1, I) : _;
        }, u.inflateSetDictionary = function(N, U) {
          var v, K = U.length;
          return N && N.state ? (v = N.state).wrap !== 0 && v.mode !== 11 ? _ : v.mode === 11 && f(1, U, K, 0) !== v.check ? -3 : le(N, U, K, K) ? (v.mode = 31, -4) : (v.havedict = 1, I) : _;
        }, u.inflateInfo = "pako inflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(r, n, u) {
        var l = r("../utils/common"), f = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], a = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], k = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        n.exports = function(A, R, I, _, S, w, T, o) {
          var g, m, c, x, F, B, z, C, $, le = o.bits, N = 0, U = 0, v = 0, K = 0, ee = 0, H = 0, ie = 0, Q = 0, ce = 0, V = 0, P = null, X = 0, Z = new l.Buf16(16), te = new l.Buf16(16), G = null, b = 0;
          for (N = 0; N <= 15; N++) Z[N] = 0;
          for (U = 0; U < _; U++) Z[R[I + U]]++;
          for (ee = le, K = 15; 1 <= K && Z[K] === 0; K--) ;
          if (K < ee && (ee = K), K === 0) return S[w++] = 20971520, S[w++] = 20971520, o.bits = 1, 0;
          for (v = 1; v < K && Z[v] === 0; v++) ;
          for (ee < v && (ee = v), N = Q = 1; N <= 15; N++) if (Q <<= 1, (Q -= Z[N]) < 0) return -1;
          if (0 < Q && (A === 0 || K !== 1)) return -1;
          for (te[1] = 0, N = 1; N < 15; N++) te[N + 1] = te[N] + Z[N];
          for (U = 0; U < _; U++) R[I + U] !== 0 && (T[te[R[I + U]]++] = U);
          if (B = A === 0 ? (P = G = T, 19) : A === 1 ? (P = f, X -= 257, G = a, b -= 257, 256) : (P = h, G = k, -1), N = v, F = w, ie = U = V = 0, c = -1, x = (ce = 1 << (H = ee)) - 1, A === 1 && 852 < ce || A === 2 && 592 < ce) return 1;
          for (; ; ) {
            for (z = N - ie, $ = T[U] < B ? (C = 0, T[U]) : T[U] > B ? (C = G[b + T[U]], P[X + T[U]]) : (C = 96, 0), g = 1 << N - ie, v = m = 1 << H; S[F + (V >> ie) + (m -= g)] = z << 24 | C << 16 | $ | 0, m !== 0; ) ;
            for (g = 1 << N - 1; V & g; ) g >>= 1;
            if (g !== 0 ? (V &= g - 1, V += g) : V = 0, U++, --Z[N] == 0) {
              if (N === K) break;
              N = R[I + T[U]];
            }
            if (ee < N && (V & x) !== c) {
              for (ie === 0 && (ie = ee), F += v, Q = 1 << (H = N - ie); H + ie < K && !((Q -= Z[H + ie]) <= 0); ) H++, Q <<= 1;
              if (ce += 1 << H, A === 1 && 852 < ce || A === 2 && 592 < ce) return 1;
              S[c = V & x] = ee << 24 | H << 16 | F - w | 0;
            }
          }
          return V !== 0 && (S[F + V] = N - ie << 24 | 64 << 16 | 0), o.bits = ee, 0;
        };
      }, { "../utils/common": 41 }], 51: [function(r, n, u) {
        n.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
      }, {}], 52: [function(r, n, u) {
        var l = r("../utils/common"), f = 0, a = 1;
        function h(s) {
          for (var p = s.length; 0 <= --p; ) s[p] = 0;
        }
        var k = 0, A = 29, R = 256, I = R + 1 + A, _ = 30, S = 19, w = 2 * I + 1, T = 15, o = 16, g = 7, m = 256, c = 16, x = 17, F = 18, B = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], z = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], $ = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], le = new Array(2 * (I + 2));
        h(le);
        var N = new Array(2 * _);
        h(N);
        var U = new Array(512);
        h(U);
        var v = new Array(256);
        h(v);
        var K = new Array(A);
        h(K);
        var ee, H, ie, Q = new Array(_);
        function ce(s, p, L, q, j) {
          this.static_tree = s, this.extra_bits = p, this.extra_base = L, this.elems = q, this.max_length = j, this.has_stree = s && s.length;
        }
        function V(s, p) {
          this.dyn_tree = s, this.max_code = 0, this.stat_desc = p;
        }
        function P(s) {
          return s < 256 ? U[s] : U[256 + (s >>> 7)];
        }
        function X(s, p) {
          s.pending_buf[s.pending++] = 255 & p, s.pending_buf[s.pending++] = p >>> 8 & 255;
        }
        function Z(s, p, L) {
          s.bi_valid > o - L ? (s.bi_buf |= p << s.bi_valid & 65535, X(s, s.bi_buf), s.bi_buf = p >> o - s.bi_valid, s.bi_valid += L - o) : (s.bi_buf |= p << s.bi_valid & 65535, s.bi_valid += L);
        }
        function te(s, p, L) {
          Z(s, L[2 * p], L[2 * p + 1]);
        }
        function G(s, p) {
          for (var L = 0; L |= 1 & s, s >>>= 1, L <<= 1, 0 < --p; ) ;
          return L >>> 1;
        }
        function b(s, p, L) {
          var q, j, ne = new Array(T + 1), oe = 0;
          for (q = 1; q <= T; q++) ne[q] = oe = oe + L[q - 1] << 1;
          for (j = 0; j <= p; j++) {
            var se = s[2 * j + 1];
            se !== 0 && (s[2 * j] = G(ne[se]++, se));
          }
        }
        function y(s) {
          var p;
          for (p = 0; p < I; p++) s.dyn_ltree[2 * p] = 0;
          for (p = 0; p < _; p++) s.dyn_dtree[2 * p] = 0;
          for (p = 0; p < S; p++) s.bl_tree[2 * p] = 0;
          s.dyn_ltree[2 * m] = 1, s.opt_len = s.static_len = 0, s.last_lit = s.matches = 0;
        }
        function W(s) {
          8 < s.bi_valid ? X(s, s.bi_buf) : 0 < s.bi_valid && (s.pending_buf[s.pending++] = s.bi_buf), s.bi_buf = 0, s.bi_valid = 0;
        }
        function M(s, p, L, q) {
          var j = 2 * p, ne = 2 * L;
          return s[j] < s[ne] || s[j] === s[ne] && q[p] <= q[L];
        }
        function O(s, p, L) {
          for (var q = s.heap[L], j = L << 1; j <= s.heap_len && (j < s.heap_len && M(p, s.heap[j + 1], s.heap[j], s.depth) && j++, !M(p, q, s.heap[j], s.depth)); ) s.heap[L] = s.heap[j], L = j, j <<= 1;
          s.heap[L] = q;
        }
        function D(s, p, L) {
          var q, j, ne, oe, se = 0;
          if (s.last_lit !== 0) for (; q = s.pending_buf[s.d_buf + 2 * se] << 8 | s.pending_buf[s.d_buf + 2 * se + 1], j = s.pending_buf[s.l_buf + se], se++, q === 0 ? te(s, j, p) : (te(s, (ne = v[j]) + R + 1, p), (oe = B[ne]) !== 0 && Z(s, j -= K[ne], oe), te(s, ne = P(--q), L), (oe = z[ne]) !== 0 && Z(s, q -= Q[ne], oe)), se < s.last_lit; ) ;
          te(s, m, p);
        }
        function J(s, p) {
          var L, q, j, ne = p.dyn_tree, oe = p.stat_desc.static_tree, se = p.stat_desc.has_stree, he = p.stat_desc.elems, de = -1;
          for (s.heap_len = 0, s.heap_max = w, L = 0; L < he; L++) ne[2 * L] !== 0 ? (s.heap[++s.heap_len] = de = L, s.depth[L] = 0) : ne[2 * L + 1] = 0;
          for (; s.heap_len < 2; ) ne[2 * (j = s.heap[++s.heap_len] = de < 2 ? ++de : 0)] = 1, s.depth[j] = 0, s.opt_len--, se && (s.static_len -= oe[2 * j + 1]);
          for (p.max_code = de, L = s.heap_len >> 1; 1 <= L; L--) O(s, ne, L);
          for (j = he; L = s.heap[1], s.heap[1] = s.heap[s.heap_len--], O(s, ne, 1), q = s.heap[1], s.heap[--s.heap_max] = L, s.heap[--s.heap_max] = q, ne[2 * j] = ne[2 * L] + ne[2 * q], s.depth[j] = (s.depth[L] >= s.depth[q] ? s.depth[L] : s.depth[q]) + 1, ne[2 * L + 1] = ne[2 * q + 1] = j, s.heap[1] = j++, O(s, ne, 1), 2 <= s.heap_len; ) ;
          s.heap[--s.heap_max] = s.heap[1], (function(we, Ie) {
            var Ze, Be, xt, _e, jt, fr, qe = Ie.dyn_tree, Fi = Ie.max_code, uu = Ie.stat_desc.static_tree, lu = Ie.stat_desc.has_stree, cu = Ie.stat_desc.extra_bits, Di = Ie.stat_desc.extra_base, Tt = Ie.stat_desc.max_length, zt = 0;
            for (_e = 0; _e <= T; _e++) we.bl_count[_e] = 0;
            for (qe[2 * we.heap[we.heap_max] + 1] = 0, Ze = we.heap_max + 1; Ze < w; Ze++) Tt < (_e = qe[2 * qe[2 * (Be = we.heap[Ze]) + 1] + 1] + 1) && (_e = Tt, zt++), qe[2 * Be + 1] = _e, Fi < Be || (we.bl_count[_e]++, jt = 0, Di <= Be && (jt = cu[Be - Di]), fr = qe[2 * Be], we.opt_len += fr * (_e + jt), lu && (we.static_len += fr * (uu[2 * Be + 1] + jt)));
            if (zt !== 0) {
              do {
                for (_e = Tt - 1; we.bl_count[_e] === 0; ) _e--;
                we.bl_count[_e]--, we.bl_count[_e + 1] += 2, we.bl_count[Tt]--, zt -= 2;
              } while (0 < zt);
              for (_e = Tt; _e !== 0; _e--) for (Be = we.bl_count[_e]; Be !== 0; ) Fi < (xt = we.heap[--Ze]) || (qe[2 * xt + 1] !== _e && (we.opt_len += (_e - qe[2 * xt + 1]) * qe[2 * xt], qe[2 * xt + 1] = _e), Be--);
            }
          })(s, p), b(ne, de, s.bl_count);
        }
        function d(s, p, L) {
          var q, j, ne = -1, oe = p[1], se = 0, he = 7, de = 4;
          for (oe === 0 && (he = 138, de = 3), p[2 * (L + 1) + 1] = 65535, q = 0; q <= L; q++) j = oe, oe = p[2 * (q + 1) + 1], ++se < he && j === oe || (se < de ? s.bl_tree[2 * j] += se : j !== 0 ? (j !== ne && s.bl_tree[2 * j]++, s.bl_tree[2 * c]++) : se <= 10 ? s.bl_tree[2 * x]++ : s.bl_tree[2 * F]++, ne = j, de = (se = 0) === oe ? (he = 138, 3) : j === oe ? (he = 6, 3) : (he = 7, 4));
        }
        function Y(s, p, L) {
          var q, j, ne = -1, oe = p[1], se = 0, he = 7, de = 4;
          for (oe === 0 && (he = 138, de = 3), q = 0; q <= L; q++) if (j = oe, oe = p[2 * (q + 1) + 1], !(++se < he && j === oe)) {
            if (se < de) for (; te(s, j, s.bl_tree), --se != 0; ) ;
            else j !== 0 ? (j !== ne && (te(s, j, s.bl_tree), se--), te(s, c, s.bl_tree), Z(s, se - 3, 2)) : se <= 10 ? (te(s, x, s.bl_tree), Z(s, se - 3, 3)) : (te(s, F, s.bl_tree), Z(s, se - 11, 7));
            ne = j, de = (se = 0) === oe ? (he = 138, 3) : j === oe ? (he = 6, 3) : (he = 7, 4);
          }
        }
        h(Q);
        var E = !1;
        function i(s, p, L, q) {
          Z(s, (k << 1) + (q ? 1 : 0), 3), (function(j, ne, oe, se) {
            W(j), X(j, oe), X(j, ~oe), l.arraySet(j.pending_buf, j.window, ne, oe, j.pending), j.pending += oe;
          })(s, p, L);
        }
        u._tr_init = function(s) {
          E || ((function() {
            var p, L, q, j, ne, oe = new Array(T + 1);
            for (j = q = 0; j < A - 1; j++) for (K[j] = q, p = 0; p < 1 << B[j]; p++) v[q++] = j;
            for (v[q - 1] = j, j = ne = 0; j < 16; j++) for (Q[j] = ne, p = 0; p < 1 << z[j]; p++) U[ne++] = j;
            for (ne >>= 7; j < _; j++) for (Q[j] = ne << 7, p = 0; p < 1 << z[j] - 7; p++) U[256 + ne++] = j;
            for (L = 0; L <= T; L++) oe[L] = 0;
            for (p = 0; p <= 143; ) le[2 * p + 1] = 8, p++, oe[8]++;
            for (; p <= 255; ) le[2 * p + 1] = 9, p++, oe[9]++;
            for (; p <= 279; ) le[2 * p + 1] = 7, p++, oe[7]++;
            for (; p <= 287; ) le[2 * p + 1] = 8, p++, oe[8]++;
            for (b(le, I + 1, oe), p = 0; p < _; p++) N[2 * p + 1] = 5, N[2 * p] = G(p, 5);
            ee = new ce(le, B, R + 1, I, T), H = new ce(N, z, 0, _, T), ie = new ce(new Array(0), C, 0, S, g);
          })(), E = !0), s.l_desc = new V(s.dyn_ltree, ee), s.d_desc = new V(s.dyn_dtree, H), s.bl_desc = new V(s.bl_tree, ie), s.bi_buf = 0, s.bi_valid = 0, y(s);
        }, u._tr_stored_block = i, u._tr_flush_block = function(s, p, L, q) {
          var j, ne, oe = 0;
          0 < s.level ? (s.strm.data_type === 2 && (s.strm.data_type = (function(se) {
            var he, de = 4093624447;
            for (he = 0; he <= 31; he++, de >>>= 1) if (1 & de && se.dyn_ltree[2 * he] !== 0) return f;
            if (se.dyn_ltree[18] !== 0 || se.dyn_ltree[20] !== 0 || se.dyn_ltree[26] !== 0) return a;
            for (he = 32; he < R; he++) if (se.dyn_ltree[2 * he] !== 0) return a;
            return f;
          })(s)), J(s, s.l_desc), J(s, s.d_desc), oe = (function(se) {
            var he;
            for (d(se, se.dyn_ltree, se.l_desc.max_code), d(se, se.dyn_dtree, se.d_desc.max_code), J(se, se.bl_desc), he = S - 1; 3 <= he && se.bl_tree[2 * $[he] + 1] === 0; he--) ;
            return se.opt_len += 3 * (he + 1) + 5 + 5 + 4, he;
          })(s), j = s.opt_len + 3 + 7 >>> 3, (ne = s.static_len + 3 + 7 >>> 3) <= j && (j = ne)) : j = ne = L + 5, L + 4 <= j && p !== -1 ? i(s, p, L, q) : s.strategy === 4 || ne === j ? (Z(s, 2 + (q ? 1 : 0), 3), D(s, le, N)) : (Z(s, 4 + (q ? 1 : 0), 3), (function(se, he, de, we) {
            var Ie;
            for (Z(se, he - 257, 5), Z(se, de - 1, 5), Z(se, we - 4, 4), Ie = 0; Ie < we; Ie++) Z(se, se.bl_tree[2 * $[Ie] + 1], 3);
            Y(se, se.dyn_ltree, he - 1), Y(se, se.dyn_dtree, de - 1);
          })(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, oe + 1), D(s, s.dyn_ltree, s.dyn_dtree)), y(s), q && W(s);
        }, u._tr_tally = function(s, p, L) {
          return s.pending_buf[s.d_buf + 2 * s.last_lit] = p >>> 8 & 255, s.pending_buf[s.d_buf + 2 * s.last_lit + 1] = 255 & p, s.pending_buf[s.l_buf + s.last_lit] = 255 & L, s.last_lit++, p === 0 ? s.dyn_ltree[2 * L]++ : (s.matches++, p--, s.dyn_ltree[2 * (v[L] + R + 1)]++, s.dyn_dtree[2 * P(p)]++), s.last_lit === s.lit_bufsize - 1;
        }, u._tr_align = function(s) {
          Z(s, 2, 3), te(s, m, le), (function(p) {
            p.bi_valid === 16 ? (X(p, p.bi_buf), p.bi_buf = 0, p.bi_valid = 0) : 8 <= p.bi_valid && (p.pending_buf[p.pending++] = 255 & p.bi_buf, p.bi_buf >>= 8, p.bi_valid -= 8);
          })(s);
        };
      }, { "../utils/common": 41 }], 53: [function(r, n, u) {
        n.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}], 54: [function(r, n, u) {
        (function(l) {
          (function(f, a) {
            if (!f.setImmediate) {
              var h, k, A, R, I = 1, _ = {}, S = !1, w = f.document, T = Object.getPrototypeOf && Object.getPrototypeOf(f);
              T = T && T.setTimeout ? T : f, h = {}.toString.call(f.process) === "[object process]" ? function(c) {
                ge.nextTick(function() {
                  g(c);
                });
              } : (function() {
                if (f.postMessage && !f.importScripts) {
                  var c = !0, x = f.onmessage;
                  return f.onmessage = function() {
                    c = !1;
                  }, f.postMessage("", "*"), f.onmessage = x, c;
                }
              })() ? (R = "setImmediate$" + Math.random() + "$", f.addEventListener ? f.addEventListener("message", m, !1) : f.attachEvent("onmessage", m), function(c) {
                f.postMessage(R + c, "*");
              }) : f.MessageChannel ? ((A = new MessageChannel()).port1.onmessage = function(c) {
                g(c.data);
              }, function(c) {
                A.port2.postMessage(c);
              }) : w && "onreadystatechange" in w.createElement("script") ? (k = w.documentElement, function(c) {
                var x = w.createElement("script");
                x.onreadystatechange = function() {
                  g(c), x.onreadystatechange = null, k.removeChild(x), x = null;
                }, k.appendChild(x);
              }) : function(c) {
                setTimeout(g, 0, c);
              }, T.setImmediate = function(c) {
                typeof c != "function" && (c = new Function("" + c));
                for (var x = new Array(arguments.length - 1), F = 0; F < x.length; F++) x[F] = arguments[F + 1];
                var B = { callback: c, args: x };
                return _[I] = B, h(I), I++;
              }, T.clearImmediate = o;
            }
            function o(c) {
              delete _[c];
            }
            function g(c) {
              if (S) setTimeout(g, 0, c);
              else {
                var x = _[c];
                if (x) {
                  S = !0;
                  try {
                    (function(F) {
                      var B = F.callback, z = F.args;
                      switch (z.length) {
                        case 0:
                          B();
                          break;
                        case 1:
                          B(z[0]);
                          break;
                        case 2:
                          B(z[0], z[1]);
                          break;
                        case 3:
                          B(z[0], z[1], z[2]);
                          break;
                        default:
                          B.apply(a, z);
                      }
                    })(x);
                  } finally {
                    o(c), S = !1;
                  }
                }
              }
            }
            function m(c) {
              c.source === f && typeof c.data == "string" && c.data.indexOf(R) === 0 && g(+c.data.slice(R.length));
            }
          })(typeof self > "u" ? l === void 0 ? this : l : self);
        }).call(this, typeof Pe < "u" ? Pe : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}] }, {}, [10])(10);
    });
  })(si)), si.exports;
}
var op = sp();
const up = /* @__PURE__ */ gi(op);
var Rt = { exports: {} }, oi, js;
function lp() {
  if (js) return oi;
  js = 1;
  var t = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function e(r) {
    return r && r.replace ? r.replace(/([&"<>'])/g, function(n, u) {
      return t[u];
    }) : r;
  }
  return oi = e, oi;
}
var zs;
function cp() {
  if (zs) return Rt.exports;
  zs = 1;
  var t = lp(), e = Ti().Stream, r = "    ";
  function n(k, A) {
    typeof A != "object" && (A = {
      indent: A
    });
    var R = A.stream ? new e() : null, I = "", _ = !1, S = A.indent ? A.indent === !0 ? r : A.indent : "", w = !0;
    function T(x) {
      w ? ge.nextTick(x) : x();
    }
    function o(x, F) {
      if (F !== void 0 && (I += F), x && !_ && (R = R || new e(), _ = !0), x && _) {
        var B = I;
        T(function() {
          R.emit("data", B);
        }), I = "";
      }
    }
    function g(x, F) {
      a(o, f(x, S, S ? 1 : 0), F);
    }
    function m() {
      if (R) {
        var x = I;
        T(function() {
          R.emit("data", x), R.emit("end"), R.readable = !1, R.emit("close");
        });
      }
    }
    function c(x) {
      var F = x.encoding || "UTF-8", B = { version: "1.0", encoding: F };
      x.standalone && (B.standalone = x.standalone), g({ "?xml": { _attr: B } }), I = I.replace("/>", "?>");
    }
    return T(function() {
      w = !1;
    }), A.declaration && c(A.declaration), k && k.forEach ? k.forEach(function(x, F) {
      var B;
      F + 1 === k.length && (B = m), g(x, B);
    }) : g(k, m), R ? (R.readable = !0, R) : I;
  }
  function u() {
    var k = Array.prototype.slice.call(arguments), A = {
      _elem: f(k)
    };
    return A.push = function(R) {
      if (!this.append)
        throw new Error("not assigned to a parent!");
      var I = this, _ = this._elem.indent;
      a(
        this.append,
        f(
          R,
          _,
          this._elem.icount + (_ ? 1 : 0)
        ),
        function() {
          I.append(!0);
        }
      );
    }, A.close = function(R) {
      R !== void 0 && this.push(R), this.end && this.end();
    }, A;
  }
  function l(k, A) {
    return new Array(A || 0).join(k || "");
  }
  function f(k, A, R) {
    R = R || 0;
    var I = l(A, R), _, S = k, w = !1;
    if (typeof k == "object") {
      var T = Object.keys(k);
      if (_ = T[0], S = k[_], S && S._elem)
        return S._elem.name = _, S._elem.icount = R, S._elem.indent = A, S._elem.indents = I, S._elem.interrupt = S, S._elem;
    }
    var o = [], g = [], m;
    function c(x) {
      var F = Object.keys(x);
      F.forEach(function(B) {
        o.push(h(B, x[B]));
      });
    }
    switch (typeof S) {
      case "object":
        if (S === null) break;
        S._attr && c(S._attr), S._cdata && g.push(
          ("<![CDATA[" + S._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>"
        ), S.forEach && (m = !1, g.push(""), S.forEach(function(x) {
          if (typeof x == "object") {
            var F = Object.keys(x)[0];
            F == "_attr" ? c(x._attr) : g.push(f(
              x,
              A,
              R + 1
            ));
          } else
            g.pop(), m = !0, g.push(t(x));
        }), m || g.push(""));
        break;
      default:
        g.push(t(S));
    }
    return {
      name: _,
      interrupt: w,
      attributes: o,
      content: g,
      icount: R,
      indents: I,
      indent: A
    };
  }
  function a(k, A, R) {
    if (typeof A != "object")
      return k(!1, A);
    var I = A.interrupt ? 1 : A.content.length;
    function _() {
      for (; A.content.length; ) {
        var w = A.content.shift();
        if (w !== void 0) {
          if (S(w)) return;
          a(k, w);
        }
      }
      k(!1, (I > 1 ? A.indents : "") + (A.name ? "</" + A.name + ">" : "") + (A.indent && !R ? `
` : "")), R && R();
    }
    function S(w) {
      return w.interrupt ? (w.interrupt.append = k, w.interrupt.end = _, w.interrupt = !1, k(!0), !0) : !1;
    }
    if (k(!1, A.indents + (A.name ? "<" + A.name : "") + (A.attributes.length ? " " + A.attributes.join(" ") : "") + (I ? A.name ? ">" : "" : A.name ? "/>" : "") + (A.indent && I > 1 ? `
` : "")), !I)
      return k(!1, A.indent ? `
` : "");
    S(A) || _();
  }
  function h(k, A) {
    return k + '="' + t(A) + '"';
  }
  return Rt.exports = n, Rt.exports.element = Rt.exports.Element = u, Rt.exports;
}
var hp = cp();
const ve = /* @__PURE__ */ gi(hp), It = 0, ui = 32, fp = 32, dp = (t, e) => {
  const r = e.replace(/-/g, "");
  if (r.length !== fp)
    throw new Error(`Error: Cannot extract GUID from font filename: ${e}`);
  const u = r.replace(/(..)/g, "$1 ").trim().split(" ").map((h) => parseInt(h, 16));
  u.reverse();
  const f = t.slice(It, ui).map((h, k) => h ^ u[k % u.length]), a = new Uint8Array(It + f.length + Math.max(0, t.length - ui));
  return a.set(t.slice(0, It)), a.set(f, It), a.set(t.slice(ui), It + f.length), a;
};
class pp {
  /**
   * Formats an XML component into a serializable object.
   *
   * @param input - The XML component to format
   * @param context - The context containing file state and relationships
   * @returns A serializable XML object structure
   * @throws Error if the component cannot be formatted correctly
   */
  format(e, r = { stack: [] }) {
    const n = e.prepForXml(r);
    if (n)
      return n;
    throw Error("XMLComponent did not format correctly");
  }
}
class mp {
  /**
   * Replaces image placeholder tokens with relationship IDs.
   *
   * @param xmlData - The XML string containing image placeholders
   * @param mediaData - Array of media data to replace
   * @param offset - Starting offset for relationship IDs
   * @returns XML string with placeholders replaced by relationship IDs
   */
  replace(e, r, n) {
    let u = e;
    return r.forEach((l, f) => {
      u = u.replace(new RegExp(`{${l.fileName}}`, "g"), (n + f).toString());
    }), u;
  }
  /**
   * Extracts media data referenced in the XML content.
   *
   * @param xmlData - The XML string to search for media references
   * @param media - The media collection to search within
   * @returns Array of media data found in the XML
   */
  getMediaData(e, r) {
    return r.Array.filter((n) => e.search(`{${n.fileName}}`) > 0);
  }
}
class wp {
  /**
   * Replaces numbering placeholder tokens with actual numbering IDs.
   *
   * Placeholder format: {reference-instance} where reference identifies the
   * numbering definition and instance is the specific usage.
   *
   * @param xmlData - The XML string containing numbering placeholders
   * @param concreteNumberings - Array of concrete numbering instances to replace
   * @returns XML string with placeholders replaced by numbering IDs
   */
  replace(e, r) {
    let n = e;
    for (const u of r)
      n = n.replace(
        new RegExp(`{${u.reference}-${u.instance}}`, "g"),
        u.numId.toString()
      );
    return n;
  }
}
class gp {
  /**
   * Creates a new Compiler instance.
   *
   * Initializes the formatter and replacer utilities used during compilation.
   */
  constructor() {
    re(this, "formatter"), re(this, "imageReplacer"), re(this, "numberingReplacer"), this.formatter = new pp(), this.imageReplacer = new mp(), this.numberingReplacer = new wp();
  }
  /**
   * Compiles a File object into a JSZip archive containing the complete OOXML package.
   *
   * This method orchestrates the entire compilation process:
   * - Converts all document components to XML
   * - Manages image and numbering placeholder replacements
   * - Creates relationship files
   * - Packages fonts and media files
   * - Assembles everything into a ZIP archive
   *
   * @param file - The document to compile
   * @param prettifyXml - Optional XML formatting style
   * @param overrides - Optional custom XML file overrides
   * @returns A JSZip instance containing the complete .docx package
   */
  compile(e, r, n = []) {
    const u = new up(), l = this.xmlifyFile(e, r), f = new Map(Object.entries(l));
    for (const [, a] of f)
      if (Array.isArray(a))
        for (const h of a)
          u.file(h.path, Zn(h.data));
      else
        u.file(a.path, Zn(a.data));
    for (const a of n)
      u.file(a.path, Zn(a.data));
    for (const a of e.Media.Array)
      a.type !== "svg" ? u.file(`word/media/${a.fileName}`, a.data) : (u.file(`word/media/${a.fileName}`, a.data), u.file(`word/media/${a.fallback.fileName}`, a.fallback.data));
    for (const { data: a, name: h, fontKey: k } of e.FontTable.fontOptionsWithKey) {
      const [A] = h.split(".");
      u.file(`word/fonts/${A}.odttf`, dp(a, k));
    }
    return u;
  }
  xmlifyFile(e, r) {
    const n = e.Document.Relationships.RelationshipCount + 1, u = ve(
      this.formatter.format(e.Document.View, {
        viewWrapper: e.Document,
        file: e,
        stack: []
      }),
      {
        indent: r,
        declaration: {
          standalone: "yes",
          encoding: "UTF-8"
        }
      }
    ), l = e.Comments.Relationships.RelationshipCount + 1, f = ve(
      this.formatter.format(e.Comments, {
        viewWrapper: {
          View: e.Comments,
          Relationships: e.Comments.Relationships
        },
        file: e,
        stack: []
      }),
      {
        indent: r,
        declaration: {
          standalone: "yes",
          encoding: "UTF-8"
        }
      }
    ), a = e.FootNotes.Relationships.RelationshipCount + 1, h = ve(
      this.formatter.format(e.FootNotes.View, {
        viewWrapper: e.FootNotes,
        file: e,
        stack: []
      }),
      {
        indent: r,
        declaration: {
          standalone: "yes",
          encoding: "UTF-8"
        }
      }
    ), k = this.imageReplacer.getMediaData(u, e.Media), A = this.imageReplacer.getMediaData(f, e.Media), R = this.imageReplacer.getMediaData(h, e.Media);
    return {
      Relationships: {
        data: (k.forEach((I, _) => {
          e.Document.Relationships.addRelationship(
            n + _,
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
            `media/${I.fileName}`
          );
        }), e.Document.Relationships.addRelationship(
          e.Document.Relationships.RelationshipCount + 1,
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable",
          "fontTable.xml"
        ), ve(
          this.formatter.format(e.Document.Relationships, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        )),
        path: "word/_rels/document.xml.rels"
      },
      Document: {
        data: (() => {
          const I = this.imageReplacer.replace(u, k, n);
          return this.numberingReplacer.replace(I, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/document.xml"
      },
      Styles: {
        data: (() => {
          const I = ve(
            this.formatter.format(e.Styles, {
              viewWrapper: e.Document,
              file: e,
              stack: []
            }),
            {
              indent: r,
              declaration: {
                standalone: "yes",
                encoding: "UTF-8"
              }
            }
          );
          return this.numberingReplacer.replace(I, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/styles.xml"
      },
      Properties: {
        data: ve(
          this.formatter.format(e.CoreProperties, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "docProps/core.xml"
      },
      Numbering: {
        data: ve(
          this.formatter.format(e.Numbering, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/numbering.xml"
      },
      FileRelationships: {
        data: ve(
          this.formatter.format(e.FileRelationships, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ),
        path: "_rels/.rels"
      },
      HeaderRelationships: e.Headers.map((I, _) => {
        const S = ve(
          this.formatter.format(I.View, {
            viewWrapper: I,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        );
        return this.imageReplacer.getMediaData(S, e.Media).forEach((T, o) => {
          I.Relationships.addRelationship(
            o,
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
            `media/${T.fileName}`
          );
        }), {
          data: ve(
            this.formatter.format(I.Relationships, {
              viewWrapper: I,
              file: e,
              stack: []
            }),
            {
              indent: r,
              declaration: {
                encoding: "UTF-8"
              }
            }
          ),
          path: `word/_rels/header${_ + 1}.xml.rels`
        };
      }),
      FooterRelationships: e.Footers.map((I, _) => {
        const S = ve(
          this.formatter.format(I.View, {
            viewWrapper: I,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        );
        return this.imageReplacer.getMediaData(S, e.Media).forEach((T, o) => {
          I.Relationships.addRelationship(
            o,
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
            `media/${T.fileName}`
          );
        }), {
          data: ve(
            this.formatter.format(I.Relationships, {
              viewWrapper: I,
              file: e,
              stack: []
            }),
            {
              indent: r,
              declaration: {
                encoding: "UTF-8"
              }
            }
          ),
          path: `word/_rels/footer${_ + 1}.xml.rels`
        };
      }),
      Headers: e.Headers.map((I, _) => {
        const S = ve(
          this.formatter.format(I.View, {
            viewWrapper: I,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ), w = this.imageReplacer.getMediaData(S, e.Media), T = this.imageReplacer.replace(S, w, 0);
        return {
          data: this.numberingReplacer.replace(T, e.Numbering.ConcreteNumbering),
          path: `word/header${_ + 1}.xml`
        };
      }),
      Footers: e.Footers.map((I, _) => {
        const S = ve(
          this.formatter.format(I.View, {
            viewWrapper: I,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ), w = this.imageReplacer.getMediaData(S, e.Media), T = this.imageReplacer.replace(S, w, 0);
        return {
          data: this.numberingReplacer.replace(T, e.Numbering.ConcreteNumbering),
          path: `word/footer${_ + 1}.xml`
        };
      }),
      ContentTypes: {
        data: ve(
          this.formatter.format(e.ContentTypes, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ),
        path: "[Content_Types].xml"
      },
      CustomProperties: {
        data: ve(
          this.formatter.format(e.CustomProperties, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "docProps/custom.xml"
      },
      AppProperties: {
        data: ve(
          this.formatter.format(e.AppProperties, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "docProps/app.xml"
      },
      FootNotes: {
        data: (() => {
          const I = this.imageReplacer.replace(h, R, a);
          return this.numberingReplacer.replace(I, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (R.forEach((I, _) => {
          e.FootNotes.Relationships.addRelationship(
            a + _,
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
            `media/${I.fileName}`
          );
        }), ve(
          this.formatter.format(e.FootNotes.Relationships, {
            viewWrapper: e.FootNotes,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        )),
        path: "word/_rels/footnotes.xml.rels"
      },
      Endnotes: {
        data: ve(
          this.formatter.format(e.Endnotes.View, {
            viewWrapper: e.Endnotes,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/endnotes.xml"
      },
      EndnotesRelationships: {
        data: ve(
          this.formatter.format(e.Endnotes.Relationships, {
            viewWrapper: e.Endnotes,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/_rels/endnotes.xml.rels"
      },
      Settings: {
        data: ve(
          this.formatter.format(e.Settings, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/settings.xml"
      },
      Comments: {
        data: (() => {
          const I = this.imageReplacer.replace(f, A, l);
          return this.numberingReplacer.replace(I, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (A.forEach((I, _) => {
          e.Comments.Relationships.addRelationship(
            l + _,
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
            `media/${I.fileName}`
          );
        }), ve(
          this.formatter.format(e.Comments.Relationships, {
            viewWrapper: {
              View: e.Comments,
              Relationships: e.Comments.Relationships
            },
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        )),
        path: "word/_rels/comments.xml.rels"
      },
      FontTable: {
        data: ve(
          this.formatter.format(e.FontTable.View, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/fontTable.xml"
      },
      FontTableRelationships: {
        data: ve(
          this.formatter.format(e.FontTable.Relationships, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }),
          {
            indent: r,
            declaration: {
              encoding: "UTF-8"
            }
          }
        ),
        path: "word/_rels/fontTable.xml.rels"
      }
    };
  }
}
const yp = {
  /** Indent with 2 spaces */
  WITH_2_BLANKS: "  "
}, Ws = (t) => t === !0 ? yp.WITH_2_BLANKS : t === !1 ? void 0 : t, su = class mt {
  /**
   * Exports a document to the specified output format.
   *
   * @param file - The document to export
   * @param type - The output format type (e.g., "nodebuffer", "blob", "string")
   * @param prettify - Whether to prettify the XML output (boolean or PrettifyType)
   * @param overrides - Optional array of file overrides for custom XML content
   * @returns A promise resolving to the exported document in the specified format
   */
  // eslint-disable-next-line require-await
  static pack(e, r, n) {
    return wu(this, arguments, function* (u, l, f, a = []) {
      return this.compiler.compile(u, Ws(f), a).generateAsync({
        type: l,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE"
      });
    });
  }
  /**
   * Exports a document to a string representation.
   *
   * @param file - The document to export
   * @param prettify - Whether to prettify the XML output
   * @param overrides - Optional array of file overrides
   * @returns A promise resolving to the document as a string
   */
  static toString(e, r, n = []) {
    return mt.pack(e, "string", r, n);
  }
  /**
   * Exports a document to a Node.js Buffer.
   *
   * @param file - The document to export
   * @param prettify - Whether to prettify the XML output
   * @param overrides - Optional array of file overrides
   * @returns A promise resolving to the document as a Buffer
   */
  static toBuffer(e, r, n = []) {
    return mt.pack(e, "nodebuffer", r, n);
  }
  /**
   * Exports a document to a base64-encoded string.
   *
   * @param file - The document to export
   * @param prettify - Whether to prettify the XML output
   * @param overrides - Optional array of file overrides
   * @returns A promise resolving to the document as a base64 string
   */
  static toBase64String(e, r, n = []) {
    return mt.pack(e, "base64", r, n);
  }
  /**
   * Exports a document to a Blob (for browser environments).
   *
   * @param file - The document to export
   * @param prettify - Whether to prettify the XML output
   * @param overrides - Optional array of file overrides
   * @returns A promise resolving to the document as a Blob
   */
  static toBlob(e, r, n = []) {
    return mt.pack(e, "blob", r, n);
  }
  /**
   * Exports a document to an ArrayBuffer.
   *
   * @param file - The document to export
   * @param prettify - Whether to prettify the XML output
   * @param overrides - Optional array of file overrides
   * @returns A promise resolving to the document as an ArrayBuffer
   */
  static toArrayBuffer(e, r, n = []) {
    return mt.pack(e, "arraybuffer", r, n);
  }
  /**
   * Exports a document to a Node.js Stream.
   *
   * @param file - The document to export
   * @param prettify - Whether to prettify the XML output
   * @param overrides - Optional array of file overrides
   * @returns A readable stream containing the document data
   */
  static toStream(e, r, n = []) {
    const u = new ap.Stream();
    return this.compiler.compile(e, Ws(r), n).generateAsync({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }).then((f) => {
      u.emit("data", f), u.emit("end");
    }), u;
  }
};
re(su, "compiler", new gp());
let vp = su;
async function Qp(t, e = {}) {
  const r = await bp(t, e);
  return vp.toBlob(r);
}
async function bp(t, e = {}) {
  const {
    sections: r = [],
    header: n = null,
    footer: u = null,
    headerFirstPageOnly: l = !1,
    footerFirstPageOnly: f = !1
  } = t, {
    paragraphStyles: a,
    numbering: h,
    pageMargin: k,
    ...A
  } = e, R = { nextId: 1, footnotes: {} };
  Qt(r.flat(), R), n && Qt(n, R), u && Qt(u, R);
  const { loadAsset: I } = e, _ = await li(r.flat(), I), S = {
    properties: {
      type: Pf.CONTINUOUS,
      page: {
        pageNumbers: { start: 1, formatType: Al.DECIMAL },
        ...k ? { margin: k } : {}
      }
    },
    children: _
  };
  if (n) {
    const T = await li(n, I), o = new iu({ children: T }), g = Zt(!0);
    l ? (S.headers = { first: o, default: g }, S.properties.titlePage = !0) : S.headers = { default: o };
  } else
    S.headers = { default: Zt(!0) };
  if (u) {
    const T = await li(u, I), o = new au({ children: T }), g = Zt(!1);
    f ? (S.footers = { first: o, default: g }, S.properties.titlePage = !0) : S.footers = { default: o };
  } else
    S.footers = { default: Zt(!1) };
  S.properties.titlePage && (S.headers && !S.headers.first && (S.headers.first = S.headers.default), S.footers && !S.footers.first && (S.footers.first = S.footers.default));
  const w = {
    ...A,
    sections: [S]
  };
  return a && a.length && (w.styles = { paragraphStyles: a }), h && h.length && (w.numbering = { config: h }), Object.keys(R.footnotes).length && (w.footnotes = R.footnotes), new Yd(w);
}
function Qt(t, e) {
  if (Array.isArray(t)) {
    for (const r of t)
      if (!(!r || typeof r != "object")) {
        if (r.type === "footnoteReference") {
          const n = e.nextId;
          e.nextId += 1, r.footnoteId = n;
          const u = [];
          for (const l of r.children || [])
            if (l.type === "paragraph")
              u.push(Pi(l));
            else {
              const f = Ut(l);
              f.length && u.push(new xe({ children: f }));
            }
          u.length || u.push(new xe({})), e.footnotes[n] = { children: u };
        }
        r.children && Qt(r.children, e);
      }
  }
}
function Zt(t) {
  const e = t ? Te.RIGHT : Te.CENTER, r = t ? iu : au;
  return new r({
    children: [
      new xe({
        alignment: e,
        children: [
          new Ne("Page "),
          new Ne({ children: [Ye.CURRENT] }),
          new Ne(" of "),
          new Ne({ children: [Ye.TOTAL_PAGES] })
        ]
      })
    ]
  });
}
async function li(t, e) {
  return (await Promise.all(
    t.map((n) => _p(n, e))
  )).flat();
}
async function _p(t, e) {
  switch (t.type) {
    case "table":
      return [await Gp(t)];
    case "image":
      return [await Xp(t, e)];
    case "tableOfContents":
      return [Ep(t)];
    case "webOnly":
      return [];
    default:
      return [await qp(t)];
  }
}
function Ep(t) {
  const e = t.toc || {}, r = e.title || "Contents", n = {
    hyperlink: e.hyperlink === "true" || e.hyperlink === !0 || e.hyperlink == null,
    headingStyleRange: e.headingRange || "1-3"
  };
  return new tp(r, n);
}
function Pi(t) {
  const e = {};
  if (t.heading && (e.heading = Cp(t.heading)), t.style && (e.style = t.style), t.alignment && (e.alignment = Op(t.alignment)), t.pageBreakBefore && (e.pageBreakBefore = !0), t.spacing) {
    e.spacing = {};
    const n = ze(t.spacing.before), u = ze(t.spacing.after);
    n != null && (e.spacing.before = n), u != null && (e.spacing.after = u);
  }
  if (t.bullet && (e.bullet = { level: ze(t.bullet.level) ?? 0 }), t.numbering) {
    e.numbering = {
      reference: t.numbering.reference,
      level: ze(t.numbering.level) ?? 0
    };
    const n = ze(t.numbering.instance);
    n != null && (e.numbering.instance = n);
  }
  const r = (t.children || []).flatMap(Ut);
  return t.bookmark && r.length ? e.children = [new Wo({ id: t.bookmark, children: r })] : r.length && (e.children = r), new xe(e);
}
function Ut(t) {
  switch (t.type) {
    case "text":
      return xp(t);
    case "externalHyperlink":
      return [Tp(t)];
    case "internalHyperlink":
      return [Sp(t)];
    case "image":
      return [];
    case "webOnly":
      return [];
    case "footnoteReference":
      return t.footnoteId ? [new ip(t.footnoteId)] : [];
    default:
      return t.content ? [new Ne({ text: t.content })] : t.children ? t.children.flatMap(Ut) : [];
  }
}
function xp(t) {
  const e = [];
  t.positionalTab && e.push(
    new Ne({
      children: [
        new yh({
          alignment: Up(t.positionalTab.alignment),
          leader: zp(t.positionalTab.leader),
          relativeTo: Hp(t.positionalTab.relativeTo)
        })
      ]
    })
  );
  const r = t.content || "";
  if (r === "_currentPage")
    return e.push(new Ne({ children: [Ye.CURRENT] })), e;
  if (r === "_totalPages")
    return e.push(new Ne({ children: [Ye.TOTAL_PAGES] })), e;
  const n = { text: r };
  return (t.bold === "true" || t.bold === !0) && (n.bold = !0), (t.italics === "true" || t.italics === !0) && (n.italics = !0), t.underline && (n.underline = t.underline), t.style && (n.style = t.style), e.push(new Ne(n)), e;
}
function Tp(t) {
  const e = (t.children || []).flatMap(Ut);
  return new zo({
    children: e.length ? e : [new Ne({ text: t.link || "" })],
    link: t.link || ""
  });
}
function Sp(t) {
  const e = (t.children || []).flatMap(Ut);
  return new jo({
    children: e.length ? e : [new Ne({ text: t.anchor || "" })],
    anchor: t.anchor || ""
  });
}
function ou(t) {
  const e = (t.children || []).filter((r) => r.type === "tableRow").map(Ap);
  return new lf({ rows: e });
}
function Ap(t) {
  const e = (t.children || []).filter((r) => r.type === "tableCell").map(kp);
  return new ff({ children: e });
}
function kp(t) {
  const e = {};
  t.width && (e.width = Dp(t.width)), t.margins && (e.margins = Rp(t.margins)), t.borders && (e.borders = Lp(t.borders));
  const r = (t.children || []).flatMap((n) => n.type === "table" ? [ou(n)] : [Pi(n)]);
  return e.children = r.length ? r : [new xe({})], new Oi(e);
}
function ze(t) {
  if (t == null) return;
  const e = parseInt(t, 10);
  return isNaN(e) ? void 0 : e;
}
function Rp(t) {
  const e = {};
  for (const [r, n] of Object.entries(t)) {
    const u = ze(n);
    u != null && (e[r] = u);
  }
  return e;
}
const Ip = {
  HEADING_1: ft.HEADING_1,
  HEADING_2: ft.HEADING_2,
  HEADING_3: ft.HEADING_3,
  HEADING_4: ft.HEADING_4,
  HEADING_5: ft.HEADING_5,
  HEADING_6: ft.HEADING_6
};
function Cp(t) {
  return Ip[t];
}
const Np = {
  left: Te.LEFT,
  center: Te.CENTER,
  right: Te.RIGHT,
  justified: Te.JUSTIFIED,
  both: Te.JUSTIFIED
};
function Op(t) {
  return Np[t] ?? Te.LEFT;
}
const Pp = {
  percentage: je.PERCENTAGE,
  pct: je.PERCENTAGE,
  dxa: je.DXA,
  auto: je.AUTO,
  nil: je.NIL
};
function Fp(t) {
  return Pp[t] ?? je.DXA;
}
function Dp(t) {
  const e = ze(t.size) ?? 0, r = t.type;
  return r === "pct" || r === "percentage" ? {
    size: String(e * 50),
    type: je.PERCENTAGE
  } : {
    size: e,
    type: Fp(r)
  };
}
const Bp = {
  single: Oe.SINGLE,
  double: Oe.DOUBLE,
  dotted: Oe.DOTTED,
  dashed: Oe.DASHED,
  none: Oe.NONE,
  nil: Oe.NIL,
  thick: Oe.THICK,
  triple: Oe.TRIPLE
};
function Lp(t) {
  const e = {};
  for (const [r, n] of Object.entries(t))
    e[r] = {
      style: Bp[n.style] ?? Oe.SINGLE,
      size: ze(n.size) ?? 1,
      color: n.color || "000000"
    };
  return e;
}
const Mp = {
  left: Jt.LEFT,
  center: Jt.CENTER,
  right: Jt.RIGHT
};
function Up(t) {
  return Mp[t] ?? Jt.LEFT;
}
const jp = {
  none: st.NONE,
  dot: st.DOT,
  hyphen: st.HYPHEN,
  underscore: st.UNDERSCORE,
  heavy: st.HEAVY,
  middleDot: st.MIDDLE_DOT
};
function zp(t) {
  return jp[t] ?? st.NONE;
}
const Wp = {
  indent: mi.INDENT,
  margin: mi.MARGIN
};
function Hp(t) {
  return Wp[t] ?? mi.MARGIN;
}
async function qp(t) {
  return Pi(t);
}
async function Gp(t) {
  return ou(t);
}
let Kp = 1;
function Vp(t, e) {
  const r = (t.split(/[?#]/)[0].match(/\.([a-zA-Z0-9]+)$/)?.[1] || "").toLowerCase();
  if (r === "png") return "png";
  if (r === "jpg" || r === "jpeg") return "jpg";
  if (r === "gif") return "gif";
  if (r === "bmp") return "bmp";
  const n = new Uint8Array(e instanceof ArrayBuffer ? e : e?.buffer ?? e);
  if (n.length >= 4) {
    if (n[0] === 137 && n[1] === 80 && n[2] === 78 && n[3] === 71) return "png";
    if (n[0] === 255 && n[1] === 216 && n[2] === 255) return "jpg";
    if (n[0] === 71 && n[1] === 73 && n[2] === 70) return "gif";
    if (n[0] === 66 && n[1] === 77) return "bmp";
  }
  return "png";
}
async function Xp(t, e) {
  try {
    const r = t.src || "";
    if (!r) return new xe({});
    const n = await $p(r, e), u = ze(t.transformation?.width) ?? 400, l = ze(t.transformation?.height) ?? 300, f = {
      type: Vp(r, n),
      data: n,
      transformation: { width: u, height: l },
      altText: {
        id: Kp++,
        name: "",
        ...t.altText || {}
      }
    };
    return t.floating && (f.floating = t.floating), new xe({
      children: [new oh(f)]
    });
  } catch (r) {
    return console.error("Error creating image element:", r), new xe({});
  }
}
async function $p(t, e) {
  const { bytes: r } = await hu(t, { loadAsset: e });
  return r;
}
export {
  bp as buildDocument,
  Qp as compileDocx,
  Zt as createDefaultHeaderFooter
};
//# sourceMappingURL=docx-DnLMskId.js.map
