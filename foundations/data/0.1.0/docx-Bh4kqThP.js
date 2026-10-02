import { f as Da } from "./fetch-C-PgllAm.js";
import { D as xr, r as La, a as Ba } from "./_entry.generated-DXgKTfBK.js";
var Ma = Object.create, Xn = Object.defineProperty, Ua = Object.getOwnPropertyDescriptor, ja = Object.getOwnPropertyNames, Wa = Object.getPrototypeOf, za = Object.prototype.hasOwnProperty, Zn = (e, t, r) => () => {
  if (r) throw r[0];
  try {
    return e && (t = e(e = 0)), t;
  } catch (n) {
    throw r = [n], n;
  }
}, he = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), Ha = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function") for (var l = ja(t), i = 0, u = l.length, s; i < u; i++)
    s = l[i], !za.call(e, s) && s !== r && Xn(e, s, {
      get: ((c) => t[c]).bind(null, s),
      enumerable: !(n = Ua(t, s)) || n.enumerable
    });
  return e;
}, qr = (e, t, r) => (r = e != null ? Ma(Wa(e)) : {}, Ha(Xn(r, "default", {
  value: e,
  enumerable: !0
}), e)), Jt = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Calling `require` for "' + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
function zt(e) {
  "@babel/helpers - typeof";
  return zt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zt(e);
}
function Ga(e, t) {
  if (zt(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (zt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ka(e) {
  var t = Ga(e, "string");
  return zt(t) == "symbol" ? t : t + "";
}
function J(e, t, r) {
  return (t = Ka(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var Ht = class {
  /**
  * Creates a new BaseXmlComponent with the specified XML element name.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(e) {
    J(
      this,
      /** The XML element name for this component (e.g., "w:p" for paragraph). */
      "rootKey",
      void 0
    ), this.rootKey = e;
  }
  /**
  * The components written in this one's place, one after another, when it can't be written as a single element,
  * such as a run with another run in its children. Undefined when it is written as itself.
  *
  * @internal
  */
  get writtenAs() {
  }
}, $a = Object.seal({}), ae = class extends Ht {
  /**
  * Creates a new XmlComponent.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(e) {
    super(e), J(
      this,
      /**
      * Array of child components, text nodes, and attributes.
      *
      * This array forms the content of the XML element. It can contain other
      * XmlComponents, string values (text nodes), or attribute components.
      */
      "root",
      void 0
    ), this.root = new Array();
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
    var t;
    e.stack.push(this);
    const r = this.root.flatMap((n) => {
      if (n instanceof Ht) {
        const l = n.writtenAs;
        return l ? l.map((i) => i.prepForXml(e)) : n.prepForXml(e);
      }
      return n;
    }).filter((n) => n !== void 0);
    return e.stack.pop(), { [this.rootKey]: r.length ? r.length === 1 && (!((t = r[0]) === null || t === void 0) && t._attr) ? r[0] : r : $a };
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
}, tt = class extends ae {
  constructor(e, t) {
    super(e), J(this, "includeIfEmpty", void 0), this.includeIfEmpty = t;
  }
  /**
  * Prepares the component for XML serialization, excluding it if empty.
  *
  * @param context - The serialization context
  * @returns The XML-serializable object, or undefined if empty
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    return this.includeIfEmpty || t && (typeof t[this.rootKey] != "object" || Object.keys(t[this.rootKey]).length) ? t : void 0;
  }
};
function bn(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(l) {
      return Object.getOwnPropertyDescriptor(e, l).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function de(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bn(Object(r), !0).forEach(function(n) {
      J(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bn(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
var ve = class extends Ht {
  /**
  * Creates a new attribute component.
  *
  * @param root - The attribute data object
  */
  constructor(e) {
    super("_attr"), J(this, "root", void 0), J(
      this,
      /** Optional mapping from property names to XML attribute names. */
      "xmlKeys",
      void 0
    ), this.root = e;
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
    const t = {};
    return Object.entries(this.root).forEach(([r, n]) => {
      if (n !== void 0) {
        const l = this.xmlKeys && this.xmlKeys[r] || r;
        t[l] = n;
      }
    }), { _attr: t };
  }
}, Xr = class extends Ht {
  /**
  * Creates a new NextAttributeComponent.
  *
  * @param root - Attribute payload with explicit key-value mappings
  */
  constructor(e) {
    super("_attr"), J(this, "root", void 0), this.root = e;
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
    return { _attr: Object.values(this.root).filter(({ value: t }) => t !== void 0).reduce((t, { key: r, value: n }) => de(de({}, t), {}, { [r]: n }), {}) };
  }
}, Oe = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
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
}, Zr = /* @__PURE__ */ he(((e, t) => {
  var r = typeof Reflect == "object" ? Reflect : null, n = r && typeof r.apply == "function" ? r.apply : function(P, M, C) {
    return Function.prototype.apply.call(P, M, C);
  }, l;
  r && typeof r.ownKeys == "function" ? l = r.ownKeys : Object.getOwnPropertySymbols ? l = function(P) {
    return Object.getOwnPropertyNames(P).concat(Object.getOwnPropertySymbols(P));
  } : l = function(P) {
    return Object.getOwnPropertyNames(P);
  };
  function i(p) {
    console && console.warn && console.warn(p);
  }
  var u = Number.isNaN || function(P) {
    return P !== P;
  };
  function s() {
    s.init.call(this);
  }
  t.exports = s, t.exports.once = _, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
  var c = 10;
  function y(p) {
    if (typeof p != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof p);
  }
  Object.defineProperty(s, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return c;
    },
    set: function(p) {
      if (typeof p != "number" || p < 0 || u(p)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + p + ".");
      c = p;
    }
  }), s.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, s.prototype.setMaxListeners = function(P) {
    if (typeof P != "number" || P < 0 || u(P)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + P + ".");
    return this._maxListeners = P, this;
  };
  function b(p) {
    return p._maxListeners === void 0 ? s.defaultMaxListeners : p._maxListeners;
  }
  s.prototype.getMaxListeners = function() {
    return b(this);
  }, s.prototype.emit = function(P) {
    for (var M = [], C = 1; C < arguments.length; C++) M.push(arguments[C]);
    var $ = P === "error", ee = this._events;
    if (ee !== void 0) $ = $ && ee.error === void 0;
    else if (!$) return !1;
    if ($) {
      var O;
      if (M.length > 0 && (O = M[0]), O instanceof Error) throw O;
      var z = /* @__PURE__ */ new Error("Unhandled error." + (O ? " (" + O.message + ")" : ""));
      throw z.context = O, z;
    }
    var k = ee[P];
    if (k === void 0) return !1;
    if (typeof k == "function") n(k, this, M);
    else
      for (var H = k.length, Q = E(k, H), C = 0; C < H; ++C) n(Q[C], this, M);
    return !0;
  };
  function v(p, P, M, C) {
    var $, ee, O;
    if (y(M), ee = p._events, ee === void 0 ? (ee = p._events = /* @__PURE__ */ Object.create(null), p._eventsCount = 0) : (ee.newListener !== void 0 && (p.emit("newListener", P, M.listener ? M.listener : M), ee = p._events), O = ee[P]), O === void 0)
      O = ee[P] = M, ++p._eventsCount;
    else if (typeof O == "function" ? O = ee[P] = C ? [M, O] : [O, M] : C ? O.unshift(M) : O.push(M), $ = b(p), $ > 0 && O.length > $ && !O.warned) {
      O.warned = !0;
      var z = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + O.length + " " + String(P) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      z.name = "MaxListenersExceededWarning", z.emitter = p, z.type = P, z.count = O.length, i(z);
    }
    return p;
  }
  s.prototype.addListener = function(P, M) {
    return v(this, P, M, !1);
  }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(P, M) {
    return v(this, P, M, !0);
  };
  function I() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function m(p, P, M) {
    var C = {
      fired: !1,
      wrapFn: void 0,
      target: p,
      type: P,
      listener: M
    }, $ = I.bind(C);
    return $.listener = M, C.wrapFn = $, $;
  }
  s.prototype.once = function(P, M) {
    return y(M), this.on(P, m(this, P, M)), this;
  }, s.prototype.prependOnceListener = function(P, M) {
    return y(M), this.prependListener(P, m(this, P, M)), this;
  }, s.prototype.removeListener = function(P, M) {
    var C, $, ee, O, z;
    if (y(M), $ = this._events, $ === void 0) return this;
    if (C = $[P], C === void 0) return this;
    if (C === M || C.listener === M)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete $[P], $.removeListener && this.emit("removeListener", P, C.listener || M));
    else if (typeof C != "function") {
      for (ee = -1, O = C.length - 1; O >= 0; O--) if (C[O] === M || C[O].listener === M) {
        z = C[O].listener, ee = O;
        break;
      }
      if (ee < 0) return this;
      ee === 0 ? C.shift() : R(C, ee), C.length === 1 && ($[P] = C[0]), $.removeListener !== void 0 && this.emit("removeListener", P, z || M);
    }
    return this;
  }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(P) {
    var M, C = this._events, $;
    if (C === void 0) return this;
    if (C.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : C[P] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete C[P]), this;
    if (arguments.length === 0) {
      var ee = Object.keys(C), O;
      for ($ = 0; $ < ee.length; ++$)
        O = ee[$], O !== "removeListener" && this.removeAllListeners(O);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (M = C[P], typeof M == "function") this.removeListener(P, M);
    else if (M !== void 0) for ($ = M.length - 1; $ >= 0; $--) this.removeListener(P, M[$]);
    return this;
  };
  function w(p, P, M) {
    var C = p._events;
    if (C === void 0) return [];
    var $ = C[P];
    return $ === void 0 ? [] : typeof $ == "function" ? M ? [$.listener || $] : [$] : M ? x($) : E($, $.length);
  }
  s.prototype.listeners = function(P) {
    return w(this, P, !0);
  }, s.prototype.rawListeners = function(P) {
    return w(this, P, !1);
  }, s.listenerCount = function(p, P) {
    return typeof p.listenerCount == "function" ? p.listenerCount(P) : g.call(p, P);
  }, s.prototype.listenerCount = g;
  function g(p) {
    var P = this._events;
    if (P !== void 0) {
      var M = P[p];
      if (typeof M == "function") return 1;
      if (M !== void 0) return M.length;
    }
    return 0;
  }
  s.prototype.eventNames = function() {
    return this._eventsCount > 0 ? l(this._events) : [];
  };
  function E(p, P) {
    for (var M = new Array(P), C = 0; C < P; ++C) M[C] = p[C];
    return M;
  }
  function R(p, P) {
    for (; P + 1 < p.length; P++) p[P] = p[P + 1];
    p.pop();
  }
  function x(p) {
    for (var P = new Array(p.length), M = 0; M < P.length; ++M) P[M] = p[M].listener || p[M];
    return P;
  }
  function _(p, P) {
    return new Promise(function(M, C) {
      function $(O) {
        p.removeListener(P, ee), C(O);
      }
      function ee() {
        typeof p.removeListener == "function" && p.removeListener("error", $), M([].slice.call(arguments));
      }
      S(p, P, ee, { once: !0 }), P !== "error" && T(p, $, { once: !0 });
    });
  }
  function T(p, P, M) {
    typeof p.on == "function" && S(p, "error", P, M);
  }
  function S(p, P, M, C) {
    if (typeof p.on == "function")
      C.once ? p.once(P, M) : p.on(P, M);
    else if (typeof p.addEventListener == "function") p.addEventListener(P, function $(ee) {
      C.once && p.removeEventListener(P, $), M(ee);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof p);
  }
})), rt = /* @__PURE__ */ he(((e, t) => {
  typeof Object.create == "function" ? t.exports = function(n, l) {
    l && (n.super_ = l, n.prototype = Object.create(l.prototype, { constructor: {
      value: n,
      enumerable: !1,
      writable: !0,
      configurable: !0
    } }));
  } : t.exports = function(n, l) {
    if (l) {
      n.super_ = l;
      var i = function() {
      };
      i.prototype = l.prototype, n.prototype = new i(), n.prototype.constructor = n;
    }
  };
})), Re, _t = Zn((() => {
  Re = globalThis || self;
}));
function Va(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function jr() {
  throw new Error("setTimeout has not been defined");
}
function Wr() {
  throw new Error("clearTimeout has not been defined");
}
function Yn(e) {
  if (Ue === setTimeout) return setTimeout(e, 0);
  if ((Ue === jr || !Ue) && setTimeout)
    return Ue = setTimeout, setTimeout(e, 0);
  try {
    return Ue(e, 0);
  } catch {
    try {
      return Ue.call(null, e, 0);
    } catch {
      return Ue.call(this, e, 0);
    }
  }
}
function qa(e) {
  if (je === clearTimeout) return clearTimeout(e);
  if ((je === Wr || !je) && clearTimeout)
    return je = clearTimeout, clearTimeout(e);
  try {
    return je(e);
  } catch {
    try {
      return je.call(null, e);
    } catch {
      return je.call(this, e);
    }
  }
}
function Xa() {
  !ut || !lt || (ut = !1, lt.length ? ze = lt.concat(ze) : jt = -1, ze.length && Jn());
}
function Jn() {
  if (!ut) {
    var e = Yn(Xa);
    ut = !0;
    for (var t = ze.length; t; ) {
      for (lt = ze, ze = []; ++jt < t; ) lt && lt[jt].run();
      jt = -1, t = ze.length;
    }
    lt = null, ut = !1, qa(e);
  }
}
function _n(e, t) {
  this.fun = e, this.array = t;
}
function Ve() {
}
var Er, _e, Ue, je, ze, ut, lt, jt, xn, ge, nt = Zn((() => {
  Er = { exports: {} }, _e = Er.exports = {}, (function() {
    try {
      typeof setTimeout == "function" ? Ue = setTimeout : Ue = jr;
    } catch {
      Ue = jr;
    }
    try {
      typeof clearTimeout == "function" ? je = clearTimeout : je = Wr;
    } catch {
      je = Wr;
    }
  })(), ze = [], ut = !1, jt = -1, _e.nextTick = function(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    ze.push(new _n(e, t)), ze.length === 1 && !ut && Yn(Jn);
  }, _n.prototype.run = function() {
    this.fun.apply(null, this.array);
  }, _e.title = "browser", _e.browser = !0, _e.env = {}, _e.argv = [], _e.version = "", _e.versions = {}, _e.on = Ve, _e.addListener = Ve, _e.once = Ve, _e.off = Ve, _e.removeListener = Ve, _e.removeAllListeners = Ve, _e.emit = Ve, _e.prependListener = Ve, _e.prependOnceListener = Ve, _e.listeners = function(e) {
    return [];
  }, _e.binding = function(e) {
    throw new Error("process.binding is not supported");
  }, _e.cwd = function() {
    return "/";
  }, _e.chdir = function(e) {
    throw new Error("process.chdir is not supported");
  }, _e.umask = function() {
    return 0;
  }, xn = Er.exports, ge = /* @__PURE__ */ Va(xn);
})), Qn = /* @__PURE__ */ he(((e, t) => {
  t.exports = Zr().EventEmitter;
})), Za = /* @__PURE__ */ he(((e) => {
  e.byteLength = c, e.toByteArray = b, e.fromByteArray = m;
  for (var t = [], r = [], n = typeof Uint8Array < "u" ? Uint8Array : Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, u = l.length; i < u; ++i)
    t[i] = l[i], r[l.charCodeAt(i)] = i;
  r[45] = 62, r[95] = 63;
  function s(w) {
    var g = w.length;
    if (g % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var E = w.indexOf("=");
    E === -1 && (E = g);
    var R = E === g ? 0 : 4 - E % 4;
    return [E, R];
  }
  function c(w) {
    var g = s(w), E = g[0], R = g[1];
    return (E + R) * 3 / 4 - R;
  }
  function y(w, g, E) {
    return (g + E) * 3 / 4 - E;
  }
  function b(w) {
    for (var g, E = s(w), R = E[0], x = E[1], _ = new n(y(w, R, x)), T = 0, S = x > 0 ? R - 4 : R, p = 0; p < S; p += 4)
      g = r[w.charCodeAt(p)] << 18 | r[w.charCodeAt(p + 1)] << 12 | r[w.charCodeAt(p + 2)] << 6 | r[w.charCodeAt(p + 3)], _[T++] = g >> 16 & 255, _[T++] = g >> 8 & 255, _[T++] = g & 255;
    return x === 2 && (g = r[w.charCodeAt(p)] << 2 | r[w.charCodeAt(p + 1)] >> 4, _[T++] = g & 255), x === 1 && (g = r[w.charCodeAt(p)] << 10 | r[w.charCodeAt(p + 1)] << 4 | r[w.charCodeAt(p + 2)] >> 2, _[T++] = g >> 8 & 255, _[T++] = g & 255), _;
  }
  function v(w) {
    return t[w >> 18 & 63] + t[w >> 12 & 63] + t[w >> 6 & 63] + t[w & 63];
  }
  function I(w, g, E) {
    for (var R, x = [], _ = g; _ < E; _ += 3)
      R = (w[_] << 16 & 16711680) + (w[_ + 1] << 8 & 65280) + (w[_ + 2] & 255), x.push(v(R));
    return x.join("");
  }
  function m(w) {
    for (var g, E = w.length, R = E % 3, x = [], _ = 16383, T = 0, S = E - R; T < S; T += _) x.push(I(w, T, T + _ > S ? S : T + _));
    return R === 1 ? (g = w[E - 1], x.push(t[g >> 2] + t[g << 4 & 63] + "==")) : R === 2 && (g = (w[E - 2] << 8) + w[E - 1], x.push(t[g >> 10] + t[g >> 4 & 63] + t[g << 2 & 63] + "=")), x.join("");
  }
})), Ya = /* @__PURE__ */ he(((e) => {
  e.read = function(t, r, n, l, i) {
    var u, s, c = i * 8 - l - 1, y = (1 << c) - 1, b = y >> 1, v = -7, I = n ? i - 1 : 0, m = n ? -1 : 1, w = t[r + I];
    for (I += m, u = w & (1 << -v) - 1, w >>= -v, v += c; v > 0; u = u * 256 + t[r + I], I += m, v -= 8) ;
    for (s = u & (1 << -v) - 1, u >>= -v, v += l; v > 0; s = s * 256 + t[r + I], I += m, v -= 8) ;
    if (u === 0) u = 1 - b;
    else {
      if (u === y) return s ? NaN : (w ? -1 : 1) * (1 / 0);
      s = s + Math.pow(2, l), u = u - b;
    }
    return (w ? -1 : 1) * s * Math.pow(2, u - l);
  }, e.write = function(t, r, n, l, i, u) {
    var s, c, y, b = u * 8 - i - 1, v = (1 << b) - 1, I = v >> 1, m = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, w = l ? 0 : u - 1, g = l ? 1 : -1, E = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
    for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (c = isNaN(r) ? 1 : 0, s = v) : (s = Math.floor(Math.log(r) / Math.LN2), r * (y = Math.pow(2, -s)) < 1 && (s--, y *= 2), s + I >= 1 ? r += m / y : r += m * Math.pow(2, 1 - I), r * y >= 2 && (s++, y /= 2), s + I >= v ? (c = 0, s = v) : s + I >= 1 ? (c = (r * y - 1) * Math.pow(2, i), s = s + I) : (c = r * Math.pow(2, I - 1) * Math.pow(2, i), s = 0)); i >= 8; t[n + w] = c & 255, w += g, c /= 256, i -= 8) ;
    for (s = s << i | c, b += i; b > 0; t[n + w] = s & 255, w += g, s /= 256, b -= 8) ;
    t[n + w - g] |= E * 128;
  };
}));
var dr = /* @__PURE__ */ he(((e) => {
  var t = Za(), r = Ya(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = s, e.SlowBuffer = x, e.INSPECT_MAX_BYTES = 50;
  var l = 2147483647;
  e.kMaxLength = l, s.TYPED_ARRAY_SUPPORT = i(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function i() {
    try {
      var N = /* @__PURE__ */ new Uint8Array(1), a = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(a, Uint8Array.prototype), Object.setPrototypeOf(N, a), N.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(s.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (s.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(s.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (s.isBuffer(this))
        return this.byteOffset;
    }
  });
  function u(N) {
    if (N > l) throw new RangeError('The value "' + N + '" is invalid for option "size"');
    var a = new Uint8Array(N);
    return Object.setPrototypeOf(a, s.prototype), a;
  }
  function s(N, a, o) {
    if (typeof N == "number") {
      if (typeof a == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return v(N);
    }
    return c(N, a, o);
  }
  s.poolSize = 8192;
  function c(N, a, o) {
    if (typeof N == "string") return I(N, a);
    if (ArrayBuffer.isView(N)) return w(N);
    if (N == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof N);
    if (L(N, ArrayBuffer) || N && L(N.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (L(N, SharedArrayBuffer) || N && L(N.buffer, SharedArrayBuffer))) return g(N, a, o);
    if (typeof N == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var d = N.valueOf && N.valueOf();
    if (d != null && d !== N) return s.from(d, a, o);
    var B = E(N);
    if (B) return B;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof N[Symbol.toPrimitive] == "function") return s.from(N[Symbol.toPrimitive]("string"), a, o);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof N);
  }
  s.from = function(N, a, o) {
    return c(N, a, o);
  }, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array);
  function y(N) {
    if (typeof N != "number") throw new TypeError('"size" argument must be of type number');
    if (N < 0) throw new RangeError('The value "' + N + '" is invalid for option "size"');
  }
  function b(N, a, o) {
    return y(N), N <= 0 ? u(N) : a !== void 0 ? typeof o == "string" ? u(N).fill(a, o) : u(N).fill(a) : u(N);
  }
  s.alloc = function(N, a, o) {
    return b(N, a, o);
  };
  function v(N) {
    return y(N), u(N < 0 ? 0 : R(N) | 0);
  }
  s.allocUnsafe = function(N) {
    return v(N);
  }, s.allocUnsafeSlow = function(N) {
    return v(N);
  };
  function I(N, a) {
    if ((typeof a != "string" || a === "") && (a = "utf8"), !s.isEncoding(a)) throw new TypeError("Unknown encoding: " + a);
    var o = _(N, a) | 0, d = u(o), B = d.write(N, a);
    return B !== o && (d = d.slice(0, B)), d;
  }
  function m(N) {
    for (var a = N.length < 0 ? 0 : R(N.length) | 0, o = u(a), d = 0; d < a; d += 1) o[d] = N[d] & 255;
    return o;
  }
  function w(N) {
    if (L(N, Uint8Array)) {
      var a = new Uint8Array(N);
      return g(a.buffer, a.byteOffset, a.byteLength);
    }
    return m(N);
  }
  function g(N, a, o) {
    if (a < 0 || N.byteLength < a) throw new RangeError('"offset" is outside of buffer bounds');
    if (N.byteLength < a + (o || 0)) throw new RangeError('"length" is outside of buffer bounds');
    var d;
    return a === void 0 && o === void 0 ? d = new Uint8Array(N) : o === void 0 ? d = new Uint8Array(N, a) : d = new Uint8Array(N, a, o), Object.setPrototypeOf(d, s.prototype), d;
  }
  function E(N) {
    if (s.isBuffer(N)) {
      var a = R(N.length) | 0, o = u(a);
      return o.length === 0 || N.copy(o, 0, 0, a), o;
    }
    if (N.length !== void 0)
      return typeof N.length != "number" || h(N.length) ? u(0) : m(N);
    if (N.type === "Buffer" && Array.isArray(N.data)) return m(N.data);
  }
  function R(N) {
    if (N >= l) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + l.toString(16) + " bytes");
    return N | 0;
  }
  function x(N) {
    return +N != N && (N = 0), s.alloc(+N);
  }
  s.isBuffer = function(a) {
    return a != null && a._isBuffer === !0 && a !== s.prototype;
  }, s.compare = function(a, o) {
    if (L(a, Uint8Array) && (a = s.from(a, a.offset, a.byteLength)), L(o, Uint8Array) && (o = s.from(o, o.offset, o.byteLength)), !s.isBuffer(a) || !s.isBuffer(o)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === o) return 0;
    for (var d = a.length, B = o.length, G = 0, W = Math.min(d, B); G < W; ++G) if (a[G] !== o[G]) {
      d = a[G], B = o[G];
      break;
    }
    return d < B ? -1 : B < d ? 1 : 0;
  }, s.isEncoding = function(a) {
    switch (String(a).toLowerCase()) {
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
  }, s.concat = function(a, o) {
    if (!Array.isArray(a)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (a.length === 0) return s.alloc(0);
    var d;
    if (o === void 0)
      for (o = 0, d = 0; d < a.length; ++d) o += a[d].length;
    var B = s.allocUnsafe(o), G = 0;
    for (d = 0; d < a.length; ++d) {
      var W = a[d];
      if (L(W, Uint8Array))
        G + W.length > B.length ? s.from(W).copy(B, G) : Uint8Array.prototype.set.call(B, W, G);
      else if (s.isBuffer(W)) W.copy(B, G);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      G += W.length;
    }
    return B;
  };
  function _(N, a) {
    if (s.isBuffer(N)) return N.length;
    if (ArrayBuffer.isView(N) || L(N, ArrayBuffer)) return N.byteLength;
    if (typeof N != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof N);
    var o = N.length, d = arguments.length > 2 && arguments[2] === !0;
    if (!d && o === 0) return 0;
    for (var B = !1; ; ) switch (a) {
      case "ascii":
      case "latin1":
      case "binary":
        return o;
      case "utf8":
      case "utf-8":
        return f(N).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return o * 2;
      case "hex":
        return o >>> 1;
      case "base64":
        return ne(N).length;
      default:
        if (B) return d ? -1 : f(N).length;
        a = ("" + a).toLowerCase(), B = !0;
    }
  }
  s.byteLength = _;
  function T(N, a, o) {
    var d = !1;
    if ((a === void 0 || a < 0) && (a = 0), a > this.length || ((o === void 0 || o > this.length) && (o = this.length), o <= 0) || (o >>>= 0, a >>>= 0, o <= a)) return "";
    for (N || (N = "utf8"); ; ) switch (N) {
      case "hex":
        return Z(this, a, o);
      case "utf8":
      case "utf-8":
        return k(this, a, o);
      case "ascii":
        return q(this, a, o);
      case "latin1":
      case "binary":
        return le(this, a, o);
      case "base64":
        return z(this, a, o);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return te(this, a, o);
      default:
        if (d) throw new TypeError("Unknown encoding: " + N);
        N = (N + "").toLowerCase(), d = !0;
    }
  }
  s.prototype._isBuffer = !0;
  function S(N, a, o) {
    var d = N[a];
    N[a] = N[o], N[o] = d;
  }
  s.prototype.swap16 = function() {
    var a = this.length;
    if (a % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var o = 0; o < a; o += 2) S(this, o, o + 1);
    return this;
  }, s.prototype.swap32 = function() {
    var a = this.length;
    if (a % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var o = 0; o < a; o += 4)
      S(this, o, o + 3), S(this, o + 1, o + 2);
    return this;
  }, s.prototype.swap64 = function() {
    var a = this.length;
    if (a % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var o = 0; o < a; o += 8)
      S(this, o, o + 7), S(this, o + 1, o + 6), S(this, o + 2, o + 5), S(this, o + 3, o + 4);
    return this;
  }, s.prototype.toString = function() {
    var a = this.length;
    return a === 0 ? "" : arguments.length === 0 ? k(this, 0, a) : T.apply(this, arguments);
  }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(a) {
    if (!s.isBuffer(a)) throw new TypeError("Argument must be a Buffer");
    return this === a ? !0 : s.compare(this, a) === 0;
  }, s.prototype.inspect = function() {
    var a = "", o = e.INSPECT_MAX_BYTES;
    return a = this.toString("hex", 0, o).replace(/(.{2})/g, "$1 ").trim(), this.length > o && (a += " ... "), "<Buffer " + a + ">";
  }, n && (s.prototype[n] = s.prototype.inspect), s.prototype.compare = function(a, o, d, B, G) {
    if (L(a, Uint8Array) && (a = s.from(a, a.offset, a.byteLength)), !s.isBuffer(a)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof a);
    if (o === void 0 && (o = 0), d === void 0 && (d = a ? a.length : 0), B === void 0 && (B = 0), G === void 0 && (G = this.length), o < 0 || d > a.length || B < 0 || G > this.length) throw new RangeError("out of range index");
    if (B >= G && o >= d) return 0;
    if (B >= G) return -1;
    if (o >= d) return 1;
    if (o >>>= 0, d >>>= 0, B >>>= 0, G >>>= 0, this === a) return 0;
    for (var W = G - B, ie = d - o, ue = Math.min(W, ie), se = this.slice(B, G), fe = a.slice(o, d), me = 0; me < ue; ++me) if (se[me] !== fe[me]) {
      W = se[me], ie = fe[me];
      break;
    }
    return W < ie ? -1 : ie < W ? 1 : 0;
  };
  function p(N, a, o, d, B) {
    if (N.length === 0) return -1;
    if (typeof o == "string" ? (d = o, o = 0) : o > 2147483647 ? o = 2147483647 : o < -2147483648 && (o = -2147483648), o = +o, h(o) && (o = B ? 0 : N.length - 1), o < 0 && (o = N.length + o), o >= N.length) {
      if (B) return -1;
      o = N.length - 1;
    } else if (o < 0)
      if (B) o = 0;
      else return -1;
    if (typeof a == "string" && (a = s.from(a, d)), s.isBuffer(a))
      return a.length === 0 ? -1 : P(N, a, o, d, B);
    if (typeof a == "number")
      return a = a & 255, typeof Uint8Array.prototype.indexOf == "function" ? B ? Uint8Array.prototype.indexOf.call(N, a, o) : Uint8Array.prototype.lastIndexOf.call(N, a, o) : P(N, [a], o, d, B);
    throw new TypeError("val must be string, number or Buffer");
  }
  function P(N, a, o, d, B) {
    var G = 1, W = N.length, ie = a.length;
    if (d !== void 0 && (d = String(d).toLowerCase(), d === "ucs2" || d === "ucs-2" || d === "utf16le" || d === "utf-16le")) {
      if (N.length < 2 || a.length < 2) return -1;
      G = 2, W /= 2, ie /= 2, o /= 2;
    }
    function ue(Se, Qe) {
      return G === 1 ? Se[Qe] : Se.readUInt16BE(Qe * G);
    }
    var se;
    if (B) {
      var fe = -1;
      for (se = o; se < W; se++) if (ue(N, se) === ue(a, fe === -1 ? 0 : se - fe)) {
        if (fe === -1 && (fe = se), se - fe + 1 === ie) return fe * G;
      } else
        fe !== -1 && (se -= se - fe), fe = -1;
    } else
      for (o + ie > W && (o = W - ie), se = o; se >= 0; se--) {
        for (var me = !0, we = 0; we < ie; we++) if (ue(N, se + we) !== ue(a, we)) {
          me = !1;
          break;
        }
        if (me) return se;
      }
    return -1;
  }
  s.prototype.includes = function(a, o, d) {
    return this.indexOf(a, o, d) !== -1;
  }, s.prototype.indexOf = function(a, o, d) {
    return p(this, a, o, d, !0);
  }, s.prototype.lastIndexOf = function(a, o, d) {
    return p(this, a, o, d, !1);
  };
  function M(N, a, o, d) {
    o = Number(o) || 0;
    var B = N.length - o;
    d ? (d = Number(d), d > B && (d = B)) : d = B;
    var G = a.length;
    d > G / 2 && (d = G / 2);
    for (var W = 0; W < d; ++W) {
      var ie = parseInt(a.substr(W * 2, 2), 16);
      if (h(ie)) return W;
      N[o + W] = ie;
    }
    return W;
  }
  function C(N, a, o, d) {
    return D(f(a, N.length - o), N, o, d);
  }
  function $(N, a, o, d) {
    return D(j(a), N, o, d);
  }
  function ee(N, a, o, d) {
    return D(ne(a), N, o, d);
  }
  function O(N, a, o, d) {
    return D(U(a, N.length - o), N, o, d);
  }
  s.prototype.write = function(a, o, d, B) {
    if (o === void 0)
      B = "utf8", d = this.length, o = 0;
    else if (d === void 0 && typeof o == "string")
      B = o, d = this.length, o = 0;
    else if (isFinite(o))
      o = o >>> 0, isFinite(d) ? (d = d >>> 0, B === void 0 && (B = "utf8")) : (B = d, d = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    var G = this.length - o;
    if ((d === void 0 || d > G) && (d = G), a.length > 0 && (d < 0 || o < 0) || o > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    B || (B = "utf8");
    for (var W = !1; ; ) switch (B) {
      case "hex":
        return M(this, a, o, d);
      case "utf8":
      case "utf-8":
        return C(this, a, o, d);
      case "ascii":
      case "latin1":
      case "binary":
        return $(this, a, o, d);
      case "base64":
        return ee(this, a, o, d);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return O(this, a, o, d);
      default:
        if (W) throw new TypeError("Unknown encoding: " + B);
        B = ("" + B).toLowerCase(), W = !0;
    }
  }, s.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function z(N, a, o) {
    return a === 0 && o === N.length ? t.fromByteArray(N) : t.fromByteArray(N.slice(a, o));
  }
  function k(N, a, o) {
    o = Math.min(N.length, o);
    for (var d = [], B = a; B < o; ) {
      var G = N[B], W = null, ie = G > 239 ? 4 : G > 223 ? 3 : G > 191 ? 2 : 1;
      if (B + ie <= o) {
        var ue, se, fe, me;
        switch (ie) {
          case 1:
            G < 128 && (W = G);
            break;
          case 2:
            ue = N[B + 1], (ue & 192) === 128 && (me = (G & 31) << 6 | ue & 63, me > 127 && (W = me));
            break;
          case 3:
            ue = N[B + 1], se = N[B + 2], (ue & 192) === 128 && (se & 192) === 128 && (me = (G & 15) << 12 | (ue & 63) << 6 | se & 63, me > 2047 && (me < 55296 || me > 57343) && (W = me));
            break;
          case 4:
            ue = N[B + 1], se = N[B + 2], fe = N[B + 3], (ue & 192) === 128 && (se & 192) === 128 && (fe & 192) === 128 && (me = (G & 15) << 18 | (ue & 63) << 12 | (se & 63) << 6 | fe & 63, me > 65535 && me < 1114112 && (W = me));
        }
      }
      W === null ? (W = 65533, ie = 1) : W > 65535 && (W -= 65536, d.push(W >>> 10 & 1023 | 55296), W = 56320 | W & 1023), d.push(W), B += ie;
    }
    return Q(d);
  }
  var H = 4096;
  function Q(N) {
    var a = N.length;
    if (a <= H) return String.fromCharCode.apply(String, N);
    for (var o = "", d = 0; d < a; ) o += String.fromCharCode.apply(String, N.slice(d, d += H));
    return o;
  }
  function q(N, a, o) {
    var d = "";
    o = Math.min(N.length, o);
    for (var B = a; B < o; ++B) d += String.fromCharCode(N[B] & 127);
    return d;
  }
  function le(N, a, o) {
    var d = "";
    o = Math.min(N.length, o);
    for (var B = a; B < o; ++B) d += String.fromCharCode(N[B]);
    return d;
  }
  function Z(N, a, o) {
    var d = N.length;
    (!a || a < 0) && (a = 0), (!o || o < 0 || o > d) && (o = d);
    for (var B = "", G = a; G < o; ++G) B += K[N[G]];
    return B;
  }
  function te(N, a, o) {
    for (var d = N.slice(a, o), B = "", G = 0; G < d.length - 1; G += 2) B += String.fromCharCode(d[G] + d[G + 1] * 256);
    return B;
  }
  s.prototype.slice = function(a, o) {
    var d = this.length;
    a = ~~a, o = o === void 0 ? d : ~~o, a < 0 ? (a += d, a < 0 && (a = 0)) : a > d && (a = d), o < 0 ? (o += d, o < 0 && (o = 0)) : o > d && (o = d), o < a && (o = a);
    var B = this.subarray(a, o);
    return Object.setPrototypeOf(B, s.prototype), B;
  };
  function V(N, a, o) {
    if (N % 1 !== 0 || N < 0) throw new RangeError("offset is not uint");
    if (N + a > o) throw new RangeError("Trying to access beyond buffer length");
  }
  s.prototype.readUintLE = s.prototype.readUIntLE = function(a, o, d) {
    a = a >>> 0, o = o >>> 0, d || V(a, o, this.length);
    for (var B = this[a], G = 1, W = 0; ++W < o && (G *= 256); ) B += this[a + W] * G;
    return B;
  }, s.prototype.readUintBE = s.prototype.readUIntBE = function(a, o, d) {
    a = a >>> 0, o = o >>> 0, d || V(a, o, this.length);
    for (var B = this[a + --o], G = 1; o > 0 && (G *= 256); ) B += this[a + --o] * G;
    return B;
  }, s.prototype.readUint8 = s.prototype.readUInt8 = function(a, o) {
    return a = a >>> 0, o || V(a, 1, this.length), this[a];
  }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(a, o) {
    return a = a >>> 0, o || V(a, 2, this.length), this[a] | this[a + 1] << 8;
  }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(a, o) {
    return a = a >>> 0, o || V(a, 2, this.length), this[a] << 8 | this[a + 1];
  }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(a, o) {
    return a = a >>> 0, o || V(a, 4, this.length), (this[a] | this[a + 1] << 8 | this[a + 2] << 16) + this[a + 3] * 16777216;
  }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(a, o) {
    return a = a >>> 0, o || V(a, 4, this.length), this[a] * 16777216 + (this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3]);
  }, s.prototype.readIntLE = function(a, o, d) {
    a = a >>> 0, o = o >>> 0, d || V(a, o, this.length);
    for (var B = this[a], G = 1, W = 0; ++W < o && (G *= 256); ) B += this[a + W] * G;
    return G *= 128, B >= G && (B -= Math.pow(2, 8 * o)), B;
  }, s.prototype.readIntBE = function(a, o, d) {
    a = a >>> 0, o = o >>> 0, d || V(a, o, this.length);
    for (var B = o, G = 1, W = this[a + --B]; B > 0 && (G *= 256); ) W += this[a + --B] * G;
    return G *= 128, W >= G && (W -= Math.pow(2, 8 * o)), W;
  }, s.prototype.readInt8 = function(a, o) {
    return a = a >>> 0, o || V(a, 1, this.length), this[a] & 128 ? (255 - this[a] + 1) * -1 : this[a];
  }, s.prototype.readInt16LE = function(a, o) {
    a = a >>> 0, o || V(a, 2, this.length);
    var d = this[a] | this[a + 1] << 8;
    return d & 32768 ? d | 4294901760 : d;
  }, s.prototype.readInt16BE = function(a, o) {
    a = a >>> 0, o || V(a, 2, this.length);
    var d = this[a + 1] | this[a] << 8;
    return d & 32768 ? d | 4294901760 : d;
  }, s.prototype.readInt32LE = function(a, o) {
    return a = a >>> 0, o || V(a, 4, this.length), this[a] | this[a + 1] << 8 | this[a + 2] << 16 | this[a + 3] << 24;
  }, s.prototype.readInt32BE = function(a, o) {
    return a = a >>> 0, o || V(a, 4, this.length), this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3];
  }, s.prototype.readFloatLE = function(a, o) {
    return a = a >>> 0, o || V(a, 4, this.length), r.read(this, a, !0, 23, 4);
  }, s.prototype.readFloatBE = function(a, o) {
    return a = a >>> 0, o || V(a, 4, this.length), r.read(this, a, !1, 23, 4);
  }, s.prototype.readDoubleLE = function(a, o) {
    return a = a >>> 0, o || V(a, 8, this.length), r.read(this, a, !0, 52, 8);
  }, s.prototype.readDoubleBE = function(a, o) {
    return a = a >>> 0, o || V(a, 8, this.length), r.read(this, a, !1, 52, 8);
  };
  function F(N, a, o, d, B, G) {
    if (!s.isBuffer(N)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (a > B || a < G) throw new RangeError('"value" argument is out of bounds');
    if (o + d > N.length) throw new RangeError("Index out of range");
  }
  s.prototype.writeUintLE = s.prototype.writeUIntLE = function(a, o, d, B) {
    if (a = +a, o = o >>> 0, d = d >>> 0, !B) {
      var G = Math.pow(2, 8 * d) - 1;
      F(this, a, o, d, G, 0);
    }
    var W = 1, ie = 0;
    for (this[o] = a & 255; ++ie < d && (W *= 256); ) this[o + ie] = a / W & 255;
    return o + d;
  }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(a, o, d, B) {
    if (a = +a, o = o >>> 0, d = d >>> 0, !B) {
      var G = Math.pow(2, 8 * d) - 1;
      F(this, a, o, d, G, 0);
    }
    var W = d - 1, ie = 1;
    for (this[o + W] = a & 255; --W >= 0 && (ie *= 256); ) this[o + W] = a / ie & 255;
    return o + d;
  }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(a, o, d) {
    return a = +a, o = o >>> 0, d || F(this, a, o, 1, 255, 0), this[o] = a & 255, o + 1;
  }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(a, o, d) {
    return a = +a, o = o >>> 0, d || F(this, a, o, 2, 65535, 0), this[o] = a & 255, this[o + 1] = a >>> 8, o + 2;
  }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(a, o, d) {
    return a = +a, o = o >>> 0, d || F(this, a, o, 2, 65535, 0), this[o] = a >>> 8, this[o + 1] = a & 255, o + 2;
  }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(a, o, d) {
    return a = +a, o = o >>> 0, d || F(this, a, o, 4, 4294967295, 0), this[o + 3] = a >>> 24, this[o + 2] = a >>> 16, this[o + 1] = a >>> 8, this[o] = a & 255, o + 4;
  }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(a, o, d) {
    return a = +a, o = o >>> 0, d || F(this, a, o, 4, 4294967295, 0), this[o] = a >>> 24, this[o + 1] = a >>> 16, this[o + 2] = a >>> 8, this[o + 3] = a & 255, o + 4;
  }, s.prototype.writeIntLE = function(a, o, d, B) {
    if (a = +a, o = o >>> 0, !B) {
      var G = Math.pow(2, 8 * d - 1);
      F(this, a, o, d, G - 1, -G);
    }
    var W = 0, ie = 1, ue = 0;
    for (this[o] = a & 255; ++W < d && (ie *= 256); )
      a < 0 && ue === 0 && this[o + W - 1] !== 0 && (ue = 1), this[o + W] = (a / ie >> 0) - ue & 255;
    return o + d;
  }, s.prototype.writeIntBE = function(a, o, d, B) {
    if (a = +a, o = o >>> 0, !B) {
      var G = Math.pow(2, 8 * d - 1);
      F(this, a, o, d, G - 1, -G);
    }
    var W = d - 1, ie = 1, ue = 0;
    for (this[o + W] = a & 255; --W >= 0 && (ie *= 256); )
      a < 0 && ue === 0 && this[o + W + 1] !== 0 && (ue = 1), this[o + W] = (a / ie >> 0) - ue & 255;
    return o + d;
  }, s.prototype.writeInt8 = function(a, o, d) {
    return a = +a, o = o >>> 0, d || F(this, a, o, 1, 127, -128), a < 0 && (a = 255 + a + 1), this[o] = a & 255, o + 1;
  }, s.prototype.writeInt16LE = function(a, o, d) {
    return a = +a, o = o >>> 0, d || F(this, a, o, 2, 32767, -32768), this[o] = a & 255, this[o + 1] = a >>> 8, o + 2;
  }, s.prototype.writeInt16BE = function(a, o, d) {
    return a = +a, o = o >>> 0, d || F(this, a, o, 2, 32767, -32768), this[o] = a >>> 8, this[o + 1] = a & 255, o + 2;
  }, s.prototype.writeInt32LE = function(a, o, d) {
    return a = +a, o = o >>> 0, d || F(this, a, o, 4, 2147483647, -2147483648), this[o] = a & 255, this[o + 1] = a >>> 8, this[o + 2] = a >>> 16, this[o + 3] = a >>> 24, o + 4;
  }, s.prototype.writeInt32BE = function(a, o, d) {
    return a = +a, o = o >>> 0, d || F(this, a, o, 4, 2147483647, -2147483648), a < 0 && (a = 4294967295 + a + 1), this[o] = a >>> 24, this[o + 1] = a >>> 16, this[o + 2] = a >>> 8, this[o + 3] = a & 255, o + 4;
  };
  function X(N, a, o, d, B, G) {
    if (o + d > N.length) throw new RangeError("Index out of range");
    if (o < 0) throw new RangeError("Index out of range");
  }
  function Y(N, a, o, d, B) {
    return a = +a, o = o >>> 0, B || X(N, a, o, 4), r.write(N, a, o, d, 23, 4), o + 4;
  }
  s.prototype.writeFloatLE = function(a, o, d) {
    return Y(this, a, o, !0, d);
  }, s.prototype.writeFloatBE = function(a, o, d) {
    return Y(this, a, o, !1, d);
  };
  function re(N, a, o, d, B) {
    return a = +a, o = o >>> 0, B || X(N, a, o, 8), r.write(N, a, o, d, 52, 8), o + 8;
  }
  s.prototype.writeDoubleLE = function(a, o, d) {
    return re(this, a, o, !0, d);
  }, s.prototype.writeDoubleBE = function(a, o, d) {
    return re(this, a, o, !1, d);
  }, s.prototype.copy = function(a, o, d, B) {
    if (!s.isBuffer(a)) throw new TypeError("argument should be a Buffer");
    if (d || (d = 0), !B && B !== 0 && (B = this.length), o >= a.length && (o = a.length), o || (o = 0), B > 0 && B < d && (B = d), B === d || a.length === 0 || this.length === 0) return 0;
    if (o < 0) throw new RangeError("targetStart out of bounds");
    if (d < 0 || d >= this.length) throw new RangeError("Index out of range");
    if (B < 0) throw new RangeError("sourceEnd out of bounds");
    B > this.length && (B = this.length), a.length - o < B - d && (B = a.length - o + d);
    var G = B - d;
    return this === a && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(o, d, B) : Uint8Array.prototype.set.call(a, this.subarray(d, B), o), G;
  }, s.prototype.fill = function(a, o, d, B) {
    if (typeof a == "string") {
      if (typeof o == "string" ? (B = o, o = 0, d = this.length) : typeof d == "string" && (B = d, d = this.length), B !== void 0 && typeof B != "string") throw new TypeError("encoding must be a string");
      if (typeof B == "string" && !s.isEncoding(B)) throw new TypeError("Unknown encoding: " + B);
      if (a.length === 1) {
        var G = a.charCodeAt(0);
        (B === "utf8" && G < 128 || B === "latin1") && (a = G);
      }
    } else typeof a == "number" ? a = a & 255 : typeof a == "boolean" && (a = Number(a));
    if (o < 0 || this.length < o || this.length < d) throw new RangeError("Out of range index");
    if (d <= o) return this;
    o = o >>> 0, d = d === void 0 ? this.length : d >>> 0, a || (a = 0);
    var W;
    if (typeof a == "number") for (W = o; W < d; ++W) this[W] = a;
    else {
      var ie = s.isBuffer(a) ? a : s.from(a, B), ue = ie.length;
      if (ue === 0) throw new TypeError('The value "' + a + '" is invalid for argument "value"');
      for (W = 0; W < d - o; ++W) this[W + o] = ie[W % ue];
    }
    return this;
  };
  var pe = /[^+/0-9A-Za-z-_]/g;
  function A(N) {
    if (N = N.split("=")[0], N = N.trim().replace(pe, ""), N.length < 2) return "";
    for (; N.length % 4 !== 0; ) N = N + "=";
    return N;
  }
  function f(N, a) {
    a = a || 1 / 0;
    for (var o, d = N.length, B = null, G = [], W = 0; W < d; ++W) {
      if (o = N.charCodeAt(W), o > 55295 && o < 57344) {
        if (!B) {
          if (o > 56319) {
            (a -= 3) > -1 && G.push(239, 191, 189);
            continue;
          } else if (W + 1 === d) {
            (a -= 3) > -1 && G.push(239, 191, 189);
            continue;
          }
          B = o;
          continue;
        }
        if (o < 56320) {
          (a -= 3) > -1 && G.push(239, 191, 189), B = o;
          continue;
        }
        o = (B - 55296 << 10 | o - 56320) + 65536;
      } else B && (a -= 3) > -1 && G.push(239, 191, 189);
      if (B = null, o < 128) {
        if ((a -= 1) < 0) break;
        G.push(o);
      } else if (o < 2048) {
        if ((a -= 2) < 0) break;
        G.push(o >> 6 | 192, o & 63 | 128);
      } else if (o < 65536) {
        if ((a -= 3) < 0) break;
        G.push(o >> 12 | 224, o >> 6 & 63 | 128, o & 63 | 128);
      } else if (o < 1114112) {
        if ((a -= 4) < 0) break;
        G.push(o >> 18 | 240, o >> 12 & 63 | 128, o >> 6 & 63 | 128, o & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return G;
  }
  function j(N) {
    for (var a = [], o = 0; o < N.length; ++o) a.push(N.charCodeAt(o) & 255);
    return a;
  }
  function U(N, a) {
    for (var o, d, B, G = [], W = 0; W < N.length && !((a -= 2) < 0); ++W)
      o = N.charCodeAt(W), d = o >> 8, B = o % 256, G.push(B), G.push(d);
    return G;
  }
  function ne(N) {
    return t.toByteArray(A(N));
  }
  function D(N, a, o, d) {
    for (var B = 0; B < d && !(B + o >= a.length || B >= N.length); ++B)
      a[B + o] = N[B];
    return B;
  }
  function L(N, a) {
    return N instanceof a || N != null && N.constructor != null && N.constructor.name != null && N.constructor.name === a.name;
  }
  function h(N) {
    return N !== N;
  }
  var K = (function() {
    for (var N = "0123456789abcdef", a = new Array(256), o = 0; o < 16; ++o)
      for (var d = o * 16, B = 0; B < 16; ++B) a[d + B] = N[o] + N[B];
    return a;
  })();
})), ei = /* @__PURE__ */ he(((e, t) => {
  t.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
    if (typeof Symbol.iterator == "symbol") return !0;
    var n = {}, l = /* @__PURE__ */ Symbol("test"), i = Object(l);
    if (typeof l == "string" || Object.prototype.toString.call(l) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object Symbol]") return !1;
    var u = 42;
    n[l] = u;
    for (var s in n) return !1;
    if (typeof Object.keys == "function" && Object.keys(n).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(n).length !== 0) return !1;
    var c = Object.getOwnPropertySymbols(n);
    if (c.length !== 1 || c[0] !== l || !Object.prototype.propertyIsEnumerable.call(n, l)) return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var y = Object.getOwnPropertyDescriptor(n, l);
      if (y.value !== u || y.enumerable !== !0) return !1;
    }
    return !0;
  };
})), Yr = /* @__PURE__ */ he(((e, t) => {
  var r = ei();
  t.exports = function() {
    return r() && !!Symbol.toStringTag;
  };
})), ti = /* @__PURE__ */ he(((e, t) => {
  t.exports = Object;
})), Ja = /* @__PURE__ */ he(((e, t) => {
  t.exports = Error;
})), Qa = /* @__PURE__ */ he(((e, t) => {
  t.exports = EvalError;
})), es = /* @__PURE__ */ he(((e, t) => {
  t.exports = RangeError;
})), ts = /* @__PURE__ */ he(((e, t) => {
  t.exports = ReferenceError;
})), ri = /* @__PURE__ */ he(((e, t) => {
  t.exports = SyntaxError;
})), pr = /* @__PURE__ */ he(((e, t) => {
  t.exports = TypeError;
})), rs = /* @__PURE__ */ he(((e, t) => {
  t.exports = URIError;
})), ns = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.abs;
})), is = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.floor;
})), as = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.max;
})), ss = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.min;
})), os = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.pow;
})), ls = /* @__PURE__ */ he(((e, t) => {
  t.exports = Math.round;
})), us = /* @__PURE__ */ he(((e, t) => {
  t.exports = Number.isNaN || function(n) {
    return n !== n;
  };
})), cs = /* @__PURE__ */ he(((e, t) => {
  var r = us();
  t.exports = function(l) {
    return r(l) || l === 0 ? l : l < 0 ? -1 : 1;
  };
})), hs = /* @__PURE__ */ he(((e, t) => {
  t.exports = Object.getOwnPropertyDescriptor;
})), Gt = /* @__PURE__ */ he(((e, t) => {
  var r = hs();
  if (r) try {
    r([], "length");
  } catch {
    r = null;
  }
  t.exports = r;
})), mr = /* @__PURE__ */ he(((e, t) => {
  var r = Object.defineProperty || !1;
  if (r) try {
    r({}, "a", { value: 1 });
  } catch {
    r = !1;
  }
  t.exports = r;
})), fs = /* @__PURE__ */ he(((e, t) => {
  var r = typeof Symbol < "u" && Symbol, n = ei();
  t.exports = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : n();
  };
})), ni = /* @__PURE__ */ he(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), ii = /* @__PURE__ */ he(((e, t) => {
  t.exports = ti().getPrototypeOf || null;
})), ds = /* @__PURE__ */ he(((e, t) => {
  var r = "Function.prototype.bind called on incompatible ", n = Object.prototype.toString, l = Math.max, i = "[object Function]", u = function(b, v) {
    for (var I = [], m = 0; m < b.length; m += 1) I[m] = b[m];
    for (var w = 0; w < v.length; w += 1) I[w + b.length] = v[w];
    return I;
  }, s = function(b, v) {
    for (var I = [], m = v, w = 0; m < b.length; m += 1, w += 1) I[w] = b[m];
    return I;
  }, c = function(y, b) {
    for (var v = "", I = 0; I < y.length; I += 1)
      v += y[I], I + 1 < y.length && (v += b);
    return v;
  };
  t.exports = function(b) {
    var v = this;
    if (typeof v != "function" || n.apply(v) !== i) throw new TypeError(r + v);
    for (var I = s(arguments, 1), m, w = function() {
      if (this instanceof m) {
        var _ = v.apply(this, u(I, arguments));
        return Object(_) === _ ? _ : this;
      }
      return v.apply(b, u(I, arguments));
    }, g = l(0, v.length - I.length), E = [], R = 0; R < g; R++) E[R] = "$" + R;
    if (m = Function("binder", "return function (" + c(E, ",") + "){ return binder.apply(this,arguments); }")(w), v.prototype) {
      var x = function() {
      };
      x.prototype = v.prototype, m.prototype = new x(), x.prototype = null;
    }
    return m;
  };
})), Kt = /* @__PURE__ */ he(((e, t) => {
  var r = ds();
  t.exports = Function.prototype.bind || r;
})), Jr = /* @__PURE__ */ he(((e, t) => {
  t.exports = Function.prototype.call;
})), Qr = /* @__PURE__ */ he(((e, t) => {
  t.exports = Function.prototype.apply;
})), ps = /* @__PURE__ */ he(((e, t) => {
  t.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), ai = /* @__PURE__ */ he(((e, t) => {
  var r = Kt(), n = Qr(), l = Jr();
  t.exports = ps() || r.call(l, n);
})), en = /* @__PURE__ */ he(((e, t) => {
  var r = Kt(), n = pr(), l = Jr(), i = ai();
  t.exports = function(s) {
    if (s.length < 1 || typeof s[0] != "function") throw new n("a function is required");
    return i(r, l, s);
  };
})), ms = /* @__PURE__ */ he(((e, t) => {
  var r = en(), n = Gt(), l;
  try {
    l = [].__proto__ === Array.prototype;
  } catch (c) {
    if (!c || typeof c != "object" || !("code" in c) || c.code !== "ERR_PROTO_ACCESS") throw c;
  }
  var i = !!l && n && n(Object.prototype, "__proto__"), u = Object, s = u.getPrototypeOf;
  t.exports = i && typeof i.get == "function" ? r([i.get]) : typeof s == "function" ? function(y) {
    return s(y == null ? y : u(y));
  } : !1;
})), si = /* @__PURE__ */ he(((e, t) => {
  var r = ni(), n = ii(), l = ms();
  t.exports = r ? function(u) {
    return r(u);
  } : n ? function(u) {
    if (!u || typeof u != "object" && typeof u != "function") throw new TypeError("getProto: not an object");
    return n(u);
  } : l ? function(u) {
    return l(u);
  } : null;
})), vs = /* @__PURE__ */ he(((e, t) => {
  var r = Function.prototype.call, n = Object.prototype.hasOwnProperty;
  t.exports = Kt().call(r, n);
})), oi = /* @__PURE__ */ he(((e, t) => {
  var r, n = ti(), l = Ja(), i = Qa(), u = es(), s = ts(), c = ri(), y = pr(), b = rs(), v = ns(), I = is(), m = as(), w = ss(), g = os(), E = ls(), R = cs(), x = Function, _ = function(U) {
    try {
      return x('"use strict"; return (' + U + ").constructor;")();
    } catch {
    }
  }, T = Gt(), S = mr(), p = function() {
    throw new y();
  }, P = T ? (function() {
    try {
      return arguments.callee, p;
    } catch {
      try {
        return T(arguments, "callee").get;
      } catch {
        return p;
      }
    }
  })() : p, M = fs()(), C = si(), $ = ii(), ee = ni(), O = Qr(), z = Jr(), k = {}, H = typeof Uint8Array > "u" || !C ? r : C(Uint8Array), Q = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": M && C ? C([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": k,
    "%AsyncGenerator%": k,
    "%AsyncGeneratorFunction%": k,
    "%AsyncIteratorPrototype%": k,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": l,
    "%eval%": eval,
    "%EvalError%": i,
    "%Float16Array%": typeof Float16Array > "u" ? r : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": x,
    "%GeneratorFunction%": k,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": M && C ? C(C([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !M || !C ? r : C((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": n,
    "%Object.getOwnPropertyDescriptor%": T,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": u,
    "%ReferenceError%": s,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !M || !C ? r : C((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": M && C ? C(""[Symbol.iterator]()) : r,
    "%Symbol%": M ? Symbol : r,
    "%SyntaxError%": c,
    "%ThrowTypeError%": P,
    "%TypedArray%": H,
    "%TypeError%": y,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": b,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
    "%Function.prototype.call%": z,
    "%Function.prototype.apply%": O,
    "%Object.defineProperty%": S,
    "%Object.getPrototypeOf%": $,
    "%Math.abs%": v,
    "%Math.floor%": I,
    "%Math.max%": m,
    "%Math.min%": w,
    "%Math.pow%": g,
    "%Math.round%": E,
    "%Math.sign%": R,
    "%Reflect.getPrototypeOf%": ee
  };
  if (C) try {
    null.error;
  } catch (U) {
    Q["%Error.prototype%"] = C(C(U));
  }
  var q = function U(ne) {
    var D;
    if (ne === "%AsyncFunction%") D = _("async function () {}");
    else if (ne === "%GeneratorFunction%") D = _("function* () {}");
    else if (ne === "%AsyncGeneratorFunction%") D = _("async function* () {}");
    else if (ne === "%AsyncGenerator%") {
      var L = U("%AsyncGeneratorFunction%");
      L && (D = L.prototype);
    } else if (ne === "%AsyncIteratorPrototype%") {
      var h = U("%AsyncGenerator%");
      h && C && (D = C(h.prototype));
    }
    return Q[ne] = D, D;
  }, le = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": [
      "Array",
      "prototype",
      "entries"
    ],
    "%ArrayProto_forEach%": [
      "Array",
      "prototype",
      "forEach"
    ],
    "%ArrayProto_keys%": [
      "Array",
      "prototype",
      "keys"
    ],
    "%ArrayProto_values%": [
      "Array",
      "prototype",
      "values"
    ],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": [
      "AsyncGeneratorFunction",
      "prototype",
      "prototype"
    ],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": [
      "GeneratorFunction",
      "prototype",
      "prototype"
    ],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": [
      "Object",
      "prototype",
      "toString"
    ],
    "%ObjProto_valueOf%": [
      "Object",
      "prototype",
      "valueOf"
    ],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": [
      "Promise",
      "prototype",
      "then"
    ],
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
  }, Z = Kt(), te = vs(), V = Z.call(z, Array.prototype.concat), F = Z.call(O, Array.prototype.splice), X = Z.call(z, String.prototype.replace), Y = Z.call(z, String.prototype.slice), re = Z.call(z, RegExp.prototype.exec), pe = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, A = /\\(\\)?/g, f = function(ne) {
    var D = Y(ne, 0, 1), L = Y(ne, -1);
    if (D === "%" && L !== "%") throw new c("invalid intrinsic syntax, expected closing `%`");
    if (L === "%" && D !== "%") throw new c("invalid intrinsic syntax, expected opening `%`");
    var h = [];
    return X(ne, pe, function(K, N, a, o) {
      h[h.length] = a ? X(o, A, "$1") : N || K;
    }), h;
  }, j = function(ne, D) {
    var L = ne, h;
    if (te(le, L) && (h = le[L], L = "%" + h[0] + "%"), te(Q, L)) {
      var K = Q[L];
      if (K === k && (K = q(L)), typeof K > "u" && !D) throw new y("intrinsic " + ne + " exists, but is not available. Please file an issue!");
      return {
        alias: h,
        name: L,
        value: K
      };
    }
    throw new c("intrinsic " + ne + " does not exist!");
  };
  t.exports = function(ne, D) {
    if (typeof ne != "string" || ne.length === 0) throw new y("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof D != "boolean") throw new y('"allowMissing" argument must be a boolean');
    if (re(/^%?[^%]*%?$/, ne) === null) throw new c("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var L = f(ne), h = L.length > 0 ? L[0] : "", K = j("%" + h + "%", D), N = K.name, a = K.value, o = !1, d = K.alias;
    d && (h = d[0], F(L, V([0, 1], d)));
    for (var B = 1, G = !0; B < L.length; B += 1) {
      var W = L[B], ie = Y(W, 0, 1), ue = Y(W, -1);
      if ((ie === '"' || ie === "'" || ie === "`" || ue === '"' || ue === "'" || ue === "`") && ie !== ue) throw new c("property names with quotes must have matching quotes");
      if ((W === "constructor" || !G) && (o = !0), h += "." + W, N = "%" + h + "%", te(Q, N)) a = Q[N];
      else if (a != null) {
        if (!(W in a)) {
          if (!D) throw new y("base intrinsic for " + ne + " exists, but the property is not available.");
          return;
        }
        if (T && B + 1 >= L.length) {
          var se = T(a, W);
          G = !!se, G && "get" in se && !("originalValue" in se.get) ? a = se.get : a = a[W];
        } else
          G = te(a, W), a = a[W];
        G && !o && (Q[N] = a);
      }
    }
    return a;
  };
})), li = /* @__PURE__ */ he(((e, t) => {
  var r = oi(), n = en(), l = n([r("%String.prototype.indexOf%")]);
  t.exports = function(u, s) {
    var c = r(u, !!s);
    return typeof c == "function" && l(u, ".prototype.") > -1 ? n([c]) : c;
  };
})), ws = /* @__PURE__ */ he(((e, t) => {
  var r = Yr()(), n = li()("Object.prototype.toString"), l = function(c) {
    return r && c && typeof c == "object" && Symbol.toStringTag in c ? !1 : n(c) === "[object Arguments]";
  }, i = function(c) {
    return l(c) ? !0 : c !== null && typeof c == "object" && "length" in c && typeof c.length == "number" && c.length >= 0 && n(c) !== "[object Array]" && "callee" in c && n(c.callee) === "[object Function]";
  }, u = (function() {
    return l(arguments);
  })();
  l.isLegacyArguments = i, t.exports = u ? l : i;
})), gs = /* @__PURE__ */ he(((e, t) => {
  var r = Object.prototype.toString, n = Function.prototype.toString, l = /^\s*(?:function)?\*/, i = Yr()(), u = Object.getPrototypeOf, s = function() {
    if (!i) return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, c;
  t.exports = function(b) {
    if (typeof b != "function") return !1;
    if (l.test(n.call(b))) return !0;
    if (!i) return r.call(b) === "[object GeneratorFunction]";
    if (!u) return !1;
    if (typeof c > "u") {
      var v = s();
      c = v ? u(v) : !1;
    }
    return u(b) === c;
  };
})), ys = /* @__PURE__ */ he(((e, t) => {
  var r = Function.prototype.toString, n = typeof Reflect == "object" && Reflect !== null && Reflect.apply, l, i;
  if (typeof n == "function" && typeof Object.defineProperty == "function") try {
    l = Object.defineProperty({}, "length", { get: function() {
      throw i;
    } }), i = {}, n(function() {
      throw 42;
    }, null, l);
  } catch (T) {
    T !== i && (n = null);
  }
  else n = null;
  var u = /^\s*class\b/, s = function(S) {
    try {
      var p = r.call(S);
      return u.test(p);
    } catch {
      return !1;
    }
  }, c = function(S) {
    try {
      return s(S) ? !1 : (r.call(S), !0);
    } catch {
      return !1;
    }
  }, y = Object.prototype.toString, b = "[object Object]", v = "[object Function]", I = "[object GeneratorFunction]", m = "[object HTMLAllCollection]", w = "[object HTML document.all class]", g = "[object HTMLCollection]", E = typeof Symbol == "function" && !!Symbol.toStringTag, R = !(0 in [,]), x = function() {
    return !1;
  };
  if (typeof document == "object") {
    var _ = document.all;
    y.call(_) === y.call(document.all) && (x = function(S) {
      if ((R || !S) && (typeof S > "u" || typeof S == "object")) try {
        var p = y.call(S);
        return (p === m || p === w || p === g || p === b) && S("") == null;
      } catch {
      }
      return !1;
    });
  }
  t.exports = n ? function(S) {
    if (x(S)) return !0;
    if (!S || typeof S != "function" && typeof S != "object") return !1;
    try {
      n(S, null, l);
    } catch (p) {
      if (p !== i) return !1;
    }
    return !s(S) && c(S);
  } : function(S) {
    if (x(S)) return !0;
    if (!S || typeof S != "function" && typeof S != "object") return !1;
    if (E) return c(S);
    if (s(S)) return !1;
    var p = y.call(S);
    return p !== v && p !== I && !/^\[object HTML/.test(p) ? !1 : c(S);
  };
})), bs = /* @__PURE__ */ he(((e, t) => {
  var r = ys(), n = Object.prototype.toString, l = Object.prototype.hasOwnProperty, i = function(b, v, I) {
    for (var m = 0, w = b.length; m < w; m++) l.call(b, m) && (I == null ? v(b[m], m, b) : v.call(I, b[m], m, b));
  }, u = function(b, v, I) {
    for (var m = 0, w = b.length; m < w; m++) I == null ? v(b.charAt(m), m, b) : v.call(I, b.charAt(m), m, b);
  }, s = function(b, v, I) {
    for (var m in b) l.call(b, m) && (I == null ? v(b[m], m, b) : v.call(I, b[m], m, b));
  };
  function c(y) {
    return n.call(y) === "[object Array]";
  }
  t.exports = function(b, v, I) {
    if (!r(v)) throw new TypeError("iterator must be a function");
    var m;
    arguments.length >= 3 && (m = I), c(b) ? i(b, v, m) : typeof b == "string" ? u(b, v, m) : s(b, v, m);
  };
})), _s = /* @__PURE__ */ he(((e, t) => {
  t.exports = [
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
  ];
})), xs = /* @__PURE__ */ he(((e, t) => {
  _t();
  var r = _s(), n = typeof globalThis > "u" ? Re : globalThis;
  t.exports = function() {
    for (var i = [], u = 0; u < r.length; u++) typeof n[r[u]] == "function" && (i[i.length] = r[u]);
    return i;
  };
})), Es = /* @__PURE__ */ he(((e, t) => {
  var r = mr(), n = ri(), l = pr(), i = Gt();
  t.exports = function(s, c, y) {
    if (!s || typeof s != "object" && typeof s != "function") throw new l("`obj` must be an object or a function`");
    if (typeof c != "string" && typeof c != "symbol") throw new l("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new l("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new l("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new l("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new l("`loose`, if provided, must be a boolean");
    var b = arguments.length > 3 ? arguments[3] : null, v = arguments.length > 4 ? arguments[4] : null, I = arguments.length > 5 ? arguments[5] : null, m = arguments.length > 6 ? arguments[6] : !1, w = !!i && i(s, c);
    if (r) r(s, c, {
      configurable: I === null && w ? w.configurable : !I,
      enumerable: b === null && w ? w.enumerable : !b,
      value: y,
      writable: v === null && w ? w.writable : !v
    });
    else if (m || !b && !v && !I) s[c] = y;
    else throw new n("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
})), Ts = /* @__PURE__ */ he(((e, t) => {
  var r = mr(), n = function() {
    return !!r;
  };
  n.hasArrayLengthDefineBug = function() {
    if (!r) return null;
    try {
      return r([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, t.exports = n;
})), Ss = /* @__PURE__ */ he(((e, t) => {
  var r = oi(), n = Es(), l = Ts()(), i = Gt(), u = pr(), s = r("%Math.floor%");
  t.exports = function(y, b) {
    if (typeof y != "function") throw new u("`fn` is not a function");
    if (typeof b != "number" || b < 0 || b > 4294967295 || s(b) !== b) throw new u("`length` must be a positive 32-bit integer");
    var v = arguments.length > 2 && !!arguments[2], I = !0, m = !0;
    if ("length" in y && i) {
      var w = i(y, "length");
      w && !w.configurable && (I = !1), w && !w.writable && (m = !1);
    }
    return (I || m || !v) && (l ? n(y, "length", b, !0, !0) : n(y, "length", b)), y;
  };
})), As = /* @__PURE__ */ he(((e, t) => {
  var r = Kt(), n = Qr(), l = ai();
  t.exports = function() {
    return l(r, n, arguments);
  };
})), ks = /* @__PURE__ */ he(((e, t) => {
  var r = Ss(), n = mr(), l = en(), i = As();
  t.exports = function(s) {
    var c = l(arguments), y = s.length - (arguments.length - 1);
    return r(c, 1 + (y > 0 ? y : 0), !0);
  }, n ? n(t.exports, "apply", { value: i }) : t.exports.apply = i;
})), ui = /* @__PURE__ */ he(((e, t) => {
  _t();
  var r = bs(), n = xs(), l = ks(), i = li(), u = Gt(), s = si(), c = i("Object.prototype.toString"), y = Yr()(), b = typeof globalThis > "u" ? Re : globalThis, v = n(), I = i("String.prototype.slice"), m = i("Array.prototype.indexOf", !0) || function(x, _) {
    for (var T = 0; T < x.length; T += 1) if (x[T] === _) return T;
    return -1;
  }, w = { __proto__: null };
  y && u && s ? r(v, function(R) {
    var x = new b[R]();
    if (Symbol.toStringTag in x && s) {
      var _ = s(x), T = u(_, Symbol.toStringTag);
      !T && _ && (T = u(s(_), Symbol.toStringTag)), w["$" + R] = l(T.get);
    }
  }) : r(v, function(R) {
    var x = new b[R](), _ = x.slice || x.set;
    _ && (w["$" + R] = l(_));
  });
  var g = function(x) {
    var _ = !1;
    return r(
      w,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(T, S) {
        if (!_) try {
          "$" + T(x) === S && (_ = I(S, 1));
        } catch {
        }
      }
    ), _;
  }, E = function(x) {
    var _ = !1;
    return r(
      w,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(T, S) {
        if (!_) try {
          T(x), _ = I(S, 1);
        } catch {
        }
      }
    ), _;
  };
  t.exports = function(x) {
    if (!x || typeof x != "object") return !1;
    if (!y) {
      var _ = I(c(x), 8, -1);
      return m(v, _) > -1 ? _ : _ !== "Object" ? !1 : E(x);
    }
    return u ? g(x) : null;
  };
})), Is = /* @__PURE__ */ he(((e, t) => {
  var r = ui();
  t.exports = function(l) {
    return !!r(l);
  };
})), Rs = /* @__PURE__ */ he(((e) => {
  var t = ws(), r = gs(), n = ui(), l = Is();
  function i(d) {
    return d.call.bind(d);
  }
  var u = typeof BigInt < "u", s = typeof Symbol < "u", c = i(Object.prototype.toString), y = i(Number.prototype.valueOf), b = i(String.prototype.valueOf), v = i(Boolean.prototype.valueOf);
  if (u) var I = i(BigInt.prototype.valueOf);
  if (s) var m = i(Symbol.prototype.valueOf);
  function w(d, B) {
    if (typeof d != "object") return !1;
    try {
      return B(d), !0;
    } catch {
      return !1;
    }
  }
  e.isArgumentsObject = t, e.isGeneratorFunction = r, e.isTypedArray = l;
  function g(d) {
    return typeof Promise < "u" && d instanceof Promise || d !== null && typeof d == "object" && typeof d.then == "function" && typeof d.catch == "function";
  }
  e.isPromise = g;
  function E(d) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(d) : l(d) || X(d);
  }
  e.isArrayBufferView = E;
  function R(d) {
    return n(d) === "Uint8Array";
  }
  e.isUint8Array = R;
  function x(d) {
    return n(d) === "Uint8ClampedArray";
  }
  e.isUint8ClampedArray = x;
  function _(d) {
    return n(d) === "Uint16Array";
  }
  e.isUint16Array = _;
  function T(d) {
    return n(d) === "Uint32Array";
  }
  e.isUint32Array = T;
  function S(d) {
    return n(d) === "Int8Array";
  }
  e.isInt8Array = S;
  function p(d) {
    return n(d) === "Int16Array";
  }
  e.isInt16Array = p;
  function P(d) {
    return n(d) === "Int32Array";
  }
  e.isInt32Array = P;
  function M(d) {
    return n(d) === "Float32Array";
  }
  e.isFloat32Array = M;
  function C(d) {
    return n(d) === "Float64Array";
  }
  e.isFloat64Array = C;
  function $(d) {
    return n(d) === "BigInt64Array";
  }
  e.isBigInt64Array = $;
  function ee(d) {
    return n(d) === "BigUint64Array";
  }
  e.isBigUint64Array = ee;
  function O(d) {
    return c(d) === "[object Map]";
  }
  O.working = typeof Map < "u" && O(/* @__PURE__ */ new Map());
  function z(d) {
    return typeof Map > "u" ? !1 : O.working ? O(d) : d instanceof Map;
  }
  e.isMap = z;
  function k(d) {
    return c(d) === "[object Set]";
  }
  k.working = typeof Set < "u" && k(/* @__PURE__ */ new Set());
  function H(d) {
    return typeof Set > "u" ? !1 : k.working ? k(d) : d instanceof Set;
  }
  e.isSet = H;
  function Q(d) {
    return c(d) === "[object WeakMap]";
  }
  Q.working = typeof WeakMap < "u" && Q(/* @__PURE__ */ new WeakMap());
  function q(d) {
    return typeof WeakMap > "u" ? !1 : Q.working ? Q(d) : d instanceof WeakMap;
  }
  e.isWeakMap = q;
  function le(d) {
    return c(d) === "[object WeakSet]";
  }
  le.working = typeof WeakSet < "u" && le(/* @__PURE__ */ new WeakSet());
  function Z(d) {
    return le(d);
  }
  e.isWeakSet = Z;
  function te(d) {
    return c(d) === "[object ArrayBuffer]";
  }
  te.working = typeof ArrayBuffer < "u" && te(/* @__PURE__ */ new ArrayBuffer());
  function V(d) {
    return typeof ArrayBuffer > "u" ? !1 : te.working ? te(d) : d instanceof ArrayBuffer;
  }
  e.isArrayBuffer = V;
  function F(d) {
    return c(d) === "[object DataView]";
  }
  F.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && F(new DataView(/* @__PURE__ */ new ArrayBuffer(1), 0, 1));
  function X(d) {
    return typeof DataView > "u" ? !1 : F.working ? F(d) : d instanceof DataView;
  }
  e.isDataView = X;
  var Y = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function re(d) {
    return c(d) === "[object SharedArrayBuffer]";
  }
  function pe(d) {
    return typeof Y > "u" ? !1 : (typeof re.working > "u" && (re.working = re(new Y())), re.working ? re(d) : d instanceof Y);
  }
  e.isSharedArrayBuffer = pe;
  function A(d) {
    return c(d) === "[object AsyncFunction]";
  }
  e.isAsyncFunction = A;
  function f(d) {
    return c(d) === "[object Map Iterator]";
  }
  e.isMapIterator = f;
  function j(d) {
    return c(d) === "[object Set Iterator]";
  }
  e.isSetIterator = j;
  function U(d) {
    return c(d) === "[object Generator]";
  }
  e.isGeneratorObject = U;
  function ne(d) {
    return c(d) === "[object WebAssembly.Module]";
  }
  e.isWebAssemblyCompiledModule = ne;
  function D(d) {
    return w(d, y);
  }
  e.isNumberObject = D;
  function L(d) {
    return w(d, b);
  }
  e.isStringObject = L;
  function h(d) {
    return w(d, v);
  }
  e.isBooleanObject = h;
  function K(d) {
    return u && w(d, I);
  }
  e.isBigIntObject = K;
  function N(d) {
    return s && w(d, m);
  }
  e.isSymbolObject = N;
  function a(d) {
    return D(d) || L(d) || h(d) || K(d) || N(d);
  }
  e.isBoxedPrimitive = a;
  function o(d) {
    return typeof Uint8Array < "u" && (V(d) || pe(d));
  }
  e.isAnyArrayBuffer = o, [
    "isProxy",
    "isExternal",
    "isModuleNamespaceObject"
  ].forEach(function(d) {
    Object.defineProperty(e, d, {
      enumerable: !1,
      value: function() {
        throw new Error(d + " is not supported in userland");
      }
    });
  });
})), Cs = /* @__PURE__ */ he(((e, t) => {
  t.exports = function(n) {
    return n && typeof n == "object" && typeof n.copy == "function" && typeof n.fill == "function" && typeof n.readUInt8 == "function";
  };
})), ci = /* @__PURE__ */ he(((e) => {
  nt();
  var t = Object.getOwnPropertyDescriptors || function(X) {
    for (var Y = Object.keys(X), re = {}, pe = 0; pe < Y.length; pe++) re[Y[pe]] = Object.getOwnPropertyDescriptor(X, Y[pe]);
    return re;
  }, r = /%[sdj%]/g;
  e.format = function(F) {
    if (!S(F)) {
      for (var X = [], Y = 0; Y < arguments.length; Y++) X.push(u(arguments[Y]));
      return X.join(" ");
    }
    for (var Y = 1, re = arguments, pe = re.length, A = String(F).replace(r, function(j) {
      if (j === "%%") return "%";
      if (Y >= pe) return j;
      switch (j) {
        case "%s":
          return String(re[Y++]);
        case "%d":
          return Number(re[Y++]);
        case "%j":
          try {
            return JSON.stringify(re[Y++]);
          } catch {
            return "[Circular]";
          }
        default:
          return j;
      }
    }), f = re[Y]; Y < pe; f = re[++Y]) x(f) || !C(f) ? A += " " + f : A += " " + u(f);
    return A;
  }, e.deprecate = function(F, X) {
    if (typeof ge < "u" && ge.noDeprecation === !0) return F;
    if (typeof ge > "u") return function() {
      return e.deprecate(F, X).apply(this, arguments);
    };
    var Y = !1;
    function re() {
      if (!Y) {
        if (ge.throwDeprecation) throw new Error(X);
        ge.traceDeprecation ? console.trace(X) : console.error(X), Y = !0;
      }
      return F.apply(this, arguments);
    }
    return re;
  };
  var n = {}, l = /^$/;
  if (ge.env.NODE_DEBUG) {
    var i = ge.env.NODE_DEBUG;
    i = i.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), l = new RegExp("^" + i + "$", "i");
  }
  e.debuglog = function(F) {
    if (F = F.toUpperCase(), !n[F])
      if (l.test(F)) {
        var X = ge.pid;
        n[F] = function() {
          var Y = e.format.apply(e, arguments);
          console.error("%s %d: %s", F, X, Y);
        };
      } else n[F] = function() {
      };
    return n[F];
  };
  function u(F, X) {
    var Y = {
      seen: [],
      stylize: c
    };
    return arguments.length >= 3 && (Y.depth = arguments[2]), arguments.length >= 4 && (Y.colors = arguments[3]), R(X) ? Y.showHidden = X : X && e._extend(Y, X), P(Y.showHidden) && (Y.showHidden = !1), P(Y.depth) && (Y.depth = 2), P(Y.colors) && (Y.colors = !1), P(Y.customInspect) && (Y.customInspect = !0), Y.colors && (Y.stylize = s), b(Y, F, Y.depth);
  }
  e.inspect = u, u.colors = {
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
  }, u.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    regexp: "red"
  };
  function s(F, X) {
    var Y = u.styles[X];
    return Y ? "\x1B[" + u.colors[Y][0] + "m" + F + "\x1B[" + u.colors[Y][1] + "m" : F;
  }
  function c(F, X) {
    return F;
  }
  function y(F) {
    var X = {};
    return F.forEach(function(Y, re) {
      X[Y] = !0;
    }), X;
  }
  function b(F, X, Y) {
    if (F.customInspect && X && O(X.inspect) && X.inspect !== e.inspect && !(X.constructor && X.constructor.prototype === X)) {
      var re = X.inspect(Y, F);
      return S(re) || (re = b(F, re, Y)), re;
    }
    var pe = v(F, X);
    if (pe) return pe;
    var A = Object.keys(X), f = y(A);
    if (F.showHidden && (A = Object.getOwnPropertyNames(X)), ee(X) && (A.indexOf("message") >= 0 || A.indexOf("description") >= 0)) return I(X);
    if (A.length === 0) {
      if (O(X)) {
        var j = X.name ? ": " + X.name : "";
        return F.stylize("[Function" + j + "]", "special");
      }
      if (M(X)) return F.stylize(RegExp.prototype.toString.call(X), "regexp");
      if ($(X)) return F.stylize(Date.prototype.toString.call(X), "date");
      if (ee(X)) return I(X);
    }
    var U = "", ne = !1, D = ["{", "}"];
    if (E(X) && (ne = !0, D = ["[", "]"]), O(X) && (U = " [Function" + (X.name ? ": " + X.name : "") + "]"), M(X) && (U = " " + RegExp.prototype.toString.call(X)), $(X) && (U = " " + Date.prototype.toUTCString.call(X)), ee(X) && (U = " " + I(X)), A.length === 0 && (!ne || X.length == 0)) return D[0] + U + D[1];
    if (Y < 0)
      return M(X) ? F.stylize(RegExp.prototype.toString.call(X), "regexp") : F.stylize("[Object]", "special");
    F.seen.push(X);
    var L;
    return ne ? L = m(F, X, Y, f, A) : L = A.map(function(h) {
      return w(F, X, Y, f, h, ne);
    }), F.seen.pop(), g(L, U, D);
  }
  function v(F, X) {
    if (P(X)) return F.stylize("undefined", "undefined");
    if (S(X)) {
      var Y = "'" + JSON.stringify(X).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return F.stylize(Y, "string");
    }
    if (T(X)) return F.stylize("" + X, "number");
    if (R(X)) return F.stylize("" + X, "boolean");
    if (x(X)) return F.stylize("null", "null");
  }
  function I(F) {
    return "[" + Error.prototype.toString.call(F) + "]";
  }
  function m(F, X, Y, re, pe) {
    for (var A = [], f = 0, j = X.length; f < j; ++f) le(X, String(f)) ? A.push(w(F, X, Y, re, String(f), !0)) : A.push("");
    return pe.forEach(function(U) {
      U.match(/^\d+$/) || A.push(w(F, X, Y, re, U, !0));
    }), A;
  }
  function w(F, X, Y, re, pe, A) {
    var f, j, U = Object.getOwnPropertyDescriptor(X, pe) || { value: X[pe] };
    if (U.get ? U.set ? j = F.stylize("[Getter/Setter]", "special") : j = F.stylize("[Getter]", "special") : U.set && (j = F.stylize("[Setter]", "special")), le(re, pe) || (f = "[" + pe + "]"), j || (F.seen.indexOf(U.value) < 0 ? (x(Y) ? j = b(F, U.value, null) : j = b(F, U.value, Y - 1), j.indexOf(`
`) > -1 && (A ? j = j.split(`
`).map(function(ne) {
      return "  " + ne;
    }).join(`
`).slice(2) : j = `
` + j.split(`
`).map(function(ne) {
      return "   " + ne;
    }).join(`
`))) : j = F.stylize("[Circular]", "special")), P(f)) {
      if (A && pe.match(/^\d+$/)) return j;
      f = JSON.stringify("" + pe), f.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (f = f.slice(1, -1), f = F.stylize(f, "name")) : (f = f.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), f = F.stylize(f, "string"));
    }
    return f + ": " + j;
  }
  function g(F, X, Y) {
    return F.reduce(function(re, pe) {
      return pe.indexOf(`
`) >= 0, re + pe.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0) > 60 ? Y[0] + (X === "" ? "" : X + `
 `) + " " + F.join(`,
  `) + " " + Y[1] : Y[0] + X + " " + F.join(", ") + " " + Y[1];
  }
  e.types = Rs();
  function E(F) {
    return Array.isArray(F);
  }
  e.isArray = E;
  function R(F) {
    return typeof F == "boolean";
  }
  e.isBoolean = R;
  function x(F) {
    return F === null;
  }
  e.isNull = x;
  function _(F) {
    return F == null;
  }
  e.isNullOrUndefined = _;
  function T(F) {
    return typeof F == "number";
  }
  e.isNumber = T;
  function S(F) {
    return typeof F == "string";
  }
  e.isString = S;
  function p(F) {
    return typeof F == "symbol";
  }
  e.isSymbol = p;
  function P(F) {
    return F === void 0;
  }
  e.isUndefined = P;
  function M(F) {
    return C(F) && k(F) === "[object RegExp]";
  }
  e.isRegExp = M, e.types.isRegExp = M;
  function C(F) {
    return typeof F == "object" && F !== null;
  }
  e.isObject = C;
  function $(F) {
    return C(F) && k(F) === "[object Date]";
  }
  e.isDate = $, e.types.isDate = $;
  function ee(F) {
    return C(F) && (k(F) === "[object Error]" || F instanceof Error);
  }
  e.isError = ee, e.types.isNativeError = ee;
  function O(F) {
    return typeof F == "function";
  }
  e.isFunction = O;
  function z(F) {
    return F === null || typeof F == "boolean" || typeof F == "number" || typeof F == "string" || typeof F == "symbol" || typeof F > "u";
  }
  e.isPrimitive = z, e.isBuffer = Cs();
  function k(F) {
    return Object.prototype.toString.call(F);
  }
  function H(F) {
    return F < 10 ? "0" + F.toString(10) : F.toString(10);
  }
  var Q = [
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
  function q() {
    var F = /* @__PURE__ */ new Date(), X = [
      H(F.getHours()),
      H(F.getMinutes()),
      H(F.getSeconds())
    ].join(":");
    return [
      F.getDate(),
      Q[F.getMonth()],
      X
    ].join(" ");
  }
  e.log = function() {
    console.log("%s - %s", q(), e.format.apply(e, arguments));
  }, e.inherits = rt(), e._extend = function(F, X) {
    if (!X || !C(X)) return F;
    for (var Y = Object.keys(X), re = Y.length; re--; ) F[Y[re]] = X[Y[re]];
    return F;
  };
  function le(F, X) {
    return Object.prototype.hasOwnProperty.call(F, X);
  }
  var Z = typeof Symbol < "u" ? /* @__PURE__ */ Symbol("util.promisify.custom") : void 0;
  e.promisify = function(X) {
    if (typeof X != "function") throw new TypeError('The "original" argument must be of type Function');
    if (Z && X[Z]) {
      var Y = X[Z];
      if (typeof Y != "function") throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(Y, Z, {
        value: Y,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), Y;
    }
    function Y() {
      for (var re, pe, A = new Promise(function(U, ne) {
        re = U, pe = ne;
      }), f = [], j = 0; j < arguments.length; j++) f.push(arguments[j]);
      f.push(function(U, ne) {
        U ? pe(U) : re(ne);
      });
      try {
        X.apply(this, f);
      } catch (U) {
        pe(U);
      }
      return A;
    }
    return Object.setPrototypeOf(Y, Object.getPrototypeOf(X)), Z && Object.defineProperty(Y, Z, {
      value: Y,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(Y, t(X));
  }, e.promisify.custom = Z;
  function te(F, X) {
    if (!F) {
      var Y = /* @__PURE__ */ new Error("Promise was rejected with a falsy value");
      Y.reason = F, F = Y;
    }
    return X(F);
  }
  function V(F) {
    if (typeof F != "function") throw new TypeError('The "original" argument must be of type Function');
    function X() {
      for (var Y = [], re = 0; re < arguments.length; re++) Y.push(arguments[re]);
      var pe = Y.pop();
      if (typeof pe != "function") throw new TypeError("The last argument must be of type Function");
      var A = this, f = function() {
        return pe.apply(A, arguments);
      };
      F.apply(this, Y).then(function(j) {
        ge.nextTick(f.bind(null, null, j));
      }, function(j) {
        ge.nextTick(te.bind(null, j, f));
      });
    }
    return Object.setPrototypeOf(X, Object.getPrototypeOf(F)), Object.defineProperties(X, t(F)), X;
  }
  e.callbackify = V;
})), Ns = /* @__PURE__ */ he(((e, t) => {
  function r(w, g) {
    var E = Object.keys(w);
    if (Object.getOwnPropertySymbols) {
      var R = Object.getOwnPropertySymbols(w);
      g && (R = R.filter(function(x) {
        return Object.getOwnPropertyDescriptor(w, x).enumerable;
      })), E.push.apply(E, R);
    }
    return E;
  }
  function n(w) {
    for (var g = 1; g < arguments.length; g++) {
      var E = arguments[g] != null ? arguments[g] : {};
      g % 2 ? r(Object(E), !0).forEach(function(R) {
        l(w, R, E[R]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(w, Object.getOwnPropertyDescriptors(E)) : r(Object(E)).forEach(function(R) {
        Object.defineProperty(w, R, Object.getOwnPropertyDescriptor(E, R));
      });
    }
    return w;
  }
  function l(w, g, E) {
    return g = c(g), g in w ? Object.defineProperty(w, g, {
      value: E,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : w[g] = E, w;
  }
  function i(w, g) {
    if (!(w instanceof g)) throw new TypeError("Cannot call a class as a function");
  }
  function u(w, g) {
    for (var E = 0; E < g.length; E++) {
      var R = g[E];
      R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(w, c(R.key), R);
    }
  }
  function s(w, g, E) {
    return g && u(w.prototype, g), Object.defineProperty(w, "prototype", { writable: !1 }), w;
  }
  function c(w) {
    var g = y(w, "string");
    return typeof g == "symbol" ? g : String(g);
  }
  function y(w, g) {
    if (typeof w != "object" || w === null) return w;
    var E = w[Symbol.toPrimitive];
    if (E !== void 0) {
      var R = E.call(w, g);
      if (typeof R != "object") return R;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(w);
  }
  var b = dr().Buffer, v = ci().inspect, I = v && v.custom || "inspect";
  function m(w, g, E) {
    b.prototype.copy.call(w, g, E);
  }
  t.exports = /* @__PURE__ */ (function() {
    function w() {
      i(this, w), this.head = null, this.tail = null, this.length = 0;
    }
    return s(w, [
      {
        key: "push",
        value: function(E) {
          var R = {
            data: E,
            next: null
          };
          this.length > 0 ? this.tail.next = R : this.head = R, this.tail = R, ++this.length;
        }
      },
      {
        key: "unshift",
        value: function(E) {
          var R = {
            data: E,
            next: this.head
          };
          this.length === 0 && (this.tail = R), this.head = R, ++this.length;
        }
      },
      {
        key: "shift",
        value: function() {
          if (this.length !== 0) {
            var E = this.head.data;
            return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, E;
          }
        }
      },
      {
        key: "clear",
        value: function() {
          this.head = this.tail = null, this.length = 0;
        }
      },
      {
        key: "join",
        value: function(E) {
          if (this.length === 0) return "";
          for (var R = this.head, x = "" + R.data; R = R.next; ) x += E + R.data;
          return x;
        }
      },
      {
        key: "concat",
        value: function(E) {
          if (this.length === 0) return b.alloc(0);
          for (var R = b.allocUnsafe(E >>> 0), x = this.head, _ = 0; x; )
            m(x.data, R, _), _ += x.data.length, x = x.next;
          return R;
        }
      },
      {
        key: "consume",
        value: function(E, R) {
          var x;
          return E < this.head.data.length ? (x = this.head.data.slice(0, E), this.head.data = this.head.data.slice(E)) : E === this.head.data.length ? x = this.shift() : x = R ? this._getString(E) : this._getBuffer(E), x;
        }
      },
      {
        key: "first",
        value: function() {
          return this.head.data;
        }
      },
      {
        key: "_getString",
        value: function(E) {
          var R = this.head, x = 1, _ = R.data;
          for (E -= _.length; R = R.next; ) {
            var T = R.data, S = E > T.length ? T.length : E;
            if (S === T.length ? _ += T : _ += T.slice(0, E), E -= S, E === 0) {
              S === T.length ? (++x, R.next ? this.head = R.next : this.head = this.tail = null) : (this.head = R, R.data = T.slice(S));
              break;
            }
            ++x;
          }
          return this.length -= x, _;
        }
      },
      {
        key: "_getBuffer",
        value: function(E) {
          var R = b.allocUnsafe(E), x = this.head, _ = 1;
          for (x.data.copy(R), E -= x.data.length; x = x.next; ) {
            var T = x.data, S = E > T.length ? T.length : E;
            if (T.copy(R, R.length - E, 0, S), E -= S, E === 0) {
              S === T.length ? (++_, x.next ? this.head = x.next : this.head = this.tail = null) : (this.head = x, x.data = T.slice(S));
              break;
            }
            ++_;
          }
          return this.length -= _, R;
        }
      },
      {
        key: I,
        value: function(E, R) {
          return v(this, n(n({}, R), {}, {
            depth: 0,
            customInspect: !1
          }));
        }
      }
    ]), w;
  })();
})), hi = /* @__PURE__ */ he(((e, t) => {
  nt();
  function r(c, y) {
    var b = this, v = this._readableState && this._readableState.destroyed, I = this._writableState && this._writableState.destroyed;
    return v || I ? (y ? y(c) : c && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, ge.nextTick(u, this, c)) : ge.nextTick(u, this, c)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(c || null, function(m) {
      !y && m ? b._writableState ? b._writableState.errorEmitted ? ge.nextTick(l, b) : (b._writableState.errorEmitted = !0, ge.nextTick(n, b, m)) : ge.nextTick(n, b, m) : y ? (ge.nextTick(l, b), y(m)) : ge.nextTick(l, b);
    }), this);
  }
  function n(c, y) {
    u(c, y), l(c);
  }
  function l(c) {
    c._writableState && !c._writableState.emitClose || c._readableState && !c._readableState.emitClose || c.emit("close");
  }
  function i() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function u(c, y) {
    c.emit("error", y);
  }
  function s(c, y) {
    var b = c._readableState, v = c._writableState;
    b && b.autoDestroy || v && v.autoDestroy ? c.destroy(y) : c.emit("error", y);
  }
  t.exports = {
    destroy: r,
    undestroy: i,
    errorOrDestroy: s
  };
})), xt = /* @__PURE__ */ he(((e, t) => {
  function r(y, b) {
    y.prototype = Object.create(b.prototype), y.prototype.constructor = y, y.__proto__ = b;
  }
  var n = {};
  function l(y, b, v) {
    v || (v = Error);
    function I(w, g, E) {
      return typeof b == "string" ? b : b(w, g, E);
    }
    var m = /* @__PURE__ */ (function(w) {
      r(g, w);
      function g(E, R, x) {
        return w.call(this, I(E, R, x)) || this;
      }
      return g;
    })(v);
    m.prototype.name = v.name, m.prototype.code = y, n[y] = m;
  }
  function i(y, b) {
    if (Array.isArray(y)) {
      var v = y.length;
      return y = y.map(function(I) {
        return String(I);
      }), v > 2 ? "one of ".concat(b, " ").concat(y.slice(0, v - 1).join(", "), ", or ") + y[v - 1] : v === 2 ? "one of ".concat(b, " ").concat(y[0], " or ").concat(y[1]) : "of ".concat(b, " ").concat(y[0]);
    } else return "of ".concat(b, " ").concat(String(y));
  }
  function u(y, b, v) {
    return y.substr(0, b.length) === b;
  }
  function s(y, b, v) {
    return (v === void 0 || v > y.length) && (v = y.length), y.substring(v - b.length, v) === b;
  }
  function c(y, b, v) {
    return typeof v != "number" && (v = 0), v + b.length > y.length ? !1 : y.indexOf(b, v) !== -1;
  }
  l("ERR_INVALID_OPT_VALUE", function(y, b) {
    return 'The value "' + b + '" is invalid for option "' + y + '"';
  }, TypeError), l("ERR_INVALID_ARG_TYPE", function(y, b, v) {
    var I;
    typeof b == "string" && u(b, "not ") ? (I = "must not be", b = b.replace(/^not /, "")) : I = "must be";
    var m;
    if (s(y, " argument")) m = "The ".concat(y, " ").concat(I, " ").concat(i(b, "type"));
    else {
      var w = c(y, ".") ? "property" : "argument";
      m = 'The "'.concat(y, '" ').concat(w, " ").concat(I, " ").concat(i(b, "type"));
    }
    return m += ". Received type ".concat(typeof v), m;
  }, TypeError), l("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), l("ERR_METHOD_NOT_IMPLEMENTED", function(y) {
    return "The " + y + " method is not implemented";
  }), l("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), l("ERR_STREAM_DESTROYED", function(y) {
    return "Cannot call " + y + " after a stream was destroyed";
  }), l("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), l("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), l("ERR_STREAM_WRITE_AFTER_END", "write after end"), l("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), l("ERR_UNKNOWN_ENCODING", function(y) {
    return "Unknown encoding: " + y;
  }, TypeError), l("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = n;
})), fi = /* @__PURE__ */ he(((e, t) => {
  var r = xt().codes.ERR_INVALID_OPT_VALUE;
  function n(i, u, s) {
    return i.highWaterMark != null ? i.highWaterMark : u ? i[s] : null;
  }
  function l(i, u, s, c) {
    var y = n(u, c, s);
    if (y != null) {
      if (!(isFinite(y) && Math.floor(y) === y) || y < 0) throw new r(c ? s : "highWaterMark", y);
      return Math.floor(y);
    }
    return i.objectMode ? 16 : 16384;
  }
  t.exports = { getHighWaterMark: l };
})), Os = /* @__PURE__ */ he(((e, t) => {
  _t(), t.exports = r;
  function r(l, i) {
    if (n("noDeprecation")) return l;
    var u = !1;
    function s() {
      if (!u) {
        if (n("throwDeprecation")) throw new Error(i);
        n("traceDeprecation") ? console.trace(i) : console.warn(i), u = !0;
      }
      return l.apply(this, arguments);
    }
    return s;
  }
  function n(l) {
    try {
      if (!Re.localStorage) return !1;
    } catch {
      return !1;
    }
    var i = Re.localStorage[l];
    return i == null ? !1 : String(i).toLowerCase() === "true";
  }
})), di = /* @__PURE__ */ he(((e, t) => {
  _t(), nt(), t.exports = C;
  function r(A) {
    var f = this;
    this.next = null, this.entry = null, this.finish = function() {
      pe(f, A);
    };
  }
  var n;
  C.WritableState = P;
  var l = { deprecate: Os() }, i = Qn(), u = dr().Buffer, s = (typeof Re < "u" ? Re : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function c(A) {
    return u.from(A);
  }
  function y(A) {
    return u.isBuffer(A) || A instanceof s;
  }
  var b = hi(), v = fi().getHighWaterMark, I = xt().codes, m = I.ERR_INVALID_ARG_TYPE, w = I.ERR_METHOD_NOT_IMPLEMENTED, g = I.ERR_MULTIPLE_CALLBACK, E = I.ERR_STREAM_CANNOT_PIPE, R = I.ERR_STREAM_DESTROYED, x = I.ERR_STREAM_NULL_VALUES, _ = I.ERR_STREAM_WRITE_AFTER_END, T = I.ERR_UNKNOWN_ENCODING, S = b.errorOrDestroy;
  rt()(C, i);
  function p() {
  }
  function P(A, f, j) {
    n = n || yt(), A = A || {}, typeof j != "boolean" && (j = f instanceof n), this.objectMode = !!A.objectMode, j && (this.objectMode = this.objectMode || !!A.writableObjectMode), this.highWaterMark = v(this, A, "writableHighWaterMark", j), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var U = A.decodeStrings === !1;
    this.decodeStrings = !U, this.defaultEncoding = A.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ne) {
      q(f, ne);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = A.emitClose !== !1, this.autoDestroy = !!A.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new r(this);
  }
  P.prototype.getBuffer = function() {
    for (var f = this.bufferedRequest, j = []; f; )
      j.push(f), f = f.next;
    return j;
  }, (function() {
    try {
      Object.defineProperty(P.prototype, "buffer", { get: l.deprecate(function() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
    } catch {
    }
  })();
  var M;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (M = Function.prototype[Symbol.hasInstance], Object.defineProperty(C, Symbol.hasInstance, { value: function(f) {
    return M.call(this, f) ? !0 : this !== C ? !1 : f && f._writableState instanceof P;
  } })) : M = function(f) {
    return f instanceof this;
  };
  function C(A) {
    n = n || yt();
    var f = this instanceof n;
    if (!f && !M.call(C, this)) return new C(A);
    this._writableState = new P(A, this, f), this.writable = !0, A && (typeof A.write == "function" && (this._write = A.write), typeof A.writev == "function" && (this._writev = A.writev), typeof A.destroy == "function" && (this._destroy = A.destroy), typeof A.final == "function" && (this._final = A.final)), i.call(this);
  }
  C.prototype.pipe = function() {
    S(this, new E());
  };
  function $(A, f) {
    var j = new _();
    S(A, j), ge.nextTick(f, j);
  }
  function ee(A, f, j, U) {
    var ne;
    return j === null ? ne = new x() : typeof j != "string" && !f.objectMode && (ne = new m("chunk", ["string", "Buffer"], j)), ne ? (S(A, ne), ge.nextTick(U, ne), !1) : !0;
  }
  C.prototype.write = function(A, f, j) {
    var U = this._writableState, ne = !1, D = !U.objectMode && y(A);
    return D && !u.isBuffer(A) && (A = c(A)), typeof f == "function" && (j = f, f = null), D ? f = "buffer" : f || (f = U.defaultEncoding), typeof j != "function" && (j = p), U.ending ? $(this, j) : (D || ee(this, U, A, j)) && (U.pendingcb++, ne = z(this, U, D, A, f, j)), ne;
  }, C.prototype.cork = function() {
    this._writableState.corked++;
  }, C.prototype.uncork = function() {
    var A = this._writableState;
    A.corked && (A.corked--, !A.writing && !A.corked && !A.bufferProcessing && A.bufferedRequest && te(this, A));
  }, C.prototype.setDefaultEncoding = function(f) {
    if (typeof f == "string" && (f = f.toLowerCase()), !([
      "hex",
      "utf8",
      "utf-8",
      "ascii",
      "binary",
      "base64",
      "ucs2",
      "ucs-2",
      "utf16le",
      "utf-16le",
      "raw"
    ].indexOf((f + "").toLowerCase()) > -1)) throw new T(f);
    return this._writableState.defaultEncoding = f, this;
  }, Object.defineProperty(C.prototype, "writableBuffer", {
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function O(A, f, j) {
    return !A.objectMode && A.decodeStrings !== !1 && typeof f == "string" && (f = u.from(f, j)), f;
  }
  Object.defineProperty(C.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function z(A, f, j, U, ne, D) {
    if (!j) {
      var L = O(f, U, ne);
      U !== L && (j = !0, ne = "buffer", U = L);
    }
    var h = f.objectMode ? 1 : U.length;
    f.length += h;
    var K = f.length < f.highWaterMark;
    if (K || (f.needDrain = !0), f.writing || f.corked) {
      var N = f.lastBufferedRequest;
      f.lastBufferedRequest = {
        chunk: U,
        encoding: ne,
        isBuf: j,
        callback: D,
        next: null
      }, N ? N.next = f.lastBufferedRequest : f.bufferedRequest = f.lastBufferedRequest, f.bufferedRequestCount += 1;
    } else k(A, f, !1, h, U, ne, D);
    return K;
  }
  function k(A, f, j, U, ne, D, L) {
    f.writelen = U, f.writecb = L, f.writing = !0, f.sync = !0, f.destroyed ? f.onwrite(new R("write")) : j ? A._writev(ne, f.onwrite) : A._write(ne, D, f.onwrite), f.sync = !1;
  }
  function H(A, f, j, U, ne) {
    --f.pendingcb, j ? (ge.nextTick(ne, U), ge.nextTick(Y, A, f), A._writableState.errorEmitted = !0, S(A, U)) : (ne(U), A._writableState.errorEmitted = !0, S(A, U), Y(A, f));
  }
  function Q(A) {
    A.writing = !1, A.writecb = null, A.length -= A.writelen, A.writelen = 0;
  }
  function q(A, f) {
    var j = A._writableState, U = j.sync, ne = j.writecb;
    if (typeof ne != "function") throw new g();
    if (Q(j), f) H(A, j, U, f, ne);
    else {
      var D = V(j) || A.destroyed;
      !D && !j.corked && !j.bufferProcessing && j.bufferedRequest && te(A, j), U ? ge.nextTick(le, A, j, D, ne) : le(A, j, D, ne);
    }
  }
  function le(A, f, j, U) {
    j || Z(A, f), f.pendingcb--, U(), Y(A, f);
  }
  function Z(A, f) {
    f.length === 0 && f.needDrain && (f.needDrain = !1, A.emit("drain"));
  }
  function te(A, f) {
    f.bufferProcessing = !0;
    var j = f.bufferedRequest;
    if (A._writev && j && j.next) {
      var U = f.bufferedRequestCount, ne = new Array(U), D = f.corkedRequestsFree;
      D.entry = j;
      for (var L = 0, h = !0; j; )
        ne[L] = j, j.isBuf || (h = !1), j = j.next, L += 1;
      ne.allBuffers = h, k(A, f, !0, f.length, ne, "", D.finish), f.pendingcb++, f.lastBufferedRequest = null, D.next ? (f.corkedRequestsFree = D.next, D.next = null) : f.corkedRequestsFree = new r(f), f.bufferedRequestCount = 0;
    } else {
      for (; j; ) {
        var K = j.chunk, N = j.encoding, a = j.callback;
        if (k(A, f, !1, f.objectMode ? 1 : K.length, K, N, a), j = j.next, f.bufferedRequestCount--, f.writing) break;
      }
      j === null && (f.lastBufferedRequest = null);
    }
    f.bufferedRequest = j, f.bufferProcessing = !1;
  }
  C.prototype._write = function(A, f, j) {
    j(new w("_write()"));
  }, C.prototype._writev = null, C.prototype.end = function(A, f, j) {
    var U = this._writableState;
    return typeof A == "function" ? (j = A, A = null, f = null) : typeof f == "function" && (j = f, f = null), A != null && this.write(A, f), U.corked && (U.corked = 1, this.uncork()), U.ending || re(this, U, j), this;
  }, Object.defineProperty(C.prototype, "writableLength", {
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function V(A) {
    return A.ending && A.length === 0 && A.bufferedRequest === null && !A.finished && !A.writing;
  }
  function F(A, f) {
    A._final(function(j) {
      f.pendingcb--, j && S(A, j), f.prefinished = !0, A.emit("prefinish"), Y(A, f);
    });
  }
  function X(A, f) {
    !f.prefinished && !f.finalCalled && (typeof A._final == "function" && !f.destroyed ? (f.pendingcb++, f.finalCalled = !0, ge.nextTick(F, A, f)) : (f.prefinished = !0, A.emit("prefinish")));
  }
  function Y(A, f) {
    var j = V(f);
    if (j && (X(A, f), f.pendingcb === 0 && (f.finished = !0, A.emit("finish"), f.autoDestroy))) {
      var U = A._readableState;
      (!U || U.autoDestroy && U.endEmitted) && A.destroy();
    }
    return j;
  }
  function re(A, f, j) {
    f.ending = !0, Y(A, f), j && (f.finished ? ge.nextTick(j) : A.once("finish", j)), f.ended = !0, A.writable = !1;
  }
  function pe(A, f, j) {
    var U = A.entry;
    for (A.entry = null; U; ) {
      var ne = U.callback;
      f.pendingcb--, ne(j), U = U.next;
    }
    f.corkedRequestsFree.next = A;
  }
  Object.defineProperty(C.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(f) {
      this._writableState && (this._writableState.destroyed = f);
    }
  }), C.prototype.destroy = b.destroy, C.prototype._undestroy = b.undestroy, C.prototype._destroy = function(A, f) {
    f(A);
  };
})), yt = /* @__PURE__ */ he(((e, t) => {
  nt();
  var r = Object.keys || function(v) {
    var I = [];
    for (var m in v) I.push(m);
    return I;
  };
  t.exports = c;
  var n = pi(), l = di();
  rt()(c, n);
  for (var i = r(l.prototype), u = 0; u < i.length; u++) {
    var s = i[u];
    c.prototype[s] || (c.prototype[s] = l.prototype[s]);
  }
  function c(v) {
    if (!(this instanceof c)) return new c(v);
    n.call(this, v), l.call(this, v), this.allowHalfOpen = !0, v && (v.readable === !1 && (this.readable = !1), v.writable === !1 && (this.writable = !1), v.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", y)));
  }
  Object.defineProperty(c.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(c.prototype, "writableBuffer", {
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(c.prototype, "writableLength", {
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function y() {
    this._writableState.ended || ge.nextTick(b, this);
  }
  function b(v) {
    v.end();
  }
  Object.defineProperty(c.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(I) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = I, this._writableState.destroyed = I);
    }
  });
})), Ps = /* @__PURE__ */ he(((e, t) => {
  var r = dr(), n = r.Buffer;
  function l(u, s) {
    for (var c in u) s[c] = u[c];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (l(r, e), e.Buffer = i);
  function i(u, s, c) {
    return n(u, s, c);
  }
  l(n, i), i.from = function(u, s, c) {
    if (typeof u == "number") throw new TypeError("Argument must not be a number");
    return n(u, s, c);
  }, i.alloc = function(u, s, c) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    var y = n(u);
    return s !== void 0 ? typeof c == "string" ? y.fill(s, c) : y.fill(s) : y.fill(0), y;
  }, i.allocUnsafe = function(u) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    return n(u);
  }, i.allocUnsafeSlow = function(u) {
    if (typeof u != "number") throw new TypeError("Argument must be a number");
    return r.SlowBuffer(u);
  };
})), zr = /* @__PURE__ */ he(((e) => {
  var t = Ps().Buffer, r = t.isEncoding || function(x) {
    switch (x = "" + x, x && x.toLowerCase()) {
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
  function n(x) {
    if (!x) return "utf8";
    for (var _; ; ) switch (x) {
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
        return x;
      default:
        if (_) return;
        x = ("" + x).toLowerCase(), _ = !0;
    }
  }
  function l(x) {
    var _ = n(x);
    if (typeof _ != "string" && (t.isEncoding === r || !r(x))) throw new Error("Unknown encoding: " + x);
    return _ || x;
  }
  e.StringDecoder = i;
  function i(x) {
    this.encoding = l(x);
    var _;
    switch (this.encoding) {
      case "utf16le":
        this.text = I, this.end = m, _ = 4;
        break;
      case "utf8":
        this.fillLast = y, _ = 4;
        break;
      case "base64":
        this.text = w, this.end = g, _ = 3;
        break;
      default:
        this.write = E, this.end = R;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(_);
  }
  i.prototype.write = function(x) {
    if (x.length === 0) return "";
    var _, T;
    if (this.lastNeed) {
      if (_ = this.fillLast(x), _ === void 0) return "";
      T = this.lastNeed, this.lastNeed = 0;
    } else T = 0;
    return T < x.length ? _ ? _ + this.text(x, T) : this.text(x, T) : _ || "";
  }, i.prototype.end = v, i.prototype.text = b, i.prototype.fillLast = function(x) {
    if (this.lastNeed <= x.length)
      return x.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    x.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, x.length), this.lastNeed -= x.length;
  };
  function u(x) {
    return x <= 127 ? 0 : x >> 5 === 6 ? 2 : x >> 4 === 14 ? 3 : x >> 3 === 30 ? 4 : x >> 6 === 2 ? -1 : -2;
  }
  function s(x, _, T) {
    var S = _.length - 1;
    if (S < T) return 0;
    var p = u(_[S]);
    return p >= 0 ? (p > 0 && (x.lastNeed = p - 1), p) : --S < T || p === -2 ? 0 : (p = u(_[S]), p >= 0 ? (p > 0 && (x.lastNeed = p - 2), p) : --S < T || p === -2 ? 0 : (p = u(_[S]), p >= 0 ? (p > 0 && (p === 2 ? p = 0 : x.lastNeed = p - 3), p) : 0));
  }
  function c(x, _, T) {
    if ((_[0] & 192) !== 128)
      return x.lastNeed = 0, "�";
    if (x.lastNeed > 1 && _.length > 1) {
      if ((_[1] & 192) !== 128)
        return x.lastNeed = 1, "�";
      if (x.lastNeed > 2 && _.length > 2 && (_[2] & 192) !== 128)
        return x.lastNeed = 2, "�";
    }
  }
  function y(x) {
    var _ = this.lastTotal - this.lastNeed, T = c(this, x);
    if (T !== void 0) return T;
    if (this.lastNeed <= x.length)
      return x.copy(this.lastChar, _, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    x.copy(this.lastChar, _, 0, x.length), this.lastNeed -= x.length;
  }
  function b(x, _) {
    var T = s(this, x, _);
    if (!this.lastNeed) return x.toString("utf8", _);
    this.lastTotal = T;
    var S = x.length - (T - this.lastNeed);
    return x.copy(this.lastChar, 0, S), x.toString("utf8", _, S);
  }
  function v(x) {
    var _ = x && x.length ? this.write(x) : "";
    return this.lastNeed ? _ + "�" : _;
  }
  function I(x, _) {
    if ((x.length - _) % 2 === 0) {
      var T = x.toString("utf16le", _);
      if (T) {
        var S = T.charCodeAt(T.length - 1);
        if (S >= 55296 && S <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = x[x.length - 2], this.lastChar[1] = x[x.length - 1], T.slice(0, -1);
      }
      return T;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = x[x.length - 1], x.toString("utf16le", _, x.length - 1);
  }
  function m(x) {
    var _ = x && x.length ? this.write(x) : "";
    if (this.lastNeed) {
      var T = this.lastTotal - this.lastNeed;
      return _ + this.lastChar.toString("utf16le", 0, T);
    }
    return _;
  }
  function w(x, _) {
    var T = (x.length - _) % 3;
    return T === 0 ? x.toString("base64", _) : (this.lastNeed = 3 - T, this.lastTotal = 3, T === 1 ? this.lastChar[0] = x[x.length - 1] : (this.lastChar[0] = x[x.length - 2], this.lastChar[1] = x[x.length - 1]), x.toString("base64", _, x.length - T));
  }
  function g(x) {
    var _ = x && x.length ? this.write(x) : "";
    return this.lastNeed ? _ + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : _;
  }
  function E(x) {
    return x.toString(this.encoding);
  }
  function R(x) {
    return x && x.length ? this.write(x) : "";
  }
})), tn = /* @__PURE__ */ he(((e, t) => {
  var r = xt().codes.ERR_STREAM_PREMATURE_CLOSE;
  function n(s) {
    var c = !1;
    return function() {
      if (!c) {
        c = !0;
        for (var y = arguments.length, b = new Array(y), v = 0; v < y; v++) b[v] = arguments[v];
        s.apply(this, b);
      }
    };
  }
  function l() {
  }
  function i(s) {
    return s.setHeader && typeof s.abort == "function";
  }
  function u(s, c, y) {
    if (typeof c == "function") return u(s, null, c);
    c || (c = {}), y = n(y || l);
    var b = c.readable || c.readable !== !1 && s.readable, v = c.writable || c.writable !== !1 && s.writable, I = function() {
      s.writable || w();
    }, m = s._writableState && s._writableState.finished, w = function() {
      v = !1, m = !0, b || y.call(s);
    }, g = s._readableState && s._readableState.endEmitted, E = function() {
      b = !1, g = !0, v || y.call(s);
    }, R = function(S) {
      y.call(s, S);
    }, x = function() {
      var S;
      if (b && !g)
        return (!s._readableState || !s._readableState.ended) && (S = new r()), y.call(s, S);
      if (v && !m)
        return (!s._writableState || !s._writableState.ended) && (S = new r()), y.call(s, S);
    }, _ = function() {
      s.req.on("finish", w);
    };
    return i(s) ? (s.on("complete", w), s.on("abort", x), s.req ? _() : s.on("request", _)) : v && !s._writableState && (s.on("end", I), s.on("close", I)), s.on("end", E), s.on("finish", w), c.error !== !1 && s.on("error", R), s.on("close", x), function() {
      s.removeListener("complete", w), s.removeListener("abort", x), s.removeListener("request", _), s.req && s.req.removeListener("finish", w), s.removeListener("end", I), s.removeListener("close", I), s.removeListener("finish", w), s.removeListener("end", E), s.removeListener("error", R), s.removeListener("close", x);
    };
  }
  t.exports = u;
})), Fs = /* @__PURE__ */ he(((e, t) => {
  nt();
  var r;
  function n(T, S, p) {
    return S = l(S), S in T ? Object.defineProperty(T, S, {
      value: p,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : T[S] = p, T;
  }
  function l(T) {
    var S = i(T, "string");
    return typeof S == "symbol" ? S : String(S);
  }
  function i(T, S) {
    if (typeof T != "object" || T === null) return T;
    var p = T[Symbol.toPrimitive];
    if (p !== void 0) {
      var P = p.call(T, S);
      if (typeof P != "object") return P;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (S === "string" ? String : Number)(T);
  }
  var u = tn(), s = /* @__PURE__ */ Symbol("lastResolve"), c = /* @__PURE__ */ Symbol("lastReject"), y = /* @__PURE__ */ Symbol("error"), b = /* @__PURE__ */ Symbol("ended"), v = /* @__PURE__ */ Symbol("lastPromise"), I = /* @__PURE__ */ Symbol("handlePromise"), m = /* @__PURE__ */ Symbol("stream");
  function w(T, S) {
    return {
      value: T,
      done: S
    };
  }
  function g(T) {
    var S = T[s];
    if (S !== null) {
      var p = T[m].read();
      p !== null && (T[v] = null, T[s] = null, T[c] = null, S(w(p, !1)));
    }
  }
  function E(T) {
    ge.nextTick(g, T);
  }
  function R(T, S) {
    return function(p, P) {
      T.then(function() {
        if (S[b]) {
          p(w(void 0, !0));
          return;
        }
        S[I](p, P);
      }, P);
    };
  }
  var x = Object.getPrototypeOf(function() {
  }), _ = Object.setPrototypeOf((r = {
    get stream() {
      return this[m];
    },
    next: function() {
      var S = this, p = this[y];
      if (p !== null) return Promise.reject(p);
      if (this[b]) return Promise.resolve(w(void 0, !0));
      if (this[m].destroyed) return new Promise(function($, ee) {
        ge.nextTick(function() {
          S[y] ? ee(S[y]) : $(w(void 0, !0));
        });
      });
      var P = this[v], M;
      if (P) M = new Promise(R(P, this));
      else {
        var C = this[m].read();
        if (C !== null) return Promise.resolve(w(C, !1));
        M = new Promise(this[I]);
      }
      return this[v] = M, M;
    }
  }, n(r, Symbol.asyncIterator, function() {
    return this;
  }), n(r, "return", function() {
    var S = this;
    return new Promise(function(p, P) {
      S[m].destroy(null, function(M) {
        if (M) {
          P(M);
          return;
        }
        p(w(void 0, !0));
      });
    });
  }), r), x);
  t.exports = function(S) {
    var p, P = Object.create(_, (p = {}, n(p, m, {
      value: S,
      writable: !0
    }), n(p, s, {
      value: null,
      writable: !0
    }), n(p, c, {
      value: null,
      writable: !0
    }), n(p, y, {
      value: null,
      writable: !0
    }), n(p, b, {
      value: S._readableState.endEmitted,
      writable: !0
    }), n(p, I, {
      value: function(C, $) {
        var ee = P[m].read();
        ee ? (P[v] = null, P[s] = null, P[c] = null, C(w(ee, !1))) : (P[s] = C, P[c] = $);
      },
      writable: !0
    }), p));
    return P[v] = null, u(S, function(M) {
      if (M && M.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var C = P[c];
        C !== null && (P[v] = null, P[s] = null, P[c] = null, C(M)), P[y] = M;
        return;
      }
      var $ = P[s];
      $ !== null && (P[v] = null, P[s] = null, P[c] = null, $(w(void 0, !0))), P[b] = !0;
    }), S.on("readable", E.bind(null, P)), P;
  };
})), Ds = /* @__PURE__ */ he(((e, t) => {
  t.exports = function() {
    throw new Error("Readable.from is not available in the browser");
  };
})), pi = /* @__PURE__ */ he(((e, t) => {
  _t(), nt(), t.exports = $;
  var r;
  $.ReadableState = C, Zr().EventEmitter;
  var n = function(L, h) {
    return L.listeners(h).length;
  }, l = Qn(), i = dr().Buffer, u = (typeof Re < "u" ? Re : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(D) {
    return i.from(D);
  }
  function c(D) {
    return i.isBuffer(D) || D instanceof u;
  }
  var y = ci(), b;
  y && y.debuglog ? b = y.debuglog("stream") : b = function() {
  };
  var v = Ns(), I = hi(), m = fi().getHighWaterMark, w = xt().codes, g = w.ERR_INVALID_ARG_TYPE, E = w.ERR_STREAM_PUSH_AFTER_EOF, R = w.ERR_METHOD_NOT_IMPLEMENTED, x = w.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, _, T, S;
  rt()($, l);
  var p = I.errorOrDestroy, P = [
    "error",
    "close",
    "destroy",
    "pause",
    "resume"
  ];
  function M(D, L, h) {
    if (typeof D.prependListener == "function") return D.prependListener(L, h);
    !D._events || !D._events[L] ? D.on(L, h) : Array.isArray(D._events[L]) ? D._events[L].unshift(h) : D._events[L] = [h, D._events[L]];
  }
  function C(D, L, h) {
    r = r || yt(), D = D || {}, typeof h != "boolean" && (h = L instanceof r), this.objectMode = !!D.objectMode, h && (this.objectMode = this.objectMode || !!D.readableObjectMode), this.highWaterMark = m(this, D, "readableHighWaterMark", h), this.buffer = new v(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = D.emitClose !== !1, this.autoDestroy = !!D.autoDestroy, this.destroyed = !1, this.defaultEncoding = D.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, D.encoding && (_ || (_ = zr().StringDecoder), this.decoder = new _(D.encoding), this.encoding = D.encoding);
  }
  function $(D) {
    if (r = r || yt(), !(this instanceof $)) return new $(D);
    var L = this instanceof r;
    this._readableState = new C(D, this, L), this.readable = !0, D && (typeof D.read == "function" && (this._read = D.read), typeof D.destroy == "function" && (this._destroy = D.destroy)), l.call(this);
  }
  Object.defineProperty($.prototype, "destroyed", {
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(L) {
      this._readableState && (this._readableState.destroyed = L);
    }
  }), $.prototype.destroy = I.destroy, $.prototype._undestroy = I.undestroy, $.prototype._destroy = function(D, L) {
    L(D);
  }, $.prototype.push = function(D, L) {
    var h = this._readableState, K;
    return h.objectMode ? K = !0 : typeof D == "string" && (L = L || h.defaultEncoding, L !== h.encoding && (D = i.from(D, L), L = ""), K = !0), ee(this, D, L, !1, K);
  }, $.prototype.unshift = function(D) {
    return ee(this, D, null, !0, !1);
  };
  function ee(D, L, h, K, N) {
    b("readableAddChunk", L);
    var a = D._readableState;
    if (L === null)
      a.reading = !1, q(D, a);
    else {
      var o;
      if (N || (o = z(a, L)), o) p(D, o);
      else if (a.objectMode || L && L.length > 0)
        if (typeof L != "string" && !a.objectMode && Object.getPrototypeOf(L) !== i.prototype && (L = s(L)), K)
          a.endEmitted ? p(D, new x()) : O(D, a, L, !0);
        else if (a.ended) p(D, new E());
        else {
          if (a.destroyed) return !1;
          a.reading = !1, a.decoder && !h ? (L = a.decoder.write(L), a.objectMode || L.length !== 0 ? O(D, a, L, !1) : te(D, a)) : O(D, a, L, !1);
        }
      else K || (a.reading = !1, te(D, a));
    }
    return !a.ended && (a.length < a.highWaterMark || a.length === 0);
  }
  function O(D, L, h, K) {
    L.flowing && L.length === 0 && !L.sync ? (L.awaitDrain = 0, D.emit("data", h)) : (L.length += L.objectMode ? 1 : h.length, K ? L.buffer.unshift(h) : L.buffer.push(h), L.needReadable && le(D)), te(D, L);
  }
  function z(D, L) {
    var h;
    return !c(L) && typeof L != "string" && L !== void 0 && !D.objectMode && (h = new g("chunk", [
      "string",
      "Buffer",
      "Uint8Array"
    ], L)), h;
  }
  $.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, $.prototype.setEncoding = function(D) {
    _ || (_ = zr().StringDecoder);
    var L = new _(D);
    this._readableState.decoder = L, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var h = this._readableState.buffer.head, K = ""; h !== null; )
      K += L.write(h.data), h = h.next;
    return this._readableState.buffer.clear(), K !== "" && this._readableState.buffer.push(K), this._readableState.length = K.length, this;
  };
  var k = 1073741824;
  function H(D) {
    return D >= k ? D = k : (D--, D |= D >>> 1, D |= D >>> 2, D |= D >>> 4, D |= D >>> 8, D |= D >>> 16, D++), D;
  }
  function Q(D, L) {
    return D <= 0 || L.length === 0 && L.ended ? 0 : L.objectMode ? 1 : D !== D ? L.flowing && L.length ? L.buffer.head.data.length : L.length : (D > L.highWaterMark && (L.highWaterMark = H(D)), D <= L.length ? D : L.ended ? L.length : (L.needReadable = !0, 0));
  }
  $.prototype.read = function(D) {
    b("read", D), D = parseInt(D, 10);
    var L = this._readableState, h = D;
    if (D !== 0 && (L.emittedReadable = !1), D === 0 && L.needReadable && ((L.highWaterMark !== 0 ? L.length >= L.highWaterMark : L.length > 0) || L.ended))
      return b("read: emitReadable", L.length, L.ended), L.length === 0 && L.ended ? j(this) : le(this), null;
    if (D = Q(D, L), D === 0 && L.ended)
      return L.length === 0 && j(this), null;
    var K = L.needReadable;
    b("need readable", K), (L.length === 0 || L.length - D < L.highWaterMark) && (K = !0, b("length less than watermark", K)), L.ended || L.reading ? (K = !1, b("reading or ended", K)) : K && (b("do read"), L.reading = !0, L.sync = !0, L.length === 0 && (L.needReadable = !0), this._read(L.highWaterMark), L.sync = !1, L.reading || (D = Q(h, L)));
    var N;
    return D > 0 ? N = f(D, L) : N = null, N === null ? (L.needReadable = L.length <= L.highWaterMark, D = 0) : (L.length -= D, L.awaitDrain = 0), L.length === 0 && (L.ended || (L.needReadable = !0), h !== D && L.ended && j(this)), N !== null && this.emit("data", N), N;
  };
  function q(D, L) {
    if (b("onEofChunk"), !L.ended) {
      if (L.decoder) {
        var h = L.decoder.end();
        h && h.length && (L.buffer.push(h), L.length += L.objectMode ? 1 : h.length);
      }
      L.ended = !0, L.sync ? le(D) : (L.needReadable = !1, L.emittedReadable || (L.emittedReadable = !0, Z(D)));
    }
  }
  function le(D) {
    var L = D._readableState;
    b("emitReadable", L.needReadable, L.emittedReadable), L.needReadable = !1, L.emittedReadable || (b("emitReadable", L.flowing), L.emittedReadable = !0, ge.nextTick(Z, D));
  }
  function Z(D) {
    var L = D._readableState;
    b("emitReadable_", L.destroyed, L.length, L.ended), !L.destroyed && (L.length || L.ended) && (D.emit("readable"), L.emittedReadable = !1), L.needReadable = !L.flowing && !L.ended && L.length <= L.highWaterMark, A(D);
  }
  function te(D, L) {
    L.readingMore || (L.readingMore = !0, ge.nextTick(V, D, L));
  }
  function V(D, L) {
    for (; !L.reading && !L.ended && (L.length < L.highWaterMark || L.flowing && L.length === 0); ) {
      var h = L.length;
      if (b("maybeReadMore read 0"), D.read(0), h === L.length) break;
    }
    L.readingMore = !1;
  }
  $.prototype._read = function(D) {
    p(this, new R("_read()"));
  }, $.prototype.pipe = function(D, L) {
    var h = this, K = this._readableState;
    switch (K.pipesCount) {
      case 0:
        K.pipes = D;
        break;
      case 1:
        K.pipes = [K.pipes, D];
        break;
      default:
        K.pipes.push(D);
    }
    K.pipesCount += 1, b("pipe count=%d opts=%j", K.pipesCount, L);
    var N = (!L || L.end !== !1) && D !== ge.stdout && D !== ge.stderr ? o : fe;
    K.endEmitted ? ge.nextTick(N) : h.once("end", N), D.on("unpipe", a);
    function a(me, we) {
      b("onunpipe"), me === h && we && we.hasUnpiped === !1 && (we.hasUnpiped = !0, G());
    }
    function o() {
      b("onend"), D.end();
    }
    var d = F(h);
    D.on("drain", d);
    var B = !1;
    function G() {
      b("cleanup"), D.removeListener("close", ue), D.removeListener("finish", se), D.removeListener("drain", d), D.removeListener("error", ie), D.removeListener("unpipe", a), h.removeListener("end", o), h.removeListener("end", fe), h.removeListener("data", W), B = !0, K.awaitDrain && (!D._writableState || D._writableState.needDrain) && d();
    }
    h.on("data", W);
    function W(me) {
      b("ondata");
      var we = D.write(me);
      b("dest.write", we), we === !1 && ((K.pipesCount === 1 && K.pipes === D || K.pipesCount > 1 && ne(K.pipes, D) !== -1) && !B && (b("false write response, pause", K.awaitDrain), K.awaitDrain++), h.pause());
    }
    function ie(me) {
      b("onerror", me), fe(), D.removeListener("error", ie), n(D, "error") === 0 && p(D, me);
    }
    M(D, "error", ie);
    function ue() {
      D.removeListener("finish", se), fe();
    }
    D.once("close", ue);
    function se() {
      b("onfinish"), D.removeListener("close", ue), fe();
    }
    D.once("finish", se);
    function fe() {
      b("unpipe"), h.unpipe(D);
    }
    return D.emit("pipe", h), K.flowing || (b("pipe resume"), h.resume()), D;
  };
  function F(D) {
    return function() {
      var h = D._readableState;
      b("pipeOnDrain", h.awaitDrain), h.awaitDrain && h.awaitDrain--, h.awaitDrain === 0 && n(D, "data") && (h.flowing = !0, A(D));
    };
  }
  $.prototype.unpipe = function(D) {
    var L = this._readableState, h = { hasUnpiped: !1 };
    if (L.pipesCount === 0) return this;
    if (L.pipesCount === 1)
      return D && D !== L.pipes ? this : (D || (D = L.pipes), L.pipes = null, L.pipesCount = 0, L.flowing = !1, D && D.emit("unpipe", this, h), this);
    if (!D) {
      var K = L.pipes, N = L.pipesCount;
      L.pipes = null, L.pipesCount = 0, L.flowing = !1;
      for (var a = 0; a < N; a++) K[a].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var o = ne(L.pipes, D);
    return o === -1 ? this : (L.pipes.splice(o, 1), L.pipesCount -= 1, L.pipesCount === 1 && (L.pipes = L.pipes[0]), D.emit("unpipe", this, h), this);
  }, $.prototype.on = function(D, L) {
    var h = l.prototype.on.call(this, D, L), K = this._readableState;
    return D === "data" ? (K.readableListening = this.listenerCount("readable") > 0, K.flowing !== !1 && this.resume()) : D === "readable" && !K.endEmitted && !K.readableListening && (K.readableListening = K.needReadable = !0, K.flowing = !1, K.emittedReadable = !1, b("on readable", K.length, K.reading), K.length ? le(this) : K.reading || ge.nextTick(Y, this)), h;
  }, $.prototype.addListener = $.prototype.on, $.prototype.removeListener = function(D, L) {
    var h = l.prototype.removeListener.call(this, D, L);
    return D === "readable" && ge.nextTick(X, this), h;
  }, $.prototype.removeAllListeners = function(D) {
    var L = l.prototype.removeAllListeners.apply(this, arguments);
    return (D === "readable" || D === void 0) && ge.nextTick(X, this), L;
  };
  function X(D) {
    var L = D._readableState;
    L.readableListening = D.listenerCount("readable") > 0, L.resumeScheduled && !L.paused ? L.flowing = !0 : D.listenerCount("data") > 0 && D.resume();
  }
  function Y(D) {
    b("readable nexttick read 0"), D.read(0);
  }
  $.prototype.resume = function() {
    var D = this._readableState;
    return D.flowing || (b("resume"), D.flowing = !D.readableListening, re(this, D)), D.paused = !1, this;
  };
  function re(D, L) {
    L.resumeScheduled || (L.resumeScheduled = !0, ge.nextTick(pe, D, L));
  }
  function pe(D, L) {
    b("resume", L.reading), L.reading || D.read(0), L.resumeScheduled = !1, D.emit("resume"), A(D), L.flowing && !L.reading && D.read(0);
  }
  $.prototype.pause = function() {
    return b("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (b("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function A(D) {
    var L = D._readableState;
    for (b("flow", L.flowing); L.flowing && D.read() !== null; ) ;
  }
  $.prototype.wrap = function(D) {
    var L = this, h = this._readableState, K = !1;
    D.on("end", function() {
      if (b("wrapped end"), h.decoder && !h.ended) {
        var o = h.decoder.end();
        o && o.length && L.push(o);
      }
      L.push(null);
    }), D.on("data", function(o) {
      b("wrapped data"), h.decoder && (o = h.decoder.write(o)), !(h.objectMode && o == null) && (!h.objectMode && (!o || !o.length) || L.push(o) || (K = !0, D.pause()));
    });
    for (var N in D) this[N] === void 0 && typeof D[N] == "function" && (this[N] = /* @__PURE__ */ (function(d) {
      return function() {
        return D[d].apply(D, arguments);
      };
    })(N));
    for (var a = 0; a < P.length; a++) D.on(P[a], this.emit.bind(this, P[a]));
    return this._read = function(o) {
      b("wrapped _read", o), K && (K = !1, D.resume());
    }, this;
  }, typeof Symbol == "function" && ($.prototype[Symbol.asyncIterator] = function() {
    return T === void 0 && (T = Fs()), T(this);
  }), Object.defineProperty($.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty($.prototype, "readableBuffer", {
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty($.prototype, "readableFlowing", {
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(L) {
      this._readableState && (this._readableState.flowing = L);
    }
  }), $._fromList = f, Object.defineProperty($.prototype, "readableLength", {
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function f(D, L) {
    if (L.length === 0) return null;
    var h;
    return L.objectMode ? h = L.buffer.shift() : !D || D >= L.length ? (L.decoder ? h = L.buffer.join("") : L.buffer.length === 1 ? h = L.buffer.first() : h = L.buffer.concat(L.length), L.buffer.clear()) : h = L.buffer.consume(D, L.decoder), h;
  }
  function j(D) {
    var L = D._readableState;
    b("endReadable", L.endEmitted), L.endEmitted || (L.ended = !0, ge.nextTick(U, L, D));
  }
  function U(D, L) {
    if (b("endReadableNT", D.endEmitted, D.length), !D.endEmitted && D.length === 0 && (D.endEmitted = !0, L.readable = !1, L.emit("end"), D.autoDestroy)) {
      var h = L._writableState;
      (!h || h.autoDestroy && h.finished) && L.destroy();
    }
  }
  typeof Symbol == "function" && ($.from = function(D, L) {
    return S === void 0 && (S = Ds()), S($, D, L);
  });
  function ne(D, L) {
    for (var h = 0, K = D.length; h < K; h++) if (D[h] === L) return h;
    return -1;
  }
})), mi = /* @__PURE__ */ he(((e, t) => {
  t.exports = y;
  var r = xt().codes, n = r.ERR_METHOD_NOT_IMPLEMENTED, l = r.ERR_MULTIPLE_CALLBACK, i = r.ERR_TRANSFORM_ALREADY_TRANSFORMING, u = r.ERR_TRANSFORM_WITH_LENGTH_0, s = yt();
  rt()(y, s);
  function c(I, m) {
    var w = this._transformState;
    w.transforming = !1;
    var g = w.writecb;
    if (g === null) return this.emit("error", new l());
    w.writechunk = null, w.writecb = null, m != null && this.push(m), g(I);
    var E = this._readableState;
    E.reading = !1, (E.needReadable || E.length < E.highWaterMark) && this._read(E.highWaterMark);
  }
  function y(I) {
    if (!(this instanceof y)) return new y(I);
    s.call(this, I), this._transformState = {
      afterTransform: c.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, I && (typeof I.transform == "function" && (this._transform = I.transform), typeof I.flush == "function" && (this._flush = I.flush)), this.on("prefinish", b);
  }
  function b() {
    var I = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(m, w) {
      v(I, m, w);
    }) : v(this, null, null);
  }
  y.prototype.push = function(I, m) {
    return this._transformState.needTransform = !1, s.prototype.push.call(this, I, m);
  }, y.prototype._transform = function(I, m, w) {
    w(new n("_transform()"));
  }, y.prototype._write = function(I, m, w) {
    var g = this._transformState;
    if (g.writecb = w, g.writechunk = I, g.writeencoding = m, !g.transforming) {
      var E = this._readableState;
      (g.needTransform || E.needReadable || E.length < E.highWaterMark) && this._read(E.highWaterMark);
    }
  }, y.prototype._read = function(I) {
    var m = this._transformState;
    m.writechunk !== null && !m.transforming ? (m.transforming = !0, this._transform(m.writechunk, m.writeencoding, m.afterTransform)) : m.needTransform = !0;
  }, y.prototype._destroy = function(I, m) {
    s.prototype._destroy.call(this, I, function(w) {
      m(w);
    });
  };
  function v(I, m, w) {
    if (m) return I.emit("error", m);
    if (w != null && I.push(w), I._writableState.length) throw new u();
    if (I._transformState.transforming) throw new i();
    return I.push(null);
  }
})), Ls = /* @__PURE__ */ he(((e, t) => {
  t.exports = n;
  var r = mi();
  rt()(n, r);
  function n(l) {
    if (!(this instanceof n)) return new n(l);
    r.call(this, l);
  }
  n.prototype._transform = function(l, i, u) {
    u(null, l);
  };
})), Bs = /* @__PURE__ */ he(((e, t) => {
  var r;
  function n(w) {
    var g = !1;
    return function() {
      g || (g = !0, w.apply(void 0, arguments));
    };
  }
  var l = xt().codes, i = l.ERR_MISSING_ARGS, u = l.ERR_STREAM_DESTROYED;
  function s(w) {
    if (w) throw w;
  }
  function c(w) {
    return w.setHeader && typeof w.abort == "function";
  }
  function y(w, g, E, R) {
    R = n(R);
    var x = !1;
    w.on("close", function() {
      x = !0;
    }), r === void 0 && (r = tn()), r(w, {
      readable: g,
      writable: E
    }, function(T) {
      if (T) return R(T);
      x = !0, R();
    });
    var _ = !1;
    return function(T) {
      if (!x && !_) {
        if (_ = !0, c(w)) return w.abort();
        if (typeof w.destroy == "function") return w.destroy();
        R(T || new u("pipe"));
      }
    };
  }
  function b(w) {
    w();
  }
  function v(w, g) {
    return w.pipe(g);
  }
  function I(w) {
    return !w.length || typeof w[w.length - 1] != "function" ? s : w.pop();
  }
  function m() {
    for (var w = arguments.length, g = new Array(w), E = 0; E < w; E++) g[E] = arguments[E];
    var R = I(g);
    if (Array.isArray(g[0]) && (g = g[0]), g.length < 2) throw new i("streams");
    var x, _ = g.map(function(T, S) {
      var p = S < g.length - 1;
      return y(T, p, S > 0, function(P) {
        x || (x = P), P && _.forEach(b), !p && (_.forEach(b), R(x));
      });
    });
    return g.reduce(v);
  }
  t.exports = m;
})), rn = /* @__PURE__ */ he(((e, t) => {
  t.exports = n;
  var r = Zr().EventEmitter;
  rt()(n, r), n.Readable = pi(), n.Writable = di(), n.Duplex = yt(), n.Transform = mi(), n.PassThrough = Ls(), n.finished = tn(), n.pipeline = Bs(), n.Stream = n;
  function n() {
    r.call(this);
  }
  n.prototype.pipe = function(l, i) {
    var u = this;
    function s(w) {
      l.writable && l.write(w) === !1 && u.pause && u.pause();
    }
    u.on("data", s);
    function c() {
      u.readable && u.resume && u.resume();
    }
    l.on("drain", c), !l._isStdio && (!i || i.end !== !1) && (u.on("end", b), u.on("close", v));
    var y = !1;
    function b() {
      y || (y = !0, l.end());
    }
    function v() {
      y || (y = !0, typeof l.destroy == "function" && l.destroy());
    }
    function I(w) {
      if (m(), r.listenerCount(this, "error") === 0) throw w;
    }
    u.on("error", I), l.on("error", I);
    function m() {
      u.removeListener("data", s), l.removeListener("drain", c), u.removeListener("end", b), u.removeListener("close", v), u.removeListener("error", I), l.removeListener("error", I), u.removeListener("end", m), u.removeListener("close", m), l.removeListener("close", m);
    }
    return u.on("end", m), u.on("close", m), l.on("close", m), l.emit("pipe", u), l;
  };
})), Ms = /* @__PURE__ */ he(((e) => {
  (function(t) {
    t.parser = function(A, f) {
      return new n(A, f);
    }, t.SAXParser = n, t.SAXStream = b, t.createStream = y, t.MAX_BUFFER_LENGTH = 65536;
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
    t.EVENTS = [
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
    function n(A, f) {
      if (!(this instanceof n)) return new n(A, f);
      var j = this;
      i(j), j.q = j.c = "", j.bufferCheckPosition = t.MAX_BUFFER_LENGTH, j.opt = f || {}, j.opt.lowercase = j.opt.lowercase || j.opt.lowercasetags, j.looseCase = j.opt.lowercase ? "toLowerCase" : "toUpperCase", j.tags = [], j.closed = j.closedRoot = j.sawRoot = !1, j.tag = j.error = null, j.strict = !!A, j.noscript = !!(A || j.opt.noscript), j.state = C.BEGIN, j.strictEntities = j.opt.strictEntities, j.ENTITIES = j.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), j.attribList = [], j.opt.xmlns && (j.ns = Object.create(g)), j.trackPosition = j.opt.position !== !1, j.trackPosition && (j.position = j.line = j.column = 0), ee(j, "onready");
    }
    Object.create || (Object.create = function(A) {
      function f() {
      }
      return f.prototype = A, new f();
    }), Object.keys || (Object.keys = function(A) {
      var f = [];
      for (var j in A) A.hasOwnProperty(j) && f.push(j);
      return f;
    });
    function l(A) {
      for (var f = Math.max(t.MAX_BUFFER_LENGTH, 10), j = 0, U = 0, ne = r.length; U < ne; U++) {
        var D = A[r[U]].length;
        if (D > f) switch (r[U]) {
          case "textNode":
            z(A);
            break;
          case "cdata":
            O(A, "oncdata", A.cdata), A.cdata = "";
            break;
          case "script":
            O(A, "onscript", A.script), A.script = "";
            break;
          default:
            H(A, "Max buffer length exceeded: " + r[U]);
        }
        j = Math.max(j, D);
      }
      A.bufferCheckPosition = t.MAX_BUFFER_LENGTH - j + A.position;
    }
    function i(A) {
      for (var f = 0, j = r.length; f < j; f++) A[r[f]] = "";
    }
    function u(A) {
      z(A), A.cdata !== "" && (O(A, "oncdata", A.cdata), A.cdata = ""), A.script !== "" && (O(A, "onscript", A.script), A.script = "");
    }
    n.prototype = {
      end: function() {
        Q(this);
      },
      write: pe,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        u(this);
      }
    };
    var s;
    try {
      s = rn().Stream;
    } catch {
      s = function() {
      };
    }
    var c = t.EVENTS.filter(function(A) {
      return A !== "error" && A !== "end";
    });
    function y(A, f) {
      return new b(A, f);
    }
    function b(A, f) {
      if (!(this instanceof b)) return new b(A, f);
      s.apply(this), this._parser = new n(A, f), this.writable = !0, this.readable = !0;
      var j = this;
      this._parser.onend = function() {
        j.emit("end");
      }, this._parser.onerror = function(U) {
        j.emit("error", U), j._parser.error = null;
      }, this._decoder = null, c.forEach(function(U) {
        Object.defineProperty(j, "on" + U, {
          get: function() {
            return j._parser["on" + U];
          },
          set: function(ne) {
            if (!ne)
              return j.removeAllListeners(U), j._parser["on" + U] = ne, ne;
            j.on(U, ne);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    b.prototype = Object.create(s.prototype, { constructor: { value: b } }), b.prototype.write = function(A) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(A)) {
        if (!this._decoder) {
          var f = zr().StringDecoder;
          this._decoder = new f("utf8");
        }
        A = this._decoder.write(A);
      }
      return this._parser.write(A.toString()), this.emit("data", A), !0;
    }, b.prototype.end = function(A) {
      return A && A.length && this.write(A), this._parser.end(), !0;
    }, b.prototype.on = function(A, f) {
      var j = this;
      return !j._parser["on" + A] && c.indexOf(A) !== -1 && (j._parser["on" + A] = function() {
        var U = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        U.splice(0, 0, A), j.emit.apply(j, U);
      }), s.prototype.on.call(j, A, f);
    };
    var v = "[CDATA[", I = "DOCTYPE", m = "http://www.w3.org/XML/1998/namespace", w = "http://www.w3.org/2000/xmlns/", g = {
      xml: m,
      xmlns: w
    }, E = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, R = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, x = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, _ = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function T(A) {
      return A === " " || A === `
` || A === "\r" || A === "	";
    }
    function S(A) {
      return A === '"' || A === "'";
    }
    function p(A) {
      return A === ">" || T(A);
    }
    function P(A, f) {
      return A.test(f);
    }
    function M(A, f) {
      return !P(A, f);
    }
    var C = 0;
    t.STATE = {
      BEGIN: C++,
      BEGIN_WHITESPACE: C++,
      TEXT: C++,
      TEXT_ENTITY: C++,
      OPEN_WAKA: C++,
      SGML_DECL: C++,
      SGML_DECL_QUOTED: C++,
      DOCTYPE: C++,
      DOCTYPE_QUOTED: C++,
      DOCTYPE_DTD: C++,
      DOCTYPE_DTD_QUOTED: C++,
      COMMENT_STARTING: C++,
      COMMENT: C++,
      COMMENT_ENDING: C++,
      COMMENT_ENDED: C++,
      CDATA: C++,
      CDATA_ENDING: C++,
      CDATA_ENDING_2: C++,
      PROC_INST: C++,
      PROC_INST_BODY: C++,
      PROC_INST_ENDING: C++,
      OPEN_TAG: C++,
      OPEN_TAG_SLASH: C++,
      ATTRIB: C++,
      ATTRIB_NAME: C++,
      ATTRIB_NAME_SAW_WHITE: C++,
      ATTRIB_VALUE: C++,
      ATTRIB_VALUE_QUOTED: C++,
      ATTRIB_VALUE_CLOSED: C++,
      ATTRIB_VALUE_UNQUOTED: C++,
      ATTRIB_VALUE_ENTITY_Q: C++,
      ATTRIB_VALUE_ENTITY_U: C++,
      CLOSE_TAG: C++,
      CLOSE_TAG_SAW_WHITE: C++,
      SCRIPT: C++,
      SCRIPT_ENDING: C++
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
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
    }, Object.keys(t.ENTITIES).forEach(function(A) {
      var f = t.ENTITIES[A], j = typeof f == "number" ? String.fromCharCode(f) : f;
      t.ENTITIES[A] = j;
    });
    for (var $ in t.STATE) t.STATE[t.STATE[$]] = $;
    C = t.STATE;
    function ee(A, f, j) {
      A[f] && A[f](j);
    }
    function O(A, f, j) {
      A.textNode && z(A), ee(A, f, j);
    }
    function z(A) {
      A.textNode = k(A.opt, A.textNode), A.textNode && ee(A, "ontext", A.textNode), A.textNode = "";
    }
    function k(A, f) {
      return A.trim && (f = f.trim()), A.normalize && (f = f.replace(/\s+/g, " ")), f;
    }
    function H(A, f) {
      return z(A), A.trackPosition && (f += `
Line: ` + A.line + `
Column: ` + A.column + `
Char: ` + A.c), f = new Error(f), A.error = f, ee(A, "onerror", f), A;
    }
    function Q(A) {
      return A.sawRoot && !A.closedRoot && q(A, "Unclosed root tag"), A.state !== C.BEGIN && A.state !== C.BEGIN_WHITESPACE && A.state !== C.TEXT && H(A, "Unexpected end"), z(A), A.c = "", A.closed = !0, ee(A, "onend"), n.call(A, A.strict, A.opt), A;
    }
    function q(A, f) {
      if (typeof A != "object" || !(A instanceof n)) throw new Error("bad call to strictFail");
      A.strict && H(A, f);
    }
    function le(A) {
      A.strict || (A.tagName = A.tagName[A.looseCase]());
      var f = A.tags[A.tags.length - 1] || A, j = A.tag = {
        name: A.tagName,
        attributes: {}
      };
      A.opt.xmlns && (j.ns = f.ns), A.attribList.length = 0, O(A, "onopentagstart", j);
    }
    function Z(A, f) {
      var j = A.indexOf(":") < 0 ? ["", A] : A.split(":"), U = j[0], ne = j[1];
      return f && A === "xmlns" && (U = "xmlns", ne = ""), {
        prefix: U,
        local: ne
      };
    }
    function te(A) {
      if (A.strict || (A.attribName = A.attribName[A.looseCase]()), A.attribList.indexOf(A.attribName) !== -1 || A.tag.attributes.hasOwnProperty(A.attribName)) {
        A.attribName = A.attribValue = "";
        return;
      }
      if (A.opt.xmlns) {
        var f = Z(A.attribName, !0), j = f.prefix, U = f.local;
        if (j === "xmlns")
          if (U === "xml" && A.attribValue !== m) q(A, "xml: prefix must be bound to " + m + `
Actual: ` + A.attribValue);
          else if (U === "xmlns" && A.attribValue !== w) q(A, "xmlns: prefix must be bound to " + w + `
Actual: ` + A.attribValue);
          else {
            var ne = A.tag, D = A.tags[A.tags.length - 1] || A;
            ne.ns === D.ns && (ne.ns = Object.create(D.ns)), ne.ns[U] = A.attribValue;
          }
        A.attribList.push([A.attribName, A.attribValue]);
      } else
        A.tag.attributes[A.attribName] = A.attribValue, O(A, "onattribute", {
          name: A.attribName,
          value: A.attribValue
        });
      A.attribName = A.attribValue = "";
    }
    function V(A, f) {
      if (A.opt.xmlns) {
        var j = A.tag, U = Z(A.tagName);
        j.prefix = U.prefix, j.local = U.local, j.uri = j.ns[U.prefix] || "", j.prefix && !j.uri && (q(A, "Unbound namespace prefix: " + JSON.stringify(A.tagName)), j.uri = U.prefix);
        var ne = A.tags[A.tags.length - 1] || A;
        j.ns && ne.ns !== j.ns && Object.keys(j.ns).forEach(function(W) {
          O(A, "onopennamespace", {
            prefix: W,
            uri: j.ns[W]
          });
        });
        for (var D = 0, L = A.attribList.length; D < L; D++) {
          var h = A.attribList[D], K = h[0], N = h[1], a = Z(K, !0), o = a.prefix, d = a.local, B = o === "" ? "" : j.ns[o] || "", G = {
            name: K,
            value: N,
            prefix: o,
            local: d,
            uri: B
          };
          o && o !== "xmlns" && !B && (q(A, "Unbound namespace prefix: " + JSON.stringify(o)), G.uri = o), A.tag.attributes[K] = G, O(A, "onattribute", G);
        }
        A.attribList.length = 0;
      }
      A.tag.isSelfClosing = !!f, A.sawRoot = !0, A.tags.push(A.tag), O(A, "onopentag", A.tag), f || (!A.noscript && A.tagName.toLowerCase() === "script" ? A.state = C.SCRIPT : A.state = C.TEXT, A.tag = null, A.tagName = ""), A.attribName = A.attribValue = "", A.attribList.length = 0;
    }
    function F(A) {
      if (!A.tagName) {
        q(A, "Weird empty close tag."), A.textNode += "</>", A.state = C.TEXT;
        return;
      }
      if (A.script) {
        if (A.tagName !== "script") {
          A.script += "</" + A.tagName + ">", A.tagName = "", A.state = C.SCRIPT;
          return;
        }
        O(A, "onscript", A.script), A.script = "";
      }
      var f = A.tags.length, j = A.tagName;
      A.strict || (j = j[A.looseCase]());
      for (var U = j; f-- && A.tags[f].name !== U; ) q(A, "Unexpected close tag");
      if (f < 0) {
        q(A, "Unmatched closing tag: " + A.tagName), A.textNode += "</" + A.tagName + ">", A.state = C.TEXT;
        return;
      }
      A.tagName = j;
      for (var ne = A.tags.length; ne-- > f; ) {
        var D = A.tag = A.tags.pop();
        A.tagName = A.tag.name, O(A, "onclosetag", A.tagName);
        var L = {};
        for (var h in D.ns) L[h] = D.ns[h];
        var K = A.tags[A.tags.length - 1] || A;
        A.opt.xmlns && D.ns !== K.ns && Object.keys(D.ns).forEach(function(N) {
          var a = D.ns[N];
          O(A, "onclosenamespace", {
            prefix: N,
            uri: a
          });
        });
      }
      f === 0 && (A.closedRoot = !0), A.tagName = A.attribValue = A.attribName = "", A.attribList.length = 0, A.state = C.TEXT;
    }
    function X(A) {
      var f = A.entity, j = f.toLowerCase(), U, ne = "";
      return A.ENTITIES[f] ? A.ENTITIES[f] : A.ENTITIES[j] ? A.ENTITIES[j] : (f = j, f.charAt(0) === "#" && (f.charAt(1) === "x" ? (f = f.slice(2), U = parseInt(f, 16), ne = U.toString(16)) : (f = f.slice(1), U = parseInt(f, 10), ne = U.toString(10))), f = f.replace(/^0+/, ""), isNaN(U) || ne.toLowerCase() !== f ? (q(A, "Invalid character entity"), "&" + A.entity + ";") : String.fromCodePoint(U));
    }
    function Y(A, f) {
      f === "<" ? (A.state = C.OPEN_WAKA, A.startTagPosition = A.position) : T(f) || (q(A, "Non-whitespace before first tag."), A.textNode = f, A.state = C.TEXT);
    }
    function re(A, f) {
      var j = "";
      return f < A.length && (j = A.charAt(f)), j;
    }
    function pe(A) {
      var f = this;
      if (this.error) throw this.error;
      if (f.closed) return H(f, "Cannot write after close. Assign an onready handler.");
      if (A === null) return Q(f);
      typeof A == "object" && (A = A.toString());
      for (var j = 0, U = ""; U = re(A, j++), f.c = U, !!U; )
        switch (f.trackPosition && (f.position++, U === `
` ? (f.line++, f.column = 0) : f.column++), f.state) {
          case C.BEGIN:
            if (f.state = C.BEGIN_WHITESPACE, U === "\uFEFF") continue;
            Y(f, U);
            continue;
          case C.BEGIN_WHITESPACE:
            Y(f, U);
            continue;
          case C.TEXT:
            if (f.sawRoot && !f.closedRoot) {
              for (var ne = j - 1; U && U !== "<" && U !== "&"; )
                U = re(A, j++), U && f.trackPosition && (f.position++, U === `
` ? (f.line++, f.column = 0) : f.column++);
              f.textNode += A.substring(ne, j - 1);
            }
            U === "<" && !(f.sawRoot && f.closedRoot && !f.strict) ? (f.state = C.OPEN_WAKA, f.startTagPosition = f.position) : (!T(U) && (!f.sawRoot || f.closedRoot) && q(f, "Text data outside of root node."), U === "&" ? f.state = C.TEXT_ENTITY : f.textNode += U);
            continue;
          case C.SCRIPT:
            U === "<" ? f.state = C.SCRIPT_ENDING : f.script += U;
            continue;
          case C.SCRIPT_ENDING:
            U === "/" ? f.state = C.CLOSE_TAG : (f.script += "<" + U, f.state = C.SCRIPT);
            continue;
          case C.OPEN_WAKA:
            if (U === "!")
              f.state = C.SGML_DECL, f.sgmlDecl = "";
            else if (!T(U)) if (P(E, U))
              f.state = C.OPEN_TAG, f.tagName = U;
            else if (U === "/")
              f.state = C.CLOSE_TAG, f.tagName = "";
            else if (U === "?")
              f.state = C.PROC_INST, f.procInstName = f.procInstBody = "";
            else {
              if (q(f, "Unencoded <"), f.startTagPosition + 1 < f.position) {
                var D = f.position - f.startTagPosition;
                U = new Array(D).join(" ") + U;
              }
              f.textNode += "<" + U, f.state = C.TEXT;
            }
            continue;
          case C.SGML_DECL:
            (f.sgmlDecl + U).toUpperCase() === v ? (O(f, "onopencdata"), f.state = C.CDATA, f.sgmlDecl = "", f.cdata = "") : f.sgmlDecl + U === "--" ? (f.state = C.COMMENT, f.comment = "", f.sgmlDecl = "") : (f.sgmlDecl + U).toUpperCase() === I ? (f.state = C.DOCTYPE, (f.doctype || f.sawRoot) && q(f, "Inappropriately located doctype declaration"), f.doctype = "", f.sgmlDecl = "") : U === ">" ? (O(f, "onsgmldeclaration", f.sgmlDecl), f.sgmlDecl = "", f.state = C.TEXT) : (S(U) && (f.state = C.SGML_DECL_QUOTED), f.sgmlDecl += U);
            continue;
          case C.SGML_DECL_QUOTED:
            U === f.q && (f.state = C.SGML_DECL, f.q = ""), f.sgmlDecl += U;
            continue;
          case C.DOCTYPE:
            U === ">" ? (f.state = C.TEXT, O(f, "ondoctype", f.doctype), f.doctype = !0) : (f.doctype += U, U === "[" ? f.state = C.DOCTYPE_DTD : S(U) && (f.state = C.DOCTYPE_QUOTED, f.q = U));
            continue;
          case C.DOCTYPE_QUOTED:
            f.doctype += U, U === f.q && (f.q = "", f.state = C.DOCTYPE);
            continue;
          case C.DOCTYPE_DTD:
            f.doctype += U, U === "]" ? f.state = C.DOCTYPE : S(U) && (f.state = C.DOCTYPE_DTD_QUOTED, f.q = U);
            continue;
          case C.DOCTYPE_DTD_QUOTED:
            f.doctype += U, U === f.q && (f.state = C.DOCTYPE_DTD, f.q = "");
            continue;
          case C.COMMENT:
            U === "-" ? f.state = C.COMMENT_ENDING : f.comment += U;
            continue;
          case C.COMMENT_ENDING:
            U === "-" ? (f.state = C.COMMENT_ENDED, f.comment = k(f.opt, f.comment), f.comment && O(f, "oncomment", f.comment), f.comment = "") : (f.comment += "-" + U, f.state = C.COMMENT);
            continue;
          case C.COMMENT_ENDED:
            U !== ">" ? (q(f, "Malformed comment"), f.comment += "--" + U, f.state = C.COMMENT) : f.state = C.TEXT;
            continue;
          case C.CDATA:
            U === "]" ? f.state = C.CDATA_ENDING : f.cdata += U;
            continue;
          case C.CDATA_ENDING:
            U === "]" ? f.state = C.CDATA_ENDING_2 : (f.cdata += "]" + U, f.state = C.CDATA);
            continue;
          case C.CDATA_ENDING_2:
            U === ">" ? (f.cdata && O(f, "oncdata", f.cdata), O(f, "onclosecdata"), f.cdata = "", f.state = C.TEXT) : U === "]" ? f.cdata += "]" : (f.cdata += "]]" + U, f.state = C.CDATA);
            continue;
          case C.PROC_INST:
            U === "?" ? f.state = C.PROC_INST_ENDING : T(U) ? f.state = C.PROC_INST_BODY : f.procInstName += U;
            continue;
          case C.PROC_INST_BODY:
            if (!f.procInstBody && T(U)) continue;
            U === "?" ? f.state = C.PROC_INST_ENDING : f.procInstBody += U;
            continue;
          case C.PROC_INST_ENDING:
            U === ">" ? (O(f, "onprocessinginstruction", {
              name: f.procInstName,
              body: f.procInstBody
            }), f.procInstName = f.procInstBody = "", f.state = C.TEXT) : (f.procInstBody += "?" + U, f.state = C.PROC_INST_BODY);
            continue;
          case C.OPEN_TAG:
            P(R, U) ? f.tagName += U : (le(f), U === ">" ? V(f) : U === "/" ? f.state = C.OPEN_TAG_SLASH : (T(U) || q(f, "Invalid character in tag name"), f.state = C.ATTRIB));
            continue;
          case C.OPEN_TAG_SLASH:
            U === ">" ? (V(f, !0), F(f)) : (q(f, "Forward-slash in opening tag not followed by >"), f.state = C.ATTRIB);
            continue;
          case C.ATTRIB:
            if (T(U)) continue;
            U === ">" ? V(f) : U === "/" ? f.state = C.OPEN_TAG_SLASH : P(E, U) ? (f.attribName = U, f.attribValue = "", f.state = C.ATTRIB_NAME) : q(f, "Invalid attribute name");
            continue;
          case C.ATTRIB_NAME:
            U === "=" ? f.state = C.ATTRIB_VALUE : U === ">" ? (q(f, "Attribute without value"), f.attribValue = f.attribName, te(f), V(f)) : T(U) ? f.state = C.ATTRIB_NAME_SAW_WHITE : P(R, U) ? f.attribName += U : q(f, "Invalid attribute name");
            continue;
          case C.ATTRIB_NAME_SAW_WHITE:
            if (U === "=") f.state = C.ATTRIB_VALUE;
            else {
              if (T(U)) continue;
              q(f, "Attribute without value"), f.tag.attributes[f.attribName] = "", f.attribValue = "", O(f, "onattribute", {
                name: f.attribName,
                value: ""
              }), f.attribName = "", U === ">" ? V(f) : P(E, U) ? (f.attribName = U, f.state = C.ATTRIB_NAME) : (q(f, "Invalid attribute name"), f.state = C.ATTRIB);
            }
            continue;
          case C.ATTRIB_VALUE:
            if (T(U)) continue;
            S(U) ? (f.q = U, f.state = C.ATTRIB_VALUE_QUOTED) : (q(f, "Unquoted attribute value"), f.state = C.ATTRIB_VALUE_UNQUOTED, f.attribValue = U);
            continue;
          case C.ATTRIB_VALUE_QUOTED:
            if (U !== f.q) {
              U === "&" ? f.state = C.ATTRIB_VALUE_ENTITY_Q : f.attribValue += U;
              continue;
            }
            te(f), f.q = "", f.state = C.ATTRIB_VALUE_CLOSED;
            continue;
          case C.ATTRIB_VALUE_CLOSED:
            T(U) ? f.state = C.ATTRIB : U === ">" ? V(f) : U === "/" ? f.state = C.OPEN_TAG_SLASH : P(E, U) ? (q(f, "No whitespace between attributes"), f.attribName = U, f.attribValue = "", f.state = C.ATTRIB_NAME) : q(f, "Invalid attribute name");
            continue;
          case C.ATTRIB_VALUE_UNQUOTED:
            if (!p(U)) {
              U === "&" ? f.state = C.ATTRIB_VALUE_ENTITY_U : f.attribValue += U;
              continue;
            }
            te(f), U === ">" ? V(f) : f.state = C.ATTRIB;
            continue;
          case C.CLOSE_TAG:
            if (f.tagName)
              U === ">" ? F(f) : P(R, U) ? f.tagName += U : f.script ? (f.script += "</" + f.tagName, f.tagName = "", f.state = C.SCRIPT) : (T(U) || q(f, "Invalid tagname in closing tag"), f.state = C.CLOSE_TAG_SAW_WHITE);
            else {
              if (T(U)) continue;
              M(E, U) ? f.script ? (f.script += "</" + U, f.state = C.SCRIPT) : q(f, "Invalid tagname in closing tag.") : f.tagName = U;
            }
            continue;
          case C.CLOSE_TAG_SAW_WHITE:
            if (T(U)) continue;
            U === ">" ? F(f) : q(f, "Invalid characters in closing tag");
            continue;
          case C.TEXT_ENTITY:
          case C.ATTRIB_VALUE_ENTITY_Q:
          case C.ATTRIB_VALUE_ENTITY_U:
            var L, h;
            switch (f.state) {
              case C.TEXT_ENTITY:
                L = C.TEXT, h = "textNode";
                break;
              case C.ATTRIB_VALUE_ENTITY_Q:
                L = C.ATTRIB_VALUE_QUOTED, h = "attribValue";
                break;
              case C.ATTRIB_VALUE_ENTITY_U:
                L = C.ATTRIB_VALUE_UNQUOTED, h = "attribValue";
            }
            U === ";" ? (f[h] += X(f), f.entity = "", f.state = L) : P(f.entity.length ? _ : x, U) ? f.entity += U : (q(f, "Invalid character in entity name"), f[h] += "&" + f.entity + U, f.entity = "", f.state = L);
            continue;
          default:
            throw new Error(f, "Unknown state: " + f.state);
        }
      return f.position >= f.bufferCheckPosition && l(f), f;
    }
    String.fromCodePoint || (function() {
      var A = String.fromCharCode, f = Math.floor, j = function() {
        var U = 16384, ne = [], D, L, h = -1, K = arguments.length;
        if (!K) return "";
        for (var N = ""; ++h < K; ) {
          var a = Number(arguments[h]);
          if (!isFinite(a) || a < 0 || a > 1114111 || f(a) !== a) throw RangeError("Invalid code point: " + a);
          a <= 65535 ? ne.push(a) : (a -= 65536, D = (a >> 10) + 55296, L = a % 1024 + 56320, ne.push(D, L)), (h + 1 === K || ne.length > U) && (N += A.apply(null, ne), ne.length = 0);
        }
        return N;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: j,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = j;
    })();
  })(typeof e > "u" ? e.sax = {} : e);
})), nn = /* @__PURE__ */ he(((e, t) => {
  t.exports = { isArray: function(r) {
    return Array.isArray ? Array.isArray(r) : Object.prototype.toString.call(r) === "[object Array]";
  } };
})), an = /* @__PURE__ */ he(((e, t) => {
  var r = nn().isArray;
  t.exports = {
    copyOptions: function(n) {
      var l, i = {};
      for (l in n) n.hasOwnProperty(l) && (i[l] = n[l]);
      return i;
    },
    ensureFlagExists: function(n, l) {
      (!(n in l) || typeof l[n] != "boolean") && (l[n] = !1);
    },
    ensureSpacesExists: function(n) {
      (!("spaces" in n) || typeof n.spaces != "number" && typeof n.spaces != "string") && (n.spaces = 0);
    },
    ensureAlwaysArrayExists: function(n) {
      (!("alwaysArray" in n) || typeof n.alwaysArray != "boolean" && !r(n.alwaysArray)) && (n.alwaysArray = !1);
    },
    ensureKeyExists: function(n, l) {
      (!(n + "Key" in l) || typeof l[n + "Key"] != "string") && (l[n + "Key"] = l.compact ? "_" + n : n);
    },
    checkFnExists: function(n, l) {
      return n + "Fn" in l;
    }
  };
})), vi = /* @__PURE__ */ he(((e, t) => {
  var r = Ms(), n = an(), l = nn().isArray, i, u;
  function s(_) {
    return i = n.copyOptions(_), n.ensureFlagExists("ignoreDeclaration", i), n.ensureFlagExists("ignoreInstruction", i), n.ensureFlagExists("ignoreAttributes", i), n.ensureFlagExists("ignoreText", i), n.ensureFlagExists("ignoreComment", i), n.ensureFlagExists("ignoreCdata", i), n.ensureFlagExists("ignoreDoctype", i), n.ensureFlagExists("compact", i), n.ensureFlagExists("alwaysChildren", i), n.ensureFlagExists("addParent", i), n.ensureFlagExists("trim", i), n.ensureFlagExists("nativeType", i), n.ensureFlagExists("nativeTypeAttributes", i), n.ensureFlagExists("sanitize", i), n.ensureFlagExists("instructionHasAttributes", i), n.ensureFlagExists("captureSpacesBetweenElements", i), n.ensureAlwaysArrayExists(i), n.ensureKeyExists("declaration", i), n.ensureKeyExists("instruction", i), n.ensureKeyExists("attributes", i), n.ensureKeyExists("text", i), n.ensureKeyExists("comment", i), n.ensureKeyExists("cdata", i), n.ensureKeyExists("doctype", i), n.ensureKeyExists("type", i), n.ensureKeyExists("name", i), n.ensureKeyExists("elements", i), n.ensureKeyExists("parent", i), n.checkFnExists("doctype", i), n.checkFnExists("instruction", i), n.checkFnExists("cdata", i), n.checkFnExists("comment", i), n.checkFnExists("text", i), n.checkFnExists("instructionName", i), n.checkFnExists("elementName", i), n.checkFnExists("attributeName", i), n.checkFnExists("attributeValue", i), n.checkFnExists("attributes", i), i;
  }
  function c(_) {
    var T = Number(_);
    if (!isNaN(T)) return T;
    var S = _.toLowerCase();
    return S === "true" ? !0 : S === "false" ? !1 : _;
  }
  function y(_, T) {
    var S;
    if (i.compact) {
      if (!u[i[_ + "Key"]] && (l(i.alwaysArray) ? i.alwaysArray.indexOf(i[_ + "Key"]) !== -1 : i.alwaysArray) && (u[i[_ + "Key"]] = []), u[i[_ + "Key"]] && !l(u[i[_ + "Key"]]) && (u[i[_ + "Key"]] = [u[i[_ + "Key"]]]), _ + "Fn" in i && typeof T == "string" && (T = i[_ + "Fn"](T, u)), _ === "instruction" && ("instructionFn" in i || "instructionNameFn" in i)) {
        for (S in T) if (T.hasOwnProperty(S))
          if ("instructionFn" in i) T[S] = i.instructionFn(T[S], S, u);
          else {
            var p = T[S];
            delete T[S], T[i.instructionNameFn(S, p, u)] = p;
          }
      }
      l(u[i[_ + "Key"]]) ? u[i[_ + "Key"]].push(T) : u[i[_ + "Key"]] = T;
    } else {
      u[i.elementsKey] || (u[i.elementsKey] = []);
      var P = {};
      if (P[i.typeKey] = _, _ === "instruction") {
        for (S in T) if (T.hasOwnProperty(S)) break;
        P[i.nameKey] = "instructionNameFn" in i ? i.instructionNameFn(S, T, u) : S, i.instructionHasAttributes ? (P[i.attributesKey] = T[S][i.attributesKey], "instructionFn" in i && (P[i.attributesKey] = i.instructionFn(P[i.attributesKey], S, u))) : ("instructionFn" in i && (T[S] = i.instructionFn(T[S], S, u)), P[i.instructionKey] = T[S]);
      } else
        _ + "Fn" in i && (T = i[_ + "Fn"](T, u)), P[i[_ + "Key"]] = T;
      i.addParent && (P[i.parentKey] = u), u[i.elementsKey].push(P);
    }
  }
  function b(_) {
    if ("attributesFn" in i && _ && (_ = i.attributesFn(_, u)), (i.trim || "attributeValueFn" in i || "attributeNameFn" in i || i.nativeTypeAttributes) && _) {
      var T;
      for (T in _) if (_.hasOwnProperty(T) && (i.trim && (_[T] = _[T].trim()), i.nativeTypeAttributes && (_[T] = c(_[T])), "attributeValueFn" in i && (_[T] = i.attributeValueFn(_[T], T, u)), "attributeNameFn" in i)) {
        var S = _[T];
        delete _[T], _[i.attributeNameFn(T, _[T], u)] = S;
      }
    }
    return _;
  }
  function v(_) {
    var T = {};
    if (_.body && (_.name.toLowerCase() === "xml" || i.instructionHasAttributes)) {
      for (var S = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g, p; (p = S.exec(_.body)) !== null; ) T[p[1]] = p[2] || p[3] || p[4];
      T = b(T);
    }
    if (_.name.toLowerCase() === "xml") {
      if (i.ignoreDeclaration) return;
      u[i.declarationKey] = {}, Object.keys(T).length && (u[i.declarationKey][i.attributesKey] = T), i.addParent && (u[i.declarationKey][i.parentKey] = u);
    } else {
      if (i.ignoreInstruction) return;
      i.trim && (_.body = _.body.trim());
      var P = {};
      i.instructionHasAttributes && Object.keys(T).length ? (P[_.name] = {}, P[_.name][i.attributesKey] = T) : P[_.name] = _.body, y("instruction", P);
    }
  }
  function I(_, T) {
    var S;
    if (typeof _ == "object" && (T = _.attributes, _ = _.name), T = b(T), "elementNameFn" in i && (_ = i.elementNameFn(_, u)), i.compact) {
      if (S = {}, !i.ignoreAttributes && T && Object.keys(T).length) {
        S[i.attributesKey] = {};
        var p;
        for (p in T) T.hasOwnProperty(p) && (S[i.attributesKey][p] = T[p]);
      }
      !(_ in u) && (l(i.alwaysArray) ? i.alwaysArray.indexOf(_) !== -1 : i.alwaysArray) && (u[_] = []), u[_] && !l(u[_]) && (u[_] = [u[_]]), l(u[_]) ? u[_].push(S) : u[_] = S;
    } else
      u[i.elementsKey] || (u[i.elementsKey] = []), S = {}, S[i.typeKey] = "element", S[i.nameKey] = _, !i.ignoreAttributes && T && Object.keys(T).length && (S[i.attributesKey] = T), i.alwaysChildren && (S[i.elementsKey] = []), u[i.elementsKey].push(S);
    S[i.parentKey] = u, u = S;
  }
  function m(_) {
    i.ignoreText || !_.trim() && !i.captureSpacesBetweenElements || (i.trim && (_ = _.trim()), i.nativeType && (_ = c(_)), i.sanitize && (_ = _.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), y("text", _));
  }
  function w(_) {
    i.ignoreComment || (i.trim && (_ = _.trim()), y("comment", _));
  }
  function g(_) {
    var T = u[i.parentKey];
    i.addParent || delete u[i.parentKey], u = T;
  }
  function E(_) {
    i.ignoreCdata || (i.trim && (_ = _.trim()), y("cdata", _));
  }
  function R(_) {
    i.ignoreDoctype || (_ = _.replace(/^ /, ""), i.trim && (_ = _.trim()), y("doctype", _));
  }
  function x(_) {
    _.note = _;
  }
  t.exports = function(_, T) {
    var S = r.parser(!0, {}), p = {};
    if (u = p, i = s(T), S.opt = { strictEntities: !0 }, S.onopentag = I, S.ontext = m, S.oncomment = w, S.onclosetag = g, S.onerror = x, S.oncdata = E, S.ondoctype = R, S.onprocessinginstruction = v, S.write(_).close(), p[i.elementsKey]) {
      var P = p[i.elementsKey];
      delete p[i.elementsKey], p[i.elementsKey] = P, delete p.text;
    }
    return p;
  };
})), Us = /* @__PURE__ */ he(((e, t) => {
  var r = an(), n = vi();
  function l(i) {
    var u = r.copyOptions(i);
    return r.ensureSpacesExists(u), u;
  }
  t.exports = function(i, u) {
    var s = l(u), c = n(i, s), y, b = "compact" in s && s.compact ? "_parent" : "parent";
    return "addParent" in s && s.addParent ? y = JSON.stringify(c, function(v, I) {
      return v === b ? "_" : I;
    }, s.spaces) : y = JSON.stringify(c, null, s.spaces), y.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  };
})), wi = /* @__PURE__ */ he(((e, t) => {
  var r = an(), n = nn().isArray, l, i;
  function u(S) {
    var p = r.copyOptions(S);
    return r.ensureFlagExists("ignoreDeclaration", p), r.ensureFlagExists("ignoreInstruction", p), r.ensureFlagExists("ignoreAttributes", p), r.ensureFlagExists("ignoreText", p), r.ensureFlagExists("ignoreComment", p), r.ensureFlagExists("ignoreCdata", p), r.ensureFlagExists("ignoreDoctype", p), r.ensureFlagExists("compact", p), r.ensureFlagExists("indentText", p), r.ensureFlagExists("indentCdata", p), r.ensureFlagExists("indentAttributes", p), r.ensureFlagExists("indentInstruction", p), r.ensureFlagExists("fullTagEmptyElement", p), r.ensureFlagExists("noQuotesForNativeAttributes", p), r.ensureSpacesExists(p), typeof p.spaces == "number" && (p.spaces = Array(p.spaces + 1).join(" ")), r.ensureKeyExists("declaration", p), r.ensureKeyExists("instruction", p), r.ensureKeyExists("attributes", p), r.ensureKeyExists("text", p), r.ensureKeyExists("comment", p), r.ensureKeyExists("cdata", p), r.ensureKeyExists("doctype", p), r.ensureKeyExists("type", p), r.ensureKeyExists("name", p), r.ensureKeyExists("elements", p), r.checkFnExists("doctype", p), r.checkFnExists("instruction", p), r.checkFnExists("cdata", p), r.checkFnExists("comment", p), r.checkFnExists("text", p), r.checkFnExists("instructionName", p), r.checkFnExists("elementName", p), r.checkFnExists("attributeName", p), r.checkFnExists("attributeValue", p), r.checkFnExists("attributes", p), r.checkFnExists("fullTagEmptyElement", p), p;
  }
  function s(S, p, P) {
    return (!P && S.spaces ? `
` : "") + Array(p + 1).join(S.spaces);
  }
  function c(S, p, P) {
    if (p.ignoreAttributes) return "";
    "attributesFn" in p && (S = p.attributesFn(S, i, l));
    var M, C, $, ee, O = [];
    for (M in S) S.hasOwnProperty(M) && S[M] !== null && S[M] !== void 0 && (ee = p.noQuotesForNativeAttributes && typeof S[M] != "string" ? "" : '"', C = "" + S[M], C = C.replace(/"/g, "&quot;"), $ = "attributeNameFn" in p ? p.attributeNameFn(M, C, i, l) : M, O.push(p.spaces && p.indentAttributes ? s(p, P + 1, !1) : " "), O.push($ + "=" + ee + ("attributeValueFn" in p ? p.attributeValueFn(C, M, i, l) : C) + ee));
    return S && Object.keys(S).length && p.spaces && p.indentAttributes && O.push(s(p, P, !1)), O.join("");
  }
  function y(S, p, P) {
    return l = S, i = "xml", p.ignoreDeclaration ? "" : "<?xml" + c(S[p.attributesKey], p, P) + "?>";
  }
  function b(S, p, P) {
    if (p.ignoreInstruction) return "";
    var M;
    for (M in S) if (S.hasOwnProperty(M)) break;
    var C = "instructionNameFn" in p ? p.instructionNameFn(M, S[M], i, l) : M;
    if (typeof S[M] == "object")
      return l = S, i = C, "<?" + C + c(S[M][p.attributesKey], p, P) + "?>";
    var $ = S[M] ? S[M] : "";
    return "instructionFn" in p && ($ = p.instructionFn($, M, i, l)), "<?" + C + ($ ? " " + $ : "") + "?>";
  }
  function v(S, p) {
    return p.ignoreComment ? "" : "<!--" + ("commentFn" in p ? p.commentFn(S, i, l) : S) + "-->";
  }
  function I(S, p) {
    return p.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in p ? p.cdataFn(S, i, l) : S.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function m(S, p) {
    return p.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in p ? p.doctypeFn(S, i, l) : S) + ">";
  }
  function w(S, p) {
    return p.ignoreText ? "" : (S = "" + S, S = S.replace(/&amp;/g, "&"), S = S.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "textFn" in p ? p.textFn(S, i, l) : S);
  }
  function g(S, p) {
    var P;
    if (S.elements && S.elements.length) for (P = 0; P < S.elements.length; ++P) switch (S.elements[P][p.typeKey]) {
      case "text":
        if (p.indentText) return !0;
        break;
      case "cdata":
        if (p.indentCdata) return !0;
        break;
      case "instruction":
        if (p.indentInstruction) return !0;
        break;
      case "doctype":
      case "comment":
      case "element":
        return !0;
      default:
        return !0;
    }
    return !1;
  }
  function E(S, p, P) {
    l = S, i = S.name;
    var M = [], C = "elementNameFn" in p ? p.elementNameFn(S.name, S) : S.name;
    M.push("<" + C), S[p.attributesKey] && M.push(c(S[p.attributesKey], p, P));
    var $ = S[p.elementsKey] && S[p.elementsKey].length || S[p.attributesKey] && S[p.attributesKey]["xml:space"] === "preserve";
    return $ || ("fullTagEmptyElementFn" in p ? $ = p.fullTagEmptyElementFn(S.name, S) : $ = p.fullTagEmptyElement), $ ? (M.push(">"), S[p.elementsKey] && S[p.elementsKey].length && (M.push(R(S[p.elementsKey], p, P + 1)), l = S, i = S.name), M.push(p.spaces && g(S, p) ? `
` + Array(P + 1).join(p.spaces) : ""), M.push("</" + C + ">")) : M.push("/>"), M.join("");
  }
  function R(S, p, P, M) {
    return S.reduce(function(C, $) {
      var ee = s(p, P, M && !C);
      switch ($.type) {
        case "element":
          return C + ee + E($, p, P);
        case "comment":
          return C + ee + v($[p.commentKey], p);
        case "doctype":
          return C + ee + m($[p.doctypeKey], p);
        case "cdata":
          return C + (p.indentCdata ? ee : "") + I($[p.cdataKey], p);
        case "text":
          return C + (p.indentText ? ee : "") + w($[p.textKey], p);
        case "instruction":
          var O = {};
          return O[$[p.nameKey]] = $[p.attributesKey] ? $ : $[p.instructionKey], C + (p.indentInstruction ? ee : "") + b(O, p, P);
      }
    }, "");
  }
  function x(S, p, P) {
    var M;
    for (M in S) if (S.hasOwnProperty(M)) switch (M) {
      case p.parentKey:
      case p.attributesKey:
        break;
      case p.textKey:
        if (p.indentText || P) return !0;
        break;
      case p.cdataKey:
        if (p.indentCdata || P) return !0;
        break;
      case p.instructionKey:
        if (p.indentInstruction || P) return !0;
        break;
      case p.doctypeKey:
      case p.commentKey:
        return !0;
      default:
        return !0;
    }
    return !1;
  }
  function _(S, p, P, M, C) {
    l = S, i = p;
    var $ = "elementNameFn" in P ? P.elementNameFn(p, S) : p;
    if (typeof S > "u" || S === null || S === "") return "fullTagEmptyElementFn" in P && P.fullTagEmptyElementFn(p, S) || P.fullTagEmptyElement ? "<" + $ + "></" + $ + ">" : "<" + $ + "/>";
    var ee = [];
    if (p) {
      if (ee.push("<" + $), typeof S != "object")
        return ee.push(">" + w(S, P) + "</" + $ + ">"), ee.join("");
      S[P.attributesKey] && ee.push(c(S[P.attributesKey], P, M));
      var O = x(S, P, !0) || S[P.attributesKey] && S[P.attributesKey]["xml:space"] === "preserve";
      if (O || ("fullTagEmptyElementFn" in P ? O = P.fullTagEmptyElementFn(p, S) : O = P.fullTagEmptyElement), O) ee.push(">");
      else
        return ee.push("/>"), ee.join("");
    }
    return ee.push(T(S, P, M + 1, !1)), l = S, i = p, p && ee.push((C ? s(P, M, !1) : "") + "</" + $ + ">"), ee.join("");
  }
  function T(S, p, P, M) {
    var C, $, ee, O = [];
    for ($ in S) if (S.hasOwnProperty($))
      for (ee = n(S[$]) ? S[$] : [S[$]], C = 0; C < ee.length; ++C) {
        switch ($) {
          case p.declarationKey:
            O.push(y(ee[C], p, P));
            break;
          case p.instructionKey:
            O.push((p.indentInstruction ? s(p, P, M) : "") + b(ee[C], p, P));
            break;
          case p.attributesKey:
          case p.parentKey:
            break;
          case p.textKey:
            O.push((p.indentText ? s(p, P, M) : "") + w(ee[C], p));
            break;
          case p.cdataKey:
            O.push((p.indentCdata ? s(p, P, M) : "") + I(ee[C], p));
            break;
          case p.doctypeKey:
            O.push(s(p, P, M) + m(ee[C], p));
            break;
          case p.commentKey:
            O.push(s(p, P, M) + v(ee[C], p));
            break;
          default:
            O.push(s(p, P, M) + _(ee[C], $, p, P, x(ee[C], p)));
        }
        M = M && !O.length;
      }
    return O.join("");
  }
  t.exports = function(S, p) {
    p = u(p);
    var P = [];
    return l = S, i = "_root_", p.compact ? P.push(T(S, p, 0, !0)) : (S[p.declarationKey] && P.push(y(S[p.declarationKey], p, 0)), S[p.elementsKey] && S[p.elementsKey].length && P.push(R(S[p.elementsKey], p, 0, !P.length))), P.join("");
  };
})), js = /* @__PURE__ */ he(((e, t) => {
  var r = wi();
  t.exports = function(n, l) {
    n instanceof Buffer && (n = n.toString());
    var i = null;
    if (typeof n == "string") try {
      i = JSON.parse(n);
    } catch {
      throw new Error("The JSON structure is invalid");
    }
    else i = n;
    return r(i, l);
  };
})), gi = (/* @__PURE__ */ he(((e, t) => {
  t.exports = {
    xml2js: vi(),
    xml2json: Us(),
    js2xml: wi(),
    json2xml: js()
  };
})))(), sn = (e) => {
  switch (e.type) {
    case void 0:
    case "element":
      const t = new zs(e.name, e.attributes), r = e.elements || [];
      for (const n of r) {
        const l = sn(n);
        l !== void 0 && t.push(l);
      }
      return t;
    case "text":
      return e.text;
    default:
      return;
  }
}, Ws = class extends ve {
}, zs = class extends ae {
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
    return sn((0, gi.xml2js)(e, { compact: !1 }));
  }
  /**
  * Creates an ImportedXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param _attr - Optional attributes for the root element
  */
  constructor(e, t) {
    super(e), t && this.root.push(new Ws(t));
  }
  /**
  * Adds a child component or text to this element.
  *
  * @param xmlComponent - The child component or text string to add
  */
  push(e) {
    this.root.push(e);
  }
}, Hs = class extends ae {
  /**
  * Creates an ImportedRootElementAttributes component.
  *
  * @param _attr - The attributes object to pass through
  */
  constructor(e) {
    super(""), J(this, "_attr", void 0), this._attr = e;
  }
  /**
  * Prepares the attributes for XML serialization.
  *
  * @param _ - Context (unused)
  * @returns Object with _attr key containing the raw attributes
  */
  prepForXml(e) {
    return { _attr: this._attr };
  }
}, yi = class extends ae {
  /**
  * Creates a new InitializableXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param initComponent - Optional component to copy children from
  */
  constructor(e, t) {
    super(e), t && (this.root = t.root);
  }
}, Ie = (e) => {
  if (isNaN(e)) throw new Error(`Invalid value '${e}' specified. Must be an integer.`);
  return Math.floor(e);
}, vr = (e) => {
  const t = Ie(e);
  if (t < 0) throw new Error(`Invalid value '${e}' specified. Must be a positive integer.`);
  return t;
}, bi = (e, t) => {
  const r = t * 2;
  if (e.length !== r || isNaN(+`0x${e}`)) throw new Error(`Invalid hex value '${e}'. Expected ${r} digit hex value`);
  return e;
}, En = (e) => bi(e, 1), on = (e) => {
  const t = e.slice(-2), r = e.substring(0, e.length - 2);
  return `${Number(r)}${t}`;
}, Gs = {
  in: 1440,
  cm: 1440 / 2.54,
  mm: 1440 / 25.4,
  pt: 20,
  pc: 240,
  pi: 240
}, vt = (e) => {
  if (typeof e == "number") return e;
  const t = e.slice(-2), r = Number(e.substring(0, e.length - 2)), n = Gs[t];
  if (n === void 0 || Number.isNaN(r)) throw new Error(`Invalid universal measure '${e}'. Expected a number followed by mm, cm, in, pt, pc or pi.`);
  return r * n;
}, _i = (e) => {
  const t = on(e);
  if (parseFloat(t) < 0) throw new Error(`Invalid value '${t}' specified. Expected a positive number.`);
  return t;
}, xi = (e) => e === "auto" ? e : bi(e.charAt(0) === "#" ? e.substring(1) : e, 3), He = (e) => typeof e == "string" ? on(e) : Ie(e), Ks = (e) => typeof e == "string" ? _i(e) : vr(e), ke = (e) => typeof e == "string" ? _i(e) : vr(e), $s = (e) => {
  const t = e.substring(0, e.length - 1);
  return `${Number(t)}%`;
}, Ei = (e) => typeof e == "number" ? Ie(e) : e.slice(-1) === "%" ? $s(e) : on(e), Vs = vr, qs = vr, Xs = (e) => e.toISOString(), ce = class extends ae {
  /**
  * Creates an OnOffElement.
  *
  * @param name - The XML element name (e.g., "w:b", "w:i")
  * @param val - The boolean value (defaults to true)
  */
  constructor(e, t = !0) {
    super(e), t !== !0 && this.root.push(new Oe({ val: t }));
  }
}, Tr = class extends ae {
  /**
  * Creates an HpsMeasureElement.
  *
  * @param name - The XML element name
  * @param val - The measurement value (number in half-points or string with units)
  */
  constructor(e, t) {
    super(e), this.root.push(new Oe({ val: Ks(t) }));
  }
}, Ti = class extends ae {
}, Ye = class extends ae {
  /**
  * Creates a StringValueElement.
  *
  * @param name - The XML element name
  * @param val - The string value
  */
  constructor(e, t) {
    super(e), this.root.push(new Oe({ val: t }));
  }
}, kt = (e, t) => new oe({
  name: e,
  attributes: { value: {
    key: "w:val",
    value: t
  } }
}), Wt = class extends ae {
  /**
  * Creates a NumberValueElement.
  *
  * @param name - The XML element name
  * @param val - The numeric value
  */
  constructor(e, t) {
    super(e), this.root.push(new Oe({ val: t }));
  }
}, st = class extends ae {
  /**
  * Creates a StringContainer.
  *
  * @param name - The XML element name
  * @param val - The text content
  */
  constructor(e, t) {
    super(e), this.root.push(t);
  }
}, oe = class extends ae {
  /**
  * Creates a BuilderElement with the specified configuration.
  *
  * @param config - Element configuration
  * @param config.name - The XML element name
  * @param config.attributes - Optional attributes with explicit key-value pairs
  * @param config.children - Optional child elements
  */
  constructor({ name: e, attributes: t, children: r }) {
    super(e), t && this.root.push(new Xr(t)), r && this.root.push(...r);
  }
}, Ee = {
  /** Align Start */
  START: "start",
  /** Align Center */
  CENTER: "center",
  /** End */
  END: "end",
  /** Align Left */
  LEFT: "left",
  /** Align Right */
  RIGHT: "right",
  /** Justified */
  JUSTIFIED: "both"
}, Si = (e) => new oe({
  name: "w:jc",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), ln = {
  dark1: "dk1",
  light1: "lt1",
  dark2: "dk2",
  light2: "lt2",
  accent1: "accent1",
  accent2: "accent2",
  accent3: "accent3",
  accent4: "accent4",
  accent5: "accent5",
  accent6: "accent6",
  hyperlink: "hlink",
  followedHyperlink: "folHlink"
}, Ai = {
  dark2: "44546A",
  light2: "E7E6E6",
  accent1: "4472C4",
  accent2: "ED7D31",
  accent3: "A5A5A5",
  accent4: "FFC000",
  accent5: "5B9BD5",
  accent6: "70AD47",
  hyperlink: "0563C1",
  followedHyperlink: "954F72"
}, ki = {
  dark1: {
    value: "windowText",
    lastColor: "000000"
  },
  light1: {
    value: "window",
    lastColor: "FFFFFF"
  }
}, Ii = (e, t) => {
  if (t === "auto") throw new Error(`Invalid theme color ${e} 'auto'. Expected 6 digit hex value`);
  return xi(t);
}, Ri = (e = {}) => Object.fromEntries(Object.keys(ln).map((t) => {
  const r = e[t], n = t === "dark1" || t === "light1" ? ki[t].lastColor : Ai[t];
  return [t, r === void 0 ? n : Ii(t, r)];
})), Zs = (e, t) => new oe({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: Ii(e, t)
  } }
}), Ys = (e, t) => {
  const r = t[e], n = e === "dark1" || e === "light1" ? ki[e] : void 0;
  return new oe({
    name: `a:${ln[e]}`,
    children: [r === void 0 && n ? new oe({
      name: "a:sysClr",
      attributes: {
        value: {
          key: "val",
          value: n.value
        },
        lastColor: {
          key: "lastClr",
          value: n.lastColor
        }
      }
    }) : Zs(e, r ?? Ai[e])]
  });
}, Js = (e, t = {}) => new oe({
  name: "a:clrScheme",
  attributes: { name: {
    key: "name",
    value: e
  } },
  children: Object.keys(ln).map((r) => Ys(r, t))
}), Tn = /* @__PURE__ */ new Set([
  "dark1",
  "light1",
  "dark2",
  "light2",
  "accent1",
  "accent2",
  "accent3",
  "accent4",
  "accent5",
  "accent6",
  "hyperlink",
  "followedHyperlink"
]), Qs = /* @__PURE__ */ new Map([
  ["dk1", "dark1"],
  ["lt1", "light1"],
  ["dk2", "dark2"],
  ["lt2", "light2"],
  ["hlink", "hyperlink"],
  ["folHlink", "followedHyperlink"],
  ["text1", "dark1"],
  ["background1", "light1"],
  ["text2", "dark2"],
  ["background2", "light2"]
]), Sn = (e, t) => {
  if (!(e >= 0 && e <= 100)) throw new Error(`Invalid ${t} ${e}. Expected a number from 0 to 100`);
  return Math.round(255 * (1 - e / 100));
}, eo = ({ theme: e, lighter: t, darker: r }) => {
  if (!Tn.has(e)) {
    const i = Qs.get(e);
    throw new Error(`Invalid theme color "${e}". ${i ? `Did you mean "${i}"?` : `Expected one of ${[...Tn].join(", ")}`}`);
  }
  if (t !== void 0 && r !== void 0) throw new Error("Invalid theme color. Expected lighter or darker, not both");
  const n = t === void 0 ? void 0 : Sn(t, "lighter"), l = r === void 0 ? void 0 : Sn(r, "darker");
  return {
    tint: n === 255 ? void 0 : n,
    shade: l === 255 ? void 0 : l
  };
}, to = (e) => {
  const [t, r, n] = [
    0,
    2,
    4
  ].map((c) => parseInt(e.slice(c, c + 2), 16) / 255), l = Math.max(t, r, n), i = Math.min(t, r, n), u = (l + i) / 2, s = l - i;
  return s === 0 ? {
    hue: 0,
    saturation: 0,
    lightness: u
  } : {
    hue: (l === t ? ((r - n) / s + 6) % 6 : l === r ? (n - t) / s + 2 : (t - r) / s + 4) * 60,
    saturation: s / (1 - Math.abs(2 * u - 1)),
    lightness: u
  };
}, ro = ({ hue: e, saturation: t, lightness: r }) => {
  const n = (1 - Math.abs(2 * r - 1)) * t, l = n * (1 - Math.abs(e / 60 % 2 - 1)), [i, u, s] = e < 60 ? [
    n,
    l,
    0
  ] : e < 120 ? [
    l,
    n,
    0
  ] : e < 180 ? [
    0,
    n,
    l
  ] : e < 240 ? [
    0,
    l,
    n
  ] : e < 300 ? [
    l,
    0,
    n
  ] : [
    n,
    0,
    l
  ], c = r - n / 2;
  return [
    i,
    u,
    s
  ].map((y) => Math.floor((y + c) * 255 + 1e-9).toString(16).padStart(2, "0")).join("").toUpperCase();
}, no = (e, { tint: t, shade: r }) => {
  if (t === void 0 && r === void 0) return e;
  const n = to(e), l = t === void 0 ? n.lightness * r / 255 : n.lightness * t / 255 + (1 - t / 255);
  return ro(de(de({}, n), {}, { lightness: l }));
}, An = (e) => e === void 0 ? void 0 : e.toString(16).padStart(2, "0").toUpperCase(), io = (e) => typeof e == "string" ? {
  type: "hex",
  value: xi(e)
} : {
  type: "theme",
  color: e,
  change: eo(e)
}, ao = (e, t) => e.type === "hex" ? { color: e.value } : {
  color: no(t[e.color.theme], e.change),
  theme: e.color.theme,
  tint: An(e.change.tint),
  shade: An(e.change.shade)
}, so = Ri(), un = class extends Ht {
  /**
  * @throws If a color isn't valid
  */
  constructor(e) {
    super("_attr"), J(this, "attributes", void 0), this.attributes = e.map((t) => "keys" in t ? {
      keys: t.keys,
      color: t.color === void 0 ? void 0 : io(t.color)
    } : t);
  }
  prepForXml(e) {
    var t, r;
    const n = (t = (r = e.file) === null || r === void 0 || (r = r.Theme) === null || r === void 0 ? void 0 : r.Colors) !== null && t !== void 0 ? t : so, l = this.attributes.flatMap((i) => {
      if (!("keys" in i)) return [[i.key, i.value]];
      if (i.color === void 0) return [];
      const { keys: u } = i, s = ao(i.color, n);
      return [
        [u.color, s.color],
        [u.theme, s.theme],
        [u.tint, s.tint],
        [u.shade, s.shade]
      ];
    });
    return { _attr: Object.fromEntries(l.filter(([, i]) => i !== void 0)) };
  }
}, oo = class extends ae {
  constructor(e, t) {
    super(e), this.root.push(new un(t));
  }
}, cn = (e, t) => new oo(e, t), $t = {
  color: "w:color",
  theme: "w:themeColor",
  tint: "w:themeTint",
  shade: "w:themeShade"
}, be = (e, { color: t, size: r, space: n, style: l }) => cn(e, [
  {
    key: "w:val",
    value: l
  },
  {
    keys: $t,
    color: t
  },
  {
    key: "w:sz",
    value: r === void 0 ? void 0 : Vs(r)
  },
  {
    key: "w:space",
    value: n === void 0 ? void 0 : qs(n)
  }
]), De = {
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
}, lo = class extends tt {
  constructor(e) {
    super("w:pBdr"), e.top && this.root.push(be("w:top", e.top)), e.left && this.root.push(be("w:left", e.left)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.right && this.root.push(be("w:right", e.right)), e.between && this.root.push(be("w:between", e.between));
  }
}, uo = class extends ae {
  constructor() {
    super("w:pBdr");
    const e = be("w:bottom", {
      color: "auto",
      space: 1,
      style: De.SINGLE,
      size: 6
    });
    this.root.push(e);
  }
}, co = ({ start: e, end: t, left: r, right: n, hanging: l, firstLine: i, firstLineChars: u }) => new oe({
  name: "w:ind",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : He(e)
    },
    end: {
      key: "w:end",
      value: t === void 0 ? void 0 : He(t)
    },
    left: {
      key: "w:left",
      value: r === void 0 ? void 0 : He(r)
    },
    right: {
      key: "w:right",
      value: n === void 0 ? void 0 : He(n)
    },
    hanging: {
      key: "w:hanging",
      value: l === void 0 ? void 0 : ke(l)
    },
    firstLine: {
      key: "w:firstLine",
      value: i === void 0 ? void 0 : ke(i)
    },
    firstLineChars: {
      key: "w:firstLineChars",
      value: u === void 0 ? void 0 : Ie(u)
    }
  }
}), ho = () => new oe({ name: "w:br" }), hn = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
}, fn = (e, t) => new oe({
  name: "w:fldChar",
  attributes: {
    type: {
      key: "w:fldCharType",
      value: e
    },
    dirty: {
      key: "w:dirty",
      value: t
    }
  }
}), Ft = (e) => fn(hn.BEGIN, e), Dt = (e) => fn(hn.SEPARATE, e), Lt = (e) => fn(hn.END, e), fo = {
  DECIMAL: "decimal"
}, ct = {
  DEFAULT: "default",
  PRESERVE: "preserve"
}, ht = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { space: "xml:space" });
  }
}, po = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("PAGE");
  }
}, mo = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("NUMPAGES");
  }
}, vo = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("SECTIONPAGES");
  }
}, wo = class extends ae {
  constructor() {
    super("w:instrText"), this.root.push(new ht({ space: ct.PRESERVE })), this.root.push("SECTION");
  }
}, wr = ({ fill: e, color: t, type: r }) => cn("w:shd", [
  {
    keys: {
      color: "w:fill",
      theme: "w:themeFill",
      tint: "w:themeFillTint",
      shade: "w:themeFillShade"
    },
    color: e
  },
  {
    keys: $t,
    color: t
  },
  {
    key: "w:val",
    value: r ?? Ze.CLEAR
  }
]), Ze = {
  /** Clear shading - no pattern, fill color only */
  CLEAR: "clear",
  DIAGONAL_CROSS: "diagCross",
  DIAGONAL_STRIPE: "diagStripe",
  HORIZONTAL_STRIPE: "horzStripe",
  NIL: "nil",
  VERTICAL_STRIPE: "vertStripe"
}, Pe = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
}, go = class extends ae {
  constructor(e) {
    super("w:del"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, yo = class extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, bo = {
  /** Dot emphasis mark */
  DOT: "dot"
}, _o = (e = bo.DOT) => new oe({
  name: "w:em",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), xo = class extends ae {
  constructor(e) {
    super("w:spacing"), this.root.push(new Oe({ val: He(e) }));
  }
}, Eo = class extends ae {
  constructor(e) {
    super("w:color"), this.root.push(new un([{
      keys: de(de({}, $t), {}, { color: "w:val" }),
      color: e
    }]));
  }
}, To = class extends ae {
  constructor(e) {
    super("w:highlight"), this.root.push(new Oe({ val: e }));
  }
}, So = (e) => new oe({
  name: "w:lang",
  attributes: {
    value: {
      key: "w:val",
      value: e.value
    },
    eastAsia: {
      key: "w:eastAsia",
      value: e.eastAsia
    },
    bidirectional: {
      key: "w:bidi",
      value: e.bidirectional
    }
  }
}), Sr = (e, t) => {
  if (typeof e == "string") {
    const n = e;
    return new oe({
      name: "w:rFonts",
      attributes: {
        ascii: {
          key: "w:ascii",
          value: n
        },
        cs: {
          key: "w:cs",
          value: n
        },
        eastAsia: {
          key: "w:eastAsia",
          value: n
        },
        hAnsi: {
          key: "w:hAnsi",
          value: n
        },
        hint: {
          key: "w:hint",
          value: t
        }
      }
    });
  }
  if ("theme" in e) {
    const n = e.theme === "headings" ? "major" : "minor";
    return new oe({
      name: "w:rFonts",
      attributes: {
        ascii: {
          key: "w:asciiTheme",
          value: `${n}HAnsi`
        },
        eastAsia: {
          key: "w:eastAsiaTheme",
          value: `${n}EastAsia`
        },
        hAnsi: {
          key: "w:hAnsiTheme",
          value: `${n}HAnsi`
        },
        cs: {
          key: "w:cstheme",
          value: `${n}Bidi`
        }
      }
    });
  }
  const r = e;
  return new oe({
    name: "w:rFonts",
    attributes: {
      ascii: {
        key: "w:ascii",
        value: r.ascii
      },
      cs: {
        key: "w:cs",
        value: r.cs
      },
      eastAsia: {
        key: "w:eastAsia",
        value: r.eastAsia
      },
      hAnsi: {
        key: "w:hAnsi",
        value: r.hAnsi
      },
      hint: {
        key: "w:hint",
        value: r.hint
      }
    }
  });
}, Ci = (e) => new oe({
  name: "w:vertAlign",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Ao = () => Ci("superscript"), ko = () => Ci("subscript"), Ni = {
  /** Single underline */
  SINGLE: "single"
}, Io = (e = Ni.SINGLE, t) => cn("w:u", [{
  key: "w:val",
  value: e
}, {
  keys: $t,
  color: t
}]), it = class extends tt {
  constructor(e) {
    if (super("w:rPr"), !e) return;
    if (e.style && this.push(new Ye("w:rStyle", e.style)), e.font && (typeof e.font == "string" ? this.push(Sr(e.font)) : "name" in e.font ? this.push(Sr(e.font.name, e.font.hint)) : this.push(Sr(e.font))), e.bold !== void 0 && this.push(new ce("w:b", e.bold)), e.boldComplexScript === void 0 && e.bold !== void 0 || e.boldComplexScript) {
      var t;
      this.push(new ce("w:bCs", (t = e.boldComplexScript) !== null && t !== void 0 ? t : e.bold));
    }
    if (e.italics !== void 0 && this.push(new ce("w:i", e.italics)), e.italicsComplexScript === void 0 && e.italics !== void 0 || e.italicsComplexScript) {
      var r;
      this.push(new ce("w:iCs", (r = e.italicsComplexScript) !== null && r !== void 0 ? r : e.italics));
    }
    e.smallCaps !== void 0 ? this.push(new ce("w:smallCaps", e.smallCaps)) : e.allCaps !== void 0 && this.push(new ce("w:caps", e.allCaps)), e.strike !== void 0 && this.push(new ce("w:strike", e.strike)), e.doubleStrike !== void 0 && this.push(new ce("w:dstrike", e.doubleStrike)), e.emboss !== void 0 && this.push(new ce("w:emboss", e.emboss)), e.imprint !== void 0 && this.push(new ce("w:imprint", e.imprint)), e.noProof !== void 0 && this.push(new ce("w:noProof", e.noProof)), e.snapToGrid !== void 0 && this.push(new ce("w:snapToGrid", e.snapToGrid)), e.vanish && this.push(new ce("w:vanish", e.vanish)), e.color && this.push(new Eo(e.color)), e.characterSpacing && this.push(new xo(e.characterSpacing)), e.scale !== void 0 && this.push(new Wt("w:w", e.scale)), e.kern && this.push(new Tr("w:kern", e.kern)), e.position && this.push(new Ye("w:position", e.position)), e.size !== void 0 && this.push(new Tr("w:sz", e.size));
    const n = e.sizeComplexScript === void 0 || e.sizeComplexScript === !0 ? e.size : e.sizeComplexScript;
    n && this.push(new Tr("w:szCs", n)), e.highlight && this.push(new To(e.highlight)), e.underline && this.push(Io(e.underline.type, e.underline.color)), e.effect && this.push(new Ye("w:effect", e.effect)), e.border && this.push(be("w:bdr", e.border)), e.shading && this.push(wr(e.shading)), e.subScript && this.push(ko()), e.superScript && this.push(Ao()), e.rightToLeft !== void 0 && this.push(new ce("w:rtl", e.rightToLeft)), e.emphasisMark && this.push(_o(e.emphasisMark.type)), e.language && this.push(So(e.language)), e.specVanish && this.push(new ce("w:specVanish", e.vanish)), e.math && this.push(new ce("w:oMath", e.math)), e.revision && this.push(new Co(e.revision));
  }
  push(e) {
    this.root.push(e);
  }
}, Ro = class extends it {
  constructor(e) {
    super(e), e?.insertion && this.push(new yo(e.insertion)), e?.deletion && this.push(new go(e.deletion));
  }
}, Co = class extends ae {
  constructor(e) {
    super("w:rPrChange"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.addChildElement(new it(e));
  }
}, ur = class extends ae {
  constructor(e) {
    if (super("w:t"), typeof e == "string")
      this.root.push(new ht({ space: ct.PRESERVE })), this.root.push(e);
    else {
      var t;
      this.root.push(new ht({ space: (t = e.space) !== null && t !== void 0 ? t : ct.DEFAULT })), this.root.push(e.text);
    }
  }
}, et = {
  /** Inserts the current page number */
  CURRENT: "CURRENT",
  /** Inserts the total number of pages in the document */
  TOTAL_PAGES: "TOTAL_PAGES",
  /** Inserts the total number of pages in the current section */
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  /** Inserts the current section number */
  CURRENT_SECTION: "SECTION"
}, Je = class Hr extends ae {
  constructor(t) {
    if (super("w:r"), J(this, "properties", void 0), J(this, "following", []), this.properties = new it(t), this.root.push(this.properties), t.break) for (let r = 0; r < t.break; r++) this.root.push(ho());
    if (t.children) for (const [r, n] of t.children.entries()) {
      if (n instanceof Hr) {
        const l = t.children.slice(r + 1);
        this.following = [n, ...l.length > 0 ? [new Hr(de(de({}, t), {}, {
          break: void 0,
          children: l
        }))] : []];
        break;
      }
      if (typeof n == "string") {
        switch (n) {
          case et.CURRENT:
            this.root.push(Ft()), this.root.push(new po()), this.root.push(Dt()), this.root.push(Lt());
            break;
          case et.TOTAL_PAGES:
            this.root.push(Ft()), this.root.push(new mo()), this.root.push(Dt()), this.root.push(Lt());
            break;
          case et.TOTAL_PAGES_IN_SECTION:
            this.root.push(Ft()), this.root.push(new vo()), this.root.push(Dt()), this.root.push(Lt());
            break;
          case et.CURRENT_SECTION:
            this.root.push(Ft()), this.root.push(new wo()), this.root.push(Dt()), this.root.push(Lt());
            break;
          default:
            this.root.push(new ur(n));
        }
        continue;
      }
      this.root.push(n);
    }
    else t.text !== void 0 && this.root.push(new ur(t.text));
  }
  get writtenAs() {
    return this.following.length > 0 ? [this, ...this.following.flatMap((t) => {
      var r;
      return (r = t.writtenAs) !== null && r !== void 0 ? r : t;
    })] : void 0;
  }
}, Ce = class extends Je {
  constructor(e) {
    super(typeof e == "string" ? { text: e } : e);
  }
}, Vt = /* @__PURE__ */ he(((e, t) => {
  t.exports = r;
  function r(n, l) {
    if (!n) throw new Error(l || "Assertion failed");
  }
  r.equal = function(l, i, u) {
    if (l != i) throw new Error(u || "Assertion failed: " + l + " != " + i);
  };
})), Ge = /* @__PURE__ */ he(((e) => {
  var t = Vt();
  e.inherits = rt();
  function r(O, z) {
    return (O.charCodeAt(z) & 64512) !== 55296 || z < 0 || z + 1 >= O.length ? !1 : (O.charCodeAt(z + 1) & 64512) === 56320;
  }
  function n(O, z) {
    if (Array.isArray(O)) return O.slice();
    if (!O) return [];
    var k = [];
    if (typeof O == "string")
      if (z) {
        if (z === "hex")
          for (O = O.replace(/[^a-z0-9]+/gi, ""), O.length % 2 !== 0 && (O = "0" + O), Q = 0; Q < O.length; Q += 2) k.push(parseInt(O[Q] + O[Q + 1], 16));
      } else for (var H = 0, Q = 0; Q < O.length; Q++) {
        var q = O.charCodeAt(Q);
        q < 128 ? k[H++] = q : q < 2048 ? (k[H++] = q >> 6 | 192, k[H++] = q & 63 | 128) : r(O, Q) ? (q = 65536 + ((q & 1023) << 10) + (O.charCodeAt(++Q) & 1023), k[H++] = q >> 18 | 240, k[H++] = q >> 12 & 63 | 128, k[H++] = q >> 6 & 63 | 128, k[H++] = q & 63 | 128) : (k[H++] = q >> 12 | 224, k[H++] = q >> 6 & 63 | 128, k[H++] = q & 63 | 128);
      }
    else for (Q = 0; Q < O.length; Q++) k[Q] = O[Q] | 0;
    return k;
  }
  e.toArray = n;
  function l(O) {
    for (var z = "", k = 0; k < O.length; k++) z += s(O[k].toString(16));
    return z;
  }
  e.toHex = l;
  function i(O) {
    return (O >>> 24 | O >>> 8 & 65280 | O << 8 & 16711680 | (O & 255) << 24) >>> 0;
  }
  e.htonl = i;
  function u(O, z) {
    for (var k = "", H = 0; H < O.length; H++) {
      var Q = O[H];
      z === "little" && (Q = i(Q)), k += c(Q.toString(16));
    }
    return k;
  }
  e.toHex32 = u;
  function s(O) {
    return O.length === 1 ? "0" + O : O;
  }
  e.zero2 = s;
  function c(O) {
    return O.length === 7 ? "0" + O : O.length === 6 ? "00" + O : O.length === 5 ? "000" + O : O.length === 4 ? "0000" + O : O.length === 3 ? "00000" + O : O.length === 2 ? "000000" + O : O.length === 1 ? "0000000" + O : O;
  }
  e.zero8 = c;
  function y(O, z, k, H) {
    var Q = k - z;
    t(Q % 4 === 0);
    for (var q = new Array(Q / 4), le = 0, Z = z; le < q.length; le++, Z += 4) {
      var te;
      H === "big" ? te = O[Z] << 24 | O[Z + 1] << 16 | O[Z + 2] << 8 | O[Z + 3] : te = O[Z + 3] << 24 | O[Z + 2] << 16 | O[Z + 1] << 8 | O[Z], q[le] = te >>> 0;
    }
    return q;
  }
  e.join32 = y;
  function b(O, z) {
    for (var k = new Array(O.length * 4), H = 0, Q = 0; H < O.length; H++, Q += 4) {
      var q = O[H];
      z === "big" ? (k[Q] = q >>> 24, k[Q + 1] = q >>> 16 & 255, k[Q + 2] = q >>> 8 & 255, k[Q + 3] = q & 255) : (k[Q + 3] = q >>> 24, k[Q + 2] = q >>> 16 & 255, k[Q + 1] = q >>> 8 & 255, k[Q] = q & 255);
    }
    return k;
  }
  e.split32 = b;
  function v(O, z) {
    return O >>> z | O << 32 - z;
  }
  e.rotr32 = v;
  function I(O, z) {
    return O << z | O >>> 32 - z;
  }
  e.rotl32 = I;
  function m(O, z) {
    return O + z >>> 0;
  }
  e.sum32 = m;
  function w(O, z, k) {
    return O + z + k >>> 0;
  }
  e.sum32_3 = w;
  function g(O, z, k, H) {
    return O + z + k + H >>> 0;
  }
  e.sum32_4 = g;
  function E(O, z, k, H, Q) {
    return O + z + k + H + Q >>> 0;
  }
  e.sum32_5 = E;
  function R(O, z, k, H) {
    var Q = O[z], q = H + O[z + 1] >>> 0;
    O[z] = (q < H ? 1 : 0) + k + Q >>> 0, O[z + 1] = q;
  }
  e.sum64 = R;
  function x(O, z, k, H) {
    return (z + H >>> 0 < z ? 1 : 0) + O + k >>> 0;
  }
  e.sum64_hi = x;
  function _(O, z, k, H) {
    return z + H >>> 0;
  }
  e.sum64_lo = _;
  function T(O, z, k, H, Q, q, le, Z) {
    var te = 0, V = z;
    return V = V + H >>> 0, te += V < z ? 1 : 0, V = V + q >>> 0, te += V < q ? 1 : 0, V = V + Z >>> 0, te += V < Z ? 1 : 0, O + k + Q + le + te >>> 0;
  }
  e.sum64_4_hi = T;
  function S(O, z, k, H, Q, q, le, Z) {
    return z + H + q + Z >>> 0;
  }
  e.sum64_4_lo = S;
  function p(O, z, k, H, Q, q, le, Z, te, V) {
    var F = 0, X = z;
    return X = X + H >>> 0, F += X < z ? 1 : 0, X = X + q >>> 0, F += X < q ? 1 : 0, X = X + Z >>> 0, F += X < Z ? 1 : 0, X = X + V >>> 0, F += X < V ? 1 : 0, O + k + Q + le + te + F >>> 0;
  }
  e.sum64_5_hi = p;
  function P(O, z, k, H, Q, q, le, Z, te, V) {
    return z + H + q + Z + V >>> 0;
  }
  e.sum64_5_lo = P;
  function M(O, z, k) {
    return (z << 32 - k | O >>> k) >>> 0;
  }
  e.rotr64_hi = M;
  function C(O, z, k) {
    return (O << 32 - k | z >>> k) >>> 0;
  }
  e.rotr64_lo = C;
  function $(O, z, k) {
    return O >>> k;
  }
  e.shr64_hi = $;
  function ee(O, z, k) {
    return (O << 32 - k | z >>> k) >>> 0;
  }
  e.shr64_lo = ee;
})), qt = /* @__PURE__ */ he(((e) => {
  var t = Ge(), r = Vt();
  function n() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  e.BlockHash = n, n.prototype.update = function(i, u) {
    if (i = t.toArray(i, u), this.pending ? this.pending = this.pending.concat(i) : this.pending = i, this.pendingTotal += i.length, this.pending.length >= this._delta8) {
      i = this.pending;
      var s = i.length % this._delta8;
      this.pending = i.slice(i.length - s, i.length), this.pending.length === 0 && (this.pending = null), i = t.join32(i, 0, i.length - s, this.endian);
      for (var c = 0; c < i.length; c += this._delta32) this._update(i, c, c + this._delta32);
    }
    return this;
  }, n.prototype.digest = function(i) {
    return this.update(this._pad()), r(this.pending === null), this._digest(i);
  }, n.prototype._pad = function() {
    var i = this.pendingTotal, u = this._delta8, s = u - (i + this.padLength) % u, c = new Array(s + this.padLength);
    c[0] = 128;
    for (var y = 1; y < s; y++) c[y] = 0;
    if (i <<= 3, this.endian === "big") {
      for (var b = 8; b < this.padLength; b++) c[y++] = 0;
      c[y++] = 0, c[y++] = 0, c[y++] = 0, c[y++] = 0, c[y++] = i >>> 24 & 255, c[y++] = i >>> 16 & 255, c[y++] = i >>> 8 & 255, c[y++] = i & 255;
    } else
      for (c[y++] = i & 255, c[y++] = i >>> 8 & 255, c[y++] = i >>> 16 & 255, c[y++] = i >>> 24 & 255, c[y++] = 0, c[y++] = 0, c[y++] = 0, c[y++] = 0, b = 8; b < this.padLength; b++) c[y++] = 0;
    return c;
  };
})), Oi = /* @__PURE__ */ he(((e) => {
  var t = Ge().rotr32;
  function r(b, v, I, m) {
    if (b === 0) return n(v, I, m);
    if (b === 1 || b === 3) return i(v, I, m);
    if (b === 2) return l(v, I, m);
  }
  e.ft_1 = r;
  function n(b, v, I) {
    return b & v ^ ~b & I;
  }
  e.ch32 = n;
  function l(b, v, I) {
    return b & v ^ b & I ^ v & I;
  }
  e.maj32 = l;
  function i(b, v, I) {
    return b ^ v ^ I;
  }
  e.p32 = i;
  function u(b) {
    return t(b, 2) ^ t(b, 13) ^ t(b, 22);
  }
  e.s0_256 = u;
  function s(b) {
    return t(b, 6) ^ t(b, 11) ^ t(b, 25);
  }
  e.s1_256 = s;
  function c(b) {
    return t(b, 7) ^ t(b, 18) ^ b >>> 3;
  }
  e.g0_256 = c;
  function y(b) {
    return t(b, 17) ^ t(b, 19) ^ b >>> 10;
  }
  e.g1_256 = y;
})), No = /* @__PURE__ */ he(((e, t) => {
  var r = Ge(), n = qt(), l = Oi(), i = r.rotl32, u = r.sum32, s = r.sum32_5, c = l.ft_1, y = n.BlockHash, b = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function v() {
    if (!(this instanceof v)) return new v();
    y.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  r.inherits(v, y), t.exports = v, v.blockSize = 512, v.outSize = 160, v.hmacStrength = 80, v.padLength = 64, v.prototype._update = function(m, w) {
    for (var g = this.W, E = 0; E < 16; E++) g[E] = m[w + E];
    for (; E < g.length; E++) g[E] = i(g[E - 3] ^ g[E - 8] ^ g[E - 14] ^ g[E - 16], 1);
    var R = this.h[0], x = this.h[1], _ = this.h[2], T = this.h[3], S = this.h[4];
    for (E = 0; E < g.length; E++) {
      var p = ~~(E / 20), P = s(i(R, 5), c(p, x, _, T), S, g[E], b[p]);
      S = T, T = _, _ = i(x, 30), x = R, R = P;
    }
    this.h[0] = u(this.h[0], R), this.h[1] = u(this.h[1], x), this.h[2] = u(this.h[2], _), this.h[3] = u(this.h[3], T), this.h[4] = u(this.h[4], S);
  }, v.prototype._digest = function(m) {
    return m === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), Pi = /* @__PURE__ */ he(((e, t) => {
  var r = Ge(), n = qt(), l = Oi(), i = Vt(), u = r.sum32, s = r.sum32_4, c = r.sum32_5, y = l.ch32, b = l.maj32, v = l.s0_256, I = l.s1_256, m = l.g0_256, w = l.g1_256, g = n.BlockHash, E = [
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
  function R() {
    if (!(this instanceof R)) return new R();
    g.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = E, this.W = new Array(64);
  }
  r.inherits(R, g), t.exports = R, R.blockSize = 512, R.outSize = 256, R.hmacStrength = 192, R.padLength = 64, R.prototype._update = function(_, T) {
    for (var S = this.W, p = 0; p < 16; p++) S[p] = _[T + p];
    for (; p < S.length; p++) S[p] = s(w(S[p - 2]), S[p - 7], m(S[p - 15]), S[p - 16]);
    var P = this.h[0], M = this.h[1], C = this.h[2], $ = this.h[3], ee = this.h[4], O = this.h[5], z = this.h[6], k = this.h[7];
    for (i(this.k.length === S.length), p = 0; p < S.length; p++) {
      var H = c(k, I(ee), y(ee, O, z), this.k[p], S[p]), Q = u(v(P), b(P, M, C));
      k = z, z = O, O = ee, ee = u($, H), $ = C, C = M, M = P, P = u(H, Q);
    }
    this.h[0] = u(this.h[0], P), this.h[1] = u(this.h[1], M), this.h[2] = u(this.h[2], C), this.h[3] = u(this.h[3], $), this.h[4] = u(this.h[4], ee), this.h[5] = u(this.h[5], O), this.h[6] = u(this.h[6], z), this.h[7] = u(this.h[7], k);
  }, R.prototype._digest = function(_) {
    return _ === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
})), Oo = /* @__PURE__ */ he(((e, t) => {
  var r = Ge(), n = Pi();
  function l() {
    if (!(this instanceof l)) return new l();
    n.call(this), this.h = [
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
  r.inherits(l, n), t.exports = l, l.blockSize = 512, l.outSize = 224, l.hmacStrength = 192, l.padLength = 64, l.prototype._digest = function(u) {
    return u === "hex" ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big");
  };
})), Fi = /* @__PURE__ */ he(((e, t) => {
  var r = Ge(), n = qt(), l = Vt(), i = r.rotr64_hi, u = r.rotr64_lo, s = r.shr64_hi, c = r.shr64_lo, y = r.sum64, b = r.sum64_hi, v = r.sum64_lo, I = r.sum64_4_hi, m = r.sum64_4_lo, w = r.sum64_5_hi, g = r.sum64_5_lo, E = n.BlockHash, R = [
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
  function x() {
    if (!(this instanceof x)) return new x();
    E.call(this), this.h = [
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
    ], this.k = R, this.W = new Array(160);
  }
  r.inherits(x, E), t.exports = x, x.blockSize = 1024, x.outSize = 512, x.hmacStrength = 192, x.padLength = 128, x.prototype._prepareBlock = function(Q, q) {
    for (var le = this.W, Z = 0; Z < 32; Z++) le[Z] = Q[q + Z];
    for (; Z < le.length; Z += 2) {
      var te = z(le[Z - 4], le[Z - 3]), V = k(le[Z - 4], le[Z - 3]), F = le[Z - 14], X = le[Z - 13], Y = ee(le[Z - 30], le[Z - 29]), re = O(le[Z - 30], le[Z - 29]), pe = le[Z - 32], A = le[Z - 31];
      le[Z] = I(te, V, F, X, Y, re, pe, A), le[Z + 1] = m(te, V, F, X, Y, re, pe, A);
    }
  }, x.prototype._update = function(Q, q) {
    this._prepareBlock(Q, q);
    var le = this.W, Z = this.h[0], te = this.h[1], V = this.h[2], F = this.h[3], X = this.h[4], Y = this.h[5], re = this.h[6], pe = this.h[7], A = this.h[8], f = this.h[9], j = this.h[10], U = this.h[11], ne = this.h[12], D = this.h[13], L = this.h[14], h = this.h[15];
    l(this.k.length === le.length);
    for (var K = 0; K < le.length; K += 2) {
      var N = L, a = h, o = C(A, f), d = $(A, f), B = _(A, f, j, U, ne), G = T(A, f, j, U, ne, D), W = this.k[K], ie = this.k[K + 1], ue = le[K], se = le[K + 1], fe = w(N, a, o, d, B, G, W, ie, ue, se), me = g(N, a, o, d, B, G, W, ie, ue, se);
      N = P(Z, te), a = M(Z, te), o = S(Z, te, V, F, X), d = p(Z, te, V, F, X, Y);
      var we = b(N, a, o, d), Se = v(N, a, o, d);
      L = ne, h = D, ne = j, D = U, j = A, U = f, A = b(re, pe, fe, me), f = v(pe, pe, fe, me), re = X, pe = Y, X = V, Y = F, V = Z, F = te, Z = b(fe, me, we, Se), te = v(fe, me, we, Se);
    }
    y(this.h, 0, Z, te), y(this.h, 2, V, F), y(this.h, 4, X, Y), y(this.h, 6, re, pe), y(this.h, 8, A, f), y(this.h, 10, j, U), y(this.h, 12, ne, D), y(this.h, 14, L, h);
  }, x.prototype._digest = function(Q) {
    return Q === "hex" ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
  };
  function _(H, Q, q, le, Z) {
    var te = H & q ^ ~H & Z;
    return te < 0 && (te += 4294967296), te;
  }
  function T(H, Q, q, le, Z, te) {
    var V = Q & le ^ ~Q & te;
    return V < 0 && (V += 4294967296), V;
  }
  function S(H, Q, q, le, Z) {
    var te = H & q ^ H & Z ^ q & Z;
    return te < 0 && (te += 4294967296), te;
  }
  function p(H, Q, q, le, Z, te) {
    var V = Q & le ^ Q & te ^ le & te;
    return V < 0 && (V += 4294967296), V;
  }
  function P(H, Q) {
    var q = i(H, Q, 28), le = i(Q, H, 2), Z = i(Q, H, 7), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function M(H, Q) {
    var q = u(H, Q, 28), le = u(Q, H, 2), Z = u(Q, H, 7), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function C(H, Q) {
    var q = i(H, Q, 14), le = i(H, Q, 18), Z = i(Q, H, 9), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function $(H, Q) {
    var q = u(H, Q, 14), le = u(H, Q, 18), Z = u(Q, H, 9), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function ee(H, Q) {
    var q = i(H, Q, 1), le = i(H, Q, 8), Z = s(H, Q, 7), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function O(H, Q) {
    var q = u(H, Q, 1), le = u(H, Q, 8), Z = c(H, Q, 7), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function z(H, Q) {
    var q = i(H, Q, 19), le = i(Q, H, 29), Z = s(H, Q, 6), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
  function k(H, Q) {
    var q = u(H, Q, 19), le = u(Q, H, 29), Z = c(H, Q, 6), te = q ^ le ^ Z;
    return te < 0 && (te += 4294967296), te;
  }
})), Po = /* @__PURE__ */ he(((e, t) => {
  var r = Ge(), n = Fi();
  function l() {
    if (!(this instanceof l)) return new l();
    n.call(this), this.h = [
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
  r.inherits(l, n), t.exports = l, l.blockSize = 1024, l.outSize = 384, l.hmacStrength = 192, l.padLength = 128, l.prototype._digest = function(u) {
    return u === "hex" ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big");
  };
})), Fo = /* @__PURE__ */ he(((e) => {
  e.sha1 = No(), e.sha224 = Oo(), e.sha256 = Pi(), e.sha384 = Po(), e.sha512 = Fi();
})), Do = /* @__PURE__ */ he(((e) => {
  var t = Ge(), r = qt(), n = t.rotl32, l = t.sum32, i = t.sum32_3, u = t.sum32_4, s = r.BlockHash;
  function c() {
    if (!(this instanceof c)) return new c();
    s.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.endian = "little";
  }
  t.inherits(c, s), e.ripemd160 = c, c.blockSize = 512, c.outSize = 160, c.hmacStrength = 192, c.padLength = 64, c.prototype._update = function(R, x) {
    for (var _ = this.h[0], T = this.h[1], S = this.h[2], p = this.h[3], P = this.h[4], M = _, C = T, $ = S, ee = p, O = P, z = 0; z < 80; z++) {
      var k = l(n(u(_, y(z, T, S, p), R[I[z] + x], b(z)), w[z]), P);
      _ = P, P = p, p = n(S, 10), S = T, T = k, k = l(n(u(M, y(79 - z, C, $, ee), R[m[z] + x], v(z)), g[z]), O), M = O, O = ee, ee = n($, 10), $ = C, C = k;
    }
    k = i(this.h[1], S, ee), this.h[1] = i(this.h[2], p, O), this.h[2] = i(this.h[3], P, M), this.h[3] = i(this.h[4], _, C), this.h[4] = i(this.h[0], T, $), this.h[0] = k;
  }, c.prototype._digest = function(R) {
    return R === "hex" ? t.toHex32(this.h, "little") : t.split32(this.h, "little");
  };
  function y(E, R, x, _) {
    return E <= 15 ? R ^ x ^ _ : E <= 31 ? R & x | ~R & _ : E <= 47 ? (R | ~x) ^ _ : E <= 63 ? R & _ | x & ~_ : R ^ (x | ~_);
  }
  function b(E) {
    return E <= 15 ? 0 : E <= 31 ? 1518500249 : E <= 47 ? 1859775393 : E <= 63 ? 2400959708 : 2840853838;
  }
  function v(E) {
    return E <= 15 ? 1352829926 : E <= 31 ? 1548603684 : E <= 47 ? 1836072691 : E <= 63 ? 2053994217 : 0;
  }
  var I = [
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
  ], m = [
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
  ], w = [
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
  ], g = [
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
})), Lo = /* @__PURE__ */ he(((e, t) => {
  var r = Ge(), n = Vt();
  function l(i, u, s) {
    if (!(this instanceof l)) return new l(i, u, s);
    this.Hash = i, this.blockSize = i.blockSize / 8, this.outSize = i.outSize / 8, this.inner = null, this.outer = null, this._init(r.toArray(u, s));
  }
  t.exports = l, l.prototype._init = function(u) {
    u.length > this.blockSize && (u = new this.Hash().update(u).digest()), n(u.length <= this.blockSize);
    for (var s = u.length; s < this.blockSize; s++) u.push(0);
    for (s = 0; s < u.length; s++) u[s] ^= 54;
    for (this.inner = new this.Hash().update(u), s = 0; s < u.length; s++) u[s] ^= 106;
    this.outer = new this.Hash().update(u);
  }, l.prototype.update = function(u, s) {
    return this.inner.update(u, s), this;
  }, l.prototype.digest = function(u) {
    return this.outer.update(this.inner.digest()), this.outer.digest(u);
  };
})), Bo = /* @__PURE__ */ qr((/* @__PURE__ */ he(((e) => {
  var t = e;
  t.utils = Ge(), t.common = qt(), t.sha = Fo(), t.ripemd = Do(), t.hmac = Lo(), t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
})))()), Mo = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Uo = (e, t = 21) => (r = t) => {
  let n = "", l = r | 0;
  for (; l-- > 0; ) n += e[Math.random() * e.length | 0];
  return n;
}, jo = (e = 21) => {
  let t = "", r = e | 0;
  for (; r-- > 0; ) t += Mo[Math.random() * 64 | 0];
  return t;
}, Le = (e) => Math.floor(e * 72 * 20), gr = (e = 0) => {
  let t = e;
  return () => ++t;
}, Wo = () => gr(), zo = () => gr(1), Ho = () => gr(), Go = Ho(), Ko = () => gr(), $o = Ko(), dn = () => jo().toLowerCase(), kn = (e) => Bo.default.sha1().update(e instanceof ArrayBuffer ? new Uint8Array(e) : e).digest("hex"), It = (e) => Uo("1234567890abcdef", e)(), Vo = () => `${It(8)}-${It(4)}-${It(4)}-${It(4)}-${It(12)}`, Bt = (e) => new Uint8Array(new TextEncoder().encode(e)), qo = {
  /**
  * ## Page Edge
  *
  * Specifies that the horizontal positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Xo = {
  /**
  * ## Page Edge
  *
  * Specifies that the vertical positioning shall be relative to the edge of the page.
  */
  PAGE: "page"
}, Zo = () => new oe({
  name: "wp:simplePos",
  attributes: {
    x: {
      key: "x",
      value: 0
    },
    y: {
      key: "y",
      value: 0
    }
  }
}), Di = (e) => new oe({
  name: "wp:align",
  children: [e]
}), Li = (e) => new oe({
  name: "wp:posOffset",
  children: [e.toString()]
}), Yo = ({ relative: e, align: t, offset: r }) => new oe({
  name: "wp:positionH",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? qo.PAGE
  } },
  children: [(() => {
    if (t) return Di(t);
    if (r !== void 0) return Li(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Jo = ({ relative: e, align: t, offset: r }) => new oe({
  name: "wp:positionV",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: e ?? Xo.PAGE
  } },
  children: [(() => {
    if (t) return Di(t);
    if (r !== void 0) return Li(r);
    throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
}), Qo = (e = {}) => {
  var t, r, n, l;
  return new oe({
    name: "wps:bodyPr",
    attributes: {
      lIns: {
        key: "lIns",
        value: (t = e.margins) === null || t === void 0 ? void 0 : t.left
      },
      rIns: {
        key: "rIns",
        value: (r = e.margins) === null || r === void 0 ? void 0 : r.right
      },
      tIns: {
        key: "tIns",
        value: (n = e.margins) === null || n === void 0 ? void 0 : n.top
      },
      bIns: {
        key: "bIns",
        value: (l = e.margins) === null || l === void 0 ? void 0 : l.bottom
      },
      anchor: {
        key: "anchor",
        value: e.verticalAnchor
      }
    },
    children: [...e.noAutoFit ? [new ce("a:noAutofit", e.noAutoFit)] : []]
  });
}, el = (e = { txBox: "1" }) => new oe({
  name: "wps:cNvSpPr",
  attributes: { txBox: {
    key: "txBox",
    value: e.txBox
  } }
}), tl = (e) => new oe({
  name: "w:txbxContent",
  children: [...e]
}), rl = (e) => new oe({
  name: "wps:txbx",
  children: [tl(e)]
}), nl = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
}, Bi = class extends ae {
  constructor(e, t) {
    super("a:ext"), J(this, "attributes", void 0), this.attributes = new nl({
      cx: e,
      cy: t
    }), this.root.push(this.attributes);
  }
}, il = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
}, Mi = class extends ae {
  constructor(e, t) {
    super("a:off"), this.root.push(new il({
      x: e ?? 0,
      y: t ?? 0
    }));
  }
}, al = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
}, sl = class extends ae {
  constructor(e) {
    var t, r, n, l;
    super("a:xfrm"), J(this, "extents", void 0), J(this, "offset", void 0), this.root.push(new al({
      flipVertical: (t = e.flip) === null || t === void 0 ? void 0 : t.vertical,
      flipHorizontal: (r = e.flip) === null || r === void 0 ? void 0 : r.horizontal,
      rotation: e.rotation
    })), this.offset = new Mi((n = e.offset) === null || n === void 0 || (n = n.emus) === null || n === void 0 ? void 0 : n.x, (l = e.offset) === null || l === void 0 || (l = l.emus) === null || l === void 0 ? void 0 : l.y), this.extents = new Bi(e.emus.x, e.emus.y), this.root.push(this.offset), this.root.push(this.extents);
  }
}, Ui = () => new oe({ name: "a:noFill" }), ol = (e) => new oe({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), ll = (e) => new oe({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: e.value
  } }
}), Gr = (e) => new oe({
  name: "a:solidFill",
  children: [e.type === "rgb" ? ol(e) : ll(e)]
}), ul = {
  /** Round cap style */
  ROUND: "rnd",
  /** Square cap style */
  SQUARE: "sq",
  /** Flat cap style */
  FLAT: "flat"
}, cl = {
  /** Single line */
  SINGLE: "sng",
  /** Double line */
  DOUBLE: "dbl",
  /** Thick-thin double line */
  THICK_THIN: "thickThin",
  /** Thin-thick double line */
  THIN_THICK: "thinThick",
  /** Triple line */
  TRI: "tri"
}, hl = {
  /** Center alignment */
  CENTER: "ctr",
  /** Inset alignment */
  INSET: "in"
}, fl = (e) => new oe({
  name: "a:ln",
  attributes: {
    width: {
      key: "w",
      value: e.width
    },
    cap: {
      key: "cap",
      value: e.cap === void 0 ? void 0 : ul[e.cap]
    },
    compoundLine: {
      key: "cmpd",
      value: e.compoundLine === void 0 ? void 0 : cl[e.compoundLine]
    },
    align: {
      key: "algn",
      value: e.align === void 0 ? void 0 : hl[e.align]
    }
  },
  children: [e.type === "noFill" ? Ui() : e.solidFillType === "rgb" ? Gr({
    type: "rgb",
    value: e.value
  }) : Gr({
    type: "scheme",
    value: e.value
  })]
}), dl = class extends ae {
  constructor() {
    super("a:avLst");
  }
}, pl = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { prst: "prst" });
  }
}, ml = class extends ae {
  constructor() {
    super("a:prstGeom"), this.root.push(new pl({ prst: "rect" })), this.root.push(new dl());
  }
}, vl = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { bwMode: "bwMode" });
  }
}, ji = class extends ae {
  constructor({ element: e, outline: t, solidFill: r, transform: n }) {
    super(`${e}:spPr`), J(this, "form", void 0), this.root.push(new vl({ bwMode: "auto" })), this.form = new sl(n), this.root.push(this.form), this.root.push(new ml()), r ? this.root.push(Gr(r)) : t && this.root.push(Ui()), t && this.root.push(fl(t));
  }
}, In = (e) => new oe({
  name: "wps:wsp",
  children: [
    el(e.nonVisualProperties),
    new ji({
      element: "wps",
      transform: e.transformation,
      outline: e.outline,
      solidFill: e.solidFill
    }),
    rl(e.children),
    Qo(e.bodyProperties)
  ]
}), Qt = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { uri: "uri" });
  }
}, wl = (e) => new oe({
  name: "asvg:svgBlip",
  attributes: {
    asvg: {
      key: "xmlns:asvg",
      value: "http://schemas.microsoft.com/office/drawing/2016/SVG/main"
    },
    embed: {
      key: "r:embed",
      value: `rId{${e.fileName}}`
    }
  }
}), gl = (e) => new oe({
  name: "a:ext",
  attributes: { uri: {
    key: "uri",
    value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
  } },
  children: [wl(e)]
}), yl = (e) => new oe({
  name: "a:extLst",
  children: [gl(e)]
}), bl = (e) => new oe({
  name: "a:blip",
  attributes: {
    embed: {
      key: "r:embed",
      value: `rId{${e.type === "svg" ? e.fallback.fileName : e.fileName}}`
    },
    cstate: {
      key: "cstate",
      value: "none"
    }
  },
  children: e.type === "svg" ? [yl(e)] : []
}), _l = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      left: "l",
      top: "t",
      right: "r",
      bottom: "b"
    });
  }
}, xl = class extends ae {
  constructor(e) {
    super("a:srcRect"), e && this.root.push(new _l({
      left: e.left === void 0 ? void 0 : Math.round(e.left * 1e3),
      top: e.top === void 0 ? void 0 : Math.round(e.top * 1e3),
      right: e.right === void 0 ? void 0 : Math.round(e.right * 1e3),
      bottom: e.bottom === void 0 ? void 0 : Math.round(e.bottom * 1e3)
    }));
  }
}, El = class extends ae {
  constructor() {
    super("a:fillRect");
  }
}, Tl = class extends ae {
  constructor() {
    super("a:stretch"), this.root.push(new El());
  }
}, Sl = class extends ae {
  constructor(e, t) {
    super("pic:blipFill"), this.root.push(bl(e)), this.root.push(new xl(t)), this.root.push(new Tl());
  }
}, Al = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
}, kl = class extends ae {
  constructor() {
    super("a:picLocks"), this.root.push(new Al({
      noChangeAspect: 1,
      noChangeArrowheads: 1
    }));
  }
}, Il = class extends ae {
  constructor() {
    super("pic:cNvPicPr"), this.root.push(new kl());
  }
}, pn = (e, t) => new oe({
  name: "a:hlinkClick",
  attributes: de(de({}, t ? { xmlns: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } } : {}), {}, { id: {
    key: "r:id",
    value: `rId${e}`
  } })
}), Rl = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
}, Cl = class extends ae {
  constructor() {
    super("pic:cNvPr"), this.root.push(new Rl({
      id: 0,
      name: "",
      descr: ""
    }));
  }
  prepForXml(e) {
    for (let t = e.stack.length - 1; t >= 0; t--) {
      const r = e.stack[t];
      if (r instanceof yr) {
        this.root.push(pn(r.linkId, !1));
        break;
      }
    }
    return super.prepForXml(e);
  }
}, Nl = class extends ae {
  constructor() {
    super("pic:nvPicPr"), this.root.push(new Cl()), this.root.push(new Il());
  }
}, Ol = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { xmlns: "xmlns:pic" });
  }
}, Rn = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: l }) {
    super("pic:pic"), this.root.push(new Ol({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture" })), this.root.push(new Nl()), this.root.push(new Sl(e, l)), this.root.push(new ji({
      element: "pic",
      transform: t,
      outline: r,
      solidFill: n
    }));
  }
}, Pl = (e) => {
  var t, r, n, l;
  return new oe({
    name: "a:xfrm",
    attributes: {
      flipVertical: {
        key: "flipV",
        value: (t = e.flip) === null || t === void 0 ? void 0 : t.vertical
      },
      flipHorizontal: {
        key: "flipH",
        value: (r = e.flip) === null || r === void 0 ? void 0 : r.horizontal
      },
      rotation: {
        key: "rot",
        value: e.rotation
      }
    },
    children: [
      new Mi((n = e.offset) === null || n === void 0 || (n = n.emus) === null || n === void 0 ? void 0 : n.x, (l = e.offset) === null || l === void 0 || (l = l.emus) === null || l === void 0 ? void 0 : l.y),
      new Bi(e.emus.x, e.emus.y),
      new oe({
        name: "a:chOff",
        attributes: {
          x: {
            key: "x",
            value: 0
          },
          y: {
            key: "y",
            value: 0
          }
        }
      }),
      new oe({
        name: "a:chExt",
        attributes: {
          x: {
            key: "cx",
            value: e.emus.x
          },
          y: {
            key: "cy",
            value: e.emus.y
          }
        }
      })
    ]
  });
}, Fl = () => new oe({ name: "wpg:cNvGrpSpPr" }), Dl = (e) => new oe({
  name: "wpg:wgp",
  children: [
    Fl(),
    new oe({
      name: "wpg:grpSpPr",
      children: [Pl(e.transformation)]
    }),
    ...e.children
  ]
}), Ll = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: l }) {
    if (super("a:graphicData"), e.type === "graphic")
      this.root.push(new Qt({ uri: e.uri })), this.root.push(e.content);
    else if (e.type === "wps") {
      this.root.push(new Qt({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
      const i = In(de(de({}, e.data), {}, {
        transformation: t,
        outline: r,
        solidFill: n
      }));
      this.root.push(i);
    } else if (e.type === "wpg") {
      this.root.push(new Qt({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" }));
      const i = Dl({
        children: e.children.map((u) => u.type === "wps" ? In(de(de({}, u.data), {}, {
          transformation: u.transformation,
          outline: u.outline,
          solidFill: u.solidFill
        })) : new Rn({
          mediaData: u,
          transform: u.transformation,
          outline: u.outline,
          solidFill: u.solidFill
        })),
        transformation: t
      });
      this.root.push(i);
    } else {
      this.root.push(new Qt({ uri: "http://schemas.openxmlformats.org/drawingml/2006/picture" }));
      const i = new Rn({
        mediaData: e,
        transform: t,
        outline: r,
        solidFill: n,
        crop: l
      });
      this.root.push(i);
    }
  }
}, Bl = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { a: "xmlns:a" });
  }
}, Wi = class extends ae {
  constructor({ mediaData: e, transform: t, outline: r, solidFill: n, crop: l }) {
    super("a:graphic"), J(this, "data", void 0), this.root.push(new Bl({ a: "http://schemas.openxmlformats.org/drawingml/2006/main" })), this.data = new Ll({
      mediaData: e,
      transform: t,
      outline: r,
      solidFill: n,
      crop: l
    }), this.root.push(this.data);
  }
}, Rt = {
  /** Text doesn't wrap around the drawing. It is drawn in front of or behind the text */
  NONE: 0,
  /** Text wraps around the drawing's box */
  SQUARE: 1,
  /** Text wraps closely around the drawing's outline */
  TIGHT: 2,
  /** Text sits above and below the drawing, not beside it */
  TOP_AND_BOTTOM: 3,
  /** Text wraps closely around the drawing's outline, and fills any open space inside it */
  THROUGH: 4
}, zi = {
  /** Text wraps on both sides of the drawing */
  BOTH_SIDES: "bothSides"
}, Cn = () => new oe({ name: "wp:wrapNone" }), Ml = (e, t = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new oe({
  name: "wp:wrapSquare",
  attributes: {
    wrapText: {
      key: "wrapText",
      value: e.side || zi.BOTH_SIDES
    },
    distT: {
      key: "distT",
      value: t.top
    },
    distB: {
      key: "distB",
      value: t.bottom
    },
    distL: {
      key: "distL",
      value: t.left
    },
    distR: {
      key: "distR",
      value: t.right
    }
  }
}), er = 21600, Ct = (e, { x: t, y: r }) => new oe({
  name: e,
  attributes: {
    x: {
      key: "x",
      value: t
    },
    y: {
      key: "y",
      value: r
    }
  }
}), Ul = () => new oe({
  name: "wp:wrapPolygon",
  attributes: { edited: {
    key: "edited",
    value: !1
  } },
  children: [
    Ct("wp:start", {
      x: 0,
      y: 0
    }),
    Ct("wp:lineTo", {
      x: 0,
      y: er
    }),
    Ct("wp:lineTo", {
      x: er,
      y: er
    }),
    Ct("wp:lineTo", {
      x: er,
      y: 0
    }),
    Ct("wp:lineTo", {
      x: 0,
      y: 0
    })
  ]
}), Hi = (e, t = {}, r) => {
  var n;
  return new oe({
    name: e,
    attributes: {
      wrapText: {
        key: "wrapText",
        value: (n = r?.side) !== null && n !== void 0 ? n : zi.BOTH_SIDES
      },
      distL: {
        key: "distL",
        value: t.left
      },
      distR: {
        key: "distR",
        value: t.right
      }
    },
    children: [Ul()]
  });
}, jl = (e, t) => Hi("wp:wrapTight", e, t), Wl = (e, t) => Hi("wp:wrapThrough", e, t), zl = (e = {
  top: 0,
  bottom: 0
}) => new oe({
  name: "wp:wrapTopAndBottom",
  attributes: {
    distT: {
      key: "distT",
      value: e.top
    },
    distB: {
      key: "distB",
      value: e.bottom
    }
  }
}), Gi = {
  /** Target is external to the package (e.g., hyperlink to a URL) */
  EXTERNAL: "External"
}, Hl = (e, t, r, n) => new oe({
  name: "Relationship",
  attributes: {
    id: {
      key: "Id",
      value: e
    },
    type: {
      key: "Type",
      value: t
    },
    target: {
      key: "Target",
      value: r
    },
    targetMode: {
      key: "TargetMode",
      value: n
    }
  }
}), Gl = "{C183D7F6-B498-43B3-948B-1728B52AA6E4}", Kl = (e) => new oe({
  name: "a:extLst",
  attributes: { namespace: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } },
  children: [new oe({
    name: "a:ext",
    attributes: { uri: {
      key: "uri",
      value: Gl
    } },
    children: [new oe({
      name: "adec:decorative",
      attributes: {
        namespace: {
          key: "xmlns:adec",
          value: "http://schemas.microsoft.com/office/drawing/2017/decorative"
        },
        value: {
          key: "val",
          value: 1
        }
      }
    })]
  })]
}), $l = class {
  constructor(e) {
    J(this, "link", void 0), J(this, "linkId", dn()), J(this, "addedTo", /* @__PURE__ */ new WeakSet()), this.link = e;
  }
  createClick(e) {
    return pn(this.linkId, e);
  }
  addRelationship(e) {
    const t = e.viewWrapper.Relationships;
    this.addedTo.has(t) || (this.addedTo.add(t), t.addRelationship(this.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", this.link, Gi.EXTERNAL));
  }
}, Ki = class extends ae {
  constructor({ name: e, description: t, title: r, id: n } = {
    name: "",
    description: "",
    title: ""
  }, { link: l, decorative: i } = {}) {
    super("wp:docPr"), J(this, "link", void 0), J(this, "decorative", void 0);
    const u = {
      id: {
        key: "id",
        value: n ?? Go()
      },
      name: {
        key: "name",
        value: e
      }
    };
    t != null && (u.description = {
      key: "descr",
      value: t
    }), r != null && (u.title = {
      key: "title",
      value: r
    }), this.root.push(new Xr(u)), this.link = l === void 0 ? void 0 : new $l(l), this.decorative = i;
  }
  prepForXml(e) {
    if (this.link)
      this.link.addRelationship(e), this.root.push(this.link.createClick(!0));
    else for (let r = e.stack.length - 1; r >= 0; r--) {
      const n = e.stack[r];
      if (n instanceof yr) {
        this.root.push(pn(n.linkId, !0));
        break;
      }
    }
    this.decorative && this.root.push(Kl());
    const t = super.prepForXml(e);
    return this.root.splice(1), t;
  }
}, $i = ({ top: e, right: t, bottom: r, left: n }) => new oe({
  name: "wp:effectExtent",
  attributes: {
    top: {
      key: "t",
      value: e
    },
    right: {
      key: "r",
      value: t
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
}), Vi = ({ x: e, y: t }) => new oe({
  name: "wp:extent",
  attributes: {
    x: {
      key: "cx",
      value: e
    },
    y: {
      key: "cy",
      value: t
    }
  }
}), Vl = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
}, ql = class extends ae {
  constructor() {
    super("a:graphicFrameLocks"), this.root.push(new Vl({
      xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
      noChangeAspect: 1
    }));
  }
}, qi = (e = !0) => new oe({
  name: "wp:cNvGraphicFramePr",
  children: e ? [new ql()] : []
}), Xl = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
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
}, Zl = class extends ae {
  constructor({ mediaData: e, transform: t, drawingOptions: r }) {
    var n;
    super("wp:anchor");
    const l = de({
      allowOverlap: !0,
      behindDocument: !1,
      lockAnchor: !1,
      layoutInCell: !0,
      verticalPosition: {},
      horizontalPosition: {}
    }, r.floating);
    if (this.root.push(new Xl({
      distT: l.margins && l.margins.top || 0,
      distB: l.margins && l.margins.bottom || 0,
      distL: l.margins && l.margins.left || 0,
      distR: l.margins && l.margins.right || 0,
      simplePos: "0",
      allowOverlap: l.allowOverlap === !0 ? "1" : "0",
      behindDoc: l.behindDocument === !0 ? "1" : "0",
      locked: l.lockAnchor === !0 ? "1" : "0",
      layoutInCell: l.layoutInCell === !0 ? "1" : "0",
      relativeHeight: l.zIndex ? l.zIndex : t.emus.y
    })), this.root.push(Zo()), this.root.push(Yo(l.horizontalPosition)), this.root.push(Jo(l.verticalPosition)), this.root.push(Vi({
      x: t.emus.x,
      y: t.emus.y
    })), this.root.push($i((n = r.effectExtent) !== null && n !== void 0 ? n : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })), r.floating !== void 0 && r.floating.wrap !== void 0) switch (r.floating.wrap.type) {
      case Rt.SQUARE:
        this.root.push(Ml(r.floating.wrap, r.floating.margins));
        break;
      case Rt.TIGHT:
        this.root.push(jl(r.floating.margins, r.floating.wrap));
        break;
      case Rt.THROUGH:
        this.root.push(Wl(r.floating.margins, r.floating.wrap));
        break;
      case Rt.TOP_AND_BOTTOM:
        this.root.push(zl(r.floating.margins));
        break;
      case Rt.NONE:
      default:
        this.root.push(Cn());
    }
    else this.root.push(Cn());
    this.root.push(new Ki(r.docProperties, {
      link: r.link,
      decorative: r.decorative
    })), this.root.push(qi(e.type !== "graphic" || e.lockAspectRatio !== !1)), this.root.push(new Wi({
      mediaData: e,
      transform: t,
      outline: r.outline,
      solidFill: r.solidFill,
      crop: r.crop
    }));
  }
}, Yl = ({ mediaData: e, transform: t, docProperties: r, outline: n, solidFill: l, crop: i, effectExtent: u, link: s, decorative: c }) => {
  var y, b, v, I;
  return new oe({
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
      Vi({
        x: t.emus.x,
        y: t.emus.y
      }),
      $i(u ?? (n ? {
        top: ((y = n.width) !== null && y !== void 0 ? y : 9525) * 2,
        right: ((b = n.width) !== null && b !== void 0 ? b : 9525) * 2,
        bottom: ((v = n.width) !== null && v !== void 0 ? v : 9525) * 2,
        left: ((I = n.width) !== null && I !== void 0 ? I : 9525) * 2
      } : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      })),
      new Ki(r, {
        link: s,
        decorative: c
      }),
      qi(e.type !== "graphic" || e.lockAspectRatio !== !1),
      new Wi({
        mediaData: e,
        transform: t,
        outline: n,
        solidFill: l,
        crop: i
      })
    ]
  });
}, Jl = class extends ae {
  constructor(e, t = {}) {
    super("w:drawing"), t.floating ? this.root.push(new Zl({
      mediaData: e,
      transform: e.transformation,
      drawingOptions: t
    })) : this.root.push(Yl({
      mediaData: e,
      transform: e.transformation,
      docProperties: t.docProperties,
      outline: t.outline,
      solidFill: t.solidFill,
      crop: t.crop,
      effectExtent: t.effectExtent,
      link: t.link,
      decorative: t.decorative
    }));
  }
}, Ql = (e) => {
  const t = e.indexOf(";base64,"), r = t === -1 ? 0 : t + 8;
  return new Uint8Array(atob(e.substring(r)).split("").map((n) => n.charCodeAt(0)));
}, eu = (e) => typeof e == "string" ? Ql(e) : e, Ar = (e, t) => ({
  data: eu(e.data),
  fileName: t,
  transformation: {
    pixels: {
      x: Math.round(e.transformation.width),
      y: Math.round(e.transformation.height)
    },
    emus: {
      x: Math.round(e.transformation.width * 9525),
      y: Math.round(e.transformation.height * 9525)
    },
    flip: e.transformation.flip,
    rotation: e.transformation.rotation ? e.transformation.rotation * 6e4 : void 0
  }
}), tu = ({ id: e, author: t, date: r }, n) => new oe({
  name: "w:del",
  attributes: {
    id: {
      key: "w:id",
      value: e
    },
    author: {
      key: "w:author",
      value: t
    },
    date: {
      key: "w:date",
      value: r
    }
  },
  children: [n]
}), ru = class extends ae {
  constructor(e) {
    var t, r = (...c) => (super(...c), J(this, "imageData", void 0), this);
    const n = `${kn(e.data)}.${e.type}`, l = e.type === "svg" ? de(de({ type: e.type }, Ar(e, n)), {}, { fallback: de({ type: e.fallback.type }, Ar(de(de({}, e.fallback), {}, { transformation: e.transformation }), `${kn(e.fallback.data)}.${e.fallback.type}`)) }) : de({ type: e.type }, Ar(e, n)), i = new Jl(l, {
      floating: e.floating,
      docProperties: e.altText,
      outline: e.outline,
      solidFill: e.solidFill,
      crop: e.crop,
      link: e.link,
      decorative: e.decorative
    }), u = new it(e.run), s = (t = e.insertion) !== null && t !== void 0 ? t : e.deletion;
    if (s) {
      r(e.insertion ? "w:ins" : "w:del"), this.root.push(new Pe({
        id: s.id,
        author: s.author,
        date: s.date
      }));
      const c = new oe({
        name: "w:r",
        children: [u, i]
      });
      this.addChildElement(e.insertion && e.deletion ? tu(e.deletion, c) : c);
    } else
      r("w:r"), this.root.push(u), this.root.push(i);
    this.imageData = l;
  }
  prepForXml(e) {
    return e.file.Media.addImage(this.imageData.fileName, this.imageData), this.imageData.type === "svg" && e.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback), super.prepForXml(e);
  }
}, nu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, Ke = class extends ae {
  constructor() {
    super("Relationships"), this.root.push(new nu({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  /**
  * Creates a new relationship to another part in the package.
  *
  * @param id - Unique identifier for this relationship (will be prefixed with "rId")
  * @param type - Relationship type URI (e.g., image, header, hyperlink)
  * @param target - Path to the target part
  * @param targetMode - Optional mode indicating if target is external
  */
  addRelationship(e, t, r, n) {
    this.root.push(Hl(`rId${e}`, t, r, n));
  }
  /**
  * Gets the count of relationships in this collection.
  * Excludes the attributes element from the count.
  */
  get RelationshipCount() {
    return this.root.length - 1;
  }
}, iu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "w:id",
      initials: "w:initials",
      author: "w:author",
      date: "w:date"
    });
  }
}, au = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
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
      "xmlns:wps": "xmlns:wps",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, Nn = class extends ae {
  constructor({ id: e, initials: t, author: r, date: n = /* @__PURE__ */ new Date(), children: l }, i) {
    super("w:comment"), J(this, "paraId", void 0), this.paraId = i, this.root.push(new iu({
      id: e,
      initials: t,
      author: r,
      date: n.toISOString()
    }));
    for (const u of l) this.root.push(u);
  }
  /**
  * Serializes this comment to XML, injecting w14:paraId and w14:textId into the last
  * paragraph when threading is active. These attributes link the comment to its
  * corresponding w15:commentEx entry in commentsExtended.xml.
  */
  prepForXml(e) {
    const t = super.prepForXml(e);
    if (!t || !this.paraId) return t;
    const r = t["w:comment"];
    if (!Array.isArray(r)) return t;
    for (let n = r.length - 1; n >= 0; n--) {
      const l = r[n];
      if (l && typeof l == "object" && "w:p" in l) {
        const i = l["w:p"];
        Array.isArray(i) && i.unshift({ _attr: {
          "w14:paraId": this.paraId,
          "w14:textId": this.paraId
        } });
        break;
      }
    }
    return t;
  }
}, su = (e) => (e + 1).toString(16).toUpperCase().padStart(8, "0"), ou = class extends ae {
  constructor({ children: e }) {
    super("w:comments"), J(this, "relationships", void 0), J(this, "threadData", void 0), J(this, "commentIdsData", void 0), J(this, "isEmpty", void 0), this.isEmpty = e.length === 0, this.root.push(new au({
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
      "xmlns:wps": "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
      "mc:Ignorable": "w14 w15 wp14"
    }));
    const t = e.some((n) => n.parentId !== void 0), r = e.some((n) => n.durableId !== void 0);
    if (t || r) {
      const n = new Map(e.map((l) => [l.id, su(l.id)]));
      for (const l of e) this.root.push(new Nn(l, n.get(l.id)));
      t && (this.threadData = e.map((l) => ({
        paraId: n.get(l.id),
        parentParaId: l.parentId !== void 0 ? n.get(l.parentId) : void 0,
        done: l.resolved
      }))), r && (this.commentIdsData = e.map((l) => {
        var i;
        return {
          paraId: n.get(l.id),
          durableId: (i = l.durableId) !== null && i !== void 0 ? i : n.get(l.id)
        };
      }));
    } else for (const n of e) this.root.push(new Nn(n));
    this.relationships = new Ke();
  }
  get Relationships() {
    return this.relationships;
  }
  /** Thread data for commentsExtended.xml, or undefined when no comments use parentId. */
  get ThreadData() {
    return this.threadData;
  }
  /** Comment id data for commentsIds.xml, or undefined when no comments carry a durableId. */
  get CommentIdsData() {
    return this.commentIdsData;
  }
  /** Whether there are no comments, in which case the document has no comments.xml part. */
  get IsEmpty() {
    return this.isEmpty;
  }
}, lu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      "xmlns:wpc": "xmlns:wpc",
      "xmlns:mc": "xmlns:mc",
      "xmlns:w15": "xmlns:w15",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, uu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      paraId: "w15:paraId",
      paraIdParent: "w15:paraIdParent",
      done: "w15:done"
    });
  }
}, cu = class extends ae {
  constructor(e) {
    super("w15:commentEx"), this.root.push(new uu({
      paraId: e.paraId,
      paraIdParent: e.parentParaId,
      done: e.done !== void 0 ? e.done ? "1" : "0" : void 0
    }));
  }
}, hu = class extends ae {
  constructor(e) {
    super("w15:commentsEx"), this.root.push(new lu({
      "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "mc:Ignorable": "w15"
    }));
    for (const t of e) this.root.push(new cu(t));
  }
}, fu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      paraId: "w16cid:paraId",
      durableId: "w16cid:durableId"
    });
  }
}, du = class extends ae {
  constructor(e) {
    super("w16cid:commentId"), this.root.push(new fu({
      paraId: e.paraId,
      durableId: e.durableId
    }));
  }
}, pu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      "xmlns:w16cid": "xmlns:w16cid",
      "xmlns:mc": "xmlns:mc",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
}, mu = class extends ae {
  constructor(e) {
    super("w16cid:commentsIds"), this.root.push(new pu({
      "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "mc:Ignorable": "w16cid"
    }));
    for (const t of e) this.root.push(new du(t));
  }
}, vu = class extends Ti {
  constructor() {
    super("w:endnoteRef");
  }
}, Xi = class extends Ti {
  constructor() {
    super("w:tab");
  }
}, ir = {
  /** Left-aligned tab */
  LEFT: "left",
  /** Center-aligned tab */
  CENTER: "center",
  /** Right-aligned tab */
  RIGHT: "right"
}, Kr = {
  /** Position relative to margin */
  MARGIN: "margin",
  /** Position relative to indent */
  INDENT: "indent"
}, ot = {
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
}, wu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      alignment: "w:alignment",
      relativeTo: "w:relativeTo",
      leader: "w:leader"
    });
  }
}, gu = class extends ae {
  constructor(e) {
    super("w:ptab"), this.root.push(new wu({
      alignment: e.alignment,
      relativeTo: e.relativeTo,
      leader: e.leader
    }));
  }
}, yu = class extends ae {
  constructor() {
    super("w:pageBreakBefore");
  }
}, bt = {
  /** Line spacing is automatically determined based on content */
  AUTO: "auto"
}, bu = ({ after: e, before: t, line: r, lineRule: n, beforeAutoSpacing: l, afterAutoSpacing: i }) => new oe({
  name: "w:spacing",
  attributes: {
    after: {
      key: "w:after",
      value: e
    },
    before: {
      key: "w:before",
      value: t
    },
    line: {
      key: "w:line",
      value: r
    },
    lineRule: {
      key: "w:lineRule",
      value: n
    },
    beforeAutoSpacing: {
      key: "w:beforeAutospacing",
      value: l
    },
    afterAutoSpacing: {
      key: "w:afterAutospacing",
      value: i
    }
  }
}), dt = {
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
}, Mt = (e) => new oe({
  name: "w:pStyle",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), Fe = {
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
}, Nt = {
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
}, _u = ({ type: e, position: t, leader: r }) => new oe({
  name: "w:tab",
  attributes: {
    val: {
      key: "w:val",
      value: e
    },
    pos: {
      key: "w:pos",
      value: He(t)
    },
    leader: {
      key: "w:leader",
      value: r
    }
  }
}), xu = (e) => new oe({
  name: "w:tabs",
  children: e.map((t) => _u(t))
}), kr = class extends ae {
  constructor(e, t) {
    super("w:numPr"), this.root.push(new Eu(t)), this.root.push(new Tu(e));
  }
}, Eu = class extends ae {
  constructor(e) {
    if (super("w:ilvl"), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Oe({ val: e }));
  }
}, Tu = class extends ae {
  constructor(e) {
    super("w:numId"), this.root.push(new Oe({ val: typeof e == "string" ? `{${e}}` : e }));
  }
}, mn = class extends ae {
  constructor(...e) {
    super(...e), J(
      this,
      /** Marker property identifying this as a FileChild */
      "fileChild",
      /* @__PURE__ */ Symbol()
    );
  }
}, Su = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
}, yr = class extends ae {
  constructor(e, t, r) {
    super("w:hyperlink"), J(this, "linkId", void 0), this.linkId = t;
    const n = new Su({
      history: 1,
      anchor: r || void 0,
      id: r ? void 0 : `rId${this.linkId}`
    });
    this.root.push(n), e.forEach((l) => {
      this.root.push(l);
    });
  }
}, Zi = class extends yr {
  constructor(e) {
    super(e.children, dn(), e.anchor);
  }
}, Yi = class extends ae {
  constructor(e) {
    super("w:externalHyperlink"), J(this, "options", void 0), this.options = e;
  }
}, Au = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
}, ku = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { id: "w:id" });
  }
}, Ji = class {
  constructor(e) {
    J(this, "start", void 0), J(this, "children", void 0), J(this, "end", void 0);
    const t = $o();
    this.start = new Iu(e.id, t), this.children = e.children, this.end = new Ru(t);
  }
}, Iu = class extends ae {
  constructor(e, t) {
    super("w:bookmarkStart");
    const r = new Au({
      name: e,
      id: t
    });
    this.root.push(r);
  }
}, Ru = class extends ae {
  constructor(e) {
    super("w:bookmarkEnd");
    const t = new ku({ id: e });
    this.root.push(t);
  }
}, Cu = (e) => new oe({
  name: "w:outlineLvl",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), tr = ({ id: e, fontKey: t, subsetted: r }, n) => new oe({
  name: n,
  attributes: de({ id: {
    key: "r:id",
    value: e
  } }, t ? { fontKey: {
    key: "w:fontKey",
    value: `{${t.toUpperCase()}}`
  } } : {}),
  children: [...r ? [new ce("w:subsetted", r)] : []]
}), Nu = ({ name: e, altName: t, panose1: r, charset: n, family: l, notTrueType: i, pitch: u, sig: s, embedRegular: c, embedBold: y, embedItalic: b, embedBoldItalic: v }) => new oe({
  name: "w:font",
  attributes: { name: {
    key: "w:name",
    value: e
  } },
  children: [
    ...t ? [kt("w:altName", t)] : [],
    ...r ? [kt("w:panose1", r)] : [],
    ...n ? [kt("w:charset", n)] : [],
    kt("w:family", l),
    ...i ? [new ce("w:notTrueType", i)] : [],
    kt("w:pitch", u),
    ...s ? [new oe({
      name: "w:sig",
      attributes: {
        usb0: {
          key: "w:usb0",
          value: s.usb0
        },
        usb1: {
          key: "w:usb1",
          value: s.usb1
        },
        usb2: {
          key: "w:usb2",
          value: s.usb2
        },
        usb3: {
          key: "w:usb3",
          value: s.usb3
        },
        csb0: {
          key: "w:csb0",
          value: s.csb0
        },
        csb1: {
          key: "w:csb1",
          value: s.csb1
        }
      }
    })] : [],
    ...c ? [tr(c, "w:embedRegular")] : [],
    ...y ? [tr(y, "w:embedBold")] : [],
    ...b ? [tr(b, "w:embedItalic")] : [],
    ...v ? [tr(v, "w:embedBoldItalic")] : []
  ]
}), Ou = ({ name: e, index: t, fontKey: r, characterSet: n }) => Nu({
  name: e,
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
    id: `rId${t}`
  }
}), Pu = (e) => new oe({
  name: "w:fonts",
  attributes: {
    mc: {
      key: "xmlns:mc",
      value: "http://schemas.openxmlformats.org/markup-compatibility/2006"
    },
    r: {
      key: "xmlns:r",
      value: "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    },
    w: {
      key: "xmlns:w",
      value: "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
    },
    w14: {
      key: "xmlns:w14",
      value: "http://schemas.microsoft.com/office/word/2010/wordml"
    },
    w15: {
      key: "xmlns:w15",
      value: "http://schemas.microsoft.com/office/word/2012/wordml"
    },
    w16cex: {
      key: "xmlns:w16cex",
      value: "http://schemas.microsoft.com/office/word/2018/wordml/cex"
    },
    w16cid: {
      key: "xmlns:w16cid",
      value: "http://schemas.microsoft.com/office/word/2016/wordml/cid"
    },
    w16: {
      key: "xmlns:w16",
      value: "http://schemas.microsoft.com/office/word/2018/wordml"
    },
    w16sdtdh: {
      key: "xmlns:w16sdtdh",
      value: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash"
    },
    w16se: {
      key: "xmlns:w16se",
      value: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
    },
    Ignorable: {
      key: "mc:Ignorable",
      value: "w14 w15 w16se w16cid w16 w16cex w16sdtdh"
    }
  },
  children: e.map((t, r) => Ou({
    name: t.name,
    index: r + 1,
    fontKey: t.fontKey,
    characterSet: t.characterSet
  }))
}), Qi = class {
  constructor(e) {
    J(this, "options", void 0), J(this, "fontTable", void 0), J(this, "relationships", void 0), J(this, "fontOptionsWithKey", []), this.options = e, this.fontOptionsWithKey = e.map((t) => de(de({}, t), {}, { fontKey: Vo() })), this.fontTable = Pu(this.fontOptionsWithKey), this.relationships = new Ke();
    for (let t = 0; t < e.length; t++) this.relationships.addRelationship(t + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/font${t + 1}.odttf`);
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
}, Fu = () => new oe({
  name: "w:wordWrap",
  attributes: { val: {
    key: "w:val",
    value: 0
  } }
}), Du = (e) => {
  var t, r;
  return new oe({
    name: "w:framePr",
    attributes: {
      anchorLock: {
        key: "w:anchorLock",
        value: e.anchorLock
      },
      dropCap: {
        key: "w:dropCap",
        value: e.dropCap
      },
      width: {
        key: "w:w",
        value: e.width
      },
      height: {
        key: "w:h",
        value: e.height
      },
      x: {
        key: "w:x",
        value: e.position ? e.position.x : void 0
      },
      y: {
        key: "w:y",
        value: e.position ? e.position.y : void 0
      },
      anchorHorizontal: {
        key: "w:hAnchor",
        value: e.anchor.horizontal
      },
      anchorVertical: {
        key: "w:vAnchor",
        value: e.anchor.vertical
      },
      spaceHorizontal: {
        key: "w:hSpace",
        value: (t = e.space) === null || t === void 0 ? void 0 : t.horizontal
      },
      spaceVertical: {
        key: "w:vSpace",
        value: (r = e.space) === null || r === void 0 ? void 0 : r.vertical
      },
      rule: {
        key: "w:hRule",
        value: e.rule
      },
      alignmentX: {
        key: "w:xAlign",
        value: e.alignment ? e.alignment.x : void 0
      },
      alignmentY: {
        key: "w:yAlign",
        value: e.alignment ? e.alignment.y : void 0
      },
      lines: {
        key: "w:lines",
        value: e.lines
      },
      wrap: {
        key: "w:wrap",
        value: e.wrap
      }
    }
  });
}, ft = class extends tt {
  /**
  * Creates paragraph properties.
  *
  * @param options - The paragraph formatting to emit
  * @param config - Controls how the element is assembled; see {@link IParagraphPropertiesConfig}
  */
  constructor(e, { implicitListParagraphStyle: t = !0 } = {}) {
    if (super("w:pPr", e?.includeIfEmpty), J(this, "numberingReferences", []), !e) return this;
    if (e.heading && this.push(Mt(e.heading)), t && (e.bullet && this.push(Mt("ListParagraph")), e.numbering && !e.numbering.custom && !e.style && !e.heading && this.push(Mt("ListParagraph"))), e.style && this.push(Mt(e.style)), e.keepNext !== void 0 && this.push(new ce("w:keepNext", e.keepNext)), e.keepLines !== void 0 && this.push(new ce("w:keepLines", e.keepLines)), e.pageBreakBefore && this.push(new yu()), e.frame && this.push(Du(e.frame)), e.widowControl !== void 0 && this.push(new ce("w:widowControl", e.widowControl)), e.bullet && this.push(new kr(1, e.bullet.level)), e.numbering) {
      var r, n;
      this.numberingReferences.push({
        reference: e.numbering.reference,
        instance: (r = e.numbering.instance) !== null && r !== void 0 ? r : 0
      }), this.push(new kr(`${e.numbering.reference}-${(n = e.numbering.instance) !== null && n !== void 0 ? n : 0}`, e.numbering.level));
    } else e.numbering === !1 && this.push(new kr(0, 0));
    e.border && this.push(new lo(e.border)), e.thematicBreak && this.push(new uo()), e.shading && this.push(wr(e.shading)), e.wordWrap && this.push(Fu()), e.overflowPunctuation && this.push(new ce("w:overflowPunct", e.overflowPunctuation));
    const l = [
      ...e.rightTabStop !== void 0 ? [{
        type: Fe.RIGHT,
        position: e.rightTabStop
      }] : [],
      ...e.tabStops ? e.tabStops : [],
      ...e.leftTabStop !== void 0 ? [{
        type: Fe.LEFT,
        position: e.leftTabStop
      }] : []
    ];
    l.length > 0 && this.push(xu(l)), e.bidirectional !== void 0 && this.push(new ce("w:bidi", e.bidirectional)), e.spacing && this.push(bu(e.spacing)), e.indent && this.push(co(e.indent)), e.contextualSpacing !== void 0 && this.push(new ce("w:contextualSpacing", e.contextualSpacing)), e.alignment && this.push(Si(e.alignment)), e.outlineLevel !== void 0 && this.push(Cu(e.outlineLevel)), e.suppressLineNumbers !== void 0 && this.push(new ce("w:suppressLineNumbers", e.suppressLineNumbers)), e.autoSpaceEastAsianText !== void 0 && this.push(new ce("w:autoSpaceDN", e.autoSpaceEastAsianText)), e.run && this.push(new Ro(e.run)), e.revision && this.push(new Lu(e.revision));
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
    if (!(e.viewWrapper instanceof Qi)) for (const t of this.numberingReferences) e.file.Numbering.createConcreteNumberingInstance(t.reference, t.instance);
    return super.prepForXml(e);
  }
}, Lu = class extends ae {
  constructor(e) {
    super("w:pPrChange"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new ft(de(de({}, e), {}, { includeIfEmpty: !0 })));
  }
}, Te = class extends mn {
  constructor(e) {
    if (super("w:p"), J(this, "properties", void 0), typeof e == "string")
      return this.properties = new ft({}), this.root.push(this.properties), this.root.push(new Ce(e)), this;
    if (this.properties = new ft(e), this.root.push(this.properties), e.text && this.root.push(new Ce(e.text)), e.children) for (const t of e.children) {
      if (t instanceof Ji) {
        this.root.push(t.start);
        for (const r of t.children) this.root.push(r);
        this.root.push(t.end);
        continue;
      }
      this.root.push(t);
    }
  }
  prepForXml(e) {
    for (const t of this.root) if (t instanceof Yi) {
      const r = this.root.indexOf(t), n = new yr(t.options.children, dn());
      e.viewWrapper.Relationships.addRelationship(n.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", t.options.link, Gi.EXTERNAL), this.root[r] = n;
    }
    return super.prepForXml(e);
  }
  addRunToFront(e) {
    return this.root.splice(1, 0, e), this;
  }
};
function Bu(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.includes(n)) continue;
    r[n] = e[n];
  }
  return r;
}
function ea(e, t) {
  if (e == null) return {};
  var r, n, l = Bu(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (l[r] = e[r]);
  }
  return l;
}
var Mu = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
}, Uu = de(de({}, Mu), {}, { BOTH: "both" }), Ut = Uu, ta = (e) => new oe({
  name: "w:vAlign",
  attributes: { verticalAlign: {
    key: "w:val",
    value: e
  } }
}), ju = ({ space: e, count: t, separate: r, equalWidth: n, children: l }) => new oe({
  name: "w:cols",
  attributes: {
    space: {
      key: "w:space",
      value: e === void 0 ? void 0 : ke(e)
    },
    count: {
      key: "w:num",
      value: t === void 0 ? void 0 : Ie(t)
    },
    separate: {
      key: "w:sep",
      value: r
    },
    equalWidth: {
      key: "w:equalWidth",
      value: n
    }
  },
  children: !n && l ? l : void 0
}), Wu = ({ type: e, linePitch: t, charSpace: r }) => new oe({
  name: "w:docGrid",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    linePitch: {
      key: "w:linePitch",
      value: Ie(t)
    },
    charSpace: {
      key: "w:charSpace",
      value: r ? Ie(r) : void 0
    }
  }
}), gt = {
  /** Specifies that this header or footer shall appear on every page in this section which is not overridden with a specific `even` or `first` page header/footer. In a section with all three types specified, this type shall be used on all odd numbered pages (counting from the `first` page in the section, not the section numbering). */
  DEFAULT: "default",
  /** Specifies that this header or footer shall appear on the first page in this section. The appearance of this header or footer is contingent on the setting of the `titlePg` element (§2.10.6). */
  FIRST: "first",
  /** Specifies that this header or footer shall appear on all even numbered pages in this section (counting from the first page in the section, not the section numbering). The appearance of this header or footer is contingent on the setting of the `evenAndOddHeaders` element (§2.10.1). */
  EVEN: "even"
}, On = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
}, Ir = (e, t) => new oe({
  name: e,
  attributes: {
    type: {
      key: "w:type",
      value: t.type || gt.DEFAULT
    },
    id: {
      key: "r:id",
      value: `rId${t.id}`
    }
  }
}), zu = ({ countBy: e, start: t, restart: r, distance: n }) => new oe({
  name: "w:lnNumType",
  attributes: {
    countBy: {
      key: "w:countBy",
      value: e === void 0 ? void 0 : Ie(e)
    },
    start: {
      key: "w:start",
      value: t === void 0 ? void 0 : Ie(t)
    },
    restart: {
      key: "w:restart",
      value: r
    },
    distance: {
      key: "w:distance",
      value: n === void 0 ? void 0 : ke(n)
    }
  }
}), Pn = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
}, Hu = class extends tt {
  constructor(e) {
    if (super("w:pgBorders"), !e) return this;
    e.pageBorders ? this.root.push(new Pn({
      display: e.pageBorders.display,
      offsetFrom: e.pageBorders.offsetFrom,
      zOrder: e.pageBorders.zOrder
    })) : this.root.push(new Pn({})), e.pageBorderTop && this.root.push(be("w:top", e.pageBorderTop)), e.pageBorderLeft && this.root.push(be("w:left", e.pageBorderLeft)), e.pageBorderBottom && this.root.push(be("w:bottom", e.pageBorderBottom)), e.pageBorderRight && this.root.push(be("w:right", e.pageBorderRight));
  }
}, Gu = (e, t, r, n, l, i, u) => new oe({
  name: "w:pgMar",
  attributes: {
    top: {
      key: "w:top",
      value: He(e)
    },
    right: {
      key: "w:right",
      value: ke(t)
    },
    bottom: {
      key: "w:bottom",
      value: He(r)
    },
    left: {
      key: "w:left",
      value: ke(n)
    },
    header: {
      key: "w:header",
      value: ke(l)
    },
    footer: {
      key: "w:footer",
      value: ke(i)
    },
    gutter: {
      key: "w:gutter",
      value: ke(u)
    }
  }
}), Ku = ({ start: e, formatType: t, separator: r }) => new oe({
  name: "w:pgNumType",
  attributes: {
    start: {
      key: "w:start",
      value: e === void 0 ? void 0 : Ie(e)
    },
    formatType: {
      key: "w:fmt",
      value: t
    },
    separator: {
      key: "w:chapSep",
      value: r
    }
  }
}), cr = {
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
}, $u = ({ width: e, height: t, orientation: r, code: n }) => {
  const l = ke(e), i = ke(t);
  return new oe({
    name: "w:pgSz",
    attributes: {
      width: {
        key: "w:w",
        value: r === cr.LANDSCAPE ? i : l
      },
      height: {
        key: "w:h",
        value: r === cr.LANDSCAPE ? l : i
      },
      orientation: {
        key: "w:orient",
        value: r
      },
      code: {
        key: "w:code",
        value: n
      }
    }
  });
}, Vu = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, qu = class extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(new Vu({ val: e }));
  }
}, Xu = {
  /** Section begins immediately following the previous section */
  CONTINUOUS: "continuous"
}, Zu = (e) => new oe({
  name: "w:type",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), We = {
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
}, ar = {
  /** Page width: 11906 twips (8.27 inches, 210mm) */
  WIDTH: 11906,
  /** Page height: 16838 twips (11.69 inches, 297mm) */
  HEIGHT: 16838,
  /** Page orientation: portrait */
  ORIENTATION: cr.PORTRAIT
}, $r = class ra extends ae {
  constructor({ page: { size: { width: t = ar.WIDTH, height: r = ar.HEIGHT, orientation: n = ar.ORIENTATION, code: l } = {}, margin: { top: i = We.TOP, right: u = We.RIGHT, bottom: s = We.BOTTOM, left: c = We.LEFT, header: y = We.HEADER, footer: b = We.FOOTER, gutter: v = We.GUTTER } = {}, pageNumbers: I = {}, borders: m, textDirection: w } = {}, grid: { linePitch: g = 360, charSpace: E, type: R } = {}, headerWrapperGroup: x = {}, footerWrapperGroup: _ = {}, lineNumbers: T, titlePage: S, verticalAlign: p, column: P, type: M, revision: C } = {}) {
    super("w:sectPr"), J(
      this,
      /**
      * Width, in twips, available to block-level content in this section.
      *
      * This is the page width (accounting for orientation) minus the left and right
      * margins and the gutter. When the section is laid out in several columns, it is
      * the width of a single column. Percentage table widths are resolved against it.
      */
      "availableTextWidth",
      void 0
    ), this.availableTextWidth = ra.calculateAvailableTextWidth({
      pageWidth: n === cr.LANDSCAPE ? r : t,
      left: c,
      right: u,
      gutter: v,
      column: P
    }), this.addHeaderFooterGroup(On.HEADER, x), this.addHeaderFooterGroup(On.FOOTER, _), M && this.root.push(Zu(M)), this.root.push($u({
      width: t,
      height: r,
      orientation: n,
      code: l
    })), this.root.push(Gu(i, u, s, c, y, b, v)), m && this.root.push(new Hu(m)), T && this.root.push(zu(T)), this.root.push(Ku(I)), P && this.root.push(ju(P)), p && this.root.push(ta(p)), S !== void 0 && this.root.push(new ce("w:titlePg", S)), w && this.root.push(new qu(w)), this.root.push(Wu({
      linePitch: g,
      charSpace: E,
      type: R
    })), C && this.root.push(new Yu(C));
  }
  /**
  * Width, in twips, available to block-level content (paragraphs and tables) in this section.
  *
  * Page width minus the left and right margins and the gutter, divided among the
  * section's columns when there is more than one. Tables use this to resolve
  * percentage widths into the absolute twip grid that Google Docs, Apple Pages and
  * other consumers lay tables out from.
  *
  * @example
  * ```typescript
  * // A4 portrait with 1 inch margins
  * new SectionProperties().AvailableTextWidth; // 11906 - 1440 - 1440 = 9026
  * ```
  */
  get AvailableTextWidth() {
    return this.availableTextWidth;
  }
  static calculateAvailableTextWidth({ pageWidth: t, left: r, right: n, gutter: l, column: i }) {
    var u, s;
    const c = vt(t) - vt(r) - vt(n) - vt(l), y = (u = i?.count) !== null && u !== void 0 ? u : 1;
    return y <= 1 ? c : (c - vt((s = i?.space) !== null && s !== void 0 ? s : 720) * (y - 1)) / y;
  }
  addHeaderFooterGroup(t, r) {
    r.default && this.root.push(Ir(t, {
      type: gt.DEFAULT,
      id: r.default.View.ReferenceId
    })), r.first && this.root.push(Ir(t, {
      type: gt.FIRST,
      id: r.first.View.ReferenceId
    })), r.even && this.root.push(Ir(t, {
      type: gt.EVEN,
      id: r.even.View.ReferenceId
    }));
  }
}, Yu = class extends ae {
  constructor(e) {
    super("w:sectPrChange"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new $r(e));
  }
}, na = class extends ae {
  constructor() {
    super("w:body"), J(this, "sections", []), J(
      this,
      /**
      * Section properties that were moved into a paragraph at the end of their section
      * by {@link addSection}, keyed by that paragraph. Used to find the section that
      * governs a given child of the body.
      */
      "sectionParagraphs",
      /* @__PURE__ */ new Map()
    );
  }
  /**
  * Finds the section properties that govern a top-level child of the body.
  *
  * A section's properties are stored after its content (either in the closing
  * paragraph of the section or, for the last section, at the end of the body), so
  * the governing section is the first one found at or after the child. When no
  * child is given (or it is not a direct child of the body), the first section is
  * returned.
  *
  * @param child - A direct child of the body (paragraph, table, etc.)
  * @returns The governing section properties, or undefined if the body has no sections
  */
  getSectionPropertiesFor(e) {
    const t = e ? this.root.indexOf(e) + 1 : 0;
    for (let r = t; r < this.root.length; r++) {
      const n = this.root[r];
      if (n instanceof $r) return n;
      const l = this.sectionParagraphs.get(n);
      if (l) return l;
    }
    return this.sections[this.sections.length - 1];
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
    const t = this.sections.pop(), r = this.createSectionParagraph(t);
    this.root.push(r), t && this.sectionParagraphs.set(r, t), this.sections.push(new $r(e));
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
    const t = new Te({}), r = new ft({});
    return r.push(e), t.addChildElement(r), t;
  }
}, Ne = {
  /** Auto. */
  AUTO: "auto",
  /** Value is in twentieths of a point */
  DXA: "dxa",
  /** No (empty) value. */
  NIL: "nil",
  /** Value is in percentage. */
  PERCENTAGE: "pct"
}, hr = (e, { type: t = Ne.AUTO, size: r }) => {
  let n = r;
  return t === Ne.PERCENTAGE && typeof r == "number" && (n = Math.round(r * 50)), new oe({
    name: e,
    attributes: {
      type: {
        key: "w:type",
        value: t
      },
      size: {
        key: "w:w",
        value: Ei(n)
      }
    }
  });
}, Fn = ar.WIDTH - We.LEFT - We.RIGHT - We.GUTTER, ia = (e) => e.options.columnSpan || 1, aa = (e, t) => {
  if (!e) return;
  const { type: r = Ne.AUTO, size: n } = e;
  if (r !== Ne.PERCENTAGE && r !== Ne.DXA) return;
  const l = typeof n == "number" ? r === Ne.PERCENTAGE ? n / 100 * t : n : n.endsWith("%") ? Number(n.slice(0, -1)) / 100 * t : vt(n);
  return l > 0 ? l : void 0;
}, Ju = (e, t) => {
  var r;
  return (r = aa(e, t)) !== null && r !== void 0 ? r : t;
}, Qu = (e) => Math.max(0, ...e.map((t) => t.cells.reduce((r, n) => r + ia(n), 0))), Dn = ({ rows: e, width: t, availableWidth: r }) => {
  const n = Qu(e);
  if (n === 0) return [];
  const l = Ju(t, r), i = Array.from({ length: n }, () => {
  }), u = [];
  for (const b of e) {
    let v = 0;
    for (const I of b.cells) {
      const m = ia(I), w = aa(I.options.width, l);
      if (w !== void 0)
        if (m === 1) {
          var s, c;
          (c = i[s = v]) !== null && c !== void 0 || (i[s] = w);
        } else u.push({
          start: v,
          span: m,
          width: w
        });
      v += m;
    }
  }
  for (const { start: b, span: v, width: I } of u) {
    const m = Array.from({ length: v }, (E, R) => b + R).filter((E) => E < n), w = m.filter((E) => i[E] === void 0), g = I - m.reduce((E, R) => {
      var x;
      return E + ((x = i[R]) !== null && x !== void 0 ? x : 0);
    }, 0);
    if (w.length > 0 && g > 0) for (const E of w) i[E] = g / w.length;
  }
  const y = i.flatMap((b, v) => b === void 0 ? [v] : []);
  if (y.length > 0) {
    const b = l - i.reduce((I, m) => I + (m ?? 0), 0), v = b > 0 ? b / y.length : l / n;
    for (const I of y) i[I] = v;
  }
  return i.map((b) => Math.round(b));
}, ec = (e) => new oe({
  name: "w:gridCol",
  attributes: e !== void 0 ? { width: {
    key: "w:w",
    value: ke(e)
  } } : void 0
}), sr = class extends ae {
  constructor(e, t) {
    super("w:tblGrid");
    for (const r of e) this.root.push(ec(r));
    t && this.root.push(new rc(t));
  }
}, tc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { id: "w:id" });
  }
}, rc = class extends ae {
  constructor(e) {
    super("w:tblGridChange"), this.root.push(new tc({ id: e.id })), this.root.push(new sr(e.columnWidths));
  }
}, nc = class extends ae {
  constructor(e) {
    super("w:ins"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, ic = class extends ae {
  constructor(e) {
    super("w:del"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, ac = class extends ae {
  constructor(e) {
    super("w:cellIns"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, sc = class extends ae {
  constructor(e) {
    super("w:cellDel"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    }));
  }
}, oc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date",
      verticalMerge: "w:vMerge",
      verticalMergeOriginal: "w:vMergeOrig"
    });
  }
}, lc = class extends ae {
  constructor(e) {
    super("w:cellMerge"), this.root.push(new oc(e));
  }
}, sa = ({ marginUnitType: e = Ne.DXA, top: t, left: r, bottom: n, right: l }) => [
  {
    name: "w:top",
    size: t
  },
  {
    name: "w:left",
    size: r
  },
  {
    name: "w:bottom",
    size: n
  },
  {
    name: "w:right",
    size: l
  }
].filter((i) => i.size !== void 0).map(({ name: i, size: u }) => hr(i, {
  type: e,
  size: u
})), uc = (e) => {
  const t = sa(e);
  if (t.length !== 0)
    return new oe({
      name: "w:tblCellMar",
      children: t
    });
}, cc = (e) => {
  const t = sa(e);
  if (t.length !== 0)
    return new oe({
      name: "w:tcMar",
      children: t
    });
}, hc = class extends tt {
  constructor(e) {
    super("w:tcBorders"), e.top && this.root.push(be("w:top", e.top)), e.start && this.root.push(be("w:start", e.start)), e.left && this.root.push(be("w:left", e.left)), e.bottom && this.root.push(be("w:bottom", e.bottom)), e.end && this.root.push(be("w:end", e.end)), e.right && this.root.push(be("w:right", e.right));
  }
}, fc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, dc = class extends ae {
  constructor(e) {
    super("w:gridSpan"), this.root.push(new fc({ val: Ie(e) }));
  }
}, oa = {
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
}, pc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, Ln = class extends ae {
  constructor(e) {
    super("w:vMerge"), this.root.push(new pc({ val: e }));
  }
}, mc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, vc = class extends ae {
  constructor(e) {
    super("w:textDirection"), this.root.push(new mc({ val: e }));
  }
}, la = class extends tt {
  constructor(e) {
    if (super("w:tcPr", e.includeIfEmpty), e.width && this.root.push(hr("w:tcW", e.width)), e.columnSpan && this.root.push(new dc(e.columnSpan)), e.verticalMerge ? this.root.push(new Ln(e.verticalMerge)) : e.rowSpan && e.rowSpan > 1 && this.root.push(new Ln(oa.RESTART)), e.borders && this.root.push(new hc(e.borders)), e.shading && this.root.push(wr(e.shading)), e.margins) {
      const t = cc(e.margins);
      t && this.root.push(t);
    }
    e.textDirection && this.root.push(new vc(e.textDirection)), e.verticalAlign && this.root.push(ta(e.verticalAlign)), e.insertion && this.root.push(new ac(e.insertion)), e.deletion && this.root.push(new sc(e.deletion)), e.cellMerge && this.root.push(new lc(e.cellMerge)), e.revision && this.root.push(new wc(e.revision));
  }
}, wc = class extends ae {
  constructor(e) {
    super("w:tcPrChange"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new la(de(de({}, e), {}, { includeIfEmpty: !0 })));
  }
}, fr = class extends ae {
  constructor(e) {
    super("w:tc"), J(
      this,
      /**
      * The options the cell was created with.
      *
      * Its borders and shading are declared with hex colors, as they were before they took colors of the document's
      * theme, so that code reading them still compiles. A cell given a theme color has it here as it was given.
      */
      "options",
      void 0
    ), this.options = e, this.root.push(new la(e));
    for (const t of e.children) this.root.push(t);
  }
  prepForXml(e) {
    return this.root[this.root.length - 1] instanceof Te || this.root.push(new Te({})), super.prepForXml(e);
  }
}, Vr = (e, t) => t ? new ce(e) : new Ye(e, "off"), pt = {
  style: De.NONE,
  size: 0,
  color: "auto"
}, mt = {
  style: De.SINGLE,
  size: 4,
  color: "auto"
}, ua = class extends ae {
  constructor(e) {
    var t, r, n, l, i, u;
    super("w:tblBorders"), this.root.push(be("w:top", (t = e.top) !== null && t !== void 0 ? t : mt)), this.root.push(be("w:left", (r = e.left) !== null && r !== void 0 ? r : mt)), this.root.push(be("w:bottom", (n = e.bottom) !== null && n !== void 0 ? n : mt)), this.root.push(be("w:right", (l = e.right) !== null && l !== void 0 ? l : mt)), this.root.push(be("w:insideH", (i = e.insideHorizontal) !== null && i !== void 0 ? i : mt)), this.root.push(be("w:insideV", (u = e.insideVertical) !== null && u !== void 0 ? u : mt));
  }
};
J(ua, "NONE", {
  top: pt,
  bottom: pt,
  left: pt,
  right: pt,
  insideHorizontal: pt,
  insideVertical: pt
});
var gc = ({ horizontalAnchor: e, verticalAnchor: t, absoluteHorizontalPosition: r, relativeHorizontalPosition: n, absoluteVerticalPosition: l, relativeVerticalPosition: i, bottomFromText: u, topFromText: s, leftFromText: c, rightFromText: y }) => new oe({
  name: "w:tblpPr",
  attributes: {
    leftFromText: {
      key: "w:leftFromText",
      value: c === void 0 ? void 0 : ke(c)
    },
    rightFromText: {
      key: "w:rightFromText",
      value: y === void 0 ? void 0 : ke(y)
    },
    topFromText: {
      key: "w:topFromText",
      value: s === void 0 ? void 0 : ke(s)
    },
    bottomFromText: {
      key: "w:bottomFromText",
      value: u === void 0 ? void 0 : ke(u)
    },
    absoluteHorizontalPosition: {
      key: "w:tblpX",
      value: r === void 0 ? void 0 : He(r)
    },
    absoluteVerticalPosition: {
      key: "w:tblpY",
      value: l === void 0 ? void 0 : He(l)
    },
    horizontalAnchor: {
      key: "w:horzAnchor",
      value: e
    },
    relativeHorizontalPosition: {
      key: "w:tblpXSpec",
      value: n
    },
    relativeVerticalPosition: {
      key: "w:tblpYSpec",
      value: i
    },
    verticalAnchor: {
      key: "w:vertAnchor",
      value: t
    }
  }
}), Rr = {
  /** Auto-fit layout - column widths are adjusted based on content */
  AUTOFIT: "autofit",
  /** Fixed layout - column widths are fixed as specified */
  FIXED: "fixed"
}, yc = (e) => new oe({
  name: "w:tblLayout",
  attributes: { type: {
    key: "w:type",
    value: e
  } }
}), bc = {
  /** Value is in twentieths of a point */
  DXA: "dxa"
}, ca = ({ type: e = bc.DXA, value: t }) => new oe({
  name: "w:tblCellSpacing",
  attributes: {
    type: {
      key: "w:type",
      value: e
    },
    value: {
      key: "w:w",
      value: Ei(t)
    }
  }
}), _c = ({ firstRow: e, lastRow: t, firstColumn: r, lastColumn: n, noHBand: l, noVBand: i }) => new oe({
  name: "w:tblLook",
  attributes: {
    firstRow: {
      key: "w:firstRow",
      value: e
    },
    lastRow: {
      key: "w:lastRow",
      value: t
    },
    firstColumn: {
      key: "w:firstColumn",
      value: r
    },
    lastColumn: {
      key: "w:lastColumn",
      value: n
    },
    noHBand: {
      key: "w:noHBand",
      value: l
    },
    noVBand: {
      key: "w:noVBand",
      value: i
    }
  }
}), xc = (e) => new oe({
  name: "w:tblOverlap",
  attributes: { val: {
    key: "w:val",
    value: e
  } }
}), ha = class extends tt {
  constructor(e) {
    var t;
    if (super("w:tblPr", e.includeIfEmpty), e.style && this.root.push(new Ye("w:tblStyle", e.style)), e.float && this.root.push(gc(e.float)), !((t = e.float) === null || t === void 0) && t.overlap && this.root.push(xc(e.float.overlap)), e.visuallyRightToLeft !== void 0 && this.root.push(Vr("w:bidiVisual", e.visuallyRightToLeft)), e.width && this.root.push(hr("w:tblW", e.width)), e.alignment && this.root.push(Si(e.alignment)), e.cellSpacing && this.root.push(ca(e.cellSpacing)), e.indent && this.root.push(hr("w:tblInd", e.indent)), e.borders && this.root.push(new ua(e.borders)), e.shading && this.root.push(wr(e.shading)), e.layout && this.root.push(yc(e.layout)), e.cellMargin) {
      const r = uc(e.cellMargin);
      r && this.root.push(r);
    }
    e.tableLook && this.root.push(_c(e.tableLook)), e.revision && this.root.push(new Ec(e.revision));
  }
}, Ec = class extends ae {
  constructor(e) {
    super("w:tblPrChange"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new ha(de(de({}, e), {}, { includeIfEmpty: !0 })));
  }
}, Tc = (e, t) => new oe({
  name: "w:trHeight",
  attributes: {
    value: {
      key: "w:val",
      value: ke(e)
    },
    rule: {
      key: "w:hRule",
      value: t
    }
  }
}), fa = class extends tt {
  constructor(e) {
    super("w:trPr", e.includeIfEmpty), e.cantSplit !== void 0 && this.root.push(Vr("w:cantSplit", e.cantSplit)), e.tableHeader !== void 0 && this.root.push(Vr("w:tblHeader", e.tableHeader)), e.height && this.root.push(Tc(e.height.value, e.height.rule)), e.cellSpacing && this.root.push(ca(e.cellSpacing)), e.insertion && this.root.push(new nc(e.insertion)), e.deletion && this.root.push(new ic(e.deletion)), e.revision && this.root.push(new Sc(e.revision));
  }
}, Sc = class extends ae {
  constructor(e) {
    super("w:trPrChange"), this.root.push(new Pe({
      id: e.id,
      author: e.author,
      date: e.date
    })), this.root.push(new fa(de(de({}, e), {}, { includeIfEmpty: !0 })));
  }
}, da = class extends ae {
  constructor(e) {
    super("w:tr"), J(this, "options", void 0), this.options = e, this.root.push(new fa(e));
    for (const t of e.children) this.root.push(t);
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((e) => e instanceof fr);
  }
  addCellToIndex(e, t) {
    this.root.splice(t + 1, 0, e);
  }
  addCellToColumnIndex(e, t) {
    const r = this.columnIndexToRootIndex(t, !0);
    this.addCellToIndex(e, r - 1);
  }
  rootIndexToColumnIndex(e) {
    if (e < 1 || e >= this.root.length) throw new Error(`cell 'rootIndex' should between 1 to ${this.root.length - 1}`);
    let t = 0;
    for (let r = 1; r < e; r++) {
      const n = this.root[r];
      t += n.options.columnSpan || 1;
    }
    return t;
  }
  columnIndexToRootIndex(e, t = !1) {
    if (e < 0) throw new Error("cell 'columnIndex' should not less than zero");
    let r = 0, n = 1;
    for (; r <= e; ) {
      if (n >= this.root.length) {
        if (t) return this.root.length;
        throw new Error(`cell 'columnIndex' should not great than ${r - 1}`);
      }
      const l = this.root[n];
      n += 1, r += l && l.options.columnSpan || 1;
    }
    return n - 1;
  }
}, Ac = class pa extends mn {
  constructor({ rows: t, width: r, columnWidths: n, columnWidthsRevision: l, margins: i, indent: u, float: s, layout: c, style: y, borders: b, alignment: v, visuallyRightToLeft: I, tableLook: m, cellSpacing: w, revision: g }) {
    super("w:tbl"), J(this, "rows", void 0), J(this, "width", void 0), J(this, "columnWidths", void 0), J(this, "columnWidthsRevision", void 0), J(
      this,
      /**
      * Grid column widths in twips: the explicit `columnWidths`, or the widths derived
      * from the table and cell widths (re-resolved against the actual page or parent
      * cell every time the table is serialized).
      */
      "resolvedColumnWidths",
      void 0
    ), this.rows = t, this.width = r ?? { size: 100 }, this.columnWidths = n, this.columnWidthsRevision = l, t.forEach((E, R) => {
      if (R === t.length - 1) return;
      let x = 0;
      E.cells.forEach((_) => {
        if (_.options.rowSpan && _.options.rowSpan > 1) {
          const T = new fr({
            rowSpan: _.options.rowSpan - 1,
            columnSpan: _.options.columnSpan,
            borders: _.options.borders,
            children: [],
            verticalMerge: oa.CONTINUE
          });
          t[R + 1].addCellToColumnIndex(T, x);
        }
        x += _.options.columnSpan || 1;
      });
    }), this.resolvedColumnWidths = n ?? Dn({
      rows: t,
      width: this.width,
      availableWidth: Fn
    }), this.root.push(new ha({
      borders: b ?? {},
      width: this.width,
      indent: u,
      float: s,
      layout: c,
      style: y,
      alignment: v,
      cellMargin: i,
      visuallyRightToLeft: I,
      tableLook: m,
      cellSpacing: w,
      revision: g
    })), this.root.push(new sr(this.resolvedColumnWidths, l));
    for (const E of t) this.root.push(E);
  }
  /**
  * Widths of the grid columns in twips, as they will be written to `w:tblGrid`.
  *
  * These are the explicit `columnWidths` when given, otherwise the widths derived
  * from the table and cell widths. Derived widths are resolved against the page (or
  * the parent cell for nested tables) during serialization, so before that they
  * reflect the default page size.
  */
  get ColumnWidths() {
    return this.resolvedColumnWidths;
  }
  /**
  * Width in twips, according to the grid, of a cell in one of this table's rows.
  *
  * Used by nested tables to resolve their own widths against the cell they sit in.
  *
  * @param row - A row of this table
  * @param cell - A cell of that row
  * @returns The summed width of the grid columns the cell spans, or undefined if the cell cannot be located on the grid
  */
  getCellWidth(t, r) {
    const { cells: n } = t, l = n.indexOf(r);
    if (l === -1) return;
    const i = n.slice(0, l).reduce((s, c) => s + (c.options.columnSpan || 1), 0), u = this.resolvedColumnWidths.slice(i, i + (r.options.columnSpan || 1));
    return u.length === 0 ? void 0 : u.reduce((s, c) => s + c, 0);
  }
  /**
  * Resolves derived grid column widths against the width actually available to the
  * table (the section's text width, or the parent cell for nested tables) before
  * serializing.
  */
  prepForXml(t) {
    if (this.columnWidths === void 0) {
      this.resolvedColumnWidths = Dn({
        rows: this.rows,
        width: this.width,
        availableWidth: this.resolveAvailableWidth(t)
      });
      const r = this.root.findIndex((n) => n instanceof sr);
      this.root[r] = new sr(this.resolvedColumnWidths, this.columnWidthsRevision);
    }
    return super.prepForXml(t);
  }
  /**
  * Finds the width in twips available to this table from the serialization context:
  * the parent cell for a nested table, otherwise the text width of the section the
  * table belongs to (the first section for headers, footers and other parts). Falls
  * back to the default page when the context carries no document.
  */
  resolveAvailableWidth(t) {
    var r, n, l;
    const { stack: i } = t, u = i[i.length - 1], s = i[i.length - 2], c = i[i.length - 3];
    if (u instanceof fr && s instanceof da && c instanceof pa) {
      const I = c.getCellWidth(s, u);
      if (I !== void 0) return I;
    }
    const y = i.findIndex((I) => I instanceof na), b = (r = t.file) === null || r === void 0 || (r = r.Document) === null || r === void 0 ? void 0 : r.View.Body, v = y >= 0 ? i[y].getSectionPropertiesFor((n = i[y + 1]) !== null && n !== void 0 ? n : this) : b?.getSectionPropertiesFor();
    return (l = v?.AvailableTextWidth) !== null && l !== void 0 ? l : Fn;
  }
}, kc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, Ic = class extends ae {
  constructor() {
    super("Properties"), this.root.push(new kc({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    }));
  }
}, Rc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { xmlns: "xmlns" });
  }
}, qe = (e, t) => new oe({
  name: "Default",
  attributes: {
    contentType: {
      key: "ContentType",
      value: e
    },
    extension: {
      key: "Extension",
      value: t
    }
  }
}), Ae = (e, t) => new oe({
  name: "Override",
  attributes: {
    contentType: {
      key: "ContentType",
      value: e
    },
    partName: {
      key: "PartName",
      value: t
    }
  }
}), Cc = class extends ae {
  constructor() {
    super("Types"), this.root.push(new Rc({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" })), this.root.push(qe("image/png", "png")), this.root.push(qe("image/jpeg", "jpeg")), this.root.push(qe("image/jpeg", "jpg")), this.root.push(qe("image/bmp", "bmp")), this.root.push(qe("image/gif", "gif")), this.root.push(qe("image/svg+xml", "svg")), this.root.push(qe("application/vnd.openxmlformats-package.relationships+xml", "rels")), this.root.push(qe("application/xml", "xml")), this.root.push(qe("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf")), this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml")), this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml")), this.root.push(Ae("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml")), this.root.push(Ae("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml")), this.root.push(Ae("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml")), this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml")), this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml")), this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml")), this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml")), this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml")), this.root.push(Ae("application/vnd.openxmlformats-officedocument.theme+xml", "/word/theme/theme1.xml"));
  }
  /**
  * Registers the comments part in the content types.
  */
  addComments() {
    this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml"));
  }
  /**
  * Registers the commentsExtended part in the content types.
  */
  addCommentsExtended() {
    this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml", "/word/commentsExtended.xml"));
  }
  /**
  * Registers the commentsIds part in the content types.
  */
  addCommentsIds() {
    this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsIds+xml", "/word/commentsIds.xml"));
  }
  /**
  * Registers a footer part in the content types.
  *
  * @param index - Footer index number (e.g., 1 for footer1.xml)
  */
  addFooter(e) {
    this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${e}.xml`));
  }
  /**
  * Registers a part by its name, such as a chart or an embedded workbook that a drawing adds to the package.
  *
  * @param contentType - The part's content type
  * @param partName - The part's name, from the root of the package, such as "/word/charts/chart1.xml"
  */
  addOverride(e, t) {
    this.root.push(Ae(e, t));
  }
  /**
  * Registers a header part in the content types.
  *
  * @param index - Header index number (e.g., 1 for header1.xml)
  */
  addHeader(e) {
    this.root.push(Ae("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${e}.xml`));
  }
}, Bn = {
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
}, br = class extends ve {
  constructor(e, t) {
    super(de({ Ignorable: t }, Object.fromEntries(e.map((r) => [r, Bn[r]])))), J(this, "xmlKeys", de({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(Bn).map((r) => [r, `xmlns:${r}`]))));
  }
}, Nc = class extends ae {
  constructor(e) {
    super("cp:coreProperties"), this.root.push(new br([
      "cp",
      "dc",
      "dcterms",
      "dcmitype",
      "xsi"
    ])), e.title && this.root.push(new st("dc:title", e.title)), e.subject && this.root.push(new st("dc:subject", e.subject)), e.creator && this.root.push(new st("dc:creator", e.creator)), e.keywords && this.root.push(new st("cp:keywords", e.keywords)), e.description && this.root.push(new st("dc:description", e.description)), e.lastModifiedBy && this.root.push(new st("cp:lastModifiedBy", e.lastModifiedBy)), e.revision && this.root.push(new st("cp:revision", String(e.revision))), this.root.push(new Mn("dcterms:created")), this.root.push(new Mn("dcterms:modified"));
  }
}, Oc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { type: "xsi:type" });
  }
}, Mn = class extends ae {
  constructor(e) {
    super(e), this.root.push(new Oc({ type: "dcterms:W3CDTF" })), this.root.push(Xs(/* @__PURE__ */ new Date()));
  }
}, Pc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
}, Fc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
}, Dc = class extends ae {
  constructor(e, t) {
    super("property"), this.root.push(new Fc({
      formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: e.toString(),
      name: t.name
    })), this.root.push(new Lc(t.value));
  }
}, Lc = class extends ae {
  constructor(e) {
    super("vt:lpwstr"), this.root.push(e);
  }
}, Bc = class extends ae {
  constructor(e) {
    super("Properties"), J(this, "nextId", void 0), J(this, "properties", []), this.root.push(new Pc({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    })), this.nextId = 2;
    for (const t of e) this.addCustomProperty(t);
  }
  prepForXml(e) {
    return this.properties.forEach((t) => this.root.push(t)), super.prepForXml(e);
  }
  addCustomProperty(e) {
    this.properties.push(new Dc(this.nextId++, e));
  }
}, Mc = class extends ae {
  /**
  * @throws If a color isn't valid, or `color` is a theme color and `themeColor`, `themeShade` or `themeTint` is given
  */
  constructor({ color: e, themeColor: t, themeShade: r, themeTint: n }) {
    if (super("w:background"), typeof e == "object" && (t !== void 0 || r !== void 0 || n !== void 0)) throw new Error("Invalid background. Expected a theme color in color, or themeColor, themeShade and themeTint, not both");
    this.root.push(new un([
      {
        keys: $t,
        color: e
      },
      {
        key: "w:themeColor",
        value: t
      },
      {
        key: "w:themeShade",
        value: r === void 0 ? void 0 : En(r)
      },
      {
        key: "w:themeTint",
        value: n === void 0 ? void 0 : En(n)
      }
    ]));
  }
}, Uc = class extends ae {
  constructor(e) {
    super("w:document"), J(this, "body", void 0), this.root.push(new br([
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
    ], "w14 w15 wp14")), this.body = new na(), e.background && this.root.push(new Mc(e.background)), this.root.push(this.body);
  }
  /**
  * Adds a block-level element to the document body.
  *
  * @param item - The element to add (paragraph, table, table of contents, hyperlink, or any other file child)
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
}, jc = class {
  constructor(e) {
    J(this, "document", void 0), J(this, "relationships", void 0), this.document = new Uc(e), this.relationships = new Ke();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
}, Wc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
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
}, zc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, Hc = class extends Je {
  constructor() {
    super({ style: "EndnoteReference" }), this.root.push(new vu());
  }
}, Un = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
}, Cr = class extends ae {
  constructor(e) {
    super("w:endnote"), this.root.push(new zc({
      type: e.type,
      id: e.id
    }));
    for (let t = 0; t < e.children.length; t++) {
      const r = e.children[t];
      t === 0 && r.addRunToFront(new Hc()), this.root.push(r);
    }
  }
}, Gc = class extends ae {
  constructor() {
    super("w:continuationSeparator");
  }
}, ma = class extends Je {
  constructor() {
    super({}), this.root.push(new Gc());
  }
}, Kc = class extends ae {
  constructor() {
    super("w:separator");
  }
}, va = class extends Je {
  constructor() {
    super({}), this.root.push(new Kc());
  }
}, $c = class extends ae {
  constructor() {
    super("w:endnotes"), this.root.push(new Wc({
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
    }));
    const e = new Cr({
      id: -1,
      type: Un.SEPARATOR,
      children: [new Te({
        spacing: {
          after: 0,
          line: 240,
          lineRule: bt.AUTO
        },
        children: [new va()]
      })]
    });
    this.root.push(e);
    const t = new Cr({
      id: 0,
      type: Un.CONTINUATION_SEPARATOR,
      children: [new Te({
        spacing: {
          after: 0,
          line: 240,
          lineRule: bt.AUTO
        },
        children: [new ma()]
      })]
    });
    this.root.push(t);
  }
  createEndnote(e, t) {
    const r = new Cr({
      id: e,
      children: t
    });
    this.root.push(r);
  }
}, Vc = class {
  constructor() {
    J(this, "endnotes", void 0), J(this, "relationships", void 0), this.endnotes = new $c(), this.relationships = new Ke();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
}, qc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
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
}, Xc = class extends yi {
  constructor(e, t) {
    super("w:ftr", t), J(this, "refId", void 0), this.refId = e, t || this.root.push(new qc({
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
    }));
  }
  get ReferenceId() {
    return this.refId;
  }
  add(e) {
    this.root.push(e);
  }
}, Zc = class {
  constructor(e, t, r) {
    J(this, "media", void 0), J(this, "footer", void 0), J(this, "relationships", void 0), this.media = e, this.footer = new Xc(t, r), this.relationships = new Ke();
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
}, Yc = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
}, Jc = class extends ae {
  constructor() {
    super("w:footnoteRef");
  }
}, Qc = class extends Je {
  constructor() {
    super({ style: "FootnoteReference" }), this.root.push(new Jc());
  }
}, jn = {
  /** Separator line between body text and footnotes */
  SEPERATOR: "separator",
  /** Continuation separator for footnotes spanning pages */
  CONTINUATION_SEPERATOR: "continuationSeparator"
}, Nr = class extends ae {
  constructor(e) {
    super("w:footnote"), this.root.push(new Yc({
      type: e.type,
      id: e.id
    }));
    for (let t = 0; t < e.children.length; t++) {
      const r = e.children[t];
      t === 0 && r.addRunToFront(new Qc()), this.root.push(r);
    }
  }
}, eh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
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
}, th = class extends ae {
  constructor() {
    super("w:footnotes"), this.root.push(new eh({
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
    }));
    const e = new Nr({
      id: -1,
      type: jn.SEPERATOR,
      children: [new Te({
        spacing: {
          after: 0,
          line: 240,
          lineRule: bt.AUTO
        },
        children: [new va()]
      })]
    });
    this.root.push(e);
    const t = new Nr({
      id: 0,
      type: jn.CONTINUATION_SEPERATOR,
      children: [new Te({
        spacing: {
          after: 0,
          line: 240,
          lineRule: bt.AUTO
        },
        children: [new ma()]
      })]
    });
    this.root.push(t);
  }
  /**
  * Creates and adds a new footnote to the collection.
  *
  * @param id - Unique numeric identifier for the footnote
  * @param paragraph - Array of paragraphs that make up the footnote content
  */
  createFootNote(e, t) {
    const r = new Nr({
      id: e,
      children: t
    });
    this.root.push(r);
  }
}, rh = class {
  constructor() {
    J(this, "footnotess", void 0), J(this, "relationships", void 0), this.footnotess = new th(), this.relationships = new Ke();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
}, nh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
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
}, ih = class extends yi {
  constructor(e, t) {
    super("w:hdr", t), J(this, "refId", void 0), this.refId = e, t || this.root.push(new nh({
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
    }));
  }
  get ReferenceId() {
    return this.refId;
  }
  add(e) {
    this.root.push(e);
  }
}, ah = class {
  constructor(e, t, r) {
    J(this, "media", void 0), J(this, "header", void 0), J(this, "relationships", void 0), this.media = e, this.header = new ih(t, r), this.relationships = new Ke();
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
}, sh = class {
  constructor() {
    J(this, "map", void 0), this.map = /* @__PURE__ */ new Map();
  }
  /**
  * Adds an image to the media collection.
  *
  * @param key - Unique identifier for this image
  * @param mediaData - Complete image data including file name, transformation, and raw data
  */
  addImage(e, t) {
    this.map.set(e, t);
  }
  /**
  * Gets all images as an array.
  *
  * @returns Read-only array of all media data in the collection
  */
  get Array() {
    return Array.from(this.map.values());
  }
}, Xe = {
  /** Bullet points. */
  BULLET: "bullet"
}, oh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w:tentative"
    });
  }
}, lh = class extends ae {
  constructor(e) {
    super("w:numFmt"), this.root.push(new Oe({ val: e }));
  }
}, uh = class extends ae {
  constructor(e) {
    super("w:lvlText"), this.root.push(new Oe({ val: e }));
  }
}, ch = (e) => {
  switch (e) {
    case Ee.CENTER:
      return "center";
    case Ee.END:
    case Ee.RIGHT:
      return "right";
    default:
      return "left";
  }
}, hh = class extends ae {
  constructor(e) {
    super("w:lvlJc"), this.root.push(new Oe({ val: ch(e) }));
  }
}, fh = class extends ae {
  constructor(e) {
    super("w:suff"), this.root.push(new Oe({ val: e }));
  }
}, dh = class extends ae {
  constructor() {
    super("w:isLgl");
  }
}, ph = class extends ae {
  /**
  * Creates a new numbering level.
  *
  * @param options - Level configuration options
  * @throws Error if level is greater than 9 (Word limitation)
  */
  constructor({ level: e, format: t, text: r, alignment: n = Ee.START, start: l = 1, style: i, suffix: u, isLegalNumberingStyle: s }) {
    if (super("w:lvl"), J(this, "paragraphProperties", void 0), J(this, "runProperties", void 0), this.root.push(new Wt("w:start", Ie(l))), t && this.root.push(new lh(t)), i?.style && this.root.push(Mt(i.style)), s && this.root.push(new dh()), u && this.root.push(new fh(u)), r && this.root.push(new uh(r)), this.root.push(new hh(n)), this.paragraphProperties = new ft(i && i.paragraph, { implicitListParagraphStyle: !1 }), this.runProperties = new it(i?.run && de(de({}, i.run), {}, {
      highlight: void 0,
      math: void 0,
      revision: void 0
    })), this.root.push(this.paragraphProperties), this.root.push(this.runProperties), e > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new oh({
      ilvl: Ie(e),
      tentative: 1
    }));
  }
}, mh = class extends ph {
}, vh = class extends ae {
  /**
  * Creates a new multi-level type specification.
  *
  * @param value - The multi-level type: "singleLevel", "multilevel", or "hybridMultilevel"
  */
  constructor(e) {
    super("w:multiLevelType"), this.root.push(new Oe({ val: e }));
  }
}, wh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
}, Wn = class extends ae {
  /**
  * Creates a new abstract numbering definition.
  *
  * @param id - Unique identifier for this abstract numbering definition
  * @param levelOptions - Array of level definitions (up to 9 levels)
  */
  constructor(e, t) {
    super("w:abstractNum"), J(
      this,
      /** The unique identifier for this abstract numbering definition. */
      "id",
      void 0
    ), this.root.push(new wh({
      abstractNumId: Ie(e),
      restartNumberingAfterBreak: 0
    })), this.root.push(new vh("hybridMultilevel")), this.id = e;
    for (const r of t) this.root.push(new mh(r));
  }
}, gh = class extends ae {
  constructor(e) {
    super("w:abstractNumId"), this.root.push(new Oe({ val: e }));
  }
}, yh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { numId: "w:numId" });
  }
}, zn = class extends ae {
  /**
  * Creates a new concrete numbering instance.
  *
  * @param options - Configuration options for the numbering instance
  */
  constructor(e) {
    if (super("w:num"), J(
      this,
      /** The unique identifier for this numbering instance. */
      "numId",
      void 0
    ), J(
      this,
      /** The reference name for this numbering instance. */
      "reference",
      void 0
    ), J(
      this,
      /** The instance number for tracking multiple uses. */
      "instance",
      void 0
    ), this.numId = e.numId, this.reference = e.reference, this.instance = e.instance, this.root.push(new yh({ numId: Ie(e.numId) })), this.root.push(new gh(Ie(e.abstractNumId))), e.overrideLevels && e.overrideLevels.length) for (const t of e.overrideLevels) this.root.push(new _h(t.num, t.start));
  }
}, bh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
}, _h = class extends ae {
  /**
  * Creates a new level override.
  *
  * @param levelNum - The level number to override (0-8)
  * @param start - Optional starting number for the level
  */
  constructor(e, t) {
    super("w:lvlOverride"), this.root.push(new bh({ ilvl: e })), t !== void 0 && this.root.push(new Eh(t));
  }
}, xh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, Eh = class extends ae {
  /**
  * Creates a new start override.
  *
  * @param start - The starting number
  */
  constructor(e) {
    super("w:startOverride"), this.root.push(new xh({ val: e }));
  }
}, Th = class extends ae {
  /**
  * Creates a new numbering definition collection.
  *
  * Initializes the numbering with a default bullet list configuration and
  * any custom numbering configurations provided in the options.
  *
  * @param options - Configuration options for numbering definitions
  */
  constructor(e) {
    super("w:numbering"), J(this, "abstractNumberingMap", /* @__PURE__ */ new Map()), J(this, "concreteNumberingMap", /* @__PURE__ */ new Map()), J(this, "referenceConfigMap", /* @__PURE__ */ new Map()), J(this, "abstractNumUniqueNumericId", Wo()), J(this, "concreteNumUniqueNumericId", zo()), this.root.push(new br([
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
      "wps"
    ], "w14 w15 wp14"));
    const t = new Wn(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: Xe.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: Le(0.5),
          hanging: Le(0.25)
        } } }
      },
      {
        level: 1,
        format: Xe.BULLET,
        text: "○",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: Le(1),
          hanging: Le(0.25)
        } } }
      },
      {
        level: 2,
        format: Xe.BULLET,
        text: "■",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 2160,
          hanging: Le(0.25)
        } } }
      },
      {
        level: 3,
        format: Xe.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 2880,
          hanging: Le(0.25)
        } } }
      },
      {
        level: 4,
        format: Xe.BULLET,
        text: "○",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 3600,
          hanging: Le(0.25)
        } } }
      },
      {
        level: 5,
        format: Xe.BULLET,
        text: "■",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 4320,
          hanging: Le(0.25)
        } } }
      },
      {
        level: 6,
        format: Xe.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 5040,
          hanging: Le(0.25)
        } } }
      },
      {
        level: 7,
        format: Xe.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 5760,
          hanging: Le(0.25)
        } } }
      },
      {
        level: 8,
        format: Xe.BULLET,
        text: "●",
        alignment: Ee.LEFT,
        style: { paragraph: { indent: {
          left: 6480,
          hanging: Le(0.25)
        } } }
      }
    ]);
    this.concreteNumberingMap.set("default-bullet-numbering", new zn({
      numId: 1,
      abstractNumId: t.id,
      reference: "default-bullet-numbering",
      instance: 0,
      overrideLevels: [{
        num: 0,
        start: 1
      }]
    })), this.abstractNumberingMap.set("default-bullet-numbering", t);
    for (const r of e.config)
      this.abstractNumberingMap.set(r.reference, new Wn(this.abstractNumUniqueNumericId(), r.levels)), this.referenceConfigMap.set(r.reference, r.levels);
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
    for (const t of this.abstractNumberingMap.values()) this.root.push(t);
    for (const t of this.concreteNumberingMap.values()) this.root.push(t);
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
  createConcreteNumberingInstance(e, t) {
    const r = this.abstractNumberingMap.get(e);
    if (!r) return;
    const n = `${e}-${t}`;
    if (this.concreteNumberingMap.has(n)) return;
    const l = this.referenceConfigMap.get(e), i = l && l[0].start, u = {
      numId: this.concreteNumUniqueNumericId(),
      abstractNumId: r.id,
      reference: e,
      instance: t,
      overrideLevels: [typeof i == "number" && Number.isInteger(i) ? {
        num: 0,
        start: i
      } : {
        num: 0,
        start: 1
      }]
    };
    this.concreteNumberingMap.set(n, new zn(u));
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
  get ReferenceConfig() {
    return Array.from(this.referenceConfigMap.values());
  }
}, Sh = class {
  /**
  * @param contentTypes - Where each part's content type is added
  * @param existingPaths - The paths under word/ of the parts the package already has, such as a template's charts,
  * which new parts are numbered after
  */
  constructor(e, t = /* @__PURE__ */ new Set()) {
    J(this, "contentTypes", void 0), J(this, "existingPaths", void 0), J(this, "paths", /* @__PURE__ */ new Map()), J(this, "folders", /* @__PURE__ */ new WeakMap()), this.contentTypes = e, this.existingPaths = t;
  }
  /**
  * Adds a part, and its content type, once.
  *
  * @returns The part's path under word/, such as "charts/chart1.xml"
  */
  add(e) {
    const t = this.paths.get(e);
    if (t !== void 0) return t;
    const { folder: r, name: n, extension: l, contentType: i } = e.options, u = /* @__PURE__ */ new Set([...this.existingPaths, ...this.paths.values()]);
    let s = 1;
    for (; u.has(`${r}/${n}${s}.${l}`); ) s++;
    const c = `${r}/${n}${s}.${l}`;
    return this.paths.set(e, c), this.contentTypes.addOverride(i, `/word/${c}`), c;
  }
  /**
  * Each part added, with its path under word/, in the order they were added.
  */
  get Array() {
    return [...this.paths].map(([e, t]) => ({
      part: e,
      path: t
    }));
  }
  /**
  * Creates the relationships of a part whose XML is being written, so the parts its XML refers to are found from its
  * folder.
  *
  * @param path - The part's path under word/
  */
  createRelationships(e) {
    const t = new Ke();
    return this.folders.set(t, e.slice(0, e.indexOf("/"))), t;
  }
  /**
  * The target of a relationship to a part, relative to the part the relationships are from. The document, headers,
  * footers, footnotes, endnotes and comments are all in word/.
  *
  * @param path - The part's path under word/
  */
  getTarget(e, t) {
    const r = this.folders.get(e);
    return r === void 0 ? t : t.startsWith(`${r}/`) ? t.slice(r.length + 1) : `../${t}`;
  }
}, Ah = (e) => new oe({
  name: "w:compatSetting",
  attributes: {
    version: {
      key: "w:val",
      value: e
    },
    name: {
      key: "w:name",
      value: "compatibilityMode"
    },
    uri: {
      key: "w:uri",
      value: "http://schemas.microsoft.com/office/word"
    }
  }
}), kh = class extends ae {
  constructor(e) {
    super("w:compat"), e.useSingleBorderforContiguousCells && this.root.push(new ce("w:useSingleBorderforContiguousCells", e.useSingleBorderforContiguousCells)), e.wordPerfectJustification && this.root.push(new ce("w:wpJustification", e.wordPerfectJustification)), e.noTabStopForHangingIndent && this.root.push(new ce("w:noTabHangInd", e.noTabStopForHangingIndent)), e.noLeading && this.root.push(new ce("w:noLeading", e.noLeading)), e.spaceForUnderline && this.root.push(new ce("w:spaceForUL", e.spaceForUnderline)), e.noColumnBalance && this.root.push(new ce("w:noColumnBalance", e.noColumnBalance)), e.balanceSingleByteDoubleByteWidth && this.root.push(new ce("w:balanceSingleByteDoubleByteWidth", e.balanceSingleByteDoubleByteWidth)), e.noExtraLineSpacing && this.root.push(new ce("w:noExtraLineSpacing", e.noExtraLineSpacing)), e.doNotLeaveBackslashAlone && this.root.push(new ce("w:doNotLeaveBackslashAlone", e.doNotLeaveBackslashAlone)), e.underlineTrailingSpaces && this.root.push(new ce("w:ulTrailSpace", e.underlineTrailingSpaces)), e.doNotExpandShiftReturn && this.root.push(new ce("w:doNotExpandShiftReturn", e.doNotExpandShiftReturn)), e.spacingInWholePoints && this.root.push(new ce("w:spacingInWholePoints", e.spacingInWholePoints)), e.lineWrapLikeWord6 && this.root.push(new ce("w:lineWrapLikeWord6", e.lineWrapLikeWord6)), e.printBodyTextBeforeHeader && this.root.push(new ce("w:printBodyTextBeforeHeader", e.printBodyTextBeforeHeader)), e.printColorsBlack && this.root.push(new ce("w:printColBlack", e.printColorsBlack)), e.spaceWidth && this.root.push(new ce("w:wpSpaceWidth", e.spaceWidth)), e.showBreaksInFrames && this.root.push(new ce("w:showBreaksInFrames", e.showBreaksInFrames)), e.subFontBySize && this.root.push(new ce("w:subFontBySize", e.subFontBySize)), e.suppressBottomSpacing && this.root.push(new ce("w:suppressBottomSpacing", e.suppressBottomSpacing)), e.suppressTopSpacing && this.root.push(new ce("w:suppressTopSpacing", e.suppressTopSpacing)), e.suppressSpacingAtTopOfPage && this.root.push(new ce("w:suppressSpacingAtTopOfPage", e.suppressSpacingAtTopOfPage)), e.suppressTopSpacingWP && this.root.push(new ce("w:suppressTopSpacingWP", e.suppressTopSpacingWP)), e.suppressSpBfAfterPgBrk && this.root.push(new ce("w:suppressSpBfAfterPgBrk", e.suppressSpBfAfterPgBrk)), e.swapBordersFacingPages && this.root.push(new ce("w:swapBordersFacingPages", e.swapBordersFacingPages)), e.convertMailMergeEsc && this.root.push(new ce("w:convMailMergeEsc", e.convertMailMergeEsc)), e.truncateFontHeightsLikeWP6 && this.root.push(new ce("w:truncateFontHeightsLikeWP6", e.truncateFontHeightsLikeWP6)), e.macWordSmallCaps && this.root.push(new ce("w:mwSmallCaps", e.macWordSmallCaps)), e.usePrinterMetrics && this.root.push(new ce("w:usePrinterMetrics", e.usePrinterMetrics)), e.doNotSuppressParagraphBorders && this.root.push(new ce("w:doNotSuppressParagraphBorders", e.doNotSuppressParagraphBorders)), e.wrapTrailSpaces && this.root.push(new ce("w:wrapTrailSpaces", e.wrapTrailSpaces)), e.footnoteLayoutLikeWW8 && this.root.push(new ce("w:footnoteLayoutLikeWW8", e.footnoteLayoutLikeWW8)), e.shapeLayoutLikeWW8 && this.root.push(new ce("w:shapeLayoutLikeWW8", e.shapeLayoutLikeWW8)), e.alignTablesRowByRow && this.root.push(new ce("w:alignTablesRowByRow", e.alignTablesRowByRow)), e.forgetLastTabAlignment && this.root.push(new ce("w:forgetLastTabAlignment", e.forgetLastTabAlignment)), e.adjustLineHeightInTable && this.root.push(new ce("w:adjustLineHeightInTable", e.adjustLineHeightInTable)), e.autoSpaceLikeWord95 && this.root.push(new ce("w:autoSpaceLikeWord95", e.autoSpaceLikeWord95)), e.noSpaceRaiseLower && this.root.push(new ce("w:noSpaceRaiseLower", e.noSpaceRaiseLower)), e.doNotUseHTMLParagraphAutoSpacing && this.root.push(new ce("w:doNotUseHTMLParagraphAutoSpacing", e.doNotUseHTMLParagraphAutoSpacing)), e.layoutRawTableWidth && this.root.push(new ce("w:layoutRawTableWidth", e.layoutRawTableWidth)), e.layoutTableRowsApart && this.root.push(new ce("w:layoutTableRowsApart", e.layoutTableRowsApart)), e.useWord97LineBreakRules && this.root.push(new ce("w:useWord97LineBreakRules", e.useWord97LineBreakRules)), e.doNotBreakWrappedTables && this.root.push(new ce("w:doNotBreakWrappedTables", e.doNotBreakWrappedTables)), e.doNotSnapToGridInCell && this.root.push(new ce("w:doNotSnapToGridInCell", e.doNotSnapToGridInCell)), e.selectFieldWithFirstOrLastCharacter && this.root.push(new ce("w:selectFldWithFirstOrLastChar", e.selectFieldWithFirstOrLastCharacter)), e.applyBreakingRules && this.root.push(new ce("w:applyBreakingRules", e.applyBreakingRules)), e.doNotWrapTextWithPunctuation && this.root.push(new ce("w:doNotWrapTextWithPunct", e.doNotWrapTextWithPunctuation)), e.doNotUseEastAsianBreakRules && this.root.push(new ce("w:doNotUseEastAsianBreakRules", e.doNotUseEastAsianBreakRules)), e.useWord2002TableStyleRules && this.root.push(new ce("w:useWord2002TableStyleRules", e.useWord2002TableStyleRules)), e.growAutofit && this.root.push(new ce("w:growAutofit", e.growAutofit)), e.useFELayout && this.root.push(new ce("w:useFELayout", e.useFELayout)), e.useNormalStyleForList && this.root.push(new ce("w:useNormalStyleForList", e.useNormalStyleForList)), e.doNotUseIndentAsNumberingTabStop && this.root.push(new ce("w:doNotUseIndentAsNumberingTabStop", e.doNotUseIndentAsNumberingTabStop)), e.useAlternateEastAsianLineBreakRules && this.root.push(new ce("w:useAltKinsokuLineBreakRules", e.useAlternateEastAsianLineBreakRules)), e.allowSpaceOfSameStyleInTable && this.root.push(new ce("w:allowSpaceOfSameStyleInTable", e.allowSpaceOfSameStyleInTable)), e.doNotSuppressIndentation && this.root.push(new ce("w:doNotSuppressIndentation", e.doNotSuppressIndentation)), e.doNotAutofitConstrainedTables && this.root.push(new ce("w:doNotAutofitConstrainedTables", e.doNotAutofitConstrainedTables)), e.autofitToFirstFixedWidthCell && this.root.push(new ce("w:autofitToFirstFixedWidthCell", e.autofitToFirstFixedWidthCell)), e.underlineTabInNumberingList && this.root.push(new ce("w:underlineTabInNumList", e.underlineTabInNumberingList)), e.displayHangulFixedWidth && this.root.push(new ce("w:displayHangulFixedWidth", e.displayHangulFixedWidth)), e.splitPgBreakAndParaMark && this.root.push(new ce("w:splitPgBreakAndParaMark", e.splitPgBreakAndParaMark)), e.doNotVerticallyAlignCellWithSp && this.root.push(new ce("w:doNotVertAlignCellWithSp", e.doNotVerticallyAlignCellWithSp)), e.doNotBreakConstrainedForcedTable && this.root.push(new ce("w:doNotBreakConstrainedForcedTable", e.doNotBreakConstrainedForcedTable)), e.ignoreVerticalAlignmentInTextboxes && this.root.push(new ce("w:doNotVertAlignInTxbx", e.ignoreVerticalAlignmentInTextboxes)), e.useAnsiKerningPairs && this.root.push(new ce("w:useAnsiKerningPairs", e.useAnsiKerningPairs)), e.cachedColumnBalance && this.root.push(new ce("w:cachedColBalance", e.cachedColumnBalance)), e.version && this.root.push(Ah(e.version));
  }
}, Ih = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
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
}, Rh = class extends ae {
  constructor(e) {
    var t, r, n, l, i, u, s, c;
    super("w:settings"), this.root.push(new Ih({
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
    })), this.root.push(new ce("w:displayBackgroundShape", !0)), e.trackRevisions !== void 0 && this.root.push(new ce("w:trackRevisions", e.trackRevisions)), e.defaultTabStop !== void 0 && this.root.push(new Wt("w:defaultTabStop", e.defaultTabStop)), ((t = e.hyphenation) === null || t === void 0 ? void 0 : t.autoHyphenation) !== void 0 && this.root.push(new ce("w:autoHyphenation", e.hyphenation.autoHyphenation)), ((r = e.hyphenation) === null || r === void 0 ? void 0 : r.consecutiveHyphenLimit) !== void 0 && this.root.push(new Wt("w:consecutiveHyphenLimit", e.hyphenation.consecutiveHyphenLimit)), ((n = e.hyphenation) === null || n === void 0 ? void 0 : n.hyphenationZone) !== void 0 && this.root.push(new Wt("w:hyphenationZone", e.hyphenation.hyphenationZone)), ((l = e.hyphenation) === null || l === void 0 ? void 0 : l.doNotHyphenateCaps) !== void 0 && this.root.push(new ce("w:doNotHyphenateCaps", e.hyphenation.doNotHyphenateCaps)), e.evenAndOddHeaders !== void 0 && this.root.push(new ce("w:evenAndOddHeaders", e.evenAndOddHeaders)), e.updateFields !== void 0 && this.root.push(new ce("w:updateFields", e.updateFields)), this.root.push(new kh(de(de({}, (i = e.compatibility) !== null && i !== void 0 ? i : {}), {}, { version: (u = (s = (c = e.compatibility) === null || c === void 0 ? void 0 : c.version) !== null && s !== void 0 ? s : e.compatibilityModeVersion) !== null && u !== void 0 ? u : 15 })));
  }
}, wa = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { val: "w:val" });
  }
}, Ch = class extends ae {
  constructor(e) {
    super("w:name"), this.root.push(new wa({ val: e }));
  }
}, Nh = class extends ae {
  constructor(e) {
    super("w:uiPriority"), this.root.push(new wa({ val: Ie(e) }));
  }
}, Oh = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
}, ga = class extends ae {
  constructor(e, t) {
    super("w:style"), this.root.push(new Oh(e)), t.name && this.root.push(new Ch(t.name)), t.basedOn && this.root.push(new Ye("w:basedOn", t.basedOn)), t.next && this.root.push(new Ye("w:next", t.next)), t.link && this.root.push(new Ye("w:link", t.link)), t.uiPriority !== void 0 && this.root.push(new Nh(t.uiPriority)), t.semiHidden !== void 0 && this.root.push(new ce("w:semiHidden", t.semiHidden)), t.unhideWhenUsed !== void 0 && this.root.push(new ce("w:unhideWhenUsed", t.unhideWhenUsed)), t.quickFormat !== void 0 && this.root.push(new ce("w:qFormat", t.quickFormat));
  }
}, Et = class extends ga {
  constructor(e) {
    super({
      type: "paragraph",
      styleId: e.id
    }, e), J(this, "paragraphProperties", void 0), J(this, "runProperties", void 0), this.paragraphProperties = new ft(e.paragraph, { implicitListParagraphStyle: !1 }), this.runProperties = new it(e.run), this.root.push(this.paragraphProperties), this.root.push(this.runProperties);
  }
}, Tt = class extends ga {
  constructor(e) {
    super({
      type: "character",
      styleId: e.id
    }, de({
      uiPriority: 99,
      unhideWhenUsed: !0
    }, e)), J(this, "runProperties", void 0), this.runProperties = new it(e.run), this.root.push(this.runProperties);
  }
}, at = class extends Et {
  constructor(e) {
    super(de({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0
    }, e));
  }
}, Ph = class extends at {
  constructor(e) {
    super(de({
      id: "Title",
      name: "Title"
    }, e));
  }
}, Fh = class extends at {
  constructor(e) {
    super(de({
      id: "Heading1",
      name: "Heading 1"
    }, e));
  }
}, Dh = class extends at {
  constructor(e) {
    super(de({
      id: "Heading2",
      name: "Heading 2"
    }, e));
  }
}, Lh = class extends at {
  constructor(e) {
    super(de({
      id: "Heading3",
      name: "Heading 3"
    }, e));
  }
}, Bh = class extends at {
  constructor(e) {
    super(de({
      id: "Heading4",
      name: "Heading 4"
    }, e));
  }
}, Mh = class extends at {
  constructor(e) {
    super(de({
      id: "Heading5",
      name: "Heading 5"
    }, e));
  }
}, Uh = class extends at {
  constructor(e) {
    super(de({
      id: "Heading6",
      name: "Heading 6"
    }, e));
  }
}, jh = class extends at {
  constructor(e) {
    super(de({
      id: "Strong",
      name: "Strong"
    }, e));
  }
}, Wh = class extends Et {
  constructor(e) {
    super(de({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: !0
    }, e));
  }
}, zh = class extends Et {
  constructor(e) {
    super(de({
      id: "FootnoteText",
      name: "footnote text",
      link: "FootnoteTextChar",
      basedOn: "Normal",
      uiPriority: 99,
      semiHidden: !0,
      unhideWhenUsed: !0,
      paragraph: { spacing: {
        after: 0,
        line: 240,
        lineRule: bt.AUTO
      } },
      run: { size: 20 }
    }, e));
  }
}, Hh = class extends Tt {
  constructor(e) {
    super(de({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Gh = class extends Tt {
  constructor(e) {
    super(de({
      id: "FootnoteTextChar",
      name: "Footnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "FootnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, Kh = class extends Et {
  constructor(e) {
    super(de({
      id: "EndnoteText",
      name: "endnote text",
      link: "EndnoteTextChar",
      basedOn: "Normal",
      uiPriority: 99,
      semiHidden: !0,
      unhideWhenUsed: !0,
      paragraph: { spacing: {
        after: 0,
        line: 240,
        lineRule: bt.AUTO
      } },
      run: { size: 20 }
    }, e));
  }
}, $h = class extends Tt {
  constructor(e) {
    super(de({
      id: "EndnoteReference",
      name: "endnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: !0,
      run: { superScript: !0 }
    }, e));
  }
}, Vh = class extends Tt {
  constructor(e) {
    super(de({
      id: "EndnoteTextChar",
      name: "Endnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "EndnoteText",
      semiHidden: !0,
      run: { size: 20 }
    }, e));
  }
}, qh = class extends Tt {
  constructor(e) {
    super(de({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: { type: Ni.SINGLE }
      }
    }, e));
  }
}, Ot = (e) => typeof e == "object" ? Object.keys(e)[0] : void 0, vn = (e) => {
  var t;
  return (t = [e["w:style"]].flat().find((r) => r._attr)) === null || t === void 0 ? void 0 : t._attr;
}, Hn = (e) => {
  var t;
  return (t = vn(e)) === null || t === void 0 ? void 0 : t["w:styleId"];
}, Xh = (e) => {
  var t;
  const r = vn(e);
  return ((t = r?.["w:type"]) !== null && t !== void 0 ? t : "paragraph") === "paragraph" && r?.["w:default"] !== void 0 && ![
    "0",
    "false",
    "off"
  ].includes(String(r["w:default"]));
}, Zh = (e) => ({ "w:style": [e["w:style"]].flat().map((t) => t._attr ? { _attr: de(de({}, t._attr), {}, { "w:default": "1" }) } : t) }), Or = class extends ae {
  constructor(e) {
    if (super("w:styles"), e.initialStyles && this.root.push(e.initialStyles), e.importedStyles) for (const t of e.importedStyles) this.root.push(t);
    if (e.paragraphStyles) for (const t of e.paragraphStyles) this.root.push(new Et(t));
    if (e.characterStyles) for (const t of e.characterStyles) this.root.push(new Tt(t));
  }
  /**
  * Writes the styles in the schema's order: the document defaults, the latent styles, then the styles. A style id
  * can only be used once, so a style replaces an earlier one with its id. That way external styles replace docx's
  * default styles, and paragraph and character styles replace the default and imported ones. Of several document
  * defaults, or several latent styles, the last is kept. Normal is marked as the default paragraph style when no
  * style is.
  */
  prepForXml(e) {
    const t = super.prepForXml(e), r = t["w:styles"];
    if (!Array.isArray(r)) return t;
    const n = (s) => r.filter((c) => Ot(c) === s), l = r.map((s) => Ot(s) === "w:style" ? Hn(s) : void 0), i = r.filter((s, c) => ![
      "_attr",
      "w:docDefaults",
      "w:latentStyles"
    ].includes(Ot(s)) && (l[c] === void 0 || l.lastIndexOf(l[c]) === c)), u = i.some((s) => Ot(s) === "w:style" && Xh(s)) ? i : i.map((s) => {
      var c, y;
      return Ot(s) === "w:style" && Hn(s) === "Normal" && ((c = (y = vn(s)) === null || y === void 0 ? void 0 : y["w:type"]) !== null && c !== void 0 ? c : "paragraph") === "paragraph" ? Zh(s) : s;
    });
    return { "w:styles": [
      ...n("_attr"),
      ...n("w:docDefaults").slice(-1),
      ...n("w:latentStyles").slice(-1),
      ...u
    ] };
  }
}, Yh = class extends ae {
  constructor(e) {
    super("w:pPrDefault"), this.root.push(new ft(e, { implicitListParagraphStyle: !1 }));
  }
}, Jh = class extends ae {
  constructor(e) {
    super("w:rPrDefault"), this.root.push(new it(e));
  }
}, Qh = class extends ae {
  constructor(e) {
    super("w:docDefaults"), J(this, "runPropertiesDefaults", void 0), J(this, "paragraphPropertiesDefaults", void 0), this.runPropertiesDefaults = new Jh(e.run), this.paragraphPropertiesDefaults = new Yh(e.paragraph), this.root.push(this.runPropertiesDefaults), this.root.push(this.paragraphPropertiesDefaults);
  }
}, ef = class {
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
    const t = (0, gi.xml2js)(e, { compact: !1 });
    let r;
    for (const l of t.elements || []) l.name === "w:styles" && (r = l);
    if (r === void 0) throw new Error("can not find styles element");
    const n = r.elements || [];
    return {
      initialStyles: new Hs(r.attributes),
      importedStyles: n.map((l) => sn(l))
    };
  }
}, ya = (e = {}) => {
  var t;
  return {
    normal: new Et({
      id: "Normal",
      name: "Normal",
      quickFormat: !0
    }),
    document: new Qh((t = e.document) !== null && t !== void 0 ? t : {}),
    title: new Ph(de({ run: { size: 56 } }, e.title)),
    heading1: new Fh(de({ run: {
      color: "2E74B5",
      size: 32
    } }, e.heading1)),
    heading2: new Dh(de({ run: {
      color: "2E74B5",
      size: 26
    } }, e.heading2)),
    heading3: new Lh(de({ run: {
      color: "1F4D78",
      size: 24
    } }, e.heading3)),
    heading4: new Bh(de({ run: {
      color: "2E74B5",
      italics: !0
    } }, e.heading4)),
    heading5: new Mh(de({ run: { color: "2E74B5" } }, e.heading5)),
    heading6: new Uh(de({ run: { color: "1F4D78" } }, e.heading6)),
    strong: new jh(de({ run: { bold: !0 } }, e.strong)),
    listParagraph: new Wh(e.listParagraph || {}),
    hyperlink: new qh(e.hyperlink || {}),
    footnoteReference: new Hh(e.footnoteReference || {}),
    footnoteText: new zh(e.footnoteText || {}),
    footnoteTextChar: new Gh(e.footnoteTextChar || {}),
    endnoteReference: new $h(e.endnoteReference || {}),
    endnoteText: new Kh(e.endnoteText || {}),
    endnoteTextChar: new Vh(e.endnoteTextChar || {})
  };
}, Gn = class {
  newInstance(e = {}) {
    return {
      initialStyles: new br([
        "mc",
        "r",
        "w",
        "w14",
        "w15"
      ], "w14 w15"),
      importedStyles: Object.values(ya(e))
    };
  }
}, ba = {
  headings: {
    latin: "Calibri Light",
    panose: "020F0302020204030204"
  },
  body: {
    latin: "Calibri",
    panose: "020F0502020204030204"
  }
}, tf = [
  [
    "Jpan",
    "游ゴシック Light",
    "游明朝"
  ],
  ["Hang", "맑은 고딕"],
  [
    "Hans",
    "等线 Light",
    "等线"
  ],
  ["Hant", "新細明體"],
  [
    "Arab",
    "Times New Roman",
    "Arial"
  ],
  [
    "Hebr",
    "Times New Roman",
    "Arial"
  ],
  [
    "Thai",
    "Angsana New",
    "Cordia New"
  ],
  ["Ethi", "Nyala"],
  ["Beng", "Vrinda"],
  ["Gujr", "Shruti"],
  [
    "Khmr",
    "MoolBoran",
    "DaunPenh"
  ],
  ["Knda", "Tunga"],
  ["Guru", "Raavi"],
  ["Cans", "Euphemia"],
  ["Cher", "Plantagenet Cherokee"],
  ["Yiii", "Microsoft Yi Baiti"],
  ["Tibt", "Microsoft Himalaya"],
  ["Thaa", "MV Boli"],
  ["Deva", "Mangal"],
  ["Telu", "Gautami"],
  ["Taml", "Latha"],
  ["Syrc", "Estrangelo Edessa"],
  ["Orya", "Kalinga"],
  ["Mlym", "Kartika"],
  ["Laoo", "DokChampa"],
  ["Sinh", "Iskoola Pota"],
  ["Mong", "Mongolian Baiti"],
  [
    "Viet",
    "Times New Roman",
    "Arial"
  ],
  ["Uigh", "Microsoft Uighur"],
  ["Geor", "Sylfaen"],
  ["Armn", "Arial"],
  ["Bugi", "Leelawadee UI"],
  ["Bopo", "Microsoft JhengHei"],
  ["Java", "Javanese Text"],
  ["Lisu", "Segoe UI"],
  ["Mymr", "Myanmar Text"],
  ["Nkoo", "Ebrima"],
  ["Olck", "Nirmala UI"],
  ["Osma", "Ebrima"],
  ["Phag", "Phagspa"],
  ["Syrn", "Estrangelo Edessa"],
  ["Syrj", "Estrangelo Edessa"],
  ["Syre", "Estrangelo Edessa"],
  ["Sora", "Nirmala UI"],
  ["Tale", "Microsoft Tai Le"],
  ["Talu", "Microsoft New Tai Lue"],
  ["Tfng", "Ebrima"]
], Pr = (e, t, r) => new oe({
  name: e,
  attributes: {
    typeface: {
      key: "typeface",
      value: t
    },
    panose: {
      key: "panose",
      value: r
    }
  }
}), rf = (e, t) => {
  const r = t[e], n = typeof r == "string" ? r : r?.latin;
  return n ?? ba[e].latin;
}, Kn = (e, t) => {
  const r = t[e], { eastAsia: n = "", complexScript: l = "" } = typeof r == "object" ? r : {}, i = rf(e, t), u = ba[e];
  return new oe({
    name: e === "headings" ? "a:majorFont" : "a:minorFont",
    children: [
      Pr("a:latin", i, i === u.latin ? u.panose : void 0),
      Pr("a:ea", n),
      Pr("a:cs", l),
      ...tf.map(([s, c, y = c]) => new oe({
        name: "a:font",
        attributes: {
          script: {
            key: "script",
            value: s
          },
          typeface: {
            key: "typeface",
            value: e === "headings" ? c : y
          }
        }
      }))
    ]
  });
}, nf = (e, t = {}) => new oe({
  name: "a:fontScheme",
  attributes: { name: {
    key: "name",
    value: e
  } },
  children: [Kn("headings", t), Kn("body", t)]
}), _a = (e = []) => new oe({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: "phClr"
  } },
  children: e.map(([t, r]) => new oe({
    name: `a:${t}`,
    attributes: { value: {
      key: "val",
      value: r
    } }
  }))
}), or = (e) => new oe({
  name: "a:solidFill",
  children: [_a(e)]
}), Fr = (e) => new oe({
  name: "a:gradFill",
  attributes: { rotateWithShape: {
    key: "rotWithShape",
    value: !0
  } },
  children: [new oe({
    name: "a:gsLst",
    children: e.map((t, r) => new oe({
      name: "a:gs",
      attributes: { position: {
        key: "pos",
        value: r * 5e4
      } },
      children: [_a(t)]
    }))
  }), new oe({
    name: "a:lin",
    attributes: {
      angle: {
        key: "ang",
        value: 54e5
      },
      scaled: {
        key: "scaled",
        value: !1
      }
    }
  })]
}), Dr = (e) => new oe({
  name: "a:ln",
  attributes: {
    width: {
      key: "w",
      value: e
    },
    cap: {
      key: "cap",
      value: "flat"
    },
    compound: {
      key: "cmpd",
      value: "sng"
    },
    alignment: {
      key: "algn",
      value: "ctr"
    }
  },
  children: [
    or(),
    new oe({
      name: "a:prstDash",
      attributes: { value: {
        key: "val",
        value: "solid"
      } }
    }),
    new oe({
      name: "a:miter",
      attributes: { limit: {
        key: "lim",
        value: 8e5
      } }
    })
  ]
}), Lr = (e) => new oe({
  name: "a:effectStyle",
  children: [new oe({
    name: "a:effectLst",
    children: e
  })]
}), af = () => new oe({
  name: "a:outerShdw",
  attributes: {
    blurRadius: {
      key: "blurRad",
      value: 57150
    },
    distance: {
      key: "dist",
      value: 19050
    },
    direction: {
      key: "dir",
      value: 54e5
    },
    alignment: {
      key: "algn",
      value: "ctr"
    },
    rotateWithShape: {
      key: "rotWithShape",
      value: !1
    }
  },
  children: [new oe({
    name: "a:srgbClr",
    attributes: { value: {
      key: "val",
      value: "000000"
    } },
    children: [new oe({
      name: "a:alpha",
      attributes: { value: {
        key: "val",
        value: 63e3
      } }
    })]
  })]
}), sf = () => new oe({
  name: "a:fmtScheme",
  attributes: { name: {
    key: "name",
    value: "Office"
  } },
  children: [
    new oe({
      name: "a:fillStyleLst",
      children: [
        or(),
        Fr([
          [
            ["lumMod", 11e4],
            ["satMod", 105e3],
            ["tint", 67e3]
          ],
          [
            ["lumMod", 105e3],
            ["satMod", 103e3],
            ["tint", 73e3]
          ],
          [
            ["lumMod", 105e3],
            ["satMod", 109e3],
            ["tint", 81e3]
          ]
        ]),
        Fr([
          [
            ["satMod", 103e3],
            ["lumMod", 102e3],
            ["tint", 94e3]
          ],
          [
            ["satMod", 11e4],
            ["lumMod", 1e5],
            ["shade", 1e5]
          ],
          [
            ["lumMod", 99e3],
            ["satMod", 12e4],
            ["shade", 78e3]
          ]
        ])
      ]
    }),
    new oe({
      name: "a:lnStyleLst",
      children: [
        Dr(6350),
        Dr(12700),
        Dr(19050)
      ]
    }),
    new oe({
      name: "a:effectStyleLst",
      children: [
        Lr([]),
        Lr([]),
        Lr([af()])
      ]
    }),
    new oe({
      name: "a:bgFillStyleLst",
      children: [
        or(),
        or([["tint", 95e3], ["satMod", 17e4]]),
        Fr([
          [
            ["tint", 93e3],
            ["satMod", 15e4],
            ["shade", 98e3],
            ["lumMod", 102e3]
          ],
          [
            ["tint", 98e3],
            ["satMod", 13e4],
            ["shade", 9e4],
            ["lumMod", 103e3]
          ],
          [["shade", 63e3], ["satMod", 12e4]]
        ])
      ]
    })
  ]
}), of = class extends ae {
  constructor({ name: e = "Office Theme", colors: t, fonts: r } = {}) {
    super("a:theme"), J(this, "colors", void 0), this.colors = Ri(t), this.root.push(new Xr({
      namespace: {
        key: "xmlns:a",
        value: "http://schemas.openxmlformats.org/drawingml/2006/main"
      },
      name: {
        key: "name",
        value: e
      }
    })), this.root.push(new oe({
      name: "a:themeElements",
      children: [
        Js(t ? e : "Office", t),
        nf(r ? e : "Office", r),
        sf()
      ]
    })), this.root.push(new oe({ name: "a:objectDefaults" })), this.root.push(new oe({ name: "a:extraClrSchemeLst" }));
  }
  /**
  * The hex color of each of the theme's colors. The system's window text and window colors are black and white.
  */
  get Colors() {
    return this.colors;
  }
}, lf = class {
  constructor(e) {
    var t, r, n, l, i, u, s, c, y, b, v, I;
    if (J(this, "currentRelationshipId", 1), J(this, "documentWrapper", void 0), J(this, "headers", []), J(this, "footers", []), J(this, "coreProperties", void 0), J(this, "numbering", void 0), J(this, "media", void 0), J(this, "fileRelationships", void 0), J(this, "footnotesWrapper", void 0), J(this, "endnotesWrapper", void 0), J(this, "settings", void 0), J(this, "contentTypes", void 0), J(this, "customProperties", void 0), J(this, "appProperties", void 0), J(this, "styles", void 0), J(this, "comments", void 0), J(
      this,
      /** Extended comment data for reply threading and resolved state (word/commentsExtended.xml). */
      "commentsExtended",
      void 0
    ), J(
      this,
      /** Durable comment id mapping (word/commentsIds.xml). */
      "commentsIds",
      void 0
    ), J(this, "fontWrapper", void 0), J(this, "theme", void 0), J(this, "packageParts", void 0), this.coreProperties = new Nc(de(de({}, e), {}, {
      creator: (t = e.creator) !== null && t !== void 0 ? t : "Un-named",
      revision: (r = e.revision) !== null && r !== void 0 ? r : 1,
      lastModifiedBy: (n = e.lastModifiedBy) !== null && n !== void 0 ? n : "Un-named"
    })), this.numbering = new Th(e.numbering ? e.numbering : { config: [] }), this.comments = new ou((l = e.comments) !== null && l !== void 0 ? l : { children: [] }), this.comments.ThreadData && (this.commentsExtended = new hu(this.comments.ThreadData)), this.comments.CommentIdsData && (this.commentsIds = new mu(this.comments.CommentIdsData)), this.fileRelationships = new Ke(), this.customProperties = new Bc((i = e.customProperties) !== null && i !== void 0 ? i : []), this.appProperties = new Ic(), this.footnotesWrapper = new rh(), this.endnotesWrapper = new Vc(), this.contentTypes = new Cc(), this.packageParts = new Sh(this.contentTypes), this.documentWrapper = new jc({ background: e.background }), this.settings = new Rh({
      compatibilityModeVersion: e.compatabilityModeVersion,
      compatibility: e.compatibility,
      evenAndOddHeaders: !!e.evenAndOddHeaderAndFooters,
      trackRevisions: (u = e.features) === null || u === void 0 ? void 0 : u.trackRevisions,
      updateFields: (s = e.features) === null || s === void 0 ? void 0 : s.updateFields,
      defaultTabStop: e.defaultTabStop,
      hyphenation: {
        autoHyphenation: (c = e.hyphenation) === null || c === void 0 ? void 0 : c.autoHyphenation,
        hyphenationZone: (y = e.hyphenation) === null || y === void 0 ? void 0 : y.hyphenationZone,
        consecutiveHyphenLimit: (b = e.hyphenation) === null || b === void 0 ? void 0 : b.consecutiveHyphenLimit,
        doNotHyphenateCaps: (v = e.hyphenation) === null || v === void 0 ? void 0 : v.doNotHyphenateCaps
      }
    }), this.media = new sh(), e.externalStyles !== void 0) {
      var m, w;
      const g = (m = (w = e.styles) === null || w === void 0 ? void 0 : w.default) !== null && m !== void 0 ? m : {}, E = Object.entries(ya(g)), R = ([_]) => g[_] !== void 0, x = new ef().newInstance(e.externalStyles);
      this.styles = new Or(de(de({}, x), {}, { importedStyles: [
        ...E.filter((_) => !R(_)).map(([, _]) => _),
        ...x.importedStyles,
        ...E.filter(R).map(([, _]) => _)
      ] }));
    } else if (e.styles) {
      const g = new Gn().newInstance(e.styles.default);
      this.styles = new Or(de(de({}, g), e.styles));
    } else {
      const g = new Gn();
      this.styles = new Or(g.newInstance());
    }
    this.addDefaultRelationships();
    for (const g of e.sections) this.addSection(g);
    if (e.footnotes) for (const g in e.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(g), e.footnotes[g].children);
    if (e.endnotes) for (const g in e.endnotes) this.endnotesWrapper.View.createEndnote(parseFloat(g), e.endnotes[g].children);
    this.fontWrapper = new Qi((I = e.fonts) !== null && I !== void 0 ? I : []), this.theme = new of(e.theme), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", "theme/theme1.xml");
  }
  addSection({ headers: e = {}, footers: t = {}, children: r, properties: n }) {
    this.documentWrapper.View.Body.addSection(de(de({}, n), {}, {
      headerWrapperGroup: {
        default: e.default ? this.createHeader(e.default) : void 0,
        first: e.first ? this.createHeader(e.first) : void 0,
        even: e.even ? this.createHeader(e.even) : void 0
      },
      footerWrapperGroup: {
        default: t.default ? this.createFooter(t.default) : void 0,
        first: t.first ? this.createFooter(t.first) : void 0,
        even: t.even ? this.createFooter(t.even) : void 0
      }
    }));
    for (const l of r) this.documentWrapper.View.add(l);
  }
  createHeader(e) {
    const t = new ah(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addHeaderToDocument(t), t;
  }
  createFooter(e) {
    const t = new Zc(this.media, this.currentRelationshipId++);
    for (const r of e.options.children) t.add(r);
    return this.addFooterToDocument(t), t;
  }
  addHeaderToDocument(e, t = gt.DEFAULT) {
    this.headers.push({
      header: e,
      type: t
    }), this.documentWrapper.Relationships.addRelationship(e.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`), this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(e, t = gt.DEFAULT) {
    this.footers.push({
      footer: e,
      type: t
    }), this.documentWrapper.Relationships.addRelationship(e.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer", `footer${this.footers.length}.xml`), this.contentTypes.addFooter(this.footers.length);
  }
  addDefaultRelationships() {
    this.fileRelationships.addRelationship(1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", "word/document.xml"), this.fileRelationships.addRelationship(2, "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", "docProps/core.xml"), this.fileRelationships.addRelationship(3, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", "docProps/app.xml"), this.fileRelationships.addRelationship(4, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties", "docProps/custom.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", "styles.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", "numbering.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", "footnotes.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes", "endnotes.xml"), this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", "settings.xml"), this.comments.IsEmpty || (this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments", "comments.xml"), this.contentTypes.addComments()), this.commentsExtended && (this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.microsoft.com/office/2011/relationships/commentsExtended", "commentsExtended.xml"), this.contentTypes.addCommentsExtended()), this.commentsIds && (this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.microsoft.com/office/2016/09/relationships/commentsIds", "commentsIds.xml"), this.contentTypes.addCommentsIds());
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
  /** Extended comments part for reply threading. Undefined when no comment threads exist. */
  get CommentsExtended() {
    return this.commentsExtended;
  }
  /** Durable comment id part. Undefined when no comment carries a durableId. */
  get CommentsIds() {
    return this.commentsIds;
  }
  get FontTable() {
    return this.fontWrapper;
  }
  /** The document's theme (word/theme/theme1.xml). */
  get Theme() {
    return this.theme;
  }
  /** The parts that drawings, such as charts, add to the package when it is written. */
  get PackageParts() {
    return this.packageParts;
  }
}, uf = class extends ae {
  constructor(e = {}) {
    super("w:instrText"), J(this, "properties", void 0), this.properties = e, this.root.push(new ht({ space: ct.PRESERVE }));
    let t = "TOC";
    if (this.properties.captionLabel && (t = `${t} \\a "${this.properties.captionLabel}"`), this.properties.entriesFromBookmark && (t = `${t} \\b "${this.properties.entriesFromBookmark}"`), this.properties.captionLabelIncludingNumbers && (t = `${t} \\c "${this.properties.captionLabelIncludingNumbers}"`), this.properties.sequenceAndPageNumbersSeparator && (t = `${t} \\d "${this.properties.sequenceAndPageNumbersSeparator}"`), this.properties.tcFieldIdentifier && (t = `${t} \\f "${this.properties.tcFieldIdentifier}"`), this.properties.hyperlink && (t = `${t} \\h`), this.properties.tcFieldLevelRange && (t = `${t} \\l "${this.properties.tcFieldLevelRange}"`), this.properties.pageNumbersEntryLevelsRange && (t = `${t} \\n "${this.properties.pageNumbersEntryLevelsRange}"`), this.properties.headingStyleRange && (t = `${t} \\o "${this.properties.headingStyleRange}"`), this.properties.entryAndPageNumberSeparator && (t = `${t} \\p "${this.properties.entryAndPageNumberSeparator}"`), this.properties.seqFieldIdentifierForPrefix && (t = `${t} \\s "${this.properties.seqFieldIdentifierForPrefix}"`), this.properties.stylesWithLevels && this.properties.stylesWithLevels.length) {
      const r = this.properties.stylesWithLevels.map((n) => `${n.styleName},${n.level}`).join(",");
      t = `${t} \\t "${r}"`;
    }
    this.properties.useAppliedParagraphOutlineLevel && (t = `${t} \\u`), this.properties.preserveTabInEntries && (t = `${t} \\w`), this.properties.preserveNewLineInEntries && (t = `${t} \\x`), this.properties.hideTabAndPageNumbersInWebView && (t = `${t} \\z`), this.root.push(t);
  }
}, cf = class extends ae {
  constructor() {
    super("w:sdtContent");
  }
}, hf = class extends ae {
  constructor(e) {
    super("w:sdtPr"), e && this.root.push(new Ye("w:alias", e));
  }
}, ff = [
  "contentChildren",
  "cachedEntries",
  "beginDirty"
], df = class extends mn {
  constructor(e = "Table of Contents", t = {}) {
    let { contentChildren: r = [], cachedEntries: n = [], beginDirty: l = !0 } = t, i = ea(t, ff);
    super("w:sdt"), this.root.push(new hf(e));
    const u = new cf(), s = [new Je({ children: [
      Ft(l),
      new uf(i),
      Dt()
    ] })], c = [new Je({ children: [Lt()] })];
    if (n !== void 0 && n.length > 0) {
      const { stylesWithLevels: y } = i, b = n.map((I, m) => {
        var w, g;
        const E = this.buildCachedContentParagraphChild(I, i), R = (w = y == null || (g = y.find((_) => _.level === I.level)) === null || g === void 0 ? void 0 : g.styleName) !== null && w !== void 0 ? w : `TOC${I.level}`, x = m === 0 ? [...s, E] : m === n.length - 1 ? [E, ...c] : [E];
        return new Te({
          style: R,
          tabStops: this.getTabStopsForLevel(I.level),
          children: x
        });
      });
      let v = b;
      n.length <= 1 && (v = [...b, new Te({ children: c })]);
      for (const I of v) u.addChildElement(I);
    } else {
      const y = new Te({ children: s });
      u.addChildElement(y);
      for (const v of r) u.addChildElement(v);
      const b = new Te({ children: c });
      u.addChildElement(b);
    }
    this.root.push(u);
  }
  getTabStopsForLevel(e, t = 9025) {
    return [{
      type: "clear",
      position: t + 1 - (e - 1) * 240
    }, {
      type: "right",
      position: t,
      leader: "dot"
    }];
  }
  buildCachedContentRun(e, t) {
    var r, n;
    return new Je({
      style: t?.hyperlink && e.href !== void 0 ? "IndexLink" : void 0,
      children: [
        new ur({ text: e.title }),
        new Xi(),
        new ur({ text: (r = (n = e.page) === null || n === void 0 ? void 0 : n.toString()) !== null && r !== void 0 ? r : "" })
      ]
    });
  }
  buildCachedContentParagraphChild(e, t) {
    const r = this.buildCachedContentRun(e, t);
    return t?.hyperlink && e.href !== void 0 ? new Zi({
      anchor: e.href,
      children: [r]
    }) : r;
  }
}, xa = class {
  constructor(e = { children: [] }) {
    J(this, "options", void 0), this.options = e;
  }
}, Ea = class {
  constructor(e = { children: [] }) {
    J(this, "options", void 0), this.options = e;
  }
}, pf = class extends ve {
  constructor(...e) {
    super(...e), J(this, "xmlKeys", { id: "w:id" });
  }
}, mf = class extends ae {
  constructor(e) {
    super("w:footnoteReference"), this.root.push(new pf({ id: e }));
  }
}, vf = class extends Je {
  /**
  * Creates a new footnote reference run.
  *
  * @param id - Unique identifier linking to the footnote content
  */
  constructor(e) {
    super({ style: "FootnoteReference" }), this.root.push(new mf(e));
  }
}, wf = /* @__PURE__ */ he(((e, t) => {
  _t(), nt();
  (function(r) {
    typeof e == "object" && typeof t < "u" ? t.exports = r() : typeof define == "function" && define.amd ? define([], r) : (typeof window < "u" ? window : typeof Re < "u" ? Re : typeof self < "u" ? self : this).JSZip = r();
  })(function() {
    return (function r(n, l, i) {
      function u(y, b) {
        if (!l[y]) {
          if (!n[y]) {
            var v = typeof Jt == "function" && Jt;
            if (!b && v) return v(y, !0);
            if (s) return s(y, !0);
            var I = /* @__PURE__ */ new Error("Cannot find module '" + y + "'");
            throw I.code = "MODULE_NOT_FOUND", I;
          }
          var m = l[y] = { exports: {} };
          n[y][0].call(m.exports, function(w) {
            var g = n[y][1][w];
            return u(g || w);
          }, m, m.exports, r, n, l, i);
        }
        return l[y].exports;
      }
      for (var s = typeof Jt == "function" && Jt, c = 0; c < i.length; c++) u(i[c]);
      return u;
    })({
      1: [function(r, n, l) {
        var i = r("./utils"), u = r("./support"), s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        l.encode = function(c) {
          for (var y, b, v, I, m, w, g, E = [], R = 0, x = c.length, _ = x, T = i.getTypeOf(c) !== "string"; R < c.length; ) _ = x - R, v = T ? (y = c[R++], b = R < x ? c[R++] : 0, R < x ? c[R++] : 0) : (y = c.charCodeAt(R++), b = R < x ? c.charCodeAt(R++) : 0, R < x ? c.charCodeAt(R++) : 0), I = y >> 2, m = (3 & y) << 4 | b >> 4, w = 1 < _ ? (15 & b) << 2 | v >> 6 : 64, g = 2 < _ ? 63 & v : 64, E.push(s.charAt(I) + s.charAt(m) + s.charAt(w) + s.charAt(g));
          return E.join("");
        }, l.decode = function(c) {
          var y, b, v, I, m, w, g = 0, E = 0, R = "data:";
          if (c.substr(0, R.length) === R) throw new Error("Invalid base64 input, it looks like a data url.");
          var x, _ = 3 * (c = c.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (c.charAt(c.length - 1) === s.charAt(64) && _--, c.charAt(c.length - 2) === s.charAt(64) && _--, _ % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (x = u.uint8array ? new Uint8Array(0 | _) : new Array(0 | _); g < c.length; ) y = s.indexOf(c.charAt(g++)) << 2 | (I = s.indexOf(c.charAt(g++))) >> 4, b = (15 & I) << 4 | (m = s.indexOf(c.charAt(g++))) >> 2, v = (3 & m) << 6 | (w = s.indexOf(c.charAt(g++))), x[E++] = y, m !== 64 && (x[E++] = b), w !== 64 && (x[E++] = v);
          return x;
        };
      }, {
        "./support": 30,
        "./utils": 32
      }],
      2: [function(r, n, l) {
        var i = r("./external"), u = r("./stream/DataWorker"), s = r("./stream/Crc32Probe"), c = r("./stream/DataLengthProbe");
        function y(b, v, I, m, w) {
          this.compressedSize = b, this.uncompressedSize = v, this.crc32 = I, this.compression = m, this.compressedContent = w;
        }
        y.prototype = {
          getContentWorker: function() {
            var b = new u(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new c("data_length")), v = this;
            return b.on("end", function() {
              if (this.streamInfo.data_length !== v.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), b;
          },
          getCompressedWorker: function() {
            return new u(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          }
        }, y.createWorkerFrom = function(b, v, I) {
          return b.pipe(new s()).pipe(new c("uncompressedSize")).pipe(v.compressWorker(I)).pipe(new c("compressedSize")).withStreamInfo("compression", v);
        }, n.exports = y;
      }, {
        "./external": 6,
        "./stream/Crc32Probe": 25,
        "./stream/DataLengthProbe": 26,
        "./stream/DataWorker": 27
      }],
      3: [function(r, n, l) {
        var i = r("./stream/GenericWorker");
        l.STORE = {
          magic: "\0\0",
          compressWorker: function() {
            return new i("STORE compression");
          },
          uncompressWorker: function() {
            return new i("STORE decompression");
          }
        }, l.DEFLATE = r("./flate");
      }, {
        "./flate": 7,
        "./stream/GenericWorker": 28
      }],
      4: [function(r, n, l) {
        var i = r("./utils"), u = (function() {
          for (var s, c = [], y = 0; y < 256; y++) {
            s = y;
            for (var b = 0; b < 8; b++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
            c[y] = s;
          }
          return c;
        })();
        n.exports = function(s, c) {
          return s !== void 0 && s.length ? i.getTypeOf(s) !== "string" ? (function(y, b, v, I) {
            var m = u, w = I + v;
            y ^= -1;
            for (var g = I; g < w; g++) y = y >>> 8 ^ m[255 & (y ^ b[g])];
            return -1 ^ y;
          })(0 | c, s, s.length, 0) : (function(y, b, v, I) {
            var m = u, w = I + v;
            y ^= -1;
            for (var g = I; g < w; g++) y = y >>> 8 ^ m[255 & (y ^ b.charCodeAt(g))];
            return -1 ^ y;
          })(0 | c, s, s.length, 0) : 0;
        };
      }, { "./utils": 32 }],
      5: [function(r, n, l) {
        l.base64 = !1, l.binary = !1, l.dir = !1, l.createFolders = !0, l.date = null, l.compression = null, l.compressionOptions = null, l.comment = null, l.unixPermissions = null, l.dosPermissions = null;
      }, {}],
      6: [function(r, n, l) {
        var i = null;
        i = typeof Promise < "u" ? Promise : r("lie"), n.exports = { Promise: i };
      }, { lie: 37 }],
      7: [function(r, n, l) {
        var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", u = r("pako"), s = r("./utils"), c = r("./stream/GenericWorker"), y = i ? "uint8array" : "array";
        function b(v, I) {
          c.call(this, "FlateWorker/" + v), this._pako = null, this._pakoAction = v, this._pakoOptions = I, this.meta = {};
        }
        l.magic = "\b\0", s.inherits(b, c), b.prototype.processChunk = function(v) {
          this.meta = v.meta, this._pako === null && this._createPako(), this._pako.push(s.transformTo(y, v.data), !1);
        }, b.prototype.flush = function() {
          c.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
        }, b.prototype.cleanUp = function() {
          c.prototype.cleanUp.call(this), this._pako = null;
        }, b.prototype._createPako = function() {
          this._pako = new u[this._pakoAction]({
            raw: !0,
            level: this._pakoOptions.level || -1
          });
          var v = this;
          this._pako.onData = function(I) {
            v.push({
              data: I,
              meta: v.meta
            });
          };
        }, l.compressWorker = function(v) {
          return new b("Deflate", v);
        }, l.uncompressWorker = function() {
          return new b("Inflate", {});
        };
      }, {
        "./stream/GenericWorker": 28,
        "./utils": 32,
        pako: 38
      }],
      8: [function(r, n, l) {
        function i(m, w) {
          var g, E = "";
          for (g = 0; g < w; g++) E += String.fromCharCode(255 & m), m >>>= 8;
          return E;
        }
        function u(m, w, g, E, R, x) {
          var _, T, S = m.file, p = m.compression, P = x !== y.utf8encode, M = s.transformTo("string", x(S.name)), C = s.transformTo("string", y.utf8encode(S.name)), $ = S.comment, ee = s.transformTo("string", x($)), O = s.transformTo("string", y.utf8encode($)), z = C.length !== S.name.length, k = O.length !== $.length, H = "", Q = "", q = "", le = S.dir, Z = S.date, te = {
            crc32: 0,
            compressedSize: 0,
            uncompressedSize: 0
          };
          w && !g || (te.crc32 = m.crc32, te.compressedSize = m.compressedSize, te.uncompressedSize = m.uncompressedSize);
          var V = 0;
          w && (V |= 8), P || !z && !k || (V |= 2048);
          var F = 0, X = 0;
          le && (F |= 16), R === "UNIX" ? (X = 798, F |= (function(re, pe) {
            var A = re;
            return re || (A = pe ? 16893 : 33204), (65535 & A) << 16;
          })(S.unixPermissions, le)) : (X = 20, F |= (function(re) {
            return 63 & (re || 0);
          })(S.dosPermissions)), _ = Z.getUTCHours(), _ <<= 6, _ |= Z.getUTCMinutes(), _ <<= 5, _ |= Z.getUTCSeconds() / 2, T = Z.getUTCFullYear() - 1980, T <<= 4, T |= Z.getUTCMonth() + 1, T <<= 5, T |= Z.getUTCDate(), z && (Q = i(1, 1) + i(b(M), 4) + C, H += "up" + i(Q.length, 2) + Q), k && (q = i(1, 1) + i(b(ee), 4) + O, H += "uc" + i(q.length, 2) + q);
          var Y = "";
          return Y += `
\0`, Y += i(V, 2), Y += p.magic, Y += i(_, 2), Y += i(T, 2), Y += i(te.crc32, 4), Y += i(te.compressedSize, 4), Y += i(te.uncompressedSize, 4), Y += i(M.length, 2), Y += i(H.length, 2), {
            fileRecord: v.LOCAL_FILE_HEADER + Y + M + H,
            dirRecord: v.CENTRAL_FILE_HEADER + i(X, 2) + Y + i(ee.length, 2) + "\0\0\0\0" + i(F, 4) + i(E, 4) + M + H + ee
          };
        }
        var s = r("../utils"), c = r("../stream/GenericWorker"), y = r("../utf8"), b = r("../crc32"), v = r("../signature");
        function I(m, w, g, E) {
          c.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = w, this.zipPlatform = g, this.encodeFileName = E, this.streamFiles = m, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        s.inherits(I, c), I.prototype.push = function(m) {
          var w = m.meta.percent || 0, g = this.entriesCount, E = this._sources.length;
          this.accumulate ? this.contentBuffer.push(m) : (this.bytesWritten += m.data.length, c.prototype.push.call(this, {
            data: m.data,
            meta: {
              currentFile: this.currentFile,
              percent: g ? (w + 100 * (g - E - 1)) / g : 100
            }
          }));
        }, I.prototype.openedSource = function(m) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = m.file.name;
          var w = this.streamFiles && !m.file.dir;
          if (w) {
            var g = u(m, w, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({
              data: g.fileRecord,
              meta: { percent: 0 }
            });
          } else this.accumulate = !0;
        }, I.prototype.closedSource = function(m) {
          this.accumulate = !1;
          var w = this.streamFiles && !m.file.dir, g = u(m, w, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(g.dirRecord), w) this.push({
            data: (function(E) {
              return v.DATA_DESCRIPTOR + i(E.crc32, 4) + i(E.compressedSize, 4) + i(E.uncompressedSize, 4);
            })(m),
            meta: { percent: 100 }
          });
          else for (this.push({
            data: g.fileRecord,
            meta: { percent: 0 }
          }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, I.prototype.flush = function() {
          for (var m = this.bytesWritten, w = 0; w < this.dirRecords.length; w++) this.push({
            data: this.dirRecords[w],
            meta: { percent: 100 }
          });
          var g = this.bytesWritten - m, E = (function(R, x, _, T, S) {
            var p = s.transformTo("string", S(T));
            return v.CENTRAL_DIRECTORY_END + "\0\0\0\0" + i(R, 2) + i(R, 2) + i(x, 4) + i(_, 4) + i(p.length, 2) + p;
          })(this.dirRecords.length, g, m, this.zipComment, this.encodeFileName);
          this.push({
            data: E,
            meta: { percent: 100 }
          });
        }, I.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, I.prototype.registerPrevious = function(m) {
          this._sources.push(m);
          var w = this;
          return m.on("data", function(g) {
            w.processChunk(g);
          }), m.on("end", function() {
            w.closedSource(w.previous.streamInfo), w._sources.length ? w.prepareNextSource() : w.end();
          }), m.on("error", function(g) {
            w.error(g);
          }), this;
        }, I.prototype.resume = function() {
          return !!c.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
        }, I.prototype.error = function(m) {
          var w = this._sources;
          if (!c.prototype.error.call(this, m)) return !1;
          for (var g = 0; g < w.length; g++) try {
            w[g].error(m);
          } catch {
          }
          return !0;
        }, I.prototype.lock = function() {
          c.prototype.lock.call(this);
          for (var m = this._sources, w = 0; w < m.length; w++) m[w].lock();
        }, n.exports = I;
      }, {
        "../crc32": 4,
        "../signature": 23,
        "../stream/GenericWorker": 28,
        "../utf8": 31,
        "../utils": 32
      }],
      9: [function(r, n, l) {
        var i = r("../compressions"), u = r("./ZipFileWorker");
        l.generateWorker = function(s, c, y) {
          var b = new u(c.streamFiles, y, c.platform, c.encodeFileName), v = 0;
          try {
            s.forEach(function(I, m) {
              v++;
              var w = (function(x, _) {
                var T = x || _, S = i[T];
                if (!S) throw new Error(T + " is not a valid compression method !");
                return S;
              })(m.options.compression, c.compression), g = m.options.compressionOptions || c.compressionOptions || {}, E = m.dir, R = m.date;
              m._compressWorker(w, g).withStreamInfo("file", {
                name: I,
                dir: E,
                date: R,
                comment: m.comment || "",
                unixPermissions: m.unixPermissions,
                dosPermissions: m.dosPermissions
              }).pipe(b);
            }), b.entriesCount = v;
          } catch (I) {
            b.error(I);
          }
          return b;
        };
      }, {
        "../compressions": 3,
        "./ZipFileWorker": 8
      }],
      10: [function(r, n, l) {
        function i() {
          if (!(this instanceof i)) return new i();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var u = new i();
            for (var s in this) typeof this[s] != "function" && (u[s] = this[s]);
            return u;
          };
        }
        (i.prototype = r("./object")).loadAsync = r("./load"), i.support = r("./support"), i.defaults = r("./defaults"), i.version = "3.10.2", i.loadAsync = function(u, s) {
          return new i().loadAsync(u, s);
        }, i.external = r("./external"), n.exports = i;
      }, {
        "./defaults": 5,
        "./external": 6,
        "./load": 11,
        "./object": 15,
        "./support": 30
      }],
      11: [function(r, n, l) {
        var i = r("./utils"), u = r("./external"), s = r("./utf8"), c = r("./zipEntries"), y = r("./stream/Crc32Probe"), b = r("./nodejsUtils");
        function v(I) {
          return new u.Promise(function(m, w) {
            var g = I.decompressed.getContentWorker().pipe(new y());
            g.on("error", function(E) {
              w(E);
            }).on("end", function() {
              g.streamInfo.crc32 !== I.decompressed.crc32 ? w(/* @__PURE__ */ new Error("Corrupted zip : CRC32 mismatch")) : m();
            }).resume();
          });
        }
        n.exports = function(I, m) {
          var w = this;
          return m = i.extend(m || {}, {
            base64: !1,
            checkCRC32: !1,
            optimizedBinaryString: !1,
            createFolders: !1,
            decodeFileName: s.utf8decode
          }), b.isNode && b.isStream(I) ? u.Promise.reject(/* @__PURE__ */ new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", I, !0, m.optimizedBinaryString, m.base64).then(function(g) {
            var E = new c(m);
            return E.load(g), E;
          }).then(function(g) {
            var E = [u.Promise.resolve(g)], R = g.files;
            if (m.checkCRC32) for (var x = 0; x < R.length; x++) E.push(v(R[x]));
            return u.Promise.all(E);
          }).then(function(g) {
            for (var E = g.shift(), R = E.files, x = 0; x < R.length; x++) {
              var _ = R[x], T = _.fileNameStr, S = i.resolve(_.fileNameStr);
              w.file(S, _.decompressed, {
                binary: !0,
                optimizedBinaryString: !0,
                date: _.date,
                dir: _.dir,
                comment: _.fileCommentStr.length ? _.fileCommentStr : null,
                unixPermissions: _.unixPermissions,
                dosPermissions: _.dosPermissions,
                createFolders: m.createFolders
              }), _.dir || (w.file(S).unsafeOriginalName = T);
            }
            return E.zipComment.length && (w.comment = E.zipComment), w;
          });
        };
      }, {
        "./external": 6,
        "./nodejsUtils": 14,
        "./stream/Crc32Probe": 25,
        "./utf8": 31,
        "./utils": 32,
        "./zipEntries": 33
      }],
      12: [function(r, n, l) {
        var i = r("../utils"), u = r("../stream/GenericWorker");
        function s(c, y) {
          u.call(this, "Nodejs stream input adapter for " + c), this._upstreamEnded = !1, this._bindStream(y);
        }
        i.inherits(s, u), s.prototype._bindStream = function(c) {
          var y = this;
          (this._stream = c).pause(), c.on("data", function(b) {
            y.push({
              data: b,
              meta: { percent: 0 }
            });
          }).on("error", function(b) {
            y.isPaused ? this.generatedError = b : y.error(b);
          }).on("end", function() {
            y.isPaused ? y._upstreamEnded = !0 : y.end();
          });
        }, s.prototype.pause = function() {
          return !!u.prototype.pause.call(this) && (this._stream.pause(), !0);
        }, s.prototype.resume = function() {
          return !!u.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
        }, n.exports = s;
      }, {
        "../stream/GenericWorker": 28,
        "../utils": 32
      }],
      13: [function(r, n, l) {
        var i = r("readable-stream").Readable;
        function u(s, c, y) {
          i.call(this, c), this._helper = s;
          var b = this;
          s.on("data", function(v, I) {
            b.push(v) || b._helper.pause(), y && y(I);
          }).on("error", function(v) {
            b.emit("error", v);
          }).on("end", function() {
            b.push(null);
          });
        }
        r("../utils").inherits(u, i), u.prototype._read = function() {
          this._helper.resume();
        }, n.exports = u;
      }, {
        "../utils": 32,
        "readable-stream": 16
      }],
      14: [function(r, n, l) {
        n.exports = {
          isNode: typeof Buffer < "u",
          newBufferFrom: function(i, u) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(i, u);
            if (typeof i == "number") throw new Error('The "data" argument must not be a number');
            return new Buffer(i, u);
          },
          allocBuffer: function(i) {
            if (Buffer.alloc) return Buffer.alloc(i);
            var u = new Buffer(i);
            return u.fill(0), u;
          },
          isBuffer: function(i) {
            return Buffer.isBuffer(i);
          },
          isStream: function(i) {
            return i && typeof i.on == "function" && typeof i.pause == "function" && typeof i.resume == "function";
          }
        };
      }, {}],
      15: [function(r, n, l) {
        function i(T, S, p) {
          var P, M = s.getTypeOf(S), C = s.extend(p || {}, b);
          C.date = C.date || /* @__PURE__ */ new Date(), C.compression !== null && (C.compression = C.compression.toUpperCase()), typeof C.unixPermissions == "string" && (C.unixPermissions = parseInt(C.unixPermissions, 8)), C.unixPermissions && 16384 & C.unixPermissions && (C.dir = !0), C.dosPermissions && 16 & C.dosPermissions && (C.dir = !0), C.dir && (T = R(T)), C.createFolders && (P = E(T)) && x.call(this, P, !0);
          var $ = M === "string" && C.binary === !1 && C.base64 === !1;
          p && p.binary !== void 0 || (C.binary = !$), (S instanceof v && S.uncompressedSize === 0 || C.dir || !S || S.length === 0) && (C.base64 = !1, C.binary = !0, S = "", C.compression = "STORE", M = "string");
          var ee = null;
          ee = S instanceof v || S instanceof c ? S : w.isNode && w.isStream(S) ? new g(T, S) : s.prepareContent(T, S, C.binary, C.optimizedBinaryString, C.base64);
          var O = new I(T, ee, C);
          this.files[T] = O;
        }
        var u = r("./utf8"), s = r("./utils"), c = r("./stream/GenericWorker"), y = r("./stream/StreamHelper"), b = r("./defaults"), v = r("./compressedObject"), I = r("./zipObject"), m = r("./generate"), w = r("./nodejsUtils"), g = r("./nodejs/NodejsStreamInputAdapter"), E = function(T) {
          T.slice(-1) === "/" && (T = T.substring(0, T.length - 1));
          var S = T.lastIndexOf("/");
          return 0 < S ? T.substring(0, S) : "";
        }, R = function(T) {
          return T.slice(-1) !== "/" && (T += "/"), T;
        }, x = function(T, S) {
          return S = S !== void 0 ? S : b.createFolders, T = R(T), this.files[T] || i.call(this, T, null, {
            dir: !0,
            createFolders: S
          }), this.files[T];
        };
        function _(T) {
          return Object.prototype.toString.call(T) === "[object RegExp]";
        }
        n.exports = {
          load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          forEach: function(T) {
            var S, p, P;
            for (S in this.files) P = this.files[S], (p = S.slice(this.root.length, S.length)) && S.slice(0, this.root.length) === this.root && T(p, P);
          },
          filter: function(T) {
            var S = [];
            return this.forEach(function(p, P) {
              T(p, P) && S.push(P);
            }), S;
          },
          file: function(T, S, p) {
            if (arguments.length !== 1) return T = this.root + T, i.call(this, T, S, p), this;
            if (_(T)) {
              var P = T;
              return this.filter(function(C, $) {
                return !$.dir && P.test(C);
              });
            }
            var M = this.files[this.root + T];
            return M && !M.dir ? M : null;
          },
          folder: function(T) {
            if (!T) return this;
            if (_(T)) return this.filter(function(M, C) {
              return C.dir && T.test(M);
            });
            var S = this.root + T, p = x.call(this, S), P = this.clone();
            return P.root = p.name, P;
          },
          remove: function(T) {
            T = this.root + T;
            var S = this.files[T];
            if (S || (T.slice(-1) !== "/" && (T += "/"), S = this.files[T]), S && !S.dir) delete this.files[T];
            else for (var p = this.filter(function(M, C) {
              return C.name.slice(0, T.length) === T;
            }), P = 0; P < p.length; P++) delete this.files[p[P].name];
            return this;
          },
          generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          generateInternalStream: function(T) {
            var S, p = {};
            try {
              if ((p = s.extend(T || {}, {
                streamFiles: !1,
                compression: "STORE",
                compressionOptions: null,
                type: "",
                platform: "DOS",
                comment: null,
                mimeType: "application/zip",
                encodeFileName: u.utf8encode
              })).type = p.type.toLowerCase(), p.compression = p.compression.toUpperCase(), p.type === "binarystring" && (p.type = "string"), !p.type) throw new Error("No output type specified.");
              s.checkSupport(p.type), p.platform !== "darwin" && p.platform !== "freebsd" && p.platform !== "linux" && p.platform !== "sunos" || (p.platform = "UNIX"), p.platform === "win32" && (p.platform = "DOS");
              var P = p.comment || this.comment || "";
              S = m.generateWorker(this, p, P);
            } catch (M) {
              (S = new c("error")).error(M);
            }
            return new y(S, p.type || "string", p.mimeType);
          },
          generateAsync: function(T, S) {
            return this.generateInternalStream(T).accumulate(S);
          },
          generateNodeStream: function(T, S) {
            return (T = T || {}).type || (T.type = "nodebuffer"), this.generateInternalStream(T).toNodejsStream(S);
          }
        };
      }, {
        "./compressedObject": 2,
        "./defaults": 5,
        "./generate": 9,
        "./nodejs/NodejsStreamInputAdapter": 12,
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./stream/StreamHelper": 29,
        "./utf8": 31,
        "./utils": 32,
        "./zipObject": 35
      }],
      16: [function(r, n, l) {
        n.exports = r("stream");
      }, { stream: void 0 }],
      17: [function(r, n, l) {
        var i = r("./DataReader");
        function u(s) {
          i.call(this, s);
          for (var c = 0; c < this.data.length; c++) s[c] = 255 & s[c];
        }
        r("../utils").inherits(u, i), u.prototype.byteAt = function(s) {
          return this.data[this.zero + s];
        }, u.prototype.lastIndexOfSignature = function(s) {
          for (var c = s.charCodeAt(0), y = s.charCodeAt(1), b = s.charCodeAt(2), v = s.charCodeAt(3), I = this.length - 4; 0 <= I; --I) if (this.data[I] === c && this.data[I + 1] === y && this.data[I + 2] === b && this.data[I + 3] === v) return I - this.zero;
          return -1;
        }, u.prototype.readAndCheckSignature = function(s) {
          var c = s.charCodeAt(0), y = s.charCodeAt(1), b = s.charCodeAt(2), v = s.charCodeAt(3), I = this.readData(4);
          return c === I[0] && y === I[1] && b === I[2] && v === I[3];
        }, u.prototype.readData = function(s) {
          if (this.checkOffset(s), s === 0) return [];
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      18: [function(r, n, l) {
        var i = r("../utils");
        function u(s) {
          this.data = s, this.length = s.length, this.index = 0, this.zero = 0;
        }
        u.prototype = {
          checkOffset: function(s) {
            this.checkIndex(this.index + s);
          },
          checkIndex: function(s) {
            if (this.length < this.zero + s || s < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + s + "). Corrupted zip ?");
          },
          setIndex: function(s) {
            this.checkIndex(s), this.index = s;
          },
          skip: function(s) {
            this.setIndex(this.index + s);
          },
          byteAt: function() {
          },
          readInt: function(s) {
            var c, y = 0;
            for (this.checkOffset(s), c = this.index + s - 1; c >= this.index; c--) y = (y << 8) + this.byteAt(c);
            return this.index += s, y;
          },
          readString: function(s) {
            return i.transformTo("string", this.readData(s));
          },
          readData: function() {
          },
          lastIndexOfSignature: function() {
          },
          readAndCheckSignature: function() {
          },
          readDate: function() {
            var s = this.readInt(4);
            return new Date(Date.UTC(1980 + (s >> 25 & 127), (s >> 21 & 15) - 1, s >> 16 & 31, s >> 11 & 31, s >> 5 & 63, (31 & s) << 1));
          }
        }, n.exports = u;
      }, { "../utils": 32 }],
      19: [function(r, n, l) {
        var i = r("./Uint8ArrayReader");
        function u(s) {
          i.call(this, s);
        }
        r("../utils").inherits(u, i), u.prototype.readData = function(s) {
          this.checkOffset(s);
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./Uint8ArrayReader": 21
      }],
      20: [function(r, n, l) {
        var i = r("./DataReader");
        function u(s) {
          i.call(this, s);
        }
        r("../utils").inherits(u, i), u.prototype.byteAt = function(s) {
          return this.data.charCodeAt(this.zero + s);
        }, u.prototype.lastIndexOfSignature = function(s) {
          return this.data.lastIndexOf(s) - this.zero;
        }, u.prototype.readAndCheckSignature = function(s) {
          return s === this.readData(4);
        }, u.prototype.readData = function(s) {
          this.checkOffset(s);
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      21: [function(r, n, l) {
        var i = r("./ArrayReader");
        function u(s) {
          i.call(this, s);
        }
        r("../utils").inherits(u, i), u.prototype.readData = function(s) {
          if (this.checkOffset(s), s === 0) return /* @__PURE__ */ new Uint8Array(0);
          var c = this.data.subarray(this.zero + this.index, this.zero + this.index + s);
          return this.index += s, c;
        }, n.exports = u;
      }, {
        "../utils": 32,
        "./ArrayReader": 17
      }],
      22: [function(r, n, l) {
        var i = r("../utils"), u = r("../support"), s = r("./ArrayReader"), c = r("./StringReader"), y = r("./NodeBufferReader"), b = r("./Uint8ArrayReader");
        n.exports = function(v) {
          var I = i.getTypeOf(v);
          return i.checkSupport(I), I !== "string" || u.uint8array ? I === "nodebuffer" ? new y(v) : u.uint8array ? new b(i.transformTo("uint8array", v)) : new s(i.transformTo("array", v)) : new c(v);
        };
      }, {
        "../support": 30,
        "../utils": 32,
        "./ArrayReader": 17,
        "./NodeBufferReader": 19,
        "./StringReader": 20,
        "./Uint8ArrayReader": 21
      }],
      23: [function(r, n, l) {
        l.LOCAL_FILE_HEADER = "PK", l.CENTRAL_FILE_HEADER = "PK", l.CENTRAL_DIRECTORY_END = "PK", l.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", l.ZIP64_CENTRAL_DIRECTORY_END = "PK", l.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}],
      24: [function(r, n, l) {
        var i = r("./GenericWorker"), u = r("../utils");
        function s(c) {
          i.call(this, "ConvertWorker to " + c), this.destType = c;
        }
        u.inherits(s, i), s.prototype.processChunk = function(c) {
          this.push({
            data: u.transformTo(this.destType, c.data),
            meta: c.meta
          });
        }, n.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      25: [function(r, n, l) {
        var i = r("./GenericWorker"), u = r("../crc32");
        function s() {
          i.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        r("../utils").inherits(s, i), s.prototype.processChunk = function(c) {
          this.streamInfo.crc32 = u(c.data, this.streamInfo.crc32 || 0), this.push(c);
        }, n.exports = s;
      }, {
        "../crc32": 4,
        "../utils": 32,
        "./GenericWorker": 28
      }],
      26: [function(r, n, l) {
        var i = r("../utils"), u = r("./GenericWorker");
        function s(c) {
          u.call(this, "DataLengthProbe for " + c), this.propName = c, this.withStreamInfo(c, 0);
        }
        i.inherits(s, u), s.prototype.processChunk = function(c) {
          if (c) {
            var y = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = y + c.data.length;
          }
          u.prototype.processChunk.call(this, c);
        }, n.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      27: [function(r, n, l) {
        var i = r("../utils"), u = r("./GenericWorker");
        function s(c) {
          u.call(this, "DataWorker");
          var y = this;
          this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, c.then(function(b) {
            y.dataIsReady = !0, y.data = b, y.max = b && b.length || 0, y.type = i.getTypeOf(b), y.isPaused || y._tickAndRepeat();
          }, function(b) {
            y.error(b);
          });
        }
        i.inherits(s, u), s.prototype.cleanUp = function() {
          u.prototype.cleanUp.call(this), this.data = null;
        }, s.prototype.resume = function() {
          return !!u.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, i.delay(this._tickAndRepeat, [], this)), !0);
        }, s.prototype._tickAndRepeat = function() {
          this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
        }, s.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return !1;
          var c = null, y = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              c = this.data.substring(this.index, y);
              break;
            case "uint8array":
              c = this.data.subarray(this.index, y);
              break;
            case "array":
            case "nodebuffer":
              c = this.data.slice(this.index, y);
          }
          return this.index = y, this.push({
            data: c,
            meta: { percent: this.max ? this.index / this.max * 100 : 0 }
          });
        }, n.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      28: [function(r, n, l) {
        function i(u) {
          this.name = u || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
            data: [],
            end: [],
            error: []
          }, this.previous = null;
        }
        i.prototype = {
          push: function(u) {
            this.emit("data", u);
          },
          end: function() {
            if (this.isFinished) return !1;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = !0;
            } catch (u) {
              this.emit("error", u);
            }
            return !0;
          },
          error: function(u) {
            return !this.isFinished && (this.isPaused ? this.generatedError = u : (this.isFinished = !0, this.emit("error", u), this.previous && this.previous.error(u), this.cleanUp()), !0);
          },
          on: function(u, s) {
            return this._listeners[u].push(s), this;
          },
          cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          },
          emit: function(u, s) {
            if (this._listeners[u]) for (var c = 0; c < this._listeners[u].length; c++) this._listeners[u][c].call(this, s);
          },
          pipe: function(u) {
            return u.registerPrevious(this);
          },
          registerPrevious: function(u) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = u.streamInfo, this.mergeStreamInfo(), this.previous = u;
            var s = this;
            return u.on("data", function(c) {
              s.processChunk(c);
            }), u.on("end", function() {
              s.end();
            }), u.on("error", function(c) {
              s.error(c);
            }), this;
          },
          pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
          },
          resume: function() {
            if (!this.isPaused || this.isFinished) return !1;
            var u = this.isPaused = !1;
            return this.generatedError && (this.error(this.generatedError), u = !0), this.previous && this.previous.resume(), !u;
          },
          flush: function() {
          },
          processChunk: function(u) {
            this.push(u);
          },
          withStreamInfo: function(u, s) {
            return this.extraStreamInfo[u] = s, this.mergeStreamInfo(), this;
          },
          mergeStreamInfo: function() {
            for (var u in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, u) && (this.streamInfo[u] = this.extraStreamInfo[u]);
          },
          lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = !0, this.previous && this.previous.lock();
          },
          toString: function() {
            var u = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + u : u;
          }
        }, n.exports = i;
      }, {}],
      29: [function(r, n, l) {
        var i = r("../utils"), u = r("./ConvertWorker"), s = r("./GenericWorker"), c = r("../base64"), y = r("../support"), b = r("../external"), v = null;
        if (y.nodestream) try {
          v = r("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function I(w, g) {
          return new b.Promise(function(E, R) {
            var x = [], _ = w._internalType, T = w._outputType, S = w._mimeType;
            w.on("data", function(p, P) {
              x.push(p), g && g(P);
            }).on("error", function(p) {
              x = [], R(p);
            }).on("end", function() {
              try {
                E((function(p, P, M) {
                  switch (p) {
                    case "blob":
                      return i.newBlob(i.transformTo("arraybuffer", P), M);
                    case "base64":
                      return c.encode(P);
                    default:
                      return i.transformTo(p, P);
                  }
                })(T, (function(p, P) {
                  var M, C = 0, $ = null, ee = 0;
                  for (M = 0; M < P.length; M++) ee += P[M].length;
                  switch (p) {
                    case "string":
                      return P.join("");
                    case "array":
                      return Array.prototype.concat.apply([], P);
                    case "uint8array":
                      for ($ = new Uint8Array(ee), M = 0; M < P.length; M++) $.set(P[M], C), C += P[M].length;
                      return $;
                    case "nodebuffer":
                      return Buffer.concat(P);
                    default:
                      throw new Error("concat : unsupported type '" + p + "'");
                  }
                })(_, x), S));
              } catch (p) {
                R(p);
              }
              x = [];
            }).resume();
          });
        }
        function m(w, g, E) {
          var R = g;
          switch (g) {
            case "blob":
            case "arraybuffer":
              R = "uint8array";
              break;
            case "base64":
              R = "string";
          }
          try {
            this._internalType = R, this._outputType = g, this._mimeType = E, i.checkSupport(R), this._worker = w.pipe(new u(R)), w.lock();
          } catch (x) {
            this._worker = new s("error"), this._worker.error(x);
          }
        }
        m.prototype = {
          accumulate: function(w) {
            return I(this, w);
          },
          on: function(w, g) {
            var E = this;
            return w === "data" ? this._worker.on(w, function(R) {
              g.call(E, R.data, R.meta);
            }) : this._worker.on(w, function() {
              i.delay(g, arguments, E);
            }), this;
          },
          resume: function() {
            return i.delay(this._worker.resume, [], this._worker), this;
          },
          pause: function() {
            return this._worker.pause(), this;
          },
          toNodejsStream: function(w) {
            if (i.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
            return new v(this, { objectMode: this._outputType !== "nodebuffer" }, w);
          }
        }, n.exports = m;
      }, {
        "../base64": 1,
        "../external": 6,
        "../nodejs/NodejsStreamOutputAdapter": 13,
        "../support": 30,
        "../utils": 32,
        "./ConvertWorker": 24,
        "./GenericWorker": 28
      }],
      30: [function(r, n, l) {
        if (l.base64 = !0, l.array = !0, l.string = !0, l.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", l.nodebuffer = typeof Buffer < "u", l.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") l.blob = !1;
        else {
          var i = /* @__PURE__ */ new ArrayBuffer(0);
          try {
            l.blob = new Blob([i], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var u = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              u.append(i), l.blob = u.getBlob("application/zip").size === 0;
            } catch {
              l.blob = !1;
            }
          }
        }
        try {
          l.nodestream = !!r("readable-stream").Readable;
        } catch {
          l.nodestream = !1;
        }
      }, { "readable-stream": 16 }],
      31: [function(r, n, l) {
        for (var i = r("./utils"), u = r("./support"), s = r("./nodejsUtils"), c = r("./stream/GenericWorker"), y = new Array(256), b = 0; b < 256; b++) y[b] = 252 <= b ? 6 : 248 <= b ? 5 : 240 <= b ? 4 : 224 <= b ? 3 : 192 <= b ? 2 : 1;
        y[254] = y[254] = 1;
        function v() {
          c.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function I() {
          c.call(this, "utf-8 encode");
        }
        l.utf8encode = function(m) {
          return u.nodebuffer ? s.newBufferFrom(m, "utf-8") : (function(w) {
            var g, E, R, x, _, T = w.length, S = 0;
            for (x = 0; x < T; x++) (64512 & (E = w.charCodeAt(x))) == 55296 && x + 1 < T && (64512 & (R = w.charCodeAt(x + 1))) == 56320 && (E = 65536 + (E - 55296 << 10) + (R - 56320), x++), S += E < 128 ? 1 : E < 2048 ? 2 : E < 65536 ? 3 : 4;
            for (g = u.uint8array ? new Uint8Array(S) : new Array(S), x = _ = 0; _ < S; x++) (64512 & (E = w.charCodeAt(x))) == 55296 && x + 1 < T && (64512 & (R = w.charCodeAt(x + 1))) == 56320 && (E = 65536 + (E - 55296 << 10) + (R - 56320), x++), E < 128 ? g[_++] = E : (E < 2048 ? g[_++] = 192 | E >>> 6 : (E < 65536 ? g[_++] = 224 | E >>> 12 : (g[_++] = 240 | E >>> 18, g[_++] = 128 | E >>> 12 & 63), g[_++] = 128 | E >>> 6 & 63), g[_++] = 128 | 63 & E);
            return g;
          })(m);
        }, l.utf8decode = function(m) {
          return u.nodebuffer ? i.transformTo("nodebuffer", m).toString("utf-8") : (function(w) {
            var g, E, R, x, _ = w.length, T = new Array(2 * _);
            for (g = E = 0; g < _; ) if ((R = w[g++]) < 128) T[E++] = R;
            else if (4 < (x = y[R])) T[E++] = 65533, g += x - 1;
            else {
              for (R &= x === 2 ? 31 : x === 3 ? 15 : 7; 1 < x && g < _; ) R = R << 6 | 63 & w[g++], x--;
              1 < x ? T[E++] = 65533 : R < 65536 ? T[E++] = R : (R -= 65536, T[E++] = 55296 | R >> 10 & 1023, T[E++] = 56320 | 1023 & R);
            }
            return T.length !== E && (T.subarray ? T = T.subarray(0, E) : T.length = E), i.applyFromCharCode(T);
          })(m = i.transformTo(u.uint8array ? "uint8array" : "array", m));
        }, i.inherits(v, c), v.prototype.processChunk = function(m) {
          var w = i.transformTo(u.uint8array ? "uint8array" : "array", m.data);
          if (this.leftOver && this.leftOver.length) {
            if (u.uint8array) {
              var g = w;
              (w = new Uint8Array(g.length + this.leftOver.length)).set(this.leftOver, 0), w.set(g, this.leftOver.length);
            } else w = this.leftOver.concat(w);
            this.leftOver = null;
          }
          var E = (function(x, _) {
            var T;
            for ((_ = _ || x.length) > x.length && (_ = x.length), T = _ - 1; 0 <= T && (192 & x[T]) == 128; ) T--;
            return T < 0 || T === 0 ? _ : T + y[x[T]] > _ ? T : _;
          })(w), R = w;
          E !== w.length && (u.uint8array ? (R = w.subarray(0, E), this.leftOver = w.subarray(E, w.length)) : (R = w.slice(0, E), this.leftOver = w.slice(E, w.length))), this.push({
            data: l.utf8decode(R),
            meta: m.meta
          });
        }, v.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({
            data: l.utf8decode(this.leftOver),
            meta: {}
          }), this.leftOver = null);
        }, l.Utf8DecodeWorker = v, i.inherits(I, c), I.prototype.processChunk = function(m) {
          this.push({
            data: l.utf8encode(m.data),
            meta: m.meta
          });
        }, l.Utf8EncodeWorker = I;
      }, {
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./support": 30,
        "./utils": 32
      }],
      32: [function(r, n, l) {
        var i = r("./support"), u = r("./base64"), s = r("./nodejsUtils"), c = r("./external");
        function y(g) {
          return g;
        }
        function b(g, E) {
          for (var R = 0; R < g.length; ++R) E[R] = 255 & g.charCodeAt(R);
          return E;
        }
        r("setimmediate"), l.newBlob = function(g, E) {
          l.checkSupport("blob");
          try {
            return new Blob([g], { type: E });
          } catch {
            try {
              var R = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return R.append(g), R.getBlob(E);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var v = {
          stringifyByChunk: function(g, E, R) {
            var x = [], _ = 0, T = g.length;
            if (T <= R) return String.fromCharCode.apply(null, g);
            for (; _ < T; ) E === "array" || E === "nodebuffer" ? x.push(String.fromCharCode.apply(null, g.slice(_, Math.min(_ + R, T)))) : x.push(String.fromCharCode.apply(null, g.subarray(_, Math.min(_ + R, T)))), _ += R;
            return x.join("");
          },
          stringifyByChar: function(g) {
            for (var E = "", R = 0; R < g.length; R++) E += String.fromCharCode(g[R]);
            return E;
          },
          applyCanBeUsed: {
            uint8array: (function() {
              try {
                return i.uint8array && String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1)).length === 1;
              } catch {
                return !1;
              }
            })(),
            nodebuffer: (function() {
              try {
                return i.nodebuffer && String.fromCharCode.apply(null, s.allocBuffer(1)).length === 1;
              } catch {
                return !1;
              }
            })()
          }
        };
        function I(g) {
          var E = 65536, R = l.getTypeOf(g), x = !0;
          if (R === "uint8array" ? x = v.applyCanBeUsed.uint8array : R === "nodebuffer" && (x = v.applyCanBeUsed.nodebuffer), x) for (; 1 < E; ) try {
            return v.stringifyByChunk(g, R, E);
          } catch {
            E = Math.floor(E / 2);
          }
          return v.stringifyByChar(g);
        }
        function m(g, E) {
          for (var R = 0; R < g.length; R++) E[R] = g[R];
          return E;
        }
        l.applyFromCharCode = I;
        var w = {};
        w.string = {
          string: y,
          array: function(g) {
            return b(g, new Array(g.length));
          },
          arraybuffer: function(g) {
            return w.string.uint8array(g).buffer;
          },
          uint8array: function(g) {
            return b(g, new Uint8Array(g.length));
          },
          nodebuffer: function(g) {
            return b(g, s.allocBuffer(g.length));
          }
        }, w.array = {
          string: I,
          array: y,
          arraybuffer: function(g) {
            return new Uint8Array(g).buffer;
          },
          uint8array: function(g) {
            return new Uint8Array(g);
          },
          nodebuffer: function(g) {
            return s.newBufferFrom(g);
          }
        }, w.arraybuffer = {
          string: function(g) {
            return I(new Uint8Array(g));
          },
          array: function(g) {
            return m(new Uint8Array(g), new Array(g.byteLength));
          },
          arraybuffer: y,
          uint8array: function(g) {
            return new Uint8Array(g);
          },
          nodebuffer: function(g) {
            return s.newBufferFrom(new Uint8Array(g));
          }
        }, w.uint8array = {
          string: I,
          array: function(g) {
            return m(g, new Array(g.length));
          },
          arraybuffer: function(g) {
            return g.buffer;
          },
          uint8array: y,
          nodebuffer: function(g) {
            return s.newBufferFrom(g);
          }
        }, w.nodebuffer = {
          string: I,
          array: function(g) {
            return m(g, new Array(g.length));
          },
          arraybuffer: function(g) {
            return w.nodebuffer.uint8array(g).buffer;
          },
          uint8array: function(g) {
            return m(g, new Uint8Array(g.length));
          },
          nodebuffer: y
        }, l.transformTo = function(g, E) {
          return E = E || "", g ? (l.checkSupport(g), w[l.getTypeOf(E)][g](E)) : E;
        }, l.resolve = function(g) {
          for (var E = g.split("/"), R = [], x = 0; x < E.length; x++) {
            var _ = E[x];
            _ === "." || _ === "" && x !== 0 && x !== E.length - 1 || (_ === ".." ? R.pop() : R.push(_));
          }
          return R.join("/");
        }, l.getTypeOf = function(g) {
          if (typeof g == "string") return "string";
          var E = Object.prototype.toString.call(g);
          return E === "[object Array]" ? "array" : i.nodebuffer && s.isBuffer(g) ? "nodebuffer" : i.uint8array && E === "[object Uint8Array]" ? "uint8array" : i.arraybuffer && E === "[object ArrayBuffer]" ? "arraybuffer" : void 0;
        }, l.checkSupport = function(g) {
          if (!i[g.toLowerCase()]) throw new Error(g + " is not supported by this platform");
        }, l.MAX_VALUE_16BITS = 65535, l.MAX_VALUE_32BITS = -1, l.pretty = function(g) {
          var E, R, x = "";
          for (R = 0; R < (g || "").length; R++) x += "\\x" + ((E = g.charCodeAt(R)) < 16 ? "0" : "") + E.toString(16).toUpperCase();
          return x;
        }, l.delay = function(g, E, R) {
          setImmediate(function() {
            g.apply(R || null, E || []);
          });
        }, l.inherits = function(g, E) {
          function R() {
          }
          R.prototype = E.prototype, g.prototype = new R();
        }, l.extend = function() {
          var g, E, R = {};
          for (g = 0; g < arguments.length; g++) for (E in arguments[g]) Object.prototype.hasOwnProperty.call(arguments[g], E) && R[E] === void 0 && (R[E] = arguments[g][E]);
          return R;
        }, l.prepareContent = function(g, E, R, x, _) {
          return c.Promise.resolve(E).then(function(T) {
            return i.blob && (T instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(T)) !== -1) ? Blob.prototype.arrayBuffer !== void 0 ? T.arrayBuffer() : typeof FileReader < "u" ? new c.Promise(function(S, p) {
              var P = new FileReader();
              P.onload = function(M) {
                S(M.target.result);
              }, P.onerror = function(M) {
                p(M.target.error);
              }, P.readAsArrayBuffer(T);
            }) : c.Promise.reject(/* @__PURE__ */ new Error(g + " is a Blob, but we have no way of reading it.")) : T;
          }).then(function(T) {
            var S = l.getTypeOf(T);
            return S ? (S === "arraybuffer" ? T = l.transformTo("uint8array", T) : S === "string" && (_ ? T = u.decode(T) : R && x !== !0 && (T = (function(p) {
              return b(p, i.uint8array ? new Uint8Array(p.length) : new Array(p.length));
            })(T))), T) : c.Promise.reject(/* @__PURE__ */ new Error("Can't read the data of '" + g + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, {
        "./base64": 1,
        "./external": 6,
        "./nodejsUtils": 14,
        "./support": 30,
        setimmediate: 54
      }],
      33: [function(r, n, l) {
        var i = r("./reader/readerFor"), u = r("./utils"), s = r("./signature"), c = r("./zipEntry"), y = r("./support");
        function b(v) {
          this.files = [], this.loadOptions = v;
        }
        b.prototype = {
          checkSignature: function(v) {
            if (!this.reader.readAndCheckSignature(v)) {
              this.reader.index -= 4;
              var I = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + u.pretty(I) + ", expected " + u.pretty(v) + ")");
            }
          },
          isSignature: function(v, I) {
            var m = this.reader.index;
            this.reader.setIndex(v);
            var w = this.reader.readString(4) === I;
            return this.reader.setIndex(m), w;
          },
          readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var v = this.reader.readData(this.zipCommentLength), I = y.uint8array ? "uint8array" : "array", m = u.transformTo(I, v);
            this.zipComment = this.loadOptions.decodeFileName(m);
          },
          readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var v, I, m, w = this.zip64EndOfCentralSize - 44; 0 < w; ) v = this.reader.readInt(2), I = this.reader.readInt(4), m = this.reader.readData(I), this.zip64ExtensibleData[v] = {
              id: v,
              length: I,
              value: m
            };
          },
          readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          },
          readLocalFiles: function() {
            for (var v = 0, I; v < this.files.length; v++) I = this.files[v], this.reader.setIndex(I.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), I.readLocalPart(this.reader), I.handleUTF8(), I.processAttributes();
          },
          readCentralDir: function() {
            var v;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (v = new c({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(v);
            if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          },
          readEndOfCentral: function() {
            var v = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
            if (v < 0) throw this.isSignature(0, s.LOCAL_FILE_HEADER) ? /* @__PURE__ */ new Error("Corrupted zip: can't find end of central directory") : /* @__PURE__ */ new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            this.reader.setIndex(v);
            var I = v;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === u.MAX_VALUE_16BITS || this.diskWithCentralDirStart === u.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === u.MAX_VALUE_16BITS || this.centralDirRecords === u.MAX_VALUE_16BITS || this.centralDirSize === u.MAX_VALUE_32BITS || this.centralDirOffset === u.MAX_VALUE_32BITS) {
              if (this.zip64 = !0, (v = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(v), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var m = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (m += 20, m += 12 + this.zip64EndOfCentralSize);
            var w = I - m;
            if (0 < w) this.isSignature(I, s.CENTRAL_FILE_HEADER) || (this.reader.zero = w);
            else if (w < 0) throw new Error("Corrupted zip: missing " + Math.abs(w) + " bytes.");
          },
          prepareReader: function(v) {
            this.reader = i(v);
          },
          load: function(v) {
            this.prepareReader(v), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          }
        }, n.exports = b;
      }, {
        "./reader/readerFor": 22,
        "./signature": 23,
        "./support": 30,
        "./utils": 32,
        "./zipEntry": 34
      }],
      34: [function(r, n, l) {
        var i = r("./reader/readerFor"), u = r("./utils"), s = r("./compressedObject"), c = r("./crc32"), y = r("./utf8"), b = r("./compressions"), v = r("./support");
        function I(m, w) {
          this.options = m, this.loadOptions = w;
        }
        I.prototype = {
          isEncrypted: function() {
            return (1 & this.bitFlag) == 1;
          },
          useUTF8: function() {
            return (2048 & this.bitFlag) == 2048;
          },
          readLocalPart: function(m) {
            var w, g;
            if (m.skip(22), this.fileNameLength = m.readInt(2), g = m.readInt(2), this.fileName = m.readData(this.fileNameLength), m.skip(g), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if ((w = (function(E) {
              for (var R in b) if (Object.prototype.hasOwnProperty.call(b, R) && b[R].magic === E) return b[R];
              return null;
            })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + u.pretty(this.compressionMethod) + " unknown (inner file : " + u.transformTo("string", this.fileName) + ")");
            this.decompressed = new s(this.compressedSize, this.uncompressedSize, this.crc32, w, m.readData(this.compressedSize));
          },
          readCentralPart: function(m) {
            this.versionMadeBy = m.readInt(2), m.skip(2), this.bitFlag = m.readInt(2), this.compressionMethod = m.readString(2), this.date = m.readDate(), this.crc32 = m.readInt(4), this.compressedSize = m.readInt(4), this.uncompressedSize = m.readInt(4);
            var w = m.readInt(2);
            if (this.extraFieldsLength = m.readInt(2), this.fileCommentLength = m.readInt(2), this.diskNumberStart = m.readInt(2), this.internalFileAttributes = m.readInt(2), this.externalFileAttributes = m.readInt(4), this.localHeaderOffset = m.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            m.skip(w), this.readExtraFields(m), this.parseZIP64ExtraField(m), this.fileComment = m.readData(this.fileCommentLength);
          },
          processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var m = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), m == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), m == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
          },
          parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var m = i(this.extraFields[1].value);
              this.uncompressedSize === u.MAX_VALUE_32BITS && (this.uncompressedSize = m.readInt(8)), this.compressedSize === u.MAX_VALUE_32BITS && (this.compressedSize = m.readInt(8)), this.localHeaderOffset === u.MAX_VALUE_32BITS && (this.localHeaderOffset = m.readInt(8)), this.diskNumberStart === u.MAX_VALUE_32BITS && (this.diskNumberStart = m.readInt(4));
            }
          },
          readExtraFields: function(m) {
            var w, g, E, R = m.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); m.index + 4 < R; ) w = m.readInt(2), g = m.readInt(2), E = m.readData(g), this.extraFields[w] = {
              id: w,
              length: g,
              value: E
            };
            m.setIndex(R);
          },
          handleUTF8: function() {
            var m = v.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = y.utf8decode(this.fileName), this.fileCommentStr = y.utf8decode(this.fileComment);
            else {
              var w = this.findExtraFieldUnicodePath();
              if (w !== null) this.fileNameStr = w;
              else {
                var g = u.transformTo(m, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(g);
              }
              var E = this.findExtraFieldUnicodeComment();
              if (E !== null) this.fileCommentStr = E;
              else {
                var R = u.transformTo(m, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(R);
              }
            }
          },
          findExtraFieldUnicodePath: function() {
            var m = this.extraFields[28789];
            if (m) {
              var w = i(m.value);
              return w.readInt(1) !== 1 || c(this.fileName) !== w.readInt(4) ? null : y.utf8decode(w.readData(m.length - 5));
            }
            return null;
          },
          findExtraFieldUnicodeComment: function() {
            var m = this.extraFields[25461];
            if (m) {
              var w = i(m.value);
              return w.readInt(1) !== 1 || c(this.fileComment) !== w.readInt(4) ? null : y.utf8decode(w.readData(m.length - 5));
            }
            return null;
          }
        }, n.exports = I;
      }, {
        "./compressedObject": 2,
        "./compressions": 3,
        "./crc32": 4,
        "./reader/readerFor": 22,
        "./support": 30,
        "./utf8": 31,
        "./utils": 32
      }],
      35: [function(r, n, l) {
        function i(w, g, E) {
          this.name = w, this.dir = E.dir, this.date = E.date, this.comment = E.comment, this.unixPermissions = E.unixPermissions, this.dosPermissions = E.dosPermissions, this._data = g, this._dataBinary = E.binary, this.options = {
            compression: E.compression,
            compressionOptions: E.compressionOptions
          };
        }
        var u = r("./stream/StreamHelper"), s = r("./stream/DataWorker"), c = r("./utf8"), y = r("./compressedObject"), b = r("./stream/GenericWorker");
        i.prototype = {
          internalStream: function(w) {
            var g = null, E = "string";
            try {
              if (!w) throw new Error("No output type specified.");
              var R = (E = w.toLowerCase()) === "string" || E === "text";
              E !== "binarystring" && E !== "text" || (E = "string"), g = this._decompressWorker();
              var x = !this._dataBinary;
              x && !R && (g = g.pipe(new c.Utf8EncodeWorker())), !x && R && (g = g.pipe(new c.Utf8DecodeWorker()));
            } catch (_) {
              (g = new b("error")).error(_);
            }
            return new u(g, E, "");
          },
          async: function(w, g) {
            return this.internalStream(w).accumulate(g);
          },
          nodeStream: function(w, g) {
            return this.internalStream(w || "nodebuffer").toNodejsStream(g);
          },
          _compressWorker: function(w, g) {
            if (this._data instanceof y && this._data.compression.magic === w.magic) return this._data.getCompressedWorker();
            var E = this._decompressWorker();
            return this._dataBinary || (E = E.pipe(new c.Utf8EncodeWorker())), y.createWorkerFrom(E, w, g);
          },
          _decompressWorker: function() {
            return this._data instanceof y ? this._data.getContentWorker() : this._data instanceof b ? this._data : new s(this._data);
          }
        };
        for (var v = [
          "asText",
          "asBinary",
          "asNodeBuffer",
          "asUint8Array",
          "asArrayBuffer"
        ], I = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, m = 0; m < v.length; m++) i.prototype[v[m]] = I;
        n.exports = i;
      }, {
        "./compressedObject": 2,
        "./stream/DataWorker": 27,
        "./stream/GenericWorker": 28,
        "./stream/StreamHelper": 29,
        "./utf8": 31
      }],
      36: [function(r, n, l) {
        (function(i) {
          var u, s, c = i.MutationObserver || i.WebKitMutationObserver;
          if (c) {
            var y = 0, b = new c(w), v = i.document.createTextNode("");
            b.observe(v, { characterData: !0 }), u = function() {
              v.data = y = ++y % 2;
            };
          } else if (i.setImmediate || i.MessageChannel === void 0) u = "document" in i && "onreadystatechange" in i.document.createElement("script") ? function() {
            var g = i.document.createElement("script");
            g.onreadystatechange = function() {
              w(), g.onreadystatechange = null, g.parentNode.removeChild(g), g = null;
            }, i.document.documentElement.appendChild(g);
          } : function() {
            setTimeout(w, 0);
          };
          else {
            var I = new i.MessageChannel();
            I.port1.onmessage = w, u = function() {
              I.port2.postMessage(0);
            };
          }
          var m = [];
          function w() {
            var g, E;
            s = !0;
            for (var R = m.length; R; ) {
              for (E = m, m = [], g = -1; ++g < R; ) E[g]();
              R = m.length;
            }
            s = !1;
          }
          n.exports = function(g) {
            m.push(g) !== 1 || s || u();
          };
        }).call(this, typeof Re < "u" ? Re : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}],
      37: [function(r, n, l) {
        var i = r("immediate");
        function u() {
        }
        var s = {}, c = ["REJECTED"], y = ["FULFILLED"], b = ["PENDING"];
        function v(R) {
          if (typeof R != "function") throw new TypeError("resolver must be a function");
          this.state = b, this.queue = [], this.outcome = void 0, R !== u && g(this, R);
        }
        function I(R, x, _) {
          this.promise = R, typeof x == "function" && (this.onFulfilled = x, this.callFulfilled = this.otherCallFulfilled), typeof _ == "function" && (this.onRejected = _, this.callRejected = this.otherCallRejected);
        }
        function m(R, x, _) {
          i(function() {
            var T;
            try {
              T = x(_);
            } catch (S) {
              return s.reject(R, S);
            }
            T === R ? s.reject(R, /* @__PURE__ */ new TypeError("Cannot resolve promise with itself")) : s.resolve(R, T);
          });
        }
        function w(R) {
          var x = R && R.then;
          if (R && (typeof R == "object" || typeof R == "function") && typeof x == "function") return function() {
            x.apply(R, arguments);
          };
        }
        function g(R, x) {
          var _ = !1;
          function T(P) {
            _ || (_ = !0, s.reject(R, P));
          }
          function S(P) {
            _ || (_ = !0, s.resolve(R, P));
          }
          var p = E(function() {
            x(S, T);
          });
          p.status === "error" && T(p.value);
        }
        function E(R, x) {
          var _ = {};
          try {
            _.value = R(x), _.status = "success";
          } catch (T) {
            _.status = "error", _.value = T;
          }
          return _;
        }
        (n.exports = v).prototype.finally = function(R) {
          if (typeof R != "function") return this;
          var x = this.constructor;
          return this.then(function(_) {
            return x.resolve(R()).then(function() {
              return _;
            });
          }, function(_) {
            return x.resolve(R()).then(function() {
              throw _;
            });
          });
        }, v.prototype.catch = function(R) {
          return this.then(null, R);
        }, v.prototype.then = function(R, x) {
          if (typeof R != "function" && this.state === y || typeof x != "function" && this.state === c) return this;
          var _ = new this.constructor(u);
          return this.state !== b ? m(_, this.state === y ? R : x, this.outcome) : this.queue.push(new I(_, R, x)), _;
        }, I.prototype.callFulfilled = function(R) {
          s.resolve(this.promise, R);
        }, I.prototype.otherCallFulfilled = function(R) {
          m(this.promise, this.onFulfilled, R);
        }, I.prototype.callRejected = function(R) {
          s.reject(this.promise, R);
        }, I.prototype.otherCallRejected = function(R) {
          m(this.promise, this.onRejected, R);
        }, s.resolve = function(R, x) {
          var _ = E(w, x);
          if (_.status === "error") return s.reject(R, _.value);
          var T = _.value;
          if (T) g(R, T);
          else {
            R.state = y, R.outcome = x;
            for (var S = -1, p = R.queue.length; ++S < p; ) R.queue[S].callFulfilled(x);
          }
          return R;
        }, s.reject = function(R, x) {
          R.state = c, R.outcome = x;
          for (var _ = -1, T = R.queue.length; ++_ < T; ) R.queue[_].callRejected(x);
          return R;
        }, v.resolve = function(R) {
          return R instanceof this ? R : s.resolve(new this(u), R);
        }, v.reject = function(R) {
          var x = new this(u);
          return s.reject(x, R);
        }, v.all = function(R) {
          var x = this;
          if (Object.prototype.toString.call(R) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var _ = R.length, T = !1;
          if (!_) return this.resolve([]);
          for (var S = new Array(_), p = 0, P = -1, M = new this(u); ++P < _; ) C(R[P], P);
          return M;
          function C($, ee) {
            x.resolve($).then(function(O) {
              S[ee] = O, ++p !== _ || T || (T = !0, s.resolve(M, S));
            }, function(O) {
              T || (T = !0, s.reject(M, O));
            });
          }
        }, v.race = function(R) {
          var x = this;
          if (Object.prototype.toString.call(R) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var _ = R.length, T = !1;
          if (!_) return this.resolve([]);
          for (var S = -1, p = new this(u); ++S < _; ) P = R[S], x.resolve(P).then(function(M) {
            T || (T = !0, s.resolve(p, M));
          }, function(M) {
            T || (T = !0, s.reject(p, M));
          });
          var P;
          return p;
        };
      }, { immediate: 36 }],
      38: [function(r, n, l) {
        var i = {};
        (0, r("./lib/utils/common").assign)(i, r("./lib/deflate"), r("./lib/inflate"), r("./lib/zlib/constants")), n.exports = i;
      }, {
        "./lib/deflate": 39,
        "./lib/inflate": 40,
        "./lib/utils/common": 41,
        "./lib/zlib/constants": 44
      }],
      39: [function(r, n, l) {
        var i = r("./zlib/deflate"), u = r("./utils/common"), s = r("./utils/strings"), c = r("./zlib/messages"), y = r("./zlib/zstream"), b = Object.prototype.toString, v = 0, I = -1, m = 0, w = 8;
        function g(R) {
          if (!(this instanceof g)) return new g(R);
          this.options = u.assign({
            level: I,
            method: w,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: m,
            to: ""
          }, R || {});
          var x = this.options;
          x.raw && 0 < x.windowBits ? x.windowBits = -x.windowBits : x.gzip && 0 < x.windowBits && x.windowBits < 16 && (x.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new y(), this.strm.avail_out = 0;
          var _ = i.deflateInit2(this.strm, x.level, x.method, x.windowBits, x.memLevel, x.strategy);
          if (_ !== v) throw new Error(c[_]);
          if (x.header && i.deflateSetHeader(this.strm, x.header), x.dictionary) {
            var T = typeof x.dictionary == "string" ? s.string2buf(x.dictionary) : b.call(x.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(x.dictionary) : x.dictionary;
            if ((_ = i.deflateSetDictionary(this.strm, T)) !== v) throw new Error(c[_]);
            this._dict_set = !0;
          }
        }
        function E(R, x) {
          var _ = new g(x);
          if (_.push(R, !0), _.err) throw _.msg || c[_.err];
          return _.result;
        }
        g.prototype.push = function(R, x) {
          var _, T, S = this.strm, p = this.options.chunkSize;
          if (this.ended) return !1;
          T = x === ~~x ? x : x === !0 ? 4 : 0, typeof R == "string" ? S.input = s.string2buf(R) : b.call(R) === "[object ArrayBuffer]" ? S.input = new Uint8Array(R) : S.input = R, S.next_in = 0, S.avail_in = S.input.length;
          do {
            if (S.avail_out === 0 && (S.output = new u.Buf8(p), S.next_out = 0, S.avail_out = p), (_ = i.deflate(S, T)) !== 1 && _ !== v) return this.onEnd(_), !(this.ended = !0);
            S.avail_out !== 0 && (S.avail_in !== 0 || T !== 4 && T !== 2) || (this.options.to === "string" ? this.onData(s.buf2binstring(u.shrinkBuf(S.output, S.next_out))) : this.onData(u.shrinkBuf(S.output, S.next_out)));
          } while ((0 < S.avail_in || S.avail_out === 0) && _ !== 1);
          return T === 4 ? (_ = i.deflateEnd(this.strm), this.onEnd(_), this.ended = !0, _ === v) : T !== 2 || (this.onEnd(v), !(S.avail_out = 0));
        }, g.prototype.onData = function(R) {
          this.chunks.push(R);
        }, g.prototype.onEnd = function(R) {
          R === v && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = R, this.msg = this.strm.msg;
        }, l.Deflate = g, l.deflate = E, l.deflateRaw = function(R, x) {
          return (x = x || {}).raw = !0, E(R, x);
        }, l.gzip = function(R, x) {
          return (x = x || {}).gzip = !0, E(R, x);
        };
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/deflate": 46,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      40: [function(r, n, l) {
        var i = r("./zlib/inflate"), u = r("./utils/common"), s = r("./utils/strings"), c = r("./zlib/constants"), y = r("./zlib/messages"), b = r("./zlib/zstream"), v = r("./zlib/gzheader"), I = Object.prototype.toString;
        function m(g) {
          if (!(this instanceof m)) return new m(g);
          this.options = u.assign({
            chunkSize: 16384,
            windowBits: 0,
            to: ""
          }, g || {});
          var E = this.options;
          E.raw && 0 <= E.windowBits && E.windowBits < 16 && (E.windowBits = -E.windowBits, E.windowBits === 0 && (E.windowBits = -15)), !(0 <= E.windowBits && E.windowBits < 16) || g && g.windowBits || (E.windowBits += 32), 15 < E.windowBits && E.windowBits < 48 && (15 & E.windowBits) == 0 && (E.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new b(), this.strm.avail_out = 0;
          var R = i.inflateInit2(this.strm, E.windowBits);
          if (R !== c.Z_OK) throw new Error(y[R]);
          this.header = new v(), i.inflateGetHeader(this.strm, this.header);
        }
        function w(g, E) {
          var R = new m(E);
          if (R.push(g, !0), R.err) throw R.msg || y[R.err];
          return R.result;
        }
        m.prototype.push = function(g, E) {
          var R, x, _, T, S, p, P = this.strm, M = this.options.chunkSize, C = this.options.dictionary, $ = !1;
          if (this.ended) return !1;
          x = E === ~~E ? E : E === !0 ? c.Z_FINISH : c.Z_NO_FLUSH, typeof g == "string" ? P.input = s.binstring2buf(g) : I.call(g) === "[object ArrayBuffer]" ? P.input = new Uint8Array(g) : P.input = g, P.next_in = 0, P.avail_in = P.input.length;
          do {
            if (P.avail_out === 0 && (P.output = new u.Buf8(M), P.next_out = 0, P.avail_out = M), (R = i.inflate(P, c.Z_NO_FLUSH)) === c.Z_NEED_DICT && C && (p = typeof C == "string" ? s.string2buf(C) : I.call(C) === "[object ArrayBuffer]" ? new Uint8Array(C) : C, R = i.inflateSetDictionary(this.strm, p)), R === c.Z_BUF_ERROR && $ === !0 && (R = c.Z_OK, $ = !1), R !== c.Z_STREAM_END && R !== c.Z_OK) return this.onEnd(R), !(this.ended = !0);
            P.next_out && (P.avail_out !== 0 && R !== c.Z_STREAM_END && (P.avail_in !== 0 || x !== c.Z_FINISH && x !== c.Z_SYNC_FLUSH) || (this.options.to === "string" ? (_ = s.utf8border(P.output, P.next_out), T = P.next_out - _, S = s.buf2string(P.output, _), P.next_out = T, P.avail_out = M - T, T && u.arraySet(P.output, P.output, _, T, 0), this.onData(S)) : this.onData(u.shrinkBuf(P.output, P.next_out)))), P.avail_in === 0 && P.avail_out === 0 && ($ = !0);
          } while ((0 < P.avail_in || P.avail_out === 0) && R !== c.Z_STREAM_END);
          return R === c.Z_STREAM_END && (x = c.Z_FINISH), x === c.Z_FINISH ? (R = i.inflateEnd(this.strm), this.onEnd(R), this.ended = !0, R === c.Z_OK) : x !== c.Z_SYNC_FLUSH || (this.onEnd(c.Z_OK), !(P.avail_out = 0));
        }, m.prototype.onData = function(g) {
          this.chunks.push(g);
        }, m.prototype.onEnd = function(g) {
          g === c.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = g, this.msg = this.strm.msg;
        }, l.Inflate = m, l.inflate = w, l.inflateRaw = function(g, E) {
          return (E = E || {}).raw = !0, w(g, E);
        }, l.ungzip = w;
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/constants": 44,
        "./zlib/gzheader": 47,
        "./zlib/inflate": 49,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      41: [function(r, n, l) {
        var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        l.assign = function(c) {
          for (var y = Array.prototype.slice.call(arguments, 1); y.length; ) {
            var b = y.shift();
            if (b) {
              if (typeof b != "object") throw new TypeError(b + "must be non-object");
              for (var v in b) b.hasOwnProperty(v) && (c[v] = b[v]);
            }
          }
          return c;
        }, l.shrinkBuf = function(c, y) {
          return c.length === y ? c : c.subarray ? c.subarray(0, y) : (c.length = y, c);
        };
        var u = {
          arraySet: function(c, y, b, v, I) {
            if (y.subarray && c.subarray) c.set(y.subarray(b, b + v), I);
            else for (var m = 0; m < v; m++) c[I + m] = y[b + m];
          },
          flattenChunks: function(c) {
            for (var y = v = 0, b = c.length, v, I, m, w; y < b; y++) v += c[y].length;
            for (w = new Uint8Array(v), y = I = 0, b = c.length; y < b; y++) m = c[y], w.set(m, I), I += m.length;
            return w;
          }
        }, s = {
          arraySet: function(c, y, b, v, I) {
            for (var m = 0; m < v; m++) c[I + m] = y[b + m];
          },
          flattenChunks: function(c) {
            return [].concat.apply([], c);
          }
        };
        l.setTyped = function(c) {
          c ? (l.Buf8 = Uint8Array, l.Buf16 = Uint16Array, l.Buf32 = Int32Array, l.assign(l, u)) : (l.Buf8 = Array, l.Buf16 = Array, l.Buf32 = Array, l.assign(l, s));
        }, l.setTyped(i);
      }, {}],
      42: [function(r, n, l) {
        var i = r("./common"), u = !0, s = !0;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch {
          u = !1;
        }
        try {
          String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1));
        } catch {
          s = !1;
        }
        for (var c = new i.Buf8(256), y = 0; y < 256; y++) c[y] = 252 <= y ? 6 : 248 <= y ? 5 : 240 <= y ? 4 : 224 <= y ? 3 : 192 <= y ? 2 : 1;
        function b(v, I) {
          if (I < 65537 && (v.subarray && s || !v.subarray && u)) return String.fromCharCode.apply(null, i.shrinkBuf(v, I));
          for (var m = "", w = 0; w < I; w++) m += String.fromCharCode(v[w]);
          return m;
        }
        c[254] = c[254] = 1, l.string2buf = function(v) {
          var I, m, w, g, E, R = v.length, x = 0;
          for (g = 0; g < R; g++) (64512 & (m = v.charCodeAt(g))) == 55296 && g + 1 < R && (64512 & (w = v.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (w - 56320), g++), x += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
          for (I = new i.Buf8(x), g = E = 0; E < x; g++) (64512 & (m = v.charCodeAt(g))) == 55296 && g + 1 < R && (64512 & (w = v.charCodeAt(g + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (w - 56320), g++), m < 128 ? I[E++] = m : (m < 2048 ? I[E++] = 192 | m >>> 6 : (m < 65536 ? I[E++] = 224 | m >>> 12 : (I[E++] = 240 | m >>> 18, I[E++] = 128 | m >>> 12 & 63), I[E++] = 128 | m >>> 6 & 63), I[E++] = 128 | 63 & m);
          return I;
        }, l.buf2binstring = function(v) {
          return b(v, v.length);
        }, l.binstring2buf = function(v) {
          for (var I = new i.Buf8(v.length), m = 0, w = I.length; m < w; m++) I[m] = v.charCodeAt(m);
          return I;
        }, l.buf2string = function(v, I) {
          var m, w, g, E, R = I || v.length, x = new Array(2 * R);
          for (m = w = 0; m < R; ) if ((g = v[m++]) < 128) x[w++] = g;
          else if (4 < (E = c[g])) x[w++] = 65533, m += E - 1;
          else {
            for (g &= E === 2 ? 31 : E === 3 ? 15 : 7; 1 < E && m < R; ) g = g << 6 | 63 & v[m++], E--;
            1 < E ? x[w++] = 65533 : g < 65536 ? x[w++] = g : (g -= 65536, x[w++] = 55296 | g >> 10 & 1023, x[w++] = 56320 | 1023 & g);
          }
          return b(x, w);
        }, l.utf8border = function(v, I) {
          var m;
          for ((I = I || v.length) > v.length && (I = v.length), m = I - 1; 0 <= m && (192 & v[m]) == 128; ) m--;
          return m < 0 || m === 0 ? I : m + c[v[m]] > I ? m : I;
        };
      }, { "./common": 41 }],
      43: [function(r, n, l) {
        n.exports = function(i, u, s, c) {
          for (var y = 65535 & i | 0, b = i >>> 16 & 65535 | 0, v = 0; s !== 0; ) {
            for (s -= v = 2e3 < s ? 2e3 : s; b = b + (y = y + u[c++] | 0) | 0, --v; ) ;
            y %= 65521, b %= 65521;
          }
          return y | b << 16 | 0;
        };
      }, {}],
      44: [function(r, n, l) {
        n.exports = {
          Z_NO_FLUSH: 0,
          Z_PARTIAL_FLUSH: 1,
          Z_SYNC_FLUSH: 2,
          Z_FULL_FLUSH: 3,
          Z_FINISH: 4,
          Z_BLOCK: 5,
          Z_TREES: 6,
          Z_OK: 0,
          Z_STREAM_END: 1,
          Z_NEED_DICT: 2,
          Z_ERRNO: -1,
          Z_STREAM_ERROR: -2,
          Z_DATA_ERROR: -3,
          Z_BUF_ERROR: -5,
          Z_NO_COMPRESSION: 0,
          Z_BEST_SPEED: 1,
          Z_BEST_COMPRESSION: 9,
          Z_DEFAULT_COMPRESSION: -1,
          Z_FILTERED: 1,
          Z_HUFFMAN_ONLY: 2,
          Z_RLE: 3,
          Z_FIXED: 4,
          Z_DEFAULT_STRATEGY: 0,
          Z_BINARY: 0,
          Z_TEXT: 1,
          Z_UNKNOWN: 2,
          Z_DEFLATED: 8
        };
      }, {}],
      45: [function(r, n, l) {
        var i = (function() {
          for (var u, s = [], c = 0; c < 256; c++) {
            u = c;
            for (var y = 0; y < 8; y++) u = 1 & u ? 3988292384 ^ u >>> 1 : u >>> 1;
            s[c] = u;
          }
          return s;
        })();
        n.exports = function(u, s, c, y) {
          var b = i, v = y + c;
          u ^= -1;
          for (var I = y; I < v; I++) u = u >>> 8 ^ b[255 & (u ^ s[I])];
          return -1 ^ u;
        };
      }, {}],
      46: [function(r, n, l) {
        var i, u = r("../utils/common"), s = r("./trees"), c = r("./adler32"), y = r("./crc32"), b = r("./messages"), v = 0, I = 4, m = 0, w = -2, g = -1, E = 4, R = 2, x = 8, _ = 9, T = 286, S = 30, p = 19, P = 2 * T + 1, M = 15, C = 3, $ = 258, ee = $ + C + 1, O = 42, z = 113, k = 1, H = 2, Q = 3, q = 4;
        function le(h, K) {
          return h.msg = b[K], K;
        }
        function Z(h) {
          return (h << 1) - (4 < h ? 9 : 0);
        }
        function te(h) {
          for (var K = h.length; 0 <= --K; ) h[K] = 0;
        }
        function V(h) {
          var K = h.state, N = K.pending;
          N > h.avail_out && (N = h.avail_out), N !== 0 && (u.arraySet(h.output, K.pending_buf, K.pending_out, N, h.next_out), h.next_out += N, K.pending_out += N, h.total_out += N, h.avail_out -= N, K.pending -= N, K.pending === 0 && (K.pending_out = 0));
        }
        function F(h, K) {
          s._tr_flush_block(h, 0 <= h.block_start ? h.block_start : -1, h.strstart - h.block_start, K), h.block_start = h.strstart, V(h.strm);
        }
        function X(h, K) {
          h.pending_buf[h.pending++] = K;
        }
        function Y(h, K) {
          h.pending_buf[h.pending++] = K >>> 8 & 255, h.pending_buf[h.pending++] = 255 & K;
        }
        function re(h, K) {
          var N, a, o = h.max_chain_length, d = h.strstart, B = h.prev_length, G = h.nice_match, W = h.strstart > h.w_size - ee ? h.strstart - (h.w_size - ee) : 0, ie = h.window, ue = h.w_mask, se = h.prev, fe = h.strstart + $, me = ie[d + B - 1], we = ie[d + B];
          h.prev_length >= h.good_match && (o >>= 2), G > h.lookahead && (G = h.lookahead);
          do
            if (ie[(N = K) + B] === we && ie[N + B - 1] === me && ie[N] === ie[d] && ie[++N] === ie[d + 1]) {
              d += 2, N++;
              do
                ;
              while (ie[++d] === ie[++N] && ie[++d] === ie[++N] && ie[++d] === ie[++N] && ie[++d] === ie[++N] && ie[++d] === ie[++N] && ie[++d] === ie[++N] && ie[++d] === ie[++N] && ie[++d] === ie[++N] && d < fe);
              if (a = $ - (fe - d), d = fe - $, B < a) {
                if (h.match_start = K, G <= (B = a)) break;
                me = ie[d + B - 1], we = ie[d + B];
              }
            }
          while ((K = se[K & ue]) > W && --o != 0);
          return B <= h.lookahead ? B : h.lookahead;
        }
        function pe(h) {
          var K, N, a, o, d, B, G, W, ie, ue, se = h.w_size;
          do {
            if (o = h.window_size - h.lookahead - h.strstart, h.strstart >= se + (se - ee)) {
              for (u.arraySet(h.window, h.window, se, se, 0), h.match_start -= se, h.strstart -= se, h.block_start -= se, K = N = h.hash_size; a = h.head[--K], h.head[K] = se <= a ? a - se : 0, --N; ) ;
              for (K = N = se; a = h.prev[--K], h.prev[K] = se <= a ? a - se : 0, --N; ) ;
              o += se;
            }
            if (h.strm.avail_in === 0) break;
            if (B = h.strm, G = h.window, W = h.strstart + h.lookahead, ie = o, ue = void 0, ue = B.avail_in, ie < ue && (ue = ie), N = ue === 0 ? 0 : (B.avail_in -= ue, u.arraySet(G, B.input, B.next_in, ue, W), B.state.wrap === 1 ? B.adler = c(B.adler, G, ue, W) : B.state.wrap === 2 && (B.adler = y(B.adler, G, ue, W)), B.next_in += ue, B.total_in += ue, ue), h.lookahead += N, h.lookahead + h.insert >= C) for (d = h.strstart - h.insert, h.ins_h = h.window[d], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[d + 1]) & h.hash_mask; h.insert && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[d + C - 1]) & h.hash_mask, h.prev[d & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = d, d++, h.insert--, !(h.lookahead + h.insert < C)); ) ;
          } while (h.lookahead < ee && h.strm.avail_in !== 0);
        }
        function A(h, K) {
          for (var N, a; ; ) {
            if (h.lookahead < ee) {
              if (pe(h), h.lookahead < ee && K === v) return k;
              if (h.lookahead === 0) break;
            }
            if (N = 0, h.lookahead >= C && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + C - 1]) & h.hash_mask, N = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), N !== 0 && h.strstart - N <= h.w_size - ee && (h.match_length = re(h, N)), h.match_length >= C) if (a = s._tr_tally(h, h.strstart - h.match_start, h.match_length - C), h.lookahead -= h.match_length, h.match_length <= h.max_lazy_match && h.lookahead >= C) {
              for (h.match_length--; h.strstart++, h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + C - 1]) & h.hash_mask, N = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart, --h.match_length != 0; ) ;
              h.strstart++;
            } else h.strstart += h.match_length, h.match_length = 0, h.ins_h = h.window[h.strstart], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + 1]) & h.hash_mask;
            else a = s._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++;
            if (a && (F(h, !1), h.strm.avail_out === 0)) return k;
          }
          return h.insert = h.strstart < C - 1 ? h.strstart : C - 1, K === I ? (F(h, !0), h.strm.avail_out === 0 ? Q : q) : h.last_lit && (F(h, !1), h.strm.avail_out === 0) ? k : H;
        }
        function f(h, K) {
          for (var N, a, o; ; ) {
            if (h.lookahead < ee) {
              if (pe(h), h.lookahead < ee && K === v) return k;
              if (h.lookahead === 0) break;
            }
            if (N = 0, h.lookahead >= C && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + C - 1]) & h.hash_mask, N = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), h.prev_length = h.match_length, h.prev_match = h.match_start, h.match_length = C - 1, N !== 0 && h.prev_length < h.max_lazy_match && h.strstart - N <= h.w_size - ee && (h.match_length = re(h, N), h.match_length <= 5 && (h.strategy === 1 || h.match_length === C && 4096 < h.strstart - h.match_start) && (h.match_length = C - 1)), h.prev_length >= C && h.match_length <= h.prev_length) {
              for (o = h.strstart + h.lookahead - C, a = s._tr_tally(h, h.strstart - 1 - h.prev_match, h.prev_length - C), h.lookahead -= h.prev_length - 1, h.prev_length -= 2; ++h.strstart <= o && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + C - 1]) & h.hash_mask, N = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), --h.prev_length != 0; ) ;
              if (h.match_available = 0, h.match_length = C - 1, h.strstart++, a && (F(h, !1), h.strm.avail_out === 0)) return k;
            } else if (h.match_available) {
              if ((a = s._tr_tally(h, 0, h.window[h.strstart - 1])) && F(h, !1), h.strstart++, h.lookahead--, h.strm.avail_out === 0) return k;
            } else h.match_available = 1, h.strstart++, h.lookahead--;
          }
          return h.match_available && (a = s._tr_tally(h, 0, h.window[h.strstart - 1]), h.match_available = 0), h.insert = h.strstart < C - 1 ? h.strstart : C - 1, K === I ? (F(h, !0), h.strm.avail_out === 0 ? Q : q) : h.last_lit && (F(h, !1), h.strm.avail_out === 0) ? k : H;
        }
        function j(h, K, N, a, o) {
          this.good_length = h, this.max_lazy = K, this.nice_length = N, this.max_chain = a, this.func = o;
        }
        function U() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = x, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new u.Buf16(2 * P), this.dyn_dtree = new u.Buf16(2 * (2 * S + 1)), this.bl_tree = new u.Buf16(2 * (2 * p + 1)), te(this.dyn_ltree), te(this.dyn_dtree), te(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new u.Buf16(M + 1), this.heap = new u.Buf16(2 * T + 1), te(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new u.Buf16(2 * T + 1), te(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function ne(h) {
          var K;
          return h && h.state ? (h.total_in = h.total_out = 0, h.data_type = R, (K = h.state).pending = 0, K.pending_out = 0, K.wrap < 0 && (K.wrap = -K.wrap), K.status = K.wrap ? O : z, h.adler = K.wrap === 2 ? 0 : 1, K.last_flush = v, s._tr_init(K), m) : le(h, w);
        }
        function D(h) {
          var K = ne(h);
          return K === m && (function(N) {
            N.window_size = 2 * N.w_size, te(N.head), N.max_lazy_match = i[N.level].max_lazy, N.good_match = i[N.level].good_length, N.nice_match = i[N.level].nice_length, N.max_chain_length = i[N.level].max_chain, N.strstart = 0, N.block_start = 0, N.lookahead = 0, N.insert = 0, N.match_length = N.prev_length = C - 1, N.match_available = 0, N.ins_h = 0;
          })(h.state), K;
        }
        function L(h, K, N, a, o, d) {
          if (!h) return w;
          var B = 1;
          if (K === g && (K = 6), a < 0 ? (B = 0, a = -a) : 15 < a && (B = 2, a -= 16), o < 1 || _ < o || N !== x || a < 8 || 15 < a || K < 0 || 9 < K || d < 0 || E < d) return le(h, w);
          a === 8 && (a = 9);
          var G = new U();
          return (h.state = G).strm = h, G.wrap = B, G.gzhead = null, G.w_bits = a, G.w_size = 1 << G.w_bits, G.w_mask = G.w_size - 1, G.hash_bits = o + 7, G.hash_size = 1 << G.hash_bits, G.hash_mask = G.hash_size - 1, G.hash_shift = ~~((G.hash_bits + C - 1) / C), G.window = new u.Buf8(2 * G.w_size), G.head = new u.Buf16(G.hash_size), G.prev = new u.Buf16(G.w_size), G.lit_bufsize = 1 << o + 6, G.pending_buf_size = 4 * G.lit_bufsize, G.pending_buf = new u.Buf8(G.pending_buf_size), G.d_buf = 1 * G.lit_bufsize, G.l_buf = 3 * G.lit_bufsize, G.level = K, G.strategy = d, G.method = N, D(h);
        }
        i = [
          new j(0, 0, 0, 0, function(h, K) {
            var N = 65535;
            for (N > h.pending_buf_size - 5 && (N = h.pending_buf_size - 5); ; ) {
              if (h.lookahead <= 1) {
                if (pe(h), h.lookahead === 0 && K === v) return k;
                if (h.lookahead === 0) break;
              }
              h.strstart += h.lookahead, h.lookahead = 0;
              var a = h.block_start + N;
              if ((h.strstart === 0 || h.strstart >= a) && (h.lookahead = h.strstart - a, h.strstart = a, F(h, !1), h.strm.avail_out === 0) || h.strstart - h.block_start >= h.w_size - ee && (F(h, !1), h.strm.avail_out === 0)) return k;
            }
            return h.insert = 0, K === I ? (F(h, !0), h.strm.avail_out === 0 ? Q : q) : (h.strstart > h.block_start && (F(h, !1), h.strm.avail_out), k);
          }),
          new j(4, 4, 8, 4, A),
          new j(4, 5, 16, 8, A),
          new j(4, 6, 32, 32, A),
          new j(4, 4, 16, 16, f),
          new j(8, 16, 32, 32, f),
          new j(8, 16, 128, 128, f),
          new j(8, 32, 128, 256, f),
          new j(32, 128, 258, 1024, f),
          new j(32, 258, 258, 4096, f)
        ], l.deflateInit = function(h, K) {
          return L(h, K, x, 15, 8, 0);
        }, l.deflateInit2 = L, l.deflateReset = D, l.deflateResetKeep = ne, l.deflateSetHeader = function(h, K) {
          return h && h.state ? h.state.wrap !== 2 ? w : (h.state.gzhead = K, m) : w;
        }, l.deflate = function(h, K) {
          var N, a, o, d;
          if (!h || !h.state || 5 < K || K < 0) return h ? le(h, w) : w;
          if (a = h.state, !h.output || !h.input && h.avail_in !== 0 || a.status === 666 && K !== I) return le(h, h.avail_out === 0 ? -5 : w);
          if (a.strm = h, N = a.last_flush, a.last_flush = K, a.status === O) if (a.wrap === 2) h.adler = 0, X(a, 31), X(a, 139), X(a, 8), a.gzhead ? (X(a, (a.gzhead.text ? 1 : 0) + (a.gzhead.hcrc ? 2 : 0) + (a.gzhead.extra ? 4 : 0) + (a.gzhead.name ? 8 : 0) + (a.gzhead.comment ? 16 : 0)), X(a, 255 & a.gzhead.time), X(a, a.gzhead.time >> 8 & 255), X(a, a.gzhead.time >> 16 & 255), X(a, a.gzhead.time >> 24 & 255), X(a, a.level === 9 ? 2 : 2 <= a.strategy || a.level < 2 ? 4 : 0), X(a, 255 & a.gzhead.os), a.gzhead.extra && a.gzhead.extra.length && (X(a, 255 & a.gzhead.extra.length), X(a, a.gzhead.extra.length >> 8 & 255)), a.gzhead.hcrc && (h.adler = y(h.adler, a.pending_buf, a.pending, 0)), a.gzindex = 0, a.status = 69) : (X(a, 0), X(a, 0), X(a, 0), X(a, 0), X(a, 0), X(a, a.level === 9 ? 2 : 2 <= a.strategy || a.level < 2 ? 4 : 0), X(a, 3), a.status = z);
          else {
            var B = x + (a.w_bits - 8 << 4) << 8;
            B |= (2 <= a.strategy || a.level < 2 ? 0 : a.level < 6 ? 1 : a.level === 6 ? 2 : 3) << 6, a.strstart !== 0 && (B |= 32), B += 31 - B % 31, a.status = z, Y(a, B), a.strstart !== 0 && (Y(a, h.adler >>> 16), Y(a, 65535 & h.adler)), h.adler = 1;
          }
          if (a.status === 69) if (a.gzhead.extra) {
            for (o = a.pending; a.gzindex < (65535 & a.gzhead.extra.length) && (a.pending !== a.pending_buf_size || (a.gzhead.hcrc && a.pending > o && (h.adler = y(h.adler, a.pending_buf, a.pending - o, o)), V(h), o = a.pending, a.pending !== a.pending_buf_size)); ) X(a, 255 & a.gzhead.extra[a.gzindex]), a.gzindex++;
            a.gzhead.hcrc && a.pending > o && (h.adler = y(h.adler, a.pending_buf, a.pending - o, o)), a.gzindex === a.gzhead.extra.length && (a.gzindex = 0, a.status = 73);
          } else a.status = 73;
          if (a.status === 73) if (a.gzhead.name) {
            o = a.pending;
            do {
              if (a.pending === a.pending_buf_size && (a.gzhead.hcrc && a.pending > o && (h.adler = y(h.adler, a.pending_buf, a.pending - o, o)), V(h), o = a.pending, a.pending === a.pending_buf_size)) {
                d = 1;
                break;
              }
              d = a.gzindex < a.gzhead.name.length ? 255 & a.gzhead.name.charCodeAt(a.gzindex++) : 0, X(a, d);
            } while (d !== 0);
            a.gzhead.hcrc && a.pending > o && (h.adler = y(h.adler, a.pending_buf, a.pending - o, o)), d === 0 && (a.gzindex = 0, a.status = 91);
          } else a.status = 91;
          if (a.status === 91) if (a.gzhead.comment) {
            o = a.pending;
            do {
              if (a.pending === a.pending_buf_size && (a.gzhead.hcrc && a.pending > o && (h.adler = y(h.adler, a.pending_buf, a.pending - o, o)), V(h), o = a.pending, a.pending === a.pending_buf_size)) {
                d = 1;
                break;
              }
              d = a.gzindex < a.gzhead.comment.length ? 255 & a.gzhead.comment.charCodeAt(a.gzindex++) : 0, X(a, d);
            } while (d !== 0);
            a.gzhead.hcrc && a.pending > o && (h.adler = y(h.adler, a.pending_buf, a.pending - o, o)), d === 0 && (a.status = 103);
          } else a.status = 103;
          if (a.status === 103 && (a.gzhead.hcrc ? (a.pending + 2 > a.pending_buf_size && V(h), a.pending + 2 <= a.pending_buf_size && (X(a, 255 & h.adler), X(a, h.adler >> 8 & 255), h.adler = 0, a.status = z)) : a.status = z), a.pending !== 0) {
            if (V(h), h.avail_out === 0) return a.last_flush = -1, m;
          } else if (h.avail_in === 0 && Z(K) <= Z(N) && K !== I) return le(h, -5);
          if (a.status === 666 && h.avail_in !== 0) return le(h, -5);
          if (h.avail_in !== 0 || a.lookahead !== 0 || K !== v && a.status !== 666) {
            var G = a.strategy === 2 ? (function(W, ie) {
              for (var ue; ; ) {
                if (W.lookahead === 0 && (pe(W), W.lookahead === 0)) {
                  if (ie === v) return k;
                  break;
                }
                if (W.match_length = 0, ue = s._tr_tally(W, 0, W.window[W.strstart]), W.lookahead--, W.strstart++, ue && (F(W, !1), W.strm.avail_out === 0)) return k;
              }
              return W.insert = 0, ie === I ? (F(W, !0), W.strm.avail_out === 0 ? Q : q) : W.last_lit && (F(W, !1), W.strm.avail_out === 0) ? k : H;
            })(a, K) : a.strategy === 3 ? (function(W, ie) {
              for (var ue, se, fe, me, we = W.window; ; ) {
                if (W.lookahead <= $) {
                  if (pe(W), W.lookahead <= $ && ie === v) return k;
                  if (W.lookahead === 0) break;
                }
                if (W.match_length = 0, W.lookahead >= C && 0 < W.strstart && (se = we[fe = W.strstart - 1]) === we[++fe] && se === we[++fe] && se === we[++fe]) {
                  me = W.strstart + $;
                  do
                    ;
                  while (se === we[++fe] && se === we[++fe] && se === we[++fe] && se === we[++fe] && se === we[++fe] && se === we[++fe] && se === we[++fe] && se === we[++fe] && fe < me);
                  W.match_length = $ - (me - fe), W.match_length > W.lookahead && (W.match_length = W.lookahead);
                }
                if (W.match_length >= C ? (ue = s._tr_tally(W, 1, W.match_length - C), W.lookahead -= W.match_length, W.strstart += W.match_length, W.match_length = 0) : (ue = s._tr_tally(W, 0, W.window[W.strstart]), W.lookahead--, W.strstart++), ue && (F(W, !1), W.strm.avail_out === 0)) return k;
              }
              return W.insert = 0, ie === I ? (F(W, !0), W.strm.avail_out === 0 ? Q : q) : W.last_lit && (F(W, !1), W.strm.avail_out === 0) ? k : H;
            })(a, K) : i[a.level].func(a, K);
            if (G !== Q && G !== q || (a.status = 666), G === k || G === Q) return h.avail_out === 0 && (a.last_flush = -1), m;
            if (G === H && (K === 1 ? s._tr_align(a) : K !== 5 && (s._tr_stored_block(a, 0, 0, !1), K === 3 && (te(a.head), a.lookahead === 0 && (a.strstart = 0, a.block_start = 0, a.insert = 0))), V(h), h.avail_out === 0)) return a.last_flush = -1, m;
          }
          return K !== I ? m : a.wrap <= 0 ? 1 : (a.wrap === 2 ? (X(a, 255 & h.adler), X(a, h.adler >> 8 & 255), X(a, h.adler >> 16 & 255), X(a, h.adler >> 24 & 255), X(a, 255 & h.total_in), X(a, h.total_in >> 8 & 255), X(a, h.total_in >> 16 & 255), X(a, h.total_in >> 24 & 255)) : (Y(a, h.adler >>> 16), Y(a, 65535 & h.adler)), V(h), 0 < a.wrap && (a.wrap = -a.wrap), a.pending !== 0 ? m : 1);
        }, l.deflateEnd = function(h) {
          var K;
          return h && h.state ? (K = h.state.status) !== O && K !== 69 && K !== 73 && K !== 91 && K !== 103 && K !== z && K !== 666 ? le(h, w) : (h.state = null, K === z ? le(h, -3) : m) : w;
        }, l.deflateSetDictionary = function(h, K) {
          var N, a, o, d, B, G, W, ie, ue = K.length;
          if (!h || !h.state || (d = (N = h.state).wrap) === 2 || d === 1 && N.status !== O || N.lookahead) return w;
          for (d === 1 && (h.adler = c(h.adler, K, ue, 0)), N.wrap = 0, ue >= N.w_size && (d === 0 && (te(N.head), N.strstart = 0, N.block_start = 0, N.insert = 0), ie = new u.Buf8(N.w_size), u.arraySet(ie, K, ue - N.w_size, N.w_size, 0), K = ie, ue = N.w_size), B = h.avail_in, G = h.next_in, W = h.input, h.avail_in = ue, h.next_in = 0, h.input = K, pe(N); N.lookahead >= C; ) {
            for (a = N.strstart, o = N.lookahead - (C - 1); N.ins_h = (N.ins_h << N.hash_shift ^ N.window[a + C - 1]) & N.hash_mask, N.prev[a & N.w_mask] = N.head[N.ins_h], N.head[N.ins_h] = a, a++, --o; ) ;
            N.strstart = a, N.lookahead = C - 1, pe(N);
          }
          return N.strstart += N.lookahead, N.block_start = N.strstart, N.insert = N.lookahead, N.lookahead = 0, N.match_length = N.prev_length = C - 1, N.match_available = 0, h.next_in = G, h.input = W, h.avail_in = B, N.wrap = d, m;
        }, l.deflateInfo = "pako deflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./messages": 51,
        "./trees": 52
      }],
      47: [function(r, n, l) {
        n.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
        };
      }, {}],
      48: [function(r, n, l) {
        n.exports = function(i, u) {
          var s = i.state, c = i.next_in, y, b, v, I, m, w, g, E, R, x, _, T, S, p, P, M, C, $, ee, O, z, k = i.input, H;
          y = c + (i.avail_in - 5), b = i.next_out, H = i.output, v = b - (u - i.avail_out), I = b + (i.avail_out - 257), m = s.dmax, w = s.wsize, g = s.whave, E = s.wnext, R = s.window, x = s.hold, _ = s.bits, T = s.lencode, S = s.distcode, p = (1 << s.lenbits) - 1, P = (1 << s.distbits) - 1;
          e: do {
            _ < 15 && (x += k[c++] << _, _ += 8, x += k[c++] << _, _ += 8), M = T[x & p];
            t: for (; ; ) {
              if (x >>>= C = M >>> 24, _ -= C, (C = M >>> 16 & 255) === 0) H[b++] = 65535 & M;
              else {
                if (!(16 & C)) {
                  if ((64 & C) == 0) {
                    M = T[(65535 & M) + (x & (1 << C) - 1)];
                    continue t;
                  }
                  if (32 & C) {
                    s.mode = 12;
                    break e;
                  }
                  i.msg = "invalid literal/length code", s.mode = 30;
                  break e;
                }
                $ = 65535 & M, (C &= 15) && (_ < C && (x += k[c++] << _, _ += 8), $ += x & (1 << C) - 1, x >>>= C, _ -= C), _ < 15 && (x += k[c++] << _, _ += 8, x += k[c++] << _, _ += 8), M = S[x & P];
                r: for (; ; ) {
                  if (x >>>= C = M >>> 24, _ -= C, !(16 & (C = M >>> 16 & 255))) {
                    if ((64 & C) == 0) {
                      M = S[(65535 & M) + (x & (1 << C) - 1)];
                      continue r;
                    }
                    i.msg = "invalid distance code", s.mode = 30;
                    break e;
                  }
                  if (ee = 65535 & M, _ < (C &= 15) && (x += k[c++] << _, (_ += 8) < C && (x += k[c++] << _, _ += 8)), m < (ee += x & (1 << C) - 1)) {
                    i.msg = "invalid distance too far back", s.mode = 30;
                    break e;
                  }
                  if (x >>>= C, _ -= C, (C = b - v) < ee) {
                    if (g < (C = ee - C) && s.sane) {
                      i.msg = "invalid distance too far back", s.mode = 30;
                      break e;
                    }
                    if (z = R, (O = 0) === E) {
                      if (O += w - C, C < $) {
                        for ($ -= C; H[b++] = R[O++], --C; ) ;
                        O = b - ee, z = H;
                      }
                    } else if (E < C) {
                      if (O += w + E - C, (C -= E) < $) {
                        for ($ -= C; H[b++] = R[O++], --C; ) ;
                        if (O = 0, E < $) {
                          for ($ -= C = E; H[b++] = R[O++], --C; ) ;
                          O = b - ee, z = H;
                        }
                      }
                    } else if (O += E - C, C < $) {
                      for ($ -= C; H[b++] = R[O++], --C; ) ;
                      O = b - ee, z = H;
                    }
                    for (; 2 < $; ) H[b++] = z[O++], H[b++] = z[O++], H[b++] = z[O++], $ -= 3;
                    $ && (H[b++] = z[O++], 1 < $ && (H[b++] = z[O++]));
                  } else {
                    for (O = b - ee; H[b++] = H[O++], H[b++] = H[O++], H[b++] = H[O++], 2 < ($ -= 3); ) ;
                    $ && (H[b++] = H[O++], 1 < $ && (H[b++] = H[O++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (c < y && b < I);
          c -= $ = _ >> 3, x &= (1 << (_ -= $ << 3)) - 1, i.next_in = c, i.next_out = b, i.avail_in = c < y ? y - c + 5 : 5 - (c - y), i.avail_out = b < I ? I - b + 257 : 257 - (b - I), s.hold = x, s.bits = _;
        };
      }, {}],
      49: [function(r, n, l) {
        var i = r("../utils/common"), u = r("./adler32"), s = r("./crc32"), c = r("./inffast"), y = r("./inftrees"), b = 1, v = 2, I = 0, m = -2, w = 1, g = 852, E = 592;
        function R(O) {
          return (O >>> 24 & 255) + (O >>> 8 & 65280) + ((65280 & O) << 8) + ((255 & O) << 24);
        }
        function x() {
          this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new i.Buf16(320), this.work = new i.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function _(O) {
          var z;
          return O && O.state ? (z = O.state, O.total_in = O.total_out = z.total = 0, O.msg = "", z.wrap && (O.adler = 1 & z.wrap), z.mode = w, z.last = 0, z.havedict = 0, z.dmax = 32768, z.head = null, z.hold = 0, z.bits = 0, z.lencode = z.lendyn = new i.Buf32(g), z.distcode = z.distdyn = new i.Buf32(E), z.sane = 1, z.back = -1, I) : m;
        }
        function T(O) {
          var z;
          return O && O.state ? ((z = O.state).wsize = 0, z.whave = 0, z.wnext = 0, _(O)) : m;
        }
        function S(O, z) {
          var k, H;
          return O && O.state ? (H = O.state, z < 0 ? (k = 0, z = -z) : (k = 1 + (z >> 4), z < 48 && (z &= 15)), z && (z < 8 || 15 < z) ? m : (H.window !== null && H.wbits !== z && (H.window = null), H.wrap = k, H.wbits = z, T(O))) : m;
        }
        function p(O, z) {
          var k, H;
          return O ? (H = new x(), (O.state = H).window = null, (k = S(O, z)) !== I && (O.state = null), k) : m;
        }
        var P, M, C = !0;
        function $(O) {
          if (C) {
            var z;
            for (P = new i.Buf32(512), M = new i.Buf32(32), z = 0; z < 144; ) O.lens[z++] = 8;
            for (; z < 256; ) O.lens[z++] = 9;
            for (; z < 280; ) O.lens[z++] = 7;
            for (; z < 288; ) O.lens[z++] = 8;
            for (y(b, O.lens, 0, 288, P, 0, O.work, { bits: 9 }), z = 0; z < 32; ) O.lens[z++] = 5;
            y(v, O.lens, 0, 32, M, 0, O.work, { bits: 5 }), C = !1;
          }
          O.lencode = P, O.lenbits = 9, O.distcode = M, O.distbits = 5;
        }
        function ee(O, z, k, H) {
          var Q, q = O.state;
          return q.window === null && (q.wsize = 1 << q.wbits, q.wnext = 0, q.whave = 0, q.window = new i.Buf8(q.wsize)), H >= q.wsize ? (i.arraySet(q.window, z, k - q.wsize, q.wsize, 0), q.wnext = 0, q.whave = q.wsize) : (H < (Q = q.wsize - q.wnext) && (Q = H), i.arraySet(q.window, z, k - H, Q, q.wnext), (H -= Q) ? (i.arraySet(q.window, z, k - H, H, 0), q.wnext = H, q.whave = q.wsize) : (q.wnext += Q, q.wnext === q.wsize && (q.wnext = 0), q.whave < q.wsize && (q.whave += Q))), 0;
        }
        l.inflateReset = T, l.inflateReset2 = S, l.inflateResetKeep = _, l.inflateInit = function(O) {
          return p(O, 15);
        }, l.inflateInit2 = p, l.inflate = function(O, z) {
          var k, H, Q, q, le, Z, te, V, F, X, Y, re, pe, A, f, j, U, ne, D, L, h, K, N, a, o = 0, d = new i.Buf8(4), B = [
            16,
            17,
            18,
            0,
            8,
            7,
            9,
            6,
            10,
            5,
            11,
            4,
            12,
            3,
            13,
            2,
            14,
            1,
            15
          ];
          if (!O || !O.state || !O.output || !O.input && O.avail_in !== 0) return m;
          (k = O.state).mode === 12 && (k.mode = 13), le = O.next_out, Q = O.output, te = O.avail_out, q = O.next_in, H = O.input, Z = O.avail_in, V = k.hold, F = k.bits, X = Z, Y = te, K = I;
          e: for (; ; ) switch (k.mode) {
            case w:
              if (k.wrap === 0) {
                k.mode = 13;
                break;
              }
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if (2 & k.wrap && V === 35615) {
                d[k.check = 0] = 255 & V, d[1] = V >>> 8 & 255, k.check = s(k.check, d, 2, 0), F = V = 0, k.mode = 2;
                break;
              }
              if (k.flags = 0, k.head && (k.head.done = !1), !(1 & k.wrap) || (((255 & V) << 8) + (V >> 8)) % 31) {
                O.msg = "incorrect header check", k.mode = 30;
                break;
              }
              if ((15 & V) != 8) {
                O.msg = "unknown compression method", k.mode = 30;
                break;
              }
              if (F -= 4, h = 8 + (15 & (V >>>= 4)), k.wbits === 0) k.wbits = h;
              else if (h > k.wbits) {
                O.msg = "invalid window size", k.mode = 30;
                break;
              }
              k.dmax = 1 << h, O.adler = k.check = 1, k.mode = 512 & V ? 10 : 12, F = V = 0;
              break;
            case 2:
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if (k.flags = V, (255 & k.flags) != 8) {
                O.msg = "unknown compression method", k.mode = 30;
                break;
              }
              if (57344 & k.flags) {
                O.msg = "unknown header flags set", k.mode = 30;
                break;
              }
              k.head && (k.head.text = V >> 8 & 1), 512 & k.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, k.check = s(k.check, d, 2, 0)), F = V = 0, k.mode = 3;
            case 3:
              for (; F < 32; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              k.head && (k.head.time = V), 512 & k.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, d[2] = V >>> 16 & 255, d[3] = V >>> 24 & 255, k.check = s(k.check, d, 4, 0)), F = V = 0, k.mode = 4;
            case 4:
              for (; F < 16; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              k.head && (k.head.xflags = 255 & V, k.head.os = V >> 8), 512 & k.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, k.check = s(k.check, d, 2, 0)), F = V = 0, k.mode = 5;
            case 5:
              if (1024 & k.flags) {
                for (; F < 16; ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                k.length = V, k.head && (k.head.extra_len = V), 512 & k.flags && (d[0] = 255 & V, d[1] = V >>> 8 & 255, k.check = s(k.check, d, 2, 0)), F = V = 0;
              } else k.head && (k.head.extra = null);
              k.mode = 6;
            case 6:
              if (1024 & k.flags && (Z < (re = k.length) && (re = Z), re && (k.head && (h = k.head.extra_len - k.length, k.head.extra || (k.head.extra = new Array(k.head.extra_len)), i.arraySet(k.head.extra, H, q, re, h)), 512 & k.flags && (k.check = s(k.check, H, re, q)), Z -= re, q += re, k.length -= re), k.length)) break e;
              k.length = 0, k.mode = 7;
            case 7:
              if (2048 & k.flags) {
                if (Z === 0) break e;
                for (re = 0; h = H[q + re++], k.head && h && k.length < 65536 && (k.head.name += String.fromCharCode(h)), h && re < Z; ) ;
                if (512 & k.flags && (k.check = s(k.check, H, re, q)), Z -= re, q += re, h) break e;
              } else k.head && (k.head.name = null);
              k.length = 0, k.mode = 8;
            case 8:
              if (4096 & k.flags) {
                if (Z === 0) break e;
                for (re = 0; h = H[q + re++], k.head && h && k.length < 65536 && (k.head.comment += String.fromCharCode(h)), h && re < Z; ) ;
                if (512 & k.flags && (k.check = s(k.check, H, re, q)), Z -= re, q += re, h) break e;
              } else k.head && (k.head.comment = null);
              k.mode = 9;
            case 9:
              if (512 & k.flags) {
                for (; F < 16; ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                if (V !== (65535 & k.check)) {
                  O.msg = "header crc mismatch", k.mode = 30;
                  break;
                }
                F = V = 0;
              }
              k.head && (k.head.hcrc = k.flags >> 9 & 1, k.head.done = !0), O.adler = k.check = 0, k.mode = 12;
              break;
            case 10:
              for (; F < 32; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              O.adler = k.check = R(V), F = V = 0, k.mode = 11;
            case 11:
              if (k.havedict === 0) return O.next_out = le, O.avail_out = te, O.next_in = q, O.avail_in = Z, k.hold = V, k.bits = F, 2;
              O.adler = k.check = 1, k.mode = 12;
            case 12:
              if (z === 5 || z === 6) break e;
            case 13:
              if (k.last) {
                V >>>= 7 & F, F -= 7 & F, k.mode = 27;
                break;
              }
              for (; F < 3; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              switch (k.last = 1 & V, F -= 1, 3 & (V >>>= 1)) {
                case 0:
                  k.mode = 14;
                  break;
                case 1:
                  if ($(k), k.mode = 20, z !== 6) break;
                  V >>>= 2, F -= 2;
                  break e;
                case 2:
                  k.mode = 17;
                  break;
                case 3:
                  O.msg = "invalid block type", k.mode = 30;
              }
              V >>>= 2, F -= 2;
              break;
            case 14:
              for (V >>>= 7 & F, F -= 7 & F; F < 32; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if ((65535 & V) != (V >>> 16 ^ 65535)) {
                O.msg = "invalid stored block lengths", k.mode = 30;
                break;
              }
              if (k.length = 65535 & V, F = V = 0, k.mode = 15, z === 6) break e;
            case 15:
              k.mode = 16;
            case 16:
              if (re = k.length) {
                if (Z < re && (re = Z), te < re && (re = te), re === 0) break e;
                i.arraySet(Q, H, q, re, le), Z -= re, q += re, te -= re, le += re, k.length -= re;
                break;
              }
              k.mode = 12;
              break;
            case 17:
              for (; F < 14; ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if (k.nlen = 257 + (31 & V), V >>>= 5, F -= 5, k.ndist = 1 + (31 & V), V >>>= 5, F -= 5, k.ncode = 4 + (15 & V), V >>>= 4, F -= 4, 286 < k.nlen || 30 < k.ndist) {
                O.msg = "too many length or distance symbols", k.mode = 30;
                break;
              }
              k.have = 0, k.mode = 18;
            case 18:
              for (; k.have < k.ncode; ) {
                for (; F < 3; ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                k.lens[B[k.have++]] = 7 & V, V >>>= 3, F -= 3;
              }
              for (; k.have < 19; ) k.lens[B[k.have++]] = 0;
              if (k.lencode = k.lendyn, k.lenbits = 7, N = { bits: k.lenbits }, K = y(0, k.lens, 0, 19, k.lencode, 0, k.work, N), k.lenbits = N.bits, K) {
                O.msg = "invalid code lengths set", k.mode = 30;
                break;
              }
              k.have = 0, k.mode = 19;
            case 19:
              for (; k.have < k.nlen + k.ndist; ) {
                for (; j = (o = k.lencode[V & (1 << k.lenbits) - 1]) >>> 16 & 255, U = 65535 & o, !((f = o >>> 24) <= F); ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                if (U < 16) V >>>= f, F -= f, k.lens[k.have++] = U;
                else {
                  if (U === 16) {
                    for (a = f + 2; F < a; ) {
                      if (Z === 0) break e;
                      Z--, V += H[q++] << F, F += 8;
                    }
                    if (V >>>= f, F -= f, k.have === 0) {
                      O.msg = "invalid bit length repeat", k.mode = 30;
                      break;
                    }
                    h = k.lens[k.have - 1], re = 3 + (3 & V), V >>>= 2, F -= 2;
                  } else if (U === 17) {
                    for (a = f + 3; F < a; ) {
                      if (Z === 0) break e;
                      Z--, V += H[q++] << F, F += 8;
                    }
                    F -= f, h = 0, re = 3 + (7 & (V >>>= f)), V >>>= 3, F -= 3;
                  } else {
                    for (a = f + 7; F < a; ) {
                      if (Z === 0) break e;
                      Z--, V += H[q++] << F, F += 8;
                    }
                    F -= f, h = 0, re = 11 + (127 & (V >>>= f)), V >>>= 7, F -= 7;
                  }
                  if (k.have + re > k.nlen + k.ndist) {
                    O.msg = "invalid bit length repeat", k.mode = 30;
                    break;
                  }
                  for (; re--; ) k.lens[k.have++] = h;
                }
              }
              if (k.mode === 30) break;
              if (k.lens[256] === 0) {
                O.msg = "invalid code -- missing end-of-block", k.mode = 30;
                break;
              }
              if (k.lenbits = 9, N = { bits: k.lenbits }, K = y(b, k.lens, 0, k.nlen, k.lencode, 0, k.work, N), k.lenbits = N.bits, K) {
                O.msg = "invalid literal/lengths set", k.mode = 30;
                break;
              }
              if (k.distbits = 6, k.distcode = k.distdyn, N = { bits: k.distbits }, K = y(v, k.lens, k.nlen, k.ndist, k.distcode, 0, k.work, N), k.distbits = N.bits, K) {
                O.msg = "invalid distances set", k.mode = 30;
                break;
              }
              if (k.mode = 20, z === 6) break e;
            case 20:
              k.mode = 21;
            case 21:
              if (6 <= Z && 258 <= te) {
                O.next_out = le, O.avail_out = te, O.next_in = q, O.avail_in = Z, k.hold = V, k.bits = F, c(O, Y), le = O.next_out, Q = O.output, te = O.avail_out, q = O.next_in, H = O.input, Z = O.avail_in, V = k.hold, F = k.bits, k.mode === 12 && (k.back = -1);
                break;
              }
              for (k.back = 0; j = (o = k.lencode[V & (1 << k.lenbits) - 1]) >>> 16 & 255, U = 65535 & o, !((f = o >>> 24) <= F); ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if (j && (240 & j) == 0) {
                for (ne = f, D = j, L = U; j = (o = k.lencode[L + ((V & (1 << ne + D) - 1) >> ne)]) >>> 16 & 255, U = 65535 & o, !(ne + (f = o >>> 24) <= F); ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                V >>>= ne, F -= ne, k.back += ne;
              }
              if (V >>>= f, F -= f, k.back += f, k.length = U, j === 0) {
                k.mode = 26;
                break;
              }
              if (32 & j) {
                k.back = -1, k.mode = 12;
                break;
              }
              if (64 & j) {
                O.msg = "invalid literal/length code", k.mode = 30;
                break;
              }
              k.extra = 15 & j, k.mode = 22;
            case 22:
              if (k.extra) {
                for (a = k.extra; F < a; ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                k.length += V & (1 << k.extra) - 1, V >>>= k.extra, F -= k.extra, k.back += k.extra;
              }
              k.was = k.length, k.mode = 23;
            case 23:
              for (; j = (o = k.distcode[V & (1 << k.distbits) - 1]) >>> 16 & 255, U = 65535 & o, !((f = o >>> 24) <= F); ) {
                if (Z === 0) break e;
                Z--, V += H[q++] << F, F += 8;
              }
              if ((240 & j) == 0) {
                for (ne = f, D = j, L = U; j = (o = k.distcode[L + ((V & (1 << ne + D) - 1) >> ne)]) >>> 16 & 255, U = 65535 & o, !(ne + (f = o >>> 24) <= F); ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                V >>>= ne, F -= ne, k.back += ne;
              }
              if (V >>>= f, F -= f, k.back += f, 64 & j) {
                O.msg = "invalid distance code", k.mode = 30;
                break;
              }
              k.offset = U, k.extra = 15 & j, k.mode = 24;
            case 24:
              if (k.extra) {
                for (a = k.extra; F < a; ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                k.offset += V & (1 << k.extra) - 1, V >>>= k.extra, F -= k.extra, k.back += k.extra;
              }
              if (k.offset > k.dmax) {
                O.msg = "invalid distance too far back", k.mode = 30;
                break;
              }
              k.mode = 25;
            case 25:
              if (te === 0) break e;
              if (re = Y - te, k.offset > re) {
                if ((re = k.offset - re) > k.whave && k.sane) {
                  O.msg = "invalid distance too far back", k.mode = 30;
                  break;
                }
                pe = re > k.wnext ? (re -= k.wnext, k.wsize - re) : k.wnext - re, re > k.length && (re = k.length), A = k.window;
              } else A = Q, pe = le - k.offset, re = k.length;
              for (te < re && (re = te), te -= re, k.length -= re; Q[le++] = A[pe++], --re; ) ;
              k.length === 0 && (k.mode = 21);
              break;
            case 26:
              if (te === 0) break e;
              Q[le++] = k.length, te--, k.mode = 21;
              break;
            case 27:
              if (k.wrap) {
                for (; F < 32; ) {
                  if (Z === 0) break e;
                  Z--, V |= H[q++] << F, F += 8;
                }
                if (Y -= te, O.total_out += Y, k.total += Y, Y && (O.adler = k.check = k.flags ? s(k.check, Q, Y, le - Y) : u(k.check, Q, Y, le - Y)), Y = te, (k.flags ? V : R(V)) !== k.check) {
                  O.msg = "incorrect data check", k.mode = 30;
                  break;
                }
                F = V = 0;
              }
              k.mode = 28;
            case 28:
              if (k.wrap && k.flags) {
                for (; F < 32; ) {
                  if (Z === 0) break e;
                  Z--, V += H[q++] << F, F += 8;
                }
                if (V !== (4294967295 & k.total)) {
                  O.msg = "incorrect length check", k.mode = 30;
                  break;
                }
                F = V = 0;
              }
              k.mode = 29;
            case 29:
              K = 1;
              break e;
            case 30:
              K = -3;
              break e;
            case 31:
              return -4;
            default:
              return m;
          }
          return O.next_out = le, O.avail_out = te, O.next_in = q, O.avail_in = Z, k.hold = V, k.bits = F, (k.wsize || Y !== O.avail_out && k.mode < 30 && (k.mode < 27 || z !== 4)) && ee(O, O.output, O.next_out, Y - O.avail_out) ? (k.mode = 31, -4) : (X -= O.avail_in, Y -= O.avail_out, O.total_in += X, O.total_out += Y, k.total += Y, k.wrap && Y && (O.adler = k.check = k.flags ? s(k.check, Q, Y, O.next_out - Y) : u(k.check, Q, Y, O.next_out - Y)), O.data_type = k.bits + (k.last ? 64 : 0) + (k.mode === 12 ? 128 : 0) + (k.mode === 20 || k.mode === 15 ? 256 : 0), (X == 0 && Y === 0 || z === 4) && K === I && (K = -5), K);
        }, l.inflateEnd = function(O) {
          if (!O || !O.state) return m;
          var z = O.state;
          return z.window && (z.window = null), O.state = null, I;
        }, l.inflateGetHeader = function(O, z) {
          var k;
          return O && O.state ? (2 & (k = O.state).wrap) == 0 ? m : ((k.head = z).done = !1, I) : m;
        }, l.inflateSetDictionary = function(O, z) {
          var k, H = z.length;
          return O && O.state ? (k = O.state).wrap !== 0 && k.mode !== 11 ? m : k.mode === 11 && u(1, z, H, 0) !== k.check ? -3 : ee(O, z, H, H) ? (k.mode = 31, -4) : (k.havedict = 1, I) : m;
        }, l.inflateInfo = "pako inflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./inffast": 48,
        "./inftrees": 50
      }],
      50: [function(r, n, l) {
        var i = r("../utils/common"), u = [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          13,
          15,
          17,
          19,
          23,
          27,
          31,
          35,
          43,
          51,
          59,
          67,
          83,
          99,
          115,
          131,
          163,
          195,
          227,
          258,
          0,
          0
        ], s = [
          16,
          16,
          16,
          16,
          16,
          16,
          16,
          16,
          17,
          17,
          17,
          17,
          18,
          18,
          18,
          18,
          19,
          19,
          19,
          19,
          20,
          20,
          20,
          20,
          21,
          21,
          21,
          21,
          16,
          72,
          78
        ], c = [
          1,
          2,
          3,
          4,
          5,
          7,
          9,
          13,
          17,
          25,
          33,
          49,
          65,
          97,
          129,
          193,
          257,
          385,
          513,
          769,
          1025,
          1537,
          2049,
          3073,
          4097,
          6145,
          8193,
          12289,
          16385,
          24577,
          0,
          0
        ], y = [
          16,
          16,
          16,
          16,
          17,
          17,
          18,
          18,
          19,
          19,
          20,
          20,
          21,
          21,
          22,
          22,
          23,
          23,
          24,
          24,
          25,
          25,
          26,
          26,
          27,
          27,
          28,
          28,
          29,
          29,
          64,
          64
        ];
        n.exports = function(b, v, I, m, w, g, E, R) {
          var x, _, T, S, p, P, M, C, $, ee = R.bits, O = 0, z = 0, k = 0, H = 0, Q = 0, q = 0, le = 0, Z = 0, te = 0, V = 0, F = null, X = 0, Y = new i.Buf16(16), re = new i.Buf16(16), pe = null, A = 0;
          for (O = 0; O <= 15; O++) Y[O] = 0;
          for (z = 0; z < m; z++) Y[v[I + z]]++;
          for (Q = ee, H = 15; 1 <= H && Y[H] === 0; H--) ;
          if (H < Q && (Q = H), H === 0) return w[g++] = 20971520, w[g++] = 20971520, R.bits = 1, 0;
          for (k = 1; k < H && Y[k] === 0; k++) ;
          for (Q < k && (Q = k), O = Z = 1; O <= 15; O++) if (Z <<= 1, (Z -= Y[O]) < 0) return -1;
          if (0 < Z && (b === 0 || H !== 1)) return -1;
          for (re[1] = 0, O = 1; O < 15; O++) re[O + 1] = re[O] + Y[O];
          for (z = 0; z < m; z++) v[I + z] !== 0 && (E[re[v[I + z]]++] = z);
          if (P = b === 0 ? (F = pe = E, 19) : b === 1 ? (F = u, X -= 257, pe = s, A -= 257, 256) : (F = c, pe = y, -1), O = k, p = g, le = z = V = 0, T = -1, S = (te = 1 << (q = Q)) - 1, b === 1 && 852 < te || b === 2 && 592 < te) return 1;
          for (; ; ) {
            for (M = O - le, $ = E[z] < P ? (C = 0, E[z]) : E[z] > P ? (C = pe[A + E[z]], F[X + E[z]]) : (C = 96, 0), x = 1 << O - le, k = _ = 1 << q; w[p + (V >> le) + (_ -= x)] = M << 24 | C << 16 | $ | 0, _ !== 0; ) ;
            for (x = 1 << O - 1; V & x; ) x >>= 1;
            if (x !== 0 ? (V &= x - 1, V += x) : V = 0, z++, --Y[O] == 0) {
              if (O === H) break;
              O = v[I + E[z]];
            }
            if (Q < O && (V & S) !== T) {
              for (le === 0 && (le = Q), p += k, Z = 1 << (q = O - le); q + le < H && !((Z -= Y[q + le]) <= 0); ) q++, Z <<= 1;
              if (te += 1 << q, b === 1 && 852 < te || b === 2 && 592 < te) return 1;
              w[T = V & S] = Q << 24 | q << 16 | p - g | 0;
            }
          }
          return V !== 0 && (w[p + V] = O - le << 24 | 4194304), R.bits = Q, 0;
        };
      }, { "../utils/common": 41 }],
      51: [function(r, n, l) {
        n.exports = {
          2: "need dictionary",
          1: "stream end",
          0: "",
          "-1": "file error",
          "-2": "stream error",
          "-3": "data error",
          "-4": "insufficient memory",
          "-5": "buffer error",
          "-6": "incompatible version"
        };
      }, {}],
      52: [function(r, n, l) {
        var i = r("../utils/common"), u = 0, s = 1;
        function c(o) {
          for (var d = o.length; 0 <= --d; ) o[d] = 0;
        }
        var y = 0, b = 29, v = 256, I = v + 1 + b, m = 30, w = 19, g = 2 * I + 1, E = 15, R = 16, x = 7, _ = 256, T = 16, S = 17, p = 18, P = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          2,
          2,
          2,
          2,
          3,
          3,
          3,
          3,
          4,
          4,
          4,
          4,
          5,
          5,
          5,
          5,
          0
        ], M = [
          0,
          0,
          0,
          0,
          1,
          1,
          2,
          2,
          3,
          3,
          4,
          4,
          5,
          5,
          6,
          6,
          7,
          7,
          8,
          8,
          9,
          9,
          10,
          10,
          11,
          11,
          12,
          12,
          13,
          13
        ], C = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          2,
          3,
          7
        ], $ = [
          16,
          17,
          18,
          0,
          8,
          7,
          9,
          6,
          10,
          5,
          11,
          4,
          12,
          3,
          13,
          2,
          14,
          1,
          15
        ], ee = new Array(2 * (I + 2));
        c(ee);
        var O = new Array(2 * m);
        c(O);
        var z = new Array(512);
        c(z);
        var k = new Array(256);
        c(k);
        var H = new Array(b);
        c(H);
        var Q, q, le, Z = new Array(m);
        function te(o, d, B, G, W) {
          this.static_tree = o, this.extra_bits = d, this.extra_base = B, this.elems = G, this.max_length = W, this.has_stree = o && o.length;
        }
        function V(o, d) {
          this.dyn_tree = o, this.max_code = 0, this.stat_desc = d;
        }
        function F(o) {
          return o < 256 ? z[o] : z[256 + (o >>> 7)];
        }
        function X(o, d) {
          o.pending_buf[o.pending++] = 255 & d, o.pending_buf[o.pending++] = d >>> 8 & 255;
        }
        function Y(o, d, B) {
          o.bi_valid > R - B ? (o.bi_buf |= d << o.bi_valid & 65535, X(o, o.bi_buf), o.bi_buf = d >> R - o.bi_valid, o.bi_valid += B - R) : (o.bi_buf |= d << o.bi_valid & 65535, o.bi_valid += B);
        }
        function re(o, d, B) {
          Y(o, B[2 * d], B[2 * d + 1]);
        }
        function pe(o, d) {
          for (var B = 0; B |= 1 & o, o >>>= 1, B <<= 1, 0 < --d; ) ;
          return B >>> 1;
        }
        function A(o, d, B) {
          var G, W, ie = new Array(E + 1), ue = 0;
          for (G = 1; G <= E; G++) ie[G] = ue = ue + B[G - 1] << 1;
          for (W = 0; W <= d; W++) {
            var se = o[2 * W + 1];
            se !== 0 && (o[2 * W] = pe(ie[se]++, se));
          }
        }
        function f(o) {
          for (var d = 0; d < I; d++) o.dyn_ltree[2 * d] = 0;
          for (d = 0; d < m; d++) o.dyn_dtree[2 * d] = 0;
          for (d = 0; d < w; d++) o.bl_tree[2 * d] = 0;
          o.dyn_ltree[2 * _] = 1, o.opt_len = o.static_len = 0, o.last_lit = o.matches = 0;
        }
        function j(o) {
          8 < o.bi_valid ? X(o, o.bi_buf) : 0 < o.bi_valid && (o.pending_buf[o.pending++] = o.bi_buf), o.bi_buf = 0, o.bi_valid = 0;
        }
        function U(o, d, B, G) {
          var W = 2 * d, ie = 2 * B;
          return o[W] < o[ie] || o[W] === o[ie] && G[d] <= G[B];
        }
        function ne(o, d, B) {
          for (var G = o.heap[B], W = B << 1; W <= o.heap_len && (W < o.heap_len && U(d, o.heap[W + 1], o.heap[W], o.depth) && W++, !U(d, G, o.heap[W], o.depth)); ) o.heap[B] = o.heap[W], B = W, W <<= 1;
          o.heap[B] = G;
        }
        function D(o, d, B) {
          var G, W, ie, ue, se = 0;
          if (o.last_lit !== 0) for (; G = o.pending_buf[o.d_buf + 2 * se] << 8 | o.pending_buf[o.d_buf + 2 * se + 1], W = o.pending_buf[o.l_buf + se], se++, G === 0 ? re(o, W, d) : (re(o, (ie = k[W]) + v + 1, d), (ue = P[ie]) !== 0 && Y(o, W -= H[ie], ue), re(o, ie = F(--G), B), (ue = M[ie]) !== 0 && Y(o, G -= Z[ie], ue)), se < o.last_lit; ) ;
          re(o, _, d);
        }
        function L(o, d) {
          var B, G, W, ie = d.dyn_tree, ue = d.stat_desc.static_tree, se = d.stat_desc.has_stree, fe = d.stat_desc.elems, me = -1;
          for (o.heap_len = 0, o.heap_max = g, B = 0; B < fe; B++) ie[2 * B] !== 0 ? (o.heap[++o.heap_len] = me = B, o.depth[B] = 0) : ie[2 * B + 1] = 0;
          for (; o.heap_len < 2; ) ie[2 * (W = o.heap[++o.heap_len] = me < 2 ? ++me : 0)] = 1, o.depth[W] = 0, o.opt_len--, se && (o.static_len -= ue[2 * W + 1]);
          for (d.max_code = me, B = o.heap_len >> 1; 1 <= B; B--) ne(o, ie, B);
          for (W = fe; B = o.heap[1], o.heap[1] = o.heap[o.heap_len--], ne(o, ie, 1), G = o.heap[1], o.heap[--o.heap_max] = B, o.heap[--o.heap_max] = G, ie[2 * W] = ie[2 * B] + ie[2 * G], o.depth[W] = (o.depth[B] >= o.depth[G] ? o.depth[B] : o.depth[G]) + 1, ie[2 * B + 1] = ie[2 * G + 1] = W, o.heap[1] = W++, ne(o, ie, 1), 2 <= o.heap_len; ) ;
          o.heap[--o.heap_max] = o.heap[1], (function(we, Se) {
            var Qe, Me, St, xe, Zt, _r, $e = Se.dyn_tree, gn = Se.max_code, Oa = Se.stat_desc.static_tree, Pa = Se.stat_desc.has_stree, Fa = Se.stat_desc.extra_bits, yn = Se.stat_desc.extra_base, At = Se.stat_desc.max_length, Yt = 0;
            for (xe = 0; xe <= E; xe++) we.bl_count[xe] = 0;
            for ($e[2 * we.heap[we.heap_max] + 1] = 0, Qe = we.heap_max + 1; Qe < g; Qe++) At < (xe = $e[2 * $e[2 * (Me = we.heap[Qe]) + 1] + 1] + 1) && (xe = At, Yt++), $e[2 * Me + 1] = xe, gn < Me || (we.bl_count[xe]++, Zt = 0, yn <= Me && (Zt = Fa[Me - yn]), _r = $e[2 * Me], we.opt_len += _r * (xe + Zt), Pa && (we.static_len += _r * (Oa[2 * Me + 1] + Zt)));
            if (Yt !== 0) {
              do {
                for (xe = At - 1; we.bl_count[xe] === 0; ) xe--;
                we.bl_count[xe]--, we.bl_count[xe + 1] += 2, we.bl_count[At]--, Yt -= 2;
              } while (0 < Yt);
              for (xe = At; xe !== 0; xe--) for (Me = we.bl_count[xe]; Me !== 0; ) gn < (St = we.heap[--Qe]) || ($e[2 * St + 1] !== xe && (we.opt_len += (xe - $e[2 * St + 1]) * $e[2 * St], $e[2 * St + 1] = xe), Me--);
            }
          })(o, d), A(ie, me, o.bl_count);
        }
        function h(o, d, B) {
          var G, W, ie = -1, ue = d[1], se = 0, fe = 7, me = 4;
          for (ue === 0 && (fe = 138, me = 3), d[2 * (B + 1) + 1] = 65535, G = 0; G <= B; G++) W = ue, ue = d[2 * (G + 1) + 1], ++se < fe && W === ue || (se < me ? o.bl_tree[2 * W] += se : W !== 0 ? (W !== ie && o.bl_tree[2 * W]++, o.bl_tree[2 * T]++) : se <= 10 ? o.bl_tree[2 * S]++ : o.bl_tree[2 * p]++, ie = W, me = (se = 0) === ue ? (fe = 138, 3) : W === ue ? (fe = 6, 3) : (fe = 7, 4));
        }
        function K(o, d, B) {
          var G, W, ie = -1, ue = d[1], se = 0, fe = 7, me = 4;
          for (ue === 0 && (fe = 138, me = 3), G = 0; G <= B; G++) if (W = ue, ue = d[2 * (G + 1) + 1], !(++se < fe && W === ue)) {
            if (se < me) for (; re(o, W, o.bl_tree), --se != 0; ) ;
            else W !== 0 ? (W !== ie && (re(o, W, o.bl_tree), se--), re(o, T, o.bl_tree), Y(o, se - 3, 2)) : se <= 10 ? (re(o, S, o.bl_tree), Y(o, se - 3, 3)) : (re(o, p, o.bl_tree), Y(o, se - 11, 7));
            ie = W, me = (se = 0) === ue ? (fe = 138, 3) : W === ue ? (fe = 6, 3) : (fe = 7, 4);
          }
        }
        c(Z);
        var N = !1;
        function a(o, d, B, G) {
          Y(o, (y << 1) + (G ? 1 : 0), 3), (function(W, ie, ue, se) {
            j(W), X(W, ue), X(W, ~ue), i.arraySet(W.pending_buf, W.window, ie, ue, W.pending), W.pending += ue;
          })(o, d, B);
        }
        l._tr_init = function(o) {
          N || ((function() {
            var d, B, G, W, ie, ue = new Array(E + 1);
            for (W = G = 0; W < b - 1; W++) for (H[W] = G, d = 0; d < 1 << P[W]; d++) k[G++] = W;
            for (k[G - 1] = W, W = ie = 0; W < 16; W++) for (Z[W] = ie, d = 0; d < 1 << M[W]; d++) z[ie++] = W;
            for (ie >>= 7; W < m; W++) for (Z[W] = ie << 7, d = 0; d < 1 << M[W] - 7; d++) z[256 + ie++] = W;
            for (B = 0; B <= E; B++) ue[B] = 0;
            for (d = 0; d <= 143; ) ee[2 * d + 1] = 8, d++, ue[8]++;
            for (; d <= 255; ) ee[2 * d + 1] = 9, d++, ue[9]++;
            for (; d <= 279; ) ee[2 * d + 1] = 7, d++, ue[7]++;
            for (; d <= 287; ) ee[2 * d + 1] = 8, d++, ue[8]++;
            for (A(ee, I + 1, ue), d = 0; d < m; d++) O[2 * d + 1] = 5, O[2 * d] = pe(d, 5);
            Q = new te(ee, P, v + 1, I, E), q = new te(O, M, 0, m, E), le = new te(new Array(0), C, 0, w, x);
          })(), N = !0), o.l_desc = new V(o.dyn_ltree, Q), o.d_desc = new V(o.dyn_dtree, q), o.bl_desc = new V(o.bl_tree, le), o.bi_buf = 0, o.bi_valid = 0, f(o);
        }, l._tr_stored_block = a, l._tr_flush_block = function(o, d, B, G) {
          var W, ie, ue = 0;
          0 < o.level ? (o.strm.data_type === 2 && (o.strm.data_type = (function(se) {
            var fe, me = 4093624447;
            for (fe = 0; fe <= 31; fe++, me >>>= 1) if (1 & me && se.dyn_ltree[2 * fe] !== 0) return u;
            if (se.dyn_ltree[18] !== 0 || se.dyn_ltree[20] !== 0 || se.dyn_ltree[26] !== 0) return s;
            for (fe = 32; fe < v; fe++) if (se.dyn_ltree[2 * fe] !== 0) return s;
            return u;
          })(o)), L(o, o.l_desc), L(o, o.d_desc), ue = (function(se) {
            var fe;
            for (h(se, se.dyn_ltree, se.l_desc.max_code), h(se, se.dyn_dtree, se.d_desc.max_code), L(se, se.bl_desc), fe = w - 1; 3 <= fe && se.bl_tree[2 * $[fe] + 1] === 0; fe--) ;
            return se.opt_len += 3 * (fe + 1) + 5 + 5 + 4, fe;
          })(o), W = o.opt_len + 3 + 7 >>> 3, (ie = o.static_len + 3 + 7 >>> 3) <= W && (W = ie)) : W = ie = B + 5, B + 4 <= W && d !== -1 ? a(o, d, B, G) : o.strategy === 4 || ie === W ? (Y(o, 2 + (G ? 1 : 0), 3), D(o, ee, O)) : (Y(o, 4 + (G ? 1 : 0), 3), (function(se, fe, me, we) {
            var Se;
            for (Y(se, fe - 257, 5), Y(se, me - 1, 5), Y(se, we - 4, 4), Se = 0; Se < we; Se++) Y(se, se.bl_tree[2 * $[Se] + 1], 3);
            K(se, se.dyn_ltree, fe - 1), K(se, se.dyn_dtree, me - 1);
          })(o, o.l_desc.max_code + 1, o.d_desc.max_code + 1, ue + 1), D(o, o.dyn_ltree, o.dyn_dtree)), f(o), G && j(o);
        }, l._tr_tally = function(o, d, B) {
          return o.pending_buf[o.d_buf + 2 * o.last_lit] = d >>> 8 & 255, o.pending_buf[o.d_buf + 2 * o.last_lit + 1] = 255 & d, o.pending_buf[o.l_buf + o.last_lit] = 255 & B, o.last_lit++, d === 0 ? o.dyn_ltree[2 * B]++ : (o.matches++, d--, o.dyn_ltree[2 * (k[B] + v + 1)]++, o.dyn_dtree[2 * F(d)]++), o.last_lit === o.lit_bufsize - 1;
        }, l._tr_align = function(o) {
          Y(o, 2, 3), re(o, _, ee), (function(d) {
            d.bi_valid === 16 ? (X(d, d.bi_buf), d.bi_buf = 0, d.bi_valid = 0) : 8 <= d.bi_valid && (d.pending_buf[d.pending++] = 255 & d.bi_buf, d.bi_buf >>= 8, d.bi_valid -= 8);
          })(o);
        };
      }, { "../utils/common": 41 }],
      53: [function(r, n, l) {
        n.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}],
      54: [function(r, n, l) {
        (function(i) {
          (function(u, s) {
            if (!u.setImmediate) {
              var c, y, b, v, I = 1, m = {}, w = !1, g = u.document, E = Object.getPrototypeOf && Object.getPrototypeOf(u);
              E = E && E.setTimeout ? E : u, c = {}.toString.call(u.process) === "[object process]" ? function(T) {
                ge.nextTick(function() {
                  x(T);
                });
              } : (function() {
                if (u.postMessage && !u.importScripts) {
                  var T = !0, S = u.onmessage;
                  return u.onmessage = function() {
                    T = !1;
                  }, u.postMessage("", "*"), u.onmessage = S, T;
                }
              })() ? (v = "setImmediate$" + Math.random() + "$", u.addEventListener ? u.addEventListener("message", _, !1) : u.attachEvent("onmessage", _), function(T) {
                u.postMessage(v + T, "*");
              }) : u.MessageChannel ? ((b = new MessageChannel()).port1.onmessage = function(T) {
                x(T.data);
              }, function(T) {
                b.port2.postMessage(T);
              }) : g && "onreadystatechange" in g.createElement("script") ? (y = g.documentElement, function(T) {
                var S = g.createElement("script");
                S.onreadystatechange = function() {
                  x(T), S.onreadystatechange = null, y.removeChild(S), S = null;
                }, y.appendChild(S);
              }) : function(T) {
                setTimeout(x, 0, T);
              }, E.setImmediate = function(T) {
                typeof T != "function" && (T = new Function("" + T));
                for (var S = new Array(arguments.length - 1), p = 0; p < S.length; p++) S[p] = arguments[p + 1];
                return m[I] = {
                  callback: T,
                  args: S
                }, c(I), I++;
              }, E.clearImmediate = R;
            }
            function R(T) {
              delete m[T];
            }
            function x(T) {
              if (w) setTimeout(x, 0, T);
              else {
                var S = m[T];
                if (S) {
                  w = !0;
                  try {
                    (function(p) {
                      var P = p.callback, M = p.args;
                      switch (M.length) {
                        case 0:
                          P();
                          break;
                        case 1:
                          P(M[0]);
                          break;
                        case 2:
                          P(M[0], M[1]);
                          break;
                        case 3:
                          P(M[0], M[1], M[2]);
                          break;
                        default:
                          P.apply(s, M);
                      }
                    })(S);
                  } finally {
                    R(T), w = !1;
                  }
                }
              }
            }
            function _(T) {
              T.source === u && typeof T.data == "string" && T.data.indexOf(v) === 0 && x(+T.data.slice(v.length));
            }
          })(typeof self > "u" ? i === void 0 ? this : i : self);
        }).call(this, typeof Re < "u" ? Re : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}]
    }, {}, [10])(10);
  });
})), gf = /* @__PURE__ */ he(((e, t) => {
  var r = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function n(l) {
    return l && l.replace ? l.replace(/([&"<>'])/g, function(i, u) {
      return r[u];
    }) : l;
  }
  t.exports = n;
})), yf = /* @__PURE__ */ he(((e, t) => {
  nt();
  var r = gf(), n = rn().Stream, l = "    ";
  function i(v, I) {
    typeof I != "object" && (I = { indent: I });
    var m = I.stream ? new n() : null, w = "", g = !1, E = I.indent ? I.indent === !0 ? l : I.indent : "", R = !0;
    function x(P) {
      R ? ge.nextTick(P) : P();
    }
    function _(P, M) {
      if (M !== void 0 && (w += M), P && !g && (m = m || new n(), g = !0), P && g) {
        var C = w;
        x(function() {
          m.emit("data", C);
        }), w = "";
      }
    }
    function T(P, M) {
      y(_, c(P, E, E ? 1 : 0), M);
    }
    function S() {
      if (m) {
        var P = w;
        x(function() {
          m.emit("data", P), m.emit("end"), m.readable = !1, m.emit("close");
        });
      }
    }
    function p(P) {
      var M = {
        version: "1.0",
        encoding: P.encoding || "UTF-8"
      };
      P.standalone && (M.standalone = P.standalone), T({ "?xml": { _attr: M } }), w = w.replace("/>", "?>");
    }
    return x(function() {
      R = !1;
    }), I.declaration && p(I.declaration), v && v.forEach ? v.forEach(function(P, M) {
      var C;
      M + 1 === v.length && (C = S), T(P, C);
    }) : T(v, S), m ? (m.readable = !0, m) : w;
  }
  function u() {
    var v = { _elem: c(Array.prototype.slice.call(arguments)) };
    return v.push = function(I) {
      if (!this.append) throw new Error("not assigned to a parent!");
      var m = this, w = this._elem.indent;
      y(this.append, c(I, w, this._elem.icount + (w ? 1 : 0)), function() {
        m.append(!0);
      });
    }, v.close = function(I) {
      I !== void 0 && this.push(I), this.end && this.end();
    }, v;
  }
  function s(v, I) {
    return new Array(I || 0).join(v || "");
  }
  function c(v, I, m) {
    m = m || 0;
    var w = s(I, m), g, E = v, R = !1;
    if (typeof v == "object" && (g = Object.keys(v)[0], E = v[g], E && E._elem))
      return E._elem.name = g, E._elem.icount = m, E._elem.indent = I, E._elem.indents = w, E._elem.interrupt = E, E._elem;
    var x = [], _ = [], T;
    function S(p) {
      Object.keys(p).forEach(function(P) {
        x.push(b(P, p[P]));
      });
    }
    switch (typeof E) {
      case "object":
        if (E === null) break;
        E._attr && S(E._attr), E._cdata && _.push(("<![CDATA[" + E._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>"), E.forEach && (T = !1, _.push(""), E.forEach(function(p) {
          typeof p == "object" ? Object.keys(p)[0] == "_attr" ? S(p._attr) : _.push(c(p, I, m + 1)) : (_.pop(), T = !0, _.push(r(p)));
        }), T || _.push(""));
        break;
      default:
        _.push(r(E));
    }
    return {
      name: g,
      interrupt: R,
      attributes: x,
      content: _,
      icount: m,
      indents: w,
      indent: I
    };
  }
  function y(v, I, m) {
    if (typeof I != "object") return v(!1, I);
    var w = I.interrupt ? 1 : I.content.length;
    function g() {
      for (; I.content.length; ) {
        var R = I.content.shift();
        if (R !== void 0) {
          if (E(R)) return;
          y(v, R);
        }
      }
      v(!1, (w > 1 ? I.indents : "") + (I.name ? "</" + I.name + ">" : "") + (I.indent && !m ? `
` : "")), m && m();
    }
    function E(R) {
      return R.interrupt ? (R.interrupt.append = v, R.interrupt.end = g, R.interrupt = !1, v(!0), !0) : !1;
    }
    if (v(!1, I.indents + (I.name ? "<" + I.name : "") + (I.attributes.length ? " " + I.attributes.join(" ") : "") + (w ? I.name ? ">" : "" : I.name ? "/>" : "") + (I.indent && w > 1 ? `
` : "")), !w) return v(!1, I.indent ? `
` : "");
    E(I) || g();
  }
  function b(v, I) {
    return v + '="' + r(I) + '"';
  }
  t.exports = i, t.exports.element = t.exports.Element = u;
})), bf = rn(), Ta = /* @__PURE__ */ qr(wf()), ye = /* @__PURE__ */ qr(yf()), Pt = 0, Br = 32, _f = 32, xf = (e, t) => {
  const r = t.replace(/-/g, "");
  if (r.length !== _f) throw new Error(`Error: Cannot extract GUID from font filename: ${t}`);
  const n = r.replace(/(..)/g, "$1 ").trim().split(" ").map((u) => parseInt(u, 16));
  n.reverse();
  const l = e.slice(Pt, Br).map((u, s) => u ^ n[s % n.length]), i = new Uint8Array(Pt + l.length + Math.max(0, e.length - Br));
  return i.set(e.slice(0, Pt)), i.set(l, Pt), i.set(e.slice(Br), Pt + l.length), i;
}, Sa = class {
  /**
  * Formats an XML component into a serializable object.
  *
  * @param input - The XML component to format
  * @param context - The context containing file state and relationships
  * @returns A serializable XML object structure
  * @throws Error if the component cannot be formatted correctly
  */
  format(e, t = { stack: [] }) {
    const r = e.prepForXml(t);
    if (r) return r;
    throw Error("XMLComponent did not format correctly");
  }
}, Ef = class {
  /**
  * Replaces image placeholder tokens with relationship IDs.
  *
  * @param xmlData - The XML string containing image placeholders
  * @param mediaData - Array of media data to replace
  * @param offset - Starting offset for relationship IDs
  * @returns XML string with placeholders replaced by relationship IDs
  */
  replace(e, t, r) {
    let n = e;
    return t.forEach((l, i) => {
      n = n.replace(new RegExp(`{${l.fileName}}`, "g"), (r + i).toString());
    }), n;
  }
  /**
  * Extracts media data referenced in the XML content.
  *
  * @param xmlData - The XML string to search for media references
  * @param media - The media collection to search within
  * @returns Array of media data found in the XML
  */
  getMediaData(e, t) {
    return t.Array.filter((r) => e.search(`{${r.fileName}}`) > 0);
  }
}, Tf = class {
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
  replace(e, t) {
    let r = e;
    for (const n of t) r = r.replace(new RegExp(`{${n.reference}-${n.instance}}`, "g"), n.numId.toString());
    return r;
  }
}, Sf = new Sa(), Mr = (e, t, r, n, l = !0) => (0, ye.default)(Sf.format(t, {
  viewWrapper: {
    View: t,
    Relationships: n
  },
  file: e,
  stack: []
}), {
  indent: r,
  declaration: l ? {
    standalone: "yes",
    encoding: "UTF-8"
  } : { encoding: "UTF-8" }
}), Af = (e, t, r, n) => {
  const { content: l } = t.options;
  if (l instanceof Uint8Array) return [{
    data: l,
    path: `word/${r}`
  }];
  if ("files" in l) {
    const y = new Ta.default();
    for (const { path: b, content: v } of l.files) y.file(b, v instanceof Uint8Array ? v : Bt(Mr(e, v, n, new Ke())));
    return [{
      data: y.generateAsync({
        type: "uint8array",
        compression: "DEFLATE"
      }),
      path: `word/${r}`
    }];
  }
  const i = e.PackageParts.createRelationships(r), u = Mr(e, l, n, i), s = r.slice(0, r.lastIndexOf("/")), c = r.slice(r.lastIndexOf("/") + 1);
  return [{
    data: u,
    path: `word/${r}`
  }, ...i.RelationshipCount > 0 ? [{
    data: Mr(e, i, n, i, !1),
    path: `word/${s}/_rels/${c}.rels`
  }] : []];
}, Aa = (e, t, r = 0) => {
  const n = e.PackageParts.Array.slice(r);
  return n.length === 0 ? [] : [...n.flatMap(({ part: l, path: i }) => Af(e, l, i, t)), ...Aa(e, t, r + n.length)];
}, kf = ["PackageParts"], If = class {
  /**
  * Creates a new Compiler instance.
  *
  * Initializes the formatter and replacer utilities used during compilation.
  */
  constructor() {
    J(this, "formatter", void 0), J(this, "imageReplacer", void 0), J(this, "numberingReplacer", void 0), this.formatter = new Sa(), this.imageReplacer = new Ef(), this.numberingReplacer = new Tf();
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
  compile(e, t, r = []) {
    const n = new Ta.default(), l = this.xmlifyFile(e, t), { PackageParts: i } = l, u = ea(l, kf), s = new Map(Object.entries(u));
    for (const [, c] of s) if (Array.isArray(c)) for (const y of c) n.file(y.path, Bt(y.data));
    else n.file(c.path, Bt(c.data));
    for (const { path: c, data: y } of i) n.file(c, typeof y == "string" ? Bt(y) : y);
    for (const c of r) n.file(c.path, Bt(c.data));
    for (const c of e.Media.Array) c.type !== "svg" ? n.file(`word/media/${c.fileName}`, c.data) : (n.file(`word/media/${c.fileName}`, c.data), n.file(`word/media/${c.fallback.fileName}`, c.fallback.data));
    for (const [c, { data: y, fontKey: b }] of e.FontTable.fontOptionsWithKey.entries()) n.file(`word/fonts/font${c + 1}.odttf`, xf(y, b));
    return n;
  }
  xmlifyFile(e, t) {
    const r = e.Document.Relationships.RelationshipCount + 1, n = (0, ye.default)(this.formatter.format(e.Document.View, {
      viewWrapper: e.Document,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), l = e.Comments.Relationships.RelationshipCount + 1, i = (0, ye.default)(this.formatter.format(e.Comments, {
      viewWrapper: {
        View: e.Comments,
        Relationships: e.Comments.Relationships
      },
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), u = e.FootNotes.Relationships.RelationshipCount + 1, s = (0, ye.default)(this.formatter.format(e.FootNotes.View, {
      viewWrapper: e.FootNotes,
      file: e,
      stack: []
    }), {
      indent: t,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    }), c = this.imageReplacer.getMediaData(n, e.Media), y = this.imageReplacer.getMediaData(i, e.Media), b = this.imageReplacer.getMediaData(s, e.Media);
    return de(de(de(de({
      Relationships: {
        data: (c.forEach((v, I) => {
          e.Document.Relationships.addRelationship(r + I, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
        }), e.Document.Relationships.addRelationship(e.Document.Relationships.RelationshipCount + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", "fontTable.xml"), (0, ye.default)(this.formatter.format(e.Document.Relationships, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        })),
        path: "word/_rels/document.xml.rels"
      },
      Document: {
        data: (() => {
          const v = this.imageReplacer.replace(n, c, r);
          return this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/document.xml"
      },
      Styles: {
        data: (() => {
          const v = (0, ye.default)(this.formatter.format(e.Styles, {
            viewWrapper: e.Document,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          });
          return this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/styles.xml"
      },
      Properties: {
        data: (0, ye.default)(this.formatter.format(e.CoreProperties, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "docProps/core.xml"
      },
      Numbering: {
        data: (0, ye.default)(this.formatter.format(e.Numbering, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "word/numbering.xml"
      },
      FileRelationships: {
        data: (0, ye.default)(this.formatter.format(e.FileRelationships, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }),
        path: "_rels/.rels"
      },
      HeaderRelationships: e.Headers.map((v, I) => {
        const m = (0, ye.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        });
        return this.imageReplacer.getMediaData(m, e.Media).forEach((w, g) => {
          v.Relationships.addRelationship(g, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${w.fileName}`);
        }), {
          data: (0, ye.default)(this.formatter.format(v.Relationships, {
            viewWrapper: v,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/header${I + 1}.xml.rels`
        };
      }),
      FooterRelationships: e.Footers.map((v, I) => {
        const m = (0, ye.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        });
        return this.imageReplacer.getMediaData(m, e.Media).forEach((w, g) => {
          v.Relationships.addRelationship(g, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${w.fileName}`);
        }), {
          data: (0, ye.default)(this.formatter.format(v.Relationships, {
            viewWrapper: v,
            file: e,
            stack: []
          }), {
            indent: t,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/footer${I + 1}.xml.rels`
        };
      }),
      Headers: e.Headers.map((v, I) => {
        const m = (0, ye.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), w = this.imageReplacer.getMediaData(m, e.Media), g = this.imageReplacer.replace(m, w, 0);
        return {
          data: this.numberingReplacer.replace(g, e.Numbering.ConcreteNumbering),
          path: `word/header${I + 1}.xml`
        };
      }),
      Footers: e.Footers.map((v, I) => {
        const m = (0, ye.default)(this.formatter.format(v.View, {
          viewWrapper: v,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }), w = this.imageReplacer.getMediaData(m, e.Media), g = this.imageReplacer.replace(m, w, 0);
        return {
          data: this.numberingReplacer.replace(g, e.Numbering.ConcreteNumbering),
          path: `word/footer${I + 1}.xml`
        };
      }),
      CustomProperties: {
        data: (0, ye.default)(this.formatter.format(e.CustomProperties, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "docProps/custom.xml"
      },
      AppProperties: {
        data: (0, ye.default)(this.formatter.format(e.AppProperties, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "docProps/app.xml"
      },
      FootNotes: {
        data: (() => {
          const v = this.imageReplacer.replace(s, b, u);
          return this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (b.forEach((v, I) => {
          e.FootNotes.Relationships.addRelationship(u + I, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
        }), (0, ye.default)(this.formatter.format(e.FootNotes.Relationships, {
          viewWrapper: e.FootNotes,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        })),
        path: "word/_rels/footnotes.xml.rels"
      },
      Endnotes: {
        data: (0, ye.default)(this.formatter.format(e.Endnotes.View, {
          viewWrapper: e.Endnotes,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }),
        path: "word/endnotes.xml"
      },
      EndnotesRelationships: {
        data: (0, ye.default)(this.formatter.format(e.Endnotes.Relationships, {
          viewWrapper: e.Endnotes,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }),
        path: "word/_rels/endnotes.xml.rels"
      },
      Settings: {
        data: (0, ye.default)(this.formatter.format(e.Settings, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "word/settings.xml"
      }
    }, e.Comments.IsEmpty ? {} : {
      Comments: {
        data: (() => {
          const v = this.imageReplacer.replace(i, y, l);
          return this.numberingReplacer.replace(v, e.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (y.forEach((v, I) => {
          e.Comments.Relationships.addRelationship(l + I, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${v.fileName}`);
        }), (0, ye.default)(this.formatter.format(e.Comments.Relationships, {
          viewWrapper: {
            View: e.Comments,
            Relationships: e.Comments.Relationships
          },
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        })),
        path: "word/_rels/comments.xml.rels"
      }
    }), e.CommentsExtended ? { CommentsExtended: {
      data: (0, ye.default)(this.formatter.format(e.CommentsExtended, {
        viewWrapper: {
          View: e.CommentsExtended,
          Relationships: e.Comments.Relationships
        },
        file: e,
        stack: []
      }), {
        indent: t,
        declaration: {
          standalone: "yes",
          encoding: "UTF-8"
        }
      }),
      path: "word/commentsExtended.xml"
    } } : {}), e.CommentsIds ? { CommentsIds: {
      data: (0, ye.default)(this.formatter.format(e.CommentsIds, {
        viewWrapper: {
          View: e.CommentsIds,
          Relationships: e.Comments.Relationships
        },
        file: e,
        stack: []
      }), {
        indent: t,
        declaration: {
          standalone: "yes",
          encoding: "UTF-8"
        }
      }),
      path: "word/commentsIds.xml"
    } } : {}), {}, {
      FontTable: {
        data: (0, ye.default)(this.formatter.format(e.FontTable.View, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "word/fontTable.xml"
      },
      FontTableRelationships: {
        data: (0, ye.default)(this.formatter.format(e.FontTable.Relationships, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }),
        path: "word/_rels/fontTable.xml.rels"
      },
      Theme: {
        data: (0, ye.default)(this.formatter.format(e.Theme, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "word/theme/theme1.xml"
      },
      PackageParts: Aa(e, t),
      ContentTypes: {
        data: (0, ye.default)(this.formatter.format(e.ContentTypes, {
          viewWrapper: e.Document,
          file: e,
          stack: []
        }), {
          indent: t,
          declaration: { encoding: "UTF-8" }
        }),
        path: "[Content_Types].xml"
      }
    });
  }
};
function $n(e, t, r, n, l, i, u) {
  try {
    var s = e[i](u), c = s.value;
  } catch (y) {
    r(y);
    return;
  }
  s.done ? t(c) : Promise.resolve(c).then(n, l);
}
function Rf(e) {
  return function() {
    var t = this, r = arguments;
    return new Promise(function(n, l) {
      var i = e.apply(t, r);
      function u(c) {
        $n(i, n, l, u, s, "next", c);
      }
      function s(c) {
        $n(i, n, l, u, s, "throw", c);
      }
      u(void 0);
    });
  };
}
var Cf = {
  /** Indent with 2 spaces */
  WITH_2_BLANKS: "  "
}, Vn = (e) => e === !0 ? Cf.WITH_2_BLANKS : e === !1 ? void 0 : e, ka = class wt {
  /**
  * Exports a document to the specified output format.
  *
  * @param file - The document to export
  * @param type - The output format type (e.g., "nodebuffer", "blob", "string")
  * @param prettify - Whether to prettify the XML output (boolean or PrettifyType)
  * @param overrides - Optional array of file overrides for custom XML content
  * @returns A promise resolving to the exported document in the specified format
  */
  static pack(t, r, n) {
    var l = this;
    return Rf(function* (i, u, s, c = []) {
      return l.compiler.compile(i, Vn(s), c).generateAsync({
        type: u,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE"
      });
    }).apply(this, arguments);
  }
  /**
  * Exports a document to a string representation.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a string
  */
  static toString(t, r, n = []) {
    return wt.pack(t, "string", r, n);
  }
  /**
  * Exports a document to a Node.js Buffer.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a Buffer
  */
  static toBuffer(t, r, n = []) {
    return wt.pack(t, "nodebuffer", r, n);
  }
  /**
  * Exports a document to a base64-encoded string.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a base64 string
  */
  static toBase64String(t, r, n = []) {
    return wt.pack(t, "base64", r, n);
  }
  /**
  * Exports a document to a Blob (for browser environments).
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a Blob
  */
  static toBlob(t, r, n = []) {
    return wt.pack(t, "blob", r, n);
  }
  /**
  * Exports a document to an ArrayBuffer.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as an ArrayBuffer
  */
  static toArrayBuffer(t, r, n = []) {
    return wt.pack(t, "arraybuffer", r, n);
  }
  /**
  * Exports a document to a Node.js Stream.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A readable stream containing the document data
  */
  static toStream(t, r, n = []) {
    const l = new bf.Stream();
    return this.compiler.compile(t, Vn(r), n).generateAsync({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }).then((i) => {
      l.emit("data", i), l.emit("end");
    }), l;
  }
};
J(ka, "compiler", new If());
const rr = {
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
function Nf(e, t) {
  const r = {};
  e.bold && (r.bold = !0), e.italics && (r.italics = !0), e.smallCaps && (r.smallCaps = !0), e.allCaps && (r.allCaps = !0), e.strike && (r.strike = !0), e.size != null && (r.size = e.size);
  const n = La(e.color, t);
  n && (r.color = n);
  const l = Ba(e.font, t);
  l && (r.font = l), e.underline && (r.underline = typeof e.underline == "string" ? { type: e.underline } : e.underline);
  const i = {};
  return Object.keys(r).length && (i.run = r), e.paragraph && (i.paragraph = e.paragraph), i;
}
function Of(e = xr, t = {}) {
  const r = e?.typography || xr.typography, n = e?.typographyKinds || xr.typographyKinds, l = {}, i = [], u = [];
  for (const [v, I] of Object.entries(r)) {
    const m = Nf(I, e), w = rr[v];
    if (w === "document") {
      l.document = {
        ...m.run ? { run: m.run } : {},
        ...m.paragraph ? { paragraph: m.paragraph } : {}
      };
      continue;
    }
    if (w) {
      l[w] = m;
      continue;
    }
    (n[v] || "character") === "paragraph" ? i.push({
      id: v,
      name: v,
      basedOn: "Normal",
      next: "Normal",
      quickFormat: !0,
      ...m
    }) : u.push({
      id: v,
      name: v,
      basedOn: "Normal",
      quickFormat: !0,
      ...m.run ? { run: m.run } : {}
    });
  }
  const s = t.paragraphStyles || [], c = t.characterStyles || [];
  for (const v of [...s, ...c]) {
    const I = rr[v.id];
    if (!I) continue;
    const { id: m, name: w, basedOn: g, next: E, quickFormat: R, run: x, paragraph: _ } = v;
    l[I] = {
      ...x ? { run: x } : {},
      ..._ ? { paragraph: _ } : {}
    };
  }
  const y = s.filter(
    (v) => !rr[v.id]
  ), b = c.filter(
    (v) => !rr[v.id]
  );
  return {
    default: l,
    paragraphStyles: qn(i, y),
    characterStyles: qn(u, b)
  };
}
function qn(e, t) {
  if (!Array.isArray(t) || t.length === 0) return e;
  const r = new Map(t.map((i) => [i.id, i])), n = e.map(
    (i) => r.has(i.id) ? r.get(i.id) : i
  ), l = new Set(e.map((i) => i.id));
  for (const i of t)
    l.has(i.id) || n.push(i);
  return n;
}
async function md(e, t = {}) {
  const r = await Pf(e, t);
  return ka.toBlob(r);
}
async function Pf(e, t = {}) {
  const {
    sections: r = [],
    header: n = null,
    footer: l = null,
    headerFirstPageOnly: i = !1,
    footerFirstPageOnly: u = !1
  } = e, {
    paragraphStyles: s,
    characterStyles: c,
    theme: y,
    typography: b,
    numbering: v,
    pageMargin: I,
    pageSize: m,
    pageOrientation: w,
    ...g
  } = t, E = { nextId: 1, footnotes: {} };
  lr(r.flat(), E), n && lr(n, E), l && lr(l, E);
  const { loadAsset: R } = t, x = await Ur(r.flat(), R), _ = {
    pageNumbers: { start: 1, formatType: fo.DECIMAL },
    ...I ? { margin: I } : {}
  };
  m && (_.size = {
    width: m.width,
    height: m.height,
    ...w ? { orientation: w } : {}
  });
  const T = {
    properties: {
      type: Xu.CONTINUOUS,
      page: _
    },
    children: x
  };
  if (n) {
    const P = await Ur(n, R), M = new xa({ children: P }), C = nr(!0);
    i ? (T.headers = { first: M, default: C }, T.properties.titlePage = !0) : T.headers = { default: M };
  } else
    T.headers = { default: nr(!0) };
  if (l) {
    const P = await Ur(l, R), M = new Ea({ children: P }), C = nr(!1);
    u ? (T.footers = { first: M, default: C }, T.properties.titlePage = !0) : T.footers = { default: M };
  } else
    T.footers = { default: nr(!1) };
  T.properties.titlePage && (T.headers && !T.headers.first && (T.headers.first = T.headers.default), T.footers && !T.footers.first && (T.footers.first = T.footers.default));
  const S = {
    ...g,
    sections: [T]
  }, p = b ? { ...y || {}, typography: b } : y;
  if (p) {
    const P = Of(p, {
      paragraphStyles: s,
      characterStyles: c
    }), M = {};
    P.default && Object.keys(P.default).length && (M.default = P.default), P.paragraphStyles.length && (M.paragraphStyles = P.paragraphStyles), P.characterStyles.length && (M.characterStyles = P.characterStyles), Object.keys(M).length && (S.styles = M);
  } else (s && s.length || c && c.length) && (S.styles = {}, s?.length && (S.styles.paragraphStyles = s), c?.length && (S.styles.characterStyles = c));
  return v && v.length && (S.numbering = { config: v }), Object.keys(E.footnotes).length && (S.footnotes = E.footnotes), new lf(S);
}
function lr(e, t) {
  if (Array.isArray(e)) {
    for (const r of e)
      if (!(!r || typeof r != "object")) {
        if (r.type === "footnoteReference") {
          const n = t.nextId;
          t.nextId += 1, r.footnoteId = n;
          const l = [];
          for (const i of r.children || [])
            if (i.type === "paragraph")
              l.push(wn(i));
            else {
              const u = Xt(i);
              u.length && l.push(new Te({ children: u }));
            }
          l.length || l.push(new Te({})), t.footnotes[n] = { children: l };
        }
        r.children && lr(r.children, t);
      }
  }
}
function nr(e) {
  const t = e ? Ee.RIGHT : Ee.CENTER, r = e ? xa : Ea;
  return new r({
    children: [
      new Te({
        alignment: t,
        children: [
          new Ce("Page "),
          new Ce({ children: [et.CURRENT] }),
          new Ce(" of "),
          new Ce({ children: [et.TOTAL_PAGES] })
        ]
      })
    ]
  });
}
async function Ur(e, t) {
  return (await Promise.all(
    e.map((n) => Ff(n, t))
  )).flat();
}
async function Ff(e, t) {
  switch (e.type) {
    case "table":
      return [await ld(e)];
    case "image":
      return [await hd(e, t)];
    case "tableOfContents":
      return [Df(e)];
    case "webOnly":
      return [];
    default:
      return [await od(e)];
  }
}
function Df(e) {
  const t = e.toc || {}, r = t.title || "Contents", n = {
    hyperlink: t.hyperlink === "true" || t.hyperlink === !0 || t.hyperlink == null,
    headingStyleRange: t.headingRange || "1-3"
  };
  return new df(r, n);
}
function wn(e) {
  const t = {};
  if (e.heading && (t.heading = Hf(e.heading)), e.paragraphStyle ? t.style = e.paragraphStyle : e.style && (t.style = e.style), e.alignment && (t.alignment = Ra(e.alignment)), e.pageBreakBefore && (t.pageBreakBefore = !0), e.spacing) {
    t.spacing = {};
    const n = Be(e.spacing.before), l = Be(e.spacing.after), i = Be(e.spacing.line);
    n != null && (t.spacing.before = n), l != null && (t.spacing.after = l), i != null && (t.spacing.line = i), e.spacing.lineRule && (t.spacing.lineRule = e.spacing.lineRule);
  }
  if (e.bullet && (t.bullet = { level: Be(e.bullet.level) ?? 0 }), e.numbering) {
    t.numbering = {
      reference: e.numbering.reference,
      level: Be(e.numbering.level) ?? 0
    };
    const n = Be(e.numbering.instance);
    n != null && (t.numbering.instance = n);
  }
  if (e.indent) {
    const n = {};
    for (const l of ["left", "right", "start", "end", "firstLine", "hanging"]) {
      const i = e.indent[l];
      if (i == null) continue;
      const u = typeof i == "string" ? parseInt(i, 10) : i;
      Number.isFinite(u) && (n[l] = u);
    }
    Object.keys(n).length && (t.indent = n);
  }
  Array.isArray(e.tabStops) && e.tabStops.length && (t.tabStops = e.tabStops.map(ed).filter(Boolean));
  const r = (e.children || []).flatMap(Xt);
  return e.bookmark && r.length ? t.children = [new Ji({ id: e.bookmark, children: r })] : r.length && (t.children = r), new Te(t);
}
function Xt(e) {
  switch (e.type) {
    case "text":
      return Lf(e);
    case "tab":
      return [new Ce({ children: [new Xi()] })];
    case "externalHyperlink":
    // A plain <a href> from same-source JSX — same destination, same
    // emitter. See the href note in ir/parser.js.
    case "a":
      return [Bf(e)];
    case "internalHyperlink":
      return [Mf(e)];
    case "image":
      return [];
    case "webOnly":
      return [];
    case "footnoteReference":
      return e.footnoteId ? [new vf(e.footnoteId)] : [];
    case "math":
      return [new Ce({ text: e.latex || "" })];
    default:
      return e.content ? [new Ce({ text: e.content })] : e.children ? e.children.flatMap(Xt) : [];
  }
}
function Lf(e) {
  const t = [];
  e.positionalTab && t.push(
    new Ce({
      children: [
        new gu({
          alignment: rd(e.positionalTab.alignment),
          leader: id(e.positionalTab.leader),
          relativeTo: sd(e.positionalTab.relativeTo)
        })
      ]
    })
  );
  const r = e.content || "";
  if (r === "_currentPage")
    return t.push(new Ce({ children: [et.CURRENT] })), t;
  if (r === "_totalPages")
    return t.push(new Ce({ children: [et.TOTAL_PAGES] })), t;
  const n = { text: r };
  if ((e.bold === "true" || e.bold === !0) && (n.bold = !0), (e.italics === "true" || e.italics === !0) && (n.italics = !0), e.underline && (n.underline = e.underline), e.style && (n.style = e.style), e.color && (n.color = e.color), e.size != null) {
    const l = typeof e.size == "string" ? parseInt(e.size, 10) : e.size;
    Number.isFinite(l) && (n.size = l);
  }
  return e.font && (n.font = e.font), (e.smallCaps === "true" || e.smallCaps === !0) && (n.smallCaps = !0), (e.allCaps === "true" || e.allCaps === !0) && (n.allCaps = !0), (e.strike === "true" || e.strike === !0) && (n.strike = !0), e.subScript === "true" || e.subScript === !0 ? n.subScript = !0 : (e.superScript === "true" || e.superScript === !0) && (n.superScript = !0), t.push(new Ce(n)), t;
}
function Bf(e) {
  const t = e.link || e.href || "", r = (e.children || []).flatMap(Xt);
  return new Yi({
    children: r.length ? r : [new Ce({ text: t })],
    link: t
  });
}
function Mf(e) {
  const t = (e.children || []).flatMap(Xt);
  return new Zi({
    children: t.length ? t : [new Ce({ text: e.anchor || "" })],
    anchor: e.anchor || ""
  });
}
function Ia(e) {
  const r = { rows: (e.children || []).filter((n) => n.type === "tableRow").map(Uf) };
  return Array.isArray(e.tableColumnWidths) && e.tableColumnWidths.length && (r.columnWidths = e.tableColumnWidths), e.tableLayout ? r.layout = e.tableLayout === "autofit" ? Rr.AUTOFIT : Rr.FIXED : r.columnWidths && (r.layout = Rr.FIXED), e.tableWidth && (r.width = Ca(e.tableWidth)), e.tableBorders && (r.borders = Na(e.tableBorders)), new Ac(r);
}
function Uf(e) {
  const r = { children: (e.children || []).filter((n) => n.type === "tableCell").map(jf) };
  return e.tableHeader && (r.tableHeader = !0), new da(r);
}
function jf(e) {
  const t = {};
  if (e.width && (t.width = Ca(e.width)), e.margins && (t.margins = Wf(e.margins)), e.borders && (t.borders = Na(e.borders)), e.shading && (t.shading = Xf(e.shading)), e.verticalAlign && (t.verticalAlign = Yf(e.verticalAlign)), e.columnSpan) {
    const n = typeof e.columnSpan == "string" ? parseInt(e.columnSpan, 10) : e.columnSpan;
    Number.isFinite(n) && n > 1 && (t.columnSpan = n);
  }
  if (e.rowSpan) {
    const n = typeof e.rowSpan == "string" ? parseInt(e.rowSpan, 10) : e.rowSpan;
    Number.isFinite(n) && n > 1 && (t.rowSpan = n);
  }
  const r = (e.children || []).flatMap((n) => n.type === "table" ? [Ia(n)] : [wn(n)]);
  return t.children = r.length ? r : [new Te({})], new fr(t);
}
function Be(e) {
  if (e == null) return;
  const t = parseInt(e, 10);
  return isNaN(t) ? void 0 : t;
}
function Wf(e) {
  const t = {};
  for (const [r, n] of Object.entries(e)) {
    const l = Be(n);
    l != null && (t[r] = l);
  }
  return t;
}
const zf = {
  HEADING_1: dt.HEADING_1,
  HEADING_2: dt.HEADING_2,
  HEADING_3: dt.HEADING_3,
  HEADING_4: dt.HEADING_4,
  HEADING_5: dt.HEADING_5,
  HEADING_6: dt.HEADING_6
};
function Hf(e) {
  return zf[e];
}
const Gf = {
  left: Ee.LEFT,
  center: Ee.CENTER,
  right: Ee.RIGHT,
  justified: Ee.JUSTIFIED,
  both: Ee.JUSTIFIED
};
function Ra(e) {
  return Gf[e] ?? Ee.LEFT;
}
const Kf = {
  percentage: Ne.PERCENTAGE,
  pct: Ne.PERCENTAGE,
  dxa: Ne.DXA,
  auto: Ne.AUTO,
  nil: Ne.NIL
};
function $f(e) {
  return Kf[e] ?? Ne.DXA;
}
function Ca(e) {
  const t = Be(e.size) ?? 0, r = e.type;
  return r === "pct" || r === "percentage" ? {
    size: String(t * 50),
    type: Ne.PERCENTAGE
  } : {
    size: t,
    type: $f(r)
  };
}
const Vf = {
  single: De.SINGLE,
  double: De.DOUBLE,
  dotted: De.DOTTED,
  dashed: De.DASHED,
  none: De.NONE,
  nil: De.NIL,
  thick: De.THICK,
  triple: De.TRIPLE
};
function Na(e) {
  const t = {};
  for (const [r, n] of Object.entries(e))
    t[r] = {
      style: Vf[n.style] ?? De.SINGLE,
      size: Be(n.size) ?? 1,
      color: n.color || "000000"
    };
  return t;
}
const qf = {
  clear: Ze.CLEAR,
  nil: Ze.NIL,
  solid: Ze.CLEAR,
  // alias — `solid` is the natural prop name
  diagonalCross: Ze.DIAGONAL_CROSS,
  diagonalStripe: Ze.DIAGONAL_STRIPE,
  horizontalStripe: Ze.HORIZONTAL_STRIPE,
  verticalStripe: Ze.VERTICAL_STRIPE
};
function Xf(e) {
  const t = e.fill || "000000", r = qf[e.type] ?? Ze.CLEAR, n = e.color || "auto";
  return { type: r, fill: t, color: n };
}
const Zf = {
  top: Ut.TOP,
  center: Ut.CENTER,
  middle: Ut.CENTER,
  // alias — natural-language CSS-ish
  bottom: Ut.BOTTOM
};
function Yf(e) {
  return Zf[e] ?? Ut.TOP;
}
const Jf = {
  left: Fe.LEFT,
  right: Fe.RIGHT,
  center: Fe.CENTER,
  decimal: Fe.DECIMAL,
  bar: Fe.BAR,
  clear: Fe.CLEAR,
  end: Fe.END,
  num: Fe.NUM,
  start: Fe.START
}, Qf = {
  none: Nt.NONE,
  dot: Nt.DOT,
  hyphen: Nt.HYPHEN,
  underscore: Nt.UNDERSCORE,
  middleDot: Nt.MIDDLE_DOT
};
function ed(e) {
  if (!e || typeof e != "object") return null;
  const t = Jf[e.type] ?? Fe.LEFT, r = typeof e.position == "string" ? parseInt(e.position, 10) : e.position;
  if (!Number.isFinite(r)) return null;
  const n = { type: t, position: r };
  if (e.leader) {
    const l = Qf[e.leader];
    l && (n.leader = l);
  }
  return n;
}
const td = {
  left: ir.LEFT,
  center: ir.CENTER,
  right: ir.RIGHT
};
function rd(e) {
  return td[e] ?? ir.LEFT;
}
const nd = {
  none: ot.NONE,
  dot: ot.DOT,
  hyphen: ot.HYPHEN,
  underscore: ot.UNDERSCORE,
  heavy: ot.HEAVY,
  middleDot: ot.MIDDLE_DOT
};
function id(e) {
  return nd[e] ?? ot.NONE;
}
const ad = {
  indent: Kr.INDENT,
  margin: Kr.MARGIN
};
function sd(e) {
  return ad[e] ?? Kr.MARGIN;
}
async function od(e) {
  return wn(e);
}
async function ld(e) {
  return Ia(e);
}
let ud = 1;
function cd(e, t) {
  const r = (e.split(/[?#]/)[0].match(/\.([a-zA-Z0-9]+)$/)?.[1] || "").toLowerCase();
  if (r === "png") return "png";
  if (r === "jpg" || r === "jpeg") return "jpg";
  if (r === "gif") return "gif";
  if (r === "bmp") return "bmp";
  const n = new Uint8Array(t instanceof ArrayBuffer ? t : t?.buffer ?? t);
  if (n.length >= 4) {
    if (n[0] === 137 && n[1] === 80 && n[2] === 78 && n[3] === 71) return "png";
    if (n[0] === 255 && n[1] === 216 && n[2] === 255) return "jpg";
    if (n[0] === 71 && n[1] === 73 && n[2] === 70) return "gif";
    if (n[0] === 66 && n[1] === 77) return "bmp";
  }
  return "png";
}
async function hd(e, t) {
  try {
    const r = e.src || "";
    if (!r) return new Te({});
    const n = await fd(r, t), l = Be(e.transformation?.width) ?? 400, i = Be(e.transformation?.height) ?? 300, u = {
      type: cd(r, n),
      data: n,
      transformation: { width: l, height: i },
      altText: {
        id: ud++,
        name: "",
        ...e.altText || {}
      }
    };
    e.floating && (u.floating = e.floating);
    const s = {
      children: [new ru(u)]
    };
    return e.alignment && (s.alignment = Ra(e.alignment)), new Te(s);
  } catch (r) {
    return console.error("Error creating image element:", r), new Te({});
  }
}
async function fd(e, t) {
  const { bytes: r } = await Da(e, { loadAsset: t });
  return r;
}
export {
  Pf as buildDocument,
  md as compileDocx,
  nr as createDefaultHeaderFooter
};
//# sourceMappingURL=docx-Bh4kqThP.js.map
