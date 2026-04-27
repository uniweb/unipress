import { f as Eu } from "./fetch-C-PgllAm.js";
import { D as yr, r as xu, a as Tu } from "./_entry.generated-BhDNGElH.js";
var Su = Object.defineProperty, Au = Object.defineProperties, ku = Object.getOwnPropertyDescriptors, ar = Object.getOwnPropertySymbols, Zs = Object.prototype.hasOwnProperty, Ys = Object.prototype.propertyIsEnumerable, wi = (t, e, r) => e in t ? Su(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, me = (t, e) => {
  for (var r in e || (e = {}))
    Zs.call(e, r) && wi(t, r, e[r]);
  if (ar)
    for (var r of ar(e))
      Ys.call(e, r) && wi(t, r, e[r]);
  return t;
}, Ae = (t, e) => Au(t, ku(e)), Ru = (t, e) => {
  var r = {};
  for (var n in t)
    Zs.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
  if (t != null && ar)
    for (var n of ar(t))
      e.indexOf(n) < 0 && Ys.call(t, n) && (r[n] = t[n]);
  return r;
}, re = (t, e, r) => wi(t, typeof e != "symbol" ? e + "" : e, r), Iu = (t, e, r) => new Promise((n, o) => {
  var l = (h) => {
    try {
      a(r.next(h));
    } catch (A) {
      o(A);
    }
  }, f = (h) => {
    try {
      a(r.throw(h));
    } catch (A) {
      o(A);
    }
  }, a = (h) => h.done ? n(h.value) : Promise.resolve(h.value).then(l, f);
  a((r = r.apply(t, e)).next());
});
class sr {
  /**
   * Creates a new BaseXmlComponent with the specified XML element name.
   *
   * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
   */
  constructor(e) {
    re(this, "rootKey"), this.rootKey = e;
  }
}
const Cu = Object.seal({});
class ae extends sr {
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
    const n = this.root.map((o) => o instanceof sr ? o.prepForXml(e) : o).filter((o) => o !== void 0);
    return e.stack.pop(), {
      [this.rootKey]: n.length ? n.length === 1 && ((r = n[0]) != null && r._attr) ? n[0] : n : Cu
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
class tt extends ae {
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
class pe extends sr {
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
    return Object.entries(this.root).forEach(([n, o]) => {
      if (o !== void 0) {
        const l = this.xmlKeys && this.xmlKeys[n] || n;
        r[l] = o;
      }
    }), { _attr: r };
  }
}
class Js extends sr {
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
    return { _attr: Object.values(this.root).filter(({ value: n }) => n !== void 0).reduce((n, { key: o, value: l }) => Ae(me({}, n), { [o]: l }), {}) };
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
var Fe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ti(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var vr = {}, Kt = { exports: {} }, Hi;
function Si() {
  if (Hi) return Kt.exports;
  Hi = 1;
  var t = typeof Reflect == "object" ? Reflect : null, e = t && typeof t.apply == "function" ? t.apply : function(E, F, B) {
    return Function.prototype.apply.call(E, F, B);
  }, r;
  t && typeof t.ownKeys == "function" ? r = t.ownKeys : Object.getOwnPropertySymbols ? r = function(E) {
    return Object.getOwnPropertyNames(E).concat(Object.getOwnPropertySymbols(E));
  } : r = function(E) {
    return Object.getOwnPropertyNames(E);
  };
  function n(c) {
    console && console.warn && console.warn(c);
  }
  var o = Number.isNaN || function(E) {
    return E !== E;
  };
  function l() {
    l.init.call(this);
  }
  Kt.exports = l, Kt.exports.once = u, l.EventEmitter = l, l.prototype._events = void 0, l.prototype._eventsCount = 0, l.prototype._maxListeners = void 0;
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
      if (typeof c != "number" || c < 0 || o(c))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + c + ".");
      f = c;
    }
  }), l.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, l.prototype.setMaxListeners = function(E) {
    if (typeof E != "number" || E < 0 || o(E))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + E + ".");
    return this._maxListeners = E, this;
  };
  function h(c) {
    return c._maxListeners === void 0 ? l.defaultMaxListeners : c._maxListeners;
  }
  l.prototype.getMaxListeners = function() {
    return h(this);
  }, l.prototype.emit = function(E) {
    for (var F = [], B = 1; B < arguments.length; B++) F.push(arguments[B]);
    var z = E === "error", C = this._events;
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
    var N = C[E];
    if (N === void 0)
      return !1;
    if (typeof N == "function")
      e(N, this, F);
    else
      for (var U = N.length, v = R(N, U), B = 0; B < U; ++B)
        e(v[B], this, F);
    return !0;
  };
  function A(c, E, F, B) {
    var z, C, $;
    if (a(F), C = c._events, C === void 0 ? (C = c._events = /* @__PURE__ */ Object.create(null), c._eventsCount = 0) : (C.newListener !== void 0 && (c.emit(
      "newListener",
      E,
      F.listener ? F.listener : F
    ), C = c._events), $ = C[E]), $ === void 0)
      $ = C[E] = F, ++c._eventsCount;
    else if (typeof $ == "function" ? $ = C[E] = B ? [F, $] : [$, F] : B ? $.unshift(F) : $.push(F), z = h(c), z > 0 && $.length > z && !$.warned) {
      $.warned = !0;
      var le = new Error("Possible EventEmitter memory leak detected. " + $.length + " " + String(E) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      le.name = "MaxListenersExceededWarning", le.emitter = c, le.type = E, le.count = $.length, n(le);
    }
    return c;
  }
  l.prototype.addListener = function(E, F) {
    return A(this, E, F, !1);
  }, l.prototype.on = l.prototype.addListener, l.prototype.prependListener = function(E, F) {
    return A(this, E, F, !0);
  };
  function S() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function k(c, E, F) {
    var B = { fired: !1, wrapFn: void 0, target: c, type: E, listener: F }, z = S.bind(B);
    return z.listener = F, B.wrapFn = z, z;
  }
  l.prototype.once = function(E, F) {
    return a(F), this.on(E, k(this, E, F)), this;
  }, l.prototype.prependOnceListener = function(E, F) {
    return a(F), this.prependListener(E, k(this, E, F)), this;
  }, l.prototype.removeListener = function(E, F) {
    var B, z, C, $, le;
    if (a(F), z = this._events, z === void 0)
      return this;
    if (B = z[E], B === void 0)
      return this;
    if (B === F || B.listener === F)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete z[E], z.removeListener && this.emit("removeListener", E, B.listener || F));
    else if (typeof B != "function") {
      for (C = -1, $ = B.length - 1; $ >= 0; $--)
        if (B[$] === F || B[$].listener === F) {
          le = B[$].listener, C = $;
          break;
        }
      if (C < 0)
        return this;
      C === 0 ? B.shift() : g(B, C), B.length === 1 && (z[E] = B[0]), z.removeListener !== void 0 && this.emit("removeListener", E, le || F);
    }
    return this;
  }, l.prototype.off = l.prototype.removeListener, l.prototype.removeAllListeners = function(E) {
    var F, B, z;
    if (B = this._events, B === void 0)
      return this;
    if (B.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : B[E] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete B[E]), this;
    if (arguments.length === 0) {
      var C = Object.keys(B), $;
      for (z = 0; z < C.length; ++z)
        $ = C[z], $ !== "removeListener" && this.removeAllListeners($);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (F = B[E], typeof F == "function")
      this.removeListener(E, F);
    else if (F !== void 0)
      for (z = F.length - 1; z >= 0; z--)
        this.removeListener(E, F[z]);
    return this;
  };
  function I(c, E, F) {
    var B = c._events;
    if (B === void 0)
      return [];
    var z = B[E];
    return z === void 0 ? [] : typeof z == "function" ? F ? [z.listener || z] : [z] : F ? T(z) : R(z, z.length);
  }
  l.prototype.listeners = function(E) {
    return I(this, E, !0);
  }, l.prototype.rawListeners = function(E) {
    return I(this, E, !1);
  }, l.listenerCount = function(c, E) {
    return typeof c.listenerCount == "function" ? c.listenerCount(E) : b.call(c, E);
  }, l.prototype.listenerCount = b;
  function b(c) {
    var E = this._events;
    if (E !== void 0) {
      var F = E[c];
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
  function R(c, E) {
    for (var F = new Array(E), B = 0; B < E; ++B)
      F[B] = c[B];
    return F;
  }
  function g(c, E) {
    for (; E + 1 < c.length; E++)
      c[E] = c[E + 1];
    c.pop();
  }
  function T(c) {
    for (var E = new Array(c.length), F = 0; F < E.length; ++F)
      E[F] = c[F].listener || c[F];
    return E;
  }
  function u(c, E) {
    return new Promise(function(F, B) {
      function z($) {
        c.removeListener(E, C), B($);
      }
      function C() {
        typeof c.removeListener == "function" && c.removeListener("error", z), F([].slice.call(arguments));
      }
      p(c, E, C, { once: !0 }), E !== "error" && w(c, z, { once: !0 });
    });
  }
  function w(c, E, F) {
    typeof c.on == "function" && p(c, "error", E, F);
  }
  function p(c, E, F, B) {
    if (typeof c.on == "function")
      B.once ? c.once(E, F) : c.on(E, F);
    else if (typeof c.addEventListener == "function")
      c.addEventListener(E, function z(C) {
        B.once && c.removeEventListener(E, z), F(C);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof c);
  }
  return Kt.exports;
}
var Vt = { exports: {} }, qi;
function rt() {
  return qi || (qi = 1, typeof Object.create == "function" ? Vt.exports = function(e, r) {
    r && (e.super_ = r, e.prototype = Object.create(r.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : Vt.exports = function(e, r) {
    if (r) {
      e.super_ = r;
      var n = function() {
      };
      n.prototype = r.prototype, e.prototype = new n(), e.prototype.constructor = e;
    }
  }), Vt.exports;
}
function Nu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Qs = { exports: {} }, Ee = Qs.exports = {}, Ue, je;
function yi() {
  throw new Error("setTimeout has not been defined");
}
function vi() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Ue = setTimeout : Ue = yi;
  } catch {
    Ue = yi;
  }
  try {
    typeof clearTimeout == "function" ? je = clearTimeout : je = vi;
  } catch {
    je = vi;
  }
})();
function eo(t) {
  if (Ue === setTimeout)
    return setTimeout(t, 0);
  if ((Ue === yi || !Ue) && setTimeout)
    return Ue = setTimeout, setTimeout(t, 0);
  try {
    return Ue(t, 0);
  } catch {
    try {
      return Ue.call(null, t, 0);
    } catch {
      return Ue.call(this, t, 0);
    }
  }
}
function Ou(t) {
  if (je === clearTimeout)
    return clearTimeout(t);
  if ((je === vi || !je) && clearTimeout)
    return je = clearTimeout, clearTimeout(t);
  try {
    return je(t);
  } catch {
    try {
      return je.call(null, t);
    } catch {
      return je.call(this, t);
    }
  }
}
var Xe = [], yt = !1, lt, rr = -1;
function Pu() {
  !yt || !lt || (yt = !1, lt.length ? Xe = lt.concat(Xe) : rr = -1, Xe.length && to());
}
function to() {
  if (!yt) {
    var t = eo(Pu);
    yt = !0;
    for (var e = Xe.length; e; ) {
      for (lt = Xe, Xe = []; ++rr < e; )
        lt && lt[rr].run();
      rr = -1, e = Xe.length;
    }
    lt = null, yt = !1, Ou(t);
  }
}
Ee.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
  Xe.push(new ro(t, e)), Xe.length === 1 && !yt && eo(to);
};
function ro(t, e) {
  this.fun = t, this.array = e;
}
ro.prototype.run = function() {
  this.fun.apply(null, this.array);
};
Ee.title = "browser";
Ee.browser = !0;
Ee.env = {};
Ee.argv = [];
Ee.version = "";
Ee.versions = {};
function Ze() {
}
Ee.on = Ze;
Ee.addListener = Ze;
Ee.once = Ze;
Ee.off = Ze;
Ee.removeListener = Ze;
Ee.removeAllListeners = Ze;
Ee.emit = Ze;
Ee.prependListener = Ze;
Ee.prependOnceListener = Ze;
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
var Fu = Qs.exports;
const we = /* @__PURE__ */ Nu(Fu);
var br, Gi;
function no() {
  return Gi || (Gi = 1, br = Si().EventEmitter), br;
}
var _r = {}, kt = {}, Ki;
function Du() {
  if (Ki) return kt;
  Ki = 1, kt.byteLength = a, kt.toByteArray = A, kt.fromByteArray = I;
  for (var t = [], e = [], r = typeof Uint8Array < "u" ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, l = n.length; o < l; ++o)
    t[o] = n[o], e[n.charCodeAt(o)] = o;
  e[45] = 62, e[95] = 63;
  function f(b) {
    var R = b.length;
    if (R % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var g = b.indexOf("=");
    g === -1 && (g = R);
    var T = g === R ? 0 : 4 - g % 4;
    return [g, T];
  }
  function a(b) {
    var R = f(b), g = R[0], T = R[1];
    return (g + T) * 3 / 4 - T;
  }
  function h(b, R, g) {
    return (R + g) * 3 / 4 - g;
  }
  function A(b) {
    var R, g = f(b), T = g[0], u = g[1], w = new r(h(b, T, u)), p = 0, c = u > 0 ? T - 4 : T, E;
    for (E = 0; E < c; E += 4)
      R = e[b.charCodeAt(E)] << 18 | e[b.charCodeAt(E + 1)] << 12 | e[b.charCodeAt(E + 2)] << 6 | e[b.charCodeAt(E + 3)], w[p++] = R >> 16 & 255, w[p++] = R >> 8 & 255, w[p++] = R & 255;
    return u === 2 && (R = e[b.charCodeAt(E)] << 2 | e[b.charCodeAt(E + 1)] >> 4, w[p++] = R & 255), u === 1 && (R = e[b.charCodeAt(E)] << 10 | e[b.charCodeAt(E + 1)] << 4 | e[b.charCodeAt(E + 2)] >> 2, w[p++] = R >> 8 & 255, w[p++] = R & 255), w;
  }
  function S(b) {
    return t[b >> 18 & 63] + t[b >> 12 & 63] + t[b >> 6 & 63] + t[b & 63];
  }
  function k(b, R, g) {
    for (var T, u = [], w = R; w < g; w += 3)
      T = (b[w] << 16 & 16711680) + (b[w + 1] << 8 & 65280) + (b[w + 2] & 255), u.push(S(T));
    return u.join("");
  }
  function I(b) {
    for (var R, g = b.length, T = g % 3, u = [], w = 16383, p = 0, c = g - T; p < c; p += w)
      u.push(k(b, p, p + w > c ? c : p + w));
    return T === 1 ? (R = b[g - 1], u.push(
      t[R >> 2] + t[R << 4 & 63] + "=="
    )) : T === 2 && (R = (b[g - 2] << 8) + b[g - 1], u.push(
      t[R >> 10] + t[R >> 4 & 63] + t[R << 2 & 63] + "="
    )), u.join("");
  }
  return kt;
}
var Xt = {}, Vi;
function Bu() {
  return Vi || (Vi = 1, Xt.read = function(t, e, r, n, o) {
    var l, f, a = o * 8 - n - 1, h = (1 << a) - 1, A = h >> 1, S = -7, k = r ? o - 1 : 0, I = r ? -1 : 1, b = t[e + k];
    for (k += I, l = b & (1 << -S) - 1, b >>= -S, S += a; S > 0; l = l * 256 + t[e + k], k += I, S -= 8)
      ;
    for (f = l & (1 << -S) - 1, l >>= -S, S += n; S > 0; f = f * 256 + t[e + k], k += I, S -= 8)
      ;
    if (l === 0)
      l = 1 - A;
    else {
      if (l === h)
        return f ? NaN : (b ? -1 : 1) * (1 / 0);
      f = f + Math.pow(2, n), l = l - A;
    }
    return (b ? -1 : 1) * f * Math.pow(2, l - n);
  }, Xt.write = function(t, e, r, n, o, l) {
    var f, a, h, A = l * 8 - o - 1, S = (1 << A) - 1, k = S >> 1, I = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, b = n ? 0 : l - 1, R = n ? 1 : -1, g = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, f = S) : (f = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -f)) < 1 && (f--, h *= 2), f + k >= 1 ? e += I / h : e += I * Math.pow(2, 1 - k), e * h >= 2 && (f++, h /= 2), f + k >= S ? (a = 0, f = S) : f + k >= 1 ? (a = (e * h - 1) * Math.pow(2, o), f = f + k) : (a = e * Math.pow(2, k - 1) * Math.pow(2, o), f = 0)); o >= 8; t[r + b] = a & 255, b += R, a /= 256, o -= 8)
      ;
    for (f = f << o | a, A += o; A > 0; t[r + b] = f & 255, b += R, f /= 256, A -= 8)
      ;
    t[r + b - R] |= g * 128;
  }), Xt;
}
var Xi;
function lr() {
  return Xi || (Xi = 1, (function(t) {
    var e = Du(), r = Bu(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
    t.Buffer = a, t.SlowBuffer = w, t.INSPECT_MAX_BYTES = 50;
    var o = 2147483647;
    t.kMaxLength = o, a.TYPED_ARRAY_SUPPORT = l(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function l() {
      try {
        var x = new Uint8Array(1), i = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(i, Uint8Array.prototype), Object.setPrototypeOf(x, i), x.foo() === 42;
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
    function f(x) {
      if (x > o)
        throw new RangeError('The value "' + x + '" is invalid for option "size"');
      var i = new Uint8Array(x);
      return Object.setPrototypeOf(i, a.prototype), i;
    }
    function a(x, i, s) {
      if (typeof x == "number") {
        if (typeof i == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return k(x);
      }
      return h(x, i, s);
    }
    a.poolSize = 8192;
    function h(x, i, s) {
      if (typeof x == "string")
        return I(x, i);
      if (ArrayBuffer.isView(x))
        return R(x);
      if (x == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof x
        );
      if (J(x, ArrayBuffer) || x && J(x.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (J(x, SharedArrayBuffer) || x && J(x.buffer, SharedArrayBuffer)))
        return g(x, i, s);
      if (typeof x == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      var m = x.valueOf && x.valueOf();
      if (m != null && m !== x)
        return a.from(m, i, s);
      var L = T(x);
      if (L) return L;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof x[Symbol.toPrimitive] == "function")
        return a.from(
          x[Symbol.toPrimitive]("string"),
          i,
          s
        );
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof x
      );
    }
    a.from = function(x, i, s) {
      return h(x, i, s);
    }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
    function A(x) {
      if (typeof x != "number")
        throw new TypeError('"size" argument must be of type number');
      if (x < 0)
        throw new RangeError('The value "' + x + '" is invalid for option "size"');
    }
    function S(x, i, s) {
      return A(x), x <= 0 ? f(x) : i !== void 0 ? typeof s == "string" ? f(x).fill(i, s) : f(x).fill(i) : f(x);
    }
    a.alloc = function(x, i, s) {
      return S(x, i, s);
    };
    function k(x) {
      return A(x), f(x < 0 ? 0 : u(x) | 0);
    }
    a.allocUnsafe = function(x) {
      return k(x);
    }, a.allocUnsafeSlow = function(x) {
      return k(x);
    };
    function I(x, i) {
      if ((typeof i != "string" || i === "") && (i = "utf8"), !a.isEncoding(i))
        throw new TypeError("Unknown encoding: " + i);
      var s = p(x, i) | 0, m = f(s), L = m.write(x, i);
      return L !== s && (m = m.slice(0, L)), m;
    }
    function b(x) {
      for (var i = x.length < 0 ? 0 : u(x.length) | 0, s = f(i), m = 0; m < i; m += 1)
        s[m] = x[m] & 255;
      return s;
    }
    function R(x) {
      if (J(x, Uint8Array)) {
        var i = new Uint8Array(x);
        return g(i.buffer, i.byteOffset, i.byteLength);
      }
      return b(x);
    }
    function g(x, i, s) {
      if (i < 0 || x.byteLength < i)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (x.byteLength < i + (s || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      var m;
      return i === void 0 && s === void 0 ? m = new Uint8Array(x) : s === void 0 ? m = new Uint8Array(x, i) : m = new Uint8Array(x, i, s), Object.setPrototypeOf(m, a.prototype), m;
    }
    function T(x) {
      if (a.isBuffer(x)) {
        var i = u(x.length) | 0, s = f(i);
        return s.length === 0 || x.copy(s, 0, 0, i), s;
      }
      if (x.length !== void 0)
        return typeof x.length != "number" || d(x.length) ? f(0) : b(x);
      if (x.type === "Buffer" && Array.isArray(x.data))
        return b(x.data);
    }
    function u(x) {
      if (x >= o)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
      return x | 0;
    }
    function w(x) {
      return +x != x && (x = 0), a.alloc(+x);
    }
    a.isBuffer = function(i) {
      return i != null && i._isBuffer === !0 && i !== a.prototype;
    }, a.compare = function(i, s) {
      if (J(i, Uint8Array) && (i = a.from(i, i.offset, i.byteLength)), J(s, Uint8Array) && (s = a.from(s, s.offset, s.byteLength)), !a.isBuffer(i) || !a.isBuffer(s))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (i === s) return 0;
      for (var m = i.length, L = s.length, q = 0, j = Math.min(m, L); q < j; ++q)
        if (i[q] !== s[q]) {
          m = i[q], L = s[q];
          break;
        }
      return m < L ? -1 : L < m ? 1 : 0;
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
      var m;
      if (s === void 0)
        for (s = 0, m = 0; m < i.length; ++m)
          s += i[m].length;
      var L = a.allocUnsafe(s), q = 0;
      for (m = 0; m < i.length; ++m) {
        var j = i[m];
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
    function p(x, i) {
      if (a.isBuffer(x))
        return x.length;
      if (ArrayBuffer.isView(x) || J(x, ArrayBuffer))
        return x.byteLength;
      if (typeof x != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof x
        );
      var s = x.length, m = arguments.length > 2 && arguments[2] === !0;
      if (!m && s === 0) return 0;
      for (var L = !1; ; )
        switch (i) {
          case "ascii":
          case "latin1":
          case "binary":
            return s;
          case "utf8":
          case "utf-8":
            return y(x).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return s * 2;
          case "hex":
            return s >>> 1;
          case "base64":
            return O(x).length;
          default:
            if (L)
              return m ? -1 : y(x).length;
            i = ("" + i).toLowerCase(), L = !0;
        }
    }
    a.byteLength = p;
    function c(x, i, s) {
      var m = !1;
      if ((i === void 0 || i < 0) && (i = 0), i > this.length || ((s === void 0 || s > this.length) && (s = this.length), s <= 0) || (s >>>= 0, i >>>= 0, s <= i))
        return "";
      for (x || (x = "utf8"); ; )
        switch (x) {
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
            if (m) throw new TypeError("Unknown encoding: " + x);
            x = (x + "").toLowerCase(), m = !0;
        }
    }
    a.prototype._isBuffer = !0;
    function E(x, i, s) {
      var m = x[i];
      x[i] = x[s], x[s] = m;
    }
    a.prototype.swap16 = function() {
      var i = this.length;
      if (i % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var s = 0; s < i; s += 2)
        E(this, s, s + 1);
      return this;
    }, a.prototype.swap32 = function() {
      var i = this.length;
      if (i % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var s = 0; s < i; s += 4)
        E(this, s, s + 3), E(this, s + 1, s + 2);
      return this;
    }, a.prototype.swap64 = function() {
      var i = this.length;
      if (i % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var s = 0; s < i; s += 8)
        E(this, s, s + 7), E(this, s + 1, s + 6), E(this, s + 2, s + 5), E(this, s + 3, s + 4);
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
    }, n && (a.prototype[n] = a.prototype.inspect), a.prototype.compare = function(i, s, m, L, q) {
      if (J(i, Uint8Array) && (i = a.from(i, i.offset, i.byteLength)), !a.isBuffer(i))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof i
        );
      if (s === void 0 && (s = 0), m === void 0 && (m = i ? i.length : 0), L === void 0 && (L = 0), q === void 0 && (q = this.length), s < 0 || m > i.length || L < 0 || q > this.length)
        throw new RangeError("out of range index");
      if (L >= q && s >= m)
        return 0;
      if (L >= q)
        return -1;
      if (s >= m)
        return 1;
      if (s >>>= 0, m >>>= 0, L >>>= 0, q >>>= 0, this === i) return 0;
      for (var j = q - L, ne = m - s, oe = Math.min(j, ne), se = this.slice(L, q), he = i.slice(s, m), de = 0; de < oe; ++de)
        if (se[de] !== he[de]) {
          j = se[de], ne = he[de];
          break;
        }
      return j < ne ? -1 : ne < j ? 1 : 0;
    };
    function F(x, i, s, m, L) {
      if (x.length === 0) return -1;
      if (typeof s == "string" ? (m = s, s = 0) : s > 2147483647 ? s = 2147483647 : s < -2147483648 && (s = -2147483648), s = +s, d(s) && (s = L ? 0 : x.length - 1), s < 0 && (s = x.length + s), s >= x.length) {
        if (L) return -1;
        s = x.length - 1;
      } else if (s < 0)
        if (L) s = 0;
        else return -1;
      if (typeof i == "string" && (i = a.from(i, m)), a.isBuffer(i))
        return i.length === 0 ? -1 : B(x, i, s, m, L);
      if (typeof i == "number")
        return i = i & 255, typeof Uint8Array.prototype.indexOf == "function" ? L ? Uint8Array.prototype.indexOf.call(x, i, s) : Uint8Array.prototype.lastIndexOf.call(x, i, s) : B(x, [i], s, m, L);
      throw new TypeError("val must be string, number or Buffer");
    }
    function B(x, i, s, m, L) {
      var q = 1, j = x.length, ne = i.length;
      if (m !== void 0 && (m = String(m).toLowerCase(), m === "ucs2" || m === "ucs-2" || m === "utf16le" || m === "utf-16le")) {
        if (x.length < 2 || i.length < 2)
          return -1;
        q = 2, j /= 2, ne /= 2, s /= 2;
      }
      function oe(Ie, Ye) {
        return q === 1 ? Ie[Ye] : Ie.readUInt16BE(Ye * q);
      }
      var se;
      if (L) {
        var he = -1;
        for (se = s; se < j; se++)
          if (oe(x, se) === oe(i, he === -1 ? 0 : se - he)) {
            if (he === -1 && (he = se), se - he + 1 === ne) return he * q;
          } else
            he !== -1 && (se -= se - he), he = -1;
      } else
        for (s + ne > j && (s = j - ne), se = s; se >= 0; se--) {
          for (var de = !0, ge = 0; ge < ne; ge++)
            if (oe(x, se + ge) !== oe(i, ge)) {
              de = !1;
              break;
            }
          if (de) return se;
        }
      return -1;
    }
    a.prototype.includes = function(i, s, m) {
      return this.indexOf(i, s, m) !== -1;
    }, a.prototype.indexOf = function(i, s, m) {
      return F(this, i, s, m, !0);
    }, a.prototype.lastIndexOf = function(i, s, m) {
      return F(this, i, s, m, !1);
    };
    function z(x, i, s, m) {
      s = Number(s) || 0;
      var L = x.length - s;
      m ? (m = Number(m), m > L && (m = L)) : m = L;
      var q = i.length;
      m > q / 2 && (m = q / 2);
      for (var j = 0; j < m; ++j) {
        var ne = parseInt(i.substr(j * 2, 2), 16);
        if (d(ne)) return j;
        x[s + j] = ne;
      }
      return j;
    }
    function C(x, i, s, m) {
      return D(y(i, x.length - s), x, s, m);
    }
    function $(x, i, s, m) {
      return D(W(i), x, s, m);
    }
    function le(x, i, s, m) {
      return D(O(i), x, s, m);
    }
    function N(x, i, s, m) {
      return D(M(i, x.length - s), x, s, m);
    }
    a.prototype.write = function(i, s, m, L) {
      if (s === void 0)
        L = "utf8", m = this.length, s = 0;
      else if (m === void 0 && typeof s == "string")
        L = s, m = this.length, s = 0;
      else if (isFinite(s))
        s = s >>> 0, isFinite(m) ? (m = m >>> 0, L === void 0 && (L = "utf8")) : (L = m, m = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      var q = this.length - s;
      if ((m === void 0 || m > q) && (m = q), i.length > 0 && (m < 0 || s < 0) || s > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      L || (L = "utf8");
      for (var j = !1; ; )
        switch (L) {
          case "hex":
            return z(this, i, s, m);
          case "utf8":
          case "utf-8":
            return C(this, i, s, m);
          case "ascii":
          case "latin1":
          case "binary":
            return $(this, i, s, m);
          case "base64":
            return le(this, i, s, m);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return N(this, i, s, m);
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
    function U(x, i, s) {
      return i === 0 && s === x.length ? e.fromByteArray(x) : e.fromByteArray(x.slice(i, s));
    }
    function v(x, i, s) {
      s = Math.min(x.length, s);
      for (var m = [], L = i; L < s; ) {
        var q = x[L], j = null, ne = q > 239 ? 4 : q > 223 ? 3 : q > 191 ? 2 : 1;
        if (L + ne <= s) {
          var oe, se, he, de;
          switch (ne) {
            case 1:
              q < 128 && (j = q);
              break;
            case 2:
              oe = x[L + 1], (oe & 192) === 128 && (de = (q & 31) << 6 | oe & 63, de > 127 && (j = de));
              break;
            case 3:
              oe = x[L + 1], se = x[L + 2], (oe & 192) === 128 && (se & 192) === 128 && (de = (q & 15) << 12 | (oe & 63) << 6 | se & 63, de > 2047 && (de < 55296 || de > 57343) && (j = de));
              break;
            case 4:
              oe = x[L + 1], se = x[L + 2], he = x[L + 3], (oe & 192) === 128 && (se & 192) === 128 && (he & 192) === 128 && (de = (q & 15) << 18 | (oe & 63) << 12 | (se & 63) << 6 | he & 63, de > 65535 && de < 1114112 && (j = de));
          }
        }
        j === null ? (j = 65533, ne = 1) : j > 65535 && (j -= 65536, m.push(j >>> 10 & 1023 | 55296), j = 56320 | j & 1023), m.push(j), L += ne;
      }
      return ee(m);
    }
    var K = 4096;
    function ee(x) {
      var i = x.length;
      if (i <= K)
        return String.fromCharCode.apply(String, x);
      for (var s = "", m = 0; m < i; )
        s += String.fromCharCode.apply(
          String,
          x.slice(m, m += K)
        );
      return s;
    }
    function H(x, i, s) {
      var m = "";
      s = Math.min(x.length, s);
      for (var L = i; L < s; ++L)
        m += String.fromCharCode(x[L] & 127);
      return m;
    }
    function ie(x, i, s) {
      var m = "";
      s = Math.min(x.length, s);
      for (var L = i; L < s; ++L)
        m += String.fromCharCode(x[L]);
      return m;
    }
    function Q(x, i, s) {
      var m = x.length;
      (!i || i < 0) && (i = 0), (!s || s < 0 || s > m) && (s = m);
      for (var L = "", q = i; q < s; ++q)
        L += Y[x[q]];
      return L;
    }
    function ce(x, i, s) {
      for (var m = x.slice(i, s), L = "", q = 0; q < m.length - 1; q += 2)
        L += String.fromCharCode(m[q] + m[q + 1] * 256);
      return L;
    }
    a.prototype.slice = function(i, s) {
      var m = this.length;
      i = ~~i, s = s === void 0 ? m : ~~s, i < 0 ? (i += m, i < 0 && (i = 0)) : i > m && (i = m), s < 0 ? (s += m, s < 0 && (s = 0)) : s > m && (s = m), s < i && (s = i);
      var L = this.subarray(i, s);
      return Object.setPrototypeOf(L, a.prototype), L;
    };
    function V(x, i, s) {
      if (x % 1 !== 0 || x < 0) throw new RangeError("offset is not uint");
      if (x + i > s) throw new RangeError("Trying to access beyond buffer length");
    }
    a.prototype.readUintLE = a.prototype.readUIntLE = function(i, s, m) {
      i = i >>> 0, s = s >>> 0, m || V(i, s, this.length);
      for (var L = this[i], q = 1, j = 0; ++j < s && (q *= 256); )
        L += this[i + j] * q;
      return L;
    }, a.prototype.readUintBE = a.prototype.readUIntBE = function(i, s, m) {
      i = i >>> 0, s = s >>> 0, m || V(i, s, this.length);
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
    }, a.prototype.readIntLE = function(i, s, m) {
      i = i >>> 0, s = s >>> 0, m || V(i, s, this.length);
      for (var L = this[i], q = 1, j = 0; ++j < s && (q *= 256); )
        L += this[i + j] * q;
      return q *= 128, L >= q && (L -= Math.pow(2, 8 * s)), L;
    }, a.prototype.readIntBE = function(i, s, m) {
      i = i >>> 0, s = s >>> 0, m || V(i, s, this.length);
      for (var L = s, q = 1, j = this[i + --L]; L > 0 && (q *= 256); )
        j += this[i + --L] * q;
      return q *= 128, j >= q && (j -= Math.pow(2, 8 * s)), j;
    }, a.prototype.readInt8 = function(i, s) {
      return i = i >>> 0, s || V(i, 1, this.length), this[i] & 128 ? (255 - this[i] + 1) * -1 : this[i];
    }, a.prototype.readInt16LE = function(i, s) {
      i = i >>> 0, s || V(i, 2, this.length);
      var m = this[i] | this[i + 1] << 8;
      return m & 32768 ? m | 4294901760 : m;
    }, a.prototype.readInt16BE = function(i, s) {
      i = i >>> 0, s || V(i, 2, this.length);
      var m = this[i + 1] | this[i] << 8;
      return m & 32768 ? m | 4294901760 : m;
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
    function P(x, i, s, m, L, q) {
      if (!a.isBuffer(x)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (i > L || i < q) throw new RangeError('"value" argument is out of bounds');
      if (s + m > x.length) throw new RangeError("Index out of range");
    }
    a.prototype.writeUintLE = a.prototype.writeUIntLE = function(i, s, m, L) {
      if (i = +i, s = s >>> 0, m = m >>> 0, !L) {
        var q = Math.pow(2, 8 * m) - 1;
        P(this, i, s, m, q, 0);
      }
      var j = 1, ne = 0;
      for (this[s] = i & 255; ++ne < m && (j *= 256); )
        this[s + ne] = i / j & 255;
      return s + m;
    }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(i, s, m, L) {
      if (i = +i, s = s >>> 0, m = m >>> 0, !L) {
        var q = Math.pow(2, 8 * m) - 1;
        P(this, i, s, m, q, 0);
      }
      var j = m - 1, ne = 1;
      for (this[s + j] = i & 255; --j >= 0 && (ne *= 256); )
        this[s + j] = i / ne & 255;
      return s + m;
    }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(i, s, m) {
      return i = +i, s = s >>> 0, m || P(this, i, s, 1, 255, 0), this[s] = i & 255, s + 1;
    }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(i, s, m) {
      return i = +i, s = s >>> 0, m || P(this, i, s, 2, 65535, 0), this[s] = i & 255, this[s + 1] = i >>> 8, s + 2;
    }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(i, s, m) {
      return i = +i, s = s >>> 0, m || P(this, i, s, 2, 65535, 0), this[s] = i >>> 8, this[s + 1] = i & 255, s + 2;
    }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(i, s, m) {
      return i = +i, s = s >>> 0, m || P(this, i, s, 4, 4294967295, 0), this[s + 3] = i >>> 24, this[s + 2] = i >>> 16, this[s + 1] = i >>> 8, this[s] = i & 255, s + 4;
    }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(i, s, m) {
      return i = +i, s = s >>> 0, m || P(this, i, s, 4, 4294967295, 0), this[s] = i >>> 24, this[s + 1] = i >>> 16, this[s + 2] = i >>> 8, this[s + 3] = i & 255, s + 4;
    }, a.prototype.writeIntLE = function(i, s, m, L) {
      if (i = +i, s = s >>> 0, !L) {
        var q = Math.pow(2, 8 * m - 1);
        P(this, i, s, m, q - 1, -q);
      }
      var j = 0, ne = 1, oe = 0;
      for (this[s] = i & 255; ++j < m && (ne *= 256); )
        i < 0 && oe === 0 && this[s + j - 1] !== 0 && (oe = 1), this[s + j] = (i / ne >> 0) - oe & 255;
      return s + m;
    }, a.prototype.writeIntBE = function(i, s, m, L) {
      if (i = +i, s = s >>> 0, !L) {
        var q = Math.pow(2, 8 * m - 1);
        P(this, i, s, m, q - 1, -q);
      }
      var j = m - 1, ne = 1, oe = 0;
      for (this[s + j] = i & 255; --j >= 0 && (ne *= 256); )
        i < 0 && oe === 0 && this[s + j + 1] !== 0 && (oe = 1), this[s + j] = (i / ne >> 0) - oe & 255;
      return s + m;
    }, a.prototype.writeInt8 = function(i, s, m) {
      return i = +i, s = s >>> 0, m || P(this, i, s, 1, 127, -128), i < 0 && (i = 255 + i + 1), this[s] = i & 255, s + 1;
    }, a.prototype.writeInt16LE = function(i, s, m) {
      return i = +i, s = s >>> 0, m || P(this, i, s, 2, 32767, -32768), this[s] = i & 255, this[s + 1] = i >>> 8, s + 2;
    }, a.prototype.writeInt16BE = function(i, s, m) {
      return i = +i, s = s >>> 0, m || P(this, i, s, 2, 32767, -32768), this[s] = i >>> 8, this[s + 1] = i & 255, s + 2;
    }, a.prototype.writeInt32LE = function(i, s, m) {
      return i = +i, s = s >>> 0, m || P(this, i, s, 4, 2147483647, -2147483648), this[s] = i & 255, this[s + 1] = i >>> 8, this[s + 2] = i >>> 16, this[s + 3] = i >>> 24, s + 4;
    }, a.prototype.writeInt32BE = function(i, s, m) {
      return i = +i, s = s >>> 0, m || P(this, i, s, 4, 2147483647, -2147483648), i < 0 && (i = 4294967295 + i + 1), this[s] = i >>> 24, this[s + 1] = i >>> 16, this[s + 2] = i >>> 8, this[s + 3] = i & 255, s + 4;
    };
    function X(x, i, s, m, L, q) {
      if (s + m > x.length) throw new RangeError("Index out of range");
      if (s < 0) throw new RangeError("Index out of range");
    }
    function Z(x, i, s, m, L) {
      return i = +i, s = s >>> 0, L || X(x, i, s, 4), r.write(x, i, s, m, 23, 4), s + 4;
    }
    a.prototype.writeFloatLE = function(i, s, m) {
      return Z(this, i, s, !0, m);
    }, a.prototype.writeFloatBE = function(i, s, m) {
      return Z(this, i, s, !1, m);
    };
    function te(x, i, s, m, L) {
      return i = +i, s = s >>> 0, L || X(x, i, s, 8), r.write(x, i, s, m, 52, 8), s + 8;
    }
    a.prototype.writeDoubleLE = function(i, s, m) {
      return te(this, i, s, !0, m);
    }, a.prototype.writeDoubleBE = function(i, s, m) {
      return te(this, i, s, !1, m);
    }, a.prototype.copy = function(i, s, m, L) {
      if (!a.isBuffer(i)) throw new TypeError("argument should be a Buffer");
      if (m || (m = 0), !L && L !== 0 && (L = this.length), s >= i.length && (s = i.length), s || (s = 0), L > 0 && L < m && (L = m), L === m || i.length === 0 || this.length === 0) return 0;
      if (s < 0)
        throw new RangeError("targetStart out of bounds");
      if (m < 0 || m >= this.length) throw new RangeError("Index out of range");
      if (L < 0) throw new RangeError("sourceEnd out of bounds");
      L > this.length && (L = this.length), i.length - s < L - m && (L = i.length - s + m);
      var q = L - m;
      return this === i && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(s, m, L) : Uint8Array.prototype.set.call(
        i,
        this.subarray(m, L),
        s
      ), q;
    }, a.prototype.fill = function(i, s, m, L) {
      if (typeof i == "string") {
        if (typeof s == "string" ? (L = s, s = 0, m = this.length) : typeof m == "string" && (L = m, m = this.length), L !== void 0 && typeof L != "string")
          throw new TypeError("encoding must be a string");
        if (typeof L == "string" && !a.isEncoding(L))
          throw new TypeError("Unknown encoding: " + L);
        if (i.length === 1) {
          var q = i.charCodeAt(0);
          (L === "utf8" && q < 128 || L === "latin1") && (i = q);
        }
      } else typeof i == "number" ? i = i & 255 : typeof i == "boolean" && (i = Number(i));
      if (s < 0 || this.length < s || this.length < m)
        throw new RangeError("Out of range index");
      if (m <= s)
        return this;
      s = s >>> 0, m = m === void 0 ? this.length : m >>> 0, i || (i = 0);
      var j;
      if (typeof i == "number")
        for (j = s; j < m; ++j)
          this[j] = i;
      else {
        var ne = a.isBuffer(i) ? i : a.from(i, L), oe = ne.length;
        if (oe === 0)
          throw new TypeError('The value "' + i + '" is invalid for argument "value"');
        for (j = 0; j < m - s; ++j)
          this[j + s] = ne[j % oe];
      }
      return this;
    };
    var G = /[^+/0-9A-Za-z-_]/g;
    function _(x) {
      if (x = x.split("=")[0], x = x.trim().replace(G, ""), x.length < 2) return "";
      for (; x.length % 4 !== 0; )
        x = x + "=";
      return x;
    }
    function y(x, i) {
      i = i || 1 / 0;
      for (var s, m = x.length, L = null, q = [], j = 0; j < m; ++j) {
        if (s = x.charCodeAt(j), s > 55295 && s < 57344) {
          if (!L) {
            if (s > 56319) {
              (i -= 3) > -1 && q.push(239, 191, 189);
              continue;
            } else if (j + 1 === m) {
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
    function W(x) {
      for (var i = [], s = 0; s < x.length; ++s)
        i.push(x.charCodeAt(s) & 255);
      return i;
    }
    function M(x, i) {
      for (var s, m, L, q = [], j = 0; j < x.length && !((i -= 2) < 0); ++j)
        s = x.charCodeAt(j), m = s >> 8, L = s % 256, q.push(L), q.push(m);
      return q;
    }
    function O(x) {
      return e.toByteArray(_(x));
    }
    function D(x, i, s, m) {
      for (var L = 0; L < m && !(L + s >= i.length || L >= x.length); ++L)
        i[L + s] = x[L];
      return L;
    }
    function J(x, i) {
      return x instanceof i || x != null && x.constructor != null && x.constructor.name != null && x.constructor.name === i.name;
    }
    function d(x) {
      return x !== x;
    }
    var Y = (function() {
      for (var x = "0123456789abcdef", i = new Array(256), s = 0; s < 16; ++s)
        for (var m = s * 16, L = 0; L < 16; ++L)
          i[m + L] = x[s] + x[L];
      return i;
    })();
  })(_r)), _r;
}
var Er = {}, xr = {}, Tr, $i;
function io() {
  return $i || ($i = 1, Tr = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, r = /* @__PURE__ */ Symbol("test"), n = Object(r);
    if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
      return !1;
    var o = 42;
    e[r] = o;
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
      if (a.value !== o || a.enumerable !== !0)
        return !1;
    }
    return !0;
  }), Tr;
}
var Sr, Zi;
function Ai() {
  if (Zi) return Sr;
  Zi = 1;
  var t = io();
  return Sr = function() {
    return t() && !!Symbol.toStringTag;
  }, Sr;
}
var Ar, Yi;
function ao() {
  return Yi || (Yi = 1, Ar = Object), Ar;
}
var kr, Ji;
function Lu() {
  return Ji || (Ji = 1, kr = Error), kr;
}
var Rr, Qi;
function Mu() {
  return Qi || (Qi = 1, Rr = EvalError), Rr;
}
var Ir, ea;
function Uu() {
  return ea || (ea = 1, Ir = RangeError), Ir;
}
var Cr, ta;
function ju() {
  return ta || (ta = 1, Cr = ReferenceError), Cr;
}
var Nr, ra;
function so() {
  return ra || (ra = 1, Nr = SyntaxError), Nr;
}
var Or, na;
function cr() {
  return na || (na = 1, Or = TypeError), Or;
}
var Pr, ia;
function zu() {
  return ia || (ia = 1, Pr = URIError), Pr;
}
var Fr, aa;
function Wu() {
  return aa || (aa = 1, Fr = Math.abs), Fr;
}
var Dr, sa;
function Hu() {
  return sa || (sa = 1, Dr = Math.floor), Dr;
}
var Br, oa;
function qu() {
  return oa || (oa = 1, Br = Math.max), Br;
}
var Lr, ua;
function Gu() {
  return ua || (ua = 1, Lr = Math.min), Lr;
}
var Mr, la;
function Ku() {
  return la || (la = 1, Mr = Math.pow), Mr;
}
var Ur, ca;
function Vu() {
  return ca || (ca = 1, Ur = Math.round), Ur;
}
var jr, ha;
function Xu() {
  return ha || (ha = 1, jr = Number.isNaN || function(e) {
    return e !== e;
  }), jr;
}
var zr, fa;
function $u() {
  if (fa) return zr;
  fa = 1;
  var t = /* @__PURE__ */ Xu();
  return zr = function(r) {
    return t(r) || r === 0 ? r : r < 0 ? -1 : 1;
  }, zr;
}
var Wr, da;
function Zu() {
  return da || (da = 1, Wr = Object.getOwnPropertyDescriptor), Wr;
}
var Hr, pa;
function Mt() {
  if (pa) return Hr;
  pa = 1;
  var t = /* @__PURE__ */ Zu();
  if (t)
    try {
      t([], "length");
    } catch {
      t = null;
    }
  return Hr = t, Hr;
}
var qr, ma;
function hr() {
  if (ma) return qr;
  ma = 1;
  var t = Object.defineProperty || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return qr = t, qr;
}
var Gr, ga;
function Yu() {
  if (ga) return Gr;
  ga = 1;
  var t = typeof Symbol < "u" && Symbol, e = io();
  return Gr = function() {
    return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : e();
  }, Gr;
}
var Kr, wa;
function oo() {
  return wa || (wa = 1, Kr = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Kr;
}
var Vr, ya;
function uo() {
  if (ya) return Vr;
  ya = 1;
  var t = /* @__PURE__ */ ao();
  return Vr = t.getPrototypeOf || null, Vr;
}
var Xr, va;
function Ju() {
  if (va) return Xr;
  va = 1;
  var t = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, r = Math.max, n = "[object Function]", o = function(h, A) {
    for (var S = [], k = 0; k < h.length; k += 1)
      S[k] = h[k];
    for (var I = 0; I < A.length; I += 1)
      S[I + h.length] = A[I];
    return S;
  }, l = function(h, A) {
    for (var S = [], k = A, I = 0; k < h.length; k += 1, I += 1)
      S[I] = h[k];
    return S;
  }, f = function(a, h) {
    for (var A = "", S = 0; S < a.length; S += 1)
      A += a[S], S + 1 < a.length && (A += h);
    return A;
  };
  return Xr = function(h) {
    var A = this;
    if (typeof A != "function" || e.apply(A) !== n)
      throw new TypeError(t + A);
    for (var S = l(arguments, 1), k, I = function() {
      if (this instanceof k) {
        var u = A.apply(
          this,
          o(S, arguments)
        );
        return Object(u) === u ? u : this;
      }
      return A.apply(
        h,
        o(S, arguments)
      );
    }, b = r(0, A.length - S.length), R = [], g = 0; g < b; g++)
      R[g] = "$" + g;
    if (k = Function("binder", "return function (" + f(R, ",") + "){ return binder.apply(this,arguments); }")(I), A.prototype) {
      var T = function() {
      };
      T.prototype = A.prototype, k.prototype = new T(), T.prototype = null;
    }
    return k;
  }, Xr;
}
var $r, ba;
function Ut() {
  if (ba) return $r;
  ba = 1;
  var t = Ju();
  return $r = Function.prototype.bind || t, $r;
}
var Zr, _a;
function ki() {
  return _a || (_a = 1, Zr = Function.prototype.call), Zr;
}
var Yr, Ea;
function Ri() {
  return Ea || (Ea = 1, Yr = Function.prototype.apply), Yr;
}
var Jr, xa;
function Qu() {
  return xa || (xa = 1, Jr = typeof Reflect < "u" && Reflect && Reflect.apply), Jr;
}
var Qr, Ta;
function lo() {
  if (Ta) return Qr;
  Ta = 1;
  var t = Ut(), e = Ri(), r = ki(), n = Qu();
  return Qr = n || t.call(r, e), Qr;
}
var en, Sa;
function Ii() {
  if (Sa) return en;
  Sa = 1;
  var t = Ut(), e = /* @__PURE__ */ cr(), r = ki(), n = lo();
  return en = function(l) {
    if (l.length < 1 || typeof l[0] != "function")
      throw new e("a function is required");
    return n(t, r, l);
  }, en;
}
var tn, Aa;
function el() {
  if (Aa) return tn;
  Aa = 1;
  var t = Ii(), e = /* @__PURE__ */ Mt(), r;
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
  ), o = Object, l = o.getPrototypeOf;
  return tn = n && typeof n.get == "function" ? t([n.get]) : typeof l == "function" ? (
    /** @type {import('./get')} */
    (function(a) {
      return l(a == null ? a : o(a));
    })
  ) : !1, tn;
}
var rn, ka;
function co() {
  if (ka) return rn;
  ka = 1;
  var t = oo(), e = uo(), r = /* @__PURE__ */ el();
  return rn = t ? function(o) {
    return t(o);
  } : e ? function(o) {
    if (!o || typeof o != "object" && typeof o != "function")
      throw new TypeError("getProto: not an object");
    return e(o);
  } : r ? function(o) {
    return r(o);
  } : null, rn;
}
var nn, Ra;
function tl() {
  if (Ra) return nn;
  Ra = 1;
  var t = Function.prototype.call, e = Object.prototype.hasOwnProperty, r = Ut();
  return nn = r.call(t, e), nn;
}
var an, Ia;
function ho() {
  if (Ia) return an;
  Ia = 1;
  var t, e = /* @__PURE__ */ ao(), r = /* @__PURE__ */ Lu(), n = /* @__PURE__ */ Mu(), o = /* @__PURE__ */ Uu(), l = /* @__PURE__ */ ju(), f = /* @__PURE__ */ so(), a = /* @__PURE__ */ cr(), h = /* @__PURE__ */ zu(), A = /* @__PURE__ */ Wu(), S = /* @__PURE__ */ Hu(), k = /* @__PURE__ */ qu(), I = /* @__PURE__ */ Gu(), b = /* @__PURE__ */ Ku(), R = /* @__PURE__ */ Vu(), g = /* @__PURE__ */ $u(), T = Function, u = function(W) {
    try {
      return T('"use strict"; return (' + W + ").constructor;")();
    } catch {
    }
  }, w = /* @__PURE__ */ Mt(), p = /* @__PURE__ */ hr(), c = function() {
    throw new a();
  }, E = w ? (function() {
    try {
      return arguments.callee, c;
    } catch {
      try {
        return w(arguments, "callee").get;
      } catch {
        return c;
      }
    }
  })() : c, F = Yu()(), B = co(), z = uo(), C = oo(), $ = Ri(), le = ki(), N = {}, U = typeof Uint8Array > "u" || !B ? t : B(Uint8Array), v = {
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
    "%Object.getOwnPropertyDescriptor%": w,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? t : Promise,
    "%Proxy%": typeof Proxy > "u" ? t : Proxy,
    "%RangeError%": o,
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
    "%ThrowTypeError%": E,
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
    "%Object.defineProperty%": p,
    "%Object.getPrototypeOf%": z,
    "%Math.abs%": A,
    "%Math.floor%": S,
    "%Math.max%": k,
    "%Math.min%": I,
    "%Math.pow%": b,
    "%Math.round%": R,
    "%Math.sign%": g,
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
      O = u("async function () {}");
    else if (M === "%GeneratorFunction%")
      O = u("function* () {}");
    else if (M === "%AsyncGeneratorFunction%")
      O = u("async function* () {}");
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
  }, ie = Ut(), Q = /* @__PURE__ */ tl(), ce = ie.call(le, Array.prototype.concat), V = ie.call($, Array.prototype.splice), P = ie.call(le, String.prototype.replace), X = ie.call(le, String.prototype.slice), Z = ie.call(le, RegExp.prototype.exec), te = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, G = /\\(\\)?/g, _ = function(M) {
    var O = X(M, 0, 1), D = X(M, -1);
    if (O === "%" && D !== "%")
      throw new f("invalid intrinsic syntax, expected closing `%`");
    if (D === "%" && O !== "%")
      throw new f("invalid intrinsic syntax, expected opening `%`");
    var J = [];
    return P(M, te, function(d, Y, x, i) {
      J[J.length] = x ? P(i, G, "$1") : Y || d;
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
  return an = function(M, O) {
    if (typeof M != "string" || M.length === 0)
      throw new a("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof O != "boolean")
      throw new a('"allowMissing" argument must be a boolean');
    if (Z(/^%?[^%]*%?$/, M) === null)
      throw new f("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var D = _(M), J = D.length > 0 ? D[0] : "", d = y("%" + J + "%", O), Y = d.name, x = d.value, i = !1, s = d.alias;
    s && (J = s[0], V(D, ce([0, 1], s)));
    for (var m = 1, L = !0; m < D.length; m += 1) {
      var q = D[m], j = X(q, 0, 1), ne = X(q, -1);
      if ((j === '"' || j === "'" || j === "`" || ne === '"' || ne === "'" || ne === "`") && j !== ne)
        throw new f("property names with quotes must have matching quotes");
      if ((q === "constructor" || !L) && (i = !0), J += "." + q, Y = "%" + J + "%", Q(v, Y))
        x = v[Y];
      else if (x != null) {
        if (!(q in x)) {
          if (!O)
            throw new a("base intrinsic for " + M + " exists, but the property is not available.");
          return;
        }
        if (w && m + 1 >= D.length) {
          var oe = w(x, q);
          L = !!oe, L && "get" in oe && !("originalValue" in oe.get) ? x = oe.get : x = x[q];
        } else
          L = Q(x, q), x = x[q];
        L && !i && (v[Y] = x);
      }
    }
    return x;
  }, an;
}
var sn, Ca;
function fo() {
  if (Ca) return sn;
  Ca = 1;
  var t = /* @__PURE__ */ ho(), e = Ii(), r = e([t("%String.prototype.indexOf%")]);
  return sn = function(o, l) {
    var f = (
      /** @type {(this: unknown, ...args: unknown[]) => unknown} */
      t(o, !!l)
    );
    return typeof f == "function" && r(o, ".prototype.") > -1 ? e(
      /** @type {const} */
      [f]
    ) : f;
  }, sn;
}
var on, Na;
function rl() {
  if (Na) return on;
  Na = 1;
  var t = Ai()(), e = /* @__PURE__ */ fo(), r = e("Object.prototype.toString"), n = function(a) {
    return t && a && typeof a == "object" && Symbol.toStringTag in a ? !1 : r(a) === "[object Arguments]";
  }, o = function(a) {
    return n(a) ? !0 : a !== null && typeof a == "object" && "length" in a && typeof a.length == "number" && a.length >= 0 && r(a) !== "[object Array]" && "callee" in a && r(a.callee) === "[object Function]";
  }, l = (function() {
    return n(arguments);
  })();
  return n.isLegacyArguments = o, on = l ? n : o, on;
}
var un, Oa;
function nl() {
  if (Oa) return un;
  Oa = 1;
  var t = Object.prototype.toString, e = Function.prototype.toString, r = /^\s*(?:function)?\*/, n = Ai()(), o = Object.getPrototypeOf, l = function() {
    if (!n)
      return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, f;
  return un = function(h) {
    if (typeof h != "function")
      return !1;
    if (r.test(e.call(h)))
      return !0;
    if (!n) {
      var A = t.call(h);
      return A === "[object GeneratorFunction]";
    }
    if (!o)
      return !1;
    if (typeof f > "u") {
      var S = l();
      f = S ? o(S) : !1;
    }
    return o(h) === f;
  }, un;
}
var ln, Pa;
function il() {
  if (Pa) return ln;
  Pa = 1;
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
    } catch (w) {
      w !== n && (e = null);
    }
  else
    e = null;
  var o = /^\s*class\b/, l = function(p) {
    try {
      var c = t.call(p);
      return o.test(c);
    } catch {
      return !1;
    }
  }, f = function(p) {
    try {
      return l(p) ? !1 : (t.call(p), !0);
    } catch {
      return !1;
    }
  }, a = Object.prototype.toString, h = "[object Object]", A = "[object Function]", S = "[object GeneratorFunction]", k = "[object HTMLAllCollection]", I = "[object HTML document.all class]", b = "[object HTMLCollection]", R = typeof Symbol == "function" && !!Symbol.toStringTag, g = !(0 in [,]), T = function() {
    return !1;
  };
  if (typeof document == "object") {
    var u = document.all;
    a.call(u) === a.call(document.all) && (T = function(p) {
      if ((g || !p) && (typeof p > "u" || typeof p == "object"))
        try {
          var c = a.call(p);
          return (c === k || c === I || c === b || c === h) && p("") == null;
        } catch {
        }
      return !1;
    });
  }
  return ln = e ? function(p) {
    if (T(p))
      return !0;
    if (!p || typeof p != "function" && typeof p != "object")
      return !1;
    try {
      e(p, null, r);
    } catch (c) {
      if (c !== n)
        return !1;
    }
    return !l(p) && f(p);
  } : function(p) {
    if (T(p))
      return !0;
    if (!p || typeof p != "function" && typeof p != "object")
      return !1;
    if (R)
      return f(p);
    if (l(p))
      return !1;
    var c = a.call(p);
    return c !== A && c !== S && !/^\[object HTML/.test(c) ? !1 : f(p);
  }, ln;
}
var cn, Fa;
function al() {
  if (Fa) return cn;
  Fa = 1;
  var t = il(), e = Object.prototype.toString, r = Object.prototype.hasOwnProperty, n = function(h, A, S) {
    for (var k = 0, I = h.length; k < I; k++)
      r.call(h, k) && (S == null ? A(h[k], k, h) : A.call(S, h[k], k, h));
  }, o = function(h, A, S) {
    for (var k = 0, I = h.length; k < I; k++)
      S == null ? A(h.charAt(k), k, h) : A.call(S, h.charAt(k), k, h);
  }, l = function(h, A, S) {
    for (var k in h)
      r.call(h, k) && (S == null ? A(h[k], k, h) : A.call(S, h[k], k, h));
  };
  function f(a) {
    return e.call(a) === "[object Array]";
  }
  return cn = function(h, A, S) {
    if (!t(A))
      throw new TypeError("iterator must be a function");
    var k;
    arguments.length >= 3 && (k = S), f(h) ? n(h, A, k) : typeof h == "string" ? o(h, A, k) : l(h, A, k);
  }, cn;
}
var hn, Da;
function sl() {
  return Da || (Da = 1, hn = [
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
  ]), hn;
}
var fn, Ba;
function ol() {
  if (Ba) return fn;
  Ba = 1;
  var t = /* @__PURE__ */ sl(), e = typeof globalThis > "u" ? Fe : globalThis;
  return fn = function() {
    for (var n = [], o = 0; o < t.length; o++)
      typeof e[t[o]] == "function" && (n[n.length] = t[o]);
    return n;
  }, fn;
}
var dn = { exports: {} }, pn, La;
function ul() {
  if (La) return pn;
  La = 1;
  var t = /* @__PURE__ */ hr(), e = /* @__PURE__ */ so(), r = /* @__PURE__ */ cr(), n = /* @__PURE__ */ Mt();
  return pn = function(l, f, a) {
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
    var h = arguments.length > 3 ? arguments[3] : null, A = arguments.length > 4 ? arguments[4] : null, S = arguments.length > 5 ? arguments[5] : null, k = arguments.length > 6 ? arguments[6] : !1, I = !!n && n(l, f);
    if (t)
      t(l, f, {
        configurable: S === null && I ? I.configurable : !S,
        enumerable: h === null && I ? I.enumerable : !h,
        value: a,
        writable: A === null && I ? I.writable : !A
      });
    else if (k || !h && !A && !S)
      l[f] = a;
    else
      throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, pn;
}
var mn, Ma;
function ll() {
  if (Ma) return mn;
  Ma = 1;
  var t = /* @__PURE__ */ hr(), e = function() {
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
  }, mn = e, mn;
}
var gn, Ua;
function cl() {
  if (Ua) return gn;
  Ua = 1;
  var t = /* @__PURE__ */ ho(), e = /* @__PURE__ */ ul(), r = /* @__PURE__ */ ll()(), n = /* @__PURE__ */ Mt(), o = /* @__PURE__ */ cr(), l = t("%Math.floor%");
  return gn = function(a, h) {
    if (typeof a != "function")
      throw new o("`fn` is not a function");
    if (typeof h != "number" || h < 0 || h > 4294967295 || l(h) !== h)
      throw new o("`length` must be a positive 32-bit integer");
    var A = arguments.length > 2 && !!arguments[2], S = !0, k = !0;
    if ("length" in a && n) {
      var I = n(a, "length");
      I && !I.configurable && (S = !1), I && !I.writable && (k = !1);
    }
    return (S || k || !A) && (r ? e(
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
  }, gn;
}
var wn, ja;
function hl() {
  if (ja) return wn;
  ja = 1;
  var t = Ut(), e = Ri(), r = lo();
  return wn = function() {
    return r(t, e, arguments);
  }, wn;
}
var za;
function fl() {
  return za || (za = 1, (function(t) {
    var e = /* @__PURE__ */ cl(), r = /* @__PURE__ */ hr(), n = Ii(), o = hl();
    t.exports = function(f) {
      var a = n(arguments), h = f.length - (arguments.length - 1);
      return e(
        a,
        1 + (h > 0 ? h : 0),
        !0
      );
    }, r ? r(t.exports, "apply", { value: o }) : t.exports.apply = o;
  })(dn)), dn.exports;
}
var yn, Wa;
function po() {
  if (Wa) return yn;
  Wa = 1;
  var t = al(), e = /* @__PURE__ */ ol(), r = fl(), n = /* @__PURE__ */ fo(), o = /* @__PURE__ */ Mt(), l = co(), f = n("Object.prototype.toString"), a = Ai()(), h = typeof globalThis > "u" ? Fe : globalThis, A = e(), S = n("String.prototype.slice"), k = n("Array.prototype.indexOf", !0) || function(T, u) {
    for (var w = 0; w < T.length; w += 1)
      if (T[w] === u)
        return w;
    return -1;
  }, I = { __proto__: null };
  a && o && l ? t(A, function(g) {
    var T = new h[g]();
    if (Symbol.toStringTag in T && l) {
      var u = l(T), w = o(u, Symbol.toStringTag);
      if (!w && u) {
        var p = l(u);
        w = o(p, Symbol.toStringTag);
      }
      I["$" + g] = r(w.get);
    }
  }) : t(A, function(g) {
    var T = new h[g](), u = T.slice || T.set;
    u && (I[
      /** @type {`$${import('.').TypedArrayName}`} */
      "$" + g
    ] = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
    // @ts-expect-error TODO FIXME
    r(u));
  });
  var b = function(T) {
    var u = !1;
    return t(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      I,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(w, p) {
        if (!u)
          try {
            "$" + w(T) === p && (u = /** @type {import('.').TypedArrayName} */
            S(p, 1));
          } catch {
          }
      }
    ), u;
  }, R = function(T) {
    var u = !1;
    return t(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      I,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(w, p) {
        if (!u)
          try {
            w(T), u = /** @type {import('.').TypedArrayName} */
            S(p, 1);
          } catch {
          }
      }
    ), u;
  };
  return yn = function(T) {
    if (!T || typeof T != "object")
      return !1;
    if (!a) {
      var u = S(f(T), 8, -1);
      return k(A, u) > -1 ? u : u !== "Object" ? !1 : R(T);
    }
    return o ? b(T) : null;
  }, yn;
}
var vn, Ha;
function dl() {
  if (Ha) return vn;
  Ha = 1;
  var t = /* @__PURE__ */ po();
  return vn = function(r) {
    return !!t(r);
  }, vn;
}
var qa;
function pl() {
  return qa || (qa = 1, (function(t) {
    var e = /* @__PURE__ */ rl(), r = nl(), n = /* @__PURE__ */ po(), o = /* @__PURE__ */ dl();
    function l(m) {
      return m.call.bind(m);
    }
    var f = typeof BigInt < "u", a = typeof Symbol < "u", h = l(Object.prototype.toString), A = l(Number.prototype.valueOf), S = l(String.prototype.valueOf), k = l(Boolean.prototype.valueOf);
    if (f)
      var I = l(BigInt.prototype.valueOf);
    if (a)
      var b = l(Symbol.prototype.valueOf);
    function R(m, L) {
      if (typeof m != "object")
        return !1;
      try {
        return L(m), !0;
      } catch {
        return !1;
      }
    }
    t.isArgumentsObject = e, t.isGeneratorFunction = r, t.isTypedArray = o;
    function g(m) {
      return typeof Promise < "u" && m instanceof Promise || m !== null && typeof m == "object" && typeof m.then == "function" && typeof m.catch == "function";
    }
    t.isPromise = g;
    function T(m) {
      return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(m) : o(m) || X(m);
    }
    t.isArrayBufferView = T;
    function u(m) {
      return n(m) === "Uint8Array";
    }
    t.isUint8Array = u;
    function w(m) {
      return n(m) === "Uint8ClampedArray";
    }
    t.isUint8ClampedArray = w;
    function p(m) {
      return n(m) === "Uint16Array";
    }
    t.isUint16Array = p;
    function c(m) {
      return n(m) === "Uint32Array";
    }
    t.isUint32Array = c;
    function E(m) {
      return n(m) === "Int8Array";
    }
    t.isInt8Array = E;
    function F(m) {
      return n(m) === "Int16Array";
    }
    t.isInt16Array = F;
    function B(m) {
      return n(m) === "Int32Array";
    }
    t.isInt32Array = B;
    function z(m) {
      return n(m) === "Float32Array";
    }
    t.isFloat32Array = z;
    function C(m) {
      return n(m) === "Float64Array";
    }
    t.isFloat64Array = C;
    function $(m) {
      return n(m) === "BigInt64Array";
    }
    t.isBigInt64Array = $;
    function le(m) {
      return n(m) === "BigUint64Array";
    }
    t.isBigUint64Array = le;
    function N(m) {
      return h(m) === "[object Map]";
    }
    N.working = typeof Map < "u" && N(/* @__PURE__ */ new Map());
    function U(m) {
      return typeof Map > "u" ? !1 : N.working ? N(m) : m instanceof Map;
    }
    t.isMap = U;
    function v(m) {
      return h(m) === "[object Set]";
    }
    v.working = typeof Set < "u" && v(/* @__PURE__ */ new Set());
    function K(m) {
      return typeof Set > "u" ? !1 : v.working ? v(m) : m instanceof Set;
    }
    t.isSet = K;
    function ee(m) {
      return h(m) === "[object WeakMap]";
    }
    ee.working = typeof WeakMap < "u" && ee(/* @__PURE__ */ new WeakMap());
    function H(m) {
      return typeof WeakMap > "u" ? !1 : ee.working ? ee(m) : m instanceof WeakMap;
    }
    t.isWeakMap = H;
    function ie(m) {
      return h(m) === "[object WeakSet]";
    }
    ie.working = typeof WeakSet < "u" && ie(/* @__PURE__ */ new WeakSet());
    function Q(m) {
      return ie(m);
    }
    t.isWeakSet = Q;
    function ce(m) {
      return h(m) === "[object ArrayBuffer]";
    }
    ce.working = typeof ArrayBuffer < "u" && ce(new ArrayBuffer());
    function V(m) {
      return typeof ArrayBuffer > "u" ? !1 : ce.working ? ce(m) : m instanceof ArrayBuffer;
    }
    t.isArrayBuffer = V;
    function P(m) {
      return h(m) === "[object DataView]";
    }
    P.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && P(new DataView(new ArrayBuffer(1), 0, 1));
    function X(m) {
      return typeof DataView > "u" ? !1 : P.working ? P(m) : m instanceof DataView;
    }
    t.isDataView = X;
    var Z = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
    function te(m) {
      return h(m) === "[object SharedArrayBuffer]";
    }
    function G(m) {
      return typeof Z > "u" ? !1 : (typeof te.working > "u" && (te.working = te(new Z())), te.working ? te(m) : m instanceof Z);
    }
    t.isSharedArrayBuffer = G;
    function _(m) {
      return h(m) === "[object AsyncFunction]";
    }
    t.isAsyncFunction = _;
    function y(m) {
      return h(m) === "[object Map Iterator]";
    }
    t.isMapIterator = y;
    function W(m) {
      return h(m) === "[object Set Iterator]";
    }
    t.isSetIterator = W;
    function M(m) {
      return h(m) === "[object Generator]";
    }
    t.isGeneratorObject = M;
    function O(m) {
      return h(m) === "[object WebAssembly.Module]";
    }
    t.isWebAssemblyCompiledModule = O;
    function D(m) {
      return R(m, A);
    }
    t.isNumberObject = D;
    function J(m) {
      return R(m, S);
    }
    t.isStringObject = J;
    function d(m) {
      return R(m, k);
    }
    t.isBooleanObject = d;
    function Y(m) {
      return f && R(m, I);
    }
    t.isBigIntObject = Y;
    function x(m) {
      return a && R(m, b);
    }
    t.isSymbolObject = x;
    function i(m) {
      return D(m) || J(m) || d(m) || Y(m) || x(m);
    }
    t.isBoxedPrimitive = i;
    function s(m) {
      return typeof Uint8Array < "u" && (V(m) || G(m));
    }
    t.isAnyArrayBuffer = s, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(m) {
      Object.defineProperty(t, m, {
        enumerable: !1,
        value: function() {
          throw new Error(m + " is not supported in userland");
        }
      });
    });
  })(xr)), xr;
}
var bn, Ga;
function ml() {
  return Ga || (Ga = 1, bn = function(e) {
    return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
  }), bn;
}
var Ka;
function mo() {
  return Ka || (Ka = 1, (function(t) {
    var e = Object.getOwnPropertyDescriptors || function(X) {
      for (var Z = Object.keys(X), te = {}, G = 0; G < Z.length; G++)
        te[Z[G]] = Object.getOwnPropertyDescriptor(X, Z[G]);
      return te;
    }, r = /%[sdj%]/g;
    t.format = function(P) {
      if (!E(P)) {
        for (var X = [], Z = 0; Z < arguments.length; Z++)
          X.push(f(arguments[Z]));
        return X.join(" ");
      }
      for (var Z = 1, te = arguments, G = te.length, _ = String(P).replace(r, function(W) {
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
        w(y) || !C(y) ? _ += " " + y : _ += " " + f(y);
      return _;
    }, t.deprecate = function(P, X) {
      if (typeof we < "u" && we.noDeprecation === !0)
        return P;
      if (typeof we > "u")
        return function() {
          return t.deprecate(P, X).apply(this, arguments);
        };
      var Z = !1;
      function te() {
        if (!Z) {
          if (we.throwDeprecation)
            throw new Error(X);
          we.traceDeprecation ? console.trace(X) : console.error(X), Z = !0;
        }
        return P.apply(this, arguments);
      }
      return te;
    };
    var n = {}, o = /^$/;
    if (we.env.NODE_DEBUG) {
      var l = we.env.NODE_DEBUG;
      l = l.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), o = new RegExp("^" + l + "$", "i");
    }
    t.debuglog = function(P) {
      if (P = P.toUpperCase(), !n[P])
        if (o.test(P)) {
          var X = we.pid;
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
      return arguments.length >= 3 && (Z.depth = arguments[2]), arguments.length >= 4 && (Z.colors = arguments[3]), u(X) ? Z.showHidden = X : X && t._extend(Z, X), B(Z.showHidden) && (Z.showHidden = !1), B(Z.depth) && (Z.depth = 2), B(Z.colors) && (Z.colors = !1), B(Z.customInspect) && (Z.customInspect = !0), Z.colors && (Z.stylize = a), S(Z, P, Z.depth);
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
    function A(P) {
      var X = {};
      return P.forEach(function(Z, te) {
        X[Z] = !0;
      }), X;
    }
    function S(P, X, Z) {
      if (P.customInspect && X && N(X.inspect) && // Filter out the util module, it's inspect function is special
      X.inspect !== t.inspect && // Also filter out any prototype objects using the circular check.
      !(X.constructor && X.constructor.prototype === X)) {
        var te = X.inspect(Z, P);
        return E(te) || (te = S(P, te, Z)), te;
      }
      var G = k(P, X);
      if (G)
        return G;
      var _ = Object.keys(X), y = A(_);
      if (P.showHidden && (_ = Object.getOwnPropertyNames(X)), le(X) && (_.indexOf("message") >= 0 || _.indexOf("description") >= 0))
        return I(X);
      if (_.length === 0) {
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
      if (z(X) && (M = " " + RegExp.prototype.toString.call(X)), $(X) && (M = " " + Date.prototype.toUTCString.call(X)), le(X) && (M = " " + I(X)), _.length === 0 && (!O || X.length == 0))
        return D[0] + M + D[1];
      if (Z < 0)
        return z(X) ? P.stylize(RegExp.prototype.toString.call(X), "regexp") : P.stylize("[Object]", "special");
      P.seen.push(X);
      var d;
      return O ? d = b(P, X, Z, y, _) : d = _.map(function(Y) {
        return R(P, X, Z, y, Y, O);
      }), P.seen.pop(), g(d, M, D);
    }
    function k(P, X) {
      if (B(X))
        return P.stylize("undefined", "undefined");
      if (E(X)) {
        var Z = "'" + JSON.stringify(X).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return P.stylize(Z, "string");
      }
      if (c(X))
        return P.stylize("" + X, "number");
      if (u(X))
        return P.stylize("" + X, "boolean");
      if (w(X))
        return P.stylize("null", "null");
    }
    function I(P) {
      return "[" + Error.prototype.toString.call(P) + "]";
    }
    function b(P, X, Z, te, G) {
      for (var _ = [], y = 0, W = X.length; y < W; ++y)
        ie(X, String(y)) ? _.push(R(
          P,
          X,
          Z,
          te,
          String(y),
          !0
        )) : _.push("");
      return G.forEach(function(M) {
        M.match(/^\d+$/) || _.push(R(
          P,
          X,
          Z,
          te,
          M,
          !0
        ));
      }), _;
    }
    function R(P, X, Z, te, G, _) {
      var y, W, M;
      if (M = Object.getOwnPropertyDescriptor(X, G) || { value: X[G] }, M.get ? M.set ? W = P.stylize("[Getter/Setter]", "special") : W = P.stylize("[Getter]", "special") : M.set && (W = P.stylize("[Setter]", "special")), ie(te, G) || (y = "[" + G + "]"), W || (P.seen.indexOf(M.value) < 0 ? (w(Z) ? W = S(P, M.value, null) : W = S(P, M.value, Z - 1), W.indexOf(`
`) > -1 && (_ ? W = W.split(`
`).map(function(O) {
        return "  " + O;
      }).join(`
`).slice(2) : W = `
` + W.split(`
`).map(function(O) {
        return "   " + O;
      }).join(`
`))) : W = P.stylize("[Circular]", "special")), B(y)) {
        if (_ && G.match(/^\d+$/))
          return W;
        y = JSON.stringify("" + G), y.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (y = y.slice(1, -1), y = P.stylize(y, "name")) : (y = y.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), y = P.stylize(y, "string"));
      }
      return y + ": " + W;
    }
    function g(P, X, Z) {
      var te = P.reduce(function(G, _) {
        return _.indexOf(`
`) >= 0, G + _.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      return te > 60 ? Z[0] + (X === "" ? "" : X + `
 `) + " " + P.join(`,
  `) + " " + Z[1] : Z[0] + X + " " + P.join(", ") + " " + Z[1];
    }
    t.types = pl();
    function T(P) {
      return Array.isArray(P);
    }
    t.isArray = T;
    function u(P) {
      return typeof P == "boolean";
    }
    t.isBoolean = u;
    function w(P) {
      return P === null;
    }
    t.isNull = w;
    function p(P) {
      return P == null;
    }
    t.isNullOrUndefined = p;
    function c(P) {
      return typeof P == "number";
    }
    t.isNumber = c;
    function E(P) {
      return typeof P == "string";
    }
    t.isString = E;
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
    t.isPrimitive = U, t.isBuffer = ml();
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
    }, t.inherits = rt(), t._extend = function(P, X) {
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
        for (var te, G, _ = new Promise(function(M, O) {
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
        return _;
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
        var _ = this, y = function() {
          return G.apply(_, arguments);
        };
        P.apply(this, Z).then(
          function(W) {
            we.nextTick(y.bind(null, null, W));
          },
          function(W) {
            we.nextTick(ce.bind(null, W, y));
          }
        );
      }
      return Object.setPrototypeOf(X, Object.getPrototypeOf(P)), Object.defineProperties(
        X,
        e(P)
      ), X;
    }
    t.callbackify = V;
  })(Er)), Er;
}
var _n, Va;
function gl() {
  if (Va) return _n;
  Va = 1;
  function t(R, g) {
    var T = Object.keys(R);
    if (Object.getOwnPropertySymbols) {
      var u = Object.getOwnPropertySymbols(R);
      g && (u = u.filter(function(w) {
        return Object.getOwnPropertyDescriptor(R, w).enumerable;
      })), T.push.apply(T, u);
    }
    return T;
  }
  function e(R) {
    for (var g = 1; g < arguments.length; g++) {
      var T = arguments[g] != null ? arguments[g] : {};
      g % 2 ? t(Object(T), !0).forEach(function(u) {
        r(R, u, T[u]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(R, Object.getOwnPropertyDescriptors(T)) : t(Object(T)).forEach(function(u) {
        Object.defineProperty(R, u, Object.getOwnPropertyDescriptor(T, u));
      });
    }
    return R;
  }
  function r(R, g, T) {
    return g = f(g), g in R ? Object.defineProperty(R, g, { value: T, enumerable: !0, configurable: !0, writable: !0 }) : R[g] = T, R;
  }
  function n(R, g) {
    if (!(R instanceof g))
      throw new TypeError("Cannot call a class as a function");
  }
  function o(R, g) {
    for (var T = 0; T < g.length; T++) {
      var u = g[T];
      u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(R, f(u.key), u);
    }
  }
  function l(R, g, T) {
    return g && o(R.prototype, g), Object.defineProperty(R, "prototype", { writable: !1 }), R;
  }
  function f(R) {
    var g = a(R, "string");
    return typeof g == "symbol" ? g : String(g);
  }
  function a(R, g) {
    if (typeof R != "object" || R === null) return R;
    var T = R[Symbol.toPrimitive];
    if (T !== void 0) {
      var u = T.call(R, g);
      if (typeof u != "object") return u;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(R);
  }
  var h = lr(), A = h.Buffer, S = mo(), k = S.inspect, I = k && k.custom || "inspect";
  function b(R, g, T) {
    A.prototype.copy.call(R, g, T);
  }
  return _n = /* @__PURE__ */ (function() {
    function R() {
      n(this, R), this.head = null, this.tail = null, this.length = 0;
    }
    return l(R, [{
      key: "push",
      value: function(T) {
        var u = {
          data: T,
          next: null
        };
        this.length > 0 ? this.tail.next = u : this.head = u, this.tail = u, ++this.length;
      }
    }, {
      key: "unshift",
      value: function(T) {
        var u = {
          data: T,
          next: this.head
        };
        this.length === 0 && (this.tail = u), this.head = u, ++this.length;
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
        for (var u = this.head, w = "" + u.data; u = u.next; ) w += T + u.data;
        return w;
      }
    }, {
      key: "concat",
      value: function(T) {
        if (this.length === 0) return A.alloc(0);
        for (var u = A.allocUnsafe(T >>> 0), w = this.head, p = 0; w; )
          b(w.data, u, p), p += w.data.length, w = w.next;
        return u;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function(T, u) {
        var w;
        return T < this.head.data.length ? (w = this.head.data.slice(0, T), this.head.data = this.head.data.slice(T)) : T === this.head.data.length ? w = this.shift() : w = u ? this._getString(T) : this._getBuffer(T), w;
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
        var u = this.head, w = 1, p = u.data;
        for (T -= p.length; u = u.next; ) {
          var c = u.data, E = T > c.length ? c.length : T;
          if (E === c.length ? p += c : p += c.slice(0, T), T -= E, T === 0) {
            E === c.length ? (++w, u.next ? this.head = u.next : this.head = this.tail = null) : (this.head = u, u.data = c.slice(E));
            break;
          }
          ++w;
        }
        return this.length -= w, p;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function(T) {
        var u = A.allocUnsafe(T), w = this.head, p = 1;
        for (w.data.copy(u), T -= w.data.length; w = w.next; ) {
          var c = w.data, E = T > c.length ? c.length : T;
          if (c.copy(u, u.length - T, 0, E), T -= E, T === 0) {
            E === c.length ? (++p, w.next ? this.head = w.next : this.head = this.tail = null) : (this.head = w, w.data = c.slice(E));
            break;
          }
          ++p;
        }
        return this.length -= p, u;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: I,
      value: function(T, u) {
        return k(this, e(e({}, u), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), R;
  })(), _n;
}
var En, Xa;
function go() {
  if (Xa) return En;
  Xa = 1;
  function t(f, a) {
    var h = this, A = this._readableState && this._readableState.destroyed, S = this._writableState && this._writableState.destroyed;
    return A || S ? (a ? a(f) : f && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, we.nextTick(o, this, f)) : we.nextTick(o, this, f)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(f || null, function(k) {
      !a && k ? h._writableState ? h._writableState.errorEmitted ? we.nextTick(r, h) : (h._writableState.errorEmitted = !0, we.nextTick(e, h, k)) : we.nextTick(e, h, k) : a ? (we.nextTick(r, h), a(k)) : we.nextTick(r, h);
    }), this);
  }
  function e(f, a) {
    o(f, a), r(f);
  }
  function r(f) {
    f._writableState && !f._writableState.emitClose || f._readableState && !f._readableState.emitClose || f.emit("close");
  }
  function n() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function o(f, a) {
    f.emit("error", a);
  }
  function l(f, a) {
    var h = f._readableState, A = f._writableState;
    h && h.autoDestroy || A && A.autoDestroy ? f.destroy(a) : f.emit("error", a);
  }
  return En = {
    destroy: t,
    undestroy: n,
    errorOrDestroy: l
  }, En;
}
var xn = {}, $a;
function xt() {
  if ($a) return xn;
  $a = 1;
  function t(a, h) {
    a.prototype = Object.create(h.prototype), a.prototype.constructor = a, a.__proto__ = h;
  }
  var e = {};
  function r(a, h, A) {
    A || (A = Error);
    function S(I, b, R) {
      return typeof h == "string" ? h : h(I, b, R);
    }
    var k = /* @__PURE__ */ (function(I) {
      t(b, I);
      function b(R, g, T) {
        return I.call(this, S(R, g, T)) || this;
      }
      return b;
    })(A);
    k.prototype.name = A.name, k.prototype.code = a, e[a] = k;
  }
  function n(a, h) {
    if (Array.isArray(a)) {
      var A = a.length;
      return a = a.map(function(S) {
        return String(S);
      }), A > 2 ? "one of ".concat(h, " ").concat(a.slice(0, A - 1).join(", "), ", or ") + a[A - 1] : A === 2 ? "one of ".concat(h, " ").concat(a[0], " or ").concat(a[1]) : "of ".concat(h, " ").concat(a[0]);
    } else
      return "of ".concat(h, " ").concat(String(a));
  }
  function o(a, h, A) {
    return a.substr(0, h.length) === h;
  }
  function l(a, h, A) {
    return (A === void 0 || A > a.length) && (A = a.length), a.substring(A - h.length, A) === h;
  }
  function f(a, h, A) {
    return typeof A != "number" && (A = 0), A + h.length > a.length ? !1 : a.indexOf(h, A) !== -1;
  }
  return r("ERR_INVALID_OPT_VALUE", function(a, h) {
    return 'The value "' + h + '" is invalid for option "' + a + '"';
  }, TypeError), r("ERR_INVALID_ARG_TYPE", function(a, h, A) {
    var S;
    typeof h == "string" && o(h, "not ") ? (S = "must not be", h = h.replace(/^not /, "")) : S = "must be";
    var k;
    if (l(a, " argument"))
      k = "The ".concat(a, " ").concat(S, " ").concat(n(h, "type"));
    else {
      var I = f(a, ".") ? "property" : "argument";
      k = 'The "'.concat(a, '" ').concat(I, " ").concat(S, " ").concat(n(h, "type"));
    }
    return k += ". Received type ".concat(typeof A), k;
  }, TypeError), r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), r("ERR_METHOD_NOT_IMPLEMENTED", function(a) {
    return "The " + a + " method is not implemented";
  }), r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), r("ERR_STREAM_DESTROYED", function(a) {
    return "Cannot call " + a + " after a stream was destroyed";
  }), r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), r("ERR_STREAM_WRITE_AFTER_END", "write after end"), r("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), r("ERR_UNKNOWN_ENCODING", function(a) {
    return "Unknown encoding: " + a;
  }, TypeError), r("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), xn.codes = e, xn;
}
var Tn, Za;
function wo() {
  if (Za) return Tn;
  Za = 1;
  var t = xt().codes.ERR_INVALID_OPT_VALUE;
  function e(n, o, l) {
    return n.highWaterMark != null ? n.highWaterMark : o ? n[l] : null;
  }
  function r(n, o, l, f) {
    var a = e(o, f, l);
    if (a != null) {
      if (!(isFinite(a) && Math.floor(a) === a) || a < 0) {
        var h = f ? l : "highWaterMark";
        throw new t(h, a);
      }
      return Math.floor(a);
    }
    return n.objectMode ? 16 : 16 * 1024;
  }
  return Tn = {
    getHighWaterMark: r
  }, Tn;
}
var Sn, Ya;
function wl() {
  if (Ya) return Sn;
  Ya = 1, Sn = t;
  function t(r, n) {
    if (e("noDeprecation"))
      return r;
    var o = !1;
    function l() {
      if (!o) {
        if (e("throwDeprecation"))
          throw new Error(n);
        e("traceDeprecation") ? console.trace(n) : console.warn(n), o = !0;
      }
      return r.apply(this, arguments);
    }
    return l;
  }
  function e(r) {
    try {
      if (!Fe.localStorage) return !1;
    } catch {
      return !1;
    }
    var n = Fe.localStorage[r];
    return n == null ? !1 : String(n).toLowerCase() === "true";
  }
  return Sn;
}
var An, Ja;
function yo() {
  if (Ja) return An;
  Ja = 1, An = z;
  function t(G) {
    var _ = this;
    this.next = null, this.entry = null, this.finish = function() {
      te(_, G);
    };
  }
  var e;
  z.WritableState = F;
  var r = {
    deprecate: wl()
  }, n = no(), o = lr().Buffer, l = (typeof Fe < "u" ? Fe : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function f(G) {
    return o.from(G);
  }
  function a(G) {
    return o.isBuffer(G) || G instanceof l;
  }
  var h = go(), A = wo(), S = A.getHighWaterMark, k = xt().codes, I = k.ERR_INVALID_ARG_TYPE, b = k.ERR_METHOD_NOT_IMPLEMENTED, R = k.ERR_MULTIPLE_CALLBACK, g = k.ERR_STREAM_CANNOT_PIPE, T = k.ERR_STREAM_DESTROYED, u = k.ERR_STREAM_NULL_VALUES, w = k.ERR_STREAM_WRITE_AFTER_END, p = k.ERR_UNKNOWN_ENCODING, c = h.errorOrDestroy;
  rt()(z, n);
  function E() {
  }
  function F(G, _, y) {
    e = e || bt(), G = G || {}, typeof y != "boolean" && (y = _ instanceof e), this.objectMode = !!G.objectMode, y && (this.objectMode = this.objectMode || !!G.writableObjectMode), this.highWaterMark = S(this, G, "writableHighWaterMark", y), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var W = G.decodeStrings === !1;
    this.decodeStrings = !W, this.defaultEncoding = G.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(M) {
      ee(_, M);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = G.emitClose !== !1, this.autoDestroy = !!G.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new t(this);
  }
  F.prototype.getBuffer = function() {
    for (var _ = this.bufferedRequest, y = []; _; )
      y.push(_), _ = _.next;
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
    value: function(_) {
      return B.call(this, _) ? !0 : this !== z ? !1 : _ && _._writableState instanceof F;
    }
  })) : B = function(_) {
    return _ instanceof this;
  };
  function z(G) {
    e = e || bt();
    var _ = this instanceof e;
    if (!_ && !B.call(z, this)) return new z(G);
    this._writableState = new F(G, this, _), this.writable = !0, G && (typeof G.write == "function" && (this._write = G.write), typeof G.writev == "function" && (this._writev = G.writev), typeof G.destroy == "function" && (this._destroy = G.destroy), typeof G.final == "function" && (this._final = G.final)), n.call(this);
  }
  z.prototype.pipe = function() {
    c(this, new g());
  };
  function C(G, _) {
    var y = new w();
    c(G, y), we.nextTick(_, y);
  }
  function $(G, _, y, W) {
    var M;
    return y === null ? M = new u() : typeof y != "string" && !_.objectMode && (M = new I("chunk", ["string", "Buffer"], y)), M ? (c(G, M), we.nextTick(W, M), !1) : !0;
  }
  z.prototype.write = function(G, _, y) {
    var W = this._writableState, M = !1, O = !W.objectMode && a(G);
    return O && !o.isBuffer(G) && (G = f(G)), typeof _ == "function" && (y = _, _ = null), O ? _ = "buffer" : _ || (_ = W.defaultEncoding), typeof y != "function" && (y = E), W.ending ? C(this, y) : (O || $(this, W, G, y)) && (W.pendingcb++, M = N(this, W, O, G, _, y)), M;
  }, z.prototype.cork = function() {
    this._writableState.corked++;
  }, z.prototype.uncork = function() {
    var G = this._writableState;
    G.corked && (G.corked--, !G.writing && !G.corked && !G.bufferProcessing && G.bufferedRequest && Q(this, G));
  }, z.prototype.setDefaultEncoding = function(_) {
    if (typeof _ == "string" && (_ = _.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((_ + "").toLowerCase()) > -1)) throw new p(_);
    return this._writableState.defaultEncoding = _, this;
  }, Object.defineProperty(z.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function le(G, _, y) {
    return !G.objectMode && G.decodeStrings !== !1 && typeof _ == "string" && (_ = o.from(_, y)), _;
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
  function N(G, _, y, W, M, O) {
    if (!y) {
      var D = le(_, W, M);
      W !== D && (y = !0, M = "buffer", W = D);
    }
    var J = _.objectMode ? 1 : W.length;
    _.length += J;
    var d = _.length < _.highWaterMark;
    if (d || (_.needDrain = !0), _.writing || _.corked) {
      var Y = _.lastBufferedRequest;
      _.lastBufferedRequest = {
        chunk: W,
        encoding: M,
        isBuf: y,
        callback: O,
        next: null
      }, Y ? Y.next = _.lastBufferedRequest : _.bufferedRequest = _.lastBufferedRequest, _.bufferedRequestCount += 1;
    } else
      U(G, _, !1, J, W, M, O);
    return d;
  }
  function U(G, _, y, W, M, O, D) {
    _.writelen = W, _.writecb = D, _.writing = !0, _.sync = !0, _.destroyed ? _.onwrite(new T("write")) : y ? G._writev(M, _.onwrite) : G._write(M, O, _.onwrite), _.sync = !1;
  }
  function v(G, _, y, W, M) {
    --_.pendingcb, y ? (we.nextTick(M, W), we.nextTick(X, G, _), G._writableState.errorEmitted = !0, c(G, W)) : (M(W), G._writableState.errorEmitted = !0, c(G, W), X(G, _));
  }
  function K(G) {
    G.writing = !1, G.writecb = null, G.length -= G.writelen, G.writelen = 0;
  }
  function ee(G, _) {
    var y = G._writableState, W = y.sync, M = y.writecb;
    if (typeof M != "function") throw new R();
    if (K(y), _) v(G, y, W, _, M);
    else {
      var O = ce(y) || G.destroyed;
      !O && !y.corked && !y.bufferProcessing && y.bufferedRequest && Q(G, y), W ? we.nextTick(H, G, y, O, M) : H(G, y, O, M);
    }
  }
  function H(G, _, y, W) {
    y || ie(G, _), _.pendingcb--, W(), X(G, _);
  }
  function ie(G, _) {
    _.length === 0 && _.needDrain && (_.needDrain = !1, G.emit("drain"));
  }
  function Q(G, _) {
    _.bufferProcessing = !0;
    var y = _.bufferedRequest;
    if (G._writev && y && y.next) {
      var W = _.bufferedRequestCount, M = new Array(W), O = _.corkedRequestsFree;
      O.entry = y;
      for (var D = 0, J = !0; y; )
        M[D] = y, y.isBuf || (J = !1), y = y.next, D += 1;
      M.allBuffers = J, U(G, _, !0, _.length, M, "", O.finish), _.pendingcb++, _.lastBufferedRequest = null, O.next ? (_.corkedRequestsFree = O.next, O.next = null) : _.corkedRequestsFree = new t(_), _.bufferedRequestCount = 0;
    } else {
      for (; y; ) {
        var d = y.chunk, Y = y.encoding, x = y.callback, i = _.objectMode ? 1 : d.length;
        if (U(G, _, !1, i, d, Y, x), y = y.next, _.bufferedRequestCount--, _.writing)
          break;
      }
      y === null && (_.lastBufferedRequest = null);
    }
    _.bufferedRequest = y, _.bufferProcessing = !1;
  }
  z.prototype._write = function(G, _, y) {
    y(new b("_write()"));
  }, z.prototype._writev = null, z.prototype.end = function(G, _, y) {
    var W = this._writableState;
    return typeof G == "function" ? (y = G, G = null, _ = null) : typeof _ == "function" && (y = _, _ = null), G != null && this.write(G, _), W.corked && (W.corked = 1, this.uncork()), W.ending || Z(this, W, y), this;
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
  function V(G, _) {
    G._final(function(y) {
      _.pendingcb--, y && c(G, y), _.prefinished = !0, G.emit("prefinish"), X(G, _);
    });
  }
  function P(G, _) {
    !_.prefinished && !_.finalCalled && (typeof G._final == "function" && !_.destroyed ? (_.pendingcb++, _.finalCalled = !0, we.nextTick(V, G, _)) : (_.prefinished = !0, G.emit("prefinish")));
  }
  function X(G, _) {
    var y = ce(_);
    if (y && (P(G, _), _.pendingcb === 0 && (_.finished = !0, G.emit("finish"), _.autoDestroy))) {
      var W = G._readableState;
      (!W || W.autoDestroy && W.endEmitted) && G.destroy();
    }
    return y;
  }
  function Z(G, _, y) {
    _.ending = !0, X(G, _), y && (_.finished ? we.nextTick(y) : G.once("finish", y)), _.ended = !0, G.writable = !1;
  }
  function te(G, _, y) {
    var W = G.entry;
    for (G.entry = null; W; ) {
      var M = W.callback;
      _.pendingcb--, M(y), W = W.next;
    }
    _.corkedRequestsFree.next = G;
  }
  return Object.defineProperty(z.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(_) {
      this._writableState && (this._writableState.destroyed = _);
    }
  }), z.prototype.destroy = h.destroy, z.prototype._undestroy = h.undestroy, z.prototype._destroy = function(G, _) {
    _(G);
  }, An;
}
var kn, Qa;
function bt() {
  if (Qa) return kn;
  Qa = 1;
  var t = Object.keys || function(A) {
    var S = [];
    for (var k in A) S.push(k);
    return S;
  };
  kn = f;
  var e = vo(), r = yo();
  rt()(f, e);
  for (var n = t(r.prototype), o = 0; o < n.length; o++) {
    var l = n[o];
    f.prototype[l] || (f.prototype[l] = r.prototype[l]);
  }
  function f(A) {
    if (!(this instanceof f)) return new f(A);
    e.call(this, A), r.call(this, A), this.allowHalfOpen = !0, A && (A.readable === !1 && (this.readable = !1), A.writable === !1 && (this.writable = !1), A.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", a)));
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
    this._writableState.ended || we.nextTick(h, this);
  }
  function h(A) {
    A.end();
  }
  return Object.defineProperty(f.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(S) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = S, this._writableState.destroyed = S);
    }
  }), kn;
}
var Rn = {}, $t = { exports: {} }, es;
function yl() {
  return es || (es = 1, (function(t, e) {
    var r = lr(), n = r.Buffer;
    function o(f, a) {
      for (var h in f)
        a[h] = f[h];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (o(r, e), e.Buffer = l);
    function l(f, a, h) {
      return n(f, a, h);
    }
    o(n, l), l.from = function(f, a, h) {
      if (typeof f == "number")
        throw new TypeError("Argument must not be a number");
      return n(f, a, h);
    }, l.alloc = function(f, a, h) {
      if (typeof f != "number")
        throw new TypeError("Argument must be a number");
      var A = n(f);
      return a !== void 0 ? typeof h == "string" ? A.fill(a, h) : A.fill(a) : A.fill(0), A;
    }, l.allocUnsafe = function(f) {
      if (typeof f != "number")
        throw new TypeError("Argument must be a number");
      return n(f);
    }, l.allocUnsafeSlow = function(f) {
      if (typeof f != "number")
        throw new TypeError("Argument must be a number");
      return r.SlowBuffer(f);
    };
  })($t, $t.exports)), $t.exports;
}
var ts;
function bi() {
  if (ts) return Rn;
  ts = 1;
  var t = yl().Buffer, e = t.isEncoding || function(u) {
    switch (u = "" + u, u && u.toLowerCase()) {
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
  function r(u) {
    if (!u) return "utf8";
    for (var w; ; )
      switch (u) {
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
          return u;
        default:
          if (w) return;
          u = ("" + u).toLowerCase(), w = !0;
      }
  }
  function n(u) {
    var w = r(u);
    if (typeof w != "string" && (t.isEncoding === e || !e(u))) throw new Error("Unknown encoding: " + u);
    return w || u;
  }
  Rn.StringDecoder = o;
  function o(u) {
    this.encoding = n(u);
    var w;
    switch (this.encoding) {
      case "utf16le":
        this.text = k, this.end = I, w = 4;
        break;
      case "utf8":
        this.fillLast = h, w = 4;
        break;
      case "base64":
        this.text = b, this.end = R, w = 3;
        break;
      default:
        this.write = g, this.end = T;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(w);
  }
  o.prototype.write = function(u) {
    if (u.length === 0) return "";
    var w, p;
    if (this.lastNeed) {
      if (w = this.fillLast(u), w === void 0) return "";
      p = this.lastNeed, this.lastNeed = 0;
    } else
      p = 0;
    return p < u.length ? w ? w + this.text(u, p) : this.text(u, p) : w || "";
  }, o.prototype.end = S, o.prototype.text = A, o.prototype.fillLast = function(u) {
    if (this.lastNeed <= u.length)
      return u.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    u.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, u.length), this.lastNeed -= u.length;
  };
  function l(u) {
    return u <= 127 ? 0 : u >> 5 === 6 ? 2 : u >> 4 === 14 ? 3 : u >> 3 === 30 ? 4 : u >> 6 === 2 ? -1 : -2;
  }
  function f(u, w, p) {
    var c = w.length - 1;
    if (c < p) return 0;
    var E = l(w[c]);
    return E >= 0 ? (E > 0 && (u.lastNeed = E - 1), E) : --c < p || E === -2 ? 0 : (E = l(w[c]), E >= 0 ? (E > 0 && (u.lastNeed = E - 2), E) : --c < p || E === -2 ? 0 : (E = l(w[c]), E >= 0 ? (E > 0 && (E === 2 ? E = 0 : u.lastNeed = E - 3), E) : 0));
  }
  function a(u, w, p) {
    if ((w[0] & 192) !== 128)
      return u.lastNeed = 0, "�";
    if (u.lastNeed > 1 && w.length > 1) {
      if ((w[1] & 192) !== 128)
        return u.lastNeed = 1, "�";
      if (u.lastNeed > 2 && w.length > 2 && (w[2] & 192) !== 128)
        return u.lastNeed = 2, "�";
    }
  }
  function h(u) {
    var w = this.lastTotal - this.lastNeed, p = a(this, u);
    if (p !== void 0) return p;
    if (this.lastNeed <= u.length)
      return u.copy(this.lastChar, w, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    u.copy(this.lastChar, w, 0, u.length), this.lastNeed -= u.length;
  }
  function A(u, w) {
    var p = f(this, u, w);
    if (!this.lastNeed) return u.toString("utf8", w);
    this.lastTotal = p;
    var c = u.length - (p - this.lastNeed);
    return u.copy(this.lastChar, 0, c), u.toString("utf8", w, c);
  }
  function S(u) {
    var w = u && u.length ? this.write(u) : "";
    return this.lastNeed ? w + "�" : w;
  }
  function k(u, w) {
    if ((u.length - w) % 2 === 0) {
      var p = u.toString("utf16le", w);
      if (p) {
        var c = p.charCodeAt(p.length - 1);
        if (c >= 55296 && c <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = u[u.length - 2], this.lastChar[1] = u[u.length - 1], p.slice(0, -1);
      }
      return p;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = u[u.length - 1], u.toString("utf16le", w, u.length - 1);
  }
  function I(u) {
    var w = u && u.length ? this.write(u) : "";
    if (this.lastNeed) {
      var p = this.lastTotal - this.lastNeed;
      return w + this.lastChar.toString("utf16le", 0, p);
    }
    return w;
  }
  function b(u, w) {
    var p = (u.length - w) % 3;
    return p === 0 ? u.toString("base64", w) : (this.lastNeed = 3 - p, this.lastTotal = 3, p === 1 ? this.lastChar[0] = u[u.length - 1] : (this.lastChar[0] = u[u.length - 2], this.lastChar[1] = u[u.length - 1]), u.toString("base64", w, u.length - p));
  }
  function R(u) {
    var w = u && u.length ? this.write(u) : "";
    return this.lastNeed ? w + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : w;
  }
  function g(u) {
    return u.toString(this.encoding);
  }
  function T(u) {
    return u && u.length ? this.write(u) : "";
  }
  return Rn;
}
var In, rs;
function Ci() {
  if (rs) return In;
  rs = 1;
  var t = xt().codes.ERR_STREAM_PREMATURE_CLOSE;
  function e(l) {
    var f = !1;
    return function() {
      if (!f) {
        f = !0;
        for (var a = arguments.length, h = new Array(a), A = 0; A < a; A++)
          h[A] = arguments[A];
        l.apply(this, h);
      }
    };
  }
  function r() {
  }
  function n(l) {
    return l.setHeader && typeof l.abort == "function";
  }
  function o(l, f, a) {
    if (typeof f == "function") return o(l, null, f);
    f || (f = {}), a = e(a || r);
    var h = f.readable || f.readable !== !1 && l.readable, A = f.writable || f.writable !== !1 && l.writable, S = function() {
      l.writable || I();
    }, k = l._writableState && l._writableState.finished, I = function() {
      A = !1, k = !0, h || a.call(l);
    }, b = l._readableState && l._readableState.endEmitted, R = function() {
      h = !1, b = !0, A || a.call(l);
    }, g = function(p) {
      a.call(l, p);
    }, T = function() {
      var p;
      if (h && !b)
        return (!l._readableState || !l._readableState.ended) && (p = new t()), a.call(l, p);
      if (A && !k)
        return (!l._writableState || !l._writableState.ended) && (p = new t()), a.call(l, p);
    }, u = function() {
      l.req.on("finish", I);
    };
    return n(l) ? (l.on("complete", I), l.on("abort", T), l.req ? u() : l.on("request", u)) : A && !l._writableState && (l.on("end", S), l.on("close", S)), l.on("end", R), l.on("finish", I), f.error !== !1 && l.on("error", g), l.on("close", T), function() {
      l.removeListener("complete", I), l.removeListener("abort", T), l.removeListener("request", u), l.req && l.req.removeListener("finish", I), l.removeListener("end", S), l.removeListener("close", S), l.removeListener("finish", I), l.removeListener("end", R), l.removeListener("error", g), l.removeListener("close", T);
    };
  }
  return In = o, In;
}
var Cn, ns;
function vl() {
  if (ns) return Cn;
  ns = 1;
  var t;
  function e(p, c, E) {
    return c = r(c), c in p ? Object.defineProperty(p, c, { value: E, enumerable: !0, configurable: !0, writable: !0 }) : p[c] = E, p;
  }
  function r(p) {
    var c = n(p, "string");
    return typeof c == "symbol" ? c : String(c);
  }
  function n(p, c) {
    if (typeof p != "object" || p === null) return p;
    var E = p[Symbol.toPrimitive];
    if (E !== void 0) {
      var F = E.call(p, c);
      if (typeof F != "object") return F;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (c === "string" ? String : Number)(p);
  }
  var o = Ci(), l = /* @__PURE__ */ Symbol("lastResolve"), f = /* @__PURE__ */ Symbol("lastReject"), a = /* @__PURE__ */ Symbol("error"), h = /* @__PURE__ */ Symbol("ended"), A = /* @__PURE__ */ Symbol("lastPromise"), S = /* @__PURE__ */ Symbol("handlePromise"), k = /* @__PURE__ */ Symbol("stream");
  function I(p, c) {
    return {
      value: p,
      done: c
    };
  }
  function b(p) {
    var c = p[l];
    if (c !== null) {
      var E = p[k].read();
      E !== null && (p[A] = null, p[l] = null, p[f] = null, c(I(E, !1)));
    }
  }
  function R(p) {
    we.nextTick(b, p);
  }
  function g(p, c) {
    return function(E, F) {
      p.then(function() {
        if (c[h]) {
          E(I(void 0, !0));
          return;
        }
        c[S](E, F);
      }, F);
    };
  }
  var T = Object.getPrototypeOf(function() {
  }), u = Object.setPrototypeOf((t = {
    get stream() {
      return this[k];
    },
    next: function() {
      var c = this, E = this[a];
      if (E !== null)
        return Promise.reject(E);
      if (this[h])
        return Promise.resolve(I(void 0, !0));
      if (this[k].destroyed)
        return new Promise(function(C, $) {
          we.nextTick(function() {
            c[a] ? $(c[a]) : C(I(void 0, !0));
          });
        });
      var F = this[A], B;
      if (F)
        B = new Promise(g(F, this));
      else {
        var z = this[k].read();
        if (z !== null)
          return Promise.resolve(I(z, !1));
        B = new Promise(this[S]);
      }
      return this[A] = B, B;
    }
  }, e(t, Symbol.asyncIterator, function() {
    return this;
  }), e(t, "return", function() {
    var c = this;
    return new Promise(function(E, F) {
      c[k].destroy(null, function(B) {
        if (B) {
          F(B);
          return;
        }
        E(I(void 0, !0));
      });
    });
  }), t), T), w = function(c) {
    var E, F = Object.create(u, (E = {}, e(E, k, {
      value: c,
      writable: !0
    }), e(E, l, {
      value: null,
      writable: !0
    }), e(E, f, {
      value: null,
      writable: !0
    }), e(E, a, {
      value: null,
      writable: !0
    }), e(E, h, {
      value: c._readableState.endEmitted,
      writable: !0
    }), e(E, S, {
      value: function(z, C) {
        var $ = F[k].read();
        $ ? (F[A] = null, F[l] = null, F[f] = null, z(I($, !1))) : (F[l] = z, F[f] = C);
      },
      writable: !0
    }), E));
    return F[A] = null, o(c, function(B) {
      if (B && B.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var z = F[f];
        z !== null && (F[A] = null, F[l] = null, F[f] = null, z(B)), F[a] = B;
        return;
      }
      var C = F[l];
      C !== null && (F[A] = null, F[l] = null, F[f] = null, C(I(void 0, !0))), F[h] = !0;
    }), c.on("readable", R.bind(null, F)), F;
  };
  return Cn = w, Cn;
}
var Nn, is;
function bl() {
  return is || (is = 1, Nn = function() {
    throw new Error("Readable.from is not available in the browser");
  }), Nn;
}
var On, as;
function vo() {
  if (as) return On;
  as = 1, On = C;
  var t;
  C.ReadableState = z, Si().EventEmitter;
  var e = function(D, J) {
    return D.listeners(J).length;
  }, r = no(), n = lr().Buffer, o = (typeof Fe < "u" ? Fe : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function l(O) {
    return n.from(O);
  }
  function f(O) {
    return n.isBuffer(O) || O instanceof o;
  }
  var a = mo(), h;
  a && a.debuglog ? h = a.debuglog("stream") : h = function() {
  };
  var A = gl(), S = go(), k = wo(), I = k.getHighWaterMark, b = xt().codes, R = b.ERR_INVALID_ARG_TYPE, g = b.ERR_STREAM_PUSH_AFTER_EOF, T = b.ERR_METHOD_NOT_IMPLEMENTED, u = b.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, w, p, c;
  rt()(C, r);
  var E = S.errorOrDestroy, F = ["error", "close", "destroy", "pause", "resume"];
  function B(O, D, J) {
    if (typeof O.prependListener == "function") return O.prependListener(D, J);
    !O._events || !O._events[D] ? O.on(D, J) : Array.isArray(O._events[D]) ? O._events[D].unshift(J) : O._events[D] = [J, O._events[D]];
  }
  function z(O, D, J) {
    t = t || bt(), O = O || {}, typeof J != "boolean" && (J = D instanceof t), this.objectMode = !!O.objectMode, J && (this.objectMode = this.objectMode || !!O.readableObjectMode), this.highWaterMark = I(this, O, "readableHighWaterMark", J), this.buffer = new A(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = O.emitClose !== !1, this.autoDestroy = !!O.autoDestroy, this.destroyed = !1, this.defaultEncoding = O.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, O.encoding && (w || (w = bi().StringDecoder), this.decoder = new w(O.encoding), this.encoding = O.encoding);
  }
  function C(O) {
    if (t = t || bt(), !(this instanceof C)) return new C(O);
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
  }), C.prototype.destroy = S.destroy, C.prototype._undestroy = S.undestroy, C.prototype._destroy = function(O, D) {
    D(O);
  }, C.prototype.push = function(O, D) {
    var J = this._readableState, d;
    return J.objectMode ? d = !0 : typeof O == "string" && (D = D || J.defaultEncoding, D !== J.encoding && (O = n.from(O, D), D = ""), d = !0), $(this, O, D, !1, d);
  }, C.prototype.unshift = function(O) {
    return $(this, O, null, !0, !1);
  };
  function $(O, D, J, d, Y) {
    h("readableAddChunk", D);
    var x = O._readableState;
    if (D === null)
      x.reading = !1, ee(O, x);
    else {
      var i;
      if (Y || (i = N(x, D)), i)
        E(O, i);
      else if (x.objectMode || D && D.length > 0)
        if (typeof D != "string" && !x.objectMode && Object.getPrototypeOf(D) !== n.prototype && (D = l(D)), d)
          x.endEmitted ? E(O, new u()) : le(O, x, D, !0);
        else if (x.ended)
          E(O, new g());
        else {
          if (x.destroyed)
            return !1;
          x.reading = !1, x.decoder && !J ? (D = x.decoder.write(D), x.objectMode || D.length !== 0 ? le(O, x, D, !1) : Q(O, x)) : le(O, x, D, !1);
        }
      else d || (x.reading = !1, Q(O, x));
    }
    return !x.ended && (x.length < x.highWaterMark || x.length === 0);
  }
  function le(O, D, J, d) {
    D.flowing && D.length === 0 && !D.sync ? (D.awaitDrain = 0, O.emit("data", J)) : (D.length += D.objectMode ? 1 : J.length, d ? D.buffer.unshift(J) : D.buffer.push(J), D.needReadable && H(O)), Q(O, D);
  }
  function N(O, D) {
    var J;
    return !f(D) && typeof D != "string" && D !== void 0 && !O.objectMode && (J = new R("chunk", ["string", "Buffer", "Uint8Array"], D)), J;
  }
  C.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, C.prototype.setEncoding = function(O) {
    w || (w = bi().StringDecoder);
    var D = new w(O);
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
    return O > 0 ? Y = _(O, D) : Y = null, Y === null ? (D.needReadable = D.length <= D.highWaterMark, O = 0) : (D.length -= O, D.awaitDrain = 0), D.length === 0 && (D.ended || (D.needReadable = !0), J !== O && D.ended && y(this)), Y !== null && this.emit("data", Y), Y;
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
    h("emitReadable", D.needReadable, D.emittedReadable), D.needReadable = !1, D.emittedReadable || (h("emitReadable", D.flowing), D.emittedReadable = !0, we.nextTick(ie, O));
  }
  function ie(O) {
    var D = O._readableState;
    h("emitReadable_", D.destroyed, D.length, D.ended), !D.destroyed && (D.length || D.ended) && (O.emit("readable"), D.emittedReadable = !1), D.needReadable = !D.flowing && !D.ended && D.length <= D.highWaterMark, G(O);
  }
  function Q(O, D) {
    D.readingMore || (D.readingMore = !0, we.nextTick(ce, O, D));
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
    E(this, new T("_read()"));
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
    var Y = (!D || D.end !== !1) && O !== we.stdout && O !== we.stderr, x = Y ? s : he;
    d.endEmitted ? we.nextTick(x) : J.once("end", x), O.on("unpipe", i);
    function i(de, ge) {
      h("onunpipe"), de === J && ge && ge.hasUnpiped === !1 && (ge.hasUnpiped = !0, q());
    }
    function s() {
      h("onend"), O.end();
    }
    var m = V(J);
    O.on("drain", m);
    var L = !1;
    function q() {
      h("cleanup"), O.removeListener("close", oe), O.removeListener("finish", se), O.removeListener("drain", m), O.removeListener("error", ne), O.removeListener("unpipe", i), J.removeListener("end", s), J.removeListener("end", he), J.removeListener("data", j), L = !0, d.awaitDrain && (!O._writableState || O._writableState.needDrain) && m();
    }
    J.on("data", j);
    function j(de) {
      h("ondata");
      var ge = O.write(de);
      h("dest.write", ge), ge === !1 && ((d.pipesCount === 1 && d.pipes === O || d.pipesCount > 1 && M(d.pipes, O) !== -1) && !L && (h("false write response, pause", d.awaitDrain), d.awaitDrain++), J.pause());
    }
    function ne(de) {
      h("onerror", de), he(), O.removeListener("error", ne), e(O, "error") === 0 && E(O, de);
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
      for (var x = 0; x < Y; x++) d[x].emit("unpipe", this, {
        hasUnpiped: !1
      });
      return this;
    }
    var i = M(D.pipes, O);
    return i === -1 ? this : (D.pipes.splice(i, 1), D.pipesCount -= 1, D.pipesCount === 1 && (D.pipes = D.pipes[0]), O.emit("unpipe", this, J), this);
  }, C.prototype.on = function(O, D) {
    var J = r.prototype.on.call(this, O, D), d = this._readableState;
    return O === "data" ? (d.readableListening = this.listenerCount("readable") > 0, d.flowing !== !1 && this.resume()) : O === "readable" && !d.endEmitted && !d.readableListening && (d.readableListening = d.needReadable = !0, d.flowing = !1, d.emittedReadable = !1, h("on readable", d.length, d.reading), d.length ? H(this) : d.reading || we.nextTick(X, this)), J;
  }, C.prototype.addListener = C.prototype.on, C.prototype.removeListener = function(O, D) {
    var J = r.prototype.removeListener.call(this, O, D);
    return O === "readable" && we.nextTick(P, this), J;
  }, C.prototype.removeAllListeners = function(O) {
    var D = r.prototype.removeAllListeners.apply(this, arguments);
    return (O === "readable" || O === void 0) && we.nextTick(P, this), D;
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
    D.resumeScheduled || (D.resumeScheduled = !0, we.nextTick(te, O, D));
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
    for (var x = 0; x < F.length; x++)
      O.on(F[x], this.emit.bind(this, F[x]));
    return this._read = function(i) {
      h("wrapped _read", i), d && (d = !1, O.resume());
    }, this;
  }, typeof Symbol == "function" && (C.prototype[Symbol.asyncIterator] = function() {
    return p === void 0 && (p = vl()), p(this);
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
  }), C._fromList = _, Object.defineProperty(C.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function _(O, D) {
    if (D.length === 0) return null;
    var J;
    return D.objectMode ? J = D.buffer.shift() : !O || O >= D.length ? (D.decoder ? J = D.buffer.join("") : D.buffer.length === 1 ? J = D.buffer.first() : J = D.buffer.concat(D.length), D.buffer.clear()) : J = D.buffer.consume(O, D.decoder), J;
  }
  function y(O) {
    var D = O._readableState;
    h("endReadable", D.endEmitted), D.endEmitted || (D.ended = !0, we.nextTick(W, D, O));
  }
  function W(O, D) {
    if (h("endReadableNT", O.endEmitted, O.length), !O.endEmitted && O.length === 0 && (O.endEmitted = !0, D.readable = !1, D.emit("end"), O.autoDestroy)) {
      var J = D._writableState;
      (!J || J.autoDestroy && J.finished) && D.destroy();
    }
  }
  typeof Symbol == "function" && (C.from = function(O, D) {
    return c === void 0 && (c = bl()), c(C, O, D);
  });
  function M(O, D) {
    for (var J = 0, d = O.length; J < d; J++)
      if (O[J] === D) return J;
    return -1;
  }
  return On;
}
var Pn, ss;
function bo() {
  if (ss) return Pn;
  ss = 1, Pn = a;
  var t = xt().codes, e = t.ERR_METHOD_NOT_IMPLEMENTED, r = t.ERR_MULTIPLE_CALLBACK, n = t.ERR_TRANSFORM_ALREADY_TRANSFORMING, o = t.ERR_TRANSFORM_WITH_LENGTH_0, l = bt();
  rt()(a, l);
  function f(S, k) {
    var I = this._transformState;
    I.transforming = !1;
    var b = I.writecb;
    if (b === null)
      return this.emit("error", new r());
    I.writechunk = null, I.writecb = null, k != null && this.push(k), b(S);
    var R = this._readableState;
    R.reading = !1, (R.needReadable || R.length < R.highWaterMark) && this._read(R.highWaterMark);
  }
  function a(S) {
    if (!(this instanceof a)) return new a(S);
    l.call(this, S), this._transformState = {
      afterTransform: f.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, S && (typeof S.transform == "function" && (this._transform = S.transform), typeof S.flush == "function" && (this._flush = S.flush)), this.on("prefinish", h);
  }
  function h() {
    var S = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(k, I) {
      A(S, k, I);
    }) : A(this, null, null);
  }
  a.prototype.push = function(S, k) {
    return this._transformState.needTransform = !1, l.prototype.push.call(this, S, k);
  }, a.prototype._transform = function(S, k, I) {
    I(new e("_transform()"));
  }, a.prototype._write = function(S, k, I) {
    var b = this._transformState;
    if (b.writecb = I, b.writechunk = S, b.writeencoding = k, !b.transforming) {
      var R = this._readableState;
      (b.needTransform || R.needReadable || R.length < R.highWaterMark) && this._read(R.highWaterMark);
    }
  }, a.prototype._read = function(S) {
    var k = this._transformState;
    k.writechunk !== null && !k.transforming ? (k.transforming = !0, this._transform(k.writechunk, k.writeencoding, k.afterTransform)) : k.needTransform = !0;
  }, a.prototype._destroy = function(S, k) {
    l.prototype._destroy.call(this, S, function(I) {
      k(I);
    });
  };
  function A(S, k, I) {
    if (k) return S.emit("error", k);
    if (I != null && S.push(I), S._writableState.length) throw new o();
    if (S._transformState.transforming) throw new n();
    return S.push(null);
  }
  return Pn;
}
var Fn, os;
function _l() {
  if (os) return Fn;
  os = 1, Fn = e;
  var t = bo();
  rt()(e, t);
  function e(r) {
    if (!(this instanceof e)) return new e(r);
    t.call(this, r);
  }
  return e.prototype._transform = function(r, n, o) {
    o(null, r);
  }, Fn;
}
var Dn, us;
function El() {
  if (us) return Dn;
  us = 1;
  var t;
  function e(I) {
    var b = !1;
    return function() {
      b || (b = !0, I.apply(void 0, arguments));
    };
  }
  var r = xt().codes, n = r.ERR_MISSING_ARGS, o = r.ERR_STREAM_DESTROYED;
  function l(I) {
    if (I) throw I;
  }
  function f(I) {
    return I.setHeader && typeof I.abort == "function";
  }
  function a(I, b, R, g) {
    g = e(g);
    var T = !1;
    I.on("close", function() {
      T = !0;
    }), t === void 0 && (t = Ci()), t(I, {
      readable: b,
      writable: R
    }, function(w) {
      if (w) return g(w);
      T = !0, g();
    });
    var u = !1;
    return function(w) {
      if (!T && !u) {
        if (u = !0, f(I)) return I.abort();
        if (typeof I.destroy == "function") return I.destroy();
        g(w || new o("pipe"));
      }
    };
  }
  function h(I) {
    I();
  }
  function A(I, b) {
    return I.pipe(b);
  }
  function S(I) {
    return !I.length || typeof I[I.length - 1] != "function" ? l : I.pop();
  }
  function k() {
    for (var I = arguments.length, b = new Array(I), R = 0; R < I; R++)
      b[R] = arguments[R];
    var g = S(b);
    if (Array.isArray(b[0]) && (b = b[0]), b.length < 2)
      throw new n("streams");
    var T, u = b.map(function(w, p) {
      var c = p < b.length - 1, E = p > 0;
      return a(w, c, E, function(F) {
        T || (T = F), F && u.forEach(h), !c && (u.forEach(h), g(T));
      });
    });
    return b.reduce(A);
  }
  return Dn = k, Dn;
}
var Bn, ls;
function Ni() {
  if (ls) return Bn;
  ls = 1, Bn = r;
  var t = Si().EventEmitter, e = rt();
  e(r, t), r.Readable = vo(), r.Writable = yo(), r.Duplex = bt(), r.Transform = bo(), r.PassThrough = _l(), r.finished = Ci(), r.pipeline = El(), r.Stream = r;
  function r() {
    t.call(this);
  }
  return r.prototype.pipe = function(n, o) {
    var l = this;
    function f(b) {
      n.writable && n.write(b) === !1 && l.pause && l.pause();
    }
    l.on("data", f);
    function a() {
      l.readable && l.resume && l.resume();
    }
    n.on("drain", a), !n._isStdio && (!o || o.end !== !1) && (l.on("end", A), l.on("close", S));
    var h = !1;
    function A() {
      h || (h = !0, n.end());
    }
    function S() {
      h || (h = !0, typeof n.destroy == "function" && n.destroy());
    }
    function k(b) {
      if (I(), t.listenerCount(this, "error") === 0)
        throw b;
    }
    l.on("error", k), n.on("error", k);
    function I() {
      l.removeListener("data", f), n.removeListener("drain", a), l.removeListener("end", A), l.removeListener("close", S), l.removeListener("error", k), n.removeListener("error", k), l.removeListener("end", I), l.removeListener("close", I), n.removeListener("close", I);
    }
    return l.on("end", I), l.on("close", I), n.on("close", I), n.emit("pipe", l), n;
  }, Bn;
}
var cs;
function xl() {
  return cs || (cs = 1, (function(t) {
    (function(e) {
      e.parser = function(_, y) {
        return new n(_, y);
      }, e.SAXParser = n, e.SAXStream = S, e.createStream = A, e.MAX_BUFFER_LENGTH = 64 * 1024;
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
      function n(_, y) {
        if (!(this instanceof n))
          return new n(_, y);
        var W = this;
        l(W), W.q = W.c = "", W.bufferCheckPosition = e.MAX_BUFFER_LENGTH, W.opt = y || {}, W.opt.lowercase = W.opt.lowercase || W.opt.lowercasetags, W.looseCase = W.opt.lowercase ? "toLowerCase" : "toUpperCase", W.tags = [], W.closed = W.closedRoot = W.sawRoot = !1, W.tag = W.error = null, W.strict = !!_, W.noscript = !!(_ || W.opt.noscript), W.state = C.BEGIN, W.strictEntities = W.opt.strictEntities, W.ENTITIES = W.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES), W.attribList = [], W.opt.xmlns && (W.ns = Object.create(g)), W.trackPosition = W.opt.position !== !1, W.trackPosition && (W.position = W.line = W.column = 0), le(W, "onready");
      }
      Object.create || (Object.create = function(_) {
        function y() {
        }
        y.prototype = _;
        var W = new y();
        return W;
      }), Object.keys || (Object.keys = function(_) {
        var y = [];
        for (var W in _) _.hasOwnProperty(W) && y.push(W);
        return y;
      });
      function o(_) {
        for (var y = Math.max(e.MAX_BUFFER_LENGTH, 10), W = 0, M = 0, O = r.length; M < O; M++) {
          var D = _[r[M]].length;
          if (D > y)
            switch (r[M]) {
              case "textNode":
                U(_);
                break;
              case "cdata":
                N(_, "oncdata", _.cdata), _.cdata = "";
                break;
              case "script":
                N(_, "onscript", _.script), _.script = "";
                break;
              default:
                K(_, "Max buffer length exceeded: " + r[M]);
            }
          W = Math.max(W, D);
        }
        var J = e.MAX_BUFFER_LENGTH - W;
        _.bufferCheckPosition = J + _.position;
      }
      function l(_) {
        for (var y = 0, W = r.length; y < W; y++)
          _[r[y]] = "";
      }
      function f(_) {
        U(_), _.cdata !== "" && (N(_, "oncdata", _.cdata), _.cdata = ""), _.script !== "" && (N(_, "onscript", _.script), _.script = "");
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
        a = Ni().Stream;
      } catch {
        a = function() {
        };
      }
      var h = e.EVENTS.filter(function(_) {
        return _ !== "error" && _ !== "end";
      });
      function A(_, y) {
        return new S(_, y);
      }
      function S(_, y) {
        if (!(this instanceof S))
          return new S(_, y);
        a.apply(this), this._parser = new n(_, y), this.writable = !0, this.readable = !0;
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
      S.prototype = Object.create(a.prototype, {
        constructor: {
          value: S
        }
      }), S.prototype.write = function(_) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(_)) {
          if (!this._decoder) {
            var y = bi().StringDecoder;
            this._decoder = new y("utf8");
          }
          _ = this._decoder.write(_);
        }
        return this._parser.write(_.toString()), this.emit("data", _), !0;
      }, S.prototype.end = function(_) {
        return _ && _.length && this.write(_), this._parser.end(), !0;
      }, S.prototype.on = function(_, y) {
        var W = this;
        return !W._parser["on" + _] && h.indexOf(_) !== -1 && (W._parser["on" + _] = function() {
          var M = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          M.splice(0, 0, _), W.emit.apply(W, M);
        }), a.prototype.on.call(W, _, y);
      };
      var k = "[CDATA[", I = "DOCTYPE", b = "http://www.w3.org/XML/1998/namespace", R = "http://www.w3.org/2000/xmlns/", g = { xml: b, xmlns: R }, T = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, u = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, w = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, p = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function c(_) {
        return _ === " " || _ === `
` || _ === "\r" || _ === "	";
      }
      function E(_) {
        return _ === '"' || _ === "'";
      }
      function F(_) {
        return _ === ">" || c(_);
      }
      function B(_, y) {
        return _.test(y);
      }
      function z(_, y) {
        return !B(_, y);
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
      }, Object.keys(e.ENTITIES).forEach(function(_) {
        var y = e.ENTITIES[_], W = typeof y == "number" ? String.fromCharCode(y) : y;
        e.ENTITIES[_] = W;
      });
      for (var $ in e.STATE)
        e.STATE[e.STATE[$]] = $;
      C = e.STATE;
      function le(_, y, W) {
        _[y] && _[y](W);
      }
      function N(_, y, W) {
        _.textNode && U(_), le(_, y, W);
      }
      function U(_) {
        _.textNode = v(_.opt, _.textNode), _.textNode && le(_, "ontext", _.textNode), _.textNode = "";
      }
      function v(_, y) {
        return _.trim && (y = y.trim()), _.normalize && (y = y.replace(/\s+/g, " ")), y;
      }
      function K(_, y) {
        return U(_), _.trackPosition && (y += `
Line: ` + _.line + `
Column: ` + _.column + `
Char: ` + _.c), y = new Error(y), _.error = y, le(_, "onerror", y), _;
      }
      function ee(_) {
        return _.sawRoot && !_.closedRoot && H(_, "Unclosed root tag"), _.state !== C.BEGIN && _.state !== C.BEGIN_WHITESPACE && _.state !== C.TEXT && K(_, "Unexpected end"), U(_), _.c = "", _.closed = !0, le(_, "onend"), n.call(_, _.strict, _.opt), _;
      }
      function H(_, y) {
        if (typeof _ != "object" || !(_ instanceof n))
          throw new Error("bad call to strictFail");
        _.strict && K(_, y);
      }
      function ie(_) {
        _.strict || (_.tagName = _.tagName[_.looseCase]());
        var y = _.tags[_.tags.length - 1] || _, W = _.tag = { name: _.tagName, attributes: {} };
        _.opt.xmlns && (W.ns = y.ns), _.attribList.length = 0, N(_, "onopentagstart", W);
      }
      function Q(_, y) {
        var W = _.indexOf(":"), M = W < 0 ? ["", _] : _.split(":"), O = M[0], D = M[1];
        return y && _ === "xmlns" && (O = "xmlns", D = ""), { prefix: O, local: D };
      }
      function ce(_) {
        if (_.strict || (_.attribName = _.attribName[_.looseCase]()), _.attribList.indexOf(_.attribName) !== -1 || _.tag.attributes.hasOwnProperty(_.attribName)) {
          _.attribName = _.attribValue = "";
          return;
        }
        if (_.opt.xmlns) {
          var y = Q(_.attribName, !0), W = y.prefix, M = y.local;
          if (W === "xmlns")
            if (M === "xml" && _.attribValue !== b)
              H(
                _,
                "xml: prefix must be bound to " + b + `
Actual: ` + _.attribValue
              );
            else if (M === "xmlns" && _.attribValue !== R)
              H(
                _,
                "xmlns: prefix must be bound to " + R + `
Actual: ` + _.attribValue
              );
            else {
              var O = _.tag, D = _.tags[_.tags.length - 1] || _;
              O.ns === D.ns && (O.ns = Object.create(D.ns)), O.ns[M] = _.attribValue;
            }
          _.attribList.push([_.attribName, _.attribValue]);
        } else
          _.tag.attributes[_.attribName] = _.attribValue, N(_, "onattribute", {
            name: _.attribName,
            value: _.attribValue
          });
        _.attribName = _.attribValue = "";
      }
      function V(_, y) {
        if (_.opt.xmlns) {
          var W = _.tag, M = Q(_.tagName);
          W.prefix = M.prefix, W.local = M.local, W.uri = W.ns[M.prefix] || "", W.prefix && !W.uri && (H(_, "Unbound namespace prefix: " + JSON.stringify(_.tagName)), W.uri = M.prefix);
          var O = _.tags[_.tags.length - 1] || _;
          W.ns && O.ns !== W.ns && Object.keys(W.ns).forEach(function(j) {
            N(_, "onopennamespace", {
              prefix: j,
              uri: W.ns[j]
            });
          });
          for (var D = 0, J = _.attribList.length; D < J; D++) {
            var d = _.attribList[D], Y = d[0], x = d[1], i = Q(Y, !0), s = i.prefix, m = i.local, L = s === "" ? "" : W.ns[s] || "", q = {
              name: Y,
              value: x,
              prefix: s,
              local: m,
              uri: L
            };
            s && s !== "xmlns" && !L && (H(_, "Unbound namespace prefix: " + JSON.stringify(s)), q.uri = s), _.tag.attributes[Y] = q, N(_, "onattribute", q);
          }
          _.attribList.length = 0;
        }
        _.tag.isSelfClosing = !!y, _.sawRoot = !0, _.tags.push(_.tag), N(_, "onopentag", _.tag), y || (!_.noscript && _.tagName.toLowerCase() === "script" ? _.state = C.SCRIPT : _.state = C.TEXT, _.tag = null, _.tagName = ""), _.attribName = _.attribValue = "", _.attribList.length = 0;
      }
      function P(_) {
        if (!_.tagName) {
          H(_, "Weird empty close tag."), _.textNode += "</>", _.state = C.TEXT;
          return;
        }
        if (_.script) {
          if (_.tagName !== "script") {
            _.script += "</" + _.tagName + ">", _.tagName = "", _.state = C.SCRIPT;
            return;
          }
          N(_, "onscript", _.script), _.script = "";
        }
        var y = _.tags.length, W = _.tagName;
        _.strict || (W = W[_.looseCase]());
        for (var M = W; y--; ) {
          var O = _.tags[y];
          if (O.name !== M)
            H(_, "Unexpected close tag");
          else
            break;
        }
        if (y < 0) {
          H(_, "Unmatched closing tag: " + _.tagName), _.textNode += "</" + _.tagName + ">", _.state = C.TEXT;
          return;
        }
        _.tagName = W;
        for (var D = _.tags.length; D-- > y; ) {
          var J = _.tag = _.tags.pop();
          _.tagName = _.tag.name, N(_, "onclosetag", _.tagName);
          var d = {};
          for (var Y in J.ns)
            d[Y] = J.ns[Y];
          var x = _.tags[_.tags.length - 1] || _;
          _.opt.xmlns && J.ns !== x.ns && Object.keys(J.ns).forEach(function(i) {
            var s = J.ns[i];
            N(_, "onclosenamespace", { prefix: i, uri: s });
          });
        }
        y === 0 && (_.closedRoot = !0), _.tagName = _.attribValue = _.attribName = "", _.attribList.length = 0, _.state = C.TEXT;
      }
      function X(_) {
        var y = _.entity, W = y.toLowerCase(), M, O = "";
        return _.ENTITIES[y] ? _.ENTITIES[y] : _.ENTITIES[W] ? _.ENTITIES[W] : (y = W, y.charAt(0) === "#" && (y.charAt(1) === "x" ? (y = y.slice(2), M = parseInt(y, 16), O = M.toString(16)) : (y = y.slice(1), M = parseInt(y, 10), O = M.toString(10))), y = y.replace(/^0+/, ""), isNaN(M) || O.toLowerCase() !== y ? (H(_, "Invalid character entity"), "&" + _.entity + ";") : String.fromCodePoint(M));
      }
      function Z(_, y) {
        y === "<" ? (_.state = C.OPEN_WAKA, _.startTagPosition = _.position) : c(y) || (H(_, "Non-whitespace before first tag."), _.textNode = y, _.state = C.TEXT);
      }
      function te(_, y) {
        var W = "";
        return y < _.length && (W = _.charAt(y)), W;
      }
      function G(_) {
        var y = this;
        if (this.error)
          throw this.error;
        if (y.closed)
          return K(
            y,
            "Cannot write after close. Assign an onready handler."
          );
        if (_ === null)
          return ee(y);
        typeof _ == "object" && (_ = _.toString());
        for (var W = 0, M = ""; M = te(_, W++), y.c = M, !!M; )
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
                  M = te(_, W++), M && y.trackPosition && (y.position++, M === `
` ? (y.line++, y.column = 0) : y.column++);
                y.textNode += _.substring(O, W - 1);
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
              (y.sgmlDecl + M).toUpperCase() === k ? (N(y, "onopencdata"), y.state = C.CDATA, y.sgmlDecl = "", y.cdata = "") : y.sgmlDecl + M === "--" ? (y.state = C.COMMENT, y.comment = "", y.sgmlDecl = "") : (y.sgmlDecl + M).toUpperCase() === I ? (y.state = C.DOCTYPE, (y.doctype || y.sawRoot) && H(
                y,
                "Inappropriately located doctype declaration"
              ), y.doctype = "", y.sgmlDecl = "") : M === ">" ? (N(y, "onsgmldeclaration", y.sgmlDecl), y.sgmlDecl = "", y.state = C.TEXT) : (E(M) && (y.state = C.SGML_DECL_QUOTED), y.sgmlDecl += M);
              continue;
            case C.SGML_DECL_QUOTED:
              M === y.q && (y.state = C.SGML_DECL, y.q = ""), y.sgmlDecl += M;
              continue;
            case C.DOCTYPE:
              M === ">" ? (y.state = C.TEXT, N(y, "ondoctype", y.doctype), y.doctype = !0) : (y.doctype += M, M === "[" ? y.state = C.DOCTYPE_DTD : E(M) && (y.state = C.DOCTYPE_QUOTED, y.q = M));
              continue;
            case C.DOCTYPE_QUOTED:
              y.doctype += M, M === y.q && (y.q = "", y.state = C.DOCTYPE);
              continue;
            case C.DOCTYPE_DTD:
              y.doctype += M, M === "]" ? y.state = C.DOCTYPE : E(M) && (y.state = C.DOCTYPE_DTD_QUOTED, y.q = M);
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
              B(u, M) ? y.tagName += M : (ie(y), M === ">" ? V(y) : M === "/" ? y.state = C.OPEN_TAG_SLASH : (c(M) || H(y, "Invalid character in tag name"), y.state = C.ATTRIB));
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
              M === "=" ? y.state = C.ATTRIB_VALUE : M === ">" ? (H(y, "Attribute without value"), y.attribValue = y.attribName, ce(y), V(y)) : c(M) ? y.state = C.ATTRIB_NAME_SAW_WHITE : B(u, M) ? y.attribName += M : H(y, "Invalid attribute name");
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
              E(M) ? (y.q = M, y.state = C.ATTRIB_VALUE_QUOTED) : (H(y, "Unquoted attribute value"), y.state = C.ATTRIB_VALUE_UNQUOTED, y.attribValue = M);
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
                M === ">" ? P(y) : B(u, M) ? y.tagName += M : y.script ? (y.script += "</" + y.tagName, y.tagName = "", y.state = C.SCRIPT) : (c(M) || H(y, "Invalid tagname in closing tag"), y.state = C.CLOSE_TAG_SAW_WHITE);
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
              M === ";" ? (y[d] += X(y), y.entity = "", y.state = J) : B(y.entity.length ? p : w, M) ? y.entity += M : (H(y, "Invalid character in entity name"), y[d] += "&" + y.entity + M, y.entity = "", y.state = J);
              continue;
            default:
              throw new Error(y, "Unknown state: " + y.state);
          }
        return y.position >= y.bufferCheckPosition && o(y), y;
      }
      String.fromCodePoint || (function() {
        var _ = String.fromCharCode, y = Math.floor, W = function() {
          var M = 16384, O = [], D, J, d = -1, Y = arguments.length;
          if (!Y)
            return "";
          for (var x = ""; ++d < Y; ) {
            var i = Number(arguments[d]);
            if (!isFinite(i) || // `NaN`, `+Infinity`, or `-Infinity`
            i < 0 || // not a valid Unicode code point
            i > 1114111 || // not a valid Unicode code point
            y(i) !== i)
              throw RangeError("Invalid code point: " + i);
            i <= 65535 ? O.push(i) : (i -= 65536, D = (i >> 10) + 55296, J = i % 1024 + 56320, O.push(D, J)), (d + 1 === Y || O.length > M) && (x += _.apply(null, O), O.length = 0);
          }
          return x;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: W,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = W;
      })();
    })(t);
  })(vr)), vr;
}
var Ln, hs;
function Oi() {
  return hs || (hs = 1, Ln = {
    isArray: function(t) {
      return Array.isArray ? Array.isArray(t) : Object.prototype.toString.call(t) === "[object Array]";
    }
  }), Ln;
}
var Mn, fs;
function Pi() {
  if (fs) return Mn;
  fs = 1;
  var t = Oi().isArray;
  return Mn = {
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
  }, Mn;
}
var Un, ds;
function _o() {
  if (ds) return Un;
  ds = 1;
  var t = xl(), e = Pi(), r = Oi().isArray, n, o;
  function l(u) {
    return n = e.copyOptions(u), e.ensureFlagExists("ignoreDeclaration", n), e.ensureFlagExists("ignoreInstruction", n), e.ensureFlagExists("ignoreAttributes", n), e.ensureFlagExists("ignoreText", n), e.ensureFlagExists("ignoreComment", n), e.ensureFlagExists("ignoreCdata", n), e.ensureFlagExists("ignoreDoctype", n), e.ensureFlagExists("compact", n), e.ensureFlagExists("alwaysChildren", n), e.ensureFlagExists("addParent", n), e.ensureFlagExists("trim", n), e.ensureFlagExists("nativeType", n), e.ensureFlagExists("nativeTypeAttributes", n), e.ensureFlagExists("sanitize", n), e.ensureFlagExists("instructionHasAttributes", n), e.ensureFlagExists("captureSpacesBetweenElements", n), e.ensureAlwaysArrayExists(n), e.ensureKeyExists("declaration", n), e.ensureKeyExists("instruction", n), e.ensureKeyExists("attributes", n), e.ensureKeyExists("text", n), e.ensureKeyExists("comment", n), e.ensureKeyExists("cdata", n), e.ensureKeyExists("doctype", n), e.ensureKeyExists("type", n), e.ensureKeyExists("name", n), e.ensureKeyExists("elements", n), e.ensureKeyExists("parent", n), e.checkFnExists("doctype", n), e.checkFnExists("instruction", n), e.checkFnExists("cdata", n), e.checkFnExists("comment", n), e.checkFnExists("text", n), e.checkFnExists("instructionName", n), e.checkFnExists("elementName", n), e.checkFnExists("attributeName", n), e.checkFnExists("attributeValue", n), e.checkFnExists("attributes", n), n;
  }
  function f(u) {
    var w = Number(u);
    if (!isNaN(w))
      return w;
    var p = u.toLowerCase();
    return p === "true" ? !0 : p === "false" ? !1 : u;
  }
  function a(u, w) {
    var p;
    if (n.compact) {
      if (!o[n[u + "Key"]] && (r(n.alwaysArray) ? n.alwaysArray.indexOf(n[u + "Key"]) !== -1 : n.alwaysArray) && (o[n[u + "Key"]] = []), o[n[u + "Key"]] && !r(o[n[u + "Key"]]) && (o[n[u + "Key"]] = [o[n[u + "Key"]]]), u + "Fn" in n && typeof w == "string" && (w = n[u + "Fn"](w, o)), u === "instruction" && ("instructionFn" in n || "instructionNameFn" in n)) {
        for (p in w)
          if (w.hasOwnProperty(p))
            if ("instructionFn" in n)
              w[p] = n.instructionFn(w[p], p, o);
            else {
              var c = w[p];
              delete w[p], w[n.instructionNameFn(p, c, o)] = c;
            }
      }
      r(o[n[u + "Key"]]) ? o[n[u + "Key"]].push(w) : o[n[u + "Key"]] = w;
    } else {
      o[n.elementsKey] || (o[n.elementsKey] = []);
      var E = {};
      if (E[n.typeKey] = u, u === "instruction") {
        for (p in w)
          if (w.hasOwnProperty(p))
            break;
        E[n.nameKey] = "instructionNameFn" in n ? n.instructionNameFn(p, w, o) : p, n.instructionHasAttributes ? (E[n.attributesKey] = w[p][n.attributesKey], "instructionFn" in n && (E[n.attributesKey] = n.instructionFn(E[n.attributesKey], p, o))) : ("instructionFn" in n && (w[p] = n.instructionFn(w[p], p, o)), E[n.instructionKey] = w[p]);
      } else
        u + "Fn" in n && (w = n[u + "Fn"](w, o)), E[n[u + "Key"]] = w;
      n.addParent && (E[n.parentKey] = o), o[n.elementsKey].push(E);
    }
  }
  function h(u) {
    if ("attributesFn" in n && u && (u = n.attributesFn(u, o)), (n.trim || "attributeValueFn" in n || "attributeNameFn" in n || n.nativeTypeAttributes) && u) {
      var w;
      for (w in u)
        if (u.hasOwnProperty(w) && (n.trim && (u[w] = u[w].trim()), n.nativeTypeAttributes && (u[w] = f(u[w])), "attributeValueFn" in n && (u[w] = n.attributeValueFn(u[w], w, o)), "attributeNameFn" in n)) {
          var p = u[w];
          delete u[w], u[n.attributeNameFn(w, u[w], o)] = p;
        }
    }
    return u;
  }
  function A(u) {
    var w = {};
    if (u.body && (u.name.toLowerCase() === "xml" || n.instructionHasAttributes)) {
      for (var p = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g, c; (c = p.exec(u.body)) !== null; )
        w[c[1]] = c[2] || c[3] || c[4];
      w = h(w);
    }
    if (u.name.toLowerCase() === "xml") {
      if (n.ignoreDeclaration)
        return;
      o[n.declarationKey] = {}, Object.keys(w).length && (o[n.declarationKey][n.attributesKey] = w), n.addParent && (o[n.declarationKey][n.parentKey] = o);
    } else {
      if (n.ignoreInstruction)
        return;
      n.trim && (u.body = u.body.trim());
      var E = {};
      n.instructionHasAttributes && Object.keys(w).length ? (E[u.name] = {}, E[u.name][n.attributesKey] = w) : E[u.name] = u.body, a("instruction", E);
    }
  }
  function S(u, w) {
    var p;
    if (typeof u == "object" && (w = u.attributes, u = u.name), w = h(w), "elementNameFn" in n && (u = n.elementNameFn(u, o)), n.compact) {
      if (p = {}, !n.ignoreAttributes && w && Object.keys(w).length) {
        p[n.attributesKey] = {};
        var c;
        for (c in w)
          w.hasOwnProperty(c) && (p[n.attributesKey][c] = w[c]);
      }
      !(u in o) && (r(n.alwaysArray) ? n.alwaysArray.indexOf(u) !== -1 : n.alwaysArray) && (o[u] = []), o[u] && !r(o[u]) && (o[u] = [o[u]]), r(o[u]) ? o[u].push(p) : o[u] = p;
    } else
      o[n.elementsKey] || (o[n.elementsKey] = []), p = {}, p[n.typeKey] = "element", p[n.nameKey] = u, !n.ignoreAttributes && w && Object.keys(w).length && (p[n.attributesKey] = w), n.alwaysChildren && (p[n.elementsKey] = []), o[n.elementsKey].push(p);
    p[n.parentKey] = o, o = p;
  }
  function k(u) {
    n.ignoreText || !u.trim() && !n.captureSpacesBetweenElements || (n.trim && (u = u.trim()), n.nativeType && (u = f(u)), n.sanitize && (u = u.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), a("text", u));
  }
  function I(u) {
    n.ignoreComment || (n.trim && (u = u.trim()), a("comment", u));
  }
  function b(u) {
    var w = o[n.parentKey];
    n.addParent || delete o[n.parentKey], o = w;
  }
  function R(u) {
    n.ignoreCdata || (n.trim && (u = u.trim()), a("cdata", u));
  }
  function g(u) {
    n.ignoreDoctype || (u = u.replace(/^ /, ""), n.trim && (u = u.trim()), a("doctype", u));
  }
  function T(u) {
    u.note = u;
  }
  return Un = function(u, w) {
    var p = t.parser(!0, {}), c = {};
    if (o = c, n = l(w), p.opt = { strictEntities: !0 }, p.onopentag = S, p.ontext = k, p.oncomment = I, p.onclosetag = b, p.onerror = T, p.oncdata = R, p.ondoctype = g, p.onprocessinginstruction = A, p.write(u).close(), c[n.elementsKey]) {
      var E = c[n.elementsKey];
      delete c[n.elementsKey], c[n.elementsKey] = E, delete c.text;
    }
    return c;
  }, Un;
}
var jn, ps;
function Tl() {
  if (ps) return jn;
  ps = 1;
  var t = Pi(), e = _o();
  function r(n) {
    var o = t.copyOptions(n);
    return t.ensureSpacesExists(o), o;
  }
  return jn = function(n, o) {
    var l, f, a, h;
    return l = r(o), f = e(n, l), h = "compact" in l && l.compact ? "_parent" : "parent", "addParent" in l && l.addParent ? a = JSON.stringify(f, function(A, S) {
      return A === h ? "_" : S;
    }, l.spaces) : a = JSON.stringify(f, null, l.spaces), a.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }, jn;
}
var zn, ms;
function Eo() {
  if (ms) return zn;
  ms = 1;
  var t = Pi(), e = Oi().isArray, r, n;
  function o(p) {
    var c = t.copyOptions(p);
    return t.ensureFlagExists("ignoreDeclaration", c), t.ensureFlagExists("ignoreInstruction", c), t.ensureFlagExists("ignoreAttributes", c), t.ensureFlagExists("ignoreText", c), t.ensureFlagExists("ignoreComment", c), t.ensureFlagExists("ignoreCdata", c), t.ensureFlagExists("ignoreDoctype", c), t.ensureFlagExists("compact", c), t.ensureFlagExists("indentText", c), t.ensureFlagExists("indentCdata", c), t.ensureFlagExists("indentAttributes", c), t.ensureFlagExists("indentInstruction", c), t.ensureFlagExists("fullTagEmptyElement", c), t.ensureFlagExists("noQuotesForNativeAttributes", c), t.ensureSpacesExists(c), typeof c.spaces == "number" && (c.spaces = Array(c.spaces + 1).join(" ")), t.ensureKeyExists("declaration", c), t.ensureKeyExists("instruction", c), t.ensureKeyExists("attributes", c), t.ensureKeyExists("text", c), t.ensureKeyExists("comment", c), t.ensureKeyExists("cdata", c), t.ensureKeyExists("doctype", c), t.ensureKeyExists("type", c), t.ensureKeyExists("name", c), t.ensureKeyExists("elements", c), t.checkFnExists("doctype", c), t.checkFnExists("instruction", c), t.checkFnExists("cdata", c), t.checkFnExists("comment", c), t.checkFnExists("text", c), t.checkFnExists("instructionName", c), t.checkFnExists("elementName", c), t.checkFnExists("attributeName", c), t.checkFnExists("attributeValue", c), t.checkFnExists("attributes", c), t.checkFnExists("fullTagEmptyElement", c), c;
  }
  function l(p, c, E) {
    return (!E && p.spaces ? `
` : "") + Array(c + 1).join(p.spaces);
  }
  function f(p, c, E) {
    if (c.ignoreAttributes)
      return "";
    "attributesFn" in c && (p = c.attributesFn(p, n, r));
    var F, B, z, C, $ = [];
    for (F in p)
      p.hasOwnProperty(F) && p[F] !== null && p[F] !== void 0 && (C = c.noQuotesForNativeAttributes && typeof p[F] != "string" ? "" : '"', B = "" + p[F], B = B.replace(/"/g, "&quot;"), z = "attributeNameFn" in c ? c.attributeNameFn(F, B, n, r) : F, $.push(c.spaces && c.indentAttributes ? l(c, E + 1, !1) : " "), $.push(z + "=" + C + ("attributeValueFn" in c ? c.attributeValueFn(B, F, n, r) : B) + C));
    return p && Object.keys(p).length && c.spaces && c.indentAttributes && $.push(l(c, E, !1)), $.join("");
  }
  function a(p, c, E) {
    return r = p, n = "xml", c.ignoreDeclaration ? "" : "<?xml" + f(p[c.attributesKey], c, E) + "?>";
  }
  function h(p, c, E) {
    if (c.ignoreInstruction)
      return "";
    var F;
    for (F in p)
      if (p.hasOwnProperty(F))
        break;
    var B = "instructionNameFn" in c ? c.instructionNameFn(F, p[F], n, r) : F;
    if (typeof p[F] == "object")
      return r = p, n = B, "<?" + B + f(p[F][c.attributesKey], c, E) + "?>";
    var z = p[F] ? p[F] : "";
    return "instructionFn" in c && (z = c.instructionFn(z, F, n, r)), "<?" + B + (z ? " " + z : "") + "?>";
  }
  function A(p, c) {
    return c.ignoreComment ? "" : "<!--" + ("commentFn" in c ? c.commentFn(p, n, r) : p) + "-->";
  }
  function S(p, c) {
    return c.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in c ? c.cdataFn(p, n, r) : p.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function k(p, c) {
    return c.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in c ? c.doctypeFn(p, n, r) : p) + ">";
  }
  function I(p, c) {
    return c.ignoreText ? "" : (p = "" + p, p = p.replace(/&amp;/g, "&"), p = p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in c ? c.textFn(p, n, r) : p);
  }
  function b(p, c) {
    var E;
    if (p.elements && p.elements.length)
      for (E = 0; E < p.elements.length; ++E)
        switch (p.elements[E][c.typeKey]) {
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
  function R(p, c, E) {
    r = p, n = p.name;
    var F = [], B = "elementNameFn" in c ? c.elementNameFn(p.name, p) : p.name;
    F.push("<" + B), p[c.attributesKey] && F.push(f(p[c.attributesKey], c, E));
    var z = p[c.elementsKey] && p[c.elementsKey].length || p[c.attributesKey] && p[c.attributesKey]["xml:space"] === "preserve";
    return z || ("fullTagEmptyElementFn" in c ? z = c.fullTagEmptyElementFn(p.name, p) : z = c.fullTagEmptyElement), z ? (F.push(">"), p[c.elementsKey] && p[c.elementsKey].length && (F.push(g(p[c.elementsKey], c, E + 1)), r = p, n = p.name), F.push(c.spaces && b(p, c) ? `
` + Array(E + 1).join(c.spaces) : ""), F.push("</" + B + ">")) : F.push("/>"), F.join("");
  }
  function g(p, c, E, F) {
    return p.reduce(function(B, z) {
      var C = l(c, E, F && !B);
      switch (z.type) {
        case "element":
          return B + C + R(z, c, E);
        case "comment":
          return B + C + A(z[c.commentKey], c);
        case "doctype":
          return B + C + k(z[c.doctypeKey], c);
        case "cdata":
          return B + (c.indentCdata ? C : "") + S(z[c.cdataKey], c);
        case "text":
          return B + (c.indentText ? C : "") + I(z[c.textKey], c);
        case "instruction":
          var $ = {};
          return $[z[c.nameKey]] = z[c.attributesKey] ? z : z[c.instructionKey], B + (c.indentInstruction ? C : "") + h($, c, E);
      }
    }, "");
  }
  function T(p, c, E) {
    var F;
    for (F in p)
      if (p.hasOwnProperty(F))
        switch (F) {
          case c.parentKey:
          case c.attributesKey:
            break;
          // skip to next key
          case c.textKey:
            if (c.indentText || E)
              return !0;
            break;
          // skip to next key
          case c.cdataKey:
            if (c.indentCdata || E)
              return !0;
            break;
          // skip to next key
          case c.instructionKey:
            if (c.indentInstruction || E)
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
  function u(p, c, E, F, B) {
    r = p, n = c;
    var z = "elementNameFn" in E ? E.elementNameFn(c, p) : c;
    if (typeof p > "u" || p === null || p === "")
      return "fullTagEmptyElementFn" in E && E.fullTagEmptyElementFn(c, p) || E.fullTagEmptyElement ? "<" + z + "></" + z + ">" : "<" + z + "/>";
    var C = [];
    if (c) {
      if (C.push("<" + z), typeof p != "object")
        return C.push(">" + I(p, E) + "</" + z + ">"), C.join("");
      p[E.attributesKey] && C.push(f(p[E.attributesKey], E, F));
      var $ = T(p, E, !0) || p[E.attributesKey] && p[E.attributesKey]["xml:space"] === "preserve";
      if ($ || ("fullTagEmptyElementFn" in E ? $ = E.fullTagEmptyElementFn(c, p) : $ = E.fullTagEmptyElement), $)
        C.push(">");
      else
        return C.push("/>"), C.join("");
    }
    return C.push(w(p, E, F + 1, !1)), r = p, n = c, c && C.push((B ? l(E, F, !1) : "") + "</" + z + ">"), C.join("");
  }
  function w(p, c, E, F) {
    var B, z, C, $ = [];
    for (z in p)
      if (p.hasOwnProperty(z))
        for (C = e(p[z]) ? p[z] : [p[z]], B = 0; B < C.length; ++B) {
          switch (z) {
            case c.declarationKey:
              $.push(a(C[B], c, E));
              break;
            case c.instructionKey:
              $.push((c.indentInstruction ? l(c, E, F) : "") + h(C[B], c, E));
              break;
            case c.attributesKey:
            case c.parentKey:
              break;
            // skip
            case c.textKey:
              $.push((c.indentText ? l(c, E, F) : "") + I(C[B], c));
              break;
            case c.cdataKey:
              $.push((c.indentCdata ? l(c, E, F) : "") + S(C[B], c));
              break;
            case c.doctypeKey:
              $.push(l(c, E, F) + k(C[B], c));
              break;
            case c.commentKey:
              $.push(l(c, E, F) + A(C[B], c));
              break;
            default:
              $.push(l(c, E, F) + u(C[B], z, c, E, T(C[B], c)));
          }
          F = F && !$.length;
        }
    return $.join("");
  }
  return zn = function(p, c) {
    c = o(c);
    var E = [];
    return r = p, n = "_root_", c.compact ? E.push(w(p, c, 0, !0)) : (p[c.declarationKey] && E.push(a(p[c.declarationKey], c, 0)), p[c.elementsKey] && p[c.elementsKey].length && E.push(g(p[c.elementsKey], c, 0, !E.length))), E.join("");
  }, zn;
}
var Wn, gs;
function Sl() {
  if (gs) return Wn;
  gs = 1;
  var t = Eo();
  return Wn = function(e, r) {
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
  }, Wn;
}
var Hn, ws;
function Al() {
  if (ws) return Hn;
  ws = 1;
  var t = _o(), e = Tl(), r = Eo(), n = Sl();
  return Hn = {
    xml2js: t,
    xml2json: e,
    js2xml: r,
    json2xml: n
  }, Hn;
}
var xo = Al();
const Fi = (t) => {
  switch (t.type) {
    case void 0:
    case "element":
      const e = new Rl(t.name, t.attributes), r = t.elements || [];
      for (const n of r) {
        const o = Fi(n);
        o !== void 0 && e.push(o);
      }
      return e;
    case "text":
      return t.text;
    default:
      return;
  }
};
class kl extends pe {
  // noop
}
class Rl extends ae {
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
    const r = xo.xml2js(e, { compact: !1 });
    return Fi(r);
  }
  /**
   * Creates an ImportedXmlComponent.
   *
   * @param rootKey - The XML element name
   * @param _attr - Optional attributes for the root element
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e, r) {
    super(e), r && this.root.push(new kl(r));
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
class Il extends ae {
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
class To extends ae {
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
}, fr = (t) => {
  const e = ke(t);
  if (e < 0)
    throw new Error(`Invalid value '${t}' specified. Must be a positive integer.`);
  return e;
}, So = (t, e) => {
  const r = e * 2;
  if (t.length !== r || isNaN(+`0x${t}`))
    throw new Error(`Invalid hex value '${t}'. Expected ${r} digit hex value`);
  return t;
}, ys = (t) => So(t, 1), Di = (t) => {
  const e = t.slice(-2), r = t.substring(0, t.length - 2);
  return `${Number(r)}${e}`;
}, Ao = (t) => {
  const e = Di(t);
  if (parseFloat(e) < 0)
    throw new Error(`Invalid value '${e}' specified. Expected a positive number.`);
  return e;
}, _t = (t) => {
  if (t === "auto")
    return t;
  const e = t.charAt(0) === "#" ? t.substring(1) : t;
  return So(e, 3);
}, $e = (t) => typeof t == "string" ? Di(t) : ke(t), Cl = (t) => typeof t == "string" ? Ao(t) : fr(t), Se = (t) => typeof t == "string" ? Ao(t) : fr(t), Nl = (t) => {
  const e = t.substring(0, t.length - 1);
  return `${Number(e)}%`;
}, ko = (t) => typeof t == "number" ? ke(t) : t.slice(-1) === "%" ? Nl(t) : Di(t), Ol = fr, Pl = fr, Fl = (t) => t.toISOString();
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
class qn extends ae {
  /**
   * Creates an HpsMeasureElement.
   *
   * @param name - The XML element name
   * @param val - The measurement value (number in half-points or string with units)
   */
  constructor(e, r) {
    super(e), this.root.push(new Re({ val: Cl(r) }));
  }
}
class Ro extends ae {
}
class et extends ae {
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
const Rt = (t, e) => new fe({
  name: t,
  attributes: {
    value: { key: "w:val", value: e }
  }
});
class Lt extends ae {
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
class at extends ae {
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
    super(e), r && this.root.push(new Js(r)), n && this.root.push(...n);
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
}, Io = (t) => new fe({
  name: "w:jc",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), be = (t, { color: e, size: r, space: n, style: o }) => new fe({
  name: t,
  attributes: {
    style: { key: "w:val", value: o },
    color: { key: "w:color", value: e === void 0 ? void 0 : _t(e) },
    size: { key: "w:sz", value: r === void 0 ? void 0 : Ol(r) },
    space: { key: "w:space", value: n === void 0 ? void 0 : Pl(n) }
  }
}), Pe = {
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
class Dl extends tt {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(be("w:top", e.top)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.left && this.root.push(be("w:left", e.left)), e.right && this.root.push(be("w:right", e.right)), e.between && this.root.push(be("w:between", e.between));
  }
}
class Bl extends ae {
  constructor() {
    super("w:pBdr");
    const e = be("w:bottom", {
      color: "auto",
      space: 1,
      style: Pe.SINGLE,
      size: 6
    });
    this.root.push(e);
  }
}
const Ll = ({ start: t, end: e, left: r, right: n, hanging: o, firstLine: l }) => new fe({
  name: "w:ind",
  attributes: {
    start: { key: "w:start", value: t === void 0 ? void 0 : $e(t) },
    end: { key: "w:end", value: e === void 0 ? void 0 : $e(e) },
    left: { key: "w:left", value: r === void 0 ? void 0 : $e(r) },
    right: { key: "w:right", value: n === void 0 ? void 0 : $e(n) },
    hanging: { key: "w:hanging", value: o === void 0 ? void 0 : Se(o) },
    firstLine: { key: "w:firstLine", value: l === void 0 ? void 0 : Se(l) }
  }
}), Ml = () => new fe({
  name: "w:br"
}), Bi = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
}, Li = (t, e) => new fe({
  name: "w:fldChar",
  attributes: {
    type: { key: "w:fldCharType", value: t },
    dirty: { key: "w:dirty", value: e }
  }
}), Pt = (t) => Li(Bi.BEGIN, t), Ft = (t) => Li(Bi.SEPARATE, t), Dt = (t) => Li(Bi.END, t), Ul = {
  DECIMAL: "decimal"
}, ct = {
  DEFAULT: "default",
  PRESERVE: "preserve"
};
class ht extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { space: "xml:space" });
  }
}
class jl extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("PAGE");
  }
}
class zl extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("NUMPAGES");
  }
}
class Wl extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}
class Hl extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("SECTION");
  }
}
const dr = ({ fill: t, color: e, type: r }) => new fe({
  name: "w:shd",
  attributes: {
    fill: { key: "w:fill", value: t === void 0 ? void 0 : _t(t) },
    color: { key: "w:color", value: e === void 0 ? void 0 : _t(e) },
    type: { key: "w:val", value: r }
  }
}), Je = {
  /** Clear shading - no pattern, fill color only */
  CLEAR: "clear",
  DIAGONAL_CROSS: "diagCross",
  DIAGONAL_STRIPE: "diagStripe",
  HORIZONTAL_STRIPE: "horzStripe",
  NIL: "nil",
  VERTICAL_STRIPE: "vertStripe"
};
class De extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
}
class ql extends ae {
  constructor(e) {
    super("w:del"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
class Gl extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
const Kl = {
  /** Dot emphasis mark */
  DOT: "dot"
}, Vl = (t = Kl.DOT) => new fe({
  name: "w:em",
  attributes: {
    val: { key: "w:val", value: t }
  }
});
class Xl extends ae {
  constructor(e) {
    super("w:spacing"), this.root.push(
      new Re({
        val: $e(e)
      })
    );
  }
}
class $l extends ae {
  constructor(e) {
    super("w:color"), this.root.push(
      new Re({
        val: _t(e)
      })
    );
  }
}
class Zl extends ae {
  constructor(e) {
    super("w:highlight"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class Yl extends ae {
  constructor(e) {
    super("w:highlightCs"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
const Jl = (t) => new fe({
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
}), Gn = (t, e) => {
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
}, Co = (t) => new fe({
  name: "w:vertAlign",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), Ql = () => Co("superscript"), ec = () => Co("subscript"), No = {
  /** Single underline */
  SINGLE: "single"
}, tc = (t = No.SINGLE, e) => new fe({
  name: "w:u",
  attributes: {
    val: { key: "w:val", value: t },
    color: { key: "w:color", value: e === void 0 ? void 0 : _t(e) }
  }
});
class dt extends tt {
  constructor(e) {
    var r, n;
    if (super("w:rPr"), !e)
      return;
    e.style && this.push(new et("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(Gn(e.font)) : "name" in e.font ? this.push(Gn(e.font.name, e.font.hint)) : this.push(Gn(e.font))), e.bold !== void 0 && this.push(new ue("w:b", e.bold)), (e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) && this.push(new ue("w:bCs", (r = e.boldComplexScript) != null ? r : e.bold)), e.italics !== void 0 && this.push(new ue("w:i", e.italics)), (e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) && this.push(new ue("w:iCs", (n = e.italicsComplexScript) != null ? n : e.italics)), e.smallCaps !== void 0 ? this.push(new ue("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new ue("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new ue("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new ue("w:dstrike", e.doubleStrike)), e.emboss !== void 0 && this.push(new ue("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new ue("w:imprint", e.imprint)), e.noProof !== void 0 && this.push(new ue("w:noProof", e.noProof)), e.snapToGrid !== void 0 && this.push(new ue("w:snapToGrid", e.snapToGrid)), e.vanish && this.push(new ue("w:vanish", e.vanish)), e.color && this.push(new $l(e.color)), e.characterSpacing && this.push(new Xl(e.characterSpacing)), e.scale !== void 0 && this.push(new Lt("w:w", e.scale)), e.kern && this.push(new qn("w:kern", e.kern)), e.position && this.push(new et("w:position", e.position)), e.size !== void 0 && this.push(new qn("w:sz", e.size));
    const o = e.sizeComplexScript === void 0 || e.sizeComplexScript === !0 ? e.size : e.sizeComplexScript;
    o && this.push(new qn("w:szCs", o)), e.highlight && this.push(new Zl(e.highlight));
    const l = e.highlightComplexScript === void 0 || e.highlightComplexScript === !0 ? e.highlight : e.highlightComplexScript;
    l && this.push(new Yl(l)), e.underline && this.push(tc(e.underline.type, e.underline.color)), e.effect && this.push(new et("w:effect", e.effect)), e.border && this.push(be("w:bdr", e.border)), e.shading && this.push(dr(e.shading)), e.subScript && this.push(ec()), e.superScript && this.push(Ql()), e.rightToLeft !== void 0 && this.push(new ue("w:rtl", e.rightToLeft)), e.emphasisMark && this.push(Vl(e.emphasisMark.type)), e.language && this.push(Jl(e.language)), e.specVanish && this.push(new ue("w:specVanish", e.vanish)), e.math && this.push(new ue("w:oMath", e.math)), e.revision && this.push(new nc(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
}
class rc extends dt {
  constructor(e) {
    super(e), e?.insertion && this.push(new Gl(e.insertion)), e?.deletion && this.push(new ql(e.deletion));
  }
}
class nc extends ae {
  constructor(e) {
    super("w:rPrChange"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.addChildElement(new dt(e));
  }
}
class or extends ae {
  constructor(e) {
    var r;
    super("w:t"), typeof e == "string" ? (this.root.push(new ht({ space: ct.PRESERVE })), this.root.push(e)) : (this.root.push(new ht({ space: (r = e.space) != null ? r : ct.DEFAULT })), this.root.push(e.text));
  }
}
const Qe = {
  /** Inserts the current page number */
  CURRENT: "CURRENT",
  /** Inserts the total number of pages in the document */
  TOTAL_PAGES: "TOTAL_PAGES",
  /** Inserts the total number of pages in the current section */
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  /** Inserts the current section number */
  CURRENT_SECTION: "SECTION"
};
class He extends ae {
  constructor(e) {
    if (super("w:r"), re(this, "properties"), this.properties = new dt(e), this.root.push(this.properties), e.break)
      for (let r = 0; r < e.break; r++)
        this.root.push(Ml());
    if (e.children)
      for (const r of e.children) {
        if (typeof r == "string") {
          switch (r) {
            case Qe.CURRENT:
              this.root.push(Pt()), this.root.push(new jl()), this.root.push(Ft()), this.root.push(Dt());
              break;
            case Qe.TOTAL_PAGES:
              this.root.push(Pt()), this.root.push(new zl()), this.root.push(Ft()), this.root.push(Dt());
              break;
            case Qe.TOTAL_PAGES_IN_SECTION:
              this.root.push(Pt()), this.root.push(new Wl()), this.root.push(Ft()), this.root.push(Dt());
              break;
            case Qe.CURRENT_SECTION:
              this.root.push(Pt()), this.root.push(new Hl()), this.root.push(Ft()), this.root.push(Dt());
              break;
            default:
              this.root.push(new or(r));
              break;
          }
          continue;
        }
        this.root.push(r);
      }
    else e.text !== void 0 && this.root.push(new or(e.text));
  }
}
class Ce extends He {
  constructor(e) {
    super(typeof e == "string" ? { text: e } : e);
  }
}
var Kn = {}, ye = {}, Vn, vs;
function jt() {
  if (vs) return Vn;
  vs = 1, Vn = t;
  function t(e, r) {
    if (!e)
      throw new Error(r || "Assertion failed");
  }
  return t.equal = function(r, n, o) {
    if (r != n)
      throw new Error(o || "Assertion failed: " + r + " != " + n);
  }, Vn;
}
var bs;
function qe() {
  if (bs) return ye;
  bs = 1;
  var t = jt(), e = rt();
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
  function o(N) {
    for (var U = "", v = 0; v < N.length; v++)
      U += a(N[v].toString(16));
    return U;
  }
  ye.toHex = o;
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
  function A(N, U, v, K) {
    var ee = v - U;
    t(ee % 4 === 0);
    for (var H = new Array(ee / 4), ie = 0, Q = U; ie < H.length; ie++, Q += 4) {
      var ce;
      K === "big" ? ce = N[Q] << 24 | N[Q + 1] << 16 | N[Q + 2] << 8 | N[Q + 3] : ce = N[Q + 3] << 24 | N[Q + 2] << 16 | N[Q + 1] << 8 | N[Q], H[ie] = ce >>> 0;
    }
    return H;
  }
  ye.join32 = A;
  function S(N, U) {
    for (var v = new Array(N.length * 4), K = 0, ee = 0; K < N.length; K++, ee += 4) {
      var H = N[K];
      U === "big" ? (v[ee] = H >>> 24, v[ee + 1] = H >>> 16 & 255, v[ee + 2] = H >>> 8 & 255, v[ee + 3] = H & 255) : (v[ee + 3] = H >>> 24, v[ee + 2] = H >>> 16 & 255, v[ee + 1] = H >>> 8 & 255, v[ee] = H & 255);
    }
    return v;
  }
  ye.split32 = S;
  function k(N, U) {
    return N >>> U | N << 32 - U;
  }
  ye.rotr32 = k;
  function I(N, U) {
    return N << U | N >>> 32 - U;
  }
  ye.rotl32 = I;
  function b(N, U) {
    return N + U >>> 0;
  }
  ye.sum32 = b;
  function R(N, U, v) {
    return N + U + v >>> 0;
  }
  ye.sum32_3 = R;
  function g(N, U, v, K) {
    return N + U + v + K >>> 0;
  }
  ye.sum32_4 = g;
  function T(N, U, v, K, ee) {
    return N + U + v + K + ee >>> 0;
  }
  ye.sum32_5 = T;
  function u(N, U, v, K) {
    var ee = N[U], H = N[U + 1], ie = K + H >>> 0, Q = (ie < K ? 1 : 0) + v + ee;
    N[U] = Q >>> 0, N[U + 1] = ie;
  }
  ye.sum64 = u;
  function w(N, U, v, K) {
    var ee = U + K >>> 0, H = (ee < U ? 1 : 0) + N + v;
    return H >>> 0;
  }
  ye.sum64_hi = w;
  function p(N, U, v, K) {
    var ee = U + K;
    return ee >>> 0;
  }
  ye.sum64_lo = p;
  function c(N, U, v, K, ee, H, ie, Q) {
    var ce = 0, V = U;
    V = V + K >>> 0, ce += V < U ? 1 : 0, V = V + H >>> 0, ce += V < H ? 1 : 0, V = V + Q >>> 0, ce += V < Q ? 1 : 0;
    var P = N + v + ee + ie + ce;
    return P >>> 0;
  }
  ye.sum64_4_hi = c;
  function E(N, U, v, K, ee, H, ie, Q) {
    var ce = U + K + H + Q;
    return ce >>> 0;
  }
  ye.sum64_4_lo = E;
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
var Xn = {}, _s;
function zt() {
  if (_s) return Xn;
  _s = 1;
  var t = qe(), e = jt();
  function r() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  return Xn.BlockHash = r, r.prototype.update = function(o, l) {
    if (o = t.toArray(o, l), this.pending ? this.pending = this.pending.concat(o) : this.pending = o, this.pendingTotal += o.length, this.pending.length >= this._delta8) {
      o = this.pending;
      var f = o.length % this._delta8;
      this.pending = o.slice(o.length - f, o.length), this.pending.length === 0 && (this.pending = null), o = t.join32(o, 0, o.length - f, this.endian);
      for (var a = 0; a < o.length; a += this._delta32)
        this._update(o, a, a + this._delta32);
    }
    return this;
  }, r.prototype.digest = function(o) {
    return this.update(this._pad()), e(this.pending === null), this._digest(o);
  }, r.prototype._pad = function() {
    var o = this.pendingTotal, l = this._delta8, f = l - (o + this.padLength) % l, a = new Array(f + this.padLength);
    a[0] = 128;
    for (var h = 1; h < f; h++)
      a[h] = 0;
    if (o <<= 3, this.endian === "big") {
      for (var A = 8; A < this.padLength; A++)
        a[h++] = 0;
      a[h++] = 0, a[h++] = 0, a[h++] = 0, a[h++] = 0, a[h++] = o >>> 24 & 255, a[h++] = o >>> 16 & 255, a[h++] = o >>> 8 & 255, a[h++] = o & 255;
    } else
      for (a[h++] = o & 255, a[h++] = o >>> 8 & 255, a[h++] = o >>> 16 & 255, a[h++] = o >>> 24 & 255, a[h++] = 0, a[h++] = 0, a[h++] = 0, a[h++] = 0, A = 8; A < this.padLength; A++)
        a[h++] = 0;
    return a;
  }, Xn;
}
var st = {}, Me = {}, Es;
function Oo() {
  if (Es) return Me;
  Es = 1;
  var t = qe(), e = t.rotr32;
  function r(S, k, I, b) {
    if (S === 0)
      return n(k, I, b);
    if (S === 1 || S === 3)
      return l(k, I, b);
    if (S === 2)
      return o(k, I, b);
  }
  Me.ft_1 = r;
  function n(S, k, I) {
    return S & k ^ ~S & I;
  }
  Me.ch32 = n;
  function o(S, k, I) {
    return S & k ^ S & I ^ k & I;
  }
  Me.maj32 = o;
  function l(S, k, I) {
    return S ^ k ^ I;
  }
  Me.p32 = l;
  function f(S) {
    return e(S, 2) ^ e(S, 13) ^ e(S, 22);
  }
  Me.s0_256 = f;
  function a(S) {
    return e(S, 6) ^ e(S, 11) ^ e(S, 25);
  }
  Me.s1_256 = a;
  function h(S) {
    return e(S, 7) ^ e(S, 18) ^ S >>> 3;
  }
  Me.g0_256 = h;
  function A(S) {
    return e(S, 17) ^ e(S, 19) ^ S >>> 10;
  }
  return Me.g1_256 = A, Me;
}
var $n, xs;
function ic() {
  if (xs) return $n;
  xs = 1;
  var t = qe(), e = zt(), r = Oo(), n = t.rotl32, o = t.sum32, l = t.sum32_5, f = r.ft_1, a = e.BlockHash, h = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function A() {
    if (!(this instanceof A))
      return new A();
    a.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  return t.inherits(A, a), $n = A, A.blockSize = 512, A.outSize = 160, A.hmacStrength = 80, A.padLength = 64, A.prototype._update = function(k, I) {
    for (var b = this.W, R = 0; R < 16; R++)
      b[R] = k[I + R];
    for (; R < b.length; R++)
      b[R] = n(b[R - 3] ^ b[R - 8] ^ b[R - 14] ^ b[R - 16], 1);
    var g = this.h[0], T = this.h[1], u = this.h[2], w = this.h[3], p = this.h[4];
    for (R = 0; R < b.length; R++) {
      var c = ~~(R / 20), E = l(n(g, 5), f(c, T, u, w), p, b[R], h[c]);
      p = w, w = u, u = n(T, 30), T = g, g = E;
    }
    this.h[0] = o(this.h[0], g), this.h[1] = o(this.h[1], T), this.h[2] = o(this.h[2], u), this.h[3] = o(this.h[3], w), this.h[4] = o(this.h[4], p);
  }, A.prototype._digest = function(k) {
    return k === "hex" ? t.toHex32(this.h, "big") : t.split32(this.h, "big");
  }, $n;
}
var Zn, Ts;
function Po() {
  if (Ts) return Zn;
  Ts = 1;
  var t = qe(), e = zt(), r = Oo(), n = jt(), o = t.sum32, l = t.sum32_4, f = t.sum32_5, a = r.ch32, h = r.maj32, A = r.s0_256, S = r.s1_256, k = r.g0_256, I = r.g1_256, b = e.BlockHash, R = [
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
  function g() {
    if (!(this instanceof g))
      return new g();
    b.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = R, this.W = new Array(64);
  }
  return t.inherits(g, b), Zn = g, g.blockSize = 512, g.outSize = 256, g.hmacStrength = 192, g.padLength = 64, g.prototype._update = function(u, w) {
    for (var p = this.W, c = 0; c < 16; c++)
      p[c] = u[w + c];
    for (; c < p.length; c++)
      p[c] = l(I(p[c - 2]), p[c - 7], k(p[c - 15]), p[c - 16]);
    var E = this.h[0], F = this.h[1], B = this.h[2], z = this.h[3], C = this.h[4], $ = this.h[5], le = this.h[6], N = this.h[7];
    for (n(this.k.length === p.length), c = 0; c < p.length; c++) {
      var U = f(N, S(C), a(C, $, le), this.k[c], p[c]), v = o(A(E), h(E, F, B));
      N = le, le = $, $ = C, C = o(z, U), z = B, B = F, F = E, E = o(U, v);
    }
    this.h[0] = o(this.h[0], E), this.h[1] = o(this.h[1], F), this.h[2] = o(this.h[2], B), this.h[3] = o(this.h[3], z), this.h[4] = o(this.h[4], C), this.h[5] = o(this.h[5], $), this.h[6] = o(this.h[6], le), this.h[7] = o(this.h[7], N);
  }, g.prototype._digest = function(u) {
    return u === "hex" ? t.toHex32(this.h, "big") : t.split32(this.h, "big");
  }, Zn;
}
var Yn, Ss;
function ac() {
  if (Ss) return Yn;
  Ss = 1;
  var t = qe(), e = Po();
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
  return t.inherits(r, e), Yn = r, r.blockSize = 512, r.outSize = 224, r.hmacStrength = 192, r.padLength = 64, r.prototype._digest = function(o) {
    return o === "hex" ? t.toHex32(this.h.slice(0, 7), "big") : t.split32(this.h.slice(0, 7), "big");
  }, Yn;
}
var Jn, As;
function Fo() {
  if (As) return Jn;
  As = 1;
  var t = qe(), e = zt(), r = jt(), n = t.rotr64_hi, o = t.rotr64_lo, l = t.shr64_hi, f = t.shr64_lo, a = t.sum64, h = t.sum64_hi, A = t.sum64_lo, S = t.sum64_4_hi, k = t.sum64_4_lo, I = t.sum64_5_hi, b = t.sum64_5_lo, R = e.BlockHash, g = [
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
    R.call(this), this.h = [
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
    ], this.k = g, this.W = new Array(160);
  }
  t.inherits(T, R), Jn = T, T.blockSize = 1024, T.outSize = 512, T.hmacStrength = 192, T.padLength = 128, T.prototype._prepareBlock = function(v, K) {
    for (var ee = this.W, H = 0; H < 32; H++)
      ee[H] = v[K + H];
    for (; H < ee.length; H += 2) {
      var ie = le(ee[H - 4], ee[H - 3]), Q = N(ee[H - 4], ee[H - 3]), ce = ee[H - 14], V = ee[H - 13], P = C(ee[H - 30], ee[H - 29]), X = $(ee[H - 30], ee[H - 29]), Z = ee[H - 32], te = ee[H - 31];
      ee[H] = S(
        ie,
        Q,
        ce,
        V,
        P,
        X,
        Z,
        te
      ), ee[H + 1] = k(
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
    var ee = this.W, H = this.h[0], ie = this.h[1], Q = this.h[2], ce = this.h[3], V = this.h[4], P = this.h[5], X = this.h[6], Z = this.h[7], te = this.h[8], G = this.h[9], _ = this.h[10], y = this.h[11], W = this.h[12], M = this.h[13], O = this.h[14], D = this.h[15];
    r(this.k.length === ee.length);
    for (var J = 0; J < ee.length; J += 2) {
      var d = O, Y = D, x = B(te, G), i = z(te, G), s = u(te, G, _, y, W), m = w(te, G, _, y, W, M), L = this.k[J], q = this.k[J + 1], j = ee[J], ne = ee[J + 1], oe = I(
        d,
        Y,
        x,
        i,
        s,
        m,
        L,
        q,
        j,
        ne
      ), se = b(
        d,
        Y,
        x,
        i,
        s,
        m,
        L,
        q,
        j,
        ne
      );
      d = E(H, ie), Y = F(H, ie), x = p(H, ie, Q, ce, V), i = c(H, ie, Q, ce, V, P);
      var he = h(d, Y, x, i), de = A(d, Y, x, i);
      O = W, D = M, W = _, M = y, _ = te, y = G, te = h(X, Z, oe, se), G = A(Z, Z, oe, se), X = V, Z = P, V = Q, P = ce, Q = H, ce = ie, H = h(oe, se, he, de), ie = A(oe, se, he, de);
    }
    a(this.h, 0, H, ie), a(this.h, 2, Q, ce), a(this.h, 4, V, P), a(this.h, 6, X, Z), a(this.h, 8, te, G), a(this.h, 10, _, y), a(this.h, 12, W, M), a(this.h, 14, O, D);
  }, T.prototype._digest = function(v) {
    return v === "hex" ? t.toHex32(this.h, "big") : t.split32(this.h, "big");
  };
  function u(U, v, K, ee, H) {
    var ie = U & K ^ ~U & H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function w(U, v, K, ee, H, ie) {
    var Q = v & ee ^ ~v & ie;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function p(U, v, K, ee, H) {
    var ie = U & K ^ U & H ^ K & H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function c(U, v, K, ee, H, ie) {
    var Q = v & ee ^ v & ie ^ ee & ie;
    return Q < 0 && (Q += 4294967296), Q;
  }
  function E(U, v) {
    var K = n(U, v, 28), ee = n(v, U, 2), H = n(v, U, 7), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function F(U, v) {
    var K = o(U, v, 28), ee = o(v, U, 2), H = o(v, U, 7), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function B(U, v) {
    var K = n(U, v, 14), ee = n(U, v, 18), H = n(v, U, 9), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function z(U, v) {
    var K = o(U, v, 14), ee = o(U, v, 18), H = o(v, U, 9), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function C(U, v) {
    var K = n(U, v, 1), ee = n(U, v, 8), H = l(U, v, 7), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function $(U, v) {
    var K = o(U, v, 1), ee = o(U, v, 8), H = f(U, v, 7), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function le(U, v) {
    var K = n(U, v, 19), ee = n(v, U, 29), H = l(U, v, 6), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  function N(U, v) {
    var K = o(U, v, 19), ee = o(v, U, 29), H = f(U, v, 6), ie = K ^ ee ^ H;
    return ie < 0 && (ie += 4294967296), ie;
  }
  return Jn;
}
var Qn, ks;
function sc() {
  if (ks) return Qn;
  ks = 1;
  var t = qe(), e = Fo();
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
  return t.inherits(r, e), Qn = r, r.blockSize = 1024, r.outSize = 384, r.hmacStrength = 192, r.padLength = 128, r.prototype._digest = function(o) {
    return o === "hex" ? t.toHex32(this.h.slice(0, 12), "big") : t.split32(this.h.slice(0, 12), "big");
  }, Qn;
}
var Rs;
function oc() {
  return Rs || (Rs = 1, st.sha1 = ic(), st.sha224 = ac(), st.sha256 = Po(), st.sha384 = sc(), st.sha512 = Fo()), st;
}
var ei = {}, Is;
function uc() {
  if (Is) return ei;
  Is = 1;
  var t = qe(), e = zt(), r = t.rotl32, n = t.sum32, o = t.sum32_3, l = t.sum32_4, f = e.BlockHash;
  function a() {
    if (!(this instanceof a))
      return new a();
    f.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
  }
  t.inherits(a, f), ei.ripemd160 = a, a.blockSize = 512, a.outSize = 160, a.hmacStrength = 192, a.padLength = 64, a.prototype._update = function(T, u) {
    for (var w = this.h[0], p = this.h[1], c = this.h[2], E = this.h[3], F = this.h[4], B = w, z = p, C = c, $ = E, le = F, N = 0; N < 80; N++) {
      var U = n(
        r(
          l(w, h(N, p, c, E), T[k[N] + u], A(N)),
          b[N]
        ),
        F
      );
      w = F, F = E, E = r(c, 10), c = p, p = U, U = n(
        r(
          l(B, h(79 - N, z, C, $), T[I[N] + u], S(N)),
          R[N]
        ),
        le
      ), B = le, le = $, $ = r(C, 10), C = z, z = U;
    }
    U = o(this.h[1], c, $), this.h[1] = o(this.h[2], E, le), this.h[2] = o(this.h[3], F, B), this.h[3] = o(this.h[4], w, z), this.h[4] = o(this.h[0], p, C), this.h[0] = U;
  }, a.prototype._digest = function(T) {
    return T === "hex" ? t.toHex32(this.h, "little") : t.split32(this.h, "little");
  };
  function h(g, T, u, w) {
    return g <= 15 ? T ^ u ^ w : g <= 31 ? T & u | ~T & w : g <= 47 ? (T | ~u) ^ w : g <= 63 ? T & w | u & ~w : T ^ (u | ~w);
  }
  function A(g) {
    return g <= 15 ? 0 : g <= 31 ? 1518500249 : g <= 47 ? 1859775393 : g <= 63 ? 2400959708 : 2840853838;
  }
  function S(g) {
    return g <= 15 ? 1352829926 : g <= 31 ? 1548603684 : g <= 47 ? 1836072691 : g <= 63 ? 2053994217 : 0;
  }
  var k = [
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
  ], b = [
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
  ], R = [
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
  return ei;
}
var ti, Cs;
function lc() {
  if (Cs) return ti;
  Cs = 1;
  var t = qe(), e = jt();
  function r(n, o, l) {
    if (!(this instanceof r))
      return new r(n, o, l);
    this.Hash = n, this.blockSize = n.blockSize / 8, this.outSize = n.outSize / 8, this.inner = null, this.outer = null, this._init(t.toArray(o, l));
  }
  return ti = r, r.prototype._init = function(o) {
    o.length > this.blockSize && (o = new this.Hash().update(o).digest()), e(o.length <= this.blockSize);
    for (var l = o.length; l < this.blockSize; l++)
      o.push(0);
    for (l = 0; l < o.length; l++)
      o[l] ^= 54;
    for (this.inner = new this.Hash().update(o), l = 0; l < o.length; l++)
      o[l] ^= 106;
    this.outer = new this.Hash().update(o);
  }, r.prototype.update = function(o, l) {
    return this.inner.update(o, l), this;
  }, r.prototype.digest = function(o) {
    return this.outer.update(this.inner.digest()), this.outer.digest(o);
  }, ti;
}
var Ns;
function cc() {
  return Ns || (Ns = 1, (function(t) {
    var e = t;
    e.utils = qe(), e.common = zt(), e.sha = oc(), e.ripemd = uc(), e.hmac = lc(), e.sha1 = e.sha.sha1, e.sha256 = e.sha.sha256, e.sha224 = e.sha.sha224, e.sha384 = e.sha.sha384, e.sha512 = e.sha.sha512, e.ripemd160 = e.ripemd.ripemd160;
  })(Kn)), Kn;
}
var hc = cc();
const fc = /* @__PURE__ */ Ti(hc);
let dc = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", pc = (t, e = 21) => (r = e) => {
  let n = "", o = r | 0;
  for (; o--; )
    n += t[Math.random() * t.length | 0];
  return n;
}, mc = (t = 21) => {
  let e = "", r = t | 0;
  for (; r--; )
    e += dc[Math.random() * 64 | 0];
  return e;
};
const Be = (t) => Math.floor(t * 72 * 20), pr = (t = 0) => {
  let e = t;
  return () => ++e;
}, gc = () => pr(), wc = () => pr(1), yc = () => pr(), vc = () => pr(), Do = () => mc().toLowerCase(), Os = (t) => fc.sha1().update(t instanceof ArrayBuffer ? new Uint8Array(t) : t).digest("hex"), It = (t) => pc("1234567890abcdef", t)(), bc = () => `${It(8)}-${It(4)}-${It(4)}-${It(4)}-${It(12)}`, ri = (t) => new Uint8Array(new TextEncoder().encode(t)), _c = {
  /**
   * ## Page Edge
   *
   * Specifies that the horizontal positioning shall be relative to the edge of the page.
   */
  PAGE: "page"
}, Ec = {
  /**
   * ## Page Edge
   *
   * Specifies that the vertical positioning shall be relative to the edge of the page.
   */
  PAGE: "page"
}, xc = () => new fe({
  name: "wp:simplePos",
  // NOTE: It's not fully supported in Microsoft Word, but this element is needed anyway
  attributes: {
    x: { key: "x", value: 0 },
    y: { key: "y", value: 0 }
  }
}), Bo = (t) => new fe({
  name: "wp:align",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: [t]
}), Lo = (t) => new fe({
  name: "wp:posOffset",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: [t.toString()]
}), Tc = ({ relative: t, align: e, offset: r }) => new fe({
  name: "wp:positionH",
  attributes: {
    relativeFrom: { key: "relativeFrom", value: t ?? _c.PAGE }
  },
  children: [
    (() => {
      if (e)
        return Bo(e);
      if (r !== void 0)
        return Lo(r);
      throw new Error("There is no configuration provided for floating position (Align or offset)");
    })()
  ]
}), Sc = ({ relative: t, align: e, offset: r }) => new fe({
  name: "wp:positionV",
  attributes: {
    relativeFrom: { key: "relativeFrom", value: t ?? Ec.PAGE }
  },
  children: [
    (() => {
      if (e)
        return Bo(e);
      if (r !== void 0)
        return Lo(r);
      throw new Error("There is no configuration provided for floating position (Align or offset)");
    })()
  ]
}), Ac = (t = {}) => {
  var e, r, n, o;
  return new fe({
    name: "wps:bodyPr",
    attributes: {
      lIns: { key: "lIns", value: (e = t.margins) == null ? void 0 : e.left },
      rIns: { key: "rIns", value: (r = t.margins) == null ? void 0 : r.right },
      tIns: { key: "tIns", value: (n = t.margins) == null ? void 0 : n.top },
      bIns: { key: "bIns", value: (o = t.margins) == null ? void 0 : o.bottom },
      anchor: { key: "anchor", value: t.verticalAnchor }
    },
    children: [...t.noAutoFit ? [new ue("a:noAutofit", t.noAutoFit)] : []]
  });
}, kc = (t = { txBox: "1" }) => new fe({
  name: "wps:cNvSpPr",
  attributes: {
    txBox: { key: "txBox", value: t.txBox }
  }
}), Rc = (t) => new fe({
  name: "w:txbxContent",
  children: [...t]
}), Ic = (t) => new fe({
  name: "wps:txbx",
  children: [Rc(t)]
});
class Cc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
}
class Nc extends ae {
  constructor(e, r) {
    super("a:ext"), re(this, "attributes"), this.attributes = new Cc({
      cx: e,
      cy: r
    }), this.root.push(this.attributes);
  }
}
class Oc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
}
class Pc extends ae {
  constructor(e, r) {
    super("a:off"), this.root.push(
      new Oc({
        x: e ?? 0,
        y: r ?? 0
      })
    );
  }
}
class Fc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
}
class Mo extends ae {
  constructor(e) {
    var r, n, o, l, f, a;
    super("a:xfrm"), re(this, "extents"), re(this, "offset"), this.root.push(
      new Fc({
        flipVertical: (r = e.flip) == null ? void 0 : r.vertical,
        flipHorizontal: (n = e.flip) == null ? void 0 : n.horizontal,
        rotation: e.rotation
      })
    ), this.offset = new Pc((l = (o = e.offset) == null ? void 0 : o.emus) == null ? void 0 : l.x, (a = (f = e.offset) == null ? void 0 : f.emus) == null ? void 0 : a.y), this.extents = new Nc(e.emus.x, e.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}
const Uo = () => new fe({ name: "a:noFill" }), Dc = (t) => new fe({
  name: "a:srgbClr",
  attributes: {
    value: {
      key: "val",
      value: t.value
    }
  }
}), Bc = (t) => new fe({
  name: "a:schemeClr",
  attributes: {
    value: {
      key: "val",
      value: t.value
    }
  }
}), _i = (t) => new fe({
  name: "a:solidFill",
  children: [t.type === "rgb" ? Dc(t) : Bc(t)]
}), Lc = (t) => new fe({
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
    t.type === "noFill" ? Uo() : t.solidFillType === "rgb" ? _i({
      type: "rgb",
      value: t.value
    }) : _i({
      type: "scheme",
      value: t.value
    })
  ]
});
class Mc extends ae {
  constructor() {
    super("a:avLst");
  }
}
class Uc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      prst: "prst"
    });
  }
}
class jc extends ae {
  constructor() {
    super("a:prstGeom"), this.root.push(
      new Uc({
        prst: "rect"
      })
    ), this.root.push(new Mc());
  }
}
class zc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      bwMode: "bwMode"
    });
  }
}
class jo extends ae {
  constructor({
    element: e,
    outline: r,
    solidFill: n,
    transform: o
  }) {
    super(`${e}:spPr`), re(this, "form"), this.root.push(
      new zc({
        bwMode: "auto"
      })
    ), this.form = new Mo(o), this.root.push(this.form), this.root.push(new jc()), r && (this.root.push(Uo()), this.root.push(Lc(r))), n && this.root.push(_i(n));
  }
}
const Ps = (t) => new fe({
  name: "wps:wsp",
  children: [
    kc(t.nonVisualProperties),
    new jo({
      element: "wps",
      transform: t.transformation,
      outline: t.outline,
      solidFill: t.solidFill
    }),
    Ic(t.children),
    Ac(t.bodyProperties)
  ]
});
class ni extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      uri: "uri"
    });
  }
}
const Wc = (t) => new fe({
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
}), Hc = (t) => new fe({
  name: "a:ext",
  attributes: {
    uri: {
      key: "uri",
      value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
    }
  },
  children: [Wc(t)]
}), qc = (t) => new fe({
  name: "a:extLst",
  children: [Hc(t)]
}), Gc = (t) => new fe({
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
  children: t.type === "svg" ? [qc(t)] : []
});
class Kc extends ae {
  constructor() {
    super("a:srcRect");
  }
}
class Vc extends ae {
  constructor() {
    super("a:fillRect");
  }
}
class Xc extends ae {
  constructor() {
    super("a:stretch"), this.root.push(new Vc());
  }
}
class $c extends ae {
  constructor(e) {
    super("pic:blipFill"), this.root.push(Gc(e)), this.root.push(new Kc()), this.root.push(new Xc());
  }
}
class Zc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
}
class Yc extends ae {
  constructor() {
    super("a:picLocks"), this.root.push(
      new Zc({
        noChangeAspect: 1,
        noChangeArrowheads: 1
      })
    );
  }
}
class Jc extends ae {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new Yc());
  }
}
const zo = (t, e) => new fe({
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
class Qc extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
}
class eh extends ae {
  constructor() {
    super("pic:cNvPr"), this.root.push(
      new Qc({
        id: 0,
        name: "",
        descr: ""
      })
    );
  }
  prepForXml(e) {
    for (let r = e.stack.length - 1; r >= 0; r--) {
      const n = e.stack[r];
      if (n instanceof mr) {
        this.root.push(zo(n.linkId, !1));
        break;
      }
    }
    return super.prepForXml(e);
  }
}
class th extends ae {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new eh()), this.root.push(new Jc());
  }
}
class rh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns:pic"
    });
  }
}
class Fs extends ae {
  constructor({
    mediaData: e,
    transform: r,
    outline: n
  }) {
    super("pic:pic"), this.root.push(
      new rh({
        xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture"
      })
    ), this.root.push(new th()), this.root.push(new $c(e)), this.root.push(new jo({ element: "pic", transform: r, outline: n }));
  }
}
const nh = (t) => new fe({
  name: "wpg:grpSpPr",
  children: [new Mo(t)]
}), ih = () => new fe({
  name: "wpg:cNvGrpSpPr"
}), ah = (t) => new fe({
  name: "wpg:wgp",
  children: [ih(), nh(t.transformation), ...t.children]
});
class sh extends ae {
  // private readonly pic: Pic;
  constructor({
    mediaData: e,
    transform: r,
    outline: n,
    solidFill: o
  }) {
    if (super("a:graphicData"), e.type === "wps") {
      this.root.push(
        new ni({
          uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
        })
      );
      const l = Ps(Ae(me({}, e.data), { transformation: r, outline: n, solidFill: o }));
      this.root.push(l);
    } else if (e.type === "wpg") {
      this.root.push(
        new ni({
          uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
        })
      );
      const f = e.children.map((h) => h.type === "wps" ? Ps(Ae(me({}, h.data), {
        transformation: h.transformation,
        outline: h.outline,
        solidFill: h.solidFill
      })) : new Fs({ mediaData: h, transform: h.transformation, outline: h.outline })), a = ah({ children: f, transformation: r });
      this.root.push(a);
    } else {
      this.root.push(
        new ni({
          uri: "http://schemas.openxmlformats.org/drawingml/2006/picture"
        })
      );
      const l = e, f = new Fs({ mediaData: l, transform: r, outline: n });
      this.root.push(f);
    }
  }
}
class oh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      a: "xmlns:a"
    });
  }
}
class Wo extends ae {
  constructor({
    mediaData: e,
    transform: r,
    outline: n,
    solidFill: o
  }) {
    super("a:graphic"), re(this, "data"), this.root.push(
      new oh({
        a: "http://schemas.openxmlformats.org/drawingml/2006/main"
      })
    ), this.data = new sh({ mediaData: e, transform: r, outline: n, solidFill: o }), this.root.push(this.data);
  }
}
const Zt = {
  NONE: 0,
  SQUARE: 1,
  TIGHT: 2,
  TOP_AND_BOTTOM: 3
}, uh = {
  /** Text wraps on both sides of the drawing */
  BOTH_SIDES: "bothSides"
}, Ds = () => new fe({
  name: "wp:wrapNone"
}), lh = (t, e = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new fe({
  name: "wp:wrapSquare",
  attributes: {
    wrapText: { key: "wrapText", value: t.side || uh.BOTH_SIDES },
    distT: { key: "distT", value: e.top },
    distB: { key: "distB", value: e.bottom },
    distL: { key: "distL", value: e.left },
    distR: { key: "distR", value: e.right }
  }
}), ch = (t = {
  top: 0,
  bottom: 0
}) => new fe({
  name: "wp:wrapTight",
  attributes: {
    distT: { key: "distT", value: t.top },
    distB: { key: "distB", value: t.bottom }
  }
}), hh = (t = {
  top: 0,
  bottom: 0
}) => new fe({
  name: "wp:wrapTopAndBottom",
  attributes: {
    distT: { key: "distT", value: t.top },
    distB: { key: "distB", value: t.bottom }
  }
});
class Ho extends ae {
  constructor({ name: e, description: r, title: n, id: o } = { name: "", description: "", title: "" }) {
    super("wp:docPr"), re(this, "docPropertiesUniqueNumericId", yc());
    const l = {
      id: {
        key: "id",
        value: o ?? this.docPropertiesUniqueNumericId()
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
    }), this.root.push(new Js(l));
  }
  prepForXml(e) {
    for (let r = e.stack.length - 1; r >= 0; r--) {
      const n = e.stack[r];
      if (n instanceof mr) {
        this.root.push(zo(n.linkId, !0));
        break;
      }
    }
    return super.prepForXml(e);
  }
}
const qo = ({ top: t, right: e, bottom: r, left: n }) => new fe({
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
}), Go = ({ x: t, y: e }) => new fe({
  name: "wp:extent",
  attributes: {
    x: { key: "cx", value: t },
    y: { key: "cy", value: e }
  }
});
class fh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
}
class dh extends ae {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(
      new fh({
        xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
        noChangeAspect: 1
      })
    );
  }
}
const Ko = () => new fe({
  name: "wp:cNvGraphicFramePr",
  children: [new dh()]
});
class ph extends pe {
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
class mh extends ae {
  constructor({
    mediaData: e,
    transform: r,
    drawingOptions: n
  }) {
    super("wp:anchor");
    const o = me({
      allowOverlap: !0,
      behindDocument: !1,
      lockAnchor: !1,
      layoutInCell: !0,
      verticalPosition: {},
      horizontalPosition: {}
    }, n.floating);
    if (this.root.push(
      new ph({
        distT: o.margins && o.margins.top || 0,
        distB: o.margins && o.margins.bottom || 0,
        distL: o.margins && o.margins.left || 0,
        distR: o.margins && o.margins.right || 0,
        simplePos: "0",
        // note: word doesn't fully support - so we use 0
        allowOverlap: o.allowOverlap === !0 ? "1" : "0",
        behindDoc: o.behindDocument === !0 ? "1" : "0",
        locked: o.lockAnchor === !0 ? "1" : "0",
        layoutInCell: o.layoutInCell === !0 ? "1" : "0",
        relativeHeight: o.zIndex ? o.zIndex : r.emus.y
      })
    ), this.root.push(xc()), this.root.push(Tc(o.horizontalPosition)), this.root.push(Sc(o.verticalPosition)), this.root.push(Go({ x: r.emus.x, y: r.emus.y })), this.root.push(qo({ top: 0, right: 0, bottom: 0, left: 0 })), n.floating !== void 0 && n.floating.wrap !== void 0)
      switch (n.floating.wrap.type) {
        case Zt.SQUARE:
          this.root.push(lh(n.floating.wrap, n.floating.margins));
          break;
        case Zt.TIGHT:
          this.root.push(ch(n.floating.margins));
          break;
        case Zt.TOP_AND_BOTTOM:
          this.root.push(hh(n.floating.margins));
          break;
        case Zt.NONE:
        default:
          this.root.push(Ds());
      }
    else
      this.root.push(Ds());
    this.root.push(new Ho(n.docProperties)), this.root.push(Ko()), this.root.push(new Wo({ mediaData: e, transform: r, outline: n.outline, solidFill: n.solidFill }));
  }
}
const gh = ({ mediaData: t, transform: e, docProperties: r, outline: n, solidFill: o }) => {
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
      Go({ x: e.emus.x, y: e.emus.y }),
      qo(
        n ? {
          top: ((l = n.width) != null ? l : 9525) * 2,
          right: ((f = n.width) != null ? f : 9525) * 2,
          bottom: ((a = n.width) != null ? a : 9525) * 2,
          left: ((h = n.width) != null ? h : 9525) * 2
        } : { top: 0, right: 0, bottom: 0, left: 0 }
      ),
      new Ho(r),
      Ko(),
      new Wo({ mediaData: t, transform: e, outline: n, solidFill: o })
    ]
  });
};
class wh extends ae {
  constructor(e, r = {}) {
    super("w:drawing"), r.floating ? this.root.push(new mh({ mediaData: e, transform: e.transformation, drawingOptions: r })) : this.root.push(
      gh({
        mediaData: e,
        transform: e.transformation,
        docProperties: r.docProperties,
        outline: r.outline,
        solidFill: r.solidFill
      })
    );
  }
}
const yh = (t) => {
  const e = ";base64,", r = t.indexOf(e), n = r === -1 ? 0 : r + e.length;
  return new Uint8Array(
    atob(t.substring(n)).split("").map((o) => o.charCodeAt(0))
  );
}, vh = (t) => typeof t == "string" ? yh(t) : t, ii = (t, e) => ({
  data: vh(t.data),
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
class bh extends He {
  constructor(e) {
    super({}), re(this, "imageData");
    const n = `${Os(e.data)}.${e.type}`;
    this.imageData = e.type === "svg" ? Ae(me({
      type: e.type
    }, ii(e, n)), {
      fallback: me({
        type: e.fallback.type
      }, ii(
        Ae(me({}, e.fallback), {
          transformation: e.transformation
        }),
        `${Os(e.fallback.data)}.${e.fallback.type}`
      ))
    }) : me({
      type: e.type
    }, ii(e, n));
    const o = new wh(this.imageData, {
      floating: e.floating,
      docProperties: e.altText,
      outline: e.outline
    });
    this.root.push(o);
  }
  prepForXml(e) {
    return e.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && e.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(e);
  }
}
class _h extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns"
    });
  }
}
const Eh = {
  /** Target is external to the package (e.g., hyperlink to a URL) */
  EXTERNAL: "External"
}, xh = (t, e, r, n) => new fe({
  name: "Relationship",
  attributes: {
    id: { key: "Id", value: t },
    type: { key: "Type", value: e },
    target: { key: "Target", value: r },
    targetMode: { key: "TargetMode", value: n }
  }
});
class nt extends ae {
  constructor() {
    super("Relationships"), this.root.push(
      new _h({
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
  addRelationship(e, r, n, o) {
    this.root.push(xh(`rId${e}`, r, n, o));
  }
  /**
   * Gets the count of relationships in this collection.
   * Excludes the attributes element from the count.
   */
  get RelationshipCount() {
    return this.root.length - 1;
  }
}
class Th extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { id: "w:id", initials: "w:initials", author: "w:author", date: "w:date" });
  }
}
class Sh extends pe {
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
class Ah extends ae {
  constructor({ id: e, initials: r, author: n, date: o = /* @__PURE__ */ new Date(), children: l }) {
    super("w:comment"), this.root.push(
      new Th({
        id: e,
        initials: r,
        author: n,
        date: o.toISOString()
      })
    );
    for (const f of l)
      this.root.push(f);
  }
}
class kh extends ae {
  constructor({ children: e }) {
    super("w:comments"), re(this, "relationships"), this.root.push(
      new Sh({
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
      this.root.push(new Ah(r));
    this.relationships = new nt();
  }
  get Relationships() {
    return this.relationships;
  }
}
class Rh extends Ro {
  constructor() {
    super("w:endnoteRef");
  }
}
class Vo extends Ro {
  constructor() {
    super("w:tab");
  }
}
const nr = {
  /** Left-aligned tab */
  LEFT: "left",
  /** Center-aligned tab */
  CENTER: "center",
  /** Right-aligned tab */
  RIGHT: "right"
}, Ei = {
  /** Position relative to margin */
  MARGIN: "margin",
  /** Position relative to indent */
  INDENT: "indent"
}, ut = {
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
class Ih extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      alignment: "w:alignment",
      relativeTo: "w:relativeTo",
      leader: "w:leader"
    });
  }
}
class Ch extends ae {
  constructor(e) {
    super("w:ptab"), this.root.push(
      new Ih({
        alignment: e.alignment,
        relativeTo: e.relativeTo,
        leader: e.leader
      })
    );
  }
}
class Nh extends ae {
  constructor() {
    super("w:pageBreakBefore");
  }
}
const Et = {
  /** Line spacing is automatically determined based on content */
  AUTO: "auto"
}, Oh = ({ after: t, before: e, line: r, lineRule: n, beforeAutoSpacing: o, afterAutoSpacing: l }) => new fe({
  name: "w:spacing",
  attributes: {
    after: { key: "w:after", value: t },
    before: { key: "w:before", value: e },
    line: { key: "w:line", value: r },
    lineRule: { key: "w:lineRule", value: n },
    beforeAutoSpacing: { key: "w:beforeAutospacing", value: o },
    afterAutoSpacing: { key: "w:afterAutospacing", value: l }
  }
}), pt = {
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
}, Yt = (t) => new fe({
  name: "w:pStyle",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), Oe = {
  /** Left-aligned tab stop */
  LEFT: "left",
  /** Right-aligned tab stop */
  RIGHT: "right",
  /** Center-aligned tab stop */
  CENTER: "center",
  /** Bar tab stop - inserts a vertical bar at the position */
  BAR: "bar",
  /** Clears a tab stop at the specified position */
  CLEAR: "clear",
  /** Decimal-aligned tab stop - aligns on decimal point */
  DECIMAL: "decimal",
  /** End-aligned tab stop (right-to-left equivalent) */
  END: "end",
  /** List tab stop for numbered lists */
  NUM: "num",
  /** Start-aligned tab stop (left-to-right equivalent) */
  START: "start"
}, Ct = {
  /** Dot leader (....) */
  DOT: "dot",
  /** Hyphen leader (----) */
  HYPHEN: "hyphen",
  /** Middle dot leader (····) */
  MIDDLE_DOT: "middleDot",
  /** No leader */
  NONE: "none",
  /** Underscore leader (____) */
  UNDERSCORE: "underscore"
}, Ph = ({ type: t, position: e, leader: r }) => new fe({
  name: "w:tab",
  attributes: {
    val: { key: "w:val", value: t },
    pos: { key: "w:pos", value: e },
    leader: { key: "w:leader", value: r }
  }
}), Fh = (t) => new fe({
  name: "w:tabs",
  children: t.map((e) => Ph(e))
});
class ai extends ae {
  constructor(e, r) {
    super("w:numPr"), this.root.push(new Dh(r)), this.root.push(new Bh(e));
  }
}
class Dh extends ae {
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
class Bh extends ae {
  constructor(e) {
    super("w:numId"), this.root.push(
      new Re({
        val: typeof e == "string" ? `{${e}}` : e
      })
    );
  }
}
class Mi extends ae {
  constructor() {
    super(...arguments), re(this, "fileChild", /* @__PURE__ */ Symbol());
  }
}
class Lh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}
class mr extends ae {
  constructor(e, r, n) {
    super("w:hyperlink"), re(this, "linkId"), this.linkId = r;
    const o = {
      history: 1,
      anchor: n || void 0,
      id: n ? void 0 : `rId${this.linkId}`
    }, l = new Lh(o);
    this.root.push(l), e.forEach((f) => {
      this.root.push(f);
    });
  }
}
class Xo extends mr {
  constructor(e) {
    super(e.children, Do(), e.anchor);
  }
}
class $o extends ae {
  constructor(e) {
    super("w:externalHyperlink"), this.options = e;
  }
}
class Mh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
}
class Uh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "w:id"
    });
  }
}
class Zo {
  constructor(e) {
    re(this, "bookmarkUniqueNumericId", vc()), re(this, "start"), re(this, "children"), re(this, "end");
    const r = this.bookmarkUniqueNumericId();
    this.start = new jh(e.id, r), this.children = e.children, this.end = new zh(r);
  }
}
class jh extends ae {
  constructor(e, r) {
    super("w:bookmarkStart");
    const n = new Mh({
      name: e,
      id: r
    });
    this.root.push(n);
  }
}
class zh extends ae {
  constructor(e) {
    super("w:bookmarkEnd");
    const r = new Uh({
      id: e
    });
    this.root.push(r);
  }
}
const Wh = (t) => new fe({
  name: "w:outlineLvl",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), Jt = ({ id: t, fontKey: e, subsetted: r }, n) => new fe({
  name: n,
  attributes: me({
    id: { key: "r:id", value: t }
  }, e ? { fontKey: { key: "w:fontKey", value: `{${e}}` } } : {}),
  children: [...r ? [new ue("w:subsetted", r)] : []]
}), Hh = ({
  name: t,
  altName: e,
  panose1: r,
  charset: n,
  family: o,
  notTrueType: l,
  pitch: f,
  sig: a,
  embedRegular: h,
  embedBold: A,
  embedItalic: S,
  embedBoldItalic: k
}) => new fe({
  name: "w:font",
  attributes: {
    name: { key: "w:name", value: t }
  },
  children: [
    // http://www.datypic.com/sc/ooxml/e-w_altName-1.html
    ...e ? [Rt("w:altName", e)] : [],
    // http://www.datypic.com/sc/ooxml/e-w_panose1-1.html
    ...r ? [Rt("w:panose1", r)] : [],
    // http://www.datypic.com/sc/ooxml/e-w_charset-1.html
    ...n ? [Rt("w:charset", n)] : [],
    Rt("w:family", o),
    // http://www.datypic.com/sc/ooxml/e-w_notTrueType-1.html
    ...l ? [new ue("w:notTrueType", l)] : [],
    Rt("w:pitch", f),
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
    ...h ? [Jt(h, "w:embedRegular")] : [],
    // http://www.datypic.com/sc/ooxml/e-w_embedBold-1.html
    ...A ? [Jt(A, "w:embedBold")] : [],
    // http://www.datypic.com/sc/ooxml/e-w_embedItalic-1.html
    ...S ? [Jt(S, "w:embedItalic")] : [],
    // http://www.datypic.com/sc/ooxml/e-w_embedBoldItalic-1.html
    ...k ? [Jt(k, "w:embedBoldItalic")] : []
  ]
}), qh = ({
  name: t,
  index: e,
  fontKey: r,
  characterSet: n
}) => Hh({
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
}), Gh = (t) => (
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
      (e, r) => qh({
        name: e.name,
        index: r + 1,
        fontKey: e.fontKey,
        characterSet: e.characterSet
      })
    )
  })
);
class Yo {
  constructor(e) {
    re(this, "fontTable"), re(this, "relationships"), re(this, "fontOptionsWithKey", []), this.options = e, this.fontOptionsWithKey = e.map((r) => Ae(me({}, r), { fontKey: bc() })), this.fontTable = Gh(this.fontOptionsWithKey), this.relationships = new nt();
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
const Kh = () => new fe({
  name: "w:wordWrap",
  attributes: {
    val: { key: "w:val", value: 0 }
  }
}), Vh = (t) => {
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
class ft extends tt {
  constructor(e) {
    var r, n;
    if (super("w:pPr", e?.includeIfEmpty), re(this, "numberingReferences", []), !e)
      return this;
    e.heading && this.push(Yt(e.heading)), e.bullet && this.push(Yt("ListParagraph")), e.numbering && !e.style && !e.heading && (e.numbering.custom || this.push(Yt("ListParagraph"))), e.style && this.push(Yt(e.style)), e.keepNext !== void 0 && this.push(new ue("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new ue("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new Nh()), e.frame && this.push(Vh(e.frame)), e.widowControl !== void 0 && this.push(new ue("w:widowControl", e.widowControl)), e.bullet && this.push(new ai(1, e.bullet.level)), e.numbering ? (this.numberingReferences.push({
      reference: e.numbering.reference,
      instance: (r = e.numbering.instance) != null ? r : 0
    }), this.push(new ai(`${e.numbering.reference}-${(n = e.numbering.instance) != null ? n : 0}`, e.numbering.level))) : e.numbering === !1 && this.push(new ai(0, 0)), e.border && this.push(new Dl(e.border)), e.thematicBreak && this.push(new Bl()), e.shading && this.push(dr(e.shading)), e.wordWrap && this.push(Kh()), e.overflowPunctuation && this.push(new ue("w:overflowPunct", e.overflowPunctuation));
    const o = [
      ...e.rightTabStop !== void 0 ? [{ type: Oe.RIGHT, position: e.rightTabStop }] : [],
      ...e.tabStops ? e.tabStops : [],
      ...e.leftTabStop !== void 0 ? [{ type: Oe.LEFT, position: e.leftTabStop }] : []
    ];
    o.length > 0 && this.push(Fh(o)), e.bidirectional !== void 0 && this.push(new ue("w:bidi", e.bidirectional)), e.spacing && this.push(Oh(e.spacing)), e.indent && this.push(Ll(e.indent)), e.contextualSpacing !== void 0 && this.push(new ue("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(Io(e.alignment)), e.outlineLevel !== void 0 && this.push(Wh(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new ue("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new ue("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new rc(e.run)), e.revision && this.push(new Xh(e.revision));
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
    if (!(e.viewWrapper instanceof Yo))
      for (const r of this.numberingReferences)
        e.file.Numbering.createConcreteNumberingInstance(r.reference, r.instance);
    return super.prepForXml(e);
  }
}
class Xh extends ae {
  constructor(e) {
    super("w:pPrChange"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.root.push(new ft(Ae(me({}, e), { includeIfEmpty: !0 })));
  }
}
class xe extends Mi {
  constructor(e) {
    if (super("w:p"), re(this, "properties"), typeof e == "string")
      return this.properties = new ft({}), this.root.push(this.properties), this.root.push(new Ce(e)), this;
    if (this.properties = new ft(e), this.root.push(this.properties), e.text && this.root.push(new Ce(e.text)), e.children)
      for (const r of e.children) {
        if (r instanceof Zo) {
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
      if (r instanceof $o) {
        const n = this.root.indexOf(r), o = new mr(r.options.children, Do());
        e.viewWrapper.Relationships.addRelationship(
          o.linkId,
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
          r.options.link,
          Eh.EXTERNAL
        ), this.root[n] = o;
      }
    return super.prepForXml(e);
  }
  addRunToFront(e) {
    return this.root.splice(1, 0, e), this;
  }
}
const $h = (t) => new fe({
  name: "w:gridCol",
  attributes: t !== void 0 ? {
    width: { key: "w:w", value: Se(t) }
  } : void 0
});
class Jo extends ae {
  constructor(e, r) {
    super("w:tblGrid");
    for (const n of e)
      this.root.push($h(n));
    r && this.root.push(new Yh(r));
  }
}
class Zh extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { id: "w:id" });
  }
}
class Yh extends ae {
  constructor(e) {
    super("w:tblGridChange"), this.root.push(
      new Zh({
        id: e.id
      })
    ), this.root.push(new Jo(e.columnWidths));
  }
}
class Jh extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
class Qh extends ae {
  constructor(e) {
    super("w:del"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
class ef extends ae {
  constructor(e) {
    super("w:cellIns"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
class tf extends ae {
  constructor(e) {
    super("w:cellDel"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    );
  }
}
class rf extends pe {
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
class nf extends ae {
  constructor(e) {
    super("w:cellMerge"), this.root.push(new rf(e));
  }
}
const af = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
}, sf = Ae(me({}, af), {
  BOTH: "both"
}), Bt = sf, Qo = (t) => new fe({
  name: "w:vAlign",
  attributes: {
    verticalAlign: { key: "w:val", value: t }
  }
}), eu = ({
  marginUnitType: t = ze.DXA,
  top: e,
  left: r,
  bottom: n,
  right: o
}) => [
  { name: "w:top", size: e },
  { name: "w:left", size: r },
  { name: "w:bottom", size: n },
  { name: "w:right", size: o }
].filter((l) => l.size !== void 0).map(({ name: l, size: f }) => ur(l, { type: t, size: f })), of = (t) => {
  const e = eu(t);
  if (e.length !== 0)
    return new fe({
      name: "w:tblCellMar",
      children: e
    });
}, uf = (t) => {
  const e = eu(t);
  if (e.length !== 0)
    return new fe({
      name: "w:tcMar",
      children: e
    });
}, ze = {
  /** Auto. */
  AUTO: "auto",
  /** Value is in twentieths of a point */
  DXA: "dxa",
  /** No (empty) value. */
  NIL: "nil",
  /** Value is in percentage. */
  PERCENTAGE: "pct"
}, ur = (t, { type: e = ze.AUTO, size: r }) => {
  let n = r;
  return e === ze.PERCENTAGE && typeof r == "number" && (n = `${r}%`), new fe({
    name: t,
    attributes: {
      type: { key: "w:type", value: e },
      size: { key: "w:w", value: ko(n) }
    }
  });
};
class lf extends tt {
  constructor(e) {
    super("w:tcBorders"), e.top && this.root.push(be("w:top", e.top)), e.start && this.root.push(be("w:start", e.start)), e.left && this.root.push(be("w:left", e.left)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.end && this.root.push(be("w:end", e.end)), e.right && this.root.push(be("w:right", e.right));
  }
}
class cf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class hf extends ae {
  constructor(e) {
    super("w:gridSpan"), this.root.push(
      new cf({
        val: ke(e)
      })
    );
  }
}
const tu = {
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
class ff extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class Bs extends ae {
  constructor(e) {
    super("w:vMerge"), this.root.push(
      new ff({
        val: e
      })
    );
  }
}
class df extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class pf extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(
      new df({
        val: e
      })
    );
  }
}
class ru extends tt {
  constructor(e) {
    if (super("w:tcPr", e.includeIfEmpty), e.width && this.root.push(ur("w:tcW", e.width)), e.columnSpan && this.root.push(new hf(e.columnSpan)), e.verticalMerge ? this.root.push(new Bs(e.verticalMerge)) : e.rowSpan && e.rowSpan > 1 && this.root.push(new Bs(tu.RESTART)), e.borders && this.root.push(new lf(e.borders)), e.shading && this.root.push(dr(e.shading)), e.margins) {
      const r = uf(e.margins);
      r && this.root.push(r);
    }
    e.textDirection && this.root.push(new pf(e.textDirection)), e.verticalAlign && this.root.push(Qo(e.verticalAlign)), e.insertion && this.root.push(new ef(e.insertion)), e.deletion && this.root.push(new tf(e.deletion)), e.revision && this.root.push(new mf(e.revision)), e.cellMerge && this.root.push(new nf(e.cellMerge));
  }
}
class mf extends ae {
  constructor(e) {
    super("w:tcPrChange"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.root.push(new ru(Ae(me({}, e), { includeIfEmpty: !0 })));
  }
}
class Ui extends ae {
  constructor(e) {
    super("w:tc"), this.options = e, this.root.push(new ru(e));
    for (const r of e.children)
      this.root.push(r);
  }
  prepForXml(e) {
    return this.root[this.root.length - 1] instanceof xe || this.root.push(new xe({})), super.prepForXml(e);
  }
}
const mt = {
  style: Pe.NONE,
  size: 0,
  color: "auto"
}, gt = {
  style: Pe.SINGLE,
  size: 4,
  color: "auto"
};
class nu extends ae {
  constructor(e) {
    var r, n, o, l, f, a;
    super("w:tblBorders"), this.root.push(be("w:top", (r = e.top) != null ? r : gt)), this.root.push(be("w:left", (n = e.left) != null ? n : gt)), this.root.push(be("w:bottom", (o = e.bottom) != null ? o : gt)), this.root.push(be("w:right", (l = e.right) != null ? l : gt)), this.root.push(be("w:insideH", (f = e.insideHorizontal) != null ? f : gt)), this.root.push(be("w:insideV", (a = e.insideVertical) != null ? a : gt));
  }
}
re(nu, "NONE", {
  top: mt,
  bottom: mt,
  left: mt,
  right: mt,
  insideHorizontal: mt,
  insideVertical: mt
});
const gf = (t) => new fe({
  name: "w:tblOverlap",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), wf = ({
  horizontalAnchor: t,
  verticalAnchor: e,
  absoluteHorizontalPosition: r,
  relativeHorizontalPosition: n,
  absoluteVerticalPosition: o,
  relativeVerticalPosition: l,
  bottomFromText: f,
  topFromText: a,
  leftFromText: h,
  rightFromText: A,
  overlap: S
}) => new fe({
  name: "w:tblpPr",
  attributes: {
    leftFromText: {
      key: "w:leftFromText",
      value: h === void 0 ? void 0 : Se(h)
    },
    rightFromText: {
      key: "w:rightFromText",
      value: A === void 0 ? void 0 : Se(A)
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
      value: r === void 0 ? void 0 : $e(r)
    },
    absoluteVerticalPosition: {
      key: "w:tblpY",
      value: o === void 0 ? void 0 : $e(o)
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
  children: S ? [gf(S)] : void 0
}), si = {
  /** Auto-fit layout - column widths are adjusted based on content */
  AUTOFIT: "autofit",
  /** Fixed layout - column widths are fixed as specified */
  FIXED: "fixed"
}, yf = (t) => new fe({
  name: "w:tblLayout",
  attributes: {
    type: { key: "w:type", value: t }
  }
}), vf = {
  /** Value is in twentieths of a point */
  DXA: "dxa"
}, iu = ({ type: t = vf.DXA, value: e }) => new fe({
  name: "w:tblCellSpacing",
  attributes: {
    type: { key: "w:type", value: t },
    value: { key: "w:w", value: ko(e) }
  }
}), bf = ({ firstRow: t, lastRow: e, firstColumn: r, lastColumn: n, noHBand: o, noVBand: l }) => new fe({
  name: "w:tblLook",
  attributes: {
    firstRow: { key: "w:firstRow", value: t },
    lastRow: { key: "w:lastRow", value: e },
    firstColumn: { key: "w:firstColumn", value: r },
    lastColumn: { key: "w:lastColumn", value: n },
    noHBand: { key: "w:noHBand", value: o },
    noVBand: { key: "w:noVBand", value: l }
  }
});
class au extends tt {
  constructor(e) {
    if (super("w:tblPr", e.includeIfEmpty), e.style && this.root.push(new et("w:tblStyle", e.style)), e.float && this.root.push(wf(e.float)), e.visuallyRightToLeft !== void 0 && this.root.push(new ue("w:bidiVisual", e.visuallyRightToLeft)), e.width && this.root.push(ur("w:tblW", e.width)), e.alignment && this.root.push(Io(e.alignment)), e.indent && this.root.push(ur("w:tblInd", e.indent)), e.borders && this.root.push(new nu(e.borders)), e.shading && this.root.push(dr(e.shading)), e.layout && this.root.push(yf(e.layout)), e.cellMargin) {
      const r = of(e.cellMargin);
      r && this.root.push(r);
    }
    e.tableLook && this.root.push(bf(e.tableLook)), e.cellSpacing && this.root.push(iu(e.cellSpacing)), e.revision && this.root.push(new _f(e.revision));
  }
}
class _f extends ae {
  constructor(e) {
    super("w:tblPrChange"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.root.push(new au(Ae(me({}, e), { includeIfEmpty: !0 })));
  }
}
class Ef extends Mi {
  constructor({
    rows: e,
    width: r,
    // eslint-disable-next-line functional/immutable-data
    columnWidths: n = Array(Math.max(...e.map((T) => T.CellCount))).fill(100),
    columnWidthsRevision: o,
    margins: l,
    indent: f,
    float: a,
    layout: h,
    style: A,
    borders: S,
    alignment: k,
    visuallyRightToLeft: I,
    tableLook: b,
    cellSpacing: R,
    revision: g
  }) {
    super("w:tbl"), this.root.push(
      new au({
        borders: S ?? {},
        width: r ?? { size: 100 },
        indent: f,
        float: a,
        layout: h,
        style: A,
        alignment: k,
        cellMargin: l,
        visuallyRightToLeft: I,
        tableLook: b,
        cellSpacing: R,
        revision: g
      })
    ), this.root.push(new Jo(n, o));
    for (const T of e)
      this.root.push(T);
    e.forEach((T, u) => {
      if (u === e.length - 1)
        return;
      let w = 0;
      T.cells.forEach((p) => {
        if (p.options.rowSpan && p.options.rowSpan > 1) {
          const c = new Ui({
            // the inserted CONTINUE cell has rowSpan, and will be handled when process the next row
            rowSpan: p.options.rowSpan - 1,
            columnSpan: p.options.columnSpan,
            borders: p.options.borders,
            children: [],
            verticalMerge: tu.CONTINUE
          });
          e[u + 1].addCellToColumnIndex(c, w);
        }
        w += p.options.columnSpan || 1;
      });
    });
  }
}
const xf = (t, e) => new fe({
  name: "w:trHeight",
  attributes: {
    value: { key: "w:val", value: Se(t) },
    rule: { key: "w:hRule", value: e }
  }
});
class su extends tt {
  constructor(e) {
    super("w:trPr", e.includeIfEmpty), e.cantSplit !== void 0 && this.root.push(new ue("w:cantSplit", e.cantSplit)), e.tableHeader !== void 0 && this.root.push(new ue("w:tblHeader", e.tableHeader)), e.height && this.root.push(xf(e.height.value, e.height.rule)), e.cellSpacing && this.root.push(iu(e.cellSpacing)), e.insertion && this.root.push(new Jh(e.insertion)), e.deletion && this.root.push(new Qh(e.deletion)), e.revision && this.root.push(new Tf(e.revision));
  }
}
class Tf extends ae {
  constructor(e) {
    super("w:trPrChange"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.root.push(new su(Ae(me({}, e), { includeIfEmpty: !0 })));
  }
}
class Sf extends ae {
  constructor(e) {
    super("w:tr"), this.options = e, this.root.push(new su(e));
    for (const r of e.children)
      this.root.push(r);
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((e) => e instanceof Ui);
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
      const o = this.root[n];
      r += o.options.columnSpan || 1;
    }
    return r;
  }
  columnIndexToRootIndex(e, r = !1) {
    if (e < 0)
      throw new Error("cell 'columnIndex' should not less than zero");
    let n = 0, o = 1;
    for (; n <= e; ) {
      if (o >= this.root.length) {
        if (r)
          return this.root.length;
        throw new Error(`cell 'columnIndex' should not great than ${n - 1}`);
      }
      const l = this.root[o];
      o += 1, n += l && l.options.columnSpan || 1;
    }
    return o - 1;
  }
}
class Af extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}
class kf extends ae {
  constructor() {
    super("Properties"), this.root.push(
      new Af({
        xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
        vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
      })
    );
  }
}
class Rf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns"
    });
  }
}
const Ke = (t, e) => new fe({
  name: "Default",
  attributes: {
    contentType: { key: "ContentType", value: t },
    extension: { key: "Extension", value: e }
  }
}), Ne = (t, e) => new fe({
  name: "Override",
  attributes: {
    contentType: { key: "ContentType", value: t },
    partName: { key: "PartName", value: e }
  }
});
class If extends ae {
  constructor() {
    super("Types"), this.root.push(
      new Rf({
        xmlns: "http://schemas.openxmlformats.org/package/2006/content-types"
      })
    ), this.root.push(Ke("image/png", "png")), this.root.push(Ke("image/jpeg", "jpeg")), this.root.push(Ke("image/jpeg", "jpg")), this.root.push(Ke("image/bmp", "bmp")), this.root.push(Ke("image/gif", "gif")), this.root.push(Ke("image/svg+xml", "svg")), this.root.push(Ke("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(Ke("application/xml", "xml")), this.root.push(Ke("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(
      Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")
    ), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(Ne("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(
      Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")
    ), this.root.push(
      Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")
    ), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml")), this.root.push(
      Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml")
    );
  }
  /**
   * Registers a footer part in the content types.
   *
   * @param index - Footer index number (e.g., 1 for footer1.xml)
   */
  addFooter(e) {
    this.root.push(
      Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${e}.xml`)
    );
  }
  /**
   * Registers a header part in the content types.
   *
   * @param index - Header index number (e.g., 1 for header1.xml)
   */
  addHeader(e) {
    this.root.push(
      Ne("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${e}.xml`)
    );
  }
}
const Ls = {
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
class gr extends pe {
  constructor(e, r) {
    super(me({ Ignorable: r }, Object.fromEntries(e.map((n) => [n, Ls[n]])))), re(this, "xmlKeys", me({
      Ignorable: "mc:Ignorable"
    }, Object.fromEntries(Object.keys(Ls).map((n) => [n, `xmlns:${n}`]))));
  }
}
class Cf extends ae {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new gr(["cp", "dc", "dcterms", "dcmitype", "xsi"])), e.title && this.root.push(new at("dc:title", e.title)), e.subject && this.root.push(new at("dc:subject", e.subject)), e.creator && this.root.push(new at("dc:creator", e.creator)), e.keywords && this.root.push(new at("cp:keywords", e.keywords)), e.description && this.root.push(new at("dc:description", e.description)), e.lastModifiedBy && this.root.push(new at("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new at("cp:revision", String(e.revision))), this.root.push(new Ms("dcterms:created")), this.root.push(new Ms("dcterms:modified"));
  }
}
class Nf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { type: "xsi:type" });
  }
}
class Ms extends ae {
  constructor(e) {
    super(e), this.root.push(
      new Nf({
        type: "dcterms:W3CDTF"
      })
    ), this.root.push(Fl(/* @__PURE__ */ new Date()));
  }
}
class Of extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}
class Pf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}
class Ff extends ae {
  constructor(e, r) {
    super("property"), this.root.push(
      new Pf({
        formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
        pid: e.toString(),
        name: r.name
      })
    ), this.root.push(new Df(r.value));
  }
}
class Df extends ae {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}
class Bf extends ae {
  constructor(e) {
    super("Properties"), re(this, "nextId"), re(this, "properties", []), this.root.push(
      new Of({
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
    this.properties.push(new Ff(this.nextId++, e));
  }
}
const Lf = ({ space: t, count: e, separate: r, equalWidth: n, children: o }) => new fe({
  name: "w:cols",
  attributes: {
    space: { key: "w:space", value: t === void 0 ? void 0 : Se(t) },
    count: { key: "w:num", value: e === void 0 ? void 0 : ke(e) },
    separate: { key: "w:sep", value: r },
    equalWidth: { key: "w:equalWidth", value: n }
  },
  children: !n && o ? o : void 0
}), Mf = ({ type: t, linePitch: e, charSpace: r }) => new fe({
  name: "w:docGrid",
  attributes: {
    type: { key: "w:type", value: t },
    linePitch: { key: "w:linePitch", value: ke(e) },
    charSpace: { key: "w:charSpace", value: r ? ke(r) : void 0 }
  }
}), vt = {
  /** Specifies that this header or footer shall appear on every page in this section which is not overridden with a specific `even` or `first` page header/footer. In a section with all three types specified, this type shall be used on all odd numbered pages (counting from the `first` page in the section, not the section numbering). */
  DEFAULT: "default",
  /** Specifies that this header or footer shall appear on the first page in this section. The appearance of this header or footer is contingent on the setting of the `titlePg` element (§2.10.6). */
  FIRST: "first",
  /** Specifies that this header or footer shall appear on all even numbered pages in this section (counting from the first page in the section, not the section numbering). The appearance of this header or footer is contingent on the setting of the `evenAndOddHeaders` element (§2.10.1). */
  EVEN: "even"
}, Us = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
}, oi = (t, e) => new fe({
  name: t,
  attributes: {
    type: { key: "w:type", value: e.type || vt.DEFAULT },
    id: { key: "r:id", value: `rId${e.id}` }
  }
}), Uf = ({ countBy: t, start: e, restart: r, distance: n }) => new fe({
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
class js extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}
class jf extends tt {
  constructor(e) {
    if (super("w:pgBorders"), !e)
      return this;
    e.pageBorders ? this.root.push(
      new js({
        display: e.pageBorders.display,
        offsetFrom: e.pageBorders.offsetFrom,
        zOrder: e.pageBorders.zOrder
      })
    ) : this.root.push(new js({})), e.pageBorderTop && this.root.push(be("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(be("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(be("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(be("w:right", e.pageBorderRight));
  }
}
const zf = (t, e, r, n, o, l, f) => new fe({
  name: "w:pgMar",
  attributes: {
    top: { key: "w:top", value: $e(t) },
    right: { key: "w:right", value: Se(e) },
    bottom: { key: "w:bottom", value: $e(r) },
    left: { key: "w:left", value: Se(n) },
    header: { key: "w:header", value: Se(o) },
    footer: { key: "w:footer", value: Se(l) },
    gutter: { key: "w:gutter", value: Se(f) }
  }
}), Wf = ({ start: t, formatType: e, separator: r }) => new fe({
  name: "w:pgNumType",
  attributes: {
    start: { key: "w:start", value: t === void 0 ? void 0 : ke(t) },
    formatType: { key: "w:fmt", value: e },
    separator: { key: "w:chapSep", value: r }
  }
}), xi = {
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
}, Hf = ({ width: t, height: e, orientation: r, code: n }) => {
  const o = Se(t), l = Se(e);
  return new fe({
    name: "w:pgSz",
    attributes: {
      width: { key: "w:w", value: r === xi.LANDSCAPE ? l : o },
      height: { key: "w:h", value: r === xi.LANDSCAPE ? o : l },
      orientation: { key: "w:orient", value: r },
      code: { key: "w:code", value: n }
    }
  });
};
class qf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class Gf extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(
      new qf({
        val: e
      })
    );
  }
}
const Kf = {
  /** Section begins immediately following the previous section */
  CONTINUOUS: "continuous"
}, Vf = (t) => new fe({
  name: "w:type",
  attributes: {
    val: { key: "w:val", value: t }
  }
}), ot = {
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
}, ui = {
  /** Page width: 11906 twips (8.27 inches, 210mm) */
  WIDTH: 11906,
  /** Page height: 16838 twips (11.69 inches, 297mm) */
  HEIGHT: 16838,
  /** Page orientation: portrait */
  ORIENTATION: xi.PORTRAIT
};
class ou extends ae {
  constructor({
    page: {
      size: {
        width: e = ui.WIDTH,
        height: r = ui.HEIGHT,
        orientation: n = ui.ORIENTATION
      } = {},
      margin: {
        top: o = ot.TOP,
        right: l = ot.RIGHT,
        bottom: f = ot.BOTTOM,
        left: a = ot.LEFT,
        header: h = ot.HEADER,
        footer: A = ot.FOOTER,
        gutter: S = ot.GUTTER
      } = {},
      pageNumbers: k = {},
      borders: I,
      textDirection: b
    } = {},
    grid: { linePitch: R = 360, charSpace: g, type: T } = {},
    headerWrapperGroup: u = {},
    footerWrapperGroup: w = {},
    lineNumbers: p,
    titlePage: c,
    verticalAlign: E,
    column: F,
    type: B,
    revision: z
  } = {}) {
    super("w:sectPr"), this.addHeaderFooterGroup(Us.HEADER, u), this.addHeaderFooterGroup(Us.FOOTER, w), B && this.root.push(Vf(B)), this.root.push(Hf({ width: e, height: r, orientation: n })), this.root.push(zf(o, l, f, a, h, A, S)), I && this.root.push(new jf(I)), p && this.root.push(Uf(p)), this.root.push(Wf(k)), F && this.root.push(Lf(F)), E && this.root.push(Qo(E)), c !== void 0 && this.root.push(new ue("w:titlePg", c)), b && this.root.push(new Gf(b)), z && this.root.push(new Xf(z)), this.root.push(Mf({ linePitch: R, charSpace: g, type: T }));
  }
  addHeaderFooterGroup(e, r) {
    r.default && this.root.push(
      oi(e, {
        type: vt.DEFAULT,
        id: r.default.View.ReferenceId
      })
    ), r.first && this.root.push(
      oi(e, {
        type: vt.FIRST,
        id: r.first.View.ReferenceId
      })
    ), r.even && this.root.push(
      oi(e, {
        type: vt.EVEN,
        id: r.even.View.ReferenceId
      })
    );
  }
}
class Xf extends ae {
  constructor(e) {
    super("w:sectPrChange"), this.root.push(
      new De({
        id: e.id,
        author: e.author,
        date: e.date
      })
    ), this.root.push(new ou(e));
  }
}
class $f extends ae {
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
    this.root.push(this.createSectionParagraph(r)), this.sections.push(new ou(e));
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
    const r = new xe({}), n = new ft({});
    return n.push(e), r.addChildElement(n), r;
  }
}
class Zf extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      color: "w:color",
      themeColor: "w:themeColor",
      themeShade: "w:themeShade",
      themeTint: "w:themeTint"
    });
  }
}
class Yf extends ae {
  constructor(e) {
    super("w:background"), this.root.push(
      new Zf({
        color: e.color === void 0 ? void 0 : _t(e.color),
        themeColor: e.themeColor,
        themeShade: e.themeShade === void 0 ? void 0 : ys(e.themeShade),
        themeTint: e.themeTint === void 0 ? void 0 : ys(e.themeTint)
      })
    );
  }
}
class Jf extends ae {
  constructor(e) {
    super("w:document"), re(this, "body"), this.root.push(
      new gr(
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
    ), this.body = new $f(), e.background && this.root.push(new Yf(e.background)), this.root.push(this.body);
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
class Qf {
  constructor(e) {
    re(this, "document"), re(this, "relationships"), this.document = new Jf(e), this.relationships = new nt();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
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
class td extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}
class rd extends He {
  constructor() {
    super({
      style: "EndnoteReference"
    }), this.root.push(new Rh());
  }
}
const zs = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
};
class li extends ae {
  constructor(e) {
    super("w:endnote"), this.root.push(
      new td({
        type: e.type,
        id: e.id
      })
    );
    for (let r = 0; r < e.children.length; r++) {
      const n = e.children[r];
      r === 0 && n.addRunToFront(new rd()), this.root.push(n);
    }
  }
}
class nd extends ae {
  constructor() {
    super("w:continuationSeparator");
  }
}
class uu extends He {
  constructor() {
    super({}), this.root.push(new nd());
  }
}
class id extends ae {
  constructor() {
    super("w:separator");
  }
}
class lu extends He {
  constructor() {
    super({}), this.root.push(new id());
  }
}
class ad extends ae {
  constructor() {
    super("w:endnotes"), this.root.push(
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
    const e = new li({
      id: -1,
      type: zs.SEPARATOR,
      children: [
        new xe({
          spacing: {
            after: 0,
            line: 240,
            lineRule: Et.AUTO
          },
          children: [new lu()]
        })
      ]
    });
    this.root.push(e);
    const r = new li({
      id: 0,
      type: zs.CONTINUATION_SEPARATOR,
      children: [
        new xe({
          spacing: {
            after: 0,
            line: 240,
            lineRule: Et.AUTO
          },
          children: [new uu()]
        })
      ]
    });
    this.root.push(r);
  }
  createEndnote(e, r) {
    const n = new li({
      id: e,
      children: r
    });
    this.root.push(n);
  }
}
class sd {
  constructor() {
    re(this, "endnotes"), re(this, "relationships"), this.endnotes = new ad(), this.relationships = new nt();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}
class od extends pe {
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
let ud = class extends To {
  constructor(e, r) {
    super("w:ftr", r), re(this, "refId"), this.refId = e, r || this.root.push(
      new od({
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
class ld {
  constructor(e, r, n) {
    re(this, "footer"), re(this, "relationships"), this.media = e, this.footer = new ud(r, n), this.relationships = new nt();
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
class cd extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}
class hd extends ae {
  constructor() {
    super("w:footnoteRef");
  }
}
class fd extends He {
  constructor() {
    super({
      style: "FootnoteReference"
    }), this.root.push(new hd());
  }
}
const Ws = {
  /** Separator line between body text and footnotes */
  SEPERATOR: "separator",
  /** Continuation separator for footnotes spanning pages */
  CONTINUATION_SEPERATOR: "continuationSeparator"
};
class ci extends ae {
  constructor(e) {
    super("w:footnote"), this.root.push(
      new cd({
        type: e.type,
        id: e.id
      })
    );
    for (let r = 0; r < e.children.length; r++) {
      const n = e.children[r];
      r === 0 && n.addRunToFront(new fd()), this.root.push(n);
    }
  }
}
class dd extends pe {
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
class pd extends ae {
  constructor() {
    super("w:footnotes"), this.root.push(
      new dd({
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
    const e = new ci({
      id: -1,
      type: Ws.SEPERATOR,
      children: [
        new xe({
          spacing: {
            after: 0,
            line: 240,
            lineRule: Et.AUTO
          },
          children: [new lu()]
        })
      ]
    });
    this.root.push(e);
    const r = new ci({
      id: 0,
      type: Ws.CONTINUATION_SEPERATOR,
      children: [
        new xe({
          spacing: {
            after: 0,
            line: 240,
            lineRule: Et.AUTO
          },
          children: [new uu()]
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
    const n = new ci({
      id: e,
      children: r
    });
    this.root.push(n);
  }
}
class md {
  constructor() {
    re(this, "footnotess"), re(this, "relationships"), this.footnotess = new pd(), this.relationships = new nt();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}
class gd extends pe {
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
let wd = class extends To {
  constructor(e, r) {
    super("w:hdr", r), re(this, "refId"), this.refId = e, r || this.root.push(
      new gd({
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
class yd {
  constructor(e, r, n) {
    re(this, "header"), re(this, "relationships"), this.media = e, this.header = new wd(r, n), this.relationships = new nt();
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
class vd {
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
const Ve = {
  /** Bullet points. */
  BULLET: "bullet"
};
class bd extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w15:tentative"
    });
  }
}
class _d extends ae {
  constructor(e) {
    super("w:numFmt"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class Ed extends ae {
  constructor(e) {
    super("w:lvlText"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class xd extends ae {
  constructor(e) {
    super("w:lvlJc"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class Td extends ae {
  constructor(e) {
    super("w:suff"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class Sd extends ae {
  constructor() {
    super("w:isLgl");
  }
}
class Ad extends ae {
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
    alignment: o = Te.START,
    start: l = 1,
    style: f,
    suffix: a,
    isLegalNumberingStyle: h
  }) {
    if (super("w:lvl"), re(this, "paragraphProperties"), re(this, "runProperties"), this.root.push(new Lt("w:start", ke(l))), r && this.root.push(new _d(r)), a && this.root.push(new Td(a)), h && this.root.push(new Sd()), n && this.root.push(new Ed(n)), this.root.push(new xd(o)), this.paragraphProperties = new ft(f && f.paragraph), this.runProperties = new dt(f && f.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9)
      throw new Error(
        "Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7"
      );
    this.root.push(
      new bd({
        ilvl: ke(e),
        tentative: 1
      })
    );
  }
}
class kd extends Ad {
  // This is the level that sits under abstractNum
}
class Rd extends ae {
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
class Id extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}
class Hs extends ae {
  /**
   * Creates a new abstract numbering definition.
   *
   * @param id - Unique identifier for this abstract numbering definition
   * @param levelOptions - Array of level definitions (up to 9 levels)
   */
  constructor(e, r) {
    super("w:abstractNum"), re(this, "id"), this.root.push(
      new Id({
        abstractNumId: ke(e),
        restartNumberingAfterBreak: 0
      })
    ), this.root.push(new Rd("hybridMultilevel")), this.id = e;
    for (const n of r)
      this.root.push(new kd(n));
  }
}
class Cd extends ae {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(
      new Re({
        val: e
      })
    );
  }
}
class Nd extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { numId: "w:numId" });
  }
}
class qs extends ae {
  /**
   * Creates a new concrete numbering instance.
   *
   * @param options - Configuration options for the numbering instance
   */
  constructor(e) {
    if (super("w:num"), re(this, "numId"), re(this, "reference"), re(this, "instance"), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.root.push(
      new Nd({
        numId: ke(e.numId)
      })
    ), this.root.push(new Cd(ke(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length)
      for (const r of e.overrideLevels)
        this.root.push(new Pd(r.num, r.start));
  }
}
class Od extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}
class Pd extends ae {
  /**
   * Creates a new level override.
   *
   * @param levelNum - The level number to override (0-8)
   * @param start - Optional starting number for the level
   */
  constructor(e, r) {
    super("w:lvlOverride"), this.root.push(new Od({ ilvl: e })), r !== void 0 && this.root.push(new Dd(r));
  }
}
class Fd extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class Dd extends ae {
  /**
   * Creates a new start override.
   *
   * @param start - The starting number
   */
  constructor(e) {
    super("w:startOverride"), this.root.push(new Fd({ val: e }));
  }
}
class Bd extends ae {
  /**
   * Creates a new numbering definition collection.
   *
   * Initializes the numbering with a default bullet list configuration and
   * any custom numbering configurations provided in the options.
   *
   * @param options - Configuration options for numbering definitions
   */
  constructor(e) {
    super("w:numbering"), re(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), re(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), re(this, "referenceConfigMap", /* @__PURE__ */ new Map()), re(this, "abstractNumUniqueNumericId", gc()), re(this, "concreteNumUniqueNumericId", wc()), this.root.push(
      new gr(
        ["wpc", "mc", "o", "r", "m", "v", "wp14", "wp", "w10", "w", "w14", "w15", "wpg", "wpi", "wne", "wps"],
        "w14 w15 wp14"
      )
    );
    const r = new Hs(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: Ve.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: Be(0.5), hanging: Be(0.25) }
          }
        }
      },
      {
        level: 1,
        format: Ve.BULLET,
        text: "○",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: Be(1), hanging: Be(0.25) }
          }
        }
      },
      {
        level: 2,
        format: Ve.BULLET,
        text: "■",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 2160, hanging: Be(0.25) }
          }
        }
      },
      {
        level: 3,
        format: Ve.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 2880, hanging: Be(0.25) }
          }
        }
      },
      {
        level: 4,
        format: Ve.BULLET,
        text: "○",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 3600, hanging: Be(0.25) }
          }
        }
      },
      {
        level: 5,
        format: Ve.BULLET,
        text: "■",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 4320, hanging: Be(0.25) }
          }
        }
      },
      {
        level: 6,
        format: Ve.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 5040, hanging: Be(0.25) }
          }
        }
      },
      {
        level: 7,
        format: Ve.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 5760, hanging: Be(0.25) }
          }
        }
      },
      {
        level: 8,
        format: Ve.BULLET,
        text: "●",
        alignment: Te.LEFT,
        style: {
          paragraph: {
            indent: { left: 6480, hanging: Be(0.25) }
          }
        }
      }
    ]);
    this.concreteNumberingMap.set(
      "default-bullet-numbering",
      new qs({
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
      this.abstractNumberingMap.set(n.reference, new Hs(this.abstractNumUniqueNumericId(), n.levels)), this.referenceConfigMap.set(n.reference, n.levels);
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
    const o = `${e}-${r}`;
    if (this.concreteNumberingMap.has(o))
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
    this.concreteNumberingMap.set(o, new qs(a));
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
const Ld = (t) => new fe({
  name: "w:compatSetting",
  attributes: {
    version: { key: "w:val", value: t },
    name: { key: "w:name", value: "compatibilityMode" },
    uri: { key: "w:uri", value: "http://schemas.microsoft.com/office/word" }
  }
});
class Md extends ae {
  constructor(e) {
    super("w:compat"), e.version && this.root.push(Ld(e.version)), e.useSingleBorderforContiguousCells && this.root.push(new ue("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new ue("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new ue("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new ue("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new ue("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new ue("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new ue("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new ue("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new ue("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new ue("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new ue("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new ue("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new ue("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new ue("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new ue("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new ue("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new ue("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new ue("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new ue("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new ue("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new ue("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new ue("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new ue("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new ue("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new ue("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new ue("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new ue("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new ue("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new ue("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new ue("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new ue("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new ue("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new ue("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new ue("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new ue("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new ue("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new ue("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new ue("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new ue("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new ue("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new ue("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new ue("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new ue("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new ue("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new ue("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new ue("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new ue("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new ue("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new ue("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new ue("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new ue("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new ue("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new ue("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new ue("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new ue("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new ue("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new ue("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new ue("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new ue("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new ue("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new ue("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new ue("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new ue("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new ue("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new ue("w:cachedColBalance", e.cachedColumnBalance));
  }
}
class Ud extends pe {
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
class jd extends ae {
  constructor(e) {
    var r, n, o, l, f, a, h, A;
    super("w:settings"), this.root.push(
      new Ud({
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
    ), this.root.push(new ue("w:displayBackgroundShape", !0)), e.trackRevisions !== void 0 && this.root.push(new ue("w:trackRevisions", e.trackRevisions)), e.evenAndOddHeaders !== void 0 && this.root.push(new ue("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new ue("w:updateFields", e.updateFields)), e.defaultTabStop !== void 0 && this.root.push(new Lt("w:defaultTabStop", e.defaultTabStop)), ((r = e.hyphenation) == null ? void 0 : r.autoHyphenation) !== void 0 && this.root.push(new ue("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((n = e.hyphenation) == null ? void 0 : n.hyphenationZone) !== void 0 && this.root.push(new Lt("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((o = e.hyphenation) == null ? void 0 : o.consecutiveHyphenLimit) !== void 0 && this.root.push(new Lt("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((l = e.hyphenation) == null ? void 0 : l.doNotHyphenateCaps) !== void 0 && this.root.push(new ue("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), this.root.push(
      new Md(Ae(me({}, (f = e.compatibility) != null ? f : {}), {
        version: (A = (h = (a = e.compatibility) == null ? void 0 : a.version) != null ? h : e.compatibilityModeVersion) != null ? A : 15
      }))
    );
  }
}
class cu extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", { val: "w:val" });
  }
}
class zd extends ae {
  constructor(e) {
    super("w:name"), this.root.push(new cu({ val: e }));
  }
}
class Wd extends ae {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new cu({ val: ke(e) }));
  }
}
class Hd extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}
class hu extends ae {
  constructor(e, r) {
    super("w:style"), this.root.push(new Hd(e)), r.name && this.root.push(new zd(r.name)), r.basedOn && this.root.push(new et("w:basedOn", r.basedOn)), r.next && this.root.push(new et("w:next", r.next)), r.link && this.root.push(new et("w:link", r.link)), r.uiPriority !== void 0 && this.root.push(new Wd(r.uiPriority)), r.semiHidden !== void 0 && this.root.push(new ue("w:semiHidden", r.semiHidden)), r.unhideWhenUsed !== void 0 && this.root.push(new ue("w:unhideWhenUsed", r.unhideWhenUsed)), r.quickFormat !== void 0 && this.root.push(new ue("w:qFormat", r.quickFormat));
  }
}
class Wt extends hu {
  constructor(e) {
    super({ type: "paragraph", styleId: e.id }, e), re(this, "paragraphProperties"), re(this, "runProperties"), this.paragraphProperties = new ft(e.paragraph), this.runProperties = new dt(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}
class Tt extends hu {
  constructor(e) {
    super(
      { type: "character", styleId: e.id },
      me({
        uiPriority: 99,
        unhideWhenUsed: !0
      }, e)
    ), re(this, "runProperties"), this.runProperties = new dt(e.run), this.root.push(this.runProperties);
  }
}
class it extends Wt {
  constructor(e) {
    super(me({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, e));
  }
}
class qd extends it {
  constructor(e) {
    super(me({
      id: "Title",
      name: "Title"
    }, e));
  }
}
class Gd extends it {
  constructor(e) {
    super(me({
      id: "Heading1",
      name: "Heading 1"
    }, e));
  }
}
class Kd extends it {
  constructor(e) {
    super(me({
      id: "Heading2",
      name: "Heading 2"
    }, e));
  }
}
class Vd extends it {
  constructor(e) {
    super(me({
      id: "Heading3",
      name: "Heading 3"
    }, e));
  }
}
class Xd extends it {
  constructor(e) {
    super(me({
      id: "Heading4",
      name: "Heading 4"
    }, e));
  }
}
class $d extends it {
  constructor(e) {
    super(me({
      id: "Heading5",
      name: "Heading 5"
    }, e));
  }
}
class Zd extends it {
  constructor(e) {
    super(me({
      id: "Heading6",
      name: "Heading 6"
    }, e));
  }
}
class Yd extends it {
  constructor(e) {
    super(me({
      id: "Strong",
      name: "Strong"
    }, e));
  }
}
class Jd extends Wt {
  constructor(e) {
    super(me({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, e));
  }
}
class Qd extends Wt {
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
          lineRule: Et.AUTO
        }
      },
      run: {
        size: 20
      }
    }, e));
  }
}
class ep extends Tt {
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
class tp extends Tt {
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
class rp extends Wt {
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
          lineRule: Et.AUTO
        }
      },
      run: {
        size: 20
      }
    }, e));
  }
}
class np extends Tt {
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
class ip extends Tt {
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
class ap extends Tt {
  constructor(e) {
    super(me({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: {
          type: No.SINGLE
        }
      }
    }, e));
  }
}
class hi extends ae {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles)
      for (const r of e.importedStyles)
        this.root.push(r);
    if (e.paragraphStyles)
      for (const r of e.paragraphStyles)
        this.root.push(new Wt(r));
    if (e.characterStyles)
      for (const r of e.characterStyles)
        this.root.push(new Tt(r));
  }
}
class sp extends ae {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new ft(e));
  }
}
class op extends ae {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new dt(e));
  }
}
class up extends ae {
  constructor(e) {
    super("w:docDefaults"), re(this, "runPropertiesDefaults"), re(this, "paragraphPropertiesDefaults"), this.runPropertiesDefaults = new op(e.run), this.paragraphPropertiesDefaults = new sp(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}
class lp {
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
    const r = xo.xml2js(e, { compact: !1 });
    let n;
    for (const l of r.elements || [])
      l.name === "w:styles" && (n = l);
    if (n === void 0)
      throw new Error("can not find styles element");
    const o = n.elements || [];
    return {
      initialStyles: new Il(n.attributes),
      importedStyles: o.map((l) => Fi(l))
    };
  }
}
class fi {
  newInstance(e = {}) {
    var r;
    return {
      initialStyles: new gr(["mc", "r", "w", "w14", "w15"], "w14 w15"),
      importedStyles: [
        new up((r = e.document) != null ? r : {}),
        new qd(me({
          run: {
            size: 56
          }
        }, e.title)),
        new Gd(me({
          run: {
            color: "2E74B5",
            size: 32
          }
        }, e.heading1)),
        new Kd(me({
          run: {
            color: "2E74B5",
            size: 26
          }
        }, e.heading2)),
        new Vd(me({
          run: {
            color: "1F4D78",
            size: 24
          }
        }, e.heading3)),
        new Xd(me({
          run: {
            color: "2E74B5",
            italics: !0
          }
        }, e.heading4)),
        new $d(me({
          run: {
            color: "2E74B5"
          }
        }, e.heading5)),
        new Zd(me({
          run: {
            color: "1F4D78"
          }
        }, e.heading6)),
        new Yd(me({
          run: {
            bold: !0
          }
        }, e.strong)),
        new Jd(e.listParagraph || {}),
        new ap(e.hyperlink || {}),
        new ep(e.footnoteReference || {}),
        new Qd(e.footnoteText || {}),
        new tp(e.footnoteTextChar || {}),
        new np(e.endnoteReference || {}),
        new rp(e.endnoteText || {}),
        new ip(e.endnoteTextChar || {})
      ]
    };
  }
}
class cp {
  constructor(e) {
    re(this, "currentRelationshipId", 1), re(this, "documentWrapper"), re(this, "headers", []), re(this, "footers", []), re(this, "coreProperties"), re(this, "numbering"), re(this, "media"), re(this, "fileRelationships"), re(this, "footnotesWrapper"), re(this, "endnotesWrapper"), re(this, "settings"), re(this, "contentTypes"), re(this, "customProperties"), re(this, "appProperties"), re(this, "styles"), re(this, "comments"), re(this, "fontWrapper");
    var r, n, o, l, f, a, h, A, S, k, I, b, R;
    if (this.coreProperties = new Cf(Ae(me({}, e), {
      creator: (r = e.creator) != null ? r : "Un-named",
      revision: (n = e.revision) != null ? n : 1,
      lastModifiedBy: (o = e.lastModifiedBy) != null ? o : "Un-named"
    })), this.numbering = new Bd(e.numbering ? e.numbering : { config: [] }), this.comments = new kh((l = e.comments) != null ? l : { children: [] }), this.fileRelationships = new nt(), this.customProperties = new Bf((f = e.customProperties) != null ? f : []), this.appProperties = new kf(), this.footnotesWrapper = new md(), this.endnotesWrapper = new sd(), this.contentTypes = new If(), this.documentWrapper = new Qf({ background: e.background }), this.settings = new jd({
      compatibilityModeVersion: e.compatabilityModeVersion,
      compatibility: e.compatibility,
      evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters,
      trackRevisions: (a = e.features) == null ? void 0 : a.trackRevisions,
      updateFields: (h = e.features) == null ? void 0 : h.updateFields,
      defaultTabStop: e.defaultTabStop,
      hyphenation: {
        autoHyphenation: (A = e.hyphenation) == null ? void 0 : A.autoHyphenation,
        hyphenationZone: (S = e.hyphenation) == null ? void 0 : S.hyphenationZone,
        consecutiveHyphenLimit: (k = e.hyphenation) == null ? void 0 : k.consecutiveHyphenLimit,
        doNotHyphenateCaps: (I = e.hyphenation) == null ? void 0 : I.doNotHyphenateCaps
      }
    }), this.media = new vd(), e.externalStyles !== void 0) {
      const T = new fi().newInstance((b = e.styles) == null ? void 0 : b.default), w = new lp().newInstance(e.externalStyles);
      this.styles = new hi(Ae(me({}, w), {
        importedStyles: [...T.importedStyles, ...w.importedStyles]
      }));
    } else if (e.styles) {
      const T = new fi().newInstance(e.styles.default);
      this.styles = new hi(me(me({}, T), e.styles));
    } else {
      const g = new fi();
      this.styles = new hi(g.newInstance());
    }
    this.addDefaultRelationships();
    for (const g of e.sections)
      this.addSection(g);
    if (e.footnotes)
      for (const g in e.footnotes)
        this.footnotesWrapper.View.createFootNote(parseFloat(g), e.footnotes[g].children);
    if (e.endnotes)
      for (const g in e.endnotes)
        this.endnotesWrapper.View.createEndnote(parseFloat(g), e.endnotes[g].children);
    this.fontWrapper = new Yo((R = e.fonts) != null ? R : []);
  }
  addSection({ headers: e = {}, footers: r = {}, children: n, properties: o }) {
    this.documentWrapper.View.Body.addSection(Ae(me({}, o), {
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
    const r = new yd(this.media, this.currentRelationshipId++);
    for (const n of e.options.children)
      r.add(n);
    return this.addHeaderToDocument(r), r;
  }
  createFooter(e) {
    const r = new ld(this.media, this.currentRelationshipId++);
    for (const n of e.options.children)
      r.add(n);
    return this.addFooterToDocument(r), r;
  }
  addHeaderToDocument(e, r = vt.DEFAULT) {
    this.headers.push({ header: e, type: r }), this.documentWrapper.Relationships.addRelationship(
      e.View.ReferenceId,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header",
      `header${this.headers.length}.xml`
    ), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(e, r = vt.DEFAULT) {
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
class hp extends ae {
  constructor(e = {}) {
    super("w:instrText"), re(this, "properties"), this.properties = e, this.root.push(new ht({ space: ct.PRESERVE }));
    let r = "TOC";
    if (this.properties.captionLabel && (r = `${r} \\a "${this.properties.captionLabel}"`), this.properties.entriesFromBookmark && (r = `${r} \\b "${this.properties.entriesFromBookmark}"`), this.properties.captionLabelIncludingNumbers && (r = `${r} \\c "${this.properties.captionLabelIncludingNumbers}"`), this.properties.sequenceAndPageNumbersSeparator && (r = `${r} \\d "${this.properties.sequenceAndPageNumbersSeparator}"`), this.properties.tcFieldIdentifier && (r = `${r} \\f "${this.properties.tcFieldIdentifier}"`), this.properties.hyperlink && (r = `${r} \\h`), this.properties.tcFieldLevelRange && (r = `${r} \\l "${this.properties.tcFieldLevelRange}"`), this.properties.pageNumbersEntryLevelsRange && (r = `${r} \\n "${this.properties.pageNumbersEntryLevelsRange}"`), this.properties.headingStyleRange && (r = `${r} \\o "${this.properties.headingStyleRange}"`), this.properties.entryAndPageNumberSeparator && (r = `${r} \\p "${this.properties.entryAndPageNumberSeparator}"`), this.properties.seqFieldIdentifierForPrefix && (r = `${r} \\s "${this.properties.seqFieldIdentifierForPrefix}"`), this.properties.stylesWithLevels && this.properties.stylesWithLevels.length) {
      const n = this.properties.stylesWithLevels.map((o) => `${o.styleName},${o.level}`).join(",");
      r = `${r} \\t "${n}"`;
    }
    this.properties.useAppliedParagraphOutlineLevel && (r = `${r} \\u`), this.properties.preserveTabInEntries && (r = `${r} \\w`), this.properties.preserveNewLineInEntries && (r = `${r} \\x`), this.properties.hideTabAndPageNumbersInWebView && (r = `${r} \\z`), this.root.push(r);
  }
}
class fp extends ae {
  constructor() {
    super("w:sdtContent");
  }
}
class dp extends ae {
  constructor(e) {
    super("w:sdtPr"), e && this.root.push(new et("w:alias", e));
  }
}
class pp extends Mi {
  constructor(e = "Table of Contents", r = {}) {
    var n = r, {
      contentChildren: o = [],
      cachedEntries: l = [],
      beginDirty: f = !0
    } = n, a = Ru(n, [
      "contentChildren",
      "cachedEntries",
      "beginDirty"
    ]);
    super("w:sdt"), this.root.push(new dp(e));
    const h = new fp(), A = [
      new He({
        children: [Pt(f), new hp(a), Ft()]
      })
    ], S = [
      new He({
        children: [Dt()]
      })
    ];
    if (l !== void 0 && l.length > 0) {
      const { stylesWithLevels: I } = a, b = l.map((g, T) => {
        var u, w;
        const p = this.buildCachedContentParagraphChild(g, a), c = (w = (u = I?.find((F) => F.level === g.level)) == null ? void 0 : u.styleName) != null ? w : `TOC${g.level}`, E = T === 0 ? [...A, p] : T === l.length - 1 ? [p, ...S] : [p];
        return new xe({
          style: c,
          tabStops: this.getTabStopsForLevel(g.level),
          children: E
        });
      });
      let R = b;
      l.length <= 1 && (R = [
        ...b,
        new xe({
          children: S
        })
      ]);
      for (const g of R)
        h.addChildElement(g);
    } else {
      const I = new xe({
        children: A
      });
      h.addChildElement(I);
      for (const R of o)
        h.addChildElement(R);
      const b = new xe({
        children: S
      });
      h.addChildElement(b);
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
    var n, o;
    return new He({
      // TODO: The IndexLink style might always need to be set regardless of the hyperlink property. This needs to be verified.
      style: r?.hyperlink && e.href !== void 0 ? "IndexLink" : void 0,
      children: [
        new or({
          text: e.title
        }),
        new Vo(),
        new or({
          text: (o = (n = e.page) == null ? void 0 : n.toString()) != null ? o : ""
        })
      ]
    });
  }
  buildCachedContentParagraphChild(e, r) {
    const n = this.buildCachedContentRun(e, r);
    return r?.hyperlink && e.href !== void 0 ? new Xo({
      anchor: e.href,
      children: [n]
    }) : n;
  }
}
class fu {
  constructor(e = { children: [] }) {
    re(this, "options"), this.options = e;
  }
}
class du {
  constructor(e = { children: [] }) {
    re(this, "options"), this.options = e;
  }
}
class mp extends pe {
  constructor() {
    super(...arguments), re(this, "xmlKeys", {
      id: "w:id"
    });
  }
}
class gp extends ae {
  constructor(e) {
    super("w:footnoteReference"), this.root.push(
      new mp({
        id: e
      })
    );
  }
}
class wp extends He {
  /**
   * Creates a new footnote reference run.
   *
   * @param id - Unique identifier linking to the footnote content
   */
  constructor(e) {
    super({ style: "FootnoteReference" }), this.root.push(new gp(e));
  }
}
var yp = Ni();
function Qt(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var di = { exports: {} }, Gs;
function vp() {
  return Gs || (Gs = 1, (function(t, e) {
    (function(r) {
      t.exports = r();
    })(function() {
      return (function r(n, o, l) {
        function f(A, S) {
          if (!o[A]) {
            if (!n[A]) {
              var k = typeof Qt == "function" && Qt;
              if (!S && k) return k(A, !0);
              if (a) return a(A, !0);
              var I = new Error("Cannot find module '" + A + "'");
              throw I.code = "MODULE_NOT_FOUND", I;
            }
            var b = o[A] = { exports: {} };
            n[A][0].call(b.exports, function(R) {
              var g = n[A][1][R];
              return f(g || R);
            }, b, b.exports, r, n, o, l);
          }
          return o[A].exports;
        }
        for (var a = typeof Qt == "function" && Qt, h = 0; h < l.length; h++) f(l[h]);
        return f;
      })({ 1: [function(r, n, o) {
        var l = r("./utils"), f = r("./support"), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        o.encode = function(h) {
          for (var A, S, k, I, b, R, g, T = [], u = 0, w = h.length, p = w, c = l.getTypeOf(h) !== "string"; u < h.length; ) p = w - u, k = c ? (A = h[u++], S = u < w ? h[u++] : 0, u < w ? h[u++] : 0) : (A = h.charCodeAt(u++), S = u < w ? h.charCodeAt(u++) : 0, u < w ? h.charCodeAt(u++) : 0), I = A >> 2, b = (3 & A) << 4 | S >> 4, R = 1 < p ? (15 & S) << 2 | k >> 6 : 64, g = 2 < p ? 63 & k : 64, T.push(a.charAt(I) + a.charAt(b) + a.charAt(R) + a.charAt(g));
          return T.join("");
        }, o.decode = function(h) {
          var A, S, k, I, b, R, g = 0, T = 0, u = "data:";
          if (h.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
          var w, p = 3 * (h = h.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (h.charAt(h.length - 1) === a.charAt(64) && p--, h.charAt(h.length - 2) === a.charAt(64) && p--, p % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (w = f.uint8array ? new Uint8Array(0 | p) : new Array(0 | p); g < h.length; ) A = a.indexOf(h.charAt(g++)) << 2 | (I = a.indexOf(h.charAt(g++))) >> 4, S = (15 & I) << 4 | (b = a.indexOf(h.charAt(g++))) >> 2, k = (3 & b) << 6 | (R = a.indexOf(h.charAt(g++))), w[T++] = A, b !== 64 && (w[T++] = S), R !== 64 && (w[T++] = k);
          return w;
        };
      }, { "./support": 30, "./utils": 32 }], 2: [function(r, n, o) {
        var l = r("./external"), f = r("./stream/DataWorker"), a = r("./stream/Crc32Probe"), h = r("./stream/DataLengthProbe");
        function A(S, k, I, b, R) {
          this.compressedSize = S, this.uncompressedSize = k, this.crc32 = I, this.compression = b, this.compressedContent = R;
        }
        A.prototype = { getContentWorker: function() {
          var S = new f(l.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new h("data_length")), k = this;
          return S.on("end", function() {
            if (this.streamInfo.data_length !== k.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
          }), S;
        }, getCompressedWorker: function() {
          return new f(l.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
        } }, A.createWorkerFrom = function(S, k, I) {
          return S.pipe(new a()).pipe(new h("uncompressedSize")).pipe(k.compressWorker(I)).pipe(new h("compressedSize")).withStreamInfo("compression", k);
        }, n.exports = A;
      }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(r, n, o) {
        var l = r("./stream/GenericWorker");
        o.STORE = { magic: "\0\0", compressWorker: function() {
          return new l("STORE compression");
        }, uncompressWorker: function() {
          return new l("STORE decompression");
        } }, o.DEFLATE = r("./flate");
      }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(r, n, o) {
        var l = r("./utils"), f = (function() {
          for (var a, h = [], A = 0; A < 256; A++) {
            a = A;
            for (var S = 0; S < 8; S++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
            h[A] = a;
          }
          return h;
        })();
        n.exports = function(a, h) {
          return a !== void 0 && a.length ? l.getTypeOf(a) !== "string" ? (function(A, S, k, I) {
            var b = f, R = I + k;
            A ^= -1;
            for (var g = I; g < R; g++) A = A >>> 8 ^ b[255 & (A ^ S[g])];
            return -1 ^ A;
          })(0 | h, a, a.length, 0) : (function(A, S, k, I) {
            var b = f, R = I + k;
            A ^= -1;
            for (var g = I; g < R; g++) A = A >>> 8 ^ b[255 & (A ^ S.charCodeAt(g))];
            return -1 ^ A;
          })(0 | h, a, a.length, 0) : 0;
        };
      }, { "./utils": 32 }], 5: [function(r, n, o) {
        o.base64 = !1, o.binary = !1, o.dir = !1, o.createFolders = !0, o.date = null, o.compression = null, o.compressionOptions = null, o.comment = null, o.unixPermissions = null, o.dosPermissions = null;
      }, {}], 6: [function(r, n, o) {
        var l = null;
        l = typeof Promise < "u" ? Promise : r("lie"), n.exports = { Promise: l };
      }, { lie: 37 }], 7: [function(r, n, o) {
        var l = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", f = r("pako"), a = r("./utils"), h = r("./stream/GenericWorker"), A = l ? "uint8array" : "array";
        function S(k, I) {
          h.call(this, "FlateWorker/" + k), this._pako = null, this._pakoAction = k, this._pakoOptions = I, this.meta = {};
        }
        o.magic = "\b\0", a.inherits(S, h), S.prototype.processChunk = function(k) {
          this.meta = k.meta, this._pako === null && this._createPako(), this._pako.push(a.transformTo(A, k.data), !1);
        }, S.prototype.flush = function() {
          h.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
        }, S.prototype.cleanUp = function() {
          h.prototype.cleanUp.call(this), this._pako = null;
        }, S.prototype._createPako = function() {
          this._pako = new f[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
          var k = this;
          this._pako.onData = function(I) {
            k.push({ data: I, meta: k.meta });
          };
        }, o.compressWorker = function(k) {
          return new S("Deflate", k);
        }, o.uncompressWorker = function() {
          return new S("Inflate", {});
        };
      }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(r, n, o) {
        function l(b, R) {
          var g, T = "";
          for (g = 0; g < R; g++) T += String.fromCharCode(255 & b), b >>>= 8;
          return T;
        }
        function f(b, R, g, T, u, w) {
          var p, c, E = b.file, F = b.compression, B = w !== A.utf8encode, z = a.transformTo("string", w(E.name)), C = a.transformTo("string", A.utf8encode(E.name)), $ = E.comment, le = a.transformTo("string", w($)), N = a.transformTo("string", A.utf8encode($)), U = C.length !== E.name.length, v = N.length !== $.length, K = "", ee = "", H = "", ie = E.dir, Q = E.date, ce = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
          R && !g || (ce.crc32 = b.crc32, ce.compressedSize = b.compressedSize, ce.uncompressedSize = b.uncompressedSize);
          var V = 0;
          R && (V |= 8), B || !U && !v || (V |= 2048);
          var P = 0, X = 0;
          ie && (P |= 16), u === "UNIX" ? (X = 798, P |= (function(te, G) {
            var _ = te;
            return te || (_ = G ? 16893 : 33204), (65535 & _) << 16;
          })(E.unixPermissions, ie)) : (X = 20, P |= (function(te) {
            return 63 & (te || 0);
          })(E.dosPermissions)), p = Q.getUTCHours(), p <<= 6, p |= Q.getUTCMinutes(), p <<= 5, p |= Q.getUTCSeconds() / 2, c = Q.getUTCFullYear() - 1980, c <<= 4, c |= Q.getUTCMonth() + 1, c <<= 5, c |= Q.getUTCDate(), U && (ee = l(1, 1) + l(S(z), 4) + C, K += "up" + l(ee.length, 2) + ee), v && (H = l(1, 1) + l(S(le), 4) + N, K += "uc" + l(H.length, 2) + H);
          var Z = "";
          return Z += `
\0`, Z += l(V, 2), Z += F.magic, Z += l(p, 2), Z += l(c, 2), Z += l(ce.crc32, 4), Z += l(ce.compressedSize, 4), Z += l(ce.uncompressedSize, 4), Z += l(z.length, 2), Z += l(K.length, 2), { fileRecord: k.LOCAL_FILE_HEADER + Z + z + K, dirRecord: k.CENTRAL_FILE_HEADER + l(X, 2) + Z + l(le.length, 2) + "\0\0\0\0" + l(P, 4) + l(T, 4) + z + K + le };
        }
        var a = r("../utils"), h = r("../stream/GenericWorker"), A = r("../utf8"), S = r("../crc32"), k = r("../signature");
        function I(b, R, g, T) {
          h.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = R, this.zipPlatform = g, this.encodeFileName = T, this.streamFiles = b, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        a.inherits(I, h), I.prototype.push = function(b) {
          var R = b.meta.percent || 0, g = this.entriesCount, T = this._sources.length;
          this.accumulate ? this.contentBuffer.push(b) : (this.bytesWritten += b.data.length, h.prototype.push.call(this, { data: b.data, meta: { currentFile: this.currentFile, percent: g ? (R + 100 * (g - T - 1)) / g : 100 } }));
        }, I.prototype.openedSource = function(b) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = b.file.name;
          var R = this.streamFiles && !b.file.dir;
          if (R) {
            var g = f(b, R, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({ data: g.fileRecord, meta: { percent: 0 } });
          } else this.accumulate = !0;
        }, I.prototype.closedSource = function(b) {
          this.accumulate = !1;
          var R = this.streamFiles && !b.file.dir, g = f(b, R, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(g.dirRecord), R) this.push({ data: (function(T) {
            return k.DATA_DESCRIPTOR + l(T.crc32, 4) + l(T.compressedSize, 4) + l(T.uncompressedSize, 4);
          })(b), meta: { percent: 100 } });
          else for (this.push({ data: g.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, I.prototype.flush = function() {
          for (var b = this.bytesWritten, R = 0; R < this.dirRecords.length; R++) this.push({ data: this.dirRecords[R], meta: { percent: 100 } });
          var g = this.bytesWritten - b, T = (function(u, w, p, c, E) {
            var F = a.transformTo("string", E(c));
            return k.CENTRAL_DIRECTORY_END + "\0\0\0\0" + l(u, 2) + l(u, 2) + l(w, 4) + l(p, 4) + l(F.length, 2) + F;
          })(this.dirRecords.length, g, b, this.zipComment, this.encodeFileName);
          this.push({ data: T, meta: { percent: 100 } });
        }, I.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, I.prototype.registerPrevious = function(b) {
          this._sources.push(b);
          var R = this;
          return b.on("data", function(g) {
            R.processChunk(g);
          }), b.on("end", function() {
            R.closedSource(R.previous.streamInfo), R._sources.length ? R.prepareNextSource() : R.end();
          }), b.on("error", function(g) {
            R.error(g);
          }), this;
        }, I.prototype.resume = function() {
          return !!h.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
        }, I.prototype.error = function(b) {
          var R = this._sources;
          if (!h.prototype.error.call(this, b)) return !1;
          for (var g = 0; g < R.length; g++) try {
            R[g].error(b);
          } catch {
          }
          return !0;
        }, I.prototype.lock = function() {
          h.prototype.lock.call(this);
          for (var b = this._sources, R = 0; R < b.length; R++) b[R].lock();
        }, n.exports = I;
      }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(r, n, o) {
        var l = r("../compressions"), f = r("./ZipFileWorker");
        o.generateWorker = function(a, h, A) {
          var S = new f(h.streamFiles, A, h.platform, h.encodeFileName), k = 0;
          try {
            a.forEach(function(I, b) {
              k++;
              var R = (function(w, p) {
                var c = w || p, E = l[c];
                if (!E) throw new Error(c + " is not a valid compression method !");
                return E;
              })(b.options.compression, h.compression), g = b.options.compressionOptions || h.compressionOptions || {}, T = b.dir, u = b.date;
              b._compressWorker(R, g).withStreamInfo("file", { name: I, dir: T, date: u, comment: b.comment || "", unixPermissions: b.unixPermissions, dosPermissions: b.dosPermissions }).pipe(S);
            }), S.entriesCount = k;
          } catch (I) {
            S.error(I);
          }
          return S;
        };
      }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(r, n, o) {
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
      }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(r, n, o) {
        var l = r("./utils"), f = r("./external"), a = r("./utf8"), h = r("./zipEntries"), A = r("./stream/Crc32Probe"), S = r("./nodejsUtils");
        function k(I) {
          return new f.Promise(function(b, R) {
            var g = I.decompressed.getContentWorker().pipe(new A());
            g.on("error", function(T) {
              R(T);
            }).on("end", function() {
              g.streamInfo.crc32 !== I.decompressed.crc32 ? R(new Error("Corrupted zip : CRC32 mismatch")) : b();
            }).resume();
          });
        }
        n.exports = function(I, b) {
          var R = this;
          return b = l.extend(b || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: a.utf8decode }), S.isNode && S.isStream(I) ? f.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : l.prepareContent("the loaded zip file", I, !0, b.optimizedBinaryString, b.base64).then(function(g) {
            var T = new h(b);
            return T.load(g), T;
          }).then(function(g) {
            var T = [f.Promise.resolve(g)], u = g.files;
            if (b.checkCRC32) for (var w = 0; w < u.length; w++) T.push(k(u[w]));
            return f.Promise.all(T);
          }).then(function(g) {
            for (var T = g.shift(), u = T.files, w = 0; w < u.length; w++) {
              var p = u[w], c = p.fileNameStr, E = l.resolve(p.fileNameStr);
              R.file(E, p.decompressed, { binary: !0, optimizedBinaryString: !0, date: p.date, dir: p.dir, comment: p.fileCommentStr.length ? p.fileCommentStr : null, unixPermissions: p.unixPermissions, dosPermissions: p.dosPermissions, createFolders: b.createFolders }), p.dir || (R.file(E).unsafeOriginalName = c);
            }
            return T.zipComment.length && (R.comment = T.zipComment), R;
          });
        };
      }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(r, n, o) {
        var l = r("../utils"), f = r("../stream/GenericWorker");
        function a(h, A) {
          f.call(this, "Nodejs stream input adapter for " + h), this._upstreamEnded = !1, this._bindStream(A);
        }
        l.inherits(a, f), a.prototype._bindStream = function(h) {
          var A = this;
          (this._stream = h).pause(), h.on("data", function(S) {
            A.push({ data: S, meta: { percent: 0 } });
          }).on("error", function(S) {
            A.isPaused ? this.generatedError = S : A.error(S);
          }).on("end", function() {
            A.isPaused ? A._upstreamEnded = !0 : A.end();
          });
        }, a.prototype.pause = function() {
          return !!f.prototype.pause.call(this) && (this._stream.pause(), !0);
        }, a.prototype.resume = function() {
          return !!f.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
        }, n.exports = a;
      }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(r, n, o) {
        var l = r("readable-stream").Readable;
        function f(a, h, A) {
          l.call(this, h), this._helper = a;
          var S = this;
          a.on("data", function(k, I) {
            S.push(k) || S._helper.pause(), A && A(I);
          }).on("error", function(k) {
            S.emit("error", k);
          }).on("end", function() {
            S.push(null);
          });
        }
        r("../utils").inherits(f, l), f.prototype._read = function() {
          this._helper.resume();
        }, n.exports = f;
      }, { "../utils": 32, "readable-stream": 16 }], 14: [function(r, n, o) {
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
      }, {}], 15: [function(r, n, o) {
        function l(E, F, B) {
          var z, C = a.getTypeOf(F), $ = a.extend(B || {}, S);
          $.date = $.date || /* @__PURE__ */ new Date(), $.compression !== null && ($.compression = $.compression.toUpperCase()), typeof $.unixPermissions == "string" && ($.unixPermissions = parseInt($.unixPermissions, 8)), $.unixPermissions && 16384 & $.unixPermissions && ($.dir = !0), $.dosPermissions && 16 & $.dosPermissions && ($.dir = !0), $.dir && (E = u(E)), $.createFolders && (z = T(E)) && w.call(this, z, !0);
          var le = C === "string" && $.binary === !1 && $.base64 === !1;
          B && B.binary !== void 0 || ($.binary = !le), (F instanceof k && F.uncompressedSize === 0 || $.dir || !F || F.length === 0) && ($.base64 = !1, $.binary = !0, F = "", $.compression = "STORE", C = "string");
          var N = null;
          N = F instanceof k || F instanceof h ? F : R.isNode && R.isStream(F) ? new g(E, F) : a.prepareContent(E, F, $.binary, $.optimizedBinaryString, $.base64);
          var U = new I(E, N, $);
          this.files[E] = U;
        }
        var f = r("./utf8"), a = r("./utils"), h = r("./stream/GenericWorker"), A = r("./stream/StreamHelper"), S = r("./defaults"), k = r("./compressedObject"), I = r("./zipObject"), b = r("./generate"), R = r("./nodejsUtils"), g = r("./nodejs/NodejsStreamInputAdapter"), T = function(E) {
          E.slice(-1) === "/" && (E = E.substring(0, E.length - 1));
          var F = E.lastIndexOf("/");
          return 0 < F ? E.substring(0, F) : "";
        }, u = function(E) {
          return E.slice(-1) !== "/" && (E += "/"), E;
        }, w = function(E, F) {
          return F = F !== void 0 ? F : S.createFolders, E = u(E), this.files[E] || l.call(this, E, null, { dir: !0, createFolders: F }), this.files[E];
        };
        function p(E) {
          return Object.prototype.toString.call(E) === "[object RegExp]";
        }
        var c = { load: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, forEach: function(E) {
          var F, B, z;
          for (F in this.files) z = this.files[F], (B = F.slice(this.root.length, F.length)) && F.slice(0, this.root.length) === this.root && E(B, z);
        }, filter: function(E) {
          var F = [];
          return this.forEach(function(B, z) {
            E(B, z) && F.push(z);
          }), F;
        }, file: function(E, F, B) {
          if (arguments.length !== 1) return E = this.root + E, l.call(this, E, F, B), this;
          if (p(E)) {
            var z = E;
            return this.filter(function($, le) {
              return !le.dir && z.test($);
            });
          }
          var C = this.files[this.root + E];
          return C && !C.dir ? C : null;
        }, folder: function(E) {
          if (!E) return this;
          if (p(E)) return this.filter(function(C, $) {
            return $.dir && E.test(C);
          });
          var F = this.root + E, B = w.call(this, F), z = this.clone();
          return z.root = B.name, z;
        }, remove: function(E) {
          E = this.root + E;
          var F = this.files[E];
          if (F || (E.slice(-1) !== "/" && (E += "/"), F = this.files[E]), F && !F.dir) delete this.files[E];
          else for (var B = this.filter(function(C, $) {
            return $.name.slice(0, E.length) === E;
          }), z = 0; z < B.length; z++) delete this.files[B[z].name];
          return this;
        }, generate: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, generateInternalStream: function(E) {
          var F, B = {};
          try {
            if ((B = a.extend(E || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: f.utf8encode })).type = B.type.toLowerCase(), B.compression = B.compression.toUpperCase(), B.type === "binarystring" && (B.type = "string"), !B.type) throw new Error("No output type specified.");
            a.checkSupport(B.type), B.platform !== "darwin" && B.platform !== "freebsd" && B.platform !== "linux" && B.platform !== "sunos" || (B.platform = "UNIX"), B.platform === "win32" && (B.platform = "DOS");
            var z = B.comment || this.comment || "";
            F = b.generateWorker(this, B, z);
          } catch (C) {
            (F = new h("error")).error(C);
          }
          return new A(F, B.type || "string", B.mimeType);
        }, generateAsync: function(E, F) {
          return this.generateInternalStream(E).accumulate(F);
        }, generateNodeStream: function(E, F) {
          return (E = E || {}).type || (E.type = "nodebuffer"), this.generateInternalStream(E).toNodejsStream(F);
        } };
        n.exports = c;
      }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(r, n, o) {
        n.exports = r("stream");
      }, { stream: void 0 }], 17: [function(r, n, o) {
        var l = r("./DataReader");
        function f(a) {
          l.call(this, a);
          for (var h = 0; h < this.data.length; h++) a[h] = 255 & a[h];
        }
        r("../utils").inherits(f, l), f.prototype.byteAt = function(a) {
          return this.data[this.zero + a];
        }, f.prototype.lastIndexOfSignature = function(a) {
          for (var h = a.charCodeAt(0), A = a.charCodeAt(1), S = a.charCodeAt(2), k = a.charCodeAt(3), I = this.length - 4; 0 <= I; --I) if (this.data[I] === h && this.data[I + 1] === A && this.data[I + 2] === S && this.data[I + 3] === k) return I - this.zero;
          return -1;
        }, f.prototype.readAndCheckSignature = function(a) {
          var h = a.charCodeAt(0), A = a.charCodeAt(1), S = a.charCodeAt(2), k = a.charCodeAt(3), I = this.readData(4);
          return h === I[0] && A === I[1] && S === I[2] && k === I[3];
        }, f.prototype.readData = function(a) {
          if (this.checkOffset(a), a === 0) return [];
          var h = this.data.slice(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, h;
        }, n.exports = f;
      }, { "../utils": 32, "./DataReader": 18 }], 18: [function(r, n, o) {
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
          var h, A = 0;
          for (this.checkOffset(a), h = this.index + a - 1; h >= this.index; h--) A = (A << 8) + this.byteAt(h);
          return this.index += a, A;
        }, readString: function(a) {
          return l.transformTo("string", this.readData(a));
        }, readData: function() {
        }, lastIndexOfSignature: function() {
        }, readAndCheckSignature: function() {
        }, readDate: function() {
          var a = this.readInt(4);
          return new Date(Date.UTC(1980 + (a >> 25 & 127), (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1));
        } }, n.exports = f;
      }, { "../utils": 32 }], 19: [function(r, n, o) {
        var l = r("./Uint8ArrayReader");
        function f(a) {
          l.call(this, a);
        }
        r("../utils").inherits(f, l), f.prototype.readData = function(a) {
          this.checkOffset(a);
          var h = this.data.slice(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, h;
        }, n.exports = f;
      }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(r, n, o) {
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
      }, { "../utils": 32, "./DataReader": 18 }], 21: [function(r, n, o) {
        var l = r("./ArrayReader");
        function f(a) {
          l.call(this, a);
        }
        r("../utils").inherits(f, l), f.prototype.readData = function(a) {
          if (this.checkOffset(a), a === 0) return new Uint8Array(0);
          var h = this.data.subarray(this.zero + this.index, this.zero + this.index + a);
          return this.index += a, h;
        }, n.exports = f;
      }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(r, n, o) {
        var l = r("../utils"), f = r("../support"), a = r("./ArrayReader"), h = r("./StringReader"), A = r("./NodeBufferReader"), S = r("./Uint8ArrayReader");
        n.exports = function(k) {
          var I = l.getTypeOf(k);
          return l.checkSupport(I), I !== "string" || f.uint8array ? I === "nodebuffer" ? new A(k) : f.uint8array ? new S(l.transformTo("uint8array", k)) : new a(l.transformTo("array", k)) : new h(k);
        };
      }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(r, n, o) {
        o.LOCAL_FILE_HEADER = "PK", o.CENTRAL_FILE_HEADER = "PK", o.CENTRAL_DIRECTORY_END = "PK", o.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", o.ZIP64_CENTRAL_DIRECTORY_END = "PK", o.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}], 24: [function(r, n, o) {
        var l = r("./GenericWorker"), f = r("../utils");
        function a(h) {
          l.call(this, "ConvertWorker to " + h), this.destType = h;
        }
        f.inherits(a, l), a.prototype.processChunk = function(h) {
          this.push({ data: f.transformTo(this.destType, h.data), meta: h.meta });
        }, n.exports = a;
      }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(r, n, o) {
        var l = r("./GenericWorker"), f = r("../crc32");
        function a() {
          l.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        r("../utils").inherits(a, l), a.prototype.processChunk = function(h) {
          this.streamInfo.crc32 = f(h.data, this.streamInfo.crc32 || 0), this.push(h);
        }, n.exports = a;
      }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(r, n, o) {
        var l = r("../utils"), f = r("./GenericWorker");
        function a(h) {
          f.call(this, "DataLengthProbe for " + h), this.propName = h, this.withStreamInfo(h, 0);
        }
        l.inherits(a, f), a.prototype.processChunk = function(h) {
          if (h) {
            var A = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = A + h.data.length;
          }
          f.prototype.processChunk.call(this, h);
        }, n.exports = a;
      }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(r, n, o) {
        var l = r("../utils"), f = r("./GenericWorker");
        function a(h) {
          f.call(this, "DataWorker");
          var A = this;
          this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, h.then(function(S) {
            A.dataIsReady = !0, A.data = S, A.max = S && S.length || 0, A.type = l.getTypeOf(S), A.isPaused || A._tickAndRepeat();
          }, function(S) {
            A.error(S);
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
          var h = null, A = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              h = this.data.substring(this.index, A);
              break;
            case "uint8array":
              h = this.data.subarray(this.index, A);
              break;
            case "array":
            case "nodebuffer":
              h = this.data.slice(this.index, A);
          }
          return this.index = A, this.push({ data: h, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
        }, n.exports = a;
      }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(r, n, o) {
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
      }, {}], 29: [function(r, n, o) {
        var l = r("../utils"), f = r("./ConvertWorker"), a = r("./GenericWorker"), h = r("../base64"), A = r("../support"), S = r("../external"), k = null;
        if (A.nodestream) try {
          k = r("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function I(R, g) {
          return new S.Promise(function(T, u) {
            var w = [], p = R._internalType, c = R._outputType, E = R._mimeType;
            R.on("data", function(F, B) {
              w.push(F), g && g(B);
            }).on("error", function(F) {
              w = [], u(F);
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
                })(p, w), E);
                T(F);
              } catch (B) {
                u(B);
              }
              w = [];
            }).resume();
          });
        }
        function b(R, g, T) {
          var u = g;
          switch (g) {
            case "blob":
            case "arraybuffer":
              u = "uint8array";
              break;
            case "base64":
              u = "string";
          }
          try {
            this._internalType = u, this._outputType = g, this._mimeType = T, l.checkSupport(u), this._worker = R.pipe(new f(u)), R.lock();
          } catch (w) {
            this._worker = new a("error"), this._worker.error(w);
          }
        }
        b.prototype = { accumulate: function(R) {
          return I(this, R);
        }, on: function(R, g) {
          var T = this;
          return R === "data" ? this._worker.on(R, function(u) {
            g.call(T, u.data, u.meta);
          }) : this._worker.on(R, function() {
            l.delay(g, arguments, T);
          }), this;
        }, resume: function() {
          return l.delay(this._worker.resume, [], this._worker), this;
        }, pause: function() {
          return this._worker.pause(), this;
        }, toNodejsStream: function(R) {
          if (l.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
          return new k(this, { objectMode: this._outputType !== "nodebuffer" }, R);
        } }, n.exports = b;
      }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(r, n, o) {
        if (o.base64 = !0, o.array = !0, o.string = !0, o.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", o.nodebuffer = typeof Buffer < "u", o.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") o.blob = !1;
        else {
          var l = new ArrayBuffer(0);
          try {
            o.blob = new Blob([l], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var f = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              f.append(l), o.blob = f.getBlob("application/zip").size === 0;
            } catch {
              o.blob = !1;
            }
          }
        }
        try {
          o.nodestream = !!r("readable-stream").Readable;
        } catch {
          o.nodestream = !1;
        }
      }, { "readable-stream": 16 }], 31: [function(r, n, o) {
        for (var l = r("./utils"), f = r("./support"), a = r("./nodejsUtils"), h = r("./stream/GenericWorker"), A = new Array(256), S = 0; S < 256; S++) A[S] = 252 <= S ? 6 : 248 <= S ? 5 : 240 <= S ? 4 : 224 <= S ? 3 : 192 <= S ? 2 : 1;
        A[254] = A[254] = 1;
        function k() {
          h.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function I() {
          h.call(this, "utf-8 encode");
        }
        o.utf8encode = function(b) {
          return f.nodebuffer ? a.newBufferFrom(b, "utf-8") : (function(R) {
            var g, T, u, w, p, c = R.length, E = 0;
            for (w = 0; w < c; w++) (64512 & (T = R.charCodeAt(w))) == 55296 && w + 1 < c && (64512 & (u = R.charCodeAt(w + 1))) == 56320 && (T = 65536 + (T - 55296 << 10) + (u - 56320), w++), E += T < 128 ? 1 : T < 2048 ? 2 : T < 65536 ? 3 : 4;
            for (g = f.uint8array ? new Uint8Array(E) : new Array(E), w = p = 0; p < E; w++) (64512 & (T = R.charCodeAt(w))) == 55296 && w + 1 < c && (64512 & (u = R.charCodeAt(w + 1))) == 56320 && (T = 65536 + (T - 55296 << 10) + (u - 56320), w++), T < 128 ? g[p++] = T : (T < 2048 ? g[p++] = 192 | T >>> 6 : (T < 65536 ? g[p++] = 224 | T >>> 12 : (g[p++] = 240 | T >>> 18, g[p++] = 128 | T >>> 12 & 63), g[p++] = 128 | T >>> 6 & 63), g[p++] = 128 | 63 & T);
            return g;
          })(b);
        }, o.utf8decode = function(b) {
          return f.nodebuffer ? l.transformTo("nodebuffer", b).toString("utf-8") : (function(R) {
            var g, T, u, w, p = R.length, c = new Array(2 * p);
            for (g = T = 0; g < p; ) if ((u = R[g++]) < 128) c[T++] = u;
            else if (4 < (w = A[u])) c[T++] = 65533, g += w - 1;
            else {
              for (u &= w === 2 ? 31 : w === 3 ? 15 : 7; 1 < w && g < p; ) u = u << 6 | 63 & R[g++], w--;
              1 < w ? c[T++] = 65533 : u < 65536 ? c[T++] = u : (u -= 65536, c[T++] = 55296 | u >> 10 & 1023, c[T++] = 56320 | 1023 & u);
            }
            return c.length !== T && (c.subarray ? c = c.subarray(0, T) : c.length = T), l.applyFromCharCode(c);
          })(b = l.transformTo(f.uint8array ? "uint8array" : "array", b));
        }, l.inherits(k, h), k.prototype.processChunk = function(b) {
          var R = l.transformTo(f.uint8array ? "uint8array" : "array", b.data);
          if (this.leftOver && this.leftOver.length) {
            if (f.uint8array) {
              var g = R;
              (R = new Uint8Array(g.length + this.leftOver.length)).set(this.leftOver, 0), R.set(g, this.leftOver.length);
            } else R = this.leftOver.concat(R);
            this.leftOver = null;
          }
          var T = (function(w, p) {
            var c;
            for ((p = p || w.length) > w.length && (p = w.length), c = p - 1; 0 <= c && (192 & w[c]) == 128; ) c--;
            return c < 0 || c === 0 ? p : c + A[w[c]] > p ? c : p;
          })(R), u = R;
          T !== R.length && (f.uint8array ? (u = R.subarray(0, T), this.leftOver = R.subarray(T, R.length)) : (u = R.slice(0, T), this.leftOver = R.slice(T, R.length))), this.push({ data: o.utf8decode(u), meta: b.meta });
        }, k.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({ data: o.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
        }, o.Utf8DecodeWorker = k, l.inherits(I, h), I.prototype.processChunk = function(b) {
          this.push({ data: o.utf8encode(b.data), meta: b.meta });
        }, o.Utf8EncodeWorker = I;
      }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(r, n, o) {
        var l = r("./support"), f = r("./base64"), a = r("./nodejsUtils"), h = r("./external");
        function A(g) {
          return g;
        }
        function S(g, T) {
          for (var u = 0; u < g.length; ++u) T[u] = 255 & g.charCodeAt(u);
          return T;
        }
        r("setimmediate"), o.newBlob = function(g, T) {
          o.checkSupport("blob");
          try {
            return new Blob([g], { type: T });
          } catch {
            try {
              var u = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return u.append(g), u.getBlob(T);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var k = { stringifyByChunk: function(g, T, u) {
          var w = [], p = 0, c = g.length;
          if (c <= u) return String.fromCharCode.apply(null, g);
          for (; p < c; ) T === "array" || T === "nodebuffer" ? w.push(String.fromCharCode.apply(null, g.slice(p, Math.min(p + u, c)))) : w.push(String.fromCharCode.apply(null, g.subarray(p, Math.min(p + u, c)))), p += u;
          return w.join("");
        }, stringifyByChar: function(g) {
          for (var T = "", u = 0; u < g.length; u++) T += String.fromCharCode(g[u]);
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
        function I(g) {
          var T = 65536, u = o.getTypeOf(g), w = !0;
          if (u === "uint8array" ? w = k.applyCanBeUsed.uint8array : u === "nodebuffer" && (w = k.applyCanBeUsed.nodebuffer), w) for (; 1 < T; ) try {
            return k.stringifyByChunk(g, u, T);
          } catch {
            T = Math.floor(T / 2);
          }
          return k.stringifyByChar(g);
        }
        function b(g, T) {
          for (var u = 0; u < g.length; u++) T[u] = g[u];
          return T;
        }
        o.applyFromCharCode = I;
        var R = {};
        R.string = { string: A, array: function(g) {
          return S(g, new Array(g.length));
        }, arraybuffer: function(g) {
          return R.string.uint8array(g).buffer;
        }, uint8array: function(g) {
          return S(g, new Uint8Array(g.length));
        }, nodebuffer: function(g) {
          return S(g, a.allocBuffer(g.length));
        } }, R.array = { string: I, array: A, arraybuffer: function(g) {
          return new Uint8Array(g).buffer;
        }, uint8array: function(g) {
          return new Uint8Array(g);
        }, nodebuffer: function(g) {
          return a.newBufferFrom(g);
        } }, R.arraybuffer = { string: function(g) {
          return I(new Uint8Array(g));
        }, array: function(g) {
          return b(new Uint8Array(g), new Array(g.byteLength));
        }, arraybuffer: A, uint8array: function(g) {
          return new Uint8Array(g);
        }, nodebuffer: function(g) {
          return a.newBufferFrom(new Uint8Array(g));
        } }, R.uint8array = { string: I, array: function(g) {
          return b(g, new Array(g.length));
        }, arraybuffer: function(g) {
          return g.buffer;
        }, uint8array: A, nodebuffer: function(g) {
          return a.newBufferFrom(g);
        } }, R.nodebuffer = { string: I, array: function(g) {
          return b(g, new Array(g.length));
        }, arraybuffer: function(g) {
          return R.nodebuffer.uint8array(g).buffer;
        }, uint8array: function(g) {
          return b(g, new Uint8Array(g.length));
        }, nodebuffer: A }, o.transformTo = function(g, T) {
          if (T = T || "", !g) return T;
          o.checkSupport(g);
          var u = o.getTypeOf(T);
          return R[u][g](T);
        }, o.resolve = function(g) {
          for (var T = g.split("/"), u = [], w = 0; w < T.length; w++) {
            var p = T[w];
            p === "." || p === "" && w !== 0 && w !== T.length - 1 || (p === ".." ? u.pop() : u.push(p));
          }
          return u.join("/");
        }, o.getTypeOf = function(g) {
          return typeof g == "string" ? "string" : Object.prototype.toString.call(g) === "[object Array]" ? "array" : l.nodebuffer && a.isBuffer(g) ? "nodebuffer" : l.uint8array && g instanceof Uint8Array ? "uint8array" : l.arraybuffer && g instanceof ArrayBuffer ? "arraybuffer" : void 0;
        }, o.checkSupport = function(g) {
          if (!l[g.toLowerCase()]) throw new Error(g + " is not supported by this platform");
        }, o.MAX_VALUE_16BITS = 65535, o.MAX_VALUE_32BITS = -1, o.pretty = function(g) {
          var T, u, w = "";
          for (u = 0; u < (g || "").length; u++) w += "\\x" + ((T = g.charCodeAt(u)) < 16 ? "0" : "") + T.toString(16).toUpperCase();
          return w;
        }, o.delay = function(g, T, u) {
          setImmediate(function() {
            g.apply(u || null, T || []);
          });
        }, o.inherits = function(g, T) {
          function u() {
          }
          u.prototype = T.prototype, g.prototype = new u();
        }, o.extend = function() {
          var g, T, u = {};
          for (g = 0; g < arguments.length; g++) for (T in arguments[g]) Object.prototype.hasOwnProperty.call(arguments[g], T) && u[T] === void 0 && (u[T] = arguments[g][T]);
          return u;
        }, o.prepareContent = function(g, T, u, w, p) {
          return h.Promise.resolve(T).then(function(c) {
            return l.blob && (c instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(c)) !== -1) && typeof FileReader < "u" ? new h.Promise(function(E, F) {
              var B = new FileReader();
              B.onload = function(z) {
                E(z.target.result);
              }, B.onerror = function(z) {
                F(z.target.error);
              }, B.readAsArrayBuffer(c);
            }) : c;
          }).then(function(c) {
            var E = o.getTypeOf(c);
            return E ? (E === "arraybuffer" ? c = o.transformTo("uint8array", c) : E === "string" && (p ? c = f.decode(c) : u && w !== !0 && (c = (function(F) {
              return S(F, l.uint8array ? new Uint8Array(F.length) : new Array(F.length));
            })(c))), c) : h.Promise.reject(new Error("Can't read the data of '" + g + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(r, n, o) {
        var l = r("./reader/readerFor"), f = r("./utils"), a = r("./signature"), h = r("./zipEntry"), A = r("./support");
        function S(k) {
          this.files = [], this.loadOptions = k;
        }
        S.prototype = { checkSignature: function(k) {
          if (!this.reader.readAndCheckSignature(k)) {
            this.reader.index -= 4;
            var I = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature (" + f.pretty(I) + ", expected " + f.pretty(k) + ")");
          }
        }, isSignature: function(k, I) {
          var b = this.reader.index;
          this.reader.setIndex(k);
          var R = this.reader.readString(4) === I;
          return this.reader.setIndex(b), R;
        }, readBlockEndOfCentral: function() {
          this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
          var k = this.reader.readData(this.zipCommentLength), I = A.uint8array ? "uint8array" : "array", b = f.transformTo(I, k);
          this.zipComment = this.loadOptions.decodeFileName(b);
        }, readBlockZip64EndOfCentral: function() {
          this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
          for (var k, I, b, R = this.zip64EndOfCentralSize - 44; 0 < R; ) k = this.reader.readInt(2), I = this.reader.readInt(4), b = this.reader.readData(I), this.zip64ExtensibleData[k] = { id: k, length: I, value: b };
        }, readBlockZip64EndOfCentralLocator: function() {
          if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
        }, readLocalFiles: function() {
          var k, I;
          for (k = 0; k < this.files.length; k++) I = this.files[k], this.reader.setIndex(I.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), I.readLocalPart(this.reader), I.handleUTF8(), I.processAttributes();
        }, readCentralDir: function() {
          var k;
          for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER); ) (k = new h({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(k);
          if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        }, readEndOfCentral: function() {
          var k = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
          if (k < 0) throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
          this.reader.setIndex(k);
          var I = k;
          if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === f.MAX_VALUE_16BITS || this.diskWithCentralDirStart === f.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === f.MAX_VALUE_16BITS || this.centralDirRecords === f.MAX_VALUE_16BITS || this.centralDirSize === f.MAX_VALUE_32BITS || this.centralDirOffset === f.MAX_VALUE_32BITS) {
            if (this.zip64 = !0, (k = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            if (this.reader.setIndex(k), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
          }
          var b = this.centralDirOffset + this.centralDirSize;
          this.zip64 && (b += 20, b += 12 + this.zip64EndOfCentralSize);
          var R = I - b;
          if (0 < R) this.isSignature(I, a.CENTRAL_FILE_HEADER) || (this.reader.zero = R);
          else if (R < 0) throw new Error("Corrupted zip: missing " + Math.abs(R) + " bytes.");
        }, prepareReader: function(k) {
          this.reader = l(k);
        }, load: function(k) {
          this.prepareReader(k), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
        } }, n.exports = S;
      }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(r, n, o) {
        var l = r("./reader/readerFor"), f = r("./utils"), a = r("./compressedObject"), h = r("./crc32"), A = r("./utf8"), S = r("./compressions"), k = r("./support");
        function I(b, R) {
          this.options = b, this.loadOptions = R;
        }
        I.prototype = { isEncrypted: function() {
          return (1 & this.bitFlag) == 1;
        }, useUTF8: function() {
          return (2048 & this.bitFlag) == 2048;
        }, readLocalPart: function(b) {
          var R, g;
          if (b.skip(22), this.fileNameLength = b.readInt(2), g = b.readInt(2), this.fileName = b.readData(this.fileNameLength), b.skip(g), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
          if ((R = (function(T) {
            for (var u in S) if (Object.prototype.hasOwnProperty.call(S, u) && S[u].magic === T) return S[u];
            return null;
          })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + f.pretty(this.compressionMethod) + " unknown (inner file : " + f.transformTo("string", this.fileName) + ")");
          this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, R, b.readData(this.compressedSize));
        }, readCentralPart: function(b) {
          this.versionMadeBy = b.readInt(2), b.skip(2), this.bitFlag = b.readInt(2), this.compressionMethod = b.readString(2), this.date = b.readDate(), this.crc32 = b.readInt(4), this.compressedSize = b.readInt(4), this.uncompressedSize = b.readInt(4);
          var R = b.readInt(2);
          if (this.extraFieldsLength = b.readInt(2), this.fileCommentLength = b.readInt(2), this.diskNumberStart = b.readInt(2), this.internalFileAttributes = b.readInt(2), this.externalFileAttributes = b.readInt(4), this.localHeaderOffset = b.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
          b.skip(R), this.readExtraFields(b), this.parseZIP64ExtraField(b), this.fileComment = b.readData(this.fileCommentLength);
        }, processAttributes: function() {
          this.unixPermissions = null, this.dosPermissions = null;
          var b = this.versionMadeBy >> 8;
          this.dir = !!(16 & this.externalFileAttributes), b == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), b == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
        }, parseZIP64ExtraField: function() {
          if (this.extraFields[1]) {
            var b = l(this.extraFields[1].value);
            this.uncompressedSize === f.MAX_VALUE_32BITS && (this.uncompressedSize = b.readInt(8)), this.compressedSize === f.MAX_VALUE_32BITS && (this.compressedSize = b.readInt(8)), this.localHeaderOffset === f.MAX_VALUE_32BITS && (this.localHeaderOffset = b.readInt(8)), this.diskNumberStart === f.MAX_VALUE_32BITS && (this.diskNumberStart = b.readInt(4));
          }
        }, readExtraFields: function(b) {
          var R, g, T, u = b.index + this.extraFieldsLength;
          for (this.extraFields || (this.extraFields = {}); b.index + 4 < u; ) R = b.readInt(2), g = b.readInt(2), T = b.readData(g), this.extraFields[R] = { id: R, length: g, value: T };
          b.setIndex(u);
        }, handleUTF8: function() {
          var b = k.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) this.fileNameStr = A.utf8decode(this.fileName), this.fileCommentStr = A.utf8decode(this.fileComment);
          else {
            var R = this.findExtraFieldUnicodePath();
            if (R !== null) this.fileNameStr = R;
            else {
              var g = f.transformTo(b, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(g);
            }
            var T = this.findExtraFieldUnicodeComment();
            if (T !== null) this.fileCommentStr = T;
            else {
              var u = f.transformTo(b, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(u);
            }
          }
        }, findExtraFieldUnicodePath: function() {
          var b = this.extraFields[28789];
          if (b) {
            var R = l(b.value);
            return R.readInt(1) !== 1 || h(this.fileName) !== R.readInt(4) ? null : A.utf8decode(R.readData(b.length - 5));
          }
          return null;
        }, findExtraFieldUnicodeComment: function() {
          var b = this.extraFields[25461];
          if (b) {
            var R = l(b.value);
            return R.readInt(1) !== 1 || h(this.fileComment) !== R.readInt(4) ? null : A.utf8decode(R.readData(b.length - 5));
          }
          return null;
        } }, n.exports = I;
      }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(r, n, o) {
        function l(R, g, T) {
          this.name = R, this.dir = T.dir, this.date = T.date, this.comment = T.comment, this.unixPermissions = T.unixPermissions, this.dosPermissions = T.dosPermissions, this._data = g, this._dataBinary = T.binary, this.options = { compression: T.compression, compressionOptions: T.compressionOptions };
        }
        var f = r("./stream/StreamHelper"), a = r("./stream/DataWorker"), h = r("./utf8"), A = r("./compressedObject"), S = r("./stream/GenericWorker");
        l.prototype = { internalStream: function(R) {
          var g = null, T = "string";
          try {
            if (!R) throw new Error("No output type specified.");
            var u = (T = R.toLowerCase()) === "string" || T === "text";
            T !== "binarystring" && T !== "text" || (T = "string"), g = this._decompressWorker();
            var w = !this._dataBinary;
            w && !u && (g = g.pipe(new h.Utf8EncodeWorker())), !w && u && (g = g.pipe(new h.Utf8DecodeWorker()));
          } catch (p) {
            (g = new S("error")).error(p);
          }
          return new f(g, T, "");
        }, async: function(R, g) {
          return this.internalStream(R).accumulate(g);
        }, nodeStream: function(R, g) {
          return this.internalStream(R || "nodebuffer").toNodejsStream(g);
        }, _compressWorker: function(R, g) {
          if (this._data instanceof A && this._data.compression.magic === R.magic) return this._data.getCompressedWorker();
          var T = this._decompressWorker();
          return this._dataBinary || (T = T.pipe(new h.Utf8EncodeWorker())), A.createWorkerFrom(T, R, g);
        }, _decompressWorker: function() {
          return this._data instanceof A ? this._data.getContentWorker() : this._data instanceof S ? this._data : new a(this._data);
        } };
        for (var k = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], I = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, b = 0; b < k.length; b++) l.prototype[k[b]] = I;
        n.exports = l;
      }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(r, n, o) {
        (function(l) {
          var f, a, h = l.MutationObserver || l.WebKitMutationObserver;
          if (h) {
            var A = 0, S = new h(R), k = l.document.createTextNode("");
            S.observe(k, { characterData: !0 }), f = function() {
              k.data = A = ++A % 2;
            };
          } else if (l.setImmediate || l.MessageChannel === void 0) f = "document" in l && "onreadystatechange" in l.document.createElement("script") ? function() {
            var g = l.document.createElement("script");
            g.onreadystatechange = function() {
              R(), g.onreadystatechange = null, g.parentNode.removeChild(g), g = null;
            }, l.document.documentElement.appendChild(g);
          } : function() {
            setTimeout(R, 0);
          };
          else {
            var I = new l.MessageChannel();
            I.port1.onmessage = R, f = function() {
              I.port2.postMessage(0);
            };
          }
          var b = [];
          function R() {
            var g, T;
            a = !0;
            for (var u = b.length; u; ) {
              for (T = b, b = [], g = -1; ++g < u; ) T[g]();
              u = b.length;
            }
            a = !1;
          }
          n.exports = function(g) {
            b.push(g) !== 1 || a || f();
          };
        }).call(this, typeof Fe < "u" ? Fe : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}], 37: [function(r, n, o) {
        var l = r("immediate");
        function f() {
        }
        var a = {}, h = ["REJECTED"], A = ["FULFILLED"], S = ["PENDING"];
        function k(u) {
          if (typeof u != "function") throw new TypeError("resolver must be a function");
          this.state = S, this.queue = [], this.outcome = void 0, u !== f && g(this, u);
        }
        function I(u, w, p) {
          this.promise = u, typeof w == "function" && (this.onFulfilled = w, this.callFulfilled = this.otherCallFulfilled), typeof p == "function" && (this.onRejected = p, this.callRejected = this.otherCallRejected);
        }
        function b(u, w, p) {
          l(function() {
            var c;
            try {
              c = w(p);
            } catch (E) {
              return a.reject(u, E);
            }
            c === u ? a.reject(u, new TypeError("Cannot resolve promise with itself")) : a.resolve(u, c);
          });
        }
        function R(u) {
          var w = u && u.then;
          if (u && (typeof u == "object" || typeof u == "function") && typeof w == "function") return function() {
            w.apply(u, arguments);
          };
        }
        function g(u, w) {
          var p = !1;
          function c(B) {
            p || (p = !0, a.reject(u, B));
          }
          function E(B) {
            p || (p = !0, a.resolve(u, B));
          }
          var F = T(function() {
            w(E, c);
          });
          F.status === "error" && c(F.value);
        }
        function T(u, w) {
          var p = {};
          try {
            p.value = u(w), p.status = "success";
          } catch (c) {
            p.status = "error", p.value = c;
          }
          return p;
        }
        (n.exports = k).prototype.finally = function(u) {
          if (typeof u != "function") return this;
          var w = this.constructor;
          return this.then(function(p) {
            return w.resolve(u()).then(function() {
              return p;
            });
          }, function(p) {
            return w.resolve(u()).then(function() {
              throw p;
            });
          });
        }, k.prototype.catch = function(u) {
          return this.then(null, u);
        }, k.prototype.then = function(u, w) {
          if (typeof u != "function" && this.state === A || typeof w != "function" && this.state === h) return this;
          var p = new this.constructor(f);
          return this.state !== S ? b(p, this.state === A ? u : w, this.outcome) : this.queue.push(new I(p, u, w)), p;
        }, I.prototype.callFulfilled = function(u) {
          a.resolve(this.promise, u);
        }, I.prototype.otherCallFulfilled = function(u) {
          b(this.promise, this.onFulfilled, u);
        }, I.prototype.callRejected = function(u) {
          a.reject(this.promise, u);
        }, I.prototype.otherCallRejected = function(u) {
          b(this.promise, this.onRejected, u);
        }, a.resolve = function(u, w) {
          var p = T(R, w);
          if (p.status === "error") return a.reject(u, p.value);
          var c = p.value;
          if (c) g(u, c);
          else {
            u.state = A, u.outcome = w;
            for (var E = -1, F = u.queue.length; ++E < F; ) u.queue[E].callFulfilled(w);
          }
          return u;
        }, a.reject = function(u, w) {
          u.state = h, u.outcome = w;
          for (var p = -1, c = u.queue.length; ++p < c; ) u.queue[p].callRejected(w);
          return u;
        }, k.resolve = function(u) {
          return u instanceof this ? u : a.resolve(new this(f), u);
        }, k.reject = function(u) {
          var w = new this(f);
          return a.reject(w, u);
        }, k.all = function(u) {
          var w = this;
          if (Object.prototype.toString.call(u) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var p = u.length, c = !1;
          if (!p) return this.resolve([]);
          for (var E = new Array(p), F = 0, B = -1, z = new this(f); ++B < p; ) C(u[B], B);
          return z;
          function C($, le) {
            w.resolve($).then(function(N) {
              E[le] = N, ++F !== p || c || (c = !0, a.resolve(z, E));
            }, function(N) {
              c || (c = !0, a.reject(z, N));
            });
          }
        }, k.race = function(u) {
          var w = this;
          if (Object.prototype.toString.call(u) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var p = u.length, c = !1;
          if (!p) return this.resolve([]);
          for (var E = -1, F = new this(f); ++E < p; ) B = u[E], w.resolve(B).then(function(z) {
            c || (c = !0, a.resolve(F, z));
          }, function(z) {
            c || (c = !0, a.reject(F, z));
          });
          var B;
          return F;
        };
      }, { immediate: 36 }], 38: [function(r, n, o) {
        var l = {};
        (0, r("./lib/utils/common").assign)(l, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), n.exports = l;
      }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(r, n, o) {
        var l = r("./zlib/deflate"), f = r("./utils/common"), a = r("./utils/strings"), h = r("./zlib/messages"), A = r("./zlib/zstream"), S = Object.prototype.toString, k = 0, I = -1, b = 0, R = 8;
        function g(u) {
          if (!(this instanceof g)) return new g(u);
          this.options = f.assign({ level: I, method: R, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: b, to: "" }, u || {});
          var w = this.options;
          w.raw && 0 < w.windowBits ? w.windowBits = -w.windowBits : w.gzip && 0 < w.windowBits && w.windowBits < 16 && (w.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new A(), this.strm.avail_out = 0;
          var p = l.deflateInit2(this.strm, w.level, w.method, w.windowBits, w.memLevel, w.strategy);
          if (p !== k) throw new Error(h[p]);
          if (w.header && l.deflateSetHeader(this.strm, w.header), w.dictionary) {
            var c;
            if (c = typeof w.dictionary == "string" ? a.string2buf(w.dictionary) : S.call(w.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(w.dictionary) : w.dictionary, (p = l.deflateSetDictionary(this.strm, c)) !== k) throw new Error(h[p]);
            this._dict_set = !0;
          }
        }
        function T(u, w) {
          var p = new g(w);
          if (p.push(u, !0), p.err) throw p.msg || h[p.err];
          return p.result;
        }
        g.prototype.push = function(u, w) {
          var p, c, E = this.strm, F = this.options.chunkSize;
          if (this.ended) return !1;
          c = w === ~~w ? w : w === !0 ? 4 : 0, typeof u == "string" ? E.input = a.string2buf(u) : S.call(u) === "[object ArrayBuffer]" ? E.input = new Uint8Array(u) : E.input = u, E.next_in = 0, E.avail_in = E.input.length;
          do {
            if (E.avail_out === 0 && (E.output = new f.Buf8(F), E.next_out = 0, E.avail_out = F), (p = l.deflate(E, c)) !== 1 && p !== k) return this.onEnd(p), !(this.ended = !0);
            E.avail_out !== 0 && (E.avail_in !== 0 || c !== 4 && c !== 2) || (this.options.to === "string" ? this.onData(a.buf2binstring(f.shrinkBuf(E.output, E.next_out))) : this.onData(f.shrinkBuf(E.output, E.next_out)));
          } while ((0 < E.avail_in || E.avail_out === 0) && p !== 1);
          return c === 4 ? (p = l.deflateEnd(this.strm), this.onEnd(p), this.ended = !0, p === k) : c !== 2 || (this.onEnd(k), !(E.avail_out = 0));
        }, g.prototype.onData = function(u) {
          this.chunks.push(u);
        }, g.prototype.onEnd = function(u) {
          u === k && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = f.flattenChunks(this.chunks)), this.chunks = [], this.err = u, this.msg = this.strm.msg;
        }, o.Deflate = g, o.deflate = T, o.deflateRaw = function(u, w) {
          return (w = w || {}).raw = !0, T(u, w);
        }, o.gzip = function(u, w) {
          return (w = w || {}).gzip = !0, T(u, w);
        };
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(r, n, o) {
        var l = r("./zlib/inflate"), f = r("./utils/common"), a = r("./utils/strings"), h = r("./zlib/constants"), A = r("./zlib/messages"), S = r("./zlib/zstream"), k = r("./zlib/gzheader"), I = Object.prototype.toString;
        function b(g) {
          if (!(this instanceof b)) return new b(g);
          this.options = f.assign({ chunkSize: 16384, windowBits: 0, to: "" }, g || {});
          var T = this.options;
          T.raw && 0 <= T.windowBits && T.windowBits < 16 && (T.windowBits = -T.windowBits, T.windowBits === 0 && (T.windowBits = -15)), !(0 <= T.windowBits && T.windowBits < 16) || g && g.windowBits || (T.windowBits += 32), 15 < T.windowBits && T.windowBits < 48 && (15 & T.windowBits) == 0 && (T.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new S(), this.strm.avail_out = 0;
          var u = l.inflateInit2(this.strm, T.windowBits);
          if (u !== h.Z_OK) throw new Error(A[u]);
          this.header = new k(), l.inflateGetHeader(this.strm, this.header);
        }
        function R(g, T) {
          var u = new b(T);
          if (u.push(g, !0), u.err) throw u.msg || A[u.err];
          return u.result;
        }
        b.prototype.push = function(g, T) {
          var u, w, p, c, E, F, B = this.strm, z = this.options.chunkSize, C = this.options.dictionary, $ = !1;
          if (this.ended) return !1;
          w = T === ~~T ? T : T === !0 ? h.Z_FINISH : h.Z_NO_FLUSH, typeof g == "string" ? B.input = a.binstring2buf(g) : I.call(g) === "[object ArrayBuffer]" ? B.input = new Uint8Array(g) : B.input = g, B.next_in = 0, B.avail_in = B.input.length;
          do {
            if (B.avail_out === 0 && (B.output = new f.Buf8(z), B.next_out = 0, B.avail_out = z), (u = l.inflate(B, h.Z_NO_FLUSH)) === h.Z_NEED_DICT && C && (F = typeof C == "string" ? a.string2buf(C) : I.call(C) === "[object ArrayBuffer]" ? new Uint8Array(C) : C, u = l.inflateSetDictionary(this.strm, F)), u === h.Z_BUF_ERROR && $ === !0 && (u = h.Z_OK, $ = !1), u !== h.Z_STREAM_END && u !== h.Z_OK) return this.onEnd(u), !(this.ended = !0);
            B.next_out && (B.avail_out !== 0 && u !== h.Z_STREAM_END && (B.avail_in !== 0 || w !== h.Z_FINISH && w !== h.Z_SYNC_FLUSH) || (this.options.to === "string" ? (p = a.utf8border(B.output, B.next_out), c = B.next_out - p, E = a.buf2string(B.output, p), B.next_out = c, B.avail_out = z - c, c && f.arraySet(B.output, B.output, p, c, 0), this.onData(E)) : this.onData(f.shrinkBuf(B.output, B.next_out)))), B.avail_in === 0 && B.avail_out === 0 && ($ = !0);
          } while ((0 < B.avail_in || B.avail_out === 0) && u !== h.Z_STREAM_END);
          return u === h.Z_STREAM_END && (w = h.Z_FINISH), w === h.Z_FINISH ? (u = l.inflateEnd(this.strm), this.onEnd(u), this.ended = !0, u === h.Z_OK) : w !== h.Z_SYNC_FLUSH || (this.onEnd(h.Z_OK), !(B.avail_out = 0));
        }, b.prototype.onData = function(g) {
          this.chunks.push(g);
        }, b.prototype.onEnd = function(g) {
          g === h.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = f.flattenChunks(this.chunks)), this.chunks = [], this.err = g, this.msg = this.strm.msg;
        }, o.Inflate = b, o.inflate = R, o.inflateRaw = function(g, T) {
          return (T = T || {}).raw = !0, R(g, T);
        }, o.ungzip = R;
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(r, n, o) {
        var l = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        o.assign = function(h) {
          for (var A = Array.prototype.slice.call(arguments, 1); A.length; ) {
            var S = A.shift();
            if (S) {
              if (typeof S != "object") throw new TypeError(S + "must be non-object");
              for (var k in S) S.hasOwnProperty(k) && (h[k] = S[k]);
            }
          }
          return h;
        }, o.shrinkBuf = function(h, A) {
          return h.length === A ? h : h.subarray ? h.subarray(0, A) : (h.length = A, h);
        };
        var f = { arraySet: function(h, A, S, k, I) {
          if (A.subarray && h.subarray) h.set(A.subarray(S, S + k), I);
          else for (var b = 0; b < k; b++) h[I + b] = A[S + b];
        }, flattenChunks: function(h) {
          var A, S, k, I, b, R;
          for (A = k = 0, S = h.length; A < S; A++) k += h[A].length;
          for (R = new Uint8Array(k), A = I = 0, S = h.length; A < S; A++) b = h[A], R.set(b, I), I += b.length;
          return R;
        } }, a = { arraySet: function(h, A, S, k, I) {
          for (var b = 0; b < k; b++) h[I + b] = A[S + b];
        }, flattenChunks: function(h) {
          return [].concat.apply([], h);
        } };
        o.setTyped = function(h) {
          h ? (o.Buf8 = Uint8Array, o.Buf16 = Uint16Array, o.Buf32 = Int32Array, o.assign(o, f)) : (o.Buf8 = Array, o.Buf16 = Array, o.Buf32 = Array, o.assign(o, a));
        }, o.setTyped(l);
      }, {}], 42: [function(r, n, o) {
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
        for (var h = new l.Buf8(256), A = 0; A < 256; A++) h[A] = 252 <= A ? 6 : 248 <= A ? 5 : 240 <= A ? 4 : 224 <= A ? 3 : 192 <= A ? 2 : 1;
        function S(k, I) {
          if (I < 65537 && (k.subarray && a || !k.subarray && f)) return String.fromCharCode.apply(null, l.shrinkBuf(k, I));
          for (var b = "", R = 0; R < I; R++) b += String.fromCharCode(k[R]);
          return b;
        }
        h[254] = h[254] = 1, o.string2buf = function(k) {
          var I, b, R, g, T, u = k.length, w = 0;
          for (g = 0; g < u; g++) (64512 & (b = k.charCodeAt(g))) == 55296 && g + 1 < u && (64512 & (R = k.charCodeAt(g + 1))) == 56320 && (b = 65536 + (b - 55296 << 10) + (R - 56320), g++), w += b < 128 ? 1 : b < 2048 ? 2 : b < 65536 ? 3 : 4;
          for (I = new l.Buf8(w), g = T = 0; T < w; g++) (64512 & (b = k.charCodeAt(g))) == 55296 && g + 1 < u && (64512 & (R = k.charCodeAt(g + 1))) == 56320 && (b = 65536 + (b - 55296 << 10) + (R - 56320), g++), b < 128 ? I[T++] = b : (b < 2048 ? I[T++] = 192 | b >>> 6 : (b < 65536 ? I[T++] = 224 | b >>> 12 : (I[T++] = 240 | b >>> 18, I[T++] = 128 | b >>> 12 & 63), I[T++] = 128 | b >>> 6 & 63), I[T++] = 128 | 63 & b);
          return I;
        }, o.buf2binstring = function(k) {
          return S(k, k.length);
        }, o.binstring2buf = function(k) {
          for (var I = new l.Buf8(k.length), b = 0, R = I.length; b < R; b++) I[b] = k.charCodeAt(b);
          return I;
        }, o.buf2string = function(k, I) {
          var b, R, g, T, u = I || k.length, w = new Array(2 * u);
          for (b = R = 0; b < u; ) if ((g = k[b++]) < 128) w[R++] = g;
          else if (4 < (T = h[g])) w[R++] = 65533, b += T - 1;
          else {
            for (g &= T === 2 ? 31 : T === 3 ? 15 : 7; 1 < T && b < u; ) g = g << 6 | 63 & k[b++], T--;
            1 < T ? w[R++] = 65533 : g < 65536 ? w[R++] = g : (g -= 65536, w[R++] = 55296 | g >> 10 & 1023, w[R++] = 56320 | 1023 & g);
          }
          return S(w, R);
        }, o.utf8border = function(k, I) {
          var b;
          for ((I = I || k.length) > k.length && (I = k.length), b = I - 1; 0 <= b && (192 & k[b]) == 128; ) b--;
          return b < 0 || b === 0 ? I : b + h[k[b]] > I ? b : I;
        };
      }, { "./common": 41 }], 43: [function(r, n, o) {
        n.exports = function(l, f, a, h) {
          for (var A = 65535 & l | 0, S = l >>> 16 & 65535 | 0, k = 0; a !== 0; ) {
            for (a -= k = 2e3 < a ? 2e3 : a; S = S + (A = A + f[h++] | 0) | 0, --k; ) ;
            A %= 65521, S %= 65521;
          }
          return A | S << 16 | 0;
        };
      }, {}], 44: [function(r, n, o) {
        n.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
      }, {}], 45: [function(r, n, o) {
        var l = (function() {
          for (var f, a = [], h = 0; h < 256; h++) {
            f = h;
            for (var A = 0; A < 8; A++) f = 1 & f ? 3988292384 ^ f >>> 1 : f >>> 1;
            a[h] = f;
          }
          return a;
        })();
        n.exports = function(f, a, h, A) {
          var S = l, k = A + h;
          f ^= -1;
          for (var I = A; I < k; I++) f = f >>> 8 ^ S[255 & (f ^ a[I])];
          return -1 ^ f;
        };
      }, {}], 46: [function(r, n, o) {
        var l, f = r("../utils/common"), a = r("./trees"), h = r("./adler32"), A = r("./crc32"), S = r("./messages"), k = 0, I = 4, b = 0, R = -2, g = -1, T = 4, u = 2, w = 8, p = 9, c = 286, E = 30, F = 19, B = 2 * c + 1, z = 15, C = 3, $ = 258, le = $ + C + 1, N = 42, U = 113, v = 1, K = 2, ee = 3, H = 4;
        function ie(d, Y) {
          return d.msg = S[Y], Y;
        }
        function Q(d) {
          return (d << 1) - (4 < d ? 9 : 0);
        }
        function ce(d) {
          for (var Y = d.length; 0 <= --Y; ) d[Y] = 0;
        }
        function V(d) {
          var Y = d.state, x = Y.pending;
          x > d.avail_out && (x = d.avail_out), x !== 0 && (f.arraySet(d.output, Y.pending_buf, Y.pending_out, x, d.next_out), d.next_out += x, Y.pending_out += x, d.total_out += x, d.avail_out -= x, Y.pending -= x, Y.pending === 0 && (Y.pending_out = 0));
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
          var x, i, s = d.max_chain_length, m = d.strstart, L = d.prev_length, q = d.nice_match, j = d.strstart > d.w_size - le ? d.strstart - (d.w_size - le) : 0, ne = d.window, oe = d.w_mask, se = d.prev, he = d.strstart + $, de = ne[m + L - 1], ge = ne[m + L];
          d.prev_length >= d.good_match && (s >>= 2), q > d.lookahead && (q = d.lookahead);
          do
            if (ne[(x = Y) + L] === ge && ne[x + L - 1] === de && ne[x] === ne[m] && ne[++x] === ne[m + 1]) {
              m += 2, x++;
              do
                ;
              while (ne[++m] === ne[++x] && ne[++m] === ne[++x] && ne[++m] === ne[++x] && ne[++m] === ne[++x] && ne[++m] === ne[++x] && ne[++m] === ne[++x] && ne[++m] === ne[++x] && ne[++m] === ne[++x] && m < he);
              if (i = $ - (he - m), m = he - $, L < i) {
                if (d.match_start = Y, q <= (L = i)) break;
                de = ne[m + L - 1], ge = ne[m + L];
              }
            }
          while ((Y = se[Y & oe]) > j && --s != 0);
          return L <= d.lookahead ? L : d.lookahead;
        }
        function G(d) {
          var Y, x, i, s, m, L, q, j, ne, oe, se = d.w_size;
          do {
            if (s = d.window_size - d.lookahead - d.strstart, d.strstart >= se + (se - le)) {
              for (f.arraySet(d.window, d.window, se, se, 0), d.match_start -= se, d.strstart -= se, d.block_start -= se, Y = x = d.hash_size; i = d.head[--Y], d.head[Y] = se <= i ? i - se : 0, --x; ) ;
              for (Y = x = se; i = d.prev[--Y], d.prev[Y] = se <= i ? i - se : 0, --x; ) ;
              s += se;
            }
            if (d.strm.avail_in === 0) break;
            if (L = d.strm, q = d.window, j = d.strstart + d.lookahead, ne = s, oe = void 0, oe = L.avail_in, ne < oe && (oe = ne), x = oe === 0 ? 0 : (L.avail_in -= oe, f.arraySet(q, L.input, L.next_in, oe, j), L.state.wrap === 1 ? L.adler = h(L.adler, q, oe, j) : L.state.wrap === 2 && (L.adler = A(L.adler, q, oe, j)), L.next_in += oe, L.total_in += oe, oe), d.lookahead += x, d.lookahead + d.insert >= C) for (m = d.strstart - d.insert, d.ins_h = d.window[m], d.ins_h = (d.ins_h << d.hash_shift ^ d.window[m + 1]) & d.hash_mask; d.insert && (d.ins_h = (d.ins_h << d.hash_shift ^ d.window[m + C - 1]) & d.hash_mask, d.prev[m & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = m, m++, d.insert--, !(d.lookahead + d.insert < C)); ) ;
          } while (d.lookahead < le && d.strm.avail_in !== 0);
        }
        function _(d, Y) {
          for (var x, i; ; ) {
            if (d.lookahead < le) {
              if (G(d), d.lookahead < le && Y === k) return v;
              if (d.lookahead === 0) break;
            }
            if (x = 0, d.lookahead >= C && (d.ins_h = (d.ins_h << d.hash_shift ^ d.window[d.strstart + C - 1]) & d.hash_mask, x = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = d.strstart), x !== 0 && d.strstart - x <= d.w_size - le && (d.match_length = te(d, x)), d.match_length >= C) if (i = a._tr_tally(d, d.strstart - d.match_start, d.match_length - C), d.lookahead -= d.match_length, d.match_length <= d.max_lazy_match && d.lookahead >= C) {
              for (d.match_length--; d.strstart++, d.ins_h = (d.ins_h << d.hash_shift ^ d.window[d.strstart + C - 1]) & d.hash_mask, x = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = d.strstart, --d.match_length != 0; ) ;
              d.strstart++;
            } else d.strstart += d.match_length, d.match_length = 0, d.ins_h = d.window[d.strstart], d.ins_h = (d.ins_h << d.hash_shift ^ d.window[d.strstart + 1]) & d.hash_mask;
            else i = a._tr_tally(d, 0, d.window[d.strstart]), d.lookahead--, d.strstart++;
            if (i && (P(d, !1), d.strm.avail_out === 0)) return v;
          }
          return d.insert = d.strstart < C - 1 ? d.strstart : C - 1, Y === I ? (P(d, !0), d.strm.avail_out === 0 ? ee : H) : d.last_lit && (P(d, !1), d.strm.avail_out === 0) ? v : K;
        }
        function y(d, Y) {
          for (var x, i, s; ; ) {
            if (d.lookahead < le) {
              if (G(d), d.lookahead < le && Y === k) return v;
              if (d.lookahead === 0) break;
            }
            if (x = 0, d.lookahead >= C && (d.ins_h = (d.ins_h << d.hash_shift ^ d.window[d.strstart + C - 1]) & d.hash_mask, x = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = d.strstart), d.prev_length = d.match_length, d.prev_match = d.match_start, d.match_length = C - 1, x !== 0 && d.prev_length < d.max_lazy_match && d.strstart - x <= d.w_size - le && (d.match_length = te(d, x), d.match_length <= 5 && (d.strategy === 1 || d.match_length === C && 4096 < d.strstart - d.match_start) && (d.match_length = C - 1)), d.prev_length >= C && d.match_length <= d.prev_length) {
              for (s = d.strstart + d.lookahead - C, i = a._tr_tally(d, d.strstart - 1 - d.prev_match, d.prev_length - C), d.lookahead -= d.prev_length - 1, d.prev_length -= 2; ++d.strstart <= s && (d.ins_h = (d.ins_h << d.hash_shift ^ d.window[d.strstart + C - 1]) & d.hash_mask, x = d.prev[d.strstart & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = d.strstart), --d.prev_length != 0; ) ;
              if (d.match_available = 0, d.match_length = C - 1, d.strstart++, i && (P(d, !1), d.strm.avail_out === 0)) return v;
            } else if (d.match_available) {
              if ((i = a._tr_tally(d, 0, d.window[d.strstart - 1])) && P(d, !1), d.strstart++, d.lookahead--, d.strm.avail_out === 0) return v;
            } else d.match_available = 1, d.strstart++, d.lookahead--;
          }
          return d.match_available && (i = a._tr_tally(d, 0, d.window[d.strstart - 1]), d.match_available = 0), d.insert = d.strstart < C - 1 ? d.strstart : C - 1, Y === I ? (P(d, !0), d.strm.avail_out === 0 ? ee : H) : d.last_lit && (P(d, !1), d.strm.avail_out === 0) ? v : K;
        }
        function W(d, Y, x, i, s) {
          this.good_length = d, this.max_lazy = Y, this.nice_length = x, this.max_chain = i, this.func = s;
        }
        function M() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = w, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new f.Buf16(2 * B), this.dyn_dtree = new f.Buf16(2 * (2 * E + 1)), this.bl_tree = new f.Buf16(2 * (2 * F + 1)), ce(this.dyn_ltree), ce(this.dyn_dtree), ce(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new f.Buf16(z + 1), this.heap = new f.Buf16(2 * c + 1), ce(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new f.Buf16(2 * c + 1), ce(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function O(d) {
          var Y;
          return d && d.state ? (d.total_in = d.total_out = 0, d.data_type = u, (Y = d.state).pending = 0, Y.pending_out = 0, Y.wrap < 0 && (Y.wrap = -Y.wrap), Y.status = Y.wrap ? N : U, d.adler = Y.wrap === 2 ? 0 : 1, Y.last_flush = k, a._tr_init(Y), b) : ie(d, R);
        }
        function D(d) {
          var Y = O(d);
          return Y === b && (function(x) {
            x.window_size = 2 * x.w_size, ce(x.head), x.max_lazy_match = l[x.level].max_lazy, x.good_match = l[x.level].good_length, x.nice_match = l[x.level].nice_length, x.max_chain_length = l[x.level].max_chain, x.strstart = 0, x.block_start = 0, x.lookahead = 0, x.insert = 0, x.match_length = x.prev_length = C - 1, x.match_available = 0, x.ins_h = 0;
          })(d.state), Y;
        }
        function J(d, Y, x, i, s, m) {
          if (!d) return R;
          var L = 1;
          if (Y === g && (Y = 6), i < 0 ? (L = 0, i = -i) : 15 < i && (L = 2, i -= 16), s < 1 || p < s || x !== w || i < 8 || 15 < i || Y < 0 || 9 < Y || m < 0 || T < m) return ie(d, R);
          i === 8 && (i = 9);
          var q = new M();
          return (d.state = q).strm = d, q.wrap = L, q.gzhead = null, q.w_bits = i, q.w_size = 1 << q.w_bits, q.w_mask = q.w_size - 1, q.hash_bits = s + 7, q.hash_size = 1 << q.hash_bits, q.hash_mask = q.hash_size - 1, q.hash_shift = ~~((q.hash_bits + C - 1) / C), q.window = new f.Buf8(2 * q.w_size), q.head = new f.Buf16(q.hash_size), q.prev = new f.Buf16(q.w_size), q.lit_bufsize = 1 << s + 6, q.pending_buf_size = 4 * q.lit_bufsize, q.pending_buf = new f.Buf8(q.pending_buf_size), q.d_buf = 1 * q.lit_bufsize, q.l_buf = 3 * q.lit_bufsize, q.level = Y, q.strategy = m, q.method = x, D(d);
        }
        l = [new W(0, 0, 0, 0, function(d, Y) {
          var x = 65535;
          for (x > d.pending_buf_size - 5 && (x = d.pending_buf_size - 5); ; ) {
            if (d.lookahead <= 1) {
              if (G(d), d.lookahead === 0 && Y === k) return v;
              if (d.lookahead === 0) break;
            }
            d.strstart += d.lookahead, d.lookahead = 0;
            var i = d.block_start + x;
            if ((d.strstart === 0 || d.strstart >= i) && (d.lookahead = d.strstart - i, d.strstart = i, P(d, !1), d.strm.avail_out === 0) || d.strstart - d.block_start >= d.w_size - le && (P(d, !1), d.strm.avail_out === 0)) return v;
          }
          return d.insert = 0, Y === I ? (P(d, !0), d.strm.avail_out === 0 ? ee : H) : (d.strstart > d.block_start && (P(d, !1), d.strm.avail_out), v);
        }), new W(4, 4, 8, 4, _), new W(4, 5, 16, 8, _), new W(4, 6, 32, 32, _), new W(4, 4, 16, 16, y), new W(8, 16, 32, 32, y), new W(8, 16, 128, 128, y), new W(8, 32, 128, 256, y), new W(32, 128, 258, 1024, y), new W(32, 258, 258, 4096, y)], o.deflateInit = function(d, Y) {
          return J(d, Y, w, 15, 8, 0);
        }, o.deflateInit2 = J, o.deflateReset = D, o.deflateResetKeep = O, o.deflateSetHeader = function(d, Y) {
          return d && d.state ? d.state.wrap !== 2 ? R : (d.state.gzhead = Y, b) : R;
        }, o.deflate = function(d, Y) {
          var x, i, s, m;
          if (!d || !d.state || 5 < Y || Y < 0) return d ? ie(d, R) : R;
          if (i = d.state, !d.output || !d.input && d.avail_in !== 0 || i.status === 666 && Y !== I) return ie(d, d.avail_out === 0 ? -5 : R);
          if (i.strm = d, x = i.last_flush, i.last_flush = Y, i.status === N) if (i.wrap === 2) d.adler = 0, X(i, 31), X(i, 139), X(i, 8), i.gzhead ? (X(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), X(i, 255 & i.gzhead.time), X(i, i.gzhead.time >> 8 & 255), X(i, i.gzhead.time >> 16 & 255), X(i, i.gzhead.time >> 24 & 255), X(i, i.level === 9 ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), X(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (X(i, 255 & i.gzhead.extra.length), X(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (d.adler = A(d.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = 69) : (X(i, 0), X(i, 0), X(i, 0), X(i, 0), X(i, 0), X(i, i.level === 9 ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), X(i, 3), i.status = U);
          else {
            var L = w + (i.w_bits - 8 << 4) << 8;
            L |= (2 <= i.strategy || i.level < 2 ? 0 : i.level < 6 ? 1 : i.level === 6 ? 2 : 3) << 6, i.strstart !== 0 && (L |= 32), L += 31 - L % 31, i.status = U, Z(i, L), i.strstart !== 0 && (Z(i, d.adler >>> 16), Z(i, 65535 & d.adler)), d.adler = 1;
          }
          if (i.status === 69) if (i.gzhead.extra) {
            for (s = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > s && (d.adler = A(d.adler, i.pending_buf, i.pending - s, s)), V(d), s = i.pending, i.pending !== i.pending_buf_size)); ) X(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;
            i.gzhead.hcrc && i.pending > s && (d.adler = A(d.adler, i.pending_buf, i.pending - s, s)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = 73);
          } else i.status = 73;
          if (i.status === 73) if (i.gzhead.name) {
            s = i.pending;
            do {
              if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > s && (d.adler = A(d.adler, i.pending_buf, i.pending - s, s)), V(d), s = i.pending, i.pending === i.pending_buf_size)) {
                m = 1;
                break;
              }
              m = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, X(i, m);
            } while (m !== 0);
            i.gzhead.hcrc && i.pending > s && (d.adler = A(d.adler, i.pending_buf, i.pending - s, s)), m === 0 && (i.gzindex = 0, i.status = 91);
          } else i.status = 91;
          if (i.status === 91) if (i.gzhead.comment) {
            s = i.pending;
            do {
              if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > s && (d.adler = A(d.adler, i.pending_buf, i.pending - s, s)), V(d), s = i.pending, i.pending === i.pending_buf_size)) {
                m = 1;
                break;
              }
              m = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, X(i, m);
            } while (m !== 0);
            i.gzhead.hcrc && i.pending > s && (d.adler = A(d.adler, i.pending_buf, i.pending - s, s)), m === 0 && (i.status = 103);
          } else i.status = 103;
          if (i.status === 103 && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && V(d), i.pending + 2 <= i.pending_buf_size && (X(i, 255 & d.adler), X(i, d.adler >> 8 & 255), d.adler = 0, i.status = U)) : i.status = U), i.pending !== 0) {
            if (V(d), d.avail_out === 0) return i.last_flush = -1, b;
          } else if (d.avail_in === 0 && Q(Y) <= Q(x) && Y !== I) return ie(d, -5);
          if (i.status === 666 && d.avail_in !== 0) return ie(d, -5);
          if (d.avail_in !== 0 || i.lookahead !== 0 || Y !== k && i.status !== 666) {
            var q = i.strategy === 2 ? (function(j, ne) {
              for (var oe; ; ) {
                if (j.lookahead === 0 && (G(j), j.lookahead === 0)) {
                  if (ne === k) return v;
                  break;
                }
                if (j.match_length = 0, oe = a._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++, oe && (P(j, !1), j.strm.avail_out === 0)) return v;
              }
              return j.insert = 0, ne === I ? (P(j, !0), j.strm.avail_out === 0 ? ee : H) : j.last_lit && (P(j, !1), j.strm.avail_out === 0) ? v : K;
            })(i, Y) : i.strategy === 3 ? (function(j, ne) {
              for (var oe, se, he, de, ge = j.window; ; ) {
                if (j.lookahead <= $) {
                  if (G(j), j.lookahead <= $ && ne === k) return v;
                  if (j.lookahead === 0) break;
                }
                if (j.match_length = 0, j.lookahead >= C && 0 < j.strstart && (se = ge[he = j.strstart - 1]) === ge[++he] && se === ge[++he] && se === ge[++he]) {
                  de = j.strstart + $;
                  do
                    ;
                  while (se === ge[++he] && se === ge[++he] && se === ge[++he] && se === ge[++he] && se === ge[++he] && se === ge[++he] && se === ge[++he] && se === ge[++he] && he < de);
                  j.match_length = $ - (de - he), j.match_length > j.lookahead && (j.match_length = j.lookahead);
                }
                if (j.match_length >= C ? (oe = a._tr_tally(j, 1, j.match_length - C), j.lookahead -= j.match_length, j.strstart += j.match_length, j.match_length = 0) : (oe = a._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++), oe && (P(j, !1), j.strm.avail_out === 0)) return v;
              }
              return j.insert = 0, ne === I ? (P(j, !0), j.strm.avail_out === 0 ? ee : H) : j.last_lit && (P(j, !1), j.strm.avail_out === 0) ? v : K;
            })(i, Y) : l[i.level].func(i, Y);
            if (q !== ee && q !== H || (i.status = 666), q === v || q === ee) return d.avail_out === 0 && (i.last_flush = -1), b;
            if (q === K && (Y === 1 ? a._tr_align(i) : Y !== 5 && (a._tr_stored_block(i, 0, 0, !1), Y === 3 && (ce(i.head), i.lookahead === 0 && (i.strstart = 0, i.block_start = 0, i.insert = 0))), V(d), d.avail_out === 0)) return i.last_flush = -1, b;
          }
          return Y !== I ? b : i.wrap <= 0 ? 1 : (i.wrap === 2 ? (X(i, 255 & d.adler), X(i, d.adler >> 8 & 255), X(i, d.adler >> 16 & 255), X(i, d.adler >> 24 & 255), X(i, 255 & d.total_in), X(i, d.total_in >> 8 & 255), X(i, d.total_in >> 16 & 255), X(i, d.total_in >> 24 & 255)) : (Z(i, d.adler >>> 16), Z(i, 65535 & d.adler)), V(d), 0 < i.wrap && (i.wrap = -i.wrap), i.pending !== 0 ? b : 1);
        }, o.deflateEnd = function(d) {
          var Y;
          return d && d.state ? (Y = d.state.status) !== N && Y !== 69 && Y !== 73 && Y !== 91 && Y !== 103 && Y !== U && Y !== 666 ? ie(d, R) : (d.state = null, Y === U ? ie(d, -3) : b) : R;
        }, o.deflateSetDictionary = function(d, Y) {
          var x, i, s, m, L, q, j, ne, oe = Y.length;
          if (!d || !d.state || (m = (x = d.state).wrap) === 2 || m === 1 && x.status !== N || x.lookahead) return R;
          for (m === 1 && (d.adler = h(d.adler, Y, oe, 0)), x.wrap = 0, oe >= x.w_size && (m === 0 && (ce(x.head), x.strstart = 0, x.block_start = 0, x.insert = 0), ne = new f.Buf8(x.w_size), f.arraySet(ne, Y, oe - x.w_size, x.w_size, 0), Y = ne, oe = x.w_size), L = d.avail_in, q = d.next_in, j = d.input, d.avail_in = oe, d.next_in = 0, d.input = Y, G(x); x.lookahead >= C; ) {
            for (i = x.strstart, s = x.lookahead - (C - 1); x.ins_h = (x.ins_h << x.hash_shift ^ x.window[i + C - 1]) & x.hash_mask, x.prev[i & x.w_mask] = x.head[x.ins_h], x.head[x.ins_h] = i, i++, --s; ) ;
            x.strstart = i, x.lookahead = C - 1, G(x);
          }
          return x.strstart += x.lookahead, x.block_start = x.strstart, x.insert = x.lookahead, x.lookahead = 0, x.match_length = x.prev_length = C - 1, x.match_available = 0, d.next_in = q, d.input = j, d.avail_in = L, x.wrap = m, b;
        }, o.deflateInfo = "pako deflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(r, n, o) {
        n.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
        };
      }, {}], 48: [function(r, n, o) {
        n.exports = function(l, f) {
          var a, h, A, S, k, I, b, R, g, T, u, w, p, c, E, F, B, z, C, $, le, N, U, v, K;
          a = l.state, h = l.next_in, v = l.input, A = h + (l.avail_in - 5), S = l.next_out, K = l.output, k = S - (f - l.avail_out), I = S + (l.avail_out - 257), b = a.dmax, R = a.wsize, g = a.whave, T = a.wnext, u = a.window, w = a.hold, p = a.bits, c = a.lencode, E = a.distcode, F = (1 << a.lenbits) - 1, B = (1 << a.distbits) - 1;
          e: do {
            p < 15 && (w += v[h++] << p, p += 8, w += v[h++] << p, p += 8), z = c[w & F];
            t: for (; ; ) {
              if (w >>>= C = z >>> 24, p -= C, (C = z >>> 16 & 255) === 0) K[S++] = 65535 & z;
              else {
                if (!(16 & C)) {
                  if ((64 & C) == 0) {
                    z = c[(65535 & z) + (w & (1 << C) - 1)];
                    continue t;
                  }
                  if (32 & C) {
                    a.mode = 12;
                    break e;
                  }
                  l.msg = "invalid literal/length code", a.mode = 30;
                  break e;
                }
                $ = 65535 & z, (C &= 15) && (p < C && (w += v[h++] << p, p += 8), $ += w & (1 << C) - 1, w >>>= C, p -= C), p < 15 && (w += v[h++] << p, p += 8, w += v[h++] << p, p += 8), z = E[w & B];
                r: for (; ; ) {
                  if (w >>>= C = z >>> 24, p -= C, !(16 & (C = z >>> 16 & 255))) {
                    if ((64 & C) == 0) {
                      z = E[(65535 & z) + (w & (1 << C) - 1)];
                      continue r;
                    }
                    l.msg = "invalid distance code", a.mode = 30;
                    break e;
                  }
                  if (le = 65535 & z, p < (C &= 15) && (w += v[h++] << p, (p += 8) < C && (w += v[h++] << p, p += 8)), b < (le += w & (1 << C) - 1)) {
                    l.msg = "invalid distance too far back", a.mode = 30;
                    break e;
                  }
                  if (w >>>= C, p -= C, (C = S - k) < le) {
                    if (g < (C = le - C) && a.sane) {
                      l.msg = "invalid distance too far back", a.mode = 30;
                      break e;
                    }
                    if (U = u, (N = 0) === T) {
                      if (N += R - C, C < $) {
                        for ($ -= C; K[S++] = u[N++], --C; ) ;
                        N = S - le, U = K;
                      }
                    } else if (T < C) {
                      if (N += R + T - C, (C -= T) < $) {
                        for ($ -= C; K[S++] = u[N++], --C; ) ;
                        if (N = 0, T < $) {
                          for ($ -= C = T; K[S++] = u[N++], --C; ) ;
                          N = S - le, U = K;
                        }
                      }
                    } else if (N += T - C, C < $) {
                      for ($ -= C; K[S++] = u[N++], --C; ) ;
                      N = S - le, U = K;
                    }
                    for (; 2 < $; ) K[S++] = U[N++], K[S++] = U[N++], K[S++] = U[N++], $ -= 3;
                    $ && (K[S++] = U[N++], 1 < $ && (K[S++] = U[N++]));
                  } else {
                    for (N = S - le; K[S++] = K[N++], K[S++] = K[N++], K[S++] = K[N++], 2 < ($ -= 3); ) ;
                    $ && (K[S++] = K[N++], 1 < $ && (K[S++] = K[N++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (h < A && S < I);
          h -= $ = p >> 3, w &= (1 << (p -= $ << 3)) - 1, l.next_in = h, l.next_out = S, l.avail_in = h < A ? A - h + 5 : 5 - (h - A), l.avail_out = S < I ? I - S + 257 : 257 - (S - I), a.hold = w, a.bits = p;
        };
      }, {}], 49: [function(r, n, o) {
        var l = r("../utils/common"), f = r("./adler32"), a = r("./crc32"), h = r("./inffast"), A = r("./inftrees"), S = 1, k = 2, I = 0, b = -2, R = 1, g = 852, T = 592;
        function u(N) {
          return (N >>> 24 & 255) + (N >>> 8 & 65280) + ((65280 & N) << 8) + ((255 & N) << 24);
        }
        function w() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new l.Buf16(320), this.work = new l.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function p(N) {
          var U;
          return N && N.state ? (U = N.state, N.total_in = N.total_out = U.total = 0, N.msg = "", U.wrap && (N.adler = 1 & U.wrap), U.mode = R, U.last = 0, U.havedict = 0, U.dmax = 32768, U.head = null, U.hold = 0, U.bits = 0, U.lencode = U.lendyn = new l.Buf32(g), U.distcode = U.distdyn = new l.Buf32(T), U.sane = 1, U.back = -1, I) : b;
        }
        function c(N) {
          var U;
          return N && N.state ? ((U = N.state).wsize = 0, U.whave = 0, U.wnext = 0, p(N)) : b;
        }
        function E(N, U) {
          var v, K;
          return N && N.state ? (K = N.state, U < 0 ? (v = 0, U = -U) : (v = 1 + (U >> 4), U < 48 && (U &= 15)), U && (U < 8 || 15 < U) ? b : (K.window !== null && K.wbits !== U && (K.window = null), K.wrap = v, K.wbits = U, c(N))) : b;
        }
        function F(N, U) {
          var v, K;
          return N ? (K = new w(), (N.state = K).window = null, (v = E(N, U)) !== I && (N.state = null), v) : b;
        }
        var B, z, C = !0;
        function $(N) {
          if (C) {
            var U;
            for (B = new l.Buf32(512), z = new l.Buf32(32), U = 0; U < 144; ) N.lens[U++] = 8;
            for (; U < 256; ) N.lens[U++] = 9;
            for (; U < 280; ) N.lens[U++] = 7;
            for (; U < 288; ) N.lens[U++] = 8;
            for (A(S, N.lens, 0, 288, B, 0, N.work, { bits: 9 }), U = 0; U < 32; ) N.lens[U++] = 5;
            A(k, N.lens, 0, 32, z, 0, N.work, { bits: 5 }), C = !1;
          }
          N.lencode = B, N.lenbits = 9, N.distcode = z, N.distbits = 5;
        }
        function le(N, U, v, K) {
          var ee, H = N.state;
          return H.window === null && (H.wsize = 1 << H.wbits, H.wnext = 0, H.whave = 0, H.window = new l.Buf8(H.wsize)), K >= H.wsize ? (l.arraySet(H.window, U, v - H.wsize, H.wsize, 0), H.wnext = 0, H.whave = H.wsize) : (K < (ee = H.wsize - H.wnext) && (ee = K), l.arraySet(H.window, U, v - K, ee, H.wnext), (K -= ee) ? (l.arraySet(H.window, U, v - K, K, 0), H.wnext = K, H.whave = H.wsize) : (H.wnext += ee, H.wnext === H.wsize && (H.wnext = 0), H.whave < H.wsize && (H.whave += ee))), 0;
        }
        o.inflateReset = c, o.inflateReset2 = E, o.inflateResetKeep = p, o.inflateInit = function(N) {
          return F(N, 15);
        }, o.inflateInit2 = F, o.inflate = function(N, U) {
          var v, K, ee, H, ie, Q, ce, V, P, X, Z, te, G, _, y, W, M, O, D, J, d, Y, x, i, s = 0, m = new l.Buf8(4), L = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
          if (!N || !N.state || !N.output || !N.input && N.avail_in !== 0) return b;
          (v = N.state).mode === 12 && (v.mode = 13), ie = N.next_out, ee = N.output, ce = N.avail_out, H = N.next_in, K = N.input, Q = N.avail_in, V = v.hold, P = v.bits, X = Q, Z = ce, Y = I;
          e: for (; ; ) switch (v.mode) {
            case R:
              if (v.wrap === 0) {
                v.mode = 13;
                break;
              }
              for (; P < 16; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              if (2 & v.wrap && V === 35615) {
                m[v.check = 0] = 255 & V, m[1] = V >>> 8 & 255, v.check = a(v.check, m, 2, 0), P = V = 0, v.mode = 2;
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
              v.head && (v.head.text = V >> 8 & 1), 512 & v.flags && (m[0] = 255 & V, m[1] = V >>> 8 & 255, v.check = a(v.check, m, 2, 0)), P = V = 0, v.mode = 3;
            case 3:
              for (; P < 32; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              v.head && (v.head.time = V), 512 & v.flags && (m[0] = 255 & V, m[1] = V >>> 8 & 255, m[2] = V >>> 16 & 255, m[3] = V >>> 24 & 255, v.check = a(v.check, m, 4, 0)), P = V = 0, v.mode = 4;
            case 4:
              for (; P < 16; ) {
                if (Q === 0) break e;
                Q--, V += K[H++] << P, P += 8;
              }
              v.head && (v.head.xflags = 255 & V, v.head.os = V >> 8), 512 & v.flags && (m[0] = 255 & V, m[1] = V >>> 8 & 255, v.check = a(v.check, m, 2, 0)), P = V = 0, v.mode = 5;
            case 5:
              if (1024 & v.flags) {
                for (; P < 16; ) {
                  if (Q === 0) break e;
                  Q--, V += K[H++] << P, P += 8;
                }
                v.length = V, v.head && (v.head.extra_len = V), 512 & v.flags && (m[0] = 255 & V, m[1] = V >>> 8 & 255, v.check = a(v.check, m, 2, 0)), P = V = 0;
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
              N.adler = v.check = u(V), P = V = 0, v.mode = 11;
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
              if (v.lencode = v.lendyn, v.lenbits = 7, x = { bits: v.lenbits }, Y = A(0, v.lens, 0, 19, v.lencode, 0, v.work, x), v.lenbits = x.bits, Y) {
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
              if (v.lenbits = 9, x = { bits: v.lenbits }, Y = A(S, v.lens, 0, v.nlen, v.lencode, 0, v.work, x), v.lenbits = x.bits, Y) {
                N.msg = "invalid literal/lengths set", v.mode = 30;
                break;
              }
              if (v.distbits = 6, v.distcode = v.distdyn, x = { bits: v.distbits }, Y = A(k, v.lens, v.nlen, v.ndist, v.distcode, 0, v.work, x), v.distbits = x.bits, Y) {
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
                G = te > v.wnext ? (te -= v.wnext, v.wsize - te) : v.wnext - te, te > v.length && (te = v.length), _ = v.window;
              } else _ = ee, G = ie - v.offset, te = v.length;
              for (ce < te && (te = ce), ce -= te, v.length -= te; ee[ie++] = _[G++], --te; ) ;
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
                if (Z -= ce, N.total_out += Z, v.total += Z, Z && (N.adler = v.check = v.flags ? a(v.check, ee, Z, ie - Z) : f(v.check, ee, Z, ie - Z)), Z = ce, (v.flags ? V : u(V)) !== v.check) {
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
              return b;
          }
          return N.next_out = ie, N.avail_out = ce, N.next_in = H, N.avail_in = Q, v.hold = V, v.bits = P, (v.wsize || Z !== N.avail_out && v.mode < 30 && (v.mode < 27 || U !== 4)) && le(N, N.output, N.next_out, Z - N.avail_out) ? (v.mode = 31, -4) : (X -= N.avail_in, Z -= N.avail_out, N.total_in += X, N.total_out += Z, v.total += Z, v.wrap && Z && (N.adler = v.check = v.flags ? a(v.check, ee, Z, N.next_out - Z) : f(v.check, ee, Z, N.next_out - Z)), N.data_type = v.bits + (v.last ? 64 : 0) + (v.mode === 12 ? 128 : 0) + (v.mode === 20 || v.mode === 15 ? 256 : 0), (X == 0 && Z === 0 || U === 4) && Y === I && (Y = -5), Y);
        }, o.inflateEnd = function(N) {
          if (!N || !N.state) return b;
          var U = N.state;
          return U.window && (U.window = null), N.state = null, I;
        }, o.inflateGetHeader = function(N, U) {
          var v;
          return N && N.state ? (2 & (v = N.state).wrap) == 0 ? b : ((v.head = U).done = !1, I) : b;
        }, o.inflateSetDictionary = function(N, U) {
          var v, K = U.length;
          return N && N.state ? (v = N.state).wrap !== 0 && v.mode !== 11 ? b : v.mode === 11 && f(1, U, K, 0) !== v.check ? -3 : le(N, U, K, K) ? (v.mode = 31, -4) : (v.havedict = 1, I) : b;
        }, o.inflateInfo = "pako inflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(r, n, o) {
        var l = r("../utils/common"), f = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], a = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], A = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        n.exports = function(S, k, I, b, R, g, T, u) {
          var w, p, c, E, F, B, z, C, $, le = u.bits, N = 0, U = 0, v = 0, K = 0, ee = 0, H = 0, ie = 0, Q = 0, ce = 0, V = 0, P = null, X = 0, Z = new l.Buf16(16), te = new l.Buf16(16), G = null, _ = 0;
          for (N = 0; N <= 15; N++) Z[N] = 0;
          for (U = 0; U < b; U++) Z[k[I + U]]++;
          for (ee = le, K = 15; 1 <= K && Z[K] === 0; K--) ;
          if (K < ee && (ee = K), K === 0) return R[g++] = 20971520, R[g++] = 20971520, u.bits = 1, 0;
          for (v = 1; v < K && Z[v] === 0; v++) ;
          for (ee < v && (ee = v), N = Q = 1; N <= 15; N++) if (Q <<= 1, (Q -= Z[N]) < 0) return -1;
          if (0 < Q && (S === 0 || K !== 1)) return -1;
          for (te[1] = 0, N = 1; N < 15; N++) te[N + 1] = te[N] + Z[N];
          for (U = 0; U < b; U++) k[I + U] !== 0 && (T[te[k[I + U]]++] = U);
          if (B = S === 0 ? (P = G = T, 19) : S === 1 ? (P = f, X -= 257, G = a, _ -= 257, 256) : (P = h, G = A, -1), N = v, F = g, ie = U = V = 0, c = -1, E = (ce = 1 << (H = ee)) - 1, S === 1 && 852 < ce || S === 2 && 592 < ce) return 1;
          for (; ; ) {
            for (z = N - ie, $ = T[U] < B ? (C = 0, T[U]) : T[U] > B ? (C = G[_ + T[U]], P[X + T[U]]) : (C = 96, 0), w = 1 << N - ie, v = p = 1 << H; R[F + (V >> ie) + (p -= w)] = z << 24 | C << 16 | $ | 0, p !== 0; ) ;
            for (w = 1 << N - 1; V & w; ) w >>= 1;
            if (w !== 0 ? (V &= w - 1, V += w) : V = 0, U++, --Z[N] == 0) {
              if (N === K) break;
              N = k[I + T[U]];
            }
            if (ee < N && (V & E) !== c) {
              for (ie === 0 && (ie = ee), F += v, Q = 1 << (H = N - ie); H + ie < K && !((Q -= Z[H + ie]) <= 0); ) H++, Q <<= 1;
              if (ce += 1 << H, S === 1 && 852 < ce || S === 2 && 592 < ce) return 1;
              R[c = V & E] = ee << 24 | H << 16 | F - g | 0;
            }
          }
          return V !== 0 && (R[F + V] = N - ie << 24 | 64 << 16 | 0), u.bits = ee, 0;
        };
      }, { "../utils/common": 41 }], 51: [function(r, n, o) {
        n.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
      }, {}], 52: [function(r, n, o) {
        var l = r("../utils/common"), f = 0, a = 1;
        function h(s) {
          for (var m = s.length; 0 <= --m; ) s[m] = 0;
        }
        var A = 0, S = 29, k = 256, I = k + 1 + S, b = 30, R = 19, g = 2 * I + 1, T = 15, u = 16, w = 7, p = 256, c = 16, E = 17, F = 18, B = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], z = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], $ = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], le = new Array(2 * (I + 2));
        h(le);
        var N = new Array(2 * b);
        h(N);
        var U = new Array(512);
        h(U);
        var v = new Array(256);
        h(v);
        var K = new Array(S);
        h(K);
        var ee, H, ie, Q = new Array(b);
        function ce(s, m, L, q, j) {
          this.static_tree = s, this.extra_bits = m, this.extra_base = L, this.elems = q, this.max_length = j, this.has_stree = s && s.length;
        }
        function V(s, m) {
          this.dyn_tree = s, this.max_code = 0, this.stat_desc = m;
        }
        function P(s) {
          return s < 256 ? U[s] : U[256 + (s >>> 7)];
        }
        function X(s, m) {
          s.pending_buf[s.pending++] = 255 & m, s.pending_buf[s.pending++] = m >>> 8 & 255;
        }
        function Z(s, m, L) {
          s.bi_valid > u - L ? (s.bi_buf |= m << s.bi_valid & 65535, X(s, s.bi_buf), s.bi_buf = m >> u - s.bi_valid, s.bi_valid += L - u) : (s.bi_buf |= m << s.bi_valid & 65535, s.bi_valid += L);
        }
        function te(s, m, L) {
          Z(s, L[2 * m], L[2 * m + 1]);
        }
        function G(s, m) {
          for (var L = 0; L |= 1 & s, s >>>= 1, L <<= 1, 0 < --m; ) ;
          return L >>> 1;
        }
        function _(s, m, L) {
          var q, j, ne = new Array(T + 1), oe = 0;
          for (q = 1; q <= T; q++) ne[q] = oe = oe + L[q - 1] << 1;
          for (j = 0; j <= m; j++) {
            var se = s[2 * j + 1];
            se !== 0 && (s[2 * j] = G(ne[se]++, se));
          }
        }
        function y(s) {
          var m;
          for (m = 0; m < I; m++) s.dyn_ltree[2 * m] = 0;
          for (m = 0; m < b; m++) s.dyn_dtree[2 * m] = 0;
          for (m = 0; m < R; m++) s.bl_tree[2 * m] = 0;
          s.dyn_ltree[2 * p] = 1, s.opt_len = s.static_len = 0, s.last_lit = s.matches = 0;
        }
        function W(s) {
          8 < s.bi_valid ? X(s, s.bi_buf) : 0 < s.bi_valid && (s.pending_buf[s.pending++] = s.bi_buf), s.bi_buf = 0, s.bi_valid = 0;
        }
        function M(s, m, L, q) {
          var j = 2 * m, ne = 2 * L;
          return s[j] < s[ne] || s[j] === s[ne] && q[m] <= q[L];
        }
        function O(s, m, L) {
          for (var q = s.heap[L], j = L << 1; j <= s.heap_len && (j < s.heap_len && M(m, s.heap[j + 1], s.heap[j], s.depth) && j++, !M(m, q, s.heap[j], s.depth)); ) s.heap[L] = s.heap[j], L = j, j <<= 1;
          s.heap[L] = q;
        }
        function D(s, m, L) {
          var q, j, ne, oe, se = 0;
          if (s.last_lit !== 0) for (; q = s.pending_buf[s.d_buf + 2 * se] << 8 | s.pending_buf[s.d_buf + 2 * se + 1], j = s.pending_buf[s.l_buf + se], se++, q === 0 ? te(s, j, m) : (te(s, (ne = v[j]) + k + 1, m), (oe = B[ne]) !== 0 && Z(s, j -= K[ne], oe), te(s, ne = P(--q), L), (oe = z[ne]) !== 0 && Z(s, q -= Q[ne], oe)), se < s.last_lit; ) ;
          te(s, p, m);
        }
        function J(s, m) {
          var L, q, j, ne = m.dyn_tree, oe = m.stat_desc.static_tree, se = m.stat_desc.has_stree, he = m.stat_desc.elems, de = -1;
          for (s.heap_len = 0, s.heap_max = g, L = 0; L < he; L++) ne[2 * L] !== 0 ? (s.heap[++s.heap_len] = de = L, s.depth[L] = 0) : ne[2 * L + 1] = 0;
          for (; s.heap_len < 2; ) ne[2 * (j = s.heap[++s.heap_len] = de < 2 ? ++de : 0)] = 1, s.depth[j] = 0, s.opt_len--, se && (s.static_len -= oe[2 * j + 1]);
          for (m.max_code = de, L = s.heap_len >> 1; 1 <= L; L--) O(s, ne, L);
          for (j = he; L = s.heap[1], s.heap[1] = s.heap[s.heap_len--], O(s, ne, 1), q = s.heap[1], s.heap[--s.heap_max] = L, s.heap[--s.heap_max] = q, ne[2 * j] = ne[2 * L] + ne[2 * q], s.depth[j] = (s.depth[L] >= s.depth[q] ? s.depth[L] : s.depth[q]) + 1, ne[2 * L + 1] = ne[2 * q + 1] = j, s.heap[1] = j++, O(s, ne, 1), 2 <= s.heap_len; ) ;
          s.heap[--s.heap_max] = s.heap[1], (function(ge, Ie) {
            var Ye, Le, St, _e, qt, wr, Ge = Ie.dyn_tree, zi = Ie.max_code, vu = Ie.stat_desc.static_tree, bu = Ie.stat_desc.has_stree, _u = Ie.stat_desc.extra_bits, Wi = Ie.stat_desc.extra_base, At = Ie.stat_desc.max_length, Gt = 0;
            for (_e = 0; _e <= T; _e++) ge.bl_count[_e] = 0;
            for (Ge[2 * ge.heap[ge.heap_max] + 1] = 0, Ye = ge.heap_max + 1; Ye < g; Ye++) At < (_e = Ge[2 * Ge[2 * (Le = ge.heap[Ye]) + 1] + 1] + 1) && (_e = At, Gt++), Ge[2 * Le + 1] = _e, zi < Le || (ge.bl_count[_e]++, qt = 0, Wi <= Le && (qt = _u[Le - Wi]), wr = Ge[2 * Le], ge.opt_len += wr * (_e + qt), bu && (ge.static_len += wr * (vu[2 * Le + 1] + qt)));
            if (Gt !== 0) {
              do {
                for (_e = At - 1; ge.bl_count[_e] === 0; ) _e--;
                ge.bl_count[_e]--, ge.bl_count[_e + 1] += 2, ge.bl_count[At]--, Gt -= 2;
              } while (0 < Gt);
              for (_e = At; _e !== 0; _e--) for (Le = ge.bl_count[_e]; Le !== 0; ) zi < (St = ge.heap[--Ye]) || (Ge[2 * St + 1] !== _e && (ge.opt_len += (_e - Ge[2 * St + 1]) * Ge[2 * St], Ge[2 * St + 1] = _e), Le--);
            }
          })(s, m), _(ne, de, s.bl_count);
        }
        function d(s, m, L) {
          var q, j, ne = -1, oe = m[1], se = 0, he = 7, de = 4;
          for (oe === 0 && (he = 138, de = 3), m[2 * (L + 1) + 1] = 65535, q = 0; q <= L; q++) j = oe, oe = m[2 * (q + 1) + 1], ++se < he && j === oe || (se < de ? s.bl_tree[2 * j] += se : j !== 0 ? (j !== ne && s.bl_tree[2 * j]++, s.bl_tree[2 * c]++) : se <= 10 ? s.bl_tree[2 * E]++ : s.bl_tree[2 * F]++, ne = j, de = (se = 0) === oe ? (he = 138, 3) : j === oe ? (he = 6, 3) : (he = 7, 4));
        }
        function Y(s, m, L) {
          var q, j, ne = -1, oe = m[1], se = 0, he = 7, de = 4;
          for (oe === 0 && (he = 138, de = 3), q = 0; q <= L; q++) if (j = oe, oe = m[2 * (q + 1) + 1], !(++se < he && j === oe)) {
            if (se < de) for (; te(s, j, s.bl_tree), --se != 0; ) ;
            else j !== 0 ? (j !== ne && (te(s, j, s.bl_tree), se--), te(s, c, s.bl_tree), Z(s, se - 3, 2)) : se <= 10 ? (te(s, E, s.bl_tree), Z(s, se - 3, 3)) : (te(s, F, s.bl_tree), Z(s, se - 11, 7));
            ne = j, de = (se = 0) === oe ? (he = 138, 3) : j === oe ? (he = 6, 3) : (he = 7, 4);
          }
        }
        h(Q);
        var x = !1;
        function i(s, m, L, q) {
          Z(s, (A << 1) + (q ? 1 : 0), 3), (function(j, ne, oe, se) {
            W(j), X(j, oe), X(j, ~oe), l.arraySet(j.pending_buf, j.window, ne, oe, j.pending), j.pending += oe;
          })(s, m, L);
        }
        o._tr_init = function(s) {
          x || ((function() {
            var m, L, q, j, ne, oe = new Array(T + 1);
            for (j = q = 0; j < S - 1; j++) for (K[j] = q, m = 0; m < 1 << B[j]; m++) v[q++] = j;
            for (v[q - 1] = j, j = ne = 0; j < 16; j++) for (Q[j] = ne, m = 0; m < 1 << z[j]; m++) U[ne++] = j;
            for (ne >>= 7; j < b; j++) for (Q[j] = ne << 7, m = 0; m < 1 << z[j] - 7; m++) U[256 + ne++] = j;
            for (L = 0; L <= T; L++) oe[L] = 0;
            for (m = 0; m <= 143; ) le[2 * m + 1] = 8, m++, oe[8]++;
            for (; m <= 255; ) le[2 * m + 1] = 9, m++, oe[9]++;
            for (; m <= 279; ) le[2 * m + 1] = 7, m++, oe[7]++;
            for (; m <= 287; ) le[2 * m + 1] = 8, m++, oe[8]++;
            for (_(le, I + 1, oe), m = 0; m < b; m++) N[2 * m + 1] = 5, N[2 * m] = G(m, 5);
            ee = new ce(le, B, k + 1, I, T), H = new ce(N, z, 0, b, T), ie = new ce(new Array(0), C, 0, R, w);
          })(), x = !0), s.l_desc = new V(s.dyn_ltree, ee), s.d_desc = new V(s.dyn_dtree, H), s.bl_desc = new V(s.bl_tree, ie), s.bi_buf = 0, s.bi_valid = 0, y(s);
        }, o._tr_stored_block = i, o._tr_flush_block = function(s, m, L, q) {
          var j, ne, oe = 0;
          0 < s.level ? (s.strm.data_type === 2 && (s.strm.data_type = (function(se) {
            var he, de = 4093624447;
            for (he = 0; he <= 31; he++, de >>>= 1) if (1 & de && se.dyn_ltree[2 * he] !== 0) return f;
            if (se.dyn_ltree[18] !== 0 || se.dyn_ltree[20] !== 0 || se.dyn_ltree[26] !== 0) return a;
            for (he = 32; he < k; he++) if (se.dyn_ltree[2 * he] !== 0) return a;
            return f;
          })(s)), J(s, s.l_desc), J(s, s.d_desc), oe = (function(se) {
            var he;
            for (d(se, se.dyn_ltree, se.l_desc.max_code), d(se, se.dyn_dtree, se.d_desc.max_code), J(se, se.bl_desc), he = R - 1; 3 <= he && se.bl_tree[2 * $[he] + 1] === 0; he--) ;
            return se.opt_len += 3 * (he + 1) + 5 + 5 + 4, he;
          })(s), j = s.opt_len + 3 + 7 >>> 3, (ne = s.static_len + 3 + 7 >>> 3) <= j && (j = ne)) : j = ne = L + 5, L + 4 <= j && m !== -1 ? i(s, m, L, q) : s.strategy === 4 || ne === j ? (Z(s, 2 + (q ? 1 : 0), 3), D(s, le, N)) : (Z(s, 4 + (q ? 1 : 0), 3), (function(se, he, de, ge) {
            var Ie;
            for (Z(se, he - 257, 5), Z(se, de - 1, 5), Z(se, ge - 4, 4), Ie = 0; Ie < ge; Ie++) Z(se, se.bl_tree[2 * $[Ie] + 1], 3);
            Y(se, se.dyn_ltree, he - 1), Y(se, se.dyn_dtree, de - 1);
          })(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, oe + 1), D(s, s.dyn_ltree, s.dyn_dtree)), y(s), q && W(s);
        }, o._tr_tally = function(s, m, L) {
          return s.pending_buf[s.d_buf + 2 * s.last_lit] = m >>> 8 & 255, s.pending_buf[s.d_buf + 2 * s.last_lit + 1] = 255 & m, s.pending_buf[s.l_buf + s.last_lit] = 255 & L, s.last_lit++, m === 0 ? s.dyn_ltree[2 * L]++ : (s.matches++, m--, s.dyn_ltree[2 * (v[L] + k + 1)]++, s.dyn_dtree[2 * P(m)]++), s.last_lit === s.lit_bufsize - 1;
        }, o._tr_align = function(s) {
          Z(s, 2, 3), te(s, p, le), (function(m) {
            m.bi_valid === 16 ? (X(m, m.bi_buf), m.bi_buf = 0, m.bi_valid = 0) : 8 <= m.bi_valid && (m.pending_buf[m.pending++] = 255 & m.bi_buf, m.bi_buf >>= 8, m.bi_valid -= 8);
          })(s);
        };
      }, { "../utils/common": 41 }], 53: [function(r, n, o) {
        n.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}], 54: [function(r, n, o) {
        (function(l) {
          (function(f, a) {
            if (!f.setImmediate) {
              var h, A, S, k, I = 1, b = {}, R = !1, g = f.document, T = Object.getPrototypeOf && Object.getPrototypeOf(f);
              T = T && T.setTimeout ? T : f, h = {}.toString.call(f.process) === "[object process]" ? function(c) {
                we.nextTick(function() {
                  w(c);
                });
              } : (function() {
                if (f.postMessage && !f.importScripts) {
                  var c = !0, E = f.onmessage;
                  return f.onmessage = function() {
                    c = !1;
                  }, f.postMessage("", "*"), f.onmessage = E, c;
                }
              })() ? (k = "setImmediate$" + Math.random() + "$", f.addEventListener ? f.addEventListener("message", p, !1) : f.attachEvent("onmessage", p), function(c) {
                f.postMessage(k + c, "*");
              }) : f.MessageChannel ? ((S = new MessageChannel()).port1.onmessage = function(c) {
                w(c.data);
              }, function(c) {
                S.port2.postMessage(c);
              }) : g && "onreadystatechange" in g.createElement("script") ? (A = g.documentElement, function(c) {
                var E = g.createElement("script");
                E.onreadystatechange = function() {
                  w(c), E.onreadystatechange = null, A.removeChild(E), E = null;
                }, A.appendChild(E);
              }) : function(c) {
                setTimeout(w, 0, c);
              }, T.setImmediate = function(c) {
                typeof c != "function" && (c = new Function("" + c));
                for (var E = new Array(arguments.length - 1), F = 0; F < E.length; F++) E[F] = arguments[F + 1];
                var B = { callback: c, args: E };
                return b[I] = B, h(I), I++;
              }, T.clearImmediate = u;
            }
            function u(c) {
              delete b[c];
            }
            function w(c) {
              if (R) setTimeout(w, 0, c);
              else {
                var E = b[c];
                if (E) {
                  R = !0;
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
                    })(E);
                  } finally {
                    u(c), R = !1;
                  }
                }
              }
            }
            function p(c) {
              c.source === f && typeof c.data == "string" && c.data.indexOf(k) === 0 && w(+c.data.slice(k.length));
            }
          })(typeof self > "u" ? l === void 0 ? this : l : self);
        }).call(this, typeof Fe < "u" ? Fe : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}] }, {}, [10])(10);
    });
  })(di)), di.exports;
}
var bp = vp();
const _p = /* @__PURE__ */ Ti(bp);
var Nt = { exports: {} }, pi, Ks;
function Ep() {
  if (Ks) return pi;
  Ks = 1;
  var t = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function e(r) {
    return r && r.replace ? r.replace(/([&"<>'])/g, function(n, o) {
      return t[o];
    }) : r;
  }
  return pi = e, pi;
}
var Vs;
function xp() {
  if (Vs) return Nt.exports;
  Vs = 1;
  var t = Ep(), e = Ni().Stream, r = "    ";
  function n(A, S) {
    typeof S != "object" && (S = {
      indent: S
    });
    var k = S.stream ? new e() : null, I = "", b = !1, R = S.indent ? S.indent === !0 ? r : S.indent : "", g = !0;
    function T(E) {
      g ? we.nextTick(E) : E();
    }
    function u(E, F) {
      if (F !== void 0 && (I += F), E && !b && (k = k || new e(), b = !0), E && b) {
        var B = I;
        T(function() {
          k.emit("data", B);
        }), I = "";
      }
    }
    function w(E, F) {
      a(u, f(E, R, R ? 1 : 0), F);
    }
    function p() {
      if (k) {
        var E = I;
        T(function() {
          k.emit("data", E), k.emit("end"), k.readable = !1, k.emit("close");
        });
      }
    }
    function c(E) {
      var F = E.encoding || "UTF-8", B = { version: "1.0", encoding: F };
      E.standalone && (B.standalone = E.standalone), w({ "?xml": { _attr: B } }), I = I.replace("/>", "?>");
    }
    return T(function() {
      g = !1;
    }), S.declaration && c(S.declaration), A && A.forEach ? A.forEach(function(E, F) {
      var B;
      F + 1 === A.length && (B = p), w(E, B);
    }) : w(A, p), k ? (k.readable = !0, k) : I;
  }
  function o() {
    var A = Array.prototype.slice.call(arguments), S = {
      _elem: f(A)
    };
    return S.push = function(k) {
      if (!this.append)
        throw new Error("not assigned to a parent!");
      var I = this, b = this._elem.indent;
      a(
        this.append,
        f(
          k,
          b,
          this._elem.icount + (b ? 1 : 0)
        ),
        function() {
          I.append(!0);
        }
      );
    }, S.close = function(k) {
      k !== void 0 && this.push(k), this.end && this.end();
    }, S;
  }
  function l(A, S) {
    return new Array(S || 0).join(A || "");
  }
  function f(A, S, k) {
    k = k || 0;
    var I = l(S, k), b, R = A, g = !1;
    if (typeof A == "object") {
      var T = Object.keys(A);
      if (b = T[0], R = A[b], R && R._elem)
        return R._elem.name = b, R._elem.icount = k, R._elem.indent = S, R._elem.indents = I, R._elem.interrupt = R, R._elem;
    }
    var u = [], w = [], p;
    function c(E) {
      var F = Object.keys(E);
      F.forEach(function(B) {
        u.push(h(B, E[B]));
      });
    }
    switch (typeof R) {
      case "object":
        if (R === null) break;
        R._attr && c(R._attr), R._cdata && w.push(
          ("<![CDATA[" + R._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>"
        ), R.forEach && (p = !1, w.push(""), R.forEach(function(E) {
          if (typeof E == "object") {
            var F = Object.keys(E)[0];
            F == "_attr" ? c(E._attr) : w.push(f(
              E,
              S,
              k + 1
            ));
          } else
            w.pop(), p = !0, w.push(t(E));
        }), p || w.push(""));
        break;
      default:
        w.push(t(R));
    }
    return {
      name: b,
      interrupt: g,
      attributes: u,
      content: w,
      icount: k,
      indents: I,
      indent: S
    };
  }
  function a(A, S, k) {
    if (typeof S != "object")
      return A(!1, S);
    var I = S.interrupt ? 1 : S.content.length;
    function b() {
      for (; S.content.length; ) {
        var g = S.content.shift();
        if (g !== void 0) {
          if (R(g)) return;
          a(A, g);
        }
      }
      A(!1, (I > 1 ? S.indents : "") + (S.name ? "</" + S.name + ">" : "") + (S.indent && !k ? `
` : "")), k && k();
    }
    function R(g) {
      return g.interrupt ? (g.interrupt.append = A, g.interrupt.end = b, g.interrupt = !1, A(!0), !0) : !1;
    }
    if (A(!1, S.indents + (S.name ? "<" + S.name : "") + (S.attributes.length ? " " + S.attributes.join(" ") : "") + (I ? S.name ? ">" : "" : S.name ? "/>" : "") + (S.indent && I > 1 ? `
` : "")), !I)
      return A(!1, S.indent ? `
` : "");
    R(S) || b();
  }
  function h(A, S) {
    return A + '="' + t(S) + '"';
  }
  return Nt.exports = n, Nt.exports.element = Nt.exports.Element = o, Nt.exports;
}
var Tp = xp();
const ve = /* @__PURE__ */ Ti(Tp), Ot = 0, mi = 32, Sp = 32, Ap = (t, e) => {
  const r = e.replace(/-/g, "");
  if (r.length !== Sp)
    throw new Error(`Error: Cannot extract GUID from font filename: ${e}`);
  const o = r.replace(/(..)/g, "$1 ").trim().split(" ").map((h) => parseInt(h, 16));
  o.reverse();
  const f = t.slice(Ot, mi).map((h, A) => h ^ o[A % o.length]), a = new Uint8Array(Ot + f.length + Math.max(0, t.length - mi));
  return a.set(t.slice(0, Ot)), a.set(f, Ot), a.set(t.slice(mi), Ot + f.length), a;
};
class kp {
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
class Rp {
  /**
   * Replaces image placeholder tokens with relationship IDs.
   *
   * @param xmlData - The XML string containing image placeholders
   * @param mediaData - Array of media data to replace
   * @param offset - Starting offset for relationship IDs
   * @returns XML string with placeholders replaced by relationship IDs
   */
  replace(e, r, n) {
    let o = e;
    return r.forEach((l, f) => {
      o = o.replace(new RegExp(`{${l.fileName}}`, "g"), (n + f).toString());
    }), o;
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
class Ip {
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
    for (const o of r)
      n = n.replace(
        new RegExp(`{${o.reference}-${o.instance}}`, "g"),
        o.numId.toString()
      );
    return n;
  }
}
class Cp {
  /**
   * Creates a new Compiler instance.
   *
   * Initializes the formatter and replacer utilities used during compilation.
   */
  constructor() {
    re(this, "formatter"), re(this, "imageReplacer"), re(this, "numberingReplacer"), this.formatter = new kp(), this.imageReplacer = new Rp(), this.numberingReplacer = new Ip();
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
    const o = new _p(), l = this.xmlifyFile(e, r), f = new Map(Object.entries(l));
    for (const [, a] of f)
      if (Array.isArray(a))
        for (const h of a)
          o.file(h.path, ri(h.data));
      else
        o.file(a.path, ri(a.data));
    for (const a of n)
      o.file(a.path, ri(a.data));
    for (const a of e.Media.Array)
      a.type !== "svg" ? o.file(`word/media/${a.fileName}`, a.data) : (o.file(`word/media/${a.fileName}`, a.data), o.file(`word/media/${a.fallback.fileName}`, a.fallback.data));
    for (const { data: a, name: h, fontKey: A } of e.FontTable.fontOptionsWithKey) {
      const [S] = h.split(".");
      o.file(`word/fonts/${S}.odttf`, Ap(a, A));
    }
    return o;
  }
  xmlifyFile(e, r) {
    const n = e.Document.Relationships.RelationshipCount + 1, o = ve(
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
    ), A = this.imageReplacer.getMediaData(o, e.Media), S = this.imageReplacer.getMediaData(f, e.Media), k = this.imageReplacer.getMediaData(h, e.Media);
    return {
      Relationships: {
        data: (A.forEach((I, b) => {
          e.Document.Relationships.addRelationship(
            n + b,
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
          const I = this.imageReplacer.replace(o, A, n);
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
      HeaderRelationships: e.Headers.map((I, b) => {
        const R = ve(
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
        return this.imageReplacer.getMediaData(R, e.Media).forEach((T, u) => {
          I.Relationships.addRelationship(
            u,
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
          path: `word/_rels/header${b + 1}.xml.rels`
        };
      }),
      FooterRelationships: e.Footers.map((I, b) => {
        const R = ve(
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
        return this.imageReplacer.getMediaData(R, e.Media).forEach((T, u) => {
          I.Relationships.addRelationship(
            u,
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
          path: `word/_rels/footer${b + 1}.xml.rels`
        };
      }),
      Headers: e.Headers.map((I, b) => {
        const R = ve(
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
        ), g = this.imageReplacer.getMediaData(R, e.Media), T = this.imageReplacer.replace(R, g, 0);
        return {
          data: this.numberingReplacer.replace(T, e.Numbering.ConcreteNumbering),
          path: `word/header${b + 1}.xml`
        };
      }),
      Footers: e.Footers.map((I, b) => {
        const R = ve(
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
        ), g = this.imageReplacer.getMediaData(R, e.Media), T = this.imageReplacer.replace(R, g, 0);
        return {
          data: this.numberingReplacer.replace(T, e.Numbering.ConcreteNumbering),
          path: `word/footer${b + 1}.xml`
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
          const I = this.imageReplacer.replace(h, k, a);
          return this.numberingReplacer.replace(I, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (k.forEach((I, b) => {
          e.FootNotes.Relationships.addRelationship(
            a + b,
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
          const I = this.imageReplacer.replace(f, S, l);
          return this.numberingReplacer.replace(I, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (S.forEach((I, b) => {
          e.Comments.Relationships.addRelationship(
            l + b,
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
const Np = {
  /** Indent with 2 spaces */
  WITH_2_BLANKS: "  "
}, Xs = (t) => t === !0 ? Np.WITH_2_BLANKS : t === !1 ? void 0 : t, pu = class wt {
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
    return Iu(this, arguments, function* (o, l, f, a = []) {
      return this.compiler.compile(o, Xs(f), a).generateAsync({
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
    return wt.pack(e, "string", r, n);
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
    return wt.pack(e, "nodebuffer", r, n);
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
    return wt.pack(e, "base64", r, n);
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
    return wt.pack(e, "blob", r, n);
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
    return wt.pack(e, "arraybuffer", r, n);
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
    const o = new yp.Stream();
    return this.compiler.compile(e, Xs(r), n).generateAsync({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }).then((f) => {
      o.emit("data", f), o.emit("end");
    }), o;
  }
};
re(pu, "compiler", new Cp());
let Op = pu;
const er = {
  Body: "document",
  Normal: "document",
  Title: "title",
  Heading1: "heading1",
  Heading2: "heading2",
  Heading3: "heading3",
  Heading4: "heading4",
  Heading5: "heading5",
  Heading6: "heading6",
  Hyperlink: "hyperlink",
  Strong: "strong",
  ListParagraph: "listParagraph"
};
function Pp(t, e) {
  const r = {};
  t.bold && (r.bold = !0), t.italics && (r.italics = !0), t.smallCaps && (r.smallCaps = !0), t.allCaps && (r.allCaps = !0), t.strike && (r.strike = !0), t.size != null && (r.size = t.size);
  const n = xu(t.color, e);
  n && (r.color = n);
  const o = Tu(t.font, e);
  o && (r.font = o), t.underline && (r.underline = typeof t.underline == "string" ? { type: t.underline } : t.underline);
  const l = {};
  return Object.keys(r).length && (l.run = r), t.paragraph && (l.paragraph = t.paragraph), l;
}
function Fp(t = yr, e = {}) {
  const r = t?.typography || yr.typography, n = t?.typographyKinds || yr.typographyKinds, o = {}, l = [], f = [];
  for (const [k, I] of Object.entries(r)) {
    const b = Pp(I, t), R = er[k];
    if (R === "document") {
      o.document = {
        ...b.run ? { run: b.run } : {},
        ...b.paragraph ? { paragraph: b.paragraph } : {}
      };
      continue;
    }
    if (R) {
      o[R] = b;
      continue;
    }
    (n[k] || "character") === "paragraph" ? l.push({
      id: k,
      name: k,
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0,
      ...b
    }) : f.push({
      id: k,
      name: k,
      basedOn: "Normal",
      quickFormat: !0,
      ...b.run ? { run: b.run } : {}
    });
  }
  const a = e.paragraphStyles || [], h = e.characterStyles || [];
  for (const k of [...a, ...h]) {
    const I = er[k.id];
    if (!I) continue;
    const { id: b, name: R, basedOn: g, next: T, quickFormat: u, run: w, paragraph: p } = k;
    o[I] = {
      ...w ? { run: w } : {},
      ...p ? { paragraph: p } : {}
    };
  }
  const A = a.filter(
    (k) => !er[k.id]
  ), S = h.filter(
    (k) => !er[k.id]
  );
  return {
    default: o,
    paragraphStyles: $s(l, A),
    characterStyles: $s(f, S)
  };
}
function $s(t, e) {
  if (!Array.isArray(e) || e.length === 0) return t;
  const r = new Map(e.map((l) => [l.id, l])), n = t.map(
    (l) => r.has(l.id) ? r.get(l.id) : l
  ), o = new Set(t.map((l) => l.id));
  for (const l of e)
    o.has(l.id) || n.push(l);
  return n;
}
async function vm(t, e = {}) {
  const r = await Dp(t, e);
  return Op.toBlob(r);
}
async function Dp(t, e = {}) {
  const {
    sections: r = [],
    header: n = null,
    footer: o = null,
    headerFirstPageOnly: l = !1,
    footerFirstPageOnly: f = !1
  } = t, {
    paragraphStyles: a,
    characterStyles: h,
    theme: A,
    typography: S,
    numbering: k,
    pageMargin: I,
    pageSize: b,
    pageOrientation: R,
    ...g
  } = e, T = { nextId: 1, footnotes: {} };
  ir(r.flat(), T), n && ir(n, T), o && ir(o, T);
  const { loadAsset: u } = e, w = await gi(r.flat(), u), p = {
    pageNumbers: { start: 1, formatType: Ul.DECIMAL },
    ...I ? { margin: I } : {}
  };
  b && (p.size = {
    width: b.width,
    height: b.height,
    ...R ? { orientation: R } : {}
  });
  const c = {
    properties: {
      type: Kf.CONTINUOUS,
      page: p
    },
    children: w
  };
  if (n) {
    const B = await gi(n, u), z = new fu({ children: B }), C = tr(!0);
    l ? (c.headers = { first: z, default: C }, c.properties.titlePage = !0) : c.headers = { default: z };
  } else
    c.headers = { default: tr(!0) };
  if (o) {
    const B = await gi(o, u), z = new du({ children: B }), C = tr(!1);
    f ? (c.footers = { first: z, default: C }, c.properties.titlePage = !0) : c.footers = { default: z };
  } else
    c.footers = { default: tr(!1) };
  c.properties.titlePage && (c.headers && !c.headers.first && (c.headers.first = c.headers.default), c.footers && !c.footers.first && (c.footers.first = c.footers.default));
  const E = {
    ...g,
    sections: [c]
  }, F = S ? { ...A || {}, typography: S } : A;
  if (F) {
    const B = Fp(F, {
      paragraphStyles: a,
      characterStyles: h
    }), z = {};
    B.default && Object.keys(B.default).length && (z.default = B.default), B.paragraphStyles.length && (z.paragraphStyles = B.paragraphStyles), B.characterStyles.length && (z.characterStyles = B.characterStyles), Object.keys(z).length && (E.styles = z);
  } else (a && a.length || h && h.length) && (E.styles = {}, a?.length && (E.styles.paragraphStyles = a), h?.length && (E.styles.characterStyles = h));
  return k && k.length && (E.numbering = { config: k }), Object.keys(T.footnotes).length && (E.footnotes = T.footnotes), new cp(E);
}
function ir(t, e) {
  if (Array.isArray(t)) {
    for (const r of t)
      if (!(!r || typeof r != "object")) {
        if (r.type === "footnoteReference") {
          const n = e.nextId;
          e.nextId += 1, r.footnoteId = n;
          const o = [];
          for (const l of r.children || [])
            if (l.type === "paragraph")
              o.push(ji(l));
            else {
              const f = Ht(l);
              f.length && o.push(new xe({ children: f }));
            }
          o.length || o.push(new xe({})), e.footnotes[n] = { children: o };
        }
        r.children && ir(r.children, e);
      }
  }
}
function tr(t) {
  const e = t ? Te.RIGHT : Te.CENTER, r = t ? fu : du;
  return new r({
    children: [
      new xe({
        alignment: e,
        children: [
          new Ce("Page "),
          new Ce({ children: [Qe.CURRENT] }),
          new Ce(" of "),
          new Ce({ children: [Qe.TOTAL_PAGES] })
        ]
      })
    ]
  });
}
async function gi(t, e) {
  return (await Promise.all(
    t.map((n) => Bp(n, e))
  )).flat();
}
async function Bp(t, e) {
  switch (t.type) {
    case "table":
      return [await cm(t)];
    case "image":
      return [await dm(t, e)];
    case "tableOfContents":
      return [Lp(t)];
    case "webOnly":
      return [];
    default:
      return [await lm(t)];
  }
}
function Lp(t) {
  const e = t.toc || {}, r = e.title || "Contents", n = {
    hyperlink: e.hyperlink === "true" || e.hyperlink === !0 || e.hyperlink == null,
    headingStyleRange: e.headingRange || "1-3"
  };
  return new pp(r, n);
}
function ji(t) {
  const e = {};
  if (t.heading && (e.heading = Gp(t.heading)), t.paragraphStyle ? e.style = t.paragraphStyle : t.style && (e.style = t.style), t.alignment && (e.alignment = gu(t.alignment)), t.pageBreakBefore && (e.pageBreakBefore = !0), t.spacing) {
    e.spacing = {};
    const n = We(t.spacing.before), o = We(t.spacing.after);
    n != null && (e.spacing.before = n), o != null && (e.spacing.after = o);
  }
  if (t.bullet && (e.bullet = { level: We(t.bullet.level) ?? 0 }), t.numbering) {
    e.numbering = {
      reference: t.numbering.reference,
      level: We(t.numbering.level) ?? 0
    };
    const n = We(t.numbering.instance);
    n != null && (e.numbering.instance = n);
  }
  if (t.indent) {
    const n = {};
    for (const o of ["left", "right", "start", "end", "firstLine", "hanging"]) {
      const l = t.indent[o];
      if (l == null) continue;
      const f = typeof l == "string" ? parseInt(l, 10) : l;
      Number.isFinite(f) && (n[o] = f);
    }
    Object.keys(n).length && (e.indent = n);
  }
  Array.isArray(t.tabStops) && t.tabStops.length && (e.tabStops = t.tabStops.map(rm).filter(Boolean));
  const r = (t.children || []).flatMap(Ht);
  return t.bookmark && r.length ? e.children = [new Zo({ id: t.bookmark, children: r })] : r.length && (e.children = r), new xe(e);
}
function Ht(t) {
  switch (t.type) {
    case "text":
      return Mp(t);
    case "tab":
      return [new Ce({ children: [new Vo()] })];
    case "externalHyperlink":
      return [Up(t)];
    case "internalHyperlink":
      return [jp(t)];
    case "image":
      return [];
    case "webOnly":
      return [];
    case "footnoteReference":
      return t.footnoteId ? [new wp(t.footnoteId)] : [];
    case "math":
      return [new Ce({ text: t.latex || "" })];
    default:
      return t.content ? [new Ce({ text: t.content })] : t.children ? t.children.flatMap(Ht) : [];
  }
}
function Mp(t) {
  const e = [];
  t.positionalTab && e.push(
    new Ce({
      children: [
        new Ch({
          alignment: im(t.positionalTab.alignment),
          leader: sm(t.positionalTab.leader),
          relativeTo: um(t.positionalTab.relativeTo)
        })
      ]
    })
  );
  const r = t.content || "";
  if (r === "_currentPage")
    return e.push(new Ce({ children: [Qe.CURRENT] })), e;
  if (r === "_totalPages")
    return e.push(new Ce({ children: [Qe.TOTAL_PAGES] })), e;
  const n = { text: r };
  if ((t.bold === "true" || t.bold === !0) && (n.bold = !0), (t.italics === "true" || t.italics === !0) && (n.italics = !0), t.underline && (n.underline = t.underline), t.style && (n.style = t.style), t.color && (n.color = t.color), t.size != null) {
    const o = typeof t.size == "string" ? parseInt(t.size, 10) : t.size;
    Number.isFinite(o) && (n.size = o);
  }
  return t.font && (n.font = t.font), (t.smallCaps === "true" || t.smallCaps === !0) && (n.smallCaps = !0), (t.allCaps === "true" || t.allCaps === !0) && (n.allCaps = !0), (t.strike === "true" || t.strike === !0) && (n.strike = !0), e.push(new Ce(n)), e;
}
function Up(t) {
  const e = (t.children || []).flatMap(Ht);
  return new $o({
    children: e.length ? e : [new Ce({ text: t.link || "" })],
    link: t.link || ""
  });
}
function jp(t) {
  const e = (t.children || []).flatMap(Ht);
  return new Xo({
    children: e.length ? e : [new Ce({ text: t.anchor || "" })],
    anchor: t.anchor || ""
  });
}
function mu(t) {
  const r = { rows: (t.children || []).filter((n) => n.type === "tableRow").map(zp) };
  return Array.isArray(t.tableColumnWidths) && t.tableColumnWidths.length && (r.columnWidths = t.tableColumnWidths), t.tableLayout ? r.layout = t.tableLayout === "autofit" ? si.AUTOFIT : si.FIXED : r.columnWidths && (r.layout = si.FIXED), t.tableWidth && (r.width = wu(t.tableWidth)), t.tableBorders && (r.borders = yu(t.tableBorders)), new Ef(r);
}
function zp(t) {
  const r = { children: (t.children || []).filter((n) => n.type === "tableCell").map(Wp) };
  return t.tableHeader && (r.tableHeader = !0), new Sf(r);
}
function Wp(t) {
  const e = {};
  if (t.width && (e.width = wu(t.width)), t.margins && (e.margins = Hp(t.margins)), t.borders && (e.borders = yu(t.borders)), t.shading && (e.shading = Yp(t.shading)), t.verticalAlign && (e.verticalAlign = Qp(t.verticalAlign)), t.columnSpan) {
    const n = typeof t.columnSpan == "string" ? parseInt(t.columnSpan, 10) : t.columnSpan;
    Number.isFinite(n) && n > 1 && (e.columnSpan = n);
  }
  if (t.rowSpan) {
    const n = typeof t.rowSpan == "string" ? parseInt(t.rowSpan, 10) : t.rowSpan;
    Number.isFinite(n) && n > 1 && (e.rowSpan = n);
  }
  const r = (t.children || []).flatMap((n) => n.type === "table" ? [mu(n)] : [ji(n)]);
  return e.children = r.length ? r : [new xe({})], new Ui(e);
}
function We(t) {
  if (t == null) return;
  const e = parseInt(t, 10);
  return isNaN(e) ? void 0 : e;
}
function Hp(t) {
  const e = {};
  for (const [r, n] of Object.entries(t)) {
    const o = We(n);
    o != null && (e[r] = o);
  }
  return e;
}
const qp = {
  HEADING_1: pt.HEADING_1,
  HEADING_2: pt.HEADING_2,
  HEADING_3: pt.HEADING_3,
  HEADING_4: pt.HEADING_4,
  HEADING_5: pt.HEADING_5,
  HEADING_6: pt.HEADING_6
};
function Gp(t) {
  return qp[t];
}
const Kp = {
  left: Te.LEFT,
  center: Te.CENTER,
  right: Te.RIGHT,
  justified: Te.JUSTIFIED,
  both: Te.JUSTIFIED
};
function gu(t) {
  return Kp[t] ?? Te.LEFT;
}
const Vp = {
  percentage: ze.PERCENTAGE,
  pct: ze.PERCENTAGE,
  dxa: ze.DXA,
  auto: ze.AUTO,
  nil: ze.NIL
};
function Xp(t) {
  return Vp[t] ?? ze.DXA;
}
function wu(t) {
  const e = We(t.size) ?? 0, r = t.type;
  return r === "pct" || r === "percentage" ? {
    size: String(e * 50),
    type: ze.PERCENTAGE
  } : {
    size: e,
    type: Xp(r)
  };
}
const $p = {
  single: Pe.SINGLE,
  double: Pe.DOUBLE,
  dotted: Pe.DOTTED,
  dashed: Pe.DASHED,
  none: Pe.NONE,
  nil: Pe.NIL,
  thick: Pe.THICK,
  triple: Pe.TRIPLE
};
function yu(t) {
  const e = {};
  for (const [r, n] of Object.entries(t))
    e[r] = {
      style: $p[n.style] ?? Pe.SINGLE,
      size: We(n.size) ?? 1,
      color: n.color || "000000"
    };
  return e;
}
const Zp = {
  clear: Je.CLEAR,
  nil: Je.NIL,
  solid: Je.CLEAR,
  // alias — `solid` is the natural prop name
  diagonalCross: Je.DIAGONAL_CROSS,
  diagonalStripe: Je.DIAGONAL_STRIPE,
  horizontalStripe: Je.HORIZONTAL_STRIPE,
  verticalStripe: Je.VERTICAL_STRIPE
};
function Yp(t) {
  const e = t.fill || "000000", r = Zp[t.type] ?? Je.CLEAR, n = t.color || "auto";
  return { type: r, fill: e, color: n };
}
const Jp = {
  top: Bt.TOP,
  center: Bt.CENTER,
  middle: Bt.CENTER,
  // alias — natural-language CSS-ish
  bottom: Bt.BOTTOM
};
function Qp(t) {
  return Jp[t] ?? Bt.TOP;
}
const em = {
  left: Oe.LEFT,
  right: Oe.RIGHT,
  center: Oe.CENTER,
  decimal: Oe.DECIMAL,
  bar: Oe.BAR,
  clear: Oe.CLEAR,
  end: Oe.END,
  num: Oe.NUM,
  start: Oe.START
}, tm = {
  none: Ct.NONE,
  dot: Ct.DOT,
  hyphen: Ct.HYPHEN,
  underscore: Ct.UNDERSCORE,
  middleDot: Ct.MIDDLE_DOT
};
function rm(t) {
  if (!t || typeof t != "object") return null;
  const e = em[t.type] ?? Oe.LEFT, r = typeof t.position == "string" ? parseInt(t.position, 10) : t.position;
  if (!Number.isFinite(r)) return null;
  const n = { type: e, position: r };
  if (t.leader) {
    const o = tm[t.leader];
    o && (n.leader = o);
  }
  return n;
}
const nm = {
  left: nr.LEFT,
  center: nr.CENTER,
  right: nr.RIGHT
};
function im(t) {
  return nm[t] ?? nr.LEFT;
}
const am = {
  none: ut.NONE,
  dot: ut.DOT,
  hyphen: ut.HYPHEN,
  underscore: ut.UNDERSCORE,
  heavy: ut.HEAVY,
  middleDot: ut.MIDDLE_DOT
};
function sm(t) {
  return am[t] ?? ut.NONE;
}
const om = {
  indent: Ei.INDENT,
  margin: Ei.MARGIN
};
function um(t) {
  return om[t] ?? Ei.MARGIN;
}
async function lm(t) {
  return ji(t);
}
async function cm(t) {
  return mu(t);
}
let hm = 1;
function fm(t, e) {
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
async function dm(t, e) {
  try {
    const r = t.src || "";
    if (!r) return new xe({});
    const n = await pm(r, e), o = We(t.transformation?.width) ?? 400, l = We(t.transformation?.height) ?? 300, f = {
      type: fm(r, n),
      data: n,
      transformation: { width: o, height: l },
      altText: {
        id: hm++,
        name: "",
        ...t.altText || {}
      }
    };
    t.floating && (f.floating = t.floating);
    const a = {
      children: [new bh(f)]
    };
    return t.alignment && (a.alignment = gu(t.alignment)), new xe(a);
  } catch (r) {
    return console.error("Error creating image element:", r), new xe({});
  }
}
async function pm(t, e) {
  const { bytes: r } = await Eu(t, { loadAsset: e });
  return r;
}
export {
  Dp as buildDocument,
  vm as compileDocx,
  tr as createDefaultHeaderFooter
};
//# sourceMappingURL=docx-CvPyWWkt.js.map
